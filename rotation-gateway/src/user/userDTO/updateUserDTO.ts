import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class UpdateUserDTO {

    @IsEmail()
    @IsOptional()
    email: string;

    @IsNotEmpty()
    password: string;
}