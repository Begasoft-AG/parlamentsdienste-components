import { newSpecPage } from '@stencil/core/testing';
import { Combobox } from '../pd-combobox';

describe('pd-combobox', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Combobox],
            html: `<pd-combobox label="Label"></pd-combobox>`,
        });
        expect(page.root).toEqualHtml(`
            <pd-combobox label="Label" role="combobox">
                <mock:shadow-root>
                <div class="pd-form-field pd-combobox-field">
                    <label class="pd-form-field-label" for="pd-combobox-control" data-test="pd-combobox-label">Label</label>
                    <div class="pd-combobox-input-wrapper">
                        <input aria-expanded="false" aria-haspopup="true" class="pd-combobox-input" id="pd-combobox-control" data-test="pd-combobox-input" placeholder="" size="1" value="">
                        <button class="left pd-combobox-icon" tabindex="-1">
                            <pd-icon class="pd-combobox-icon-search pd-icon" name="search" size="2.4"></pd-icon>
                        </button>
                        <button class="pd-combobox-icon right" data-test="pd-combobox-toggle" tabindex="-1">
                            <pd-icon class="pd-combobox-icon-toggle pd-icon" name="dropdown" rotate="0" size="2.4"></pd-icon>
                        </button>
                    </div>
                </div>
               <div class="pd-combobox-dropdown" data-popper-placement="bottom-start" data-popper-reference-hidden style="display: none; max-height: calc(3rem * 5 + 0.25rem); position: absolute; left: 0; top: 0; margin: 0; right: auto; bottom: auto; transform: translate(0px, 0px);"></div>
                </mock:shadow-root>
            </pd-combobox>
        `);
    });
});
