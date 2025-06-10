import { useEffect } from "react";
import { SEO_DATA, BUSINESS_INFO } from "@/lib/constants";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const SEO = ({
  title = SEO_DATA.title,
  description = SEO_DATA.description,
  keywords = SEO_DATA.keywords,
  image = "/images/og-image.jpg",
  url = BUSINESS_INFO.website,
  type = "website",
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute("content", content);
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("author", SEO_DATA.author);

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:type", type, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:image", image, true);
    updateMetaTag("og:site_name", BUSINESS_INFO.name, true);

    // Twitter Card tags
    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    // Business-specific meta tags
    updateMetaTag("geo.region", "ZM-09"); // Lusaka Province
    updateMetaTag("geo.placename", "Lusaka");
    updateMetaTag("geo.position", "-15.3875;28.3228"); // Approximate coordinates for Lusaka
    updateMetaTag("ICBM", "-15.3875, 28.3228");

    // Structured data for local business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "AutoRepair",
      "name": BUSINESS_INFO.name,
      "description": description,
      "url": url,
      "telephone": BUSINESS_INFO.phone,
      "email": BUSINESS_INFO.email,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "23A Great East Road",
        "addressLocality": "Avondale",
        "addressRegion": "Lusaka",
        "addressCountry": "ZM"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -15.3875,
        "longitude": 28.3228
      },
      "openingHours": "Mo-Fr 08:00-17:00, Sa 08:00-14:00",
      "priceRange": "$$",
      "serviceArea": {
        "@type": "City",
        "name": "Lusaka"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Auto Repair Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Panel Beating"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Spray Painting"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "General Supply"
            }
          }
        ]
      }
    };

    // Update or create structured data script
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]');
    if (!structuredDataScript) {
      structuredDataScript = document.createElement("script");
      structuredDataScript.type = "application/ld+json";
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url, type]);

  return null; // This component doesn't render anything
};

export default SEO;
