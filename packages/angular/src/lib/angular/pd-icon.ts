/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdIcon } from '@parlamentsdienste/pdcomponents-core/components/pd-icon.js';
@ProxyCmp({
  defineCustomElementFn: definePdIcon,
  inputs: ['flip', 'iconDescription', 'iconTitle', 'lazy', 'name', 'rotate', 'size', 'spin', 'spinReverse', 'src']
})
@Component({
  selector: 'pd-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['flip', 'iconDescription', 'iconTitle', 'lazy', 'name', 'rotate', 'size', 'spin', 'spinReverse', 'src'],
  outputs: [],
  
  standalone: true,
  
})
export class PdIcon {
  protected nativeEl: HTMLPdIconElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
  }

  
}


export declare interface PdIcon extends Components.PdIcon {}


