import React,{useState} from 'react';

import style from "./app-info.module.css";

function InfoButton() {
    const [showInfo, setShowInfo] = useState(false)
    return (<>
        <div  className={style.infoButtonContainer }>
        <button  className={style.infoButton} onClick={()=>setShowInfo(!showInfo)}>?</button>
        </div>
            {
                showInfo && <div className={style.infoContainer}>
                    <div>
                      
                    
                    <h5>why this application exists?</h5>
                    <p > 
                    In the last few years, Morocco has lived several cases of accidents relate to wild pig's appearance in hometowns, ex.:  car accident,  attacking people, or destroying properties. Therefore, 
                    we decide to make this app so that users can keep track of places where wild boar appeared to take their precautions.
                      </p> 
                    <h5>I saw a pig what should I do?</h5>
                    <p > 
                    you can use either the location button or the search bar to locate yourself and with a simple click you will add a marker, now everybody will take into consideration the information you provide for their safety
                    </p> 
                    <h5>I can mark pig in the water?</h5>
                    <p > 
                    It turned out that pigs are a perfect swimmer, and that is a scientific fact. So technically, you can see a pig on the water surfaces.
                    </p> 
                   
                    </div>
                <button onClick={()=>setShowInfo(!showInfo)} className={style.closeInfoButton}>
                    <svg id="Capa_1" enableBackground="new 0 0 413.348 413.348"
                     height="512" viewBox="0 0 413.348 413.348" width="512"
                      xmlns="http://www.w3.org/2000/svg">
                          <path d="m413.348 24.354-24.354-24.354-182.32 182.32-182.32-182.32-24.354 24.354 182.32 182.32-182.32 182.32 24.354 24.354 182.32-182.32 182.32 182.32 24.354-24.354-182.32-182.32z"/></svg></button>
                </div>
            }
       </>
    )
}

export default InfoButton
