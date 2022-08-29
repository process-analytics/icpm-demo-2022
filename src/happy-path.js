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
  const headElt = document.getElementsByTagName('head')[0];

  /* iterate over the elements in the happyPath
   apply css and add a delay so that we see the css applied in a sequential manner */
  happyPath.forEach((elementId, index) => {
    const style = document.createElement('style');
    style.id = elementId;
    style.type = 'text/css';

    let classToAdd;

    if (isActivity(elementId)) {
      style.innerHTML = `.animate-${elementId} > rect { animation-delay: ${index * 1.5}s; }`;
      classToAdd = "pulse-happy";
    } else if ( isEvent(elementId)) {
      style.innerHTML = `.animate-${elementId} > ellipse { animation-delay: ${index * 1.5}s; }`;
      classToAdd = "pulse-happy";
    } else if (isGateway(elementId)) {
      style.innerHTML = `.animate-${elementId} > path { animation-delay: ${index * 1.5}s; }`;
      classToAdd = "gateway-happy";
    } else { // flow
      style.innerHTML = `.animate-${elementId} > path:nth-child(2) { animation-delay: ${index * 1.5}s; animation-duration: 2s; } \n` +
          `.animate-${elementId} > path:nth-child(3) { animation-delay: ${index * 2}s; animation-duration: 0.5s; }`;
      classToAdd = "growing-happy";
    }
    headElt.appendChild(style);

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
  bpmnVisualization.bpmnElementsRegistry.removeCssClasses(happyPath, [
    "highlight-happy-path",
    "pulse-happy",
    "gateway-happy",
    "growing-happy",
    ...happyPath.map((elementId) => {
      let styleOfElement = document.getElementById(elementId);
      styleOfElement.parentNode.removeChild(styleOfElement);
      return  `animate-${elementId}`
    })
  ]);

  bpmnVisualization.bpmnElementsRegistry.removeAllOverlays(happyPathElementWithOverlays)
}