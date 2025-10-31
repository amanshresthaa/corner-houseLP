#!/usr/bin/env bash

payload="${1:-$(cat)}"

DEFAULT_CODEX_SOUND="/System/Library/Sounds/Ping.aiff"
CODEX_CUSTOM_SOUND="${CODEX_CUSTOM_SOUND:-$DEFAULT_CODEX_SOUND}"

if [ ! -e "$CODEX_CUSTOM_SOUND" ]; then
  printf 'codex-notify: sound file not found at "%s"\n' "$CODEX_CUSTOM_SOUND" >&2
  exit 0
fi

if ! command -v afplay >/dev/null 2>&1; then
  printf 'codex-notify: "afplay" command is unavailable; skipping notification.\n' >&2
  exit 0
fi

play_sound() {
  afplay "$CODEX_CUSTOM_SOUND" 2>/dev/null || printf 'codex-notify: failed to play sound "%s"\n' "$CODEX_CUSTOM_SOUND" >&2
}

if command -v jq >/dev/null 2>&1; then
  notification_type=$(printf '%s' "$payload" | jq -r '.type // empty')
  case "$notification_type" in
    agent-turn-complete)
      play_sound
      ;;
  esac
else
  play_sound
fi
