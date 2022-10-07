/* eslint-disable max-len */
import Session from 'src/models/session/schema';
import dayjs from 'src/utils/dayjs';

export const fetchById = (sessionId) => Session.findOne({ _id: sessionId });

export const fetchByYear = (year) => Session.findOne({ year: Number(year) });

export const create = ({ year, ...otherProps }) => Session.findOneAndUpdate({ year: Number(year) }, { year: Number(year), ...otherProps }, { upsert: true, new: true });

export const fetchSessionToMix = () => Session.findOne({ mixDate: { $lte: dayjs().toDate() }, mixDone: false });

export const fetchSessionToFinish = () => Session.findOne({ year: Number(dayjs().format('YYYY')), finished: false });
