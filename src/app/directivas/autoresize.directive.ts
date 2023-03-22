import {AfterViewChecked, Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[autoresize]'
})
export class AutoresizeDirective implements AfterViewChecked{

  constructor(private elementRef: ElementRef) { }

  ngAfterViewChecked() {
    this.adjust();
  }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.adjust();
  }

  private adjust() {
    const element = this.elementRef.nativeElement as HTMLTextAreaElement;
    element.style.height = `${element.scrollHeight}px`;
  }
}
