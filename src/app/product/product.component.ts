import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Product } from 'src/models/product';
import { ProductCategory } from 'src/models/productCategory';
import { ShoppingCart } from 'src/models/shoppingCart';
import { ProductService } from 'src/services/product.service';
import { ProductCategoryService } from 'src/services/productCategory.service';
import { ShoppingCartService } from 'src/services/shoppingCart.service';
import { ShoppingCartItemService } from 'src/services/shoppingCartItem.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(public productService:ProductService
    ,public productCategoryService:ProductCategoryService
    ,public shoppingCartService:ShoppingCartService
    ,public ShoppingCartItem:ShoppingCartItemService) {}

    productCategories?:ProductCategory[]
     products?:Product[];
     shoppingCart?:ShoppingCart|null;
     @ViewChild('cbProductCategory')
     private cbProductCatwgory?:ElementRef;
      @ViewChild('cbProduct') 
      private cbProduct?:ElementRef;

   

  ngOnInit(): void {
    this.productCategoryService.findAll().subscribe(p=> this.productCategories=p); 
    this.productService.findAll().subscribe(p=> this.products=p); //Array<Product>();
    this.shoppingCartService.shoppingCart.subscribe(sc=>this.shoppingCart=sc);
  }

  async btnAddToCart():Promise<void>
  {
    if(this.shoppingCart==null)
    {
      await this.shoppingCartService.create( {
        userId:1,
        sessionId:uuidv4()
      });
    }
    const productId= this.cbProduct?.nativeElement.selectedOptions[0].id;
    this.ShoppingCartItem.create({
      shoppingCartId:this.shoppingCart!.id!,
      productId:parseInt(productId!),
      price:parseInt(this.cbProduct!.nativeElement.getAttribute('data-id')!),
      productName:this.cbProduct!.nativeElement.selectedOptions[0].text
    });
    
  }

  product_change(e:any):void
  {
    this.productService.getByCategoryId(e.currentTarget.selectedOptions[0].id).subscribe(scs=>this.products=scs);
    
  }

}


