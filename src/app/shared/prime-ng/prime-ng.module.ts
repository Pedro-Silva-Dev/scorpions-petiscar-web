import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from "primeng/autocomplete";
import { CalendarModule } from "primeng/calendar";
import { ChipsModule } from "primeng/chips";
import { DropdownModule } from "primeng/dropdown";
import { InputMaskModule } from "primeng/inputmask";
import { InputNumberModule } from "primeng/inputnumber";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MultiSelectModule } from "primeng/multiselect";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputTextModule } from "primeng/inputtext";
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TooltipModule} from 'primeng/tooltip';
import {CarouselModule} from 'primeng/carousel';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    AutoCompleteModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    ProgressSpinnerModule,
    TooltipModule,
    CarouselModule,
  ],
  exports: [
    CalendarModule,
    ChipsModule,
    DropdownModule,
    InputMaskModule,
    InputNumberModule,
    CascadeSelectModule,
    MultiSelectModule,
    InputTextareaModule,
    InputTextModule,
    AutoCompleteModule,
    ButtonModule,
    ToastModule,
    RippleModule,
    ProgressSpinnerModule,
    TooltipModule,
    CarouselModule,
  ]
})
export class PrimeNgModule { }
