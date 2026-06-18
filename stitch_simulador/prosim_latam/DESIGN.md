---
name: ProSim LatAm
colors:
  surface: '#15121b'
  surface-dim: '#15121b'
  surface-bright: '#3c3742'
  surface-container-lowest: '#100d16'
  surface-container-low: '#1d1a24'
  surface-container: '#221e28'
  surface-container-high: '#2c2833'
  surface-container-highest: '#37333e'
  on-surface: '#e8dfee'
  on-surface-variant: '#ccc3d8'
  inverse-surface: '#e8dfee'
  inverse-on-surface: '#332f39'
  outline: '#958da1'
  outline-variant: '#4a4455'
  surface-tint: '#d2bbff'
  primary: '#d2bbff'
  on-primary: '#3f008e'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#732ee4'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb784'
  on-tertiary: '#4f2500'
  tertiary-container: '#a15100'
  on-tertiary-container: '#ffe0cd'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb784'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#713700'
  background: '#15121b'
  on-background: '#e8dfee'
  surface-variant: '#37333e'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  mono-label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-margin: 16px
  gutter: 16px
---

## Brand & Style
The brand personality is professional, empowering, and focused. It targets junior freelancers in Latin America who are navigating the transition from student to professional. The UI is designed to feel like a high-stakes simulation environment that is simultaneously supportive and rigorous.

The chosen style is **Minimalist with Glassmorphic accents**. By utilizing a deep dark mode palette, the interface reduces cognitive load and eye strain during long simulation sessions. It leverages high-contrast accents to guide the user's attention toward critical decision points and performance indicators, creating an atmosphere of "professional focus."

## Colors
The palette is built on a foundation of deep charcoals and navy-blacks to provide a premium, "IDE-like" professional feel. 

- **Primary (#7C3AED):** Used for main actions, active states, and brand presence.
- **Secondary (#06B6D4):** Utilized for information and neutral progress tracking.
- **Accents (#FF6B6B & #FF8A00):** Reserved for high-urgency alerts, "critical failure" scenarios in simulations, and achievement highlights.
- **Backgrounds:** `#111827` serves as the base layer, while `#1F2937` defines elevated surfaces like cards and navigation bars.

## Typography
This design system uses **Inter** exclusively to ensure maximum legibility and a systematic, utilitarian aesthetic. 

The hierarchy is strictly enforced: Headlines use tighter letter-spacing and heavier weights to feel grounded. Body text maintains a generous line height for readability in Spanish, which often requires more horizontal space than English. Labels are used for metadata, status indicators, and simulation timestamps.

## Layout & Spacing
The layout follows a **fluid grid** model optimized for mobile-first consumption. 

- **Mobile:** Single column with 16px side margins. Elements are stacked vertically to prioritize the simulation narrative.
- **Tablet/Desktop:** Content is centered in a max-width container (1024px) to prevent line lengths from becoming unreadable.
- **Spacing Rhythm:** Based on a 4px baseline. Use 16px (md) for standard padding within cards and 24px (lg) to separate distinct sections of the simulation.

## Elevation & Depth
Depth is created through **Tonal Layers** and subtle **Backdrop Blurs**. 

Since the background is dark, we avoid heavy drop shadows. Instead, elevation is communicated by lightening the surface color. 
- **Level 0:** `#111827` (Base background)
- **Level 1:** `#1F2937` (Cards, navigation bars)
- **Level 2:** `#374151` (Modals, popovers, hovering states)

For interactive elements like decision logs, a 1px inner border (stroke) using `#FFFFFF` at 10% opacity is applied to define edges against the dark background.

## Shapes
The shape language uses **Rounded (8px)** corners. This strike a balance between the "sharp" precision required for professional software and the "approachable" nature needed for a learning environment. 

Interactive components like buttons use the standard `rounded-md` (8px), while large container cards or "Verifiable Evidence" badges use `rounded-lg` (16px) to stand out as distinct objects.

## Components
- **Buttons:** Primary buttons use the Violet (#7C3AED) fill with white text. Secondary buttons use a ghost style with a `#374151` border.
- **Professional Cards:** High-contrast containers with a 1px subtle border. These hold client briefs and project requirements.
- **Interactive Timelines:** A vertical track using Cyan (#06B6D4) to show simulation progress. Completed steps are highlighted with a glow effect.
- **Decision Logs:** List items that show a "Before/After" or "Choice/Consequence" logic. Use color-coded labels (Spanish: *Decisión*, *Resultado*).
- **Performance Badges:** Circular or hex-shaped icons using Accent 2 (#FF8A00) for "Expertise" and Accent 1 (#FF6B6B) for "Risk Management."
- **Verifiable Evidence Cards:** These are designed to look like "Certificates." They feature a frosted glass (glassmorphism) background and a unique ID string in a mono-font for authenticity.
- **Input Fields:** Dark fill (`#111827`) with a subtle `#374151` border that glows Violet (#7C3AED) when focused.