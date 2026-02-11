import { DOCUMENT } from '@angular/common';
import { Injectable, Signal, WritableSignal, inject, signal } from '@angular/core';

export type AppLanguage = 'en' | 'hi' | 'te';

type TranslationMap = Record<string, string>;
type LanguageDictionary = Record<AppLanguage, TranslationMap>;

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'app_lang';

  private readonly dictionary: LanguageDictionary = {
    en: {
      'lang.english': 'English',
      'lang.hindi': 'Hindi',
      'lang.telugu': 'Telugu',
      'nav.home': 'Home',
      'nav.about': 'About',
      'nav.gallery': 'Gallery',
      'nav.treatments': 'Treatments',
      'nav.contact': 'Contact',
      'booking.title': 'Book Appointment',
      'booking.specialty': 'Pulmonologist',
      'booking.availability': 'Available from 06:00 PM - 09:00 PM',
      'common.bookAppointment': 'Book Appointment',
      'common.callClinic': 'Call Clinic',
      'common.getDirections': 'Get Directions',
      'common.readMore': 'Read More',
      'about.title': 'About',
      'about.yearsExp': '12 years of experience',
      'about.socials': 'Socials',
      'clinic.title': 'View Our Clinic',
      'clinic.subtitle': 'Step into Our Clinic, Explore Amenities, Check Timings',
      'clinic.timingsTitle': 'My timings at the clinic',
      'testimonials.title': 'Testimonials',
      'testimonials.subtitle': 'Take a look at what our clients have to say about us',
      'gallery.title': 'Gallery',
      'treatments.title': 'Treatments Offered',
      'more.title': 'More',
      'treatments.subtitle': 'Take a look at some of the more common treatments offered by us',
      'treatments.other': 'Other treatments',
      'treatments.diagnosis': 'Diagnosis',
      'treatments.treatment': 'Treatment',
      'contact.title': 'Contact Us',
      'contact.subtitle': 'Get in touch with us for any inquiries',
      'contact.reach': 'Reach Us',
      'contact.email': 'Email',
      'contact.phone': 'Phone',
      'contact.address': 'Address',
      'contact.hours': 'Hours',
      'contact.needHelp': 'Need Assistance?',
      'contact.needHelpDesc':
        'Our medical team is available to help you with appointments, consultations, and general inquiries.',
      'contact.emailUs': 'Email Us',
      'contact.callNow': 'Call Now',
      'footer.about': 'About',
      'footer.contact': 'Contact',
      'footer.tagline':
        'Personalized pulmonary care with modern diagnostics and patient-focused treatment.',
      'footer.copyright': 'Copyright',
      'day.monday': 'Monday',
      'day.tuesday': 'Tuesday',
      'day.wednesday': 'Wednesday',
      'day.thursday': 'Thursday',
      'day.friday': 'Friday',
      'day.saturday': 'Saturday',
      'day.sunday': 'Sunday',
    },
    hi: {
      'lang.english': 'English',
      'lang.hindi': 'Hindi',
      'lang.telugu': 'Telugu',
      'nav.home': 'होम',
      'nav.about': 'परिचय',
      'nav.gallery': 'गैलरी',
      'nav.treatments': 'उपचार',
      'nav.contact': 'संपर्क',
      'booking.title': 'अपॉइंटमेंट बुक करें',
      'booking.specialty': 'फेफड़ों के विशेषज्ञ',
      'booking.availability': 'उपलब्ध समय: शाम 06:00 - 09:00',
      'common.bookAppointment': 'अपॉइंटमेंट बुक करें',
      'common.callClinic': 'क्लिनिक कॉल करें',
      'common.getDirections': 'दिशा देखें',
      'common.readMore': 'और पढ़ें',
      'about.title': 'परिचय',
      'about.yearsExp': '12 वर्ष का अनुभव',
      'about.socials': 'सोशल्स',
      'clinic.title': 'हमारे क्लिनिक देखें',
      'clinic.subtitle': 'क्लिनिक देखें, सुविधाएं जानें, समय देखें',
      'clinic.timingsTitle': 'क्लिनिक में मेरा समय',
      'testimonials.title': 'प्रशंसापत्र',
      'testimonials.subtitle': 'हमारे मरीज क्या कहते हैं, देखें',
      'gallery.title': 'गैलरी',
      'treatments.title': 'उपचार सेवाएं',
      'treatments.subtitle': 'हमारे सामान्य उपचार विकल्प देखें',
      'treatments.other': 'अन्य उपचार',
      'treatments.diagnosis': 'जांच',
      'treatments.treatment': 'उपचार',
      'contact.title': 'संपर्क करें',
      'contact.subtitle': 'किसी भी जानकारी के लिए हमसे संपर्क करें',
      'contact.reach': 'हमसे जुड़ें',
      'contact.email': 'ईमेल',
      'contact.phone': 'फोन',
      'contact.address': 'पता',
      'contact.hours': 'समय',
      'contact.needHelp': 'सहायता चाहिए?',
      'contact.needHelpDesc':
        'हमारी टीम अपॉइंटमेंट, परामर्श और सामान्य जानकारी में आपकी मदद के लिए उपलब्ध है।',
      'contact.emailUs': 'ईमेल करें',
      'contact.callNow': 'अभी कॉल करें',
      'footer.about': 'परिचय',
      'footer.contact': 'संपर्क',
      'footer.tagline':
        'आधुनिक जांच और मरीज-केंद्रित उपचार के साथ व्यक्तिगत श्वास देखभाल।',
      'footer.copyright': 'कॉपीराइट',
      'day.monday': 'सोमवार',
      'day.tuesday': 'मंगलवार',
      'day.wednesday': 'बुधवार',
      'day.thursday': 'गुरुवार',
      'day.friday': 'शुक्रवार',
      'day.saturday': 'शनिवार',
      'day.sunday': 'रविवार',
    },
    te: {
      'lang.english': 'English',
      'lang.hindi': 'Hindi',
      'lang.telugu': 'Telugu',
      'nav.home': 'హోమ్',
      'nav.about': 'గురించి',
      'nav.gallery': 'గ్యాలరీ',
      'nav.treatments': 'చికిత్సలు',
      'nav.contact': 'సంప్రదించండి',
      'booking.title': 'అపాయింట్మెంట్ బుక్ చేయండి',
      'booking.specialty': 'శ్వాసకోశ నిపుణుడు',
      'booking.availability': 'సమయం: సాయంత్రం 06:00 - 09:00',
      'common.bookAppointment': 'అపాయింట్మెంట్ బుక్ చేయండి',
      'common.callClinic': 'క్లినిక్‌కు కాల్ చేయండి',
      'common.getDirections': 'దిశలు చూడండి',
      'common.readMore': 'మరింత చదవండి',
      'about.title': 'గురించి',
      'about.yearsExp': '12 సంవత్సరాల అనుభవం',
      'about.socials': 'సోషల్‌లు',
      'clinic.title': 'మా క్లినిక్ చూడండి',
      'clinic.subtitle': 'మా క్లినిక్, సౌకర్యాలు, సమయాలు తెలుసుకోండి',
      'clinic.timingsTitle': 'క్లినిక్‌లో సమయాలు',
      'testimonials.title': 'అభిప్రాయాలు',
      'testimonials.subtitle': 'మా రోగులు చెప్పిన మాటలు చదవండి',
      'gallery.title': 'గ్యాలరీ',
      'treatments.title': 'అందించే చికిత్సలు',
      'treatments.subtitle': 'మేము అందించే సాధారణ చికిత్సలను చూడండి',
      'treatments.other': 'ఇతర చికిత్సలు',
      'treatments.diagnosis': 'నిర్ధారణ',
      'treatments.treatment': 'చికిత్స',
      'contact.title': 'సంప్రదించండి',
      'contact.subtitle': 'ఏవైనా ప్రశ్నల కోసం మమ్మల్ని సంప్రదించండి',
      'contact.reach': 'మా వివరాలు',
      'contact.email': 'ఈమెయిల్',
      'contact.phone': 'ఫోన్',
      'contact.address': 'చిరునామా',
      'contact.hours': 'పనిచేసే సమయం',
      'contact.needHelp': 'సహాయం కావాలా?',
      'contact.needHelpDesc':
        'అపాయింట్మెంట్లు, కన్సల్టేషన్‌లు మరియు సాధారణ సమాచారం కోసం మా వైద్య బృందం అందుబాటులో ఉంది.',
      'contact.emailUs': 'ఈమెయిల్ చేయండి',
      'contact.callNow': 'ఇప్పుడే కాల్ చేయండి',
      'footer.about': 'గురించి',
      'footer.contact': 'సంప్రదించండి',
      'footer.tagline':
        'ఆధునిక నిర్ధారణలతో, రోగి కేంద్రిత శ్వాసకోశ చికిత్సను అందిస్తున్నాము.',
      'footer.copyright': 'కాపీరైట్',
      'day.monday': 'సోమవారం',
      'day.tuesday': 'మంగళవారం',
      'day.wednesday': 'బుధవారం',
      'day.thursday': 'గురువారం',
      'day.friday': 'శుక్రవారం',
      'day.saturday': 'శనివారం',
      'day.sunday': 'ఆదివారం',
    },
  };

  private readonly activeLangSignal: WritableSignal<AppLanguage> = signal(this.readInitialLang());

  constructor() {
    this.updateDocumentLanguage(this.activeLangSignal());
  }

  get activeLang(): Signal<AppLanguage> {
    return this.activeLangSignal.asReadonly();
  }

  setLanguage(lang: AppLanguage): void {
    this.activeLangSignal.set(lang);
    localStorage.setItem(this.storageKey, lang);
    this.updateDocumentLanguage(lang);
  }

  t(key: string): string {
    const lang = this.activeLangSignal();
    return this.dictionary[lang][key] ?? this.dictionary.en[key] ?? key;
  }

  private readInitialLang(): AppLanguage {
    const stored = localStorage.getItem(this.storageKey);
    if (stored === 'en' || stored === 'hi' || stored === 'te') {
      return stored;
    }
    return 'en';
  }

  private updateDocumentLanguage(lang: AppLanguage): void {
    this.document.documentElement.lang = lang;
  }
}
