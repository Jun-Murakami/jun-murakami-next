import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { ImageResponse } from 'next/og';

import { APP_BY_SLUG, APPS } from '@/data/apps';
import { ja } from '@/locales/ja';

export const alt = 'Jun Murakami App Factory';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return APPS.map((app) => ({ slug: app.slug }));
}

// Fetch a Google Fonts subset for the given text in TTF format. Satori in
// next/og can't decode woff2, so we use the legacy CSS endpoint without a
// modern User-Agent to coerce a TTF response. Returns null on failure so
// rendering still succeeds (with a fallback font, even if Japanese glyphs go
// missing).
async function fetchGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css?family=${encodeURIComponent(
      family,
    )}:${weight}&text=${encodeURIComponent(text)}`;
    const cssRes = await fetch(url);
    if (!cssRes.ok) return null;
    const css = await cssRes.text();
    const match = css.match(
      /src: url\((https:[^)]+)\) format\('truetype'\)/,
    );
    if (!match) return null;
    const fontRes = await fetch(match[1]);
    if (!fontRes.ok) return null;
    return await fontRes.arrayBuffer();
  } catch {
    return null;
  }
}

interface ImageProps {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const app = APP_BY_SLUG[slug];
  if (!app) {
    return new Response('Not Found', { status: 404 });
  }

  const text = ja.apps[app.localeKey];
  const title = text.title;
  const description = text.description;

  // Read screenshot directly from disk so this works at build time without a
  // running server.
  const screenshotBuffer = await readFile(
    path.join(process.cwd(), 'src/assets/screenshots', app.screenshotFile),
  );
  const screenshotDataUrl = `data:image/jpeg;base64,${screenshotBuffer.toString('base64')}`;

  // Fetch only the glyphs we actually need.
  const fontText = `Jun Murakami App Factory${title}${description}`;
  const [boldFont, regularFont] = await Promise.all([
    fetchGoogleFont('Noto Sans JP', 700, fontText),
    fetchGoogleFont('Noto Sans JP', 400, fontText),
  ]);

  const fonts: Array<{
    name: string;
    data: ArrayBuffer;
    style: 'normal';
    weight: 400 | 700;
  }> = [];
  if (boldFont) {
    fonts.push({
      name: 'Noto Sans JP',
      data: boldFont,
      style: 'normal',
      weight: 700,
    });
  }
  if (regularFont) {
    fonts.push({
      name: 'Noto Sans JP',
      data: regularFont,
      style: 'normal',
      weight: 400,
    });
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(135deg, #0a0e27 0%, #14143a 50%, #1a1042 100%)',
          padding: 60,
          fontFamily: fonts.length ? 'Noto Sans JP' : 'sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            fontSize: 20,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.65)',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 32,
          }}
        >
          Jun Murakami App Factory
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            gap: 44,
            alignItems: 'center',
          }}
        >
          {/* biome-ignore lint/performance/noImgElement: Satori only supports raw img */}
          <img
            src={screenshotDataUrl}
            width={520}
            height={350}
            alt=""
            style={{
              objectFit: 'cover',
              borderRadius: 16,
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
              flex: 1,
            }}
          >
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                lineHeight: 1.05,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.78)',
                lineHeight: 1.5,
              }}
            >
              {description}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
      fonts: fonts.length ? fonts : undefined,
    },
  );
}
