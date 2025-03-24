import { webPageSchema } from "@/seo-utils/webPageSchema";
import { organizationSchema } from "@/seo-utils/organizationSchema";
import { siteNavigationElement } from "@/seo-utils/siteNavigationElement";
import { breadCrumbSchema } from "@/seo-utils/breadCrumbSchema";
import { createMetaData } from "@/seo-utils/CommonMeta";
import { HOST } from "@/constant";
import DownloadApp from "@/components/downloadApp/page";

const url = `${HOST}/download-app`;
const title = `Download Pademi App - Secure & Private`;
const description = `Get the Pademi app now! Enjoy seamless connectivity with top-notch privacy. Available for Android, iOS, and Web. Download today!`;
const keywords = `Pademi app download, secure app, private communication, Android app, iOS app, web app, online safety, data privacy`;
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
      <DownloadApp />
    </>
  );
}
