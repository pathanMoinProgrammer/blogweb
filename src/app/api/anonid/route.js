import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

const EMOJIS = ['love', 'like', 'fire', 'laugh', 'angry'];

function getOrCreateReactionData() {
  const store = cookies();
  let data = {};
  let anonId = store.get('anonId')?.value;

  if (!anonId) anonId = randomUUID();

  const raw = store.get('reactionsData')?.value;
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      data = {};
    }
  }

  EMOJIS.forEach((emoji) => {
    if (!Array.isArray(data[emoji])) data[emoji] = [];
  });

  data.anonId = anonId;

  return data;
}

export async function GET() {
  const data = getOrCreateReactionData();

  const res = NextResponse.json(data);
  res.cookies.set('anonId', data.anonId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365 * 2,
    httpOnly: false,
    sameSite: 'lax',
  });
  res.cookies.set('reactionsData', JSON.stringify(data), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365 * 2,
    httpOnly: false,
    sameSite: 'lax',
  });
  return res;
}

export async function POST(req) {
  const { emoji, slug } = await req.json();
  // console.log(emoji, slug, 'slugged');

  if (!EMOJIS.includes(emoji) || !slug) {
    return NextResponse.json(
      { error: 'Invalid emoji or slug' },
      { status: 400 },
    );
  }

  const data = getOrCreateReactionData();

  for (const e of EMOJIS) {
    if (e !== emoji) {
      data[e] = data[e].filter((s) => s !== slug);
    }
  }

  if (data[emoji].includes(slug)) {
    data[emoji] = data[emoji].filter((s) => s !== slug);
  } else {
    data[emoji].push(slug);
  }

  const res = NextResponse.json(data);
  res.cookies.set('anonId', data.anonId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365 * 2,
    httpOnly: false,
    sameSite: 'lax',
  });
  res.cookies.set('reactionsData', JSON.stringify(data), {
    path: '/',
    maxAge: 60 * 60 * 24 * 365 * 2,
    httpOnly: false,
    sameSite: 'lax',
  });

  return res;
}
