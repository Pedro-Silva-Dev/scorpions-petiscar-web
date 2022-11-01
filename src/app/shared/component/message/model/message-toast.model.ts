import { TOAST_TYPE } from "src/app/shared/enum/enum/toast-type.enum";

export interface MessageToast {
    type: TOAST_TYPE;
    message: string;
    summary: string;
}