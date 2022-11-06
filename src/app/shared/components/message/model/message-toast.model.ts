import { TOAST_TYPE } from "src/app/shared/enums/enum/toast-type.enum";

export interface MessageToast {
    type: TOAST_TYPE;
    message: string;
    summary: string;
}