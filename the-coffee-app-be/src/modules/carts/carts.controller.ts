import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiCreatedResponse, ApiOperation } from "@nestjs/swagger";
import { Roles } from "../../decorators/roles.decorator";
import { RoleType } from "../roles/constants/role.constant";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { RolesGuard } from "../../guards/roles.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { Product } from "../products/entities/product.entity";
import { CreateProductDto } from "../products/dto/requests/create-product.dto";
import { ImageFileType } from "../shared/constants/file-types.constant";

@Controller('carts')
export class CartsController {
  constructor() {}

  // @Roles(RoleType.CUSTOMER)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @ApiOperation({ summary: 'Add new item to cart' })
  // @Post()
  // @ApiCreatedResponse({
  //   description: 'Add new item to cart successfully',
  //   type: Product,
  // })
  // async create(
  //   @Body() createProductDto: CreateProductDto,
  //   @UploadedFile() images: Express.Multer.File,
  // ): Promise<Product> {
  //
  // }
}
