import { Component, Input, OnInit } from '@angular/core';
import { ShoppingCartItem } from 'src/models/shoppingCartItem';

@Component({
  selector: 'app-shopping-cart-item',
  templateUrl: './shopping-cart-item.component.html',
  styleUrls: ['./shopping-cart-item.component.css']
})
export class ShoppingCartItemComponent implements OnInit {

  constructor() { }

  @Input() shoppingCartItem?:ShoppingCartItem;

  ngOnInit(): void {
  }

}
