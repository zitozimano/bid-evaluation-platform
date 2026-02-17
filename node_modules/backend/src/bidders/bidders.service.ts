import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BiddersService {
  constructor(private prisma: PrismaService) {}

  async listBidders(tenderId: string) {
    return {
      tenderId,
      bidders: [],
      message: 'List bidders not yet implemented',
    };
  }

  async getBidder(bidderId: string) {
    return {
      bidderId,
      bidder: null,
      message: 'Get bidder not yet implemented',
    };
  }

  async createBidder(tenderId: string, payload: any) {
    return {
      tenderId,
      payload,
      message: 'Create bidder not yet implemented',
    };
  }

  async updateBidder(bidderId: string, payload: any) {
    return {
      bidderId,
      payload,
      message: 'Update bidder not yet implemented',
    };
  }

  async disqualifyBidder(bidderId: string, reason: string) {
    return {
      bidderId,
      reason,
      message: 'Disqualify bidder not yet implemented',
    };
  }
}
