import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BusinessException } from 'src/common/exception/business.exception';

@Controller({
  path: 'user',
  version: '1',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('findBusinessError')
  @Version([VERSION_NEUTRAL, '1'])
  fineBusinessError() {
    const a: any = {};
    try {
      console.log(a.b.c);
    } catch (err) {
      throw new BusinessException('你的参数出错了');
    }
    return this.userService.findAll();
  }

  @Get('finderror')
  @Version([VERSION_NEUTRAL, '1'])
  findError() {
    const a: any = {};
    console.log(a.b.c);
    return this.userService.findAll();
  }

  @Get()
  @Version([VERSION_NEUTRAL, '1'])
  findAll() {
    return this.userService.findAll();
  }

  @Get()
  @Version('2')
  findAll2() {
    return '我是findAll2';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
