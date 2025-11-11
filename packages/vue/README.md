# @parlamentsdienste/pdcomponents-vue

[![npm version](https://img.shields.io/npm/v/@parlamentsdienste/pdcomponents-vue.svg)](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-vue)
[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%203.0-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

Vue 3 wrapper for the Swiss Parliamentary Services Component Library

This package provides Vue 3-specific bindings for [@parlamentsdienste/pdcomponents-core](https://www.npmjs.com/package/@parlamentsdienste/pdcomponents-core), offering seamless integration with Vue 3 applications.

## Documentation

**Component Documentation (Storybook):**
https://parlamentsdienste-components.bgs.lambda-it.ch/

## Installation

```bash
npm install @parlamentsdienste/pdcomponents-vue
```

## Requirements

- Vue 3.4.38 or higher (< 4.0.0)

## Usage

### Import Components

```vue
<script setup>
import { ref } from 'vue';
import { PdButton, PdInput, PdCheckbox } from '@parlamentsdienste/pdcomponents-vue';

const inputValue = ref('');
const isChecked = ref(false);

const handleClick = () => {
  console.log('Button clicked!');
};
</script>

<template>
  <div>
    <PdButton @click="handleClick">
      Click me
    </PdButton>

    <PdInput
      v-model="inputValue"
      placeholder="Enter text"
    />

    <PdCheckbox
      v-model="isChecked"
      label="Accept terms"
    />
  </div>
</template>
```

### Event Handling

The Vue wrappers provide Vue-friendly event handling:

```vue
<template>
  <PdInput
    @valueChange="handleValueChange"
    @blur="handleBlur"
  />
</template>

<script setup>
const handleValueChange = (event) => {
  console.log(event.detail); // Access event details
};

const handleBlur = () => {
  console.log('Input blurred');
};
</script>
```

### v-model Support

Components support Vue's v-model directive for two-way data binding:

```vue
<script setup>
import { ref } from 'vue';

const username = ref('');
const rememberMe = ref(false);
const selectedDate = ref('');
</script>

<template>
  <PdInput v-model="username" placeholder="Username" />
  <PdCheckbox v-model="rememberMe" label="Remember me" />
  <PdDatepicker v-model="selectedDate" />
</template>
```

### TypeScript Support

All components are fully typed with TypeScript:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';

const value: Ref<string> = ref('');
</script>
```

## Features

- Full TypeScript support
- Vue 3 Composition API support
- v-model two-way binding
- Vue-friendly event handlers
- Proper integration with Vue's reactivity system
- Tree-shakeable imports

## Components

This library provides Vue 3 wrappers for all core components:

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
- [Vue Documentation](https://vuejs.org)
- [GitHub Repository](https://github.com/Begasoft-AG/parlamentsdienste-components)
- [Report Issues](https://github.com/Begasoft-AG/parlamentsdienste-components/issues)
