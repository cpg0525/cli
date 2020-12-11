"use strict";
/*
 * @Author: pengguo.chen@ucarinc.com
 * @Date: 2020-11-10 14:45:12
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 19:11:56
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const lodash_1 = __importDefault(require("lodash"));
const template_1 = __importDefault(require("./utils/template"));
const templateList = () => {
    const list = template_1.default.getTplInfo();
    const listArr = lodash_1.default.toArray(list);
    let style = 'yellow';
    console.log(chalk_1.default.yellow(`
    
 ___  ___       ___       ______   
|   \/   |     /   \     |   _  \  
|  \  /  |    /  ^  \    |  |_)  | 
|  |\/|  |   /  /_\  \   |   ___/  
|  |  |  |  /  _____  \  |  |      
|__|  |__| /__/     \__\ | _|      
                                       
     
已有模版列表：\n`));
    listArr.forEach(item => {
        style = item.disabledInfo ? 'gray' : 'yellow';
        console.log(chalk_1.default `   {cyanBright ${item.name}} - {${style} ${item.desc}}`);
        console.log(chalk_1.default `     git：{green.underline ${item.readme}}\n`);
    });
    console.log();
};
templateList();
//# sourceMappingURL=list.js.map