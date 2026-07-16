/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdListItemExpandable } from '@parlamentsdienste/pdcomponents-core/components/pd-list-item-expandable.js';
@ProxyCmp({
  defineCustomElementFn: definePdListItemExpandable,
  inputs: ['checkbox', 'checked', 'collapsed', 'contentClick', 'edit', 'expand', 'expandable', 'menu', 'status']
})
@Component({
  selector: 'pd-list-item-expandable',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checkbox', 'checked', 'collapsed', 'contentClick', 'edit', 'expand', 'expandable', 'menu', 'status'],
  outputs: ['pd-edit', 'pd-expand', 'pd-selected', 'pd-collapsed', 'pd-content-click'],
  
  standalone: true,
  
})
export class PdListItemExpandable {
  protected nativeEl: HTMLPdListItemExpandableElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-edit', 'pd-expand', 'pd-selected', 'pd-collapsed', 'pd-content-click']);
  }

  
}


import type { PdListItemExpandableCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdListItemExpandable extends Components.PdListItemExpandable {
  /**
   * Edit button click event
   */
  'pd-edit': EventEmitter<PdListItemExpandableCustomEvent<void>>;
  /**
   * Expand button click event
   */
  'pd-expand': EventEmitter<PdListItemExpandableCustomEvent<void>>;
  /**
   * Checkbox selected event
   */
  'pd-selected': EventEmitter<PdListItemExpandableCustomEvent<boolean>>;
  /**
   * Inner content collapsed/expanded
   */
  'pd-collapsed': EventEmitter<PdListItemExpandableCustomEvent<boolean>>;
  /**
   * Event on content click (content-click has to be set)
   */
  'pd-content-click': EventEmitter<PdListItemExpandableCustomEvent<void>>;
}


