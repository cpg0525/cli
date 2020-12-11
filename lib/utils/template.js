"use strict";
/*
 * @Author: pengguo.chen@ucarinc.com
 * @Date: 2020-11-10 18:43:31
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 18:44:48
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const js_yaml_1 = __importDefault(require("js-yaml"));
const fs_1 = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
const down_load_tpl_1 = __importDefault(require("./down-load-tpl"));
const yml = path_1.default.join(__dirname, '../../template.yml');
const log = console.log;
const getTpl = () => {
    let tpl;
    try {
        tpl = js_yaml_1.default.safeLoad(fs_1.default.readFileSync(yml, 'utf8'));
    }
    catch (error) {
        log(chalk_1.default.red(`读取yml 文件错误：${error}`));
    }
    return tpl;
};
const tpl = getTpl();
const list = tpl && tpl.list ? tpl.list : null;
const remotePath = tpl && tpl.remotePath ? tpl.remotePath : null;
const getTplInfo = (k1, k2) => {
    if (!k1 && !k2)
        return list;
    return list[k1] ? list[k1][`${k2}`] : null;
};
const choices = () => {
    const keys = Object.keys(list);
    const result = [];
    keys.forEach(key => {
        const item = {
            name: list[key].name,
            value: key,
        };
        if (list[key].disabledInfo)
            item.disabled = list[key].disabledInfo;
        result.push(item);
    });
    return result;
};
const update = (template) => __awaiter(void 0, void 0, void 0, function* () {
    log(`remotePath: ${chalk_1.default.blue.underline.bold(remotePath)}\ntemplate: ${chalk_1.default.blue.underline.bold(template)}`);
    const result = yield down_load_tpl_1.default(remotePath, template);
    if (result.state !== 0)
        return;
    fs_1.createReadStream(path_1.default.join(template, 'template.yml')).pipe(fs_1.createWriteStream(yml));
});
exports.default = {
    getTpl,
    getTplInfo,
    remotePath,
    update,
    choices,
};
//# sourceMappingURL=template.js.map