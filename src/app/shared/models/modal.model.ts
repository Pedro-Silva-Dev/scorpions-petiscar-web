import { MODAL } from 'src/app/shared/enums/modal.enum';
import { TemplateRef } from '@angular/core';
import { MODAL_TYPE } from '../enums/modal-type.model';

export interface Modal {
    title: string;
    template: TemplateRef<any>;
    filterTemplate?: TemplateRef<any>;
    type: MODAL_TYPE;
    class: MODAL;
}