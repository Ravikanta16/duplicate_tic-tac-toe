import Row from "./Row";
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export default function Box(){
    const [flag,setFlag]=useState(1);
    const [matrix,setMatrix]=useState([
        [null,null,null],
        [null,null,null],
        [null,null,null],    
    ]);

    useEffect(() => {
        // Join the game when the component mounts
        const playerName = prompt('Enter your name:');
        socket.emit('joinGame', playerName);
    
        // ... (other useEffect logic)
        socket.on('updateGame', (updatedBoard) => {
            setMatrix(updatedBoard);
          });
        
          // Handle game over events from the server
          socket.on('gameOver', ({ winner }) => {
            if (winner === '0') {
              alert('0 Winner');
            } else if (winner === '*') {
              alert('* Winner');
            } else {
              alert('Game draw');
            }
        });

    
        return () => {
          // Cleanup: disconnect from the server when the component unmounts
          socket.disconnect();
        };
      }, []);

    function getWinner(newMatrix){

        let ans0d=0,ans1d=0,ans0d1=0,ans1d1=0;
        for(let i=0;i<3;i++){
            let ans0h=0,ans1h=0,ans0v=0,ans1v=0;
            for(let j=0;j<3;j++){
                if(newMatrix[i][j]==='0') ans0h++;
                if(newMatrix[i][j]==='*') ans1h++;
                if(newMatrix[j][i]==='0') ans0v++;
                if(newMatrix[j][i]==='*') ans1v++;

                if(i===j){
                    if(newMatrix[i][j]==='0') ans0d++;
                    if(newMatrix[i][j]==='*') ans1d++;
                }
                if(i+j===2){
                    if(newMatrix[i][j]==='0') ans0d1++;
                    if(newMatrix[i][j]==='*') ans1d1++;
                }
            }
            if (check(ans0h, ans0v, ans0d, ans0d1)) return 1;
            if (check(ans1h, ans1v, ans1d, ans1d1)) return 2;
        }
        return 0;
    }
    function check(h,v,d,d1){
        return h===3 || v===3 || d===3 || d1===3;
    }
    function updateMatrix(row,col){
        if(matrix[row][col]===null && flag<=9){
            let newMatrix=[...matrix];
            newMatrix[row][col]=flag%2===0 ? "0" : "*";
            socket.emit('makeMove', { row, col, value: newMatrix[row][col] });
            // let winner=getWinner(newMatrix);
            // if(winner==1){
            //     alert("0 Winner");
            //     return 0;
            // }
            // else if(winner==2){
            //     alert("* Winner");
            //     return 0;
            // }
            // else{
            //     setFlag(flag+1);
            // }
        }
        if(flag>9){
            alert("Game draw");
        }
    }
    return(
        <div className="box">
            <Row matrix={matrix} setmatrix={updateMatrix} row={0}/>
            <Row matrix={matrix} setmatrix={updateMatrix} row={1}/>
            <Row matrix={matrix} setmatrix={updateMatrix} row={2}/>
        </div>
    );
}