import { TMDB_IMG_URLS } from '@/constants';
import { tmdbFetch } from '@/services/tmdb/tmdbFetch';
import { tmdbUrls } from '@/services/tmdb/urls';
import { TmdbPaginatedResponse } from '@/types/tmdb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { type, params } = await req.json();

    if(!type || !params) {
      return NextResponse.json({ error: "type or params not provided" }, { status: 400 });
    }

    const data = await tmdbFetch<TmdbPaginatedResponse<MediaItem>>(tmdbUrls.shared.popular(type), params);
    
    const results: MediaItem[] = data.results.map((item) => ({
      ...item,
      media_type: type,
      poster_path: `${TMDB_IMG_URLS.media}${item.poster_path}`,
    }));

    return NextResponse.json({...data, results});
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}