import React from 'react';
import PropTypes from 'prop-types';
import FavCard from './FavCard';

export default function FavFood({ favoritesFoods }) {
  const food = {
    image: favoritesFoods.image,
    id: favoritesFoods.id,
    title: `${favoritesFoods.nationality} - ${favoritesFoods.category}`,
    name: favoritesFoods.name,
    type: favoritesFoods.type,
  };
  return <FavCard recipe={ food } />;
}

FavFood.propTypes = {
  favoritesFoods: PropTypes.shape().isRequired,
};
