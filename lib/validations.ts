import { z } from "zod";

// Admin Auth Schema — password only
export const loginSchema = z.object({
  email: z.string().optional().default("admin@portfolio.com"),
  password: z.string().min(1, "Password is required"),
});

// Site Settings Schema
export const siteSettingsSchema = z.object({
  siteName: z.string().min(1, "Site name is required"),
  designerName: z.string().min(1, "Designer name is required"),
  title: z.string().min(1, "Professional title is required"),
  tagline: z.string().optional().default(""),
  logoUrl: z.string().optional().nullable(),
  faviconUrl: z.string().optional().nullable(),
  metaDescription: z.string().min(10, "Meta description should be descriptive"),
  keywords: z.string().optional().default(""),
  email: z.string().email("Valid contact email required"),
  phone: z.string().optional().nullable(),
  location: z.string().min(1, "Location is required"),
  copyrightText: z.string().min(1, "Copyright text is required"),
  googleAnalyticsId: z.string().optional().nullable(),
});

// Social Link Schema
export const socialLinkSchema = z.object({
  id: z.string().optional(),
  platform: z.string().min(1, "Platform name is required"),
  url: z.string().url("Must be a valid URL"),
  icon: z.string().default("Globe"),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

// Home Content Schema
export const homeContentSchema = z.object({
  heroGreeting: z.string().min(1, "Hero greeting required"),
  heroTitle: z.string().min(1, "Hero title required"),
  heroSubtitle: z.string().min(1, "Hero subtitle required"),
  heroDescription: z.string().min(1, "Hero description required"),
  availabilityStatus: z.boolean().default(true),
  availabilityText: z.string().min(1, "Availability text required"),
  heroImageUrl: z.string().optional().nullable(),
  profileImageUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  primaryCtaText: z.string().min(1, "Primary CTA text required"),
  primaryCtaUrl: z.string().min(1, "Primary CTA URL required"),
  secondaryCtaText: z.string().min(1, "Secondary CTA text required"),
  secondaryCtaUrl: z.string().min(1, "Secondary CTA URL required"),
  stat1Number: z.string().default("8+"),
  stat1Label: z.string().default("Years Experience"),
  stat2Number: z.string().default("140+"),
  stat2Label: z.string().default("Projects Delivered"),
  stat3Number: z.string().default("18"),
  stat3Label: z.string().default("Design Accolades"),
  stat4Number: z.string().default("100%"),
  stat4Label: z.string().default("Client Satisfaction"),
});

// About Content Schema
export const aboutContentSchema = z.object({
  heading: z.string().min(1, "About heading required"),
  subheading: z.string().min(1, "Subheading required"),
  bioSummary: z.string().min(10, "Bio summary required"),
  fullBio: z.string().min(20, "Full bio required"),
  profilePhotoUrl: z.string().optional().nullable(),
  resumeUrl: z.string().optional().nullable(),
  location: z.string().min(1, "Location required"),
  yearsOfExperience: z.number().int().min(0).default(8),
  completedProjects: z.number().int().min(0).default(140),
  happyClients: z.number().int().min(0).default(65),
  languages: z.string().min(1, "Languages required"),
});

// Skill Schema
export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Skill name required"),
  name_fa: z.string().optional().nullable(),
  category: z.string().min(1, "Category required"),
  category_fa: z.string().optional().nullable(),
  icon: z.string().default("Palette"),
  proficiency: z.number().int().min(1).max(100).default(90),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

// Project Schema
export const projectImageSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().min(1, "Image URL required"),
  altText: z.string().optional().nullable(),
  altText_fa: z.string().optional().nullable(),
  caption: z.string().optional().nullable(),
  caption_fa: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
});

export const projectSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Project title is required"),
  title_fa: z.string().optional().nullable(),
  slug: z.string().optional().nullable(),
  category: z.string().min(1, "Category is required").default("Web Development"),
  category_fa: z.string().optional().nullable(),
  shortDescription: z.string().optional().default(""),
  shortDescription_fa: z.string().optional().nullable(),
  fullDescription: z.string().optional().default(""),
  fullDescription_fa: z.string().optional().nullable(),
  client: z.string().optional().nullable(),
  client_fa: z.string().optional().nullable(),
  projectYear: z.string().default("2026"),
  toolsUsed: z.string().default(""),
  servicesProvided: z.string().default(""),
  servicesProvided_fa: z.string().optional().nullable(),
  thumbnail: z.string().optional().default(""),
  projectUrl: z.string().optional().nullable(),
  behanceUrl: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
  images: z.array(projectImageSchema).optional().default([]),
});

// Certificate Schema
export const certificateSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Certificate title required"),
  title_fa: z.string().optional().nullable(),
  issuer: z.string().min(1, "Issuer name required"),
  issuer_fa: z.string().optional().nullable(),
  issueDate: z.string().min(1, "Issue date required"),
  expirationDate: z.string().optional().nullable(),
  expirationDate_fa: z.string().optional().nullable(),
  credentialId: z.string().optional().nullable(),
  score: z.string().optional().nullable(),
  verificationUrl: z.string().url("Valid verification URL").optional().or(z.literal("")),
  description: z.string().optional().nullable(),
  description_fa: z.string().optional().nullable(),
  certificateImage: z.string().optional().nullable(),
  pdfFile: z.string().optional().nullable(),
  skillsCovered: z.string().optional().nullable(),
  skillsCovered_fa: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  published: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

// Experience Schema
export const experienceSchema = z.object({
  id: z.string().optional(),
  jobTitle: z.string().min(1, "Job title required"),
  jobTitle_fa: z.string().optional().nullable(),
  company: z.string().min(1, "Company name required"),
  company_fa: z.string().optional().nullable(),
  employmentType: z.string().default("Full-time"),
  employmentType_fa: z.string().optional().nullable(),
  location: z.string().min(1, "Location required"),
  location_fa: z.string().optional().nullable(),
  startDate: z.string().min(1, "Start date required"),
  endDate: z.string().optional().nullable(),
  currentlyWorkingHere: z.boolean().default(false),
  description: z.string().min(1, "Description required"),
  description_fa: z.string().optional().nullable(),
  responsibilities: z.string().default(""),
  responsibilities_fa: z.string().optional().nullable(),
  toolsUsed: z.string().default(""),
  companyLogo: z.string().optional().nullable(),
  websiteUrl: z.string().url("Valid URL").optional().or(z.literal("")),
  displayOrder: z.number().int().default(0),
  published: z.boolean().default(true),
});

// Service Schema
export const serviceSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Service title required"),
  title_fa: z.string().optional().nullable(),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and hyphens"),
  shortDescription: z.string().min(1, "Short description required"),
  shortDescription_fa: z.string().optional().nullable(),
  detailedDescription: z.string().min(1, "Detailed description required"),
  detailedDescription_fa: z.string().optional().nullable(),
  icon: z.string().default("Sparkles"),
  startingPrice: z.string().optional().nullable(),
  deliveryTime: z.string().optional().nullable(),
  features: z.string().default(""),
  features_fa: z.string().optional().nullable(),
  active: z.boolean().default(true),
  featured: z.boolean().default(false),
  displayOrder: z.number().int().default(0),
});

// Contact Message Schema (Public Submission)
export const contactMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional().nullable(),
  service: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  projectUrl: z.string().optional().nullable(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Testimonial Schema
export const testimonialSchema = z.object({
  id: z.string().optional(),
  clientName: z.string().min(1, "Client name required"),
  clientRole: z.string().min(1, "Client role required"),
  clientCompany: z.string().min(1, "Company name required"),
  clientAvatar: z.string().optional().nullable(),
  quote: z.string().min(10, "Testimonial quote required"),
  projectTitle: z.string().optional().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  active: z.boolean().default(true),
  displayOrder: z.number().int().default(0),
});

