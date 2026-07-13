CREATE TYPE "public"."task_category" AS ENUM('Financeiro', 'Marketing', 'Vendas', 'TI', 'Geral');--> statement-breakpoint
CREATE TYPE "public"."task_priority" AS ENUM('Baixa', 'Média', 'Alta');--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "category" "task_category" DEFAULT 'Geral' NOT NULL;--> statement-breakpoint
ALTER TABLE "tasks" ADD COLUMN "priority" "task_priority" DEFAULT 'Média' NOT NULL;