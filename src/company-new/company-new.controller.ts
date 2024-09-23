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
import { CompanyNewService } from './company-new.service';
import {
  CreateCompanyNewByUserDto,
  CreateCompanyNewDto,
} from './dto/create-company-new.dto';
import { UpdateCompanyNewDto } from './dto/update-company-new.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetUser } from '../decorators/get-user.decorator';
import { User } from '../users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@Controller('company-new')
export class CompanyNewController {
  constructor(private readonly companyNewService: CompanyNewService) {}

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.companyNewService.findAll();
  }

  @Get('me')
  findAllForMe(@GetUser() user: User) {
    return this.companyNewService.findAllForMe(user._id);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  findById(@Param('id') id: string) {
    return this.companyNewService.findById(id);
  }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() dto: CreateCompanyNewDto) {
    return this.companyNewService.create(dto);
  }

  @Post('me')
  createByMe(@GetUser() user: User, @Body() dto: CreateCompanyNewByUserDto) {
    return this.companyNewService.create({ userId: user._id, ...dto });
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  update(
    @Param('id') id: string,
    @Body() updateCompanyNewDto: UpdateCompanyNewDto,
  ) {
    return this.companyNewService.update(id, updateCompanyNewDto);
  }

  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.companyNewService.remove(id);
  }
}
