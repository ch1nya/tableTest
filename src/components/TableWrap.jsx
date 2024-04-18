import TableBody from "./TableBody";
import {useState} from "react";

export function TableWrap() {
    const [houseNumber, setHouseNumber] = useState([1,2,3,4])
    return (
        <div className='TableWrap'>
            {houseNumber.map(house=><TableBody houseNumber={house} />
            )}
        </div>
    )
}