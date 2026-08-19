Security Rules

These rules apply to every task and code change.

1. Secrets
   NEVER expose, print, commit, or hardcode secrets.
   NEVER modify .env files containing real credentials.
   Use environment variables for API keys, tokens, passwords, and private keys.
   If a secret is found, do not include its value in the response.
2. Code Safety
   Treat all external and user-provided input as untrusted.
   Validate input at system boundaries.
   Prevent XSS, SQL injection, command injection, SSRF, CSRF, path traversal, and insecure deserialization.
   Never execute untrusted code dynamically.
   Never disable security controls just to make a feature work.
3. Authentication & Authorization
   NEVER bypass authentication or authorization.
   Verify permissions on the server side.
   Never expose protected resources through client-side checks alone.
   Do not weaken access controls without explicit approval.
4. Dependencies
   Avoid unnecessary dependencies.
   Prefer existing project dependencies when possible.
   Use trusted and maintained packages.
   Do not introduce packages that execute unnecessary privileged code.
   Preserve the existing lockfile and package manager.
5. Files & Commands
   Only modify files required for the task.
   Do not access files outside the project unless explicitly required.
   NEVER run destructive commands without explicit approval.
   Do not delete databases, files, branches, or infrastructure unless explicitly requested.
   Do not download or execute unknown scripts.
6. Database & Data
   NEVER expose production data.
   Avoid destructive database operations.
   Use migrations when the project has a migration system.
   Never log passwords, tokens, API keys, session cookies, or sensitive user data.
7. Errors & Logs
   Do not expose secrets, stack traces, internal paths, or infrastructure details to users.
   Keep logs useful but free of sensitive information.
   Never log credentials or authentication tokens.
8. Before Completing a Task

Before finishing:

Review the changed code for security issues.
Verify that no secrets were introduced.
Verify authentication and authorization behavior.
Verify input validation.
Review new dependencies.
Run existing tests and security checks when available.
Report relevant security risks or assumptions. 9. Security Priority

Security takes priority over convenience.

If a requested change would:

expose credentials,
bypass authentication,
weaken authorization,
disable security controls,
execute untrusted code,
or introduce a significant vulnerability,

STOP before implementing it.

Explain the risk and propose a safer alternative.

Never silently make a security trade-off.
