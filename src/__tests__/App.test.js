import { render, screen } from '@testing-library/react';
import App from '../App';

test('render application heading', () => {
  render(<App />);
  const headingElement = screen.getByTestId('application-heading');
  expect(headingElement).toBeInTheDocument();
});
