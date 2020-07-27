import React, {useState} from "react";

// const [status, setStatus] = useState('');
//const [resultObj, setResultObj] = useState(undefined);

export default function Result(props) {
    const [answer, setAnswer] = useState([]);
    

    let result = props.display;
    
    function sendUserRequest(e,result){
        // debugger;
        e.preventDefault(); 
        let status = e.target.value;
        let id = result.id;
        
        let s = {status, id}
        fetch("http://localhost:4000/api/projects/status/update", {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify(s)
        })
            .then((response) => response.json())
            .then(json => setAnswer(json))

     }

     

    return (
        <div style={{ 'border': '2px', 'borderStyle': 'groove' }}>
            <br />
        Name: {result.givenName}  {result.lastName}
            <br />
        Title: {result.title}
            <br />
        Description: {result.description}
            <br />
         Status: {result.status}      
         
            {  
                (result.status === 'pending' && 
                    
                    <div>
                        <br />
                        <button onClick={(event)=>sendUserRequest(event,result)} value="approved">Approve</button> 

                
                       <button onClick= {(event) => sendUserRequest(event, result)} value= "rejected">Reject</button>
                        <br />
                    </div> 
                 )
          
            }

            <div>
                {answer}
                    
                
                
            </div>
      

            <br />
            <br />
        </div>
    )
}