/**
 * Platform Owner & VIP Access Management
 * Grants permanent 100% unrestricted Pro access to platform administrators.
 */

export const PLATFORM_OWNER_EMAILS = [
  'timbest0612@gmail.com',
  'oyalekeoluwagbenga1984@gmail.com',
];

export interface UserAccessProfile {
  email: string;
  name: string;
  isOwner: boolean;
  isPro: boolean;
  role: 'owner' | 'pro' | 'patient_early_access' | 'visitor';
  registeredAt: string;
}

/**
 * Determines whether a given email belongs to a designated platform owner.
 */
export function isPlatformOwnerEmail(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return PLATFORM_OWNER_EMAILS.some((ownerEmail) => ownerEmail.toLowerCase() === normalized);
}

/**
 * Gets the current active user profile, defaulting to timbest0612@gmail.com if owner is active
 */
export function getCurrentUserProfile(): UserAccessProfile {
  const saved = localStorage.getItem('neuroflex_user_registration');
  const proSub = localStorage.getItem('neuroflex_pro_subscription');

  let email = 'timbest0612@gmail.com';
  let name = 'Platform Administrator';

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (parsed.email) {
        email = parsed.email;
        name = parsed.name || name;
      }
    } catch (e) {}
  }

  const isOwner = isPlatformOwnerEmail(email);
  const isPro = isOwner || !!proSub;

  return {
    email,
    name: isOwner ? (name.includes('Admin') ? name : `${name} (Owner)`) : name,
    isOwner,
    isPro,
    role: isOwner ? 'owner' : isPro ? 'pro' : email ? 'patient_early_access' : 'visitor',
    registeredAt: new Date().toISOString(),
  };
}
