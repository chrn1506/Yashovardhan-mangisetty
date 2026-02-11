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
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LanguageService } from '../core/language.service';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

interface ClinicTiming {
  dayKey: string;
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
  image: string;
  intro: string;
  diagnosis: string[];
  treatmentPlan: string[];
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
  @ViewChild('treatmentModalShell') treatmentModalShell?: ElementRef<HTMLElement>;
  @ViewChild('treatmentModalCloseBtn') treatmentModalCloseBtn?: ElementRef<HTMLButtonElement>;
  private shouldFocusModal = false;

  private readonly defaultTimings: ClinicTiming[] = [
    { dayKey: 'day.monday', time: '06:00 PM - 09:00 PM' },
    { dayKey: 'day.tuesday', time: '06:00 PM - 09:00 PM' },
    { dayKey: 'day.wednesday', time: '06:00 PM - 09:00 PM' },
    { dayKey: 'day.thursday', time: '06:00 PM - 09:00 PM' },
    { dayKey: 'day.friday', time: '06:00 PM - 09:00 PM' },
    { dayKey: 'day.saturday', time: '06:00 PM - 09:00 PM' },
    { dayKey: 'day.sunday', time: '06:00 PM - 09:00 PM' },
  ];

  readonly viewClinics: ViewClinic[] = [
    {
      name: 'Breath Well Pulmonology and Specialty Clinics',
      address:
        "Flat No. 101, First Floor, Kadiri's Apurupa Urban Apartments, Kondapur, Hyderabad, Telangana 500084, India.",
      bookLink: '#contact',
      callLink: 'tel:+919999999999',
      directionsLink: 'https://maps.google.com/?q=Kondapur+Hyderabad',
      mapEmbedUrl: this.safeMap('https://www.google.com/maps?q=Kondapur+Hyderabad&output=embed'),
      timings: this.defaultTimings,
    },
    {
      name: 'Yashoda Hospital',
      address:
        'JNTU to Hitech City Main Road, KPHB Colony, Kukatpally, Hyderabad, Telangana 500072, India.',
      bookLink: '#contact',
      callLink: 'tel:+919999999998',
      directionsLink: 'https://maps.google.com/?q=Yashoda+Hospital+Hyderabad',
      mapEmbedUrl: this.safeMap('https://www.google.com/maps?q=Yashoda+Hospital+Hyderabad&output=embed'),
      timings: this.defaultTimings,
    },
    {
      name: 'TENET and BREATH WELL Clinic',
      address:
        'TENET and BREATH WELL Clinic, Near Botanical Garden Road, Kondapur, Hyderabad, Telangana, India.',
      bookLink: '#contact',
      callLink: 'tel:+919999999997',
      directionsLink: 'https://maps.google.com/?q=TENET+and+BREATH+WELL+Clinic+Hyderabad',
      mapEmbedUrl: this.safeMap(
        'https://www.google.com/maps?q=TENET+and+BREATH+WELL+Clinic+Hyderabad&output=embed'
      ),
      timings: this.defaultTimings,
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
      image: '/assets/images/allergy.jpg',
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
      image: '/assets/images/allergy.jpg',
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
      image: '/assets/images/allergy.jpg',
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
      image: '/assets/images/allergy.jpg',
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
      image: '/assets/images/allergy.jpg',
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
      image: '/assets/images/allergy.jpg',
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
      image: '/assets/images/allergy.jpg',
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
      image: '/assets/images/allergy.jpg',
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
    this.lockBodyScroll();
  }

  closeTreatmentModal(): void {
    this.isTreatmentModalOpen = false;
    this.unlockBodyScroll();
  }

  selectTreatment(item: TreatmentOffered): void {
    this.selectedTreatment = item;
  }

  onTreatmentImageError(event: Event): void {
    const img = event.target as HTMLImageElement | null;
    if (!img) {
      return;
    }
    img.src = '/assets/images/docter_image1.jpeg';
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
    if (!this.isTreatmentModalOpen) {
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeTreatmentModal();
      return;
    }
    if (event.key === 'Tab') {
      this.maintainModalFocus(event);
    }
  }

  ngAfterViewChecked(): void {
    if (this.isTreatmentModalOpen && this.shouldFocusModal && this.treatmentModalCloseBtn) {
      this.treatmentModalCloseBtn.nativeElement.focus();
      this.shouldFocusModal = false;
    }
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

  private maintainModalFocus(event: KeyboardEvent): void {
    const modal = this.treatmentModalShell?.nativeElement;
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
}
