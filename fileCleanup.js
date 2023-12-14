// fileCleanup.js

const path = require('path');
const fs = require('fs');

const cleanupFiles = () => {
  console.log('Running file deletion task...');
  const uploadDir = path.join(__dirname, 'uploads');

  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    files.forEach((file) => {
      const filePath = path.join(uploadDir, file);

      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error('Error getting file stats:', statErr);
          return;
        }

        if (stats.birthtime < twentyFourHoursAgo) {
          // Delete the file
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error('Error deleting file:', unlinkErr);
            } else {
              console.log(`Deleted file: ${file}`);
            }
          });
        }
      });
    });
  });
};

module.exports = cleanupFiles;
