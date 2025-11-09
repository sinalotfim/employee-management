// Redux Toolkit dependencies
import { createAsyncThunk } from "@reduxjs/toolkit";

// Types dependencies
import { EmployeeFormData } from "@/core/model";

export const employeeList = createAsyncThunk("employee/list", async () => {
  return Promise.resolve([]);
});

export const employeeAdd = createAsyncThunk(
  "employee/add",
  async (employee: EmployeeFormData) => {
    return Promise.resolve(employee);
  }
);

export const employeeEdit = createAsyncThunk(
  "employee/edit",
  async ({ id, employee }: { id: string; employee: EmployeeFormData }) => {
    return Promise.resolve(employee);
  }
);

export const employeeDelete = createAsyncThunk(
  "employee/delete",
  async (id: string) => {
    return Promise.resolve(id);
  }
);
