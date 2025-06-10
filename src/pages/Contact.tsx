import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import SEO from "@/components/SEO";
import { BUSINESS_INFO, WHATSAPP_MESSAGES } from "@/lib/constants";
import { openWhatsApp, openPhoneDialer, openEmailClient } from "@/lib/utils/whatsapp";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add form submission logic here
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "Phone",
      details: BUSINESS_INFO.phoneFormatted,
      action: () => openPhoneDialer(),
      ariaLabel: `Call us at ${BUSINESS_INFO.phoneFormatted}`
    },
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      details: BUSINESS_INFO.email,
      action: () => openEmailClient(),
      ariaLabel: `Email us at ${BUSINESS_INFO.email}`
    },
    {
      icon: <MapPin className="w-6 h-6 text-primary" />,
      title: "Address",
      details: BUSINESS_INFO.address,
      action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.address)}`, "_blank", "noopener,noreferrer"),
      ariaLabel: `View our location: ${BUSINESS_INFO.address}`
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Business Hours",
      details: BUSINESS_INFO.businessHours,
      action: null,
      ariaLabel: `Our business hours: ${BUSINESS_INFO.businessHours}`
    }
  ];

  return (
    <>
      <SEO
        title="Contact Us - Ramstone Creative Solutions | Lusaka, Zambia"
        description="Get in touch with Ramstone Creative Solutions for car repair and general supply services in Lusaka. Call +260 974 622 334 or visit us at Great East Road, Avondale."
        keywords="contact Ramstone Lusaka, car repair contact Zambia, auto repair phone number, Great East Road Avondale"
      />
      <div className="min-h-screen">
        {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-700 to-gray-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">Get In Touch</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Ready to get started? Contact us today for a quote or visit our location in Lusaka.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Contact Information</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us. Choose what works best for you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  info.action ? 'cursor-pointer hover:scale-105' : ''
                }`}
                onClick={info.action || undefined}
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    {info.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-dark mb-2">{info.title}</h3>
                  <p className="text-gray-600 text-sm">{info.details}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Send Us a Message</h2>
              <p className="text-lg text-gray-600 mb-8">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+260 XXX XXX XXX"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="What can we help you with?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your needs..."
                    rows={5}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">Visit Our Location</h2>
              <p className="text-lg text-gray-600 mb-6">
                We're located on Great East Road in Avondale, Lusaka. Easy to find and accessible by public transport.
              </p>

              <div className="bg-gray-200 rounded-lg h-96 overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.070532109038!2d28.39116327604105!3d-15.372666012713882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19408961f9465cb7%3A0x1708c3ba6704a26c!2s23%20Great%20East%20Rd%2C%20Lusaka%2C%20Zambia!5e0!3m2!1sen!2sin!4v1749211305082!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            For urgent inquiries or immediate quotes, reach out to us directly via WhatsApp or phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary border-white hover:bg-gray-100"
              onClick={() => openPhoneDialer()}
              aria-label={`Call us at ${BUSINESS_INFO.phoneFormatted}`}
            >
              <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
              Call Now: {BUSINESS_INFO.phoneFormatted}
            </Button>
            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => openWhatsApp(WHATSAPP_MESSAGES.contact)}
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 mr-2" aria-hidden="true" />
              WhatsApp Us
            </Button>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default Contact;