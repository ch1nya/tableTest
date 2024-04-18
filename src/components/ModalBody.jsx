import React, {useEffect, useState} from 'react';
import {Modal, theme} from 'antd';
import {ModalDrawer} from "./ModalDrawer";
import {ModalTable} from "./ModalTable";
import s from'../styles/ModalBody.module.css'

const ModalBody = ({setCustomizedDataSourse,modalTableState,setModalTableState,isAdding,setIsAdding,tableData,setCount,count,dataSource,setDataSource,setDrawerTableState,drawerTableState}) => {
    const { token } = theme.useToken();
    const containerStyle = {
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
    };

    const handleOk = () => {
        setIsAdding(false);
        const arrayToString =  drawerTableState.map(obj=>Number(obj.key)+1).join(', ')
        setCustomizedDataSourse(prev => [
            ...(prev || []),
            {
                key: modalTableState.key,
                entryNumber: modalTableState.entryNumber,
                flatNumber: arrayToString
            }
        ]);
    };
    const handleCancel = () => {
        setIsAdding(false);
    };
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter' || event.key === 'Ctrl') {
                handleOk();
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
    return (
        <div style={s.ModalContainer}>
            <Modal
                open={isAdding}
                onOk={handleOk}
                okButtonProps={{
                    disabled: (!drawerIsOpen && isAdding),
                }}
                okText='Добавить'
                cancelText='Отменить'
                onCancel={handleCancel}
                closable={false}
                keyboard={true}
                width={'35rem'}
            >
                <div style={{...s.ModalDrawerContainer,...containerStyle }}>
                    <ModalTable setModalTableState={setModalTableState}
                                setDrawerIsOpen={setDrawerIsOpen}
                                dataSource={tableData}/>
                    <ModalDrawer drawerTableState = {drawerTableState}
                                 setDrawerTableState={setDrawerTableState}
                                 setDrawerIsOpen={setDrawerIsOpen}
                                 drawerIsOpen={drawerIsOpen}
                                 tableData={tableData}/>
                </div>
            </Modal>
        </div>
    );
};
export default ModalBody;