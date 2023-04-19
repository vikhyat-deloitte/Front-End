import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Radio } from 'antd';
// import TextArea from 'antd/es/input/TextArea';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

type LayoutType = Parameters<typeof Form>[0]['layout'];

const App: React.FC = () => {
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('horizontal');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal' ? { labelCol: { span: 4 }, wrapperCol: { span: 14 } } : null;

  const buttonItemLayout =
    formLayout === 'horizontal' ? { wrapperCol: { span: 14, offset: 4 } } : null;
  useEffect(()=>{async function getData(){
     let data=await axios.get('http://localhost:3002/status')
     console.log(data)
  };
  getData()}
  ) 
  return (
    <>
     <Form className='formHU'>
       <div id="IssueAssigneeStatus">
            <div className="formHUTitle" >
                <div className='mainFormTitle'>
                    Create Issue
                </div>
            </div>
            <div className='subTitle'>Title</div>
            <Input className='inpField' placeholder="enter issue" />
         
            <br/>
             <br/>
            <div className='subTitle'>Description</div>
             <textarea className='inpField' placeholder="enter description" />
             <br/>
             <br/>
            <div className="row">
                <div className='col-6'>
                    <div className='subTitle'>Assignee</div>
                    <Input type='text' className='inpField2' placeholder="enter assignee" />
                </div>
                <div className='col-6'>
                    <div className='subTitle'>Status</div>
                    <select className='inpField2' id='statusDropdown' name='status' placeholder="enter status" >
                        <option  value='To-Do' selected>To-Do</option>
                        <option  value='In-Progess' >In-Progress</option>
                        <option  value='Done'>Done</option>
                        <option  value='Blocked'>Blocked</option>
                    </select>
                </div>
            </div>
            <div className="row">
                <div className='col-4'>
                    <div className='subTitle'>Type</div>
                    <select className='inpField2' id='statusDropdown' name='status' placeholder="enter status" >
                        <option  value='User Story'>User Story</option>
                        <option  value='Tasks'>Tasks</option>
                        <option  value='Sub Tasks'>Sub Tasks</option>
                        <option  value='Defects'>Defects </option>
                    </select>
                </div>
                <div className='col-4'>
                    <div className='subTitle'>Priority</div>
                    <select className='inpField2' id='statusDropdown' name='status' placeholder="enter status" >
                        <option  value='low'>Low</option>
                        <option  value='medium' selected>Medium</option>
                        <option  value='high'>High</option>
                    </select>
                </div>
                <div className='col-4'>
                    <div className='subTitle'>Story Points</div>
                    <Input className='inpField2' type='number' min={1} required/> 
                </div>
            </div>
            <div className="row">
                <div className='col-6'>
                    <div className='subTitle'>Start Date</div>
                    <Input type='date' className='inpField2' placeholder="choose start date" />
                </div>
                <div className='col-6'>
                    <div className='subTitle'>End Date</div>
                    <Input type='date' className='inpField2' placeholder="choose end date" />
                </div>
            </div>
            <div className='row'>
                <div className='col-6'>
                    <button className="resetButton" type='reset' value='Reset'>Reset</button>
                </div>
                <div className='col-6'>
                    <button className="submitButton" type='reset' value='Reset'>Submit</button>
                </div>
            </div>
       </div>
     </Form>
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

export default App;


