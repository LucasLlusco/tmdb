import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { ids, types } = await req.json();

    if (ids.length !== types.length) {
      return NextResponse.json(
        { error: "ids and types array length mismatch" },
        { status: 400 }
      );  
    }  

    const apiKey = process.env.TMDB_API_KEY;

    const results = await Promise.all(
      ids.map((id:number, i: number) => 
        fetch(
          `https://api.themoviedb.org/3/${types[i]}/${id}?api_key=${apiKey}`,
        ).then((res) => res.json())
      )
    );

    return NextResponse.json(results);
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
