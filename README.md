# Simple QR code Generator
a simple qr code generator website working 100% local, no limits, no forward, no bulshit

Check it out --> [Website](https://qr.maierfabian.de)


If you want to contribute feel free to do so

## Direct QR Code Generation

You can generate QR codes directly by accessing the `/code` route with query parameters:

```
/code?content=Hello%20World&size=500x500&fg=%23ff0000
```

### Available Parameters

- `content`: The text/URL to encode (required)
- `size`: Dimensions in format `widthxheight` (default: 256x256)
- `fg`: Foreground color in hex format (default: #000000)
- `bg`: Background color in hex format (default: #ffffff)
- `margin`: Margin size in modules, 0-8 (default: 4)
- `ecl`: Error correction level: L, M, Q, H (default: M)

### Examples

1. Basic usage:
   ```
   /code?content=https://example.com
   ```

2. Custom size and colors:
   ```
   /code?content=Hello&size=500x500&fg=%23ff0000&bg=%23ffffff
   ```

3. Full customization:
   ```
   /code?content=Test&size=1000x1000&fg=%23000000&bg=%23ffffff&margin=4&ecl=H
   ```

The generated QR code will be displayed directly as an image, making it perfect for embedding in other websites or applications.