export interface QRCodeOptions {
  text: string;
  size: 'small' | 'medium' | 'large';
  foreground: string;
  background: string;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  cornerStyle: 'sharp' | 'rounded';
  margin: number;
}

export interface QRCodeDownloadOptions {
  format: 'png' | 'svg' | 'jpg';
  scale: number;
}