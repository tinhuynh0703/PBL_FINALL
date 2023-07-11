import { ApiProperty } from "@nestjs/swagger";
import { IS_DATE, IS_DATE_STRING, IsInt, IsOptional, IsPositive, IsString, Min } from "class-validator";
import { Type } from 'class-transformer';

export class QueryDateDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  from: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  to: string;
}