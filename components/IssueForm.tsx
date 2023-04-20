import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import BaseLayout from '@/components/layout';
import { error } from 'console';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const IssueForm: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');
    const[userId,setUserId]=useState(0)
  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;

    const [statuses,setStatus]=useState<any[]>([])
    const [priorities,setPriority]=useState<any[]>([])
    const [types,setType]=useState<any[]>([])
  useEffect(()=>{
    let statusData=null,priorityData=null,typeData=null
    async function getStatus(){
        let statusData=await axios.get('http://localhost:3002/status')
        console.log("HERE",statusData)
        setStatus(statusData.data)
    };
    async function getPriority(){
        let priorityData=await axios.get('http://localhost:3002/priority')
        console.log(priorityData)
        setPriority(priorityData.data)
    };
    async function getType(){
        let typeData=await axios.get('http://localhost:3002/type')
        console.log(typeData)
        setType(typeData.data)
    };
    if(!statuses.length)getStatus()
    if(!types.length)getType()
    if(!priorities.length)getPriority()
    if(!userId )setUserId(parseInt(""+localStorage.getItem('id')))
    })
    async function handleIssueData(event:any):Promise<void>{
        event.preventDefault()
        const namesHeader=['title','description','assigneeId','statusId','typeId','priorityId','storyPoints','start_date','end_date']
        const intHeader=['assigneeId','statusId','typeId','priorityId']
        let data={}

        for(let header of namesHeader){
            console.log(header)
            data[header] = event.target[header].value
        }
        for(let header of intHeader){
            console.log(header)
            data[header] = parseInt(""+(event.target[header].value))
        }
        data['reporterId']=userId
        data['epicId']=6
        data['projectId']=3
        console.log("HERE",data,userId)
        await axios({
            method: 'post',
            url: 'http://localhost:3002/issues/create',
            data: data
        })
        .then((res)=>{
            console.log(res)
        })
        .catch((error)=>{console.log(error)})
        
    }

    
  
  return (
    <>
     <form className='formHU' onSubmit={handleIssueData} >
       <div id="IssueAssigneeStatus">
            <div className="formHUTitle" >
                <div className='mainFormTitle'>
                    Create Issue
                </div>
            </div>
            <div className='subTitle'>Title</div>
            <Input className='inpField' name="title" placeholder="enter issue" />

            <br/>
             <br/>
            <div className='subTitle'>Description</div>
             <textarea className='inpField' name='description' placeholder="enter description" />
             <br/>
             <br/>
            <div className="row">
                <div className='col-6'>
                    <div className='subTitle'>Assignee</div>
                    <Input type='text' className='inpField2' name='assigneeId' placeholder="enter assignee" />
                </div>
                <div className='col-6'>
                    <div className='subTitle'>Status</div>
                    <select className='inpField2' id='statusDropdown' name='statusId' placeholder="enter status" >
                        <>
                            {statuses? statuses.map((statusDetail)=><option  value={statusDetail.sId} selected>{""+statusDetail.sType}</option>
):<></> }
                        </>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className='col-4'>
                    <div className='subTitle'>Type</div>
                    <select className='inpField2' id='typeDropdown' name='typeId' placeholder="enter type" >
                        <>
                            {types? types.map((typeDetail)=><option  value={typeDetail.tId} selected>{""+typeDetail.tType}</option>):<></> }
                        </>
                    </select>
                </div>
                <div className='col-4'>
                    <div className='subTitle'>Priority</div>
                    <select className='inpField2' id='priorityDropdown' name='priorityId' placeholder="enter priority" >
                        <>
                            {priorities? priorities.map((priorityDetail)=><option  value={priorityDetail.priorityId} selected>{""+priorityDetail.PType}</option>):<></> }
                        </>
                    </select>
                </div>
                <div className='col-4'>
                    <div className='subTitle'>Story Points</div>
                    <Input className='inpField2' type='number' name="storyPoints" min={1} required/> 
                </div>
            </div>
            <div className="row">
                <div className='col-6'>
                    <div className='subTitle'>Start Date</div>
                    <Input type='date' className='inpField2' name="start_date" placeholder="choose start date" />
                </div>
                <div className='col-6'>
                    <div className='subTitle'>End Date</div>
                    <Input type='date' className='inpField2' name="end_date" placeholder="choose end date" />
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <button className="resetButton" type='reset' value='Reset'>Reset</button>
                </div>
                <div className='col-6'>
                    <button className="submitButton" type='submit' value='Submit' >Submit</button>
                </div>
            </div>
       </div>
     </form>
     </>
    /* <div className="formHU">
        <div className='formHUTitle'>
            <div className='subTitle'>Title</div><br/>
            <div> <Input type="text" className='inpField' id="IssueTitle" placeholder='enter issue title'/> </div>
            <div className='subTitle'>Description</div><br/>
            <div> <TextArea className='inpField' id="IssueTitle" placeholder='enter issue title'/> </div>
            <div className='subTitle'>Title</div><br/>
            <div> <input type="text" className='inpField' id="IssueTitle" placeholder='enter issue title'/> </div>
        </div>
    </div> */
  );
};

export default IssueForm;


