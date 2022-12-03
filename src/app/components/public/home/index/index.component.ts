import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/components/auth/services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this._teste();
  }

  private _teste(): void {
    const userId = this._authService.getUserId();
    const companyId = this._authService.getUserCompanyId();
    const officeId = this._authService.getUserOfficeId();
  }

}
