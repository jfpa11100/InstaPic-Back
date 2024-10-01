import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = this.userRepository.create(createUserDto)
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error(error)
      if(error.code === '23505'){
        throw new BadRequestException(error.detail)
      }
      throw new InternalServerErrorException(error)
    }
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
