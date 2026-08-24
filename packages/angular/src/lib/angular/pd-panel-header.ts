/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdPanelHeader } from '@parlamentsdienste/pdcomponents-core/components/pd-panel-header.js';
@ProxyCmp({
  defineCustomElementFn: definePdPanelHeader,
  methods: ['setCollapsed']
})
@Component({
  selector: 'pd-panel-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
  outputs: ['pd-hover'],
  
  standalone: true,
  
})
export class PdPanelHeader {
  protected nativeEl: HTMLPdPanelHeaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-hover']);
  }

  
}


import type { PdPanelHeaderCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdPanelHeader extends Components.PdPanelHeader {
  /**
   * Used for panel hover stylings
   */
  'pd-hover': EventEmitter<PdPanelHeaderCustomEvent<boolean>>;
}


