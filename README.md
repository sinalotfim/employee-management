# Employee Management Dashboard

A simple dashboard for managing employee records with CRUD operations built using React, Next.js, Redux, Material UI, and Axios.

## Features

- View employees in a sortable and paginated data grid
- Add new employees
- Edit existing employee information
- Delete employees with confirmation
- Search and filter employees by name, email, position, or salary
- Error handling and loading states
- Responsive design with Material UI

## Tech Stack

- **Framework**: Next.js with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Material UI
- **HTTP Client**: Axios
- **Mock API**: json-server
- **Code Formatting**: Prettier
- **Testing**: Jest and React Testing Library

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/sinalotfim/employee-management.git
    cd employee-management
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

### Code Formatting

This project uses Prettier for code formatting. You can format your code using the following commands:

```bash
# Format all files
npm run format

# Check if files are formatted correctly
npm run format:check
```

### Testing

Run tests with Jest:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Running the Application

1. Start the mock API server:

    ```bash
    npm run server
    ```

    This will start json-server on http://localhost:3001

2. In a separate terminal, start the Next.js development server:

    ```bash
    npm run dev
    ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Endpoints

The mock API provides the following endpoints:

- `GET /employees` - Get all employees
- `GET /employees/:id` - Get a specific employee
- `POST /employees` - Create a new employee
- `PUT /employees/:id` - Update an employee
- `DELETE /employees/:id` - Delete an employee

## Project Structure

- `/src/app` - Next.js app router pages and providers
- `/src/core` - Core functionality:
    - `/model` - TypeScript interfaces and types
    - `/service` - API services and clients
    - `/hooks` - Custom React hooks
    - `/context` - React context providers
    - `/constant` - Constants and configuration
    - `/ui` - Shared UI components
- `/src/feature` - Feature-based components:
    - `/employee` - Employee management components
    - `/layout` - Layout components
- `/src/state` - Redux state management:
    - `/store.ts` - Redux store configuration
    - `/hooks` - Redux hooks
    - `/reducers` - Redux reducers
    - `/thunks` - Redux async thunks
- `/db.json` - Mock database for json-server
