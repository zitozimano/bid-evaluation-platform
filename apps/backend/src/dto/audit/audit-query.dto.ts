import { ApiProperty } from "@nestjs/swagger";

export class AuditQueryDto {
  @ApiProperty({ required: false })
  userId?: string;

  @ApiProperty({ required: false })
  entityType?: string;

  @ApiProperty({ required: false })
  entityId?: string;
}
