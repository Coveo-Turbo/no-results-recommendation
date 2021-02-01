# NoResultsRecommendation

The `NoResultsRecommendation` is a wrapper for `Recommendation` component to display recommendations on a Coveo no results page. The component listens to the main search interface and wait for the no results page to be displayed before initializing the child `Recommendation` component. 

The component also takes care of showing/hiding the `Recommendation` component based on the "no results" state of the main search interface without triggering additional queries.

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/no-results-recommendations
```

2. Use the Component or extend it

Typescript:

```javascript
import { NoResultsRecommendation, INoResultsRecommendationOptions } from '@coveops/no-results-recommendations';
```

Javascript

```javascript
const NoResultsRecommendation = require('@coveops/no-results-recommendations').NoResultsRecommendation;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/no-results-recommendations'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/no-results-recommendations@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:

Place the component in your markup:

```html
<div class="CoveoNoResultsRecommendation">
    <div class="CoveoRecommendation">
    <div class="coveo-recommendation-header">
        <div class="coveo-recommendation-title" style="padding-left: 15px;">Recommendations</div>
    </div>
    <div class="coveo-recommendation-body">
        <div class="CoveoResultList" data-layout="list">
        <script id="Default" class="result-template" type="text/html" data-layout="list">
            <div class="coveo-result-row" style="display: flex; align-items: center;">
                <div class="coveo-result-cell" style="margin-left: 10px;margin-right: 10px;height: 30px;">
                    <div class="CoveoIcon" data-small="true" data-with-label="false"></div>
                </div>
                <div class="coveo-result-cell">
                    <a class="CoveoResultLink" data-open-in-sub-tab="true" data-always-open-in-new-window="true"></a>
                </div>
            </div>
            </div>
            </script>
        </div>
    </div>
    </div>
</div>
```

## Options


`NoResultsRecommendation` is responsible of the initilization of his child `Recommendation` component. It means all options you want to pass to your `Recommendation` component need to be passed to your `NoResultsRecommendation` component.


```javascript
<script>
    document.addEventListener('DOMContentLoaded', function () {
      // Coveo.SearchEndpoint.endpoints['default'].options.queryStringArguments.viewAllContent = 'true';
      Coveo.init(document.getElementById('search'), {
        Analytics: {
          searchHub: demoConfig.searchHub,
        },
        SearchInterface: {
          pipeline: 'default'
        },
        NoResultsRecommendation: {
          SearchInterface: {
            pipeline: 'default',
            resultsPerPage: 3
          } 
        }
      });
    })
  </script>
```

> Note: You need to use `SearchInterface` for the options instead of `Recommendation` because for some reasons Coveo framework will override `Recommendation` options by default settings.


## Extending

Extending the component can be done as follows:

```javascript
import { NoResultsRecommendation, INoResultsRecommendationOptions } from "@coveops/no-results-recommendations";

export interface IExtendedNoResultsRecommendationOptions extends INoResultsRecommendationOptions {}

export class ExtendedNoResultsRecommendation extends NoResultsRecommendation {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`