import { webPageSchema } from "@/seo-utils/webPageSchema";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { HOST } from "@/constant";
import BusinessPage from "@/components/business/page";

const url = `${HOST}/`;
const title = `Pademi - Empower Your Team with Meaningful Connections`;
const description = `Transform your team dynamics with Pademi! Simplify event planning and foster meaningful connections through memorable corporate events. Build stronger, happier teams effortlessly with tools designed for modern workplaces. Start creating extraordinary moments today!`;
const keywords = `Pademi, team connections, event planning made easy, corporate events, team-building, employee engagement, offsite events, HR solutions, workplace happiness, meaningful team interactions, event coordination tools, workplace culture, social team events`;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function PadmiForUsers() {
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
      <BusinessPage />
    </>
  );
}
