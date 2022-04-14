// src/layouts/MicroAppLayout
import BasicLayout from '@ant-design/pro-layout';
import { KeepAlive, Provider } from 'react-keep-alive';
import { MicroAppWithMemoHistory } from 'umi';
import allRoutes from '../../config/routes';

function MicroAppLayout(props) {
  let targetMicro = '';
  const transRoutes = (routes, pathname) => {
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
  return (
    <Provider>
      <KeepAlive name={props.location.pathname}>
        {targetMicro ? (
          <MicroAppWithMemoHistory
            name={transRoutes(allRoutes[0].routes, props.location.pathname)}
            url={props.location.pathname}
          />
        ) : (
          <BasicLayout></BasicLayout>
        )}
      </KeepAlive>
    </Provider>
  );
}

export default MicroAppLayout;
