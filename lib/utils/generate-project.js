"use strict";
/*
 * @Author: pengguo.chen@ucarinc.com
 * @Date: 2020-11-10 15:19:01
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 17:31:54
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = void 0;
const debug_1 = __importDefault(require("debug"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const replacestream_1 = __importDefault(require("replacestream"));
const lodash_1 = __importDefault(require("lodash"));
const ora_1 = __importDefault(require("ora"));
const result_1 = require("./result");
const log = debug_1.default('i-cli:generate-project');
const inludeFiletypes = [
    '.sh',
    '.html',
    '.js',
    '.json',
    '.md',
    '.vue',
    '.css',
    '.less',
    '.sass',
    '.ejs',
    '.jsx',
    '.yml',
];
/**
 * 生成项目
 */
const replaceFile = (uri, replace, dest, repaceUri) => {
    let target = lodash_1.default.replace(uri, '{name}', replace); // 写入的文件路径
    log(`befor target:${target} `);
    log(`repaceUri: ${repaceUri} dest:${dest}`);
    target = lodash_1.default.replace(target, repaceUri, dest);
    log(`after target:${target}`);
    fs_extra_1.default.ensureFile(target, err => {
        if (!err) {
            const extname = path_1.default.extname(path_1.default.basename(target));
            if (lodash_1.default.indexOf(inludeFiletypes, extname) !== -1) {
                log(`---target: ${target}`);
                fs_extra_1.default.createReadStream(uri)
                    .pipe(replacestream_1.default('{{{name}}}', replace))
                    .pipe(fs_extra_1.default.createWriteStream(target));
            }
            else {
                fs_extra_1.default.createReadStream(uri, { encoding: 'binary' }).pipe(fs_extra_1.default.createWriteStream(target, { encoding: 'binary' }));
            }
        }
    });
};
const traversalDir = (uri, replace, dest, templateUri) => {
    log(`templateUri:${templateUri}`);
    fs_extra_1.default.readdirSync(uri).forEach(file => {
        // 读取文件并遍历
        ((fileName, root) => {
            const localUri = path_1.default.resolve(root, fileName);
            if (fs_extra_1.default.lstatSync(localUri).isDirectory()) {
                traversalDir(localUri, replace, dest, templateUri); // 递归遍历文件
            }
            else {
                replaceFile(localUri, replace, dest, templateUri); //  如果是文件做替换
            }
        })(file, uri);
    });
};
exports.generate = (template, dest, projectName) => {
    const spinner = ora_1.default('项目生成中').start();
    let result;
    try {
        traversalDir(template, projectName, dest, template);
        result = { state: result_1.State.Succss, msg: '项目生成完成' };
    }
    catch (error) {
        result = { state: result_1.State.Fail, msg: 'fail' };
        log(`项目生成失败：${error}`);
    }
    finally {
        spinner.stop();
    }
    return result;
};
//# sourceMappingURL=generate-project.js.map