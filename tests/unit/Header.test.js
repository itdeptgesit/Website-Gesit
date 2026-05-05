import { render, screen } from '@testing-library/react';
import Header from '@/components/Header';
import { usePathname } from 'next/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Header Component', () => {
  it('renders the company name', () => {
    usePathname.mockReturnValue('/');
    render(<Header />);
    const logoTexts = screen.getAllByText('THE GESIT COMPANIES');
    expect(logoTexts.length).toBeGreaterThan(0);
    expect(logoTexts[0]).toBeInTheDocument();
  });

  it('renders main navigation items', () => {
    usePathname.mockReturnValue('/');
    render(<Header />);
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('CSR')[0]).toBeInTheDocument();
    expect(screen.getAllByText('News')[0]).toBeInTheDocument();
  });
});
