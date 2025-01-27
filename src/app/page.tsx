import { webPageSchema } from "@/seo-utils/webPageSchema";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { HOST } from "@/constant";
import HomePage from "@/components/home/page";

const url = `${HOST}/`;
const title = `Pademi - Elevate Team Bonding with Seamless Event Planning`;
const description = `Discover how Pademi simplifies team bonding with effortless event planning. From company outings to department mixers, Pademi provides the tools to create meaningful connections while saving time and resources. Build stronger, happier teams today!`;
const keywords = `Pademi, team bonding, event planning, corporate events, employee engagement, offsites, department mixers, team-building tools, HR solutions, company outings, event coordination, workplace culture, happy hours, team events, employee interaction`;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function PadmiForTeams() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: webPageSchema(title, description, url),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationSchema() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: siteNavigationElement() }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadCrumbSchema(title, HOST, url) }}
      />
      <HomePage />
    </>
  );
}
