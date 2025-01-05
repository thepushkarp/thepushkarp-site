import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

async function loadGoogleFont(font: string, text: string) {
  const url = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error('failed to load font data');
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || "pushkar's site";
  const subtitle = searchParams.get('subtitle') || '';
  const domain = 'thepushkarp.com';

  // All text content for font loading
  const allText = `${title}${subtitle}${domain}`;

  // Dark theme colors
  const backgroundColor = 'hsl(220, 20%, 10%)'; // --background
  const textColor = 'hsl(60, 15%, 90%)'; // --foreground

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor,
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: '48px 32px',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            gap: '16px',
          }}
        >
          <h2
            style={{
              fontSize: '84px',
              fontWeight: 'bold',
              color: textColor,
              lineHeight: 1.2,
              textAlign: 'center',
              fontFamily: 'Geist Mono',
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <span
              style={{
                fontSize: '36px',
                color: textColor,
                opacity: 0.8,
                textAlign: 'center',
                fontFamily: 'Geist Mono',
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            right: '32px',
            fontSize: '24px',
            color: textColor,
            opacity: 0.8,
            fontFamily: 'Geist Mono',
          }}
        >
          {domain}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist Mono',
          data: await loadGoogleFont('Geist+Mono', title),
          style: 'normal',
        },
        {
          name: 'Geist Mono',
          data: await loadGoogleFont('Geist+Mono', subtitle),
          style: 'normal',
        },
        {
          name: 'Geist Mono',
          data: await loadGoogleFont('Geist+Mono', domain),
          style: 'normal',
        },
      ],
    }
  );
}
