import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'perfiles'
})
export class PerfilesPipe implements PipeTransform {
  constructor(
    private sanitized: DomSanitizer
  ) { }

  transform(icon: string, title: string): SafeHtml {
    const random = Math.round(Math.random() * 3);
    const arrayClass = ['box-twitter', 'box-google', 'box-facebook', 'box-linkedin'];

    return this.sanitized.bypassSecurityTrustHtml(
      `<div class='soc-header ${arrayClass[random]}'>
        <i class="${icon}" style='font-size: 2.5em'></i>
        <span style='display:block;'>${ title}</span>
      </div>`
    );
  }
}
