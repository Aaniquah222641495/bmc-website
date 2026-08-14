export type ProgrammeType = 'online' | 'inperson';

export interface Programme {
  title: string;
  path: string;
  /** Short teaser copy, used on the homepage. */
  descShort: string;
  /** Fuller copy, used on the Programmes page. */
  descLong: string;
  tag: string;
  price: string;
  type: ProgrammeType;
  image?: string;
  imagePosition?: string;
  gradient: string;
}

/**
 * Single source of truth for the site's six programmes.
 * Consumed by both the homepage teaser (Home) and the full listing (Programmes).
 */
export const PROGRAMMES: Programme[] = [
  {
    title: "Women's Online Madrasah",
    path: "/womens-classes",
    descShort: "Beginner-friendly Islamic studies for women 18+. Pre-recorded lessons on Google Classroom so you can learn at your own pace.",
    descLong: "Beginner-friendly Islamic studies for women 18+. Pre-recorded lessons on Google Classroom so you can learn at your own pace. Covers Aqaaid, Fiqh, Tajweed, Seerah, Akhlaaq, Hadith & Du'as.",
    tag: "Online · Self-paced",
    price: "R150/month",
    type: "online",
    image: "/assets/photo-womens-madrasah.webp",
    gradient: "from-emerald-800 to-emerald-950",
  },
  {
    title: "Women's Hifdh Programme",
    path: "/hifdh-classes",
    descShort: "Structured online Qur'an memorisation for women. Live classes Mon, Wed & Fri via Microsoft Teams.",
    descLong: "Structured online Qur'an memorisation for women. Live classes Mon, Wed & Fri via Microsoft Teams, covering memorisation, revision and recitation.",
    tag: "Online · Live classes",
    price: "R200/month",
    type: "online",
    image: "/assets/photo-quran-lesson.webp",
    imagePosition: "center 40%",
    gradient: "from-violet-800 to-violet-950",
  },
  {
    title: "Children's Online Madrasah",
    path: "/childrens-classes",
    descShort: "Live online Islamic classes for children aged 6–13, three times a week via Microsoft Teams.",
    descLong: "Live online Islamic classes for children aged 6–13, three times a week via Microsoft Teams. Covers Qur'an, Surahs, Aqaaid, Fiqh, Akhlaaq, Islamic History & Du'as.",
    tag: "Online · Ages 6–13",
    price: "R150/month",
    type: "online",
    image: "/assets/photo-childrens-class.webp",
    gradient: "from-sky-800 to-sky-950",
  },
  {
    title: "Online Workshops & Short Courses",
    path: "/workshops",
    descShort: "Once-off online workshops on specific Islamic topics: Women in Islam, Salaah, Wudhu & Ghusl, and more.",
    descLong: "Once-off online workshops on specific Islamic topics: Women in Islam, Salaah, Wudhu & Ghusl, Ramadan preparation and more.",
    tag: "Online · Once-off",
    price: "From R100",
    type: "online",
    image: "/assets/photo-workshop-stage.webp",
    imagePosition: "center 28%",
    gradient: "from-[#1B4332] to-[#0d2419]",
  },
  {
    title: "Get Into Qur'an: In Person",
    path: "/quran-classes",
    descShort: "A Qur'an programme for complete beginners. Step-by-step guidance toward confidently reading the Mushaf.",
    descLong: "A Qur'an programme for complete beginners. Step-by-step guidance toward confidently reading the Mushaf. Every Saturday morning in Mitchell's Plain, Cape Town.",
    tag: "In-Person · Cape Town",
    price: "R200/month",
    type: "inperson",
    image: "/assets/photo-quran-completion.webp",
    imagePosition: "center 36%",
    gradient: "from-amber-800 to-amber-950",
  },
  {
    title: "In-Person Workshops",
    path: "/in-person-workshops",
    descShort: "Interactive face-to-face workshops on important Islamic topics, with open discussion and practical learning.",
    descLong: "Interactive face-to-face workshops on important Islamic topics, with open discussion and practical learning.",
    tag: "In-Person",
    price: "From R100",
    type: "inperson",
    image: "/assets/photo-wudhu-workshop-2.webp",
    imagePosition: "center 60%",
    gradient: "from-rose-800 to-rose-950",
  },
];
