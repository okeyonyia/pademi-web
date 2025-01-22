import { HOST } from "@/constant/index";

export const organizationSchema = () => {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Techsleight labs",
    url: HOST + "/",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-7011879824",
        contactType: "Customer service",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-8448163667",
        contactType: "Customer support",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-9540271067",
        contactType: "Customer service",
      },
      {
        "@type": "ContactPoint",
        telephone: "+91-8860016671",
        contactType: "Technical support",
      },
    ],
    logo: "/LOGO.webp",
    sameAs: [
      "https://www.facebook.com/krapton",
      "https://twitter.com/krapton786",
      "https://www.linkedin.com/company/krapton",
      "https://www.instagram.com/krapton786/",
      "https://www.youtube.com/channel/UCeWZORQW4uJZbVS_4zarSig",
    ],
  });
};
