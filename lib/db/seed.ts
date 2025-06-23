import { db } from "./index";
import { mealPlans, users, testimonials } from "./schema";
import { v4 as uuidv4 } from "uuid";

async function seed() {
  console.log("🌱 Seeding database...");

  // Seed meal plans
  const mealPlanData = [
    {
      name: "Diet Plan",
      price: 30000,
      description: "Perfect for weight management and healthy living",
      details: {
        calories: "300-400 per meal",
        protein: "25-30g",
        carbs: "30-40g",
        fat: "10-15g",
        fiber: "8-12g",
      },
    },
    {
      name: "Protein Plan",
      price: 40000,
      description: "Ideal for fitness enthusiasts and muscle building",
      details: {
        calories: "450-550 per meal",
        protein: "35-45g",
        carbs: "40-50g",
        fat: "15-20g",
        fiber: "6-10g",
      },
    },
    {
      name: "Royal Plan",
      price: 60000,
      description: "Premium gourmet meals with the finest ingredients",
      details: {
        calories: "500-650 per meal",
        protein: "30-40g",
        carbs: "45-55g",
        fat: "20-25g",
        fiber: "8-12g",
      },
    },
  ];

  // Seed users
  const userData = [
    {
      name: "Admin",
      email: "admin@seacatering.com",
      role: "admin",
    },
    {
      name: "John Doe",
      email: "user@example.com",
      role: "user",
    },
  ];

  // Seed testimonials
  const testimonialData = [
    {
      name: "Budi Santoso",
      message: "SEA Catering has transformed my diet. The meals are delicious and perfectly portioned for my weight loss journey.",
      rating: 5,
    },
    {
      name: "Siti Rahayu",
      message: "As a busy professional, I don't have time to cook. SEA Catering delivers healthy meals right to my office. Couldn't be happier!",
      rating: 4,
    },
    {
      name: "Ahmad Hidayat",
      message: "The protein plan is perfect for my gym routine. Great taste and I'm seeing results in my muscle gains.",
      rating: 5,
    },
    {
      name: "Dewi Kusuma",
      message: "I've tried many meal delivery services, but SEA Catering stands out for quality and taste. My family loves it!",
      rating: 5,
    },
    {
      name: "Rudi Hartono",
      message: "The vegetarian options are amazing. Finally found a service that doesn't treat vegetarian meals as an afterthought.",
      rating: 4,
    },
  ];

  try {
    // Insert meal plans
    for (const plan of mealPlanData) {
      await db.insert(mealPlans).values(plan);
    }
    console.log("✅ Meal plans seeded");

    // Insert users
    for (const user of userData) {
      await db.insert(users).values(user);
    }
    console.log("✅ Users seeded");

    // Insert testimonials
    for (const testimonial of testimonialData) {
      await db.insert(testimonials).values(testimonial);
    }
    console.log("✅ Testimonials seeded");

    console.log("🎉 Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seed();