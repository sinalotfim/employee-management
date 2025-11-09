// Redux Toolkit dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";

// Types dependencies
import { EmployeeFormData } from "@/core/model";

// Service dependencies
import { EmployeeService } from "@/core/service";

export const employeeList = createAsyncThunk("employee/list", async () => {
    return await EmployeeService.list();
});

export const employeeAdd = createAsyncThunk("employee/add", async (employee: EmployeeFormData) => {
    return await EmployeeService.add(employee);
});

export const employeeEdit = createAsyncThunk(
    "employee/edit",
    async ({ id, employee }: { id: string; employee: EmployeeFormData }) => {
        return await EmployeeService.edit(id, employee);
    }
);

export const employeeDelete = createAsyncThunk("employee/delete", async (id: string) => {
    await EmployeeService.delete(id);
    return id;
});
