import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Emoji {
  created_at: Generated<Timestamp>;
  deleted_at: Timestamp | null;
  emoji_version: string;
  group: string;
  id: Generated<number>;
  name: string;
  skin_tone_support: boolean;
  skin_tone_support_unicode_version: string | null;
  slug: string;
  unicode_version: string;
  updated_at: Generated<Timestamp>;
  value: string;
}

export interface DB {
  emoji: Emoji;
}
