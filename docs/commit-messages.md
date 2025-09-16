# Conventional Commits (short)

We use a **simple Conventional Commits** style.

## Format

<type>[optional scope]: <description>

- **type** ∈ `feat` | `fix` | `docs` | `refactor` | `test` | `chore` | `ci`
- **subject**: short, imperative, lower case. No trailing period.
- (Optional) **scope**: `type(scope): subject`
- (Optional) **breaking**: `type!: subject` and add `BREAKING CHANGE:` in body.

## Examples

- `feat: add heatmap overlay`
- `fix: handle empty upload with 400`
- `docs: update quick start`
- `refactor: extract result grid`
- `test: add smoke test for analyze flow`
- `chore: bump deps`
- `ci: add vitest coverage to workflow`

## PR titles

Use the **same format** for PR titles. If squashing, ensure the squash title follows it.

## Tips

- One logical change per commit.
- Prefer present tense (“add”, not “added”).
- Keep subjects ~50 chars; details can go in the body if needed.
