/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdNavbarItem } from '@parlamentsdienste/pdcomponents-core/components/pd-navbar-item.js';
@ProxyCmp({
  defineCustomElementFn: definePdNavbarItem,
  inputs: ['enabled', 'href', 'target', 'text']
})
@Component({
  selector: 'pd-navbar-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['enabled', 'href', 'target', 'text'],
  outputs: [],
  
  standalone: true,
  
})
export class PdNavbarItem {
  protected nativeEl: HTMLPdNavbarItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
  }

  
}


export declare interface PdNavbarItem extends Components.PdNavbarItem {}


