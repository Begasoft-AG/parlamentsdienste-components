/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdNavbar } from '@parlamentsdienste/pdcomponents-core/components/pd-navbar.js';
@ProxyCmp({
  defineCustomElementFn: definePdNavbar,
  inputs: ['mobileBreakpoint']
})
@Component({
  selector: 'pd-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['mobileBreakpoint'],
  outputs: ['pd-menu'],
  
  standalone: true,
  
})
export class PdNavbar {
  protected nativeEl: HTMLPdNavbarElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-menu']);
  }

  
}


import type { PdNavbarCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdNavbar extends Components.PdNavbar {

  'pd-menu': EventEmitter<PdNavbarCustomEvent<void>>;
}


