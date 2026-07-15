import { newSpecPage } from '@stencil/core/testing';
import { Menu } from '../pd-menu';

describe('pd-menu', () => {
    it('renders', async () => {
        const page = await newSpecPage({
            components: [Menu],
            html: `<pd-menu></pd-menu>`,
        });
        expect(page.root).toEqualHtml(`
                    <pd-menu>
                        <mock:shadow-root>
                            <div class="pd-menu">
                                <button aria-expanded="false" aria-haspopup="true" class="pd-menu-button pd-menu-normal" data-test="pd-menu-button" type="button">
                                    <pd-icon class="pd-menu-icon" name="menu_actions" size="2"></pd-icon>
                                </button>
                                <div>
                                    <div class="pd-menu-content" data-popper-placement="bottom-start" data-popper-reference-hidden style="display: none; position: absolute; left: 0; top: 0; margin: 0; right: auto; bottom: auto; transform: translate(0px, 0px);">
                                        <slot></slot>
                                    </div>
                                </div>
                            </div>
                        </mock:shadow-root>
                    </pd-menu>
                `);
    });
});
