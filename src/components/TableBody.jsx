import React, { useEffect, useState } from 'react';
import { Button, Form, Table } from 'antd';
import ModalBody from "./ModalBody";
import {defaultDataSource} from "../data";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
        <Form form={form} component={false}>
            <EditableContext.Provider value={form}>
                <tr {...props} />
            </EditableContext.Provider>
        </Form>
    );
};
const EditableCell = ({
                          title,
                          editable,
                          children,
                          dataIndex,
                          record,
                          handleSave,
                          ...restProps
                      }) => {

    return <td {...restProps}>{children}</td>;
};
const defaultColumns = [
    {
        title: 'Номер подъезда',
        dataIndex: 'entryNumber',
        width: '50%',
    },
    {
        title: 'Номер квартиры',
        dataIndex: 'flatNumber',
        editable: true,
    },
];

const TableBody = ({houseNumber}) => {
    const [dataSource, setDataSource] = useState(defaultDataSource);
    const [count, setCount] = useState(0);
    const tableData = defaultDataSource

    const handleAddButton = () => {
        setIsAdding(true)
    }
    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const columns = defaultColumns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {...col};
    });
    const [isAdding, setIsAdding] = useState(false);

    const [drawerTableState, setDrawerTableState] = useState([]);
    const [modalTableState, setModalTableState] = useState({});
    const [customizedDataSourse, setCustomizedDataSourse] = useState([]);

    const handleDeleteData = () => {
        setCustomizedDataSourse([]);
        setCount(0);
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === '+' || event.key === '=') {
                handleAddButton();
            } else if (event.key === 'Delete') {
                handleDeleteData();
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <div>
            {isAdding && <ModalBody setCustomizedDataSourse={setCustomizedDataSourse}
                                    setModalTableState={setModalTableState}
                                    modalTableState={modalTableState}
                                    drawerTableState = {drawerTableState}
                                    setDrawerTableState={setDrawerTableState}
                                    columns={columns}
                                    count={count}
                                    setCount={setCount}
                                    dataSource={dataSource}
                                    setDataSource={setDataSource}
                                    tableData = {tableData}
                                    isAdding={isAdding}
                                    setIsAdding={setIsAdding}/>}
            <div className='tableHeader' style={{display:'flex', justifyContent:"space-between"}}>
                <h3 style={{margin: "0 0 0 15px"}}>Дом №{houseNumber}</h3>
                <div className='tableHeader-button-container'>
                    <Button
                        onClick={handleAddButton}
                        type="primary"
                        style={{margin: 5}}
                    >
                        <PlusOutlined/>
                    </Button>
                    <Button
                        onClick={handleDeleteData}
                        type="primary"
                        style={{margin: 5}}
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            </div>

            <Table style={{ borderRadius: 15, border: "3px solid", paddingBottom:5, backgroundColor:'white',}}
                   components={components}
                   rowClassName={() => 'editable-row'}
                   bordered
                   dataSource={customizedDataSourse}
                   columns={columns}
                   pagination={false}
            />
        </div>
    );
};
export default TableBody;