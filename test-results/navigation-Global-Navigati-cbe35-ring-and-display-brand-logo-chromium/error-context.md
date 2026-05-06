# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> Global Navigation & Route Accessibility >> should navigate to Manufacturing and display brand logo
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
          - generic:
            - img "Manufacturing 1"
          - img "Manufacturing 2" [ref=e33]
          - generic:
            - img "Manufacturing 3"
        - generic: Manufacturing
        - generic [ref=e34]:
          - button [ref=e35] [cursor=pointer]:
            - img [ref=e36]
          - button [ref=e38] [cursor=pointer]:
            - img [ref=e39]
      - generic [ref=e44]:
        - heading "Serving important industrial sectors, delivering high-quality products, and establishing strong long-term partnership." [level=3] [ref=e45]
        - generic [ref=e46]: "The Gesit Companies operates aluminum fabrication and packaging company through two business lines: Alakasa Andalan Mitra Sejati and Rheem Indonesia."
      - generic [ref=e48]:
        - generic [ref=e50]:
          - heading "Aluminum Fabrication" [level=2] [ref=e51]
          - generic [ref=e52]:
            - paragraph [ref=e53]: The Gesit Companies invests and manages its aluminum fabrication company—Alakasa Andalan Mitra Sejati—since its Joint Venture with Alcan Aluminum in 1972. We focus on aluminum fabrication company that specializes in the industrial sector (e.g., train, marine, plantation, other industrial products) to serve the local and international market.
            - paragraph [ref=e54]: We have served countries such as Singapore, Malaysia, Philippine, Brunei, Japan, and Hong Kong over the last 40 years.
          - link "Download The Brochure" [ref=e56] [cursor=pointer]:
            - /url: /business/manufacturing/Company-Profile-Alakasa-Andalan-Mitra-Sejati-2022.pdf
        - generic [ref=e58]:
          - img "Aluminum 0" [ref=e60]
          - img "Aluminum 1" [ref=e62]
          - img "Aluminum 2" [ref=e64]
      - generic [ref=e66]:
        - generic [ref=e68]:
          - img "Packaging 0" [ref=e70]
          - img "Packaging 1" [ref=e72]
          - img "Packaging 2" [ref=e74]
          - img "Packaging 3" [ref=e76]
        - generic [ref=e78]:
          - heading "Steel & Plastic Packaging" [level=2] [ref=e79]
          - generic [ref=e80]:
            - paragraph [ref=e81]: The Gesit Companies invests and manages its packaging company—Rheem Indonesia—since it was established by Rheem Australia in 1969. The focus is to build a packaging company that specialises in industrial packaging products, such as steel and plastic drums as well as Jerry cans.
            - paragraph [ref=e82]: We ensure that customers obtain the highest standard of quality products and services, used in industries such as oil, paint, fragrance, chemical, and food processing.
          - link "Learn More about Steel and Plastic Packaging" [ref=e84] [cursor=pointer]:
            - /url: https://rheem.co.id/
            - text: Learn More
            - generic [ref=e85]: about Steel and Plastic Packaging
      - generic [ref=e87]:
        - generic [ref=e89]:
          - heading "Alumina Refinery & Aluminum Smelter Development" [level=2] [ref=e90]
          - generic [ref=e91]:
            - 'heading "Status : Under Development" [level=6] [ref=e92]'
            - paragraph [ref=e93]: "Project Phase : Development Cycle"
          - generic [ref=e94]:
            - paragraph [ref=e95]: We believe the Alumina and Aluminum industries can be domestically developed to service domestic and global clients due to Indonesia's rich natural resources and logistical advantage.
            - paragraph [ref=e96]: The Gesit Companies will develop a 2-million-ton Alumina Refinery and upon completion, develop an Aluminum Smelter which will reach 1 million ton for the next phase.
        - img "Alumina Refinery" [ref=e98]
    - generic [ref=e99]:
      - contentinfo [ref=e100]:
        - generic [ref=e104]:
          - generic [ref=e106]:
            - heading "Company Links" [level=5] [ref=e107]
            - list [ref=e109]:
              - listitem [ref=e110]:
                - link "Home" [ref=e111] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e112]:
                - link "About Us" [ref=e113] [cursor=pointer]:
                  - /url: /about-us
              - listitem [ref=e114]:
                - link "CSR" [ref=e115] [cursor=pointer]:
                  - /url: /csr
              - listitem [ref=e116]:
                - link "News" [ref=e117] [cursor=pointer]:
                  - /url: /news
              - listitem [ref=e118]:
                - link "Career" [ref=e119] [cursor=pointer]:
                  - /url: /career
          - generic [ref=e121]:
            - heading "Our Business" [level=5] [ref=e122]
            - list [ref=e124]:
              - listitem [ref=e125]:
                - link "Property" [ref=e126] [cursor=pointer]:
                  - /url: /our-business/property
              - listitem [ref=e127]:
                - link "Trading & Services" [ref=e128] [cursor=pointer]:
                  - /url: /our-business/trading-services
              - listitem [ref=e129]:
                - link "Manufacturing" [ref=e130] [cursor=pointer]:
                  - /url: /our-business/manufacturing
              - listitem [ref=e131]:
                - link "Natural Resources" [ref=e132] [cursor=pointer]:
                  - /url: /our-business/natural-resources
          - generic [ref=e135]:
            - heading "Find Us" [level=5] [ref=e136]
            - paragraph [ref=e137]:
              - link "The City Tower, 27th Floor Jl. M.H. Thamrin No 81 Menteng, Jakarta Pusat DKI Jakarta 10310 – Indonesia" [ref=e138] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/The+City+Tower/@-6.199216,106.8213135,17z/data=!4m12!1m6!3m5!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!2sThe+City+Tower!8m2!3d-6.1991991!4d106.8235192!3m4!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!8m2!3d-6.1991991!4d106.8235192
                - text: The City Tower, 27th Floor
                - text: Jl. M.H. Thamrin No 81
                - text: Menteng, Jakarta Pusat
                - text: DKI Jakarta 10310 – Indonesia
            - paragraph [ref=e139]:
              - 'link "Phone : +62 21 3101601" [ref=e140] [cursor=pointer]':
                - /url: tel:+62213101601
            - paragraph [ref=e141]:
              - 'link "Mail : contact@gesit.co.id" [ref=e142] [cursor=pointer]':
                - /url: mailto:contact@gesit.co.id
        - generic [ref=e147]:
          - link "Gesit Logo" [ref=e149] [cursor=pointer]:
            - /url: /
            - img "Gesit Logo" [ref=e150]
          - paragraph [ref=e153]: © 2026 THE GESIT COMPANIES. ALL RIGHTS RESERVED
      - navigation [ref=e157]:
        - list [ref=e158]:
          - listitem [ref=e159]:
            - link "Home" [ref=e160] [cursor=pointer]:
              - /url: /
          - listitem [ref=e161]:
            - link "About Us" [ref=e162] [cursor=pointer]:
              - /url: /about-us
          - listitem [ref=e163]:
            - link "Our Business" [ref=e164] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e165]:
            - link "CSR" [ref=e166] [cursor=pointer]:
              - /url: /csr
          - listitem [ref=e167]:
            - link "News" [ref=e168] [cursor=pointer]:
              - /url: /news
          - listitem [ref=e169]:
            - link "Career" [ref=e170] [cursor=pointer]:
              - /url: /career
          - listitem [ref=e171]:
            - link "Contact Us" [ref=e172] [cursor=pointer]:
              - /url: /contact-us
    - generic:
      - img
      - img
  - button "Open Next.js Dev Tools" [ref=e178] [cursor=pointer]:
    - img [ref=e179]
  - alert [ref=e182]
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