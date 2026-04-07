import type { Metadata } from 'next';
import redirectsConfig from '@/redirects.json';

type RedirectEntry = {
  aliases?: string[];
  result: string;
  title?: string;
  description?: string;
  image?: string;
};

type Params = Promise<{ alias: string }>;

const findRedirectByAlias = (alias: string) => {
  const normalized = alias.toLowerCase();

  for (const [, entry] of Object.entries(
    redirectsConfig as Record<string, RedirectEntry>
  )) {
    if (!entry?.result) continue;

    const key = Object.keys(redirectsConfig).find((k) => {
      const e = (redirectsConfig as Record<string, RedirectEntry>)[k];
      return (
        k.toLowerCase() === normalized ||
        e.aliases?.some((a) => a.toLowerCase() === normalized)
      );
    });

    if (key) {
      return entry;
    }
  }

  return null;
};

export async function generateMetadata(props: {
  params: Params;
}): Promise<Metadata> {
  const { alias } = await props.params;
  const entry = findRedirectByAlias(alias);

  if (!entry) {
    return { title: 'Not Found' };
  }

  const title = entry.title || 'Fluxer Gaming';
  const description =
    entry.description ||
    'The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!';
  const image = entry.image || '/card.png';
  const url = entry.result;

  return {
    metadataBase: new URL('https://fluxer.games'),
    title,
    description,
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      siteName: 'Fluxer Gaming',
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function EmbedAliasPage(props: { params: Params }) {
  const { alias } = await props.params;
  const entry = findRedirectByAlias(alias);

  if (!entry) {
    return (
      <main>
        <p>Link not found.</p>
      </main>
    );
  }

  return (
    <main>
      <p>
        Fluxer Gaming preview. Continue to{' '}
        <a href={entry.result}>{entry.result}</a>.
      </p>
    </main>
  );
}
