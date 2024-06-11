import { ConnectionCreate, PositionChangeProps } from "@/components/types";
import { mockInitialData } from "@/mocks/funilData";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Edge, Node, Position } from "reactflow";
import { DataMockType, TypeConnection } from "./types";

export function useApp() {
  const [data, setData] = useState(mockInitialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [modalData, setModalData] = useState<ConnectionCreate | null>(null);
  const [newConnection, setNewConnection] = useState<TypeConnection>(null);


  const nodes =  useMemo(() => {
    const theSameOrder: {[key: string]: number} = {}
    return data.steps.map((step, index) => {
      const orderTheSame = (theSameOrder[step.order] || 0) + 1;
      theSameOrder[step.order] = orderTheSame;

      return {
        id: step.id,
        data: { label: `${step.id}-${step.name}` },
        position: step.position ? step.position : { y: 120 * orderTheSame, x: 250 * (step.order) },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        style: {backgroundColor: '#ff4f00', color: '#fff', border: 'none'},
        deletable: false,
      } as Node
    })
  }, [data])

  const edges =  useMemo(() => {
    return data.steps.reduce((acc, step) => {
      const currentEdge: Edge[] = [];
  
      if(step.up !== null || step.down !== null) {
        if (step.up === step.down) {
          currentEdge.push({
            id: `${step.id}-all-${step.up}`,
            source: step.id,
            target: `${step.up}`,
            label: 'ALL',
            labelStyle: {color: '#ff4f00', fontWeight: 500}
          })
        } else {
          if (step.up !== null) {
            currentEdge.push({
              id: `${step.id}-up-${step.up}`,
              source: step.id,
              target: `${step.up}`,
              label: 'SIM'
            })
          }
          if (step.down !== null) {
            currentEdge.push({
              id: `${step.id}-down-${step.down}`,
              source: step.id,
              target: `${step.down}`,
              label: 'NÃO'
            })
          }
        }
      }
  
      return [
        ...acc,
        ...currentEdge
      ]
    }, [] as Edge[])
  }, [data])

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if(isBlock) {
      setIsBlock(false);
      return () => {}
    }

    timeout = setTimeout(() => setIsLoading(false), 1000)
    setIsLoading(true);

    return () => {
      clearTimeout(timeout)
    };
  }, [nodes, edges])

  const handleRemoveEdge = useCallback((edge: Edge) => {
    const [id, type] = edge.id.split('-');
    setIsBlock(true);
    setData((oldState) => ({
      ...oldState,
      steps: oldState.steps.map((step) => {
        if(step.id !== id) return step;
        return {
          ...step,
          up: type !== 'down' ? null : step.up,
          down: type !== 'up' ? null : step.up,
        }
      })
    } as DataMockType))
  }, [])

  useEffect(() => {!modalData && setNewConnection(null)}, [modalData])

  const handleOkModal = () => {
    if(!modalData) return;

    setData((oldState) => ({
      ...oldState,
      steps: oldState.steps.map(step => {
        if(step.id !== modalData.source.id) return step;

        const typeConnection = newConnection || 'ALL';

        return {
          ...step,
          up: typeConnection !== 'DOWN' ? Number(modalData.target.id) : (!!modalData.clear ? null : step.up),
          down: typeConnection !== 'UP' ? Number(modalData.target.id) : (!!modalData.clear ? null : step.down),
        }
      })
    }))
    setModalData(null)
  }

  const handleClearModalData = () => setModalData(null);
  
  const handleNewStep = () => {
    setData((oldState) => ({
      ...oldState,
      steps: [...oldState.steps, {
        createdAt: 'agora',
        updatedAt: 'agora',
        down: null,
        up: null,
        funnelId: '1',
        id: `${oldState.steps.length + 1}`,
        name: `Novo Step ${oldState.steps.length + 1}`,
        offerId: null,
        order: oldState.steps.reduce((acc, item) => {
          return Math.max(acc, item.order);
        }, 0),
        productSellGroupId: null,
        slug: 'teste',
      }]
    }))
  };

  const handleChangePosition = ({ id, position }: PositionChangeProps) => {
    setIsBlock(true);
    setData(oldState => ({...oldState, steps: oldState.steps.map((step) => {
      if(step.id !== id) return step;

      return {
        ...step,
        position,
      }
    })}))
  }

  return {
    data,
    isLoading,
    modalData,
    handleOkModal,
    handleClearModalData,
    setNewConnection,
    handleNewStep,
    nodes,
    edges,
    handleChangePosition,
    handleRemoveEdge,
    setModalData,
  }
}