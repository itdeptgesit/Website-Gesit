# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation.spec.js >> Global Navigation & Route Accessibility >> should navigate to Property and display brand logo
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
    8 × locator resolved to 0 elements
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
          - img "Property 1" [ref=e32]
          - generic:
            - img "Property 2"
          - generic:
            - img "Property 3"
        - generic: Property
        - generic [ref=e33]:
          - button [ref=e34] [cursor=pointer]:
            - img [ref=e35]
          - button [ref=e37] [cursor=pointer]:
            - img [ref=e38]
      - main [ref=e40]:
        - generic [ref=e43]:
          - generic [ref=e47]:
            - heading "Creating value-adding and sustainable assets to our communities and partnering with leading multinational corporations." [level=3] [ref=e48]
            - generic [ref=e49]: The Gesit Companies' property portfolio is historically centered within Jakarta's Golden Triangle and is focused on commercial real estate development.
          - generic [ref=e51]:
            - generic [ref=e53]:
              - heading "Trinity Tower" [level=2] [ref=e54]
              - paragraph [ref=e55]:
                - text: Completed in 2021, the Trinity Tower is a Premium Grade A office tower constructed by Shimizu Construction located in the heart of Jakarta's Golden Triangle. It spans over 50 floors with a total of 140,000m
                - superscript [ref=e56]: "2"
                - text: in built up area. It has a separate 9-floor structure for food, retail, and tenant parking facility
              - generic [ref=e57]:
                - 'heading "Location : Jakarta, Indonesia" [level=6] [ref=e58]'
                - paragraph [ref=e59]: "Property Type : Office and Multifunction Area"
              - link "Learn More about Trinity Tower" [ref=e61] [cursor=pointer]:
                - /url: https://trinitytower.co.id/
                - text: Learn More
                - generic [ref=e62]: about Trinity Tower
            - generic [ref=e65]:
              - img "Trinity Tower" [ref=e67]
              - img "Trinity Tower" [ref=e69]
              - img "Trinity Tower" [ref=e71]
              - img "Trinity Tower" [ref=e73]
              - img "Trinity Tower" [ref=e75]
              - img "Trinity Tower" [ref=e77]
          - generic [ref=e79]:
            - generic [ref=e82]:
              - img "JS Luwansa" [ref=e84]
              - img "JS Luwansa" [ref=e86]
            - generic [ref=e88]:
              - heading "JS Luwansa" [level=2] [ref=e89]
              - paragraph [ref=e90]: JS Luwansa Hotel and Convention Center is located in Jakarta's Golden Triangle, Jakarta's fastest growing and exclusive business district. Conveniently located in close proximity to major embassies, shopping malls and the toll way. JS Luwansa Hotel and Convention Center is the perfect place for discerning business travelers who need a strategic base to support their business activities from a location within close proximity to the rest of Jakarta.
              - generic [ref=e91]:
                - 'heading "Location : Jakarta, Indonesia" [level=6] [ref=e92]'
                - paragraph [ref=e93]: "Property Type : Hotel"
              - link "Learn More about JS Luwansa" [ref=e95] [cursor=pointer]:
                - /url: https://www.jsluwansa.com/
                - text: Learn More
                - generic [ref=e96]: about JS Luwansa
          - generic [ref=e98]:
            - generic [ref=e100]:
              - heading "PPHUI Building & Usmar Ismail Hall" [level=2] [ref=e101]
              - paragraph [ref=e102]:
                - text: Usmar Ismail Hall is an important part of the PPHUI building, which includes a 6,400 m
                - superscript [ref=e103]: "2"
                - text: office space and state of the art cinema and concert hall located in CBD Jakarta. The Usmar Ismail Concert Hall has been designed with an exclusive interior, comfortable seating arrangement and modern lighting. The design concept ensures the ultimate enjoyment experience for the audience of each presented program. This is the first Integrated Cinema and Concert Hall in Indonesia.
              - generic [ref=e104]:
                - 'heading "Location : Jakarta, Indonesia" [level=6] [ref=e105]'
                - paragraph [ref=e106]: "Property Type : Office Space & Concert Hall"
              - link "Learn More about PPHUI" [ref=e108] [cursor=pointer]:
                - /url: mailto:fitri@gesit.co.id
                - text: Learn More
                - generic [ref=e109]: about PPHUI
            - generic [ref=e112]:
              - img "PPHUI" [ref=e114]
              - img "PPHUI" [ref=e116]
          - generic [ref=e118]:
            - img "Senayan Development" [ref=e121]
            - generic [ref=e123]:
              - heading "Senayan Development" [level=2] [ref=e124]
              - heading "Under Development" [level=2] [ref=e125]
              - paragraph [ref=e126]:
                - text: This development boasts a world-class international standard and comprises over 180 rooms with 1,500 m
                - superscript [ref=e127]: "2"
                - text: of multifunction & ballroom space.
              - generic [ref=e128]:
                - 'heading "Location : Jakarta, Indonesia" [level=6] [ref=e129]'
                - paragraph [ref=e130]: "Project Type : Tower Building"
          - generic [ref=e132]:
            - generic [ref=e134]:
              - heading "TOD Rasuna Development" [level=2] [ref=e135]
              - heading "Under Development" [level=2] [ref=e136]
              - paragraph [ref=e137]: This TOD development within inner Jakarta's Golden Triangle will combine retail, residential, and a world-class theater space together into one – enabling ease of mobility for tenants and reducing on-street traffic.
              - generic [ref=e138]:
                - 'heading "Location : Jakarta, Indonesia" [level=6] [ref=e139]'
                - paragraph [ref=e140]: "Project Type : Tower Building"
            - img "TOD Rasuna" [ref=e143]
    - generic [ref=e144]:
      - contentinfo [ref=e145]:
        - generic [ref=e149]:
          - generic [ref=e151]:
            - heading "Company Links" [level=5] [ref=e152]
            - list [ref=e154]:
              - listitem [ref=e155]:
                - link "Home" [ref=e156] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e157]:
                - link "About Us" [ref=e158] [cursor=pointer]:
                  - /url: /about-us
              - listitem [ref=e159]:
                - link "CSR" [ref=e160] [cursor=pointer]:
                  - /url: /csr
              - listitem [ref=e161]:
                - link "News" [ref=e162] [cursor=pointer]:
                  - /url: /news
              - listitem [ref=e163]:
                - link "Career" [ref=e164] [cursor=pointer]:
                  - /url: /career
          - generic [ref=e166]:
            - heading "Our Business" [level=5] [ref=e167]
            - list [ref=e169]:
              - listitem [ref=e170]:
                - link "Property" [ref=e171] [cursor=pointer]:
                  - /url: /our-business/property
              - listitem [ref=e172]:
                - link "Trading & Services" [ref=e173] [cursor=pointer]:
                  - /url: /our-business/trading-services
              - listitem [ref=e174]:
                - link "Manufacturing" [ref=e175] [cursor=pointer]:
                  - /url: /our-business/manufacturing
              - listitem [ref=e176]:
                - link "Natural Resources" [ref=e177] [cursor=pointer]:
                  - /url: /our-business/natural-resources
          - generic [ref=e180]:
            - heading "Find Us" [level=5] [ref=e181]
            - paragraph [ref=e182]:
              - link "The City Tower, 27th Floor Jl. M.H. Thamrin No 81 Menteng, Jakarta Pusat DKI Jakarta 10310 – Indonesia" [ref=e183] [cursor=pointer]:
                - /url: https://www.google.com/maps/place/The+City+Tower/@-6.199216,106.8213135,17z/data=!4m12!1m6!3m5!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!2sThe+City+Tower!8m2!3d-6.1991991!4d106.8235192!3m4!1s0x2e69f41f2b24b18b:0xb5cb3eba60efb71e!8m2!3d-6.1991991!4d106.8235192
                - text: The City Tower, 27th Floor
                - text: Jl. M.H. Thamrin No 81
                - text: Menteng, Jakarta Pusat
                - text: DKI Jakarta 10310 – Indonesia
            - paragraph [ref=e184]:
              - 'link "Phone : +62 21 3101601" [ref=e185] [cursor=pointer]':
                - /url: tel:+62213101601
            - paragraph [ref=e186]:
              - 'link "Mail : contact@gesit.co.id" [ref=e187] [cursor=pointer]':
                - /url: mailto:contact@gesit.co.id
        - generic [ref=e192]:
          - link "Gesit Logo" [ref=e194] [cursor=pointer]:
            - /url: /
            - img "Gesit Logo" [ref=e195]
          - paragraph [ref=e198]: © 2026 THE GESIT COMPANIES. ALL RIGHTS RESERVED
      - navigation [ref=e202]:
        - list [ref=e203]:
          - listitem [ref=e204]:
            - link "Home" [ref=e205] [cursor=pointer]:
              - /url: /
          - listitem [ref=e206]:
            - link "About Us" [ref=e207] [cursor=pointer]:
              - /url: /about-us
          - listitem [ref=e208]:
            - link "Our Business" [ref=e209] [cursor=pointer]:
              - /url: "#"
          - listitem [ref=e210]:
            - link "CSR" [ref=e211] [cursor=pointer]:
              - /url: /csr
          - listitem [ref=e212]:
            - link "News" [ref=e213] [cursor=pointer]:
              - /url: /news
          - listitem [ref=e214]:
            - link "Career" [ref=e215] [cursor=pointer]:
              - /url: /career
          - listitem [ref=e216]:
            - link "Contact Us" [ref=e217] [cursor=pointer]:
              - /url: /contact-us
    - generic:
      - img
      - img
  - button "Open Next.js Dev Tools" [ref=e223] [cursor=pointer]:
    - img [ref=e224]
  - alert [ref=e227]
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