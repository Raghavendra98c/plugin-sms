import React from "react";
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Modal.css';
import axios from 'axios';
import Swal from "sweetalert2";

export default class Modals extends React.Component {
     constructor(props) {

      console.log(props,"*****Modal.js")
      
        super(props);
        this.state = {
            show: false,
            show1:false,
            sms_value:"",
            phone_number:""
        }
        this.handleMessage=this.handleMessage.bind(this)
    }
   async componentDidMount(){
      let from=this.props.channel.source.attributes.from
      let phone_number=from.split(":")[1]
      console.log(phone_number,"*****phone_number")
      this.setState({phone_number})
    }

    handleModal=()=> {
      this.setState({ show:!this.state.show })
    }
    handleModal1=()=> {
     this.setState({show1:!this.state.show1 })
    }
    handleMessage=(e)=>{
   
    this.setState({sms_value:e.target.value})
    console.log(e.target.value)
     }

     
     sendSms(s_value,phone_number){  
      //console.log(s_value)
      console.log(this.state.message)
      let sms="Hello "+s_value
      // let from=props.channel.source.attributes.from
      //let phone_number=from.split(":")[1]
      //let sms="Hello" +this.state.sms_value
      
      axios.post('https://tumbleweed-penguin-7678.twil.io/outbound-sms',{

      content:sms,

       msisdn:phone_number

      }
  
  ).then(response =>{
        console.log(response)
        if(response.data.status === "success"){
          Swal.fire(
            "Good Job!",
            "You Clickked The Button!",
            "Success"
          )
        }
      }).catch(error=>{
        console.log(error)
        Swal.fire(
          "Error..!",
          "Something Went Wrong..!",
          "Error"
        )
      })
     }

     render() {
         return (
            <div>
                 <Button onClick={() => this.handleModal()}>Outbound SMS</Button>
                 <Modal  show={this.state.show} onHide={() => this.handleModal()}>
                     <Modal.Header closeButton></Modal.Header>
                    <Modal.Body>
                     
                        <textarea 
                          rows='2'
                          placeholder="Type Message"
                          value={this.state.message} 
                          onChange = {(e)=>this.handleMessage(e)} 
                         />

                         <br/><br/>
                        {/* <textarea rows='2' placeholder="Type Message" onChange={(e)=>this.setState(this.handleMessage({message:e.target.value}))} /><br/><br/> */}
                       {/* // <input value={this.state.message} onChange={this.handleMessage} /> */}
                        <Button
                          onClick={()=>this.sendSms(this.state.sms_value,this.state.phone_number)}>
                          SEND
                        </Button>

                        <Button
                         className="btn" onClick={() => this.handleModal1()}>
                         CANNED RESPONSE
                        </Button>

                        </Modal.Body>
                        <Modal 
                          className="modal-show"
                          show={this.state.show1} 
                          onHide={()=>this.handleModal1()} 
                          size='fullscreen' 
                        >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body></Modal.Body>

                        </Modal>
                 
             
                </Modal>
             </div>
         )
    }
 }





//  export default class Modals extends React.Component {
//   constructor(props) {
//      super(props);
//      this.state = {
//          show: false,
//          show1:false,
//          message:'',
//          submitting:false,
//          error:false
       
//      }
//   }
//   handleModal() {
//    this.setState({ show: !this.state.show })
// }
// handleModal1() {
//   this.setState({ show1: !this.state.show1 })
// }

// onHandleChange(event) {
//   const name = event.target.getAttribute('name');
//   this.setState({
//     message: { ...this.state.message, [name]: event.target.value }
//   });
  
// }
// //this.onHandleChange = this.onHandleChange.bind(this);

// onSubmit(event) {
//   event.preventDefault();
//   this.setState({ submitting: true });
//   fetch('https://tumbleweed-penguin-7678.twil.io/oubound-sms', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(this.state.message)
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.success) {
//         this.setState({
//           error: false,
//           submitting: false,
//           message: {
//             to: '',
//             body: ''
//           }
//         });
//       } else {
//         this.setState({
//           error: true,
//           submitting: false
//         });
//       }
//     });
// }


//   render() {
//       return (
//          <div>
//               <Button onClick={() => this.handleModal()}>Message</Button>
//               <Modal  show={this.state.show} onHide={() => this.handleModal()}>
//                   <Modal.Header closeButton></Modal.Header>
//                  <Modal.Body>
//                    <h3>{this.state.message}</h3>
//                      <textarea rows='2' placeholder="Type Message" value={this.state.message}
//             onChange={this.onHandleChange.bind(this)} /><br/><br/>
//                      {/* <textarea rows='2' placeholder="Type Message" onChange={(e)=>this.setState(this.handleMessage({message:e.target.value}))} /><br/><br/> */}
//                     {/* // <input value={this.state.message} onChange={this.handleMessage} /> */}
//                      <Button onSubmit={this.onSubmit.bind(this)}>SEND</Button>
//                      <Button className="btn" onClick={() => this.handleModal1()}>CANNED RESPONSE</Button>
//                      </Modal.Body>
//                      <Modal className="modal-show" show={this.state.show1} onHide={()=>this.handleModal1()} size='md-down' >
//                          <Modal.Header closeButton></Modal.Header>
//                          <Modal.Body></Modal.Body>

//                      </Modal>
              
          
//              </Modal>
//           </div>
//       )
//  }
// }
