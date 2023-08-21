import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  RequestMapping,
  Res,
  UseGuards
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SignIn, SignUp } from '@common/types';
import { mapRequest } from '@shared/pipes';

import { SignInResponses, SignUpResponses, router } from './auth.config';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @RequestMapping(mapRequest(router.routes.signIn))
  async signIn(
    @Res({ passthrough: true })
    res: Response,
    @Body()
    signIn: SignIn
  ): Promise<SignInResponses> {
    const result = await this.authService.signIn(signIn);

    if (!result) {
      res.status(HttpStatus.BAD_REQUEST);

      return {
        error: {
          type: 'WRONG_CREDENTIALS',
        },
      };
    }
  
    return result;
  }

  @RequestMapping(mapRequest(router.routes.signUp))
  async signUp(@Body() signUp: SignUp): Promise<SignUpResponses> {
    return await this.authService.signUp(signUp);
  }

  @UseGuards(AuthGuard)
  @Get('/me')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
