/*
 * @Author: pengguo.chen@ucarinc.com 
 * @Date: 2020-11-10 15:19:01 
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 17:31:54
 */

import debug from 'debug';
import path from 'path';
import fs from 'fs-extra';
import replaceStream from 'replacestream';
import _ from 'lodash';
import ora from 'ora';
import { Result, State } from './result';
const log = debug('i-cli:generate-project');

const inludeFiletypes = [
  '.sh',
  '.html',
  '.js',
  '.json',
  '.md',
  '.vue',
  '.css',
  '.less',
  '.sass',
  '.ejs',
  '.jsx',
  '.yml',
];

/**
 * 生成项目
 */

const replaceFile = (uri, replace, dest, repaceUri): void => {
  let target = _.replace(uri, '{name}', replace); // 写入的文件路径
  target = _.replace(target, repaceUri, dest);
  fs.ensureFile(target, err => {
    if (!err) {
      const extname = path.extname(path.basename(target));

      if (_.indexOf(inludeFiletypes, extname) !== -1) {
        fs.createReadStream(uri)
          .pipe(replaceStream('{{{name}}}', replace))
          .pipe(fs.createWriteStream(target));
      } else {
        fs.createReadStream(uri, { encoding: 'binary' }).pipe(
          fs.createWriteStream(target, { encoding: 'binary' })
        );
      }
    }
  });
};

const traversalDir = (uri, replace, dest, templateUri): void => {
  fs.readdirSync(uri).forEach(file => {
    // 读取文件并遍历
    ((fileName, root): void => {
      const localUri = path.resolve(root, fileName);
      if (fs.lstatSync(localUri).isDirectory()) {
        traversalDir(localUri, replace, dest, templateUri); // 递归遍历文件
      } else {
        replaceFile(localUri, replace, dest, templateUri); //  如果是文件做替换
      }
    })(file, uri);
  });
};
export const generate = (template, dest, projectName): Result => {
  const spinner = ora('项目生成中🚶...').start();
  let result: Result;
  try {
    traversalDir(template, projectName, dest, template);
    result = { state: State.Succss, msg: '项目生成完成😁!' };
  } catch (error) {
    result = { state: State.Fail, msg: 'fail' };
    log(`项目生成失败🙁：${error}`);
  } finally {
    spinner.stop();
  }
  return result;
};
