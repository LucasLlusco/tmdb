"use server"
export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const getTrending = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzVjNjE3Y2ExNzg2Yzg5ZTMzMDkxOTViZTk0MmI2NiIsIm5iZiI6MTcyMjYzODY4MS44NTk0NTIsInN1YiI6IjY0NWM4MTAxMTU2Y2M3MDExZTAxZmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0zX6iGh8qpLNuXrgTnL1sFlSavRWSpTeq4FcQN29nkM'
      }
    };
   const response = await fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
   const data = response.json();

   return data;
  } catch (error) {
    console.log(error)
  }
}

export const getPopular = async () => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzVjNjE3Y2ExNzg2Yzg5ZTMzMDkxOTViZTk0MmI2NiIsIm5iZiI6MTcyMjYzODY4MS44NTk0NTIsInN1YiI6IjY0NWM4MTAxMTU2Y2M3MDExZTAxZmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0zX6iGh8qpLNuXrgTnL1sFlSavRWSpTeq4FcQN29nkM'
      }
    };

   const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
   const data = response.json();  
   return data;
  } catch (error) {
    console.log(error)
  }
}

