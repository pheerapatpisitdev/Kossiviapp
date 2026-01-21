# 🚀 คู่มือ Deploy โปรเจกต์ Kossivi

## 📋 ขั้นตอนการ Deploy บน Vercel

### ขั้นตอนที่ 1: เตรียมโปรเจกต์

✅ โปรเจกต์พร้อมแล้ว:
- Code อยู่ใน GitHub แล้ว
- Build ผ่านแล้ว (`npm run build`)
- Repository: `pheerapatpisitdev/Kossiviapp`

---

### ขั้นตอนที่ 2: Deploy บน Vercel

#### วิธีที่ 1: Deploy ผ่านเว็บไซต์ (แนะนำ - ง่ายที่สุด)

1. **ไปที่ [vercel.com](https://vercel.com)**
   - คลิก **"Sign Up"** หรือ **"Log In"**
   - เลือก **"Continue with GitHub"** (แนะนำ)

2. **สร้าง Project ใหม่**
   - คลิก **"Add New..."** → **"Project"**
   - เลือก repository **`Kossiviapp`**
   - คลิก **"Import"**

3. **ตั้งค่า Project**
   - **Framework Preset:** เลือก **`Vite`** (หรือ `Other` ก็ได้)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `dist` ⚠️ **สำคัญ!** (ต้องเปลี่ยนจาก default)
   - **Install Command:** `npm install` (default)

4. **Environment Variables** (ถ้ามี)
   - ถ้าใช้ Supabase หรือ API keys
   - เพิ่มในส่วน "Environment Variables"
   - ตัวอย่าง:
     ```
     VITE_SUPABASE_URL=your-url
     VITE_SUPABASE_ANON_KEY=your-key
     ```

5. **คลิก "Deploy"**
   - รอสักครู่ (ประมาณ 1-2 นาที)
   - ✅ ได้ URL ฟรีทันที เช่น `kossiviapp.vercel.app`

---

#### วิธีที่ 2: Deploy ผ่าน CLI

```bash
# ติดตั้ง Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 🌐 เพิ่ม Custom Domain (ถ้ามี)

### ขั้นตอนที่ 1: เพิ่ม Domain ใน Vercel

1. ไปที่ Project Dashboard
2. คลิก **"Settings"** → **"Domains"**
3. คลิก **"Add Domain"**
4. พิมพ์ชื่อโดเมน (เช่น `kossivi.com` หรือ `www.kossivi.com`)
5. คลิก **"Add"**

### ขั้นตอนที่ 2: ตั้งค่า DNS

Vercel จะแสดงคำแนะนำการตั้งค่า DNS:

#### สำหรับ Root Domain (example.com):

```
Type: A
Name: @
Value: 76.76.21.21
```

#### สำหรับ Subdomain (www.example.com):

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### ขั้นตอนที่ 3: รอ DNS Propagation

- ใช้เวลา 5-30 นาที
- SSL certificate จะถูกสร้างอัตโนมัติ

---

## 🔄 Auto Deploy

Vercel จะ deploy อัตโนมัติทุกครั้งที่คุณ:
- Push code ไปยัง GitHub
- Commit บน branch หลัก (main)

---

## ✅ Checklist ก่อน Deploy

- [x] Code อยู่ใน GitHub แล้ว
- [x] Build ผ่านแล้ว (`npm run build`)
- [ ] ตั้งค่า Output Directory เป็น `dist` (สำคัญ!)
- [ ] เพิ่ม Environment Variables (ถ้ามี)
- [ ] คลิก Deploy

---

## 🎉 หลังจาก Deploy สำเร็จ

คุณจะได้:
- ✅ Production URL: `https://kossiviapp.vercel.app`
- ✅ Preview URL สำหรับทุก commit
- ✅ SSL certificate ฟรี
- ✅ CDN อัตโนมัติ
- ✅ Auto deploy เมื่อ push code

---

## 🆘 ถ้ามีปัญหา

### Build ล้มเหลว
- ตรวจสอบว่า Output Directory เป็น `dist`
- ตรวจสอบ Build Logs ใน Vercel Dashboard

### 404 Error เมื่อ Refresh
- Vercel จะจัดการ routing อัตโนมัติสำหรับ SPA

### Environment Variables ไม่ทำงาน
- ตรวจสอบว่าใช้ prefix `VITE_` สำหรับ Vite
- Redeploy หลังจากเพิ่ม environment variables

---

## 📞 ต้องการความช่วยเหลือ?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
