import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { Matches } from 'class-validator';
import { MessagesHelper } from "src/helpers/message.helper";
import { RegExHelper } from "src/helpers/regex.helper";

export class CreateUserDto {

    @IsNotEmpty()
    firstName: string;

    @IsOptional()
    lastName?: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Matches(RegExHelper.password, { message: MessagesHelper.PASSWORD_VALID })
    password: string;
}