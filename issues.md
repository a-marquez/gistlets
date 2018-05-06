issues
---
- https://github.com/octokit/rest.js/issues/830
  - narrowed this down to odd parcel/babel compilation that doesn't properly import fetch from 'node-fetch' in @octokit/rest.js/lib/request/request.js
    - the import returns the whole module definition instead of the default, hot fix be `const fetch = require('node-fetch').default`
  - switching from 'node-fetch' to 'cross-fetch' also fixes the issue
  - it may be more responsible to not polyfill fetch at all
