import { Injectable } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';

import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AppUser } from 'src/models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user$: Observable<firebase.default.User>;

  constructor(
    private userService: UserService, 
    private afAuth: AngularFireAuth, 
    private route: ActivatedRoute ) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect( new firebase.default.auth.GoogleAuthProvider() );
  }

  logout() {
    this.afAuth.signOut();
  }

  get appUser$() : Observable<AppUser> {
    return this.user$
    .pipe(switchMap( user => {
      if(user) {
        return this.userService.get(user.uid).valueChanges()
      } else {
        return EMPTY;
      }
    }));
  }

}
