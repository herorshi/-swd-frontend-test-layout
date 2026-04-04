# swd-frontend-test

แอปเว็บที่สร้างด้วย [Next.js](https://nextjs.org) (App Router) สำหรับจัดการเลย์เอาต์และรูปทรงแบบอินเทอร์แอคทีฟ รองรับภาษาไทยและอังกฤษ

## ความต้องการของระบบ

- **Node.js 20 ขึ้นไป** (แนะนำ LTS ล่าสุด)
- ตัวจัดการแพ็กเกจ: `npm`, `yarn`, `pnpm` หรือ `bun` ก็ได้

ตรวจสอบเวอร์ชัน:

```bash
node -v
```

## เทคโนโลยีหลัก

| รายการ | หมายเหตุ |
|--------|-----------|
| Next.js 14 | App Router, `src/app/` |
| React 18 | UI |
| TypeScript | |
| Ant Design 5 | คอมโพเนนต์ `Card`, `Row`, `Col`, `Select` ฯลฯ |
| i18next | สลับภาษา EN / TH |

## การติดตั้งและรัน

ติดตั้งแพ็กเกจ:

```bash
npm install
```

รันโหมดพัฒนา (เปิดที่ [http://localhost:3000](http://localhost:3000)):

```bash
npm run dev
```

สคริปต์อื่นที่มี:

| คำสั่ง | คำอธิบาย |
|--------|----------|
| `npm run build` | สร้าง production build |
| `npm run start` | รันเซิร์ฟเวอร์หลัง build |
| `npm run lint` | รัน ESLint |

## เส้นทาง (routing)

- หน้าหลักของแอปอยู่ที่ **`/layout`**
- การเข้า **`/`** หรือ path ที่ไม่ได้กำหนดไว้ จะถูกนำไปที่ **`/layout`** (ผ่าน `middleware` และ redirect ที่ root)

## โครงสร้างที่เกี่ยวข้อง (ย่อ)

- `src/app/layout/page.tsx` — หน้า UI หลัก
- `src/app/page.tsx` — redirect จาก `/` ไป `/layout`
- `src/middleware.ts` — จัดการ redirect ไป `/layout`
- `src/i18n/instance.ts` — ตั้งค่า i18next และข้อความแปล

## Deploy

Deploy ได้บน [Vercel](https://vercel.com) หรือแพลตฟอร์มที่รองรับ Node.js สำหรับ Next.js โดยตั้งค่า **Node 20+** ตามที่โปรเจกต์กำหนด

เอกสารเพิ่มเติม: [Next.js — Deploying](https://nextjs.org/docs/app/building-your-application/deploying)
