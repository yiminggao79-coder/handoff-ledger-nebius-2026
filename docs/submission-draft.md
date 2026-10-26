# Devpost draft — do not submit before live verification

**Project:** Handoff Ledger  
**Tagline:** Give the next shift a brief they can trace back to the source.  
**Track:** Best Apps and Agents  
**Built with:** Node.js, browser HTML/CSS/JavaScript, Nebius Token Factory, NVIDIA Nemotron (exact served ID pending).

## Inspiration

The difficult part of a shift handoff is often separating observations, working theories and work that still needs an owner. A fluent summary can accidentally turn a suspicion into a confirmed cause. We wanted a small, reviewable product that keeps the evidence visible.

## What it does

Handoff Ledger gives every input line a stable note ID, creates a proposed summary and action list, rejects unknown or missing action references, and lets a reviewer open each cited note. It keeps open questions explicit and exports a JSON record with an input hash, generation mode, model identity and usage when available. It never executes a proposed action.

## How we built it

The live adapter is designed to check the Nebius model catalog and call an accessible NVIDIA model through Token Factory. A structured-output validator accepts only supported reference IDs and complete generations. The local fixture is separately labeled and limited to its exact synthetic sample. All application code is original MIT-licensed work built during the event, with AI implementation assistance.

## Challenges and learning

Reference integrity is measurable; semantic support still needs review. We deliberately label actions as proposals and hypotheses as unresolved. The app preserves this distinction instead of treating a citation chip as proof. Browser testing checked source expansion; unit tests cover malformed references, missing credentials, endpoint restrictions and model identity. HTTP smoke covers the complete synthetic workflow. None of this is presented as sponsor runtime proof.

## Current status / required completion

The local product and offline verification exist. Token Factory account/key, actual NVIDIA inference, external demo, public source repository and public YouTube video remain pending. Replace this status only after recording those results. Demo URL, repository URL and YouTube URL are intentionally not invented.

## Prepared under-three-minute demo script

- 0:00–0:25: Explain the handoff problem. Show three synthetic input notes, including an explicitly unconfirmed cache-key hypothesis.
- 0:25–1:15: After real credentials are verified, choose Live and build a brief. Show actual provider/model provenance without exposing the key. If live fails, record the failure and fix it; do not substitute fixture footage as live.
- 1:15–1:55: Open a source reference; distinguish the observation from proposed next work. Show open questions and unassigned owners.
- 1:55–2:25: Export the evidence JSON and explain reference validation versus semantic support.
- 2:25–2:50: State the tested scope and remaining product work. Use no copyrighted soundtrack or third-party branding assets.

## Sponsor feedback draft

The provider adapter and catalog checks are prepared, but no account was provisioned and no live call was made in this session. Consequently we cannot honestly rate latency, quality or cost yet. Region-onboarding clarity and exact canonical model IDs are the first items to evaluate once access is available.
