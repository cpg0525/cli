"use strict";
/*
 * @Author: pengguo.chen@ucarinc.com
 * @Date: 2020-11-10 14:16:24
 * @Last Modified by: pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 17:53:52
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
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const path_1 = require("path");
const dynamic_import_1 = require("./utils/dynamic-import");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const pkg = yield dynamic_import_1.dynamicImport(path_1.resolve(__dirname, '../', 'package.json'));
    commander_1.program
        .version(pkg.version)
        .usage('<command> [options]')
        .command('init', '通过模版创建项目')
        .command('list', '查看模版列表')
        .command('update', '更新模版')
        .parse(process.argv);
}))();
//# sourceMappingURL=index.js.map