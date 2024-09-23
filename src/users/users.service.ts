import {
  ServiceUnavailableException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import {
  CreateUserDto,
  LoginRequestOtpDto,
  LoginSubmitInformationDto,
  LoginSubmitOtpDto,
  UpdateUserDto,
} from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private jwtService: JwtService,
  ) {}

  async findAll() {
    return await this.userModel.find({});
  }

  async findById(id: string) {
    return await this.userModel.findById(id);
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return await newUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    Object.assign(user, {
      ...updateUserDto,
    });
    return await user.save();
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async loginRequestOtp({ mobile }: LoginRequestOtpDto) {
    const newOtpCode = Math.floor(Math.random() * 90000) + 10000;
    await this.cacheManager.set(mobile, String(newOtpCode), 0);
    console.info(`For mobile ${mobile} the code is ${newOtpCode}`);

    // Sending OTP Code
    const smsReq = await fetch('https://api.sms.ir/v1/send/verify', {
      method: 'POST',
      headers: {
        ACCEPT: 'application/json',
        'X-API-KEY': 'SMS_API_KEY',
      },
      body: JSON.stringify({
        mobile: mobile.startsWith('0') ? mobile.substring(1) : mobile,
        templateId: 100000,
        parameters: [
          {
            name: 'Code',
            value: '12345',
          },
        ],
      }),
    });
    if (smsReq.status !== 200) {
      throw new ServiceUnavailableException(
        'سرویس پیامکی با مشکل مواجه شده است',
      );
    } else {
      return {
        ok: true,
        mobile,
      };
    }
  }

  async loginSubmitOtp({ mobile, otpCode }: LoginSubmitOtpDto) {
    const code = await this.cacheManager.get(mobile);
    if (String(code) === String(otpCode)) {
      const user = await this.userModel.findOne({ mobile });
      if (user) {
        await this.cacheManager.del(mobile);
        const userInformation = user.toObject();
        return {
          ok: true,
          needInformation: false,
          access_token: await this.jwtService.signAsync(userInformation),
          user: userInformation,
        };
      } else {
        return {
          ok: true,
          needInformation: true,
          mobile,
          otpCode,
        };
      }
    } else {
      throw new UnauthorizedException();
    }
  }

  async loginSubmitInformation(dto: LoginSubmitInformationDto) {
    const code = await this.cacheManager.get(dto.mobile);
    if (String(code) === String(dto.otpCode)) {
      const newUser = new this.userModel(dto);
      await newUser.save();
      const userInformation = newUser.toObject();
      return {
        ok: true,
        needInformation: false,
        access_token: await this.jwtService.signAsync(userInformation),
        user: userInformation,
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
