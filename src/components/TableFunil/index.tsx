import { DataStepMockType } from "@/app/types";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";

type TableFunilProps = {
  handleCreate: () => void
  data: DataStepMockType[];
}


const columnsConfig: ColumnsType<DataStepMockType> = [{
  key: 'id',
  dataIndex: 'id',
  title: 'ID',
  width: '2vw'
},{
  key: 'name',
  dataIndex: 'name',
  title: 'Nome',
},{
  key: 'up',
  dataIndex: 'up',
  title: 'UP',
  width: '5vw',
  render: (value: DataStepMockType['up']) => {
    return !!value ? value : 'n/a'
  }
},{
  key: 'down',
  dataIndex: 'down',
  title: 'DOWN',
  width: '5vw',
  render: (value: DataStepMockType['down']) => {
    return !!value ? value : 'n/a'
  }
},{
  key: 'order',
  dataIndex: 'order',
  title: 'Ordem',
  width: '5vw'
}]

export function TableFunil({ handleCreate, data }: TableFunilProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%' }}>
      <div style={{ margin: '16px 0' }}>
        <Button onClick={handleCreate}>Adicionar novo passo</Button>
      </div>
      <Table style={{width: '100%'}} columns={columnsConfig} dataSource={data} />
    </div>
  )
}