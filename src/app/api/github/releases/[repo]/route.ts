import { NextResponse } from 'next/server';

const clientId = process.env.NEXT_PUBLIC_GIT_HUB_APP_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_GIT_HUB_APP_CLIENT_SECRET;

export async function GET(request: Request, { params }: { params: { repo: string } }) {
  const { repo } = params;
  const response = await fetch(
    `https://api.github.com/repos/Jun-Murakami/${repo}/releases/latest?client_id=${clientId}&client_secret=${clientSecret}`
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch release information' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json({
    version: data.tag_name.replace('v', ''),
    body: data.body,
  });
}