import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {UsersModule} from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "../../config/constant";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports:[UsersModule, PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d'},
    }),
  ],
  providers: [AuthService,  JwtStrategy],
  exports:[AuthService]
})
export class AuthModule {}
