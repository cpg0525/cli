/*
 * @Author: pengguo.chen@ucarinc.com 
 * @Date: 2020-11-10 18:43:31 
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 18:44:48
 */

import yaml from 'js-yaml';
import fs, { createReadStream, createWriteStream } from 'fs';
import chalk from 'chalk';
import path from 'path';
import downloadTpl from './down-load-tpl';
const yml = path.join(__dirname, '../../template.yml');
const log = console.log;

const getTpl = (): any => {
  let tpl;
  try {
    tpl = yaml.safeLoad(fs.readFileSync(yml, 'utf8'));
  } catch (error) {
    log(chalk.red(`读取yml 文件错误：${error}`));
  }
  return tpl;
};
const tpl = getTpl();
const list = tpl && tpl.list ? tpl.list : null;
const remotePath = tpl && tpl.remotePath ? tpl.remotePath : null;

const getTplInfo = (k1?: string | number, k2?: string): any => {
  if (!k1 && !k2) return list;
  return list[k1] ? list[k1][`${k2}`] : null;
}

const choices = () => {
  const keys = Object.keys(list);
  const result: any[] = [];
  keys.forEach(key => {
    const item: any = {
      name: list[key].name,
      value: key,
    };
    if (list[key].disabledInfo) item.disabled = list[key].disabledInfo;
    result.push(item);
  });
  return result;
};
const update = async (template: string): Promise<void> => {
  // log(`remotePath: ${chalk.blue.underline.bold(remotePath)}\ntemplate: ${chalk.blue.underline.bold(template)}`)
  const result = await downloadTpl(remotePath, template);

  if (result.state !== 0) return;
  createReadStream(path.join(template, 'template.yml')).pipe(
    createWriteStream(yml)
  );
};

export default {
  getTpl,
  getTplInfo,
  remotePath,
  update,
  choices,
};
