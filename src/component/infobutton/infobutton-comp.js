import React,{useState} from 'react';
import style from "./infobutton.module.css";

function InfoButton() {
    const [showInfo, setshowInfo] = useState(false)
    return (<>
        
            <button className={style.infoButton} onClick={()=>setshowInfo(!showInfo)}>?</button>
        
            {
                showInfo && <div className={style.infoContainer}>
                    <p className={style.infoText}> this app is for wild pig trackering</p> 
                <button onClick={()=>setshowInfo(!showInfo)} className={style.closeInfoButton}>x</button>
                </div>
            }
       </>
    )
}

export default InfoButton
