import { defineConfig } from 'tinacms';

// Netlify exposes the deploy branch as HEAD; Tina Cloud needs the branch it
// should read from and write commits to.
const branch =
  process.env.TINA_BRANCH ||
  process.env.HEAD ||
  'main';

export default defineConfig({
  branch,
  // Set both in the host env (Netlify) once the Tina Cloud project exists.
  // Left null so `tinacms dev` still runs fully offline against local files.
  clientId: process.env.TINA_CLIENT_ID ?? null,
  token: process.env.TINA_TOKEN ?? null,

  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      // Uploads land in public/assets alongside the hand-optimised images.
      // For best performance, convert photos to WebP before uploading.
      mediaRoot: 'assets',
      publicFolder: 'public',
    },
  },

  schema: {
    collections: [
      {
        name: 'programmes',
        label: 'Programmes',
        path: 'content/settings',
        format: 'json',
        match: { include: 'programmes' },
        // Fixed set of 6. Each has a hand-built detail page in code, so the
        // list is edited in place rather than added to / removed from here.
        ui: {
          allowedActions: { create: false, delete: false },
        },
        fields: [
          {
            type: 'object',
            name: 'programmes',
            label: 'Programme cards',
            list: true,
            ui: {
              itemProps: (item?: { title?: string }) => ({
                label: item?.title ?? 'Programme',
              }),
            },
            fields: [
              {
                type: 'string',
                name: 'title',
                label: 'Title',
                required: true,
              },
              {
                type: 'string',
                name: 'path',
                label: 'Detail page path',
                required: true,
                description:
                  'Route the card links to, e.g. /womens-classes. A brand-new programme also needs a developer to build its detail page at this path.',
              },
              {
                type: 'string',
                name: 'descShort',
                label: 'Short description (homepage teaser)',
                required: true,
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'descLong',
                label: 'Full description (Programmes page)',
                required: true,
                ui: { component: 'textarea' },
              },
              {
                type: 'string',
                name: 'tag',
                label: 'Tag pill',
                required: true,
                description: 'Small label on the card, e.g. "Online · Self-paced".',
              },
              {
                type: 'string',
                name: 'price',
                label: 'Price label',
                required: true,
                description: 'e.g. "R150/month" or "From R100".',
              },
              {
                type: 'string',
                name: 'type',
                label: 'Type',
                required: true,
                options: [
                  { value: 'online', label: 'Online' },
                  { value: 'inperson', label: 'In person' },
                ],
              },
              {
                type: 'image',
                name: 'image',
                label: 'Card image',
              },
              {
                type: 'string',
                name: 'imagePosition',
                label: 'Image focus point',
                description: 'CSS object-position, e.g. "center 40%". Optional.',
              },
              {
                type: 'string',
                name: 'gradient',
                label: 'Fallback gradient',
                description:
                  'Tailwind classes shown when there is no image, e.g. "from-emerald-800 to-emerald-950".',
              },
            ],
          },
        ],
      },

      {
        name: 'workshop',
        label: 'Workshops',
        path: 'content/workshops',
        format: 'json',
        defaultItem: () => ({
          page: 'online',
          status: 'available',
          order: 10,
          topicsLabel: 'Topics Covered',
        }),
        ui: {
          filename: {
            slugify: (values?: { title?: string }) =>
              (values?.title || 'workshop')
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, ''),
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            required: true,
            isTitle: true,
          },
          {
            type: 'string',
            name: 'page',
            label: 'Shows on',
            required: true,
            options: [
              { value: 'online', label: 'Online workshops page' },
              { value: 'in-person', label: 'In-person workshops page' },
            ],
          },
          {
            type: 'string',
            name: 'status',
            label: 'Status',
            required: true,
            options: [
              { value: 'available', label: 'Available now' },
              { value: 'past', label: 'Past workshop' },
            ],
          },
          {
            type: 'number',
            name: 'order',
            label: 'Sort order',
            description: 'Lower numbers show first within their section.',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: { component: 'textarea' },
          },
          {
            type: 'image',
            name: 'image',
            label: 'Image',
          },
          {
            type: 'string',
            name: 'imageAlt',
            label: 'Image alt text',
          },
          {
            type: 'string',
            name: 'badge',
            label: 'Badge pill',
            description: 'Available-now workshops, e.g. "Online Workshop" or "4-Week Online Course".',
          },
          {
            type: 'string',
            name: 'subtitle',
            label: 'Subtitle',
            description: 'Available-now workshops only.',
          },
          {
            type: 'string',
            name: 'typeLabel',
            label: 'Format label',
            description: 'Shown on the past-workshops grid, e.g. "Online" or "In-Person".',
          },
          {
            type: 'object',
            name: 'details',
            label: 'Detail chips',
            list: true,
            description: 'Available-now workshops: Format / Date / Time / Investment.',
            ui: {
              itemProps: (item?: { label?: string }) => ({
                label: item?.label ?? 'Detail',
              }),
            },
            fields: [
              { type: 'string', name: 'label', label: 'Label' },
              { type: 'string', name: 'value', label: 'Value' },
            ],
          },
          {
            type: 'string',
            name: 'topicsLabel',
            label: 'Topics heading',
            description: 'e.g. "Topics Covered" or "Topics Include".',
          },
          {
            type: 'string',
            name: 'topics',
            label: 'Topics',
            list: true,
          },
          {
            type: 'string',
            name: 'includes',
            label: "What you'll receive",
            list: true,
            description: 'Available-now workshops only.',
          },
          {
            type: 'string',
            name: 'registrationUrl',
            label: 'Registration form URL',
            description: 'Use the public form link (ends in /viewform for Google Forms), not an edit link.',
          },
        ],
      },
    ],
  },
});
