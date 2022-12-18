import { PACKS } from './../../../shared/enums/packs.enum';
export interface UserAuth {
    name: string;
    urlPhoto: string;
    office: string;
    roles: string;
    modules: string;
    userKey: string;
    officeKey: string;
    companyKey: string;
}