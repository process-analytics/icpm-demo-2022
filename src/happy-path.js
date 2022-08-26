import { BpmnVisualization } from "bpmn-visualization";
import { isActivity, isEvent, isGateway } from "./bpmnElements";

/*start event --> SRM subprocess
  --> vendor creates order item --> create purchase order item
  --> Record goods receipt --> record invoice receipt --> clear invoice
  --> end event */
const happyPath = [
  "Event_1vogvxc",
  "Flow_0i9hf3x",
  "Gateway_0xh0plz",
  "Flow_06ca3ya",
  "Activity_0ec8azh"
];

const happyPathElementWithOverlays = "Event_07598zy";

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function showHappyPath(bpmnVisualization) {
  /* iterate over the elements in the happyPath
   apply css and add a delay so that we see the css applied in a sequential manner */
  happyPath.forEach((elementId) => {
    if (isActivity(elementId) || isEvent(elementId)) {
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementId, ["highlight-happy-path", "pulse-happy"]);
    } else if (isGateway(elementId)) {
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementId, "gateway-happy");
    } else { //flow
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementId, "growing-happy");
    }
  });

  bpmnVisualization.bpmnElementsRegistry.addOverlays(happyPathElementWithOverlays, {
    position: "middle-right",
    label: "⏳days \n mean: 10.1 \n median: 14.2",
    style: {
      font: { color: "Red", size: 14 },
      fill: { color: "White", opacity: 40 },
      stroke: { color: "Red", width: 0 }
    }
  });
}

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function hideHappyPath(bpmnVisualization) {
  bpmnVisualization.bpmnElementsRegistry.removeCssClasses(happyPath, [
    "highlight-happy-path",
    "pulse-happy",
    "gateway-happy",
    "growing-happy"
  ]);

  bpmnVisualization.bpmnElementsRegistry.removeAllOverlays(happyPathElementWithOverlays)
}