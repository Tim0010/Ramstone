import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Phone, MessageCircle } from "lucide-react";

const AutoRepair = () => {
  const services = [
    {
      title: "Periodic Services",
      image: "/images/Periodic-Services.jpg",
      description: "Comprehensive inspections and maintenance to keep your car running smoothly, including oil changes, filter replacements, and fluid checks.",
    },
    {
      title: "AC Service & Repair",
      image: "/images/AC Service & Repair.jpg",
      description: "Diagnosis and repair of car air conditioning systems, from refrigerant recharges to compressor replacements, ensuring optimal climate control.",
    },
    {
      title: "Batteries",
      image: "/images/Batteries.jpg",
      description: "Battery testing, replacement, and maintenance services to ensure reliable starts and electrical system performance.",
    },
    {
      title: "Tyres & Wheel Care",
      image: "/images/Tyres & Wheel Care.png",
      description: "Tyre rotation, balancing, alignment, and puncture repairs, along with wheel inspection for safety and longevity.",
    },
    {
      title: "Denting & Painting",
      image: "/images/Denting & Painting.jpg",
      description: "Expert bodywork and paint repair to restore your vehicle's aesthetic appeal after minor dents, scratches, or major collision damage.",
    },
    {
      title: "Car Inspections",
      image: "/images/Car Inspections.jpg",
      description: "Thorough vehicle inspections for pre-purchase, safety, or routine checks, identifying potential issues and ensuring roadworthiness.",
    },
    {
      title: "Windshields & Lights",
      image: "/images/Windshields & Lights.jpg",
      description: "Repair and replacement of damaged windshields, side windows, and lighting systems, ensuring clear visibility and compliance.",
    },
    {
      title: "Suspension & Fitments",
      image: "/images/Suspension & Fitments.jpg",
      description: "Maintenance and repair of suspension components, including shocks, struts, and springs, for a smooth ride and stable handling.",
    },
    {
      title: "Clutch & Body Parts",
      image: "/images/Clutch & Body Parts.jpg",
      description: "Repair and replacement of clutch systems and various body parts, addressing wear and tear or accident damage.",
    },
    {
      title: "Insurance Claims",
      image: "/images/car insurance claims.jpeg",
      description: "Assistance with processing car insurance claims, providing necessary documentation and repair services covered by your policy.",
    }
  ];

  const beforeAfter = [
    {
      title: "Panel Beating Results",
      before: "Damaged front bumper with deep dents",
      beforeImage: "/images/488181108_1170332561769439_8998768298189657569_n.jpg",
      after: "Fully restored to original condition",
      afterImage: "/images/487171285_1170332548436107_5781666859179293527_n.jpg",
    },
    {
      title: "Spray Painting Excellence",
      before: "Faded and scratched paint surface",
      beforeImage: "/images/487143189_1170332545102774_8751765343996189041_n.jpg",
      after: "Professional finish with perfect color match",
      afterImage: "/images/487205857_1170332585102770_7741112290455340861_n.jpg",
    },
    {
      title: "Complete Restoration",
      before: "Multiple damage points on vehicle body",
      beforeImage: "/images/487172331_1170332568436105_1010495049720679549_n.jpg",
      after: "Like-new appearance and protection",
      afterImage: "/images/488521812_1173200268149335_5992700757437035505_n.jpg",
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/Auto-repair.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Auto Repair Services</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Professional car repair services in Lusaka. From panel beating to spray painting, 
              we restore your vehicle to its best condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-red-600 border-red-600 hover:bg-red-700 hover:text-white hover:border-red-700">
                <Link to="/contact">
                  <Phone className="w-5 h-5 mr-2" />
                  Get a Quote
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-red-600 border-red-600 hover:bg-red-700 hover:text-white hover:border-red-700"
                onClick={() => {
                  const phone = "+260974622334";
                  const message = "Hi! I need auto repair services. Can you help?";
                  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
                }}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Auto Repair Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive automotive repair services with skilled technicians and quality materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden transform hover:scale-105">
                <img src={service.image} alt={service.title} className="h-48 w-full object-cover" />
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-semibold text-dark mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Before & After Gallery</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See the transformation we achieve with our professional auto repair services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {beforeAfter.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-2 gap-0">
                    <div className="relative group">
                      <img src={item.beforeImage} alt={`Before ${item.title}`} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-red-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-center font-semibold p-4">Before: {item.before}</p>
                      </div>
                    </div>
                    <div className="relative group">
                      <img src={item.afterImage} alt={`After ${item.title}`} className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-green-600 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-center font-semibold p-4">After: {item.after}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-dark mb-2">{item.title}</h3>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Why Choose Our Auto Repair?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Skilled professionals with years of automotive repair experience.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">★</span>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Quality Materials</h3>
              <p className="text-gray-600">We use only high-quality paints, parts, and materials for lasting results.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">$</span>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Fair Pricing</h3>
              <p className="text-gray-600">Competitive rates with transparent pricing and no hidden costs.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-dark mb-2">Quick Service</h3>
              <p className="text-gray-600">Efficient repairs to get you back on the road as soon as possible.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-dark text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Auto Repair Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a free estimate on your car repair needs. We're here to help restore your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-red-600">
              <Link to="/contact">Request Free Quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-dark">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AutoRepair;
