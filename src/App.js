import React from "react";
import { useState,useRef,useEffect } from "react"; 
import background from "./img1.png"; 
 
function App() {
   
  const [promotion_nm, setpromotion_nm] = useState([]);
  const dragitem = useRef(null);
  const dragoveritem = useRef(null); 

  useEffect(() => {   
    if(localStorage.getItem('items'))
    {
      //
    }
    else
    { 
      const fetchData = async () => {
        const response = await fetch("https://run.mocky.io/v3/69da5245-8f5d-45dd-9edd-3d6b36baa811", {
       
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          }
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects 
        localStorage.setItem('items', JSON.stringify(json)); 
      }
      // call the function
      fetchData() 
    }  
  }, []);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'));
    if (items) {
      setpromotion_nm(items);
    }
  }, []);

 
  const handleitem=()=>{
    let _promotion_nm = [...promotion_nm]

    const dragitemcontetnt = _promotion_nm.splice(dragitem.current-1,1)[0]
    _promotion_nm.splice(dragoveritem.current-1,0,dragitemcontetnt)
    dragitem.current=null
    dragoveritem.current=null;
    setpromotion_nm(_promotion_nm)
    localStorage.setItem('items', JSON.stringify(_promotion_nm));
  }
 
  return (
    <> 
      <div className="container text-center container-margin">
        <div className="row">
          <div className="col-12">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item margin-right1" role="presentation">
                <button className="nav-link active shadow-lg bg-body-tertiary rounded" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">All Promotions</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link shadow-lg bg-body-tertiary rounded" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">New Customers  You Can drag it</button>
              </li>
            </ul>
  

            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active container-margin" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                <div className="container text-center">
                 
                  <div className="row">
                 
                  {
          
                      promotion_nm.map((p_nm,i)=>( 
                      <div className="col-md-4" key={i}>
                      <div className="card abcd" draggable="true" onDragStart={(e)=>dragitem.current=i+1}
                      onDragEnter={(e)=>dragoveritem.current=i+1}
                      onDragEnd={handleitem}
                      onDragOver={(e)=>e.preventDefault()}
                     >
                        <h5 className="card-header">{p_nm.name}</h5>
                        <div className="card-body">
                          <p className="card-text">{p_nm.content}</p> 
                          <button type="button" className="btn btn-primary button-clor">Explore</button>
                        </div>
                      </div>
                    </div>
                  ))
                
                } 
                    
                  </div>
                </div>
              </div>

              <div className="tab-pane fade container-margin" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0"> 
            <table className="table table-warning table-sm">
              <tbody>
                  <tr> 
                     <td style={{textAlign: "left"}}> 
                          <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                              <span className="visually-hidden">Loading...</span>
                          </div>
                          <div className="spinner-grow text-secondary" style={{width: "1.4rem",height: "1.4rem"}} role="status">
                              <span className="visually-hidden">Loading...</span>
                          </div>
                          <div className="spinner-grow spinner-grow-lg text-success" style={{width:"1.8rem", height:"1.8rem"}} role="status">
                              <span className="visually-hidden">Loading...</span>
                          </div>
                     </td>
                  </tr>
                  <tr>
                    <td> <center><img src={background} className="card-img-top" alt="Promotion Website" style={{height:"50%",width:"50%"}}></img></center></td>
                  </tr>
                  <tr>
                    <td><h1> Promotion Title </h1></td>
                  </tr>
                  <tr>
                    <td colSpan="2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed eligendi iure, doloremque provident, reiciendis quos optio eius placeat temporibus commodi obcaecati necessitatibus labore. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, illo ab error doloribus perferendis iure magnam ea. Molestias laborum voluptatibus consequatur reiciendis magni! Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam commodi aspernatur provident deserunt est temporibus ducimus, quis repellendus hic, accusantium vero, delectus quos.</td> 
                  </tr>
                  <tr>
                      <td>
                          <button className="btn button-clor-ter" type="button"><b>Tearms & Conditions</b></button>
                          <button className="btn button-clor-jn" type="button"><b>Join Now</b></button>
                      </td>
                    </tr>
                </tbody>
            </table> 
            </div>


            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default App;
