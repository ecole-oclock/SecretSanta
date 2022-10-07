import mongoose, { Schema } from 'mongoose';
import dayjs from 'src/utils/dayjs';
import logger from 'src/utils/logger';
import { messages } from 'src/views';

const { Types } = Schema;

const ParticipantSchema = new Schema({
  id: {
    type: Types.String,
    unique: true,
    index: true,
  },
  secretSanta: Types.String,
  victim: Types.String,
  username: Types.String,
  name: Types.String,
  subscribedAt: Types.Date,
  wouldLikeToReceive: Types.String,
  clothesSize: Types.String,
  shoesSize: Types.String,
  postalAddress: Types.String,
}, { _id: false });

const SessionSchema = new Schema({
  channel: Types.String,
  secretSantaChannel: Types.String,
  creator: {
    type: Types.String,
    required: true,
  },
  startedAt: {
    type: Types.Date,
    default: new Date(),
  },
  mixDate: {
    type: Types.Date,
    default: dayjs()
      .day(13)
      .month(9)
      .hour(12)
      .minute(30)
      .toDate(),
  },
  mixDone: {
    type: Types.Boolean,
    default: false,
  },
  finished: {
    type: Types.Boolean,
    default: false,
  },
  year: {
    type: Types.Number,
    unique: true,
    default: Number(dayjs().format('YYYY')),
  },
  startTSMessage: Types.String,
  participants: {
    type: Types.Map,
    of: ParticipantSchema,
    default: {},
  },
});


SessionSchema.methods.addParticipant = async function addParticipant({ id, username, name }) {
  const participant = this.participants.get(id);
  if (participant) {
    logger.warn('Cette personne est déjà présente dans la session du secret santa');
    return participant;
  }

  this.participants.set(id, { id, username, name });
  return (await (this.save({ new: true })))?.participants?.get(id);
};

SessionSchema.methods.setParticipation = function setParticipation({ id: participantID }, participation) {
  const participant = this.participants.get(participantID);
  Object.keys(participation).forEach((key) => {
    participant[key] = participation[key];
  });
  participant.publishedAt = new Date();
  return this.save();
};

SessionSchema.methods.getRemainingParticipants = function getRemainingParticipants() {
  const remainingParticipants = [];
  this.participants.forEach((participant) => {
    if (!participant.publishedAt) {
      remainingParticipants.push(participant.name);
    }
  });
  return remainingParticipants;
};

SessionSchema.methods.publishRecap = async function publishRecap(client) {
  let message = {};

  if (this.publishedTSMessage) {
    message = await client.chat.update({
      channel: this.channel,
      ts: this.publishedTSMessage,
      blocks: messages.sessionRecap(this).getBlocks(),
    });
  } else {
    message = await client.chat.postMessage({
      channel: this.channel,
      blocks: messages.sessionRecap(this).getBlocks(),
    });
  }
  this.publishedTSMessage = message.ts;
  return this.save();
};

export default mongoose.model('Session', SessionSchema);
