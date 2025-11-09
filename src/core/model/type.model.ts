// Type branding helper
export type Brand<K, T> = K & { __brand: T };

// Email branded type
export type Email = Brand<string, "Email">;

// Salary branded type (ensures it's always a positive number)
export type Salary = Brand<number, "Salary">;

export function createEmail(email: string): Email {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Invalid email format.");
    }

    return email as Email;
}

export function createSalary(amount: number): Salary {
    if (amount <= 0) {
        throw new Error("Salary must be greater than zero.");
    }

    return amount as Salary;
}
