export type performanceData = {
  renderName?: string,
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
};

export type componentsData = {
  name: string, 
  jsx: string,
  body: string,
  mockServer: string,
};