'use client'
import CanvasComponent from "@/components/CanvasComponent";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";

import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Loader2, X } from "lucide-react";
import useDebounce from "@/lib/useDebounce";
import fetchAlbums from "@/components/fetchAlbum";



export default function Home() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [imgsrc, setImgSrc] = useState("/select.png");
  const [hidden, setHidden] = useState<boolean>(false);

  const debouncedSearchValue = useDebounce(searchValue, 500);


  const { data: items, isLoading, error } = useQuery({
    queryKey: ['albums', debouncedSearchValue],
    queryFn: () => fetchAlbums(debouncedSearchValue),
    enabled: debouncedSearchValue !== '' || debouncedSearchValue !== undefined,
  });



  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    setHidden(false);
  }
  const handleClear = () => { 
    setSearchValue('');
    setHidden(true);
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
        
        {isLoading && searchValue !== '' &&
          <div className="absolute left-0 mt-2 w-full bg-popover p-1 rounded-md shadow-md z-10 text-center">
            <Loader2 className="h-7 w-7 animate-spin mx-auto" />
        </div>}
        {items && !isLoading ? (<div hidden={hidden} className="absolute left-0 mt-2 w-full bg-popover rounded-md shadow-md z-10 ">

          <ul>
          {items?.map((item) => {
            return (
              <li key={item.url} className="font-semibold text-sm p-3 hover:bg-muted cursor-pointer" onClick={
                () => {
                  setImgSrc(item.image[3]["#text"]);
                  setSearchValue('');
                  setHidden(prev=>!prev);
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
