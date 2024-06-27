import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;
export class HashData{
    static hasPassword = async (password:string):Promise<string> =>{
        return await bcrypt.hash(password, saltOrRounds);
    }
    static comparePassword = async (password:string, hash:string):Promise<boolean> =>{
        return await bcrypt.compare(password, hash);
    }
}