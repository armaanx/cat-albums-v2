'use server';
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


const fetchAlbums = async (searchQuery: string) => { 
    if (searchQuery === '' || searchQuery === undefined) {
      return [];
    }
    const response = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchQuery}&api_key=${process.env.NEXT_PUBLIC_LAST_FM_API_KEY}&limit=4&format=json`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results.albummatches.album as Album[];
};
  
export default fetchAlbums;