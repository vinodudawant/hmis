var rowCount = 1;
var k = 1;
var count = 1;
var sr = 1;
var q=0;

var IPD_DRRAdminTemp = 	"{#foreach $T.drrl as drrl}"
	+ "<tr id='div{rowCount}'>"
		+ "<td style='height: 21.5px; width: 52px; text-align: center;'>{count++}.</td>"
		+ "<td style='height: 21.5px; width: 115px;'>"
		+ "<input type='text' readonly='readonly' class='form-control input-SmallText demo' id='t{rowCount}' value='{$T.drrl.tm}' onmouseover='click2(this)' onkeypress='return validateComma(event)' />"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 195px;'>"
		+ "<select class='form-control input-SmallText TextFont' id='tn{rowCount}'><option></option></select>"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 275px;'>"
		+ "<textarea rows='2' cols='37' id='cf{rowCount}' name='textfield' onkeypress='return validateComma(event)'>{$T.drrl.cn}</textarea>"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 275px;'>"
		+ "<textarea rows='2' cols='37' id='ia{rowCount}' name='textfield' onkeypress='return validateComma(event)'>{$T.drrl.ia}</textarea>"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 215px;'>"
		+ "<select disabled class='form-control input-SmallText TextFont' id='rb{rowCount}'><option></option></select>"
		//+ "<input type='text' class='form-control input-SmallText TextFont' id='rb{rowCount}' disabled='disabled'></input>"

		+ "</td>"
		+ "{#if $T.drrl.ct =='-'}"
		+ "<td style='height: 21.5px;width: 114px;'>"
		+ "<input type='checkbox' value='{$T.drrl.di}' name='checkbox{rowCount}' id='checkbox' class='deleteUserAccess' disabled='disabled'/>"
		+ "</td>"
		+"{#else}"
		+ "<td style='height: 21.5px;width: 114px;'>"
		+ "<input type='checkbox' value='{$T.drrl.di}' name='checkbox{rowCount}' id='checkbox' class='deleteUserAccess' disabled='disabled'/>"
		+ "<div><a title='{$T.drrl.ct} , {$T.drrl.nn}' data-placement='left' data-toggle='tooltip' style='color:red; ' href='#'><i class='fa fa-plus-circle'></i></a></div>"
		+ "</td>"
		+"{#/else }{#/if}"
		+ "</tr>"
		+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
		+ "<input type='hidden' value='{$T.drrl.di}' id='DrrId{k++}' />"
		+ "{#/for}"
		+ "<input type='hidden' value='{--rowCount}' id='addRowCount' />"
		+ "<input type='hidden' value='{rowCount}' id='RowCount' />"
		+ "<input type='hidden' value='{$T.drrl.blid}' id='bilid{rowCount}' />";


/*_______________@author : Touheed Khan @date : 31-May-2016 @reason : readonly fields ______*/

var IPD_DRRAdminTempDash = 	"{#foreach $T.drrl as drrl}"
		+ "<tr id='div{rowCount}'>"
		+ "<td style='height: 21.5px; width: 75px; text-align: center;'>{count++}.</td>"
		+ "<td style='height: 21.5px; width: 101px;'>"
		+ "<input type='text' readonly='readonly' disabled='disabled' class='form-control input-SmallText demo' id='t{rowCount}' value='{$T.drrl.tm}' onmouseover='click2(this)' onkeypress='return validateComma(event)' />"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 250px;'>"
		+ "<textarea rows='2' cols='35' id='cf{rowCount}' name='textfield'  readonly='readonly' onkeypress='return validateComma(event)'>{$T.drrl.cn}</textarea>"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 250px;'>"
		+ "<textarea rows='2' cols='35' id='ia{rowCount}' name='textfield'  readonly='readonly' onkeypress='return validateComma(event)'>{$T.drrl.ia}</textarea>"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 221px;'>"
		+ "<select disabled class='form-control input-SmallText TextFont' id='rb{rowCount}' disabled='disabled'><option></option></select>"
		//+ "<input type='text' class='form-control input-SmallText TextFont' id='rb{rowCount}' disabled='disabled'></input>"

		+ "</td>"
		+ "<td style='height: 21.5px; width: 101px;'>"
		+ "<input type='text' onmouseover='click2(this)' value='{$T.drrl.ct}' id='drct{rowCount}' onkeypress='return validateComma(event)' class='form-control input-SmallText demo' readonly='readonly'>"
		+ "<input type='checkbox' name='checkbox{rowCount}' id='chkReset{rowCount}' />"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 50px;'>"
		+ "<textarea rows='2' cols='22' id='nn{rowCount}' name='textfield' onkeypress='return validateComma(event)'>{$T.drrl.nn}</textarea>"
		+ "</td>"
		+ "</tr>"
		+ "<input type='hidden' value='{$T.drrl.nad}' id='nad{rowCount}' />"
		+ "<input type='hidden' value='{$T.drrl.nat}' id='nat{rowCount}' />"
		+ "<input type='hidden' value='{$T.drrl.uip}' id='uip{rowCount}' />"
		+ "<input type='hidden' value='{$T.drrl.uid}' id='uid{rowCount}' />"
		+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
		+ "<input type='hidden' value='{$T.drrl.di}' id='DrrId{k++}' />"
		+ "{#/for}"
		+ "<input type='hidden' value='{--rowCount}' id='addRowCount' />"
		+ "<input type='hidden' value='{rowCount}' id='RowCount' />";


/*_______________@author : Touheed Khan @date : 31-May-2016 @reason : readonly fields ______*/


var IPD_DRRTemp = 	"{#foreach $T.drrl as drrl}"
	+ "<tr id='div{rowCount}'>"
	+ "<td style='height: 21.5px; width: 52px; text-align: center;'>{count++}.</td>"
	+ "<td style='height: 21.5px; width: 115px;'>"
	+ "<input type='text' readonly='readonly' class='form-control input-SmallText demo' id='t{rowCount}' value='{$T.drrl.tm}' onmouseover='click2(this)' onkeypress='return validateComma(event)' />"
	+ "</td>"
	+ "<td style='height: 21.5px; width: 195px;'>"
	+ "<select class='form-control input-SmallText TextFont' id='tn{rowCount}'><option></option></select>"
	+ "</td>"
	+ "<td style='height: 21.5px; width: 275px;'>"
	+ "<textarea rows='2' cols='37' id='cf{rowCount}' name='textfield' onkeypress='return validateComma(event)'>{$T.drrl.cn}</textarea>"
	+ "</td>"
	+ "<td style='height: 21.5px; width: 275px;'>"
	+ "<textarea rows='2' cols='37' id='ia{rowCount}' name='textfield' onkeypress='return validateComma(event)'>{$T.drrl.ia}</textarea>"
	+ "</td>"
	+ "<td style='height: 21.5px; width: 215px;'>"
	+ "<select class='form-control input-SmallText TextFont' id='rb{rowCount}'><option></option></select>"
	//+ "<input type='text' class='form-control input-SmallText TextFont' id='rb{rowCount}'>"

	+ "</td>"
	+ "{#if $T.drrl.ct =='-'}"
	+ "<td style='height: 21.5px;width: 114px;'>"
	+ "<input type='checkbox' value='{$T.drrl.di}' name='checkbox{rowCount}' id='checkbox' class='deleteUserAccess' disabled='disabled'/>"
	+ "</td>"
	+"{#else}"
	+ "<td style='height: 21.5px;width: 114px;'>"
	+ "<input type='checkbox' value='{$T.drrl.di}' name='checkbox{rowCount}' id='checkbox' class='deleteUserAccess' disabled='disabled'/>"
	+ "<div><a title='{$T.drrl.ct} , {$T.drrl.nn}' data-placement='left' data-toggle='tooltip' style='color:red; ' href='#'><i class='fa fa-plus-circle'></i></a></div>"
	+ "</td>"
	+"{#/else }{#/if}"
	+ "</tr>"
	+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
	+ "<input type='hidden' value='{$T.drrl.di}' id='DrrId{k++}' />"
	+ "{#/for}"
	+ "<input type='hidden' value='{--rowCount}' id='addRowCount' />"
	+ "<input type='hidden' value='{rowCount}' id='RowCount' />";



var dispDoctor = "<option value='0'>--Select--</option>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
//var dispDoctor = "<input type='text'>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";

var dispChart = "<option value='select'>Select Chart</option>{#foreach $T.cl as cl}<option value='{$T.cl.cid}'>{$T.cl.cn}</option>{#/for} ";
var createDiv = "<input type='button' onclick='CreateDiv()' value='+'	style='padding-right: %' />";
var saveChart = "<input onclick='SaveChart()' class='btn btn-xs btn-success editUserAccess' type='button' value='Save Now' disabled='disabled'/>";


var RowCountMaterial = 0;

var IPD_MaterialsTemp = " <div class='col-sm-12-1' id=''>"
	+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: 0px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th style='height: 21.5px; width: 25px;'><label class='TextFont'>#</label></th>"
	+ "<th style='height: 21.5px; width: 116px;'><label class='TextFont'>Time</label></th>"
	+ "<th style='height: 21.5px; width: 297px;'><label class='TextFont'>Material Used</label></th>"
	+ "<th style='height: 21.5px; width: 135px;'><label class='TextFont'>Quantity</label></th>"
	+ "<th style='height: 21.5px; width: 153px;'><label class='TextFont'>Used By</label></th>"
	+ "<th style='height: 21.5px; width: 200px;'><label class='TextFont'>Billable/Replaceable</label></th>"
	+ "</tr>"
	+ "</thead>"
	+ "</table>"
	+ "</div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 300px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody id='MaterialDiv'>"
		+ "{#foreach $T.bcl as bcl}"
		+ "<tr id='divM{++RowCountMaterial}'>"
			+ "<td style='height: 21.5px; width: 29px;' id='srNo'>{RowCountMaterial}.</td>"
			+ "<td style='height: 21.5px; width: 142px;'><input type='text' class='form-control input-SmallText TextFont' onmouseover='click1(this)' name='textfield' id='t{RowCountMaterial}' value='{$T.bcl.tm}' readonly='readonly'/></td>"
			+ "<td style='height: 21.5px; width: 365px;'><input type='text' class='form-control input-SmallText TextFont' name='textfield' id='mt{RowCountMaterial}' value='{$T.bcl.oi.in}' readonly='readonly'/></td>"
			+ "<td style='height: 21.5px; width: 166px;'><input type='text' class='form-control input-SmallText TextFont' name='textfield' id='qty{RowCountMaterial}' value='{$T.bcl.qty}' readonly='readonly'/></td>"
			+ "<td style='height: 21.5px; width: 188px;'><input type='text' class='form-control input-SmallText TextFont' name='textfield' value='{$T.bcl.od.dn}' readonly='readonly'/></td>"
			+ "<td style='height: 21.5px;'>"
				+ "<label style='padding-left: 20px;' class='radio TextFont' >"
				+ "<input type='radio' name='Radio{RowCountMaterial}' value='B' id='Billable{RowCountMaterial}' />Billable</label>"
				+ "<label style='padding-left: 20px;' class='radio TextFont' id='lblReplacable{RowCountMaterial}'>"
				+ "<input type='radio' name='Radio{RowCountMaterial}' value='R' id='Replace{RowCountMaterial}' />Replaceable</label>"
			+"</td>"
			+ "<td style='height: 21.5px;'><input type='checkbox' value='{$T.bcl.bcid}' name='checkbox{RowCountMaterial}' id='checkbox' /></td>"
		+ "</tr>"
		+ "<input type='hidden' value='{$T.bcl.bcid}' id='bcid{RowCountMaterial}' />"
		+ "<input type='hidden' name='textfield' id='ub{RowCountMaterial}' value='{$T.bcl.ub}' />"
		+ "<input type='hidden' value='{RowCountMaterial}' id='txtRowCount' name='txtRowCount' />"
		+ "<input type='hidden' id='mid{RowCountMaterial}' value='{$T.bcl.mid}' />"
		+ "{#/for} "
		+ "<input type='hidden' value='0' id='addRowCountMaterial' />"
		+ "<input type='hidden' value='{RowCountMaterial}' id='RowCountMaterial' />"
		+ "</tbody>" 
		+ "</table>" 
	+ "</div>";

var IPD_MaterialsAdminTemp = " <div class='col-sm-12-1' id=''>"
	+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th style='height: 21.5px; width: 25px;'><label class='TextFont'>#</label></th>"
	+ "<th style='height: 21.5px; width: 116px;'><label class='TextFont'>Time</label></th>"
	+ "<th style='height: 21.5px; width: 297px;'><label class='TextFont'>Material Used</label></th>"
	+ "<th style='height: 21.5px; width: 135px;'><label class='TextFont'>Quantity</label></th>"
	+ "<th style='height: 21.5px; width: 153px;'><label class='TextFont'>Used By</label></th>"
	+ "<th style='height: 21.5px; width: 200px;'><label class='TextFont'>Billable/Replaceable</label></th>"
	+ "</tr>"
	+ "</thead>"
	+ "</table>"
	+ "</div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 300px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody id='MaterialDiv'>"
		+ "{#foreach $T.bcl as bcl}"
		+ "<tr id='divM{++RowCountMaterial}'>"
			+ "<td style='height: 21.5px; width: 29px;' id='srNo'>{RowCountMaterial}.</td>"
			+ "<td style='height: 21.5px; width: 142px;'><input type='text' class='form-control input-SmallText TextFont' name='textfield' id='tm{RowCountMaterial}' value='{$T.bcl.tm}' /></td>"
			+ "<td style='height: 21.5px; width: 365px;'><input type='text' class='form-control input-SmallText TextFont' name='textfield' id='mt{RowCountMaterial}' value='{$T.bcl.mn}' readonly = 'readonly' /><input type='hidden' value = '{$T.bcl.Imd}' id = 'Idmt{RowCountMaterial}'></td>"
			+ "<td style='height: 21.5px; width: 166px;'><input type='text' class='form-control input-SmallText TextFont' name='textfield' id='qty{RowCountMaterial}' value='{$T.bcl.qty}' /></td>"
			+ "<td style='height: 21.5px; width: 188px;'>{$T.bcl.od.dn}</td>"
			+ "<td style='height: 21.5px;'>"
			+ "{#if $T.bcl.mty=='B'}"
				+ "<input type='radio' name='Radio{RowCountMaterial}' value='B' id='Billable{RowCountMaterial}' checked = 'checked'/>Billable"
				+ "<input type='radio' name='Radio{RowCountMaterial}' value='R' id='Replace{RowCountMaterial}' />Replaceable"
				+ "{#elseif $T.bcl.mty=='R'}"
				+ "<input type='radio' name='Radio{RowCountMaterial}' value='B' id='Billable{RowCountMaterial}' />Billable"
				+ "<input type='radio' name='Radio{RowCountMaterial}' value='R' id='Replace{RowCountMaterial}' checked = 'checked' />Replaceable"
				+"{#else}"
				+ "<input type='radio' name='Radio{RowCountMaterial}' value='B' id='Billable{RowCountMaterial}' />Billable"
				+ "<input type='radio' name='Radio{RowCountMaterial}' value='R' id='Replace{RowCountMaterial}' />Replaceable"
				+"{#/else }{#/if}"
			+"</td>"
			+ "<td style='height: 21.5px;'><input type='checkbox' value='{$T.bcl.sid}' name='checkbox{RowCountMaterial}' id='checkbox' class='ipdMaterialCheckbox' disabled='disabled'/></td>"
		+ "</tr>"
		+ "<input type='hidden' value='{$T.bcl.sid}' id='bcid{RowCountMaterial}' />"
		+ "<input type='hidden' name='textfield' id='ub{RowCountMaterial}' value='{$T.bcl.ub}' />"
		+ "<input type='hidden' value='{RowCountMaterial}' id='txtRowCount' name='txtRowCount' />"
		+ "<input type='hidden' id='mid{RowCountMaterial}' value='{$T.bcl.mid}' />"
		+ "{#/for} "
		+ "<input type='hidden' value='0' id='addRowCountMaterial' />"
		+ "<input type='hidden' value='{RowCountMaterial}' id='RowCountMaterial' />"
		+ "</tbody>" 
		+ "</table>" 

	+ "</div>";

var dischargeContent = "<div style='width: 99.45%; padding-top: 0%;'><div	style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 19%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Time</div><div	style='width: 24%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>MaterialUsed</div><div	style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Quantity</div><div	style='width: 24%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>UsedBy</div></div></div></div><div	style='width: 99.45%; height: 71%; overflow-y: scroll; border: 1px solid #436a9d;'	id='MaterialDiv'>{#foreach $T.bcl as bcl}<div id='div{rowCount}'	style='width: 100%; height: 28px; border-bottom: 1px solid #069; background-color: lightgray;'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 20.50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.bcl.tm}</div><div	style='width: 24%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.bcl.oi.in}</div><div	style='width: 11.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>{$T.bcl.qty}</div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>{$T.bcl.od.dn}</div></div></div>{#/for} </div>";
var setInvestTestTemp = " <table border='1' cellpadding='0' cellspacing='0' width='100%'	style='border-color: lightgray;'>	<tr height='25' style='width: 100%;'>		<td align='center' width='10%;'>#</td>		<td align='center' width='30%;'>Test Name</td>		<td align='center' width='20%;'>Test Date</td>		<td align='center' width='40%;'>Test Note</td></tr>	{#foreach $T.pl[0].liT as test}	<tr height='20'>		<td align='center' width='10%;'>{sr++}</td>		<td style='padding-left: 10px;' width='30%;' id='tname{count}'>{$T.test.tname}</td>		<td style='padding-left: 10px;' width='20%;' id='testDate{count}'>{$T.pl[0].trt[q++].time}</td>		<td style='padding-left: 10px;' width='40%;'><input type='text' id='testNote{count++}' width='90%;'></td>	</tr>	{#/for}<input type='hidden' id='testNoteCount' value='{count}'></table>";

var settreatGivenTemp = "<table border='1' cellpadding='0' cellspacing='0' width='100%'  style='border-color: lightgray;'><tr height='25'><td align='center'>#</td><td align='center'>Date</td><td align='center'>Drugs and Dose</td><td align='center'>Remarks</td></tr>{#foreach $T.pl[0].liOrdCdrugs as drugs} <tr height='20'><td align='center'>{count++}</td><td style='padding-left: 10px;'>{$T.pl[0].objom.date}</td><td style='padding-left: 10px;'>{$T.drugs.drdo}</td><td style='padding-left: 10px;'>{$T.drugs.rmrk}</td></tr>{#/for}</table>";
/** *************************Start DIC**************************** */
var preBloodChartAdminTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Random</div><div	style='width: 40%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Treatment</div><div	style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '>                            <div style='width: 5.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 22%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 41.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='o{rowCount}' value='{$T.crl.ot}'	  /></div><div	style='width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:1%;padding-top:5px'><input type='checkbox'    value='{$T.crl.crid}' name='checkbox{rowCount}' id='checkbox'/></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preBloodChartTemp =      "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Random</div><div	style='width: 40%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Treatment</div><div	style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069; background-color: lightgray; '><div style='width: 5.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' type='text'	readonly='readonly' onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 22%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	readonly='readonly'  /></div><div	style='width: 41.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' type='text' id='o{rowCount}' value='{$T.crl.ot}'	readonly='readonly'  /></div><div	style='width: 12%; height: 25px;  padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:1%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preTempChartAdminTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Temprature</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 21.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 29.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 30%; height: 25px; text-align:center;border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'><input type='checkbox'    value='{$T.crl.crid}' name='checkbox{rowCount}' id='checkbox'/></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var prePRateChartAdminTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Pulse Rate</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 21.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 29.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 30%; height: 25px; text-align:center;border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'><input type='checkbox'    value='{$T.crl.crid}' name='checkbox{rowCount}' id='checkbox'/></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preIntakeChartAdminTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Intake</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Output</div><div	style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 19.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 19.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='o{rowCount}' value='{$T.crl.ot}'	  /></div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; text-align:center;padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'><input type='checkbox'    value='{$T.crl.crid}' name='checkbox{rowCount}' id='checkbox'/></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preTempChartTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Temprature</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069; background-color: lightgray; '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 21.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 29.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 30%; height: 25px; text-align:center;border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var prePRateChartTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Pulse Rate</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069; background-color: lightgray; '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 21.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 29.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 30%; height: 25px; text-align:center;border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preIntakeChartTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Intake</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Output</div><div	style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069; background-color: lightgray; '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 19.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 19.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text' id='o{rowCount}' value='{$T.crl.ot}'	  /></div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; text-align:center;padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var bloodChartAddButtonTemp="<input type='button' onclick=CreateDiv()  value='+'	id='addButton' style='padding-right: 2%' />";
var bloodChartRemoveButtonTemp="<input type='button' onclick=toRemoveDivDIC('RowCount') value='-' style='padding-right: %' />";
var tempratureChartAddButtonTemp="<input type='button' onclick=CreateDivTemp() value='+'	id='addButton' style='padding-right: 2%' />";
var tempratureChartRemoveButtonTemp="<input type='button' onclick=toRemoveDivDIC('RowCount') value='-' style='padding-right: %' />";
var pulseChartAddButtonTemp="<input type='button' onclick=CreateDivPulse() value='+'	id='addButton' style='padding-right: 2%' />";
var pulseChartRemoveButtonTemp="<input type='button' onclick=toRemoveDivDIC('RowCount') value='-' style='padding-right: %' />";
var intakeChartAddButtonTemp="<input type='button' onclick=CreateDivIntake() value='+'	id='addButton' style='padding-right: 2%' />";
var intakeChartRemoveButtonTemp="<input type='button' onclick=toRemoveDivDIC('RowCount') value='-' style='padding-right: %' />";
var oxygenationChartAddButtonTemp="<input type='button' onclick=CreateDivOxygenation() value='+'	id='addButton' style='padding-right: 2%' />";
var oxygenationChartRemoveButtonTemp="<input type='button' onclick=toRemoveDivDIC('RowCount') value='-' style='padding-right: %' />";
var oxygenationChartAdminTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Start Time</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Out Time</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Hrs</div><div	style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 19.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 19.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='o{rowCount}' value='{$T.crl.ot}'	onkeypress='return validateNumbers(event)'  /></div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; text-align:center;padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'><input type='checkbox'    value='{$T.crl.crid}' name='checkbox{rowCount}' id='checkbox'/></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var oxygenationChartTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Start Time</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Out Time</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Hrs</div><div	style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069; background-color: lightgray; '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 19.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 19.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; background-color: lightgray; ' readonly='readonly'  type='text' id='o{rowCount}' value='{$T.crl.ot}'	onkeypress='return validateNumbers(event)'  /></div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; text-align:center;padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var monitorChartAdminTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Monitor</div><div	style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 300px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'><div id='div1' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>1.</div><div	style='width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='t1' value=''	onkeypress='return validateNumbers(event)'  /></div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; text-align:center;padding-left: 1%; padding-top: 3px;' id='1' ></div></div><input type='hidden' value='1' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='1'	id='addRowCount' /><input type='hidden' value='1'	id='RowCount' /></div>	</div>";

var postOperationChartAdminTemp = " <div class='col-sm-8-1'>"
	+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th style='height: 21.5px;'><label class='TextFont'>#</label></th>"
	+ "<th style='height: 21.5px;'><label class='TextFont'>Post Operation(hrs.)</label></th>"
	+ "<th style='height: 21.5px;'><label class='TextFont'>Sign</label></th>"
	+ "</tr>"
	+ "</thead>"
	+ "</table>"
	+ "</div>"
	+ "<div id='DRRDiv' class='col-sm-8-1' style='margin-top:-22px; border: 1px solid #ddd; overflow-y:scroll; height: 220px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "<tr id='div1'>"
		+ "<td style='height: 21.5px; width: 79px;'>1.</td>"
		+ "<td style='height: 21.5px; width: 519px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='t1' value=''	onkeypress='return validateNumbers(event)' />"
		+ "</td>"
		+ "<td style='height: 21.5px;'  id='1'></td>"
		+ "</tr>" 
		+ "<input type='hidden' value='1' id='txtRowCount' name='txtRowCount' />"
		+ "<input type='hidden' value='1' id='addRowCount' /><input type='hidden' value='1' id='RowCount' />"
		+ "</tbody>" 
		+ "</table>" + "</div>";

var intencivistAdminTemp = " <div class='col-sm-8-1'>"
	+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th style='height: 21.5px; width: 80px;'><label class='TextFont'>#</label></th>"
	+ "<th style='height: 21.5px; width: 519px;'><label class='TextFont'>Intensivist</label></th>"
	+ "<th style='height: 21.5px;'><label class='TextFont'>Sign</label></th>"
	+ "</tr>"
	+ "</thead>"
	+ "</table>"
	+ "</div>"
	+ "<div id='DRRDiv' class='col-sm-8-1' style='margin-top:-22px; border: 1px solid #ddd; overflow-y:scroll; height: 220px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "<tr id='div1'>"
		+ "<td style='height: 21.5px; width: 79px;'>1.</td>"
		+ "<td style='height: 21.5px; width: 519px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='t1' value=''	onkeypress='return validateNumbers(event)' />"
		+ "</td>"
		+ "<td style='height: 21.5px;'  id='1'></td>"
		+ "</tr>" 
		+ "<input type='hidden' value='1' id='txtRowCount' name='txtRowCount' />"
		+ "<input type='hidden' value='1' id='addRowCount' /><input type='hidden' value='1' id='RowCount' />"
		+ "</tbody>" 
		+ "</table>" + "</div>";

function setOxygenationChartAddButtonTemp(){
	var sampleBean;
	$("#addDiv").setTemplate(oxygenationChartAddButtonTemp);
	$("#addDiv").processTemplate(sampleBean);
}

function setOxygenationChartRemoveButtonTemp(){
	var sampleBean;
	$("#removeDiv").setTemplate(oxygenationChartRemoveButtonTemp);
	$("#removeDiv").processTemplate(sampleBean);
}

function setIntakeChartAddButtonTemp(){
	var sampleBean;
	$("#addDiv").setTemplate(intakeChartAddButtonTemp);
	$("#addDiv").processTemplate(sampleBean);
}

function setIntakeChartRemoveButtonTemp(){
	var sampleBean;
	$("#removeDiv").setTemplate(intakeChartRemoveButtonTemp);
	$("#removeDiv").processTemplate(sampleBean);
}

function setpulseChartAddButtonTemp(){
	var sampleBean;
	$("#addDiv").setTemplate(pulseChartAddButtonTemp);
	$("#addDiv").processTemplate(sampleBean);
}

function setpulseChartRemoveButtonTemp(){
	var sampleBean;
	$("#removeDiv").setTemplate(pulseChartRemoveButtonTemp);
	$("#removeDiv").processTemplate(sampleBean);
}

function setTempratureChartRemoveButtonTemp(){
	var sampleBean;
	$("#removeDiv").setTemplate(tempratureChartRemoveButtonTemp);
	$("#removeDiv").processTemplate(sampleBean);
}

function setTempratureChartAddButtonTemp(){
	var sampleBean;
	$("#addDiv").setTemplate(tempratureChartAddButtonTemp);
	$("#addDiv").processTemplate(sampleBean);
}

function setbloodChartRemoveButtonTemp(){
	var sampleBean;
	$("#removeDiv").setTemplate(bloodChartRemoveButtonTemp);
	$("#removeDiv").processTemplate(sampleBean);
}

function setPostOperationChartRemoveButtonTemp(){
	var sampleBean;
	$("#removeDiv").setTemplate(bloodChartRemoveButtonTemp);
	$("#removeDiv").processTemplate(sampleBean);
}
function setBloodChartCreateDivTemp(){
	var sampleBean;
	$("#addDiv").setTemplate(bloodChartAddButtonTemp);
	$("#addDiv").processTemplate(sampleBean);
}

var i = 1;

function CreateDivOxygenation() {
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;
	var userNm = $("#txtUserName").val();
	var UserId = $("#txtUserId").val();
	var t = $("#t" + rowCount + "").val();
	var input = $("#i" + rowCount + "").val();
	var ot = $("#o" + rowCount + "").val();
	if (t == "" && input == "" && ot == "") {
		alert("Please fill the previous added row.");
		return false;
	}
	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;

	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');
	document.getElementById("DRRDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (sr++)
			+ '</div><div	style="width: 19.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text" class="demo"	onmouseover="click1(this)" name="textfield"  id="t'
			+ rowCount
			+ '"	value=""  /></div><div	style="width: 19.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text" class="demo"	onmouseover="click1(this)" name="textfield"	id="i'
			+ rowCount
			+ '" value=""/></div><div	style="width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text"	id="o'
			+ rowCount
			+ '" value=""/></div><div style="width:24%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align:center;" id="s'
			+ rowCount + '">' + userNm + '</div><div style="height: 25px; padding-left: 2%; padding-top: 3px;"><input type="checkbox"   name="checkbox'
			+ rowCount
			+ '"  /></div></div>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

}


function CreateDivIntake() {
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;
	var userNm = $("#txtUserName").val();
	var UserId = $("#txtUserId").val();
	var t = $("#t" + rowCount + "").val();
	var input = $("#i" + rowCount + "").val();
	var ot = $("#o" + rowCount + "").val();
	if (t == "" && input == "" && ot == "") {
		alert("Please fill the previous added row.");
		return false;
	}
	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;
		var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');
	document.getElementById("DRRDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (sr++)
			+ '</div><div	style="width: 19.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text" class="demo"	onmouseover="click1(this)" name="textfield"  id="t'
			+ rowCount
			+ '"	value=""  /></div><div	style="width: 19.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text"	id="i'
			+ rowCount
			+ '" value=""/></div><div	style="width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text"	id="o'
			+ rowCount
			+ '" value=""/></div><div style="width:24%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align:center;" id="s'
			+ rowCount + '">' + userNm + '</div><div style="height: 25px; padding-left: 2%; padding-top: 3px;"><input type="checkbox"   name="checkbox'
			+ rowCount
			+ '"  /></div></div>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
}

function CreateDivPulse() {
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;
	var userNm = $("#txtUserName").val();
	var UserId = $("#txtUserId").val();
	var t = $("#t" + rowCount + "").val();
	var input = $("#i" + rowCount + "").val();
	var ot = $("#o" + rowCount + "").val();
	if (t == "" && input == "" && ot == "") {
		alert("Please fill the previous added row.");
		return false;
	}
	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;

	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');
	document.getElementById("DRRDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (sr++)
			+ '</div><div	style="width: 21.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text" class="demo"	onmouseover="click1(this)" name="textfield"  id="t'
			+ rowCount
			+ '"	value=""  /></div><div	style="width: 29.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text"	id="i'
			+ rowCount
			+ '" value=""/></div><div style="width:30%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align:center;" id="s'
			+ rowCount + '">' + userNm + '</div><div style="height: 25px; padding-left: 2%; padding-top: 3px;"><input type="checkbox"   name="checkbox'
			+ rowCount
			+ '"  /></div></div>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
}

function CreateDivTemp() {
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;
	var userNm = $("#txtUserName").val();
	var UserId = $("#txtUserId").val();
	var t = $("#t" + rowCount + "").val();
	var input = $("#i" + rowCount + "").val();
	var ot = $("#o" + rowCount + "").val();
	if (t == "" && input == "" && ot == "") {
		alert("Please fill the previous added row.");
		return false;
	}
	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;

	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');
	document.getElementById("DRRDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (sr++)
			+ '</div><div	style="width: 21.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text" class="demo"	onmouseover="click1(this)" name="textfield"  id="t'
			+ rowCount
			+ '"	value=""  /></div><div	style="width: 29.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text"	id="i'
			+ rowCount
			+ '" value=""/></div><div style="width:30%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align:center;" id="s'
			+ rowCount + '">' + userNm + '</div><div style="height: 25px; padding-left: 2%; padding-top: 3px;"><input type="checkbox"   name="checkbox'
			+ rowCount
			+ '"  /></div></div>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

}
var chartPrintBean="";
function printChart()
{

	var chartValue = 0;
	var datePick = $("#date-pick").val();

	var inputs = [];
	inputs.push('action=Printchart');
	inputs.push('data=preChart');
	inputs.push('tid=' + pobj1.trid);
	inputs.push('chartValue=' + chartValue);
	inputs.push('datePick=' + datePick);

	var str = inputs.join('&');
	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

			chartPrintBean = eval('(' + ajaxResponse + ')');
			if(chartPrintBean.crl.length==0)
			{
				alert("Chart Not Prepared...");
				return false;
			}

	var pinfo=$("#divPatId").html();
	pinfo=eval('('+pinfo+')');

	var WindowObject = window.open('', ' ', '');
	WindowObject.document.writeln('<html><body>');

	 
	 WindowObject.document
	.writeln('<div style="width: 100%; padding-left: 2%; text-align: center;"		id="SRBill"><h1>Daily Investigation Chart</h1></div>');
 

	 WindowObject.document
		.writeln("<div style='width: 80%; float: left; padding-top: 2.5%;'><div style='width: 70%; float: left;'><div style='width: 100%; float: left;'>	<div	style='width: 23%; float: left; padding-left: 7%; padding-top: 1%; '>Name:</div><div	style='width: 63%; float: left; padding-right: 7%; padding-top: 1%;color: #002c67;'>"
				+ pinfo.fn
				+ " "
				+ pinfo.ln
				+ "</div></div></div><div style='width: 30%; float: left;'><div style='width: 100%; padding-top: 2%;'>	<div style='width: 43%; padding-left: 7%; padding-top: 1%; float: left; font-weight: bold;'>Date:</div><div	style='width: 43%; padding-right: 7%; color: #002c67; float: left;'	id='bid'>"
				+ $("#date-pick").val()
				+ "</div></div></div></div></div>");


	 WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 9.5%; text-align: left; font-weight: bold;  ">Blood Sugar </div>');
	 
	 WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">#</div><div	style="width: 12%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 20.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Random</div>	<div	style="width: 33%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Treatment</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
	 var count = 1;
	 for(var i=0; i< chartPrintBean.crl.length; i++)
	 {
	 
	 if(chartPrintBean.crl[i].cid == 1)
	 {
	 
		 WindowObject.document.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'+ count +'</div><div	style="width: 12%; border: 1px solid #069; text-align: center; float: left;">'+ chartPrintBean.crl[i].tm +'</div><div	style="width: 20.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;"></div>	<div	style="width: 33%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'+ chartPrintBean.crl[i].ot +'</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'+ chartPrintBean.crl[i].objU.dn +'</div></div></div>');
		 count++; 
	 }

	 }
	 
	 WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 12.5%; text-align: left; font-weight: bold; ">Temprature </div>');

	 WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 6%; border: 1px solid #069; text-align: center; float: left;">#</div><div	style="width: 20%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 37.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Random</div>	<div	style="width: 27%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
	 count = 1;
	 for(i=0; i<chartPrintBean.crl.length; i++)
	 {
	 
	 if(chartPrintBean.crl[i].cid == 2)
	 {
	 	WindowObject.document.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 6%; border: 1px solid #069; text-align: center; float: left;">'+ count +'</div><div	style="width: 20%; border: 1px solid #069; text-align: center; float: left;">'+ chartPrintBean.crl[i].tm +'</div><div	style="width: 37.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'+ chartPrintBean.crl[i].in +'</div>	<div	style="width: 27%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'+ chartPrintBean.crl[i].objU.dn +'</div></div></div>');
	 	 count++; 
	 }
	 
	 }
	 
	 WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 8.5%; text-align: left; font-weight: bold; ">Pulse Rate </div>');

	 WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 6%; border: 1px solid #069; text-align: center; float: left;">#</div><div	style="width: 20%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 37.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Pulse Rate</div>	<div	style="width: 27%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
	 
	 count = 1;
	 for(i=0; i<chartPrintBean.crl.length; i++)
	 {
	 
	 if(chartPrintBean.crl[i].cid == 3)
	 {
	 	WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 6%; border: 1px solid #069; text-align: center; float: left;">'+ count +'</div><div	style="width: 20%; border: 1px solid #069; text-align: center; float: left;">'+ chartPrintBean.crl[i].tm +'</div><div	style="width: 37.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'+ chartPrintBean.crl[i].in +'</div>	<div	style="width: 27%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'+ chartPrintBean.crl[i].objU.dn +'</div></div></div>');
	 	 count++; 
	 }
	 
	 }
	 WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 8.5%; text-align: left; font-weight: bold; ">Intake I/O  </div>');

	 WindowObject.document
		.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">#</div><div	style="width: 12%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 20.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Intake</div>	<div	style="width: 33%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Output</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
	 
	 
	 count = 1;
	 for(i=0; i<chartPrintBean.crl.length; i++)
	 {
	 
	 if(chartPrintBean.crl[i].cid == 4)
	 {
	 	WindowObject.document.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'+ count +'</div><div	style="width: 12%; border: 1px solid #069; text-align: center; float: left;">'+ chartPrintBean.crl[i].tm +'</div><div	style="width: 20.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'+ chartPrintBean.crl[i].in +'</div>	<div	style="width: 33%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'+ chartPrintBean.crl[i].ot +'</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'+ chartPrintBean.crl[i].objU.dn +'</div></div></div>');
	 	 count++; 
	 }

	 }

WindowObject.document.writeln('</body></html>');

WindowObject.document.close();

WindowObject.focus();

WindowObject.print();


WindowObject.close();
		}
	});

}
function setButtonsaveDIC() {
	var chart_type=$('#chart option:selected').text();
	if(chart_type=="Select Chart")
	{
		saveDIC();
	}else{
		SaveChart();
	}
}

function getChartReport() {

	$("#printButton").hide();
	var chart_type = $('#chart option:selected').text();
	AddSave();
	rowCount = 1;
	k = 1;
	count = 1;
	sr = 1;
	pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var chartValue = $("#chart").val();
	var datePick = $("#date-pick").val();
	
	var inputs = [];
	inputs.push('action=chart');
	inputs.push('data=preChart');
	inputs.push('tid=' + pobj1.trid);
	inputs.push('cid=' + chartValue);
	inputs.push('datePick=' + datePick);
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

					ajaxResponse=r;
					
					$("#DIC").html(ajaxResponse);
					chartBean = eval('(' + ajaxResponse + ')');
					var userType = $("#userType").val();
				
					if (chart_type == "Select Chart") {
						window.location.reload();
					} else if (chart_type == "Blood Sugar") {
						$("#removeButton").show();
						if (userType == "admin") {
							setBloodChartCreateDivTemp();
							setbloodChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(
									preBloodChartAdminTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						} else {
							setBloodChartCreateDivTemp();
							setbloodChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(preBloodChartTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						}
					} else if (chart_type == "Temparature") {
						$("#removeButton").show();
						if (userType == "admin") {
							setTempratureChartAddButtonTemp();
							setTempratureChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(
									preTempChartAdminTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						} else {
							setTempratureChartAddButtonTemp();
							setTempratureChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(preTempChartTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						}

					} else if (chart_type == "Pulse Rate") {
						$("#removeButton").show();
						if (userType == "admin") {
							setpulseChartAddButtonTemp();
							setpulseChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(
									prePRateChartAdminTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						} else {
							setpulseChartAddButtonTemp();
							setpulseChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(prePRateChartTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						}

					} else if (chart_type == "Intake O/P Chart") {
						$("#removeButton").show();
						if (userType == "admin") {
							setIntakeChartAddButtonTemp();
							setIntakeChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(
									preIntakeChartAdminTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						} else {
							setIntakeChartAddButtonTemp();
							setIntakeChartRemoveButtonTemp();
							$("#IPD_DICContent")
									.setTemplate(preIntakeChartTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						}

					} else if (chart_type == "Oxygenation"
							|| chart_type == "Ventilation"
							|| chart_type == "Nebulization") {
						$("#removeButton").show();
						if (userType == "admin") {
						    setOxygenationChartAddButtonTemp();
							setOxygenationChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(
									oxygenationChartAdminTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						} else {
							setOxygenationChartAddButtonTemp();
							setOxygenationChartRemoveButtonTemp();
							$("#IPD_DICContent").setTemplate(
									oxygenationChartTemp);
							$("#IPD_DICContent").processTemplate(chartBean);
						}

					} else if (chart_type == "Monitor" || chart_type == "Post Operation" || chart_type == "Intencivist" ) {

						// $("#addDiv").html("");
						// $("#removeDiv").html("");
						$("#addButton").hide();
						$("#removeButton").hide();
						$("#addDiv").hide();
						var userNm = $("#txtUserName").val();
						var sampleBean = 0;
						if(chart_type == "Monitor"){
							$("#IPD_DICContent").setTemplate(monitorChartAdminTemp);
						}else if(chart_type == "Intencivist"){ 
							$("#IPD_DICContent").setTemplate(intencivistAdminTemp);
						}else {

							$("#IPD_DICContent").setTemplate(postOperationChartAdminTemp);
						}

						$("#IPD_DICContent").processTemplate(sampleBean);


						if (chartBean.crl.length == 0) {
							$("#1").html(userNm);
						} else {
							$("#t1").val(chartBean.crl[0].tm);
							$("#1").html(chartBean.crl[0].objU.dn);
						}
					}
				}
			});
}

function getChartReportNew(tid, cid) {

	$("#printButton").hide();
	var chart_type = $('#cType option:selected').text();
	AddSave();
	rowCount = 1;
	k = 1;
	count = 1;
	sr = 1;
	pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	$("#chart").val(cid);
	var datePick = $("#date-pick").val();
	// alert(chartValue+pobj1.trid);
	var inputs = [];
	inputs.push('action=chart');
	inputs.push('data=preChart');
	inputs.push('tid=' + tid);
	inputs.push('cid=' + cid);
	inputs.push('datePick=' + datePick);
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

					ajaxResponse=r;
					// alert(ajaxResponse);
					$("#DIC").html(ajaxResponse);
					chartBean = eval('(' + ajaxResponse + ')');
					if (chart_type == "Select Chart") {
						window.location.reload();
					}else if (chart_type == "Post Operation" || chart_type == "Intensivist" ) {

						// $("#addDiv").html("");
						// $("#removeDiv").html("");
						// $("#addButton").hide();
						// $("#removeButton").hide();
						// $("#addDiv").hide();
						var userNm = $("#txtUserName").val();
						var sampleBean = 0;
						if(chart_type == "Monitor"){
							$("#IPD_DICContent").setTemplate(monitorChartAdminTemp);
						}else if(chart_type == "Intensivist"){ 
							$("#IPD_DICContent").setTemplate(intencivistAdminTemp);
						}else {

							$("#IPD_DICContent").setTemplate(postOperationChartAdminTemp);
						}

						$("#IPD_DICContent").processTemplate(sampleBean);


						if (chartBean.crl.length == 0) {
							$("#1").html(userNm);
						} else {
							$("#t1").val(chartBean.crl[0].tm);
							$("#1").html(chartBean.crl[0].objU.dn);
						}
					}
				}
			});
}

/** ***************************End DIC************************************ */

function setHospitalDetailsForPatient(hospDetail)
{
	var	hospitalDetails = JSON
			.stringify(hospDetail);
		$("#hospDetails").html(hospitalDetails);
		// var hospDetailsobj = eval('(' +
		// billBean.hospDetail[0] + ')');
		var hosp = hospitalDetails;// billBean.hospDetail[0];
		$("#hospName").html(hosp.hn);
		$("#hospAdd").html(hosp.ha + "-" + hosp.hz);
		$("#contact").html(hosp.hcon);
		// $("#hospitaldetails").html(hospDetails.listHosDetail[0].hn);
		$("#hospitalLogo").attr('src', hosp.flpt);
}

var dischargeSummTemp = "<div style='width: 100%; height: 1%; background-color: #85a7d4;'></div><div style='width: 98%;height:500px; padding: 1%;overflow-y: scroll;'><div	style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 70%; color: #FFF; text-align: left; padding-left: 2%;'> Discharge Summary </div></div></div><div style='width: 100%; '>					<div style='width: 96%; padding: 2%;'>							<div									style='width: 98%; padding: 1%; font-weight: bold; border: 1px solid #09C;'>									<div style='width: 100%;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Name											of the Patient</div>										<div style='width: 40%; color: red;'>											<input id='patName' style='width: 90%;' name='' type='text'												value=''  />										</div>										<div											style='width: 10%; color: #000; text-align: left; padding-left: 1%;'>Reg.											No.</div>										<div style='width: 20%; color: red;'>											<input id='regNo' style='width: 90%;' name='' type='text' value='' />										</div>									</div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Age</div>										<div style='width: 40%; color: red;'>											<input id='age' style='width: 45%;' name='' type='text' value=''	/>										</div>										<div											style='width: 10%; color: #000;  padding-left: 1%;'>Gender</div>										<div style='width: 20%; color: red;'>											<input id='sex' style='width: 90%;' name='' type='text' value=''	/>										</div>									</div><div style='width: 100%; padding-top: 20px;'>	<div style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Name of the Consultant</div><div style='width: 40%; color: red;'><input id='consultName' type='text' value='' name='' style='width: 90%;'></div></div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Date											of Admission</div>										<div style='width: 20%; color: red;'>											<input id='admitDate' style='width: 90%;' name='' type='text' value='' />										</div>									</div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Date											of Discharge</div>										<div style='width: 20%; color: red;'>											<input id='dischargeDate' style='width: 90%;' name='' value=''	 />										</div>									</div><div style='width: 100%; padding-top: 20px;'>										<div style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>MLC NO</div>										<div style='width: 40%; color: red;'>											<input type='text' value='' name='' style='width: 45%;' id='mlcNo'>										</div>										<div style='width: 10%; color: #000;  padding-left: 1%;'>Police Station Name</div>										<div style='width: 20%; color: red;'>											<input type='text' value='' name='' style='width: 90%;' id='policStaName'>										</div><div style='width: 100%; padding-top: 20px;'>										<div style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>CONSTABLE NAME</div>										<div style='width: 40%; color: red;'>											<input type='text' value='' name='' style='width: 45%;' id='constName'>										</div>										<div style='width: 10%; color: #000;  padding-left: 1%;'>BUCCLE NO</div>										<div style='width: 20%; color: red;'>											<input type='text' value='' name='' style='width: 90%;' id='buccleNo'>										</div><div style='width: 100%; padding-top: 20px;'>										<div style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>ADDRESS AND PHONE</div>										<div style='width: 20%; color: red;'>											<input type='text' value='' name='' style='width: 90%;' id='addPh'>										</div>									</div>												<div style='width: 100%; padding-top: 20px;'>																													<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Incharge											Dr./unit</div>										<div style='width: 20%; color: red;'>											<input id='inchargeDr' style='width: 90%;' name='' value='Dr Satish Roplekar'												type='text' />										</div>									</div><div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Admission Note</div>										<div style='width: 20%; color: red;'>											<textarea id='adNote' rows='3' cols='80'  ></textarea>										</div>									</div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Diagnosis</div>										<div style='width: 20%; color: red;'>											<textarea id='digno' rows='5' cols='50'  ></textarea>										</div>									</div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Risk											Factors</div>										<div style='width: 20%; color: red;'>											<textarea id='riskFact' rows='5' cols='50' ></textarea>										</div>									</div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Complications</div>										<div style='width: 20%; color: red;'>											<textarea id='complication' rows='5' cols='50' ></textarea>										</div>									</div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Presenting											Symptoms</div>										<div style='width: 20%; color: red;'>											<textarea id='preSymp' rows='5' cols='50' ></textarea>										</div>									</div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Clinical											Findings</div>										<div style='width: 20%; color: red;'>											<textarea id='cliFind' rows='5' cols='50' ></textarea>										</div>									</div>									<div style='width: 100%; padding-top: 20px;'></div>									<div style='width: 100%; padding-top: 20px;'>										<div											style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Investigation</div>										<div style='width: 43%; color: black;' id='testContent'></div>										<table>											<tr>												<td align='center' style='padding-left: 10px;' height='25'></td>											</tr>										</table>									</div><div style='width: 100%; padding-top: 20px;'><div style='width: 25%; color: #000; text-align: left; padding-left: 1%;' id='printOther'>Special Investigation</div><div style='width: 20%; color: red;'><textarea id='specInvest' rows='5' cols='50' ></textarea></div></div><div style='width: 100%; padding-top: 20px;'><div	style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Treatment	Given</div><div id='drugsContent' style='width: 50%;color: black;'></div></div><div style='width: 100%; padding-top: 20px;'><div style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Condition	At Discharge</div><div style='width: 20%; color: red;'><textarea id='condDisc' rows='5' cols='50'	></textarea></div></div><div style='width: 100%; padding-top: 20px;'><div style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Treatment Advised At Discharge</div><div style='width: 20%; color: red;'><textarea id='treAdvDisc' rows='15' cols='50' ></textarea></div></div><div style='width: 100%; padding-top: 20px;'><div style='width: 25%; color: #000; text-align: left; padding-left: 1%;'>Operation Note</div><div style='width: 50%; '><textarea type='text'  id='oprNote' rows='5' cols='50' ></textarea></div></div></div></div></div></div>";
function getDischargeSummary(type){
	if(type=="case"){
		myObj = JSON.parse($("#pinfo").html());
		patID=myObj.pi;
		treatID=myObj.trid;
		$("#patientinfo").hide();
		$("#RTreatment").hide();
		$("#DTreatment").hide();
		$("#discharge").show();
		$("#ReplaceSheet").hide();
		$("#orderForm").hide();
		$("#prescription").hide();
		$("#orderFormDetails").hide();
		$("#NursingChartDate").hide();
		$("#IPD_DICContent").hide();
		$("#DoctorRoundDate").hide();
		$("#DoctorRoundDetails").hide();
		$("#InvestigationChart").hide();
		$("#InvestigationChartDetails").hide();
		$("#OperationNames").hide();
		$("#CommonPatInfo").hide();
		$("#Operation").hide();
		$("#OpearationSummary").hide();
		$("#OperationReport").hide();
		$("#OperationReport").hide();	 
		$("#CAPAtContent").hide();
		$("#2DECHO").hide();
	}else{
	patID = $("#patID").val();
	treatID = $("#treatID").val();
	}
var inputs = [];
	inputs.push('action=getDischargeSummary');
	inputs.push('patID=' + patID);
	inputs.push('treatID=' + treatID);

	var str = inputs.join('&');

	jQuery.ajax( {
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
			 alert(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');

		if(pobj.pl[0].ods[0]!=undefined){

			if(pobj.pl[0].ods[0].investItem!=undefined){
				var investigationItem=(pobj.pl[0].ods[0].investItem).split(",");
					var template="";
					for ( var i = 0; i < investigationItem.length; i++) {
						var item=investigationItem[i].split("#");
						if(item.length==2){
							template=template+"<option value="+item[0]+">"+item[1]+"</option>";
						}
					}
				$("#txtEquipmetb1").html(template);
			}

			if(pobj.pl[0].ods[0].physoItem!=undefined){
				var physoItem=(pobj.pl[0].ods[0].physoItem).split(",");
				var template="";
				for ( var i = 0; i < physoItem.length; i++) {
					var item=physoItem[i].split("#");
					if(item.length==2){
						template=template+"<option value="+item[0]+">"+item[1]+"</option>";
					}
				}
			  $("#txtEquipmetg1").html(template);
			}
			if(pobj.pl[0].ods[0].dentItem!=undefined){
				var dentItem=(pobj.pl[0].ods[0].dentItem).split(",");
				var template="";
				for ( var i = 0; i < dentItem.length; i++) {
					var item=dentItem[i].split("#");
					if(item.length==2){
						template=template+"<option value="+item[0]+">"+item[1]+"</option>";
					}
				}
				$("#txtEquipmeti1").html(template);
			}
			if(pobj.pl[0].ods[0].dentItem!=undefined){
				var pathoItem=(pobj.pl[0].ods[0].pathoItem).split(",");// alert(pathoItem);
				var template="";
				for ( var i = 0; i < pathoItem.length; i++) {
					var item=pathoItem[i].split("#");
					if(item.length==2){
						template=template+"<option value="+item[0]+">"+item[1]+"</option>";
					}
				}
				$("#txtEquipmetp1").html(template);
			}
			if(pobj.pl[0].ods[0].dentItem!=undefined){
				var causaItem=(pobj.pl[0].ods[0].causaItem).split(",");
				var template="";
				for ( var i = 0; i < causaItem.length; i++) {
					var item=causaItem[i].split("#");
					if(item.length==2){
						template=template+"<option value="+item[0]+">"+item[1]+"</option>";
					}
				}
				$("#txtEquipmetc1").html(template);
			}

			if(pobj.pl[0].ods[0].idCustomizeTemplate!=undefined){
				$("#selCustomizeTemp").val(pobj.pl[0].ods[0].idCustomizeTemplate);
				CKEDITOR.instances['editor1'].setData(pobj.pl[0].ods[0].templateData);
			}

		}


			// setHospitalDetailsForPatient(pobj.pl[0].hospDetails);
			if(pobj.pl.length == 0  )
			{

				alert("Please Close Treatment To View Discharge Summary.");
				window.location.href = "IPD_Discharge_Dashboard.jsp"; 
			}
			else{

				setInvestTest(pobj);
				setDrugsContent(pobj);
			var patNM =pobj.pl[0].tit +" " + pobj.pl[0].fn + " " +  pobj.pl[0].mn+" "+ pobj.pl[0].ln ; 

			$("#patName").val(patNM);
			$("#regNo").val(pobj.pl[0].pi);
			$("#age").val(pobj.pl[0].ag+" "+pobj.pl[0].agtp);
			$("#sex").val(pobj.pl[0].sx);

			if(undefined != pobj.pl[0].liMLC ){

			$("#mlcNo").val(pobj.pl[0].liMLC[0].mlcid);
			$("#policStaName").val(pobj.pl[0].liMLC[0].Pnm);
			$("#constName").val(pobj.pl[0].liMLC[0].Anm);
			$("#buccleNo").val(pobj.pl[0].liMLC[0].Bno);
			$("#addPh").val(pobj.pl[0].liMLC[0].padd);
			}else
				{
						$("#divMlc").hide();

				}
			if(undefined != pobj.pl[0].listTop ){
				var operationNote="";
				var countNote=0;
				for(var i=0;i<pobj.pl[0].listTop.length;i++){
					if(pobj.pl[0].listTop[i].fnd!="" &&pobj.pl[0].listTop[i].fnd!= undefined){
						countNote++;
						operationNote=operationNote+(countNote)+"-"+pobj.pl[0].listTop[i].fnd+"\n";
					}
				}
				$("#oprNote").val(operationNote);
			}

			if ((pobj.pl[0].objTreat.sy) == "undefined") {
				$("#adNote").val("");
			} else {
				$("#adNote").val(pobj.pl[0].objTreat.sy);
			}

			$("#admitDate").val(pobj.pl[0].objTreat.treStart);

			$("#dateExpectedDischarge").val(pobj.pl[0].objTreat.treEnd+" "+pobj.pl[0].objTreat.out);

		    // $("#refBy").val(pobj.pl[0].objTreat.rb);
			if(pobj.pl[0].IPDDoctorList.length != 0){
				$("#inchargeDr").val(pobj.pl[0].IPDDoctorList[0].docName);
			}else{
				$("#inchargeDr").val(pobj.pl[0].admit);
			}


			 if(pobj.pl[0].ods=="") {
				 var date=new Date();
			 // $("#dateExpectedDischarge").val( date.getDate() + "-" +
				// (date.getMonth()+1)+ "-" + date.getFullYear()+"
				// "+date.getHours()+":"+date.getMinutes()
				// +":"+date.getSeconds());
			 } else {
			  $("#digno").val(pobj.pl[0].ods[0].dia);
			  $("#preSymp").val(pobj.pl[0].ods[0].psym);
			  $("#cliFind").val(pobj.pl[0].ods[0].clf);
			  $("#specInvest").val(pobj.pl[0].ods[0].sinv);  
			  $("#treatGive").val(pobj.pl[0].ods[0].tg);
			  $("#ipdNo").val(pobj.pl[0].objTreat.trCount);
			  $("#riskFact").val(pobj.pl[0].ods[0].rsk);
			  $("#complication").val(pobj.pl[0].ods[0].cmp);  
			  $("#invest").val(pobj.pl[0].ods[0].investigation);
			  $("#condDisc").val(pobj.pl[0].ods[0].tad);
				   
				 // $("#treAdvDisc").val(pobj.pl[0].ods[0].ta);
				 $("#disSummID").val(pobj.pl[0].ods[0].id);
				 
				 $("#treatmentGiven").val(pobj.pl[0].ods[0].trgiven);
				 var testNote =pobj.pl[0].ods[0].investigation;
					var note = testNote.split("@");
					for ( var j = 1; j < note.length; j++) {
						$("#testNote"+j).val(note[j]);
					}
				 
				 var prescription = pobj.pl[0].ods[0].ta;
					var prescr = prescription.split("@");
					for ( var i = 1; i < prescr.length; i++) {
						if (i != (prescr.length) && i != 1) {
							createDivPriscription();
						}
						var med = prescr[i].split("-");
						var medLength=med.length;
						var medicineName;
						for ( var j = 0; j <(medLength-7); j++) {
							if(j==0){
								medicineName=med[j];
							}else{
								medicineName=medicineName+"-"+med[j];
							}
						}

						$("#Medicine" + i).val(medicineName);
						if (med[medLength-7] == 1) {
							$('input[id=M' + i + ']').attr('checked', true);
						}
						if (med[medLength-6] == 1) {
							$('input[id=A' + i + ']').attr('checked', true);
						}
						if (med[medLength-5] == 1) {
							$('input[id=E' + i + ']').attr('checked', true);
						}
						if (med[medLength-4] == 1) {
							$('input[id=N' + i + ']').attr('checked', true);
						}

						$("#Instruction" + i).val(med[medLength-3]);
						$("#Days" + i).val(med[medLength-2]);
						$("#Qty" + i).val(med[medLength-1]);
					}
			 }

			 // $("#investigation").val(pobj.pl[0].liT[0].tname);
			/*
			 * $("#digno").val(pobj.pl[0].otd.st);
			 * $("#preSymp").val(pobj.pl[0].otd.ps);
			 * $("#cliFind").val(pobj.pl[0].otd.cf);
			 * $("#specInvest").val(pobj.pl[0].otd.si); //
			 * $("#treatGive").val(pobj.pl[0].tn.dn);
			 * 
			 * $("#riskFact").val(pobj.pl[0].otd.rf);
			 * $("#complication").val(pobj.pl[0].otd.cm); $("#sysExa").val();
			 * $("#invest").val();
			 */

			 // $("#condDisc").val(pobj.pl[0].cn);
			 // $("#treatmentGiven").val(pobj.pl[0].ods[0].trgiven);
			 
			 var treAdvAtDischarge = "Drug  List:" + "\n";
			 for ( var k = 0; k < pobj.pl[0].liOrdCdrugs.length; k++) {
			 	treAdvAtDischarge = treAdvAtDischarge + pobj.pl[0].liOrdCdrugs[k].drdo
			 			+ "  " + pobj.pl[0].liOrdCdrugs[k].sign + " "
			 			+ pobj.pl[0].liOrdCdrugs[k].rmrk + "\n";
			 }
			 treAdvAtDischarge += "\nStat Doses:";
			 for ( var z = 0; z < pobj.pl[0].ocs.length; z++) {
			 	treAdvAtDischarge = treAdvAtDischarge + pobj.pl[0].ocs[z].stdo + "\n";
			 }
			 treAdvAtDischarge = treAdvAtDischarge + "\nInvestigation  Advised:\n"
			 		+ pobj.pl[0].objom.invest + "\n" + "\nInvestigation  Advised:\n"
			 		+ pobj.pl[0].objom.readrmrk + "\n";
			 $("#treAdvDisc").val(treAdvAtDischarge);
			 $("#obj").val(pobj);	 
			 
			 $("#ipdNo").val(pobj.pl[0].objTreat.trCount);
			 if(pobj.pl[0].ods[0] != undefined){
			 
			 if(pobj.pl[0].ods[0].Paed_dept == "PD"){
				 // Paediatric Dept
				// $("#nicu").hide();
					// $("#paedDept").show();
					document.getElementById("chkpd").checked = true;
				 
					 $("#pastHistory").val(pobj.pl[0].ods[0].paediatricDept.past_history);
					 $("#generalExamination").val(pobj.pl[0].ods[0].paediatricDept.general_examination);
					 $("#cvs").val(pobj.pl[0].ods[0].paediatricDept.cvs);
					 $("#rs").val(pobj.pl[0].ods[0].paediatricDept.rs);
					 $("#pa").val(pobj.pl[0].ods[0].paediatricDept.pa);
					 $("#cns").val(pobj.pl[0].ods[0].paediatricDept.cns);
					 $("#ps").val(pobj.pl[0].ods[0].paediatricDept.ps);
					 $("#plateletCount").val(pobj.pl[0].ods[0].paediatricDept.platelet_count);
					 $("#urineR").val(pobj.pl[0].ods[0].paediatricDept.urine_r);
					 $("#stoolR").val(pobj.pl[0].ods[0].paediatricDept.stool_r);
					 $("#bsl").val(pobj.pl[0].ods[0].paediatricDept.bsl);
					 $("#csf").val(pobj.pl[0].ods[0].paediatricDept.csf);
					 $("#ott").val(pobj.pl[0].ods[0].paediatricDept.ott);
					 $("#srcalcium").val(pobj.pl[0].ods[0].paediatricDept.srcalcium);
					 $("#coombTest").val(pobj.pl[0].ods[0].paediatricDept.coombs_test);
					 $("#pdsrna").val(pobj.pl[0].ods[0].paediatricDept.srna);
					 $("#pdsrk").val(pobj.pl[0].ods[0].paediatricDept.srk);
					 $("#pdsrcl").val(pobj.pl[0].ods[0].paediatricDept.srcl);
					 $("#srBillirubin").val(pobj.pl[0].ods[0].paediatricDept.sr_billirubin);
					 $("#unconj1").val(pobj.pl[0].ods[0].paediatricDept.unconj1);
					 $("#unconj2").val(pobj.pl[0].ods[0].paediatricDept.unconj2);
					 $("#pdxray").val(pobj.pl[0].ods[0].paediatricDept.x_ray);
					 $("#pdusg").val(pobj.pl[0].ods[0].paediatricDept.usg);
					 $("#pdctmri").val(pobj.pl[0].ods[0].paediatricDept.ct_mri);
					 $("#pdtt").val(pobj.pl[0].ods[0].paediatricDept.tt);
					 $("#pdFOther").val(pobj.pl[0].ods[0].paediatricDept.other);
					 $("#courseOfRec").val(pobj.pl[0].ods[0].paediatricDept.course_of_rec);
					 $("#pdManagement").val(pobj.pl[0].ods[0].paediatricDept.management);
					 
					 var arrRL = (pobj.pl[0].ods[0].paediatricDept.immunisation_status).split(",");
                     for ( var i = 0; i < arrRL.length; i++) {
                            (arrRL[i+1] == "Y") ? $('input[id=chk' + (i + 1) + ']').attr('checked', true): $('input[id=chk' + (i + 1) + ']').attr('checked',false);

                     }

					 $("#otherVaccines").val(pobj.pl[0].ods[0].paediatricDept.other_vaccines);
					 $("#anyOtherPoints").val(pobj.pl[0].ods[0].paediatricDept.any_other);
					 $("#followUpAdvise").val(pobj.pl[0].ods[0].paediatricDept.follow_up_advice);

				 
			 } else if(pobj.pl[0].ods[0].Paed_dept == "nicuPD"){
				 // Paediatric Nicu Dept
				// $("#nicu").show();
				 
				 	document.getElementById("chknicupd").checked = true;
					// $("#paedDept").hide();
				 
					 $("#duration").val(pobj.pl[0].ods[0].PaediatricDeptNicu.duration);
					 $("#srcl").val(pobj.pl[0].ods[0].PaediatricDeptNicu.srcl);
					 $("#usg").val(pobj.pl[0].ods[0].PaediatricDeptNicu.usg);
					 $("#mode1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.mode1);
					 $("#mode2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.mode2);
					 $("#pip1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.pip1);
					 $("#pip2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.pip2);
					 $("#peep1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.peep1);
					 $("#peep2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.peep2);
					 $("#fio1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.fio1);
					 $("#fio2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.fio2);
					 $("#date1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.date1);
					 $("#date2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.date2);
					 $("#date3").val(pobj.pl[0].ods[0].PaediatricDeptNicu.date3);
					 $("#date4").val(pobj.pl[0].ods[0].PaediatricDeptNicu.date4);
					 $("#billirubin1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.billirubin1);
					 $("#billirubin2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.billirubin2);
					 $("#billirubin3").val(pobj.pl[0].ods[0].PaediatricDeptNicu.billirubin3);
					 $("#billirubin4").val(pobj.pl[0].ods[0].PaediatricDeptNicu.billirubin4);
					 $("#total1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.total1);
					 $("#total2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.total2);
					 $("#total3").val(pobj.pl[0].ods[0].PaediatricDeptNicu.total3);
					 $("#total4").val(pobj.pl[0].ods[0].PaediatricDeptNicu.total4);
					 $("#indirect1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.indirect1);
					 $("#indirect2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.indirect2);
					 $("#indirect3").val(pobj.pl[0].ods[0].PaediatricDeptNicu.indirect3);
					 $("#indirect4").val(pobj.pl[0].ods[0].PaediatricDeptNicu.indirect4);
					 $("#direct1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.direct1);
					 $("#direct2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.direct2);
					 $("#direct3").val(pobj.pl[0].ods[0].PaediatricDeptNicu.direct3);
					 $("#direct4").val(pobj.pl[0].ods[0].PaediatricDeptNicu.direct4);
					 $("#phototherapy1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.phototherapy1);
					 $("#phototherapy2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.phototherapy2);
					 $("#phototherapy3").val(pobj.pl[0].ods[0].PaediatricDeptNicu.phototherapy3);
					 $("#phototherapy4").val(pobj.pl[0].ods[0].PaediatricDeptNicu.phototherapy4);
					 $("#redReflex1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.redReflex1);
					 $("#redReflex2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.redReflex2);
					 $("#hips1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hips1);
					 $("#hips2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hips2);
					 $("#femorals1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.femorals1);
					 $("#femorals2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.femorals2);
					 $("#genitals1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.genitals1);
					 $("#genitals2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.genitals2);
					 $("#hernia1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hernia1);
					 $("#hernia2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hernia2);
					 $("#headcir1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.headcir1);
					 $("#headcir2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.headcir2);
					 $("#pcother1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.pcother1);
					 $("#pcother2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.pcother2);
					 
					 var rop = (pobj.pl[0].ods[0].PaediatricDeptNicu.ropScreen1).split("*");

					 $("#ropScreen0").val(rop[0]);
					 $("#ropScreen1").val(rop[1]);
					 $("#ropScreen2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.ropScreen2);
					 
					 var hear = (pobj.pl[0].ods[0].PaediatricDeptNicu.hearingScreen1).split("*");
					 $("#hearingScreen0").val(hear[0]);
					 $("#hearingScreen1").val(hear[1]);
					 $("#hearingScreen2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hearingScreen2);
					 
					 var usg = (pobj.pl[0].ods[0].PaediatricDeptNicu.usgBrain1).split("*");
					 $("#usgBrain0").val(usg[0]);
					 $("#usgBrain1").val(usg[1]);
					 $("#usgBrain2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.usgBrain2);
					 
					 var ad = (pobj.pl[0].ods[0].PaediatricDeptNicu.adother1).split("*");
					 $("#adother0").val(ad[0]);
					 $("#adother1").val(ad[1]);
					 $("#adother2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.adother2);

					 $("#birthWeight").val(pobj.pl[0].ods[0].PaediatricDeptNicu.birthWeight);
					 $("#weightOnAdmission").val(pobj.pl[0].ods[0].PaediatricDeptNicu.weightOnAdmission);
					 $("#weightOnDischarge").val(pobj.pl[0].ods[0].PaediatricDeptNicu.weightOnDischarge);
					 
					 
					if((null!=pobj.pl[0].ods[0].PaediatricDeptNicu.babysData) && (pobj.pl[0].ods[0].PaediatricDeptNicu.babysData != "") && (pobj.pl[0].ods[0].PaediatricDeptNicu.babysData)!= undefined){
						if("undefined"!=pobj.pl[0].ods[0].PaediatricDeptNicu.babysData)
						document.getElementById(pobj.pl[0].ods[0].PaediatricDeptNicu.babysData).checked=true;
					}

					if((null!=pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData) && (pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData != "") && (pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData)!= undefined){
						if("undefined"!=pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData)
						document.getElementById(pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData).checked=true;
					}
					 
					 $("#conditionAtBirth").val(pobj.pl[0].ods[0].PaediatricDeptNicu.conditionAtBirth);
					 $("#ancAge").val(pobj.pl[0].ods[0].PaediatricDeptNicu.ancAge);
					 $("#mbg").val(pobj.pl[0].ods[0].PaediatricDeptNicu.mbg);
					 $("#rh").val(pobj.pl[0].ods[0].PaediatricDeptNicu.rh);
					 $("#registration").val(pobj.pl[0].ods[0].PaediatricDeptNicu.registration);
					 $("#serHIV").val(pobj.pl[0].ods[0].PaediatricDeptNicu.serHIV);
					 $("#hbsAG").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hbsAG);
					 $("#vdrl").val(pobj.pl[0].ods[0].PaediatricDeptNicu.vdrl);
					 $("#dm").val(pobj.pl[0].ods[0].PaediatricDeptNicu.dm);
					 $("#htn").val(pobj.pl[0].ods[0].PaediatricDeptNicu.htn);
					 $("#thyroid").val(pobj.pl[0].ods[0].PaediatricDeptNicu.thyroid);
					 $("#fever").val(pobj.pl[0].ods[0].PaediatricDeptNicu.fever);
					 $("#medOther").val(pobj.pl[0].ods[0].PaediatricDeptNicu.medOther);
					 $("#obsProb").val(pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb);
					 
					 
					 if(null != pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb && pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb != "" && (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb)!=undefined){
						 if("undefined" !=pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb)
						 document.getElementById(pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb).checked=true;
					 }
					 if(null!=pobj.pl[0].ods[0].PaediatricDeptNicu.registration && pobj.pl[0].ods[0].PaediatricDeptNicu.registration != "" && (pobj.pl[0].ods[0].PaediatricDeptNicu.registration)!=undefined){
						if("undefined"!=pobj.pl[0].ods[0].PaediatricDeptNicu.registration) 
						 document.getElementById(pobj.pl[0].ods[0].PaediatricDeptNicu.registration).checked=true;
					 }
					 
					 $("#courseInHos").val(pobj.pl[0].ods[0].PaediatricDeptNicu.courseInHos);
					 $("#fluids").val(pobj.pl[0].ods[0].PaediatricDeptNicu.fluids);
					 $("#antibio").val(pobj.pl[0].ods[0].PaediatricDeptNicu.antibio);
					 $("#sedation1").val(pobj.pl[0].ods[0].PaediatricDeptNicu.sedation1);
					 $("#sedation2").val(pobj.pl[0].ods[0].PaediatricDeptNicu.sedation2);
					 $("#organism").val(pobj.pl[0].ods[0].PaediatricDeptNicu.organism);
					 $("#sensitive").val(pobj.pl[0].ods[0].PaediatricDeptNicu.sensitive);
					 $("#bslmax").val(pobj.pl[0].ods[0].PaediatricDeptNicu.bslmax);
					 $("#bslmin").val(pobj.pl[0].ods[0].PaediatricDeptNicu.bslmin);
					 $("#srk").val(pobj.pl[0].ods[0].PaediatricDeptNicu.srk);
					 $("#electrolyte").val(pobj.pl[0].ods[0].PaediatricDeptNicu.electrolyte);
					 $("#srca").val(pobj.pl[0].ods[0].PaediatricDeptNicu.srca);
					 $("#srmg").val(pobj.pl[0].ods[0].PaediatricDeptNicu.srmg);
					 $("#xray").val(pobj.pl[0].ods[0].PaediatricDeptNicu.xray);
					 $("#ctmri").val(pobj.pl[0].ods[0].PaediatricDeptNicu.ctmri);
					 $("#otherex").val(pobj.pl[0].ods[0].PaediatricDeptNicu.otherex);
					 $("#priConsult").val(pobj.pl[0].ods[0].PaediatricDeptNicu.priConsult);
					 $("#priConsultDate").val(pobj.pl[0].ods[0].PaediatricDeptNicu.priConsultDate);
					 $("#priConsultTime").val(pobj.pl[0].ods[0].PaediatricDeptNicu.priConsultTime);
					 $("#hrOPD").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hrOPD);
					 $("#hrOPDDate").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hrOPDDate);
					 $("#hrOPDTime").val(pobj.pl[0].ods[0].PaediatricDeptNicu.hrOPDTime);
					 $("#finalOther").val(pobj.pl[0].ods[0].PaediatricDeptNicu.finalOther);
					 
					 if(null!= pobj.pl[0].ods[0].PaediatricDeptNicu.immunized && pobj.pl[0].ods[0].PaediatricDeptNicu.immunized != "" && (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized)!=undefined){					 
						 if("undefined"!=pobj.pl[0].ods[0].PaediatricDeptNicu.immunized)
						 document.getElementById(pobj.pl[0].ods[0].PaediatricDeptNicu.immunized).checked=true;
					 }
			 }
			}
		}
		}
    });
}

function PhysicalDischargeToPatient(){
	var adNote = $("#adNote").val();
	var treatID = $("#treatmentId").val();
	var oprNote = $("#oprNote").val();

	var assesmentDetails = $("#assesmentDetails").html();
	var obj = eval('('+assesmentDetails+')');
	var diagnosisString = "";
	if(obj.assessmentList.length>0){
		for(var k = 0; k<obj.assessmentList.length; k++){
			var diag = obj.assessmentList[k];
			var str = diag.diagno_slave_id+"_"+diag.icd10_code+"#"+diag.diagno_type+"-"+diag.date+"@";
			diagnosisString = diagnosisString+str;
			}
	}else{
		diagnosisString = "";
	}

	var CPOE_TestDetails = $("#CPOE_TestDetails").html();
	var testObj = eval('('+CPOE_TestDetails+')');
	var pathologyString = "";
	var investigationString = "";
	if(testObj.testDashboard.length>0){
		for(var k = 0; k<testObj.testDashboard.length; k++){
			var test = testObj.testDashboard[k];
			if(test.testType == "Pathology"){
				var strtest = test.id+"_"+test.desciption+"#"+test.testType+"-"+test.date+"@";
				pathologyString = pathologyString + strtest;
			}else{// for Investigation
				var strtest = test.id+"_"+test.desciption+"#"+test.testType+"-"+test.date+"@";
				investigationString = investigationString + strtest;
			}
		}
	}else{
		pathologyString = "";
		investigationString = "";
	}

	var previousorder = $("#previousorder").html();
	var med = eval('('+previousorder+')');
	var medString = "";
	if(med.ormali.length>0){
		for(var k = 0; k<med.ormali.length; k++){
			var medobj = med.ormali[k];
			for(var l = 0; l<medobj.ocodrli.length; l++){

			var str = medobj.ocodrli[l].ocdID+"_"+medobj.ocodrli[l].invProdID+"#"+medobj.ocodrli[l].prep+"-"+medobj.ocodrli[l].days+"@";
			medString = medString+str;
			}
		}
	}else{
		medString = "";
	}

	var objorder = $("#objorder").html();
	var med1 = eval('('+objorder+')');
	var prescriptionString = "";
	if(med1.ormali.length>0){
		for(var k = 0; k<med1.ormali.length; k++){
			var medonDis = med1.ormali[k];
			for(var l = 0; l<medonDis.ocodrli.length; l++){

			var str = medonDis.ocodrli[l].ocdID+"_"+medonDis.ocodrli[l].invProdID+"#"+medonDis.ocodrli[l].prep+"-"+medonDis.ocodrli[l].days+"@";
			prescriptionString = prescriptionString+str;
			}
		}
	}else{
		prescriptionString = "";
	}

	/** ******AS A TREATEMENT DISCHARGE DATE WITH TIME************ */
	var discharge_dateNew = $("#discharge_date").val();
	var discharge_Time = $("#discharge_Time").val();
	if(discharge_dateNew == "")
		{
		alert("Please select discharge date");
		$("#discharge_date").focus();
		return false;
		}
	if(discharge_Time == "")
	{
		alert("Please select discharge time");
		$("#discharge_Time").focus();
		return false;
	}
	
	if(discharge_dateNew != "")
	{
		var temp = discharge_dateNew.split("/");
		var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
		var admsndate = "25-06-2017"; //added by sagar
		var addt = admsndate.split("-");
		var addDate = new Date(addt[2],addt[1]-1,addt[0]); 
		if (disDate.getTime() < addDate.getTime()) {
			alert("Date should not be before admission date!");
			return false;
		}else{
			discharge_dateNew = temp[2] + "-" + temp[1] + "-" + temp[0] + " "
			+ discharge_Time + ":00";
		}
	}
	
	var discharge_Type = $("#discharge_Type").val();
	if(discharge_Type == "select")
		{
		alert("Please select discharge type!");
		$("#discharge_Type").focus();
		return false;
		}
	
	
	/** *****************************extra fileds**************************** */
	/** *******History***************** */
	var  preSympton= $("#preSymp").val();
	var  cliFindings= $("#cliFind").val();
    /** ******special Investigation************* */
	var  specInvest= $("#specInvest").val();
	/** ******feilds Treatment************* */
	var  riskFact= $("#riskFact").val();
	var  complication= $("#complication").val();
	var  treatmentGiven= $("#treatmentGiven").val();

	var inputs = [];
	inputs.push('action=PhysicalDischargeToPatient');
	inputs.push('treatID=' + treatID);
	inputs.push('disSummID=' +	$("#disSummID").val());
	inputs.push('dischargeDate=' +encodeURIComponent(discharge_dateNew));
	inputs.push('discharge_Type=' +encodeURIComponent(discharge_Type));
	inputs.push('inchargeDr=' +	encodeURIComponent($("#consultDoc").html()));
	// Summary
	inputs.push('adNote=' + encodeURIComponent(adNote));
	inputs.push('digno='+encodeURIComponent(diagnosisString));
	// History
	inputs.push('preSymp='+ preSympton);
	inputs.push('cliFind='+ cliFindings);
	// Investigation
	inputs.push('pathologyItem=' + encodeURIComponent(pathologyString));
	inputs.push('investigation=' +	encodeURIComponent(investigationString));
	inputs.push('specInvest='+ specInvest); 
	// Treatment
	inputs.push('riskFact='+ riskFact);
	inputs.push('complication=' + complication); 
	inputs.push('treatmentGiven=' +	treatmentGiven);
	inputs.push('medString=' + encodeURIComponent(medString));
	// Operation Note
	inputs.push('oprNote=' + encodeURIComponent(oprNote));
	// Condition At Discharge
	inputs.push('condDisc=' +	encodeURIComponent($("#condDisc").val()));
	// Treatment At Discharge
	inputs.push('treAdvDisc=' +encodeURIComponent(prescriptionString));
	
	/** **********PAEDIATRIC* DEPT****** */
	var PdDeptType = document.getElementById("chkpd").checked;
	var PDDeptNICUType = document.getElementById("chknicupd").checked;
	var paedDept = null;
	if(PdDeptType == true)
		{
		inputs.push('pastHistory=' + encodeURIComponent($("#pastHistory").val()));
		inputs.push('generalExamination=' + encodeURIComponent($("#generalExamination").val()));
		inputs.push('cvs=' + encodeURIComponent($("#cvs").val()));
		inputs.push('rs=' + encodeURIComponent($("#rs").val()));
		inputs.push('pa=' + encodeURIComponent($("#pa").val()));
		inputs.push('cns=' + encodeURIComponent($("#cns").val()));
		inputs.push('ps=' + encodeURIComponent($("#ps").val()));
		inputs.push('plateletCount=' + encodeURIComponent($("#plateletCount").val()));
		inputs.push('urineR=' + encodeURIComponent($("#urineR").val()));
		inputs.push('stoolR=' + encodeURIComponent($("#stoolR").val()));
		inputs.push('bsl=' + encodeURIComponent($("#bsl").val()));
		inputs.push('csf=' + encodeURIComponent($("#csf").val()));
		inputs.push('ott=' + encodeURIComponent($("#ott").val()));
		inputs.push('srcalcium=' + encodeURIComponent($("#srcalcium").val()));
		inputs.push('coombTest=' + encodeURIComponent($("#coombTest").val()));
		inputs.push('pdsrna=' + encodeURIComponent($("#pdsrna").val()));
		inputs.push('pdsrk=' + encodeURIComponent($("#pdsrk").val()));
		inputs.push('pdsrcl=' + encodeURIComponent($("#pdsrcl").val()));
		inputs.push('srBillirubin=' + encodeURIComponent($("#srBillirubin").val()));
		inputs.push('unconj1=' + encodeURIComponent($("#unconj1").val()));
		inputs.push('unconj2=' + encodeURIComponent($("#unconj2").val()));
		inputs.push('pdxray=' + encodeURIComponent($("#pdxray").val()));
		inputs.push('pdusg=' + encodeURIComponent($("#pdusg").val()));
		inputs.push('pdctmri=' + encodeURIComponent($("#pdctmri").val()));
		inputs.push('pdtt=' + encodeURIComponent($("#pdtt").val()));
		inputs.push('pdFOther=' + encodeURIComponent($("#pdFOther").val()));

		inputs.push('courseOfRec=' + encodeURIComponent($("#courseOfRec").val()));
		inputs.push('pdManagement=' + encodeURIComponent($("#pdManagement").val()));

		// Checkbox

	    var strchk = "";
	    for ( var i = 1; i <= 11; i++) {
	           chk = ($("#chk" + i)).is(':checked') ? "Y" : "N";
	           strchk = strchk + "," + chk;
	      }

	    paedDept = encodeURIComponent($("input:radio[name='PatientType']:checked").val());
	    inputs.push('immunisationStatus=' + encodeURIComponent(strchk));
		inputs.push('otherVaccines=' + encodeURIComponent($("#otherVaccines").val()));
		inputs.push('anyOtherPoints=' + encodeURIComponent($("#anyOtherPoints").val()));
		inputs.push('followUpAdvise=' + encodeURIComponent($("#followUpAdvise").val()));
		// inputs.push('paedDept=' +
		// encodeURIComponent($("input:radio[name='PatientType']:checked").val()));
		
		}
	else if(PDDeptNICUType == true)
		{
		/** ****PAEDIATRIC DEPT * NICU***** */ 
		var NicuObj = 0;
		NicuObj = {
				listPaediatricDeptNICU:[]
		};
		// inputs.push('paedDept=' +
		// encodeURIComponent($("input:radio[name='PatientType']:checked").val()));
		paedDept = encodeURIComponent($("input:radio[name='PatientType']:checked").val());
		var babysData = encodeURIComponent($('input:radio[name="babysData"]:checked').val());
		var deliveryData = encodeURIComponent($('input:radio[name="deliveryData"]:checked').val());
		var registration = encodeURIComponent($('input:radio[name="registration"]:checked').val());
		var immunized = encodeURIComponent($('input:radio[name="im"]:checked').val());
		var obsProb = encodeURIComponent($('input:radio[name="obsProb"]:checked').val());

		NicuObj.listPaediatricDeptNICU.push({
			"ipdNo":$("#ipdNo").val(),
			"birthWeight":$("#birthWeight").val(),
			"weightOnAdmission" : $("#weightOnAdmission").val(),
			"weightOnDischarge": $("#weightOnDischarge").val(),
			"babysData": babysData,
			"deliveryData": deliveryData,
			"conditionAtBirth": $("#conditionAtBirth").val(),
			"ancAge": $("#ancAge").val(),
			"mbg": $("#mbg").val(),
			"rh": $("#rh").val(),
			"registration": registration,
			"immunized": immunized,
			"serHIV": $("#serHIV").val(),
			"hbsAG": $("#hbsAG").val(),
			"vdrl": $("#vdrl").val(),
			"dm": $("#dm").val(),
			"htn": $("#htn").val(),
			"thyroid": $("#thyroid").val(),
			"fever": $("#fever").val(),
			"medOther": $("#medOther").val(),
			"obsProb": obsProb,
			"courseInHos": $("#courseInHos").val(),
			"fluids": $("#fluids").val(),
			"antibio": $("#antibio").val(),
			"sedation1": $("#sedation1").val(),
			"sedation2": $("#sedation2").val(),
			"duration": $("#duration").val(),
			"mode1": $("#mode1").val(),
			"pip1": $("#pip1").val(),
			"peep1": $("#peep1").val(),
			"fio1": $("#fio1").val(),
			"mode2": $("#mode2").val(),
			"pip2": $("#pip2").val(),
			"peep2": $("#peep2").val(),
			"fio2": $("#fio2").val(),
			"organism": $("#organism").val(),
			"sensitive": $("#sensitive").val(),
			"bslmax": $("#bslmax").val(),
			"bslmin": $("#bslmin").val(),
			"electrolyte": $("#electrolyte").val(),
			"srk": $("#srk").val(),
			"srcl": $("#srcl").val(),
			"srca": $("#srca").val(),
			"srmg": $("#srmg").val(),
			"date1": $("#date1").val(),
			"billirubin1": $("#billirubin1").val(),
			"total1": $("#total1").val(),
			"indirect1": $("#indirect1").val(),
			"direct1": $("#direct1").val(),
			"phototherapy1": $("#phototherapy1").val(),
			"date2": $("#date2").val(),
			"billirubin2": $("#billirubin2").val(),
			"total2": $("#total2").val(),
			"indirect2": $("#indirect2").val(),
			"direct2": $("#direct2").val(),
			"phototherapy2": $("#phototherapy2").val(),
			"date3": $("#date3").val(),
			"billirubin3": $("#billirubin3").val(),
			"total3": $("#total3").val(),
			"indirect3": $("#indirect3").val(),
			"direct3": $("#direct3").val(),
			"phototherapy3": $("#phototherapy3").val(),
			"date4": $("#date4").val(),
			"billirubin4": $("#billirubin4").val(),
			"total4": $("#total4").val(),
			"indirect4": $("#indirect4").val(),
			"direct4": $("#direct4").val(),
			"phototherapy4": $("#phototherapy4").val(),
			"xray": $("#xray").val(),
			"usg": $("#usg").val(),
			"ctmri": $("#ctmri").val(),
			"otherex": $("#otherex").val(),
			"redReflex1": $("#redReflex1").val(),
			"hips1": $("#hips1").val(),
			"femorals1": $("#femorals1").val(),
			"genitals1": $("#genitals1").val(),
			"hernia1": $("#hernia1").val(),
			"headcir1": $("#headcir1").val(),
			"pcother1": $("#pcother1").val(),
			"redReflex2": $("#redReflex2").val(),
			"hips2": $("#hips2").val(),
			"femorals2": $("#femorals2").val(),
			"genitals2": $("#genitals2").val(),
			"hernia2": $("#hernia2").val(),
			"headcir2": $("#headcir2").val(),
			"pcother2": $("#pcother2").val(),
			"ropScreen1": $("#ropScreen0").val()+"*"+$("#ropScreen1").val(),
			"hearingScreen1": $("#hearingScreen0").val()+"*"+$("#hearingScreen1").val(),
			"usgBrain1": $("#usgBrain0").val()+"*"+$("#usgBrain1").val(),
			"adother1": $("#adother0").val()+"*"+$("#adother1").val(),
			"ropScreen2": $("#ropScreen2").val(),
			"hearingScreen2": $("#hearingScreen2").val(),
			"usgBrain2": $("#usgBrain2").val(),
			"adother2": $("#adother2").val(),
			"priConsult": $("#priConsult").val(),
			"priConsultDate": $("#priConsultDate").val(),
			"priConsultTime": $("#priConsultTime").val(),
			"hrOPD": $("#hrOPD").val(),
			"hrOPDDate": $("#hrOPDDate").val(),
			"hrOPDTime": $("#hrOPDTime").val(),
			"finalOther": $("#finalOther").val(),

		 });

		NicuObj = JSON.stringify(NicuObj);
		inputs.push('NicuObj='+encodeURIComponent(NicuObj));
	}
	else{
		paedDept = "NORMAL";
	}
	inputs.push('paedDept=' + paedDept);
	var str = inputs.join('&');
	jQuery.ajax({
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
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location.reload(true);
			}
		});
}

/*function saveAutoDischargeSummery(){
	var primaryCOD ="-";
	var secondaryCOD ="-";
	var significantCondition ="-";
	//var adNote = $("#adNote").val();
	var adNote = CKEDITOR.instances['adNote'].getData();
	
	if(adNote == ""){
		adNote = "-";
	}
	
	var treatID = $("#treatmentId").val();
	var oprNote = $("#oprNote").val();

	var assesmentDetails = $("#assesmentDetails").html();
	var obj = eval('('+assesmentDetails+')');
	var diagnosisString = "";
	if(obj.assessmentList.length>0){
		for(var k = 0; k<obj.assessmentList.length; k++){
			var diag = obj.assessmentList[k];
			var str = diag.diagno_slave_id+"_"+diag.icd10_code+"#"+diag.diagno_type+"-"+diag.date+"@";
			diagnosisString = diagnosisString+str;
			}
	}else{
		diagnosisString = "";
	}

	var CPOE_TestDetails = $("#CPOE_TestDetails").html();
	//var testObj = eval('('+CPOE_TestDetails+')');
	var pathologyString = "";
	var investigationString = "";
	if(testObj.testDashboard.length>0){
		for(var k = 0; k<testObj.testDashboard.length; k++){
			var test = testObj.testDashboard[k];
			if(test.testType == "Pathology"){
				var strtest = test.id+"_"+test.desciption+"#"+test.testType+"-"+test.date+"@";
				pathologyString = pathologyString + strtest;
			}else{// for Investigation
				var strtest = test.id+"_"+test.desciption+"#"+test.testType+"-"+test.date+"@";
				investigationString = investigationString + strtest;
			}
		}
	}else{
		pathologyString = "";
		investigationString = "";
	}

	var previousorder = $("#previousorder").html();
	var med = eval('('+previousorder+')');
	var medString = "";
	if(med.ormali.length>0){
		for(var k = 0; k<med.ormali.length; k++){
			var medobj = med.ormali[k];
			for(var l = 0; l<medobj.ocodrli.length; l++){

			var str = medobj.ocodrli[l].ocdID+"_"+medobj.ocodrli[l].invProdID+"#"+medobj.ocodrli[l].prep+"-"+medobj.ocodrli[l].days+"@";
			medString = medString+str;
			}
		}
	}else{
		medString = "";
	}

	var objorder = $("#objorder").html();
	var med1 = eval('('+objorder+')');
	var prescriptionString = "";
	if(med1.ormali.length>0){
		for(var k = 0; k<med1.ormali.length; k++){
			var medonDis = med1.ormali[k];
			for(var l = 0; l<medonDis.ocodrli.length; l++){

			var str = medonDis.ocodrli[l].ocdID+"_"+medonDis.ocodrli[l].invProdID+"#"+medonDis.ocodrli[l].prep+"-"+medonDis.ocodrli[l].days+"@";
			prescriptionString = prescriptionString+str;
			}
		}
	}else{
		prescriptionString = "";
	}

	*//** ******AS A TREATEMENT DISCHARGE DATE WITH TIME************ *//*
	var discharge_dateNew = $("#discharge_date").val();
	var discharge_Time = $("#discharge_Time").val();
	if(discharge_dateNew == "")
		{
		alert("Please select discharge date");
		$("#discharge_date").focus();
		return false;
		}
	if(discharge_Time == "")
	{
		alert("Please select discharge time");
		$("#discharge_Time").focus();
		return false;
	}
	
	if (discharge_dateNew != "") {
		var temp = discharge_dateNew.split("/");
		var disDate = new Date(temp[2], temp[1] - 1, temp[0]);
 		var admsndate = $("#dtofadmission").text();  //Added by sagar 
 			var addt = admsndate.split("/");
		var addDate = new Date(addt[2],addt[1]-1,addt[0]); 
 		if (disDate.getTime() < addDate.getTime()) {
			alert("Date should not be before admission date!");
			return false;
		}else{
			discharge_dateNew = temp[2] + "-" + temp[1] + "-" + temp[0] + " "
			+ discharge_Time + ":00";
		}
	}
	
	var discharge_Type = $("#discharge_Type").val();
	if(discharge_Type == "select")
		{
		alert("Please select discharge type!");
		$("#discharge_Type").focus();
		return false;
		}else if(discharge_Type == "Dead"){
			
			primaryCOD = $("#primaryCOD").val();
			secondaryCOD = $("#secondaryCOD").val();
			significantCondition = $("#significantCondition").val();
		}

	*//** *****************************extra fileds**************************** *//*
	*//** *******History***************** *//*
	var  preSympton= $("#preSymp").val();
	var  cliFindings= $("#cliFind").val();
    *//** ******special Investigation************* *//*
	var  specInvest= $("#specInvest").val();
	*//** ******feilds Treatment************* *//*
	var  riskFact= $("#riskFact").val();
	var  complication= $("#complication").val();
	var  treatmentGiven= $("#treatmentGiven").val();

	var inputs = [];
	inputs.push('action=saveAutoDischargeSummary');
	inputs.push('treatID=' + treatID);
	inputs.push('disSummID=' +	$("#disSummID").val());
	inputs.push('dischargeDate=' +encodeURIComponent(discharge_dateNew));
	inputs.push('discharge_Type=' +encodeURIComponent(discharge_Type));
	inputs.push('inchargeDr=' +	encodeURIComponent($("#consultDoc").html()));
	// Summary
	inputs.push('adNote=' + encodeURIComponent(adNote));
	inputs.push('digno='+encodeURIComponent(diagnosisString));
	// History
	inputs.push('preSymp='+ preSympton);
	inputs.push('cliFind='+ cliFindings);
	// Investigation
	inputs.push('pathologyItem=' + encodeURIComponent(pathologyString));
	inputs.push('investigation=' +	encodeURIComponent(investigationString));
	inputs.push('specInvest='+ specInvest); 
	// Treatment
	inputs.push('riskFact='+encodeURIComponent(riskFact));
	inputs.push('complication=' +encodeURIComponent(complication)); 
	inputs.push('treatmentGiven=' +	encodeURIComponent(treatmentGiven));
	inputs.push('medString=' + encodeURIComponent(medString));
	// Operation Note
	inputs.push('oprNote=' + encodeURIComponent(oprNote));
	// Condition At Discharge
	inputs.push('condDisc=' +	encodeURIComponent($("#condDisc").val()));
	inputs.push('advDisc=' +	encodeURIComponent($("#advDisc").val()));
	// Treatment At Discharge
	inputs.push('treAdvDisc=' +encodeURIComponent(prescriptionString));
	// Cause Of Death By Pooja
	inputs.push('primaryCOD=' +encodeURIComponent(primaryCOD));
	inputs.push('secondaryCOD=' +encodeURIComponent(secondaryCOD));
	inputs.push('significantCondition=' +encodeURIComponent(significantCondition));
	
	*//** **********PAEDIATRIC* DEPT****** *//*
	var PdDeptType = document.getElementById("chkpd").checked;
	var PDDeptNICUType = document.getElementById("chknicupd").checked;
	var paedDept = null;
	if(PdDeptType == true)
		{
				
		inputs.push('pastHistory=' + encodeURIComponent($("#pastHistory").val()));
		inputs.push('generalExamination=' + encodeURIComponent($("#generalExamination").val()));
		inputs.push('cvs=' + encodeURIComponent($("#paedcvs").val()));
		inputs.push('rs=' + encodeURIComponent($("#paedrs").val()));
		inputs.push('pa=' + encodeURIComponent($("#paedpa").val()));
		inputs.push('cns=' + encodeURIComponent($("#paedcns").val()));
		inputs.push('ps=' + encodeURIComponent($("#ps").val()));
		inputs.push('plateletCount=' + encodeURIComponent($("#plateletCount").val()));
		inputs.push('urineR=' + encodeURIComponent($("#urineR").val()));
		inputs.push('stoolR=' + encodeURIComponent($("#stoolR").val()));
		inputs.push('bsl=' + encodeURIComponent($("#bsl").val()));
		inputs.push('csf=' + encodeURIComponent($("#csf").val()));
		inputs.push('ott=' + encodeURIComponent($("#ott").val()));
		inputs.push('srcalcium=' + encodeURIComponent($("#srcalcium").val()));
		inputs.push('coombTest=' + encodeURIComponent($("#coombTest").val()));
		inputs.push('pdsrna=' + encodeURIComponent($("#pdsrna").val()));
		inputs.push('pdsrk=' + encodeURIComponent($("#pdsrk").val()));
		inputs.push('pdsrcl=' + encodeURIComponent($("#pdsrcl").val()));
		inputs.push('srBillirubin=' + encodeURIComponent($("#srBillirubin").val()));
		inputs.push('unconj1=' + encodeURIComponent($("#unconj1").val()));
		inputs.push('unconj2=' + encodeURIComponent($("#unconj2").val()));
		inputs.push('pdxray=' + encodeURIComponent($("#pdxray").val()));
		inputs.push('pdusg=' + encodeURIComponent($("#pdusg").val()));
		inputs.push('pdctmri=' + encodeURIComponent($("#pdctmri").val()));
		inputs.push('pdtt=' + encodeURIComponent($("#pdtt").val()));
		inputs.push('pdFOther=' + encodeURIComponent($("#pdFOther").val()));

		inputs.push('courseOfRec=' + encodeURIComponent($("#courseOfRec").val()));
		inputs.push('pdManagement=' + encodeURIComponent($("#pdManagement").val()));

		// Checkbox

	    var strchk = "";
	    for ( var i = 1; i <= 11; i++) {
	           chk = ($("#chk" + i)).is(':checked') ? "Y" : "N";
	           strchk = strchk + "," + chk;
	      }

	    paedDept = encodeURIComponent($("input:radio[name='PatientType']:checked").val());
	    inputs.push('immunisationStatus=' + encodeURIComponent(strchk));
		inputs.push('otherVaccines=' + encodeURIComponent($("#otherVaccines").val()));
		inputs.push('anyOtherPoints=' + encodeURIComponent($("#anyOtherPoints").val()));
		inputs.push('followUpAdvise=' + encodeURIComponent($("#followUpAdvise").val()));
		// inputs.push('paedDept=' +
		// encodeURIComponent($("input:radio[name='PatientType']:checked").val()));
		
		}
	else if(PDDeptNICUType == true)
		{
		*//** ****PAEDIATRIC DEPT * NICU***** *//* 
		var NicuObj = 0;
		NicuObj = {
				listPaediatricDeptNICU:[]
		};
		// inputs.push('paedDept=' +
		// encodeURIComponent($("input:radio[name='PatientType']:checked").val()));
		paedDept = encodeURIComponent($("input:radio[name='PatientType']:checked").val());
		var babysData = encodeURIComponent($('input:radio[name="babysData"]:checked').val());
		var deliveryData = encodeURIComponent($('input:radio[name="deliveryData"]:checked').val());
		var registration = encodeURIComponent($('input:radio[name="registration"]:checked').val());
		var immunized = encodeURIComponent($('input:radio[name="im"]:checked').val());
		var obsProb = encodeURIComponent($('input:radio[name="obsProb"]:checked').val());

		NicuObj.listPaediatricDeptNICU.push({
			"ipdNo":$("#ipdNo").val(),
			"birthWeight":$("#birthWeight").val(),
			"weightOnAdmission" : $("#weightOnAdmission").val(),
			"weightOnDischarge": $("#weightOnDischarge").val(),
			"babysData": babysData,
			"deliveryData": deliveryData,
			"conditionAtBirth": $("#conditionAtBirth").val(),
			"ancAge": $("#ancAge").val(),
			"mbg": $("#mbg").val(),
			"rh": $("#rh").val(),
			"registration": registration,
			"immunized": immunized,
			"serHIV": $("#serHIV").val(),
			"hbsAG": $("#hbsAG").val(),
			"vdrl": $("#vdrl").val(),
			"dm": $("#dm").val(),
			"htn": $("#htn").val(),
			"thyroid": $("#thyroid").val(),
			"fever": $("#fever").val(),
			"medOther": $("#medOther").val(),
			"obsProb": obsProb,
			"courseInHos": $("#courseInHos").val(),
			"fluids": $("#fluids").val(),
			"antibio": $("#antibio").val(),
			"sedation1": $("#sedation1").val(),
			"sedation2": $("#sedation2").val(),
			"duration": $("#duration").val(),
			"mode1": $("#mode1").val(),
			"pip1": $("#pip1").val(),
			"peep1": $("#peep1").val(),
			"fio1": $("#fio1").val(),
			"mode2": $("#mode2").val(),
			"pip2": $("#pip2").val(),
			"peep2": $("#peep2").val(),
			"fio2": $("#fio2").val(),
			"organism": $("#organism").val(),
			"sensitive": $("#sensitive").val(),
			"bslmax": $("#bslmax").val(),
			"bslmin": $("#bslmin").val(),
			"electrolyte": $("#electrolyte").val(),
			"srk": $("#srk").val(),
			"srcl": $("#srcl").val(),
			"srca": $("#srca").val(),
			"srmg": $("#srmg").val(),
			"date1": $("#date1").val(),
			"billirubin1": $("#billirubin1").val(),
			"total1": $("#total1").val(),
			"indirect1": $("#indirect1").val(),
			"direct1": $("#direct1").val(),
			"phototherapy1": $("#phototherapy1").val(),
			"date2": $("#date2").val(),
			"billirubin2": $("#billirubin2").val(),
			"total2": $("#total2").val(),
			"indirect2": $("#indirect2").val(),
			"direct2": $("#direct2").val(),
			"phototherapy2": $("#phototherapy2").val(),
			"date3": $("#date3").val(),
			"billirubin3": $("#billirubin3").val(),
			"total3": $("#total3").val(),
			"indirect3": $("#indirect3").val(),
			"direct3": $("#direct3").val(),
			"phototherapy3": $("#phototherapy3").val(),
			"date4": $("#date4").val(),
			"billirubin4": $("#billirubin4").val(),
			"total4": $("#total4").val(),
			"indirect4": $("#indirect4").val(),
			"direct4": $("#direct4").val(),
			"phototherapy4": $("#phototherapy4").val(),
			"xray": $("#xray").val(),
			"usg": $("#usg").val(),
			"ctmri": $("#ctmri").val(),
			"otherex": $("#otherex").val(),
			"redReflex1": $("#redReflex1").val(),
			"hips1": $("#hips1").val(),
			"femorals1": $("#femorals1").val(),
			"genitals1": $("#genitals1").val(),
			"hernia1": $("#hernia1").val(),
			"headcir1": $("#headcir1").val(),
			"pcother1": $("#pcother1").val(),
			"redReflex2": $("#redReflex2").val(),
			"hips2": $("#hips2").val(),
			"femorals2": $("#femorals2").val(),
			"genitals2": $("#genitals2").val(),
			"hernia2": $("#hernia2").val(),
			"headcir2": $("#headcir2").val(),
			"pcother2": $("#pcother2").val(),
			"ropScreen1": $("#ropScreen0").val()+"*"+$("#ropScreen1").val(),
			"hearingScreen1": $("#hearingScreen0").val()+"*"+$("#hearingScreen1").val(),
			"usgBrain1": $("#usgBrain0").val()+"*"+$("#usgBrain1").val(),
			"adother1": $("#adother0").val()+"*"+$("#adother1").val(),
			"ropScreen2": $("#ropScreen2").val(),
			"hearingScreen2": $("#hearingScreen2").val(),
			"usgBrain2": $("#usgBrain2").val(),
			"adother2": $("#adother2").val(),
			"priConsult": $("#priConsult").val(),
			"priConsultDate": $("#priConsultDate").val(),
			"priConsultTime": $("#priConsultTime").val(),
			"hrOPD": $("#hrOPD").val(),
			"hrOPDDate": $("#hrOPDDate").val(),
			"hrOPDTime": $("#hrOPDTime").val(),
			"finalOther": $("#finalOther").val(),

		 });

		NicuObj = JSON.stringify(NicuObj);
		inputs.push('NicuObj='+encodeURIComponent(NicuObj));
	}
	else{
		paedDept = "NORMAL";
	}
	inputs.push('paedDept=' + paedDept);
	var str = inputs.join('&');
	jQuery.ajax({
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
			alert(ajaxResponse);
			window.location.reload(true);
			}
		});
}*/

/** *get Patient DischargeDate*****@author husenbadshah*** */
function getPatientDischargeDate()
{
	 
	$("#discharge_date").val("");
	$("#discharge_Time").val("");
	var patID = $("#pt_Id").val();
	//alert(patID);
	var treatID = $("#tid").val();   //Added by Sagar
	var inputs = [];
	inputs.push('action=getPatientDischargeDate');
	inputs.push('patient_id=' + patID);
	inputs.push('TreamentID=' + treatID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var DischargeDate = JSON.parse(r);
			//alert(DischargeDate);
			var dischargedate = DischargeDate.adminchargelist[0].dischargedate;
			//alert(dischargedate);
			if(DischargeDate.adminchargelist.length > 0)
				{
				var dischargedate = DischargeDate.adminchargelist[0].dischargedate;
				 
				if(dischargedate != "null_null" && dischargedate !="" )
					{
					var newDate1 = dischargedate.split("_");
					var date = newDate1[0];
					 
					var time = newDate1[1];
					if(dischargedate.includes("/")){
						$("#discharge_date").val(date);
					}else{
						var cal_date = date.split("-");
						var mydate = cal_date[2]+"/"+cal_date[1]+"/"+cal_date[0];
						$("#discharge_date").val(mydate);
					}
					
					var cal_time = time.split(":");
					var mytime = cal_time[0]+":"+cal_time[1];
					$("#discharge_Time").val(mytime);
					}else{
					$("#discharge_date").val("");
					$("#discharge_Time").val("");
				}
			}
		}
	});
}

/***@author husen @date 10 oct 2015***FetchDischargeAutoSummary*/
function FetchDischargeAutoSummary(){
	
	var patID = $("#pid").val();
	var treatID = $("#tid").val();
	var inputs = [];
	inputs.push('action=FetchDischargeAutoSummary');
	inputs.push('patID=' + patID);
	inputs.push('treatID=' + treatID);
	var str = inputs.join('&');
	jQuery.ajax( {
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
		
			var objDiscSum = JSON.parse(ajaxResponse);
			/** **********************START VIEW************************ */
		    if(objDiscSum != null)
			{
		    	/** ***************common fileds********************* */
		    	if(objDiscSum.dsl[0].psym !="")
		    		{
		    		$("#preSymp").val(objDiscSum.dsl[0].psym);
		    		}
		    	$("#cliFind").val(objDiscSum.dsl[0].clf);
		        /** ******special Investigation************* */
		    	$("#specInvest").val(objDiscSum.dsl[0].sinv);
		    	/** ******feilds Treatment************* */
		    	$("#riskFact").val(objDiscSum.dsl[0].rsk);
		    	$("#complication").val(objDiscSum.dsl[0].cmp);
		    	$("#treatmentGiven").val(objDiscSum.dsl[0].trgiven);
		    	/** *****************treatment at discharge********* */
		    	$("#condDisc").val(objDiscSum.dsl[0].tad);
		    	$("#advDisc").val(objDiscSum.dsl[0].advisedOnDischarge);
		    	$("#discharge_Type").val(objDiscSum.dsl[0].discharge_type);
		    	if(objDiscSum.dsl[0].discharge_type == "Dead"){
	                   $("#causeOfDeath").show();
	               }else{
	                   $("#causeOfDeath").hide();
	               }
	               $("#primaryCOD").val(objDiscSum.dsl[0].primaryCOD);
	               $("#secondaryCOD").val(objDiscSum.dsl[0].secondaryCOD);
	               $("#significantCondition").val(objDiscSum.dsl[0].significantCondition);
		    	var DeptType = objDiscSum.dsl[0].Paed_dept;
		        if(DeptType == "PD")
		    		{ 
		    		    // $("#nicu").hide();
						// $("#paedDept").show();
						 document.getElementById("chkpd").checked = true;
						 $("#pastHistory").val(objDiscSum.dsl[0].paediatricDept.past_history);
						 $("#generalExamination").val(objDiscSum.dsl[0].paediatricDept.general_examination);
						 $("#paedcvs").val(objDiscSum.dsl[0].paediatricDept.cvs);
						 $("#paedrs").val(objDiscSum.dsl[0].paediatricDept.rs);
						 $("#paedpa").val(objDiscSum.dsl[0].paediatricDept.pa);
						 $("#paedcns").val(objDiscSum.dsl[0].paediatricDept.cns);
						 $("#ps").val(objDiscSum.dsl[0].paediatricDept.ps);
						 $("#plateletCount").val(objDiscSum.dsl[0].paediatricDept.platelet_count);
						 $("#urineR").val(objDiscSum.dsl[0].paediatricDept.urine_r);
						 $("#stoolR").val(objDiscSum.dsl[0].paediatricDept.stool_r);
						 $("#bsl").val(objDiscSum.dsl[0].paediatricDept.bsl);
						 $("#csf").val(objDiscSum.dsl[0].paediatricDept.csf);
						 $("#ott").val(objDiscSum.dsl[0].paediatricDept.ott);
						 $("#srcalcium").val(objDiscSum.dsl[0].paediatricDept.srcalcium);
						 $("#coombTest").val(objDiscSum.dsl[0].paediatricDept.coombs_test);
						 $("#pdsrna").val(objDiscSum.dsl[0].paediatricDept.srna);
						 $("#pdsrk").val(objDiscSum.dsl[0].paediatricDept.srk);
						 $("#pdsrcl").val(objDiscSum.dsl[0].paediatricDept.srcl);
						 $("#srBillirubin").val(objDiscSum.dsl[0].paediatricDept.sr_billirubin);
						 $("#unconj1").val(objDiscSum.dsl[0].paediatricDept.unconj1);
						 $("#unconj2").val(objDiscSum.dsl[0].paediatricDept.unconj2);
						 $("#pdxray").val(objDiscSum.dsl[0].paediatricDept.x_ray);
						 $("#pdusg").val(objDiscSum.dsl[0].paediatricDept.usg);
						 $("#pdctmri").val(objDiscSum.dsl[0].paediatricDept.ct_mri);
						 $("#pdtt").val(objDiscSum.dsl[0].paediatricDept.tt);
						 $("#pdFOther").val(objDiscSum.dsl[0].paediatricDept.other);
						 $("#courseOfRec").val(objDiscSum.dsl[0].paediatricDept.course_of_rec);
						 $("#pdManagement").val(objDiscSum.dsl[0].paediatricDept.management);
						 
						 var arrRL = (objDiscSum.dsl[0].paediatricDept.immunisation_status).split(",");
	                     for ( var i = 0; i < arrRL.length; i++) {
	                            (arrRL[i+1] == "Y") ? $('input[id=chk' + (i + 1) + ']').attr('checked', true): $('input[id=chk' + (i + 1) + ']').attr('checked',false);

	                     }

						 $("#otherVaccines").val(objDiscSum.dsl[0].paediatricDept.other_vaccines);
						 $("#anyOtherPoints").val(objDiscSum.dsl[0].paediatricDept.any_other);
						 $("#followUpAdvise").val(objDiscSum.dsl[0].paediatricDept.follow_up_advice);
		    		
		    		}else if(DeptType == "nicuPD"){
					    // $("#nicu").show();
					    // $("#paedDept").hide();
					 	 document.getElementById("chknicupd").checked = true;
						 $("#duration").val(objDiscSum.dsl[0].PaediatricDeptNicu.duration);
						 $("#srcl").val(objDiscSum.dsl[0].PaediatricDeptNicu.srcl);
						 $("#usg").val(objDiscSum.dsl[0].PaediatricDeptNicu.usg);
						 $("#mode1").val(objDiscSum.dsl[0].PaediatricDeptNicu.mode1);
						 $("#mode2").val(objDiscSum.dsl[0].PaediatricDeptNicu.mode2);
						 $("#pip1").val(objDiscSum.dsl[0].PaediatricDeptNicu.pip1);
						 $("#pip2").val(objDiscSum.dsl[0].PaediatricDeptNicu.pip2);
						 $("#peep1").val(objDiscSum.dsl[0].PaediatricDeptNicu.peep1);
						 $("#peep2").val(objDiscSum.dsl[0].PaediatricDeptNicu.peep2);
						 $("#fio1").val(objDiscSum.dsl[0].PaediatricDeptNicu.fio1);
						 $("#fio2").val(objDiscSum.dsl[0].PaediatricDeptNicu.fio2);
						 $("#date1").val(objDiscSum.dsl[0].PaediatricDeptNicu.date1);
						 $("#date2").val(objDiscSum.dsl[0].PaediatricDeptNicu.date2);
						 $("#date3").val(objDiscSum.dsl[0].PaediatricDeptNicu.date3);
						 $("#date4").val(objDiscSum.dsl[0].PaediatricDeptNicu.date4);
						 $("#billirubin1").val(objDiscSum.dsl[0].PaediatricDeptNicu.billirubin1);
						 $("#billirubin2").val(objDiscSum.dsl[0].PaediatricDeptNicu.billirubin2);
						 $("#billirubin3").val(objDiscSum.dsl[0].PaediatricDeptNicu.billirubin3);
						 $("#billirubin4").val(objDiscSum.dsl[0].PaediatricDeptNicu.billirubin4);
						 $("#total1").val(objDiscSum.dsl[0].PaediatricDeptNicu.total1);
						 $("#total2").val(objDiscSum.dsl[0].PaediatricDeptNicu.total2);
						 $("#total3").val(objDiscSum.dsl[0].PaediatricDeptNicu.total3);
						 $("#total4").val(objDiscSum.dsl[0].PaediatricDeptNicu.total4);
						 $("#indirect1").val(objDiscSum.dsl[0].PaediatricDeptNicu.indirect1);
						 $("#indirect2").val(objDiscSum.dsl[0].PaediatricDeptNicu.indirect2);
						 $("#indirect3").val(objDiscSum.dsl[0].PaediatricDeptNicu.indirect3);
						 $("#indirect4").val(objDiscSum.dsl[0].PaediatricDeptNicu.indirect4);
						 $("#direct1").val(objDiscSum.dsl[0].PaediatricDeptNicu.direct1);
						 $("#direct2").val(objDiscSum.dsl[0].PaediatricDeptNicu.direct2);
						 $("#direct3").val(objDiscSum.dsl[0].PaediatricDeptNicu.direct3);
						 $("#direct4").val(objDiscSum.dsl[0].PaediatricDeptNicu.direct4);
						 $("#phototherapy1").val(objDiscSum.dsl[0].PaediatricDeptNicu.phototherapy1);
						 $("#phototherapy2").val(objDiscSum.dsl[0].PaediatricDeptNicu.phototherapy2);
						 $("#phototherapy3").val(objDiscSum.dsl[0].PaediatricDeptNicu.phototherapy3);
						 $("#phototherapy4").val(objDiscSum.dsl[0].PaediatricDeptNicu.phototherapy4);
						 $("#redReflex1").val(objDiscSum.dsl[0].PaediatricDeptNicu.redReflex1);
						 $("#redReflex2").val(objDiscSum.dsl[0].PaediatricDeptNicu.redReflex2);
						 $("#hips1").val(objDiscSum.dsl[0].PaediatricDeptNicu.hips1);
						 $("#hips2").val(objDiscSum.dsl[0].PaediatricDeptNicu.hips2);
						 $("#femorals1").val(objDiscSum.dsl[0].PaediatricDeptNicu.femorals1);
						 $("#femorals2").val(objDiscSum.dsl[0].PaediatricDeptNicu.femorals2);
						 $("#genitals1").val(objDiscSum.dsl[0].PaediatricDeptNicu.genitals1);
						 $("#genitals2").val(objDiscSum.dsl[0].PaediatricDeptNicu.genitals2);
						 $("#hernia1").val(objDiscSum.dsl[0].PaediatricDeptNicu.hernia1);
						 $("#hernia2").val(objDiscSum.dsl[0].PaediatricDeptNicu.hernia2);
						 $("#headcir1").val(objDiscSum.dsl[0].PaediatricDeptNicu.headcir1);
						 $("#headcir2").val(objDiscSum.dsl[0].PaediatricDeptNicu.headcir2);
						 $("#pcother1").val(objDiscSum.dsl[0].PaediatricDeptNicu.pcother1);
						 $("#pcother2").val(objDiscSum.dsl[0].PaediatricDeptNicu.pcother2);
						 
						 var rop = (objDiscSum.dsl[0].PaediatricDeptNicu.ropScreen1).split("*");
						 $("#ropScreen0").val(rop[0]);
						 $("#ropScreen1").val(rop[1]);
						 $("#ropScreen2").val(objDiscSum.dsl[0].PaediatricDeptNicu.ropScreen2);
						 
						 var hear = (objDiscSum.dsl[0].PaediatricDeptNicu.hearingScreen1).split("*");
						 $("#hearingScreen0").val(hear[0]);
						 $("#hearingScreen1").val(hear[1]);
						 $("#hearingScreen2").val(objDiscSum.dsl[0].PaediatricDeptNicu.hearingScreen2);
						 
						 var usg = (objDiscSum.dsl[0].PaediatricDeptNicu.usgBrain1).split("*");
						 $("#usgBrain0").val(usg[0]);
						 $("#usgBrain1").val(usg[1]);
						 $("#usgBrain2").val(objDiscSum.dsl[0].PaediatricDeptNicu.usgBrain2);
						 
						 var ad = (objDiscSum.dsl[0].PaediatricDeptNicu.adother1).split("*");
						 $("#adother0").val(ad[0]);
						 $("#adother1").val(ad[1]);
						 $("#adother2").val(objDiscSum.dsl[0].PaediatricDeptNicu.adother2);

						 $("#birthWeight").val(objDiscSum.dsl[0].PaediatricDeptNicu.birthWeight);
						 $("#weightOnAdmission").val(objDiscSum.dsl[0].PaediatricDeptNicu.weightOnAdmission);
						 $("#weightOnDischarge").val(objDiscSum.dsl[0].PaediatricDeptNicu.weightOnDischarge);
						 
						 
						if((null!=objDiscSum.dsl[0].PaediatricDeptNicu.babysData) && (objDiscSum.dsl[0].PaediatricDeptNicu.babysData != "") && (objDiscSum.dsl[0].PaediatricDeptNicu.babysData)!= undefined){
							if("undefined"!=objDiscSum.dsl[0].PaediatricDeptNicu.babysData)
							document.getElementById(objDiscSum.dsl[0].PaediatricDeptNicu.babysData).checked=true;
						}

						if((null!=objDiscSum.dsl[0].PaediatricDeptNicu.deliveryData) && (objDiscSum.dsl[0].PaediatricDeptNicu.deliveryData != "") && (objDiscSum.dsl[0].PaediatricDeptNicu.deliveryData)!= undefined){
							if("undefined"!=objDiscSum.dsl[0].PaediatricDeptNicu.deliveryData)
							document.getElementById(objDiscSum.dsl[0].PaediatricDeptNicu.deliveryData).checked=true;
						}
						 
						 $("#conditionAtBirth").val(objDiscSum.dsl[0].PaediatricDeptNicu.conditionAtBirth);
						 $("#ancAge").val(objDiscSum.dsl[0].PaediatricDeptNicu.ancAge);
						 $("#mbg").val(objDiscSum.dsl[0].PaediatricDeptNicu.mbg);
						 $("#rh").val(objDiscSum.dsl[0].PaediatricDeptNicu.rh);
						 $("#registration").val(objDiscSum.dsl[0].PaediatricDeptNicu.registration);
						 $("#serHIV").val(objDiscSum.dsl[0].PaediatricDeptNicu.serHIV);
						 $("#hbsAG").val(objDiscSum.dsl[0].PaediatricDeptNicu.hbsAG);
						 $("#vdrl").val(objDiscSum.dsl[0].PaediatricDeptNicu.vdrl);
						 $("#dm").val(objDiscSum.dsl[0].PaediatricDeptNicu.dm);
						 $("#htn").val(objDiscSum.dsl[0].PaediatricDeptNicu.htn);
						 $("#thyroid").val(objDiscSum.dsl[0].PaediatricDeptNicu.thyroid);
						 $("#fever").val(objDiscSum.dsl[0].PaediatricDeptNicu.fever);
						 $("#medOther").val(objDiscSum.dsl[0].PaediatricDeptNicu.medOther);
						 $("#obsProb").val(objDiscSum.dsl[0].PaediatricDeptNicu.obsProb);
						 
						 
						 if(null != objDiscSum.dsl[0].PaediatricDeptNicu.obsProb && objDiscSum.dsl[0].PaediatricDeptNicu.obsProb != "" && (objDiscSum.dsl[0].PaediatricDeptNicu.obsProb)!=undefined){
							 if("undefined" !=objDiscSum.dsl[0].PaediatricDeptNicu.obsProb)
							 document.getElementById(objDiscSum.dsl[0].PaediatricDeptNicu.obsProb).checked=true;
						 }
						 if(null!=objDiscSum.dsl[0].PaediatricDeptNicu.registration && objDiscSum.dsl[0].PaediatricDeptNicu.registration != "" && (objDiscSum.dsl[0].PaediatricDeptNicu.registration)!=undefined){
							if("undefined"!=objDiscSum.dsl[0].PaediatricDeptNicu.registration) 
							 document.getElementById(objDiscSum.dsl[0].PaediatricDeptNicu.registration).checked=true;
						 }
						 
						 $("#courseInHos").val(objDiscSum.dsl[0].PaediatricDeptNicu.courseInHos);
						 $("#fluids").val(objDiscSum.dsl[0].PaediatricDeptNicu.fluids);
						 $("#antibio").val(objDiscSum.dsl[0].PaediatricDeptNicu.antibio);
						 $("#sedation1").val(objDiscSum.dsl[0].PaediatricDeptNicu.sedation1);
						 $("#sedation2").val(objDiscSum.dsl[0].PaediatricDeptNicu.sedation2);
						 $("#organism").val(objDiscSum.dsl[0].PaediatricDeptNicu.organism);
						 $("#sensitive").val(objDiscSum.dsl[0].PaediatricDeptNicu.sensitive);
						 $("#bslmax").val(objDiscSum.dsl[0].PaediatricDeptNicu.bslmax);
						 $("#bslmin").val(objDiscSum.dsl[0].PaediatricDeptNicu.bslmin);
						 $("#srk").val(objDiscSum.dsl[0].PaediatricDeptNicu.srk);
						 $("#electrolyte").val(objDiscSum.dsl[0].PaediatricDeptNicu.electrolyte);
						 $("#srca").val(objDiscSum.dsl[0].PaediatricDeptNicu.srca);
						 $("#srmg").val(objDiscSum.dsl[0].PaediatricDeptNicu.srmg);
						 $("#xray").val(objDiscSum.dsl[0].PaediatricDeptNicu.xray);
						 $("#ctmri").val(objDiscSum.dsl[0].PaediatricDeptNicu.ctmri);
						 $("#otherex").val(objDiscSum.dsl[0].PaediatricDeptNicu.otherex);
						 $("#priConsult").val(objDiscSum.dsl[0].PaediatricDeptNicu.priConsult);
						 $("#priConsultDate").val(objDiscSum.dsl[0].PaediatricDeptNicu.priConsultDate);
						 $("#priConsultTime").val(objDiscSum.dsl[0].PaediatricDeptNicu.priConsultTime);
						 $("#hrOPD").val(objDiscSum.dsl[0].PaediatricDeptNicu.hrOPD);
						 $("#hrOPDDate").val(objDiscSum.dsl[0].PaediatricDeptNicu.hrOPDDate);
						 $("#hrOPDTime").val(objDiscSum.dsl[0].PaediatricDeptNicu.hrOPDTime);
						 $("#finalOther").val(objDiscSum.dsl[0].PaediatricDeptNicu.finalOther);
						 
						 if(null!= objDiscSum.dsl[0].PaediatricDeptNicu.immunized && objDiscSum.dsl[0].PaediatricDeptNicu.immunized != "" && (objDiscSum.dsl[0].PaediatricDeptNicu.immunized)!=undefined){					 
							 if("undefined"!=objDiscSum.dsl[0].PaediatricDeptNicu.immunized)
							 document.getElementById(objDiscSum.dsl[0].PaediatricDeptNicu.immunized).checked=true;
						 }
				    }
		     	}
		    /** **********************END VIEW************************ */
			}
		});
}

/*function PhysicalDischargeToPatient()
{
	
	var myObj = $("#divPatId").html();
	myObj = JSON.parse(myObj);
	var pi = myObj.pi;
	var ti = myObj.trid;
	var patID = $("#pid").val();
	var treatID = $("#treatmentId").val();
	//alert(patID+"  "+treatID);
	var inputs = [];
	inputs.push('action=PhysicalDischargeToPatient');
	inputs.push('patID=' + patID);
	inputs.push('treatID=' + treatID);
	var str = inputs.join('&');
	jQuery.ajax({
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
		alert(r);
			
		}
	});

}*/
function saveDischargeSummery() {

	var invItem = "";
	$('#txtEquipmetb1').find('option').each(function() {
		invItem = invItem + $(this).val()+"#"+$(this).text()+",";
	});

	var phyItem = "";
	$('#txtEquipmetg1').find('option').each(function() {
		phyItem = phyItem + $(this).val()+"#"+$(this).text()+",";
	});

	var dentalItem = "";
	$('#txtEquipmeti1').find('option').each(function() {
		dentalItem = dentalItem  + $(this).val()+"#"+$(this).text()+",";
	});

	var casualtyItem = "";
	$('#txtEquipmetc1').find('option').each(function() {
		casualtyItem = casualtyItem  + $(this).val()+"#"+$(this).text()+",";
	});

	var pathologyItem = "";
	$('#txtEquipmetp1').find('option').each(function() {
		pathologyItem = pathologyItem + $(this).val()+"#"+$(this).text()+",";
	});

	var treatID = $("#treatID").val();

	var testNoteString="";
	var testNoteCount = $("#testNoteCount").val();

	for (var j = 1; j < testNoteCount; j++) {
		var testNote = $("#testNote" + j).val();
	 
		testNoteString = testNoteString + "@" + testNote;
	}

	var NicuObj = 0;
	NicuObj = {
			listPaediatricDeptNICU:[]
	};

	var prescriptionString="";
	var rowCount = $("#RowCount").val();

	for (var i = 1; i <= rowCount; i++) {

		var txtName = "#Medicine" + i;
		var chkMName = "#M" + i;
		var chkAName = "#A" + i;
		var chkEName = "#E" + i;
		var chkNName = "#N" + i;
		var txtInstruction = "#Instruction" + i;
		var txtDays = "#Days" + i;
		var txtQty = "#Qty" + i;

		var txtValue = $(txtName).val();


		if (txtValue != "" && txtValue != undefined) {

			if (!($(chkMName).attr('checked') || $(chkNName).attr('checked')
					|| $(chkAName).attr('checked') || $(chkEName).attr(
					'checked'))) {

				alert("Please select medicine prescription time");
				return false;

			} else if ($(txtDays).val() == "" || $(txtQty).val() == "") {
				alert("Please Enter Days And Quantity For medicine # No: "
						+ i);
				return false;
			} else {

				prescriptionString = prescriptionString + "@" + txtValue;
				if ($(chkMName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkAName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkEName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				if ($(chkNName).attr('checked')) {

					prescriptionString = prescriptionString + "-1";

				} else {
					prescriptionString = prescriptionString + "-0";
				}
				prescriptionString = prescriptionString + "-"
						+ $(txtInstruction).val() + "-" + $(txtDays).val()
						+ "-" + $(txtQty).val();
			}
		}
	}
	// var dischargeDate = $("#dischargeDate").val();

	var dischargeDate = $("#dateExpectedDischarge").val();

	if(!dischargeDate.contains(":")){
		var temp = dischargeDate.split("-");
		if (temp[0].length == 4)
			dischargeDate = temp[2] + "-" + temp[1] + "-" + temp[0]+" 00:00:00";
	}

var inputs = [];
inputs.push('action=saveDischargeSummary');

inputs.push('invItem=' + encodeURIComponent(invItem));
inputs.push('dentalItem=' + encodeURIComponent(dentalItem));
inputs.push('casualtyItem=' + encodeURIComponent(casualtyItem));
inputs.push('pathologyItem=' + encodeURIComponent(pathologyItem));
inputs.push('phyItem=' + encodeURIComponent(phyItem));

inputs.push('disSummID=' +	$("#disSummID").val());
inputs.push('treatID=' + treatID);
inputs.push('digno='+encodeURIComponent($("#digno").val()));
inputs.push('preSymp='+ encodeURIComponent($("#preSymp").val()));
inputs.push('cliFind='+encodeURIComponent($("#cliFind").val()));
inputs.push('specInvest='+encodeURIComponent( $("#specInvest").val())); 
inputs.push('treatGive='+ encodeURIComponent($("#treatGive").val()));
inputs.push('riskFact='+ encodeURIComponent($("#riskFact").val()));
inputs.push('complication=' +encodeURIComponent($("#complication").val())); 

inputs.push('treAdvDisc=' +encodeURIComponent(prescriptionString));
inputs.push('dischargeDate=' +encodeURIComponent(dischargeDate));
inputs.push('condDisc=' +	encodeURIComponent($("#condDisc").val()));

inputs.push('inchargeDr=' +	encodeURIComponent($("#inchargeDr").val()));

inputs.push('investigation=' +	encodeURIComponent(testNoteString));
inputs.push('treatmentGiven=' +	encodeURIComponent($("#treatmentGiven").val()));

var templateData = CKEDITOR.instances['editor1'].getData();
var idCustomizeTemplate = $("#selCustomizeTemp").val();

inputs.push('templateData=' + encodeURIComponent(templateData));
inputs.push('idCustomizeTemplate=' + encodeURIComponent(idCustomizeTemplate));

var PatientType = $("input:radio[name='PatientType']:checked").val();
// alert(PatientType);
if(PatientType == "PD"){
	// For Paediatric Dept

	inputs.push('pastHistory=' + encodeURIComponent($("#pastHistory").val()));
	inputs.push('generalExamination=' + encodeURIComponent($("#generalExamination").val()));
	inputs.push('cvs=' + encodeURIComponent($("#cvs").val()));
	inputs.push('rs=' + encodeURIComponent($("#rs").val()));
	inputs.push('pa=' + encodeURIComponent($("#pa").val()));
	inputs.push('cns=' + encodeURIComponent($("#cns").val()));
	inputs.push('ps=' + encodeURIComponent($("#ps").val()));
	inputs.push('plateletCount=' + encodeURIComponent($("#plateletCount").val()));
	inputs.push('urineR=' + encodeURIComponent($("#urineR").val()));
	inputs.push('stoolR=' + encodeURIComponent($("#stoolR").val()));
	inputs.push('bsl=' + encodeURIComponent($("#bsl").val()));
	inputs.push('csf=' + encodeURIComponent($("#csf").val()));
	inputs.push('ott=' + encodeURIComponent($("#ott").val()));
	inputs.push('srcalcium=' + encodeURIComponent($("#srcalcium").val()));
	inputs.push('coombTest=' + encodeURIComponent($("#coombTest").val()));
	inputs.push('pdsrna=' + encodeURIComponent($("#pdsrna").val()));
	inputs.push('pdsrk=' + encodeURIComponent($("#pdsrk").val()));
	inputs.push('pdsrcl=' + encodeURIComponent($("#pdsrcl").val()));
	inputs.push('srBillirubin=' + encodeURIComponent($("#srBillirubin").val()));
	inputs.push('unconj1=' + encodeURIComponent($("#unconj1").val()));
	inputs.push('unconj2=' + encodeURIComponent($("#unconj2").val()));
	inputs.push('pdxray=' + encodeURIComponent($("#pdxray").val()));
	inputs.push('pdusg=' + encodeURIComponent($("#pdusg").val()));
	inputs.push('pdctmri=' + encodeURIComponent($("#pdctmri").val()));
	inputs.push('pdtt=' + encodeURIComponent($("#pdtt").val()));
	inputs.push('pdFOther=' + encodeURIComponent($("#pdFOther").val()));

	inputs.push('courseOfRec=' + encodeURIComponent($("#courseOfRec").val()));
	inputs.push('pdManagement=' + encodeURIComponent($("#pdManagement").val()));

	// Checkbox

    var strchk = "";
    for ( var i = 1; i <= 11; i++) {
           chk = ($("#chk" + i)).is(':checked') ? "Y" : "N";
           strchk = strchk + "," + chk;
    }

    inputs.push('immunisationStatus=' + encodeURIComponent(strchk));
	inputs.push('otherVaccines=' + encodeURIComponent($("#otherVaccines").val()));
	inputs.push('anyOtherPoints=' + encodeURIComponent($("#anyOtherPoints").val()));
	inputs.push('followUpAdvise=' + encodeURIComponent($("#followUpAdvise").val()));
	inputs.push('paedDept=' + encodeURIComponent($("input:radio[name='PatientType']:checked").val()));

}else{
	// For Peadiatric Dept Nicu
	// Setting Data into Json Object

	inputs.push('paedDept=' + encodeURIComponent($("input:radio[name='PatientType']:checked").val()));
	var babysData = encodeURIComponent($('input:radio[name="babysData"]:checked').val());
	var deliveryData = encodeURIComponent($('input:radio[name="deliveryData"]:checked').val());
	var registration = encodeURIComponent($('input:radio[name="registration"]:checked').val());
	var immunized = encodeURIComponent($('input:radio[name="im"]:checked').val());
	var obsProb = encodeURIComponent($('input:radio[name="obsProb"]:checked').val());

	NicuObj.listPaediatricDeptNICU.push({
		"ipdNo":$("#ipdNo").val(),
		"birthWeight":$("#birthWeight").val(),
		"weightOnAdmission" : $("#weightOnAdmission").val(),
		"weightOnDischarge": $("#weightOnDischarge").val(),
		"babysData": babysData,
		"deliveryData": deliveryData,
		"conditionAtBirth": $("#conditionAtBirth").val(),
		"ancAge": $("#ancAge").val(),
		"mbg": $("#mbg").val(),
		"rh": $("#rh").val(),
		"registration": registration,
		"immunized": immunized,
		"serHIV": $("#serHIV").val(),
		"hbsAG": $("#hbsAG").val(),
		"vdrl": $("#vdrl").val(),
		"dm": $("#dm").val(),
		"htn": $("#htn").val(),
		"thyroid": $("#thyroid").val(),
		"fever": $("#fever").val(),
		"medOther": $("#medOther").val(),
		"obsProb": obsProb,
		"courseInHos": $("#courseInHos").val(),
		"fluids": $("#fluids").val(),
		"antibio": $("#antibio").val(),
		"sedation1": $("#sedation1").val(),
		"sedation2": $("#sedation2").val(),
		"duration": $("#duration").val(),
		"mode1": $("#mode1").val(),
		"pip1": $("#pip1").val(),
		"peep1": $("#peep1").val(),
		"fio1": $("#fio1").val(),
		"mode2": $("#mode2").val(),
		"pip2": $("#pip2").val(),
		"peep2": $("#peep2").val(),
		"fio2": $("#fio2").val(),
		"organism": $("#organism").val(),
		"sensitive": $("#sensitive").val(),
		"bslmax": $("#bslmax").val(),
		"bslmin": $("#bslmin").val(),
		"electrolyte": $("#electrolyte").val(),
		"srk": $("#srk").val(),
		"srcl": $("#srcl").val(),
		"srca": $("#srca").val(),
		"srmg": $("#srmg").val(),
		"date1": $("#date1").val(),
		"billirubin1": $("#billirubin1").val(),
		"total1": $("#total1").val(),
		"indirect1": $("#indirect1").val(),
		"direct1": $("#direct1").val(),
		"phototherapy1": $("#phototherapy1").val(),
		"date2": $("#date2").val(),
		"billirubin2": $("#billirubin2").val(),
		"total2": $("#total2").val(),
		"indirect2": $("#indirect2").val(),
		"direct2": $("#direct2").val(),
		"phototherapy2": $("#phototherapy2").val(),
		"date3": $("#date3").val(),
		"billirubin3": $("#billirubin3").val(),
		"total3": $("#total3").val(),
		"indirect3": $("#indirect3").val(),
		"direct3": $("#direct3").val(),
		"phototherapy3": $("#phototherapy3").val(),
		"date4": $("#date4").val(),
		"billirubin4": $("#billirubin4").val(),
		"total4": $("#total4").val(),
		"indirect4": $("#indirect4").val(),
		"direct4": $("#direct4").val(),
		"phototherapy4": $("#phototherapy4").val(),
		"xray": $("#xray").val(),
		"usg": $("#usg").val(),
		"ctmri": $("#ctmri").val(),
		"otherex": $("#otherex").val(),
		"redReflex1": $("#redReflex1").val(),
		"hips1": $("#hips1").val(),
		"femorals1": $("#femorals1").val(),
		"genitals1": $("#genitals1").val(),
		"hernia1": $("#hernia1").val(),
		"headcir1": $("#headcir1").val(),
		"pcother1": $("#pcother1").val(),
		"redReflex2": $("#redReflex2").val(),
		"hips2": $("#hips2").val(),
		"femorals2": $("#femorals2").val(),
		"genitals2": $("#genitals2").val(),
		"hernia2": $("#hernia2").val(),
		"headcir2": $("#headcir2").val(),
		"pcother2": $("#pcother2").val(),
		"ropScreen1": $("#ropScreen0").val()+"*"+$("#ropScreen1").val(),
		"hearingScreen1": $("#hearingScreen0").val()+"*"+$("#hearingScreen1").val(),
		"usgBrain1": $("#usgBrain0").val()+"*"+$("#usgBrain1").val(),
		"adother1": $("#adother0").val()+"*"+$("#adother1").val(),
		"ropScreen2": $("#ropScreen2").val(),
		"hearingScreen2": $("#hearingScreen2").val(),
		"usgBrain2": $("#usgBrain2").val(),
		"adother2": $("#adother2").val(),
		"priConsult": $("#priConsult").val(),
		"priConsultDate": $("#priConsultDate").val(),
		"priConsultTime": $("#priConsultTime").val(),
		"hrOPD": $("#hrOPD").val(),
		"hrOPDDate": $("#hrOPDDate").val(),
		"hrOPDTime": $("#hrOPDTime").val(),
		"finalOther": $("#finalOther").val(),
		// "treatment_id":treatID
	});

	NicuObj = JSON.stringify(NicuObj);
	inputs.push('NicuObj='+encodeURIComponent(NicuObj));

}

var str = inputs.join('&');
jQuery.ajax( {
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
		alert(ajaxResponse);
		window.location.reload(true);
		}
	});
}

function setInvestTest(obj){
	$("#testContent").setTemplate(setInvestTestTemp);
	$("#testContent").processTemplate(obj);
	// var obj = $("#obj").val();
}

function setDrugsContent(obj){

	$("#drugsContent").setTemplate(settreatGivenTemp);
	$("#drugsContent").processTemplate(obj);
	// var obj = $("#obj").val();
}

function click2(fieldId) {

	var id = fieldId.id;
/*	$( function() {
		$(".demo").timepickr( {
			convention : 12
		});
	});*/

	$('#'+id).datetimepicker({
		 datepicker:false,
		 format:'H:i',
		 step:15
		 });

}
function setDoctorPreRound() {
	
	rowCount = 1;
	k = 1;
	count = 1;

	var separator = '/';
	var replaceWith='-';
	var treatmentId=  $("#tr_Id").val();
	var unitId = $("#unitId").val();
	
	var fromDate= convertStringtoYYYYMMDD($("#date-pick").val(),separator,replaceWith);
	
	var tID =  $("#tr_Id").val();
	var date = $("#date-pick").val();
	
	var inputs = [];

	
	

	inputs.push('treatmentID='+tID);
	inputs.push('date='+date);
	
	var str = inputs.join('&');
	
	
	$.ajax({
		async 		: false,
        url			: './ehat/ipdhistory/fetchDoctorRoundsByDateOnchange',
        type		: 'GET',
        dataType	: 'json',
        data		: {
						"treatmentId":treatmentId, // Above common defined
						"unitId":unitId, // Above common defined
						"fromDate":fromDate // Above common defined
						
		},
        contentType	: 'application/json',
        beforeSend: function() {
		     $('#primeLoader').show();
		 },
		 complete: function(){
		     $('#primeLoader').hide();
		  },
        error 		: function() { alert('Network Issue!!!'); },
        success		: function (r) {		
			
        	//setDoctorRounds(r);
			
			ajaxResponse = r;
			
			/*if(ajaxResponse.length ==0){
				return false;
			}*/
			if(r.length ==0){
				$("#DRRDiv").html("");
				 $('#doctorRoundId').val(0);
			}
			 
			if(r.length>0){
			$('#doctorRoundId').val(r[0].doctorRoundId);
			$("#RowCount2").val(0);
			$("#DRRDiv").html("");
				 var cnt=1;
				
				for(var i=0; i<r.length;i++){
					for(var j=0;j<r[i].listDoctorRoundSlaveDTO.length; j++){
						 
						toCreateDiv('RowCount2');
						 var clinicalNotes= r[i].listDoctorRoundSlaveDTO[j].clinicalNotes;
						 var doctorId= r[i].listDoctorRoundSlaveDTO[j].doctorId;
						 var investigationAdvice = r[i].listDoctorRoundSlaveDTO[j].investigationAdvice;
						 var templateId =  r[i].listDoctorRoundSlaveDTO[j].templateId;
						 var timeAry= r[i].listDoctorRoundSlaveDTO[j].time.split(":");
						 var time = timeAry[0] +":"+timeAry[1];
						 var doctorRoundSlaveId=r[i].listDoctorRoundSlaveDTO[j].doctorRoundSlaveId;
						 var nursingNotes=r[i].listDoctorRoundSlaveDTO[j].nursingNotes;
						 var dtime=r[i].listDoctorRoundSlaveDTO[j].drComplitionTime;
						 var templateName = r[i].listDoctorRoundSlaveDTO[j].templateName;
						 var templateId = r[i].listDoctorRoundSlaveDTO[j].templateId;
						 
						 
						 
						 $("#t"+cnt).val(time);
						 $("#tn"+cnt).val(templateId);
						 $("#cf"+cnt).val(clinicalNotes);
						 $("#ia"+cnt).val(investigationAdvice);
						 $("#rb"+cnt).val(doctorId); 
						 $("#checkbox"+cnt).val(doctorRoundSlaveId);  
						 $("#salveId"+cnt).val(doctorRoundSlaveId);
						 $("#nursingnotes"+cnt).val(nursingNotes);
						 $("#dtime"+cnt).val(dtime);
						 $("#templateName"+cnt).val(templateName);
						 $("#templateId"+cnt).val(templateId);
						 
						
						 //toCreateDiv('RowCount');
						 cnt++;
					}
					
					 var formDate=r[i].fromDate;
					 var toDate=r[i].toDate;
					 var createdBy=r[i].createdBy;
					 $("#formDate").val(formDate);
					 $("#toDate").val(toDate);
					 $("#createdBy").val(createdBy);
				}
			
			}
			//alert(ajaxResponse);
			/*$("#DRR").html(ajaxResponse);
			$("#onloadDrrSet").html(ajaxResponse);
			//sampleBean = eval('(' + ajaxResponse + ')');
			sampleBean = ajaxResponse ;
			var userType = $("#userType").val();
			if (userType == "admin") {
				$("#DRRDiv").setTemplate(IPD_DRRAdminTemp);
				$("#DRRDiv").processTemplate(sampleBean);
				
				$("#DRRDivDash").setTemplate(IPD_DRRAdminTempDash);
				$("#DRRDivDash").processTemplate(sampleBean);

			} else {
				$("#DRRDiv").setTemplate(IPD_DRRAdminTemp);
				$("#DRRDiv").processTemplate(sampleBean);
				
				$("#DRRDivDash").setTemplate(IPD_DRRAdminTempDash);
				$("#DRRDivDash").processTemplate(sampleBean);
			}*/
			
			/*var jr = 1;
			for (var i = 0; i < sampleBean[0].listDoctorRoundSlaveDTO.length; i++) {
				//var Doc_div = "tn" + jr;
				//loadRoundDoctors(Doc_div,sampleBean.drrl[i].tn);
				//var data = $("#DRTDetails").html();	//data set at ipdTreatment.fetchDoctorRoundTemplate("IPD_DoctorStation")
				//var result = eval('(' + data + ')');//onload function call
				var rowId = "tn" + jr;		// #tn is select box id with row count 
				//alert(rowId+"---->>>>"+sampleBean.drrl[i].tn);
				var tempDRT2 = "<option value='0'>--Select--</option>{#foreach $T.listDRT as ldrt}<option value='{$T.ldrt.templateId}' onclick=fillDRT('{$T.ldrt.templateId}','"+jr+"')>{$T.ldrt.templateName}</option>{#/for}";
				//var tempDRT2 = "<input type='text'>{#foreach $T.listDRT as ldrt}<option value='{$T.ldrt.templateId}' onclick=fillDRT('{$T.ldrt.templateId}','"+jr+"')>{$T.ldrt.templateName}</option>{#/for}";

				//$("#" + rowId).val(sampleBean.drrl[i].tn);
				$("#" + rowId).setTemplate(tempDRT2);//set template
				$("#" + rowId).processTemplate(result);
				
				jr++;

			}
			var kr = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				var rowId = "tn" + kr;
				kr++;
				$("#" + rowId + "").val(sampleBean.drrl[i].tn);
				

			}
			
			var j = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				var Doc_div = "rb" + j;
				loadRoundDoctors(Doc_div,sampleBean.drrl[i].rb);
				j++;
				// $("#" + Doc_div).val(sampleBean.drrl[i].rb);
			}
			var k = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				var Doc_div = "rb" + k;
				k++;
				$("#" + Doc_div + "").val(sampleBean.drrl[i].rb);

			}

			for (var ii = 0; ii < sampleBean.drrl.length; ii++) {
				$('#t' + (ii + 1)).datetimepicker({
					datepicker : false,
					format : 'H:i',
					step : 15
				});
				
				$('#drct' + (ii + 1)).datetimepicker({
					datepicker : false,
					format : 'H:i',
					step : 15
				});
				
			}
			setTimeout(function(){userAccess();},200);*/
		}
		});

	/*jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "IPDTreatmentServlet",
		url:'./ehat/doctordesk/fetchSelctedIpdDrRound',
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
				
			if(ajaxResponse.length ==0){
				return false;
			}
			
			//alert(ajaxResponse);
			$("#DRR").html(ajaxResponse);
			$("#onloadDrrSet").html(ajaxResponse);
			//sampleBean = eval('(' + ajaxResponse + ')');
			sampleBean = ajaxResponse ;
			var userType = $("#userType").val();
			if (userType == "admin") {
				$("#DRRDiv").setTemplate(IPD_DRRAdminTemp);
				$("#DRRDiv").processTemplate(sampleBean);
				
				$("#DRRDivDash").setTemplate(IPD_DRRAdminTempDash);
				$("#DRRDivDash").processTemplate(sampleBean);

			} else {
				$("#DRRDiv").setTemplate(IPD_DRRAdminTemp);
				$("#DRRDiv").processTemplate(sampleBean);
				
				$("#DRRDivDash").setTemplate(IPD_DRRAdminTempDash);
				$("#DRRDivDash").processTemplate(sampleBean);
			}
			
			var jr = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				//var Doc_div = "tn" + jr;
				//loadRoundDoctors(Doc_div,sampleBean.drrl[i].tn);
				var data = $("#DRTDetails").html();	//data set at ipdTreatment.fetchDoctorRoundTemplate("IPD_DoctorStation")
				var result = eval('(' + data + ')');//onload function call
				var rowId = "tn" + jr;		// #tn is select box id with row count 
				//alert(rowId+"---->>>>"+sampleBean.drrl[i].tn);
				var tempDRT2 = "<option value='0'>--Select--</option>{#foreach $T.listDRT as ldrt}<option value='{$T.ldrt.templateId}' onclick=fillDRT('{$T.ldrt.templateId}','"+jr+"')>{$T.ldrt.templateName}</option>{#/for}";
				//var tempDRT2 = "<input type='text'>{#foreach $T.listDRT as ldrt}<option value='{$T.ldrt.templateId}' onclick=fillDRT('{$T.ldrt.templateId}','"+jr+"')>{$T.ldrt.templateName}</option>{#/for}";

				//$("#" + rowId).val(sampleBean.drrl[i].tn);
				$("#" + rowId).setTemplate(tempDRT2);//set template
				$("#" + rowId).processTemplate(result);
				
				jr++;

			}
			var kr = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				var rowId = "tn" + kr;
				kr++;
				$("#" + rowId + "").val(sampleBean.drrl[i].tn);
				

			}
			
			var j = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				var Doc_div = "rb" + j;
				loadRoundDoctors(Doc_div,sampleBean.drrl[i].rb);
				j++;
				// $("#" + Doc_div).val(sampleBean.drrl[i].rb);
			}
			var k = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				var Doc_div = "rb" + k;
				k++;
				$("#" + Doc_div + "").val(sampleBean.drrl[i].rb);

			}

			for (var ii = 0; ii < sampleBean.drrl.length; ii++) {
				$('#t' + (ii + 1)).datetimepicker({
					datepicker : false,
					format : 'H:i',
					step : 15
				});
				
				$('#drct' + (ii + 1)).datetimepicker({
					datepicker : false,
					format : 'H:i',
					step : 15
				});
				
			}
			setTimeout(function(){userAccess();},200);
		}
	});*/
}

//onclick in above template 'tempDRT' to fill temp details in text boxes rowwise...Vikas
function fillDRT(tId,rowCount){
    //changes by Vikas Godse-Start
    var data = $("#DRTDetails").html();
    var myObj1 = "";
    var myArray = JSON.parse(data.decodeSpecialChars());
    for ( var i = 0; i < myArray.listDRT.length; i++) {
        if (myArray.listDRT[i].templateId == tId) {
            myObj1 = myArray.listDRT[i];
            break;
        }
    }
    var a=myObj1.clinicalNote;
    var clinicalNote=a.replace(/[^a-zA-Z0-9]/.g, ' ');
    var investigation=myObj1.investigationAdvice;
    setTimeout(function(){
    $("#cf" + rowCount).val(clinicalNote);
    $("#ia" + rowCount).val(investigation);
    
    },500);
    
}

function setDoctorPreeRound() {
var trid = 557;
var date = "14/05/2015";
alert(date);
alert(trid);
	rowCount = 1;
	k = 1;
	count = 1;
	/*
	 * pobj = $("#divPatId").html(); pobj1 = eval('(' + pobj + ')'); var date =
	 * $("#date-pick").val();
	 */
	var inputs = [];
	inputs.push('action=PreviousDoctorRound');
	inputs.push('tid=' + trid);
	inputs.push('date=' + date);

	var str = inputs.join('&');

	jQuery.ajax( {
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

			$("#DRR").html(ajaxResponse);
			// alert(ajaxResponse);
			sampleBean = eval('(' + ajaxResponse + ')');
			var userType = $("#userType").val();
			if (userType == "admin") {
				$("#DRRDiv").setTemplate(IPD_DRRAdminTemp);
				$("#DRRDiv").processTemplate(sampleBean);

			} else {
				$("#DRRDiv").setTemplate(IPD_DRRTemp);
				$("#DRRDiv").processTemplate(sampleBean);
			}
			var j = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				var Doc_div = "rb" + j;
				loadRoundDoctors(Doc_div,sampleBean.drrl[i].rb);
				j++;
				// $("#" + Doc_div).val(sampleBean.drrl[i].rb);
			}
			var k = 1;
			for (var i = 0; i < sampleBean.drrl.length; i++) {
				var Doc_div = "rb" + k;
				k++;
				$("#" + Doc_div + "").val(sampleBean.drrl[i].rb);
			}

			for (var ii = 0; ii < sampleBean.drrl.length; ii++) {
				$('#t' + (ii + 1)).datetimepicker({
					datepicker : false,
					format : 'H:i',
					step : 15
				});
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}


// +++Load Material used by Patient By Date on IPD_Material used+++++++//
function setPatientMaterialUsed(pageName) {
	rowCount = 1;
	k = 1;
	count = 1;
	sr = 1;
	pobj = $("#divPatId").html();
	
	var trid=$("#tid").val();
	pobj1 = eval('(' + pobj + ')');
	//alert(pobj1.trid);
	var date = $("#date-pickMaterials").val();
	var inputs = [];
	//inputs.push('action=PatientMaterialUsed');
	/*inputs.push('tid=' + pobj1.trid);*/
	inputs.push('tid=' + trid);  //Added by sagar...
	inputs.push('date=' + date);

	var str = inputs.join('&');
	var userType = $("#userType").val();

	jQuery.ajax( {
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : " ./ehat/ipdhistory/patientMaterialUsed",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#Material").html(ajaxResponse);

		sampleBean = eval('(' + ajaxResponse + ')');

		if (pageName == "material") {
			if (userType == "admin") {

				$("#IPD_MaterialContent").setTemplate(IPD_MaterialsAdminTemp);
				$("#IPD_MaterialContent").processTemplate(sampleBean);

				for(var i=0;i<sampleBean.bcl.length;i++){
					$("#tm" + (i + 1)).datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 15
					});
					$("#tm" + (i + 1)).attr('readonly', 'readonly');
				}

			} else {
				$("#IPD_MaterialContent").setTemplate(IPD_MaterialsAdminTemp);
				$("#IPD_MaterialContent").processTemplate(sampleBean);

				for(var i=0;i<sampleBean.bcl.length;i++){
					$("#tm" + (i + 1)).attr('readonly', 'readonly');
					$("#mt" + (i + 1)).attr('readonly', 'readonly');
					$("#tm" + (i + 1)).datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 15
					});
				}
			}
		}else if(pageName == "materialOnchange"){
			if (userType == "admin") {

				$("#IPD_MaterialContent").setTemplate(IPD_MaterialsAdminTemp);
				$("#IPD_MaterialContent").processTemplate(sampleBean);

				// setTimeout(function(){
					for(var i=0;i<sampleBean.bcl.length;i++){
						$("#tm" + (i + 1)).attr('readonly', 'readonly');
						$("#tm" + (i + 1)).datetimepicker({
							datepicker : false,
							format : 'H:i',
							step : 15
						});
					}
				// },50);

			} else {
				$("#IPD_MaterialContent").setTemplate(IPD_MaterialsTemp);
				$("#IPD_MaterialContent").processTemplate(sampleBean);

				for(var i=0;i<sampleBean.bcl.length;i++){
					$("#tm" + (i + 1)).attr('readonly', 'readonly');
					$("#mt" + (i + 1)).attr('readonly', 'readonly');
					$("#tm" + (i + 1)).datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 15
					});
				}
			}
		} 


		else if (pageName == "Discharge") {
			$("#IPD_DischargeContent").setTemplate(dischargeContent);
			$("#IPD_DischargeContent").processTemplate(sampleBean);

		}
		/*
		 * var j = 1; for (i = 0; i < sampleBean.bcl.length; i++) {
		 * 
		 * if (sampleBean.bcl[i].mty == "B" || sampleBean.bcl[i].mty == "RB") { //
		 * var $radios=$("#Radio"+j+"["+i+"]"); // var
		 * name="[name=RadioGroup"+j+"]"; var $radios =
		 * $('input:radio[name=Radio' + j + ']'); // var
		 * $radios=$("input#RadioGroup"+j+" B"); if ($radios.is(':checked') ==
		 * false) { $radios.filter('[value=B]').attr('checked', true); } } else
		 * if (sampleBean.bcl[i].mty == "R" ) { var $radios =
		 * $('input:radio[name=Radio' + j + ']'); if ($radios.is(':checked') ==
		 * false) { $radios.filter('[value=R]').attr('checked', true); } } j++; }
		 */
		setTimeout(function(){userAccess();},100);
}
	});
}

// Function to remove DIC division
function toRemoveDivDIC(RowCount) {
	var chart=$("#chart").val();
	var action="";
	var userType = $("#userType").val();

	var nRowrowCount = $("#nRow").val();
	if (nRowrowCount == "0") {
		alert("No Data in IPD Nursing Station");
		return false;
	}

	var allVals = [];
	var flag = false;
	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}

	var Response1 = $("#DIC").html();
	var ajaxRes = eval('(' + Response1 + ')');

	var k = 0;
	if(chart!="select" && chart!=undefined) {

		for (var m = 1; m <= ajaxRes.crl.length; m++) {
			for (var a = 0; a < allVals.length; a++) {
				if (allVals[a] == ajaxRes.crl[k].crid) {
					ajaxRes.crl[k].ti = 0;
				};
			}
			k++;
		}

		action="DeleteChart";

	} else {
	 
		for (m = 1; m <= ajaxRes.tnl.length; m++) {
			for (a = 0; a < allVals.length; a++) {
				if (allVals[a] == ajaxRes.tnl[k].tnid) {
					ajaxRes.tnl[k].nid = 0;
				};
			}
			k++;
		}
		action="DeleteDIC";
	}
	if (allVals.length != 0) {

		if ((ajaxRes.tnl.length) != 0 ) {

			parsebcObj = JSON.stringify(ajaxRes);
			var inputs = [];
			inputs.push('action='+action);
			inputs.push('dicobj=' + parsebcObj);
			var str = inputs.join('&');
			jQuery.ajax( {
				async :true,
				type :"POST",
				data :str + "&reqType=AJAX",
				url :"IPDTreatmentServlet",
				timeout :1000 * 60 * 5,
				cache :false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					window.location.reload(true);
				}
			});
		}
	}
 
	var hiddenRowCount = $("#RowCount").val();
	var rowCount = hiddenRowCount;
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var totalRowCount = (rowCount + addrowCount);
	var p = 1;
	for ( var i = 0; i < (totalRowCount); i++) {
		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#div" + p + "").remove();
		}
		p++;
	}; 
}

// Function to remove DRR division
function toRemoveDivDRR(RowCount) {
	// var sr= $("#srNo").val();
	var userType = $("#userType").val();

		var Response1 = $("#DRR").html();
		var ajaxRes = eval('(' + Response1 + ')');

		var allVals = [];
		$.each($('#checkbox:checked'), function() {
			allVals.push($(this).val());
		});

		var k = 0;
		for (var m = 1; m <= ajaxRes.drrl.length; m++) {
			
			for (var a = 0; a < allVals.length; a++) {
				if (allVals[a] == ajaxRes.drrl[k].di) {
					ajaxRes.drrl[k].ti = 0;
				}
			}
			k++;
		}
		
		if (allVals.length != 0) {

			parsebcObj = JSON.stringify(ajaxRes);
			var inputs = [];
			inputs.push('action=DeleteDRR');
			inputs.push('drrobj=' + encodeURIComponent(parsebcObj));
			var str = inputs.join('&');
			jQuery.ajax( {
				async :true,
				type :"POST",
				data :str + "&reqType=AJAX",
				url :"IPDTreatmentServlet",
				timeout :1000 * 60 * 5,
				cache :false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					//setDoctorPreRound();
				}
			});
		}

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var p = 1;
	var w = $("#DRRaddCount").val();
	var flag = false;
	var deleteCount = 0;
	for ( var i = 0; i < rowCount; i++) {
		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#div" + p + "").remove();
			flag = true;
			deleteCount++;
			addrowCount--;
			rowCount--
			w--;
		}
		p++;
	}

	
	addrowCount -= deleteCount;
	rowCount -= deleteCount;
	w -= deleteCount;
	
	//$("#RowCount").val(rowCount);
	//$("#addRowCount").val(addrowCount);
	if(w == 0){
		w = 1;
	}
	
	//$("#DRRaddCount").val(w);

	if (!flag) {
		alert("Please check the check box...");
		return false;
	}
	
	/*if(ajaxRes.drrl.length > 0){
		setDoctorPreRound();
	}*/
}


function RemoveDiv(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var p = 1;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#div" + p + "").remove();
		}
		p++;
	}
}

// Function to remove DRR division
function toRemoveDivMat() {
		var Response1 = $("#Material").html();
		ajaxRes = eval('(' + Response1 + ')');

	var hiddenRowCount = document.getElementById("RowCountMaterial");
	var rowCount = hiddenRowCount.value;
	var addrowCount = $("#addRowCountMaterial").val();
	var count = rowCount - addrowCount;
	var p = 1;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			if($("#bcid"+p).val() != 0 && $("#mid"+p).val() != 0){
				var r = confirm("Are you sure to delete this material");
				if(r == true){
					parsebcObj = JSON.stringify(ajaxRes);
					var inputs = [];
					inputs.push('action=DeleteMaterialUsed');
					// inputs.push('matobj=' + parsebcObj);
					inputs.push('slaveid=' + $("#bcid"+p).val());
					inputs.push('masterid=' + $("#mid"+p).val());
					var str = inputs.join('&');
					jQuery.ajax( {
						async :true,
						type :"POST",
						data :str + "&reqType=AJAX",
						url :"IPDTreatmentServlet",
						timeout :1000 * 60 * 5,
						cache :false,
						error : function() {
							alert('error');
						},
						success : function(r) {
							ajaxResponse = r;
							alert(ajaxResponse);
							location.reload();
					}
					});
				}else{
					return false;
				}
			}else{
				$("#divM" + p + "").remove();
			}
		}
		p++;
	}
}
// Create division for material used page
var z = 1;
function toCreateDivM() {

	var hiddenRowCount = document.getElementById("RowCountMaterial");
	var rowCount = hiddenRowCount.value;
	var addRowCountMaterial = $("#addRowCountMaterial").val();

	if (rowCount != 0) {

	var mt = $("#mt" + rowCount + "").val();
	var qty = $("#qty" + rowCount + "").val();
		if (mt == "" && qty == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}

		var userNm = $("#txtUserName").val();
		var userId = $("#txtUserId").val();

		// code to create division start
		rowCount++;
		divId = "divM" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', divId);
		document.getElementById("MaterialDiv").appendChild(x);
		// var Doc_div = "rb" + RowCountMaterial;
		// loadRoundDoctors(Doc_div);

		document.getElementById(divId).innerHTML = '<td style="height: 21.5px; width: 29px;" id="srNo">'
			+ rowCount
			+ ' </td><td style="height: 21.5px; width: 142px;">'
			+ '<input type="text" class="form-control input-SmallText TextFont" name="textfield" id="tm'
			+ rowCount
			+ '"	value="" readonly="readonly"  /></td><td	style="height: 21.5px; width: 365px;"><div style="text-align:left;" id ="divmt'
			+ rowCount
			+ '"><input class="typeahead form-control input-SmallText" type="text" name="textfield" id="mt'
			+ rowCount
			+ '" value="" onkeypress = "autoSuggestionForMaterialUsed(this.id,onchange)" /></div><input type="hidden" value = "0" id = "Idmt'
			+ rowCount
			+ '"></td><td style="height: 21.5px; width: 165px;"><input class="form-control input-SmallText TextFont" type="text" onkeypress="return validateNumbers(event)" onchange=checkMaterialQty('
			+ rowCount
			+ ',"material") name="textfield" id="qty'
			+ rowCount
			+ '" value=""	onkeypress="return validateComma(event)"  /></td><td style="height: 21.5px; width: 188px;">'
			+ userNm
			+ '</td><td	style="height: 21.5px;"><input	type="radio" name="Radio'
			+ rowCount
			+ '" value="B" id="Billable'
			+ rowCount
			+ '" />Billable &nbsp;&nbsp;&nbsp;&nbsp;<input	type="radio" name="Radio'
			+ rowCount
			+ '" value="R" id="Replace' 
			+ rowCount
			+ '" />Replaceable</td><td style="height: 21.5px;"><input type="checkbox"   name="checkbox'
			+ rowCount
			+ '"  id="checkbox"'
			+ ' /></td><input type="hidden" value="0" id="bcid'+rowCount+'" /><input type="hidden"	name="textfield" id="ub'
			+ rowCount + '" value="' + userId + '"	 /><input type="hidden" value="'+rowCount+'" id="txtRowCount" name="txtRowCount" /><input id="mid'+rowCount+'" type="hidden" value="0">';

		$("#tm" + rowCount).datetimepicker({
			datepicker : false,
			format : 'H:i',
			step : 15
		});

		$("#RowCountMaterial").val(rowCount);
		$("#addRowCountMaterial").val(z);
		autoSuggestionForMaterialUsed("mt" + rowCount, "onload");
		z++;
		$("input[name=Radio" + rowCount + "][value=R]").attr('checked',true);
	
}
// Save Material used by patient.
function saveMaterialUsed() {
	var status = "";
	var userType = $("#userType").val();
	var rowCount = $("#RowCountMaterial").val();
	var addrowCount = $("#addRowCountMaterial").val();
	if (rowCount == "0") {
		alert("Please enter atleast one IPD Material to save...");
		return false;
	}

	//if (userType == "admin") {
		var Response1 = $("#Material").html();

		ajaxRes = eval('(' + Response1 + ')');
		var z = 0;
		var v = 0;
		v = ajaxRes.bcl.length;
		for (var m = 1; m <= ajaxRes.bcl.length; m++) {
			var time = $("#tm" + m + "").val();
		
			if ( time == undefined) {
				ajaxRes.bcl[z].bid = 0;
			} else {
				if ($("#tm" + m + "").val() == "") {
					alert("Time must be filled out");
					return false;
				}
				ajaxRes.bcl[z].tm = $("#tm" + m + "").val();
				ajaxRes.bcl[z].mn = $("#mt" + m + "").val();
				ajaxRes.bcl[z].qty = $("#qty" + m + "").val();
				ajaxRes.bcl[z].mty = $("input:radio[name=Radio" + m + "]:checked").val();
				ajaxRes.bcl[z].sid = $("#bcid" + m).val();
				ajaxRes.bcl[z].mid = $("#mid").val();
			}
			z++;
		}
		// alert(ajaxRes);
		parsebcObj = JSON.stringify(ajaxRes);
	/*} else {
		parsebcObj = "null";
	}*/

	if (rowCount == 0) {
		return false;
	} else {
		var MaterialString = "";
		if (rowCount != 0 && addrowCount != 0) {
			var count = rowCount - addrowCount;

			for (var i = 1; i <= addrowCount; i++) {
				count++;
				var tm = $("#tm" + count + "").val();
				if (tm == undefined) {
					status = "Empty";
				} else {

					var mt = $("#mt" + count + "").val();
					var qty = $("#qty" + count + "").val();
					var ub = $("#ub" + count + "").val();
					var Idmt = $("#Idmt" + count + "").val();
					var radio = $("input:radio[name=Radio" + count + "]:checked")
					.val();

					if (tm == "" || (mt == "" && qty == "" && radio == "")) {

							alert("You can not save empty fields.");
							return false;
					} else {
						if (mt == "" && qty == "") {
							alert("Please Enter Material Name!");
							return false;
						} else if (qty == "") {
							alert("Please Enter Quantity!");
							return false;
						} else if (Idmt == 0) {
							alert("Please select Material name from autoSuggetion list!");
							return false;
						} 
						qty = eval('(' + qty + ')');
						MaterialString = MaterialString + tm + "," + mt
								+ "," + qty + "," + ub + "," + Idmt + ","+ radio + "@";
					}
					// rowCount++;
				}
			}
		}
			var date = $("#date-pick").val();
			pobj = $("#divPatId").html();
			pobj1 = eval('(' + pobj + ')');
			var inputs = [];
			inputs.push('action=saveMaterialUsed');
			inputs.push('tid=' + pobj1.trid);
			inputs.push('drs=' + MaterialString);
			inputs.push('matobj=' + parsebcObj);

			inputs.push('date=' + date);
			var str = inputs.join('&');
			jQuery.ajax( {
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "IPDTreatmentServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(ajaxResponse) {
					alert(ajaxResponse);
					
					window.location.hash = '#IPD_Materials';
				    window.location.reload(true);
				}
		});
	}
}

// +++Load Doctors on IPD_DRR page+++++++++//
function loadRoundDoctors(DocDiv,docid) {
	var inputs = [];
	inputs.push('action=loadDoctor');
	inputs.push('pageName=DRR');
	var str = inputs.join('&');

	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "TreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			DoctorBean = eval('(' + ajaxResponse + ')');
			// for Doctor Round IPD_DoctorStation
			$("#doctorBean").html(ajaxResponse);
			$("#" + DocDiv + "").setTemplate(dispDoctor);
			$("#" + DocDiv + "").processTemplate(DoctorBean);
			if(docid!=undefined){
			$("#" + DocDiv + "").val(docid);
			}
		}
	});
};

// +++++Save Doctor Round treatment++++++++//

function printDRRReport() {
	pinfo = JSON.parse($("#divPatId").html());
	var WindowObject = window.open('', ' ', '');
	WindowObject.document.writeln('<html><body>');

		 WindowObject.document
		.writeln('<div style="width: 100%; padding-left: 5%; text-align: center;"		id="SRBill"><h1>Daily Round Report</h1></div>');


		 WindowObject.document
			.writeln("<div style='width: 80%; float: left; padding-top: 2.5%;'><div style='width: 70%; float: left;'><div style='width: 100%; float: left;'>	<div	style='width: 23%; float: left; padding-left: 7%; padding-top: 1%; '>Name:</div><div	style='width: 63%; float: left; padding-right: 7%; padding-top: 1%;color: #002c67;'>"
					+ pinfo.fn
					+ " "
					+ pinfo.mn
					+ " "
					+ pinfo.ln
					+ "</div></div></div><div style='width: 30%; float: left;'><div style='width: 100%; padding-top: 2%;'>	<div style='width: 43%; padding-left: 7%; padding-top: 1%; float: left; font-weight: bold;'>Treatment Start Date:</div><div	style='width: 43%; padding-right: 7%; color: #002c67; float: left;'	id='bid'>"
					+ pinfo.objTreat.treStart
					+ "</div></div></div></div></div>");

		 
		 

			var inputs = [];
			inputs.push('action=printPreviousDoctorRound');
			inputs.push('tid=' + pobj1.trid);


			var str = inputs.join('&');

			jQuery.ajax( {
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

				DRRPrintBean = eval('(' + ajaxResponse + ')');
				if(DRRPrintBean.drrl.length==0)
				{
					alert("Report Not Prepared...");
					return false;
				}

					var count = 1;
				 for(var i=0; i< DRRPrintBean.drrl.length; i++)
				 {
					 
				 WindowObject.document
					.writeln('<div style="width: 98%; padding-top: 12.5%;"><div style="width: 18%; float: left; font-weight: bold;  ">Date/Time </div><div style="width: 28%; float: left; font-weight: bold;  ">'+ DRRPrintBean.drrl[i].dt +' / '+ DRRPrintBean.drrl[i].tm +' </div><div style="width: 18%; float: left; font-weight: bold;  ">Round By:</div><div style="width: 28%; float: left; font-weight: bold;  ">'+ DRRPrintBean.drrl[i].rb +'</div></div>');
				 
				 WindowObject.document
					.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">#</div><div	style="width: 28%; border: 1px solid #069; text-align: center; float: left;">Clinical Note</div><div	style="width: 25%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Treatment</div>	<div	style="width: 25%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Investigation Advice</div></div></div>');				 

// var j = i;
// var flage = 0;
// while(DRRPrintBean.drrl.dt[j] == DRRPrintBean.drrl.dt[++j])
// {
// ++flage;
//				 
// }
			 
// if(flage > 0)
// {
// for(var k=0; k<=flage; k++)
// {
// WindowObject.document
// .writeln('<div style="width: 98%; float: left; "><div style="width: 100%;
// float: left;"> <div style="width: 4%; border: 1px solid #069; text-align:
// center; float: left;">'+ count++ +'</div><div style="width: 28%; border: 1px
// solid #069; text-align: center; float: left;">'+ DRRPrintBean.drrl[i].cn
// +'</div><div style="width: 25%; border: 1px solid #069; padding-left: 1%;
// float: left; padding-right: 1%; text-align: center;">'+
// DRRPrintBean.drrl[i].tr +'</div> <div style="width: 25%; border: 1px solid
// #069; padding-left: 1%; float: left; text-align: center;">'+
// DRRPrintBean.drrl[i].ia +'</div></div></div>');
// }
// }
//
// else{
				 WindowObject.document
					.writeln('<div style="width: 98%;  float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'+ count++ +'</div><div	style="width: 28%; border: 1px solid #069; text-align: center; float: left;">'+  DRRPrintBean.drrl[i].cn  +'</div><div	style="width: 25%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'+  DRRPrintBean.drrl[i].tr  +'</div>	<div	style="width: 25%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'+  DRRPrintBean.drrl[i].ia  +'</div></div></div>');
				 
// }
				 
				 }
				 WindowObject.document.writeln('</body></html>');
				 WindowObject.document.close();

					WindowObject.focus();

					WindowObject.print();

					WindowObject.close();

				}
			});

}

function saveDoctorRound() {

	var allVals = [];
	var flag = false;
	$.each($('#checkbox'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("No Data in Doctor Round...");
		return false;
	}

	var Response1 = $("#DRR").html();
	ajaxRes = eval('(' + Response1 + ')');
	var z = 0;

	for ( var m = 1; m <= ajaxRes.drrl.length; m++) {
		// alert(allVals[z]);
		if ($("#t" + m + "").val() == undefined) {
			ajaxRes.drrl[z].ti = 0;
		} else {
			ajaxRes.drrl[z].tm = $("#t" + m + "").val();
			ajaxRes.drrl[z].tn = $("#tn" + m + "").val();
			ajaxRes.drrl[z].cn = $("#cf" + m + "").val();
			ajaxRes.drrl[z].tr = $("#tr" + m + "").val();
			ajaxRes.drrl[z].rb = $("#rb" + m + "").val();
			ajaxRes.drrl[z].ia = $("#ia" + m + "").val();
		}
		z++;
	}

	// if($("#t1").val()==""){
	// alert("You can not save empty fields...");
	// parsebcObj = "null";
	// }else{

	parsebcObj = JSON.stringify(ajaxRes);
	// }

	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();
	//alert(addrowCount);
	var count = rowCount - addrowCount;
	var ReadStvalue = rowCount - addrowCount;
	if (rowCount == 0) {
		alert("Please add row to save...");
		return false;
	} else {
		var i;
		var DocRoundString = "";
		for (i = 1; i <= addrowCount; i++) {
			count++;
			if(document.getElementById("div"+count)!=null)
			{
				var tm = $("#t" + count + "").val();
				var tn = $("#tn" + count + "").val();
				var cn = $("#cf" + count + "").val();
				var ia = $("#ia" + count + "").val();
				var rb = $("#rb" + count + "").val();
				var di = $("#DrrId" + count + "").val();
				var tr = $("#tr" + count + "").val();
				var blid = $("#blid" + count + "").val();


				if (tm == "" && cn == "" && tr == "" && ia == "") {
					alert("You can not save empty fields....");
					return false;
				} else if (tm == undefined || tm == "") {
					alert("Please select Time for Doctor Round");
					return false;
				} else if (rb == undefined || rb == 0) {
					alert("Please select Doctor Name For Round");
					return false;
				}else if (ia == "" && cn == "") {
					ia = " ";
					cn = " ";
					/*DocRoundString = DocRoundString + "@" + tm + "," + cn + ","
					+ tr + "," + rb + "," + di + "," + ia + ","+ tn;*/
					
					DocRoundString = DocRoundString + "@" + tm + "~" + cn + "~"
					+ tr + "~" + rb + "~" + di + "~" + ia + "~"+ tn+"~"+blid;
				} else if (ia == "") {
					ia = " ";
					/*DocRoundString = DocRoundString + "@" + tm + ","+ cn + ","
					+ tr + "," + rb + "," + di + "," + ia + ","+ tn;*/
					
					DocRoundString = DocRoundString + "@" + tm + "~"+ cn + "~"
					+ tr + "~" + rb + "~" + di + "~" + ia + "~"+ tn +"~"+blid  ;
				} else if (cn == "") {
					cn = " ";
					/*DocRoundString = DocRoundString + "@" + tm + "," + cn + ","
					+ tr + "," + rb + "," + di + "," + ia + ","+ tn;*/
					
					DocRoundString = DocRoundString + "@" + tm + "~" + cn + "~"
					+ tr + "~" + rb + "~" + di + "~" + ia + "~"+ tn+"~"+blid;
				} else {
					/*DocRoundString = DocRoundString + "@" + tm + ","+ cn + ","
							+ tr + "," + rb + "," + di + "," + ia + ","+ tn;*/
					
					DocRoundString = DocRoundString + "@" + tm + "~"+ cn + "~"
					+ tr + "~" + rb + "~" + di + "~" + ia + "~"+ tn+"~"+blid;
				}
			}
			
			// alert(DocRoundString);
		}
	}

	if (parsebcObj != "null") {

		var date = $("#date-pick").val(); // to change the date format
		
	//paras changes save doctor round	
		
		/*pobj = $("#divPatId").html();
		pobj1 = eval('(' + pobj + ')');*/
		
		var tID = $("#tr_Id").val();// added by paras 
		
		var userType = $("#userType").val();
		var treatmentbedid = $("#treatmentbedid").html();

		if (treatmentbedid || "null" || treatmentbedid == "" || treatmentbedid
				|| "undefined") {
			//treatmentbedid = (pobj1.otrBed.id);
			treatmentbedid=1;
		}
		// return false;
   //end
		var inputs = [];
		inputs.push('action=saveDoctorRound');
		/*inputs.push('tid=' + pobj1.trid);*/
		inputs.push('tid=' + tID);
		inputs.push('drs=' + encodeURIComponent (DocRoundString));
		inputs.push('drrobj=' + encodeURIComponent(parsebcObj));
		inputs.push('date=' + date);
		inputs.push('treatmentbedid=' + treatmentbedid);

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				setDoctorPreRound();
				// location.reload();
			}
		});
	}
}
// *****Function to load chart******//

function setChart() {
	var inputs = [];
	inputs.push('action=chart');
	inputs.push('data=chart');

	var str = inputs.join('&');
	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {

		chartBean = eval('(' + ajaxResponse + ')');
		$("#chart").setTemplate(dispChart);
		$("#chart").processTemplate(chartBean);
	}
	});
}

function SaveChart() {

	var userTp = $("#userRole1").val();
	var Response1 = $("#DIC").html();

	var ajaxRes = eval('(' + Response1 + ')');
	// if (userTp == "admin") {

		var z = 0;

		for (var m = 1; m <= ajaxRes.crl.length; m++) {
		
			var out=$("#o" + m + "").val();
			if(out == undefined){
				out = 0;
			}

			if ($("#t" + m + "").val() == undefined) {
				ajaxRes.crl[z].ti = 0;
			} else {
				ajaxRes.crl[z].tm = $("#t" + m + "").val();
				ajaxRes.crl[z].im = $("#i" + m + "").val();
				ajaxRes.crl[z].ot = out;
				ajaxRes.crl[z].pm = $("#p" + m + "").val();
			 
			}
			z++;

		}
		parsebcObj = JSON.stringify(ajaxRes);

	// } else {
	// parsebcObj = "null";

	// }
	var rowCount = $("#RowCount").val();
	if (rowCount == 0) {
		return false;
	} else {
		var chartValue = $("#chart").val();
		var UserId = $("#txtUserId").val();
		var datePick = $("#date-pick").val();
		var tid = $("#trid").html();
		var pt_Id = $("#pt_Id").val();
		var bill_Id = $("#bill_Id").val();
		var drid = $("#drid").val();
		 if(drid==null || drid=="" ){
			 drid=0;
		 }
 		var deptid = $("#deptid").val();
 		if(deptid==null || deptid=="" ){
			deptid=0;
		 }
		if(bill_Id==null || bill_Id=="" ){
			bill_Id=0;
		 }
 		var addrowCount = $("#addRowCount").val();
		var count = rowCount - addrowCount;
		var ReadStvalue;
	 if(ajaxRes.crl.length==1 && count==0){
		ReadStvalue = 0;
	 }else{

			ReadStvalue = addrowCount;
	 }
		var i;
		var ChartString = "";
		for (i = 1; i <= ReadStvalue; i++) {
			count++;
			var t = $("#t" + count + "").val();
			if(t==undefined)
			{
			}else{
				var input = $("#i" + count + "").val();
			var ot = $.trim($("#o" + count + "").val());

			var pm = $("#p" + count + "").val();
			if (t == "" && input == "" && 	ot == "" && pm == "") {
				alert("You can not save empty fields.");
				// SetFocus("txtOname");
				return false;

			} else if (input == "" && ot == "" && pm=="") {
				alert("You can not save empty fields.");
				return false;
			}else if (t=="") {
				alert("You can not save empty fields.");
				// SetFocus("t" + i);
				return false;
			} else {

				ChartString = ChartString + "@" + t + " , " + input + " , "
						+ ot + " , " + pm + " , ";
			}

			// alert(ChartString);
			// rowCount++;
			}
		}

		var inputs = [];
		inputs.push('data=save');
		inputs.push('tid=' + tid);
		inputs.push('deptid=' + deptid);
		inputs.push('drid=' + drid);
		inputs.push('pt_Id=' + pt_Id);
		inputs.push('bill_Id=' + bill_Id);
		inputs.push('cid=' + chartValue);
		inputs.push('sign=' + UserId);
		inputs.push('ChartString=' + ChartString);
		inputs.push('datePick=' + datePick);
		inputs.push('chartobj=' + parsebcObj);
		inputs.push('action=chart');
		var str = inputs.join('&');
		jQuery.ajax( {
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

				alert(ajaxResponse);
				location.reload(true);
				// setIPD_DIC();

		}
		});
	}
}
var i = 1;
function CreateDiv() {
	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;
	var userNm = $("#txtUserName").val();
	var UserId = $("#txtUserId").val();
	var t = $("#t" + rowCount + "").val();
	var input = $("#i" + rowCount + "").val();
	var ot = $("#o" + rowCount + "").val();
	if (t == "" && input == "" && ot == "") {
		alert("Please fill the previous added row.");
		return false;
	}
	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;
	// alert(DRRDiv);
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');
	document.getElementById("DRRDiv").appendChild(x);
	document.getElementById(divId).innerHTML = '<div style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 5.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (sr++)
			+ '</div><div	style="width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text" class="demo"	onmouseover="click1(this)" name="textfield"  id="t'
			+ rowCount
			+ '"	value=""  /></div><div	style="width: 22%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text"	id="i'
			+ rowCount
			+ '" value=""/></div><div	style="width: 41.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text"	id="o'
			+ rowCount
			+ '" value="" /></div><div style="width: 8%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;" id="s'
			+ rowCount + '">' + userNm + '</div><div style="height: 25px; padding-left: 1%; padding-top: 3px;"><input type="checkbox"   name="checkbox'
			+ rowCount
			+ '"  /></div></div>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

}
// ****Add Save Button*****
function AddSave() {
	$("#save").setTemplate(saveChart);
	$("#save").processTemplate();
}
// ****Add division on DIC After selecting chart********
function AddDiv() {
	var a = "";
	$("#addDiv").setTemplate(createDiv);
	$("#addDiv").processTemplate(a);
}

// Function to set patient discharge summary on discharge page
/*
 * function setDischargeSummary() { // chartBean = eval('(' + ajaxResponse +
 * ')'); $("#IPD_DICContent").setTemplate(preChartTemp);
 * $("#IPD_DICContent").processTemplate(); }
 */

 function featchPreviousDischargeSummary(type){

	count = 0;

	var strValue = $.trim($("#byName").val());
	if (strValue == "" && type == "search") {
		alert("Please Insert Something For Search.");
		return false;
	}
	var inputs = [];
	inputs.push('action=featchPreviousDischargeSummary');
	inputs.push('strValue=' + strValue);
	inputs.push('type=' + type);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#prevOPDBillObj").html(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');
			if (patientBean.pl.length == 0) {
				if(type != "onload"){
				alert("Patient details not found.");
				}
			} else {
				$("#container").setTemplate($("#temp").html());
				$("#container").processTemplate(patientBean);

				var rowCount = $("#rowCount").val();

				for ( var i = 1; i <= rowCount; i++) {

					$("#patPreOPDBill" + i).hide();
				}
			}
		}
	});
}

function goToPrevDischargeSummary(treatId, pid) {

	var ajaxResponse = $("#prevOPDBillObj").html();
	var myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.pl.length; i++) {

		if (myArray.pl[i].pi == pid) {

			myObj = myArray.pl[i];
			break;
		}
	}

	var tit = myObj.tit;
	var fn = myObj.fn;
	var mn = myObj.mn;
	var ln = myObj.ln;
	var pname = tit + " " + fn + " " + mn + " " + ln;
	myObj = JSON.stringify(myObj);

	window.location.href = "prevDischargeSummary.jsp?" + "myObj=" + myObj
			+ "&treatId=" + treatId + "&pname=" + pname;
}

var hallBedsTemplate =  "<div id='hallBeds' class='col-sm-12-1' style='margin-top: 0px;'>"
						+"<table class='table table-bordered table-condensed cf'>"
						+"<tbody class='cf'>"
						+"{#foreach $T.bl as bl}"
						+"<tr>"
						+"<td class='col-sm-1-1 center' style='height: 21.5px;'>{count}.</td>"
						+"<td class='col-sm-2-1 center' id='divPi{count}' style='height: 21.5px;'>{$T.bl.bdnm}</td>"
						+"<td class='col-sm-5-1' id='divPi{count}' style='height: 21.5px;'>"
						+"<select id='bedStatelist{count}' class='form-control input-SmallText TextFont'></select>"
						+"</td>"
						+"<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.bl.inDateTime}</td>"
						+"<td class='col-sm-2-1 center form-control input-SmallText TextFont' style='height: 21.5px;'>"
						+"<input type='button' class='btn btn-xs btn-success editUserAccess' id='btnDelete{count}'"
						+"style='font-size: 12px;' value='Save' onClick='ChangeBedState({$T.bl.bi},{count++})' disabled='disabled' /> "
						+"</td>"
						+"</tr>"
						+"{#/for}"
						+"</tbody>"
						+"</table></div>";

function getBed() {

	count = 1;
	var btype= $("#btype").val()
	var inputs = [];
	inputs.push('action=fetchBedHall');
	inputs.push('hallId=' + btype);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			var bedlist = eval('(' + ajaxResponse + ')');
			if (bedlist.bl.length == 0) {
				if($("#btype").val()!="0")
				alert("Their is no bed for cleaning in this hall");
				$("#container").html("");
			} else {
				/* $("#container").setTemplate($("#hallBeds").html()); */
				$("#container").setTemplate(hallBedsTemplate);
				$("#container").processTemplate(bedlist);
				ViewbedState();
				setTimeout(function(){
					for(var i=1;i<count;i++){
					$("#bedStatelist"+i).val(bedlist.bl[i-1].bs);
					 
				}},500);
				setTimeout(function(){userAccess();},100);
			}
		}
	});

};
function  ViewbedState() {
	 
	var inputs = [];
	inputs.push('action=fetchBedState');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
		// $("#BedStateDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			for(var i=1;i<count;i++){

			$("#bedStatelist"+i).setTemplate("{#foreach $T.bsli as bsli}<option value='{$T.bsli.bsid}'>{$T.bsli.bs}</option>{#/for}");
			$("#bedStatelist"+i).processTemplate(pobj1);
			}
		}
	});
}

function setDischargeSummary() {
	var patID = $("#patID").val();
var treatID = $("#treatId").val();

var inputs = [];
inputs.push('action=getDischargeSummary');
inputs.push('patID=' + patID);
inputs.push('treatID=' + treatID);

var str = inputs.join('&');

jQuery.ajax( {
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
		// alert(ajaxResponse)
		pobj = eval('(' + ajaxResponse + ')');

			setInvestTest(pobj);

			setDrugsContent(pobj);
			setHospitalDetailsForPatient(pobj.pl[0].hospDetails);
		var patNM =pobj.pl[0].tit +" " + pobj.pl[0].fn + " " +  pobj.pl[0].mn+" "+ pobj.pl[0].ln ; 
		$("#rightContent").setTemplate($("#rightContent").html());
		$("#rightContent").processTemplate(pobj);
		 
		$("#patName").val(patNM);
		$("#regNo").val(pobj.pl[0].pi);
		$("#age").val(pobj.pl[0].ag+" "+pobj.pl[0].agtp);
		$("#sex").val(pobj.pl[0].sx);

		$("#consultName").val(pobj.pl[0].rn);  
	// alert(pobj.pl[0].liMLC);
		if(undefined != pobj.pl[0].liMLC ){

			$("#mlcNo").val(pobj.pl[0].liMLC[0].mlcid);
		$("#policStaName").val(pobj.pl[0].liMLC[0].Pnm);
		$("#constName").val(pobj.pl[0].liMLC[0].Anm);
		$("#buccleNo").val(pobj.pl[0].liMLC[0].Bno);
		$("#addPh").val(pobj.pl[0].liMLC[0].padd);
		}else
			{
					$("#divMlc").hide();

			}

		if(undefined != pobj.pl[0].listTop ){
			var operationNote="";
			for(var i=0;i<pobj.pl[0].listTop.length;i++){
				operationNote=operationNote+(i+1)+"-"+pobj.pl[0].listTop[i].fnd+"\n";
			}
			$("#oprNote").val(operationNote);
			}
		$("#adNote").val(pobj.pl[0].objTreat.sy);
		$("#admitDate").val(pobj.pl[0].objTreat.treStart);
		$("#dischargeDate").val(pobj.pl[0].objTreat.treEnd+" "+pobj.pl[0].objTreat.out);
	// $("#refBy").val(pobj.pl[0].objTreat.rb);
		$("#inchargeDr").val(pobj.pl[0].admit);
		 if(pobj.pl[0].ods==""){
			 var date=new Date();
		 $("#dischargeDate").val( date.getDate() + "-" + (date.getMonth()+1)+ "-" + date.getFullYear()+" "+date.getHours()+":"+date.getMinutes() +":"+date.getSeconds());
		 }else{
		  $("#digno").val(pobj.pl[0].ods[0].dia);
		  $("#preSymp").val(pobj.pl[0].ods[0].psym);
		  $("#cliFind").val(pobj.pl[0].ods[0].clf);
		  $("#specInvest").val(pobj.pl[0].ods[0].sinv);  
		  $("#treatGive").val(pobj.pl[0].ods[0].tg);
		  $("#riskFact").val(pobj.pl[0].ods[0].rsk);
		  $("#complication").val(pobj.pl[0].ods[0].cmp);  
		  $("#invest").val(pobj.pl[0].ods[0].investigation);
		  $("#condDisc").val(pobj.pl[0].ods[0].tad);
			   
			 // $("#treAdvDisc").val(pobj.pl[0].ods[0].ta);
			 $("#disSummID").val(pobj.pl[0].ods[0].id);
			 
			 $("#treatmentGiven").val(pobj.pl[0].ods[0].trgiven);
			 var testNote =pobj.pl[0].ods[0].investigation;
				var note = testNote.split("@");
				for ( var j = 1; j < note.length; j++) {
					$("#testNote"+j).val(note[j]);
				}
			 var prescription = pobj.pl[0].ods[0].ta;
				var prescr = prescription.split("@");
				for ( var i = 1; i < prescr.length; i++) {
					if (i != (prescr.length) && i != 1) {
						createDivPriscription();
					}
					var med = prescr[i].split("-");

					$("#Medicine" + i).val(med[0]);
					if (med[1] == 1) {
						$('input[id=M' + i + ']').attr('checked', true);
					}
					if (med[2] == 1) {
						$('input[id=A' + i + ']').attr('checked', true);
					}
					if (med[3] == 1) {
						$('input[id=E' + i + ']').attr('checked', true);
					}
					if (med[4] == 1) {
						$('input[id=N' + i + ']').attr('checked', true);
					}

					$("#Instruction" + i).val(med[5]);
					$("#Days" + i).val(med[6]);
					$("#Qty" + i).val(med[7]);
				}
		 }	 
	}
});
}

function setDischargeSummary1() {

	var divPatId = $("#divPatId").html();

	var treatId = $("#treatId").val();

	pobj = eval('(' + divPatId + ')');

	var patNM = pobj.tit + " " + pobj.fn + " " + pobj.mn + " " + pobj.ln;

	$("#patName").val(patNM);
	$("#regNo").val(pobj.pi);
	$("#age").val(pobj.ag + " " + pobj.agtp);
	$("#sex").val(pobj.sx);

	for ( var i = 0; i < pobj.lit.length; i++) {

		if (pobj.lit[i].ti == treatId) {

			$("#admitDate").val(pobj.lit[i].treStart);
			$("#dischargeDate").val(pobj.lit[i].treEnd + " " + pobj.lit[i].out);

			if (pobj.lit[i].rb == undefined || pobj.lit[i].rb == "") {

				$("#refBy").val("Self");
			} else {
				$("#refBy").val(pobj.lit[i].rb);
			}

			  $("#inchargeDr").val(pobj.lit[i].ods[0].inrdr);

			$("#digno").val(pobj.lit[i].ods[0].dia);
			$("#preSymp").val(pobj.lit[i].ods[0].psym);
			$("#cliFind").val(pobj.lit[i].ods[0].clf);
			$("#specInvest").val(pobj.lit[i].ods[0].sinv);
			$("#treatGive").val(pobj.lit[i].ods[0].tg);

			$("#riskFact").val(pobj.lit[i].ods[0].rsk);
			$("#complication").val(pobj.lit[i].ods[0].cmp);
			$("#invest").val();
			$("#condDisc").val(pobj.lit[i].ods[0].tad);

			$("#treAdvDisc").val(pobj.lit[i].ods[0].ta);
			$("#disSummID").val(pobj.lit[i].ods[0].id);
			 
				$("#testContent").setTemplate("<table border='1' cellpadding='0' cellspacing='0' width='100%'  style='border-color: lightgray;'><tr height='25'><td align='center'>#</td><td align='center'>Test Name</td><td align='center'>Test Date</td><td align='center'>Test Result</td><td align='center'>Test Count</td></tr>{#foreach $T.liT as test} <tr height='20'><td align='center'>{sr++}</td><td style='padding-left: 10px;'>{$T.test.tname}</td><td style='padding-left: 10px;'>{$T.trt[q].time}</td><td style='padding-left: 10px;'>{$T.trt[q].test_report}</td><td style='padding-left: 10px;'>{$T.trt[q++].test_count}</td></tr>{#/for}</table>");
				$("#testContent").processTemplate(pobj.lit[i].ods[0]);
		}
	}
	// setInvestTest(pobj);
}
function ChangeBedState(bedid,count) {
	 
	var inputs = [];
	inputs.push('action=ChangeBedState');
	inputs.push('bedid=' +bedid );
	inputs.push('bedstateid=' +$("#bedStatelist"+count).val());
	var str = inputs.join('&');
	jQuery.ajax({
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
			 			 alert(ajaxResponse);
			 		}
	});
}

function createDivIPDHistory(callfrom){
	
		var rowCount = $("#HisRowCount").val(); 
		
		if (rowCount == -1) {
			rowCount = 0;
		}
		
		
		rowCount++;
		divId = "divH" + rowCount;
		
		var x = document.createElement('tr');
		x.setAttribute('id', divId);
		document.getElementById("historyDiv").appendChild(x);
		
		document.getElementById(divId).innerHTML = '<td  style="height: 21.5px;  width: 8.37%; text-align: center;"><label>'
			+ rowCount
			+ '</label></td><td style="width: 33.96%; height: 21.5px; "><textarea rows="1" cols="38" class="" id="chiefComp'
			+ rowCount
			+ '" value="" ></textarea></td>'
			+ '<td style="width: 50.96%; height: 21.5px;'           
			+ rowCount
			+ '"><div class="col-md-12-1" style="margin-top:5%"><div class="col-md-6-1" style="margin-top:-3%"><input type="range"  min="0" max="100" class="defaultSlider" id="defaultSlider_'+rowCount+'" style="font-size: 11px; width:120%;" name="duration' 
			+ rowCount
			+ '" value="" id="duration_'+rowCount+'"'
			+ rowCount
			+ '"/></div>'
			+'<p class="note"><div class="col-md-6-1" id="divipd"><span class="duration_'+rowCount+'""></span>'
			+ '<input type = "text" class="col-sm-2-1" style="margin-left:125%; margin-top:-7.3%; font-weight:bold;" name="qty'
			+ rowCount
			+ '"   id="qty'
			+ rowCount +'" onkeyup="changeSlider('+rowCount+')" />'
			+ '<select class="col-sm-6-1" style="margin-left:150%; margin-top:-9.6%;" id="day_month_year'
			+ rowCount 
			+ '" name="day_month_year">'
			+ '<option value="">-Select-</option>  <option value="Hours">Hours</option>  <option value="Days">Days</option>'
			+ '<option value="Month">Month</option> <option value="Year">Year</option>'
			+ '</td></p></div></div>'
			+ '<input type="checkbox" class="col-sm-1-1" style="margin-left:6%;" name="chiefCompcheckbox'
			+ rowCount
			+ '"   id="chiefCompcheckbox"/>'
			+'<input id="idIPDCompslave'+ rowCount+'" name="idIPDCompslave'+ rowCount+'" type="hidden" value="0"/>'
			+'</td></td>';
		
		$("#HisRowCount").val(rowCount);
		$("#addRowCount").val(i);
		if(callfrom=="IPDH"){
			$("#divipd").css('margin-left','5px');
	
		}
		i++;
}

$(document).on('change','.defaultSlider',function(){
		var id = $(this).attr('id').split("_")[1];
		$('.duration_'+id).html(this.value).hide();
		
		var span_Qty = $('.duration_'+id).text();
		 $("#qty"+ id).val(span_Qty);
		
});
	

function removeChifComp()
{
	
	var allVals = [];
	var flag = false;
	$.each($('#chiefCompcheckbox:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});	
	if(allVals != "on"){	
	 var r = confirm("You Want to Cancel This Chief Compalints");
	 if (r == true) {
		 var rowCount = $("#HisRowCount").val();
	
	 
	 for ( var n = 1; n <= rowCount; n++) {
	 var $radios = $('input:checkbox[id=chiefCompcheckbox' + n + ']');	
	 
	 if ($radios.is(':checked') == true) {
		 
	    idIPDhisCom = $("#idIPDComp" + n).val();
	    allVals.push(idIPDhisCom);
         $("#divH" + n).remove();
         flag = true;
	   }
	  }
	cancelChifComStatus(allVals);
  }
}else{
		var p = 1;
		var hiddenRowCount = $("#HisRowCount").val();
	
		for ( var j = 0; j < (hiddenRowCount); j++) {
			var $radios = $('input:checkbox[name=chiefCompcheckbox' + p + ']');
			if ($radios.is(':checked') == true) {
				$("#divH" + p + "").remove();
			}
			p++;
		}; 
		fetchAddIPDHistory();
		
  }
}

	
	

	
function cancelChifComStatus(allVals)
{
	
	if(allVals.length == 0){
		alert("Please select CheckBox...");
		return false;
	}else{
	var inputs = [];
	inputs.push('action=cancelChifComStatus');
	inputs.push('allVals='+ allVals);

	var str = inputs.join('&');
	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			fetchAddIPDHistory();
			//window.location.reload(true);
	    }
	  });
	}
	
}
var cheifcompcount = 1;
var Count = 1;

var fetchIPDHisComp ='{#foreach $T.listIpdHisMaster[0].listIpdHisCompo as listIpdHisCompo}'+
'<tr id="divH{count}">'+
'<td align="center" style="width: 8.35%; font: bold; height: 21.5px; ">{count}.</td>'+
'<td style="width: 33.96%; height: 21.5px;">'+
'<textarea rows ="1" cols ="38" class="" id="chiefComp{count}" value="{$T.listIpdHisCompo.chfdur}">{$T.listIpdHisCompo.chfdur}</textarea></td>'+
'<td style="width: 50.96%; height: 21.5px;">'+
'<input style="width:60%;" type="range" min="0" max="100" class="defaultSlider" id="defaultSlider_{count}" name="duration{count}" id="duration{count}" value="{$T.listIpdHisCompo.duration}" />'+
'<p class="note"><span class="duration_{count}"></span>'+
'<input type = "text" class="col-sm-1-1" style="margin-left:63%; margin-top:-4.6%; font-weight:bold;" name="qty{count}'+
'"id="qty{count}" value = "{$T.listIpdHisCompo.duration}" onkeyup="changeSlider({count})" />'+
'<select class="col-sm-3-1" style="margin-left:75%; margin-top:-4.6%;" id="day_month_year{count}" name="day_month_year{count}">'+
'<option value="{$T.listIpdHisCompo.days_month_year}">{$T.listIpdHisCompo.days_month_year}</option><option value="Select">-Select-</option><option value="Hours">Hours</option> <option value="Days">Days</option>'+
'<option value="Month">Month</option><option value="Year">Year</option></select>'+
'</p></td>'+
'<td style=" height: 21.5px;">'+
'<input type="checkbox" name="chiefCompcheckbox" id="chiefCompcheckbox{count}"/>'+
'<input id="idIPDComp{count}" name="idIPDComp{count++}" type="hidden" value="{$T.listIpdHisCompo.idAdddHisComp}"/></td>'+
'{#/for}'+
'</tr>'+
'<input type="hidden" value="{count}" id="addRowCount" name="addRowCount"/>';


//var fetchIPDHisComp = '{#foreach $T.listIpdHisMaster[0].listIpdHisCompo as listIpdHisCompo}<div id="div{count}" style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 7.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">{count}</div><div	style="width: 78.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 95%;" type="text"	id="chiefComp{count}" value="{$T.listIpdHisCompo.chfdur}" /></div><div style="height: 25px; padding-left: 1%; padding-top: 3px;"><input type="checkbox"   id="checkbox{count}" name="checkbox"  /></div></div><input id="idIPDComp{count}" name="idIPDComp{count++}" type="hidden" value="{$T.listIpdHisCompo.idAdddHisComp}">{#/for}<input id="addRowCount" name="addRowCount" type="hidden" value="{count}">';

var fetchIPDHisCompForAutoDisSummary ='{#foreach $T.listIpdHisMaster[0].listIpdHisCompo as listIpdHisCompo}'+
'<tr id="divH{count}">'+
'<td align="center" style="width: 8.35%; font: bold; height: 21.5px; ">{count}.</td>'+
'<td style="width: 33.96%; height: 21.5px;">'+
'<textarea rows ="1" cols ="38" class="" id="chiefComp{count}" value="{$T.listIpdHisCompo.chfdur}">{$T.listIpdHisCompo.chfdur}</textarea></td>'+
'<td style="width: 50.96%; height: 21.5px;">'+
'<div class="col-sm-12-1" style= "margin-top:2%;"><input style="width:60%;" type="range" min="0" max="100" class="defaultSlider" id="defaultSlider_{count}" name="duration{count}" id="duration{count}" value="{$T.listIpdHisCompo.duration}" />'+
'<p class="note"><span class="duration_{count}"></span>'+
'<input type = "text" class="col-sm-1-1" style="margin-left:63%; margin-top:-4.6%; font-weight:bold;" name="qty{count}'+
'"id="qty{count}" value = "{$T.listIpdHisCompo.duration}"/>'+
'<select class="col-sm-3-1" style="margin-left:74%; margin-top:-4.6%;" id="day_month_year{count}" name="day_month_year{count}">'+
'<option value="{$T.listIpdHisCompo.days_month_year}">{$T.listIpdHisCompo.days_month_year}</option><option value="Select">-Select-</option><option value="Days">Days</option>'+
'<option value="Month">Month</option><option value="Year">Year</option></select>'+
'</p></td></div>'+
'<input type="hidden" value="{count++}" id="addRowCount" name="addRowCount"/></tr>{#/for}';



function fetchAddIPDHistory(Page_Type){
 //console.clear();
$("#medOffName").val($("#docName").html());
pobj = $("#divPatId").html();
pobj1 = eval('(' + pobj + ')');
count = 1;
//var tretID = pobj1.trid;
//var tretID  =  $("#treatmentId").val();  //added by paras
var tretID  =  $("#tr_Id").val();  //added by paras
var userName = $("#docName").html();
var prevTreatmentId = $("#iSelTreatmentToCopy").val();

var inputs = [];
inputs.push('action=fetchAddIPDHistory');
inputs.push('tretID=' +tretID);
var str = inputs.join('&');
jQuery.ajax({
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

		
		        if(Page_Type !="IPD_DischargeAutoSummary" && Page_Type !="IPD_Previous_AutoSummary"){
		        	
		        	
		        ///	var patID= $("#pid").val();
		        	var patID = $("#pid").val();  //added by paras
		    		ajaxResponse1 = $("#patobject").html();
		    		pobj1 = eval('(' + ajaxResponse1 + ')'); 
		    		myArray = JSON.parse(ajaxResponse1);
		    		
		    		for ( var i = 0; i < myArray.pl.length; i++) {
		    			if (myArray.pl[i].pi == patID) {
		    				myObj = pobj1.pl[i].mrNo;
		    				break;
		    				
		    			}
		    		}
		    		  
		           /*$("#mrn").val(pobj1.pl[i].mrNo);
		           $("#medOffName").val(userName);*/
		           
		 		}
		
		  			 ajaxResponse = r;
		  			 
		  			 $("#historyDetails").html(ajaxResponse);
		 			pobj = eval('(' + ajaxResponse + ')'); 

		 			if(pobj.listIpdHisMaster.length > 0)
		 				{
		 			$("#queryType").val('update');
		 
		 			if(Page_Type !="IPD_DischargeAutoSummary" && Page_Type !="IPD_Previous_AutoSummary"){
		 			    $("#historyDiv").setTemplate(fetchIPDHisComp);
					    $("#historyDiv").processTemplate(pobj);
		 			}else{
		 				$("#historyDiv").setTemplate(fetchIPDHisCompForAutoDisSummary);
					    $("#historyDiv").processTemplate(pobj);
		 			}
					$("#HisRowCount").val(--count);
					 $("#mrn").val(pobj.listIpdHisMaster[0].mrn);
					 $("#medOffName").val(userName);
					 $("#chiefComplaintsTxt").val(pobj.listIpdHisMaster[0].chiefComplaintsTxt);
		 			$("#clinicalFinding").val(pobj.listIpdHisMaster[0].clinicalFinding);
		 			$("#pastSurgHistory").val(pobj.listIpdHisMaster[0].pastSur);
		 			$("#medications").val(pobj.listIpdHisMaster[0].medic);
		 			$("#pastReguler").val(pobj.listIpdHisMaster[0].pastReg);
		 			$("#PresentReguler").val(pobj.listIpdHisMaster[0].preReg);
		 			$("#gynac").val(pobj.listIpdHisMaster[0].gynac);
		 			$("#drugReaction").val(pobj.listIpdHisMaster[0].DrgRea);
		 			$("#familyHis").val(pobj.listIpdHisMaster[0].famHis);
		 			$("#perHistory").val(pobj.listIpdHisMaster[0].perHis);
		 			$("#habbits").val(pobj.listIpdHisMaster[0].hab);
		 			$("#bowel").val(pobj.listIpdHisMaster[0].bowel);
		 			$("#blader").val(pobj.listIpdHisMaster[0].blader);
		 			$("#temparature").val(pobj.listIpdHisMaster[0].temp);
		 			$("#pallor").val(pobj.listIpdHisMaster[0].pallor);
		 			$("#lcterus").val(pobj.listIpdHisMaster[0].lcterus);
		 			$("#pulse").val(pobj.listIpdHisMaster[0].pulse);
		 			$("#clubbing").val(pobj.listIpdHisMaster[0].clubbing);
		 			$("#oedema").val(pobj.listIpdHisMaster[0].oedema);
		 			$("#bp").val(pobj.listIpdHisMaster[0].bp);
		 			$("#lymph").val(pobj.listIpdHisMaster[0].lymph);
		 			$("#rs").val(pobj.listIpdHisMaster[0].rs);
		 			$("#cns").val(pobj.listIpdHisMaster[0].cns);
		 			$("#cvs").val(pobj.listIpdHisMaster[0].cvs);
		 			$("#pa").val(pobj.listIpdHisMaster[0].pa);
		 			$("#localExm").val(pobj.listIpdHisMaster[0].locE);
		 			$("#invsRep").val(pobj.listIpdHisMaster[0].invtg);
		 			$("#provDia").val(pobj.listIpdHisMaster[0].prov);
		 			$("#treatPlan").val(pobj.listIpdHisMaster[0].tt);
		 
		 			var htn = (pobj.listIpdHisMaster[0].htn).split("-");
		 			(htn[0] > 0) ? $("#chkHtn").attr('checked', true) :  $("#chkHtn").attr('checked', false);
		 			$("#txtHtn").val(htn[1]);
		 
		 			var dm = (pobj.listIpdHisMaster[0].dm).split("-");
		 			(dm[0] > 0) ? $("#chkDm").attr('checked', true) :  $("#chkDm").attr('checked', false);
		 			$("#txtDm").val(dm[1]);
		 
		 			var ihd = (pobj.listIpdHisMaster[0].ihd).split("-");
		 			(ihd[0] > 0) ? $("#chkIhd").attr('checked', true) :  $("#chkIhd").attr('checked', false);
		 			$("#txtIhd").val(ihd[1]);
		 
		 			var bacopd = (pobj.listIpdHisMaster[0].bacopd).split("-");
		 			(bacopd[0] > 0) ? $("#chkBaco").attr('checked', true) :  $("#chkBaco").attr('checked', false);
		 			$("#txtBaco").val(bacopd[1]);
		 
		 			var otr = (pobj.listIpdHisMaster[0].otr).split("-");
		 			(otr[0] > 0) ? $("#chkOther").attr('checked', true) :  $("#chkOther").attr('checked', false);
		 			$("#txtOther").val(otr[1]);
		 
		 			}else{
		 					$("#queryType").val('insert');
		 				}
		 		}
});}
function saveAddIpdHistory()
{ 
	var r;
	r = confirm("Do you want to save...?");
	if (r == true) {
	var listIpdHisCompObj = {
			listIpdHisCompo : []
		};

	var userName = $("#docName").html();
	
	pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	  count = 1;
//	var tretID = pobj1.trid;
	var tretID = $("#tid").val(); //added by paras 
	var count = 0;
	var rowCount = $("#HisRowCount").val();
	for ( var i = 1; i <= rowCount; i++) {
		count++;
		var chkval = $('#checkbox' + i).attr('checked') ? 1 : 0;

			var chfdur = $("#chiefComp" + count + "").val();
			if (chfdur == "") {
				alert("Chief Complaints must be filled out");
				return false;
			}
			
			var idAdddHisComp = $("#idIPDComp" + count + "").val();
			var DurationValue = $("#qty"+ count + "").val();
			
			if (DurationValue == "") {
				alert("Please select Duration Quantity..");
				return false;
			}
			var day_month_year = $("#day_month_year" + count + "").val();
			
			if (day_month_year == "") {
				alert("Please select Duration..");
				return false;
			}
			
			if(day_month_year == "Hours"){
				if(DurationValue > 24){
					alert("Please select Hours Less than 24..");
					return false;
				}
			}
			
					
		if (chfdur != undefined) {
			listIpdHisCompObj.listIpdHisCompo.push({

				"chfdur" : chfdur,
				"idAdddHisComp" : idAdddHisComp,
				"duration" :DurationValue,
				"days_month_year" :day_month_year
			});
		}
	}

	
	listIpdHisCompObj = JSON.stringify(listIpdHisCompObj);
	var inputs = [];
	inputs.push('action=saveAddIpdHistory');
	inputs.push('queryType=' +$("#queryType").val());
	inputs.push('listIpdHisCompObj=' + listIpdHisCompObj);
	inputs.push('tretID=' + tretID);
	inputs.push('mrn=' +$("#mrn").val());
	inputs.push('pastSurgHistory=' +$("#pastSurgHistory").val());
	inputs.push('medications=' +$("#medications").val());
	inputs.push('pastReguler=' +$("#pastReguler").val());
	inputs.push('PresentReguler=' +$("#PresentReguler").val());
	inputs.push('gynac=' +$("#gynac").val());
	inputs.push('drugReaction=' +$("#drugReaction").val());
	inputs.push('familyHis=' +$("#familyHis").val());
	inputs.push('perHistory=' +$("#perHistory").val());
	inputs.push('habbits=' +$("#habbits").val());
	inputs.push('bowel=' +$("#bowel").val());
	inputs.push('blader=' +$("#blader").val());
	inputs.push('temparature=' +$("#temparature").val());
	inputs.push('pallor=' +$("#pallor").val());
	inputs.push('lcterus=' +$("#lcterus").val());
	inputs.push('pulse=' +$("#pulse").val());
	inputs.push('clubbing=' +$("#clubbing").val());
	inputs.push('oedema=' +$("#oedema").val());
	inputs.push('bp=' +$("#bp").val());
	inputs.push('lymph=' +$("#lymph").val());
	inputs.push('rs=' +$("#rs").val());
	inputs.push('cns=' +$("#cns").val());
	inputs.push('cvs=' +$("#cvs").val());
	inputs.push('pa=' +$("#pa").val());
	inputs.push('localExm=' +$("#localExm").val());
	inputs.push('invsRep=' +$("#invsRep").val());
	inputs.push('provDia=' +$("#provDia").val());
	inputs.push('treatPlan=' +$("#treatPlan").val());
	inputs.push('chiefComplaintsTxt=' +$("#chiefComplaintsTxt").val());
	inputs.push('clinicalFinding=' +$("#clinicalFinding").val());
	inputs.push('name=' +$("#name").val());

	
	var dm = $("#chkDm").is(":checked") ? 1:0;
	dm = dm + "-"+ $("#txtDm").val();
	var htn = $("#chkHtn").is(":checked") ? 1:0 ;
	htn =  htn +"-"+ $("#txtHtn").val();
	
	var ihd = $("#chkIhd").is(":checked") ? 1:0 ;
	ihd = ihd +"-"+ $("#txtIhd").val();
	var baco = $("#chkBaco").is(":checked") ? 1:0 ;
	baco = baco +"-"+ $("#txtBaco").val();
	var othr = $("#chkOther").is(":checked") ? 1:0;
	othr = othr +"-"+ $("#txtOther").val();

	inputs.push('dm=' + dm);
	inputs.push('htn=' +htn);
	inputs.push('ihd=' +ihd);
	inputs.push('baco=' + baco);
	inputs.push('other=' + othr);


	var str = inputs.join('&');
	
	
	jQuery.ajax({
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
			var deptId=$("#depdocdeskid").val();
			if(ajaxResponse=="save"){
				if(deptId==1){
					alert("OPD Admission History is Saved");
				}else{
					alert("IPD Admission History is Saved");
				}
			}else if(ajaxResponse=="update"){
				if(deptId==1){
					alert("OPD Admission History is Update");
				}else{
					alert("IPD Admission History is Update");
				}
			}
			 			$("#queryType").val('update');
			 			fetchAddIPDHistory();
			 			//location.reload(true);
			 		}
		
	});
}
	else
		{
		return false;
		}
}

function printIPDHistory(divName)
{

	var originalContents = document.body.innerHTML;
	var WindowObject = window.open('', ' ', '');

	WindowObject.document.writeln('<div id="commonPatInfo" style="width: 100%; float:left; font-family: cablibri;padding-top: 20%">');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%; float:left;"> <div style="width: 50%;"><div style="width: 25%; padding-top: 1%; float:left;font-weight: bold;">PRN:</div><div style="width: 74%; float:left;">'+ $("#prn").val()  +' </div></div><div style="width: 50%; float:left;"><div style="width: 45%; float:left;font-weight: bold;">OPD IPD Reg No :</div><div style="width: 43%; float:left;">'+ $("#ipdOPdNo").val()  +'</div></div> </div>');


	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;float:left;"><div style="width: 50%;float:left;"><div style="width: 33%; float:left;font-weight: bold;">Patient Name :</div>'+  $("#initial").val()  +'&nbsp '+ $("#pName").val()  +'</div><div style="width: 20%;float:left;"><div style="width: 20%; float:left;font-weight: bold;">Age: </div><div style="width: 15%; float:left;padding-left: 5%;">'+ $("#age").val()  +'</div></div><div style="width: 20%;float:left;"><div style="width: 20%; float:left;font-weight: bold;">Gender: </div><div style="width: 25%; float:left;padding-left: 25%;">'+ $("#sex").val()  +'</div></div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%; float:left;"><div style="width: 24%;   float:left;font-weight: bold;">Patient Address :</div><div style="width: 50%; float:left;">'+ $("#address").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%; float:left;"><div style="width: 18%;   float:left;font-weight: bold;">Contact No:</div><div style="width: 30%; float:left;">'+ $("#contact").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;float:left;"><div style="width: 50%; float:left;"><div style="width: 25%;  float:left;font-weight: bold;">ID Proof:</div><div style="width: 56%; float:left;">'+ $("#idProof").val()  +'</div></div><div style="width: 50%;float:left;"><div style="width: 35%;   padding-top: 1%; float:left;font-weight: bold;">Date Of Birth :</div><div style="width: 65%; float:left;padding-top: 1%;">'+ $("#dob").val()  +'</div></div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;float:left;"><div style="width: 50%; float:left;"><div style="width: 25%; padding-top: 1%;float:left;font-weight: bold;">ID No:</div><div style="width: 40%; float:left;">'+ $("#idno").val()  +'</div></div><div style="width: 50%;float:left;"><div style="width: 50%; padding-top: 1%;float:left;font-weight: bold;">Consultant In Charge:</div>	<div style="width: 50%; float:left;padding-top: 1%;">'+ $("#txtDocName").html()  +'</div></div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 4%;font-weight: bold;float:left;">Chief Complaints And Durration</div>');

	var rowCount = $("#RowCount").val();
	var z=1;
	for(var i=1; i<=rowCount; i++){
		if($("#chiefComp"+i).val()!=undefined)
	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;"><div style="width: 8%; float:left;">'+ (z++) +')</div><div id ="abc" style="width: 92%; float:left;">'+ $("#chiefComp" + i).val()  +'</div></div>');
	}


	WindowObject.document.writeln('<div style="width: 100%; padding-top: 5%;float:left;"><div style="width: 50%;float:left;"><div style="width: 45%;  font: bold; font-size: medium; padding-bottom: 1%;float:left; padding-left:10%;font-weight: bold;">Past Medical History</div></div><div style="width: 45%; font: bold; font-size: medium; padding-bottom: 1%; float:left;font-weight: bold;">Past Surgical History&nbsp;&nbsp;&nbsp;</div></div>');

	WindowObject.document.writeln('<div style="width: 45%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float:left;" id="tableContent"><table cellspacing="0" cellpadding="0" style="border: 1px solid;"><tbody><tr><td align="center" style="border: 1px solid;"></td><td align="center" style="border: 1px solid;font-weight: bold;">Yes/ No</td><td align="center" style="border: 1px solid;font-weight: bold;">Duration</td></tr><tr><td width="15%" align="center" style="border: 1px solid;font-weight: bold;">DM</td><td style="border: 0.2px solid;" align="center">');

	var dm = $("#chkDm").is(":checked") ? 1:0;

	if(dm > 0) {
		WindowObject.document.writeln('<img src="images/Accept.png" id="chkDmP" width="10%" height="10%" name="chkDmP"/>');
	// $("#chkDmP").attr("src", "images/Accept.png");
	}else{
		WindowObject.document.writeln('<img src="" id="chkDmP" width="10%" height="10%" name="chkDmP"/>');

	}

	WindowObject.document.writeln('</td><td style="border: 0.2px solid; "><div style="width: 41.5%; float:left;">'+ $("#txtDm").val()  +'</div></td></tr><tr>	<td width="15%" align="center" style="border: 1px solid;font-weight: bold;">HTN</td><td style="border: 0.2px solid;" align="center">');
	var htn = $("#chkHtn").is(":checked") ? 1:0;

	if(htn > 0) {
		WindowObject.document.writeln('<img  src="images/Accept.png" id="chkHtnP" height="10" width="10"  name="chkHtnP"/>');
	}else{
		WindowObject.document.writeln('<img  src="" id="chkHtnP" height="10" width="10"  name="chkHtnP"/>');
	}

	WindowObject.document.writeln('</td><td style="border: 0.2px solid; ">' + $("#txtHtn").val() + '</td></tr><tr><td width="15%" align="center" style="border: 1px solid;font-weight: bold;">IHD</td><td style="border: 0.2px solid;" align="center">');
	var htd = $("#chkIhd").is(":checked") ? 1:0;

	if(htd > 0) {
	WindowObject.document.writeln('<img  src="images/Accept.png" id="chkHtnP" height="10" width="10"  name="chkHtnP"/>');
	}else{
		WindowObject.document.writeln('<img  src="" id="chkHtnP" height="10" width="10"  name="chkHtnP"/>');
	}
	WindowObject.document.writeln('</td><td  style="border: 0.2px solid; "><div style="width: 41.5%; float:left;">'+ $("#txtIhd").val()  +'</div></td></tr><tr><td width="15%" align="center" style="border: 1px solid;font-weight: bold;">BA/COPD</td><td style="border: 0.2px solid;" align="center">');

	var htba = $("#chkBaco").is(":checked") ? 1:0;

	if(htba > 0) {
	WindowObject.document.writeln('<img  src="images/Accept.png" id="chkHtnP" height="10" width="10"  name="chkHtnP"/>');
	}else{
		WindowObject.document.writeln('<img  src="" id="chkHtnP" height="10" width="10"  name="chkHtnP"/>');
	} 
	WindowObject.document.writeln('</td><td style="border: 0.2px solid;"><div style="width: 41.5%; float:left;">'+ $("#txtBaco").val()  +'</div></td>	</tr><tr><td width="15%" align="center" style="border: 1px solid;font-weight: bold;">OTHER</td><td style="border: 0.2px solid;" align="center">');
	var htor = $("#chkOther").is(":checked") ? 1:0;

	if(htor > 0) {
	WindowObject.document.writeln('<img  src="images/Accept.png" id="chkHtnP" height="10" width="10"  name="chkHtnP"/>');
	}else{
		WindowObject.document.writeln('<img  src="" id="chkHtnP" height="10" width="10"  name="chkHtnP"/>');
	} 
	 
	WindowObject.document.writeln('</td><td style="border: 0.2px solid;"><div style="width: 41.5%; float:left;">'+ $("#txtOther").val()  +'</div></td></tr></tbody></table></div><div style="width: 45%; padding-left: 5%;float:left;"><div style="width: 100%; float:left;">'+ $("#pastSurgHistory").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 45%; padding-left: 5%; padding-top: 1%; float:left;"><div style="width: 30%; float:left;font-weight: bold;">Medications:</div> <div style="width: 70%; float:left;">'+ $("#medications").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 45%; padding-left: 5%; padding-top: 1%; float:left;"><div style="width: 32%; float:left;font-weight: bold;">Past Reguler:</div> <div style="width: 68%; float:left;">'+ $("#pastReguler").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 45%; padding-left: 5%; padding-top: 1%; float:left;"><div style="width: 40%; float:left;font-weight: bold;">Present Reguler:</div> <div style="width: 60l%; float:left;">'+ $("#PresentReguler").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 10%;float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">GYNAC/OBC History:</div><div style="width: 72%; float:left;">'+ $("#gynac").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%;float:left;height:auto;"><div style="width: 35%;float:left;font-weight: bold;">Any allergies or adverse drug reactions?:</div><div style="width: 65%; float:left;">'+ $("#drugReaction").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%;float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">Family History:</div><div style="width: 72%; float:left;">'+ $("#familyHis").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%;float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">Personal History:</div><div style="width: 72%; float:left;">'+ $("#perHistory").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%;float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">Habbits:</div><div style="width: 72%; float:left;">'+ $("#habbits").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%;float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">Bowel:</div><div style="width: 72%; float:left;">'+ $("#bowel").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%;float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">Blader:</div><div style="width: 72%; float:left; padding-bottom: 8%;">'+ $("#blader").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 7%;"><div style="width: 50%;"><div style="width: 50%;  font: bold; font-size: medium; padding-bottom: 3%;padding-top: 5%;font-weight: bold;">On Examinations</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;"><div style="width: 50%;  font: bold; font-size: medium; padding-bottom: 1%; float:left;font-weight: bold;">VITALS</div><div style="width: 50%; font: bold; font-size: medium; padding-bottom: 1%;float:left;font-weight: bold;">General Exam&nbsp;&nbsp;&nbsp;</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;float:left;"><div style="width: 50%;float:left;"><div style="width: 35%; float:left;font-weight: bold;">Temparature :</div><div style="width: 50%; float:left;">'+ $("#temparature").val()  +'</div></div><div style="width: 25%;float:left;"><div style="width: 35%; float:left;font-weight: bold;">Pallor :</div><div style="width: 50%; float:left;">'+ $("#pallor").val()  +'</div></div><div style="width: 25%;float:left;"><div style="width: 40%; float:left;font-weight: bold;">Lcterus :</div><div style="width: 50%; float:left;">'+ $("#lcterus").val()  +'</div></div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;float:left;"><div style="width: 50%;float:left;"><div style="width: 30%;float:left;font-weight: bold;">Pulse :</div><div style="width: 50%; float:left;">'+ $("#pulse").val()  +'</div></div><div style="width: 25%;float:left;"><div style="width: 48%; float:left;font-weight: bold;">Clubbing :</div><div style="width: 50%; float:left;">'+ $("#clubbing").val()  +'</div></div><div style="width: 25%;float:left;"><div style="width: 44%; float:left;font-weight: bold;">Oedema :</div><div style="width: 50%; float:left;">'+ $("#oedema").val()  +'</div></div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%; float:left;"><div style="width: 50%; float:left;"><div style="width: 30%; float:left;font-weight: bold;">BP :</div><div style="width: 40%; float:left;">'+ $("#bp").val()  +'</div></div><div style="width: 50%; float:left;"><div style="width: 50%; float:left;font-weight: bold;">Lymph Adenopathy:</div><div style="width: 40%; float:left;">'+ $("#lymph").val()  +'</div></div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 5%;float:left;"><div style="width: 50%;  font: bold; font-size: medium; padding-bottom: 1%;font-weight: bold;">Systematic Examinations</div></div>');

	WindowObject.document.writeln('<br><br>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;"><div style="width: 50%;float:left;"><div style="width: 30%; padding-top: 1%;float:left;font-weight: bold;">R/S :</div><div style="width: 60%; float:left;">'+ $("#rs").val()  +'</div></div><div style="width:50%;float:left;"><div style="width: 30%; padding-top: 1%;float:left;font-weight: bold;">CNS :</div><div style="width: 40%; float:left;">'+ $("#cns").val()  +'</div></div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;"><div style="width: 50%;float:left;"><div style="width: 30%; padding-top: 1%;float:left;font-weight: bold;">CVS :</div><div style="width: 40%; float:left;">'+ $("#cvs").val()  +'</div></div><div style="width:50%;float:left;"><div style="width: 30%; padding-top: 1%;float:left;font-weight: bold;">PA :</div><div style="width: 40%; float:left;">'+ $("#pa").val()  +'</div></div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 5%; float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">Local Examinations:</div><div style="width: 72%; float:left;">'+ $("#localExm").val()  +'</div>					</div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%; float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">Investigation	Reports:</div><div style="width: 72%; float:left;">'+ $("#invsRep").val()  +'</div>					</div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%; float:left;height:auto;"><div style="width: 25%;float:left;font-weight: bold;">Provisional Diagnosis:</div><div style="width: 72%; float:left;">'+ $("#provDia").val()  +'</div>					</div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 2%; float:left;height:auto;padding-bottom: 5%;"><div style="width: 25%;float:left;font-weight: bold;">Treatment Plan:</div><div style="width: 72%; float:left;">'+ $("#treatPlan").val()  +'</div>					</div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 18%; font: bold; font-size: medium; padding-bottom: 1%;font-weight: bold;">Medical	Officer</div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;"><div style="width: 8%; float:left;font-weight: bold;">Name :</div><div style="width: 70%; float:left;">'+ $("#name").val()  +'</div></div>');

	WindowObject.document.writeln('<div style="width: 100%; padding-top: 1%;padding-bottom: 5%;float:left; "><div style="width: 55%;float:left;font-weight: bold;">Sign :</div><div style="width:45%; float:left;font-weight: bold;float:left;">Sign Of Consultant:</div></div>');

	WindowObject.document.writeln('</div>');

	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

}

function printDischargeSummery(divName) {

	var hospDetails = $("#hospDetails").html();
	hospDetails = eval('(' + hospDetails + ')');
	var hosp = hospDetails;// .listHosDetail[0];
	var originalContents = document.body.innerHTML;
	var billHeader = $("#billHeader").val();
	var WindowObject = window.open('', ' ', '');

	WindowObject.document.writeln('<html><body>');


	WindowObject.document
			.writeln('<div style="width:25%;float:left;"><img src="'+hosp.flpt+'" width="200" height="100" alt="" /></div><div style="text-align: center;" id="SRBill"><h1>'
					+ hosp.hn
					+ '</h1>	<b>'
					+ hosp.ha
					+ '-'
					+ hosp.hz
					+ '</b><br></br> <b>Tel:-'
					+ hosp.hcon
					+ '.</b><b>Fax:-' + hosp.hx + '.</b></div></div>');

	WindowObject.document
			.writeln('_______________________________________________________________________________________________________________________________<strong><h2 align="center">Discharge Summary</h2></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

	WindowObject.document
			.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Name of the Patient</td><td width="40%" style="border: solid 1px;padding-left: 10px;" align="left" >'
					+ $("#patName").val()
					+ ' </td><td  width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Reg. No.</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
					+ $("#regNo").val() + ' </td></tr>');
	WindowObject.document
			.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Age</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
					+ $("#age").val()
					+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Gender</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
					+ $("#sex").val() + ' </td></tr>');
	WindowObject.document
			.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Date of Admission</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
					+ $("#admitDate").val()
					+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Date of Discharge</td><td style="border: solid 1px;padding-left: 10px;" align="left" >&nbsp;'
					+ $("#dischargeDate").val() + ' </td></tr>');
	var rby = "";
	if ($("#refBy").val() == "undefined") {
		rby = "";
	} else {
		rby = $("#refBy").val();
	}
	WindowObject.document
			.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Incharge Dr./unit</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
					+ $("#inchargeDr").val()
					+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Ref By:</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
					+ rby + ' </td></tr></table>');
	var temp = $("#mlcNo").val();

	if (null != temp && "" != temp) {
		WindowObject.document
				.writeln('<table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%; padding-top: 3%;"><tr height="35px"><td  style="border: solid 1px;padding-left: 10px;" align="left">MLC No</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
						+ $("#mlcNo").val()
						+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Police Station Name</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
						+ $("#policStaName").val() + ' </td></tr>');
		WindowObject.document
				.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">BUCCLE No</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
						+ $("#buccleNo").val()
						+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Authority Name</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
						+ $("#constName").val() + ' </td></tr>');
		WindowObject.document
				.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Address and Phone</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
						+ $("#addPh").val() + ' </td></tr></table>');
	}
	if ($("#adNote").val() != "")
		WindowObject.document
				.writeln('<table cellpadding="0" cellspacing="0" style=" padding-top: 20px;" width="100%"><tr><td  style="width:30%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Addmission Note</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#adNote").val()).replace(/\n/g, "<br>")
						+ '</div> </td></tr>');

	if ($("#digno").val() != "")
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Diagnosis</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#digno").val()).replace(/\n/g, "<br>")
						+ '</div> </td></tr>');

	if ($("#riskFact").val() != "")
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Risk Factors</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#riskFact").val()).replace(/\n/g, "<br>")
						+ '</div> </td></tr>');

	if ($("#complication").val() != "")
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Complications</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#complication").val()).replace(/\n/g, "<br>")
						+ '</div></td></tr>');

	if ($("#preSymp").val() != "")
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Presenting Symptoms & History</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#preSymp").val()).replace(/\n/g, "<br>")
						+ '</div></td></tr>');

	if ($("#cliFind").val() != "")
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Clinical Findings</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#cliFind").val()).replace(/\n/g, "<br>")
						+ '</div> </td></tr>');
	var testNoteCount = $("#testNoteCount").val();
	 
	if(testNoteCount>1)
	WindowObject.document
			.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Investigation</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 100%; color: black;" id="testContent"><table border="1" cellpadding="0" cellspacing="0" width="100%"	style="border-color: lightgray;"><tr height="25" style="width: 100%;"><td align="center" width="10%;">#</td>	<td align="center" width="30%;">Test Name</td><td align="center" width="20%;">Test Date</td><td align="center" width="40%;">Test Note</td></tr>');

	for ( var j = 1; j < testNoteCount; j++) {
		WindowObject.document
				.writeln("<tr height='20'><td align='center' width='3%;'>"
						+ j
						+ "</td><td style='padding-left: 10px;' width='32%;'>"
						+ $('#tname' + j).html()
						+ "</td>	<td style='padding-left: 10px;' width='25%;'>"
						+ $('#testDate' + j).html()
						+ "</td>	<td style='padding-left: 10px;' width='40%;'>&nbsp;"
						+ $('#testNote' + j).val() + "</td></tr>");
	}
	if(testNoteCount>1)
	WindowObject.document.writeln('</table></div></td></tr>');

	if ($("#specInvest").val() != "")
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Special Investigation</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#specInvest").val()).replace(/\n/g, "<br>")
						+ '</div> </td></tr>');

	if ($("#treatmentGiven").val() != "")
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Treatment Given</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#treatmentGiven").val()).replace(/\n/g,
								"<br>") + '</div> </td></tr>');

	var condDis = $("#condDisc").val();
	if (null != condDis && "" != condDis) {
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Condition At Discharge</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#condDisc").val()).replace(/\n/g, "<br>")
						+ '</div> </td></tr>');
	}

	var investigationTest=($("#txtEquipmetb1").text()).split("\n");
	if(investigationTest!=null && investigationTest!=""){
		WindowObject.document
		.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Investigation Test</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">');
		var count=1;
		for ( var i = 0; i < investigationTest.length-1; i++) {
			if(investigationTest[i]){
				WindowObject.document
				.writeln((count++) +". "+investigationTest[i]+" <br>");
			}
		}
		WindowObject.document
		.writeln('</div> </td></tr>');
	}
	var physiotherapyTest=($("#txtEquipmetg1").text()).split("\n");
	if(physiotherapyTest!=null && physiotherapyTest!=""){
		WindowObject.document
		.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Physiotherapy Test</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">');
		var count=1;
		for ( var i = 0; i < physiotherapyTest.length-1; i++) {
			if(physiotherapyTest[i]){
				WindowObject.document
				.writeln((count++) +". "+physiotherapyTest[i]+" <br>");
			}
		}
		WindowObject.document
		.writeln('</div> </td></tr>');
	}
	var dentalTest=($("#txtEquipmeti1").text()).split("\n");
	if(dentalTest!=null && dentalTest!=""){
		WindowObject.document
		.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Dental Test</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">');
		var count=1;
		for ( var i = 0; i < dentalTest.length-1; i++) {
			if(dentalTest[i]){
				WindowObject.document
				.writeln((count++) +". "+dentalTest[i]+" <br>");
			}
		}
		WindowObject.document
		.writeln('</div> </td></tr>');
	}
	var pathologyTest=($("#txtEquipmetp1").text()).split("\n");
	if(pathologyTest!=null && pathologyTest!=""){
		WindowObject.document
		.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Pathology Test</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">');
		var count=1;
		for ( var i = 0; i < pathologyTest.length-1; i++) {
			if(pathologyTest[i]){
				WindowObject.document
				.writeln((count++) +". "+pathologyTest[i]+" <br>");
			}
		}
		WindowObject.document
		.writeln('</div> </td></tr>');
	}
	var casualtyServiceTest=($("#txtEquipmetc1").text()).split("\n");
	if(casualtyServiceTest!=null && casualtyServiceTest!=""){
		WindowObject.document
		.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Casualty Service Test</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">');
		var count=1;
		for ( var i = 0; i < casualtyServiceTest.length-1; i++) {
			if(casualtyServiceTest[i]){
				WindowObject.document
				.writeln((count++) +". "+casualtyServiceTest[i]+" <br>");
			}
		}
		WindowObject.document
		.writeln('</div> </td></tr>');
	}


	var prescriptionString = "";
	var rowCount = $("#RowCount").val();

	for ( var i = 1; i <= rowCount; i++) {

		var txtName = "#Medicine" + i;
		// var a= $(txtName).val();

		if($(txtName).val()!=undefined){
		var chkMName = "#M" + i;
		var chkAName = "#A" + i;
		var chkEName = "#E" + i;
		var chkNName = "#N" + i;
		var txtInstruction = "#Instruction" + i;
		var txtDays = $("#Days" + i).val();
		var txtQty = "#Qty" + i;

		var txtValue = $(txtName).val();

		prescriptionString = prescriptionString + txtValue
				+ "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
		if ($(chkMName).attr('checked')) {

			prescriptionString = prescriptionString + "1";

		} else {
			prescriptionString = prescriptionString + "0";
		}
		if ($(chkAName).attr('checked')) {

			prescriptionString = prescriptionString + "-1";

		} else {
			prescriptionString = prescriptionString + "-0";
		}
		if ($(chkEName).attr('checked')) {

			prescriptionString = prescriptionString + "-1";

		} else {
			prescriptionString = prescriptionString + "-0";
		}
		if ($(chkNName).attr('checked')) {

			prescriptionString = prescriptionString + "-1";

		} else {
			prescriptionString = prescriptionString + "-0";
		}
		prescriptionString = prescriptionString+"   "+txtDays + "&nbsp;&nbsp;Days<br>";

	}
	}

	if (prescriptionString != "")
		WindowObject.document
				.writeln('<tr><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Treatment Advised At Discharge</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ prescriptionString + '</div> </td></tr>');



	if ($("#oprNote").val() != "")
		WindowObject.document
				.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left" valign="top">Operation Note</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
						+ ($("#oprNote").val()).replace(/\n/g, "<br>")
						+ '</div> </td></tr></table>');
	var PatientType = $("input:radio[name='PatientType']:checked").val();
	if(PatientType == "PD"){

		WindowObject.document
		.writeln('<strong><h3 align="center">Paediatric Dept </h3></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

WindowObject.document
		.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Past/Family History</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#pastHistory").val()
				+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">General Examination</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#generalExamination").val()
		+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">CVS</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#cvs").val()
		+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">RS</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
+ $("#rs").val()
+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">PA</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#pa").val()
		+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">CNS</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#cns").val()
		+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">PS</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
+ $("#ps").val()
+ ' </td></tr>');


WindowObject.document
		.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Platelet Count</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#plateletCount").val()
				+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Urine-R</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#urineR").val() + ' </td></tr>');
WindowObject.document
		.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Stool-R</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#stoolR").val() + ' </td><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">BSL (mg%)</td><td style="border: solid 1px;padding-left: 10px;" align="left" >&nbsp;'
				+ $('#bsl').val() + ' </td></tr>');

WindowObject.document
		.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">CSF</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#csf").val()
				+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">OTT</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#ott").val() + ' </td></tr>');


WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr Calcium (mg%)</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#srcalcium").val()
		+ ' </td><td  width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Coombs Test</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#coombTest").val() + ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">T.T.</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+  $('#pdtt').val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr Na</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $('#pdsrna').val()+ ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr K</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#pdsrk").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr Cl</td><td style="border: solid 1px;padding-left: 10px;" align="left" >&nbsp;'
		+ $("#pdsrcl").val() + ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr Billirubin(mg%)</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#srBillirubin").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Unconj(mg%) </td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#unconj1").val() + ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Unconj(mg%)</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#unconj2").val()
		+ ' </td><td  width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">X-Ray</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#pdxray").val() + ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">USG</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#pdusg").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">CT/MRI</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+  $("#pdctmri").val()+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Course Of ILLNESS/REC</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#courseOfRec").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Management</td><td style="border: solid 1px;padding-left: 10px;" align="left" >&nbsp;'
		+ $('#pdManagement').val() + ' </td></tr>');


var strchk = "";
for ( var i = 1; i <= 11; i++) {
       chk = ($("#chk" + i)).is(':checked') ? strchk = strchk + document.getElementById("chk"+i).name + "," : "N";
       
}

WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Immunisation Status</td><td colspan="3" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ strchk
		+ '</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Other Vaccines</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#otherVaccines").val()
		+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Any Other Points</td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#anyOtherPoints").val()
		+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Follow Up Advise </td><td colspan="3" width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
+ $("#followUpAdvise").val()
+ ' </td></tr></table>');

PatientType = "";


	}else if(PatientType == "nicuPD"){

		WindowObject.document
		.writeln('<strong><h3 align="center">Paediatric Dept (NICU)</h3></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

WindowObject.document
		.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">IPD No</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#ipdNo").val()
				+ ' </td><td  width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Birth Weight</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#birthWeight").val() + ' </td></tr>');
WindowObject.document
		.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Wight On Adm.</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#weightOnAdmission").val()
				+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Weight On Disc.</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#weightOnDischarge").val() + ' </td></tr>');
			var baby = "";
			if($('input:radio[name="babysData"]:checked').val() == "paga"){
				baby = "Preterm AGA";
			}else{
				baby = $('input:radio[name="babysData"]:checked').val();
			}

WindowObject.document
		.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Babys Data</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ baby
				+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Delivery Data</td><td style="border: solid 1px;padding-left: 10px;" align="left" >&nbsp;'
				+ $('input:radio[name="deliveryData"]:checked').val() + ' </td></tr>');

WindowObject.document
		.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Condition At Birth</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#conditionAtBirth").val()
				+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">ANC History: Age:</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
				+ $("#ancAge").val() + ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">MBG</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#mbg").val()
		+ ' </td><td  width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">RH</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#rh").val() + ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Registration</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+  $('input:radio[name="registration"]:checked').val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Immunity</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $('input:radio[name="im"]:checked').val()+ ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Serology - HIV</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#serHIV").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Hbs AG</td><td style="border: solid 1px;padding-left: 10px;" align="left" >&nbsp;'
		+ $("#hbsAG").val() + ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">VDRL</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#vdrl").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Medical History </td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#dm").val() + ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">HTN-DM</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#htn").val()
		+ ' </td><td  width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Thyroid Disorder</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#thyroid").val() + ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Thyroid Disorder</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#thyroid").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Fever With Rash</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+  $("#fever").val()+ ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Other</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#medOther").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Obsteric Prob.</td><td style="border: solid 1px;padding-left: 10px;" align="left" >&nbsp;'
		+ $('input:radio[name="obsProb"]:checked').val() + ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Treatment Given-Fluids</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#fluids").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Antibiotic</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#antibio").val() + ' </td></tr>');



WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sedation Used 1</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#sedation1").val()
		+ ' </td><td  width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sedation Used 2</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#sedation2").val() + ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Course In Hosp.</td><td colspan="3" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#courseInHos").val()
		+ ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Other Meication Total Dur.</td><td colspan="3" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#duration").val()
		+ ' </td></tr></table>');

WindowObject.document
.writeln('<table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');
WindowObject.document.writeln('<tr><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Mode</td><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Max PIP</td><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Max PEEP</td><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Max FiO2</td></tr>');
WindowObject.document.writeln('<tr><td style="border: solid 1px;padding-left: 10px;" align="left" >'+$("#mode1").val()+'</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'+$("#pip1").val()+'</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'+$("#peep1").val()+'</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'+$("#fio1").val()+'</td></tr>');
WindowObject.document.writeln('<tr><td style="border: solid 1px;padding-left: 10px;" align="left" >'+$("#mode2").val()+'</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'+$("#pip2").val()+'</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'+$("#peep2").val()+'</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'+$("#fio2").val()+'</td></tr></table>');

WindowObject.document
.writeln('<br><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Blood Culture-ORG</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#organism").val()
		+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sensitive To</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#sensitive").val() + ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">BSL MAX</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#bslmax").val()
		+ ' </td><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">BSL MIN</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#bslmin").val() + ' </td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Electrolyte-Sr Na</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#electrolyte").val()
		+ ' </td><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr K</td><td style="border: solid 1px;padding-left: 10px;" align="left" >&nbsp;'
		+ $("#srk").val() + ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr Ca (%mg)</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#srca").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr Mg (%mg)</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#srmg").val() + ' </td></tr></table>');

WindowObject.document
.writeln('<strong><h3 align="center">Investigations</h3></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Date</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#date1").val()
		+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#date2").val()+'</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'
		+ $("#date3").val() + ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#date4").val()+'</td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Sr Billirubin</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#billirubin1").val()
		+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#billirubin2").val()+'</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'
		+ $("#billirubin3").val() + ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#billirubin4").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Total</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#total1").val()
		+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#total2").val()+'</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'
		+ $("#total3").val() + ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#total4").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Indirect</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#indirect1").val()
		+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#indirect2").val()+'</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'
		+ $("#indirect3").val() + ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#indirect4").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Direct</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#direct1").val()
		+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#direct2").val()+'</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'
		+ $("#direct3").val() + ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#direct4").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Phototherapy</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#phototherapy1").val()
		+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#phototherapy2").val()+'</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'
		+ $("#phototherapy3").val() + '</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#phototherapy4").val()+'</td></tr></table>');


WindowObject.document
.writeln('<br><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Imaging X-Ray</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#xray").val()
		+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">USG</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#usg").val() + ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">CT/MRI</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#ctmri").val()
		+ ' </td><td  style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Others</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#otherex").val() + ' </td></tr></table>');

WindowObject.document
.writeln('<strong><h3 align="center">Predischarge Check</h3></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">-</td><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Rt.</td><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Lt.</td></tr>');


WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">1. Red Reflex</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#redReflex1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#redReflex2").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">2. Hips</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#hips1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#hips2").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">3. Femorals</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#femorals1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#femorals2").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">4. Genitals</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#genitals1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#genitals2").val()+'</td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">5.Hernia</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#hernia1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#hernia2").val()+'</td></tr>');
WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">6. Head Circumference</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#headcir1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#headcir2").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">7. Other</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#pcother1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#pcother2").val()+'</td></tr></table>');


WindowObject.document
.writeln('<strong><h3 align="center">Advice On Discharge</h3></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">-</td><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Date/Time</td><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Reporting Place</td></tr>');


WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">ROP Screening</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#ropScreen0").val()+" "+$("#ropScreen1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#ropScreen2").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Hearing Screening</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#hearingScreen0").val()+" "+$("#hearingScreen1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#hearingScreen2").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">USG Brain</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#usgBrain0").val()+" "+$("#usgBrain1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#usgBrain2").val()+'</td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Other</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#adother0").val()+" "+$("#adother1").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left">'+$("#adother2").val()+'</td></tr></table>');



WindowObject.document
.writeln('<strong><h3 align="center">Follow Up</h3></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Pri. Consultant</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#priConsult").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Date</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#priConsultDate").val() + ' </td><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Time</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#priConsultTime").val()
		+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td  style="width: 20%;border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">High Risk OPD</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#hrOPD").val()+ ' </td><td width="20%" style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Date</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#hrOPDDate").val() + ' </td><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Time</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#hrOPDTime").val()
		+ ' </td></tr>');

WindowObject.document
.writeln('<tr height="35px"><td style="border: solid 1px;padding-left: 10px;font-weight:bold;" align="left">Other</td><td colspan="5" style="border: solid 1px;padding-left: 10px;" align="left" >'
		+ $("#finalOther").val()+ ' </td></tr></table>');

PatientType = "";
	}

	WindowObject.document.writeln('');
	WindowObject.document
			.writeln('<div style="width: 100%;padding-top:0px;"><div style="width: 20%;float:right;">Doctor Sign</div></div>');
	WindowObject.document.close();

	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();


}
function test_skill_voucher()
{
	var junkVal = $('#txtAmount').val() + "/-";
	var txtAmt=0;
	txtAmt=$('#txtAmount').val();
	$("#seltowards").val("Paid");
	junkVal = junkVal.split("/-");
	junkVal = Math.floor(junkVal[0]);
	var obStr = new String(junkVal);
	numReversed = obStr.split("");
	actnumber = numReversed.reverse();

	if (Number(junkVal) >= 0) {
		// do nothing
	} 
	if (Number(junkVal) == 0) {
		$('#amountinwords').html('Rupees Zero Only');
		return false;
	}
	if (actnumber.length > 9) {
		alert('Oops!!!! the Number is too big to covertes');
		return false;
	}
	var iWords = [ "Zero", " One", " Two", " Three", " Four", " Five", " Six",
	   			" Seven", " Eight", " Nine" ];
	   	var ePlace = [ 'Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen',
	   			' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen' ];
	   	var tensPlace = [ 'dummy', ' Ten', ' Twenty', ' Thirty', ' Forty',
	   			' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety' ];

	   	var iWordsLength = numReversed.length;
	   	var totalWords = "";
	   	var inWords = new Array();
	   	var finalWord = "";
	   	j = 0;
	   	for (i = 0; i < iWordsLength; i++) {
	   		switch (i) {
	   		case 0:
	   			if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
	   				inWords[j] = '';
	   			} else {
	   				inWords[j] = iWords[actnumber[i]];
	   			}
	   			inWords[j] = inWords[j] + ' Only';
	   			break;
	   		case 1:
	   			tens_complication();
	   			break;
	   		case 2:
	   			if (actnumber[i] == 0) {
	   				inWords[j] = '';
	   			} else if (actnumber[i - 1] != 0 && actnumber[i - 2] != 0) {
	   				inWords[j] = iWords[actnumber[i]] + ' Hundred and';
	   			} else {
	   				inWords[j] = iWords[actnumber[i]] + ' Hundred';
	   			}
	   			break;
	   		case 3:
	   			if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
	   				inWords[j] = '';
	   			} else {
	   				inWords[j] = iWords[actnumber[i]];
	   			}
	   			if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
	   				inWords[j] = inWords[j] + " Thousand";
	   			}
	   			break;
	   		case 4:
	   			tens_complication();
	   			break;
	   		case 5:
	   			if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
	   				inWords[j] = '';
	   			} else {
	   				inWords[j] = iWords[actnumber[i]];
	   			}
	   			if (actnumber[i + 1] != 0 || actnumber[i] > 0) {
	   				inWords[j] = inWords[j] + " Lakh";
	   			}
	   			break;
	   		case 6:
	   			tens_complication();
	   			break;
	   		case 7:
	   			if (actnumber[i] == 0 || actnumber[i + 1] == 1) {
	   				inWords[j] = '';
	   			} else {
	   				inWords[j] = iWords[actnumber[i]];
	   			}
	   			inWords[j] = inWords[j] + " Crore";
	   			break;
	   		case 8:
	   			tens_complication();
	   			break;
	   		default:
	   			break;
	   		}
	   		j++;
	   	}


function tens_complication() {
	if (actnumber[i] == 0) {
		inWords[j] = '';
	} else if (actnumber[i] == 1) {
		inWords[j] = ePlace[actnumber[i - 1]];
	} else {
		inWords[j] = tensPlace[actnumber[i]];
	}
}
inWords.reverse();
for ( var i = 0; i < inWords.length; i++) {
	finalWord += inWords[i];
}
$('#amountinwords').html(finalWord);
// $('#cashAmount').val($('#txtRemaining').val());
}

var expenceVoucherTemplate = "{#foreach $T.ipdExpenseLi as ipdExpenseLi}<tr id='div{count}'>	" +
		"<td style='height: 21.5px;' class=''>{count}.</td>	" +
		"<td style='height: 21.5px;' class='col-md-1 center'>{$T.ipdExpenseLi.voucherDate}</td>	" +
		"<td style='height: 21.5px;' class='col-md-2 center'>{$T.ipdExpenseLi.ipdCompName}</td>	" +
		
		"{#if $T.ipdExpenseLi.payName=='-'}"+
		"<td id='divPi{count}' style='height: 21.5px;' class='numeric col-md-1 center'>Multiple</td>  " +
		"{#else}"+
		"<td id='divPi{count}' style='height: 21.5px;' class='numeric col-md-1 center'>{$T.ipdExpenseLi.payName}</td>  " +
		"{#/if}"+
		
		"<td id='divPi{count}' style='height: 21.5px;' class='numeric col-md-1 center' value='{$T.ipdExpenseLi.idgrp}'>{$T.ipdExpenseLi.grpnm}</td>  " +
		"<td id='divPi{count}' style='height: 21.5px;' class='numeric col-md-2 center' value='{$T.ipdExpenseLi.idlh}'>{$T.ipdExpenseLi.ledgerheadnm}</td>  " +
		
		"{#if $T.ipdExpenseLi.refTo==1}"+
		"<td id='divPi{count}' style='height: 21.5px;'		class='numeric col-md-1 center'>OPD</td>  	" +
		"{#elseif $T.ipdExpenseLi.refTo==2}"+
		"<td id='divPi{count}' style='height: 21.5px;'		class='numeric col-md-1 center'>IPD</td>  	" +
		"{#elseif $T.ipdExpenseLi.refTo==3}"+
		"<td id='divPi{count}' style='height: 21.5px;'		class='numeric col-md-1 center'>Dignostic</td>  	" +
		
		"{#/else}{#/else}{#/else}{#/if}"+
		"<td style='height: 21.5px;' class='numeric col-md-2 center'>{$T.ipdExpenseLi.ipdPayTo}</td>" +
		"<td style='height: 21.5px;' class='numeric col-md-1 center'>		{$T.ipdExpenseLi.amount}</td><td style='height: 21.5px;' class='numeric col-md-2 center'>{$T.ipdExpenseLi.ipdPaidAmt}</td>	" +
		"<td style='height: 21.5px;' class='numeric col-md-1 center'>		<button value='Edit' style='height: 21.5px;'			class='btn btn-xs btn-success editUserAccess' disabled='disabled' id='btnEdit{count}'			onclick='editVoucherEX({$T.ipdExpenseLi.idipdExpense})'>			<i class='fa fa-edit' class='edit'></i>		</button>	</td>	" +
		"<td style='height: 21.5px;' class='numeric col-md-1 center'><input		type='checkbox' value='{$T.ipdExpenseLi.idipdExpense}'		name='checkbox{count}' id='checkbox' /></td>	<input id='ipdID{count}' name='ipdID{count++}' type='hidden'		value='{$T.ipdExpenseLi.idipdExpense}' />" +
		"</tr>{#/for}<input id='addRowCount' name='addRowCount' type='hidden' value='{count}'>";

function getExpenceVoucher(page_name) {
    
	count=1;
	var byType = $("#byType").val();
	var idvoucher=$("#ipdID").val();
	/**
	 * *MODIFIED BY
	 * 
	 * @HUSEN*******
	 */
	var regexp = /^([a-zA-Z ])*$/;
	if(!byType.match(regexp))
		{
		 alert("Company name should be of digits only with a space.");
		 $("#byType").focus();
		 return false;
		}
	 var temp = 0;
	 if(byType != "")
		 {
		   var arr = new Array();
		   arr = byType.split("");
		   if(arr[0] == " ")
			   {
			    temp = 1;
			   }
		 }
	   if(temp == 1)
	   {
	    alert("Please provide valid company name.");
	    $("#byType").focus();
	    return false;
	   }
	
	if(page_name=="byType")
		{
		 if (byType == "") {
			alert("Please enter Company name.");
			return false;
	       }
		}
	//alert("page_name="+page_name+" idvoucher="+idvoucher+" byType="+byType);
	var inputs = [];
	inputs.push('action=fetchExpenceVoucher');
	inputs.push('page_name=' + page_name);
	inputs.push('idvoucher=' + idvoucher);
	inputs.push('byType=' + byType);

	var str = inputs.join('&');
	jQuery.ajax({
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
			var ajaxResponse = r;
			var pobj1 = eval('(' + ajaxResponse + ')');
			if(pobj1.ipdExpenseLi.length > 0)
				{
				$("#DivResponse").html(ajaxResponse);
				$("#container").setTemplate(expenceVoucherTemplate);
				$("#container").processTemplate(pobj1);
				}
			else{
				// alert("Record not found");
				// getExpenceVoucher("");
			}
			setTimeout(function(){userAccess();},200);
		}
	});

}
// Common document ready function
$(document).ready( function() {
	try {
		$("body").css("cursor", 'default');
		$(document).css("cursor", 'default');

	} catch (e) {
	}

	if (window.initLogOut)
		initLogOut();
});
/**
 * *
 * 
 * @author husenbadshah to convert amount into words***
 */
/*function ConvertAmountInWords(callFrom)
{
	if(callFrom == "ExpVoucher")
		{
		var reg = /^[0-9]+$/;
		var amount = $("#amountPaid").val();
		
		if (amount != "" && !reg.test(amount)) {
			alert("Please Enter Only number!");
			$("#amountPaid").val("");
			return false;
		}
		if(amount != "")
			{
			var inputs = [];
			inputs.push('action=ConvertAmountInWords');
			inputs.push('amount=' + amount);
			var str = inputs.join('&');
			jQuery.ajax({
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
					var ajaxResponse = r;
				
					if(ajaxResponse != "")
						{
						$("#amountInWords").val(ajaxResponse);
						}
					else{
						$("#amountInWords").val("");
					}
				}
			});
			} else{
			$("#amountInWords").val("");
		}
		}
}*/
function saveExpenseVoucher()
{
	var companyName = $("#companyName").val();
	var bdate = $("#bdate").text();
	var paymentTo = $("#paymentTo").val();
	var amountPaid = $("#amountPaid").val();
	var amountInWords = $("#amountInWords").val();
	var selAmountType = $("#selAmountType").val();
	var selRefTo = $("#selRefTo").val();
	var chequeNumber = $("#chequeNumber").val();
	var txtAmount = $("#txtAmount").val();
	var txtRemark = $("#txtRemark").val();
	var queryType = $("#queryType").val();
	var idipd = $("#ipdID").val();
	var grpid = $("#selectVoucherGrp").val();
	var ledgerHeadid = $("#selectLedgerHead").val();
	
	var pattern = /^([a-z-A-Z])*$/;
/*
 * if(amountInWords.match()) { alert("Amount in words allow characters only..");
 * $("#amountInWords").focus(); return false; }
 */

	if(paymentTo == 0){
		alert("Please Enter Payment-To Field!!");
		SetFocus("paymentTo");
		return false;
	}else if(grpid == 0){
		alert("Please select Group Name!!");
		SetFocus("selectVoucherGrp");
		return false;
	}else if(amountPaid == 0){
		alert("Please Enter Total Amount to Paid!!");
		SetFocus("amountPaid");
		return false;
	}else if(txtAmount == 0){
		alert("Please Enter Amount Paid!!");
		SetFocus("txtAmount");
		return false;
	}else if(selAmountType == "select"){
		alert("Please select Payment Mode!!");
		SetFocus("selAmountType");
		return false;
	}else if(ledgerHeadid == null){
		ledgerHeadid = "0";
	}
	
	if(txtAmount==0)
		{
		alert("Please fill in all fields!!");
	return false;
		}

	var inputs = [];
	inputs.push('action=saveExpenseVoucher');
	inputs.push('companyName=' + companyName);
	inputs.push('bdate=' + bdate);
	inputs.push('paymentTo=' + paymentTo);
	inputs.push('amountPaid=' + amountPaid);
	inputs.push('amountInWords=' + amountInWords);
	inputs.push('selAmountType=' + selAmountType);
	inputs.push('selRefTo=' + selRefTo);
	inputs.push('chequeNumber=' + chequeNumber);
	inputs.push('txtAmount=' + txtAmount);
	inputs.push('txtRemark=' + txtRemark);
	inputs.push('queryType=' + queryType);
	inputs.push('idipd=' + idipd);
	inputs.push('grpid=' + grpid);
	inputs.push('ledgerHeadid=' + ledgerHeadid);
	
	var str = inputs.join('&');
	jQuery.ajax( {
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
			alert(ajaxResponse);
			window.location.reload(true);
			}
		});
}

function editVoucherEX(id)
{

var ajaxResponse=$("#DivResponse").html();
myArray=JSON.parse(ajaxResponse);
for ( var i = 0; i < myArray.ipdExpenseLi.length; i++) {

	if (myArray.ipdExpenseLi[i].idipdExpense == id) {

		myObj = myArray.ipdExpenseLi[i];
		break;
	}
}
var str = $('#selAmountType :selected').text();
$("#companyName").val(myObj.ipdCompName);
$("#paymentTo").val(myObj.ipdPayTo);
$("#amountPaid").val(myObj.ipdPaidAmt);
$("#amountInWords").val(myObj.ipdAmtInWords);
$("#selAmountType").val(myObj.paymode);
$("#selRefTo").val(myObj.refTo);
$("#txtAmount").val(myObj.amount);
$("#txtRemark").val(myObj.remark);
$("#selectVoucherGrp").val(myObj.idgrp);
selectVoucherGrp(myObj.idgrp);
$("#vouName").val(myObj.grpnm);
$("#selectLedgerHead").val(myObj.idlh);
selLedgerhead(myObj.idlh);
if(myObj.chequeNumber>0){
	$("#chequeNumber").val(myObj.chequeNumber);
}
$("#ipdID").val(myObj.idipdExpense);
$("#bdate").text(myObj.voucherDate);
$("#recNo").html(myObj.idipdExpense);

test_skill_voucher();
$("#queryType").val("update");
enterChequeNo();

}

function removeExpenseVoucher()
{
	
/*var $radios = $('input:checkbox[name=checkbox]');
if ($radios.is(':checked') != true) {
	alert("Please Select Record to Delete.");
	return false;
}*/
var r = confirm("You Want to delete This Expense Voucher?");
if (r == true) {
// var hiddenRowCount = document.getElementById(RowCount);
var rowCount = $("#addRowCount").val();
/* var allVals = []; */
var allVals = [];
for ( var n = 1; n <= rowCount; n++) {
var $radios = $('input:checkbox[name=checkbox' + n + ']');
if ($radios.is(':checked') == true) {
idIPDhisCom = $("#ipdID" + n).val();
allVals.push(idIPDhisCom);
$("#div" + n).remove();
}
}
deleteExpenseVoucher(allVals);
}
} 
function deleteExpenseVoucher(allVals)
{

	var inputs = [];
	inputs.push('action=deleteExpenseVoucher');
	inputs.push('allVals='+ allVals);

	var str = inputs.join('&');
	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			alert(ajaxResponse);
				 location.reload();
	}
	});
}

function printExpenseVoucher(){

	var xxx = $("#hospDetails").html();
	//hospDetails = eval('(' + xxx + ')');
	hospDetails = JSON.parse(xxx);
	var hosp = hospDetails.listHosDetail[0];
	var vouName = $("#vouName").val();
		
		
var WindowObject = window.open('', ' ', '');
WindowObject.document.writeln('<html><body>');

WindowObject.document
		.writeln('<div style="width:15%;float:left;font-size:40px;padding-left:1%;padding-top:1%;"><img src="'
				+ hosp.flpt
				+ '" width="170" height="100" alt="" /></div><div style="text-align: center;font-size:40px;" id="SRBill"><h3>'
				+ hosp.hn + '</h3>	<b>' + hosp.ha + '-' + hosp.hz
				+ '</b><br></br> <b>Tel:-' + hosp.hcon + '.</b><b>Fax:-'
				+ hosp.hx + '.</b></div>');

WindowObject.document
		.writeln('__________________________________________________________________________________________________________________________________________________________________________________________');

WindowObject.document
.writeln('<div style="width: 96.80%; height: 550px;border:0px solid;" id="printIPDVoucher">'
		+'<div style="width: 100%;font-size:40px;padding-bottom:4%;padding-top:2%;" align="center"><b><u>	EXPENSE VOUCHER	</u></b></div>'
		+'<div style="width: 100%; float: left;font-size:40px; padding-left: 2%;" align="left"><div style="width:50%; float: left; padding-left: 2%;" align="left"><div style="width: 40%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left"><b>Voucher No:</b></div>'
		+'<div style="width: 30%; float: left; font-size:40px;padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ ""  //$("#recNo").html()
		+'</div></div><div style="width:40%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 13%; float: left; font-size:40px; padding-left: 50%;padding-bottom: 2%;" align="left"><b>Date:</b></div>'
		+'<div style="width: 30%; float: left; font-size:40px;padding-left: 2%;padding-bottom: 2%;" align="left">'
		+$("#bdate").html()
		+'</div></div></div><div style="width: 100%; float: left; font-size:40px; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; font-size:40px; padding-left: 3%;padding-bottom: 2%;" align="left"><b>Income Type:</b></div>'
		+'<div style="width: 75%; float: left; font-size:40px;padding-left: 2%;padding-bottom: 2%;" align="left">'
		+$("#amountPaid").val()
		+'</div></div><div style="width: 100%; float: left; font-size:40px; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left;font-size:40px; padding-left: 3%;padding-bottom: 2%;" align="left"><b>The SUM of Rs.(In Words):</b></div>'
		+'<label style="width: 66%; float: left; font-size:40px;padding-left: 2%;padding-bottom: 2%;" align="left" id="amountinwords">'
		+ $("#amountInWords").val()
		+" Only."+'</label></div><div style="width: 100%; float: left; font-size:40px; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; font-size:40px; padding-left: 3%;padding-bottom: 2%;" align="left"><b>In Cash/Card:</b></div>			<div style="width: 30%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ $("#selAmountType").val()
		+'</div></div><div style="width: 100%; float: left;  font-size:40px;padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; font-size:40px;padding-left: 3%;padding-bottom: 2%;" align="left"><b>Group Name:</b></div>			<div style="width: 75%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ vouName
		+'</div></div><div style="width: 100%; float: left; font-size:40px; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; font-size:40px; padding-left: 3%;padding-bottom: 2%;" align="left"><b>Ledger Head:</b></div>			<div style="width: 75%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ $("#selectLedgerHead").text()
		+'</div></div><div style="width: 100%; float: left; font-size:40px; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; font-size:40px;padding-left: 3%;padding-bottom: 2%;" align="left"><b>Ref To:</b></div>			<div style="width: 30%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ $("#selRefTo").val()
		+'</div></div><div style="width: 100%; float: left; font-size:40px; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; font-size:40px;padding-left: 3%;padding-bottom: 2%;" align="left"><b>Remark:</b></div>			<div style="width: 75%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+$ ("#txtRemark").val()
		+'</div></div><div style="width: 100%; float: left; padding-left: 2%;padding-bottom:7%;" align="left">'
		+'<div style="width: 30%; float: left;font-size:40px;padding-left: 2%;border:0px solid;padding-bottom: 2%;" align="left">'
		+'<div style="width: 30%; float: left; font-size:40px;padding-left: 3%;border:1px solid;padding-bottom: 2%;" align="left">Rs.</div>'
		+'<div style="width: 60%; float: left; font-size:40px;padding-left: 2%;border:1px solid;padding-bottom: 2%;" align="left">'
		+ $("#txtAmount").val()
		+"/-"+'</div></div></div><br></br><br></br><br></br><br></br>'
		+'<div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width:50%; float: left; font-size:40px;padding-left: 6%;" align="left">'
		+'<div style="width: 40%; float: left; font-size:40px;padding-left: 110%;padding-bottom: 2%;" align="left"><b>Payees Sign</b></div>'
		+'<div style="width: 65%; float: left; font-size:40px;padding-left: 90%;padding-bottom: 2%;" align="left">(On behalf of AIMS Hospital)</div></div>'
		+'<div style="width:40%; float: left;font-size:40px;padding-left: 2%;" align="left">'
		+'<div style="width: 30%; float: left; font-size:40px;padding-left: 76%;padding-top: 10%;" align="left"><b>Received By</b></div></div></div></div>');
WindowObject.document.writeln('</body></html>');
WindowObject.document.close();  

WindowObject.focus();

WindowObject.print();

WindowObject.close();

}

function getMaxExpenseID(){
	
var inputs = [];
inputs.push('action=getMaxExpenseID');
var str = inputs.join('&');
jQuery.ajax( {
	async : true,
	type : "POST",
	data : str + "&reqType=AJAX",
	//url : "IPDTreatmentServlet",
	timeout : 1000 * 60 * 5,
	cache : false,
	error : function() {
		alert('error');
	},
	success : function(ajaxResponse) {
		r=ajaxResponse;
		myArray=JSON.parse(ajaxResponse);
		$("#recNo").html(myArray.idipdExpense);
}
});
}

var dischargePatientListTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 95%;margin-left:3%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment ID</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mark</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; " 
	+ "overflow-y:scroll; height: 237px;width:95%;margin-left:3%; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T as dpl}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dpl.patientId}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.dpl.prefix} {$T.dpl.f_name} {$T.dpl.m_name} {$T.dpl.l_name}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dpl.treatmentId}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='radio' name='MARK' id='mark{count}' onClick='showPatientDischargeDetails({$T.dpl.patientId},{$T.dpl.treatmentId})' />"
	+ "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function dischargeSummaryList(){
	var inputs = [];
	inputs.push('action=dischargeSummaryList');
	var str = inputs.join('&');
	jQuery.ajax( {
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipd/dischargeSummaryList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#Discharge").html(r);
			$("#dischargePatientList").setTemplate(dischargePatientListTemp);
			$("#dischargePatientList").processTemplate(r);
			
			//$("#patName").val(r)
		}
	});
}
var temp = 1;
var operationPatientListTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 95%;margin-left:3%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment ID</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Mark</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; " 
	+ "overflow-y:scroll; height: 236px;width:96%;margin-left:3%; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T as dpl}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{temp++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dpl.patient_id}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.dpl.prefix} {$T.dpl.f_name} {$T.dpl.m_name} {$T.dpl.l_name}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dpl.treatment_id}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='radio' name='MARK' id='mark{temp}' onClick='showPatientOperationDetails({$T.dpl.patient_id},{$T.dpl.treatment_id})' />"
	+ "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function operatianSummaryList(){
	var inputs = [];
	inputs.push('action=operatianSummaryList');
	var str = inputs.join('&');
	jQuery.ajax( {
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipd/operatianSummaryList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
           
			$("#Operation").html(r);
			$("#operationPatientList").setTemplate(operationPatientListTemp);
			$("#operationPatientList").processTemplate(r);
		}
	});
}

/*function showPatientDischargeDetails(patId,treatId){
	
	$("#onloadDiv").hide();
	$("#operationPlan").hide();
	$("#dischargePlan").show();
	var ajaxResponse = $("#Discharge").html();

	var myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.dpl.length; i++) {

		if (myArray.dpl[i].trid == treatId && myArray.dpl[i].pi == patId) {
			myObj1 = myArray.dpl[i];
			break;
		}
	}

	$("#dateAdmission").val(myObj1.ipdpl[0].dateAdmission);
	$("#dateExpectedDischarge").val(myObj1.ipdpl[0].dateExpectedDischarge);
	$("#timeExpectedDischarge").val(myObj1.ipdpl[0].dateSet);
	$("#isInformed").val(myObj1.ipdpl[0].isInformed);
	$("#transportArranged").val(myObj1.ipdpl[0].transportArranged);
	$("#transOwnArrvTime").val(myObj1.ipdpl[0].transOwnArrvTime);
	if(myObj1.ipdpl[0].isTDL == 'Y')
	{
		$("#isTDL").attr("checked",true);
	}else{
		$("#isTDL").attr("checked",false);
	}
	if(myObj1.ipdpl[0].isTransportOwnBooked == 'Y')
	{
		$("#isTransportOwnBooked").attr("checked",true);
	}else{
		$("#isTransportOwnBooked").attr("checked",false);
	}

	var tit = myObj1.tit;
	var fn = myObj1.fn;
	var mn = myObj1.mn;
	var ln = myObj1.ln;
	var name = tit+" "+fn+" "+mn+" "+ln;
	$("#patName").html(name);

}*/

function showPatientOperationDetails(patId,treatId){
	$("#scheduledDoctors").html("");
	$("#scheduledProcedure").html("");

	$("#onloadDiv").hide();
	$("#dischargePlan").hide();
	$("#operationPlan").show();
	
	$.ajax({
		
		async : false,
		type : "POST",
		data : { "treatId" : treatId },
		url : "./ehat/otdata/fetchOTDetailsbyTreatmentId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			/*alert("list start time:: "+r.toli[0].st)
			alert("list endtime:: "+r.toli[0].et)
			alert("list date:: "+r.toli[0].dt)
			alert("list date:: "+r.toli[0].otid)
			alert("list date:: "+r.toli[0].diff)*/
			$("#otName").val(r.toli[0].otid);
			$("#oprnDateDetails").val(r.toli[0].dt);
			$("#timeFrom").val(r.toli[0].st);
			$("#timeTo").val(r.toli[0].et);
		//	$("#durationHrs").val(r.toli[0].duration);
			
			var timeFrom = r.toli[0].st;
			var timeTo = r.toli[0].et;
			var diff = r.toli[0].et - r.toli[0].st;
			var diff1=new Date(diff);
			var StartTime=moment(r.toli[0].st,'HH:mm:ss');
			//alert(StartTime);
			var EndTime=moment(r.toli[0].et,'HH:mm:ss');
			var duration=moment.duration(EndTime.diff(StartTime));
			//alert(parseInt(duration.asHours()));
			var Hour=parseInt(duration.asHours());
			var Min=parseInt(duration.asMinutes())%60;
			//alert(Min);
			$("#durationHrs").val(Hour);
			$("#durationMin").val(Min);
			
			
			//added by vishant
			var doctorNames= r.toli[0].treatmentOperationsManageList[0].docnms;
			//$("#scheduledDoctors").text(doctorNames);
			
//			set doctors
			var arrDocName=doctorNames.split(",");
			for ( var i = 1; i < arrDocName.length; i++) {
				var o = new Option("option text", "value");
				// / jquerify the DOM object 'o' so we can use the html method
				$(o).html(arrDocName[i]);
				$(o).val("");
				$("#scheduledDoctors").append(o);
			}
			
			
			if(r.toli[0].schPro == null)
			{
				// set procedure
				var procedures= r.toli[0].treatmentOperationsManageList[0].schPro;
				var arrProcedures = procedures.split("#");
				// $("#scheduledProcedure").val(listProcedure[0]);
				
				var scheduledProcedure = $("#scheduledProcedure").html();
				/*
				 * var arrProcedures = (pobj1.pl[0].listTop[0].schPro)
				 * .split("#");
				 */

				
				for ( var i = 1; i < (arrProcedures.length); i++) {
					var arrPro = (arrProcedures[i]).split("@");
					scheduledProcedure = scheduledProcedure
							+ "<option value='" + arrPro[0] + "'>"
							+ arrPro[1] + "</option>";
				}
				$("#scheduledProcedure").html(scheduledProcedure);
			}else
			{
				var arrProcedures= r.toli[0].treatmentOperationsManageList[0].schPro.split(",");
				var scheduledProcedure = $("#scheduledProcedure").html();
				
				
				for ( var i =1; i <= (arrProcedures.length); i++) {
					var arrPro = r.toli[0].treatmentOperationsManageList[0].schPro.split(",");
					var proName = r.toli[0].schPro.split(",");
					
					scheduledProcedure = scheduledProcedure
							+ "<option value='" + arrPro[i-1] + "'>"
							+ proName[i-1] + "</option>";
				}
				$("#scheduledProcedure").html(scheduledProcedure);
			}
			
			
			
			
		}
		
	});

	/*var ajaxResponse = $("#Operation").html();

	var myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.dpl.length; i++) {

		if (myArray.dpl[i].trid == treatId && myArray.dpl[i].pi == patId) {
			myObj1 = myArray.dpl[i];
			break;
		}
	}

	var tit = myObj1.tit;
	var fn = myObj1.fn;
	var mn = myObj1.mn;
	var ln = myObj1.ln;
	var name = tit+" "+fn+" "+mn+" "+ln;
	$("#pname").html(name);
	$("#otName").val(myObj1.objtrop.otid);
	$("#oprnDateDetails").val(myObj1.objtrop.dt);
	$("#timeFrom").val(myObj1.objtrop.st);
	$("#timeTo").val(myObj1.objtrop.et);

	var timeFrom=myObj1.objtrop.st;
	var timeTo=myObj1.objtrop.et;

	if(timeFrom==""||timeTo==""){
		$("#durationHrs").val("");
		$("#durationMin").val("");
	}
	var date=(myObj1.objtrop.dt)+" ";
	
	
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
	
	//var difference = new Date(new Date(date+timeTo) - new Date(date+timeFrom)).toUTCString().split(" ")[4];
	//var difference = new Date(new Date(date+timeTo) - new Date(date+timeFrom));
	//alert("difference"+difference);

	var arrDifference=difference.split(":");
	$("#durationHrs").val(arrDifference[0]);
	$("#durationMin").val(arrDifference[1]);

	var doc_names = myObj1.objtrop.docnms;
	var arrDocName=doc_names.split(",");
	for ( var i = 1; i < arrDocName.length; i++) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(arrDocName[i]);
		$(o).val("");
		$("#scheduledDoctors").append(o);
	}

	var schPro_names = myObj1.objtrop.schPro;
	var arrProName=schPro_names.split("#");
	for ( var i = 1; i < arrProName.length; i++) {
		var proId_Name = arrProName[i].split("@");
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(proId_Name[1]);
		$(o).val(proId_Name[0]);
		$("#scheduledProcedure").append(o);
	}*/
}

var otNameTemp = '<option value="0">-SELECT-</option>{#foreach $T.liot as liot}<option value="{$T.liot.otid}">{$T.liot.otnm}</option>{#/for}';

function fetchOperationTheaterNames(otid) {

	var inputs = [];
	inputs.push('action=fetchOTName');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipd/fetchOTName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(ajaxResponse) {
			
			//otBean = eval('(' + ajaxResponse + ')');
			$("#otName").setTemplate(otNameTemp);
			$("#otName").processTemplate(ajaxResponse);
		}
	});
}

function dischargeSummaryPrint() {

	var patID = $("#patID").val();
	var treatID = $("#treatID").val();
	var inputs = [];
	inputs.push('action=getDischargeSummary');
	inputs.push('patID=' + patID);
	inputs.push('treatID=' + treatID);
	var str = inputs.join('&');
	jQuery.ajax({
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
			
			var ajaxResponse = r;
			var pobj = eval('(' + ajaxResponse + ')');
			var patientName = (pobj.pl[0].tit +" " + pobj.pl[0].fn + " " +  pobj.pl[0].mn+" "+ pobj.pl[0].ln);
			var regNo = (pobj.pl[0].pi);
			var age = (pobj.pl[0].ag+" "+pobj.pl[0].agtp);
			var sex = (pobj.pl[0].sx);
			var admitDate = (pobj.pl[0].objTreat.treStart);
			var ipdNo = (pobj.pl[0].objTreat.trCount);
			var dischargeDate = $("#dateExpectedDischarge").val();
			var admissionNote = "";
			if ((pobj.pl[0].objTreat.sy) != "undefined") {
				admissionNote = (pobj.pl[0].objTreat.sy);
			}
			var diagnosis = "";
			var riskFactor = "";
			var complication = "";
			var preSymp = "";
			var cliFind = "";
			var specInvest = "";
			var treatmentGiven = "";
			var condDisc = "";
			if((pobj.pl[0].ods) != "") {
				diagnosis = (pobj.pl[0].ods[0].dia);
				riskFactor = (pobj.pl[0].ods[0].rsk);
				complication = (pobj.pl[0].ods[0].cmp); 
				preSymp = (pobj.pl[0].ods[0].psym);
				cliFind = (pobj.pl[0].ods[0].clf);
				specInvest = (pobj.pl[0].ods[0].sinv);
				treatmentGiven = (pobj.pl[0].ods[0].trgiven);
				condDisc = (pobj.pl[0].ods[0].tad);
			}

			// start: Test's
			var investigationTest = "";
			var physiotherapyTest = "";
			var detntalTest = "";
			var pathologyTest = "";
			var casualtyTest = "";
			if(pobj.pl[0].ods[0]!=undefined) {

				if(pobj.pl[0].ods[0].investItem != undefined) {
					var investigationItem=(pobj.pl[0].ods[0].investItem).split(",");
						for ( var i = 0; i < investigationItem.length; i++) {
							var item=investigationItem[i].split("#");
							if(item.length==2){
								investigationTest = investigationTest + item[1] + ", ";
							}
						}
						// replacing \n
						investigationTest = investigationTest.replace(/\n/g, "");
						investigationTest = investigationTest.substring(0, (investigationTest.length - 2));
				}

				if(pobj.pl[0].ods[0].physoItem != undefined) {
					var physoItem = (pobj.pl[0].ods[0].physoItem).split(",");
					for ( var i = 0; i < physoItem.length; i++) {
						var item = physoItem[i].split("#");
						if(item.length==2){
							physiotherapyTest = physiotherapyTest + item[1] + ", ";

						}
					}
					// replacing \n
					physiotherapyTest = physiotherapyTest.replace(/\n/g, "");
					physiotherapyTest = physiotherapyTest.substring(0, (physiotherapyTest.length - 2));
				}

				if(pobj.pl[0].ods[0].dentItem != undefined) {
					var dentItem = (pobj.pl[0].ods[0].dentItem).split(",");
					for ( var i = 0; i < dentItem.length; i++) {
						var item = dentItem[i].split("#");
						if(item.length == 2){
							detntalTest = detntalTest + item[1] + ", ";
						}
					}
					// replacing \n
					detntalTest = detntalTest.replace(/\n/g, "");
					detntalTest = detntalTest.substring(0, (detntalTest.length - 2));
				}

				if(pobj.pl[0].ods[0].dentItem != undefined) {
					var pathoItem=(pobj.pl[0].ods[0].pathoItem).split(",");// alert(pathoItem);
					for ( var i = 0; i < pathoItem.length; i++) {
						var item = pathoItem[i].split("#");
						if(item.length == 2){
							pathologyTest = pathologyTest + item[1] + ", ";
						}
					}
					// replacing \n
					pathologyTest = pathologyTest.replace(/\n/g, "");
					pathologyTest = pathologyTest.substring(0, (pathologyTest.length - 2));
				}

				if(pobj.pl[0].ods[0].dentItem != undefined) {
					var causaItem = (pobj.pl[0].ods[0].causaItem).split(",");
					for ( var i = 0; i < causaItem.length; i++) {
						var item=causaItem[i].split("#");
						if(item.length == 2){
							casualtyTest = casualtyTest + item[1] + ", ";
						}
					}
					// replacing \n
					casualtyTest = casualtyTest.replace(/\n/g, "");
					casualtyTest = casualtyTest.substring(0, (casualtyTest.length - 2));
				}
			}
			// ///////////////////////////////////////////////////////////////////////
			// NICU or Paed Dept.
			var PatientType = $("input:radio[name='PatientType']:checked").val();

			if(PatientType === "PD") {
				// For Paediatric Dept

				var immunizationString = "";
				var arrRL = (pobj.pl[0].ods[0].paediatricDept.immunisation_status).split(",");
				for ( var i = 0; i < arrRL.length; i++) {
					if (arrRL[i + 1] == "Y") {
						immunizationString += ($('input[id=chk' + (i + 1) + ']').val()) + ", ";
					}
				}
				if (immunizationString != "") {
					immunizationString = immunizationString.substring(0, (immunizationString.length - 2));
				}

			} else if(PatientType === "nicuPD") {

				 var rop = (pobj.pl[0].ods[0].PaediatricDeptNicu.ropScreen1).split("*");
				 var ropScreen0 = (rop[0]);
				 var ropScreen1 = (rop[1]);
				 
				 var hear = (pobj.pl[0].ods[0].PaediatricDeptNicu.hearingScreen1).split("*");
				 var hearingScreen0 = (hear[0]);
				 var hearingScreen1 = (hear[1]);
				 
				 var usg = (pobj.pl[0].ods[0].PaediatricDeptNicu.usgBrain1).split("*");
				 var usgBrain0 = (usg[0]);
				 var usgBrain1 = (usg[1]);
				 
				 var ad = (pobj.pl[0].ods[0].PaediatricDeptNicu.adother1).split("*");
				 var adother0 = (ad[0]);
				 var adother1 = (ad[1]);
				 
				 var babysData = "";
				 if((null != (pobj.pl[0].ods[0].PaediatricDeptNicu.babysData)) 
						&& ((pobj.pl[0].ods[0].PaediatricDeptNicu.babysData) != "") 
						&& ((pobj.pl[0].ods[0].PaediatricDeptNicu.babysData) != undefined)) {

					if("undefined" != (pobj.pl[0].ods[0].PaediatricDeptNicu.babysData)) {

						babysData = ((pobj.pl[0].ods[0].PaediatricDeptNicu.babysData)).trim();
						if (babysData === "term") {
							babysData = "Term";
						} else if (babysData === "paga") {
							babysData = "Preterm AGA ";
						} else if (babysData === "sga") {
							babysData = "SGA";
						} else if (babysData === "lgr") {
							babysData = "LGA";
						} else if (babysData === "iugr") {
							babysData = "IUGR";
						}
					}
				 }

				 var deliveryData = "";
				 if((null != pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData) 
						&& (pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData != "") 
						&& (pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData)!= undefined) {

					if("undefined" != (pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData)) {
						deliveryData = ((pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData)).trim();

						if (deliveryData === "nd") {
							deliveryData = "ND";
						} else if (deliveryData === "lscs") {
							deliveryData = "LSCS";
						} else if (deliveryData === "assisted") {
							deliveryData = "Assisted";
						}
					}
				 }

				 var obsProb = "";
				 if(null != (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb) 
						 && (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb) != "" 
							 && (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb) != undefined) {
					 
					 if("undefined" !=pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb) {
						 obsProb = (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb);
						 
						if (obsProb === "pih") {
							 obsProb = "PIH";
						} else if (obsProb === "eclampsia") {
							obsProb = "Eclampsia";
						} else if (obsProb === "poly") {
							obsProb = "Poly"; 
						} else if (obsProb === "oligo") {
							obsProb = "Oligohydramnios, APH, Leak";
						}
					 }
				 }

				 var registration = "";
				 if(null != (pobj.pl[0].ods[0].PaediatricDeptNicu.registration) 
						 && (pobj.pl[0].ods[0].PaediatricDeptNicu.registration) != "" 
							 && (pobj.pl[0].ods[0].PaediatricDeptNicu.registration) != undefined) {
					 
					if("undefined" != (pobj.pl[0].ods[0].PaediatricDeptNicu.registration)) {
						registration = (pobj.pl[0].ods[0].PaediatricDeptNicu.registration);

						if (registration === "registered") {
							registration = "Registered";
						} else if (registration === "unregistered") {
							registration = "Unregistered";
						}
					}
				 }

				 var immunized = "";
				 if(null != (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized) 
						 && (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized) != "" 
							 && (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized) != undefined ) {
					 
					 if("undefined" != (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized)) {
						 immunized = (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized);

						if (immunized === "immunized") {
							immunized = "Immunized";
						} else if (immunized === "unimmunized") {
							immunized = "Unimmunized";
						}
				 	}
				 }
			} // END : if(PatientType == "nicuPD")

			setTimeout(function() {

				var printString = ("DischargeSummaryPrint.jsp?patientName=" + encodeURIComponent(patientName) + "&ipdNo=" + encodeURIComponent(ipdNo)
				+ "&regNo=" + encodeURIComponent(regNo) + "&age=" + encodeURIComponent(age) + "&sex=" + encodeURIComponent(sex)
				+ "&admitDate=" + encodeURIComponent(admitDate) + "&dischargeDate=" + encodeURIComponent(dischargeDate) 
				+ "&admissionNote=" + encodeURIComponent(admissionNote) + "&diagnosis=" + encodeURIComponent(diagnosis) 
				+ "&riskFactor=" +  encodeURIComponent(riskFactor)  
				+ "&complication=" + encodeURIComponent(complication) + "&preSymp=" + encodeURIComponent(preSymp) 
				+ "&cliFind=" + encodeURIComponent(cliFind)  + "&specInvest=" + encodeURIComponent(specInvest)
				+ "&treatmentGiven=" + encodeURIComponent(treatmentGiven) + "&condDisc=" + encodeURIComponent(condDisc) 
				+ "&investigationTest=" + encodeURIComponent(investigationTest)
				+ "&physiotherapyTest=" + encodeURIComponent(physiotherapyTest)+ "&detntalTest=" + encodeURIComponent(detntalTest) 
				+ "&pathologyTest=" + encodeURIComponent(pathologyTest) + "&casualtyTest=" + encodeURIComponent(casualtyTest)
				+ "&PatientType=" + encodeURIComponent(PatientType)
				+ "&patID=" + encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID));

				// some part of data is sent and some part accesed through util
				// directly
				if (PatientType === "PD") {

					printString += ("&immunizationString=" + encodeURIComponent(immunizationString));

				} else if (PatientType === "nicuPD") {

					printString += ("&babysData=" + encodeURIComponent(babysData)
							+ "&deliveryData=" + encodeURIComponent(deliveryData) + "&obsProb="
							+ encodeURIComponent(obsProb) + "&registration="
							+ encodeURIComponent(registration) + "&immunized="
							+ encodeURIComponent(immunized) + "&ropScreen0=" + ropScreen0
							+ "&ropScreen1=" + ropScreen1 + "&hearingScreen0=" + hearingScreen0
							+ "&hearingScreen1=" + hearingScreen1 + "&usgBrain0=" + usgBrain0
							+ "&usgBrain1=" + usgBrain1 + "&adother0=" + adother0 + "&adother1=" + adother1);
				}

				window.open(printString);
			}, 1000);

			// LEFT: buccle no, address Phone, operation note
		} // end: aJax : success
	});
}

function autoSuggestionForMaterialUsed(inputID,type){
	var resultData = [];
// alert("hi...");
	var findingName = $('#' + inputID).val();
	var auto = "fetchItemNameForMaterialUsed"
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
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
				
						ajaxResponse = decodeURIComponent(r);
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
							$("#pathiddenid").val(idValue);
							// alert(template);
								// $("#div" + inputID + " .typeahead").html("");
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

							}, 500);

							/*
							 * if($("#" + inputID).val() == ""){
							 * $(".typeahead").click(function(e) {
							 * e.stopPropagation(); // This is the preferred
							 * method. return false; // This should not be used
							 * unless you do not want }); }
							 */
						}
					});
			function displayResult(item) {

				$('#' + inputID).val((item.text).trim());
				$('#Id' + inputID).val(item.value);
			}
}

function fetchOTNotesByTreatmentId(){

	var treatmentId = $("#treatmentId").val();
	var pid = $("#pid").val();
	var inputs = [];
	inputs.push('action=fetchOTNotes');
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('pid=' + pid);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "OperationServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var response = r;
			$("#OTNotesDiv").html(response);
			var obj = eval('('+response+')');
			var OTNoteTemplate = "";
			for(var j = 0;j<obj.toli.length;j++){
				if(obj.toli[j].fnd != ""){
					OTNoteTemplate = OTNoteTemplate + obj.toli[j].fnd +"\n\n";
				}
			}
			$("#oprNote").val(OTNoteTemplate);
		}
		});
}

function AutoDischargeSummaryPrintOld()
{
	var patID = $("#pid").val();
	var treatID = $("#treatmentId").val();
	var patientNameNew;
	var dischargeDateNew;
	
	var inputs = [];
	inputs.push('action=getDischargeSummary');
	inputs.push('patID=' + patID);
	inputs.push('treatID=' + treatID);
	var str = inputs.join('&');
	jQuery.ajax({
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
			var ajaxResponse = r;
			var pobj = eval('(' + ajaxResponse + ')');
			patientNameNew = (pobj.pl[0].tit +" " + pobj.pl[0].fn + " " +  pobj.pl[0].mn+" "+ pobj.pl[0].ln);
			var regNo = (pobj.pl[0].pi);
			var age = (pobj.pl[0].ag+" "+pobj.pl[0].agtp);
			var sex = (pobj.pl[0].sx);
			var admitDate = (pobj.pl[0].objTreat.treStart);
			var ipdNo = (pobj.pl[0].objTreat.trCount);
			 dischargeDateNew = (pobj.pl[0].objTreat.treEnd);
			var admissionNote = "";
			if ((pobj.pl[0].objTreat.sy) != "undefined") {
				admissionNote = (pobj.pl[0].objTreat.sy);
			}
			var diagnosis = "";
			var riskFactor = "";
			var complication = "";
			var preSymp = "";
			var cliFind = "";
			var specInvest = "";
			var treatmentGiven = "";
			var condDisc = "";
			if((pobj.pl[0].ods) != "") {
				diagnosis = (pobj.pl[0].ods[0].dia);
				riskFactor = (pobj.pl[0].ods[0].rsk);
				complication = (pobj.pl[0].ods[0].cmp); 
				preSymp = (pobj.pl[0].ods[0].psym);
				cliFind = (pobj.pl[0].ods[0].clf);
				specInvest = (pobj.pl[0].ods[0].sinv);
				treatmentGiven = (pobj.pl[0].ods[0].trgiven);
				condDisc = (pobj.pl[0].ods[0].tad);
			}

			// start: Test's
			var investigationTest = "";
			var physiotherapyTest = "";
			var detntalTest = "";
			var pathologyTest = "";
			var casualtyTest = "";
			if(pobj.pl[0].ods[0]!=undefined) {

				if(pobj.pl[0].ods[0].investItem != undefined) {
					var investigationItem=(pobj.pl[0].ods[0].investItem).split(",");
						for ( var i = 0; i < investigationItem.length; i++) {
							var item=investigationItem[i].split("#");
							if(item.length==2){
								investigationTest = investigationTest + item[1] + ", ";
							}
						}
						// replacing \n
						investigationTest = investigationTest.replace(/\n/g, "");
						investigationTest = investigationTest.substring(0, (investigationTest.length - 2));
				}

				if(pobj.pl[0].ods[0].physoItem != undefined) {
					var physoItem = (pobj.pl[0].ods[0].physoItem).split(",");
					for ( var i = 0; i < physoItem.length; i++) {
						var item = physoItem[i].split("#");
						if(item.length==2){
							physiotherapyTest = physiotherapyTest + item[1] + ", ";

						}
					}
					// replacing \n
					physiotherapyTest = physiotherapyTest.replace(/\n/g, "");
					physiotherapyTest = physiotherapyTest.substring(0, (physiotherapyTest.length - 2));
				}

				if(pobj.pl[0].ods[0].dentItem != undefined) {
					var dentItem = (pobj.pl[0].ods[0].dentItem).split(",");
					for ( var i = 0; i < dentItem.length; i++) {
						var item = dentItem[i].split("#");
						if(item.length == 2){
							detntalTest = detntalTest + item[1] + ", ";
						}
					}
					// replacing \n
					detntalTest = detntalTest.replace(/\n/g, "");
					detntalTest = detntalTest.substring(0, (detntalTest.length - 2));
				}

				if(pobj.pl[0].ods[0].dentItem != undefined) {
					var pathoItem=(pobj.pl[0].ods[0].pathoItem).split(",");// alert(pathoItem);
					for ( var i = 0; i < pathoItem.length; i++) {
						var item = pathoItem[i].split("#");
						if(item.length == 2){
							pathologyTest = pathologyTest + item[1] + ", ";
						}
					}
					// replacing \n
					pathologyTest = pathologyTest.replace(/\n/g, "");
					pathologyTest = pathologyTest.substring(0, (pathologyTest.length - 2));
				}

				if(pobj.pl[0].ods[0].dentItem != undefined) {
					var causaItem = (pobj.pl[0].ods[0].causaItem).split(",");
					for ( var i = 0; i < causaItem.length; i++) {
						var item=causaItem[i].split("#");
						if(item.length == 2){
							casualtyTest = casualtyTest + item[1] + ", ";
						}
					}
					// replacing \n
					casualtyTest = casualtyTest.replace(/\n/g, "");
					casualtyTest = casualtyTest.substring(0, (casualtyTest.length - 2));
				}
			}
			// ///////////////////////////////////////////////////////////////////////
			// NICU or Paed Dept.
			var PatientType = $("input:radio[name='PatientType']:checked").val();

			if(PatientType == "PD") {
				// For Paediatric Dept

				var immunizationString = "";
				var arrRL = (pobj.pl[0].ods[0].paediatricDept.immunisation_status).split(",");
				for ( var i = 0; i < arrRL.length; i++) {
					if (arrRL[i + 1] == "Y") {
						immunizationString += ($('input[id=chk' + (i + 1) + ']').val()) + ", ";
					}
				}
				if (immunizationString != "") {
					immunizationString = immunizationString.substring(0, (immunizationString.length - 2));
				}

			} else if(PatientType == "nicuPD") {

				 var rop = (pobj.pl[0].ods[0].PaediatricDeptNicu.ropScreen1).split("*");
				 var ropScreen0 = (rop[0]);
				 var ropScreen1 = (rop[1]);
				 
				 var hear = (pobj.pl[0].ods[0].PaediatricDeptNicu.hearingScreen1).split("*");
				 var hearingScreen0 = (hear[0]);
				 var hearingScreen1 = (hear[1]);
				 
				 var usg = (pobj.pl[0].ods[0].PaediatricDeptNicu.usgBrain1).split("*");
				 var usgBrain0 = (usg[0]);
				 var usgBrain1 = (usg[1]);
				 
				 var ad = (pobj.pl[0].ods[0].PaediatricDeptNicu.adother1).split("*");
				 var adother0 = (ad[0]);
				 var adother1 = (ad[1]);
				 
				 var babysData = "";
				 if((null != (pobj.pl[0].ods[0].PaediatricDeptNicu.babysData)) 
						&& ((pobj.pl[0].ods[0].PaediatricDeptNicu.babysData) != "") 
						&& ((pobj.pl[0].ods[0].PaediatricDeptNicu.babysData) != undefined)) {

					if("undefined" != (pobj.pl[0].ods[0].PaediatricDeptNicu.babysData)) {

						babysData = ((pobj.pl[0].ods[0].PaediatricDeptNicu.babysData)).trim();
						if (babysData === "term") {
							babysData = "Term";
						} else if (babysData === "paga") {
							babysData = "Preterm AGA ";
						} else if (babysData === "sga") {
							babysData = "SGA";
						} else if (babysData === "lgr") {
							babysData = "LGA";
						} else if (babysData === "iugr") {
							babysData = "IUGR";
						}
					}
				 }

				 var deliveryData = "";
				 if((null != pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData) 
						&& (pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData != "") 
						&& (pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData)!= undefined) {

					if("undefined" != (pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData)) {
						deliveryData = ((pobj.pl[0].ods[0].PaediatricDeptNicu.deliveryData)).trim();

						if (deliveryData === "nd") {
							deliveryData = "ND";
						} else if (deliveryData === "lscs") {
							deliveryData = "LSCS";
						} else if (deliveryData === "assisted") {
							deliveryData = "Assisted";
						}
					}
				 }

				 var obsProb = "";
				 if(null != (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb) 
						 && (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb) != "" 
							 && (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb) != undefined) {
					 
					 if("undefined" !=pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb) {
						 obsProb = (pobj.pl[0].ods[0].PaediatricDeptNicu.obsProb);
						 
						if (obsProb === "pih") {
							 obsProb = "PIH";
						} else if (obsProb === "eclampsia") {
							obsProb = "Eclampsia";
						} else if (obsProb === "poly") {
							obsProb = "Poly"; 
						} else if (obsProb === "oligo") {
							obsProb = "Oligohydramnios, APH, Leak";
						}
					 }
				 }

				 var registration = "";
				 if(null != (pobj.pl[0].ods[0].PaediatricDeptNicu.registration) 
						 && (pobj.pl[0].ods[0].PaediatricDeptNicu.registration) != "" 
							 && (pobj.pl[0].ods[0].PaediatricDeptNicu.registration) != undefined) {
					 
					if("undefined" != (pobj.pl[0].ods[0].PaediatricDeptNicu.registration)) {
						registration = (pobj.pl[0].ods[0].PaediatricDeptNicu.registration);

						if (registration === "registered") {
							registration = "Registered";
						} else if (registration === "unregistered") {
							registration = "Unregistered";
						}
					}
				 }

				 var immunized = "";
				 if(null != (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized) 
						 && (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized) != "" 
							 && (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized) != undefined ) {
					 
					 if("undefined" != (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized)) {
						 immunized = (pobj.pl[0].ods[0].PaediatricDeptNicu.immunized);

						if (immunized === "immunized") {
							immunized = "Immunized";
						} else if (immunized === "unimmunized") {
							immunized = "Unimmunized";
						}
				 	}
				 }
			} // END : if(PatientType == "nicuPD")

			setTimeout(function() {

				var printString = ("AutoDischargeSummaryPrint.jsp?patientName=" +patientNameNew+ "&ipdNo=" + encodeURIComponent(ipdNo)
				+ "&regNo=" + encodeURIComponent(regNo) + "&age=" + encodeURIComponent(age) + "&sex=" + encodeURIComponent(sex)
				+ "&admitDate=" + encodeURIComponent(admitDate) + "&dischargeDate=" +dischargeDateNew+ "&admissionNote=" + encodeURIComponent(admissionNote) + "&diagnosis=" + encodeURIComponent(diagnosis) 
				+ "&riskFactor=" +  encodeURIComponent(riskFactor)  
				+ "&complication=" + encodeURIComponent(complication) + "&preSymp=" + encodeURIComponent(preSymp) 
				+ "&cliFind=" + encodeURIComponent(cliFind)  + "&specInvest=" + encodeURIComponent(specInvest)
				+ "&treatmentGiven=" + encodeURIComponent(treatmentGiven) + "&condDisc=" + encodeURIComponent(condDisc) 
				+ "&investigationTest=" + encodeURIComponent(investigationTest)
				+ "&physiotherapyTest=" + encodeURIComponent(physiotherapyTest)+ "&detntalTest=" + encodeURIComponent(detntalTest) 
				+ "&pathologyTest=" + encodeURIComponent(pathologyTest) + "&casualtyTest=" + encodeURIComponent(casualtyTest)
				+ "&PatientType=" +PatientType
				+ "&patID=" + encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID));

				// some part of data is sent and some part accesed through util
				// directly
				if (PatientType === "PD") {

					printString += ("&immunizationString=" + encodeURIComponent(immunizationString));

				} else if (PatientType === "nicuPD") {

					printString += ("&babysData=" + encodeURIComponent(babysData)
							+ "&deliveryData=" + encodeURIComponent(deliveryData) + "&obsProb="
							+ encodeURIComponent(obsProb) + "&registration="
							+ encodeURIComponent(registration) + "&immunized="
							+ encodeURIComponent(immunized) + "&ropScreen0=" + ropScreen0
							+ "&ropScreen1=" + ropScreen1 + "&hearingScreen0=" + hearingScreen0
							+ "&hearingScreen1=" + hearingScreen1 + "&usgBrain0=" + usgBrain0
							+ "&usgBrain1=" + usgBrain1 + "&adother0=" + adother0 + "&adother1=" + adother1);
				}

				window.open(printString);
			}, 1000);

			// LEFT: buccle no, address Phone, operation note
		} // end: aJax : success
	});
}

function AutoDischargeSummaryPrint()
{
	// by husen goundi modified @date 18 nov 2015
	var dischargedate = $("#discharge_date").val();
	if(dischargedate == ""){
		alert("Please save discharge summary then print");
		return false;
	}else{
		//alert(dischargedate);
		var dischargetime = $("#discharge_Time").val();
		var date = dischargedate.split("/");
		var newdate = date[0]+"-"+date[1]+"-"+date[2] + " " + dischargetime + ":00";
		
		var patID = $("#pid").val();
		var treatID = $("#tid").val();
		var patientNameNew;
		var dischargeDateNew;
		var discharge_Type = $("#discharge_Type").val();
		var tomId = $("#idSelOperationData").val(); //By Pooja
		var shraddhaFlow=  $("#shraddhaFlow").val();

		if(shraddhaFlow=="on"){
			var divfollow = $("#divfollowDate").html(); //By Pooja

			var tomId = $("#idSelOperationData").val(); //By Pooja

			window.open("AutoDischargeSummaryPrintDIS.jsp?"+"patID=" +
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
					+"&dischargedate="+encodeURIComponent(newdate) + "&divfollow="+ divfollow +"&opdlab=");
			
		}else{
		window.open("AutoDischargeSummaryPrint.jsp?"+ "&patID=" +
				encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&tomId="+encodeURIComponent(tomId)
				+"&dischargedate="+encodeURIComponent(newdate)+"&discharge_Type="+encodeURIComponent(discharge_Type));
		}
	}
}

/*******************************************************************************
 * @Kishor
 * @date 26_Oct_2017 
 * @code This method is used to fetch records of AutoDischargeSummaryPrint.
 ******************************************************************************/ 
function AutoDischargeSummaryPrintforIpd(callfrom)
{
	// by husen goundi modified @date 18 nov 2015
	var dischargedate = $("#discharge_date").val();
	if(dischargedate == ""){
		alert("Please save discharge summary then print");
		return false;
	}else{
		
		var discharge_Time = $("#discharge_Time").val();
		var timeDate=dischargedate +"  "+ discharge_Time;
		var patID = $("#pt_Id").val();
		var treatID = $("#treatmentId").val();
		var tomId = $("#tomId").val(); //By Pooja
		
		var divfollow = $("#divfollowDate").html(); //By Pooja
		var discharge_Type = $("#discharge_Type").val();
		var shraddhaFlow=  $("#shraddhaFlow").val();
		if(shraddhaFlow=="on"){
			$("#iPrintDsPopUpOPD").show('show');
/*
			window.open("AutoDischargeSummaryPrintDIS.jsp?"+"patID=" +
					encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
					+"&dischargedate="+encodeURIComponent(timeDate) + "&divfollow="+ divfollow);*/
			
		}else{
			var type ="";
			var language = "ENGLISH";

			if(callfrom=="HF"){
				type=  $('input[name="printType"]:checked').val();
				language = $('input[name="langDSAllPrint"]:checked').val();
				
				var paediatric= true;//$("#paediatric").is(":checked");
				
				window.open("AutoDischargeSummaryPrintNew.jsp?"+"patID=" +
						encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
						+"&dischargedate="+encodeURIComponent(timeDate)+"&language="+language +"&type="+type+ "&callfrom="+callfrom+ "&paediatric="+ encodeURIComponent(paediatric));
				type=  $('input[name="printType"]:checked').val();
				language = $('input[name="langDSAllPrint"]:checked').val();
				
			}else if(callfrom=="Services"){
				type       =  $("#checkAll").is(":checked");
				if(type==true){
					type="allPrint";   /* modify by ajay:29/08/2019 previous
										  code only "all" then change
										 "allprint" resons:  if chehcked all
										  then remove some chehcked then some
										  problem find */
				}
				language   = $('input[name="langDSCheckAllPrint"]:checked').val();
				var adNote =$("#admissionNote").is(":checked");
				var history=$("#history").is(":checked");
				var investigation=$("#invest").is(":checked");
				var treatment=$("#treatment").is(":checked");
				var otNotes=$("#otNotes").is(":checked");
				var dischargeCond=$("#dischrCond").is(":checked");
				var treatDischarge=$("#treatDischrge").is(":checked");
				var paediatric=$("#paediatric").is(":checked");
				var drRound=$("#drRound").is(":checked");
				window.open("AutoDischargeSummaryPrintNew.jsp?"+"patID=" +
						encodeURIComponent(patID) + "&treatID=" 
						+ encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)
						+  "&tomId="+encodeURIComponent(tomId)
						+  "&dischargedate="+encodeURIComponent(timeDate)
						+  "&language="+language 
						+  "&type="+type
						+  "&adNote="+ encodeURIComponent(adNote)
						+ "&history="+ encodeURIComponent(history)
						+ "&investigation="+ encodeURIComponent(investigation)
						+ "&treatment="+ encodeURIComponent(treatment)
						+ "&otNotes="+ encodeURIComponent(otNotes)
						+ "&dischargeCond="+ encodeURIComponent(dischargeCond)
						+ "&treatDischarge="+ encodeURIComponent(treatDischarge)
						+ "&paediatric="+ encodeURIComponent(paediatric)
						+ "&drRound="+ encodeURIComponent(drRound)
						+ "&callfrom="+callfrom);
			}else if(callfrom=="all"){
				type= "all";
				window.open("AutoDischargeSummaryPrintNew.jsp?"+"patID=" +
						encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
						+"&dischargedate="+encodeURIComponent(timeDate)+"&language="+language +"&type="+type+ "&callfrom="+callfrom);
			}
				
		
		}

		
	}
	
}

/*
function updateAdmissionNote(){
	
	
//	var patID = $("#pid").val();
///	var treatID = $("#treatmentId").val();
	
	
	var patID = $("#pt_Id").val();
	var treatID = $("#tr_Id").val();  
	
	var note = $("#ipd_adnote").val();
	// alert(note);
	var inputs = [];
	inputs.push('action=updateAdmissionNote');
	inputs.push('patID=' + patID);
	inputs.push('treatID=' + treatID);
	inputs.push('note=' + encodeURIComponent(note));
	var str = inputs.join('&');
	jQuery.ajax({
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
			var ajaxResponse = r;
			alert(ajaxResponse);
		}
	});
}
*/
// @codeBy:Touheed @codeDate:18-Jan-2016 (For Saving Nursing Notes Master)
function saveNursingNotes(){
	var btnName = $("#btnName").val();
	var nurId = $("#nurId").val();
	var nurText = $("#nurText").val();
	var headNote = $("#headNote").val();
	if(btnName=="save"){
		nurId=0;
	}
	if(headNote==""){
		alert("Please enter Heading Note.");
		SetFocus("headNote");
		return false;
	}
	if(nurText==""){
		alert("Please enter Notes.");
		SetFocus("nurText");
		return false;
	}
	var inputs = [];
	inputs.push('action=saveNursingNotes');
	inputs.push('nurId='+nurId);
	inputs.push('headNote='+headNote);
	inputs.push('nurText='+nurText);
	var str = inputs.join('&');
	jQuery.ajax({
			async : true,
			type : "POST",
			data :{
				noteId:nurId,
				headNote:headNote,
				notes:nurText
			},
			url : "./ehat/ipdmaster/saveNursingNotes",
			timeout : 1000*60*5,
			cache : false,
			error : function(){
				alert('error');
			},
			success : function(r){
				alert(r);
				window.location.reload(true);
			}
	});
}

// Touheed created template for Nursing Notes
var rtCount = 1;
var nursingNotesTemp = "{#foreach $T as nl}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{rtCount++}.</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.nl.noteId}</td>"
		+ "<td class='col-md-3-1' style='height: 21.5px;'>{$T.nl.headNote}</td>"
		+ "<td class='col-md-3-1' style='height: 21.5px;'>{$T.nl.notes}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' onclick='editNursingNotes({$T.nl.noteId})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' onClick='deleteNursingNotes({$T.nl.noteId})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}";
		
		
// Touheed created template for Nursing Notes
var rtCount2 = 1;
var nursingNotesTemp2 = "{#foreach $T as nl}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{rtCount2++}.</td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.nl.noteId}</td>"
		+ "<td class='col-md-3-1' style='height: 21.5px;'>{$T.nl.headNote}</td>"
		+ "<td class='col-md-3-1' style='height: 21.5px;'>{$T.nl.notes}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' onclick='editNursingNotes({$T.nl.noteId})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' onClick='deleteNursingNotes({$T.nl.noteId})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}";		


// Touhedd template for heading in the ipd_nursing station
var headingNotestemp = "<option value='0'>-select-</option>{#foreach $T.nlist as dl} <option value='{$T.dl.nid}'>{$T.dl.hedn}</option>{#/for}";

//Manisha template for heading note in the ipd_nursing station
var Notestemp = "<option value='0'>-select-</option>{#foreach $T.nlist as dl} <option value='{$T.dl.nid}'>{$T.dl.notes}</option>{#/for}";


// @codeBy:Touheed @codeDate:18-Jan-2016 (For fetch Nursing Notes Master)
function fetchAllNursingNotes(pageType , search, rowid) {

	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if(searhFlag == "search")
	{
		if(searchText == "")
		{
			alert("Please Enter Notes");
			SetFocus("byName");
			return false;
		}
	}
	var inputs = [];
	//inputs.push('action=fetchAllNursingNotes');
	//inputs.push('pageType=' + encodeURIComponent(pageType));
	//inputs.push('searhFlag=' + searhFlag);
	inputs.push('search=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str ,
		url : "./ehat/ipdmaster/searchNursingNotes",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#nursingnotesAjax").html(JSON.stringify(r));
			ajaxResponse = r;
			
			//$("#nursingnotesAjax").html(ajaxResponse);
			//alert(ajaxResponse);
			var obj = ajaxResponse;
			rtCount = 1;
				$("#nursingNoteTable").setTemplate(nursingNotesTemp);
				$("#nursingNoteTable").processTemplate(obj);
				
				if(pageType=="IPD_NursingStation"){
					
						$("#"+rowid).setTemplate(headingNotestemp);
						$("#"+rowid).processTemplate(obj);
				}
				
				if(pageType=="temp"){
					$("#headNote"+search).setTemplate(headingNotestemp);
					$("#headNote"+search).processTemplate(obj);
				}
				
				if(searhFlag == "search"){
					//$("#byName").val("");
				}
				setTimeout(function(){userAccess();},100);
		}
	});
}

// @codeBy:Touheed @codeDate:20-Mar-2020 (For fetch Nursing Notes Master)
function fetchAllNursingNotesNew() {
	jQuery.ajax({
		async : true,
		type : "GET",
		//data : str + "&reqType=AJAX",
		url : "./ehat/ipdmaster/fetchNursingNotes",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#nursingnotesAjax").html(JSON.stringify(r));
			//var obj = eval('(' + ajaxResponse + ')');
			rtCount2 = 1;
				$("#nursingNoteTable").setTemplate(nursingNotesTemp2);
				$("#nursingNoteTable").processTemplate(r);
				setTimeout(function(){userAccess();},100);
		}
	});
}

// @codeBy:Touheed @codeDate:18-Jan-2016 (For edit Nursing Notes Master)
function editNursingNotes(id){
	$("#btnName").val("eidt");
	var ajaxResponse = $("#nursingnotesAjax").html();
	var myArray = eval('(' + ajaxResponse + ')');
	for ( var i = 0; i < myArray.length; i++) {
		if (myArray[i].noteId == id) {
			$("#nurId").val(myArray[i].noteId);
			$("#headNote").val(myArray[i].headNote);
			$("#nurText").val(myArray[i].notes);
			break;
		}
	}
	
}

// @codeBy:Touheed @codeDate:18-Jan-2016 (For delete Nursing Notes Master)
function deleteNursingNotes(id){
	
	var r = confirm("Are you confirm to delete Note?");

	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteNursingNotes');
		inputs.push('id=' + encodeURIComponent(id));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "DELETE",
			//data : str + "&reqType=AJAX",
			url : "./ehat/ipdmaster/deletehNursingNotes/"+id,
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				window.location.reload();
			}
		});
	}
}

// @codeBy:Touheed @codeDate:18-Jan-2016 (For delete Nursing Notes Auto
// Increment Id)
function getNextNursingNotesId(){
	var inputs = [];
	inputs.push('action=getNextNursingNotesId');
	inputs.push('tableName=nursing_notes');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			$("#nurId").val(r);
		}
	});
}




// //@codeBy:Touheed @codeDate:19-Jan-2016 (For AutoSuggestion Nursing Notes)
function setAutoNursingNotes(inputID, onload, callFrom) {
	
	
	var resultData = [];
	var findingName = $("#" + inputID).val();
	var autoType = '';
	var auto = '';
	if (callFrom == "nursingNotes") {
		auto = 'notes';
	} else if (callFrom == "IPD_NursingStation") {
		auto = 'notes';
	} 
	
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('q=' + findingName);
	inputs.push('autoType=' + autoType);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AutoSuggetionServlet",
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
					
				//	alert(ajaxResponse);
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
					$("#pathiddenid").val(idValue);
					
					$("#" + inputID ).html(template);
					$("#" + inputID ).show();
					setTimeout(function() {
						$("#" + inputID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputID).data('typeahead').source = resultData;
					}, 00);
				}
			});
	function displayResult(item) {
		$("#" + inputID).val((item.text).trim());
		$("#txtDoctorId").val((item.value).trim());
  }

}

/***********
 * @author	: Touheed Khan
 * @date	: 06-June-2016
 * @reason	: Creating template to be  administrative(Nurse have to give)
 */
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();    
var curntdate =((''+day).length<2 ? '0' : '') + day+ '/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear() ;
var curdate = curntdate;

var countmedi =1;
var medicationAdministrativeTemp = "{#foreach $T.ipdNursingMedicationList as ipl}"
	+ "{#if $T.ipl.administrativeStatus=='N'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{countmedi}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.ipl.druges_doses}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.prep}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.ipl.instruction}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.timeslot}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.time}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.currentDays}/{$T.ipl.totaldays}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.currentDate}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.doseType}/{$T.ipl.unit}</td>"
	+ "{#if $T.ipl.currentDate == curdate}"
	+ "<td class='col-md-1-1 center'><input id='checkboxToBeAdmins{$T.ipl.idipd_nursingStation_medication_dashboard}' type='checkbox' value ='{$T.ipl.idipd_nursingStation_medication_dashboard}' name='checkBoxNursingAdmins' style='margin-top: 2px;'></td>"
	+ "{#/if}"
	+ "{#if $T.ipl.currentDate != curdate}"
	+ "<td class='col-md-1-1 center'><input id='checkboxToBeAdmins{$T.ipl.idipd_nursingStation_medication_dashboard}' type='checkbox' value ='{$T.ipl.idipd_nursingStation_medication_dashboard}' name='checkBoxNursingToBeAdmins' style='margin-top: 2px;'  disabled='disabled'></td>"
	+ "{#/if}"
	+ "{countmedi++}"
	+ "</tr>{#/if}{#/for}";


/***********
 * @author	: Touheed Khan
 * @date	: 06-June-2016
 * @reason	: Creating template for administrated (Nurse given)
 */
var d = new Date();

var month = d.getMonth()+1;
var day = d.getDate();    
var curntdate =((''+day).length<2 ? '0' : '') + day+ '/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear() ;
var curdate = curntdate;
var countmed =1;
var medicationAdministratedTemp = "{#foreach $T.ipdNursingMedicationList as ipl}"
	+ "{#if $T.ipl.administrativeStatus=='Y'}"
	+ "<tr>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{countmed}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.ipl.druges_doses}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.prep}</td>"
	+ "<td class='col-md-2-1 center' style='height: 21.5px;'>{$T.ipl.instruction}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.timeslot}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.time}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.currentDays}/{$T.ipl.totaldays}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.currentDate}</td>"
	+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{$T.ipl.doseType}/{$T.ipl.unit}</td>"
	+ "{#if $T.ipl.currentDate == curdate}"
	+ "<td class='col-md-1-1 center'><input id='checkboxAdmins{$T.ipl.idipd_nursingStation_medication_dashboard}' type='checkbox' value ='{$T.ipl.idipd_nursingStation_medication_dashboard}' name='checkBoxNursingAdmins' style='margin-top: 2px;'></td>"
	+ "{#/if}"
	+ "{#if $T.ipl.currentDate != curdate}"
	+ "<td class='col-md-1-1 center'><input id='checkboxToBeAdmins{$T.ipl.idipd_nursingStation_medication_dashboard}' type='checkbox' value ='{$T.ipl.idipd_nursingStation_medication_dashboard}' name='checkBoxNursingToBeAdmins' style='margin-top: 2px;'  disabled='disabled'></td>"
	+ "{#/if}"
	+"{countmed++}"
	+ "</tr>{#/if}{#/for}";

/***********
 * @author	: Touheed Khan
 * @date	: 06-June-2016
 * @reason	: Fetching medication Instruction for current day only
 */
function fetchNursingMedication(callfrom){
	var todayDate ="";
	var  treatmentId = $("#tid").val();
	if(callfrom=="onload"){
		//todayDate = $("#OFdate-pick").val();
		var d = new Date();

		var month = d.getMonth()+1;
		var day = d.getDate();    
	   var curntdate =((''+day).length<2 ? '0' : '') + day+ '/'+ ((''+month).length<2 ? '0' : '') + month + '/' + d.getFullYear() ;
	   todayDate = curntdate;
	}else{
		todayDate = $("#OFdate-pick").val();
	}
	var inputs = [];
	//inputs.push('action=fetchNursingMedication');
	inputs.push("todayDate=" + todayDate);
	inputs.push("callfrom=" + callfrom);
	inputs.push("treatmentId=" + treatmentId);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "IPDTreatmentServlet",
		url : "./ehat/ipdhistory/fetchNursingMedication",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//$("#orderFormContentAdministrative").val();

			ajaxResponse = r;
			//alert(r);
			countmed =1;
			countmedi =1
			//to be Administrated
			//otBean = eval('(' + ajaxResponse + ')');
			otBean = ajaxResponse ;
			$("#orderFormContentAdministrative").setTemplate(medicationAdministrativeTemp);
			$("#orderFormContentAdministrative").processTemplate(otBean);
			
			//Administrated
			$("#orderFormContentAdministrated").setTemplate(medicationAdministratedTemp);
			$("#orderFormContentAdministrated").processTemplate(otBean);
		}
	});
}
/***********
 * @author	: Touheed Khan
 * @date	: 06-June-2016
 * @reason	: Done reverse functionality medication Instruction for current day only
 */
function administratedDoneReverse(callfrom){
	
	var nursingMediIds = new Array();
	if(callfrom == "Done"){
		$('#orderFormContentAdministrative tr').each(
				function() {
					
					var nrmediID = $(($(this).find('input[name=prepTreatmentMedicineCheckbox]:checked'))).attr('value');
					var nmID = $(($(this).find('#checkboxToBeAdmins' + nrmediID))).val();
					
					if (nmID != undefined && nmID != "0") {
						nursingMediIds.push(nmID);
					}
				});
			
	}else{
		$('#orderFormContentAdministrated tr').each(
				function() {
					
					var nrmediID = $(($(this).find('input[name=prepTreatmentMedicineCheckbox]:checked'))).attr('value');
					var nmID = $(($(this).find('#checkboxToBeAdmins' + nrmediID))).val();
					
					if (nmID != undefined && nmID != "0") {
						nursingMediIds.push(nmID);
					}
				});
	}
	if ((nursingMediIds.length) == 0) {
		alert("Please check atleat one checkbox To "+callfrom+" Medication..!");
		return false;
	}
	
var r = confirm("Please confirm to "+callfrom+" Medication?");
	
	if(r==false){
		return false;
	}
	
	var treatmentId = $("#tid").val();
	//var treatmentId = $("#treatmentId").val();
	var inputs = [];
	inputs.push('action=administratedDoneReverse');
	inputs.push('nursingMediIds=' + nursingMediIds);
	inputs.push('callfrom=' + callfrom);
	inputs.push('treatmentId=' + treatmentId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "IPDTreatmentServlet",
		url :"./ehat/ipdhistory/saveAdministratedDoneReverse",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			//alert(r);
			if(r==1){
				alert(" Medication Administrated Done successfully.");
			}
			else if(r==2){
				alert(" Medication Administrated Reverse successfully.")
			}
			else{
				alert("error");
			}
			 countmed =1;
			 countmedi =1;
			//fetchNursingMedication("onload");
			 getAllPrescriptionsForMedication();
		}
	});
}



/***********
 * @author	: Manisha Padghankar
 * @date	: 28-Sept-2016
 * @reason	: Medicine Chart
 */
function setDrugViewChartNew(){
   
	sr = 1;
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var CurrentDate = $("#date-pickDrug").val();
  
	/*
	 * if(CurrentDate < AdmissionDate){
	 * 
	 * alert("Please Select after admission date... ");
	 * 
	 * }else{
	 */
		
	var dType = $("#dType :selected").val();
	
	if (dType == "MedicineChart" || dType == undefined) {
		
		$("#addDrugDiv").show();
		$("#remDrugDiv").show();
		fillDrugChart($("#date-pickDrug").val());
		
		$("#Drugtimes").hide();
		$("#DrugAdminSheetContent").show();
	}
	
	
	if (dType == "Select") {
		$("#addDrugDiv").hide();
		$("#remDrugDiv").hide();
		$("#Drugtimes").hide();
		$("#times").hide();
		$("#DrugAdminSheetContent").hide();
		
		
	} 
}

var drugCount=1;
var DrugAdminSheetTemp ="<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='' style='height: 21.5px; width: 3.05%;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Time</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Drug Name</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Strength</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dose</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Quantity</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Route</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Frequency</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Sign</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; height: 425px; max-height: auto;'>"
	+ "<table class='table table-condensed table-bordered table-stripped cf' style='width : 100%;'>"
	+ "<tbody id='DrugDiv'>"
	+ "{#foreach $T.druglist as tnl}"
	+ "<tr id='div{drugCount}'>"
	+ "<td  style='height: 21.5px;  width: 3.05%; '>{drugCount}.</td>"
	+ "<td  class='col-sm-1-1' style='height: 21.5px; '>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='time{drugCount}' id='time{drugCount}' value='{$T.tnl.DT}' /></td>"
	+ "<td class='col-sm-2-1' style='height: 21.5px;' id='sel{rowCount}'><input class='form-control input-SmallText TextFont' style='font-size: 11px;'  name='drugName{drugCount}' id='drugName{drugCount}' value='{$T.tnl.DName}' /></td>"
	+ "<td  class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='strength{drugCount}' id='strength{drugCount}' value='{$T.tnl.DS}' onkeypress='makeUserselect({drugCount},\"NSDocName{drugCount}\")' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='dose{drugCount}' id='dose{drugCount}' value='{$T.tnl.DD}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='qty{drugCount}' id='qty{drugCount}' value='{$T.tnl.DQ}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='route{drugCount}' id='route{drugCount}' value='{$T.tnl.DR}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='frequency{drugCount}' id='frequency{drugCount}' value='{$T.tnl.DF}' /></td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;' id='sign'><select style='font-size: 11px; margin-top:1%;' class='col-sm-10-1 form-control input-SmallText TextFont' name='NSDocName{drugCount}' id='NSDocName{drugCount}' onclick='setDoctorTempleteOnLoad((this.id),{drugCount}); this.onclick=null;' onchange='savePharmaMedicine(($(this).val()),{drugCount},(this.id))'> <option selected=selected value='{$T.tnl.nid}'>{$T.tnl.nname}</option></select>"
	+ "<input type='checkbox' id='Medcheckbox' name='Medcheckbox{drugCount++}' value='{$T.tnl.tnid}'></td>"
	+ "</tr>"
	+ "<input type='hidden' value='{$T.tnl.nid}' id='nid{rowCount}' />"
	+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
	+ "{#/for} " + "<input type='hidden' value='' id='addDrugRowCount' />"
	+ "<input type='hidden' value='{--rowCount}' id='RowCount' />"
	+ "</tbody>" + "</table>" + "</div>";
	


function toCreateDrugDiv(){
	
	var userType = $("#userType").val();

	var rowCount = $("#mRow").val();
	var addrowCount = $("#addDrugRowCount").val();
	

	if (addrowCount != 0) {

		var tm = $("#time" + addrowCount + "").val();
		var note = $("#DrugName" + addrowCount + "").val();

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
	divId = "divD" + rowCount;
	//divId = "Drugdiv" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("DrugDiv").appendChild(x);

	document.getElementById(divId).innerHTML = '<td  style="height: 21.5px;  width: 3%; text-align: center;"><label class="TextFont">'
			+ rowCount
			+ '</label></td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" class="form-control input-SmallText TextFont" name="textfield" id="time'
			+ rowCount
			+ '" value="" readonly="readonly" /></td>'
			+ '<td class="col-sm-2-1" style="height: 21.5px; id="sel'
			+ rowCount
			+ '"><input style="font-size: 11px;" class="form-control input-SmallText TextFont"  name="drugName' 
			+ rowCount
			+ '" value="" onkeypress = "autoSuggestionForPharmacyMedicine(this.id,onchange)" id="drugName'
			+ rowCount
			+ '"/></td>'
			+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateNumbers(event)"  class="form-control input-SmallText TextFont" name="textfield" id="strength'
			+ rowCount
			+ '" value="" onkeypress="return validateNumbers(event)"/>'
			+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText TextFont" name="textfield" id="dose'
			+ rowCount
			+ '" value="" onkeypress="return validateNumbers(event)" />'
			+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText TextFont" name="textfield" id="qty'
			+ rowCount
			+ '" value=""  />'
			+ '</td><td class="col-sm-1-1 center" style="height: 21.5px; "><input type="text" onkeypress="return validateAlphabetsByRegEx(this.id)" class="form-control input-SmallText TextFont" name="textfield" id="route'
			+ rowCount
			+ '" value="" />'
			+ '<td class="col-sm-1-1 center" style="height: 21.5px;"><input type="text" onkeypress="return validateNumbers(event)" class="form-control input-SmallText TextFont auto" name="textfield" onkeypress="return validateComma(event)"'
			+ ')"  id="frequency'
			+ rowCount
			+ '" value=""  /></td>'
			+ '<td class="col-sm-2-1 center" style="height: 21.5px;" id="sign'
			+ rowCount
			
			+ '"><select style=" font-size: 8px; margin-top:1%;" class="col-sm-10-1 form-control input-SmallText TextFont" name="DocName'
			+ rowCount
			+ '" id="DocName'
			+ rowCount
			+ '" onchange=savePharmaMedicine(($(this).val()),'
			+ (rowCount)
			+ ',(this.id)) >'

			+ '</select><input type="checkbox" class="col-sm-1-1" style="margin-left:6%;" name="Medcheckbox'
			
			/*+ '"><input type="text"  style=" font-size: 8px; margin-top:1%;" class="col-sm-10-1 form-control input-SmallText TextFont" name="DocName'
			+ rowCount
			+ '" onkeyup=autoSuggestionForDoctorSale(this.id),id="DocName'
			+ rowCount
			+ '" onchange=savePharmaMedicine(($(this).val()),'
			+ (rowCount)
			+ ',(this.id)) >'

			+ '</input><input type="checkbox" class="col-sm-1-1" style="margin-left:6%;" name="Medcheckbox'*/
			
			+ rowCount
			+ '"   id="Medcheckbox"/></td><input type="hidden" id="id'
			+ rowCount + '"/></td>';

	$('#time' + rowCount).attr('readonly', 'readonly');
	$('#time' + rowCount).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 5
	});

	$("#mRow").val(rowCount);
	$("#addDrugRowCount").val(k);
	autoSuggestionForPharmacyMedicine("drugName" + rowCount, "onload");
	k++;
	
	$("#DocName" + rowCount).select2();		
	
	//alert(rowCount);
	setTimeout(function() {
		//setDoctorTempleteOnLoad("NSDocName" + rowCount, rowCount);
		setDoctorTempleteforDrug("DocName" + rowCount, rowCount);
	}, 500);
}


var docNameTemplateForDrug = "<option value='0'>-select-</option>{#foreach $T.dl as dl} <option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
function setDoctorTempleteforDrug(rowid, count) {

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
			/*$("#NSDocName" + count).setTemplate(docNameTemplateForNS);
			$("#NSDocName" + count).processTemplate(doctorBean);*/
			//alert(rowid);
		setTimeout(function() {
			$("#" + rowid).setTemplate(docNameTemplateForDrug);
			$("#" + rowid).processTemplate(doctorBean);
		  }, 5);
		}
	});
	// window.reload();
}



function autoSuggestionForPharmacyMedicine(inputID,type){
	var resultData = [];

	var findingName = $('#' + inputID).val();
    var Id = $("#tid").html();
	
	if ( Id == "" || Id == undefined ){
		Id=0;
	}
	
	var auto = "FetchPharmacyMedicine"
		var inputs = [];
		inputs.push('auto=' + auto);
		inputs.push('Id=' + Id);
		inputs.push('q=' + findingName);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : false,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AutoSuggetionServlet",
					timeout : 1000 * 60 * 15,
					cache : true,
					error : function() {
						alert('error');
					},
					success : function(r) {
				
					   ajaxResponse = (r);
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

							}, 500);

							
						}
					});
			function displayResult(item) {

				$('#' + inputID).val((item.text).trim());
				$('#Id' + inputID).val(item.value);
	             var Id = $("#tid").html();
				
				if (Id !=""||Id != undefined){
					
					setPharmacyMedicineDetails(item.value,inputID);
				}
			}
}

function setPharmacyMedicineDetails(Id,inputID)
{
	var inputs = [];
	inputs.push('action=FetchDetailsForPharmacyMedicine');
	inputs.push('Id=' + Id);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : false,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "IPDTreatmentServlet",
				timeout : 1000 * 60 * 15,
				cache : true,
				error : function() {
					alert('error');
				},
				success : function(r) {
				   ajaxResponse = (r);	
				   
				   var obj = eval('(' + ajaxResponse + ')');
				   
				   var id = inputID.split('Name');
				   id= id[1];
				   
				  $('#strength' + id).val(obj.orcodrli[0].strength);
				  $('#qty' + id).val(obj.orcodrli[0].qty);
				  $('#route' + id).val(obj.orcodrli[0].route);
				  $("#frequency" + id).val(obj.orcodrli[0].frequency);
				  $('#dose' + id).val(obj.orcodrli[0].doseType);
				  
				}
});
}


function toRemoveDrugDiv(RowCount) {
	var chart=$("#chart").val();
	var action="";
	var userType = $("#userType").val();

	var nRowrowCount = $("#mRow").val();
	if (nRowrowCount == "0") {
		alert("No Data in Medicine Chart");
		return false;
	}
	
	var allVals = [];
	var flag = false;
	$.each($('#Medcheckbox:checked'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("please check the checbox...");
		return false;
	}

	var Response1 = $("#pharmaMedicineChart").html();
	var ajaxRes = eval('(' + Response1 + ')');

	var k = 0;
	 
		for (m = 1; m <= ajaxRes.druglist.length; m++) {
			for (a = 0; a < allVals.length; a++) {
				if (allVals[a] == ajaxRes.druglist[k].tnid) {
					ajaxRes.druglist[k].DA = 0;
				};
			}
			k++;
		}
		action="DeleteMedicineChart";
	
	if (allVals.length != 0) {

		if ((ajaxRes.druglist.length) != 0 ) {

			parsebcObj = JSON.stringify(ajaxRes);
			//alert(parsebcObj)
			var inputs = [];
			inputs.push('action='+action);
			inputs.push('dicobj=' + parsebcObj);
			inputs.push('allVals='+allVals);
			var str = inputs.join('&');
			jQuery.ajax( {
				async :true,
				type :"POST",
				data :str + "&reqType=AJAX",
				url :"IPDTreatmentServlet",
				timeout :1000 * 60 * 5,
				cache :false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					window.location.reload(true);
				}
			});
		}
	}
 	
	var hiddenRowCount = $("#RowCount").val();
	var rowCount = hiddenRowCount;
	var addrowCount = $("#addDrugRowCount").val();
	var count = rowCount - addrowCount;
	var totalRowCount = (rowCount + addrowCount);
	var p = 1;
	for ( var i = 0; i < (nRowrowCount); i++) {
		var $radios = $('input:checkbox[name=Medcheckbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#div" + p + "").remove();
			nRowrowCount--;
		}
		p++;
		$("#mRow").val(nRowrowCount);
	}; 
}


function saveDrugAdminSheet(){
	

	var response;
	var userType = $("#userType").val();
	var datePick = $("#date-pickDrug").val();
	var rowCount = $("#mRow").val();	
	var password = $("#pharmaMedpassword").val();
	var userUpdate = $("#userUpdate").val();
	var addrowCount = ($("#addDrugRowCount").val()).trim();
	var DrugName = $("#drugName").val();
	var strength = $("#strength").val();
	var Dose = $("#dose").val();
	var Frequency = $("#frequency").val();
	var Qty = $("#qty").val();
	var Route = $("#route").val();
	var Time = $("#time").val();
 

	if (rowCount == "0") {
		alert("No Data in Medicine Chart...");
		return false;
	}

	var allVals = [];
	var flag = false;
	$.each($('#Medcheckbox'), function() {
		allVals.push($(this).val());
		flag = true;
	});

	if (!flag) {
		alert("No Data in Medicine Chart...");
		return false;
	}

	if (userType == "admin") {

		var Response1 = $("#pharmaMedicineChart").html();
		var ajaxRes = eval('(' + Response1 + ')');
		var z = 0;
		
		for ( var m = 1; m <= ajaxRes.druglist.length; m++) {
			
			if ($("#time" + m + "").val() == undefined) {
				// ajaxRes.drrl[z].nid = 0;
			} else {
				if ($("#time" + m + "").val() == "") {
					alert("Time must be filled out");
					$("#pharmacyMedicine").hide('hide');
					return false;
				}
				
				if ($("#strength" + m + "").val() == "") {
					alert("Strength must be filled out");
					$("#pharmacyMedicine").hide('hide');
					return false;
				}
				
				if ($("#dose" + m + "").val() == "") {
					alert("Dose must be filled out");
					$("#pharmacyMedicine").hide('hide');
					return false;
				}
				
				if ($("#qty" + m + "").val() == "") {
					alert("Qty must be filled out");
					$("#pharmacyMedicine").hide('hide');
					return false;
				}
				
				if ($("#route" + m + "").val() == "") {
					alert("Route must be filled out");
					$("#pharmacyMedicine").hide('hide');
					return false;
				}
				
				if ($("#frequency" + m + "").val() == "") {
					alert("Frequency must be filled out");
					$("#pharmacyMedicine").hide('hide');
					return false;
				}
				
				/*if ($("#NSDocName" + m + "").val() == 0) {
					alert("Please select user name");
					$("#pharmacyMedicine").hide('hide');
					return false;
				}*/
				
				
				if (userUpdate == 0) {
					alert("Please select User");
					return false;
				}
				if (password == "") {
					alert("Please enter password");
					$('#pharmacyMedicine').show('show');
					return false;
				}

				ajaxRes.druglist[z].DT = $("#time" + m + "").val();
				ajaxRes.druglist[z].DS = $("#strength" + m + "").val();
				ajaxRes.druglist[z].DD = $("#dose" + m + "").val();
				ajaxRes.druglist[z].DQ = $("#qty" + m + "").val();
				ajaxRes.druglist[z].DR = $("#route" + m + "").val();
				ajaxRes.druglist[z].DF = $("#frequency" + m + "").val();
				ajaxRes.druglist[z].DA = $("#DocName" + m + "").val();
				
			}
			z++;
		}
		
		var parsebcObj = JSON.stringify(ajaxRes);
		var inputs = [];
		
		inputs.push('action=UpdateMedicineChart');
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
				action:"UpdateMedicineChart",
			},
			
			url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				//alert('error');
			},
			success : function(r) {
				ajaxResponse = r;

				if ((addrowCount == "")) {
					alert(ajaxResponse);
					
					
                    if(ajaxResponse == "Entered Password is incorrect..."){
						
						$("#pharmaMedpassword").val("");
						
					}else{
						
						location.reload(true);
					}
				}
				// location.reload(true);
			}
		});
	}

	
	if (rowCount == 0) {
		alert("Please fill in the details before saving!");
		location.reload(true);
		return false;
	} else {

		var datePick = $("#date-pickDrug").val();

		var tid = $("#trid").html();
		var bid = $("#bid").html();

		var count = rowCount - addrowCount;
		var ReadStvalue = rowCount - addrowCount;		
		var i;
		var fdq1 = "";
		var DrugNameString = "";
		for (i = 1; i <= addrowCount; i++) {
			count++;
			var tm = $("#time" + count + "").val();
			var DrugName = $("#drugName" + count + "").val();
			if (tm == undefined) {
			} else {
				

				if (tm == "") {
					alert("Time must be filled out");
					return false;
				}

				if (DrugName == "") {
					alert("Drug Name must be filled out");
					return false;
				}
				
				var Strength = $("#strength" + count + "").val();
				
				if (Strength == "") {
					alert("Strength must be filled out");
					return false;
				}
				
                var Dose = $("#dose" + count + "").val();
				
				if (Dose == "") {
					alert("Dose must be filled out");
					return false;
				}
				
				var Qty = $("#qty" + count + "").val();
					
				if (Qty == "") {
					alert("Qty must be filled out");
					return false;
				}
				
				var Route = $("#route" + count + "").val();
				
				if (Route == "") {
					alert("Route must be filled out");
					return false;
				}
				
               var Frequency = $("#frequency" + count + "").val();
				
				if (Frequency == "") {
					alert("Frequency must be filled out");
					return false;
				}
				
               var AssignBy = $("#DocName" + count + "").val();
				
				/*if (AssignBy == "") {
					alert("Please Select user");
					return false;
				}*/
				
				if (userUpdate == "") {
					alert("Please select User");
					return false;
				}
				if (password == "") {
					alert("Please enter password");
					$('#pharmacyMedicine').show('show');
					return false;
				}

				
				DrugNameString = DrugNameString + "@" + tm + "," + DrugName + "," + Strength + "," + Dose + "," + Qty + "," +Route + "," + Frequency+","+AssignBy;
				//alert(userUpdate);
			}
		}
		
		if (!addrowCount) {

		} else {
			var inputs = [];
			inputs.push('tid=' + tid);
			inputs.push('bid=' + bid);
			inputs.push('datePick=' + datePick);
			inputs.push('DrugNameString=' + DrugNameString);
			inputs.push('userUpdate=' + userUpdate);
			inputs.push('password=' + password);
			inputs.push('action=SaveMedicineChart');

			jQuery.ajax({
				async : true,
				type : "POST",
				
				data :{tid:tid,
					bid:bid,
					datePick:datePick,
					DrugNameString:DrugNameString,
					userUpdate:userUpdate,
					password:password,
					action:"SaveMedicineChart",
				},
				
				url : "PatientServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					response = r;
					alert(response);
					if(response == "Entered Password is Worng..."){
						
						$("#pharmaMedpassword").val("");
						
					}else{
						
						location.reload(true);
					}
				}
			});
		}
	}
}
/*********************************************************/
//added by dayanand to save discharge plan
//date:18-may-2019
function saveIPDDischargePlan() {
	//alert("inside save discharge plan");

	var inputs = [];
	inputs.push('action=saveIPDDischargePlan');
	inputs.push('tid=' + $("#tid").val());
	inputs.push('queryType=' + $("#queryType").val());

	inputs.push('dateAdmission=' + $("#dateAdmission").val());
	inputs.push('dateExpectedDischarge='
			+ $("#dateExpectedDischarge").val());
	inputs.push('dateSet=' + $("#dateSet").val());
	inputs.push('isInformed=' + $("#isInformed").val());

	/* inputs.push('isInformedByPatient='
			+ ($('#isInformedByPatient:checked').val() ? "Y" : "N"));
	inputs.push('isInformedByStaff='
			+ ($('#isInformedByStaff:checked').val() ? "Y" : "N")); */

	inputs.push('transportArranged=' + $("#transportArranged").val());
	inputs.push('isTransportOwn='
			+ ($('#isTransportOwn:checked').val() ? "Y" : "N"));
	inputs.push('isTransportOwnBooked='
			+ ($('#isTransportOwnBooked:checked').val() ? "Y" : "N"));
	inputs.push('transOwnArrvTime=' + $("#transOwnArrvTime").val());

	/* inputs.push('isTransportAmb='
			+ ($('#isTransportAmb:checked').val() ? "Y" : "N"));
	inputs.push('isTransportAmbBooked='
			+ ($('#isTransportAmbBooked:checked').val() ? "Y" : "N"));
	inputs.push('transAmbArrvTime=' + $("#transAmbArrvTime").val()); */

	inputs.push('isOwnMedic='
			+ ($('#isOwnMedic:checked').val() ? "Y" : "N"));
	inputs.push('isNewMedic='
			+ ($('#isNewMedic:checked').val() ? "Y" : "N"));
	inputs.push('isTransferLetter='
			+ ($('#isTransferLetter:checked').val() ? "Y" : "N"));
	inputs.push('isSocialService='
			+ ($('#isSocialService:checked').val() ? "Y" : "N"));
	inputs.push('socialServiceRefDate=' + $("#socialServiceRefDate").val());
	inputs.push('socialServiceAssesDate='
			+ $("#socialServiceAssesDate").val());
	inputs.push('isOT=' + ($('#isOT:checked').val() ? "Y" : "N"));
	inputs.push('OTRefDate=' + $("#OTRefDate").val());
	inputs.push('OTAssesDate=' + $("#OTAssesDate").val());
	inputs.push('isPhysio=' + ($('#isPhysio:checked').val() ? "Y" : "N"));
	inputs.push('physioRefDate=' + $("#physioRefDate").val());
	inputs.push('physioAssesDate=' + $("#physioAssesDate").val());
	inputs.push('isOther=' + ($('#isOther:checked').val() ? "Y" : "N"));
	inputs.push('otherRefDate=' + $("#otherRefDate").val());
	inputs.push('otherAssesDate=' + $("#otherAssesDate").val());
	inputs.push('dateActualDischarge=' + $("#dateActualDischarge").val());
	inputs.push('dischargeCode=' + $("#dischargeCode").val());
	inputs.push('isTDL=' + ($('#isTDL:checked').val() ? "Y" : "N"));
	inputs.push('TDLTime=' + $('#TDLTime').val());
	inputs.push('diagCapacity=' + $("#diagCapacity").val());
	inputs.push('waitTestRes=' + $("#waitTestRes").val());
	inputs.push('waitMedRevDisc=' + $("#waitMedRevDisc").val());
	inputs.push('MedConsulDelay=' + $("#MedConsulDelay").val());
	inputs.push('AlliedHelDelay=' + $("#AlliedHelDelay").val());
	inputs.push('RefCommProvLate=' + $("#RefCommProvLate").val());
	inputs.push('PatWaitConsEquip=' + $("#PatWaitConsEquip").val());
	inputs.push('Medication=' + $("#Medication").val());
	inputs.push('Transport=' + $("#Transport").val());
	inputs.push('OtherHeltFacl=' + $("#OtherHeltFacl").val());
	inputs.push('Pallative=' + $("#Pallative").val());
	inputs.push('Rehabilitation=' + $("#Rehabilitation").val());
	inputs.push('CareNurseHome=' + $("#CareNurseHome").val());

	var str = inputs.join('&');
	//alert(str);
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PatientServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error saving IPDDischargePlan');
		},
		success : function(response) {
			alert(response);
			window.location.reload(true);
		}
	});

}


/*********************************************************/

function savePharmaMedicine(value, row, rowid) {
	var preTreat = $("#preTreat").val();
	if(preTreat=="Y"){
		$("#pharmacyMedicine").hide();
		}else{
			if(value == 0){
				
				alert("Please select user name");
				$('#pharmacyMedicine').hide('hide');
			  }else{
			      $("#userUpdate").val(value);
			     $('#pharmacyMedicine').show('show');
			}	
		}

}

function hidePopup() {
	$("#pharmaMedpassword").val("");
	$("#pharmacyMedicine").hide('hide');
}




function fillDrugChart(date){

	$("#chart").val("select");
	rowCount = 1;
	sr = 1;
	count = 1;

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var tid =$("#tid").val();
	var inputs = [];
	inputs.push('date=' + date);
	/*inputs.push('tid=' + pobj1.trid);*/
	inputs.push('tid=' + tid);
	//inputs.push('action=fillDrugChart');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdhistory/fillDrugChart",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			
			var myObj = eval('(' + ajaxResponse + ')');
			$("#pharmaMedicineChart").html(ajaxResponse);
	
				$("#mRow").val(myObj.druglist.length);
				$("#DrugAdminSheetContent").setTemplate(NewDrugAdminSheetTemp);
				$("#DrugAdminSheetContent").processTemplate(myObj);
				
				for ( var i = 0; i < myObj.druglist.length; i++) {
					$("#time" + (i + 1)).attr('readonly', 'readonly');
					$("#time" + (i + 1)).datetimepicker({
						datepicker : false,
						format : 'H:i',
						step : 5
					});
				}
				
				for ( var i = 0; i < myObj.druglist.length; i++) {
				
					$("#drugName" + (i + 1)).val(myObj.druglist[i].DName).attr('readonly', 'readonly');
				}
				
				
					for ( var i = 0; i < myObj.druglist.length; i++) {
						//setTimeout(function() {
						   $("#DocName" + (i + 1)).val(myObj.druglist[i].DA);
						//}, 5);
					}
					
					drugCount=0;
				
			} 
	});

}


var drugCount=0;

var NewDrugAdminSheetTemp ="<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='' style='height: 21.5px; width: 3.05%;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Time</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Drug Name</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Strength</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dose</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Quantity</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Route</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Frequency</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Sign</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; height: 425px; max-height: auto;'>"
	+ "<table class='table table-condensed table-bordered table-stripped cf' style='width : 100%;'>"
	+ "<tbody id='DrugDiv'>"
	+ "{#foreach $T.druglist as druglist}"
	+ "<tr id='divD{rowCount}'>"
	+ "<td  style='height: 21.5px;  width: 3.05%; '>{drugCount+1}.</td>"
	+ "<td  class='col-sm-1-1' style='height: 21.5px; '>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='time{drugCount+1}' id='time{drugCount+1}' value='{$T.druglist.DT}' readonly='readonly' /></td>"
	+ "<td class='col-sm-2-1' style='height: 21.5px;' id='sel{rowCount}'><input class='form-control input-SmallText TextFont' style='font-size: 11px;'  name='drugName{drugCount+1}' id='drugName{drugCount+1}' value='{$T.druglist.DName}' readonly='readonly' /></td>"
	+ "<td  class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='strength{drugCount+1}' id='strength{drugCount+1}' value='{$T.druglist.DS}' onkeypress='return validateNumbers(event)' onkeypress='makeUserselect({drugCount},\"DocName{drugCount}\")' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='dose{drugCount+1}' id='dose{drugCount+1}'onkeypress='return validateNumbers(event)' value='{$T.druglist.DD}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='qty{drugCount+1}' id='qty{drugCount+1}' onkeypress='return validateNumbers(event)' value='{$T.druglist.DQ}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='route{drugCount+1}' id='route{drugCount+1}' onkeypress='return validateNumbers(event)' value='{$T.druglist.DR}' /></td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<input type='text' class='form-control input-SmallText TextFont' name='frequency{drugCount+1}' id='frequency{drugCount+1}' onkeypress='return validateNumbers(event)'  value='{$T.druglist.DF}' /></td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;' id='sign'>" 
	+ "<select disabled style='font-size: 11px; margin-top:1%;' class='col-sm-10-1' name='DocName{drugCount+1}' id='DocName{drugCount+1}'" 
	+ " onclick='setDoctorTempleteforDrug((this.id),{drugCount+1}); this.onclick=null;' onchange='savePharmaMedicine(($(this).val()),{drugCount},(this.id))'> <option selected=selected value='{$T.druglist.DA}'>{$T.druglist.nname}</option></select>"
	
	/*+ "<input type='text' disabled='disabled' style='font-size: 11px; margin-top:1%;' class='col-sm-10-1 form-control input-SmallText TextFont',value='{$T.druglist.DA}', name='DocName{rowCount}' id='DocName{rowCount}'" 
	+ " onclick='setDoctorTempleteforDrug((this.id),{drugCount}); this.onclick=null;' onchange='savePharmaMedicine(($(this).val()),{drugCount},(this.id))'> </input>"*/
	
	+ "<input type='checkbox' id='Medcheckbox' name='Medcheckbox{drugCount++}' value='{$T.druglist.tnid}'></td>"
	+ "</tr>"
	+ "<input type='hidden' value='{$T.druglist.nid}' id='nid{rowCount}' />"
	+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
	+ "{#/for} "
	+ "<input type='hidden' value='' id='addDrugRowCount' />"
	+ "<input type='hidden' value='{--rowCount}' id='RowCount' />"
	+ "</tbody>" + "</table>" + "</div>";



function IPDHistoryPrint(){
	
	//var patID = $("#pid").val();
	var patID = $("#pt_Id").val();// added by paras
	
  //var treatID = $("#treatmentId").val();
	var treatID = $("#tr_Id").val();// added by paras
	
	var date_pick = $.trim($("#date-pick").val());
	
	var MedicalOffName = $("#medOffName").val();
	var MRN_No = $("#mrn").val();
	
	var shraddhaFlow = $("#shraddhaFlow").val();
	
	
	 var consultingDoctorr= $("#consultingDoctorr").text();
	 var corporate = $("#corporate").text();
	 var hallName= $("#hallName").text();
	
	ajaxResponse = $("#patobject").html();
	
	myArray = JSON.parse(ajaxResponse);
	myObj = JSON.stringify(myArray)
	//alert(myObj);

	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == patID) {
			myObj = myArray.pl[i];

			break;
		}
	}
	var Tre_Start_Date = "";
	//var Tre_Start_Date = myArray.pl[i].objTreat.treStart 
	myObj = JSON.stringify(myObj);

	if(shraddhaFlow=="on"){
		setTimeout(
				function() {
					window
							.open(("IPD_History_Print_New.jsp?" + "patID="
									+ encodeURIComponent(patID) + "&treatID="
									+ encodeURIComponent(treatID) + "&date_pick="
									+ encodeURIComponent(date_pick) + "&myObj=" + encodeURIComponent(myObj)
									+ "&MedicalOffName="+ encodeURIComponent(MedicalOffName)
									+ "&MRN_No="+ encodeURIComponent(MRN_No) + "&Tre_Start_Date="+encodeURIComponent(Tre_Start_Date)));
				}, 300);
	    return;

	}else{
		setTimeout(
				function() {
					window
							.open(("IPD_History_Print.jsp?" + "patID="
									+ encodeURIComponent(patID) + "&treatID="
									+ encodeURIComponent(treatID) + "&date_pick="
									+ encodeURIComponent(date_pick) + "&myObj=" + encodeURIComponent(myObj)
									+ "&MedicalOffName="+ encodeURIComponent(MedicalOffName)
									+ "&MRN_No="+ encodeURIComponent(MRN_No) 
									+ "&Tre_Start_Date="+encodeURIComponent(Tre_Start_Date)
									+ "&consultingDoctorr="+encodeURIComponent(consultingDoctorr)
									+ "&corporate="+encodeURIComponent(corporate)
									+ "&hallName="+encodeURIComponent(hallName)));
				}, 300);
	    return;

	}
}


function DrugAdministrationPrint(){

	var pId = $("#pid").val();
    var tId = $("#tr_Id").val();
   
	var date_pick = $.trim($("#date-pickDrug").val());
	
	setTimeout(
			function() {
				window
						.open("Drug_Administration_Print.jsp?" + "pid="
								+ encodeURIComponent(pId) + "&tid="
								+ encodeURIComponent(tId) + "&date_pick=" 
								+ encodeURIComponent(date_pick));
			}, 300);
    return;
}



//@codeBy:Irfan khan @codeDate:26-Dec-2016 (To Saving doctor Round template details)
function saveDoctorRoundTemplate(){
	var templateId = $("#txtTemplateId").val();
	var templateName = $("#txtTemplateName").val();
	var clinicalNotes = $("#txtClinicalNotes").val();
	var investigationAdvice = $("#txtInvestigationAdvice").val();
	var other = $("#txtOther").val();
	var btnName = $("#btnName").val();//Drug_Administration_Print
	
	if(templateName == "" || templateName == undefined){
		alert("Please enter Template Name.");
		SetFocus("txtTemplateName");
		return false;
	}
	else if(clinicalNotes == "" || clinicalNotes == undefined){
		alert("Please enter Clinical Notes.");
		SetFocus("txtClinicalNotes");
		return false;
	}
	if(investigationAdvice == "" || investigationAdvice == undefined){
		investigationAdvice = "-";
	}
	if(other == "" || other == undefined){
		other = "-";
	}
	var inputs = [];
	//inputs.push('action=saveDoctorRoundTemplate');
	inputs.push('doctorRoundTemplateId='+templateId);
	inputs.push('tempName='+templateName);
	inputs.push('clinicalNotes='+encodeURIComponent(clinicalNotes));
	inputs.push('investigationAdvice='+encodeURIComponent(investigationAdvice));
	inputs.push('other='+encodeURIComponent(other));
	//inputs.push('btnName='+btnName);
	var str = inputs.join('&');
	jQuery.ajax({
			async : true,
			type : "POST",
			data :str,
			url : "./ehat/ipdmaster/saveDoctorRoundTemplate",
			timeout : 1000*60*5,
			cache : false,
			error : function(){
				//alert('error');
			},
			success : function(r){
				alert(r);
				$("#btnName").val("save");
				window.location.reload(true);
			}
	});
}

// @codeBy:Irfan khan @codeDate:26-Dec-2016 (To fetch doctor Round template
// details)
function fetchDoctorRoundTemplate(callFrom){
	
	var unitid = 1;
	var searchText = $.trim($("#byName").val());
	if(callFrom == "search")
	{
		if(searchText == "")
		{
			alert("Please Enter Template Name !");
			setFocus("#byName");
			return false;
		}
	}
	
	var inputs = [];
	//inputs.push('action=fetchDoctorRoundTemplate');
	inputs.push('callFrom='+callFrom);
	inputs.push('searchText='+searchText);
	var str = inputs.join('&');
	jQuery.ajax({
			async : true,
			type : "GET",
			data :{
				"unitId":unitid
			},
			url : "./ehat/ipdhistory/fetchDoctorRoundTemplate",
			timeout : 1000*60*5,
			cache : false,
			error : function(){
				alert('error');
			},
			success : function(r){
				if(callFrom == "IPD_DoctorStation")
					{
						$("#DRTDetails").html(r);
					}
				else{
				var data =  r ;
				var htm = "<tr>";
				if(data.length<1 && callFrom == "search")
					{
						alert("No Template Found ! Please Select Template Name");
						window.location.reload(true);
					}
				for ( var i = 0; i < data.length; i++){
					
					htm = htm + "<td class='col-md-1-1 center'><div class='TextFont'>"+(i+1) +"</div></td>"
						+ "<td class='col-md-2-1 center'><div class='TextFont' id='templateId"+data[i].doctorRoundTemplateId +"'>"+data[i].doctorRoundTemplateId +"</div></td>"
						+ "<td class='col-md-3-1 '><div class='TextFont'style='padding-left: 10px;' id='templateName"+data[i].doctorRoundTemplateId +"'>"+data[i].tempName +"</div></td>"
						+ "<td class='col-md-3-1 '><div class='TextFont' style='padding-left: 10px;' id='clinicalNote"+data[i].doctorRoundTemplateId +"'>"+data[i].clinicalNotes +"</div></td>"
						+ "<td class='col-md-1-1 center'><div class='TextFont'style='padding-left: 10px;'><button type='button' id='btnEdit' "
							+"class='btn btn-xs btn-success' onclick='editDoctorRoundTemplate("
							+data[i].doctorRoundTemplateId +")'><i class='fa fa-edit'></i></button></div></td>"
						+ "<td class='col-md-1-1 center'><div class='TextFont'style='padding-left: 10px;'><button type='button' id='btnDelete'"
							+" class='btn btn-xs btn-danger' onclick='deleteDoctorRoundTemplate("
							+data[i].doctorRoundTemplateId +")'><i class='fa fa-trash-o'></i></button></div></td>"
						+ "<input id='investigationAdvice"+data[i].doctorRoundTemplateId +"' type='hidden' value='"+data[i].investigationAdvice +"'>"
						+ "<input id='other"+data[i].doctorRoundTemplateId +"' type='hidden' value='"+data[i].other +"'>"
						+ "</tr>";
				}
				$("#drtTable").html(htm);
			}
			}
	});
}
//-------------------------------------------------------------------------------------
//Added By Badrinath Wagh
//For Doctor Round Search Functionality
//--------------------------------------------------------------------------------------
function SearchDoctorRoundTemplate() {
	var resultData = [];
	var tempName = $("#byName").val();

	if (tempName == "" || tempName == null	|| tempName == undefined) {

		alert("Please Enter Template Name !");
		$("#" + byName).focus();
		fetchDoctorRoundTemplate('All');
		return false;
	}

	var inputs = [];
	inputs.push('tempName=' + tempName);
	//inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "./ehat/ipdhistory/SearchDoctorRoundTemplate",
		cache : false,
		success : function(response) {
			
		var data =  response ;
		var htm = "<tr>";
		if(data.length<1)
		{
				alert("No Template Found ! Please Select Template Name");
				window.location.reload(true);
		}
		for ( var i = 0; i < data.length; i++){
			
			htm = htm + "<td class='col-md-1-1 center'><div class='TextFont'>"+(i+1) +"</div></td>"
				+ "<td class='col-md-2-1 center'><div class='TextFont' id='templateId"+data[i].doctorRoundTemplateId +"'>"+data[i].doctorRoundTemplateId +"</div></td>"
				+ "<td class='col-md-3-1 '><div class='TextFont'style='padding-left: 10px;' id='templateName"+data[i].doctorRoundTemplateId +"'>"+data[i].tempName +"</div></td>"
				+ "<td class='col-md-3-1 '><div class='TextFont' style='padding-left: 10px;' id='clinicalNote"+data[i].doctorRoundTemplateId +"'>"+data[i].clinicalNotes +"</div></td>"
				+ "<td class='col-md-1-1 center'><div class='TextFont'style='padding-left: 10px;'><button type='button' id='btnEdit' "
					+"class='btn btn-xs btn-success' onclick='editDoctorRoundTemplate("
					+data[i].doctorRoundTemplateId +")'><i class='fa fa-edit'></i></button></div></td>"
				+ "<td class='col-md-1-1 center'><div class='TextFont'style='padding-left: 10px;'><button type='button' id='btnDelete'"
					+" class='btn btn-xs btn-danger' onclick='deleteDoctorRoundTemplate("
					+data[i].doctorRoundTemplateId +")'><i class='fa fa-trash-o'></i></button></div></td>"
				+ "<input id='investigationAdvice"+data[i].doctorRoundTemplateId +"' type='hidden' value='"+data[i].investigationAdvice +"'>"
				+ "<input id='other"+data[i].doctorRoundTemplateId +"' type='hidden' value='"+data[i].other +"'>"
				+ "</tr>";
		}
		$("#drtTable").html(htm);
	}
	
	});
}

//@codeBy:Irfan khan @codeDate:27-Dec-2016 (To set template details to update
function editDoctorRoundTemplate(templateId)
{
	$("#btnName").val("update");
	
	$("#txtTemplateId").val($("#templateId"+templateId).html());
	$("#txtTemplateName").val($("#templateName"+templateId).html());
	$("#txtClinicalNotes").val($("#clinicalNote"+templateId).html());
	$("#txtInvestigationAdvice").val($("#investigationAdvice"+templateId).val());
	$("#txtOther").val($("#other"+templateId).val());
	
}

//@codeBy:Irfan khan @codeDate:27-Dec-2016 (to delete doctor Round template)
function deleteDoctorRoundTemplate(templateId) {

	var r = confirm("Are You confirm To Delete Template ? ");
	if (r == true) {

		var inputs = [];
		//inputs.push('action=deleteDoctorRoundTemplate');
		//inputs.push('id=' + templateId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "DELETE",
//			data : str,
			url : "./ehat/ipdmaster/deleteDoctorRoundTemplate/"+templateId,
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				window.location.reload(true);
			}
		});
	}
}

//@UsedBy:Irfan khan @codeDate:27-Dec-2016 (Auto-Suggestion list for doctor template name)
function setAutoSuggestTempName(inputID, onload, callFrom) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var auto = '';
	if (callFrom == "doctorRoundTemplate") {
		auto = 'doctorRoundTemplate';
	} 
	
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
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = decodeURIComponent(r);
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
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
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
					}, 500);
				}
			});
	function displayResult(item) {
		$("#" + inputID).val((item.text).trim());
	}

}

// @codeBy:Irfan khan @codeDate:8-Feb-2016 (to Update doctor Round template from
// nursing station)
function updateDoctorRoundTemp() {

	var tableRowsCount = $('#DRRDivDash tr').length;
	var drrList = {
			drrl : []
		};
	var counter = 0;
	var data1 = $("#onloadDrrSet").html();
	var data = eval('(' + data1 + ')');
	
	if(tableRowsCount == 0){
			alert("No Records to Update!!!");
			return false;
		
	}else {
			for ( var i = 1; i <= tableRowsCount; i++) {
				
				if ((($("#drct" + i).val()) != data.drrl[(i-1)].ct && ($("#drct" + i).val()) != null && 
						($("#drct" + i).val()) != undefined) || data.drrl[(i-1)].nn != ($("#nn" + i).val())) {
					// alert("hii inside");
					counter++;
					drrList.drrl.push({
						"di" : $("#DrrId"+i).val(),
						"ct" : $("#drct"+i).val(),
						"nn" : $("#nn"+i).val()
					});
					
				}

			}
		}
	if(counter == 0){
			alert("No changes to update!!!");
			return false;
		}
	

	drrList = JSON.stringify(drrList);
	
		var inputs = [];
		inputs.push('action=updateDoctorRoundTemp');
		inputs.push('drrList=' + encodeURIComponent(drrList));
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "IPDTreatmentServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				// setDoctorPreRound();
				if(ajaxResponse == "Doctor Round is updated successfully..."){
				
					location.reload();
				}
				 
			}
		});
}

function resetDoctorRoundTemp(){
	
	var tableRowsCount = $('#DRRDiv tr').length;
	var counter = 0;
	if(tableRowsCount == 0){
		alert("No Records to Reset!!!");
		return false;
	}else{
		for ( var i = 1; i <= tableRowsCount; i++) {
			if($('#checkbox'+i).is(':checked')){
				counter++;
				$("#dtime" + i).val("-");
				$("#nursingnotes" + i).val("");
				$("#checkbox"+i).prop('checked',false);
			}
		}
	}
	
	if(counter == 0){
		alert("No records selected!!!");
	}
	
}

//@UsedBy:Irfan khan @codeDate:29-Dec-2016 (Auto-Suggestion list for inhouse doctor name list)
function setAutoSuggestExpenceVoucher(inputID, onload, callFrom) {
	//alert(inputID+" "+onload+" "+callFrom);
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var auto = '';
	if (callFrom == "expenceVoucherCompanyName") {
		auto = 'expenceVoucherCompanyName';
	} else if (callFrom == "ExpVoucherMaster") {
		auto = 'ExpVoucherMaster';
	} else if (callFrom == "LedgerHeadsDatabase") {
		auto = 'LedgerHeadsDatabase';
	} 
	
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
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = decodeURIComponent(r);
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
					$("#pathiddenid").val(idValue);
					setTimeout(function() {
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
					}, 500);
				}
			});
	function displayResult(item) {
		var doc_Id = item.value;
		$("#" + inputID).val((item.text).trim());
		//$("#txtDoctorId").val(doc_Id);
	}

}

//Added By Pooja
function checkDeathStatus(){
    var dischargeType = $("#discharge_Type").val();
    if(dischargeType == "Dead"){
        $('#causeOfDeath').show();
    }else{
        $("#causeOfDeath").hide();
    }
}


/*
 * @author :  Laxman Nikam
 * @date   :  06-04-2018
 * @purpose:  print for Treatment At Discharge Prescription
 */
function tratmentAtDischargePrintIpd(callfrom) {
	
	var dischargedate = $("#discharge_date").val();
	if(dischargedate == ""){
		alert("Please save discharge summary then print");
		return false;
	}else{
		
		var discharge_Time = $("#discharge_Time").val();
		var timeDate=dischargedate +"  "+ discharge_Time;
		var patID = $("#pt_Id").val();
		var treatID = $("#treatmentId").val();
		var tomId = $("#idSelOperationData").val(); //By Pooja
		
	
		var discharge_Type = $("#discharge_Type").val();
		
		window.open("TreatmentAtDischargePrint.jsp?"+"patID=" +
			encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
			+"&dischargedate="+encodeURIComponent(timeDate));
	}
	
}

function saveReceiptVoucher()
{
	var receiptVoucherId=$("#receiptVoucherId").val();
	var companyName = $("#companyName").val();
	var bdate = $("#bdate").text();
	var receivedFrom = $("#receivedFrom").val();
	var amountPaid = $("#amountPaid").val();
	var amountInWords = $("#amountInWords").val();
	var selAmountType = $("#selAmountType").val();
	var selRefTo = $("#selRefTo").val();
	var chequeNumber=0;
	var txtAmount = $("#txtAmount").val();
	var txtRemark = $("#txtRemark").val();
	var queryType = $("#queryType").val();
	var idipd = $("#ipdID").val();
	var grpid = $("#vouchername option:selected").val();
	var ledgerHeadid = $("#leadgerHeadsId option:selected").val();
	//receiptVoucherId=idipd;
	var pattern = /^([a-z-A-Z])*$/;
/*
 * if(amountInWords.match()) { alert("Amount in words allow characters only..");
 * $("#amountInWords").focus(); return false; }
 */
	if(receiptVoucherId == null || receiptVoucherId == undefined || receiptVoucherId =="")
		{
		receiptVoucherId=0;
		}
	if(receivedFrom == 0){
		alertify.error("Please Enter Received From Field!!");
		SetFocus("receivedFrom");
		return false;
	}else if(grpid == 0){
		alertify.error("Please select Group Name!!");
		SetFocus("selectVoucherGrp");
		return false;
	}else if(amountPaid == 0){
		alertify.error("Please Enter Total Amount to Paid!!");
		SetFocus("amountPaid");
		return false;
	}else if(txtAmount == 0){
		alertify.error("Please Enter Amount Paid!!");
		SetFocus("txtAmount");
		return false;
	}else if(selAmountType == "select"){
		alertify.error("Please select Payment Mode!!");
		SetFocus("selAmountType");
		return false;
	}else if(ledgerHeadid == null){
		ledgerHeadid = "0";
	}
	
	if(txtAmount==0)
		{
		alertify.error("Please fill in all fields!!");
		return false;
		}
	
	var str1 = $("#selAmountType").find('option:selected').text();
	
	if(str1.indexOf("Cheque") != -1){
		chequeNumber = $("#chequeNumber").val();
	}
	
	var serviceDetails = {
			listIPDReceiptVoucherDTO : []
        };
	
	serviceDetails.listIPDReceiptVoucherDTO.push({
		
		receiptVoucherId:receiptVoucherId,
		companyName : companyName,
		receivedFrom : receivedFrom,
		amountPaid : amountPaid,
		amountInWords : amountInWords,
		refTo : selRefTo,
		chequeNo : chequeNumber,
		amount : txtAmount,
		remark : txtRemark,
		groupId : grpid,
		ledgerHeadId : ledgerHeadid,
		paymentMode : selAmountType
		
    });
	
	 serviceDetails = JSON.stringify(serviceDetails);
	
	var inputs = [];
	inputs.push('serviceDetails=' + serviceDetails);
	inputs.push('queryType=' + queryType);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/vouchers/saveRecieptVoucher",
		 error     : function() {
	            alert('Network Issue!!!');
	          },
		success : function(r) {
			ajaxResponse = r;
			if(ajaxResponse==1){
					alertify.success("Reciept Voucher Save Successfully...");
				}else if(ajaxResponse==2){
					alertify.success("Reciept Voucher Update Successfully...");
				}
				else{
					alertify.success("Network error...");
			}
			viewReceiptVoucher("onload");
			clearFields();
			}
		});
}


function viewReceiptVoucher(callFrom) {
	
	var inputs = [];
	inputs.push("callFrom=" + callFrom);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/vouchers/viewReceiptVoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var response = r;
			var recNo=0;
			if((response.listIPDReceiptVoucherDTO.length) > 0)
				{
					recNo=response.listIPDReceiptVoucherDTO[response.listIPDReceiptVoucherDTO.length-1].receipt_voucher_id;
				}
			
			recNo++;
			$("#recNo").html(recNo);
			setReceiptVoucherTemplate(response);
		}
	});
}

function setReceiptVoucherTemplate(response){
	
	count=1;
	var html= "";
	
	for(var i=0;i<response.listIPDReceiptVoucherDTO.length;i++){
		
		var dateTime=new Date(response.listIPDReceiptVoucherDTO[i].insert_date_time).toLocaleString();
		html=html+"<tr id='div"+count+"'>"+	
		"<td style='height: 21.5px;' class='center'>"+count+".</td>	" +
		"<td style='height: 21.5px;' class='col-md-1 center'>"+ dateTime.split(",")[0]+"</td>	" +
		"<td style='height: 21.5px;' class='col-md-2 center'>"+ response.listIPDReceiptVoucherDTO[i].company_name+"</td>	";
		
		if(response.listIPDReceiptVoucherDTO[i].payName=='-'){
			html=html+"<td id='divPi"+count+"' style='height: 21.5px;' class='numeric col-md-1 center'>Multiple</td>  " ;
		}else{
			html=html+"<td id='divPi"+count+"' style='height: 21.5px;' class='numeric col-md-1 center'>"+response.listIPDReceiptVoucherDTO[i].payName+"</td>  " ;
		}
		
		html=html+"<td id='divPi"+count+"' style='height: 21.5px;' class='numeric col-md-1 center' value='"+response.listIPDReceiptVoucherDTO[i].group_id+"'>"+response.listIPDReceiptVoucherDTO[i].groupName+"</td>" +
				  "<td id='divPi"+count+"' style='height: 21.5px;' class='numeric col-md-2 center' value='"+response.listIPDReceiptVoucherDTO[i].ledger_head_id+"'>"+response.listIPDReceiptVoucherDTO[i].ledgerHeadName+"</td>  ";
		
		if(response.listIPDReceiptVoucherDTO[i].ref_to==1){
			html=html+"<td id='divPi"+count+"' style='height: 21.5px;' class='numeric col-md-1 center'>OPD</td>" ;
		}else if(response.listIPDReceiptVoucherDTO[i].ref_to==2){
			html=html+"<td id='divPi"+count+"' style='height: 21.5px;' class='numeric col-md-1 center'>IPD</td>" ;
		}else if(response.listIPDReceiptVoucherDTO[i].ref_to==3){
			html=html+"<td id='divPi"+count+"' style='height: 21.5px;' class='numeric col-md-1 center'>Dignostic</td>" ;
		}
		
		html=html+"<td style='height: 21.5px;' class='numeric col-md-2 center'>"+response.listIPDReceiptVoucherDTO[i].received_from+"</td>" +
		"<td style='height: 21.5px;' class='numeric col-md-1 center'>"+response.listIPDReceiptVoucherDTO[i].amount+"</td><td style='height: 21.5px;' class='numeric col-md-2 center'>"+response.listIPDReceiptVoucherDTO[i].amount_paid+"</td>	" +
		"<td style='height: 21.5px;' class='numeric col-md-1 center'><button value='Edit' style='height: 21.5px;' class='btn btn-xs btn-success editUserAccess' disabled='disabled' id='btnEdit"+count+"'	onclick='editRecVoucher("+response.listIPDReceiptVoucherDTO[i].receipt_voucher_id+")'><i class='fa fa-edit' class='edit'></i></button></td>" +
		"<td style='height: 21.5px;' class='numeric col-md-1 center'><button value='Print' style='height: 21.5px;' class='btn btn-xs btn-success editUserAccess' disabled='disabled' id='btnprint"+count+"'	onclick='printReceiptVoucher("+response.listIPDReceiptVoucherDTO[i].receipt_voucher_id+")'><i class='fa fa-print' class='print'></i></button></td>" +
		"<td style='height: 21.5px;' class='numeric col-md-1 center'><input	type='checkbox' value='"+response.listIPDReceiptVoucherDTO[i].receipt_voucher_id+"'		name='checkbox"+count+"' id='checkbox' /></td>	<input id='receiptVoucherId"+count+"' name='receiptVoucherId"+count+"' type='hidden' value='"+response.listIPDReceiptVoucherDTO[i].receipt_voucher_id+"' />" +
		"</tr><input id='addRowCount' name='addRowCount' type='hidden' value='"+count+"'>";
		count++;
	}
	$("#container").html(html);
	$("#DivResponse").html(response);
	userAccess();
}

function editRecVoucher(id)
{
	
	var inputs = [];
	inputs.push("receiptVoucherId=" + id);
	var str = inputs.join('&');
	
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/vouchers/editRecVoucher",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('Network error');
		},
		success : function(r) {
			var response = r;
		
			var str = $('#selAmountType :selected').text();
			$("#companyName").val(response.listIPDReceiptVoucherDTO[0].companyName);
			$("#receivedFrom").val(response.listIPDReceiptVoucherDTO[0].receivedFrom);
			$("#amountPaid").val(response.listIPDReceiptVoucherDTO[0].amountPaid);
			$("#amountInWords").val(response.listIPDReceiptVoucherDTO[0].amountInWords);
			$("#selAmountType").val(response.listIPDReceiptVoucherDTO[0].paymentMode);
			$("#selRefTo").val(response.listIPDReceiptVoucherDTO[0].refTo);
			$("#txtAmount").val(response.listIPDReceiptVoucherDTO[0].amount);
			$("#txtRemark").val(response.listIPDReceiptVoucherDTO[0].remark);
			$("#vouchername").val(response.listIPDReceiptVoucherDTO[0].groupId);
			//selectVoucherGrp(response.listIPDReceiptVoucherDTO[0].groupId);
			//$("#vouName").val(myObj.grpnm);
			$("#leadgerHeadsId").val(response.listIPDReceiptVoucherDTO[0].ledgerHeadId);
			//selLedgerhead(response.listIPDReceiptVoucherDTO[0].ledgerHeadId);
			
			if(response.listIPDReceiptVoucherDTO[0].chequeNo>0){
				$("#chequeNumber").val(response.listIPDReceiptVoucherDTO[0].chequeNo);
			}else{
				$("#chequeNumber").val("");
			}
			$("#receiptVoucherId").val(response.listIPDReceiptVoucherDTO[0].receiptVoucherId);
			
			var dateTime=new Date(response.listIPDReceiptVoucherDTO[0].insertDateTime).toLocaleString();
			
			$("#bdate").text(dateTime.split(",")[0]);
			$("#recNo").html(response.listIPDReceiptVoucherDTO[0].receiptVoucherId);
			
			test_skill_voucher();
			$("#queryType").val("update");
			enterChequeNo();
			
			}
		});
	
}


function deleteReceiptVoucher() {
	
	
	/*var $radios = $('input:checkbox[name=checkbox]');
	if ($radios.is(':checked') != true) {
		alert("Please Select Record to Delete.");
		return false;
	}*/
	var r = confirm("You Want to delete This Receipt Voucher?");
	if (r == true) {
	
	var receiptVoucherIdLst = [];
	$.each($('#checkbox:checked'), function() {
		receiptVoucherIdLst.push($(this).val());
	});
	
	if(receiptVoucherIdLst.length==0){
		alertify.error("Please Select At Least One Record");
		return false;
	}
	
	
	var inputs = [];
	inputs.push("receiptVoucherIdLst=" + receiptVoucherIdLst);
	var str = inputs.join('&');

	jQuery.ajax({
        async : false,
        type : "POST",
        data : str + "&reqType=AJAX",
        url : "ehat/vouchers/deleteReceiptVoucher",
        timeout : 1000 * 60 * 5,
		cache : false,
        error     : function() {
            alert('Network error...');
          },
		success : function(r) {
			
			if(r>0){
				alertify.success("Receipt Voucher Delete Successfully...");	
			}else{
				alertify.error("Network error...");	
			}
			viewReceiptVoucher("onload");
			clearFields();
		}
	});
	}
}



function printReceiptVoucher(voucherId){

	/*var xyz = $("#hospDetails").html();
	//hospDetails = eval('(' + xxx + ')');
	hospDetails = JSON.parse(xyz);
	var hosp = hospDetails.listHosDetail[0];
	var vouName = $("#vouName").val();
		
		
var WindowObject = window.open('', ' ', '');
WindowObject.document.writeln('<html><body>');

WindowObject.document
		.writeln('<div style="width:15%;float:left;padding-left:1%;padding-top:1%;"><img src="'
			//	+ hosp.flpt
				+ '" width="170" height="100" alt="" /></div><div style="text-align: center;" id="SRBill"><h3>'
				++ hosp.hn + '</h3>	<b>' //+ hosp.ha + '-' + hosp.hz
//				+ '</b><br></br> <b>Tel:-' + hosp.hcon + '.</b><b>Fax:-'
				+ hosp.hx + '.</b></div>');

WindowObject.document
		.writeln('__________________________________________________________________________________________________________________________________________________________________________________________');

WindowObject.document
.writeln('<div style="width: 96.80%; height: 550px;border:0px solid;" id="printIPDVoucher">'
		+'<div style="width: 100%;padding-bottom:4%;padding-top:2%;" align="center"><b><u>	RECEIPT VOUCHER	</u></b></div>'
		+'<div style="width: 100%; float: left; padding-left: 2%;" align="left"><div style="width:50%; float: left; padding-left: 2%;" align="left"><div style="width: 40%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left"><b>Voucher No:</b></div>'
		+'<div style="width: 30%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ $("#recNo").html()
		+'</div></div><div style="width:40%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 13%; float: left; padding-left: 50%;padding-bottom: 2%;" align="left"><b>Date:</b></div>'
		+'<div style="width: 30%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+$("#bdate").html()
		+'</div></div></div><div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; padding-left: 3%;padding-bottom: 2%;" align="left"><b>Income Type:</b></div>'
		+'<div style="width: 75%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+$("#amountPaid").val()
		+'</div></div><div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; padding-left: 3%;padding-bottom: 2%;" align="left"><b>The SUM of Rs.(In Words):</b></div>'
		+'<label style="width: 66%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left" id="amountinwords">'
		+ $("#amountInWords").val()
		+" Only."+'</label></div><div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; padding-left: 3%;padding-bottom: 2%;" align="left"><b>In Cash/Card:</b></div>			<div style="width: 30%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ $("#selAmountType").val()
		+'</div></div><div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; padding-left: 3%;padding-bottom: 2%;" align="left"><b>Group Name:</b></div>			<div style="width: 75%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ vouName
		+'</div></div><div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; padding-left: 3%;padding-bottom: 2%;" align="left"><b>Ledger Head:</b></div>			<div style="width: 75%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ $("#selectLedgerHead").text()
		+'</div></div><div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; padding-left: 3%;padding-bottom: 2%;" align="left"><b>Ref To:</b></div>			<div style="width: 30%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+ $("#selRefTo").val()
		+'</div></div><div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 19%; float: left; padding-left: 3%;padding-bottom: 2%;" align="left"><b>Remark:</b></div>			<div style="width: 75%; float: left; padding-left: 2%;padding-bottom: 2%;" align="left">'
		+$ ("#txtRemark").val()
		+'</div></div><div style="width: 100%; float: left; padding-left: 2%;padding-bottom:7%;" align="left">'
		+'<div style="width: 30%; float: left; padding-left: 2%;border:0px solid;padding-bottom: 2%;" align="left">'
		+'<div style="width: 30%; float: left; padding-left: 3%;border:1px solid;padding-bottom: 2%;" align="left">Rs.</div>'
		+'<div style="width: 60%; float: left; padding-left: 2%;border:1px solid;padding-bottom: 2%;" align="left">'
		+ $("#txtAmount").val()
		+"/-"+'</div></div></div><br></br><br></br><br></br><br></br>'
		+'<div style="width: 100%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width:50%; float: left; padding-left: 6%;" align="left">'
		+'<div style="width: 40%; float: left; padding-left: 110%;padding-bottom: 2%;" align="left"><b>Payees Sign</b></div>'
		+'<div style="width: 65%; float: left; padding-left: 90%;padding-bottom: 2%;" align="left">(On behalf of AIMS Hospital)</div></div>'
		+'<div style="width:40%; float: left; padding-left: 2%;" align="left">'
		+'<div style="width: 30%; float: left; padding-left: 76%;padding-top: 10%;" align="left"><b>Received By</b></div></div></div></div>');
WindowObject.document.writeln('</body></html>');
WindowObject.document.close();  

WindowObject.focus();

WindowObject.print();

WindowObject.close();*/
	

	window.open("ReceiptVoucherPrint.jsp?&voucherID=" + voucherId);


}


function autoSuggRcptVchrCmnyNm(inputId, callfrom) {
	var letter = "";
	var call = $("#searchFrom").val();
	letter = $("#byType").val();
	
	if(letter=="" && callfrom == "search"){
		alertify.error("please enter Company Name");
		return false;
	}
	var inputs = [];
	inputs.push('letter=' + letter);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/vouchers/autoSuggRcptVchrCmnyNm",
		timeout : 1000 * 60 * 15,
		cache : false,
		success : function(r) {
			var response = r;
			
			if(callfrom == "search"){
				$("#byType").val("");
				if(response.listIPDReceiptVoucherDTO.length==0){
					alertify.error("Company Name Not found...");
					return false;
				}
			}
			setReceiptVoucherTemplate(response);
		}
	});
}

function clearFields(){
	$("#receiptVoucherId").val(0);
	$("#companyName").val("");
	$("#receivedFrom").val("");
	$("#amountPaid").val("");
	$("#amountInWords").val("");
	$("#selAmountType").val(1);
	$("#selRefTo").val(0);
	$("#txtAmount").val("");
	$("#txtRemark").val("");
	$("#selectVoucherGrp").val(0);
	$("#selectLedgerHead").val("");
	$("#chequeNumber").val("");
	$("#queryType").val("insert");
}
function changeSlider(cnt){
var qty = $("#qty"+cnt).val();
$("#defaultSlider_"+cnt).val(qty);
}

/*Jitendra 21 march2019*/
function fetchIpdPainScale(){
	
	var pid = $("#pid").val();
	var tid = $("#tid").val();
	var date = $("#date-pick1").val();
	var callform= "datewise";
	
	if(tid == ""){
		tid = $("#treatmentId").val();
	}
	//alert(pid+"-"+tid+"-"+painScore+"-"+Acute+"-"+Chronic+"-"+Loc);
	var inputs = [];
	inputs.push('action=fetchIpdPainScale');
	inputs.push('tid=' + tid);
	inputs.push('pid=' + pid);
	inputs.push('date=' + date);
	inputs.push('callform=' + callform);
	
	
	var str = inputs.join('&');
	var userType = $("#userType").val();

	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			var myObj = eval('(' + ajaxResponse + ')');
			$("#idPainMeasurementScaleOneDay").val(myObj.listDRT[0].painScore);
			if(myObj.listDRT[0].acute == 1){
				$("#idAcute").prop('checked',true);
			}else{
				$("#idAcute").prop('checked',false);
			}
			
			if(myObj.listDRT[0].chronic == 1){
				$("#idChronic").prop('checked',true);
			}else{
				$("#idChronic").prop('checked',false);
			}
			$("#idLoc").val(myObj.listDRT[0].loc);
			$("#idPian").val(myObj.listDRT[0].idPainScale);
			
		}
	});
}

function saveIpdPainScale(){

	var pid = $("#pid").val();
	var tid = $("#tid").val();
	var date= $("#date-pick1").val();
	if(tid == ""){
		tid = $("#treatmentId").val();
	}
	var idPian = $("#idPian").val();
	var painScore = $("#idPainMeasurementScaleOneDay").val();
	var Acute = $("#idAcute").is(":checked") ? 1:0;
	var Chronic = $("#idChronic").is(":checked") ? 1:0;
	var Loc = $("#idLoc").val();
	
	//alert(pid+"-"+tid+"-"+painScore+"-"+Acute+"-"+Chronic+"-"+Loc);
	var inputs = [];
	inputs.push('action=saveIpdPainScale');
	inputs.push('tid=' + tid);
	inputs.push('pid=' + pid);
	inputs.push('painScore=' + painScore);
	inputs.push('Acute=' + Acute);
	inputs.push('Chronic=' + Chronic);
	inputs.push('Loc=' + Loc);
	inputs.push('idPian=' + idPian);
	inputs.push('date=' + date);

	
	var str = inputs.join('&');
	var userType = $("#userType").val();

	jQuery.ajax( {
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "IPDTreatmentServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			alert(r);
			fetchIpdPainScale();
		}
	});
}
function getPrevPatdetailsOPD(){
	
	var pt_Id = $("#pt_Id").val();

	var inputs = [];
	inputs.push('patientId=' + pt_Id);
	inputs.push('deptId=' + 1);

	var str = inputs.join('&');

	jQuery.ajax( {
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/billNoble/getPrevPatdetailsOPD",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			//alert('error');
		},
		success : function(r) {
			var html="";
			for(var i=0; i < r.listTreatment.length ;i++){
				html=html + '<tr><td style="height: 21.5px;" class="col-sm-1-1 center"><input type="checkbox" id="chkopd" name="chkopd" value='+ r.listTreatment[i].treatmentId +'></td>'
					+'<td style="height: 21.5px;" class="col-sm-1-1 center">'+r.listTreatment[i].treatmentId +'</td></tr>';
				
		}
			$("#tbodyopd").html(html);
		}
	});
}

function opdlab(){
	
	if($("#idopdlab").is(':checked')){
		$("#divopdlab").css('display','block');
	}else{
		$("#divopdlab").css('display','none');	
	}
}
function AutoDischargeSummaryPrintopdlab(){
	var dischargedate = $("#discharge_date").val();

	var discharge_Time = $("#discharge_Time").val();
	var timeDate=dischargedate +"  "+ discharge_Time;
	var patID = $("#pid").val();
	var treatID = $("#treatmentId").val();
	var tomId = $("#idSelOperationData").val(); //By Pooja
	var idopd = "";
	if($("#idopdlab").is(':checked')){
	$.each($("input[name='chkopd']:checked"), function(){
		idopd = idopd + $(this).val()+",";
	});
	}
	var divfollow = $("#divfollowDate").html(); //By Pooja
	var discharge_Type = $("#discharge_Type").val();
	var shraddhaFlow=  $("#shraddhaFlow").val();
	window.open("AutoDischargeSummaryPrintDIS.jsp?"+"patID=" +
			encodeURIComponent(patID) + "&treatID=" + encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)+"&tomId="+encodeURIComponent(tomId)
			+"&dischargedate="+encodeURIComponent(timeDate) + "&divfollow="+ divfollow +"&opdlab="+idopd);
	
}
function hideDisSummaryLangPopUpopd(){
	$("#iPrintDsPopUpOPD").hide();	
}

function printpainscale(){
	
	var pid = $("#pid").val();
	var tid = $("#tid").val();
	var date = $("#date-pick1").val();
	var from_date = $("#fromDate").val();//jitendra 10 april 2019
	var to_date = $("#toDate").val();
	
	
	
	
	setTimeout(function() {
		window.open(("iPD_PainScale_Print.jsp?pid=" + pid + "&tid=" + tid +  "&date=" + date
				+"&fromDate=" + encodeURIComponent(from_date) + "&toDate=" + encodeURIComponent(to_date)));
	}, 300);
	
}
//added By Badrinath Wagh
//For Ipd Physical Discharge Tab

function showPatientDischargeDetails(patId,treatId){
	
	$("#onloadDiv").hide();
	$("#operationPlan").hide();
	$("#dischargePlan").show();
	var ajaxResponse = $("#Discharge").html();

$.ajax({
		
		async : false,
		type : "POST",
		data : { "treatId" : treatId,
				"patientId": patId},
		url : "./ehat/IPD_Discharge/fetchPhyDisDetailsbyTreatmentId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {

			/*alert("list start time:: "+r.toli[0].st)
			alert("list endtime:: "+r.toli[0].et)
			alert("list date:: "+r.toli[0].dt)
			alert("list date:: "+r.toli[0].otid)
			alert("list date:: "+r.toli[0].diff)*/
			
			$("#dateAdmission").val(r.plandatalist[0].dateAdmission);
			$("#dateExpectedDischarge").val(r.plandatalist[0].dateExpectedDischarge);
			$("#timeExpectedDischarge").val(r.plandatalist[0].dateSet);
			$("#isInformed").val(r.plandatalist[0].isInformed);
			$("#transportArranged").val(r.plandatalist[0].transportArranged);
			$("#transOwnArrvTime").val(r.plandatalist[0].transOwnArrvTime);
		//	$("#durationHrs").val(r.toli[0].duration);
			$("#patName").text(r.plandatalist[0].patientName);
			if(r.plandatalist[0].isTDL == 'Y')
			{
				$("#isTDL").attr("checked",true);
			}else{
				$("#isTDL").attr("checked",false);
			}
			if(r.plandatalist[0].isTransportOwnBooked == 'Y')
			{
				$("#isTransportOwnBooked").attr("checked",true);
			}else{
				$("#isTransportOwnBooked").attr("checked",false);
			}

			
			
		}
		
	});

}

function getAllPrescriptionsForMedication(){
	
	var treatmentId = $.trim($('#tr_Id').val()); 
	var unitID = $("#unitId").val();
	var date= $("#OFdate-pick").val();
	
	
	if(treatmentId !=undefined && treatmentId !=null && treatmentId !="" && treatmentId !="null"){
		
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('unitId=' + unitID);
		inputs.push('date=' + date);
		
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/prescriptionController/getAllPrescriptionsNursingStation",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				setAllPrescriptionsForMedication(r);
			}
		});
	}
}

function setAllPrescriptionsForMedication(r){
	
	var testObj = r;
	
	var selectDate= $("#OFdate-pick").val();
	
	var selectDate2 = selectDate.split("/");
	var dd=selectDate2[0];
	var mm=selectDate2[1];
	var yy=selectDate2[2];
	var toDate=mm+"/"+dd+"/"+yy;

	var prescriptionContentTemp = "";
	var prescriptionContentRev = "";
	var instruction = "";
	var prep = "";
	var unit = "";
	var frequency="";
	
	var prepCount = 0;
	var dose = "";
	
	if (testObj.listOPDPrescriptionDtoSP.length > 0) {
		
		var timeSlot="";
		for ( var int = 0; int < testObj.listOPDPrescriptionDtoSP.length; int++) {
			
			
	if(testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication.length>0){	
		
		
		
		for(var j =0; j < testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication.length ;j++){
			
			var doneDate = testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].doneDate;
			// end - start returns difference in milliseconds 
			var doneDate = doneDate.split("/");
			var dd2=doneDate[0];
			var mm2=doneDate[1];
			var yy2=doneDate[2];
			var fromDate=mm2+"/"+dd2+"/"+yy2;
			
			var date11 = new Date(toDate);
			var date22 = new Date(fromDate);
			
			var diffDays1 = date11.getDate() - date22.getDate();
			diffDays1 = diffDays1+1;
			//var diffTime1 = Math.abs(date11 - date22);
			//var diffDays1 = Math.ceil(diffTime1 / (1000 * 60 * 60 * 24));
			 
			var days = testObj.listOPDPrescriptionDtoSP[int].days;
	if(diffDays1<=days && diffDays1>0){		
			if(testObj.listOPDPrescriptionDtoSP[int].dose == null || testObj.listOPDPrescriptionDtoSP[int].dose =='null' ){
				dose ="-"; 
			}else{
				dose = testObj.listOPDPrescriptionDtoSP[int].dose;
			}
			
		if(testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].administeredStatus=='N'){
			
			prescriptionContentTemp = prescriptionContentTemp
			+ "<tr><td class='col-md-1-1 center'>"
			+ ++prepCount
			+ ".</td>"
			+ "<td class='col-md-2-1'>"
			+ testObj.listOPDPrescriptionDtoSP[int].prepName
			+ ". "
			+ testObj.listOPDPrescriptionDtoSP[int].medicineName
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ testObj.listOPDPrescriptionDtoSP[int].strength
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ testObj.listOPDPrescriptionDtoSP[int].dose
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ testObj.listOPDPrescriptionDtoSP[int].unitName
			+ "</td>"
			+ "<td class='col-md-1-1 center' id='timeSlot2'>"
			//+if(j==1){"Morning"}
			+ testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].timeslot
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			//+if(j==1){"Morning"}
			+ diffDays1+"/"+days
			+ "</td>"
			+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
			+ testObj.listOPDPrescriptionDtoSP[int].instructionName
			+ "</td>"
			+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
			+ testObj.listOPDPrescriptionDtoSP[int].days
			+ "</td>"
			+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
			+ testObj.listOPDPrescriptionDtoSP[int].qty
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ "<input name='prepTreatmentMedicineCheckbox' id='checkboxToBeAdmins"
			+ (testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].ipdNursingStationMedicationId)
			+ "' type='checkbox' value='"+(testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].ipdNursingStationMedicationId)+"' style='cursor: pointer; margin-top: 2px;' /></td>"
			+ "</tr>";
		}
		else if(testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].administeredStatus=='Y'){
			
			prescriptionContentRev = prescriptionContentRev
			+ "<tr><td class='col-md-1-1 center'>"
			+ ++prepCount
			+ ".</td>"
			+ "<td class='col-md-2-1'>"
			+ testObj.listOPDPrescriptionDtoSP[int].prepName
			+ ". "
			+ testObj.listOPDPrescriptionDtoSP[int].medicineName
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ testObj.listOPDPrescriptionDtoSP[int].strength
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ testObj.listOPDPrescriptionDtoSP[int].dose
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ testObj.listOPDPrescriptionDtoSP[int].unitName
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].timeslot
			//+ testObj.listOPDPrescriptionDtoSP[int].dayPrescription
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			//+if(j==1){"Morning"}
			+ diffDays1+"/"+days
			+ "</td>"
			+ "<td class='col-md-3-1 center' style='padding-left: 15px;'>"
			+ testObj.listOPDPrescriptionDtoSP[int].instructionName
			+ "</td>"
			+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
			+ testObj.listOPDPrescriptionDtoSP[int].days
			+ "</td>"
			+ "<td class='col-md-1-1 center' style='padding-left: 15px;'>"
			+ testObj.listOPDPrescriptionDtoSP[int].qty
			+ "</td>"
			+ "<td class='col-md-1-1 center'>"
			+ "<input name='prepTreatmentMedicineCheckbox' id='checkboxToBeAdmins"
			+ (testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].ipdNursingStationMedicationId)
			+ "' type='checkbox' value='"+(testObj.listOPDPrescriptionDtoSP[int].listIPDNursingStationMedication[j].ipdNursingStationMedicationId)+"' style='cursor: pointer; margin-top: 2px;' /></td>"
			+ "</tr>";
			
		
		}
		}
		}
		}
	}
}

	//$('#prescriptionContent').html(prescriptionContentTemp);
	$('#orderFormContentAdministrative').html(prescriptionContentTemp);
	//$("#prescription_id").val("0");
	
	//$('#orderFormContentAdministrated').html(prescriptionContentTemp);
	$('#orderFormContentAdministrated').html(prescriptionContentRev);
	//$("#prescription_id").val("0");
	

	/*prepCount = 0;
	$("#prescriptionCoverSheetContent").setTemplate(
			prescriptionCoverSheetContent);
	$("#prescriptionCoverSheetContent")
			.processTemplate(testObj);*/
	
}


function temForDoctorround(id, flag) {

	var d = new Date();
	var month = d.getMonth() + 1;
	var day = d.getDate();
	var year = d.getFullYear();
	var today = (day < 10 ? '0' : '') + day + '/' + (month < 10 ? '0' : '')
			+ month + '/' + year;
	var temp1 = "";
	var temp = '<div class="tab-pane active" id="DailyRoundReport">'
			+ '<div style="padding-left: 30px;" class="col-sm-12-1">'
			+ '<div style="margin-top: 15px;" class="col-sm-2-1">'
			+ '<label class="TextFont">Previous Doctor RoundReport</label></div>'
			 '<div style="margin-top: 15px;" class="col-sm-3-1">'
			+ '<input type="text" readonly="readonly" onclick="displayCalendar(document.getElementById(\'date-pick\'),\'dd/mm/yyyy\',this)" value='
			+ today
			+ ' onchange="setDoctorPreRound()" name="date-pick" id="date-pick" class="form-control input-SmallText">'
			+ '</div><div style="margin-top: 5px;" class="col-sm-1-1">'
			+ '<div class="divide-10"></div>';
	if (flag == "Y") {
		temp1 = '<input type="button" value="Save DRR" class="btn btn-xs btn-success " id="iddrr"  disabled="disabled">';
	} else {
		//temp1 = '<input type="button" value="Save DRR" class="btn btn-xs btn-success editUserAccess" id="iddrr" onclick="saveDoctorRound()">';
		temp1 = '<input type="button" value="Save DRR" class="btn btn-xs btn-success editUserAccess" id="iddrr" onclick="getDoctorRounds()">';
	}

	temp = temp
			+ temp1
			// from and to date added by jitendra 10 april 2019
			+ '</div> <div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<label class="TextFont">From :</label></div>'
			+ '<div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<input type="text" class="form-control input-SmallText" id="fromDate" name="fromDate" onchange="" value='
			+ today
			+ ' onclick="displayCalendar(document.getElementById(\'fromDate\'),\'dd/mm/yyyy\',this)" readonly="readonly">'
			+ '</div>'
			+ '<div style="margin-top: 15px;" class="col-sm-1-1">'
			+ '<label class="TextFont">To :</label>'
			+ '</div>'
			+ '<div class="col-sm-1-1" style="margin-top: 15px;">'
			+ '<input type="text" class="form-control input-SmallText" id="toDate" name="toDate" onchange="" value='
			+ today
			+ ' onclick="displayCalendar(document.getElementById(\'toDate\'),\'dd/mm/yyyy\',this)" readonly="readonly">'
			+ '</div>'
			// print with header.
			+ '<div style="margin-top: 13px;" id="ipdPrintBtn" class="col-sm-1-1">'
			+ '<button data-original-title="Print " title="print with header" class="btn btn-xs btn-warning" data-toggle="tooltip" data-placement="left" title="" onclick="fetchDoctorRoundsByDate()">'
			+ '<i class="fa fa-print"></i></button>'
			// print without header.
			+ '<button style="margin-left:10px;" id="ipdWithoutHeader" title="print without header" data-original-title="Print " class="btn btn-xs btn-warning" data-toggle="tooltip" data-placement="left" title="" onclick="printWithoutHdrDrround()">'
			+ '<i class="fa fa-print"></i></button>'
			+ '</div>'

			+ '</div><div class="col-sm-12-1">'
			+ '<table style="margin-top: 20px; width: 99%;" class="table table-bordered">'
			+ '<thead><tr><th style="height: 21.5px; width: 15px;"><label class="TextFont">#</label></th>'
			+ '<th style="height: 21.5px; width: 15px;"><label class="TextFont">Time</label></th>'
			+ '<th style="height: 21.5px; width: 50px;"><label class="TextFont">Template Name</label></th>'
			+ '<th style="height: 21.5px; width: 90px;"><label class="TextFont">Clinical Notes</label></th>'
			+ '<th style="height: 21.5px; width: 90px;"><label class="TextFont">Investigation Advice222</label></th>'
			+ '<th style="height: 21.5px; width: 60px;"><label class="TextFont">RoundBy</label></th>'
			+ '<th style="height: 21.5px; width: 25px;"><input type="button" class="editUserAccess" value="+" onclick="toCreateDiv(\'RowCount\');"> <input type="button" class="editUserAccess" value="-" onclick="deleteDoctorRoundIPD()"> '
			+ '</th></tr></thead></table></div>'
			+ '<div style="margin-top: -22px; overflow-y: scroll; height: 370px; max-height: auto;" class="col-md-12-1">'
			+ '<table class="table table-striped table-condensed">'
			+ '<tbody id="DRRDiv"><input type="hidden" id="addRowCount" value="0"><input type="hidden" id="RowCount" value="0"></tbody>	'
			+ '</table></div>' + '</div>';
	//$("#ipdDoctorStationJSPHeadDiv").html(temp);
}




//save doctor round
function saveNursingDoctorRounds(){
	
	var separator = '/';
	var replaceWith='-';
	var trCount =$('#DRRDiv >tr').length;
	var listDoctorRoundSlaveDTO=[];
	
	  var treatmentId=$("#tr_Id").val();
	   var unitId=$("#unitId").val();
	   var doctorRoundId = $('#doctorRoundId').val(); //getting doctorRoundId if exist or update
		var previousDate= convertStringtoYYYYMMDD($("#date-pick").val(),separator,replaceWith);
		//var dt=$("#date-pick").val();
		var fromDate=$("#formDate").val();
		var toDate=$("#toDate").val();
		var createdBy=$("#createdBy").val();
		
		
		
		//var fromDate= convertStringtoYYYYMMDD($("#formDate").val(),separator,replaceWith);
		//var toDate= convertStringtoYYYYMMDD($("#toDate").val(),separator,replaceWith); 
		var userId =  $("#userId").val();
	
	if(trCount>0){
		 for(var i=1;i<=trCount;i++){ 
			
			listDoctorRoundSlaveDTO.push({
				"doctorRoundSlaveId":($("#salveId"+i).val()),
				"time":($("#t"+i).val()) + ":00",
				"templateId":$("#tn"+i).val(),
				"clinicalNotes":$("#cf"+i).val(),
				"investigationAdvice":$("#ia"+i).val(),
				"doctorId":$("#rb"+i).val(),
				"unitId":unitId,
			//	$( "#myselect option:selected" ).text();
				"templateId":$("#templateId"+i).val(),
				"templateName":$("#templateName"+i).val(),
					//$("#tn"+i+" option:selected" ).text(),
				"doctorName":$("#rb"+i+" option:selected").text(),
				"drComplitionTime":($("#dtime"+i).val()), //+ ":00",
				"nursingNotes":$("#nursingnotes"+i).val(),
				
			});
		}
		 
		 var dto={
					"doctorRoundId":doctorRoundId,
					"previousDate":previousDate,
					"fromDate":fromDate,
					"toDate":toDate,
					"treatmentId":treatmentId,// Above common defined
					"unitId":unitId,// Above common defined
					"createdBy":createdBy,
					"updatedBy":userId,
					"listDoctorRoundSlaveDTO":listDoctorRoundSlaveDTO
				}; 
	}
	
	   
	$.ajax({
		async 		: false,
        url			: 'ehat/ipdhistory/saveDoctorRounds',
        type		: 'POST',
        dataType	: 'json',
        data		: JSON.stringify(dto),
        contentType	: 'application/json',
        error 		: function() { 
        	//alertify.error('Network Issue!!!'); 
        	alert('Network Issue!!!'); 
        	},
        success		: function (r) {		
			//alertify.success("Saved Doctor Round!");
        	alert("Saved Nursing Doctor Round!");
			//fetchDoctorRounds(treatmentId,unitId);
			 //window.location.reload(true);
		}
		});
}

function hideShow(callFrom){
	
	if(callFrom=="dischargePlan"){
		$("#operationPlan").hide();
	}
	else if(callFrom=="operationPlan"){
		$("#dischargePlan").hide();
	}
	
	
}

function showIpdDischargeSummary(){

	// by husen goundi modified @date 18 nov 2015
	var dischargedate = $("#discharge_date").val();
	if(dischargedate == ""){
		alert("Please save discharge summary then print");
		return false;
	}else{
		
		var discharge_Time = $("#discharge_Time").val();
		var timeDate=dischargedate +"  "+ discharge_Time;
		var patID = $("#pid").val();
		var treatID = $("#treatmentId").val();
		var tomId = $("#tomId").val(); //By Pooja
		
		var divfollow = $("#divfollowDate").html(); //By Pooja
		var discharge_Type = $("#discharge_Type").val();
		
	    var callfrom="Services";
			var type ="";
			var language = "ENGLISH";

			 if(callfrom=="Services"){
				type       =  $("#checkAll").is(":checked");
				
				language   = $('input[name="langDSCheckAllPrint"]:checked').val();
			//	var adNote =$("#admissionNote").is(":checked");
				var adNote =true;
				//var history=$("#history").is(":checked");
				var history=true;
				//var investigation=$("#invest").is(":checked");
				var investigation=true;
				//var treatment=$("#treatment").is(":checked");
				var treatment=true;
			//	var otNotes=$("#otNotes").is(":checked");
				var otNotes=true;
				
				//var dischargeCond=$("#dischrCond").is(":checked");
				var dischargeCond=true;
				//var treatDischarge=$("#treatDischrge").is(":checked");
				var treatDischarge=true;
				//var paediatric=$("#paediatric").is(":checked");
				var paediatric=true;
				//var drRound=$("#drRound").is(":checked");
				var drRound=true;
				
				window.open("ipd_discharge_summary.jsp?"+"patID=" +
						encodeURIComponent(patID) + "&treatID=" 
						+ encodeURIComponent(treatID)+"&discharge_Type="+encodeURIComponent(discharge_Type)
						+  "&tomId="+encodeURIComponent(tomId)
						+  "&dischargedate="+encodeURIComponent(timeDate)
						+  "&language="+language 
						+  "&type="+type
						+  "&adNote="+ encodeURIComponent(adNote)
						+ "&history="+ encodeURIComponent(history)
						+ "&investigation="+ encodeURIComponent(investigation)
						+ "&treatment="+ encodeURIComponent(treatment)
						+ "&otNotes="+ encodeURIComponent(otNotes)
						+ "&dischargeCond="+ encodeURIComponent(dischargeCond)
						+ "&treatDischarge="+ encodeURIComponent(treatDischarge)
						+ "&paediatric="+ encodeURIComponent(paediatric)
						+ "&drRound="+ encodeURIComponent(drRound)
						+ "&callfrom="+callfrom);
			}
				
		
		

		
	}
	

}