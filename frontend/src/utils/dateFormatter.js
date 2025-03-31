import { DateTime } from "luxon";

export const dateFormatter = (date, format = "DDD") =>
  DateTime.fromISO(date).toFormat(format);
