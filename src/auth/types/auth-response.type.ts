import { Tokens } from "./tokens.type";

export type ErrorResponse = {
    error: string;
  };

export type AuthResponse = {
    user:{
        id:string,
        email:string,
        };
    tokens:Tokens
}