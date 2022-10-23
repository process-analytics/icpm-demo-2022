import { ShapeBpmnElementKind, FlowKind } from "bpmn-visualization";
const overlayConfigSynchronous = {
  style: {
    font: {
      color: "black",
      size: 16,
    },
    stroke: {
      color: "#00FF00",
    },
    fill: {
      color: "#00FF00",
    },
  },
};

const overlayConfigLogMove = {
  style: {
    font: {
      color: "black",
      size: 16,
    },
    stroke: {
      color: "transparent",
    },
    fill: {
      color: "transparent",
    },
  },
};

const overlayConfigModelMove = {
  style: {
    font: {
      color: "black",
      size: 16,
    },
    stroke: {
      color: "#FF00FF",
    },
    fill: {
      color: "#FF00FF",
    },
  },
};

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function showConformanceData(bpmnVisualization) {
  /*activities and events*/
  //create purchase order item
  addOverlay("Activity_1t65hvk", "synchronous", "611", bpmnVisualization);
  addOverlay("Activity_1t65hvk", "modelMove", "0", bpmnVisualization);
  createLinearGradient("Activity_1t65hvk", [611, 0], bpmnVisualization);
  //vendor creates invoice
  addOverlay("Event_0e43ncy", "synchronous", "506", bpmnVisualization);
  addOverlay("Event_0e43ncy", "modelMove", "105", bpmnVisualization);
  createLinearGradient("Event_0e43ncy", [506, 105], bpmnVisualization);
  //SRM subprocess
  addOverlay("Activity_0ec8azh", "synchronous", "571", bpmnVisualization);
  addOverlay("Activity_0ec8azh", "modelMove", "40", bpmnVisualization);
  createLinearGradient("Activity_0ec8azh", [571, 40], bpmnVisualization);
  //record goods receipt
  addOverlay("Activity_00vbm9s", "synchronous", "523", bpmnVisualization);
  addOverlay("Activity_00vbm9s", "modelMove", "88", bpmnVisualization);
  createLinearGradient("Activity_00vbm9s", [571, 40], bpmnVisualization);
  //Record service entry sheet
  addOverlay("Activity_06cvihl", "synchronous", "410", bpmnVisualization);
  addOverlay("Activity_06cvihl", "modelMove", "0", bpmnVisualization);
  createLinearGradient("Activity_06cvihl", [410, 0], bpmnVisualization);
  //Record invoice receipt
  addOverlay("Activity_1u4jwkv", "synchronous", "509", bpmnVisualization);
  addOverlay("Activity_1u4jwkv", "modelMove", "102", bpmnVisualization);
  createLinearGradient("Activity_1u4jwkv", [509, 102], bpmnVisualization);
  //Remove payment block
  addOverlay("Activity_083jf01", "synchronous", "17", bpmnVisualization);
  addOverlay("Activity_083jf01", "modelMove", "0", bpmnVisualization);
  createLinearGradient("Activity_083jf01", [17, 0], bpmnVisualization);
  //Clear invoice
  addOverlay("Activity_0yabbur", "synchronous", "448", bpmnVisualization);
  addOverlay("Activity_0yabbur", "modelMove", "163", bpmnVisualization);
  createLinearGradient("Activity_0yabbur", [448, 163], bpmnVisualization);

  /*edges*/
  //incoming and outgoing flows of "vendor creates invoice"
  addEdgeOverlay("Flow_169iupn", bpmnVisualization);
  addEdgeOverlay("Flow_0hpz0ab", bpmnVisualization);
  //incoming and outgoing flows of create purchase order item
  addEdgeOverlay("Flow_1ojqrz1", bpmnVisualization);
  addEdgeOverlay("Flow_1a9zw3d", bpmnVisualization);
  //incming of SRM subprocess
  addEdgeOverlay("Flow_06ca3ya", bpmnVisualization);
  //record goods receipts: incoming and outgoing
  addEdgeOverlay("Flow_1448s6h", bpmnVisualization);
  addEdgeOverlay("Flow_14tr1q9", bpmnVisualization);
  //incming of exclusive gateway of service entry sheet needed?
  addEdgeOverlay("Flow_0j5xinh", bpmnVisualization);
  //record service entry sheet: outgoing
  addEdgeOverlay("Flow_0pu7ps3", bpmnVisualization);
  //record invoice receipt: outgoing
  addEdgeOverlay("Flow_0lrixjg", bpmnVisualization);
  //remove payment block: outgoing
  addEdgeOverlay("Flow_1vzcv72", bpmnVisualization);
  //clear invoice: outgoing
  addEdgeOverlay("Flow_12q12yb", bpmnVisualization);
}

/**
 * @param {string} elementId
 * @param {string} overlayType
 * @param {string} label
 * @param {BpmnVisualization} bpmnVisualization
 */
function addOverlay(elementId, overlayType, label, bpmnVisualization) {
  if (overlayType === "synchronous") {
    bpmnVisualization.bpmnElementsRegistry.addOverlays(elementId, {
      position: "top-left",
      label: label,
      ...overlayConfigSynchronous,
    });
  } else if (overlayType === "modelMove") {
    bpmnVisualization.bpmnElementsRegistry.addOverlays(elementId, {
      position: "top-right",
      label: label,
      ...overlayConfigModelMove,
    });
  }
  /*else if (overlayType === "logMove") {
    bpmnVisualization.bpmnElementsRegistry.addOverlays(elementId, {
      position: "top-right",
      label: label,
      ...overlayConfigLogMove,
    });
  }*/
}

function addEdgeOverlay(elementId, bpmnVisualization) {
  bpmnVisualization.bpmnElementsRegistry.addOverlays(elementId, {
    position: "middle",
    label: "🟨",
    ...overlayConfigLogMove,
  });

  /*else if (overlayType === "logMove") {
    bpmnVisualization.bpmnElementsRegistry.addOverlays(elementId, {
      position: "top-right",
      label: label,
      ...overlayConfigLogMove,
    });
  }*/
}

/**
 * @param {BpmnVisualization} bpmnVisualization
 * @param stopsFrequencyList
 */
function createLinearGradient(
  elementId,
  stopsFrequencyList,
  bpmnVisualization
) {
  //create a static variable for the created linearGradient id
  if (typeof createLinearGradient.gradientCounter == "undefined") {
    createLinearGradient.gradientCounter = 0;
  }
  const stopsRatioList = computeRatioList(stopsFrequencyList);
  const svgElement = document.getElementsByTagName("svg")[0];
  let defs = document.querySelector("svg > defs");
  if (defs == null) {
    defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  }
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );

  // Store an array of stop information for the `<linearGradient>`.
  const stops = [
    {
      color: "#00FF00",
      opacity: "0.3",
      offset: stopsRatioList[0].toString() + "%",
    },
    {
      color: "#FF00FF",
      opacity: "0.3",
      offset: stopsRatioList[0].toString() + "%",
    },
    {
      color: "#FF00FF",
      opacity: "0.3",
      offset: "100%",
    },
  ];

  stops.forEach((stop) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    el.setAttribute("offset", stop.offset);
    el.setAttribute("stop-color", stop.color);
    el.setAttribute("stop-opacity", stop.opacity);

    // Add the `<stop>` element to `<linearGradient>`.
    gradient.appendChild(el);
  });

  gradient.id = "Gradient-" + createLinearGradient.gradientCounter;
  createLinearGradient.gradientCounter++;

  defs.appendChild(gradient);

  svgElement.appendChild(defs);

  const activitySvgElement =
    bpmnVisualization.bpmnElementsRegistry.getElementsByIds(elementId)[0]
      .htmlElement;
  activitySvgElement.children[0].setAttribute(
    "fill",
    "url(#" + gradient.id + ")"
  );
}

/**
 * @param {BpmnVisualization} bpmnVisualization
 */
export function hideConformanceData(bpmnVisualization) {
  const bpmnElementsRegistry = bpmnVisualization.bpmnElementsRegistry;
  const bpmnTaskElements =
    bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(
      ShapeBpmnElementKind.TASK
    );
  bpmnTaskElements.forEach((elt) => {
    bpmnElementsRegistry.removeAllOverlays(elt.bpmnSemantic.id);
  });
  const bpmnSubprocessElements =
    bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(
      ShapeBpmnElementKind.SUB_PROCESS
    );
  bpmnSubprocessElements.forEach((elt) => {
    bpmnElementsRegistry.removeAllOverlays(elt.bpmnSemantic.id);
  });
  const bpmnEventElements =
    bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(
      ShapeBpmnElementKind.EVENT_INTERMEDIATE_CATCH
    );
  bpmnEventElements.forEach((elt) => {
    bpmnElementsRegistry.removeAllOverlays(elt.bpmnSemantic.id);
  });

  const bpmnFlowElements =
    bpmnVisualization.bpmnElementsRegistry.getElementsByKinds(
      FlowKind.SEQUENCE_FLOW
    );
  bpmnFlowElements.forEach((elt) => {
    bpmnElementsRegistry.removeAllOverlays(elt.bpmnSemantic.id);
  });

  deleteLinearGradient(bpmnVisualization);
}

function deleteLinearGradient(bpmnVisualization) {
  const element = document.querySelector("svg > defs");
  if (element) {
    const parent = element.parentNode;
    parent.removeChild(element);
  }

  /* const activitySvgElement =
    bpmnVisualization.bpmnElementsRegistry.getElementsByIds(
      "Activity_0ec8azh"
    )[0].htmlElement;
  activitySvgElement.children[0].setAttribute("fill", "white");
  */
}

function computeRatioList(stopsFrequencyList) {
  let stopsRatioList = [];
  stopsRatioList[0] = Math.round(
    (stopsFrequencyList[0] * 100) /
      (stopsFrequencyList[0] + stopsFrequencyList[1])
  );
  stopsRatioList[1] = 100 - stopsFrequencyList[0];
  return stopsRatioList;
}