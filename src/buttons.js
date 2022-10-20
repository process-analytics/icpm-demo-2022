import { hideHappyPath, showHappyPath } from "./happy-path";
import { hideConformanceData, showConformanceData } from "./conformance";
import { hideComplianceRules, showComplianceRules } from "./compliance-rules";

const state = {
    isHappyPathDisplayed : false,
    isConformanceDisplayed : false,
    isComplianceDisplayed : false,
};

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function configureButtons(bpmnVisualization) {
    let happyPathButton = new RuleButton("happy_path", state.isHappyPathDisplayed, () => showHappyPath(bpmnVisualization), () => hideHappyPath(bpmnVisualization));
    let conformanceDataButton = new RuleButton("conformance_data", state.isConformanceDisplayed, () => showConformanceData(bpmnVisualization), () => hideConformanceData(bpmnVisualization));
    let complianceRulesButton = new RuleButton("compliance_rules", state.isComplianceDisplayed, () => showComplianceRules(bpmnVisualization), () => hideComplianceRules(bpmnVisualization));

    document.getElementById("reset_all").addEventListener("click",  () => {
        happyPathButton.hide();
        conformanceDataButton.hide();
        complianceRulesButton.hide();
    });
}

class RuleButton {
    constructor(id, state, showCallback, hideCallback) {
        this.button = document.getElementById(id);
        this.state = state;
        this.showCallback = showCallback;
        this.hideCallback = hideCallback;

        this.addEventListenerOnClick();
    }

    addEventListenerOnClick() {
        this.button.addEventListener("click", () => !this.state ? this.show() : this.hide());
    }

    show() {
        this.showCallback();
        this.button.innerHTML = this.button.innerHTML.replace('Show', 'Hide');
        this.state = true;
    }

    hide() {
        this.hideCallback();
        this.button.innerHTML = this.button.innerHTML.replace('Hide', 'Show');
        this.state = false;
    }
}