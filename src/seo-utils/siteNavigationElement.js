import { HOST } from "@/constant/index";

export const siteNavigationElement = () => {
  return JSON.stringify({
    "@context": "http://schema.org",
    "@type": "siteNavigationElement",
    potentialAction: {
      "@type": "SearchAction",
      target: HOST + "/search?&q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    name: ["Home", "Services", "Products", "Careers", "Blogs", "Hire Us"],
    url: [
      HOST + "/",
      HOST + "/services",
      HOST + "/products",
      HOST + "/careers",
      HOST + "/blog",
      HOST + "/hire-us",
    ],
  });
};
