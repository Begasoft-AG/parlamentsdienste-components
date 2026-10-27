import { Component, ComponentInterface, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { clamp } from '../../utils/helpers';

/**
 * Controlled page navigation. Handle pd-change and update currentPage in the parent.
 */
@Component({
    tag: 'pd-pagination',
    styleUrl: 'pd-pagination.scss',
    shadow: true,
})
export class Pagination implements ComponentInterface {
    /**
     * Current page number (one-based).
     */
    @Prop() currentPage: number = 1;

    /**
     * Number of pages. Use zero for an empty result.
     */
    @Prop() totalPages: number = 5;

    /**
     * Show numbered page buttons instead of the current/total page summary.
     */
    @Prop() showPageButtons: boolean = false;

    /**
     * Maximum number of visible page buttons in showPageButtons mode.
     */
    @Prop() visiblePages: number = 5;

    /**
     * Separator string in simple mode.
     */
    @Prop() separator: string = 'von';

    /**
     * Page change request. Returns the selected page without changing currentPage.
     */
    @Event({ eventName: 'pd-change' }) pdChange!: EventEmitter<number>;

    private get pageNumber(): number {
        return this.totalPages <= 0 ? 0 : clamp(1, this.currentPage, this.totalPages);
    }

    private get pages(): number[] {
        const count = clamp(0, this.visiblePages, this.totalPages);
        const first = clamp(0, this.pageNumber - Math.floor(count / 2) - 1, this.totalPages - count);
        return Array.from({ length: count }, (_, i) => first + i + 1);
    }

    private selectPage(page: number) {
        this.pdChange.emit(page);
    }

    public render() {
        const currentPage = this.pageNumber;
        const atStart = currentPage <= 1;
        const atEnd = currentPage >= this.totalPages;

        return (
            <Host role="navigation" aria-label="Seitennavigation">
                <button
                    type="button"
                    class={{ 'pd-pagination-first': true, 'pd-pagination-disabled': atStart }}
                    aria-label="Erste Seite"
                    onClick={() => this.selectPage(1)}
                    data-test="pd-pagination-first"
                    disabled={atStart}>
                    <span aria-hidden="true">&laquo;</span>
                </button>
                <button
                    type="button"
                    class={{ 'pd-pagination-prev': true, 'pd-pagination-disabled': atStart }}
                    aria-label="Vorherige Seite"
                    onClick={() => this.selectPage(currentPage - 1)}
                    data-test="pd-pagination-prev"
                    disabled={atStart}>
                    <span aria-hidden="true">&#8249;</span>
                </button>
                {this.showPageButtons ? this.renderPageButtons() : this.renderSimplePages()}
                <button
                    type="button"
                    class={{ 'pd-pagination-next': true, 'pd-pagination-disabled': atEnd }}
                    aria-label="Nächste Seite"
                    onClick={() => this.selectPage(currentPage + 1)}
                    data-test="pd-pagination-next"
                    disabled={atEnd}>
                    <span aria-hidden="true">&#8250;</span>
                </button>
                <button
                    type="button"
                    class={{ 'pd-pagination-last': true, 'pd-pagination-disabled': atEnd }}
                    aria-label="Letzte Seite"
                    onClick={() => this.selectPage(this.totalPages)}
                    data-test="pd-pagination-last"
                    disabled={atEnd}>
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </Host>
        );
    }

    private renderPageButtons() {
        return this.pages.map(value => (
            <button
                key={value}
                type="button"
                onClick={() => this.selectPage(value)}
                class={{
                    'pd-pagination-page': true,
                    'pd-pagination-active': value === this.pageNumber,
                }}
                aria-label={`Seite ${value}`}
                aria-current={value === this.pageNumber ? 'page' : undefined}
                data-test={`pd-pagination-page-${value}`}>
                {value}
            </button>
        ));
    }

    private renderSimplePages() {
        return (
            <div class="pd-pagination-simple" role="status" aria-atomic="true">
                <span class="pd-pagination-number">{this.pageNumber}</span>
                <span class="pd-pagination-separator"> {this.separator} </span>
                <span class="pd-pagination-number">{Math.max(0, this.totalPages)}</span>
            </div>
        );
    }
}
