import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Pagination } from '../pd-pagination';

describe('pd-pagination', () => {
    let page: SpecPage;

    async function renderWithProps(props: Partial<HTMLPdPaginationElement> = {}) {
        page = await newSpecPage({ components: [Pagination], html: '' });
        const element = page.doc.createElement('pd-pagination');
        Object.assign(element, props);
        page.body.appendChild(element);
        await page.waitForChanges();
        return element;
    }

    const button = (element: HTMLElement, name: string) =>
        element.shadowRoot.querySelector<HTMLButtonElement>(`[data-test="pd-pagination-${name}"]`);
    const pages = (element: HTMLElement) =>
        Array.from(element.shadowRoot.querySelectorAll('.pd-pagination-page')).map(el => Number(el.textContent));

    it('renders the historical defaults with accessible, non-submitting controls', async () => {
        const element = await renderWithProps();

        expect(element.currentPage).toBe(1);
        expect(element.totalPages).toBe(5);
        expect(element.visiblePages).toBe(5);
        expect(element.showPageButtons).toBe(false);
        expect(element.separator).toBe('von');
        expect(element.getAttribute('role')).toBe('navigation');
        expect(element.getAttribute('aria-label')).toBe('Seitennavigation');
        const summary = element.shadowRoot.querySelector('[role="status"]');
        expect(summary.textContent).toBe('1 von 5');
        expect(summary.getAttribute('aria-atomic')).toBe('true');
        expect(button(element, 'first')).toHaveAttribute('disabled');
        expect(button(element, 'prev')).toHaveAttribute('disabled');
        expect(button(element, 'next')).not.toHaveAttribute('disabled');
        expect(button(element, 'last')).not.toHaveAttribute('disabled');

        for (const control of Array.from(element.shadowRoot.querySelectorAll('button'))) {
            expect(control.getAttribute('type')).toBe('button');
            expect(control.getAttribute('aria-label')).toBeTruthy();
            expect(control.querySelector('span').getAttribute('aria-hidden')).toBe('true');
        }
    });

    it('preserves a custom navigation label and separator', async () => {
        page = await newSpecPage({
            components: [Pagination],
            html: '<pd-pagination aria-label="Results" current-page="3" total-pages="10" separator="of"></pd-pagination>',
        });

        expect(page.root.getAttribute('aria-label')).toBe('Results');
        expect(page.root.shadowRoot.querySelector('[role="status"]').textContent).toBe('3 of 10');
    });

    it.each([
        [1, [1, 2, 3, 4, 5]],
        [5, [3, 4, 5, 6, 7]],
        [10, [6, 7, 8, 9, 10]],
    ])('renders the initial page window for page %i', async (currentPage, expected) => {
        const element = await renderWithProps({ currentPage, totalPages: 10, showPageButtons: true });

        expect(pages(element)).toEqual(expected);
        const active = element.shadowRoot.querySelector('[aria-current="page"]');
        expect(active.textContent).toBe(String(currentPage));
        expect(active.getAttribute('aria-label')).toBe(`Seite ${currentPage}`);
        expect(active.classList.contains('pd-pagination-active')).toBe(true);
        expect(element.shadowRoot.querySelectorAll('[aria-current]').length).toBe(1);
    });

    it('updates the window when any paging prop changes', async () => {
        const element = await renderWithProps({ currentPage: 3, totalPages: 10, showPageButtons: true });

        element.currentPage = 7;
        await page.waitForChanges();
        expect(pages(element)).toEqual([5, 6, 7, 8, 9]);

        element.visiblePages = 3;
        await page.waitForChanges();
        expect(pages(element)).toEqual([6, 7, 8]);

        element.totalPages = 4;
        await page.waitForChanges();
        expect(pages(element)).toEqual([2, 3, 4]);
        expect(element.currentPage).toBe(7);
        expect(button(element, 'next')).toHaveAttribute('disabled');
        expect(button(element, 'last')).toHaveAttribute('disabled');

        element.totalPages = 12;
        await page.waitForChanges();
        expect(pages(element)).toEqual([6, 7, 8]);
        expect(button(element, 'next')).not.toHaveAttribute('disabled');
    });

    it('caps the window at totalPages and switches modes dynamically', async () => {
        const element = await renderWithProps({ currentPage: 2, totalPages: 3, visiblePages: 10 });

        element.showPageButtons = true;
        await page.waitForChanges();
        expect(pages(element)).toEqual([1, 2, 3]);
        expect(element.shadowRoot.querySelector('.pd-pagination-simple')).toBeNull();

        element.visiblePages = 0;
        await page.waitForChanges();
        expect(pages(element)).toEqual([]);

        element.showPageButtons = false;
        element.separator = 'of';
        await page.waitForChanges();
        expect(element.shadowRoot.querySelector('[role="status"]').textContent).toBe('2 of 3');
    });

    it.each([
        ['first', 1],
        ['prev', 2],
        ['next', 4],
        ['last', 10],
        ['page-5', 5],
        ['page-3', 3],
    ])('emits a controlled page request from %s', async (name, expected) => {
        const element = await renderWithProps({ currentPage: 3, totalPages: 10, showPageButtons: true });
        const listener = jest.fn();
        page.body.addEventListener('pd-change', listener);

        button(element, name).click();
        await page.waitForChanges();

        expect(listener).toHaveBeenCalledTimes(1);
        const event = listener.mock.calls[0][0] as CustomEvent<number>;
        expect(event.detail).toBe(expected);
        expect(event.bubbles).toBe(true);
        expect(event.composed).toBe(true);
        expect(element.currentPage).toBe(3);

        element.currentPage = event.detail;
        await page.waitForChanges();
        expect(element.shadowRoot.querySelector('[aria-current="page"]').textContent).toBe(String(expected));
    });

    it.each([
        [1, ['first', 'prev']],
        [5, ['next', 'last']],
    ])('disables navigation past page %i', async (currentPage, disabledButtons) => {
        const element = await renderWithProps({ currentPage });
        for (const name of disabledButtons) {
            expect(button(element, name)).toHaveAttribute('disabled');
        }
    });

    it.each([0, 1])('disables all navigation with %i pages', async totalPages => {
        const element = await renderWithProps({ totalPages, showPageButtons: true });
        expect(pages(element)).toEqual(totalPages === 0 ? [] : [1]);
        for (const name of ['first', 'prev', 'next', 'last']) {
            expect(button(element, name)).toHaveAttribute('disabled');
        }

        element.showPageButtons = false;
        await page.waitForChanges();
        expect(element.shadowRoot.querySelector('[role="status"]').textContent).toBe(
            totalPages === 0 ? '0 von 0' : '1 von 1',
        );
    });

    it('clamps a page below one without mutating the controlled prop', async () => {
        const element = await renderWithProps({ currentPage: 0 });
        const listener = jest.fn();
        element.addEventListener('pd-change', listener);

        expect(element.shadowRoot.querySelector('[role="status"]').textContent).toBe('1 von 5');
        expect(button(element, 'first')).toHaveAttribute('disabled');
        button(element, 'next').click();
        expect(listener.mock.calls[0][0].detail).toBe(2);
        expect(element.currentPage).toBe(0);
    });
});
