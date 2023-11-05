'use client'
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

function CanvasComponent() {
    const canvasRef = useRef(null);
   

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
      const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;
      const img: CanvasImageSource = new Image();
      img.src = '/cat.png';
      

      img.onload = function () {
          const img2: CanvasImageSource = new Image();
          img2.src = '/select.png';
          img2.onload = function () {
            const x = (canvas.width - img2.width) / 2;
            const y = (canvas.height - img2.height) / 2;
            //ctx.fillStyle = 'white';
            //ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img2, x-5, y+74, 200, 200);
            ctx.drawImage(img, 0, 0, 382, 383);

          }
        console.log('yo')
      };
  }, []);
    
  const handleDownload = () => {
    const link = document.createElement('a');
    const canvas: HTMLCanvasElement = canvasRef.current!;
    const dataURL = canvas.toDataURL('image/png');
    link.href = dataURL;
    const uniqueName = Date.now();
    link.download = `${uniqueName}.png`;
    link.click();
  };

    return (
        <div className="flex flex-col items-center justify-center">
            <canvas ref={canvasRef} width={400} height={400}></canvas>
            <Button onClick={handleDownload} className="mt-4">Download</Button>
        </div>
    );
}

export default CanvasComponent;
