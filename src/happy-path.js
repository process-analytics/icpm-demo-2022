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

let styleElt;
let styleState;
window.addEventListener('load', function () {
  styleElt = document.querySelector('head > style');
  styleState = styleElt.innerHTML;
})

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function showHappyPath(bpmnVisualization) {
  happyPath.forEach((elementId, index) => {
    let childType = isActivity(elementId) ? 'rect' :
        isEvent(elementId) ? 'ellipse' : 'path'; // flow & gateway

    styleElt.innerHTML = styleElt.innerHTML + `\n.bpmn-type-activity.animate-${elementId} > ${childType} { animation-delay: ${(index) * 3}s; }`;
  });

  /* iterate over the elements in the happyPath
   apply css and add a delay so that we see the css applied in a sequential manner */
  happyPath.forEach((elementId, index) => {
    const classToAdd = isActivity(elementId) || isEvent(elementId) ? "pulse-happy" :
        isGateway(elementId) ? "gateway-happy" : "growing-happy";

    bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementId, [ classToAdd, `animate-${elementId}` ]);
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
  styleElt.innerHTML = styleState;

  bpmnVisualization.bpmnElementsRegistry.removeCssClasses(happyPath, [
    "highlight-happy-path",
    "pulse-happy",
    "gateway-happy",
    "growing-happy",
    ...happyPath.map((elementId) => `animate-${elementId}`)
  ]);

  bpmnVisualization.bpmnElementsRegistry.removeAllOverlays(happyPathElementWithOverlays)
}