import { DOCUMENT } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { Firestore, addDoc, collection, serverTimestamp } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { APP_LINKS, APP_PROFILE } from '../core/app-profile';
import { LanguageService } from '../core/language.service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';


interface ClinicTiming {
  day: string;
  time: string;
}

interface ViewClinic {
  name: string;
  address: string;
  bookLink: string;
  callLink: string;
  directionsLink: string;
  mapEmbedUrl: SafeResourceUrl;
  timings: ClinicTiming[];
}

interface Testimonial {
  quote: string;
  name: string;
  yearsAgo: number;
  rating: number;
}

interface TreatmentOffered {
  id: string;
  title: string;
  summary: string;
  intro: string;
  diagnosis: string[];
  treatmentPlan: string[];
}

interface AppointmentFormData {
  name: string;
  gender: string;
  age: string;
  phone: string;
  date: string;
  time: string;
}

@Component({
  selector: 'app-home',
  imports: [Header, Footer],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnDestroy, AfterViewChecked {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly document = inject(DOCUMENT);
  private readonly language = inject(LanguageService);
  private readonly firestore = inject(Firestore);
  readonly profile = APP_PROFILE;
  readonly links = APP_LINKS;
  @ViewChild('treatmentModalShell') treatmentModalShell?: ElementRef<HTMLElement>;
  @ViewChild('treatmentModalCloseBtn') treatmentModalCloseBtn?: ElementRef<HTMLButtonElement>;
  @ViewChild('appointmentModalShell') appointmentModalShell?: ElementRef<HTMLElement>;
  @ViewChild('appointmentModalCloseBtn') appointmentModalCloseBtn?: ElementRef<HTMLButtonElement>;
  private shouldFocusModal = false;
  private shouldFocusAppointmentModal = false;

  private readonly kimsSaveeraTimings: ClinicTiming[] = [
    { day: 'Monday to Saturday', time: '09:00 AM - 04:00 PM' },
    { day: 'Sunday', time: '09:00 AM - 01:00 PM' },
  ];

  private readonly diyaTimings: ClinicTiming[] = [
    { day: 'Monday to Saturday', time: '06:00 PM - 09:00 PM' },
  ];

  private readonly railwayGuntakalTimings: ClinicTiming[] = [
    { day: 'First Wednesday of Every Month', time: '11:00 AM - 02:00 PM' },
  ];

  private readonly vijethaGuntakalTimings: ClinicTiming[] = [
    { day: 'First Wednesday of Every Month', time: '05:00 PM - 09:00 PM' },
  ];

  private readonly kimsKurnoolTimings: ClinicTiming[] = [
    { day: '2nd, 3rd & 4th Wednesday', time: '10:00 AM - 05:00 PM' },
  ];

  private readonly sssihmsPuttaparthiTimings: ClinicTiming[] = [
    { day: 'First Saturday of Every Month', time: '10:00 AM - 04:00 PM' },
  ];

  readonly viewClinics: ViewClinic[] = [
    {
      name: 'KIMS - Saveera Hospital (Anantapur)',
      address:
        '1-1348, Srinagar Colony Extension, Opposite to Sakshi Office, Kakkalapalle, 80 Feet Road, Anantapur, Andhra Pradesh 515004, India.',
      bookLink: '#contact',
      callLink: this.links.bookingTelHref,
      directionsLink: 'https://maps.google.com/?q=KIMS+Saveera+Hospital+Anantapur',
      mapEmbedUrl: this.safeMap('https://www.google.com/maps?q=KIMS+Saveera+Hospital+Anantapur&output=embed'),
      timings: this.kimsSaveeraTimings,
    },
    {
      name: 'DiYa Superspeciality Care - Advanced Gastro and Pulmo Care',
      address:
        '12-3-59, 3rd Cross Rd, Beside Canara Bank, Sai Nagar, Anantapur, Andhra Pradesh 515001, India.',
      bookLink: '#contact',
      callLink: this.links.bookingTelHref,
      directionsLink: 'https://maps.google.com/?q=DiYa+Superspeciality+Care+Anantapur',
      mapEmbedUrl: this.safeMap('https://www.google.com/maps?q=DiYa+Superspeciality+Care+Anantapur&output=embed'),
      timings: this.diyaTimings,
    },
    {
      name: 'Railway Hospital, Guntakal',
      address: 'Guntakal, Andhra Pradesh, India.',
      bookLink: '#contact',
      callLink: this.links.bookingTelHref,
      directionsLink: 'https://maps.google.com/?q=Railway+Hospital+Guntakal',
      mapEmbedUrl: this.safeMap('https://www.google.com/maps?q=Railway+Hospital+Guntakal&output=embed'),
      timings: this.railwayGuntakalTimings,
    },
    {
      name: 'Vijetha Hospital, Guntakal',
      address: 'Guntakal, Andhra Pradesh, India.',
      bookLink: '#contact',
      callLink: this.links.bookingTelHref,
      directionsLink: 'https://maps.google.com/?q=Vijetha+Hospital+Guntakal',
      mapEmbedUrl: this.safeMap('https://www.google.com/maps?q=Vijetha+Hospital+Guntakal&output=embed'),
      timings: this.vijethaGuntakalTimings,
    },
    {
      name: 'KIMS Hospitals, Kurnool (Kurnool)',
      address:
        'Near New Ayyapa Swamy Temple, Kalluru, Kurnool, Andhra Pradesh 518002, India.',
      bookLink: '#contact',
      callLink: this.links.bookingTelHref,
      directionsLink: 'https://maps.google.com/?q=KIMS+Hospital+Kurnool',
      mapEmbedUrl: this.safeMap('https://www.google.com/maps?q=KIMS+Hospital+Kurnool&output=embed'),
      timings: this.kimsKurnoolTimings,
    },
    {
      name: 'Sri Sathya Sai Institute of Higher Medical Sciences - Prashantigram (Puttaparthi)',
      address:
        'Puttaparthi Main Rd, Prasanthigram, Bade Nayak Thanda, Andhra Pradesh 515134, India.',
      bookLink: '#contact',
      callLink: this.links.bookingTelHref,
      directionsLink: 'https://maps.google.com/?q=Sri+Sathya+Sai+Institute+of+Higher+Medical+Sciences+Prashantigram',
      mapEmbedUrl: this.safeMap('https://www.google.com/maps?q=Sri+Sathya+Sai+Institute+of+Higher+Medical+Sciences+Prashantigram&output=embed'),
      timings: this.sssihmsPuttaparthiTimings,
    },
  ];

  readonly testimonials: Testimonial[] = [
    {
      quote:
        'My father had severe asthma and improved a lot after treatment. Doctor explained everything clearly and gave us confidence throughout recovery.',
      name: 'Yadla Raju',
      yearsAgo: 2,
      rating: 5,
    },
    {
      quote:
        'I recommend Dr. Srikanth for anyone with lung problems. His examinations were clear and the care plan helped me regain better health.',
      name: 'Anudeep Banka',
      yearsAgo: 2,
      rating: 5,
    },
    {
      quote:
        'Very patient and attentive doctor. He listens to every concern, explains prescription details, and follows up with genuine care.',
      name: 'Vishnavi Sudheer Garu',
      yearsAgo: 2,
      rating: 5,
    },
    {
      quote:
        'Clinic is well organized and staff support is excellent. Appointment flow is smooth and treatment guidance is practical and effective.',
      name: 'Rakesh Varma',
      yearsAgo: 1,
      rating: 5,
    },
    {
      quote:
        'I was struggling with chronic cough for months. The diagnosis was precise and now my symptoms are under control.',
      name: 'Harini Devi',
      yearsAgo: 1,
      rating: 5,
    },
  ];

  readonly treatmentsOffered: TreatmentOffered[] = [
    {
      id: 'allergy-asthma',
      title: 'Allergy & Asthma Treatment',
      summary: 'Read more on Allergy & Asthma Treatment',
      intro:
        'Allergy and asthma can trigger breathing difficulty, coughing, and chest tightness. Early evaluation helps prevent recurrent attacks.',
      diagnosis: [
        'Detailed symptom review and trigger mapping.',
        'Lung function testing for airway assessment.',
        'Allergy profile review and clinical correlation.',
      ],
      treatmentPlan: [
        'Controller and reliever inhaler optimization.',
        'Trigger avoidance and home-care guidance.',
        'Regular follow-up to monitor response.',
      ],
    },
    {
      id: 'cough-breathlessness',
      title: 'Cough, Breathlessness, Wheezing, Chest Pain',
      summary: 'Read more on Cough, Breathlessness, Wheezing, and Chest Pain',
      intro:
        'Persistent cough and breathlessness may indicate airway, infection, or inflammatory lung conditions and need focused assessment.',
      diagnosis: [
        'Clinical examination and oxygen status check.',
        'Chest imaging when required.',
        'Targeted blood and sputum investigations.',
      ],
      treatmentPlan: [
        'Symptom stabilizing medication plan.',
        'Nebulization and inhalation support when needed.',
        'Cause-specific treatment after diagnosis.',
      ],
    },
    {
      id: 'covid-post-covid',
      title: 'COVID-19 and Post-COVID Problems',
      summary: 'Read more on COVID-19 and Post-COVID Problems',
      intro:
        'COVID and post-COVID respiratory symptoms may continue for weeks. Structured pulmonary follow-up improves recovery.',
      diagnosis: [
        'Respiratory symptom timeline and severity scoring.',
        'Pulse oximetry and lung function trend review.',
        'Imaging support for persistent symptoms.',
      ],
      treatmentPlan: [
        'Post-viral airway inflammation management.',
        'Breathing exercises and pulmonary rehab advice.',
        'Stepwise follow-up based on recovery response.',
      ],
    },
    {
      id: 'swine-flu-pneumonia',
      title: 'Swine Flu and Pneumonia Treatment',
      summary: 'Read more on Swine Flu and Pneumonia Treatment',
      intro:
        'Swine Flu (H1N1) and pneumonia can cause fever, cough, and breathing discomfort. Early diagnosis prevents complications.',
      diagnosis: [
        'Clinical assessment for fever, muscle pain, and cough.',
        'RT-PCR or antigen testing for influenza when indicated.',
        'Chest X-ray or CT for pneumonia severity assessment.',
      ],
      treatmentPlan: [
        'Antiviral medication in eligible cases.',
        'Antibiotic care for bacterial pneumonia as required.',
        'Hydration, oxygen support, and close monitoring.',
      ],
    },
    {
      id: 'lung-cancer',
      title: 'Expert Lung Cancer Diagnosis',
      summary: 'Read more on Expert Lung Cancer Diagnosis',
      intro:
        'Early lung cancer detection improves treatment planning. Timely diagnostic pathways are critical.',
      diagnosis: [
        'Risk history, imaging, and staging-oriented assessment.',
        'Biopsy planning in multidisciplinary coordination.',
        'Functional evaluation before treatment decisions.',
      ],
      treatmentPlan: [
        'Evidence-based referral and treatment planning.',
        'Symptom management and respiratory support.',
        'Longitudinal monitoring with oncology coordination.',
      ],
    },
    {
      id: 'snoring-sleep',
      title: 'Snoring and Other Sleep Problems',
      summary: 'Read more on Snoring and Sleep Problems',
      intro:
        'Snoring and poor sleep can indicate obstructive sleep apnea, leading to daytime fatigue and long-term health risks.',
      diagnosis: [
        'Sleep history and risk factor screening.',
        'Sleep study recommendation where needed.',
        'Airway and breathing pattern evaluation.',
      ],
      treatmentPlan: [
        'Lifestyle and sleep-hygiene optimization.',
        'CPAP/BiPAP therapy guidance for eligible patients.',
        'Regular follow-up for adherence and symptom relief.',
      ],
    },
    {
      id: 'ild',
      title: 'ILD (Interstitial Lung Disease)',
      summary: 'Read more on ILD Expert Opinion',
      intro:
        'Interstitial lung diseases involve lung tissue inflammation and scarring and require specialized evaluation.',
      diagnosis: [
        'Detailed clinical and exposure history.',
        'High-resolution CT interpretation.',
        'Autoimmune and related lab workup.',
      ],
      treatmentPlan: [
        'Cause-directed anti-inflammatory/anti-fibrotic strategy.',
        'Pulmonary rehabilitation and oxygen planning.',
        'Structured progression monitoring.',
      ],
    },
    {
      id: 'blood-investigations',
      title: 'All Blood Investigations',
      summary: 'Read more on All Blood Investigations',
      intro:
        'Comprehensive blood investigations support respiratory diagnosis, infection detection, and treatment monitoring.',
      diagnosis: [
        'Inflammatory marker and infection profile testing.',
        'Allergy and immune-related panel where needed.',
        'Baseline monitoring for chronic respiratory illness.',
      ],
      treatmentPlan: [
        'Test-guided medication refinement.',
        'Periodic re-evaluation for treatment response.',
        'Integrated review with clinical findings.',
      ],
    },
  ];

  testimonialIndex = 0;
  isTreatmentModalOpen = false;
  selectedTreatment: TreatmentOffered | null = null;
  isAppointmentModalOpen = false;
  appointmentSubmitAttempted = false;
  appointmentForm: AppointmentFormData = this.createDefaultAppointmentForm();
  readonly appointmentTimeSlots: string[] = ['18:00', '18:15', '18:30', '19:00', '19:30', '20:00'];
  isSubmittingAppointment = false;
  appointmentSubmitError = '';
  appointmentSubmitSuccess = '';

  get cardsPerView(): number {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return 1;
    }
    return 3;
  }

  get maxTestimonialIndex(): number {
    return Math.max(0, this.testimonials.length - this.cardsPerView);
  }

  get canGoPrevTestimonials(): boolean {
    return this.testimonialIndex > 0;
  }

  get canGoNextTestimonials(): boolean {
    return this.testimonialIndex < this.maxTestimonialIndex;
  }

  nextTestimonials(): void {
    if (this.canGoNextTestimonials) {
      this.testimonialIndex += 1;
    }
  }

  prevTestimonials(): void {
    if (this.canGoPrevTestimonials) {
      this.testimonialIndex -= 1;
    }
  }

  starText(rating: number): string {
    return '\u2605'.repeat(Math.max(0, Math.min(5, rating)));
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.testimonialIndex > this.maxTestimonialIndex) {
      this.testimonialIndex = this.maxTestimonialIndex;
    }
  }

  openTreatmentModal(item: TreatmentOffered): void {
    this.selectedTreatment = item;
    this.isTreatmentModalOpen = true;
    this.shouldFocusModal = true;
    this.syncBodyScroll();
  }

  closeTreatmentModal(): void {
    this.isTreatmentModalOpen = false;
    this.syncBodyScroll();
  }

  selectTreatment(item: TreatmentOffered): void {
    this.selectedTreatment = item;
  }

  t(key: string): string {
    return this.language.t(key);
  }

  onTestimonialsKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.nextTestimonials();
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.prevTestimonials();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onDocumentKeydown(event: KeyboardEvent): void {
    if (!this.isTreatmentModalOpen && !this.isAppointmentModalOpen) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      if (this.isAppointmentModalOpen) {
        this.closeAppointmentModal();
      } else {
        this.closeTreatmentModal();
      }
      return;
    }
    if (event.key === 'Tab') {
      if (this.isAppointmentModalOpen) {
        this.maintainModalFocus(event, this.appointmentModalShell?.nativeElement);
      } else {
        this.maintainModalFocus(event, this.treatmentModalShell?.nativeElement);
      }
    }
  }

  ngAfterViewChecked(): void {
    if (this.isTreatmentModalOpen && this.shouldFocusModal && this.treatmentModalCloseBtn) {
      this.treatmentModalCloseBtn.nativeElement.focus();
      this.shouldFocusModal = false;
    }
    if (this.isAppointmentModalOpen && this.shouldFocusAppointmentModal && this.appointmentModalCloseBtn) {
      this.appointmentModalCloseBtn.nativeElement.focus();
      this.shouldFocusAppointmentModal = false;
    }
  }

  openAppointmentModal(event?: Event): void {
    event?.preventDefault();
    this.appointmentSubmitAttempted = false;
    this.appointmentSubmitError = '';
    this.appointmentSubmitSuccess = '';
    this.isAppointmentModalOpen = true;
    this.shouldFocusAppointmentModal = true;
    this.syncBodyScroll();
  }

  closeAppointmentModal(): void {
    this.isAppointmentModalOpen = false;
    this.appointmentSubmitAttempted = false;
    this.syncBodyScroll();
  }

  setGender(gender: string): void {
    this.appointmentForm = {
      ...this.appointmentForm,
      gender,
    };
  }

  selectAppointmentTime(time: string): void {
    this.appointmentForm = {
      ...this.appointmentForm,
      time,
    };
  }

  updateAppointmentField(field: keyof AppointmentFormData, value: string): void {
    this.appointmentForm = {
      ...this.appointmentForm,
      [field]: value,
    };
  }

  isAppointmentFieldInvalid(field: keyof AppointmentFormData): boolean {
    if (!this.appointmentSubmitAttempted) {
      return false;
    }
    return !this.appointmentForm[field].trim();
  }

  async submitAppointment(): Promise<void> {
    this.appointmentSubmitAttempted = true;
    this.appointmentSubmitError = '';
    this.appointmentSubmitSuccess = '';
    if (!this.isAppointmentFormValid()) {
      return;
    }

    this.isSubmittingAppointment = true;
    try {
      await addDoc(collection(this.firestore, 'appointments'), {
        patientName: this.appointmentForm.name.trim(),
        gender: this.appointmentForm.gender,
        age: Number(this.appointmentForm.age),
        phoneNumber: this.appointmentForm.phone.trim(),
        appointmentDate: this.appointmentForm.date,
        appointmentTime: this.appointmentForm.time,
        source: 'website',
        createdAt: serverTimestamp(),
      });

      this.appointmentSubmitSuccess = 'Appointment booked successfully.';
      this.appointmentForm = this.createDefaultAppointmentForm();
      this.appointmentSubmitAttempted = false;
      this.closeAppointmentModal();
    } catch {
      this.appointmentSubmitError = 'Unable to book now. Please try again.';
    } finally {
      this.isSubmittingAppointment = false;
    }
  }

  formatAppointmentTime(time24: string): string {
    const [hourText, minute = '00'] = time24.split(':');
    const hour = Number(hourText);
    if (!Number.isFinite(hour)) {
      return time24;
    }
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${minute} ${period}`;
  }

  private safeMap(mapUrl: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(mapUrl);
  }

  private lockBodyScroll(): void {
    this.document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    this.document.body.style.overflow = '';
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
  }

  private maintainModalFocus(event: KeyboardEvent, modal?: HTMLElement): void {
    if (!modal) {
      return;
    }
    const focusable = modal.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) {
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = this.document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }

  private isAppointmentFormValid(): boolean {
    const { name, gender, age, phone, date, time } = this.appointmentForm;
    const ageValue = Number(age);
    return (
      !!name.trim() &&
      !!gender.trim() &&
      !!age.trim() &&
      Number.isFinite(ageValue) &&
      ageValue > 0 &&
      !!phone.trim() &&
      !!date.trim() &&
      !!time.trim()
    );
  }

  private syncBodyScroll(): void {
    if (this.isTreatmentModalOpen || this.isAppointmentModalOpen) {
      this.lockBodyScroll();
      return;
    }
    this.unlockBodyScroll();
  }

  private createDefaultAppointmentForm(): AppointmentFormData {
    return {
      name: '',
      gender: '',
      age: '',
      phone: '',
      date: '',
      time: '',
    };
  }
}
