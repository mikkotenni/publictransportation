import { render, screen } from '@testing-library/react';
import Spinner from '../components/Spinner';

test('render spinner', () => {
  render(<Spinner />);
  const spinnerElement = screen.getByTestId('spinner');
  expect(spinnerElement).toBeInTheDocument();
});