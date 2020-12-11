"use strict";
/*
 * @Author: pengguo.chen@ucarinc.com
 * @Date: 2020-11-10 15:18:05
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 16:57:18
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const download_git_repo_1 = __importDefault(require("download-git-repo"));
const debug_1 = __importDefault(require("debug"));
const ora_1 = __importDefault(require("ora"));
const result_1 = require("./result");
const log = debug_1.default('mario-cli:down-load-tpl');
/**
 * @description
 * @param {*} repo 远程git地址
 * @param {*} dest 下载文件路径
 * @returns {Promise<Result>}
 */
const downLoadTpl = (repo, dest) => {
    return new Promise((resolve, reject) => {
        const spinner = ora_1.default('模版下载中').start();
        download_git_repo_1.default(repo, dest, { clone: false }, err => {
            spinner.stop();
            if (!err) {
                resolve({ state: result_1.State.Succss, msg: 'success' });
            }
            else {
                log(`下载模版异常：${err}`);
                reject(new Error('下载模版异常'));
            }
        });
    });
};
exports.default = downLoadTpl;
//# sourceMappingURL=down-load-tpl.js.map