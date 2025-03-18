import { Organization, WebSite, WithContext } from "schema-dts";

export function OrganizationJsonLd() {
  const organizationData: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Cyber Craft",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    logo: "/images/cybercraft.svg",
    sameAs: [
      "https://www.facebook.com/IstiakAhmedTashrif",
      "https://www.twitter.com/istiaktashrif",
      "https://www.linkedin.com/company/istiak01",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+880 17011-37886",
      contactType: "customer service",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
}

export function WebsiteJsonLd() {
  const websiteData: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Cyber Craft",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: process.env.NEXT_PUBLIC_BASE_URL,
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
}
