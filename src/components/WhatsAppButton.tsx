import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+260974622334"; // Replace with actual WhatsApp number
    const message = "Hello! I'm interested in your services at Ramstone Creative Solutions.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg z-50 flex items-center justify-center animate-pulse"
      size="icon"
    >
      <MessageCircle size={24} />
    </Button>
  );
};

export default WhatsAppButton;
