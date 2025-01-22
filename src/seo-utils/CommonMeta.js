import { HOST } from "@/constant/index";

export const createMetaData = ({
  url = `${HOST}`,
  title = "Pademi for Teams - Elevate Your Team Bonding",
  description = `Pademi for Teams simplifies company outings, one-on-one chats, and department mixers. Plan events effortlessly without messy group chats or endless email threads. Let Pademi help your team bond, grow, and succeed.`,
  keywords = `team bonding, company outings, employee engagement, corporate events, offsites, department mixers, happy hours, team-building, employee interaction, HR tools, event planning, corporate discounts, team events`,
  image = "/LOGO.webp",
} = {}) => {
  return {
    metadataBase: new URL(HOST),
    title,
    description,
    keywords,
    url,
    openGraph: {
      type: "website",
      url: url,
      title,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: HOST,
      title,
      description,
      images: [image],
    },
    icons: {
      other: [
        { rel: "canonical", url: url },
        {
          rel: "image_src",
          url: image,
        },
      ],
    },
  };
};
