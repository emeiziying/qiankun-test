// src/layouts/MicroAppLayout
import BasicLayout from '@ant-design/pro-layout';
import { KeepAlive, Provider } from 'react-keep-alive';
import { MicroAppWithMemoHistory } from 'umi';
import allRoutes from '../../config/routes';

const transRoutes = (routes, pathname) => {
  let targetMicro = '';
  routes.map((item) => {
    if (item.routes) {
      return transRoutes(item.routes, pathname);
    }
    if (item.path === pathname) {
      targetMicro = item.microApp;
    }
  });
  return targetMicro;
};

function MicroAppLayout(props) {
  let targetMicro = transRoutes(allRoutes, props.location.pathname);

  console.log('targetMicro', targetMicro, 'allRoutes', allRoutes, props.location.pathname);

  return (
    <Provider>
      <KeepAlive name={props.location.pathname}>
        {targetMicro ? (
          <MicroAppWithMemoHistory name={targetMicro} url={props.location.pathname} />
        ) : (
          <BasicLayout></BasicLayout>
        )}
      </KeepAlive>
    </Provider>
  );
}

export default MicroAppLayout;
