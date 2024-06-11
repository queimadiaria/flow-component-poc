import { Edge, Node, XYPosition } from "reactflow"

export type ConnectionCreate = {source: Node; target: Node, clear?: boolean}
export type PositionChangeProps = {id: string, position: XYPosition}

export type FlowComponentProps = {
  steps: Node[];
  edges: Edge[];
  onRemove: (edge: Edge) => void;
  onClick: (node: Node) => void;
  onEditConnection: (connect: ConnectionCreate) => void;
  onChangePosition: (props: PositionChangeProps) => void;
}