# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> Global Navigation & Route Accessibility >> should navigate to Natural Resources and display brand logo
- Location: tests\e2e\navigation.spec.js:18:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('h1')
Expected: 1
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for locator('h1')
    9 × locator resolved to 0 elements
      - unexpected value "0"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - link "Gesit Logo THE GESIT COMPANIES" [ref=e5] [cursor=pointer]:
          - /url: /
          - img "Gesit Logo" [ref=e6]
          - generic [ref=e7]: THE GESIT COMPANIES
        - navigation [ref=e8]:
          - list [ref=e9]:
            - listitem [ref=e10]:
              - link "Home" [ref=e11] [cursor=pointer]:
                - /url: /
            - listitem [ref=e12]:
              - link "About Us" [ref=e13] [cursor=pointer]:
                - /url: /about-us
            - listitem [ref=e14]:
              - link "Our Business" [ref=e15] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e16]:
              - link "CSR" [ref=e17] [cursor=pointer]:
                - /url: /csr
            - listitem [ref=e18]:
              - link "News" [ref=e19] [cursor=pointer]:
                - /url: /news
            - listitem [ref=e20]:
              - link "Career" [ref=e21] [cursor=pointer]:
                - /url: /career
            - listitem [ref=e22]:
              - link "Contact Us" [ref=e23] [cursor=pointer]:
                - /url: /contact-us
    - generic [ref=e26]:
      - generic [ref=e27]:
        - generic [ref=e31]:
          - img "Natural Resources 1" [ref=e33]
          - generic:
            - img "Natural Resources 2"
          - generic:
            - img "Natural Resources 3"
        - generic: Natural Resources
        - generic [ref=e34]:
          - button [ref=e35] [cursor=pointer]:
            - img [ref=e36]
          - button [ref=e38] [cursor=pointer]:
            - img [ref=e39]
      - generic [ref=e44]:
        - heading "Developing Indonesia's vast natural resources and continually expanding to other types of minerals and resources." [level=3] [ref=e45]
        - generic [ref=e46]: The Gesit Companies have several bauxite concessions and actively developing its mining and refining capabilities.
      - generic [ref=e48]:
        - generic [ref=e50]:
          - heading "Bauxite Mining" [level=2] [ref=e51]
          - generic [ref=e52]:
            - paragraph [ref=e53]: The Gesit Companies have several bauxite concessions of about 75,000 Ha along the Kapuas River in West Kalimantan.
            - paragraph [ref=e54]: We are actively developing our mining operations and logistic infrastructure to support the growing national and international alumina industry.
          - generic [ref=e55]:
            - 'heading "Location : West Kalimantan, Indonesia" [level=6] [ref=e56]'
            - paragraph [ref=e57]: "Project Type : Mining & Exploration"
        - generic [ref=e60]:
          - img "Bauxite Mining 1" [ref=e62]
          - img "Bauxite Mining 2" [ref=e64]
          - img "Bauxite Mining 3" [ref=e66]
      - generic [ref=e68]:
        - heading "New Business Development" [level=2] [ref=e69]
        - generic [ref=e70]:
          - generic [ref=e71]:
            - img "Nickel Mining" [ref=e73]
            - heading "Nickel Mining" [level=4] [ref=e75]
          - generic [ref=e76]:
            - img "Silica Sand Mining" [ref=e78]
            - heading "Silica Sand Mining" [level=4] [ref=e80]
          - generic [ref=e81]:
            - img "Alumina Refinery and Aluminum Smelter" [ref=e83]
            - heading "Alumina Refinery and Aluminum Smelter" [level=4] [ref=e85]
    - generic [ref=e86]:
      - contentinfo [ref=e87]:
        - generic [ref=e91]:
          - generic [ref=e93]:
            - heading "Company Links" [level=5] [ref=e94]
            - list [ref=e96]:
              - listitem [ref=e97]:
                - link "Home" [ref=e98] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e99]:
                - link "About Us" [ref=e100] [cursor=pointer]:
                  - /url: /about-us
              - listitem [ref=e101]:
                - link "CSR" [ref=e102] [cursor=pointer]:
                  - /url: /csr
              - listitem [ref=e103]:
                - link "News" [ref=e104] [cursor=pointer]:
                  - /url: /news
              - listitem [ref=e105]:
                - link "Career" [ref=e106] [cursor=pointer]:
                  - /url: /career
          - generic [ref=e108]:
            - heading "Our Business" [level=5] [ref=e109]
            - list [ref=e111]:
              - listitem [ref=e112]:
                - link "Property" [ref=e113] [cursor=pointer]:
                  - /url: /our-business/property
              - listitem [ref=e114]:
                - link "Trading & Services" [ref=e115] [cursor=pointer]:
                  - /url: /our-business/trading-services
              - listitem [ref=e116]:
                - link "Manufacturing" [ref=e117] [cursor=pointer]:
                  - /url: /our-business/manufacturing
              - listitem [ref=e118]:
                - link "Natural Resources" [ref=e119] [cursor=pointer]:
                  - /url: /our-business/natural-resources
          - generic [ref=e122]:
            - heading "Find Us" [level=5] [ref=e123]
            - paragraph [ref=e124]:
              - link "The City Tower, 27th Floor Jl. M.H. Thamrin No 81 Menteng, Jakarta Pusat DKI Jakarta 10310 – Indonesia" [ref=e125] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/The+City+Tower/@-6.199216,106.8213135,17z/data=!4m12!1m6!3m5!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!2sThe+City+Tower!8m2!3d-6.1991991!4d106.8235192!3m4!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!8m2!3d-6.1991991!4d106.8235192
                - text: The City Tower, 27th Floor
                - text: Jl. M.H. Thamrin No 81
                - text: Menteng, Jakarta Pusat
                - text: DKI Jakarta 10310 – Indonesia
            - paragraph [ref=e126]:
              - 'link "Phone : +62 21 3101601" [ref=e127] [cursor=pointer]':
                - /url: tel:+62213101601
            - paragraph [ref=e128]:
              - 'link "Mail : contact@gesit.co.id" [ref=e129] [cursor=pointer]':
                - /url: mailto:contact@gesit.co.id
        - generic [ref=e134]:
          - link "Gesit Logo" [ref=e136] [cursor=pointer]:
            - /url: /
            - img "Gesit Logo" [ref=e137]
          - paragraph [ref=e140]: © 2026 THE GESIT COMPANIES. ALL RIGHTS RESERVED
      - navigation [ref=e144]:
        - list [ref=e145]:
          - listitem [ref=e146]:
            - link "Home" [ref=e147] [cursor=pointer]:
              - /url: /
          - listitem [ref=e148]:
            - link "About Us" [ref=e149] [cursor=pointer]:
              - /url: /about-us
          - listitem [ref=e150]:
            - link "Our Business" [ref=e151] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e152]:
            - link "CSR" [ref=e153] [cursor=pointer]:
              - /url: /csr
          - listitem [ref=e154]:
            - link "News" [ref=e155] [cursor=pointer]:
              - /url: /news
          - listitem [ref=e156]:
            - link "Career" [ref=e157] [cursor=pointer]:
              - /url: /career
          - listitem [ref=e158]:
            - link "Contact Us" [ref=e159] [cursor=pointer]:
              - /url: /contact-us
    - generic:
      - img
      - img
  - button "Open Next.js Dev Tools" [ref=e165] [cursor=pointer]:
    - img [ref=e166]
  - alert [ref=e169]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | const publicRoutes = [
  4  |   { path: '/', name: 'Home' },
  5  |   { path: '/about-us', name: 'About Us' },
  6  |   { path: '/csr', name: 'CSR' },
  7  |   { path: '/news', name: 'News' },
  8  |   { path: '/career', name: 'Career' },
  9  |   { path: '/contact-us', name: 'Contact Us' },
  10 |   { path: '/our-business/property', name: 'Property' },
  11 |   { path: '/our-business/manufacturing', name: 'Manufacturing' },
  12 |   { path: '/our-business/natural-resources', name: 'Natural Resources' },
  13 |   { path: '/our-business/trading-services', name: 'Trading & Services' },
  14 | ];
  15 | 
  16 | test.describe('Global Navigation & Route Accessibility', () => {
  17 |   for (const route of publicRoutes) {
  18 |     test(`should navigate to ${route.name} and display brand logo`, async ({ page }) => {
  19 |       await page.goto(route.path);
  20 |       
  21 |       // Verify brand text is present in the header
  22 |       const brandText = page.getByText('THE GESIT COMPANIES').first();
  23 |       await expect(brandText).toBeVisible();
  24 | 
  25 |       // SEO & Accessibility: Every page MUST have exactly one <h1>
  26 |       const h1 = page.locator('h1');
> 27 |       await expect(h1).toHaveCount(1);
     |                        ^ Error: expect(locator).toHaveCount(expected) failed
  28 |       
  29 |       // Animation handling: Wait for title to become visible (accounting for 1.2s animations)
  30 |       await expect(h1).toBeVisible({ timeout: 10000 });
  31 |     });
  32 |   }
  33 | 
  34 |   test('should handle 404 for non-existent routes', async ({ page }) => {
  35 |     const response = await page.goto('/this-page-does-not-exist');
  36 |     expect(response.status()).toBe(404);
  37 |   });
  38 | });
  39 | 
```