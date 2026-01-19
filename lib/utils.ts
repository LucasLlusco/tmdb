import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFormattedDate = (date:string, fullMonth:boolean = true) => {
  const newDate = new Date(date);

  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: fullMonth ? 'long' : 'short',
    day: 'numeric' 
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(newDate);
}

export const getUserScore = (userScore:number) => {
  const formattedUserScore = new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(userScore / 100); 
  return Number(formattedUserScore.replace(",", "").replace("%", ""));
}

export const getUserScoreColor = (userScore:number) => {
  let colors = {
    track: "#571435",
    bar: "#db2360"
  }
  
  if(userScore >= 40) {
    colors.track = "#423d0f"
    colors.bar = "#d2d531"
  }
  if(userScore >= 70) {
    colors.track = "#204529",
    colors.bar = "#21d07a"
  }
  return colors;
}

export const getYear = (date:string) => {
  const newDate = new Date(date);
  const formattedYear = newDate.getFullYear(); 
  return formattedYear;
}

export const getRuntime = (runtime: number) => { 
  const hours = Math.floor(runtime / 60); 
  const minutes = runtime % 60; 
  return {hours, minutes};
}

export const isDatePassed = (date: string) => { 
  const currentDate = new Date();
  const date1 = new Date(date);

  if(date1 < currentDate) {
    return true
  } else {
    return false;
  }
}

export const isItemInList = (itemId:number, itemMediaType: "movie" | "tv", items: number[], itemsMediaType: ("movie" | "tv")[]) => {
  const index = items.findIndex(item => item == itemId); 

  const item = items[index];
  const type = itemsMediaType[index];

  if(item == itemId && type == itemMediaType) {
    return {
      isInIt: true,
      index: index
    }
  } else {
    return {
      isInIt: false,
      index: -1
    }
  }
}