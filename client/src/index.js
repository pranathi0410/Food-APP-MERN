
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import About from './siwggy-components/About';
import Contact from './siwggy-components/Contact';
import Body from './siwggy-components/Body';
import RestaurantMenu from './siwggy-components/RestaurantMenu';
import Cart from './siwggy-components/Cart';
import { CartProvider } from './Context/CartContext';
import { AuthProvider } from './Context/AuthContext';
import LoginPage from './siwggy-components/LoginPage.jsx';
import ProtectedRoute from './siwggy-components/ProtectedRoute';
import RegisterPage from './siwggy-components/RegisterPage.jsx';
import OrderList from './siwggy-components/OdersList.jsx';
import OrderSuccess from './siwggy-components/OrderSuccess.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Body />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "restaurant/:resId",
        element: <RestaurantMenu />
      },
      {
        path: "cart",
        element: <ProtectedRoute>
          <Cart />
        </ProtectedRoute>

      },
      {
        path: "login",
        element: <LoginPage />
      }, {
        path: "register",
        element: <RegisterPage />
      },{
        path:"/order/success",
        element:<OrderSuccess/>
      },
      {
        path:"/orders",
        element: <OrderList/>
      }
    ],
    errorElement: <h1>404 not found</h1>

  },


])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </AuthProvider>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
