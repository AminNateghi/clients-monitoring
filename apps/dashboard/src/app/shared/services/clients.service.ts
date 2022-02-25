import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './_base.service';
import { ClientDTO } from '@dashboard/api-interfaces';

@Injectable()
export class ClientsService extends BaseService {

  apiControllerName(): string {
    return 'reports';
  }


  getClients(): Observable<ClientDTO[]> {
    return this.http.get<any>(`${this.api}`);
  }
}