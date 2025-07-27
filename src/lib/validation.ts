import { z } from "zod"

// PDB ID validation - must be 4 characters, alphanumeric
export const pdbIdSchema = z.string()
  .length(4, "PDB ID must be exactly 4 characters")
  .regex(/^[A-Za-z0-9]{4}$/, "PDB ID must contain only letters and numbers")

// Contact form validation
export const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters")
    .regex(/^[a-zA-Z\s]+$/, "Name must contain only letters and spaces"),
  email: z.string()
    .email("Please enter a valid email address")
    .max(254, "Email must not exceed 254 characters"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must not exceed 1000 characters")
})

// User input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

// Sequence validation for protein sequences
export const proteinSequenceSchema = z.string()
  .min(1, "Sequence cannot be empty")
  .max(10000, "Sequence too long (max 10,000 characters)")
  .regex(/^[ACDEFGHIKLMNPQRSTVWY\s]*$/i, "Invalid amino acid sequence")
// Individual validation functions for form handling
export const validateEmail = (email: string): boolean => {
  try {
    z.string().email().parse(email)
    return true
  } catch {
    return false
  }
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}
export type ContactFormData = z.infer<typeof contactFormSchema>
export type ProteinSequence = z.infer<typeof proteinSequenceSchema>
