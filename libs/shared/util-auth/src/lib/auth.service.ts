
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {

    userName = '';

    login(userName: string): void {
        // Login for very honest people!!!
        this.userName = userName;
    }

    logout(): void {
        this.userName = '';
    }

}