import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AuthModule } from './repositories/auth/auth.module';
import { UsersModule } from './repositories/users/users.module';
import { configuration, ConfigurationInterface } from './configs/configuration';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_CONNECTION_STRING),
        dbName: configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_DATABASE),
        retryAttempts: configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_RETRY_ATTEMPTS),
        retryDelay: configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_RETRY_DELAY)
      }),
      inject: [ConfigService]
    }),
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env.development.local'
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get(configuration.YMRLK_THROTTLE_TTL),
        limit: configService.get(configuration.YMRLK_THROTTLE_LIMIT)
      }),
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule {}
