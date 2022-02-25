import { Injectable } from "@nestjs/common";
import { Clients } from "@prisma/client";
import * as Net from 'net';
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../../prisma.service";


@Injectable()
export class HealthService {

  private defaultTimeout = 5000;

  constructor(
    private prisma: PrismaService
  ) { }

  @Cron(CronExpression.EVERY_5_MINUTES)
  private start() {
    this.getClients().then(clients => {
      this.pingClients(clients);
    });
  }

  private getClients(): Promise<Clients[]> {
    return this.prisma.clients.findMany({
      where: {
        isActive: true
      }
    });
  }

  private pingClients(clients: Clients[]) {
    Promise.all(clients.map(async (client) => {
      this.ping(client, client.port !== 0 ? client.port : 80);
    }));
  }

  private ping(client: Clients, port: number) {
    const socket = new Net.Socket();
    socket.setTimeout(this.defaultTimeout);
    socket.connect(port, client.url);

    socket.on('connect', () => {
      this.setHistory(client, false)
      socket.end();
    });

    socket.on('timeout', () => {
      this.setHistory(client, true)
      socket.end();
      socket.destroy();
    });

    socket.on('error', () => {
      this.setHistory(client, true)
    });

    socket.on('end', () => {
      socket.destroy()
    });
  }

  private setHistory(client: Clients, isOffline: boolean) {
    console.log(`[${Date.now()}] - ${client.url} - ${isOffline ? 'down' : 'up'}`);

    this.prisma.history.create({
      data: {
        clientId: client.id,
        isOffline: isOffline,
      }
    }).then(() => {
      this.prisma.$disconnect();
    });
  }

}