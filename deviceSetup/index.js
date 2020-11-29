import React, { Component, Fragment } from "react";
import DeviceList from "../../../components/DeviceList/index";
// import IntlMessages from "Util/IntlMessages";
// import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";
import { Form } from 'react-bootstrap';

// import { Colxx, Separator } from "Components/CustomBootstrap";
// import BreadcrumbContainer from "Components/BreadcrumbContainer";
// import SimpleMap from 'Components/SimpleMap';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './index.css';
// import GoogleMap from "Components/GoogleMap";
// import Map from "../../components/Maps/maps";

// import CreateNewSite from "../../components/createNewSite/index";
import Process from "../../../components/ProcessForSetupDevice/index";
import AllocateDevice from "../../../components/AllocateDevice/index";
import TestDevice from '../TestDevice/index';
import { Mutation } from "react-apollo";
let count = 0;

export default class extends Component {

  state={
    createASiteCircle : "#03a9f4",
    setupDevicesCircle : "#9e9e9e",
    verifyDevicesCircle : "#9e9e9e",
    createEntitiesCircle : "#9e9e9e",
    registrationCompleteCircle : "#9e9e9e",

    createASiteText : "rgba(0, 0, 0, 0.87)",
    setupDevicesText : "rgba(0, 0, 0, 0.26)",
    verifyDevicesText : "rgba(0, 0, 0, 0.26)",
    createEntitiesText : "rgba(0, 0, 0, 0.26)",
    registrationCompleteText : "rgba(0, 0, 0, 0.26)",

    createASiteDisplay: "block",
    ProcessDisplay: "none",
    AllocateDeviceDisplay: "none",
    TestDeviceDisplay: "none",
    registrationCompleteDisplay: "none",

    metaTagHttpEquiv : "default-style",

    ContinueButtonDisplay :  "block",
    GoBackButtonDisplay :  "none",
    count : 1,

    verifyDevicesInBoxDisplay: "block",
    registerGatewaysDisplay: "none",
    placeAndPlugInGatewayDisplay: "none",
    waitForGatewayStabilizationDisplay: "none",

    verifyDevicesInBoxCircle: "#03a9f4",
    registerGatewaysCircle: "#9e9e9e",
    placeAndPlugInGatewayCircle: "#9e9e9e",
    waitForGatewayStabilizationCircle: "#9e9e9e",

    verifyDevicesInBoxText: "rgba(0, 0, 0, 0.87)",
    registerGatewaysText: "rgba(0, 0, 0, 0.26)",
    placeAndPlugInGatewayText: "rgba(0, 0, 0, 0.26)",
    waitForGatewayStabilizationText: "rgba(0, 0, 0, 0.26)",

    popUpWrapperDisplay: "none",
    popUpDisplay: "none",
    popUpNewEntityWrapperDisplay: "none",
    popUpNewEntityDisplay: "none",

    devicePageDisplay: "block",
    registrationPageDisplay: "none",
    facility: [],
    facilityName: "",
    facilityLocation: "",
    facilityContractPerson:  "",
    facilityEmail:  "",
    facilityAlterEmail:  "",
    country: "",
    state:  "",
    street:  "",
    zipcode:  "",
    oldFacilityMobile: "",
    oldFacilityAlterMobile: "",
    facilityMobile:  "",
    facilityAlterMobile:  "",
    facilityid: 1,
    deviceData: "",
    devicemonitorData: "",
    processData: "",
    searchedTitle: "",
    ifSearched: false,

  }

  deviceData = (deviceDataActive, devicemonitorActive) => {
    console.log(deviceDataActive);
    // this.setState({deviceData: deviceDataActive, devicemonitorData: devicemonitorActive})
    // onContinueButtonClicked(deviceDataActive, devicemonitorActive)
  }
  processData = (processActive) => {
    console.log(processActive);
    // this.setState({processData: processActive})
    // onContinueButtonClicked(processActive)
  }

  onContinueButtonClicked = (deviceval, devicemonitorval, processval) => {
    let newCount = this.state.count + 1;
      this.setState({count: newCount})
    // if(this.state.oldFacilityMobile != this.state.facilityMobile || this.state.oldFacilityAlterMobile != this.state.facilityAlterMobile) {
    //   console.log(this.state.oldFacilityMobile + " " + this.state.facilityMobile);
    //   console.log(this.state.oldFacilityAlterMobile + " " + this.state.facilityAlterMobile);
    //   this.setState({popUpWrapperDisplay: "block"});
    // }
    if(newCount === 2) {
      console.log("count " + this.state.count)
      if(this.state.oldFacilityMobile != this.state.facilityMobile || this.state.oldFacilityAlterMobile != this.state.facilityAlterMobile) {
        console.log(this.state.oldFacilityMobile + " " + this.state.facilityMobile);
        console.log(this.state.oldFacilityAlterMobile + " " + this.state.facilityAlterMobile);
        this.setState({popUpWrapperDisplay: "block", oldFacilityMobile: this.state.facilityMobile, oldFacilityAlterMobile: this.state.facilityAlterMobile});
      }
      else {
        newCount = 3;
        this.setState({count: newCount})
      }
    }

    if(newCount === 3){
      this.setState({setupDevicesCircle : "#03a9f4", setupDevicesText : "rgba(0, 0, 0, 0.87)", ContinueButtonDisplay :  "block", GoBackButtonDisplay :  "block"});
      this.setState({createASiteDisplay: "none",
      ProcessDisplay: "block",
      AllocateDeviceDisplay: "none",
      TestDeviceDisplay: "none",
      registrationCompleteDisplay: "none"});

      

      const query = JSON.stringify({
        query: `mutation MyMutation {
          update_deviothaptestbedv01_facilitym_by_pk(pk_columns: {facilityname: "${this.state.facilityName}"}, _set: {facilitymobile: "${this.state.facilityMobile}", facilityaltermobile: "${this.state.facilityAlterMobile}"})  {
            facilitymobile
            facilityaltermobile
          }
        }
        `
      });

      const response = fetch("http://157.245.104.15/v1/graphql", {
        headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
        method: 'POST',
        body: query,
      });

    }
    else if(newCount === 4){
      this.setState({verifyDevicesCircle : "#03a9f4", verifyDevicesText : "rgba(0, 0, 0, 0.87)", ContinueButtonDisplay :  "block", GoBackButtonDisplay :  "block"});
      this.setState({createASiteDisplay: "none",
      ProcessDisplay: "none",
      AllocateDeviceDisplay: "block",
      TestDeviceDisplay: "none",
      registrationCompleteDisplay: "none"});
    }
    else if(newCount === 5){
      this.setState({createEntitiesCircle : "#03a9f4", createEntitiesText : "rgba(0, 0, 0, 0.87)", ContinueButtonDisplay :  "block", GoBackButtonDisplay :  "block"});
      this.setState({createASiteDisplay: "none",
      ProcessDisplay: "none",
      AllocateDeviceDisplay: "none",
      TestDeviceDisplay: "block",
      registrationCompleteDisplay: "none"});

      const deviceData = JSON.parse(localStorage.getItem("DeviceData"));
      const processData = JSON.parse(localStorage.getItem("ProcessData"));
      console.log(deviceData[0].devicemacid);

      // const query = JSON.stringify({
      //   query: `mutation MyMutation {
      //     insert_deviothaptestbedv01_device_allocation(objects: {iddevicesetupm: ${JSON.parse(localStorage.getItem("DeviceData")).iddevice}, devicesetuperpid: ${JSON.parse(localStorage.getItem("DeviceData")).devicemacid}, devicesetuptype: ${JSON.parse(localStorage.getItem("DeviceData")).devicetype}, devicesetupuom: ${JSON.parse(localStorage.getItem("DeviceData")).deviceuom}, devicesetupbaseunit: ${JSON.parse(localStorage.getItem("DeviceData")).devicebaseunit}, devicesetupconvertunit: ${JSON.parse(localStorage.getItem("DeviceData")).deviceconvertunit}, devicesetupprocessid: ${JSON.parse(localStorage.getItem("ProcessData")).idprocessm}, devicesetupfacilityid: ${this.state.facilityid} }) {
      //       returning {
      //         iddevicesetupm
      //         devicesetuperpid
      //         devicesetuptype
      //         devicesetupuom
      //         devicesetupbaseunit
      //         devicesetupconvertunit
      //         devicesetupprocessid
      //         devicesetupfacilityid
      //       }
      //     }
      //   }
      //   `
      // });

      // const response = fetch("http://157.245.104.15/v1/graphql", {
      //   headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
      //   method: 'POST',
      //   body: query,
      // });

      const query = JSON.stringify({
        query: `mutation MyMutation {
          insert_deviothaptestbedv01_device_allocation(objects: {
            iddevicesetupm: ${deviceData[0].iddevice},
            devicesetuperpid: "${deviceData[0].devicemacid}",
            devicesetuptype: "${deviceData[0].devicetype}",
            devicesetupuom: "${deviceData[0].deviceuom}",
            devicesetupcompanyid: "${deviceData[0].companyid}",
            devicesetupfacilityid: "${this.state.facilityid}",
            devicesetupprocessid: ${processData[0].idprocessm},
          }) {
            returning {
              iddevicesetupm
              devicesetuperpid
              devicesetuptype
              devicesetupuom
              devicesetupcompanyid
              devicesetupfacilityid
              devicesetupprocessid
            }
          }
        }
        `
      });

      const response = fetch("http://157.245.104.15/v1/graphql", {
        headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
        method: 'POST',
        body: query,
      });

      // const query = JSON.stringify({
      //   query: `mutation MyMutation {
      //     insert_deviothaptestbedv01_test_table(objects: {testcolumn1: 150, testcolumn2: 150}) {
      //       returning {
      //         testcolumn2
      //         testcolumn1
      //       }
      //     }
      //   }
      //   `
      // });

      // const response = fetch("http://157.245.104.15/v1/graphql", {
      //   headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
      //   method: 'POST',
      //   body: query,
      // });
    }
    else if(newCount === 6){
      this.setState({registrationCompleteCircle : "#03a9f4", registrationCompleteText : "rgba(0, 0, 0, 0.87)", ContinueButtonDisplay :  "none", GoBackButtonDisplay :  "none", metaTagHttpEquiv : "refresh"});
      this.setState({createASiteDisplay: "none",
      ProcessDisplay: "none",
      AllocateDeviceDisplay: "none",
      TestDeviceDisplay: "none",
      registrationCompleteDisplay: "block"});
    }

  }
  onGoBackButtonClicked = () => {
    let newCount = this.state.count - 1;
    this.setState({count: newCount});

    if(newCount === 2){
      this.setState({setupDevicesCircle : "#9e9e9e", setupDevicesText : "rgba(0, 0, 0, 0.26)", ContinueButtonDisplay :  "block", GoBackButtonDisplay :  "none"});
      this.setState({createASiteDisplay: "block",
      ProcessDisplay: "none",
      AllocateDeviceDisplay: "none",
      TestDeviceDisplay: "none",
      registrationCompleteDisplay: "none"});
    }
    else if(newCount === 3){
      this.setState({verifyDevicesCircle : "#9e9e9e", verifyDevicesText : "rgba(0, 0, 0, 0.26)", ContinueButtonDisplay :  "block", GoBackButtonDisplay :  "block"});
      this.setState({createASiteDisplay: "none",
      ProcessDisplay: "block",
      AllocateDeviceDisplay: "none",
      TestDeviceDisplay: "none",
      registrationCompleteDisplay: "none"});
    }
    else if(newCount === 4){
      this.setState({createEntitiesCircle : "#9e9e9e", createEntitiesText : "rgba(0, 0, 0, 0.26)", ContinueButtonDisplay :  "block", GoBackButtonDisplay :  "block"});
      this.setState({createASiteDisplay: "none",
      ProcessDisplay: "none",
      AllocateDeviceDisplay: "block",
      TestDeviceDisplay: "none",
      registrationCompleteDisplay: "none"});
    }
    else if(newCount === 5){
      this.setState({registrationCompleteCircle : "#9e9e9e", registrationCompleteText : "rgba(0, 0, 0, 0.26)", ContinueButtonDisplay :  "block", GoBackButtonDisplay :  "block"});
      this.setState({createASiteDisplay: "none",
      ProcessDisplay: "none",
      AllocateDeviceDisplay: "none",
      TestDeviceDisplay: "block",
      registrationCompleteDisplay: "none"});
    }
  }

  onFacilityListClicked = (e) => {
    var selectBoxInAddNewSite = document.getElementById("selectBoxInAddNewSite");
    var selectedValue = selectBoxInAddNewSite.options[selectBoxInAddNewSite.selectedIndex].value;

    this.state.facility.map((item,pos) => {
      if(e.target.value === item.facilityname) {
        this.setState({
          facilityName: item.facilityname,
          facilityLocation: item.facilitylocation,
          facilityContractPerson: item.facilitycontractperson,
          facilityEmail: item.facilityemail,
          facilityAlterEmail: item.facilityalteremail,
          state: item.state,
          country: item.country,
          street: item.street,
          zipcode: item.zipcode,
          oldFacilityMobile: item.facilitymobile,
          oldFacilityAlterMobile: item.facilityaltermobile,
          facilityMobile: item.facilitymobile,
          facilityAlterMobile: item.facilityaltermobile,
          facilityid: item.idfacilitym,
        })
        if(item.street == null)
        this.setState({street: "N/A"})
        if(item.zipcode == null)
        this.setState({zipcode: "N/A"})
        if(item.state == null)
        this.setState({state: "N/A"})
        if(item.country == null)
        this.setState({country: "N/A"})
        if(item.facilitymobile == null)
        this.setState({facilityMobile: ""})
        if(item.facilityaltermobile == null)
        this.setState({facilityAlterMobile: ""})
      }
    })
  }

  onInputFieldSubmit = (e) => {
    e.preventDefault();
    // this.setState({facilityMobile: e.target.value})
    // console.log(e.target.value);
    console.log(this.state.facilityMobile);
  }
  onInputFieldChange = (e) => {
    console.log(e.target);
    this.setState({facilityMobile: e.target.value});
  }
  onInputFieldSubmit2 = (e) => {
    e.preventDefault();
    // this.setState({facilityMobile: e.target.value})
    console.log(this.state.facilityAlterMobile);
  }
  onInputFieldChange2 = (e) => {
    console.log(e.target);
    this.setState({facilityAlterMobile: e.target.value});
  }
  closeDeviceDetailsPopUp = () => {
    this.setState({popUpWrapperDisplay: "none", facilityMobile: this.state.oldFacilityMobile, facilityAlterMobile: this.state.oldFacilityAlterMobile});
  }

  onSearchBarSubmit = (e) => {
    e.preventDefault();
  }
  onInputSubmit = (e) => {
    // console.log(e.target.value);
    this.setState({searchedTitle: e.target.value, ifSearched: true});
  }
  callBackFunction = (childData1,childData2) => {
    this.setState({devicePageDisplay: childData1, registrationPageDisplay: childData2});
  }

  // deviceData = (deviceDataActive, devicemonitorActive) => {
  //   console.log(deviceDataActive);
  //   this.setState({deviceData: deviceDataActive, devicemonitorData: devicemonitorActive})
  //   onContinueButtonClicked(deviceDataActive, devicemonitorActive)
  // }
  // processData = (processActive) => {
  //   console.log(processActive);
  //   this.setState({processData: processActive})
  //   onContinueButtonClicked(processActive)
  // }

  componentDidMount() {
    fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
              deviothaptestbedv01_facilitym {
                idfacilitym
                facilityname
                facilitycontractperson
                facilityemail
                facilityalteremail
                facilitylocation
                facilitycountry
                facilitystate
                facilitystreet
                facilityzipcode
                facilitymobile
                facilityaltermobile
                facilitylatitude
                facilitylongitude
                }
              }`})

        })
        .then(res=>res.json())
        .then(data=>{
            const Reqdata=data.data.deviothaptestbedv01_facilitym;
            this.setState({facility: Reqdata});
            count++;
            if(count === 1)
            {
              this.setState({
                facilityName: Reqdata[0].facilityname,
                facilityContractPerson: Reqdata[0].facilitycontractperson,
                facilityEmail: Reqdata[0].facilityemail,
                facilityAlterEmail: Reqdata[0].facilityalteremail,
                facilityLocation: Reqdata[0].facilitylocation,
                state: Reqdata[0].facilitystate,
                country: Reqdata[0].facilitycountry,
                street: Reqdata[0].facilitystreet,
                zipcode: Reqdata[0].facilityzipcode,
                oldFacilityMobile: Reqdata[0].facilitymobile,
                oldFacilityAlterMobile: Reqdata[0].facilityaltermobile,
                facilityMobile: Reqdata[0].facilitymobile,
                facilityAlterMobile: Reqdata[0].facilityaltermobile,
                facilityid: Reqdata[0].idfacilitym,
              });
              if(Reqdata[0].facilityalteremail == null)
              this.setState({facilityAlterEmail: "N/A"})
              if(Reqdata[0].street == null)
              this.setState({street: "N/A"})
              if(Reqdata[0].state == null)
              this.setState({zipcode: "N/A"})
              if(Reqdata[0].zipcode == null)
              this.setState({state: "N/A"})
              if(Reqdata[0].country == null)
              this.setState({country: "N/A"})
            }
              });

  }

  render() {

  //   fetch("http://157.245.104.15/v1/graphql",{
  //     method: "POST",
  //     headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
  //     body:JSON.stringify({query:`{
  //       mutation MyMutation {
  //         insert_deviothaptestbedv01_test_table(objects: {testcolumn1: 20, testcolumn2: 20}) {
  //           affected_rows
  //           returning {
  //             testcolumn1
  //             testcolumn2
  //           }
  //         }
  //       }
  //       }`})

  // })
  // .then(
  //     console.log("posted again")
  //     );
              
    return (
      <Fragment>
        {/* <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.third-single" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row> */}
        {
          /*Enjoy!*/
          // <CreateNewSite/>
          <div>
            <div style={{display: this.state.devicePageDisplay}}>
              <div style={{display: "flex", justifyContent: "space-between", width: "90vw"}}>
                <div>
                  <h2>Devices</h2>
                </div>
                <div>
                  <Form style={{marginRight: "50px"}}>
                    <Form.Control placeholder="Type MacId to Search" onChange={this.onInputSubmit}/>
                  </Form>
                </div>
              </div>
              <div style={{margin: "-215px"}}>
                <DeviceList searchedItem = {this.state.searchedTitle} ifSearched = {this.state.ifSearched} deviceDisplay = {this.callBackFunction}/>
              </div>
            </div>

          <div style={{display: this.state.registrationPageDisplay}} class="registration-page">
  
     {/* //Registration Progress// */}
              <div class="flow">
  
                <div style={{ flex: "0 0 auto" }}>
                  <span class="individual-flow">
                    <span style={{paddingRight: "8px" }}>
                      <svg style={{color: this.state.createASiteCircle, fill: this.state.createASiteCircle}} class="flow-svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" ></circle>
                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff" >1</text>
                      </svg>
                    </span>
                    <span style={{color: this.state.createASiteText}}>Facility</span>
                  </span>
                </div>
  
                <div class="flow-line">
                  <span class="flow-line-styling"></span>
                </div>
  
                <div style={{ flex: "0 0 auto", marginLeft: "-6px" }}>
                  <span class="individual-flow">
                    <span style={{paddingRight: "8px" }}>
                      <svg style={{color: this.state.setupDevicesCircle, fill: this.state.setupDevicesCircle}} class="flow-svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" ></circle>
                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff" >2</text>
                      </svg>
                    </span>
                    <span style={{color: this.state.setupDevicesText}}>Process</span>
                  </span>
                </div>
  
                <div class="flow-line">
                  <span class="flow-line-styling"></span>
                </div>
  
                <div style={{ flex: "0 0 auto", marginLeft: "-6px" }}>
                  <span class="individual-flow">
                    <span style={{paddingRight: "8px" }}>
                      <svg style={{color: this.state.verifyDevicesCircle, fill: this.state.verifyDevicesCircle}} class="flow-svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" ></circle>
                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff" >3</text>
                      </svg>
                    </span>
                    <span style={{color: this.state.verifyDevicesText}}>Allocate Devices</span>
                  </span>
                </div>
  
                <div class="flow-line">
                  <span class="flow-line-styling"></span>
                </div>
  
                <div style={{ flex: "0 0 auto", marginLeft: "-6px" }}>
                  <span class="individual-flow">
                    <span style={{paddingRight: "8px" }}>
                      <svg style={{color: this.state.createEntitiesCircle, fill: this.state.createEntitiesCircle}} class="flow-svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" ></circle>
                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff" >4</text>
                      </svg>
                    </span>
                    <span style={{color: this.state.createEntitiesText}}>Test Device</span>
                  </span>
                </div>
  
                {/* <div class="flow-line">
                  <span class="flow-line-styling"></span>
                </div>
  
                <div style={{ flex: "0 0 auto", marginLeft: "-6px" }}>
                  <span class="individual-flow">
                    <span style={{paddingRight: "8px" }}>
                      <svg style={{color: this.state.registrationCompleteCircle, fill: this.state.registrationCompleteCircle}} class="flow-svg" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" ></circle>
                        <text x="12" y="16" textAnchor="middle" fontSize="12" fill="#fff" >5</text>
                      </svg>
                    </span>
                    <span style={{color: this.state.registrationCompleteText}}>Registration Complete</span>
                  </span>
                </div> */}
  
              </div>
  
      {/* //progress button// */}
              <div style={{minHeight: "36px"}}>
  
                <div class="progress-stepButton-left">
                  <div class="progress-button-wrapper">
                    <button style={{display: this.state.GoBackButtonDisplay}} onClick={this.onGoBackButtonClicked} class="progress-button" tabIndex="0">
                      <div class="button-styling">
                        <svg class="button-styling-svg" viewBox="0 0 24 24" >
                          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path>
                        </svg>
                        <span class="button-text">Go Back</span>
                      </div>
                    </button>
                  </div>
                </div>
  
                <div class="progress-stepButton-right">
                  <div class="progress-button-wrapper">
                    <button style={{display: this.state.ContinueButtonDisplay}} onClick={this.onContinueButtonClicked} class="progress-button" tabIndex="0">
                      <div class="button-styling">
                        <svg class="button-styling-svg" viewBox="0 0 24 24" >
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                        </svg>
                        <span class="button-text">Continue</span>
                      </div>
                    </button>
                  </div>
                </div>
  
              </div>
  {/* Device Setup      */}
              <div style={{display: this.state.createASiteDisplay, marginTop: "5px"}}>
              <div class="new-site-page-title"><span style={{fontSize: "22px", fontWeight: "600"}}>Facilites Listed</span></div>
                <div class="new-site-page-main">
  
                <div class="new-site-page-inputs">
                  <div style={{paddingBottom: "8px", color: "#212121" }}>
                    <div class="new-site-page-card-text">
                        <div class="wrapper">
                            <label class="item-wrapper">Name</label>
                            <select id="selectBoxInAddNewSite" onChange={this.onFacilityListClicked}  class="facility">
                              {
                                this.state.facility.map((item,pos) => {
                                  return (
                                    <option key={pos}> {item.facilityname} </option>
                                  )
                                })
                              }
                            </select>
                            <div class="input-field-underline">
                                <hr aria-hidden="true" class="under-line1" />
                                <hr aria-hidden="true" class="under-line2" />
                            </div>
                        </div>
                      <div class="wrapper">
                          <label class="item-wrapper">Contract Person</label>
                          <input class="input-field" type="text" value={this.state.facilityContractPerson} readOnly/>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>
                      <div class="wrapper">
                          <label class="item-wrapper">Email</label>
                          <input class="input-field" type="text" value={this.state.facilityEmail} readOnly/>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>
                      <div class="wrapper">
                          <label class="item-wrapper">Alt. Email</label>
                          <input class="input-field" type="text" value={this.state.facilityAlterEmail} readOnly/>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>
                      <div class="wrapper">
                          <label class="item-wrapper">Street</label>
                          <input class="input-field" type="text" value={this.state.street} readOnly/>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>
                      <div class="wrapper">
                          <label class="item-wrapper">Zipcode</label>
                          <input class="input-field" type="text" value={this.state.zipcode} readOnly/>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>
                      <div class="wrapper">
                          <label class="item-wrapper">State</label>
                          <input class="input-field" type="text" value={this.state.state} readOnly/>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>
                      <div class="wrapper">
                          <label class="item-wrapper">Country</label>
                          <input class="input-field" type="text" value={this.state.country} readOnly/>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="new-site-page-inputs2">
                  <div style={{paddingBottom: "8px", color: "#212121" }}>
                    <div class="new-site-page-card-text">
                      <div class="wrapper">
                          <label class="item-wrapper">Contact Number</label>
                          <form onSubmit={this.onInputFieldSubmit}>
                            <input onChange={this.onInputFieldChange} class="input-field" type="text" value={this.state.facilityMobile}/>
                          </form>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>
                      <div class="wrapper">
                          <label class="item-wrapper">Alt. Contact Number</label>
                          <form onSubmit={this.onInputFieldSubmit2}>
                            <input onChange={this.onInputFieldChange2} class="input-field" type="text" value={this.state.facilityAlterMobile}/>
                          </form>
                          <div class="input-field-underline">
                              <hr aria-hidden="true" class="under-line1" />
                              <hr aria-hidden="true" class="under-line2" />
                          </div>
                      </div>

                    </div>
                  </div>
                </div>

                </div>
              </div>

              <div style={{display: this.state.ProcessDisplay, marginTop: "5px"}}>
                <Process processData={this.processData}/>  
              </div>

              <div style={{display: this.state.AllocateDeviceDisplay, marginTop: "5px"}}>
                {/* <AllocateDevice facilityid ={this.state.facilityid} allocateDeviceData={this.deviceData}/> */}
              </div>
              <div style={{display: this.state.TestDeviceDisplay, marginTop: "15px"}}>
                <TestDevice />
              </div>

              <div style={{display: this.state.popUpWrapperDisplay}} onClick={this.closeDeviceDetailsPopUp} class="device-details-popUpWrapper">
                <div class="device-details-popUp">
                  <div><h3 style={{textAlign: "center"}}>Do you wish to make those changes ?</h3></div>
                  <div style={{minHeight: "36px"}}>
  
                <div class="progress-stepButton-left">
                  <div class="progress-button-wrapper">
                    <button onClick={this.closeDeviceDetailsPopUp} class="progress-button" tabIndex="0">
                      <div class="button-styling">
                        <svg class="button-styling-svg" viewBox="0 0 24 24" >
                          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"></path>
                        </svg>
                        <span class="button-text">Go Back</span>
                      </div>
                    </button>
                  </div>
                </div>
  
                <div class="progress-stepButton-right">
                  <div class="progress-button-wrapper">
                    <button onClick={this.onContinueButtonClicked} class="progress-button" tabIndex="0">
                      <div class="button-styling">
                        <svg class="button-styling-svg" viewBox="0 0 24 24" >
                          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
                        </svg>
                        <span class="button-text">Continue</span>
                      </div>
                    </button>
                  </div>
                </div>
  
              </div>
                </div>
              </div>

            </div></div>
        }
      </Fragment>
      
    );
  }
}

{/* <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/third-singleCopy`} />
        <Route path={`${match.url}/third-singleCopy`} component={thirdSingleCopy} />
        <Redirect to="/error" />
    </Switch> */}



//     import React, { Component } from 'react';
// import { HorizontalBar } from 'react-chartjs-2';
// require('isomorphic-fetch');
// const data = {
// 	labels: ['January', 'February', 'March', 'April', 'May', 'June'],
// 	datasets: [
// 		{
// 			label: 'My First dataset',
// 			backgroundColor: 'rgba(255,99,132,0.2)',
// 			borderColor: 'rgba(255,99,132,1)',
// 			borderWidth: 1,
// 			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
// 			hoverBorderColor: 'rgba(255,99,132,1)',
// 			// data: []
// 		}
// 	]
// };