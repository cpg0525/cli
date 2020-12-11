import inquirer from 'inquirer';
export declare const prompt: (question: any) => Promise<inquirer.Answers>;
export declare const confirm: (message: any) => Promise<inquirer.Answers>;
