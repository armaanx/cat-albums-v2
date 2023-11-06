'use client'
import { useEffect, useRef, useState} from "react";
import { Button } from "./ui/button";
import { Cat, Download } from "lucide-react";

function CanvasComponent({ imgsrc }: { imgsrc: string }) {
    const canvasRef = useRef(null);
    const [catsrc, setCatSrc] = useState<string>('/cat2.png');

    //const [isBg, setIsBg] = useState<boolean>(false);
   

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
      const img: CanvasImageSource = new Image();
      img.src = `${catsrc}`;
      img.crossOrigin = 'anonymous';

    

      img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
          const img2: CanvasImageSource = new Image();
          img2.src = `${imgsrc}`;
          img2.crossOrigin = 'anonymous';
          img2.onload = function () {
            img2.width = 200;
            img2.height = 200;
            const x = (canvas.width - img2.width) / 2;
            const y = (canvas.height - img2.height) / 2;
              
            ctx.drawImage(img2, x-5, y+74, 200, 200);
            ctx.drawImage(img, 0, 0, 382, 383);

          }
      };
  }, [imgsrc, catsrc]);
    
  const handleDownload = () => {
    const link = document.createElement('a');
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const dataURL = canvas.toDataURL('image/png',1.0);
    link.href = dataURL;
    const uniqueName = Date.now();
    link.download = `${uniqueName}.png`;
    link.click();
    };
    const handleCatChange = () => { 
        setCatSrc((prev) => {
          if (prev === '/cat2.png') return '/cat3.png';
          if (prev === '/cat3.png') return '/cat4.png';
          if (prev === '/cat4.png') return '/cat2.png';
          return prev;
        })
      }
    

    return (
        <div className="flex flex-col items-center justify-center">
            <canvas ref={canvasRef} width={400} height={400}></canvas>
            <div className="flex flex-row items-center justify-center gap-3 mt-4">
                <Button variant={'default'} disabled={imgsrc === '/select.png' || imgsrc === undefined} onClick={handleDownload}><Download className="h-5 w-5" /></Button>
                <Button onClick={handleCatChange}><Cat className="h-5 w-5" /></Button>
            </div>
            {/* <Button onClick={() => setIsBg(prev => !prev)} className="mt-4">Toggle Background</Button> */}
        </div>
    );
}

export default CanvasComponent;
