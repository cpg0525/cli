/*
 * @Author: pengguo.chen@ucarinc.com 
 * @Date: 2020-11-10 15:18:05 
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 16:57:18
 */

import download from 'download-git-repo';
import debug from 'debug';
import ora from 'ora';

import { Result, State } from './result';

const log = debug('mario-cli:down-load-tpl');

/**
 * @description
 * @param {*} repo 远程git地址
 * @param {*} dest 下载文件路径
 * @returns {Promise<Result>}
 */
const downLoadTpl = (repo, dest): Promise<Result> => {
  return new Promise((resolve, reject): void => {
    const spinner = ora('模版下载中...').start();
    download(repo, dest, { clone: false }, err => {
      spinner.stop();
      if (!err) {
        resolve({ state: State.Succss, msg: 'success' });
      } else {
        log(`下载模版异常：${err}`);
        reject(new Error('下载模版异常'));
      }
    });
  });
};
export default downLoadTpl;
