/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdTable } from '@parlamentsdienste/pdcomponents-core/components/pd-table.js';
@ProxyCmp({
  defineCustomElementFn: definePdTable,
  inputs: ['columns', 'disabled', 'externalRowHandling', 'headerHeight', 'headerStyle', 'iconConfig', 'menuLabel', 'minWidth', 'pageSizes', 'paging', 'pagingLocation', 'readonly', 'rowHeight', 'rows', 'selectable', 'selectedStatus', 'showActionColumn', 'showStatus'],
  methods: ['unselectAll', 'refresh']
})
@Component({
  selector: 'pd-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['columns', 'disabled', 'externalRowHandling', 'headerHeight', 'headerStyle', 'iconConfig', 'menuLabel', 'minWidth', 'pageSizes', 'paging', 'pagingLocation', 'readonly', 'rowHeight', 'rows', 'selectable', 'selectedStatus', 'showActionColumn', 'showStatus'],
  outputs: ['pd-selected', 'pd-edit', 'pd-view', 'pd-delete', 'pd-clicked-row', 'pd-sort', 'pd-filter-change', 'pd-filter-input'],
  
  standalone: true,
  
})
export class PdTable {
  protected nativeEl: HTMLPdTableElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-selected', 'pd-edit', 'pd-view', 'pd-delete', 'pd-clicked-row', 'pd-sort', 'pd-filter-change', 'pd-filter-input']);
  }

  
}


import type { PdTableCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';
import type { SelectedEvent as IPdTableSelectedEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdTable extends Components.PdTable {
  /**
   * Triggers when one or all rows get selected
   */
  'pd-selected': EventEmitter<PdTableCustomEvent<IPdTableSelectedEvent>>;
  /**
   * Triggers an event when the edit icon was clicked
   */
  'pd-edit': EventEmitter<PdTableCustomEvent<any>>;
  /**
   * Triggers an event when the view icon was clicked
   */
  'pd-view': EventEmitter<PdTableCustomEvent<any>>;
  /**
   * Triggers an event when the delete icon was clicked
   */
  'pd-delete': EventEmitter<PdTableCustomEvent<any>>;
  /**
   * Triggers an event when row was clicked
   */
  'pd-clicked-row': EventEmitter<PdTableCustomEvent<any>>;
  /**
   * Gets emitted when a column gets sorted
   */
  'pd-sort': EventEmitter<PdTableCustomEvent<{}>>;
  /**
   * Gets emitted when the filter changes
   */
  'pd-filter-change': EventEmitter<PdTableCustomEvent<{}>>;
  /**
   * Gets emitted when the filter input changes
   */
  'pd-filter-input': EventEmitter<PdTableCustomEvent<string>>;
}


