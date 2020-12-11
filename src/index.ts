/*
 * @Author: pengguo.chen@ucarinc.com 
 * @Date: 2020-11-10 14:16:24 
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 17:53:52
 */

import { program } from 'commander';
import { resolve } from 'path';
import { dynamicImport } from './utils/dynamic-import';

(async (): Promise<void> => {
  const pkg = await dynamicImport(resolve(__dirname, '../', 'package.json'));
  program
    .version(pkg.version)
    .usage('<command> [options]')
    .command('init', '通过模版创建项目')
    .command('list', '查看模版列表')
    .command('update', '更新模版')
    .parse(process.argv);
})();
