const mongoose = require('mongoose');

const WorkerProfileSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },

  category: { 
    type: [String], 
    enum: ['Child Care', 'Patient Care', 'Domestic Help'], 
    required: true 
  },

  experienceYears: { 
    type: Number, 
    required: true 
 },

  skills: [{ type: String }], // e.g., ['First Aid', 'Cooking', 'Newborn Care']

  hourlyRate: { 
    type: Number, 
    required: true 
  },

  monthlyRate: { 
    type: Number 
  }, // Optional

  bio: { 
    type: String 
  },

  isVerified: { 
    type: Boolean, 
    default: false 
  }, // Admin කෙනෙක් verify කළාම true වෙයි

  verificationDocuments: {
    idFront: { type: String },
    idBack: { type: String },
    policeReport: { type: String }
  },
  
  averageRating: { type: Number, default: 0 },
  isAvailable: { type: Boolean, default: true }
});

module.exports = mongoose.model('WorkerProfile', WorkerProfileSchema);