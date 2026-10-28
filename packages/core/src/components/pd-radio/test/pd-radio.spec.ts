import { Radio } from '../pd-radio';
import { newSpecPage } from '@stencil/core/testing';

describe('pd-radio', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Radio],
            html: `<pd-radio></pd-radio>`,
        });
        expect(page.root).toEqualHtml(`
          <pd-radio>
            <label class="pd-radio-label" data-test="pd-radio-label">
                <input class="pd-radio-input" type="radio">
                <span class="pd-radio-inner" aria-hidden="true"></span>
                <span class="pd-radio-text" data-test="pd-radio-text"></span>
            </label>
          </pd-radio>
        `);
    });
});
