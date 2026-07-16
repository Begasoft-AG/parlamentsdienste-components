/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdTextarea } from '@parlamentsdienste/pdcomponents-core/components/pd-textarea.js';
@ProxyCmp({
  defineCustomElementFn: definePdTextarea,
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'characterCountText', 'cols', 'disabled', 'enterkeyhint', 'error', 'inputmode', 'label', 'maxlength', 'minlength', 'placeholder', 'readonly', 'required', 'rows', 'showCharacterCount', 'spellcheck', 'value', 'viewOnly', 'wrap'],
  methods: ['setFocus']
})
@Component({
  selector: 'pd-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoGrow', 'autocapitalize', 'autofocus', 'characterCountText', 'cols', 'disabled', 'enterkeyhint', 'error', 'inputmode', 'label', 'maxlength', 'minlength', 'placeholder', 'readonly', 'required', 'rows', 'showCharacterCount', 'spellcheck', 'value', 'viewOnly', 'wrap'],
  outputs: ['pd-change', 'pd-input', 'pd-blur', 'pd-focus'],
  
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PdTextarea), multi: true }],
})
export class PdTextarea extends ValueAccessor{
  protected nativeEl: HTMLPdTextareaElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    super();
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-change', 'pd-input', 'pd-blur', 'pd-focus']);
  }

  @HostListener('pd-change', ['$event'])
        handleInput(event: any): void {
            this.handleChangeEvent(event.detail);
        }
}


import type { PdTextareaCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdTextarea extends Components.PdTextarea {
  /**
   * Emitted when the input value has changed.
   */
  'pd-change': EventEmitter<PdTextareaCustomEvent<string>>;
  /**
   * Emitted when a keyboard input occurred.
   */
  'pd-input': EventEmitter<PdTextareaCustomEvent<KeyboardEvent>>;
  /**
   * Emitted when the input loses focus.
   */
  'pd-blur': EventEmitter<PdTextareaCustomEvent<FocusEvent>>;
  /**
   * Emitted when the input has focus.
   */
  'pd-focus': EventEmitter<PdTextareaCustomEvent<FocusEvent>>;
}


