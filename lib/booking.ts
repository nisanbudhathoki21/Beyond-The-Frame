import { z } from "zod";
import { business } from "./config";
import { allServices } from "./services";

const clean = (s: string) => s.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "").trim();

const serviceIds = [...allServices.map((s) => s.id), "not-sure"];

export const bookingSchema = z.object({
  name: z.string().transform(clean).pipe(z.string().min(2, "Enter your name").max(80, "Name is too long")),
  phone: z
    .string()
    .transform((v) => v.replace(/[\s-]/g, ""))
    .pipe(z.string().regex(/^(\+977)?9[78]\d{8}$/, "Enter a Nepal mobile number, like 98XXXXXXXX")),
  email: z
    .string()
    .transform(clean)
    .pipe(
      z
        .string()
        .max(120, "Email is too long")
        .refine((v) => v === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email address"),
    ),
  service: z.string().refine((v) => serviceIds.includes(v), "Choose a service"),
  date: z
    .string()
    .min(1, "Pick the date of the shoot")
    .refine((v) => {
      const d = new Date(`${v}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !Number.isNaN(d.getTime()) && d >= today;
    }, "Choose today or a future date"),
  place: z.string().transform(clean).pipe(z.string().min(2, "Where will the shoot be?").max(120, "Keep this under 120 characters")),
  budget: z
    .string()
    .transform((v) => v.replace(/[,\s]/g, ""))
    .pipe(z.string().regex(/^\d{0,8}$/, "Use numbers only")),
  message: z.string().transform(clean).pipe(z.string().max(1000, "Keep notes under 1,000 characters")),
});

export type BookingInput = z.input<typeof bookingSchema>;
export type BookingClean = z.output<typeof bookingSchema>;

export function buildMessage(b: BookingClean): string {
  const svc = allServices.find((s) => s.id === b.service)?.title ?? "Not sure yet";
  return [
    "Hello, I'd like to book a shoot.",
    `Name: ${b.name}`,
    `Service: ${svc}`,
    `Date: ${b.date}`,
    `Place: ${b.place}`,
    b.budget ? `Budget: NPR ${Number(b.budget).toLocaleString("en-US")}` : "",
    `Phone: ${b.phone}`,
    b.email ? `Email: ${b.email}` : "",
    b.message ? `Notes: ${b.message}` : "",
  ].filter(Boolean).join("\n");
}

export const whatsappUrl = (text: string) => `https://wa.me/977${business.whatsapp}?text=${encodeURIComponent(text)}`;
export const mailtoUrl = (text: string) =>
  `mailto:${business.email}?subject=${encodeURIComponent("Booking request")}&body=${encodeURIComponent(text)}`;
