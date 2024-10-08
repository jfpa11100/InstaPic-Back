import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs'
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
              private jwtService: JwtService){}
  
  
  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...newUser } = createUserDto
      const userDb = this.userRepository.create({
        password: bcryptjs.hashSync(password),
        ...newUser
      })
      const { password:_, ...userAdded } = await this.userRepository.save(userDb)
      return userAdded
    } catch (error) {
      console.error(error)
      if(error.code === '23505'){
        throw new BadRequestException(error.detail)
      }
      throw new InternalServerErrorException(error)
    }
  }
  
  async login(loginUser: LoginUserDto) {
    const { username, password } = loginUser
    const user = await this.userRepository.find({ where:{ username } })

    if (user.length===0 || this.notValidUser(user[0], password)) {
      throw new ForbiddenException(`Not valid credentials`)
    }
    return {
      name: user[0].name,
      photo: user[0].photo,
      username: user[0].username,
      token: this.jwtService.sign({ username:user[0].username, id:user[0].id })
    }
  }

  private notValidUser(user:User, password:string):boolean{
    return !bcryptjs.compareSync(password, user.password)
  }

  async findAll() {
    const result = await this.userRepository.find({ where: { isActive:true } })
    return result.map(item =>{
      const { password, ...user } = item
      return user
    })
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
