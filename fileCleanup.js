// fileCleanup.js

const mongoose = require('mongoose');
const File = require('./models/file'); 
const path = require('path');
const fs = require('fs/promises');

const cleanupFiles = async () => {
  console.log('Running file cleanup task...');

  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Find files older than 24 hours in MongoDB
    const oldFiles = await File.find({ createdAt: { $lt: twentyFourHoursAgo } });

    // Delete files from MongoDB and also remove the corresponding files from disk
    await Promise.all(
      oldFiles.map(async (file) => {
        const filePath = path.join(__dirname, 'uploads', file.filename);

        // Delete the file from disk
        await fs.unlink(filePath);

        // Delete the file document from MongoDB
        await File.findByIdAndDelete(file._id);
      })
    );

    console.log('File cleanup completed.');
  } catch (error) {
    console.error('Error during file cleanup:', error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
  }
};

module.exports = cleanupFiles;
