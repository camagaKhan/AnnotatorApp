import { observer } from "mobx-react";
import AppContainer from './components/AppContainer/AppContainer'
import { ConfigProvider } from "antd";


function App() {
  return (
    <ConfigProvider csp={{ nonce: 'nonce-annotatorStuff' }}>
      <AppContainer />
    </ConfigProvider>    
  );
}

export default observer(App);
