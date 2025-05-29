import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  imageUrl: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // 
    required: true,
  },
  images: [{ type: String }],
  staff: [{ type: String }], 
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
