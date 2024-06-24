import { observer } from "mobx-react";
import AppContainer from './components/AppContainer/AppContainer'
import { ConfigProvider } from "antd";
import { v4 as uuidv4 } from 'uuid'
//import CommentWizard from "./components/wizard/wizard";


function App() {
  return (
    <ConfigProvider csp={{ nonce: uuidv4() }}>
      <AppContainer />
    </ConfigProvider>    
  );
}

export default observer(App);
