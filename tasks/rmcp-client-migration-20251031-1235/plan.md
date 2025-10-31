# Implementation Plan: RMCP client migration

## Objective

Enable Codex CLI to use the stable `rmcp_client` feature flag by updating `.codex/config.toml` with the desired model settings and MCP server configuration, eliminating the deprecation warning.

## Success Criteria

- [ ] `.codex/config.toml` defines the provided configuration values without deprecated keys.
- [ ] Codex CLI no longer emits the `experimental_use_rmcp_client` warning.
- [ ] MCP server definitions in the config match the requested setup, including comments.

## Architecture

Configuration-only change; no application runtime impact.

## Components

- `.codex/config.toml`: Populate with correct TOML content.

## Data Flow

- Codex CLI reads `.codex/config.toml` on startup; the updated values enable the new RMCP client and desired defaults.

## Testing Strategy

- Manual inspection of `.codex/config.toml` for TOML syntax correctness.
- Optional: run a benign Codex CLI command locally (if feasible) to confirm absence of warnings.

## Edge Cases

- Invalid TOML (missing commas/newlines) could break CLI startup.
- Comments must remain valid (prefixed with `#`).

## Rollout Plan

- Commit configuration change.
- Notify stakeholders that RMCP client is enabled and the legacy flag removed.
