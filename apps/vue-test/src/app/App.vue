<script setup lang="ts">
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
    PdTable,
    PdTextarea,
} from '@parlamentsdienste/pdcomponents-vue';
import { ref, toRaw, watch } from 'vue';

const comboItems = [
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
const dropdown = ref(comboItems[5]);
const comboboxSelectable = ref(comboItems[2]);
const comboboxMultiselect = ref(comboItems.slice(0, 2));
const date = ref('2025-07-23');
const checkbox = ref(true);
const radio = ref('3');
const slider = ref(50);
const textarea = ref('start Text textarea');

const columns = [
    { columnName: 'name', label: 'Name', width: 200, minWidth: 100, sortable: true },
    { columnName: 'ort', label: 'Ort', width: 200, minWidth: 100, sortable: true },
];

const rows = [
    { id: 1, name: 'Beat', ort: 'Bern' },
    { id: 2, name: 'Anna', ort: 'Biel' },
    { id: 3, name: 'Cora', ort: 'Aarau' },
];

function tableSorted(event: CustomEvent) {
    console.log('table sorted:', event.detail);
}

const tableSelection = ref<{
    selected: boolean;
    selectAll: boolean;
    row: unknown;
    rows: unknown[];
} | null>(null);

// setTimeout(() => {
//     dropdown.value = comboItems[1];
//     comboboxMultiselect.value = comboItems.slice(2, 4);
//     textarea.value = 'new text';
//     input.value = 'new input value';
//     slider.value = 60;
// }, 2000);

// Watchers for all ref variables
watch(input, val => console.log('input changed:', toRaw(val)));
watch(dropdown, val => console.log('dropdown changed:', toRaw(val)));
watch(comboboxSelectable, val => console.log('comboboxSelectable changed:', toRaw(val)));
watch(comboboxMultiselect, val => console.log('comboboxMultiselect changed:', toRaw(val)));
watch(date, val => console.log('date changed:', toRaw(val)));
watch(checkbox, val => console.log('checkbox changed:', toRaw(val)));
watch(radio, val => console.log('radio changed:', toRaw(val)));
watch(slider, val => console.log('slider changed:', toRaw(val)));
watch(textarea, val => console.log('textarea changed:', toRaw(val)));
watch(tableSelection, selection => {
    if (!selection) return;

    if (selection.selectAll) {
        console.log('table items selected:', toRaw(selection.rows));
    } else if (Object.keys(selection.row as object).length === 0) {
        console.log('table items unselected:', toRaw(rows));
    } else {
        console.log(selection.selected ? 'table item selected:' : 'table item unselected:', toRaw(selection.row));
    }
});

function tableSelectionChanged(
    event: CustomEvent<{ selected: boolean; selectAll: boolean; row: unknown; rows: unknown[] }>,
) {
    tableSelection.value = event.detail;
}

function buttonClicked() {
    console.log('Button clicked');
    inputDisabled.value = true;
}
</script>

<template>
    <h1>Parlamentsdienste Components</h1>
    <h2>Vue Test Page</h2>
    <div class="two-col" style="margin-top: 3rem">
        <div class="col">
            <h3>Forms</h3>
            <form @submit.prevent>
                <PdInput label="pd-input" v-model="input" :disabled="inputDisabled" data-test="pd-input" />
                <PdDropdown
                    label="pd-dropdown"
                    empty-item
                    :items="comboItems"
                    v-model="dropdown"
                    data-test="pd-dropdown" />
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
                <!-- !!! PdDatepicker
                Because the datepicker emits an object { selectedDates: Date[]; dateStr: string }
                the vmodel is not quite compatible 
                -->
                <PdDatepicker
                    label="pd-datepicker"
                    v-model="date"
                    data-test="pd-datepicker"
                    allow-input
                    @pd-change="
                        (d: any) => {
                            date = d.detail.dateStr;
                        }
                    " />
                <PdCheckbox text="pd-checkbox" v-model="checkbox" data-test="pd-checkbox" />
                <PdRadioGroup name="radio-group-1" v-model="radio" data-test="pd-radio-group">
                    <PdRadio value="1" label="Radio 1" name="tom" data-test="pd-radio-1" />
                    <PdRadio value="2" label="Radio 2" data-test="pd-radio-2" />
                    <PdRadio value="3" label="Radio 3" data-test="pd-radio-3" />
                </PdRadioGroup>
                <PdSlider v-model="slider" data-test="pd-slider" />
                <PdTextarea label="pd-textarea" v-model="textarea" auto-grow data-test="pd-textarea" />
                <PdButton @click="buttonClicked" data-test="pd-button">pd-button</PdButton>
            </form>
        </div>
        <div class="col">
            <h3>pd-table</h3>
            <PdTable
                :columns="columns"
                :rows="rows"
                selectable
                @pd-selected="tableSelectionChanged"
                @pd-sort="tableSorted" />
        </div>
    </div>
</template>

<style scoped>
.col {
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    max-width: 30rem;
    padding: 2rem;
}
.two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
}

form > * {
    margin-bottom: 1rem;
}
</style>
