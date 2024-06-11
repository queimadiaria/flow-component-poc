import { Modal, Select } from "antd"
import { ConnectionCreate } from "../types"
import { FiArrowDown, FiArrowRight } from "react-icons/fi"
import { TypeConnection } from "@/app/types"

type ModalEdgeProps = {
  data: ConnectionCreate | null,
  handleOkModal: () => void,
  handleClearModalData: () => void,
  onChangeSelect: (value: TypeConnection) => void;
}

export function ModalEdge({ data, handleOkModal, handleClearModalData, onChangeSelect }: ModalEdgeProps) {
  return (
    <Modal
      open={!!data}
      okText='Salvar'
      cancelText='Cancelar'
      onOk={handleOkModal}
      onCancel={handleClearModalData}
      onClose={handleClearModalData}
    >
      <div>
        <p style={{ fontSize: 18, color: '#292929'}}>Criar conexão?</p>
        <span style={{ fontSize: 14, color: '#909090', display: 'flex', margin: '16px 0px 8px' }}>
          Marque o tipo de conexão que deseja criar
        </span>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <p>{data?.source.data.label}</p>
          <FiArrowRight />
          <p>{data?.target.data.label}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '16px 0px' }}>
          <Select
            defaultValue="ALL"
            style={{ width: '100%' }}
            onChange={onChangeSelect}
            options={[
              { value: 'ALL', label: 'All', },
              { value: 'UP', label: 'Sim' },
              { value: 'DOWN', label: 'Não' },
            ]}
          />
        </div>
      </div>
    </Modal>
  )
}