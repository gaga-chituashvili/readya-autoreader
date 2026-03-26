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

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutUsRoute,
  servicesRoute,
  supportsRoute,
]);

export const router = createRouter({
  routeTree,
});
