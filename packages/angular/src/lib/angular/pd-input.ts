/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdInput } from '@parlamentsdienste/pdcomponents-core/components/pd-input.js';
@ProxyCmp({
  defineCustomElementFn: definePdInput,
  inputs: ['accept', 'autoCorrect', 'autocapitalize', 'autocomplete', 'autofocus', 'characterCountText', 'clearInput', 'clearOnEdit', 'disabled', 'error', 'inputmode', 'label', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'showCharacterCount', 'size', 'step', 'type', 'value', 'verticalAdjust', 'viewOnly'],
  methods: ['setFocus']
})
@Component({
  selector: 'pd-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accept', 'autoCorrect', 'autocapitalize', 'autocomplete', 'autofocus', 'characterCountText', 'clearInput', 'clearOnEdit', 'disabled', 'error', 'inputmode', 'label', 'max', 'maxlength', 'min', 'minlength', 'multiple', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'showCharacterCount', 'size', 'step', 'type', 'value', 'verticalAdjust', 'viewOnly'],
  outputs: ['pd-input', 'pd-change', 'pd-blur', 'pd-focus'],
  
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PdInput), multi: true }],
})
export class PdInput extends ValueAccessor{
  protected nativeEl: HTMLPdInputElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    super();
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-input', 'pd-change', 'pd-blur', 'pd-focus']);
  }

  @HostListener('pd-change', ['$event'])
        handleInput(event: any): void {
            this.handleChangeEvent(event.detail);
        }
}


import type { PdInputCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';
import type { InputChangeEventDetail as IPdInputInputChangeEventDetail } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdInput extends Components.PdInput {
  /**
   * Emitted when a keyboard input occurred.
   */
  'pd-input': EventEmitter<PdInputCustomEvent<KeyboardEvent>>;
  /**
   * Emitted when the value has changed.
   */
  'pd-change': EventEmitter<PdInputCustomEvent<IPdInputInputChangeEventDetail>>;
  /**
   * Emitted when the input loses focus.
   */
  'pd-blur': EventEmitter<PdInputCustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  'pd-focus': EventEmitter<PdInputCustomEvent<void>>;
}


