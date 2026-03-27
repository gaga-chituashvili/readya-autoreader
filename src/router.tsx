import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import MainLayout from "./layout/MainLayout";
import { ROUTES } from "./routes/paths";
import { Services } from "./pages/Services";
import { Supports } from "./pages/Supports";
import { OurTeam } from "./pages/OurTeam";
import { TermsAndPolicy } from "./pages/TermsAndPolicy";

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

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutUsRoute,
  servicesRoute,
  supportsRoute,
  ourTeamRoute,
  termsAndPolicyRoute,
]);

export const router = createRouter({
  routeTree,
});
