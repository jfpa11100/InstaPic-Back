import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private jwtService: JwtService
  ){}

  async create(createUserDto: CreateUserDto) {
    try{
      const { password, ...user } = createUserDto;
      const newUser = this.userRepository.create({
        password: bcryptjs.hashSync(password),
        ...user
      });
      const { password:_, ...created} = await this.userRepository.save(newUser);
      return {
        username:created.username,
        name:created.name,
        token:this.getToken({password, ...created})
      };
    }catch(error){
      console.log(error);
      if(error.code='23505'){
        throw new BadRequestException(`${createUserDto.username} ya existe!!`)
      }
      throw new InternalServerErrorException('Algo salió mal!!')
    }
  }

  async update(updateUserDto: UpdateUserDto){
    try {
      await this.userRepository.update({username:updateUserDto.username}, updateUserDto);
      return updateUserDto
    } catch(error){
      console.log(error);
      throw new BadRequestException('No se pudo actualizar el usuario')
    }
  }

  async login(loginUserDto:LoginUserDto){
    const { username, password } = loginUserDto;
    const user = await this.userRepository.findOneBy({username});
    if(!user || this.isNotValid(password, user.password)){
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return {
      username:user.username,
      name:user.name,
      photo: user.photo,
      token:this.getToken(user)
    };
  }

  async findAll() {
    const users = await this.userRepository.find();
    return users.map(item=>{
      const { password, ...user } = item;
      return user;
    });
  }

  async findOne(id: string) {
    const { password, ...user } = await this.userRepository.findOneBy({id});
    return user;
  }


  remove(id: string) {
    return `This action removes a #${id} auth`;
  }

  private isNotValid(password:string, encripted:string){
    return !bcryptjs.compareSync(password, encripted);
  }

  private getToken(user:User):string{
    return this.jwtService.sign({
      id:user.id,
      username:user.username,
      name:user.name
    });
  }
}