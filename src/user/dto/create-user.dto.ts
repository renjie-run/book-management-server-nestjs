import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @IsEmail(
    { allow_ip_domain: false },
    { message: 'username must be email format' },
  )
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  @MinLength(6, { message: 'password must be at least 6 characters' })
  password: string;
}
