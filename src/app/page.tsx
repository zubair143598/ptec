import Hero from "@/component/home/Hero"
import Welcome from "@/component/home/Welcome"
import Register from "@/component/home/Register"
import ModeOf from "@/component/home/ModeOF"

export default function Home() {
  return (
    <div>
      <Hero />
      <Welcome />
      <Register />
      <ModeOf />
    </div>
  );
}
