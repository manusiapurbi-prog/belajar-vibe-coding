# Belajar Vibe Coding - Bun + ElysiaJS + Drizzle + MySQL

Proyek backend modern yang dibangun dengan **Bun**, **ElysiaJS**, **Drizzle ORM**, dan **MySQL**.

## 🚀 Fitur Utama

- **Runtime:** [Bun](https://bun.sh)
- **Web Framework:** [ElysiaJS](https://elysiajs.com)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team)
- **Database:** MySQL

## 📦 Struktur Folder

```text
├── src/
│   ├── db/
│   │   ├── index.js       # Koneksi Drizzle ke MySQL
│   │   └── schema.js      # Definisi skema tabel (Drizzle ORM)
│   └── index.js           # Entry point aplikasi & route server Elysia
├── .env.example           # Template environment variables
├── .env                   # Environment variables lokal
├── drizzle.config.js      # Konfigurasi Drizzle Kit
└── package.json           # Dependensi dan script
```

## 🛠️ Cara Menjalankan

### 1. Salin Environment Variable

```bash
cp .env.example .env
```

Sesuaikan nilai `DATABASE_URL` dengan database MySQL Anda jika diperlukan.

### 2. Jalankan Mode Development

```bash
bun run dev
```

Server akan berjalan di `http://localhost:3000`.

### 3. Migrasi Database (Drizzle Kit)

- Generate migration files:
  ```bash
  bun run db:generate
  ```
- Push skema langsung ke database:
  ```bash
  bun run db:push
  ```
- Buka Drizzle Studio:
  ```bash
  bun run db:studio
  ```

## 📡 Daftar Endpoint

- `GET /` : Health check & deskripsi API
- `GET /users` : Mengambil semua data user
- `POST /users` : Membuat user baru (`{ "name": "...", "email": "..." }`)
- `GET /users/:id` : Mengambil data user berdasarkan ID
