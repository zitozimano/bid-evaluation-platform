import { Module } from '@nestjs/common';
import { BbbeeService } from './bbbee.service';
import { BbbeeController } from './bbbee.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [BbbeeController],
  providers: [BbbeeService],
  exports: [BbbeeService],
})
export class BbbeeModule {}
