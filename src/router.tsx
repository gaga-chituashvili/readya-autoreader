import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { Home } from "@/pages/Home";
import { AboutUs } from "@/pages/AboutUs";
import MainLayout from "@/layout/MainLayout";
import { ROUTES } from "@/routes/paths";
import { Services } from "@/pages/Services";
import { Supports } from "@/pages/Supports";
import { OurTeam } from "@/pages/OurTeam";
import { TermsAndPolicy } from "@/pages/TermsAndPolicy";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { RefundPolicy } from "@/pages/RefundPolicy";
import { SignUp } from "@/pages/SignUp";
import { SignIn } from "@/pages/SignIn";
import { ForgetPassword } from "@/pages/ForgetPassword";
import { EmailSent } from "@/pages/EmailSent";
import { PricingPage } from "@/pages/PricingPage";
import { PlayerPage } from "@/pages/PlayerPage";
import { ConfigPassword } from "@/pages/ConfigPassword";
import PaymentSuccess from "@/pages/PaymentSuccess";

const rootRoute = createRootRoute({
  component: MainLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.home,
  component: Home,
});

const aboutUsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.aboutUs,
  component: AboutUs,
});

const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.services,
  component: Services,
});

const supportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.supports,
  component: Supports,
});

const ourTeamRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.ourTeam,
  component: OurTeam,
});

const termsAndPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.termsAndPolicy,
  component: TermsAndPolicy,
});

const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.privacyPolicy,
  component: PrivacyPolicy,
});

const refundPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.refundPolicy,
  component: RefundPolicy,
});

const signUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.signUp,
  component: SignUp,
});

const logInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.signIn,
  component: SignIn,
});

const forgetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.forgetPassword,
  component: ForgetPassword,
});

const emailSentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.emailSent,
  component: EmailSent,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.pricing,
  component: PricingPage,
});

const playerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.player,
  component: PlayerPage,
});

const resetPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.resetPassword,
  component: ConfigPassword,
});

const paymentSuccessRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.paymentSuccess,
  component: PaymentSuccess,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutUsRoute,
  servicesRoute,
  supportsRoute,
  ourTeamRoute,
  termsAndPolicyRoute,
  privacyPolicyRoute,
  refundPolicyRoute,
  signUpRoute,
  logInRoute,
  forgetPasswordRoute,
  emailSentRoute,
  pricingRoute,
  playerRoute,
  resetPasswordRoute,
  paymentSuccessRoute,

]);

export const router = createRouter({
  routeTree,
});
