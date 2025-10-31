# Research: RMCP client migration

## Initial Requirements

- Resolve CLI warning about deprecated `experimental_use_rmcp_client` flag by enabling `rmcp_client` in configuration.
- Ensure model defaults match requested values: `model = "gpt-5-codex"`, `model_reasoning_effort = "high"`, `model_reasoning_summary = "detailed"`.
- Keep approval policy, sandbox mode, and network settings aligned with project expectations.

## Existing Patterns

- `.codex/config.toml` exists but is currently empty; no previous configuration patterns observed in repo.
- No references to `experimental_use_rmcp_client` or `rmcp_client` elsewhere in the codebase (`rg` search returned no matches).

## External Resources

- User-provided snippet outlining desired configuration fields and highlighting deprecation warning.

## Technical Constraints

- Configuration must use TOML syntax compatible with Codex CLI expectations.
- Approval policy is fixed to `"never"`; commands must not require interactive approval.
- Repository instructions (AGENTS.md) enforce use of task workflow documents.

## Open Questions

- None identified; requirements are explicit in user instructions.

## Recommendations

- Populate `.codex/config.toml` with the provided configuration values, replacing any deprecated flags with the new `rmcp_client = true` setting.
- Ensure `mcp_servers` definitions mirror the user-provided snippet, preserving comments and temporarily disabled entries as needed.
- After updating configuration, verify syntax (e.g., balanced brackets, correct quoting) to prevent CLI parse errors.
