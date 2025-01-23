import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../service/data-storage.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  orderForm: FormGroup;
  submitted = false;

  getCartData: any;
  storeCartArry: any = [];
  totalAmount: number = 0;
  totalCart: number = 0;

  constructor(
    private dataStorage: DataStorageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.orderForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getCartData = this.dataStorage.getCartData();
    this.totalCart = this.getCartData ? this.getCartData.length : 0;

    if (this.getCartData) {
      this.getCartData.filter((ele: any) => {
        this.totalAmount = ele.pdPrice * ele.plusMinusCounter + this.totalAmount;
      });
    }
  }

  // Getter for easy access to form controls
  get f() {
    return this.orderForm.controls;
  }

  removeCart(data: any) {
    this.totalAmount = 0;
    localStorage.removeItem('cart-data');
    this.storeCartArry = [];
    this.getCartData.filter((ele: any) => {
      if (ele.pdId != data.pdId) {
        this.storeCartArry.push(ele);
        this.totalAmount = ele.pdPrice * ele.plusMinusCounter + this.totalAmount;
      }
    });
    this.dataStorage.storeCartData(this.storeCartArry);
    this.getCartData = this.dataStorage.getCartData();
    this.totalCart = this.getCartData.length;
  }

  plusMinusCount(data: any, type: any) {
    this.storeCartArry = [];
    let plusMinusValue = data.plusMinusCounter;
    this.totalAmount = 0;

    if (type == 'minus') {
      let minusCount = plusMinusValue - 1;
      this.getCartData.filter((ele: any) => {
        if (data.pdId == ele.pdId) {
          ele['plusMinusCounter'] = minusCount;
        }
        this.totalAmount = ele.pdPrice * ele.plusMinusCounter + this.totalAmount;
      });

      this.storeCartArry = this.getCartData;
      this.dataStorage.storeCartData(this.storeCartArry);
      this.getCartData = this.dataStorage.getCartData();
    }

    if (type == 'plus') {
      let plusCount = plusMinusValue + 1;
      this.getCartData.filter((ele: any) => {
        if (data.pdId == ele.pdId) {
          ele['plusMinusCounter'] = plusCount;
        }
        this.totalAmount = ele.pdPrice * ele.plusMinusCounter + this.totalAmount;
      });

      this.storeCartArry = this.getCartData;
      this.dataStorage.storeCartData(this.storeCartArry);
      this.getCartData = this.dataStorage.getCartData();
    }
  }

  orderClick() {
    this.submitted = true;

    // Check if the form is valid
    if (this.orderForm.invalid) {
      alert('Please provide valid email and address before placing the order.');
      return;
    }

    const userConfirmed = window.confirm(
      'Are you sure you want to place the order?'
    );

    if (userConfirmed) {
      // Simulate form submission logic here
      alert('Order placed successfully...!!!');

      // Clear cart data
      localStorage.removeItem('cart-data');
      this.router.navigate(['/']);
      this.dataStorage.storeCartData([]);
      this.getCartData = [];

      // Redirect to the home page
    } else {
      // If the user cancels the submission
      alert('Order submission canceled.');
    }
  }
}
