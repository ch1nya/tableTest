import {Table} from "antd";
import React from "react";

export function ModalTable({dataSource,setDrawerIsOpen,setModalTableState}) {
    const columnInModal = [
        {
            title: 'Номер подъезда',
            dataIndex: 'entryNumber',
            width: '50%',
        }]
    return (
        <Table
            pagination={false}
            dataSource={dataSource}
            columns={columnInModal}
            onRow={(record, rowIndex) => {
                return {
                    onClick: () => {
                        setDrawerIsOpen(true)
                        setModalTableState(record)
                    },
                };
            }}/>
    )
}