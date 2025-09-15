import { User } from './user.entity';
import { Otp } from './otp.entity';
export declare class Patient {
    id: number;
    name: string;
    email: string;
    phone: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    otps: Otp[];
}
