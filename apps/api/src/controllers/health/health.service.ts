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
      this.setHistory(client, port, true)
      socket.end();
    });

    socket.on('timeout', () => {
      this.setHistory(client, port, false)
      socket.end();
      socket.destroy();
    });

    socket.on('error', () => {
      this.setHistory(client, port, false)
    });

    socket.on('end', () => {
      socket.destroy()
    });
  }

  private setHistory(client: Clients, port: number, status: boolean) {
    console.log(`${client.url}:${port} - ${status ? 'up' : 'down'}`);

    this.prisma.history.create({
      data: {
        clientId: client.id,
        insertedDateTime: new Date(),
        status,
      }
    }).then(() => {
      this.prisma.$disconnect();
    });
  }

}