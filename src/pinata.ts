import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_API_SECRET = process.env.PINATA_SECRET_KEY; // Fixed: was PINATA_API_SECRET
const PINATA_BASE_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';

export async function uploadToPinata(file: Buffer, filename: string): Promise<string> {
  console.log(`[PINATA] Starting upload for file: ${filename}`);
  if (!PINATA_API_KEY || !PINATA_API_SECRET) {
    console.error('[PINATA] Missing API credentials');
    throw new Error('Missing Pinata API credentials');
  }
  
  console.log(`[PINATA] API Key present: ${!!PINATA_API_KEY}, Secret present: ${!!PINATA_API_SECRET}`);
  
  const formData = new FormData();
  formData.append('file', file, filename);
  
  console.log(`[PINATA] Making request to: ${PINATA_BASE_URL}`);
  const res = await axios.post(PINATA_BASE_URL, formData, {
    maxBodyLength: Infinity,
    headers: {
      ...formData.getHeaders(),
      pinata_api_key: PINATA_API_KEY,
      pinata_secret_api_key: PINATA_API_SECRET,
    },
  });
  
  console.log(`[PINATA] Response status: ${res.status}`);
  console.log(`[PINATA] Response data:`, res.data);
  
  if (res.data && res.data.IpfsHash) {
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
    console.log(`[PINATA] File uploaded successfully: ${ipfsUrl}`);
    return ipfsUrl;
  }
  
  console.error('[PINATA] Upload failed - no IpfsHash in response');
  throw new Error('Pinata upload failed');
}
