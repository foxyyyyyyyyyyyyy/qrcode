import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRCodeRouteProps {
  content?: string;
  size?: string;
  fg?: string;
  bg?: string;
  margin?: string;
  ecl?: string;
}

export default function QRCodeRoute({
  content = '',
  size = '256x256',
  fg = '#000000',
  bg = '#ffffff',
  margin = '4',
  ecl = 'M',
}: QRCodeRouteProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const generateQRCode = async () => {
      if (!canvasRef.current || !content) return;

      const [width = 256, height = 256] = size.split('x').map(Number);
      
      try {
        await QRCode.toCanvas(canvasRef.current, content, {
          width: Math.min(Math.max(width, 32), 2048),
          margin: Math.min(Math.max(Number(margin), 0), 8),
          color: {
            dark: fg,
            light: bg,
          },
          errorCorrectionLevel: ecl as 'L' | 'M' | 'Q' | 'H',
        });
      } catch (error) {
        console.error('Error generating QR code:', error);
        // Draw error message on canvas
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.fillStyle = bg;
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = fg;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = '16px sans-serif';
          ctx.fillText('Error generating QR code', width / 2, height / 2);
        }
      }
    };

    generateQRCode();
  }, [content, size, fg, bg, margin, ecl]);

  return <canvas ref={canvasRef} />;
}