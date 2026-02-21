import { Controller, Get, Param, Post, Body, Patch } from "@nestjs/common";
import { TendersService } from "./tenders.service";
import { CreateTenderDto } from "./dto/create-tender.dto";
import { UpdateTenderDto } from "./dto/update-tender.dto";

@Controller("tenders")
export class TendersController {
  constructor(private readonly service: TendersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateTenderDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateTenderDto) {
    return this.service.update(id, dto);
  }

  @Post(":id/transition")
  transition(@Param("id") id: string, @Body() body: { to: string }) {
    return this.service.transition(id, body.to);
  }
}
