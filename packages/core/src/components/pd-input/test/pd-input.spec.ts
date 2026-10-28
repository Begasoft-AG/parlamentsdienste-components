import { newSpecPage } from '@stencil/core/testing';
import { Input } from '../pd-input';

describe('pd-input', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Input],
            html: `<pd-input></pd-input>`,
        });
        expect(page.root).toEqualHtml(`
            <pd-input>
                <mock:shadow-root>
                    <div class="pd-form-field">
                        <input autocapitalize="off" autocomplete="off" autocorrect="off" class="pd-input" data-test="pd-input" id="pd-input-control" placeholder="" size="1" type="text" value="">
                    </div>
                </mock:shadow-root>
            </pd-input>
        `);
    });
});
