import {
  IsEmail,
  IsIn,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MinLength,
} from 'class-validator';
import { UserRole } from './user.entity';
export class RegisterUserDto {
  @IsString() @Length(1, 80) firstName: string;
  @IsString() @Length(1, 80) lastName: string;
  @IsEmail() email: string;
  @IsString() @MinLength(8) password: string;
  @IsOptional() @IsUrl() photoUrl?: string;
  @IsIn([UserRole.VISITOR, UserRole.FARMER, UserRole.ARTISAN]) role: UserRole;
}
export class UpdateUserDto {
  @IsOptional() @IsString() @Length(1, 80) firstName?: string;
  @IsOptional() @IsString() @Length(1, 80) lastName?: string;
  @IsOptional() @IsUrl() photoUrl?: string;
}
