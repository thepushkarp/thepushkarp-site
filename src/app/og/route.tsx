import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

// Simple hash function to generate a color from a string
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

function generateColor(str: string): string {
  const hash = hashCode(str);
  return `#${((hash & 0xffffff) | 0x800000).toString(16).padStart(6, '0')}`;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || "pushkar's site";
  const subtitle = searchParams.get('subtitle') || '';

  const bgColor = '#ffffff';
  const textColor = '#1e293b';
  const dominantColor = generateColor(title + subtitle);

  return new ImageResponse(
    (
      <div
        style={{
          background: `linear-gradient(20deg, ${dominantColor}, ${bgColor})`,
          filter: 'contrast(150%) brightness(100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          imageRendering: 'pixelated',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            padding: '48px 32px',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2
              style={{
                fontSize: '64px',
                fontWeight: 'bold',
                letterSpacing: '-0.05em',
                color: textColor,
                lineHeight: 1.2,
              }}
            >
              {title}
            </h2>
            {subtitle && (
              <p
                style={{
                  fontSize: '36px',
                  marginTop: '16px',
                  color: textColor,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          <div
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              color: textColor,
            }}
          >
            thepushkarp.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
