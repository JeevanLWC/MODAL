import { LightningElement, api, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class PLD extends LightningElement {
         // ApI name for App Builder setup
@api recordId;
@api objectApiName;
@api optionVal;


@track objectInfo;
@track recordTypeIdVal;
@track openmodel = true;

ifields = [NAME_FIELD,REVENUE_FIELD, INDUSTRY_FIELD];
@wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
objectInfo;

accountObject = ACCOUNT_OBJECT;
myFields = [NAME_FIELD, PHONE_FIELD];

areDetailsVisible = false;
areDetailsVisible1 = true;
areDetailsVisible2 = true;
areDetailsVisible3 = false;

handleAccountCreated(){
    // Run code when account is created.
    this.selectedStep = 'Step3'
    this.areDetailsVisible = true;
    this.areDetailsVisible2 = true;
    this.areDetailsVisible3 = true;
    this.recordId = recordId.id;
  
}


get recordTypeId() {
    
// Returns a map of record type Ids
    
    var recordtypeinfo = this.objectInfo.data.recordTypeInfos;
    var uiCombobox = [];

    console.log("recordtype" + recordtypeinfo);
    
    for(var eachRecordtype in  recordtypeinfo)//this is to match structure of lightning combo box
    {
    if(recordtypeinfo.hasOwnProperty(eachRecordtype))
    uiCombobox.push({ label: recordtypeinfo[eachRecordtype].name, value: recordtypeinfo[eachRecordtype].name })
    }
    //console.log('uiCombobox' + JSON.stringify(uiCombobox));
    return uiCombobox;
}


changeHandler(event){
    this.optionVal=event.target.value;
   
}


handleChange(event) {
        // Returns a map of record type Ids
        const rtis = this.objectInfo.data.recordTypeInfos;
        this.recordTypeIdVal=(Object.keys(rtis).find(rti => rtis[rti].name === this.optionVal));
    
}

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: "Account created",
            message: "Record ID: " + event.detail.id,
            variant: "success"
        });
        this.dispatchEvent(evt);
      
    }


    openModal() {
        this.openmodel = true
    }
    
    closeModal() {
        this.openmodel = false
    }

   

@track selectedStep = 'Step1';
 
handleNext() {
    var getselectedStep = this.selectedStep;
    if(getselectedStep === 'Step1'){
        this.selectedStep = 'Step2';
    }
    else if(getselectedStep === 'Step2'){
        this.selectedStep = 'Step3';
    }
    else if(getselectedStep === 'Step3'){
        this.selectedStep = 'Step4';
    }

    const rtis = this.objectInfo.data.recordTypeInfos;
    this.recordTypeIdVal=(Object.keys(rtis).find(rti => rtis[rti].name === this.optionVal));  
    this.areDetailsVisible1 = false;
   
}

handlePrev() {
    var getselectedStep = this.selectedStep;
    if(getselectedStep === 'Step2'){
        this.selectedStep = 'Step1';
    }
    else if(getselectedStep === 'Step3'){
        this.selectedStep = 'Step2';
    }
    else if(getselectedStep === 'Step4'){
        this.selectedStep = 'Step3';
    }
}
  
handleFinish() {
    alert('Finished...');
    this.selectedStep = 'Step1';
}
  
selectStep1() {
    this.selectedStep = 'Step1';
}

selectStep2() {
    this.selectedStep = 'Step2';
}

selectStep3() {
    this.selectedStep = 'Step3';
    this.areDetailsVisible1 = false;
}

selectStep4() {
    this.selectedStep = 'Step4';
}

get isSelectStep4() {
    return this.selectedStep === "Step4";
}



}