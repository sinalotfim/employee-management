import { render, screen, fireEvent } from '@testing-library/react';
import EmployeeFilter from './EmployeeFilter';

describe('EmployeeFilter Component', () => {
    test('renders the search input', () => {
        const mockOnFilterChange = jest.fn();
        render(<EmployeeFilter onFilterChange={mockOnFilterChange} />);

        const searchInput = screen.getByLabelText('Search');
        expect(searchInput).toBeInTheDocument();
    });

    test('calls onFilterChange when input changes', () => {
        const mockOnFilterChange = jest.fn();
        render(<EmployeeFilter onFilterChange={mockOnFilterChange} />);

        const searchInput = screen.getByLabelText('Search');
        fireEvent.change(searchInput, { target: { value: 'John' } });
        expect(mockOnFilterChange).toHaveBeenCalledWith('John');
    });
});
