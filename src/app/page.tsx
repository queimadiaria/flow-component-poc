'use client';

import Image from "next/image";
import styles from "./page.module.css";
import 'reactflow/dist/style.css';

import { HorizontalFlow } from "@/components/ReactFlow";
import { ReactFlowProvider } from "reactflow";
import { Modal, Select, Spin } from "antd";
import { FiArrowDown } from "react-icons/fi";
import { useApp } from "./useApp";
import { TableFunil } from "@/components/TableFunil";
import { ModalEdge } from "@/components/ModalEdge";

export default function Home() {
  const {
    data,
    modalData,
    isLoading,
    handleOkModal,
    handleClearModalData,
    setNewConnection,
    handleNewStep,
    nodes,
    edges,
    handleChangePosition,
    handleRemoveEdge,
    setModalData,
  } = useApp()

  return (
    <ReactFlowProvider>
      <ModalEdge
        data={modalData}
        handleClearModalData={handleClearModalData}
        handleOkModal={handleOkModal}
        onChangeSelect={setNewConnection}
      />
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Possibilidade de Layout para:&nbsp;
            <code className={styles.code}>Montagem de fluxo de UpSell</code>
          </p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{" "}
              <Image
                src="/pay.svg"
                alt="Pay Logo"
                className={styles.vercelLogo}
                width={100}
                height={24}
                priority
              />
            </a>
          </div>
        </div>

        <TableFunil data={data.steps} handleCreate={handleNewStep} />

        <div className={styles.grid}>
          {!isLoading ? (
            <HorizontalFlow
              steps={nodes}
              edges={edges}
              onRemove={handleRemoveEdge}
              onClick={console.log}
              onEditConnection={setModalData}
              onChangePosition={handleChangePosition}
            />
          ) : (
            <Spin size="large" />
          )}
        </div>
      </main>
    </ReactFlowProvider>
  );
}
