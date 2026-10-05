import { useEffect, useState } from 'react';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';
import NavBar from './NavBar.jsx';
import { ArrowIcon, LeafIcon } from './Icons.jsx';
import './App.css';

function readPage() {
  const page = window.location.hash.slice(1);
  return ['plants', 'cart'].includes(page) ? page : 'home';
}

export default function App() {
  const [page, setPage] = useState(readPage);

  useEffect(() => {
    const handleHashChange = () => setPage(readPage());
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (nextPage) => {
    window.location.hash = nextPage;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    const titles = { home: 'Houseplants for your home', plants: 'Shop plants', cart: 'Your cart' };
    document.title = `Paradise Nursery | ${titles[page]}`;
    document.querySelector('main')?.focus({ preventScroll: true });
  }, [page]);

  return <>
    <a className="skip-link" href="#main-content" onClick={(event) => {
      event.preventDefault();
      document.getElementById('main-content')?.focus();
    }}>Skip to content</a>
    {page === 'home' && <>
      <NavBar currentPage="home" onNavigate={navigate} />
      <main id="main-content" tabIndex="-1">
        <section className="landing-page" aria-labelledby="welcome-heading">
          <div className="hero-content container">
            <p className="eyebrow hero-eyebrow">GROW SOMETHING GOOD</p>
            <h1 id="welcome-heading">Welcome to <br />Paradise Nursery.</h1>
            <p className="hero-description">Find a little green for your everyday. <br />Houseplants for windowsills, quiet corners,<br className="desktop-break" /> and everything in between.</p>
            <button className="button button-lime" onClick={() => navigate('plants')}>Get Started <ArrowIcon /></button>
            <span className="hero-note">18 plants. Plenty of possibilities.</span>
          </div>
          <div className="hero-caption"><LeafIcon /><span>YOUR NEXT PLANT STARTS HERE</span></div>
        </section>
        <AboutUs />
      </main>
    </>}
    {page === 'plants' && <ProductList onNavigate={navigate} />}
    {page === 'cart' && <CartItem onNavigate={navigate} />}
    <footer className="site-footer container"><span>Paradise Nursery</span><span>Houseplants for your home.</span><span>© {new Date().getFullYear()} Paradise Nursery</span></footer>
  </>;
}
