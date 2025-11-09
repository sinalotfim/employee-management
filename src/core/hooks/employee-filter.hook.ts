// React dependencies
import { useState, useMemo } from "react";

// Models
import { EmployeeListItem } from "@/core/model";

export function useEmployeeFilter(employees: EmployeeListItem[]) {
    const [filter, setFilter] = useState("");

    const filtered = useMemo(() => {
        const value = filter.trim().toLowerCase();

        if (!value) return employees;

        return employees.filter(employee => {
            const { name, email, position, salary } = employee;
            return (
                name.toLowerCase().includes(value) ||
                email.toLowerCase().includes(value) ||
                position.toLowerCase().includes(value) ||
                salary.toString().includes(value)
            );
        });
    }, [employees, filter]);

    return {
        filtered,
        filter,
        setFilter,
    };
}
