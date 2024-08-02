import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'username is required' })
  @IsEmail(
    { allow_ip_domain: false },
    { message: 'username must be email format' },
  )
  username: string;

  @IsNotEmpty({ message: 'password is required' })
  password: string;
}
