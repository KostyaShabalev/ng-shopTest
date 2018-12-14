import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.scss']
})
export class AdminAddProductComponent implements OnInit {
  newProductForm: FormGroup;
  submitted: boolean = false;

  categories: string[];

  get formControls(): {[key: string]: AbstractControl} {
    return this.newProductForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
              private productsService: ProductsService
  ) {/**/}

  ngOnInit(): void {
    this.newProductForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(255)]],
      category_title: ['', Validators.required],
      price: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      thumbnail: ['']
    });

    this.productsService.getCategories().subscribe(
      (categories: string[]) => {
        this.categories = categories;
      },
      (err: any) => {/**/}
    );
  }

  formOnSubmit(): void {
    const newProduct: Product = this.newProductForm.value;

    this.submitted = true;
    if (this.newProductForm.invalid) {
      return;
    }

    this.productsService.createProduct(newProduct).subscribe(
      (next: any) => {/**/},
      (err: any) => {/**/}
    );
  }
}
