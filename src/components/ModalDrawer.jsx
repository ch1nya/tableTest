import {Drawer} from "antd";
import React, {useEffect} from "react";
import DrawerTable from "./DrawerTable";

export function ModalDrawer({tableData,setDrawerIsOpen, drawerIsOpen,setDrawerTableState,drawerTableState}) {

    const onClose = () => {
        setDrawerTableState([])
        setDrawerIsOpen(false);
    };
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'ArrowLeft') {
                setDrawerIsOpen(false)
            } else if (event.key === 'ArrowRight') {
                setDrawerIsOpen(true)
            }
        };
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [setDrawerIsOpen]);
    return (
        <Drawer placement="right"
                closable={true}
                onClose={onClose}
                open={drawerIsOpen}
                getContainer={false}>
            <DrawerTable setDrawerTableState={setDrawerTableState}
                         drawerTableState={drawerTableState}
                         tableData={tableData}/>
        </Drawer>
    )
}