import type { Metadata } from 'next';
import TheChaseGame from '@/components/the-chase/TheChaseGame';

export const metadata: Metadata = {
  title: 'The Chase | Wawata',
  description: 'Play The Chase - a quiz game based on the popular TV show',
};

export default function TheChasePage() {
  return <TheChaseGame />;
}
