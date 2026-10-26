# Deployment preparation — approval still required

No public repository, cloud service, video or entry has been published. `Dockerfile` and `render.yaml` are prepared, not executed or cloud-validated. For a standalone repository, place this event directory at its root. Render configuration explicitly selects its free web-service plan. Account availability, free usage capacity and supported runtime must still be checked when deploying. Its free services can sleep after 15 minutes; cold starts can affect judges. Do not upgrade or add a payment method without approval.

1. Obtain the real Token Factory account/key through truthful regional onboarding; use approved free credits. Never commit `.env`.
2. Set `NEBIUS_API_KEY`, select the exact accessible `NEBIUS_MODEL`, run a live sample and review the generated brief and provider usage. Save a redacted live export.
3. After approval publish the MIT source, create the free service, add the key as a server secret, set `HOST=0.0.0.0`. The platform sets `PORT`.
4. Verify the external demo using a fresh browser, including actual live execution, source references, malformed input handling and JSON export. Keep the judging service available through Dec15.
5. Record under3minute functioning demo on YouTube; public upload and formal Devpost submission require approval.

The demo gate accepts one active live request, has15second cooldown, and defaults to12 attempts/hour and48 attempts/rolling24hours across all visitors. `LIVE_HOURLY_LIMIT`/`LIVE_DAILY_LIMIT` must be positive integers. Failed reserved attempts count; fixture requests do not. Counters live in memory, reset on process restart/cold start and are separate per instance. Therefore they are NOT a hard spending cap. Use one instance, provider-side quota/credit controls, and review remaining availability before judging. All public visitors can trigger permitted live calls. No authentication layer is claimed.
