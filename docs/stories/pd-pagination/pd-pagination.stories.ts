import type { ArgTypes, Meta, StoryObj } from '@storybook/html-vite';
import { addEventlisteners } from '../utils/eventListeners';

const defaultArgs = {
    currentPage: 3,
    totalPages: 10,
    visiblePages: 5,
    showPageButtons: false,
    separator: 'von',
};

type PaginationArgs = typeof defaultArgs;

const argTypes: ArgTypes<PaginationArgs> = {
    currentPage: { control: { type: 'number', min: 1, step: 1 } },
    totalPages: { control: { type: 'number', min: 0, step: 1 } },
    visiblePages: { control: { type: 'number', min: 0, step: 1 } },
};

const meta: Meta<PaginationArgs> = {
    title: 'Data Display/Pagination',
    args: defaultArgs,
    argTypes,
};

export default meta;

addEventlisteners('pd-pagination', ['pd-change']);

const pagination = (args: PaginationArgs) => {
    const element = document.createElement('pd-pagination');
    element.currentPage = args.currentPage;
    element.totalPages = args.totalPages;
    element.visiblePages = args.visiblePages;
    element.showPageButtons = args.showPageButtons;
    element.separator = args.separator;
    element.classList.add('m-3');
    element.addEventListener('pd-change', event => {
        element.currentPage = event.detail;
    });
    return element;
};

export const Pagination: StoryObj<PaginationArgs> = {
    render: pagination,
};

export const PageButtons: StoryObj<PaginationArgs> = {
    render: pagination,
    args: { showPageButtons: true },
};

export const Empty: StoryObj<PaginationArgs> = {
    render: pagination,
    args: { currentPage: 1, totalPages: 0 },
};
