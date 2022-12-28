import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/shared/services/modal.service';
import { ProductService } from '../../../product/services/product.service';

@Component({
  selector: 'app-modal-add-product-category',
  templateUrl: './modal-add-product-category.component.html',
  styleUrls: ['./modal-add-product-category.component.css']
})
export class ModalAddProductCategoryComponent implements OnInit {

  constructor(
    private _productService: ProductService,
    private _modalService: ModalService
  ) { }

  ngOnInit(): void {
  }


  /******************** METHODS PRIVATE ********************/

  private _setPageProduct(): void {
    
  }

}
