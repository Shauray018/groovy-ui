// src/registry/components/button.ts
var buttonRegistry = {
  button: {
    name: "button",
    description: "A customizable button component",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [],
    // npm packages needed
    files: [
      {
        type: "registry:ui",
        // Points to raw GitHub URL of your component
        path: "src/components/ui/Button.tsx",
        target: "components/ui/Button.tsx"
        // Where to copy in user's project
      }
    ]
  }
};

// src/registry/components/silk.ts
var silkRegistry = {
  button: {
    name: "silk background",
    description: "crazyyyyy background",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [],
    // npm packages needed
    files: [
      {
        type: "registry:ui",
        // Points to raw GitHub URL of your component
        path: "src/components/ui/Silk.tsx",
        target: "components/ui/Silk.tsx"
        // Where to copy in user's project
      }
    ]
  }
};

// src/registry/components/lightning.ts
var lightningRegistry = {
  button: {
    name: "lightning background",
    description: "crazyyyyy background",
    type: "registry:ui",
    registryDependencies: [],
    dependencies: [],
    // npm packages needed
    files: [
      {
        type: "registry:ui",
        // Points to raw GitHub URL of your component
        path: "src/components/ui/Lightning.tsx",
        target: "components/ui/Lightning.tsx"
        // Where to copy in user's project
      }
    ]
  }
};

// src/registry/index.ts
var REGISTRY_BASE_URL = "https://raw.githubusercontent.com/Shauray018/groovy-ui/refs/heads/main/groovy-ui-components";
var REGISTRY = {
  ...buttonRegistry,
  ...lightningRegistry,
  ...silkRegistry
};
function getComponent(name) {
  return REGISTRY[name];
}
function getAllComponents() {
  return Object.values(REGISTRY).filter((comp) => comp.type === "registry:ui");
}
function resolveAllDependencies(componentName) {
  const resolved = /* @__PURE__ */ new Set();
  const queue = [componentName];
  while (queue.length > 0) {
    const current = queue.shift();
    if (resolved.has(current)) continue;
    resolved.add(current);
    const component = getComponent(current);
    if (!component) continue;
    const deps = component.registryDependencies || [];
    deps.forEach((dep) => {
      if (!resolved.has(dep)) {
        queue.push(dep);
      }
    });
  }
  return Array.from(resolved);
}
async function fetchComponentTemplate(file) {
  const url = `${REGISTRY_BASE_URL}/${file.path}`;
  console.log(`Fetching component from: ${url}`);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    throw new Error(`Failed to fetch component template from ${url}: ${error}`);
  }
}

export {
  REGISTRY,
  getComponent,
  getAllComponents,
  resolveAllDependencies,
  fetchComponentTemplate
};
//# sourceMappingURL=chunk-4OHUC5LR.js.map