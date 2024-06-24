import { observer } from "mobx-react";
import AppContainer from './components/AppContainer/AppContainer'
import { ConfigProvider } from "antd";
import { v4 as uuidv4 } from 'uuid'


function App() {
  return (
    <ConfigProvider csp={{ nonce: 'nonce-annotatorStuff' }}>
      <AppContainer />
    </ConfigProvider>    
  );
}

export default observer(App);
