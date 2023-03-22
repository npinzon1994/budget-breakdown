import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import ExpenseFilter from '../ExpenseFilter';

test("checks to make sure onFilter prop is valid", () => {
    render(<ExpenseFilter onFilter="Show All"/>);

    
});