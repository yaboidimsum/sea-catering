"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { StarIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Sample testimonials data
const initialTestimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    message:
      "SEA Catering has transformed my diet. The meals are delicious and perfectly portioned for my weight loss journey.",
    rating: 5,
    date: "2 months ago",
  },
  {
    id: 2,
    name: "Siti Rahayu",
    message:
      "As a busy professional, I don't have time to cook. SEA Catering delivers healthy meals right to my office. Couldn't be happier!",
    rating: 4,
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Ahmad Hidayat",
    message:
      "The protein plan is perfect for my gym routine. Great taste and I'm seeing results in my muscle gains.",
    rating: 5,
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Dewi Kusuma",
    message:
      "I've tried many meal delivery services, but SEA Catering stands out for quality and taste. My family loves it!",
    rating: 5,
    date: "2 weeks ago",
  },
  {
    id: 5,
    name: "Rudi Hartono",
    message:
      "The vegetarian options are amazing. Finally found a service that doesn't treat vegetarian meals as an afterthought.",
    rating: 4,
    date: "1 week ago",
  },
];

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    message: "",
    rating: 5,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating: number) => {
    setNewTestimonial((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      newTestimonial.name.trim() === "" ||
      newTestimonial.message.trim() === ""
    ) {
      return;
    }

    const newEntry = {
      id: testimonials.length + 1,
      ...newTestimonial,
      date: "Just now",
    };

    setTestimonials([...testimonials, newEntry]);
    setNewTestimonial({ name: "", message: "", rating: 5 });
    setIsDialogOpen(false);
  };

  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="vercel-text-gradient mb-4 text-3xl font-bold">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-gray-400">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about SEA Catering.
          </p>
        </div>

        {/* Shadcn Carousel for Testimonials */}
        <div className="mx-auto max-w-6xl">
          <Carousel
            className="w-full"
            opts={{
              align: "start",
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="glass-effect interactive-hover h-[280px] border-gray-800 bg-black/40">
                      <CardContent className="flex h-full flex-col justify-between p-6">
                        <div>
                          <div className="mb-4 flex">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`h-5 w-5 ${
                                  i < testimonial.rating
                                    ? "fill-yellow-500 text-yellow-500"
                                    : "text-gray-600"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="mb-4 text-pretty text-gray-300 line-clamp-4">
                            "{testimonial.message}"
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-auto">
                          <p className="font-semibold">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {testimonial.date}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-black/40 text-white hover:bg-black/60" />
            <CarouselNext className="right-2 bg-black/40 text-white hover:bg-black/60" />
          </Carousel>
        </div>

        {/* Add Testimonial Button */}
        <div className="mt-12 text-center">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="glass-effect interactive-hover border-gray-600"
              >
                Share Your Experience
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-xl">Add Your Testimonial</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={newTestimonial.name} 
                    onChange={handleInputChange} 
                    placeholder="Enter your name"
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Experience</Label>
                  <Textarea 
                    id="message" 
                    name="message" 
                    value={newTestimonial.message} 
                    onChange={handleInputChange} 
                    placeholder="Tell us about your experience with SEA Catering"
                    className="bg-gray-800 border-gray-700 min-h-[100px]"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingChange(rating)}
                        className="focus:outline-none"
                      >
                        <StarIcon 
                          className={`h-6 w-6 ${
                            rating <= newTestimonial.rating 
                              ? "text-yellow-500 fill-yellow-500" 
                              : "text-gray-600"
                          }`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                    className="border-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Submit</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
