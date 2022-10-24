import { hideHappyPath, showHappyPath } from "./happy-path";
import { hideConformanceData, showConformanceData } from "./conformance";
import { hideComplianceRules, showComplianceRules } from "./compliance-rules";

let checkedKPIRadioButton = null;

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function configureRadioButtons(bpmnVisualization) {
    new KPIRadioButton("happy_path", () => showHappyPath(bpmnVisualization), () => hideHappyPath(bpmnVisualization));
    new KPIRadioButton("conformance_data", () => showConformanceData(bpmnVisualization), () => hideConformanceData(bpmnVisualization));
    new KPIRadioButton("compliance_rules", () => showComplianceRules(bpmnVisualization), () => hideComplianceRules(bpmnVisualization));

    document.getElementById("reset_all").addEventListener("click", () => checkedKPIRadioButton?.hide());
}

class KPIRadioButton {
    constructor(id, showCallback, hideCallback) {
        this.hideCallback = hideCallback;

        document.getElementById(id).addEventListener("click", function(){
            if(checkedKPIRadioButton != this) {
                checkedKPIRadioButton?.hide();
                showCallback();
                checkedKPIRadioButton = this;
            }
        }.bind(this));
    }

    hide() {
        if(checkedKPIRadioButton == this) {
            this.hideCallback();
            checkedKPIRadioButton = null;
        }
    }
}