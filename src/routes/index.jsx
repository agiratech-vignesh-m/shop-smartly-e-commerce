import React, { lazy, Suspense } from "react";
import { Route, Routes, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";

function RoutePath() {
  const Home = lazy(() => import("../pages/home"));
  const Layout = lazy(() => import("../container/layout"));
  const Layout2 = lazy(() => import("../container/layout2"));

  const SignUp = lazy(() => import("../pages/sign-up"));
  const Login = lazy(() => import("../pages/login"));
  const Cart = lazy(() => import("../pages/cart"));
  const PageNotFound = lazy(() => import("../pages/pageNotFound"));

  const AuthRoute = ({ element}) => {
  const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
  return isAuthenticated ? <Navigate to="/home" /> : element
  }

  const CartRoute = ({ element}) => {
    const isAuthenticated = useSelector((state) => state.user.isLoggedIn);
    return isAuthenticated ? element : <Navigate to="/cart" />
    }

  return (
    <Suspense >
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
        </Route>

        <Route element={<Layout2/>}>
        <Route path='/cart' element={<CartRoute element={<Cart />} />} />
        </Route>

        <Route path="/sign-up" element={<SignUp/>} />
        <Route path='/login' element={<AuthRoute element={<Login />} />} />

        <Route path="*" element={<PageNotFound />} />



      </Routes>
    </Suspense>
  );
}

export default RoutePath;
