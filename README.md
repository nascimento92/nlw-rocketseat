# nlw-rocketseat
Next Level Week (NLW) - 09/09/24 a 12/09/24

> npm init -y
> npm i typescript -D
> npx tsc --init
[ procurar no google tsconfig bases > https://github.com/tsconfig/bases > pega o tsconfig da versão do node e substituir pelo tsconfig do projeto]
> npm i -D @types/node tsx

## BIOME ##
> npm i -D --save-exact @biomejs/biome
[na paleta de comando procurar por preferences: Open workspace settings (JSON)] e salvar:

{
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "biomejs.biome"
}

[necessário ter a extensão do biome instalada]

## DOCKER ##
criar um docker-compose.yml
[procurar no google Docker hub o postgress https://hub.docker.com/r/bitnami/postgrest]

name: pocket-js-server

services:
  pg:
    image: bitnami/postgresql:13.16.0
    ports:
      - '5432:5432'
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DB=inorbit

> Docker compose -d
> npm i drizzle-orm
> npm i drizzle-kit -D

[crio um arquivo drizzle.config.ts]

import { defineConfig } from 'drizzle-kit';
import { env } from './src/env';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});


[crio um arquivo .env]
DATABASE_URL="postgresql://docker:docker@localhost:5432/inorbit"

[edito o script]
"dev": "tsx --env-file .env watch src/http/server.ts"


> npm i zod

cria um arquivo env.ts

import z from 'zod';

const envSchema = z.object({
  DATABSE_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

e esse env.ts será utilizado no dizzle.config

[criar uma pasta db e um arquivo schema.ts]

import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const goals = pgTable('goals', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  desiredWeeklyFrequency: integer('desired_weekly_frequency').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

> npx drizzle-kit generate
> npm i postgres
> npx drizzle-kit migrate
> npm drizzle-kit studio (abre o link para visualizar o banco)
> npm i @paralleldrive/cuid2 (para criação de uuids)