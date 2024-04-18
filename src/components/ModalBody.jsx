import React, {useEffect, useState} from 'react';
import {Modal, theme} from 'antd';
import {ModalDrawer} from "./ModalDrawer";
import {ModalTable} from "./ModalTable";
const ModalBody = ({setCustomizedDataSourse,modalTableState,setModalTableState,isAdding,setIsAdding,tableData,setCount,count,dataSource,setDataSource,setDrawerTableState,drawerTableState}) => {

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
    const { token } = theme.useToken();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const containerStyle = {
        position: 'relative',
        height: "fitContent",
        width: "100%",
        padding: "0rem",
        overflow: 'hidden',
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        fontSize: "10px",
        display:'flex'
    };

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
        <div style={{height: "50vh",width: "50vw", position:'absolute'}}>
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
                <div style={containerStyle}>
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