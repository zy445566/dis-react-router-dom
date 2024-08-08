# dis-react-router-dom

A React next router power by react-router-dom with @Decorator

# Install

```sh
npm install dis-react-router-dom
```

# Usage

let us to remove those router config

```tsx
// @/layout/Layout/index.tsx
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

// /views/Hello/index.tsx
import { FC } from "react";
import { useDisRoute } from "dis-react-router-dom";
import Layout from "@/layout/Layout/index";

const Hello: FC = (props) => {
  return <div>Hello {props.name}!</div>;
};

export default useDisRoute(Hello, {
  path: "hello",
  layout: Layout,
  props: { name: "world" },
});
// App.tsx
import "@/layout/Layout/index";
import "@/views/Hello/index";
import { DisRouterDom } from "dis-react-router-dom";

const App = () => <DisRouterDom />;
export default App;
```
