import type { Metadata } from 'next';
import redirectsConfig from '@/redirects.json';

const config = redirectsConfig as {
  defaults?: {
    result?: string;
    title?: string;
    description?: string;
    image?: string;
  };
};

const ROOT_REDIRECT_URL = config.defaults?.result || 'https://fluxer.gg/eDfgY33P';
const TITLE = config.defaults?.title || 'Fluxer Gaming';
const DESCRIPTION =
  config.defaults?.description ||
  'The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!';
const IMAGE = config.defaults?.image || '/card.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://fluxer.games'),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    title: TITLE,
    description: DESCRIPTION,
    url: ROOT_REDIRECT_URL,
    siteName: TITLE,
    images: [
      {
        url: IMAGE,
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function EmbedRootPage() {
  return (
    <main>
      <p>
        Fluxer Gaming preview. Continue to{' '}
        <a href={ROOT_REDIRECT_URL}>{ROOT_REDIRECT_URL}</a>.
      </p>
    </main>
  );
}
