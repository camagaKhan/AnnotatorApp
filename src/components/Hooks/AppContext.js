import React, { createContext } from 'react';
import AppStore from '../../store/AppStore';
import { useLocalObservable } from 'mobx-react';

// Create the context
const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    const store = useLocalObservable(() => new AppStore())
    return (
        <AppContext.Provider value={store}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;