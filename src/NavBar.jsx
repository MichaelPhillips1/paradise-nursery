import { useSelector } from 'react-redux';
import { selectTotalQuantity } from './CartSlice.jsx';
import { CartIcon, LeafIcon } from './Icons.jsx';

export default function NavBar({ currentPage, onNavigate }) {
  const totalQuantity = useSelector(selectTotalQuantity);
  const navigate = (event, page) => {
    event.preventDefault();
    onNavigate(page);
  };

  return <header className="site-header">
    <div className="nav-container">
      <a href="#home" className="brand" onClick={(event) => navigate(event, 'home')} aria-label="Paradise Nursery home">
        <span className="brand-mark"><LeafIcon /></span>
        <span>Paradise <span className="brand-second">Nursery</span></span>
      </a>
      <nav aria-label="Main navigation">
        <a href="#home" aria-current={currentPage === 'home' ? 'page' : undefined} onClick={(event) => navigate(event, 'home')}>Home</a>
        <a href="#plants" aria-current={currentPage === 'plants' ? 'page' : undefined} onClick={(event) => navigate(event, 'plants')}>Plants</a>
        <a href="#cart" className="cart-link" aria-current={currentPage === 'cart' ? 'page' : undefined} aria-label={`Cart, ${totalQuantity} ${totalQuantity === 1 ? 'item' : 'items'}`} onClick={(event) => navigate(event, 'cart')}>
          <CartIcon /><span>Cart</span>
          <span className="cart-count" data-testid="cart-count" aria-live="polite">{totalQuantity}</span>
        </a>
      </nav>
    </div>
  </header>;
}
