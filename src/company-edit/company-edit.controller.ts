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
import { CompanyEditService } from './company-edit.service';
import {
  CreateCompanyEditByUserDto,
  CreateCompanyEditDto,
} from './dto/create-company-edit.dto';
import { UpdateCompanyEditDto } from './dto/update-company-edit.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@Controller('company-edit')
export class CompanyEditController {
  constructor(private readonly companyEditService: CompanyEditService) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.companyEditService.findAll();
  }

  @Get('me')
  findAllForMe(@GetUser() user: User) {
    return this.companyEditService.findAllForMe(user._id);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findById(@Param('id') id: string) {
    return this.companyEditService.findById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() dto: CreateCompanyEditDto) {
    return this.companyEditService.create(dto);
  }

  @Post('me')
  createByMe(@GetUser() user: User, @Body() dto: CreateCompanyEditByUserDto) {
    return this.companyEditService.create({ userId: user._id, ...dto });
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateCompanyEditDto: UpdateCompanyEditDto,
  ) {
    return this.companyEditService.update(id, updateCompanyEditDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.companyEditService.remove(id);
  }
}
