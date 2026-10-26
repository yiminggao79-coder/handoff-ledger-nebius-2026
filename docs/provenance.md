# Sources, licenses and original contribution

Checked 2026-10-26. Original application source is MIT (`LICENSE`). It is not a fork of a competition submission. Node 24 runtime is reused; no model weights were downloaded. The generated design concept is an Image Gen UI-mockup; production text, controls and layout are original HTML/CSS/JS. No third-party photographs, music or logos are bundled.

Reviewed bases and references:

- [Official Nebius Token Factory cookbook](https://github.com/nebius/token-factory-cookbook), [MIT license](https://github.com/nebius/token-factory-cookbook/blob/main/LICENSE). Evaluated as integration reference; no substantial code copied.
- [Nebius official Token Factory integration documentation](https://github.com/nebius/nebius-physical-ai/blob/main/docs/workbench/token-factory.md). Documents the hosted endpoint and current NVIDIA alias. Availability is key-scoped and remains unverified here.
- [NVIDIA Lightning model card](https://huggingface.co/nvidia/NVIDIA-Nemotron-3.5-Lightning-30B-A3B-BF16) lists OpenMDW-1.1. We call a service and do not distribute weights. The actual served canonical ID must be verified before submission; model-card selection alone does not prove use.
- [Render free-service limits](https://render.com/docs/free) and [blueprint fields](https://render.com/docs/blueprint-spec), checked before preparing the template. Free hosting may sleep and has usage limits; no deployment performed.

Original increments: note-ID provenance, strict structured-output validation, explicit suspected-vs-confirmed prompt, no silent fallback, source expansion, evidence JSON, input hash, endpoint/model identity checks and demo usage gate. All development occurred October26 during the submission period. Codex assisted the implementation and verification. Do not describe these as entirely unaided personal implementation.
