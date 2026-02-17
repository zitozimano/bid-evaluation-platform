import { Module } from '@nestjs/common';
import { BiddersService } from './bidders.service';
import { BiddersController } from './bidders.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BiddersController],
  providers: [BiddersService],
  exports: [BiddersService],
})
export class BiddersModule {}
