import { getMovieById } from '@/services/tmdb/movies';
import { getTvShowById } from '@/services/tmdb/tvShows';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { ids, types } = await req.json();

    if(ids.length !== types.length) {
      return NextResponse.json(
        { error: "ids and types array length mismatch" },
        { status: 400 }
      );  
    }  

    const data = await Promise.all(
      ids.map((id:number, index: number) => 
        types[index] === "movie" ? getMovieById(id) : getTvShowById(id)
      )
    );

    const results: MediaItem[] = data.map((item, index) => ({
      ...item,
      media_type: types[index]
    }));

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}