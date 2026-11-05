import { z } from "zod";

// Nepal phone: +977-98XXXXXXXX, 98XXXXXXXX, 980..., 981..., etc or landline
const nepalPhoneRegex = /^(\+977[-\s]?)?(98[0-9]{8}|97[0-9]{8}|9[0-9]{9}|0[0-9]{6,9}|[0-9]{7,10})$/;

export const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  phone: z.string().regex(nepalPhoneRegex, "Enter a valid Nepal phone (+977-98XXXXXXXX)"),
  email: z.string().email("Valid email required").max(120),
  eventType: z.enum(["wedding", "portrait", "event", "travel", "commercial", "other"], { errorMap: () => ({ message: "Select event type" }) }),
  eventDate: z.string().min(1, "Event date required").refine((v) => {
    const d = new Date(v);
    const today = new Date(); today.setHours(0,0,0,0);
    return !isNaN(d.getTime()) && d >= today;
  }, "Date must be today or future"),
  location: z.string().min(2, "Location required").max(120),
  serviceId: z.string().min(1, "Select a service"),
  budgetNPR: z.coerce.number().min(0, "Budget must be positive").max(10000000).optional(),
  message: z.string().max(2000, "Message too long").optional(),
  whatsappOptIn: z.boolean().optional().default(false),
  csrfToken: z.string().min(10).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const portfolioSchema = z.object({
  title: z.string().min(2).max(120),
  category: z.enum(["mustang","himalayas","village-life","landscapes","weddings","portraits","events","travel","cultural","nepal-landscapes"]),
  location: z.string().min(2).max(120),
  description: z.string().max(2000).optional(),
  imageUrl: z.string().url(),
  alt: z.string().min(10, "Alt text required (10+ chars) for accessibility").max(250),
  credits: z.string().max(200).optional(),
  featured: z.boolean().optional(),
});

export function sanitizeText(input: string): string {
  return input.replace(/[<>]/g, "").trim().slice(0, 5000);
}

export function hashIp(ip: string): string {
  // simple hash for duplicate prevention without storing raw IP
  let h = 0; for (let i=0;i<ip.length;i++) h = ((h<<5)-h)+ip.charCodeAt(i);
  return Math.abs(h).toString(36);
}
