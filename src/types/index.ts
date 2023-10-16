export interface Team {
  source_team_id: string;
  name: string;
  logo: string;
  group: string;
  fifa_ranking?: string;
  logo_url: string;
}

export interface Fixture {
  source_fixture_id: string;
  dt_start: Date;
  away_team_id: string;
  home_team_id: string;
  round: string;
  goals_home: string | null;
  goals_away: string | null;
  penalty_home: string | null;
  penalty_away: string | null;
  status_long: string | null;
  status_short: string | null;
  elapsed: number | null;
  home_team: Team;
  away_team: Team;
}

export interface User {
  auth0_id: string;
  points: number;
  display_name: string | null;
  email: string;
  winner_source_team_id: string | null;
  is_winner_points_eligible: boolean;
}

export interface Prediction {
  id: string;
  auth0_id: string;
  source_fixture_id: string;
  winner_source_team_id: string;
  points_bet: number;
  status: string;
  is_winner: boolean | null;
  settled_point_difference: number;
  fixture: Fixture;
}

export interface Invite {
  id: string;
  inviter_auth0_id: string;
  invitee_auth0_id: string;
  invitee_email: string;
  status: string;
  inviter: User;
}

export interface Leaderboard extends User {
  total_points: number;
  points_bet: number;
}

export interface TeamGroup {
  group: string;
  name: string;
  points: number;
  matches: number;
  logo: string;
  goal_diff: number;
  logo_url: string;
}

export interface RawPlayer {
  fields: Player;
}

export interface Player {
  body: any;
  name: string;
  postDate: string;
  country: string;
  club: string;
  bullets: string[];
  image: any;
  imageSource: string;
  imageHandle: string;
  playerSourceId: string;
}

export interface Question {
  fields: {
    question: string;
    options: string[];
    correctOption: string;
  };
}

export interface PlayerInfo {
  source_player_id: string;
  display_name: string;
  team: Team;
}

export interface Group {
  name: string;
  description: string | null;
  code: string | null;
  owner_auth0_id: string;
  leaderboard: Leaderboard[];
  id: string;
}

export interface GroupMember {
  groups: Group;
  auth0_id: string;
  is_owner: boolean;
  status: string;
  group_id: number;
}

export interface UserDetails extends User {
  prediction: Prediction[];
  winner: Team;
}

export interface Competition {
  id: number;
  name: string;
  description: string;
  source_league_id: number;
  year: number;
  is_active: boolean;
  show_groups: boolean;
  show_table: boolean;
  num_matches: number;
}
