<script setup lang="ts">
import type { ComboboxItem, DropdownItem } from '@parlamentsdienste/pdcomponents-core';
import {
    PdButton,
    PdCheckbox,
    PdCombobox,
    PdDatepicker,
    PdDropdown,
    PdInput,
    PdRadio,
    PdRadioGroup,
    PdSlider,
    PdTextarea,
} from '@parlamentsdienste/pdcomponents-vue';
import { ref, toRaw, watch } from 'vue';

const comboItems: DropdownItem[] = [
    {
        id: '1',
        label: 'Mitteilungen und Verschiedenes',
        value: 'a1',
    },
    {
        id: '2',
        label: 'Pa.Iv. Semadeni. Fakultatives',
        value: 'a2',
    },
    {
        id: '3',
        label: 'Obligatorisches',
        value: 'a3',
    },
    {
        id: '4',
        label: 'Anfrage',
        value: 'a4',
    },
    {
        id: '5',
        label: 'Interpellation',
        value: 'a5',
    },
    {
        id: '6',
        label: 'Motion',
        value: 'a6',
    },
];

const input = ref('Some text...');
const inputDisabled = ref(false);
const dropdown = ref<DropdownItem | undefined>(comboItems[5]);
const comboboxSelectable = ref<ComboboxItem | undefined>(comboItems[2]);
const comboboxMultiselect = ref<ComboboxItem[]>([comboItems[0], comboItems[1]]);
const date = ref('2025-07-23');
const checkbox = ref(true);
const radio = ref('3');
const slider = ref(50);
const textarea = ref('start Text textarea');

watch(input, value => console.log('input changed:', toRaw(value)));
watch(dropdown, value => console.log('dropdown changed:', toRaw(value)));
watch(comboboxSelectable, value => console.log('comboboxSelectable changed:', toRaw(value)));
watch(comboboxMultiselect, value => console.log('comboboxMultiselect changed:', toRaw(value)));
watch(date, value => console.log('date changed:', toRaw(value)));
watch(checkbox, value => console.log('checkbox changed:', toRaw(value)));
watch(radio, value => console.log('radio changed:', toRaw(value)));
watch(slider, value => console.log('slider changed:', toRaw(value)));
watch(textarea, value => console.log('textarea changed:', toRaw(value)));

function handleButtonClick() {
    console.log('Button clicked');
    inputDisabled.value = true;
}

function handleDateChange(event: CustomEvent<{ dateStr: string }>) {
    date.value = event.detail.dateStr;
}
</script>

<template>
    <div class="wrapper">
        <h1>Parlamentsdienste Components</h1>
        <h2>Vue Test Page</h2>
        <form @submit.prevent>
            <PdInput label="pd-input" v-model="input" :disabled="inputDisabled" data-test="pd-input" />
            <PdDropdown label="pd-dropdown" empty-item :items="comboItems" v-model="dropdown" data-test="pd-dropdown" />
            <PdCombobox
                label="pd-combobox selectable"
                :items="comboItems"
                selectable
                v-model="comboboxSelectable"
                data-test="pd-combobox-selectable" />
            <PdCombobox
                label="pd-combobox multiselect"
                :items="comboItems"
                multiselect
                empty-item
                v-model="comboboxMultiselect"
                data-test="pd-combobox-multiselect" />
            <PdDatepicker
                label="pd-datepicker"
                v-model="date"
                data-test="pd-datepicker"
                allow-input
                @pd-change="handleDateChange" />
            <PdCheckbox text="pd-checkbox" v-model="checkbox" data-test="pd-checkbox" />
            <PdRadioGroup name="radio-group-1" v-model="radio" data-test="pd-radio-group">
                <PdRadio value="1" label="Radio 1" name="tom" data-test="pd-radio-1" />
                <PdRadio value="2" label="Radio 2" data-test="pd-radio-2" />
                <PdRadio value="3" label="Radio 3" data-test="pd-radio-3" />
            </PdRadioGroup>
            <PdSlider v-model="slider" data-test="pd-slider" />
            <PdTextarea label="pd-textarea" v-model="textarea" auto-grow data-test="pd-textarea" />
            <PdButton @click="handleButtonClick" data-test="pd-button">pd-button</PdButton>
        </form>
    </div>
</template>

<style scoped>
.wrapper {
    max-width: 25rem;
    margin: 5rem auto;
}

h1 {
    font-size: 1rem;
    margin-bottom: 1rem;
}

h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
}

form > * {
    margin-bottom: 1rem;
}
</style>
