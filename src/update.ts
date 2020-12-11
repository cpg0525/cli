/*
 * @Author: pengguo.chen@ucarinc.com 
 * @Date: 2020-11-10 17:58:49 
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 18:37:59
 */

import ora from 'ora';
import path from 'path';
import userHome from 'user-home';
import chalk from 'chalk';
import { sync as rimraf } from 'rimraf';
import util from './utils/template';
const log = console.log;

const rm = () => {
  return new Promise((resolve, reject) => {
    try {
      const templates = path.join(userHome, '.pengo-cli-templates');
      log(`templates: ${chalk.blue.underline.bold(templates)}`)
      rimraf(templates);
      log(chalk.green.bold('删除模版成功'))
      resolve({ state: 0, msg: 'success' });
    } catch (error) {
      log(chalk.red(`删除模版失败：${error}`));
      reject(new Error('删除模版报错'));
    }
  });
};
const run = async (): Promise<void> => {
  let spinner = ora('删除模版').start();
  const rmResult: any = await rm();
  spinner.stop();
  if (rmResult.state !== 0) return;
  spinner = ora('更新模版').start();
  try {
    const template = path.join(userHome, '.map-cli');
    await util.update(template);
  } catch (error) {
    log(chalk.red(`更新模板错误：${error}`));
  } finally {
    spinner.stop();
  }
};
run();
