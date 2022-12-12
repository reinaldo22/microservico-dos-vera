import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { Ctx, EventPattern, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateUserDto } from './userDTO/userDTO';
import { UpdateUserDTO } from './userDTO/updateUserDTO';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/entity/User';

const ackErrors: string[] = ['E11000', 'Usuario exists']

@Controller('users')
export class UserController {

    constructor(private userService: UserService) { }

    logger = new Logger(UserController.name);



    @EventPattern('cria-usuario')
    async createUser(@Payload() user: CreateUserDto, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        this.logger.log(`usuario criado: ${JSON.stringify(user)}`)

        try {
            await this.userService.create(user)
            await channel.ack(originalMsg);
        } catch (error) {
            this.logger.error(`error:  ${JSON.stringify(error)}`)
            console.log(`------------------------------${error}`)
            ackErrors.map(async ackError => {
                if (error.message.includes(ackError)) {
                    await channel.ack(originalMsg)
                }
            })
        }

    }

    @MessagePattern('consultar-todos')
    async getAll(@Payload() id: string, @Ctx() context: RmqContext): Promise<Pagination<User>> {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            return this.userService.findAll()
        } finally {
            await channel.ack(originalMsg)
        }
    }

    @EventPattern('atualizar-usuario')
    async update(@Payload() data: any, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {

            const id: string = data.id
            const usuario: UpdateUserDTO = data
            console.log(`${JSON.stringify(usuario)}`)
            await this.userService.updateUser(id, usuario)
            await channel.ack(originalMsg)
        } catch (error) {
            this.logger.error(`error:  ${JSON.stringify(error.message)}`)
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))
            if (filterAckError) {
                await channel.ack(originalMsg)
            }
        }
    }

    @EventPattern('deletar-user')
    async deleteUser(@Payload() id: string, @Ctx() context: RmqContext) {
        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            await this.userService.delete(id);
            await channel.ack(originalMsg);
        } catch (error) {
            this.logger.error(`error:  ${JSON.stringify(error.message)}`)
            const filterAckError = ackErrors.filter(
                ackError => error.message.includes(ackError))
            if (filterAckError) {
                await channel.ack(originalMsg)
            }
        }
    }

    @MessagePattern('consultar-usuarioId')
    async findById(@Payload() id: string, @Ctx() context: RmqContext) {

        const channel = context.getChannelRef()
        const originalMsg = context.getMessage()

        try {
            console.log(`>>>>>>>>>>>${JSON.stringify(id)}`)
            return this.userService.findById(id)
        } finally {
            await channel.ack(originalMsg)
        }
    }
}
