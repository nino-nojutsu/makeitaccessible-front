// jest-dom permet de créer un DOM virtuel pour lancer les tests dans Node.js via Jest
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LoadingModal from './components/modals/Loader';

it('it displays LoadingModal when isVisible is true', () => {
  render(<LoadingModal isVisible={true} />);
  expect(screen.getByText('En cours d\'analyse...')).toBeInTheDocument();
});
