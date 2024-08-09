# dis-react-router-dom

A React next router power by react-router-dom with Hooks and @Decorator

# Install

```sh
npm install dis-react-router-dom
```

# Usage

@/layout/Layout/index.tsx:

```tsx
import { useDisRoute } from "dis-react-router-dom";
import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default useDisRoute(Layout, {
  path: "/",
  navigate: { to: "hello" },
});
```

@/views/Hello/index.tsx:

```tsx
import { FC } from "react";
import { useDisRoute } from "dis-react-router-dom";
import Layout from "@/layout/Layout/index";

const Hello: FC = (props) => {
  return <div>Hello {props.name}!</div>;
};
// Or @Decorator for React.Component class
// import { Route } from "dis-react-router-dom";
// @Route({ path: "hello" })
// class Hello extends React.Component {...}
// this need to enable declaration on typescript config

export default useDisRoute(Hello, {
  path: "hello",
  layout: Layout,
  props: { name: "world" },
});
```

App.tsx:

```tsx
import { DisRouterDom } from "dis-react-router-dom";
import "@/views/Hello/index"; // enable route component

const App = () => <DisRouterDom />;
export default App;
```
