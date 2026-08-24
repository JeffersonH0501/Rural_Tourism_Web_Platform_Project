import { MigrationInterface, QueryRunner } from 'typeorm';
export class InitialEnglishSchema1700000000000 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(
      `CREATE TABLE IF NOT EXISTS "users" ("id" SERIAL PRIMARY KEY, "first_name" varchar NOT NULL, "last_name" varchar NOT NULL, "photo_url" varchar, "email" varchar NOT NULL UNIQUE, "password_hash" varchar NOT NULL, "role" varchar NOT NULL)`,
    );
    await q.query(
      `CREATE TABLE IF NOT EXISTS "agricultural_products" ("id" SERIAL PRIMARY KEY, "name" varchar NOT NULL, "type" varchar, "description" text NOT NULL, "available" boolean NOT NULL DEFAULT true, "price" decimal(12,2) NOT NULL, "origin" varchar, "season" varchar, "image_url" varchar, "owner_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE)`,
    );
    await q.query(
      `CREATE TABLE IF NOT EXISTS "crafts" ("id" SERIAL PRIMARY KEY, "name" varchar NOT NULL, "price" decimal(12,2) NOT NULL, "quantity" integer NOT NULL, "material" varchar NOT NULL, "available" boolean NOT NULL DEFAULT true, "origin" varchar NOT NULL, "description" text NOT NULL, "image_url" varchar, "owner_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE)`,
    );
    await q.query(
      `CREATE TABLE IF NOT EXISTS "farms" ("id" SERIAL PRIMARY KEY, "name" varchar NOT NULL, "location" varchar NOT NULL, "services" text NOT NULL, "price" decimal(12,2) NOT NULL, "capacity" integer NOT NULL, "description" text NOT NULL, "image_url" varchar, "available" boolean NOT NULL DEFAULT true, "owner_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE)`,
    );
    await q.query(
      `CREATE TABLE IF NOT EXISTS "tours" ("id" SERIAL PRIMARY KEY, "title" varchar NOT NULL, "price" decimal(12,2) NOT NULL, "image_url" varchar, "date" date NOT NULL, "time" varchar NOT NULL, "location" varchar NOT NULL, "duration_hours" decimal(5,2) NOT NULL, "description" text NOT NULL, "owner_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE, "farm_id" integer REFERENCES "farms"("id") ON DELETE SET NULL)`,
    );
    await q.query(
      `CREATE TABLE IF NOT EXISTS "promotions" ("id" SERIAL PRIMARY KEY, "title" varchar NOT NULL, "description" text NOT NULL, "start_date" date NOT NULL, "end_date" date NOT NULL, "owner_id" integer NOT NULL REFERENCES "users"("id") ON DELETE CASCADE)`,
    );
  }
  async down(q: QueryRunner): Promise<void> {
    for (const table of [
      'promotions',
      'tours',
      'farms',
      'crafts',
      'agricultural_products',
      'users',
    ])
      await q.query(`DROP TABLE IF EXISTS "${table}"`);
  }
}
