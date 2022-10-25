import { hideHappyPath, showHappyPath } from "./happy-path";
import { hideConformanceData, showConformanceData } from "./conformance";
import { hideComplianceRules, showComplianceRules } from "./compliance-rules";

let checkedRadioButton = null;

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function configureRadioButtons(bpmnVisualization) {
    new RadioButton("happy_path", () => showHappyPath(bpmnVisualization), () => hideHappyPath(bpmnVisualization));
    new RadioButton("conformance_data", () => showConformanceData(bpmnVisualization), () => hideConformanceData(bpmnVisualization));
    new RadioButton("compliance_rules", () => showComplianceRules(bpmnVisualization), () => hideComplianceRules(bpmnVisualization));

    document.getElementById("reset_all").addEventListener("click", () => checkedRadioButton?.hide());
}

class RadioButton {
    constructor(id, showCallback, hideCallback) {
        this.hideCallback = hideCallback;

        document.getElementById(id).addEventListener("click", function(){
            if(checkedRadioButton != this) {
                checkedRadioButton?.hide();
                showCallback();
                checkedRadioButton = this;
            }
        }.bind(this));
    }

    hide() {
        if(checkedRadioButton == this) {
            this.hideCallback();
            checkedRadioButton = null;
        }
    }
}