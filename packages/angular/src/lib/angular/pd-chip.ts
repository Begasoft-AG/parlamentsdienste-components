/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdChip } from '@parlamentsdienste/pdcomponents-core/components/pd-chip.js';
@ProxyCmp({
  defineCustomElementFn: definePdChip,
  inputs: ['checked', 'disabled', 'readonly', 'type']
})
@Component({
  selector: 'pd-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'readonly', 'type'],
  outputs: ['pd-remove-chip', 'pd-check-chip'],
  
  standalone: true,
  
})
export class PdChip {
  protected nativeEl: HTMLPdChipElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-remove-chip', 'pd-check-chip']);
  }

  
}


import type { PdChipCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdChip extends Components.PdChip {
  /**
   * Event for clicking the cross to remove a chip
   */
  'pd-remove-chip': EventEmitter<PdChipCustomEvent<any>>;
  /**
   * Event for check chip
   */
  'pd-check-chip': EventEmitter<PdChipCustomEvent<any>>;
}


