# Review Analytics - Architecture Technique

## 🏗️ Vue d'ensemble Architecture

**Review Analytics** transforme les avis CSV en rapports PDF via une pipeline d'analyse IA. Architecture orientée **upload → analyse → paiement → téléchargement**.

---

## 📊 Flow Principal

```
Upload CSV → Validation & Parsing → Preview Données → Stripe Checkout 19€ 
→ Analyse IA Pipeline → Génération PDF → Stockage & Notification → Download Dashboard
```

---

## 🛠️ Stack Technique Détaillée

### **Frontend (Next.js 15)**
```
/src/app/
├── page.tsx                 # Landing + Upload interface
├── upload/
│   ├── page.tsx            # Drag & drop CSV upload  
│   └── preview.tsx         # Validation + preview data
├── checkout/
│   ├── page.tsx            # Stripe checkout integration
│   └── success.tsx         # Payment confirmation
├── dashboard/
│   ├── page.tsx            # User reports history
│   └── download/[id].tsx   # Secure download links
└── components/
    ├── FileUpload.tsx      # Drag & drop component
    ├── DataPreview.tsx     # CSV preview table
    └── StripeCheckout.tsx  # Payment component
```

### **Backend API Routes**
```
/src/app/api/
├── upload/
│   ├── validate/route.ts   # CSV validation & parsing
│   └── preview/route.ts    # Data preview generation
├── payment/
│   ├── checkout/route.ts   # Stripe session creation
│   └── webhook/route.ts    # Payment confirmation
├── analysis/
│   ├── sentiment/route.ts  # IA sentiment analysis
│   ├── keywords/route.ts   # Keyword extraction
│   └── insights/route.ts   # Business insights generation
├── reports/
│   ├── generate/route.ts   # PDF report creation
│   └── download/[id]/route.ts # Secure download
└── user/
    └── dashboard/route.ts  # User reports history
```

---

## 🗄️ Modèle de Données (Prisma)

### **Schema Database**
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  reports   Report[]
}

model Report {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  
  // Upload info
  originalFilename String
  csvData         Json     // Raw parsed CSV
  totalReviews    Int
  
  // Payment info  
  stripeSessionId String   @unique
  paymentStatus   PaymentStatus @default(PENDING)
  amountPaid      Int      // In cents (1900 = 19€)
  
  // Analysis results
  sentimentScore  Float?
  topKeywords     Json?
  painPoints      Json?
  insights        Json?
  
  // Report generation
  pdfUrl          String?
  reportStatus    ReportStatus @default(PROCESSING)
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model ReviewData {
  id          String   @id @default(cuid())
  reportId    String
  report      Report   @relation(fields: [reportId], references: [id])
  
  // Review data
  rating      Int
  content     String
  author      String?
  productName String?
  date        DateTime?
  
  // Analysis results
  sentiment   Float?   // -1 to 1
  keywords    Json?
  category    String?  // "delivery", "quality", "price", etc.
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

enum ReportStatus {
  PROCESSING
  COMPLETED
  FAILED
}
```

---

## 🤖 Pipeline d'Analyse IA

### **1. CSV Parsing & Validation**
```typescript
// Multi-format CSV parser
interface CSVFormat {
  judgeMe: {
    rating: 'rating' | 'score',
    content: 'body' | 'review_text',
    author: 'reviewer_name' | 'author',
    date: 'created_at' | 'date'
  },
  shopify: {
    rating: 'rating',
    content: 'body',
    author: 'author',
    date: 'created_at'
  },
  google: {
    rating: 'star_rating',
    content: 'text',
    author: 'reviewer_name',
    date: 'time_created'
  }
}
```

### **2. Sentiment Analysis (Groq)**
```typescript
async function analyzeSentiment(reviews: ReviewData[]) {
  const batches = chunk(reviews, 10); // Process by batches
  
  for (const batch of batches) {
    const prompt = `
    Analyze sentiment of these e-commerce reviews:
    ${batch.map(r => `"${r.content}" (${r.rating}★)`).join('\n')}
    
    Return JSON array: [{"sentiment": float(-1 to 1), "category": "delivery|quality|price|service"}]
    `;
    
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.1
    });
    
    // Parse and store results
  }
}
```

### **3. Business Insights Generation**
```typescript
async function generateInsights(analysisData: AnalysisData) {
  const prompt = `
  You are a business consultant analyzing e-commerce customer reviews.
  
  Data:
  - Total reviews: ${analysisData.totalReviews}
  - Average rating: ${analysisData.avgRating}/5
  - Sentiment distribution: ${JSON.stringify(analysisData.sentiments)}
  - Top complaint keywords: ${analysisData.negativeKeywords.join(', ')}
  - Top praise keywords: ${analysisData.positiveKeywords.join(', ')}
  
  Generate actionable business recommendations in JSON:
  {
    "executive_summary": "Brief 2-3 sentence overview of review analysis",
    "top_pain_points": [
      {"issue": "delivery delays", "percentage": 15, "urgency": "high"},
      {"issue": "product quality", "percentage": 12, "urgency": "medium"}
    ],
    "quick_wins": [
      "Update product descriptions to set proper expectations",
      "Add FAQ section addressing common concerns"
    ],
    "long_term_strategy": [
      "Implement quality control process",
      "Partner with faster delivery service"
    ]
  }
  
  Be specific and actionable. Focus on what the business owner can implement.
  `;
  
  return await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });
}
```

---

## 📄 Génération PDF (Puppeteer)

### **Template HTML Rapport**
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: 'Arial', sans-serif; margin: 0; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 20px; }
    .metric-box { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 5px; }
    .chart { width: 100%; height: 200px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Review Analytics Report</h1>
    <p>Generated on {{date}} • {{totalReviews}} reviews analyzed</p>
  </div>
  
  <div class="page">
    <h2>Executive Summary</h2>
    <p>{{executiveSummary}}</p>
    
    <div class="metrics">
      <div class="metric-box">
        <h3>Overall Rating: {{avgRating}}/5</h3>
        <p>Sentiment Score: {{sentimentScore}}</p>
      </div>
    </div>
  </div>
  
  <div class="page">
    <h2>Top Pain Points</h2>
    {{#each painPoints}}
      <div class="metric-box">
        <h4>{{issue}} ({{percentage}}% of reviews)</h4>
        <p>Urgency: {{urgency}}</p>
      </div>
    {{/each}}
  </div>
  
  <div class="page">
    <h2>Recommended Actions</h2>
    <h3>Quick Wins</h3>
    <ul>
      {{#each quickWins}}
        <li>{{this}}</li>
      {{/each}}
    </ul>
    
    <h3>Long-term Strategy</h3>
    <ul>
      {{#each longTermStrategy}}
        <li>{{this}}</li>
      {{/each}}
    </ul>
  </div>
</body>
</html>
```

### **PDF Generator**
```typescript
import puppeteer from 'puppeteer';

async function generatePDF(reportData: ReportData) {
  const html = Handlebars.compile(templateHTML)(reportData);
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '1cm', bottom: '1cm', left: '1cm', right: '1cm' }
  });
  
  await browser.close();
  
  // Upload to Supabase Storage
  const fileName = `report-${reportData.id}-${Date.now()}.pdf`;
  const { data, error } = await supabase.storage
    .from('reports')
    .upload(fileName, pdf, {
      contentType: 'application/pdf',
      cacheControl: '3600'
    });
  
  if (error) throw error;
  
  return supabase.storage.from('reports').getPublicUrl(fileName).data.publicUrl;
}
```

---

## 💳 Intégration Stripe

### **Checkout Session Creation**
```typescript
export async function POST(req: Request) {
  const { reportId, userEmail } = await req.json();
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: userEmail,
    line_items: [{
      price_data: {
        currency: 'eur',
        product_data: {
          name: 'Review Analytics Report',
          description: 'AI-powered business insights from customer reviews',
          images: ['https://your-domain.com/report-preview.png']
        },
        unit_amount: 1900, // 19€ in cents
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/upload?cancelled=true`,
    metadata: {
      reportId: reportId,
      userEmail: userEmail
    }
  });
  
  return NextResponse.json({ 
    sessionId: session.id,
    url: session.url 
  });
}
```

### **Webhook Payment Processing**
```typescript
export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }
  
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const reportId = session.metadata?.reportId;
    
    if (reportId) {
      // Update payment status
      await prisma.report.update({
        where: { id: reportId },
        data: { 
          paymentStatus: 'COMPLETED',
          stripeSessionId: session.id,
          amountPaid: session.amount_total || 1900
        }
      });
      
      // Trigger report generation pipeline
      await generateReportPipeline(reportId);
      
      // Send confirmation email
      await sendPaymentConfirmationEmail(session.customer_email, reportId);
    }
  }
  
  return NextResponse.json({ received: true });
}
```

---

## 🔐 Sécurité & Performance

### **Sécurité Upload**
```typescript
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_MIME_TYPES = ['text/csv', 'application/vnd.ms-excel'];

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('csv') as File;
  
  // Validation taille
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
  }
  
  // Validation type MIME
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }
  
  // Rate limiting (5 uploads per minute par IP)
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  const rateLimited = await checkRateLimit(ip, 5, 60);
  
  if (rateLimited) {
    return NextResponse.json({ error: 'Too many uploads, try again later' }, { status: 429 });
  }
  
  // Parsing sécurisé
  const csvText = await file.text();
  const sanitizedCsv = sanitizeCSVContent(csvText);
  const parsedData = parseCSV(sanitizedCsv);
  
  return NextResponse.json({ success: true, preview: parsedData.slice(0, 10) });
}
```

### **Variables d'environnement Production**
```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/reviewanalytics
DIRECT_URL=postgresql://user:pass@host:5432/reviewanalytics

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# AI
GROQ_API_KEY=gsk_...

# Storage
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...

# App
NEXT_PUBLIC_URL=https://reviewanalytics.com
NEXTAUTH_SECRET=super-secret-key-min-32-chars
```

Cette architecture garantit **scalabilité**, **sécurité** et **performance** pour le MVP Review Analytics avec objectif de 19€/rapport.