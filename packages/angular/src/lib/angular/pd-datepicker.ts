/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdDatepicker } from '@parlamentsdienste/pdcomponents-core/components/pd-datepicker.js';
@ProxyCmp({
  defineCustomElementFn: definePdDatepicker,
  inputs: ['allowInput', 'config', 'date', 'disabled', 'error', 'hideClearIcon', 'icon', 'label', 'placeholder', 'readonly', 'required', 'size', 'verticalAdjust'],
  methods: ['set', 'clear', 'close', 'open', 'toggle', 'activate', 'setDate']
})
@Component({
  selector: 'pd-datepicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['allowInput', 'config', 'date', 'disabled', 'error', 'hideClearIcon', 'icon', 'label', 'placeholder', 'readonly', 'required', 'size', 'verticalAdjust'],
  outputs: ['pd-change', 'pd-open', 'pd-close', 'pd-month-change', 'pd-year-change', 'pd-ready', 'pd-value-update'],
  
  standalone: true,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => PdDatepicker), multi: true }],
})
export class PdDatepicker extends ValueAccessor{
  protected nativeEl: HTMLPdDatepickerElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    super();
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-change', 'pd-open', 'pd-close', 'pd-month-change', 'pd-year-change', 'pd-ready', 'pd-value-update']);
  }

  @HostListener('pd-change', ['$event'])
        handleInput(event: any): void {
            this.handleChangeEvent(event.detail);
        }
}


import type { PdDatepickerCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdDatepicker extends Components.PdDatepicker {

  'pd-change': EventEmitter<PdDatepickerCustomEvent<{ selectedDates: Date[]; dateStr: string }>>;

  'pd-open': EventEmitter<PdDatepickerCustomEvent<{ selectedDates: Date[]; dateStr: string }>>;

  'pd-close': EventEmitter<PdDatepickerCustomEvent<{ selectedDates: Date[]; dateStr: string }>>;

  'pd-month-change': EventEmitter<PdDatepickerCustomEvent<{ selectedDates: Date[]; dateStr: string; }>>;

  'pd-year-change': EventEmitter<PdDatepickerCustomEvent<{ selectedDates: Date[]; dateStr: string }>>;

  'pd-ready': EventEmitter<PdDatepickerCustomEvent<{ selectedDates: Date[]; dateStr: string }>>;

  'pd-value-update': EventEmitter<PdDatepickerCustomEvent<{ selectedDates: Date[]; dateStr: string; }>>;
}


