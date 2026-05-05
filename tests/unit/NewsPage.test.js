import { render, screen, waitFor } from '@testing-library/react';
import NewsPage from '../../src/app/(public)/news/page';
const mockUsePathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}));
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/effect-fade', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
global.fetch = jest.fn();
describe('NewsPage Component Logic', function() {
  beforeEach(function() {
    jest.clearAllMocks();
    mockUsePathname.mockReturnValue('/news');
  });
  it('renders loading spinner when fetching', async function() {
    fetch.mockImplementation(() => new Promise(() => {}));
    render(<NewsPage />);
    expect(screen.getByTestId('news-loading')).toBeInTheDocument();
  });
  it('renders empty state when no data', async function() {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });
    render(<NewsPage />);
    await waitFor(() => {
      expect(screen.getByTestId('news-empty')).toBeInTheDocument();
    });
  });
  it('renders error state on API failure', async function() {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Fail' }),
    });
    render(<NewsPage />);
    await waitFor(() => {
      expect(screen.getByTestId('news-error')).toBeInTheDocument();
    });
  });
  it('renders articles on success', async function() {
    const mockData = [{ id: 1, title: 'Test News', created_at: '2024-01-01', image_url: '/1.jpg' }];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });
    render(<NewsPage />);
    await waitFor(() => {
      expect(screen.getByText('Test News')).toBeInTheDocument();
    });
  });
});
