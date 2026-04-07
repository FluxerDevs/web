import type { Metadata } from 'next';

const ROOT_REDIRECT_URL = 'https://fluxer.gg/eDfgY33P';
const TITLE = 'Fluxer Gaming';
const DESCRIPTION =
  'The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!';

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
        url: '/card.png',
        alt: TITLE,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/card.png'],
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
