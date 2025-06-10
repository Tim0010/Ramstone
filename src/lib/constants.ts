// Business Information Constants
export const BUSINESS_INFO = {
  name: "Ramstone Creative Solutions",
  tagline: "Great Professionalism. Superb Quality.",
  phone: "+260974622334",
  phoneFormatted: "+260 974 622 334",
  phoneClean: "260974622334",
  email: "grayheavens891@gmail.com",
  address: "23A Great East Road, Avondale, Lusaka",
  businessHours: "Mon-Fri: 8AM-5PM, Sat: 8AM-2PM",
  website: "https://ramstone.netlify.app",
} as const;

// WhatsApp Messages
export const WHATSAPP_MESSAGES = {
  general: "Hello! I'm interested in your services at Ramstone Creative Solutions.",
  autoRepair: "Hi! I need auto repair services. Can you help?",
  generalSupply: "Hello! I'm interested in your general supply services.",
  contact: "Hello! I need more information about your services.",
} as const;

// Navigation Items
export const NAVIGATION_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Auto Repair", href: "/auto-repair" },
  { name: "General Supply", href: "/general-supply" },
  { name: "Contact", href: "/contact" },
] as const;

// SEO Meta Data
export const SEO_DATA = {
  title: "Ramstone Creative Solutions - Car Repair & General Supply | Lusaka, Zambia",
  description: "Professional car repair services and general supply items in Lusaka, Zambia. Great professionalism, superb quality.",
  keywords: "car repair Lusaka, auto spares Zambia, panel beating Zambia, general supply Lusaka, spray painting, construction tools, hardware Zambia",
  author: "Ramstone Creative Solutions",
} as const;

// Social Media Links (for future use)
export const SOCIAL_LINKS = {
  whatsapp: `https://wa.me/${BUSINESS_INFO.phoneClean}`,
  // Add other social media links as needed
} as const;
