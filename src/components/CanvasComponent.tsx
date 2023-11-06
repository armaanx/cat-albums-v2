'use client'
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

function CanvasComponent({ imgsrc}: { imgsrc: string }) {
    const canvasRef = useRef(null);
    //const [isBg, setIsBg] = useState<boolean>(false);
   

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
      const img: CanvasImageSource = new Image();
      img.src = '/cat.png';
      img.crossOrigin = 'anonymous';

    

      img.onload = function () {
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
  }, [imgsrc]);
    
  const handleDownload = () => {
    const link = document.createElement('a');
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const dataURL = canvas.toDataURL('image/png',1.0);
    link.href = dataURL;
    const uniqueName = Date.now();
    link.download = `${uniqueName}.png`;
    link.click();
  };

    return (
        <div className="flex flex-col items-center justify-center">
            <canvas ref={canvasRef} width={400} height={400}></canvas>
            <Button disabled={imgsrc === '/select.png' || imgsrc === undefined} onClick={handleDownload} className="mt-4">Download</Button>
            {/* <Button onClick={() => setIsBg(prev => !prev)} className="mt-4">Toggle Background</Button> */}
        </div>
    );
}

export default CanvasComponent;
