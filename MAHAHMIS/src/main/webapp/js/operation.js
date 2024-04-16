var physicalDisFlag="N";
var count = 1;
var delSer = [];
var updateop = [];//added by paras
var deleteop = [];//added by paras
var operationTemp = "<div style='width: 30%; padding-left: 2%'>	<div style='width: 70%; padding-top: 2%;'>	<div style='width: 30%; padding-right: 6%;'>Date</div>	<div style='width: 60%;'><input type='text' id='txtDate'		name='txtDate'		style='width: 100%; ' /></div>	</div>	<div style='width: 70%; padding-top: 6%;'>	<div style='width: 30%; padding-right: 6%;'>Cath No</div>	<div style='width: 60%;'><input type='text' id='txtCathNo'		name='txtCathNo'		style='width: 100%; ' /></div>	</div>	<div style='width: 70%; padding-top: 6%;'>	<div style='width: 30%; padding-right: 6%;'>Start Time</div>	<div style='width: 60%;'><input type='text' id='txtStartTime'		name='txtStartTime'		style='width: 100%; ' /></div>	</div>	<div style='width: 70%; padding-top: 6%;'>	<div style='width: 30%; padding-right: 6%;'>End Time</div>	<div style='width: 60%;'><input type='text' id='txtEndTime'		name='txtEndTime'		style='width: 100%; ' /></div>	</div>	<div style='width: 70%; padding-top: 6%;'>	<div style='width: 30%; padding-right: 6%;'>Procedure</div>	<div style='width: 60%;'><input type='text' id='txtProcedure'		name='txtProcedure'		style='width: 100%; ' /></div>	</div>	<div style='width: 70%; padding-top: 6%;'>	<div style='width: 30%; padding-right: 6%;'>Route</div>	<div style='width: 60%;'><input type='text' id='txtRoute'		name='txtRoute'		style='width: 100%; ' /></div>	</div>	<div style='width: 70%; padding-top: 6%;'>	<div style='width: 30%; padding-right: 6%;'>Veesal DET</div>	<div style='width: 60%;'><input type='text' id='txtVeesal'		name='txtVeesal'		style='width: 100%; ' /></div>	</div>	</div>	<div style='width: 35%; padding-left: 2%'>	<div style='width: 75%; padding-top: 4%;'>	<div style='width: 30%; padding-right: 6%;'>Stent Details</div>	<div style='width: 60%;'><input type='text' id='txtStent'		name='txtStent'		style='width: 100%; ' /></div>	</div>	<div style='width: 90%; padding-top: 4%;'>	<div style='width: 24%; padding-right: 6%;'>Performed By</div>	<div style='width: 51%;padding-right: 2%'><select		style='width: 100%; '		id='selPerBy' name='selPerBy'>		<option value='DR1'>DR1</option>		<option value='DR2'>DR2</option>	</select></div>	<div style='width: 7%;'><img src='images/add1.png' height='20'		width='20' /></div>	</div>	<div style='width: 100%; padding-left: 27%;'>	<div style='width: 45%; padding-right: 8%;'><textarea		style='width: 100%; '		name='txtDocName' id='txtDocName' cols='' rows='2'></textarea></div>	</div>	<div style='width: 90%; padding-top: 4%;'>	<div style='width: 24%; padding-right: 6%;'>Findings</div>	<div style='width: 50%; padding-right: 8%;'><textarea		style='width: 100%; '		name='txtFindings' id='txtFindings' cols='' rows='2'></textarea></div>	</div>	<div style='width: 90%; padding-top: 4%;'>	<div style='width: 24%; padding-right: 6%;'>Provlon</div>	<div style='width: 50%; padding-right: 8%;'><textarea		style='width: 100%; '		name='txtProvlon' id='txtProvlon' cols='' rows='2'></textarea></div>	</div>	</div>	<div style='width: 30%; border-top: 1px solid #436a9d;border-right: 1px solid #436a9d;'>	<div style='width: 90%; padding-top: 0%; padding-left: 27%'>	<div style='width: 41%;'>Equipment<input type='text'		id='txtEqName' name='txtEqName'		style='width: 100%; ' /></div>	<div style='width: 20%; padding-left: 5%;'>Quantity<input		type='text' id='txtEqQty' name='txtEqQty'		style='width: 80%; ' /></div>	<div style='width: 7%;'>&nbsp;<img src='images/add1.png'		height='20' width='35' /></div>	</div>	<div style='width: 90%; padding-top: 0%;'>	<div style='width: 24%; padding-right: 6%;'>Equipment</div>	<div style='width: 62%; padding-right: 8%;'><textarea		style='width: 100%; '		name='txtEquipmet' id='txtEquipmet' cols='' rows='2'></textarea></div>	</div>	<div style='width: 90%; padding-top: 4%;'>	<div style='width: 24%; padding-right: 6%;'>Comment</div>	<div style='width: 62%; padding-right: 8%;'><textarea		style='width: 100%; '		name='txtComment' id='txtComment' cols='' rows='2'></textarea></div>	</div>	<div style='width: 90%; padding-top: 4%;'>	<div style='width: 24%; padding-right: 6%;'>Status</div>	<div style='width: 62%; padding-right: 8%;'><textarea		style='width: 100%; '		name='txtStatus' id='txtStatus' cols='' rows='2'></textarea></div>	</div>	</div>";
// Abhijit Radke
var otcount = 1;
var serviceDetailsOT = {
		listBillDetailsIpd : []
    };
//jitendra 23march2019 print button added
var OTScheduleTemp = "<div class='col-md-12-1' style='margin-top:-13px; border: 1px solid #ddd;  overflow-y:scroll; height: 400px; max-height: auto;'>"
	+ "<table class='table table-bordered table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.pl as pl}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{otcount++}.</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;display:none;' id='divPi{otcount}'>{$T.pl.pi}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;' id='divPi{otcount}'>{$T.pl.centerPatientId}</td>"
	+ "<td class='col-md-4-1' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.listTop[0].dt}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+ "<button onclick='editOTschedule({$T.pl.listTop[0].id})' id='btnOper{otcount}' value='EDIT' class='btn btn-xs btn-success'><i class='fa fa-edit'></i></button>"
	+ "</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+ "<button onclick='actionOTschedule({$T.pl.pi},{$T.pl.trid},{$T.pl.listTop[0].id},{$T.pl.listTop[0].tomid})' id='btnAction{otcount}' value='Action' class='btn btn-xs btn-success'><i class='fa fa-eye'></i></button>"
	+ "</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+ "<button onclick='deleteOperationForOT({$T.pl.listTop[0].id},{$T.pl.trid})' id='btnDelete{otcount}' value='DELETE' class='btn btn-xs btn-success'><i class='fa fa-trash-o'></i></button>"
	+ "</td>" 
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+ "<button onclick=printOperationForOT({$T.pl.listTop[0].id},{$T.pl.pi},{$T.pl.trid},'{$T.pl.listTop[0].dt}') id='btnPrint{otcount}' value='Print' class='btn btn-xs btn-success'><i class='fa fa-print'></i></button>"
	+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

/*var OTScheduleTemp = "<div class='col-md-12-1' style='margin-top:-13px; border: 1px solid #ddd; overflow-y:scroll; height: 400px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{otcount++}.</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;' id='divPi{otcount}'>{$T.pl.pi}</td>"
		+ "<td class='col-md-4-1' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.pl.listTop[0].dt}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button onclick='editOTschedule({$T.pl.listTop[0].id})' id='btnOper{otcount}' value='EDIT' class='btn btn-xs btn-success'><i class='fa fa-edit'></i></button>"
		+ "</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button onclick='actionOTschedule({$T.pl.pi},{$T.pl.trid},{$T.pl.listTop[0].id},{$T.pl.listTop[0].tomid})' id='btnAction{otcount}' value='Action' class='btn btn-xs btn-success'><i class='fa fa-eye'></i></button>"
		+ "</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button onclick='deleteOperationForOT({$T.pl.listTop[0].id},{$T.pl.trid})' id='btnDelete{otcount}' value='DELETE' class='btn btn-xs btn-success'><i class='fa fa-trash-o'></i></button>"
		+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";*/

var containerOPerationTemplate = "<div class='col-sm-12-1' style='margin-top:-12px; border: 1px solid #ddd; overflow-y:scroll; height: 300px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;display:none;' id='divPi{count}'>{$T.pl.pi}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.pl.centerPatientId}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.listTop[0].dt}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button onclick='passOperation({$T.pl.pi},{$T.pl.listTop[0].id})' id='btnOper{count}' class='btn btn-xs btn-success' value='VIEW'>"
		+ "<i class='fa fa-eye'></i></button></td>"
		+ "</tr>"
		+ "{#/for}"
		+ "</tbody>" + "</table>" + "</div>";

// Abhijit Radke
var countId = 1;
// var count=0;
var containerOPerationSummaryTemplate = "{#foreach $T.pl as pl}"
		+ "<table class='table table-bordered cf ' style='Width: 100%; margin-top: 0px;' id='div{count}'>"
		+ "<tbody>		"
		+ "<tr id='div{count}'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{count}.</td>"

		+ "<td style='height: 21.5px; display:none;' class='col-md-1 center'  id='divPi{count}'>{$T.pl.pi}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'  id='divPi{count}'>{$T.pl.centerPatientId}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>{$T.pl.listTop[0].dt}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'  onclick='hideShowPatOp({$T.pl.pi},{count})'>"
		+ "<img src='images/down.png' id='imgupdown{count}' />"
		+ "<input type='hidden' id='hideShowStatus{count++}' value='0' /></td>"
		+ "</tr>" + "</tbody></table>{#/for}";

var cssdOPerationSummaryTemplate = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div id='divPi{count}' style='width: 11.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 16.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.obTO.dt}</div><div style='width: 22%; height: 25px;  padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input onclick='viewOperationDrugs({$T.pl.obTO.id})' id='btnEdit{count}' style='font-size: 10px;' type='button' value='VIEW' /></div>  </div>  {#/for}";

var containerCAReportTemplate = "{#foreach $T.pl as pl}<div	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div id='divPi{count}' style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.pi}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.obTO.dt}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.op.on}</div><div style='width: 15%; height: 25px; padding-top: 3px; text-align: center; '><input onclick=getOperationReport('{$T.pl.op.on}',{$T.pl.obTO.id})	id='btnReport{count}' style='font-size: 10px;' type='button' class='edit' value='ADD REPORT' /></div></div>{#/for}";

var containerAngioplastyTemplate = "{#foreach $T.pl as pl}<div	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div id='divPi{count}' style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.pi}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.obTO.dt}</div><div style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.pl.op.on}</div><div style='width: 15%; height: 25px; padding-top: 3px; text-align: center; '><input onclick=getOperationReport('{$T.pl.op.on}',{$T.pl.obTO.id})	id='btnReport{count}' style='font-size: 10px;' type='button' class='edit' value='ADD REPORT' /></div></div>{#/for}";

var operationTypeTemp = "<select id='oType'><option value='select' >Select Procedure Type</option>{#foreach $T.ol as ol}<option value='{$T.ol.oi}'> {$T.ol.on}</option>{#/for}</select>";

var CAPatInfoTemp = "<div style='width: 100%; padding-top: 15px; height: 50px;'><div style='width: 12%; text-align: left; padding-left: 2px; float: left; font-weiht: bold;'>Patient Name:-</div><div style='width: 38%; float: left;' id='pname'>{$T.tit}{$T.fn}&nbsp{$T.mn}&nbsp{$T.ln}</div><div style='width: 8%; text-align: left; padding-left: 90px; float: left; font-weight: bold;'>Age:-&nbsp;&nbsp;</div><div style='width: 30px;' id='age'>{$T.ag}&nbsp;{$T.agtp}</div><div style='width: 40%; padding-top: 10px; text-align: left; padding-left: 20px; float: right; font-weight: bold; padding-top: 5px;'>Date:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' name='date' id='date' onclick='setCalander()' ></div><div style='width: 12%; text-align: left; padding-left: 2px; float: left; font-weight: bold; padding-top: 7px;'>Ref By:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div><div style='width: 20%;  float: left; padding-top: 7px;' id='rb'>{$T.rb}</div></div><div	style='width: 40%; text-align: left;  font-weight: bold; padding-top: 10px;'>Register Cath ID.:-&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<input style='border: 0.2px solid;width: 47.5%;'  name='regCathId' id='regCathId' value=''></div><div	style='width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold; padding-top: 10px;'>Cath No.:-&nbsp&nbsp<input style='background: lightgray;' readonly='readonly' name='cathno' id='cathno' value='{$T.obTO.id}'></div></div><div style='width: 100%; height: 70px; padding-top: 20px;'>										<div											style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'></div>										<div											style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'>											<textarea style='border: 0.2px solid;' class='' id='angtext' 												rows='3' cols='80' name='angtext'></textarea>										</div>									</div><div style='width: 100%; padding-top: 10px;height: 30px;'><div style='width: 15%; color: #000; text-align: left; padding-left: 0%;'>Left Main:-</div><div style='width: 20%; color: #FFF;'><input type='text' name='lfMain' style='width: 95%; border: 0.2px solid;' id='lfMain'></div></div><div style='width: 100%; height: 100px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Left Anterior Descending:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='lfAntDesc' rows='3' cols='90'	name='lfAntDesc'></textarea></div></div><div style='width: 100%; height: 65px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Left Circumflex:-</div><div	style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class=''	id='lfCirfx' rows='2' cols='90'	name='lfCirfx'></textarea></div></div><div style='width: 100%; height: 45px;'><div	style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Right Coronary Angio:-</div><div	style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class=''	id='rtCorAngio' rows='1' cols='90' name='rtCorAngio'></textarea></div></div><div style='width: 100%; height: 45px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Impression:-</div><div	style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class=''	id='impression' rows='1' cols='90' name='impression'></textarea></div></div><div style='width: 100%; height: 45px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Reccommendation:-</div><div	style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class=''		id='reccommendation' rows='1' cols='90'		name='Reccommendation'></textarea></div></div><input type='hidden' id='queryType' name='queryType' value='insert' >";

var AngioplastyInfoTemp = "<div style='width: 100%; padding-top: 15px; height: 50px;'><div style='width: 12%; text-align: left; padding-left: 2px; float: left; font-weiht: bold;'>Patient Name:-</div><div style='width: 38%; float: left;' id='pname'>{$T.tit}{$T.fn}&nbsp{$T.mn}&nbsp{$T.ln}</div><div style='width: 8%; text-align: left; padding-left: 90px; float: left; font-weight: bold;'>Age:-&nbsp;&nbsp;</div><div style='width: 30px;' id='age'>{$T.ag}&nbsp;{$T.agtp}</div><div style='width: 40%; padding-top: 10px; text-align: left; padding-left: 20px; float: right; font-weight: bold; padding-top: 5px;'>Date:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' name='date' id='date' onclick='setCalander()' ></div><div style='width: 12%; text-align: left; padding-left: 2px; float: left; font-weight: bold; padding-top: 7px;'>Ref By:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div><div style='width: 20%;  float: left; padding-top: 7px;' id='rb'>{$T.rb}</div></div><div id='my' style='width: 100%; padding-top: 2px; height: 50px;' ><div	style='width: 50%; text-align: left; padding-left: 2px; float: left; font-weight: bold; padding-top: 10px;'>Register Cath No.:-&nbsp&nbsp<input text='text' name='Rcathno' id='Rcathno' onkeypress='return validateNumbers(event)' ></div><div	style='width: 40%; text-align: left; padding-left: 2px; float: right; font-weight: bold; padding-top: 10px;'>Cath No.:-&nbsp&nbsp<input style='background: lightgray;' readonly='readonly' name='cathno' id='cathno' value='{$T.obTO.id}'></div></div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left; padding-top: 5%;'><textarea style='border: 0.2px solid;' class='' id='description' rows='12' cols='110'	name='description'></textarea></div></div><div style='width: 100%; height: 45px; padding-top: 3%;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Impression:-</div><div	style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class=''	id='impression' rows='1' cols='93' name='impression'></textarea></div></div><input type='hidden' id='queryType' name='queryType' value='insert' >";

var editCADashboardTemp = "<div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 50%; text-align: left; padding-left: 2px; float: left; font-weight: bold;'>Patient Name:-</div><div	style='width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold;'>Age:-</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold;padding-top:5px ;'>Date:- </div></div><div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 50%; text-align: left; padding-left: 2px; float: left; font-weight: bold;'>Ref By:-</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold;'>Cath No.:-</div></div>";

var editCAContentTemp = "<div style='width: 100%; padding-top: 10px;height: 30px;'><div style='width: 15%; color: #000; text-align: left; padding-left: %;'>Left	Main:-</div><div style='width: 18%; color: #FFF; text-align: center;'><input type='text' name='lfMain' style='width: 95%; border: 0.2px solid;' id='lfMain'></div></div><div style='width: 100%; height: 100px;'><div	style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Left Anterior Descending:-</div><div	style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class=''	id='lfAntDesc' rows='3' cols='90' name='lfAntDesc'></textarea></div></div><div style='width: 100%; height: 65px;'><div	style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Left Circumflex:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='lfCirfx' rows='2' cols='90' name='lfCirfx'></textarea></div></div><div style='width: 100%; height: 45px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Right Coronary Angio:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='rtCorAngio' rows='1' cols='90' name='rtCorAngio'></textarea></div></div><div style='width: 100%; height: 45px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Impression:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='impression' rows='1' cols='90'	name='impression'></textarea></div></div><div style='width: 100%; height: 45px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Reccommendation:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='reccommendation' rows='1' cols='90' name='Reccommendation'></textarea></div></div>";

var viewPreOp = "{#foreach $T.pl as pl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='div{count}'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div style='width: 34%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.ln}</div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div style='width: 11.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otd.ti}</div><div style='width: 16%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.otd.dt}</div><div style='width: 10%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='VIEW DETAILS' onClick='ViewTreatment({$T.pl.otd.id})' /></div></div> {#/for}";

/** **********OT Schedule *************************** */

function hideShowPatOp(pid, divid) {
	
	$("#imgupdown" + divid).attr('src', "images/up.png");
	count = 1;
	// $("#patPreTreat").show();
	var prediv = $("#patPreTreat" + divid);
	if (prediv.length == 0) {
		divId = "div" + divid;

		var temp = "<div class='divide-10'></div><div class='panel panel-default col-sm-6-1' style='margin-left:555px;' id='patPreTreat"
				+ divid
				+ "'>"
				+ "<div class='col-sm-12-1'>"
				+ "<div class='col-sm-1-1 center'>#</div>"
				+ "<div class='col-sm-3-1 center'>Treatment Id</div>"
				+ "<div class='col-sm-3-1 center'>Operation Manage ID</div>"
				+ "<div class='col-sm-3-1 center'>Operation Date</div>"
				+ "<div class='col-sm-1-1 center'>View</div>"
				+ "</div>"
				+ "<div class='col-sm-12-1' id='preTrecontainer"
				+ divid
				+ "'>"
				+ "</div></div>";

		$(temp).insertAfter($('#' + divId));
		// viewPrevDocDeskPatient(pid, divid);

		for ( var s = 0; s < pobj1.pl.length; s++) {
			
			if (pid == pobj1.pl[s].pi) {
				var treatmentId = pobj1.pl[s].trid;
				
				viewPreOp = "{#foreach $T.pl["
					+ s
					+ "].listTop as pl}<div class='divide-10'>"

					+ "<div class='col-sm-12-1' style='padding-top:30px'>"
					+ "<div class='col-sm-1-1 center'>{count++}.</div>"
					+ "<div class='col-sm-3-1 center'>{$T.pl.ti}"

					+ "</div>"
					+ "<div class='col-sm-3-1 center'>{$T.pl.tomid}</div>"
					+ "<div class='col-sm-3-1 center'>{$T.pl.dt}</div>"
					+ "<div class='col-sm-1-1 center'><input style='font-size: 10px;' type='button' value='View' class='btn btn-xs btn-success'	onclick='editOperation("
					+ pid + ","+treatmentId+",{$T.pl.tomid})' /></div>"
					+ "<div class='col-sm-1-1 center'><input style='font-size: 10px;' type='button' value='Details' class='btn btn-xs btn-success'	onclick='viewOperationDetails("
					+ pid + ",{$T.pl.ti},{$T.pl.id},{$T.pl.tomid})' /></div></div>{#/for}";
				
			}

		}

		$("#preTrecontainer" + divid).setTemplate(viewPreOp);
		$("#preTrecontainer" + divid).processTemplate(pobj1);

	} else {
		$("#imgupdown" + divid).attr('src', "images/down.png");
		$('#patPreTreat' + divid).remove();
	}
}

var otNameTemp = '<option value="0">-SELECT-</option>{#foreach $T.liot as liot}<option value="{$T.liot.otid}">{$T.liot.otnm}</option>{#/for}';
function click1() {
	// alert("in click");
	// var id = fieldId.id;
	// alert(id);
	$(function() {
		$(".demo").timepickr({
			convention : 12

		});

	});

}
function fetchOperationTheaterNames(otid) {

	var date = $("#date-pick").val();
	var stTime = $("#timeFrom option:selected").text();
	var eTime = $("#timeTo option:selected").text();

	var inputs = [];
	inputs.push('action=fetchOTName');
	inputs.push('date=' + date);
	inputs.push('stTime=' + stTime);
	inputs.push('eTime=' + eTime);
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "./ehat/otdata/fetchOTName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(ajaxResponse) {
			// alert(ajaxResponse);
			var myObj1 = JSON.stringify(ajaxResponse);
			//$("#divOTName").html(ajaxResponse);
			$("#divOTName").html(myObj1);
			otBean = eval( ajaxResponse );
			$("#otName").setTemplate(otNameTemp);
			$("#otName").processTemplate(otBean);
			$("#otName2").setTemplate(otNameTemp);
			$("#otName2").processTemplate(otBean);
			$("#chargeWise").setTemplate(otNameTemp);
			$("#chargeWise").processTemplate(otBean);
			if (otid != undefined) {
				$("#otName").val(otid);
			}

		}
	});
}

// var commonPatInfoForOperation = "<div style='width: 100%; height: 99%;'> <div
// id='rightContActual'> <div style='width: 99%; background-color: #bfdbff;
// border: 1px solid #39C; padding: 1%;margin-left:5px;margin-top:5px;'> <div
// style='width: 10%;'> {#if $T.img!= ''}<img src='{$T.img}' width='50'
// height='50' name='patImg' id='patImg' />{#/if}{#if $T.img== ''}<img
// src='images/patientPhoto.jpg' width='50' height='50' name='patImg'
// id='patImg' /> {#/if} </div> <div style='width: 85%;'> <div style='width:
// 100%;'> <div style='width: 30%;'> <div style='width: 100%;'> <div
// style='width: 37%; padding-left: 7%; padding-top: 1%; font-weight:
// bold;'>PatientID:</div> <div id='PatID' style='width: 30%; padding-right: 7%;
// color: #002c67;'>{$T.pi}</div> </div> <div style='width: 100%; padding-top:
// 2%;'> <div style='width: 37%; padding-left: 7%; padding-top: 1%; font-weight:
// bold;'>Admission No:</div> <div id='tid' style='width: 30%; padding-right:
// 7%; color: #002c67; padding-top: 2%;'>{$T.objTreat.trCount}</div></div>
// </div> <div style='width: 45%;'> <div style='width: 100%;'> <div
// style='width: 35%; padding-top: 0%; font-weight: bold;'>Patient Name</div>
// <div id='fn' style='width: 64%; padding-right: 0%; color:
// #002c67;'>{$T.tit}{$T.fn}&nbsp;{$T.ln}</div> </div> <div style='width: 100%;
// padding-top: 2%;'> <div style='width: 35%; padding-top: 0%; font-weight:
// bold;'>Date of Admission</div> <div style='width: 64%; padding-right: 0%;
// color:
// #002c67;'>{$T.objTreat.treStart}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{$T.objTreat.int}</div>
// </div> </div> <div style='width: 20%;'> <div style='width: 100%;'> <div
// style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Age
// .</div> <div style='width: 43%; padding-right: 7%; color:
// #002c67;'>{$T.ag}{$T.agtp}</div> </div> <div style='width: 100%; padding-top:
// 3%;'> <div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight:
// bold;'>Weight .</div> <div style='width: 43%; padding-right: 7%; color:
// #002c67;' id='bid'>{$T.wt}</div> </div> </div> </div> </div> </div> </div>
// </div>";
function setcommonPatInfoForOperation() {
	
	var pobj = $("#divPatId").html();
	var pobj1 = eval('(' + pobj + ')');
	var mon = 0;
	var dd = 0;
	if (pobj1.month == undefined) {
		mon = 0;
	} else {
		mon = pobj1.month;
	}
	if (pobj1.days == undefined) {
		dd = 0;
	} else {
		dd = pobj1.days;
	}
	$("#patientId").text(pobj1.pi);
	$("#bill_Id").val(pobj1.billid);//added by paras
	$("#pt_Id").val(pobj1.pi);//added by paras
	$("#centerPatientId").text(pobj1.centerPatientId);
	$("#patientName").text(
			(pobj1.tit + " " + pobj1.fn + " " + pobj1.mn + " " + pobj1.ln));
	//$("#age").text(pobj1.ag+"Y/"+pobj1.month+"M/"+pobj1.days+"D");
	$("#age").text(pobj1.ag);

	$("#sex").text(pobj1.sx);
	$("#weight").text(pobj1.wt);
	
	$("#dateOfAdmission").text(pobj1.objTreat.treStart);

	$("#refer_by").text(pobj1.rb);
	$("#trid").val(pobj1.trid);
	$("#ipdno").html(pobj1.objTreat.trCount);
	$("#bill_category").text(pobj1.objTreat.billCategory_Name);
	$("#OpDate").text(pobj1.listTop[0].dt);
	$("#OpTime").text(pobj1.listTop[0].st +" "+ pobj1.listTop[0].et);
	$("#OpName").text(pobj1.listTop[0].on);
	$("#chargesSlaveId").val(pobj1.objTreat.companyid);
	$("#corporate").text(pobj1.objTreat.companyname);
	// $("#CommonPatInfo").setTemplate(template);
	// $("#CommonPatInfo").processTemplate(pobj1);
	var fileName=pobj1.img;	
	$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
	$("#billNo").text(pobj1.billid);
}
var anesthesisDoctorTemp = "{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";

function fetchAllAnesthesis(pageName) {

	var date = $("#date-pick").val();
	var stTime = $("#timeFrom").val();
	var eTime = $("#timeTo").val();

	var inputs = [];
	inputs.push('action=fetchAnesthesis');
	inputs.push('date=' + date);
	inputs.push('stTime=' + stTime);
	inputs.push('eTime=' + eTime);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(ajaxResponse) {
			// alert(ajaxResponse);
			DoctorBean = eval('(' + ajaxResponse + ')');
			if (pageName == "operation") {
				$("#selAnesthesis").setTemplate(anesthesisDoctorTemp);
				$("#selAnesthesis").processTemplate(DoctorBean);
			}
		}
	});

}

function fetchAllAnesthesisOnload(rowcount, anesid) {

	var inputs = [];
	inputs.push('action=fetchAnesthesisOnload');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			DoctorBean = eval('(' + ajaxResponse + ')');
			$("#anesthesisIds").val(ajaxResponse);
			if (rowcount == undefined) {
				$("#selAnesthesis").setTemplate(anesthesisDoctorTemp);
				$("#selAnesthesis").processTemplate(DoctorBean);
			} else {
				$("#selAnesthesis" + rowcount)
						.setTemplate(anesthesisDoctorTemp);
				$("#selAnesthesis" + rowcount).processTemplate(DoctorBean);
				$("#selAnesthesis" + rowcount).val(anesid);
			}
		}
	});
}

function addAnesthetist() {

	var docName = $("#selAnesthesis option:selected").text();
	var docid = $("#selAnesthesis").val();

	if (docid == "select") {
		alert("Please select Doctor.");
		return false;
	}
	var add = docName + '\n';

	var doctorId = docid + '\n';
	var flag = 0;
	$('#txtAnesthetistName').find('option').each(function() {
		if ($(this).html() == add) {
			alert("Doctor is present in list");
			flag = 1;
		}
	});
	if (flag == 0) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(add);
		$(o).val(doctorId);
		$("#txtAnesthetistName").append(o);

	}
}

function RemoveAnesthetist() {
	var tropid = $("#tropid").val();
	if (tropid != "" && tropid != undefined) {

		var docName = "";
		$('#txtAnesthetistName').find('option:selected').each(function() {
			docName = docName + $(this).val();
		});
		var docId = "";
		var docArr = [];
		docArr = docName.split("\n");
		for ( var i = 0; i < docArr.length; i++) {
			docId = docId + docArr[i] + ",";
		}

		var inputs = [];
		inputs.push('action=changeNaForOperation');
		inputs.push('tropid=' + tropid);
		inputs.push('docId=' + docId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "OperationServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;

			}
		});
	}
	$('#txtAnesthetistName option:selected').remove();
}

function showPatDiv() {
	$("#patnameDiv").show();
}

function editOTschedule(id) {
	// fetchSurgicalKitNm('editoperation');
	// fetchAllAnesthesisOnload();
	// fetchPTNameForOtSchedule();

	// $("#txtAssSurgeon").html("");
	// $("#txtDocName").html("");
	// $("#patnameDiv").show();

	var myObj = "";
	var ajaxResponse1 = $("#OTdata").val();
	// alert(ajaxResponse1);
	var pobj = eval('(' + ajaxResponse1 + ')');
	for ( var i = 0; i < pobj.pl.length; i++) {
		if (pobj.pl[i].listTop[0].id == id) {

			myObj = pobj.pl[i];
			break;
			/*
			 * $("#tropid").val(id); $("#hidpatId").val(pobj.pl[i].pi);
			 * $("#tropmanageid").val(pobj.pl[i].listTop[0].tomid);
			 * $("#trid").val(pobj.pl[i].trid); $("#queryType").val("update");
			 * $("#btnSave").val("UPDATE"); var name = pobj.pl[i].tit + " " +
			 * pobj.pl[i].fn + " " + pobj.pl[i].ln; // alert("name" + name);
			 * $("#txtPName").val(name);
			 * $("#date-pick").val(pobj.pl[i].listTop[0].dt);
			 * $("#otName").val(pobj.pl[i].listTop[0].otid);
			 * 
			 * $("#selOTtype").val(pobj.pl[i].listTop[0].opobj.oty); //
			 * alert(pobj.pl[i].top.dpt);
			 * $("#department").val(pobj.pl[i].listTop[0].dpt);
			 * getOperationName(); $("#timeFrom").val(pobj.pl[i].listTop[0].st);
			 * $("#timeTo").val(pobj.pl[i].listTop[0].et);
			 * 
			 * if (pobj.pl[i].listTop[0].emerFlg == "Y") {
			 * $("#emerFlag").attr("checked", "checked"); } else {
			 * $("#emerFlag").removeAttr('checked', false); }
			 * 
			 * if (pobj.pl[i].listTop[0].infFlg == "Y") {
			 * $("#infectFlag").attr("checked", "checked"); } else {
			 * $("#infectFlag").removeAttr('checked', false); } var docName =
			 * []; docName = pobj.pl[i].listTop[0].docnms.split(','); for ( var
			 * m = 0; m < (docName.length - 1); m++) { var o = new
			 * Option("option text", "value"); $(o).html(docName[m + 1] + '\n');
			 * $(o).val(pobj.pl[i].listTop[0].liOpDoc[m].idopDoc + '\n');
			 * $("#txtDocName").append(o); } for ( var m = 0; m <
			 * (pobj.pl[i].listTop[0].listOpeAnes.length); m++) {
			 * $("#selAnesthesis option[value=" +
			 * pobj.pl[i].listTop[0].listOpeAnes[m].anesId +
			 * "]").attr("selected", "selected"); } var assSurgeonname = [];
			 * assSurgeonname = pobj.pl[i].listTop[0].assSurgeonName.split(',');
			 * for ( var m = 0; m < (assSurgeonname.length - 1); m++) { var o =
			 * new Option("option text", "value"); $(o).html(assSurgeonname[m +
			 * 1] + '\n');
			 * $(o).val(pobj.pl[i].listTop[0].liAssSurgeon[m].asstDocId + '\n');
			 * $("#txtAssSurgeon").append(o); } var ansid =
			 * pobj.pl[i].listTop[0].anid; var oid =
			 * pobj.pl[i].listTop[0].opobj.oi; setTimeout(function() {
			 * $("#selOTName").val(oid); }, 1000);
			 */

		}
	}
	var otDate = myObj.listTop[0].dt;
	myObj = JSON.stringify(myObj);
	window.location.href = "OTScheduler.jsp?treamentOpid="
			+ encodeURIComponent(id) + "&editQuery=update&otDate = " + otDate;
}
var operationNameTemp = "<option value='0'>-SELECT-</option>{#foreach $T.ol as ol}<option value='{$T.ol.oi}' >{$T.ol.on}</option>{#/for}";

function getOperationName() {
	
	/*if (rowcount == undefined) {
		var opType = $("#selOTtype").val();
		var department = $("#department").val();
	} else {
		var opType = $("#selOTtype" + rowcount).val();
		var department = $("#department" + rowcount).val();
	}*/
	var opType = $("#selOTtype").val();
	if (opType == "Select") {
		alert("Please Select Operation Type");
		$("#department").val(0);
		return false;
	}
	var inputs = [];
	inputs.push('opType=' + encodeURIComponent(opType));
	inputs.push('department=' + encodeURIComponent(department));
	inputs.push('action=fetchOperationName');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "./ehat/otdata/fetchOperationName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(ajaxResponse) {
			// alert(ajaxResponse);
			objc = eval( ajaxResponse );
			$("#selOTName").setTemplate(operationNameTemp);
			$("#selOTName").processTemplate(objc);
			$("#selOTName").select2();
			/*if (rowcount == undefined) {
				$("#selOTName").setTemplate(operationNameTemp);
				$("#selOTName").processTemplate(objc);
			} else {
				$("#selOTName" + rowcount).setTemplate(operationNameTemp);
				$("#selOTName" + rowcount).processTemplate(objc);
				$("#selOTName" + rowcount).val(oid);
			}*/

		}
	});

}

function scheduleOT() {

	var operationDocIds = {
		liopDoc : []
	};

	var OTType = $("#selOTtype").val();
	var OTName = $("#selOTName").val();
	var otName = $("#otName").val();
	var hidpatId = $("#hidpatId").val();

	var docName = "";
	$('#txtDocName').find('option').each(function() {
		docName = docName + $(this).val();
	});
	var docId = "";
	var docArr = [];
	docArr = docName.split("\n");
	for ( var i = 0; i < docArr.length; i++) {
		if (docArr[i] != "") {
			operationDocIds.liopDoc.push({
				"idopDoc" : docArr[i]

			});
		}
	}
	operationDocIds = JSON.stringify(operationDocIds);

	var asstSurgeonIds = {
		liAsstSurgeon : []
	};

	var asstSurgeonName = "";
	$('#txtAssSurgeon').find('option').each(function() {
		asstSurgeonName = asstSurgeonName + $(this).val();
	});

	var anesthetist = "";
	var hexvalues = [];
	$('#selAnesthesis :selected').each(function(i, selectedElement) {
		hexvalues[i] = $(selectedElement).val();
		anesthetist = anesthetist + hexvalues[i] + "@";
	});
	var anesthetistId = {
		liOpeAnes : []
	};
	var anesArr = [];
	anesArr = anesthetist.split("@");
	for ( var i = 0; i < anesArr.length; i++) {
		if (anesArr[i] != "") {
			anesthetistId.liOpeAnes.push({
				"anesId" : anesArr[i]
			});
		}
	}
	anesthetist = JSON.stringify(anesthetistId);

	var asstDocArr = [];
	asstDocArr = asstSurgeonName.split("\n");
	for ( var i = 0; i < asstDocArr.length; i++) {
		if (asstDocArr[i] != "") {
			asstSurgeonIds.liAsstSurgeon.push({
				"asstDocId" : asstDocArr[i]
			});
		}
	}
	asstSurgeonIds = JSON.stringify(asstSurgeonIds);

	var emergencyFlag;
	if ($('#emerFlag').is(":checked")) {
		emergencyFlag = 'Y';
	} else {
		emergencyFlag = 'N';
	}

	var infectionFlag;
	if ($('#infectFlag').is(":checked")) {
		infectionFlag = 'Y';
	} else {
		infectionFlag = 'N';
	}

	// var anesthetistId = $("#selAnesthesis").val();
	var trid = $("#trid").val();

	var OTdate = $("#date-pick").val();
	var timeFrom = $("#timeFrom").val();
	var timeTo = $("#timeTo").val();
	var nafrom = $("#timeFrom").val();
	var nato = $("#timeTo").val();

	var department = $("#department").val();
	if (timeFrom == "" || timeTo == "") {
		alert("Please enter time");
		return false;
	} else {
		var st = parseInt(timeFrom.replace(':', ''), 10);
		var et = parseInt(timeTo.replace(':', ''), 10);
	}

	/*
	 * var kitName = []; $('#selTempName option:selected').each(function() {
	 * kitName.push($(this).val()); });
	 */
	var queryType = $("#queryType").val();
	// alert($("#txtDocName option").val());
	if (OTType == "-Select-") {
		alert("Please Select Operation Type");
		return false;
	} else if (OTName == "" || OTName == null) {
		alert("Please Select Operation Name");
		return false;
	} else if ($("#txtDocName option").val() == undefined) {
		alert("Please Enter Doctor Name");
		return false;
	} else if ($("#txtPName").val() == "" || $("#txtPName").val() == undefined) {
		alert("Please Enter Patient Name");
		return false;
	} else if ($("#selAnesthesis").val() == "select") {
		alert("Please Enter Anesthetist Name");
		return false;
	} else if (OTdate == "" || OTdate == null) {
		alert("Please Enter The Operation Date");
		return false;
	} /*
		 * else if (st > et) { alert('End Time Always Greater Then Start Time');
		 * return false; }
		 */

	var inputs = [];
	inputs.push('action=scheduleOT');
	inputs.push('OTType=' + encodeURIComponent(OTType));
	inputs.push('OTName=' + encodeURIComponent(OTName));
	inputs.push('operationDocIds=' + encodeURIComponent(operationDocIds));
	inputs.push('anesthetistId=' + encodeURIComponent(anesthetist));
	inputs.push('department=' + department);
	// alert(hidpatId);
	inputs.push('patientId=' + hidpatId);
	inputs.push('trid=' + trid);
	inputs.push('OTdate=' + OTdate);
	inputs.push('timeFrom=' + timeFrom);
	inputs.push('timeTo=' + timeTo);
	inputs.push('queryType=' + queryType);
	inputs.push('tropid=' + $("#tropid").val());
	inputs.push('nafrom=' + (nafrom));
	inputs.push('nato=' + (nato));
	inputs.push('otName=' + encodeURIComponent(otName));
	inputs.push('tropmanageid=' + $("#tropmanageid").val());
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('asstSurgeonIds=' + asstSurgeonIds);
	inputs.push('emergencyFlag=' + emergencyFlag);
	inputs.push('infectionFlag=' + infectionFlag);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			window.location.href = "OTSchedule.jsp";
		}
	});

}

var procedureTypeForOtSchedule = "<option value='0'>-SELECT-</option>{#foreach $T.lipt as lipt}<option  value='{$T.lipt.idpt}'>{$T.lipt.ptnm}</option>{#/for}";

function fetchPTNameForOtSchedule(rowcount) {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchPTName');

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchPTName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval( ajaxResponse);

			if (rowcount == undefined) {
				$("#selOTtype").setTemplate(procedureTypeForOtSchedule);
				$("#selOTtype").processTemplate(pobj1);
			} else {
				$("#selOTtype" + rowcount).setTemplate(
						procedureTypeForOtSchedule);
				$("#selOTtype" + rowcount).processTemplate(pobj1);
			}
		}
	});
}

function setpatientId() {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : "action=NewReg&pagenm=opsch",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#patID").val(ajaxResponse);
		}
	});

}

/** ********End OT Schedule ********************* */

/** ********************Operation FUNCTIONS************************************ */
function addToCAReport(cathid) {

	var pobj = $("#divPatId").html();
	//alert("Vaibhav sasad"+pobj);
	myArray = JSON.parse(pobj);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].obTO.id == cathid) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	window.location.href = "CoronaryAngiographyReport.jsp?" + "myObj="
			+ encodeURIComponent(myObj);

}

function addToAngioplastyReport(cathid) {

	var pobj = $("#divPatId").html();
	myArray = JSON.parse(pobj);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].obTO.id == cathid) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	window.location.href = "AngioplastyReport.jsp?" + "myObj="
			+ encodeURIComponent(myObj);

}

function getOperationReport(operationName, cathid) {
	// alert(operationName);
	if (operationName == "ANGIOGRAPHY") {
		var pobj = $("#divPatId").html();
		myArray = JSON.parse(pobj);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].obTO.id == cathid) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);

		window.location.href = "CoronaryAngiographyReport.jsp?" + "myObj="
				+ encodeURIComponent(myObj);

	} else if (operationName == "ANGIOPLASTY") {
		var pobj = $("#divPatId").html();
		myArray = JSON.parse(pobj);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].obTO.id == cathid) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);

		window.location.href = "AngioplastyReport.jsp?" + "myObj="
				+ encodeURIComponent(myObj);
	}
}

function viewCAReportSummary(pageName) {
	var input = [];
//	input.push('action=DisplayOpSum');
	if (pageName == 'CADashBoard') {
		input.push('trid=ANGIOGRAPHY');
	} else if (pageName == 'AngioplastyDashboard') {
		input.push('trid=ANGIOPLASTY');
	}
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			$("#divPatId").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			if (pageName == 'CADashBoard') {
				$("#container").setTemplate(containerCAReportTemplate);
				$("#container").processTemplate(pobj1);
			} else if (pageName == 'AngioplastyDashboard') {
				$("#container").setTemplate(containerAngioplastyTemplate);
				$("#container").processTemplate(pobj1);
			}
		}
	});
}

function operationSummarySearch(pageName) {

	var byName = $("#byName").val();
	var byId = $("#byId").val();

	var searchBy = 0;
	var value = 0;
	if (byName != "" && byId != "") {
		alert("Please search either by patient Id or by Patient Name");
	} else if (byName == "" && byId == "") {
		alert("Please enter Patient Name or Patient Id for search");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}
		var inputs = [];
		inputs.push('action=searchOperationSumm');
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('pageName=' + encodeURIComponent(pageName));
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "PatientServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.pl.length == 0) {
					alert("Patient Not Found");
				} else {
					count = 1;
					if (pageName == "OPSummaryDashBoard") {
						$("#container").setTemplate(
								containerOPerationSummaryTemplate);
						$("#container").processTemplate(pobj1);

					} else if (pageName == "CorAngDashboard") {

						$("#container").setTemplate(containerCAReportTemplate);
						$("#container").processTemplate(pobj1);

					} else if (pageName == "AngioplastyDashboard") {
						$("#container").setTemplate(containerCAReportTemplate);
						$("#container").processTemplate(pobj1);

					}
				}
			}
		});
	}

}

function operationSummaryDetails(pageName) {
	
	
	var searchBy = $("#topId").val();
	var value = $("#pid").val();
	var otDate = $("#operationDate").val();

	var input = [];
	input.push('searchBy=' + encodeURIComponent(searchBy));
	input.push('value=' + encodeURIComponent(value));
	input.push('action=DisplayOperationPat');
	input.push('otDate=' + encodeURIComponent(otDate));

	input.push('page_name=' + encodeURIComponent("PrevOperationDashboard"));
	var str = input.join('&');

	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "./ehat/otdata/DisplayOperationPat",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			var myArray = r;//JSON.parse(ajaxResponse);
			var myObj = myArray.pl[0];
			var myObj1 = JSON.stringify(myObj);
			$("#divPatId").html(myObj1);
		}
	});


	
	
	/*

	var topId = $("#topId").val();
	var pid = $("#pid").val();

	var searchBy = 0;
	var value = 0;
	if (topId == "" && pid == "") {
		alert("Please select patient");
	} else {
		searchBy = topId;
		value = pid;
	}
	var inputs = [];
	inputs.push('action=searchOperationSumm');
	inputs.push('searchBy=' + encodeURIComponent(searchBy));
	inputs.push('value=' + encodeURIComponent(value));
	inputs.push('pageName=' + encodeURIComponent(pageName));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.pl.length == 0) {
				alert("Patient Not Found");
			} else {
				var myArray = JSON.parse(ajaxResponse);
				var myObj = myArray.pl[0];
				var myObj1 = JSON.stringify(myObj);
				$("#divPatId").html(myObj1);
			}
		}
	});
*/}

function deleteOperationForOT(opId, treatId) {
	
	var r = confirm("Are you want to delete operation");
	if (r == true) {
		var inputs = [];
		inputs.push('opId=' + encodeURIComponent(opId));
		inputs.push('treatId=' + encodeURIComponent(treatId));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url  : "ehat/otdata/deleteOperation",
			//url : "OperationServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert("Network Issue");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

/** ********function not required***************** */

function findDocName() {

	var opObj = $("#divPatId").html();

	myArray = JSON.parse(opObj);

	var opid = myArray.obTO.id;

	var inputs = [];
	inputs.push('action=getDocName');
	inputs.push('opid=' + encodeURIComponent(opid));
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			sampleBean = eval('(' + ajaxResponse + ')');

			for ( var i = 0; i < sampleBean.dnl.length; i++) {

				var appendValue = sampleBean.dnl[i] + "\n";
				// alert(appendValue);
				var o = new Option("option text", "value");

				var val = $(o).html(appendValue);

				$("#txtDocName").append(o);

			}
		}
	});

}

/** ****************function not required************************ */

// Function to get Operation type for operation.jsp
function setOperationType() {

	var editOP = $("#editOP").val();
	if (editOP == 1) {

		var opObj = $("#divPatId").html();

		myArray = JSON.parse(opObj);

		var opid = myArray.obTO.oi;

		var inputs = [];
		inputs.push('action=getOperationName');
		inputs.push('opid=' + opid);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "OperationServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				sampleBean = eval('(' + ajaxResponse + ')');

				var oType = sampleBean.ol[0].oi;

				$("#OperationType").setTemplate(operationTypeTemp);
				$("#OperationType").processTemplate(sampleBean);
				$("#oType").val(oType);
			}
		});

	} else {

		var inputs = [];
		inputs.push('action=getOperationType');

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "OperationServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				sampleBean = eval('(' + ajaxResponse + ')');
				$("#OperationType").setTemplate(operationTypeTemp);
				$("#OperationType").processTemplate(sampleBean);
			}
		});

	}

}

var Response = "";

var y = 0;
// Function to check equipment available quantity
function checkMaterialQty(rowCount, page) {

	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();

	var count = rowCount - addrowCount;
	var ReadStvalue;

	ReadStvalue = addrowCount;
	var eqp = "";
	var qt = "";
	var i;
	var flag = 0;
	var addqty = 0;
	if (page == "material") {

		eqp = $("#mt" + rowCount + "").val();
		qt = $("#qty" + rowCount + "").val();
		if (qt == "") {

		} else {

			qt = eval('(' + qt + ')');
			for (i = 1; i < ReadStvalue; i++) {
				count++;
				var mt = $("#mt" + count + "").val();
				var qty = $("#qty" + count + "").val();

				if (mt == eqp) {
					addqty = parseInt(addqty, 10) + parseInt(qty, 10);
					qt = parseInt(qt, 10) + parseInt(qty, 10);
					// alert(qt);
					flag = 1;
				}
			}
		}
	}
	if (!(qt == " " || qt == "")) {

		var inputs = [];
		inputs.push('action=checkQty');
		inputs.push('eq=' + eqp);
		inputs.push('qty=' + qt);
		inputs.push('page=' + encodeURIComponent(page));
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "OperationServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {

					},
					success : function(r) {
						Response = r;
						sBean = eval('(' + Response + ')');
						// alert(sBean.fl);
						if (sBean.fl == "1") {
							y = 1;
							return true;
						} else if (sBean.fl == "0") {
							alert("Oops some problem occured ...");
							y = 0;
							return false;
						} else if (sBean.fl == "3") {
							if (flag == 1) {
								var tqty = sBean.laq - parseInt(addqty, 10);
								alert("The material quantity you want to use is not available in Lab...Available quantity is "
										+ tqty + "");
								y = 2;

								$("#qty" + rowCount + "").val("");
								return false;
							} else {
								alert("The material quantity you want to use is not available in Lab...Available quantity is "
										+ sBean.laq + "");
								y = 2;

								$("#qty" + rowCount + "").val("");
								return false;
							}

						}

					}
				});
	} else {

	}
}

// get item price
function getPrice(item_name, item_price) {
	item_name = $("#" + item_name).val();
	var inputs = [];
	inputs.push('action=FetchIPrice');
	inputs.push('item_name=' + encodeURIComponent(item_name));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			sBean = eval('(' + ajaxResponse + ')');

			$("#Rate").val(sBean.op);

		}
	});

}
// Function to add equipment into textarea and check equipment available
// quantity
function addThemOperation(addValue, rowcount) {
	if (addValue == "eqp") {
		var eq = $("#txtEqName" + rowcount).val();
		var qty = $("#txtEqQty" + rowcount).val();
		if (qty == 0) {
			alert("Please Enter Valid Quantity");
			return false;
		}
		// var a = $("#txtEqName").val();
		// alert("11"+eq+qty+"00")
		if (eq == "" && qty == "") {
			alert("Please enter Equipment and quantity.");
			return false;
		} else if (eq !== "" && qty == "") {
			alert("Please enter  quantity.");
			return false;
		} else {
			var inputs = [];

			inputs.push('action=checkQty');
			inputs.push('eq=' + encodeURIComponent(eq));
			inputs.push('qty=' + qty);
			inputs.push('page=' + 'operation');

			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "OperationServlet",
						timeout : 1000 * 60 * 5,
						cache : false,
						error : function() {

						},
						success : function(r) {
							ajaxResponse = r;
							// alert(r);
							sBean = eval('(' + ajaxResponse + ')');
							// alert(sBean.fl);
							if (sBean.fl == "1") {

								var add = eq + "-" + qty + '\n';
								// $("#txtEquipmet").val($("#txtEquipmet").val()
								// + add);
								var flag1 = 0;

								$('#txtEquipmet' + rowcount)
										.find('option')
										.each(
												function() {
													var eqpt = $(this).html()
															.split("-");
													// alert(eqpt[0]);
													if (eqpt[0] == eq) {
														var qty1 = parseInt(eqpt[1])
																+ parseInt(qty);
														var add = eqpt[0] + "-"
																+ qty1 + '\n';
														$(this).html(add)
														$(
																"#txtEqName"
																		+ rowcount)
																.val("");
														$(
																"#txtEqQty"
																		+ rowcount)
																.val("");
														// alert("Equipment is
														// present
														// in list");
														flag1 = 1;
													}
												});

								if (flag1 == 0) {
									var o = new Option("option text", "value");
									$(o).html(add);
									$("#txtEquipmet" + rowcount).append(o);

									$("#txtEqName" + rowcount).val("");
									$("#txtEqQty" + rowcount).val("");
									return true;
								}

							} else if (sBean.fl == "0") {
								alert("Oops some problem occured ...");
								return false;
							} else if (sBean.fl == "3") {
								alert("The material quantity you want to use is not available in Lab...Available quantity is "
										+ sBean.laq + "");
								$("#txtEqQty" + rowcount).val();
								return false;
							}
						}
					});

		}
	} else {
		if (rowcount == undefined) {
			var docid = $("#selPerBy").val();
			var docName = $("#selPerBy option:selected").text();
			// alert(docName);
			if (docid == "select") {
				alert("Please Select Doctor.");
				return false;
			}
			var add = docName + '\n';
			var doctorid = docid + '\n';

			var flag = 0;
			$('#txtDocName').find('option').each(function() {
				if ($(this).html() == add) {
					alert("Doctor Is Present In List");
					flag = 1;
				}
			});
			if (flag == 0) {
				var o = new Option("option text", "value");
				// / jquerify the DOM object 'o' so we can use the html method
				$(o).html(add);
				$(o).val(doctorid);
				// $(0).val();
				$("#txtDocName").append(o);

			}
		} else {
			var docid = $("#selPerBy" + rowcount).val();
			var docName = $("#selPerBy" + rowcount + " option:selected").text();
			// alert(docName);
			if (docid == "select") {
				alert("Please Select Doctor.");
				return false;
			}
			var add = docName + '\n';
			var doctorid = docid + '\n';

			var flag = 0;
			$('#txtDocName' + rowcount).find('option').each(function() {
				if ($(this).html() == add) {
					alert("Doctor Is Present In List");
					flag = 1;
				}
			});
			if (flag == 0) {
				var o = new Option("option text", "value");
				// / jquerify the DOM object 'o' so we can use the html method
				$(o).html(add);
				$(o).val(doctorid);
				// $(0).val();
				$("#txtDocName" + rowcount).append(o);

			}
		}
	}
}

function addAsstSurgeonName(rowcount) {
	if (rowcount == undefined) {
		var docid = $("#selAsstSurgeon").val();
		var docName = $("#selAsstSurgeon option:selected").text();
		// alert(docName);
		if (docid == "select") {
			alert("Please Select Doctor.");
			return false;
		}
		var add = docName + '\n';
		var doctorid = docid + '\n';

		var flag = 0;
		$('#txtAssSurgeon').find('option').each(function() {
			if ($(this).html() == add) {
				alert("Doctor Is Present In List");
				flag = 1;
			}
		});
		if (flag == 0) {
			var o = new Option("option text", "value");
			// / jquerify the DOM object 'o' so we can use the html method
			$(o).html(add);
			$(o).val(doctorid);
			// $(0).val();
			$("#txtAssSurgeon").append(o);

		}
	} else {
		var docid = $("#selAsstSurgeon" + rowcount).val();
		var docName = $("#selAsstSurgeon" + rowcount + " option:selected")
				.text();
		// alert(docName);
		if (docid == "select") {
			alert("Please Select Doctor.");
			return false;
		}
		var add = docName + '\n';
		var doctorid = docid + '\n';

		var flag = 0;
		$('#txtAssSurgeon' + rowcount).find('option').each(function() {
			if ($(this).html() == add) {
				alert("Doctor Is Present In List");
				flag = 1;
			}
		});
		if (flag == 0) {
			var o = new Option("option text", "value");
			// / jquerify the DOM object 'o' so we can use the html method
			$(o).html(add);
			$(o).val(doctorid);
			// $(0).val();
			$("#txtAssSurgeon" + rowcount).append(o);

		}
	}
}
function validateqty() {
	var str = $("#txtEqNamec1").val();
	// alert(str);
	var newstr = str.split('_');
	var qty = newstr[2];
	var givenqty = $("#txtEqQtyc1").val();
	if (givenqty > qty) {
		alert("Provided quantity should not be gretaer than avialable quantity");
		return false;
	} else {
		return true;
	}
}
function addIpdServicesName(type, rowcount) {
	var docid = $("#txtEqName" + type + rowcount).val();
	// alert(docid);
	var eqpQty = $("#txtEqQty" + type + rowcount).val();
	if (eqpQty == 0) {
		alert("Please Enter Valid Quantity");
		return false;
	}
	// alert(docName);
	if (docid == "") {
		alert("Please Select Service.");
		return false;
	} else if (eqpQty == "") {
		alert("Please Enter Quantity");
		return false;
	}
	var docname;
	var doctorid;
	var strdocid = docid.split("_");
	if (type == 'c') {
		var qtyArr = strdocid[1].split("@");
		var slvid = strdocid[2];
		// alert(slvid);
		if (parseInt(eqpQty) > parseInt(qtyArr[1])) {
			alert("Provided quantity(" + eqpQty
					+ ") is greater than available quantity(" + qtyArr[1] + ")");
			// $("#txtEqName" + type + rowcount).val("");
			$("#txtEqQty" + type + rowcount).focus();
			return false;
		} else {
			docname = strdocid[0] + "-" + eqpQty + '\n';
			doctorid = qtyArr[0] + "-" + eqpQty + "_0" + "_" + slvid + '\n';
			// alert(doctorid);
			var o = new Option("option text", "value");
			// / jquerify the DOM object 'o' so we can use the html method
			$(o).html(docname);
			$(o).val(doctorid);
			// $(0).val();
			$("#txtEquipmet" + type + rowcount).append(o);

			$("#txtEqName" + type + rowcount).val("");
			$("#txtEqQty" + type + rowcount).val("");
		}
	} else {
		docname = strdocid[0] + "-" + eqpQty + '\n';
//old	//	doctorid = strdocid[1] + "-" + eqpQty + "_0" + '\n';

		var o = new Option("option text", "value");
//new		
		var servid= $("#txtseridb1").val();
//old
		//	doctorid = servid + "-" + eqpQty + "_0" + '\n';
//new		
		doctorid = servid + "-" + eqpQty +"@"+0 + "_0" + '\n';
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(docname);
		$(o).val(doctorid);
		// $(0).val();
		$("#txtEquipmet" + type + rowcount).append(o);
		//$("#txtserid" + type + rowcount).append(o);
		$("#txtEqName" + type + rowcount).val("");
		$("#txtEqQty" + type + rowcount).val("");
	}

}

function removeIpdServicesName(type, rowcount) {

	var temp = "";
	$('#txtEquipmet' + type + rowcount).find('option:selected').each(
			function() {
				temp = temp + $(this).val();
			});
	delSer.push(temp);
	$('#txtEquipmet' + type + rowcount + ' option:selected').remove();

}

function removeAsstSurgeon(rowCount) {
	if (rowCount == undefined) {
		$('#txtAssSurgeon option:selected').remove();
	} else {
		$('#txtAssSurgeon' + rowCount + ' option:selected').remove();
	}
}

function RemoveThemOperation(eleName, rowCount) {
	if (eleName == "txtDocName") {

		var tropid = $("#tropid").val();
		if (tropid != "" && tropid != undefined) {

			var docName = "";
			$('#txtDocName' + rowCount).find('option:selected').each(
					function() {
						docName = docName + $(this).val();
					});
			var docId = "";
			var docArr = [];
			docArr = docName.split("\n");
			for ( var i = 0; i < docArr.length; i++) {
				docId = docId + docArr[i] + ",";
			}

			var inputs = [];
			inputs.push('action=changeNaForOperation');
			inputs.push('tropid=' + tropid);
			inputs.push('docId=' + docId);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "OperationServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
					ajaxResponse = r;

				}
			});
		}
		if (rowCount == undefined) {
			$('#txtDocName option:selected').remove();
		} else {
			$('#txtDocName' + rowCount + ' option:selected').remove();
		}
	} else {
		$('#txtEquipmet' + rowCount + ' option:selected').remove();

	}

}
// Function to save operation details.

function saveCAReport() {

	var queryType = $("#queryType").val();
	var regCathId = $("#regCathId").val();
	var cathno = $("#cathno").val();
	var date = $("#date").val();
	var angtext = $("#angtext").val();
	angtext = angtext.split("%").join("**");
	var lfMain = $("#lfMain").val();
	lfMain = lfMain.split("%").join("**");
	var lfAntDesc = $("#lfAntDesc").val();
	lfAntDesc = lfAntDesc.split("%").join("**");
	var lfCirfx = $("#lfCirfx").val();
	lfCirfx = lfCirfx.split("%").join("**");
	var rtCorAngio = $("#rtCorAngio").val();
	rtCorAngio = rtCorAngio.split("%").join("**");
	var impression = $("#impression").val();
	impression = impression.split("%").join("**");
	var reccommendation = $("#reccommendation").val();
	reccommendation = reccommendation.split("%").join("**");
	if (date == "" && lfMain == "" && lfAntDesc == "" && lfCirfx == ""
			&& rtCorAngio == "" && impression == "" && reccommendation == "") {

		alert("Please Fill The Report First...");
		return false;

	} else if (date == "" || date == null) {

		alert("Date is Compulsary");
		return false;

	}
	var inputs = [];

	inputs.push('action=saveCAReport');
	inputs.push('queryType=' + queryType);
	inputs.push('regCathId=' + regCathId);
	inputs.push('cathno=' + cathno);
	inputs.push('date=' + date);
	inputs.push('angtext=' + encodeURIComponent(angtext));
	inputs.push('lfMain=' + encodeURIComponent(lfMain));
	inputs.push('lfAntDesc=' + encodeURIComponent(lfAntDesc));
	inputs.push('lfCirfx=' + encodeURIComponent(lfCirfx));
	inputs.push('rtCorAngio=' + encodeURIComponent(rtCorAngio));
	inputs.push('impression=' + encodeURIComponent(impression));
	inputs.push('reccommendation=' + encodeURIComponent(reccommendation));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	if (queryType == "update") {
		inputs.push('caid=' + $("#cid").val());

	}
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location = "preAngiographyDashboard.jsp";
		}
	});
}

function saveAngioplastyReport() {

	var queryType = $("#queryType").val();
	var cathno = $("#cathno").val();
	var rCathno = $("#Rcathno").val();
	var date = $("#date").val();
	var description = $("#description").val();
	var impression = $("#impression").val();
	impression = impression.split("%").join("**");
	description = description.split("%").join("**");

	if (rCathno == "") {
		alert("Register Cath Number Must Be Filled Out");
		return false;
	} else if (date == "" || date == null) {
		alert("Date Must Be Filled Out");
		return false;
	} else if (description == "") {
		alert("Description Must Be Filled Out");
		return false;
	}

	var inputs = [];

	inputs.push('action=saveAngioplastyReport');
	inputs.push('queryType=' + queryType);
	inputs.push('cathno=' + cathno);
	inputs.push('rCathno=' + rCathno);
	inputs.push('date=' + date);
	inputs.push('description=' + encodeURIComponent(description));
	inputs.push('impression=' + encodeURIComponent(impression));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	if (queryType == "update") {
		inputs.push('agpID=' + $("#agpID").val());
	}

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location = "PreAngioplastyDashboard.jsp";
		}
	});
}

function editToCAReport() {
	// alert("Hi");
	var pobj = $("#divPatId").html();
	myArray = JSON.parse(pobj);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	window.location.href = "CoronaryAngiographyReport.jsp?" + "myObj="
			+ encodeURIComponent(myObj);
}

function SaveOperationDetailsFromModal() {

	// var doctorId = $("#itemid").val();
	var treatmentId = $("#trid").val();
	// alert(treatmentId);
	var myObj = $("#divPatId").html();
	myObj = JSON.parse(myObj);
	var pid = myObj.pi;
	var centerPatientId = myObj.centerPatientId;
	alert(centerPatientId);
	var ipdBillId = $("#ipdBillId").val();
	var todays_date = $("#txtdate").val();
	var selOTtype = $("#selOTtype").val();
	var department = $("#department").val();
	// var selOTName = $("#selOTName").val();

	var scheduledProcedure = "0";// =$("#scheduledProcedure").val();
	var y = document.getElementById("scheduledProcedure");
	for ( var j = 0; j < y.options.length; j++) {
		scheduledProcedure = scheduledProcedure + "#" + y.options[j].value
				+ "@" + y.options[j].text;
	}

	var teamNameList = $("#teanNameList").val();
	var x = document.getElementById("teamMembersList");

	var anechargetype = $("#txtchargetype1").val();
	var surInstrument = $("#surInstrument1").val();

	// var anacount = 0;
	if (scheduledProcedure == "0") {
		alert("Please select Procedure to Schedule");
		return false;
	} else if (teamMemberCount == 0) {
		alert("Please Select Doctor Team.");
		return false;
	} else if (count == 0) {
		alert("Please add atleast one Anesthetist in Scheduled Doctors Team");
		return false;
	}
	/*
	 * else if(teamMemberCount != 0) { for ( var i = 1; i <= teamMemberCount;
	 * i++) { var myobj = objTreatmentOperation.toli[0].liOpDoc[i];
	 * if(myobj.doctp == "anesthetist"){ anacount++; } } if(anacount == 0){
	 * alert("Please add atleast One Anesthetist in Doctor Team."); return
	 * false; }else{ alert("Contains "+anacount+" no of Anesthetist"); return
	 * false; } }
	 */

	var department = $("#department").val();
	var otName = $("#selOTName").val();

	var eleArrBedSide = "";
	$('#txtEquipmetb1').find('option').each(function() {
		eleArrBedSide = eleArrBedSide + $(this).val();
	});

	var eleArrGas = "";
	$('#txtEquipmetg1').find('option').each(function() {
		eleArrGas = eleArrGas + $(this).val();
	});

	var eleArrInstrument = "";
	$('#txtEquipmeti1').find('option').each(function() {
		eleArrInstrument = eleArrInstrument + $(this).val();
	});

	var eleArrPre = "";
	$('#txtEquipmetc1').find('option').each(function() {
		eleArrPre = eleArrPre + $(this).val();
	});
	// alert(eleArrPre);
	// validation
	var otName = $("#otName").val();
	// alert(otName);

	if (surInstrument == "") {
		alert("Please enter surgeon instrument charges in % ");
		$("#surInstrument1").focus();
		return false;
	} else if (otName == 0 || otName == 'SELECT') {
		alert("Please select OT name");
		$("#otName").focus();
		return false;
	} else if (todays_date == "") {
		alert("Please select OT schedule date");
		$("#txtdate").focus();
		return false;
	}

	var tropid = $("#tropid").val();
	var tropmanageid = $("#tropmanageid").val();
	var objTreatmentOperation = {
		toli : []
	};

	objTreatmentOperation.toli.push({
		otid : otName,
		ti : treatmentId,
		pid : pid,
		dt : todays_date,
		otp : selOTtype,
		dpt : department,
		// oi :selOTName,
		schPro : scheduledProcedure,
		teamId : teamNameList,
		act : anechargetype,
		surinstr : surInstrument,
		liOpDoc : [],
		id : tropid,
		tomid : tropmanageid,
		"eu" : eleArrPre,
		"bedside" : eleArrBedSide,
		"gas" : eleArrGas,
		"instrument" : eleArrInstrument
	});

	var queryType = $("#queryType").val();
	var teamMemberCount = $("#teamMemberCount").val();
	var count = 0;
	for ( var i = 1; i <= teamMemberCount; i++) {
		// alert(x.options[i].value);
		var docId = $("#idUser" + i).text();// alert(docId);
		var docNameT = $("#docNameT" + i).text();
		var doctp = $("#docTypeT" + i).text();
		var surgeontp = $("#doctorType" + i).text();
		if (doctp == "anesthetist") {
			count++;
		}
		if (docId != null && docId != "" && docId != undefined) {
			objTreatmentOperation.toli[0].liOpDoc.push({
				"idopDoc" : docId,
				"docName" : docNameT,
				"doctp" : doctp,
				"surgtp" : surgeontp
			});
		}
	}
	objTreatmentOperation = JSON.stringify(objTreatmentOperation);

	var inputs = [];
	inputs.push('action=SaveOperationDetailsFromModal');
	inputs.push('objTreatmentOperation='
			+ encodeURIComponent(objTreatmentOperation));
	inputs.push('queryType=' + encodeURIComponent(queryType));
	inputs.push('ipdBillId=' + ipdBillId);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			location.reload(this);
		}
	});
}

function ProcessInvItemsfromOTManage() {
	var r = confirm("Are You Confirm To Process data");
	
	var pid = $("#pid").val();
	var topId = $("#topId").val();
	var tomId = $("#tomId").val();
	var operationDate = $("#operationDate").val();
	
	if (r == true) {
		var operationId = $("#txtCathNo1").val();
		if (operationId == "") {
			operationId = 0;
		}
		
		var trid = $("#trid").val();
		var eleArrPre = "";
		$('#txtEquipmetc1').find('option').each(function() {
			eleArrPre = eleArrPre + $(this).val();
		});
		// alert(eleArrPre);
		if (eleArrPre == "") {
			alert("Please select surgery Consumable to post");
			$('#txtEquipmetc1').focus();
			return false;
		}
		// alert(eleArrPre);
		var treatmentoperation = {
			toli : []
		};
		treatmentoperation.toli.push({
			"tomid" : operationId,
			"eu" : eleArrPre
		});

		treatmentoperation = JSON.stringify(treatmentoperation);

		var inputs = [];
		inputs.push('action=ProcessInvItemsfromOTManage');
		inputs.push('treatmentoperation='
				+ encodeURIComponent(treatmentoperation));
		inputs.push('treatmentoperationid=' + $("#treatmentoperationid").val());
		inputs.push('Tid=' + trid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "OperationServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				window.location.href = "operation.jsp?" + "type=manage&treatmentId="
										+ trid + "&tomId=" + tomId + "&topId=" + topId + "&pid=" + pid
										+ "&operationDate=" + operationDate;
			}
		});
	}
}

function SaveOperationDetails(){
	if ($("#popup_container2").val() == "") {
		alert("Please Select Operation Date.");
		return false;
	} else if ($("#txtStartTime").val() == "") {
		alert("Please Select Operation Start Time.");
		return false;
	} else if ($("#txtEndTime").val() == "") {
		alert("Please Select Operation End Time.");
		return false;
	}

	var treatmentoperation = {
		toli : []
	};

	var myObj = $("#divPatId").html();
	var trid = 0;

	if(myObj==null || myObj=="" || myObj==undefined ){
		trid=$("#tr_Id").val();
	}else{
		myObj = JSON.parse(myObj);
		trid = myObj.trid;

	}
	
	
	var scheduledProcedure = "0";
	var y = document.getElementById("scheduledProcedure");
	for ( var j = 0; j < y.options.length; j++) {
		scheduledProcedure = scheduledProcedure + "#" + y.options[j].value
				+ "@" + y.options[j].text;
	}

	var infectionFlag;
	if ($('#infectFlag').is(":checked")) {
		infectionFlag = 'Y';
	} else {
		infectionFlag = 'N';
	}
	var criticalFlag;
	if ($('#criticalFlag').is(":checked")) {
		criticalFlag = 'Y';
	} else {
		criticalFlag = 'N';
	}

	var x = 1;
	var z = 0;
	var OperationCharge;
	if ($('#opCharge' + x).is(":checked")) {
		OperationCharge = '1';
	} else {
		OperationCharge = '0';
	}

	var operationId = $("#txtCathNo" + x).val();
	
	if (operationId == "") {
		operationId = 0;
	}
	var route = $("#txtRoute" + x).val();
	var surInstrument = $("#surInstrument" + x).val();
	if (surInstrument == "") {
		surInstrument = 0;
	}
	var ohr = $("#ohr" + x).val();
	var chr = $("#chr" + x).val();
	var obp = $("#obp" + x).val();
	var cbp = $("#cbp" + x).val();

	var otName = $("#otName").val();
	var department1 = $("#departmentOT").val();
	// var date = $("#popup_container2").val();
	// var txtStartTime = $("#txtStartTime").val();
	// var txtEndTime = $("#txtEndTime").val();

	var teamId = $("#teanNameList").val();
	var anesthesiaType = $("#anesthesiaType").val();

	var operationNote = $("#txtFindings" + x).val();
	var aneNote = $("#txtComment" + x).val();
	var anechargetype = $("#txtchargetype" + x).val();

	// for services
	var department = $("#department" + x).val();
	var opgrade = $("#opgrade").val();
	var operationName = $("#selOTName" + x).val();

	var eleArrBedSide = "";
	$('#txtEquipmetb' + x).find('option').each(function() {
		eleArrBedSide = eleArrBedSide + $(this).val();
	});
	var eleArrGas = "";
	$('#txtEquipmetg' + x).find('option').each(function() {
		eleArrGas = eleArrGas + $(this).val();
	});

	var eleArrInstrument = "";
	$('#txtEquipmeti' + x).find('option').each(function() {
		eleArrInstrument = eleArrInstrument + $(this).val();
	});

	var eleArrPre = "";
	$('#txtEquipmetc' + x).find('option').each(function() {
		eleArrPre = eleArrPre + $(this).val();
	});
	// alert(eleArrPre);
	if (eleArrPre != "") {
		alert("Please post surgery consumable first");
		$('#txtEquipmetc' + x).focus();
		return false;
	}
	// end services
	treatmentoperation.toli.push({
		"schPro" : scheduledProcedure,
		"infFlg" : infectionFlag,
		"ctrFlg" : criticalFlag,
		"operationCharge" : OperationCharge,
		"tomid" : operationId,
		"rt" : route,
		"surinstr" : surInstrument,
		"oh" : ohr,
		"ch" : chr,
		"ob" : obp,
		"cb" : cbp,
		"otid" : otName,
		"teamId" : teamId,
		"anesType" : anesthesiaType,
		"liOpDoc" : [],
		"fnd" : operationNote,
		"cm" : aneNote,
		"act" : anechargetype,
		"eu" : eleArrPre,
		"bedside" : eleArrBedSide,
		"gas" : eleArrGas,
		"instrument" : eleArrInstrument,
		"dpt" : department1

	});

	var teamList = document.getElementById("teamMembersList");
	var teamMemberCount = $("#teamMemberCount").val();
	var count = 0;
	for ( var i = 1; i <= teamMemberCount; i++) {
		// alert(x.options[i].value);
		var docId = $("#idUser" + i).val();// alert(docId);
		var docNameT = $("#docNameT" + i).text();
		var usertype = $("#userType" + i).text();
		var surgeontype = $("#docTypeT" + i).text();
		if (surgeontype == "anesthetist" || surgeontype == "anaesthesiologist1"
				|| surgeontype == "anaesthesiologist2"
				|| surgeontype == "anaesthesiologist3") {
			count++;
		}
		if (docId != null && docId != "" && docId != undefined) {
			treatmentoperation.toli[0].liOpDoc.push({
				"idopDoc" : docId,
				"docName" : docNameT,
				"doctp" : usertype,
				"surgtp" : surgeontype
			});
		}
	}

	if (scheduledProcedure == "0") {
		alert("Please select Procedure to Schedule");
		return false;
	} else if (teamMemberCount == 0) {
		alert("Please Select Doctor Team.");
		return false;
	} else if (count == 0) {
		alert("Please add atleast one Anesthetist in Scheduled Doctors Team");
		return false;
	} /*
		 * else if(count > 1){ alert("Please add only one Anesthetist in
		 * Scheduled Doctors Team"); return false; }
		 */

	// x++;
	var inputs = [];
	var bedstate;
	var bedstate = $("input[name='BedShift']:checked").val();
	var bedEditType = "sameBed";
	var hallType = 0;
	var hallID = 0;
	var bedNo = 0;
	var billableWardType = 0;
	var billableHallType = 0;
	var radBillableBed = "sameBed";
	var isolationFlag = 0;

	// alert(bedstate);
	if (bedstate == "sameBed") {
		bedEditType = "noChange";
		hallType = 0;
		hallID = 0;
		bedNo = 0;
		billableWardType = 0;
		billableHallType = 0;
		isolationFlag = 0;
		radBillableBed = "sameBed";
	} else {

		bedEditType = $('input[name=bedEditType]:checked').val();

		if (bedEditType == "" || bedEditType == null
				|| bedEditType == undefined) {
			alert("Please select Bed Edit Type.");
			return false;
		}

		hallType = $("#wardType").val();
		if (hallType == 0 || hallType == null || hallType == ""
				|| hallType == undefined) {
			alert("Please select Ward Name");
			return false;
		}

		hallID = $("#hallType").val();
		if (hallID == 0 || hallID == null || hallID == ""
				|| hallID == undefined) {
			alert("Please select Hall Name.");
			return false;
		}

		bedNo = $("#bedName").val();
		if (bedNo == 0 || bedNo == null || bedNo == "" || bedNo == undefined) {
			alert("Please select Bed No.");
			return false;
		}

		if ($("#radBillableBed3").prop("checked")) {
			var billableWardType = $("#billableWardType").val();
			var billableHallType = $("#billableHallType").val();
			radBillableBed = $("input[name='radBillableBed']:checked").val();
			if (billableWardType == 0) {
				alert("Please select Billable Ward Name.");
				return false;
			}
			if (billableHallType == 0) {
				alert("Please select Billable Hall Name.");
				return false;
			}
		} else {
			billableWardType = 0;
			billableHallType = 0;
			radBillableBed = "sameBed";
		}

		var isolation = $("input[name='isolation']:checked").val();
		if (isolation == "isolation") {
			isolationFlag = 1;
		} else {
			isolationFlag = 0;
		}
	}
	if(opgrade=="" || opgrade==null || opgrade==undefined){
		opgrade=0;
	}
	var countshedule = $("#countshedule").val();//added by paras
	var inserv = $("#inserv").val();//added by paras
	
	var remark = $("#remark").val();
	var precaution = $("#precaution").val();
	var indicationForSurgery = $("#indicationForSurgery").val();
	var surgeryDescription = $("#surgeryDescription").val();
    var sucess="N";  
    var anetheiaid="";
    var txtchargetype1=$("#txtchargetype1").val();
    if(txtchargetype1=="ASAIV"){
    	anetheiaid=$("#AnethesiaAIV").val();
    }else if(txtchargetype1=="Normal"){
    	anetheiaid=$("#Anethesia").val();
    }else {
    	anetheiaid=$("#AnethesiaSATNDBY").val();
    }
	treatmentoperation = JSON.stringify(treatmentoperation);
	//inputs.push('action=SaveOperationDetails');
	inputs.push('treatmentoperation=' + encodeURIComponent(treatmentoperation));
	inputs.push('treatmentoperationid=' + $("#treatmentoperationid").val());
	inputs.push('Tid=' + trid);
	inputs.push('date=' + $("#popup_container2").val());
	inputs.push('startTime=' + $("#txtStartTime").val());
	inputs.push('endTime=' + $("#txtEndTime").val());
	inputs.push('criticalFlag=' + criticalFlag);
	inputs.push('otName=' + $("#otName").val());
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('infectionFlag=' + infectionFlag);
	inputs.push('bedstate=' + bedstate);
	inputs.push('hallType=' + hallType);
	inputs.push('hallID=' + hallID);
	inputs.push('bedNo=' + bedNo);
	inputs.push('bedEditType=' + bedEditType);
	inputs.push('radBillableBed=' + radBillableBed);
	inputs.push('billableWardType=' + billableWardType);
	inputs.push('billableHallType=' + billableHallType);
	inputs.push('isolation=' + isolationFlag);
	inputs.push('remark=' + remark);
	inputs.push('precaution=' + precaution);
	inputs.push('indicationForSurgery=' + indicationForSurgery);
	inputs.push('surgeryDescription=' + surgeryDescription);
	inputs.push('opgrade=' + opgrade);
//alert(updateop);
	inputs.push('updateop=' + updateop);//added by paras
	inputs.push('deleteop=' + deleteop);//added by paras
	inputs.push('countshedule=' + countshedule);//added by paras
	inputs.push('inserv=' + inserv);//added by paras
	inputs.push('querytype=' + "OT");

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		//url : "OperationServlet",
		  url : "ehat/otdata/SaveOperationDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			//window.location = "OperationDashboard.jsp";
			///hallwiseCHARGE('OT');
		//	hallwisechargeOTSurganwise('OT');
			setTimeout(function() {
			getchargesOfot($("#MainSurgan").val(),"M");
			getchargesOfot($("#AsistanSurgan").val(),"A");
			getchargesOfot(anetheiaid,"AN");
			getchargesOfot($("#PreAnethesia").val(),"PR");
			getchargesOfot($("#OTRent").val(),"OR");
			getchargesOfot($("#OTinstrument").val(),"OI");

			//alert("Save Successfully");
			saveSurgoncharges(teamList,teamMemberCount,$("#treatmentoperationid").val());
			sucess="Y";
			}, 200); 
			setTimeout(function() {	
			if(sucess="Y"){
			//location.reload(); 
			}
			}, 200); 

		}
	});	
}

function showBedShiftPopup() {
	var r = confirm("Do you want to Shift Patient to another Bed");
	if (r == true) {
		//$("#bedChangeShiftPopup").modal('show');
		var treatmentId = $("#treatmentId").text();
		window.open("ipd_bed_allocation.jsp?treatId="+treatmentId+"&callFrom='shiftBed' ");
		 
	} else {
		$("#newBed").prop('checked', false);
		$("#sameBed").prop('checked', true);
	}
}

function closeBedShiftPopup() {
	$("#bedChangeShiftPopup").modal('hide');
	$("#newBed").prop('checked', false);
	$("#sameBed").prop('checked', true);
}

function setCApatInfo() {

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');

	$("#CAPAtContent").setTemplate(CAPatInfoTemp);
	$("#CAPAtContent").processTemplate(pobj1);

}

function setCApatInfoforEdit() {
	var pobj = $("#divPatId").html();
	// pobj1=decodeURIComponent(pobj);

	var obj = pobj.split("&amp;");
	obj = obj.join("&");
	obj = obj.split("**");
	obj = obj.join("%");
	pobj1 = eval('(' + obj + ')');

	$("#CAPAtContent").setTemplate($("#CAPAtContent").html());
	$("#CAPAtContent").processTemplate(pobj1);

}

function setAngioplastyInfoEdit() {

	// for edit
	var pobj = $("#divPatId").html();
	var obj = pobj.split("&amp;");
	obj = obj.join("&");
	obj = obj.split("**");
	obj = obj.join("%");
	pobj1 = eval('(' + obj + ')');

	$("#AngioContent").setTemplate(editAngioContent);
	$("#AngioContent").processTemplate(pobj1);

}

function setAngioplastyInfo() {
	// for add
	// alert("setAngioplastyInfoAdd");
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');

	$("#CAPAtContent").setTemplate(AngioplastyInfoTemp);
	$("#CAPAtContent").processTemplate(pobj1);

}
function setCApatInfoforAdd() {
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');

	$("#AngioContent").setTemplate($("#CAPAtContent").html());
	$("#AngioContent").processTemplate(pobj1);

}

function passOperation(pid, id) {
	ajaxResponse = $("#opObject").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid && myArray.pl[i].listTop[0].id == id) {
			myObj = myArray.pl[i];
			break;
		}
		// setOperationDetails();
	}
	var trid = myObj.trid;
	var operationDate = myObj.listTop[0].dt;
	var tomid = myObj.listTop[0].tomid;
	var anechargetype = myObj.listTop[0].act;
	//myObj = JSON.stringify(myObj);
	operationobj = myObj;//eval('(' + myObj + ')');
	if (operationobj.listTop[0].opobj.oty == "Surgery") {
		window.location.href = "surgery.jsp?" + "myObj="
				+ myObj;
	} else {
		
	//old	
		/*window.location.href = "operation.jsp?" + "type=manage&treatmentId="
				+ trid + "&tomId=" + tomid + "&topId=" + id + "&pid=" + pid
				+ "&operationDate=" + operationDate;*/
	
	//new added by paras	
		
	/*	window.location.href = "operation.jsp?" + "type=manage&treatmentId="
		+ trid + "&tomId=" + tomid + "&topId=" + id + "&pid=" + pid
		+ "&operationDate=" + operationDate + "&myObj="
		+ myObj;*/
		
		if(anechargetype ==undefined || anechargetype == "undefined"){
			
			anechargetype = "Normal";
		}
				
		window.location.href = "operation.jsp?" + "type=manage&treatmentId="
		+ trid + "&tomId=" + tomid + "&topId=" + id + "&pid=" + pid
		+ "&operationDate=" + operationDate +"&txtchargetype1='"+anechargetype+"' ";
	}

}


function viewOperationDrugs(opid) {

	var opObj = $("#divPatId").html();
	// alert(opObj);

	myArray = JSON.parse(opObj);

	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].obTO.id == opid) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	// alert(myObj);
	window.location.href = "Drugs.jsp?" + "myObj=" + encodeURIComponent(myObj)
			+ "&editOP=" + 1;

}

function setDrugsTemp() {

}

function editCAReport(carID) {

	var pobj = $("#divPatId").html();
	myArray = JSON.parse(pobj);
	for ( var i = 0; i < myArray.cal.length; i++) {
		if (myArray.cal[i].ci == carID) {
			myObj = myArray.cal[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	// myArray1 = JSON.parse(userBean);

	window.location.href = "preAngiographyaReport.jsp?myObj="
			+ encodeURIComponent(myObj);

	// $("#CAContent").setTemplate(editCAContentTemp);
	// $("#CAContent").processTemplate(userBean);

}

function editAngiography(angid) {

	var pobj = $("#divPatId").html();
	myArray = JSON.parse(pobj);
	for ( var i = 0; i < myArray.al.length; i++) {
		if (myArray.al[i].aid == angid) {
			myObj = myArray.al[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	// myArray1 = JSON.parse(userBean);

	window.location.href = "PreAngioplastyReport.jsp?myObj="
			+ encodeURIComponent(myObj);

	// $("#CAContent").setTemplate(editCAContentTemp);
	// $("#CAContent").processTemplate(userBean);

}

function passOperationSummary(id) {

	var inputs = [];
	inputs.push('id=' + id);
	inputs.push('action=fetchOperationSummary');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse1 = r;
			// alert(ajaxResponse1);
			myArray = JSON.parse(ajaxResponse);
			for ( var i = 0; i < myArray.pl.length; i++) {
				if (myArray.pl[i].obTO.id == id) {
					myObj = myArray.pl[i];
					break;
				}
			}
			myObj = JSON.stringify(myObj);
			if (ajaxResponse1 == 1) {

				window.location.href = "Operation_Summary.jsp?" + "myObj="
						+ encodeURIComponent(myObj);
			} else {

				window.location.href = "Operation_Summary.jsp?" + "myObj="
						+ encodeURIComponent(myObj) + "&ajaxResponse1="
						+ ajaxResponse1;
			}

		}
	});

}

function operationPatientSearch(page_name) {
	count = 1;

	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var byTreatId = $("#byTreatId").val();
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
		} else {
			searchBy = "byTreatId";
			value = byTreatId;
		}

		var inputs = [];
		inputs.push('action=ShowIPDTopPat');
		inputs.push('searchBy=' + searchBy);
		inputs.push('value=' + value);
		inputs.push('showFun=showSearchPat');
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

					},
					success : function(r) {
						ajaxResponse = r;
						 
						pobj1 = eval('(' + ajaxResponse + ')');
						if (pobj1.pl.length == 0) {
							alert("Patient Not Found");
						} else {
							if (page_name == "OperationDashboard"
									|| page_name == "OperationDashboard") {
								$("#container").setTemplate(
										containerOPerationTemplate);
							} else if (page_name == "OperationSummaryDashboard") {
								$("#container").setTemplate(
										containerOPerationSummaryTemplate);
							}
							$("#container").processTemplate(pobj1);
						}
					}
				});
	}
};

function viewOPerationPatient(page_name) {
	otcount = 1;
	if (page_name == "Search") {
		var pageName = $("#pageName").val();
		var byName = $("#byName1").val();
		var byId = $("#centerPatientId").val();

		if (byName == "" && byId == "" && page_name == "Search") {
			alert("Please search either by patient Id or by Patient Name");
			return false;
		} else if (byName == "" && byId == "" && page_name == "Search") {
			alert("Please enter Patient Name or Patient Id for search");
			return false;
		}
		 if($('#radioEmergency').is(':checked')){
				
			 byName="";
			}
	
		if (byName != "") {
			searchBy = "byName";
			value = byName;
			
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
      if($('#radioEmergency').is(':checked')){
				
				value = value + "@" +"Y";
			}
		}

		var otDate;
		if (pageName == "OTDashboard" || pageName == "OTAnaesthetic") {
			otDate = $("#popup_container2").val();
		} else {
			otDate = $("#operationDate").val();// $("#idTourDateDetails").val();
		}

		var input = [];
		input.push('searchBy=' + encodeURIComponent(searchBy));
		input.push('value=' + encodeURIComponent(value));
		input.push('action=DisplayOperationPat');
		input.push('otDate=' + encodeURIComponent(otDate));

		input.push('page_name=' + encodeURIComponent(page_name));
		var str = input.join('&');

		jQuery
				.ajax({
					async : false,
					type : "GET",
					data : str + "&reqType=AJAX",
					//url : "OperationServlet",
					url : "./ehat/otdata/DisplayOperationPat",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert("Network Error");	
					},
					success : function(r) {
						ajaxResponse = r;
//						$("#opObject").html(ajaxResponse);
						$("#opObject").html(JSON.stringify(ajaxResponse));
						//alert(ajaxResponse);
						count = 1;
						//pobj1 = eval('(' + ajaxResponse + ')');
						pobj1 = r; // JSON.parse(ajaxResponse);
						if (pobj1.pl.length == 0) {
							if (page_name == "Search") {
								alert("Patient Details not found on this date.. Please select proper date");
								return false;
							} else {
								alert("Patient Details Not Found");
								return false;
							}
						} else if (page_name == "OperationDashboard") {
							$("#container").setTemplate(
									containerOPerationTemplate);
						} else if (page_name == "CSSDDashBoard") {
							$("#container").setTemplate(CSSDDashBoardTemplate);
						} else if (page_name == "Search") {
							$("#container").setTemplate(
									containerOPerationTemplate);
						} else if (page_name == "OTSchedule") {
							$("#container").setTemplate(OTScheduleTemp);
							$("#OTdata").val(ajaxResponse);
						}

						$("#container").processTemplate(pobj1);
						$("#byName1").val("");
						$("#centerPatientId").val("");
					}
				});

	} else if (page_name == "operation") {

		var searchBy = $("#topId").val();
		var value = $("#pid").val();
		var otDate = $("#operationDate").val();

		var input = [];
		input.push('searchBy=' + encodeURIComponent(searchBy));
		input.push('value=' + encodeURIComponent(value));
		input.push('action=DisplayOperationPat');
		input.push('otDate=' + encodeURIComponent(otDate));

		input.push('page_name=' + encodeURIComponent(page_name));
		var str = input.join('&');

		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "./ehat/otdata/DisplayOperationPat",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

				
			},
			success : function(r) {
				ajaxResponse = r;
				var myArray = r;//JSON.parse(ajaxResponse);
				var myObj = myArray.pl[0];
				var myObj1 = JSON.stringify(myObj);
				$("#divPatId").html(myObj1);
			}
		});
	} else {

		var pageName = $("#pageName").val();
		var otDate;
		if (pageName == "OTDashboard") {
			otDate = $("#popup_container2").val();
		} else {
			otDate = $("#idTourDateDetails").val();
		}

		var input = [];

		input.push('action=DisplayOperationPat');
		input.push('otDate=' + encodeURIComponent(otDate));

		input.push('page_name=' + encodeURIComponent(page_name));
		var str = input.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "./ehat/otdata/DisplayOperationPat",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				$("#opObject").html(JSON.stringify(ajaxResponse));
				pobj1 =  ajaxResponse ;
				if (page_name == "OperationDashboard") {
					$("#container").setTemplate(containerOPerationTemplate);
				} else if (page_name == "CSSDDashBoard") {
					$("#container").setTemplate(CSSDDashBoardTemplate);
				} else if (page_name == "Search") {
					$("#container").setTemplate(containerOPerationTemplate);
				} else if (page_name == "OTSchedule") {
					$("#container").setTemplate(OTScheduleTemp);
					$("#OTdata").val(JSON.stringify(ajaxResponse));
				}

				$("#container").processTemplate(pobj1);
			}
		});

	}

}

// var syrgicalkitTemp = "{#foreach $T.skmli as skmli}<div style='width: 100%;
// height: 28px; border-bottom: 1px solid #069;'><div style='width: 11.5%;
// height: 23px; text-align: center; border-right: 1px solid #069; padding-top:
// 5px;'>{count++}.</div><div style='width: 63%; height: 23px; border-right: 1px
// solid #069; padding-left: 1%; padding-top: 5px;'>{$T.skmli.knm} </div><div
// style='width: 20%; height: 25px; padding-top: 3px; text-align:
// center;'><input onclick='SterilizedKit({$T.skmli.idskm})' class='edit'
// type='button' value='Sterilized' /></div></div>{#/for}";
var syrgicalkitTemp = "{#foreach $T.skmli as skmli}<tr>	<td class='col-md-1-1 center'>{count++}.</td>	<td class='col-md-1-1 center'>{$T.skmli.knm}</td>	<td class='col-md-1-1 center'><input		onclick='SterilizedKit({$T.skmli.idskm})' class='edit' type='button'		value='Sterilized' /></td></tr>{#/for}";

function viewSurgicalKits() {
	var input = [];
	input.push('action=fetchkits');

	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(syrgicalkitTemp);
			$("#container").processTemplate(pobj1);
		}
	});
}

function SterilizedKit(kitID) {
	var input = [];
	input.push('action=sterilizedKit');
	input.push('kitid=' + encodeURIComponent(kitID));
	var str = input.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location.href = "CSSDDashboard.jsp";
		}
	});
}

// Function to get Cath Id
function setCathId() {
	// alert("dddddddddddddddd");

	var arrayOfAnestheticId = [];
	var editOP = $("#editOP").val();
	if (editOP == 1) {

		// fetchSurgicalKitNm('editoperation');
		var treamentOperationId = $("#treatmentoperationid").val();
		var pobj = $("#divPatId").html();

		operationmanageObj = eval('(' + pobj + ')');
		var operationobj;
		for ( var k = 0; k < operationmanageObj.listTop.length; k++) {

			if (treamentOperationId == operationmanageObj.listTop[k].id) {
				operationobj = operationmanageObj.listTop[k];
				break;
			}
		}

		$("#date-pick").val(operationobj.toli[0].dt);
		$("#txtStartTime").val(operationobj.toli[0].st);
		$("#txtEndTime").val(operationobj.toli[0].et);
		// $("#treatmentoperationid").val(operationobj.toli[0].id);
		$("#treatmentoperationid").val(operationmanageObj.listTop[k].id);
		fetchOperationTheaterNames(operationobj.toli[0].otid);

		if (operationobj.toli[0].emerFlg == "Y") {
			$("#emerFlag").attr("checked", "checked");
		} else {
			$("#emerFlag").removeAttr('checked', false);
		}

		if (operationobj.toli[0].infFlg == "Y") {
			$("#infectFlag").attr("checked", "checked");
		} else {
			$("#infectFlag").removeAttr('checked', false);
		}
		if (operationobj.toli[0].ctrFlg == "Y") {
			$("#criticalFlag").attr("checked", "checked");
		} else {
			$("#criticalFlag").removeAttr('checked', false);
		}
		for ( var i = 0; i < operationobj.toli.length; i++) {
			if (i != 0) {
				AddoperationDiv();
			}
		}
		setTimeout(

				function() {
					for ( var i = 0; i < operationobj.toli.length; i++) {
						/*
						 * if (i != 0) { AddoperationDiv(); }
						 */

						$("#manageid" + (i + 1))
								.val(operationobj.toli[i].tomid);

						if (operationobj.toli[i].operationCharge == "1") {
							$("#opCharge" + (i + 1)).attr("checked", true);
						} else {
							$("#opCharge" + (i + 1)).removeAttr('checked',
									false);
						}
						// alert("dddddddddddddddd");

						var oid = operationobj.toli[i].opobj.oi;
						var oty = operationobj.toli[i].opobj.oty;
						var ansid = operationobj.toli[i].anid;
						fetchAllAnesthesisOnload(i + 1, ansid);
						// alert(oty);
						$("#selOTtype" + (i + 1)).val(oty);
						$("#department" + (i + 1))
								.val(operationobj.toli[i].dpt);
						getOperationName(i + 1, oid);

						// $("#selOTName" + (i + 1)).val(oid);

						$("#sheet" + (i + 1)).val(operationobj.toli[i].srb);
						$("#txtStent" + (i + 1)).val(operationobj.toli[i].stnt);
						$("#txtRoute" + (i + 1)).val(operationobj.toli[i].rt);
						$("#txtchargetype" + (i + 1)).val(
								operationobj.toli[i].act);

						$("#txtFindings" + (i + 1)).val(
								operationobj.toli[i].fnd);
						$("#txtProvlon" + (i + 1))
								.val(operationobj.toli[i].prv);
						$("#txtComment" + (i + 1)).val(operationobj.toli[i].cm);
						$("#txtStatus" + (i + 1)).val(operationobj.toli[i].sts);
						$("#txtVeesal" + (i + 1)).val(operationobj.toli[i].vd);
						$("#surInstrument" + (i + 1)).val(
								operationobj.toli[i].surinstr);

						$("#ohr" + (i + 1)).val(operationobj.toli[i].oh);
						$("#chr" + (i + 1)).val(operationobj.toli[i].ch);
						$("#obp" + (i + 1)).val(operationobj.toli[i].ob);
						$("#cbp" + (i + 1)).val(operationobj.toli[i].cb);
						var eqpLi = operationobj.toli[i].eu;
						var eqpArr = [];
						eqpArr = eqpLi.split("\n");
						for ( var k = 0; k < eqpArr.length - 1; k++) {

							var appendValue = eqpArr[k] + "\n";

							var o = new Option("option text", "value");

							var val = $(o).html(appendValue);

							$("#txtEquipmet" + (i + 1)).append(o);

						}

						// set bed side procedure

						var servicesList = operationobj.toli[i].liTest;
				
						for ( var k = 0; k < servicesList.length; k++) {
							var appendValue = "";
							var id = "";
							var o = "";

							appendValue = servicesList[k].tname + "-"
									+ servicesList[k].qty + "\n";
							id = servicesList[k].test_ID + "-"
									+ servicesList[k].qty + "\n";
							o = new Option("option text", "value");
							$(o).html(appendValue);
							$(o).val(id);

							if (servicesList[k].ipdservicetype == "b") {
								$("#txtEquipmetb" + (i + 1)).append(o);
							} else if (servicesList[k].ipdservicetype == "g") {
								$("#txtEquipmetg" + (i + 1)).append(o);
							} else if (servicesList[k].ipdservicetype == "i") {
								$("#txtEquipmeti" + (i + 1)).append(o);
							}

						}

						// set Surgeon Details
						var docName = [];
						docName = operationobj.toli[i].docnms.split(',');

						for ( var m = 0; m < (docName.length - 1); m++) {
							var o = new Option("option text", "value");
							$(o).html(docName[m + 1] + '\n');
							$(o).val(
									operationobj.toli[i].liOpDoc[m].idopDoc
											+ '\n');
							$("#txtDocName" + (i + 1)).append(o);
						}

						// set Anesthetic detail

						// setTimeout(
						// function() {
						for ( var m = 0; m < (operationobj.toli[i].listOpeAnes.length); m++) {
							// alert(operationobj.listTop[0].listOpeAnes[m].anesId);
							arrayOfAnestheticId
									.push(operationobj.toli[i].listOpeAnes[m].anesId);

							/*
							 * $( "#selAnesthesis"+(i + 1)+" option[value=" +
							 * operationobj.listTop[i].listOpeAnes[m].anesId +
							 * "]").attr("selected", "selected");
							 */
						}
						arrayOfAnestheticId.push(0);
						// }, 500);

						// set assistant Surgeon Details
						var assSurgeonname = [];
						assSurgeonname = operationobj.toli[i].assSurgeonName
								.split(',');
						for ( var m = 0; m < (assSurgeonname.length - 1); m++) {
							var o = new Option("option text", "value");
							$(o).html(assSurgeonname[m + 1] + '\n');
							$(o)
									.val(
											operationobj.toli[i].liAssSurgeon[m].asstDocId
													+ '\n');
							$("#txtAssSurgeon" + (i + 1)).append(o);
						}
						// alert("mmmmmmmmmm");
						$("#txtCathNo" + (i + 1)).val(
								operationobj.toli[i].tomid);
					}

					setTimeout(function() {
						var k = 1;
						for ( var j = 0; j < arrayOfAnestheticId.length; j++) {
							if (arrayOfAnestheticId[j] == 0) {
								k = k + 1;
							} else {
								$(
										"#selAnesthesis" + k + " option[value="
												+ arrayOfAnestheticId[j] + "]")
										.attr("selected", "selected");
							}
						}
					}, 200);

				}, 1000);

		// var kitNames = (operationobj.top.ktNm).split(",");

	}
}

function setOperationDetails() {

	var typeOfOperation = $("#typeOfOperation").val();
	var pageName = $("#pageName").val();
	if (typeOfOperation == "previous") {

		var pobj = $("#divPatId").html();
		operationobj = eval('(' + pobj + ')');

		$("#popup_container2").val(operationobj.listTop[0].dt);
		$("#txtStartTime").val(operationobj.listTop[0].toli[0].st);
		$("#txtEndTime").val(operationobj.listTop[0].toli[0].et);
		$("#treatmentoperationid").val(operationobj.listTop[0].id);
		$("#otID").val(operationobj.listTop[0].id);

		var scheduledProcedure = "";// $("#scheduledProcedure").html();
		var arrProcedures = (operationobj.listTop[0].schPro).split("#");

		for ( var i = 1; i < (arrProcedures.length); i++) {
			var arrPro = (arrProcedures[i]).split("@");
			
			scheduledProcedure = scheduledProcedure + "<option value='"
					+ arrPro[0] + "'>" + arrPro[1] + "</option>";
			
		}
		$("#scheduledProcedure").html(scheduledProcedure);
		$("#operationListId").val(scheduledProcedure);

		$('#otName option[value="' + operationobj.listTop[0].otid + '"]').prop(
				'selected', true);
		$("#teanNameList").val(operationobj.listTop[0].toli[0].teamId);

		var obj = operationobj.listTop[0].toli[0].liOpDoc;

		var template = "";
		for ( var i = 0; i < obj.length; i++) {
			var value = obj[i].idopDoc;
			var name = obj[i].docName;
			var type = obj[i].doctp;
			var splty = obj[i].obd.speciality; //obj[i].obd.spl;
			var deptName = obj[i].obd.departmentName; // obj[i].obd.depNm;
			
			if(splty == undefined || splty == "undefined" || splty == null || splty == "null"){
				
				splty = "";
			}
			
			if(deptName == undefined || deptName == "undefined" || deptName == null || deptName == "null"){
				
				deptName = "";
			}
			
			if(pageName == "operation"){
				
				template = template
				+ "<tr id='idTr"
				+ (1 + i)
				+ "'><td class='center' style='padding-right: 13px; padding-left: 14px; width:1.3%;'><div class='' id='"
				+ (1 + i)
				+ "'>"
				+ (1 + i)
				+ "<input type='hidden' id='idUser"
				+ (1 + i)
				+ "' value='"
				+ value
				+ "' /></div></td><td class='center' style='width: 25%;'><div class='' id='docNameT"
				+ (1 + i)
				+ "'>"
				+ name
				+ "</div></td>"
				+ "<td class='center' style='width: 15%;'><div class='' id='userType"
				+ (1 + i)
				+ "'>"
				+ type
				+ "</div></td>"
				+ "<td class='center' style='width: 15%;'><div class='' id='docSpeciality"
				+ (1 + i)
				+ "'>"
				+ splty
				+ "</div></td><td class='center' style='width: 20%;'><div class='' id='docDpmt"
				+ (1 + i)
				+ "'>"
				+ deptName
				+ "</div></td>"
				+ "<td class='center' style='width: 18%;'><div class='' id='docTypeT"
				+ (1 + i)
				+ "'>"
				+ obj[i].surgtp
				+ "</div></td>"
				+ "<td class='center' style='width: 5%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + i) + " readonly='readonly''/></div></td></tr>";
				
				
				/*template = template
				+ "<tr id='idTr"
				+ (1 + i)
				+ "'><td class='' style='padding-right: 15px;'><div class='' id='"
				+ (1 + i)
				+ "'>"
				+ (1 + i)
				+ "<input type='hidden' id='idUser"
				+ (1 + i)
				+ "' value='"
				+ value
				+ "' /></div></td><td class='col-md-3-1 center' style=''><div class='' id='docNameT"
				+ (1 + i)
				+ "'>"
				+ name
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style=''><div class='' id='userType"
				+ (1 + i)
				+ "'>"
				+ type
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docSpeciality"
				+ (1 + i)
				+ "'>"
				+ obj[i].obd.spl
				+ "</div></td><td class='col-md-3-1 center' style='padding-left: 15px;'><div class='' id='docDpmt"
				+ (1 + i)
				+ "'>"
				+ obj[i].obd.depNm
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docTypeT"
				+ (1 + i)
				+ "'>"
				+ obj[i].surgtp
				+ "</div></td>"
				+ "<td class='center' style=''><div class=''><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + i) + "' readonly='readonly'/></div></td></tr>";	*/
			}else{
				template = template
				+ "<tr id='idTr"
				+ (1 + i)
				+ "'><td class='center' style='padding-right: 13px; padding-left: 14px; width:1.3%;'><div class='' id='"
				+ (1 + i)
				+ "'>"
				+ (1 + i)
				+ "<input type='hidden' id='idUser"
				+ (1 + i)
				+ "' value='"
				+ value
				+ "' /></div></td><td class='center' style='width: 25%;'><div class='' id='docNameT"
				+ (1 + i)
				+ "'>"
				+ name
				+ "</div></td>"
				+ "<td class='center' style='width: 15%;'><div class='' id='userType"
				+ (1 + i)
				+ "'>"
				+ type
				+ "</div></td>"
				+ "<td class='center' style='width: 15%;'><div class='' id='docSpeciality"
				+ (1 + i)
				+ "'>"
				+ splty
				+ "</div></td><td class='center' style='width: 20%;'><div class='' id='docDpmt"
				+ (1 + i)
				+ "'>"
				+ deptName
				+ "</div></td>"
				+ "<td class='center' style='width: 18%;'><div class='' id='docTypeT"
				+ (1 + i)
				+ "'>"
				+ obj[i].surgtp
				+ "</div></td>"
				+ "<td class='center' style='width: 5%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + i) + "'readonly='readonly' /></div></td></tr>";
				
			/*	template = template
				+ "<tr id='idTr"
				+ (1 + i)
				+ "'><td class='' style='padding-right: 15px;'><div class='' id='"
				+ (1 + i)
				+ "'>"
				+ (1 + i)
				+ "<input type='hidden' id='idUser"
				+ (1 + i)
				+ "' value='"
				+ value
				+ "' /></div></td><td class='col-md-3-1 center' style=''><div class='' id='docNameT"
				+ (1 + i)
				+ "'>"
				+ name
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style=''><div class='' id='userType"
				+ (1 + i)
				+ "'>"
				+ type
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docSpeciality"
				+ (1 + i)
				+ "'>"
				+ obj[i].obd.spl
				+ "</div></td><td class='col-md-3-1 center' style='padding-left: 15px;'><div class='' id='docDpmt"
				+ (1 + i)
				+ "'>"
				+ obj[i].obd.depNm
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docTypeT"
				+ (1 + i)
				+ "'>"
				+ obj[i].surgtp
				+ "</div></td>"
				+ "<td class='center' style=''><div class=''><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + i) + "'/></div></td></tr>";*/
			}
			
		}

		$("#teamMemberCount").val(obj.length);
		var temp;
		$("#teamMembersList").setTemplate(template);
		$("#teamMembersList").processTemplate(temp);

		if (operationobj.listTop[0].emerFlg == "Y") {
			$("#emerFlag").attr("checked", "checked");
		} else {
			$("#emerFlag").removeAttr('checked', false);
		}

		if (operationobj.listTop[0].infFlg == "Y") {
			$("#infectFlag").attr("checked", "checked");
		} else {
			$("#infectFlag").removeAttr('checked', false);
		}
		if (operationobj.listTop[0].ctrFlg == "Y") {
			$("#criticalFlag").attr("checked", "checked");
		} else {
			$("#criticalFlag").removeAttr('checked', false);
		}

		for ( var i = 0; i < operationobj.listTop.length; i++) {
			if (i != 0) {
				// AddoperationDiv();
			}
		}
		var otyInput = [];
		var dptInput = [];
		var oidInput = [];
		var i = 0;
		$("#txtCathNo" + (i + 1)).val(operationobj.listTop[i].tomid);
	//	alert(operationobj.listTop[i].tomid);

		if (operationobj.listTop[i].operationCharge == "1") {
			$("#opCharge" + (i + 1)).attr("checked", true);
		} else {
			$("#opCharge" + (i + 1)).removeAttr('checked', false);
		}

		var oid = operationobj.listTop[i].toli[0].opobj.oi;
		var oty = operationobj.listTop[i].toli[0].opobj.oty;
		var ansid = operationobj.listTop[i].anid;
		$("#anesthesiaType").val(operationobj.listTop[i].toli[0].anesType);
		$("#anesthesiaType").val(operationobj.listTop[i].toli[0].anesType);

		$(
				'#txtRoute option[value="'
						+ operationobj.listTop[i].toli[0].anesType + '"]')
				.prop('selected', true);

		$('#txtchargetype option[value="' + operationobj.listTop[i].act + '"]')
				.prop('selected', true);

		$("#txtFindings" + (i + 1)).val(operationobj.listTop[i].fnd);
		$("#txtProvlon" + (i + 1)).val(operationobj.listTop[i].prv);
		$("#txtComment" + (i + 1)).val(operationobj.listTop[i].cm);
		$("#txtStatus" + (i + 1)).val(operationobj.listTop[i].sts);
		$("#txtVeesal" + (i + 1)).val(operationobj.listTop[i].vd);
		$("#surInstrument" + (i + 1)).val(
				operationobj.listTop[i].toli[0].surinstr);

		$("#ohr" + (i + 1)).val(operationobj.listTop[i].toli[0].oh);
		$("#chr" + (i + 1)).val(operationobj.listTop[i].toli[0].ch);
		$("#obp" + (i + 1)).val(operationobj.listTop[i].toli[0].ob);
		$("#cbp" + (i + 1)).val(operationobj.listTop[i].toli[0].cb);
		var eqpLi = operationobj.listTop[i].toli[0].eu;
		if (eqpLi == undefined) {
		} else {
			var eqpArr = [];
			eqpArr = eqpLi.split("\n");
			for ( var k = 0; k < eqpArr.length - 1; k++) {

				var appendValue = eqpArr[k] + "\n";

				var o = new Option("option text", "value");

				var val = $(o).html(appendValue);

				$("#txtEquipmet" + (i + 1)).append(o);

			}
		}
		// set bed side procedure
		$("#txtEquipmetb1").html("");
		$("#txtEquipmetg1").html("");
		$("#txtEquipmeti1").html("");
		$("#txtEquipmetc1").html("");
		var servicesList = operationobj.listTop[i].toli[0].liTest;
	
		for ( var k = 0; k < servicesList.length; k++) {
			var appendValue = "";
			var id = "";
			var o = "";
			//alert(servicesList[k].ipdbillid);
			appendValue = servicesList[k].tname + "-" + servicesList[k].qty
					+ "\n";
			id = servicesList[k].test_ID + "-" + servicesList[k].qty + "\n";
			o = new Option("option text", "value");
			$(o).html(appendValue);
			$(o).val(id);

			if (servicesList[k].ipdservicetype == "b") {
				$("#txtEquipmetb" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "g") {
				$("#txtEquipmetg" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "i") {
				$("#txtEquipmeti" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "c") {
				$("#txtEquipmetc" + (i + 1)).append(o);
			}

		}

		$("#remark").val(operationobj.listTop[i].toli[0].rem);
		$("#precaution").val(operationobj.listTop[i].toli[0].presc);
		$("#surgeryDescription").val(operationobj.listTop[i].toli[0].surDesc);
		$("#indicationForSurgery").val(operationobj.listTop[i].toli[0].inSur);
		$("#otherReference").val(operationobj.listTop[i].toli[0].otherReference);
		$("#contactOfReference").val(operationobj.listTop[i].toli[0].contactOfReference);
		$("#emailOfReference").val(operationobj.listTop[i].toli[0].emailOfReference);

	} else {

		var pobj = $("#divPatId").html();
		// var obj = eval('(' + pobj + ')');
		// operationobj = obj.pl[0];
		
		operationobj = eval('(' + pobj + ')');
		
	/*	$("#bill_Id").val(operationobj.billid);//added by paras
*/		
		 var countshedule = operationobj.countshedule;//added by paras
		 $("#countshedule").val(countshedule);//added by paras   
		   //added by paras
		
		$("#popup_container2").val(operationobj.listTop[0].dt);
		$("#txtStartTime").val(operationobj.listTop[0].stt);
		$("#txtEndTime").val(operationobj.listTop[0].ett);
		$("#treatmentoperationid").val(operationobj.listTop[0].id);
		$("#otID").val(operationobj.listTop[0].id);
		if(operationobj.listTop[0].opcat==0){
			$("#opgrade").val(1);
		}else{
			$("#opgrade").val(operationobj.listTop[0].opcat);	
		}
	
		// fetchOperationTheaterNames(operationobj.listTop[0].otid);

		// $("#otName").val(operationobj.listTop[0].otid);
		$('#otName option[value="' + operationobj.listTop[0].otid + '"]').prop(
				'selected', true);

		var scheduledProcedure = "";// $("#scheduledProcedure").html();
		var arrProcedures = (operationobj.listTop[0].schPro).split("#");
       var emptyfild=0;
		for ( var i = 1; i < (arrProcedures.length - 1); i++) {
			var arrPro = (arrProcedures[i]).split("@");
			/*alert( arrPro[0]);
			alert( arrPro[1]);*/
			if(arrPro[0]==0 ){
				if(arrPro[1]==0 || arrPro[1]=="" || arrPro[1]== undefined){
					emptyfild=1;
				}else{
					scheduledProcedure = scheduledProcedure + "<option value='"
					+ arrPro[0] + "'>" + arrPro[1] + "</option>";
				}
				
			}else{
				scheduledProcedure = scheduledProcedure + "<option value='"
				+ arrPro[0] + "'>" + arrPro[1] + "</option>";
			}
		
			
		}
		
		
		
		/*if(emptyfild == 0 ){*/
		$("#scheduledProcedure").html(scheduledProcedure);

		$("#operationListId").html(scheduledProcedure);
		//}
		$("#teanNameList").val(operationobj.listTop[0].teamId);
		$("#suggestedBy").val(operationobj.listTop[0].sugBy);

		var obj = operationobj.listTop[0].liOpDoc;
		var trcount = 0;
		var template = "";
		for ( var i = 0; i < obj.length; i++) {
			var value = obj[i].idopDoc;
			var name = obj[i].docName;
			var type = obj[i].doctp;
			var spl =   "-";
			var  depNm  = "-";
			var  surgtp = "-";
			
			if(obj[i].obd== null || obj[i].obd=="" || obj[i].obd==undefined ){
				spl="-";
				depNm="-";
				surgtp="-";
				}else{
					
					 spl =   obj[i].obd.speciality; //obj[i].obd.spl;
					  depNm  = obj[i].obd.departmentName; //obj[i].obd.depNm;
					  surgtp = obj[i].surgtp;
					 
				}
			
			if(spl == undefined || spl == "undefined" || spl == null || spl == "null"){
				
				spl = "";
			}
			
			if(depNm == undefined || depNm == "undefined" || depNm == null || depNm == "null"){
				
				depNm = "";
			}
			
			template = template
					+ "<tr id='idTr"
					+ (1 + i)
					+ "'><td class='center' style='padding-right: 13px; padding-left: 14px; width:1.3%;'><div class='' id='"
					+ (1 + i)
					+ "'>"
					+ (1 + i)
					+ "<input type='hidden' id='idUser"
					+ (1 + i)
					+ "' value='"
					+ value
					+ "' /></div></td><td class='center' style='width: 25%;'><div class='' id='docNameT"
					+ (1 + i)
					+ "'>"
					+ name
					+ "</div></td>"
					+ "<td class='center' style='width: 15%;'><div class='' id='userType"
					+ (1 + i)
					+ "'>"
					+ type
					+ "</div></td>"
					+ "<td class='center' style='width: 15%;'><div class='' id='docSpeciality"
					+ (1 + i)
					+ "'>"
					+ spl
					+ "</div></td><td class='center' style='width: 20%;'><div class='' id='docDpmt"
					+ (1 + i)
					+ "'>"
					+ depNm
					+ "</div></td>"
					+ "<td class='center' style='width: 18%;'><div class='' id='docTypeT"
					+ (1 + i)
					+ "'>"
					+ surgtp
					+ "</div></td>"
					+ "<td class='center' style='width: 5%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
					+ (1 + i) + "'/></div></td></tr>";
			trcount = i + 1;
		}

		$("#teamMemberCount").val(obj.length);
		var temp;
		$("#teamMembersList").setTemplate(template);
		$("#teamMembersList").processTemplate(temp);

		if (operationobj.listTop[0].emerFlg == "Y") {
			$("#emerFlag").attr("checked", "checked");
			$('#emrChrFlag').val("Y");
			getEmergancyChargesOTfinal();
		} else {
			$('#emrChrFlag').attr('checked', false);
			$('#emerFlag').prop('checked', false);
			$('#emrChrFlag').val("N");
			//$("#emerFlag").removeAttr('checked', false);
		}

		if (operationobj.listTop[0].infFlg == "Y") {
			$("#infectFlag").attr("checked", "checked");
		} else {
			$("#infectFlag").removeAttr('checked', false);
		}
		if (operationobj.listTop[0].ctrFlg == "Y") {
			$("#criticalFlag").attr("checked", "checked");
		} else {
			$("#criticalFlag").removeAttr('checked', false);
		}

		for ( var i = 0; i < operationobj.listTop.length; i++) {
			if (i != 0) {
				AddoperationDiv();
			}

		}
		var otyInput = [];
		var dptInput = [];
		var oidInput = [];

		var i = 0;

		$("#txtCathNo" + (i + 1)).val(operationobj.listTop[i].tomid);
		// $("#manageid" + (i + 1)).val(operationobj.listTop[i].tomid);

		if (operationobj.listTop[i].operationCharge == "1") {
			$("#opCharge" + (i + 1)).attr("checked", true);
		} else {
			$("#opCharge" + (i + 1)).removeAttr('checked', false);
		}

		var oid = operationobj.listTop[i].opobj.oi;
		var oty = operationobj.listTop[i].opobj.oty;
		var ansid = operationobj.listTop[i].anid;
		$("#anesthesiaType").val(operationobj.listTop[i].anesType);
		// fetchAllAnesthesisOnload(i + 1, ansid);
		// alert(oty);

		// $("#selOTtype" + (i + 1)).val(oty);
	    $("#departmentOT").val(operationobj.listTop[i].dpt);
		// getOperationName(i + 1, oid);

		/*
		 * $("#sheet" + (i + 1)).val(operationobj.listTop[i].srb); $("#txtStent" +
		 * (i + 1)).val(operationobj.listTop[i].stnt);
		 */
		$('#txtRoute option[value="' + operationobj.listTop[i].rt + '"]').prop(
				'selected', true);
		// $("#txtRoute" + (i + 1)).val(operationobj.listTop[i].rt);

		$('#txtchargetype option[value="' + operationobj.listTop[i].act + '"]')
				.prop('selected', true);
		// $("#txtchargetype" + (i + 1)).val(operationobj.listTop[i].act);

		$("#txtFindings" + (i + 1)).val(operationobj.listTop[i].fnd);
		$("#txtProvlon" + (i + 1)).val(operationobj.listTop[i].prv);
		$("#txtComment" + (i + 1)).val(operationobj.listTop[i].cm);
		$("#txtStatus" + (i + 1)).val(operationobj.listTop[i].sts);
		$("#txtVeesal" + (i + 1)).val(operationobj.listTop[i].vd);
		$("#surInstrument" + (i + 1)).val(operationobj.listTop[i].surinstr);

		$("#ohr" + (i + 1)).val(operationobj.listTop[i].oh);
		$("#chr" + (i + 1)).val(operationobj.listTop[i].ch);
		$("#obp" + (i + 1)).val(operationobj.listTop[i].ob);
		$("#cbp" + (i + 1)).val(operationobj.listTop[i].cb);
		var eqpLi = operationobj.listTop[i].eu;
		if (eqpLi == undefined) {
		} else {
			var eqpArr = [];
			eqpArr = eqpLi.split("\n");
			for ( var k = 0; k < eqpArr.length - 1; k++) {

				var appendValue = eqpArr[k] + "\n";

				var o = new Option("option text", "value");

				var val = $(o).html(appendValue);

				$("#txtEquipmet" + (i + 1)).append(o);

			}
		}
		// set bed side procedure
		$("#txtEquipmetb1").html("");
		$("#txtEquipmetg1").html("");
		$("#txtEquipmeti1").html("");
		var servicesList = operationobj.listTop[i].liTest;
	 //   alert(servicesList.length);
	    
	    if(servicesList.length==0){
	    	$("#inserv").val('Y');
	    }
	    
        for ( var k = 0; k < servicesList.length; k++) {
			var appendValue = "";
			var id = "";
			var o = "";

			appendValue = servicesList[k].tname + "-" + servicesList[k].qty
					+ "\n";
			// alert(appendValue);
			//alert(servicesList[k].ipdbillid);

			id = servicesList[k].test_ID + "-" + servicesList[k].qty + "@"+ servicesList[k].ipdbillid +"\n";
			o = new Option("option text", "value");
			$(o).html(appendValue);
			$(o).val(id);

			if (servicesList[k].ipdservicetype == "b") {
				$("#txtEquipmetb" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "g") {
				$("#txtEquipmetg" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "i") {
				$("#txtEquipmeti" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "c") {
				// alert("ok");
				$("#txtEquipmetcreadonly" + (i + 1)).append(o);
			}
		}
		$("#remark").val(operationobj.listTop[i].rem);
		$("#precaution").val(operationobj.listTop[i].presc);
		$("#surgeryDescription").val(operationobj.listTop[i].surDesc);
		$("#indicationForSurgery").val(operationobj.listTop[i].inSur);
		$("#otherReference").val(operationobj.listTop[i].otherReference);
		$("#contactOfReference").val(operationobj.listTop[i].contactOfReference);
		$("#emailOfReference").val(operationobj.listTop[i].emailOfReference);
	}

}

function editOperation(pid,treatmentId, treatmentOpId) {

	


	window.location.href = "Operation1.jsp?" + "pid=" + encodeURIComponent(pid)
			+ "&editOP=" + 0 + "&type=" +'previous' + "&treatmentOPerationId="
			+ treatmentOpId + "&tomId=" + treatmentOpId + "&treatmentId=" + treatmentId;

}
function viewOPerationSummary(pageName,pageNumber) {
	var startIndex = 0;
	
$('#pagination').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	var inputs = [];
	inputs.push('startIndex=' + startIndex);
	inputs.push('trid=trid');
	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/otdata/DisplayOpSum",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var htm = '';
			ajaxResponse = r;
			// alert(ajaxResponse);
			count = 1;
			$("#divPatId").html(ajaxResponse);
			//pobj1 = eval('(' + ajaxResponse + ')');
			pobj1=ajaxResponse;
			if (pageName == 'OPS') {

				var countAuto = (pageNumber - 1) + '1';
				countAuto = Number(countAuto);	
				
				for(var i=0; i<r.pl.length; i++)
				{
					htm += "<table class='table table-bordered cf ' style='Width: 100%; margin-top: 0px;' id='div"+countAuto+"'>"
					+ "<tbody>		"
					+ "<tr id='div"+countAuto+"'>"
					+ "<td style='height: 21.5px;' class='col-md-1 center'>"+countAuto+".</td>"

					+ "<td style='height: 21.5px; display:none;' class='col-md-1 center'  id='divPi"+countAuto+"'>"+r.pl[i].pi+"</td>"
					+ "<td style='height: 21.5px;' class='col-md-1 center'  id='divPi"+countAuto+"'>"+r.pl[i].centerPatientId+"</td>"
					+ "<td style='height: 21.5px;' class='col-md-2'>"+r.pl[i].tit+' '+r.pl[i].fn+' '+r.pl[i].mn+' '+r.pl[i].ln+' '+"</td>"

					+ "<td style='height: 21.5px;' class='col-md-1 center'>"+r.pl[i].listTop[0].dt+"</td>"
					+ "<td style='height: 21.5px;' class='col-md-1 center'  onclick='hideShowPatOp("+r.pl[i].pi+","+countAuto+")'>"
					+ "<img src='images/down.png' id='imgupdown"+countAuto+"' />"
					+ "<input type='hidden' id='hideShowStatus"+countAuto+"' value='0' /></td>"
					+ "</tr>" + "</tbody></table>";
					countAuto++;
				}
			}
			$("#container").html(htm);
			
			setPaginationTemplate(ajaxResponse,pageNumber);
		}
	});
}

function setPaginationTemplate(r,pageNumber)
{
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);	
	var numberOfRows="";
	var indexopd=1;
	var opdcount = r.prevOperationCnt;
	var numberOfPages=(opdcount/10);
	var displayPagination=numberOfPages;    
	
	if(pageNumber == 1)
	{
		if(numberOfPages > 5){
		    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		    displayPagination=5;
		}
		
		for(var j=0;j<displayPagination;j++){
			 if(j == Number(pageNumber-1))
				{
			        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=viewOPerationSummary('OPS',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
	
				}
				else
				{
			        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=viewOPerationSummary('OPS',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
				}
				indexopd=indexopd+1;
		}
		
		if(numberOfPages>6){
		    numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}
	
		$('#totalNumberOfPagesPagination').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
		$('#pagination').html(numberOfRows);	
	}
}

function nextPagination(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=viewOPerationSummary('OPS',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#pagination').html(numberOfRows);
}


function previousPagination(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=viewOPerationSummary('OPS',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#pagination').html(numberOfRows);
}

var getPreAngiographyTemp = "{#foreach $T.cal as cal}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div		style='width: 5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>	<div		style='width: 32.9%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>		{$T.cal.pn}</div>	<div		style='width: 10.4%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.cal.cn}</div>	<div		style='width: 22%; height: 25px; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>		{$T.cal.cd}</div>	<div		style='width: 13%; height: 25px; padding-top: 3px; text-align: center; border-right: 1px solid #069; '>		<input id='btnEdit{count}' style='font-size: 10px;' type='button'	class='edit'		value='EDIT'  class='edit' onclick='editCAReport({$T.cal.ci})' />	</div><div style='width: 11%; height: 25px;  padding-top: 3px; text-align: center;'><input id='btnOper{count}' style='font-size: 10px;' type='button' onclick='deleteToCAReport({$T.cal.ci})' class='edit' value='DELETE'  class='edit' /></div></div>{#/for}";
// var searchPreAngiographyTemp = "{#foreach $T.cal as cal}<div style='width:
// 100%; height: 28px; border-bottom: 1px solid #069;'> <div style='width: 7%;
// height: 23px; text-align: center; border-right: 1px solid #069; padding-top:
// 5px;'>{count++}.</div> <div style='width: 36.2%; height: 23px; border-right:
// 1px solid #069; padding-left: 1%; padding-top: 5px;'> {$T.cal.pn}</div> <div
// style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left:
// 1%; padding-top: 5px; text-align: center;'>{$T.cal.cn}</div> <div
// style='width: 27%; height: 25px; padding-top: 3px; text-align: center;
// border-right: 1px solid #069;'> {$T.cal.cd}</div> <div style='width: 14%;
// height: 25px; padding-top: 3px; text-align: center;'> <input
// id='btnEdit{count}' style='font-size: 10px;' type='button' class='edit'
// value='EDIT' class='edit' onclick='editCAReport({$T.cal.ci})' />
// </div></div>{#/for}";

var getPreAngioplastyTemp = "{#foreach $T.al as al}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div		style='width: 5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>	<div		style='width: 33%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>		{$T.al.pn}</div>	<div		style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center;'>{$T.al.cn}</div>	<div		style='width: 22%; height: 25px; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>		{$T.al.dt}</div>	<div		style='width: 13.5%; height: 25px; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>		<input id='btnEdit{count}' style='font-size: 10px;' type='button'	class='edit'		value='EDIT'  class='edit' onclick='editAngiography({$T.al.aid})' />	</div><div style='width: 11%; height: 25px;  padding-top: 3px; text-align: center; '><input id='btnOper{count}' style='font-size: 10px;' class='edit' type='button' onclick='deleteAgioplastyReport({$T.al.aid})' value='DELETE'  class='edit' /></div></div>{#/for}";

function getPreAngiography() {
	var input = [];
	input.push('action=getPreAngiography');
	input.push('cathId=case');

	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#divPatId").html(ajaxResponse);
			var pobj = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(getPreAngiographyTemp);
			$("#container").processTemplate(pobj);

		}
	});
}
function fetchAngioplastyReport() {
	var input = [];
	input.push('action=getPreAngioplasty');
	input.push('cathId=case');
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;

			$("#divPatId").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(getPreAngioplastyTemp);
			$("#container").processTemplate(pobj1);

		}
	});
}
function searchPreAngiography() {

	var strValue = $("#byName").val();

	var input = [];
	input.push('action=searchPreAngiography');
	input.push('strValue=' + encodeURIComponent(strValue));
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			count = 1;
			$("#divPatId").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.cal.length == 0) {
				alert("Patient Not Found");
			} else {
				$("#container").setTemplate(getPreAngiographyTemp);
				$("#container").processTemplate(pobj1);
			}

		}
	});
}

function searchPreAngioplasty() {

	var strValue = $("#byName").val();

	var input = [];
	input.push('action=searchPreAngioplasty');
	input.push('strValue=' + encodeURIComponent(strValue));
	var str = input.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			count = 1;
			$("#divPatId").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.al.length == 0) {
				alert("Patient Not Found");
			} else {
				$("#container").setTemplate(getPreAngioplastyTemp);
				$("#container").processTemplate(pobj1);
			}
		}
	});
}

function deleteToCAReport(CAid) {

	var r = confirm("Are You Confirm To Delete Report");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeleteCAReport');
		inputs.push('CAid=' + CAid);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "OperationServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function deleteAgioplastyReport(Angpid) {

	alert(Angpid);
	var inputs = [];
	inputs.push('action=DeleteAngioplastyReport');
	inputs.push('Angpid=' + Angpid);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload();
		}
	});

}

/** *************AngioplastyReport Print Function ************************** */

/** ******************End Angioplasty Print function************************** */

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
function printDiv(divName) {
	var printContents = $("#" + divName).html();
	// var originalContents = document.body.innerHTML;

	document.body.innerHTML = printContents;

	window.print();

	// document.body.innerHTML = originalContents;
}

/**
 * ****************************OT Schedule
 * ***********************************************
 */

var departmentForOtSchedule = "<option value='0'>-SELECT-</option>{#foreach $T.grpli as grpli}<option value='{$T.grpli.grpid}'>{$T.grpli.grpNm}</option>{#/for}";

function fetchDepartmentForOTSchedule(rowcount) {

	var inputs = [];
	inputs.push('action=fetchGroupDetails');

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchGroupDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			var ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval( ajaxResponse );

			doctorBean = eval( ajaxResponse );
			if (rowcount == undefined) {
				$("#department").setTemplate(departmentForOtSchedule);
				$("#department").processTemplate(doctorBean);
			} else {
				$("#department" + rowcount)
						.setTemplate(departmentForOtSchedule);
				$("#department" + rowcount).processTemplate(doctorBean);

			}

		}
	});
}

/**
 * **********************OT * Schedule**************
 */

/** ********start add more operation**************** */
function AddoperationDiv() {

	var rowCount = $("#rowcount").val();
	rowCount++;
	divId = "div" + rowCount;
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	// x.setAttribute('style', 'width: 100%; ');
	document.getElementById("Opearation").appendChild(x);
	document.getElementById(divId).innerHTML = "<div style='width: 98%; height: 500px; margin-left: 20px; border: 1px solid #436a9d;'>	<div style='width: 100%;' id='div1'>		<div style='width: 35%; padding-left: 2%; margin-top: 2%;'>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>Operation Charge</div>				<div style='width: 60%;'>					<input type='checkbox' id='opCharge"
			+ rowCount
			+ "'						name='opCharge'/>				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>Operation No</div>				<div style='width: 60%;'>					<input type='text' id='txtCathNo"
			+ rowCount
			+ "'						name='txtCathNo' readonly='readonly'						style='width: 100%; background-color: lightgray;' /> </div></div>   <div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>Procedure Type</div>				<div style='width: 60%;'>					<select id='selOTtype"
			+ rowCount
			+ "' style='width: 100%;'						></select>				</div>				<div style='width: 1%; color: red; padding-left: 3%'>					<b>*</b>				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>Procedure Group</div>				<div style='width: 60%;' id='departments"
			+ rowCount
			+ "'>					<select id='department"
			+ rowCount
			+ "'						onchange=getOperationName('"
			+ rowCount
			+ "')												style='width: 100%;'></select>				</div>				<div style='width: 1%; color: red; padding-left: 3%'>					<b>*</b>				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>Procedure Name</div>				<div style='width: 60%;'>					<select id='selOTName"
			+ rowCount
			+ "' style='width: 100%;'></select>				</div>				<div style='width: 1%; color: red; padding-left: 3%'>					<b>*</b>				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;''>Anes. Name</div>				<div style='width: 60%;'>					<select multiple='multiple' size='2' id='selAnesthesis"
			+ rowCount
			+ "' style='width: 100%;'>					</select>				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>Anes.(one-on-one)</div>				<div style='width: 60%;'>					<select id='txtRoute"
			+ rowCount
			+ "' name='txtRoute'						style='width: 100%;'>						<option value='Y'>Y</option>						<option value='N'>N</option>					</select>				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>Charges for Surgeon Instruments(%):</div>				<div style='width: 60%;'>					<input type='text' id='surInstrument"
			+ rowCount
			+ "'						value='0' style='width: 100%;' />				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>OHR</div>				<div style='width: 60%;'>					<input type='text' id='ohr"
			+ rowCount
			+ "' name='ohr'						style='width: 100%;' />				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>CHR</div>				<div style='width: 60%;'>					<input type='text' id='chr"
			+ rowCount
			+ "' name='chr'						style='width: 100%;' />				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>CBP</div>				<div style='width: 60%;'>					<input type='text' id='cbp"
			+ rowCount
			+ "' name='cbp'						style='width: 100%;' />				</div>			</div>			<div style='width: 100%; padding-top: 4%;'>				<div style='width: 30%;'>OBP</div>				<div style='width: 60%;'>					<input type='text' id='obp"
			+ rowCount
			+ "' name='obp'						style='width: 100%;' />				</div>			</div>		</div>		<div style='width: 27%; margin-top: 3%'>			<div style='width: 90%;'>				<div style='width: 100%;'>Surgeon Name</div>				<div style='width: 85%; padding-right: 0%'>					<select style='width: 100%;' id='selPerBy"
			+ rowCount
			+ "'						name='selPerBy'></select>				</div>				<div style='width: 5%;'>					<img src='images/plus.jpg' width='18' height='18'						onclick=addThemOperation('doctor','"
			+ rowCount
			+ "') />				</div>				<div style='float: left; margin-left: 2px;'>					<img src='images/minus.jpg' width='18' height='18'						onclick=RemoveThemOperation('txtDocName','"
			+ rowCount
			+ "'); />				</div>				<div style='width: 1%; color: red; padding-left: 1%'>					<b>*</b>				</div>			</div>			<div style='width: 90%; margin-top: 5px;'>				<select id='txtDocName"
			+ rowCount
			+ "' multiple='multiple'					style='width: 100%;' size='3'>				</select>			</div>			<div style='width: 90%; margin-top: 3%;'>				<div style='width: 100%; padding-right: 6%;'>Asst.Surgeon Name</div>				<div style='width: 85%; padding-right: 0%'>					<select id='selAsstSurgeon"
			+ rowCount
			+ "'						style='width: 100%;'>					</select>				</div>				<div style='width: 5%;'>					<img src='images/plus.jpg' width='18' height='18'						onclick='addAsstSurgeonName("
			+ rowCount
			+ ")' />				</div>				<div style='float: left; margin-left: 2px;'>					<img src='images/minus.jpg' width='18' height='18'						onclick='removeAsstSurgeon("
			+ rowCount
			+ ")' />				</div>				<div style='width: 0%; color: red; padding-left: 0%'>					<b>*</b>				</div>			</div>			<div style='width: 90%; margin-top: 5px;'>				<select id='txtAssSurgeon"
			+ rowCount
			+ "'					multiple='multiple' style='width: 100%;' size='4'>				</select>			</div>			<div style='width: 90%; padding-top: 3%;'>				<div style='width: 100%;'>Operation Note</div>				<div style='width: 100%; padding-right: 0%;'>					<textarea style='width: 100%;' name='txtFindings'						id='txtFindings"
			+ rowCount
			+ "' cols='' rows='4'></textarea>				</div>			</div>			<div style='width: 90%; padding-top: 3%;'>				<div style='width: 100%; padding-right: 0%;'>Anesthesia Note</div>				<div style='width: 100%;'>					<textarea style='width: 100%;' name='txtComment'						id='txtComment"
			+ rowCount
			+ "'/> </textarea> <div style='width: 100%; padding-top: 4%;'>										<div style='width: 40%;'>Anes.Chartge Type</div>										<div style='width: 45%;'>										<select id='txtchargetype"
			+ rowCount
			+ "'' name='txtchargetype' style='width: 100%;'>												<option value='Normal'>Normal</option>												<option value='StandBy'>StandBy</option>												<option value='ASAIV'>ASA IV</option>											</select>										</div>									</div></div>			</div>		</div>		<div style='width: 35%; margin-top: 1%'>			<div style='width: 100%; padding-top: 1%;'>				<div style='width: 89%; padding-right: 5%;'>Consumable</div><input type='checkbox' id='manageid"
			+ rowCount
			+ "'  name='manageid'/>				<div style='width: 65%;'>					Item<input type='text' id='txtEqName"
			+ rowCount
			+ "'						class='auto' style='width: 100%;'						onkeypress='return  validatealphabetic(event)' onchange='splitProducts("
			+ rowCount
			+ ")' />				</div>				<div style='width: 14%; padding-left: 5%;'>					Quantity<input type='text' id='txtEqQty"
			+ rowCount
			+ "'						style='width: 80%;' onkeypress='return validateNumbers(event)' />				</div>				<div style='width: 6%; margin-top: 15px;'>					<img src='images/plus.jpg' width='18' height='18'						onclick=addConsumable('eqp','"
			+ rowCount
			+ "') />				</div>				<div style='float: left; margin-left: 2px; margin-top: 15px;'>					<img src='images/minus.jpg' width='18' height='18'						onclick=RemoveThemOperation('txtEquipmet','"
			+ rowCount
			+ "'); />				</div></div><div style='width: 97%; padding-top: 1%;'><div style='width: 100%;'>					<div style='width: 100%;'></div>					<select id='txtEquipmet"
			+ rowCount
			+ "'						multiple='multiple' style='width: 100%;' size='3'>					</select>				</div>			</div>			<div style='width: 100%; padding-top: 1%; padding-left: 0%'>				<div style='width: 100%; padding-right: 5%; margin-top: 7px;'>Bed					Side Procedures</div>				<div style='width: 72%;'>					Item<input type='text' id='txtEqNameb"
			+ rowCount
			+ "'						class='autob' style='width: 100%;'						onkeypress='return  validatealphabetic(event)' />				</div>				<div style='width: 13%; padding-left: 2%;'>					Quantity<input type='text' id='txtEqQtyb"
			+ rowCount
			+ "'						style='width: 80%;' onkeypress='return validateNumbers(event)' />				</div>				<div style='width: 6%; margin-top: 15px; margin-left: 1%;'>					<img src='images/plus.jpg' width='18' height='18'						onclick=addIpdServicesName('b',"
			+ rowCount
			+ ") />				</div>				<div style='float: left; margin-left: 2px; margin-top: 15px;'>					<img src='images/minus.jpg' width='18' height='18'						onclick=removeIpdServicesName('b',"
			+ rowCount
			+ ") />				</div>			</div>			<div style='width: 97%; padding-top: 1%;'>				<div style='width: 100%; padding-right: 0%;'>					<select id='txtEquipmetb"
			+ rowCount
			+ "'						multiple='multiple' style='width: 100%' size='3'>					</select>				</div>			</div>			<div style='width: 100%; padding-top: 1%; padding-left: 0%'>				<div style='width: 100%; padding-right: 5%; margin-top: 7px;'>Gases					and Monitors</div>				<div style='width: 72%;'>					Item<input type='text' id='txtEqNameg"
			+ rowCount
			+ "'						class='autog' style='width: 100%;'						onkeypress='return validatealphabetic(event)' />				</div>				<div style='width: 13%; padding-left: 2%;'>					Quantity<input type='text' id='txtEqQtyg"
			+ rowCount
			+ "'						style='width: 80%;' onkeypress='return validateNumbers(event)' />				</div>				<div style='width: 6%; margin-top: 15px; margin-left: 1%;'>					<img src='images/plus.jpg' width='18' height='18'						onclick=addIpdServicesName('g',"
			+ rowCount
			+ ") />				</div>				<div style='float: left; margin-left: 2px; margin-top: 15px;'>					<img src='images/minus.jpg' width='18' height='18'						onclick=removeIpdServicesName('g',"
			+ rowCount
			+ ") />				</div>			</div>			<div style='width: 97%; padding-top: 0%;'>				<div style='width: 100%; padding-right: 1%;'>					<select id='txtEquipmetg"
			+ rowCount
			+ "'						multiple='multiple' style='width: 100%;' size='3'>					</select>				</div>			</div>			<div style='width: 100%; padding-top: 1%; padding-left: 0%'>				<div style='width: 100%; padding-right: 5%; margin-top: 7px;'>Instruments					and Equipments</div>				<div style='width: 72%;'>					Item<input type='text' id='txtEqNamei"
			+ rowCount
			+ "'						class='autoi' style='width: 100%;'						onkeypress='return  validatealphabetic(event)' />				</div>				<div style='width: 13%; padding-left: 2%;'>					Quantity<input type='text' id='txtEqQtyi"
			+ rowCount
			+ "'						style='width: 80%;' onkeypress='return validateNumbers(event)' />				</div>				<div style='width: 6%; margin-top: 15px; margin-left: 1%;'>					<img src='images/plus.jpg' width='18' height='18'						onclick=addIpdServicesName('i',"
			+ rowCount
			+ ") />				</div>				<div style='float: left; margin-left: 2px; margin-top: 15px;'>					<img src='images/minus.jpg' width='18' height='18'						onclick=removeIpdServicesName('i',"
			+ rowCount
			+ ") />				</div></div>			<div style='width: 97%; padding-top: 1%;'>				<div style='width: 100%; padding-right: 0%;'>					<select id='txtEquipmeti"
			+ rowCount
			+ "'						multiple='multiple' style='width: 100%;' size='3'>					</select>				</div>			</div>		</div>		<input type='hidden' id='opId1' value='' /> <input type='hidden'			id='rowcount' value='1' />	</div></div>";
	// document.getElementById(divId).innerHTML = $("#addOperationDiv").html();
	$("#rowcount").val(rowCount);
	// $("#addRowCount").val(i);
	fetchPTNameForOtSchedule(rowCount);
	fetchDepartmentForOTSchedule(rowCount);
	loadDoctors("operation", rowCount);
	fetchAllAnesthesisOnload(rowCount);

	$(".auto").autocomplete(
			"AutoSuggetionServlet?auto=invOTMedicine&OTID=" + $("#otID").val());
	$(".autob").autocomplete(
			"AutoSuggetionServlet?auto=IpdService&autoType=" + "b");
	$(".autog").autocomplete(
			"AutoSuggetionServlet?auto=IpdService&autoType=" + "g");
	$(".autoi").autocomplete(
			"AutoSuggetionServlet?auto=IpdService&autoType=" + "i");

}
/** ********end add more operation**************** */

function RemoveoperationDiv() {

	var manageOperationId = [];

	var rowCount = $("#rowcount").val();

	$('input[name=manageid]:checked').each(function() {
		if ($(this).val() != "on") {
			manageOperationId.push($(this).val());
		}
	});

	for ( var i = 1; i <= rowCount; i++) {
		if ($("#manageid" + i).attr('checked') == true) {
			$("#div" + i).remove();
		}
	}

	if (manageOperationId.length != 0) {
		var inputs = [];
		inputs.push('action=deleteManageOperation');
		inputs.push('manageOperationId=' + manageOperationId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "OperationServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				var ajaxResponse = r;
				alert(ajaxResponse);
				window.location.reload();
			}
		});
	}
}
/**
 * **************Richa code for Pre Anaesthetic
 * Assessment****************************************************************************************
 */
/*
 * 
 * var containerviewAssessTemplate = '{#foreach $T.pl as pl}<div style="width:
 * 100%; height: auto; border-bottom: 1px solid #069;"><div style="width: 5%;
 * height: 23px; text-align: center; border-right: 1px solid #069; padding-top:
 * 5px;">{count++}.</div><div style="width: 13%; height: 23px; border-right:
 * 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.pi} </div><div
 * style="width: 26.11%; height: 23px; border-right: 1px solid #069;
 * padding-left: 1%; padding-top: 5px;">{$T.pl.tit} {$T.pl.fn} {$T.pl.mn}
 * {$T.pl.ln} </div><div style="width: 19%; height: 23px; border-right: 1px
 * solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.listTop[0].dt}</div><div
 * style="width: 18%; height: 25px; border-right: 1px solid #069; padding-top:
 * 3px; text-align: center;"><input
 * onclick="viewAssessment({$T.pl.pi},{$T.pl.listTop[0].id})"
 * id="btnOper{count}" class="edit" style="font-size: 10px;" type="button"
 * value="VIEW" /> </div> <div style="width: 15%; height: 25px; border-right:
 * 1px solid #069; padding-top: 3px; text-align: center;"><input
 * onclick="viewConductAssessment({$T.pl.pi})" id="btnOper{count}" class="edit"
 * style="font-size: 10px;" type="button" value="VIEW" /></div></div>{#/for}';
 * 
 */
// abhijit Radke
var containerviewAssessTemplate = "<div class='col-sm-12-1' style='margin-top:-12px; border: 1px solid #ddd; overflow-y:scroll; height: 300px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.pl.pi}</td>"
		/*+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.pl.centerPatientId}</td>"*/
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.listTop[0].dt}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='VIEW' id='btnOper{count}' onclick='viewAssessment({$T.pl.pi},{$T.pl.listTop[0].id},{$T.pl.listTop[0].tomid})'>"
		+ "<i class='fa fa-eye View'></i>" + "</button>"
		/*
		 * + "<td class='col-sm-1-1 center' style='height: 21.5px;'>" + "<button
		 * class='btn btn-xs btn-success' value='VIEW' id='btnOper{count}'
		 * onClick='viewConductAssessment({$T.pl.pi})'>" + "<i class='fa fa-eye
		 * View'></i>" + "</button>" + "</td>"
		 */
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var containerviewPrevAssessTemplate = '{#foreach $T.pl as pl} <div style="width: 100%; height: auto; border-bottom: 1px solid #069;"><div	style="width: 5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count++}.</div><div	style="width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.pi}	</div><div	style="width: 26.11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.tit}	{$T.pl.fn} {$T.pl.mn} {$T.pl.ln} </div><div	style="width: 19%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;">{$T.pl.listTop[0].dt}</div><div style="width: 21%; height: 25px; border-right: 1px solid #069; padding-left: 2%; padding-top: 3px; text-align: center;"onclick="hideShowPreOPDBill({count})"><img src="images/down.png" id="imgupdown{count}" /> <input type="hidden" id="hideShowStatus{count}" value="0" /></div></div>{#/for}';

function viewAnaestheticAssess(page_name) {
	count = 1;
	if (page_name == "Search") {

		var byName = $("#byName").val();
		var byId = $("#byId").val();

		if (byName != "" && byId != "" && page_name == "Search") {
			alert("Please search either by Patient Name or by Patient Id");
			return false;
		} else if (byName == "" && byId == "" && page_name == "Search") {
			alert("Please enter Patient Name or Patient Id for search");
			return false;
		}

		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;

		}

		var pageName = $("#pageName").val();
		if (pageName == "OperationDashboard") {
			otDate = $("#popup_container2").val();
		} else {
			otDate = $("#operationDate").val();
		}
		var input = [];
		input.push('searchBy=' + encodeURIComponent(searchBy));
		input.push('value=' + encodeURIComponent(value));
		input.push('action=DisplayOperationPat');
		input.push('otDate=' + encodeURIComponent(otDate));

		input.push('page_name=' + encodeURIComponent(page_name));
		var str = input.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "./ehat/otdata/DisplayOperationPat",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				var myObj1 = JSON.stringify(ajaxResponse);
				$("#opObject").html(myObj1);
				// alert(ajaxResponse);
				count = 1;
				//pobj1 = eval('(' + ajaxResponse + ')');
				pobj1 = r;
				//if (pobj1.pl.length == 0) {
				if (pobj1.pl.length == 0) {
					alert("patient Not Found");
					return false;
				} else if (page_name == "OperationDashboard" || page_name == "Search") {
					
					$("#container").setTemplate(containerviewAssessTemplate);

				} else if (page_name == "PrevOperationDashboard") {

					$("#container").setTemplate($("#container").html());
					// $("#treatID").html(pobj1.pl[0].trid);

				}

				else if (page_name == "CSSDDashBoard") {
					$("#container").setTemplate(CSSDDashBoardTemplate);
				} else if (page_name == "Search") {
					$("#container").setTemplate(containerviewAssessTemplate);
				} else if (page_name == "OTSchedule") {
					$("#container").setTemplate(OTScheduleTemp);
					$("#OTdata").val(ajaxResponse);
				}

				$("#container").processTemplate(pobj1);

				for ( var i = 1; i <= rowCount; i++) {
					// alert("row" + rowCount);
					$("#patPreOPDBill" + i).hide();
				}
			//}
		}
		});

	} else if (page_name == "operation") {

		var searchBy = $("#topId").val();
		var value = $("#pid").val();
		var otDate = $("#operationDate").val();

		var input = [];
		input.push('searchBy=' + encodeURIComponent(searchBy));
		input.push('value=' + encodeURIComponent(value));
		input.push('action=DisplayOperationPat');
		input.push('otDate=' + encodeURIComponent(otDate));

		input.push('page_name=' + encodeURIComponent(page_name));
		var str = input.join('&');

		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "./ehat/otdata/DisplayOperationPat",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				var myArray = ajaxResponse;
				var myObj = myArray.pl[0];
				var myObj1 = JSON.stringify(myObj);
				$("#divPatId").html(myObj1);
			}
		});
	} else {

		var otDate = $("#operationDate").val();
		if (page_name == "OperationDashboard") {
			otDate = $("#popup_container2").val();
		} else {
			if (($("#pageName").val()) == "OTAppointment") {
				otDate = $("#idTourDateDetails").val();
			} else {
				otDate = $("#operationDate").val();
			}
		}

		var input = [];

		input.push('action=DisplayOperationPat');
		input.push('otDate=' + encodeURIComponent(otDate));

		input.push('page_name=' + encodeURIComponent(page_name));
		var str = input.join('&');

		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "./ehat/otdata/DisplayOperationPat",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				
				var myObj = ajaxResponse;
				var myObj1 = JSON.stringify(myObj);

				$("#opObject").html(myObj1);
				pobj1 = eval('(' + myObj1 + ')');

				var rowCount = ajaxResponse.pl.length + 1;

				var rowCount = pobj1.pl.length + 1;

				if (page_name == "OperationDashboard") {
					$("#container").setTemplate(containerviewAssessTemplate);
					// var a=pobj1.pl[0].trid;
					// alert(a);
				} else if (page_name == "PrevOperationDashboard") {
					$("#container").setTemplate($("#temp").html());
					// $("#treatID").html(pobj1.pl[0].trid);
					// alert(pobj1.pl.trid);
				} else if (page_name == "CSSDDashBoard") {
					$("#container").setTemplate(CSSDDashBoardTemplate);
				} else if (page_name == "Search") {
					$("#container").setTemplate(containerviewAssessTemplate);
				} else if (page_name == "OTSchedule") {
					$("#container").setTemplate(OTScheduleTemp);
					$("#OTdata").val(myObj1);
				}

				$("#container").processTemplate(pobj1);
				

				for ( var i = 1; i <= rowCount; i++) {
					$("#patPreOPDBill" + i).hide();
				}
				setOperationAppointmentInCalender();
				
				var k = 0;
				for ( var i = 1; i < rowCount; i++) {
					if ((ajaxResponse.pl[k++].conductlist.length) <= 0) {
						$("#conductDiv").hide();
					} else
						$("#conductDiv" + i).show();
				}
				
				
			}
			
			
		});

	}
}

function goPrevAnaesthesia(preid, pid, pageType) {
	ajaxResponse = $("#opObject").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == pid) {

			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	if (pageType == "Preanaesthesia") {
		window.location.href = "PrevOTAnaestheticAssess.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&pageType=" + pageType
				+ "&preid=" + preid;
	}

	else if (pageType == "ConductAnaesthesia") {
		window.location.href = "PrevConductAnaesthesia.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&pageType=" + pageType
				+ "&preid=" + preid;
	}

}

function fetchpreviousPreAnaestheticDetails() {

	var preid = $("#PreAnesID").html();
	var inputs = [];
	inputs.push('action=fetchpreviousPreAnaestheticDetails');
	inputs.push('preid=' + preid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var ajaxResponse = r;

			var div = document.getElementById("divIPDAjaxresponse");
			div.value = ajaxResponse;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#divIPDAjaxresponse").val(ajaxResponse);
			if ((pobj1.preanalist.length) > 0) {
				var arrCL = (pobj1.preanalist[0].cstatus).split(",");
				for ( var i = 1; i < arrCL.length; i++) {
					(arrCL[i] == 1) ? $('input[id=checkAppType' + (i) + ']')
							.attr('checked', true) : $(
							'input[id=checkAppType' + (i) + ']').attr(
							'checked', false);

				}

				var arrRL = (pobj1.preanalist[0].rstatus).split(",");
				// alert(arrRL);
				for ( var i = 1; i < (arrRL.length); i++) {
					(arrRL[i] == 1) ? $('input[id=radAppType' + (i) + ']')
							.attr('checked', true) : $(
							'input[id=radAppType' + (i) + ']').attr('checked',
							false);
				}
				// var pobj=$("#divIPDAjaxresponse").val();
				// alert(pobj1.preanalist[0].prevexp);
				$("#prevexp").val(pobj1.preanalist[0].prevexp);
				$("#otherh").val(pobj1.preanalist[0].other);
				$("#pulse").val(pobj1.preanalist[0].pulse);
				$("#bp").val(pobj1.preanalist[0].bp);
				$("#resp").val(pobj1.preanalist[0].resp);
				$("#pallor").val(pobj1.preanalist[0].palr);
				$("#ict").val(pobj1.preanalist[0].ict);
				$("#cya").val(pobj1.preanalist[0].cyano);
				$("#club").val(pobj1.preanalist[0].club);
				$("#ode").val(pobj1.preanalist[0].oed);
				$("#veins").val(pobj1.preanalist[0].vein);
				$("#obs").val(pobj1.preanalist[0].obes);
				$("#neck").val(pobj1.preanalist[0].neck);
				$("#jaw").val(pobj1.preanalist[0].jaw);
				$("#teeth").val(pobj1.preanalist[0].teeth);
				$("#spine").val(pobj1.preanalist[0].spine);
				$("#bht").val(pobj1.preanalist[0].bht);
				$("#cvs").val(pobj1.preanalist[0].cvs);
				$("#rs").val(pobj1.preanalist[0].rs);
				$("#cns").val(pobj1.preanalist[0].cns);
				$("#hb").val(pobj1.preanalist[0].hb);
				$("#tc").val(pobj1.preanalist[0].tc);
				$("#p").val(pobj1.preanalist[0].pobj);
				$("#l").val(pobj1.preanalist[0].lobj);
				$("#e").val(pobj1.preanalist[0].eobj);
				$("#m").val(pobj1.preanalist[0].mobj);
				$("#bone").val(pobj1.preanalist[0].boneobj);
				$("#smear").val(pobj1.preanalist[0].smear);
				$("#plat").val(pobj1.preanalist[0].plate);
				$("#esr").val(pobj1.preanalist[0].esr);
				$("#urine").val(pobj1.preanalist[0].urine);
				$("#bun").val(pobj1.preanalist[0].bun);
				$("#hiv").val(pobj1.preanalist[0].hiv);
				$("#bsl").val(pobj1.preanalist[0].bsl);
				$("#f").val(pobj1.preanalist[0].fobj);
				$("#pp").val(pobj1.preanalist[0].ppobj);
				$("#naelec").val(pobj1.preanalist[0].na);
				$("#kelec").val(pobj1.preanalist[0].k);
				$("#clelec").val(pobj1.preanalist[0].cl);
				$("#btwo").val(pobj1.preanalist[0].btwoobj);
				$("#ct").val(pobj1.preanalist[0].ctobj);
				$("#pt").val(pobj1.preanalist[0].ptobj);
				$("#screat").val(pobj1.preanalist[0].screat);
				$("#ecg").val(pobj1.preanalist[0].ecg);
				$("#xray").val(pobj1.preanalist[0].xray);
				$("#otherh").val(pobj1.preanalist[0].other);
				$("#riskassess").val(pobj1.preanalist[0].risk);
				$("#proplan").val(pobj1.preanalist[0].proplan);
				$("#preoper").val(pobj1.preanalist[0].preoper);
				$("#premed").val(pobj1.preanalist[0].premed);
				$("#other").val(pobj1.preanalist[0].othmed);
				$("#prosurgery").val(pobj1.preanalist[0].prosurgery);
				$("#crtdate").val(pobj1.preanalist[0].crtdate);
				$("#xray").val(pobj1.preanalist[0].xray);
				$("#blood").val(pobj1.preanalist[0].bg);
				// if (type == 'ipd')
				$("#indoor").val(pobj1.preanalist[0].ipdno);
				// else if (type == 'opd')
				// $("#opd").val(pobj1.preanalist[0].ipdno);
				/*
				 * $("#divIPDAjaxresponse").setTemplate(pobj1);
				 * alert($("#divIPDAjaxresponse").val());
				 * $("#divIPDAjaxresponse").processTemplate(pobj1);
				 */
				$("#queryType").val("update");
			} else {

				$("#queryType").val("insert");
			}

		}
	});

}

function viewAssessment(pid, id, tomid) {
	var treatID = null;
	ajaxResponse = $("#opObject").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid && myArray.pl[i].listTop[0].id == id) {
			myObj = myArray.pl[i];
			treatID = myArray.pl[i].trid;
			break;
		}
		// setOperationDetails();
	}
	var operationDate = myObj.listTop[0].dt;
	myObj = JSON.stringify(myObj);
	// operationobj = eval('(' + myObj + ')');
	window.location.href = "OTAnaestheticAssess.jsp?" + "&treatID=" + treatID + "&pid=" + pid
			+ "&tomid=" + tomid + "&topId=" + id + "&operationDate=" + operationDate;

}

function setAssessDetails() {

	var pobj = $("#divPatId").html();
	// alert(pobj);

	// pobj1=decodeURIComponent(pobj);
	// operationobj = JSON.parse(pobj1);
	operationobj = eval('(' + pobj + ')');
	// alert(operationobj.fn);
	var fullname = operationobj.tit + "   " + operationobj.fn + "   "
			+ operationobj.mn + "   " + operationobj.ln;
	// var surgeon=operationobj.listTop[0].liOpDoc[0].docName;
	$("#name").html(fullname);
	$("#Surgeon").html(operationobj.listTop[0].liOpDoc[0].docName);
	$("#age").html(
			operationobj.ag + " (YY) " + operationobj.month + " (MM) "
					+ operationobj.days + " (DD)");
	$("#sex").html(operationobj.sx);
	$("#weight").html(operationobj.objTreat.wt);
	$("#refBy").html(operationobj.rb);
	$("#refTo").html(operationobj.rt);
	$("#docInCharge").html(operationobj.admit);
	$("#regdate").html(operationobj.objTreat.trCount);
	$("#atype").html(operationobj.agtp);

}

function fetchPreAnaestheticDetails() {
	var pobj = $("#divPatId").html();
	operationobj = eval('(' + pobj + ')');
	var anaesID = 0;// (operationobj.listTop[0].listOpeAnes[0].anesId);
	//var anaesID = (operationobj.listTop[0].listOpeAnes[0].anesId);
	var tretID = $("#tretID").html();
	if(tretID == undefined){
		tretID = $("#tId").val();
	}
	var type = "ipd";
	
	var inputs = [];
	inputs.push('action=fetchAnaestheticDetails');
	inputs.push('treatmentId=' + tretID);
	//inputs.push('anaesID=' + anaesID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "OperationServlet",
				url : "ehat/otdata/fetchAnaestheticDetails",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					var ajaxResponse = r;
					// alert("aaaa--"+ajaxResponse);
					var div = document.getElementById("divIPDAjaxresponse");
					div.value = ajaxResponse;
					pobj1 = ajaxResponse;  //eval('(' + ajaxResponse + ')');
					$("#divIPDAjaxresponse").val(ajaxResponse);
					if ((pobj1.preAnaestheticList.length) > 0) {
						var arrCL = (pobj1.preAnaestheticList[0].chk_anaesthetic_status).split(",");
						for ( var i = 1; i < arrCL.length; i++) {
							(arrCL[i] == 1) ? $(
									'input[id=checkAppType' + (i) + ']').attr(
									'checked', true) : $(
									'input[id=checkAppType' + (i) + ']').attr(
									'checked', false);
						}

						var arrRL = (pobj1.preAnaestheticList[0].radio_anaesthetic_status).split(",");
						// alert(arrRL);
						for ( var i = 1; i < (arrRL.length); i++) {
							(arrRL[i] == 1) ? $(
									'input[id=radAppType' + (i) + ']').attr(
									'checked', true) : $(
									'input[id=radAppType' + (i) + ']').attr(
									'checked', false);
						}
						if (pobj1.preAnaestheticList[0].coughQty != 0) {
							$("#coughPresent").show();
							$("#cough").val(pobj1.preAnaestheticList[0].coughQty);
							$("#qtyForCough").val(pobj1.preAnaestheticList[0].coughQty);
							$("#selectCoughTime").val(
									pobj1.preAnaestheticList[0].coughTime);
						} else {
							$("#coughPresent").hide();
						}
						if (pobj1.preAnaestheticList[0].dyspnoeaQty != 0) {
							$("#DYSPNOEAPresent").show();
							$("#dyspnoea").val(pobj1.preAnaestheticList[0].dyspnoeaQty);
							$("#qtyForDyspnoea").val(
									pobj1.preAnaestheticList[0].dyspnoeaQty);
							$("#selectDyspnoeaTime").val(
									pobj1.preAnaestheticList[0].dyspnoeaTime);
						} else {
							$("#DYSPNOEAPresent").hide();
						}
						if (pobj1.preAnaestheticList[0].giddinessQty != 0) {
							$("#GiddnessPresent").show();
							$("#giddiness").val(
									pobj1.preAnaestheticList[0].giddinessQty);
							$("#qtyForGiddiness").val(
									pobj1.preAnaestheticList[0].giddinessQty);
							$("#selectGiddinessTime").val(
									pobj1.preAnaestheticList[0].giddinessTime);
						} else {
							$("#GiddnessPresent").hide();
						}
						if (pobj1.preAnaestheticList[0].chestPainQty != 0) {
							$("#chestPainPresent").show();
							$("#chestPain").val(
									pobj1.preAnaestheticList[0].chestPainQty);
							$("#qtyForChestPain").val(
									pobj1.preAnaestheticList[0].chestPainQty);
							$("#selectChestPainTime").val(
									pobj1.preAnaestheticList[0].chestPainTime);
						} else {
							$("#chestPainPresent").hide();
						}

						
						// present medication
						$("#presentMedicationsOther").val(
								pobj1.preAnaestheticList[0].txtPresMedOther);
						$("#prevexp").val(pobj1.preAnaestheticList[0].prevanaes_exp);
						
						
						$("#otherh").val(pobj1.preAnaestheticList[0].other);
						$("#pulse").val(pobj1.preAnaestheticList[0].pulse);
						$("#bp").val(pobj1.preAnaestheticList[0].bp);
						$("#resp").val(pobj1.preAnaestheticList[0].resp);
						
						// Examination Findings Medications
						$("#pallor").val(pobj1.preAnaestheticList[0].pallor);
						$("#ict").val(pobj1.preAnaestheticList[0].icterus);
						$("#cya").val(pobj1.preAnaestheticList[0].cyanosis);
						$("#club").val(pobj1.preAnaestheticList[0].club);
						$("#ode").val(pobj1.preAnaestheticList[0].oedema);
						$("#veins").val(pobj1.preAnaestheticList[0].vein);
						$("#obs").val(pobj1.preAnaestheticList[0].obesity);
						$("#neck").val(pobj1.preAnaestheticList[0].neckobj);
						$("#jaw").text(pobj1.preAnaestheticList[0].jawobj);
						$("#teeth").val(pobj1.preAnaestheticList[0].teethobj);
						$("#spine").val(pobj1.preAnaestheticList[0].spineobj);
						$("#bht").val(pobj1.preAnaestheticList[0].bht);
						
						//
						$("#cvs").val(pobj1.preAnaestheticList[0].cvs);
						$("#rs").val(pobj1.preAnaestheticList[0].rs);
						$("#cns").val(pobj1.preAnaestheticList[0].cns);
						
						
						$("#hb").val(pobj1.preAnaestheticList[0].hb);
						$("#tc").val(pobj1.preAnaestheticList[0].tc);
						$("#p").val(pobj1.preAnaestheticList[0].pobj);
						$("#l").val(pobj1.preAnaestheticList[0].lobj);
						$("#e").val(pobj1.preAnaestheticList[0].eobj);
						$("#m").val(pobj1.preAnaestheticList[0].mobj);
						$("#bone").val(pobj1.preAnaestheticList[0].boneobj);
						$("#smear").val(pobj1.preAnaestheticList[0].smear);
						$("#plat").val(pobj1.preAnaestheticList[0].platelet);
						$("#esr").val(pobj1.preAnaestheticList[0].esr);
						$("#urine").val(pobj1.preAnaestheticList[0].urine);
						$("#bun").val(pobj1.preAnaestheticList[0].bun);
						$("#hiv").val(pobj1.preAnaestheticList[0].hiv);
						$("#bsl").val(pobj1.preAnaestheticList[0].bsl);
						$("#f").val(pobj1.preAnaestheticList[0].fobj);
						$("#pp").val(pobj1.preAnaestheticList[0].ppobj);
						$("#naelec").val(pobj1.preAnaestheticList[0].naElectolytes);
						$("#kelec").val(pobj1.preAnaestheticList[0].kElectolytes);
						$("#clelec").val(pobj1.preAnaestheticList[0].clElectolytes);
						$("#btwo").val(pobj1.preAnaestheticList[0].btwoobj);
						$("#ct").val(pobj1.preAnaestheticList[0].ctobj);
						$("#pt").val(pobj1.preAnaestheticList[0].ptobj);
						$("#screat").val(pobj1.preAnaestheticList[0].screatobj);
						$("#ecg").val(pobj1.preAnaestheticList[0].ecgobj);
						$("#xrayid").val(pobj1.preAnaestheticList[0].xray_chest);
						$("#otherid").val(pobj1.preAnaestheticList[0].other);
						
						//plan of anaesthia
						$("#riskassess").val(pobj1.preAnaestheticList[0].risk_assess);
						$("#proplan").val(pobj1.preAnaestheticList[0].proposed_plan);
						$("#preoper").val(pobj1.preAnaestheticList[0].pre_operativeinstuct);
						$("#premed").val(pobj1.preAnaestheticList[0].pre_medication);
						
						
						$("#other").val(pobj1.preAnaestheticList[0].othmed);
						$("#prosurgery").val(pobj1.preAnaestheticList[0].prosurgery);
						$("#crtdate").val(pobj1.preAnaestheticList[0].created_Date);
						$("#xray").val(pobj1.preAnaestheticList[0].xray);
						$("#blood").val(pobj1.preAnaestheticList[0].bloodgroup);
						$("#regno").html(pobj1.preAnaestheticList[0].tc);
						// $("#anaesname").html(pobj1.preAnaestheticList[0].doctorlist[0].dn);

						if (type == 'ipd') {
							// $("#indoor").val(pobj1.preAnaestheticList[0].ipdno);
							$("#indoor").val(pobj1.preAnaestheticList[0].preanesid);
						} else if (type == 'opd')
							$("#opd").val(pobj1.preAnaestheticList[0].ipdno);
						/*
						 * $("#divIPDAjaxresponse").setTemplate(pobj1);
						 * alert($("#divIPDAjaxresponse").val());
						 * $("#divIPDAjaxresponse").processTemplate(pobj1);
						 */
						$("#queryType").val("update");
					} else {

						$("#queryType").val("insert");
					}
				}
			});

}

function getAllBloodGroupMasterForPreAnaesthetic(){
	var unitId = $("#unitid").val();
	var inputs = [];
	inputs.push('unitId=' + unitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/bb_blood_group_master/getAllBloodGroupMaster",
		data : str + "&reqType=AJAX",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setAllBloodGroupMasterForPreAnaesthetic(r);			
		}
	});
}

function setAllBloodGroupMasterForPreAnaesthetic(r){

	var htm ="";
	var index = 1;
	
var list="<option value='0'>-Select Blood Group-</option>";
	
	//alert(list);
	for ( var int = 0; int < r.lstBloodGroupMaster.length; int++) {

		//list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		list=list+'<option value="'+(r.lstBloodGroupMaster[int].bloodGroupId)+'">'+(r.lstBloodGroupMaster[int].bloodGrouptName)+'</option>';
		//listofBloodId= listofunit+","+(r.lstBloodGroupMaster[int].bloodGroupId);
		//list=list+'<option <input type="hidden" unitId="'+(r.lstUnit[int].unitId)+'" name="uId" value="'+(r.lstUnit[int].unitName)+'"></option>';
		//temp= '<li> '+  ul +' <input type="hidden" id="ul'+uls+'" name="unitList" value="'+uls+'"> </li>';	
	}	
	
	$("#blood").html(list);
	
//		for ( var i = 0; i < r.lstBloodGroupMaster.length; i++) {		
//			htm = htm + '<tr> '
//			+ ' <td class="col-md-1 center">'+index+'</td>'
//			+ ' <td class="col-md-1 center">'+r.lstBloodGroupMaster[i].bloodGroupId+'</td>'
//			+ ' <td class="col-md-1 center">'+r.lstBloodGroupMaster[i].bloodGrouptName+'</td>'		
//			+ ' <td class="col-md-1 center">'
//			+ '	<button class="btn btn-xs btn-success" onclick=editBloodGrouptMaster('+r.lstBloodGroupMaster[i].bloodGroupId+')><i class="fa fa-edit"></i></button></td>'
//			+ ' <td class="col-md-1 center">'
//			+ '	<button class="btn btn-xs btn-danger" onclick=deleteBloodGroupMaster('+r.lstBloodGroupMaster[i].bloodGroupId+')><i class="fa fa-trash-o"></i></button></td>'
//			+ '</tr>';
//			index++;
//		}
	$("#bloodGroupDetails").html(htm);
}

function printPreAnaethAssmnt3()
{
	var anaesID = 0;
	var pid =$("#pid").val();
	var tid =$("#tretID").html();
	var tret = $("#tId");
	var tomId = $("#tomId").val();
	var cType =3;
/*	if(callfrom == "previous"){
		anaesID = $("#tomId").val();
		pid =$("#pId").val();
		tid =$("#tId").val();
	}else{
		anaesID = $("#tomId").val();
		pid =$("#pid").val();
		tid =$("#treatmentId").val();
	}
*/

	window.open("PreAnaesthaticAssessmentPrint.jsp?" + "patID=" + 
			encodeURIComponent(pid) + "&trId=" + encodeURIComponent(tid)+ "&tomId=" + encodeURIComponent(tomId)+ "&anaesID=" + encodeURIComponent(anaesID)+"&cType=" + encodeURIComponent(cType));

}

function savePreAnaestheticDetails() {
	// tretID

	var strchk = "";
	for ( var i = 1; i <= 15; i++) {
		chk = ($("#checkAppType" + i)).is(':checked') ? 1 : 0;
		strchk = strchk + "," + chk;
	}
	var strradio = "";
	for ( var i = 1; i <= 10; i++) {
		radio = ($("#radAppType" + i)).is(':checked') ? 1 : 0;
		strradio = strradio + "," + radio;
	}
	var queryType = $("#queryType").val();
	var presentMedicationsOther = $("#presentMedicationsOther").val();
	var prevexp = $("#prevexp").val();
	//var pulse = $("#pulse").val();
	var pulse="";
	//var bp = $("#bp").val();
	var bp="";
	//var resp = $("#resp").val();
	var resp="";
	var pallor = $("#pallor").val();
	var ict = $("#ict").val();
	var cya = $("#cya").val();
	var club = $("#club").val();
	var ode = $("#ode").val();
	var veins = $("#veins").val();
	var obs = $("#obs").val();
	var neck = $("#neck").val();
	var jaw = $("#jaw").val();
	var teeth = $("#teeth").val();
	var spine = $("#spine").val();
	var bht = $("#bht").val();
//	var cvs = $("#cvs").val();
	var cvs="";
//	var rs = $("#rs").val();
	var rs="";
//	var cns = $("#cns").val();
	var cns="";
	var hb = $("#hb").val();
	var tc = $("#tc").val();
	var p = $("#p").val();
	var l = $("#l").val();
	var e = $("#e").val();
	var m = $("#m").val();
	var bone = $("#bone").val();
	var smear = $("#smear").val();
	var plat = $("#plat").val();
	var esr = $("#esr").val();
	var urine = $("#urine").val();
	var bun = $("#bun").val();
	var hiv = $("#hiv").val();
	var bsl = $("#bsl").val();
	var f = $("#f").val();
	var pp = $("#pp").val();
	var naelec = $("#naelec").val();
	var kelec = $("#kelec").val();
	var clelec = $("#clelec").val();
	var btwo = $("#btwo").val();
	var ct = $("#ct").val();
	var pt = $("#pt").val();
	var screat = $("#screat").val();
	var ecg = $("#ecg").val();
	var xray = $("#xrayid").val();
	var riskassess = $("#riskassess").val();
	var proplan = $("#proplan").val();
	var preoper = $("#preoper").val();
	var premed = $("#premed").val();
	var otherh = $("#otherh").val();
	var other = $("#otherid").val();
//	var indoor = $("#indoor").val();
	var indoor="";
	//var opd = $("#opd").val();
	var opd="";
	var crtdate = $("#crtdate").val();
//	var prosurgery = $("#prosurgery").val();
	var prosurgery="";
	var tretID = $("#tretID").html();
	var cType = $("#cType").val();
	var patID = $("#pid").val();
	var blood = $("#blood").val();
	var inputs = [];
	if (crtdate == "") {
		alert("please enter date");
		SetFocus("crtdate");
		return false;
	}
	var qtyForCough = 0;
	var qtyForDyspnoea = 0;
	var qtyForGiddiness = 0;
	var qtyForChestPain = 0;

	var checkedYesForCough = ($('input:radio[name=cough]:checked').val());
	if (checkedYesForCough == "yes") {
		qtyForCough = parseInt($("#qtyForCough").val());
		if (isNaN(qtyForCough)) {
			alert("select COUGH range First");
			SetFocus("qtyForCough");
			return false;
		}
		var selectCoughTime = $("#selectCoughTime").val();
		if (selectCoughTime == 0) {
			alert("Select Cough Range Duration");
			SetFocus("selectCoughTime");
			return false;
		}
	} 
	else 
	{
		qtyForCough = 0;
	}

	var checkedYesForDyspnoea = ($('input:radio[name=dyspnoea]:checked').val());
	if (checkedYesForDyspnoea == "yes") {
		qtyForDyspnoea = parseInt($("#qtyForDyspnoea").val());
		if (isNaN(qtyForDyspnoea)) {
			alert("select DYSPNOEA range First");
			SetFocus("qtyForDyspnoea");
			return false;
		}
		var selectDyspnoeaTime = $("#selectDyspnoeaTime").val();
		if (selectDyspnoeaTime == 0) {
			alert("Select DYSPNOEA Range Duration");
			SetFocus("selectDyspnoeaTime");
			return false;
		}
	} else {
		qtyForDyspnoea = 0;
	}

	var checkedYesForGiddiness = ($('input:radio[name=giddiness]:checked')
			.val());
	if (checkedYesForGiddiness == "yes") {
		qtyForGiddiness = parseInt($("#qtyForGiddiness").val());
		if (isNaN(qtyForGiddiness)) {
			alert("select GIDDINESS range First");
			SetFocus("qtyForGiddiness");
			return false;
		}
		var selectGiddinessTime = $("#selectGiddinessTime").val();
		if (selectGiddinessTime == 0) {
			alert("Select GIDDINESS Range Duration");
			SetFocus("selectGiddinessTime");
			return false;
		}
	} else {
		qtyForGiddiness = 0;
	}

	var checkedYesForchestpain = ($('input:radio[name=chestpain]:checked')
			.val());
	if (checkedYesForchestpain == "yes") {
		qtyForChestPain = parseInt($("#qtyForChestPain").val());
		if (isNaN(qtyForChestPain)) {
			alert("select CHEST PAIN range First");
			SetFocus("qtyForChestPain");
			return false;
		}
		var selectChestPainTime = $("#selectChestPainTime").val();
		if (selectChestPainTime == 0) {
			alert("Select CHEST PAIN Range Duration");
			SetFocus("selectChestPainTime");
			return false;
		}
	} else {
		qtyForChestPain = 0;
	}
	
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

	todayDate = dd + '/' + mm + '/' + yyyy;
	
	var demo ={
//			preanaesthetic_ID:,
//			  ipd_no:,
			  bloodgroup:blood,
			  prevanaes_exp:prevexp,
			  pulse:pulse,
			  bp:bp,
			  resp:resp,
			  pallor:pallor,
			  icterus:ict,
			  cyanosis:cya,
			  club:club,
			  oedema:ode,
			  vein:veins,
			  obesity:obs,
			  neck:neck,
			  jaw:jaw,
			  teeth:teeth,
			  spine:spine,
			  bht:bht,
			  cvs:cvs,
			  rs:rs,
			  cns:cns,
			  hb:hb,
			  tc:tc,
			  pobj:p,
			  lobj:l,
			  eobj:e,
			  mobj:m,
			  boneobj:bone,
			  smear:smear,
			  platelet:plat,
			  esr:esr,
			  urine:urine,
			  bun:bun,
			  hiv:hiv,
			  bsl:bsl,
			  fobj:f,
			  ppobj:pp,
			  naElectolytes:naelec,
			  kElectolytes:kelec,
			  clElectolytes:clelec,
			  btwoobj:btwo,
			  ctobj:ct,
			  ptobj:pt,
			  screat:screat,
			  ecg:ecg,
			  other:otherh,
			  xray:xray,
			  risk_assess:riskassess,
			  proposed_plan:proplan,
			  pre_operativeinstuct:preoper,
			  pre_medication:premed,
			  indoor:indoor,
			  opd:opd,
			  crtdate:crtdate,
			  prosurgery:prosurgery,
			  strchk:strchk,
			  strradio:strradio,
			  tretID:tretID,
			  cType:cType,
			  patID:patID,
			  blood:blood,
			  status:status,
			  radio_anaesthetic_status:strradio,
			  chk_anaesthetic_status:strchk,
//			  proposedSurgery:,
//			  otherpresentmed:,
			  created_Date:todayDate,
			  txtPresMedOther:presentMedicationsOther,
			  coughQty:qtyForCough,
			  coughTime:selectCoughTime,
			  dyspnoeaQty:qtyForDyspnoea,
			  dyspnoeaTime:selectDyspnoeaTime,
			  giddinessQty:qtyForGiddiness,
			  giddinessTime:selectGiddinessTime,
			  chestPainQty:qtyForChestPain,
			  chestPainTime:selectChestPainTime,
			  queryType:queryType,
			  presentMedicationsOther:presentMedicationsOther
		
	};

	inputs.push('action=savePreAnaestheticDetails');
	inputs.push('queryType=' + queryType);
	inputs.push('presentMedicationsOther='
			+ encodeURIComponent(presentMedicationsOther));
	inputs.push('prevexp=' + encodeURIComponent(prevexp));
//	inputs.push('pulse=' + encodeURIComponent(pulse));
//	inputs.push('bp=' + encodeURIComponent(bp));
//	inputs.push('resp=' + encodeURIComponent(resp));
	inputs.push('pallor=' + encodeURIComponent(pallor));
	inputs.push('ict=' + encodeURIComponent(ict));
	inputs.push('cya=' + encodeURIComponent(cya));
	inputs.push('club=' + encodeURIComponent(club));
	inputs.push('ode=' + encodeURIComponent(ode));
	inputs.push('veins=' + encodeURIComponent(veins));
	inputs.push('obs=' + encodeURIComponent(obs));
	inputs.push('neck=' + encodeURIComponent(neck));
	inputs.push('jaw=' + encodeURIComponent(jaw));
	inputs.push('teeth=' + encodeURIComponent(teeth));
	inputs.push('spine=' + encodeURIComponent(spine));
	inputs.push('bht=' + encodeURIComponent(bht));
//	inputs.push('cvs=' + encodeURIComponent(cvs));
//	inputs.push('rs=' + encodeURIComponent(rs));
//	inputs.push('cns=' + encodeURIComponent(cns));
	inputs.push('hb=' + encodeURIComponent(hb));
	inputs.push('tc=' + encodeURIComponent(tc));
	inputs.push('p=' + encodeURIComponent(p));
	inputs.push('l=' + encodeURIComponent(l));
	inputs.push('e=' + encodeURIComponent(e));
	inputs.push('m=' + encodeURIComponent(m));
	inputs.push('bone=' + encodeURIComponent(bone));
	inputs.push('smear=' + encodeURIComponent(smear));
	inputs.push('plat=' + encodeURIComponent(plat));
	inputs.push('esr=' + encodeURIComponent(esr));
	inputs.push('urine=' + encodeURIComponent(urine));
	inputs.push('bun=' + encodeURIComponent(bun));
	inputs.push('hiv=' + encodeURIComponent(hiv));
	inputs.push('bsl=' + encodeURIComponent(bsl));
	inputs.push('f=' + encodeURIComponent(f));
	inputs.push('pp=' + encodeURIComponent(pp));
	inputs.push('naelec=' + encodeURIComponent(naelec));
	inputs.push('kelec=' + encodeURIComponent(kelec));
	inputs.push('clelec=' + encodeURIComponent(clelec));
	inputs.push('btwo=' + encodeURIComponent(btwo));
	inputs.push('ct=' + encodeURIComponent(ct));
	inputs.push('pt=' + encodeURIComponent(pt));
	inputs.push('screat=' + encodeURIComponent(screat));
	inputs.push('ecg=' + encodeURIComponent(ecg));
	inputs.push('xray=' + encodeURIComponent(xray));
	inputs.push('riskassess=' + encodeURIComponent(riskassess));
	inputs.push('proplan=' + encodeURIComponent(proplan));
	inputs.push('preoper=' + encodeURIComponent(preoper));
	inputs.push('other=' + encodeURIComponent(otherh));
//	inputs.push('indoor=' + encodeURIComponent(indoor));
	inputs.push('premed=' + encodeURIComponent(premed));
//	inputs.push('opd=' + encodeURIComponent(opd));
	inputs.push('crtdate=' + encodeURIComponent(crtdate));
//	inputs.push('prosurgery=' + encodeURIComponent(prosurgery));
	inputs.push('strchk=' + encodeURIComponent(strchk));
	inputs.push('other=' + encodeURIComponent(other));
	inputs.push('strradio=' + encodeURIComponent(strradio));
	inputs.push('tretID=' + tretID);
	inputs.push('cType=' + encodeURIComponent(cType));
	inputs.push('patID=' + patID);
	inputs.push('blood=' + encodeURIComponent(blood));

	inputs.push('qtyForCough=' + qtyForCough);
	inputs.push('selectCoughTime=' + selectCoughTime);
	inputs.push('qtyForDyspnoea=' + qtyForDyspnoea);
	inputs.push('selectDyspnoeaTime=' + selectDyspnoeaTime);
	inputs.push('qtyForGiddiness=' + qtyForGiddiness);
	inputs.push('selectGiddinessTime=' + selectGiddinessTime);
	inputs.push('qtyForChestPain=' + qtyForChestPain);
	inputs.push('selectChestPainTime=' + selectChestPainTime);
	
	demo = JSON.stringify(demo);
	
	

	// type
//	console.log(typeof(JsonObject));
//
//	// JsonObject
//	console.log(JsonObject);
	
	inputs1=[];
//	inputs1.push('savePreAnaestheticDetails='+ JsonObject);
	inputs1.push('savePreAnaestheticDetails='+ demo);
	

	var str = inputs1.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/savePreAnaestheticDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			//ajaxResponse = r;
			// $("#divIPDAjaxresponse").html(ajaxResponse);
			alert(r);
			// window.location.href = "prevOTAnaesthetic.jsp?";

		}
	});
}
function printPreAnaestheticReport() {
	var ajaxResponce = $("#divMyobj").html();
	userBean = eval('(' + ajaxResponce + ')');

	var str = "not applicable";

	var pobj = $("#divIPDAjaxresponse").val();
	pobj1 = eval('(' + pobj + ')');
	var fullname = userBean.tit + "   " + userBean.fn + "   " + userBean.ln;
	// var arrRL = (pobj1.preAnaestheticList[0].rstatus).split(",");
	// alert(arrRL);
	var WindowObject = window.open('', ' ', '');
	WindowObject.document.writeln('<html><body>');
	WindowObject.document
			.writeln('<style>.pictureBig {position:absolute; visibility:hidden; } ');
	WindowObject.document.writeln('</style>');
	var cough = "";
	var expect = "";
	var giddy = "";
	var chestpain = "";
	var value;
	var abc = [];
	var efg = "";
	// var arrCL = (pobj1.preAnaestheticList[0].cstatus).split(",");
	var date = "";
	var arrCL = []
	var preanesId = 0;
	if (pobj1.preAnaestheticList.length > 0) {
		date = pobj1.preAnaestheticList[0].crtdate;
		preanesId = pobj1.preAnaestheticList[0].ipdno;
	}
	for ( var i = 1; i < 16; i++) {
		// var arrCL = $('input[id=checkAppType' + (i) + ']').val();
		// var arrCL = $('input[name=checkAppType' + (i) + ']').val();

		// arrCL[i]="checkAppType" + i;
		// /alert(arrCL);
		if (checkAppType1.checked == true) {

			abc[1] = "images/Accept.png";

		} else
			abc[1] = "pictureBig";
		if (checkAppType2.checked == true) {

			abc[2] = "images/Accept.png";

		} else
			abc[2] = "pictureBig";
		if (checkAppType3.checked == true) {

			abc[3] = "images/Accept.png";

		} else
			abc[3] = "pictureBig";
		if (checkAppType4.checked == true) {

			abc[4] = "images/Accept.png";

		} else
			abc[4] = "pictureBig";
		if (checkAppType5.checked == true) {

			abc[5] = "images/Accept.png";

		} else
			abc[5] = "pictureBig";
		if (checkAppType6.checked == true) {

			abc[6] = "images/Accept.png";

		} else
			abc[6] = "pictureBig";
		if (checkAppType7.checked == true) {

			abc[7] = "images/Accept.png";

		} else
			abc[7] = "pictureBig";
		if (checkAppType8.checked == true) {

			abc[8] = "images/Accept.png";

		} else
			abc[8] = "pictureBig";
		if (checkAppType9.checked == true) {

			abc[9] = "images/Accept.png";

		} else
			abc[9] = "pictureBig";
		if (checkAppType10.checked == true) {

			abc[10] = "images/Accept.png";

		} else
			abc[10] = "pictureBig";
		if (checkAppType11.checked == true) {

			abc[11] = "images/Accept.png";

		} else
			abc[11] = "pictureBig";
		if (checkAppType12.checked == true) {

			abc[12] = "images/Accept.png";

		} else
			abc[12] = "pictureBig";
		if (checkAppType13.checked == true) {

			abc[13] = "images/Accept.png";

		} else
			abc[13] = "pictureBig";
		if (checkAppType14.checked == true) {

			abc[14] = "images/Accept.png";

		} else
			abc[14] = "pictureBig";
		if (checkAppType15.checked == true) {

			abc[15] = "images/Accept.png";

		} else
			abc[15] = "pictureBig";

	}

	/*
	 * for ( var i = 1; i < 3; i++) { if (arrRL[i] == 1) {
	 */
	cough = $('input[name=cough]:checked').val();
	if (cough == undefined)
		cough = "-";

	// alert(cough);
	// alert($('input[id=radAppType' + (i) + ']').val());
	/*
	 * } }
	 */
	/*
	 * for ( var i = 3; i < 5; i++) { if (arrRL[i] == 1) {
	 */
	expect = $('input[name=dry]:checked').val();
	if (expect == undefined)
		expect = "-";

	// alert($('input[id=radAppType' + (i) + ']').val());
	// }
	// }
	/*
	 * for ( var i = 5; i < 7; i++) { if (arrRL[i] == 1) {
	 */
	dys = $('input[name=dyspnoea]:checked').val();
	if (dys == undefined)
		dys = "-";

	// alert($('input[id=radAppType' + (i) + ']').val());
	// }
	// }
	/*
	 * for ( var i = 7; i < 9; i++) { if (arrRL[i] == 1) {
	 */
	giddy = $('input[name=giddiness]:checked').val();
	if (giddy == undefined)
		giddy = "-";

	// alert($('input[id=radAppType' + (i) + ']').val());
	// }
	// }
	/*
	 * for ( var i = 9; i < 11; i++) { if (arrRL[i] == 1) {
	 */
	chestpain = $('input[name=chestpain]:checked').val();
	if (chestpain == undefined)
		chestpain = "-";

	// alert($('input[id=radAppType' + (i) + ']').val());
	// }
	// }

	// alert(cough);
	WindowObject.document
			.write('<div style="width:100%; font-family: cablibri;font-size:14px;">');
	WindowObject.document
			.write('<div id="commonPatInfo" style="width: 100%;"><div style="width: 94%; padding-top: 1%; text-align: center; text-transform: capitalize; font-weight: bold; font-size:medium;">PRE-ANAESTHETICASSESSMENT</div>'
					+ '<div style="width: 100%; padding-top: 1%;"><div style="width: 33.33%;"><div style="width: 115.33%;float:left;">Registration Number:&nbsp;&nbsp;&nbsp;</div></div><div style="width: 23.33%;float:left;">'
					+ '<div style="width: 30.33%;float:left;">Indoor:</div></div><div style="width: 20.33%;float:left">OPD :&nbsp;&nbsp;&nbsp;</div><div style="width: 5.33%;float:left">Date :</div></div>'
					+ '<div style="width: 100%; padding-top: 1%;"><div style="width: 23.33%; padding-left: 35%;float:left;">'
					+ preanesId
					+ '</div><div style="width: 20.33%;float:left;">'
					+ str
					+ ''
					+ '</div><div style="width: 16.33%;float:left;">'
					+ date
					+ '</div></div>'
					+ '<div style="width: 100%;float:left;"><div style="width: 7%; padding-top: 1%;float:left;">Name:</div><div id="name" style="width:18%; padding-top: 1%;float:left;">'
					+ fullname + '</div></div>');
	WindowObject.document
			.write('<div style="width: 56%; padding-top: 1%;padding-right:53px;"><div style="width: 22.5%;float:left;padding-right:11px;">Age :'
					+ userBean.ag
					+ '&nbsp;Yrs</div><div style="width: 2.5%; padding-left: 1%;float:left;"></div><div style="width: 24.6%;float:left;padding-left:36px;">Gender:'
					+ userBean.sx
					+ '</div><div id="sex" style="width: 16.66%;float:left;"></div><div style="width: 18.5%;float:left;">Weight:'
					+ userBean.objTreat.wt
					+ '&nbsp;&nbsp;Kg.</div><div id="weight" style="width: 60.5%;float:left;"></div><div style="width: 12.5%; padding-right: 8%;float:left;"></div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%;"><div style="width: 70%;"><div style="width: 48%; padding-top: 1%;">Doctor Incharge:'
					+ userBean.admit + '</div></div></div>');
	WindowObject.document
			.write('<div style="width: 68%;float:left;"><div style="width: 27%;float:left; padding-top: 1%;">ReferredBy:'
					+ userBean.rb
					+ '</div><div style="width: 50%; float: left; padding-top: 1%;">Type:&nbsp;'
					+ userBean.rt + '</div></div>');
	WindowObject.document
			.write('<div style="width: 50%; padding-top: 1%;">Surgery Proposed:&nbsp;'
					+ $("#prosurgery").val());
	WindowObject.document
			.write('<div style="width: 100%;">_______________________________________________________________________________________</div>');
	WindowObject.document
			.write('<div style="width: 186%; padding-top: 1%; text-align: center; text-transform: capitalize; font-weight: bold; font-size: medium;">MEDICAL HISTORY</div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 10px;" id="appTyp">COMPLAINTS</div>');
	// WindowObject.document.write('<div style="width:
	// 35.5%;float:left;">COUGH:&nbsp;'+cough+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+expect+'</div><div
	// style="width: 35.5%;float:left;">DYSPNOEA:&nbsp;&nbsp;'+dys+'<div
	// style="width:28.5%;float:left;">GIDDINESS:&nbsp;&nbsp;'+giddy+'</div>');
	// WindowObject.document.write('<div style="width: 39.5%; float:
	// left;">COUGH:&nbsp;'+cough+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+expect+'</div><div
	// style="width: 32.5%; float: left;">DYSPNOEA:&nbsp;&nbsp;'+dys+'</div><div
	// style="width: 11.5%; float:
	// left;">GIDDINESS:&nbsp;&nbsp;'+giddy+'</div>');
	WindowObject.document
			.write('<div style="width: 180%; padding-top: 1%;"><div style="width: 29.5%; float: left;">COUGH:&nbsp;'
					+ cough
					+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
					+ expect
					+ '</div><div style="width: 22.5%; float: left;">DYSPNOEA:&nbsp;&nbsp;'
					+ dys
					+ '</div><div style="width: 19.5%; float: left;">GIDDINESS:&nbsp;&nbsp;'
					+ giddy
					+ '</div><div style="width: 28.5%; float: left;">CHEST PAIN:&nbsp;&nbsp;'
					+ chestpain + '</div></div>');
	WindowObject.document
			.write('<div style="width: 200%; padding-top: 10px;" id="appTyp"><p><div style="width: 32%;float: left;" name="checkAppType1" id="checkAppType1"><img class='
					+ abc[1]
					+ ' src='
					+ abc[1]
					+ ' id="test" width="20px;" height="20px;" />&nbsp;H/O:HYPERTENSION</div><div style="width:38%;float: left;" name="checkAppType2" id="checkAppType2"><img class='
					+ abc[2]
					+ ' src='
					+ abc[2]
					+ ' width="20px;" height="20px;" />&nbsp;IHD COAGULATION DEFECT</div><div style="width: 16%;float: left;" name="checkAppType3" id="checkAppType3"><img class='
					+ abc[3]
					+ ' src='
					+ abc[3]
					+ ' width="20px;" height="20px;" />&nbsp;JAUNDICE</div><div style="width: 23%;float: left;" name="checkAppType4" id="checkAppType4"><img class='
					+ abc[4]
					+ ' src='
					+ abc[4]
					+ ' width="20px;" height="20px;" />DIABETES</div></p></div>');
	WindowObject.document
			.write('<div style="width: 200%; padding-top: 10px;" id="appTyp"><div style="width:9%;"></div><div style="width: 24%;float: left; padding-top:1.0%">&nbsp;OTHER:&nbsp;&nbsp;'
					+ pobj1.preanalist[0].other
					+ '</div><div style="width: 26%;float: left; padding-top:1.0%" name="checkAppType5" id="checkAppType5"><img class='
					+ abc[5]
					+ ' src='
					+ abc[5]
					+ ' width="20px;" height="20px;" />&nbsp;HOSPITALISATION </div><div style="width:30%;float: left;"  name="checkAppType6" id="checkAppType6"><img class='
					+ abc[6]
					+ ' src='
					+ abc[6]
					+ ' width="20px;" height="20px;" />&nbsp;BLOOD TRANSFUSION </div><div style="width: 28%;float: left;"  name="checkAppType7" id="checkAppType7"><img class='
					+ abc[7]
					+ ' src='
					+ abc[7]
					+ ' width="20px;" height="20px;" />&nbsp;ALLERGY </div></div><div style="width: 24%;float: left;"></div>');
	WindowObject.document
			.write('<div style="width: 190%; padding-top: 10px;" id="appTyp"><div style="width: 24%; float: left;"><img class='
					+ abc[8]
					+ ' src='
					+ abc[8]
					+ ' width="20px;" height="20px;" />&nbsp;SMOKING</div><div style="width: 24%; float: left;"><img class='
					+ abc[9]
					+ ' src='
					+ abc[9]
					+ ' width="20px;" height="20px;" />&nbsp;ALCOHOL</div><div style="width: 28%; float: left;"><img class ='
					+ abc[10]
					+ '  src='
					+ abc[10]
					+ ' width="20px;" height="20px;" />&nbsp;TOBACCO</div></div>');
	WindowObject.document
			.write('<div style="width: 100%;">_______________________________________________________________________________________</div>');
	WindowObject.document
			.write('<div style="width: 186%; padding-top: 1%; text-align: center; text-transform: capitalize; font-weight: bold; font-size: medium;">PRESENT MEDICATIONS</div>');
	WindowObject.document
			.write('<div style="width: 200%; padding-top: 10px;" id="appTyp"><div style="width: 24%; float: left;" name="checkAppType8" id="checkAppType8"><img class='
					+ abc[11]
					+ ' src='
					+ abc[11]
					+ ' width="20px;" height="20px;" />&nbsp;Dilanatin Phenobarb</div><div style="width: 28%; float: left;" name="checkAppType9" id="checkAppType9"><img class='
					+ abc[12]
					+ ' src='
					+ abc[12]
					+ ' width="20px;" height="20px;" />&nbsp;Steroids Anti hypertensive </div><div style="width: 28%; float: left;" name="checkAppType10" id="checkAppType10"><imgclass='
					+ abc[13]
					+ ' src='
					+ abc[13]
					+ ' width="20px;" height="20px;" />&nbsp;Anti coagulants</div></div>');
	WindowObject.document
			.write('<div style="width: 187%; padding-top: 10px;" id="appTyp"><div style="width: 24%; float: left;" name="checkAppType11" id="checkAppType11"><img class='
					+ abc[14]
					+ ' src='
					+ abc[14]
					+ ' width="20px;" height="20px;" />&nbsp;Anti Arrythmics </div><div style="width: 24%; float: left;" name="checkAppType12" id="checkAppType12"><img class='
					+ abc[15]
					+ ' src='
					+ abc[15]
					+ ' width="20px;" height="20px;" />&nbsp;Other</div></div>');
	WindowObject.document
			.write('<div style="width: 50%; float: left; padding-top: 1%;"></div><div style="width: 55%; padding-top: 1%;">PREVIOUS ANAESTHETIC EXPERIENCE:&nbsp;'
					+ pobj1.preanalist[0].prevexp + '</div>');
	WindowObject.document
			.write('<div style="width: 100%;">_______________________________________________________________________________________</div>');
	WindowObject.document
			.write('<div style="width: 187%; padding-top: 1%; text-align: center; text-transform: capitalize; font-weight: bold; font-size: medium;">EXAMINATION FINDINGS</div>');
	WindowObject.document
			.write('<div style="width: 150%; padding-top: 2%;"><div style="width: 9%;"></div><div style="width: 25%;float: left;">Pulse:&nbsp;'
					+ $("#pulse").val()
					+ '/min</div>'
					+ '<div style="width:18%; float: left;">BP:&nbsp;'
					+ $("#bp").val()
					+ 'mm Hg.</div><div style="width: 16.63%; float: left;">Resp:&nbsp;'
					+ $("#resp").val()
					+ '/min</div><div style="width: 12.63%; float: left;">Pallor:&nbsp;'
					+ $("#pallor").val()
					+ '</div>'
					+ '<div style="width: 13.63%; float: left;">Icterus:&nbsp;'
					+ $("#ict").val()
					+ '</div><div style="width: 14.63%; float: left;">Cyanosis:&nbsp;'
					+ $("#cya").val()
					+ '</div><div style="width: 6.63%; float: left;">Clubbing:&nbsp;'
					+ $("#club").val() + '</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 2%;"><div style="width: 38.33%;  float: left;">Oedema:&nbsp;'
					+ $("#ode").val()
					+ '/min</div><div style="width: 38.33%; float: left;">Veins:&nbsp;'
					+ $("#veins").val()
					+ '/min</div><div style="width: 42.33%; float: left;">Obesity:&nbsp;'
					+ $("#obs").val() + '/min</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 2%;"><div style="width: 33.33%;  float: left;">Neck:&nbsp;'
					+ $("#neck").val()
					+ '/min</div><div style="width: 33.33%; float: left;">Jaw:&nbsp;'
					+ $("#jaw").val()
					+ '/min</div><div style="width: 33.33%; float: left;">Teeth:&nbsp;'
					+ $("#teeth").val() + '/min</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 2%;"><div style="width: 50%;  float: left;">Spine:&nbsp;'
					+ $("#spine").val()
					+ '</div><div style="width: 50%; float: left;">BHT:&nbsp;'
					+ $("#bht").val() + '/min</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 2%;"><div style="width: 33.33%;  float: left;">CVS:&nbsp;'
					+ $("#cvs").val()
					+ '/min</div><div style="width: 33.33%; float: left;">RS:&nbsp;'
					+ $("#rs").val()
					+ '/min</div><div style="width: 33.33%; float: left;">CNS:&nbsp;'
					+ $("#cns").val() + '/min</div></div>');
	WindowObject.document
			.write('<div style="width: 100%;">_______________________________________________________________________________________</div>');
	WindowObject.document
			.write('<div style="width: 185%; padding-top: 1%; text-align: center; text-transform: capitalize; font-weight: bold; font-size: medium;">INVESTIGATIONS</div>');
	WindowObject.document
			.write('<div style="width: 200%; padding-top: 2%;"><div style="width: 9%;"></div><div style="width: 13%; float: left;">Hb:&nbsp;'
					+ $("#hb").val()
					+ '&nbsp;&nbsp;gms%</div><div style="width:6%; float: left;">TC:&nbsp;'
					+ $("#tc").val()
					+ '</div>'
					+ '<div style="width: 5.63%; float: left;">P:&nbsp;'
					+ $("#p").val()
					+ '</div><div style="width: 5.63%; float: left;">L:&nbsp;'
					+ $("#l").val()
					+ '</div><div style="width: 5.63%; float: left;">E:&nbsp;'
					+ $("#e").val()
					+ '</div><div style="width: 6.63%; float: left;">M:&nbsp;'
					+ $("#m").val()
					+ '</div><div style="width: 6.63%; float: left;">B:&nbsp;'
					+ $("#bone").val()
					+ '</div>'
					+ '<div style="width: 9.63%; float: left;">Smear:&nbsp;'
					+ $("#smear").val()
					+ '</div><div style="width: 10.63%; float: left;">Platelets:&nbsp;'
					+ $("#plat").val()
					+ '</div><div style="width: 11.63%; float: left;">ESR:&nbsp;'
					+ $("#esr").val()
					+ 'mm</div><div style="width: 18.63%; float: left;">Blood Group:&nbsp;'
					+ $("#blood").val() + '</div></div>');
	WindowObject.document
			.write('<div style="width: 150%; padding-top: 2%;"><div style="width: 33.33%;  float: left;">Urine:&nbsp;'
					+ $("#urine").val()
					+ '/min</div><div style="width: 33.33%; float: left;">BUN:&nbsp;'
					+ $("#bun").val()
					+ '/min</div><div style="width: 33.33%; float: left;">HIV:&nbsp;'
					+ $("#hiv").val() + '/min</div></div><br>');
	WindowObject.document
			.write('<div style="width: 200%; padding-top: 2%;"><div style="width: 5%;"></div><p><div style="width:15%; float: left;">BSL(R):&nbsp;'
					+ $("#bsl").val()
					+ 'mg %</div><div style="width: 15%; float: left;">(F):&nbsp;'
					+ $("#f").val()
					+ 'mm %</div>'
					+ '<div style="width: 15%; float: left;">(PP):&nbsp;'
					+ $("#pp").val()
					+ 'mg %</div><div style="width: 23%; float: left;">S.Electrolytes Na+:&nbsp;'
					+ $("#naelec").val()
					+ '</div>'
					+ '<div style="width: 10%; float: left;">K+:&nbsp;'
					+ $("#kelec").val()
					+ '</div><div style="width: 10%; float: left;">Cl.&nbsp;'
					+ $("#clelec").val() + '</div></div></p>');

	WindowObject.document
			.write('<div style="width: 150%; padding-top: 2%;"><div style="width: 9%;"></div><div style="width: 29%; float: left;">B:&nbsp;'
					+ $("#btwo").val()
					+ '</div>'
					+ '<div style="width: 26%; float: left;">CT:&nbsp;'
					+ $("#ct").val()
					+ '</div><div style="width: 22.63%; float: left;">PT:&nbsp;'
					+ $("#pt").val()
					+ '</div><div style="width: 14.63%; float: left;">S.Creat:&nbsp;'
					+ $("#screat").val() + '</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 2%;"><div style="width: 50%; float: left;">ECG:&nbsp;'
					+ $("#ecg").val()
					+ '</div><div style="width: 50%; float: left;">X Ray Chest:&nbsp;'
					+ $("#xray").val() + '</div></div>');
	// WindowObject.document
	// .write('<div style="width: 100%; padding-top: 2%;"><div style="width:
	// 50%; float: left;">Other:&nbsp;'
	// + pobj1.preanalist[0].othmed + '</div></div>');
	// WindowObject.document
	// .write('<div style="width: 100%; padding-top: 6%;"><div style="width:
	// 76%; float: left;">RISK ASSESSMENT:ASA:&nbsp;'
	// + pobj1.preanalist[0].risk + '</div></div>');
	// WindowObject.document
	// .write('<div style="width: 100%; padding-top: 7%;"><div style="width:
	// 50%; float: left;">PROPOSED PLAN OF ANAESTHESIA:&nbsp;'
	// + pobj1.preanalist[0].proplan + '</div></div>');
	// WindowObject.document
	// .write('<div style="width: 100%; padding-top: 6%;"><div style="width:
	// 52%; float: left;">PRE-OPERATIVE INSTRUCTION:&nbsp;'
	// + pobj1.preanalist[0].preoper + '</div></div>');
	// WindowObject.document
	// .write('<div style="width: 100%; padding-top: 6%;"><div style="width:
	// 50%; float: left;">PRE MEDICATION:&nbsp;'
	// + pobj1.preanalist[0].premed + '</div></div>');

	WindowObject.document
			.write('<table style="width:100%"><tr style="width: 100%; padding-top: 1%;"><td style="width: 50%; float: left;">Other:&nbsp;</td><td>'
					+ $("#other").val()
					+ '</td></tr>'
					+ '<tr style="width: 25%; padding-top: 1%;"><td style="width: 77%; float: left;">RISK ASSESSMENT:ASA:&nbsp;</td><td>'
					+ $("#riskassess").val()
					+ '</td></tr>'
					+ '<tr style="width: 25%; padding-top: 1%;"><td style="width: 100%; float: left;">PROPOSED PLAN OF ANAESTHESIA:&nbsp;</td><td>'
					+ $("#proplan").val()
					+ '</td></tr>'
					+ '<tr style="width: 25%; padding-top: 1%;"><td style="width: 95%; float: left;">PRE-OPERATIVE INSTRUCTION:&nbsp;</td><td>'
					+ $("#preoper").val()
					+ '</td></tr>'
					+ '<tr style="width: 25%; padding-top: 1%;"><td style="width: 76%; float: left;">PRE MEDICATION:&nbsp;</td><td>'
					+ $("#premed").val() + '</td></tr></table>');

	WindowObject.document
			.write('<div style="width: 100%;">_______________________________________________________________________________________</div>');
	WindowObject.document
			.write('<div style="width: 107%;float:left;"><div style="width: 42%; padding-top: 1%;padding-left:52.2%;float:left;">Name of Anaesthesiologist Performing PAA:&nbsp;&nbsp;</div><div id="anaesname" style="width: 8%;padding-left:1%; padding-top: 1%;float:left;">'
					+ pobj1.preanalist[0].doctorlist[0].dn + '</div></div>');

	WindowObject.print('');
	WindowObject.document.writeln('</body></html>');
	WindowObject.document.write('</div>');
	// $("#test").attr("src", "images/Accept.png");
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.close();

}

function toRemoveDivOTAnaesthetic() {
	var r = confirm("You Want to Cancel This Conduct Anaesthesia Record?");
	if (r == true) {
		var hiddenRowCount = $("#RowCountOrder").val();
		var rowCount = hiddenRowCount;
		// alert(rowCount);
		var allVals = [];
		for ( var n = 1; n <= rowCount; n++) {

			var $radios = $('input:checkbox[id=checkbox' + n + ']');
			if ($radios.is(':checked') == true) {
				idVitalSlave = $("#idVitalSlave" + n).val();
				if (idVitalSlave != 0) {
					allVals.push(idVitalSlave);
					cancelConductAnaesthesiaRecord(allVals);
					$("#divo" + n).remove();
				} else {
					$("#divo" + n).remove();
				}

			}
		}
	}
}

function cancelConductAnaesthesiaRecord(allVals) {

	var inputs = [];
	inputs.push('action=cancelcancelConductAnaesthesia');
	inputs.push('allVals=' + allVals);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			location.reload();
		}
	});
}
function saveConductAnaesthesia() {
	var listconductAnaesObj = 0;
	listconductAnaesObj = {
		vitallist : []
	};

	var count = 0;
	var rowCount = $("#addRowCount").val();

	for ( var i = 1; i <= rowCount; i++) {
		count++;
		var chkval = $('#checkboxo' + i).attr('checked') ? 1 : 0;

		var time = $("#txtTime" + count + "").val();
		var pulse = encodeURIComponent($("#txtPulse" + count + "").val());
		var sao2 = encodeURIComponent($("#txtSao2" + count + "").val());
		var sobj = encodeURIComponent($("#txtS" + count + "").val());
		var dobj = encodeURIComponent($("#txtD" + count + "").val());
		var mobj = encodeURIComponent($("#txtM" + count + "").val());
		var rrobj = encodeURIComponent($("#txtRR" + count + "").val());
		var uoobj = encodeURIComponent($("#txtUO" + count + "").val());
		var fone = encodeURIComponent($("#txtOne" + count + "").val());
		var ftwo = encodeURIComponent($("#txtTwo" + count + "").val());
		var etco2 = encodeURIComponent($("#txtEtco2" + count + "").val());
		var empty = encodeURIComponent($("#txtempty" + count + "").val());
		var infuse = encodeURIComponent($("#txtinfuse" + count + "").val());
		var bolus = encodeURIComponent($("#txtBolus" + count + "").val());
		var event = encodeURIComponent($("#txtEvent" + count + "").val());
		var idvital = encodeURIComponent($("#idVitalSlave" + count + "").val());

		if (time == "" && pulse == "" && sao2 == "" && sobj == "" && dobj == ""
				&& mobj == "" && rrobj == "" && uoobj == "" && fone == ""
				&& ftwo == "" && etco2 == "" && empty == "" && infuse == ""
				&& bolus == "" && event == "") {

			alert("You cannot save empty fields!!");
			return false;
		} else if (time != undefined) {
			listconductAnaesObj.vitallist.push({

				"ttime" : time,
				"tpulse" : pulse,
				"sao2" : sao2,
				"bps" : sobj,
				"bpd" : dobj,
				"bpm" : mobj,
				"trr" : rrobj,
				"etco2" : etco2,
				"uo" : uoobj,
				"fluone" : fone,
				"flutwo" : ftwo,
				"empty" : empty,
				"infuse" : infuse,
				"bolus" : bolus,
				"event" : event,
				"idvital" : idvital
			});
		}

	}
	var treatmentID = $("#tretID").html();
	// alert("treatmentID..."+treatmentID);

	var strchk1 = "";
	for ( var i = 1; i <= 27; i++) {
		chk1 = ($("#checkAppTypeForConduct" + i)).is(':checked') ? 1 : 0;
		strchk1 = strchk1 + "," + chk1;
	}
	var strchk2 = "";
	for ( var i = 1; i <= 18; i++) {
		chk2 = ($("#checkApplTypeForConduct" + i)).is(':checked') ? 1 : 0;
		strchk2 = strchk2 + "," + chk2;
	}
	date = $("#date").val();
	if (date == "") {
		alert("Please enter date!!");
		return false;
	}
	listconductAnaesObj = JSON.stringify(listconductAnaesObj);
	var inputs = [];
	//inputs.push('action=saveConductAnaesthesia');
	inputs.push('queryType=' + $("#queryType").val());
	inputs.push('listconductAnaesObj=' + listconductAnaesObj);
	inputs.push('tretID=' + $("#tretID").html());
	inputs.push('txtInduction=' + encodeURIComponent($("#txtInduction").val()));
	inputs.push('txtRelax=' + encodeURIComponent($("#txtRelax").val()));
	inputs.push('txtOPPulse=' + encodeURIComponent($("#txtOPPulse").val()));
	inputs.push('txtOPBp=' + encodeURIComponent($("#txtOPBp").val()));
	inputs.push('txtOPRr=' + encodeURIComponent($("#txtOPRr").val()));
	inputs.push('txtOPColor=' + encodeURIComponent($("#txtOPColor").val()));
	inputs.push('txtReversal=' + encodeURIComponent($("#txtReversal").val()));
	inputs.push('date=' + date);
	inputs.push('strchk1=' + encodeURIComponent(strchk1));
	inputs.push('strchk2=' + encodeURIComponent(strchk2));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/approval/saveConductAnaesthesia",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			myArray = JSON.parse(ajaxResponse);
			if (undefined == myArray.conductlist[0]
					|| (myArray.conductlist[0] == ""))
				alert("false");
			$("#queryType").val('update');
		}
	});

}

function viewConductAssessment(pid) {

	var treatID = null;
	ajaxResponse = $("#opObject").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];
			treatID = myArray.pl[i].trid;
			break;
		}
		// setOperationDetails();
	}
	myObj = JSON.stringify(myObj);
	// operationobj = eval('(' + myObj + ')');
	window.location.href = "ConductAnaesthesia.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&treatID=" + treatID;

}

function createDivOTAnaesthetic() {
	var rowcount = 0;
	// ar hiddenRowCount = document.getElementById("RowCount");
	var rowCount = $("#addRowCount").val();

	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "divo" + rowCount;

	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	x.setAttribute('style', 'width: 50%;');
	document.getElementById("testDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<td style="width: 3.65%; ">'
			+ '<input style="width: 100%;" type="text" '
			+ '	onmouseover="click2(this)" value="" readonly="readonly" id="txtTime'
			+ rowCount
			+ '">'
			+ '</td>'
			+ '<td style="width: 3.75%; border-bottom: 0px solid;">'
			+ '	<input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtPulse'
			+ rowCount
			+ '">'
			+ '	</td>'
			+ '<td style="width: 3%; ">'
			+ '	<input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtSao2'
			+ rowCount
			+ '">'
			+ '	</td>'
			+ '<td style="width: 0.6%; text-align: center;"><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtS'
			+ rowCount
			+ '"></td>'
			+ '<td'
			+ '	style="width: 0.6%; text-align: center;"><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtD'
			+ rowCount
			+ '"></td>'
			+ '<td'
			+ '	style="width: 0.6%; text-align: center;"><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtM'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 3.65%; "><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtRR'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 3.75%; "><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtEtco2'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 3.65%; "><input style="width: 100%;" type="text" maxlength="45" id="txtUO'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 0.7%; text-align: center;"><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtOne'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 0.7%; text-align: center;">	<input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtTwo'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 2.5%; "><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtempty'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 1.7%; text-align: center;"><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtinfuse'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 1.25%; text-align: center;"><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtBolus'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 2.15%;"><input style="width: 100%;" type="text" maxlength="45" class="auto"'
			+ '	id="txtEvent'
			+ rowCount
			+ '"></td>'
			+ '<td style="width: 0.33%;"><input type="checkbox" id="checkbox'
			+ rowCount
			+ '" /></td>'
			+ '	<input id="idVitalSlave'
			+ rowCount
			+ '" type="hidden" value="0"></tr>';

	$('#txtTime' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 15
	});

	$("#addRowCount").val(rowCount);
	$("#RowCountOrder").val(i);
	i++;

	// $(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");

}

var fetchConductAnaesthesia = '{#foreach $T.conductlist[0].vitalslave as vitalslave}'
		+ '<tr id="div{count}" style="width: 100%; height: 28px;">'
		+ '<td style="width: 3.65%; ">'
		+ '<input style="width: 100%;" type="text"  class="demo" onmouseover="click1()"  id="txtTime{count}" value="{$T.vitalslave.ttime}"/></td>'
		+ '<td style="width: 3.75%; border-bottom: 0px solid;">'
		+ '<input style="width: 100%;" type="text"  class="auto" id="txtPulse{count}" value="{$T.vitalslave.tpulse}"/></td>'
		+ '<td style="width: 3%; ">'
		+ '<input style="width: 100%;" type="text"  class="auto" id="txtSao2{count}" value="{$T.vitalslave.sao2}" /></td>'
		+ '<td style="width: 0.6%; text-align: center;">'
		+ '<input style="width: 100%;" type="text"  class="auto" id="txtS{count}" value="{$T.vitalslave.bps}" /></td>'
		+ '<td style="width: 0.6%; text-align: center;">'
		+ '<input style="width: 100%;" type="text"  class="auto" id="txtD{count}" value="{$T.vitalslave.bpd}" /></td>'
		+ '<td style="width: 0.6%; text-align: center;">'
		+ '<input style="width: 100%;" type="text"  class="auto" id="txtM{count}" value="{$T.vitalslave.bpm}" /></td>'
		+ '<td style="width: 3.65%; ">'
		+ '<input style="width: 100%;" type="text"  class="auto" id="txtRR{count}" value="{$T.vitalslave.trr}" /></td>'
		+ '<td style="width: 3.75%; ">'
		+ '<input style="width: 100%;" type="text"   class="auto" id="txtEtco2{count}" value="{$T.vitalslave.etco2}" /></td>'
		+ '<td style="width: 3.65%; ">'
		+ '<input style="width: 100%;" type="text"   id="txtUO{count}" value="{$T.vitalslave.uo}" /></td>'
		+ '<td style="width: 0.7%; text-align: center;">'
		+ '<input style="width: 100%;" type="text" class="auto"  id="txtOne{count}" value="{$T.vitalslave.fluone}" /></td>'
		+ '<td style="width: 0.7%; text-align: center;">'
		+ '<input style="width: 100%;" type="text" class="auto"  id="txtTwo{count}" value="{$T.vitalslave.flutwo}" /></td>'
		+ '<td style="width: 2.5%; ">'
		+ '<input style="width: 100%;" type="text" class="auto"  id="txtempty{count}" value="{$T.vitalslave.empty}" /></td>'
		+ '<td style="width: 1.7%; text-align: center;">'
		+ '<input style="width: 100%;" type="text" class="auto"  id="txtinfuse{count}" value="{$T.vitalslave.infuse}" /></td>'
		+ '<td style="width: 1.25%; text-align: center;">'
		+ '<input style="width: 100%;" type="text" class="auto"  id="txtBolus{count}" value="{$T.vitalslave.bolus}" /></td>'
		+ '<td style="width: 2.15%;">'
		+ '<input style="width: 100%;" type="text" class="auto"  id="txtEvent{count}" value="{$T.vitalslave.event}" /></td>'
		+ '<td style="width: 0.33%;">'
		+ '<input type="checkbox"  id="checkbox{count}" value="{$T.vitalslave.idvital}" /></td>'
		+ '<input id="idVitalSlave{count}" name="idVitalSlave{count++}" type="hidden" value="{$T.vitalslave.idvital}"></tr>'
		+ '{#/for}<input id="addRowCount" name="addRowCount" type="hidden" value="{--count}">';

/*function fetchConductAnaesthesiaHistory(type) {
	// alert("type..."+type);
	var anaesID = "";
	count = 1;
	var tretID = $("#tretID").html();
	if(tretID == undefined){
		tretID = $("#tId").val();
	}
	var inputs = [];
	//inputs.push('action=fetchAddConductAnaesthesia');
	inputs.push('tretID=' + tretID);
	inputs.push('anaesID=' + anaesID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/fetchAddConductAnaesthesia",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var ajaxResponse = r;
			// alert(ajaxResponse);
			$("#divIPDAjaxresponse").html(ajaxResponse);
			var pobj = eval('(' + ajaxResponse + ')');
			if (pobj.conductlist.length > 0) {
				if (pobj.conductlist[0].chkanaes != undefined) {
					var arrCL1 = (pobj.conductlist[0].chkanaes).split(",");
					for ( var i = 1; i < arrCL1.length; i++) {
						(arrCL1[i] == 1) ? $(
								'input[id=checkAppTypeForConduct' + (i) + ']')
								.attr('checked', true) : $(
								'input[id=checkAppTypeForConduct' + (i) + ']')
								.attr('checked', false);

					}
					var arrCL2 = (pobj.conductlist[0].chkpostop).split(",");
					for ( var i = 1; i < arrCL2.length; i++) {
						(arrCL2[i] == 1) ? $(
								'input[id=checkApplTypeForConduct' + (i) + ']')
								.attr('checked', true) : $(
								'input[id=checkApplTypeForConduct' + (i) + ']')
								.attr('checked', false);

					}
				}
				$("#queryType").val('update');

				$("#txtInduction").val(pobj.conductlist[0].induct);
				$("#txtRelax").val(pobj.conductlist[0].relax);
				$("#txtOPPulse").val(pobj.conductlist[0].postpulse);
				$("#txtOPBp").val(pobj.conductlist[0].postbp);
				$("#txtOPRr").val(pobj.conductlist[0].postrr);
				$("#txtOPColor").val(pobj.conductlist[0].postcolor);
				$("#date").val(pobj.conductlist[0].date);
				$("#txtReversal").val(pobj.conductlist[0].reversal);
				$("#preOfNotes").val(pobj.conductlist[0].preOfNotes);
				$("#approvalRemark").val(pobj.conductlist[0].remark);
				$("#approvalStatus").val(pobj.conductlist[0].approvalStatus);
				if (pobj.conductlist[0].approvalStatus == "approval") {
					$("#approval").prop('checked', true);
					$("#idConductOfAnaesthiaTab").show();
					if (type == "save" || type == "onload") {
						$("#idSaveVitalsOfConductAnaesthesiaBTN").show();
						$("#idSaveConductAnaesthesiaBTN").show();
						$("#idPrintConductAnaesthesiaBTN").show();
						$("#idAnaesthesiaApprovalTab").css("background-color",
								"white");
				//		$("#idConductOfAnaesthiaTab").css("background-color","#ffbbad");
					} else {
					//	$("#idConductOfAnaesthiaTab").css("background-color","white");
					}
				} else {
					$("#disapproval").prop('checked', true);
					$("#approvalStatus").val("disApproval");
				}
			} else {
				$("#queryType").val('insert');
			}
		}
	});

}*/
var divIPDAjaxresponse="";
function fetchConductAnaesthesiaHistory(type) {
	// alert("type..."+type);
	var anaesID = "";
	count = 1;
	var tretID = $("#tretID").html();
	if(tretID == undefined){
		tretID = $("#tId").val();
	}
	var inputs = [];
	//inputs.push('action=fetchAddConductAnaesthesia');
	inputs.push('tretID=' + tretID);
	inputs.push('anaesID=' + anaesID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/fetchAddConductAnaesthesia",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var ajaxResponse = r;
			// alert(ajaxResponse);
			$("#divIPDAjaxresponse").html(ajaxResponse);
			divIPDAjaxresponse = JSON.stringify(r);
			var pobj = eval('(' + ajaxResponse + ')');
			if (pobj.conductanaesthesialist.length > 0) {
				if (pobj.conductanaesthesialist[0].chk_anesthesia != undefined) {
					var arrCL1 = (pobj.conductanaesthesialist[0].chk_anesthesia).split(",");
					for ( var i = 1; i < arrCL1.length; i++) {
						(arrCL1[i] == 1) ? $(
								'input[id=checkAppTypeForConduct' + (i) + ']')
								.attr('checked', true) : $(
								'input[id=checkAppTypeForConduct' + (i) + ']')
								.attr('checked', false);

					}
					var arrCL2 = (pobj.conductanaesthesialist[0].chkpostoperative).split(",");
					for ( var i = 1; i < arrCL2.length; i++) {
						(arrCL2[i] == 1) ? $(
								'input[id=checkApplTypeForConduct' + (i) + ']')
								.attr('checked', true) : $(
								'input[id=checkApplTypeForConduct' + (i) + ']')
								.attr('checked', false);

					}
				}
				$("#queryType").val('update');

				$("#txtInduction").val(pobj.conductanaesthesialist[0].induction);
				$("#txtRelax").val(pobj.conductanaesthesialist[0].relaxant);
				$("#txtOPPulse").val(pobj.conductanaesthesialist[0].postOPpulse);
				$("#txtOPBp").val(pobj.conductanaesthesialist[0].postOPbp);
				$("#txtOPRr").val(pobj.conductanaesthesialist[0].postOPrr);
				$("#txtOPColor").val(pobj.conductanaesthesialist[0].postOPcolor);
				var date = pobj.conductanaesthesialist[0].date;
				var date2 = date.replaceAll('-','/');
				$("#date").val(date2);
				$("#txtReversal").val(pobj.conductanaesthesialist[0].reversal);
				$("#preOfNotes").val(pobj.conductanaesthesialist[0].preOfNotes);
				$("#approvalRemark").val(pobj.conductanaesthesialist[0].remark);
				$("#approvalStatus").val(pobj.conductanaesthesialist[0].approvalStatus);
				if (pobj.conductanaesthesialist[0].approvalStatus == "approval") {
					$("#approval").prop('checked', true);
					$("#idConductOfAnaesthiaTab").show();
					if (type == "save" || type == "onload") {
						$("#idSaveVitalsOfConductAnaesthesiaBTN").show();
						$("#idSaveConductAnaesthesiaBTN").show();
						$("#idPrintConductAnaesthesiaBTN").show();
						$("#idAnaesthesiaApprovalTab").css("background-color",
								"white");
				//		$("#idConductOfAnaesthiaTab").css("background-color","#ffbbad");
					} else {
					//	$("#idConductOfAnaesthiaTab").css("background-color","white");
					}
				} else {
					$("#disapproval").prop('checked', true);
					$("#approvalStatus").val("disApproval");
				}
			} else {
				$("#queryType").val('insert');
			}
		}
	});

}

function printConductAnaesthesia() {
//	var ajaxResponce = $("#divIPDAjaxresponse").html();
	//var ajaxResponce = demo3;
	userBean1 =divIPDAjaxresponse;
	var userBean2 = eval('(' + userBean1 + ')');
	var userBean = eval('(' + userBean2 + ')');
	var WindowObject = window.open('', ' ', '');
	WindowObject.document.writeln('<html><body>');
	WindowObject.document
			.writeln('<style>.pictureBig {position:absolute; visibility:hidden; } ');
	WindowObject.document.writeln('</style>');

	var trr = [];
	var efg = "";
	var hij = []
	var der = "";
	if (userBean.conductanaesthesialist.length > 0) {
		var date = userBean.conductanaesthesialist[0].date;
		var induction = userBean.conductanaesthesialist[0].induction;
		var relax = userBean.conductanaesthesialist[0].relaxant;
		var postpulse = userBean.conductanaesthesialist[0].postOPpulse;
		var postbp = userBean.conductanaesthesialist[0].postOPbp;
		var postrr = userBean.conductanaesthesialist[0].postOPrr;
		var postcolor = userBean.conductanaesthesialist[0].postOPcolor;
//		var anaes1 = userBean.conductanaesthesialist[0].doctorlist[0].dn;
//		if (undefined != userBean.conductanaesthesialist[0].doctorlist[1])
//			var anaes2 = userBean.conductanaesthesialist[0].doctorlist[1].dn;
	}
	// var arrCL = (userBean.conductlist[0].chkanaes).split(",");
	var arrCl = [];
	// alert(arrCL);
	for ( var i = 1; i < 27; i++) {
		// alert(arrCL[i]);
		// arrCL="checkAppType" + i;
		if ($("#checkAppType1").checked == true) {
			trr[1] = "images/Accept.png";

		}
		if ($("#checkAppType2").checked == true) {
			trr[2] = "images/Accept.png";

		}
		if ($("#checkAppType3").checked == true) {
			trr[3] = "images/Accept.png";

		}
		if ($("#checkAppType4").checked == true) {
			trr[4] = "images/Accept.png";

		}
		if ($("#checkAppType5").checked == true) {
			trr[5] = "images/Accept.png";

		}
		if ($("#checkAppType6").checked == true) {
			trr[6] = "images/Accept.png";

		}
		if ($("#checkAppType7").checked == true) {
			trr[7] = "images/Accept.png";

		}
		if ($("#checkAppType8").checked == true) {
			trr[8] = "images/Accept.png";

		}
		if ($("#checkAppType9").checked == true) {
			trr[9] = "images/Accept.png";

		}
		if ($("#checkAppType10").checked == true) {
			trr[10] = "images/Accept.png";

		}
		if ($("#checkAppType11").checked == true) {
			trr[11] = "images/Accept.png";

		}
		if ($("#checkAppType12").checked == true) {
			trr[12] = "images/Accept.png";

		}
		if ($("#checkAppType13").checked == true) {
			trr[13] = "images/Accept.png";

		}
		if ($("#checkAppType14").checked == true) {
			trr[14] = "images/Accept.png";

		}
		if ($("#checkAppType15").checked == true) {
			trr[15] = "images/Accept.png";

		}
		if ($("#checkAppType16").checked == true) {
			trr[16] = "images/Accept.png";

		}
		if ($("#checkAppType17").checked == true) {
			trr[17] = "images/Accept.png";

		}
		if ($("#checkAppType18").checked == true) {
			trr[18] = "images/Accept.png";

		}
		if ($("#checkAppType19").checked == true) {
			trr[19] = "images/Accept.png";

		}
		if ($("#checkAppType20").checked == true) {
			trr[20] = "images/Accept.png";

		}
		if ($("#checkAppType21").checked == true) {
			trr[21] = "images/Accept.png";

		}
		if ($("#checkAppType22").checked == true) {
			trr[22] = "images/Accept.png";

		}
		if ($("#checkAppType23").checked == true) {
			trr[23] = "images/Accept.png";

		}
		if ($("#checkAppType24").checked == true) {
			trr[24] = "images/Accept.png";

		}
		if ($("#checkAppType25").checked == true) {
			trr[25] = "images/Accept.png";

		} else {

			trr[i] = "pictureBig";
		}

	}
	var arrLM = [];
	for ( var i = 1; i < 19; i++) {
		arrLM[i] = "checkApplType" + i;
		if ($("#checkAppType1").checked == true) {
			hij[1] = "images/Accept.png";
			der = hij[1];
		}
		if ($("#checkAppType2").checked == true) {
			hij[2] = "images/Accept.png";
			der = hij[2];
		}
		if ($("#checkAppType3").checked == true) {
			hij[3] = "images/Accept.png";
			der = hij[3];
		}
		if ($("#checkAppType4").checked == true) {
			hij[4] = "images/Accept.png";
			der = hij[4];
		}

		if ($("#checkAppType5").checked == true) {
			hij[5] = "images/Accept.png";
			der = hij[5];
		}
		if ($("#checkAppType6").checked == true) {
			hij[6] = "images/Accept.png";
			der = hij[6];
		}
		if ($("#checkAppType7").checked == true) {
			hij[7] = "images/Accept.png";
			der = hij[7];
		}
		if ($("#checkAppType8").checked == true) {
			hij[8] = "images/Accept.png";
			der = hij[8];
		}
		if ($("#checkAppType9").checked == true) {
			hij[9] = "images/Accept.png";
			der = hij[9];
		}
		if ($("#checkAppType10").checked == true) {
			hij[10] = "images/Accept.png";
			der = hij[10];
		}
		if ($("#checkAppType11").checked == true) {
			hij[11] = "images/Accept.png";
			der = hij[11];
		}
		if ($("#checkAppType12").checked == true) {
			hij[12] = "images/Accept.png";
			der = hij[12];
		}
		if ($("#checkAppType13").checked == true) {
			hij[13] = "images/Accept.png";
			der = hij[13];
		}
		if ($("#checkAppType14").checked == true) {
			hij[14] = "images/Accept.png";
			der = hij[14];
		}
		if ($("#checkAppType15").checked == true) {
			hij[15] = "images/Accept.png";
			der = hij[15];
		}
		if ($("#checkAppType16").checked == true) {
			hij[16] = "images/Accept.png";
			der = hij[16];
		}
		if ($("#checkAppType17").checked == true) {
			hij[17] = "images/Accept.png";
			der = hij[17];
		}
		if ($("#checkAppType18").checked == true) {
			hij[18] = "images/Accept.png";
			der = hij[18];
		} else
			hij[i] = "pictureBig";

	}
	WindowObject.document
			.write('<div style="width:100%; font-family: cablibri;font-size:14px;">');
	WindowObject.document
			.write('<div id="commonPatInfo" style="width: 100%;">');
	WindowObject.document
			.write('	<div style="width: 17%; float:right;">Date:&nbsp;'
					+ $("#date").val() + '</div>');
	WindowObject.document.write('</div>');
	WindowObject.document
			.write('<div	style="width: 94%; padding-top: 1%; text-align: center; text-transform: capitalize; font-weight: bold; font-size: medium;">CONDUCT OF ANAESTHESIA</div>');
	WindowObject.document
			.write('<br></br><div style="width: 100%;">Surgeon-Dr</div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 20%;float:left; " name="checkAppType1" id="checkAppType1">Anesthesia: <img class='
					+ trr[1]
					+ ' src='
					+ trr[1]
					+ ' id="test" width="20px;" height="20px;" />&nbsp;GA</div>');
	WindowObject.document
			.write('<div style="width: 10%;float:left; " name="checkAppType2" id="checkAppType2"><img class='
					+ trr[2]
					+ ' src='
					+ trr[2]
					+ ' id="test" width="20px;" height="20px;" />&nbsp;SA </div>');
	WindowObject.document
			.write('<div style="width: 12%;float:left; " name="checkAppType3" id="checkAppType3"><img class='
					+ trr[3]
					+ ' src='
					+ trr[3]
					+ ' width="20px;" height="20px;" />&nbsp;CSE </div>');
	WindowObject.document
			.write('<div style="width: 19%;float:left; " name="checkAppType4" id="checkAppType4"><img class='
					+ trr[4]
					+ ' src='
					+ trr[4]
					+ ' width="20px;" height="20px;" />&nbsp;Epidural Blook </div>');
	WindowObject.document
			.write('<div style="width: 10%;float:left; " name="checkAppType5" id="checkAppType5"><img class='
					+ trr[5]
					+ ' src='
					+ trr[5]
					+ ' width="20px;" height="20px;" />&nbsp;LA </div>');
	WindowObject.document
			.write('<div style="width: 12%;float:left; " name="checkAppType6" id="checkAppType6"><img class='
					+ trr[6]
					+ ' src='
					+ trr[6]
					+ ' width="20px;" height="20px;" />&nbsp;TIVA </div>');
	WindowObject.document
			.write('<div style="width: 12%;float:left; " name="checkAppType7" id="checkAppType7"><img class='
					+ trr[7]
					+ ' src='
					+ trr[7]
					+ ' width="20px;" height="20px;" />&nbsp; Block </div></div><br>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 25%;float:left; " name="checkAppType8" id="checkAppType8"> Regional: <img class='
					+ trr[8]
					+ ' src='
					+ trr[8]
					+ ' width="20px;" height="20px;" />&nbsp;Drug</div>');
	WindowObject.document
			.write('<div style="width: 22%;float:left; " name="checkAppType9" id="checkAppType9"><img class='
					+ trr[9]
					+ ' src='
					+ trr[9]
					+ ' width="20px;" height="20px;" />&nbsp;Needle</div>');
	WindowObject.document
			.write('<div style="width: 25%;float:left; " name="checkAppType10" id="checkAppType10"><img class='
					+ trr[10]
					+ ' src='
					+ trr[10]
					+ ' width="20px;" height="20px;" />&nbsp;Catheter</div></div>');
	WindowObject.document
			.write('<div style="width: 50%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 30%;float:left; " name="checkAppType11" id="checkAppType11"><img class='
					+ trr[11]
					+ ' src='
					+ trr[11]
					+ ' width="20px;" height="20px;" />&nbsp;Space</div>');
	WindowObject.document
			.write('<div style="width: 25%;float:left; " name="checkAppType12" id="checkAppType12"><img class='
					+ trr[12]
					+ ' src='
					+ trr[12]
					+ ' width="20px;" height="20px;" />&nbsp;Position</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float:left;"><div style="width: 20%; float: left;">GA</div><div style="width: 25%; float: left;">PRE MEDICATION</div><div style="width: 25%; float: left;"></div><div style="width: 25%; float: left;"></div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%;"><div style="width: 25%; float: left;">Induction:'
					+ $("#txtInduction").val()
					+ '</div><div style="width: 25%; float: left;">&nbsp;&nbsp;</div><div style="width: 6%; float: left;">&nbsp;&nbsp;</div><div style="width: 22%; float: left;">Relaxant:'
					+ $("#txtRelax").val() + '</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 23%;float:left; " name="checkAppType13" id="checkAppType13">Maintenance:<img class='
					+ trr[13]
					+ ' src='
					+ trr[13]
					+ ' width="20px;" height="20px;" />&nbsp;N20</div>');
	WindowObject.document
			.write('<div style="width: 9%;float:left; " name="checkAppType14" id="checkAppType14"><img class='
					+ trr[14]
					+ ' src='
					+ trr[14]
					+ ' width="20px;" height="20px;" />&nbsp;02 </div>');
	WindowObject.document
			.write('<div style="width: 11%;float:left; " name="checkAppType15" id="checkAppType15"><img class='
					+ trr[15]
					+ ' src='
					+ trr[15]
					+ ' width="20px;" height="20px;" />&nbsp;Air</div>');
	WindowObject.document
			.write('<div style="width: 19%;float:left; " name="checkAppType16" id="checkAppType16"><img class='
					+ trr[16]
					+ ' src='
					+ trr[16]
					+ ' width="20px;" height="20px;" />&nbsp;Halothane</div>');
	WindowObject.document
			.write('<div style="width: 19%;float:left; " name="checkAppType17" id="checkAppType17"><img class='
					+ trr[17]
					+ ' src='
					+ trr[17]
					+ ' width="20px;" height="20px;" />&nbsp;Isoflunane</div>');
	WindowObject.document
			.write('<div style="width: 15%;float:left; " name="checkAppType18" id="checkAppType18"><img class='
					+ trr[18]
					+ ' src='
					+ trr[18]
					+ ' width="20px;" height="20px;" />&nbsp;Sevoflunane</div></div><br>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 28%;float:left; " name="checkAppType19" id="checkAppType19">Anaesthesia Circuit:<img class='
					+ trr[19]
					+ ' src='
					+ trr[19]
					+ ' width="20px;" height="20px;" />&nbsp;Open</div>');
	WindowObject.document
			.write('<div style="width: 12%;float:left; " name="checkAppType20" id="checkAppType20"><img class='
					+ trr[20]
					+ ' src='
					+ trr[20]
					+ ' width="20px;" height="20px;" />&nbsp;Circle </div>');
	WindowObject.document
			.write('<div style="width: 12%;float:left; " name="checkAppType21" id="checkAppType21"><img class='
					+ trr[21]
					+ ' src='
					+ trr[21]
					+ ' width="20px;" height="20px;" />&nbsp;NRB</div>');
	WindowObject.document
			.write('<div style="width: 12%;float:left; " name="checkAppType22" id="checkAppType22"><img class='
					+ trr[22]
					+ ' src='
					+ trr[22]
					+ ' width="20px;" height="20px;" />&nbsp;Bain </div>');
	WindowObject.document
			.write('<div style="width: 19%;float:left; " name="checkAppType23" id="checkAppType23"><img class='
					+ trr[23]
					+ ' src='
					+ trr[23]
					+ ' width="20px;" height="20px;" />&nbsp;Laryngeal Mask</div></div><br>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 35%;float:left; " name="checkAppType24" id="checkAppType24"> Ventilation:<img class='
					+ trr[24]
					+ ' src='
					+ trr[24]
					+ ' width="20px;" height="20px;" />&nbsp;Spontaneous</div>');
	WindowObject.document
			.write('<div style="width: 22%;float:left; " name="checkAppType25" id="checkAppType25"><img class='
					+ trr[25]
					+ ' src='
					+ trr[25]
					+ ' width="20px;" height="20px;" />&nbsp;Controlled</div>');
	WindowObject.document
			.write('<div style="width: 25%;float:left; " name="checkAppType26" id="checkAppType26"><img class='
					+ trr[26]
					+ ' src='
					+ trr[26]
					+ ' width="20px;" height="20px;" />&nbsp;Auto </div></div>');

	var rowCount = $("#RowCountOrder").val();
	// alert(rowCount);
	var z = 1;

	WindowObject.document
			.writeln('<div style="width: 100%;float:left;"><br></br><br></br><table style="width: 100%; border: 1.2px solid;" cellspacing="0"					cellpadding="0">					<tr						style="width: 50%;  padding: 1%; font-weight: bold; margin-top: 1%;">						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid; text-align: center;">Time</td>						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid; text-align: center;">Pulse/m</td>						<td							style="width: 4%; border-right: 1.2px solid; border-bottom: 1.2px solid; text-align: center;">SaO2%</td>						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid; text-align: center;"							colspan="3">B.P.mm Hg.</td>						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid; text-align: center;">RR/min</td>						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid;  text-align: center;">EtCO2%</td>						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid;  text-align: center;">U.O</td>						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid;  text-align: center;"							colspan="2">IV Fluid</td>						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid;"							colspan="3">.</td>						<td							style="width: 5%; border-right: 1.2px solid; border-bottom: 1.2px solid;  text-align: center;">Events</td>					</tr>					<tr style="width: 50%;">						<td style="width: 5.33%; border-right: 1.2px solid;">.</td>						<td							style="width: 3.33%; border-right: 1.2px solid; border-bottom: 0px solid;">.</td>						<td							style="width: 3.33%; border-right: 1.2px solid; border-bottom: 0px solid;">.</td>						<td							style="width: 1.33%; border-right: 1.2px solid; border-bottom: 0px solid; text-align: center;">S</td>						<td							style="width: 1.33%; border-right: 1.2px solid; border-bottom: 0px solid; text-align: center;">D</td>						<td							style="width: 1.33%; border-right: 1.2px solid; border-bottom: 0px solid; text-align: center;">M</td>						<td							style="width: 3.33%; border-right: 1.2px solid; border-bottom: 0px solid;">.</td>						<td							style="width: 3.33%; border-right: 1.2px solid; border-bottom: 0px solid;">.</td>						<td							style="width: 3.33%; border-right: 1.2px solid; border-bottom: 0px solid;">.</td>						<td							style="width: 1.33%; border-right: 1.2px solid; border-bottom: 0px solid; text-align: center;">I</td>						<td							style="width: 1.33%; border-right: 1.2px solid; border-bottom: 0px solid; text-align: center;">II</td>						<td							style="width: 3.33%; border-right: 1.2px solid; border-bottom: 0px solid;">.</td>						<td							style="width: 1.33%; border-right: 1.2px solid; border-bottom: 0px solid; text-align: center;">Infusion</td>						<td							style="width: 1.33%; border-right: 1.2px solid; border-bottom: 0px solid; text-align: center;">Bolus</td>						<td							style="width: 3.33%; border-right: 1.2px solid; border-bottom: 0px solid;"></td>					</tr>');

	for ( var i = 1; i <= rowCount; i++) {
		if ($("#txtTime" + i).val() != undefined)
			WindowObject.document
					.writeln('<div style="width: 100%;pading-top:2%;float:left; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float:left;" id="tableContentcomp"></div><tbody><tr>'
							// + (z++)
							+ '<td width="96%" align="center" style="border: 1px solid;float:left;">'
							+ $("#txtTime" + i).val()
							+ '</td><td  width="15%" style="border: 0.2px solid;" align="center"> '
							+ $("#txtPulse" + i).val()
							+ '</td><td width=15%" style="border: 0.2px solid;" align="center"> '
							+ $("#txtSao2" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtS" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtD" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtM" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtRR" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtEtco2" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtUO" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtOne" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtTwo" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtempty" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtinfuse" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtBolus" + i).val()
							+ '</td><td width="15%"  style="border: 0.2px solid;" align="center">'
							+ $("#txtEvent" + i).val()

							+ '</td></div>');

	}
	WindowObject.document
			.writeln('<td><tr><div style="width:15% float:left;"></div></td></tr></table>');
	WindowObject.document
			.writeln('<br></br><div style="width: 94%; padding-top: 1%; text-align: left; text-transform: capitalize; font-weight: bold; font-size: medium;">REVERSAL</div>');
	WindowObject.document.writeln($("#txtReversal").val());

	WindowObject.document
			.writeln('<br></br><div style="width: 94%; padding-top: 1%; text-align: left; text-transform: capitalize; font-weight: bold; font-size: medium;">POST OPERATIVE</div>');
	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 1%;"><div style="width: 28%; float: left;">Post Operative:Pulse :'
					+ $("#txtOPPulse").val()
					+ '&nbsp;/min</div><div style="width: 22%; float: left;">B.P '
					+ $("#txtOPBp").val()
					+ '&nbsp;Mm Hg.</div><div style="width: 20%; float: left;">R.R '
					+ $("#txtOPRr").val()
					+ '&nbsp;/min.</div><div style="width: 25%; float: left;">Color&nbsp;'
					+ $("#txtOPColor").val() + '&nbsp;&nbsp;</div></div>');

	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width:38%;float: left;" name="checkApplType1" id="checkApplType1">Recovery:<img class='
					+ hij[1]
					+ ' src='
					+ hij[1]
					+ ' width="20px;" height="20px;" />&nbsp;Cough Reflex</div>');
	WindowObject.document
			.write('<div style="width:38%;float: left;" name="checkApplType2" id="checkApplType2"><img class='
					+ hij[2]
					+ ' src='
					+ hij[2]
					+ ' width="20px;" height="20px;" />&nbsp;Eyes Opening</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width:38%;float: left;" name="checkApplType3" id="checkApplType3">State of Consciousness:<img class='
					+ hij[3]
					+ ' src='
					+ hij[3]
					+ ' width="20px;" height="20px;" />&nbsp;Pain Perception</div>');
	WindowObject.document
			.write('<div style="width:38%;float: left;" name="checkApplType4" id="checkApplType4"><img class='
					+ hij[4]
					+ ' src='
					+ hij[4]
					+ ' width="20px;" height="20px;" />&nbsp;Motor Response</div></div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 25%;float:left; " name="checkApplType5" id="checkApplType5"><img class='
					+ hij[5]
					+ ' src='
					+ hij[5]
					+ ' width="20px;" height="20px;" />&nbsp;Obeys Command</div>');
	WindowObject.document
			.write('<div style="width: 22%;float:left; " name="checkApplType6" id="checkApplType6"><img class='
					+ hij[6]
					+ ' src='
					+ hij[6]
					+ ' width="20px;" height="20px;" />&nbsp;Verbal Response</div>');
	WindowObject.document
			.write('<div style="width: 25%;float:left; " name="checkApplType7" id="checkApplType7"><img class='
					+ hij[7]
					+ ' src='
					+ hij[7]
					+ ' width="20px;" height="20px;" />&nbsp;Fully Awake</div></div>');

	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 32%;float:left; " name="checkApplType8" id="checkAppType8">Post Op.Problems:<img class='
					+ hij[8]
					+ ' src='
					+ hij[8]
					+ ' width="20px;" height="20px;" />&nbsp;Sore throat</div>');
	WindowObject.document
			.write('<div style="width: 15%;float:left; " name="checkApplType9" id="checkApplType9"><img class='
					+ hij[9]
					+ ' src='
					+ hij[9]
					+ ' width="20px;" height="20px;" />&nbsp;Urine Ret  </div>');
	WindowObject.document
			.write('<div style="width: 15%;float:left; " name="checkApplType10" id="checkApplType10"><img class='
					+ hij[10]
					+ ' src='
					+ hij[10]
					+ ' width="20px;" height="20px;" />&nbsp;Nausea</div>');
	WindowObject.document
			.write('<div style="width: 15%;float:left; " name="checkApplType11" id="checkApplType11"><img class='
					+ hij[11]
					+ ' src='
					+ hij[11]
					+ ' width="20px;" height="20px;" />&nbsp;Vomiting  </div>');
	WindowObject.document
			.write('<div style="width: 20%;float:left; " name="checkApplType12" id="checkApplType12"><img class='
					+ hij[12]
					+ ' src='
					+ hij[12]
					+ ' width="20px;" height="20px;" />&nbsp;Thrombophlebitis  </div><br>');
	WindowObject.document
			.write('<div style="width:46%"><div style="width: 26%;float:left; " name="checkApplType13" id="checkApplType13"><img class='
					+ hij[13]
					+ ' src='
					+ hij[13]
					+ ' width="20px;" height="20px;" />&nbsp;Headache</div>');
	WindowObject.document
			.write('<div style="width: 33%;float:left; " name="checkApplType14" id="checkApplType14"><img class='
					+ hij[14]
					+ ' src='
					+ hij[14]
					+ ' width="20px;" height="20px;" />&nbsp;Backache</div>');
	WindowObject.document
			.write('<div style="width: 10%;float:left; " name="checkApplType15" id="checkApplType15"><img class='
					+ hij[15]
					+ ' src='
					+ hij[15]
					+ ' width="20px;" height="20px;" />&nbsp;Other</div></div></div><br>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%; float: left;">');
	WindowObject.document
			.write('<div style="width: 35%;float:left; " name="checkApplType16" id="checkApplType16">Consumers Opinion:<img class='
					+ hij[16]
					+ ' src='
					+ hij[16]
					+ ' width="20px;" height="20px;" />&nbsp;Pleasant</div>');
	WindowObject.document
			.write('<div style="width: 25%;float:left; " name="checkApplType17" id="checkApplType17"><img class='
					+ hij[17]
					+ ' src='
					+ hij[17]
					+ ' width="20px;" height="20px;" />&nbsp;Unpleasant </div>');
	WindowObject.document
			.write('<div style="width: 25%;float:left; " name="checkApplType18" id="checkApplType18"><img class='
					+ hij[18]
					+ ' src='
					+ hij[18]
					+ ' width="20px;" height="20px;" />&nbsp;Nightmarish </div></div>');

	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%;"><div style="width: 98%;">Remarks:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Anaesthesiologists					Conducting Anaesthesia</div>			</div>');

	WindowObject.document
			.write('<div style="width: 100%; padding-top: 1%;">										<div style="width: 5%; float: left;padding-left: 10%">1)Name:</div>					<div id="anaesname1" style="width: 20%; float: left;padding-left: 1%">&nbsp;&nbsp;&nbsp;&nbsp;'
					+// anaes1
					+ '</div>									<div style="width: 6%; float: left;padding-left: 10%">2)Name:</div>						<div id="anaesname2" style="width: 20%; float: left;padding-left: 0%">&nbsp;&nbsp;&nbsp;&nbsp;'
					+ /*anaes2*/ + '</div>				</div>');
	WindowObject.document
			.write('<div style="width: 100%; padding-top: 0%;"><div style="width: 25%; float: left;">&nbsp;&nbsp;</div><div style="width: 25%; float: left;padding-left:10%; padding-top: 1%;">Signature</div>					<div style="width: 11%; float: left;">&nbsp;&nbsp;</div>					<div style="width: 25%; float: left;padding-top: 1%;">Signature</div>				</div>');

	//Vital start 
	
	var VitalData = $('#vitalNewDiaTableUI').html();
	WindowObject.document.write('<br> <br>  <br> <br>  <br> <br>');
	WindowObject.document.write('Vitals :<br/>  <table class="table  table-bordered"> '+VitalData+'</table>');
	
	WindowObject.document.write();
	WindowObject.print('');
	WindowObject.document.writeln('</body></html>');
	WindowObject.document.write('</div>');
	// $("#test").attr("src", "images/Accept.png");
	WindowObject.document.close();
	WindowObject.focus();
	WindowObject.close();

}

function fetchPreviousConductAnaesthesiaHistory() {
	count = 1;
	var conductID = $("#ConductID").html();

	var inputs = [];
	inputs.push('action=fetchPrevAddConductAnaesthesia');
	inputs.push('conductID=' + conductID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {

			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#divIPDAjaxresponse").html(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');
			$("#testDiv").setTemplate(fetchConductAnaesthesia);
			$("#testDiv").processTemplate(pobj);
			$("#RowCountOrder").val(--count);
			if (pobj.conductlist.length > 0) {

				var arrCL1 = (pobj.conductlist[0].chkanaes).split(",");
				for ( var i = 1; i < arrCL1.length; i++) {
					(arrCL1[i] == 1) ? $('input[id=checkAppType' + (i) + ']')
							.attr('checked', true) : $(
							'input[id=checkAppType' + (i) + ']').attr(
							'checked', false);

				}
				var arrCL2 = (pobj.conductlist[0].chkpostop).split(",");
				for ( var i = 1; i < arrCL2.length; i++) {
					(arrCL2[i] == 1) ? $('input[id=checkApplType' + (i) + ']')
							.attr('checked', true) : $(
							'input[id=checkApplType' + (i) + ']').attr(
							'checked', false);

				}

				$("#queryType").val('update');

				$("#txtInduction").val(pobj.conductlist[0].induct);
				$("#txtRelax").val(pobj.conductlist[0].relax);
				$("#txtOPPulse").val(pobj.conductlist[0].postpulse);
				$("#txtOPBp").val(pobj.conductlist[0].postbp);
				$("#txtOPRr").val(pobj.conductlist[0].postrr);
				$("#txtOPColor").val(pobj.conductlist[0].postcolor);
				$("#date").val(pobj.conductlist[0].date);
				// $("#txtTime").val(pobj.listIpdHisMaster[0].ttime);

			} else {

				$("#queryType").val('insert');
			}
		}
	});
}

function splitProducts(tmp) {
	setTimeout(function() {
		var prod = $("#txtEqName" + tmp).val();
		var prods = prod.split("_");
		$("#txtEqName" + tmp).val(prods[0]);
		$("#tempQnt").val(prods[2]);
		$("#tempId").val(prods[1]);
	}, 500);
}
function addConsumable(addValue, rowcount) {
	var flag1 = 0;
	var eq = $("#txtEqName" + rowcount).val();
	var qty = $("#txtEqQty" + rowcount).val();
	var qnt = $("#tempQnt").val();
	var id = $("#tempId").val();
	if (qty == 0) {
		alert("Please Enter Valid Quantity");
		return false;
	}

	if (eq == "" && qty1 == "") {
		alert("Please enter Equipment and quantity.");
		return false;
	} else if (eq !== "" && qty1 == "") {
		alert("Please enter  quantity.");
		return false;
	} else {
		if (parseFloat(qty) > parseFloat(qnt)) {
			alert("Entered Quantity is not Available !");
			return false;
		}
		var qty1 = qty;

		// add for iterate sub operations loop.
		for ( var k = 1; k <= rowcount; k++) {
			$('#txtEquipmet' + k).find('option').each(function() {
				var eqpt = $(this).html().split("-");
				var eqptdetails = $(this).val();

				// alert(eqptdetails);
				if (eqpt[0] == eq) {
					if (eqptdetails != 'value') {
						qty1 = parseInt(eqpt[1]) + parseInt(qty);
						if (parseFloat(qty1) > parseFloat(qnt)) {
							alert("Entered Quantity is not availabe !");
							flag1 = 1;
							return false;
						}
						var add = eq + "-" + qty1 + "_" + id + "\n";
						var prod = id + "-" + qty1;

						$('#txtEquipmet' + k).html(add);
						$('#txtEquipmet' + k).val(prod);

						$("#txtEqName" + rowcount).val("");
						$("#txtEqQty" + rowcount).val("");

						flag1 = 2;
					} else {
						// qty1 = parseInt(eqpt[1]) + parseInt(qty);
					}

				}
			});

			if (flag1 == 0) {

				var add = eq + "-" + qty1 + "_" + id + "\n";
				var prod = id + "-" + qty1;
				var o = new Option("option text", "value");
				$(o).html(add);
				$(o).val(prod);
				$("#txtEquipmet" + rowcount).append(o);
			}
		}
	}
}

function RemoveConsumable() {
	$('#txtEquipmet1 option:selected').remove();
}

function splitQty(type) {
	// setTimeout(function() {
	var byName = $("#txtEqName" + type + "1").val();
	var arr = byName.split("_");
	$("#txtEqName" + type + "1").val(arr[0]);
	$("#txtEqNamei1TestID").val(arr[1]);
	$("#invProdID").val(arr[1]);
	$("#tempQnt").val(arr[2]);
	// }, 500);
}

function addIpdServices(type, rowcount) {
	var flag = 0;
	var docid = $("#txtEqName" + type + rowcount).val();
	var eqpQty = $("#txtEqQty" + type + rowcount).val();
	var tempQty = $("#tempQnt").val();
	if (eqpQty == 0) {
		alert("Please Enter Valid Quantity");
		return false;
	}
	if (parseFloat(eqpQty) > parseFloat(tempQty)) {
		alert("Sufficient quantity not available !");
		return false;
	}
	if (docid == "") {
		alert("Please Select Service.");
		return false;
	} else if (eqpQty == "") {
		alert("Please Enter Quantity");
		return false;
	}
	var qnt = tempQty;
	var qty1 = 0;
	$('#txtEquipmet' + type + rowcount).find('option').each(function() {
		var eqpt = $(this).html().split("-");
		var eqptdetails = $(this).val().split("-");

		// alert(eqpt);
		var strId = eqptdetails[1].split("_");
		var id = strId[1];

		if (eqpt[0] == docid && id == 0) {
			qty1 = parseInt(strId[0]) + qty1;

			/*
			 * var add = eq + "-" + qty1 + "_" + id + "\n"; var prod = id + "-" +
			 * qty1;
			 * 
			 * $(this).html(add); $(this).val(prod);
			 * 
			 * $("#txtEqName" + rowcount).val(""); $("#txtEqQty" +
			 * rowcount).val("");
			 */
			/*
			 * var add = eqpt[0] + "-" + qty1 + '\n'; $(this).html(add) $(
			 * "#txtEqName" + rowcount) .val(""); $( "#txtEqQty" + rowcount)
			 * .val("");
			 */
			// alert("Equipment is
			// present
			// in list");
		}
	});
	qty1 = qty1 + parseInt(eqpQty);
	if (parseFloat(qty1) > parseFloat(qnt)) {
		alert("Entered Quantity not Available !");
		flag = 1;
		return false;
	} else {
		flag = 0;
	}
	// alert(flag);
	if (flag == 0) {
		var docname;
		var doctorid;
		var strdocid = docid.split("_");

		docname = strdocid[0] + "-" + eqpQty + '\n';
		doctorid = $("#invProdID").val() + "-" + eqpQty + "_0" + '\n';

		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(docname);
		$(o).val(doctorid);
		// $(0).val();
		$("#txtEquipmet" + type + rowcount).append(o);
	}
	$("#txtEqName" + type + rowcount).val("");
	$("#txtEqQty" + type + rowcount).val("");

}

function am_pm_to_hours(time) {
	console.log(time);
	var hours = Number(time.match(/^(\d+)/)[1]);
	var minutes = Number(time.match(/:(\d+)/)[1]);
	var AMPM = time.match(/\s(.*)$/)[1];
	if (AMPM == "pm" && hours < 12)
		hours = hours + 12;
	if (AMPM == "am" && hours == 12)
		hours = hours - 12;
	var sHours = hours.toString();
	var sMinutes = minutes.toString();
	if (hours < 10)
		sHours = "0" + sHours;
	if (minutes < 10)
		sMinutes = "0" + sMinutes;
	return (sHours + ':' + sMinutes);
}

function showPopUp() {
	$(".popup").show();

	var events = new Array();
	// var ajaxResponse=$("#opObject").html();
	var ajaxResponse = $("#OTdata").val();
	if (ajaxResponse != "") {
		pobj = eval('(' + ajaxResponse + ')');

		var ajaxResponseOTNames = $("#divOTName").html();
		var pobjOTNames = eval('(' + ajaxResponseOTNames + ')');

		var idDateDetails = ($("#idTourDateDetails").val()).split("/");
		var arrTempDate = [];
		arrTempDate.push(idDateDetails[0]);
		arrTempDate.push(idDateDetails[1]);
		arrTempDate.push(idDateDetails[2]);

		var otName2 = $("#otName2").val();
		for ( var i = 0; i < pobj.pl.length; i++) {
			var otid = pobj.pl[i].listTop[0].otid;
			if (otName2 == otid) {

				var color = "red";
				for ( var j = 0; j < pobjOTNames.liot.length; j++) {
					if (otid == pobjOTNames.liot[j].otid) {
						color = pobjOTNames.liot[j].color;
						// alert(color);
					}
				}

				var st = pobj.pl[i].listTop[0].st;// am_pm_to_hours(pobj.pl[i].listTop[0].st)+":00";
				var et = pobj.pl[i].listTop[0].et;// am_pm_to_hours(pobj.pl[i].listTop[0].et)+":00";

				var appStartTime = st;
				var patientName;
				patientName = pobj.pl[i].tit + pobj.pl[i].fn + ' '
						+ pobj.pl[i].ln;
				var appTimeStart;
				var tempTime;
				if (appStartTime % 1 != 0) {
					var arrAppStartTime = appStartTime.toString().split('.');
					if (arrAppStartTime[0] < 10) {
						tempTime = "0" + arrAppStartTime[0];
					} else {
						tempTime = arrAppStartTime[0];
					}
					appTimeStart = tempTime;
				} else {
					if (appStartTime < 10) {
						tempTime = "0" + appStartTime;
					} else {
						tempTime = appStartTime;
					}
					appTimeStart = tempTime;
				}
				var appTimeEnd = et;
				arrTempDate = (pobj.pl[i].listTop[0].dt).split("/");
				var appStartDate = arrTempDate[2] + "-" + arrTempDate[1] + "-"
						+ arrTempDate[0];

				event = new Object();
				event.title = patientName;
				event.start = appStartDate + "T" + appTimeStart;
				event.end = appStartDate + "T" + appTimeEnd;

				if (color == "yellow") {
					event.backgroundColor = Theme.colors.yellow;
					event.color = Theme.colors.yellow;
				} else if (color == "orange") {
					event.backgroundColor = Theme.colors.orange;
					event.color = Theme.colors.orange;
				} else if (color == "pink") {
					event.backgroundColor = Theme.colors.pink;
					event.color = Theme.colors.pink;
				} else if (color == "green") {
					event.backgroundColor = Theme.colors.green;
					event.color = Theme.colors.green;
				} else {
					event.backgroundColor = Theme.colors.red;
					event.color = Theme.colors.red;
				}
				// event.backgroundColor = Theme.colors.red;
				// event.color = Theme.colors.red;

				event.allDay = false; //
				events.push(event);
			}
		}
	}

	$('#calendar').html("");
	$('#calendar').fullCalendar({
		header : {
			left : 'prev,next today',
			center : 'title',
			right : 'month,agendaWeek,agendaDay',
			allDaySlot : false,
		},
		allDaySlot : !0,
		allDayText : "all-day",
		firstHour : 0,
		slotMinutes : 15,
		defaultEventMinutes : 120,
		axisFormat : "H(:mm)tt",
		timeFormat : {
			agenda : "h:mm{ - h:mm}"
		},
		dragOpacity : {
			agenda : .5
		},
		minTime : 0,
		maxTime : 24,
		slotEventOverlap : !0,
		selectable : true,
		selectHelper : true,
		select : function(start, end, allDay) {

			var r = confirm("Do you want to schedule Operation?");
			if (r == true) {
				var date = new Date();
				// alert(date);
				var hour = date.getHours();
				var minute = date.getMinutes();
				var starthour = start.getHours();
				var startminute = start.getMinutes();
				if (starthour < hour) {
					// alert("Wrong Time...! Please select current time.");
					// return false;
					scheduleOperation(start, end);
				} else {
					scheduleOperation(start, end);
				}
			}
			$(".popup").show();
			$(".title").focus();
			$(".submitFrom").click(function() {
				var title = "";
				if (title) {

					calendar.fullCalendar('renderEvent', {
						title : title,
						start : start,
						end : end,
						allDay : allDay
					}, true // make the event "stick"
					);
				}
				$(".popup").hide();
			});
			$(".exit").click(function() {
				// clear all info, unselect events and...
				$(".popup").hide();
			});
			// calendar.fullCalendar('unselect');
		},
		// editable : true,
		droppable : true
	});
	$('#calendar').fullCalendar('gotoDate', arrTempDate[2],
			(arrTempDate[1] - 1), arrTempDate[0]);
	$('#calendar').fullCalendar('addEventSource', events);

}

function closePopUp() {
	$(".popup").hide();
	$("#popupOPCharges").hide();
	$("#serviceHeading").val("0");
}

function addUserToList() {
	var docid = $("#userDocId").val();// $("#userMangTemp").val();
	if (docid == 0) {
		alert("Select Name");
	} else {
		var type = $("#type").val();
		var docName = $("#userName").val();// $("#userMangTemp
		var doctype = ""; // option:selected").text();
		if (type == "doctor" || type == "rmo" || type == "visitingdoctor" || type == "anesthetist") {
			doctype = $("#doctype").val();
			if (doctype == "select") {
				alert("Please Select Doctor Type.");
				return false;
			}
		} else {
			doctype = "other";
		}
		// alert(docName);
		if (docid == "select") {
			alert("Please Select Doctor.");
			return false;
		}
		var add = docName + '\n';
		var doctorid = docid + "@" + type + "%" + doctype + '\n';

		var flag = 0;
		$('#txtDocName').find('option').each(function() {
			if ($(this).html() == add) {
				alert("Name Is Present In List");
				flag = 1;
			}
		});
		if (flag == 0) {
			var o = new Option("option text", "value");
			// / jquerify the DOM object 'o' so we can use the html method
			$(o).html(add);
			$(o).val(doctorid);
			// $(0).val();
			$("#txtDocName").append(o);
		}
	}

	$("#userName").val("");
	$("#type").val("select");
	$("#doctype").val("select");
}

function removeUserFromList() {
	$('#txtDocName option:selected').remove();
}

function saveEditOperationTeam() {

	var queryType = $("#queryType").val();
	var teamId = $("#teamId").val();
	var teamName = $("#teamName").val();

	if (teamName == "") {
		alert("Please Enter Name Of Team");
		return false;
	}
	if(teamId==null || teamId==""||teamId== undefined ){
		teamId=0;
	}
	var users = {
		teamId : teamId,
		teamName : teamName,
		ltSlave : []
	};

	var docId = "";
	var type = "";
	var docName = "";
	var doctype = "";
	$('#txtDocName').find('option').each(function() {
		docName = docName + $(this).text();
		// docId=docId + $(this).val();
		var temp = ($(this).val()).split("@");
		var typename = temp[1].split("%");
		docId = docId + "#" + temp[0];
		type = type + "@" + typename[0];
		doctype = doctype + typename[1];
	});
	// alert(users.teamid+"$%"+users.teamNm);
	var docArr = [];
	docArr = docName.split("\n");
	var idArr = [];
	idArr = docId.split("#");
	var typeArr = [];
	typeArr = type.split("@");
	var doctypeArr = [];
	doctypeArr = doctype.split("\n");

	if (docArr.length == 0) {
		alert("Cannot Save Empty Team");
		return false;
	}
	for ( var i = 0; i < (docArr.length - 1); i++) {
		if (docArr[i] != "") {
			users.ltSlave.push({
				"userName" : docArr[i],
				"user_ID" : idArr[(i + 1)],
				"type" : typeArr[(i + 1)],
				"doctype" : doctypeArr[i],
				"status" : "Y"
			});
		}
	}
	users = JSON.stringify(users);

	var inputs = [];
	inputs.push('action=saveEditOperationTeam');
	inputs.push('users=' + users);
	// inputs.push('teamName=' + teamName);
	// inputs.push('teamId=' + teamId);
	inputs.push('queryType=' + queryType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "./ehat/otdata/saveEditOperationTeam",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload(this);
		}
	});
}

var otTeamTemplateForOT = "<div class='col-sm-12-1' style='margin-top:-12px; border: 1px solid #ddd; overflow-y:scroll; height: 335px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.liTeam as liTeam}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.liTeam.teamid}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.liTeam.teamNm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editOperationTeam({$T.liTeam.teamid})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onclick='deleteOperationTeam({$T.liTeam.teamid})'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button>"
		+ "</td>"
		+ "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function fetchOperationTeamList(callFrom) {

	count = 1;
	var searchQuery = "";
	if (callFrom == "TeamSearch") {
		searchQuery = $("#strValue").val();
	}
	if (callFrom == "TeamSearch" && searchQuery == "") {
		alert("Please enter Team Name for search.");
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchOperationTeamList');
	inputs.push('searchQuery=' + searchQuery);
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "OperationServlet",
				url : "./ehat/otdata/fetchOperationTeamList",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
					ajaxResponse = r;
					// alert(ajaxResponse);
					$("#teamList").val(ajaxResponse);
					pobj1 =  ajaxResponse ;
					if (callFrom == "OTManagement" || callFrom == "TeamSearch") {
						if (pobj1.liTeam.length == 0) {
							alertify.error("Team name not found");
							return false;
						} else {
							$("#divTeamList").setTemplate(otTeamTemplateForOT);
							$("#divTeamList").processTemplate(pobj1);
						}
					} else if (callFrom == "OTScheduler") {
						var otTeamTemplate = "<option value='0'>-SELECT-</option>{#foreach $T.liTeam as liTeam}<option value='{$T.liTeam.teamid}'>{$T.liTeam.teamNm}</option>{#/for}";
						$("#teanNameList").setTemplate(otTeamTemplate);
						$("#teanNameList").processTemplate(pobj1);
					}
				}
			});

}

function editOperationTeam(id) {
	var teamList = $("#teamList").val();
	pobj1 = teamList;
	var myObj;
	// alert(pobj1.liTeam.length);
	for ( var int = 0; int < pobj1.liTeam.length; int++) {
		if (id == (pobj1.liTeam[int].teamid)) {
			myObj = pobj1.liTeam[int];
			break;
		}
	}

	$("#txtDocName").empty();
	$("#teamId").val((pobj1.liTeam[int].teamid));
	$("#queryType").val("update");
	$("#teamName").val(myObj.teamNm);

	var template = "";
	for ( var i = 0; i < myObj.ul.length; i++) {
		var type = myObj.ul[i].ut;
		var doctype = "";
		if (type == "doctor" || type == "rmo" || type == "visitingdoctor") {
			if (myObj.ul[i].st == undefined) {
				doctype = "surgeon";
			} else {
				doctype = myObj.ul[i].st;
			}
		} else {
			doctype = "other";
		}

		var docname = myObj.ul[i].fuNm + '\n';
		var doctorid = myObj.ul[i].ui + "@" + type + "%" + doctype + '\n';

		var flag = 0;
		$('#txtDocName').find('option').each(function() {
			if ($(this).html() == docname) {
				alert("Name Is Present In List");
				flag = 1;
			}
		});
		if (flag == 0) {
			var o = new Option("option text", "value");
			// / jquerify the DOM object 'o' so we can use the html method
			$(o).html(docname);
			$(o).val(doctorid);
			// $(0).val();
			$("#txtDocName").append(o);
		}

		/* template = template + "<option value='" + doctorid + "'>" + docname + "</option>"; */
	}
	/*
	 * var temp; $("#txtDocName").setTemplate(template);
	 * $("#txtDocName").processTemplate(temp);
	 */
}

function newOperationTeam() {
	$("#teamId").val(0);
	$("#queryType").val("insert");
	$("#teamName").val("");

	var template = "";
	var temp;
	$("#txtDocName").setTemplate(template);
	$("#txtDocName").processTemplate(temp);
}

function deleteOperationTeam(teamId) {

	var r = confirm("Are You Confirm To Delete Team ");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteOperationTeam');
		inputs.push('teamId=' + teamId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "./ehat/otdata/deleteOperationTeamList",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				alertify.error(ajaxResponse);
				
				setTimeout(function() {
					location.reload(this);
					}, 1000);
				
			}
		});
	}
}

function setTeamDoctors(callfrom) {
	
	var ajaxResponse = $("#teamList").val();
	var pobj1 =  ajaxResponse ;

	var id = $("#teanNameList").val();
	if (id == 0) {
		$("#teamMembersList").val("");
		return false;
	}
	var myObj;
	for ( var int = 0; int < pobj1.liTeam.length; int++) {
		if (id == (pobj1.liTeam[int].teamid)) {
			myObj = pobj1.liTeam[int];
			break;
		}
	}

	if (callfrom == 'OT') {
		
		var template = "";
		for ( var i = 0; i < myObj.ul.length; i++) {
			
			var depNm=myObj.doclist[i].departmentName;  /*myObj.ul[i].depNm;*/
			if(depNm == null || depNm == undefined || depNm == "" || depNm == "null" || depNm == "undefined"){
				depNm= "";
			}
			var spl=myObj.doclist[i].speciality; /*myObj.ul[i].spl;*/
			if(spl == null || spl == undefined || spl == "" || spl == "null" || spl == "undefined"){
				spl= "";
			}/*
			var mb=myObj.ul[i].obd.mb;
			if(mb == null || mb == undefined || mb == "" || mb == "null" || mb == "undefined"){
				mb= "";
			}
			var eid=myObj.ul[i].obd.eid;
			if(eid == null || eid == undefined || eid == "" || eid == "null" || eid == "undefined" ){
				eid= "";
			}*/
			template = template
					+ "<tr id='idTr"
					+ (1 + i)
					+ "'><td class='' style='padding-right: 15px;'><div class='' id='"
					+ (1 + i)
					+ "'>"
					+ (1 + i)
					+ "<input type='hidden' id='idUser"
					+ (1 + i)
					+ "' value='"
					+ myObj.ul[i].ui
					+ "' /></div></td><td style='width: 17%;'><div class='' id='docNameT"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].fuNm
					+ "</div></td>"
					+ "<td style='width: 10%;'><div class='' id='userType"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].ut
					+ "</div></td>"
					+ "<td style='padding-left: 15px; width: 20%;'><div class='' id='docSpeciality"
					+ (1 + i)
					+ "'>"
					+ spl//myObj.ul[i].obd.spl
					+ "</div></td><td style='padding-left: 15px; width: 16%;'><div class='' id='docDpmt"
					+ (1 + i)
					+ "'>"
					+ depNm//myObj.ul[i].obd.depNm
					+ "</div></td>"
					+ "<td style='padding-left: 15px; width: 12%;'><div class='' id='docTypeT"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].doctype
					+ "</div></td>"
					+ "<td style='width: 6%;'><div class='' id='docmobile"
					+ (1 + i)
					+ "'>"
					+ myObj.doclist[i].mobileNo //myObj.ul[i].mobileNo 
					+ "</div></td><td style='width: 14%;'><div class='' id='docemail"
					+ (1 + i)
					+ "'><a style='' href='mailto:"
					+ myObj.ul[i].eid
					+ "'>"
					+ myObj.doclist[i].email_Id
					+ "</a></div></td><td class='center' style='width: 2%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
					+ (1 + i) + "'/></div></td></tr>";
		}
		$("#teamMemberCount").val(myObj.ul.length);
		var temp;
		$("#teamMembersList").setTemplate(template);
		$("#teamMembersList").processTemplate(temp);
	} else if (callfrom == 'ManageOT') {
		var template = "";
		for ( var i = 0; i < myObj.ul.length; i++) {
			var depNm=myObj.ul[i].obd.depNm;
			if(depNm == null || depNm == undefined || depNm == "" || depNm == "null" || depNm == "undefined"){
				depNm= "";
			}
			var spl=myObj.ul[i].obd.spl;
			if(spl == null || spl == undefined || spl == "" || spl == "null" || spl == "undefined"){
				spl= "";
			}
			var mb=myObj.ul[i].obd.mb;
			if(mb == null || mb == undefined || mb == "" || mb == "null" || mb == "undefined"){
				mb= "";
			}
			var eid=myObj.ul[i].obd.eid;
			if(eid == null || eid == undefined || eid == "" || eid == "null" || eid == "undefined" ){
				eid= "";
			}
			template = template
					+ "<tr id='idTr"
					+ (1 + i)
					+ "'><td class='center' style='padding-right: 13px; padding-left: 14px; width:1.3%;'><div class='' id='"
					+ (1 + i)
					+ "'>"
					+ (1 + i)
					+ "<input type='hidden' id='idUser"
					+ (1 + i)
					+ "' value='"
					+ myObj.ul[i].ui
					+ "' /></div></td><td class='center' style='width: 25%;'><div class='' id='docNameT"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].fuNm
					+ "</div></td>"
					+ "<td class='center' style='width: 15%;'><div class='' id='userType"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].ut
					+ "</div></td>"
					+ "<td class='center' style='width: 15%;'><div class='' id='docSpeciality"
					+ (1 + i)
					+ "'>"
					+ spl
					+ "</div></td><td class='center' style='width: 20%;'><div class='' id='docDpmt"
					+ (1 + i)
					+ "'>"
					+ depNm
					+ "</div></td>"
					+ "<td class='center' style='width: 18%;'><div class='' id='docTypeT"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].doctype
					+ "</div></td>" 
					+ "<td class='center'><div <input type='hidden' id='docidd"
					+ (1 + i)
					+ "' value='"
					+ myObj.ul[i].ui
					+ "' /> </div></td>"
					+"<td class='center' style='width: 5%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
					+ (1 + i) + "'/></div></td></tr>";
		}
		$("#teamMemberCount").val(myObj.ul.length);
		var temp;
		$("#teamMembersList").setTemplate(template);
		$("#teamMembersList").processTemplate(temp);
	} else {
		var template = "<tr>	<td class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UserId</div></td><td class='col-md-4-1 center' style='height: 21.5px;'><div	class='TextFont'>Name</div></td><td class='col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Type</div></td><td class='col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>DocType</div></td><td class='col-md-1-1 center' style='height: 21.5px;'><div		class='TextFont'></div></td></tr>";
		for ( var i = 0; i < myObj.ul.length; i++) {
			var type = myObj.ul[i].ut;
			var doctype;
			if (type == "doctor" || type == "rmo" || type == "visitingdoctor") {
				if (myObj.ul[i].st == undefined) {
					doctype = "surgeon";
				} else {
					doctype = myObj.ul[i].st;
				}
			} else {
				doctype = "other";
			}
			template = template
					+ "<tr id='idTr"
					+ (1 + i)
					+ "'>	<td class='col-md-1-1' style='height: 21.5px;'><div	class='TextFont' id='idUser"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].ui
					+ "</div></td><td class='col-md-5-1' style='height: 21.5px;'><div class='TextFont' id='docNameT"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].fuNm
					+ "</div></td><td class='col-md-5-1' style='height: 21.5px;'><div class='TextFont' id='docTypeT"
					+ (1 + i)
					+ "'>"
					+ myObj.ul[i].ut
					+ "</div></td><td class='col-md-5-1' style='height: 21.5px;'><div class='TextFont' id='doctorType"
					+ (1 + i)
					+ "'>"
					+ doctype
					+ "</div></td><td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'><input type='checkbox' name='checkBoxDoc' value='"
					+ (1 + i) + "'/></div></td></tr>";
		}
		$("#teamMemberCount").val(myObj.ul.length);
		var temp;
		$("#teamMembersList").setTemplate(template);
		$("#teamMembersList").processTemplate(temp);
	}

}

function setOtNameOfPopup() {
	$("#otName2").val($("#otName").val());
}
function setOtNameOfPage() {
	$("#otName").val($("#otName2").val());

	closePopUp();
	showPopUp()
}

function calculateDuration() {

	var time1 = $("#timeFrom").val().split(':'), time2 = $("#timeTo").val()
			.split(':');
	var hours1 = parseInt(time1[0], 10), hours2 = parseInt(time2[0], 10), mins1 = parseInt(
			time1[1], 10), mins2 = parseInt(time2[1], 10);
	var hours = hours2 - hours1, mins = 0;
	if (hours < 0)
		hours = 24 + hours;
	if (mins2 >= mins1) {
		mins = mins2 - mins1;
	} else {
		mins = (mins2 + 60) - mins1;
		hours--;
	}
	mins = mins / 60; // take percentage in 60
	hours += mins;
	hours = hours.toFixed(2);
	if (hours != "NaN") {
		$("#durationHrs").val(hours.split(".")[0]);
		if (hours.split(".")[0] == "-0") {
			$("#durationHrs").val("23");
		}
		$("#durationMin").val(((hours.split(".")[1]) / 100) * 60);
	}

	/*
	 * var timeFrom = $("#timeFrom").val(); var timeTo = $("#timeTo").val();
	 * 
	 * if (timeFrom == "" || timeTo == "") { return false; } timeFrom =
	 * (timeFrom);// +":00"; timeTo = (timeTo);// +":00";
	 * 
	 * var date = ($("#idTourDateDetails").val()) + " ";
	 * 
	 * var difference = new Date(new Date(date + timeTo) - new Date(date +
	 * timeFrom)).toUTCString().split(" ")[4]; // alert( difference );
	 * 
	 * var arrDifference = difference.split(":");
	 * 
	 * if(arrDifference[0] == 00 && arrDifference[1] == 00){ alert("Duration can
	 * not be Zero....! Please select proper time."); return false; }else{
	 * 
	 * $("#durationHrs").val(arrDifference[0]);
	 * $("#durationMin").val(arrDifference[1]);
	 */
	// }
}

function setPatientNameAndId(type) {
	var resultData = [];
	var auto = "patientNameForOperation";
	var type = $("input[name='radios1']:checked").val();
	var findingName = $("#txtPName").val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('type=' + type);
	inputs.push('findingName=' + findingName);
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

				},
				success : function(r) {
					ajaxResponse = r;
					// alert("RRR :"+ajaxResponse);
					var availableTags = [];
					availableTags = ajaxResponse.split("\n");

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						resultData.push({
							ID : arrValue[1],
							Name : arrValue[0],
							ProcType : arrValue[2],
							ProcGroup : arrValue[3],
							ProcName : arrValue[4]
						});

						template = template + '<li data-value="' + arrValue[1]
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';

					}
					var inputID = "txtPName";
					setTimeout(function() {

						$("#div" + inputID + " .typeahead").html(template);

						if (type != "onLoad") {
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
					}, 500);

					/*
					 * $(".typeahead").html(template);
					 * 
					 * if (type != "onLoad") { $(".typeahead").show(); }
					 * setTimeout(function() { $('#txtPName').typeahead({ source :
					 * resultData, displayField : 'Name', valueField : 'ID',
					 * onSelect : displayResult, scrollBar : true }); }, 500);
					 */
				}
			});

	function displayResult(item) {
		// alert(item.value+" "+item.text);
		if (item.value == undefined || item.value == "undefined"
				|| item.value == "") {
			$("#mrnNo").val("")
			return false;
		}
		$("#mrnNo").val(item.value)
	}
}

function scheduleOperation(start, end, type,callfrom) 
{
	var r = confirm("Are You Sure You Want To Schedule Operation");
	if (r == true) {
		
		var dateCheck = new Date();

		var dd = dateCheck.getDate();
		dd = dd.toString();

		var mm = dateCheck.getMonth() + 1;
		mm = mm.toString();

		var yyyy = dateCheck.getFullYear();

		if (mm.length == 1) 
		{
			mm = "0" + mm;
		}

		if (dd.length == 1) 
		{
			dd = "0" + dd;
		}

		dateCheck = new Date(yyyy + "-" + mm + "-" + dd);

		var tempDateCheck = ($("#idTourDateDetails").val()).split("/");
		var dd1 = tempDateCheck[0];
		var mm1 = tempDateCheck[1];
		var yyyy1 = tempDateCheck[2];
		var dateCheck1 = new Date(yyyy1 + "-" + mm1 + "-" + dd1);

		if (dateCheck > dateCheck1) 
		{
			// alert("Please Select Valid Date");
			// return false;
		}

		var arrStart = [];
		var arrEnd = [];
		var date;
		if (type == "Button") {

			$("#timeFrom").val(($("#timeFrom").val()));
			$("#timeTo").val(($("#timeTo").val()));
			calculateDuration();

			var tempDate = ($("#idTourDateDetails").val()).split("/");
			var month = new Array();
			month[0] = "January";
			month[1] = "February";
			month[2] = "March";
			month[3] = "April";
			month[4] = "May";
			month[5] = "June";
			month[6] = "July";
			month[7] = "August";
			month[8] = "September";
			month[9] = "October";
			month[10] = "November";
			month[11] = "December";
			date = new Date(tempDate[0] + " " + month[(tempDate[1]) - 1] + " "
					+ tempDate[2]);
		} else {
			arrStart = (start.toString()).split(" ");
			arrEnd = (end.toString()).split(" ");
			$("#timeFrom").val(arrStart[4]);
			$("#timeTo").val(arrEnd[4]);
			calculateDuration();
			date = new Date(arrStart[2] + " " + arrStart[1] + " " + arrStart[3]);
		}

		var month = (date.getMonth() + 1);

		if (month.toString().length == 1) {
			month = "0" + month;
		}

		var dateNo = (date.getDate());
		if (dateNo.toString().length == 1) {
			dateNo = "0" + dateNo;
		}

		date = (dateNo + '/' + month + '/' + date.getFullYear());
		var otName = $("#otName").val();
		var selOTtype = $("#selOTtype").val();
		var department = $("#department").val();
		var selOTName = $("#selOTName").val();
		var opgrade = $("#opgrade").val();
		if(opgrade==null || opgrade==""||opgrade== undefined ){
			
			opgrade==0;
			
		}
		var duration = $("#durationHrs").val() + ":" + $("#durationMin").val();
		var startTime = $("#timeFrom").val();
		var endTime = $("#timeTo").val();

		var scheduledProcedure = "0";// =$("#scheduledProcedure").val();
		var y = document.getElementById("scheduledProcedure");
		for ( var j = 0; j < y.options.length; j++) {
			scheduledProcedure = scheduledProcedure + "#" + y.options[j].value
					+ "@" + y.options[j].text;
		}

		
		if(scheduledProcedure == 0){
			alert("Select Scheduled Procedure ");
			return false;
		}
		
		var remark = $("#remark").val();
		var precaution = $("#precaution").val();

		var priority = $("input[name='radios']:checked").val();
		if (priority == "radioRegular") {
			priority = "N";
		} else {
			priority = "Y";
		}
		var surgeryDescription = $("#surgeryDescription").val();
		var indicationForSurgery = $("#indicationForSurgery").val();

		var teamNameList = $("#teanNameList").val();
		var x = document.getElementById("teamMembersList");
		var anesthesiaType = $("#anesthesiaType").val();
		var type = $("input[name='radios1']:checked").val();
		var mrnNo = $("#mrnNo").val();
		var queryType = $("#queryType").val();

		if (mrnNo == "") {
		    alert("Please Select Patient Name");
		    return false;
		} 
	
		if(scheduledProcedure == 0){
		
			
			if (selOTtype == 0 && callfrom=='save') {
			    alert("Please Select Procedure Type");
			    return
			    false;
			} else if (department == 0 && callfrom=='save') {
			    alert("Please Select Procedure Group");
			    return false;
			} else if (selOTName == 0 && callfrom=='save') {
			    alert("Please Select Procedure Name "); 
			    return false; 
			   
			}
		}
		//var teamMemberCount = $("#teamMemberCount").val();
		var teamMemberCount = $("#teamMembersList tr").length;
		if (teamMemberCount == 0) {
		    alert("Please select Surgery team");
		    return false;
		} else if (anesthesiaType == 0) {
		    alert("Please Select Anaesthesia Type");
		    return false;
		 } else if (otName == 0 && callfrom=='save') {
		    alert("Please Select OT Name");
		    return false;
		 }

	var tropid = $("#tropid").val();
	var tropmanageid = $("#tropmanageid").val();
	var trid = $("#trid").val();

	var bookedBy = $("#userId").val();
	var suggestedBy = $("#suggestedBy").val();
	
	var otherReference = $("#otherReference").val();
	var contactOfReference = $("#contactOfReference").val();
	var emailOfReference = $("#emailOfReference").val();
	
	var unitId = $("unitId").val();
	if (suggestedBy == "") {
		alert("Please Select suggested By");
		return false;
	}
		var objTreatmentOperation = {
			otid : otName,
			op_type : selOTtype,
			department : department,
			// oi :selOTName,

			date : date,
			startTime : startTime,
			endTime : endTime,
			bookedBy : bookedBy,
			scheduledProcedure : scheduledProcedure,
			remark : remark,
			precaution : precaution,
			suggestedBy : suggestedBy,
			emergencyFlag : priority,
			surgeryDescription : surgeryDescription,
			indicationForSurgery : indicationForSurgery,
			teamId : teamNameList,
			anesthesiaType : anesthesiaType,
			listOperationDoc : [],
			patientId : mrnNo,
			id : tropid,
			treatmentOperationsManageID : tropmanageid,
			otherReference : otherReference,
			contactOfReference : contactOfReference,
			emailOfReference : emailOfReference,
			opcat:opgrade,
			unitId:unitId
		};

		
		
		for ( var i = 1; i <= teamMemberCount; i++) {
			// alert(x.options[i].value);
			var docId = $("#idUser" + i).val();// alert(docId);
			var docNameT = $("#docNameT" + i).text();
			var usertype = $("#userType" + i).text();
			var surgeontype = $("#docTypeT" + i).text();
			var mobile = $("#docmobile" + i).text();
			var idoperationDocTbl = $("#idopDocTbl" + i).val();
			if (docId != null && docId != "" && docId != undefined) 
			{
				objTreatmentOperation.listOperationDoc.push({
					"docId" : docId,
					"docName" : docNameT,
					"docType" : usertype,
					"surgeonType" : surgeontype,
					"narration" : mobile,
					"idoperationDocTbl" : idoperationDocTbl
				});
			}
		}

		objTreatmentOperation = JSON.stringify(objTreatmentOperation);

		var inputs = [];
		inputs.push('action=scheduleOperation');
		inputs.push('objTreatmentOperation='
				+ encodeURIComponent(objTreatmentOperation));
		inputs.push('queryType=' + encodeURIComponent(queryType));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "./ehat/otdata/scheduleOperation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				window.location.href = "OTDashboard.jsp";
			}
		});
	}	
}

function addProcedureNameToList(callform) {
	var proValue = $("#selOTName").val();
	//added by paras for check dublicate operation
	var a ;
//	if(callform=="OT" || callform=="SCHEDULE"){
	if( callform=="SCHEDULE"){
		var a=$("#department").val();
		$("#departmentOT").val(a);
		if(callform=="OT" || callform=="SCHEDULE"){
		var CountOT1 = CountOT(callform);
		if(CountOT1 >0 ){
			alert("Please Schedule New Operation...!");
        return false;
		}
		}
	}
	if(callform=="OTB"){
		a = true;
	}else{
	 a=checkDublicateproc(proValue,callform);

	}
	var opgrade = $("#opgrade").val();
	//if (opgrade == "" ||opgrade==null || opgrade==0 || opgrade=="0") {
	//	alert("Select Procedure Category");
	//	SetFocus("opgrade");
	//	return false;
	//}
	if(a==false){
		//alert(a);
		return false;
	}else {  //end added by paras
		
		updateop.push(proValue);
		var proText = $("#selOTName option:selected").text();

		if (proValue == 0 || proText == "-SELECT-") {
			return false;
		}
		if (proText == "") {
			alert("Select Procedure Group");
			SetFocus("department");

		}

		var template = $("#scheduledProcedure").html();
		template = template + '<option value="' + proValue + '">' + proText
				+ '</option>';

		var arr = [];
		$("#scheduledProcedure > option").each(function() {
			arr.push(this.value);
		});
		for ( var i = 0; i < arr.length; i++) {
			// alert(arr[i]);
			if (proValue == arr[i]) {
				alert("Procedure already present in list...!");
				return false;
			}
		}
		var temp;
		$("#scheduledProcedure").setTemplate(template);
		$("#scheduledProcedure").processTemplate(temp);

		/*$("#department").val(0);
		$("#selOTtype").val(0);
		$("#selOTName").val(0);*/
		// getOperationName();
	}
	
}

function setDocNameAndId() {
	var userName = $("#userName").val();
	var arrUserName = userName.split("_");
	if (arrUserName.length == 2) {
		$("#userName").val(arrUserName[0]);
		$("#userDocId").val(arrUserName[1]);
	}
	$('#ui-id-1').css("z-index", "10000000000");
}

function addDocNameToList() {

	if ($("#userName").val() == "") {
		alert("Please select Doctor Name.");
		return false;
	} else if ($("#userDocId").val() == 0) {
		alert("Please select Valid Doctor Name.");
		return false;
	}
	var userName = $("#userName").val();
	var userId = $("#userDocId").val();
	var type = $("#type").val();
	var doctype;
	if (type == "doctor" || type == "rmo" || type == "visitingdoctor") {
		doctype = $("#doctype").val();
		if (doctype == "select") {
			alert("Please select Doctor Type");
			return false;
		}
	} else {
		doctype = "other";
	}
	var template = $("#teamMembersList").html();
	var teamMemberCount = $("#teamMemberCount").val();
	for ( var i = 1; i <= teamMemberCount; i++) {
		var id = $("#idUser" + i).text();
		if (id == userId) {
			alert("Already Present In List");
			return false;
		}
	}

	if (teamMemberCount == 0) {
		template = "<tr>	<td class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UserId</div></td><td class='col-md-4-1 center' style='height: 21.5px;'><div	class='TextFont'>Name</div></td><td class='col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>Type</div></td><td class='col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>DocType</div></td><td class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'></div></td></tr>";
		template = template
				+ "<tr id='idTr"
				+ (1 + teamMemberCount)
				+ "'>	<td class='col-md-1-1' style='height: 21.5px;'><div	class='TextFont' id='idUser"
				+ (1 + teamMemberCount)
				+ "'>"
				+ userId
				+ "</div></td><td class='col-md-4-1' style='height: 21.5px;'><div class='TextFont' id='docNameT"
				+ (1 + teamMemberCount)
				+ "'>"
				+ userName
				+ "</div></td><td class='col-md-3-1' style='height: 21.5px;'><div class='TextFont' id='docTypeT"
				+ (1 + teamMemberCount)
				+ "'>"
				+ type
				+ "</div></td><td class='col-md-3-1' style='height: 21.5px;'><div class='TextFont' id='doctorType"
				+ (1 + teamMemberCount)
				+ "'>"
				+ doctype
				+ "</div></td><td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + teamMemberCount) + "'/></div></td></tr>";
	} else {
		template = template
				+ "<tr id='idTr"
				+ (1 + teamMemberCount)
				+ "'>	<td class='col-md-1-1' style='height: 21.5px;'><div	class='TextFont' id='idUser"
				+ (1 + teamMemberCount)
				+ "'>"
				+ userId
				+ "</div></td><td class='col-md-4-1' style='height: 21.5px;'><div class='TextFont' id='docNameT"
				+ (1 + teamMemberCount)
				+ "'>"
				+ userName
				+ "</div></td><td class='col-md-3-1' style='height: 21.5px;'><div class='TextFont' id='docTypeT"
				+ (1 + teamMemberCount)
				+ "'>"
				+ type
				+ "</div></td><td class='col-md-3-1' style='height: 21.5px;'><div class='TextFont' id='doctorType"
				+ (1 + teamMemberCount)
				+ "'>"
				+ doctype
				+ "</div></td><td class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + teamMemberCount) + "'/></div></td></tr>";
	}

	$("#teamMemberCount").val((1 + teamMemberCount));
	var temp;

	$("#teamMembersList").setTemplate(template);
	$("#teamMembersList").processTemplate(temp);

	$("#userName").val("");
	$("#userDocId").val(0);

	$("#doctype").val("select");
	$("#type").val("select");
}

function addNewOperation() {
	window.location.href = "OTScheduler.jsp";
}

function setOperationDetailsScheduler() {
	$("#divSearchRadios").hide();

	var pobj1 = "";
	var searchBy = "byId";
	var value = $("#treamentOpid").val();
	var page_name = "updateScheduleOT";
	var otDate = $("#todays_date").val();

	var input = [];
	input.push('searchBy=' + encodeURIComponent(searchBy));
	input.push('value=' + encodeURIComponent(value));
	input.push('action=DisplayOperationPat');
	input.push('otDate=' + encodeURIComponent(otDate));

	input.push('page_name=' + encodeURIComponent(page_name));
	var str = input.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "OperationServlet",
				url : "./ehat/otdata/DisplayOperationPat",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					ajaxResponse = r;
				
					$("#divPatId").html(ajaxResponse);
					pobj1 = r;//eval('(' + ajaxResponse + ')');

					var divPatId = $("#divPatId").html();

					$("#queryType").val("update");
					$("#otName").val(pobj1.pl[0].listTop[0].otid);

					$("#otName2").val(pobj1.pl[0].listTop[0].otid);

					$("#remark").val(pobj1.pl[0].listTop[0].rem);
					$("#precaution").val(pobj1.pl[0].listTop[0].presc);
			
					$("#otherReference").val(pobj1.pl[0].listTop[0].otherReference);
					$("#contactOfReference").val(pobj1.pl[0].listTop[0].contactOfReference);
					$("#emailOfReference").val(pobj1.pl[0].listTop[0].emailOfReference);

					$("#surgeryDescription")
							.val(pobj1.pl[0].listTop[0].surDesc);
					$("#indicationForSurgery")
							.val(pobj1.pl[0].listTop[0].inSur);

					$("#idTourDateDetails").val(pobj1.pl[0].listTop[0].dt);
					$("#timeFrom").val(pobj1.pl[0].listTop[0].stt);
					$("#timeTo").val(pobj1.pl[0].listTop[0].ett);

					calculateDuration();

					var scheduledProcedure = $("#scheduledProcedure").html();
					var arrProcedures = (pobj1.pl[0].listTop[0].schPro)
							.split("#");

					
					for ( var i = 1; i < (arrProcedures.length - 1); i++) {
						var arrPro = (arrProcedures[i]).split("@");
						scheduledProcedure = scheduledProcedure
								+ "<option value='" + arrPro[0] + "'>"
								+ arrPro[1] + "</option>";
					}
					$("#scheduledProcedure").html(scheduledProcedure);

					var emerFlg = pobj1.pl[0].listTop[0].emerFlg;
					if (emerFlg == "Y") {
						$('input[name="radios"][value="radioEmergency"]').prop(
								'checked', true);
					} else {
						$('input[name="radios"][value="radioRegular"]').prop(
								'checked', true);
					}

					$("#teanNameList").val(pobj1.pl[0].listTop[0].teamId);
					$("#anesthesiaType").val(pobj1.pl[0].listTop[0].anesType);
					$("#suggestedBy").val(pobj1.pl[0].listTop[0].sugBy);
					$("#txtPName").val(
							pobj1.pl[0].fn + " " + pobj1.pl[0].mn + " "
									+ pobj1.pl[0].ln);
					$("#centerPatientId").val(pobj1.pl[0].centerPatientId)
					$("#mrnNo").val(pobj1.pl[0].pi);
					$("#txtPName").prop("disabled", true);
					$("#hidpatId").val(pobj1.pl[0].pi);
					$("#trid").val(pobj1.pl[0].trid);
					$("#tropid").val(pobj1.pl[0].listTop[0].id);
					$("#tropmanageid").val(pobj1.pl[0].listTop[0].tomid);
					
			var template = "";
			for ( var j = 0; j < pobj1.pl[0].listTop[0].liOpDoc.length; j++) {
				var uid = pobj1.pl[0].listTop[0].liOpDoc[j].idopDoc;
				var name = pobj1.pl[0].listTop[0].liOpDoc[j].docName;
				var type = pobj1.pl[0].listTop[0].liOpDoc[j].doctp;
				var doctype = pobj1.pl[0].listTop[0].liOpDoc[j].surgtp;
				var spl = pobj1.pl[0].listTop[0].liOpDoc[j].obd.speciality;
				var depNm = pobj1.pl[0].listTop[0].liOpDoc[j].obd.departmentName;
				var mb = pobj1.pl[0].listTop[0].liOpDoc[j].obd.mobileNo;
				var eid = pobj1.pl[0].listTop[0].liOpDoc[j].obd.email_Id;
				var idopDocTbl = pobj1.pl[0].listTop[0].liOpDoc[j].idopDocTbl;
				
				if(depNm == "null" || depNm == null || depNm == undefined || depNm == "undefined"){
					depNm = "";
				}
				
				if(mb == "null" || mb == null || mb == undefined || mb == "undefined"){
					mb = "";
				}
				
				if(eid == "null" || eid == null || eid == undefined || eid == "undefined"){
					eid = "";
				}
				
					if(spl == "null" || spl == null || spl == undefined || spl == "undefined"){
					spl = "-";
				}
				
				template = template
							+ "<tr id='idTr"
							+ (1 + j)
							+ "'><td class='' style='padding-right: 15px;'><div class='' id='"
							+ (1 + j)
							+ "'>"
							+ (1 + j)
							+ "<input type='hidden' id='idUser"
							+ (1 + j)
							+ "' value='"
							+ uid
							+ "' /><input type='hidden' id='idopDocTbl"+(1 + j)+"' value='"+idopDocTbl+"'></div></td><td style='width:17%;'><div class='' id='docNameT"
							+ (1 + j)
							+ "'>"
							+ name
							+ "</div></td>"
							+"<td style='width:10%;'><div class='' id='userType"
							+ (1 + j)
							+ "'>"
							+ type
							+ "</div></td>" 
							+ "<td style='padding-left: 15px; width:20%;'><div class='' id='docSpeciality"
							+ (1 + j)
							+ "'>"
							+ spl
							+ "</div></td><td style='padding-left: 15px; width:16%;'><div class='' id='docDpmt"
							+ (1 + j)
							+ "'>"
							+ depNm
							+ "</div></td>" 
							+"<td style='padding-left: 15px; width:12%;'><div class='' id='docTypeT"
							+ (1 + j)
							+ "'>"
							+ doctype
							+ "</div></td>" 
							+"<td style='width:6%;'><div class='width:6%;' id='docmobile"
							+ (1 + j)
							+ "'>"
							+ mb
							+ "</div></td><td style='width:14%;'><div class='' id='docemail"
							+ (1 + j)
							+ "'><a style='' href='mailto:" + eid + "'>"
							+ eid
							+ "</a></div></td><td class='center' style='width:2%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
							+ (1 + j) + "'/></div></td></tr>";
			}
			$("#teamMemberCount").val(pobj1.pl[0].listTop[0].liOpDoc.length);
			var temp;
			$("#teamMembersList").setTemplate(template);
			$("#teamMembersList").processTemplate(temp);
		}
	});
}

function removeOperationNameFromList() {
	
var val=$('#scheduledProcedure option:selected').val();//added by paras
deleteop.push(val);  //added by paras
//	alert(deleteop);
	$('#scheduledProcedure option:selected').remove();
	
}

function removeDoctorNameFromList() {
	
	if($("input[name='checkBoxDoc']:checked").length == 0)
	{
		alert('Please select atleast one record to delete.... ')
		return false
	}
	
	var selectedGroups = new Array();
	$("input[name='checkBoxDoc']:checked").each(function() {
		selectedGroups.push($(this).val());
	});
	
	var removeIds = [];
	for ( var i = 0; i < selectedGroups.length; i++) {
		
		removeIds.push($("#idopDocTbl" + selectedGroups[i]).val())
		$("#idTr" + selectedGroups[i]).remove();
	}
	
	/*$.ajax({
		async : false,
		type : "POST",
		data : { 'removeIds' : removeIds.toString() },
		url : "./ehat/otdata/deleteOperationTeambyId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(r) {
		
		}
		
	})*/
}

function saveOperationByButton(callfrom) {
	
	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var start = $("#timeFrom").val();
	var end = $("#timeTo").val();

	var str = start.split(":");
	if (str[0] == "" && end == "") {
		alert("Please select Start Time and End Time.");
		SetFocus("timeFrom");
		return false;
	} else if (start == "") {
		alert("Please Select Start Time");
		SetFocus("timeFrom");
		return false;
	} else if (end == "") {
		alert("Please Select End Time");
		SetFocus("timeTo");
		return false;
	} else if (start == end) {
		alert("Start Time and End Time can not be same....!Please Select Proper End Time");
		SetFocus("timeTo");
		return false;
	} else if (str[0] < hour) {
		// alert("Wrong Time...! Please select current time.");
		// SetFocus("timeFrom");
		// return false;
	} else if (str[0] == hour && str[1] < minute) {
		// alert("");
		// SetFocus("timeFrom");
	}

	if (start.length == 5) {
		$("#timeFrom").val(($("#timeFrom").val() + ":00"));
	}
	if (end.length == 5) {
		$("#timeTo").val(($("#timeTo").val() + ":00"));
	}

	// alert(start.length);
	// return false;
	
	scheduleOperation(start, end, "Button",callfrom);

}

function setOperationAppointmentInCalender() {

	var events = new Array();

	var ajaxResponse = $("#OTdata").val();
	pobj = eval('(' + ajaxResponse + ')');

	var ajaxResponseOTNames = $("#divOTName").html();
	var pobjOTNames = eval('(' + ajaxResponseOTNames + ')');

	var idDateDetails = ($("#idTourDateDetails").val()).split("/");
	var arrTempDate = [];
	arrTempDate.push(idDateDetails[0]);
	arrTempDate.push(idDateDetails[1]);
	arrTempDate.push(idDateDetails[2]);

	var otName2 = $("#otName").val();
	for ( var i = 0; i < pobj.pl.length; i++) {
		var otid = pobj.pl[i].listTop[0].otid;
		if (otName2 == otid) {

			var color = "red";
			for ( var j = 0; j < pobjOTNames.liot.length; j++) {
				if (otid == pobjOTNames.liot[j].otid) {
					color = pobjOTNames.liot[j].color;
				}
			}

			var st = pobj.pl[i].listTop[0].stt;// am_pm_to_hours(pobj.pl[i].listTop[0].st)+":00";
			var et = pobj.pl[i].listTop[0].ett;// am_pm_to_hours(pobj.pl[i].listTop[0].et)+":00";

			var appStartTime = st;
			var patientName;

			var docName = pobj.pl[i].listTop[0].docnms;
			docName = docName.substring(1);
			patientName = pobj.pl[i].tit + pobj.pl[i].fn + ' ' + pobj.pl[i].ln
					+ " [Doctor Name-" + docName + "]";

			var appTimeStart;
			var tempTime;
			if (appStartTime % 1 != 0) {
				var arrAppStartTime = appStartTime.toString().split('.');
				if (arrAppStartTime[0] < 10) {
					tempTime = "0" + arrAppStartTime[0];
				} else {
					tempTime = arrAppStartTime[0];
				}
				appTimeStart = tempTime;
			} else {
				if (appStartTime < 10) {
					tempTime = "0" + appStartTime;
				} else {
					tempTime = appStartTime;
				}
				appTimeStart = tempTime;
			}
			var appTimeEnd = et;
			arrTempDate = (pobj.pl[i].listTop[0].dt).split("/");
			var appStartDate = arrTempDate[2] + "-" + arrTempDate[1] + "-"
					+ arrTempDate[0];

			event = new Object();
			event.title = patientName;
			event.docName = docName;
			event.start = appStartDate + "T" + appTimeStart;
			event.end = appStartDate + "T" + appTimeEnd;
			var newdate = "";

			if (color == "yellow") {
				event.backgroundColor = Theme.colors.yellow;
				event.color = Theme.colors.yellow;
			} else if (color == "orange") {
				event.backgroundColor = Theme.colors.orange;
				event.color = Theme.colors.orange;
			} else if (color == "pink") {
				event.backgroundColor = Theme.colors.pink;
				event.color = Theme.colors.pink;
			} else if (color == "green") {
				event.backgroundColor = Theme.colors.green;
				event.color = Theme.colors.green;
			} else {
				event.backgroundColor = Theme.colors.red;
				event.color = Theme.colors.red;
			}
			// event.backgroundColor = Theme.colors.red;
			// event.color = Theme.colors.red;

			event.allDay = false; //
			events.push(event);
		}
	}

	$('#calendar').html("");
	$('#calendar').fullCalendar({
		header : {
			left : 'prev,next today',
			center : 'title',
			right : 'month,agendaWeek,agendaDay',
			allDaySlot : false,
		},
		allDaySlot : !0,
		allDayText : "all-day",
		firstHour : 0,
		slotMinutes : 15,
		defaultEventMinutes : 120,
		axisFormat : "h(:mm)tt",
		timeFormat : {
			agenda : "h:mm{ - h:mm}"
		},
		dragOpacity : {
			agenda : .5
		},
		minTime : 0,
		maxTime : 24,
		slotEventOverlap : !0,
		selectable : true,
		selectHelper : true,
		select : function(start, end, allDay) {

			if (($("#pageName").val()) != "OTAppointment") {
				var r = confirm("Do you want to schedule appoinment?");
				if (r == true) {
					scheduleOperation(start, end);
				}
			}

			$(".popup").show();
			$(".title").focus();
			$(".submitFrom").click(function() {
				var title = "";
				if (title) {

					calendar.fullCalendar('renderEvent', {
						title : title,
						start : start,
						end : end,
						allDay : allDay
					}, true // make the event "stick"
					);
				}
				$(".popup").hide();
			});
			$(".exit").click(function() {
				// clear all info, unselect events and...
				$(".popup").hide();
			});
			// calendar.fullCalendar('unselect');
		},
		// editable : true,
		droppable : true
	});
	$('#calendar').fullCalendar('gotoDate', arrTempDate[2],
			(arrTempDate[1] - 1), arrTempDate[0]);
	$('#calendar').fullCalendar('addEventSource', events);
}

function clearDocName() {
	$("#userName").val("");
}

function showDocTypeDiv() {
	var type = $("#type").val();
	if (type == "doctor" || type == "rmo" || type == "visitingdoctor") {
		$("#doctypediv").show();
	} else {
		$("#doctypediv").hide();
	}
}

function setAutoDoctorNameForTeamMember(inputID, type) {

	$("#userDocId").val("0");

	var type = $("#type").val();
	if (type == 0) {
		alert("Please Select Type");
		return false;
	}
	var auto = "getUserNameFromType";
	var findingName = $("#userName").val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('type=' + type);
	inputs.push('q=' + findingName);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "AutoSuggetionServlet",
				url : "./ehat/otdata/getUserNameFromType",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {

				},
				success : function(r) {
					ajaxResponse = r;
					var availableTags = [];
					availableTags = ajaxResponse;
					var template = "";
					var resultData = [];
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

					$("#div" + inputID + " .typeahead").html(template);

					if (type != "onload") {
						$("#div" + inputID + " .typeahead").show();
					}
					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 200);

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

		$("#userName").val((item.text).trim());
		$("#userDocId").val(item.value);
	}

}

function setAutoCompleteForDoctorName(inputId, callfrom) {

	var usertype = "";
	if (callfrom == "OTSchedule" || callfrom == "ManageOT" || callfrom == "onchange") {
		usertype = $("#type").val();
	}
	var findingName = $("#" + inputId).val();

	if (usertype == "" || usertype == "select") {
		alert("Please select Doctor Type.");
		return false;
	} else {
		var inputs = [];
		inputs.push('action=setAutoCompleteForDoctorName');
		inputs.push('findingName=' + findingName);
		inputs.push('usertype=' + usertype);
		var str = inputs.join('&');

		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "./ehat/otdata/setAutoCompleteForDoctorName",
			timeout : 1000 * 60 * 15,
			cache : false,
			success : function(r) {
				// alert(r);
				// setTimeout(function() {
				// crtAutoComplete(r,id);
				autoCompTableNew(r, inputId);
				// }, 1000);
			}
		});
	}
}

function autoCompTableNew(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
	var myArray = response;// parsing response in JSON format
	$.widget('custom.mcautocomplete',$.ui.autocomplete,{
		_create : function() {
			this._super();
			this.widget().menu("option", "items","> :not(.ui-widget-header)");
		},
		_renderMenu : function(ul, items) {
			var self = this, thead;
			if (this.options.showHeader) {
				table = $('<div class="ui-widget-header" style="width:100%"></div>');
				/*alert("----"+item.name);*/
				$.each(this.options.columns,function(index, item) {
					table.append('<span style="padding:0 4px;float:left;width:'+ item.width + ';">'+ item.name +'</span>');
				});
				table.append('<div style="clear: both;"></div>');
				ul.append(table);
			}
			$.each(items, function(index, item) {
				self._renderItem(ul, item);
			});
		},
		_renderItem : function(ul, item) {
			var t = '', result = '';
			$.each(this.options.columns,function(index, column) {
				t += '<span style="padding:0 4px;float:left;width:'+ column.width + ';">'
				  + item[column.valueField ? column.valueField : index]
				  + '</span>';
			});
			result = $('<li></li>')
					.data('ui-autocomplete-item', item)
					.append('<a class="mcacAnchor">'+ t	+'<div style="clear: both;"></div></a>')
					.appendTo(ul);
			return result;
		}
	});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete({
		// These next two options are what this plugin adds to the
		// autocomplete widget.
		showHeader : true,
		columns : [ {
			name : 'Doctor Name',
			width : '200px',
			valueField : 'doc_name'
		}, {
			name : 'Specialization',
			width : '100px',
			valueField : 'speciality'
		}, {
			name : 'Speciality',
			width : '100px',
			valueField : 'specializationName'
		}, {
			name : 'Department',
			width : '100px',
			valueField : 'departmentName'
		}],

		// Event handler for when a list item is selected.
		select : function(event, ui) {
			
			var spl = (ui.item.specialisation = "" ? '' : ui.item.specialisation);
			if (ui.item.doc_name != 'No' && ui.item.spl != 'Record'	&& ui.item.specializationName != 'Found' && ui.item.depNm != 'Match') {
				$('#results').text(ui.item ? 'Selected: ' + ui.item.doc_name + ', '+ spl + ', '+ ui.item.specialisationName + ', ' + ui.item.departmentName: 'Nothing selected, input was ' + this.value);
				$('#' + id).val(ui.item.doc_name);
				//$('#userDocId').val(ui.item.ui);
				$('#userDocId').val(ui.item.user_ID);
				$('#selectedObj').html(JSON.stringify(ui.item));
			}

			return false;
		},

		// The rest of the options are for configuring the ajax
		// webservice call.
		minLength : 1,
		source : function(request, response) {
			var data = myArray;
			var result;
			if (!data || data.length === 0 || !data.doctorList || data.doctorList.length === 0) {
				
				result = [ {
					'doc_name' : 'No',
					'spl' : 'Record',
					'specialisationName' : 'Found',
					'depNm' : 'Match'
				} ];
			} else {
				result = data.doctorList;// Response List for All Services
			}
			response(result);
			$('#ui-id-1').css("z-index", "10000000000");
		}
	});
}

function addDoctorToScheduleOT(callfrom) {

	if ($("#userName").val() == "") {
		alert("Please select Doctor Name.");
		return false;
	}
	var doctype = $("#doctype").val();
	if (doctype == "" || doctype == "select") {
		alert("Please select Doctor Type.");
		return false;
	}
	var userName = $("#userName").val();
	var userId = $("#userDocId").val();
	var type = $("#type").val();

	if (type == "" || type == "select") {
		alert("Please select User Type.");
		return false;
	}

	var template = $("#teamMembersList").html();
	var teamMemberCount =$("#teamMembersList tr").length; 
	//parseInt($("#teamMemberCount").val());
	for ( var i = 1; i <= teamMemberCount; i++) {
		var id = $("#idUser" + i).val();
		if (id == userId) {
			alert("Already Present In List");
			$("#userName").val("");
			return false;
		}
	}							

	var pobj1 = $("#selectedObj").html();
	var myObj =  eval('(' + pobj1 + ')');
	
	var departmentName=myObj.departmentName;
	if(departmentName == null || departmentName == undefined || departmentName == "" || departmentName == "null" || departmentName == "undefined"){
		departmentName= "";
	}
	var speciality=myObj.speciality;
	if(speciality == null || speciality == undefined || speciality == "" || speciality == "null" || speciality == "undefined"){
		speciality= "";
	}
	var mobileNo=myObj.mobileNo;
	if(mobileNo == null || mobileNo == undefined || mobileNo == "" || mobileNo == "null" || mobileNo == "undefined"){
		mobileNo= "";
	}
	var email_Id=myObj.email_Id;
	if(email_Id == null || email_Id == undefined || email_Id == "" || email_Id == "null" || email_Id == "undefined" ){
		email_Id= "";
	}	
	if (callfrom == "OTschedule") {
		template = template
		+ "<tr id='idTr"
		+ (1 + teamMemberCount)
		+ "'><td class='' style='padding-right: 15px;'><div class='' id='"
		+ (1 + teamMemberCount)
		+ "'>"
		+ (1 + teamMemberCount)
		+ "<input type='hidden' id='idUser"
		+ (1 + teamMemberCount)
		+ "' value='"
		+ myObj.user_ID
		+ "' /><input type='hidden' id='idopDocTbl"+(1 + teamMemberCount)+"' value='0'></div></td>"
		+ "'<td style='width: 17%;'><div class='' id='docNameT"
		+ (1 + teamMemberCount)
		+ "'>"
		+ myObj.doc_name
		+ "</div></td>"
		+"<td style='width: 10%;'><div class='' id='userType"
		+ (1 + teamMemberCount)
		+ "'>"
		+ type
		+ "</div></td>" 
		+ "<td style='padding-left: 15px; width: 20%;'><div class='' id='docSpeciality"
		+ (1 + teamMemberCount)
		+ "'>"
		+ myObj.speciality
		+ "</div></td><td style='padding-left: 15px; width: 16%;'><div class='' id='docDpmt"
		+ (1 + teamMemberCount)
		+ "'>"
		+ departmentName
		+ "</div></td>" 
		+"<td style='padding-left: 15px; width: 12%;'><div class='' id='docTypeT"
		+ (1 + teamMemberCount)
		+ "'>"
		+ doctype
		+ "</div></td>" 
		+"<td style='width: 6%;'><div class='' id='docmobile"
		+ (1 + teamMemberCount)
		+ "'>"
		+ mobileNo
		+ "</div></td><td style='width: 14%;'><div class='' id='docemail"
		+ (1 + teamMemberCount)
		+ "'><a style='' href='mailto:" + myObj.eid + "'>"
		+ email_Id
		+ "</a></div></td><td class='center' style='width: 2%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
		+ (1 + teamMemberCount) + "'/></div></td></tr>";
	}else{
		template = template
		+ "<tr id='idTr"
		+ (1 + teamMemberCount)
		+ "'><td class='' style='padding-right: 15px;'><div class='' id='"
		+ (1 + teamMemberCount)
		+ "'>"
		+ (1 + teamMemberCount)
		+ "<input type='hidden' id='idUser"
		+ (1 + teamMemberCount)
		+ "' value='"
		+ myObj.user_ID
		+ "' /></div></td><td class='col-md-2-1 center' style=''><div class='' id='docNameT"
		+ (1 + teamMemberCount)
		+ "'>"
		+ myObj.doc_name
		+ "</div></td>"
		+"<td class='col-md-1-1 center' style=''><div class='' id='userType"
		+ (1 + teamMemberCount)
		+ "'>"
		+ type
		+ "</div></td>" 
		+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docSpeciality"
		+ (1 + teamMemberCount)
		+ "'>"
		+ myObj.speciality
		+ "</div></td><td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docDpmt"
		+ (1 + teamMemberCount)
		+ "'>"
		+ departmentName
		+ "</div></td>" 
		+"<td class='col-md-1-1 center' style='padding-left: 15px;'><div class='' id='docTypeT"
		+ (1 + teamMemberCount)
		+ "'>"
		+ doctype
		+ "</div></td><td class='center' style=''><div class=''><input type='checkbox' name='checkBoxDoc' value='"
		+ (1 + teamMemberCount) + "'/></div></td></tr>";
	}

	$("#teamMemberCount").val((1 + teamMemberCount));
	var temp;

	$("#teamMembersList").setTemplate(template);
	$("#teamMembersList").processTemplate(temp);

	$("#userName").val("");
	$("#userDocId").val(0);

	$("#type").val("select");
	$("#doctype").val("select");

}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 19-Dec-2016
 * @reason : add row in pre-operativechecklist template(onclick'+')
 ******************************************************************************/
var i = 1;
function addRowPOCLTemp() {// createPCAdminInstruction

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var txtPOCLName = $("#txtPOCLName" + rowCount + "").val();

		if (txtPOCLName == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;
	var divId = "PCAdminInstruction" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("TableBodyPCAdminInstructionTempName").appendChild(
			x);
	document.getElementById(divId).innerHTML = "<td class='col-md-1'>"
			+ (rowCount)
			+ "</td>"
			+ "<td class='col-md-8'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='Pre-Operative List Name' id='txtPOCLName"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-md-2'>"
			+ "<input type='text' class='form-control input-SmallText' placeholder='Remark' id='txtPOCLRemark"
			+ rowCount + "' /></td>"

			+ "<td class='col-md-1 center'>"
			+ "<input type='checkbox' name='checkboxPCAI" + rowCount
			+ "' /></td>" + "<input type='hidden' value='0'  id='idskco"
			+ rowCount + "' name='idskco" + rowCount + "' />" + "</tr>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 20-Dec-2016
 * @reason : remove row in pre-operativechecklist template(onclick'-')
 ******************************************************************************/
function removeRowPOCLTemp(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	// var allVals = [];
	for ( var n = 1; n <= rowCount; n++) {
		var $radios = $('input:checkbox[name=checkboxPCAI' + n + ']');
		if ($radios.is(':checked') == true) {
			$("#PCAdminInstruction" + n).remove();
			hiddenRowCount.value = hiddenRowCount.value - 1;

		}
	}
	$("#RowCount").val(hiddenRowCount.value);

}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 20-Dec-2016
 * @reason : save or update template fuction onclick
 ******************************************************************************/
function saveTemplate(pageType) {

	if (pageType == "pre-op") {

		var queryType = $("#btnSave").val();
		var idTempMast = $("#chkTopicList").val();
		var tempName = $.trim($("#txtTempName").val());
		var unitId = $.trim($("#unitId").val());

		if (tempName == null || tempName == "") {
			alert("Please Enter Topic Name.");
			return false;
		}

		var objSKC = 0;
		objSKC = {
			surgicalKitCompList : []
		};

		var rowCount = $("#RowCount").val();
		var count = 0;
		if (rowCount == 0) {
			alert("You can not save empty fields.");
			return false;
		}

		for ( var i = 1; i <= rowCount; i++) {

			count++;

			var txtPOCLName = $.trim($("#txtPOCLName" + count + "").val());

			if (queryType != "Update Now") {
				if (txtPOCLName == "") {
					alert("You can not save empty field");
					$.trim($("#txtPOCLName" + count + "").focus());
					return false;
				}
			}

			var txtPOCLRemark = $.trim($("#txtPOCLRemark" + count + "").val());

			var txtidskco = "";
			if (queryType == "Save Now") {
				txtidskco = 0;
			} else {
				txtidskco = $("#idskco" + count + "").val();
			}

			if (txtPOCLName != undefined) {
				objSKC.surgicalKitCompList.push({
					"idTempTopicSlave" : txtidskco,
					"preOperativeListName" : txtPOCLName,// itnm
					"remark" : txtPOCLRemark,// item_nameM
					"unitId" : unitId
				});
			}
		}

		if (queryType != "Update Now") {
			if (objSKC.surgicalKitCompList.length == 0) {
				alert("You can not save empty fields.");
				return false;
			}
		}
		
		if(idTempMast == undefined || idTempMast == "" || idTempMast == null){
			idTempMast=0;
		}

		objSKC = JSON.stringify(objSKC);
		var inputs = [];
		inputs.push('queryType=' + queryType);
		inputs.push('pageType=' + pageType);
		inputs.push('objSKC=' + objSKC);
		inputs.push('tempName=' + encodeURIComponent(tempName));
		inputs.push('idTempMast=' + idTempMast);
		inputs.push('unitId=' + unitId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "AdminServlet",
			url : "./ehat/otdata/saveTemplate",
			timeout : 1000 * 60 * 5,
			error : function() {
				alert("something went wrong...")
			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				fetchTempTopicList('pre-op');// fetchSurgicalKitNm('instructions');
				// fetchPCTreatmentInstruction();
			}
		});
	}
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 20-Dec-2016
 * @reason : template to set pre-operative checkList tempName
 ******************************************************************************/
var tempTopicList = "<option value='0' onclick='newTempTopic()'>NewTemplate</option>"
		+ "{#foreach $T.skmli as skmli}"
		+ "<option onclick=updateTempDetails('{$T.skmli.idTempTopic}','pre-op') value={$T.skmli.idTempTopic} >{$T.skmli.topicName}"
		+ "</option>{#/for}";
var tempTopicList2 = "<option value='0'>--select--</option>"
		+ "{#foreach $T.skmli as skmli}"
		+ "<option onclick=updateTempDetails('{$T.skmli.idTempTopic}','OTOperationAction') value={$T.skmli.idTempTopic} >{$T.skmli.topicName}"
		+ "</option>{#/for}";

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 20-Dec-2016
 * @reason : to fetch template topic list
 ******************************************************************************/
function fetchTempTopicList(pageName) {// fetchSurgicalKitNm('instruction')
	var inputs = [];
	inputs.push('action=fetchTempTopicList');
	inputs.push('pageName=' + pageName);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchTempTopicList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
		},
		success : function(r) {
			ajaxResponse = r;
			$("#divPreopCheckList").html(JSON.stringify(r));
			var obj = eval( ajaxResponse);
			if (pageName == 'pre-op') {
				newTempTopic();// newTopicPCAdminInstruction();

				$("#chkTopicList").setTemplate(tempTopicList);
				$("#chkTopicList").processTemplate(obj);
			} else if (pageName == 'OTOperationAction') {

				$("#iSelTemp").setTemplate(tempTopicList2);
				$("#iSelTemp").processTemplate(obj);
			}
		}
	});
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 20-Dec-2016
 * @reason : to add new template topic onclick
 ******************************************************************************/
function newTempTopic() {// newTopicPCAdminInstruction
	$("#TableBodyPCAdminInstructionTempName").html("");
	$("#chkTopicList").val(0);
	$("#txtTempName").val("");
	$("#txtTempId").val(0);
	$("#addRowCount").val("0");
	$("#RowCount").val("0");
	addRowPOCLTemp();
	$("#addRowCount").val("1");
	$("#RowCount").val("1");
	$("#btnSave").val("Save Now");
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 21-Dec-2016
 * @reason : show template details onclick- set to update
 ******************************************************************************/
function updateTempDetails(idskm, pageName) {
	var idtemp = $("#idTempMast").val();
	if (idtemp == idskm) {
		alert("Template Already Selected...");
		return false;
	}
	$("#txtTempName").val($("#chkTopicList option[value=" + idskm + "]").text());
	$("#idTempMast").val(idskm);
	
	var myObj = JSON.parse($("#divPreopCheckList").html());
	//$("#topic").html($("#divPreopCheckList").html());
	var obj1="";

	for(var i=0; i< myObj.skmli.length; i++){
		
		if(Number(myObj.skmli[i].idTempTopic) == Number(idskm)){
			
			obj1 = myObj.skmli[i];
			break;
		}
	}
	if (pageName == "pre-op") {
		count = 1;
		$("#TableBodyPCAdminInstructionTempName").setTemplate(TableBodyPCAdminInstructionTempName1);
		$("#TableBodyPCAdminInstructionTempName").processTemplate(obj1);

	} else if (pageName == "OTOperationAction") {
		var w = $("#adRowCount").val();
		var rowCount = $("#RowCount").val();
		for ( var i = 0; i < obj1.skcli.length; i++) {// data.skcli.txtPOCLName
			rowCount++;
			divId = "div" + rowCount;
			var x = document.createElement('tr');
			x.setAttribute('id', divId);
			document.getElementById("PreOpPrepList").appendChild(x);
			document.getElementById(divId).innerHTML = '<td	class="left" style="width: 2%;">'
					+ rowCount
					+ '</td><td	class="col-md-5-1" style="height: 21.5px; padding-left: 50px;"><input type="text" class="typeahead form-control input-SmallText " onkeypress=setAutoPatientName(this.id,"onload","OTOperationAction") id="byName'
					+ rowCount
					+ '" style="width: 100%" value="'
					+ obj1.skcli[i].preOperativeListName
					+ '" /></td><td class="col-md-1-1 center" style="height: 21.5px;"><input type="checkbox" id="chbx'
					+ rowCount
					+ '"/></td><td class="col-md-2-1 center" style="height: 21.5px;"><input readonly="readonly" class="form-control input-SmallText" type="text" id="time'
					+ rowCount
					+ '" onkeypress="return validateComma(event)"/></td><td class="col-md-1-1 center" style="height: 21.5px;"><textarea rows="1" cols="20" id="rmk'
					+ rowCount
					+ '" onkeypress="return validateComma(event)">'
					+ obj1.skcli[i].remark
					+ '</textarea><td class="col-md-1-1 center" style="height: 21.5px;"><input type="checkbox" onClick="removePreOpPrep(0,'
					+ rowCount
					+ ')" name="checkbox'
					+ rowCount
					+ '" id="action'
					+ rowCount
					+ '" /></td></div>';

			$("#RowCount").val(rowCount);
			$("#addRowCount").val(w);

			$('#time' + rowCount).datetimepicker({
				datepicker : false,
				format : 'H:i',
				step : 15
			});
			w++;
			$("#adRowCount").val(w);
		}
	}

	$('input:radio[name="radioStatus"]').filter('[value="Y"]').attr('checked', true);

	if (obj1.skcli.length == 0) {
		$("#btnSave").val("Update Now");
		$("#idTempMast").val(0);
	} else {

		$("#idTempMast").val(idskm);
		$("#btnSave").val("Update Now");
	}
	
	/*count = 1;
	var inputs = [];
	inputs.push('action=fetchSKDetails');
	inputs.push('idskm=' + idskm);
	inputs.push('pageName=' + pageName);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "AdminServlet",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					ajaxResponse = r;
					var obj1 = eval('(' + ajaxResponse + ')');
					$("#topic").html(ajaxResponse);

					if (pageName == "pre-op") {
						count = 1;
						$("#TableBodyPCAdminInstructionTempName").setTemplate(
								TableBodyPCAdminInstructionTempName1);
						$("#TableBodyPCAdminInstructionTempName")
								.processTemplate(obj1);

					} else if (pageName == "OTOperationAction") {
						var w = $("#adRowCount").val();
						var rowCount = $("#RowCount").val();
						for ( var i = 0; i < obj1.skcli.length; i++) {// data.skcli.txtPOCLName
							rowCount++;
							divId = "div" + rowCount;
							var x = document.createElement('tr');
							x.setAttribute('id', divId);
							document.getElementById("PreOpPrepList")
									.appendChild(x);
							document.getElementById(divId).innerHTML = '<td	class="left" style="width: 2%;">'
									+ rowCount
									+ '</td><td	class="col-md-5-1" style="height: 21.5px; padding-left: 50px;"><input type="text" class="typeahead form-control input-SmallText " onkeypress=setAutoPatientName(this.id,"onload","OTOperationAction") id="byName'
									+ rowCount
									+ '" style="width: 100%" value="'
									+ obj1.skcli[i].txtPOCLName
									+ '" /></td><td class="col-md-1-1 center" style="height: 21.5px;"><input type="checkbox" id="chbx'
									+ rowCount
									+ '"/></td><td class="col-md-2-1 center" style="height: 21.5px;"><input readonly="readonly" class="form-control input-SmallText" type="text" id="time'
									+ rowCount
									+ '" onkeypress="return validateComma(event)"/></td><td class="col-md-1-1 center" style="height: 21.5px;"><textarea rows="1" cols="20" id="rmk'
									+ rowCount
									+ '" onkeypress="return validateComma(event)">'
									+ obj1.skcli[i].txtPOCLRemark
									+ '</textarea><td class="col-md-1-1 center" style="height: 21.5px;"><input type="checkbox" onClick="removePreOpPrep(0,'
									+ rowCount
									+ ')" name="checkbox'
									+ rowCount
									+ '" id="action'
									+ rowCount
									+ '" /></td></div>';

							$("#RowCount").val(rowCount);
							$("#addRowCount").val(w);

							$('#time' + rowCount).datetimepicker({
								datepicker : false,
								format : 'H:i',
								step : 15
							});
							w++;
							$("#adRowCount").val(w);
						}

					}

					$('input:radio[name="radioStatus"]').filter('[value="Y"]')
							.attr('checked', true);

					if (obj1.skcli.length == 0) {
						$("#btnSave").val("Update Now");
						$("#idTempMast").val(0);
					} else {

						$("#idTempMast").val(idskm);
						$("#btnSave").val("Update Now");
					}
				}
			});*/
}

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 20-Dec-2016
 * @reason : template topic list
 ******************************************************************************/
var TableBodyPCAdminInstructionTempName1 = "{#foreach $T.skcli as skcli}"
		+ "<tr id='PCAdminInstruction{count}'>"
		+ "<td class='col-md-1'>{count}</td>"
		+ "<td class='col-md-8' >"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtPOCLName{count}'  value='{$T.skcli.preOperativeListName}'></td>"
		+ "<td class='col-md-2'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtPOCLRemark{count}'  value='{$T.skcli.remark}'></td>"
		+ "<td class='col-md-1 center'><input type='checkbox' name='checkboxPCAI{count}' value='{$T.skcli.idTempTopicSlave}' style='cursor: pointer' /></td>"
		+ "<input type='hidden' value='{$T.skcli.idTempTopicSlave}'  id='idskco{count}' name='idskco{count}' />"
		+ "<input type='hidden' value='{count++}'  id='txtRowCount' name='txtRowCount' />"
		+ "</tr>{#/for}"
		+ "<input type='hidden' value='{--count}' id='addRowCount' />"
		+ "<input type='hidden' value='{count}' id='RowCount' />";

/*******************************************************************************
 * @author : Irfan Khan
 * @date : 21-Dec-2016
 * @reason : delete template topic with all details
 ******************************************************************************/
function deleteTempTopic(callFrom) {

	var idTempTopic = $("#chkTopicList").val();
	if (idTempTopic == 0) {
		alert("Select Template Topic to Delete");
		return false;
	}
	var r = confirm("Are You confirm To Delete Template ? ");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deleteTempTopic');
		inputs.push('callFrom=' + callFrom);
		inputs.push('idTempTopic=' + idTempTopic);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			},
			success : function(r) {
				alert(r);
				fetchTempTopicList('pre-op');
			}
		});
	}
}
// Author @Tushar : @Code For:OT Operation Details (Add Doctor)
function actionOTschedule(pId, tId, Id, tomId) {
	window.location.href = "OTOperationAction.jsp?" + "pId="
			+ encodeURIComponent(pId) + "&tId=" + encodeURIComponent(tId)
			+ "&Id=" + encodeURIComponent(Id) + "&tomId="
			+ encodeURIComponent(tomId);
}

var patientInfoIPD = '<div class="panel-body Remove-Bottom-Margin Remove-Padding col-md-12-1">	'
	+ '<div class="Remove-Bottom-Margin Remove-Padding col-md-12-1"><div class="well bottom-padding col-md-12-1">'
	+ '<form role="form" class="form-inline"><div class="col-md-12-1" style="padding-top: 3px;">	'
	+ '<div class="list-group list-group-margin-bottom col-md-1-1" style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: -9px;">'
	+ '<li class="list-group-item zero-padding col-md-6-1" style="margin-top: 0px;">'
	+ '<img alt="Patient Image"	class="img-responsive col-md-12-1" style="margin-right: 0px; margin-top: 0px;" src="pharmacy/pharmacy/readImage?url={$T.img}"   alt="Patient"   ></li></div>'
	+ '<div style="padding-top: 15px" class="col-md-11-1">'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont">Patient Id:</label>'
	+ '<label id="" class="col-md-4-1 TextFont">{$T.pl[0].pi}</label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-5-1 TextFont" >Patient Name:</label>'
	+ '<label id="" class="col-md-4-1 TextFont">{$T.tit}{$T.fn}&nbsp;{$T.mn}&nbsp;{$T.ln}</label>'
	+ '</div><div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont" >IPD No:</label>'
	+ '<label id="trCount" class="col-md-4-1 TextFont">{$T.pl[0].objTreat.trCount}</label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont" class="col-md-4-1 TextFont">Age:</label>'
	+ '<label id="" class="col-md-4-1 TextFont"	>{$T.ag}&nbsp(YY)&nbsp{$T.month}&nbsp(MM)&nbsp{$T.days}&nbsp(DD)</label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Gender:</label>'
	+ '<label id=""  class="col-md-4-1 TextFont">{$T.sx}</label></div></div>'
	+ '<div style="padding-top: 14px; margin-bottom: -10px;"	class="col-md-11-1"><div class="col-md-2-1">'
	+ '<div class="divide-10"></div>'
	+ '<label class="col-md-6-1 TextFont" >Consulting Doct:</label>'
	+ '<label id="" class="col-md-12-1 TextFont">{$T.objDoc.dn}</label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-6-1 TextFont" >Registered Date:</label>'
	+ '<label id="" class="col-md-4-1 TextFont">{$T.rgDt}</label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-5-1 TextFont" class="col-md-4-1 TextFont">DOA</label>'
	+ '<label id=""	></label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont" >DOD:</label>'
	+ '<label id="" class="col-md-4-1 TextFont"></label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1" class="col-md-4-1 TextFont">Corporate:</label>'
	+ '<label id="" class="col-md-4-1 TextFont"> </label></div>'
	+ '<div class="col-md-2-1"><div class="divide-10"></div>'
	+ '<label class="col-md-4-1 TextFont" for="exampleInputEmail1">Weight:</label>'
	+ '<label id="" class="col-md-4-1 TextFont">{$T.wt}&nbsp;&nbsp;Kg</label>'
	+ '</div></div></div></form></div></div></div><input type="hidden" id="treatmentId" value="{$T.trid}"><input id="patientDOB" type="hidden" value="{$T.db}"/>';


var CommanInfoTemplate = '<div class="panel-body Remove-Bottom-Margin Remove-Padding col-md-12-1">	'
	    + '<div class="Remove-Bottom-Margin Remove-Padding col-md-12-1"><div class="well bottom-padding col-md-12-1">'
	    + '<form role="form" class="form-inline"><div class="col-md-12-1" style="padding-top: 3px;">	'
	    + '<div class="list-group list-group-margin-bottom col-md-1-1" style="border: hidden; margin-left: -9px; margin-top: 0px; margin-right: 0px; padding-left: 0px; margin-bottom: 9px;">'
	    + '<li class="list-group-item zero-padding col-md-6-1" style="margin-top: 0px;">'
	    + '<img alt="Patient Image"	class="img-responsive col-md-12-1" style="margin-right: 0px; margin-top: 0px;" src="pharmacy/pharmacy/readImage?url={$T.img}"   alt="Patient"   ></li></div>'
	    + '<div style="padding-top: 15px" class="col-md-11-1">'
	    
		+ '<div class="col-md-2-1">'
		+ '<div class="divide-10"></div><label class="col-md-5-1 TextFont" >Patient ID:</label>'
		+ '<label id="patID" class="col-md-7-1 TextFont">{$T.pl[0].pi}</label></div>'
		
		+ '<div class="col-md-4-1">'
		+ '<div class="divide-10"></div><label class="col-md-4-1 TextFont" >Patient Name:</label>'
		+ '<label id="patName" class="col-md-6-1 TextFont">{$T.pl[0].tit}{$T.pl[0].fn}&nbsp;{$T.pl[0].mn}&nbsp;{$T.pl[0].ln}</label></div>'
		
		+ '<div class="col-md-3-1">'
		+ '<div class="divide-10"></div><label class="col-md-6-1 TextFont" >Treatment Count:</label>'
		+ '<label id="patID" class="col-md-6-1 TextFont">{$T.pl[0].objTreat.trCount}</label></div>'
		
		+ '</div>'
	    + '<div style="padding-top: 15px" class="col-md-11-1">'
	    
		+ '<div class="col-md-3-1">'
		+ '<div class="divide-10"></div><label class="col-md-5-1 TextFont" >Registered Date:</label>'
		+ '<label id="regDate" class="col-md-7-1 TextFont">{$T.pl[0].rgDt}</label></div>'
		
		+ '<div class="col-md-4-1">'
		+ '<div class="divide-10"></div><label class="col-md-4-1 TextFont" >Refer-By:</label>'
		+ '<label id="refDoc" class="col-md-7-1 TextFont"> {$T.pl[0].objTreat.txtRefByNM}</label></div>'
		
		+ '<div class="col-md-4-1">'
		+ '<div class="divide-10"></div><label class="col-md-4-1 TextFont" >Bill Category:</label>'
		+ '<label id="" class="col-md-7-1 TextFont"> {$T.pl[0].objTreat.billCategory_Name}</label></div>'
		
		+ '</div>'
		+ '<div style="padding-top: 15px" class="col-md-11-1">'
		
		+ '<div class="col-md-2-1">'
		+ '<div class="divide-10"></div><label class="col-md-6-1 TextFont" >Operation Date:</label>'
		+ '<label id="OpDate" class="col-md-6-1 TextFont">{$T.pl[0].objtrop.dt}</label></div>'
		
		+ '<div class="col-md-3-1">'
		+ '<div class="divide-10"></div><label class="col-md-5-1 TextFont" >Operation Time:</label>'
		+ '<label id="OpTime" class="col-md-7-1 TextFont">  {$T.pl[0].objtrop.st} - {$T.pl[0].objtrop.et}  </label></div>'
		
		+ '<div class="col-md-6-1">'
		+ '<div class="divide-10"></div><label class="col-md-4-1 TextFont" >Operation Name:</label>'
		+ '<label id="OpName" class="col-md-8-1 TextFont" > {$T.pl[0].objOperation.on} </label></div>'
		
		+ '<input id="consultDoc" type="hidden" value="{$T.pl[0].objDoc.dn}"></div>'
		+ '</div></div></form></div></div></div></div>';

function PatientCommanInfo() {

	var pId = $("#pId").val();
	var tId = $("#tId").val();
	var tomId = $("#tomId").val();
	var topId = $("#Id").val();
	
	var inputs = [];
	inputs.push('pId=' + pId);
	inputs.push('tId=' + tId);
	inputs.push('topId=' + topId);
	inputs.push('tomId=' + tomId);
	inputs.push('action=PatientCommanInfo');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			var pobj1 = eval('(' + ajaxResponse + ')');
			//alert(r);
			/*$("#commonPatInfo").setTemplate(CommanInfoTemplate);
			$("#commonPatInfo").processTemplate(pobj1);*/
			
			//alert(pobj1.pl[0].tit);
			
			 $("#pt_Id").val();
			 $("#tr_Id").val();  
			 $("#depdocdeskid").val();
			$("#patientId").text(pobj1.pl[0].pi);
			$("#centerPatientId").text(pobj1.pl[0].center_patient_id);
			
			$("#age").text("8-D");
			$("#patientName").text(pobj1.pl[0].tit + ""+ pobj1.pl[0].fn +" "+pobj1.pl[0].mn+"" +pobj1.pl[0].ln);
		 //   $("#billNo").text(pobj1.listRegTreBillDto[0].billId);
			
			//$("#sex").text("male");
			/*$("#pt_Id").val(r.listRegTreBillDto[0].patientId);*/
		
		  ///  $("#bill_Id").val(""); 
		//    $("#ipdNo").text(pobj1[0].objTreat[0].trCount);
		    $("#billCategoty").text(pobj1.pl[0].txtRefByNM);
		   // $("#depdocdeskid").val(pobj1.listRegTreBillDto[0].departmentId); 
		}
	});
}

var OTDDocOperationDetailsTemp = "<div class='col-md-12-1' style='margin-top:0px; border: 1px solid #ddd; height: 400px;'>"
		+ "<table>"
		+ "<tbody>"
		+ "{#foreach $T.liOpDoc as pl}"
		+ "<tr>"
		+ "<td><input type='hidden' id='idUser{otcount}' value='{$T.pl.idopDoc}' />{otcount++}.</td>"
		+ "<td style='height: 21.5px;  width: 20%; padding-left: 30px;'>{$T.pl.docName}</td>"
		+ "<td style='height: 21.5px; width: 10%; padding-left: 10px;'>{$T.pl.surgtp}</td>"
		+ "<td style='height: 21.5px; width: 10%; padding-left: 10px;'>{$T.pl.objDoc.mobileNo}</td>"
		+ "<td style='height: 21.5px; width: 20%; padding-left: 50px;'>{$T.pl.objDoc.email_Id}</td>"
		+ "<td style='height: 21.5px; width: 6%; padding-left: 20px;'>"
		+ "<input type='checkbox' onclick=ShowNarraPopUp({$T.pl.idopDoc},'dl') id='btnRemove{$T.pl.idopDoc}' value={$T.pl.idopDocTbl}>"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 6%; padding-left: 20px;'>"
		+ "{#if $T.pl.confirm == 'Y'}"
		+ "<input type='checkbox' onclick='confirmDoc({$T.pl.idopDoc})' id='btnConfirm{$T.pl.idopDoc}' checked = 'checked' value={$T.pl.idopDocTbl}>"
		+ "{#else}"
		+ "<input type='checkbox' onclick='confirmDoc({$T.pl.idopDoc})' id='btnConfirm{$T.pl.idopDoc}' value={$T.pl.idopDocTbl}>"
		+ "{#/if}</td>"
		+ "<td style='height: 21.5px; width: 8%; padding-left: 20px;'>{$T.pl.conTime}</td>"
		+ "<td style='height: 21.5px; width: 6%; padding-left: 20px;'>"
		+ "{#if $T.pl.arrival == 'Y'}"
		+ "<input type='checkbox' onclick='arrivalDoc({$T.pl.idopDoc})' id='btnArrive{$T.pl.idopDoc}' checked = 'checked' value={$T.pl.idopDocTbl}>"
		+ "{#else}"
		+ "<input type='checkbox' onclick='arrivalDoc({$T.pl.idopDoc})' id='btnArrive{$T.pl.idopDoc}' value={$T.pl.idopDocTbl}>"
		+ "{#/if}</td>"
		+ "<td style='height: 21.5px; width: 8%; padding-left: 20px;'>{$T.pl.arrTime}</td>"
		+ "<td style='height: 21.5px;  width: 6%; padding-left: 20px;'>"
		+ "{#if $T.pl.absent == 'Y'}"
		+ "<input type='checkbox' onclick=ShowNarraPopUp({$T.pl.idopDoc},'ab') id='btnAbsent{$T.pl.idopDoc}' checked = 'checked' value={$T.pl.idopDocTbl}>"
		+ "{#else}"
		+ "<input type='checkbox' onclick=ShowNarraPopUp({$T.pl.idopDoc},'ab') id='btnAbsent{$T.pl.idopDoc}' value={$T.pl.idopDocTbl}>"
		+ "{#/if}</td>" + "</tr>{#/for}</tbody></table></div>";

var OTDDocOperationDetailsTemp1 = "<div class='col-md-12-1' style='margin-top:0px; border: 1px solid #ddd; height: 400px;'>"
	+ "<table>"
	+ "<tbody>"
	+ "{#foreach $T.liOpDoc as pl}"
	+ "<tr>"
	+ "<td><input type='hidden' id='idUser{otcount}' value='{$T.pl.idopDoc}' />{otcount++}.</td>"
	+ "<td style='height: 21.5px;  width: 20%; padding-left: 30px;'>{$T.pl.objDoc.doc_name}</td>"
	+ "<td style='height: 21.5px; width: 10%; padding-left: 10px;'>{$T.pl.surgtp}</td>"
	+ "<td style='height: 21.5px; width: 10%; padding-left: 10px;'>{$T.pl.objDoc.mobileNo}</td>"
	+ "<td style='height: 21.5px; width: 20%; padding-left: 50px;'>{$T.pl.objDoc.email_Id}</td>"
	+ "<td style='height: 21.5px; width: 6%; padding-left: 20px;'>"
	+ "<input type='checkbox' id='btnRemove{$T.pl.idopDoc}' readonly='true' value={$T.pl.idopDocTbl}>"
	+ "</td>"
	+ "<td style='height: 21.5px; width: 6%; padding-left: 20px;'>"
	+ "{#if $T.pl.confirm == 'Y'}"
	+ "<input type='checkbox' id='btnConfirm{$T.pl.idopDoc}' checked = 'checked' readonly='true' value={$T.pl.idopDocTbl}>"
	+ "{#else}"
	+ "<input type='checkbox' id='btnConfirm{$T.pl.idopDoc}' readonly='true' value={$T.pl.idopDocTbl}>"
	+ "{#/if}</td>"
	+ "<td style='height: 21.5px; width: 8%; padding-left: 20px;'>{$T.pl.conTime}</td>"
	+ "<td style='height: 21.5px; width: 6%; padding-left: 20px;'>"
	+ "{#if $T.pl.arrival == 'Y'}"
	+ "<input type='checkbox' id='btnArrive{$T.pl.idopDoc}' checked = 'checked' readonly='true' value={$T.pl.idopDocTbl}>"
	+ "{#else}"
	+ "<input type='checkbox' id='btnArrive{$T.pl.idopDoc}' readonly='true' value={$T.pl.idopDocTbl}>"
	+ "{#/if}</td>"
	+ "<td style='height: 21.5px; width: 8%; padding-left: 20px;'>{$T.pl.arrTime}</td>"
	+ "<td style='height: 21.5px;  width: 6%; padding-left: 20px;'>"
	+ "{#if $T.pl.absent == 'Y'}"
	+ "<input type='checkbox' id='btnAbsent{$T.pl.idopDoc}' checked = 'checked' readonly='true' value={$T.pl.idopDocTbl}>"
	+ "{#else}"
	+ "<input type='checkbox' id='btnAbsent{$T.pl.idopDoc}' readonly='true' value={$T.pl.idopDocTbl}>"
	+ "{#/if}</td>" + "</tr>{#/for}</tbody></table></div>";

function fetchOperationDocList() {

	var tomId = $("#tomId").val();
	var returnType = $("#pageName").val();
	var inputs = [];
	inputs.push('tomId=' + tomId);
	inputs.push('action=fetchOperationDocList');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/fetchOperationDocList",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			var pobj1 = r;//eval('(' + ajaxResponse + ')');
			if(returnType == "OTOperationDetails"){
				$("#OperationDetailsList").setTemplate(OTDDocOperationDetailsTemp1);
				$("#OperationDetailsList").processTemplate(pobj1);
			}else{
				$("#OperationDetailsList").setTemplate(OTDDocOperationDetailsTemp);
				$("#OperationDetailsList").processTemplate(pobj1);	
			}
			var teamMemberCount = pobj1.liOpDoc.length;
			$("#teamMemberCount").val(teamMemberCount);
			
		}
	});
}

function deleteDocRecord() {

	var docId = $("#docId").val();
	var tomId = $("#tomId").val();
	var narra = $("#txtComment").val();
	var idopDocTbl = $("#idopDocTbl").val();
	var inputs = [];
	inputs.push('docId=' + docId);
	inputs.push('tomId=' + tomId);
	inputs.push('narra=' + narra);
	inputs.push('idopDocTbl=' + idopDocTbl);
	//inputs.push('action=deleteDocRecord');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/deleteDocRecord",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			HideNarraPopUp();
			fetchOperationDocList();
		}
	});
}

function ShowAddDocPopUp() {
	$("#iDoctorBox").modal('show');
}
function HideAddDocPopUp() {
	$("#iDoctorBox").modal('hide');
}

function confirmDoc(id) {

	var docId = id;
	var tomId = $("#tomId").val();
	var idopDocTbl = $("#btnConfirm"+id).val();
	var inputs = [];
	inputs.push('docId=' + docId);
	inputs.push('tomId=' + tomId);
	inputs.push('idopDocTbl=' + idopDocTbl);
	//inputs.push('action=confirmDoc');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/confirmDoc",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			fetchOperationDocList();
		}
	});
}

function arrivalDoc(id) {

	var docId = id;
	var tomId = $("#tomId").val();
	var idopDocTbl = $("#btnArrive"+id).val();
	var inputs = [];
	inputs.push('docId=' + docId);
	inputs.push('tomId=' + tomId);
	inputs.push('idopDocTbl=' + idopDocTbl);
	//inputs.push('action=arrivalDoc');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/arrivalDoc",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload(this);
		}
	});
}

function absentDoc() {

	var docId = $("#docId").val();
	var tomId = $("#tomId").val();
	var narra = $("#txtComment1").val();
	var idopDocTbl = $("#idopDocTbl").val();
	var inputs = [];
	inputs.push('docId=' + docId);
	inputs.push('tomId=' + tomId);
	inputs.push('narra=' + narra);
	inputs.push('idopDocTbl=' + idopDocTbl);
	//inputs.push('action=absentDoc');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/absentDoc",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload(this);
		}
	});
}

function ShowNarraPopUp(id, callFrom) {
	$("#docId").val(id);
	if (callFrom == "ab") {
		if ($('#btnAbsent' + id).attr('checked', true)) {
			$("#iNarraBox2").modal('show');
			var idopDocTbl = $("#btnAbsent"+id).val();
			$("#idopDocTbl").val(idopDocTbl);
		} else {
			($('#btnAbsent' + id).attr('checked', false))
			//$("#iNarraBox2").modal('show');
		}
	} else if (callFrom == "dl") {
		if ($('#btnRemove' + id).attr('checked', true)) {
			$("#iNarraBox1").modal('show');
			var idopDocTbl = $("#btnRemove"+id).val();
			$("#idopDocTbl").val(idopDocTbl);
		} else {
			($('#btnRemove' + id).attr('checked', false))
		}
	}
}

function HideNarraPopUp() {
	$("#iNarraBox1").modal('hide');
	$("#iNarraBox2").modal('hide');
}

function addDocNameToList1() {
	var Response1 = $("#selectedObj").html();
	ajaxRes = JSON.parse(Response1);//eval('(' + Response1 + ')');
	var docId = ajaxRes.doctor_ID;
	var tomId = $("#tomId").val();
	/*var type = $("#type").val();*/
	var userNm = $("#userName").val();
	var doctype = $("#doctype").val();
	if ($("#userName").val() == "") {
		alert("Please select Doctor Name.");
		return false;
	}
	var doctype = $("#doctype").val();
	if (doctype == "" || doctype == "select") {
		alert("Please select Doctor Type.");
		return false;
	}
	var userName = $("#userName").val();
	var userId = $("#userDocId").val();
	var type = $("#type").val();

	var teamMemberCount = parseInt($("#teamMemberCount").val());
	for ( var i = 1; i <= teamMemberCount; i++) {
		var id = $("#idUser" + i).val();
		if (id == userId) {
			alert("Already Present In List");
			$("#userName").val("");
			return false;
		}
	}

	var inputs = [];
	inputs.push('docId=' + docId);
	inputs.push('tomId=' + tomId);
	inputs.push('type=' + type);
	inputs.push('userNm=' + userNm);
	inputs.push('doctype=' + doctype);

	inputs.push('action=addDocNameToList1');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/addDocNameToList1",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload(this);
		}
	});
}

function savePreOpPrep() {

	var addRowCount = $("#addRowCount").val();
	var allVals = [];
	var flag = false;
	$.each($('#action' + addRowCount), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("No Data in List...");
		return false;
	}

	var Response1 = $("#POP").html();
	ajaxRes = eval('(' + Response1 + ')');
	var z = 0;

	for ( var m = 1; m <= ajaxRes.ListPreOpPrep.length; m++) {
		if ($("#time" + m + "").val() == undefined) {
			ajaxRes.ListPreOpPrep[z].idtom = 0;
		} else {
			ajaxRes.ListPreOpPrep[z].chkName = $("#byName" + m + "").val();
			var chbx = $("#chbx" + m + "").is(':checked');
			if (chbx == true) {
				chbx = 'Y';
			} else {
				chbx = 'N';
			}
			ajaxRes.ListPreOpPrep[z].conf = chbx;
			ajaxRes.ListPreOpPrep[z].confTime = $("#time" + m + "").val();
			ajaxRes.ListPreOpPrep[z].rmk = $("#rmk" + m + "").val();
			ajaxRes.ListPreOpPrep[z].idPreOpPre = $("#idPreOpPre" + m + "")
					.val();
			ajaxRes.ListPreOpPrep[z].idtom = $("#tomId").val();
		}
		z++;
	}
	parsebcObj = JSON.stringify(ajaxRes);

	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var ReadStvalue = rowCount - addrowCount;
	if (rowCount == 0) {
		alert("Please add row to save...");
		return false;
	} else {
		var i;
		var PreOpPrepString = "";
		for (i = 1; i <= addrowCount; i++) {
			count++;
			if (document.getElementById("div" + count) != null) {
				var byName = $("#byName" + count + "").val();
				var chbx = $("#chbx" + count + "").is(':checked');
				if (chbx == true) {
					chbx = 'Y';
				} else {
					chbx = 'N';
				}
				var time = $("#time" + count + "").val();
				var rmk = $("#rmk" + count + "").val();
				var tomId = $("#tomId").val();

				if (byName == "" && time == "" && tomId == "") {
					alert("You can not save empty fields....");
					return false;
				} else if (time == undefined || time == "") {
					alert("Please select Time for Confirmation.");
					return false;
				} else if (byName == undefined || byName == "") {
					alert("Please select Check List Name.");
					return false;
				} else if (chbx == "" && rmk == "") {
					chbx = " ";
					rmk = " ";
					PreOpPrepString = PreOpPrepString + "@" + byName + ","
							+ chbx + "," + time + "," + rmk + "," + tomId;// +
																			// ","
																			// +
																			// tr;
				} else if (time == "") {
					time = " ";
					PreOpPrepString = PreOpPrepString + "@" + byName + ","
							+ chbx + "," + time + "," + rmk + "," + tomId;
				} else if (rmk == "") {
					rmk = " ";
					PreOpPrepString = PreOpPrepString + "@" + byName + ","
							+ chbx + "," + time + "," + rmk + "," + tomId;
				} else {
					PreOpPrepString = PreOpPrepString + "@" + byName + ","
							+ chbx + "," + time + "," + rmk + "," + tomId;
				}
			}
		}
	}
	if (parsebcObj != "null") {

		var inputs = [];
		inputs.push('action=savePreOpPrep');
		inputs.push('PreOpPrepString=' + PreOpPrepString);
		inputs.push('parsebcObj=' + parsebcObj);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "ehat/otdata/savePreOpPrep",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				fetchPreOpPre();
			}
		});
	}
}

var SetPrOpPrepTemp = "{#foreach $T.ListPreOpPrep as pl}"
		+ "<tr id='div{rowCount}'>"
		+ "<td class='left' style='width: 2%;'>{rowCount}</td>"
		+ "<td class='col-md-5-1' style='height: 21.5px; padding-left: 50px;'><input type='text' class='typeahead form-control input-SmallText ' id='byName{rowCount}' style='width: 100%' value='{$T.pl.chkName}' onkeyup=defaultCheckListView('PreOperativeCheckListMasterDetails','search') /></td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "{#if $T.pl.conf == 'Y'}"
		+ "<input type='checkbox' id='chbx{rowCount}' checked = 'checked'>"
		+ "{#else}"
		+ "<input type='checkbox' id='chbx{rowCount}'>"
		+ "{#/if}</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'><input readonly='readonly' class='form-control input-SmallText' type='text' id='time{rowCount}' value='{$T.pl.confTime}'/></td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><textarea rows='1' cols='20' id='rmk{rowCount}' value='{$T.pl.rmk}'>{$T.pl.rmk}</textarea></td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'><input type='checkbox' onClick='removePreOpPrep({$T.pl.idPreOpPre},{rowCount})' id='action{rowCount}' />"
		+ "</td><input type='hidden' value='{$T.pl.idPreOpPre}' id='idPreOpPre{rowCount}'/>"
		+ "</tr>{rowCount++}{#/for}";

var SetPrOpPrepTemp1 = "{#foreach $T.ListPreOpPrep as pl}"
	+ "<tr id='div{rowCount}'>"
	+ "<td class='left' style='width: 2%;'>{rowCount}</td>"
	+ "<td class='col-md-5-1' style='height: 21.5px; padding-left: 50px;'><input type='text' class='typeahead form-control input-SmallText ' id='byName{rowCount}' style='width: 100%' value='{$T.pl.chkName}' readonly='true' /></td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
	+ "{#if $T.pl.conf == 'Y'}"
	+ "<input type='checkbox' id='chbx{rowCount}' checked = 'checked' readonly='true'>"
	+ "{#else}"
	+ "<input type='checkbox' id='chbx{rowCount}' readonly='true'>"
	+ "{#/if}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'><input readonly='readonly' class='form-control input-SmallText' type='text' id='time{rowCount}' value='{$T.pl.confTime}'/></td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'><textarea rows='1' cols='20' id='rmk{rowCount}' value='{$T.pl.rmk}' readonly='true'>{$T.pl.rmk}</textarea></td>"
	+ "</td><input type='hidden' value='{$T.pl.idPreOpPre}' id='idPreOpPre{rowCount}'/>"
	+ "</tr>{rowCount++}{#/for}";

function setidAction(id) {
	$("#idPreOpPre").val(id);
	var byName = $("#byName" + id).val();
	$('#byName').val(byName);
	var chbx = $("#chbx" + id).val();
	$('#chbx').val(chbx);
	var time = $("#time" + id).val();
	$('#time').val(time);
	var rmk = $("#rmk" + id).val();
	$('#rmk').val(rmk);
	var action = $("#action" + id).val();
	$('#action').val(action);
}
function fetchPreOpPre() {
	rowCount = 1;
	var tomId = $("#tomId").val();
	var returnType = $("#pageName").val();
	var inputs = [];
	inputs.push('tomId=' + tomId);
	inputs.push('action=fetchPreOpPre');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/fetchPreOpPre",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			$("#POP").html(JSON.stringify(ajaxResponse));
			var pobj1 = r;//eval('(' + ajaxResponse + ')');
			if(returnType == "OTOperationDetails"){
				$("#PreOpPrepList").setTemplate(SetPrOpPrepTemp1);
				$("#PreOpPrepList").processTemplate(pobj1);
			}else{
				$("#PreOpPrepList").setTemplate(SetPrOpPrepTemp);
				$("#PreOpPrepList").processTemplate(pobj1);	
			}
			
			var rcount = $("#PreOpPrepList tr").length;
			$("#RowCount").val(rcount);
			$("#addRowCount").val(0);
			$("#adRowCount").val(1);
		}
	});
}
function removePreOpPrep(idPreOpPrep, newRow) {
	if (idPreOpPrep != 0) {
		if (idPreOpPrep == "") {
			alert("Please select Record to Delete...");
			return false;
		}
		var inputs = [];
		inputs.push('idPreOpPrep=' + idPreOpPrep);
		inputs.push('action=removePreOpPrep');
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "OperationServlet",
			url : "ehat/otdata/removePreOpPrep",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {

			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				$("#div" + newRow).remove();
				fetchPreOpPre();
			}
		});
	} else {
		var addRowCount = $("#addRowCount").val();
		var adRowCount = $("#adRowCount").val();
		$("#div" + newRow).remove();

		newRow = newRow - 1;
		addRowCount--;
		adRowCount--;
		if (adRowCount == 0) {
			adRowCount = 1;
		}
		$("#RowCount").val(newRow);
		$("#addRowCount").val(addRowCount);
		$("#adRowCount").val(adRowCount);
	}
}
function saveOTDocument() {

	/*var res = uploadOTDoc();
	
	if(res == 1){*/
		
		//var doc = $("#ifile").val();
		var doc = document.getElementById("ifile").files[0].name;
		var note = $("#iNotes").val();
		var tomId = $.trim($('#tomId').val());
		var PatId = $('#pId').val();
		var Tid = $('#tId').val();
		var inputs = [];
		if (doc == "") {
			alert("Please select file first ");
			return false;
		}

		var ifile = getFileValue('ifile');
		
		var form = $('#otDocUploadfrm')[0];
		var data = new FormData(form);
		data.append("filePath", encodeURIComponent(doc));
		data.append("note", note);
		data.append("tomId", tomId);
		data.append("patId", PatId);
		data.append("Tid", Tid);
		jQuery.ajax({
			async : true,
			type : "POST",
			enctype: 'multipart/form-data',
		    processData: false,
		    contentType: false,
		    data : data,
			url : "ehat/otdata/saveOTDocument",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				alert("Uploaded Successfully...");
				$("#ifile").val("");
				$("#iNotes").val("");
				fetchOTDoc();
			}
		});
	// }
}

function fetchOTDoc() {

	var tomId = $('#tomId').val();
	var PatId = $('#pId').val();
	var returnType = $("#pageName").val();
	var inputs = [];
	inputs.push('action=fetchOTDoc');
	inputs.push('tomId=' + tomId);
	inputs.push('patId=' + PatId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/fetchOTDoc",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			if(returnType == "OTOperationDetails"){
				setUploadOTDocList1(r);
			}else{
				setUploadOTDocList(r);	
			}
			
		}
	});
}
function setUploadOTDocList(data) {
	var result = data;//JSON.parse(data);
	var divContent = "";
	if (result.listotdocs.length > 0) {
		for ( var i = 0; i < result.listotdocs.length; i++) {
			divContent = divContent
					+ "<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"
					+ (i + 1)
					+ "</div></td>"
					+ "<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenOTDocid"
					+ (i + 1)
					+ "' value='"
					+ result.listotdocs[i].idotdoc
					+ "'>"
					+ result.listotdocs[i].idotdoc
					+ "</td> "
					+ "<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenOTDocName"
					+ (i + 1)
					+ "' value='"
					+ result.listotdocs[i].otdocname
					+ "'>"
					+ result.listotdocs[i].otdocname
					+ "</td> "
					+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenOTDocnote"
					+ (i + 1)
					+ "' value='"
					+ result.listotdocs[i].otnotes
					+ "'>"
					+ result.listotdocs[i].otnotes
					+ "</td> "
					+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenOTDate"
					+ (i + 1)
					+ "' value='"
					+ result.listotdocs[i].date
					+ "'>"
					+ result.listotdocs[i].date
					+ "</td> "
					+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
					+ (i + 1)
					+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='ReadOTDocuments("
					+ (i + 1)
					+ ")'><i class='fa fa-eye View'></i></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
					+ "<button id='hiddenR"
					+ (i + 1)
					+ "' class='btn btn-xs btn-danger' value='"
					+ result.listotdocs[i].idotdoc
					+ "' style='margin-center: 6px;cursor: pointer;' onclick='delOTDocument("
					+ (i + 1)
					+ ")'><i class='fa fa-trash-o'></i>  </button></td></tr>";
		}
	} else {
		divContent = divContent
				+ "<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docOTDispTable").html(divContent);
}
function setUploadOTDocList1(data) {
	var result = data//JSON.parse(data);
	var divContent = "";
	if (result.listotdocs.length > 0) {
		for ( var i = 0; i < result.listotdocs.length; i++) {
			divContent = divContent
					+ "<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont' >"
					+ (i + 1)
					+ "</div></td>"
					+ "<td style='height: 21.5px; padding-left: 50px;' class='col-md-2-1'><input type='hidden' id='hiddenOTDocid"
					+ (i + 1)
					+ "' value='"
					+ result.listotdocs[i].otdocname
					+ "'>"
					+ result.listotdocs[i].otdocname
					+ "</td> "
					+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenOTDocnote"
					+ (i + 1)
					+ "' value='"
					+ result.listotdocs[i].otnotes
					+ "'>"
					+ result.listotdocs[i].otnotes
					+ "</td> "
					+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><input type='hidden' id='hiddenOTDate"
					+ (i + 1)
					+ "' value='"
					+ result.listotdocs[i].date
					+ "'>"
					+ result.listotdocs[i].date
					+ "</td> "
					+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><button id='hiddenRv"
					+ (i + 1)
					+ "' class='btn btn-xs btn-success' style='margin-left: 6px;cursor: pointer;' onclick='ReadOTDocuments("
					+ (i + 1)
					+ ")'><i class='fa fa-eye View'></i></button></td></tr>";
		}
	} else {
		divContent = divContent
				+ "<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#docOTDispTable").html(divContent);
}
function ReadOTDocuments(rowNumber) {
	var doc = $("#hiddenOTDocName" + rowNumber).val();
	var documentId = $("#hiddenOTDocid" + rowNumber).val();
	var note = $("#hiddenOTDocnote" + rowNumber).val();
	$('#viewOTDocModal').modal();
	//$('#ViewOTDocumemnt').attr("src", "ReadDocServlet?fileName=" + doc);
	//$("#ViewOTDocumemnt").attr("src","ehat/documentmaster/readDocPath?docPath="+doc);
	$('#ViewOTDocumemnt').attr("src","ehat/opdDocumentUpload/viewOpdDocuments?documentId="+documentId+"&fileName="+doc);
	$('#viewOTDocModal').modal('show');
	$('#documentOTComment').html(note);
}
function setOTDocPopUp(data) {
	var result = jQuery.parseJSON(data);
	var divContent = "";

	if (!result.length == "") {
		divContent = divContent
				+ "<tr><td style='height: 21.5px;' class='col-md-1-1 center'><div class='TextFont'>"
				+ (i + 1)
				+ "</div></td>"
				+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'><iframe src='ReadDocServlet?fileName="
				+ result[i].document
				+ "' ></iframe></td>"
				+ "<td style='height: 21.5px; padding-left: 0px;' class='col-md-1-1 center'>"
				+ result[i].notes + "</td></tr>";
	} else {
		divContent = divContent
				+ "<tr><td colspan = 5>No Record Found</td></tr>";
	}
	$("#ViewOTDocumemnt").html(divContent);
}
function delOTDocument(rowNumber) {

	var hr = $('#hiddenR' + rowNumber).val();
	var Pid = $('#pId').val();
	var tId = $('#tId').val();
	var tomId = $('#tomId').val();
	var doc = $('#hiddenOTDocid' + rowNumber).val();
	var date = $('#hiddenOTDate' + rowNumber).val();

	var inputs = [];
	var r = confirm("Are you sure to delete " + doc + " ?");
	if (r == false) {
		return false;
	}
	inputs.push('hr=' + hr);
	inputs.push('Pid=' + Pid);
	inputs.push('tId=' + tId);
	inputs.push('tomId=' + tomId);
	inputs.push('date=' + date);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "DelOTDocServlet",
		url : "ehat/otdata/delOTDocument",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			alert("Deleted Successfully...");
			fetchOTDoc();
		}
	});
}

function saveOTDescription() {
	var callFrom = "update";
	var saveID = $("#isaveID").val();
	if (saveID == 0 || saveID == undefined) {
		callFrom = "insert";
	}
	var tomId = $("#tomId").val();
	var descr = $("#iDescription").val();
	var inputs = [];
	inputs.push('tomId=' + tomId);
	inputs.push('descr=' + descr);
	inputs.push('saveID=' + saveID);
	inputs.push('callFrom=' + callFrom);
	inputs.push('action=saveOTDescription');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/saveOTDescription",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
		}
	});
}

function fetchOTDescription() {

	var tomId = $("#tomId").val();
	var inputs = [];
	inputs.push('tomId=' + tomId);
	inputs.push('action=fetchOTDescription');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/fetchOTDescription",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			var pobj1 = r;//eval('(' + ajaxResponse + ')');
			if (pobj1.OTDescList.length == 0) {
				$("#iDescription").val("");
				$("#isaveID").val(0);
			} else {
				$("#iDescription").val(pobj1.OTDescList[0].OTDesc);
				$("#isaveID").val(pobj1.OTDescList[0].idOTDesc);
			}

		}
	});
}

function saveOTNotesData() {

	var idSelOperationData = $("#idSelOperationData").val();
	if(idSelOperationData == 0){
		alert("Please select operation.");
		return false;
	}
	
	var templateData = "";
	var callFrom = "update";
	var idOTNote = $("#idOTNote").val();
	if (idOTNote == 0) {
		callFrom = "insert";
	}
	var tomId = $("#tomId").val();
	var EBLoss = $("#iEBLoss").val();
	var ABLoss = $("#iABLoss").val();
	var ICount = $("#iICount").val();
	var RecBy = $("#iRecBy").val();
	var MOPCount = $("#iMOPCount").val();
	var OTNotesComment = $("#iOTNotesComment").val();
	var iOTImplantDetails = $('#iOTImplantDetails').val();
	var selCustomizeTemp = $('#selCustomizeTemp').val();
	templateData = CKEDITOR.instances['editor1'].getData();
	
	/*for multiple OT Notes Save Code*/
	var previousTempId = 0;
	var previousSelCustomizeTemp = $('#previousOtNotes').html();
	var $previousSelCustomizeTemp = $(previousSelCustomizeTemp);
	if (previousSelCustomizeTemp.trim() != "")
	{
	var hiddenFieldsCount = $previousSelCustomizeTemp.length;
	 var previousTempIdsArray = [];
	 var selCustomizeTempFound = false;
	for (var k = 0; k < hiddenFieldsCount; k++) {
        var tempId = $("#previousOtNotesID" + k).val();
        if (tempId == selCustomizeTemp) {
            selCustomizeTempFound = true;
            break;
        }
        previousTempIdsArray.push(tempId);
    }

    if (!selCustomizeTempFound) {
        idOTNote = 0;
        callFrom = "insert";
    }
	}
	

	var reg = /^[0-9]+$/;
	if (EBLoss != "" && !reg.test(EBLoss)) {
		alert("Estimated Blood Loss should be in number!");
		$('#iEBLoss').val("");
		return false;
	}
	if (EBLoss == "" || EBLoss == undefined) {
		EBLoss = "0";
	}
	if (ICount != "" && !reg.test(ICount)) {
		alert("Instrumental Count should be in number!");
		$('#iICount').val("");
		return false;
	}
	if (ICount == "" || ICount == undefined) {
		ICount = "0";
	}
	if (RecBy == "" || RecBy == undefined) {
		RecBy = "-";
	}
	if (MOPCount == "" || MOPCount == undefined) {
		MOPCount = "-";
	}
	if (OTNotesComment == "" || OTNotesComment == undefined) {
		OTNotesComment = "-";
	}
	if (iOTImplantDetails == "" || iOTImplantDetails == undefined) {
		iOTImplantDetails = "-";
	}

	var inputs = [];
	inputs.push('idOTNote=' + idOTNote);
	inputs.push('tomId=' + tomId);
	inputs.push('EBLoss=' + EBLoss);
	inputs.push('ABLoss=' + ABLoss);
	inputs.push('ICount=' + ICount);
	inputs.push('RecBy=' + RecBy);
	inputs.push('MOPCount=' + MOPCount);
	inputs.push('OTNotesComment=' + OTNotesComment);
	inputs.push('implantDetails=' + iOTImplantDetails);
	inputs.push('selCustomizeTemp=' + selCustomizeTemp);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('callFrom=' + callFrom);
	inputs.push('action=saveOTNotesData');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/saveOTNotesData",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			location.reload(this);

		}
	});
}

function fetchOTNotesData(callFrom) {

	if(callFrom == "autoDischarge"){
	//	var tomId = $("#idSelOperationData").val();
		var tomId = $("#tomId").val();
		$("#tomId").val(tomId);
	}else{
		var tomId = $("#tomId").val();
	}
	

	if(tomId == 0 || tomId == null){
		return false;
	}
		
	var inputs = [];
	inputs.push('tomId=' + tomId);
	inputs.push('action=fetchOTNotesData');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "ehat/otdata/fetchOTNotesData",		
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			var pobj1 = r;//eval('(' + ajaxResponse + ')');
			var iterateLetest= pobj1.length - 1;
			if (pobj1.length == 0) {
				$("#idOTNote").val(0);

			} else {

				$("#idOTNote").val(pobj1[iterateLetest].idEhatOTOperationNotes);
				$("#iEBLoss").val(pobj1[iterateLetest].estimatedBLoodLoss);
				$("#iABLoss").val(pobj1[iterateLetest].actualBloodLoss);
				$("#iICount").val(pobj1[iterateLetest].instrumentCount);
				$("#iRecBy").val(pobj1[iterateLetest].recordedBy);
				$("#iMOPCount").val(pobj1[iterateLetest].mopCountRecordedBy);
				$("#iOTNotesComment").val(pobj1[iterateLetest].comment);
				$('#iOTImplantDetails').val(pobj1[iterateLetest].implantDetails);
				$("#selCustomizeTemp").val(pobj1[iterateLetest].templateID);
				$("#editor1").val(pobj1[iterateLetest].chkEditerdata);
				CKEDITOR.instances['editor1'].setData(pobj1[iterateLetest].chkEditerdata);
				
				
				var htm = "";
				var htm1 = "";
				var iterate = 0;
				htm=htm + '<option  value="0">Select</option>';
				
				for(var i=1 ; i<=pobj1.length ; i++)
				{
					htm = htm+'<option value="'+pobj1[iterate].idEhatOTOperationNotes+'">'+pobj1[iterate].updatedTime+'</option>';
					htm1 = htm1+'<input type="hidden" id="previousOtNotesID' + (iterate) + '" value="' + pobj1[iterate].templateID+'" />'
					iterate++;
				}
				$("#selOtTempRecord").html(htm);
				$("#previousOtNotes").html(htm1);
			}
			
		}
	});
}
function setUserName(inputID) {
	
	var type = 'onchange';
	$("#userDocId").val("0");
	var auto = "fetchUserList";
	var findingName = $("#" + inputID).val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AutoSuggetionServlet",
		url : "ehat/otdata/fetchUserList",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
		},
		success : function(r) {
			//ajaxResponse = r;
			var availableTags = [];
			availableTags = r;//ajaxResponse.split("\n");
			var template = "";
			var resultData = [];
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

			$("#div" + inputID + " .typeahead").html(template);

			if (type != "onload") {
				$("#div" + inputID + " .typeahead").show();
			}
			setTimeout(function() {
				$("#" + inputID).typeahead({
					source : resultData,
					displayField : 'Name',
					valueField : 'ID',
					onSelect : displayResult,
					scrollBar : true
				});
				$("#" + inputID).data('typeahead').source = resultData;
			}, 200);
		}
	});
	function displayResult(item) {
		$("#" + inputID).val((item.text).trim());
		$("#userDocId").val(item.value);
	}
}

$(document).on('click', '.mainTab li', function() {
	$(".mainTab li a").css("background-color", "");
	$(this).children('a').css("background-color", "#ced9ae");
});

$(document).on('click', '.colorChanges li', function() {
	$(".colorChanges li a").css("background-color", "");
	$(this).children('a').css("background-color", "#f8c471");
});

function openDashboard() {
	$("#idSaveButtonDiv").hide();
	$("#idSaveAnaesthesiaApproval").hide();
	$("#ConductOfAnaesthia").hide();
	$("#idConductOfAnaesthiaTab").hide();
	$("#idSaveVitalsOfConductAnaesthesiaBTN").hide();
	$("#idSaveConductAnaesthesiaBTN").hide();
	$("#idPrintConductAnaesthesiaBTN").hide();
	$("#idSaveVitalsForPreAnaesthiaBTN").hide();
	$("#ipdConsentFormJSPHeadDiv").hide();
	$("#idSaveOTConsentForm").hide();
	checkingApprovalStatusForConductAnaesthiaTab();
}

function openOTNotes() {
	$("#idSaveButtonDiv").hide();
	$("#idSaveAnaesthesiaApproval").hide();
	$("#ConductOfAnaesthia").hide();
	$("#idConductOfAnaesthiaTab").hide();
	$("#idSaveVitalsOfConductAnaesthesiaBTN").hide();
	$("#idSaveConductAnaesthesiaBTN").hide();
	$("#idPrintConductAnaesthesiaBTN").hide();
	$("#idSaveVitalsForPreAnaesthiaBTN").hide();
	$("#ipdConsentFormJSPHeadDiv").hide();
	$("#idSaveOTConsentForm").hide();
	checkingApprovalStatusForConductAnaesthiaTab();
}
function openAnaesthesiaNotes() {
	$("#idSaveButtonDiv").hide();
	$("#idSaveAnaesthesiaApproval").hide();
	$("#ConductOfAnaesthia").hide();
	$("#idConductOfAnaesthiaTab").hide();
	$("#idSaveVitalsOfConductAnaesthesiaBTN").hide();
	$("#idSaveConductAnaesthesiaBTN").hide();
	$("#idPrintConductAnaesthesiaBTN").hide();
	$("#idSaveVitalsForPreAnaesthiaBTN").hide();
	$("#ipdConsentFormJSPHeadDiv").hide();
	$("#idSaveOTConsentForm").hide();
	checkingApprovalStatusForConductAnaesthiaTab();
}

function openPreAnaesthaticAssessment() {
	$("#idSaveButtonDiv").show();
	$("#idSaveVitalsForPreAnaesthiaBTN").show();
	$("#idSaveAnaesthesiaApproval").hide();
	$("#ConductOfAnaesthia").hide();
	$("#idConductOfAnaesthiaTab").hide();
	$("#idSaveVitalsOfConductAnaesthesiaBTN").hide();
	$("#idSaveConductAnaesthesiaBTN").hide();
	$("#idPrintConductAnaesthesiaBTN").hide();
	$("#ipdConsentFormJSPHeadDiv").hide();
	$("#idSaveOTConsentForm").hide();
	checkingApprovalStatusForConductAnaesthiaTab();
}

function openAnaesthesiaApproval() {
	$("#idSaveButtonDiv").hide();
	$("#idSaveAnaesthesiaApproval").show();
	$("#AnaesthesiaApproval").show();
	$("#ConductOfAnaesthia").hide();
	$("#idConductOfAnaesthiaTab").hide();
	$("#idSaveVitalsOfConductAnaesthesiaBTN").hide();
	$("#idSaveConductAnaesthesiaBTN").hide();
	$("#idPrintConductAnaesthesiaBTN").hide();
	$("#idSaveVitalsForPreAnaesthiaBTN").hide();
	$("#ipdConsentFormJSPHeadDiv").hide();
	$("#idSaveOTConsentForm").hide();
	checkingApprovalStatusForConductAnaesthiaTab();
}
function openConductOfAnaesthia() {
	$("#idSaveButtonDiv").hide();
	$("#idSaveAnaesthesiaApproval").show();
	$("#AnaesthesiaApproval").hide();
	$("#idSaveAnaesthesiaApproval").hide();
	$("#ConductOfAnaesthia").show();
	$("#idSaveVitalsOfConductAnaesthesiaBTN").show();
	$("#idSaveConductAnaesthesiaBTN").show();
	$("#idPrintConductAnaesthesiaBTN").show();
	$("#idSaveVitalsForPreAnaesthiaBTN").hide();
	$("#idSaveOTConsentForm").hide();
	$("#ipdConsentFormJSPHeadDiv").hide();
	checkingApprovalStatusForConductAnaesthiaTab();
}
function openOTConsetntForm() {
	$("#idSaveButtonDiv").hide();
	$("#idSaveAnaesthesiaApproval").hide();
	//$("#idSaveOTConsentForm").show();
	$("#ipdConsentFormJSPHeadDiv").show();
	$("#ConductOfAnaesthia").hide();
	$("#idConductOfAnaesthiaTab").hide();
	$("#idSaveVitalsOfConductAnaesthesiaBTN").hide();
	$("#idSaveConductAnaesthesiaBTN").hide();
	$("#idPrintConductAnaesthesiaBTN").hide();
	$("#idSaveVitalsForPreAnaesthiaBTN").hide();
	$("#AnaesthesiaApproval").hide();
	checkingApprovalStatusForConductAnaesthiaTab();
}
function saveAnaesthesiaApprovalDetails() {
	var preOfNotes = $("#preOfNotes").val();
	var pid = $("#pid").val();
	var approvalRemark = $("#approvalRemark").val();
	var checkedApprovalFlag = $('input:radio[name=approval]:checked').val();
	var tretID = $("#tretID").html();
	var tomId = $("#tomId").val();
	var inputs = [];
	inputs.push('action=saveAnaesthesiaApprovalDetails');
	inputs.push('preOfNotes=' + preOfNotes);
	inputs.push('pid=' + pid);
	inputs.push('approvalRemark=' + approvalRemark);
	inputs.push('checkedApprovalFlag=' + checkedApprovalFlag);
	inputs.push('tretID=' + tretID);
	inputs.push('tomId=' + tomId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			if (checkedApprovalFlag == "approval") {
				$("#idConductOfAnaesthiaTab").show();
				$("#AnaesthesiaApproval").show();
				$("#idSaveAnaesthesiaApproval").show();
				$("#approvalStatus").val('approval');
			} else {
				$("#idConductOfAnaesthiaTab").hide();
				$("#approvalStatus").val('disApproval');
			}
		}
	});
}

function createDivForCoughHistory(type) {
	if (type == "COUGH") {
		$("#coughPresent").show();
	} else if (type == "DYSPNOEA") {
		$("#DYSPNOEAPresent").show();
	} else if (type == "GIDDINESS") {
		$("#GiddnessPresent").show();
	} else if (type == "chestPain") {
		$("#chestPainPresent").show();
	}
}

$(document).on('change', '.defaultSlider', function() {
	var id = $(this).attr('id');
	$('.' + id).val(this.value);
});

function hideDivDateAndTime(type) {
	if (type == "COUGH") {
		$("#qtyForCough").val("");
		$("#selectCoughTime").val(0);
		$("#coughPresent").hide();
	} else if (type == "DYSPNOEA") {
		$("#qtyForDyspnoea").val("");
		$("#selectDyspnoeaTime").val(0);
		$("#DYSPNOEAPresent").hide();
	} else if (type == "GIDDINESS") {
		$("#qtyForGiddiness").val("");
		$("#selectGiddinessTime").val(0);
		$("#GiddnessPresent").hide();
	} else if (type == "chestPain") {
		$("#qtyForchainPain").val("");
		$("#selectChestPainTime").val(0);
		$("#chestPainPresent").hide();
	}
}

function checkingApprovalStatusForConductAnaesthiaTab() {
	var checkStatus = $("#approvalStatus").val();
	if (checkStatus == "approval") {
		$("#idConductOfAnaesthiaTab").show();
	} else if (checkStatus == "disApproval" || checkStatus == "default") {
		$("#idConductOfAnaesthiaTab").hide();
	}
}

/*******************************************************************************
 * @author : Kavita Bhangle
 * @date : 3-Jan-2017
 * @reason : set user type for autosuggesion plugin in ot
 ******************************************************************************/

function setUsetType() {
	docType = $("#doctype").val();
	if (docType == "surgeon" || docType == "surgeon1" || docType == "surgeon2"
			|| docType == "surgeon3" || docType == "asssurgeon"
			|| docType == "assSurgeon1" || docType == "assSurgeon2"
			|| docType == "assSurgeon3") {
		$("#type").val("doctor");
	} else if (docType == "scrubNurse1" || docType == "scrubNurse2"
			|| docType == "scrubNurse3" || docType == "circulatingNurse1"
			|| docType == "circulatingNurse2" || docType == "circulatingNurse3") {
		$("#type").val("nurse");
	} else if (docType == "anesthetist"
			|| docType == "anaesthesiologist1"
			|| docType == "anaesthesiologist2"
			|| docType == "anaesthesiologist3"
			|| docType == "assAnaesthesiologist1"
			|| docType == "assAnaesthesiologist2"
			|| docType == "assAnaesthesiologist3") {
		$("#type").val("anesthetist");
	} else {
		$("#type").val("General");
	}
}

/*******************************************************************************
 * @author : Amrut Patil
 * @date : 30-Jan-2017
 * @reason : OT Vitals
 ******************************************************************************/

// viewEdit = VIEW(todayDate View)
// viewEdit = EDIT(todayDate Edit)
// viewEdit = VIEWALLDATE(View all vitals irrespective of date)
function vitalsUIOTModule(viewEditType) {
	var OTVitalsType = "";
	var viewEdit = viewEditType.split("_")[0];
	if (viewEdit == "OTVitals") {
		OTVitalsType = viewEditType.split("_")[1];
		$("#OTVitalsType").val(OTVitalsType);
	}
	var cType = "3"; // vitals
	var tomId = $("#tomId").val();
	var todaysDefaultDate = $("#todaysDefaultDate").val();
	var inputs = [];
	if (viewEdit === "VIEWALLDATE") {
		todaysDefaultDate = "VIEWALLDATE";
		inputs.push('tid=' + ($('#patId').html()));
	} else if (viewEdit === "VIEWALLDATEForOT") {
		var pid = $("#pid").val();
		inputs.push('tid=' + pid);
		viewEdit = "VIEWALLDATE";
	} else {
		inputs.push('tid=' + ($("#treatmentId").text()));
	}
	inputs.push('cType=' + cType);
	inputs.push('tomId=' + tomId);
	inputs.push('date=' + todaysDefaultDate);
	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
			//	url : "OperationServlet",
				url :"ehat/otdata/defaultOTVitalsView",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {

				},
				success : function(r) {
					var ajaxResponse = r;
					$("#vitalsOTDiv").html(ajaxResponse);
					//var pobj1 = ajaxResponse;
					var pobj1 = eval('(' + ajaxResponse + ')');

					var opdDD2HtmlVitalsTemplate = "";
					var otHtmlVitalsTemplate = "";
					var dateInterval = "";
					var description = "";


					for ( var int = 0; int < (pobj1.OtSlvLst.length); int++) {
						dateInterval = todaysDefaultDate;
						description = "";

						otHtmlVitalsTemplate = otHtmlVitalsTemplate
								+ "<tr class='TextFont'><td class='col-md-1-1'>"
								+ (int + 1)
								+ "</td><td class='col-md-7-1'>"
								+ (pobj1.OtSlvLst[int].status)
								+ "</td>"
								+ "<td class='col-md-1-1 date_"
								+ pobj1.OtSlvLst[int].toId
								+ "'>"
								+ "<td class='col-md-2-1'><div class='pull-right '>"
								+ pobj1.OtSlvLst[int].toId
								+ "</div></td></tr>";

					}
					
				//	$("#vitalsBodyList").html(otHtmlVitalsTemplate);
					$("#otHtmlVitals").html(otHtmlVitalsTemplate);


					if (viewEdit === "OTVitals") {
						// <td>Dashboard</td><td>Pre-Anaesthesia</td><td>Conduct-Anaesthesia</td>
						// <td colspan='3' class='center'></td>

						dateInterval = todaysDefaultDate;
						var otHtmlVitalsTemplate = "";
						for ( var int = 0; int < (pobj1.OtSlvLst.length); int++) {

							otHtmlVitalsTemplate = otHtmlVitalsTemplate
									+ "<tr><td>"
									+ (int + 1)
									+ "</td><td>"
									+ (pobj1.OtSlvLst[int].status)
									+ "</td>"
									+ "<td><input class='vitalValue_"
									+ pobj1.OtSlvLst[int].toId
									+ "' name='vitalsOTSaveInput' onkeyup='return validateNumberWithSlashByRegEx(this.id)' type='text' id='vitals-8am_"
									+ (pobj1.OtSlvLst[int].toId)
									+ "' /></td></tr>";
						}
						otHtmlVitalsTemplate = otHtmlVitalsTemplate
								+ "<td colspan='3' class='center'>"
								+ "<input onclick='saveOTVitals()' id='vitalNewclose' class='btn btn-xs btn-primary editUserAccess' type='button' value='Save' disabled='disabled'/></td>";

						$("#otHtmlVitalsTemplate").html(otHtmlVitalsTemplate);

						var heading = "<tr class='vitalsDate'><td></td><td>Date</td></tr>"
								+ "<tr class='vitalsType'><td></td><td>Save From</td></tr>"
								+ "<tr class='vitalsTime'><td></td><td>Time</td></tr>";

						var dateArr = [];
						var timeArr = [];
						var typeArr = [];
						var dateArray = [];
						var dateColspan = [];
						var index = 0;
						for ( var i = 0; i < pobj1.listChartSlv.length; i++) {
							var found = $.inArray(pobj1.listChartSlv[i].Date,
									dateArr);
							if (found == -1) {
								dateArr.push(pobj1.listChartSlv[i].Date);
							}

							var found2 = $.inArray(
									pobj1.listChartSlv[i].commentType + "_"
											+ pobj1.listChartSlv[i].Date,
									typeArr);
							if (found2 == -1) {
								typeArr.push(pobj1.listChartSlv[i].commentType
										+ "_" + pobj1.listChartSlv[i].Date);
							}

							var found1 = $.inArray(
									pobj1.listChartSlv[i].commentType + "_"
											+ pobj1.listChartSlv[i].Date + "_"
											+ pobj1.listChartSlv[i].Time,
									timeArr);
							if (found1 == -1) {
								timeArr.push(pobj1.listChartSlv[i].commentType
										+ "_" + pobj1.listChartSlv[i].Date
										+ "_" + pobj1.listChartSlv[i].Time);
							}

						}
						$("#vitalNewDiaTableUI").html(heading);

						/*
						 * for(var i=0;i<typeArr.length;i++) {
						 * $('.vitalsType').append("<td class='center' colspan='"+typeColspan[i]+"'>"+typeArr[i]+"</td>"); }
						 */

						for ( var i = 0; i < timeArr.length; i++) {
							$('.vitalsType')
									.append(
											"<td>" + timeArr[i].split("_")[0]
													+ "</td>");
							$('.vitalsTime')
									.append(
											"<td>" + timeArr[i].split("_")[2]
													+ "</td>");
							dateArray.push(timeArr[i].split("_")[1]);
						}
						dateArray.sort();
						var current = null;
						var cnt = 0;
						for ( var i = 0; i < dateArray.length; i++) {
							if (dateArray[i] != current) {
								if (cnt > 0) {
									dateColspan.push(cnt);
								}
								current = dateArray[i];
								cnt = 1;
							} else {
								cnt++;
							}
						}
						if (cnt > 0) {
							dateColspan.push(cnt);
						}
						for ( var i = 0; i < dateArr.length; i++) {
							$('.vitalsDate').append(
									"<td class='center' colspan='"
											+ dateColspan[i] + "'>"
											+ dateArr[i] + "</td>");
						}

						for ( var int = 0; int < (pobj1.OtSlvLst.length); int++) {
							dateInterval = todaysDefaultDate;
							opdDD2HtmlVitalsTemplate = opdDD2HtmlVitalsTemplate
									+ "<tr class='TextFont'><td class='col-md-1-1'>"
									+ (int + 1)
									+ "</td><td class='col-md-7-1' id='chartSlave_"
									+ pobj1.OtSlvLst[int].toId + "'>"
									+ (pobj1.OtSlvLst[int].status) + "</td>";

							for ( var i = 0; i < timeArr.length; i++) {
								var str = pobj1.OtSlvLst[int].toId + "_"
										+ timeArr[i];
								var str1 = str.replace(/\//g, "-");
								var id = str1.replace(/:/g, "-");
								opdDD2HtmlVitalsTemplate = opdDD2HtmlVitalsTemplate
										+ "<td id='" + id + "'></td>";
							}
							opdDD2HtmlVitalsTemplate = opdDD2HtmlVitalsTemplate
									+ "</tr>";
						}
						$("#vitalNewDiaTableUI").append(
								opdDD2HtmlVitalsTemplate);
						//$("#vitalNewDiaTableUI").show();

						for ( var int = 0; int < (pobj1.listChartSlv.length); int++) {
							var str = pobj1.listChartSlv[int].loginUserId + "_"
									+ pobj1.listChartSlv[int].commentType + "_"
									+ pobj1.listChartSlv[int].Date + "_"
									+ pobj1.listChartSlv[int].Time;
							var str1 = str.replace(/\//g, "-");
							var id = str1.replace(/:/g, "-");
							$("#" + id).html(pobj1.listChartSlv[int].Status);
						}
					}

//					for ( var int = 0; int < (pobj1.listChartSlv.length); int++) {
//						$('.date_' + pobj1.listChartSlv[int].loginUserId).html(
//								pobj1.listChartSlv[int].Date);
//						$('.vitalValue_' + pobj1.listChartSlv[int].loginUserId)
//								.html(pobj1.listChartSlv[int].Status);
//						$('.vitalValue_' + pobj1.listChartSlv[int].loginUserId)
//								.val(pobj1.listChartSlv[int].Status);
//					}

					setTimeout(function() {
						userAccess();
					}, 100);
				} // end:success
			});
}

function saveOTVitals() {
	
	var OTVitalsType = $("#OTVitalsType").val();
	var vitalsID = "";
	var value = "";
	var userId="";
	var tomId = $("#tomId").val();
	var tid = $("#treatmentId").text();
	var todaysDefaultDate = $("#todaysDefaultDate").val();

	var ajaxResponse = $("#vitalsOTDiv").html();
	var pobj1 = eval('(' + ajaxResponse + ')');

	var i = 0;
	$("input[name='vitalsOTSaveInput']").each(function() {

		vitalsID = ($(this).prop('id')).trim();
		var cnameID = [];
		cnameID = vitalsID.split("_");
		value = $("#" + vitalsID).val();

		if (value == "") {
			value = "0";
		}
		pobj1.OtSlvLst[i].toId = cnameID[1];
		pobj1.OtSlvLst[i].status = value;
		i++;
	});
	var ajaxRes = JSON.stringify(pobj1);
	var inputs = [];
	inputs.push('ajaxRes=' + encodeURIComponent(ajaxRes));
	inputs.push('userId=' + 1);
	inputs.push('tid=' + tid);
	inputs.push('type=' + OTVitalsType);
	inputs.push('tomId=' + tomId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/otdata/saveOTVitals",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			vitalsUIOTModule('OTVitals_dashboard');
		}
	});
}

// End OF OT vitals....Amrut Patil

// @Code By : Kavita Bhangale @Date : 27 Jan 2017 @Code For : Fetch data for
// patient name to be select from OT schedule
function setPatientNameForOTScheduler(inputId) {

	var resultData = [];
	var auto = "patientNameForOperation";
	var type = $("input[name='radios1']:checked").val();
	var findingName = $("#" + inputId).val();
	var inputs = [];
	inputs.push('action=patientNameForOperation');
	inputs.push('auto=' + auto);
	inputs.push('type=' + type);
	inputs.push('findingName=' + findingName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {

		},
		success : function(r) {
			autoCompTableForOTScheduler(r, inputId);
		}
	});
}

// @Code By : Kavita Bhangale @Date : 27 Jan 2017 @Code For : Set patient name
// to Aoto Suggetion list from name to be select from OT schedule
function autoCompTableForOTScheduler(response, id) {
	var qty = id.slice(0, -1); // for dyamic col getting id
	var myArray = $.parseJSON(response);// parsing response in JSON format
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
					name : 'Patient Name',
					width : '250px',
					valueField : 'fn'
				} ],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					var mrNo = (ui.item.mrNo = "" ? '-' : ui.item.mrNo);
					if (ui.item.fn != 'No Record Found') {
						$('#results').text(
								ui.item.fn ? 'Selected: ' + ui.item.fn
										: 'Nothing selected, input was '
												+ this.value);
						$('#mrnNo').val(ui.item.pi);
						$('#' + id).val(ui.item.fn);
						
					}

					return false;
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					var result;
					if (!data || data.length === 0 || !data.pl
							|| data.pl.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							'fn' : ' No Record Found'
						} ];
					} else {
						result = data.pl;// Response List for All Services
					}
					response(result);
				}
			});
}

function sendEmailToReference(){
	var email_address = $("#emailOfReference").val();
	var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i

	if(!pattern.test(email_address))
	{
	  alert('Not a valid e-mail address');
	  $("#emailOfReference").focus();
	  $("#emailOfReference").css('border-color', 'red');
	  
	}else{
		var mailtourl = "mailto:"+email_address;
		location.href = mailtourl;
	}
}

//Author @Tushar : @Code For:OT Operation Details Previous
function viewOperationDetails(pId, tId, Id, tomId) {
	window.location.href = "OTOperationDetails.jsp?" + "pId="
			+ encodeURIComponent(pId) + "&tId=" + encodeURIComponent(tId)
			+ "&Id=" + encodeURIComponent(Id) + "&tomId="
			+ encodeURIComponent(tomId);
}

/************
* @author    : paras suryawanshi
* @date      : 17-June-2017
* @codeFor   : getpatient
 ************/

function getIPDPatientDetails(inputId, callfrom) {
    var usertype = "";
    var letter="";
    if (callfrom =="search") {
        letter=$("#txtPName").val();
    }else if(callfrom =="Emg"){
    	  letter=$("#byName1").val();
    	
    	
    }
     var findingName = $("#" + inputId).val();
        var inputs = [];
        inputs.push('findingName=' + findingName);
        inputs.push('usertype=' + usertype);
        inputs.push('letter=' + letter);
        var str = inputs.join('&');
        jQuery.ajax({
            async    : false,
            type     : "POST",
            data     : str + "&reqType=AJAX",
            url     : "ehat/markvisit/getIPDPatientDetails",
            timeout : 1000 * 60 * 15,
            cache     : false,
            success : function(r) {/*
                 console.log(r);
                 //alert(JSON.stringify(r));
                 autoCompTablePrivous(r, inputId);  
              if(callfrom=="search"){
                    autoCompTable(r, inputId);    
               }else{
                    autoCompTable(r, inputId);
                }
                
           */

				i = chk;
				
				if(pobj1.otrepordetails[j].count_ot == pobj1.otrepordetails[i].count_ot){
					while (pobj1.otrepordetails[j].count_ot == pobj1.otrepordetails[i].count_ot){
						totalamnt = totalamnt +pobj1.otrepordetails[i].amount;
						if(first ==0 ){
							htm= htm +"<tr class='center' style='background-color: #f1f1c1' ><th  style='font-size: 16px;border-right: 0px solid;' >" + "Patient Name :" 
                            +"</th>"	
						    + "<th  colspan='3' style='font-size: 16px;border-right: 0px solid;' >" 
							+ pobj1.otrepordetails[i].f_name + "&nbsp;&nbsp;&nbsp;  " + pobj1.otrepordetails[i].m_name + " &nbsp;&nbsp;&nbsp;   " + pobj1.otrepordetails[i].l_name
							+"</th>"
                            +"</tr>"
							+ "<tr class='center' style='background-color: #f1f1c1' ><th class='center' style='font-size: 16px;border-right: 0px solid;' >"  
							+ 	index
								+"</th>"	
							    + "<th  class='center' style='font-size: 16px;border-right: 0px solid;' >" 
								+ pobj1.otrepordetails[i].opname.slice(1) 
								+"</th>"
								+"<th  class='center' style='font-size: 16px;border-right: 0px solid;' >" 
								+ pobj1.otrepordetails[i].created_date_time
								+"</th>"
							    +"<th class='center' style='font-size: 16px;border-right: 0px solid;' >" + "- " 
                                +"</th>"	
								+"</tr>";
							first=1;
						}
						htm = htm
						+ "<tr  style='font-size:17px'><td ></td><td >"
					    + pobj1.otrepordetails[i].categoryName
						+"</td>"	
						+"<td style='font-size:17px' class='center'>"
					    + "-"
						+"</td>"				
						+"<td style='font-size:17px' class='center'>"
					    + Number(pobj1.otrepordetails[i].amount).toFixed(2);  
						+"</td>"
						+"</tr>"
						;
						k.push(i);
						if(length == i){
						
							break;
						}
						i++;
					//	alert("index :" + index +"=" + i  + "");
					}
					htm = htm +  "<tr class='center' style='' ><th  style='font-size: 16px;border-right: 0px solid;' >" + "" 
                    +"</th>"	
				    + "<th class='center' colspan='2' style='font-size: 16px;border-right: 0px solid;' >" 
					+ "Surgery Wise Amount :"
					+"</th>"
					+"<th  class='center' style='font-size: 16px;border-right: 0px solid;border-left:0px' >" + totalamnt.toLocaleString()  ; 
                    +"</th>"	
                    +"</tr>"
                    htm = htm    +  "<tr class='center' style='' ><th  style='font-size: 16px;border-right: 0px solid;' >" + "" 
                   +"</th>"	
				    + "<th class='center' colspan='2' style='font-size: 16px;border-right: 0px solid;' >" 
					+ "Pat Wise Amount :"
					+"</th>"
					+"<th  class='center' style='font-size: 16px;border-right: 0px solid;border-left:0px' >" +  Number(totalamnt).toFixed(2); 
                   +"</th>"	
                   +"</tr>" ;
                   grandtotal = grandtotal + totalamnt;
					chk=i;
					index++;
					totalamnt=0.0;
				}else{
					chk=i;
					
				}
            }
        });
    }

        /************
        * @author    : Sagar Kadam
        * @date        : 05-June-2017
        * @codeFor    : Autosuggestion for ot
         ************/
        function autoCompTablePrivous(response, id) {
            var qty = id.slice(0, -1); // for dyamic col getting id

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
                    name : 'First Name',
                    width : '90px',
                    valueField : 'fName'
                },
                 {
                    name : 'Last Name',
                    width : '100px',
                    valueField : 'lName'
                }],
               
                // Event handler for when a list item is selected.
                select : function(event, ui) {
                    console.log(ui);
                   
         /*           var spl = (ui.item.spl = "" ? '' : ui.item.spl);
                    if (ui.item.dn != 'No' && ui.item.spl != 'Record'
                            && ui.item.specialisationName != 'Found'
                            && ui.item.fName != 'Match') {*/
                    if(ui.item.fName != 'No' &&   ui.item.fName != 'Match'){
                    	if(id=="byName1"){
        					$('#' + id).val(ui.item.fName +" " + ui.item.lName );
        					$('#byId1').val(ui.item.ptId);
        					$('#centerPatientId').val(ui.item.centerPatientId);
        				}
                    
                    }
                 //   }
                    /*
                     * This function use for Enter keypress search
                     */
                   
                    	
                    	
        			
                    //$("#mrnNo").val(101);
                    return false;
                },

                // The rest of the options are for configuring the ajax
                // webservice call.
                minLength : 1,
                source : function(request, response) {
                    var data = myArray;
                    console.log(data);
                    console.log(data.lstMarkVisit.length);
                    var result;
                    if (!data || data.lstMarkVisit.length === 0 || !data.lstMarkVisit
                            || data.lstMarkVisit.length === 0) {
                        /*
                         * result = [{ label: 'No match found.' }];
                         */
                        result = [ {
                            /* 'dn' : 'No', */
                            'fName' : 'No',
                             
                        'lName' : 'Match' 
                        } ];
                    } else {
                        result = data.lstMarkVisit;// Response List for All
                        // Services
                    }
                    response(result);
                    $('#ui-id-1').css("z-index", "10000000000");
                }
            });
        }

/************
* @author    : Sagar Kadam
* @date        : 05-June-2017
* @codeFor    : Autosuggestion for ot
 ************/
function autoCompTable(response, id) {
    var qty = id.slice(0, -1); // for dyamic col getting id

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
        }],
          
        // Event handler for when a list item is selected.
        select : function(event, ui) {
            console.log(ui);
            
            var spl = (ui.item.spl = "" ? '' : ui.item.spl);
            if (ui.item.dn != 'No' && ui.item.spl != 'Record'
                    && ui.item.specialisationName != 'Found'
                    && ui.item.patientName != 'Match') {
            if(ui.item.fName != 'No Record'){
            	if(id=="byName1"){
            		
					$('#' + id).val(ui.item.patientName);
					$('#byId').val(ui.item.patientId);
					$('#centerPatientId').val(ui.item.centerPatientId);
				}else{
					 $('#trid').val(ui.item.treatmentId);
		                $('#mrnNo').val(ui.item.patientId);
		                $('#centerPatientId').val(ui.item.centerPatientId);
		                $('#'+id).val(ui.item.patientName );
		                
		                fetchotprocedure("SCHEDULE");	
					
				}
            
            }
            }
            /*
             * This function use for Enter keypress search
             */
            if(id=="byName1"){
            	
            	// getIPDPatientDetails(id, 'Emg');
			}else{
				
				getAllPatientRecordsdoctordesk1(id, 'search');
			}
           
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
                    'patientName' : 'No Record',
                     
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




/************
 *@author	: Kishor Lokhande
 *@date		: 23-May-2017
 *@code		:Disply unit list on login page
 ***********//*

function unitListOnLogin()
{
	
		//var ulogin ="userName";
		var ulogin =$("#userType").val();
		//alert(ulogin);
		jQuery.ajax({
			
			async : false,
			type : "POST",
			url : "ehat/unit/unitMasterListOnLogin",
			data : {
			"ulogin" : ulogin
		},
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
			alert('error');
		},
		
			success : function(r) 
			{
					//refreshUnitMaster();		
				setUnitSelectList(r);	
		}
	});	
		
}*/
var listofunit ="";
/*******************************************************************************
 * @author paras suryawanshi
 * @date 16_May_2017 
 * @Code Fetching data 
 ******************************************************************************/

function getAllUnitOT() {

	jQuery
			.ajax({
				async : true,
				type : "POST",
				url : "ehat/unit/fetchUnitList",

				success : function(r) {
					setUnitSelectList(r);
					
					var unitiddr=$("#unitid").val();
					if( typeof  unitiddr!="undefined" ){
						$("#uId").val(unitiddr);
						$("#uIdOC").val(unitiddr);
						$("#uIdOD").val(unitiddr);
						$("#uIdOinv").val(unitiddr);
						$("#unlId").val(unitiddr);
						
					}
				
				}
			});
}
function setUnitSelectList(r){
	
	var list="<option value='0'>All</option>";
	
	//alert(list);
	for ( var int = 0; int < r.lstUnit.length; int++) {

		//list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		listofunit= listofunit+","+(r.lstUnit[int].unitId);
		//list=list+'<option <input type="hidden" unitId="'+(r.lstUnit[int].unitId)+'" name="uId" value="'+(r.lstUnit[int].unitName)+'"></option>';
		//temp= '<li> '+  ul +' <input type="hidden" id="ul'+uls+'" name="unitList" value="'+uls+'"> </li>';	
	}	
	
	$("#uId").html(list);
	$("#uIdOC").html(list);
	$("#uIdOD").html(list);
	$("#uIdOinv").html(list);
	$("#unlId").html(list);
}
/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion
 ***********/
function setoperationservices(inputID,value) {
	
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());

	var findingName=$("#" + inputID).val();
	var unit =$("#unitid").val() ;
	var unitlist=""; 
	var depdocdeskid = 2;
	if(value=="cpoe"){
		var querytype="all";
	    var serviceid=0; 
	}else{
		var querytype="operation";
	    var serviceid=value; 
	}
	if( value=="cpoe" && chargesSlaveId > 0){
		setallchargesConfigOnBillingOT(inputID,value);
	}else{
		var inputs = [];
		inputs.push('unit=' + unit);
		inputs.push('findingName=' + findingName);
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/autoallservicestest/getallservices",
			success : function(r) {
				/*	        alert(r.lstSubService[0].categoryName);
				*/			
					
							
							
				autoperation(r,inputID,value);
				             
				         
								
						}
					});
	}

	
	
}



/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:autosuggestion services
 ***********/
function autoperation(response,id,value) {
/*	alert("h455");*/
	
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
							$(ul).css("z-index", "10000000000");
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
					name : 'Name',
					width : '150px',
					valueField : 'categoryName'
				},
				/*,{
					name : 'Quantity',
					width : '90px',
					valueField : 'serviceName'
				}, {
					name : 'doctypeId',
				//	width : '90px',
					valueField : 'doctypeId'
				}*/],

				// Event handler for when a list item is selected.
				select : function(event, ui) {
					//alert("Hihihihih");
					console.log(ui);
					// this.value = (ui.item ? ui.item.dn : '');
					// this.value = (ui.item.spl = 'undefined' ? '' :
					// ui.item.dn);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
				//	if (ui.item.dn != 'No' && ui.item.spl != 'Record'
				//			&& ui.item.specialisationName != 'Found'
				//			&& ui.item.depNm != 'Match') {
					//	$('#results').text(ui.item ? 'Selected: ' + ui.item.dn + ', '+ spl + ', '+ ui.item.specialisationName + ', ' + ui.item.depNm: 'Nothing selected, input was ' + this.value);
						//$('#' + id).val(ui.item.dn);
						//$('#userDocId').val(ui.item.ui);
						//$('#selectedObj').html(JSON.stringify(ui.item));
				
						if(ui.item.categoryName!="NO Match"){
						//	alert(value);
							if(value=='cpoe'){	
								hallid=2;
								$('#txtautoserviceName').val(ui.item.categoryName);
							//	$("#subservicesname").val(ui.item.categoryName);
								$("#subserviceid").val(ui.item.categoryid);
							///	$("#servicename").val(ui.item.serviceName);
								$("#serviceid" ).val(ui.item.serviceid);
								$("#chargesubservice" ).val(ui.item.categorycharges);
								$("#OtRate" ).val(ui.item.categorycharges);
								$("#OtRate2").val(ui.item.categorycharges);
								$("#OtAmt").val(ui.item.categorycharges);
								 
								 var hallsponsercharges=getchargesDROT(hallid);
								 if(hallsponsercharges > 0){
									 $("#OtRate" ).val(hallsponsercharges);//sponser charges
									 $("#OtRate2").val(hallsponsercharges);
									 $("#OtAmt").val(hallsponsercharges);
									 if(ui.item.configcharges > 0){
										 $("#txtnormalcharges").val(ui.item.configcharges); //hallwise charges
									 }else{
										 $("#txtnormalcharges").val(ui.item.categorycharges);//normal charges
									 }		 
								 }else{
									 hallid=0;
									 hallsponsercharges=getchargesDROT(hallid);
                                     if(hallsponsercharges > 0){
                                    	 $("#OtRate" ).val(hallsponsercharges);//sponser charges
                                    	 $("#OtRate2").val(hallsponsercharges);
    									 $("#OtAmt").val(hallsponsercharges);
    									 if(ui.item.configcharges > 0){
    										 $("#txtnormalcharges").val(ui.item.configcharges); //hallwise charges
    									 }else{
    										 $("#txtnormalcharges").val(ui.item.categorycharges);//normal charges
    									 }	
                                     }
										 
								 
								 }
								 calculateEmerChrForOtCpoe();
								if($("#uId").val()==0){
								
									$("#allunitid").val(ui.item.categoryid);
									}
								fetchSuperCat(ui.item.categoryid);
								
								 var isCombServLastId = 0;
									if(ui.item.iscombination=="Y")
										isCombServLastId = categoryid;
									
									getSponsorTestChargesForOT(isCombServLastId,categoryid);
									var sponsorTestCharges = $("#sponsorTestCharges").val();
									var yearWiseSponsorTestCharges = $("#yearWiseSponsorTestCharges").val();
									
								
									
									if(ui.item.iscombination == "Y"){
										
										setPackageBarcodePopup(ui.item.serviceid, ui.item.categoryid);
											if(ui.item.serviceid == 4){
												$("#iscombinationIpd").val("N");
											}else{
												$("#iscombinationIpd").val(ui.item.iscombination);
											}
									}else{
										
										if(ui.item.serviceid == 11){
											
											getPathologyPreDetailsOnOT(ui.item.serviceid,ui.item.categoryid);
										}						
									}
								
								
							}else if(value=='OTDRUG'){
								
								$("#pharmaRate" ).val(ui.item.categorycharges);
								$("#serIDPharma" ).val(ui.item.serviceid);
								$("#pharmaAmt" ).val(ui.item.categorycharges);
								
								
							}else if(value=='OC'){
								var categoryid = ui.item.categoryid;
								$("#subserviceidOS").val(ui.item.categoryid);
								$("#serviceidOS").val(ui.item.serviceid);
							    $("#txtOservamt" ).val(ui.item.categorycharges);
							    $("#txtOservamt2").val(ui.item.categorycharges);
							    $("#templateWiseTestFlag").val(ui.item.templateWise);
							    
							    calculateEmerChrForOtCharges();
							 fetchSuperCatOT(ui.item.categoryid);
							 var isCombServLastId = 0;
								if(ui.item.iscombination=="Y")
									isCombServLastId = categoryid;
								
								getSponsorTestChargesForOT(isCombServLastId,categoryid);
								var sponsorTestCharges = $("#sponsorTestCharges").val();
								var yearWiseSponsorTestCharges = $("#yearWiseSponsorTestCharges").val();
								
								if(ui.item.serviceid == 4)
									{
									var finalresult=0;
									var resultCharg=hallwiseCHARGE("hall");// get the hall wise charges from configuration
									resultCharg=$("#chargesOS").val();
									var percentage=getPercentageDetails(ui.item.categoryid);
									if(parseInt(resultCharg)==0){
										finalresult=fetchSubServiceCharge(ui.item.categoryid);
									}
									else{
										finalresult=resultCharg*(percentage/100);
										finalresult = fetchOperationCount(ui.item.categoryid);
										/*if(opeerationCountPercentage>0){
											finalresult=finalresult*(opeerationCountPercentage/100);
										}*/
									}
									
									//fetch operation count
									
									
									//var finalresult=resultCharg*(percentage/100);
									  $("#txtOservamt" ).val(finalresult);
									    $("#txtOservamt2").val(finalresult);
									}
								
								if(ui.item.iscombination == "Y"){
									
									setPackageBarcodePopup(ui.item.serviceid, ui.item.categoryid);
										if(ui.item.serviceid == 4){
											$("#iscombinationIpd").val("N");
										}else{
											$("#iscombinationIpd").val(ui.item.iscombination);
										}
								}else{
									
									if(ui.item.serviceid == 11){
										
										getPathologyPreDetailsOnOT(ui.item.serviceid,ui.item.categoryid);
									}						
								}
								
							}if(value=='OTINV'){
								
								$("#InvRate" ).val(ui.item.categorycharges);
								$("#serIDinv" ).val(ui.item.serviceid);
								$("#mrnslaveId" ).val(ui.item.batchid);
								$("#InvAQty" ).val(ui.item.stockqty);
								$("#InvAmt" ).val(ui.item.categorycharges);
								getBatchDetailsOnSelect(ui.item.serviceid);
							}
							$("#" + id).val(ui.item.categoryName);
							}
						
						
						//$("#txtseridb1").val(ui.item.categoryid);
						
					//}
				
					return false;
					/*setallservautocomplete(id);
					return false;*/
				},

				// The rest of the options are for configuring the ajax
				// webservice call.
				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						/*
						 * result = [{ label: 'No match found.' }];
						 */
						result = [ {
							/*'dn' : 'No',*/
							'categoryName' : 'NO Match',
					
							/*'depNm' : 'Match'*/
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					//alert(result);
					response(result);
					
					//$('#ui-id-1').css("z-index", "10000000000");
					
			
				}
			});
	
}






/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:save cpoe
 ***********/
function saveOTCpoe(Tab){
	
	//var	patienttId   =  $("#patientId").text();
//	var	patienttId   =  $("#pt_Id").val();
	//var treatmentId  =  $("#tr_Id").val();  
	var patienttId = $('#pt_Id').val();
	var treatmentId = $('#tr_Id').val();
	var	departmentId =  2;
	var billId       =  $("#bill_Id").val();  
	var queryType 	 = "insert";
	var module 	     = "OT";
	var urgentflag   = 'N';
    var ot_flag      = 'Y';
    var drdeskflag   = 'N';
	var	sourceTypeId =  0;
	//var rate         =  $("#chargesubservice").val();
	var rate         = 0.0;
	/*var quantity     =  1;
	var amount       =  rate * 1;  
	*/
	var company_Id    =  $("#chargesSlaveId").val();  
	var quantity      = 0;
	var amount        = 0.0;
	var serviceId     = 0;
	var subServiceId  = 0;
	var otherRate=0;
	var otherAmount=0;
	var billDetailsId     = 0;
    var subservicesname   = "-";
    var servicename       = "-";
    var unitId            = 0;
    var doctorId          = 0;                         
    var clinicalNotes     = "-";
    var instructions      = "-";
    var coPay        = amount;
	var callfromOT  ="hall";
    var callfrom="CPOE";    
	var treatmentoperationid = $("#treatmentoperationid").val();
   
   
    var scheduledProcedure ='';//added by paras
   // var iscombination ="N"; 
    var iscombination = $("#iscombinationIpd").val();
    var sponsorId = parseInt($("#SponsorsourceTypeId").val());
	var chargesSlaveId = parseInt($("#chargesSlaveId").val());
 	var otProcedure = "-";
 	
	var emrPer=$("#emrPer").val();
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	
	/* var y = document.getElementById("scheduledProcedure");
    var count1=y.options.length;
    if(y.options.length==0){
    	alert("Please Select Procedure Name in Operation Details!!");
    	if(Tab=="OC"){
    		$("#otchr").attr('class', '');
    		$("#OTSERV").attr('class', 'tab-pane fade in');
    		$("#otserv").attr('style', '');
    		$("#od").attr('class', 'active');
    		$("#Operation").attr('class', 'tab-pane fade active in');
    		$("#idOperation").attr('style', 'background-color: rgb(206, 217, 174)');
    		$("#Operation").show();
    	
    	}
    	return false;
    }
    for ( var j = 0; j < y.options.length; j++) {
        scheduledProcedure=scheduledProcedure + "," + y.options[j].value  ;
     	}
        otProcedure = scheduledProcedure.slice(1);*/
	
	 if(Tab=="OC"){
			
		 var doctorId = $( "#doctorNameOT option:selected" ).val();
             if(doctorId==0){
 				//alertify.error("Please Seelect Doctor!!");
 				//return false;
             }
		     drdeskflag      = "C";
	         rate            = $("#txtOservamt").val();
		     quantity        = 1;
		     amount          = $("#txtOservamt").val();
		     if( company_Id > 0){
		    	 otherRate   =  amount;
		    	 otherAmount =  amount;
					sourceTypeId=1;
					var callfrom="hall";
					callfromOT ="sponser";
					//hallwiseCHARGE(callfrom);
					//amount=$("#chargesOS").val();
					rate=amount;
				}
		//     amount          = count1 * amount;
		     serviceId       = $("#serviceidOS" ).val();
		     subServiceId    = $("#subserviceidOS").val();// chargesId
             billDetailsId   = $("#billidserviceOS").val();
		     servicename     = $("#txtOserv").val();
		     unitId          = $("#unlId").val();
		     doctorId        = doctorId;                         
	         coPay           = amount;
	         callfrom="OC";
	 			if (servicename == "" ||  servicename ==null) {
				alert("Please enter servicename ");
				return false;
			}
	     
	         if(company_Id==null || company_Id==""){
	        	 company_Id=0;
	          }
	         clinicalNotes   = $("#serviceClinicalNotes").val();
		     instructions    = $("#serviceIns").val();
	      
	  }else {
			if( company_Id > 0){
				sourceTypeId=1;
				
			} 
	      if(company_Id==null || company_Id==""){
	        	 company_Id=0;
	        	 
	         }
	         rate            = $("#OtRate").val();
		     quantity        = $("#OtQty").val();
		     amount          = $("#OtAmt").val();
	      if ( company_Id > 0) {
		 		//FOR SPONSER CHARGSES
	    	   	 otherRate  = rate;
	    	   	 rate       = $("#txtnormalcharges").val();
		 		if(otherRate== 0 || otherRate== 0.0){
		 			otherRate =	$("#OtRate").val();
		 		   }
		 		otherAmount = otherRate * quantity;
		 		amount      = rate * quantity;
		 		
		 	}
             serviceId       = $("#serviceid" ).val();
		     subServiceId    = $("#subserviceid").val();
             billDetailsId   = $("#billidserviceOS").val();
		     subservicesname = $("#txtautoserviceName").val();
		     servicename     = $("#servicename").val();
		     unitId          = $("#uId").val();
		     doctorId        = $("#doctor2").val();                         
		     clinicalNotes   = $("#cpoeClinicalNotes").val();
		     instructions    = $("#cpoeIns").val();
             coPay           = amount;
		     callfrom="OTD";
		
			
           if($("#cpoeUrgent").is(':checked')){
		     urgentflag='Y';
		    	
		    }
		    
			if (subservicesname == "" ||  subservicesname ==null) {
				alert("Please enter servicename ");
				return false;
			}
			if(unitId ==0){
				unitid = $("#allunitid").val();
			}
			var doctorsel = $("#doctor2 :selected").val();
			
			if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
			//	alert("Please Select doctor ");
			//	return false;
				
			}
			if (clinicalNotes == "" ||  clinicalNotes ==null) {
				clinicalNotes="-";
			}
			if (instructions == "" ||  instructions ==null) {
				instructions="-";
			}
			
	  }

	 //added by vishant /
	  var y = document.getElementById("scheduledProcedure");
	    var count1=y.options.length;
	    if(y.options.length==0){
	    	alert("Please Select Procedure Name in Operation Details!!");
	    	if(Tab=="OC"){
	    		$("#otchr").attr('class', '');
	    		$("#OTSERV").attr('class', 'tab-pane fade in');
	    		$("#otserv").attr('style', '');
	    		$("#od").attr('class', 'active');
	    		$("#Operation").attr('class', 'tab-pane fade active in');
	    		$("#idOperation").attr('style', 'background-color: rgb(206, 217, 174)');
	    		$("#Operation").show();
	    	
	    	}
	    	return false;
	    }
	    if(Tab=="OC"){
			if(serviceId == 4){
				
					/*
					 * for ( var j = 0; j < y.options.length; j++) {
					 * scheduledProcedure=scheduledProcedure + "," +
					 * y.options[j].value ; } otProcedure =
					 * scheduledProcedure.slice(1);
					 */
				
				// code add for if manual surgoun charge give form single
				// operation at that time select only that operation not all
				 otProcedure = $('#operationListId').val(); 
			}
	    }
	 /*var operationListId=$("#operationListId").val();
		if(Tab=="OC"){
			if(serviceId == 4){
			  if(operationListId == 0){
					  alert("please Select Operation Name First");
					  return false;
				  }else{
					  otProcedure= operationListId; 
				  }
			}
		}*/
   //added for LIS
	 var barcodeNo=0;
		var templateWiseTestFlag = $("#templateWiseTestFlag").val();
	
		var sampleTypeId  =	$("#sampleType").val();
		//var barCode  =	$('#barCode').val();
		var inOutHouse = 0;
		var histopathLab = "N";
		if(serviceId == 11){
			
			inOutHouse = $('#inOutHouseCount').val();
			histopathLab = $('#histopathLab').val();
		}
		var customerType = 0; //$('#customerType').val();	
		var customerId = 0; //$('#customerId').val();	
		var businessType = 2;//$('#businessType').val();
		var prepaidReceiptId = 0;//$('#prepaidReceiptId').val();
		var collectionDate = $('#collectionDate').val();
		var collectionTime = $('#collectionTime').val();
		var regRefDocId = 0;//$('#refDocId').val();

		// Added for validate
		if(sampleTypeId <= 0 || sampleTypeId == undefined){
			sampleTypeId = 0;
		}
		
		var specialityId = $('#specialityId').val();
		if(specialityId == undefined || specialityId == null){
			
			specialityId = 0;
		}
		
		var hallSlaveId = $("#hallSlaveId").val();
		
		
		if (sponsorId == "" || sponsorId == null || sponsorId == undefined
				|| isNaN(sponsorId)) {
			sponsorId = 0;
		}
		if (chargesSlaveId == "" || chargesSlaveId == null
				|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
			chargesSlaveId = 0;
		}
		var receiptOf = $("#receiptOf").val();
		if(sponsorId > 0){
			receiptOf="IpdSponsor";
			otherAmount=rate;
			var otherRate = rate;
			var otherPay = rate;
		}
		
		var sendToRisIpdBill="N";
		var regRefDocId = 0;
		var hallSlaveId = $("#hallSlaveId").val();
		var hallId = $('#hallId').val();

		if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
			hallId = 0;
		}
		
	/*	var subservicesname = $("#txtOserv").val();
		if (subservicesname == "" || subservicesname == null) {
			alert("Please enter servicename ");
			return false;
		}*/
		var sampleWiseBarcodes = JSON.stringify(readSampleWiseBarcodes());
	 //end
		
	var serviceDetails = {
			listBillDetailsIpd : []
        };
	serviceDetails.listBillDetailsIpd.push({
		billDetailsId:billDetailsId,
		patienttId : patienttId,
        treatmentId : treatmentId,
        departmentId : departmentId,
        billId : billId,
        sourceTypeId : sourceTypeId,
        rate : rate,
        quantity : quantity,
        amount : amount,
        serviceId : serviceId,
        subServiceId : subServiceId,
        doctorId:doctorId,
        urgentFlag:urgentflag,
        clinicalnotes:clinicalNotes,
        instructions:instructions,
        unitId : unitId,
        ot_flag:ot_flag,
        coPay  :coPay,
        drdeskflag:drdeskflag,
        callfrom : callfrom,
        onBedFlag:"N",
        countot  :treatmentoperationid,
        otprocedure:otProcedure,
        otherRate:otherRate,
	    otherAmount :otherAmount,
	    otherPay :otherAmount,
	    chargesSlaveId:company_Id,
	    sourceTypeId:sourceTypeId,
	    emrPer:emrPer,
	   // sponsorId:1
	    subservicesname : subservicesname,
	    perticularSName : subservicesname,
		hallSlaveId : hallSlaveId,
	    sponsorId : sponsorId,
	    hallId : hallId,
		chargesSlaveId : chargesSlaveId,
		iscombination : iscombination,
		receiptOf : receiptOf,
		sendToRisIpdBill : sendToRisIpdBill,
		sndToLabFlag : "N",
		sampleTypeId : sampleTypeId,
		barCode : barcodeNo,
		inOutHouse : inOutHouse,
		histopathLab : histopathLab,
		businessType : businessType,
		customerId : customerId,
		customerType : customerType,
		//invoiceRemainAmount : amount,
		//prepaidReceiptId : prepaidReceiptId,
		collectionDate : collectionDate,
		collectionTime : collectionTime,
		regRefDocId : regRefDocId,
		templateWise : templateWiseTestFlag,
		ivfTreatFlag : "N"
        
    });

    serviceDetails = JSON.stringify(serviceDetails);
	
	var inputs = [];
	inputs.push('module=' + inOutHouse);
//	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('callfrom=' + callfrom);
	inputs.push("sampleWiseBarcodes="+sampleWiseBarcodes);
    var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "ehat/doctordesk/saveCpoe",
		url : "ehat/doctordesk/saveIpd",
	
		success : function(r) {
			
			 
		if(r >0){
	alertify.success("Service assign Sucessfully");
	 if(Tab=="OC"){
		 $("#billidserviceOS").val("0");
		 //window.location.reload(true);
		 //fetchipdbilldetails(Tab);
		 fetchipdbilldetailsOnOT();
		 //hallwiseCHARGE(callfromOT);
		 clearOTCpoeOtServiceDetails();
	 }else{
		 //fetchipdbilldetails(Tab);
		 getSubServiceDetailsOnCPOE();
		 $("#billidserviceOS").val("0");
			 $('#txtautoserviceName').val("");
			 $("#subservicesname").val("");
             $("#servicename").val("");
			 $("#cpoeClinicalNotes").val("");
			 $("#cpoeIns").val("");
             $("#OtRate").val(0);
			 $("#OtQty").val(1);
			 $("#OtAmt").val(0); 
			 window.location.reload(true);
	 }
			
			}
		}	
		
	});
	
}

function clearOTCpoeOtServiceDetails(){
	 $("#billidserviceOS").val("0");
	    $("#txtOserv").val(" ");
	    $("#txtautoserviceName").val(" ");
	    $("#txtOservamt").val(0);
	    $("#dynamicItemos").html(" ");
	    $("#doctorNameOT").select2('val',0);
	    $("#txtOserv").val(" ");
	    $("#serviceClinicalNotes").val(" ");
}

function fetchipdbilldetails(tabname){
	
	$("#callfrom").val("otCharges");
	var tID  = $("#tr_Id").val(); 
	
	var treatmentoperationid= $("#treatmentoperationid").val();
	if(tID==0){
		
	//	return false;
		
	}
	
	
    var callform = tabname;
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchipdbilldetails",
		data	: {
			"tID"        : tID,
			"callform"   :callform,
			"treatmentoperationid":treatmentoperationid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			/*alert(response.cpoeServdetails.length);*/
			 testRowCountcpoeOT = 1;
			 if(callform=="OC"){
				    /*$("#tOTcharge").setTemplate(servicedetailsOTC);
					$("#tOTcharge").processTemplate(response);*/
				 
					$("#txtOserv").val("");
					/*$("#cathQty").val(1);*/
				//	$("#unlId").val(0);
					$("#txtOservamt").val(1);
				  //  var unitId=$("#unitId").val();	
				//	$("#unlId").val(unitId);
							 
				 servicedetailsOTC(response);  
			 }else{
				  $("#tcpoeservices").setTemplate(servicedetailsOT);
					$("#tcpoeservices").processTemplate(response);   
			 }			
		}
		
	});
	
}


var testRowCountcpoeOT = 1;
function servicedetailsOTC(response){
    var htm = "";
	var htm1 = "";
	var index = 1;
    var totalcharg=0.0;
	var company_Id    =  $("#chargesSlaveId").val(); 
	for ( var i = 0; i < response.cpoedetails.length; i++) {
/*		var datetime= new Date(response.listEhatOTBillDetailForIpd[i].createdDate).toLocaleString();*/
		var amount=0.0;
		if(company_Id > 0){
			amount = response.cpoedetails[i].other_amount;
		}else{
			amount = response.cpoedetails[i].amount;
		}
		
		
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+"<input id='chkunserv' type='checkbox' name='drugBillCheckbox' style='margin-top: 2px; margin-left: 20px; cursor: pointer;' value='"+  response.cpoedetails[i].billipd_id +"'/>"
            	+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"
				+ response.cpoedetails[i].categoryName
				+ "<input type='hidden' id='prName"+ index +"' value='"+ response.cpoedetails[i].categoryName  +"' />"
				+ "<input type='hidden' id='childSubServiceId"+ index +"' value='"+ response.cpoedetails[i].categoryid  +"' />"
				+ "<input type='hidden' id='chargph"+ index +"' value='"+ amount  +"' />"
				+ "<input type='hidden' id='rateph"+ index +"' value='"+ response.cpoedetails[i].categorycharges  +"' />"
				+ "<input type='hidden' id='billidph"+ index +"' value='"+ response.cpoedetails[i].billipd_id  +"' />"
				+ "<input type='hidden' id='servidOS"+ index +"' value='"+ response.cpoedetails[i].serviceid  +"' />"
				+ "<input type='hidden' id='drOS"+ index +"' value='"+ response.cpoedetails[i].doctor_id  +"' />"
				+ "<input type='hidden' id='emrPerOtChr"+ index +"' value='"+ response.cpoedetails[i].emrPer  +"' />"
				+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"
				+  new Date(response.cpoedetails[i].created_date_time).toLocaleString()
				+ "</td>"
				+ "<td class='col-sm-1-1 center'><input type='button' id='statusBtn"+ index +"'" 
				+ " style='width:60px; background-color: green;' disabled></input></td>"
				+ "<td class='col-sm-1-1 center'>"
				+ "<button value='EDIT' onclick='editpharmaOT("+index+",\"OC\")' class='btn btn-xs btn-success' >"
				+"<i class='fa fa-edit'></i></button></td>"	
				+"<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChargesMaster' id='otdel' onclick='deleteCpoeServOT("+ response.cpoedetails[i].billipd_id +",\"OC\" )' ><i class='fa fa-trash-o'></i></button></td></tr>";
		index++;

		
	}
				
     $("#tOTcharge").html(htm);
	 $("#tcpoeservicesOD").html(""); 
	 $("#tcpoeservicesOI").html("");
	 $("#tbOTCAH").html(""); 
}
var servicedetailsOT = '{#foreach $T.cpoedetails as cpoeservice}<tr>'
		+ '<td class="col-md-1-1 center">{testRowCountcpoeOT}.</td>'
		+ '<td class="col-md-2-1 center">{$T.cpoeservice.categoryName}</td>'
		+ '<td class="col-md-2-1 center"> {new Date($T.cpoeservice.created_date_time).toLocaleString()}</td>'
		+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
		+ '<td class="col-md-2 center">{$T.cpoeservice.servicename}</td>'
	
		+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: green;" disabled></input></td>'
		+ '<td class="col-md-1-1 center">'
		+ '<input id="chkunserv" type="checkbox" name="drugBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.billipd_id}"/></td>'
		+ '</td>'
		+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button  id="otdel" class="btn btn-xs btn-success deleteservice" onclick=deleteCpoeServOT({$T.cpoeservice.billipd_id},\'OT\') ><i class="fa fa-trash-o"></i></button></td>'
		 + '</tr>{testRowCountcpoeOT++}{#/for}';


var servicedetailsOTcpoe = '{#foreach $T.listEhatOTBillDetailForIpd as cpoeservice}<tr>'
	+ '<td class="col-md-1-1 center">{testRowCountcpoeOT}.</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.categoryName}</td>'
	+ '<td class="col-md-2-1 center"> {new Date($T.cpoeservice.createdDate).toLocaleString()}</td>'
	+ '<td class="col-md-2-1 center">{$T.cpoeservice.docName}</td>'
	+ '<td class="col-md-2 center">{$T.cpoeservice.service_name}</td>'

	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn{testRowCount}" style="width:60px; background-color: green;" disabled></input></td>'
	+ '<td class="col-md-1-1 center">'
	+ '<input id="chkunserv" type="checkbox" name="drugBillCheckbox"style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value="{$T.cpoeservice.otherbildetailidipd}"/></td>'
	+ '</td>'
	+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button  id="otdel" class="btn btn-xs btn-success deleteservice"'
	+'  onclick=" deletepharma( {$T.cpoeservice.otherbildetailidipd },\'CPOE\',{$T.cpoeservice.bill_details_id })"><i class="fa fa-trash-o"></i></button></td>'
	 + '</tr>{testRowCountcpoeOT++}{#/for}';


/**
 * @author : Bilal
 * @date   : 31-july-2017
 * @code   : for multi select of combination of services***/

function multiSelectcomot(response , callform , setDiv) {

	var list = "<option></option>";

	for ( var i = 0; i < response.listService.length; i++) {

		list = list + '<option value="' + (response.listService[i].serviceId)
				+ '">' + (response.listService[i].serviceName) + '</option>';

	}

 if(callform =="ONLOAD"){
	 $("#listmstr_select_otdrugs").html(list);
	  $("#listmstr_select_otinv").html(list);
	  $("#listmstr_select_otcharges").html(list);
	  $("#listmstr_select_otcharges2").html(list); 
	  $("#listmstr_select_otcath").html(list); 
	  $("#listmstr_select_otcpoe").html(list);
	}
 if(callform=="OTDRUG"){
	 
	 $("#listmstr_select_otdrugs").html(list);
  }else if(callform=="OTINV"){
	  $("#listmstr_select_otinv").html(list);
  }
  else if(callform=="OTCATH"){
	  $("#listmstr_select_otcath").html(list);
  }else if(callform=="OTCPOE") {
		$("#listmstr_select_otcpoe").html(list);
	}else{
	  if(setDiv=="dynamicItemcom2"){
		  $("#listmstr_select_otcharges2").html(list); 
	  }else{
		  $("#listmstr_select_otcharges").html(list);  
	  }
	
	
  }
	
	
	

}

function setDyanamicDivot(setDiv, getDiv,callform) {
	
	var data = $('#' + getDiv).select2('data');

	name = data.text;
	id = data.id;

	var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="liItmesHc'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcomot('
			+ count + ',' + id + ',\'' +  callform + '\',\'' + setDiv + '\')" href="#"></a>'
			
		if(callform=="OTDRUG"){	
			htm = htm	
			       + '<input id="lisHcd' + (count) + '" type="hidden" value="' + id
			       + '">';
		  } else if(callform=="OTINV"){
			  htm = htm	
			    + '<input id="lisHci' + (count) + '" type="hidden" value="' + id
				+ '">';
		  } else if(callform=="OTCATH"){
			  htm = htm	
			    + '<input id="lisHcat' + (count) + '" type="hidden" value="' + id
				+ '">';
		  } else if(callform=="OTCPOE"){
			  htm = htm	
			    + '<input id="lisHcpe' + (count) + '" type="hidden" value="' + id
				+ '">';
		  }  else {
			  
			  if(setDiv=="dynamicItemcom2"){
				  htm = htm
					+ '<input id="lisHc2' + (count) + '" type="hidden" value="' + id
					+ '">';
			  }else{
			  htm = htm
				+ '<input id="lisHc' + (count) + '" type="hidden" value="' + id
				+ '">';
			  }
		  }
	
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		fetchAllServicecomot(callform , setDiv);// for masters
	} else {
		var masterid ="";
		if(callform=="OTDRUG"){	
			 masterid = $("#lisHcd" + 0).val();	
		}else if(callform=="OTINV"){
			 masterid = $("#lisHci" + 0).val();
		}else if(callform=="OTCATH"){
			 masterid = $("#lisHcat" + 0).val();

		}else if(callform=="OTCPOE"){
			 masterid = $("#lisHcpe" + 0).val();

		}else{
			if(setDiv=="dynamicItemcom2"){
				 masterid = $("#lisHc2" + 0).val();
			}else{
				 masterid = $("#lisHc" + 0).val();
			}
			
		}
		
		var selfId = 0;
		if (liSize == 1) {
			fetchSubServiceByIdcomot(masterid, selfId,callform, setDiv);
		} else {
			
			if(callform=="OTDRUG"){	
				selfId = $("#lisHcd" + (liSize - 1)).val();
			}else if(callform=="OTINV"){
				selfId = $("#lisHci" + (liSize - 1)).val();
			}else if(callform=="OTCATH"){
				selfId = $("#lisHcat" + (liSize - 1)).val();
			}else if(callform=="OTCPOE"){
				selfId = $("#lisHcpe" + (liSize - 1)).val();
			}else{
				if(setDiv=="dynamicItemcom2"){
					selfId = $("#lisHc2" + (liSize - 1)).val();
					 
				}else{
					selfId = $("#lisHc" + (liSize - 1)).val();
				}
				
			}
			
			fetchSubServiceByIdcomot(masterid, selfId,callform,setDiv);
		}
		
	}// now inside submaster catagories
	var lisHc="";
	if(callform=="OTDRUG"){
		lisHc=$("#lisHcd"+count).val();
	}
	else if(callform=="OTINV"){
		lisHc=$("#lisHci"+count).val();	
	}else if(callform=="OTCATH"){
		lisHc=$("#lisHcat"+count).val();	
	}else{
		
		if(setDiv=="dynamicItemcom2"){
			lisHc=$("#lisHc2"+count).val();
		}else{
			lisHc=$("#lisHc"+count).val();
		}
		
	}
	
	//alert(lisHc);
	/*if(lisHc == 29){
		alert("Hi");
		fetchpharmaproductclick();
		
	}else{*/
	if(callform=="OTCHARG"){
		fetchconfigdataonclick(callform);
		
		//fetchdetailsOT(masterid, selfId,callform);
	}
		
	//}
	
}

function removeInpuntFildcomot(count, id, callform , setDiv) {

	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesHc' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = 0;
	if(callform=="OTDRUG"){
		masterid = $("#lisHcd" + 0).val();
	}else if(callform=="OTINV"){
		masterid = $("#lisHci" + 0).val();
	}else  if(callform=="OTCATH"){
		masterid = $("#lisHcat" + 0).val();
	}else  {
		masterid = $("#lisHc" + 0).val();
	}
	
	
	var selfId = 0;
	
	if (masterid == "" || masterid == null || masterid == undefined || isNaN(masterid)) {
		masterid = 0;
	}
	if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
		selfId = 0;
	}
	if (liSize == 0) {
		fetchAllServicecom();

	} else {
		
		if (liSize == 1) {
			fetchSubServiceByIdcomot(masterid, selfId);
		} else {
			if(callform=="OTDRUG"){
				selfId = $("#lisHcd" + (liSize - 1)).val();	
			}else if(callform=="OTINV"){
				selfId = $("#lisHci" + (liSize - 1)).val();
			}else if(callform=="OTCATH"){
				selfId = $("#lisHcat" + (liSize - 1)).val();
			}
			
			else{
				selfId = $("#lisHc" + (liSize - 1)).val();
			}
			
			
			if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
				selfId = 0;
			}
			fetchSubServiceByIdcomot(masterid, selfId);
		}
		
	}
}


function multiSelectSlavecomot(response,callform , setDiv) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstSubService.length; i++) {

		list = list + '<option value="' + (response.lstSubService[i].subId)
				+ '">' + (response.lstSubService[i].categoryName) + '</option>';
		
	}
//	alert(callform);
	if(callform=="OTDRUG"){
		$("#listmstr_select_otdrugs").html(list);
	}else if(callform=="OTINV") {
		$("#listmstr_select_otinv").html(list);
	}else if(callform=="OTCATH") {
		$("#listmstr_select_otcath").html(list);
	}else if(callform=="OTCPOE") {
		$("#listmstr_select_otcpoe").html(list);
	}else{
		if(setDiv=="dynamicItemcom2"){
			$("#listmstr_select_otcharges2").html(list); 
		}else{
			$("#listmstr_select_otcharges").html(list);
		}
	
	 
	}
	
}

/**
 * @author : Bilal
 * @date   : 31-july-2017
 * @code   : for fectch all services whose combination flag is Y services***/
function fetchAllServicecomot(callform , setDiv) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceListCom",
		
		success : function(response) {
			multiSelectcomot(response , callform , setDiv);
			//fetchSubServiceCategoryList();
		}
	});

}

/**
 * @author : Bilal
 * @date   : 31-july-2017
 * @code   : for fectch all sub services whose combination flag is Y under services***/
function fetchSubServiceByIdcomot(masterId, selfId,callform , setDiv) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			multiSelectSlavecomot(response,callform , setDiv);
		}
	});
}

/**@author   :Bilal
 * @Date     :4-Aug-2017
 * @code     :for fetching dynamic services on right div**/
function fetchconfigdataonclick(callform) {
	
	//charges Id and Charges Slave Id
	var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;
	var liSize = $("#dynamicItems li").length;
	chargesSlaveId = $("#lis" + (liSize - 1)).val();
	
	if (chargesId == "" || chargesId == null || chargesId == undefined || isNaN(chargesId)) {
		chargesId = 0;
	 }
	if (chargesSlaveId == "" || chargesSlaveId == null || chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	 }
	//is combination flag
	var isComServId = $("#lisHc0").val();
	var isComServlastId = 0;
	var liSizeCom = $("#dynamicItemcom li").length;
	isComServlastId =$("#lisHc" + (liSizeCom - 1)).val();
    
    if (isComServId == "" || isComServId == null || isComServId == undefined || isNaN(isComServId)) {
    	isComServId = 0;
	 }
	if (isComServlastId == "" || isComServlastId == null || isComServlastId == undefined || isNaN(isComServlastId)) {
		isComServlastId = 0;
	 }
	//Hall Id and Hall slave Id
	var hallId = $("#lisH0").val();
	var hallSlaveId =0;
	var liSizeHall = $("#dynamicItems2 li").length;
    hallSlaveId = $("#lisH" + (liSizeHall - 1)).val();
	
	 if (hallId == "" || hallId == null || hallId == undefined || isNaN(hallId)) {
		 hallId = 0;
	}
		if (hallSlaveId == "" || hallSlaveId == null || hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
	 }
	
	//$('#queryType').val("update");
	
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/configurationservice/getConfigurationListFromViewForSub",
		data : {
			"chargesId"      : parseInt(chargesId),
			"chargesSlaveId" : parseInt(chargesSlaveId),
			
			"hallId"         : parseInt(hallId),
			"hallSlaveId" : parseInt(hallSlaveId),
			
			"isComServId"      : parseInt(isComServId),
			"isComServlastId" : parseInt(isComServlastId)
		},
		error : function() {
			alert('error');
		},
		success : function(response) {
		
			setDynamicServicesOnright(response, callform);
		}
	});		
}

/**@author   :Bilal
 * @Date     :4-Aug-2017
 * @code     : for set dynamic services on right div**/
function setDynamicServicesOnright(response,callform) {
	var htm = "";
    var index = $("#rightDiv tr").length;

if (callform=="FETHOTPER"){
	
	 for ( var i = 0; i < response.listOTPercentage.length; i++) {
			var categoryName = response.listOTPercentage[i].subservicesname;
			var percentage = response.listOTPercentage[i].percentage;
			var serviceId=response.listOTPercentage[i].childSubServiceId;	
			htm = htm
			
			+ "<tr  id='tr"+(index + 1)+"' class='trs'><td class=' center' id='chName"
			+ (index + 1)
			+ "' style='height: 21.5px;width:52%'>"
			+ categoryName
			+ "</td><td class=' center' id='charges" + (index + 1)+"' style='height: 21.5px;width:14%' >"
			+"<input type='text' class='left_Charges' id='inChargesr" + (index + 1)+"' name='charges" + (index + 1)+"' onkeyup='totalAmount()' value='"+ percentage +"'>"
			
		
			+ "</td>" 
		    +  "<input type='hidden'  class='subserviceId"+ (index + 1) + "' id='subbId"+ (index + 1) + "' value='"+ serviceId + "'>"
			+  "<input type='hidden'  class='lotherbill"+ (index + 1) + "'  value='"+ response.listOTPercentage[i].opid +"' id='otherbill"+ (index + 1)+"'/>"
		//	+"<input type='hidden'  class='otherflag"+ (index + 1) + "'  value='N' id='otherflag"+ (index + 1)+"'/>"
			

			+ "<td id='copyTd"+(index + 1)+"'>" 
			+"</td>"
			
			+ "</tr>" ;
			index++;
	 }
		}else{
   if(callform=="OTPER"){
	   for ( var i = 0; i < response.lstSubService.length; i++) {
	        var categoryName = response.lstSubService[i].categoryName;
		//	var charges = response.lstSubService[i].charges;
			var serviceId=response.lstSubService[i].subId;	
		htm = htm
		
		+ "<tr  id='tr"+(index + 1)+"' class='trs'><td class=' center' id='chName"
		+ (index + 1)
		+ "' style='height: 21.5px;width:52%'>"
		+ categoryName
		+ "</td><td class=' center' id='charges" + (index + 1)+"' style='height: 21.5px;width:14%' >"
		+"<input type='text' class='left_Charges' id='inCharges" + (index + 1)+"' name='charges" + (index + 1)+"' onkeyup='totalAmount()' value='"+ 0 +"'>"
		+ "</td>" 
		+  "<input type='hidden' class='subserviceId"+ (index + 1) + "' id='subbId"+ (index + 1) + "' value='"+ serviceId + "'>"
		+ "<input type='hidden'  class='lotherbill"+ (index + 1) + "'  value='0' id='otherbill"+ (index + 1)+"'/>"
	//	+"<input type='hidden'  class='otherflag"+ (index + 1) + "'  value='N' id='otherflag"+ (index + 1)+"'/>"
		+ "<td id='copyTd"+(index + 1)+"'><input type='button' value='>>' id='inputCnt"+ (index + 1) + "' onclick='addTRtoRight("+(index + 1)+")'>" 
		+"</td>"
		
		+ "</tr>" ;
		
		index++;
		}
	}else{
		 for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {
		        var categoryName = response.lstServiceConfigurations[i].categoryName;
				var charges = response.lstServiceConfigurations[i].charges;
				var serviceId=response.lstServiceConfigurations[i].serviceId;		 
	  htm = htm
		
		+ "<tr  id='tr"+(index + 1)+"' class='trs'><td class='col-sm-5-1 center' id='chName"
		+ (index + 1)
		+ "' style='height: 21.5px;'>"
		+ categoryName
		+ "</td><td class='col-sm-5-1 center' id='charges" + (index + 1)+"' style='height: 21.5px;' >"
		+"<input type='text' class='left_Charges' id='inCharges" + (index + 1)+"' name='charges" + (index + 1)+"' onkeyup='totalAmount()' value='"+ charges +"'"
		+ "</td>" 
		+  "<input type='hidden' class='subserviceId"+ (index + 1) + "' id='subbId"+ (index + 1) + "' value='"+ serviceId + "'>"
		+ "<input type='hidden'  class='lotherbill"+ (index + 1) + "'  value='0' id='otherbill"+ (index + 1)+"'/>"
	//	+"<input type='hidden'  class='otherflag"+ (index + 1) + "'  value='N' id='otherflag"+ (index + 1)+"'/>"
		

		+ "<td id='copyTd"+(index + 1)+"'>" 
		+"</td>"
		
		+ "<td id='lastTd"+(index + 1)+"'><input type='button' value='>>' id='inputCnt"+ (index + 1) + "' onclick='addTRtoRight("+(index + 1)+")'>" 
		
		+"</td>"
		+ "</tr>" ;
	}
	
		
	index++;
}
}
if(callform=="OTPER"){
	$("#leftDiv").html(htm);
		
}else{
	$("#rightDiv").html(htm);			
}
	



	/*var htm = '';
	
	var index = 0;
	for ( var i = 0; i < response.lstServiceConfigurations.length; i++) {

		var categoryName = response.lstServiceConfigurations[i].categoryName;
		var charges = response.lstServiceConfigurations[i].charges;
		var serviceId=response.lstServiceConfigurations[i].serviceId;
		
		htm = htm
		
				
			
				+'<tr id="tr'+(i + 1)+'">'
				+'<td id="chName'+(i + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
				+'<td id="charges'+(i + 1)+'" class="col-sm-3-1 center" style="height: 21.5px;">'
				+'<input id="inCharges1" class="right_Charges" type="text" td="" <="" value="'+charges+'" onkeyup="totalAmount()" name="charges'+(i + 1)+'">'
				+'</td>'
				
				
				+'<td>'
				+'<input id="subbId'+(i + 1)+'" class="subserviceIds'+(i + 1)+'" type="hidden" value="'+serviceId+'">'
				+'</td>'
				+'<td id="lastTd'+(i + 1)+'">'
				+'<input id="inputCnt'+(i + 1)+'" type="button" value=">>" onclick="addTRtoRight('+(i + 1)+')"></td>'
				+'<td> <input type="hidden" id="idservices'+ (index + 1) +'"  value="'+ serviceId + '"></td>'	
				+'</tr>';
		
		
		$('#subIDs').append(","+serviceId);
		index++;*/
	//}

	

}

/**@author Bilal
 * @date 10-JUN-2017
 * @code For add tr to right div
 * **/
/*function addTRtoRight(trCnt) {
	
	var subIDs=$("#subbId"+trCnt).val();
	var subValues =$('#subIDs').html();
	var subValues = $("#subIDs").html().split(",");
	//if it gives -1 then add to right div other wise return flase
	var position =subValues.indexOf(subIDs);
	if(position>=0){
		return false;
	}
	var index = $("#rightDiv tr").length;
	var trNew = $('#tr' + trCnt).html();
	$('#tr' + trCnt).remove();
	
	
	$("#rightDiv").append("<tr id='tr" + trCnt + "'>" + (trNew) + "</tr>");
	// $("#inputCnt"+trCnt).on('click', addTRtoLeft);
	var htm = '<input id="inputCnt' + (trCnt)
			+ '" type="button" onclick="addTRtoLeft(' + (trCnt)
			+ ')" value="<<">';

	$('#lastTd' + trCnt).html(htm);
	
	$('#subIDs').append(","+subIDs);
	
	$('#inCharges' + trCnt).removeClass('left_Charges');
	$('#inCharges' + trCnt).addClass('right_Charges');
	
	$('#subbId' + trCnt).removeClass('subserviceId'+trCnt); 
	$('#subbId' + trCnt).addClass('subserviceIds'+(index+1));
	
	
	// totalAmount();
	
}*/

/*******************************************************************************
 * @author Bilal SubServiceCategoryList
 * @date 9_May_2017 For Service master template
 ******************************************************************************/
function SubServiceTemplatedemo(response) {

	var htm = "";
	var index = $("#rightDiv tr").length;
	for ( var i = 0; i < response.lstSubService.length; i++) {
		htm = htm
				
				+ "<tr  id='tr"+(index + 1)+"' class='trs'><td class='col-sm-5-1 center' id='chName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ response.lstSubService[i].categoryName
				+ "</td><td class='col-sm-5-1 center' id='charges" + (index + 1)+"' style='height: 21.5px;' >"
				+"<input type='text' class='left_Charges' id='inCharges" + (index + 1)+"' name='charges" + (index + 1)+"' onkeyup='totalAmount()' value='"+ response.lstSubService[i].charges+"'"
				
			
				+ "</td>" 
				
				
				+  "<input type='hidden' class='subserviceId"+ (index + 1) + "' id='subbId"+ (index + 1) + "' value='"+ response.lstSubService[i].subId + "'>"
				

				+ "<td id='copyTd"+(index + 1)+"'>" 
				+"</td>"
				
				+ "<td id='lastTd"+(index + 1)+"'><input type='button' value='>>' id='inputCnt"+ (index + 1) + "' onclick='addTRtoRight("+(index + 1)+")'>" 
				
				
				+ "</tr>" ;
			
		index++;
	}

	$("#leftDiv").html(htm);

}


/**@author Bilal
 * @date 10-JUN-2017
 * @code For add tr to right div
 * **/
function addTRtoRight(trCnt) {
//old	
/*	var subIDs=$("#subbId"+trCnt).val();
	var subValues = $("#subIDs").html().split(",");
	//if it gives -1 then add to right div other wise return flase
	var position =subValues.indexOf(subIDs);
	if(position>=0){
		return false;
	}
	var index = $("#rightDiv tr").length;
	var trNew = $('#tr' + trCnt).html();
	$('#tr' + trCnt).remove();
	
	$("#rightDiv").append("<tr id='tr" + trCnt + "'>" + (trNew) + "</tr>");
	
	var htm = '<input id="inputCnt' + (trCnt)
			+ '" type="button" onclick="addTRtoLeft(' + (trCnt)
			+ ')" value="<<">';

	$('#lastTd' + trCnt).html(htm);
	$('#subIDs').append(","+subIDs);
	$('#inCharges' + trCnt).removeClass('left_Charges');
	$('#inCharges' + trCnt).addClass('right_Charges');
	
	$('#subbId' + trCnt).removeClass('subserviceId'+trCnt); 
	$('#subbId' + trCnt).addClass('subserviceIds'+(index+1));
	$('#otherbill' + trCnt).removeClass('lotherbill'+trCnt); 
	$('#otherbill' + trCnt).addClass('Rotherbill'+(index+1));

	 totalAmount();*/
	
//new	
     var subIDs=$("#subbId"+trCnt).val();	
	 var subValues = $("#subIDs").html().split(",");

		var position =subValues.indexOf(subIDs);
		if(position>=0){
			return false;
		}
	var chName     = $("#chName"+trCnt).text();
	//var charges    = $("#charges"+trCnt).val();
	var inCharges  = $("#inCharges"+trCnt).val();
	var index = $("#rightDiv tr").length;
	
	
	$('#rightDiv').append('<tr id="trs'+(index+1) +'">'
    		+'<td id="chName'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+chName+'</td>'
    		+'<td id="charges'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'
    		+'<input id="inChargesr'+(index+1) +'" class="right_Charges" type="text"  value="'+inCharges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'
    		+'<input id="subbId'+(index+1) +'" class="subserviceIdr'+(index+1) +'" type="hidden" value="'+subIDs+'"></td>'
    		+'<td id="lastTd'+(index+1) +'">'
    		+'<input type="hidden"  class="lotherbill'+ (index + 1) + '"  value="0" id="otherbill'+ (index + 1)+'"/>'
    		+'<input id="inputCnt'+(index+1) +'" type="button" value="<<" onclick="addTRtoLeft('+(index+1) +')"></td>'
    		+'</tr>');
    
   

	$('#tr' + trCnt).remove();	
	$('#subIDs').append(","+subIDs);

	var rcunt = index + 1;
	$('#rcunt').val(rcunt);	

	
}

/**@author Bilal
 * @date 10-JUN-2017
 * @code For add tr to left div
 * **/
function addTRtoLeft(trCnt) {
	//old
	
/*	
	var trNew = $('#tr'+trCnt ).html();
	
	$('#tr'+trCnt).remove();

	$("#leftDiv").append("<tr id='tr"+trCnt+"'>"+(trNew)+"</tr>");
	var htm = '<input id="inputCnt'+(trCnt)+'" type="button" onclick="addTRtoRight('+(trCnt)+')" value=">>">';
	$('#lastTd'+trCnt).html(htm);
	var subIDs=$("#subbId"+trCnt).val();
	var subValues = $("#subIDs").html();
	var temp =  subValues+","; 
	var myString = temp.replace(","+subIDs+",",',');
     var setVal = myString.slice(0,-1);
     $('#subIDs').html(setVal);
	$('#inCharges'+trCnt).removeClass('right_Charges');
	$('#inCharges'+trCnt).addClass('left_Charges');
	
	 totalAmount();*/
	
	
//new
    var subIDs=$("#subbId"+trCnt).val();	
	var subValues = $("#subIDs").html();
	var temp =  subValues+","; 
	var myString = temp.replace(","+subIDs+",",',');
	var setVal = myString.slice(0,-1);
	$('#subIDs').html(setVal);
	
	var chName     = $("#chName"+trCnt).text();
	//var charges    = $("#chargesr"+trCnt).val();
	var inCharges  = $("#inChargesr"+trCnt).val();
	var index = $("#leftDiv tr").length;
	
	
	$('#leftDiv').append('<tr id="tr'+(index+1) +'">'
    		+'<td id="chName'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'+chName+'</td>'
    		+'<td id="charges'+(index+1) +'" class="col-sm-5-1 center" style="height: 21.5px;">'
    		+'<input id="inCharges'+(index+1) +'" class="left_Charges" type="text"  value="'+inCharges+'" onkeyup="totalAmount()" name="charges'+(index+1) +'">'
    		+'<input id="subbId'+(index+1) +'" class="subserviceId'+ (index + 1) +'" type="hidden" value="'+subIDs+'"></td>'
    		+'<td id="lastTd'+(index+1) +'">'
    		+'<input id="inputCnt'+(index+1) +'" type="button" onclick="addTRtoRight('+(index+1) +')" value=">>"></td>'
    		+'<input type="hidden"  class="lotherbill'+ (index + 1) + '"  value="0" id="otherbill'+ (index + 1)+'"/>'
    		+'</tr>');
	
	
	
	$('#trs'+trCnt).remove();
	
	 totalAmount();


	
}
/**@author Bilal
 * @Date 9_JUN_2017
 * @code For total amount  *** */
function totalAmount() {

	var total = 0;
	var cmt = 1;
	
	$(".right_Charges").each(function() {
		
		var charges  = parseFloat($(this).val());
		if (charges == "" || charges == null || charges == undefined || isNaN(charges)) {
			charges = 0;
		}
		total = total + charges;
		

	});
	
	cmt++;
	

	$("#totalcharges").val(total);
	Math.ceil($("#totalcharges").val()); 
	//refresh All Values after caculations
	
}

function Saveoperations(callform){
	var tamount =$("#totalcharges").val();
	//For Service Id
	/*var masterId = $("#li0").val();// masterid
	var liSizeForServices = $("#dynamicItem li").length;
	var serviceLastId  = $("#li" + (liSizeForServices - 1)).val();*/
	var treatmentoperationid = $("#treatmentoperationid").val();
	var masterId = $("#lisHc20").val();// chargesId
	var serviceLastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom2 li").length;
	serviceLastId = $("#lisHc2" + (liSizeCom - 1)).val();
	
	
	
	var rightDivLength = $("#rightDiv tr").length;
	var totalcharges= parseFloat($("#totalcharges").val());
    if (rightDivLength == 0) {
		alert("Please Take Atleast One Service Charges To Save Or Update!");
		// SetFocus('rightDiv');
		return false;

	}
    var quantity     =  1;
	var	patienttId   =  $("#pt_Id").val();
	var treatmentId  =  $("#tr_Id").val();  
	var billid       =  $("#bill_Id").val();
	var y = document.getElementById("scheduledProcedure");
	var scheduledProcedure ='';//added by paras
	for ( var j = 0; j < y.options.length; j++) {
		
		//scheduledProcedure.push(y.options[j].value);
		scheduledProcedure=scheduledProcedure + "," + y.options[j].value  ;
	}
	var otProcedure = scheduledProcedure.slice(1);
	var bidipdoc=$("#bidipdoc").val();
	if(bidipdoc==null || bidipdoc ==""){
		bidipdoc=0;
	}
//	var otProcedure=scheduledProcedure; 
	//alert(otProcedure);
	//alert(scheduledProcedure);
  //defined array to save list of records 
	/*var cmt = 1;
	var configurationDetails = {
		lstConfigurService : []
	};
	var anethid=0;
	var surganid=0;
	var teamMemberCount = $("#teamMemberCount").val();
	var count = 0;
	for ( var i = 1; i <= teamMemberCount; i++) {
		// alert(x.options[i].value);
		var docId = $("#idUser" + i).val();// alert(docId);
		var docNameT = $("#docNameT" + i).text();
		var doctp = $("#docTypeT" + i).text();
		var surgeontp = $("#doctorType" + i).text();
		//alert(doctp);
		if (doctp == "anesthetist") {
			if (docId != null && docId != "" && docId != undefined) {
				anethid = docId;
				break;
			}
			
		}
		
	}
	for ( var i = 1; i <= teamMemberCount; i++) {
		// alert(x.options[i].value);
		var docId = $("#idUser" + i).val();// alert(docId);
		var docNameT = $("#docNameT" + i).text();
		var doctp = $("#docTypeT" + i).text();
		var surgeontp = $("#doctorType" + i).text();
		
		if (doctp == "surgon") {
			if (docId != null && docId != "" && docId != undefined) {
				surganid = docId;
				break;
			}
			
		}
		
	}
*/
	var cmt = 1;
	var serviceDetails = {
				listEhatOtherBillDetailForIpd : []
	        };
	// for each
	$(".right_Charges  ").each(function() {
		
		
			   var charges = parseFloat($(this).val());		
			   var servassignID = $(".subserviceIds"+cmt).val();
			   var amount  =  charges * 1;
			   var rate=charges;
			   var otherbildetailidipd = $(".Rotherbill"+cmt).val();
		       var copay = amount;
		       
		     //  var otherflag = $(".otherflag"+ cmt).val();
			//	alert("otherbildetailidipd==="+ otherbildetailidipd);
		       serviceDetails.listEhatOtherBillDetailForIpd.push({
					otherbildetailidipd:otherbildetailidipd,
					patienttId : patienttId,
					treatmentId : treatmentId,
			        departmentId : 2,
			        billId : billid,
			        sourceTypeId : 0,
			        rate : rate,
			        quantity : 1,
			        amount : amount,
			        serviceId : masterId,
			        subServiceId : serviceLastId,
			        doctorId:0,
			       // urgentFlag:"N",
			      //  clinicalnotes:"-",
			      //  instructions:"-",
			        unitId : 0,
			        ot_flag:"Y",
			        coPay  :amount,
			        childSubServiceId:servassignID,
			       otprocedure:otProcedure,
			       otherflag:"C",
			       iscombination:"Y",
			       billDetailsId:bidipdoc,
			       
			       otherRate:rate,
			       otherAmount :amount,
			       otherPay :0,
			       otherCoPay:amount
			    });
			    
		cmt++;			
	});
    var othersid=0;
	serviceDetails = JSON.stringify(serviceDetails);
	var queryType=$("#queryTypeOS").val();
	var inputs = [];
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('othersid=' + othersid);
	inputs.push('queryType=' + queryType);
	inputs.push('callform=' + callform);
	inputs.push('treatmentoperationid=' + treatmentoperationid);
	inputs.push('tamount=' + tamount);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/saveOTdetails",
	
		success : function(r) {
			if(r>0){
				alert("Save Sucessfully")
			var otab="";
			fetchdetailsOT(masterId, serviceLastId,callform,otab);
			}
		
		}	
		
	});
}

function fetchdetailsOT(masterid, selfId ,callform,otab ){
	//Changed By Akshata
	$("#callfrom").val("cpoe");
	//var	patienttId   =  $("#pt_Id").val();
	
	//Changed By Akshata 24-08-2022
	var	patienttId   =  $("#pid").val();
	var treatmentId  =  $("#tr_Id").val();	
	var treatmentoperationid = $("#treatmentoperationid").val();
	var queryType=$("#queryTypeOD").val();
	if(masterid!=null || masterid!="" && selfId!= null || selfId!=""){
		
	var inputs = [];
	
	inputs.push('patienttId=' + patienttId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('queryType=' + otab);
    inputs.push('masterid=' + masterid);
    inputs.push('selfId=' + selfId);
    inputs.push('callform=' + callform);
    inputs.push('treatmentoperationid=' + treatmentoperationid);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/fetchdetailsOT",
	
		success : function(r) {
			
			if(callform=="OTDRUG"){
				$("#txtautoservicePharma").val("");
				$("#pharmaQty").val(1);
				$("#pharmaRate").val(0);
				$("#pharmaAmt").val(0);
				setPharmaDetails(r,callform);	
				
			}else if(callform=="OTINV"){
				$("#txtautoserviceOI").val("");
				$("#InvRate").val(0);
				$("#InvQty").val(1);
				$("#InvAQty").val(0);
				$("#InvAmt").val(1);	
				setPharmaDetails(r,callform);	
			} else if(callform=="OTCATH"){
				//$("#billidcath").val(ipdbillid);
				$("#txtCath").val("");
				$("#cathQty").val(1);
				$("#cathRate").val(0);
				$("#cathAmt").val(0);
				//$("#queryTypeOTC").val(childSubServiceId);
				setPharmaDetails(r,callform);	
			}else if(callform=="CPOE"){
				//$("#billidcath").val(ipdbillid);
				 $('#txtautoserviceName').val("");
				 $("#subservicesname").val("");
	             $("#servicename").val("");
				 $("#cpoeClinicalNotes").val("");
				 $("#cpoeIns").val("");
	             $("#OtRate").val(0);
				 $("#OtQty").val(1);
				 $("#OtAmt").val(0); 
				//$("#queryTypeOTC").val(childSubServiceId);
				 testRowCountcpoeOT = 1;
				$("#tcpoeservices").setTemplate(servicedetailsOTcpoe);
				$("#tcpoeservices").processTemplate(r);   
			}else {
			setOTDynamicServicesOnright(r,callform);
			}
		//	 alert(r);
		
		}	
		
	});
	}
}

/**@author   :Bilal
 * @Date     :4-Aug-2017
 * @code     : for set dynamic services on right div**/
function setOTDynamicServicesOnright(response,callform) {

	var htm = '';
	
	var index = 0;
	
	var cmt = $("#leftDiv tr").length;
		
	if (callform=="FETHOTPER"){
		
		 for ( var i = 0; i < response.listOTPercentage.length; i++) {
				var categoryName = response.listOTPercentage[i].subservicesname;
				var percentage = response.listOTPercentage[i].percentage;
				var serviceId=response.listOTPercentage[i].childSubServiceId;	
				htm = htm
				
				+ "<tr  id='trs"+(cmt + 1)+"' class='trs'><td class=' center' id='chName"
				+ (cmt + 1)
				+ "' style='height: 21.5px;width:52%'>"
				+ categoryName
				+ "</td><td class=' center' id='charges" + (cmt + 1)+"' style='height: 21.5px;width:14%' >"
				+"<input type='text' class='right_Charges' id='inChargesr" + (cmt + 1)+"' name='charges" + (cmt + 1)+"'  value='"+ percentage +"'>"
				+ "<td>" 
				+"<input id='inputCnt"+(cmt + 1)+"' type='button' value='<<' onclick='addTRtoLeft("+(cmt + 1)+"),deleteOTP(" + response.listOTPercentage[cmt].opid + " ,\"OTP\")'>"
			    + "</td>" 
				
			    +  "<input type='hidden'  class='mId"+ (cmt + 1) + "' id='mId"+ (cmt + 1) + "' value='"+ response.listOTPercentage[i].serviceId + "'>"
				+  "<input type='hidden'  class='sId"+ (cmt + 1) + "' id='sId"+ (cmt + 1) + "' value='"+ response.listOTPercentage[i].subserviceId + "'>"
				+  "<input type='hidden' class='subserviceIdr"+ (cmt + 1) + "' id='subbId"+ (cmt + 1) + "' value='"+ serviceId + "'>"
				+ "<input type='hidden'  class='lotherbill"+ (cmt + 1) + "'  value='"+ response.listOTPercentage[cmt].opid +"' id='otherbill"+ (cmt + 1)+"'/>"
			//	+"<input type='hidden'  class='otherflag"+ (index + 1) + "'  value='N' id='otherflag"+ (index + 1)+"'/>"
				

				+ "<td id='copyTd"+(cmt + 1)+"'>" 
				+"</td>"
				
				+ "</tr>" ;
				$('#subIDs').append(","+serviceId);
				index++;
				cmt++;
				
		 }}else{
			 for ( var i = 0; i < response.listEhatOTBillDetailForIpd.length; i++) {

					var categoryName  = response.listEhatOTBillDetailForIpd[i].categoryName;
					var charges       = response.listEhatOTBillDetailForIpd[i].rate;
					var serviceId     =response.listEhatOTBillDetailForIpd[i].childSubServiceId;
					//var idConfigurations =response.lstServiceConfigurations[i].idConfigurations;
					var otid          =response.listEhatOTBillDetailForIpd[i].otherbildetailidipd;
					
					$("#bidipdoc").val(response.listEhatOTBillDetailForIpd[i].bill_details_id );	
					htm = htm
				            +'<tr id="tr'+(cmt + 1)+'">'
							+'<td id="chName'+(cmt + 1)+'" class="col-sm-5-1 center" style="height: 21.5px;">'+categoryName+'</td>'
							+'<td id="charges'+(cmt + 1)+'" class="col-sm-3-1 center" style="height: 21.5px;">'
							+'<input id="inCharges'+(cmt + 1)+'" class="right_Charges" type="text" value="'+charges+'" onkeyup="totalAmount()" name="charges'+(cmt + 1)+'">'
							+'</td>'
							
							
							+'<td>'
							+'<input id="subbId'+(cmt + 1)+'" class="subserviceIds'+(i + 1)+'" type="hidden" value="'+serviceId+'">'
							+'<input type="hidden" id="otherbill'+ (cmt + 1) +'" class="Rotherbill'+(i + 1)+'"  value="'+ otid + '">'
							+'</td>'
							+'<td id="lastTd'+(cmt + 1)+'">'
							+'<input id="inputCnt'+(cmt + 1)+'" type="button" value="<<" onclick="addTRtoLeft('+(cmt + 1)+'),deletepharma(' + otid + ',\'OTCHARG\', '+ response.listEhatOTBillDetailForIpd[i].bill_details_id  + ')">'

							+'</td>'
							+'<td> <input type="hidden" id="idservices'+ (index + 1) +'"  value="'+ serviceId + '"></td>'
							
							+'</tr>';
					
				//	$('#otherbill' + (cmt + 1)).addClass('otherbillID'+ (cmt + 1));//added by paras
					$('#subIDs').append(","+serviceId);
					index++;
					cmt++;
					
				} 
		 }
	

	$("#rightDiv").html(htm);
	
	//totalAmount();
}



function fetchpharmaproductandinvclick(inputID,callform){
	
	var findingName=$("#" + inputID).val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('callform=' + callform);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data :  str +"&reqType=AJAX",
		url : "ehat/autoallservicestest/fetchpharmaproduct",
	
		success : function(r) {
		//	setPharmaDynamicServicesOnright(r);
		//	 alert(r);
		//	var value="Pharma"
			if(callform=="OTINV"){
				autoperation(r,inputID,callform);
			}else{
				autoCompTableTK(r,inputID,callform);
			}
			
			
			
		}	
		
	});
	
	
}

/**@author   :Paras suryawanshi
 * @Date     :7-Aug-2017
 * @code     : for set calculateTotalOTdrug**/
function calculateTotalOT(){
	var rate=$("#pharmaRate").val();
    var quantity=$("#pharmaQty").val();

    $("#pharmaAmt").val( (rate * quantity));
}
/**@author   :Paras suryawanshi
 * @Date     :7-Aug-2017
 * @code     : for set calculateTotalOTINVENTORY**/
function calculateTotalOINV(){
	var rate=$("#InvRate").val();
    var quantity=$("#InvQty").val();

    $("#InvAmt").val( (rate * quantity));
}

/**@author   :Paras suryawanshi
 * @Date     :7-Aug-2017
 * @code     : for set saveOT Drugs**/

var prodArr=[];
var masterId11     = 0;
var serviceLastId11 = 0;
function saveOD(callform){
	//Changed By Akshata
	var tamount =0.0;
	var treatmentoperationid = $("#treatmentoperationid").val();
	//var treatmentoperationid = 16;
	var serviceDetails = {
			listEhatOtherBillDetailForIpd : []
        };
	//var patienttId   =  $("#pt_Id").val();
	//var treatmentId  =  $("#tr_Id").val(); 
	var patienttId   =  $("#pid").val();
	var treatmentId  =  $("#tr_Id").val(); 
	var billid       =  $("#bill_Id").val();
	//var billid = 39274;
	var masterId     = 0;
	var serviceLastId = 0;
	var liSizeCom = 0;
	var batchId = 0;
	var charges = 0;
	var servassignID = 0;
	var amount = 0;
	var rate = 0;
	var otherbildetailidipd = 0;
	var copay =0;
	var quantity=0;
    var otherflag="";
    var y = document.getElementById("scheduledProcedure");
    var bathid =0;
    var otherRate   =  0; 
    var otherAmount = 0;
    var company_Id =  $("#chargesSlaveId").val();  
    var doctorId=0;
    if(company_Id==null || company_Id==""){
   	 company_Id=0;
   	 }
    var sourceTypeId=0;
    if( company_Id > 0){
		sourceTypeId=1;
	}
	var emrPer=$("#emrPer").val();
	
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
    
	var textBatch = $('#textBatch').val();
	var bathid = $('#bathid').val()
	var txtExpiry = $('#txtExpiry').val();
	
	var batchDetails = bathid+"@"+textBatch+"@"+txtExpiry;
	
    var scheduledProcedure ='';//added by paras
    if(y.options.length==0){
    	alert("Please Select Procedure Name in Operation Details!!");
    	if(callform=="OTDRUG"){
    		$("#otd").attr('class', '');
    		$("#OTDRUG").attr('class', 'tab-pane fade in');
    		$("#otdrug").attr('style', '');
    		$("#od").attr('class', 'active');
    		$("#Operation").attr('class', 'tab-pane fade active in');
    		$("#idOperation").attr('style', 'background-color: rgb(206, 217, 174)');
    		$("#Operation").show();
    		 $("#billidserviceOS").val("0");
    		 window.location.reload(true);
    		
    	}else if(callform=="CPOE"){
    		$("#otcpoe1").attr('class', '');
    		$("#CPOE").attr('class', 'tab-pane fade in');
    		$("#licpoe").attr('style', '');
    		$("#od").attr('class', 'active');
    		$("#Operation").attr('class', 'tab-pane fade active in');
    		$("#idOperation").attr('style', 'background-color: rgb(206, 217, 174)');
    		$("#Operation").show();
    		
    	}else if(callform=="OTINV"){
    		$("#otinv").attr('class', '');
    		$("#OTInv").attr('class', 'tab-pane fade in');
    		$("#linv").attr('style', '');
    		$("#od").attr('class', 'active');
    		$("#Operation").attr('class', 'tab-pane fade active in');
    		$("#idOperation").attr('style', 'background-color: rgb(206, 217, 174)');
    		$("#Operation").show();
    		 $("#billidserviceOS").val("0");
    		 window.location.reload(true);
    		
    		
    	}else if(callform=="OTCATH"){
    		$("#otc").attr('class', '');
    		$("#cathLab").attr('class', 'tab-pane fade in');
    		$("#licath").attr('style', '');
    		$("#od").attr('class', 'active');
    		$("#Operation").attr('class', 'tab-pane fade active in');
    		$("#idOperation").attr('style', 'background-color: rgb(206, 217, 174)');
    		$("#Operation").show();
    		 $("#billidserviceOS").val("0");
    		 window.location.reload(true);
    		
    	}
    	return false;
    }
      for ( var j = 0; j < y.options.length; j++) {
  		
  		//scheduledProcedure.push(y.options[j].value);
  		scheduledProcedure=scheduledProcedure + "," + y.options[j].value  ;
  	}
  	var otProcedure = scheduledProcedure.slice(1);
  	var queryType="";
  	var othersid=0;
	var bidipd =$("#bidipd").val();
	if(bidipd==null || bidipd ==""){
		bidipd=0;
	}
  	if(callform=="OTINV"){
  		tamount = $("#totalchargesinv").val();
  	     masterId = $("#lisHci0").val();// chargesId
        // static chargesSlaveId
        liSizeCom = $("#dynamicItemINV li").length;
        serviceLastId = $("#lisHci" + (liSizeCom - 1)).val();
        charges = $("#InvRate").val();		
	    servassignID = $("#serIDinv").val();
	    batchId = $("#batchId").val();
	    amount  =  $("#InvAmt").val();
	    rate=charges;
	    otherbildetailidipd = parseInt($("#billdinv").val());
        copay = amount;
        quantity=$("#InvQty").val();
        queryType=$("#queryTypeOI").val();  
        othersid=$("#mrnslaveId").val();
        otherflag="I";
        var txtautoservicePharma=$("#txtautoserviceOI").val();
       
        if(txtautoservicePharma=="" || txtautoservicePharma==null){
        	alert("Please Select OT Inventory");
        	return false;
        }
        if(liSizeCom == 0){
        	alert("Please Select OT Inventory Combination Services ");
        	return false;
        }
        
        var InvAQty=$("#InvAQty").val();
        if(parseInt(quantity) > parseInt(InvAQty) ){
        	alert("Quantity Should be less than Available Quantity!! ");
        
        	    $("#InvQty").focus();
        	return false;
        }
        otherRate =rate;
        otherAmount= amount;
       // window.location.reload(true);
    }  else if(callform=="OTCATH"){
  		 tamount =100;
 	     masterId = $("#lisHcat0").val();// chargesId
        // static chargesSlaveId
        liSizeCom = $("#dynamicItemcath li").length;
        serviceLastId = $("#lisHcat" + (liSizeCom - 1)).val();
        charges = $("#pharmaRatecath").val();//150;		
	    servassignID = $("#setIDPharma").val();
	    
	    prodArr.push(servassignID);
	    masterId11     =masterId;
		serviceLastId11 = serviceLastId;
	    
	    rate=charges;
	    otherbildetailidipd = parseInt($("#billidcath").val());
       copay = amount;
       quantity=1;
       amount  =  rate*quantity;
       queryType=$("#queryTypeOI").val();  
      // othersid=$("#mrnslaveId").val();
       otherflag="L";
       var txtautoservicePharma=$("#txtCath").val();
      
       if(txtautoservicePharma=="" || txtautoservicePharma==null){
       	alert("Please Select OT CATHLAB");
       	return false;
       }
       if(liSizeCom == 0){
       	alert("Please Select OT CATHLAB Combination Services ");
       	return false;
       }
       otherRate   =  rate;
       otherAmount = amount;
   } else if(callform=="CPOE"){
	         masterId = $("#lisHcpe0").val();// chargesId
	        // static chargesSlaveId
	        liSizeCom = $("#dynamicItemcpoe li").length;
	        serviceLastId = $("#lisHcpe" + (liSizeCom - 1)).val();
	   otherflag="E";
	   	if( company_Id > 0){
			sourceTypeId=1;
			
		} 
     if(company_Id==null || company_Id==""){
       	 company_Id=0;
       	 
        }
          rate            = $("#OtRate").val();
	      quantity        = $("#OtQty").val();
	      amount          = $("#OtAmt").val();
	      otherRate       = $("#OtRate").val();
	      otherAmount     = $("#OtAmt").val();
	      //alert(rate);
     if ( company_Id > 0) {
	 		//FOR SPONSER CHARGSES
   	   	 otherRate  = rate;
   	   	 var rate1       = $("#txtnormalcharges").val();
    	if(rate1 > 0){
    		rate =rate1;
    	}
	 		if(otherRate== 0 || otherRate== 0.0){
	 			otherRate =	$("#OtRate").val();
	 		   }
	 		otherAmount = otherRate * quantity;
	 		amount      = rate * quantity;
	 		
	 	}
        // serviceId       = $("#serviceid" ).val();
	     subServiceId    = $("#subserviceid").val();
	     servassignID    = subServiceId;
         billDetailsId   = $("#billidservice").val();
	     subservicesname = $("#txtautoserviceName").val();
	     servicename     = $("#servicename").val();
	     unitId          = $("#uId").val();
	     doctorId        = $("#doctor2").val();                         
	     clinicalNotes   = $("#cpoeClinicalNotes").val();
	     instructions    = $("#cpoeIns").val();
         coPay           = amount;
	     callfrom="OTD";
	
		
      if($("#cpoeUrgent").is(':checked')){
	     urgentflag='Y';
	    	
	    }
	    
		if (subservicesname == "" ||  subservicesname ==null) {
			alert("Please enter servicename ");
			return false;
		}
		if(unitId ==0){
			unitid = $("#allunitid").val();
		}
		var doctorsel = $("#doctor2 :selected").val();
		
		if(doctorsel==0 || doctorsel == ""  || doctorsel ==null){
		//	alert("Please Select doctor ");
		//	return false;
			
		}
		if (clinicalNotes == "" ||  clinicalNotes ==null) {
			clinicalNotes="-";
		}
		if (instructions == "" ||  instructions ==null) {
			instructions="-";
		}
		
 
	   
	   
   }else{
	   
	   var textBatch = $('#textBatch').val();
		var batchId = $('#bathid').val()
		var txtExpiry = $('#txtExpiry').val();
    	tamount = $("#totalchargesph").val();
       masterId = $("#lisHcd0").val();// chargesId
        // static chargesSlaveId
       liSizeCom = $("#dynamicItemdrug li").length;
       serviceLastId = $("#lisHcd" + (liSizeCom - 1)).val();
       charges = $("#pharmaRate").val();		
	   servassignID = $("#serIDPharma").val();
	   amount  =  $("#pharmaAmt").val();
	   rate = charges;
	   otherbildetailidipd = parseInt($("#billidPharma").val());
       copay = amount;
       quantity=$("#pharmaQty").val();
       queryType=$("#queryTypeOD").val(); 
       otherflag="P";
       var txtautoservicePharma=$("#txtautoservicePharma").val();
       if(txtautoservicePharma=="" || txtautoservicePharma==null){
       	alert("Please Select OT Drug ");
       	return false;
       }
       if(liSizeCom == 0){
       	alert("Please Select OT Drug Combination Services ");
       	return false;
       }
       bathid
    }
	    
  	serviceDetails.listEhatOtherBillDetailForIpd.push({
		otherbildetailidipd : otherbildetailidipd,
		patienttId : patienttId,
		treatmentId : treatmentId,
		departmentId : 2,
		billId : billid,
		sourceTypeId : sourceTypeId,
		rate : rate,
		quantity : quantity,
		amount : amount,
		serviceId : masterId,
		subServiceId : serviceLastId,
		doctorId : doctorId,
		batchId:batchId,
		batchCode :textBatch ,
		batchExp : txtExpiry,
		// urgentFlag:"N",
		// clinicalnotes:"-",
		// instructions:"-",
		unitId : 0,
		ot_flag : "Y",
		coPay : amount,
		childSubServiceId : servassignID,
		otprocedure : otProcedure,
		otherflag : otherflag,
		iscombination : "Y",
		billDetailsId : bidipd,
		otherRate : rate,
		otherAmount : amount,
		emrPer : emrPer
	});
	    serviceDetails = JSON.stringify(serviceDetails);
	   
	   	var inputs = [];
	    inputs.push('serviceDetails=' + serviceDetails);
	   	inputs.push('othersid=' + othersid);
	   	inputs.push('queryType=' + queryType); 
	   	inputs.push('callform=' + callform);
	   	inputs.push('treatmentoperationid=' + treatmentoperationid);
	  	inputs.push('tamount=' + tamount);
		var str = inputs.join('&');
	//	alert("str**** "+str)
	   	jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ot/saveOTdetails",
		
			success : function(r) {
				ipdOT = 1;
				if(r ==0){
				
				}else{
					
					alertify.success("Save Successfully");
				//	alert("Save Succesfully");
					if(queryType == "update")
					{
						
					} else if(callform=="OTDRUG"){
						savePatientSaleOT(r);
					}
				}
				if(callform=="OTINV"){
					$("#txtautoserviceOI").val("");
					$("#InvRate").val(0);
					$("#InvQty").val(1);
					$("#InvAQty").val(0);
					$("#InvAmt").val(1);	
					$("#billdinv").val(0);
					$("#queryTypeOI").val('insert');
				}else{
					$("#txtautoservicePharma").val("");
					$("#pharmaQty").val(1);
					$("#pharmaRate").val(0);
					$("#pharmaAmt").val(0);
					$("#billidPharma").val(0);	
				}
				
			fetchdetailsOT(masterId, serviceLastId,callform,"");
			
			}	
			
		});
			

}


/**@author   :Paras suryawanshi
 * @Date     :7-Aug-2017
 * @code     : for set pharmasi dynamic services on right div**/
function setPharmaDetails(response,callform){
	
	


	var htm = "";
	var htm1 = "";
	var index = 1;
    var totalcharg=0.0;
	for ( var i = 0; i < response.listEhatOTBillDetailForIpd.length; i++) {
		var datetime= new Date(response.listEhatOTBillDetailForIpd[i].createdDate).toLocaleString();
		htm = htm
				+ "<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+"<input id='chkunserv' type='checkbox' name='drugBillCheckbox' style='margin-top: 2px; margin-left: 20px; cursor: pointer;' value='"+  response.listEhatOTBillDetailForIpd[i].otherbildetailidipd +"'/>"
            	+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"
				+ response.listEhatOTBillDetailForIpd[i].categoryName
				+ "<input type='hidden' id='prName"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].categoryName  +"' />"
				+ "<input type='hidden' id='childSubServiceId"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].childSubServiceId  +"' />"
				+ "<input type='hidden' id='billidph"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].otherbildetailidipd  +"' />"
				+ "<input type='hidden' id='chargph"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].amount  +"' />"
				+ "<input type='hidden' id='rateph"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].rate  +"' />"
				+ "<input type='hidden' id='qtyph"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].qty  +"' />"
				+ "<input type='hidden' id='bidipd"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].bill_details_id  +"' />"
				+ "<input type='hidden' id='bathid"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].batchid  +"' />"
				+ "<input type='hidden' id='textBatch"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].batchCode  +"' />"
				+ "<input type='hidden' id='txtExpiry"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].batchExp  +"' />"
				+ "<input type='hidden' id='mrnslaveId"+ index +"' value='"+ response.listEhatOTBillDetailForIpd[i].mrnSlaveId  +"' />"
            	+ "</td>"
				+ "<td class='col-sm-1-1 center'  style='height: 21.5px;'>"
				+  datetime
				+ "</td>"
				+ "<td class='col-sm-1-1 center'><input type='button' id='statusBtn"+ index +"'" 
				+ " style='width:60px; background-color: green;' disabled></input></td>"
				
				
		if(callform=="OTINV"){
			    
			htm = htm
			+ "<td class='col-sm-1-1 center'>"
			+ "<button value='EDIT' onclick='editpharmaOT("+index+",\"OTINV\")' class='btn btn-xs btn-success' >"
			+"<i class='fa fa-edit'></i></button></td>"	
			+"<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChargesMaster' onclick='deletepharma("
			+ response.listEhatOTBillDetailForIpd[i].otherbildetailidipd
			+ " ,\"OTINV\","+ response.listEhatOTBillDetailForIpd[i].bill_details_id +")' ><i class='fa fa-trash-o'></i></button></td></tr>";
			totalcharg = totalcharg + response.listEhatOTBillDetailForIpd[i].amount ;
			$("#totalchargesinv").val(totalcharg);
		}else if(callform=="OTCATH"){
			    
			htm = htm
			+ "<td class='col-sm-1-1 center'>"
			+ "<button value='EDIT' onclick='editpharmaOT("+index+",\"OTCATH\")' class='btn btn-xs btn-success' >"
			+"<i class='fa fa-edit'></i></button></td>"	
			+"<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChargesMaster' onclick='deletepharma("
			+ response.listEhatOTBillDetailForIpd[i].otherbildetailidipd
			+ " ,\"OTCATH\","+ response.listEhatOTBillDetailForIpd[i].bill_details_id +")' ><i class='fa fa-trash-o'></i></button></td></tr>";
			totalcharg = totalcharg + response.listEhatOTBillDetailForIpd[i].amount ;
			$("#totalchargescath").val(totalcharg);
		} else{
	   
			htm = htm  
			+ "<td class='col-sm-1-1 center'>"
			+ "<button value='EDIT' onclick='editpharmaOT("+index+",\"OTDRUG\")' class='btn btn-xs btn-success' >"
			+"<i class='fa fa-edit'></i></button></td>"	
			+"<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteChargesMaster' onclick='deletepharma("
			+ response.listEhatOTBillDetailForIpd[i].otherbildetailidipd
			+ " ,\"OTDRUG\","+ response.listEhatOTBillDetailForIpd[i].bill_details_id  +")' ><i class='fa fa-trash-o'></i></button></td></tr>";
		
			totalcharg = totalcharg + response.listEhatOTBillDetailForIpd[i].amount ;
			$("#totalchargesph").val(totalcharg);
		}
		
		index++;

	}

         if(callform=="OTINV"){
        	 $("#tcpoeservicesOI").html(htm ); 
        	 $("#tcpoeservicesOD").html(""); 
        	 $("#tOTcharge").html(""); 
        	 $("#tbOTCAH").html(""); 
        	 
         }else if(callform=="OTCATH"){
        	 $("#tbOTCAH").html(htm); 
        	 $("#tcpoeservicesOI").html(""); 
        	 $("#tcpoeservicesOD").html(""); 
        	 $("#tOTcharge").html(""); 
         }else{
        	 $("#tcpoeservicesOD").html(htm); 
        	 $("#tcpoeservicesOI").html(""); 
        	 $("#tOTcharge").html(""); 
        	 $("#tbOTCAH").html(""); 
         }
		
		
	


	

/*
	var htm = "";
	var index = $("#rightDiv tr").length;
	for ( var i = 0; i < response.lstService.length; i++) {
		
		var categoryName = response.lstService[i].categoryName;
		var charges = response.lstService[i].categorycharges;
		var serviceId=response.lstService[i].serviceid;
		
		htm = htm
				
				+ "<tr  id='tr"+(index + 1)+"' class='trs'><td class='col-sm-5-1 center' id='chName"
				+ (index + 1)
				+ "' style='height: 21.5px;'>"
				+ categoryName
				+ "</td><td class='col-sm-5-1 center' id='charges" + (index + 1)+"' style='height: 21.5px;' >"
				+"<input type='text' class='left_Charges' id='inCharges" + (index + 1)+"' name='charges" + (index + 1)+"' onkeyup='totalAmount()' value='"+ charges +"'"
				
			
				+ "</td>" 
				
				
				+  "<input type='hidden' class='subserviceId"+ (index + 1) + "' id='subbId"+ (index + 1) + "' value='"+ serviceId + "'>"
				+ "<input type='hidden'  class='lotherbill"+ (index + 1) + "'  value='0' id='otherbill"+ (index + 1)+"'/>"
				+"<input type='hidden'  class='otherflag"+ (index + 1) + "'  value='P' id='otherflag"+ (index + 1)+"'/>"

				+ "<td id='copyTd"+(index + 1)+"'>" 
				+"</td>"
				
				+ "<td id='lastTd"+(index + 1)+"'><input type='button' value='>>' id='inputCnt"+ (index + 1) + "' onclick='addTRtoRight("+(index + 1)+")'>" 
				
				+"</td>"
				+ "</tr>" ;
			
		index++;
	}

	$("#leftDiv").html(htm);*/

}
/**@author   :Paras suryawanshi
 * @Date     :7-Aug-2017
 * @code     :edit pharma details**/
function editpharmaOT(value,callform){
	
	var prname=$("#prName"+ value +"").val();
	var ipdbillid=$("#billidph"+ value +"").val();
	//alert(ipdbillid);
	var chargph=$("#chargph"+ value +"").val();
	var rateph=$("#rateph"+ value +"").val();
	var qtyph=$("#qtyph"+ value +"").val();
	var childSubServiceId=$("#childSubServiceId"+ value +"").val();
	var emrP=$("#emrPerOtChr"+ value +"").val();
	var bathid = $("#bathid"+ value +"").val();
	var textBatch = $("#textBatch"+ value +"").val();
	var txtExpiry = $("#txtExpiry"+ value +"").val();
	var mrnslaveId = $("#mrnslaveId"+value).val();
	if(callform=="OTINV"){
		$("#billdinv").val(ipdbillid);
		$("#txtautoserviceOI").val(prname);
		$("#InvQty").val(qtyph);
		$("#InvRate").val(rateph);
		$("#InvAmt").val(chargph);
		$("#serIDinv").val(childSubServiceId);
		$("#InvAQty").val(childSubServiceId);
		$("#queryTypeOI").val('update');
		$("#batchId").val(bathid);
		$("#mrnslaveId").val(mrnslaveId);
	}if(callform=="OTCATH"){
		$("#billidcath").val(ipdbillid);
		$("#txtCath").val(prname);
		$("#cathQty").val(qtyph);
		$("#cathRate").val(rateph);
		$("#cathAmt").val(chargph);
		$("#queryTypeOTC").val(childSubServiceId);
	}else if (callform=="OC"){
	    $("#billidserviceOS").val(ipdbillid);
		$("#txtOserv").val(prname);
		$("#txtOservamt").val(chargph);
		$("#subserviceidOS").val(childSubServiceId);
		$("#serviceidOS").val($("#servidOS"+ value +"").val());
		$("#doctorNameOT").select2('val',$("#drOS"+ value +"").val());
		fetchSuperCatForOtCharges(childSubServiceId);
		if(isNaN(emrP))
		{
			emrP=0;
		}

		$('#emrPer').val(emrP); 
		if (emrP > 0 || emrP == 0 ) 
			{
				$("#emrChrFlag").prop("checked", true);
				$('#emrPer').css("display","inline");
			}
      }
  else{
		
		
		$("#billidPharma").val(ipdbillid);
		$("#txtautoservicePharma").val(prname);
		$("#pharmaQty").val(qtyph);
		$("#pharmaRate").val(rateph);
		$("#pharmaAmt").val(chargph);
		$("#serIDPharma").val(childSubServiceId);
		$("#bathid").val(bathid);
		$("#txtExpiry").val(txtExpiry);
		$("#textBatch").val(textBatch);
		$("#queryTypeOD").val('update');	
	}
	
	
}
function deletepharma(values,callform , bill_details_id){
	var patienttId   =  $("#pt_Id").val();
	var treatmentId  =  $("#tr_Id").val(); 
	var storeId  =  $("#storeId").val(); 
	var treatmentoperationid = $("#treatmentoperationid").val();
	var labservicelist ='';
	//var cnt =-1;
	if (values=='multiple'){
		
		$.each($('#chkunserv:checked'), function() {
		//	labservicelist.push(parseInt($(this).val()));
			labservicelist=labservicelist+","+$(this).val();
		});
		
		 if(labservicelist.length==0){
			 

			   
			   alert("Please check  at least Service to delete");	   
			   return false;
			   
		   }
	}else{
		labservicelist=labservicelist+","+ values;
	}
 //	labservicelist = JSON.stringify(labservicelist);
	var tk = labservicelist.slice(1);
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/ot/deleteOTservice",
		data	: {
			
		  "labservicelist" : tk,
			"callform":callform,
			"patienttId":patienttId,
			"treatmentId":treatmentId,
			"treatmentoperationid":treatmentoperationid,
			"bill_details_id": bill_details_id,
			"storeId": storeId
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			if(callform=="OTDRUG"){
				var masterId = $("#lisHcd0").val();// chargesId
				var serviceLastId = 0;// static chargesSlaveId
				var liSizeCom = $("#dynamicItemdrug li").length;
				serviceLastId = $("#lisHcd" + (liSizeCom - 1)).val();
				var otab="ONTAB";
				
				fetchdetailsOT(0, 0 ,callform,otab );
				//	fetchbilldetails();   //for OPD 
				
				
			}else if(callform=="OTINV"){
				var masterId = $("#lisHci0").val();// chargesId
				var serviceLastId = 0;// static chargesSlaveId
				var liSizeCom = $("#dynamicItemINV li").length;
				serviceLastId = $("#lisHci" + (liSizeCom - 1)).val();
				var otab="ONTAB";
				fetchdetailsOT(0, 0 ,callform,otab );
				$("#queryTypeOI").val('insert');
				 //for ipd
				
			}else if(callform=="OTCATH"){
				var masterId = $("#lisHcat0").val();// chargesId
				var serviceLastId = 0;// static chargesSlaveId
				var liSizeCom = $("#dynamicItemcath li").length;
				serviceLastId = $("#lisHcat" + (liSizeCom - 1)).val();
				var otab="ONTAB";
				fetchdetailsOT(0, 0 ,callform,otab );
				 //for ipd
				
			}else if(callform=="CPOE"){
				var masterId = $("#lisHcpe0").val();// chargesId
				var serviceLastId = 0;// static chargesSlaveId
				var liSizeCom = $("#dynamicItemcpoe li").length;
				serviceLastId = $("#lisHcpe" + (liSizeCom - 1)).val();
				var otab="ONTAB";
				fetchdetailsOT(0, 0 ,callform,otab );
				 //for ipd
				
			}
			
			alertify.success(response);
		//	window.location.reload(true);
		}
		
	});
	

	
	
}


function Freez(module,submodule){
	var masterId=0;
	var serviceLastId=0;
	var divid="";
	var button = "";
	if(submodule=="OTDRUG"){
		var liSizeCom = $("#dynamicItemdrug li").length;
		 masterId = $("#lisHcd0").val();// chargesId
		  serviceLastId = $("#lisHcd" + (liSizeCom - 1)).val();
		  
		  button   = document.getElementById('bOTD');
		  
		  divid="dynamicItemdrug";
	}else if (submodule=="OTINV"){
		var liSizeCom = $("#dynamicItemINV li").length;
		 masterId = $("#lisHci0").val();// chargesId
		  serviceLastId = $("#lisHci" + (liSizeCom - 1)).val();
		  
		  
		  button   = document.getElementById('bOTI');
		  
		  divid="dynamicItemINV";
	}else if (submodule=="CPOE"){
		var liSizeCom = $("#dynamicItemcpoe li").length;
		 masterId = $("#lisHcpe0").val();// chargesId
		  serviceLastId = $("#lisHcpe" + (liSizeCom - 1)).val();
		  divid="dynamicItemcpoe";
	}else{
		var liSizeCom = $("#dynamicItemcom2 li").length;
		 masterId = $("#lisHc20").val();// chargesId
		  serviceLastId = $("#lisHc2" + (liSizeCom - 1)).val();
		  divid="dynamicItemcom2";
		
	}
	var free_id1 = $('#free_id').val();
	var serviceDetails = {
			listFreezdetails : []
        };
	
	serviceDetails.listFreezdetails.push({
        serviceId:masterId,
        subserviceId : serviceLastId,
        modulenName : module,
        submoduleName : submodule,
        free_id : free_id1
        
	 });
	
	 
	 if (button.innerText === 'Freeze') {
		 freezeUnFreezeURL = "ehat/ot/Freez";
     } else {
    	 freezeUnFreezeURL = "ehat/ot/Unfreez";
     }
	 
	 serviceDetails = JSON.stringify(serviceDetails);
	
	 
	var inputs = [];
	inputs.push('serviceDetails=' + serviceDetails);
//	inputs.push('submodule=' + submodule);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data :  str +"&reqType=AJAX",
		url : freezeUnFreezeURL,
		success : function(r) {
			
			if(r>0){

				 if (button.innerText === 'Freeze') {
					 alert("Freeze Successfully");
			     } else {
			    	 alert("UnFreeze Successfully");
			    	 
			    	 if (button.innerText === 'Unfreeze') {
				            button.innerText = 'Freeze';
				     
				         if(submodule=="OTDRUG")
				        {
				        	 const ul = document.getElementById('dynamicItemdrug');
					         //Remove all list elements
					         ul.innerHTML = '';
					         $('#listmstr_select_otdrugs').attr('readonly', false);   
				        }
				        else if(submodule=="OTINV")
				        {
				        	 const ul = document.getElementById('dynamicItemINV');
					         //Remove all list elements
					          ul.innerHTML = '';
				        	 $('#listmstr_select_otinv').attr('readonly', false);
				        	
				        }
				        
				         
				         
				     	fetchAllServicecomot("ONLOAD","");
				     	$('#free_id').val("0");

				        }
			     }
				 
					
				
				
			}
			
			
			fetchfreez(module , submodule,divid);
		
		}	
		
	});
	
	

	
	
}

function fetchfreez(module , submodule , divid){
	
	
		var inputs = [];
		inputs.push('module=' + module);
		inputs.push('submodule=' + submodule);
//		inputs.push('submodule=' + submodule);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data :  str +"&reqType=AJAX",
			url : "ehat/ot/fetchfreez",
		
			success : function(r) {
				var serviceId =0;
				var servicename ="";
				$('#free_id').val("0");
				if (  r.listFreezdetails.length > 0) {
					
					serviceId = r.listFreezdetails[0].service_id;
					servicename= r.listFreezdetails[0].service_name;
					$('#free_id').val(r.listFreezdetails[0].free_id)
					//alert( servicename);
				//	setfreezdetail(serviceId, divid);
					setDyanamicDivList(serviceId , servicename , divid);
				}
			
			}
				
			});
}


/*function setfreezdetail(serviceId, divid) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForList(divid,response);
		}
	});
}*/

function setDyanamicDivList(serviceId , servicename , divid) {
	//alert(servicename);
	var button ="";
	var htm ="";
	var name =[];
	var id=[];
	name = servicename.split(",");
	id= serviceId.split(",");
	if(name !=null && id !=null || name !="" && id !=""  ){
	for ( var i = 0; i < name.length && i < id.length  ; i++) {
		var count =i;
	
/*		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name[i]
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1"  href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id[i] + '">';
		 	+'</li>';*/
		
		 htm = htm +'<li class="select2-search-choice" id="liItmesHc'
			+ count
			+ '">'
			+ '<div>'
			+ name[i]
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1"  href="#"></a>'
			
		if(divid=="dynamicItemdrug"){	
			 button = document.getElementById('bOTD');

	        if (button.innerText === 'Freeze') {
	            button.innerText = 'Unfreeze';
	        }
			
			htm = htm	
			       + '<input id="lisHcd' + (count) + '" type="hidden" value="' + id[i]
			       + '">';
		  } else if(divid=="dynamicItemcom2"){
			    htm = htm
				+ '<input id="lisHc2' + (count) + '" type="hidden" value="' + id[i]
				+ '">';
			 
		  } else if(divid=="dynamicItemcpoe"){
			  htm = htm
				+ '<input id="lisHcpe' + (count) + '" type="hidden" value="' + id[i]
				+ '">';
			 
		  }else {
			 
			  button = document.getElementById('bOTI');
			  if (button.innerText === 'Freeze') {
		            button.innerText = 'Unfreeze';
		        }
			  
			  htm = htm	
			    + '<input id="lisHci' + (count) + '" type="hidden" value="' + id[i]
				+ '">';  
		  }
	
	+'</li>';
	
	
	}
	$('#' + divid).html(htm);
	if(divid=="dynamicItemcom2"){
		
		$('#listmstr_select_otcharges2').attr('readonly', true);	
		$('#bOTC').attr('disabled', true);
	}else if(divid=="dynamicItemdrug"){
		$('#listmstr_select_otdrugs').attr('readonly', true);
	//	$('#bOTD').attr('disabled', true);
	}else if(divid=="dynamicItemcpoe"){
		$('#listmstr_select_otcpoe').attr('readonly', true);
		$('#bOTCOE').attr('disabled', true);
	}else {
		
	$('#listmstr_select_otinv').attr('readonly', true);
	// $('#bOTI').attr('disabled', true);
	}
	if(divid=="dynamicItemcom2"){
		fetchconfigdataonclick();
		
	}
	
	}
//	setLastLiCom(id,name);
}

/**
 * @author bilal
 * @date 31-JUN-2017
 * @code for setting Last li of package**/
function setLastLiCom(id, name) {
	var len = $('#dynamicItemcom li').length;
	var html='<li id="liItme'+(len)+'" class="select2-search-choice">'
			+'<div>'+(name)+'</div>'	
			+'<a class="select2-search-choice-close" href="#" onclick="removeInpuntFildcom('+(len)+','+(id)+',\'dynamicItemcom\')" tabindex="-1"></a>'
			+'<input id="li'+(len)+'" type="hidden" value="'+(id)+'">'
			+'</li>';

	$('#dynamicItemcom').append(html);
	
	
	
}

/**
 * @author paras
 * @date 31-sep-2017
 * @code ffetchotprocedure**/
function fetchotprocedure(callform){
	var patienttId   = 0; 
	var treatmentId  = 0; 
	if(callform=="OT"){
		treatmentId  =	$("#tr_Id").val(); 
		patienttId   =  $("#pt_Id").val();
	}else{
		treatmentId  =  $('#trid').val();
		 patienttId   = $('#mrnNo').val();
		
	}
	
	if(patienttId =="" || patienttId==undefined || patienttId==null){
		patienttId =0;
	}
	if(treatmentId =="" || treatmentId==undefined || treatmentId==null){
		treatmentId =0;
	}
	var inputs = [];
	inputs.push('patienttId=' + parseInt(patienttId));
	inputs.push('treatmentId=' + parseInt(treatmentId));
//	inputs.push('submodule=' + submodule);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data :  str +"&reqType=AJAX",
		url : "ehat/ot/fetchotprocedure",
	
		success : function(r) {
			if(r!=null || r=="" ){
				if (callform=="OT"){
					$("#otproc").text(r);
					//var a =$("#otproc").text();
					//alert(a);
					
				}else{
					$("#otshchedule").text(r);
					//var a =$("#otshchedule").text();
					//alert(a);	
				}
				
			}
			
		}
			
		});
	
}

function checkDublicateproc(value ,callform){

	var oldvalue="";
	if(value!=0 || value!="" || value!=null || value!=undefined){
	if(callform=="OT"){
		oldvalue  =$("#otproc").text();
	}else{
		oldvalue =$("#otshchedule").text();
	var	treatmentId  =  $('#trid').val();
	var	 patienttId   = $('#mrnNo').val();
	if(parseInt(treatmentId)==0 || treatmentId=="" ||treatmentId==null || parseInt(patienttId)==0  || patienttId==null || patienttId==""){
		
		alert("Please Select Patient!!");
		return false;
	}
	
	}
	if(callform!="OT"){
	if(oldvalue!=null || oldvalue!="" || oldvalue=="@" || oldvalue != '0'){
		if(oldvalue!=""){
			var chkval = [];
			chkval = oldvalue.split("@");
			var chkval2 = [];
			chkval2 =chkval[1].split(",");
			/*var chkval3 = [];
			chkval3 =chkval2[1].split(",");*/
		//	alert(chkval3);
			for ( var i = 0; i < chkval2.length ; i++) {
				var chkval4 = parseInt(chkval2[i]);
			//	alert(chkval4);
				/*if(parseInt(value)==chkval4){
					alert("This Operation Alredy allocated to this Patient Please take New operation!!");
					return false;
				}*/
			}
		}
	
	}
	}
	}
}

function addAllTRtoRight() {

	//var index = $("#rightDiv tr").length;
	$("#leftDiv tr").each(function() {
		var tk=$(this).attr('id').toString();
		var id = tk.slice(2);
		addTRtoRight(id);
	});
	
	 totalAmount();
}

function calculateTotalCpoe(){
	var rate=$("#OtRate").val();
    var quantity=$("#OtQty").val();

    $("#OtAmt").val( (rate * quantity));
	
}



//Touheed 
//for cath lab billing  copy from pharmacy

function setValuesToAutocompleteCath(key) {
	if (key != null) {
		var keycode = (key.which) ? key.which : key.keyCode;
		if (keycode == 9) {
			$('#txtQty').focus();
			return false;
		}
	}

	var findingName = $("#txtCath").val();
	var inputs = [];
	
		var vmi=0;
		inputs
		.push('vmi='+ vmi);
	
	inputs.push('letter=' + findingName);
	var str = inputs.join('&');


	            jQuery.ajax({
		        async : true,
		        type : "GET",
		        data : str + "&reqType=AJAX",
				url : "./pharmacy/product/autoSuggestionProductForPurchase",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function(error) {
					/* alert('error' + error); */
				},
				success : function(r) {
					var availableTags = [];
					var resultData = [];

					for ( var i = 0; i < r.length; i++) {
						
						availableTags[i] = r[i].productName + '_'
								+ r[i].productId + '$$' + r[i].productUnit
								+ '$$' + r[i].packingMaster.packType + '$$'
								+ r[i].companyMaster.compName + '$$'
								+ r[i].shelfMaster.shelfName + '$$'
								+ r[i].productShortName + '$$' 
								+ r[i].productMarginRate+'$$'
								+r[i].rateEqualsMrp
								+'$$'
								+r[i].hsn
								+'$$'
								+r[i].igst
								+'$$'
								+r[i].cess
								;

					}

					var template = "";
					for ( var j = 0; j < availableTags.length; j++) {
						var arrValue = (availableTags[j]).split("_");
						var idValue = (arrValue[1]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});

						template = template + '<li data-value="'
								+ (arrValue[1]) + '" class=""><a href="#">'
								+ arrValue[0] + '</a></li>';

					}
					$("#productDiv .typeahead").html(template);
					$("#productDiv .typeahead").show();

					setTimeout(function() {
						$('#txtCath').typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResultot1,
							scrollBar : true,
						});
						$("#txtCath").data('typeahead').source = resultData;
					}, 500);
				}
			});
}


function displayResultot1(item) {
	
	var content = item.value.split("$$");
	$('#setIDPharma').val(content[0]);
	/* $('#txtUnit').val(content[1]);
	$('#txtComp').val(content[2]);
	$('#txtPack').val(content[3]);
	$('#txtAvailQty').val(content[4]);
	$('#txtVat').val(content[5]);
	$('#hiddenRate').val(content[6]);
	$('#hiddenRateEqualsMrp').val(content[7]);
	$('#txtHsn').val(content[8]);
	$('#txtIgst').val(content[9]);
	$('#txtCess').val(content[10]);
	calculateVatAmount();
	getLastVendorName(content[0]); */
	getPurchaseByBatchCath(content[0]);
	
}

function getPurchaseByBatchCath(productId) {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : {
			productId : productId
		},
		url : "./pharmacy/purchase/getBatchDetails",
		timeout : 1000 * 60 * 15,

		error : function(error) {
			alert('error' + error);
		},
		success : function(result) {
			console.log(result);
			var jsObj =$.parseJSON(result);
			var total
			if (jsObj.result.length > 0) {
				
				$("#pharmaRatecath").val(jsObj.result[0].mrp);
				
			} else {
				$("#batchData").html("No Record Found");
			}
		}
	});
}


function pharmareflect(){
	//var pid=$('#pt_Id').val();
	//var trid=$('#tr_Id').val();
	//Changed By Akshata
	var pid=$('#pid').val();
	var trid=$('#treatId').val();
	var product = $('#setIDPharma').val();
	var inputs = [];
	inputs.push('pid=' + pid);
	inputs.push('trid=' + trid);
	inputs.push('masterId=' + masterId11);
	inputs.push('serviceLastId=' + serviceLastId11);
	//inputs.push('product=' + prodArr);
	inputs.push('product=' + product);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data :  str +"&reqType=AJAX",
		url : "ehat/ot/pharmareflect",
	
		success : function(r) {
			alert(r);
		}	
	});
}

/************
 *@author	: paras suryawanshi
 *@date		:  23-Dec-2016
 *@code		:fetchPTPG
 ***********/
function fetchPTPG() {

	
    var opId = $("#selOTName").val();

	var inputs = [];
	
	inputs.push('opId=' + opId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/fetchPTPG",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
           var list="";
           var list2="";
			if(ajaxResponse.listFetchprocedure.length > 0 ){
				list = list + "<option value='"+r.listFetchprocedure[0].idoperation_groups+"'>" + (r.listFetchprocedure[0].group_name) + "</option>";    
				list2=list2 + "<option value='"+r.listFetchprocedure[0].idoperation_type_tbl+"'>" + (r.listFetchprocedure[0].name) + "</option>";
				$("#selOTtype").html(list2);
				$("#department").html(list);
				$("#opgrade").val(r.listFetchprocedure[0].opgrade);
			}

		}
	});
}
function surgancharge(id){
	var srvid=$("#"+ id).val();
	if(srvid==4){
		alert(srvid);
		$('#DisplayOTModal').modal('show');		
	}
}

function surgancharge(id){
	var TRTiD=$("#TRTiD").val();
	var srvid=$("#"+ id).val();
	/*alert(srvid);*/
	if(srvid==4){
		getAllUnitOT();
		//alert(srvid);
		getPhysicalDisFlag(TRTiD);
		if(physicalDisFlag == "N"){
		$('#DisplayOTModal').modal('show');
		fetchAllServicecomot("ONLOAD","");
		getOperationName();
	//	viewOPerationPatient("OTSchedule");
		fetchprocedureCatsedrvOT();
		fetchOperationTeamList('OTScheduler');
		fetchPTNameForOtSchedule();
		fetchOperationTheaterNames();
		fetchDepartmentForOTSchedule();
		$('#txtStartTime').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});
		$('#txtEndTime').datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});
		var finalDate =$("#finalDate").val();
		$("#popup_container2").val(finalDate);
	//	topid();
		$("#treatmentoperationid").val(0);
		
		synchronizeToken();
	//	viewOPerationPatient("operation");
	//	setOperationDetails();
	
		 var unitId=$("#unitId").val();	
		// alert(unitId);
			setTimeout(function(){ $("#unlId").val(unitId);},1);
					
		}else{
			
			alert("Opeartion Can't be Schedule For Physical Discharge Patient");
		}
	}
	if(srvid==21){
		
		$('#sendToRisSponsor').attr('checked',false);		
	}else{
		
		$('#sendToRisSponsor').prop('checked', true);
	}
	if(srvid==5){
		document.getElementById("qty").readOnly = true; 
		document.getElementById("qtyIpdSponsor").readOnly = true; 
	}else{
		document.getElementById("qty").readOnly = false; 
		document.getElementById("qtyIpdSponsor").readOnly = false; 
	}
	
	
}
/*******************************************************************************
 * @Vikas Godse
 * @date 6_April_2018 this method is Getting Physical Discharge Flag
 ******************************************************************************/
function getPhysicalDisFlag(TRTiD){
	jQuery.ajax({
		async : false,
		type : "POST",
		data :{
			"trid":TRTiD
		},
		url : "ehat/physicalDischarge/getPhyDisFlag",
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r == "Y")
			{ 
				physicalDisFlag = "Y";
				
			}else if(r == "N")
			{
				physicalDisFlag = "N";
			}
		}
	});
}
function synchronizeToken() {
	var inputs = [];
	inputs.push('action=GenerateSyncToken');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "UtilityServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#synchronizeToken").val(ajaxResponse);
		}
	});
}
function SaveOperationDetailsBiilipd() {
	if ($("#popup_container2").val() == "") {
		alert("Please Select Operation Date.");
		return false;
	} else if ($("#txtStartTime").val() == "") {
		alert("Please Select Operation Start Time.");
		return false;
	} else if ($("#txtEndTime").val() == "") {
		alert("Please Select Operation End Time.");
		return false;
	}

	var treatmentoperation = {
		toli : []
	};

	var myObj = $("#divPatId").html();
	var trid = 0;

	if(myObj==null || myObj=="" || myObj==undefined ){
		trid=$("#tr_Id").val();
	}else{
		myObj = JSON.parse(myObj);
		trid = myObj.trid;

	}
	
	
	var scheduledProcedure = "0";
	var y = document.getElementById("scheduledProcedure");
	for ( var j = 0; j < y.options.length; j++) {
		scheduledProcedure = scheduledProcedure + "#" + y.options[j].value
				+ "@" + y.options[j].text;
	}

	var infectionFlag;
	if ($('#infectFlag').is(":checked")) {
		infectionFlag = 'Y';
	} else {
		infectionFlag = 'N';
	}
	var criticalFlag;
	if ($('#criticalFlag').is(":checked")) {
		criticalFlag = 'Y';
	} else {
		criticalFlag = 'N';
	}

	var x = 1;
	var z = 0;
	var OperationCharge;
	if ($('#opCharge' + x).is(":checked")) {
		OperationCharge = '1';
	} else {
		OperationCharge = '0';
	}

	var operationId = $("#txtCathNo" + x).val();
	
	if (operationId == "") {
		operationId = 0;
	}
	var route = $("#txtRoute" + x).val();
	var surInstrument = $("#surInstrument" + x).val();
	if (surInstrument == "") {
		surInstrument = 0;
	}
	var ohr = $("#ohr" + x).val();
	var chr = $("#chr" + x).val();
	var obp = $("#obp" + x).val();
	var cbp = $("#cbp" + x).val();

	var otName = $("#otName").val();
	// var date = $("#popup_container2").val();
	// var txtStartTime = $("#txtStartTime").val();
	// var txtEndTime = $("#txtEndTime").val();

	var teamId = $("#teanNameList").val();
	var anesthesiaType = $("#anesthesiaType").val();

	var operationNote = $("#txtFindings" + x).val();
	var aneNote = $("#txtComment" + x).val();
	var anechargetype = $("#txtchargetype" + x).val();

	// for services
	var department = $("#department").val();
	if(department==0){
		 department = $("#departmentOT").val();
		}
	var opgrade = $("#opgrade").val();
	var operationName = $("#selOTName" + x).val();

	var eleArrBedSide = "";
	$('#txtEquipmetb' + x).find('option').each(function() {
		eleArrBedSide = eleArrBedSide + $(this).val();
	});
	var eleArrGas = "";
	$('#txtEquipmetg' + x).find('option').each(function() {
		eleArrGas = eleArrGas + $(this).val();
	});

	var eleArrInstrument = "";
	$('#txtEquipmeti' + x).find('option').each(function() {
		eleArrInstrument = eleArrInstrument + $(this).val();
	});

	var eleArrPre = "";
	$('#txtEquipmetc' + x).find('option').each(function() {
		eleArrPre = eleArrPre + $(this).val();
	});
	// alert(eleArrPre);
	if (eleArrPre != "") {
		alert("Please post surgery consumable first");
		$('#txtEquipmetc' + x).focus();
		return false;
	}
	// end services
	treatmentoperation.toli.push({
		"schPro" : scheduledProcedure,
		"infFlg" : infectionFlag,
		"ctrFlg" : criticalFlag,
		"operationCharge" : OperationCharge,
		"tomid" : operationId,
		"rt" : route,
		"surinstr" : surInstrument,
		"oh" : ohr,
		"ch" : chr,
		"ob" : obp,
		"cb" : cbp,
		"otid" : otName,
		"teamId" : teamId,
		"anesType" : anesthesiaType,
		"liOpDoc" : [],
		"fnd" : operationNote,
		"cm" : aneNote,
		"act" : anechargetype,
		"eu" : eleArrPre,
		"bedside" : eleArrBedSide,
		"gas" : eleArrGas,
		"instrument" : eleArrInstrument,
		"dpt"        : department

	});

	var teamList = document.getElementById("teamMembersList");
	var teamMemberCount = $("#teamMemberCount").val();
	var count = 0;
	for ( var i = 1; i <= teamMemberCount; i++) {
		// alert(x.options[i].value);
		var docId = $("#idUser" + i).val();// alert(docId);
		var docNameT = $("#docNameT" + i).text();
		var usertype = $("#userType" + i).text();
		var surgeontype = $("#docTypeT" + i).text();
		if (surgeontype == "anesthetist" || surgeontype == "anaesthesiologist1"
				|| surgeontype == "anaesthesiologist2"
				|| surgeontype == "anaesthesiologist3") {
			count++;
		}
		if (docId != null && docId != "" && docId != undefined) {
			treatmentoperation.toli[0].liOpDoc.push({
				"idopDoc" : docId,
				"docName" : docNameT,
				"doctp" : usertype,
				"surgtp" : surgeontype
			});
		}
	}

	if (scheduledProcedure == "0") {
		alert("Please select Procedure to Schedule");
		return false;
	} else if (teamMemberCount == 0) {
		alert("Please Select Doctor Team.");
		return false;
	} else if (count == 0) {
		alert("Please add atleast one Anesthetist in Scheduled Doctors Team");
		return false;
	} /*
		 * else if(count > 1){ alert("Please add only one Anesthetist in
		 * Scheduled Doctors Team"); return false; }
		 */

	// x++;
	var inputs = [];
	var bedstate ="sameBed";
	//var bedstate = $("input[name='BedShift']:checked").val();
	var bedEditType = "sameBed";
	var hallType = 0;
	var hallID = 0;
	var bedNo = 0;
	var billableWardType = 0;
	var billableHallType = 0;
	var radBillableBed = "sameBed";
	var isolationFlag = 0;

	// alert(bedstate);
	if (bedstate == "sameBed") {
		bedEditType = "noChange";
		hallType = 0;
		hallID = 0;
		bedNo = 0;
		billableWardType = 0;
		billableHallType = 0;
		isolationFlag = 0;
		radBillableBed = "sameBed";
	} else {

		bedEditType = $('input[name=bedEditType]:checked').val();

		if (bedEditType == "" || bedEditType == null
				|| bedEditType == undefined) {
			alert("Please select Bed Edit Type.");
			return false;
		}

		hallType = $("#wardType").val();
		if (hallType == 0 || hallType == null || hallType == ""
				|| hallType == undefined) {
			alert("Please select Ward Name");
			return false;
		}

		hallID = $("#hallType").val();
		if (hallID == 0 || hallID == null || hallID == ""
				|| hallID == undefined) {
			alert("Please select Hall Name.");
			return false;
		}

		bedNo = $("#bedName").val();
		if (bedNo == 0 || bedNo == null || bedNo == "" || bedNo == undefined) {
			alert("Please select Bed No.");
			return false;
		}

		if ($("#radBillableBed3").prop("checked")) {
			var billableWardType = $("#billableWardType").val();
			var billableHallType = $("#billableHallType").val();
			radBillableBed = $("input[name='radBillableBed']:checked").val();
			if (billableWardType == 0) {
				alert("Please select Billable Ward Name.");
				return false;
			}
			if (billableHallType == 0) {
				alert("Please select Billable Hall Name.");
				return false;
			}
		} else {
			billableWardType = 0;
			billableHallType = 0;
			radBillableBed = "sameBed";
		}

		var isolation = $("input[name='isolation']:checked").val();
		if (isolation == "isolation") {
			isolationFlag = 1;
		} else {
			isolationFlag = 0;
		}
	}
	if(opgrade=="" || opgrade==null || opgrade==undefined){
		opgrade=0;
	}
	var countshedule = 0;//added by paras
	var inserv = $("#inserv").val();//added by paras
	
	var remark = $("#remark").val();
	var precaution = $("#precaution").val();
	var indicationForSurgery = $("#indicationForSurgery").val();
	var surgeryDescription = $("#surgeryDescription").val();
	  var txtchargetype1=$("#txtchargetype1").val();
	  var anetheiaid="";
	    if(txtchargetype1=="ASAIV"){
	    	anetheiaid=$("#AnethesiaAIV").val();
	    }else if(txtchargetype1=="Normal"){
	    	anetheiaid=$("#Anethesia").val();
	    }else {
	    	anetheiaid=$("#AnethesiaSATNDBY").val();
	    }

	treatmentoperation = JSON.stringify(treatmentoperation);
	inputs.push('action=SaveOperationDetails');
	inputs.push('treatmentoperation=' + encodeURIComponent(treatmentoperation));
	inputs.push('treatmentoperationid=' + 0);
	inputs.push('Tid=' + trid);
	inputs.push('date=' + $("#popup_container2").val());
	inputs.push('startTime=' + $("#txtStartTime").val());
	inputs.push('endTime=' + $("#txtEndTime").val());
	inputs.push('criticalFlag=' + criticalFlag);
	inputs.push('otName=' + $("#otName").val());
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('infectionFlag=' + infectionFlag);
	inputs.push('bedstate=' + bedstate);
	inputs.push('hallType=' + hallType);
	inputs.push('hallID=' + hallID);
	inputs.push('bedNo=' + bedNo);
	inputs.push('bedEditType=' + bedEditType);
	inputs.push('radBillableBed=' + radBillableBed);
	inputs.push('billableWardType=' + billableWardType);
	inputs.push('billableHallType=' + billableHallType);
	inputs.push('isolation=' + isolationFlag);
	inputs.push('remark=' + "-");
	inputs.push('precaution=' + "-");
	inputs.push('indicationForSurgery=' + "-");
	inputs.push('surgeryDescription=' + "-");
	inputs.push('opgrade=' + opgrade);
//alert(updateop);
	inputs.push('updateop=' + updateop);//added by paras
	inputs.push('deleteop=' + deleteop);//added by paras
	inputs.push('countshedule=' + countshedule);//added by paras
	inputs.push('inserv=' + inserv);//added by paras
	inputs.push('querytype=' + "Bill");
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			//window.location = "OperationDashboard.jsp";
			topid();
			setTimeout(function() {
				getchargesOfot($("#MainSurgan").val(),"M");
				getchargesOfot($("#AsistanSurgan").val(),"A");
				getchargesOfot(anetheiaid,"AN");
				getchargesOfot($("#PreAnethesia").val(),"PR");
				getchargesOfot($("#OTRent").val(),"OR");
				getchargesOfot($("#OTinstrument").val(),"OI");

				alert("Save Sucessfully");
				saveSurgoncharges(teamList,teamMemberCount,$("#treatmentoperationid").val());
				sucess="Y";
				viewOPerationPatient("operation");
				setOperationDetails();
				}, 200);
			
			
		}
	});
}
function topid(){

	
    var TrId =parseInt($("#treatmentId").text());
    var pId = parseInt($("#patientId").text());
    $("#pid").val(pId);
    $("#pt_Id").val(pId);
    var bill_Id =parseInt( $("#billNo").text());
    $("#bill_Id").val(bill_Id);
    
	var inputs = [];
	
	inputs.push('TrId=' + TrId);
	inputs.push('pId=' + pId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/topid",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
          // alert(r);
           var toid = [];
           toid = r.split("@");
           var tmid=toid[0];
           var date=toid[1];
           $("#topId").val(tmid);
           $("#operationDate").val(date);
		}
	});
}




function autoCompTableTK(response,id,value){
//	var qty		= id.slice(0,-1); //for dyamic col getting id
	var myArray =response;// $.parseJSON(response);// parsing response in JSON format 
	console.log(myArray);
	$.widget('custom.mcautocomplete', $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	    },
	    _renderMenu: function (ul, items) {
	        var self = this,
	            thead;
	        if (this.options.showHeader) {
	            table = $('<div class="ui-widget-header" style="width:100%"></div>');
	            $.each(this.options.columns, function (index, item) {
	                table.append('<span style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
	            });
	            table.append('<div style="clear: both;"></div>');
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	        var t = '',
	            result = '';
	        $.each(this.options.columns, function (index, column) {
	            t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + item[column.valueField ? column.valueField : index] + '</span>';
	        });
	        result = $('<li></li>')
	            .data('ui-autocomplete-item', item)
	            .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
	            .appendTo(ul);
	        $(ul).css("z-index", "10000000000");
	        return result;
	    }
	});


	// Sets up the multicolumn autocomplete widget.
	$("#"+ id).mcautocomplete({
	    // These next two options are what this plugin adds to the autocomplete widget.
	    showHeader: true,
	    columns: [{
	        name: 'Name',
	        width: '200px',
	        valueField: 'categoryName'
	    }, {
	        name: 'Charges',
	        width: '110px',
	        valueField: 'categorycharges'
	    }, {
	        name: 'Qty',
	        width: '188px',
	        valueField: 'stockqty'
	    }],

	    // Event handler for when a list item is selected.
	    select: function (event, ui) {
	    	console.log("tk");
	    	console.log(ui);
	        this.value = (ui.item ? ui.item.categoryName : '');
	       if( ui.item.categoryName !='No' && ui.item.categorycharges !='Record' && ui.item.stockqty !='Match'){
	    	  $('#results').text(ui.item ? 'Selected: ' + ui.item.categoryName + ', ' + ui.item.categorycharges + ', ' + ui.item.stockqty : 'Nothing selected, input was ' + this.value);
		       /* $('#'+qty+'2').val(ui.item.srvQty);//always quantity column on 2nd position
		        $('#'+qty+'3').val(ui.item.srvCharges);//always opdcharges column on 3rd position
		        $('#'+qty+'3act').val(ui.item.srvCharges);//actual basic charges 
		        $('#'+qty+'3actBasic').val(ui.item.srvCharges);//actual basic charges unchanged
		        $('#'+id+'srid').val(ui.item.srvId);//service id setting
		        $('#'+id+'srtname').val(ui.item.sevType);//service type name setting
		        $('#'+id+'type').val(ui.item.sevType);//service type name setting
		        createRow4Pkg('auto');//adding new row dynamically
		        //getSrvHalWsChrg(qty ,ui.item.srvId,ui.item.sevType, 'auto' );//fetching hall wise charges
		        sethallwiseVals(ui.item.hallFrSrv,ui.item.srvCharges,qty,'autoCompTable');//sending list inside mainlist
		        calSumofSrv('autoCompTable');*/
	    	   

				//	alert(value);
					if(value=='cpoe'){	
						$('#txtautoserviceName').val(ui.item.categoryName);
					//	$("#subservicesname").val(ui.item.categoryName);
						$("#subserviceid").val(ui.item.categoryid);
					///	$("#servicename").val(ui.item.serviceName);
						$("#serviceid" ).val(ui.item.serviceid);
						$("#chargesubservice" ).val(ui.item.categorycharges);
						$("#OtRate" ).val(ui.item.categorycharges);
						 $("#OtAmt").val(ui.item.categorycharges);
						if($("#uId").val()==0){
							$("#allunitid").val(ui.item.categoryid);
							}
							fetchSuperCat(ui.item.categoryid);
					
					}else if(value=='OTDRUG'){
						
						$("#pharmaRate" ).val(ui.item.categorycharges);
						$("#serIDPharma" ).val(ui.item.serviceid);
						$("#pharmaAmt" ).val(ui.item.categorycharges);
						
						
					}else if(value=='OC'){
	             
					}if(value=='OTINV'){
						
						$("#InvRate" ).val(ui.item.categorycharges);
						$("#serIDinv" ).val(ui.item.serviceid);
						$("#mrnslaveId" ).val(ui.item.batchid);
						$("#InvAQty" ).val(ui.item.stockqty);
						$("#InvAmt" ).val(ui.item.categorycharges);
					}
					$("#" + id).val(ui.item.categoryName);
					
	       }
	        
	        return false;
	    },

	    // The rest of the options are for configuring the ajax webservice call.
	    minLength: 1,
	    source: function (request, response) {
	    	var data = myArray;
	    	console.log(data);
	    	console.log(data.lstService.length);
	    	var result;
            if (!data || !data.lstService || data.lstService.length === 0  ) {
            	/*result = [{
                    label: 'No match found.'
                }];*/
            	result = [{
                     'categoryName'		: 'No',
                     'categorycharges'	: 'Record',
                     'stockqty'		: 'Match',
               
                 }];
            } else {
                result = data.lstService;//Response List for All Services
            }
            response(result);
         
          }
	});
}

/**
 * @author Paras R Suryawanshi
 * @Date 21-Nov-2017
 * @code For hallwise Operation charge OT
 * ***/
function hallwiseOPchargeOT(id,callform){

	/*var treatmentoperationid= $("#treatmentoperationid").val();
	 var y = document.getElementById("scheduledProcedure");
	 var count1=y.options.length;
	var unit =$("#unitid").val() ;
	var unitlist=""; 
	var depdocdeskid = 2;
    var opcid   =  $("#opgrade").val();
	var treatmentId  =  $("#tr_Id").val(); 

	var scheduledProcedure = $("#opgrade").val();
	var findingName=$("#" + id).val();
	
	 if(findingName==null || findingName==""||findingName==undefined){
	    	return false;
	    }
	var inputs = [];
	inputs.push('findingName=' + findingName);
   	inputs.push('TrId=' + treatmentId);
	inputs.push('pId=' + opcid);
	inputs.push('scheduledProcedure=' + scheduledProcedure);
	inputs.push('unit=' + 1);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('chargesOS=' +  $("#chargesOS").val());
	inputs.push('count1=' + count1);
	inputs.push('treatmentoperationid=' + treatmentoperationid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/operationcharge",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
			autoperation(r,id,"OC");
     
      
		}
	});*/
	
	
	var sponsorId = $("#SponsorsourceTypeId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	sponsorId=0;
	chargesSlaveId=0;
	if (sponsorId > 0 && chargesSlaveId > 0) {
		setAllChargesConfigOnGenBillingIPDrDskServicesAdvised(inputID);
	} else {
		var resultData = [];
		var findingName = $("#" + id).val();
		var unit = $("#uId").val();
		var userId = $("#userId").val();
		//var unitlist = listofunit.slice(1);
		var unitlist="";
	//	var depdocdeskid = $("#depdocdeskid").val();
		var depdocdeskid = 2;
		var querytype = "all";
		var serviceid = 0;
		var inputs = [];
		inputs.push('unitid=' + unit);
		inputs.push('userId=' + unit);
		inputs.push('categoryName=' + findingName);
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		inputs.push('dept_id=2');
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "ehat/autoallservicestest/getallservices",
			url : "ehat/ipdtestautosuggest/getTestAutosuggestion",

			success : function(r) {
				//autoCompIPDServicesAdvised(r, inputID);
				autoperation(r,id,"OC");
			}
		});
	}

	
}


/**
 * @author Paras R Suryawanshi
 * @Date 21-Nov-2017
 * @code For SaveOTPercentage
 * ***/
function Saveotpercentage(){
    var masterId = $("#lisHc0").val();// chargesId
	var serviceLastId = 0;// static chargesSlaveId
	var liSizeCom = $("#dynamicItemcom li").length;
	serviceLastId = $("#lisHc" + (liSizeCom - 1)).val();
    var rightDivLength = $("#rightDiv tr").length;
	
    if (rightDivLength == 0) {
		alert("Please Take Atleast One Service Charges To Save Or Update!");
		// SetFocus('rightDiv');
		return false;

	}

	var cmt = 1;
	var serviceDetails = {
			listOTPercentage : []
	        };
	// for each
	/*$(".right_Charges  ").each(function() {
		
		
			 		
			   var servassignID = $(".subserviceIdr"+cmt).val();
			   if(servassignID == undefined || servassignID == null || servassignID == ""){
				   
			   }else{
				   var percentage = parseFloat($(this).val());
				   var otherbildetailidipd = $(".lotherbill"+cmt).val();
	               if(otherbildetailidipd > 0){
	            	   masterId = $(".mId"+cmt).val();
	            	   serviceLastId= $(".sId"+cmt).val();
	               }
			     
			       serviceDetails.listOTPercentage.push({
					   opid:otherbildetailidipd,
			           serviceId        : masterId,
			           subserviceId     : serviceLastId,
			           childSubServiceId:servassignID,
				       confugrationflag :"N",
				       percentage       :percentage,
				       
				    });  
			   }
             
			    
		cmt++;			
	});*/
	
	var rcunt =   $('#rcunt').val();	
	if(rcunt==0){
		rcunt=rightDivLength;
	}
	for ( var i = 1; i <= rcunt; i++) {
		   var servassignID = $(".subserviceIdr"+i).val();
		   if(servassignID == undefined || servassignID == null || servassignID == ""){
			   
		   }else{
			   var percentage = parseFloat($("#inChargesr"+ i).val());
			   var otherbildetailidipd = $(".lotherbill"+ i).val();
               if(otherbildetailidipd > 0){
            	   masterId = $(".mId"+i).val();
            	   serviceLastId= $(".sId"+i).val();
               }
             
		       serviceDetails.listOTPercentage.push({
				   opid:otherbildetailidipd,
		           serviceId        : masterId,
		           subserviceId     : serviceLastId,
		           childSubServiceId:servassignID,
			       confugrationflag :"N",
			       percentage       :percentage,
			       
			    });  
		   }
         
		    
	
	}
    var othersid=0;
	serviceDetails = JSON.stringify(serviceDetails);
	var inputs = [];
	inputs.push('serviceDetails=' + serviceDetails);
    var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/SaveOTPercentage",
	
		success : function(r) {
			if(r>0){
				alert("Save Sucessfully");
				fetchOTPercentage();
			/*var otab="";
			fetchdetailsOT(masterId, serviceLastId,callform,otab);*/
			}
		
		}	
		
	});

	}


/**
 * @author Paras R Suryawanshi
 * @Date 21-Nov-2017
 * @code For hallwise Operation charge OT
 * ***/
function fetchOTPercentage(callform,response){

	jQuery.ajax({
		async : false,
		type : "GET",
	//	data :  "&reqType=AJAX",
		url : "ehat/ot/fetchOTPercentage",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
		//	 setDynamicServicesOnright(ajaxResponse,"FETHOTPER");
			 setOTDynamicServicesOnright(ajaxResponse,"FETHOTPER");
      if(callform=="OTCHARGE"){
    	   
    	   hallwiseOPchargeOT(ajaxResponse);
       }
	
		    	  
		     
			
		}
	});
	
	
}

/********
 * @author	Touheed
 * @base 	Fetching super master of service based on there id
 * @since	1st-June-2017
 ********/
function fetchSuperCatOT(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForListOT('dynamicItemos',response);
		}
	});
}


/********
 * @author	Touheed
 * @base 	Fetching super master of service based on there id
 * @since	1st-June-2017
 ********/
function fetchSuperCatOTOnCpoe(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			setDyanamicDivForListOT('dynamicItem',response);
		}
	});
}




//Touheed for multiselect
/********
 * @author	Touheed
 * @base 	Setting fectched Response of fetchSuperCatogoires 
 * @since	1st-June-2017
 ********/
function setDyanamicDivForListOT(setDiv,response) {
	var htm ="";
	for ( var i = 0; i < response.lstSubService.length; i++) {
		var count =i;
		var name = response.lstSubService[i].categoryName;
		var id = response.lstSubService[i].subId;
		 htm = htm+ '<li class="select2-search-choice" id="liItme'
			+ i
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFild('
			+ count + ',' + id + ',\'' + setDiv + '\')" href="#"></a>'
			+ '<input id="li' + (count) + '" type="hidden" value="' + id + '">';
		 	+'</li>';
	}
	$('#' + setDiv).html(htm);
}

function showDataOP(){
	
//For Service Id
	var masterId = $("#lisHc0").val();// masterid
	var liSizeForServices = $("#dynamicItemcom li").length;
	var selfId  =0;
	
	if (liSizeForServices > 1) {
		selfId =$("#lisHc" + (liSizeForServices - 1)).val();
	}
	
		 fetchSubcategory(masterId, selfId,"OT");
	
	
	
}
/*******
 * @author    :BILAL
 * @Date      :26-MAY-2017
 * @Code      :For fetching all servies on load and sub services
 * ******/
function fetchAllService() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/serv/fetchServiceList2",
		
		success : function(response) {
			 multiSelectcomot(response , "" , "");
			
		}
	});

}

function fetchSubcategory(masterId, selfId,callform){
	
	var servicesInfo=$("#servicesInfo").val();
	jQuery.ajax({
		type : "POST",
		url : "ehat/subservice/getSubServiceIsCat",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
		
			 setDynamicServicesOnright(response, "OTPER"); 
		 
			
		}
	});
}
//@author :Sagar Kadam @date: 17-Jun-2017 @reason : fetch doctors for registartion
function setDocNameOT() {

	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('date=onload');
	inputs.push('drDeptId='+ 0);
	inputs.push('docType=doc');
	var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		error 	: function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
		
			var doctorBean = eval('(' + ajaxResponse + ')');
			
 			$("#doctorNameOT").setTemplate(docNameTemplateForOPD); 						
			$("#doctorNameOT").processTemplate(doctorBean);
			$("#doctorNameOT").select2();
			//Added By kishor 
			
 		}
	});
}
var docNameTemplateForOPD = "<option value='0'>-select-</option>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
/**
 * @author Paras R Suryawanshi
 * @Date 21-Nov-2017
 * @code For hallwise Operation charge OT
 * ***/
function hallwiseCHARGE(callfrom){

	var result=0;

    var opcid              =  $("#opgrade").val();
	var treatmentId        =  $("#tr_Id").val(); 
	//var scheduledProcedure = $("#scheduledProcedure option:first").val();//$("#departmentOT").val();
	var scheduledProcedure = $("#operationListId").val();
	if(scheduledProcedure == 0 || scheduledProcedure == null || scheduledProcedure == undefined || scheduledProcedure == "undefined" ){
		alert("please Select Operation Name First");
		return false;
	}
	var inputs = [];

   	inputs.push('TrId=' + treatmentId);
	inputs.push('pId=' + opcid);
	inputs.push('scheduledProcedure=' + scheduledProcedure);
	inputs.push('callfrom=' + callfrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/hallwisechargeOT",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
			result=r;
			
			if(r==null || r=="" || r==undefined){
				 $("#chargesOS").val(0);
			}else{
				 $("#chargesOS").val(r);
			}
      
	}
	});
	
	
	return result;
}
/**
 * @author Paras R Suryawanshi
 * @Date 21-Nov-2017
 * @code For Pharmacyproduct autosuggestion
 * ***/
	function setPopUpValuesot()
	{
		var totalRow=0;
		$('#batchData1 input[type=radio]').each(function()
		{
			totalRow++;
		});
	//	setQtyFocusot();
		var value =$("input[name=row]:checked").val();
	//	alert(value);
		setPopUpValuesot1(value,totalRow);
	}
	
	function setPopUpValuesot1(number, totalRow) {

		if (totalRow == '0') {

			

		} else {
			
			$('#pharmaRate').val(
					$('#textSaleRate' + number).val());
			$('#pharmaAmt').val(
					$('#textSaleRate' + number).val());
			$('#bathid').val(
					$('#textBatchPopUpBatchId' + number).val());
			
		   $("#textBatch").val($('#textBatchCode' + number).val());
		   $("#txtExpiry").val($('#textBatchExpiry' + number).val());
		   $("#txtAQty").val($('#textBatchClearStock' + number).val());
		   $("#textBhVat").val($('#textBatchVat' + number).val());
		   $('#patient_sale_Batch_Pop_Up').css('display','none');
		   //$('#patient_sale_Batch_Pop_Up').modal('hide');
		}

	}
	/************
	 *@author	: paras suryawanshi
	 *@date		:  18-May-2017
	 *@code		:deleteCpoeServ
	 ***********/
	function deleteCpoeServOT(values,callform){
		var labservicelist ='';
		//var cnt =-1;
		if (values=='multiple'){
			
			$.each($('#chkunserv:checked'), function() {
			//	labservicelist.push(parseInt($(this).val()));
				labservicelist=labservicelist+","+$(this).val();
			});
			
			 if(labservicelist.length==0){
				   
				   
				   alert("Please check  at least Service to delete");	   
				   return false;
				   
			   }
		}else{
			labservicelist=labservicelist+","+ values;
		}
	 //	labservicelist = JSON.stringify(labservicelist);
		var tk = labservicelist.slice(1); 
		
		
		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/doctordesk/deleteservdetails",
			data	: {
				
			  "labservicelist" : tk,
				"callform":callform
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
		
			success : function(response) {
				if(callform=="DR"){
				
				
						fetchbilldetails();   //for OPD 
					
					
				}else if(callform=="IPD"){
					
					fetchipddetailsdrdesk();  //for ipd
					
				}else if(callform=="Diagno"){
					
					fetchbilldetailsDigno(); //for Diagno
					
				}
				else {
					fetchipdbilldetails(callform);  //for ot
				}
				
				
			}
			
		});
		
	}
	
function deleteOTP(id,callform){
	
	if(callform=="remove"){
		$("#tr"+id).remove();
	}else{

		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/doctordesk/deleteservdetails",
			data	: {
				
			  "labservicelist" : id,
				"callform":callform
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
		
			success : function(response) {
			
			}
			
		});
		
	}
	

}
var docfetchprocedureCatsedrvOT = "<option value='0'>-select-</option>{#foreach $T.listProcedureCat as dl}	<option value='{$T.dl.pr_id}'>{$T.dl.pr_name}</option>{#/for}";

function fetchprocedureCatsedrvOT(){

	jQuery.ajax({
		async : false,
		type : "GET",
	//	data :  "&reqType=AJAX",
		url : "ehat/ot/fetchprocedureCatsedrv",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
	
		    	 
			$("#opgrade").setTemplate(docfetchprocedureCatsedrvOT);
		    $("#opgrade").processTemplate(ajaxResponse);  
			
		}
	});
	
	
}


function fetchPTNameForOtScheduleODASH() {
	/*if (rowcount == undefined) {
	var opType = $("#selOTtype").val();
	var department = $("#department").val();
} else {
	var opType = $("#selOTtype" + rowcount).val();
	var department = $("#department" + rowcount).val();
}*/
var opType = $("#selOTtype").val();
if (opType == "Select") {
	alert("Please Select Operation Type");
	$("#department").val(0);
	return false;
}
var inputs = [];
inputs.push('opType=' + encodeURIComponent(opType));
inputs.push('department=' + encodeURIComponent(department));
inputs.push('action=fetchOperationName');
var str = inputs.join('&');
jQuery.ajax({
	async : true,
	type : "GET",
	data : str + "&reqType=AJAX",
	//url : "OperationServlet",
	url : "./ehat/otdata/fetchOperationName",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {

	},
	success : function(ajaxResponse) {
		// alert(ajaxResponse);
		objc = eval('(' + ajaxResponse + ')');
		$("#selOTtypeOT").setTemplate(operationNameTemp);
		$("#selOTtypeOT").processTemplate(objc);
		$("#selOTtypeOT").select2();

	}
});

}

function searchotpatient(){


	var byName = $("#byName1").val();
	var byId = $("#byId1").val();
	var selOTtypeOT = $("#selOTName").val();
	var doctorNameOT = $("#doctorName").val();
	var popup_container2 = $("#popup_container2").val();
	var popup_container3 = $("#popup_container3").val();
	var searchBy = 0;
	var value = 0;
	
	if(popup_container2.length > 0){
		if(popup_container3.length == 0){
			alert("Please Select To Date for search");
			return false;
		}
	}
	if(popup_container3.length > 0){
		if(popup_container2.length == 0){
			alert("Please Select From Date for search");
			return false;
		}
	}
/*	if (byName != "" && byId != "") {
		alert("Please search either by patient Id or by Patient Name");
	} else {*/
		if (byName != "") {
			searchBy = "byName";
			value = byName;
			/*searchBy = "byId";
			value = byId;*/
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}
		//}
		var inputs = [];
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('patient_ID=' + encodeURIComponent(value));
		inputs.push('surgerytype=' + encodeURIComponent(selOTtypeOT));
		inputs.push('surganname=' + encodeURIComponent(doctorNameOT));
		inputs.push('fdate=' + encodeURIComponent(popup_container2));
		inputs.push('todate=' + encodeURIComponent(popup_container3));
		inputs.push('pageName=all');
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/otdata/showSearchOperSum1",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(r) {
				pobj1 = r;
				// alert(JSON.stringify(pobj1[i].pi));
				//pobj1 = eval('(' + ajaxResponse + ')');
				$("#divPatId").html(r);
				if (pobj1.length == 0) {
					alert("Patient Not Found");
				} else {
					count = 1;
					
						$("#container").setTemplate(
								containerOPerationSummaryTemplate);
						$("#container").processTemplate(pobj1);

					
				}
			}
		});
				
				/*var htm1="";
				var index=1;
				pobj1 =r;
				
				for(var i=0 ;i< pobj1.length ;i++){
					 
					for(var j=0 ;j< pobj1[i].listTop.length ;j++){
								var datetime= new Date(response.listEhatOTBillDetailForIpd[i].createdDate).toLocaleString();
						htm1 = htm1
								+ "<tr class='center'><td >"
								+ index
				            	+ "</td>"
								+ "<td >"
								+ pobj1[0].pi
								+ "</td>"
								+ "<td  >"
								+  pobj1[0].fn 
								+ "</td>"
								+ "<td >"
								+  pobj1[0].listTop[0].dt
								+"</td>"
								+ "<td >"
								+  "<i class='fa fa-eye View'></i>" + "</button>"
								+"</td>"	
								+"</tr>";
						index++;

						
					}
				}
				$("#operationDataBody").html(htm1);
			}
		});*/
	//}
	
		
	
}


function fetchtodayopreation(){


	var pageName = "OTDashboard";
	
	
	var	otDate = $("#tdate").val();
	var inputs = [];
	inputs.push('action=searchOperationSumm');
	inputs.push('searchBy=onload');
	inputs.push('value=onload');
	inputs.push('selOTtypeOT=1');
	inputs.push('doctorNameOT=1');
	inputs.push('popup_container2='+ otDate);
	inputs.push('popup_container3=' + otDate);
	inputs.push('pageName=ot');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			//alert(urlDisplayOpSum);
			
			var htm1="";
			var index=1;
			pobj1 = eval('(' + ajaxResponse + ')');
			
			for(var i=0 ;i< pobj1.pl.length ;i++){
				 
				for(var j=0 ;j< pobj1.pl[i].listTop.length ;j++){
					/*		var datetime= new Date(response.listEhatOTBillDetailForIpd[i].createdDate).toLocaleString();*/
					htm1 = htm1
							+ "<tr class='center'><td >"
							+ index
			            	+ "</td>"
							+ "<td >"
							+ pobj1.pl[i].listTop[j].schPro
							+ "</td>"
							+ "<td  >"
							+  pobj1.pl[i].listTop[j].st +" - "+  pobj1.pl[i].listTop[j].et 
							+ "</td>"
							+ "<td >"
							+  pobj1.pl[i].listTop[j].docnms 
							+"</td>"
							+ "<td >"
							+ pobj1.pl[i].listTop[j].opcat 
							+"</td>"	
							+"</tr>";
					index++;

					
				}
			}
		$("#todayop").html(htm1);
		}
	});


	
	
}
function fetchtommrowpreation(){
	
	      // get today's date then add one
	      var nextDay = new Date();
	      nextDay.setDate(nextDay.getDate() + 1);

	      var month = nextDay.getMonth() + 1;
	      var day = nextDay.getDate();
	      var year = nextDay.getFullYear();

	      if (month < 10) { month = "0" + month } 
	      if (day < 10) { day = "0" + day }

	otDate=day + "/" + month + "/" + year ;
	var pageName = "OTDashboard";
	
	var inputs = [];

	inputs.push('action=searchOperationSumm');
	inputs.push('searchBy=onload');
	inputs.push('value=onload');
	inputs.push('selOTtypeOT=1');
	inputs.push('doctorNameOT=1');
	inputs.push('popup_container2='+ otDate);
	inputs.push('popup_container3=' + otDate);
	inputs.push('pageName=ot');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
		var htm2="";
		var index=1;
			pobj1 = eval('(' + ajaxResponse + ')');
			for(var i=0 ;i< pobj1.pl.length ;i++){
				
				for(var j=0 ;j< pobj1.pl[i].listTop.length ;j++){
					/*		var datetime= new Date(response.listEhatOTBillDetailForIpd[i].createdDate).toLocaleString();*/
					htm2 = htm2
							+ "<tr class='center'><td >"
							+ index
			            	+ "</td>"
							+ "<td >"
							+ pobj1.pl[i].listTop[j].schPro
							+ "</td>"
							+ "<td  >"
							+  pobj1.pl[i].listTop[j].st +" - "+  pobj1.pl[i].listTop[j].et 
							+ "</td>"
							+ "<td >"
							+  pobj1.pl[i].listTop[j].docnms 
							+"</td>"
							+ "<td >"
							+ pobj1.pl[i].listTop[j].opcat 
							+"</td>"	
							+"</tr>";
					index++;

					
				}
			}
		$("#tmrop").html(htm2);
		}
	});


	
	
}
function fetchopreationcalender(){


	
	
	
	var	otDate = $("#popup_container2").val();
	var inputs = [];

	inputs.push('action=searchOperationSumm');
	inputs.push('searchBy=onload');
	inputs.push('value=onload');
	inputs.push('selOTtypeOT=1');
	inputs.push('doctorNameOT=1');
	inputs.push('popup_container2='+ otDate);
	inputs.push('popup_container3=' + otDate);
	inputs.push('pageName=ot');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
		var htm="";
		var index=1;
			pobj1 = eval('(' + ajaxResponse + ')');
			for(var i=0 ;i< pobj1.pl.length ;i++){
				
				for(var j=0 ;j< pobj1.pl[i].listTop.length ;j++){
					/*		var datetime= new Date(response.listEhatOTBillDetailForIpd[i].createdDate).toLocaleString();*/
					htm = htm
							+ "<tr class='center'><td >"
							+ index
			            	+ "</td>"
							+ "<td >"
							+ pobj1.pl[i].listTop[j].schPro
							+ "</td>"
							+ "<td  >"
							+  pobj1.pl[i].listTop[j].st +" - "+  pobj1.pl[i].listTop[j].et 
							+ "</td>"
							+ "<td >"
							+  pobj1.pl[i].listTop[j].docnms 
							+"</td>"
							+ "<td >"
							+ pobj1.pl[i].listTop[j].opcat 
							+"</td>"	
							+"</tr>";
					index++;

					
				}
			}
		$("#dateop").html(htm);
		}
	});


	
	
}

function fetchOTReportdetails(callfrom){
var pid=$("#byId1").val();
var name=$("#byName1").val();
var fdate=$("#popup_container2").val();
var tdate=$("#popup_container3").val();
if(callfrom=="select"){

	if(fdate.length > 0){
		if(tdate.length == 0){
			alert("Please Select To Date for search");
			return false;
		}
	}
	if(fdate.length > 0){
		if(tdate.length == 0){
			alert("Please Select From Date for search");
			return false;
		}
	}
	/*if (name != "" && pid != "") {
		alert("Please search either by patient Id or by Patient Name");
	}*/
}
jQuery.ajax({
		async : false,
		type : "GET",
		data	: {
			
			  "pid" : pid,
			  "name":name,
			  "fromdate":fdate,
			  "todate":tdate,
			   "callfrom":callfrom
			},
		url : "ehat/ot/fetchOTReportdetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
		var htm="";
		var index=1;
			pobj1 = ajaxResponse;
			   var k=[];
				var i=0;
				var first=0;
				var chk=0;
				var length=pobj1.otrepordetails.length -1;
				var totalamnt=0.0;
				var grandtotal=0.0;
				for(var j=0 ;j< pobj1.otrepordetails.length ;j++){
					/*		var datetime= new Date(response.listEhatOTBillDetailForIpd[i].createdDate).toLocaleString();*/
					/*k.prototype.has_element = function(j) {
						  return $.inArray(j, this) !== -1;
					};*/
					var a=k.indexOf(j);
					if(a > 0){
						
					}else{
						i = chk;
						
						if(pobj1.otrepordetails[j].count_ot == pobj1.otrepordetails[i].count_ot){
							while (pobj1.otrepordetails[j].count_ot == pobj1.otrepordetails[i].count_ot){
								totalamnt = totalamnt +pobj1.otrepordetails[i].amount;
								if(first ==0 ){
									htm= htm +"<tr class='center' style='background-color: #f1f1c1' ><th  style='font-size: 16px;border-right: 0px solid;' >" + "Patient Name :" 
	                                +"</th>"	
								    + "<th  colspan='3' style='font-size: 16px;border-right: 0px solid;' >" 
									+ pobj1.otrepordetails[i].f_name + "&nbsp;&nbsp;&nbsp;  " + pobj1.otrepordetails[i].m_name + " &nbsp;&nbsp;&nbsp;   " + pobj1.otrepordetails[i].l_name
									+"</th>"
	                                +"</tr>"
									+ "<tr class='center' style='background-color: #f1f1c1' ><th class='center' style='font-size: 16px;border-right: 0px solid;' >"  
									+ 	index
										+"</th>"	
									    + "<th  class='center' style='font-size: 16px;border-right: 0px solid;' >" 
										+ pobj1.otrepordetails[i].opname.slice(1) 
										+"</th>"
										+"<th  class='center' style='font-size: 16px;border-right: 0px solid;' >" 
										+ pobj1.otrepordetails[i].created_date_time
										+"</th>"
									    +"<th class='center' style='font-size: 16px;border-right: 0px solid;' >" + "- " 
		                                +"</th>"	
										+"</tr>";
									first=1;
								}
								htm = htm
								+ "<tr  style='font-size:17px'><td ></td><td >"
							    + pobj1.otrepordetails[i].categoryName
								+"</td>"	
								+"<td style='font-size:17px' class='center'>"
							    + "-"
								+"</td>"				
								+"<td style='font-size:17px' class='center'>"
							    + Number(pobj1.otrepordetails[i].amount).toFixed(2);  
								+"</td>"
								+"</tr>"
								;
								k.push(i);
								if(length == i){
								
									break;
								}
								i++;
							//	alert("index :" + index +"=" + i  + "");
							}
							htm = htm +  "<tr class='center' style='' ><th  style='font-size: 16px;border-right: 0px solid;' >" + "" 
                            +"</th>"	
						    + "<th class='center' colspan='2' style='font-size: 16px;border-right: 0px solid;' >" 
							+ "Surgery Wise Amount :"
							+"</th>"
							+"<th  class='center' style='font-size: 16px;border-right: 0px solid;border-left:0px' >" + totalamnt.toLocaleString()  ; 
                            +"</th>"	
                            +"</tr>"
                            htm = htm    +  "<tr class='center' style='' ><th  style='font-size: 16px;border-right: 0px solid;' >" + "" 
                           +"</th>"	
						    + "<th class='center' colspan='2' style='font-size: 16px;border-right: 0px solid;' >" 
							+ "Pat Wise Amount :"
							+"</th>"
							+"<th  class='center' style='font-size: 16px;border-right: 0px solid;border-left:0px' >" +  Number(totalamnt).toFixed(2); 
                           +"</th>"	
                           +"</tr>" ;
                           grandtotal = grandtotal + totalamnt;
							chk=i;
							index++;
							totalamnt=0.0;
						}else{
							chk=i;
							
						}
						
					}
				
					i=0;
				
					first=0;
					
				
			}
				 htm = htm    +  "<tr class='center' style='' ><th  style='font-size: 16px;border-right: 0px solid;' >" + "" 
                 +"</th>"	
				    + "<th class='center' colspan='2' style='font-size: 16px;border-right: 0px solid;' >" 
					+ "Grand Total :"
					+"</th>"
					+"<th  class='center' style='font-size: 16px;border-right: 0px solid;border-left:0px' >" +  grandtotal.toLocaleString(); 
                 +"</th>"	
                 +"</tr>" ;		
		$("#dateop").html(htm);
		}
	});
	
	
}

function showotreports(){
	
	window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$="companyReport"]').html()));
	 e.preventDefault();
}
function showotprintotreports(callform){
	var pid=$("#byId1").val();
	var name=$("#byName1").val();
	var fdate=$("#popup_container2").val();
	var tdate=$("#popup_container3").val();
	if(callform =="select"){

		if(fdate.length > 0){
			if(tdate.length == 0){
				alert("Please Select To Date for search");
				return false;
			}
		}
		if(fdate.length > 0){
			if(tdate.length == 0){
				alert("Please Select From Date for search");
				return false;
			}
		}
		/*if (name != "" && pid != "") {
			alert("Please search either by patient Id or by Patient Name");
		}*/
	}
	window.open("OT_reportsPrint.jsp?pid="
			+ pid
			+ "&name="
			+ name
			+ "&fdate=" + fdate +"&tdate="+tdate +"&callform=" + callform );
}


function searchotpatientDRwise(){


	var byName = "";
	var byId = 0;
	var selOTtypeOT = "";
	var doctorNameOT = $("#doctorNameOT").val();
	var popup_container2 = $("#popup_container2").val();
	var popup_container3 = $("#popup_container3").val()
	var searchBy = 0;
	var value = 0;
	searchBy = "byDr";
	if(popup_container2.length == 0){
		alert("Please Select From Date for search");
		return false;
	}
	if(popup_container3.length == 0){
		alert("Please Select To Date for search");
		return false;
	}
	if(popup_container2.length > 0){
		if(popup_container3.length == 0){
			alert("Please Select To Date for search");
			return false;
		}
	}
	if(popup_container3.length > 0){
		if(popup_container2.length == 0){
			alert("Please Select From Date for search");
			return false;
		}
	}
	value = doctorNameOT;

		jQuery.ajax({
			async : false,
			type : "GET",
			data	: {
				  "fromdate":popup_container2,
				  "todate":popup_container3,
				   "docid":doctorNameOT
				},
			url : "ehat/ot/fetchot_operation_records",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// 
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
			
				var htm="";
				var k=[];
				var d=[];
					var htm1="<tr class='center'  >"+ "<th class='center' style='font-size: 16px;border-right: 0px solid;' >" 
					+ "Doctor Name" 
					+"</th>";
				var htm2="<tr class='center' style='background-color: #f1f1c1' >"+"</tr>";
				for(var i=0;i< ajaxResponse.listdetails.length;i++){
					var id=parseInt(ajaxResponse.listdetails[i].compid);
				//	var lk=k.indexOf(id);
					var lk=contains(k, id);
					
					
					if(lk == true){
						
					}else{
						htm= htm 
					    + "<th class='center' style='font-size: 16px;border-right: 0px solid;' >" 
						+ ajaxResponse.listdetails[i].company 
						+"</th>";	
					   
						k.push(id);
					}
						
				}
				htm1=htm1 +  htm +"</tr>";
                            var htm3=""; 
                              var htm4="";
            var n=[];
				for(var i=0;i< ajaxResponse.listdetails.length;i++){
					htm4="";
					var dcn= ajaxResponse.listdetails[i].docname;
					var chk= contains1(n, dcn);
					
					
					if(chk==true){
						
					}else{
						htm3= htm3 + "<tr class='center' >"
					    + "<td   class='center' style='font-size: 12px;border-right: 0px solid;' >" 
						+ ajaxResponse.listdetails[i].docname 
						+"</td>"	
					   ;
						n.push(dcn);
					for(var j=0;j< k.length;j++){
						var v =0;
						while(v <ajaxResponse.listdetails.length  ){

							if(ajaxResponse.listdetails[v].docname == ajaxResponse.listdetails[i].docname ){
							if(ajaxResponse.listdetails[v].compid ==k[j]){
								htm4= htm4 
							    + "<td class='center'  style='font-size: 12px;border-right: 0px solid;' >" 
								+ ajaxResponse.listdetails[v].count 
								+"</td>"	
							   ;
							}
							}
									v++;					
													}
					
					}
                                   htm3= htm3  + htm4+  "</tr>";
                               
					}          
				}
				var count1=0;
				var htm10="";
				for(var i=0;i< ajaxResponse.listdetails.length;i++){
					for(var j=0;j< ajaxResponse.listdetails.length;j++){
						if(ajaxResponse.listdetails[i].compid ==ajaxResponse.listdetails[j].compid ){
							 count1=	count1 +ajaxResponse.listdetails[j].count;
						}
					
					}
					
					
					var tl= contains3(d, ajaxResponse.listdetails[i].compid);
					if(tl==true){
						count1=0;
					}else{
						 htm10= htm10+  "<th class='center'  style='font-size: 12px;border-right: 0px solid;' >" 
							+ count1
							+"</th>";
						    count1=0;
						    d.push(ajaxResponse.listdetails[i].compid);
					}
				 
				}
				var htm11=  "<tr class='center'  >" + "<th class='center'  style='font-size: 16px;border-right: 0px solid;' >Total</th>"  +  htm10 + "</tr>";
                     var htm5= htm1 + htm3 + htm11;
                     $("#otpr").html(htm5);        
			
                 	$("#daterd").text("For The period From "+ popup_container2 + "  To  " +  popup_container3);
                 /*	$("#popup_container2").val();
                 	 $("#popup_container3").val();*/
			}
		});
	//}

	
}

function contains(k, id) {
    var i = k.length;
    while (i--) {
       if (k[i] === id) {
           return true;
       }
    }
    return false;
}

function contains1(n, dcn) {
    var i = n.length;
    while (i--) {
       if (n[i] === dcn) {
           return true;
       }
    }
    return false;
}

function contains3(k, id) {
    var i = k.length;
    while (i--) {
       if (k[i] === id) {
           return true;
       }
    }
    return false;
}
function showEXPORTot(){
	window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$="containerot"]').html()));
	 e.preventDefault();
}


function searchotpatientCathlab(){



	var byName = "";
	var byId = 0;
	var selOTtypeOT = "";
	var doctorNameOT = $("#doctorNameOT").val();
	var popup_container2 = $("#popup_container2").val();
	var popup_container3 = $("#popup_container3").val()
	var searchBy = 0;
	var value = 0;
	searchBy = "byDr";

	if(popup_container2.length == 0){
		alert("Please Select From Date for search");
		return false;
	}
	if(popup_container3.length == 0){
		alert("Please Select To Date for search");
		return false;
	}
	if(popup_container2.length > 0){
		if(popup_container3.length == 0){
			alert("Please Select To Date for search");
			return false;
		}
	}
	if(popup_container3.length > 0){
		if(popup_container2.length == 0){
			alert("Please Select From Date for search");
			return false;
		}
	}
	value = doctorNameOT;

		jQuery.ajax({
			async : false,
			type : "GET",
			data	: {
				
				
				  "fromdate":popup_container2,
				  "todate":popup_container3,
				   "docid":doctorNameOT
				},
			url : "ehat/ot/fetchot_otcatlab",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				// 
			},
			success : function(r) {
             	$("#daterd").text(" "+ popup_container2 + "  To  " +  popup_container3);

				ajaxResponse = r;
				var htm="";
				var index=1;
				var grandtotal=0.0;
				var count=0;
				var billamt=0.0;
				var dis=0.0;
				var netamt=0.0;
				var adv=0.0;
				var rb=0.0;
				var bal=0.0;
				var dr=0.0;
				var duesamt=0.0;
				var prolamt=0.0;
				var dues=0.0;
				for(var i=0;i< ajaxResponse.listdetails.length;i++)
					{
				
					htm =htm +"<tr><th class=' center' style='height: 21.5px;'><div class='TextFont'>"+ index +"</div></th>"
				+	"<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].procedurename+ "</div></th>"
                +	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].count+"</div></th>"
				+	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].procedureamt+".00" +"</div></th>"
				+	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].amt+".00" +"</div></th>"
		    	+	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].discount+"</div></th>"
				
				+	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+0.00+"</div></th>"
				+	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+0.00+"</div></th>"
                +	"<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].netamt+".00" +"</div></th>"
	            +	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].advance+".00" +"</div></th>"
			    +	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].recdbill+".00" +"</div></th>"
				+	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].balbill+".00" +"</div></th>"
				+	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].dues +"</div></th>"
				+	"<th class='center' style='height: 21.5px;'><div class='TextFont'>"+ ajaxResponse.listdetails[i].duesamt+".00" +"</div></th></tr>	"
				
				count=count+ ajaxResponse.listdetails[i].count;
				prolamt= prolamt+ ajaxResponse.listdetails[i].procedureamt;
				billamt= billamt+ ajaxResponse.listdetails[i].amt;
				dis= dis + ajaxResponse.listdetails[i].discount;
				netamt= netamt +ajaxResponse.listdetails[i].netamt;
				adv= adv + ajaxResponse.listdetails[i].advance;
				rb= rb +ajaxResponse.listdetails[i].recdbill;
				bal= bal +  ajaxResponse.listdetails[i].balbill;
				dues=dues +  ajaxResponse.listdetails[i].dues;
				duesamt=duesamt + ajaxResponse.listdetails[i].duesamt;
				
				
				index ++;

						
					}
				var htm1="<tr ><th class=' center' style='height: 21.5px;border: none'><div class='TextFont'></div></th>"
				+	"<th class='col-md-2-1 center' style='height: 21.5px;border: none'><div class='TextFont'>Grand Total</div></th>"
                +	"<th class='center' style='height: 21.5px;border: none'><div class='TextFont'>"+   count+"</div></th>"
				+	"<th class='center' style='height: 21.5px;border: none'><div class='TextFont'>"+Number( prolamt).toFixed(2) +"</div></th>"
				+	"<th class='center' style='height: 21.5px;border: none'><div class='TextFont'>"+Number(  billamt).toFixed(2) +"</div></th>"
		    	+	"<th class='center col-md-1-1 ' style='height: 21.5px;border: none'><div class='TextFont'>"+ dis+"</div></th>"
				
				+	"<th class='center col-md-1-1  ' style='height: 21.5px;border: none'><div class='TextFont'>"+0.00+"</div></th>"
				+	"<th class='center col-md-1-1 ' style='height: 21.5px;border: none'><div class='TextFont'>"+0.00+"</div></th>"
                +	"<th class='col-md-2-1 center' style='height: 21.5px;border: none'><div class='TextFont'>"+Number(  netamt).toFixed(2)  +"</div></th>"
	            +	"<th class='center' style='height: 21.5px;border: none'><div class='TextFont'>"+Number( adv).toFixed(2)+"</div></th>"
			    +	"<th class='center' style='height: 21.5px;border: none'><div class='TextFont'>"+Number(  rb).toFixed(2) +"</div></th>"
				+	"<th class='center' style='height: 21.5px;border: none'><div class='TextFont'>"+Number(  bal).toFixed(2)+"</div></th>"
				+	"<th class='center' style='height: 21.5px;border: none'><div class='TextFont'>"+Number(dues).toFixed(2) +"</div></th>"
				+	"<th class='center' style='height: 21.5px;border: none'><div class='TextFont'>"+ Number(duesamt).toFixed(2)+"</div></th></tr>	"
				
				  $("#otpr").html(htm); 
				$("#otpr2").html( htm1); 
			}
		});
	//}

	

}
function showEXPORTcathot(){
	window.open('data:application/vnd.ms-excel,' + encodeURIComponent( $('div[id$="containerotcathlab"]').html()));
	 e.preventDefault();
}


function reloaddetails(){
	    $("#DisplayOTModal").find('input:text, textarea').val('');
	    $("#DisplayOTModal").find('select').val('');
    location.reload();
}


function getAllPatientRecordsdoctordesk1(inputId, callfrom) {
	
	if(callfrom=="Emg"){
		deptId=2;
	}else{
		if($('#chkipd').is(':checked')){
			 deptId = 2;
			
		}else if($('#chkopd').is(':checked')){
			deptId = 1;
			
		}
		else if($('#totalDatabase').is(':checked')){
			deptId = 2;
			
		}	
	}
	
		
	var	 letter = $("#" + inputId).val();
		  var inputs = [];
	       
	        inputs.push('usertype=' + "N");
	        inputs.push('letter=' + letter);
	        inputs.push('deptId=' + deptId);
	        var str = inputs.join('&');
		
		jQuery.ajax({
		async : true,
		type : "POST",
		data 	: str + "&reqType=AJAX",
		url : "ehat/registration/getAllRecordsDeptwiseWithAuto",
			success : function(r) {
				
			    
	              if(callfrom=="search"){
	                    autoCompTable(r, inputId);    
	               }else{
	                    autoCompTable(r, inputId);
	                }
			}
		});
	}
function getchargesDROT(hallid) {
	var chargesfromConf=0.0;
	var sponsorId = 0;
	var chargesSlaveId = $("#chargesSlaveId").val();
	if(chargesSlaveId > 0){
		sponsorId=1;
	}
	var	departmentId =  2;
	var categoryid = $("#subserviceid").val();
	var treatId=$("#tr_Id").val();
	var toDate ="";
	//alert("toDateopd???"+toDate);
	
	if (toDate == "" || toDate == null || toDate == undefined
			) {
		toDate = "0";
	}
	
	if (sponsorId == "" || sponsorId == null || sponsorId == undefined
			|| isNaN(sponsorId)) {
		sponsorId = 0;
	}
	if (chargesSlaveId == "" || chargesSlaveId == null
			|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
		chargesSlaveId = 0;
	}

	if (categoryid == "" || categoryid == null || categoryid == undefined
			|| isNaN(categoryid)) {
		categoryid = 0;
	}
	
	var hallId = 0;
	var hallSlaveId = 0;
   if (departmentId == 2){
		
	   hallId = hallid;
	}

	var inputs = [];

	inputs.push('serviceid=' + categoryid);
	inputs.push('sponsorId=' + sponsorId);
	inputs.push('chargesSlaveId=' + chargesSlaveId);
	inputs.push('hallId=' + hallId);
	inputs.push('hallSlaveId=' + hallSlaveId);
	inputs.push('treatId=' + treatId);
	inputs.push('toDate=' + toDate);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/autoallservicestest/getchargessponsor",

		success : function(r) {
			$("#chargesfromConf").val(r);
			chargesfromConf=r;
			console.log(r);

		}
	});
	return chargesfromConf;
}


function setallchargesConfigOnBillingOT(inputID,value) {
	var findingNames = $("#" + inputID).val();

	if ( findingNames != "") {
		var findingName = $("#" + inputID).val();
		var unit = $("#uId").val();
		// var unitlist=listofunit.slice(1);
		var unitlist = "";
		var depdocdeskid = 2;
		var querytype = "all";
		var serviceid =0;
		var sponsorId = 1;
		var chargesSlaveId = parseInt($("#chargesSlaveId").val());
		var hallId = 2;
		var hallSlaveId = 0;
		var treatId = $("#tr_Id").val();

		if (sponsorId == "" || sponsorId == null || sponsorId == undefined
				|| isNaN(sponsorId)) {
			sponsorId = 0;
		}
		if (chargesSlaveId == "" || chargesSlaveId == null
				|| chargesSlaveId == undefined || isNaN(chargesSlaveId)) {
			chargesSlaveId = 0;
		}

		if (hallId == "" || hallId == null || hallId == undefined
				|| isNaN(hallId)) {
			hallId = 0;
		}
		if (hallSlaveId == "" || hallSlaveId == null
				|| hallSlaveId == undefined || isNaN(hallSlaveId)) {
			hallSlaveId = 0;
		}

		if (treatId == "" || treatId == null || treatId == undefined
				|| isNaN(treatId)) {
			treatId = 0;
		}

		var inputs = [];
		inputs.push('unit=' + unit);
		inputs.push('findingName=' + findingName);
		inputs.push('unitlist=' + unitlist);
		inputs.push('depdocdeskid=' + depdocdeskid);
		inputs.push('querytype=' + querytype);
		inputs.push('serviceid=' + serviceid);
		inputs.push('sponsorId=' + sponsorId);
		inputs.push('chargesSlaveId=' + chargesSlaveId);
		inputs.push('hallId=' + hallId);
		inputs.push('hallSlaveId=' + hallSlaveId);
		inputs.push('treatId=' + treatId);

		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/autoallservicestest/getallservicesConf",

			success : function(r) {
				
				autoperation(r,inputID,value);
			}
		});
		
	}
}

function CountOT(callfrom){
	var	patienttId =0;
	var treatmentId=0;
	var treatmentoperationid=0;
	if(callfrom=="SCHEDULE"){
		 patienttId   =  $("#mrnNo").val();
		 treatmentId  =  $("#trid").val();
		 treatmentoperationid = $("#treamentOpid").val();
		 
	}else{
		 patienttId   =  $("#pt_Id").val();
		 treatmentId  =  $("#tr_Id").val();
		 treatmentoperationid = $("#treatmentoperationid").val();
		
	}
    if(treatmentoperationid == undefined || treatmentoperationid == null || treatmentoperationid =="" || treatmentoperationid =="null"){
    	treatmentoperationid = 0;
    }
		
	var inputs = [];
	var otcount=0;
	inputs.push('patienttId=' + patienttId);
	inputs.push('treatmentId=' + treatmentId);
    inputs.push('callform=' + callfrom);
    inputs.push('treatmentoperationid=' + treatmentoperationid);
	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/fetchcountOT",
	
		success : function(r) {
			otcount=r;
		}	
		
	});
return otcount;	
}

/*******************************************************************************
 * @Vikas Godse
 * @date 3_April_2018 this method is used for Getting All OT Templates
 ******************************************************************************/
function getOTTemplateList(){
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ot/getAllOTTemplateList",
		error : function() {
			alert('error');
		},
		success : function(r) {
			setOTTemplateList(r);
		}
	});
}
//Added by Vikas Godse for Setting Template List
function setOTTemplateList(r){
	var list="<option value=''>--Select--</option>";
	for ( var i = 0; i < r.pattemplist.length; i++) {

		list=list+'<option onclick="setOTTemplateData('+r.pattemplist[i].idpattemp+')" value="'+(r.pattemplist[i].idpattemp)+'">'+(r.pattemplist[i].tempname)+'</option>';
	}	
	$("#selOtTemplate").html(list);
}
/*******************************************************************************
 * @Vikas Godse
 * @date 3_April_2018 this method is used for fetching Template data From Template Id
 ******************************************************************************/
function setOTTemplateData(id){
	var inputs = [];	
	inputs.push('templateId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ot/getOTTemplateDataById",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
		for(var i=0; i<r.pattemplist.length; i++){
			
					CKEDITOR.instances['editor1'].setData(r.pattemplist[i].tempdata);
					CKEDITOR.instances['editor12'].setData(r.pattemplist[i].tempdata);

			}
			
		}
	});
}
/*******************************************************************************
 * @Vikas Godse
 * @date 3_April_2018 this method is used to Save OT Consent Form
 ******************************************************************************/
function SaveOTConsentForm(){
	var templateId = $("#selOtTemplate").val();
	var templateData = "";
		templateData = CKEDITOR.instances['editor1'].getData();
		
	var	otConsentTemplateId=$("#otConsentTemplateId").val();
		
	if(templateId == "" || templateId == "--Select--" || templateId == null
			|| templateId == undefined){
		alert("Please Select Template Name");
		return false;
	}
	else if(templateData == "" || templateData == undefined || templateData == null){
		alert("Please Enter Template Data");
		return false;
	}
	var inputs = [];	
	inputs.push('otConsentFormId=' + otConsentTemplateId);
	inputs.push('tempListId=' + templateId);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	var str = inputs.join('&');
	jQuery.ajax({
		type : "POST",
		url : "ehat/ot/saveOTConsentForm",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
			alertify.success(r);
			$("#selOtTemplate").val("");
			CKEDITOR.instances['editor1'].setData("");
			getAllOtConsentForms();
		}
	});
}
/*******************************************************************************
 * @Vikas Godse
 * @date 3_April_2018 this method is used to Fetch OT Consent Form Details
 ******************************************************************************/
function getAllOtConsentForms(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/ot/getAllOtConsentForms",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			if(r.lstTemplateNames.length !=0){
				
				var htm ='<div id="allConcentFormTemp" >'
					+'<ul id="already-set" style="padding-left: 10px;">';
				for(var i=0;i<r.lstTemplateNames.length;i++){
				 	htm = htm + '<li><a href="#" id="anch'+r.lstOtConsentForm[i].otConsentFormId+'" onmouseover="this.style.color='+'"black"'+'" '
				 	+' onmouseout="this.style.backgroundColor='+'"transparent"'+ ';this.style.color='+'"inherit"'+' "'
				 	+' onclick="setConsntForm('+r.lstOtConsentForm[i].otConsentFormId+')">'
				 	+r.lstTemplateNames[i].tempname+'('+r.lstOtConsentForm[i].tempListId+')</a></li>';
				 	
				}
				htm=htm+'</ul></div>';
				$("#allConcentFormDiv1").html(htm);
			}
			
		}
	});
}
/*******************************************************************************
 * @Vikas Godse
 * @date 3_April_2018 this method is used to set Consent Form Detials
 ******************************************************************************/
function setConsntForm(id){
	var inputs = [];	
	inputs.push('templateId=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/ot/getOTConsentDataById",
		data	: str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {
					$("#otConsentTemplateId").val(r.lstOtConsentForm[0].otConsentFormId);
					$("#selOtTemplate").val(r.lstOtConsentForm[0].tempListId);
					CKEDITOR.instances['editor1'].setData(r.lstOtConsentForm[0].templateData);
			
		}
	});
}

function getpatientTrIOT(r) {
	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"callform" : r
		},
		url : "ehat/registration/fetchPatientsRecordByTreatmentId",
		success : function(r) {			  
			var fileName=r.listRegTreBillDto[0].imageName;	
			  if(fileName!="" && fileName!=null && fileName!=undefined){
				  $('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
			  }
		}
	});
}

function doctorroundcharg(callform){
	var	treatmentId =$("#tId").val();
	var drid=0;
	var time ="";
    time =$("#timeFrom2").val();
   /* if(time =="" || time ==undefined || time==null){
    	alert("Please Select Date!!");
    	return false;
    }*/
	if(callform=="Hall"){
		if($("#servId").val()==5){
			drid=$("#doctorName").val();
			if(drid ==0){
				alert("Please Select Doctor !!");
				return false;
			}
		}else{
			return false;
		}
		
	
	}
	var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('callform=' + callform);
		inputs.push('drid=' + drid);
		inputs.push('time=' + time);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ot/fetchdrramount",
		
			success : function(r) {
				if(r.length > 0){
					var amount=r.split("_");
					var hallcharges=amount[0];
					var spcharges=amount[1];
					if(hallcharges==null || hallcharges==""||hallcharges==undefined){
						hallcharges=0;
					}
					if(spcharges==null || spcharges==""||spcharges==undefined){
						spcharges=0;
					}
					
					if(callform=="Hall"){
						$("#rate").val(hallcharges);
						$("#amount").val(hallcharges);
						$("#coPay").val(hallcharges);
						
						$("#rategeneral").val(spcharges);
						$("#chargesfromConfIpd").val(spcharges);
					
					}
				}
				
				
			}	
			
		});
	
	

}


function doctorroundchargsp(callform){
	var	treatmentId =$("#tId").val();
	
	var drid=0;
	var time ="";
	    time =$("#timeFrom3").val();
	   /* if(time =="" || time ==undefined || time==null){
	    	alert("Please Select Date!!");
	    	return false;
	    }*/
		if($("#servIdIpdSponsor").val()==5){
			drid=$("#doctorNameIpdSponsor").val();
			if(drid ==0){
				alert("Please Select Doctor !!");
				return false;
			}
		}else{
			return false;
		}
		

	var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('callform=' + callform);
		inputs.push('drid=' + drid);
		inputs.push('time=' + time);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/ot/fetchdrramount",
		
			success : function(r) {
				if(r.length > 0){
					var amount=r.split("_");
					var hallcharges=amount[0];
					var spcharges=amount[1];
					if(hallcharges==null || hallcharges==""||hallcharges==undefined){
						hallcharges=0;
					}
					if(spcharges==null || spcharges==""||spcharges==undefined){
						spcharges=hallcharges;
					}
				
					$("#rateIpdSponsor").val(spcharges);
					$("#amountIpdSponsor").val(spcharges);
					$("#payIpdSponsor").val(spcharges);
					if(hallcharges > 0){
						$("#defchargesfromConfIpd").val(hallcharges);
					}
					
				
				}
				
				
			}	
			
		});
	
	

}
function calculateEmerChrForOtCharges()
{
	var callfrom=$("#callfrom").val();
	if(callfrom=="otCharges")
		{
			var emrgancyper=parseFloat($('#emrPer').val());
			if (emrgancyper > 100) {
				alert("Percentage should be less than 100");
				$("#emrPer").val(0);
				return false;
			}
			var rate=0;
			rate =parseFloat($("#txtOservamt2").val());
			var emp=parseFloat(rate*emrgancyper/100);
			//amount = parseFloat(emp + amount);
			rate = parseFloat(emp + rate);
			$("#txtOservamt").val(rate);
		}else if(callfrom=="cpoe")
			{
				calculateEmerChrForOtCpoe();
			}


}

//Tarique Aalam
function setBoxOtcharges() {
	var callfrom=$("#callfrom").val();
	if(callfrom=="otCharges")
		{
			if ($("#emrChrFlag").is(":checked")) {

				$('#emrPer').css("display","inline");
				//getEmergancyCharges();
				getEmergancyChargesOTfinal();
				calculateEmerChrForOtCharges();
			} else {
				$('#emrPer').css("display","none");
				$('#emrPer').val(0);
				calculateEmerChrForOtCharges();
			}
		}else if(callfrom=="cpoe")
			{
				if ($("#emrChrFlag").is(":checked")) {

				$('#emrPer').css("display","inline");
					getEmergancyCharges();
					calculateEmerChrForOtCpoe();
				} else {
					$('#emrPer').css("display","none");
					$('#emrPer').val(0);
					calculateEmerChrForOtCpoe();
				}
			}else
				{
					return false;
				}

}


//Tarique Aalam
function setHiddenFieldOtCharges(value)
{
	$("#txtOservamt2").val(value);
}


/********
 * @author	Tarique AAlam
 * @base 	Fetching super master of service based on there id
 ********/
function fetchSuperCatForOtCharges(serviceId) {

	jQuery.ajax({
		async : true,
		type : "POST",
		data : {
			"serviceId" : parseInt(serviceId)
		},
		url : "ehat/subservice/fetchSuperCatogoires",
		error : function() {
			alert('Network Issue!');
		},
		success : function(response) {
			console.log(response);
			$("#txtOservamt2").val(response.lstSubService[0].charges);
		}
	});
}


// Tarique Aalam
function calculateEmerChrForOtCpoe()
{

	var emrgancyper=parseFloat($('#emrPer').val());
	if (emrgancyper > 100) {
		alert("Percentage should be less than 100");
		$("#emrPer").val(0);
		return false;
	}
		var quantity=parseFloat($("#OtQty").val());
		var rate=0;
		rate =parseFloat($("#OtRate2").val());
		var emp=parseFloat(rate*emrgancyper/100);
		rate = parseFloat(emp + rate);
		var amount=parseFloat((quantity*rate));
		$("#OtRate").val(rate);
		$("#OtAmt").val(amount);

}
function selecttime(){
	if($("#servId").val()==5){
		$("#divsptime").css("display", 'block');
	
	}
	
	if($("#servId").val()==5){
	$('#timeFrom2').datetimepicker('show');
	}
}
function selecttimesp(){
	if($("#servIdIpdSponsor").val()==5){
		$("#divHalltime").css("display", 'block');
	
	}
	if($("#servIdIpdSponsor").val()==5){
	$('#timeFrom3').datetimepicker('show');
	
	}
}

/************
 *@author	:  Laxman Nikam
 *@date		:  26-July-2018
 *@codeFor	:  printOTNotes
 ***********/ 
function printOTNotes(header)
{	
	var patientobj = $("#divPatId").html();
	var data = eval('(' + patientobj + ')');
	var tomId = $("#tomId").val();  
	var patID = $("#pid").val();
	var trId = $("#trid").val();
	var currentOtNote = $("#idOTNote").val(); 
	
	if(trId == "0")
	{
		trId = $("#tr_Id").val();
		}
		
	window.open("OT_NotesPrinftForManageOp.jsp?" + "patID=" + 
			encodeURIComponent(patID) + "&tomId="+encodeURIComponent(tomId)
			+ "&trId=" + encodeURIComponent(trId)
			+ "&currentOtNote=" + encodeURIComponent(currentOtNote)
			+ "&header=" + header);
 }	
var docNameTemplateForOPDpr = "<option value='0'>-select-</option>{#foreach $T.dl as dl}	<option value='{$T.dl.ui}'>{$T.dl.dn}</option>{#/for}";

function setDocNameOTPRIVOUS() {

	var inputs = [];
	inputs.push('action=FetchDoctors');
	inputs.push('date=onload');
	inputs.push('drDeptId='+ 0);
	inputs.push('docType=doc');
	var str = inputs.join('&');
	jQuery.ajax({
		async 	: true,
		type 	: "POST",
		data 	: str + "&reqType=AJAX",
		url 	: "DoctorServlet",
		timeout : 1000 * 60 * 5,
		catche 	: false,
		error 	: function() {
			// alert("error");
		},
		success : function(r) {

			ajaxResponse = r;
		
			var doctorBean = eval('(' + ajaxResponse + ')');
			
 			$("#doctorNameOT").setTemplate(docNameTemplateForOPDpr); 						
			$("#doctorNameOT").processTemplate(doctorBean);
			$("#doctorNameOT").select2();
			//Added By kishor 
			
 		}
	});
}

function printOperationForOT(id, pid, trid, otDate){
	
	window.open("PreOperationForOTPrint.jsp?" + "id=" + 
			encodeURIComponent(id) + "&pid=" + 
			encodeURIComponent(pid) + "&trId=" + encodeURIComponent(trid)+ "&otDate=" + otDate);
	
}
function saveSurgoncharges(teamList,teamMemberCount,treatmentoperationid){
	var queryType 	 = "insert";
	var module 	     = "OT";
    var callfrom="OTCPOE";    

    var y = document.getElementById("scheduledProcedure");
    var count1=y.options.length;
    if(y.options.length==0){
    	alert("Please Select Procedure Name in Operation Details!!");
    	return false;
    }
    for ( var j = 0; j < y.options.length; j++) {
        scheduledProcedure=scheduledProcedure + "," + y.options[j].value  ;
     	}
        otProcedure = scheduledProcedure.slice(1);
		var serviceDetails = {
				listBillDetailsIpd : []
	        };
	//  serviceDetails = JSON.stringify(serviceDetails);
	var treatmentoperation =  [];
	var count = 0;
	var doctorIdanethia = "";// alert(docId);
	var doctorIdmainsurgan = "";
	var doctorIdassistansurgan = "";
    for ( var i = 1; i <= teamMemberCount; i++) {
		var docNameT = $("#docNameT" + i).text();
		var usertype = $("#userType" + i).text();
		var surgeontype = $("#docTypeT" + i).text();
   	 if(surgeontype == "surgeon" || surgeontype == "surgeon1"
   				|| surgeontype == "surgeon2"
   				|| surgeontype == "surgeon3") {
   		doctorIdmainsurgan =doctorIdmainsurgan+ "," + $("#idUser" + i).val();
		}
      }
    if(doctorIdmainsurgan!="" && doctorIdmainsurgan.length >0){
 
    		billdetailslist(doctorIdmainsurgan, $("#mainsurgancharg").val(),$("#MainSurgan").val(),"M",$("#billidmainsurgan").val());


    }
	for ( var i = 1; i <= teamMemberCount; i++) {
			var docNameT = $("#docNameT" + i).text();
			var usertype = $("#userType" + i).text();
			var surgeontype = $("#docTypeT" + i).text();
			if (surgeontype == "asssurgeon" || surgeontype == "assSurgeon1"
					|| surgeontype == "assSurgeon2"
					|| surgeontype == "assSurgeon3") {
				
				doctorIdassistansurgan =doctorIdassistansurgan+ "," + $("#idUser" + i).val();
	        	}
			}
	 if(doctorIdassistansurgan!="" && doctorIdassistansurgan.length >0){
		 
 		billdetailslist(doctorIdassistansurgan, $("#assisuragncharge").val(),$("#AsistanSurgan").val(),"A",$("#billidassisuragnc").val());


 }
	for ( var i = 1; i <= teamMemberCount; i++) {
		var docNameT = $("#docNameT" + i).text();
		var usertype = $("#userType" + i).text();
		var surgeontype = $("#docTypeT" + i).text();
		if (surgeontype == "anesthetist" || surgeontype == "anaesthesiologist1"
				|| surgeontype == "anaesthesiologist2"
				|| surgeontype == "anaesthesiologist3") {
			
			  doctorIdanethia =doctorIdanethia+ "," + $("#idUser" + i).val();
        	}
		}
	 if(doctorIdanethia!="" && doctorIdanethia.length >0){
		 
 		billdetailslist(doctorIdanethia, $("#anetheisacharge").val(),$("#Anethesia").val(),"AN",$("#billidanetheisa").val());


 }
	var  PreAnethesia =parseInt($("#PreAnethesia").val());
	var  OTRent =parseInt($("#OTRent").val());
	var  OTinstrument =parseInt($("#OTinstrument").val());


	 if(PreAnethesia > 0){
	 		billdetailslist("0", $("#PreAnethesiaCHARGE").val(),$("#PreAnethesia").val(),"P",$("#billidPreAnethesia").val());

	 }
	 if(OTRent > 0){
	 		billdetailslist("0", $("#OTRentcharg").val(),$("#OTRent").val(),"P",$("#billidOTRent").val());

	 }
	 if(OTinstrument > 0){
	 		billdetailslist("0", $("#OTinstrumentcharge").val(),$("#OTinstrument").val(),"P",$("#billidOTinstrument").val());

	 }
//  var surganlist = JSON.stringify(treatmentoperation);
	 serviceDetailsOT = JSON.stringify(serviceDetailsOT);
if(serviceDetailsOT.length ==0){
	alert("Please Select Atlest Surgon or Assitant Surgon  !!");
	return false;
}
	var inputs = [];
	/*inputs.push('patienttId=' + patienttId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('treatmentoperationid=' + treatmentoperationid);*/
	var inputs = [];
	inputs.push('module=' + module);
	inputs.push('queryType=' + queryType);
	inputs.push('callfrom=' + callfrom);
	inputs.push('serviceDetails=' + serviceDetailsOT);

	
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/doctordesk/saveCpoe",
	
		success : function(r) {
		//alert("sss");
		//	listBillDetailsIpd=[];
			//  location.reload();
			
		}	
		
	});
}

function otpercentage(){
	
jQuery.ajax({
		async : false,
		type : "GET",
		data : "reqType=AJAX",
		url : "ehat/ot/fetchOperationmaster",
	
		success : function(r) {
		
			
			$("#divotpercentage").html(JSON.stringify(r));
		}	
		
	});
}
function otpercentageServices(){

	jQuery.ajax({
		async : false,
		type : "GET",
	//	data :  "&reqType=AJAX",
		url : "ehat/ot/fetchOTPercentage",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			$("#divotpercentageservices").html(JSON.stringify(r));
		     
			
		}
	});
	
	
}


function billdetailslist(doctorlist,charges,subserviceid,flag,billid){
	var	patienttId   =  $("#pt_Id").val();
	var treatmentId  =  $("#tr_Id").val();  
	var	departmentId =  2;
	var billId       =  $("#bill_Id").val();  
	var queryType 	 = "insert";
	var module 	     = "OT";
	var urgentflag   = 'N';
    var ot_flag      = 'Y';
    var drdeskflag   = 'N';
	var	sourceTypeId =  0;
	//var rate         =  $("#chargesubservice").val();
	var rate         = 0.0;
	/*var quantity     =  1;
	var amount       =  rate * 1;  
	*/
	var company_Id    =  $("#chargesSlaveId").val();  
	var quantity      = 0;
	var amount        = 0.0;
	var serviceId     = 0;
	var subServiceId  = 0;
	var otherRate=0;
	var otherAmount=0;
	var billDetailsId     = billid;
    var subservicesname   = "-";
    var servicename       = "-";
    var unitId            = 0;
    var doctorId          = 0;                         
    var clinicalNotes     = "-";
    var instructions      = "-";
    var coPay        = amount;
	var callfromOT  ="hall";
    var callfrom="CPOE";    
	var treatmentoperationid = $("#treatmentoperationid").val();
    var y = document.getElementById("scheduledProcedure");
    var scheduledProcedure ='';//added by paras
    var iscombination ="N"; 
 	var otProcedure = "-";
    for ( var j = 0; j < y.options.length; j++) {
        scheduledProcedure=scheduledProcedure + "," + y.options[j].value  ;
     	}
        otProcedure = scheduledProcedure.slice(1);
	var emrPer=$("#emrPer").val();
	if (emrPer == "" || emrPer == null || emrPer == undefined || isNaN(emrPer)) {
		emrPer=0;
	}
	     drdeskflag      = "C";
       //  rate            = $("#txtOservamt").val();
	     rate            = charges;
	     quantity        = 1;
	   //  amount          = $("#txtOservamt").val();
	     amount          = charges;
	     if (company_Id > 0) {
		otherRate = amount;
		otherAmount = amount;
		sourceTypeId = 1;
		var callfrom = "hall";
		callfromOT = "sponser";
	//	hallwiseCHARGE(callfrom);
	//	amount = $("#chargesOS").val();
		amount = charges;
		rate = amount;
	}
	// amount = count1 * amount;
    serviceId     = 4;
	subServiceId  = subserviceid;// chargesId
	//billDetailsId = $("#billidserviceOS").val();
	//servicename   = $("#txtOserv").val();
	unitId        = $("#unlId").val();
	doctorId      = 0;
	coPay         = amount;
	callfrom      = "OC";
	/*if (servicename == "" || servicename == null) {
		alert("Please enter servicename ");
		return false;
	}*/

	if (company_Id == null || company_Id == "") {
		company_Id = 0;
	}
	if(doctorlist!="0"){
		doctorlist=doctorlist.slice(1);
	}

	serviceDetailsOT.listBillDetailsIpd.push({
		billDetailsId : billDetailsId,
		patienttId : patienttId,
		treatmentId : treatmentId,
		departmentId : departmentId,
		billId : billId,
		sourceTypeId : sourceTypeId,
		rate : rate,
		quantity : quantity,
		amount : amount,
		serviceId : serviceId,
		subServiceId : subServiceId,
		doctorId : parseInt(doctorlist),
		urgentFlag : urgentflag,
		clinicalnotes : clinicalNotes,
		instructions : instructions,
		unitId : unitId,
		ot_flag : ot_flag,
		coPay : coPay,
		drdeskflag : drdeskflag,
		callfrom : callfrom,
		onBedFlag : "N",
		countot : treatmentoperationid,
		otprocedure : otProcedure,
		otherRate : otherRate,
		otherAmount : otherAmount,
		otherPay : otherAmount,
		chargesSlaveId : company_Id,
		sourceTypeId : sourceTypeId,
		emrPer : emrPer,
		sponsorId : 1,
		dctor_id_ot:doctorlist
		
	        
	    });
	//return serviceDetailsOT ;
}
function getchargesOfot(id,callfrom){


	var treatmentoperationid= $("#treatmentoperationid").val();
	 var y = document.getElementById("scheduledProcedure");
	 var count1=y.options.length;
	    var operationid="";

	    for ( var j = 0; j < y.options.length; j++) {
	    	operationid=operationid + "," + y.options[j].value  ;
		       // alert(operationid);
		     	}
		 var    otProcedure = operationid.slice(1);
	var unit =$("#unitid").val() ;
	var unitlist=""; 
	var depdocdeskid = 2;
    var opcid   =  $("#opgrade").val();
	var treatmentId  =  $("#tr_Id").val(); 
//	var scheduledProcedure = $("#departmentOT").val();
	var scheduledProcedure = $("#opgrade").val();
	var findingName=id.trim();
	
	 if(findingName==null || findingName==""||findingName==undefined){
	    	return false;
	    }
	var inputs = [];
	inputs.push('findingName=' + findingName);
   	inputs.push('TrId=' + treatmentId);
	inputs.push('pId=' + opcid);
	inputs.push('scheduledProcedure=' + scheduledProcedure);
	inputs.push('unit=' + 1);
	inputs.push('depdocdeskid=' + depdocdeskid);
	inputs.push('chargesOS=' +  $("#chargesOS").val());
	inputs.push('count1=' + count1);
	inputs.push('treatmentoperationid=' + treatmentoperationid);
	inputs.push('otProcedure=' + otProcedure);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
	//	url : "ehat/ot/hallwiseOPchargeOT",
		url : "ehat/ot/operationchargeNew",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
		//alert(r);
	     	 if ($("#emrChrFlag").is(":checked")) {
	     	    var emrPer =$("#emrPer").val();
	     	    var charges=parseFloat(r) ;
	     	    var finalcharges= charges * emrPer /100;
	     	  
	     	    var finalchargesaddtional =charges +  finalcharges;
	     	    r=finalchargesaddtional;
	     		//alert(r);
	     	 }
     if(callfrom=="M"){
    	 $("#mainsurgancharg").val(r);
     }else if(callfrom=="A"){
    	 $("#assisuragncharge").val(r);
    	 
     }else if(callfrom=="AN"){
    	 $("#anetheisacharge").val(r);
     }else if(callfrom=="OR"){
    	 $("#OTRentcharg").val(r);
     }else if(callfrom=="PR"){
    	 $("#PreAnethesiaCHARGE").val(r);
     }else if(callfrom=="OI"){
    	 $("#OTinstrumentcharge").val(r);
     }
    
		}
	});
	
	

}

function fetchipdbilldetailsOC(tabname){
	
	$("#callfrom").val("otCharges");
	var tID  = $("#tr_Id").val(); 
	
	var treatmentoperationid= $("#treatmentoperationid").val();
	if(tID==0){
		
	//	return false;
		
	}
	 var callform = tabname;
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchipdbilldetails",
		data	: {
			"tID"        : tID,
			"callform"   :callform,
			"treatmentoperationid":treatmentoperationid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			/*alert(response.cpoeServdetails.length);*/
			 testRowCountcpoeOT = 1;
			 if(callform=="OC"){
				    /*$("#tOTcharge").setTemplate(servicedetailsOTC);
					$("#tOTcharge").processTemplate(response);*/
				 
					$("#txtOserv").val("");
					/*$("#cathQty").val(1);*/
				//	$("#unlId").val(0);
					$("#txtOservamt").val(1);
				  //  var unitId=$("#unitId").val();	
				//	$("#unlId").val(unitId);
							 
				 servicedetailsOTC(response);  
			 }else{
				  $("#tcpoeservices").setTemplate(servicedetailsOT);
					$("#tcpoeservices").processTemplate(response);   
			 }			
		}
		
	});
	
}
function fetchipdbilldetailsOT(tabname){
	
	$("#callfrom").val("otCharges");
	var tID  = $("#tr_Id").val(); 
	
	var treatmentoperationid= $("#treatmentoperationid").val();
	if(tID==0){
		
	//	return false;
		
	}
	
	
    var callform = tabname;
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/doctordesk/fetchipdbilldetails",
		data	: {
			"tID"        : tID,
			"callform"   :callform,
			"treatmentoperationid":treatmentoperationid
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			/*alert(response.cpoeServdetails.length);*/
			 testRowCountcpoeOT = 1;
			 for( var i = 0; i < response.cpoedetails.length; i++){
				 
					//alert(callfrom +"=="+ r);
			     if(response.cpoedetails[i].categoryid==$("#MainSurgan").val()){
			    	 $("#billidmainsurgan").val(response.cpoedetails[i].billipd_id);
			     }else if(response.cpoedetails[i].categoryid==$("#AsistanSurgan").val()){
			    	 $("#billidassisuragnc").val(response.cpoedetails[i].billipd_id);
			    	 
			     }else if(response.cpoedetails[i].categoryid==$("#Anethesia").val()){
			    	 $("#billidanetheisa").val(response.cpoedetails[i].billipd_id);
			     }else if(response.cpoedetails[i].categoryid==$("#PreAnethesia").val()){
			    	 $("#billidPreAnethesia").val(response.cpoedetails[i].billipd_id);
			     }else if(response.cpoedetails[i].categoryid==$("#OTRent").val()){
			    	 $("#billidOTRent").val(response.cpoedetails[i].billipd_id);
			     }else if(response.cpoedetails[i].categoryid==$("#OTinstrument").val()){
			    	 $("#billidOTinstrument").val(response.cpoedetails[i].billipd_id);
			     }
			    
			 }
				
		}
		
	});
	
}

function hallwisechargeOTSurganwise(callfrom){
    var y = document.getElementById("scheduledProcedure");
    var operationid="";
    for ( var j = 0; j < y.options.length; j++) {
    	operationid=operationid + "," + y.options[j].value  ;
	       // alert(operationid);
	     	}
	 var    otProcedure = operationid.slice(1);
    var opcid              =  0;
	var treatmentId        =  $("#tr_Id").val(); 
	var scheduledProcedure = otProcedure;
	var inputs = [];

   	inputs.push('TrId=' + treatmentId);
	inputs.push('pId=' + opcid);
	inputs.push('scheduledProcedure=' + scheduledProcedure);
	inputs.push('callfrom=' + callfrom);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/hallwisechargeOTSurganwise",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
			if(r==null || r=="" || r==undefined){
				 $("#chargesOS").val(0);
			}else{
				 $("#chargesOS").val(r);
			}

	}
	});
	
	
}

function getEmergancyChargesOTfinal() {
	
	
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/ot/getEmergancyChargesOTfinal",
		
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			$('#emrPer').val(response);
		}
	});
}

function uploadOTDoc(){

	var res = 0;
	var form = $('#otDocUploadfrm')[0];
	if( document.getElementById("ifile").files.length == 0 ){
	   alert("Please select file");
	   return false;
	}
	var fileName = document.getElementById("ifile").files[0].name;
	var data = new FormData(form);
	jQuery.ajax({                   
	   	 async : false,                   
	   	 type : "POST",
	   	 enctype: 'multipart/form-data',
	   	 processData: false,
	     contentType: false,
	   	 data : data,
	   	 url : "ehat/uploadOTDoc/uploadPreOpDoc",                   
	   	 timeout : 1000 * 60 * 5,                   
	   	 catche : false,                    
	   	 error : function() {                                            
	   		 alert("error");
	   	 },                   
	   	 success : function(r) {    
	   		 
	   		res = 1;
	   	}
	});
	 
	return res;
}

function fetchCustomizeTemplateListOT() {
	
	var inputs = [];
	
	inputs.push('departmentId=' + 2);//OT->OT ipd
	inputs.push('unitId=' + 1);
	inputs.push('selectTemplateType=' + 'o');
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/otdata/fetchCustomizeTemplateList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var divContent = "<option value='0'>select</option>";
           
            for ( var i = 0; i < r.pattemplist.length; i++){             
	                divContent = divContent + "<option value='" + r.pattemplist[i].idpattemp + "'  >"
	                        + r.pattemplist[i].tempname + "</option>";
            }
           
            $("#selCustomizeTemp").html(divContent);
            //$("#selCustomizeTemp").select2();
            $("#selCustomizeTemp").on("change", function () { 
            	getCustomizeTemplatesIDDischarge(); 
            });
		
		}
	});
}
function getCustomizeTemplatesIDDischarge() {
	
	var id = $("#selCustomizeTemp").val();
	if(id==""||id==null||id=="null"){
		$("#selCustomizeTemp").val(0);
		
		return false;
		id=0;
	}
	
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		url : "ehat/IPD_Discharge/gettemplatelistbytemplateid",
		data : str + "&reqType=AJAX",
		error : function() {
			alert('error');
		},
		success : function(r) {			
			
			//$("#idCustomizeTemplateci").val(r.idCustomizeTemplate);
			//$('#customizeTemplateNameci').val(r.temp_name);
			CKEDITOR.instances['editor1'].setData(r.tempdata);
			$('#customizeTemplateName').val(r.tempname);
		}
	});
	
}

function setDiagnosisAutocompleteNameDescpID(id, callform) {
	
	var resultData = [];
	var inputs = [];
	var diagoName = $("input#" + id).val();
	var radio = $("input:radio[name=ICD]:checked").val();
	inputs.push('callform=' + callform);
	inputs.push('diagoName=' + diagoName);
	inputs.push('diagoType=1');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/diagonosis/diagosAutoSuggestion",
		cache : false,
		success : function(response) {

			if (callform == "diagoname") {
				console.log("diagoname");
				//$("#callform").val(callform);
				setResponslistTodiagoNameOPD(response, id);
			}

			/*else if (callform == "diagodesc") {
				console.log("desc");
				$("#callformDigno").val(callform);
				setResponslistTodiagodesc(response, id);
			}

			else {
				console.log("else");
				$("#callformDigno").val(callform);
				setResponslistToIcdCode(response, id);
			}*/

		}

	});
}


function setResponslistTodiagoNameOPD(response, id) {

	var resultData = [];
	var template = "";
	for ( var j = 0; j < response.length; j++) {
		var arrValue = response[j].name_L;
		var idValue = response[j].idicd10_L;
		var pname = response[j].name_L;
		// console.log(arrValue + " " + idValue + " " + pname);
		//$("#diagoId").val(response[j].idicd10_L);
		resultData.push({
			ID : idValue,
			Name : pname
		});
		template = template + '<li data-value="' + idValue
				+ '" class=""><a href="#">' + arrValue + '</a></li>';
	}
	setTimeout(function() {
		$("#div"+id+" .typeahead").html(template);
		$("#div"+id+" .typeahead").show();

		$("#" + id).typeahead({
			source : resultData,
			displayField : 'Name',
			valueField : 'ID',
			onSelect : displayResult,
			scrollBar : true
		});
		$("#" + id).data('typeahead').source = resultData;
	}, 500);

	function displayResult(item) {
		var id = item.value;
		getDiagonosisByIdOPDDigno(id);
	}
}

function getDiagonosisByIdOPDDigno(id) {
	
	var callform = $("#callformDigno").val();
	var inputs = [];
	inputs.push('id=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/diagonosis/digoById",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			for ( var i = 0; i < r.length; i++) {
				$("#diagnosis").val(r[i].name_L1);
				$("#diagno_description").val(r[i].name_L1);
				$("#icd10_code").val(r[i].icd_code_L);
			}
		}
	});
}

/************
* @author	: Vinod Udawant
* @codeFor	: To get charges configured for sponsor
 ************/
function getSponsorTestChargesForOT(isComServlastId,serviceid) {
	
	var hallSlaveId = $("#hallSlaveId").val();
	var chargesSlaveId = $("#chargesSlaveId").val();
	var isComServId = $("#packageID").val();
	var unitId = $("#unitId").val();
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"chargesSlaveId" : chargesSlaveId,
			"hallSlaveId" : hallSlaveId,
			"isComServId" : isComServId,
			"isComServlastId" : isComServlastId,
			"serviceid" : serviceid,
			"unitId" : unitId,
		},
		url : "ehat/ipdtestautosuggest/getSponsorTestCharges",
		success : function(r) {
			r = r.lstSponsorTestChargesDto[0];
			$("#sponsorTestCharges").val(parseFloat(r.charges).toFixed(2));
			$("#yearWiseSponsorTestCharges").val(parseFloat(r.yearWiseCharges).toFixed(2));
		}
	});
}

function getPathologyPreDetailsOnOT(serviceId, subServiceId){

	var sex = $('#sex').text();
	var patientId = $('#pt_Id').val();
	var treatmentId = $('#tr_Id').val();
	var gender = 0;
	if (sex == "Male") {
		gender = 1;
	} else if (sex == "Female") {
		gender = 2;
	} else {
		gender = 3;
	}
	var callfrom = "ABC";

	jQuery
			.ajax({
				async : false,
				type : "GET",
				data : {
					"patientId" : encodeURIComponent(patientId),
					"treatmentId" : encodeURIComponent(treatmentId),
					"serviceId" : encodeURIComponent(serviceId),
					"subServiceId" : encodeURIComponent(subServiceId),
					"gender" : encodeURIComponent(gender),
					"callfrom" : encodeURIComponent(callfrom)
				},
				url : "ehat/phlebotomy/getpathologypredetails",
				error : function() {
					alert('Not coneected to server: Please check connections!');
				},
				success : function(r) {

					var heightCount = 0;
					var weightCount = 0;
					var urineVolumeCount = 0;
					var lmpCount = 0;
					var inHouse = 0;
					var outHouse = 0;
					var inOutHouseCount = 0;
					var sampleIdd = 0;

					var sponsorId = $("#SponsorsourceTypeId").val();
					var chargesSlaveId = $("#chargesSlaveId").val();

				
					if(r.labTestList.length > 0) {

						for ( var i = 0; i < r.labTestList.length; i++) {
							// START histopath test validation
							if (r.labTestList[i].histopathLab == "Y") {
								

								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									clearAllFieldsOfOpd();
								//	$("#perticular").focus();
									$("#txtautoserviceName").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {

									if (sponsorId >= 1 && chargesSlaveId > 0) {
										$('#sampleType').val(r.labTestList[i].sampleId);
										$('#sampleTypeOpdSponsor').val(r.labTestList[i].sampleId);
										
									} else {
										$('#sampleType').val(r.labTestList[i].sampleId);
										
									}
									$('#histopathLab').val(r.labTestList[i].histopathLab);
									sampleIdd = r.labTestList[i].sampleId;

									var processAtOutlab = (r.labTestList[i].processAtOutlab);
									if(processAtOutlab == "Y") {
										outHouse++;
									} else {
										inHouse++;
									}
								}
								// END histopath test validation
							} else {
								// START LIS test validation
								if(r.labTestList[i].callFrom == "Profile Already Present") {
									alert("Profile Already Present !");
									clearAllFieldsOfOpd();
									//$("#perticular").focus();
									$("#txtautoserviceName").focus();
									heightCount = 0;
									weightCount = 0;
									urineVolumeCount = 0;
									return false;
								} else {
									
								

										if(sponsorId >= 1
												&& chargesSlaveId > 0) {
											$('#sampleType').val(
													r.labTestList[i].sampleId);
											$('#sampleTypeOpdSponsor').val(
													r.labTestList[i].sampleId);
											
										} else {
											
											$('#sampleType').val(r.labTestList[i].sampleId);
											
										}

										sampleIdd = r.labTestList[i].sampleId;

										var processAtOutlab = (r.labTestList[i].processAtOutlab);
										if(processAtOutlab == "Y") {
											outHouse++;
										} else {
											inHouse++;
										}

										var prerequisite = (r.labTestList[i].prerequisite);
										// if (prerequisite == "Y") {
										var height = (r.labTestList[i].height);
										var weight = (r.labTestList[i].weight);
										var urineVolume = (r.labTestList[i].urineVolume);
										var lmpVolume = (r.labTestList[i].lmpStatus);

										if (height == "Y") {
											heightCount++;
										}
										if (weight == "Y") {
											weightCount++;
										}
										if (urineVolume == "Y") {
											urineVolumeCount++;
										}
										if (lmpVolume == "Y") {
											lmpCount++;
										}

								}
							}// END LIS test validation
						}

						// setting value of IN House Lab
						if(inHouse > 0 && outHouse > 0) {
							inOutHouseCount = 3;
						} else if (inHouse > 0) {
							inOutHouseCount = 1;
						} else if (outHouse > 0) {
							inOutHouseCount = 2;
						}
						//getBarcodeIdFromSampleWise(sampleIdd, inOutHouseCount);
						$('#inOutHouseCount').val(inOutHouseCount);// set count
																	// of In Out
																	// House

						//generatePrerequisitePopup(heightCount, weightCount,	urineVolumeCount, lmpCount);// Call For open
															// popup of
															// Prerequisite

					}else {
						alert("Test Not Available For This Gender Type OR Profile Not Configured ! !");
						clearAllFieldsOfOpd();
						heightCount = 0;
						weightCount = 0;
						urineVolumeCount = 0;
					//	$("#perticular").focus();
						$("#txtautoserviceName").focus();
						return false;

					}
				}
			});

}

function setPackageBarcodePopup(serviceId, subServiceId){
	var unitId = $("#unitId").val();
	var businessType = $("#businessType").val();
	var billDetailsId =$('#billDetailsId').val();
	var patientId = $('#pt_Id').val();
	var treatmentId = $('#tr_Id').val();

	var iscombination = $("#iscombination").val();

	if(iscombination == "Y"){
		var packageSampleTypeId = $("#packageDefaultSampleTypeId").val();
		if(packageSampleTypeId == 0){
			alert("Please add sample type for package.");
			closeAndResetBarcodePopup();
			return false;
		}else{
			$('#sampleType').val(packageSampleTypeId);
		}
	}
	
	$("#barcodeNo").val("NA");
	var checkDuplicate = checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId);
	if(checkDuplicate == "Package" || checkDuplicate == "Profile"){
		var msg = "";
		if(checkDuplicate == "Package"){
			msg = "Given package is already exists.";
		}else{
			msg = "Some of the tests are already exists.";
		}
		alert(msg);

		//closeAndResetBarcodePopup();
		
		return false;
	}
	
	var inputs = [];
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/getSampleWiseProfileFromPackage",
		success : function(r) {
			//resetBarcodePopup();
			//getDefaultBarcodeForPackage(serviceId, subServiceId, unitId, businessType, patienttId, treatmentId, billDetailsId);
			setTemplateForSampleWiseBarcode(r);
		}
	});
}

function setTemplateForSampleWiseBarcode(r){
	
	var htm = "";
	for(var i = 0; i < r.labSampleWiseMasterDtoList.length; i++){
		htm = htm
			+ '<tr class="">'
				+ ' <td class="col-md-1 center"><input type="hidden" id="barcodeSampleId'+(i+1)+'" value="0">'+(i+1)+'</td>'
				+ ' <td class="col-md-1 center">'+r.labSampleWiseMasterDtoList[i].samplename+'<input type="hidden" id="barcodeSampleName'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].sampleId+'"></td>'
				+ ' <td class="col-md-1 center" id="barcodeSampleTests'+i+'">'+r.labSampleWiseMasterDtoList[i].testName+'<input type="hidden" id="barcodeSampleTestsId'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].masterId+'"></td>'
				+ ' <td class="col-md-1 center" id="barcodeSampleNumber'+(i+1)+'"><input type="text" class="form-control" id="barcodeSampleNo'+(i+1)+'" onchange="barcodeValidation(this.id)" placeholder="Enter Barcode No" name="barcodeSampleNo'+(i+1)+'" value="'+r.labSampleWiseMasterDtoList[i].barCode+'" maxlength="14"></td>'
			+ '</tr>';
	}
	$("#sampleWiseBarcodeTableBody").append(htm);
	//$("#sampleWiseBarcode").modal('show');
}

function checkDuplicateServicesFromPackage(serviceId, subServiceId, unitId, businessType, patientId, treatmentId, billDetailsId){
	var response = "";
	var inputs = [];
		inputs.push('serviceId=' + serviceId);
		inputs.push('subServiceId=' + subServiceId);
		inputs.push('unitId=' + unitId);
		inputs.push('businessType=' + businessType);
		inputs.push('patientId=' + patientId);
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('billDetailsId=' + billDetailsId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/phlebotomy/checkDuplicateServicesFromPackage",
		success : function(r) {
			response = r;
		}
	});
	return response;
}

function readSampleWiseBarcodes(){
	var subList = {	labSampleWiseMasterDtoList : [] };
	var count = 0;
	var totalRow = $('#sampleWiseBarcodeTableBody tr').length;
	for(var i = 1; i <= totalRow; i++) {
		count++;
		var sampleTypeId = $("#barcodeSampleName" + count +"").val();
		var masterIds = $("#barcodeSampleTestsId" + count + "").val();
		var barcodeSampleNo = $("#barcodeSampleNo" + count + "").val();
		
		var subServiceIds = masterIds.split(",");
		
		if(subServiceIds.length > 1){
			for(var num = 0; num < subServiceIds.length; num++)
				subList.labSampleWiseMasterDtoList.push({
					subServiceId	: subServiceIds[num],
					sampleTypeId	: sampleTypeId,
					barCode       	: barcodeSampleNo
			});
		}else{
			subList.labSampleWiseMasterDtoList.push({
				subServiceId	: masterIds,
				sampleTypeId	: sampleTypeId,
				barCode       	: barcodeSampleNo
			});
		}
	}
	return subList;
}

function fetchipdbilldetailsOnOT(){
	var t = $("#treatmentId").text();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		
		data : {
			"treatmentId" : t,
			"serviceId" : 0
		},
		url : "ehat/opdServicesAdvised/getPatientSubServiceDetailsOnIPD",
		success : function(r) {
		
			//getSubServiceDetailsTemp1(i, r, s);
			setSubServiceDetailsOnIPD(r);
		
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function setSubServiceDetailsOnIPD(r){
	
	 var chargesSlaveId=$("#chargesSlaveId").val();
	 var tomId=$("#tomId").val();
	 
	
	$("#tOTcharge").html("");
	var htm = "";
	var rowCount = 0;
	
	if (r.listSubServiceIpdDto.length > 0) {
		
		for ( var i = 0; i < r.listSubServiceIpdDto.length; i++) {
			  
					if(r.listSubServiceIpdDto[i].otFlag == "Y" && r.listSubServiceIpdDto[i].drdeskflag != "P"  && r.listSubServiceIpdDto[i].drdeskflag != "I" && r.listSubServiceIpdDto[i].serviceId != 11 ){
					
				if(tomId==r.listSubServiceIpdDto[i].count_ot){		
					var datetime12= new Date(r.listSubServiceIpdDto[i].createdDate).toLocaleDateString('en-GB');
					
					rowCount++;
					
					htm = htm
					+'<tr>'
					+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
					+ '<input id="chkOpdBill'+r.listSubServiceIpdDto[i].billDetailsId+'" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listSubServiceIpdDto[i].billDetailsId+'></input></td>'
					
					+ '<td class="col-md-1-1 center" >'+rowCount+'</td>'
					
				    + '<td class="col-md-1-1 center"> '+r.listSubServiceIpdDto[i].docName+' </td>'
				    
				    + '<td class="col-md-1-1 center"> '+r.listSubServiceIpdDto[i].oname+' </td>'
					
					+ '<td class="col-md-2-1 center" style="height: 21.5px;"> '+r.listSubServiceIpdDto[i].categoryName+' </td>'
					
				+ '<td class="col-md-1-1 center" style="height: 21.5px;"> '+datetime12+' </td>'
					
					/*+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].docName+' </td>'*/
					
					/*+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].serviceName+' </td>'*/
					
					if(r.listSubServiceIpdDto[i].paidFlag =="Y"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: orange;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].paidFlag =="N"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: green;" disabled></input></td>'
					}
				
					htm = htm		
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success" onclick=editIpdServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'service\') ><i class="fa fa-edit"></i></button></td>'
					
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOTServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'Service\') ><i class="fa fa-trash-o"></i></button></td>'
				
				
					
					+ '<td style="display:none;" id="barCode'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					
					/*+	'<td style="display:none;" id="barCode'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].subServiceId+' </td>'
					
					+	'<td style="display:none;" id="spclId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].specialityId+' </td>'
					
					+	'<td style="display:none;" id="dId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].docId+' </td>'
					
					+	'<td style="display:none;" id="sId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].serviceId+' </td>'
									
					+	'<td style="display:none;" id="amt'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].amount+' </td>'
					
					+	'<td style="display:none;" id="isCombination'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].isCombination+' </td>'
					
					+	'<td style="display:none;" id="emrP'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].emrPer+' </td>'
					
					+	'<td style="display:none;" id="othRates'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].otherRate +' </td>'
					
					+	'<td style="display:none;" id="sndtolabflag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtolabflag+' </td>'
					
					+	'<td style="display:none;" id="sampleType'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sampleTypeId+' </td>'
					
					+	'<td style="display:none;" id="barCodeId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" id="inOutHouse'+(r.listBillNobleServiceDto[i].billDetailsId)+'">'+ r.listBillNobleServiceDto[i].inOutHouse+'</td>'
					
					+	'<td style="display:none;" id="histopathLab'+(r.listBillNobleServiceDto[i].billDetailsId)+'">'+ r.listBillNobleServiceDto[i].histopathLab+'</td>'
					
					+	'<td style="display:none;" id="collectionDate'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionDate+' </td>'
					
					+	'<td style="display:none;" id="collectionTime'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionTime+' </td>'
		
					+	'<td style="display:none;" id="regRefDocId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
		
					// added by vinod
					+	'<td style="display:none;" id="sendToRisId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtorisflag +' </td>'
					
					// added by vinod
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].templateWise +' </td>'
					
					+	'<td style="display:none;" id="payFlag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].paidFlag+' </td>';*/
				
					+'<td style="display:none;" id="sId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].serviceId+' </td>'
					+	'<td style="display:none;" id="spclId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].specialityId+' </td>'
					+	'<td style="display:none;" id="sampleType'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].sampleTypeId+' </td>'
					+	'<td style="display:none;" id="barCodeId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="inOutHouse'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].inOutHouse+'</td>'
					+	'<td style="display:none;" id="histopathLab'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].histopathLab+'</td>'
					+	'<td style="display:none;" id="collectionDate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionDate+' </td>'
					+	'<td style="display:none;" id="collectionTime'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionTime+' </td>'
					+	'<td style="display:none;" id="regRefDocId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].templateWise +' </td>'
					+	'<td style="display:none;" id="isCombination'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].iscombination +' </td>'
					+	'<td style="display:none;" id="othIpdRate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].otherRate +' </td>'
					+	'<td style="display:none;" id="catName'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].categoryName +' </td>'
					+	'<td style="display:none;" id="opNameOC'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].oname +' </td>'
					+	'<td style="display:none;" id="dId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].docId+' </td>'
					if (chargesSlaveId > 0) {
						htm = htm	+ '<td style="display:none;" id="amt' + r.listSubServiceIpdDto[i].billDetailsId + '"> ' + r.listSubServiceIpdDto[i].otherAmount + ' </td>';
					} else {
						htm = htm	+ '<td style="display:none;" id="amt' + r.listSubServiceIpdDto[i].billDetailsId + '"> ' + r.listSubServiceIpdDto[i].amount + ' </td>';
					}
					htm = htm	
					+	'<td style="display:none;" id="emrP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].emrPer+' </td>'
					+	'<td style="display:none;" id="char'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].rate).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="q'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].quantity+' </td>'
					+	'<td style="display:none;" id="subserviceid'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].subServiceId+' </td>'
					+	'<td style="display:none;" id="cP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].coPay).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="con'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concession).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="conPer'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concessionPer).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="instruction'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].instructions)+' </td>'
					+	'<td style="display:none;" id="clinicalNote'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].clinical_notes)+' </td>'
						+ '</tr>';
				
				}
			}
			
		}
		
		$("#tOTcharge").html(htm);
	}

}

function getIpdPatientHeaderInfo(treatmentId){

	var unitId = $("#unitid").val();
		
	var inputs = [];
	inputs.push('treatmentId=' + encodeURIComponent(treatmentId));
	inputs.push('unitId=' + encodeURIComponent(unitId));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getIpdPatientHeaderInfo",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			

			//	alert("r.listRegTreBillDto[1].docName>>"+r.listRegTreBillDto[1].docName);
				// setTempPatientRecords(r);
				
				 $("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
				 $("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
	  			 /*****Added By Sagar******/
				//	getSponsorRecords(r.listRegTreBillDto[0].chargesMasterSlaveId,r.listRegTreBillDto[0].sourceTypeId);
			//	var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString();
				 var dateTime=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString();
				 var createdDateTime = (dateTime.split(",")[0]).split('/');
				 var time1=dateTime.split(",")[1].split(':');;
				 var time=time1[0]+':'+time1[1];
				 
				 var date = createdDateTime[1]+'/'+createdDateTime[0]+'/'+createdDateTime[2]+ ','+time;
				
				
	 			/* alert(); */
				$("#patientId").text(r.listRegTreBillDto[0].patientId);
				$("#pId").text(r.listRegTreBillDto[0].centerPatientId);
				$("#pt_Id").val(r.listRegTreBillDto[0].patientId);
				$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
				$("#pid").val(r.listRegTreBillDto[0].patientId);
	 			$("#age").text(r.listRegTreBillDto[0].age);
				$("#patientName").text(r.listRegTreBillDto[0].patientName );
				 $("#pname").text(r.listRegTreBillDto[0].patientName );
				 $("#mrnID").val(r.listRegTreBillDto[0].mrnno );
				 
			    $("#billNo").text(r.listRegTreBillDto[0].invoiceCount);
			    $("#bill_Id").val(r.listRegTreBillDto[0].billId); 
			    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
			   // $("#consultingDoctor").text(r.listRegTreBillDto[0].invoiceCount);
			    $("#consultingDocName").text(r.listRegTreBillDto[0].consultingDocName);
			    //****hidden set for bmi****//
			    $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
				$("#weight1").val(r.listRegTreBillDto[0].weight) ;
	 			$("#height1").val(r.listRegTreBillDto[0].height) ;
	 			
	 			$("#h_w").text(r.listRegTreBillDto[0].height+" / "+r.listRegTreBillDto[0].weight) ;
			   
			    $("#drid").val(r.listRegTreBillDto[0].doctorId);	
			    $("#sex").text(r.listRegTreBillDto[0].gender);
			    $("#ipdNo").text(r.listRegTreBillDto[0].trcount);
	 			$("#refDoctor").text(r.listRegTreBillDto[0].docNameChan); 
	 			//$("#dod").text(r.listRegTreBillDto[0].dischargeDate); 
	 			//By Pooja Sukre
	 			if(r.listRegTreBillDto[0].chargesMasterSlaveId > 0)
					$("#billCategoty").text("Sponsor");
				else
					$("#billCategoty").text("Self");
	 			
	 			$("#corporate").text(r.listRegTreBillDto[0].categoryName);
	 			  $("#doa").text(date);
	 				$("#hallTypeId").val(r.listRegTreBillDto[0].hallTypeId);
				  	$("#hallId").val(r.listRegTreBillDto[0].hallId);
				  	$("#hallSlaveId").val(r.listRegTreBillDto[0].hallId);
	 			$("#deptId").val(r.listRegTreBillDto[0].departmentId);
				$("#pId").val(r.listRegTreBillDto[0].patientId);
				$("#PiD").val(r.listRegTreBillDto[0].patientId);	
				$("#pt_Id").val(r.listRegTreBillDto[0].patientId);
				$("#bId").val(r.listRegTreBillDto[0].billId);
				$("#tId").val(r.listRegTreBillDto[0].treatmentId);
				$("#tr_Id").val(r.listRegTreBillDto[0].treatmentId);
				$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
				$("#sId").val(r.listRegTreBillDto[0].serviceId);
	 			
			 	if(r.listRegTreBillDto[0].dischargeDate!="-" && r.listRegTreBillDto[0].dischargeDate!=null && r.listRegTreBillDto[0].dischargeDate!=""){
			 		 var dateTime=new Date(r.listRegTreBillDto[0].dischargeDate).toLocaleString();
					 var createdDateTime = (dateTime.split(",")[0]).split('/');
					 var datetime = createdDateTime[1]+'/'+createdDateTime[0]+'/'+createdDateTime[2];
			  	//	var dischargeDate= new Date(r.listRegTreBillDto[0].dischargeDate).toLocaleString();
					  	$("#dod").text((datetime)+", "+r.listRegTreBillDto[0].dischargeTime);
			  	}else{
			  		$("#dod").text("-");
			  	}
	 			
	 			/*if(r.listRegTreBillDto[0].sourceTypeId>1){
	 				sponsorTypeList(r.listRegTreBillDto[0].sourceTypeId);
	 				$("#billCategoty").text(r.listRegTreBillDto[0].categoryName);
	 			}else{
					$("#billCategoty").text("Self");
					$("#corporate").text("-");
					$("#billCat").val(r.listRegTreBillDto[0].sourceTypeId);

				}*/
				  $("#ipdNo").text(r.listRegTreBillDto[0].opdipdno);
	 			
	 			 
				  var fileName=r.listRegTreBillDto[0].imageName;	
				  if(fileName!="" && fileName!=null && fileName!=undefined){
					  $('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
				  }
				  $("#physicalDisFlag").val(r.listRegTreBillDto[0].physicalDisFlag);
				
				  $("#customerType").val(r.listRegTreBillDto[0].customerType);
				  $("#customerId").val(r.listRegTreBillDto[0].customerId);
			
	 		/*if(r.listRegTreBillDto[0]!=undefined || r.listRegTreBillDto[0]!=null){
				
	 			var date=new Date(r.listRegTreBillDto[0].createdDateTime).toLocaleString('en-GB');			
				var dd=date.split(',');
	  			$("#dtofadmission").text(dd[0]);
	  			$("#OpdIpdNo").val(r.listRegTreBillDto[0].trcount);
	  			$("#ptName").val(r.listRegTreBillDto[0].patientName);
	  			$("#corporate").text(r.listRegTreBillDto[0].categoryName);
	  			$("#idForDisc").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
	  			$("#isPpn").val(r.listRegTreBillDto[0].isPpn);
	  			$("#numbr").val(r.listRegTreBillDto[0].numbr);
	  			
	  			if(r.listRegTreBillDto[0].isPpn == "Y"){
	  				$('#ppn').show();
	  				$("#ppnNumber").html(r.listRegTreBillDto[0].numbr);
	  				$('#ppnNumber').show();
	  			}
				
				var fileName=r.listRegTreBillDto[0].imageName;	
				$('#patImg').attr('src','pharmacy/pharmacy/readImage?url='+ fileName);
				$("#genInvoiceFlag").val(r.listRegTreBillDto[0].invoiceFlag);
				$("#age").text(r.listRegTreBillDto[0].age);
				$("#patientName").text(r.listRegTreBillDto[0].patientName );
				$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
			    $("#billNo").text(r.listRegTreBillDto[0].billId);
			    $("#depdocdeskid").val(r.listRegTreBillDto[0].departmentId);
			    $("#consultingDoctorr").text(r.listRegTreBillDto[0].consultingDocName);
			    $("#drid").val(r.listRegTreBillDto[0].doctorId);
			    $("#pid").val(r.listRegTreBillDto[0].patientId);
			    $("#dbirth").val(r.listRegTreBillDto[0].dob) ;
	 		   	$("#weight1").val(r.listRegTreBillDto[0].weight) ;
	 		   	$("#height1").val(r.listRegTreBillDto[0].height) ;
				$("#sex").text(r.listRegTreBillDto[0].gender);
				$("#deptId").val(r.listRegTreBillDto[0].departmentId);
				$("#pId").val(r.listRegTreBillDto[0].patientId);
				$("#PiD").val(r.listRegTreBillDto[0].patientId);			
				$("#bId").val(r.listRegTreBillDto[0].billId);
				$("#tId").val(r.listRegTreBillDto[0].treatmentId);
				$("#treatmentId").html(r.listRegTreBillDto[0].treatmentId);
				$("#sId").val(r.listRegTreBillDto[0].serviceId);
				
				if(r.listRegTreBillDto[0].chargesMasterSlaveId > 0)
					$("#billCategoty").text("Sponsor");
				else
					$("#billCategoty").text("Self");
				
				$("#corporate").text(r.listRegTreBillDto[0].categoryName);
	  			$("#ipdNo").text(r.listRegTreBillDto[0].trcount);
	  			$("#ipdNumber").val(r.listRegTreBillDto[0].trcount);
	 			$("#doa").text(date);
	 			$("#SponsorsourceTypeId").val(r.listRegTreBillDto[0].sourceTypeId);
				$("#chargesSlaveId").val(r.listRegTreBillDto[0].chargesMasterSlaveId);
				$("#pt_Id").val(r.listRegTreBillDto[0].patientId);
				$("#bill_Id").val(r.listRegTreBillDto[0].billId);
				$("#refDocId").val(r.listRegTreBillDto[0].refDocId);
				$("#patientId").text(r.listRegTreBillDto[0].patientId);	
				//$("#consultingDoctor").text('');//r.listRegTreBillDto[0].invoiceCount			  
				$("#consultingDoctor").text(r.listRegTreBillDto[0].invoiceCount);
				$("#prnId").text(r.listRegTreBillDto[0].patientId);
				$("#preBillId").text(r.listRegTreBillDto[0].invoiceCount);			  
				$("#centerPatientId").text(r.listRegTreBillDto[0].centerPatientId);
				$("#centeripdID").text(r.listRegTreBillDto[0].centerPatientId);
				$("#refDoctor").text(r.listRegTreBillDto[0].refDocName);
			  	$("#tFlag").val(r.listRegTreBillDto[0].tFlag);
	
			  	if(r.listRegTreBillDto[0].dischargeDate!="-" && r.listRegTreBillDto[0].dischargeDate!=null && r.listRegTreBillDto[0].dischargeDate!=""){
			  		var dischargeDate= new Date(r.listRegTreBillDto[0].dischargeDate).toLocaleString();
				  	$("#dod").text((dischargeDate).split(",")[0]+", "+r.listRegTreBillDto[0].dischargeTime);
			  	}else{
			  		$("#dod").text("-");
			  	}
			  	
			  	$("#physicalDisFlag").val(r.listRegTreBillDto[0].physicalDisFlag);
			  	$("#mrn").val(r.listRegTreBillDto[0].mrnno);
			  	$("#hallTypeId").val(r.listRegTreBillDto[0].hallTypeId);
			  	$("#hallId").val(r.listRegTreBillDto[0].hallId);
			  	$("#hallSlaveId").val(r.listRegTreBillDto[0].hallId);
			  	$("#bedId").val(r.listRegTreBillDto[0].bedId);
			  	$("#treatBedsId").val(r.listRegTreBillDto[0].treatBedsId);
			  	$("#hallName").text(r.listRegTreBillDto[0].hallName);
			  	var dod = r.listRegTreBillDto[0].dischargeDate;
			  	var tod = r.listRegTreBillDto[0].dischargeTime;
			  	$("#dod").text(dod +" "+tod);
	 		}*/
 		}
	});
}

/************
 *@author	: Akshata Desai
 *@code		:autosuggestion
 ***********/

function autoSuggestionForPateintNameForOt(inputID, typeauto) {
var typeOfpatient = $('input[name="typeOfpatient"]:checked').val();

//alert(typeOfpatient);
var inputs = [];

if (typeOfpatient == "diagnosis") {
	inputs.push('isEdit=yes');
}

var resultData = [];
var txtVal1 = $('#' + inputID).val();

	inputs.push('patientName=' + txtVal1);
	inputs.push('typeOfpatient=' + typeOfpatient);

	var str = inputs.join('&');

	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "ehat/otdata/fetchPateintNameAutosugg",
				url : "./pharmacy/patientSale/fetchPharmaPatientNameAutoSuggest",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(r) {
					//alert(r);
					//alert(r.length);
					var availableTags = [];
					if (r.length == 37) {
						alert("NO MATCHING FOUND Please Enter Valid Patient Name !");
						$("#txtPatientName").val('');
						$("#txtPatientName").focus();

					} else {

						//ajaxResponse = eval('(' + r + ')');

						for (var i = 0; i < r.length; i++) {

							availableTags
									.push(r[i].f_name
											+ " "
											+ r[i].m_name
											+ " "
											+ r[i].l_name	
											+ "_"
											+ r[i].patientId
											+ "_"
											+ r[i].treatmentId);
						}

						// availableTags = ajaxResponse.split("\n");

						var template = "";
						for (var j = 0; j < availableTags.length; j++) {

							// alert(availableTags[j]);

							var arrValue = (availableTags[j]).split("__");
							var idValue = (arrValue[0]);
							resultData.push({
								ID : idValue,
								Name : arrValue[1]
							});
							// alert("resultData====>"+resultData[0]);
							template = template + '<li data-value="'
									+ (arrValue[1])
									+ '" class=""><a href="#">'
									+ arrValue[0] + '</a></li>';

						}

						$("#div" + inputID + " .typeahead").html(template);
						if (typeauto != 'onload') {
							$("#div" + inputID + " .typeahead").show();
						}

						setTimeout(function() {
							$('#' + inputID).typeahead({
								source : resultData,
								displayField : 'Name',
								valueField : 'ID',
								onSelect : displayResult1,
								scrollBar : true

							});

						}, 500);
					}
				}
			});

	function displayResult1(item) {

		var pidTip = (item.text).split("_");
		// alert(item.text);
		var pid = pidTip[1];
		var tid = pidTip[2];
		//var referedTo = pidTip[3];
		$('#' + inputID).val(item.text);

		$("#txtPatientId").val(pid);
		$("#txtPatientTreatmentId").val(tid);
		//$("#referedTo").val(referedTo);
	}


}


function saveMangeOperationByButton(){

	var date = new Date();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var start = $("#txtStartTime").val();
	var end = $("#txtEndTime").val();

	var str = start.split(":");
	if (str[0] == "" && end == "") {
		alert("Please select Start Time and End Time.");
		SetFocus("txtStartTime");
		return false;
	} else if (start == "") {
		alert("Please Select Start Time");
		SetFocus("txtStartTime");
		return false;
	} else if (end == "") {
		alert("Please Select End Time");
		SetFocus("txtEndTime");
		return false;
	} else if (start == end) {
		alert("Start Time and End Time can not be same....!Please Select Proper End Time");
		SetFocus("txtEndTime");
		return false;
	} else if (str[0] < hour) {
		// alert("Wrong Time...! Please select current time.");
		// SetFocus("timeFrom");
		// return false;
	} else if (str[0] == hour && str[1] < minute) {
		// alert("");
		// SetFocus("timeFrom");
	}

	if (start.length == 5) {
		$("#txtStartTime").val(($("#txtStartTime").val() + ":00"));
	}
	if (end.length == 5) {
		$("#txtEndTime").val(($("#txtEndTime").val() + ":00"));
	}

	// alert(start.length);
	// return false;
	
	scheduleMangeOperation(start, end, "Button");
}

function scheduleMangeOperation(start, end, type) 
{
	
		var dateCheck = new Date();

		var dd = dateCheck.getDate();
		dd = dd.toString();

		var mm = dateCheck.getMonth() + 1;
		mm = mm.toString();

		var yyyy = dateCheck.getFullYear();

		if (mm.length == 1) 
		{
			mm = "0" + mm;
		}

		if (dd.length == 1) 
		{
			dd = "0" + dd;
		}

		dateCheck = new Date(yyyy + "-" + mm + "-" + dd);

	

		var date = $("#popup_container2").val();
		

		/*var month = (date.getMonth() + 1);

		if (month.toString().length == 1) {
			month = "0" + month;
		}

		var dateNo = (date.getDate());
		if (dateNo.toString().length == 1) {
			dateNo = "0" + dateNo;
		}

		date = (dateNo + '/' + month + '/' + date.getFullYear());*/
		var otName = $("#otName").val();
		var selOTtype = $("#selOTtype").val();
		var department = $("#department").val();
		var selOTName = $("#selOTName").val();
		var opgrade = $("#opgrade").val();
		if(opgrade==null || opgrade==""||opgrade== undefined ){
			
			opgrade==0;
			
		}
		//var duration = $("#durationHrs").val() + ":" + $("#durationMin").val();
		var startTime = $("#txtStartTime").val();
		var endTime = $("#txtEndTime").val();

		var scheduledProcedure = '';// =$("#scheduledProcedure").val();
		var otProcedure="-";
		var y = document.getElementById("scheduledProcedure");
		/*for ( var j = 0; j < y.options.length; j++) {
			scheduledProcedure = scheduledProcedure + "#" + y.options[j].value
					+ "@" + y.options[j].text;
		}*/
		
		
		 for ( var j = 0; j < y.options.length; j++) {
		        scheduledProcedure=scheduledProcedure + "," + y.options[j].value  ;
		     	}
		      //  otProcedure = scheduledProcedure.slice(1);
		  otProcedure = scheduledProcedure.slice(1);
				
		
		var remark = $("#remark").val();
		var precaution = $("#precaution").val();

		//var emrChrFlag = $("#emrChrFlag").val();
		if($("#emrChrFlag").is(":checked")){
			
			priority = "Y";
		}
		else{
			priority = "N";
		}
		
		
		
		//var priority = $("input[name='radios']:checked").val();
		/*if (priority == "radioRegular") {
			priority = "N";
		} else {
			priority = "Y";
		}*/
		
		var infectionFlag;
		if ($('#infectFlag').is(":checked")) {
			infectionFlag = 'Y';
		} else {
			infectionFlag = 'N';
		}
		var criticalFlag;
		if ($('#criticalFlag').is(":checked")) {
			criticalFlag = 'Y';
		} else {
			criticalFlag = 'N';
		}
		
		
		var OperationCharge;
		if ($('#opCharge1').is(":checked")) { //	if ($('#opCharge' + x).is(":checked")) {
			OperationCharge = '1';
		} else {
			OperationCharge = '0';
		}
	
		var surgeryDescription = $("#surgeryDescription").val();
		var indicationForSurgery = $("#indicationForSurgery").val();

		var teamNameList = $("#teanNameList").val();
		var x = document.getElementById("teamMembersList");
		var teamMemberCount = $("#teamMemberCount").val();
		var anesthesiaType = $("#anesthesiaType").val();
		//var type = $("input[name='radios1']:checked").val();
		var mrnNo = $("#pt_Id").val();
	//	var queryType = $("#queryType").val();
//
//		if (mrnNo == "") {
//			alert("Please Select Patient Name");
//			return false;
//		}
		
	 if (teamMemberCount == 0) {
		alert("Please select Surgery team");
		return false;
	} else if (anesthesiaType == 0) {
		alert("Please Select Anaesthesia Type");
		return false;
	} else if (otName == 0) {
		alert("Please Select OT Name");
		return false;
	}

	//var tropid = $("#txtCathNo1").val();
	 
	 var tropid = $("#topId").val();   // change and added by Rohini 
	 
	 var ohr1 = $("#ohr1").val();
	 var chr1 = $("#chr1").val();
	 var obp1 = $("#obp1").val();
	 var cbp1 = $("#cbp1").val();	 
	var tropmanageid = $("#tomId").val();
	
//	var trid = $("#trid").val();

//	var bookedBy = $("#userId").val();
//	var suggestedBy = $("#suggestedBy").val();
	
	var otherReference = $("#otherReference").val();
	var contactOfReference = $("#contactOfReference").val();
	var emailOfReference = $("#emailOfReference").val();
	
	var unitId = $("unitId").val();

		var objTreatmentOperation = {
			otid : otName,
			op_type : selOTtype,
			department : department,
			// oi :selOTName,
			infectionFlag : infectionFlag,
			criticalFlag :	criticalFlag,
			date : date,
			startTime : startTime,
			endTime : endTime,
			//bookedBy : bookedBy,
		//	scheduledProcedure : scheduledProcedure,
			scheduledProcedure : otProcedure,
			remark : remark,
			precaution : precaution,
		//	suggestedBy : suggestedBy,
			emergencyFlag : priority,
			surgeryDescription : surgeryDescription,
			indicationForSurgery : indicationForSurgery,
			teamId : teamNameList,
			anesthesiaType : anesthesiaType,
			listOperationDoc : [],
			patientId : mrnNo,
			id : tropid,
			treatmentOperationsManageID : tropmanageid,
			otherReference : otherReference,
			contactOfReference : contactOfReference,
			emailOfReference : emailOfReference,
			opcat:opgrade,
			unitId:unitId,
			ohr : ohr1, // added by Rohini
			chr : chr1,
			obp : obp1,
			cbp   : cbp1,
			operationCharge : OperationCharge
			
		};

		
		
		for ( var i = 1; i <= teamMemberCount; i++) {
			// alert(x.options[i].value);
			var docId = $("#idUser" + i).val();// alert(docId);
			var docNameT = $("#docNameT" + i).text();
			var usertype = $("#userType" + i).text();
			var surgeontype = $("#docTypeT" + i).text();
			var mobile = $("#docmobile" + i).text();
			if (docId != null && docId != "" && docId != undefined) 
			{
				objTreatmentOperation.listOperationDoc.push({
					"docId" : docId,
					"docName" : docNameT,
					"docType" : usertype,
					"surgeonType" : surgeontype,
					"narration" : mobile
				});
			}
		}

		objTreatmentOperation = JSON.stringify(objTreatmentOperation);

		var inputs = [];
		inputs.push('action=scheduleMangeOperation');
		inputs.push('objTreatmentOperation='
				+ encodeURIComponent(objTreatmentOperation));
		//inputs.push('queryType=' + encodeURIComponent(queryType));
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "./ehat/otdata/scheduleMangeOperation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {

			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				//window.location.href = "operation.jsp";
				window.location.reload(true);
			}
		});
		
}

function getPercentageDetails(subserviceId) {
	var result=0;
	var inputs = [];
	inputs.push('subserviceId=' + subserviceId);
	inputs.push('unitId=' + 1);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/getPercentageDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			result=r;
		}
	});
	return result;
}




function deleteOTServicesAdvised(values, callform) {
	
	var labservicelist=[];
	var labList =[];
	
	var treatId = $('#tr_Id').val();
	var userId = $('#userId').val();
	var userId = 1;
	var deleteType = "Y";
	if (values == 'multiple') {

	/*	$.each($('#chkunserv:checked'), function() {
			labservicelist = labservicelist + "," + $(this).val();
		});*/
		
		 $('input[name=opdBillCheckbox]:checked').each( function(){
			//	id = $(this).val();
			 //labList = labList + "," + $(this).val();
			 labservicelist.push(parseInt($(this).val()));
			 labList.push(parseInt($(this).val()));
			});
		

		if (labList.length == 0) {

			alert("Please check  at least Service to delete");
			return false;

		}
		
		
		
		
	} else {
		//labservicelist = labservicelist + "," + values;
	//	labservicelist =  values;
		labservicelist.push(parseInt(values));
		//labList=values;
		 labList.push(parseInt(values));
		

	}
	
	deleteIpdLabTestFromOTServiceAdvice(labservicelist, treatId, deleteType);// to check pathology test sample collection

	if (deleteTestSmplColFlg == "Y") {
		alert("Test Sample are collected,You can't cancel or delete this Test.");
		return false;
	}


	deleteInvTestFromOTServiceAdvice(labservicelist, deleteType);
	if (risReportFlag == "Y") {
		alert("Test Report are created,You can't cancel or delete this Test.");
		return false;
	}

	var tk = labservicelist;
	labList = labList.toString()

	var r = confirm("Are You Sure You Want To  Delete Test ?");
	if (r == true) {

		jQuery.ajax({
			async : false,
			type : "POST",
			url : "ehat/opdServicesAdvised/deleteIpdServicesAdvised",
			data : {
				
				"labservicelist" : labList, 
				"userId" : userId
			},
			timeout : 1000 * 60 * 5,
			cache : false,

			success : function(r) {
				
				if(r==1){
					alert("Record Deleted SuccessFully");
					
					if(callform == "Service" || callform == "OT"){
						fetchipdbilldetailsOnOT();
					}else{
						getSubServiceDetailsOnCPOE();
					}
					return false;
				}else{
					alert("Network issuess...");
					
				}
				
			}

		});
	}
}


function deleteIpdLabTestFromOTServiceAdvice(billDetId, treatmentId, deleteType) {

	var deptId = $('#deptId').val();
	var billDId = billDetId.join(',');
//	var billDId = billDetId;
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancelLabTest",
		data : {

			"billDetId" : billDId,
			"cancleType" : deleteType,
			"deptId" : deptId,
		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {

			if (r == "0") {
				deleteTestSmplColFlg = "Y";
				return false;
			} else if (r == "-1") {
				alert("Network error...!");
				return false;
			} else if (r == "1") {
				deleteTestSmplColFlg = "N";
				// call for cancel service.
				// deletesIpdSrvDetails();
			}
		}

	});

}


function deleteInvTestFromOTServiceAdvice(labservicelist, deleteType) {

	var callform = "IpdBill";
	var deleteType = "N";
	var billDetailIds = labservicelist.join(',');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctordesk/cancelInvestigationTest",
		data : {

			"billDetId" : billDetailIds,
			"cancleType" : deleteType,
			"callform" : callform,

		},
		timeout : 1000 * 60 * 5,
		cache : false,

		success : function(r) {
			if (r == "0") {
				risReportFlag = "Y";
				return false;
			} else if (r == "-1") {
				alert("Network error...!");
				return false;
			} else if (r == "1") {
				risReportFlag = "N";
			}
		}

	});
}


function editIpdServicesAdvised(id,callFrom){
	editOnServicesOnOT(id,callFrom);
		
	

}


function editOnServicesOnOT(billDetailsId,callFrom) {

	$('#queryType').val('update');
	  var chargesSlaveId=  $("#chargesSlaveId").val();
	  var opNameOC = $('#opNameOC' + billDetailsId).text()
	//$('#billDetailsId').val(billDetailsId);
	
	$("#billidserviceOS").val(billDetailsId);

	$("#serviceidOS" ).val($('#sId' + billDetailsId).text());
     $("#subserviceidOS").val($('#subserviceid' + billDetailsId).text());// chargesId
     $("#txtOserv").val($('#catName' + billDetailsId).text());
	$("#txtOservamt").val($('#amt' + billDetailsId).text());
	
	$("#operationListId option:contains('" + opNameOC.trim() + "')").prop("selected", true);
    
	  
		$("#sampleType").val($('#sampleType' + billDetailsId).text());
		$('#inOutHouseCount').val($('#inOutHouse' + billDetailsId).text());
     $('#histopathLab').val($('#histopathLab' + billDetailsId).text());
     $('#templateWiseTestFlag').val($('#isTemplateWiseTest' + billDetailsId).text());
     $('#iscombinationIpd').val($('#isCombination' + billDetailsId).text());
     $('#serviceClinicalNotes').val($('#clinicalNote' + billDetailsId).text());
     $('#serviceIns').val($('#instruction' + billDetailsId).text());
     var doctorId=$('#dId' + billDetailsId).text();
     doctorId = doctorId.trim();
     $("#doctorNameOT").select2('val',doctorId);
     //$('#doctorNameOT option').prop('selected',doctorId);
     
	
	if(callFrom != "service"){
		$('#txtautoserviceName').val($('#catName' + billDetailsId).text());
		$('#OtRate').val($('#char' + billDetailsId).text());
		$('#OtQty').val($('#q' + billDetailsId).text());
		$('#OtAmt').val($('#amt' + billDetailsId).text());
		$('#doctor2').select2('val',doctorId);
		 fetchSuperCatOTOnCpoe($('#subserviceid' + billDetailsId).text());
	}else{
		 fetchSuperCatOT($('#subserviceid' + billDetailsId).text());
	}
	
	
	
	/*
	var chargesfromConf = $('#othIpdRate' + billDetailsId).text();
	$('#chargesfromConfIpd').val(chargesfromConf);
	var a = parseInt($('#sId' + billDetailsId).text());
	$('#servId').val(a).text();
	$("#serviceid").val(a);

	var subserviceid = parseInt($('#subserviceid' + billDetailsId).text());
	$("#subserviceid").val(subserviceid);
	var d = parseInt($('#dId' + billDetailsId).text());
	$('#doctor2').select2('val', d);
	$('#rate').val($('#char' + billDetailsId).text());
	$('#chargesubservice').val($('#char' + billDetailsId).text());// set the charges
	$('#sampleType').val($('#sampleType' + billDetailsId).text());// set sample type
	$('#qty').val($('#q' + billDetailsId).text());
	$('#concession').val($('#con' + billDetailsId).text());
	$('#concessionIpdPer').val($('#conPer' + billDetailsId).text());
	$('#amount').val($('#amt' + billDetailsId).text());
	$('#amount').attr('readonly', 'true');
	$('#pay').val(0);
	$('#coPay').val($('#cP' + billDetailsId).text());
	$('#drdeskflag').val($('#drdeskflag' + billDetailsId).text());
	var a = $('#otProcedureId' + billDetailsId).text();
	$('#otProcedureId').val(a);
	$("#narrationBill").val('narrationBill');
	$("#narrationBill").val('narrationBill');
	$('#rate2').val($('#char' + billDetailsId).text());
	var emrP = parseFloat($('#emrP' + billDetailsId).text());
	if (isNaN(emrP)) {
		emrP = 0;
	}

	$('#emrPer').val(emrP);
	if (emrP > 0 || emrP == 0) {
		
	}
	
	fetchSuperCatForBillng(subserviceid, "general");
	setServiceSuperCategoryOnIPD(subserviceid);*/
}

function getAllDoctorsListOnOTService() {
	var OperationManageId = $('#tomId').val(); 
	var inputs = [];
	inputs.push('OperationManageId=' + OperationManageId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
	//	url : "ehat/opdServicesAdvised/getAllDoctorsList",
		url : "ehat/otdata/getPatientOperationDoctors",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent + "<option value='0'>---Select Doctor with Speciality---</option>";
//			for (var i = 0; i < r.lstDoctorDto.length; i++) {
//				divContent = divContent + "<option value='"
//						+ r.lstDoctorDto[i].doctor_ID + "'  >"
//						+ r.lstDoctorDto[i].doc_name + "</option>";
//			}
			
			for (var i = 0; i < r.length; i++) {
				divContent = divContent + "<option value='"
						+ r[i].doctor_ID + "'  >"
						+ r[i].doc_name + " - " + r[i].speciality + "</option>";
			}
			
			$("#doctorNameOT").html(divContent);
			$("#doctorNameOT").select2();
		}
	});
}

function getSubServiceDetailsOnCPOE(){

	var t = $("#treatmentId").text();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		
		data : {
			"treatmentId" : t,
			"serviceId" : 0
		},
		url : "ehat/opdServicesAdvised/getPatientSubServiceDetailsOnIPD",
		success : function(r) {
		
			//getSubServiceDetailsTemp1(i, r, s);
			setSubServiceDetailsOnCpoeOT(r);
		
		},
		error : function(r) {
			alert('Network Issue!!!');
			setSubServiceDetailsOnCpoeOT(r);
		}
	});

}

function setSubServiceDetailsOnCpoeOT(r){
	
	 var chargesSlaveId=$("#chargesSlaveId").val();
	
	$("#tcpoeservices").html("");
	var htm = "";
	var rowCount = 0;
	
	if (r.listSubServiceIpdDto.length > 0) {
		
		for ( var i = 0; i < r.listSubServiceIpdDto.length; i++) {
			  
					if(r.listSubServiceIpdDto[i].otFlag == "Y" && r.listSubServiceIpdDto[i].serviceId == 11 ){
					var datetime12= new Date(r.listSubServiceIpdDto[i].createdDate).toLocaleDateString('en-GB');
					
					rowCount++;
					
					htm = htm
					+'<tr>'
					
					+ '<td class="col-md-1-1 center" style="height: 21.5px;">'+rowCount+'</td>'
					
					+ '<td class="col-md-2-1 center" style="height: 21.5px;"> '+r.listSubServiceIpdDto[i].categoryName+' </td>'
					
				+ '<td class="col-md-1-1 center" style="height: 21.5px;"> '+datetime12+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].docName+' </td>'
					
					+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].serviceName+' </td>'
					
					if(r.listSubServiceIpdDto[i].paidFlag =="Y"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: orange;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].paidFlag =="N"){
						htm = htm	+ '<td class="col-md-1-1 center "><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: green;" disabled></input></td>'
					}
				
					htm = htm	
					+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
					+ '<input id="chkOpdBill'+r.listSubServiceIpdDto[i].billDetailsId+'" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listSubServiceIpdDto[i].billDetailsId+'></input></td>'
					
					/*+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success" onclick=editIpdServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'cpoe\') ><i class="fa fa-edit"></i></button></td>'*/
					
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOTServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'cpoe\') ><i class="fa fa-trash-o"></i></button></td>'
				
				
					
					+ '<td style="display:none;" id="barCode'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					
					/*+	'<td style="display:none;" id="barCode'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].subServiceId+' </td>'
					
					+	'<td style="display:none;" id="spclId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].specialityId+' </td>'
					
					+	'<td style="display:none;" id="dId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].docId+' </td>'
					
					+	'<td style="display:none;" id="sId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].serviceId+' </td>'
									
					+	'<td style="display:none;" id="amt'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].amount+' </td>'
					
					+	'<td style="display:none;" id="isCombination'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].isCombination+' </td>'
					
					+	'<td style="display:none;" id="emrP'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].emrPer+' </td>'
					
					+	'<td style="display:none;" id="othRates'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].otherRate +' </td>'
					
					+	'<td style="display:none;" id="sndtolabflag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtolabflag+' </td>'
					
					+	'<td style="display:none;" id="sampleType'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sampleTypeId+' </td>'
					
					+	'<td style="display:none;" id="barCodeId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" id="inOutHouse'+(r.listBillNobleServiceDto[i].billDetailsId)+'">'+ r.listBillNobleServiceDto[i].inOutHouse+'</td>'
					
					+	'<td style="display:none;" id="histopathLab'+(r.listBillNobleServiceDto[i].billDetailsId)+'">'+ r.listBillNobleServiceDto[i].histopathLab+'</td>'
					
					+	'<td style="display:none;" id="collectionDate'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionDate+' </td>'
					
					+	'<td style="display:none;" id="collectionTime'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionTime+' </td>'
		
					+	'<td style="display:none;" id="regRefDocId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
		
					// added by vinod
					+	'<td style="display:none;" id="sendToRisId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtorisflag +' </td>'
					
					// added by vinod
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].templateWise +' </td>'
					
					+	'<td style="display:none;" id="payFlag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].paidFlag+' </td>';*/
				
					+'<td style="display:none;" id="sId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].serviceId+' </td>'
					+	'<td style="display:none;" id="spclId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].specialityId+' </td>'
					+	'<td style="display:none;" id="sampleType'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].sampleTypeId+' </td>'
					+	'<td style="display:none;" id="barCodeId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="inOutHouse'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].inOutHouse+'</td>'
					+	'<td style="display:none;" id="histopathLab'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].histopathLab+'</td>'
					+	'<td style="display:none;" id="collectionDate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionDate+' </td>'
					+	'<td style="display:none;" id="collectionTime'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionTime+' </td>'
					+	'<td style="display:none;" id="regRefDocId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].templateWise +' </td>'
					+	'<td style="display:none;" id="isCombination'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].iscombination +' </td>'
					+	'<td style="display:none;" id="othIpdRate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].otherRate +' </td>'
					+	'<td style="display:none;" id="catName'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].categoryName +' </td>'
					+	'<td style="display:none;" id="dId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].docId+' </td>'
					+	'<td style="display:none;" id="amt'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].amount+' </td>'
					+	'<td style="display:none;" id="emrP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].emrPer+' </td>'
					+	'<td style="display:none;" id="char'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].rate).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="q'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].quantity+' </td>'
					+	'<td style="display:none;" id="subserviceid'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].subServiceId+' </td>'
					+	'<td style="display:none;" id="cP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].coPay).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="con'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concession).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="conPer'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concessionPer).toFixed(2)+' </td>'
					
						+ '</tr>';
				
				}
			
		}
		
		$("#tcpoeservices").html(htm);
	}

}
function getAllDoctorsListOnOTCpoe(){

	var inputs = [];
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/opdServicesAdvised/getAllDoctorsList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		},
		success : function(r) {
			var divContent = "";
			divContent = divContent + "<option value='0'>---Select Doctor---</option>";
			for (var i = 0; i < r.lstDoctorDto.length; i++) {
				divContent = divContent + "<option value='"
						+ r.lstDoctorDto[i].doctor_ID + "'  >"
						+ r.lstDoctorDto[i].doc_name + "</option>";
			}
			$("#doctor2").html(divContent);
			$("#doctor2").select2();
		}
	});

}
function editServiceOnCPOE(){
	
	var labList =[];	
	
	    var billDetailsId=0;

		
		 $('input[name=opdBillCheckbox]:checked').each( function(){
			//	id = $(this).val();
			// labList = labList + "," + $(this).val();
			
			 labList.push(parseInt($(this).val()));
			 billDetailsId=parseInt($(this).val());
			});
			 

		if (labList.length == 0) {

			alert("Please check  at least Service to Edit");
			return false;

		}
		
		if (labList.length > 1) {

			alert("Please Select One test at A time to    Edit");
			return false;

		}
	
		editOnServicesOnOT(billDetailsId,"CPOE");
	

}
//added By Badrinath Wagh
//OT DashBoard fetch for Todays Operation

function fetchTodaysOperationDetails(){
	
	jQuery.ajax({
 	async : false,
 	type : "GET",
 	//data 	: str + "&reqType=AJAX",
		url : "ehat/ot/fetchTodaysOperationDetails",
		success : function(r) {
			//alert("success");
			
			var htm="";
			index = 1;
			if(r.listOTDashboardDTO.length == 0 || r.listOTDashboardDTO.length == null){
				
				htm = htm + "<tr style='height:25px; color:red; font-size:20px;'><th class='center' colspan='12'>No Records</th></tr>";
				
			}else {
				
				for(var i=0 ; i< r.listOTDashboardDTO.length; i++){
					
					htm = htm
							+ "<tr class='center'><td >"
							+ index
			            	+ "</td>"
							+ "<td >"
							+ r.listOTDashboardDTO[i].scheduledProcedure
							+ "</td>"
							+ "<td  >"
							+  r.listOTDashboardDTO[i].operationStartTime + " - " + r.listOTDashboardDTO[i].operationEndTime
							+ "</td>"
							+ "<td >"
							+  r.listOTDashboardDTO[i].surgeryTeam
							+"</td>"
							+ "<td >"
							+ r.listOTDashboardDTO[i].otName
							+"</td>"	
							+"</tr>";
					index++;
						}
				
					}
				
			$("#todayop").html(htm);
			
		}
	});
}
//added By Badrinath Wagh
//OT DashBoard Fetch for tommorows Operation

function fetchTomorrowOperationDetails(){
	
	jQuery.ajax({
 	async : false,
 	type : "GET",
 	//data 	: str + "&reqType=AJAX",
		url : "ehat/ot/fetchTomorrowOperationDetails",
		success : function(r) {
			//alert("success");
			
			var htm="";
			index = 1;
			if(r.listOTDashboardDTO.length == 0 || r.listOTDashboardDTO.length == null){
				
				htm = htm + "<tr style='height:25px; color:red; font-size:20px;'><th class='center' colspan='12'>No Records</th></tr>";
				
			}else {
				
				for(var i=0 ; i< r.listOTDashboardDTO.length; i++){
					
					htm = htm
					+ "<tr class='center'><td >"
					+ index
	            	+ "</td>"
					+ "<td >"
					+ r.listOTDashboardDTO[i].scheduledProcedure
					+ "</td>"
					+ "<td  >"
					+  r.listOTDashboardDTO[i].operationStartTime + " - " + r.listOTDashboardDTO[i].operationEndTime
					+ "</td>"
					+ "<td >"
					+  r.listOTDashboardDTO[i].surgeryTeam
					+"</td>"
					+ "<td >"
					+ r.listOTDashboardDTO[i].otName
					+"</td>"	
					+"</tr>";
					index++;
						}
				
					}
				
			$("#tmrop").html(htm);
			
		}
	});
}

function getTodaysVitalsOnPopUp1(){
	var cType = 3;
	
	var inputs = [];
	
	inputs.push('cType=' + cType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/tempchartcontroller/administratortempletchartslave",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setVitalsListOnOnPopUp1(r);
			setTimeout(function(){userAccess();},100);
		}
	});
}

//added By Badrinath Wagh
//For OT DashBoard fetch from Date
function fetchOpreationFromDate(){
	
	var	opDate = $("#popup_container2").val();
	
	//alert("opDate" + opDate);
	
	jQuery.ajax({
	async : false,
	type : "GET",
	data 	: {
			"opDate" : opDate,
		},
		url : "ehat/ot/fetchOpreationFromDate",
		success : function(r) {
			//alert("success");
			
			var htm="";
			index = 1;
			if(r.listOTDashboardDTO.length == 0 || r.listOTDashboardDTO.length == null){
				
				htm = htm + "<tr style='height:25px; color:red; font-size:20px;'><th class='center' colspan='12'>No Records</th></tr>";
				
			}else {
				
				for(var i=0 ; i< r.listOTDashboardDTO.length; i++){
					
					htm = htm
					+ "<tr class='center'><td >"
					+ index
	            	+ "</td>"
					+ "<td >"
					+ r.listOTDashboardDTO[i].scheduledProcedure
					+ "</td>"
					+ "<td  >"
					+  r.listOTDashboardDTO[i].operationStartTime + " - " + r.listOTDashboardDTO[i].operationEndTime
					+ "</td>"
					+ "<td >"
					+  r.listOTDashboardDTO[i].surgeryTeam
					+"</td>"
					+ "<td >"
					+ r.listOTDashboardDTO[i].otName
					+"</td>"	
					+"</tr>";
					index++;
						}
				
					}
				
			$("#dateop").html(htm);
			
		}
	});
}

function setVitalsListOnOnPopUp1(r){
	
	var count=1;
	var temp="";
	for(var i=0; i< r.listChartType.length;i++){
		temp = temp 
		+'<tr class="newRowHistoryRow">'
		+'<td> <label>'+count+' </label> </td>' 
		
		+"<td class='col-md-2-1 TextFont' >   </td>" 
		
		+'<td> <label>'+r.listChartType[i].name+' </label> </td>'
		
		+"<td class='col-md-2-1 TextFont' >   </td>" 
		
		+'<td> <input type="text"  value="0"  id="textResult'+i+'"> </td>'
		//+'<input id=radio'+r.listChartType[i].name+' type="checkbox" name="radiationFlagChk" value="0_' +r.listChartType[i].name+'" onclick="delteRadioTheropySlave('+r.listChartType[i].name+')">'
		
		+'<td> <input type="hidden"  value="0_' +r.listChartType[i].idchartTypeTbl+'"  id="textMasterId'+i+'"> </td>'
		+'</tr>'
		
		count++;
	}
	
	$("#vitalsBodyList").html(temp);
	fecttodaysVitalList1();
	
}

function fecttodaysVitalList1(){
	var treatmentId = $("#tr_Id").val();
	var unitId=1;
	var todays_date=$("#todays_date").val();
	 var dateArray=todays_date.split("-");
	 var newDate=dateArray[2]+"-"+dateArray[1]+"-"+dateArray[0];
	var inputs = [];
	
	
	inputs.push('unitId=' + unitId);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('CallFrom=' + "today");
	inputs.push('userDate=' + newDate);
	
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/opdvital/getCoversheetTreatmentListByTreatmentId",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			response = r;
			
			//getTodaysVitalsOnPopUp();
			
			for(var i=0; i< r.getListOfOPDCoversheetVitalDTO.length;i++){
				var neo_id = r.getListOfOPDCoversheetVitalDTO[i].vitalValue;
				
				 $("#textMasterId"+i).val(r.getListOfOPDCoversheetVitalDTO[i].vitalMasterId+"_"+r.getListOfOPDCoversheetVitalDTO[i].vitalValue);
				
				 $("#textResult"+i).val(r.getListOfOPDCoversheetVitalDTO[i].result);
			}
		}
	});
}

//Added By Annapurna (fetcing Operation Name)
function getOperationNameForAutoDiscahargeSummary() {
	
	var opType = 2;
	if (opType == "Select") {
		alert("Please Select Operation Type");
		$("#department").val(0);
		return false;
	}
	var inputs = [];
	inputs.push('opType=' + encodeURIComponent(opType));
	inputs.push('department=' + encodeURIComponent(department));
	inputs.push('action=fetchOperationName');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "OperationServlet",
		url : "./ehat/otdata/fetchOperationName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(ajaxResponse) {
			
			// alert(ajaxResponse);
			objc = eval( ajaxResponse );
			$("#idSelOperationData").setTemplate(operationNameTemp);
			$("#idSelOperationData").processTemplate(objc);

		}
	});

}




/*function fetchPreviousOTPatients(callfrom) {
	
	var deptId=2;
	var usertype = "all";
	var letter="";
	var unit_id = parseInt($("#unitId").val());
	
        var inputs = [];
        inputs.push('unit_id=' + 1);
        inputs.push('findText=' + usertype);
        inputs.push('callFrom=' + callfrom);
        var str = inputs.join('&');
        
      //  alert("str... "+str)
        
	jQuery.ajax({
		async : true,
		type : "POST",
		data 	: str + "&reqType=AJAX",
		url : "ehat/otdata/fetchPreviousOTPatients",
		success : function(r) {
		
			//alert(JSON.stringify(r));
		
		}
	});
}
*/

function getBatchDetailsOnSelect(itemId){
	var inputs = [];
	inputs.push('itemId=' + itemId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data :  str +"&reqType=AJAX",
		url : "ehat/autoallservicestest/getBatchDetailsOnSelect",
	
		success : function(result) {
			//var jsObj = $.parseJSON(result);
			var stock = 0;
			
			for(var i=0; i<result.lstService.length; i++)
				stock += result.lstService[i].availableQty;
			
			if (stock > 0) {
				$("#Ot_Inventory_Batch_Pop_Up").show();
				splitBatchContentOtInventory(result);

			} else {
				alertify.error("Product has no stock!!");
				$('#txtautoserviceOI').val(content[0]);
			}
		}	
		
	});
}

function splitBatchContentOtInventory(result) {
	var count = 0;
	$("#batchDataOtInventory").empty();
	for ( var i = 0; i < result.lstService.length; i++) {
			var count = 1;
			$('#Ot_Inventory_Batch_Pop_Up').modal('show');
			if (i == 0) {
				$("#batchDataOtInventory")
						.html(
								"<tr><td  class='col-sm-1-1 center'>"
										+ "<input type='radio' name='row' id='rowId"
										+ i
										+ "' value="
										+ i
										+ " checked='true' autofocus='autofocus'></td>"
										+ "<td  class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-2-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textSaleRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;' class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;' class='col-sm-1-1 center'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textProdId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "</tr>");

			} else {

				$("#batchDataOtInventory")
						.append(
								"<tr><td>"
										+ "<input type='radio' name='row' value="
										+ i
										+ " id='rowId"
										+ i
										+ "'></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchCode"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchExpiry"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchMRP"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textSaleRate"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchClearStock"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchPopUpBatchId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textBatchStockId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"
										
										+ "<td style='display:none;'><input type='text'"
										+ "class='form-control input-SmallText' readonly='true' id='textProdId"
										+ i
										+ "'"
										+ "tabindex='-1' /></td>"

										+ "</tr>");
			}

			$("#textBatchCode" + i).val(result.lstService[i].batchCode);
			$("#textBatchExpiry" + i).val(result.lstService[i].batchExp);
			$("#textBatchMRP" + i).val(result.lstService[i].unitPrice);
			$("#textBatchClearStock" + i).val(result.lstService[i].availableQty);
			$("#textBatchPopUpBatchId" + i).val(result.lstService[i].batchid);
			$("#textBatchStockId" + i).val(result.lstService[i].stockid);
			$("#textSaleRate" + i).val(result.lstService[i].unitPrice);
			$("#textProdId" + i).val(result.lstService[i].serviceid);

	}
}

function setPopUpValuesForOtInventory(){
	var totalRow=0;
	$('#batchDataOtInventory input[type=radio]').each(function()
	{
		totalRow++;
	});
	var value =$("input[name=row]:checked").val();
	setPopUpValuesOtInventory(value,totalRow);
}

function setPopUpValuesOtInventory(number, totalRow) {
	if (totalRow == '0') {
		
	} else {
		$("#InvRate").val($('#textBatchMRP' + number).val());
		$("#serIDinv").val($('#textProdId' + number).val());
		$("#batchId").val($('#textBatchPopUpBatchId' + number).val());
		$("#mrnslaveId" ).val($('#textBatchStockId' + number).val());
		$("#InvAQty" ).val($('#textBatchClearStock' + number).val());
		$("#InvAmt" ).val($('#textBatchMRP' + number).val());
		$("#txtBatchCodeOI" ).val($('#textBatchCode' + number).val());
		$("#txtBatchExpOI" ).val($('#textBatchExpiry' + number).val());
	   $('#Ot_Inventory_Batch_Pop_Up').css('display','none');
	}

}

function fetchOtSubInventoryItems(inputID,callform){
	var findingName=$("#" + inputID).val();
	var inputs = [];
	inputs.push('findingName=' + findingName);
	inputs.push('callform=' + callform);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data :  str +"&reqType=AJAX",
		url : "ehat/autoallservicestest/fetchOtSubInventoryProduct",
	
		success : function(r) {
		//	setPharmaDynamicServicesOnright(r);
		//	 alert(r);
		//	var value="Pharma"
			if(callform=="OTINV"){
				autOTSubInventory(r,inputID,callform);
			}else{
				autoCompTableOTSubInventory(r,inputID,callform);
			}
			
			
			
		}	
		
	});
}

function autOTSubInventory(response,id,value,subInventoryId) {
	var qty = id.slice(0, -1); // for dyamic col getting id
	var myArray = response;// parsing response in JSON format
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
							$(ul).css("z-index", "10000000000");
							return result;
						}
					});

	// Sets up the multicolumn autocomplete widget.
	$("#" + id).mcautocomplete(
			{
				showHeader : true,
				columns : [ {
					name : 'Name',
					width : '150px',
					valueField : 'categoryName'
				},
				],

				select : function(event, ui) {
					console.log(ui);
					var spl = (ui.item.spl = "" ? '' : ui.item.spl);
					if (ui.item.dn != 'No' && ui.item.spl != 'Record'
							&& ui.item.specialisationName != 'Found'
							&& ui.item.depNm != 'Match') {
				
						if(ui.item.categoryName!="NO Match"){
							if(value=='OTINV'){
								
								
								getBatchDetailsOnSelect(ui.item.serviceid);
								/*$("#InvRate" ).val(ui.item.unitPrice);
								$("#serIDinv" ).val(ui.item.serviceid);
								$("#mrnslaveId" ).val(ui.item.batchid);
								$("#InvAQty" ).val(ui.item.currentSubInventoryStockUpdated);
								$("#InvAmt" ).val(0);*/
							}
							$("#" + id).val(ui.item.categoryName);
						}
						
					}
				
					return false;
				},

				minLength : 1,
				source : function(request, response) {
					var data = myArray;
					console.log(data);
					console.log(data.lstService.length);
					var result;
					if (!data || data.lstService.length === 0 || !data.lstService
							|| data.lstService.length === 0) {
						result = [ {
							'categoryName' : 'NO Match',
						} ];
					} else {
						result = data.lstService;// Response List for All
													// Services
					}
					response(result);
				}
			});
	
}

function autoCompTableOTSubInventory(response,id,value){
//	var qty		= id.slice(0,-1); //for dyamic col getting id
	var myArray =response;// $.parseJSON(response);// parsing response in JSON format 
	console.log(myArray);
	$.widget('custom.mcautocomplete', $.ui.autocomplete, {
	    _create: function () {
	        this._super();
	        this.widget().menu("option", "items", "> :not(.ui-widget-header)");
	    },
	    _renderMenu: function (ul, items) {
	        var self = this,
	            thead;
	        if (this.options.showHeader) {
	            table = $('<div class="ui-widget-header" style="width:100%"></div>');
	            $.each(this.options.columns, function (index, item) {
	                table.append('<span style="padding:0 4px;float:left;width:' + item.width + ';">' + item.name + '</span>');
	            });
	            table.append('<div style="clear: both;"></div>');
	            ul.append(table);
	        }
	        $.each(items, function (index, item) {
	            self._renderItem(ul, item);
	        });
	    },
	    _renderItem: function (ul, item) {
	        var t = '',
	            result = '';
	        $.each(this.options.columns, function (index, column) {
	            t += '<span style="padding:0 4px;float:left;width:' + column.width + ';">' + item[column.valueField ? column.valueField : index] + '</span>';
	        });
	        result = $('<li></li>')
	            .data('ui-autocomplete-item', item)
	            .append('<a class="mcacAnchor">' + t + '<div style="clear: both;"></div></a>')
	            .appendTo(ul);
	        $(ul).css("z-index", "10000000000");
	        return result;
	    }
	});


	// Sets up the multicolumn autocomplete widget.
	$("#"+ id).mcautocomplete({
	    // These next two options are what this plugin adds to the autocomplete widget.
	    showHeader: true,
	    columns: [{
	        name: 'Name',
	        width: '200px',
	        valueField: 'categoryName'
	    }, {
	        name: 'Charges',
	        width: '110px',
	        valueField: 'categorycharges'
	    }, {
	        name: 'Qty',
	        width: '188px',
	        valueField: 'stockqty'
	    }],

	    // Event handler for when a list item is selected.
	    select: function (event, ui) {
	    	console.log("tk");
	    	console.log(ui);
	        this.value = (ui.item ? ui.item.categoryName : '');
	       if( ui.item.categoryName !='No' && ui.item.categorycharges !='Record' && ui.item.stockqty !='Match'){
	    	  $('#results').text(ui.item ? 'Selected: ' + ui.item.categoryName + ', ' + ui.item.categorycharges + ', ' + ui.item.stockqty : 'Nothing selected, input was ' + this.value);

				//	alert(value);
					if(value=='OTINV'){
						
						$("#InvRate" ).val(ui.item.unitPrice);
						$("#serIDinv" ).val(ui.item.serviceid);
						$("#mrnslaveId" ).val(ui.item.batchid);
						$("#InvAQty" ).val(ui.item.currentSubInventoryStockUpdated);
						$("#InvAmt" ).val(0);
					}
					$("#" + id).val(ui.item.categoryName);
					
	       }
	        
	        return false;
	    },

	    // The rest of the options are for configuring the ajax webservice call.
	    minLength: 1,
	    source: function (request, response) {
	    	var data = myArray;
	    	console.log(data);
	    	console.log(data.lstService.length);
	    	var result;
            if (!data || !data.lstService || data.lstService.length === 0  ) {
            	/*result = [{
                    label: 'No match found.'
                }];*/
            	result = [{
                     'categoryName'		: 'No',
                     'categorycharges'	: 'Record',
                     'stockqty'		: 'Match',
               
                 }];
            } else {
                result = data.lstService;//Response List for All Services
            }
            response(result);
         
          }
	});
}

function setOperationDetails1(){
	


	var typeOfOperation = $("#typeOfOperation").val();
	var pageName = $("#pageName").val();
	if (typeOfOperation == "previous") {

		var pobj = $("#divPatId").html();
		operationobj = eval('(' + pobj + ')');

		$("#popup_container2").val(operationobj.listTop[0].dt);
		$("#txtStartTime").val(operationobj.listTop[0].stt);
		$("#txtEndTime").val(operationobj.listTop[0].ett);
		$("#treatmentoperationid").val(operationobj.listTop[0].id);
		$("#otID").val(operationobj.listTop[0].id);

		$('#otName option[value="' + operationobj.listTop[0].otid + '"]').prop(
				'selected', true);
		var scheduledProcedure = "";// $("#scheduledProcedure").html();
		var arrProcedures = (operationobj.listTop[0].schPro).split("#");

		for ( var i = 1; i < (arrProcedures.length) - 1; i++) {
			var arrPro = (arrProcedures[i]).split("@");
			
			scheduledProcedure = scheduledProcedure + "<option value='"
					+ arrPro[0] + "'>" + arrPro[1] + "</option>";
			
		}
		$("#scheduledProcedure").html(scheduledProcedure);
		$("#operationListId").val(scheduledProcedure);
		$("#operationListId").html(scheduledProcedure);

		$('#teanNameList option[value="' + operationobj.listTop[0].teamId + '"]').prop(
				'selected', true);
		//$("#teanNameList").val(operationobj.listTop[0].teamId);

		var obj = operationobj.listTop[0].liOpDoc;

		var template = "";
		for ( var i = 0; i < obj.length; i++) {
			var value = obj[i].idopDoc;
			var name = obj[i].docName;
			var type = obj[i].doctp;
			var splty = obj[i].obd.speciality; //obj[i].obd.spl;
			var deptName = obj[i].obd.departmentName; // obj[i].obd.depNm;
			
			if(splty == undefined || splty == "undefined" || splty == null || splty == "null"){
				
				splty = "";
			}
			
			if(deptName == undefined || deptName == "undefined" || deptName == null || deptName == "null"){
				
				deptName = "";
			}
			
			if(pageName == "operation"){
				
				template = template
				+ "<tr id='idTr"
				+ (1 + i)
				+ "'><td class='center' style='padding-right: 13px; padding-left: 14px; width:1.3%;'><div class='' id='"
				+ (1 + i)
				+ "'>"
				+ (1 + i)
				+ "<input type='hidden' id='idUser"
				+ (1 + i)
				+ "' value='"
				+ value
				+ "' /></div></td><td class='center' style='width: 25%;'><div class='' id='docNameT"
				+ (1 + i)
				+ "'>"
				+ name
				+ "</div></td>"
				+ "<td class='center' style='width: 15%;'><div class='' id='userType"
				+ (1 + i)
				+ "'>"
				+ type
				+ "</div></td>"
				+ "<td class='center' style='width: 15%;'><div class='' id='docSpeciality"
				+ (1 + i)
				+ "'>"
				+ splty
				+ "</div></td><td class='center' style='width: 20%;'><div class='' id='docDpmt"
				+ (1 + i)
				+ "'>"
				+ deptName
				+ "</div></td>"
				+ "<td class='center' style='width: 18%;'><div class='' id='docTypeT"
				+ (1 + i)
				+ "'>"
				+ obj[i].surgtp
				+ "</div></td>"
				+ "<td class='center' style='width: 5%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + i) + " readonly='readonly''/></div></td></tr>";
				
				
				/*template = template
				+ "<tr id='idTr"
				+ (1 + i)
				+ "'><td class='' style='padding-right: 15px;'><div class='' id='"
				+ (1 + i)
				+ "'>"
				+ (1 + i)
				+ "<input type='hidden' id='idUser"
				+ (1 + i)
				+ "' value='"
				+ value
				+ "' /></div></td><td class='col-md-3-1 center' style=''><div class='' id='docNameT"
				+ (1 + i)
				+ "'>"
				+ name
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style=''><div class='' id='userType"
				+ (1 + i)
				+ "'>"
				+ type
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docSpeciality"
				+ (1 + i)
				+ "'>"
				+ obj[i].obd.spl
				+ "</div></td><td class='col-md-3-1 center' style='padding-left: 15px;'><div class='' id='docDpmt"
				+ (1 + i)
				+ "'>"
				+ obj[i].obd.depNm
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docTypeT"
				+ (1 + i)
				+ "'>"
				+ obj[i].surgtp
				+ "</div></td>"
				+ "<td class='center' style=''><div class=''><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + i) + "' readonly='readonly'/></div></td></tr>";	*/
			}else{
				template = template
				+ "<tr id='idTr"
				+ (1 + i)
				+ "'><td class='center' style='padding-right: 13px; padding-left: 14px; width:1.3%;'><div class='' id='"
				+ (1 + i)
				+ "'>"
				+ (1 + i)
				+ "<input type='hidden' id='idUser"
				+ (1 + i)
				+ "' value='"
				+ value
				+ "' /></div></td><td class='center' style='width: 25%;'><div class='' id='docNameT"
				+ (1 + i)
				+ "'>"
				+ name
				+ "</div></td>"
				+ "<td class='center' style='width: 15%;'><div class='' id='userType"
				+ (1 + i)
				+ "'>"
				+ type
				+ "</div></td>"
				+ "<td class='center' style='width: 15%;'><div class='' id='docSpeciality"
				+ (1 + i)
				+ "'>"
				+ splty
				+ "</div></td><td class='center' style='width: 20%;'><div class='' id='docDpmt"
				+ (1 + i)
				+ "'>"
				+ deptName
				+ "</div></td>"
				+ "<td class='center' style='width: 18%;'><div class='' id='docTypeT"
				+ (1 + i)
				+ "'>"
				+ obj[i].surgtp
				+ "</div></td>"
				+ "<td class='center' style='width: 5%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + i) + "'readonly='readonly' /></div></td></tr>";
				
			/*	template = template
				+ "<tr id='idTr"
				+ (1 + i)
				+ "'><td class='' style='padding-right: 15px;'><div class='' id='"
				+ (1 + i)
				+ "'>"
				+ (1 + i)
				+ "<input type='hidden' id='idUser"
				+ (1 + i)
				+ "' value='"
				+ value
				+ "' /></div></td><td class='col-md-3-1 center' style=''><div class='' id='docNameT"
				+ (1 + i)
				+ "'>"
				+ name
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style=''><div class='' id='userType"
				+ (1 + i)
				+ "'>"
				+ type
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docSpeciality"
				+ (1 + i)
				+ "'>"
				+ obj[i].obd.spl
				+ "</div></td><td class='col-md-3-1 center' style='padding-left: 15px;'><div class='' id='docDpmt"
				+ (1 + i)
				+ "'>"
				+ obj[i].obd.depNm
				+ "</div></td>"
				+ "<td class='col-md-2-1 center' style='padding-left: 15px;'><div class='' id='docTypeT"
				+ (1 + i)
				+ "'>"
				+ obj[i].surgtp
				+ "</div></td>"
				+ "<td class='center' style=''><div class=''><input type='checkbox' name='checkBoxDoc' value='"
				+ (1 + i) + "'/></div></td></tr>";*/
			}
			
		}

		$("#teamMemberCount").val(obj.length);
		var temp;
		$("#teamMembersList").setTemplate(template);
		$("#teamMembersList").processTemplate(temp);

		if (operationobj.listTop[0].emerFlg == "Y") {
			$("#emerFlag").attr("checked", "checked");
		} else {
			$("#emerFlag").removeAttr('checked', false);
		}

		if (operationobj.listTop[0].infFlg == "Y") {
			$("#infectFlag").attr("checked", "checked");
		} else {
			$("#infectFlag").removeAttr('checked', false);
		}
		if (operationobj.listTop[0].ctrFlg == "Y") {
			$("#criticalFlag").attr("checked", "checked");
		} else {
			$("#criticalFlag").removeAttr('checked', false);
		}

		for ( var i = 0; i < operationobj.listTop.length; i++) {
			if (i != 0) {
				// AddoperationDiv();
			}
		}
		var otyInput = [];
		var dptInput = [];
		var oidInput = [];
		var i = 0;
		$("#txtCathNo" + (i + 1)).val(operationobj.listTop[i].tomid);
	//	alert(operationobj.listTop[i].tomid);

		if (operationobj.listTop[i].operationCharge == "1") {
			$("#opCharge" + (i + 1)).attr("checked", true);
		} else {
			$("#opCharge" + (i + 1)).removeAttr('checked', false);
		}

		var oid = operationobj.listTop[i].opobj.oi;
		var oty = operationobj.listTop[i].opobj.oty;
		var ansid = operationobj.listTop[i].anid;
		$("#anesthesiaType").val(operationobj.listTop[i].anesType);
		$("#anesthesiaType").val(operationobj.listTop[i].anesType);

		$(
				'#txtRoute option[value="'
						+ operationobj.listTop[i].anesType + '"]')
				.prop('selected', true);

		$('#txtchargetype option[value="' + operationobj.listTop[i].act + '"]')
				.prop('selected', true);

		$("#txtFindings" + (i + 1)).val(operationobj.listTop[i].fnd);
		$("#txtProvlon" + (i + 1)).val(operationobj.listTop[i].prv);
		$("#txtComment" + (i + 1)).val(operationobj.listTop[i].cm);
		$("#txtStatus" + (i + 1)).val(operationobj.listTop[i].sts);
		$("#txtVeesal" + (i + 1)).val(operationobj.listTop[i].vd);
		$("#surInstrument" + (i + 1)).val(
				operationobj.listTop[i].surinstr);

		$("#ohr" + (i + 1)).val(operationobj.listTop[i].oh);
		$("#chr" + (i + 1)).val(operationobj.listTop[i].ch);
		$("#obp" + (i + 1)).val(operationobj.listTop[i].ob);
		$("#cbp" + (i + 1)).val(operationobj.listTop[i].cb);
		var eqpLi = operationobj.listTop[i].eu;
		if (eqpLi == undefined) {
		} else {
			var eqpArr = [];
			eqpArr = eqpLi.split("\n");
			for ( var k = 0; k < eqpArr.length - 1; k++) {

				var appendValue = eqpArr[k] + "\n";

				var o = new Option("option text", "value");

				var val = $(o).html(appendValue);

				$("#txtEquipmet" + (i + 1)).append(o);

			}
		}
		// set bed side procedure
		$("#txtEquipmetb1").html("");
		$("#txtEquipmetg1").html("");
		$("#txtEquipmeti1").html("");
		$("#txtEquipmetc1").html("");
		var servicesList = operationobj.listTop[i].liTest;
	
		for ( var k = 0; k < servicesList.length; k++) {
			var appendValue = "";
			var id = "";
			var o = "";
			//alert(servicesList[k].ipdbillid);
			appendValue = servicesList[k].tname + "-" + servicesList[k].qty
					+ "\n";
			id = servicesList[k].test_ID + "-" + servicesList[k].qty + "\n";
			o = new Option("option text", "value");
			$(o).html(appendValue);
			$(o).val(id);

			if (servicesList[k].ipdservicetype == "b") {
				$("#txtEquipmetb" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "g") {
				$("#txtEquipmetg" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "i") {
				$("#txtEquipmeti" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "c") {
				$("#txtEquipmetc" + (i + 1)).append(o);
			}

		}

		$("#remark").val(operationobj.listTop[i].rem);
		$("#precaution").val(operationobj.listTop[i].presc);
		$("#surgeryDescription").val(operationobj.listTop[i].surDesc);
		$("#indicationForSurgery").val(operationobj.listTop[i].inSur);
		$("#otherReference").val(operationobj.listTop[i].otherReference);
		$("#contactOfReference").val(operationobj.listTop[i].contactOfReference);
		$("#emailOfReference").val(operationobj.listTop[i].emailOfReference);
		$("#suggestedBy").val(operationobj.listTop[i].sugBy);

	} else {/*

		var pobj = $("#divPatId").html();
		// var obj = eval('(' + pobj + ')');
		// operationobj = obj.pl[0];
		
		operationobj = eval('(' + pobj + ')');
		
		$("#bill_Id").val(operationobj.billid);//added by paras
		
		 var countshedule = operationobj.countshedule;//added by paras
		 $("#countshedule").val(countshedule);//added by paras   
		   //added by paras
		
		$("#popup_container2").val(operationobj.listTop[0].dt);
		$("#txtStartTime").val(operationobj.listTop[0].stt);
		$("#txtEndTime").val(operationobj.listTop[0].ett);
		$("#treatmentoperationid").val(operationobj.listTop[0].id);
		$("#otID").val(operationobj.listTop[0].id);
		if(operationobj.listTop[0].opcat==0){
			$("#opgrade").val(1);
		}else{
			$("#opgrade").val(operationobj.listTop[0].opcat);	
		}
	
		// fetchOperationTheaterNames(operationobj.listTop[0].otid);

		// $("#otName").val(operationobj.listTop[0].otid);
		$('#otName option[value="' + operationobj.listTop[0].otid + '"]').prop(
				'selected', true);

		var scheduledProcedure = "";// $("#scheduledProcedure").html();
		var arrProcedures = (operationobj.listTop[0].schPro).split("#");
       var emptyfild=0;
		for ( var i = 1; i < (arrProcedures.length - 1); i++) {
			var arrPro = (arrProcedures[i]).split("@");
			alert( arrPro[0]);
			alert( arrPro[1]);
			if(arrPro[0]==0 ){
				if(arrPro[1]==0 || arrPro[1]=="" || arrPro[1]== undefined){
					emptyfild=1;
				}else{
					scheduledProcedure = scheduledProcedure + "<option value='"
					+ arrPro[0] + "'>" + arrPro[1] + "</option>";
				}
				
			}else{
				scheduledProcedure = scheduledProcedure + "<option value='"
				+ arrPro[0] + "'>" + arrPro[1] + "</option>";
			}
		
			
		}
		
		if(emptyfild == 0 ){
		$("#scheduledProcedure").html(scheduledProcedure);
		$("#operationListId").html(scheduledProcedure);
		//}
		$("#teanNameList").val(operationobj.listTop[0].teamId);
		$("#suggestedBy").val(operationobj.listTop[0].sugBy);

		var obj = operationobj.listTop[0].liOpDoc;
		var trcount = 0;
		var template = "";
		for ( var i = 0; i < obj.length; i++) {
			var value = obj[i].idopDoc;
			var name = obj[i].docName;
			var type = obj[i].doctp;
			var spl =   "-";
			var  depNm  = "-";
			var  surgtp = "-";
			
			if(obj[i].obd== null || obj[i].obd=="" || obj[i].obd==undefined ){
				spl="-";
				depNm="-";
				surgtp="-";
				}else{
					
					 spl =   obj[i].obd.speciality; //obj[i].obd.spl;
					  depNm  = obj[i].obd.departmentName; //obj[i].obd.depNm;
					  surgtp = obj[i].surgtp;
					 
				}
			
			if(spl == undefined || spl == "undefined" || spl == null || spl == "null"){
				
				spl = "";
			}
			
			if(depNm == undefined || depNm == "undefined" || depNm == null || depNm == "null"){
				
				depNm = "";
			}
			
			template = template
					+ "<tr id='idTr"
					+ (1 + i)
					+ "'><td class='center' style='padding-right: 13px; padding-left: 14px; width:1.3%;'><div class='' id='"
					+ (1 + i)
					+ "'>"
					+ (1 + i)
					+ "<input type='hidden' id='idUser"
					+ (1 + i)
					+ "' value='"
					+ value
					+ "' /></div></td><td class='center' style='width: 25%;'><div class='' id='docNameT"
					+ (1 + i)
					+ "'>"
					+ name
					+ "</div></td>"
					+ "<td class='center' style='width: 15%;'><div class='' id='userType"
					+ (1 + i)
					+ "'>"
					+ type
					+ "</div></td>"
					+ "<td class='center' style='width: 15%;'><div class='' id='docSpeciality"
					+ (1 + i)
					+ "'>"
					+ spl
					+ "</div></td><td class='center' style='width: 20%;'><div class='' id='docDpmt"
					+ (1 + i)
					+ "'>"
					+ depNm
					+ "</div></td>"
					+ "<td class='center' style='width: 18%;'><div class='' id='docTypeT"
					+ (1 + i)
					+ "'>"
					+ surgtp
					+ "</div></td>"
					+ "<td class='center' style='width: 5%;'><div class=''><input type='checkbox' name='checkBoxDoc' value='"
					+ (1 + i) + "'/></div></td></tr>";
			trcount = i + 1;
		}

		$("#teamMemberCount").val(obj.length);
		var temp;
		$("#teamMembersList").setTemplate(template);
		$("#teamMembersList").processTemplate(temp);

		if (operationobj.listTop[0].emerFlg == "Y") {
			$("#emerFlag").attr("checked", "checked");
		} else {
			$("#emerFlag").removeAttr('checked', false);
		}

		if (operationobj.listTop[0].infFlg == "Y") {
			$("#infectFlag").attr("checked", "checked");
		} else {
			$("#infectFlag").removeAttr('checked', false);
		}
		if (operationobj.listTop[0].ctrFlg == "Y") {
			$("#criticalFlag").attr("checked", "checked");
		} else {
			$("#criticalFlag").removeAttr('checked', false);
		}

		for ( var i = 0; i < operationobj.listTop.length; i++) {
			if (i != 0) {
				AddoperationDiv();
			}

		}
		var otyInput = [];
		var dptInput = [];
		var oidInput = [];

		var i = 0;

		$("#txtCathNo" + (i + 1)).val(operationobj.listTop[i].tomid);
		// $("#manageid" + (i + 1)).val(operationobj.listTop[i].tomid);

		if (operationobj.listTop[i].operationCharge == "1") {
			$("#opCharge" + (i + 1)).attr("checked", true);
		} else {
			$("#opCharge" + (i + 1)).removeAttr('checked', false);
		}

		var oid = operationobj.listTop[i].opobj.oi;
		var oty = operationobj.listTop[i].opobj.oty;
		var ansid = operationobj.listTop[i].anid;
		$("#anesthesiaType").val(operationobj.listTop[i].anesType);
		// fetchAllAnesthesisOnload(i + 1, ansid);
		// alert(oty);

		// $("#selOTtype" + (i + 1)).val(oty);
	    $("#departmentOT").val(operationobj.listTop[i].dpt);
		// getOperationName(i + 1, oid);

		
		 * $("#sheet" + (i + 1)).val(operationobj.listTop[i].srb); $("#txtStent" +
		 * (i + 1)).val(operationobj.listTop[i].stnt);
		 
		$('#txtRoute option[value="' + operationobj.listTop[i].rt + '"]').prop(
				'selected', true);
		// $("#txtRoute" + (i + 1)).val(operationobj.listTop[i].rt);

		$('#txtchargetype option[value="' + operationobj.listTop[i].act + '"]')
				.prop('selected', true);
		// $("#txtchargetype" + (i + 1)).val(operationobj.listTop[i].act);

		$("#txtFindings" + (i + 1)).val(operationobj.listTop[i].fnd);
		$("#txtProvlon" + (i + 1)).val(operationobj.listTop[i].prv);
		$("#txtComment" + (i + 1)).val(operationobj.listTop[i].cm);
		$("#txtStatus" + (i + 1)).val(operationobj.listTop[i].sts);
		$("#txtVeesal" + (i + 1)).val(operationobj.listTop[i].vd);
		$("#surInstrument" + (i + 1)).val(operationobj.listTop[i].surinstr);

		$("#ohr" + (i + 1)).val(operationobj.listTop[i].oh);
		$("#chr" + (i + 1)).val(operationobj.listTop[i].ch);
		$("#obp" + (i + 1)).val(operationobj.listTop[i].ob);
		$("#cbp" + (i + 1)).val(operationobj.listTop[i].cb);
		var eqpLi = operationobj.listTop[i].eu;
		if (eqpLi == undefined) {
		} else {
			var eqpArr = [];
			eqpArr = eqpLi.split("\n");
			for ( var k = 0; k < eqpArr.length - 1; k++) {

				var appendValue = eqpArr[k] + "\n";

				var o = new Option("option text", "value");

				var val = $(o).html(appendValue);

				$("#txtEquipmet" + (i + 1)).append(o);

			}
		}
		// set bed side procedure
		$("#txtEquipmetb1").html("");
		$("#txtEquipmetg1").html("");
		$("#txtEquipmeti1").html("");
		var servicesList = operationobj.listTop[i].liTest;
	 //   alert(servicesList.length);
	    
	    if(servicesList.length==0){
	    	$("#inserv").val('Y');
	    }
	    
        for ( var k = 0; k < servicesList.length; k++) {
			var appendValue = "";
			var id = "";
			var o = "";

			appendValue = servicesList[k].tname + "-" + servicesList[k].qty
					+ "\n";
			// alert(appendValue);
			//alert(servicesList[k].ipdbillid);

			id = servicesList[k].test_ID + "-" + servicesList[k].qty + "@"+ servicesList[k].ipdbillid +"\n";
			o = new Option("option text", "value");
			$(o).html(appendValue);
			$(o).val(id);

			if (servicesList[k].ipdservicetype == "b") {
				$("#txtEquipmetb" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "g") {
				$("#txtEquipmetg" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "i") {
				$("#txtEquipmeti" + (i + 1)).append(o);
			} else if (servicesList[k].ipdservicetype == "c") {
				// alert("ok");
				$("#txtEquipmetcreadonly" + (i + 1)).append(o);
			}
		}
		$("#remark").val(operationobj.listTop[i].rem);
		$("#precaution").val(operationobj.listTop[i].presc);
		$("#surgeryDescription").val(operationobj.listTop[i].surDesc);
		$("#indicationForSurgery").val(operationobj.listTop[i].inSur);
		$("#otherReference").val(operationobj.listTop[i].otherReference);
		$("#contactOfReference").val(operationobj.listTop[i].contactOfReference);
		$("#emailOfReference").val(operationobj.listTop[i].emailOfReference);
	*/}


}

// new function added by ROHIT for the team list and valiation
function setTeamDoctorsNew(callfrom)
{
	var teamId = $("#teanNameList").val();
	var teamMemberCount = $("#teamMembersList tr").length;
	
	$.ajax({
		async : false,
		type: "POST",
		url : "./ehat/otdata/fetchTeambyId",
		data : {
			"teamId" : teamId
		},
		error() {
			alert("something went wrong")
		},
		success(r) {
			var isavail = '';
			var htm = "";
			var id = teamMemberCount+1;
			$("#teamMembersList").html('')
			for(var i=0; i < r.listTeamSlave.length; i++)
			{
				//isavail = 'N';
				/*for(var j=1; j<=teamMemberCount; j++)
				{
					var userId = $("#idUser"+j).val();
					if(userId == r.listTeamSlave[i].ui)
					{
						alert(r.listTeamSlave[i].fuNm+" is duplicate in the list, neglecting it...")
						isavail = 'Y'
						break;
					}
				}*/
				
				/*if(isavail == 'N')
				{*/
					htm += "<tr id='idTr"+(1+i)+"'>" +
					       "<td>"+(1+i)+"<input type='hidden' id='idUser"+(1+i)+"' value='"+r.listTeamSlave[i].ui+"'>" +
					       	"<input type='hidden' id='idopDocTbl"+(1+i)+"' value='0'></td>" +
					       "<td id='docNameT"+(1+i)+"'>"+r.listTeamSlave[i].fuNm+"</td>" +
					       "<td id='userType"+(1+i)+"'>"+r.listTeamSlave[i].ut+"</td>" ;
					       if(r.listTeamSlave[i].speciality == null || r.listTeamSlave[i].speciality == "null"){
					    	   htm =  htm +  "<td id='docSpeciality"+(1+i)+"'>"+"-"+"</td>" ;
					       }else{
					    	   htm =  htm +  "<td id='docSpeciality"+(1+i)+"'>"+r.listTeamSlave[i].speciality+"</td>" ;
					       }
					htm =  htm +
					       "<td id='docDpmt"+(1+i)+"'>"+r.listTeamSlave[i].department+"</td>" +
					       "<td id='docTypeT"+(1+i)+"'>"+r.listTeamSlave[i].doctype+"</td>" +
					       "<td id='docmobile"+(1+i)+"'>"+r.listTeamSlave[i].contact_no+"</td>" 
					   //    "<td id='docemail"+(1+i)+"'>"+r.listTeamSlave[i].email_id+"</td>" 
					       if(r.listTeamSlave[i].email_id == null || r.listTeamSlave[i].email_id == "undefined"){
					    	   htm =  htm +  "<td id='docemail"+(1+i)+"'>"+"-"+"</td>" ;
					       }else{
					    	   htm =  htm +  "<td id='docemail"+(1+i)+"'>"+r.listTeamSlave[i].email_id+"</td>" ;
					       }
					htm =  htm +
					       "<td><input type='checkbox' name='checkBoxDoc' value='"+(1+i)+"'></td>" +
					       "</tr>";
				//}
			}
			
			$("#teamMembersList").append(htm)
		}
	});
}

//added by vishant
function fetchOperationCount(categoryId){
	
    var treatmentId = $("#tr_Id").val();
    var patientId = $("#pid").val();
    var topId = $("#topId").val();
   // var result=0;
	var inputs = [];
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('topId=' + topId);
	inputs.push('categoryId=' + categoryId);
	inputs.push('patientId=' + patientId);
	
	
	//inputs.push('unitId=' + 1);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "ehat/ot/fetchOperationCount",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			result=r;
		}
	});
	return result;
	
}

//added by vishant @reason fetch sub service charge
function fetchSubServiceCharge(id){
	
	//var findingName = $("#" + id).val();
	 //var treatmentId = $("#tr_Id").val();
	   // var result=0;
		var inputs = [];
		inputs.push('categoryId=' + id);
		inputs.push('unitId=' + 1);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "ehat/ot/fetchSubServiceCharge",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				result=r;
			}
		});
		return result;
}

function fetchipdbilldetailsOnOTForPrevious(){
	var t = $("#treatmentId").text();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		
		data : {
			"treatmentId" : t,
			"serviceId" : 0
		},
		url : "ehat/opdServicesAdvised/getPatientSubServiceDetailsOnIPD",
		success : function(r) {
		
			//getSubServiceDetailsTemp1(i, r, s);
			setSubServiceDetailsOnIPDForPrevious(r);
		
		},
		error : function(r) {
			alert('Network Issue!!!');
			console.log(r);
		}
	});
}

function setSubServiceDetailsOnIPDForPrevious(r){
	
	 
	
	$("#tOTcharge").html("");
	var htm = "";
	var rowCount = 0;
	
	if (r.listSubServiceIpdDto.length > 0) {
		
		for ( var i = 0; i < r.listSubServiceIpdDto.length; i++) {
			  
			if(r.listSubServiceIpdDto[i].otFlag == "Y" && r.listSubServiceIpdDto[i].drdeskflag != "P"  && r.listSubServiceIpdDto[i].drdeskflag != "I" && r.listSubServiceIpdDto[i].serviceId != 11 ){
				var datetime12= new Date(r.listSubServiceIpdDto[i].createdDate).toLocaleDateString('en-GB');
				var chargesSlaveId= r.listSubServiceIpdDto[i].chargesSlaveId;
					rowCount++;
					
					htm = htm
					+'<tr>'
					+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
					+ '<input id="chkOpdBill'+r.listSubServiceIpdDto[i].billDetailsId+'" type="checkbox" name = "opdBillCheckbox" style="margin-top: 2px; margin-left: 20px; cursor: pointer;" value='+r.listSubServiceIpdDto[i].billDetailsId+'></input></td>'
					
					+ '<td class="col-md-1-1 center" >'+rowCount+'</td>'
					
				    + '<td class="col-md-1-1 center"> '+r.listSubServiceIpdDto[i].docName+' </td>'
				    
				    + '<td class="col-md-1-1 center"> '+r.listSubServiceIpdDto[i].oname+' </td>'
					
					+ '<td class="col-md-2-1 center" style="height: 21.5px;"> '+r.listSubServiceIpdDto[i].categoryName+' </td>'
					
				+ '<td class="col-md-1-1 center" style="height: 21.5px;"> '+datetime12+' </td>'
					
					/*+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].docName+' </td>'*/
					
					/*+ '<td class="col-md-2-1 center"> '+r.listSubServiceIpdDto[i].serviceName+' </td>'*/
					
					if(r.listSubServiceIpdDto[i].paidFlag =="Y"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: orange;" disabled></input></td>'
					}else if(r.listSubServiceIpdDto[i].paidFlag =="N"){
						htm = htm	+ '<td class="col-md-1-1 center"><input type="button" id="statusBtn'+rowCount+'" style="width:60px; background-color: green;" disabled></input></td>'
					}
				
					htm = htm		
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success" onclick=editIpdServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'service\')><i class="fa fa-edit"></i></button></td>'
					
					+'<td class="col-sm-1-1 center" style="height: 21.5px;"><button class="btn btn-xs btn-success deleteservice" onclick=deleteOTServicesAdvised('+r.listSubServiceIpdDto[i].billDetailsId+',\'Service\');" disabled ><i class="fa fa-trash-o"></i></button></td>'
				
				
					
					+ '<td style="display:none;" id="barCode'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					
					/*+	'<td style="display:none;" id="barCode'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" class="subservicesclass" id="subserviceid'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].subServiceId+' </td>'
					
					+	'<td style="display:none;" id="spclId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].specialityId+' </td>'
					
					+	'<td style="display:none;" id="dId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].docId+' </td>'
					
					+	'<td style="display:none;" id="sId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].serviceId+' </td>'
									
					+	'<td style="display:none;" id="amt'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].amount+' </td>'
					
					+	'<td style="display:none;" id="isCombination'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].isCombination+' </td>'
					
					+	'<td style="display:none;" id="emrP'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].emrPer+' </td>'
					
					+	'<td style="display:none;" id="othRates'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].otherRate +' </td>'
					
					+	'<td style="display:none;" id="sndtolabflag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtolabflag+' </td>'
					
					+	'<td style="display:none;" id="sampleType'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sampleTypeId+' </td>'
					
					+	'<td style="display:none;" id="barCodeId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
					
					+	'<td style="display:none;" id="inOutHouse'+(r.listBillNobleServiceDto[i].billDetailsId)+'">'+ r.listBillNobleServiceDto[i].inOutHouse+'</td>'
					
					+	'<td style="display:none;" id="histopathLab'+(r.listBillNobleServiceDto[i].billDetailsId)+'">'+ r.listBillNobleServiceDto[i].histopathLab+'</td>'
					
					+	'<td style="display:none;" id="collectionDate'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionDate+' </td>'
					
					+	'<td style="display:none;" id="collectionTime'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].collectionTime+' </td>'
		
					+	'<td style="display:none;" id="regRefDocId'+(r.listBillNobleServiceDto[i].billDetailsId)+'">0</td>'
		
					// added by vinod
					+	'<td style="display:none;" id="sendToRisId'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].sndtorisflag +' </td>'
					
					// added by vinod
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].templateWise +' </td>'
					
					+	'<td style="display:none;" id="payFlag'+(r.listBillNobleServiceDto[i].billDetailsId)+'"> '+ r.listBillNobleServiceDto[i].paidFlag+' </td>';*/
				
					+'<td style="display:none;" id="sId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].serviceId+' </td>'
					+	'<td style="display:none;" id="spclId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].specialityId+' </td>'
					+	'<td style="display:none;" id="sampleType'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].sampleTypeId+' </td>'
					+	'<td style="display:none;" id="barCodeId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="inOutHouse'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].inOutHouse+'</td>'
					+	'<td style="display:none;" id="histopathLab'+(r.listSubServiceIpdDto[i].billDetailsId)+'">'+ r.listSubServiceIpdDto[i].histopathLab+'</td>'
					+	'<td style="display:none;" id="collectionDate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionDate+' </td>'
					+	'<td style="display:none;" id="collectionTime'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].collectionTime+' </td>'
					+	'<td style="display:none;" id="regRefDocId'+(r.listSubServiceIpdDto[i].billDetailsId)+'">0</td>'
					+	'<td style="display:none;" id="isTemplateWiseTest'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].templateWise +' </td>'
					+	'<td style="display:none;" id="isCombination'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].iscombination +' </td>'
					+	'<td style="display:none;" id="othIpdRate'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].otherRate +' </td>'
					+	'<td style="display:none;" id="catName'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].categoryName +' </td>'
					+	'<td style="display:none;" id="opNameOC'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].oname +' </td>'
					+	'<td style="display:none;" id="dId'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].docId+' </td>'
					if (chargesSlaveId > 0) {
						htm = htm	+ '<td style="display:none;" id="amt' + r.listSubServiceIpdDto[i].billDetailsId + '"> ' +r.listSubServiceIpdDto[i].otherAmount + ' </td>';
					} else {
						htm = htm	+ '<td style="display:none;" id="amt' + r.listSubServiceIpdDto[i].billDetailsId + '"> ' + r.listSubServiceIpdDto[i].amount + ' </td>';
					}	
					htm = htm	
					+	'<td style="display:none;" id="emrP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].emrPer+' </td>'
					+	'<td style="display:none;" id="char'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].rate).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="q'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].quantity+' </td>'
					+	'<td style="display:none;" id="subserviceid'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ r.listSubServiceIpdDto[i].subServiceId+' </td>'
					+	'<td style="display:none;" id="cP'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].coPay).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="con'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concession).toFixed(2)+' </td>'
					+	'<td style="display:none;" id="conPer'+(r.listSubServiceIpdDto[i].billDetailsId)+'"> '+ (r.listSubServiceIpdDto[i].concessionPer).toFixed(2)+' </td>'
					
						+ '</tr>';
				
				}
			
		}
		$("#tOTcharge").html(htm);
	}

}

function getDocListUnitWise1(){
	var callfrom="doctor";
	jQuery.ajax({
		async	: false,
		type 	: "POST",
		data : {
			"callfrom" : callfrom
		},
		url		: "ehat/registration/getDocListUnitWise",
		success : function(r) {
			setTemplateForgetDocListUnitWise(r);
		}
	});
}

function setTemplateForgetDocListUnitWise(r){
	
	var list="<option value='0'>-select-</option>";
	
	for ( var int = 0; int < r.lstDoctorDto.length; int++) {
		list=list+'<option value="'+(r.lstDoctorDto[int].doctor_ID)+'">'+(r.lstDoctorDto[int].doc_name)+'</option>';
		
	}	
	$("#doctorName").html(list);
	$("#doctorName").select2();
	
}

function fetchPreAnaestheticDetails2() {
	var pobj = $("#divPatId").html();
	operationobj = eval('(' + pobj + ')');
	var anaesID = 0;// (operationobj.listTop[0].listOpeAnes[0].anesId);
	//var anaesID = (operationobj.listTop[0].listOpeAnes[0].anesId);
	var tretID = $("#tretID").html();
	if(tretID == undefined){
		tretID = $("#tId").val();
	}
	var type = "ipd";
	
	var inputs = [];
	inputs.push('action=fetchAnaestheticDetails');
	inputs.push('treatmentId=' + tretID);
	//inputs.push('anaesID=' + anaesID);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "OperationServlet",
				url : "ehat/otdata/fetchAnaestheticDetails",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					
				},
				success : function(r) {
					var ajaxResponse = r;
					// alert("aaaa--"+ajaxResponse);
					var div = document.getElementById("divIPDAjaxresponse");
					div.value = ajaxResponse;
					pobj1 = ajaxResponse;  //eval('(' + ajaxResponse + ')');
					$("#divIPDAjaxresponse").val(ajaxResponse);
					if ((pobj1.preAnaestheticList.length) > 0) {
						var arrCL = (pobj1.preAnaestheticList[0].chk_anaesthetic_status).split(",");
						for ( var i = 1; i < arrCL.length; i++) {
							(arrCL[i] == 1) ? $(
									'input[id=checkAppType' + (i) + ']').attr(
									'checked', true) : $(
									'input[id=checkAppType' + (i) + ']').attr(
									'checked', false);
						}

						var arrRL = (pobj1.preAnaestheticList[0].radio_anaesthetic_status).split(",");
						// alert(arrRL);
						for ( var i = 1; i < (arrRL.length); i++) {
							(arrRL[i] == 1) ? $(
									'input[id=radAppType' + (i) + ']').attr(
									'checked', true) : $(
									'input[id=radAppType' + (i) + ']').attr(
									'checked', false);
						}
						if (pobj1.preAnaestheticList[0].coughQty != 0) {
							$("#coughPresent").show();
							$("#cough").val(pobj1.preAnaestheticList[0].coughQty);
							$("#qtyForCough").val(pobj1.preAnaestheticList[0].coughQty);
							$("#selectCoughTime").val(
									pobj1.preAnaestheticList[0].coughTime);
						} else {
							$("#coughPresent").hide();
						}
						if (pobj1.preAnaestheticList[0].dyspnoeaQty != 0) {
							$("#DYSPNOEAPresent").show();
							$("#dyspnoea").val(pobj1.preAnaestheticList[0].dyspnoeaQty);
							$("#qtyForDyspnoea").val(
									pobj1.preAnaestheticList[0].dyspnoeaQty);
							$("#selectDyspnoeaTime").val(
									pobj1.preAnaestheticList[0].dyspnoeaTime);
						} else {
							$("#DYSPNOEAPresent").hide();
						}
						if (pobj1.preAnaestheticList[0].giddinessQty != 0) {
							$("#GiddnessPresent").show();
							$("#giddiness").val(
									pobj1.preAnaestheticList[0].giddinessQty);
							$("#qtyForGiddiness").val(
									pobj1.preAnaestheticList[0].giddinessQty);
							$("#selectGiddinessTime").val(
									pobj1.preAnaestheticList[0].giddinessTime);
						} else {
							$("#GiddnessPresent").hide();
						}
						if (pobj1.preAnaestheticList[0].chestPainQty != 0) {
							$("#chestPainPresent").show();
							$("#chestPain").val(
									pobj1.preAnaestheticList[0].chestPainQty);
							$("#qtyForChestPain").val(
									pobj1.preAnaestheticList[0].chestPainQty);
							$("#selectChestPainTime").val(
									pobj1.preAnaestheticList[0].chestPainTime);
						} else {
							$("#chestPainPresent").hide();
						}

						
						// present medication
						$("#presentMedicationsOther").val(
								pobj1.preAnaestheticList[0].txtPresMedOther);
						$("#prevexp").val(pobj1.preAnaestheticList[0].prevanaes_exp);
						
						
						$("#otherh").val(pobj1.preAnaestheticList[0].other);
						$("#pulse").val(pobj1.preAnaestheticList[0].pulse);
						$("#bp").val(pobj1.preAnaestheticList[0].bp);
						$("#resp").val(pobj1.preAnaestheticList[0].resp);
						
						// Examination Findings Medications
						$("#pallor").val(pobj1.preAnaestheticList[0].pallor);
						$("#ict").val(pobj1.preAnaestheticList[0].icterus);
						$("#cya").val(pobj1.preAnaestheticList[0].cyanosis);
						$("#club").val(pobj1.preAnaestheticList[0].club);
						$("#ode").val(pobj1.preAnaestheticList[0].oedema);
						$("#veins").val(pobj1.preAnaestheticList[0].vein);
						$("#obs").val(pobj1.preAnaestheticList[0].obesity);
						$("#neck").val(pobj1.preAnaestheticList[0].neckobj);
						$("#jaw").text(pobj1.preAnaestheticList[0].jawobj);
						$("#teeth").val(pobj1.preAnaestheticList[0].teethobj);
						$("#spine").val(pobj1.preAnaestheticList[0].spineobj);
						$("#bht").val(pobj1.preAnaestheticList[0].bht);
						
						//
						$("#cvs").val(pobj1.preAnaestheticList[0].cvs);
						$("#rs").val(pobj1.preAnaestheticList[0].rs);
						$("#cns").val(pobj1.preAnaestheticList[0].cns);
						
						
						$("#hb").val(pobj1.preAnaestheticList[0].hb);
						$("#tc").val(pobj1.preAnaestheticList[0].tc);
						$("#p").val(pobj1.preAnaestheticList[0].pobj);
						$("#l").val(pobj1.preAnaestheticList[0].lobj);
						$("#e").val(pobj1.preAnaestheticList[0].eobj);
						$("#m").val(pobj1.preAnaestheticList[0].mobj);
						$("#bone").val(pobj1.preAnaestheticList[0].boneobj);
						$("#smear").val(pobj1.preAnaestheticList[0].smear);
						$("#plat").val(pobj1.preAnaestheticList[0].platelet);
						$("#esr").val(pobj1.preAnaestheticList[0].esr);
						$("#urine").val(pobj1.preAnaestheticList[0].urine);
						$("#bun").val(pobj1.preAnaestheticList[0].bun);
						$("#hiv").val(pobj1.preAnaestheticList[0].hiv);
						$("#bsl").val(pobj1.preAnaestheticList[0].bsl);
						$("#f").val(pobj1.preAnaestheticList[0].fobj);
						$("#pp").val(pobj1.preAnaestheticList[0].ppobj);
						$("#naelec").val(pobj1.preAnaestheticList[0].naElectolytes);
						$("#kelec").val(pobj1.preAnaestheticList[0].kElectolytes);
						$("#clelec").val(pobj1.preAnaestheticList[0].clElectolytes);
						$("#btwo").val(pobj1.preAnaestheticList[0].btwoobj);
						$("#ct").val(pobj1.preAnaestheticList[0].ctobj);
						$("#pt").val(pobj1.preAnaestheticList[0].ptobj);
						$("#screat").val(pobj1.preAnaestheticList[0].screatobj);
						$("#ecg").val(pobj1.preAnaestheticList[0].ecgobj);
						$("#xrayid").val(pobj1.preAnaestheticList[0].xray_chest);
						$("#otherid").val(pobj1.preAnaestheticList[0].other);
						
						//plan of anaesthia
						$("#riskassess").val(pobj1.preAnaestheticList[0].risk_assess);
						$("#proplan").val(pobj1.preAnaestheticList[0].proposed_plan);
						$("#preoper").val(pobj1.preAnaestheticList[0].pre_operativeinstuct);
						$("#premed").val(pobj1.preAnaestheticList[0].pre_medication);
						
						
						$("#other").val(pobj1.preAnaestheticList[0].othmed);
						$("#prosurgery").val(pobj1.preAnaestheticList[0].prosurgery);
						$("#crtdate").val(pobj1.preAnaestheticList[0].created_Date);
						$("#xray").val(pobj1.preAnaestheticList[0].xray);
						$("#blood").val(pobj1.preAnaestheticList[0].bloodgroup);
						$("#regno").html(pobj1.preAnaestheticList[0].tc);
						// $("#anaesname").html(pobj1.preAnaestheticList[0].doctorlist[0].dn);

						if (type == 'ipd') {
							// $("#indoor").val(pobj1.preAnaestheticList[0].ipdno);
							$("#indoor").val(pobj1.preAnaestheticList[0].preanesid);
						} else if (type == 'opd')
							$("#opd").val(pobj1.preAnaestheticList[0].ipdno);
						/*
						 * $("#divIPDAjaxresponse").setTemplate(pobj1);
						 * alert($("#divIPDAjaxresponse").val());
						 * $("#divIPDAjaxresponse").processTemplate(pobj1);
						 */
						$("#queryType").val("update");
					} else {

						$("#queryType").val("insert");
					}
				}
			});

}

function deleteMultiplepharma(values,callform ){
	var patienttId   =  $("#pt_Id").val();
	var treatmentId  =  $("#tr_Id").val(); 
	var storeId  =  $("#storeId").val(); 
	var treatmentoperationid = $("#treatmentoperationid").val();
	var labservicelist =[];
	//var cnt =-1;
	if (values=='multiple'){
		
		 $('input[name=drugBillCheckbox]:checked').each( function(){
			 labservicelist.push(parseInt($(this).val()));
		});
		
		 if(labservicelist.length<1){
			   
			   alert("Please Check Multiple Service to delete");	   
			   return false;
			   
		   }
	}else{
		labservicelist=labservicelist+","+ values;
	}
	var tk = labservicelist.toString()
	
	jQuery.ajax({
		async : false,
		type 	: "POST",
		url 	: "ehat/ot/deleteMultipleOTservice",
		data	: {
			
		  "labservicelist" : tk,
			"callform":callform,
			"patienttId":patienttId,
			"treatmentId":treatmentId,
			"treatmentoperationid":treatmentoperationid,
			"storeId": storeId
		},
		timeout : 1000 * 60 * 5,
		cache 	: false,
	
		success : function(response) {
			if(callform=="OTDRUG"){
				var masterId = $("#lisHcd0").val();// chargesId
				var serviceLastId = 0;// static chargesSlaveId
				var liSizeCom = $("#dynamicItemdrug li").length;
				serviceLastId = $("#lisHcd" + (liSizeCom - 1)).val();
				var otab="ONTAB";
				
				fetchdetailsOT(0, 0 ,callform,otab );
				//	fetchbilldetails();   //for OPD 
				
				
			}else if(callform=="OTINV"){
				var masterId = $("#lisHci0").val();// chargesId
				var serviceLastId = 0;// static chargesSlaveId
				var liSizeCom = $("#dynamicItemINV li").length;
				serviceLastId = $("#lisHci" + (liSizeCom - 1)).val();
				var otab="ONTAB";
				fetchdetailsOT(0, 0 ,callform,otab );
				$("#queryTypeOI").val('insert');
				 //for ipd
				
			}else if(callform=="OTCATH"){
				var masterId = $("#lisHcat0").val();// chargesId
				var serviceLastId = 0;// static chargesSlaveId
				var liSizeCom = $("#dynamicItemcath li").length;
				serviceLastId = $("#lisHcat" + (liSizeCom - 1)).val();
				var otab="ONTAB";
				fetchdetailsOT(0, 0 ,callform,otab );
				 //for ipd
				
			}else if(callform=="CPOE"){
				var masterId = $("#lisHcpe0").val();// chargesId
				var serviceLastId = 0;// static chargesSlaveId
				var liSizeCom = $("#dynamicItemcpoe li").length;
				serviceLastId = $("#lisHcpe" + (liSizeCom - 1)).val();
				var otab="ONTAB";
				fetchdetailsOT(0, 0 ,callform,otab );
				 //for ipd
				
			}
			
			alertify.success(response);
		//	window.location.reload(true);
		}
		
	});	
}

function getFileValue(id){
	var files = $('#'+id).prop("files");
	var document = $.map(files, function(val) {
		return val.name;
	});
	return document;
}


function getOtNotesDataByOtId(){
	var otNotesId=$("#selOtTempRecord").val();
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"otNotesId" : otNotesId,
				"callFrom" : ""
		},
		
		url : "ehat/otdata/getOtNotesDataByOtId",
		success : function(r) {
	
			
			if(r.listOTNotes.length > 0){
				$("#idOTNote").val(r.listOTNotes[0].idOTOPNotes);
				$("#iEBLoss").val(r.listOTNotes[0].estimatedBLoodLoss);
				$("#iABLoss").val(r.listOTNotes[0].actualBLoodLoss);
				$("#iICount").val(r.listOTNotes[0].instrumentCount);
				$("#iRecBy").val(r.listOTNotes[0].recordedBy);
				$("#iMOPCount").val(r.listOTNotes[0].mopCountRecordedBy);
				$("#iOTNotesComment").val(r.listOTNotes[0].comment);
				$("#iOTImplantDetails").val(r.listOTNotes[0].implantdetails);
				$("#selCustomizeTemp").val(r.listOTNotes[0].templateID);
				$("#editor1").val(r.listOTNotes[0].chkData);
				CKEDITOR.instances['editor1'].setData(r.listOTNotes[0].chkData);
			}
		}
	});
}

