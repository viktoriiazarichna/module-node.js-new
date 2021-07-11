const { responseCodesEnum } = require('../constants');
const ErrorHandler = require('../errors');
const { WRONG_FILE_FORMAT } = require('../errors/error-messages');

const {
  constants: {
    DOCS_MIMETYPES,
    PHOTOS_MIMETYPES,
    VIDEOS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    VIDEO_MAX_SIZE
  }
} = require('../constants');

module.exports = {
  checkFiles: (req, res, next) => {
    try {
      const files = Object.values(req.files);

      const documents = [];
      const photos = [];
      const videos = [];

      for (let i = 0; i < files.length; i++) {
        const { name, size, mimetype } = files[i];

        if (DOCS_MIMETYPES.includes(mimetype)) {
          if (size > FILE_MAX_SIZE) {
            throw new Error(`File ${name} is too big`);
          }
          documents.push(files[i]);
        } else if (PHOTOS_MIMETYPES.includes(mimetype)) {
          if (size > PHOTO_MAX_SIZE) {
            throw new Error(`File ${name} is too big`);
          }
          photos.push(files[i]);
        } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
          if (size > VIDEO_MAX_SIZE) {
            throw new Error(`File ${name} is too big`);
          }
          videos.push(files[i]);
        } else {
          throw new ErrorHandler(responseCodesEnum.WRONG_FILE_TEMPLATE, WRONG_FILE_FORMAT.message, WRONG_FILE_FORMAT.code);
        }
      }

      req.documents = documents;
      req.photos = photos;
      req.videos = videos;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkAvatar: (req, res, next) => {
    try {
      if (req.photos.length > 1) {
        throw new Error('Only one avatar allowed');
      }
      [req.avatar] = req.photos;

      next();
    } catch (e) {
      next(e);
    }
  }
};
