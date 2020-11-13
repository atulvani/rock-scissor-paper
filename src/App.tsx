import React, { useEffect } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import './App.css';
import { Main } from './components/Main';
import { LOCAL_STORAGE_HIGH_SCORES_KEY } from './constants';
import * as actionTypes from './redux/actionTypes';
import store from './redux/store';

function App() {
    useEffect(() => {
        const scoresStr = localStorage.getItem(LOCAL_STORAGE_HIGH_SCORES_KEY) || JSON.stringify([]);
        store.dispatch({ type: actionTypes.SCORES_LOADED, payload: JSON.parse(scoresStr) });
    }, []);

    return (
        <StoreProvider store={store}>
            <Main />
        </StoreProvider>
    );
}

export default App;
