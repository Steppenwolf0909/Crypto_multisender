import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BlockchainModule } from './blockchain/blockchain.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import  database  from 'config/database'
import { BlockchainEntity } from '../bd/src/entity/blockchain.entity';
import {Auth} from "../bd/src/entity/Auth";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
            TypeOrmModule.forRootAsync({
              imports: [ConfigModule.forRoot({ load: [database], envFilePath: '.development.env' })],
              useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.database'),
                entities: [BlockchainEntity, Auth],
                synchronize: configService.get<boolean>('database.synchronize'),
              }),
              inject: [ConfigService],
            }),
            ScheduleModule.forRoot(),
            AuthModule,BlockchainModule
            ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

