import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import axios from 'axios';


const Steps: FC = () => {

    const [currentStep,setCurrentStep] = useState(0);
    const [errorMsg,setErrorMsg] = useState('');
    const [search,setSearch] = useState('');
    const [searchData,setSearchData] = useState(null);
    type User = {
        message: string;
    };
    type GetUsersResponse = {
        data: User[];
    };

    type searchResp = {
        s_no: number;
        oid: string;

    }

    type GetSearchResponse = {
        data: searchResp [];
    }

    async function connectivity() {
        
        
        try {
            // 👇️ const data: GetUsersResponse
            const { data, status } = await axios.get<GetUsersResponse>(
                'https://api.mocki.io/v2/d2d0daf0/ConnectivityTest',
              {
                headers: {
                  Accept: 'application/json',
                },
              },
            );
        
            setCurrentStep(currentStep+1);
        
            // 👇️ "response status is: 200"
            console.log('response status is: ', status);
        
            return data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('error message: ', error.message);
              setErrorMsg(error.message)
            } else {
              console.log('unexpected error: ', error);
              setErrorMsg('An unexpected error occurred')
            }
          }
    }
    async function configure() {
        
        
        try {
            // 👇️ const data: GetUsersResponse
            const { data, status } = await axios.get<GetUsersResponse>(
                'https://api.mocki.io/v2/d2d0daf0/SBSConfiguration',
              {
                headers: {
                  Accept: 'application/json',
                },
              },
            );
        
            setCurrentStep(currentStep+1);
            setErrorMsg('');
            console.log(JSON.stringify(data, null, 4));
            // 👇️ "response status is: 200"
            console.log('response status is: ', status);
        
            return data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('error message: ', error.message);
              setErrorMsg(error.message)
            } else {
              console.log('unexpected error: ', error);
              setErrorMsg('An unexpected error occurred')
            }
          }
    }
    async function searchAPI() {
        
        
        try {
            // 👇️ const data: GetUsersResponse
            const { data, status } = await axios.post<GetSearchResponse>(
                'https://api.mocki.io/v2/d2d0daf0/SEConfiguration',
                { name: 'model 123' },
              {
                headers: {
                  Accept: 'application/json',
                },
              },
            );
        
            //setCurrentStep(currentStep+1);
            
            console.log(JSON.stringify(data, null, 4));
            setErrorMsg('');
            
            // 👇️ "response status is: 200"
            console.log('response status is: ', status);
        
            return data;
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log('error message: ', error.message);
              setErrorMsg(error.message)
            } else {
              console.log('unexpected error: ', error);
              setErrorMsg('An unexpected error occurred')
            }
          }
    }
    

    function switchStep (  ) {
        setErrorMsg('');
        if(currentStep === 0){
            
            connectivity()
        }else if(currentStep === 1){
            configure()
        }
        else if(currentStep === 2){
            // if(search === '' || search === undefined || search === null){
            //     setErrorMsg('Please FIll Inpur Field');
            // }else{
                searchAPI()    
            //  
            
        }
    }



    return(
        <>
            {currentStep === 0 ? (
                <>
                <p>step 1: Connectivity       </p>
                <p className="" style={{color:'red'}}>{errorMsg}</p>
                <button onClick={()=> {switchStep()}} >Next</button>
                </>
            ): currentStep === 1 ? (
                <>
                <p>step 2: Configuration       </p>
                <p className="" style={{color:'red'}}>{errorMsg}</p>
                <button onClick={()=> {switchStep()}} >Next</button>
                </>
            ): currentStep === 2 ? (
                <>
                <p>step 3: Search       </p>
                {/* <input type="text" onChange={(e) => {setSearch(e.target.value)}} /> */}
                <p className="" style={{color:'red'}}>{errorMsg}</p>
                <button onClick={()=> {switchStep()}} >Next</button>
                </>
            ): null}
        
        </>
    )
}
export {Steps}