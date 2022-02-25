import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../shared/services/clients.service';
import { ClientDTO } from '@dashboard/api-interfaces';

@Component({
  selector: 'dashboard-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private clientsService: ClientsService
  ) { }

  data: ClientDTO[] = [];

  ngOnInit(): void {
    this.clientsService.getClients().subscribe(data => {
      this.data = data;
    });
  }

  customizeTooltip(arg: any) {
    const d = new Date(arg.argumentText);
    const h = d.getHours();
    const m = d.getMinutes();
    return {
      text: `<p style="font-size:14px;">${h}:${m}<p><br/><strong style="color:${arg.value ? 'red' : 'green'}">${arg.value ? 'Offline' : 'Online'}</strong>`,
    };
  }

}
