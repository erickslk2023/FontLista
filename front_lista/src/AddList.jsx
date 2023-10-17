import { useEffect, useState  } from "react";

const url = 'http://localhost:3000/api/list';

export const AddList = () => {


    const [boolEdit, setBoolEdit] = useState(false);
    const [idEdit ,setIdEdit] = useState(0);

    const [dataForm, setDataForm] = useState({
        nombre: "",
        apellido: ""
    });


    const formChange = (event)=>{
        const {name, value} = event.target;
        setDataForm( previo =>({...previo, [name]:value}) );
    };
    
    const formSubmit = async()=>{
    
        event.preventDefault();
    
        if (boolEdit){
            await editData();
        }else{
            await createData();
        }
        

        setDataForm({
    
            nombre: "",
            apellido: ""
    
        });
    
        setBoolEdit(false);
        setIdEdit(0);
        getDataTask();

    }
    

    //Información del Reporte 

    const [getTasks , setTasks] = useState([]);
    
    const getDataTask = async ()=>{

        const result = await fetch(url);
        const resultData = await result.json();
        setTasks(resultData);
        

    }

    useEffect(()=>{

        getDataTask();

    }, [])

    // Create Task 

    const createData= async()=>{

        const result = await fetch(url, 
            {
                method : "POST", 
                body : JSON.stringify(dataForm),
                headers : {
                    'Content-Type': 'application/json'
                }
            });
    
        const resultJson = await result.json();
        console.log(resultJson);

    }
    useEffect(()=>{

        getDataTask();

    }, [])

    //Delete Task

    const deleteData = async(id = 0)=>{

        const result = await fetch(url+"/"+id, {

            method : "DELETE"

        });

        const resultData = await result.json();
        getDataTask();
    }

    // Edit Task

    const setDataFormEdit= (task)=>{

        setBoolEdit(true);
        setIdEdit(task.id);
        setDataForm({

            nombre : task.nombre, 
            apellido : task.apellido

        });

    }

    const editData =  async()=>{

        const result = await fetch(url+"/"+idEdit, 
            {
                method : "PUT", 
                body : JSON.stringify(dataForm),
                headers : {
                    'Content-Type': 'application/json'
                }
            });
    
        const resultJson = await result.json();
        
    }



    return (
        <>
            <div className="container">
                <h1>Manage Person List</h1>
                <form onSubmit={formSubmit}>
                    <div className="form-floating mb-3">
                        <input className="form-control" value={dataForm.nombre}  name="nombre" onChange={formChange} />
                        <label >Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <textarea className="form-control" value={dataForm.apellido} name="apellido" onChange={formChange}></textarea>
                        <label >Last Name</label>
                    </div>

                    <button type="submit" className="btn btn-primary mb-3">{boolEdit ? 'Edit' : 'Create' }</button>
                </form>

                <h2>List</h2>
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>Nombre</td>
                            <td>Apellido</td>
                        
                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            
                            getTasks.map( (x)=>(

                                <tr key={x.id}>
                                    <td>{x.id}</td>
                                    <td>{x.nombre}</td>
                                    <td>{x.apellido}</td>
                                 
                                    <td><button className="btn btn-warning" onClick={()=>setDataFormEdit(x)  } >Edit</button></td>

                                    <td><button className="btn btn-danger" onClick={()=>  deleteData(x.id) }  >Delete</button></td>
                                </tr>
                                
                            ))

                        }
                    </tbody>
                </table>


            </div>

            

        </>

    )
}