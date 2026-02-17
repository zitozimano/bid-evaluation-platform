// imports unchanged, plus:
import { NotificationsService, NotificationTrigger } from "../notifications/notifications.service";

@Injectable()
export class TendersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
  ) {}

  // ... list/get/create/update as before ...

  async updateTenderStatus(tenderId: string, newStatus: string) {
    const tender = await this.prisma.tender.findUnique({
      where: { id: tenderId },
    });
    if (!tender) return null;

    const allowed = {
      DRAFT: ["PUBLISHED"],
      PUBLISHED: ["AWARDED", "ARCHIVED"],
      AWARDED: ["ARCHIVED"],
      ARCHIVED: [],
    };

    const current = tender.status ?? "DRAFT";
    if (!allowed[current].includes(newStatus)) {
      throw new Error(`Invalid transition: ${current} → ${newStatus}`);
    }

    const updated = await this.prisma.tender.update({
      where: { id: tenderId },
      data: { status: newStatus },
    });

    await this.logActivity(
      tenderId,
      "STATUS",
      `Status changed: ${current} → ${newStatus}`,
    );

    // timeline event
    await this.prisma.tenderTimelineEvent.create({
      data: {
        tenderId,
        type: "STATUS_CHANGE",
        label: `Status: ${current} → ${newStatus}`,
      },
    });

    // notification rules
    const trigger: NotificationTrigger =
      newStatus === "PUBLISHED"
        ? "TENDER_PUBLISHED"
        : newStatus === "AWARDED"
        ? "TENDER_AWARDED"
        : "TENDER_STATUS_CHANGED";

    await this.notifications.handleTrigger(trigger, {
      tenderId,
      tenderNumber: updated.number,
      newStatus,
    });

    return {
      id: updated.id,
      number: updated.number,
      description: updated.description,
      status: updated.status ?? "DRAFT",
      createdAt: updated.createdAt,
    };
  }

  async getTimeline(tenderId: string) {
    const events = await this.prisma.tenderTimelineEvent.findMany({
      where: { tenderId },
      orderBy: { createdAt: "asc" },
    });

    return events.map((e) => ({
      id: e.id,
      type: e.type,
      label: e.label,
      createdAt: e.createdAt,
    }));
  }

  async getTenderDetails(tenderId: string) {
    const tender = await this.getTender(tenderId);
    if (!tender) return null;

    const [activity, timeline] = await Promise.all([
      this.listActivity(tenderId),
      this.getTimeline(tenderId),
    ]);

    return {
      tender,
      activity,
      timeline,
    };
  }
}
