/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdCombobox } from '@parlamentsdienste/pdcomponents-core/components/pd-combobox.js';
@ProxyCmp({
  defineCustomElementFn: definePdCombobox,
  inputs: ['disableFilter', 'disableMultiselectCounter', 'disabled', 'emptyItem', 'emptyItemData', 'error', 'highlight', 'itemCount', 'items', 'label', 'multiselect', 'placeholder', 'readonly', 'required', 'selectable', 'selected', 'size', 'value', 'verticalAdjust', 'viewOnly'],
  methods: ['setSelectedIndex', 'reset', 'setOpen', 'setFocus']
})
@Component({
  selector: 'pd-combobox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disableFilter', 'disableMultiselectCounter', 'disabled', 'emptyItem', 'emptyItemData', 'error', 'highlight', 'itemCount', 'items', 'label', 'multiselect', 'placeholder', 'readonly', 'required', 'selectable', 'selected', 'size', 'value', 'verticalAdjust', 'viewOnly'],
  outputs: ['pd-input', 'pd-change', 'pd-blur', 'pd-focus'],
  
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PdCombobox), multi: true }],
})
export class PdCombobox extends ValueAccessor{
  protected nativeEl: HTMLPdComboboxElement;
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


import type { PdComboboxCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';
import type { InputChangeEventDetail as IPdComboboxInputChangeEventDetail } from '@parlamentsdienste/pdcomponents-core/components';
import type { ComboboxItem as IPdComboboxComboboxItem } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdCombobox extends Components.PdCombobox {
  /**
   * Emitted when a keyboard input occurred.
   */
  'pd-input': EventEmitter<PdComboboxCustomEvent<IPdComboboxInputChangeEventDetail>>;
  /**
   * Emitted when the value has changed.
   */
  'pd-change': EventEmitter<PdComboboxCustomEvent<IPdComboboxComboboxItem | IPdComboboxComboboxItem[]>>;
  /**
   * Emitted when the input loses focus.
   */
  'pd-blur': EventEmitter<PdComboboxCustomEvent<void>>;
  /**
   * Emitted when the input has focus.
   */
  'pd-focus': EventEmitter<PdComboboxCustomEvent<void>>;
}


