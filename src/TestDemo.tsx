
import React,{useState} from 'react';



const TestDemo:React.FC=()=> {

    const [text, setText] = useState<string>('Initial text');

    const changeText=()=>{

        setText("Hello world")
    }
    console.log("text",text)

    return (
        <div>   
           <h1>{text}</h1>
            <button onClick={changeText}>Click Me</button>
         </div>
    );
            
    
}

export default TestDemo;