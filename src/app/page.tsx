'use client'
import CanvasComponent from "@/components/CanvasComponent";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import  axios  from 'axios';
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { it } from "node:test";

 interface Album {
  artist:     string;
  image:      Image[];
  mbid:       string;
  name:       string;
  streamable: string;
  url:        string;
 }
 interface Image {
  "#text": string;
  size:    string;
 }
 
  

export default function Home() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Album[]>([]);
  const [imgsrc, setImgSrc] = useState("/select.png");

  
 

  useEffect(() => {
    if (searchValue === '' || searchValue === undefined) {
      setSearchResults([]);
    }
    if (searchValue != "") {
       fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchValue}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&limit=4&format=json`)
        .then((response) => response.json())
        .then((data) => {
          setSearchResults(data.results.albummatches.album);
        }).catch(error => {
          console.log(error);
        });
    }
    console.log(searchValue)

  }, [searchValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  }
  const handleClear = () => { 
    setSearchValue('');
    setSearchResults([]);
  };
  
  return (
    <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center">
      <div className="flex flex-row items-baseline justify-center space-x-4 w-[300px]">
      <h1 className="font-bold text-3xl mb-4 ">Cat Albums</h1>
      <ThemeToggle />
      </div>
      
      <div className="relative w-[300px] mb-10">
        <Input
        value={searchValue}
        aria-label="Search Albums"
        placeholder="Search Albums..."
        onChange={handleChange}
        type="text"
      />
      
        <X onClick={handleClear} className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 hover:text-black dark:hover:text-white animate-in"/>
        
        {searchResults.length !== 0 ? (<div className="absolute left-0 mt-2 w-full bg-popover rounded-md shadow-md z-10 ">

          <ul>
          {searchResults.map((item : Album) => {
            return (
              <li key={item.url} className="font-semibold text-sm p-3 hover:bg-muted" onClick={
                () => {
                  setImgSrc(item.image[3]["#text"]);
                  setSearchResults([]);
                  setSearchValue('');
                }
              }>
                <div className="grid grid-flow-col grid-cols-3 items-center justify-center gap-3 mb-2 text-center  ">
                  <img src={item.image[1]["#text"]} />
                  <p className="truncate text-left">{item.name}</p>
                  <p className="truncate">{item.artist}</p>
                </div>
                <Separator />
              </li>
            )
          })}
          </ul>
                
        </div>): null}
        
      
    </div>





      <div className="w-[400px] h-[400px] mx-auto">
        <CanvasComponent imgsrc={imgsrc} />
      </div>
    </div>
  )
}
