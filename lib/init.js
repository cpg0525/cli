"use strict";
/*
 * @Author: pengguo.chen@ucarinc.com
 * @Date: 2020-11-10 14:43:44
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-12-10 18:47:01
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const user_home_1 = __importDefault(require("user-home"));
const fs_1 = require("fs");
const prompt_1 = require("./utils/prompt");
const down_load_tpl_1 = __importDefault(require("./utils/down-load-tpl"));
const template_1 = __importDefault(require("./utils/template"));
const generate_project_1 = require("./utils/generate-project");
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const choices = template_1.default.choices();
        const answers = yield prompt_1.prompt([
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
            const tmpUrl = template_1.default.getTplInfo(answers.template, 'git');
            const tmpName = template_1.default.getTplInfo(answers.template, 'name');
            const projectName = answers.projectName;
            const confirmAnswers = yield prompt_1.confirm(`当前目录创建 ${projectName} 项目,项目模版（${tmpName}）?`);
            console.log(`confirmAnswers:${JSON.stringify(confirmAnswers)}`);
            if (!confirmAnswers.confirm)
                return;
            const tmpPath = path_1.default.join(user_home_1.default, '.map-cli-templates', answers.template);
            if (!fs_1.existsSync(tmpPath)) {
                const result = yield down_load_tpl_1.default(tmpUrl, tmpPath);
                if (result.state !== 0)
                    return;
            }
            const cwd = process.cwd();
            const dest = path_1.default.join(cwd, projectName);
            generate_project_1.generate(tmpPath, dest, projectName);
        }
    }
    catch (error) {
        console.log(`初始化失败：${error}`);
    }
});
init();
//# sourceMappingURL=init.js.map