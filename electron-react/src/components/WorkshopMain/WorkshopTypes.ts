export type componentsData = {
  name: string, 
  jsx: string,
  body: string,
  mockServer: string,
};

export type profilerData = {
  id: string,
  phase: string,
  actualDuration: number,
  baseDuration: number,
  startTime: number,
  commitTime: number,
};