const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({

  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  worker: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  category: { 
    type: String, 
    required: true 
  }, // e.g., 'Child Care'

  startDate: { 
    type: Date, 
    required: true 
  },

  endDate: { 
    type: Date, 
    required: true 
  },
  
  bookingType: { 
    type: String, 
    enum: ['Hourly', 'Daily', 'Monthly'], 
    required: true 
  },

  totalPrice: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'], 
    default: 'pending' 
  },

  address: { 
    type: String, 
    required: true 
  },

  specialNotes: { 
    type: String 
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Booking', BookingSchema);