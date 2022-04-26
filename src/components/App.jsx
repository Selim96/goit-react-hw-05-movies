import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Container from './Container';
import Appbar from './Appbar';
import HomePage from "./HomePage";
import Cast from "./Cast";
import MoviesPage from "./MoviesPage";
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
      <Route path="/cast">
        <Cast />
      </Route>
      <Route path="/moviespage">
        <MoviesPage />
      </Route>
      <Route path="/reviews">
        <Reviews />
      </Route>
      <Route >
        <NotFoundView />
      </Route>
    </Switch>
    </Container>
    </>
  );
};
