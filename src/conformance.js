const overlayConfigSynchronous = {
  style: {
    font: {
      color: "black",
      size: 16
    },
    stroke: {
      color: "black"
    },
    fill: {
      color: "green"
    }
  }
};

const overlayConfigLogMove = {
  style: {
    font: {
      color: "black",
      size: 16
    },
    stroke: {
      color: "black"
    },
    fill: {
      color: "#BF40BF"
    }
  }
};

const overlayConfigModelMove = {
  style: {
    font: {
      color: "black",
      size: 16
    },
    stroke: {
      color: "black"
    },
    fill: {
      color: "yellow"
    }
  }
};

export function showConformanceData(bpmnVisualization) {
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

  eventsMap.set("Event_0e43ncy", "Vendor creates invoice");

  addOverlay("Activity_0ec8azh", "synchronous", "40", bpmnVisualization);
  addOverlay("Activity_0ec8azh", "logMove", "10", bpmnVisualization);
  addOverlay("Activity_0ec8azh", "modelMove", "10", bpmnVisualization);
}

function addOverlay(elementId, overlayType, label, bpmnVisualization) {
  if (overlayType === "synchronous") {
    bpmnVisualization.bpmnElementsRegistry.addOverlays(elementId, {
      position: "top-center",
      label: label,
      ...overlayConfigSynchronous
    });
  } else if (overlayType === "modelMove") {
    bpmnVisualization.bpmnElementsRegistry.addOverlays(elementId, {
      position: "top-left",
      label: label,
      ...overlayConfigModelMove
    });
  } else if (overlayType === "logMove") {
    bpmnVisualization.bpmnElementsRegistry.addOverlays(elementId, {
      position: "top-right",
      label: label,
      ...overlayConfigLogMove
    });
  }
}

export function createLinearGradient(bpmnVisualization) {
  const svgElement = document.getElementsByTagName("svg")[0];

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );

  // Store an array of stop information for the `<linearGradient>`.
  const stops = [
    {
      color: "yellow",
      opacity: "0.5",
      offset: "0%"
    },
    {
      color: "green",
      opacity: "0.5",
      offset: "20%"
    },
    {
      color: "green",
      opacity: "0.5",
      offset: "60%"
    },
    {
      color: "#BF40BF",
      opacity: "0.5",
      offset: "100%"
    }
  ];

  stops.forEach((stop) => {
    const el = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    el.setAttribute("offset", stop.offset);
    el.setAttribute("stop-color", stop.color);
    el.setAttribute("stop-opacity", stop.opacity);

    // Add the `<stop>` element to `<linearGradient>`.
    gradient.appendChild(el);
  });

  gradient.id = "Gradient";
  defs.appendChild(gradient);

  svgElement.appendChild(defs);

  const activitySvgElement = bpmnVisualization.bpmnElementsRegistry.getElementsByIds(
    "Activity_0ec8azh"
  )[0].htmlElement;
  activitySvgElement.children[0].setAttribute("fill", "url(#Gradient)");
}
