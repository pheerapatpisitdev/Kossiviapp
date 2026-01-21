# 🚀 คู่มือ Deploy บน Vercel สำหรับ Kossivi Cocktail

## 📋 ขั้นตอนการ Deploy

### วิธีที่ 1: Deploy ผ่านเว็บไซต์ (แนะนำ - ง่ายที่สุด)

#### ขั้นตอนที่ 1: เตรียมโปรเจกต์บน GitHub

1. **สร้าง GitHub Repository** (ถ้ายังไม่มี)
   ```bash
   # ตรวจสอบว่าเป็น git repo หรือยัง
   git status
   
   # ถ้ายังไม่ใช่ git repo
   git init
   git add .
   git commit -m "Initial commit"
   
   # สร้าง repo บน GitHub แล้ว push
   git remote add origin https://github.com/yourusername/kossivi-cocktail.git
   git branch -M main
   git push -u origin main
   ```

#### ขั้นตอนที่ 2: Deploy บน Vercel

1. **ไปที่ [vercel.com](https://vercel.com)**
   - คลิก "Sign Up" หรือ "Log In"
   - เลือก "Continue with GitHub" (แนะนำ)

2. **สร้าง Project ใหม่**
   - คลิก "Add New..." > "Project"
   - เลือก repository `kossivi-cocktail`
   - คลิก "Import"

3. **ตั้งค่า Project**
   - **Framework Preset**: Vercel จะ detect อัตโนมัติว่าเป็น Vite
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `dist` (default)
   - **Install Command**: `npm install` (default)

4. **Environment Variables** (ถ้ามี)
   - ถ้าใช้ Supabase หรือ API keys อื่นๆ
   - เพิ่มในส่วน "Environment Variables"
   - ตัวอย่าง:
     ```
     VITE_SUPABASE_URL=your-url
     VITE_SUPABASE_ANON_KEY=your-key
     ```

5. **คลิก "Deploy"**
   - รอสักครู่ (ประมาณ 1-2 นาที)
   - ✅ ได้ URL ฟรีทันที เช่น `kossivi-cocktail.vercel.app`

---

### วิธีที่ 2: Deploy ผ่าน CLI (สำหรับผู้ที่ชอบใช้ Terminal)

#### ขั้นตอนที่ 1: ติดตั้ง Vercel CLI

```bash
npm install -g vercel
```

#### ขั้นตอนที่ 2: Login

```bash
vercel login
```

#### ขั้นตอนที่ 3: Deploy

```bash
# Deploy สำหรับ preview (development)
vercel

# Deploy สำหรับ production
vercel --prod
```

#### ขั้นตอนที่ 4: เพิ่ม Environment Variables (ถ้ามี)

```bash
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
```

---

## 🌐 เพิ่ม Custom Domain

### ขั้นตอนที่ 1: เพิ่ม Domain ใน Vercel

1. ไปที่ Project Dashboard
2. คลิก "Settings" > "Domains"
3. คลิก "Add Domain"
4. พิมพ์ชื่อโดเมน (เช่น `kossivi.com` หรือ `www.kossivi.com`)
5. คลิก "Add"

### ขั้นตอนที่ 2: ตั้งค่า DNS

Vercel จะแสดงคำแนะนำการตั้งค่า DNS ให้คุณ:

#### สำหรับ Root Domain (example.com):

**Option A: ใช้ A Records (แนะนำ)**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: Auto
```

**Option B: ใช้ CNAME (ถ้า DNS provider รองรับ)**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
TTL: Auto
```

#### สำหรับ Subdomain (www.example.com):

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto
```

### ขั้นตอนที่ 3: รอ DNS Propagation

- ใช้เวลา 5-30 นาที (บางครั้งอาจนานถึง 24 ชั่วโมง)
- ตรวจสอบได้ที่ [whatsmydns.net](https://www.whatsmydns.net)

### ขั้นตอนที่ 4: SSL Certificate

- Vercel จะออก SSL certificate ฟรีอัตโนมัติ
- ใช้เวลา 1-2 นาทีหลังจาก DNS propagate แล้ว
- ตรวจสอบได้ที่ Project Settings > Domains

---

## 🔄 Auto Deploy (Deploy อัตโนมัติ)

Vercel จะ deploy อัตโนมัติทุกครั้งที่คุณ:

1. **Push code ไปยัง GitHub**
   ```bash
   git add .
   git commit -m "Update features"
   git push
   ```
   - Vercel จะ detect การเปลี่ยนแปลงอัตโนมัติ
   - สร้าง preview deployment สำหรับทุก commit
   - Production deployment สำหรับ commits บน branch หลัก

2. **ตั้งค่า Branch Protection (Optional)**
   - Settings > Git
   - เลือก branch ที่จะ deploy เป็น production
   - ตั้งค่า Production Branch (default: `main` หรือ `master`)

---

## 📁 โครงสร้างไฟล์ที่สำคัญ

```
Kossivi/
├── vercel.json          # Vercel configuration (optional)
├── package.json         # Dependencies และ scripts
├── vite.config.ts       # Vite configuration
├── dist/                # Build output (จะถูกสร้างเมื่อ build)
└── src/                 # Source code
```

---

## ⚙️ การตั้งค่าเพิ่มเติม

### 1. Environment Variables

ถ้าต้องการใช้ environment variables:

**ใน Vercel Dashboard:**
- Settings > Environment Variables
- เพิ่มตัวแปรสำหรับ:
  - Production
  - Preview
  - Development

**ตัวอย่าง:**
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. Build Settings

ถ้าต้องการแก้ไข build settings:
- Settings > General > Build & Development Settings
- หรือแก้ไขใน `vercel.json`

### 3. Headers และ Redirects

เพิ่มใน `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

---

## 🐛 แก้ไขปัญหา

### Build ล้มเหลว

1. **ตรวจสอบ Build Logs**
   - ไปที่ Deployments
   - คลิกที่ deployment ที่ล้มเหลว
   - ดู error messages

2. **ทดสอบ Build ในเครื่อง**
   ```bash
   npm run build
   ```

3. **ตรวจสอบ Dependencies**
   ```bash
   npm install
   ```

### 404 Error เมื่อ Refresh หน้า

- ไฟล์ `vercel.json` ที่สร้างไว้แล้วจะแก้ปัญหานี้
- Vercel จะ redirect ทุก path ไปยัง `/index.html`

### Environment Variables ไม่ทำงาน

1. ตรวจสอบว่าใช้ prefix `VITE_` สำหรับ Vite
2. Redeploy หลังจากเพิ่ม environment variables
3. ตรวจสอบว่าเลือก environment ที่ถูกต้อง (Production/Preview)

---

## 📊 Monitoring และ Analytics

### Vercel Analytics (ฟรี)

1. Settings > Analytics
2. Enable Vercel Analytics
3. ดูข้อมูล visitors, page views, และ performance

### Speed Insights

1. Settings > Speed Insights
2. Enable Speed Insights
3. ดู Core Web Vitals และ performance metrics

---

## 💰 Pricing

### Free Plan (Hobby)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains ฟรี
- ✅ SSL ฟรี
- ✅ Preview deployments
- ✅ จำกัด: 100 builds/day

### Pro Plan ($20/เดือน)
- ทุกอย่างใน Free Plan
- ✅ Unlimited builds
- ✅ Team collaboration
- ✅ Advanced analytics

---

## ✅ Checklist ก่อน Deploy

- [ ] ทดสอบ build ในเครื่อง: `npm run build`
- [ ] ตรวจสอบว่า `dist/` folder ถูกสร้าง
- [ ] Push code ไปยัง GitHub
- [ ] ตั้งค่า Environment Variables (ถ้ามี)
- [ ] ตรวจสอบ Supabase CORS settings (ถ้าใช้ Supabase)
- [ ] ทดสอบ preview deployment
- [ ] เพิ่ม custom domain (ถ้ามี)

---

## 🎉 เสร็จแล้ว!

หลังจาก deploy สำเร็จ คุณจะได้:
- ✅ Production URL: `https://kossivi-cocktail.vercel.app`
- ✅ Preview URL สำหรับทุก commit
- ✅ SSL certificate ฟรี
- ✅ CDN อัตโนมัติ
- ✅ Auto deploy เมื่อ push code

---

## 📞 ต้องการความช่วยเหลือ?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Vercel Support](https://vercel.com/support)
