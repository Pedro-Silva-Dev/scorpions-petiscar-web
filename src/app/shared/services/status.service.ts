import { Injectable } from '@angular/core';
import { Status } from '../models/status.model';

@Injectable({
	providedIn: 'root'
})
export class StatusService {

	constructor() { 
		//empty
	}

	public getListStatus(): Status[] { 
		const active: Status =  {id: 1, name: 'Habilitado', status: true};
		const disable: Status = { id: 2, name: 'Desabilitado', status: false };
		const listStatus: Status[] = [active, disable]; 
		return listStatus;
	}

}
