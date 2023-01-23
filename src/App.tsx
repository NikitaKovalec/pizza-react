import React, { Suspense } from "react";
import {Route, Routes} from "react-router-dom";

import Home from "./pages/Home";
import {MainLayout, Download} from "./components";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */'./pages/Cart'))
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */'./pages/FullPizza'))
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */'./pages/NotFound'))

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />}/>
        <Route
          path='cart'
          element={
          <Suspense fallback={<Download />}>
            <Cart />
          </Suspense>}/>
        <Route
          path='pizza/:id'
          element={
          <Suspense fallback={<Download />}>
            <FullPizza />
          </Suspense>}/>
        <Route
          path='*'
          element={
          <Suspense fallback={<Download />}>
            <NotFound />
          </Suspense>}/>
      </Route>
    </Routes>
  );
}

export default App;
