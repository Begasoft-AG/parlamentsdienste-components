/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './../generated/angular-component-lib/utils';

import type { Components } from '@parlamentsdienste/pdcomponents-core/components';

import { forwardRef, HostListener } from '@angular/core';
                   import { NG_VALUE_ACCESSOR } from '@angular/forms';
                   import { ValueAccessor } from './value-accessor';
             
import { defineCustomElement as definePdAlert } from '@parlamentsdienste/pdcomponents-core/components/pd-alert.js';
@ProxyCmp({
  defineCustomElementFn: definePdAlert,
  inputs: ['actionHref', 'actionTarget', 'actionText', 'actionTextExpanded', 'closable', 'color', 'expandable', 'expanded', 'hideIcon']
})
@Component({
  selector: 'pd-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['actionHref', 'actionTarget', 'actionText', 'actionTextExpanded', 'closable', 'color', 'expandable', 'expanded', 'hideIcon'],
  outputs: ['pd-closed', 'pd-action', 'pd-collapsed'],
  
  standalone: true,
  
})
export class PdAlert {
  protected nativeEl: HTMLPdAlertElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    
    c.detach();
    this.nativeEl = r.nativeElement;
    proxyOutputs(this, this.nativeEl, ['pd-closed', 'pd-action', 'pd-collapsed']);
  }

  
}


import type { PdAlertCustomEvent } from '@parlamentsdienste/pdcomponents-core/components';

export declare interface PdAlert extends Components.PdAlert {
  /**
   * Emitted when close button was pressed.
   */
  'pd-closed': EventEmitter<PdAlertCustomEvent<MouseEvent>>;
  /**
   * Emitted when action button was pressed.
   */
  'pd-action': EventEmitter<PdAlertCustomEvent<void>>;
  /**
   * Emitted when inner content is expanded/collapsed.
   */
  'pd-collapsed': EventEmitter<PdAlertCustomEvent<boolean>>;
}


