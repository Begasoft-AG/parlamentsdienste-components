/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';

import { ProxyCmp } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdSkeleton } from '@parlamentsdienste/pdcomponents-core/components/pd-skeleton.js';
@ProxyCmp({
  defineCustomElementFn: definePdSkeleton,
  inputs: ['height', 'width']
})
@Component({
  selector: 'pd-skeleton',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['height', 'width'],
  outputs: [],
  
  standalone: true,
  
})
export class PdSkeleton {
  protected nativeEl: HTMLPdSkeletonElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
  }

  
}


export declare interface PdSkeleton extends Components.PdSkeleton {}


