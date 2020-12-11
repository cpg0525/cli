/*
 * @Author: pengguo.chen@ucarinc.com 
 * @Date: 2020-11-10 17:35:20 
 * @Last Modified by:   pengguo.chen@ucarinc.com 
 * @Last Modified time: 2020-11-10 17:35:20 
 */

import inquirer from 'inquirer';

export const prompt = async (
  question: inquirer.QuestionCollection
): Promise<inquirer.Answers> => {
  const result: inquirer.Answers = await inquirer.prompt(question);
  return result;
};

export const confirm = async (message): Promise<inquirer.Answers> => {
  const result: inquirer.Answers = await prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message,
    },
  ]);
  return result;
};
