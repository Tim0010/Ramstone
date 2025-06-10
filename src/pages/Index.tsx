import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Car, Wrench, Package, BatteryCharging, Lightbulb, Hammer, Clipboard, ShieldCheck,
  Gauge, Droplet, Cog, Paintbrush, Truck, FlaskConical, CircleDollarSign, Sprout,
  Star, Phone, MessageCircle
} from "lucide-react";

const Index = () => {
  const services = [
    {
      title: "Periodic Services",
      icon: <Gauge className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "AC Service & Repair",
      icon: <Droplet className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "Batteries",
      icon: <BatteryCharging className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "Tyres & Wheel Care",
      icon: <Cog className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "Denting & Painting",
      icon: <Paintbrush className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "General Supply",
      icon: <Package className="w-8 h-8 text-red-600" />,
      link: "/general-supply"
    },
    {
      title: "Car Inspections",
      icon: <Clipboard className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "Windshields & Lights",
      icon: <Lightbulb className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "Suspension & Fitments",
      icon: <Wrench className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "Clutch & Body Parts",
      icon: <Car className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "Insurance Claims",
      icon: <ShieldCheck className="w-8 h-8 text-red-600" />,
      link: "/auto-repair"
    },
    {
      title: "Industrial Supplies",
      icon: <Hammer className="w-8 h-8 text-red-600" />,
      link: "/general-supply"
    },
    {
      title: "Chemicals & Lubricants",
      icon: <FlaskConical className="w-8 h-8 text-red-600" />,
      link: "/general-supply"
    },
    {
      title: "Office Stationery",
      icon: <Clipboard className="w-8 h-8 text-red-600" />,
      link: "/general-supply"
    },
    {
      title: "Agricultural Supplies",
      icon: <Sprout className="w-8 h-8 text-red-600" />,
      link: "/general-supply"
    },
    {
      title: "Heavy Duty Spares",
      icon: <Truck className="w-8 h-8 text-red-600" />,
      link: "/general-supply"
    },
    {
      title: "Custom Orders",
      icon: <CircleDollarSign className="w-8 h-8 text-red-600" />,
      link: "/contact"
    }
  ];

  const testimonials = [
    {
      name: "John Mwanza",
      text: "Excellent service! They fixed my car perfectly and the price was very fair.",
      rating: 5
    },
    {
      name: "Grace Banda",
      text: "Best place in Lusaka for car repair tools. Always have what I need.",
      rating: 5
    },
    {
      name: "Moses Tembo",
      text: "Professional team with superb quality work. Highly recommended!",
      rating: 5
    }
  ];

  const advantages = [
    {
      title: "Genuine OEM Products",
      description: "Reliable & Genuine Parts At Valuable Prices",
      image: "/images/488181108_1170332561769439_8998768298189657569_n.jpg"
    },
    {
      title: "Fair & Transparent Pricing",
      description: "Transparent on-call quotes",
      image: "/images/487171285_1170332548436107_5781666859179293527_n.jpg"
    },
    {
      title: "State Of The Art Workshop",
      description: "Highly trained service specialists",
      image: "/images/487143189_1170332545102774_8751765343996189041_n.jpg"
    },
    {
      title: "Door Step Express Service",
      description: "Fixed location pick up and drop",
      image: "/images/487205857_1170332585102770_7741112290455340861_n.jpg"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-700 to-gray-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/images/cars.jpg')"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 hover:animate-shake">
              Great Professionalism.<br />
              <span className="text-yellow-300">Superb Quality.</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto md:mx-0">
              We offer trusted car repair services and a wide range of general supply items, based in Lusaka.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild size="lg" className="bg-white text-red-600 border-red-600 hover:bg-red-700 hover:text-white hover:border-red-700 text-lg px-8 py-3">
                <Link to="/auto-repair">Auto Repair Services</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-red-600 border-red-600 hover:bg-red-700 hover:text-white hover:border-red-700 text-lg px-8 py-3">
                <Link to="/general-supply">Supply Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From car repairs to general supplies, we provide quality solutions for individuals and businesses across Lusaka.
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {services.map((service, index) => (
              <Link to={service.link} key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group">
                <div className="mb-3 p-3 rounded-full bg-gray-100 group-hover:bg-red-100 transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-sm font-semibold text-dark text-center group-hover:text-red-600 transition-colors duration-300">
                  {service.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 relative bg-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-solid border-l-transparent border-r-transparent border-b-red-600"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Ramstone Advantages</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {advantages.map((advantage, index) => (
              <div 
                key={index} 
                className="relative h-64 rounded-lg overflow-hidden shadow-lg group"
                style={{
                  backgroundImage: `url('${advantage.image}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-70 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                  <p className="text-sm opacity-90">{advantage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">What Our Customers Say</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <p className="font-semibold text-dark">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-dark text-white py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: "url('/images/cars.jpg')"
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact us today for a quote or visit our location on Great East Road, Avondale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-red-600 hover:bg-red-700">
              <Link to="/contact">
                <Phone className="w-5 h-5 mr-2" />
                Request a Quote
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-dark border-white hover:bg-red-700 hover:text-white hover:border-red-700"
              onClick={() => {
                const phone = "260974622334";
                const message = "Hello! I need more information about your services.";
                window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
              }}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
