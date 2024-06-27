import { observer } from "mobx-react";
import Login from '../login/login';
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import AppContext, { AppProvider } from "../Hooks/AppContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CommentWizard from "../wizard/wizard";
import { useContext } from "react";
import Thankyou from "../ThankYou/thankyou";




const AppRoutes = observer(() => {
  const context = useContext(AppContext)
  if (context.isAuthenticated)
  {
    return (
      <BrowserRouter basename="/AnnotatorApp">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Login />} />
          <Route path='/annotateComment/:commentId' 
           element={<CommentWizard />} 
          />
          <Route path ='/thankyou' element={<Thankyou/> }></Route>
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>    
    )
  }
  else {
    return (
      <BrowserRouter basename="/AnnotatorApp">
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Login />} />
          <Route path ='/thankyou' element={<Thankyou/> }></Route>
          <Route path='*' element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>    
    )
  }
})

function AppContainer () {
    return (
      <ErrorBoundary>
        <AppProvider>
          <AppRoutes />          
        </AppProvider>
      </ErrorBoundary>
    );
  }


export default observer(AppContainer)