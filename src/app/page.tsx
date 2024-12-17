import Link from "next/link";
import { ThicknessCard } from "~/components/ThicknessCard";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="">
      <ThicknessCard />
      {/* <Button variant={"ghost"}>Button</Button> */}
    </main>
  );
}
