import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { PdColumn, PdTableRow } from '../../../types';
import { Checkbox } from '../../pd-checkbox/pd-checkbox';
import { Pagination } from '../../pd-pagination/pd-pagination';
import { Table } from '../pd-table';

describe('pd-table', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Table],
            html: `<pd-table></pd-table>`,
        });
        expect(page.root).toEqualHtml(`
          <pd-table role="table">
            <mock:shadow-root>
                <pd-table-filter class="pd-table-filter-hidden" style="position: absolute; left: 0; top: 0; margin: 0;"></pd-table-filter>
                <div class="pd-table" role="grid" style="min-width: 300px;">
                    <div class="pd-table-fixed" style="flex: 0 0 0px; min-width: 0;">
                        <div class="pd-table-header-row" role="rowheader" style="height: 48px;"></div>
                        <div class="pd-table-body"></div>
                    </div>
                    <div class="pd-table-horizontal-scroll" style="flex: 0 1 0px;">
                        <div class="dark pd-table-header-row" role="rowheader" style="height: 48px;"></div>    
                        <div class="pd-table-body"></div>
                    </div>
                </div>
            </mock:shadow-root>
          </pd-table>
        `);
    });

    const columns: PdColumn[] = [{ columnName: 'name', label: 'Name', width: 100, minWidth: 100 }];
    // the table fills in the internal row fields itself
    const toRows = (...names: string[]) => names.map(name => ({ name })) as unknown as PdTableRow[];
    const rows = toRows('Anna', 'Beat');

    let page: SpecPage;

    // frameworks set props as properties after the element is created
    async function renderWithProps(props: Partial<HTMLPdTableElement>) {
        page = await newSpecPage({ components: [Table, Checkbox, Pagination], html: '' });
        const el = page.doc.createElement('pd-table');
        Object.assign(el, props);
        page.body.appendChild(el);
        await page.waitForChanges();
        return el;
    }

    const selectAll = (el: HTMLElement) =>
        el.shadowRoot.querySelector('[data-test="pd-table-header-selectall"]') as HTMLPdCheckboxElement;

    it('renders initial rows set as properties', async () => {
        const el = await renderWithProps({ columns, rows });
        expect(el.shadowRoot.querySelectorAll('.pd-table-horizontal-scroll .pd-table-row').length).toBe(2);
    });

    it('keeps selectedStatus indeterminate on load with externalRowHandling', async () => {
        const el = await renderWithProps({
            columns,
            rows,
            selectable: true,
            externalRowHandling: true,
            selectedStatus: 'indeterminate',
        });
        expect(selectAll(el).isIndeterminate).toBe(true);
    });

    it('does not check select-all for an empty table', async () => {
        const el = await renderWithProps({ columns, rows: [], selectable: true });
        expect(selectAll(el).checked).toBe(false);
    });

    it('emits the applied sort direction', async () => {
        const el = await renderWithProps({
            columns: [{ ...columns[0], sortable: true }],
            rows: toRows('Beat', 'Anna', 'Cora'),
        });
        const directions: string[] = [];
        el.addEventListener('pd-sort', (ev: CustomEvent) => directions.push(ev.detail.sortDirection));
        const header = el.shadowRoot.querySelector('[data-test="pd-table-header-col-0"]') as HTMLElement;
        const names = () =>
            Array.from(el.shadowRoot.querySelectorAll('.pd-table-horizontal-scroll .pd-table-cell-value')).map(
                c => c.textContent,
            );

        header.click();
        await page.waitForChanges();
        expect(names()).toEqual(['Anna', 'Beat', 'Cora']);
        expect(header.classList.contains('pd-table-sort-asc')).toBe(true);

        header.click();
        await page.waitForChanges();
        expect(names()).toEqual(['Cora', 'Beat', 'Anna']);
        expect(header.classList.contains('pd-table-sort-desc')).toBe(true);

        expect(directions).toEqual(['asc', 'desc']);
    });

    it('handles null rows', async () => {
        const el = await renderWithProps({ columns, rows: null });
        expect(el.shadowRoot.querySelectorAll('.pd-table-row').length).toBe(0);
    });

    it('pages rows through the restored pagination and resets when the page size changes', async () => {
        const el = await renderWithProps({
            columns,
            rows: toRows('Anna', 'Beat', 'Cora', 'Dora', 'Emil'),
            paging: true,
            pageSizes: [{ id: '1', label: '2', value: 2, selected: true }],
        });
        const pagination = el.shadowRoot.querySelector('pd-pagination');
        const names = () =>
            Array.from(el.shadowRoot.querySelectorAll('.pd-table-horizontal-scroll .pd-table-cell-value')).map(
                cell => cell.textContent,
            );
        const summary = () => pagination.shadowRoot.querySelector('[role="status"]').textContent;

        expect(names()).toEqual(['Anna', 'Beat']);
        expect(summary()).toBe('1 von 3');

        pagination.shadowRoot.querySelector<HTMLButtonElement>('[data-test="pd-pagination-next"]').click();
        await page.waitForChanges();
        expect(names()).toEqual(['Cora', 'Dora']);
        expect(summary()).toBe('2 von 3');

        pagination.shadowRoot.querySelector<HTMLButtonElement>('[data-test="pd-pagination-last"]').click();
        await page.waitForChanges();
        expect(names()).toEqual(['Emil']);
        expect(summary()).toBe('3 von 3');

        el.shadowRoot.querySelector('pd-dropdown').dispatchEvent(
            new CustomEvent('pd-change', { detail: { id: '2', label: '5', value: 5 } }),
        );
        await page.waitForChanges();
        expect(names()).toEqual(['Anna', 'Beat', 'Cora', 'Dora', 'Emil']);
        expect(summary()).toBe('1 von 1');
    });

    it('renders disabled pagination for an empty paged table', async () => {
        const el = await renderWithProps({ columns, rows: [], paging: true });
        const pagination = el.shadowRoot.querySelector('pd-pagination');

        expect(pagination.shadowRoot.querySelector('[role="status"]').textContent).toBe('0 von 0');
        for (const control of Array.from(pagination.shadowRoot.querySelectorAll('button'))) {
            expect(control).toHaveAttribute('disabled');
        }
    });

    it('leaves external row handling and pagination to the parent', async () => {
        const el = await renderWithProps({ columns, rows, paging: true, externalRowHandling: true });

        expect(el.shadowRoot.querySelector('pd-pagination')).toBeNull();
        expect(el.shadowRoot.querySelector('slot[name="external-pagination"]')).not.toBeNull();
        expect(el.shadowRoot.querySelectorAll('.pd-table-horizontal-scroll .pd-table-row').length).toBe(2);
    });
});
