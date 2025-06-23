import { sql } from "drizzle-orm";
import { 
  pgTable, 
  text, 
  integer, 
  primaryKey,
  timestamp,
  uuid,
  json
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Meal plans table
export const mealPlans = pgTable("meal_plans", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  price: integer("price").notNull(),
  description: text("description").notNull(),
  details: json("details"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Subscriptions table
export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").notNull().references(() => users.id),
  planId: uuid("plan_id").notNull().references(() => mealPlans.id),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  status: text("status").default("active").notNull(),
  startDate: timestamp("start_date").notNull(),
  allergies: text("allergies"),
  totalPrice: integer("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Subscription meal types junction table
export const subscriptionMealTypes = pgTable("subscription_meal_types", {
  subscriptionId: uuid("subscription_id").notNull().references(() => subscriptions.id),
  mealType: text("meal_type").notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.subscriptionId, table.mealType] }),
}));

// Subscription delivery days junction table
export const subscriptionDeliveryDays = pgTable("subscription_delivery_days", {
  subscriptionId: uuid("subscription_id").notNull().references(() => subscriptions.id),
  deliveryDay: text("delivery_day").notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.subscriptionId, table.deliveryDay] }),
}));

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  message: text("message").notNull(),
  rating: integer("rating").notNull(),
  date: timestamp("date").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});