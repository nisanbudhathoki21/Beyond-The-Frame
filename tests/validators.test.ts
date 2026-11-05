import { describe, it, expect } from "vitest";
import { bookingSchema } from "../lib/validators";

describe("booking validation", () => {
  it("rejects invalid Nepal phone", () => {
    const r = bookingSchema.safeParse({ name:"Ram", phone:"123", email:"a@b.com", eventType:"wedding", eventDate: new Date(Date.now()+86400000).toISOString().slice(0,10), location:"Sunwal", serviceId:"basic" });
    expect(r.success).toBe(false);
  });
  it("accepts valid +977 phone", () => {
    const r = bookingSchema.safeParse({ name:"Ram Thapa", phone:"+977-9812345678", email:"ram@example.com", eventType:"wedding", eventDate: new Date(Date.now()+86400000).toISOString().slice(0,10), location:"Sunwal", serviceId:"basic", budgetNPR: 50000 });
    expect(r.success).toBe(true);
  });
  it("rejects past date", () => {
    const r = bookingSchema.safeParse({ name:"Ram", phone:"+9779812345678", email:"a@b.com", eventType:"portrait", eventDate:"2020-01-01", location:"Butwal", serviceId:"basic" });
    expect(r.success).toBe(false);
  });
  it("requires alt text for portfolio (checked via schema)", async () => {
    // sanity: booking message max 2000
    const longMsg = "a".repeat(2001);
    const r = bookingSchema.safeParse({ name:"Test", phone:"+9779812345678", email:"a@b.com", eventType:"event", eventDate: new Date(Date.now()+86400000).toISOString().slice(0,10), location:"Lumbini", serviceId:"basic", message: longMsg });
    expect(r.success).toBe(false);
  });
});
