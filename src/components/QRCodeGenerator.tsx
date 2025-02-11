import React, { useState, useEffect, useCallback } from 'react';
import QRCode from 'qrcode';
import {
  Settings2,
  Download,
  Image as ImageIcon,
  RefreshCcw,
  Info,
} from 'lucide-react';
import { QRCodeOptions, QRCodeDownloadOptions } from '../types';

const DEFAULT_OPTIONS: QRCodeOptions = {
  text: '',
  size: 'medium',
  foreground: '#000000',
  background: '#ffffff',
  errorCorrectionLevel: 'M',
  cornerStyle: 'sharp',
  margin: 4,
};

const sizeMappings = {
  small: 200,
  medium: 300,
  large: 400,
};

export default function QRCodeGenerator() {
  const [options, setOptions] = useState<QRCodeOptions>(DEFAULT_OPTIONS);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateQRCode = useCallback(async () => {
    if (!options.text) return;
    
    setIsLoading(true);
    try {
      const url = await QRCode.toDataURL(options.text, {
        width: sizeMappings[options.size],
        margin: options.margin,
        color: {
          dark: options.foreground,
          light: options.background,
        },
        errorCorrectionLevel: options.errorCorrectionLevel,
      });
      setQrDataUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
    } finally {
      setIsLoading(false);
    }
  }, [options]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      generateQRCode();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [generateQRCode]);

  const handleDownload = async (downloadOptions: QRCodeDownloadOptions) => {
    if (!options.text) return;

    const canvas = document.createElement('canvas');
    const size = sizeMappings[options.size] * downloadOptions.scale;
    canvas.width = size;
    canvas.height = size;

    await QRCode.toCanvas(canvas, options.text, {
      width: size,
      margin: options.margin,
      color: {
        dark: options.foreground,
        light: options.background,
      },
      errorCorrectionLevel: options.errorCorrectionLevel,
    });

    const link = document.createElement('a');
    link.download = `qrcode.${downloadOptions.format}`;
    link.href = canvas.toDataURL(`image/${downloadOptions.format}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Just a simple QR code Generator
          </h1>
          <p className="text-gray-600">
            Create customized QR codes instantly for your links and content 100% local.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left Column - Options */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <div className="space-y-6">
              {/* Basic Input */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Content
                </label>
                <input
                  type="text"
                  value={options.text}
                  onChange={(e) =>
                    setOptions((prev) => ({ ...prev, text: e.target.value }))
                  }
                  placeholder="Enter URL or text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Quick Options */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Size
                  </label>
                  <select
                    value={options.size}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        size: e.target.value as QRCodeOptions['size'],
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Corner Style
                  </label>
                  <select
                    value={options.cornerStyle}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        cornerStyle: e.target.value as QRCodeOptions['cornerStyle'],
                      }))
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="sharp">Sharp</option>
                    <option value="rounded">Rounded</option>
                  </select>
                </div>
              </div>

              {/* Color Options */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Foreground Color
                  </label>
                  <input
                    type="color"
                    value={options.foreground}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        foreground: e.target.value,
                      }))
                    }
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={options.background}
                    onChange={(e) =>
                      setOptions((prev) => ({
                        ...prev,
                        background: e.target.value,
                      }))
                    }
                    className="w-full h-10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Advanced Options Toggle */}
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="flex items-center space-x-2 text-gray-600 transition-colors hover:text-gray-900"
              >
                <Settings2 className="w-4 h-4" />
                <span>Advanced Options</span>
              </button>

              {/* Advanced Options */}
              {showAdvanced && (
                <div className="pt-4 space-y-4 border-t border-gray-200">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Error Correction Level
                      <span
                        className="inline-flex items-center ml-2 text-gray-500"
                        title="Higher levels make the QR code more resistant to damage but increase its size"
                      >
                        <Info className="w-4 h-4" />
                      </span>
                    </label>
                    <select
                      value={options.errorCorrectionLevel}
                      onChange={(e) =>
                        setOptions((prev) => ({
                          ...prev,
                          errorCorrectionLevel: e.target
                            .value as QRCodeOptions['errorCorrectionLevel'],
                        }))
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="L">Low (7%)</option>
                      <option value="M">Medium (15%)</option>
                      <option value="Q">Quartile (25%)</option>
                      <option value="H">High (30%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Margin
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="8"
                      value={options.margin}
                      onChange={(e) =>
                        setOptions((prev) => ({
                          ...prev,
                          margin: Number(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                    <div className="text-sm text-center text-gray-500">
                      {options.margin} modules
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Preview & Download */}
          <div className="p-6 bg-white shadow-lg rounded-xl">
            <div className="space-y-6">
              {/* Preview */}
              <div className="flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-gray-200 rounded-lg p-4">
                {isLoading ? (
                  <div className="flex items-center space-x-2 text-gray-500">
                    <RefreshCcw className="w-5 h-5 animate-spin" />
                    <span>Generating...</span>
                  </div>
                ) : qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Generated QR Code"
                    className="h-auto max-w-full"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Enter content to generate QR code</p>
                  </div>
                )}
              </div>

              {/* Download Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Download Options
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() =>
                      handleDownload({ format: 'png', scale: 3 })
                    }
                    disabled={!qrDataUrl}
                    className="flex items-center justify-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    <span>PNG</span>
                  </button>
                  <button
                    onClick={() =>
                      handleDownload({ format: 'svg', scale: 1 })
                    }
                    disabled={!qrDataUrl}
                    className="flex items-center justify-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    <span>SVG</span>
                  </button>
                  <button
                    onClick={() =>
                      handleDownload({ format: 'jpg', scale: 3 })
                    }
                    disabled={!qrDataUrl}
                    className="flex items-center justify-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    <span>JPG</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}