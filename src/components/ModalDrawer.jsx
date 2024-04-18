import {Drawer, Table, theme} from "antd";
import React, {useEffect, useState} from "react";
import DrawerTable from "./DrawerTable";
import drawerTable from "./DrawerTable";

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
    }, []);
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