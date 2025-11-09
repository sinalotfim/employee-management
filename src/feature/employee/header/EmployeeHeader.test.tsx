import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeHeader from './EmployeeHeader';

describe('EmployeeHeader Component', () => {
    test('renders the header text correctly', () => {
        const mockOnAddClick = jest.fn();
        render(<EmployeeHeader onAddClick={mockOnAddClick} />);

        const headerText = screen.getByText('Employees');
        expect(headerText).toBeInTheDocument();
    });

    test('renders the Add Employee button', () => {
        const mockOnAddClick = jest.fn();
        render(<EmployeeHeader onAddClick={mockOnAddClick} />);

        const addButton = screen.getByText('Add Employee');
        expect(addButton).toBeInTheDocument();
        expect(addButton.tagName).toBe('BUTTON');
    });

    test('calls onAddClick when Add Employee button is clicked', () => {
        const mockOnAddClick = jest.fn();
        render(<EmployeeHeader onAddClick={mockOnAddClick} />);

        const addButton = screen.getByText('Add Employee');
        fireEvent.click(addButton);

        expect(mockOnAddClick).toHaveBeenCalledTimes(1);
    });
});
