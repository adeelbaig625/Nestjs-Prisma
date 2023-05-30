import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot({
      ttl: 30,
      limit: 4,
    }),
  ],
})
export class ArticlesModule {}
