import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/header/Header';
import '../index.css';

export default function Explore() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <section className="SearchFilters" id="explorePageBtnsContainer">
        <button
          data-testid="explore-foods"
          type="button"
          onClick={ () => history.push('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          type="button"
          onClick={ () => history.push('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </section>
      <Footer />
    </div>
  );
}
