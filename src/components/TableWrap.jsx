import TableBody from "./TableBody";
import {useState} from "react";
import s from '../styles/TableWrap.module.css'

export function TableWrap() {
    const [houseNumber, setHouseNumber] = useState([1,2,3,4])
    return (
        <div className={s.TableWrap}>
            {houseNumber.map(house=><TableBody houseNumber={house} />
            )}
        </div>
    )
}