/*
 * @Author: pengguo.chen@ucarinc.com 
 * @Date: 2020-11-10 14:45:12 
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 19:11:56
 */

import chalk from 'chalk';

import _ from 'lodash';
import util from './utils/template';

const templateList = (): void => {
  const list = util.getTplInfo();
  const listArr = _.toArray(list);
  let style = 'yellow';
  console.log(
    chalk.yellow(`
    
 ___  ___       ___       ______   
|   \/   |     /   \     |   _  \  
|  \  /  |    /  ^  \    |  |_)  | 
|  |\/|  |   /  /_\  \   |   ___/  
|  |  |  |  /  _____  \  |  |      
|__|  |__| /__/     \__\ | _|      
                                       
     
已有模版列表：\n`)
  );
  listArr.forEach(item => {
    style = item.disabledInfo ? 'gray' : 'yellow';
    console.log(chalk`   {cyanBright ${item.name}} - {${style} ${item.desc}}`);
    console.log(chalk`     git：{green.underline ${item.readme}}\n`);
  });
  console.log();
};
templateList();
