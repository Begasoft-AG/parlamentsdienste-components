/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdSidebarItem } from '@parlamentsdienste/pdcomponents-core/components/pd-sidebar-item.js';
@ProxyCmp({
  defineCustomElementFn: definePdSidebarItem,
  inputs: ['active', 'href', 'icon', 'iconName', 'size', 'target', 'text']
})
@Component({
  selector: 'pd-sidebar-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['active', 'href', 'icon', 'iconName', 'size', 'target', 'text'],
  outputs: [],
  
  standalone: true,
  
})
export class PdSidebarItem {
  protected nativeEl: HTMLPdSidebarItemElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
  }

  
}


export declare interface PdSidebarItem extends Components.PdSidebarItem {}


