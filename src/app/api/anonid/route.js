// import { NextResponse } from 'next/server';
// import { randomUUID } from 'crypto';

// export async function GET() {
//   const response = NextResponse.next();
//   const cookieHeader = response.headers.get('cookie') || '';
//   const existingId = cookieHeader
//     .split('; ')
//     .find((row) => row.startsWith('anonId='))
//     ?.split('=')[1];

//   if (existingId) {
//     return NextResponse.json({ anonId: existingId });
//   }

//   const anonId = randomUUID();

//   const res = NextResponse.json({ anonId });
//   res.cookies.set('anonId', anonId, {
//     path: '/',
//     maxAge: 60 * 60 * 24 * 365,
//     httpOnly: false,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//   });

//   return res;
// }



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

  // ensure every emoji key exists
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
  console.log(emoji, slug, 'slugged');

  if (!EMOJIS.includes(emoji) || !slug) {
    return NextResponse.json({ error: 'Invalid emoji or slug' }, { status: 400 });
  }

  const data = getOrCreateReactionData();

  // remove slug from all other emoji arrays
  for (const e of EMOJIS) {
    if (e !== emoji) {
      data[e] = data[e].filter((s) => s !== slug);
    }
  }

  // toggle: if already selected, remove; else add
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
