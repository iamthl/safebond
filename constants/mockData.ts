// constants/mockData.ts
import { DetectedThreat } from '../types/threats';

export const MOCK_THREATS: DetectedThreat[] = [
  {
    id: '1',
    platform: 'Messenger',
    sender: 'Mark (Acquaintance)',
    message: 'URGENT: Your account is locked. You must verify your account now at http://bit.ly/fake-link to avoid deletion.',
    timestamp: '2m ago',
    riskLevel: 'High',
  },
  {
    id: '2',
    platform: 'WhatsApp',
    sender: '+1 (800) 555-1234',
    message: 'Congratulations! You won a $1000 gift card. Claim now by entering your credit card details here: http://t.co/secure-prize',
    timestamp: '1h ago',
    riskLevel: 'High',
  },
  {
    id: '3',
    platform: 'Instagram',
    sender: 'Crypto_King_88',
    message: 'Hey, saw your profile. I have a guaranteed bitcoin investment opportunity. 10x your money in 24h. DM me "INFO".',
    timestamp: '3h ago',
    riskLevel: 'Medium',
  },
  {
    id: '4',
    platform: 'SMS',
    sender: '+44 7123 456789',
    message: 'FedEx: Your package delivery has been stopped. Please confirm your shipping address and pay a $2.99 fee: http://fedex-tracking.xyz',
    timestamp: '1d ago',
    riskLevel: 'High',
  },
  {
    id: '5',
    platform: 'Telegram',
    sender: 'Secret Shopper Group',
    message: 'Join our exclusive group for free products. Just provide your Amazon password for us to write reviews.',
    timestamp: '2d ago',
    riskLevel: 'Medium',
  },

    {
    id: '6',
    platform: 'Telegram',
    sender: 'Secret Shopper Group',
    message: 'Join our exclusive group for free products. Just provide your Amazon password for us to write reviews.',
    timestamp: '3d ago',
    riskLevel: 'Medium',
  },
];