import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
  override shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    const isMachinesRoute = (route: ActivatedRouteSnapshot) =>
      route.routeConfig?.path === 'machines' || route.routeConfig?.path === 'machines/:modelId';

    if (isMachinesRoute(future) && isMachinesRoute(curr)) {
      return true;
    }

    return super.shouldReuseRoute(future, curr);
  }
}
