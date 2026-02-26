import { ROUTES } from "./paths";
import { Home } from "../pages/Home";
import PaymentSuccess from "../pages/PaymentSuccess";
export const RoutesConfig = [
  { path: ROUTES.home, element: <Home /> },
  { path: ROUTES.paymentSuccess, element: <PaymentSuccess /> },
];
