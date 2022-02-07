import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Profile from './pages/Profile';
import Login from './pages/Login';

import Foods from './pages/Foods';
import Drinks from './pages/Drinks';
import Details from './pages/Details';
import InProgress from './pages/InProgress';

import Explore from './pages/Explore';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoodsNat from './pages/ExploreFoodsNat';
import ExploreFoodIng from './pages/ExploreFoodIng';
import ExploreDrinkIng from './pages/ExploreDrinkIng';

import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/profile" component={ Profile } />

        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:idReceita" component={ Details } />
        <Route exact path="/drinks/:idReceita" component={ Details } />
        <Route exact path="/foods/:idReceita/in-progress" component={ InProgress } />
        <Route exact path="/drinks/:idReceita/in-progress" component={ InProgress } />

        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods/nationalities" component={ ExploreFoodsNat } />
        <Route exact path="/explore/foods/ingredients" component={ ExploreFoodIng } />
        <Route exact path="/explore/drinks/ingredients" component={ ExploreDrinkIng } />

        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />

        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
