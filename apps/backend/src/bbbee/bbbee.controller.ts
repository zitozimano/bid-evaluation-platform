import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BbbeeService } from './bbbee.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('bbbee')
export class BbbeeController {
  constructor(private bbbeeService: BbbeeService) {}

  @Get(':bidderId')
  @Roles(Role.SCM, Role.CFO, Role.AUDIT)
  getBidderBee(@Param('bidderId') bidderId: string) {
    return this.bbbeeService.getBidderBee(bidderId);
  }

  @Patch(':bidderId')
  @Roles(Role.SCM)
  updateBidderBee(@Param('bidderId') bidderId: string, @Body() body: any) {
    return this.bbbeeService.updateBidderBee(bidderId, body);
  }

  @Post(':bidderId/calculate')
  @Roles(Role.SCM, Role.CFO)
  calculateBeePoints(@Param('bidderId') bidderId: string) {
    return this.bbbeeService.calculateBeePoints(bidderId);
  }

  @Post(':bidderId/verify')
  @Roles(Role.SCM)
  verifyCertificate(@Param('bidderId') bidderId: string) {
    return this.bbbeeService.verifyCertificate(bidderId);
  }
}
