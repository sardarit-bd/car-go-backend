# Express.js Backend Template

Reusable Node.js + Express.js backend starter with authentication, security, PostgreSQL, Prisma, validation, and Supabase.

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Prisma
* bcryptjs
* jsonwebtoken
* cors
* dotenv
* express-rate-limit
* helmet
* xss-clean
* Yup
* Supabase
* Nodemon

## Setup

### 1. Clone

```bash
git clone https://github.com/shahinsamiur/express_template.git
cd express_template
```

### 2. Install

```bash
npm install
```

### 3. Environment

```bash
cp .env.example .env
```

Update `.env` with your database, JWT, and Supabase credentials.

---

## Prisma Commands

### Format schema

```bash
npx prisma format
```

### Create migration

```bash
npx prisma migrate dev --name your_migration_name
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Push schema directly

```bash
npx prisma db push
```

### Open Prisma Studio

```bash
npx prisma studio
```

---

## Run

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

---

## Useful Workflow

After changing `schema.prisma`:

```bash
npx prisma format
npx prisma migrate dev --name your_migration_name
npx prisma generate
```

For quick database changes without a migration:

```bash
npx prisma db push
npx prisma generate
```

## Environment

Never commit:

```text
.env
```

Commit:

```text
.env.example
```

---

## Author

**Samiur Shahin**

GitHub: https://github.com/shahinsamiur
