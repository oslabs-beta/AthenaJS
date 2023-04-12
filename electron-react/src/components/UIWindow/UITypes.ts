export type component = {
  name: string;
  jsx: string;
  body: string;
  mockServer: string;
};

export type nodeData = {
  component: component;
  removeNode: (component: component) => void;
};

export type nodePosition = {
  x: number;
  y: number;
};

export type customNode = {
  id: string;
  type: string;
  position: nodePosition;
  data: nodeData;
};

export interface UICompProps {
  bg: [string, React.Dispatch<React.SetStateAction<string>>];
  addNode: (component: object) => void;
  removeNode: (component: object) => void;
}

export interface ReactFlowCompProps {
  data: nodeData;
  selected: boolean;
}
