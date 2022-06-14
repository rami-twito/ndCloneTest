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
import { ShoppingCartItem } from 'src/models/shoppingCartItem';
import { ShoppingCartService } from './shoppingCart.service';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: 'my-auth-token'
	})
};

@Injectable({
	providedIn: 'root'
})
export class ShoppingCartItemService {

	private baseUrl = ''; // URL to web api
    public shoppingCartItems=new ReplaySubject<ShoppingCartItem[]>();
    private innerShoppingCartItems?:ShoppingCartItem[];
    private shoppingCart?:ShoppingCart|null;

	constructor(private readonly http: HttpClient,public shoppingCartService:ShoppingCartService) {
        shoppingCartService.shoppingCart.subscribe(sc=>this.shoppingCart=sc);
        this.innerShoppingCartItems=[];
    }

	public create( shoppingCartItem: ShoppingCartItem):Promise<ShoppingCartItem[]> {
       shoppingCartItem.shoppingCartId=this.shoppingCart?.id!
		return new Promise((resolve, reject)=> this.http
			.post<ShoppingCartItem>(`${this.baseUrl}/api/shoppingCartItem/add`, shoppingCartItem, httpOptions)
			.pipe(catchError(this.handleError)).subscribe(sc=>{this.innerShoppingCartItems?.push(sc);this.shoppingCartItems?.next(this.innerShoppingCartItems!)}));
            
            
	}

	public findAll(): Observable<ShoppingCartItem[]> {
		const result= this.http
			.get<ShoppingCartItem[]>(`${this.baseUrl}/api/shoppingCartItems`, httpOptions)
			.pipe(
				map((results: any) => results),
				catchError(this.handleError)
			);
            result.subscribe(sc=> this.innerShoppingCartItems=sc);
            this.shoppingCartItems?.next(this.innerShoppingCartItems!);
            return result;
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
	
    