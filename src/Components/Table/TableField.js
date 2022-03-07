import React from "react";
import cellEditFactory, { Type,Id } from 'react-bootstrap-table2-editor';
import { fetchAllProjects } from "../Services/airtableServices";
import { FaCheck } from 'react-icons/fa';

const logoFormatter=(data,row)=>{
    return <><img src={data} width="60px" onClick={()=>(alert("this"))} height="60px" /></>
}
const iconFormatter=(data,row)=>{
    if(data===true){
    return <><FaCheck/></>
}
}
const dtu =  [{
    value: 'A',
    label: 'A'
  }, {
    value: 'B',
    label: 'B'
  }, {
    value: 'C',
    label: 'C'
  }, {
    value: 'D',
    label: 'D'
  }, {
    value: 'E',
    label: 'E'
  }]

const fiel = ()=>{const dt =  [{
    value: 'A',
    label: 'A'
  }, {
    value: 'B',
    label: 'B'
  }, {
    value: 'C',
    label: 'C'
  }, {
    value: 'D',
    label: 'D'
  }, {
    value: 'E',
    label: 'E'
  }]
  
  return dt
  

};
const fielr = ()=>{
  try {
    const { data: fetchDataRes,status } =  fetchAllProjects();
    const {records:fetchDataResponses} = fetchDataRes;

    let data = [];
    let x =1
    fetchDataResponses.forEach((fetchDataResponse) => {
        const {id:ID,fields,createdTime} = fetchDataResponse;
        
        const{Category} = fields;
        const Cat = Category!== undefined?Category :"";

        data.push({
          
          key:ID,
          value: Cat,
          label: Cat,
         
        },)
        
        x++
        
      });
      console.log("option",typeof data)
      return data
  }catch(ex){}

};

  const fidi = [fielr()]
  const fid = [fiel()]
  console.log("fidi", fidi)

export const projectFields =[

    { 
        dataField : "countID",
        text :"ID",
        editor: {
            type: Type.TEXT,            
          }
    },
    { 
        dataField : "Name",
        text :"project name",
        id:"projectName",
    },
    { 
        dataField : "Category",
        text :"category",
        id:"projectCategory",
        editor: {
            type: Type.SELECT,
            options:[fid],
            // getOptions: (setOptions) => {
            //   setTimeout(() => {
            //     setOptions([fid]);
            //   }, 2000);
            // }
          }
    },
    
    { 
        dataField : "Complete",
        text :"complete",
        id:"projectComplete",
        formatter:iconFormatter,
        editor: {
            type: Type.CHECKBOX,
            value: 'true:false'
          }
    },
    { 
        dataField : "kickoff",
        text : "Kickoff date",
        id:"projectKickOff",
        editor: {
            type: Type.DATE
          }
    },
    { 
        dataField : "dueDate",
        text :"due date",
        id:"projectDueDate",
        editor: {
            type: Type.DATE
          }
    },
    { 
        dataField : "Notes",
        text :"Notes",
        id:"projectNotes",
        editor: {
            type: Type.TEXTAREA
          }
        
    },
    // { 
    //     dataField : "task name",
    //     text :,
    // },
    // { 
    //     dataField : "task complete",
    //     text :,
    // },
    // { 
    //     dataField : "asignee",
    //     text :,
    // },
    // { 
    //     dataField : "time estimate",
    //     text :,
    // },
    // { 
    //     dataField : "subtasks",
    //     text :,
    // },
    { 
        dataField : "Clientnames",
        text :"Client Name",
        id:"clientName",
        editor: {
            type: Type.TEXT,
            
            
          }
    },
    { 
        dataField : "clientabout",
        text :"About Client",
        id:"clientAbout",
        editor: {
            type: Type.TEXTAREA
          }
    },
    { 
        dataField : "logoUrl",
        text :"Logo",
        formatter:logoFormatter,
        id:"clientLogo",
        // editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
        //     <QualityRanger { ...editorProps } value={ value } />
        //   )
    },
];

// const [projectDetails, setProjectDetails] = useState({
//     projectName: "",
//     projectCategory: "",
//     projectComplete: "",
//     projectImages: "",
//     projectLead: "",
//     projectTeam: "",
//     projectKickOff: "",
//     projectDueDate: "",
//     projectNotes: "",
//   });

//   const [clientDetails, setClientDetails] = useState({
//     clientName: "",
//     clientLogo: "",
//     clientAbout: "",
    
//   });

//   const [taskDetails, setTaskDetails] = useState({
//     taskName: "",
//     subTasks: "",
//     taskComplete: "",
//     username: "",
//     assignee: "",
//     timeEstimate: "",
    
//   });


export const functionsArray=[
    {
        functionName:"projectName",
        functionValue:"projectNameUpdate",
    },
    {
        functionName:"projectCategory",
        functionValue:"projectCategoryUpdate",
    },
    {
        functionName:"projectComplete",
        functionValue:"projectCompleteUpdate",
    },
    {
        functionName:"projectKickOff",
        functionValue:"projectKickOffUpdate",
    },
    {
        functionName:"projectNotes",
        functionValue:"projectNotesUpdate",
    },
    {
        functionName:"projectDueDate",
        functionValue:"projectDueDateUpdate",
    },
    {
        functionName:"clientName",
        functionValue:"clientNameUpdate",
    },
    {
        functionName:"clientAbout",
        functionValue:"clientAboutUpdate",
    },
    {
        functionName:"clientLogo",
        functionValue:"clientLogoUpdate",
    },
    {
        functionName:"taskName",
        functionValue:"taskNameUpdate",
    },
    {
      functionName:"taskComplete",
      functionValue:"taskCompleteUpdate",
    },
    {
      functionName:"taskEstimatedDays",
      functionValue:"taskEstimatedDaysUpdate",
    },


];

export const functionsArrayPost=[
  {
    functionName:"taskName",
    functionValue:"taskNameCreate",
  },
  {
    functionName:"taskComplete",
    functionValue:"taskCompleteCreate",
  },
  {
    functionName:"taskEstimatedDays",
    functionValue:"taskEstimatedDaysCreate",
   },
]

class QualityRanger extends React.Component {
    static propTypes = {
     
    }
    static defaultProps = {
      value: 0
    }
    getValue() {
      return parseInt(this.range.value, 10);
    }
    render() {
      const { value, onUpdate, ...rest } = this.props;
      return [
        <input
        type="file" id="img" name="img" accept="image/*"

          
          
        />,
        
      ];
    }
  }

  export const tasksFields =[

    { 
        dataField : "countID",
        text :"ID",
        
    },
    { 
        dataField : "Tasknames",
        text :"Task name",
        id:"taskName"        
    },
    // { 
    //   dataField : "TaskIdentity",
    //   text :"Task name",        
    // },
    { 
      dataField : "Taskcomplete",
      text :"Task Complete", 
      id:"taskComplete",
      formatter:iconFormatter,
        editor: {
            type: Type.CHECKBOX,
            value: 'true:false'
          }       
    },
    { 
      dataField : "estimatedDays",
      text :"Estimated Days",
      id:"taskEstimatedDays"        
    },
]
// Tasknames, TaskIdentity, AssigneeID, AssigneeEmail,
//  AssigneeName, Subtasks, Taskcomplete, estimatedDays

