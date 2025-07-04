import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [ DatePipe,ButtonModule, SharedModule, AvatarModule, Toolbar ,InputIcon,IconField , InputTextModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  CurrentDate = new Date()

}
