export const APP_PROFILE = {
  doctorName: 'Dr. Yashovardhan Mangisetty',
  email: 'breathwellclinic@gmail.com',
  mobileNumberDisplay: '+91 8121418826',
  mobileNumberE164: '+918121418826',
  bookingNumberDisplay: '+91 8121418826',
  bookingNumberE164: '+918121418826',
  whatsappNumberE164: '918121418826',
  whatsappMessage: 'Hello Doctor, I need assistance.',
} as const;

function createWhatsAppUrl(phoneE164: string, message: string): string {
  return `https://wa.me/${phoneE164}?text=${encodeURIComponent(message)}`;
}

export const APP_LINKS = {
  emailHref: `mailto:${APP_PROFILE.email}`,
  mobileTelHref: `tel:${APP_PROFILE.mobileNumberE164}`,
  bookingTelHref: `tel:${APP_PROFILE.bookingNumberE164}`,
  whatsappHref: createWhatsAppUrl(APP_PROFILE.whatsappNumberE164, APP_PROFILE.whatsappMessage),
} as const;
