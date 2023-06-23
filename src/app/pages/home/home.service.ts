import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private httpClient: HttpClient) { }

  public getClaims() {
    return this.httpClient.get<any[]>('/api/claims/get-claims', {withCredentials: true})
  }

  storeClaim(claim: any) {
    return this.httpClient.post(`/api/claims/store-claim`, claim, {withCredentials: true})
  }

  updateClaim(claim: any) {
    return this.httpClient.put(`/api/claims/update-claim`, claim, {withCredentials: true})
  }

  deleteClaim(id: any) {
    return this.httpClient.delete(`/api/claims/delete-claim/${id}`, {withCredentials: true})
  }
}
