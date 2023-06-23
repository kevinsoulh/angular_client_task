import {Injectable} from '@angular/core';
import {BASE_URL, UserClaim, Response} from "./app.interfaces";
import {catchError, filter, flatMap, lastValueFrom, map, mergeMap, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {
  }

  public signIn(email: string, password: string) {
    return this.http.post<Response>(`/api/auth/login`, {
        email: email,
        password: password
      },
      {
        withCredentials: true
      });
  }

  public async signOut() {
    return lastValueFrom(this.http.get(`/api/auth/logout`, {withCredentials: true}));
  }

  public user(): Observable<UserClaim[]> {
    return this.http.get<UserClaim[]>(`/api/auth/get-self-auth`, {withCredentials: true});
  }

  public isSignedIn(): Observable<boolean> {
    return this.user().pipe(
      map((userClaims) => {
        return userClaims.length > 0;
      }),
      catchError((error) => {
        return of(false);
      }));
  }

  public userName(): Observable<string> {
    return this.user().pipe(
      mergeMap(userClaims => userClaims),
      filter(userClaim => userClaim.type.endsWith('/name')),
      map(nameClaim => nameClaim.value),
      
      catchError((error) => {
        return of('');
      }));
  }
}
