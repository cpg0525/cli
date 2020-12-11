import { Result } from './result';
/**
 * @description
 * @param {*} repo 远程git地址
 * @param {*} dest 下载文件路径
 * @returns {Promise<Result>}
 */
declare const downLoadTpl: (repo: any, dest: any) => Promise<Result>;
export default downLoadTpl;
