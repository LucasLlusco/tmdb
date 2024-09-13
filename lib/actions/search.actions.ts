"use server"

export const getSearchedItems = async ({query, type, page}: any) => {
  try {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYzVjNjE3Y2ExNzg2Yzg5ZTMzMDkxOTViZTk0MmI2NiIsIm5iZiI6MTcyMjYzODY4MS44NTk0NTIsInN1YiI6IjY0NWM4MTAxMTU2Y2M3MDExZTAxZmYwNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0zX6iGh8qpLNuXrgTnL1sFlSavRWSpTeq4FcQN29nkM'
      }
    };
    
    const response = await fetch(`https://api.themoviedb.org/3/search/${type}?query=${query}&language=en-US&page=${page}`, options)
    const data = response.json();

    return data;
  } catch (error) {
    console.log(error)
  }
}