import { Component } from '@angular/core';
import { TranslationService } from 'src/app/core/services/translation.service';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.scss'],
})
export class NavAuthComponent {
  constructor(public translationService: TranslationService) {}
}
