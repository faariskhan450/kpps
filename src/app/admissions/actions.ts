"use server";

// A Server Action: this code runs on the SERVER, never in the browser.
// The form calls it on submit. We validate the input, then save it to
// Supabase. Keeping this server-side means our database logic is never
// exposed to visitors.

import { createClient } from "@/lib/supabase/server";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  // Read each field from the submitted form
  const parentName = String(formData.get("parentName") ?? "").trim();
  const childName = String(formData.get("childName") ?? "").trim();
  const childAgeGrade = String(formData.get("childAgeGrade") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // Validate. We collect every problem so the visitor sees them all at once.
  const errors: Record<string, string> = {};
  if (!parentName) errors.parentName = "Please enter your name.";
  if (!childName) errors.childName = "Please enter your child's name.";
  if (!childAgeGrade) errors.childAgeGrade = "Please choose a class.";
  if (!/^[0-9+\-\s]{7,15}$/.test(phone))
    errors.phone = "Please enter a valid phone number.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    errors.email = "Please enter a valid email address.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      errors,
    };
  }

  // Save to the database
  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({
    parent_name: parentName,
    child_name: childName,
    child_age_grade: childAgeGrade,
    phone,
    email,
    message: message || null,
  });

  if (error) {
    // Log on the server for debugging; show a friendly message to the user
    console.error("Enquiry insert failed:", error.message);
    return {
      status: "error",
      message:
        "Sorry, something went wrong saving your enquiry. Please try again.",
    };
  }

  return {
    status: "success",
    message:
      "Thank you! Your enquiry has been received. Our team will be in touch soon.",
  };
}
