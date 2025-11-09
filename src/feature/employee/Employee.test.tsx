import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Employee from './Employee';
import { EmployeeListItem, EmplyeeStateStatus, AlertMessageSeverity } from '@/core/model';
import * as reduxHooks from '@/state/hooks';
import * as coreHooks from '@/core/hooks';

// Mock the Redux hooks
jest.mock('@/state/hooks', () => ({
    useAppSelector: jest.fn(),
    useAppDispatch: jest.fn(),
}));

// Mock the core hooks
jest.mock('@/core/hooks', () => ({
    useUI: jest.fn(),
    useEmployeeFilter: jest.fn(),
}));

// Mock the child components
jest.mock('./header/EmployeeHeader', () => ({
    __esModule: true,
    default: ({ onAddClick }: { onAddClick: () => void }) => (
        <div data-testid="employee-header">
            <button data-testid="add-button" onClick={onAddClick}>
                Add Employee
            </button>
        </div>
    ),
}));

jest.mock('./filter/EmployeeFilter', () => ({
    __esModule: true,
    default: ({ onFilterChange }: { onFilterChange: (filter: string) => void }) => (
        <div data-testid="employee-filter">
            <input data-testid="filter-input" onChange={e => onFilterChange(e.target.value)} />
        </div>
    ),
}));

jest.mock('./list/EmployeeList', () => ({
    __esModule: true,
    default: ({
        filteredEmployees,
        onEditClick,
        onDeleteClick,
    }: {
        filteredEmployees: EmployeeListItem[];
        onEditClick: (employee: EmployeeListItem) => void;
        onDeleteClick: (id: number) => void;
    }) => (
        <div data-testid="employee-list">
            {filteredEmployees.map(employee => (
                <div key={employee.id} data-testid={`employee-${employee.id}`}>
                    <span>{employee.name}</span>
                    <button data-testid={`edit-${employee.id}`} onClick={() => onEditClick(employee)}>
                        Edit
                    </button>
                    <button data-testid={`delete-${employee.id}`} onClick={() => onDeleteClick(employee.id)}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    ),
}));

jest.mock('./add/EmployeeAdd', () => ({
    __esModule: true,
    default: ({ open, onClose, onSubmit }: { open: boolean; onClose: () => void; onSubmit: (data: any) => void }) =>
        open ? (
            <div data-testid="employee-add-modal">
                <button
                    data-testid="add-submit"
                    onClick={() =>
                        onSubmit({
                            name: 'New Employee',
                            email: 'new@example.com',
                            position: 'Developer',
                            salary: 75000,
                        })
                    }
                >
                    Submit
                </button>
                <button data-testid="add-close" onClick={onClose}>
                    Close
                </button>
            </div>
        ) : null,
}));

jest.mock('./edit/EmployeeEdit', () => ({
    __esModule: true,
    default: ({
        open,
        employee,
        onClose,
        onSubmit,
    }: {
        open: boolean;
        employee: EmployeeListItem | null;
        onClose: () => void;
        onSubmit: (data: any) => void;
    }) =>
        open && employee ? (
            <div data-testid="employee-edit-modal">
                <span>Editing: {employee.name}</span>
                <button
                    data-testid="edit-submit"
                    onClick={() =>
                        onSubmit({
                            name: 'Updated Employee',
                            email: 'updated@example.com',
                            position: 'Manager',
                            salary: 85000,
                        })
                    }
                >
                    Submit
                </button>
                <button data-testid="edit-close" onClick={onClose}>
                    Close
                </button>
            </div>
        ) : null,
}));

describe('Employee Component', () => {
    const mockEmployees: EmployeeListItem[] = [
        {
            id: 'abcd',
            name: 'John Doe',
            email: 'john@example.com',
            position: 'Developer',
            salary: 75000,
        },
        {
            id: 'efgh',
            name: 'Jane Smith',
            email: 'jane@example.com',
            position: 'Designer',
            salary: 65000,
        },
    ];

    // Create a mock dispatch function that returns a Promise with unwrap method
    const mockDispatch = jest.fn().mockImplementation(() => {
        const result = Promise.resolve();
        (result as any).unwrap = () => Promise.resolve();
        return result;
    });

    const mockAlert = {
        alertOpen: false,
        alertMessage: '',
        alertSeverity: AlertMessageSeverity.INFO,
        showAlert: jest.fn(),
        hideAlert: jest.fn(),
    };

    const mockConfirm = {
        confirmOpen: false,
        confirmTitle: '',
        confirmContent: '',
        confirmAction: jest.fn(),
        showConfirm: jest.fn((title, content, action) => {
            mockConfirm.confirmAction = action;
        }),
        hideConfirm: jest.fn(),
    };

    const mockFilterHook = {
        filtered: mockEmployees,
        filter: '',
        setFilter: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();

        // Mock Redux state
        jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            employeeList: mockEmployees,
            status: EmplyeeStateStatus.SUCCEEDED,
            error: null,
        });

        // Mock Redux dispatch
        jest.spyOn(reduxHooks, 'useAppDispatch').mockReturnValue(mockDispatch);

        // Mock UI hook
        jest.spyOn(coreHooks, 'useUI').mockReturnValue({
            alert: mockAlert,
            confirm: mockConfirm,
        });

        // Mock filter hook
        jest.spyOn(coreHooks, 'useEmployeeFilter').mockReturnValue(mockFilterHook);
    });

    test('renders all child components', () => {
        render(<Employee />);

        expect(screen.getByTestId('employee-header')).toBeInTheDocument();
        expect(screen.getByTestId('employee-filter')).toBeInTheDocument();
        expect(screen.getByTestId('employee-list')).toBeInTheDocument();
    });

    test('loads employee list on initial render when status is IDLE', () => {
        // Mock the status as IDLE
        jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            employeeList: [],
            status: EmplyeeStateStatus.IDLE,
            error: null,
        });

        render(<Employee />);

        expect(mockDispatch).toHaveBeenCalled();
    });

    test('shows error alert when there is an error', () => {
        // Mock an error in the Redux state
        jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            employeeList: [],
            status: EmplyeeStateStatus.FAILED,
            error: 'Failed to load employees',
        });

        render(<Employee />);

        expect(mockAlert.showAlert).toHaveBeenCalledWith('Failed to load employees', AlertMessageSeverity.ERROR);
    });

    test('filters employees when filter changes', () => {
        render(<Employee />);

        const filterInput = screen.getByTestId('filter-input');
        fireEvent.change(filterInput, { target: { value: 'developer' } });

        expect(mockFilterHook.setFilter).toHaveBeenCalledWith('developer');
    });

    test('opens add modal when add button is clicked', () => {
        render(<Employee />);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        expect(screen.getByTestId('employee-add-modal')).toBeInTheDocument();
    });

    test('closes add modal when close button is clicked', () => {
        render(<Employee />);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const closeButton = screen.getByTestId('add-close');
        fireEvent.click(closeButton);

        expect(screen.queryByTestId('employee-add-modal')).not.toBeInTheDocument();
    });

    test('submits new employee when add form is submitted', async () => {
        render(<Employee />);

        const addButton = screen.getByTestId('add-button');
        fireEvent.click(addButton);

        const submitButton = screen.getByTestId('add-submit');
        fireEvent.click(submitButton);

        expect(mockDispatch).toHaveBeenCalled();

        expect(mockDispatch).toHaveBeenCalled();

        await waitFor(() => {
            expect(mockAlert.showAlert).toHaveBeenCalledWith(
                'Employee added successfully',
                AlertMessageSeverity.SUCCESS
            );
        });

        expect(screen.queryByTestId('employee-add-modal')).not.toBeInTheDocument();
    });

    test('opens edit modal when edit button is clicked', () => {
        render(<Employee />);

        const editButton = screen.getByTestId('edit-1');
        fireEvent.click(editButton);

        expect(screen.getByTestId('employee-edit-modal')).toBeInTheDocument();
        expect(screen.getByText('Editing: John Doe')).toBeInTheDocument();
    });

    test('closes edit modal when close button is clicked', () => {
        render(<Employee />);

        const editButton = screen.getByTestId('edit-1');
        fireEvent.click(editButton);

        const closeButton = screen.getByTestId('edit-close');
        fireEvent.click(closeButton);

        expect(screen.queryByTestId('employee-edit-modal')).not.toBeInTheDocument();
    });

    test('shows confirm dialog when delete button is clicked', () => {
        render(<Employee />);

        const deleteButton = screen.getByTestId('delete-1');
        fireEvent.click(deleteButton);

        expect(mockConfirm.showConfirm).toHaveBeenCalledWith(
            'Confirm Action',
            'Are you sure you want to perform this action?',
            expect.any(Function)
        );
    });
});
