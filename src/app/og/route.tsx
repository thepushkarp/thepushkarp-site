import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || "pushkar's site";
  const subtitle = searchParams.get('subtitle') || '';
  const theme = searchParams.get('theme') || 'light';

  const bgClass = theme === 'dark' ? 'bg-slate-800' : 'bg-white';
  const textClass = theme === 'dark' ? 'text-white' : 'text-slate-800';

  const fontRegular = readFileSync(join(process.cwd(), 'public/fonts/Geist-Regular.ttf'));
  const fontBold = readFileSync(join(process.cwd(), 'public/fonts/Geist-Bold.ttf'));

  return new ImageResponse(
    (
      <div tw={`flex flex-col w-full h-full items-center justify-center antialiased ${bgClass}`}>
        <div tw="flex flex-col w-full py-12 px-8 items-start justify-between h-full">
          <div tw="flex flex-col">
            <h2 tw={`text-5xl font-bold tracking-tight ${textClass}`}>{title}</h2>
            {subtitle && <p tw={`text-3xl mt-4 ${textClass}`}>{subtitle}</p>}
          </div>
          <div tw={`self-end text-xl ${textClass}`}>thepushkarp.com</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Geist',
          data: fontRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Geist',
          data: fontBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
