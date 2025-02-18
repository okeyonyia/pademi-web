import { webPageSchema } from "@/seo-utils/webPageSchema";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { HOST } from "@/constant";
import PrivacyPolicyPage from "@/components/legal/privacyPolicy/page";

const url = `${HOST}/privacy-policy`;
const title = `Privacy Policy - Pademi`;
const description = `Learn how Pademi collects, uses, and protects your personal information. Read our Privacy Policy to understand your rights and our commitment to safeguarding your data.`;
const keywords = `Pademi privacy policy, data protection, user privacy, personal information, data security, privacy rights, GDPR compliance, online safety, information usage, privacy terms`;

export const metadata = {
  ...createMetaData({ title, description, keywords, url }),
};

export default function PrivacyPolicy() {
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
      <PrivacyPolicyPage />
    </>
  );
}
