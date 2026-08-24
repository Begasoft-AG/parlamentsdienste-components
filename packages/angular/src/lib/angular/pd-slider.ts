/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdSlider } from '@parlamentsdienste/pdcomponents-core/components/pd-slider.js';
@ProxyCmp({
  defineCustomElementFn: definePdSlider,
  inputs: ['disabled', 'error', 'max', 'min', 'name', 'readonly', 'step', 'value']
})
@Component({
  selector: 'pd-slider',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'error', 'max', 'min', 'name', 'readonly', 'step', 'value'],
  outputs: ['pd-input', 'pd-change'],
  
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PdSlider), multi: true }],
})
export class PdSlider extends ValueAccessor{
  protected nativeEl: HTMLPdSliderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    super();
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-input', 'pd-change']);
  }

  @HostListener('pd-change', ['$event'])
        handleInput(event: any): void {
            this.handleChangeEvent(event.detail);
        }
}


import type { PdSliderCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdSlider extends Components.PdSlider {
  /**
   * Emitted when the value has changed.
   */
  'pd-input': EventEmitter<PdSliderCustomEvent<number>>;
  /**
   * Emitted when slider has been released.
   */
  'pd-change': EventEmitter<PdSliderCustomEvent<number>>;
}


