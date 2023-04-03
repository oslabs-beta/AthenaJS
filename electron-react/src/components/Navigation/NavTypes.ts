export type NavigationContainerProps = {}



export type handleToggleWindow = {
    props: (e: React.MouseEvent) => void;
    performance: (e: React.MouseEvent) => void;
    savedComps: (e: React.MouseEvent) => void;
};

export interface NavBarProps {
    handleToggleWindow: handleToggleWindow
  }

export interface NavContainerUiProps {
    bg: [string, React.Dispatch<React.SetStateAction<string>>],
    addNode: (component: object) => void,
    removeNode: (component: object) => void
}