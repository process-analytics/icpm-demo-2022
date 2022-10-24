import { BpmnVisualization } from "bpmn-visualization";

import collapsedDiagram from "./diagrams/EC-purchase-orders-collapsed.bpmn?raw";
import { configureButtons } from "./buttons";
import { loadBpmnDiagram } from "./diagram";

// https://stackoverflow.com/questions/49338193/how-to-use-code-from-script-with-type-module
window.loadBpmnDiagram = loadBpmnDiagram;

// 'bpmn-visualization' API documentation: https://process-analytics.github.io/bpmn-visualization-js/api/index.html
const mainBpmnVisualization = new BpmnVisualization({
  container: 'main-bpmn-container',
  navigation: { enabled: true } // remove this line or set to false if you don't want to use Diagram Navigation
});

// Load BPMN diagram
// Try the "Center" type to fit the whole container and center the diagram
mainBpmnVisualization.load(collapsedDiagram, { fit: { type: "Center", margin: 10 } });


// Interaction
let subProcessId = 'Activity_0ec8azh';
mainBpmnVisualization.bpmnElementsRegistry.getElementsByIds(subProcessId)[0].htmlElement.onclick = () => {
  loadBpmnDiagram('secondary');
}
mainBpmnVisualization.bpmnElementsRegistry.addCssClasses(subProcessId, 'c-hand');



configureButtons(mainBpmnVisualization);

// display the bpmn-visualization version in the footer
const footer = document.querySelector("footer");
const version = mainBpmnVisualization.getVersion();
footer.innerText = `bpmn-visualization@${version.lib}`;
