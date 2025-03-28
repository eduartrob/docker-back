export class User {
    static findOne(arg0: { username: string; }) {
        throw new Error('Method not implemented.');
    }
    readonly id: string;
    private username: string;
    private password: string;

    constructor(id: string, username: string, password: string) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    public getPublicUserData(): { id: string, username: string } {
        return {
          id: this.id,
          username: this.username
        };
    }
    public getPublicUserDataFromRecoveryPasswd() : {id:string, username:string} {
        return {
            id: this.id,
            username: this.username,
        }
    }
    public getUserOnlineData(): {id:string, username:string}{
        return {
            id:this.id,
            username: this.username,
        }
    }
}
