import { render, screen } from '@testing-library/react';
import BasicLineInfo from '../components/BasicLineInfo';

test('render line name in basic line info', () => {
    const line = {
        id: 123,
        name: 'Test Line',
        color: '000',
        type: 'b',
    };
    render(<BasicLineInfo data={line} />);
    const headingElement = screen.getByText(/test line/i);
    expect(headingElement).toBeInTheDocument();
});