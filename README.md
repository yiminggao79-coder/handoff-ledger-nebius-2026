# Handoff Ledger

Turn incident notes into a next-shift brief with source links, proposed actions and explicit open questions. Original hackathon application, created October 26, 2026 with AI implementation assistance. It does not execute infrastructure changes.

## Run locally

Node.js 22.19+; no application dependencies or model download.

```powershell
npm start
# http://localhost:4311
npm test
npm run smoke
```

The first screen uses an original synthetic fixture. Only the exact sample is supported in fixture mode. Editing the incident requires live mode; the app never substitutes a fixture after a live error.

## Real Nebius integration

Copy `.env.example` to a private `.env`, configure a Token Factory key, then `node --env-file=.env src/server.js`. Use free event credits only unless spending is separately authorized. The model catalog is checked before inference. The default NVIDIA model ID is a documented upstream alias, **not verified as available to this account**; set `NEBIUS_MODEL` to the exact accessible canonical NVIDIA ID. Returned model identity must match. Live mode uses the official `/models` and `/chat/completions` API surfaces. Keys stay server-side; no custom endpoint or redirect is accepted.

Each action must reference actual note IDs. This verifies reference integrity, not factual entailment. Reviewers must check whether the note supports the proposed action. Input notes are untrusted evidence. Nothing in the app runs shell commands or changes external systems.

## Verification and submission status

Core: 8 tests passed before the budget change. New live-budget tests: 3 passed. Parent performs final combined verification. Desktop browser sample rendering and N1 source expansion were observed; screenshot is in the output package. JSON download automation stalled and was interrupted, so browser download success is **not claimed**. HTTP smoke verifies exportable JSON. Sponsor API inference, cloud deployment and judging links remain unverified because no account/key is available. This is a prepared local entry, not a submitted or accepted entry.

See `docs/event-brief.md`, `docs/progress.md`, `docs/problem-log.md`, `docs/provenance.md`, `docs/deployment.md`, and `docs/submission-draft.md`.
