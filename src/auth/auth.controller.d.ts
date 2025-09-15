import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    googleAuth(role: string, req: any): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<void>;
}
