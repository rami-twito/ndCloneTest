import { Injectable } from '@angular/core';
import {
	HttpHeaders,
	HttpClient,
	HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/models/product';
import { ShoppingCart } from 'src/models/shoppingCart';


const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: 'my-auth-token'
	})
};

@Injectable({
	providedIn: 'root'
})
export class ShoppingCartService {
	private baseUrl = ''; // URL to web api
    public shoppingCart!:ReplaySubject<ShoppingCart>;

	constructor(private readonly http: HttpClient) {
        this.shoppingCart=new ReplaySubject<ShoppingCart>();
    }

	public create( shoppingCart: ShoppingCart):Promise<ShoppingCart>{
		return new Promise((resolve, reject) => this.http
			.post<ShoppingCart>(`${this.baseUrl}/api/shoppingCart/add`, shoppingCart, httpOptions)
			.pipe(catchError(this.handleError)).subscribe(sc=>{this.shoppingCart.next(sc);resolve(sc)}))
            
    }
	public findAll(): Observable<ShoppingCart[]> {
		return this.http
			.get<ShoppingCart[]>(`${this.baseUrl}/api/shoppingCart`, httpOptions)
			.pipe(
				map((results: any) => results),
				catchError(this.handleError)
			);
        }

        
        
    

    private handleError(error: HttpErrorResponse) {
		if (error.error instanceof ErrorEvent) {
			// A client-side or network error occured. Handle it accordingly
			console.error('An error occured:', error.error.message);
		} else {
			// The backend returned an unsuccessful respone code.
			// The response body may contain clues as to what was wrong
			console.log(
				`Backend returned code ${error.status}, body was: ${error.status}`
			);
		}

		// return an observable wuth a user-facing error message
		return throwError('Something bad happened; please try again later.');
	}
}
	
    