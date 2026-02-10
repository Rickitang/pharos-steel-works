# SEO Implementation Guide - Pharos Steel Works

## ✅ Task 3: Submit Sitemap to Google Search Console

### Step-by-Step Instructions:

1. **Access Google Search Console**
   - Go to: https://search.google.com/search-console
   - Sign in with your Google account

2. **Add Your Property**
   - Click "Add Property"
   - Enter: `https://pharossteelworks.co.za`
   - Choose verification method:
     - **Recommended:** HTML file upload
     - Download the verification file
     - Upload to your website root directory
     - Click "Verify"

3. **Submit Sitemap**
   - In the left sidebar, click "Sitemaps"
   - Enter: `sitemap.xml`
   - Click "Submit"
   
   **Your sitemap URL:** `https://pharossteelworks.co.za/sitemap.xml`

4. **Monitor Status**
   - Check back in 24-48 hours
   - Google will show:
     - Discovered URLs
     - Indexed pages
     - Any errors

### Alternative Verification Methods:
- **DNS record:** Add TXT record to your domain
- **Google Analytics:** Link existing GA account
- **Google Tag Manager:** Use existing GTM container

---

## ✅ Task 4: Compress Images for Better Load Speed

### Current Images to Optimize:

| Image File | Current Format | Recommended Action |
|------------|---------------|-------------------|
| logo.png | PNG | Convert to WebP, keep PNG fallback |
| fiber-laser-bg.jpg | JPG | Compress to 80% quality, convert to WebP |
| sheet-laser.jpg | JPG | Compress to 75% quality, resize to 400x300 |
| pipe-laser.jpg | JPG | Compress to 75% quality, resize to 400x300 |
| press-brake.jpg | JPG | Compress to 75% quality, resize to 400x300 |
| steel-roller.jpg | JPG | Compress to 75% quality, resize to 400x300 |
| cnc-welder.jpg | JPG | Compress to 75% quality, resize to 400x300 |
| powder-coating.jpg | JPG | Compress to 75% quality, resize to 400x300 |

### Compression Tools:

#### Online Tools (Free):
1. **TinyPNG** - https://tinypng.com/
   - Drag and drop your images
   - Download compressed versions
   - Supports JPG and PNG

2. **Squoosh** - https://squoosh.app/
   - Google's image compression tool
   - Convert to WebP format
   - Side-by-side comparison

3. **ImageOptim** (Mac) - https://imageoptim.com/
4. **FileOptimizer** (Windows) - https://nikkhokkho.sourceforge.io/static.php?page=FileOptimizer

#### Command Line (Advanced):
```bash
# Install ImageMagick
# Windows: choco install imagemagick
# Mac: brew install imagemagick

# Compress JPG images
magick mogrify -quality 75 -resize 400x300 images/*.jpg

# Convert to WebP
magick mogrify -format webp -quality 80 images/*.jpg
```

### Implementation Steps:

1. **Backup original images** (create `images/originals/` folder)

2. **Compress each image:**
   - Upload to TinyPNG
   - Download compressed version
   - Replace original file

3. **Create WebP versions:**
   - Upload to Squoosh
   - Select WebP format
   - Download as `.webp`
   - Keep original JPG as fallback

4. **Update HTML (optional - for WebP support):**
   ```html
   <picture>
     <source srcset="images/sheet-laser.webp" type="image/webp">
     <img src="images/sheet-laser.jpg" alt="...">
   </picture>
   ```

### Expected Results:
- **Current total:** ~2-3MB (estimated)
- **After compression:** ~500KB-800KB
- **Page load improvement:** 40-60% faster
- **Google PageSpeed score:** +15-20 points

---

## ✅ Task 5: Add Alt Text to All Images

### ✅ COMPLETED!

All images now have descriptive alt text optimized for SEO:

#### Header/Footer Logos:
- ✅ "Pharos Steel Works - Professional Metal Fabrication Services in Kempton Park"
- ✅ Added width/height attributes (80x80)
- ✅ Added decoding="async" for performance

#### Service Images:
- ✅ **Sheet Laser:** "Advanced sheet metal laser cutting machine - Pharos Steel Works Kempton Park"
- ✅ **Pipe Laser:** "Pipe and tube laser cutting machine for round, square and rectangular tubes"
- ✅ **Press Brake:** "NØRBERG 125T press brake for precision sheet metal bending up to 3000mm"
- ✅ **Steel Roller:** "4 roller steel rolling machine for accurate metal shaping and forming"
- ✅ **CNC Welder:** "High-precision CNC fiber laser welder for clean and accurate metal welding"
- ✅ **Powder Coating:** "Professional powder coating service in Black, Copper Vein, Silver Vein and Alum White"

#### SEO Improvements Added:
- ✅ Keyword-rich alt text (includes location, service, equipment details)
- ✅ Width and height attributes (prevents layout shift)
- ✅ `decoding="async"` attribute (improves rendering performance)
- ✅ Proper lazy loading on non-critical images
- ✅ Eager loading on above-the-fold logo

### Alt Text Best Practices Applied:

1. **Descriptive & Specific** - Describes what's in the image
2. **Keyword Integration** - Includes "Kempton Park", "laser cutting", service names
3. **Unique Text** - Each alt tag is different
4. **Concise** - Under 125 characters
5. **Context-Aware** - Relates to surrounding content

---

## Additional SEO Quick Wins

### 1. Update Meta Descriptions (Already Done ✅)
Your meta descriptions are optimized with keywords.

### 2. Check Mobile Responsiveness
```bash
# Test on Google Mobile-Friendly Test
# Visit: https://search.google.com/test/mobile-friendly
# Enter: https://pharossteelworks.co.za
```

### 3. Test Page Speed
```bash
# Google PageSpeed Insights
# Visit: https://pagespeed.web.dev/
# Enter: https://pharossteelworks.co.za
```

### 4. Monitor Rankings
- **Google Search Console:** Track impressions & clicks
- **Google Analytics:** Monitor organic traffic
- **Free tools:** 
  - SEMrush (limited free searches)
  - Ubersuggest (3 free searches/day)

### 5. Local SEO Checklist
- [ ] Claim Google Business Profile
- [ ] Add business to Maps
- [ ] Get 10+ customer reviews
- [ ] List on local directories:
  - Yellow Pages SA
  - Snupit
  - Brabys
  - Hotfrog South Africa
  - SEIFSA (South African Institute for Fabrication and Steel)

---

## Monitoring Your Progress

### Week 1:
- Submit to Google Search Console
- Compress images
- Get first 5 Google reviews

### Week 2-4:
- Monitor crawl errors in Search Console
- Check indexed pages
- Track keyword positions

### Month 2-3:
- Analyze traffic growth in GA4
- Identify top-performing keywords
- Create content around those keywords

### Month 4-6:
- Expect ranking improvements
- Organic traffic should increase 30-50%
- More quote requests from Google

---

## Need Help?

If you encounter issues:
1. Check Google Search Console Help: https://support.google.com/webmasters
2. Verify sitemap is accessible: https://pharossteelworks.co.za/sitemap.xml
3. Ensure robots.txt allows crawling: https://pharossteelworks.co.za/robots.txt

**Questions?** Contact your web developer or SEO specialist.
