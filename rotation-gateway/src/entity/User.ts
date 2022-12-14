import { IsNotNull } from "@nestjsi/class-validator";
import { IsEmail, IsOptional } from "class-validator";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { hashSync } from 'bcrypt';


@Entity({ name: 'user' })
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName?: string;

    @Column()
    @IsOptional()
    lastName?: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    @IsNotNull()
    password: string;

    @BeforeInsert()
    hashPassword() {
        this.password = hashSync(this.password, 10);
    }
}   