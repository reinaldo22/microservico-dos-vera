import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { RpcException } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { ValidacaoParametrosPipe } from 'src/common/pipe/validacao-parametro';
import { ProxySmartRotation } from 'src/proxyrmqp/client-proxy';
import { UpdateUserDTO } from './userDTO/updateUserDTO';
import { CreateUserDto } from './userDTO/userDTO';

@Controller('api/v1/users')
export class UserController {

    private logger = new Logger(UserController.name)

    constructor(private proxySmartRotation: ProxySmartRotation) {

    }

    private clientAdminBackend = this.proxySmartRotation.getClientProxyAdminBackendInstance()


    @Post()
    @UsePipes(ValidationPipe)
    async createUser(@Body(ValidacaoParametrosPipe) userDTO: CreateUserDto) {

        this.logger.log(` api-gateway: ${JSON.stringify(userDTO)}`)
        const user = await this.clientAdminBackend.send('consultar-todos', userDTO).toPromise()
        const emailExists = await user.some(elem => elem.email == userDTO.email)
        console.log(emailExists)
        if (emailExists === true) {
            throw new RpcException("Usuario exists");
        }
        this.logger.log(` condicional: ${JSON.stringify(user)}`)
        return this.clientAdminBackend.emit('cria-usuario', userDTO)
    }

    @Get()
    getAllUser(@Query('idUser') id: string): Observable<any> {
        console.log('api-gateway')
        return this.clientAdminBackend.send('consultar-todos', id ? id : '');
    }

    @Get('/:id')
    findById(@Param('id') id: string): Observable<any> {
        console.log('api-gateway')
        return this.clientAdminBackend.send('consultar-usuarioId', id);
    }

    @Put('/:id')
    @UsePipes(ValidationPipe)
    updateUser(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
        return this.clientAdminBackend.emit('atualizar-usuario', { id: id, email: updateUserDTO.email, password: updateUserDTO.password });
    }

    @Delete('/:id')
    deleteUser(@Param('id', ValidacaoParametrosPipe) id: string) {
        this.clientAdminBackend.emit('deletar-user', { id });
    }
}
