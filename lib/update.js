"use strict";
/*
 * @Author: pengguo.chen@ucarinc.com
 * @Date: 2020-11-10 17:58:49
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 18:37:59
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
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const user_home_1 = __importDefault(require("user-home"));
const chalk_1 = __importDefault(require("chalk"));
const rimraf_1 = require("rimraf");
const template_1 = __importDefault(require("./utils/template"));
const log = console.log;
const rm = () => {
    return new Promise((resolve, reject) => {
        try {
            const templates = path_1.default.join(user_home_1.default, '.pengo-cli-templates');
            log(`templates: ${chalk_1.default.blue.underline.bold(templates)}`);
            rimraf_1.sync(templates);
            log(chalk_1.default.green.bold('删除模版成功'));
            resolve({ state: 0, msg: 'success' });
        }
        catch (error) {
            log(chalk_1.default.red(`删除模版失败：${error}`));
            reject(new Error('删除模版报错'));
        }
    });
};
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    let spinner = ora_1.default('删除模版').start();
    const rmResult = yield rm();
    spinner.stop();
    if (rmResult.state !== 0)
        return;
    spinner = ora_1.default('更新模版').start();
    try {
        const template = path_1.default.join(user_home_1.default, '.map-cli');
        yield template_1.default.update(template);
    }
    catch (error) {
        log(chalk_1.default.red(`更新模板错误：${error}`));
    }
    finally {
        spinner.stop();
    }
});
run();
//# sourceMappingURL=update.js.map