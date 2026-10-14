# 🌐 Social App — Modern Social Media Platform

<div align="center">

![Social App Banner](src/assets/hero.png)

**A high-performance, modern, and responsive Social Media web application built with React 19, TypeScript, Tailwind CSS v4, and TanStack React Query.**

[![React](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-5.104.1-FF4154?style=for-the-badge&logo=react-query&logoColor=white)](https://tanstack.com/query)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[عرض الميزات](#-الميزات-الرئيسية--key-features) • [هيكل المشروع](#-هيكل-المشروع--project-structure) • [طريقة التشغيل](#-التثبيت-والتشغيل--getting-started) • [توثيق الـ API](#-توثيق-واجهة-البرمجة--api-integration)

</div>

---

## 📖 جدول المحتويات / Table of Contents

- [نظرة عامة (Overview)](#-نظرة-عامة--overview)
- [الميزات الرئيسية (Key Features)](#-الميزات-الرئيسية--key-features)
- [التقنيات المستخدمة (Tech Stack)](#-التقنيات-المستخدمة--tech-stack)
- [هيكل المشروع (Project Structure)](#-هيكل-المشروع--project-structure)
- [إدارة الحالة والبيانات (State Management & Data Flow)](#-إدارة-الحالة-والبيانات--state-management)
- [نظام المصادقة وحماية المسارات (Authentication & Security)](#-نظام-المصادقة-وحماية-المسارات--auth--routes)
- [توثيق واجهة البرمجة (API Endpoints & Integration)](#-توثيق-واجهة-البرمجة--api-integration)
- [النماذج والتحقق (Forms & Zod Schemas)](#-النماذج-والتحقق-من-البيانات--validation)
- [التثبيت والتشغيل (Getting Started)](#-التثبيت-والتشغيل--getting-started)
- [الأوامر المتاحة (Scripts)](#-الأوامر-المتاحة--available-scripts)
- [المطور والمساهمة (Author & License)](#-المطور--author)

---

## 🌟 نظرة عامة / Overview

**Social App** هو تطبيق تواصل اجتماعي حديث ومتكامل الواجهة الأمامية (Frontend-only Architecture)، مبني لتقديم تجربة مستخدم فائقة السرعة والسلاسة. يعتمد التطبيق على أحدث معايير الويب:
- بناء الواجهات باستخدام **React 19** وتوزيع الأنواع الصارم بـ **TypeScript**.
- تصميم عصري وجذاب يدعم **الوضع الليلي والفاتح (Dark/Light Mode)** بالكامل عبر متغيرات CSS مخصصة وإطار **Tailwind CSS v4**.
- إدارة استعلامات الخادم والتخزين المؤقت المتقدم عبر **TanStack React Query v5**.
- توافق كامل وتصميم متجاوب لجميع الشاشات (الهواتف الذكية، الأجهزة اللوحية، والشاشات العريضة).
- مراقبة حالة الاتصال بالإنترنت في الوقت الفعلي مع تنبيهات فورية للمستخدم.

---

## ✨ الميزات الرئيسية / Key Features

### 1. 🔐 نظام المصادقة وإدارة الحسابات (Authentication & Authorization)
- **إنشاء حساب جديد (`/register`)**: نموذج تسجيل متكامل يجمع الاسم، البريد الإلكتروني، كلمة المرور وتأكيدها، تاريخ الميلاد، والنوع، مع فحص فوري للبيانات عبر Zod.
- **تسجيل الدخول (`/login`)**: تسجيل الدخول الآمن وتخزين رمز الـ JWT في `localStorage`.
- **حماية المسارات (Route Guards)**:
  - `ProtectedRoute`: يمنع الزوار غير المسجلين من تصفح المحتوى الخاص ويعيد توجيههم لصفحة تسجيل الدخول.
  - `ProtectedRouteAuth`: يمنع المستخدم المسجل من دخول صفحات التسجيل والدخول مرة أخرى ويعيد توجيهه للصفحة الرئيسية.
- **تحديد هوية الناشر**: فك تشفير توكن JWT برمجياً (`getCurrentUserId`) لعرض خيارات التعديل والحذف فقط لصاحب المنشور أو التعليق.

### 2. 📝 المنشورات والمحتوى (Posts Feed)
- **إنشاء منشور جديد (`CreatePost`)**:
  - كتابة نصوص المنشور.
  - رفع صور مع دعم المعاينة المباشرة (Live Image Preview) وإمكانية إزالة الصورة قبل النشر.
  - منتقي إيموجي سريع (Quick Emoji Picker) لإثراء المحتوى.
  - فحص نوع وحجم الصورة وفقاً لـ Zod Schema.
- **استعراض المنشورات (`Posts`)**: عرض المنشورات مرتبة زمنياً من الأحدث إلى الأقدم مع تفاصيل الناشر وصورته ووقت النشر بنسق نسبي.
- **تعديل المنشورات (`UpdatePost`)**: نافذة منبثقة (Modal) لتعديل محتوى وصورة المنشور للمالك فقط.
- **حذف المنشورات**: تأكيد الحذف وتحديث واجهة المستخدم فوراً عبر إبطال الكاش (`queryClient.invalidateQueries`).
- **صفحة تفاصيل المنشور (`/post/:id`)**: عرض المنشور المستقل مع جميع تعليقاته.

### 3. 💬 التعليقات والتفاعل (Comments System)
- عرض التعليق الأبرز (Top Comment) مباشرة أسفل كل منشور في الصفحة الرئيسية.
- إمكانية إضافة تعليق جديد فورياً مع معالجة حالات التحميل.
- تعديل وحذف التعليقات الخاصة بالمستخدم مع حماية الملكية.
- إمكانية توسيع وعرض كل التعليقات الخاصة بالمنشور بضغطة زر.

### 4. 👤 الملف الشخصي (User Profile)
- استعراض بيانات الحساب الشخصي (الاسم، البريد الإلكتروني، تاريخ الانضمام، الصورة الرمزية).
- تبويب خاص يعرض منشورات المستخدم فقط (`My Posts`).
- محدد الصور الرمزية (`Avatars.tsx`) لتغيير الصورة الشخصية بسهولة.

### 5. 🔔 الإشعارات (Notifications Feed)
- صفحة مخصصة للإشعارات (`/notifications`) تعرض التفاعلات المختلفة (إعجابات، تعليقات، متابعة، ومشاركات).
- تمييز الإشعارات غير المقروءة بتصميم بصري مميز وحساب عددها.

### 6. 🎨 المظهر والتصميم (Theming & UX)
- **وضع ليلي وفاتح متكامل (Dark & Light Mode)**:
  - إدارة السمة عبر `ThemeContext`.
  - التعرف التلقائي على تفضيلات نظام التشغيل (`prefers-color-scheme`).
  - حفظ السمة المختارة في `localStorage` لمنع وميض الشاشة عند إعادة التحميل.
  - متغيرات CSS احترافية لكل مكون (`--surface-card`, `--text-primary`, `--navbar-bg`...).
- **مؤشر انقطاع الاتصال (Offline Detection)**:
  - مراقبة حالة الشبكة بواسطة `react-use`.
  - ظهور إشعار تفاعلي أنيق بمنتصف الشاشة عند انقطاع الإنترنت.
- **تحسين محركات البحث وعناوين الصفحات (SEO)**:
  - تحديث ديناميكي لعنوان وميتا كل صفحة باستخدام `react-helmet-async`.

---

## 🛠 التقنيات المستخدمة / Tech Stack

| المجال / فئة التقنية | التقنية / المكتبة | الوصف والغرض |
| :--- | :--- | :--- |
| **Core Framework** | [React 19](https://react.dev/) | مكتبة بناء واجهات المستخدم الأساسية بأعلى أداء |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | توفير بيئة عمل آمنة مع حماية من الأخطاء النوعية |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) | بيئة تطوير فائقة السرعة مع دعم Hot Module Replacement |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | إطار عمل لتنسيق الواجهات بمرونة عالية مع CSS Custom Properties |
| **Data Fetching & Cache** | [TanStack React Query v5](https://tanstack.com/query) | إدارة استعلامات الخادم، الـ Caching، والـ Invalidation |
| **Routing** | [React Router v7](https://reactrouter.com/) | توجيه متقدم للصفحات باستخدام Data Router API (`createBrowserRouter`) |
| **Forms & Validation** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) | إدارة استمارات الإدخال والتحقق الصارم من صحة الحقول |
| **HTTP Client** | [Axios](https://axios-http.com/) | إرسال الطلبات لـ REST APIs مع إرفاق JWT Bearer Tokens |
| **Icons** | [Lucide React](https://lucide.dev/) | حزمة أيقونات عصرية وخفيفة الوزن |
| **SEO & Head** | [react-helmet-async](https://github.com/staylor/react-helmet-async) | التحكم في وسم `<head>` وعناوين الصفحات |
| **Utility Hooks** | [react-use](https://github.com/streamich/react-use) | مراقبة حالة الإنترنت وحركات المتصفح |

---

## 📁 هيكل المشروع / Project Structure

```text
my-app/
├── public/                     # الملفات الثابتة (أيقونات، SVG)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                 # الصور والرسوميات الثابتة
│   │   ├── hero.png
│   │   └── react.svg
│   ├── Components/             # المكونات القابلة لإعادة الاستخدام
│   │   ├── Comment/            # مكونات التعليقات
│   │   │   ├── Comment.tsx
│   │   │   └── CreateComment.tsx
│   │   ├── Loading/            # مؤشر التحميل
│   │   │   └── Loading.tsx
│   │   ├── Notifications/      # صفحة ومكونات الإشعارات
│   │   │   └── Notifications.tsx
│   │   ├── Offline/            # تنبيه انقطاع الاتصال
│   │   │   └── Offline.tsx
│   │   ├── Posts/              # مكونات المنشورات
│   │   │   ├── CreatePost.tsx  # نموذج إنشاء منشور
│   │   │   ├── PostDetails.tsx # تفاصيل المنشور
│   │   │   ├── Posts.tsx       # بطاقة المنشور وتفاعلاته
│   │   │   └── UpdatePost.tsx  # نافذة تعديل المنشور
│   │   ├── About.tsx           # صفحة عن التطبيق
│   │   ├── Avatars.tsx         # منتقي الصور الرمزية
│   │   ├── Footer.tsx          # تذييل الصفحة
│   │   ├── Layout.tsx          # التخطيط العام (Navbar + Content + Footer)
│   │   ├── Login.tsx           # صفحة تسجيل الدخول
│   │   ├── Navbar.tsx          # شريط التنقل العلوي المتجاوب
│   │   ├── NotFound.tsx        # صفحة الخطأ 404
│   │   ├── Profile.tsx         # صفحة الملف الشخصي
│   │   ├── ProtectedRoute.tsx  # حماية المسارات الخاصة
│   │   ├── ProtectedRouteAuth.tsx # منع الدخول للمسجلين لصفحات Auth
│   │   ├── Register.tsx        # صفحة التسجيل
│   │   └── ThemeToggle.tsx     # زر التبديل بين الوضع الليلي والنهاري
│   ├── Context/                # سياقات إدارة الحالة العامة
│   │   ├── AuthContext.tsx     # إدارة حالة التوكن وتوثيق المستخدم
│   │   └── ThemeContext.tsx    # إدارة وضع الألوان (Dark/Light)
│   ├── Hooks/                  # خطافات مخصصة (Custom Hooks)
│   │   └── usePost.ts          # استعلام جلب المنشورات العامة عبر React Query
│   ├── Pages/                  # الصفحات الأساسية
│   │   ├── Contact.tsx         # صفحة تواصل معنا
│   │   ├── Home.tsx            # الصفحة الرئيسية (Feed)
│   │   └── Policy.tsx          # سياسة الخصوصية والاستخدام
│   ├── Schemas/                # مخططات التحقق من البيانات (Zod)
│   │   ├── auth.schema.ts      # فحص حقول الدخول والتسجيل
│   │   ├── comment.schema.ts   # فحص نص التعليق
│   │   └── post.schema.ts      # فحص محتوى وصورة المنشور
│   ├── Types/                  # واجهات TypeScript
│   │   ├── Comment.ts          # أنواع بيانات التعليقات
│   │   ├── Post.type.ts        # أنواع بيانات المنشورات
│   │   └── Profile.ts          # أنواع بيانات المستخدم
│   ├── utils/                  # وظائف مساعدة عامة
│   │   └── auth.ts             # قراءة وفك تشفير معرف المستخدم من JWT
│   ├── App.css                 # التنسيقات العامة
│   ├── App.tsx                 # تكوين المسارات ومزودات السياق (Providers)
│   ├── index.css               # متغيرات السمة وقواعد Tailwind الأساسية
│   └── main.tsx                # نقطة انطلاق التطبيق (Root entry point)
├── .gitignore                  # الملفات المستثناة من Git
├── eslint.config.js            # إعدادات فحص الكود (Linting)
├── index.html                  # قالب HTML الرئيسي
├── package.json                # التبعيات ومعلومات المشروع
├── tsconfig.json               # إعدادات TypeScript
└── vite.config.ts              # إعدادات Vite
```

---

## ⚡ إدارة الحالة والبيانات / State Management

يعتمد التطبيق على استراتيجية فصل ذكية بين حالتي البيانات:
1. **Server State (بيانات الخادم)**:
   - مدارة بالكامل عبر **TanStack React Query**.
   - توفير التخزين المؤقت (Caching)، وإعادة التحقق التلقائي في الخلفية (Background Revalidation).
   - تحديث واجهة المستخدم فورياً عبر تفعيل `queryClient.invalidateQueries` عند إنشاء منشور أو تعليق، أو عند حذفهما أو تعديلهما.
2. **Client / App State (بيانات العميل)**:
   - **`AuthContext`**: لتخزين رمز الدخول ومراقبة حالة تسجيل الدخول عبر التطبيق بالكامل.
   - **`ThemeContext`**: لإدارة وتخزين سمة الألوان ومزامنتها مع مستند HTML و `localStorage`.

---

## 🛡 نظام المصادقة وحماية المسارات / Auth & Routes

| المسار (Path) | الصفحة (Component) | نوع الحماية (Protection) | الوصف |
| :--- | :--- | :--- | :--- |
| `/` أو `/home` | `Home` | `ProtectedRoute` | الصفحة الرئيسية وجدار المنشورات |
| `/post/:id` | `PostDetails` | `ProtectedRoute` | صفحة تفاصيل منشور محدد مع تعليقاته |
| `/profile` | `Profile` | `ProtectedRoute` | الصفحة الشخصية للمستخدم ومنشوراته |
| `/notifications` | `Notifications` | `ProtectedRoute` | صفحة تنبيهات وتفاعلات المستخدم |
| `/about` | `About` | `ProtectedRoute` | معلومات عن الشبكة وقيمها |
| `/contact` | `Contact` | `ProtectedRoute` | نموذج التواصل والدعم الفني |
| `/policy` | `Policy` | `ProtectedRoute` | الشروط والأحكام وسياسة الخصوصية |
| `/login` | `Login` | `ProtectedRouteAuth` | تسجيل الدخول (محظورة على المسجلين مسبقاً) |
| `/register` | `Register` | `ProtectedRouteAuth` | إنشاء حساب جديد (محظورة على المسجلين مسبقاً) |
| `*` | `NotFound` | `ProtectedRoute` | صفحة الخطأ 404 للمسارات غير الموجودة |

---

## 🔌 توثيق واجهة البرمجة / API Integration

يعتمد التطبيق على استهلاك واجهات RESTful المقدمة من Route Posts API:
**Base URL:** `https://route-posts.routemisr.com`

### أهم الـ Endpoints المستهلكة:

- **المصادقة والمستخدمين (Auth & Users)**:
  - `POST /users/signup` — تسجيل حساب جديد.
  - `POST /users/signin` — تسجيل الدخول والحصول على Token.
  - `GET /users/profile-data` — جلب بيانات حساب المستخدم الحالي.
  - `GET /users/:userId/posts` — جلب كافة المنشورات الخاصة بمستخدم معين.
  - `PUT /users/upload-photo` — تحديث الصورة الشخصية للمستخدم.

- **المنشورات (Posts)**:
  - `GET /posts?sort=-createdAt` — جلب أحدث المنشورات.
  - `GET /posts/:id` — جلب تفاصيل منشور معين.
  - `POST /posts` — نشر منشور جديد (`multipart/form-data` مع نص وصورة).
  - `PUT /posts/:id` — تعديل منشور موجود.
  - `DELETE /posts/:id` — حذف منشور بواسطة مالكه.

- **التعليقات (Comments)**:
  - `GET /posts/:postId/comments` — جلب تعليقات منشور محدد.
  - `POST /posts/:postId/comments` — إضافة تعليق جديد.
  - `PUT /posts/:postId/comments/:commentId` — تعديل تعليق.
  - `DELETE /posts/:postId/comments/:commentId` — حذف تعليق.

> **ملاحظة أمنية**: يتم تمرير الـ Token تلقائياً في ترويسات الطلبات عبر:
> `headers: { token: userToken, Authorization: 'Bearer ' + userToken }`

---

## 📋 النماذج والتحقق من البيانات / Validation

تم تأمين كافة المدخلات باستخدام **Zod** بالتكامل مع **React Hook Form**:
- **`CreatePostSchema`**: فحص النص المطلوب، والتحقق من قيود الصورة (الامتدادات المسموحة: `image/jpeg`, `image/png`, `image/webp`, `image/gif` وبحد أقصى للحجم 5 ميجابايت).
- **`RegisterSchema`**: التأكد من صيغة البريد الإلكتروني، قوة كلمة المرور، وتطابق كلمتي المرور (Password Confirm)، والحد الأدنى للسن وتحديد النوع.
- **`LoginSchema`**: التأكد من إدخال البريد الإلكتروني بشكل صحيح وكلمة المرور قبل الإرسال.
- **`CommentSchema`**: التأكد من عدم إرسال تعليقات فارغة وحصر عدد الحروف.

---

## 🚀 التثبيت والتشغيل / Getting Started

### المتطلبات الأساسية (Prerequisites)
- [Node.js](https://nodejs.org/) (الإصدار 18 أو أحدث)
- مدير الحزم [npm](https://www.npmjs.com/) أو [yarn](https://yarnpkg.com/) أو [pnpm](https://pnpm.io/)

### خطوات التثبيت:

1. **استنساخ المستودع (Clone Repository)**:
   ```bash
   git clone https://github.com/salah-khaled-dev/social-app.git
   cd social-app
   ```

2. **تثبيت الحزم والتبعيات (Install Dependencies)**:
   ```bash
   npm install
   ```

3. **تشغيل خادم التطوير (Run Development Server)**:
   ```bash
   npm run dev
   ```
   سيتم تشغيل التطبيق محلياً على: [http://localhost:5173](http://localhost:5173)

4. **بناء النسخة الإنتاجية (Build for Production)**:
   ```bash
   npm run build
   ```

5. **معاينة النسخة الإنتاجية محلياً (Preview Build)**:
   ```bash
   npm run preview
   ```

---

## 📜 الأوامر المتاحة / Available Scripts

| الأمر | الوصف |
| :--- | :--- |
| `npm run dev` | تشغيل خادم التطوير المحلي مع خاصية التحديث الفوري (HMR) |
| `npm run build` | فحص الأنواع عبر TypeScript وبناء الملفات النهائية في مجلد `dist/` |
| `npm run lint` | فحص الكود البرمجي واكتشاف الأخطاء عبر ESLint |
| `npm run preview` | معاينة حزمة الإنتاج محلياً قبل النشر |

---

## 👨‍💻 المطور / Author

تم تطوير هذا المشروع بواسطة المهندس **صلاح خالد** (Salah Khaled).

- **GitHub**: [@salah-khaled-dev](https://github.com/salah-khaled-dev)
- **Repository**: [https://github.com/salah-khaled-dev/social-app](https://github.com/salah-khaled-dev/social-app)

---

## 📄 الترخيص / License

هذا المشروع مرخص بموجب رخصة [MIT](LICENSE) — يمكنك استخدامه وتعديله بحرية.
