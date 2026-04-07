import type { Metadata } from 'next';
import redirectsConfig from '@/redirects.json';

type RedirectEntry = {
  aliases?: string[];
  result: string;
  title?: string;
  description?: string;
  image?: string;
};

type RedirectsConfig = {
  defaults?: {
    result?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  redirects?: Record<string, RedirectEntry>;
};

type Params = Promise<{ alias: string }>;

const config = redirectsConfig as RedirectsConfig;
const redirects = config.redirects || {};
const defaults = config.defaults || {};

const resolveValue = (value: string | undefined, defaultValue: string | undefined): string => {
  if (value === '@default') return defaultValue || '';
  return value || defaultValue || '';
};

const findRedirectByAlias = (alias: string) => {
  const normalized = alias.toLowerCase();

  for (const [, entry] of Object.entries(redirects)) {
    if (!entry?.result) continue;

    const matches =
      Object.keys(redirects).find((k) => {
        const e = redirects[k];
        return (
          k.toLowerCase() === normalized ||
          e.aliases?.some((a) => a.toLowerCase() === normalized)
        );
      }) !== undefined;

    if (matches) {
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

  const title = resolveValue(entry.title, defaults.title) || 'Fluxer Gaming';
  const description =
    resolveValue(
      entry.description,
      defaults.description
    ) ||
    'The First and Best Gaming community in Fluxer, LFG, groups, games and free stuff!';
  const image = resolveValue(entry.image, defaults.image) || '/card.png';
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
