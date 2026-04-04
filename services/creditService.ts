
import { UsageEvent, Transaction, CreditLimit, OrganizationWallet } from '../types';

/**
 * AI Credits Management & Governance Service
 */
export class CreditService {
  private static instance: CreditService;
  
  private constructor() {}

  public static getInstance(): CreditService {
    if (!CreditService.instance) {
      CreditService.instance = new CreditService();
    }
    return CreditService.instance;
  }

  /**
   * Estimate cost of an AI action before execution
   */
  public estimateCost(params: {
    feature: UsageEvent['feature'];
    model: string;
    estimatedTokensIn?: number;
    estimatedTokensOut?: number;
    durationSeconds?: number;
  }): number {
    const { feature, model, estimatedTokensIn = 0, estimatedTokensOut = 0, durationSeconds = 0 } = params;
    
    // Base rates (credits per 1k tokens or per second)
    const rates: Record<string, number> = {
      'gemini-3-flash-preview': 0.1, // 0.1 credits per 1k tokens
      'gemini-3.1-pro-preview': 0.5,
      'voice': 10, // 10 credits per second
      'assessment': 500, // Flat rate per generation
      'curriculum': 2000, // Flat rate per generation
    };

    if (feature === 'voice') {
      return durationSeconds * (rates['voice'] || 10);
    }

    if (feature === 'assessment' || feature === 'curriculum') {
      return rates[feature] || 500;
    }

    const modelRate = rates[model] || 0.1;
    return Math.ceil(((estimatedTokensIn + estimatedTokensOut) / 1000) * modelRate * 100);
  }

  /**
   * Check if a request is allowed based on limits
   */
  public checkEnforcement(params: {
    userId: string;
    orgId: string;
    subAccountId?: string;
    estimatedCost: number;
    wallet: OrganizationWallet;
    limits: CreditLimit[];
  }): { allowed: boolean; reason?: string } {
    const { userId, subAccountId, estimatedCost, wallet, limits } = params;

    // 1. Check Organization Balance
    if (wallet.balance < estimatedCost) {
      return { allowed: false, reason: 'Organization credit balance insufficient. Please contact Enara to allocate more credits.' };
    }

    // 2. Check User Limits
    const userLimit = limits.find(l => l.targetId === userId && l.targetType === 'user');
    if (userLimit) {
      if (userLimit.status === 'blocked') return { allowed: false, reason: 'User access blocked by administrator.' };
      if (userLimit.usage + estimatedCost > userLimit.limit) {
        return { allowed: false, reason: 'User monthly credit limit reached.' };
      }
    }

    // 3. Check Team/Class Limits
    if (subAccountId) {
      const teamLimit = limits.find(l => l.targetId === subAccountId && l.targetType === 'team');
      if (teamLimit && teamLimit.usage + estimatedCost > teamLimit.limit) {
        return { allowed: false, reason: 'Class/Team credit limit reached.' };
      }
    }

    return { allowed: true };
  }

  /**
   * Record a usage event and deduct credits (Immutable Ledger)
   */
  public recordUsage(event: UsageEvent): Transaction {
    // In a real app, this would be a database transaction:
    // 1. Insert UsageEvent
    // 2. Update Wallet Balance
    // 3. Update Limit Usage
    // 4. Insert Transaction record
    
    return {
      id: `tx-${Math.random().toString(36).substr(2, 9)}`,
      walletId: 'w-1', // Mock
      amount: -event.creditsUsed,
      type: 'deduction',
      referenceUsageEventId: event.id,
      timestamp: new Date(),
      description: `AI usage: ${event.feature} (${event.model})`,
      performedBy: event.userName
    };
  }
}

export const creditService = CreditService.getInstance();
