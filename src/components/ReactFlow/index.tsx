import React, { useEffect, useState } from 'react';
import ReactFlow, { useNodesState, useEdgesState } from 'reactflow';
import 'reactflow/dist/style.css';
import { FlowComponentProps, PositionChangeProps } from '../types';

export const HorizontalFlow = ({ edges: initEdges, onRemove, steps, onEditConnection, onChangePosition }: FlowComponentProps) => {
  const [nodes, _, onNodesChange] = useNodesState(steps);
  const [edges,__, onEdgesChange] = useEdgesState(initEdges);
  const [deboucePosition, setDeboucePosition] = useState<PositionChangeProps | null>(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (deboucePosition === null) {
      return () => {};
    }

    timeout = setTimeout(() => onChangePosition(deboucePosition), 500)

    return () => {
      clearTimeout(timeout)
    }
  }, [deboucePosition])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={(changes) => {
        onNodesChange(changes)


        const positionChange: any = (changes as any[]).find(({type, dragging}) => type === 'position' && dragging !== false)
        if(positionChange) {
          console.log('positionChange', positionChange);
          setDeboucePosition({
            id: positionChange.id,
            position: positionChange.position,
          });
        }

      }}
      onEdgesChange={(changes) => {
        onEdgesChange(changes)

        const removeChange: any = changes.find(({type}) => type === 'remove')
        if(!!removeChange) {
          const edgeRemoved = initEdges.find(({ id }) => id === removeChange.id)

          if(!!edgeRemoved) {
            onRemove(edgeRemoved)
          }
        }

        const selectedChange: any = (changes as any[]).find(({type, selected }) => type === 'select' && !!selected);
        if(!!selectedChange) {
          const edgeEdit = initEdges.find(({ id }) => id === selectedChange.id)
          if(!!edgeEdit) {
            const [idSource, _, idTarget] = edgeEdit.id.split('-')

            const sourceStep = steps.find(step => step.id === idSource);
            const targetStep = steps.find(step => step.id === idTarget);

            if(targetStep && sourceStep) {
              onEditConnection({target: targetStep, source: sourceStep, clear: true})
            }
          }
        }

      }}
      onConnect={(connection) => {
        if(connection.target && connection.source) {
          const targetStep = steps.find(step => step.id === connection.target);
          const sourceStep = steps.find(step => step.id === connection.source);

          if(targetStep && sourceStep) {
            onEditConnection({target: targetStep, source: sourceStep})
          }
        }
      }}
      attributionPosition="bottom-left"
      style={{ height: 400 }}
    />
  );
};
