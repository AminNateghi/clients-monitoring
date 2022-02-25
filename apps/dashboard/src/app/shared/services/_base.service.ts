import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Injectable()
export abstract class BaseService {

  api = '';

  constructor(
    protected http: HttpClient,
    protected router: Router
  ) {
    this.api = environment.apiUrl + '/' + this.apiControllerName().toString();
  }

  abstract apiControllerName(): string;

}
