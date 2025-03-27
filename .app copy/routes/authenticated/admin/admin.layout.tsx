import { Link, Outlet, redirect, type LoaderFunctionArgs } from 'react-router';
import { requireAndGetUser } from '~/loader-functions/user.server';

import { LaptopOutlined, NotificationOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, type MenuProps } from 'antd';
import React from 'react';

const { Header, Content, Sider } = Layout;

const links: MenuProps['items'] = [
  {
    key: 'menu:constructors',
    icon: React.createElement(TeamOutlined),
    label: <Link to="/admin/constructors">Constructors</Link>,
  },
  {
    key: 'menu:drivers',
    icon: React.createElement(UserOutlined),
    label: <Link to="/admin/drivers">Drivers</Link>,
  },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await requireAndGetUser(request);
  if (user.username === 'StoutyAlex') {
    return user;
  }

  return redirect('/', {
    status: 302,
  });
};

export default function AdminGuardLayout() {
  return (
    <Layout className="h-screen">
      <Header>
        <div className="demo-logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} style={{ flex: 1, minWidth: 0 }} />
      </Header>
      <Layout>
        <Sider width={200}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={links}
            onClick={(e) => console.log(e)}
          />
        </Sider>
        <Layout className="site-layout-background">
          <Content className="p-4">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
