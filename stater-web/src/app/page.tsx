import NavBar from "./navbar";
import Link from 'next/link';
import Hero from './hero';
import InfoSection from "./infoSection";
import CardSection from "./cardSection";
import RampSection from "./rampSection";
import Footer from './footer';

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <InfoSection />
      <CardSection />
      <RampSection />
      <Footer />
    </main>
  );
}