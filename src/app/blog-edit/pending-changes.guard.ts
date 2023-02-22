import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BlogEditComponent } from './blog-edit.component';

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
  openDialog: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class PendingChangesGuard
  implements CanDeactivate<ComponentCanDeactivate>
{
  constructor(private edit: BlogEditComponent) {}

  canDeactivate(
    component: ComponentCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // if there are no pending changes, just allow deactivation; else confirm first
    if (component.canDeactivate()) {
      return true;
    } else {
      let subject = new Subject<boolean>();
      this.edit.openDialog();
      subject = this.edit.subject;
      return subject.asObservable();
    }
  }
}
