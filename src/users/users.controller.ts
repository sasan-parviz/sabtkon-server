import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginRequestOtpDto,
  LoginSubmitInformationDto,
  LoginSubmitOtpDto,
  UpdateUserDto,
} from './dto/user.dto';
import { Public } from '../decorators/public.decorator';
import { AdminGuard } from '../guards/admin.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth('JWT')
  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @ApiBearerAuth('JWT')
  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @ApiBearerAuth('JWT')
  @Post()
  @UseGuards(AdminGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiBearerAuth('JWT')
  @Patch(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiBearerAuth('JWT')
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Public()
  @Post('login/requestOTP')
  loginRequestOtp(@Body() loginRequestOtpDto: LoginRequestOtpDto) {
    return this.usersService.loginRequestOtp(loginRequestOtpDto);
  }

  @Public()
  @Post('login/submitOTP')
  loginSubmitOtp(@Body() loginSubmitOtpDto: LoginSubmitOtpDto) {
    return this.usersService.loginSubmitOtp(loginSubmitOtpDto);
  }

  @Public()
  @Post('login/submitInformation')
  loginSubmitInformation(@Body() dto: LoginSubmitInformationDto) {
    return this.usersService.loginSubmitInformation(dto);
  }
}
