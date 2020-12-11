/*
 * @Author: pengguo.chen@ucarinc.com 
 * @Date: 2020-11-10 14:43:44 
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-12-10 18:47:01
 */

import path from 'path';
import userHome from 'user-home';
import { existsSync } from 'fs';
import inquirer from 'inquirer';
import { prompt, confirm } from './utils/prompt';
import downLoadTpl from './utils/down-load-tpl';
import util from './utils/template';
import { Result } from './utils/result';
import { generate } from './utils/generate-project';

const init = async (): Promise<void> => {
  try {
    const choices = util.choices();
    const answers: inquirer.Answers = await prompt([
      {
        type: 'list',
        name: 'template',
        message: '请选择工程模版?',
        choices,
      },
      {
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称',
      },
    ]);
    if (answers) {
      const tmpUrl: string = util.getTplInfo(answers.template, 'git');
      const tmpName: string = util.getTplInfo(answers.template, 'name');
      const projectName: string = answers.projectName;
      const confirmAnswers: inquirer.Answers = await confirm(
        `当前目录创建 ${projectName} 项目,项目模版（${tmpName}）?`
      );
      if (!confirmAnswers.confirm) return;

      const tmpPath = path.join(
        userHome,
        '.map-cli-templates',
        answers.template
      );

      if (!existsSync(tmpPath)) {
        const result: Result = await downLoadTpl(tmpUrl, tmpPath);
        if (result.state !== 0) return;
      }

      const cwd = process.cwd();
      const dest = path.join(cwd, projectName);
      generate(tmpPath, dest, projectName);
    }
  } catch (error) {
    console.log(`初始化失败：${error}`);
  }
};

init();
