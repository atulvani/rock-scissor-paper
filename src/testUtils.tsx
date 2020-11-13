import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render as rtlRender } from '@testing-library/react';
import { rootReducer } from './redux/reducers';

// re-export everything
export * from '@testing-library/react'

// override render method
export const render = (
    ui: JSX.Element,
    {
        initialState,
        store = createStore(rootReducer, initialState),
        ...renderOptions
    }: any = {}
) => {
    function Wrapper({ children }: { children: JSX.Element }) {
        return <Provider store={store}>{children}</Provider>
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
};
