import { Injectable, RendererFactory2, inject } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private currentLanguage: string = 'en';
  renderer = inject(RendererFactory2).createRenderer(null, null);
  constructor(private translate: TranslateService) {
    if (typeof localStorage !== 'undefined') {
      translate.addLangs(['en', 'ar']);
      const savedLang = localStorage.getItem('lang') || 'en';
      this.useLanguage(savedLang);
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.currentLanguage = event.lang;
      });
    }
  }
  useLanguage(lang: string) {
    if (typeof localStorage !== 'undefined') {
      this.translate.use(lang);
      localStorage.setItem('lang', lang);
      if (lang === 'ar') {
        this.renderer.setAttribute(document.documentElement, 'dir', 'rtl');
        this.renderer.setStyle(document.documentElement, 'lang', 'ar');
      } else {
        this.renderer.setAttribute(document.documentElement, 'dir', 'ltr');
        this.renderer.setStyle(document.documentElement, 'lang', 'en');
      }
    }
  }

  getCurrentLang(): string {
    return this.currentLanguage;
  }
}
