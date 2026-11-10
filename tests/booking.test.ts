import { describe, it, expect } from "vitest";
import { bookingSchema, buildMessage, whatsappUrl, mailtoUrl } from "../lib/booking";

const future = new Date(Date.now() + 86_400_000).toISOString().slice(0, 10);
const ok = { name: "Ram Thapa", phone: "98 1234-5678", email: "", service: "couple", date: future, place: "Butwal", budget: "2,500", message: "" };

describe("booking validation", () => {
  it("accepts a valid request and normalises phone and budget", () => {
    const r = bookingSchema.safeParse(ok);
    expect(r.success).toBe(true);
    if (r.success) { expect(r.data.phone).toBe("9812345678"); expect(r.data.budget).toBe("2500"); }
  });
  it("accepts +977 numbers", () => {
    expect(bookingSchema.safeParse({ ...ok, phone: "+977 9812345678" }).success).toBe(true);
  });
  it("rejects a bad phone number", () => {
    expect(bookingSchema.safeParse({ ...ok, phone: "123" }).success).toBe(false);
  });
  it("rejects past dates", () => {
    expect(bookingSchema.safeParse({ ...ok, date: "2020-01-01" }).success).toBe(false);
  });
  it("rejects unknown services", () => {
    expect(bookingSchema.safeParse({ ...ok, service: "hack" }).success).toBe(false);
  });
  it("rejects non-numeric budgets and over-long notes", () => {
    expect(bookingSchema.safeParse({ ...ok, budget: "a lot" }).success).toBe(false);
    expect(bookingSchema.safeParse({ ...ok, message: "a".repeat(1001) }).success).toBe(false);
  });
  it("strips control characters", () => {
    const r = bookingSchema.safeParse({ ...ok, name: "Ram\u0000 Thapa" });
    expect(r.success && r.data.name).toBe("Ram Thapa");
  });
});

describe("message links", () => {
  const r = bookingSchema.parse({ ...ok, message: "A&B <b>?" });
  const text = buildMessage(r);
  it("encodes the text so it cannot break out of the URL", () => {
    const wa = whatsappUrl(text);
    expect(wa.startsWith("https://wa.me/977")).toBe(true);
    expect(wa).not.toMatch(/[<> "]/);
    expect(wa.split("?text=")[1]).not.toContain("&");
    expect(mailtoUrl(text).startsWith("mailto:")).toBe(true);
  });
});

describe("email field", () => {
  it("is optional but must be valid when given", () => {
    expect(bookingSchema.safeParse({ ...ok, email: "" }).success).toBe(true);
    expect(bookingSchema.safeParse({ ...ok, email: "ram@example.com" }).success).toBe(true);
    const bad = bookingSchema.safeParse({ ...ok, email: "ram@" });
    expect(bad.success).toBe(false);
    if (!bad.success) expect(bad.error.issues[0].message).toBe("Enter a valid email address");
  });
});
