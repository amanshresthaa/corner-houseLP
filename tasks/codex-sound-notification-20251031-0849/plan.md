# Implementation Plan: Codex Sound Notification Hook

## Objective

Enable Codex CLI to play an audio cue whenever an agent turn completes by installing the notification hook and configuration demonstrated in the shared reference.

## Success Criteria

- [ ] `afplay` (or a fallback) is triggered when Codex emits the `agent-turn-complete` notification.
- [ ] Users can configure a custom sound via `CODEX_CUSTOM_SOUND`, with a sensible default bundled in the repository.
- [ ] Hook executes without errors when `jq` is present or absent.
- [ ] `tui.notifications` is enabled so the CLI surfaces notifications in the UI.

## Architecture

- **Hook Script (`.codex/hooks/notify.sh`)**: Bash script invoked by Codex to parse notification payloads and play sound.
- **Config (`.codex/config.toml`)**: Registers the hook and toggles TUI notifications.
- **System Sound**: Use macOS built-in audio (`/System/Library/Sounds/Ping.aiff`) as the default notification tone.

## Data Flow

Codex CLI → executes `notify.sh` with JSON payload → script optionally parses payload via `jq` → when type is `agent-turn-complete`, call `afplay` with sound path → audio played for user.

## Implementation Steps

1. Create `.codex/` directory tree with `hooks/`.
2. Implement `notify.sh` per template: read payload, resolve `CODEX_CUSTOM_SOUND`, fallback to `/System/Library/Sounds/Ping.aiff`, parse type with `jq` if available, play sound via `afplay`, warn when prerequisites missing.
3. Make script executable (`chmod +x .codex/hooks/notify.sh`).
4. Create `.codex/config.toml` with hook registration and TUI notification flag.
5. Update `tasks/.../todo.md` with actionable checklist and execute work.

## Edge Cases

- `jq` missing: script should simply play the sound without filtering notification types.
- `afplay` missing: script should emit a warning to stderr and exit gracefully.
- Sound file missing: emit warning and skip playback to avoid failing the hook.

## Testing Strategy

- Manual invocation of the hook script with sample JSON to confirm parsing and sound playback.
- Validate fallback behavior by running with `jq` disabled (set `PATH` temporarily) if practical.
- Confirm `config.toml` syntax via simple `toml` lint (visual inspection) since the CLI loader will handle parse errors.

## Rollout

- Since this is a developer tooling change, no production deployment required. Notify teammates to `chmod +x` persists in git and commit the asset.
