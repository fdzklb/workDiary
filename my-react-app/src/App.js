import React, { useEffect, useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from 'react-router-dom';
import { Menu } from 'antd';
import Loadable from 'react-loadable';
import routers from './routesConfig'

function Loading() {
  return <div>Loading...</div>;
}

function App(props) {
  const [selectedKeys, setSelectedKeys] = useState(routers[0]?.path);

  const menuItems = useMemo(() => {
    return routers.map(({ path, name }) => (
      {
        label: <Link to={path}>{name}</Link>,
        key: path,
        // icon: <AppstoreOutlined />,
        // disabled: true,
      }
    ));
  }, [])

  return (
    <div className="App">
      <Router>
        {/* 路由切换 ⬇️ */}
        <Menu mode="horizontal" selectedKeys={selectedKeys} items={menuItems} onClick={(e) => setSelectedKeys(e.key)} />
        {/* 路由匹配列表 ⬇️ */}
        <div style={{ padding: '50px' }}>
          <Switch>
            {routers.map(({ path, loader }) => {
              const Component = Loadable({
                loader,
                loading: Loading,
              });
              return (
                <Route exact key={path} path={path}>
                  <Component />
                </Route>
              );
            })}
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;