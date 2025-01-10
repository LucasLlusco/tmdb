import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date:string) => {
  const newDate = new Date(date);
  const formattedDate = newDate.toLocaleDateString('en-GB'); 
  return formattedDate;
}

export const formatUserScore = (userScore:number) => {
  const formattedUserScore = new Intl.NumberFormat("default", {
    style: "percent",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(userScore / 100); 
  return Number(formattedUserScore.replace(",", "").replace("%", ""));
}

export const formatUserScoreColor = (userScore:number) => {
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

export const formatYear = (date:string) => {
  const newDate = new Date(date);
  const formattedYear = newDate.getFullYear(); 
  return formattedYear;
}

export const formatRuntime = (runtime: number) => { 
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