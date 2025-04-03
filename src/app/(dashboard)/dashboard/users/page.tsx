import { webPageSchema } from "@/seo-utils/webPageSchema";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { HOST } from "@/constant";
import UsersData from "@/components/dashboard/Users";

const url = `${HOST}/dashboard/users`;
const title = `Pademi - Where experiences bring us together—no endless texting, just real connections.`;
const description = `Discover events, plan 1-on-1 hangouts, let friends match you with someone new—and even link your IG so they can invite you right from your bio. `;
const keywords = `Pademi, event planning, corporate events, employee engagement, offsites, department mixers, team-building tools, HR solutions, company outings, event coordination, workplace culture, happy hours, team events, employee interaction`;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function Users() {
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
      <UsersData />
    </>
  );
}
