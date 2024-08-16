import { Schema, model, models } from 'mongoose';
import User from './user';
import Wallet from './wallet';

// Define the schema for a user with automatic timestamps
const orgSchema = new Schema({
  orgName: {
    type: String,
    required: true,
  },
  orgClerkID: {
    type: String,
    required: true,
  },
  orgCreator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  orgAccounts: [{
    type: Schema.Types.ObjectId,
    ref: 'Wallet',
  }],
  accountEmail: {
    type: String,
    required: true,
  },
  orgType: [{
    type: String,
    required: true,
    enum: ['Retail', 'Business', 'Institution'],
    default: 'Retail',
  }],
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create a model using the schema
const Org = models.Org || model('Org', orgSchema);

export default Org;