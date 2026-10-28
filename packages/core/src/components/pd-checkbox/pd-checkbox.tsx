import { Component, ComponentInterface, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
    tag: 'pd-checkbox',
    styleUrl: 'pd-checkbox.scss',
    shadow: true,
})
export class Checkbox implements ComponentInterface {
    /**
     * Checkbox description text
     */
    @Prop() text: string = '';

    /**
     * Sets checkbox to disabled state
     */
    @Prop() disabled: boolean = false;

    /**
     * If `true`, the user cannot modify the value.
     */
    @Prop() readonly = false;

    /**
     * If `true`, the user must fill in a value before submitting a form.
     */
    @Prop() required = false;

    /**
     * Sets check state of the checkbox true/false
     */
    @Prop({ mutable: true }) checked: boolean = false;

    /**
     * value of checkbox
     */
    @Prop({ mutable: true }) value: boolean = false;

    /**
     * indeterminate state
     */
    @Prop() isIndeterminate: boolean = false;

    /**
     * checkbox name
     */
    @Prop() name: string;

    /**
     * Shows error state
     */
    @Prop() error: boolean = false;

    /**
     * Default vertical adjustment for inline forms
     */
    @Prop() verticalAdjust: boolean = false;

    @Event({ eventName: 'pd-checked' }) pdChecked: EventEmitter<boolean>;

    private onClick = () => {
        this.checked = !this.checked;
        this.value = this.checked;
        this.pdChecked.emit(this.value);
    };

    public render() {
        return (
            <Host>
                <div
                    class={{
                        'pd-form-field': true,
                        'pd-form-field-choice': true,
                        'pd-checkbox-readonly': this.readonly,
                        'pd-checkbox-error': this.error,
                    }}
                    style={this.verticalAdjust ? { '--pd-checkbox-vertical-adjust': '2.3rem' } : {}}>
                    <input
                        id="pd-checkbox-control"
                        class="pd-checkbox-input"
                        type="checkbox"
                        checked={this.checked}
                        disabled={this.disabled || this.readonly}
                        required={this.required}
                        value={`${this.value}`}
                        name={this.name}
                        onClick={this.onClick}
                    />
                    <label
                        class="pd-form-field-label pd-checkbox-label"
                        htmlFor="pd-checkbox-control"
                        data-test="pd-checkbox-label">
                        <span
                            class={{
                                'pd-checkbox-inner': true,
                                'pd-checkbox-checked': this.checked || this.isIndeterminate,
                            }}
                            aria-hidden="true">
                            <span class={{ 'pd-checkbox-checkmark': this.checked && !this.isIndeterminate }}></span>
                            <span class={{ 'pd-checkbox-indeterminate': this.isIndeterminate }}></span>
                        </span>
                        <span class="pd-checkbox-text" data-test="pd-checkbox-text">
                            {this.text}
                        </span>
                    </label>
                </div>
            </Host>
        );
    }
}
