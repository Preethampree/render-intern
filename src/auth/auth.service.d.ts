import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export interface JwtPayload {
    sub: number;
    email: string;
    role: string;
    name: string;
}
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    validateUser(email: string): Promise<User | null>;
    findOrCreateUser(profile: any, role: string): Promise<User>;
    generateJwtToken(user: User): Promise<string>;
    getUserById(id: number): Promise<User | null>;
}
