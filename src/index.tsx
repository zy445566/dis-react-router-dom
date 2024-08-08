import {
  NavigateProps,
  RouteObject,
  Navigate,
  useRoutes,
} from "react-router-dom";
import * as React from "react";

interface RouteConfig {
  path: string;
  layout?: React.ReactElement;
  navigate?: NavigateProps;
}

const routeDataMap: Map<
  React.ReactElement,
  { config: RouteConfig; route: RouteObject }
> = new Map();
function finallyRoutes() {
  const routes: RouteObject[] = [];
  for (const [_key, { config, route }] of routeDataMap) {
    if (config.navigate) {
      if (!route.children) {
        route.children = [];
      }
      route.children.push({
        path: config.path,
        element: <Navigate {...config.navigate} />,
      });
    }
    if (config.layout) {
      if (routeDataMap.has(config.layout)) {
        const layout = routeDataMap.get(config.layout);
        if (layout) {
          if (!layout.route.children) {
            layout.route.children = [];
          }
          layout.route.children.push(route);
        }
      } else {
        throw new Error("layout not registed use @Route or useDisRoute");
      }
    } else {
      routes.push(route);
    }
  }
  return routes;
}

// this is a hooks
export function useDisRoute(
  target: React.ReactElement,
  routeConfig: RouteConfig
) {
  const route: RouteObject = {
    path: routeConfig.path,
    element: target,
  };
  routeDataMap.set(target, {
    config: routeConfig,
    route,
  });
  return target;
}

// this is a decorator for component class
export function Route(routeConfig: RouteConfig) {
  return function (
    target: React.ReactElement,
    _propertyKey: string,
    _descriptor: PropertyDescriptor
  ) {
    const route: RouteObject = {
      path: routeConfig.path,
      element: target,
    };
    routeDataMap.set(target, {
      config: routeConfig,
      route,
    });
  };
}

export function DisRouterDom() {
  return useRoutes(finallyRoutes());
}
