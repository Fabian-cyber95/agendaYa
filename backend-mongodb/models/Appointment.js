import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

export default Appointment;
