import { BehaviorSubject } from 'rxjs';

import { handleResponse } from '../helpers/handle-response';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export default class authenticationService {

    constructor(domain) {
        //THIS LINE IS ONLY USED WHEN YOU'RE IN PRODUCTION MODE!
        this.domain = domain || "http://localhost:3000"; // API server domain
    }

    // login
    // logout
    currentUser = currentUserSubject.asObservable()
    
    currentUserValue = () => { 
            return currentUserSubject.value 
        }

    login = (username, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        };

        return fetch(`localhost:8000/api/v1/auth/login/`, requestOptions)
            .then(handleResponse)
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);

                return user;
            });
    }

    logout = () => {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        currentUserSubject.next(null);
    }
};