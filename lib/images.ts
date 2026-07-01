/** Verified Unsplash URLs — auto=format ensures compatibility */
export function unsplash(photoId: string, width = 1400) {
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=${width}&q=85`;
}

/** Looping hero background — doctor at clinic (Pexels, verified) */
export const heroVideoSrc =
  "https://videos.pexels.com/video-files/6997946/6997946-hd_1920_1080_25fps.mp4";

export const unsplashImages = {
  hero: unsplash("photo-1576091160550-2173dba999ef", 1800),
  heroAlt: unsplash("photo-1493894473891-10fc1e5dbd22", 1800),
  heroDoctor: unsplash("photo-1584515933487-779824d29309", 1800),
  heroPatient: unsplash("photo-1576091160399-112ba8d25d1d", 1200),
  /** Dr. Sharma card — distinct from background doctor imagery */
  heroSpecialist: unsplash("photo-1594824476967-48c8b964273f", 800),
  about: unsplash("photo-1629909613654-28e377c37b09", 1400),
  lab: unsplash("photo-1530026405186-ed1f139313f8", 1400),
  clinic: unsplash("photo-1519494026892-80bbd2d6fd0d", 1400),
  doctor: unsplash("photo-1612349317150-e413f6a5b16d", 1000),
  doctorFemale: unsplash("photo-1559839734-2b71ea197ec2", 1000),
  dashboard: unsplash("photo-1460925895917-afdab827c52f", 1600),
  team: unsplash("photo-1576091160399-112ba8d25d1d", 1400),
  embryology: unsplash("photo-1559757148-5c350d0d3c56", 1400),
  hospital: unsplash("photo-1516549655169-df83a0774514", 1400),
  medical: unsplash("photo-1576091160399-112ba8d25d1d", 1400),
  technology: unsplash("photo-1555255707-c07966088b7b", 1400),
  consultation: unsplash("photo-1519494026892-80bbd2d6fd0d", 1400),
  nurse: unsplash("photo-1576091160399-112ba8d25d1d", 1000),
  analytics: unsplash("photo-1551288049-bebda4e38f71", 1600),
  fertility: unsplash("photo-1576091160550-2173dba999ef", 1400),
  patientCouple: unsplash("photo-1493894473891-10fc1e5dbd22", 1400),
  billing: unsplash("photo-1516549655169-df83a0774514", 1400),
  consent: unsplash("photo-1450101499163-c8848c66ca85", 1400),
  pharmacy: unsplash("photo-1530026405186-ed1f139313f8", 1400),
  reception: unsplash("photo-1519494026892-80bbd2d6fd0d", 1400),
  staff: unsplash("photo-1551434678-e076c223a692", 1400),
  microscope: unsplash("photo-1530026405186-ed1f139313f8", 1400),
  happyPatient: unsplash("photo-1493894473891-10fc1e5dbd22", 1200),
};

export const moduleImages = {
  hospital: unsplashImages.hospital,
  "user-master": unsplashImages.staff,
  patient: unsplashImages.doctorFemale,
  "cycle-navigator": unsplashImages.lab,
  consent: unsplashImages.consent,
  billing: unsplashImages.billing,
  reports: unsplashImages.analytics,
};

/** Patient journey step images — keys match patientJourney.imageKey */
export const journeyImages: Record<string, string> = {
  consultation: unsplashImages.consultation,
  doctorFemale: unsplashImages.doctorFemale,
  lab: unsplashImages.lab,
  technology: unsplashImages.technology,
  fertility: unsplashImages.fertility,
  embryology: unsplashImages.embryology,
  medical: unsplashImages.medical,
  patientCouple: unsplashImages.patientCouple,
  billing: unsplashImages.billing,
  analytics: unsplashImages.analytics,
};

/** PDF download card thumbnails — IVF / healthcare only */
export const downloadCardImages = [
  unsplashImages.fertility,
  unsplashImages.hospital,
  unsplashImages.lab,
  unsplashImages.clinic,
];

export const galleryImages = [
  { src: unsplashImages.doctorFemale, alt: "Fertility specialist" },
  { src: unsplashImages.patientCouple, alt: "Patient care" },
  { src: unsplashImages.lab, alt: "Embryology lab" },
  { src: unsplashImages.hospital, alt: "Hospital & billing" },
  { src: unsplashImages.clinic, alt: "IVF clinic" },
  { src: unsplashImages.dashboard, alt: "Healthcare analytics" },
  { src: unsplashImages.consultation, alt: "Doctor consultation" },
  { src: unsplashImages.fertility, alt: "Fertility treatment" },
  { src: unsplashImages.embryology, alt: "Lab precision" },
  { src: unsplashImages.happyPatient, alt: "Happy patients" },
  { src: unsplashImages.hospital, alt: "Hospital network" },
  { src: unsplashImages.nurse, alt: "Clinical team" },
];
