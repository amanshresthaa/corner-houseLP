# Research: Codex Sound Notification Hook

## Initial Requirements

- Provide an audio alert when Codex finishes an agent turn by wiring up a notification hook.
- Implement the hook script shown in the shared screenshot (`hooks/notify.sh`) so it can be customized through an environment variable.
- Register the hook script inside the Codex CLI configuration (`config.toml`) with notifications enabled.

## Success Criteria

- Codex CLI runs the notification hook and plays a sound whenever an `agent-turn-complete` event fires.
- Users can override the default sound path by defining `CODEX_CUSTOM_SOUND` in their shell configuration.
- Hook gracefully handles cases where `jq` is unavailable (still plays the default sound).

## Existing Patterns

- The repo currently has no `.codex` directory or Codex-specific configuration (`rg "codex"` returned no matches), so we will introduce the standard structure: `.codex/config.toml` and `.codex/hooks/notify.sh`.
- No other notification hooks are present, so there are no conflicting patterns to reconcile.

## External Resources

- Reference snippet provided in the user’s screenshot for `hooks/notify.sh` and `config.toml`.
- macOS `afplay` man page (built-in audio playback utility used by Codex examples).

## Technical Constraints

- The environment is macOS (presence of `afplay` implied by the example); if the command is missing, the hook should fail loudly enough to diagnose but not crash Codex.
- Hook scripts must be executable and reside at `.codex/hooks/*.sh` for the CLI to locate them.
- `config.toml` entries expect hook paths relative to the repo root, matching prior Codex CLI conventions (`notify = ["./.codex/hooks/notify.sh"]`).

## Recommendations

- Create `.codex/` with a `hooks/` subdirectory, add `notify.sh` based on the provided template, and mark it executable (`chmod +x`).
- Use a built-in macOS sound (e.g., `/System/Library/Sounds/Ping.aiff`) as the default so the hook works without bundling binary assets; still allow overrides and guard against missing files.
- Update `.codex/config.toml` with `tui.notifications = true` and the hook path. Include comments to guide future customization.
- Add the default sound asset under `.codex/assets/` (or reuse an existing system sound if available) so the hook works without extra setup.
- Document usage assumptions inside the research file for future reference (e.g., need for `CODEX_CUSTOM_SOUND` export).
