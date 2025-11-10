// types/threats.ts

export type RiskLevel = 'High' | 'Medium' | 'Low';
export type Platform = 'Messenger' | 'WhatsApp' | 'Telegram' | 'Instagram' | 'SMS';

export interface DetectedThreat {
  id: string;
  platform: Platform;
  sender: string;
  message: string;
  timestamp: string;
  riskLevel: RiskLevel;
}