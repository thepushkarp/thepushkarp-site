import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function seededRandom(seed: number): () => number {
  return function () {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
}

// Enhanced Perlin noise with multiple octaves
function perlinNoise(x: number, y: number, seed: number): number {
  const rand = seededRandom(seed);

  // Combine multiple octaves of noise
  let amplitude = 1.0;
  let frequency = 1.0;
  let noise = 0;
  let maxValue = 0;

  for (let i = 0; i < 3; i++) {
    noise += amplitude * Math.sin((x * frequency * 12.9898 + y * frequency * 78.233 + seed * 43758.5453) * 43758.5453);
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }

  // Normalize
  noise = noise / maxValue;

  return rand() * noise;
}

function getFieldDirection(x: number, y: number, seed: number): number {
  const noiseScale = 0.008; // Slightly increased scale
  const timeComponent = Math.sin(seed * 0.01) * 0.2; // Subtle rotation based on seed

  // Combine different frequencies
  const baseNoise = perlinNoise(x * noiseScale, y * noiseScale, seed);
  const highFreqNoise = perlinNoise(x * noiseScale * 2, y * noiseScale * 2, seed + 1000) * 0.5;

  const angle = (baseNoise + highFreqNoise + timeComponent) * Math.PI * 2;
  return angle;
}

function getDensityValue(x: number, y: number, seed: number): number {
  const baseNoiseScale = 0.005;
  const highFreqNoiseScale = 0.02;

  // Combine different frequencies of noise
  const baseNoise = perlinNoise(x * baseNoiseScale, y * baseNoiseScale, seed + 2000);
  const highFreqNoise = perlinNoise(x * highFreqNoiseScale, y * highFreqNoiseScale, seed + 3000) * 0.3;
  const timeComponent = Math.sin(seed * 0.01 + (x + y) * 0.001) * 0.1;

  const density = Math.abs(baseNoise + highFreqNoise + timeComponent);
  return Math.max(0, Math.min(1, density)); // Clamp between 0-1
}

function getArrowColor(x: number, y: number, width: number, height: number, hue: number, density: number): string {
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDistance = Math.hypot(centerX, centerY);
  const distance = Math.hypot(x - centerX, y - centerY);
  const normalizedDistance = distance / maxDistance;

  // Use density to affect color properties
  const lightness = 20 + density * 60; // Varies from 20% to 80%
  const saturation = 90 - density * 40; // Varies from 90% to 50%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateVectorField(title: string, subtitle: string, width: number, height: number): string {
  const seed = hashCode(`${title}${subtitle}`);
  const hue = ((seed % 360) + 360) % 360;
  const baseSpacing = 15; // Decreased from 20 to 15 for more arrows
  const arrowSize = 8;
  const arrows: string[] = [];

  for (let x = 0; x <= width; x += baseSpacing) {
    for (let y = 0; y <= height; y += baseSpacing) {
      const angle = getFieldDirection(x, y, seed);
      const density = getDensityValue(x, y, seed);
      const color = getArrowColor(x, y, width, height, hue, density);

      const tipX = x + Math.cos(angle) * arrowSize;
      const tipY = y + Math.sin(angle) * arrowSize;

      const baseWidth = arrowSize * 0.6;
      const baseAngle1 = angle + Math.PI / 2;
      const baseAngle2 = angle - Math.PI / 2;

      const baseX1 = x + Math.cos(baseAngle1) * (baseWidth / 2);
      const baseY1 = y + Math.sin(baseAngle1) * (baseWidth / 2);
      const baseX2 = x + Math.cos(baseAngle2) * (baseWidth / 2);
      const baseY2 = y + Math.sin(baseAngle2) * (baseWidth / 2);

      arrows.push(`
        <polygon points="${tipX},${tipY} ${baseX1},${baseY1} ${baseX2},${baseY2}" fill="${color}" />
      `);
    }
  }

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      ${arrows.join('')}
    </svg>
  `;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || "pushkar's site";
  const subtitle = searchParams.get('subtitle') || '';

  const bgColor = '#ffffff';
  const textColor = '#1e293b';

  const vectorFieldSvg = generateVectorField(title, subtitle, 1200, 630);
  const vectorFieldDataUrl = `data:image/svg+xml,${encodeURIComponent(vectorFieldSvg)}`;

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: bgColor,
          backgroundImage: `url("${vectorFieldDataUrl}")`,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            <h2
              style={{
                fontSize: '84px',
                fontWeight: 'bold',
                color: textColor,
                lineHeight: 1.2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '8px',
              }}
            >
              {title}
            </h2>
          </div>
          {/* <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '16px',
              borderRadius: '8px',
            }}
          >
            {subtitle && (
              <span style={{ fontSize: '36px', marginTop: '16px', color: textColor, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                {subtitle}
              </span>
            )}
          </div> */}
          <div
            style={{
              alignSelf: 'flex-end',
              fontSize: '24px',
              color: textColor,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '8px',
              borderRadius: '8px',
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
