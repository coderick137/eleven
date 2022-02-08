import React from 'react';
import PropTypes from 'prop-types';
import FavCard from './FavCard';

export default function FavDrink({ favoritesDrinks }) {
  const drink = {
    image: favoritesDrinks.image,
    id: favoritesDrinks.id,
    title: favoritesDrinks.alcoholicOrNot,
    name: favoritesDrinks.name,
    type: favoritesDrinks.type,
  };
  return <FavCard recipe={ drink } />;
}

FavDrink.propTypes = {
  favoritesDrinks: PropTypes.shape().isRequired,
};
