export interface EmployeeListItem {
    id: string;
    name: string;
    email: string;
    position: string;
    salary: number;
}

export enum EmplyeeStateStatus {
    IDLE = "idle",
    LOADING = "loading",
    SUCCEEDED = "succeeded",
    FAILED = "failed",
}

export interface EmployeeState {
    employeeList: EmployeeListItem[];
    status: EmplyeeStateStatus;
    error: string | null;
    selectedEmployee: EmployeeListItem | null;
}
