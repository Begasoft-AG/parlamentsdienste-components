import { newE2EPage } from '@stencil/core/testing';

describe('pd-pagination', () => {
    it('hydrates and supports keyboard page requests without changing its controlled value', async () => {
        const page = await newE2EPage();
        await page.setContent('<pd-pagination current-page="3" total-pages="10" show-page-buttons></pd-pagination>');
        const element = await page.find('pd-pagination');
        const changes = await element.spyOnEvent('pd-change');

        expect(element).toHaveClass('hydrated');
        const next = await page.find('pd-pagination >>> [data-test="pd-pagination-next"]');
        await next.focus();
        await page.keyboard.press('Enter');
        await page.waitForChanges();
        expect(changes).toHaveReceivedEventDetail(4);
        expect(await element.getProperty('currentPage')).toBe(3);

        await page.keyboard.press('Space');
        await page.waitForChanges();
        expect(changes).toHaveReceivedEventTimes(2);
        expect(changes.lastEvent.detail).toBe(4);

        element.setProperty('currentPage', 4);
        await page.waitForChanges();
        const active = await page.find('pd-pagination >>> [aria-current="page"]');
        expect(active.textContent).toBe('4');
    });

    it('does not request pages from disabled controls in an empty result', async () => {
        const page = await newE2EPage();
        await page.setContent('<pd-pagination total-pages="0"></pd-pagination>');
        const element = await page.find('pd-pagination');
        const changes = await element.spyOnEvent('pd-change');

        for (const name of ['first', 'prev', 'next', 'last']) {
            const control = await page.find(`pd-pagination >>> [data-test="pd-pagination-${name}"]`);
            expect(await control.getProperty('disabled')).toBe(true);
            await control.click();
        }
        expect(changes).not.toHaveReceivedEvent();
    });
});
