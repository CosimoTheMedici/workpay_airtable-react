import React, {useState,useEffect}from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { Loader } from '../CustomComponents';
import { fetchAllProjects, fetchClientsByID ,fetchClientList, fetchAllClients, patchProjectRecord, patchClientRecord, fetchAllTasks, patchTasksRecord, createTasksRecord} from '../Services/airtableServices';
import { functionsArray, functionsArrayPost, projectFields, tasksFields } from './TableField';
import cellEditFactory ,{id,Type} from 'react-bootstrap-table2-editor';
import { errorNotification, successNotification, warningNotification } from '../CustomComponents/Notifications';



const Airtable = () => {
    const [dispLoader, setDispLoader] = useState("none");
    const [projectData, setProjectData ] = useState([])
    const [clientData, setClientData] = useState([]);
    const [clientDataID, setClientDataID] = useState([]);

     function fetchClientListData(fetchDataRes) {

      const {records:fetchDataResponses} = fetchDataRes;
      try {

        
         
        //console.log("countries",fetchDataResponses,status)
  
          const dataar = [];
          
          
            let x = 0;
    
            fetchDataResponses.forEach((fetchDataResponse) => {
              const {createdTime,fields,id:ClientIdentities} = fetchDataResponse;
              const {Name:Clientnamess,About:clientabouts,Logo} = fields;
              // //const clientsname = fields.Name;
              
              const LOGO = Logo!== undefined? Logo[0]:""
              
                  const logodata = LOGO
                  const{id:logoids,url:logolink} = logodata; 
              
                  const logoID = logoids!== undefined?logoids :"";
                  const logoUrl = logolink!== undefined?logolink :"";
                  const clientabout = clientabouts!== undefined?clientabouts :"";
                  const Clientnames = Clientnamess!== undefined?Clientnamess :"";
                  const ClientIdentityi = ClientIdentities!== undefined?ClientIdentities :"";
               
              const datas = {
                  logoID,
                  logoUrl,
                  clientabout,
                  Clientnames,
                  ClientIdentityi,          
              
              };
              
              dataar.push(datas);
              x++;
              
            });
            
  
            
         // setClientData(dataar);
          // console.log("data", dataar)
          return dataar;
        
      } catch (ex) {
        console.log({ ex });
        
      }
      
  }

   function fetchTasksListData(fetchDataRes) {

    const {records:fetchDataResponses} = fetchDataRes;
    try {

      
       
      //console.log("countries",fetchDataResponses,status)

        const dataar = [];
        
        
          let x = 0;
  
          fetchDataResponses.forEach((fetchDataResponse) => {
            const {createdTime,fields,id:taskidentity} = fetchDataResponse;
            const estimated = "Time estimate (days)";
            const {Name:Taskname,Assignee:taskassignee,subtasks,Completed:taskcomplete,[estimated]:estimateddays} = fields;
            const Tasknames = Taskname!== undefined?Taskname :"";
            const TaskIdentity = taskidentity!== undefined?taskidentity :"";
            const Taskassignee = taskassignee!== undefined?taskassignee :"";
            const Subtasks = subtasks!== undefined?subtasks :"";
            const Taskcomplete = taskcomplete!== undefined?taskcomplete :"";
            const estimatedDays = estimateddays!== undefined?estimateddays :"";
            const AssigneeID = Taskassignee.id!== undefined?Taskassignee.id :"";
            const AssigneeEmail = Taskassignee.email!== undefined?Taskassignee.email :"";
            const AssigneeName = Taskassignee.name!== undefined?Taskassignee.name :"";
                        

             let datas = {
                            Tasknames,
                            TaskIdentity,
                            AssigneeID,
                            AssigneeEmail,
                            AssigneeName,
                            Subtasks,
                            Taskcomplete,
                            estimatedDays
            };
                     

            dataar.push(datas);
                     x++;
         });

          

          
       // setClientData(dataar);
        // console.log("data", dataar)
        return dataar;
      
    } catch (ex) {
      console.log({ ex });
      
    }
    
}    

     function setTaskArray(Tasks,tasksdata) {
      const taskarray = []
      Tasks.forEach((task)=>{
     let objTask = tasksdata.find((v) => v.TaskIdentity == task);
      taskarray.push(objTask);
    })
    return taskarray;
     }
     

    async function  fetchDataList() {
        setDispLoader("block")
        try {
          const { data: fetchDataRes,status } = await fetchAllProjects();
          const { data: fetchDataResClients, } = await fetchAllClients();
         const {records:fetchDataResponses} = fetchDataRes;
         const { data: fetchDataResTask } = await fetchAllTasks();
          const {records:fetchDataResponsestasks} = fetchDataResTask;


          
          

          const clientdata = fetchClientListData(fetchDataResClients)
          const tasksdata = fetchTasksListData(fetchDataResTask)

          console.log("fetchDataResTask",tasksdata)

          if (fetchDataResponses) {
    
            let data = [];
            
            
              let x = 1;
      
              fetchDataResponses.forEach((fetchDataResponse) => {
                const {id:ID,fields,createdTime} = fetchDataResponse;
                const kickof = "Kickoff date";
                const projectImage = "Project images";
                const duedate = "Due date";
                const projectteam = "Project team";
                const projectlead = "Project lead";
                const{[kickof]:kickoff,Name,[projectImage]:projectImages,Client,Tasks,[duedate]:dueDate,[projectteam]:projectTeam,[projectlead]:projectLead,Notes,Category,Complete} = fields;
                //console.log("projectlead",projectLead);
                const dataProjectLead = projectLead !== undefined ? handleProjectLead(projectLead) : handleProjectLeadNoData()

                // const fete = fetchClientListByID(Client[0])
                // console.log("clientDataID", clientDat);
                //let objClient =clientDataID;
                  let objClient = clientdata.find((v) => v.ClientIdentityi == Client[0]);
                 
                  const enquireTasks = Tasks!== undefined? setTaskArray(Tasks,tasksdata) :'';
                //    const taskarray = []
                //    enquireTasks.forEach((task)=>{
                //   let objTask = tasksdata.find((v) => v.TaskIdentity == task);
                //    taskarray.push(objTask);
                //  })
                console.log("taskarray",enquireTasks);
                


                //const enquireTasks = Tasks!== undefined? Tasks[0] :null;
               
                
                //const objTask = enquireTasks!== null? fetchTasksListByID(enquireTasks)  :{AssigneeEmail: "",AssigneeID: "", AssigneeName: "", Subtasks: "", TaskIdentity: "", Taskcomplete: "",Tasknames: "",estimatedDays: ""};
                

                //let objTask = taskData.find((v) => v.TaskIdentity == enquireTasks);
                // let objTask = taskData.find((v) => v.TaskIdentity == Tasks);
                //console.log("here is the data for all task",objClient )

    

                // const taskDatas = Tasks !== undefined ? Tasks:
                // taskDatas.forEach((taskData) => {
                //     const tas = getTaskData(taskData);
                //     //console.log("task output",tas)
                // })
                
       
               //const verifiedDate =  verifiedOn != null ? new Date(verifiedOn).toLocaleDateString("en-GB") : "Unverified";
               
                //const dataps={lable:ID,value:channelName}

                const countID=x;      
                const datas = {
                  countID,
                  ID,
                  ClientIdentity:objClient.ClientIdentityi,
                  Clientnames:objClient.Clientnames,
                  clientabout:objClient.clientabout,
                  logoID:objClient.logoID,
                  logoUrl:objClient.logoUrl,
                  TasksData:enquireTasks,

                //   AssigneeEmail:objTask.AssigneeEmail,
                //   AssigneeID:objTask.AssigneeID,
                //   AssigneeName:objTask.AssigneeName,
                //   Subtasks:objTask.Subtasks,
                //   TaskIdentity:objTask.TaskIdentity,
                //   Taskcomplete:objTask.Taskcomplete,
                //   Tasknames:objTask.Tasknames,
                //   estimatedDays:objTask.estimatedDays,

                  kickoff,
                  Name,
                  //Client,
                  dueDate,
                  projectTeam,
                  Notes,
                  Category,
                  Complete,
                //   projectLeadId:dataProjectLead.projectLeadId,
                //   projectLeadEmail:dataProjectLead.projectLeadEmail,
                //   projectLeadName:dataProjectLead.projectLeadName,
                //   createdTime,           
                
                };
                //dropData.push(dataps);
                data.push(datas);
                //console.log("data...here we are" , data)
                x++;
              });

              
            setProjectData(data);
            setDispLoader("none");

            console.log("data...projectData" , data)
          } else {
            //errorNotification("Unable to Partner Tarrrifs list");
          }
        } catch (ex) {
          console.log({ ex });
          //errorNotification("Unable to fetch Biller list");
        }
      }

    useEffect(() => {
      fetchDataList();      
         
      
    }, [])
  
    
    async function fetchClientListByID(cid) {
      setDispLoader("block")
      try {
          const fetchDataResponses =  await fetchClientsByID(cid);
          const {data:fetchDataRes,status} = fetchDataResponses
          //const {records:fetchDataResponses} = fetchDataRes;

        //console.log("destructure",fetchDataRes)
        if (fetchDataRes) {
  
          
              const {createdTime,fields,id:ClientIdentities} = fetchDataRes;
              const {Name:Clientnamess,About:clientabouts,Logo} = fields;
              // //const clientsname = fields.Name;
              
              const LOGO = Logo!== undefined? Logo[0]:""
              
                  const logodata = LOGO
                  const{id:logoids,url:logolink} = logodata; 
              
                  const logoID = logoids!== undefined?logoids :"";
                  const logoUrl = logolink!== undefined?logolink :"";
                  const clientabout = clientabouts!== undefined?clientabouts :"";
                  const Clientnames = Clientnamess!== undefined?Clientnamess :"";
                  const ClientIdentityi = ClientIdentities!== undefined?ClientIdentities :"";
               
              let datas = {
                  logoID,
                  logoUrl,
                  clientabout,
                  Clientnames,
                  ClientIdentityi,          
              
              };
        //console.log("setClientDataID",datas)
             setClientDataID(datas);
           setDispLoader("none");
          // return datas;
        } else {
          
        }
      } catch (ex) {
        console.log({ ex });
        
      }
      
  }





    const handleProjectLead= (projectLead) => { 
        const {id:projectLeadId,email:projectLeadEmail,name:projectLeadName}=projectLead;

        let projectLeadData = {
            projectLeadId,projectLeadEmail,projectLeadName
        }
        return projectLeadData;

    }
    const handleProjectLeadNoData= () => { 
        let projectLeadId="";
        let projectLeadEmail ="";
        let projectLeadName="";


        let projectLeadData = {
            projectLeadId,projectLeadEmail,projectLeadName
        }
        return projectLeadData;

    }
    


    const getFunction = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")
      let objClient = functionsArray.find((v) => v.functionName == column.id);
      console.log("youuud",objClient.functionValue)
      const callFunc = objClient.functionValue;
      //console.log(callf);
      //const mike=window["callf"]();
      eval(callFunc)(input, projectData,rowValue,column);
     
        setDispLoader("none")
    }
    const getFunctiontasks = async( input, tascData,rowValue,column,ID ) => {
      setDispLoader("block")
      console.log("tascData tascData",input.TaskIdentity)

      if(input.TaskIdentity === undefined || input.TaskIdentity === "" ){
        console.log("absent")
        let objClient = functionsArrayPost.find((v) => v.functionName == column.id);
      //console.log("youuud",objClient.functionValue)
      const callFunc = objClient.functionValue;
      eval(callFunc)(input, projectData,rowValue,column,ID);

      }else if(input.TaskIdentity !== undefined || input.TaskIdentity !== ""){
        console.log("present")
      
      let objClient = functionsArray.find((v) => v.functionName == column.id);
      //console.log("youuud",objClient.functionValue)
      const callFunc = objClient.functionValue;
      eval(callFunc)(input, projectData,rowValue,column,ID);

      }

      
     
        setDispLoader("none")
    }
    
    const projectNameUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")

        let payload = {
          "records": [
              {
                  id: input.ID,
                  fields: {
                      Name:rowValue,
                      
                  }
                 
              }
          ]
      }
      //console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchProjectRecord(payload);
          
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const projectCategoryUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")

      console.log("category rowValue", rowValue)

      //   let payload = {
      //     "records": [
      //         {
      //             id: input.ID,
      //             fields: {
      //                 Name:rowValue,
                      
      //             }
                 
      //         }
      //     ]
      // }
      // //console.log("payload...",payload)
      

      // try {
      //     const { data: patchDataRes,status } = await patchProjectRecord(payload);
          
          
  
      //     if (status === 200) {
  
      //       successNotification("Updated successfully");
      //       fetchDataList();
      //     } else {
      //       errorNotification("Not updated successfully");
      //     }
      //   } catch (ex) {
      //     //errorNotification("Error creating Partner " + ex);
      //   }


      // setDispLoader("none")
    }

    const projectCompleteUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")

      ///console.log("complete rowValue", rowValue)
      const val = rowValue==="true"?true:false


        let payload = {
          "records": [
              {
                  id: input.ID,
                  fields: {
                      Complete:val,
                      
                  }
                 
              }
          ]
      }
      //console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchProjectRecord(payload);
          
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const projectKickOffUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")
      // console.log("this is the input to func",input)
      // console.log("this is the column to func",column)
      // console.log("this is the projectData to func",projectData)


        console.log("this is input",input)
        //console.log("this is projectdetails",projectDetails)

        let payload = {
          "records": [
              {
                  id: input.ID,
                  fields: {
                    "Kickoff date":rowValue,
                      
                  }
                 
              }
          ]
      }
      console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchProjectRecord(payload);
          
          // console.log("status",createPartnerResponse)
          // console.log("createPartnerResponse",createPartnerResponse)
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const projectDueDateUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")
 
        //console.log("this is input",input)

        let payload = {
          "records": [
              {
                  id: input.ID,
                  fields: {
                    "Due date":rowValue,
                      
                  }
                 
              }
          ]
      }
      //console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchProjectRecord(payload);
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const projectNotesUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")
 
        //console.log("this is input",input)

        let payload = {
          "records": [
              {
                  id: input.ID,
                  fields: {
                    "Notes":rowValue,
                      
                  }
                 
              }
          ]
      }
      console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchProjectRecord(payload);
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const clientAboutUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")
 
        //console.log("this is input",input)

        let payload = {
          "records": [
              {
                  id: input.ClientIdentity,
                  fields: {
                    "About":rowValue,
                      
                  }
                 
              }
          ]
      }
      console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchClientRecord(payload);
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const clientNameUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")
 
        //console.log("this is input",input)

        let payload = {
          "records": [
              {
                  id: input.ClientIdentity,
                  fields: {
                    "Name":rowValue,
                      
                  }
                 
              }
          ]
      }
      //console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchClientRecord(payload);
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const taskNameUpdate = async( input, projectData,rowValue,column,ID ) => {
      setDispLoader("block")
 
        console.log("this is input",input)

        let payload = {
          "records": [
              {
                  id: input.TaskIdentity,
                  fields: {
                    "Name":rowValue,
                      
                  }
                 
              }
          ]
      }
      console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchTasksRecord(payload);
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const taskCompleteUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")

      ///console.log("complete rowValue", rowValue)
      const val = rowValue==="true"?true:false


        let payload = {
          "records": [
              {
                  id: input.TaskIdentity,
                  fields: {
                    Completed:val,
                      
                  }
                 
              }
          ]
      }
      //console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchTasksRecord(payload);
          
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    function isNumeric(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }

    const taskEstimatedDaysUpdate = async( input, projectData,rowValue,column ) => {
      setDispLoader("block")

      //console.log("complete rowValue",  rowValue)
     // console.log("check this number",isNumeric(rowValue));
       const val = isNumeric(rowValue)===true?rowValue:1
       const dayValue = parseFloat(val, 10)


        let payload = {
          "records": [
              {
                  id: input.TaskIdentity,
                  fields: {
                    "Time estimate (days)":dayValue,
                      
                  }
                 
              }
          ]
      }
      console.log("payload...",payload)
      

      try {
          const { data: patchDataRes,status } = await patchTasksRecord(payload);
          
          
  
          if (status === 200) {
  
            successNotification("Updated successfully");
            fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
    }

    const taskNameCreate = async( input, projectData,rowValue,column,ID ) => {
      setDispLoader("block")
      
     

        let payload = {
          "records": [
              {
                
                  fields: {
                    "Name":rowValue,
                      
                  }
                 
              }
          ]
      }

      //console.log("payload...",payload)
      

      try {
          const { data: postDataRes } = await createTasksRecord(payload);
          //console.log("this is the patchDataRes right here",postDataRes)
          const {records:fetchDataResponses} = postDataRes;
          const {createdTime,fields,id:taskidentity} = fetchDataResponses[0];
          
          let payloadPost = {
            "records": [
                {
                  id: ID,
                    fields: {
                      "Tasks":[
                        taskidentity,                        
                    ],
                        
                    }
                   
                }
            ]
        }
        //console.log("this is the taskidentity right here",id)

        const { data: patchDataRes,status } = await patchProjectRecord(payloadPost);
  
          if (status === 200) {
  
            //successNotification("Updated successfully");
            //fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
     }

     const taskCompleteCreate = async( input, projectData,rowValue,column,ID ) => {
      setDispLoader("block")
      
      const val = rowValue==="true"?true:false

        let payload = {
          "records": [
              {
                
                  fields: {
                    Completed:val,
                      
                  }
                 
              }
          ]
      }

      //console.log("payload...",payload)
      

      try {
          const { data: postDataRes } = await createTasksRecord(payload);
          //console.log("this is the patchDataRes right here",postDataRes)
          const {records:fetchDataResponses} = postDataRes;
          const {createdTime,fields,id:taskidentity} = fetchDataResponses[0];
          
          let payloadPost = {
            "records": [
                {
                  id: ID,
                    fields: {
                      "Tasks":[
                        taskidentity,                        
                    ],
                        
                    }
                   
                }
            ]
        }
        //console.log("this is the taskidentity right here",id)

        const { data: patchDataRes,status } = await patchProjectRecord(payloadPost);
  
          if (status === 200) {
  
            //successNotification("Updated successfully");
            //fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
     }

     const taskEstimatedDaysCreate = async( input, projectData,rowValue,column,ID ) => {
      setDispLoader("block")
      
      const val = isNumeric(rowValue)===true?rowValue:1
      const dayValue = parseFloat(val, 10)

        let payload = {
          "records": [
              {
                
                  fields: {
                    "Time estimate (days)":dayValue,
                      
                  }
                 
              }
          ]
      }

      //console.log("payload...",payload)
      

      try {
          const { data: postDataRes } = await createTasksRecord(payload);
          //console.log("this is the patchDataRes right here",postDataRes)
          const {records:fetchDataResponses} = postDataRes;
          const {createdTime,fields,id:taskidentity} = fetchDataResponses[0];
          
          let payloadPost = {
            "records": [
                {
                  id: ID,
                  fields: {
                    "Tasks":[
                      taskidentity,                        
                  ],
                      
                  }
                   
                }
            ]
        }
        //console.log("this is the taskidentity right here",id)

        const { data: patchDataRes,status } = await patchProjectRecord(payloadPost);
  
          if (status === 200) {
  
            //successNotification("Updated successfully");
            //fetchDataList();
          } else {
            errorNotification("Not updated successfully");
          }
        } catch (ex) {
          //errorNotification("Error creating Partner " + ex);
        }


      setDispLoader("none")
     }


    const clientLogoUpdate = async( input, projectData,rowValue,column ) => {}
    const percivetabel = (tasks) => {
      const taskArrayData = tasks.TasksData !== ""? tasks.TasksData:[{Tasknames:"", TaskIdentity:"", AssigneeID:"", AssigneeEmail:"", AssigneeName:"", Subtasks:"", Taskcomplete:"", estimatedDays:""}];
      //const {Tasknames, TaskIdentity, AssigneeID, AssigneeEmail, AssigneeName, Subtasks, Taskcomplete, estimatedDays}=t;
      const d = []
     {taskArrayData.map(tas=>{
      //  let o = {
      //          tas.Tasknames,
      //          tas.TaskIdentity,
      //          tas.AssigneeID,
      //          tas.AssigneeEmail,
      //          tas.AssigneeName,
      //          tas.Subtasks,
      //          tas.Taskcomplete,
      //          tas.estimatedDays

      //  }

       //d.push(o)
       //console.log("taaas",tas)
       //console.log("tattttttttaas",taskArrayData)
       return d

       
     })}
      console.log("Tasknames",d)
       return (
        <BootstrapTable 
        striped
        hover
        keyField='countID'
        data={taskArrayData}
        columns ={tasksFields}
        cellEdit={ cellEditFactory({ mode: 'dbclick',
        blurToSave: true,
        beforeSaveCell: (taskArrayData,row,name, column) => { console.log("here we go",taskArrayData,"row",row, "column",column,"tasks",tasks.ID);getFunctiontasks(name,taskArrayData,row,column,tasks.ID)},
         //afterSaveCell: (oldValue, newValue, row,name, column) => { console.log("here we went through", "oldValue",oldValue, "newValue" ,newValue, "row",name, "column",column) }
         
         
         }) }
        />)
    }

    const expandRow = {
      onlyOneExpanding: true,
      renderer: projectFields => (
        percivetabel(projectFields)
      )
    };



  return (

    <div>
        <div style={{display:dispLoader}}><Loader/></div>
        <BootstrapTable
         striped
         hover
         keyField='countID'
         data={projectData}
         columns ={projectFields}
         expandRow={ expandRow }
         cellEdit={ cellEditFactory({ mode: 'dbclick',
         blurToSave: true,
         beforeSaveCell: (projectData,row,name, column) => { console.log("here we go",projectData,"row",row, "column",column);getFunction(name,projectData,row,column)},
         //afterSaveCell: (oldValue, newValue, row,name, column) => { console.log("here we went through", "oldValue",oldValue, "newValue" ,newValue, "row",name, "column",column) }
         
         
         }) }
         
         
        />
        
    </div>
  )
}

export default Airtable