import { useSearchParams } from 'react-router-dom';
import QRCodeRoute from '../components/QRCodeRoute.tsx';

export default function CodePage() {
  const [searchParams] = useSearchParams();
  
  const params = {
    content: searchParams.get('content') || '',
    size: searchParams.get('size') || '256x256',
    fg: searchParams.get('fg') || '#000000',
    bg: searchParams.get('bg') || '#ffffff',
    margin: searchParams.get('margin') || '4',
    ecl: searchParams.get('ecl') || 'M',
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <QRCodeRoute {...params} />
    </div>
  );
}