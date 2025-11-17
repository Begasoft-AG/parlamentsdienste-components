# @parlamentsdienste/pdcomponents-core

[![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)](https://stenciljs.com)
[![npm version](https://img.shields.io/npm/v/@parlamentsdienste/pdcomponents-core.svg)](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-core)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

Web Components Library for Swiss Parliamentary Services - Core Library

This is the core web components library built with [Stencil](https://stenciljs.com/), providing framework-agnostic UI components for Swiss Parliamentary Services applications.

## Documentation

**Component Documentation (Storybook):**
https://parlamentsdienste-components.bgs.lambda-it.ch/

## Installation

```bash
npm install @parlamentsdienste/pdcomponents-core
```

## Usage

### Lazy Loading (Recommended)

Import the loader to enable lazy loading of components:

```html
<script type="module" src="https://unpkg.com/@parlamentsdienste/pdcomponents-core/loader/index.js"></script>
<pd-button>Click me</pd-button>
```

Or in your application entry file:

```typescript
import '@parlamentsdienste/pdcomponents-core/loader';
```

### Direct Import

Import individual components:

```typescript
import { defineCustomElements } from '@parlamentsdienste/pdcomponents-core/loader';

defineCustomElements();
```

### Framework Wrappers

For better framework integration, use the official wrapper packages:

- **Angular**: [@parlamentsdienste/pdcomponents-angular](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-angular)
- **React**: [@parlamentsdienste/pdcomponents-react](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-react)
- **Vue**: [@parlamentsdienste/pdcomponents-vue](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-vue)

## Components

This library includes a comprehensive set of UI components:

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

- [Stencil Documentation](https://stenciljs.com)
- [GitHub Repository](https://github.com/Begasoft-AG/parlamentsdienste-components)
- [Report Issues](https://github.com/Begasoft-AG/parlamentsdienste-components/issues)
