// App sabitları ve renk paleti
export const COLORS = {
  primary: '#1d4ed8',
  secondary: '#3b82f6',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#1e293b',
  textLight: '#64748b',
  border: '#e2e8f0',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
};

export const FONTS = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
};

export const SIZES = {
  base: 16,
  small: 12,
  medium: 18,
  large: 24,
  xl: 32,
  padding: 20,
  margin: 16,
  radius: 12,
};

export const ANIMATION_DURATION = 300;

export const STORAGE_KEYS = {
  USER_SELECTIONS: '@pick_one_selections',
  USER_STATS: '@pick_one_stats',
  SEEN_PHOTOS: '@pick_one_seen_photos',
};

// Örnek fotoğraf verileri (sonradan API'den gelecek)
export const SAMPLE_CELEBRITIES = [
  {
    id: 1,
    name: 'Keanu Reeves',
    image: 'https://picsum.photos/300/400?random=1',
    category: 'actor',
  },
  {
    id: 2,
    name: 'Ryan Gosling',
    image: 'https://picsum.photos/300/400?random=2',
    category: 'actor',
  },
  {
    id: 3,
    name: 'Leonardo DiCaprio',
    image: 'https://picsum.photos/300/400?random=3',
    category: 'actor',
  },
  {
    id: 4,
    name: 'Brad Pitt',
    image: 'https://picsum.photos/300/400?random=4',
    category: 'actor',
  },
  {
    id: 5,
    name: 'Tom Hanks',
    image: 'https://picsum.photos/300/400?random=5',
    category: 'actor',
  },
  {
    id: 6,
    name: 'Will Smith',
    image: 'https://picsum.photos/300/400?random=6',
    category: 'actor',
  },
  {
    id: 7,
    name: 'Robert Downey Jr.',
    image: 'https://picsum.photos/300/400?random=7',
    category: 'actor',
  },
  {
    id: 8,
    name: 'Chris Evans',
    image: 'https://picsum.photos/300/400?random=8',
    category: 'actor',
  },
  {
    id: 9,
    name: 'Scarlett Johansson',
    image: 'https://picsum.photos/300/400?random=9',
    category: 'actress',
  },
  {
    id: 10,
    name: 'Emma Stone',
    image: 'https://picsum.photos/300/400?random=10',
    category: 'actress',
  },
];
