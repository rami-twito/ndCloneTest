import { Injectable } from '@angular/core';
import {
	HttpHeaders,
	HttpClient,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Product } from 'src/models/product';
import { ProductCategory } from 'src/models/productCategory';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: 'my-auth-token'
	})
};

@Injectable({
	providedIn: 'root'
})
export class ProductCategoryService {
	private baseUrl = ''; // URL to web api

	constructor(private readonly http: HttpClient) {}

	

	public findAll(): Observable<ProductCategory[]> {
		return this.http
			.get<ProductCategory[]>(`${this.baseUrl}/api/productCategories`, httpOptions)
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
	
    