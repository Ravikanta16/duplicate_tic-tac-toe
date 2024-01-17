import Cell from "./Cell";
export default function Row({matrix,setmatrix,row}){
    return(
        <div className="row">
            {/* <Cell flag={flag} setflag={setflag}/>
            <Cell flag={flag} setflag={setflag}/>
            <Cell flag={flag} setflag={setflag}/> */}

            <Cell matrix={matrix} setmatrix={setmatrix} row={row} col={0}/>
            <Cell matrix={matrix} setmatrix={setmatrix} row={row} col={1}/>
            <Cell matrix={matrix} setmatrix={setmatrix} row={row} col={2}/>
        </div>
    );
}