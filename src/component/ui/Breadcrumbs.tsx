import { Link, useRouterState } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Breadcrumbs() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const { t } = useTranslation("navbar");

  if (pathname === "/") {
    return null;
  }

  const pathSegments = pathname.split("/").filter(Boolean);

  const getSegmentLabel = (segment: string): string => {
    const translationKey = `breadcrumbs.${segment}`;
    const translated = t(translationKey);

    if (translated !== translationKey) {
      return translated;
    }

    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = "/" + pathSegments.slice(0, index + 1).join("/");
    const isLast = index === pathSegments.length - 1;

    return {
      label: getSegmentLabel(segment),
      path,
      isLast,
    };
  });

  return (
    <div className="absolute top-20 left-0 right-0 z-40 max-w-7xl mx-auto px-8 font-semibold">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">{t("home")}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {breadcrumbItems.map((item) => (
            <div key={item.path} className="contents">
              <BreadcrumbItem>
                {item.isLast ? (
                  <BreadcrumbPage className="text-primary font-semibold">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.path}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!item.isLast && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
