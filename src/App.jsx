import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import About from './sections/About';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="alche-wrapper">
      <Navbar />
      <Hero />
      <main>
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
