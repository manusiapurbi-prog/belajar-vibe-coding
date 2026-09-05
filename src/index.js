import { Elysia, t } from "elysia";
import { db, users } from "./db/index.js";
import { eq } from "drizzle-orm";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get("/", () => {
    return {
      message: "Selamat datang di Backend Bun + ElysiaJS + Drizzle + MySQL!",
      status: "online",
      endpoints: {
        "GET /": "Health check & info",
        "GET /users": "Dapatkan semua user dari database",
        "POST /users": "Buat user baru (body: { name, email })",
        "GET /users/:id": "Dapatkan user berdasarkan ID",
      },
    };
  })
  .group("/users", (app) =>
    app
      .get("/", async ({ set }) => {
        try {
          const allUsers = await db.select().from(users);
          return {
            success: true,
            data: allUsers,
          };
        } catch (error) {
          set.status = 500;
          return {
            success: false,
            message:
              "Gagal mengambil data user. Pastikan MySQL sedang berjalan dan konfigurasi DATABASE_URL benar.",
            error: error.message,
          };
        }
      })
      .get("/:id", async ({ params: { id }, set }) => {
        try {
          const numericId = Number(id);
          if (isNaN(numericId)) {
            set.status = 400;
            return { success: false, message: "ID harus berupa angka." };
          }

          const result = await db
            .select()
            .from(users)
            .where(eq(users.id, numericId))
            .limit(1);
          if (result.length === 0) {
            set.status = 404;
            return { success: false, message: "User tidak ditemukan." };
          }

          return {
            success: true,
            data: result[0],
          };
        } catch (error) {
          set.status = 500;
          return {
            success: false,
            message: "Gagal mengambil data user.",
            error: error.message,
          };
        }
      })
      .post(
        "/",
        async ({ body, set }) => {
          try {
            const { name, email } = body;
            const inserted = await db.insert(users).values({ name, email });
            return {
              success: true,
              message: "User berhasil dibuat",
              insertId: inserted[0].insertId,
              data: { name, email },
            };
          } catch (error) {
            set.status = 500;
            return {
              success: false,
              message: "Gagal membuat user.",
              error: error.message,
            };
          }
        },
        {
          body: t.Object({
            name: t.String({ minLength: 1 }),
            email: t.String({ format: "email" }),
          }),
        },
      ),
  )
  .listen(port);

console.log(
  `🦊 Elysia server berjalan di http://${app.server?.hostname}:${app.server?.port}`,
);
