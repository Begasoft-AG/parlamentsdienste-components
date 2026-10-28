import { newSpecPage } from '@stencil/core/testing';
import { Datepicker } from '../pd-datepicker';

describe('pd-datepicker', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Datepicker],
            html: `<pd-datepicker label="Label"></pd-datepicker>`,
        });
        expect(page.root).toEqualHtml(`
            <pd-datepicker label="Label">
                <mock:shadow-root>
                    <div class="pd-form-field">
                        <label class="pd-form-field-label" for="pd-datepicker-control" data-test="pd-datepicker-label">Label</label>
                        <div class="wrapper">
                            <input class="flatpickr-input pd-datepicker-input" id="pd-datepicker-control" data-input data-test="pd-datepicker-input" readonly="readonly" size="1" type="text">
                            <pd-icon class="calendar-icon pd-datepicker-icon" data-toggle name="calendar" size="2.4"></pd-icon>
                        </div>
                    </div>
                </mock:shadow-root>
            </pd-datepicker>
        `);
    });
});
