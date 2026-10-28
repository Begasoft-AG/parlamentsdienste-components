import { Textarea } from '../pd-textarea';
import { newSpecPage } from '@stencil/core/testing';

describe('pd-textarea', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Textarea],
            html: `<pd-textarea label="Label"></pd-textarea>`,
        });
        expect(page.root).toEqualHtml(`
            <pd-textarea label="Label">
                <mock:shadow-root>
                    <div class="pd-form-field">
                        <label class="pd-form-field-label" for="pd-textarea-control" data-test="pd-textarea-label">Label</label>
                        <textarea autocapitalize="none" class="pd-textarea" id="pd-textarea-control" placeholder="" data-test="pd-textarea" rows="1"></textarea>
                    </div>
                </mock:shadow-root>
            </pd-textarea>
        `);
    });
});
