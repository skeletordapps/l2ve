import Footer from "./components/home/footer";
import Separator from "./components/home/separator";
import Stage1 from "./components/home/stage1";
import Stage2 from "./components/home/stage2";
import Stage3 from "./components/home/stage3";
import Stage4 from "./components/home/stage4";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* <div className="hidden xl:flex w-full bg-red-200">CU</div> */}
      <Stage1 />
      <Stage2 />
      <Stage3 />
      <Separator />
      <Stage4 />
      <Footer />
    </main>
  );
}
