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
    document.getElementById("reset_all").addEventListener("click",  () => {
        hideHappyPath(bpmnVisualization);
        hideConformanceData(bpmnVisualization);
        hideComplianceRules(bpmnVisualization);
    });

    addEventListener("happy_path", state.isHappyPathDisplayed, () => showHappyPath(bpmnVisualization), () => hideHappyPath(bpmnVisualization));
    addEventListener("conformance_data", state.isConformanceDisplayed, () => showConformanceData(bpmnVisualization), () => hideConformanceData(bpmnVisualization));
    addEventListener("compliance_rules", state.isComplianceDisplayed, () => showComplianceRules(bpmnVisualization), () => hideComplianceRules(bpmnVisualization));
}

function addEventListener(buttonId, buttonState, showCallback, hideCallback){
    const button = document.getElementById(buttonId);

    button.addEventListener("click", function () {
        if (!buttonState) {
            showCallback();
            button.innerHTML = button.innerHTML.replace('Show', 'Hide');
            buttonState = true;
        } else {
            hideCallback();
            button.innerHTML = button.innerHTML.replace( 'Hide', 'Show');
            buttonState = false;
        }
    });
}
