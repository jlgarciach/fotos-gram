"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    constructor() { }
    static getJwtToken(payload) {
        return jsonwebtoken_1.default.sign({
            usuario: payload
        }, this.seed, { expiresIn: this.caducidad });
    }
    static comporobaToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.seed, (err, decode) => {
                if (err) {
                    // no confiar
                    reject();
                }
                else {
                    // token valido
                    resolve(decode);
                }
            });
        });
    }
}
exports.default = Token;
Token.seed = 'este-es-el-seed-de-mi-app-secreto';
Token.caducidad = '30d';