import { Injectable } from '@angular/core';
import {lastValueFrom} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  public getClaims() {
    return this.httpClient.get<any>('/api/claims/get-claims', {withCredentials: true})
  }

  storeClaim() {
    //
  }

  updateClaim() {
    //
  }

  deleteClaim(id: any) {
    return this.httpClient.delete(`/api/claims/delete-claim/${id}`, {withCredentials: true})
  }
}
