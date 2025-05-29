import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    avatar: {
      type: String,
      default: 'http://localhost:5000/uploads/default-avatar.png',
    }, // ← Cierre correcto de avatar

    // ✅ settings ahora está al mismo nivel que avatar
    settings: {
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      language: { type: String, enum: ['es', 'en'], default: 'es' },
      notifications: { type: Boolean, default: true },
      linkedAccounts: {
        google: { type: Boolean, default: false },
        facebook: { type: Boolean, default: false },
        twitter: { type: Boolean, default: false },
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('Users', userSchema);
export default User;
