/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdPagination } from '@parlamentsdienste/pdcomponents-core/components/pd-pagination.js';
@ProxyCmp({
  defineCustomElementFn: definePdPagination,
  inputs: ['currentPage', 'separator', 'showPageButtons', 'totalPages', 'visiblePages']
})
@Component({
  selector: 'pd-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['currentPage', 'separator', 'showPageButtons', 'totalPages', 'visiblePages'],
  outputs: ['pd-change'],
  
  standalone: true,
  
})
export class PdPagination {
  protected nativeEl: HTMLPdPaginationElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-change']);
  }

  
}


import type { PdPaginationCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdPagination extends Components.PdPagination {
  /**
   * Page change request. Returns the selected page without changing currentPage.
   */
  'pd-change': EventEmitter<PdPaginationCustomEvent<number>>;
}


