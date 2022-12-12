import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/User';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './userDTO/updateUserDTO';
import { CreateUserDto } from './userDTO/userDTO';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    private readonly logger = new Logger(UserService.name);

    async findAll(): Promise<User[] | any> {

        try {
            return await this.usersRepository.find({
                select: ['id', 'firstName', 'lastName', 'email'],
            });
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message);
        }

    }

    async findById(id: string) {
        try {
            // const userExists = await this.usersRepository.findOne({ where: { id: id } });
            // if (!userExists) {
            //     throw new BadRequestException('Usuario nao existe')
            // }
            return await this.usersRepository.findOne({ where: { id: id } });
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message);
        }
    }

    async create(data: CreateUserDto){
        try {
            
            const userCreate = this.usersRepository.create(data)
            return await this.usersRepository.save(userCreate)
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`)
            throw new RpcException(error.message);
        }

    }

    async updateUser(id: string, data: UpdateUserDTO): Promise<void> {
        const user = await this.usersRepository.findOne({ where: { id: id } })
        if (!user.id) {
            throw new RpcException("usuario nao encontrado");
        }
        user.email = data.email,
            user.password = data.password
        await this.usersRepository.update(id, { email: user.email, password: user.password })
    }

    async delete(id: string): Promise<void> {

        try {
            await this.usersRepository.delete(id);
        } catch (error) {
            this.logger.error(`error: ${JSON.stringify(error.message)}`);
            throw new RpcException(error.message);
        }
    }
}


