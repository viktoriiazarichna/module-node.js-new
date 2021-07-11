module.exports = {
  PORT: 3000,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'Secret',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'Refresh_Secret',
  AUTHORIZATION: 'Authorization',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'noreply@example.com',
  ADMIN_EMAIL_PASSWORD: process.env.ADMIN_EMAIL_PASSWORD || '3265878',

  PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  VIDEO_MAX_SIZE: 15 * 1024 * 1024, // 15MB

  PHOTOS_MIMETYPES: [
    'image/gif',
    'image/jpeg',
    'image/pjpeg',
    'image/png',
    'image/tiff',
    'image/webp'
  ],

  DOCS_MIMETYPES: [
    'application/msword', // DOC
    'application/pdf', // PDF
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
  ],

  VIDEOS_MIMETYPES: [
    'video/mpeg',
    'video/mp4',
  ]
};
