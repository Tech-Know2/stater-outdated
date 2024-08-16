import NavBar from "./navbar";
import Link from 'next/link';
import Hero from './hero';
import InfoSection from "./infoSection";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <InfoSection />
    </main>
  );
}