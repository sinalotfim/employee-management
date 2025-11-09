// Redux Toolkit dependencies
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Types dependencies
import { EmployeeListItem, EmployeeState, EmplyeeStateStatus } from "@/core/model";

// Thunks
import { employeeList, employeeAdd, employeeEdit, employeeDelete } from "../thunks/employee.thunks";

const initialState: EmployeeState = {
    employeeList: [],
    selectedEmployee: null,
    status: EmplyeeStateStatus.IDLE,
    error: null,
};

const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setSelectedEmployee: (state, action: PayloadAction<EmployeeListItem | null>) => {
            state.selectedEmployee = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            // Fetch employees
            .addCase(employeeList.pending, (state: EmployeeState) => {
                state.status = EmplyeeStateStatus.LOADING;
            })
            .addCase(employeeList.fulfilled, (state: EmployeeState, action) => {
                state.status = EmplyeeStateStatus.SUCCEEDED;
                state.employeeList = action.payload;
            })
            .addCase(employeeList.rejected, (state: EmployeeState, action) => {
                state.status = EmplyeeStateStatus.FAILED;
                state.error = action.error.message || "Failed to fetch employees";
            })
            // Add employee
            .addCase(employeeAdd.fulfilled, (state: EmployeeState, action) => {
                state.employeeList.unshift(action.payload);
            })
            // Edit employee
            .addCase(employeeEdit.fulfilled, (state: EmployeeState, action) => {
                const index = state.employeeList.findIndex(e => e.id === action.payload.id);
                if (index !== -1) {
                    state.employeeList[index] = action.payload;
                }
            })
            // Delete employee
            .addCase(employeeDelete.fulfilled, (state: EmployeeState, action) => {
                state.employeeList = state.employeeList.filter(e => e.id !== action.payload);
            });
    },
});

export const { setSelectedEmployee } = employeeSlice.actions;

// Re-export thunks for convenience
export { employeeList, employeeAdd, employeeEdit, employeeDelete };

export default employeeSlice.reducer;
