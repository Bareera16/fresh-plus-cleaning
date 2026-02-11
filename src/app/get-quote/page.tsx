'use client';

import { AccordionForm } from "@/components/booking/AccordionForm";
import type { Metadata } from 'next';
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/home/navbar";
import Footer from "@/components/home/footer";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import {
  calculateTotalPrice,
  bedroomOptions,
  extraServices,
  bondBackBundle,
  serviceCategories,
  type InstantQuoteFormState,
} from "@/lib/pricing-data";

export default function InstantQuotePage() {
  const handleSubmit = async (formState: InstantQuoteFormState): Promise<string> => {
    const pricing = calculateTotalPrice(formState, bedroomOptions, extraServices, bondBackBundle);
    const selectedService = serviceCategories.find(s => s.id === formState.selectedService);

    // Prepare data for database
    const bookingData = {
      // Service info
      service_type: formState.selectedService,
      service_name: selectedService?.name || "",
      service_size: formState.bedrooms,

      // Property info
      property_type: formState.propertyType,
      furnished: formState.furnished,
      bathrooms: formState.bathrooms,

      // Extras (stored as JSON)
      selected_extras: formState.selectedExtras,
      bundle_selected: formState.bundleSelected,

      // Pricing
      original_price: pricing.originalTotal,
      discount_amount: pricing.totalSavings,
      final_price: pricing.total,
      same_day_booking: formState.sameDayBooking,

      // Schedule
      preferred_date: formState.preferredDate?.toISOString().split('T')[0] || null,
      preferred_time: formState.preferredTime,

      // Contact info
      first_name: formState.firstName,
      last_name: formState.lastName,
      email: formState.email,
      phone: formState.phone,
      address: formState.address,
      suburb: formState.suburb,
      postcode: formState.postcode,

      // Additional
      comments: formState.comments,
      status: "pending",
    };

    try {
      // Insert into database
      const { data, error } = await supabase
        .from("instant_bookings")
        .insert(bookingData)
        .select("id")
        .single();

      if (error) {
        console.error("Database error:", error);
        toast.error("Something went wrong. Please try again.");
        throw error;
      }

      // Send email notification
      try {
        // Create extra names map for email template
        const extraServiceNames: Record<string, string> = {};
        extraServices.forEach(extra => {
          extraServiceNames[extra.id] = extra.name;
        });

        await supabase.functions.invoke("email-dispatch", {
          body: {
            type: "instant_booking",
            booking: {
              id: data.id,
              ...bookingData,
            },
            extraServiceNames,
            adminEmail: "Info@freshpluscleaning.com.au",
          },
        });
      } catch (emailError) {
        console.error("Email notification error:", emailError);
        // Don't fail the booking if email fails
      }

      toast.success("Booking confirmed! We'll contact you shortly.");
      return data.id;
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit booking. Please try again.");
      throw error;
    }
  };

  return (
    <>
      <SEOHead
        title="Get Instant Quote | Fresh Plus Cleaning Melbourne"
        description="Get an instant quote for professional cleaning services in Melbourne. See real-time pricing, select extras, and book online. 10% off all services!"
      />
      <Navbar />
      <main className="min-h-screen bg-gray-50 overflow-hidden">
        {/* Hero Section */}
        <section className="relative pt-64 pb-24 px-6 text-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/Home_Hero.webp"
              alt="Background"
              fill
              priority
              className="object-cover brightness-[0.4]"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-7xl font-black text-white uppercase tracking-tight mb-4"
            >
              See Our <span className="text-brand-green">Pricing</span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-gray-100 text-lg md:text-xl max-w-3xl mx-auto font-medium"
            >
              Get an instant quote tailored to your needs. Transparent pricing, no hidden fees.
            </motion.p>
          </div>
        </section>

        <section className="relative z-10 -mt-10 pb-20">
          <AccordionForm onSubmit={handleSubmit} />
        </section>
      </main>
      <Footer />
    </>
  );
};

