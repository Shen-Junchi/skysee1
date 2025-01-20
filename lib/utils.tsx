import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

interface ApplicationError extends Error {
  info: string;
  status: number;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }

  export const fetches = async (url: string) => {
    const res = await fetch(url);
  
    if (!res.ok) {
      const error = new Error(
        'An error occurred while fetching the data.',
      ) as ApplicationError;
  
      error.info = await res.json();
      error.status = res.status;
  
      throw error;
    }
  
    return res.json();
  };