/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdCheckbox } from '@parlamentsdienste/pdcomponents-core/components/pd-checkbox.js';
@ProxyCmp({
  defineCustomElementFn: definePdCheckbox,
  inputs: ['checked', 'disabled', 'error', 'isIndeterminate', 'name', 'readonly', 'required', 'text', 'value', 'verticalAdjust']
})
@Component({
  selector: 'pd-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['checked', 'disabled', 'error', 'isIndeterminate', 'name', 'readonly', 'required', 'text', 'value', 'verticalAdjust'],
  outputs: ['pd-checked'],
  
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PdCheckbox), multi: true }],
})
export class PdCheckbox extends ValueAccessor{
  protected nativeEl: HTMLPdCheckboxElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    super();
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-checked']);
  }

  @HostListener('pd-checked', ['$event'])
        handleInput(event: any): void {
            this.handleChangeEvent(event.detail);
        }
}


import type { PdCheckboxCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdCheckbox extends Components.PdCheckbox {

  'pd-checked': EventEmitter<PdCheckboxCustomEvent<boolean>>;
}


