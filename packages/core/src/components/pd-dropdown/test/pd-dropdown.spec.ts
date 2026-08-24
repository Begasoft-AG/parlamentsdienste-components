import { newSpecPage } from '@stencil/core/testing';
import { Dropdown } from '../pd-dropdown';

describe('pd-dropdown', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Dropdown],
            html: `<pd-dropdown></pd-dropdown>`,
        });
        expect(page.root).toEqualHtml(`
            <pd-dropdown>
                <mock:shadow-root>
                    <label class="pd-dropdown-label" data-test="pd-dropdown-label"></label>
                        <div class="pd-dropdown">
                            <button aria-expanded="false" aria-haspopup="true" class="pd-dropdown-button" data-test="pd-dropdown-button" type="button">
                                <span class="pd-dropdown-text" data-test="pd-dropdown-text"></span>
                                <pd-icon class="pd-dropdown-caret" name="dropdown" rotate="0" size="2.4"></pd-icon>
                            </button>
                            <div class="pd-dropdown-menu" data-popper-placement="bottom-start" data-popper-reference-hidden tabindex="-1" style="display: none; max-height: calc(3em * 5 + 0.25em); position: absolute; left: 0; top: 0; margin: 0; right: auto; bottom: auto; transform: translate(0px, 0px);"></div>
                        </div>
                    </label>
                </mock:shadow-root>
            </pd-dropdown>
        `);
    });
});
