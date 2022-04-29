import React, {lazy, Suspense} from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Container from './Container';
import Appbar from './Appbar';
// import HomePage from "./HomePage";
// import MoviesPage from "./MoviesPage";
// import MovieDetailsPage from './MovieDetailsPage';
// import NotFoundView from './NotFoundView/NotFoundView';

const HomePage = lazy(() => import("./HomePage" /*webpackChankName: "home-view" */));
const MoviesPage = lazy(() => import("./MoviesPage"));
const MovieDetailsPage = lazy(() => import('./MovieDetailsPage'));
const NotFoundView = lazy(() => import('./NotFoundView/NotFoundView'));


export const App = () => {
  return (
    <>
    <Container>
        <Appbar />
      <Suspense fallback={<h2>Loading...</h2>}>   
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
              
          <Route >
            <NotFoundView />
          </Route>
        <Redirect to="/" />
        </Switch>
      </Suspense> 
    </Container>
    </>
  );
};
