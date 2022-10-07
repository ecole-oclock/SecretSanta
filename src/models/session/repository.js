/* eslint-disable max-len */
import Session from 'src/models/session/schema';

export const fetchById = (sessionId) => Session.findOne({ _id: sessionId });

export const fetchByYear = (year) => Session.findOne({ year: Number(year) });

export const create = ({ startedAt, ...otherProps }) => Session.findOneAndUpdate({ startedAt }, { startedAt, ...otherProps }, { upsert: true, new: true });
