import { useState } from "react";

export default function Cell({matrix,setmatrix,row,col}){
    const handleCell=(event)=>{
        let ans=setmatrix(row,col);
        if(ans===0){
            event.stopPropagation();
        }
    }
    return(
        <div className="cell" onClick={handleCell} >
            <div className="cellitem">
                {matrix[row][col]}
            </div>
        </div>
    );
}