const activitiesMap = new Map();
const gatewaysMap = new Map();
const eventsMap = new Map();

activitiesMap.set("Activity_0ec8azh", "SRM subprocess");
activitiesMap.set("Activity_1t65hvk", "Create Purchase Order Item");
activitiesMap.set("Activity_06cvihl", "Record Service Entry Sheet");
activitiesMap.set("Activity_00vbm9s", "Record Goods Receipts");
activitiesMap.set("Activity_1u4jwkv", "Record Invoice Receipt");
activitiesMap.set("Activity_083jf01", "Remove Payment Block");
activitiesMap.set("Activity_0yabbur", "Clear Invoice");

gatewaysMap.set("Gateway_0xh0plz", "parallelGatewaySplit1");
gatewaysMap.set("Gateway_0domayw", "parallelGatewayJoin1");
gatewaysMap.set("Gateway_0apcz1e", "parallelGatewaySplit2");
gatewaysMap.set("Gateway_01gpztl", "parallelGatewayJoin2");
gatewaysMap.set("Gateway_08gf298", "exclusiveGatewaySplit1");
gatewaysMap.set("Gateway_0jqn9hp", "exclusiveGatewayJoin1");
gatewaysMap.set("Gateway_0a68dfj", "exclusiveGatewaySplit2");
gatewaysMap.set("Gateway_1ezcj46", "exclusiveGatewayJoin2");

eventsMap.set("Event_1vogvxc", "startEvent");
eventsMap.set("Event_0e43ncy", "Vendor creates invoice");
eventsMap.set("Event_07598zy", "endEvent");

export function showHappyPath(bpmnVisualization) {
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

  /*iterate over the elements in the happyPath
   apply css and add a delay so that we see the css applied
   in a sequential manner*/
  happyPath.forEach((elementId) => {
    const elementType = getTypeOf(elementId);
    if (elementType === "activity" || elementType === "event") {
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementId, [
        "highlight-happy-path",
        "pulse-happy"
      ]);
    } else if (elementType === "gateway") {
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementId, [
        "gateway-happy"
      ]);
    } else {
      //flow
      bpmnVisualization.bpmnElementsRegistry.addCssClasses(elementId, [
        "growing-happy"
      ]);
    }
  });

  bpmnVisualization.bpmnElementsRegistry.addOverlays("Event_07598zy", {
    position: "middle-right",
    label: "⏳days \n mean: 10.1 \n median: 14.2",
    style: {
      font: { color: "Red", size: 14 },
      fill: { color: "White", opacity: 40 },
      stroke: { color: "Red", width: 0 }
    }
  });
}

function getTypeOf(elementId) {
  if (activitiesMap.has(elementId)) {
    return "activity";
  }
  if (gatewaysMap.has(elementId)) {
    return "gateway";
  }
  if (eventsMap.has(elementId)) {
    return "event";
  }
  return "flow";
}

export function hideHappyPath(bpmnVisualization) {
}