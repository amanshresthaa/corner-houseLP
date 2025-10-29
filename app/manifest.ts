import type { MetadataRoute } from 'next';

const { themes } = require('../theme/colors');

export default function manifest(): MetadataRoute.Manifest {
  const light = themes.light.colors;

  const iconDefinitions: Array<{
    src: string;
    sizes: string;
    purposes: Array<'any' | 'maskable' | 'monochrome' | 'badge'>;
  }> = [
    { src: '/icon-72.png', sizes: '72x72', purposes: ['any'] },
    { src: '/icon-96.png', sizes: '96x96', purposes: ['any'] },
    { src: '/icon-128.png', sizes: '128x128', purposes: ['any'] },
    { src: '/icon-144.png', sizes: '144x144', purposes: ['any'] },
    { src: '/icon-152.png', sizes: '152x152', purposes: ['any'] },
    { src: '/icon-192.png', sizes: '192x192', purposes: ['any', 'maskable'] },
    { src: '/icon-384.png', sizes: '384x384', purposes: ['any'] },
    { src: '/icon-512.png', sizes: '512x512', purposes: ['any', 'maskable'] },
  ];

  const icons = iconDefinitions.flatMap(({ purposes, ...icon }) =>
    purposes.map((purpose) => ({
      ...icon,
      type: 'image/png' as const,
      purpose,
    }))
  );

  const screenshots = [
    {
      src: '/screenshot-mobile-1.png',
      sizes: '375x667',
      type: 'image/png',
      form_factor: 'narrow',
      label: 'Menu browsing on mobile',
    },
    {
      src: '/screenshot-mobile-2.png',
      sizes: '375x667',
      type: 'image/png',
      form_factor: 'narrow',
      label: 'Restaurant information and booking',
    },
    {
      src: '/screenshot-desktop-1.png',
      sizes: '1280x720',
      type: 'image/png',
      form_factor: 'wide',
      label: 'Full menu experience on desktop',
    },
  ];

  const launchHandler = {
    client_mode: 'focus-existing',
  };

  const manifestData = {
    name: 'Old Crown Restaurant - Authentic Nepalese Cuisine',
    short_name: 'Old Crown',
    description:
      'Authentic Nepalese cuisine and traditional pub classics in Girton, Cambridge. Book a table, order takeaway, or explore our award-winning menu.',
    start_url: '/',
    display: 'standalone',
    theme_color: light.primaryAccent,
    background_color: light.background,
    id: 'old-crown-restaurant-app',
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['food', 'lifestyle', 'business'],
    lang: 'en-GB',
    dir: 'ltr',
    icons,
    screenshots,
    shortcuts: [
      {
        name: 'View Menu',
        short_name: 'Menu',
        description: 'Browse our authentic Nepalese and pub menu',
        url: '/menu',
        icons: [{ src: '/menu-shortcut-96.png', sizes: '96x96', type: 'image/png' }],
      },
      {
        name: 'Book Table',
        short_name: 'Book',
        description: 'Reserve a table at Old Crown Restaurant',
        url: '/contact?action=booking',
        icons: [{ src: '/booking-shortcut-96.png', sizes: '96x96', type: 'image/png' }],
      },
      {
        name: 'Events',
        short_name: 'Events',
        description: 'View upcoming events and special offers',
        url: '/events',
        icons: [{ src: '/events-shortcut-96.png', sizes: '96x96', type: 'image/png' }],
      },
      {
        name: 'Contact Us',
        short_name: 'Contact',
        description: 'Get in touch with Old Crown Restaurant',
        url: '/contact',
        icons: [{ src: '/contact-shortcut-96.png', sizes: '96x96', type: 'image/png' }],
      },
    ],
    edge_side_panel: {
      preferred_width: 400,
    },
    launch_handler: launchHandler,
    related_applications: [
      {
        platform: 'play',
        url: 'https://play.google.com/store/apps/details?id=com.oldcrown.restaurant',
      },
      {
        platform: 'itunes',
        url: 'https://apps.apple.com/app/old-crown-restaurant/id123456789',
      },
    ],
    prefer_related_applications: false,
    protocol_handlers: [
      { protocol: 'mailto', url: '/contact?email=%s' },
      { protocol: 'tel', url: '/contact?phone=%s' },
    ],
    file_handlers: [
      {
        action: '/share',
        accept: [
          {
            'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
          },
        ],
      },
    ],
    share_target: {
      action: '/share',
      method: 'post',
      enctype: 'multipart/form-data',
      params: {
        title: 'title',
        text: 'text',
        url: 'url',
        files: [
          {
            name: 'file',
            accept: ['image/*'],
          },
        ],
      },
    },
  };

  // Next.js manifest typings lag behind the latest spec, so we cast to satisfy the route contract
  // while preserving extended fields (edge_side_panel, launch_handler client_mode, screenshot metadata).
  return manifestData as unknown as MetadataRoute.Manifest;
}
