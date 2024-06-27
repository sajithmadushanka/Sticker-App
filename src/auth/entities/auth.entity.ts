import { Prisma } from "@prisma/client";

export class Auth implements Prisma.AuthUncheckedCreateInput{
    id?: string;
    email: string;
    password: string;

    constructor(data:Prisma.AuthUncheckedCreateInput){
        this.id = data.id;
        this.email = data.email;
        this.password = data.password;
    }
}
