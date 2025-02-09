## randalytics

#### Installation

`npm i git+https://github.com/randytsao24/randalytics.git`

#### Usage

```ts
import { Randalytics } from "randalytics";

// Initialize analytics when your app starts
function initializeApp() {
  const analytics = Randalytics.getInstance();
  analytics.init();
  // After init(), page views and clicks are automatically tracked
}
```
