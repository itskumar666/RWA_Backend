# Zenith RWA Backend

Backend API server for the Zenith Real World Asset (RWA) tokenization platform.

## Features

- 🔗 **Smart Contract Integration**: Direct interaction with RWA contracts on Sepolia
- 📁 **IPFS Storage**: Automatic file upload to Pinata with local cleanup
- 🔐 **Secure Asset Management**: Backend-signed transactions for asset verification
- 📊 **Health Monitoring**: Built-in health checks and status endpoints
- 🌐 **Production Ready**: CORS configuration, error handling, Docker support

## Tech Stack

- **Node.js** + **TypeScript** + **Express**
- **Viem** for Ethereum interactions
- **Pinata** for IPFS storage
- **Multer** for file uploads
- **Docker** for containerization

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Fill in your values in .env file
# Start development server
npm run dev

# Production build
npm run build
npm start
```

## Deployment

Deploy to Railway by connecting this repository and adding environment variables.

## License

MIT License
