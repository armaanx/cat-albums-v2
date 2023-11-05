import { type ClassValue, clsx } from "clsx"
import { Metadata } from "next"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = "Cat Albums",
  description = "Generate a cat holding your fav album!",
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string,
  description?: string,
  image?: string,
  icons?: string,
  noIndex?: boolean,
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{
        url: image,
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '',
    },
    icons,
    metadataBase: new URL('https://cat-albums.vercel.app/'),
    themeColor: '#fff',
    ...(noIndex && {
      robots:{
        index: false,
        follow:false,
      }
    })
   }
}