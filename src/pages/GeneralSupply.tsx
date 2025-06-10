import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageCircle, Phone
} from "lucide-react";

const GeneralSupply = () => {
  const categories = [
    {
      title: "Industrial Supplies",
      image: "/images/Industrial Supplies.jpg",
      description: "Providing a wide range of industrial tools, machinery, and equipment for manufacturing, construction, and other heavy-duty applications.",
    },
    {
      title: "Chemicals & Lubricants",
      image: "/images/Chemicals & Lubricants.jpeg",
      description: "Supplying various chemicals and lubricants for automotive, industrial, and specialized cleaning needs, ensuring high performance and safety.",
    },
    {
      title: "Office Stationery",
      image: "/images/Office Stationery.jpg",
      description: "A comprehensive collection of office and school supplies, including paper, pens, filing solutions, and other essential administrative tools.",
    },
    {
      title: "Agricultural Supplies",
      image: "/images/Agricultural Supplies.jpg",
      description: "Offering a selection of agricultural tools, seeds, fertilizers, and equipment to support farming operations and enhance crop yield.",
    },
    {
      title: "Heavy Duty Spares",
      image: "/images/Heavy Duty Spares.jpg",
      description: "Stocking heavy-duty spare parts for trucks, machinery, and industrial equipment, ensuring durability and performance for demanding tasks.",
    },
    {
      title: "Custom Orders",
      image: "/images/Custom Orders.webp",
      description: "We facilitate custom orders for specialized items not in our standard inventory, providing tailored solutions to meet unique client requirements.",
    },
    {
      title: "General Supply (Broad)",
      image: "/images/General Supply.jpg",
      description: "A broad category encompassing various general use items not listed elsewhere, catering to diverse needs for businesses and individuals.",
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/cars.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">General Supply Services</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Your one-stop shop for stationery, hardware, electrical, painting, and construction supplies in Lusaka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 border-red-600 hover:bg-red-700 hover:text-white hover:border-red-700">
                <Link to="/contact">Get Product List</Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-red-600 border-red-600 hover:bg-red-700 hover:text-white hover:border-red-700"
                onClick={() => {
                  const phone = "260XXXXXXXXX";
                  const message = "Hi! I need supplies for my project. What do you have available?";
                  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Catalog
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Product Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We stock a comprehensive range of quality supplies to meet all your business and personal needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
                <img src={category.image} alt={category.title} className="h-48 w-full object-cover" />
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-dark mb-2">{category.title}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default GeneralSupply;
