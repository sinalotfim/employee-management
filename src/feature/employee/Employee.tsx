'use client';

// React dependencies
import { useState, useEffect, useDeferredValue } from 'react';

// Material UI dependencies
import { Paper } from '@mui/material';

// Redux and UI hooks
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { employeeList, employeeDelete, employeeAdd, employeeEdit } from '@/state';
import { useUI, useEmployeeFilter } from '@/core/hooks';

// Models
import { EmployeeListItem, EmplyeeStateStatus, EmployeeFormData, AlertMessageSeverity } from '@/core/model';

// UI components
import EmployeeHeader from './header/EmployeeHeader';
import EmployeeFilter from './filter/EmployeeFilter';
import EmployeeList from './list/EmployeeList';
import EmployeeAdd from './add/EmployeeAdd';
import EmployeeEdit from './edit/EmployeeEdit';

export default function Employee() {
    const { employeeList: list, status, error } = useAppSelector(state => state.employeeList);
    const dispatch = useAppDispatch();
    const { alert, confirm } = useUI();

    const [showAdd, setShowAdd] = useState<boolean>(false);
    const [showEdit, setShowEdit] = useState<boolean>(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeFormData | null>(null);
    const { filtered, setFilter } = useEmployeeFilter(list);
    const defferedList = useDeferredValue(filtered);

    useEffect(() => {
        if (!error) return;

        alert.showAlert(error, AlertMessageSeverity.ERROR);
    }, [error, alert]);

    useEffect(() => {
        if (status !== EmplyeeStateStatus.IDLE) return;

        dispatch(employeeList());
    }, [status, dispatch]);

    const handleFilterChange = (filter: string) => {
        setFilter(filter);
    };

    const handleAddClick = () => {
        setSelectedEmployee(null);
        setShowAdd(true);
    };

    const handleAddSubmit = (formData: EmployeeFormData) => {
        dispatch(employeeAdd(formData))
            .unwrap()
            .then(() => {
                alert.showAlert('Employee added successfully', AlertMessageSeverity.SUCCESS);
                setShowAdd(false);
            })
            .catch((err: Error) => {
                alert.showAlert(`Error adding employee: ${err.message}`, AlertMessageSeverity.ERROR);
            });
    };

    const handleEditSubmit = (formData: EmployeeFormData) => {
        if (!selectedEmployee?.id) return;

        dispatch(employeeEdit({ id: selectedEmployee.id, employee: formData }))
            .unwrap()
            .then(() => {
                alert.showAlert('Employee updated successfully', AlertMessageSeverity.SUCCESS);
                setShowEdit(false);
            })
            .catch((err: Error) => {
                alert.showAlert(`Error updating employee: ${err.message}`, AlertMessageSeverity.ERROR);
            });
    };

    const handleEditClick = (employee: EmployeeListItem) => {
        const employeeData: EmployeeFormData = {
            id: employee.id,
            name: employee.name,
            email: employee.email,
            position: employee.position,
            salary: employee.salary,
        };
        setSelectedEmployee(employeeData);
        setShowEdit(true);
    };

    const handleDeleteClick = (id: string) => {
        confirm.showConfirm('Confirm Action', 'Are you sure you want to perform this action?', () => {
            if (!id) return;

            dispatch(employeeDelete(id))
                .unwrap()
                .then(() => {
                    alert.showAlert('Employee deleted successfully', AlertMessageSeverity.SUCCESS);
                })
                .catch((err: Error) => {
                    alert.showAlert(`Error deleting employee: ${err.message}`, AlertMessageSeverity.ERROR);
                });
        });
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <EmployeeHeader onAddClick={handleAddClick} />
            <EmployeeFilter onFilterChange={handleFilterChange} />
            <EmployeeList
                filteredEmployees={defferedList}
                onEditClick={handleEditClick}
                onDeleteClick={handleDeleteClick}
            />

            <EmployeeAdd open={showAdd} onClose={() => setShowAdd(false)} onSubmit={handleAddSubmit} />

            {selectedEmployee && (
                <EmployeeEdit
                    open={showEdit}
                    employee={selectedEmployee}
                    onClose={() => setShowEdit(false)}
                    onSubmit={handleEditSubmit}
                />
            )}
        </Paper>
    );
}
