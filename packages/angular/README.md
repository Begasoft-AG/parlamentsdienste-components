# @parlamentsdienste/pdcomponents-angular

[![npm version](https://img.shields.io/npm/v/@parlamentsdienste/pdcomponents-angular.svg)](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-angular)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

Angular wrapper for the Swiss Parliamentary Services Component Library

This package provides Angular-specific bindings for [@parlamentsdienste/pdcomponents-core](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-core), including full support for Angular forms, reactive programming with RxJS, and Angular's dependency injection.

## Documentation

**Component Documentation (Storybook):**
https://parlamentsdienste-components.bgs.lambda-it.ch/

## Installation

```bash
npm install @parlamentsdienste/pdcomponents-angular
```

## Requirements

- Angular 19.x or 20.x
- RxJS 7.x or 8.x

## Usage

### 1. Import the Module

Add `PdComponentsAngularModule` to your Angular module:

```typescript
import { NgModule } from '@angular/core';
import { PdComponentsAngularModule } from '@parlamentsdienste/pdcomponents-angular';

@NgModule({
  imports: [
    PdComponentsAngularModule
  ]
})
export class AppModule { }
```

### 2. Use Components in Templates

```html
<pd-button (click)="handleClick()">Click me</pd-button>

<pd-input
  [(ngModel)]="value"
  placeholder="Enter text">
</pd-input>

<pd-checkbox
  [formControl]="myControl"
  label="Accept terms">
</pd-checkbox>
```

### 3. Reactive Forms Support

The components support Angular's reactive forms with `ControlValueAccessor`:

```typescript
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  template: `
    <form [formGroup]="myForm">
      <pd-input formControlName="username"></pd-input>
      <pd-checkbox formControlName="remember"></pd-checkbox>
    </form>
  `
})
export class FormComponent {
  myForm = new FormGroup({
    username: new FormControl(''),
    remember: new FormControl(false)
  });
}
```

## Features

- Full TypeScript support
- Angular Forms integration (ngModel, FormControl, FormGroup)
- RxJS observables for events
- Proper change detection
- Angular dependency injection support

## Components

This library provides Angular wrappers for all core components:

- **Form Controls**: Button, Input, Textarea, Checkbox, Radio, Combobox, Datepicker, Slider
- **Navigation**: Navbar, Sidebar, Menu, Tabs
- **Layout**: Panel, Modal, Backdrop
- **Feedback**: Alert, Toast, Progress Bar, Skeleton
- **Data Display**: Table, List, Timeline, Chip, Label
- **Advanced**: Dropdown, Search, Sort, Icon, Animation

## License

AGPL-3.0

For proprietary or other use cases, written consent from the Swiss Parliamentary Services is required.

**Contact**: https://www.parlament.ch | web@parl.admin.ch

## Links

- [Core Package](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-core)
- [Angular Documentation](https://angular.io)
- [GitHub Repository](https://github.com/Begasoft-AG/parlamentsdienste-components)
- [Report Issues](https://github.com/Begasoft-AG/parlamentsdienste-components/issues)
