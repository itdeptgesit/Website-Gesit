# Design System Inspired by The Gesit Companies

## 1. Visual Theme & Atmosphere

The Gesit Companies design system projects corporate professionalism, trust, and social responsibility through a sophisticated palette anchored by deep navy blue and warm gold accents. The visual identity conveys stability and forward-thinking leadership while maintaining accessibility and clarity across all touchpoints. The design balances formal corporate elements with approachable, human-centered aesthetics—particularly evident in the emphasis on community impact imagery and accessible typography. Rich serif and sans-serif combinations create visual hierarchy that guides users through content about corporate social responsibility and business initiatives with dignity and purpose.

**Key Characteristics:**
- Deep navy foundation (`#103065`) paired with energetic gold (`#FF6900`) creates premium, trustworthy aesthetic
- Serif typography (Lora, Crimson Text) for headings conveys authority and tradition
- Sans-serif body text (Source Sans Pro) ensures readability and modernity
- Extensive neutral palette with strategic color accents for emphasis
- Clean, spacious layout with generous padding and breathing room
- Accessibility-focused with high contrast between text and backgrounds
- Subtle elevation and soft shadows for depth without visual clutter

## 2. Color Palette & Roles

### Primary
- **Deep Navy** (`#103065`): Primary brand color used in navigation headers, section backgrounds, and key structural elements. Conveys corporate stability and trust.
- **Warm Gold** (`#FF6900`): Accent color paired with navy for visual interest, call-to-action emphasis, and brand personality highlights.

### Accent Colors
- **Vibrant Blue** (`#0693E3`): Secondary interactive accent for links and highlighted content elements.
- **Purple** (`#9B51E0`): Tertiary accent for visual variety and tertiary actions.
- **Soft Pink** (`#F78DA7`): Supporting accent for subtle emphasis and emotional warmth.
- **Mint Green** (`#7BDCB5`): Health and wellness accent, reinforces positive impact messaging.
- **Emerald** (`#00D084`): Success indicator and environmental initiative highlighting.

### Interactive
- **Blue Primary** (`#0693E3`): Link hover states and interactive element focus.
- **Purple** (`#9B51E0`): Secondary interactive states and tertiary button variants.

### Neutral Scale
- **True Black** (`#000000`): Text content, strong contrast, critical information.
- **Dark Gray** (`#616161`): Primary body text, primary interface text, primary component text.
- **Medium Gray** (`#919191`): Secondary text, disabled states, less emphasized content.
- **Light Gray** (`#C2C2C2`): Border definition, subtle dividers, disabled backgrounds.
- **Very Light Gray** (`#EEEEEE`): Subtle background alternation, minimal contrast surfaces.
- **Slate Blue** (`#E3EAF4`): Light background for callout sections and information containers.

### Surface & Borders
- **White** (`#FFFFFF`): Primary background, card surfaces, content containers.
- **Very Light Gray** (`#EEEEEE`): Secondary background for section differentiation.
- **Slate Blue** (`#E3EAF4`): Highlighted callout sections with left border accent.
- **Light Gray** (`#C2C2C2`): Border strokes for containers and dividers.

### Semantic / Status
- **Gold Warning** (`#BC9C33`): Warning states and caution indicators.
- **Bright Yellow** (`#FCB900`): Secondary warning emphasis and notification highlights.
- **Yellow Lime** (`#FEF84C`): Tertiary warning state for high-visibility alerts.
- **Error Red** (`#CF2E2E`): Error states, critical validation failures, and danger actions.

## 3. Typography Rules

### Font Family
**Primary Serif:** Lora (regular 400, medium 500, semibold 600, bold 700)
Fallback: Georgia, serif

**Secondary Serif:** Crimson Text (regular 400, medium 500, semibold 600, bold 700)
Fallback: Garamond, serif

**Primary Sans-Serif:** Source Sans Pro (light 300, regular 400, medium 500, semibold 600, bold 700)
Fallback: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

**Roboto:** Roboto (light 300, regular 400, medium 500, semibold 600, bold 700)
Fallback: sans-serif

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display XL | Lora | 48px | 500 | 56px | 0px | Hero section titles, maximum emphasis |
| Display Large | Lora | 44px | 500 | 52px | 0px | Page headings, main section titles |
| Heading 1 | Lora | 36px | 400 | 50px | 0px | Primary content headings |
| Heading 2 | Lora | 32px | 400 | 44px | 0px | Secondary content headings |
| Heading 3 | Lora | 24px | 400 | 30px | 0px | Tertiary headings, subsection titles |
| Heading 4 | Crimson Text | 20px | 400 | 28px | 0px | Card titles, component headings |
| Body Regular | Source Sans Pro | 15px | 400 | 22px | 0px | Primary paragraph text, body content |
| Body Emphasized | Source Sans Pro | 16px | 600 | 28px | 0px | Emphasized body text, strong emphasis within paragraphs |
| Link Text | Crimson Text | 19px | 400 | 28px | 0px | Navigation links, inline links in body |
| Button Text | Source Sans Pro | 16px | 600 | 28px | 0px | Call-to-action buttons, form buttons |
| Caption | Source Sans Pro | 12px | 400 | 18px | 0px | Image captions, helper text, fine print |
| Code | Source Sans Pro | 13px | 500 | 20px | 0px | Monospace inline code, code blocks |

### Principles
- **Serif for Hierarchy:** Lora and Crimson Text establish authority and corporate credibility for headings and navigation.
- **Sans-Serif for Clarity:** Source Sans Pro ensures body text legibility and modern accessibility across screen sizes.
- **Generous Line Height:** All text uses line heights of 1.3–1.5x font size for readability and breathing room.
- **Weight Variance:** Bold weights (600–700) reserved for emphasis, callouts, and interactive elements.
- **Scale Consistency:** Typography scales in predictable increments (24px → 32px → 44px) for rhythm and balance.

## 4. Component Stylings

### Buttons

**Primary Button**
- Background: `#103065`
- Text Color: `#FFFFFF`
- Font: Source Sans Pro, `16px`, Weight `600`, Line Height `28px`
- Padding: `12px 24px`
- Border Radius: `0px`
- Border: `2px solid #103065`
- Box Shadow: `none`
- Hover State: Background `#0B1F47`, Border `2px solid #0B1F47`
- Active State: Background `#051429`, Border `2px solid #051429`
- Disabled State: Background `#C2C2C2`, Text Color `#919191`, Border `2px solid #C2C2C2`, Cursor `not-allowed`

**Secondary Button**
- Background: `#FFFFFF`
- Text Color: `#103065`
- Font: Source Sans Pro, `16px`, Weight `600`, Line Height `28px`
- Padding: `12px 24px`
- Border Radius: `0px`
- Border: `2px solid #103065`
- Box Shadow: `none`
- Hover State: Background `#E3EAF4`, Text Color `#051429`
- Active State: Background `#D0D9E8`, Text Color `#051429`
- Disabled State: Background `#EEEEEE`, Text Color `#919191`, Border `2px solid #C2C2C2`

**Ghost Button**
- Background: `transparent`
- Text Color: `#103065`
- Font: Source Sans Pro, `16px`, Weight `600`, Line Height `28px`
- Padding: `12px 24px`
- Border Radius: `0px`
- Border: `2px solid #103065`
- Box Shadow: `none`
- Hover State: Background `#F0F3F8`, Border `2px solid #0B1F47`
- Active State: Background `#E3EAF4`, Border `2px solid #051429`

**Accent Button (Gold)**
- Background: `#FF6900`
- Text Color: `#FFFFFF`
- Font: Source Sans Pro, `16px`, Weight `600`, Line Height `28px`
- Padding: `12px 24px`
- Border Radius: `0px`
- Border: `2px solid #FF6900`
- Box Shadow: `none`
- Hover State: Background `#E55A00`, Border `2px solid #E55A00`
- Active State: Background `#CC4A00`, Border `2px solid #CC4A00`

### Cards & Containers

**Standard Card**
- Background: `#FFFFFF`
- Border: `1px solid #C2C2C2`
- Border Radius: `0px`
- Padding: `24px`
- Box Shadow: `none`
- Text Color: `#616161`
- Hover State: Border `1px solid #919191`, Box Shadow `rgba(0, 0, 0, 0.08) 0px 2px 6px 0px`

**Callout Container (Information)**
- Background: `#E3EAF4`
- Border Left: `4px solid #FF6900`
- Border Radius: `0px`
- Padding: `20px 24px`
- Box Shadow: `none`
- Text Color: `#103065`
- Font: Source Sans Pro, `15px`, Weight `400`

**Section Background**
- Background: `#FFFFFF` or `#F9FAFB` (alternating)
- Padding: `60px 24px` (top/bottom) `24px` (sides)
- Border Radius: `0px`
- Box Shadow: `none`

### Inputs & Forms

**Text Input**
- Background: `#FFFFFF`
- Border: `1px solid #C2C2C2`
- Border Radius: `0px`
- Padding: `12px 16px`
- Font: Source Sans Pro, `15px`, Weight `400`, Line Height `22px`
- Text Color: `#616161`
- Placeholder Color: `#919191`
- Focus State: Border `2px solid #103065`, Box Shadow `0px 0px 0px 3px rgba(16, 48, 101, 0.1)`
- Error State: Border `2px solid #CF2E2E`, Text Color `#CF2E2E`

**Textarea**
- Background: `#FFFFFF`
- Border: `1px solid #C2C2C2`
- Border Radius: `0px`
- Padding: `12px 16px`
- Font: Source Sans Pro, `15px`, Weight `400`, Line Height `22px`
- Text Color: `#616161`
- Min Height: `120px`
- Resize: `vertical`
- Focus State: Border `2px solid #103065`, Box Shadow `0px 0px 0px 3px rgba(16, 48, 101, 0.1)`

**Select / Dropdown**
- Background: `#FFFFFF`
- Border: `1px solid #C2C2C2`
- Border Radius: `0px`
- Padding: `12px 16px`
- Font: Source Sans Pro, `15px`, Weight `400`, Line Height `22px`
- Text Color: `#616161`
- Focus State: Border `2px solid #103065`
- Open State: Box Shadow `rgba(0, 0, 0, 0.08) 0px 2px 6px 0px`

**Checkbox**
- Size: `18px × 18px`
- Border: `2px solid #C2C2C2`
- Border Radius: `0px`
- Background Unchecked: `#FFFFFF`
- Background Checked: `#103065`
- Checkmark Color: `#FFFFFF`
- Focus State: Border `2px solid #0693E3`, Box Shadow `0px 0px 0px 3px rgba(6, 147, 227, 0.1)`

**Radio Button**
- Size: `18px × 18px`
- Border: `2px solid #C2C2C2`
- Border Radius: `50%`
- Background Unselected: `#FFFFFF`
- Background Selected: `#103065`
- Inner Circle Selected: `#FFFFFF`, Size `8px`
- Focus State: Border `2px solid #0693E3`, Box Shadow `0px 0px 0px 3px rgba(6, 147, 227, 0.1)`

### Navigation

**Header Navigation**
- Background: `#103065`
- Height: `100px`
- Padding: `0px 40px`
- Display: `flex`, Align Items: `center`, Gap: `32px`
- Box Shadow: `none`
- Border Bottom: `1px solid rgba(255, 255, 255, 0.1)`

**Navigation Link**
- Font: Crimson Text, `19px`, Weight `400`, Line Height `28px`
- Text Color: `#616161`
- Padding: `8px 0px`
- Border Bottom: `2px solid transparent`
- Text Decoration: `none`
- Transition: `all 0.2s ease-in-out`
- Hover State: Text Color `#FFFFFF`, Border Bottom `2px solid #FF6900`
- Active State: Text Color `#FFFFFF`, Border Bottom `2px solid #FF6900`

**Navigation Link (White Text)**
- Font: Source Sans Pro, `16px`, Weight `600`, Line Height `28px`
- Text Color: `#FFFFFF`
- Padding: `8px 12px`
- Border Radius: `0px`
- Border: `none`
- Hover State: Opacity `0.85`
- Active State: Background `rgba(255, 255, 255, 0.2)`

**Logo / Brand**
- Height: `60px`
- Width: `auto`
- Margin Right: `auto`

### Breadcrumb
- Font: Source Sans Pro, `13px`, Weight `400`, Line Height `20px`
- Text Color: `#919191`
- Separator: `/` in `#919191`
- Active Link: Text Color `#103065`, Font Weight `600`
- Link Hover: Text Color `#0693E3`, Text Decoration `underline`
- Padding: `8px 0px`

## 5. Layout Principles

### Spacing System
**Base Unit:** `4px`

**Scale:**
- `4px`: Micro spacing between inline elements
- `8px`: Tight spacing (rarely used)
- `12px`: Default button/input padding vertical
- `16px`: Component internal padding, small gaps
- `20px`: Section internal padding, medium gaps
- `24px`: Card padding, standard component spacing
- `28px`: Vertical rhythm for typography
- `32px`: Component horizontal padding, large gaps
- `40px`: Header/footer vertical padding
- `60px`: Section vertical padding (top/bottom)
- `72px`: Large section spacing
- `96px`: Extra-large section spacing
- `100px`: Maximum spacing between major sections

**Usage Context:**
- Button padding: `12px 24px` (vertical × horizontal)
- Card padding: `24px`
- Section padding: `60px 24px` (vertical × horizontal)
- Component gaps: `16px`–`24px`
- Header height: `100px`

### Grid & Container
**Max Width:** `1200px` for content containers
**Padding:** `24px` on sides (mobile), `40px` (tablet), `60px` (desktop)
**Column Strategy:** 12-column grid with flexible column spans
**Section Patterns:**
- Hero section: Full-width image background with text overlay
- Content section: Centered container with generous padding
- Two-column: 50/50 split with `24px` gap between columns
- Three-column: Equal width with `24px` gaps
- Alternating sections: Section background colors alternate between `#FFFFFF` and `#F9FAFB`

### Whitespace Philosophy
The design system prioritizes ample whitespace to create breathing room and emphasize key content. Sections utilize generous top and bottom padding (`60px` or greater) to separate major content blocks. Cards and containers maintain internal padding of at least `20px` to prevent visual clutter. Vertical rhythm is maintained through consistent line heights (1.3–1.5x) and spacing increments that are multiples of the base unit. This approach creates a premium, sophisticated feel that emphasizes the corporate social responsibility messaging and allows hero imagery to breathe.

### Border Radius Scale
- **Sharp Corners:** `0px` — primary standard for all UI components, cards, buttons, and inputs
- **Subtle Curve:** `2px` — optional accent for focus states
- **Rounded Elements:** `50%` — reserved for circular avatars and radial badges
- **Philosophy:** The design system favors clean, sharp corners (`0px`) to maintain corporate formality and clarity. Rounded corners are minimal or absent, supporting the professional aesthetic and ensuring UI clarity.

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Surface | No shadow | Cards, containers, buttons, inputs in default state |
| Hover Elevation | `rgba(0, 0, 0, 0.08) 0px 2px 6px 0px` | Cards on hover, dropdowns open, interactive elements receiving focus |
| Modal/Overlay Depth | `rgba(0, 0, 0, 0.12) 0px 4px 12px 0px` | Modals, overlays, floating panels (inferred from pattern) |
| Navigation | No shadow | Header and navigation bars remain flat |

**Shadow Philosophy:**
The design system employs a minimal shadow strategy to maintain clarity and corporate sophistication. Shadows are reserved exclusively for hover states and interactive elevation to indicate interactivity without visual distraction. The single defined shadow (`rgba(0, 0, 0, 0.08) 0px 2px 6px 0px`) is subtle and soft, appropriate for a light background palette. Default surfaces remain flat and unshaded, creating a clean, modern aesthetic. Shadows increase slightly in opacity and blur only when elements enter interactive states (hover, open, focus), reinforcing the principle that depth indicates user interaction or layering.

## 7. Do's and Don'ts

### Do
- **Use Navy (`#103065`) as primary structure:** Apply this color to headers, primary navigation backgrounds, and key section containers to establish corporate authority.
- **Leverage Gold (`#FF6900`) sparingly for emphasis:** Reserve this accent for primary call-to-action buttons, borders of callout sections, and critical interactive elements.
- **Maintain sharp corners (`0px` border radius):** Keep all UI elements, buttons, cards, and inputs with square corners to preserve the professional, formal aesthetic.
- **Apply generous padding and spacing:** Use the spacing scale consistently (especially `60px` for sections, `24px` for cards) to create breathing room and premium feel.
- **Pair serif fonts with sans-serif:** Use Lora or Crimson Text for headings and Source Sans Pro for body text to create visual hierarchy and readability.
- **Include left border accents on callout sections:** Use `4px solid #FF6900` on left side of information containers to draw attention without overwhelming.
- **Use high contrast text colors:** Maintain dark text (`#616161` or `#103065`) on light backgrounds and white text on dark backgrounds for accessibility.
- **Implement hover states with subtle borders and shadows:** Add `2px` borders and soft shadows on interactive elements to indicate they are clickable.

### Don't
- **Avoid rounding corners on primary components:** Do not use `border-radius` on buttons, cards, inputs, or navigation—square corners are core to the identity.
- **Do not overuse accent colors:** Limit gold, blue, and purple accents to 1–2 instances per page to maintain focus and visual hierarchy.
- **Don't use colors outside the defined palette:** Stick to the 19 extracted colors; custom colors dilute the system's cohesion.
- **Avoid thin or light font weights in body text:** Body text should be `400` weight minimum for legibility; never use `300` weight for primary reading content.
- **Don't apply shadows to non-interactive elements:** Keep shadows reserved for hover states, dropdowns, and overlays—default surfaces should be flat.
- **Avoid mixing serif and sans-serif in the same heading:** Choose either Lora/Crimson Text for heading hierarchy, not a mix.
- **Don't add unnecessary decorative elements:** The design system favors clean, unadorned layouts—avoid gradients, textures, or patterns unless supporting social responsibility messaging.
- **Avoid insufficient padding inside components:** Minimum internal padding is `12px` for buttons and `16px` for inputs to ensure breathing room and touch target adequacy.
- **Don't use small font sizes for primary navigation:** Navigation links should be `16px` minimum; smaller text reduces accessibility and corporate clarity.

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Key Changes |
|------------|-------|-------------|
| Mobile | `320px`–`767px` | Single-column layout, full-width cards, padding reduced to `16px`, header height `80px`, navigation links `14px`, section padding `40px 16px` |
| Tablet | `768px`–`1023px` | Two-column layout optional, padding `24px`, header height `90px`, navigation links `16px`, section padding `50px 24px` |
| Desktop | `1024px`–`1439px` | Multi-column layout (2–3 columns), max content width `1200px`, padding `40px`, header height `100px`, navigation links `19px`, section padding `60px 40px` |
| Large Desktop | `1440px`+ | Max width `1400px`, generous side margins, section padding `60px 60px`, increased whitespace |

### Touch Targets
- **Minimum Touch Size:** `44px × 44px` for all interactive elements (buttons, links, form inputs)
- **Button Padding:** `12px 24px` yields approximately `36px` height—add `4px` top/bottom margin to meet `44px` minimum
- **Link Padding:** `8px` vertical + line height provides adequate touch target for navigation links
- **Form Input Height:** `16px` text + `12px` vertical padding = `40px` minimum (acceptable, add `2px` border for `44px` total)
- **Click Areas:** Maintain `16px`–`24px` horizontal spacing between adjacent clickable elements to prevent misclicks

### Collapsing Strategy
- **Navigation:** On mobile (`< 768px`), collapse horizontal navigation into hamburger menu with overlay panel. Header height reduces to `80px`. Menu items stack vertically with `16px` padding between.
- **Multi-Column Layouts:** Two or three-column sections collapse to single column on mobile. Column gaps reduce from `24px` to `16px` on tablet and mobile.
- **Cards:** Card width on mobile spans full container width minus `16px` padding. On tablet, cards display 2-up; on desktop, 3-up with consistent `24px` gaps.
- **Section Padding:** Reduce horizontal padding to `16px` on mobile, `24px` on tablet, `40px` on desktop and above. Vertical padding remains `40px` on mobile, `50px` on tablet, `60px` on desktop.
- **Images & Heroes:** Scale images to `100%` width on mobile with reduced aspect ratio if necessary. Overlay text remains readable with adjusted font sizes: display headings `32px` on mobile, `40px` on tablet, `44px` on desktop.
- **Typography:** Scale down by 1–2 sizes on mobile: heading 1 becomes `28px` on mobile (`36px` on desktop), body remains `15px` (minimum legible size).

## 9. Agent Prompt Guide

### Quick Color Reference
- **Primary CTA / Buttons:** Deep Navy (`#103065`)
- **Accent / Secondary CTA:** Warm Gold (`#FF6900`)
- **Links / Interactive Highlights:** Vibrant Blue (`#0693E3`)
- **Background / Card Surface:** White (`#FFFFFF`)
- **Background / Alternating Sections:** Very Light Gray (`#EEEEEE`)
- **Body Text Color:** Dark Gray (`#616161`)
- **Heading Text Color:** Deep Navy (`#103065`)
- **Callout Container Background:** Slate Blue (`#E3EAF4`)
- **Callout Left Border:** Warm Gold (`#FF6900`)
- **Disabled / Secondary Text:** Medium Gray (`#919191`)
- **Borders / Dividers:** Light Gray (`#C2C2C2`)
- **Error State:** Error Red (`#CF2E2E`)
- **Warning State:** Gold Warning (`#BC9C33`)
- **Success / Positive:** Emerald (`#00D084`)

### Iteration Guide
1. **Start with Navy Backgrounds:** All section headers, navigation backgrounds, and primary containers use `#103065` with white text (`#FFFFFF`).
2. **Apply Sharp Corners Universally:** All buttons, cards, inputs, and containers use `border-radius: 0px`—no rounding.
3. **Use Serif for Headings, Sans-Serif for Body:** Pair Lora/Crimson Text (headings) with Source Sans Pro (body) consistently. Maintain typography hierarchy table exactly.
4. **Generous Spacing is Non-Negotiable:** Section padding minimum `60px` top/bottom, card padding `24px`, component gaps `16px`–`24px`. Never compress spacing.
5. **Gold Accent Restraint:** Use `#FF6900` only for primary CTAs, borders of callout sections (left `4px` border), and hover state underlines on navigation. Maximum 1–3 instances per page.
6. **Shadows Only on Interaction:** Default surfaces have no shadow (`box-shadow: none`). Apply `rgba(0, 0, 0, 0.08) 0px 2px 6px 0px` exclusively to hover states, dropdowns, and interactive elevation.
7. **Callout Sections Are Highlighted:** Use `#E3EAF4` background with `4px solid #FF6900` left border for information containers; add `20px 24px` padding.
8. **Maintain Color Accessibility:** Ensure all text has sufficient contrast (minimum WCAG AA). Dark text on light backgrounds, white text on navy.
9. **Responsive Scaling:** Font sizes reduce on mobile; section padding decreases (mobile `16px`, tablet `24px`, desktop `40px`+). Navigation collapses to hamburger on mobile.
10. **Trust the Extracted Palette:** Stick to the 19 defined colors. Do not introduce grays outside the scale, blues beyond the three defined, or golds beyond `#FF6900`.