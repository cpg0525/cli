"use strict";
/*
 * @Author: pengguo.chen@ucarinc.com
 * @Date: 2020-11-10 17:35:20
 * @Last Modified by:   pengguo.chen@ucarinc.com
 * @Last Modified time: 2020-11-10 17:35:20
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
exports.confirm = exports.prompt = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
exports.prompt = (question) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield inquirer_1.default.prompt(question);
    return result;
});
exports.confirm = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield exports.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message,
        },
    ]);
    return result;
});
//# sourceMappingURL=prompt.js.map