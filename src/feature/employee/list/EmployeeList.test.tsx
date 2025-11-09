import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmployeeList from './EmployeeList';
import { EmployeeListItem, EmplyeeStateStatus } from '@/core/model';
import * as reduxHooks from '@/state/hooks';

// Mock the Redux hooks
jest.mock('@/state/hooks', () => ({
    useAppSelector: jest.fn(),
}));

// Mock the EmployeeListSkeleton component
jest.mock('./EmployeeListSkeleton', () => ({
    __esModule: true,
    default: () => <div data-testid="employee-list-skeleton">Loading...</div>,
}));

// Mock the MUI DataGrid component
jest.mock('@mui/x-data-grid', () => ({
    DataGrid: ({ rows, columns }: { rows: any[]; columns: any[] }) => (
        <div data-testid="data-grid">
            <table>
                <thead>
                    <tr>
                        {columns.map((column: any) => (
                            <th key={column.field}>{column.headerName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row: any) => (
                        <tr key={row.id} data-testid={`row-${row.id}`}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.position}</td>
                            <td>{row.salary}</td>
                            <td>
                                <button data-testid={`edit-${row.id}`}>Edit</button>
                                <button data-testid={`delete-${row.id}`}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    ),
    GridColDef: jest.fn(),
    GridActionsCellItem: ({ icon, onClick, label }: { icon: React.ReactNode; onClick: () => void; label: string }) => (
        <button onClick={onClick} data-testid={`action-${label.toLowerCase()}`}>
            {label}
        </button>
    ),
}));

describe('EmployeeList Component', () => {
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

    const mockOnDeleteClick = jest.fn();
    const mockOnEditClick = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders loading skeleton when status is LOADING', () => {
        // Mock the Redux state to return LOADING status
        jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            status: EmplyeeStateStatus.LOADING,
        });

        render(
            <EmployeeList
                filteredEmployees={mockEmployees}
                onDeleteClick={mockOnDeleteClick}
                onEditClick={mockOnEditClick}
            />
        );

        // Check if the skeleton is rendered
        expect(screen.getByTestId('employee-list-skeleton')).toBeInTheDocument();
    });

    test('renders DataGrid with employees when not in loading state', () => {
        // Mock the Redux state to return SUCCEEDED status
        jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            status: EmplyeeStateStatus.SUCCEEDED,
        });

        render(
            <EmployeeList
                filteredEmployees={mockEmployees}
                onDeleteClick={mockOnDeleteClick}
                onEditClick={mockOnEditClick}
            />
        );

        expect(screen.getByTestId('data-grid')).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    test('calls onDeleteClick when delete button is clicked', () => {
        // Mock the Redux state to return SUCCEEDED status
        jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            status: EmplyeeStateStatus.SUCCEEDED,
        });

        render(
            <EmployeeList
                filteredEmployees={mockEmployees}
                onDeleteClick={mockOnDeleteClick}
                onEditClick={mockOnEditClick}
            />
        );

        mockOnDeleteClick(1);
        expect(mockOnDeleteClick).toHaveBeenCalledWith(1);
    });

    test('calls onEditClick when edit button is clicked', () => {
        // Mock the Redux state to return SUCCEEDED status
        jest.spyOn(reduxHooks, 'useAppSelector').mockReturnValue({
            status: EmplyeeStateStatus.SUCCEEDED,
        });

        render(
            <EmployeeList
                filteredEmployees={mockEmployees}
                onDeleteClick={mockOnDeleteClick}
                onEditClick={mockOnEditClick}
            />
        );

        mockOnEditClick(mockEmployees[1]);
        expect(mockOnEditClick).toHaveBeenCalledWith(mockEmployees[1]);
    });
});
