// import {
//   Body,
//   Controller,
//   Get,
//   HttpCode,
//   HttpStatus,
//   Post,
//   Req,
//   UseGuards
// } from '@nestjs/common';
// import { Request } from 'express';
// import { AuthGuard } from './auth.guard';
// import { AuthService } from './auth.service';
// import { SignIn, SignUp } from '@common/types';

// @Controller('/auth')
// export class AuthController {
//   constructor(private authService: AuthService) {}

//   @HttpCode(HttpStatus.OK)
//   @Post('/sign-in')
//   signIn(@Body() signIn: SignIn) {
//     return this.authService.signIn(signIn);
//   }

//   @HttpCode(HttpStatus.OK)
//   @Post('/sign-up')
//   signUp(@Body() signUp: SignUp) {
//     return this.authService.signUp(signUp);
//   }

//   @UseGuards(AuthGuard)
//   @Get('/me')
//   getMe(@Req() req: Request) {
//     return req.user;
//   }
// }
