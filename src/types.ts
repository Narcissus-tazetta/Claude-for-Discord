// Just enough of Discord's and Anthropic's payload shapes to keep the rest of the code honest.

export interface DiscordUser {
  id: string;
  username?: string;
  bot?: boolean;
}

export interface DiscordAttachment {
  id: string;
  filename: string;
  size: number;
  url: string;
  content_type?: string;
}

export interface DiscordMessage {
  id: string;
  channel_id: string;
  author: DiscordUser;
  content: string;
  attachments: DiscordAttachment[];
  message_reference?: { message_id?: string; channel_id?: string };
}

export interface InteractionDataOption {
  name: string;
  type: number;
  value?: string | number | boolean;
}

export interface Interaction {
  id: string;
  type: number;
  token: string;
  application_id: string;
  channel_id?: string;
  user?: DiscordUser;
  member?: { user: DiscordUser };
  data?: {
    id?: string;
    name?: string;
    type?: number;
    custom_id?: string;
    values?: string[];
    target_id?: string;
    options?: InteractionDataOption[];
    components?: ModalComponentRow[];
    resolved?: {
      messages?: Record<string, DiscordMessage>;
      attachments?: Record<string, DiscordAttachment>;
    };
  };
}

export interface ModalComponentRow {
  type: number;
  components?: { type: number; custom_id?: string; value?: string }[];
}

// Interaction types
export const IT_PING = 1;
export const IT_APPLICATION_COMMAND = 2;
export const IT_MESSAGE_COMPONENT = 3;
export const IT_MODAL_SUBMIT = 5;

// Interaction callback types
export const CB_PONG = 1;
export const CB_CHANNEL_MESSAGE = 4;
export const CB_DEFERRED_CHANNEL_MESSAGE = 5;
export const CB_UPDATE_MESSAGE = 7;
export const CB_MODAL = 9;

/** A content block in an Anthropic message. Passed through opaquely for the most part. */
export type ContentBlock = Record<string, any>;

export interface AnthropicMessage {
  role: "user" | "assistant";
  content: ContentBlock[];
}

export interface Prefs {
  ephemeral: boolean;
  model: string;
  thinking: boolean;
  effort: string;
  web_fetch: boolean;
  web_search: boolean;
}

/**
 * A regenerate record as it crosses the Durable Object RPC boundary. `messages` stays a
 * JSON string here: the RPC type mapper recurses through every property of its argument and
 * return types, and an open-ended ContentBlock tree makes the compiler give up.
 */
export interface RegenRecordWire {
  record_id: string;
  messagesJson: string;
  user_id: string;
  header: string;
  ephemeral: boolean;
  token: string;
  /** Every chunk of the answer, in the order it was posted. */
  chunkIds: string[];
}
