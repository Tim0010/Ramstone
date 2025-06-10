import React from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openWhatsApp } from "@/lib/utils/whatsapp";
import { WHATSAPP_MESSAGES } from "@/lib/constants";

const WhatsAppButton: React.FC = React.memo(() => {
  const handleWhatsAppClick = () => {
    openWhatsApp(WHATSAPP_MESSAGES.general);
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg z-50 flex items-center justify-center animate-pulse transition-all duration-300 hover:scale-110"
      size="icon"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={24} aria-hidden="true" />
    </Button>
  );
});

WhatsAppButton.displayName = "WhatsAppButton";

export default WhatsAppButton;
