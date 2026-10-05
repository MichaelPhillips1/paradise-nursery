import { LeafIcon } from './Icons.jsx';

export default function AboutUs() {
  return <section className="about-section container" aria-labelledby="about-heading">
    <div>
      <p className="eyebrow"><LeafIcon /> ABOUT OUR NURSERY</p>
      <h2 id="about-heading">A place for <br />plant people.</h2>
    </div>
    <div className="about-copy">
      <p>Welcome to Paradise Nursery. We are a plant shop focused on helping people bring greenery into their homes, one plant at a time.</p>
      <p>Our collection brings together easy-care classics, statement foliage, and flowering favorites. Whether you are choosing your first houseplant or adding to an established collection, you can browse each plant’s description and price to find a good fit for your space.</p>
      <p>We believe caring for plants should be approachable. Our goal is to make choosing your next plant simple, enjoyable, and inspiring.</p>
    </div>
  </section>;
}
