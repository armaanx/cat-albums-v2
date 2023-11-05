import CanvasComponent from "@/components/CanvasComponent";
import { Input } from "@/components/ui/input";

export default function Home() {
  
  return (
    <div className="h-screen w-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="font-bold text-3xl mb-4 ">Cat Albums</h1>
      <div className="w-[300px] h-fit mb-10">
      <Input placeholder="Search Albums"/>
      </div>
      <div className="w-[400px] h-[400px] mx-auto">
      <CanvasComponent />
      </div>
    </div>
  )
}
