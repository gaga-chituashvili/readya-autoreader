import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import MainLayout from "./layout/MainLayout";
import { ROUTES } from "./routes/paths";

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

const routeTree = rootRoute.addChildren([homeRoute, aboutUsRoute]);

export const router = createRouter({
  routeTree,
});
