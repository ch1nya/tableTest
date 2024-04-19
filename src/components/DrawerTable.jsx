import React, {useEffect, useState} from 'react';
import { Table } from 'antd';

const columnInDrawer = [
    {
        title: 'Номер квартиры',
        dataIndex: 'flatNumber',
    }
]

const dataSourse = [
    {
        key: '0',
        flatNumber: '1 квартира',
    },
    {
        key: '1',
        flatNumber: '2 квартира',
    },
    {
        key: '2',
        flatNumber: '3 квартира',
    },
    {
        key: '3',
        flatNumber: '4 квартира',
    },
    {
        key: '4',
        flatNumber: '5 квартира',
    },
    {
        key: '5',
        flatNumber:'6 квартира'}]

const DrawerTable = ({setDrawerIsOpen,setDrawerTableState,drawerIsOpen}) => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [selectedRowIndex, setSelectedRowIndex] = useState(-1);
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowUp') {
                if (selectedRowIndex > 0) {
                    setSelectedRowIndex(selectedRowIndex - 1);
                    setSelectedRowKeys([dataSourse[selectedRowIndex - 1].key]);
                }
            } else if (event.key === 'ArrowDown') {
                if (selectedRowIndex < dataSourse.length - 1) {
                    setSelectedRowIndex(selectedRowIndex + 1);
                    setSelectedRowKeys([dataSourse[selectedRowIndex + 1].key]);
                }
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [selectedRowIndex]);

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setDrawerTableState(selectedRows);
            setSelectedRowKeys(selectedRowKeys);
        },
        selectedRowKeys,
    };
    return (
        <div>
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                columns={columnInDrawer}
                dataSource={dataSourse}
                pagination={false}
                size={"middle"}
            />
        </div>
    );
};
export default DrawerTable