import { Module } from '@nestjs/common';
import { APP_GUARD, RouterModule } from '@nestjs/core';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

import { AuthModule } from './repositories/auth/auth.module';
import { UsersModule } from './repositories/users/users.module';
import { JwtAuthGuard } from './repositories/auth/guards/jwt-auth.guard';

import { configuration, ConfigurationInterface } from './configs/configuration';
import { routes } from './routes';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:            configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_CONNECTION_STRING),
        dbName:         configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_DATABASE_NAME),
        retryAttempts:  configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_RETRY_ATTEMPTS),
        retryDelay:     configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_RETRY_DELAY),
        user:           configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_USER),
        pass:           configService.get<ConfigurationInterface>(configuration.YMRLK_MONGODB_PASSWORD)
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
        ttl:    configService.get(configuration.YMRLK_THROTTLE_TTL),
        limit:  configService.get(configuration.YMRLK_THROTTLE_LIMIT)
      }),
      inject: [ConfigService]
    }),
    RouterModule.register(routes),

    // Custom
    AuthModule,
    UsersModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    }
  ]
})
export class AppModule {}
