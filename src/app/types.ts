import { XYPosition } from "reactflow";

export type DataStepMockType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  funnelId: string;
  productSellGroupId: string | null;
  offerId: string | null;
  slug: string;
  up: number | null;
  down: number | null;
  order: number;
  position?: XYPosition;
}

export type DataMockType = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  active: boolean;
  steps: DataStepMockType[];
}

export type TypeConnection = 'ALL' | 'UP' | 'DOWN' | null;