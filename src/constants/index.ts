type StatusInfo = {
  label: string;
  color: string;
};

export const MATCH_COMPLETED = "Match Finished";

export const MATCH_COMPLETED_SHORT_STATUS = ["FT", "AET", "PEN"];

export const MATCH_LIVE_SHORT_STATUS = [
  "1H",
  "HT",
  "2H",
  "ET",
  "BT",
  "P",
  "SUSP",
  "INT",
];

export const MATCH_SCHEDULED_SHORT_STATUS = ["TBD", "NS"];

export const getMatchStatus = (shortStatus: string | null) => {
  if (!shortStatus) return "other";
  if (MATCH_COMPLETED_SHORT_STATUS.includes(shortStatus)) {
    return "completed";
  } else if (MATCH_LIVE_SHORT_STATUS.includes(shortStatus)) {
    return "live";
  } else if (MATCH_SCHEDULED_SHORT_STATUS.includes(shortStatus)) {
    return "scheduled";
  } else {
    return "other";
  }
};

export const statusMapping: Record<string, StatusInfo> = {
  active: { label: "Pending", color: "#a0a4b8ff" },
  settled_won: { label: "Won", color: "#7ae7c7ff" },
  settled_lost: { label: "Lost", color: "#ec0b43ff" },
  canceled: { label: "Canceled", color: "#a0a4b8ff" },
};

export const pointsDisclaimer = `Winning predictions double your points bet. You may update or cancel your
                prediction up until the match starts.`;
