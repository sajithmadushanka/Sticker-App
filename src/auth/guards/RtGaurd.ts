import { AuthGuard } from "@nestjs/passport";

export class RtGuard extends AuthGuard('refreshToken') {
    constructor() {
        super();
    }
}