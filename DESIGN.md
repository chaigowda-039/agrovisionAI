# Design System Strategy: The Digital Greenhouse

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"Technological Symbiosis."** 

We are moving away from the "industrial-tech" aesthetic of rigid grids and harsh lines. Instead, this system treats the interface as a living ecosystem—a digital greenhouse where high-precision data meets organic fluidity. To achieve a signature, high-end editorial feel, we utilize **Intentional Asymmetry** and **Tonal Depth**. 

Instead of centering every element, we use whitespace as a structural component, allowing high-contrast typography to breathe. Layouts should feel "curated" rather than "templated," using overlapping glass layers to mimic the way light filters through a canopy.

---

## 2. Colors & Tonal Architecture
The palette is rooted in a spectrum of botanical greens, transitioning from the deep, authoritative forest floor to the translucent sprout.

### The "No-Line" Rule
**Standard 1px borders are strictly prohibited for sectioning.** 
Structural definition is achieved exclusively through background shifts. For example, a `surface-container-low` section should sit against a `surface` background to create a "soft zone" without a hard edge.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical, translucent layers. 
- **Base Layer:** `surface` (#f6faf6)
- **Content Zones:** `surface-container-low` (#f1f5f1)
- **Floating Interactive Elements:** `surface-container-lowest` (#ffffff) 

### The Glass & Gradient Rule
To achieve the "Futuristic AgriTech" vibe, hero sections and primary CTAs must utilize the **Signature Texture**: A linear gradient from `primary` (#0d631b) to `primary-container` (#2e7d32) at a 135-degree angle. Floating cards must use **Glassmorphism**: `surface-container-lowest` at 70% opacity with a `24px` backdrop-blur.

---

## 3. Typography: The Editorial Voice
We pair the architectural precision of **Plus Jakarta Sans** (Display/Headlines) with the functional clarity of **Inter** (Body/Labels).

*   **Display-LG (3.5rem):** Used for "Big Truths." High-impact, low-word-count statements.
*   **Headline-MD (1.75rem):** For section starts. Always pair with generous top-margin to establish a clear hierarchy.
*   **Body-LG (1rem):** The workhorse for insights. Set with a line-height of 1.6 to ensure the "organic" feel remains legible and airy.
*   **Label-SM (0.6875rem):** All-caps with +0.05em tracking for metadata or "System Status" indicators.

The contrast between the wide, modern display faces and the tight, neutral body text conveys a brand that is both visionary and grounded in data.

---

## 4. Elevation & Depth
Depth in this system is a result of light and layering, not artificial structure.

### The Layering Principle
Achieve lift by stacking. Place a `surface-container-lowest` card on a `surface-container-high` background. This "paper-on-stone" approach creates a natural contrast that guides the eye without visual clutter.

### Ambient Shadows
Shadows are reserved for elements that require user interaction (e.g., active cards, modals).
- **Value:** `0px 20px 40px`
- **Color:** Use the `on-surface` token at 6% opacity, tinted with 2% `primary`. This mimics the way shadows in nature are never truly grey, but influenced by the surrounding environment.

### The "Ghost Border"
If accessibility requires a container boundary, use a **Ghost Border**: `outline-variant` (#bfcaba) at 15% opacity. It should be felt, not seen.

---

## 5. Components & Primitive Styling

### Buttons: The "Organic Capsule"
- **Primary:** `primary` background with `on-primary` text. Use `xl` (3rem) roundedness to create a friendly, pill-shaped silhouette.
- **Secondary Glass:** `surface-container-lowest` at 40% opacity with a `12px` backdrop blur. This allows the button to "absorb" the color of the section behind it.

### Cards: Data Vessels
- **Rule:** Forbid divider lines within cards. 
- **Layout:** Use 32px of internal padding. Separate the header from the body using a 4px vertical shift and a change from `title-md` to `body-md`. 
- **Radius:** Strictly `lg` (2rem) for outer containers; `sm` (0.5rem) for internal media elements.

### Inputs: The Soft Focus
- **State:** Default inputs use `surface-container-highest` with no border. 
- **Focus:** Transition to a `ghost-border` of `primary` at 40% with a subtle `4px` outer glow in the `primary-fixed-dim` color.

### Custom Component: The "Growth Metric" Chip
For AgriTech data (e.g., soil pH, moisture), use a chip with a `secondary-container` background and a small `primary` sparkline icon. It represents "intelligence in motion."

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetric Margins:** Let a headline sit 20% further to the left than the body text to create an editorial, "un-templated" look.
*   **Embrace Large Radii:** Stick to the `lg` (2rem) or `xl` (3rem) rounding for all major containers to maintain the "Organic" vibe.
*   **Layer Glass on Gradients:** Place glassmorphic cards over soft green-to-blue background gradients for maximum depth.

### Don’t:
*   **Don't use Dividers:** Never use a horizontal line to separate list items. Use 16px of `surface-container-low` whitespace instead.
*   **Don't use Pure Black:** Always use `on-surface` (#181d1a) for text. Pure black (#000000) breaks the naturalistic harmony.
*   **Don't use Standard Shadows:** Avoid small, dark, "dirty" shadows. If a shadow doesn't have a blur radius of at least 20px, it’s too heavy for this system.

---
**Director's Closing Note:** This system is not a set of constraints, but a philosophy. We are building a window into the future of agriculture—keep it clear, keep it light, and let the data grow naturally across the screen.
