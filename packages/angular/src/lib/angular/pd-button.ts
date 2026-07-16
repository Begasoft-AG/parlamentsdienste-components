/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdButton } from '@parlamentsdienste/pdcomponents-core/components/pd-button.js';
@ProxyCmp({
  defineCustomElementFn: definePdButton,
  inputs: ['color', 'disabled', 'fullWidth', 'href', 'iconLocation', 'outline', 'showAsLink', 'size', 'target', 'type']
})
@Component({
  selector: 'pd-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color', 'disabled', 'fullWidth', 'href', 'iconLocation', 'outline', 'showAsLink', 'size', 'target', 'type'],
  outputs: [],
  
  standalone: true,
  
})
export class PdButton {
  protected nativeEl: HTMLPdButtonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
  }

  
}


export declare interface PdButton extends Components.PdButton {}


