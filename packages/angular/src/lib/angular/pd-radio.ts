/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdRadio } from '@parlamentsdienste/pdcomponents-core/components/pd-radio.js';
@ProxyCmp({
  defineCustomElementFn: definePdRadio,
  inputs: ['checked', 'disabled', 'error', 'label', 'name', 'readonly', 'value', 'verticalAdjust']
})
@Component({
  selector: 'pd-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'error', 'label', 'name', 'readonly', 'value', 'verticalAdjust'],
  outputs: [],
  
  standalone: true,
  
})
export class PdRadio {
  protected nativeEl: HTMLPdRadioElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
  }

  
}


export declare interface PdRadio extends Components.PdRadio {}


