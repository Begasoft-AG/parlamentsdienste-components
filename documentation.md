# To add in the docs

## Global styles stay outside Shadow DOM

`packages/core/stencil.config.ts` keeps `globalStyle` but sets
`extras.addGlobalStyleToComponents: false`. Stencil's automatic adoption of the
global stylesheet leaked Bootstrap reboot into shadow roots after the upgrade
in 4.0.2, adding unintended label margins and overriding timeline title weights.
Consumers must still load `parlamentsdienstecore.css` for light DOM components
and overlays such as the flatpickr calendar. Shadow components own their styles;
the slider explicitly resets control fonts to preserve its size, and pagination
sets the pointer cursor only on enabled buttons.

## Shared form-field pattern

`pd-input`, `pd-dropdown`, `pd-checkbox`, `pd-textarea`, `pd-combobox`,
`pd-datepicker` and `pd-search` use the `formField` mixin from
`packages/core/src/styles/mixins.scss`. Each component includes these shared
classes in its Shadow DOM stylesheet:

-   `pd-form-field`: neutral wrapper with separate label and native control.
-   `pd-form-field-label`: label reset and a single `0.25rem` bottom margin.
-   `pd-form-field-label-viewonly`: bold non-interactive caption instead of a label.
-   `pd-form-field-choice`: checkbox layout with no label margin. The label contains
    the decorative checkbox and text, while the visually hidden native input is its sibling.

Labels use `for`/`id` within the same Shadow Root; internal IDs are scoped to that
root. The dropdown's accessible name includes both its caption and selected value.
Character counters remain outside the label and keep their own spacing.
Disabled, readonly, error and explicit `verticalAdjust` settings remain supported;
unset vertical offsets default to zero rather than inheriting host margins.
The label-to-control gap is `0.25rem` (4px at the default font size), reduced
from `0.75rem` for the dropdown; checkbox labels have no bottom gap.
Vertical adjustment applies to the control or its container, not the whole field.
The datepicker keeps both `--pd-datepicker-vertical-adjust` (control container)
and `--pd-input-vertical-adjust` (input); `verticalAdjust` sets only the former
so the offset is applied once. The textarea retains `--pd-input-vertical-adjust`;
it has no `verticalAdjust` prop, so set this variable to `1.5625rem` when aligning
an unlabeled textarea with a labeled text control.

`pd-radio` follows the choice markup with phrasing-content spans, but is a light
DOM exception: it keeps its native input inside the implicit label, uses no IDs,
and does not include the mixin (which would leak generic rules into the document).
Its own label margin overrides Bootstrap reboot, retaining a `0.375rem` bottom margin.

## new prop `selected` for `pd-dropdown` and `pd-combobox`

Added for the valueaccessor. can be an dropdown item object (but only needs an id prop)`{ id: '1', ... }` or a string id `asdf` or a number `1` to select an item.

## BREAKING: changed output event

`pd-input`, `pd-textarea`, `pd-search` and `pd-slider` are now emitting the value directly with the `pd-change` (also `pd-input`, `pd-search` in `pd-search`) event. Before the value was wrapped in an object with a `value` property. This is now consistent with the other components like `pd-dropdown`, `pd-combobox`, etc.This was necessary to make the angular valueaccessor work correctly.

## new component `pd-radio-group`

# Todos:

-   `pd-combobox` bug in react when selected prop gets a useState value.
-   `pd-input`: `pd-change` fires 2 times when entering something in the input

# Maybe Todos?

-   pd-table: type for `rows`property is `PdTableRow[]` but thats not really what the input needs to be.
-   Maybe check the other properties as well.

# Follow-up's?

-   card component (only css) doenst look good
-   inline styles aren't good documented
-   make a real component out of `tooltip` so you dont need to import tippy.js from a cdn
