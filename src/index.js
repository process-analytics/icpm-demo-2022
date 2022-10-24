import { BpmnVisualization, FitType } from "bpmn-visualization";

import collapsedDiagram from "./diagrams/EC-purchase-orders-collapsed.bpmn?raw";
import { configureButtons } from "./buttons";
import { loadBpmnDiagram } from "./diagram";

// https://stackoverflow.com/questions/49338193/how-to-use-code-from-script-with-type-module
window.loadBpmnDiagram = loadBpmnDiagram;

// 'bpmn-visualization' API documentation: https://process-analytics.github.io/bpmn-visualization-js/api/index.html
const mainBpmnVisualization = new BpmnVisualization({
  container: 'main-bpmn-container',
});

// Load BPMN diagram
// Try the "Center" type to fit the whole container and center the diagram
mainBpmnVisualization.load(collapsedDiagram, { fit: { type: FitType.Center, margin: 10 } });


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


/*TO BE IMPLEMENTED
observe navigation and zooming and
update circle ripples and linearGradient if they were added*/

var containerBpmn = document.querySelector("#main-bpmn-container");

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
