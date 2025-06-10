import { BUSINESS_INFO, WHATSAPP_MESSAGES } from "../constants";

/**
 * Opens WhatsApp with a pre-filled message
 * @param message - The message to send
 * @param phone - Optional phone number (defaults to business phone)
 */
export const openWhatsApp = (
  message: string = WHATSAPP_MESSAGES.general,
  phone: string = BUSINESS_INFO.phoneClean
): void => {
  try {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  } catch (error) {
    console.error("Failed to open WhatsApp:", error);
    // Fallback: copy phone number to clipboard
    navigator.clipboard?.writeText(BUSINESS_INFO.phoneFormatted).catch(() => {
      // Silent fail if clipboard API is not available
    });
  }
};

/**
 * Opens phone dialer
 * @param phone - Optional phone number (defaults to business phone)
 */
export const openPhoneDialer = (phone: string = BUSINESS_INFO.phone): void => {
  try {
    window.open(`tel:${phone}`, "_self");
  } catch (error) {
    console.error("Failed to open phone dialer:", error);
    // Fallback: copy phone number to clipboard
    navigator.clipboard?.writeText(phone).catch(() => {
      // Silent fail if clipboard API is not available
    });
  }
};

/**
 * Opens email client
 * @param email - Optional email (defaults to business email)
 * @param subject - Optional email subject
 */
export const openEmailClient = (
  email: string = BUSINESS_INFO.email,
  subject: string = "Inquiry about Ramstone Services"
): void => {
  try {
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    window.open(url, "_self");
  } catch (error) {
    console.error("Failed to open email client:", error);
    // Fallback: copy email to clipboard
    navigator.clipboard?.writeText(email).catch(() => {
      // Silent fail if clipboard API is not available
    });
  }
};
