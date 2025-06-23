CREATE TABLE IF NOT EXISTS "meal_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"price" integer NOT NULL,
	"description" text NOT NULL,
	"details" json,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription_delivery_days" (
	"subscription_id" uuid NOT NULL,
	"delivery_day" text NOT NULL,
	CONSTRAINT "subscription_delivery_days_subscription_id_delivery_day_pk" PRIMARY KEY("subscription_id","delivery_day")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscription_meal_types" (
	"subscription_id" uuid NOT NULL,
	"meal_type" text NOT NULL,
	CONSTRAINT "subscription_meal_types_subscription_id_meal_type_pk" PRIMARY KEY("subscription_id","meal_type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plan_id" uuid NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"start_date" timestamp NOT NULL,
	"allergies" text,
	"total_price" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "testimonials" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"message" text NOT NULL,
	"rating" integer NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text DEFAULT 'user' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_delivery_days" ADD CONSTRAINT "subscription_delivery_days_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscription_meal_types" ADD CONSTRAINT "subscription_meal_types_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_meal_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "meal_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
