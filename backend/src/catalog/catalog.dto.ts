import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Min,
} from 'class-validator';
class CommonItemDto {
  @IsString() @Length(1, 120) name: string;
  @IsString() @Length(1, 4000) description: string;
  @IsNumber() @Min(0) price: number;
  @IsOptional() @IsBoolean() available?: boolean;
  @IsOptional() @IsUrl() imageUrl?: string;
}
export class AgriculturalProductDto extends CommonItemDto {
  @IsOptional() @IsString() type?: string;
  @IsOptional() @IsString() origin?: string;
  @IsOptional() @IsString() season?: string;
}
export class CraftDto extends CommonItemDto {
  @IsInt() @Min(0) quantity: number;
  @IsString() @Length(1, 120) material: string;
  @IsString() @Length(1, 120) origin: string;
}
export class FarmDto extends CommonItemDto {
  @IsString() @Length(1, 200) location: string;
  @IsString() @Length(1, 1000) services: string;
  @IsInt() @IsPositive() capacity: number;
}
export class TourDto {
  @IsString() @Length(1, 120) title: string;
  @IsNumber() @Min(0) price: number;
  @IsOptional() @IsUrl() imageUrl?: string;
  @IsDateString() date: string;
  @IsString() time: string;
  @IsString() location: string;
  @IsNumber() @IsPositive() durationHours: number;
  @IsString() @Length(1, 4000) description: string;
  @IsOptional() @IsInt() @IsPositive() farmId?: number;
}
export class PromotionDto {
  @IsString() @Length(1, 120) title: string;
  @IsString() @Length(1, 4000) description: string;
  @IsDateString() startDate: string;
  @IsDateString() endDate: string;
}
