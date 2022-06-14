import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/models/shoppingCart';
import { ShoppingCartItem } from 'src/models/shoppingCartItem';
import { ShoppingCartService } from 'src/services/shoppingCart.service';
import { ShoppingCartItemService } from 'src/services/shoppingCartItem.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  constructor(public shoppingCartService:ShoppingCartService,public shoppingCartItemService:ShoppingCartItemService) { }

shoppingCart?:ShoppingCart|null;
shoppingCartItems?:ShoppingCartItem[];

  ngOnInit(): void {
    this.shoppingCartService.shoppingCart.subscribe(sc=>this.shoppingCart=sc);
    this.shoppingCartItemService.shoppingCartItems.subscribe(sc=>this.shoppingCartItems=sc);
    this.shoppingCartItems=[];
  }

  addToCart(shoppingCartItem:ShoppingCartItem):void{
    this.shoppingCartItems?.push(shoppingCartItem);
  }

   
 

}
