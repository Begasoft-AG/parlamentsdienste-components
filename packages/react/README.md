# @parlamentsdienste/pdcomponents-react

[![npm version](https://img.shields.io/npm/v/@parlamentsdienste/pdcomponents-react.svg)](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-react)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

React wrapper for the Swiss Parliamentary Services Component Library

This package provides React-specific bindings for [@parlamentsdienste/pdcomponents-core](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-core), offering a seamless integration with React applications.

## Documentation

**Component Documentation (Storybook):**
https://parlamentsdienste-components.bgs.lambda-it.ch/

## Installation

```bash
npm install @parlamentsdienste/pdcomponents-react
```

## Requirements

- React 18.x or 19.x
- react-dom 18.x or 19.x

## Usage

### Import Components

```tsx
import { PdButton, PdInput, PdCheckbox } from '@parlamentsdienste/pdcomponents-react';

function App() {
  const [value, setValue] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <PdButton onClick={() => console.log('Clicked!')}>
        Click me
      </PdButton>

      <PdInput
        value={value}
        onValueChange={(e) => setValue(e.detail)}
        placeholder="Enter text"
      />

      <PdCheckbox
        checked={checked}
        onCheckedChange={(e) => setChecked(e.detail)}
        label="Accept terms"
      />
    </div>
  );
}
```

### Event Handling

The React wrappers handle custom events from web components and provide React-friendly event handlers:

```tsx
<PdInput
  onValueChange={(event) => {
    console.log(event.detail); // Access event details
  }}
  onBlur={() => console.log('Input blurred')}
/>
```

### TypeScript Support

All components are fully typed with TypeScript:

```tsx
import { PdButton } from '@parlamentsdienste/pdcomponents-react';
import type { PdButtonCustomEvent } from '@parlamentsdienste/pdcomponents-react';

const handleClick = (event: PdButtonCustomEvent) => {
  console.log(event.detail);
};
```

## Features

- Full TypeScript support
- React-friendly event handlers
- Proper integration with React's virtual DOM
- Support for React 18+ and 19+
- Tree-shakeable imports

## Components

This library provides React wrappers for all core components:

- **Form Controls**: PdButton, PdInput, PdTextarea, PdCheckbox, PdRadio, PdCombobox, PdDatepicker, PdSlider
- **Navigation**: PdNavbar, PdSidebar, PdMenu, PdTabs
- **Layout**: PdPanel, PdModal, PdBackdrop
- **Feedback**: PdAlert, PdToast, PdProgressBar, PdSkeleton
- **Data Display**: PdTable, PdList, PdTimeline, PdChip, PdLabel
- **Advanced**: PdDropdown, PdSearch, PdSort, PdIcon, PdAnimation

## License

AGPL-3.0

For proprietary or other use cases, written consent from the Swiss Parliamentary Services is required.

**Contact**: https://www.parlament.ch | web@parl.admin.ch

## Links

- [Core Package](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-core)
- [React Documentation](https://react.dev)
- [GitHub Repository](https://github.com/Begasoft-AG/parlamentsdienste-components)
- [Report Issues](https://github.com/Begasoft-AG/parlamentsdienste-components/issues)
