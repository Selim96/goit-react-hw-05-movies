import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Container from './Container';
import Appbar from './Appbar';
import HomePage from "./HomePage";
import Cast from "./Cast";
import MoviesPage from "./MoviesPage";
import MovieDetailsPage from './MovieDetailsPage';
import Reviews from './Reviews';
import NotFoundView from './NotFoundView/NotFoundView';

export const App = () => {
  return (
    <>
    <Container>
        <Appbar />
        
    <Switch>
      <Route path="/" exact>
        <HomePage />
      </Route>
          
      <Route path="/movies" exact>
        <MoviesPage />
      </Route>
          
      <Route path="/movies/:movieId">
        <MovieDetailsPage />
      </Route>
          
      <Route path="/cast">
        <Cast />
      </Route>
      
      <Route path="/reviews">
        <Reviews />
      </Route>
          
      <Route >
        <NotFoundView />
      </Route>
    <Redirect to="/" />
    </Switch>
    </Container>
    </>
  );
};
