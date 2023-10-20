export interface Profile {
  passage_id: string;
  email: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  description: string | null;
  image: string | null;
  match_id: number | null;
}

export interface ProfileInterest {
  passage_id: string;
  interest_id: number;
}

export interface MatchNote {
  match_id: number;
  note: string;
  dt_created: Date;
}
