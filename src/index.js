import * as bpmnvisu from "bpmn-visualization";

import diagramCollapsed from "./diagrams/EC-purchase-orders-collapsed.bpmn";
import { showHappyPath } from "./happy-path.js";
import { showConformanceData, createLinearGradient } from "./conformance.js";
import {
  showComplianceRules,
  hideComplianceRules
} from "./compliance-rules.js";

// 'bpmn-visualization' API documentation: https://process-analytics.github.io/bpmn-visualization-js/api/index.html
const bpmnVisualization = new bpmnvisu.BpmnVisualization({
  container: "bpmn-container",
  navigation: { enabled: true } // remove this line or set to false if you don't want to use Diagram Navigation
});

// display the bpmn-visualization version in the footer
const footer = document.querySelector("footer");
const version = bpmnVisualization.getVersion();
footer.innerText = `bpmn-visualization@${version.lib}`;

// Load BPMN diagram
// Try the "Center" type to fit the whole container and center the diagram
bpmnVisualization.load(diagramCollapsed, { fit: { type: "None" } });

const happyPathButton = document.getElementById("happy_path");
const conformanceButton = document.getElementById("conformance_data");
const complianceButton = document.getElementById("compliance_rules");

happyPathButton.addEventListener("click", function () {
  showHappyPath(bpmnVisualization);
});

conformanceButton.addEventListener("click", function () {
  showConformanceData(bpmnVisualization);
  createLinearGradient(bpmnVisualization);
});

complianceButton.addEventListener("click", function () {
  if (complianceButton.innerHTML === "Show compliance rules") {
    complianceButton.innerHTML = "Hide compliance rules";
    showComplianceRules(bpmnVisualization);
  } else {
    hideComplianceRules();
    complianceButton.innerHTML = "Show compliance rules";
  }
});

/*TO BE IMPLEMENTED
observe navigation and zooming and 
update circle ripples and linearGradient if they were added*/

var containerBpmn = document.querySelector("#bpmn-container");

var containerObserver = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "attributes") {
      //check if ripple circles exist
      //if yes, recall ripple function
      //check if Gradient exists
      //if yes, re-add them
    }
  });
});

containerObserver.observe(containerBpmn, {
  attributes: true, //configure it to listen to attribute changes
  attributeFilter: ["min-width", "min-height"] // filter your attributes
});
