import * as bpmnvisu from "bpmn-visualization";

import diagram from "./diagrams/EC-purchase-orders.bpmn";
import diagramCollapsed from "./diagrams/EC-purchase-orders-collapsed.bpmn";
import { showHappyPath } from "./happy-path.js";
import { showConformanceData } from "./conformance.js";

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

happyPathButton.addEventListener("click", function () {
  showHappyPath(bpmnVisualization);
});

conformanceButton.addEventListener("click", function () {
  showConformanceData(bpmnVisualization);
});
