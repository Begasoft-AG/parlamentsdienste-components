import { newSpecPage } from '@stencil/core/testing';
import { Checkbox } from '../pd-checkbox';

describe('pd-checkbox', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Checkbox],
            html: `<pd-checkbox></pd-checkbox>`,
        });
        expect(page.root).toEqualHtml(`
            <pd-checkbox>
                <mock:shadow-root>
                    <div class="pd-form-field pd-form-field-choice">
                        <input class="pd-checkbox-input" id="pd-checkbox-control" type="checkbox" value="false">
                        <label class="pd-checkbox-label pd-form-field-label" data-test="pd-checkbox-label" for="pd-checkbox-control">
                            <span aria-hidden="true" class="pd-checkbox-inner">
                                <span></span>
                                <span></span>
                            </span>
                            <span class="pd-checkbox-text" data-test="pd-checkbox-text"></span>
                        </label>
                    </div>
                </mock:shadow-root>
            </pd-checkbox>
        `);
    });
});
