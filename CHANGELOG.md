## 1.1.5 - 2025-06-20

- Fixed Button event on:click bug

## 1.1.4 - 2025-06-15

- Added `TabbedCodeBlock` component for displaying code in tabs

## 1.1.3 - 2025-06-03

- I.T now supports props in elements
- .hds-link class added to easily made a link style

## 1.1.1 - 2025-06-02

- Bluesky social support added to HyvorBar and Footer
- Updated default Twitter URL

## 1.1.0 - 2025-05-19

- HyvorBar updated to support any product name so that design system updates are not necessary for new products
- Bluesky social support
- Usage component
- InternationalizationProvider now saves the selected language in local storage
- I18n now automatically detects the user's language from navigator.language

## 1.0.10 - 2025-02-02

- Adds billing support to HyvorBar

## 1.0.8 - 2025-01-010

- Adds `TableCell` component for improved Table accessibility

## 1.0.7 - 2025-01-010

- Accessibility updates for the `Modal` and `SplitControl` components
- `SplitControl` now supports rest props

## 1.0.6 - 2024-12-12

- Upgraded @hyvor/icons and new icon import style
- Document component linkify

## 1.0.4 - 2024-12-11

- `TextInput` now supports `select` prop to render a select input

## 1.0.0 - 2024-11-13

- Svelte 5 upgrade
- IconMessage `icon` prop only supports a Component now. The `icon` slot/snippet is removed.
- HyvorBar now supports `config.name` for a custom name, and `product="core"` for core colors

## 0.0.68 - 2024-09-09

- `<HyvorBar>` component added
- Callout `title` prop
- Navlink disabled state

## 0.0.67 - 2024-07-28

- Document component added to marketing

## 0.0.66 - 2024-06-12

- `on:change` event in Slider Component

## 0.0.65 - 2024-06-11

- Slider component added

## 0.0.64 - 2024-05-21

- ColorPicker show export, fix onclick

## 0.0.63 - 2024-04-25

- ActionItem selectionAlign added
- button conditional slots (margin fixed)

## 0.0.62 - 2024-04-22

- confirm(): `autoClose` property
- confirm() now returns an OBJECT, not true, on success to support manual loading and closing operations

## 0.0.61 - 2024-04-18

- Improved dot types for I18n
- Pass context down to I18n elements

## 0.0.60 - 2024-04-18

- I18n type safety, dot notation, etc.
- Nav category icon

## 0.0.59 - 2024-04-03

- TextInput wrapper changed to <label> for better accessibility and semantics

## 0.0.58 - 2024-03-04

- TextInput input height 100%
- key param in <T> is now reactive

## 0.0.57 - 2024-02-20

- role="dialog" and role="alertdialog" for Modal component
- id property added to Modal component, with aria-labelledby and aria-describedby props

## 0.0.56 - 2024-02-12

- role="alert" (default) to Validation component
- Rest Props sent to other FormControl components

## 0.0.55 - 2024-02-12

- i18n.t() added
- element support added to i18n strings

## 0.0.54 - 2024-02-06

- t() function added for i18n

## 0.0.53 - 2024-02-06

- Added i18n

## 0.0.52 - 2024-01-31

- Mobile-friendly docs
- Table of Contents - Docs

## 0.0.51 - 2024-01-29

- Fixed dependency issue with svelte-awesome-color-picker

## 0.0.50 - 2024-01-29

- Color picker: native picker removed

## 0.0.49 - 2024-01-27

- JSON support in CodeBlock

## 0.0.48 - 2024-01-26

- Callout line height fix
- YAML support in CodeBlock
- ActionListItem disabled state
- Button invisible disabled state

## 0.0.47 - 2024-01-26

- DocsImage added

## 0.0.46 - 2024-01-19

- .hds-container global class
- Button accent, invisible text color fix

## 0.0.45 - 2024-01-18

- Tooltip content changed to inline-flex, transition fade added
- Action list, checkbox disabled states added

## 0.0.44 - 2024-01-16

- IconButton `input` color added
- IconButton `fill-light`, `accent` color changed to be lighter

## 0.0.43 - 2024-01-14

- IconMessage layout fixes
- Base refactor

## 0.0.42 - 2024-01-06

- Modal loading state
- Modal footer prop

## 0.0.41 - 2024-01-05

- Fix textarea enter bug

## 0.0.40 - 2024-01-05

- Toast z-index change
- Column prop in split control added

## 0.0.39 - 2024-01-03

- Tooltip disabled state
- Nav tab state update fix
- Split Control flex prop

## 0.0.38 - 2024-01-03

- Load Button added
- Icon Message added
- Icon Button fill, fill-light, and disabled

## 0.0.37 - 2024-01-03

- contentProps in confirm()
- Modal closing bug fixed

## 0.0.36 - 2024-01-03

- await confirm() added

## 0.0.35 - 2024-01-02

- Modal overflow - align to top when large
- Button fill-light
- Tag disabled state

## 0.0.34 - 2024-01-02

- var(--orange) color update
- TextInput blur bug fixed

## 0.0.33 - 2024-01-02

- Forward the inner input/button/textarea elements via a prop

## 0.0.32 - 2024-01-01

- added Modal title slot

## 0.0.31 - 2024-01-01

- added color picker

## 0.0.30 - 2023-12-30

- button colors/variants (BREAKING)
- tooltip z-index fix
- input size matches button size

## 0.0.29 - 2023-12-28

- Added loader state

## 0.0.28 - 2023-12-27

- Changed icon button color/variant props
- Added number size to icon button
- Changed input color
- Added x-small text input size
- Added textarea slots
- Fixed input dark mode color

## 0.0.27 - 2023-12-25

- Added oninput events to TextInput and Textarea

## 0.0.26 - 2023-12-24

- Added tab nav

## 0.0.25 - 2023-12-24

- Added color="accent" to <Tag>
- Added custom colors to <Tag>

## 0.0.24 - 2023-12-23

- Moved .hds-box class to index.css

## 0.0.23 - 2023-12-23

- Added fill prop to Tag
- Added $$restProps to Tag

## 0.0.22

- Fixed exporting <Tag> component

## 0.0.21

- Added <Tag> component
- NavLink align-items:center
- Added .hds-box class
- Fixed Toast message pointer events issue fixed

## 0.0.20

- Upgrade to sveltekit 2.0

## 0.0.19

- Button disabled state
- Local code block styles
- Footer export and docs
- Header mobile friendly

## 0.0.18

- Fix TextInput value not binding bug

## 0.0.17

- Change Tooltip wrap display to inline
- Pass props down to Tooltip

## 0.0.16

- Adds Modal
