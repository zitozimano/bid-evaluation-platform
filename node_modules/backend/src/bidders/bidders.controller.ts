import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { BiddersService } from './bidders.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('bidders')
export class BiddersController {
  constructor(private biddersService: BiddersService) {}

  @Get()
  @Roles(Role.SCM, Role.CFO, Role.AUDIT)
  list(@Query('tenderId') tenderId: string) {
    return this.biddersService.listBidders(tenderId);
  }

  @Get(':bidderId')
  @Roles(Role.SCM, Role.CFO, Role.AUDIT)
  getOne(@Param('bidderId') bidderId: string) {
    return this.biddersService.getBidder(bidderId);
  }

  @Post()
  @Roles(Role.SCM)
  create(@Query('tenderId') tenderId: string, @Body() body: any) {
    return this.biddersService.createBidder(tenderId, body);
  }

  @Patch(':bidderId')
  @Roles(Role.SCM)
  update(@Param('bidderId') bidderId: string, @Body() body: any) {
    return this.biddersService.updateBidder(bidderId, body);
  }

  @Post(':bidderId/disqualify')
  @Roles(Role.SCM)
  disqualify(
    @Param('bidderId') bidderId: string,
    @Body('reason') reason: string,
  ) {
    return this.biddersService.disqualifyBidder(bidderId, reason);
  }
}
