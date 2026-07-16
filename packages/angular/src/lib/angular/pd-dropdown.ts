/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdDropdown } from '@parlamentsdienste/pdcomponents-core/components/pd-dropdown.js';
@ProxyCmp({
  defineCustomElementFn: definePdDropdown,
  inputs: ['disabled', 'emptyItem', 'emptyItemData', 'error', 'itemCount', 'items', 'label', 'placeholder', 'readonly', 'required', 'selected', 'textWrap', 'verticalAdjust', 'viewOnly'],
  methods: ['setSelectedIndex', 'reset']
})
@Component({
  selector: 'pd-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'emptyItem', 'emptyItemData', 'error', 'itemCount', 'items', 'label', 'placeholder', 'readonly', 'required', 'selected', 'textWrap', 'verticalAdjust', 'viewOnly'],
  outputs: ['pd-change'],
  
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PdDropdown), multi: true }],
})
export class PdDropdown extends ValueAccessor{
  protected nativeEl: HTMLPdDropdownElement;
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


import type { PdDropdownCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';
import type { DropdownItem as IPdDropdownDropdownItem } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdDropdown extends Components.PdDropdown {

  'pd-change': EventEmitter<PdDropdownCustomEvent<IPdDropdownDropdownItem>>;
}


