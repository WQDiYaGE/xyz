import React, {useState, useRef} from "react";
import axios from "axios";

function AddItem() {
  const [name, setName] = useState("");
  
  const nameInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const addItem = async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData();

      formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);

      await axios.post(
        "http://localhost:5000/api/v1/items", 
        formData
      );

      nameInputRef.current.value = null;
      fileInputRef.current.value = null;
    }
    catch(error) {
      console.log(error);
    }
  };
  return (
    <>
        <div class="container">
            <div class= "m-2">
                <table class="table table-bordered">
                    <tbody>
                        <tr>    
                            <td class= "mx-2">Module Name</td>
                            <td>
                                <input type="text" class="mx-2" id="formGroupExampleInput" ref={nameInputRef} onChange={(e) => setName(e.target.value)}/>
                            </td>        
                        </tr>
                        <tr>    
                            <td class= "mx-2">Title</td>
                            <td>
                                <input type="text" class="mx-2" id="formGroupExampleInput" ref={nameInputRef} onChange={(e) => setName(e.target.value)}/>
                            </td>     
                        </tr>
                        <tr>
                            <td class= "mx-2">Due Date</td>
                            <td>
                                <input type="text" class="mx-2" id="formGroupExampleInput" ref={nameInputRef} onChange={(e) => setName(e.target.value)}/>
                            </td>         
                        </tr>
                        <tr>
                            <td class= "mx-2">Submitted Date</td>
                            <td>
                                <input type="text" class="mx-2" id="formGroupExampleInput" ref={nameInputRef} onChange={(e) => setName(e.target.value)}/>
                            </td> 
                        </tr>
                        <tr>
                            <td class= "mx-2">Submission Status</td>
                            <td>
                                <input type="text" class="mx-2" id="formGroupExampleInput" ref={nameInputRef} onChange={(e) => setName(e.target.value)}/>
                            </td> 
                        </tr>
                </tbody>
            </table>
            </div>

        <form>
            <div class="form-group">
                
                <input type="file" class="-file mx-5" id="exampleFormControlFile1" ref={fileInputRef}/>

                <button type="button" class="btn btn-primary mx-5" onClick={addItem}>Upload</button>
                <button type="button" class="btn btn-primary" onClick={addItem}>Remove</button>
            </div>
        </form>
        </div>
    </>
  );
};

export default AddItem;
