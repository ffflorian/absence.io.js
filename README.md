# absence.io.js [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/absence.io.js)](https://dependabot.com)

An [absence.io](https://absence.io) API client. For a documentation on the API see the [absence.io API](https://documenter.getpostman.com/view/799228/absenceio-api-documentation/2Fwbis).

### Installation

Run `yarn add absence.io` or `npm install absence.io`.

### Example

```ts
import {AbsenceIO} from 'absence.io';

const absenceIO = new AbsenceIO('my-api-key'); // API key is only required for checks
```

## Build and test

```
yarn
yarn test
```
