import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
    styleUrls: ['./password.component.less']
})
export class PasswordComponent implements OnInit {

    protected isPasswordVisible: boolean;

    @Input()
    passwordText: string;

    @Output() 
    passwordTextChange = new EventEmitter<string>();

    @Output()
    passwordValid = new EventEmitter<boolean>();

    @ViewChild('passwordModel')
    passwordModel: NgModel;

    @Input()
    form: NgForm;

    constructor() {
    }

    ngOnInit() {
        this.isPasswordVisible = false;
    }

    togglePassword(): void {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    passwordChanged(): void {
        this.passwordTextChange.emit(this.passwordText);
        this.passwordValid.emit(this.passwordModel.valid);
    }
}
