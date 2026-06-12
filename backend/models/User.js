const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
},

  email: { 
    type: String, 
    required: true, 
    unique: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  phone: { 
    type: String, 
    required: true 
  },

  role: { 
    type: String, 
    enum: ['customer', 'worker', 'admin'], 
    default: 'customer' 
  },

  profilePicture: { 
    type: String, 
    default: '' 
 },

  location: {
    type: { 
        type: String, 
        default: 'Point' 
    },
    coordinates: { 
        type: [Number], 
        index: '2dsphere' 
    } // [longitude, latitude] - GPS search වලට ලේසි වෙන්න
  },

  createdAt: { 
    type: Date, 
    default: Date.now 
}
});

module.exports = mongoose.model('User', UserSchema);