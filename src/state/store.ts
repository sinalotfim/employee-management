// Redux Toolkit dependencies
import { configureStore } from '@reduxjs/toolkit';

// Reducers dependencies
import employeeReducer from './reducers/employee.reducer';

export const store = configureStore({
    reducer: {
        employeeList: employeeReducer,
    },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
