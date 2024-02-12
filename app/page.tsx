import Footer from "./components/home/footer";
import Separator from "./components/home/separator";
import Stage1 from "./components/home/stage1";
import Stage2 from "./components/home/stage2";
import Stage3 from "./components/home/stage3";
import Stage4 from "./components/home/stage4";
import Stage5 from "./components/home/stage5";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Stage1 />
      <Stage2 />
      <Stage3 />
      <Separator />
      <Stage4 />
      <Stage5 />
      <Footer />
    </main>
  );
}
