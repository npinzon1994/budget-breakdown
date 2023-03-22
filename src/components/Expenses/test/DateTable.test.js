import '@testing-library/jest-dom';
import dateTable from '../DateTable';

test("Makes sure number corresponds to the correct short month", () => {
    expect(dateTable(2)).toBe("Mar");
})