import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from "@angular/router";
import {inject} from "@angular/core";
import {AuthService} from "./pages/login/auth.service";
import {lastValueFrom} from "rxjs";

export const isSignedInGuard: CanActivateFn =
  async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const auth = inject(AuthService);

    const isSignedIn = await lastValueFrom(auth.isSignedIn());

    if(isSignedIn) return true;

    await router.navigateByUrl('/signin');
    return false;
  };
