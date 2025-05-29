import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  darkMode: { type: Boolean, default: false },
  language: { type: String, default: 'es' },
  notifications: { type: Boolean, default: true },
  linkedAccounts: {
    google: { type: Boolean, default: false },
    facebook: { type: Boolean, default: false },
    twitter: { type: Boolean, default: false },
  },
}, { timestamps: true });

const Settings = mongoose.model('Settings', settingsSchema);
export default Settings;
