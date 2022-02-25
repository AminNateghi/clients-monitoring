export class ClientDTO {
  title!: string;
  histories!: ClientHistoryDTO[];
}

export class ClientHistoryDTO {
  createdAt!: Date;
  isOffline!: boolean;
}