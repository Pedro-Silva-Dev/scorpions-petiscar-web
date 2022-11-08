import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class PromotionsComponent implements OnInit {

  public responsiveOptions: any[] = [];
  public carousel: boolean = false;

  public products: any[] = [
    {
      url: `https://static-images.ifood.com.br/image/upload/t_high/discoveries/29jantarbomebaratoprincipal_kMia.png?imwidth=3840`, alt: `comida`
    },
    {
      url: `https://static-images.ifood.com.br/image/upload/t_high/discoveries/01promoancoraprincipal_Z9eT.png?imwidth=3840`, alt: `comida`
    },
    {
      url: `https://static-images.ifood.com.br/image/upload/t_high/discoveries/01CIVouchersPrincipal0501_H4G5.png?imwidth=3840`, alt: `comida`
    },
    {
      url: `https://static-images.ifood.com.br/image/upload/t_high/discoveries/13PromotionsAnyuserAlteracaodasubhomePrincipal01_89Jx.png?imwidth=3840`, alt: `comida`
    },
    {
      url: `https://static-images.ifood.com.br/image/upload/t_high/discoveries/29restaurantesfretegratisprincipal_hzi5.png?imwidth=3840`, alt: `comida`
    },
    {
      url: `https://static-images.ifood.com.br/image/upload/t_high/discoveries/01essenciaisdelimpeza70engajprincipal_uL8X.png?imwidth=3840`, alt: `comida`
    },
    {
      url: `https://www.nestle.com.br/sites/g/files/pydnoa436/files/2022-08/promo-nescau-720x400.jpg`, alt: `comida`
    },
    {
      url: `https://www.promosazon.com.br/assets/images/share-facebook.jpg`, alt: `comida`
    },
  ]

  constructor() {
   }

  ngOnInit(): void {
    
  }



  /********************* METHODS PRIVATE *********************/


}
