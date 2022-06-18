import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/member';
import { FormControl, Validators } from '@angular/forms';
import * as shajs from 'sha.js';

@Component({
  selector: 'app-certificate-validation',
  templateUrl: './certificate-validation.component.html',
  styleUrls: ['./certificate-validation.component.sass'],
})
export class CertificateValidationComponent implements OnInit {
  public name: string = '';
  public birthDate: Date = new Date();
  public isActiveMember: boolean = false;
  public isValidRequest: boolean = false;
  public memberState: string = '';
  userName = new FormControl('', [Validators.required, Validators.email]);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let validationValuePlainText: string = '';

    this.route.queryParams.forEach((param) => {
      if (param.hasOwnProperty('member'))
        validationValuePlainText = param['member'];
    });

    // check if the parameter is in the correct format: yyyy-mm-dd_Name_Name_Name_Name_Name...
    const [birthDate, ...names] = validationValuePlainText.split('_');
    this.name = names.join(' ');
    this.birthDate = new Date(Date.parse(birthDate));
    this.isValidRequest =
      this.name.includes(' ') && !isNaN(this.birthDate.getFullYear());

    this.isActiveMember = this.checkValidity(validationValuePlainText);
  }

  checkValidity(validationValuePlainText: string): boolean {
    let encryptedValue = shajs('sha256')
      .update(validationValuePlainText)
      .digest('hex');
    console.log(`Hash:${encryptedValue}`);
    if (Member.elder.includes(encryptedValue)) {
      this.memberState = 'Vorständer';
    } else if (Member.junior == encryptedValue) {
      this.memberState = 'der jüngste mit Glied';
    } else if (Member.member.includes(encryptedValue)) {
      this.memberState = 'Mitglied';
    } else return false;

    return true;
  }

  getErrorMessage() {
    if (this.userName.hasError('required')) {
      return 'You must enter a value';
    }

    return this.userName.hasError('email') ? ' Name: (min 1 leerzeichen):' : '';
  }
}
