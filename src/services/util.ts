import moment from "moment-timezone";

export const hoursUntilDate = (targetDate: Date) => {
  const now = moment(new Date());
  const end = moment(targetDate);
  const duration = moment.duration(end.diff(now));
  const hours = duration.asHours();
  const isMoreThan2HoursAway = hours > 2;
  const isMoreThan48HoursFinished = hours < -48;
  const hasStarted = now >= end;
  return { hours, isMoreThan2HoursAway, isMoreThan48HoursFinished, hasStarted };
};

export const calculateTimeLeft = () => {
  const now = new Date();
  const end = new Date("2023-07-20T03:00:00");
  let seconds = Math.floor(Math.abs(end.getTime() - now.getTime()) / 1000);

  if (now > end) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      showCountdown: false,
    };
  }

  const days = Math.floor(seconds / (24 * 60 * 60));
  seconds -= days * 24 * 60 * 60;
  const hours = Math.floor(seconds / (60 * 60));
  seconds -= hours * 60 * 60;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    showCountdown: true,
  };
};

export const formatLocalDate = (utcTimestamp: Date) => {
  const local = moment(utcTimestamp).local().format("ddd, MMMM Do h:mma z");
  const tz = moment().tz(moment.tz.guess()).format("z");
  return `${local} ${tz}`;
};

export const formatLocalDateShort = (utcTimestamp: Date) => {
  const local = moment(utcTimestamp).local().format("MMM DD");
  return local;
};

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const shuffleArray = (array: any[], limit?: number) => {
  const shuffled = array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  return limit ? shuffled.slice(0, limit) : shuffled;
};

export const getRoundText = (round: string, group: string) => {
  if (round.includes("Group") && group) {
    return `Group ${group}`;
  }
  if (round.includes("Regular")) {
    const parts = round.split(" - ");
    const week = parts[1];
    if (week) {
      return `Matchday ${week}`;
    }
  }
  return round;
};
