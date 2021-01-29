import { Component, IComponentBindings, ComponentOptions, IQuerySuccessEventArgs, QueryEvents, IRecommendationOptions, Recommendation, Template, Assert, $$, TimeSpan } from 'coveo-search-ui';
import { lazyComponent } from '@coveops/turbo-core';

export interface INoResultsRecommendationOptions extends IRecommendationOptions {
}

@lazyComponent
export class NoResultsRecommendation extends Component {
    static ID = 'NoResultsRecommendation';

    public recommendationEL: HTMLElement;
    public hasNoRecommendation: boolean;
    constructor(public element: HTMLElement, public options: INoResultsRecommendationOptions, public bindings: IComponentBindings) {
        super(element, NoResultsRecommendation.ID, bindings);
        this.options = ComponentOptions.initComponentOptions(element, NoResultsRecommendation, options);
        this.recommendationEL = this.element.querySelector('.CoveoRecommendation');
        // Make sure child component
        if (this.recommendationEL) {
            this.bind.onRootElement(QueryEvents.querySuccess, (args: IQuerySuccessEventArgs) => this.handleQuerySuccess(args));
        } else {
            this.logger.error('Cannot find Recommendation component');
            // If we cannot find child Recommendation component, we clear markup otherwise child components will be initialized by the main interface
            $$(this.element).empty();
        }
        this.hasNoRecommendation = false;
    }

    private handleQuerySuccess(data: IQuerySuccessEventArgs) {
        if (data.results.totalCount == 0) {
            // Only init Recommendation the first time we hit a no results page
            if (!this.isInit()){
                this.init();
            }
            if (!this.hasNoRecommendation) {
                $$(this.element).removeClass('coveo-hidden');
            }
        } else {
            $$(this.element).addClass('coveo-hidden');
        }
    }

    private isInit():Boolean{
        return $$(this.recommendationEL).hasClass('coveo-after-initialization');
    }

    private init() {
        let _this = this;
        Coveo.initRecommendation(this.recommendationEL,null,{},this.options);
        // binding no results envent on Recommendation component
        $$(this.recommendationEL).on(QueryEvents.noResults, function(){
            _this.hasNoRecommendation = true;
            $$(_this.element).addClass('coveo-hidden');
        });
    }
}