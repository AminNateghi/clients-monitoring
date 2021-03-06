import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service";

@Injectable()
export class ReportService {
  constructor(
    private prisma: PrismaService
  ) { }

  today(): Promise<unknown> {
    return this.prisma.clients.findMany({
      select: {
        title: true,
        histories: {
          select: {
            isOffline: true,
            createdAt: true
          },
          where: {
            createdAt: {
              gte: new Date(new Date().setHours(1, 0, 0, 0))
            },
          },
          orderBy: {
            createdAt: "asc"
          }
        },
      }
    });
  }
}