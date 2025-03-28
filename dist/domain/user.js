"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    static findOne(arg0) {
        throw new Error('Method not implemented.');
    }
    constructor(id, username, password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    getPublicUserData() {
        return {
            id: this.id,
            username: this.username
        };
    }
    getPublicUserDataFromRecoveryPasswd() {
        return {
            id: this.id,
            username: this.username,
        };
    }
    getUserOnlineData() {
        return {
            id: this.id,
            username: this.username,
        };
    }
}
exports.User = User;
