import moment from "moment";

export const daysSinceDate = (targetDate: Date) => {
  const now = moment(new Date());
  const lastDate = moment(targetDate);
  const duration = moment.duration(now.diff(lastDate));
  const days = duration.asDays();
  return Math.floor(days);
};

export const formatPhoneNumber = (str: string) => {
  let cleaned = ("" + str).replace(/\D/g, "");
  let match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    let intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return str;
};
