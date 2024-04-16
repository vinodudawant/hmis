var rowCount = 1;
var k = 1;
var count = 1;
var sr = 1;
var countT = 0;
var IPD_DischargeTemp = "<div style='width: 100%; height: 1%; background-color: #85a7d4;'></div><div style='width: 100%; height: 99%;'><div id='rightContActual'><div	style='width: 98%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'><div style='width: 20%;'><img src='images/patientPhoto.jpg'	width='50%' height='50%' /></div><div style='width: 80%;'><div style='width: 100%;'><div style='width: 40%;'><div style='width: 100%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Patient ID</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>0000002</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Treatment ID</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>0000001</div></div><div style='width: 100%; padding-top: 2%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>First Name</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>Abhishek</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Last Name</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>Rawal</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 15%; padding-left: 7%; font-weight: bold;'>Gender</div><div style='width: 16%; padding-right: 12%; color: #002c67;'>M</div><div style='width: 15%; font-weight: bold;'>Age</div><div style='width: 23%; padding-right: 7%; color: #002c67;'>23</div></div></div><div style='width: 60%;'><div style='width: 100%;'><div style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Cath No.</div><div style='width: 33%; padding-right: 7%; color: #002c67;'>173452</div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Doctor In-Charge</div><div style='width: 33%; padding-right: 7%; color: #002c67;'>Dr. Abhishek</div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Doctor Assistant</div><div style='width: 33%; padding-right: 7%; color: #002c67;'>Dr. Lol</div></div><div style='width: 100%; padding-top: 1%;'><div	style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Scrab	Brother</div><div style='width: 33%; padding-right: 7%; color: #002c67;'>Somebody</div></div><div style='width: 100%; padding-top: 1%;'><div style='width: 35%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Procedure</div><div style='width: 33%; padding-right: 7%; color: #002c67;'>CMS</div></div></div></div><div style='width: 97%; padding-top: 2%; padding-left: 3%;'><div style='width: 8%; padding-right: 1%;'><strong>In-Time</strong></div><div style='width: 20%; color: #002c67; padding-right: 2%;'>12-03- 2012 / 6:10pm</div><div style='width: 8%; padding-right: 1%;'><strong>Out-Time</strong></div><div style='width: 20%; color: #002c67; padding-right: 2%;'>12-03- 2012 / 6:10pm</div><div style='width: 20%; padding-right: 1%;'><strong>Sheet removed By:</strong></div><div style='width: 15%; color: #002c67;'>Dr. Sheetal</div></div></div></div></div></div></div></div>";

var containerTemplateForUser = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed' style='margin-top: 15px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='center' style='height: 21.5px;padding-left: 10px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;padding-left: 10px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-left: 10px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-left: 22px;'><div class='TextFont'>View</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-left: 20px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 1px;'><div class='TextFont'>Admission Print</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 1px;'><div class='TextFont'>Bill History</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 1px;'><div class='TextFont'>Delete</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 1px;'><div class='TextFont'>Mark Visit</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 1px;'><div class='TextFont'>Print Card</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right: 10px;'><div class='TextFont'>Common Advance</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 408px; max-height: auto;'>"
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr id='trcount{count}'>"
		+ "<td class='center' style='height: 21.5px;margin-right:2px;'>{count}.</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'><div id='pName{count}' class='pName{count}'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div></td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.pl.rgDt}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='VIEW' id='btnView{count}' onclick='passToView({$T.pl.pi})'>"
		+ "<i class='fa fa-eye View'></i>"
		+ "</button>"
		+ "</td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit{count}' disabled = 'disabled' onclick='passToEdit({$T.pl.pi})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "</td>"
		
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit{count}' disabled = 'disabled' onclick='passToAdmissionPrint({$T.pl.pi})'>"
		+ "<i class='fa fa-print'></i>"
		+ "</button>"
		+ "</td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-info' onclick='viewBillHistory({$T.pl.pi})'>"
		+ "<i class='fa fa-file-text-o'></i>"
		+ "</button>"
		+ "</td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete{count}' disabled = 'disabled' onclick='deletePatient({$T.pl.pi},{$T.pl.objTreat.ti})'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button>"
		+ "</td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "{#if $T.pl.objTreat.tf == 'ACTIVE'}<button class='btn btn-xs btn-primary editUserAccess' disabled = 'disabled' value='MARK' onclick=''>  <i class='fa fa-times' class='edit'>  </i></button>{#/if}{#if $T.pl.objTreat.tf == 'INACTIVE'}<button class='btn btn-xs btn-success editUserAccess' disabled = 'disabled' value='MARK' onclick='sendToMarkVisit({$T.pl.pi})' data-target='#ICDCodePopUp' data-toggle='modal'><i class='fa fa-check' class='edit'></i></button>{#/if}"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-primary' value='PRINT' onclick='PrintCardFunction({$T.pl.pi})'><i class='fa fa-print' class='edit'></button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-warning' value='COMMONAD' onclick='addCommonAdvance({$T.pl.pi},{$T.pl.trid},{count++})'><i class='fa fa-money' class='edit'></button>"
		+ "</td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var containerTemplateForAdmin = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Edit</div></th>"

		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Bill History</div></th>"

		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Delete</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Mark Visit</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Print Card</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>Common Advance</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 408px; max-height: auto;'>"
		+ "<table class='table table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr id='trcount{count}'>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.rgDt}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='VIEW' id='btnView{count}' onclick='passToView({$T.pl.pi})'>"
		+ "<i class='fa fa-eye View'></i>"
		+ "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='passToEdit({$T.pl.pi})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-info' onclick='viewBillHistory({$T.pl.pi})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete{count}' disabled = 'disabled' onclick='deletePatient({$T.pl.pi},{$T.pl.objTreat.ti})'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-primary' value='MARK' onclick='printCard({$T.pl.pi})'><i class='fa fa-check' class='edit'></i></button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' title='Print'  value='PRINT' onclick='PrintCardFunction({$T.pl.pi})'><i class='fa fa-print' class='edit'></button>"
		+ "</td>" 
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-primary' value='COMMONAD' onclick='printCard({$T.pl.pi})'><i class='fa fa-print' class='edit'></button>"
		+ "</td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var viewPrevDocDeskPatientDistinctTemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='div{count}'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count}.</div><div style='width: 34%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.ln}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 12%; height: 25px; border-right: 1px solid #069;padding-left: 2%; padding-top: 3px; text-align: center;' onclick='hideShowPreTreatmentDoc({$T.pl.pi},{count})'><img src='images/down.png' id='imgupdown{count++}'/></div></div> {#/for}";

var viewPrevDocDeskPatientTemp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='div{count}'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 34%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.ln}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 11.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otd.ti}</div><div style='width: 16%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otd.dt}</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='VIEW DETAILS' onClick='ViewTreatment({$T.pl.otd.id},{$T.pl.otd.id})' /></div></div> {#/for}";

var patientInvestTemp = "{#foreach $T.pl as pl} <div style='width: 99.80%;  overflow: auto; '><div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.pi}</div><div style='width: 12.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.wt} kg.</div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick=viewInvest({$T.pl.pi}) style='font-size: 10px;'	type='button' value='VIEW INVESTIGATIONS' class='edit' /></div></div></div>{#/for}";

var patientDocDeskTemp1 = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 35%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.ag} {$T.pl.agtp}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.sx}</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input onclick='viewDoctorDesk({$T.pl.pi})' style='font-size: 10px;' type='button' value='VIEW DETAILS' /></div></div> {#/for}";

var IPD_DICTemp = "<div style='width: 99%; padding-left: 0%;'>"
		+ "<div style='width: 98%; background-color: #436a9d; padding-bottom: 1%;padding-top: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'><div style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>"
		+ "<div	style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Time</div>"
		+ "<div	style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Name of Drug</div>"
		+ "<div	style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Strength</div>"
		+ "<div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Dose</div>"
		+ "<div	style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Fluild OR Drips</div>"
		+ "<div	style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.8%;text-align: center;'>Strength</div>"
		+ "<div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Dose</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Sign</div></div></div></div>"
		+ "<div	style='width: 96%; height: 300px; overflow-y: auto; border: 1px solid #436a9d;' id='DRRDiv'>"
		+ "{#foreach $T.tnl as tnl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;background-color: lightgray;'>"
		+ "<div style='width: 3%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>"
		+ "<div	style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
		+ "<input style='width: 90%;background-color: lightgray;' type='text' onmouseover='click1()'  name='textfield' id='t{rowCount}' value='{$T.tnl.cut}' readonly='readonly'/></div>"
		+ "<div	style='width: 14.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
		+ "<input style='width: 90%;background-color: lightgray;' type='text' name='textfield' class='auto' id='dn{rowCount}' value='{$T.tnl.dn}' readonly='readonly'/></div>"
		+ "<div	style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
		+ "<input style='width: 90%;background-color: lightgray;' type='text' name='textfield' id='stren{rowCount}' value='{$T.tnl.stren}' readonly='readonly'/></div>"
		+ "<div	style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
		+ "<input style='width: 90%;background-color: lightgray;' type='text' name='textfield' id='dose{rowCount}' value='{$T.tnl.dose}' readonly='readonly'/></div>"
		+ "<div	style='width: 11.5%; height: 23px; border-right: 1px solid #069; padding-left: .5%; padding-top: 3px;text-align: center;'>"
		+ "<input style='width: 90%;background-color: lightgray;' type='text' name='textfield' class='auto' id='fd{rowCount}' value='{$T.tnl.fd}' readonly='readonly'/></div>"
		+ "<div	style='width:10%; height: 23px; border-right: 1px solid #069; padding-left: .5%; padding-top: 3px;text-align: center;'>"
		+ "<input style='width: 80%;background-color: lightgray;' type='text' name='textfield' id='fdq{rowCount}' value='{$T.tnl.fdq}' readonly='readonly'/></div>"
		+ "<div	style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;text-align: center;'>"
		+ "<input style='width: 90%;background-color: lightgray;' type='text' name='textfield' id='cmt{rowCount}' value='{$T.tnl.cmt}' readonly='readonly'/>"
		+ "<input style='width: 90%;' type='hidden' name='textfield' id='tnid{rowCount}' value='{$T.tnl.tnid}'/></div>"
		+ "<div id='sn{rowCount}' style='width: 12%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;' >{$T.tnl.objU.dn}</div>"
		+ "</div><input type='hidden' value='{$T.tnl.nid}' id='nid{rowCount}' />"
		+ "<input type='hidden'	value='{rowCount++}' id='txtRowCount' name='txtRowCount'/>{#/for}<input type='hidden' value='' id='addRowCount' />"
		+ "<input type='hidden'	value='{--rowCount}' id='RowCount'/>"
		+ "</div>";

var defaultNursingChart = "<div style='width: 100%; padding-left: 0%;'>"
		+ "<div style='width: 100%; background-color: ; padding-bottom: 1%;padding-top: 1%; font-weight: bold;'>"
		+ "<div style='width: 100%;'>"
		+ "<div style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>"
		+ "<div	style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Time</div>"
		+ "<div	style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Name of Drug</div>"
		+ "<div	style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Strength</div>"
		+ "<div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Dose</div>"
		+ "<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Sign</div>"
		+ "</div></div></div>"
		+ "<div	style='width: 96%; height: 300px; overflow-y: auto; border: 1px solid #436a9d;' id='DRRDiv'>"
		+ "{#foreach $T.nursingChart as tnl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;background-color: lightgray;'>"
		+ "<div style='width: 3%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>"
		+ "<div	style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
		+ "<input style='width: 90%;' type='text' onmouseover='click1()'  name='textfield' id='t{rowCount}' value='{$T.tnl.time}'/></div>"
		+ "<div style='width: 14.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
		+ "<input style='width: 90%;' type='text' name='textfield' class='auto' id='nameOfDrug{rowCount}' value='{$T.tnl.nameOfDrug}'/></div>"
		+ "<div	style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
		+ "<input style='width: 90%;' type='text' name='textfield' id='strength{rowCount}' value='{$T.tnl.strength}'/></div>"
		+ "<div	style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
		+ "<input style='width: 90%;' type='text' name='textfield' id='dose{rowCount}' value='{$T.tnl.dose}' /></div>"
		+ "<div id='sign{rowCount}' style='width: 12%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;' >{$T.tnl.sign}</div>"
		+ "</div><input type='hidden' value='{$T.tnl.id}' id='id{rowCount}' />"
		+ "<input type='hidden'	value='{rowCount++}' id='txtRowCount' name='txtRowCount'/>{#/for}"
		+ "<input type='hidden' value='' id='addRowCount' /><input type='hidden'	value='{--rowCount}' id='RowCount'/></div>";

var IPD_DICAdmin = " <div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-bordered table-stripped cf' style='margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th style='height: 21.5px; width: 32px;'><label class='TextFont'>#</label></th>"
		+ "<th style='height: 21.5px; width: 76px;'><label class='TextFont'>Time</label></th>"
		+ "<th style='height: 21.5px; width: 85px;'><label class='TextFont'>HeadingNote</label></th>"
		+ "<th style='height: 21.5px; width: 82px;'><label class='TextFont'>Note</label></th>"
		+ "<th style='height: 21.5px; width: 97px;'><label class='TextFont'>Sign</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 300px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody id='DRRDiv'>"
		+ "{#foreach $T.tnl as tnl}"
		+ "<tr id='div{rowCount}'>"
		+ "<td style='width: 25px;'>{sr++}.</td>"
		+ "<td style='width: 60px;'>"
		+ "<input type='text' class='form-control input-SmallText TextFont' name='t{rowCount}' id='t{rowCount}' value='{$T.tnl.cut}' /></td>"
		+ "<td style='width: 65.5px;' id='sel{rowCount}'><select style='width: 90%; font-size: 11px;' name='headNote{rowCount}' id='headNote{rowCount}' onclick='fetchAllNursingNotes(\"IPD_NursingStation\", \"onload\", this.id); this.onclick=null;' onchange='nurseValueSet($(this).val(),{rowCount}),makeUserselect({rowCount},\"NSDocName{rowCount}\")'  value=''><option selected=selected value='{$T.tnl.headingNote}'>{$T.tnl.HeadingNotes}</option></select></td>"
		// + "<td style='width: 65.5px;' id='sel{rowCount}'><select
		// style='width: 90%; font-size: 11px;' name='head{rowCount}'
		// id='head{rowCount}' value='{$T.tnl.note}'
		// onchange='nurseValueSet($(this).val(),{rowCount}')'></select></td>"
		+ "<td style='width: 65.5px;'>"
		+ "<input type='text' disabled='disabled' class='form-control input-SmallText TextFont' name='note{rowCount}' id='note{rowCount}' value='{$T.tnl.note}' onkeypress='makeUserselect({rowCount},\"NSDocName{rowCount}\")' /></td>"
		//+ "<td style='width: 48px;' id='sn{rowCount}'><select style='width: 90%; font-size: 11px;' name='NSDocName{rowCount}' id='NSDocName{rowCount}' onclick='setDoctorTempleteOnLoad((this.id),{rowCount}); this.onclick=null;' onchange='docOrNurSet(($(this).val()),{rowCount},(this.id))'> <option selected=selected value='{$T.tnl.nid}'>{$T.tnl.nname}</option></select></td>"
		
		+ "<td style='width: 48px;' id='sn{rowCount}'><input type='text'  disabled='disabled' style='width: 90%; font-size: 11px;' name='NSDocName{rowCount}' id='NSDocName{rowCount}' value='{$T.tnl.nname}'    ,  onclick='setDoctorTempleteOnLoad((this.id),{rowCount}); this.onclick=null;' onchange='docOrNurSet(($(this).val()),{rowCount},(this.id))'> </input></td>"

		+ "<td style='width: 23px;'>"
		+ "<input type='checkbox' disabled='disabled' id='checkbox' name='checkbox{rowCount}' value='{$T.tnl.tnid}' class='nursingChartCheckbox' ></td>"
		+ "</tr>"
		+ "<input type='hidden' value='{$T.tnl.nid}' id='nid{rowCount}' />"
		+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
		+ "{#/for} " + "<input type='hidden' value='' id='addRowCount' />"
		+ "<input type='hidden' value='{--rowCount}' id='RowCount' />"
		+ "</tbody>" + "</table>" + "</div>";

var IPD_DICOtherUser = " <div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-bordered table-stripped cf' style='margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th style='height: 21.5px; width: 21px;'><label class='TextFont'>#</label></th>"
		+ "<th style='height: 21.5px; width: 49px;'><label class='TextFont'>Time</label></th>"
		+ "<th style='height: 21.5px; width: 99px;'><label class='TextFont'>Note</label></th>"
		+ "<th style='height: 21.5px; width: 66px;'><label class='TextFont'>Sign</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 200px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody id='DRRDiv'>"
		+ "{#foreach $T.tnl as tnl}"
		+ "<tr id='div{rowCount}'>"
		+ "<td style='width: 25px;'>{sr++}.</td>"
		+ "<td style='width: 60px;'>"
		+ "<input name='t{rowCount}' id='t{rowCount}' value='{$T.tnl.cut}' disabled='disabled' readonly='readonly' type='text' class='form-control input-SmallText TextFont'/></td>"
		+ "<td style='width: 121px;'>"
		+ "<input type='text' class='form-control input-SmallText TextFont' name='note{rowCount}' readonly='readonly' id='note{rowCount}' value='{$T.tnl.note}' /></td>"
		+ "<td id='sn{rowCount}'><select style='width: 90%; font-size: 11px;' name='NSDocName{rowCount}' id='NSDocName{rowCount}' ></select></td>"
		+ "<td style='height: 21.5px; width: 23px;'>"
		+ "<input type='checkbox' id='checkbox' name='checkbox{rowCount}' value='{$T.tnl.tnid}' class='nursingChartCheckbox' disabled='disabled'></td>"
		+ "</tr>"
		+ "<input type='hidden' value='{$T.tnl.nid}' id='nid{rowCount}' />"
		+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
		+ "{#/for} " + "<input type='hidden' value='' id='addRowCount' />"
		+ "<input type='hidden' value='{--rowCount}' id='RowCount' />"
		+ "</tbody>" + "</table>" + "</div>";

var commonPatInfoForBill = "<div style='width: 100%; height: 1%; background-color: #85a7d4;'></div><div style='width: 100%; height: 99%;'><div id='rightContActual'><div	style='width: 98%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'><div style='width: 20%;'>{#if $T.img!= ''}<img src='{$T.img}'	width='130' height='130' name='patImg' id='patImg' />{#/if}{#if $T.img== ''}<img src='images/patientPhoto.jpg' width='130' height='130'	name='patImg' id='patImg' /> {#/if}</div><div style='width: 80%;'><div style='width: 100%;'><div style='width: 40%;'><div style='width: 100%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Patient ID</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.pi}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Treatment ID</div><div id='tid' style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.trid}</div></div><div style='width: 100%; padding-top: 2%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Hall No.</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.oBed.hi}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Bed No.</div><div style='width: 43%; padding-right: 7%; color: #002c67;'id='bid'>{$T.otrBed.trBed}</div></div></div><div style='width: 40%;'><div style='width: 100%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>First Name</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.fn}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Last Name</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.ln}</div></div></div></div></div></div>";

var createDiv1 = "<input type='button' onclick='toCreateDiv()' value='+'	style='padding-right: %' />";
var saveChart1 = "<input onclick='saveDIC()' class='btn btn-xs btn-success editUserAccess' type='button' value='Save Now' disabled='disabled'/>";
var echoStudyDashboard = "{#foreach $T.esl as esl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 35%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.esl.tit} {$T.esl.fn} {$T.esl.mn} {$T.esl.ln}</div><div style='width: 13.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.esl.pi}</div><div style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.esl.ag} {$T.esl.agtp}</div><div style='width: 14%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.esl.bg}</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='ADD ECHO STUDY' onclick='addEchoStudy({$T.esl.pi})' class='edit' /></div></div> {#/for}";

var addEchoStudyTemp = "<div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 14%; text-align: left; padding-left: 2px; float: left; font-weight: bold;'>Patient Name:-&nbsp</div><div id='pname' style='width: 80%; float: left;'>{$T.tit}&nbsp;{$T.fn}&nbsp{$T.mn}&nbsp{$T.ln}</div><div style='width: 12%; text-align: right; padding-left: 52.5%; float: left; font-weight: bold;'>Age:-&nbsp&nbsp</div><div style='width: 12%; float: left;' id='age'>{$T.ag}{$T.agtp}</div></div><div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 10%; text-align: left; padding-left: 2px; float: left; font-weight: bold;'>Ref By:-&nbsp</div><div style='width: 20%; float: left;'  id='refby' >{$T.rb}</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold;'>Date:- <input id='date' name='date' type='text' onclick='setCalander()' ></div></div>	<div style='visibility: hidden'><input type='text' id='tid' name='tid' value='{$T.trid}'></div><div style='width: 100%; height: 115px;'><div	style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>2-D ECHO SHOWS:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='echoShows' rows='5' cols='90' name='echoShows'></textarea></div></div><div style='width: 100%; height: 65px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>DOPPLER STUDY:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='doppler_study' rows='2' cols='90'	name='doppler_study'></textarea></div></div><div style='width: 100%; height: 175px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>CONCLUSSION:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='conclusions' rows='8' cols='90' name='conclusions'></textarea></div></div><div style='width: 100%; padding-left: 90%;'><input type='button' onclick='validateForSave()' value='NEXT' class='edit' /></div>";

var editEchoStudyTemp = "<div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 14%; text-align: left; padding-left: 2px; float: left; font-weight: bold;'>Patient Name:-&nbsp</div><div id='pname' style='width: 80%; float: left;'>{$T.fn}&nbsp{$T.mn}&nbsp{$T.ln}</div><div style='width: 12%; text-align: right; padding-left: 52.5%; float: left; font-weight: bold;'>Age:-&nbsp&nbsp</div><div style='width: 12%; float: left;' id='age'>{$T.ag}</div></div><div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 10%; text-align: left; padding-left: 2px; float: left; font-weight: bold;'>Ref By:-&nbsp</div><div style='width: 20%; float: left;'  id='refby' >{$T.rb}</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold;'>Date:- <input id='date' name='date' type='text' onclick='setCalander()' value='{$T.ed}' ></div></div>	<div style='visibility: hidden'><input type='text' id='tid' name='tid' value='{$T.eti}'></div><div style='width: 100%; height: 115px;'><div	style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>2-D ECHO SHOWS:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='echoShows' rows='5' cols='90' name='echoShows'  >{$T.es}</textarea></div></div><div style='width: 100%; height: 65px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>DOPPLER STUDY:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='doppler_study' rows='2' cols='90'	name='doppler_study' >{$T.ds}</textarea></div></div><div style='width: 100%; height: 175px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>CONCLUSSION:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='conclusions' rows='8' cols='90' name='conclusions' >{$T.cn}</textarea></div></div><div style='width: 100%; padding-left: 90%;'><input type='button' value='NEXT' onclick='validateForEdit()' /></div><input type='hidden' id='lvidd'  value='{$T.lv}' name='lvidd' /><input type='hidden' id='epss'  value='{$T.eps}' name='epss' /><input type='hidden' id='lvids'  value='{$T.lvids}' name='lvids' /><input type='hidden' id='ivsd'  value='{$T.iv}' name='ivsd' /><input type='hidden' id='lvpw'  value='{$T.lvpw}' name='lvpw' /><input type='hidden' id='ef'  value='{$T.ef}' name='ef' /><input type='hidden' id='ao'  value='{$T.ao}' name='ao' /><input type='hidden' id='la'  value='{$T.la}' name='la' /><input type='hidden' id='lvidd'  value='{$T.lv}' name='lvidd' /><input type='hidden' id='pasp'  value='{$T.ps}' name='pasp' /><input type='hidden' id='eid'  value='{$T.ei}' name='eid' />";

var prevEchoStudyDashboard = "{#foreach $T.esl as esl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 35.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.esl.tit} {$T.esl.fn} {$T.esl.mn} {$T.esl.ln}</div><div style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.esl.ei}</div><div style='width: 13.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.esl.ag} {$T.esl.agtp}</div><div style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' class='edit' value='UPDATE' onclick='updateEcho({$T.esl.ei})' /></div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='DELETE'  class='edit' onclick='deleteEcho({$T.esl.ei})' /></div></div> {#/for}";

var echoStudyTestTable = "<table style='border: 1px solid;' cellpadding='0'	cellspacing='0'><tr><td align='center' style='border: 1px solid;'>Value</td><td align='center' style='border: 1px solid;'>Velocity</td><td align='center' style='border: 1px solid;'>Peak Gradient</td><td align='center' style='border: 1px solid;'>Mean Gradient</td><td align='center' style='border: 1px solid;'>Regurge</td></tr>{#foreach $T.esl as esl}<tr><td width='15%'  ><input style='border: 1px solid; text-align:center; '  type='text' name='' value='{$T.esl.ty}' style='width: 100%; text-align:center; border: 0.2px solid;' id='type{count}'></td><td><input type='text' name='' value='{$T.esl.vel}' style='width: 100%; border: 0.2px solid; text-align:center;' id='MVVel{count}'></td><td><input type='text' name='' value='{$T.esl.peak}' style='width: 100%; border: 0.2px solid; text-align:center;' id='MVPeak{count}'></td><td><input type='text' name='' value='{$T.esl.mean}' style='width: 100%; border: 0.2px solid; text-align:center;' id='MVMean{count}'></td><td><input type='text' name='' value='{$T.esl.regu}' style='width: 100%;   border: 0.2px solid; text-align:center;' id='MVRegurge{count++}'></td></tr>{#/for}";

function hideShowPreTreatmentDoc(pid, divid) {
	$("#imgupdown" + divid).attr('src', "images/up.png");
	count = 1;
	// $("#patPreTreat").show();
	var prediv = $("#patPreTreat" + divid);
	if (prediv.length == 0) {
		divId = "div" + divid;
		var temp = '<div id="patPreTreat'
				+ divid
				+ '" style="width: 98%;padding-left:0px;" ><div style="width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;"><div style="width: 100%;">	<div		style="width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;">#</div>	<div		style="width: 33%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;">Patient		Name</div>	<div		style="width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Patient		ID</div>	<div		style="width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Treatment		ID</div>	<div		style="width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">Treatment		Date</div>	<div		style="width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;">View</div></div></div><div style="width: 99.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d;" id="preTrecontainer'
				+ divid + '"></div></div>';
		$(temp).insertAfter($('#' + divId));
		viewPrevDocDeskPatient(pid, divid);
	} else {
		$("#imgupdown" + divid).attr('src', "images/down.png");
		$('#patPreTreat' + divid).remove();
	}
}

function deleteEcho(echoId) {
	// alert(echoId);
	var r = confirm("Are You Confirm To Delete 2-D Echo");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeleteEchoReport');
		inputs.push('echoId=' + echoId);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function setTestTable(echo_id) {

	var inputs = [];
	inputs.push('action=fetchEchoTestTable');
	inputs.push('echo_id=' + echo_id);
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
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#tableContent").setTemplate(echoStudyTestTable);
			$("#tableContent").processTemplate(pobj1);
		}
	});

}

function updateEcho(eid) {
	var x = 'update';
	var pobj1 = $("#divEchoId").html();
	myArray = JSON.parse(pobj1);
	for ( var i = 0; i < myArray.esl.length; i++) {
		if (myArray.esl[i].ei == eid) {
			myObj = myArray.esl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	myObj = myObj.split("&amp;");
	myObj = myObj.join("``");
	window.location.href = "2-D_Echo.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&action=" + x;
}

function saveEchoStudy() {

	if ($("#echoShows").val() == "" && $("#doppler_study").val() == ""
			&& $("#conclusions").val() == "" && $("#epss").val() == ""
			&& $("#lvidd").val() == "" && $("#lvids").val() == ""
			&& $("#ivsd").val() == "" && $("#lvpw").val() == ""
			&& $("#ef").val() == "" && $("#ao").val() == ""
			&& $("#la").val() == "" && $("#MVVel1").val() == ""
			&& $("#MVPeak1").val() == "" && $("#MVMean1").val() == ""
			&& $("#MVRegurge1").val() == "" && $("#MVVel2").val() == ""
			&& $("#MVPeak2").val() == "" && $("#MVMean2").val() == ""
			&& $("#MVRegurge2").val() == "" && $("#MVVel3").val() == ""
			&& $("#MVPeak3").val() == "" && $("#MVMean3").val() == ""
			&& $("#MVRegurge3").val() == "" && $("#MVVel4").val() == ""
			&& $("#MVPeak4").val() == "" && $("#MVMean4").val() == ""
			&& $("#MVRegurge4").val() == "" && $("#pasp").val() == "") {
		alert("Please Fill The Report");
		return false;
	}
	var inputs = [];

	inputs.push('action=saveEchoStudy');
	inputs.push('queryType=' + $("#queryType").val());
	inputs.push('eid=' + $("#eid").val());
	inputs.push('tid=' + $("#tid").val());
	inputs.push('date=' + $("#date").val());
	inputs.push('echoShows='
			+ encodeURIComponent($("#echoShows").val().replace("%", "**")));
	inputs.push('doppler_study='
			+ encodeURIComponent($("#doppler_study").val().replace("%", "**")));
	inputs.push('conclusions='
			+ encodeURIComponent($("#conclusions").val().replace("%", "**")));
	inputs.push('epss=' + $("#epss").val());
	inputs.push('lvidd=' + $("#lvidd").val());
	inputs.push('lvids=' + $("#lvids").val());
	inputs.push('ivsd=' + $("#ivsd").val());
	inputs.push('lvpw=' + $("#lvpw").val());
	inputs.push('ef=' + $("#ef").val());
	inputs.push('ao=' + $("#ao").val());
	inputs.push('la=' + $("#la").val());
	inputs.push('MVVel=' + $("#MVVel1").val());
	inputs.push('MVPeak=' + $("#MVPeak1").val());
	inputs.push('MVMean=' + $("#MVMean1").val());
	inputs.push('MVRegurge=' + $("#MVRegurge1").val());
	inputs.push('AVVel=' + $("#MVVel2").val());
	inputs.push('AVPeak=' + $("#MVPeak2").val());
	inputs.push('AVMean=' + $("#MVMean2").val());
	inputs.push('AVRegurge=' + $("#MVRegurge2").val());
	inputs.push('TVVel=' + $("#MVVel3").val());
	inputs.push('TVPeak=' + $("#MVPeak3").val());
	inputs.push('TVMean=' + $("#MVMean3").val());
	inputs.push('TVRegurge=' + $("#MVRegurge3").val());
	inputs.push('PVVel=' + $("#MVVel4").val());
	inputs.push('PVPeak=' + $("#MVPeak4").val());
	inputs.push('PVMean=' + $("#MVMean4").val());
	inputs.push('PVRegurge=' + $("#MVRegurge4").val());
	inputs.push('pasp=' + $("#pasp").val());

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
			alert(ajaxResponse);
			window.location = "2-D_ECHOPreviousDashBoard.jsp";
		}
	});

}

function setAddEchoTemp() {

	var action = $("#action").val();
	if (action == "add") {
		var pobj = $("#divEchoId").html();
		var obj = pobj.split("``");
		obj = obj.join("&");
		obj = obj.split("**");
		obj = obj.join("%");

		pobj1 = eval('(' + obj + ')');
		$("#addEchoContent").setTemplate(addEchoStudyTemp);
		$("#addEchoContent").processTemplate(pobj1);

	} else if (action == "update") {

		var pobj = $("#divEchoId").html();
		var obj = pobj.split("``");
		obj = obj.join("&");
		obj = obj.split("**");
		obj = obj.join("%");
		pobj1 = eval('(' + obj + ')');

		$("#addEchoContent").setTemplate(editEchoStudyTemp);
		$("#addEchoContent").processTemplate(pobj1);

	}

}
function addEchoStudy(pid) {

	var x = 'add';
	var pobj1 = $("#divEchoId").html();
	var pageName = $("#pageName").val();
	myArray = JSON.parse(pobj1);

	if (pageName == 'onload') {
		for ( var i = 0; i < myArray.esl.length; i++) {
			if (myArray.esl[i].pi == pid) {
				myObj = myArray.esl[i];
				break;
			}
		}
	} else if (pageName == 'search') {
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == pid) {
				myObj = myArray.pl[i];
				break;
			}
		}
	}

	myObj = JSON.stringify(myObj);

	window.location.href = "2-D_EchoA.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&action=" + x;

}

function viewInvest(patientId) {
	ajaxResponse = $("#invtObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == patientId) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	window.location.href = "OPDInvestigation.jsp?" + "myObj="
			+ encodeURIComponent(myObj);
}

var k = 1;
function toCreateDiv() {
	var userType = $("#userType").val();

	var rowCount = $("#nRow").val();
	var addrowCount = $("#addRowCount").val();

	if (addrowCount != 0) {

		var tm = $("#t" + addrowCount + "").val();
		var note = $("#note" + addrowCount + "").val();

		// var cmt = $("#cmt" + addrowCount + "").val();
		if (tm == "" && note == "") {
			alert("Please fill the above fields");
			return false;
		}
	}

	var userNm = $("#txtUserName").val();
	var UserId = $("#txtUserId").val();
	var onl = "onload";
	var cfrm = "IPD_NursingStation";
	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;
	// alert(DRRDiv);
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("DRRDiv").appendChild(x);

	document.getElementById(divId).innerHTML = '<td style="height: 21.5px; width: 24px;">'
			+ rowCount
			+ '</td><td	style="height: 21.5px; width: 55.5px;"><input type="text" class="form-control input-SmallText TextFont" name="textfield" id="t'
			+ rowCount
			+ '" value="" readonly="readonly" /></td>'
			+ '<td style="height: 21.5px; width: 58px;" id="sel'
			+ rowCount
			+ '"><select style="width: 90%; font-size: 11px;" name="headNote'
			+ rowCount
			+ '" id="headNote'
			+ rowCount
			+ '" onchange="nurseValueSet($(this).val(),'
			+ rowCount
			+ ')"></select></td>'
			+ '<td style="height: 21.5px; width: 58px;"><input type="text" class="form-control input-SmallText TextFont auto" name="textfield"'
			+ ' onkeyup=setAutoNursingNotes(\"note'
			+ rowCount
			+ '\",\"onload\",\"IPD_NursingStation\")'
			+ ' id="note'
			+ rowCount
			+ '" value=""/></td>'
			+ '<td style="height: 21.5px; width: 48px;" id="sign'
			+ rowCount
			
			
			+ '"><select style="width: 90%; font-size: 11px;" name="NSDocName'
			+ rowCount
			+ '" id="NSDocName'
			+ rowCount
			+ '" onchange=docOrNurSet(($(this).val()),'
			+ (rowCount)
			+ ',(this.id)) >'
         	+ '</select></td><td style="height: 21.5px; width: 23px;"><input type="checkbox" name="checkbox'
         	
         	
	/*	+ '"><input type="text" style="width: 90%; font-size: 11px;" onkeyup=autoSuggestionForDoctorSale(this.id),name="NSDocName'
			+ rowCount
			+ '" id="NSDocName'
			+ rowCount
			+ '" onchange=docOrNurSet(($(this).val()),'
			+ (rowCount)
			+ ',(this.id)) >'
         	+ '</input></td><td style="height: 21.5px; width: 23px;"><input type="checkbox" name="checkbox'*/
         	
         	
			+ rowCount
			+ '"   id="checkbox"/></td><input type="hidden" id="id'
			+ rowCount + '"/>';

	$('#t' + rowCount).attr('readonly', 'readonly');
	$('#t' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 5
	});

	$("#nRow").val(rowCount);
	$("#addRowCount").val(k);
	k++;
	
	setAutoNursingNotes("note"+rowCount, "onload", "IPD_NursingStation");
	
	setDoctorTempleteOnLoad("NSDocName" + rowCount, rowCount);
	fetchAllNursingNotes("temp", rowCount);
	
	$("#NSDocName" + rowCount).select2();	
}

var docNameTemplateForNS = "<option value='0'>-select-</option>{#foreach $T.dl as dl} <option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
function setDoctorTempleteOnLoad(rowid, count) {

	// alert("rowid:"+rowid);
	var inputs = [];
	inputs.push('action=FetchAllDoctorsForNS');
	// inputs.push('pId=' + 1);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			var ajaxResponse = r;
			// alert(ajaxResponse);
			// var doctorBean = eval('(' + ajaxResponse + ')');
			var doctorBean = JSON.parse(ajaxResponse);
			$("#NSDocName" + count).setTemplate(docNameTemplateForNS);
			$("#NSDocName" + count).processTemplate(doctorBean);
			//alert(rowid);
		setTimeout(function() {
			$("#" + rowid).setTemplate(docNameTemplateForNS);
			$("#" + rowid).processTemplate(doctorBean);
		  }, 5);
		}
	});
	// window.reload();
}
function chkInHandQty(tmpCount) {

	var rCount = $("#RowCount").val();
	var pQty = 0;

	for ( var r = 1; r < rCount; r++) {
		if ($("#id" + r).val() != undefined) {
			if ($("#invProdID" + r).val() == $("#invProdID" + rCount).val()) {
				pQty = pQty + parseFloat($("#qty" + r).val());
			}
		}

	}
	var EntQty = parseFloat($("#qty" + tmpCount).val()) + pQty;
	var avbQty = $("#tmpQty").val();

	if (parseFloat(EntQty) > parseFloat(avbQty) && avbQty != "") {
		alert("Enter Quantity is not Available");
		$("#qty" + tmpCount).val('');
		return false;
	}

}

function setSplitIdInvProd(rowCount) {

	setTimeout(function() {
		var byName = $("#dn" + rowCount).val();
		var arr = byName.split("_");
		// for ( var i = 1; i < rowCount; i++) {
		// tmp = $("#invProdID" + i).val();
		// curID = arr[1];
		// if (tmp == curID)
		// {
		// alert("Already exist drug in list.");
		// $("#dn" + rowCount).val('');
		// return false;
		// }
		// }
		$("#dn" + rowCount).val(arr[0]);
		$("#invProdID" + rowCount).val(arr[1]);
		$("#tmpQty").val(arr[2]);
	}, 500);
}

function AddSave1() {
	$("#save").setTemplate(saveChart1);
	$("#save").processTemplate();
}

function AddDiv1() {
	var a = "";
	$("#addIPDDiv").setTemplate(createDiv1);
	$("#addIPDDiv").processTemplate(a);
}
/*
 * function click1() { // alert("in click"); // var id = fieldId.id; //
 * alert(id); $(function() { $(".demo").timepickr({ convention : 12
 * 
 * });
 * 
 * }); }
 */

var commonPatInfo = "<div id='divPatientDetails' class='well Remove-Bottom-Margin Remove-Padding col-md-12-1' style='padding: 0px 0px;'> "
		+ "				<div class='list-group list-group-margin-bottom col-md-1-1' "
		+ "						style='border: hidden;'> "
		+ "					<div class='list-group-item zero-padding col-md-5-1' "
		+ "					style='margin-top: 10px;'>{#if $T.img != ''} <img "
		+ "					src='{$T.img}' name='patImg' id='patImg' "
		+ "					class='img-responsive col-md-12-1' "
		+ "					style='margin-right: 0px; margin-left: 5px; margin-top: 0px;' /> "
		+ "					{#/if} {#if $T.img== ''} <img "
		+ "					src='images/patientPhoto.jpg' name='patImg' id='patImg' "
		+ "					class='img-responsive col-md-12-1' "
		+ "					style='margin-right: 0px; margin-left: 5px; margin-top: 0px;' /> "
		+ "					{#/if} "
		+ "					</div> "
		+ "				</div> "
		+ "				<div style='padding-top: 10px' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Patient Id: &nbsp;</label>  "
		+ "					<label id='PatID' class='TextFont'>{$T.pi}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Patient Name: &nbsp;</label> "
		+ "					<label id='fn' class='TextFont'>{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-20'></div> "
		+ "					<label class='TextFont col-md-3-1'>Ward Name: &nbsp;</label> "
		+ "					<label id='' class='TextFont col-md-9-1'>{$T.objHall.htnm}&nbsp;&nbsp;({$T.objHall.hn})</label> "
		+ "					</div>"
		+ "					<div class='col-md-1-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Bed No.: &nbsp;</label> "
		+ "					<label id='bid' class='TextFont'>{$T.oBed.bdnm}</label> "
		+ "					</div> "
		+ "				</div> "
		+ "				<div style='padding-top: 10px;' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Treatment ID: &nbsp;</label>"
		+ "					<label id='tid' class='TextFont'>{$T.objTreat.ti}</label> "
		+ "					</div> "
		+ "					<div class='col-md-3-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Date of Admission: &nbsp;</label> "
		+ "					<label id='' class='TextFont'>{$T.objTreat.treStart}</label> "
		+ "					</div> "
		+ "					<div class='col-md-3-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Admit Under: &nbsp;</label>"
		+ "					<label id='admit_under' class='TextFont'>{$T.objDoc.dn}</label> "
		+ "					</div>"
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Corporate: &nbsp;</label>"
		+ "					<label id='' class='TextFont'>{$T.liSponser[0].sponsredName}&nbsp;({$T.liSponser[0].companyName})</label> "
		+ "					</div> "
		+ "				<div style='padding-top: 10px;' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Bill Category: &nbsp;</label>"
		+ "					<label id='' class='TextFont'>{$T.objTreat.billCategory_Name}</label> "
		+ "					</div>"
		+ "					</div> "
		+ "					</div> " + "</div> ";

var commonPatInfoPrevICF = "<div id='divPatientDetails' class='well Remove-Bottom-Margin Remove-Padding col-md-12-1' style='padding: 0px 0px;'> "
		+ "				<div class='list-group list-group-margin-bottom col-md-1-1' "
		+ "						style='border: hidden;'> "
		+ "					<div class='list-group-item zero-padding col-md-5-1' "
		+ "					style='margin-top: 10px;'>{#if $T.img != ''} <img "
		+ "					src='{$T.img}' name='patImg' id='patImg' "
		+ "					class='img-responsive col-md-12-1' "
		+ "					style='margin-right: 0px; margin-left: 5px; margin-top: 0px;' /> "
		+ "					{#/if} {#if $T.img== ''} <img "
		+ "					src='images/patientPhoto.jpg' name='patImg' id='patImg' "
		+ "					class='img-responsive col-md-12-1' "
		+ "					style='margin-right: 0px; margin-left: 5px; margin-top: 0px;' /> "
		+ "					{#/if} "
		+ "					</div> "
		+ "				</div> "
		+ "				<div style='padding-top: 10px' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Patient Id: &nbsp;</label>  "
		+ "					<label id='PatID' class='TextFont'>{$T.pi}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Patient Name: &nbsp;</label> "
		+ "					<label id='fn' class='TextFont'>{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label> "
		+ "					</div> "
		+ "					<div class='col-md-5-1'> "
		+ "					<div class='divide-20'></div> "
		+ "					<label class='TextFont col-md-2-1'>Ward Name: &nbsp;</label> "
		+ "					<label id='' class='TextFont col-md-10-1'>{$T.lit[0].echo}&nbsp;&nbsp;({$T.lit[0].bedridden})</label> "
		+ "					</div>"
		+ " 				<div class='col-md-1-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Bed No.: &nbsp;</label> "
		+ "					<label id='bid' class='TextFont'>{$T.lit[0].memoNo}</label> "
		+ "					</div> "
		+ "				</div> "
		+ "				<div style='padding-top: 10px;' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Treatment ID: &nbsp;</label>"
		+ "					<label id='tid' class='TextFont'>{$T.objTreat.ti}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Date of Admission: &nbsp;</label> "
		+ "					<label id='' class='TextFont'>{$T.lit[0].treStart}&nbsp;&nbsp;{$T.lit[0].int}</label> "
		+ "					</div> "
		/*
		 * + " <div class='col-md-4-1'> " + " <div class='divide-10'></div> " + "
		 * <label class='TextFont'>Date of Discharge: &nbsp;</label> " + "
		 * <label id=''
		 * class='TextFont'>{$T.lit[0].treEnd}&nbsp;&nbsp;{$T.lit[0].out}</label> " + "
		 * </div> "
		 */
		+ "					{#if $T.admit != '' }"
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Admit Under: &nbsp;</label>"
		+ "					<label id='admit_under' class='TextFont'></label> "
		+ "					</div> " + "{#/if} " + "</div> " + "</div> ";

var commonPatInfoForNursingStation = "<div id='divPatientDetails' class='well Remove-Bottom-Margin Remove-Padding col-md-12-1' style='padding: 0px 0px;'> "
		+ "				<div class='list-group list-group-margin-bottom col-md-1-1' "
		+ "						style='border: hidden;'> "
		+ "					<div class='list-group-item zero-padding col-md-5-1' "
		+ "					style='margin-top: 10px;'>{#if $T.img != ''} <img "
		+ "					src='{$T.img}' name='patImg' id='patImg' "
		+ "					class='img-responsive col-md-12-1' "
		+ "					style='margin-right: 0px; margin-left: 5px; margin-top: 0px;' /> "
		+ "					{#/if} {#if $T.img== ''} <img "
		+ "					src='images/patientPhoto.jpg' name='patImg' id='patImg' "
		+ "					class='img-responsive col-md-12-1' "
		+ "					style='margin-right: 0px; margin-left: 5px; margin-top: 0px;' /> "
		+ "					{#/if} "
		+ "					</div> "
		+ "				</div> "
		+ "				<div style='padding-top: 10px' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Patient Id: &nbsp;</label>  "
		+ "					<label id='PatID' class='TextFont'>{$T.pi}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Patient Name: &nbsp;</label> "
		+ "					<label id='fn' class='TextFont'>{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label> "
		+ "					</div> "
		+ "					<div class='col-md-5-1'> "
		+ "					<div class='divide-20'></div> "
		+ "					<label class='TextFont col-md-2-1'>Ward Name: &nbsp;</label> "
		+ "					<label id='' class='TextFont col-md-10-1'>{$T.objHall.htnm}&nbsp;&nbsp;({$T.objHall.hn})</label> "
		+ "					</div>"
		+ "					<div class='col-md-1-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Bed No.: &nbsp;</label> "
		+ "					<label id='bid' class='TextFont'>{$T.oBed.bdnm}</label> "
		+ "					</div> "
		+ "				</div> "
		+ "				<div style='padding-top: 4px;' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Treatment ID: &nbsp;</label>"
		+ "					<label id='tid' class='TextFont'>{$T.objTreat.ti}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Date of Admission: &nbsp;</label> "
		+ "					<label id='' class='TextFont'>{$T.objTreat.treStart}&nbsp;&nbsp;{$T.objTreat.int}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Admit Under: &nbsp;</label> "
		+ "					<label id='consultDoc' class='TextFont'></label> "
		+ "					</div> "
		+ "				</div>"
		+ "				<div style='padding-top: 4px;margin-left: 9%;' class='col-md-10-1'>"
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Refer-By: &nbsp;</label>"
		+ "					<label id='' class='TextFont'>{$T.rb}</label> "
		+ "					</div>"
		+ "					<div class='col-md-5-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Corporate: &nbsp;</label>"
		+ "					<label id='sp_disc' class='TextFont'></label> "
		+ "					</div>"
		+ "					<div class='col-md-3-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Bill Category: &nbsp;</label>"
		+ "					<label id='' class='TextFont'>{$T.objTreat.billCategory_Name}</label> "
		+ "					</div>"
		+ "				</div> " + "</div> ";

function setCommonPatInfo(type) {
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	
	if (type == "prevICF") {
		$("#commonPatInfo").setTemplate(commonPatInfoPrevICF);
	} else if (type == "nursing_station" || type == "Discharge_Plan" || type == "ICF") {
		$("#commonPatInfo").setTemplate(commonPatInfoForNursingStation);
				
		var name = "";
		if(pobj1.sdiscNm != ""){
			name = pobj1.sdiscNm +" ("+pobj1.objTreat.cmpny+")"; 
		}else{
			name = "";
		}
		setTimeout(function(){$("#sp_disc").html(name);},100);
		
	} else {
		$("#commonPatInfo").setTemplate(commonPatInfo);
	}
	//$("#commonPatInfo").processTemplate(pobj1);
	$("#chartSlaveTemp").hide();
	if (type == "prevICF") {
		var docname = pobj1.admit;
		var docs = docname.split(",");
		$("#admit_under").html(docs[0]);
		$("#commonPatInfo").processTemplate(pobj1);
	}
	else{
	$("#commonPatInfo").processTemplate(pobj1);
	var docCount = pobj1.IPDDoctorList.length;
	var consultdoc = pobj1.objDoc.dn;
	
	if(docCount > 1){
		var title = "";
		for ( var i = 0; i < pobj1.IPDDoctorList.length; i++) {
			var docname = pobj1.IPDDoctorList[i].docName + " -- " + pobj1.IPDDoctorList[i].department;
			if(i != (pobj1.IPDDoctorList.length - 1)){
				//docname = docname + ",";
			}
			title = title + " " + docname;
		}
		consultdoc = consultdoc +"  "+ '<a href="#" style="color:red;" data-toggle="tooltip" data-placement="bottom" title="'+title+'"><i class = "fa fa-plus-circle"></i></a>';
		$("#consultDoc").html(consultdoc);
	}else{
		$("#consultDoc").html(consultdoc);
	}
	}

}

var commonPatInfoforbed = " <div class='well Remove-Bottom-Margin Remove-Padding col-md-12-1' style='padding: 0px 0px;'> "
		+ "				<div class='list-group list-group-margin-bottom col-md-1-1' "
		+ "						style='border: hidden;'> "
		+ "					<div class='list-group-item zero-padding col-md-5-1' "
		+ "					style='margin-top: 10px;'>{#if $T.img != ''} <img "
		+ "					src='{$T.img}' name='patImg' id='patImg' "
		+ "					class='img-responsive col-md-12-1' "
		+ "					style='margin-right: 0px; margin-left: 5px; margin-top: 0px;' /> "
		+ "					{#/if} {#if $T.img== ''} <img "
		+ "					src='images/patientPhoto.jpg' name='patImg' id='patImg' "
		+ "					class='img-responsive col-md-12-1' "
		+ "					style='margin-right: 0px; margin-left: 5px; margin-top: 0px;' /> "
		+ "					{#/if} "
		+ "					</div> "
		+ "				</div> "
		+ "				<div style='padding-top: 10px' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Patient Id: &nbsp;</label>  "
		+ "					<label id='PatID' class='TextFont'>{$T.pi}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Patient Name: &nbsp;</label> "
		+ "					<label id='fn' class='TextFont'>{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label> "
		+ "					</div> "
		+ "					<div class='col-md-5-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Ward Name: &nbsp;</label> "
		+ "					<label id='' class='TextFont'>{$T.objHall.hn}({$T.objHall.htnm})</label>"
		+ "					<input type='hidden' id='hallIDName' value='{$T.objHall.htnm}' />"
		+ "					<input type='hidden' id='hallTypeIDName' value='{$T.objHall.hn}' />"
		+ "					</div> "
		+ "					<div class='col-md-1-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Bed No.: &nbsp;</label> "
		+ "					<label id='bid' class='TextFont'>{$T.oBed.bdnm}</label> "
		+ "					</div> "
		+ "				</div> "
		+ "				<div style='padding-top: 10px;' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Treatment ID: &nbsp;</label>"
		+ "					<label id='tid' class='TextFont'>{$T.trid}</label> "
		+ "					</div> "
		+ "					<div class='col-md-3-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Date of Admission: </label> "
		+ "					<label id='' class='TextFont'>{$T.objTreat.treStart}&nbsp;{$T.objTreat.int}</label> "
		+ "					</div> "
		+ "					<div class='col-md-3-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Admit Under: &nbsp;</label> "
		+ "					<label id='' class='TextFont'>{$T.objDoc.dn}</label> "
		+ "					</div> "
		+ "					<div class='col-md-4-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Corporate: &nbsp;</label>"
		+ "					<label id='' class='TextFont'>{$T.liSponser[0].sponsredName}&nbsp;({$T.liSponser[0].companyName})</label> "
		+ "					</div>"
		+ "				    <div style='padding-top: 10px;' class='col-md-10-1'> "
		+ "					<div class='col-md-2-1'> "
		+ "					<div class='divide-10'></div> "
		+ "					<label class='TextFont'>Bill Category: &nbsp;</label>"
		+ "					<label id='' class='TextFont'>{$T.objTreat.billCategory_Name}</label> "
		+ "					</div>"
		+ "                 </div></div> ";

// same method also present in js.js
function setCommonPatInfoforbed() {
	var patinetBedDetals = $("#divPatId2").html();
	var patinetBedDetalsJson = eval('(' + patinetBedDetals + ')');
	//alert("patinetBedDetalsJson===>"+patinetBedDetalsJson.hallTypeName);
	//bId,beAllFor,isolation,hallTypeId,hallId
	//console.log(pobj12);
	if (patinetBedDetals == undefined) {
		return false;
	}
	
	$("#commonPatInfo").setTemplate(commonPatInfoforbed);
	$("#commonPatInfo").processTemplate(pobj1);

	if ("P" == patinetBedDetalsJson.beAllFor) {
		$('#bed' +patinetBedDetalsJson.bId).css("width", '150px');
		$('#bed' + patinetBedDetalsJson.bId).css("height", '50px');
		$('#bed' + patinetBedDetalsJson.bIdi).css("text-align", 'center');
		$('#bed' + patinetBedDetalsJson.bId).css("vertical-align", 'middle');
		$('#bbed' + patinetBedDetalsJson.bId).css("border", '3px solid #b94a48');
		$('#bbedListView' + patinetBedDetalsJson.bId).css("border", '2px solid #b94a48');
	}
	
	if (patinetBedDetalsJson.isolation == "1") {
		$('#txtIsolation').prop('checked', true);
	}else{
		$('#txtIsolation').prop('checked', false);
	}
	
/*	
	var pobj = $("#divPatId").html();
	var pobj1 = eval('(' + pobj + ')');
	if (pobj == undefined) {
		return false;
	}

	$("#commonPatInfo").setTemplate(commonPatInfoforbed);
	$("#commonPatInfo").processTemplate(pobj1);

	var pattype = $("#pattype").val();

	if (pattype == pobj1.otrBed.bdalfr) {
		$('#bed' + pobj1.oBed.bi).css("width", '150px');
		$('#bed' + pobj1.oBed.bi).css("height", '50px');
		$('#bed' + pobj1.oBed.bi).css("text-align", 'center');
		$('#bed' + pobj1.oBed.bi).css("vertical-align", 'middle');
		$('#bbed' + pobj1.oBed.bi).css("border", '3px solid #b94a48');
		$('#bbedListView' + pobj1.oBed.bi).css("border", '2px solid #b94a48');
	}

	if ((pobj1.oBed) != undefined) {
		if (pobj1.oBed.iso == "1") {
			$('#txtIsolation').prop('checked', true);
		}else{
			$('#txtIsolation').prop('checked', false);
		}
	}*/
}

function setIPD_DIC() {
	var tid = $("#tid").html();
	var inputs = [];
	inputs.push('tid=' + tid);
	inputs.push('action=setIPD_DIC');

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
			$("#DIC").html(ajaxResponse);
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			var userType = $("#userType").val();
			if (userType == "admin") {
				$("#IPD_DICContent").setTemplate(defaultNursingChart);
				// alert("asd");
				$("#IPD_DICContent").processTemplate(pobj1);
				// $("#addButton").hide();
			} else {
				$("#IPD_DICContent").setTemplate(defaultNursingChart);
				// alert("asd");
				$("#IPD_DICContent").processTemplate(pobj1);
			}
			$(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");
		}
	});

}
function fillDIC(date) {

	$("#chart").val("select");
	//AddSave1();
	AddDiv1();
	rowCount = 1;
	sr = 1;
	count = 1;

	// var tid = ($("#tid").html()).trim();
	var tid =$("#tid").val();
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');

	var inputs = [];
	inputs.push('date=' + date);
//old	
	/*inputs.push('tid=' + pobj1.trid);*/
//new	
	inputs.push('tid=' + tid);
	//inputs.push('action=fillDIC');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdhistory/fillDIC",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(r);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#DIC").html(ajaxResponse);
			var userType = $("#userType").val();
			
			//if (userType == "admin") {
				rowCount = 1;
				$("#nRow").val(pobj1.tnl.length);
				$("#IPD_DICContent").setTemplate(IPD_DICAdmin);
				$("#IPD_DICContent").processTemplate(pobj1);
				
				for ( var i = 0; i < pobj1.tnl.length; i++) {
					$("#t" + (i + 1)).attr('readonly', 'readonly');
					$("#t" + (i + 1)).datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 15
					});
				}
				
				/*
				 * for ( var i = 0; i < pobj1.tnl.length; i++) {
				 * setDoctorTempleteOnLoad("#NSDocName"+(i+1),(i+1)); }
				 */
				setTimeout(function() {
					
					/*for ( var i = 0; i < pobj1.tnl.length; i++) {
					//	$("#NSDocName" + (i + 1)).val(pobj1.tnl[i].nid);
					}*/
				}, 100);
				
				//fetchAllNursingNotes("IPD_NursingStation", "onload" , pobj1.tnl.length);
				setTimeout(function() {
					/*for ( var i = 0; i < pobj1.tnl.length; i++) {
					
					//	$("#headNote" + (i + 1)).val(pobj1.tnl[i].headingNote);
					}*/
				}, 1000);
				

							
				
			/*} else {
				$("#nRow").val(pobj1.tnl.length);
				alert("hi");
				
				//$("#IPD_DICContent").setTemplate(IPD_DICOtherUser);
				$("#IPD_DICContent").setTemplate(IPD_DICAdmin);
				$("#IPD_DICContent").processTemplate(pobj1);
				for ( var i = 0; i < pobj1.tnl.length; i++) {
					$("#t" + (i + 1)).attr('readonly', 'readonly');
					$("#t" + (i + 1)).datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 15
					});
				}
				
				 * for ( var i = 0; i < pobj1.tnl.length; i++) {
				 * setDoctorTempleteOnLoad("#NSDocName"+(i+1),(i+1)); }
				 
				for ( var i = 0; i < pobj1.tnl.length; i++) {
					$("#headNote" + (i + 1)).val(pobj1.tnl[i].note);
				}
				
				setTimeout(function() {
					for ( var i = 0; i < pobj1.tnl.length; i++) {
						$("#NSDocName" + (i + 1)).val(pobj1.tnl[i].nid);
					}
				}, 100);

			}*/

			/*
			 * $(".auto").autocomplete(
			 * "AutoSuggetionServlet?auto=invNurseMedicine&tritID=" +
			 * $("#tridId").val());
			 */
			
			setTimeout(function(){userAccess();},100);
		}
	});
}

function saveDIC() {

	var response;
	var userType = $("#userType").val();
	var datePick = $("#date-pick").val();
	var rowCount = $("#nRow").val();
	var password = $("#password").val();
	var userUpdate = $("#userUpdate").val();
	var addrowCount = ($("#addRowCount").val()).trim();

	// alert("userUpdate"+userUpdate);
	// alert("password "+password);
	if (rowCount == "0") {
		alert("No Data in IPD Nursing Station...");
		return false;
	}

	var allVals = [];
	var flag = false;
	$.each($('#checkbox'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("No Data in IPD Nursing Station...");
		return false;
	}

	if (userType == "admin") {

		var Response1 = $("#DIC").html();
		// alert( Response1);
		var ajaxRes = eval('(' + Response1 + ')');
		var z = 0;
		for ( var m = 1; m <= ajaxRes.tnl.length; m++) {
			if ($("#t" + m + "").val() == undefined) {
				// ajaxRes.drrl[z].nid = 0;
			} else {
				if ($("#t" + m + "").val() == "") {
					alert("Time must be filled out");
					return false;
				}

				if (userUpdate == "") {
					alert("Please select User");
					return false;
				}
				if (password == "") {
					alert("Please enter password");
					$('#iPackage').show('show');
					return false;
				}

				ajaxRes.tnl[z].cut = $("#t" + m + "").val();
				ajaxRes.tnl[z].note = $("#note" + m + "").val();
			}
			z++;
		}
		// alert(ajaxRes);
		var parsebcObj = JSON.stringify(ajaxRes);
		var inputs = [];
		inputs.push('action=UpdateDIC');
		inputs.push('dicobj=' + parsebcObj);
		inputs.push('userUpdate=' + userUpdate);
		inputs.push('password=' + password);
		inputs.push('datePick=' + datePick);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			//data : str + "&reqType=AJAX",
			data :{dicobj:parsebcObj,
				userUpdate:userUpdate,
				password:password,
				datePick:datePick,
				action:"UpdateDIC",
			},
			url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			},
			success : function(r) {
				ajaxResponse = r;

				if ((addrowCount == "")) {
					alert(ajaxResponse);
				}
				// location.reload(true);
			}
		});
	}

	// if (rowCount == 0 || addrowCount == 0) {
	if (rowCount == 0) {
		// alert("Nursing Chart Updated Sucessfully");
		alert("Please fill in the details before saving!");
		location.reload(true);
		return false;
	} else {

		var datePick = $("#date-pick").val();

		var tid = $("#trid").html();
		var bid = $("#bid").html();

		var count = rowCount - addrowCount;
		var ReadStvalue = rowCount - addrowCount;
		var i;
		var fdq1 = "";
		var DICString = "";
		for (i = 1; i <= addrowCount; i++) {
			count++;
			var tm = $("#t" + count + "").val();
			
			if (tm == undefined) {
			} else {
				var note = $("#note" + count + "").val();
				
				var headingNote = $("#headNote" + count + "").val();
				
				//alert(headingNote);
				
				if (tm == "") {
					alert("Time must be filled out");
					return false;
				}
				
				if (note == "") {
					alert("Note must be filled out");
					return false;
				}
				if (userUpdate == "") {
					alert("Please select User");
					return false;
				}
				if (password == "") {
					alert("Please enter password");
					$('#iPackage').show('show');
					return false;
				}

				DICString = DICString + "@" + tm + "," + note + "," + headingNote;
			}
		}
		if (!addrowCount) {

		} else {
			var inputs = [];
			inputs.push('tid=' + tid);
			inputs.push('bid=' + bid);
			inputs.push('datePick=' + datePick);
			inputs.push('DICString=' + DICString);
			inputs.push('userUpdate=' + userUpdate);
			inputs.push('password=' + password);
			inputs.push('action=SaveDIC');
			//var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
			//	data : str + "&reqType=AJAX",
				
				data :{tid:tid,
					bid:bid,
					datePick:datePick,
					DICString:DICString,
					userUpdate:userUpdate,
					password:password,
					action:"SaveDIC",
				},
				
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					response = r;
					alert(response);
					location.reload(true);
					// setIPD_DIC();

				}
			});
		}
	}

	// location.reload();

	// alert(response);
	// location.reload();
	/*
	 * } else { var rowCount = $("#RowCount").val(); var addrowCount =
	 * $("#addRowCount").val(); if (rowCount == 0) { return false; } else { if
	 * (!(rowCount == 0)) { if (($("#fdq" + rowCount + "").val()) != "") {
	 * checkMaterialQty(rowCount, "dic"); // alert(y); } else { y = 1; } } if (y ==
	 * 1 || rowCount == 0 || addrowCount == 0) { //
	 * alert($("#txtUserName").val()); var UserId = $("#txtUserId").val(); //
	 * alert(UserId); var datePick = $("#date-pick").val(); var tid =
	 * $("#tid").html(); var bid = $("#bid").html(); var count = rowCount -
	 * addrowCount; var ReadStvalue = rowCount - addrowCount; var i; var fdq1 =
	 * ""; var DICString = ""; for (i = 1; i <= rowCount; i++) { count++; var tm =
	 * $("#t" + i + "").val(); var dn = $("#dn" + i + "").val(); var stren =
	 * $("#stren" + i + "").val(); var dose = $("#dose" + i + "").val(); var fd =
	 * $("#fd" + i + "").val(); var fdq = $("#fdq" + i + "").val(); var cmt =
	 * $("#cmt" + i + "").val(); var tnid = $("#tnid" + i + "").val(); var nid =
	 * $("#nid" + i + "").val(); if (tm == "" && dn == "" && stren == "" && dose == "" &&
	 * fd == "" && fdq == "" && cmt == "") { alert("You can not save empty
	 * fields."); return false; } else { if (fd != "" && fdq == "") {
	 * alert("Please Enter Quantity!"); return false; } else { if (fdq == "") {
	 * fdq1 = fdq; } else { fdq1 = eval('(' + fdq + ')'); } DICString =
	 * DICString + "@" + tm + "," + dn + "," + stren + "," + dose + "," + fd +
	 * "," + fdq1 + "," + cmt + "," + tnid + "," + nid; } } // alert(DICString); //
	 * rowCount++; } var inputs = []; inputs.push('tnid=' + tnid);
	 * inputs.push('tid=' + tid); inputs.push('bid=' + bid); inputs.push('nid=' +
	 * nid); inputs.push('datePick=' + datePick); inputs.push('DICString=' +
	 * DICString); inputs.push('action=SaveDIC'); var str = inputs.join('&');
	 * jQuery.ajax( { async : true, type : "POST", data : str + "&reqType=AJAX",
	 * url : "PatientServlet", timeout : 1000 * 60 * 5, cache : false, error :
	 * function() { alert('error'); }, success : function(r) { ajaxResponse = r;
	 * alert(ajaxResponse); location.reload(); // setIPD_DIC(); } }); }
	 */
	$("#password").val("");
}

var fetchCausalityPatientTemp = '{#foreach $T.pl as pl}  <div	style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 4.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}.</div><div style="width: 13.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;">{$T.pl.pi}</div><div style="width: 30.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.tit} {$T.pl.fn} {$T.pl.ln}</div><div	style="width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.pl.rgDt}</div><div style="width: 13.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.pl.mb}</div></div>{#/for}';

function fetchCausalityPatient() {

	count = 1;

	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();

	var inputs = [];
	inputs.push('action=FetchCausalityPatientByDate');
	inputs.push('from=' + from);
	inputs.push('to=' + to);

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
			response = r;

			pobj1 = eval('(' + response + ')');
			$("#container").setTemplate(fetchCausalityPatientTemp);
			$("#container").processTemplate(pobj1);
		}
	});
}

var echoDetailsTemp = '{#foreach $T.echoDetailsList as echoDetailsList}  <div	style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 3%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}.</div><div style="width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.echoDetailsList.pn}</div><div style="width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;">{$T.echoDetailsList.dt}</div><div	style="width: 11.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.rb}</div><div style="width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.pb}</div><div style="width: 9%; height: 25px; border-right: 1px solid #069;  padding-left: 2%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.ch}</div><div style="width: 8%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.io}</div><div style="width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.testID}</div><div style="width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;"></div></div>{#/for}';
var tmtDetailsTemp = '{#foreach $T.echoDetailsList as echoDetailsList} <div style="width: 100%; height: 28px; border-bottom: 1px solid #069;">	<div		style="width: 3%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}.</div>	<div		style="width: 17%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.echoDetailsList.pn}</div>	<div		style="width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;">{$T.echoDetailsList.dt}</div>	<div		style="width: 11.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.rb}</div>	<div		style="width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.pb}</div>	<div		style="width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 2%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.ch}</div>	<div		style="width: 8%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.ts}</div>	<div		style="width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.st}</div>	<div		style="width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.testID}</div></div>{#/for}';

var xrayDetailsTemp = '{#foreach $T.echoDetailsList as echoDetailsList}  <div	style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}.</div><div style="width: 31.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.echoDetailsList.pn}</div><div style="width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;">{$T.echoDetailsList.dt}</div><div	style="width: 11.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.rb}</div><div style="width: 10.1%; height: 25px; border-right: 1px solid #069;  padding-left: 2%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.ch}</div><div style="width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.io}</div><div style="width: 11.1%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;">{$T.echoDetailsList.testID}</div></div>{#/for}';

function getEchoDetails(testType) {

	var from = $("#popup_container3").val();
	var to = $("#popup_container2").val();
	var inputs = [];

	inputs.push('action=fetchEchoDetails');
	inputs.push('from=' + from);
	inputs.push('to=' + to);
	inputs.push('testType=' + testType);
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
			response = r;

			pobj1 = eval('(' + response + ')');
			if (testType == "echo") {
				$("#container").setTemplate(echoDetailsTemp);
			} else if (testType == "ray") {
				$("#container").setTemplate(xrayDetailsTemp);
			} else {
				$("#container").setTemplate(tmtDetailsTemp);
			}
			$("#container").processTemplate(pobj1);

		}
	});

}
/**
 * *******************IPD DIC FUNCTIONS************************************
 */

function setIPD_DDR() {
	var sampleBean;
	// alert("asd");
	$("#IPD_DRRContent").setTemplate(IPD_DRRTemp);
	// alert("asd");
	$("#IPD_DRRContent").processTemplate(sampleBean);
	// alert("asd");
}
function setIPD_Discharge() {
	var sampleBean;
	// alert("asd");
	$("#IPD_DischargeInfo").setTemplate(IPD_DischargeTemp);
	// alert("asd");
	$("#IPD_DischargeInfo").processTemplate(sampleBean);
	// alert("asd");
}
// function setPatientRegistration() {
// var sampleBean;
// // alert("asd");
// $("#PatientRegistrationContent").setTemplate(patientRegistrationTemp);
// // alert("asd");
// $("#PatientRegistrationContent").processTemplate(sampleBean);
// // alert("asd");
// }

function ViewTreatment(id) {
	divPi = $("#PreTreat").html();

	myArray = JSON.parse(divPi);
	var myObj;
	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].otd.id == id) {

			myObj = myArray.pl[i];
			break;
		}
	}
	var pid = myObj.pi;
	myObj = JSON.stringify(myObj);
	// alert(myObj);

	window.location = "OPDDoctorsDesk2.jsp?pid=" + pid + "&myObj="
			+ encodeURIComponent(myObj) + "&FunType=update";
	// preTreat = eval('(' + myObj + ')');
	// alert(preTreat.otd.st);
	// $("#diagnosis").html(preTreat.otd.st);
	// $("#note").val(preTreat.otd.co);
	// $("#note").val(preTreat.pl.otd.co);
	// Medicine1
}
function viewPrevDocDeskPatient(pid, divid) {
	// alert("Hi");
	setSearchTemp();
	var inputs = [];
	inputs.push('action=viewPrevDocDeskPatient');
	inputs.push('pid=' + pid);
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
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#preTrecontainer" + divid).setTemplate(
					viewPrevDocDeskPatientTemp);
			$("#preTrecontainer" + divid).processTemplate(pobj1);
			$("#PreTreat").html(ajaxResponse);
		}
	});
}

function viewPrevDocDeskDistinctPatient() {
	setSearchTemp();
	var inputs = [];
	count = 1;
	inputs.push('action=viewPrevDocDeskDistinctPatient');

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
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(viewPrevDocDeskPatientDistinctTemp);
			$("#container").processTemplate(pobj1);
			$("#PreTreat").html(ajaxResponse);
		}
	});
}

function fetchEchoStudy(pageName) {

	var byName = $("#byName").val();

	var inputs = [];
	inputs.push('action=fetchEchoStudy');
	inputs.push('pageName=' + pageName);
	inputs.push('byName=' + encodeURIComponent(byName));
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

			if (pageName == 'AddEcho') {
				$("#divEchoId").html(ajaxResponse);
				pobj1 = eval('(' + ajaxResponse + ')');
				$("#container").setTemplate(echoStudyDashboard);
				$("#container").processTemplate(pobj1);
			} else if (pageName == 'UpadateEcho'
					|| pageName == 'UpadateEchoSearch') {
				$("#divEchoId").html(ajaxResponse);
				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.esl.length == 0) {
					alert("Patient Not Found");
					return false;
				}
				count = 1;
				$("#preEchoDashContent").setTemplate(prevEchoStudyDashboard);
				$("#preEchoDashContent").processTemplate(pobj1);

			}
		}
	});

}
function searchPrevTreatment() {

	var byName = $("#byName").val();
	var byId = $("#byId").val();

	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("please search either by patient Id or by Patient Name");
	} else if (byName == "" && byId == "") {
		alert("please inserst something for search");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}
		var inputs = [];
		inputs.push('action=SearchPrevTreatment');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + encodeURIComponent(value));
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
				// alert(ajaxResponse);
				patientBean = eval('(' + ajaxResponse + ')');
				if (patientBean.pl.length == 0) {
					alert("Patient details not found");
				} else {
					// alert("Hi");
					$("#container").setTemplate(viewPrevDocDeskPatientTemp);
					$("#container").processTemplate(patientBean);
				}
				window.reload();

			}
		});
	}
};

var containerTemplateForER = "{#foreach $T.pl as pl}"
		+ "<tr>"
		+ "<td class='center' style='width: 5%;'>{count++}.</td>"
		+ "<td class='' style='width: 14%'>{$T.pl.mrNo}</td>"
		+ "<td class='' style='width: 20%;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='center' style='width: 7%;'>{$T.pl.ag}/{$T.pl.sx}</td>"

		+ "{#if $T.pl.wt==null}<td class='center' style='width: 7%;'>--</td>{#/if}"
		+ "{#if $T.pl.wt==0}<td class='center' style='width: 7%;'>--</td>{#/if}"
		+ "{#if $T.pl.wt!=0}<td class='center' style='width: 7%;'>{$T.pl.wt}</td>{#/if}"

		/* + "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.PatientOPDList[0].common_Token_number}</td>" */
		+ "<td class='' style='width: 7%; padding-left: 15px;'>{$T.pl.PatientOPDList[0].app_date}</td>"
		+ "<td class='center' style='width: 7%;'>"
		+ "<button onclick=viewDoctorDesk({$T.pl.pi},'ER') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "</td>" + "</tr>" + "{#/for}";

var containerTemplateForOPDTab = "{#foreach $T.pl as pl}"
		+ "<tr id='trcount{count}'>"
		+ "<td class='center' style='width: 5%;'>{count++}.</td>"
		+ "<td class='' style='width: 13%'>{$T.pl.mrNo}</td>"
		+ "<td class='' style='width: 25%;'>{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='center' style='width: 14%;'>{$T.pl.ag} Yr: {$T.pl.month} Mt: {$T.pl.days} Days/{$T.pl.sx}</td>"
		+ "<td class='center' style='width: 7%;'>{$T.pl.PatientOPDList[0].common_Token_number}</td>"
		/* + "<td class='center' style='width: 7%;'>{$T.pl.EpisdeVisitList[0].episodeNo}</td>" */
		+ "<td class='center' style='width: 7%;'>{$T.pl.EpisdeVisitList[0].visitNo}</td>"
		+ "<td class='' style='width: 7%;'>{$T.pl.PatientOPDList[0].app_date}</td>"
		+ "<td class='center' style='width: 7%;'>"

		+ "<button onclick=viewDoctorDesk({$T.pl.pi},'OPD') type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"

		// + "<input onclick=viewDoctorDesk({$T.pl.pi},'OPD') style='font-size:
		// 10px;' type='button' value='TREATMENT' class='edit' />"

		+ "</td>" + "</tr>" + "{#/for}";

function viewPatient(chkValue) {
	var patId = "";
	var PatientType = '';

	// $("#patientTypeForSearch").val(""); for specific patient search on
	// IPD_OPD_Database.jsp
	if (chkValue == 'total') {
		PatientType = 'total';
		$("#patientTypeForSearch").val("total");

	} else if (chkValue == 'ipd') {
		PatientType = 'ipd';
		$("#patientTypeForSearch").val("ipd");
	} else if (chkValue == 'opd') {
		PatientType = 'opd';
		$("#patientTypeForSearch").val("opd");
	} else if (chkValue == 'er') {
		PatientType = 'er';
		$("#patientTypeForSearch").val("er");
	} else if (chkValue == 'diagnosis') {
		PatientType = 'diagnosis';
		$("#patientTypeForSearch").val("diagnosis");
	} else if (chkValue == 'forsinglepat') {
		PatientType = 'forsinglepat';
		patId = $("#patID").val();
	}

	// var pageName = $("#pageName").val();

	var inputs = [];
	inputs.push('action=fetchAllPatientData');
	inputs.push('PatientType=' + PatientType);
	inputs.push('patId=' + patId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			if (chkValue == 'forsinglepat') {

				myArray = JSON.parse(ajaxResponse);
				var myObj1 = null;
				for ( var i = 0; i < myArray.pl.length; i++) {

					if (myArray.pl[i].pi == patId) {
						myObj1 = myArray.pl[i];
						break;
					}
				}
				myObj = JSON.stringify(myObj1);
				$("#div1").html(myObj);
				setPatientView();

			} else {

				$("#allPatInfo").html(ajaxResponse);
				pobj1 = eval('(' + ajaxResponse + ')');
				count = 1;

				if ($("#userRole").html() == 'admin') {
					$("#divAdminAcess").show();
					$("#container").setTemplate(containerTemplateForAdmin);
					$("#container").processTemplate(pobj1);
				} else {
					$("#divAdminAcess").hide();
					$("#container").setTemplate(containerTemplateForUser);
					$("#container").processTemplate(pobj1);
				}

				if (pobj1.pl) {
					for ( var i = 0; i < pobj1.pl.length; i++) {
						if (pobj1.pl[i].objTreat.opddt == "") {

						} else {
							$("#OPD" + pobj1.pl[i].trid).attr("disabled",
									"disabled");
						}
					}
				}
				
				// OPDDoctorsDeskDashboard.jsp

				count = 1;
				if (PatientType == 'opd') {
					$("#OPDPatientList").html(ajaxResponse);
					$("#containerOPD").setTemplate(containerTemplateForOPDTab);
					$("#containerOPD").processTemplate(pobj1);
				} else if (PatientType == 'er') {

					$("#ERPatientList").html(ajaxResponse);
					$("#containerER").setTemplate(containerTemplateForER);
					$("#containerER").processTemplate(pobj1);

					// var erCount = (pobj1.pl.length);
					/* Dashboard.jsp ER Count */
					/*
					 * if (erCount > 0) { $("#ERQueueCount").html(erCount); }
					 */
				}
				
				var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
				if (pobj1.pl && currentPage=="OPDDoctorsDeskDashboard") {
					for ( var i = 0; i < pobj1.pl.length; i++) {
						if (pobj1.pl[i].rt == "opd") {
							if (pobj1.pl[i].PatientOPDList.length > 0) {
								if (pobj1.pl[i].PatientOPDList[0].requestToConvertIPD == 1) {
									$("#trcount"+(i+1)).css('background-color','#ffd2a6');
								}else if(pobj1.pl[i].PatientOPDList[0].queueStatus == "cancel") {
									$('#trcount'+(i+1)).css('background-color', '#ffe0b3');
								}else if(pobj1.pl[i].PatientOPDList[0].queueStatus == "in"){
									//$('#trcount'+(i+1)).css('background-color', '#ccffcc');
								}else if(pobj1.pl[i].PatientOPDList[0].queueStatus == "out"){
									$('#trcount'+(i+1)).css('background-color', '#ccffcc');
								}
							}
						}
					}
				}

			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

function defaultViewInvtDash(pageName) {

	var inputs = [];
	inputs.push('action=fetch');
	inputs.push('pageName=' + pageName);
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
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pageName == "OPDInvestigationDashboard") {
				$("#container").setTemplate(patientInvestTemp);

			} else if (pageName == "OPD_RMO_Dashboard") {

				$("#container").setTemplate(rmoDashboard);
			} else if (pageName == "OPDDoctorsDeskDashboard") {

				$("#container").setTemplate(patientDocDeskTemp1);
			}
			if (pageName == "IPDInvestigationDashboard") {
				$("#container").setTemplate(patientInvestTemp);
				$("#invtObj").html(ajaxResponse);
			}
			$("#container").processTemplate(pobj1);
		}
	});
}

function generate(layout, text) {
	var n = noty({
		text : text,
		type : 'warning',
		dismissQueue : true,
		layout : layout,
		theme : 'defaultTheme'
	});
	console.log('html: ' + n.options.id);
}

function orderFormPopup() {

	var inputs = [];
	inputs.push('action=orderFormPopup');
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "IPDTreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);

					pobj1 = eval('(' + ajaxResponse + ')');

					if (pobj1.orcodrli.length != 0) {
						generate('bottomRight', "msg");
						var popupTemp = "<div style='width: 100%; font-size: 11px;color:black;'><div style='width: 100%; font-weight: bold;''><div style='width: 6%; border: 1px solid #000; text-align: center;'>#</div><div style='width: 38%; border: 1px solid #000; padding-left: 5px'>Patient Name</div><div style='width: 38%; border: 1px solid #000; padding-left: 5px'>Medicine Name</div><div style='width: 10%; border: 1px solid #000; padding-left: 5px'>Sign</div></div>{#foreach $T.orcodrli as orcodrli}<div style='width: 100%;'><div style='width: 6%; border: 1px solid #000; text-align: center;'>{sr++}.</div><div style='width: 38%; border: 1px solid #000; padding-left: 5px'>{$T.orcodrli.pn}</div><div style='width: 38%; border: 1px solid #000; padding-left: 5px'>{$T.orcodrli.drdo}</div><div style='width: 10%; border: 1px solid #000; padding-left: 5px'>{$T.orcodrli.sign}</div></div>{#/for}</div>";
						$("#popupSpan").setTemplate(popupTemp);
						$("#popupSpan").processTemplate(pobj1);
					}

				}
			});
}
function setRemark(count) {
	var time = $("#txttime" + count).val();
	$("#txtremark" + count).val($("#txtremark" + count).val() + time + "-");
	$("#txttime" + count).val("");
}

var visitingPatientTemp = "{#foreach $T.pl as pl}<tr> <td style='height: 21.5px;' class='col-md-1 center'>{count++}.</td><td style='height: 21.5px;' class='col-md-2-1'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td><td style='height: 21.5px;' class='numeric col-md-1-1 center' id='divPi{count}'>{$T.pl.pi}</td><td style='height: 21.5px;' class='numeric col-md-2-1 center' id='divPi{count}'>{$T.pl.mrNo}</td><td style='height: 21.5px;' class='numeric col-md-1-1 center'><button value='Mark Visit' id='btnVisit' class='btn btn-xs btn-success editUserAccess' onclick='setVisitingPatientDetails({$T.pl.pi})' disabled='disabled'><i class='fa fa-eye View'></i></button> </td></tr>{#/for}";

function fetchVisitingPatient() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchVisitingPatient');

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
			// patientDocTreatment
			$("#allPatInfo").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#container").setTemplate(visitingPatientTemp);
			$("#container").processTemplate(pobj1);
			userAccess();
		}
	});
}

function setVisitingPatientDetails(pi) {
	/*
	 * if (pi == "convertToIpd") { myObj = $("#pobj").html(); myObj =
	 * JSON.parse(myObj); } else {
	 */
	var ajaxResponse = $("#allPatInfo").html();
	var myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == pi) {
			myObj = myArray.pl[i];
			break;
		}
	}

	var patName = myObj.tit + " " + myObj.fn + " " + myObj.mn + " " + myObj.ln;
//alert(myObj.objTreat.selRefBy+"-"+myObj.objTreat.txtRefBy);
	
	if (myObj.objTreat.selRefBy == "select"	|| myObj.objTreat.txtRefBy == "") {
		$("#chkWalkin").prop('checked', true);
		hideSourceDiv();
	} else {
		showSourceDiv();
		$("#chkSource").prop('checked', true);
		$("#selReferredBy").val(myObj.objTreat.selRefBy);
		$("#SpecialDiscount").val(myObj.sdisc);
		
		if (myObj.objTreat.selRefBy == "select") {
			$("#doctorDiv").hide();
			$("#referredByDiv").hide();
		} else if (myObj.objTreat.selRefBy == "doctor") {
			$("#referredByDiv").hide();
			$("#doctorDiv").show();
			getRefDoctors();
			setTimeout(function() {
				$("#refBy").val(myObj.objTreat.rb);
			}, 500);
		} else if (myObj.objTreat.selRefBy == "inHousedoctor") {
			getInHouseDoctors();
			setTimeout(function() {
				$("#referredByDiv").hide();
				$("#doctorDiv").show();
				$("#refBy").val(myObj.objTreat.rb);
			}, 500);
		}else {
			$("#doctorDiv").hide();
			$("#referredByDiv").show();
			$("#txtReferredBy").val(myObj.objTreat.txtRefBy);
		}

	}

	$('#SpecialDiscount option').each(function() {
		if ($(this).val() != 'select') {
			$(this).remove();
		}
	});

	$("#patID").val(myObj.pi);
	$("#regDate").html(myObj.rgDt);
	$("#patName").html(patName);
	$("#treDate").html(myObj.objTreat.treStart);
	$("#mrNo").html(myObj.mrNo);
	$("#bill_cat").html(myObj.objTreat.billCategory_Name);
	

	$('[name=paymentType][value="' + myObj.objTreat.tppay + '"]').prop(
			'checked', true);
	$("#selCompany").val(myObj.objTreat.cmpny);
	$("#txtPaymentPerName").val(myObj.objTreat.paynm);
	$("#txtRelAge").val(myObj.objTreat.relage);
	$("#relSex").val(myObj.objTreat.relsex);
	$("#txtRelRelation").val(myObj.objTreat.relrelation);
	$("#txtRelAddress").val(myObj.objTreat.relAdd);
	$("#txtRelMobile").val(myObj.objTreat.relmob);
	$("#txtInsuranceCmpny").val(myObj.objTreat.insuCmpny);
	$("#txtMemoNo").val(myObj.objTreat.memoNo);
	$("#popup_container4").val(myObj.objTreat.rmenoDt);
	$("#txtCashlessPolicyNo").val(myObj.objTreat.cashPolNo);
	$("#txtCnnnNo").val(myObj.objTreat.cnnNo);

	var visitNo = 1;

	if (myObj.EpisdeVisitList.length > 0) {
		if ((myObj.EpisdeVisitList[0].visitNo == "undefined")
				|| (myObj.EpisdeVisitList[0].visitNo == undefined)) {
			visitNo = 1;
		} else {
			visitNo = (myObj.EpisdeVisitList[0].visitNo);
		}
	}

	visitNo = parseFloat(visitNo) + 1;

	$("#opdVisitNo").val(visitNo);
	$("#txtIpdVisitNo").val(visitNo);

	setPatientSponsorDetailsForMarkVisit(myObj.pi);

	/*
	 * for ( var z = 0; z < myObj.liSponser.length; z++) {
	 * 
	 * var o = new Option("option text","value"); // jquerify the // DOM object //
	 * 'o' so we can // use the html // method
	 * $(o).html(myObj.liSponser[z].sponsredName);
	 * $(o).val(myObj.liSponser[z].sponseredNameId);
	 * $("#SpecialDiscount").append(o); }
	 */
}

var sponsredDetailsTemplateForTable = '{#foreach $T.liSponser as liSponser}'
		+ '<tr><td class="input-SmallText col-md-1-1 margin-1">{sponsredCount}</td>'
		+ '<td class="numeric input-SmallText col-md-2-1 margin-1">{$T.liSponser.companyName}</td>'
		+ '<td class="numeric input-SmallText col-md-2-1 margin-1">{$T.liSponser.sponsredName}</td>'
		+ '<td class="numeric input-SmallText col-md-2-1 margin-1">{$T.liSponser.cashlessPolicyNo}</td>'
		+ '<td class="numeric input-SmallText col-md-2-1 margin-1">{$T.liSponser.insuranceValidFrom}</td>'
		+ '<td class="numeric input-SmallText col-md-2-1 margin-1">{$T.liSponser.insuranceValidTo}</td>'
		+ '</tr><input type="hidden"  value="{sponsredCount++}"/>{#/for}';

var sponsredDetailsTemplateForSelect = "<option value='0'>-SELECT-</option>{#foreach $T.liSponser as liSponser"
		+ "}<option value='{$T.liSponser.sponseredNameId}'>{$T.liSponser.sponsredName}</option>{#/for}";

function setPatientSponsorDetailsForMarkVisit(patId) {
	var inputs = [];
	inputs.push('action=fetchPatientSponsorDetailsForMarkVisit');
	inputs.push('patId=' + patId);
	var str = inputs.join('&');
	jQuery
			.ajax({
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
					pobj1 = eval('(' + ajaxResponse + ')');
					$("#sponsredDetailsTable").setTemplate(
							sponsredDetailsTemplateForTable);
					$("#sponsredDetailsTable").processTemplate(pobj1);
					$("#SpecialDiscount").setTemplate(
							sponsredDetailsTemplateForSelect);
					$("#SpecialDiscount").processTemplate(pobj1);
				}
			});
}

function saveVisitingPatients() {
	var patID = $("#patID").val();

	if (patID == 0 || patID == "undefined" || patID == "") {
		alert("Please select a Patient from the mark visit...");
		refreshTrue();
		return;
	}
	var treatmentSatrtDate = $("#popup_container3").val();
	var refByRadio = $("input[name='refByRadio']:checked").val();
	var refBy = $("#refBy").val();
	var refTo = $("#refTo").val();
	var specialDiscount = $("#SpecialDiscount").val();
	var selectIpdDoc = $("#ipdDoctorName").val();
	var admitFor = $("#admitFor").val();
	var relNm = $("#relNm").val();
	var emrNo = $("#emrNo").val();

	var plAdress = $("#plAdress").val();
	var patName = $("#patName").html();
	var $checkbox1 = $('input:checkbox[id=mlc]');
	var selReferredBy = $("#selReferredBy").val();
	var txtReferredBy = $("#txtReferredBy").val();

	if (patName == "") {
		alert("Please Select Patient");
		return false;
	} else if (refByRadio == undefined) {
		alert("Please Select Refer By");
		return false;
	} else if (refTo == "select") {
		alert("Please Select Refer To");
		return false;
	} else if (refByRadio == "source") {
		if(selReferredBy == "doctor"){
			if (refBy == "select") {
				alert("Please Select Source");
				return false;
			} else if (selReferredBy == "doctor") {
				txtReferredBy = $("#refBy :selected").text();
			}else{
				refBy = 0;
			}
		}
	} else if (refByRadio == "walkin") {
		txtEmpID = "";
		refBy = 0;
		txtReferredBy = "";
		selReferredBy = "select";
		
	/*} else if (refTo == "ipd") {*/
	} if (refTo == "ipd") {
		if (selectIpdDoc == 0) {
			alert("Please Select Admitted Under Doctor");
			return false;
		} else if (selectIpdDoc != 0) {
			// var docid = $("#ipdDoctorName").val();
			var docName = $("#ipdDoctorName option:selected").text();
			var add = docName + '\n';
			// var doctorid = docid + '\n';

			var flag = 0;
			$('#ipdDoctors').find('option').each(function() {
				if ($(this).html() == add) {
				//	alert("Doctor Is Present In List");
					flag = 1;
				}
			});
			if (flag == 0) {
				alert("Please add Doctor In Doctor's List");
				return false;
			}
		}
	}
	if (refBy == "select") {
		refBy = "0";
	}if(selReferredBy == "select"){
		refBy = "0";
	}
	if(refBy == null){
		refBy = "0";
	}
	if ($("#mlc").attr("checked")) {

		if (firNo == "") {
			alert("Please Enter Fir No");
			return false;
		} else if (authorityname == "") {
			alert("Please Enter Authority Name");
			return false;
		} else if (buccleNo == "") {
			alert("Please Enter Buccle No");
			return false;
		} else if (plStname == "") {
			alert("Please Enter Police Station Name");
			return false;
		} else if (plAdress == "") {
			alert("Please Enter Police Station Address");
			return false;
		}
	}

	var bedridden;
	if ($('#bedridden').attr('checked')) {
		bedridden = "Y";
	} else {
		bedridden = "N";
	}

	var seropositive;
	if ($('#seropositive').attr('checked')) {
		seropositive = "Y";
	} else {
		seropositive = "N";
	}

	// For Ipd Billing Details
	var typeOfPayment = $('input:radio[name="paymentType"]:checked').val();
	var txtPaymentPerName = $("#txtPaymentPerName").val();
	var txtRelAge = $("#txtRelAge").val();
	var relSex = $("#relSex").val();
	var txtRelRelation = $("#txtRelRelation").val();
	var txtRelAddress = $("#txtRelAddress").val();
	var txtRelMobile = $("#txtRelMobile").val();

	var selCompany = $("#selCompany").val();
	var txtInsuranceCmpny = $("#txtInsuranceCmpny").val();
	var txtMemoNo = $("#txtMemoNo").val();
	var popup_container4 = $("#popup_container4").val();
	var txtCashlessPolicyNo = $("#txtCashlessPolicyNo").val();
	var txtCnnnNo = $("#txtCnnnNo").val();

	// mlc details
	var mlcid = $("#mlcid").val();
	var firNo = $("#firNo").val();
	var authorityname = $("#authorityname").val();
	var buccleNo = $("#buccleNo").val();
	var plStname = $("#plStname").val();
	var plAdress = $("#plAdress").val();
	var incidentDetails = $("#incidentDetails").val();

	var mlcDate = $("#mlcDate").val();
	var mlcInformerTitle = $("#mlcInformerTitle").val();
	var mlcInformerFirstName = $("#mlcInformerFirstName").val();
	var mlcInformerLastName = $("#mlcInformerLastName").val();
	var mlcInformerSex = $("#mlcInformerSex").val();
	var mlcInformerMobile = $("#mlcInformerMobile").val();
	var mlcInformerEmail = $("#mlcInformerEmail").val();
	var mlcInformerAge = $("#mlcInformerAge").val();
	var mlcInformerRelation = $("#mlcInformerRelation").val();
	var mlcInformerAddress = $("#mlcInformerAddress").val();
	var mlcCmoDoctor = $("#mlcCmoDoctor").val();
	// end mlc details

	// For Opd patient
	var docotorID = $("#doctorName").val();
	var doctorSpecialization = $("#doctorSpecilization").val();
	var doctorDepartments = $("#doctorDepartments").val();

	// For ipd patient
	var relativeTitle = $("#relativeTitle").val();
	var relativeFirstName = $("#relativeFirstName").val();
	var relativeLastName = $("#relativeLastName").val();
	var relativeSex = $("#relativeSex").val();
	var relativeMobile = $("#relativeMobile").val();
	var relativeEmail = $("#relativeEmail").val();
	var relativeAge = $("#relativeAge").val();
	var relativeRelation = $("#relativeRelation").val();
	var relativeAddress = $("#relativeAddress").val();
	var doctorId = $("#ipdDoctorName").val();
	var docSpecialization = $("#ipdDoctorSpecilization").val();
	var docDepartments = $("#ipdDoctorDepartments").val();
	var informerTitle = "";
	var informerFirstName = "";
	var informerLastName = "";
	var informerSex = "";
	var informerMobile = "";
	var informerEmail = "";
	var informerAge = "";
	var informerRelation = "";
	var informerAddress = "";
	var informerCMOConsult = "";
	var informerDoc_spl_id = "";
	var informerDoc_dept_id = "";
	var informerBillCtgy = "";
	var informerDescription = "";

	var ipdDocIds = {
		liDocId : []
	};

	var docName = "";
	$('#ipdDoctors').find('option').each(function() {
		docName = docName + $(this).val();
	});
	var docId = "";
	var docArr = [];
	docArr = docName.split("\n");
	for ( var i = 0; i < docArr.length; i++) {
		if (docArr[i] != "") {
			ipdDocIds.liDocId.push({
				"docId" : docArr[i]
			});
		}
	}

	ipdDocIds = JSON.stringify(ipdDocIds);

	var txtIpdVisitNo;
	var txtIpdEpisodeNo;
	var ipdEpisodeDescription;
	var ipdAdmissionDate;
	var ipdbillCategory;
	
	if (refTo == "ipd") {
		
		txtIpdEpisodeNo = $("#txtIpdEpisodeNo").val();

		txtIpdVisitNo = $("#txtIpdVisitNo").val();
		ipdEpisodeDescription = $("#ipdEpisodeDescription").val();
		ipdAdmissionDate = $("#ipdAdmissionDate").val();
		ipdbillCategory = $("#billCategory").val();
		
		if (ipdbillCategory == "2") {
			//alert("hi.....");
			if ($("#sponsoredType").val() == "select") {
				alert("Please select Sponsored Type");
				return false;
			} else if ($("#companyName").val() == "select") {
				alert("Please select Company Name");
				return false;
			} else if ($("#sponseredName").val() == "select") {
				alert("Please select Policy Name");
				return false;
			}
		}
		
	} else if (refTo == "er") {
		informerTitle = $("#erInformerTitle").val();
		informerFirstName = $("#erInformerFirstName").val();
		informerLastName = $("#erInformerLastName").val();
		informerSex = $("#erInformerSex").val();
		informerMobile = $("#erInformerMobile").val();
		informerEmail = $("#erInformerEmail").val();
		informerAge = $("#erInformerAge").val();
		informerRelation = $("#erInformerRelation").val();
		informerAddress = $("#erInformerAddress").val();
		informerCMOConsult = $("#erCMOConsultant").val();
		informerDoc_spl_id = $("#erdoctorSpecilization").val();
		informerDoc_dept_id = $("#erdoctorDepartments").val();
		//informerBillCtgy = $("#billCategory").val();
		ipdbillCategory = $("#billCategory").val();
		informerDescription = $("#erDescTextarea").val();
	} else {

		txtIpdVisitNo = $("#opdVisitNo").val();
		ipdEpisodeDescription = $("#opdEpisodeDesciption").val();
		ipdAdmissionDate = $("#opdVisitDate").val();
		
		var opdVisitType = $("#opdVisitType").val();
		ipdbillCategory = $("#billCategory").val();
	}

	var diagnosisDoc = 0;
	var diagnosisHos = 0;
	if (refTo == "diagnosis") {
		diagnosisDoc = $("#diagnosisDoctor").val();
		diagnosisHos = $("#diagnosisHospital").val();
	}

	// end ipd billing detais
	
	//Reason Of visit
	
	var idReasonOfVisit = $("#SelectReasonVisitDetails").val();

	var inputs = [];
	inputs.push('action=saveVisitingPatients');
	// mlc details
	inputs.push('firNo=' + firNo);
	inputs.push('authorityname=' + encodeURIComponent(authorityname));
	inputs.push('buccleNo=' + encodeURIComponent(buccleNo));
	inputs.push('plStname=' + encodeURIComponent(plStname));
	inputs.push('plAdress=' + encodeURIComponent(plAdress));
	inputs.push('mlcid=' + mlcid);
	inputs.push('incidentDetails=' + incidentDetails);
	inputs.push('mlcDate=' + mlcDate);
	inputs.push('mlcInformerTitle=' + mlcInformerTitle);
	inputs.push('mlcInformerFirstName=' + mlcInformerFirstName);
	inputs.push('mlcInformerLastName=' + mlcInformerLastName);
	inputs.push('mlcInformerSex=' + mlcInformerSex);
	inputs.push('mlcInformerMobile=' + mlcInformerMobile);
	inputs.push('mlcInformerEmail=' + mlcInformerEmail);
	inputs.push('mlcInformerAge=' + mlcInformerAge);
	inputs.push('mlcInformerRelation=' + mlcInformerRelation);
	inputs.push('mlcInformerAddress=' + mlcInformerAddress);
	inputs.push('mlcCmoDoctor=' + mlcCmoDoctor);
	// end mlc details

	// Er Details
	inputs.push('informerTitle=' + informerTitle);
	inputs.push('informerFirstName=' + informerFirstName);
	inputs.push('informerLastName=' + informerLastName);
	inputs.push('informerSex=' + informerSex);
	inputs.push('informerMobile=' + informerMobile);
	inputs.push('informerEmail=' + informerEmail);
	inputs.push('informerAge=' + informerAge);
	inputs.push('informerRelation=' + informerRelation);
	inputs.push('informerAddress=' + informerAddress);
	inputs.push('informerCMOConsult=' + informerCMOConsult);
	inputs.push('informerDoc_spl_id=' + informerDoc_spl_id);
	inputs.push('informerDoc_dept_id=' + informerDoc_dept_id);
	inputs.push('informerBillCtgy=' + informerBillCtgy);
	inputs.push('informerDescription=' + informerDescription);
	// end Er details

	// ipd patient details

	inputs.push('relativeTitle=' + relativeTitle);
	inputs.push('relativeSex=' + relativeSex);
	inputs.push('relativeFirstName=' + relativeFirstName);
	inputs.push('relativeLastName=' + relativeLastName);
	inputs.push('relativeMobile=' + relativeMobile);
	inputs.push('relativeEmail=' + relativeEmail);
	inputs.push('relativeAge=' + relativeAge);
	inputs.push('relativeRelation=' + relativeRelation);
	inputs.push('relativeAddress=' + relativeAddress);
	inputs.push('txtIpdEpisodeNo=' + txtIpdEpisodeNo);
	inputs.push('txtIpdVisitNo=' + txtIpdVisitNo);
	inputs.push('ipdEpisodeDescription=' + ipdEpisodeDescription);
	inputs.push('ipdAdmissionDate=' + ipdAdmissionDate);
	inputs.push('ipdbillCategory=' + ipdbillCategory);
	inputs.push('ipdDocIds=' + ipdDocIds);
	inputs.push('opdVisitType=' + opdVisitType);
	
	//For IPD Patient
	inputs.push('doctorId=' + doctorId);
	inputs.push('docSpecialization=' + docSpecialization);
	inputs.push('docDepartments=' + docDepartments);
	
	
    //For OPD Patient
	inputs.push('docotorID=' + docotorID);
	inputs.push('doctorSpecialization=' + doctorSpecialization);
	inputs.push('doctorDepartments=' + doctorDepartments);

	// diagnosis
	inputs.push('diagnosisDoc=' + diagnosisDoc);
	inputs.push('diagnosisHos=' + diagnosisHos);

	inputs.push('bedridden=' + bedridden);
	inputs.push('seropositive=' + seropositive);

	inputs.push('patID=' + patID);
	inputs.push('refBy=' + refBy);
	inputs.push('selReferredBy=' + selReferredBy);
	inputs.push('txtReferredBy=' + txtReferredBy);
	inputs.push('refTo=' + refTo);
	inputs.push('specialDiscount=' + specialDiscount);
	inputs.push('selectIpdDoc=' + selectIpdDoc);
	inputs.push('admitFor=' + admitFor);
	inputs.push('relNm=' + relNm);
	inputs.push('emrNo=' + emrNo);
	inputs.push('firNo=' + firNo);
	inputs.push('authorityname=' + authorityname);
	inputs.push('buccleNo=' + buccleNo);
	inputs.push('plStname=' + plStname);
	inputs.push('plAdress=' + plAdress);
	inputs.push('patName=' + patName);
	inputs.push('typeOfPayment=' + typeOfPayment);
	inputs.push('txtPaymentPerName=' + txtPaymentPerName);
	inputs.push('txtRelAge=' + txtRelAge);
	inputs.push('relSex=' + relSex);
	inputs.push('txtRelRelation=' + txtRelRelation);
	inputs.push('txtRelAddress=' + txtRelAddress);
	inputs.push('txtRelMobile=' + txtRelMobile);
	inputs.push('selCompany=' + selCompany);
	inputs.push('txtInsuranceCmpny=' + txtInsuranceCmpny);
	inputs.push('txtMemoNo=' + txtMemoNo);
	inputs.push('popup_container4=' + popup_container4);
	inputs.push('txtCashlessPolicyNo=' + txtCashlessPolicyNo);
	inputs.push('txtCnnnNo=' + txtCnnnNo);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('treatmentSatrtDate=' + treatmentSatrtDate);
	
	inputs.push('idReasonOfVisit=' + idReasonOfVisit);
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
			alert(ajaxResponse);
				if(refTo == "ipd"){
					printTicket(patID); 
				}	
			if ((refTo == "opd") || (refTo == "er")) {
				window.location = "OPDOldPatientDatabase.jsp";
			} else if (refTo == "ipd") {
				window.location = "IPD_BedWardDashboard.jsp";
			} else if (refTo == "diagnosis") {
				window.location = "diagnoPatBillDashboard.jsp";
			}
			fetchVisitingPatient();
		}
	});
	
}

function searchVisitingPatient() {
	count = 1;
	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var byMobile = $("#byMobile").val();

	if (byName != "" && byId != "" && byMobile != "") {
		alert("Please Search By Either Patient Id OR Patient Name OR Mobile Number!");
		return false;
	} else if (byName != "" && byId != "") {
		alert("Please Search By Either Patient Name OR Patient Id!");
		return false;
	} else if (byId != "" && byMobile != "") {
		alert("Please Search By Either Patient Id OR Mobile Number!");
		return false;
	} else if (byName != "" && byMobile != "") {
		alert("Please Search By Either Patient Name OR Mobile Number!");
		return false;
	} else if (byName == "" && byId == "" && byMobile == "") {
		alert("Please Enter Patient Name Or Patient Id Or Mobile Number");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		} else if (byMobile != "") {
			if (byMobile.length < 10 || byMobile.length > 10) {
				alert("Please Enter proper Mobile Number.....");
				return false;
			}
			searchBy = "byMobile";
			value = byMobile;
		}

		var inputs = [];
		inputs.push('action=searchVisitingPatient');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + value);
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
				$("#allPatInfo").html(ajaxResponse);
				var pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.pl.length == 0) {
					alert("Patient Detail Not Found");
					$("#container").setTemplate(visitingPatientTemp);
					$("#container").processTemplate(pobj1);
				} else {
					$("#container").setTemplate(visitingPatientTemp);
					$("#container").processTemplate(pobj1);
				}
				userAccess();
			}
		});
	}
}

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

function sendToMarkVisit(pi) {
	setVisitingPatientDetails(pi);
	$("#patID").val(pi);
	$("#popup_container3").val("");
}

function setAutocompletePolicyNameAdmin(auto) {

	// alert(inputTextID);
	var resultData = [];
	var auto = "PolicyName";
	var findingName = $("#strValue").val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + auto + " .typeahead").html(template);
						$("#div" + auto + " .typeahead").show();
						$("#strValue").typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#strValue").data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		// alert("Name==>" + item.text + " Id==>" + item.value);
		$("#strValue").val(item.text);
	}
}

function setAutocompleteCompanyNameAdmin(auto) {

	// alert(inputTextID);
	var resultData = [];
	var auto = "CompanyName";
	var findingName = $("#strCompanyValue").val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}

					setTimeout(function() {
						$("#div" + auto + " .typeahead").html(template);
						$("#div" + auto + " .typeahead").show();
						$("#strCompanyValue").typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#strCompanyValue").data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		// alert("Name==>" + item.text + " Id==>" + item.value);
		$("#strCompanyValue").val(item.text);
	}
}

function setAutoSuggestionForOT(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "OperationGroup") {
		auto = 'OperationGroup';
	} else if (callFrom == "OperationManagement") {
		auto = 'OperationManagement';
	} else if (callFrom == "OperationType") {
		auto = 'OperationType';
	}

	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "AutoSuggetionServlet",
				url : "./ehat/otoperationmange/operationType",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.toString().split("\n");
					// alert(availableTags);
					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});
						template = template + '<li data-value="' + idValue
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';
					}
					$("#pathiddenid").val(idValue);
					setTimeout(function() {// alert(template);
						// $("#div" + inputID + " .typeahead").html("");
						$("#div" + inputID + " .typeahead").html(template);

						if (onload != "onload") {
							$("#div" + inputID + " .typeahead").show();
						}

						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 1000);

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		// alert("Name==>" + item.text + " \n\nId==>" + item.value);

		$("#"+inputID).val((item.text).trim());
	}

}

function viewBillHistory(pid) {
	var myObj = null;
	var ajaxResponse = $("#allPatInfo").html();
	var myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];
			break;
		}
	}

	// myObj = JSON.stringify(myObj);

	var patientName = (myObj.tit) + (myObj.fn) + " " + (myObj.mn) + " "
			+ (myObj.ln);
	var pid = (myObj.pi);
	var tid = (myObj.trid);
	var admCount = (myObj.objTreat.trCount);
	var rgDt = (myObj.rgDt);
	var gender = (myObj.sx);
	var ageSexString = "";
	if ((myObj.ag) != "0") {
		ageSexString += ((myObj.ag) + " Years ");
	}

	if ((myObj.month) != undefined) {
		if ((myObj.month) != "0") {
			ageSexString += ((myObj.month) + " Months ");
		}
	}

	if ((myObj.days) != undefined) {
		if ((myObj.days) != "0") {
			ageSexString += ((myObj.days) + " Days");
		}
	}

	window.location.href = "PreviousBillHistory.jsp?patientName="
			+ encodeURIComponent(patientName) + "&pid="
			+ encodeURIComponent(pid) + "&tid=" + encodeURIComponent(tid)
			+ "&ageSexString=" + encodeURIComponent(ageSexString) + "&rgDt="
			+ encodeURIComponent(rgDt) + "&admCount="
			+ encodeURIComponent(admCount) + "&gender="
			+ encodeURIComponent(gender);
}

function fetchPreviousBillingHistoryByPid(pid) {

	var inputs = [];
	inputs.push('action=fetchPreviousBillingHistoryByPid');
	inputs.push('pid=' + pid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;
					var pobj1 = eval('(' + ajaxResponse + ')');

					count = 1;
					var htmlAccordian = "";
					var opdCount = 1;
					var ipdCount = 1;
					var diagCount = 1;

					$("#opdTab").html("");
					$("#ipdTab").html("");
					$("#diagnosisTab").html("");
					
					var opd_total_amount = 0;
					var opd_total_paid = 0;
					var opd_total_due = 0;
					
					var ipd_total_amount = 0;
					var ipd_total_paid = 0;
					var ipd_total_due = 0;
					
					var dai_total_amount = 0;
					var dai_total_paid = 0;
					var dai_total_due = 0;

					for ( var int = 0; int < (pobj1.lit.length); int++) {

						if ((pobj1.lit[int].rt) == "opd") {

							var refundReceiptAmount = 0;
							for ( var refundReceipt = 0; refundReceipt < (pobj1.lit[int].refundReceiptList.length); refundReceipt++) {
								refundReceiptAmount += (pobj1.lit[int].refundReceiptList[refundReceipt].pdAmt);
							}
							/*******start******@husen**for summery***********/
							opd_total_amount = opd_total_amount + (pobj1.lit[int].lib[0].ta);
							opd_total_paid = opd_total_paid + (pobj1.lit[int].lib[0].pa);
							opd_total_due = opd_total_due + (pobj1.lit[int].lib[0].ra);
							$("#opd_total_amount").val(opd_total_amount);
							$("#opd_total_paid").val(opd_total_paid);
							$("#opd_total_due").val(opd_total_due);		
							/****************end******************/
							htmlAccordian = ("<div class='panel-heading' style='border-top: 1px solid orange; padding: 5px'>"
									+ "<h4 class='panel-title'>"
									+ "<a data-toggle='collapse' data-parent='#accordion' href='#collapseOPD"
									+ opdCount
									+ "'>"

									+ "<table class='col-md-11-1' style='margin: 0px;'>"
									+ "<tbody><tr>"

									+ "<td class='col-md-1-1'>"
									+ (opdCount)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].ti)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].trCount)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].ta)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].pay)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].da)
									+ "</td>"

									+ "<td class='col-md-1-1' id = 'paidAmt_" 
									+ (pobj1.lit[int].ti)
									+ "'>"
									+ (pobj1.lit[int].lib[0].pa)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ ((parseFloat((pobj1.lit[int].lib[0].ra)) < 0) ? 0
											: (pobj1.lit[int].lib[0].ra))
									+ "</td>"

									+ "<td class='col-md-1-1' id = 'refundAmt_"
									+ (pobj1.lit[int].ti)
									+ "'>"
									+ (refundReceiptAmount)
									+ "</td>"

									+ "</tr></tbody></table>"
									+ "</a></h4>"

									+ "<button class='btn btn-xs btn-primary editUserAccess' data-target='#RefundReceipt'"
									+ " data-toggle='modal' onclick='setValuesRefundPreviousBillHist("
									+ (pobj1.lit[int].ti)
									+ ","
									+ (pobj1.lit[int].lib[0].pa)
									+ ")' style='line-height: 1.2;'>Refund</button>" + "</div>");

							if ((pobj1.lit[int].opdReceiptMasterList) != undefined) {

								if ((pobj1.lit[int].opdReceiptMasterList.length) > 0) {

									var htmlAccordianDataMaster = ("<div id='collapseOPD"
											+ opdCount + "' class='panel-collapse collapse'>");

									for ( var receiptMaster = 0; receiptMaster < (pobj1.lit[int].opdReceiptMasterList.length); receiptMaster++) {

										htmlAccordianDataMaster += ("<table class='table' style='margin: 0px;'>"
												+ "<tbody><tr>"

												+ "<td class='col-md-1-1'>Receipt no: "
												+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].idrm)
												+ "</td>"

												+ "<td class='col-md-1-1'>total: "
												+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].total)
												+ "</td>"

												+ "<td class='col-md-1-1'>Paid Amount: "
												+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].pdAmt)
												+ "</td>"

												+ "<td class='col-md-1-1'>Mode: "
												+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].pay_mode)
												+ "</td>"

												+ "<td class='col-md-1-1'>Date: "
												+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].recDate)
												+ "</td>" + "</tr></tbody></table>");

										htmlAccordianDataMaster += ("<table class='table table-striped table-bordered' style='margin-bottom: 0px; margin-left: 40px;'>"
												+ "<thead><tr>"
												+ "<th>Component Name</th>"
												+ "<th>Rate</th>"
												+ "<th>Qty.</th>"
												+ "<th>Total Discount</th>"
												+ "<th>Amount</th>"
												+ "<th>Net</th>"
												+ "</tr></thead><tbody>");

										for ( var receiptComp = 0; receiptComp < (pobj1.lit[int].opdReceiptMasterList[receiptMaster].listOPDReceiptComponant.length); receiptComp++) {

											htmlAccordianDataMaster += ("<tr class=''>"
													+ "<td class='col-md-3-1'>"
													+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].cname)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].crt)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].cqt)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].cdis)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].camt)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].opdReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].cnet)
													+ "</td>" + "</tr>");

										} // receiptComp

										htmlAccordianDataMaster += ("</tbody></table>");

									} // receiptMaster

									// start: refund receipts...
									// for ( var receiptRefund = 0;
									// receiptRefund <
									// (pobj1.lit[int].refundReceiptList.length);
									// receiptRefund++) {
									//
									// }
									// end: refund receipts...

									// close accordian <div>
									htmlAccordianDataMaster += ("</div>");

									htmlAccordian += (htmlAccordianDataMaster);

								}

								$("#opdTab").append(htmlAccordian);

							}

							(opdCount++);

						} else if ((pobj1.lit[int].rt) == "diagnosis") {

							var refundReceiptAmount = 0;
							for ( var refundReceipt = 0; refundReceipt < (pobj1.lit[int].refundReceiptList.length); refundReceipt++) {
								refundReceiptAmount += (pobj1.lit[int].refundReceiptList[refundReceipt].pdAmt);
							}
							/*******start******@husen**for summery***********/
							dai_total_amount = dai_total_amount + (pobj1.lit[int].lib[0].ta);
							dai_total_paid = dai_total_paid + (pobj1.lit[int].lib[0].pa);
							dai_total_due = dai_total_due + (pobj1.lit[int].lib[0].ra);
							$("#dai_total_amount").val(dai_total_amount);
							$("#dai_total_paid").val(dai_total_paid);
							$("#dai_total_due").val(dai_total_due);
							/*******end****************************/
							htmlAccordian = ("<div class='panel-heading' style='border-top: 1px solid orange; padding: 5px'>"
									+ "<h4 class='panel-title'>"
									+ "<a data-toggle='collapse' data-parent='#accordion' href='#collapseDIAG"
									+ diagCount
									+ "'>"

									+ "<table class='col-md-11-1' style='margin: 0px;'>"
									+ "<tbody><tr>"

									+ "<td class='col-md-1-1'>"
									+ (diagCount)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].ti)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].trCount)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].ta)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].pay)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].da)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].pa)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].ra)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (refundReceiptAmount)
									+ "</td>"

									+ "</tr></tbody></table>"
									+ "</a></h4>"

									+ "<button class='btn btn-xs btn-warning editUserAccess' data-target='#RefundReceipt'"
									+ " data-toggle='modal' onclick='setValuesRefundPreviousBillHist("
									+ (pobj1.lit[int].ti)
									+ ","
									+ (pobj1.lit[int].lib[0].pa)
									+ ")' style='line-height: 1.2;'>Refund</button>" + "</div>");

							if ((pobj1.lit[int].diagnosisReceiptMasterList) != undefined) {

								if ((pobj1.lit[int].diagnosisReceiptMasterList.length) > 0) {

									var htmlAccordianDataMaster = ("<div id='collapseDIAG"
											+ diagCount + "' class='panel-collapse collapse'>");

									for ( var receiptMaster = 0; receiptMaster < (pobj1.lit[int].diagnosisReceiptMasterList.length); receiptMaster++) {

										htmlAccordianDataMaster += ("<table class='table' style='margin: 0px;'>"
												+ "<tbody><tr>"

												+ "<td class='col-md-1-1'>Receipt no: "
												+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].idrm)
												+ "</td>"

												+ "<td class='col-md-1-1'>total: "
												+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].total)
												+ "</td>"

												+ "<td class='col-md-1-1'>Paid Amount: "
												+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].pdAmt)
												+ "</td>"

												+ "<td class='col-md-1-1'>Mode: "
												+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].pay_mode)
												+ "</td>"

												+ "<td class='col-md-1-1'>Date: "
												+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].recDate)
												+ "</td>" + "</tr></tbody></table>");

										htmlAccordianDataMaster += ("<table class='table table-striped table-bordered' style='margin-bottom: 0px; margin-left: 40px;'>"
												+ "<thead><tr>"
												+ "<th>Component Name</th>"
												+ "<th>Rate</th>"
												+ "<th>Qty.</th>"
												+ "<th>Total Discount</th>"
												+ "<th>Amount</th>"
												+ "<th>Net</th>"
												+ "</tr></thead><tbody>");

										for ( var receiptComp = 0; receiptComp < (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].listOPDReceiptComponant.length); receiptComp++) {

											htmlAccordianDataMaster += ("<tr class=''>"
													+ "<td class='col-md-3-1'>"
													+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].cname)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].crt)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].cqt)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].cdis)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].camt)
													+ "</td>"
													+ "<td class='col-md-1-1'>"
													+ (pobj1.lit[int].diagnosisReceiptMasterList[receiptMaster].listOPDReceiptComponant[receiptComp].cnet)
													+ "</td>" + "</tr>");

										} // receiptComp

										htmlAccordianDataMaster += ("</tbody></table>");

									} // receiptMaster

									// close accordian <div>
									htmlAccordianDataMaster += ("</div>");

									htmlAccordian += (htmlAccordianDataMaster);

								}

								$("#diagnosisTab").append(htmlAccordian);

							}

							(diagCount++);

						} else if ((pobj1.lit[int].rt) == "ipd") {

							var refundReceiptAmount = 0;
							for ( var receiptMaster = 0; receiptMaster < (pobj1.lit[int].lib[0].billAdvAmtList.length - 1); receiptMaster++) {
								if (pobj1.lit[int].lib[0].billAdvAmtList[receiptMaster].head == "Refund") {
									refundReceiptAmount += (pobj1.lit[int].lib[0].billAdvAmtList[receiptMaster].amt);
								}

							}
							/*******start******@husen**for summery***********/
							ipd_total_amount = ipd_total_amount + (pobj1.lit[int].lib[0].ta);
							if(pobj1.lit[int].lib[0].pa == undefined){
								ipd_total_paid = ipd_total_paid + 0.0;
							}else{
								ipd_total_paid = ipd_total_paid + (pobj1.lit[int].lib[0].pa);
							}
			                
			                ipd_total_due = ipd_total_due + (pobj1.lit[int].lib[0].ra);
							$("#ipd_total_amount").val(ipd_total_amount);
							$("#ipd_total_paid").val(ipd_total_paid);
							$("#ipd_total_due").val(ipd_total_due);
							/************end**********************/
							
							htmlAccordian = ("<div class='panel-heading' style='border-top: 1px solid orange; padding: 5px'>"
									+ "<h4 class='panel-title'>"
									+ "<a data-toggle='collapse' data-parent='#accordion' href='#collapseIPD"
									+ ipdCount
									+ "'>"

									+ "<table class='col-md-11-1' style='margin: 0px;'>"
									+ "<tbody><tr>"

									+ "<td class='col-md-1-1'>"
									+ (ipdCount)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].ti)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].trCount)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].ta)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].pay)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].da)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].ippaidamt)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (pobj1.lit[int].lib[0].ra)
									+ "</td>"

									+ "<td class='col-md-1-1'>"
									+ (refundReceiptAmount)
									+ "</td>"

									+ "</tr></tbody></table>"
									+ "</a></h4>"

									+ "<button class='btn btn-xs btn-warning editUserAccess' data-target='#RefundReceipt'"
									+ " data-toggle='modal' onclick='setValuesRefundPreviousBillHist("
									+ (pobj1.lit[int].ti)
									+ ","
									+ (pobj1.lit[int].lib[0].pa)
									+ ")' style='line-height: 1.2;'>Refund</button>" + "</div>");

							if ((pobj1.lit[int].lib[0].billAdvAmtList) != undefined) {

								if ((pobj1.lit[int].lib[0].billAdvAmtList.length) > 0) {

									var htmlAccordianDataMaster = ("<div id='collapseIPD"
											+ ipdCount + "' class='panel-collapse collapse'>");

									for ( var receiptMaster = 0; receiptMaster < (pobj1.lit[int].lib[0].billAdvAmtList.length - 1); receiptMaster++) {

										htmlAccordianDataMaster += ("<table class='table' style='margin: 0px;'>"
												+ "<tbody><tr>"

												+ "<td class='col-md-1-1'>Towards: "
												+ (pobj1.lit[int].lib[0].billAdvAmtList[receiptMaster].head)
												+ "</td>"

												+ "<td class='col-md-1-1'>Paid: "
												+ (pobj1.lit[int].lib[0].billAdvAmtList[receiptMaster].amt)
												+ "</td>"

												+ "<td class='col-md-1-1'>Date: "
												+ (pobj1.lit[int].lib[0].billAdvAmtList[receiptMaster].date)
												+ "</td>" + "</tr></tbody></table>");

									}

									// close accordian <div>
									htmlAccordianDataMaster += ("</div>");

									htmlAccordian += (htmlAccordianDataMaster);
								}
							}

							// ipdTab

							$("#ipdTab").append(htmlAccordian);

							(ipdCount++);

						}

					}

				}
			});

}

function getTotalBill(callFrom)
{
	 $("#TOTALAMT").val("");
	 $("#PAIDAMT").val("");
	 $("#DUEAMT").val("");
	if(callFrom == 'opd')
		{
		 //alert("123");
		 $("#showfeildsDiv").show('show');
		 $("#TOTALAMT").val($("#opd_total_amount").val());
		 $("#PAIDAMT").val($("#opd_total_paid").val());
		 $("#DUEAMT").val($("#opd_total_due").val());
		
		}
	else if(callFrom == 'ipd')
		{
		// alert("ipd");
		 $("#showfeildsDiv").show('show');
		 $("#TOTALAMT").val($("#ipd_total_amount").val());
		 $("#PAIDAMT").val($("#ipd_total_paid").val());
		 $("#DUEAMT").val($("#ipd_total_due").val());
		}
	else if(callFrom == 'daig')
	{
		// alert("daig");
		 $("#showfeildsDiv").show('show');
		 $("#TOTALAMT").val($("#dai_total_amount").val());
		 $("#PAIDAMT").val($("#dai_total_paid").val());
		 $("#DUEAMT").val($("#dai_total_due").val());
	}
	else if(callFrom == 'total')
	{
		 $("#showfeildsDiv").show('show');
		 /*calculate total bill*/
		 var OPD_AMT = 0;
		 var IPD_AMT = 0;
		 var DAI_AMT = 0;
		 if($("#opd_total_amount").val() != "")
			 {
			 OPD_AMT = parseFloat($("#opd_total_amount").val());
			 }
		 
		 if($("#ipd_total_amount").val() != "")
			 {
			 IPD_AMT = parseFloat($("#ipd_total_amount").val());
			 }
		 
		 if($("#dai_total_amount").val() != "")
			 {
			 DAI_AMT = parseFloat($("#dai_total_amount").val());
			 }
		 
		 $("#TOTALAMT").val(OPD_AMT + IPD_AMT + DAI_AMT);
		 
		 var OPD_PAID = 0;
		 var IPD_PAID = 0;
		 var DAI_PAID = 0;
		 if($("#opd_total_paid").val() != "")
			 {
			 OPD_PAID = parseFloat($("#opd_total_paid").val());
			 }
		 
		 if($("#ipd_total_paid").val() != "")
			 {
			 IPD_PAID = parseFloat($("#ipd_total_paid").val());
			 }
		 
		 if($("#dai_total_paid").val() != "")
			 {
			 DAI_PAID = parseFloat($("#dai_total_paid").val());
			 }
		 
		 $("#PAIDAMT").val(OPD_PAID + IPD_PAID + DAI_PAID);
		 
		 var OPD_DUE = 0;
		 var IPD_DUE = 0;
		 var DAI_DUE = 0;
		 if($("#opd_total_due").val() != "")
			 {
			 OPD_DUE = parseFloat($("#opd_total_due").val());
			 }
		 
		 if($("#ipd_total_due").val() != "")
			 {
			 IPD_DUE = parseFloat($("#ipd_total_due").val());
			 }
		 
		 if($("#dai_total_due").val() != "")
			 {
			 DAI_DUE = parseFloat($("#dai_total_due").val());
			 }
		 
		 $("#DUEAMT").val(OPD_DUE + IPD_DUE + DAI_DUE);		 
	
	}
	
}

function setValuesRefundPreviousBillHist(treatmentID, paidAmount) {
	$("#treatmentID").val(treatmentID);
	$("#tdEdTotAmountPaidLabelID").html(paidAmount);
}

function showPopupOfPwdToRefundChange() {
	$("#RefundChangePsswrdPopUp").modal('show');
	$("#refundPwd").val("");
	
}

function closeRefundChangePwdPopup() {
	$("#RefundChangePsswrdPopUp").modal('hide');
}

function RefundChangePwdPopup(OPDIPDDIAG) {
	var pwdofToChangeRefund = $("#refundPwd").val();
	if (pwdofToChangeRefund == "") {
		alert("Please enter password to change refund");
		return false;
	}

	var inputs = [];
	inputs.push('action=CheckPasswordOfAdmin');
	inputs.push('pwdofAdmissionDate=' + pwdofToChangeRefund);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			// alert(r);
			if (r.match(true)) {
				
				$("#RefundChangePsswrdPopUp").modal('hide');
				
				setTimeout(function() {
							saveRefundReceiptDetails('OPDIPDDIAG');
				}, 1000);
			} else {
				alert("password is not correct");
				$("#RefundChangePsswrdPopUp").modal('hide');
			}
			
		}
	});
}


function nurseValueSet(value, row) {
	
	ajaxResponse  = $("#nursingnotesAjax").html();
	json2 = JSON.parse(ajaxResponse);
	
	for ( var i = 0; i < json2.nlist.length; i++) {
		if (json2.nlist[i].nid == value) {
			
			myObj = json2.nlist[i];
			break;
		}
	}
	$("#note" + row).val(myObj.notes);
}

function docOrNurSet(value, row, rowid) {
	// alert("value"+value);
	// alert("rowid-->"+rowid);
	// setDoctorTempleteOnLoad(rowid,row);
	$("#userUpdate").val(value);
	// $('#iPackage').modal('show');
	$('#iPackage').show('show');
	var preTreat = $("#preTreat").val();
	if(preTreat=="Y"){
		$("#saveBtn").hide();
		$("#iPackage").hide();
		$("#saveIPDServNusring").hide();
		$("#ipdPrintBtn").hide();
		$("#ipdPrintBtn").attr("disabled","disabled");
		$("#deleteIPDServicesLabel").attr("disabled","disabled");
	}

}

function hidePopupNursingChart() {
	$("#password").val("");
	$("#iPackage").hide('hide');
}
function hidePopup() {
	$("#password").val("");
	$("#iPackage").hide('hide');
}

function savepass() {
	// calling save function
	saveDIC();
	$("#iPackage").hide('hide');

}

// Touheed code for print nursing chart
// Date 27-Jan-2016
function ipdNursingPrint() {
	var pid = $.trim($("#pid").val());
	// alert(pid);
	var tid = $.trim($("#tid").val());
	// alert(tid);
	var tot = $.trim($("#Total").val());
	// alert("tot="+tot);
	// Getting print type value from ui
	var printType = $('input[name="printType"]:checked').val();
	// alert("radio:"+ printType);
	var date_pick = $.trim($("#date-pick").val());
	//alert(date_pick);
	/*ajaxResponse = $("#patobject").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];

			break;
		}
	}

	myObj = JSON.stringify(myObj);*/
	// alert("myObj===>"+myObj);
	setTimeout(
			function() {
				if(printType=="NurrsingAsses"||printType=="prepostChecklist"){ 
					window.open(("iPD_NurrsingAsses.jsp?" + 
							"pid="+ encodeURIComponent(pid) + 
							"&tid="+ encodeURIComponent(tid) + 
							"&printType="+ encodeURIComponent(printType)));  
				}else if(printType=="oneDayAsses"){
					window.open(("ehat_initial_assessment_print.jsp?" + 
							"pid="+ encodeURIComponent(pid) + 
							"&tid="+ encodeURIComponent(tid) + 
							"&printType="+ encodeURIComponent(printType)));
				}else if(printType=="monitoringSheet"){
						window.open(("IPD_MonitoringSheet_Print.jsp?" + 
							"pid="+ encodeURIComponent(pid) + 
							"&tid="+ encodeURIComponent(tid)));
				}else if(printType=="nursingAssessment"){
					window.open(("IPD_NursingAssessment_Print.jsp?" + 
							"pid="+ encodeURIComponent(pid) + 
							"&tid="+ encodeURIComponent(tid)));
				}else{
				window.open(("ipd_nurshing_station_print.jsp?" + "pid="
								+ encodeURIComponent(pid) + "&tid="
								+ encodeURIComponent(tid) + "&printType="
								+ encodeURIComponent(printType) + "&date_pick="
								+ encodeURIComponent(date_pick) ));//+ "&myObj=" + encodeURIComponent(myObj)
				
			}
			}, 300);

	hidePrintPopup();
	return;
}

// makeUserselect(value, row, rowid)
function makeUserselect(row, rowid) {
	$("#" + rowid).val("0");

}

function showPrintPopup() {
	$("#iPrint").show('show');
}
function hidePrintPopup() {
	$("#iPrint").hide('show');
}

function printTicket(patID)

{
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : patID
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			count=50;
 			var ptName=r.listRegTreBillDto[0].patientName;
 			//var OpdIpdNo=r.listRegTreBillDto[0].trcount;
	
	var dt=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString();
	
		//var ipdAdmissionDate = $("#opdVisitDate").val();
	//	var patName = $("#patName").html();
		var WindowObject = window.open('', '_blank', '_blank');
		
		WindowObject.document
				.writeln('<html><style type="text/css" media="print"> @page { size: landscape; }</style><body style="width:100%; height: 100%; "><div style="width:100%; height: 100%; "><div style="width: 100%; margin-top: 2.3cm;margin-left: 0.7cm; font-size: 12px;"><div>P.N:'
						+ ptName
						+ '</div><div>Registration Date:'
						+ dt
						+ '</div><div style="margin-top: 4px;"><img src="BarcodeServlet?pid='
						+ r.listRegTreBillDto[0].patientId +'"></img></div></div></div>');
		
		WindowObject.document.write('</body></html>');
		
		WindowObject.document.close();

		WindowObject.focus();
		
		WindowObject.print();
		
		WindowObject.close();
		}
});

	}

function PrintCardFunction(pid)
{
	$("#trid").val(pid);
	$("#iPopUp").show('show');
	$("#pid11").val(pid);
}
//@Author -Sagar-To generate Barcode 
//@Date-28-Aug-2017
function PrintCardFunctionBarcode(masterId)
{
	var noOfBarcode=$("#noOfBarCode").val();
	if(noOfBarcode==0 || noOfBarcode=="")
		{
			alert("please enter atleast one barcode");
			return false;
		}
	var masterId=$("#trid").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : masterId
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			count=50;
 			var ptName=r.listRegTreBillDto[0].patientName;
 			var OpdIpdNo=r.listRegTreBillDto[0].trcount;
 			var age=r.listRegTreBillDto[0].age;
 			var patientId =r.listRegTreBillDto[0].patientId;
   			//$("#OpdIpdNo").val(r.listRegTreBillDto[0].trcount);
  			//$("#ptName").val(r.listRegTreBillDto[0].patientName);
 			$("#trid").val(masterId);
//	window.open("ehat_lab_barcode.jsp?masterId="+masterId+"&count="+noOfBarcode+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age);
 			window.open("ehat_lab_barcode.jsp?masterId="+patientId+"&count="+noOfBarcode+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age);

		}
	});
}

//Modified By @Author-Sagar,Date-29-Aug-2017
function PrintCardFunctiononpopup()
{
var id=	$("#trid").val();
var risingFlow=	$("#risingFlow").val();
var namcoFlow=	$("#namcoFlow").val();

var printType = $("input[name=printType]:checked").val();
var printType1 = "";
 if(document.getElementById('PrintSticker48').checked)
	 {
	 printType1="48";
	 }
 else
	 {
	 printType1="24";
	 }
// alert("printType1"+printType1);

	if(printType == "printSticker"){

		//if(risingFlow=="on" || namcoFlow=="on"){
		if(printType1 == "48")
			{
			 window.open(("Single_Sticker.jsp?" + "treatId=" + encodeURIComponent(id) +"&Type=idsticker"+ "&printType1=" + printType1 ));
			}
		else{
			 window.open(("Single_Sticker24.jsp?" + "treatId=" + encodeURIComponent(id) +"&Type=idsticker"+ "&printType1=" + printType1 ));

		}
	
		/*}else{
		printDetails(id);
		}*/	
			
	       
	}else if(printType == "printCard"){
		if(risingFlow=="on"){
			setTimeout(
					function() {
						window
								.open(("printCard.jsp?" + "treatId="
										+ encodeURIComponent(id) ));
					}, 300);
			
		}
		else
			{
			setTimeout(
					function() {
						window
								.open(("printCard.jsp?" + "treatId="
										+ encodeURIComponent(id) ));
					}, 300);
			}
		/*}else{
		printCard(id);
		}*/
	}else{
		if(risingFlow=="on"){
			 window.open(("Single_Sticker.jsp?" + "treatId=" + encodeURIComponent(id) +"&Type=idPrintSticker" +"&printType1=" + printType1 )); 
	
		}
		else{
			 window.open(("Single_Sticker.jsp?" + "treatId=" + encodeURIComponent(id) +"&Type=idPrintSticker" + "&printType1=" + printType1 )); 

		}
		/*else{
			 printTicket(id);

		}*/
		
	}
	
	/*var pid =$("#pid11").val();
	if(document.getElementById('idPrintCard').checked) {
		printCard(pid);
	}
	if(document.getElementById('idPrintSticker').checked){
		var ajaxResponse = $("#allPatInfo").html();
		var myArray = JSON.parse(ajaxResponse);

		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == pid) {
				myObj = myArray.pl[i];
				break;
			}
		}
		 $("#opdVisitDate").val(myObj.rgDt);
		 $("#patName").html((myObj.tit) + (myObj.fn) + " " + (myObj.mn) + " "+ (myObj.ln));*/
		
	//}
}

function closePrintPopup()
{
	$("#iPopUp").hide('show');
}

function closePrintPopup1()
{
	$("#iPopUp24").hide('show');
}


/*******************************************************************************
 * @author Kishor Lokhande
 * @date 2_June_2017
 * @Code Get all Patient records.
 ******************************************************************************/
function getAllPatientRecordsdoctordesk(callform) {
			//alert("hi");
 	
	if(callform=='onload'){
		
		 deptId = 1;
		
	}else if(callform=='IPD'){
		deptId = 2;
		
	}
	else if(callform=='Digno'){
		deptId = 3;
		
	}
	else if(callform=='emergency'){
		//alert("in");
		deptId = -5;
		
	}
	//alert(deptId);
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data 	: {
			 "deptId" : deptId,
	 			},
		url : "ehat/registration/getAllRecordsDeptwise",
		success : function(r) {
			//setTempPatientRecords(r);
			//alert(JSON.stringify(r));
			
			

			$("#OPDPatientList").html(r);
			 
			if(callform=='onload'){
				count=1;
				$("#opdpatientid").val(r.listRegTreBillDto[r.listRegTreBillDto.length-1].patientId);
				//alert(r.listRegTreBillDto.length);
				//alert(r.listRegTreBillDto[r.listRegTreBillDto.length-1].patientId);
				$("#containerOPD").setTemplate(tabopdtempalte);
				$("#containerOPD").processTemplate(r);
				$("#byName1").val("");
				$("#byId1").val("");
				$("#byName").val("");
				$("#byId").val("");
				
			}else if(callform=='IPD'){
				count=1;
				//$("#container").setTemplate(tabopdtempalte);
				//$("#container").processTemplate(r);
				//autoCompTablefoDoctorDesk(r,inputId)
				IpdPatientsTemp(r);
			}
			
			else if(callform=='Digno'){
				 
				setDignobillPatientsTemp(r);
 			}else if(callform=='emergency'){
				 
 				emergencyPatientTemp(r);
 			}
			
		}
	});
}




function getAllPatientRecordsdoctordesk12(callform) {
	//alert("hi");

if(callform=='onload'){

 deptId = 1;
 var patientId=$("#opdpatientid").val();

}else if(callform=='IPD'){
deptId = 2;
var patientId=$("#opdpatientid").val();
//alert(patientId);

}
else if(callform=='Digno'){
deptId = 3;

}
else if(callform=='emergency'){
//alert("in");
deptId = -5;

}
//alert(deptId);

jQuery.ajax({
async : true,
type : "POST",
data 	: {
	 "deptId" : deptId,
	 "patientId":patientId
			},
url : "ehat/registration/getAllRecordsDeptwise12",
success : function(r) {


	$("#OPDPatientList").html(r);
	
	if(r.listRegTreBillDto.length==0)
	{
	alert("No Record Found");
	return false;
	}
	 
	if(callform=='onload'){
		count=1;
		$("#opdpatientid").val(r.listRegTreBillDto[r.listRegTreBillDto.length-1].patientId);
		//$("#opdpatientid").val(r.listRegTreBillDto[0].patientId);
		$("#containerOPD").append(tabopdtempalte);
		//$("#containerOPD").processTemplate(r);
		$("#byName1").val("");
		$("#byId1").val("");
		$("#byName").val("");
		$("#byId").val("");
		var tabopdtempalte="";
		var visitCount="";
	//	var rowCount=$("#opdpatientid11").val();
		
		var rowCount = $('#opdtable >tbody >tr').length;
		//alert("rowCount="+rowCount);
				for(var indx=0;indx<r.listRegTreBillDto.length;indx++){
			 
			rowCount=++rowCount;
				 
			//$("#opdpatientid11").val(rowCount);
		//	alert(r.listRegTreBillDto[indx].visitCount);
			
			  if(typeof(r.listRegTreBillDto[indx].visitCount) === "undefined"){
				  visitCount=""; // return 0 as replace, and end function execution
			    } 
			
		tabopdtempalte =tabopdtempalte+"<tr id='trcount{rowCount}'>"
			+ "<td class='center' style='width: 5%;'>"+rowCount+"</td>"
			+ "<td class='' style='width: 13%'>"+r.listRegTreBillDto[indx].patientId+"</td>"
			+ "<td class='' style='width: 13%'>"+r.listRegTreBillDto[indx].mrnno+"</td>"
			+ "<td class='col-md-3-1 center TextFont'>"+r.listRegTreBillDto[indx].createdDateTime+"</td>"
			+ "<td class='' style='width: 25%;'>"+r.listRegTreBillDto[indx].patientName+"</td>"
			+ "<td class='center' style='width: 14%;'>"+r.listRegTreBillDto[indx].age+":"+r.listRegTreBillDto[indx].gender+"</td>"
			+ "<td class='center' style='width: 7%;'>"+visitCount+"</td>"	
			+ "<td class='center' style='width: 7%;'>"+r.listRegTreBillDto[indx].tokenno+"</td>"	

			+ "<td class='center' style='width: 7%;'>"
			
		if(r.listRegTreBillDto[indx].doctorId ==''){
			tabopdtempalte=tabopdtempalte	+ "<button onclick=viewDoctorDeskAlldepartment("+r.listRegTreBillDto[indx].treatmentId+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>";
		}else{
			tabopdtempalte=tabopdtempalte	+ "<button onclick=viewDoctorDeskAlldepartment("+r.listRegTreBillDto[indx].treatmentId+","+r.listRegTreBillDto[indx].doctorId+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>";
		}

		tabopdtempalte=tabopdtempalte+   "</td>"

			+ "</tr>";
		
		
		}
		$("#containerOPD").append(tabopdtempalte);
		//$("#containerOPD").setTemplate(tabopdtempalte);
		//$("#containerOPD").processTemplate(r);
		
		
	}else if(callform=='IPD'){
		count=1;

		IpdPatientsTemp12(r);
	}
	
	else if(callform=='Digno'){
		 
		setDignobillPatientsTemp(r);
		}else if(callform=='emergency'){
		 
			emergencyPatientTemp(r);
		}
	
}
});
}
/*-------------------------------------------------------------------------------------------*/





/*-------------------------------------------------------------------------------------------*/


function emergencyPatientTemp(res)
{

	
	var count=1;
	var ipdqueueTemp = "";
		
	
	for(var indx=0;indx<res.listRegTreBillDto.length;indx++){
		var date=new Date(res.listRegTreBillDto[indx].createdDateTime).toLocaleString();
		var fullName=res.listRegTreBillDto[indx].patientName;
		var deptId=res.listRegTreBillDto[indx].departmentId;
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td  style='width: 2%;'>"+count+"</td>"
		//+ "	<td  style='width: 2%;'>"+res.listRegTreBillDto[indx].patientId+"</td>"
		+ "	<td  style='width: 2%;'>"+res.listRegTreBillDto[indx].centerPatientId+"</td>"
		+ "	<td  style='width: 8%;'>"+res.listRegTreBillDto[indx].mrnno+"</td>"

		+ "	<td  style='width: 8%;' id='divPi"+count+"' >"+fullName+"</td>"
		+ "	<td style='width: 3%;'>"+res.listRegTreBillDto[indx].age+"</td>"

		+ "	<td class='center' style='width: 2%;' >"+res.listRegTreBillDto[indx].weight+"</td>"
		+ "	<td  style='width: 7%;'>"+res.listRegTreBillDto[indx].opdipdno+"</td>"

		+ "	<td class='center' style='width: 4%;'>"+date+"</td>"
		
		+ "<td class='center' style='width: 3%;'>";
		
		if(deptId == 1){
			ipdqueueTemp=ipdqueueTemp	+ "<button onclick=viewDoctorDeskAlldepartment("+res.listRegTreBillDto[indx].treatmentId+","+res.listRegTreBillDto[indx].doctorId+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>";
		}else if(deptId == 2){
			ipdqueueTemp=ipdqueueTemp	+ "<button onclick=viewBedWard("+res.listRegTreBillDto[indx].treatmentId+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>";
		}

		ipdqueueTemp=ipdqueueTemp+   "</td>"
		
		
		
		
		 +"</tr>";		
		
		count=count+1;
	}
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#containerER").html(ipdqueueTemp);
	
}

/************
* @author	: Sagar
* @date		: 30-June-2017
* @codeFor	: Set ipd queue template
 ************/
function  IpdPatientsTemp(res){
	

	var count=1;
	var ipdqueueTemp = "";
		/*<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-stripped cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
		+ "<th class='col-md-2-1' style='padding-left: 0px;'><label class='TextFont'>Mrn No</label></th>"

		+ "<th class='col-md-2-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"

		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Age</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Weight</label></th>"

		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Date/Time</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Ward</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Bed No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Action</label></th>"




		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Print</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
		+ "	<table class='table table-condensed table-stripped cf'>"
		+ "<tbody class='cf'>";
	*/
	 
	
	for(var indx=0;indx<res.listRegTreBillDto1.length;indx++){
		var date=new Date(res.listRegTreBillDto1[indx].createdDateTime).toLocaleString();
		var fullName=res.listRegTreBillDto1[indx].patientName;
		
		$("#opdpatientid").val(res.listRegTreBillDto1[indx].patientId);
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td  style='width: 2%;'>"+count+"</td>"
		//+ "	<td  style='width: 2%;'>"+res.listRegTreBillDto1[indx].patientId+"</td>"
		+ "	<td  style='width: 2%;'>"+res.listRegTreBillDto1[indx].centerPatientId+"</td>"
		+ "	<td  style='width: 4%;'>"+res.listRegTreBillDto1[indx].mrnno+"</td>"
		+ "	<td  style='width: 5%;'>"+date+"</td>"
		+ "	<td  style='width: 8%;' id='divPi"+count+"' >"+fullName+"</td>"
		//+ "	<td class='col-sm-1-1' id='divPi"+count+"' style='height: 21.5px;'>"+res.listRegTreBillDto[indx].patientId+"</td>"
		+ "	<td style='width: 3%;'>"+res.listRegTreBillDto1[indx].age+"</td>"

		+ "	<td class='center' style='width: 2%;' >"+res.listRegTreBillDto1[indx].weight+"</td>"
		+ "	<td  style='width: 7%;'>"+res.listRegTreBillDto1[indx].opdipdno+"</td>"

		
		/*+ "	<td class='center' style='width: 3%;'>--</td>"
		+ "	<td  style='width: 2%;padding-left: 25px;'>--</td>"*/




		
		+ "<td class='center' style='width: 3%;'>"

		+ "<button onclick=viewBedWard("+res.listRegTreBillDto1[indx].treatmentId+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "</td>"
		/*+ "<td  style='width: 3%;'>"
		+ "<button onclick=printIPDFormJsp("+res.listRegTreBillDto[indx].patientId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"*/
		
		
		
		 +"</tr>";		
		
		count=count+1;
	}
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#container").html(ipdqueueTemp);
}

/**********************************************/
function  IpdPatientsTemp1(res){
	

	var count=1;
	var ipdqueueTemp = "";
		/*<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-stripped cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
		+ "<th class='col-md-2-1' style='padding-left: 0px;'><label class='TextFont'>Mrn No</label></th>"

		+ "<th class='col-md-2-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"

		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Age</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Weight</label></th>"

		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Date/Time</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Ward</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Bed No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Action</label></th>"




		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Print</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
		+ "	<table class='table table-condensed table-stripped cf'>"
		+ "<tbody class='cf'>";
	*/
	 
	
	for(var indx=0;indx<res.listRegTreBillDto.length;indx++){
		var date=new Date(res.listRegTreBillDto[indx].createdDateTime).toLocaleString();
		var fullName=res.listRegTreBillDto[indx].patientName;
		
		$("#opdpatientid").val(res.listRegTreBillDto[indx].patientId);
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td  style='width: 2%;'>"+count+"</td>"
		+ "	<td  style='width: 2%;'>"+res.listRegTreBillDto[indx].patientId+"</td>"
		+ "	<td  style='width: 4%;'>"+res.listRegTreBillDto[indx].mrnno+"</td>"
		+ "	<td  style='width: 5%;'>"+date+"</td>"
		+ "	<td  style='width: 8%;' id='divPi"+count+"' >"+fullName+"</td>"
		//+ "	<td class='col-sm-1-1' id='divPi"+count+"' style='height: 21.5px;'>"+res.listRegTreBillDto[indx].patientId+"</td>"
		+ "	<td style='width: 3%;'>"+res.listRegTreBillDto[indx].age+"</td>"

		+ "	<td class='center' style='width: 2%;' >"+res.listRegTreBillDto[indx].weight+"</td>"
		+ "	<td  style='width: 7%;'>"+res.listRegTreBillDto[indx].opdipdno+"</td>"

		
		/*+ "	<td class='center' style='width: 3%;'>--</td>"
		+ "	<td  style='width: 2%;padding-left: 25px;'>--</td>"*/




		
		+ "<td class='center' style='width: 3%;'>"

		+ "<button onclick=viewBedWard("+res.listRegTreBillDto[indx].treatmentId+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "</td>"
		/*+ "<td  style='width: 3%;'>"
		+ "<button onclick=printIPDFormJsp("+res.listRegTreBillDto[indx].patientId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"*/
		
		
		
		 +"</tr>";		
		
		count=count+1;
	}
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#container").html(ipdqueueTemp);
}


/**********************************************/
 

function  IpdPatientsTemp12(res){

	var count=1;
	var ipdqueueTemp = "";
		/*<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed table-stripped cf'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
		+ "<th class='col-md-2-1' style='padding-left: 0px;'><label class='TextFont'>Mrn No</label></th>"

		+ "<th class='col-md-2-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"

		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Age</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Weight</label></th>"

		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Date/Time</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission Ward</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Bed No</label></th>"
		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Action</label></th>"




		+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Print</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
		+ "	<table class='table table-condensed table-stripped cf'>"
		+ "<tbody class='cf'>";
	*/
	var rowCount = $('#ipdtable >tbody >tr').length;
	for(var indx=0;indx<res.listRegTreBillDto.length;indx++){
		var date=new Date(res.listRegTreBillDto[indx].createdDateTime).toLocaleString();
		var fullName=res.listRegTreBillDto[indx].patientName;
		 rowCount=++rowCount
		$("#opdpatientid").val(res.listRegTreBillDto[indx].patientId);
		ipdqueueTemp=ipdqueueTemp+"<tr>"
		+ "	<td  style='width: 2%;'>"+rowCount+"</td>"
		+ "	<td  style='width: 2%;'>"+res.listRegTreBillDto[indx].patientId+"</td>"
		+ "	<td  style='width: 4%;'>"+res.listRegTreBillDto[indx].mrnno+"</td>"
		+ "	<td  style='width: 5%;'>"+date+"</td>"
		+ "	<td  style='width: 8%;' id='divPi"+count+"' >"+fullName+"</td>"
		//+ "	<td class='col-sm-1-1' id='divPi"+count+"' style='height: 21.5px;'>"+res.listRegTreBillDto[indx].patientId+"</td>"
		+ "	<td style='width: 3%;'>"+res.listRegTreBillDto[indx].age+"</td>"

		+ "	<td class='center' style='width: 2%;' >"+res.listRegTreBillDto[indx].weight+"</td>"
		+ "	<td  style='width: 7%;'>"+res.listRegTreBillDto[indx].opdipdno+"</td>"

		
		/*+ "	<td class='center' style='width: 3%;'>--</td>"
		+ "	<td  style='width: 2%;padding-left: 25px;'>--</td>"*/




		
		+ "<td class='center' style='width: 3%;'>"

		+ "<button onclick=viewBedWard("+res.listRegTreBillDto[indx].treatmentId+") type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
		+ "</td>"
		/*+ "<td  style='width: 3%;'>"
		+ "<button onclick=printIPDFormJsp("+res.listRegTreBillDto[indx].patientId+") class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
		+ "</td>"*/
		
		
		
		 +"</tr>";		
		
		
		//count=count+1;
	}
	ipdqueueTemp=ipdqueueTemp+"</tbody></table></div>";
	$("#container").append(ipdqueueTemp);
}





/*******************************************************************************
 * @author Sagar Kadam
 * @date 12_July_2017
 * @Code Get all Patient records.
 ******************************************************************************/
function getAllDignoPat(callfrom) {
	// alert("in js");
	var deptId = 3;
	
	/*if(callfrom=="Digno"){
		
		deptId = 3;
		
	}*/
	// $("#depId").val(deptId);
	//alert(deptId);
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"deptId" : deptId
		},
		
		url : "ehat/registration/getAllRecordsForOPDque1",
		success : function(r) {
			
			$("#appointedpatientDiv").html(r);
			//setTempPatientForOPDque1(r);
			if(callfrom=="Digno"){
				setDignobillPatientsTemp(r);
	  		}
			if(callfrom=="DignoTest"){
				setDignoTestPatientsTemp(r);
	  		}
			
			 
			 
		}
	});
}

/*******************************************************************************
 * @author Sagar kadam
 * @date 27_Jul_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function getAllDignoPatRecWithAutoSugg(inputId,callfrom) {
 	var deptId=3;
	var usertype = "";
	var letter="";
	if ( callfrom == "search") {
		letter=$("#byId").val();
		usertype = "Y";
	}else{		
		letter=$("#byName").val();
	}
 	var inputs = [];	
 	inputs.push('usertype=' + usertype);
	inputs.push('letter=' + letter);
    inputs.push('deptId=' + deptId);
        var str = inputs.join('&');
        jQuery.ajax({
        	async	: false,
        	type	: "POST",
        	data	: str + "&reqType=AJAX",
        	url		: "ehat/registration/getAllRecordsDeptwiseWithAuto",
        	timeout : 1000 * 60 * 15,
        	cache	: false,
        	success : function(r) {
         			setDignobillPatientsTemp(r);
        			setDignoTestPatientsTemp(r);
        			$("#byId").val("");
        		//AllDignoPatRecsAutsggTemp(r,inputId);
        	}
        });
}
 
/*

function viewBillForDigno(treatId) {

	window.location.href = "ehat_ipd_billing.jsp?" + "treatmentId="
			+ encodeURIComponent(treatId);
}
*/

/*******************************************************************************
 * @author Sagar kadam
 * @date 27_Jul_2017
 * @Code for digno bill 
 ******************************************************************************/
function viewBillForDigno(treatId) {
	
 	window.location = "ehat_billing.jsp?" + "treatmentId=" + treatId;

	/*
	 * window.location = "ehat_billing.jsp?" + "myObj=" +
	 * encodeURIComponent(myObj) + "&pageType=" + pageType;
	 */
}

function setChkremovetext(){
	$.each($('#chktext:checked'), function() {
	    $('table tr').has($('#chktext:checked')).remove();
	});
	
	
}

/*******************************************************************************
 * @author Sagar kadam
 * @date 27_Jul_2017
 * @Code temp for digno patient test
 ******************************************************************************/
function setDignoTestPatientsTemp(res) {

	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	var count = 0;
	var dignoqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
			//+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 70px;'>UHID</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Reg.Date</label></th>"

			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Add Test</label></th>"
			+ "</tr>"
			+ "</thead>"
			+ "</table>"
			+ "</div>"
			+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
			+ "	<table class='table table-condensed table-stripped cf'>"
			+ "<tbody class='cf'>";
	
	/*var len = res.listEhatBillPrefix.length;		
	var prefix="";
	var middle="";
	var sufix="";
	for(var n=0;n<len;n++){
	
  		var lst = res.listEhatBillPrefix[n];
  		// For Patient Id  		
  		if(lst.depId==4){
  			
  			prefix=lst.billPrefix;
  			middle=lst.billMiddle;
  			sufix=lst.billSuffix;  			  					  			
  		}
  		// For Patient Id  			
  	}*/

	for ( var indx = 0; indx < res.listRegTreBillDto.length; indx++) {
//alert(res.listRegTreBillDto[indx].patientName);
		var fullName = res.listRegTreBillDto[indx].patientName;
		// change by sonu patientId to centerPatientId
		var patId= patPrefix + patMiddle + res.listRegTreBillDto[indx].centerPatientId + patSufix; 		
		var datetime= new Date(res.listRegTreBillDto[indx].createdDateTime).toLocaleString();
		dignoqueueTemp = dignoqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
				+ count
				+ "</td>"
				+ "	<td class='col-sm-3-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"
				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ patId
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>" 
				+res.listRegTreBillDto[indx].opdipdno
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"+datetime+"</td>"

				
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='Add Test' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
				+ count + "' " + "		onclick=viewDiagnosticsPatientAssignTests2("
				+ res.listRegTreBillDto[indx].treatmentId
				+ ") style='font-size: 12px;' />" + "	</td></tr>";

		count = count + 1;
	}
	dignoqueueTemp = dignoqueueTemp + "</tbody></table></div>";
	$("#DignoTestPatients").html(dignoqueueTemp);
}

/*******************************************************************************
 * @author Sagar kadam
 * @date 27_Jul_2017
 * @Code temp for digno patient bill
 ******************************************************************************/
function setDignobillPatientsTemp(res) {

	var patPrefix=$("#patPrefix").val();
	var patMiddle=$("#patMiddle").val();
	var patSufix=$("#patSufix").val();
	
	var count = 1;
	var dignoqueueTemp = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed table-stripped cf'>"
			+ "<thead class='cf'>"
			+ "<tr>"
			+ "<th class='col-md-1-1' style=''><label class='TextFont'>#</label></th>"
			+ "<th class='col-md-3-1' style='padding-left: 0px;'><label class='TextFont'>Patient Name</label></th>"
			//+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Patient ID</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 70px;'>UHID</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>Admission No</label></th>"
			+ "<th class='col-md-2-1' style=''><label class='TextFont' style='padding-left: 20px;'>View Bill</label></th>"
			+ "</tr>"
			+ "</thead>"
			+ "</table>"
			+ "</div>"
			+ "<div class='col-sm-12-1' style='margin-top:-21px; overflow-y: scroll; height: 430px; max-height: auto;'>"
			+ "	<table class='table table-condensed table-stripped cf'>"
			+ "<tbody class='cf'>";
	
	
	/*var len = res.listEhatBillPrefix.length;		
	var prefix="";
	var middle="";
	var sufix="";
	for(var n=0;n<len;n++){
	
  		var lst = res.listEhatBillPrefix[n];
  		// For Patient Id  		
  		if(lst.depId==4){
  			
  			prefix=lst.billPrefix;
  			middle=lst.billMiddle;
  			sufix=lst.billSuffix;  			  					  			
  		}
  		// For Patient Id  			
  	}*/

	for ( var indx = 0; indx < res.listRegTreBillDto.length; indx++) {
 		var fullName = res.listRegTreBillDto[indx].patientName; 
 		// here change by sonu patientId to centerPatientId
 		var patId= patPrefix + patMiddle + res.listRegTreBillDto[indx].centerPatientId + patSufix; 		
		dignoqueueTemp = dignoqueueTemp
				+ "<tr>"
				+ "	<td class='col-sm-1-1' style='height: 21.5px;'>"
				+ count
				+ "</td>"
				+ "	<td class='col-sm-3-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ fullName
				+ "</td>"
				+ "	<td class='col-sm-2-1' id='divPi"
				+ count
				+ "' style='height: 21.5px;'>"
				+ patId
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'> " 
				+res.listRegTreBillDto[indx].opdipdno
				+ "</td>"
				+ "	<td class='col-sm-2-1' style='height: 21.5px;'>"
				+ "		<input type='button' value='View Bill' class='btn btn-xs btn-success editUserAccess' id='btnDelete"
				+ count + "' " + "		onclick=viewBillForDigno("
				+ res.listRegTreBillDto[indx].treatmentId
				+ ") style='font-size: 12px;' />" + "	</td></tr>";

		count = count + 1;
	}
	dignoqueueTemp = dignoqueueTemp + "</tbody></table></div>";
	$("#DignoBillPatients").html(dignoqueueTemp);
}


/************
* @author	: Sagar Kadam
* @date		: 27-June-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
function  AllDignoPatRecsAutsggTemp(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'patientName'
		}, /*
			 * { name : 'unitCode', //width : '80px', valueField :
			 * 'unitCode' }
			 */],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.patientName != 'Match') {
			
				 
				$('#'+id).val(ui.item.patientName);
			}
			/*
			 * This function use for Enter keypress search
			 */
			
		 
			//getAllPatientRecords2(id,'search');
			getAllDignoPatRecWithAutoSugg(id,'search');
			//setAutoCompleteMarkVisit(id, 'search');
			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listRegTreBillDto.length);
			var result;
			if (!data || data.listRegTreBillDto.length === 0 || !data.listRegTreBillDto
					|| data.listRegTreBillDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Record',
					'patientId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listRegTreBillDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}


/*******************************************************************************
 * @author paras suryawanshi
 * @date 2_June_2017
 * @Code template Patient records.
 ************************************/
function GetDate(jsonDate) {
	var recDate=new Date(jsonDate).toLocaleDateString('en-GB');	
	var recTime=new Date(jsonDate).toLocaleTimeString('en-GB');			
	recDate = recDate+" "+recTime;
	return recDate;
}

var tabopdtempalte = "{#foreach $T.listRegTreBillDto as listRegTreBillDto}"	
	+ "<tr id='trcount{count}'>"
	+ "<td class='center' style='width: 5%;'>{count++}.</td>"
	//+ "<td class='' style='width: 13%'>{$T.listRegTreBillDto.patientId}</td>"
	+ "<td class='' style='width: 13%'>{$T.listRegTreBillDto.centerPatientId}</td>"
	+ "<td class='' style='width: 13%'>{$T.listRegTreBillDto.mrnno}</td>"
	+ "<td class='col-md-3-1 center TextFont'>{GetDate($T.listRegTreBillDto.createdDateTime)}</td>"
	+ "<td class='' style='width: 25%;'>{$T.listRegTreBillDto.patientName}</td>"
	+ "<td class='center' style='width: 14%;'>{$T.listRegTreBillDto.age}:{$T.listRegTreBillDto.gender}</td>"
	+ "<td class='center' style='width: 7%;'>{$T.listRegTreBillDto.visitNo}</td>"
	+ "<td class='center' style='width: 7%;'>{$T.listRegTreBillDto.tokenno}</td>"	
	/* + "<td class='center' style='width: 7%;'>{$T.pl.EpisdeVisitList[0].episodeNo}</td>" */
	/*+ "<td class='center' style='width: 7%;'>-</td>"
	+ "<td class='' style='width: 7%;'>-</td>"*/
	+ "<td class='center' style='width: 7%;'>"
	+ "{#if $T.listRegTreBillDto.doctorId =='' }"
	+ "<button onclick=viewDoctorDeskAlldepartment({$T.listRegTreBillDto.treatmentId}) type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
	+ "{#/if}"
	+ "{#if $T.listRegTreBillDto.doctorId !='' }"
	+ "<button onclick=viewDoctorDeskAlldepartment({$T.listRegTreBillDto.treatmentId},{$T.listRegTreBillDto.doctorId}) type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"
	+ "{#/if}"
	// + "<input onclick=viewDoctorDesk({$T.pl.pi},'OPD') style='font-size:
	// 10px;' type='button' value='TREATMENT' class='edit' />"

	+ "</td>" + "</tr>" + "{#/for}";

/*******************************************************************************
 * @author paras suryawanshi
 * @date 2_June_2017
 * @Code viewDoctorDeskAlldepartment
 ************************************/
//Modify by Laxman on 29-Dec-2017.
function viewDoctorDeskAlldepartment(treatmentId,doctorId) {

	var depdoctordesk =$("#depdoctordesk").val();
	var opd="opd";
		setTimeout(function() {
			window.location.href = "IPD_DoctorStation.jsp?treatmentId=" + treatmentId +"&doctorId="+doctorId+"&wardFlag="+opd;
			
		}, 300);

} 

/*******************************************************************************
 * @author paras suryawanshi
 * @date 2_June_2017
 * @Code departmentid
 ************************************/
function department(values) {

	
$("#depdoctordesk").val(values);


}

/*******************************************************************************
 * @author Sagar Kadam
 * @date 10_July_2017
 * @Code template Patient records.
 ************************************/
var tabopdtempalteipdopd = "{#foreach $T.listRegTreBillDto as listRegTreBillDto}"
	+ "<tr id='trcount{count}'>"
	+ "<td class='center' style='width: 5%;'>{count++}.</td>"
	+ "<td class='' style='width: 13%'>{$T.listRegTreBillDto.patientId}</td>"
	+ "<td class='' style='width: 13%'>{$T.listRegTreBillDto.mrnno}</td>"
	+ "<td class='' style='width: 25%;'>{$T.listRegTreBillDto.patientName}</td>"
	+ "<td class='center' style='width: 14%;'>{$T.listRegTreBillDto.age}:{$T.listRegTreBillDto.gender}</td>"
	+ "<td class='center' style='width: 7%;'>{$T.listRegTreBillDto.token}</td>"
	/* + "<td class='center' style='width: 7%;'>{$T.pl.EpisdeVisitList[0].episodeNo}</td>" */
	+ "<td class='center' style='width: 7%;'>-</td>"
	+ "<td class='' style='width: 7%;'>-</td>"
	+ "<td class='center' style='width: 7%;'>"

	+ "<button onclick=viewDoctorDeskAlldepartment({$T.listRegTreBillDto.treatmentId}) type='button' class='btn btn-xs btn-success'><i class='fa fa-eye View'></i></button>"

	// + "<input onclick=viewDoctorDesk({$T.pl.pi},'OPD') style='font-size:
	// 10px;' type='button' value='TREATMENT' class='edit' />"

	+ "</td>" + "</tr>" + "{#/for}";

/*******************************************************************************
 * @author Sagar kadam
 * @date 10-july_2017
 * @Code for autosuggestion 
 ******************************************************************************/
function getAllPatientRecordsAutosuggestionforIPDOPD(inputId,callfrom) {
	var deptId=0;
	var ipd=$('#ipdtab').attr('class');
	var opd=$('#opdtab').attr('class');
	var ER=$('#er').attr('class');
	var usertype=""; 
	if(opd=="active"){
		deptId=1;
		  usertype = $("#sridnameprDR").val();
		  letter="";
		  
		  if (callfrom =="auto") {
				letter=$("#byName").val();
				//letter=$("#byName1").val();
			}else{
				letter=$("#byId").val();
			}
		   inputId2=inputId;
		   findingName = $("#" + inputId2).val();
		//alert(opd);
		//return false;
	}else if(ipd=="active"){
		
		//alert(ipd);
		deptId=2;
		  usertype = $("#sridnameprDR").val();
		  letter="";
		  
		  if (callfrom =="auto1") {
				letter=$("#byName1").val();
				//letter=$("#byName1").val();
			}else{
				letter=$("#byId1").val();
			}
		   findingName = $("#" + inputId).val();
		
	}else if(ER=="active"){
		
		//alert(ipd);
		deptId= -5;
		  usertype = $("#sridnameprDR").val();
		  letter="";
		  
		  if (callfrom =="auto2") {
				letter=$("#byName2").val();
				//letter=$("#byName1").val();
			}else{
				letter=$("#byId2").val();
			}
		   findingName = $("#" + inputId).val();
		
	}
	 if(findingName==null || findingName==undefined){
		 findingName="";
	 }
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllRecordsDeptwiseWithAuto",
	success : function(r) {
		
		//setTempPatientRecords(r);

		//$("#OPDPatientList").html(r);
		$("#OPDPatientList").html(r);
		if(opd=="active"){
			//alert("hi2");
			if(letter=="" || letter==" " ){
				//alert("hi");
				getAllPatientRecordsdoctordesk('onload');
			}else{
				//AllPatientRecordsAutosuggestioTempForIPDOPD(r,inputId2);
				$("#containerOPD").setTemplate(tabopdtempalte);
				$("#containerOPD").processTemplate(r);
			}
			
	/*		$("#containerOPD").setTemplate(tabopdtempalteipdopd);
			$("#containerOPD").processTemplate(r);*/
			
		}
		else if(ipd=="active"){
			if(letter=="" || letter==" " ){
				//alert("hi");
				getAllPatientRecordsdoctordesk('IPD');
			}else{
			//alert(ipd);
			//AllPatientRecordsAutosuggestioTempForIPDOPD(r,inputId);
		/*	$("#container").setTemplate(tabopdtempalteipdopd);
			$("#container").processTemplate(r);*/
			
			IpdPatientsTemp(r);
			}
		}else if(ER=="active"){
			if(letter=="" || letter==" " ){
				
				getAllPatientRecordsdoctordesk('emergency');
			}else{
				
				emergencyPatientTemp(r);
			}
		}	
	}
});
}

/****************************************/
 
function getAllPatientRecordsAutosuggestionforIPDOPD1(inputId,callfrom) {
	
	var deptId=0;
	var ipd=$('#ipdtab').attr('class');
	var opd=$('#opdtab').attr('class');
	var ER=$('#er').attr('class');
	var usertype=""; 
	if(opd=="active"){
		deptId=1;
		  usertype = $("#sridnameprDR").val();
		  letter="";
		  
		  if (callfrom =="auto") {
				letter=$("#byName").val();
				//letter=$("#byName1").val();
			}else{
				letter=$("#byId").val();
			}
		   inputId2=inputId;
		   findingName = $("#" + inputId2).val();
		//alert(opd);
		//return false;
	}else if(ipd=="active"){
		
		//alert(ipd);
		deptId=2;
		  usertype = $("#sridnameprDR").val();
		  letter="";
		  
		  if (callfrom =="auto1") {
				letter=$("#byName1").val();
				//letter=$("#byName1").val();
			}else{
				letter=$("#byId1").val();
			}
		   findingName = $("#" + inputId).val();
		
	}else if(ER=="active"){
		
		//alert(ipd);
		deptId= -5;
		  usertype = $("#sridnameprDR").val();
		  letter="";
		  
		  if (callfrom =="auto2") {
				letter=$("#byName2").val();
				//letter=$("#byName1").val();
			}else{
				letter=$("#byId2").val();
			}
		   findingName = $("#" + inputId).val();
		
	}
	 if(findingName==null || findingName==undefined){
		 findingName="";
	 }
	

        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        inputs.push('deptId=' + deptId);
        var str = inputs.join('&');
	
	jQuery.ajax({
	async : true,
	type : "POST",
	data 	: str + "&reqType=AJAX",
	url : "ehat/registration/getAllRecordsDeptwiseWithAuto1",
	success : function(r) {
		
		
		//setTempPatientRecords(r);

		//$("#OPDPatientList").html(r);
		$("#OPDPatientList").html(r);
		if(opd=="active"){
			//alert("hi2");
			if(letter=="" || letter==" " ){
				//alert("hi");
				getAllPatientRecordsdoctordesk('onload');
			}else{
				//AllPatientRecordsAutosuggestioTempForIPDOPD(r,inputId2);
				$("#containerOPD").setTemplate(tabopdtempalte);
				$("#containerOPD").processTemplate(r);
			}
			
	/*		$("#containerOPD").setTemplate(tabopdtempalteipdopd);
			$("#containerOPD").processTemplate(r);*/
			
		}
		else if(ipd=="active"){
			if(letter=="" || letter==" " ){
				//alert("hi");
				getAllPatientRecordsdoctordesk('IPD');
			}else{
			//alert(ipd);
			//AllPatientRecordsAutosuggestioTempForIPDOPD(r,inputId);
		/*	$("#container").setTemplate(tabopdtempalteipdopd);
			$("#container").processTemplate(r);*/
			
			IpdPatientsTemp1(r);
			}
		}else if(ER=="active"){
			if(letter=="" || letter==" " ){
				
				getAllPatientRecordsdoctordesk('emergency');
			}else{
				
				emergencyPatientTemp(r);
			}
		}	
	}
});
}
 
 
 /****************************************************/

/************
* @author	: Sagar Kadam
* @date		:10-july-2017
* @codeFor	: Autosuggestion Template for patient Records
 ************/
function  AllPatientRecordsAutosuggestioTempForIPDOPD(response, id) {
	//var qty = id.slice(0, -1); // for dyamic col getting id

	var myArray = response;// parsing response in JSON format

	$.widget(
		'custom.mcautocomplete',
		$.ui.autocomplete,
		{
			_create : function() {
				this._super();
				this.widget().menu("option", "items",
						"> :not(.ui-widget-header)");
			},
			_renderMenu : function(ul, items) {
				var self = this, thead;
				if (this.options.showHeader) {
					table = $('<div class="ui-widget-header" style="width:100%"></div>');
					$
							.each(
									this.options.columns,
									function(index, item) {
										table
												.append('<span style="padding:0 4px;float:left;width:'
														+ item.width
														+ ';">'
														+ item.name
														+ '</span>');
									});
					table
							.append('<div style="clear: both;"></div>');
					ul.append(table);
				}
				$.each(items, function(index, item) {
					self._renderItem(ul, item);
				});
			},
			_renderItem : function(ul, item) {
				var t = '', result = '';
				$
						.each(
								this.options.columns,
								function(index, column) {
									t += '<span style="padding:0 4px;float:left;width:'
											+ column.width
											+ ';">'
											+ item[column.valueField ? column.valueField
													: index]
											+ '</span>';
								});
				result = $('<li></li>')
						.data('ui-autocomplete-item', item)
						.append(
								'<a class="mcacAnchor">'
										+ t
										+ '<div style="clear: both;"></div></a>')
						.appendTo(ul);
				return result;
			}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
	{
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Patient Name',
			width : '100px',
			valueField : 'patientName'
		}, ],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			console.log(ui);
			
			var spl = (ui.item.spl = "" ? '' : ui.item.spl);
			if (ui.item.dn != 'No' && ui.item.spl != 'Record'
					&& ui.item.specialisationName != 'Found'
					&& ui.item.patientName != 'Match') {
			
				 
				$('#'+id).val(ui.item.patientName);
			}
			/*
			 * This function use for Enter keypress search
			 */
			
		 
			//getAllPatientRecords2(id,'search');
			//getAllPatientRecordsAutosuggestionforIPDOPD(id,'search1');
			//setAutoCompleteMarkVisit(id, 'search');
			//$("#mrnNo").val(101);
			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			console.log(data);
			console.log(data.listRegTreBillDto.length);
			var result;
			if (!data || data.listRegTreBillDto.length === 0 || !data.listRegTreBillDto
					|| data.listRegTreBillDto.length === 0) {
				/*
				 * result = [{ label: 'No match found.' }];
				 */
				result = [ {
					/* 'dn' : 'No', */
					'patientName' : 'Record',
					'patientId' : 'Found',
				/* 'depNm' : 'Match' */
				} ];
			} else {
				result = data.listRegTreBillDto;// Response List for All
				// Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}
function viewDiagnosticsPatientAssignTests2(treatmentId) {

	/*myArray = JSON.parse($("#registeredPatientDiv").html());
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].trid == treatmentId) {
			myObj = myArray.pl[i];
			break;
		}
	}

	var myObj1 = JSON.stringify(myObj);
	// alert(myObj1);
	window.location = "diagnosticPatientTestAssign.jsp?" + "myObj="
			+ encodeURIComponent(myObj1) + "&pageType=diagnosis";*/
	
	window.location.href = "diagnosticPatientTestAssign.jsp?" + "treatmentId="
	+ encodeURIComponent(treatmentId);
}

function clerpiDR(){	
	$("#byId").val("");
	$("#byId1").val("");
	$("#sridnameprDR").val("N");	
}
function clerpnDR(){	
	$("#byName").val("");
	$("#byName1").val("");
	$("#sridnameprDR").val("Y");	
}

function printDetails(patID)

{
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : {
					"callform" : patID
				},
				url : "ehat/registration/fetchPatientsRecordByTreatmentId",
				success : function(r) {
					//count = 50;
					var ptName = r.listRegTreBillDto[0].patientName;
					// var OpdIpdNo=r.listRegTreBillDto[0].trcount;

					var dt = new Date(r.listRegTreBillDto[0].createdDateTime)
							.toLocaleString();
					var age = r.listRegTreBillDto[0].age;
					var sex = r.listRegTreBillDto[0].gender;
					var address = r.listRegTreBillDto[0].address;
					var address1 = "";//to split address so that it is in proper format on smart card
					var mobile = r.listRegTreBillDto[0].mobile;
					var patientId = r.listRegTreBillDto[0].patientId;
					
					var perAddress = "";
					var perAddress1 = "";
					if(r.listRegTreBillDto[0].perAddress!=null){
						perAddress = r.listRegTreBillDto[0].perAddress;
					}
					var relativeName = r.listRegTreBillDto[0].relativeName;
					var relationId = r.listRegTreBillDto[0].relationId;
					var relation="";
					
					var cityName = getStringValOfObject("city","city_name",r.listRegTreBillDto[0].townId,"idcity");
					var talukaName = getStringValOfObject("taluka","taluka_name",r.listRegTreBillDto[0].talukaId,"idtaluka");
					var disName = getStringValOfObject("district","dis_name",r.listRegTreBillDto[0].districtId,"iddistrict");
					var stateName = getStringValOfObject("state","state_name",r.listRegTreBillDto[0].stateId,"idstate");

					if(cityName!="" && cityName!="-"){
						address1=address1+" "+cityName;
					}
					if(talukaName!="" && talukaName!="-"){
						address1=address1+" "+talukaName;
					}
					if(disName!="" && disName!="-"){
						address1=address1+" "+disName;
					}
					if(stateName!="" && stateName!="-"){
						address1=address1+","+stateName;
					}
					
					var perCityName = getStringValOfObject("city","city_name",r.listRegTreBillDto[0].pertownId,"idcity");
					var perTalukaName = getStringValOfObject("taluka","taluka_name",r.listRegTreBillDto[0].pertalukaId,"idtaluka");
					var perDisName = getStringValOfObject("district","dis_name",r.listRegTreBillDto[0].perdistrictId,"iddistrict");
					var perStateName = getStringValOfObject("state","state_name",r.listRegTreBillDto[0].perstateId,"idstate");

					if(perCityName!="" && perCityName!="-"){
						perAddress1=perAddress1+" "+perCityName;
					}
					if(perTalukaName!="" && perTalukaName!="-"){
						perAddress1=perAddress1+" "+perTalukaName;
					}
					if(perDisName!="" && perDisName!="-"){
						perAddress1=perAddress1+" "+perDisName;
					}
					if(perStateName!="" && perStateName!="-"){
						perAddress1=perAddress1+","+perStateName;
					}
					
					if(relationId==1){
						relation="S/O";
					}else if(relationId==2){
						relation="W/O";
					}else if(relationId==3){
						relation="D/O";
					}else if(relationId==4){
						relation="F/O";
					}else if(relationId==5){
						relation="Late S/O";
					}else if(relationId==6){
						relation="Late W/O";
					}else if(relationId==7){
						relation="Late D/O";
					}else if(relationId==8){
						relation="Owner";
					}
					// var ipdAdmissionDate = $("#opdVisitDate").val();
					// var patName = $("#patName").html();
					var WindowObject = window.open('', '_blank', '_blank');
					WindowObject.document
							.writeln('<html><style type="text/css" media="print"> @page { size: landscape; }</style><body style="width:100%; height: 100%; ">');
					var cnt;// jitendra
					
					for (cnt = 1; cnt <= 6; cnt++) {// jitendra
						alert(cnt+"....");
						//below width and height are for to print 4 times on printing page - jitendra
						// in first div height is remove so that we can adjust print 4 or 5 or 6 or 7 times on printing page 
						//var	html = '<div style="width:50%; height: 16.50%; "><div style="width: 50%; margin-top: 25px;margin-left: 0.7cm; font-size: 7px;">'
						var	html = '<div style="width:50%;"><div style="width: 50%; margin-top: 15px;margin-left: 0.7cm; font-size: 10px;">'
								+ '<div>Date:'
								+ dt
								+ '</div>'
								+ '<div>Patient Id:'
								+ patientId
								+ '</div>'
								+ '<div>Patient Name:' + ptName + '</div>';

						html = html + '<div>Age:' + age + '</div><div>Gender:'
								+ sex + '</div>';

						if (address != "") {
							html = html + '<div>Res. Address:' + address
									+ '</div>';
							html = html + '<div>' + address1 + '</div>';
						}
						if (perAddress != "") {
							html = html + '<div>Per. Address:' + perAddress
									+ '</div>';
							html = html + '<div>' + perAddress1 + '</div>';
						}
						html = html + '<div>Mobile:' + mobile + '</div>';
						html = html + '</div></div>';
						WindowObject.document.writeln(html);
						 
					}
					/*var cnt1;
					for (cnt1 = 1; cnt1 <= 4; cnt1++) {
						WindowObject.document.writeln(html);
					}*/
					
					WindowObject.document.writeln('</body></html>');
					
				/*
				 * .writeln('<html><style type="text/css" media="print"> @page {
				 * size: landscape; }</style><body style="width:100%; height:
				 * 100%; "><div style="width:100%; height: 100%; "><div
				 * style="width: 100%; margin-top: 2.3cm;margin-left: 0.7cm;
				 * font-size: 12px;">' +'<div>Date:' + dt + '</div>' +'<div>Patient
				 * Id:' + patientId + '</div><div>Patient Name:' + ptName + '</div>');
				 * 
				 * if(relativeName!=""){ WindowObject.document.writeln('<div>Relative
				 * Name:' + relation+" "+relativeName + '</div>'); }
				 * 
				 * WindowObject.document .writeln('<div>Age:' + age + '</div><div>Gender:' +
				 * sex + '</div>');
				 * 
				 * if(address!=""){ WindowObject.document.writeln('<div>Res.
				 * Address:' + address + '</div>');
				 *  } if(perAddress!=""){ WindowObject.document.writeln('<div>Per.
				 * Address:' + perAddress + '</div>'); }
				 * 
				 * WindowObject.document.writeln('<div>Mobile:' + mobile + '</div>');
				 * 
				 * 
				 * WindowObject.document.write('</div></div></body></html>');
				 * }//jitendra
				 */
					WindowObject.document.close();

					WindowObject.focus();

					WindowObject.print();
					

					WindowObject.close();
				}
			});
}

function printCard(patID)
{
	jQuery
	.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : patID
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			count = 50;
			var ptName = r.listRegTreBillDto[0].patientName;
			// var OpdIpdNo=r.listRegTreBillDto[0].trcount;

			var dt = new Date(r.listRegTreBillDto[0].createdDateTime)
					.toLocaleString();
			var age = r.listRegTreBillDto[0].age;
			var sex = r.listRegTreBillDto[0].gender;
			var address = r.listRegTreBillDto[0].address;
			var mobile = r.listRegTreBillDto[0].mobile;
			var patientId = r.listRegTreBillDto[0].patientId;

			var perAddress = "";
			if(r.listRegTreBillDto[0].perAddress!=null){
				perAddress = r.listRegTreBillDto[0].perAddress;
			}
			var relativeName = r.listRegTreBillDto[0].relativeName;
			var relationId = r.listRegTreBillDto[0].relationId;
			var relation="";
			var cityName = getStringValOfObject("city","city_name",r.listRegTreBillDto[0].townId,"idcity");
			var talukaName = getStringValOfObject("taluka","taluka_name",r.listRegTreBillDto[0].talukaId,"idtaluka");
			var disName = getStringValOfObject("district","dis_name",r.listRegTreBillDto[0].districtId,"iddistrict");
			var stateName = getStringValOfObject("state","state_name",r.listRegTreBillDto[0].stateId,"idstate");

			if(cityName!="" && cityName!="-"){
				address=address+" "+cityName;
			}
			if(talukaName!="" && talukaName!="-"){
				address=address+" "+talukaName;
			}
			if(disName!="" && disName!="-"){
				address=address+" "+disName;
			}
			if(stateName!="" && stateName!="-"){
				address=address+","+stateName;
			}
			
			var perCityName = getStringValOfObject("city","city_name",r.listRegTreBillDto[0].pertownId,"idcity");
			var perTalukaName = getStringValOfObject("taluka","taluka_name",r.listRegTreBillDto[0].pertalukaId,"idtaluka");
			var perDisName = getStringValOfObject("district","dis_name",r.listRegTreBillDto[0].perdistrictId,"iddistrict");
			var perStateName = getStringValOfObject("state","state_name",r.listRegTreBillDto[0].perstateId,"idstate");

			if(perCityName!="" && perCityName!="-"){
				perAddress=perAddress+" "+perCityName;
			}
			if(perTalukaName!="" && perTalukaName!="-"){
				perAddress=perAddress+" "+perTalukaName;
			}
			if(perDisName!="" && perDisName!="-"){
				perAddress=perAddress+" "+perDisName;
			}
			if(perStateName!="" && perStateName!="-"){
				perAddress=perAddress+","+perStateName;
			}
			
			if(relationId==1){
				relation="S/O";
			}else if(relationId==2){
				relation="W/O";
			}else if(relationId==3){
				relation="D/O";
			}else if(relationId==4){
				relation="F/O";
			}else if(relationId==5){
				relation="Late S/O";
			}else if(relationId==6){
				relation="Late W/O";
			}else if(relationId==7){
				relation="Late D/O";
			}else if(relationId==8){
				relation="Owner";
			}
			
			
			// var ipdAdmissionDate = $("#opdVisitDate").val();
			// var patName = $("#patName").html();
			var WindowObject = window.open('', '_blank', '_blank');

			WindowObject.document
					.writeln('<html><style type="text/css" media="print"> @page { size: landscape; }</style><body style="width:100%; height: 100%; "><div style="width:100%; height: 100%; "><div style="width: 100%; margin-top: 2.3cm;margin-left: 0.7cm; font-size: 12px;">'
							+'<div>Reg.Date:'
							+ dt
							+ '</div>'
							+'<div>Patient Id:'
							+ patientId
							+ '</div><div>Patient Name:'
							+ ptName
							+ '</div>');
							
							if(relativeName!=""){
								WindowObject.document.writeln('<div>Relative Name:'
							+ relation+" "+relativeName
							+ '</div>');
							}
							
							WindowObject.document
							.writeln('<div>Age:'
							+ age
							+ '</div><div>Gender:'
							+ sex
							+ '</div>');
							
							if(address!=""){
							WindowObject.document.writeln('<div>Res. Address:'
							+ address
							+ '</div>');
							
							}
							if(perAddress!=""){
							WindowObject.document.writeln('<div>Per. Address:'
							+ perAddress
							+ '</div>');
							}
							
							WindowObject.document.writeln('<div>Mobile:'
							+ mobile
							+ '</div>');

			WindowObject.document.write('</div></div></body></html>');

			WindowObject.document.close();

			WindowObject.focus();

			WindowObject.print();

			WindowObject.close();
		}
	});

}

//@Author -Pooja Sukre-To Admission Print
//@Date-12-Mar-2018
function AdmissionPrint(masterId)
{
	$("#trid").val(masterId);
	setTimeout(
			function() {
					window
						.open(("RegAdmissionPrint.jsp?treatmentId="+masterId));
					
				}, 300);
}


/***********
* @author	: Laxman Nikam
 * @date	: 08/May/2018
 ***********/
function getStringValOfObject(tableName,columnName,pkId,pkColumn)
{
	var result="";
	var inputs = [];
    inputs.push('tableName=' + tableName);
    inputs.push('columnName=' + columnName);
    inputs.push('pkId=' + pkId);
    inputs.push('pkColumn=' + pkColumn);
    var str = inputs.join('&');

    jQuery.ajax({
    	async : false,
    	type : "POST",
    	data 	: str + "&reqType=AJAX",
		url : "ehat/lab/getStringValOfObject",
		success : function(r) {
			result=r;
		}
	});
   
    return result;
}

//Added By Laxman
function barcodePrintCard(type)
{
	var noOfBarcode=$("#noOfBarCode").val();
	if(noOfBarcode==0 || noOfBarcode=="")
		{
			alert("please enter atleast one barcode");
			return false;
		}
	var masterId=$("#trid").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"callform" : masterId
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {
			count=50;
 			var ptName=r.listRegTreBillDto[0].patientName;
 			var OpdIpdNo=r.listRegTreBillDto[0].trcount;
 			var age=r.listRegTreBillDto[0].age;
 			var patientId =r.listRegTreBillDto[0].patientId;
   			//$("#OpdIpdNo").val(r.listRegTreBillDto[0].trcount);
  			//$("#ptName").val(r.listRegTreBillDto[0].patientName);
 			$("#trid").val(masterId);
 			//	window.open("ehat_lab_barcode.jsp?masterId="+masterId+"&count="+noOfBarcode+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age);
 			var namcoFlow = $("#namcoFlow").val();
 			//If on print Horizontal barcode,else vertical.
 			if(namcoFlow =="on"){
	 		window.open("ehat_barcode_patient.jsp?masterId="+patientId+"&count="+noOfBarcode+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age+"&type="+type + "&namcoFlow="+namcoFlow);

 			}else{
 				if(type=="on"){
 	 				window.open("ehat_lab_barcode.jsp?masterId="+patientId+"&count="+noOfBarcode+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age+"&type="+type );
 	 			}else{
 	 				window.open("ehat_lab_barcode.jsp?masterId="+patientId+"&count="+noOfBarcode+"&ptName="+ptName+"&OpdIpdNo="+OpdIpdNo+"&age="+age+"&type="+type );
 	 			}
         		}
 			$("#noOfBarCode").val("");
		}
	});
}
function questioncount(){
	var iICount= $("#QCount").val();
	var html="";
	//var html2="<tr style='height: 33; '><td  style='width:68px;' id=''></td><td  style='width:68px;'>1</td><td  ><input type='text'  style='margin-left: 1%;width:100px' required='true'  placeholder='Answer Name' id='QN"+0+"'></td><td  ><input type='text'  style='margin-left: 1%;width:100px' required='true'  placeholder='Points' id='QN"+0+"'></td><td  style='width:68px;' id=''></td></tr>";
	if(iICount > 0){
	//	html =html+ "<tr style='height: 33; '><td  style='width:68px;' id=''>1</td><td  style='width:68px;'></td><td  ><input type='text'  style='margin-left: 1%;width:400px' required='true'  placeholder='Question Name' id='QN"+0+"'></td><td  style='width:68px;' id=''><input type='submit' style='width:48%' class='btn btn-success' onclick='' value='+'></td></tr>";	
 var i =0;

	while( i < iICount){
		var j=0;
	html =html+ '<tr style="height: 33; "><td  style="width:68px;" ><span style="margin-left:4px" class="badge badge-blue font-11"><font color="black" >'+ (i+1)+'</font></span></td><td>';	

		
		html= html +'<div class="text-left"><div class="panel-group" id="accordion">'
		 + '<div class="panel"><div class="panel-heading"><h3 class="panel-title">'
		 +'<a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'+ i+'" onclick="getSubServiceDetails1(1,7338,2)"><div class="row"><div class="col-md-10"><input type="text"  style="margin-left: 1%;width:400px" required="true"  placeholder="Question '+( i + 1) +'" id="txtQN'+ i +'"></div><div class="col-md-1"><i class="fa fa-chevron-down" id="list1"></i>'
		 +'</div></div></a></h3></div><div style="height: auto;" id="collapseCghsTwo'+ i+'" class="panel-collapse in">'
		 +'<div class="panel-body"><table class="table table-hover"><thead></thead><tbody id="serviceData'+ i+'">'
		 +'<tr id="tr19549"><td><span class="badge badge-blue font-11" style="margin-left:4px"><font color="black"> 1 </font></span></td><td id="catName19549"> <input type="text"  style="margin-left: 1%;width:300px" required="true"  placeholder="Answer'+( j + 1) +'" id="txtans'+ i +'0" ></td>'
		 +'<td id="doccName19549"><input type="text"  style="margin-left: 1%;width:200px" required="true"  placeholder="Points"  id="txtpoint'+ i +'0" onkeypress="return validatePrice(event)"> </td><td class="col-md-1 center">'
		 
		+' <input type="checkbox" name="opdBillCheckboxReg" id="chk'+ i+'" onclick="setSlaveChk(2)" ></td></tr></tbody></table></div></div></div></div></div>'
	    + '</td><td style="width:68px;"><input type="submit" style="width:48%" class="btn btn-success" onclick="addanswer('+ i+')" value="+">'
	    +'<input type="hidden" id="totalanswer'+ i +'" value="1" class="form-control"><input type="hidden" id="qno'+ i +'" value="0" class="form-control"></td></tr>';
	
	i++;
	j=1;
	}	
		
		
	}else{
		alert("please Enter Valid Count !");
		return false;
	}
	
	$("#tquestionmaster").html(html);
}
function addanswer(question){
	var toatalans=  parseInt($("#totalanswer" + question).val());
	if(toatalans > 0){
		jQuery("#serviceData"+ question+"")
		.append('<tr ><td><span class="badge badge-blue font-11" style="margin-left:4px"><font color="black">'+ (toatalans + 1) +'</font></span></td><td id="catName19549"> <input type="text"  style="margin-left: 1%;width:300px" required="true"  placeholder="Answer'+( toatalans + 1) +'" id="txtans'+question + toatalans +'" >'
				+' <input type="hidden" id="ano'+ question + toatalans +'" value="0" class="form-control" ></td>'
				 +'<td id="doccName19549"><input type="text"  style="margin-left: 1%;width:200px" required="true"  placeholder="Points" id="txtpoint'+ question + toatalans +'"  onkeypress="return validatePrice(event)"> </td><td class="col-md-1 center">'
				 +'<input type="checkbox" value="2" name="opdBillCheckboxReg" id="chkOpdBillReg2" onclick="setSlaveChk(2)" ></td></tr>');
	}
	$("#totalanswer" + question).val((toatalans + 1));
}

function SaveQuestionMaster(){
  var toatalans = jQuery("#tquestionmaster").children('tr').length;
  var listQuestionMaster = {
		  listquestionmaster : []
		};
  var listQuestionDR = {
		  listQuestionDR : []
		};
  var listAnswer = {
		  listAnswerDR : []
		};
  var listAnswerDR = [];

  var id_question_master =  $("#idQM").val();
  var question_header    =  $("#txtxqm").val();
  
   if(question_header==null  || question_header== undefined ||question_header=="" ){
		alert("Please Enter Question Master Name ");
        SetFocus("txtxqm");	
        return false;
      
	}
   var text=""; 
   $("#totaltext > tr").each(function() {
	   $(this).closest('tr').find("input").each(function() {
		       if(this.value !="-" ){
                if( this.value !="on"){
      		       	text = text +"@" +(this.value);
                }
		    	 
                
		       }
	       	     
	           });
	           
	   });
 
  if(toatalans > 0){
	
	  if(text!="-"){
		 
		  text =text.slice(1);
		//  alert(text);
	  }
	  listQuestionMaster.listquestionmaster.push({
			 "id_question_master":id_question_master,
			 "question_header"   :question_header ,
			 "status"            : "N",
			  "text"             : text
		});
	  
	  for(var i=0; i< toatalans;i++){
		var id_question  =  $("#qno" + i).val();
  		//var Qno    =  $("#qno" + i).val();
  		var question_name    =  $("#txtQN" + i).val();
        var tbodylength      =  jQuery("#serviceData"+ i).children('tr').length;
		/*listQuestionDR.listQuestionDR.push({
			 "id_question"   :id_question,
			 "question_name" : question_name,
			// "Qno"           : Qno,
			 "status"        : "N"
		});*/
        if(question_name==null  || question_name== undefined ||question_name=="" ){
			alert("Please Enter question in " + i  +"th  Row  !!");
	        SetFocus("txtQN" + i);	
	        return false;
           
		}
		
		for(var j=0; j< tbodylength;j++){
			var id_answer   =  $("#ano" + i+ j).val();
			var answer_name = $("#txtans" + i+ j).val();
			var points      = $("#txtpoint"+ i + j).val();
			if(answer_name==null  || answer_name== undefined ||answer_name=="" ){
				alert("Please Enter answer !!");
				SetFocus("txtans" + i+ j);	
				  return false;
			}
			if(points==null  || points== undefined ||points=="" ){
				alert("Please Enter points !!");
				SetFocus("txtpoint"+ i + j);
				  return false;
			}
		
			 listAnswerDR .push({
				  
						  id_answer      :id_answer,
						  answer_name    : answer_name,
						  points         : points,
						//  Qno1           : Qno, 
						  status         : "N"
			});
			
		}
		listQuestionDR.listQuestionDR.push({
			 "id_question"   :id_question,
			 "question_name" : question_name,
			// "Qno"           : Qno,
			 "listAnswerDR"  :listAnswerDR,
			 "status"        : "N",
			
		});
		listAnswerDR =[];
	  }

  }else{
			alert("Please Add Question  ");
	        return false;
        
  }
  
    listQuestionMaster = JSON.stringify(listQuestionMaster);
	listQuestionDR     = JSON.stringify(listQuestionDR);
	//listAnswer         = JSON.stringify(listAnswer);

	var inputs = [];


	inputs.push('listQuestionMaster=' + listQuestionMaster);
	inputs.push('listQuestionDR='     + listQuestionDR);
//	inputs.push('listAnswer='         + listAnswer);



	var str = inputs.join('&');
	
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ris/Savequestionmaster",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert("Save Sucessfully");
			window.location = "ehat_master_ansquestion.jsp";
		}
	});

	
}

function fetchQuestionMaster(callfrom,id)
{
	var result="";
	var inputs = [];
	var letter="";
	if(callfrom=="search"){
	 letter = $("#"+ id).val();
	}
    inputs.push('letter=' + letter);
    inputs.push('callfrom=' + callfrom);
    var str = inputs.join('&');

    jQuery.ajax({
    	async : true,
    	type : "POST",
    	data 	: str + "&reqType=AJAX",
		url : "ehat/ris/fetchQuestionMaster",
		success : function(r) {
			
			var ajaxResponse = r;
			$("#userObj").html(JSON.stringify(ajaxResponse));
			settemplateQM(r);
			if(callfrom=="search"){
				
				autoCompTablqm(r, id);

			}
			
			if(callfrom=="result"){
			//	var doctorBean = eval('(' + ajaxResponse + ')');
                $("#testname").select2();
		        $("#testname").setTemplate(docNameTemplateForOPD); 						
				$("#testname").processTemplate(r);
				$("#testname").select2('val',0);	
			}
		}
	});
   
}
var docNameTemplateForOPD = "<option value='0'>-select-</option>{#foreach $T.listquestionmaster as tli}<option     value='{$T.tli.id_question_master}'>{$T.tli.question_header}</option>{#/for}";

function settemplateQM(r){
	var html="";
	for(var i=0;i< r.listquestionmaster.length;i++){
		
		html=html+ '  <tr><th class="col-md-1-1 center" style="height: 21.5px;">'+(i+1)+'</th>'
	      +'<th class="col-md-1-1 center" style="height: 21.5px;">'+ r.listquestionmaster[i].question_header +'</th>'
	      +'<th class="col-md-1-1 center" style="height: 21.5px;">'+   new Date( r.listquestionmaster[i].updatedDateTime).toLocaleString() +'</th>'
	      +'<th class="col-md-1-1 center" style="height: 21.5px;"><button onclick="editquestionmaster('+ r.listquestionmaster[i].id_question_master +' )" class="btn btn-xs btn-success deleteservice"><i class="fa fa-edit"></i></button></th>'
	      +'<th class="col-md-1-1 center" style="height: 21.5px;"><button onclick="deletequestionmaster('+ r.listquestionmaster[i].id_question_master +' )" class="btn btn-xs btn-success deleteservice"><i class="fa fa-trash-o"></i></button> </th> </tr>';
	}
	$("#editquestionmaster").html(html);
}
function editquestionmaster (id){
	var userObj = $("#userObj").html();
	userObj = eval('(' + userObj + ')');
	var html="";
	var htmltextable="";
	 for(var i=0;i<userObj.listquestionmaster.length ;i++){
		
		 if(userObj.listquestionmaster[i].id_question_master ==id){
			 
			 $("#txtxqm").val(userObj.listquestionmaster[i].question_header);
			 $("#idQM").val(userObj.listquestionmaster[i].id_question_master);
			// alert(userObj.listquestionmaster[i].text);
			  if(userObj.listquestionmaster[i].text!="-"){
				  var array =[];
				  array =(userObj.listquestionmaster[i].text).split("@");
				  for(var t=0;t< array.length;t++){
					  htmltextable =htmltextable +'<tr > <th class="col-md-6-1 center" style="height: 21.5px;">	<input type="text" value="'+ array[t] +'" id="txtText" name="txtText" class="form-control input-SmallText" style=" font-weight: bold;">'
	                   +'</th><th class="col-md-1 center"> <input type="checkbox" onclick="setChkremove(this.id)" id="chktext" name="chktext"></th></tr>';
					 /* jQuery("#totaltext")
			    		.append('<tr > <th class="col-md-6-1 center" style="height: 21.5px;">	<input type="text" value="'+ array[t] +'" id="txtText" name="txtText" class="form-control input-SmallText">'
			                   +'</th></tr>');*/
				  }
				 $("#totaltext").html(htmltextable);
			  }
			 for(var j=0;j< userObj.listquestionmaster[i].listQuestion.length ;j++){
				 if(userObj.listquestionmaster[i].listQuestion[j].id_question_master ==id){ 
				 html =html+ '<tr style="height: 33; "><td  style="width:68px;" ><span style="margin-left:4px" class="badge badge-blue font-11"><font color="black" >'+ (j+1)+'</font></span></td><td>';	
                 html= html +'<div class="text-left"><div class="panel-group" id="accordion">'
					 + '<div class="panel"><div class="panel-heading"><h3 class="panel-title">'
					 +'<a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'+ j +'" onclick="getSubServiceDetails1(1,7338,2)"><div class="row"><div class="col-md-10"><input type="text"  style="margin-left: 1%;width:400px" required="true"  placeholder="Question '+( j + 1) +'" id="txtQN'+ j +'" value="'+ userObj.listquestionmaster[i].listQuestion[j].question_name +'"></div><div class="col-md-1"><i class="fa fa-chevron-down" id="list1"></i>'
					 +'</div></div></a></h3></div><div style="height: auto;" id="collapseCghsTwo'+ j +'" class="panel-collapse in">'
					 +'<div class="panel-body"><table class="table table-hover"><thead></thead>';
				 html =html+'<tbody id="serviceData'+ j+'">';

					 for(var k=0;k< userObj.listquestionmaster[i].listQuestion[j].listAnswerDR.length ;k++){
						 html =html+'<tr id="tr19549"><td><span class="badge badge-blue font-11" style="margin-left:4px"><font color="black"> '+ ( k + 1)  + ' </font></span></td><td id="catName19549"> <input type="text"  style="margin-left: 1%;width:300px" required="true"  placeholder="Answer'+( k + 1) +'" id="txtans'+j + k +'"  value="'+ userObj.listquestionmaster[i].listQuestion[j].listAnswerDR[k].answer_name +'">'
					 +'<input type="hidden" id="ano'+j + k +'" value="'+  userObj.listquestionmaster[i].listQuestion[j].listAnswerDR[k].id_answer +'" class="form-control"></td>'
					 +'<td id="doccName19549"><input type="text"  style="margin-left: 1%;width:200px" required="true"  placeholder="Points"  id="txtpoint'+j + k +'" value="'+userObj.listquestionmaster[i].listQuestion[j].listAnswerDR[k].points +'" onkeypress="return validatePrice(event)"> </td><td class="col-md-1 center">'
					 
					+' <input type="checkbox" name="opdBillCheckboxReg" id="chk'+ k +'" onclick="setSlaveChk(2)" ></td></tr>';
					 }
					 html =html+'</tbody></table></div></div></div></div></div>'
				    + '</td><td style="width:68px;"><input type="submit" style="width:48%" class="btn btn-success" onclick="addanswer('+ j +')" value="+">'
				    +'<input type="hidden" id="totalanswer'+ j +'" value="'+  userObj.listquestionmaster[i].listQuestion[j].listAnswerDR.length +'" class="form-control"></td>'
				    + '<input type="hidden" id="qno'+j+'" value="'+   userObj.listquestionmaster[i].listQuestion[j].id_question  +'" class="form-control"></tr>';
				
				 }
			 } 
			 break;
		 }
		 
		
	 }
		$("#tquestionmaster").html(html);

}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion
 ***********/
function autoCompTablqm(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
	//alert("hi");
	var myArray = response;// parsing response in JSON format
	//alert(myArray);
	//alert("b");
	$
			.widget(
					'custom.mcautocomplete',
					$.ui.autocomplete,
					{
						_create : function() {
							this._super();
							this.widget().menu("option", "items",
									"> :not(.ui-widget-header)");
						},
						_renderMenu : function(ul, items) {
							var self = this, thead;
							if (this.options.showHeader) {
								table = $('<div class="ui-widget-header" style="width:100%"></div>');
								$
										.each(
												this.options.columns,
												function(index, item) {
													table
															.append('<span style="padding:0 4px;float:left;width:'
																	+ item.width
																	+ ';">'
																	+ item.name
																	+ '</span>');
												});
								table
										.append('<div style="clear: both;"></div>');
								ul.append(table);
							}
							$.each(items, function(index, item) {
								self._renderItem(ul, item);
							});
						},
						_renderItem : function(ul, item) {
							var t = '', result = '';
							$
									.each(
											this.options.columns,
											function(index, column) {
												t += '<span style="padding:0 4px;float:left;width:'
														+ column.width
														+ ';">'
														+ item[column.valueField ? column.valueField
																: index]
														+ '</span>';
											});
							result = $('<li></li>')
									.data('ui-autocomplete-item', item)
									.append(
											'<a class="mcacAnchor">'
													+ t
													+ '<div style="clear: both;"></div></a>')
									.appendTo(ul);
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				// These next two options are what this plugin adds to the
				// autocomplete widget.
				showHeader : true,
				columns : [ {
					name : 'Master Id',
					width : '100px',
					valueField : 'id_question_master'
				}, {
					name : 'Master Name',
					width : '90px',
					valueField : 'question_header'
				}/*, {
					name : 'doctypeId',
				//	width : '90px',
					valueField : 'doctypeId'
				}*/],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
					//	$('#results').text(ui.item ? 'Selected: ' + ui.item.dn + ', '+ spl + ', '+ ui.item.specialisationName + ', ' + ui.item.depNm: 'Nothing selected, input was ' + this.value);
						//$('#' + id).val(ui.item.dn);
						//$('#userDocId').val(ui.item.ui);
						//$('#selectedObj').html(JSON.stringify(ui.item));
						$('#'+ id).val(ui.item.question_header);
					}
					
					//setAutoCompleteForDoctorName(id,'Serchdoc');
					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					//console.log(data.lstDocTyp.length);
					var result;
					if (!data || data.listquestionmaster.length === 0 || !data.listquestionmaster
							|| data.listquestionmaster.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'id_question_master' : 'Record',
							'question_header' : 'Found',
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.listquestionmaster;// Response List for All
													// Services
					}
					response(result);
					$('#ui-id-1').css("z-index", "10000000000");
				}
			});
}

function deletequestionmaster(id,callfrom)
{
	var inputs = [];
    inputs.push('callfrom=' + callfrom);
    inputs.push('id=' + id);

    var str = inputs.join('&');

    jQuery.ajax({
    	async : true,
    	type : "POST",
    	data 	: str + "&reqType=AJAX",
		url : "ehat/ris/deletequestionmaster",
		success : function(r) {
			
			alert("delete sucessfully");
			fetchQuestionMaster("onload");

		}
	});

}
function editquestionmasterresult(){
	var id = $("#testname").val();
	var userObj = $("#userObj").html();
	userObj = eval('(' + userObj + ')');
	var html="";
	var htmltextable="";
	 for(var i=0;i<userObj.listquestionmaster.length ;i++){
		
		 if(userObj.listquestionmaster[i].id_question_master ==id){
			 
			 $("#txtxqm").val(userObj.listquestionmaster[i].question_header);
			 $("#idQM").val(userObj.listquestionmaster[i].id_question_master);
			// alert(userObj.listquestionmaster[i].text);
			  if(userObj.listquestionmaster[i].text!="-"){
				  var array =[];
				  array=(userObj.listquestionmaster[i].text).split("@");
				  for(var t=0;t< array.length;t++){
					  htmltextable =htmltextable +'<tr > <th class="col-md-6-1 center" style="height: 21.5px;">	<input type="text" value="'+ array[t] +'" id="txtText" name="txtText" class="form-control input-SmallText" style=" font-weight: bold;background-color:buttonshadow">'
	                   +'</th></tr>';
					 /* jQuery("#totaltext")
			    		.append('<tr > <th class="col-md-6-1 center" style="height: 21.5px;">	<input type="text" value="'+ array[t] +'" id="txtText" name="txtText" class="form-control input-SmallText">'
			                   +'</th></tr>');*/
				  }
				 $("#totaltext").html(htmltextable);
				 
			  }
			 for(var j=0;j< userObj.listquestionmaster[i].listQuestion.length ;j++){
				 if(userObj.listquestionmaster[i].listQuestion[j].id_question_master ==id){ 
				 html =html+ '<tr style="height: 33; "><td  style="width:68px;" ><span style="margin-left:4px" class="badge badge-blue font-11"><font color="black" >'+ (j+1)+'</font></span></td><td>';	
                 html= html +'<div class="text-left"><div class="panel-group" id="accordion">'
					 + '<div class="panel"><div class="panel-heading"><h3 class="panel-title">'
					 +'<a class="accordion-toggle " data-toggle="collapse" data-parent="#accordion" href="#collapseCghsTwo'+ j +'" onclick="getSubServiceDetails1(1,7338,2)"><div class="row"><div class="col-md-10"><input type="text"  style="margin-left: 1%;width:400px" required="true"  placeholder="Question '+( j + 1) +'" id="txtQN'+ j +'" value="'+ userObj.listquestionmaster[i].listQuestion[j].question_name +'"></div><div class="col-md-1"><i class="fa fa-chevron-down" id="list1"></i>'
					 +'</div></div></a></h3></div><div style="height: auto;" id="collapseCghsTwo'+ j +'" class="panel-collapse in">'
					 +'<div class="panel-body"><table class="table table-hover"><thead></thead>';
                 html =html+'<tbody id="serviceData'+ j+'">';
					 for(var k=0;k< userObj.listquestionmaster[i].listQuestion[j].listAnswerDR.length ;k++){
						
						 html =html	 +'<tr id="tr19549"><td><span class="badge badge-blue font-11" style="margin-left:4px"><font color="black"> '+ ( k + 1)  + ' </font></span></td><td id="catName19549"> <input type="text"  style="margin-left: 1%;width:300px" required="true"  placeholder="Answer'+( k + 1) +'" id="txtans'+j + k +'"  onkeypress="return validatePrice(event)" value="'+ userObj.listquestionmaster[i].listQuestion[j].listAnswerDR[k].answer_name +'">'
					 +'<input type="hidden" id="ano'+j + k +'" value="'+  userObj.listquestionmaster[i].listQuestion[j].listAnswerDR[k].id_answer +'" class="form-control"></td>'
					 +'<td id="doccName19549"><input type="text"  style="margin-left: 1%;width:200px" required="true"  placeholder="Points"  id="txtpoint'+j + k +'" value="'+userObj.listquestionmaster[i].listQuestion[j].listAnswerDR[k].points +'" onkeypress="return validatePrice(event)"> </td><td class="col-md-1 center">'
					 
					+' <input type="radio" name="chk'+ j +'" id="chk'+ j + k  +'" onclick="setresult('+ j+',' + k  +')" ></td></tr>';
					 }
					 html =html+'</tbody></table></div></div></div></div></div>';
				    + '</td><td style="width:68px;"><input type="submit" style="width:48%" class="btn btn-success" onclick="addanswer('+ j +')" value="+"  disabled="disabled">'
				    +'<input type="hidden" id="totalanswer'+ j +'" value="'+  userObj.listquestionmaster[i].listQuestion[j].listAnswerDR.length +'" class="form-control"></td>'
				    + '<input type="hidden" id="qno'+j+'" value="'+   userObj.listquestionmaster[i].listQuestion[j].id_question  +'" class="form-control"></tr>';
				
				 }
			 } 
			 break;
		 }
		 
		
	 }
		$("#tquestionmaster").html(html);

}
function setresult(id,ansid){
	
	//var $radios = $('input:checkbox[name=chk' + id +  ansid + ']');
	  var toatalans = jQuery("#tquestionmaster").children('tr').length;
	  var ans =0;
	  var txtresult = 0;
	  for(var i=0; i< toatalans;i++){
		  
		  var tbodylength      =  jQuery("#serviceData"+ i).children('tr').length;
		 
	        for(var j=0; j< tbodylength;j++){
				if($("#chk"+ i +  j ).is(':checked')){
					  ans  = $.trim($("#txtpoint"+ i + j).val());
					//  alert(ans);
					  txtresult =  parseFloat(txtresult) + parseFloat(ans);
					  	
				}
	        }
		}
     if(txtresult==null  || txtresult== undefined ||txtresult=="" ){
			txtresult =0;
		}
		if( isNaN( txtresult)){
			txtresult=0;
		}
		$("#txtresult").val(txtresult);	


}

function Addtext(){
	var totaltxet =$("#rowcounttext").val();
	if(totaltxet > 0){
        if(totaltxet < 4){
    		jQuery("#totaltext")
    		.append('<tr > <th class="col-md-6-1 center" style="height: 21.5px;">	<input type="text" value="-" id="txtText" name="txtText" class="form-control input-SmallText">'
                   +'</th><th class="col-md-1 center"> <input type="checkbox" onclick="setChkremove()" id="chktext" name="chktext" style=" font-weight: bold;"></th>'
                   +'</tr>');
    		totaltxet ++;
    		$("#rowcounttext").val(totaltxet);	
        } else{
        	alert("length not  should  greater than 5!!");
        	return false;
        }

	
	}
	
}

