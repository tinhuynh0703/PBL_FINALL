import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { User } from 'src/decorators/user.decorator';
import { User as userEntity } from '../entities/user.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { FreeUnitService } from 'src/modules/free-unit/services/free-unit.service';
import { RoleType } from 'src/modules/roles/constants/role.constant';
import { UpdateWebhookDto } from '../dto/requests/update-webhook.dto';
import { UserInforDto } from '../dto/respone/user-infor.dto';
import { UsersService } from '../services/users.service';
import { PaginationQueryDto } from '../../shared/dto/pagination-query.dto';
import { ChangePasswordDto } from '../dto/requests/change-password.dto';
import * as bcrypt from 'bcrypt';
import { AddDeviceTokenDto } from '../dto/requests/add-device-token.dto';
import { UpdateUserDto } from '../dto/requests/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(JwtAuthGuard)
@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly freeUnitService: FreeUnitService,
  ) {}

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get All User' })
  @Get()
  @ApiOkResponse({
    description: 'Get All User successfully.',
    type: [UserInforDto],
  })
  @ApiUnauthorizedResponse({ description: 'Please Authenticate' })
  findAll(
    @Query() paginationQueryDto: PaginationQueryDto,
  ): Promise<{ user: userEntity[]; totalUser: number }> {
    return this.usersService.findAllUser(paginationQueryDto);
  }

  @ApiOperation({ summary: 'Get user profile' })
  @Get('/profile')
  @ApiOkResponse({ description: 'successfully', type: UserInforDto })
  @ApiUnauthorizedResponse({ description: 'Please Authenticate' })
  getProfile(@User() user) {
    return user;
  }

  @ApiOperation({ summary: 'Get current free unit' })
  @Get('/freeunit')
  @ApiOkResponse({
    description: ' Get current free unit successfully',
    type: Number,
  })
  @ApiUnauthorizedResponse({ description: 'Please Authenticate' })
  getFreeUnit(@User() user) {
    return user.freeUnit;
  }

  @Roles(RoleType.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Update free unit for all users' })
  @Patch('/freeunit')
  @ApiOkResponse({ description: 'Update free unit successfully' })
  @ApiUnauthorizedResponse({ description: 'Please Authenticate' })
  async updateFreeUnit() {
    const freeUnit = await this.freeUnitService.get();
    if (!freeUnit) {
      throw new BadRequestException();
    }
    const newFreeUnit = { freeUnit: freeUnit.quantity };
    return this.usersService.updateAllFreeUnit(newFreeUnit);
  }

  @ApiOperation({ summary: 'Change Password for User' })
  @Patch('/change-password')
  @ApiOkResponse({
    description: ' Change Password successfully',
  })
  @ApiUnauthorizedResponse({ description: 'Please Authenticate' })
  async changePasswordUser(
    @User() user,
    @Body() changePasswordDto: ChangePasswordDto,
    @Res() res,
  ) {
    if (changePasswordDto.currentPassword === changePasswordDto.newPassword) {
      throw new BadRequestException(
        'New Password must different with old password!',
      );
    }
    if (
      await bcrypt.compare(changePasswordDto.currentPassword, user.password)
    ) {
      await this.usersService.changePassword(
        user,
        changePasswordDto.newPassword,
      );
      res.status(200).send('Change Password successfully!');
    } else {
      throw new BadRequestException('Current password does not match!');
    }
  }

  @ApiOperation({ summary: 'Update webhook ' })
  @ApiOkResponse({
    description: 'Update webhook successfully',
    type: UserInforDto,
  })
  @ApiUnauthorizedResponse({ description: 'Please Authenticate' })
  @Patch('/webhook')
  updateWebHook(@User() user, @Body() updateWebHookDto: UpdateWebhookDto) {
    return this.usersService.updateWebHook(user, updateWebHookDto.webHook);
  }

  @ApiOperation({ summary: 'Get webhook ' })
  @ApiOkResponse({
    description: 'Get webhook successfully',
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Please Authenticate',
  })
  @Get('/webhook')
  getWebhook(@User() user) {
    return user.webHook;
  }

  @ApiOperation({ summary: 'Update avatar ' })
  @ApiOkResponse({
    description: 'Update avatar successfully',
    type: UserInforDto,
  })
  @UseInterceptors(FileInterceptor('avatarUrl'))
  @ApiUnauthorizedResponse({ description: 'Please Authenticate' })
  @Patch('/avatar')
  updateAvatar(
    @User() user,
    // @Body()
    // updateAvatar: UpdateUserDto,
    @UploadedFile() avatarUrl: Express.Multer.File,
  ) {
    try {
      console.log('vaoday')
      return this.usersService.updateAvatar(user.id, avatarUrl);
    } catch (e) {
      Logger.error(e);
    }
  }

  @ApiOperation({ summary: 'Add device token for user' })
  @ApiOkResponse({
    description: 'Add device token for user successfully',
    type: String,
  })
  @ApiUnauthorizedResponse({
    description: 'Please Authenticate',
  })
  @Post('/deviceToken')
  addDeviceToken(@User() user, @Body() deviceTokenDto: AddDeviceTokenDto) {
    return this.usersService.addDeviceToken(user, deviceTokenDto.deviceToken);
  }
}
