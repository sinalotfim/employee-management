import { EmployeeService } from "./employee.service";
import { apiClient } from "../api.client";
import { EmployeeListItem } from "../../model/employee.model";
import { EmployeeFormData } from "../../model/form.model";

// Mock the API client
jest.mock("../api.client", () => ({
    apiClient: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}));

describe("EmployeeService", () => {
    const mockEmployees: EmployeeListItem[] = [
        {
            id: "abcd",
            name: "John Doe",
            email: "john@example.com",
            position: "Developer",
            salary: 75000,
        },
        {
            id: "efgh",
            name: "Jane Smith",
            email: "jane@example.com",
            position: "Designer",
            salary: 65000,
        },
    ];

    const mockEmployee: EmployeeListItem = {
        id: "abcd",
        name: "John Doe",
        email: "john@example.com",
        position: "Developer",
        salary: 75000,
    };

    const mockEmployeeFormData: EmployeeFormData = {
        name: "John Doe",
        email: "john@example.com",
        position: "Developer",
        salary: 75000,
    };

    const mockUpdatedEmployee: EmployeeListItem = {
        id: "abcd",
        name: "John Doe Updated",
        email: "john.updated@example.com",
        position: "Senior Developer",
        salary: 85000,
    };

    const mockUpdatedEmployeeFormData: EmployeeFormData = {
        name: "John Doe Updated",
        email: "john.updated@example.com",
        position: "Senior Developer",
        salary: 85000,
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe("list()", () => {
        it("should fetch all employees", async () => {
            (apiClient.get as jest.Mock).mockResolvedValue(mockEmployees);

            const result = await EmployeeService.list();

            expect(apiClient.get).toHaveBeenCalledWith("/employees");
            expect(result).toEqual(mockEmployees);
            expect(result.length).toBe(2);
        });

        it("should handle errors when fetching employees", async () => {
            const errorMessage = "Network Error";
            (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(EmployeeService.list()).rejects.toThrow(errorMessage);
            expect(apiClient.get).toHaveBeenCalledWith("/employees");
        });
    });

    describe("item()", () => {
        it("should fetch a single employee by id", async () => {
            (apiClient.get as jest.Mock).mockResolvedValue(mockEmployee);

            const result = await EmployeeService.item("abcd");

            expect(apiClient.get).toHaveBeenCalledWith("/employees/abcd");
            expect(result).toEqual(mockEmployee);
            expect(result.id).toBe("abcd");
        });

        it("should handle errors when fetching a single employee", async () => {
            const errorMessage = "Employee not found";
            (apiClient.get as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(EmployeeService.item("efgh")).rejects.toThrow(errorMessage);
            expect(apiClient.get).toHaveBeenCalledWith("/employees/efgh");
        });
    });

    describe("add()", () => {
        it("should add a new employee", async () => {
            (apiClient.post as jest.Mock).mockResolvedValue(mockEmployee);

            const result = await EmployeeService.add(mockEmployeeFormData);

            expect(apiClient.post).toHaveBeenCalledWith("/employees", mockEmployeeFormData);
            expect(result).toEqual(mockEmployee);
        });

        it("should handle errors when adding an employee", async () => {
            const errorMessage = "Failed to add employee";
            (apiClient.post as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(EmployeeService.add(mockEmployeeFormData)).rejects.toThrow(errorMessage);
            expect(apiClient.post).toHaveBeenCalledWith("/employees", mockEmployeeFormData);
        });
    });

    describe("edit()", () => {
        it("should update an existing employee", async () => {
            (apiClient.put as jest.Mock).mockResolvedValue(mockUpdatedEmployee);

            const result = await EmployeeService.edit("abcd", mockUpdatedEmployeeFormData);

            expect(apiClient.put).toHaveBeenCalledWith("/employees/abcd", mockUpdatedEmployeeFormData);
            expect(result).toEqual(mockUpdatedEmployee);
        });

        it("should handle errors when updating an employee", async () => {
            const errorMessage = "Failed to update employee";
            (apiClient.put as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(EmployeeService.edit("abcd", mockUpdatedEmployeeFormData)).rejects.toThrow(errorMessage);
            expect(apiClient.put).toHaveBeenCalledWith("/employees/abcd", mockUpdatedEmployeeFormData);
        });
    });

    describe("delete()", () => {
        it("should delete an employee", async () => {
            (apiClient.delete as jest.Mock).mockResolvedValue(undefined);

            const result = await EmployeeService.delete("abcd");

            expect(apiClient.delete).toHaveBeenCalledWith("/employees/abcd");
            expect(result).toBe("abcd");
        });

        it("should handle errors when deleting an employee", async () => {
            const errorMessage = "Failed to delete employee";
            (apiClient.delete as jest.Mock).mockRejectedValue(new Error(errorMessage));

            await expect(EmployeeService.delete("abcd")).rejects.toThrow(errorMessage);
            expect(apiClient.delete).toHaveBeenCalledWith("/employees/abcd");
        });
    });
});
