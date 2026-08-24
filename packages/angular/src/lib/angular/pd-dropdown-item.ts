/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdDropdownItem } from '@parlamentsdienste/pdcomponents-core/components/pd-dropdown-item.js';
@ProxyCmp({
  defineCustomElementFn: definePdDropdownItem,
  inputs: ['highlight', 'iconName', 'iconSrc', 'multiselect', 'selected', 'value']
})
@Component({
  selector: 'pd-dropdown-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['highlight', 'iconName', 'iconSrc', 'multiselect', 'selected', 'value'],
  outputs: [],
  
  standalone: true,
  
})
export class PdDropdownItem {
  protected nativeEl: HTMLPdDropdownItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
  }

  
}


export declare interface PdDropdownItem extends Components.PdDropdownItem {}


