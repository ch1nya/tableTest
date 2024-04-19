import React, {useCallback, useEffect, useState} from 'react';
import {Modal, theme} from 'antd';
import {ModalDrawer} from "./ModalDrawer";
import {ModalTable} from "./ModalTable";
import s from'../styles/ModalBody.module.css'

const ModalBody = ({setCustomizedDataSourse,modalTableState,setModalTableState,isAdding,setIsAdding,tableData,setCount,count,dataSource,setDataSource,setDrawerTableState,drawerTableState}) => {
    const { token } = theme.useToken();
    // Вылетает ошибка при комбинировании инлайн и модульных стилей, поэтому написано так
    const containerStyle = {
        background: token.colorFillAlter,
        border: `1px solid ${token.colorBorderSecondary}`,
        borderRadius: token.borderRadiusLG,
        position: "relative",
        height: "fit-content",
        width: "100%",
        padding: 0,
        overflow: "hidden",
        fontSize: "10px",
        display: "flex",

    };
    const ModalContainer = {
        height: "50vh",
        width: "50vw",
        position:"absolute"
    }

    const handleOk = useCallback(() => {
        setIsAdding(false);
        const arrayToString = drawerTableState.map(obj => Number(obj.key) + 1).join(', ')
        setCustomizedDataSourse(prev => [
            ...(prev || []),
            {
                key: modalTableState.key,
                entryNumber: modalTableState.entryNumber,
                flatNumber: arrayToString
            }
        ]);
    }, [drawerTableState, modalTableState, setIsAdding, setCustomizedDataSourse]);
    const handleCancel  = useCallback(
        () => {
            setIsAdding(false);
        },
        [setIsAdding],
    );


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
    }, [handleOk,handleCancel]);
    return (
        <div style={ModalContainer}>
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
                <div
                    style={containerStyle}
                >
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