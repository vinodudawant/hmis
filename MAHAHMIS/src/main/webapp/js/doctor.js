//Add By Amol Saware for Today's Date
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10){
	    dd='0'+dd;
	} 
	if(mm<10){
	    mm='0'+mm;
	} 
	var todaysDate = dd+'-'+mm+'-'+yyyy;
//End

var count = 1;
var hour = 9;
var trCount = 1;
var docNameTemplate = "<select	style='width: 90%;font-size: 11px;border-width: 2px; border-color:activeborder;'  name='selDocName' id='selDocName'  onchange='	getTimeAva(),dispDateMessage()'>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}</select>";

var appoAddWatchTemplate = "<div style='width: 99.50%;'><div	style='width: 100%; height: 47px; padding: 5px 0px;'>{#foreach $T.al as al}{#if $T.al.tn%4==1 || $T.al.tn==1}<div style='width: 18%; height: 33px; text-align: center; border-right: 1px solid #069;border-left: 2px solid #069;border-bottom: 1px solid #069;border-top: 2px solid #069; padding-top: 22px;'>{#if hour > 12}{(hour++)-12} pm{#/if}{#if hour == 12}{hour++} noon{#/if}{#if hour < 12}{hour++} am{#/if}</div>{#/if}<div	style='width: 17%; height: 50px; border-right: 1px solid #069;border-bottom: 1px solid #069;border-left: 1px solid #069;border-top: 2px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{#if $T.al.st == 'Y'}<img src='images/appointmentFree.png' width='47' height='43' onclick='swapImagesAdd(this,{$T.al.tn})'/>{#/if}{#if $T.al.st == 'N'}<img src='images/appointmentBusy.png' width='40' height='35' onclick='swapImagesAdd(this.src,{$T.al.tn})' /><br><div style='font-size: 10px;text-align: center;width: 100%;font-weight: bold;color: navy'>{$T.al.fn}&nbsp;{$T.al.ln}</div>{#/if}</div>{#/for}</div></div>";

var appoRemoveWatchTemplate = "<div style='width: 99.50%;'><div	style='width: 100%; height: 47px; padding: 5px 0px;'>{#foreach $T.al as al}{#if $T.al.tn%4==1 || $T.al.tn==1}<div style='width: 18%; height: 33px; text-align: center; border-right: 1px solid #069;border-left: 2px solid #069;border-bottom: 1px solid #069;border-top: 2px solid #069; padding-top: 22px;'>{#if hour > 12}{(hour++)-12} pm{#/if}{#if hour == 12}{hour++} noon{#/if}{#if hour < 12}{hour++} am{#/if}</div>{#/if}<div	style='width: 17%; height: 50px; border-right: 1px solid #069;border-bottom: 1px solid #069;border-left: 1px solid #069;border-top: 2px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{#if $T.al.st == 'Y'}<img src='images/appointmentFree.png' width='47' height='43' onclick='swapImagesRemove(this.src,{$T.al.tn})'/>{#/if}{#if $T.al.st == 'N'}<img src='images/appointmentBusy.png' width='40' height='35' onclick='swapImagesRemove(this,{$T.al.tn})' /><br><div style='font-size: 10px;text-align: center;width: 100%;font-weight: bold;color: navy'>{$T.al.fn}&nbsp;{$T.al.ln}</div>{#/if}</div>{#/for}</div></div>";

var docNameTemplate1 = "<div style='width: 80%; padding-left: 10%;'><div style='width: 100%; padding-top: 2%;'><div style='width: 8%; padding-left: 30%; padding-top: 0%;'>First Name</div><div style='width: 20%; padding-right: 0%;'><input style='width: 80%; border-width: 2px; border-color:activeborder;' name='txtFName' id='txtFName' type='text' onkeypress='return validatealphabetic(event)' /></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 8%; padding-left: 30%; padding-top: 0%;'>Last Name</div><div style='width: 20%; padding-right: 0%;'><input style='width: 80%;border-width: 2px; border-color:activeborder;' name='' id='txtLName' type='text' onkeypress='return validatealphabetic(event)'/></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 8%; padding-left: 30%; padding-top: 0%;'>Mobile No.</div><div style='width: 20%;'><input style='width: 80%;border-width: 2px; border-color:activeborder;' name='' id='txtMNo' type='text' onkeypress='return validateNumbers(event)'/></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 8%; padding-left: 30%; padding-top: 0%;'>&nbsp;</div><div style='width: 20%; padding-left: 12%;' ><input  name='' type='button' value='OK' onclick='dispMessage()'/></div></div></div>";
var opdAppoSearchTemplate = "<div style='width: 96%; padding: 2%;'><div style='width: 10%;'>Search By:</div><div style='width: 10%;text-align: center;'><span	style='width: 10%; padding-left: 5%;'>Patient Name</span></div><div style='width: 12%;'><input style='width: 100%; border-width: 2px; border-color:activeborder;' name='byName'	type='text' id='byName' /></div><div style='width: 5%; padding-left: 5%;'>OR</div><div style='width: 8%; pXRadding-left: 8%;padding-left: 5%;'><span style='width: 15%;'>Patient ID</span></div><div style='width: 12%;'><input style='width: 100%;border-width: 2px; border-color:activeborder;' name='byId'	type='text' id='byId' /></div><div style='width: 12%; text-align: center;'><input type='button'	value='Search'  class='edit' onclick=disppatientSearch('OPD_Appointment') /></div></div><div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 33%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Patient Name</div><div	style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Patient ID</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>DOB</div><div	style='width: 19%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Appointment</div></div></div><div	style='width: 99.80%; height: 70%; overflow: auto; border: 1px solid #436a9d;'	id='container'></div>";
var opdAppoPatTypeSelTemplate = "<div style='width: 70px; padding-left: 10px;'>Appoint To</div><div style='width: 150px;'><select	style='width: 100%; font-size: 11px;border-width: 2px; border-color:activeborder;' name=''	onchange='setDocName1()' id='selType'>	<option>SELECT</option>	<option>Patient</option>	<option>Doctor</option>	<option>Other</option></select></div>";
var opdAppoType = "<div id='divAppoType' style='width:100%'><div style='width: 20px; padding-left: 20px;'><input type='radio' name='RadioGroupPatient' value='radio1' id='RadioGroupPatient_2' name='RadioGroupPatient_2' onclick=dispDateRadioMessage('addAppo') /></div><div style='width: 100px; padding-left: 10px;'>Add Appointment</div><div style='width: 20px;'><input type='radio' name='RadioGroupPatient_2' value='radio' id='RadioGroupPatient_2' name='RadioGroupPatient_2' onclick=dispDateRadioMessage('removeAppo') /></div><div style='width: 120px; padding-left: 10px;'>Remove Appointment</div></div>";
var opdAppoPatType = "<div id='divPatientType'><div style='width: 20px; padding-left: 20px;'><input type='radio'	name='RadioGroupPatient' value='radio' id='RadioGroupPatient_1'	onclick='setOpdAppoSearchTemplate()' /></div><div style='width: 100px; padding-left: 10px;'>Existing patient</div><div style='width: 20px;'><input type='radio'	name='RadioGroupPatient' value='radio' id='RadioGroupPatient_2'	onclick='setAppoPatType()' /></div><div style='width: 80px; padding-left: 10px;'>New Entry</div></div>";
var opdDistemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 34.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 18.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.db}</div><div style='width: 13%; height: 25px; padding-left: 4%; padding-top: 3px; text-align: center;'><input onclick=setDivPIType({$T.pl.pi},'existPatient') style='font-size: 10px;'	type='button' value='Appointment' /></div></div>{#/for}";

var headerTemplateForAppo = " <tr> "
		+ "<th style='width: 4%;' class='center'>#</th> "
		+ "<th style='width: 15%' class=''>Patient Name</th> "
		+ "<th style='width: 7%' class='center'>Patient ID</th> "
		+ "<th style='width: 8%' class='center'>Mobile No</th> "
		+ "<th style='width: 8%' class='center'>App.Date</th> "
		+ "<th style='width: 8%' class='center'>Token No</th> "
		+ "<th style='width: 7%' class='center'>Doctor</th> "
		+ "<th style='width: 11%' class='center'>Specialization</th> "
		+ "<th style='width: 7%' class='center'>Department</th> "
		+ "<th style='width: 9%' class=''>Case Paper</th>"
		+ "<th style='width: 4%' class=''>Send</th>"
		+ "<th style='width: 5%' class='center'>Bill</th>"
		+ "<th style='width: 4%' class='center'>Cancel</th> </tr>";

var headerTemplateForOPDAppo = "<div style='width: 100%;'>	<div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>	<div		style='width: 33%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Patient	Name</div>	<div		style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Token Number</div>	<div		style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Send</div>	</div>";

var docNameTemplateForOPD = "<option value='0'>-select-</option>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";

var containerTemplateForAppo = "{#foreach $T.al as al} <tr id='colorDiv{$T.al.pi}'> "
		+ "<td style='width: 4%;' class='center'>{count++}.</td> "
		+ "<td style='width: 15%' class=''>{$T.al.tit} {$T.al.fn} {$T.al.mName} {$T.al.ln} </td> "
		+ "<td id='divPi{count}' style='width: 8%;' class='center'>{$T.al.pi}</td> "
		+ "<td id='divPi{count}' style='width: 8%' class='center'>{$T.al.mn}</td> "
		+ "<td style='width: 8%' class='numeric center'>{$T.al.ad}</td> "
		+ "<td id='divPi{count}' style='width: 8%' class='numeric center'>{$T.al.tn}</td> "
		+ "<td id='divP{count}' class='numeric center'>"
		+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange=setSpecilizationAndDepartment({count}),sendTODoc({$T.al.paid},{count},'bill') class='editUserAccess' disabled='disabled'></select></td> "
		+ "<td id='divPii{count}' class='numeric center'>"
		+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsFromSpecilization({count})' class='editUserAccess' disabled='disabled'></select></td> "
		+ "<td id='divPiii{count}' class='numeric '>"
		+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsForDepartments({count})' class='editUserAccess' disabled='disabled'></select></td> "
		+ "<td class='numeric '>"
		+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup({count}) /></td> "
		+ "<td class='numeric '>"
		+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView{count}' onClick=sendTODoc({$T.al.paid},{count}) class='editUserAccess' disabled='disabled'/></td> "
		+ "<td class='numeric '>"
		+ "<input style='font-size: 10px;' type='button' value='BILL' id='btnBill{count}' onClick='viewOPDBillForDoctor({$T.al.paid},{$T.al.trid})' /></td> "
		+ "<td class='numeric' style='width: 7%;' id='divCD{count}'>"
		+ "<button data-toggle='tooltip' data-placement='left' title='Cancel' class='btn btn-xs btn-warning' style='font-size: 7px;margin-right: 2px;' id='btnCancel{count}' onClick=cancelSendTODoc({$T.al.paid},{count},'cancel') disabled='disabled'> <i class='fa fa-times'></i></button>"
		+ "<button data-toggle='tooltip' data-placement='left' title='Check up done' class='btn btn-xs btn-success' style='font-size: 7px;' id='btnDone{count}' onClick=sendTODoc({$T.al.paid},{count},'out') disabled='disabled'> <i class='fa fa-check'></i></button>&nbsp;"
		+ "<button data-toggle='tooltip' data-placement='left' title='Change Consultation Doctor' class='btn btn-xs btn-info' style='font-size: 7px;' id='btnChangeConsultation{count}' onClick=changeConsDoc({$T.al.di},{$T.al.splId},{$T.al.depId},{count},'{$T.al.ad}',{$T.al.paid},{$T.al.pi},{$T.al.trid},'{$T.al.tit}','{$T.al.fn}','{$T.al.mName}','{$T.al.ln}') ><i id='ithumbId{count}'></i></button>"
		+ "</td></tr> {#/for}";

var containerTemplateForAppo1 = "{#foreach $T.al as al} <tr id='colorDiv{$T.al.pi}'> "
	+ "<td style='width: 4%;' class='center'>{count++}.</td> "
	+ "<td style='width: 15%' class=''>{$T.al.tit} {$T.al.fn} {$T.al.mName} {$T.al.ln} </td> "
	+ "<td id='divPi{count}' style='width: 8%;' class='center'>{$T.al.pi}</td> "
	+ "<td id='divPi{count}' style='width: 8%' class='center'>{$T.al.mn}</td> "
	+ "<td style='width: 8%' class='numeric center'>{$T.al.ad}</td> "
	+ "<td id='divPi{count}' style='width: 8%' class='numeric center'>{$T.al.tn}</td> "
	+ "<td id='divP{count}' class='numeric center'>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange=setSpecilizationAndDepartment({count}),sendTODoc({$T.al.paid},{count},'bill') class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td id='divPii{count}' class='numeric center'>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsFromSpecilization({count})' class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td id='divPiii{count}' class='numeric '>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsForDepartments({count})' class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup({count}) /></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView{count}' onClick=sendTODoc({$T.al.paid},{count}) class='editUserAccess' disabled='disabled'/></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='BILL' id='btnBill{count}' onClick='viewOPDBillForDoctor({$T.al.paid},{$T.al.trid})' /></td> "
	+ "<td class='numeric' style='width: 57%;' id='divCD{count}'>"
	+ "<button data-toggle='tooltip' data-placement='left' title='Cancel' class='btn btn-xs btn-warning' style='font-size: 7px;margin-right: 2px;' id='btnCancel{count}' onClick=cancelSendTODoc({$T.al.paid},{count},'cancel') disabled='disabled'> <i class='fa fa-times'></i></button>"
	+ "<button data-toggle='tooltip' data-placement='left' title='Check up done' class='btn btn-xs btn-success' style='font-size: 7px;' id='btnDone{count}' onClick=sendTODoc({$T.al.paid},{count},'out') disabled='disabled'> <i class='fa fa-check'></i></button>&nbsp;"
	+ "<button data-toggle='tooltip' data-placement='left' title='Change Consultation Doctor' class='btn btn-xs btn-info' style='font-size: 7px;' id='btnChangeConsultation{count}' onClick=changeConsDoc({$T.al.di},{$T.al.splId},{$T.al.depId},{count},'{$T.al.ad}',{$T.al.paid},{$T.al.pi},{$T.al.trid},'{$T.al.tit}','{$T.al.fn}','{$T.al.mName}','{$T.al.ln}') ><i id='ithumbId{count}'></i></button>"
	+ "</td></tr> {#/for}";

var cancelPatientTemplate = "{#foreach $T.al as al} {#if $T.al.queueStatus == 'cancel'} {#if $T.al.splitSendDateTime == $T.al.todays_Date }<tr id='colorDiv{$T.al.pi}'> "
	+ "<td style='width: 4%;' class='center'>{count++}.</td> "
	+ "<td style='width: 15%' class=''>{$T.al.tit} {$T.al.fn} {$T.al.mName} {$T.al.ln} </td> "
	+ "<td id='divPi{count}' style='width: 8%;' class='center'>{$T.al.pi}</td> "
	+ "<td id='divPi{count}' style='width: 8%' class='center'>{$T.al.mn}</td> "
	+ "<td style='width: 8%' class='numeric center'>{$T.al.ad}</td> "
	+ "<td id='divPi{count}' style='width: 8%' class='numeric center'>{$T.al.tn}</td> "
	+ "<td id='divP{count}' class='numeric center'>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange=setSpecilizationAndDepartment({count}),sendTODoc({$T.al.paid},{count},'bill') class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td id='divPii{count}' class='numeric center'>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsFromSpecilization({count})' class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td id='divPiii{count}' class='numeric '>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsForDepartments({count})' class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup({count}) /></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView{count}' onClick=sendTODoc({$T.al.paid},{count}) class='editUserAccess' disabled='disabled'/></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='BILL' id='btnBill{count}' onClick='viewOPDBillForDoctor({$T.al.paid},{$T.al.trid})' /></td> "
	+ "<td class='numeric' style='width: 5%;'>"
	+ "<button data-toggle='tooltip' data-placement='left' title='Cancel' class='btn btn-xs btn-warning' style='font-size: 7px;margin-right: 2px;' id='btnCancel{count}' onClick=cancelSendTODoc({$T.al.paid},{count},'cancel') disabled='disabled'> <i class='fa fa-times'></i></button>"
	+ "<button data-toggle='tooltip' data-placement='left' title='Check up done' class='btn btn-xs btn-success' style='font-size: 7px;' id='btnDone{count}' onClick=sendTODoc({$T.al.paid},{count},'out') disabled='disabled'> <i class='fa fa-check'></i></button>"
	+ "</td></tr> {#/if} {#/if} {#/for}";

var checkupDonePatientTemplate = "{#foreach $T.al as al} {#if $T.al.queueStatus == 'out'} {#if $T.al.splitSendDateTime == $T.al.todays_Date }<tr id='colorDiv{$T.al.pi}'> "
	+ "<td style='width: 4%;' class='center'>{count++}.</td> "
	+ "<td style='width: 15%' class=''>{$T.al.tit} {$T.al.fn} {$T.al.mName} {$T.al.ln} </td> "
	+ "<td id='divPi{count}' style='width: 8%;' class='center'>{$T.al.pi}</td> "
	+ "<td id='divPi{count}' style='width: 8%' class='center'>{$T.al.mn}</td> "
	+ "<td style='width: 8%' class='numeric center'>{$T.al.ad}</td> "
	+ "<td id='divPi{count}' style='width: 8%' class='numeric center'>{$T.al.tn}</td> "
	+ "<td id='divP{count}' class='numeric center'>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange=setSpecilizationAndDepartment({count}),sendTODoc({$T.al.paid},{count},'bill') class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td id='divPii{count}' class='numeric center'>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsFromSpecilization({count})' class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td id='divPiii{count}' class='numeric '>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsForDepartments({count})' class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup({count}) /></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView{count}' onClick=sendTODoc({$T.al.paid},{count}) class='editUserAccess' disabled='disabled'/></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='BILL' id='btnBill{count}' onClick='viewOPDBillForDoctor({$T.al.paid},{$T.al.trid})' /></td> "
	+ "<td class='numeric' style='width: 5%;'>"
	+ "<button data-toggle='tooltip' data-placement='left' title='Cancel' class='btn btn-xs btn-warning' style='font-size: 7px;margin-right: 2px;' id='btnCancel{count}' onClick=cancelSendTODoc({$T.al.paid},{count},'cancel') disabled='disabled'> <i class='fa fa-times'></i></button>"
	+ "<button data-toggle='tooltip' data-placement='left' title='Check up done' class='btn btn-xs btn-success' style='font-size: 7px;' id='btnDone{count}' onClick=sendTODoc({$T.al.paid},{count},'out') disabled='disabled'> <i class='fa fa-check'></i></button>"
	+ "</td></tr> {#/if} {#/if} {#/for}";

var currentPatientTemplate = "{#foreach $T.al as al} {#if $T.al.queueStatus == 'in'} {#if $T.al.splitSendDateTime == $T.al.todays_Date }<tr id='colorDiv{$T.al.pi}'> "
	+ "<td style='width: 4%;' class='center'>{count++}.</td> "
	+ "<td style='width: 15%' class=''>{$T.al.tit} {$T.al.fn} {$T.al.mName} {$T.al.ln} </td> "
	+ "<td id='divPi{count}' style='width: 8%;' class='center'>{$T.al.pi}</td> "
	+ "<td id='divPi{count}' style='width: 8%' class='center'>{$T.al.mn}</td> "
	+ "<td style='width: 8%' class='numeric center'>{$T.al.ad}</td> "
	+ "<td id='divPi{count}' style='width: 8%' class='numeric center'>{$T.al.tn}</td> "
	+ "<td id='divP{count}' class='numeric center'>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange=setSpecilizationAndDepartment({count}),sendTODoc({$T.al.paid},{count},'bill') class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td id='divPii{count}' class='numeric center'>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsFromSpecilization({count})' class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td id='divPiii{count}' class='numeric '>"
	+ "<select style='width: 98%; font-size: 11px;' name='selDocName' id='selDocName' onchange='setDoctorsForDepartments({count})' class='editUserAccess' disabled='disabled'></select></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='Case Paper' class='{$T.al.image}' onClick=PrintCasePaperFunctionOnPopup({count}) /></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='SEND' id='btnView{count}' onClick=sendTODoc({$T.al.paid},{count}) class='editUserAccess' disabled='disabled'/></td> "
	+ "<td class='numeric '>"
	+ "<input style='font-size: 10px;' type='button' value='BILL' id='btnBill{count}' onClick='viewOPDBillForDoctor({$T.al.paid},{$T.al.trid})' /></td> "
	+ "<td class='numeric' style='width: 5%;'>"
	+ "<button data-toggle='tooltip' data-placement='left' title='Cancel' class='btn btn-xs btn-warning' style='font-size: 7px;margin-right: 2px;' id='btnCancel{count}' onClick=cancelSendTODoc({$T.al.paid},{count},'cancel') disabled='disabled'> <i class='fa fa-times'></i></button>"
	+ "<button data-toggle='tooltip' data-placement='left' title='Check up done' class='btn btn-xs btn-success' style='font-size: 7px;' id='btnDone{count}' onClick=sendTODoc({$T.al.paid},{count},'out') disabled='disabled'> <i class='fa fa-check'></i></button>"
	+ "</td></tr> {#/if} {#/if} {#/for}";

var containerTretDoneTemp = "{#foreach $T.al as al} <div id='colorDiv{counter}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 3%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{counter}.</div><div style='width: 18%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.al.fn}  {$T.al.ln}</div><div id='divPi1{counter}' style='width: 7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.al.pi}</div><div id='divPi1{counter}' style='width: 8.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.al.tn}</div><div id='divPii1{counter}' style='width: 14%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><select	style='width: 90%;font-size: 11px;'  name='selDocName' id='selDocName'  onchange='setSpecilizationAndDepartment({count})' ></select></div><div id='divP1{counter}' style='width: 14%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><select	style='width: 90%;font-size: 11px;'  name='selDocName' id='selDocName'  onchange='setSpecilizationAndDepartment({count})' ></select></div><div id='divPiii1{counter}' style='width: 14%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><select	style='width: 90%;font-size: 11px;'  name='selDocName' id='selDocName'  onchange='setSpecilizationAndDepartment({count})' ></select></div><div style='width: 6%; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='SEND' id='btnView1{counter}'  /></div><div style='width: 6%; height: 25px; border-right: 1px solid #069; padding-left: 0%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='BILL' id='btnBill1{counter++}' readonly='readonly' onClick='viewOPDBillForDoctor({$T.al.paid},{$T.al.trid})' /></div></div>{#/for}";

var containerTemplateForOPD = "{#foreach $T.ol as ol} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 34%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.ol.fn}  {$T.ol.ln}</div><div id='divPi{count}' style='width: 21%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.ol.tn}</div><div style='width: 21%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='SEND' id='btnView{count}' onClick=sendTODoc({$T.ol.paid},'opd') /></div></div>{#/for}";

var headerTemplateForOPDSearch = "<div style='width: 100%;'>	<div		style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>	<div		style='width: 33%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Patient	Name</div>	<div		style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Doctor Name	</div>	<div		style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Appoint</div>	</div>";
var containerTemplateForOPDSearch = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{++count}.</div><div style='width: 34%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn}  {$T.pl.ln}</div><div id='divPi{count}' style='width: 21%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><select	style='width: 90%;font-size: 11px;'  name='selDocName' id='selDocName'  onchange='tempSetSpDept()' ></select>  </div><div style='width: 21%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='Appoint' id='btnView{count}' onClick=appointOPDPat('{$T.pl.fn}','{$T.pl.ln}',{$T.pl.pi},{count},{$T.pl.trid}) /></div></div>{#/for}";

/** ********End Rmo Treatment ********************** */

/*........@author : Amrut(Date:23-6-2016)....... */



/***********************Print case Papper code*****************************/
/***@author    :BILAL
 * @Date       :27-10-2017
 * @Code       :For print case paper for noble***/
//function PrintCasePaperFunctionOnPopup(ptid,cnt,tId,docId,docName,tokenNo){
function PrintCasePaperFunctionOnPopup(ptid,cnt,tId,docId,tokenNo){
	
	//getting doctor id and name of doctor
	/*var v1 = $("input[name='drname"+cnt+"']:checked").val();	
	var doctorName =$("#opddrnameprint"+v1).val();
	$('#doctorNamehidden').val(doctorName);
	
	
	if(v1==undefined || v1==null || v1==""){
		alert("please select doctor for case paper!!!");
		return false;
	}else{*/
		var doctorId = $("#doctorId"+tId);
		var doctorName = $("#doctorName").val();
		$("#iPopUpForPrintCasePaper").show('show');
		$("#hiddenId").val(ptid);
		$("#hiddenTratId").val(tId);
		$("#hiddenradiovalue").val(docId);
		$("#doctorNamehidden"+cnt).val(doctorName);
		$("#tokenNoForPrint").val(tokenNo);
		$("#docDepartmentForPrint").val($("#docDepartmentName"+cnt).val());
	//}
	
}

/***@author    :BILAL
 * @Date       :27-10-2017
 * @Code       :For closing case paper for noble***/
function closeCasePaperPrintPopup()
{
	$("#iPopUpForPrintCasePaper").hide('show');
}

/***@author    :BILAL
 * @Date       :27-10-2017
 * @Code       :For opening case paper for noble***/
function openCasePaperPrint()
{
	var drid = $("#hiddenradiovalue").val();
	var arrayCount = $("#hiddenId").val();
	var doctorName = $('#doctorNamehidden').val();
	var tId=$("#hiddenTratId").val();
	var tokenNo = $("#tokenNoForPrint").val();
	
	if(document.getElementById('idPrintCasePaperWithHeader').checked) {
		printCasePaper(arrayCount,drid,doctorName,tokenNo);
		setTimeout(function() {
				$("#iPopUpForPrintCasePaper").hide('show');
		}, 500);
	}
	if(document.getElementById('idPrintCasePaperStandardWithPhoto').checked) {
		printCasePaper(arrayCount,drid,doctorName,tokenNo);
		setTimeout(function() {
				$("#iPopUpForPrintCasePaper").hide('show');
		}, 500);
	}
	if(document.getElementById('idPrintCasePaperWithoutHeader').checked){
		printCasePaperWithoutHeader(arrayCount,drid,doctorName,tId,tokenNo);
		setTimeout(function() {
			$("#iPopUpForPrintCasePaper").hide('show');
		}, 500);
	}
	if(document.getElementById('idPrintCasePaperWithPhoto').checked){
		printCasePaperWithoutHeader(arrayCount,drid,doctorName,tId,tokenNo);
		setTimeout(function() {
			$("#iPopUpForPrintCasePaper").hide('show');
		}, 500);
	}
}

/***@author    :BILAL
 * @Date       :27-10-2017
 * @Code       :For printting case paper for standard and custom***/
function printCasePaper(arrayCount,drid,doctorName,tokenNo) {
	
	var withPhoto = 0;
	if(document.getElementById('idPrintCasePaperStandardWithPhoto').checked) {
		withPhoto = 1;
	}
	
	//getting list of patient records in ajax response and parssing it to JSON
	//var ajaxResponse = $("#appointedpatientDiv").html();
	//var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());

	/*for ( var i = 0; i < myArray.al.length; i++) {
		
		//arrayCount is nothing but patient id
		if (myArray.al[i].pi == arrayCount) {
	
			var deptid=myArray.al[i].department_id;
	
				if(deptid=="2"){
		
					Department ="IPD";
				}else{
		
					Department="OPD";
				}
			var drnm=doctorName;
			var treatmentId = (myArray.al[i].tid);
			var image =myArray.al[i].image;
			
			window.open("CasePaperPrint.jsp?treatmentId=" + treatmentId
					+ "&Department=" + encodeURIComponent(Department)
					+ "&Consultant=" + encodeURIComponent(drnm)
					+ "&drid=" + encodeURIComponent(drid)
					+ "&image=" + image + "&withPhoto=" + withPhoto);
		}
	}*/
	

	
	var deptid = 1;
	Department="OPD";
	
	var docDept = $("#docDepartmentForPrint").val();
		
	var drnm = doctorName;
	var treatmentId = $("#hiddenTratId").val();
	var image = "";//myArray.al[i].image;
	
	window.open("CasePaperPrint.jsp?treatmentId=" + treatmentId
			+ "&Department=" + encodeURIComponent(Department)
			+ "&Consultant=" + encodeURIComponent(drnm)
			+ "&drid=" + encodeURIComponent(drid)
			+ "&image=" + image + "&withPhoto=" + withPhoto +"&tkn="+tokenNo+"&docDept="+docDept);

}
/***@author    :BILAL
 * @Date       :27-10-2017
 * @Code       :For printting case paper for standard with photo and custom with photo * **/
function printCasePaperWithoutHeader(arrayCount,drid,doctorName,tId,tokenNo) {
	
	var withPhoto = 0;
	if(document.getElementById('idPrintCasePaperWithPhoto').checked){
		withPhoto = 1;

	}
	var ajaxResponse = $("#appointedpatientDiv").html();
	
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	
	for ( var i = 0; i < myArray.al.length; i++) {
		if (myArray.al[i].pi == arrayCount) {
			
			var deptid=myArray.al[i].department_id;
			if(deptid=="2"){
				
				  Department ="IPD";
			}else{
				
				Department="OPD";
			}
			
			var treatmentId = (myArray.al[i].trid);
			var pname = (myArray.al[i].tit) + (myArray.al[i].fn) + " "+(myArray.al[i].mName)+" "+ (myArray.al[i].ln);
			var PatientID = (myArray.al[i].pi);
			var MRNo = (myArray.al[i].mrNo);
			var AgeSexWt = (myArray.al[i].ageyr) + "Y"+(myArray.al[i].agemonth)+"M"+(myArray.al[i].agedys)+"D"+"/" + (myArray.al[i].sx)+ "/" + (myArray.al[i].wt);

			var treatmentCount = (myArray.al[i].treatmentCount);
			var image = myArray.al[i].image;
 			+ (myArray.al[i].taluka) + "," + (myArray.al[i].district);
 			var a1 = myArray.al[i].a1;
 			var a2 = myArray.al[i].a2;
 			var city = myArray.al[i].city;
 			var taluka = myArray.al[i].taluka;
 			var district = myArray.al[i].district;
 			var ContactNo = (myArray.al[i].mn);
 			var TokenNo = (myArray.al[i].tn);		
 			var regNo = "";
	 
 			var appDate = (myArray.al[i].ad);
 			var drnm=	doctorName;
	setTimeout(function() {
		window.open("casePaperPrintWithoutHeader.jsp?pname=" + encodeURIComponent(pname)
				+ "&PatientID=" + PatientID + "&MRNo=" + MRNo + "&AgeSexWt="
				+ encodeURIComponent(AgeSexWt) + "&treatmentCount="
				+ encodeURIComponent(treatmentCount) + "&a1="
				+ encodeURIComponent(a1)+ "&a2="
				+ encodeURIComponent(a2)+ "&city="
				+ encodeURIComponent(city)+ "&taluka="
				+ encodeURIComponent(taluka)+ "&district="
				+ encodeURIComponent(district)+ "&TokenNo=" + TokenNo
				+ "&treatmentId=" + tId + "&ContactNo=" + ContactNo
				+ "&Department=" + encodeURIComponent(Department)
				+ "&Consultant=" + encodeURIComponent(drnm)
				+ "&regNo=" + encodeURIComponent(regNo)
				+ "&appDate=" + encodeURIComponent(appDate)
				+ "&image=" + image + "&withPhoto=" + withPhoto + "&tkn=" + tokenNo);
			}, 800);
		}
	}		 	
}

/***********************End Print case Papper code*****************************/

//End...@author : Amrut(Date:23-6-2016)
function viewOPDBillForDoctor(paid, trid) {

	var pageType = $("#pageType").html();
	// alert(pageType);
	// billtype = "S Roplekar";
	// alert(billtype);
	var myObj;
	var ajaxResponse = $("#appointedpatientDiv").html();
	var myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.al.length; i++) {
		if (myArray.al[i].trid == trid) {
			myObj = myArray.al[i];
			break;
		}
	}
	/*
	 * var fn = myObj.fn; var discID = myObj.sdisc; var ln = myObj.ln; var pname =
	 * myObj.tit + "" + fn + " " + ln; var dname = myObj.sdiscNm; var rdn =
	 * myObj.rdn; var rrd = myObj.rrd; var treatmentCount =
	 * myObj.treatmentCount; var treatmentId = myObj.trid;
	 */

	$('#paidAmount').val(myObj.paid);
	myObj = JSON.stringify(myObj);

	/*
	 * window.location = "opdBill.jsp?" + "myObj=" + encodeURIComponent(myObj) +
	 * "&billtype=" + billtype + "&pname=" + pname + "&sdisc=" + discID +
	 * "&rdn=" + rdn + "&rrd=" + rrd + "&treatmentCount=" + treatmentCount +
	 * "&pageType=" + pageType;
	 */

	window.location = "opdBill.jsp?" + "myObj=" + encodeURIComponent(myObj)
			+ "&pageType=" + pageType;

}

function endRmoTreatment(paid, chkId) {

	r = confirm("You Want To Close Doctor Treatment");
	if (r == true) {
		var inputs = [];
		inputs.push('action=EndRmoTreatment');
		inputs.push('paid=' + paid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "DoctorServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				location.reload();
			}
		});
	} else {
		$("#checkbox" + chkId).attr("checked", false);
	}
}
/** ************ End Rmo Treatment ***************** */
/* ***************Validations for Appointment************************** */

var blockDocNameTemplate = "<select	style='width: 90%;font-size: 11px;border-width: 2px; border-color:activeborder;'  name='selDocName' id='selDocName'  >{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}</select>";

function EditAppointment() {
	if ($("#date-pick").val() == "") {
		alert("Please select date...");
		return false;
	}
	var inputs = [];
	inputs.push('action=DeleteBlockDoctorsApp');
	inputs.push('date=' + $("#date-pick").val());
	inputs.push('docName=' + $("#selDocName").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			alert(ajaxResponse);
			location.reload();
		}
	});
}

function BlockAppointment() {
	if ($("#date-pick").val() == "") {
		alert("Please select date...");
		return false;
	}
	var inputs = [];
	inputs.push('action=BlockDoctorsApp');
	inputs.push('date=' + $("#date-pick").val());
	inputs.push('docName=' + $("#selDocName").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			alert(ajaxResponse);
			location.reload();
		}
	});
}

function setBlockDocName() {

	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('pId=' + 1);
	inputs.push('date=onload');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			doctorBean = eval('(' + ajaxResponse + ')');
			$("#divDocName").setTemplate(blockDocNameTemplate);
			$("#divDocName").processTemplate(doctorBean);
			setAppoType();
		}
	});
	// window.reload();
};

function setDoctorsForDepartments(count) {
	var doctorObjects = {
		dl : []
	};
	ajaxResponse = $("#doctorObject").html();
	doctorBean = eval('(' + ajaxResponse + ')');
	var departmentId = $("#divPiii" + count).children('#selDocName').val();
	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].dept == departmentId) {
			doctorObjects.dl.push(doctorBean.dl[i]);
		}
	}
	$("#divP" + count).children('#selDocName').setTemplate(
			docNameTemplateForOPD);
	$("#divP" + count).children('#selDocName').processTemplate(doctorObjects);
}
function setDoctorsFromSpecilization(count) {
	var doctorObjects = {
		dl : []
	};

	ajaxResponse = $("#doctorObject").html();
	doctorBean = eval('(' + ajaxResponse + ')');
	var specializationId = $("#divPii" + count).children('#selDocName').val();
	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].sp == specializationId) {
			doctorObjects.dl.push(doctorBean.dl[i]);
		}
	}

	$("#divP" + count).children('#selDocName').setTemplate(
			docNameTemplateForOPD);
	$("#divP" + count).children('#selDocName').processTemplate(doctorObjects);

}

function setSpecilizationAndDepartment(count) {
	if(count == "" || count == 0){
		count = $("#count").val();
	}
	ajaxResponse = $("#doctorObject").html();
	doctorBean = eval('(' + ajaxResponse + ')');
	docIdd = $("#iConsDoc").val();
	
	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].di == docIdd) {
			
			$('#iConsSpec').val(doctorBean.dl[i].sp);
			$('#iConsDept').val(doctorBean.dl[i].dept);
		}
	}
	
	var docId = $("#divP" + count).children('#selDocName').val();
	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].di == docId) {
			// alert(doctorBean.dl[i].sp);
			$('#divPii' + count).children('#selDocName').val(
					doctorBean.dl[i].sp);
			$('#divPiii' + count).children('#selDocName').val(
					doctorBean.dl[i].dept);
			return false;
		}
	}
}

var doctorSpecilizationTemp = "<option value='0'>-select-</option>{#foreach $T.liSplz as spl}<option value='{$T.spl.splzId}'>{$T.spl.splzNm}</option>{#/for}";

function fetchDoctorSpecilizations(docType, count, divId) {
	var appointPatient = $("#appointedpatientDiv").html();
	var inputs = [];
	inputs.push('action=fetchDoctorSpecilizations');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#specObject").html(ajaxResponse);
			doctorBean = eval('(' + ajaxResponse + ')');
			if (divId == "divPii") {
				patBean = eval('(' + appointPatient + ')');

				for ( var i = 2; i <= count; i++) {
					$("#" + divId + i).children('#selDocName').setTemplate(
							doctorSpecilizationTemp);
					$("#" + divId + i).children('#selDocName').processTemplate(
							doctorBean);
					//$('#ithumbId'+i).addClass('fa fa-thumbs-up');
					$('#divPii' + i).children('#selDocName').val(
							patBean.al[i - 2].splId);
					
				}
				
			} else if (divId == "divP1") {

				var treatmentDonePatientDiv = $("#treatmentDonePatientDiv")
						.html();
				patBean = eval('(' + treatmentDonePatientDiv + ')');

				for ( var i = 1; i <= count; i++) {
					$("#" + divId + i).children('#selDocName').setTemplate(
							doctorSpecilizationTemp);
					$("#" + divId + i).children('#selDocName').processTemplate(
							doctorBean);
					//$('#ithumbId'+i).addClass('fa fa-thumbs-down');
					$('#divP1' + i).children('#selDocName').val(
							patBean.al[i - 1].splId);
				}
			}

		}
	});

}

var doctorDepartmentTemp = "<option value='0'>-select-</option>{#foreach $T.liDep as dpl}<option value='{$T.dpl.depId}'>{$T.dpl.depNm}</option>{#/for}";

function fetchHospitalDepartments(docType, count, divId) {
	var appointPatient = $("#appointedpatientDiv").html();
	var inputs = [];
	inputs.push('action=fetchHospitalDepartments');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var ajaxResponse = r;
			//alert(ajaxResponse);
			$("#deptObject").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');
			if (divId == "divPiii") {
				patBean = eval('(' + appointPatient + ')');

				for ( var i = 2; i <= count; i++) {
					$("#" + divId + i).children('#selDocName').setTemplate(
							doctorDepartmentTemp);
					$("#" + divId + i).children('#selDocName').processTemplate(
							doctorBean);
					
					$('#divPiii' + i).children('#selDocName').val(
							patBean.al[i - 2].depId);
				}
				

			} else if (divId == "divPiii1") {
				var treatmentDonePatientDiv = $("#treatmentDonePatientDiv")
						.html();
				patBean = eval('(' + treatmentDonePatientDiv + ')');

				for ( var i = 1; i <= count; i++) {
					$("#" + divId + i).children('#selDocName').setTemplate(
							doctorDepartmentTemp);

					$("#" + divId + i).children('#selDocName').processTemplate(
							doctorBean);
					
					$("#" + divId + i).children('#selDocName').val(
							patBean.al[i - 1].depId);

				}

			}

		}
	});

}

function setDocNameForCommonAppo(docType, count, divId) {
	var appointPatient = $("#appointedpatientDiv").html();

	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('date=onload');
	inputs.push('docType=' + docType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
		//	alert("ajaxResponse..."+ajaxResponse);
			$("#doctorObject").html(ajaxResponse);
			if (divId == "divP" || divId == "divPii") {
				patBean = eval('(' + appointPatient + ')');

				doctorBean = eval('(' + ajaxResponse + ')');
				for ( var i = 2; i <= count; i++) {
					$("#" + divId + i).children('#selDocName').setTemplate(
							docNameTemplateForOPD);
					$("#" + divId + i).children('#selDocName').processTemplate(
							doctorBean);
					$('#ithumbId'+i).addClass('fa fa-stethoscope fa-fw');
					$('#divP' + i).children('#selDocName').val(
							patBean.al[i - 2].di);

				}
				

			} else if (divId == "divPii1") {
				var treatmentDonePatientDiv = $("#treatmentDonePatientDiv")
						.html();
				patBean = eval('(' + treatmentDonePatientDiv + ')');

				doctorBean = eval('(' + ajaxResponse + ')');
				for ( var i = 1; i <= count; i++) {
					$("#" + divId + i).children('#selDocName').setTemplate(
							docNameTemplateForOPD);

					$("#" + divId + i).children('#selDocName').processTemplate(
							doctorBean);
					$('#ithumbId'+i).addClass('fa fa-stethoscope fa-fw');
					$('#divPii1' + i).children('#selDocName').val(
							patBean.al[i - 1].di);
				}

			} else {
				doctorBean = eval('(' + ajaxResponse + ')');
				for ( var i = 1; i <= count; i++) {
					$("#" + divId + i).children('#selDocName').setTemplate(
							docNameTemplateForOPD);
					$("#" + divId + i).children('#selDocName').processTemplate(
							doctorBean);
				}
			}
		}
	});
}

function appointOPDPat(fName, lName, patID, countValue, trid) {

	var docId = $('#divPi' + countValue).children('#selDocName').val();
	// var docId = $("#divPi1").find("input:select")[0]).val();

	// alert($('#divPi'+countValue).children('#selDocName').val());
	var inputs = [];
	inputs.push('action=AppointOPDPat');
	inputs.push('docId=' + docId);
	inputs.push('fName=' + encodeURIComponent(fName));
	inputs.push('lName=' + encodeURIComponent(lName));
	inputs.push('patID=' + patID);
	inputs.push('trid=' + trid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			if (ajaxResponse == "") {
			} else {
				alert(ajaxResponse);
			}
			setAppoTimeWatchesForOPD();
		}
	});

}
function opdAppoPatSearch() {

	// $("#headerDiv1").html("");
	// $("#container1").html("");

	count = 0;

	var byName = $("#byName").val();
	var byId = $("#byId").val();
	// var selDocName = $("#selDocName").val();
	// $("#divDocId").html(selDocName);
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by patient Id or by Patient Name");
	} else if (byName == "" && byId == "") {
		alert("Please Enter Patient Name or Patient Id");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=opdPatientSearch');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
		// inputs.push('docId=' + selDocName);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "DoctorServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				patientBean = eval('(' + ajaxResponse + ')');
				if (patientBean.pl.length == 0) {
					alert("Patient Details Not Found");
				} else {
					var demoBean;
					$("#container").setTemplate(containerTemplateForOPDSearch);
					$("#container").processTemplate(patientBean);
					setDocNameForCommonAppo("doc", count, "divPi");
					$("#headerDiv").setTemplate(headerTemplateForOPDSearch);
					$("#headerDiv").processTemplate(demoBean);
				}
			}
		});
	}
};

function cancelSendTODoc(rowId, count, docBill,doctorId){
	$('#cancelNarration').val("");
	$('#narrationModal').modal('show');
	$('#saveNarration').attr("onclick","saveNarration("+rowId+","+count+",'"+docBill+"','"+doctorId+"')");
}

//Modify by Laxman on 29-Dec-2017.
function cancelSendTODoct(docBill){
	$('#cancelNarration').val("");
	$('#narrationModal1').modal('show');
	$('#saveNarration').attr("onclick","saveNarration()");
}
//Modify by Laxman on 29-Dec-2017.
function saveNarration(rowId, count, docBill,doctorId){
	var r = confirm("Are you sure you want to cancel?");
    if (r == true) {
    	if(count==null || count==undefined){
    		checkUpDone('cancel');
    		$('#narrationModal1').modal('hide');
    	}else{
    		sendTODoc(rowId, count, docBill,doctorId);
    	$('#narrationModal').modal('hide');
    	}
    }
}
/*
function sendTODoc(rowId, count, docBill) {
	
	 * alert(docBill); return false;
	 

	var docId = $('#divP' + (count)).children('#selDocName').val();
	if (docId == "0") {
		alert("Please select doctor");
		return false;
	}
	if (specilizationId == "0") {
		alert("Please select doctor specialization");
		return false;
	}
	
	var specilizationId = $('#divPii' + (count)).children('#selDocName').val();
	var departmentId = $('#divPiii' + (count)).children('#selDocName').val();
	if (docId == "0" && specilizationId == "0" && departmentId == "0") {
		alert("Please select atleast one option from Doctor,Specialization and Department.");
		return false;

	} else {
		var inputs = [];
		
		//Add by Amol Saware
		if(docBill=="cancel"){
			specilizationId = $('#cancelNarration').val();
		}
		
		
		if(docBill=="out")
		{
			 var sound = document.getElementById("audio");
	         sound.play();
		}	
			
		

		inputs.push('action=updateRecOPD');
		inputs.push('specilizationId=' + specilizationId);
		inputs.push('departmentId=' + departmentId);
		inputs.push('rowId=' + rowId);
		inputs.push('docId=' + docId);
		inputs.push('docBill=' + docBill);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "DoctorServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;

				setAppoTimeWatchesForOPD();

				// location.reload();
			}
		});
	}

}
*/

//Modify by Laxman on 29-Dec-2017.
function sendTODoc(rowId, count, docBill,doctorId) {
	//debugger;
	
	var v1= $("input[name='drname"+count+"']:checked").val();
	//alert(v1);
		if (v1==undefined || v1==null || v1=="") {
			alert("please select doctor... ");
			   return false;
			
		   } else{
			   doctorId = $("#opddrid"+v1).val();
				//alert(docId);
			   
		   }
	if(docBill == "send"){
	checkSendPatientLimit(doctorId);
	}else{
		$("#sndPatientLimit").val("True");
	}
	//alert("======"+rowId+"======"+count+"======"+docBill+"======"+doctorId);
	/*
	 * alert(docBill); return false;
	 */
//alert("hi");
	//var docId = $('#divP' + (count)).children('#selDocName').val();
	var temp=$("#sndPatientLimit").val();
	if(temp=="True"){
	var docId=0;
	
	/*if(docId==null || docId==undefined || docId=="" ){
		alert("Please select doctor");
		return false;
		
		
	}*/
	if(doctorId==null || doctorId==undefined || doctorId=="" ){
		alert("Please select doctor");
		return false;
		
		
	} 
	/*if (docId == "0") {
		alert("Please select doctor");
		return false;
	}*/
	
	if (specilizationId == "0") {
		alert("Please select doctor specialization");
		return false;
	}
	
	//var specilizationId = $('#divPii' + (count)).children('#selDocName').val();
	//var departmentId = $('#divPiii' + (count)).children('#selDocName').val();
	
	var specilizationId = 1;

	var departmentId = $('#depId').val();

	
	
	if (docId == "0" && specilizationId == "0" && departmentId == "0") {
		alert("Please select atleast one option from Doctor,Specialization and Department.");
		return false;

	} else {
		var inputs = [];
		
		//Add by Amol Saware
		if(docBill=="cancel"){
			specilizationId = $('#cancelNarration').val();
		}
		
		
		if(docBill=="out")
		{
			 var sound = document.getElementById("audio");
	         sound.play();
		}	
			
		
		
		inputs.push('action=updateRecOPD');
		inputs.push('specilizationId=' + specilizationId);
		inputs.push('departmentId=' + departmentId);
		inputs.push('rowId=' + rowId);
		inputs.push('docId=' + doctorId);
		inputs.push('docBill=' + docBill);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "DoctorServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				if(r!="true"){
					alert(r);
				}
				
				setAppoTimeWatchesForOPD();

				location.reload();
			}
		});
	}
	}/*else{
		setAppoTimeWatchesForOPD();
		location.reload();
	}*/
}
function dispMessage() {
	// alert("hi");
	flag = 0;
	var x = $("#txtFName").val();
	// alert(x);
	var y = $("#txtLName").val();
	var z = $("#txtMNo").val();
	if (x == null || x == "") {
		flag = 1;
		alert("Patient first name must be filled out.");
		return false;
	} else if (y == null || y == "") {
		flag = 1;
		alert("Patient last name must be filled out.");
		return false;
	} else {
		if (z == null || z == "") {
			flag = 1;
			alert("Mobile Number must be Entered.");
			return false;
		} else {
			if (z.length == 10) {
				// return true;
			} else {
				flag = 1;
				alert(" Only 10 Digit Mobile Number Allow.");
				return false;
			}
		}
	}

	if (flag == 0) {

		setOpdAppoDiv();
	}

}

function dispDateMessage() {
	flag = 0;
	hour = 9;
	var x = $("#date-pick").val();
	if (x == null || x == "") {
		flag = 1;
		alert("Date must be filled out.");
		return false;
	}
	if (flag == 0) {
		setAppoTimeWatches();

	}
}

function dispDateRadioMessage(appoType) {

	flag = 0;
	var x = $("#date-pick").val();
	if (x == null || x == "") {
		flag = 1;
		alert("Date must be filled out.");
		location.reload();
		/*
		 * $('input[@name="RadioGroupPatient_2"]').checked = false;
		 * $('input[@name="RadioGroupPatient_2"]').checked = false;
		 */
		return false;
	}
	if (flag == 0 && appoType == "addAppo") {
		setDivPatType();

	} else if (flag == 0 && appoType == "removeAppo") {
		setAppoTimeWatches('remove');

	}
}
/**
 * ********************End of Validation for Apoointments************
 */

function setOpdAppoDiv() {
	// dispMessage();
	$("#divFName").html($("#txtFName").val());
	$("#divLName").html($("#txtLName").val());
	$("#divMNo").html($("#txtMNo").val());
	$("#divType").html($("#selType").val());
	$("#divPatType").html("newPatient");
	$("#watchMenu").show();
	setAppoTimeWatches();
	window.reload();
}

function swapImagesAdd(picObject, tokenNumber) {
	var picObjectValue = picObject.src;
	var bSplit = picObjectValue.split("appointment");
	var aSplit = bSplit.slice(1);

	if (aSplit == "Busy.png") {

		var divTokenNo1 = $("#divTokenNo").html();

		var divTokenNo2 = divTokenNo1.replace(tokenNumber + '#', '');

		$("#divTokenNo").html(divTokenNo2);

		picObject.src = "images/appointmentFree.png";
	} else {
		$("#divTokenNo").html($("#divTokenNo").html() + tokenNumber + "#");

		picObject.src = "images/appointmentBusy.png";

	}
	// window.reload();
}

function swapImagesRemove(picObject, tokenNumber) {
	var picObjectValue = picObject.src;
	var bSplit = picObjectValue.split("appointment");
	var aSplit = bSplit.slice(1);

	if (aSplit == "Busy.png") {

		$("#divTokenNo").html($("#divTokenNo").html() + tokenNumber + "#");
		picObject.src = "images/appointmentFree.png";
	} else {
		var divTokenNo1 = $("#divTokenNo").html();
		// alert("div has=>" + divTokenNo1);
		var divTokenNo2 = divTokenNo1.replace(tokenNumber + '#', '');
		// alert("after chang div has=>" + divTokenNo2);
		$("#divTokenNo").html(divTokenNo2);

		picObject.src = "images/appointmentBusy.png";

	}
	// window.reload();
}

function setDivPatType() {
	var sampleBean;
	$("#divCommonField").html(opdAppoPatType);
	$("#divCommonField").html(sampleBean);

}
function setDivPIType(patID, patType) {
	$("#divPatType").html(patType);
	$("#divPatID").html(patID);
	setAppoTimeWatches();
	$("#watchMenu").show();
	$("#divTokenNo").html("");
}

function saveAppointment() {

	var appoType = ($('input:radio[name=RadioGroupPatient_2]:checked').val());

	// alert(appoType);
	var tNums = $("#divTokenNo").html();

	var fName = $("#divFName").html();
	var patientType = $("#divPatType").html();
	var patientId = $("#divPatID").html();

	if (fName == "" && patientId == "" && appoType == "radio1" && tNums == "") {

		alert("please choose patient first");
		return false;
		// break;

	}
	var isSelectSomething = $("#divTokenNo").html();
	if (isSelectSomething == "" && appoType != "radio1") {
		alert("please choose patient first");
		return false;

	}

	var inputs = [];
	inputs.push('action=saveAppointment');
	if (appoType == "radio") {
		inputs.push('appoType=remove');
	}
	inputs.push('fn=' + encodeURIComponent($("#divFName").html()));
	inputs.push('ln=' + encodeURIComponent($("#divLName").html()));
	inputs.push('mn=' + encodeURIComponent($("#divMNo").html()));
	inputs.push('type=' + $("#divType").html());
	inputs.push('tns=' + $("#divTokenNo").html());
	inputs.push('date=' + $("#date-pick").val());
	inputs.push('doc=' + $("#selDocName").val());
	if (patientId != "") {
		inputs.push('patientId=' + patientId);
	}
	inputs.push('patientType=' + patientType);
	var str = inputs.join('&');
	// alert(str);
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			// alert("response is=>" + ajaxResponse);
			if (ajaxResponse != "") {
				alert(ajaxResponse);
			}
			// $("#divMsg").html(ajaxResponse);

			// window.reload();
			setAppoTimeWatches();
			setAppoType();
			$("#divTokenNo").html("");
			// window.reload();
		}
	});
	// window.reload();
	$("#divselPatType").html("");
};
function setAppoType() {
	var xyz;
	$("#divCommonField").setTemplate(opdAppoType);
	$("#divCommonField").processTemplate(xyz);
};

function setAppoPatType() {
	$("#divselPatType").show();
	var xyz;
	$("#divselPatType").setTemplate(opdAppoPatTypeSelTemplate);
	$("#divselPatType").processTemplate(xyz);
	$("#watchMenu").show();
	setAppoTimeWatches();
};
function justChill() {
	alert("sd");
}

function setDocNameForOPD() {

	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('pId=' + 1);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			doctorBean = eval('(' + ajaxResponse + ')');
			$("#divDocName").setTemplate(docNameTemplateForOPD);
			$("#divDocName").processTemplate(doctorBean);

		}
	});
	// window.reload();
};

function setDocName(date) {
	// alert("got it");
	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('pId=' + 1);
	inputs.push('date=' + date);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			doctorBean = eval('(' + ajaxResponse + ')');
			$("#divDocName").setTemplate(docNameTemplate);
			$("#divDocName").processTemplate(doctorBean);
			setAppoType();
		}
	});
	// window.reload();
};

function getTimeslots() {
	var date = $("#divDate").html();
	var inputs = [];
	inputs.push('action=SetAppoTime');
	inputs.push('date=' + date);
	inputs.push('Did=0');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

		}
	});
}
function getTimeAva() {
	hour = 9;
	var docId = $("#selDocName").val();

	var date = $("#date-pick").val();

	var inputs = [];
	inputs.push('action=SetAppoTime');
	inputs.push('date=' + date);
	inputs.push('Did=' + docId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			setAppoTimeWatches();
		}
	});
	// window.reload();
};

function setPatient(type){
	$('#fetchPatientRecord').val(type);
	setAppoTimeWatchesForOPD(type);
}

function setAppoTimeWatchesForOPD(type) {
	count = 1;
	var searchBy = "";
	var value = "";
	var multipleConsultationFlow = $("#multipleConsultationFlow").val();
	//Add By Amol Saware
	var checkUpDoneToday = 0;
	var checkUpCancelToday = 0;
	var currentCheckUp = 0;
	if(($("#byName").val()==null || $("#byName").val()=="") && ($("#byId").val()==null || $("#byId").val()=="") && type == "search"){
		$('#fetchPatientRecord').val("load");
		type = "load";
	}
	
	if (type == "search") {
		$('#fetchPatientRecord').val("search");
		var byName = $("#byName").val();
		// alert("byName ..."+byName);
		var byId = $("#byId").val();

		/**
		 * *****blan space validation by
		 * 
		 * @husen**
		 */
		var temp = 0;
		if (byName != "" || byId != "") {
			var strArr = new Array();
			strArr = byName.split("");
			if (strArr[0] == " ") {
				temp = 1;
			}
		}
		if (temp == 1) {
			alert("shouldn't be blank or contain blank space at the Beginning!!");
			$("#byName").val("");
			$("#byName").focus();
			return false;
		}

		if (byName != "" && byId != "") {
			alert("Please Search  By Either Patient Id OR Patient Name!");
			return false;
		} else if (byName == "" && byId == "") {
			alert("Please Enter Patient Name Or Patient Id");
			return false;
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;
			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
		if (PatientAppointmentsBean.al.length == 0) {
			alert("Please Enter Valid Information Of Patient");
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=setAppoTimeWatchesForOPD');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + value);
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "DoctorServlet",					
				error : function() {
					// alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					//alert("my alert"+ajaxResponse);
					$("#appointedpatientDiv").html(ajaxResponse);
					PatientAppointmentsBean = eval('(' + ajaxResponse + ')');
					if (PatientAppointmentsBean.al.length == 0
							&& type != "once" && type != "load") {
						alert("Patient Details Not Found");
						setAppoTimeWatchesForOPD("once");
						$("#byName").val("");
						$("#byId").val("");
					}
					var demoBean;
					$("#headerDiv").setTemplate(headerTemplateForAppo);
					$("#headerDiv").processTemplate(demoBean);
					
					if($('#fetchPatientRecord').val()=='load' || $('#fetchPatientRecord').val()=='search'){
						if(multipleConsultationFlow=='on'){
							$("#container").setTemplate(containerTemplateForAppo1);							
						}else{
							$("#container").setTemplate(containerTemplateForAppo);
						}
						
					}
					else if($('#fetchPatientRecord').val()=='cancel'){
						$("#container").setTemplate(cancelPatientTemplate);
					}
					else if($('#fetchPatientRecord').val()=='out'){
						$("#container").setTemplate(checkupDonePatientTemplate);
					}
					else if($('#fetchPatientRecord').val()=='in'){
						$("#container").setTemplate(currentPatientTemplate);
					}
					
					$("#container").processTemplate(PatientAppointmentsBean);
					$("#headerDiv1").setTemplate(headerTemplateForAppo);
					$("#headerDiv1").processTemplate(demoBean);
					
					setDocNameForCommonAppo("doc", count, "divP");
					fetchDoctorSpecilizations("spl", count, "divPii");
					fetchHospitalDepartments("dept", count, "divPiii");
					var userRole = $("#userRoleopd").val();
					var userRoleName = $("#userRoleName").val();
					if (userRole == "admin") {
						
					} else {
						for ( var i = 0; i < PatientAppointmentsBean.al.length; i++) {
							//Changed by Laxman on 01-Jan-2018.
							var qStatus=PatientAppointmentsBean.al[i].queue_status;
							if(qStatus!=null){
								if(/in/.test(qStatus)){
								$('#btnView' + (i)).addClass('btn btn-xs btn-primary');
								$('#btnView' + (i)).css({
									'width' : '80%',
									'border-radius' : '5px',
									'margin-top' : '3px'
								});

								$('#btnView' + (i)).attr("disabled",
										"disabled");
								$('#divP' + (i) + ' select').attr(
										"disabled", true);
								$('#divPii' + (i) + ' select').attr(
										"disabled", true);
								$('#divPiii' + (i) + ' select').attr(
										"disabled", true);
								
								//for user access
								$('#btnView' + (i)).removeClass("editUserAccess");
								$('#divP' + (i) + ' select').removeClass("editUserAccess");
								$('#divPii' + (i)+ ' select').removeClass("editUserAccess");
								$('#divPiii' + (i) + ' select').removeClass("editUserAccess");
								$('#btnCancel' + (i)).removeAttr("disabled");
								$('#btnDone' + (i)).removeAttr("disabled");
							} 
							}else if (PatientAppointmentsBean.al[i].dfg == "N") {
								$('#btnView' + (i + 2)).css({
									//backgroundColor : 'red'
								});
								$('#btnView' + (i + 2)).attr("disabled",
										"disabled");
								$('#divP' + (i + 2) + ' select').attr(
										"disabled", true);
								$('#divPii' + (i + 2) + ' select').attr(
										"disabled", true);
								$('#divPiii' + (i + 2) + ' select').attr(
										"disabled", true);
							}
						}
					}
					
					for ( var i = 0; i < PatientAppointmentsBean.al.length; i++) {
						if (PatientAppointmentsBean.al[i].requestToConvertIPD == 1) {
							$('#colorDiv' + PatientAppointmentsBean.al[i].pi).css(
								'background-color', 'orange'
							);
						}else if(PatientAppointmentsBean.al[i].queueStatus == "cancel") {
							$('#colorDiv' + PatientAppointmentsBean.al[i].pi).css('background-color', '#ffe0b3');
							if(PatientAppointmentsBean.al[i].sendDateTime!=null){
								var sendDate = (PatientAppointmentsBean.al[i].sendDateTime).split(" ")[0];
								if(sendDate == todaysDate){
									checkUpCancelToday++;
								}
							}
						}else if(PatientAppointmentsBean.al[i].queueStatus == "in"){
							//$('#colorDiv' + PatientAppointmentsBean.al[i].pi).css('background-color', '#ccffcc');
							if(PatientAppointmentsBean.al[i].sendDateTime!=null){
								var sendDate = (PatientAppointmentsBean.al[i].sendDateTime).split(" ")[0];
								if(sendDate == todaysDate){
									currentCheckUp++;
								}
							}
						}else if(PatientAppointmentsBean.al[i].queueStatus == "out"){
							$('#colorDiv' + PatientAppointmentsBean.al[i].pi).css('background-color', '#ccffcc');
							if(PatientAppointmentsBean.al[i].sendDateTime!=null){
								var sendDate = (PatientAppointmentsBean.al[i].sendDateTime).split(" ")[0];
								if(sendDate == todaysDate){
									checkUpDoneToday++;
								}
							}
						} 							  
					}
					
					if(PatientAppointmentsBean!=null && $('#fetchPatientRecord').val()!='search'){
						$('#opdPatientCount').html(PatientAppointmentsBean.al.length);
						$('#checkUpDoneToday').html(checkUpDoneToday);
						$('#checkUpCancelToday').html(checkUpCancelToday);
						$('#currentCheckUp').html(currentCheckUp);
					}
					setTimeout(function(){userAccess();},200);
				}
			});

};

function setTreatmentDoneOPD() {
	counter = 1;

	var inputs = [];
	inputs.push('action=setTreatmentDoneOPD');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#treatmentDonePatientDiv").html(ajaxResponse);
			PatienttretDone = eval('(' + ajaxResponse + ')');
			// alert(PatientAppointmentsBean.al.length);

			$("#container1").setTemplate(containerTretDoneTemp);
			$("#container1").processTemplate(PatienttretDone);

			setDocNameForCommonAppo("doc", counter, "divPii1");
			fetchDoctorSpecilizations("spl", counter, "divP1");
			fetchHospitalDepartments("dept", counter, "divPiii1");

			setTimeout(
					function() {
						for ( var i = 0; i < PatienttretDone.al.length; i++) {
							if (PatienttretDone.al[i].dfg == "Z") {

								$('#btnView1' + (i + 1)).attr("disabled",
										"disabled");
								$('#btnBill1' + (i + 1)).attr("disabled",
										"disabled");
							}
							// alert(PatientAppointmentsBean.al.length);
							if (PatienttretDone.al[i].fg != undefined
									&& PatienttretDone.al[i].dfg != undefined) {

								var fg1 = PatienttretDone.al[i].fg;
								var dfg1 = PatienttretDone.al[i].dfg;
								// alert("fg1=>" + fg1);
								// alert("dfg1=>" + dfg1);
								if (fg1 == "Y") {

									$('#btnView1' + (i + 1)).css({
										backgroundColor : 'orange'

									});
								}
								if (fg1 == "N" && dfg1 == "N") {
									$('#btnView1' + (i + 1)).css({
										backgroundColor : '#FE2E2E'

									});
									$('#btnView1' + (i + 1)).attr("disabled",
											"disabled");
								} else if (fg1 == "N"
										&& (dfg1 == "Y" || dfg1 == "Z")) {
									$('#btnView1' + (i + 1)).css({
										backgroundColor : '#A5DF00'
									});
									$('#btnView1' + (i + 1)).attr("disabled",
											"disabled");
								}

							} else if (PatienttretDone.al[i].fg != undefined) {
								var fg = PatienttretDone.al[i].fg;
								// alert("fg=>" + fg);
								if (fg == "N") {
									$('#btnView1' + (i + 1)).css({
										backgroundColor : '#A5DF00'
									});
									$('#btnView1' + (i + 1)).attr("disabled",
											"disabled");
								}

							}
							$('#divPii1' + (i + 1) + ' select').attr(
									"disabled", true);
							$('#divP1' + (i + 1) + ' select').attr("disabled",
									true);
							$('#divPiii1' + (i + 1) + ' select').attr(
									"disabled", true);

						}
					}, 1000);
		}

	});

}
function setAppoTimeWatches(appoType, isOnload) {
	// hour = 9;
	// alert(hour);
	if (isOnload == "yes") {
		date = $("#divDate").html();
		alert("Todays " + date + " appointments");
		// delay(200);

		// alert(date);
	} else {
		date = $("#date-pick").val();

	}
	var docId = $("#selDocName").val();
	// alert(docId);
	var inputs = [];
	inputs.push('action=setAppoTimeWatches');
	inputs.push('date=' + date);
	inputs.push('docId=' + docId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			PatientAppointmentsBean = eval('(' + ajaxResponse + ')');
			// alert(ajaxResponse);
			if (appoType == "remove") {
				hour = 9;
				$("#divWatch").setTemplate(appoRemoveWatchTemplate);
				$("#divWatch").processTemplate(PatientAppointmentsBean);

			} else {
				hour = 9;
				$("#divWatch").setTemplate(appoAddWatchTemplate);
				$("#divWatch").processTemplate(PatientAppointmentsBean);
				$("#divTokenNo").html("");
			}
		}
	});

	// location.reload();
};

function setDocName1() {
	mm = 0;
	$("#watchMenu").hide();
	$("#divWatch").setTemplate(docNameTemplate1);
	$("#divWatch").processTemplate(mm);

};
function viewPatientForSche() {

	var inputs = [];
	inputs.push('action=fetch');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);patientDocTreatment
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#container").setTemplate(opdDistemp);

			$("#container").processTemplate(pobj1);
		}
	});
}

function setOpdAppoSearchTemplate() {

	mm = 0;

	$("#watchMenu").hide();
	$("#divWatch").setTemplate(opdAppoSearchTemplate);
	$("#divWatch").processTemplate(mm);
	viewPatientForSche();
	$("#divselPatType").hide();
};

/** ********************** Start Doctor NA********************************* */

var countForNATable = 1;
function pad(number, length) {

	var str = '' + number;
	while (str.length < length) {
		str = '0' + str;
	}

	return str;

}

var j = 1;
function createDivNA() {

	var rowCount = $("#RowCount").val();
	rowCount++;
	var timeSlices = $("#txtHidTimeSlices").val();
	timeSlices = eval('(' + timeSlices + ')');

	divId = "div" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	// x.setAttribute('style', 'width: 100%; ');
	document.getElementById("divTimeslotBody").appendChild(x);
	document.getElementById(divId).innerHTML = '<td class="col-sm-1-1 center" style="width: 3%; height: 40px;">'
			+ (rowCount)
			+ '</td><td class="col-sm-1-1 center" style="width: 18%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;">'
			+ '<input type="text" readonly="readonly" style="width: 90%;" name="date'
			+ (rowCount)
			+ '" onclick="displayCalendar(document.getElementById(\'date'
			+ rowCount
			+ '\'),\'dd/mm/yyyy\',this)'
			+ '" id="date'
			+ (rowCount)
			+ '"  /></td>'
			+ '<td class="col-sm-1-1 center" style="width: 17%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;">'
			+ '<select style="width: 100%;" name="timeFrom"	id="timeFrom'
			+ (rowCount)
			+ '"></select></td><td class="col-sm-1-1 center" style="width: 18%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;">'
			+ '<select style="width: 100%;" name="timeTo" id="timeTo'
			+ (rowCount)
			+ '"></select></td>'
			+ '<td class="col-sm-1-1 center" style="width: 29%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: auto;">'
			+ '<textarea class="demo" rows="1" cols="10" name="note" style="width: 90%;" id="note'
			+ (rowCount)
			+ '" cols=10 rows=1 ></textarea></td>'
			+ '<td class="col-sm-1-1 center" style="width: 2%; padding-top: 8px; height: auto; margin-left: 3px"><input name="checkbox'
			+ (rowCount) + '" id="checkbox" type="checkbox" /></td>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(j);
	j++;

	for ( var i = 0; i < timeSlices.liapp[0].arrtime.length; i++) {
		var arrangedTime = "";

		arrTime = timeSlices.liapp[0].arrtime[i].aptf.split(":");
		if (arrTime[0] > 12) {
			var hour = arrTime[0] - 12;
			hour = pad(hour, 2);
			arrTime[1] = pad(arrTime[1], 2);
			arrangedTime = hour + ":" + arrTime[1] + " PM";
		} else if (arrTime[0] < 12) {
			arrTime[0] = pad(arrTime[0], 2);
			arrTime[1] = pad(arrTime[1], 2);
			arrangedTime = arrTime[0] + ":" + arrTime[1] + " AM";
		} else if (arrTime[0] = 12) {
			arrTime[0] = pad(arrTime[0], 2);
			arrTime[1] = pad(arrTime[1], 2);
			arrangedTime = arrTime[0] + ":" + arrTime[1] + " PM";
		}

		$(new Option(arrangedTime, timeSlices.liapp[0].arrtime[i].aptf))
				.appendTo('#timeTo' + rowCount);
		$(new Option(arrangedTime, timeSlices.liapp[0].arrtime[i].aptf))
				.appendTo('#timeFrom' + rowCount);
		// setCalander(rowCount);

	}
}

function removeDivNA() {

	var allVals = [];
	var p = 1;
	var rowCount = $("#RowCount").val();
	var addRowCount = $("#addRowCount").val();
	var deletedRowCounter = 0;
	for ( var n = 0; n < rowCount; n++) {
		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#div" + p).remove();
			deletedRowCounter++;
		}
		p++;
	}

	if (deletedRowCounter != 0) {
		rowCount = rowCount - deletedRowCounter;
		addRowCount = addRowCount - deletedRowCounter;
		$("#addRowCount").val(addRowCount);
		$("#RowCount").val(rowCount);
		
	}

	if (allVals.length != 0 && allVals[0] != "on") {
		var inputs = [];
		inputs.push('action=DeleteNA');
		inputs.push('allVals=' + allVals);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AppointmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				fetchNA();
			}
		});
	}

	/*
	 * var allVals = []; for ( var n = 1; n <= rowCount; n++) { var $radios =
	 * $('input:checkbox[name=checkbox' + n + ']'); if ($radios.is(':checked') ==
	 * true) { allVals.push($radios.val()); $("#div" + n).remove(); } }
	 */

}

function saveNA() {
	var na = {
		liNA : []
	};

	var rowCount = $("#RowCount").val();
	for ( var i = 1; i <= rowCount; i++) {

		var date1 = $("#date" + i).val();
		var txtDate = date1.split("-");

		if (txtDate == "") {
			alert("Please select date...");
			return;
		}

		if (txtDate[0].length <= 2) {
			txtDate = txtDate[2] + "-" + txtDate[1] + "-" + txtDate[0];
		} else {
			txtDate = date1;
		}
		// alert(txtDate);
		var txtTimeFrom = $("#timeFrom" + i).val();
		var txtTimeTo = $("#timeTo" + i).val();
		var txtNote = $("#note" + i).val();
		var txtHiddenNAID = $("#hiddenNAID" + i).val();

		if (txtDate == "" && txtTimeFrom == "" && txtTimeTo == ""
				&& txtNote == "") {
			alert("You can not save empty fields.");
			return false;

		} else if (txtDate != undefined) {

			na.liNA.push({
				"nte" : txtNote,
				"ttime" : txtTimeTo,
				"nid" : txtHiddenNAID,
				"ftime" : txtTimeFrom,
				"date" : txtDate,
			});

		}

	}

	if (na.liNA.length == 0) {
		return false;

	} else {
		na = JSON.stringify(na);
		var inputs = [];
		inputs.push('action=saveNA');

		inputs.push('selUserID=' + $("#selDocNm").val());
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		inputs.push('na=' + na);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AppointmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				fetchNA();
			}
		});
	}
}



var templateForDoctorNAButton = "<button class='btn btn-xs btn-success editUserAccess' name='btnSave' onclick='saveNA()' data-toggle='tooltip' data-placement='left' title='Save Details' disabled='disabled'><i class='fa fa-save'></i> </button>";
function setAvailableType() {
	var sample;
	$("#NAButton").setTemplate(templateForDoctorNAButton);
	$("#NAButton").processTemplate(sample);
}

var fetchAllDoctorTempForNA = "{#foreach $T as dl}<option onclick='fetchNA()' value='{$T.dl.user_ID}' >{$T.dl.doc_name}</option>{#/for}";
var fetchAllDoctorTempForDoctorAvailable = "{#foreach $T as dl}<option onclick='fetchDoctorAvailability()' value='{$T.dl.user_ID}' >{$T.dl.doc_name}</option>{#/for}";

function fetchAllDoctorForNA() {

	var inputs = [];
	inputs.push('action=fetchAllDoctor');
	inputs.push('callFrom=OTManagement')

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
	//	url : "DoctorServlet",
		url : "ehat/users/fetchAllDoctor",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			const response = JSON.stringify(ajaxResponse);
			objc = eval('(' + response + ')');

			$("#selDocNm").setTemplate(fetchAllDoctorTempForNA);
			$("#selDocNm").processTemplate(objc);
			
			$("#selDocNmForDA").setTemplate(fetchAllDoctorTempForDoctorAvailable);
			$("#selDocNmForDA").processTemplate(objc);
			
			setTimeout(function(){userAccess();},200);
		}
	});
}

var tempNA = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered' style='width : 1138px; margin-top: 9px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 3%;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 18%;'><div class='TextFont'>Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 17%;'><div class='TextFont'>From</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 18%;'><div class='TextFont'>To</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 29%;'><div class='TextFont'>Note</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 6%;'>"
		//Tushar Changes @8 Feb 2017
		+ "<input type='button' onclick='' value='+' id='createDivNA' />"
		+ "<input type='button' onclick='' value='-' id='removeDivNA' /></th>"
		//+ "<img id='createDivNA' src='images/plus.jpg' width='18' height='18' style='cursor: pointer;' />"
		//+ "<img id='removeDivNA' src='images/minus.jpg' width='18' height='18' style='cursor: pointer;' /></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' id='TimeslotTD{countForNATable}' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 320px; max-height: auto;'>"
		+ "<table class='table table-bordered table-condensed cf'>"
		+ "<tbody id='divTimeslotBody'>"
		+ "{#foreach $T.liNA as liNA}"
		+ "<tr id='div{countForNATable}'>"
		+ "<td class='col-sm-1-1 center' style='width: 3%; height: 40px;'>{countForNATable}</td>"
		+ "<td class='col-sm-1-1 center' style='width: 15%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;'>"
		+ "<input type='text' style='width: 90%;' name='date{countForNATable}' "
		+ "id='date{countForNATable}' value='{$T.liNA.date}' "
		+ "onclick=displayCalendar(document.getElementById('date{countForNATable}'),'dd/mm/yyyy',this) readonly='readonly' class='editUserAccess' disabled='disabled'/></td>"
		/*
		 * + "id='date{countForNATable}' value='{$T.liNA.date}'
		 * onclick='setCalander({countForNATable})' readonly='readonly'/></td>"
		 */
		+ "<td class='col-sm-1-1 center' style='width: 15.2%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;'>"
		+ "<select style='width: 100%;' name='timeFrom{countForNATable}' id='timeFrom{countForNATable}' class='editUserAccess' disabled='disabled'></select></td>"
		+ "<td class='col-sm-1-1 center' style='width: 15.2%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;'>"
		+ "<select style='width: 100%;' name='timeTo{countForNATable}' id='timeTo{countForNATable}' class='editUserAccess' disabled='disabled'></select></td>"
		+ "<td class='col-sm-1-1 center' style='width: 25%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: auto;'>"
		+ "<textarea style='width: 90%;' name='note{countForNATable}' class='demo editUserAccess' disabled='disabled' id='note{countForNATable}' cols=10 rows=1 >{$T.liNA.nte}</textarea></td>"
		+ "<td class='col-sm-1-1 center' style='width: 2%; padding-top: 8px; height: auto; margin-left: 3px'><input name='checkbox{countForNATable}' id='checkbox{countForNATable}' type='checkbox' value='{$T.liNA.nid}' class='NACheckbox' disabled='disabled'/><input type='hidden' id='hiddenNAID{countForNATable++}' value='{$T.liNA.nid}'></td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function fetchNA() {
	
	countForNATable = 1;
	var inputs = [];
	inputs.push('action=fetchNA');
	inputs.push('selDocNm=' + $("#selDocNm").val());
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
	//	url : "AppointmentServlet",
		url : "ehat/users/fetchNA",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			// alert(ajaxResponse);

			objc = eval('(' + ajaxResponse + ')');

			$("#divTimeslot").setTemplate(tempNA);
			$("#divTimeslot").processTemplate(objc);

			$("#RowCount").val(countForNATable - 1);

			for ( var j = 1; j < countForNATable; j++) {
				var timeSlices = $("#txtHidTimeSlices").val();
				// alert(timeSlices);
				timeSlices = eval('(' + timeSlices + ')');
				for ( var i = 0; i < timeSlices.liapp[0].arrtime.length; i++) {
					var arrangedTime = "";

					arrTime = timeSlices.liapp[0].arrtime[i].aptf.split(":");
					if (arrTime[0] > 12) {
						var hour = arrTime[0] - 12;
						hour = pad(hour, 2);
						arrTime[1] = pad(arrTime[1], 2);
						arrangedTime = hour + ":" + arrTime[1] + " PM";
					} else if (arrTime[0] < 12) {
						arrTime[0] = pad(arrTime[0], 2);
						arrTime[1] = pad(arrTime[1], 2);
						arrangedTime = arrTime[0] + ":" + arrTime[1] + " AM";
					} else if (arrTime[0] = 12) {
						arrTime[0] = pad(arrTime[0], 2);
						arrTime[1] = pad(arrTime[1], 2);
						arrangedTime = arrTime[0] + ":" + arrTime[1] + " PM";
					}
					
					
					
					$(
							new Option(arrangedTime,
									timeSlices.liapp[0].arrtime[i].aptf))
							.appendTo('#timeTo' + (j));
					$(
							new Option(arrangedTime,
									timeSlices.liapp[0].arrtime[i].aptf))
							.appendTo('#timeFrom' + (j));
					// setCalander(j + 1);

				}
				var b = objc.liNA[j - 1].ttime;
				// alert(b);
				b = b.split(" ");
				var time1 = b[0];
				var timecheck = b[1];

				var temp = time1.split(":");
				var temp2 = temp[1];
				var tempcheck2 = temp[0];
				if (timecheck == "pm") {
					tempcheck2 = 12 + parseInt(tempcheck2);
				}
				if (temp2 == 00) {
					temp2 = 0;
				}
				var temp3 = tempcheck2 + ":" + temp2;
				// alert(temp3);
				var c = objc.liNA[j - 1].ftime;
				c = c.split(" ");
				var ftime1 = c[0];
				var ftimecheck = c[1];
				var ftemp = ftime1.split(":");
				var ftemp2 = ftemp[1];
				var ftempcheck2 = ftemp[0];
				if (ftimecheck == "pm") {
					ftempcheck2 = 12 + parseInt(ftempcheck2);
				}
				if (ftemp2 == 00) {
					ftemp2 = 0;
				}
				var ftemp3 = ftempcheck2 + ":" + ftemp2;
				$("#timeTo" + j).val(temp3);

				$("#timeFrom" + j).val(ftemp3);

			}
		}
	});
	setTimeout(function(){userAccess();},1000);
}

var templateForDoctorAvailable = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered' style='width : 1138px; margin-top: 9px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 3%;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 18%;'><div class='TextFont'>Date</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 17%;'><div class='TextFont'>From</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 18%;'><div class='TextFont'>To</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 29%;'><div class='TextFont'>Note</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px; width: 6%;'>"
	//Tushar Changes @8 Feb 2017 
	+ "<input type='button' onclick='' value='+' id='createDivForDoctorAvailable' />"
	+ "<input type='button' onclick='' value='-' id='removeDivForDoctorAvailable' /></th>"
	//+ "<img src='images/plus.jpg' width='18' height='18' id='createDivForDoctorAvailable' style='cursor: pointer;' />"
	//+ " <img src='images/minus.jpg' width='18' height='18'	id='removeDivForDoctorAvailable' style='cursor: pointer;' /></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' id='TimeslotTDForDoctor{countForDoctorTable}' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 320px; max-height: auto;'>"
	+ "<table class='table table-bordered table-condensed cf'>"
	+ "<tbody id='divTimeslotBodyForDoctor'>"
	+ "{#foreach $T.liNA as liNA}"
	+ "<tr id='divForDoctor{countForDoctorTable}'>"
	+ "<td class='col-sm-1-1 center' style='width: 3%; height: 40px;'>{countForDoctorTable}</td>"
	+ "<td class='col-sm-1-1 center' style='width: 15%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;'>"
	+ "<input type='text' style='width: 90%;' name='dateForDoctor{countForDoctorTable}' "
	+ "id='dateForDoctor{countForDoctorTable}' value='{$T.liNA.date}' "
	+ "onclick=displayCalendar(document.getElementById('date{countForDoctorTable}'),'dd/mm/yyyy',this) readonly='readonly'/></td>"
	
	+ "<td class='col-sm-1-1 center' style='width: 15.2%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;'>"
	+ "<select style='width: 100%;' name='timeFromForDoctor{countForDoctorTable}' id='timeFromForDoctor{countForDoctorTable}'></select></td>"
	+ "<td class='col-sm-1-1 center' style='width: 15.2%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;'>"
	+ "<select style='width: 100%;' name='timeToForDoctor{countForDoctorTable}' id='timeToForDoctor{countForDoctorTable}'></select></td>"
	+ "<td class='col-sm-1-1 center' style='width: 25%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: auto;'>"
	+ "<textarea style='width: 90%;' name='noteForDoctor{countForDoctorTable}' class='demo' id='noteForDoctor{countForDoctorTable}' cols=10 rows=1 >{$T.liNA.nte}</textarea></td>"
	+ "<td class='col-sm-1-1 center' style='width: 2%; padding-top: 8px; height: auto; margin-left: 3px'><input class='doctorAvailableCheckbox' name='checkboxForDoctor{countForDoctorTable}' id='checkboxForDoctor{countForDoctorTable}' type='checkbox' value='{$T.liNA.nid}' disabled='disabled'/><input type='hidden' id='hiddenIDForDoctor{countForDoctorTable++}' value='{$T.liNA.nid}'></td>"
	+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var templateForDoctorButton = "<button class='btn btn-xs btn-success editUserAccess' name='btnSave' onclick='saveDoctorAvailability()' data-toggle='tooltip' data-placement='left' title='Save Details' disabled='disabled'><i class='fa fa-save'></i> </button>";

function fetchDoctorAvailability(){
	countForDoctorTable = 1;
	var inputs = [];
	inputs.push('action=fetchDoctorAvailable');
	inputs.push('selDocNmForDA=' + $("#selDocNmForDA").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AppointmentServlet",
		url : "ehat/users/fetchDoctorAvailable",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			objc = eval('(' + ajaxResponse + ')');
			var sample;
			$("#divTimeslotForDoctor").setTemplate(templateForDoctorAvailable);
			$("#divTimeslotForDoctor").processTemplate(objc);
			$("#NAButton").setTemplate(templateForDoctorButton);
			$("#NAButton").processTemplate(sample);
			
			$("#RowCountForDoctor").val(countForDoctorTable - 1);

			for ( var j = 1; j < countForDoctorTable; j++) {
				var timeSlices = $("#txtHidTimeSlices").val();
				//alert(timeSlices);
				timeSlices = eval('(' + timeSlices + ')');
				for ( var i = 0; i < timeSlices.liapp[0].arrtime.length; i++) {
					var arrangedTime = "";

					arrTime = timeSlices.liapp[0].arrtime[i].aptf.split(":");
					if (arrTime[0] > 12) {
						var hour = arrTime[0] - 12;
						hour = pad(hour, 2);
						arrTime[1] = pad(arrTime[1], 2);
						arrangedTime = hour + ":" + arrTime[1] + " PM";
					} else if (arrTime[0] < 12) {
						arrTime[0] = pad(arrTime[0], 2);
						arrTime[1] = pad(arrTime[1], 2);
						arrangedTime = arrTime[0] + ":" + arrTime[1] + " AM";
					} else if (arrTime[0] = 12) {
						arrTime[0] = pad(arrTime[0], 2);
						arrTime[1] = pad(arrTime[1], 2);
						arrangedTime = arrTime[0] + ":" + arrTime[1] + " PM";
					} 
					
					$(
							new Option(arrangedTime,
									timeSlices.liapp[0].arrtime[i].aptf))
							.appendTo('#timeToForDoctor' + (j));
					$(
							new Option(arrangedTime,
									timeSlices.liapp[0].arrtime[i].aptf))
							.appendTo('#timeFromForDoctor' + (j));
					// setCalander(j + 1);

				}
				var b = objc.liNA[j - 1].ttime;
				//alert(b);
				b = b.split(" ");
				var time1 = b[0];
				var timecheck = b[1];

				var temp = time1.split(":");
				var temp2 = temp[1];
				var tempcheck2 = temp[0];
				if (timecheck == "pm") {
					tempcheck2 = 12 + parseInt(tempcheck2);
				}
				if (temp2 == 00) {
					temp2 = 0;
				}
				var temp3 = tempcheck2 + ":" + temp2;
				// alert(temp3);
				var c = objc.liNA[j - 1].ftime;
				c = c.split(" ");
				var ftime1 = c[0];
				var ftimecheck = c[1];
				var ftemp = ftime1.split(":");
				var ftemp2 = ftemp[1];
				var ftempcheck2 = ftemp[0];
				if (ftimecheck == "pm") {
					ftempcheck2 = 12 + parseInt(ftempcheck2);
				}
				if (ftemp2 == 00) {
					ftemp2 = 0;
				}
				var ftemp3 = ftempcheck2 + ":" + ftemp2;
				$("#timeToForDoctor" + j).val(temp3);
				$("#timeFromForDoctor" + j).val(ftemp3);

			}
			setTimeout(function(){userAccess();},200);
		}
	});
}
var z = 1;
function createDivForDoctorAvailable() {

	var rowCount = $("#RowCountForDoctor").val();
	rowCount++;
	var timeSlices = $("#txtHidTimeSlices").val();
	timeSlices = eval('(' + timeSlices + ')');

	divId = "divForDoctor" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	// x.setAttribute('style', 'width: 100%; ');
	document.getElementById("divTimeslotBodyForDoctor").appendChild(x);
	document.getElementById(divId).innerHTML = '<td class="col-sm-1-1 center" style="width: 3%; height: 40px;">'
			+ (rowCount)
			+ '</td><td class="col-sm-1-1 center" style="width: 18%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;">'
			+ '<input type="text" readonly="readonly" style="width: 90%;" name="dateForDoctor'
			+ (rowCount)
			+ '" onclick="displayCalendar(document.getElementById(\'dateForDoctor'
			+ rowCount
			+ '\'),\'dd/mm/yyyy\',this)'
			+ '" id="dateForDoctor'
			+ (rowCount)
			+ '"  /></td>'
			+ '<td class="col-sm-1-1 center" style="width: 17%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;">'
			+ '<select style="width: 100%;" name="timeFromForDoctor"	id="timeFromForDoctor'
			+ (rowCount)
			+ '"></select></td><td class="col-sm-1-1 center" style="width: 18%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: 40px;">'
			+ '<select style="width: 100%;" name="timeToForDoctor" id="timeToForDoctor'
			+ (rowCount)
			+ '"></select></td>'
			+ '<td class="col-sm-1-1 center" style="width: 29%; padding-top: 8px; border-right: 1px solid #b8b8b8; height: auto;">'
			+ '<textarea class="demo" rows="1" cols="10" name="noteForDoctor" style="width: 90%;" id="noteForDoctor'
			+ (rowCount)
			+ '" cols=10 rows=1 ></textarea></td>'
			+ '<td class="col-sm-1-1 center" style="width: 2%; padding-top: 8px; height: auto; margin-left: 3px"><input name="checkboxForDoctor'
			+ (rowCount) + '" id="checkboxForDoctor" type="checkbox" /><input type="hidden" id="hiddenIDForDoctor'
			+ (rowCount)
			+ '" value="0"></td>';
	$("#RowCountForDoctor").val(rowCount);
	$("#addRowCountForDoctor").val(z);
	z++;

	for ( var i = 0; i < timeSlices.liapp[0].arrtime.length; i++) {
		var arrangedTime = "";

		arrTime = timeSlices.liapp[0].arrtime[i].aptf.split(":");
		if (arrTime[0] > 12) {
			var hour = arrTime[0] - 12;
			hour = pad(hour, 2);
			arrTime[1] = pad(arrTime[1], 2);
			arrangedTime = hour + ":" + arrTime[1] + " PM";
		} else if (arrTime[0] < 12) {
			arrTime[0] = pad(arrTime[0], 2);
			arrTime[1] = pad(arrTime[1], 2);
			arrangedTime = arrTime[0] + ":" + arrTime[1] + " AM";
		} else if (arrTime[0] = 12) {
			arrTime[0] = pad(arrTime[0], 2);
			arrTime[1] = pad(arrTime[1], 2);
			arrangedTime = arrTime[0] + ":" + arrTime[1] + " PM";
		}

		$(new Option(arrangedTime, timeSlices.liapp[0].arrtime[i].aptf))
				.appendTo('#timeToForDoctor' + rowCount);
		$(new Option(arrangedTime, timeSlices.liapp[0].arrtime[i].aptf))
				.appendTo('#timeFromForDoctor' + rowCount);
	}
}

function removeDivForDoctorAvailable() {

	var allVals = [];
	var p = 1;
	var rowCount = $("#RowCountForDoctor").val();
	var deletedRowCounter = 0;
	for ( var n = 0; n < rowCount; n++) {
		var $radios = $('input:checkbox[name=checkboxForDoctor' + p + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#div" + p).remove();
			
			$("#divForDoctor"+p).remove();
			deletedRowCounter++;
		}
		p++;
	}

	
	//suraj changes to solved doctors not available
	/*if (deletedRowCounter != 0) {
		rowCount = rowCount - deletedRowCounter;
		$("#RowCountForDoctor").val(rowCount);
	}*/

	if (allVals.length != 0 && allVals[0] != "on") {
		var inputs = [];
		inputs.push('action=DeleteDoctorAvailable');
		inputs.push('allVals=' + allVals);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AppointmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				fetchDoctorAvailability();
			}
		});
	}
}

function saveDoctorAvailability() {
	var na = {
		liNA : []
	};

	var rowCount = $("#RowCountForDoctor").val();
	for ( var i = 1; i <= rowCount; i++) {
		
		if($("#divForDoctor"+i).length) 
		{
			var date1 = $("#dateForDoctor" + i).val();
			var txtDate = date1.split("-");

			if (txtDate == "") {
				alert("Please select date...");
				return;
			}

			if (txtDate[0].length <= 2) {
				txtDate = txtDate[2] + "-" + txtDate[1] + "-" + txtDate[0];
			} else {
				txtDate = date1;
			}
			
			var txtTimeFrom = $("#timeFromForDoctor" + i).val();
			var txtTimeTo = $("#timeToForDoctor" + i).val();
			var txtNote = $("#noteForDoctor" + i).val();
			var txtHiddenNAID = $("#hiddenIDForDoctor" + i).val();

			if (txtDate == "" && txtTimeFrom == "" && txtTimeTo == ""
					&& txtNote == "") {
				alert("You can not save empty fields.");
				return false;

			} else if (txtDate != undefined) {

				na.liNA.push({
					"nte" : txtNote,
					"ttime" : txtTimeTo,
					"nid" : txtHiddenNAID,
					"ftime" : txtTimeFrom,
					"date" : txtDate,
				});

			}
		}

		

	}

	if (na.liNA.length == 0) {
		return false;

	} else {
		na = JSON.stringify(na);
		var inputs = [];
		inputs.push('action=saveDoctorAvailability');
		inputs.push('selUserID=' + $("#selDocNmForDA").val());
		inputs.push('na=' + na);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AppointmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				fetchDoctorAvailability();
			}
		});
	}
}


function fetchTimeSlots() {
	var inputs = [];
	inputs.push('action=FetchAppointmentTime');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "AppointmentServlet",
		url : "ehat/scheduler/fetchList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			const myJSON = JSON.stringify(ajaxResponse);
			objc = eval('(' + myJSON + ')');
			$("#txtHidTimeSlices").val(objc);
		}
	});

	setTimeout(function() {
		fetchNA();
	}, 1000);

}
/** *******************End NA*************************************** */

// Common document ready function
$(document).ready(function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');
	} catch (e) {
	}

	try {
		$.unblockUI();
	} catch (e) {
	}
	if (window.initLogOut)
		initLogOut();
});

function initTemplate() {

}

function AdvSearch(){
	$("#AdvSearchPop").modal('show');	
}
function hideAdvSearch() {
	$("#AdvSearchPop").modal('hide');
}
function setSpecilizationAndDepart() {
	ajaxResponse = $("#doctorObject").html();
	doctorBean = eval('(' + ajaxResponse + ')');
	var docId = $('#igetDoc').val();
	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].di == docId) {
			$('#igetSpec').val(doctorBean.dl[i].sp);
			$('#igetDept').val(doctorBean.dl[i].dept);
			return false;
		}
	}
}
function setDoctorsForDepart() {
	var doctorObjects = {
		dl : []
	};
	ajaxResponse = $("#doctorObject").html();
	doctorBean = eval('(' + ajaxResponse + ')');
	var specializationId = $('#igetDept').val();
	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].sp == specializationId) {
			doctorObjects.dl.push(doctorBean.dl[i]);
		}
	}
	$('#igetDoc').setTemplate(docNameTemplateForOPD);
	$('#igetDoc').processTemplate(doctorObjects);
}

function searchDoctorWise(){
	$("#AdvSearchPop").modal('hide');
	var doctorID = $("#igetDoc").val();
	var specializationID = $("#igetSpec").val();
	var departmentID = $("#igetDept").val();
	
		if ((doctorID == "" || doctorID == 0) && (specializationID == "" || specializationID == 0) && (departmentID == "" || departmentID == 0)) {
			alert("Please Search  By Either Doctor,specialization OR Department!");
			return false;
		} 
		
	var inputs = [];
	inputs.push('action=searchDoctorWise');
	inputs.push('doctorID=' + doctorID);
	inputs.push('specializationID=' + specializationID);
	inputs.push('departmentID=' + departmentID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AppointmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			
			$("#appointedpatientDiv").html(ajaxResponse);
			var PatientAppointmentsBean1 = eval('(' + ajaxResponse + ')');
			if (PatientAppointmentsBean1.al.length == 0) {
				alert("Doctor Details Not Found");
				return false;
			}
			var demoBean;
			count = 1;
			$("#headerDiv").setTemplate(headerTemplateForAppo);
			$("#headerDiv").processTemplate(demoBean);
			$("#container").setTemplate(containerTemplateForAppo);
			$("#container").processTemplate(PatientAppointmentsBean1);
			
			setDocNameForCommonAppo("doc", count, "divP");
			fetchDoctorSpecilizations("spl", count, "divPii");
			fetchHospitalDepartments("dept", count, "divPiii");
			var userRole = $("#userRoleopd").val();
			var userRoleName = $("#userRoleName").val();
			if (userRole == "admin") {
			} else {

				for ( var i = 0; i < PatientAppointmentsBean.al.length; i++) {

					if (PatientAppointmentsBean.al[i].fg == "Y") {
						$('#btnView' + (i + 2)).addClass('btn btn-xs btn-primary');
						$('#btnView' + (i + 2)).css({
							'width' : '80%',
							'border-radius' : '5px',
							'margin-top' : '3px'
						});

						$('#btnView' + (i + 2)).attr("disabled",
								"disabled");
						$('#divP' + (i + 2) + ' select').attr(
								"disabled", true);
						$('#divPii' + (i + 2) + ' select').attr(
								"disabled", true);
						$('#divPiii' + (i + 2) + ' select').attr(
								"disabled", true);

					} else if (PatientAppointmentsBean.al[i].dfg == "N") {
						$('#btnView' + (i + 2)).css({
							//backgroundColor : 'red'
						});
						$('#btnView' + (i + 2)).attr("disabled",
								"disabled");
						$('#divP' + (i + 2) + ' select').attr(
								"disabled", true);
						$('#divPii' + (i + 2) + ' select').attr(
								"disabled", true);
						$('#divPiii' + (i + 2) + ' select').attr(
								"disabled", true);
					}
				}
			}
		}

	});
};

var containerTemplateFordocList = "{#foreach $T.listDoctor as al} <tr id='colorDiv{$T.al.pi}'> "
	+ "<td class='col-md-1-1'>{trCount++}.</td> "
	+ "<td class='col-md-2-1'>{$T.al.dn}</td> "
	+ "<td class='col-md-1-1'>{$T.al.ddn}</td> "
	+ "<td class='col-md-1-1'>{$T.al.dsn}</td> "
	+ "<td class='col-md-1-1'>{$T.al.ad}</td> "
	+ "{#if $T.al.queueStatus == 'out'}"
	+ "<td style='height: 21.5px;' class='col-md-1-1'><i type='button' onclick=editConsDoc({$T.al.di},{$T.al.splId},{$T.al.depId},'{$T.al.ad}',{$T.al.paid}) style='margin-center: 6px;cursor: pointer;' class='fa fa-edit fa-1x editBtn' id='hiddenR1' hidden='hidden'>  </i>" +
	"&nbsp;&nbsp;&nbsp;<i type='button' onclick='delConsDoc({$T.al.pi},{$T.al.trid},{$T.al.di})' style='margin-center: 6px;cursor: pointer;' class='fa fa-trash-o fa-1x deleteBtn' id='hiddenR1' hidden='hidden'>  </i></td>"
	+"{#else}"
	/*+ "<td style='height: 21.5px;' class='col-md-1-1'><i type='button' onclick=editConsDoc({$T.al.di},{$T.al.splId},{$T.al.depId},'{$T.al.ad}',{$T.al.paid}) style='margin-center: 6px;cursor: pointer;' class='fa fa-edit fa-1x editBtn' id='hiddenR1'>  </i>" +
	"&nbsp;&nbsp;&nbsp;<i type='button' onclick='delConsDoc({$T.al.pi},{$T.al.trid},{$T.al.di})' style='margin-center: 6px;cursor: pointer;' class='fa fa-trash-o fa-1x deleteBtn' id='hiddenR1'>  </i></td>"*/
	+ "<td style='height: 21.5px;' class='col-md-1-1'>" +
	"&nbsp;&nbsp;&nbsp;<i type='button' onclick='delConsDoc({$T.al.pi},{$T.al.trid},{$T.al.di})' style='margin-center: 6px;cursor: pointer;' class='fa fa-trash-o fa-1x deleteBtn' id='hiddenR1'>  </i></td>"
	+"{#/else }{#/if}"
	+ "</tr>{#/for}";

var containerTemplateFordocList1 = "{#foreach $T.listDoctor as al} <tr id='colorDiv{$T.al.pi}'> "
	+ "<td class='col-md-1-1'>{trCount++}.</td> "
	+ "<td class='col-md-4-1'>{$T.al.dn}</td> "
	+ "<td class='col-md-2-1'>{$T.al.ddn}</td> "
	+ "<td class='col-md-2-1'>{$T.al.dsn}</td> "
	+ "<td class='col-md-2-1'>{$T.al.ad}</td> "
	+ "</tr>{#/for}";


function setPatientId(patId,treatId){
		
	$('#patientId').html(patId);
	$('#treatmentId').html(treatId);
	changeConsDoc(0,0,0,0,0,0,0,0,0,0,0,0);
}

function changeConsDoc(di,splId,depId,count,date,paid,pid,trid,tit,fn,mn,ln){
	
	var fullName = "";
	if(paid=="" || paid==0){
		paid = $('#patientOPDId').val();
	}
	if(pid=="" || pid==0){
		//pid = $('#pid').html();
		pid = ($('#patientId').html()).trim();		
	}
	if(trid=="" || trid==0){
		//trid = $('#trid').val();
		trid = ($('#treatmentId').html()).trim();		
	}
	var callFrom = $('#callFrom').val();
	fullName = tit +" "+ fn +" "+ mn +" "+ln;
	
	var inputs = [];
	inputs.push('action=getOPDConsDoc');
	inputs.push('pid=' + pid);
	inputs.push('trid=' + trid);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			
			var ajaxResponse = r;
			$("#conDocsList").html(r);
		//	alert("ajaxResponse..."+ajaxResponse);
			$("#doctorId").val(di);
			$("#cathConsTrolleyDiv").html(ajaxResponse);
			if(fn!=undefined || ln!=undefined ){
				$("#patIDLoad").val(pid);
				$("#patNameLoad").val(fullName);
			}
			$("#patIDSpan").html(pid);
			$("#patNamSpan").html(fullName);
			$("#pID").val(pid);
			$('#trId').val(trid);
			$('#paid').val(paid);
			$('#splId').val(splId);
			$('#depId').val(depId);
			
			var PatientAppointmentsBean = eval('(' + ajaxResponse + ')');
			for(var i=0; i<PatientAppointmentsBean.listDoctor.length; i++){
			if (PatientAppointmentsBean.listDoctor.length == 0) {
				alert("Doctor Details Not Found");
				return false;
			}else{
				if(callFrom == 'previousTreatmentOPDER'){
					$("#iConsDocTable").setTemplate(containerTemplateFordocList1);
					$("#iConsDocTable").processTemplate(PatientAppointmentsBean);
				}else{
					$("#iConsDocTable").setTemplate(containerTemplateFordocList);
					$("#iConsDocTable").processTemplate(PatientAppointmentsBean);
				}
			}
			trCount = 1;
		   }
		}
	});
	viewConsultationPopUP();
}

function viewConsultationPopUP(){
		
	var pid = $("#patientId").html();//$("#patIDLoad").val();
	var fullName = $("#patNameLoad").val();
	$("#divConsDoc").modal('show');
	$("#patIDSpan").html(pid);
	$("#patNamSpan").html(fullName);	
}

function closeConsultationPopUP(){
	$("#divConsDoc").modal('hide');
	//setAppoTimeWatchesForOPD("load");
}

function addNewConsDoc(){
	
	$("#iDate").val("");
	$("#iTime").val("");
	$("#iConsDoc").val(0);
	$("#iConsSpec").val(0);
	$("#iConsDept").val(0);
	$("#iSaveConsultationDoctor").val("insert");	
}


//Author : Vinod @13April Add New Consulting Doctor
 function saveConsultationDoctor(){
	
	 var queryType = $("#docQueryType").val(); //$('#iSaveConsultationDoctor').val();
	 /*if(queryType == 'insert'){
			var r = confirm("You Want To Close Previous Doctor Consultation?");
			if (r == true) {
			   	checkUpDone('out');
			}
	 }*/
	 
	 if(queryType == "insert"){
		 
		 var today = new Date();
		 var dd = today.getDate();
		 var mm = today.getMonth()+1; //January is 0!
		 var yyyy = today.getFullYear();
	
		 if(dd<10) {
		     dd='0'+dd;
		 } 
	
		 if(mm<10) {
		     mm='0'+mm;
		 } 
	
		today = dd+'/'+mm+'/'+yyyy;	
		var date = $('#iDate').val();
	    if (date < today) {
	    		alert("Date should not add before Date of current date.");
	    		return false;
	    	}
		/*var time = $('#iTime').val();*/
		
		var count =0;
		if (date == "") {
			alert("Please select date");
			$('#iDate').focas();
			return false;
		}
		/*if (time == "") {
			alert("Please select time");
			$('#iTime').focas();
			return false;
		}*/
		if (docId == 0) {
			alert("Please select Doctor");
			$('#iConsDoc').focas();
			return false;
		}
	}
	 
 	var docId = $('#iConsDoc').val();
	var specId = $('#iConsSpec').val();
	var deptId = $('#iConsDept').val();
	var pid = $('#patIDLoad').val();
	var fullName= $('#patNameLoad').val();
	var trid = ($('#treatmentId').html()).trim();//$('#trId').val();
	var intRowId = $('#paid').val();
	var preDocId = $('#preDocId').val();
	
	if(pid == undefined || pid == null){
		pid = $('#patIDSpan').html();
	}
	
	var inputs = [];
	inputs.push('patientId=' + pid);
	inputs.push('treatmentId=' + trid);
	inputs.push('serviceDate=' + date);		
	inputs.push('doctorId=' + docId);
	inputs.push('queryType=' + queryType);
	/* inputs.push('specId=' + specId);
	inputs.push('deptId=' + deptId);
	inputs.push('intRowId=' + intRowId);
	inputs.push('preDocId=' + preDocId);
	inputs.push('time=' + time); */		
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/addNewConsultantOpd",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			
			if(r==-5){
				
				alert("Doctor already exist");				
				return false;
			}
			$("#iDate").val("");
			$("#iTime").val("");
			$("#iConsDoc").val(0);
			$("#iConsSpec").val(0);
			$("#iConsDept").val(0);
			$("#docQueryType").val("insert");
			changeConsDoc(docId,specId,deptId,count,date,intRowId,pid,trid,0,0,0,0);
		}
	});
}
function delConsDoc(pid,trid,docId){
		/*var splId = 0;
		var depId = 0;
		var intRowId = 0;
		var date = 0;
		var paid = 0;
		var inputs = [];
		inputs.push('action=delRecOPDConsDoc');
		inputs.push('pid=' + pid);
		inputs.push('trid=' + trid);
		inputs.push('docId=' + docId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "DoctorServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				changeConsDoc(docId,splId,depId,intRowId,date,paid,pid,trid);
			}
		});*/
	
	var r = confirm("Are You Sure You Want To Delete Doctor ");
	if (r == true) {
		
		$("#docQueryType").val("delete");
		$("#iConsDoc").val(docId);
		$("#treatmentId").html(trid);
		$("#patIDSpan").html(pid);	
		
		saveConsultationDoctor();
	}	
}
function editConsDoc(docId,spclId,deptId,date,paid){
	var date1 = date.split("-");
	var appDate = date1[2] + "/" + date1[1] + "/" + date1[0];
	
	
	$('#iConsDoc').val(docId);
	$('#iConsSpec').val(spclId);
	$('#iConsDept').val(deptId);
	$('#paid').val(paid);
	$('#iDate').val(appDate);
	$('#preDocId').val(docId);
	$("#iSaveConsultationDoctor").val("update");
}

function checkUpDone(docBill){
	//Modify by Laxman on 29-Dec-2017.
	var pid = $('#pt_Id').val();
	var trid = $('#tr_Id').val(); 
	var splId = $('#cancelNarration').val();
	//var depId = $('#depId').val();
	var pageName = $('#pageName').val();
	var rowId = $('#pt_Id').val();
	var tokenNo = $('#token_No').val();
	var docId = $('#doctorId').val();
	
	if(rowId == undefined || rowId == ""){
		rowId = $("#paid").val();
	}
	
	//alert("========"+docId+"======"+trid+"======"+splId+"======"+pageName+"======"+rowId+"====="+docBill+"===="+tokenNo);
   	//sendTODoc(rowId, count, docBill);
	var inputs = [];
		inputs.push('action=updateRecOPD');
		inputs.push('specilizationId=' + splId);
		//inputs.push('departmentId=' + depId);
		inputs.push('rowId=' + rowId);
		inputs.push('docId=' + docId);
		inputs.push('docBill=' + docBill);
		inputs.push('pageName=' + pageName);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "DoctorServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				if(docBill=="cancel"){
				alert("Check up Cancel successfully.");
				}else{
					alert("Check up Done successfully.");
				}
				if(pageName=="OPDOldPatientDatabase"){
					changeConsDoc(docId,splId,depId,0,0,rowId,pid,trid);	
				}
			}
		});
    
}


/***********
 * @author	: Sagar Kadam
 * @date	: 25-jun-2017
 * @reason	: get Doctor Name for Common template on UI
 **********/ 
function getDoctornameForCommonTemp2(drid) {
   // alert("in dr"+drid);
 	var docName="";
 	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: {
		 "drid" : drid,
 			},
		url 	: "ehat/markvisit/getDoctorName",
		
		error 	: function() {
 		},
		success : function(r) {
			console.log(r);
			ajaxResponse = r;
			
			//$("#consultingDoctor").text(r.lstDoctorDto[0].doc_name);
			
			//docName=r.lstDoctorDto[0].doc_name;
			
		}
	});
 	
 	return docName;
}

/***********
 * @author	: Laxman Nikam
 * @date	: 05-Jan-2018
 * @reason	: Check OPD send patiend Limit.
 **********/ 

function checkSendPatientLimit(doctorId)
{
	//debugger;
	var inputs = [];
	inputs.push('doctorId=' + doctorId);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/registration/checkSendPatientLimit",
		success : function(r) {
			 console.log(r);
			 if(r!="True"){
				 alert(r);
				 $("#sndPatientLimit").val("False");
				 return false;
			 }else{
				 $("#sndPatientLimit").val("True");
				 return true;
			 }
			 //AppoTimeWatchesForOPD();
			 //location.reload();
			},
		error :function(r){
			alert("Network Issue!");
			console.log(r);
		}
	});
}



function setSpecilizationAndDepartmentForAdvanceSearch(count) {
	if(count == "" || count == 0){
		count = $("#count").val();
	}
	ajaxResponse = $("#doctorObject").html();
	doctorBean = eval('(' + ajaxResponse + ')');
	docIdd = $("#iAdvanceConsDoc").val();
	
	for ( var i = 0; i < doctorBean.dl.length; i++) {
		if (doctorBean.dl[i].di == docIdd) {
			
			$('#iAdvanceConsSpec').val(doctorBean.dl[i].sp);
			$('#iAdvanceConsDept').val(doctorBean.dl[i].dept);
		}
	}
}