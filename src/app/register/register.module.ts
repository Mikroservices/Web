import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';

@NgModule({
  declarations: [
    RegisterComponent,
    ConfirmEmailComponent
  ],
  imports: [
    SharedModule
  ]
})
export class RegisterModule { }
