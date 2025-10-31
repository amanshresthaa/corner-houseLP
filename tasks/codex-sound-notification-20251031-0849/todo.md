# Implementation Checklist

## Setup

- [x] Create `.codex/hooks` directory structure.
- [x] Add `notify.sh` script with executable permissions.

## Hook Logic

- [x] Read payload input and determine notification type (using `jq` when available).
- [x] Resolve sound path from `CODEX_CUSTOM_SOUND` fallback to `/System/Library/Sounds/Ping.aiff`.
- [x] Guard against missing `afplay` or unreadable sound file with clear warnings.
- [x] Trigger `afplay` only for `agent-turn-complete` notifications (or all when `jq` missing).

## Configuration

- [x] Create `.codex/config.toml` enabling TUI notifications and registering the hook.

## Validation

- [x] Manually execute hook with sample payload to verify playback and fallbacks.
- [x] Document verification steps for manual QA phase.
