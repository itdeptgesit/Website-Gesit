# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> Global Navigation & Route Accessibility >> should navigate to Trading & Services and display brand logo
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
    - generic [ref=e25]:
      - generic [ref=e26]:
        - generic [ref=e30]:
          - img "Trading 1" [ref=e32]
          - generic:
            - img "Trading 2"
          - generic:
            - img "Trading 3"
        - generic: Trading & Services
        - generic [ref=e33]:
          - button [ref=e34] [cursor=pointer]:
            - img [ref=e35]
          - button [ref=e37] [cursor=pointer]:
            - img [ref=e38]
      - main [ref=e40]:
        - generic [ref=e43]:
          - generic [ref=e47]:
            - heading "Leveraging local Indonesian expertise and broad international network to source and deliver high-quality products." [level=3] [ref=e48]
            - generic [ref=e49]: The Gesit Companies have been trading commodities along the aluminum value chain and providing agency services used by banks and other consumers for over 30 years.
          - generic [ref=e51]:
            - generic [ref=e53]:
              - heading "Trading" [level=2] [ref=e54]
              - paragraph [ref=e55]: The Gesit Companies has been in this business for over 30 years. We source and deliver a variety of products including Bauxite, Alumina, Calcinated Petroleum Coke, Aluminum Ingots, to domestic and international markets — Indonesia, China, South America and the Middle East.
            - generic [ref=e57]:
              - img "Trading 0" [ref=e59]
              - img "Trading 1" [ref=e61]
          - generic [ref=e63]:
            - generic [ref=e65]:
              - img "Agency 0" [ref=e67]
              - img "Agency 1" [ref=e69]
              - img "Agency 2" [ref=e71]
            - generic [ref=e73]:
              - heading "Agency Services" [level=2] [ref=e74]
              - paragraph [ref=e75]: For over two decades, this division has provided its agency services to support the supply and distribution of products and technology used by banks and other consumers. Representative products include special currency paper and coins, high security technology to identify brand and documents, and disposal machines.
    - generic [ref=e76]:
      - contentinfo [ref=e77]:
        - generic [ref=e81]:
          - generic [ref=e83]:
            - heading "Company Links" [level=5] [ref=e84]
            - list [ref=e86]:
              - listitem [ref=e87]:
                - link "Home" [ref=e88] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e89]:
                - link "About Us" [ref=e90] [cursor=pointer]:
                  - /url: /about-us
              - listitem [ref=e91]:
                - link "CSR" [ref=e92] [cursor=pointer]:
                  - /url: /csr
              - listitem [ref=e93]:
                - link "News" [ref=e94] [cursor=pointer]:
                  - /url: /news
              - listitem [ref=e95]:
                - link "Career" [ref=e96] [cursor=pointer]:
                  - /url: /career
          - generic [ref=e98]:
            - heading "Our Business" [level=5] [ref=e99]
            - list [ref=e101]:
              - listitem [ref=e102]:
                - link "Property" [ref=e103] [cursor=pointer]:
                  - /url: /our-business/property
              - listitem [ref=e104]:
                - link "Trading & Services" [ref=e105] [cursor=pointer]:
                  - /url: /our-business/trading-services
              - listitem [ref=e106]:
                - link "Manufacturing" [ref=e107] [cursor=pointer]:
                  - /url: /our-business/manufacturing
              - listitem [ref=e108]:
                - link "Natural Resources" [ref=e109] [cursor=pointer]:
                  - /url: /our-business/natural-resources
          - generic [ref=e112]:
            - heading "Find Us" [level=5] [ref=e113]
            - paragraph [ref=e114]:
              - link "The City Tower, 27th Floor Jl. M.H. Thamrin No 81 Menteng, Jakarta Pusat DKI Jakarta 10310 – Indonesia" [ref=e115] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/The+City+Tower/@-6.199216,106.8213135,17z/data=!4m12!1m6!3m5!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!2sThe+City+Tower!8m2!3d-6.1991991!4d106.8235192!3m4!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!8m2!3d-6.1991991!4d106.8235192
                - text: The City Tower, 27th Floor
                - text: Jl. M.H. Thamrin No 81
                - text: Menteng, Jakarta Pusat
                - text: DKI Jakarta 10310 – Indonesia
            - paragraph [ref=e116]:
              - 'link "Phone : +62 21 3101601" [ref=e117] [cursor=pointer]':
                - /url: tel:+62213101601
            - paragraph [ref=e118]:
              - 'link "Mail : contact@gesit.co.id" [ref=e119] [cursor=pointer]':
                - /url: mailto:contact@gesit.co.id
        - generic [ref=e124]:
          - link "Gesit Logo" [ref=e126] [cursor=pointer]:
            - /url: /
            - img "Gesit Logo" [ref=e127]
          - paragraph [ref=e130]: © 2026 THE GESIT COMPANIES. ALL RIGHTS RESERVED
      - navigation [ref=e134]:
        - list [ref=e135]:
          - listitem [ref=e136]:
            - link "Home" [ref=e137] [cursor=pointer]:
              - /url: /
          - listitem [ref=e138]:
            - link "About Us" [ref=e139] [cursor=pointer]:
              - /url: /about-us
          - listitem [ref=e140]:
            - link "Our Business" [ref=e141] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e142]:
            - link "CSR" [ref=e143] [cursor=pointer]:
              - /url: /csr
          - listitem [ref=e144]:
            - link "News" [ref=e145] [cursor=pointer]:
              - /url: /news
          - listitem [ref=e146]:
            - link "Career" [ref=e147] [cursor=pointer]:
              - /url: /career
          - listitem [ref=e148]:
            - link "Contact Us" [ref=e149] [cursor=pointer]:
              - /url: /contact-us
    - generic:
      - img
      - img
  - button "Open Next.js Dev Tools" [ref=e155] [cursor=pointer]:
    - img [ref=e156]
  - alert [ref=e159]
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