'use client';

// MUI dependencies
import { DataGrid, GridColDef, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';

// Custom components
import EmployeeListSkeleton from './EmployeeListSkeleton';

// Redux dependencies
import { useAppSelector } from '@/state/hooks';

// Core dependencies
import { EmployeeListItem, EmplyeeStateStatus } from '@/core/model';

interface EmployeeListProps {
    filteredEmployees: EmployeeListItem[];
    onDeleteClick: (id: string) => void;
    onEditClick: (employee: EmployeeListItem) => void;
}

export default function EmployeeList({ filteredEmployees, onDeleteClick, onEditClick }: EmployeeListProps) {
    const { status } = useAppSelector(state => state.employeeList);

    const handleDeleteClick = (id: string) => {
        onDeleteClick(id);
    };

    const handleEditClick = (employee: EmployeeListItem) => {
        onEditClick(employee);
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'email', headerName: 'Email', width: 250 },
        { field: 'position', headerName: 'Position', width: 200 },
        {
            field: 'salary',
            headerName: 'Salary',
            type: 'number',
            width: 130,
            valueFormatter: value => {
                if (!value) return '';

                return `$${Number(value).toLocaleString()}`;
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            getActions: params => [
                <GridActionsCellItem
                    key="edit"
                    icon={<EditIcon />}
                    label="Edit"
                    onClick={() => handleEditClick(params.row as EmployeeListItem)}
                />,
                <GridActionsCellItem
                    key="delete"
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={() => handleDeleteClick(params.row.id)}
                />,
            ],
        },
    ];

    if (status === EmplyeeStateStatus.LOADING) {
        return <EmployeeListSkeleton />;
    }

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={filteredEmployees}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}
