// API client import
import { apiClient } from "../api.client";

// Types dependencies
import { EmployeeListItem, EmployeeFormData } from "../../model";

// Constants
const ENDPOINT = "/employees";

class EmployeeServiceClass {
    async list(): Promise<EmployeeListItem[]> {
        return await apiClient.get<EmployeeListItem[]>(ENDPOINT);
    }

    async item(id: string): Promise<EmployeeListItem> {
        return await apiClient.get<EmployeeListItem>(`${ENDPOINT}/${id}`);
    }

    async add(employee: EmployeeFormData): Promise<EmployeeListItem> {
        return await apiClient.post<EmployeeListItem, EmployeeFormData>(ENDPOINT, employee);
    }

    async edit(id: string, employee: EmployeeFormData): Promise<EmployeeListItem> {
        return await apiClient.put<EmployeeListItem, EmployeeFormData>(`${ENDPOINT}/${id}`, employee);
    }

    async delete(id: string): Promise<string> {
        await apiClient.delete<void>(`${ENDPOINT}/${id}`);
        return id;
    }
}

const employeeService = new EmployeeServiceClass();

export const EmployeeService = Object.freeze({
    list: employeeService.list.bind(employeeService),
    item: employeeService.item.bind(employeeService),
    add: employeeService.add.bind(employeeService),
    edit: employeeService.edit.bind(employeeService),
    delete: employeeService.delete.bind(employeeService),
});
