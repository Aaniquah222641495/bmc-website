// FAQ shown on /faq and used verbatim for FAQPage structured data (lib/structured-data.ts).
export const CATEGORIES = [
  {
    label: 'Getting started',
    items: [
      {
        q: 'Are classes suitable for complete beginners?',
        a: 'Absolutely. That is exactly what we are here for. Our programmes are designed from the ground up for beginners. No prior knowledge of Arabic, Qur\'an, or Islamic studies is required. You are welcome exactly as you are.',
      },
      {
        q: 'I am a revert. Where do I start?',
        a: "Welcome to Islam. May Allah make your journey beautiful. Our Women's Online Madrasah is an excellent starting point. It covers all the foundational knowledge a new Muslim needs, in a gentle, supportive, and completely judgement-free environment. Feel free to reach out on WhatsApp and we will guide you personally.",
      },
      {
        q: 'What do I need to get started?',
        a: "Just a stable internet connection, a device to join class on, and an open heart. We provide all learning materials. For the in-person Get Into Qur'an class, you will need to be able to travel to Woodlands, Mitchell's Plain on Saturday mornings. The exact address is shared after you register.",
      },
    ],
  },
  {
    label: 'Classes and logistics',
    items: [
      {
        q: 'How do online classes work?',
        a: 'Classes are held live via Microsoft Teams or Google Classroom, depending on the programme. You will receive all access details before your first session. Some programmes also have pre-recorded lessons available on Google Classroom so you can learn at your own pace.',
      },
      {
        q: 'What platform are classes held on?',
        a: "Children's Online Madrasah and the Women's Hifdh Programme are held live via Microsoft Teams. The Women's Online Madrasah uses Google Classroom with pre-recorded lessons. Get Into Qur'an meets in person on Saturdays in Woodlands, Mitchell's Plain, and online on Tuesday evenings.",
      },
      {
        q: 'What if I miss a session?',
        a: "We understand life gets busy. The Women's Online Madrasah has pre-recorded lessons you can access at any time. For live programmes, please contact Mualimah Rukeya directly and she will do her best to assist with missed session queries.",
      },
      {
        q: 'Do you have classes for children under 6 or teenagers?',
        a: "Not at this stage. The Children's Online Madrasah is for children aged 6 to 13. We do not offer classes for children under 6 or teenagers aged 14 to 17 yet.",
      },
      {
        q: "How do I join the Children's Classes?",
        a: "Register via the Children's Classes page. Pay the once-off R50 registration fee straight after registering to secure your child's spot. You will receive the Microsoft Teams link and all class details before the first session.",
      },
    ],
  },
  {
    label: 'Payments and policies',
    items: [
      {
        q: 'How do I pay for my class?',
        a: 'Payment is by EFT (bank transfer). You get the bank details when you register, with your name and surname as the reference. Every programme has a once-off R50 registration fee, paid straight after registering, then the monthly fee. Once you have paid, send your proof of payment to Mualimah Rukeya on WhatsApp. If anything is unclear, just message us.',
      },
      {
        q: 'What is the refund policy?',
        a: 'Please reach out to us on WhatsApp if you have any concerns about your registration or payment. We handle each situation with care and understanding, and we will always try to find a solution that works for you.',
      },
    ],
  },
];

/** Look up FAQ answers by their exact question, so class pages reuse the same wording as /faq. */
export function faqByQuestion(...questions: string[]): { q: string; a: string }[] {
  const all = CATEGORIES.flatMap((c) => c.items);
  return questions.map((q) => {
    const hit = all.find((i) => i.q === q);
    if (!hit) throw new Error(`FAQ question not found: ${q}`);
    return hit;
  });
}
