/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdRadioGroup } from '@parlamentsdienste/pdcomponents-core/components/pd-radio-group.js';
@ProxyCmp({
  defineCustomElementFn: definePdRadioGroup,
  inputs: ['disabled', 'error', 'name', 'readonly', 'value']
})
@Component({
  selector: 'pd-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'error', 'name', 'readonly', 'value'],
  outputs: ['pd-change'],
  
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PdRadioGroup), multi: true }],
})
export class PdRadioGroup extends ValueAccessor{
  protected nativeEl: HTMLPdRadioGroupElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    super();
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-change']);
  }

  @HostListener('pd-change', ['$event'])
        handleInput(event: any): void {
            this.handleChangeEvent(event.detail);
        }
}


import type { PdRadioGroupCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdRadioGroup extends Components.PdRadioGroup {

  'pd-change': EventEmitter<PdRadioGroupCustomEvent<string>>;
}


