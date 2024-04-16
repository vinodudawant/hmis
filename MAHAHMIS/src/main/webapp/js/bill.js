var count = 1;
var sr = 1;
var srForIPDAP = 1;
var rowCount = 1;
var rowCountForIPDAP = 1;
var mm = 1;
var amnt = 0;
var discot = 0;
var Payb = 0;
var comadvcount = 1;

var divContent="<tr><td colspan = 5>No Record Found</td></tr>";

var billDashboard = "{#foreach $T.pl as pl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div	style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.fn}{$T.pl.mn} {$T.pl.ln}</div><div	style='width: 16%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div	style='width: 16%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.trid}</div><div	style='width: 18%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input	onclick='viewBill({$T.pl.pi})' style='font-size: 10px;' type='button'	value='VIEW BILL' class='edit' /></div></div>{#/for}";

var billDashboardForIPD = "<table class='table table-bordered table-striped table-condensed cf '>"
		+ "<tbody>"
		+ "	{#foreach $T.pl as pl}"
		+ "	<tr>"
		+ "		<td class='col-md-1-1 filterable-cell'>{count++}.</td>"
		+ "		<td class='col-md-4-1 filterable-cell' >{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell' >{$T.pl.pi}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell' >{$T.pl.objTreat.trCount}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell' >"
		+ "			<button class='btn btn-xs btn-success' "
		+ "					onclick=viewBillForIPD({$T.pl.pi},'IpdBill') style='font-size: 12px;'>VIEW BILL</button>"
		+ "		</td>" + "	</tr>" + "	{#/for}" + "</tbody>" + "</table>";

var DashboardForIPDAdvance = "<table class='table table-bordered table-striped table-condensed cf '>"
		+ "<tbody>"
		+ "	{#foreach $T.pl as pl}"
		+ "	<tr>"
		+ "		<td class='col-md-1-1 filterable-cell'>{count++}.</td>"
		+ "		<td class='col-md-4-1 filterable-cell' >{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell center' >{$T.pl.pi}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell center' >{$T.pl.objTreat.trCount}</td>"
		+ "		<td class='col-md-1-1 numeric filterable-cell center' >"
		+ "		<button class='btn btn-xs btn-success' "
		+ "				onclick=viewBillForIPD({$T.pl.pi},'IpdAdvance') style='font-size: 12px;' "
		+ " 			data-toggle='tooltip' data-placement='top' title='View Bill'><i class='fa fa-eye'></i></button>"
		+ "		</td>" + "	</tr>" + "	{#/for}" + "</tbody>" + "</table>";

var billDashboardForCorporateAccount = "{#foreach $T.pl as pl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div	style='width: 36%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</div><div	style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.pi}</div><div	style='width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.pl.trid}</div><div	style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.objBillMaster.id}</div><div	style='width: 10%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.pl.objBillMaster.bda}</div><div	style='width: 8%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;'><input	onclick=viewBillForIPD({$T.pl.trid},'billRegister') style='font-size: 10px;' type='button'	value='VIEW BILL' class='edit' /></div></div>{#/for}";

var billcomponent = "{#foreach $T.ol as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.on}'	type='text'  id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.oc}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value=''  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.oc}' id='amt{rowCount}' type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.os}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.toid}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcl as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}' type='text' id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	onkeyup='setBCamount({rowCount})' type='text' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}'	name='txtRowCount' />{#/for}{#foreach $T.bcs1 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}' 	type='text' id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}' id='qty{rowCount}'	 onkeyup='setBCamount({rowCount})' type='text' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' />";

var billOperationcomponent = "{#foreach $T.ol as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.on}'	type='text'  id='eName{rowCount}' /></div>          <div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.oc}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value=''  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.oc}' id='amt{rowCount}' type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.os}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.toid}' id='toid{rowCount++}' />{#/for}{#if $T.bcs1!=''}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs1[0].nm}' type='text' id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs1[0].rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs1[0].qty}' id='qty{rowCount}'	 onkeyup='setBCamount({rowCount})' type='text' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs1[0].amt}' id='amt{rowCount}'  type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.bcs1[0].dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.bcs1[0].id}' id='toid{rowCount++}'	name='txtRowCount' />{#/if}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' />";

var commonPatInfoForBill = "<div style='width: 98%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'>"
		+ "<div style='width: 7%;'>{#if $T.img!= ''}"
		+ "<img src='pharmacy/pharmacy/readImage?url={$T.img}' width='50' height='50' name='patImg' id='patImg' />{#/if}{#if $T.img== ''}"
		+ "<img src='images/patientPhoto.jpg' width='50' height='50' name='patImg' id='patImg' /> {#/if}</div>"
		+ "<div style='width: 93%;'><div style='width: 100%;'><div style='width: 60%;'>"
		+ "<div style='width: 100%;'><div style='width: 20%; padding-left: 7%; font-weight: bold;'>Bill No</div>"
		+ "<div id='invoiceNo' style='width: 65%; color: #002c67;'>{$T.liBM[0].billCount}</div>"
		+ "<input type='hidden' id='txtRecNo1' value='{$T.liBM[0].id}'></div><div style='width: 100%; margin-top: 1%;'>"
		+ "<div style='width: 20%; padding-left: 7%; font-weight: bold;'>Patient Id</div>"
		+ "<div style='width: 65%; color: #002c67;'>{$T.pi}</div></div><div style='width: 100%; margin-top: 1%;'>"
		+ "<div style='width: 20%; padding-left: 7%; font-weight: bold;'>Patient Name</div>"
		+ "<div style='width: 65%; color: #002c67;'>{$T.tit}{$T.fn}&nbsp;{$T.ln}</div></div>"
		+ "<div style='width: 100%; margin-top: 1%;'><div style='width: 20%; padding-left: 7%; font-weight: bold;'>Admiting Doctor</div>"
		+ "<div style='width: 65%; color: #002c67;'>Dr.{$T.admit}</div></div>"
		+ " <!-- <div style='width: 100%; margin-top: 1%;'>"
		+ "<div style='width: 20%; padding-left: 7%; font-weight: bold;'>Patient Category</div>"
		+ "<div id='' style='width: 65%; color: #002c67;'>{$T.sdiscNm}</div></div> -->"
		+ "<div style='width: 100%; margin-top: 1%;'><div style='width: 20%; padding-left: 7%; font-"
		+ "weight: bold;'>Company Name</div><div style='width: 65%; color: #002c67;' id=''>{$T.liBM[0].sdiscNm}</div>"
		+ "</div></div><div style='width: 35%; padding-top: 0%;'><div style='width: 100%;'>"
		+ "<div style='width: 35%; font-weight: bold;'>Bill Date</div>"
		+ "<div style='width: 50%; padding-right: 7%; color: #002c67;' id='billdate'></div>"
		+ "</div><div style='width: 100%; margin-top: 1%;'><div style='width: 35%; font-weight: bold;'>Admission Date</div>"
		+ "<div style='width: 50%; padding-right: 7%; color: #002c67;'>"
		+ "<input type='text' id='tStartDate' name='tStartDate' readonly='readonly' style='width: 50%;' onclick='setCalenderBill()'  value='{$T.objTreat.treStart}'  /></div></div>"
		+ "<div style='width: 100%; margin-top: 1%;'><div style='width: 35%; font-weight: bold;'>Discharge Date</div>"
		+ "<div style='width: 50%; padding-right: 7%; color: #002c67;'>"
		+ "<input type='text' id='tEndDate' style='width: 50%;' readonly='readonly' onclick='setCalenderBill()' value='{$T.objTreat.treEnd}'   /></div></div><div style='width: 100%; margin-top: 1%;'>"
		+ "<div style='width: 35%; font-weight: bold;'>Admission No</div>"
		+ "<div style='width: 50%; padding-right: 7%; color: #002c67;'>{$T.objTreat.trCount}</div></div>"
		+ "<div style='width: 100%; margin-top: 1%;'><div style='width: 35%; font-weight: bold;'>Bed No</div>"
		+ "<div style='width: 50%; padding-right: 7%; color: #002c67;'>{$T.objTreat.sero} ({$T.objTreat.bedridden})"
		+ "</div></div></div></div></div></div>";

var billIPDcomponent = "{#foreach $T.bcs2 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcs3 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}' id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.amt}' id='amt{rowCount}' type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcs4 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.amt}' id='amt{rowCount}' type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcs5 as bcs5}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs5.nm}'	type='text'  id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs5.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs5.qty}' id='qty{rowCount}' type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs5.amt}'   id='amt{rowCount}' type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.bcs5.dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.bcs5.id}' id='toid{rowCount++}' />{#/for}{#if $T.bcs6!=''}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs6[0].nm}'	type='text' id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs6[0].rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs6[0].qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs6[0].amt}' id='amt{rowCount}' type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.bcs6[0].dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.bcs6[0].id}' id='toid{rowCount++}' />{#/if}{#foreach $T.bcs8 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcs1 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.amt}'  id='amt{rowCount}' type='text' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' />";

var payIPDcomponent = "{#foreach $T.bcs2 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div> <div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}' id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;text-align: right;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcs3 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div> <div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px;  padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;text-align: right;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcs4 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div> <div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div> <div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;text-align: right;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcs5 as bcs5}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs5.nm}'	type='text'  id='eName{rowCount}' /></div> <div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.bcs5.dt}</div> <div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs5.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs5.qty}' id='qty{rowCount}' 	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px;  padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;text-align: right;' value='{$T.bcs5.amt}'  id='amt{rowCount}' type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.bcs5.id}' id='toid{rowCount++}' />{#/for}{#if $T.bcs6!=''}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs6[0].nm}'	type='text'  id='eName{rowCount}' /></div> <div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069; '>{$T.bcs6[0].dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs6[0].rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs6[0].qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px;  padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;text-align: right;' value='{$T.bcs6[0].amt}' id='amt{rowCount}'  type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.bcs6[0].id}' id='toid{rowCount++}' />{#/if}{#foreach $T.bcs8 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div> <div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;text-align: right;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}{#foreach $T.bcs1 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.nm}'	type='text'  id='eName{rowCount}' /></div> <div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.qty}'  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;text-align: right;' value='{$T.oli.amt}' id='amt{rowCount}'  type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Total</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input onclick='calTotal(rowCount),test_skill()' id='txtTotal' type='text'  style='width: 79%; border: 1px solid #09C;text-align: right;'></div></div> <div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Discount</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtDiscount' onkeyup='calPayable()' value='{$T.bl[0].da}' type='text'  style='width: 79%; border: 1px solid #09C;text-align: right;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Payable</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtPayable'  value='{$T.bl[0].pay}' type='text'  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Paid</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtPaid' type='text' onkeyup='calRemaining(),calculareRefund()' value='{$T.bl[0].pa}'  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Refund Amount</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtRefund'   value='{$T.bl[0].rfd}' type='text'  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Balance</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtRemaining'   value='{$T.bl[0].ra}' type='text'  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div>";

var payOperationComponent = "{#foreach $T.ol as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.on}'	type='text'  id='eName{rowCount}' /></div><div	style='width: 18%; height: 25px; padding-left: 1%;border-right: 1px solid #069; padding-top: 3px; text-align: center;'>{$T.oli.os}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.oli.oc}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value=''  id='qty{rowCount}'	type='text' onkeyup='setBCamount({rowCount})' /></div><div	style='width: 15%; height: 25px;  padding-left: 1%; border: 1px solid #09C; padding-top: 3px;'><input	style='width: 83%;text-align: right;padding-right:10px; border: 1px solid #09C;' value='{$T.oli.oc}' id='amt{rowCount}' type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.toid}' id='toid{rowCount}' /><input type='hidden' value='{$T.oli.oi}' id='oi{rowCount++}' />{#/for}{#if $T.bcs1!=''}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;' id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs1[0].nm}' 	type='text' id='eName{rowCount}' /></div><div	style='width: 18%; height: 25px; padding-left: 1%; border-right: 1px solid #069; padding-top: 3px; text-align: center;'>{$T.bcs1[0].dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;' value='{$T.bcs1[0].rt}'  id='chr{rowCount}'	type='text' /></div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C;'  value='{$T.bcs1[0].qty}'  id='qty{rowCount}'	onkeyup='setBCamount({rowCount})' type='text' /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%; border: 1px solid #09C; text-align:right' value='{$T.bcs1[0].amt}' id='amt{rowCount}'  type='text' /></div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.bcs1[0].id}' id='toid{rowCount++}'	name='txtRowCount' />{#/if}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Total</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtTotal' onclick='calTotal(rowCount),test_skill()' type='text'  style='width: 65%;text-align: right;padding-right:10px; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Discount</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtDiscount' onkeyup='calPayable()' value='{$T.bl[0].da}' type='text'  style='width: 65%;text-align: right;padding-right:10px; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Payable</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtPayable' value='{$T.bl[0].pay}' type='text'   style='width: 65%;text-align: right;padding-right:10px; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Paid</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtPaid' onkeyup='calRemaining(),calculareRefund()' type='text' value='{$T.bl[0].pa}' style='width: 65%;text-align: right;padding-right:10px; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Refund Amount</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtRefund'   value='{$T.bl[0].rfd}' type='text'  style='width: 70%;text-align: right; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Balance</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtRemaining' type='text' value='{$T.bl[0].ra}' style='width: 65%;text-align: right;padding-right:10px; border: 1px solid #09C;'></div></div>";

var showBillHeader = "<div style='width: 100%;'> <div style='width: 4%; height: 20px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div> <div style='width: 94.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'> <div style='width: 90%; height: 10px; padding-left: 1%; padding-top: 5px;'> <label>BED CHARGES:</label> </div> </div> <div style='width: 100%;'> <div style='width: 100%;border-right: 1px solid #069; padding-left: 0%; padding-top: 5px;' id='bedDetails'> </div> </div> </div>					{#foreach $T.ol as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'>	<div		style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>	<div		style='width: 50%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>		<input style='width: 90%;' value='{$T.oli.on}'			type='text' id='eName{rowCount}' />	</div>	<div		style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>		<input style='width: 90%; border: 1px solid #09C;text-align:right;' value='{$T.oli.op}'			id='chr{rowCount}' type='text' />	</div>	<div		style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>		<input style='width: 90%; border: 1px solid #09C;text-align:center;'			value='0' id='qty{rowCount}' type='text'			onkeyup='setBCamount({rowCount})' />	</div>	<div		style='width: 15%; height: 25px; padding-left: 1%; padding-top: 3px;'>		<input style='width: 90%; border: 1px solid #09C; text-align: right;'			value='0' id='amt{rowCount}' type='text' />	</div></div><input type='hidden' value='{rowCount}' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='{$T.oli.od}' id='toid{rowCount++}' />{#/for}<input type='hidden' value='{rowCount}' id='RowCount'	name='RowCount' /><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Total</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input onclick='calTotalForIPDAPOnload(rowCount),test_skill()' id='txtTotal' type='text'  style='width: 79%; border: 1px solid #09C;text-align: right;'></div></div>	 <div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Service Tax</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtserviceTax'   value='0' type='text' onkeyup='calculateServiceTax()'  style='width: 79%;text-align: right; border: 1px solid #09C;'>%</div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Total+Service Tax</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtserviceTotal'   value='0' type='text'  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div> <div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Discount</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtDiscount' onkeyup='calPayable()' value='' type='text'  style='width: 79%; border: 1px solid #09C;text-align: right;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Payable</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtPayable'  value='' type='text'  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Advance</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtPaid' type='text' onkeyup='calRemaining(),calculareRefund()' value=''  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Refund Amount</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtRefund'   value='' type='text'  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div><div style='width: 100%; height: 28px; ' ><div	style='width: 69.5%; height: 23px; text-align: center;  border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Balance</b></div><div	style='width:  17.1%; height: 23px;  border-bottom: 1px solid #069; padding-left: 1%;  padding-top: 5px;'><input id='txtRemaining'   value='' type='text'  style='width: 79%;text-align: right; border: 1px solid #09C;'></div></div>";

var SpecialDiscountTemp = "<div style='width: 35%; padding-left: 10px;'>Special Discount : </div><div style='width: 60%;'><select style='width: 100%; border: 1px solid #09C;' onchange='getDiscountAmountForOPD()' id='SpecialDisc' disabled='disabled'' ><option value='select'>-Select-</option>{#foreach $T.sl as sl}<option value='{$T.sl.si}'>{$T.sl.sn}</option>{#/for}</select></div>";

var reportIPD = "{#foreach $T.bcs1 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'> {$T.oli.nm} </div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'> {$T.oli.rt} </div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'> {$T.oli.qty} </div><div	style='width: 17%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: right;'> {$T.oli.amt} </div></div>{#/for}{#foreach $T.bcs2 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.oli.nm}</div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.rt}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.qty}</div><div	style='width: 17%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: right;'>{$T.oli.amt}</div></div>{#/for}{#foreach $T.bcs3 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.oli.nm}</div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.rt}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.qty}</div><div	style='width: 17%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: right;'>{$T.oli.amt}</div></div>{#/for}{#foreach $T.bcs4 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.oli.nm}</div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.oli.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.rt}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.oli.qty}</div><div	style='width: 17%; height: 25px; padding-left: 1%; padding-top: 3px; text-align:right;'>{$T.oli.amt}</div></div>{#/for}{#foreach $T.bcs5 as bcs5}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.bcs5.nm}</div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.bcs5.dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.bcs5.rt}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.bcs5.qty}</div><div	style='width: 17%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: right;'>{$T.bcs5.amt}</div></div>{#/for}{#if $T.bcs6!=''}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.bcs6[0].nm}</div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center; border-right: 1px solid #069;'>{$T.bcs6[0].dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.bcs6[0].rt}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.bcs6[0].qty}</div><div	style='width: 17%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: right;'>{$T.bcs6[0].amt}</div></div>{#/if} <div style='width: 100%; height: 28px; text-align: right;'><div	style='width: 69.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Total</b></div><div	style='width: 17.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;' id='txtTotal'> </div></div><div style='width: 100%; height: 28px;'><div	style='width: 69.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px; text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Discount</b></div><div	style='width: 17.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: right;'> {$T.bl[0].da} </div></div><div style='width: 100%; height: 28px;'><div	style='width: 69.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px; text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Payable</b></div><div	style='width: 17.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: right;'> {$T.bl[0].pay} </div></div><div style='width: 100%; height: 28px;'><div	style='width: 69.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px; text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Paid</b></div><div	style='width: 17.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: right;'> {$T.bl[0].pa} </div></div><div style='width: 100%; height: 28px;'><div	style='width: 69.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Balance</b></div><div	style='width: 17.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: right;'> {$T.bl[0].ra} </div></div>";
var reportOPD = "{#foreach $T.bcs4 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.oli.nm}</div><div	style='width: 17%; height: 25px; padding-left: 1%; border-right: 1px solid #069; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div><div	style='width: 12.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;text-align: center;'>{$T.oli.rt}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;text-align: center;'>{$T.oli.qty}</div><div	style='width: 19%; height: 25px; padding-left: 1%; padding-top: 3px;text-align: right;'>{$T.oli.rt}</div></div>{#/for}{#foreach $T.bcs2 as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.oli.nm}</div><div	style='width: 17%; height: 25px; padding-left: 1%; border-right: 1px solid #069; padding-top: 3px; text-align: center;'>{$T.oli.dt}</div><div	style='width: 12.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;text-align: center;'>{$T.oli.rt}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;text-align: center;'>{$T.oli.qty}</div><div	style='width: 19%; height: 25px; padding-left: 1%; padding-top: 3px;text-align: right;'>{$T.oli.rt}</div></div>{#/for}<div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Total</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;' id='txtTotal'></div></div><div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Discount</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;'>{$T.bl[0].da}</div></div><div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Payable</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;'>{$T.bl[0].pay}</div></div><div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Paid</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;'>{$T.bl[0].pa}</div></div><div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Balance</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;'>{$T.bl[0].ra}</div></div>";
var reportOperation = "{#foreach $T.ol as oli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'> {$T.oli.on}</div><div	style='width: 17.2%; height: 25px; padding-left: 1%; border-right: 1px solid #069; padding-top: 3px; text-align: center;'>{$T.oli.os}</div><div	style='width: 12.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' >{$T.oli.oc}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'id='qty{rowCount}'></div><div	style='width: 15%; height: 25px; padding-left: 1%; padding-top: 3px;'>{$T.oli.oc}</div></div>{#/for}{#if $T.bcs1!=''}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'	id='Billdiv{rowCount}'><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.bcs1[0].nm}</div><div	style='width: 18%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.bcs1[0].dt}</div><div	style='width: 13.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>{$T.bcs1[0].rt}</div><div	style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>{$T.bcs1[0].qty}</div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>{$T.bcs1[0].amt}</div></div>{#/if}<div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Total</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;' id='txtTotal'></div></div><div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Discount</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;'>{$T.bl[0].da}</div></div><div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Payable</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;'>{$T.bl[0].pay}</div></div><div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Paid</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;'>{$T.bl[0].pa}</div></div><div style='width: 100%; height: 28px;'><div	style='width: 67.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;text-align: right;'></div><div	style='width: 12%; height: 23px; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;'><b>Balance</b></div><div	style='width: 19.1%; height: 23px; border-bottom: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: right;'>{$T.bl[0].ra}</div></div>";

var defaultViewHallTypeTemp = "{#foreach $T.htli as htli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}' style='width: 16.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.htli.idht} </div> <div style='width: 40.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.htli.htnm}</div>  <div style='width: 16.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT'  class='edit' id='btnEdit{count}' onclick='editHallType({$T.htli.idht})' /></div><div style='width: 16.3%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='DELETE'  class='edit' id='btnDelete{count}' onClick='deleteHallType({$T.htli.idht})'/></div>{#/for}";

var billDashboardForAdvanceReceiptIPD = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Admission No</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Bed ID</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>View</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='overflow-y:scroll; margin-top:-21px; height: 220px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.objTreat.trCount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'></td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='VIEW BILL' id='btnView{count}' onclick='viewBillForIPD({$T.pl.pi},'IpdBillReceipt')'>"
		+ "<i class='fa fa-eye View'></i>" + "</button>" + "</tr>" + "{#/for}"
		+ "</tbody>" + "</table>" + "</div>";

var opd_temp = "{#foreach $T.pl as pl}{#if $T.pl.liBM != '' }"
		+ "<table class='table table-bordered cf ' style='Width: 100%; margin-top: -1px;margin-bottom: 0px;'>"
		+ "<tbody>		"
		+ "<tr id='div{++count}'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{count}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-4'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{$T.pl.pi}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.pl.rgDt}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBill({count})'>"
		+ "<img src='images/down.png' id='imgupdown{count}' />"
		+ "<input type='hidden' id='hideShowStatus{count}' value='0' /></td>"
		+ "</tr>"
		+ "</tbody></table>"
		+ "<table id='patPreOPDBill{count}' class='table table-bordered table-striped header-fixed cf ' style='Width: 40%; margin-top: 0px; float: right; display:none;' class='col-md-1 center'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Treatment ID</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Admission No.</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Bill No.</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Bill Date</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>View Bill</th>"
		+ "</tr>"
		+ "{#foreach $T.pl.liBM as liBM}{#if $T.liBM.bda != '' }"
		+ "<tr id='div{count}'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.liBM.tid}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.liBM.bt}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.liBM.id}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class='numeric '>{$T.liBM.bda}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"
		+ "<button value='VIEW BILL' style='height: 21.5px;' onClick='goToOPDPrevBill({$T.liBM.id},{$T.pl.pi},{$T.liBM.tid},{$T.liBM.bda})'>"
		+ "<i class='fa fa-eye View' class='edit'></i></button></td></tr>{#/if}{#/for}</tbody></table>"
		+ "<input type='hidden' value='{count}' id='rowCount' />{#/if}{#/for}";

function setCalenderBill() {
	$('#tStartDate').datePicker({
		clickInput : true
	});

	$('#tEndDate').datePicker({
		clickInput : true
	});
}

function onChangeDiscount(count, type) {
	var reason = "";
	var $checkbox1 = $('input:checkbox[id=chk' + count + ']');

	// var $checkbox3 = $('input:checkbox[id=CheckBox1]');
	// var $checkbox4 = $('input:checkbox[id=CheckBox2]');

	if (type == "receipt") {
		reason = $("#recnarration" + count).val();
		if ("" != reason) {
			var amt = $("#recAmt" + count).val();
			var discount = $("#recDisc" + count).val();
			if (parseFloat(discount) > parseFloat(amt)) {
				alert("Discount Can not be Excced than Amount");
				$("#recDisc" + count).val(0);
				$("#recOlAmt" + count).val(parseFloat(amt).toFixed(2));
				return false;
			} else
				var netAmt = amt - discount;
			$("#recOlAmt" + count).val(netAmt);

		} else if (reason == "") {
			alert("First Fill The Discount Reason");
			$("#recDisc" + count).val(0);
			return false;
		}

	} else {
		reason = $("#narration" + count).val();
		if ("" != reason) {
			var amt = $("#amt" + count).val();
			var discount = $("#discount" + count).val();

			if (parseFloat(discount) > parseFloat(amt)) {
				alert("Discount Can not be Exceed than Amount");
				$("#discount" + count).val(0);
				$("#netAmt" + count).val(parseFloat(amt).toFixed(2));
				return false;
			} else

				var netAmt = amt - discount;
			$("#netAmt" + count).val(parseFloat(netAmt).toFixed(2));

			// }
		} else if (reason == "") {
			alert("First Fill The Discount Reason");
			$("#discount" + count).val(0);

			return false;
		}
		if (($checkbox1.is(':checked')) == true) {

			alert("please remove item from receipt !");
			$("#discount" + count).val(0);
			$("#netAmt" + count).val(parseFloat(amt).toFixed(2));
			return false;
		}
	}
}

function onChangeRate(count) {

	var amt = $("#amt" + count).val();
	var discount = $("#discount" + count).val();

	var netAmt = amt - discount;
	$("#netAmt" + count).val(parseFloat(netAmt).toFixed(2));

}
function calDoctorCharges(count) {

	var chr = $("#chr" + count).val();
	var qty = $("#qty" + count).val();

	var Amt = chr * qty;
	$("#amt" + count).val(Amt);
}

function calTotalDiscount(count, type) {
	var tmp = 0;

	if (type == "receipt") {
		var count = $("#RecRowCount").val();
		for ( var i = 1; i <= count; i++) {

			var x = parseFloat($("#recDisc" + i).val());
			tmp = tmp + x;
		}
		$("#txtDiscountRec").val(tmp);
	} else {
		var count = $("#RowCount").val();
		for ( var i = 1; i <= count; i++) {

			var x = parseFloat($("#discount" + i).val());
			tmp = tmp + x;
		}
		$("#txtDiscount").val(tmp);
	}
}

function calNetAmtTotal(count, type) {
	var tmp = 0;
	var $checkbox3 = $('input:checkbox[id=CheckBox1]');
	var $checkbox4 = $('input:checkbox[id=CheckBox2]');
	if (type == "receipt") {
		var count = $("#RecRowCount").val();
		for ( var i = 1; i <= count; i++) {

			var x = parseFloat($("#recOlAmt" + i).val());
			tmp = tmp + x;
		}
		$("#txtTotalNetAmtRec").val(parseFloat(tmp).toFixed(2));
		$("#finalTotal").val(parseFloat(tmp).toFixed(2));
		if ($checkbox3.is(':checked') == true
				&& $checkbox4.is(':checked') == false)
			$("#cashAmount").val(parseFloat(tmp).toFixed(2));
		if ($("#cashAmount").val() == 0 && $checkbox4.is(':checked') == true)
			$("#cardAmount").val(parseFloat(tmp).toFixed(2));

		test_skill_opdBill();

	} else {
		var count = $("#RowCount").val();
		for ( var i = 1; i <= count; i++) {

			var x = parseFloat($("#netAmt" + i).val());
			tmp = tmp + x;
		}
		$("#txtTotalNetAmt").val(parseFloat(tmp).toFixed(2));
		test_skill_opdBill();
	}
}

function defaultViewHallType() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchHallType');

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
			var ajaxResponse = r;

			var halldetail = eval('(' + ajaxResponse + ')');
			$("#billComponent").setTemplate($("#billComponent").html());
			$("#billComponent").processTemplate(halldetail);
		}
	});
}
function loadBill() {
	var billType = $('input[name=billType]:checked').val();
	if (billType == "auto") {
		TotalIPDBillDetails('pay');
	} else {
		getIPDBillHeaders();
	}
}

function calculateServiceTax() {
	var rem;

	var txtTotal = parseFloat($("#txtTotal").val());
	var txtserviceTax = parseFloat($("#txtserviceTax").val());
	if (isNaN(txtTotal)) {

		rem = 0;
	} else {

		rem = (txtTotal / 100) * (100 + parseFloat(txtserviceTax));
	}
	var rtotalservice = Math.round(rem / 10) * 10;
	$("#txtserviceTotal").val(rtotalservice.toFixed(2));
}
function opdBillTests() {
	var inputs = [];
	inputs.push('action=loadBillTest');

	var str = inputs.join('&');

	jQuery.ajax({
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
			// alert(ajaxResponse);
			TestBean = eval('(' + ajaxResponse + ')');
			$("#testDiv").setTemplate($("#testDiv").html());
			$("#testDiv").processTemplate(TestBean);
		}
	});
}

function opdBillProcedures() {
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
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			sampleBean = eval('(' + ajaxResponse + ')');
			$("#procedureDiv").setTemplate($("#procedureDiv").html());
			$("#procedureDiv").processTemplate(sampleBean);
		}
	});
}

function setOperationCharges() {

	var doctorCharge = $("#doctorCharge").val();
	if (doctorCharge == undefined || doctorCharge == " ") {
		doctorCharge = 0;
	}
	var allVals = [];

	$.each($('#checkbox1:checked'), function() {
		allVals.push($(this).val());
	});
	var procedureChargesTotal = 0;
	for ( var i = 0; i < allVals.length; i++) {

		procedureChargesTotal = parseInt(procedureChargesTotal)
				+ parseInt(allVals[i]);
	}
	// alert(TestChargesTotal);
	$("#txtAmount").val(
			parseInt(doctorCharge) + parseInt(procedureChargesTotal));
	$("#divAmount").html(
			parseInt(doctorCharge) + parseInt(procedureChargesTotal));
	test_skill_opdBill();

}

function setTestCharges() {

	var doctorCharge = $("#doctorCharge").val();
	if (doctorCharge == undefined || doctorCharge == " ") {
		doctorCharge = 0;
	}
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});
	var TestChargesTotal = 0;
	for ( var i = 0; i < allVals.length; i++) {

		TestChargesTotal = parseInt(TestChargesTotal) + parseInt(allVals[i]);
	}
	// alert(TestChargesTotal);
	$("#txtAmount").val(parseInt(doctorCharge) + parseInt(TestChargesTotal));
	$("#divAmount").html(parseInt(doctorCharge) + parseInt(TestChargesTotal));
	test_skill_opdBill();

}

function getConsultingFees() {
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	var TestChargesTotal = 0;
	if (allVals.length > 0) {
		for ( var i = 0; i < allVals.length; i++) {

			TestChargesTotal = parseInt(TestChargesTotal)
					+ parseInt(allVals[i]);
		}
	}
	var inputs = [];
	inputs.push('action=getconsultingFees');

	var str = inputs.join('&');

	jQuery.ajax({
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

			TestBean = eval('(' + ajaxResponse + ')');
			$("#txtAmount").val(
					parseInt(TestBean.ul[0].obd.df)
							+ parseInt(TestChargesTotal));
			$("#divAmount").html(
					(TestBean.ul[0].obd.df) + parseInt(TestChargesTotal));
			$("#doctorCharge").val(TestBean.ul[0].obd.df);

			test_skill_opdBill();
		}
	});

}

function getFollowUpFees() {
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	var TestChargesTotal = 0;
	if (allVals.length > 0) {
		for ( var i = 0; i < allVals.length; i++) {

			TestChargesTotal = parseInt(TestChargesTotal)
					+ parseInt(allVals[i]);
		}
	}
	var inputs = [];
	inputs.push('action=getconsultingFees');

	var str = inputs.join('&');

	jQuery.ajax({
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

			TestBean = eval('(' + ajaxResponse + ')');
			$("#txtAmount").val(
					parseInt(TestBean.ul[0].obd.flwfees)
							+ parseInt(TestChargesTotal));
			$("#divAmount").html(
					parseInt(TestBean.ul[0].obd.flwfees)
							+ parseInt(TestChargesTotal));

			$("#doctorCharge").val(TestBean.ul[0].obd.flwfees);
			test_skill_opdBill();
		}
	});

}

function test_skill_opdBill() {
	var junkVal = $('#finalTotal').val().split("/-");
	// $('#amountinno').html(junkVal);

	$('#finalTotal').val(junkVal);

	junkVal = Math.floor(junkVal[0]);
	var obStr = new String(junkVal);
	numReversed = obStr.split("");
	actnumber = numReversed.reverse();

	if (Number(junkVal) >= 0) {
		// do nothing
	} else {
		alert('wrong Number cannot be converted');
		return false;
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
}

function calTotalForIPDAPOnload() {

	var hallTotal = 0;
	var HallCount = $("#HallCount").val();
	for ( var k = 1; k < HallCount; k++) {
		var hallAmt = parseFloat($("#hallamt" + k).val());
		if (isNaN(hallAmt)) {
			// alert("1");
		} else {
			hallTotal = hallTotal + hallAmt;
		}
	}

	var operationTotal = 0;
	var operationCount = $("#operationCount").val();
	for ( var k = 1; k < operationCount; k++) {
		if ($("#opDivTyp" + k).val() == "oc") {
			var operationAmt = parseFloat($("#operationamt" + k).val());
			if (isNaN(operationAmt)) {
				// alert("1");
			} else {
				operationTotal = operationTotal + operationAmt;
			}
		}
	}

	// Medclinic invoice charges
	var medclinicTotal = 0;
	var medclinicCount = $("#surgeonCount").val();
	for ( var k = 1; k < medclinicCount; k++) {
		medclinicAmt = parseFloat($("#surgeonamt" + k).val());
		if (isNaN(medclinicAmt)) {
			// alert("1");
		} else {
			medclinicTotal = medclinicTotal + medclinicAmt;
		}
	}

	var consultantTotal = 0;
	var consultCount = $("#consultCount").val();
	for ( var k = 1; k < consultCount; k++) {
		var consultantAmt = parseFloat($("#consultamt" + k).val());
		if (isNaN(consultantAmt)) {
			// alert("1");
		} else {
			consultantTotal = consultantTotal + consultantAmt;
		}
	}

	var testTotal = 0;
	var testCount = $("#testCount").val();
	for ( var k = 1; k < testCount; k++) {
		var testAmt = parseFloat($("#testamt" + k).val());
		if (isNaN(testAmt)) {
			// alert("1");
		} else {
			testTotal = testTotal + testAmt;
		}
	}

	var pathotestTotal = 0;
	var pathotestCount = $("#pathotestCount").val();
	for ( var k = 1; k < pathotestCount; k++) {
		var testAmt = parseFloat($("#pathotestamt" + k).val());
		if (isNaN(testAmt)) {
			// alert("1");
		} else {
			pathotestTotal = pathotestTotal + testAmt;
		}
	}

	var matSurTotal = 0;
	var matSurCount = $("#matSurCount").val();
	for ( var k = 1; k < matSurCount; k++) {
		var matSurAmt = parseFloat($("#matSuramt" + k).val());
		if (isNaN(matSurAmt)) {
			// alert("1");
		} else {
			matSurTotal = matSurTotal + matSurAmt;
		}
	}

	var marIpdTotal = 0;
	var marIpdCount = $("#matIpdCount").val();
	for ( var k = 1; k < marIpdCount; k++) {
		var marIpdAmt = parseFloat($("#matIpdamt" + k).val());
		if (isNaN(marIpdAmt)) {
			// alert("1");
		} else {
			marIpdTotal = marIpdTotal + marIpdAmt;
		}
	}
	var ipdservicesTotal = 0;
	var ipdserviceCount = $("#ipdservicesCount").val();
	for ( var k = 1; k < ipdserviceCount; k++) {
		var ipdserviceAmt = parseFloat($("#ipdservicesamt" + k).val());
		if (isNaN(ipdserviceAmt)) {
			// alert("1");
		} else {
			ipdservicesTotal = ipdservicesTotal + ipdserviceAmt;
		}
	}
	var rowCount = $("#RowCount").val();
	var tmp = 0;
	for ( var i = 1; i < rowCount; i++) {
		if (i != 2) {
			var x = parseFloat($("#amt" + i).val());
			tmp = tmp + x;
		}
	}

	// physiotherapy Tests
	var physiotestTotal = 0;
	var physiotestCount = $("#physiotestCount").val();
	for ( var k = 1; k < physiotestCount; k++) {
		var physiotestAmt = parseFloat($("#physiotestamt" + k).val());
		if (isNaN(physiotestAmt)) {
			// alert("1");
		} else {
			// operationTotal = operationTotal + operationAmt;

			physiotestTotal = physiotestTotal + physiotestAmt;
		}
	}

	// BesSide Procedures
	var bedsideTotal = 0;
	var bedsideCount = $("#bedsideCount").val();
	for ( var k = 1; k < bedsideCount; k++) {
		var bedsideAmt = parseFloat($("#bedsideamt" + k).val());
		if (isNaN(bedsideAmt)) {
			// alert("1");
		} else {
			bedsideTotal = bedsideTotal + bedsideAmt;
		}
	}

	// Instrument and equipment
	var instrumentsTotal = 0;
	var instrumentsCount = $("#instrumentsCount").val();
	for ( var k = 1; k < instrumentsCount; k++) {
		var instrumentsAmt = parseFloat($("#instrumentsamt" + k).val());
		if (isNaN(instrumentsAmt)) {
			// alert("1");
		} else {
			instrumentsTotal = instrumentsTotal + instrumentsAmt;
		}
	}

	// nursing amount
	var nursingTotal = parseFloat($("#nursingamt").val());
	if (isNaN(nursingTotal)) {
		nursingTotal = 0;
	}
	// operation theater rent
	var theaterTotal = 0;
	var theaterCount = $("#theaterCount").val();
	for ( var k = 1; k < theaterCount; k++) {
		var theaterAmt = parseFloat($("#theateramt" + k).val());
		if (isNaN(theaterAmt)) {
			// alert("1");
		} else {
			theaterTotal = theaterTotal + theaterAmt;
		}
	}

	// post operation charges
	var postoperationTotal = parseFloat($("#postopamt").val());

	var total = hallTotal + operationTotal + pathotestTotal + consultantTotal
			+ testTotal + tmp + marIpdTotal + matSurTotal + medclinicTotal
			+ ipdservicesTotal + physiotestTotal + bedsideTotal
			+ instrumentsTotal + nursingTotal + theaterTotal
			+ postoperationTotal;

	// administrative charges
	var perAdminAmount = $("#adminCharges").val();

	var admistrativeTotal = hallTotal + operationTotal + consultantTotal
			+ pathotestTotal + testTotal + tmp + ipdservicesTotal
			+ physiotestTotal + bedsideTotal + instrumentsTotal + nursingTotal
			+ theaterTotal + postoperationTotal;
	var administrative = parseInt((parseFloat(admistrativeTotal) * perAdminAmount) / 100);

	// administrative = Math.round(administrative / 10) * 10;// round of total

	$("#chr2").val(administrative.toFixed(2));
	$("#qty2").val(1);
	$("#amt2").val(administrative.toFixed(2));

	total = total + administrative;
	var roundtotal = Math.round(total / 10) * 10;
	$("#txtTotal").val(parseFloat(roundtotal).toFixed(2));
	calculateServiceTax();
	calPayable();
	calRemaining();
	calculareRefund();
}

function calTotalForIPDAPOnclick() {

	var hallTotal = 0;
	var HallCount = $("#HallCount").val();
	for ( var k = 1; k < HallCount; k++) {
		var hallAmt = parseFloat($("#hallamt" + k).val());
		if (isNaN(hallAmt)) {

		} else {
			hallTotal = hallTotal + hallAmt;
		}
	}

	var operationTotal = 0;
	var operationCount = $("#operationCount").val();
	for ( var k = 1; k < operationCount; k++) {
		if ($("#opDivTyp" + k).val() == "oc") {
			var operationAmt = parseFloat($("#operationamt" + k).val());
			if (isNaN(operationAmt)) {

			} else {
				operationTotal = operationTotal + operationAmt;
			}
		}
	}

	// Medclinic invoice charges
	var medclinicTotal = 0;
	var medclinicCount = $("#surgeonCount").val();
	for ( var k = 1; k < medclinicCount; k++) {
		medclinicAmt = parseFloat($("#surgeonamt" + k).val());
		if (isNaN(medclinicAmt)) {

		} else {
			medclinicTotal = medclinicTotal + medclinicAmt;
		}
	}

	var consultantTotal = 0;
	var consultCount = $("#consultCount").val();
	for ( var k = 1; k < consultCount; k++) {
		var consultantAmt = parseFloat($("#consultamt" + k).val());
		if (isNaN(consultantAmt)) {

		} else {
			consultantTotal = consultantTotal + consultantAmt;
		}
	}

	var testTotal = 0;
	var testCount = $("#testCount").val();
	for ( var k = 1; k < testCount; k++) {

		var testAmt = parseFloat($("#testamt" + k).val());
		if (isNaN(testAmt)) {

		} else {
			testTotal = testTotal + testAmt;
		}
	}

	var pathotestTotal = 0;
	var pathotestCount = $("#pathotestCount").val();
	for ( var k = 1; k < pathotestCount; k++) {
		var testAmt = parseFloat($("#pathotestamt" + k).val());
		if (isNaN(testAmt)) {

		} else {
			pathotestTotal = pathotestTotal + testAmt;
		}
	}

	var matSurTotal = 0;
	var matSurCount = $("#matSurCount").val();
	for ( var k = 1; k < matSurCount; k++) {
		var matSurAmt = parseFloat($("#matSuramt" + k).val());
		if (isNaN(matSurAmt)) {

		} else {
			matSurTotal = matSurTotal + matSurAmt;
		}
	}

	var marIpdTotal = 0;
	var marIpdCount = $("#matIpdCount").val();
	for ( var k = 1; k < marIpdCount; k++) {
		var marIpdAmt = parseFloat($("#matIpdamt" + k).val());
		if (isNaN(marIpdAmt)) {

		} else {
			marIpdTotal = marIpdTotal + marIpdAmt;
		}
	}
	var ipdservicesTotal = 0;
	var ipdserviceCount = $("#ipdservicesCount").val();
	for ( var k = 1; k < ipdserviceCount; k++) {
		var ipdserviceAmt = parseFloat($("#ipdservicesamt" + k).val());
		if (isNaN(ipdserviceAmt)) {

			ipdservicesTotal = ipdservicesTotal + ipdserviceAmt;
		}
	}

	var rowCount = $("#RowCount").val();
	var tmp = 0;
	for ( var i = 1; i < rowCount; i++) {
		var x = parseFloat($("#amt" + i).val());
		tmp = tmp + x;
	}

	// physiotherapy Tests
	var physiotestTotal = 0;
	var physiotestCount = $("#physiotestCount").val();
	for ( var k = 1; k < physiotestCount; k++) {
		var physiotestAmt = parseFloat($("#physiotestamt" + k).val());
		if (isNaN(physiotestAmt)) {

		} else {
			physiotestTotal = physiotestTotal + physiotestAmt;
		}
	}

	// BesSide Procedures
	var bedsideTotal = 0;
	var bedsideCount = $("#bedsideCount").val();
	for ( var k = 1; k < bedsideCount; k++) {
		var bedsideAmt = parseFloat($("#bedsideamt" + k).val());
		if (isNaN(bedsideAmt)) {

		} else {
			bedsideTotal = bedsideTotal + bedsideAmt;
		}
	}

	// Instrument and equipment
	var instrumentsTotal = 0;
	var instrumentsCount = $("#instrumentsCount").val();
	for ( var k = 1; k < instrumentsCount; k++) {
		var instrumentsAmt = parseFloat($("#instrumentsamt" + k).val());
		if (isNaN(instrumentsAmt)) {

		} else {
			instrumentsTotal = instrumentsTotal + instrumentsAmt;
		}
	}

	// nursing amount
	var nursingTotal = parseFloat($("#nursingamt").val());

	// operation theater rent
	var theaterTotal = 0;
	var theaterCount = $("#theaterCount").val();
	for ( var k = 1; k < theaterCount; k++) {
		var theaterAmt = parseFloat($("#theateramt" + k).val());
		if (isNaN(theaterAmt)) {

		} else {
			theaterTotal = theaterTotal + theaterAmt;
		}

		// post operation charges
		var postoperationTotal = parseFloat($("#postopamt").val());

		var total = hallTotal + operationTotal + pathotestTotal
				+ consultantTotal + testTotal + tmp + marIpdTotal + matSurTotal
				+ medclinicTotal + ipdservicesTotal + physiotestTotal
				+ bedsideTotal + instrumentsTotal + nursingTotal + theaterTotal
				+ postoperationTotal;

		var rtotal = Math.round(total / 10) * 10;
		$("#txtTotal").val(parseFloat(rtotal).toFixed(2));
		calculateServiceTax();
		calPayable();
		calRemaining();
		calculareRefund();
	}
}

function toRemoveIPDAdvancedPaymentDiv(rowCountForIPDAP) {
	var r = confirm("Do you want to Delete selected Receipt...?");
	if (r == true) {

		var Response1 = $("#divBillAAmt").html();
		ajaxRes = eval('(' + Response1 + ')');
		var allVals = [];

		$.each($('#checkbox:checked'), function() {
			allVals.push($(this).val());
		});

		var k = 0;
		for ( var m = 1; m <= ajaxRes.baali.length; m++) {
			for ( var a = 0; a < allVals.length; a++) {
				if (allVals[a] == ajaxRes.baali[k].baaid) {
					ajaxRes.baali[k].date = "";
				}
			}
			k++;
		}

		if (allVals.length != 0) {

			parsebcObj = JSON.stringify(ajaxRes);

			var inputs = [];
			inputs.push('action=deleteIPDAdvancedPayment');
			inputs.push('parsebcObj=' + parsebcObj);
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
					location.reload();
				}
			});
		}
		var hiddenRowCount = document.getElementById(rowCountForIPDAP);
		var rowCount = hiddenRowCount.value;
		var addrowCount = $("#addRowCountIPDAP").val();
		var count = rowCount - addrowCount;
		var p = 1;
		for ( var i = 0; i < rowCount; i++) {

			var $radios = $('input:checkbox[name=checkbox' + p + ']');
			if ($radios.is(':checked') == true) {
				$("#div" + p + "").remove();
			}
			p++;
		}

	} else {
		var hiddenRowCount = document.getElementById(rowCountForIPDAP);
		var rowCount = hiddenRowCount.value;
		var p = 1;
		for ( var i = 0; i < rowCount; i++) {

			var $radios = $('input:checkbox[name=checkbox' + p + ']');
			if ($radios.is(':checked') == true) {
				($radios).prop("checked", false);
			}
			p++;
		}
	}
}

function editAdvanced(count) {

	var receiptNo = $("#rec_no" + count).val();
	var date = $("#date" + count).val();
	document.getElementById("CheckBox1").checked = false;
	document.getElementById("CheckBox2").checked = false;
	$("#cashamt").hide();
	$("#nothing").hide();
	$("#nothing1").hide();
	$("#cardamt").hide();
	$("#cardNum").hide();
	$("#bankName").hide();

	for ( var i = 0; i < billBean1.baali.length; i++) {

		if (receiptNo == billBean1.baali[i].baaid) {
			$("#advBillId").val(billBean1.baali[i].baaid);
			document.getElementById("recNo").innerHTML = receiptNo;
			document.getElementById("bdate").innerHTML = date;
			$("#txtAmount").val($("#amount" + count).val());
			$("#ipdID").val(billBean1.baali[i].opdbilllist[0].idipd);
			$("#cashAmount").val(billBean1.baali[i].opdbilllist[0].cash_amt);
			$("#cardAmount").val(billBean1.baali[i].opdbilllist[0].card_amt);
			$("#cardNo").val(billBean1.baali[i].opdbilllist[0].card_no);
			$("#cardBankName").val(billBean1.baali[i].opdbilllist[0].bname);
			var modeofpay = billBean1.baali[i].opdbilllist[0].pay_mode;

			$("#seltowards").val($("#heading" + count).val());

			if (modeofpay == "cashNCard") {

				document.getElementById("CheckBox1").checked = true;
				document.getElementById("CheckBox2").checked = true;
				$("#cashamt").show();
				$("#nothing").show();
				$("#nothing1").show();
				$("#cardamt").show();
				$("#cardNum").show();
				$("#bankName").show();
			} else if (modeofpay == "cash") {
				document.getElementById("CheckBox1").checked = true; //
				var el = document.getElementById("show"); // el.innerHTML =
				el.innerHTML.replace(/&nbsp;/g, ''); // var
				abc = $("#cashAmount").val(); // $("#cashamt").html(abc);
				$("#cashamt").show();
				$("#cashAmount").val(abc);
				$("#nothing").show();
				$("#nothing1").show();
				$("#cardNo").val("");
			} else if (modeofpay == "card") {
				document.getElementById("CheckBox2").checked = true;
				var el = document.getElementById("show");
				el.innerHTML = el.innerHTML.replace('', '&nbsp;');
				$("#cardamt").show();
				$("#cardNum").show();
				$("#bankName").show();
			}

			$("#queryType1").val("update");
			break;
		} else {
			$("#queryType1").val("insert");
		}
	}
	test_skill_ipdBill();
}

/** ****************start Pay Bill Functions********************************* */
function setCommonPatInfoForBill() {

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');

	$("#commonPatInfo").setTemplate(commonPatInfoForBill);
	$("#commonPatInfo").processTemplate(pobj1);

	$("#patientname").html(
			pobj1.tit + ". " + pobj1.fn + " " + pobj1.mn + " " + pobj1.ln);

	var billID = $("#billID").html();
	if (pobj1.liBM != undefined) {
		for ( var i = 0; i < pobj1.liBM.length; i++) {
			$("#billdate").html(pobj1.liBM[i].bda);
			$("#SpecialDisc").val(pobj1.liBM[i].sdisc);
			$("#ipdBillId").val(pobj1.liBM[i].id);
		}
	}
}

function ShowPopUpNarra(billFor) {
	//@Touheed @date : 07-oct-2016 @reason  :  For Diagnosis Billing checking
	var myObj = $("#divPatId").html();
	myObj = JSON.parse(myObj);
	
	var serviceWiseBillingFlow = $("#serviceWiseBillingFlow").val();
	if(serviceWiseBillingFlow === "on"){
		var flag = myObj.digReqColTrtflag;
		if(flag == "N"){
			var r = confirm("Diagnostics request is Pending! Do you still want to continue.");
			if(r == false){
				return false;
			}
		}
	}
	
	var billPrintType = ($('input:radio[name=billPrintType]:checked').val());
	if (parseFloat($("#finalOutstanding").html()) > 0
			&& billPrintType == 'general') {
		alert("Patient not paid full payment,Please close this treatment as credit bill");
		return false;
	}
	$("#iPrint").show('show');
}
function HidePopUpNarra() {
	$("#iPrint").hide('hide');
}
function closeTreatment(billFor) {
	var myObj = $("#divPatId").html();
	myObj = JSON.parse(myObj);
	
	//@Touheed @date : 07-oct-2016 @reason  :  For Diagnosis Billing checking
	var serviceWiseBillingFlow = $("#serviceWiseBillingFlow").val();
	if(serviceWiseBillingFlow === "on"){
		var flag = myObj.digReqColTrtflag;
		if(flag == "N"){
			var r = confirm("Diagnostics request is Pending! Do you still want to continue.");
			if(r == false){
				return false;
			}
		}
	}
	
	
	// @author : Touheed Khan @codeDate : 19-Apr-2016 @codeFor : Checking lab
	// bill Paid or Unpaid
	// Treatment will not closed till Lab bill Paid or Credited
	if (billFor == "OPD") {
		var labBillPaidorUnpaid = $("#labBillPaidorUnpaid").val();

		if (labBillPaidorUnpaid == "unpaid") {
			alert("Please, First Collect All the Bills of Lab Tests in Cash/Credit !");
			return false;
		}
	}

	var billPrintType = ($('input:radio[name=billPrintType]:checked').val());
	if (parseFloat($("#finalOutstanding").html()) > 0
			&& billPrintType == 'general') {
		alert("Patient not paid full payment,Please close this treatment as credit bill");
		return false;
	}

	if (parseFloat($("#finalOutstanding").html()) == 0
			&& billPrintType == 'credit') {
		alert("Patient paid full payment,Please close this treatment as General bill");
		return false;
	}

	var invoiceNo = $("#invoiceNo").html();
	if (invoiceNo == 0 && billFor != "OPD") {
		alert("Please Generate Invoice no first.");
		return false;
	} 
	

	else {

		$("#iPrint").hide('hide');
		
		var tEndDate = $("#tEndDate").val();

		var r = confirm("You Want To Close Treatment?");

		if (r == false)
			return false;

		if (r == true) {
			var finalPayable = 0;
			var finalAdvancePaid = 0;
			var remainAmount = 0;
			var finalDiscount = 0;
			var finaltotal = 0;
			var ipdBedCharges = "";
			var pharmaAdvancePaid = 0;
			var finalConcession = 0;
			var finalBillTotal = 0;
			var narra = "";
			var finalAdminChrgs = 0;
			var finalAdminChrgsType = "-";
			var finalServiceTax = 0;
			var finalBillCategoryDiscount = 0;
			if (billFor == "OPD" || billFor == "diagnosis") {

				var comp = $("#iBillMasterList").html();
				compobj = eval('(' + comp + ')');

				for ( var i = 0; i < compobj.listBillMaster.length; i++) {
					if (compobj.listBillMaster[i].bill_flag == "Y") {
						finaltotal = finaltotal
								+ compobj.listBillMaster[i].test_amt;
						finalPayable = finalPayable
								+ compobj.listBillMaster[i].test_payable;
						finalConcession = finalConcession
								+ compobj.listBillMaster[i].test_conc;
					}
				}

				var cashrec = $("#cashDivForRecMaster").html();
				cashrecobj = eval('(' + cashrec + ')');

				for ( var j = 0; j < cashrecobj.listRecMaster.length; j++) {
					finalAdvancePaid = finalAdvancePaid
							+ cashrecobj.listRecMaster[j].pdAmt;
					finalDiscount = finalDiscount
							+ cashrecobj.listRecMaster[j].onBilDis;
				}

				var creditrec = $("#creditDivForRecMaster").html();
				creditrecobj = eval('(' + creditrec + ')');

				for ( var k = 0; k < creditrecobj.listRecMaster.length; k++) {
					finalAdvancePaid = finalAdvancePaid
							+ creditrecobj.listRecMaster[k].pdAmt;
					finalDiscount = finalDiscount
							+ creditrecobj.listRecMaster[k].onBilDis;
				}
				remainAmount = finalPayable - finalAdvancePaid - finalDiscount;
				finalDiscount = finalDiscount + finalConcession;

				// alert(finaltotal+">>>"+finalPayable+">>>"+finalAdvancePaid+">>>"+finalDiscount+">>>"+remainAmount);
				// return false;
			}/*
				 * else if (billFor == "OPD" || billFor == "diagnosis") {
				 * 
				 * finaltotal = ($("#tdEdTotalLabelID").text()).trim(); if
				 * (finaltotal == undefined || finaltotal == "") { finaltotal =
				 * 0; } finalDiscount =
				 * ($("#tdEdTotConcesionLabelID").text()).trim(); if
				 * (finalDiscount == undefined || finalDiscount == "") {
				 * finalDiscount = 0; } finalPayable =
				 * ($("#tdEdTotPayableLabelID").text()).trim(); if (finalPayable ==
				 * undefined || finalPayable == "") { finalPayable = 0; }
				 * finalAdvancePaid = ($("#tdEdTotAmountPaidLabelID").text())
				 * .trim(); if (finalAdvancePaid == undefined ||
				 * finalAdvancePaid == "") { finalAdvancePaid = 0; }
				 * remainAmount = ($("#tdEdTotAmountDueLabelID").text()).trim();
				 * if (remainAmount == undefined || remainAmount == "") {
				 * remainAmount = 0; } }
				 */else {
				finaltotal = ($("#finalBillTotalServiceTax").text()).trim();
				if (finaltotal == undefined || finaltotal == "") {
					finaltotal = 0;
				}
				finalDiscount = ($("#finalDiscount").text()).trim();
				if (finalDiscount == undefined || finalDiscount == "") {
					finalDiscount = 0;
				}
				finalPayable = ($("#finalPayable").text()).trim();
				if (finalPayable == undefined || finalPayable == "") {
					finalPayable = 0;
				}
				finalAdvancePaid = ($("#finalAdvancePaid").text()).trim();
				if (finalAdvancePaid == undefined || finalAdvancePaid == "") {
					finalAdvancePaid = 0;
				}

				pharmaAdvancePaid = ($("#PharmacyAdvancePaid").text()).trim();
				if (pharmaAdvancePaid == undefined || pharmaAdvancePaid == "") {
					pharmaAdvancePaid = 0;
				}

				remainAmount = ($("#finalOutstanding").text()).trim();
				if (remainAmount == undefined || remainAmount == "") {
					remainAmount = 0;
				}
				if (remainAmount == 0) {
					remainAmount = ($("#finalRefund").text()).trim();
					if (remainAmount == undefined || remainAmount == "") {
						remainAmount = 0;
					} else if (remainAmount != "0.00") {
						remainAmount = -remainAmount;
					}
				}
				
				finalBillTotal = ($("#finalBillTotal").text()).trim();
				if (finalBillTotal == undefined || finalBillTotal == "") {
					finalBillTotal = 0;
				}
				
				narra = $("#inarra").val();
				if (narra == undefined || narra == "") {
					narra = 0;
				}
				
				finalAdminChrgs = $("#hiddenDefaultAdminCharge").val();
				finalServiceTax = $("#hiddenDefaultServiceTax").val();
				finalAdminChrgsType = $("#hiddenDefaultAdminChargeType").val();
				finalBillCategoryDiscount = $("#bill_category_discount").val();
				if (finalAdminChrgsType == undefined || finalAdminChrgsType == "") {
					finalAdminChrgsType = "-";
				}
				if (finalAdminChrgs == undefined || finalAdminChrgs == "") {
					finalAdminChrgs = 0;
				}
				if (finalServiceTax == undefined || finalServiceTax == "") {
					finalServiceTax = 0;
				}
				if (finalBillCategoryDiscount == undefined || finalBillCategoryDiscount == "") {
					finalBillCategoryDiscount = 0;
				}
				
				
				var pobj = $("#billComps").html();
				pobj1 = eval('(' + pobj + ')');
				var bedcount = pobj1.bcs4.length;
				var myObj = pobj1.bcs4[bedcount - 1];

				var qty = myObj.qty;
				var dis = myObj.disComp;
				var total = myObj.amt;
				var pay = myObj.pay;
				var copay = myObj.coPay;

				ipdBedCharges = "qty-" + qty + "@dis-" + dis + "@total-"
						+ total + "@pay-" + pay + "@copay-" + copay + "@nursingchargesQuantity-" + myObj.nursingchargesQuantity 
						+ "@nursingchargesDiscount-" + myObj.nursingchargesDiscount + "@netAmt-" + myObj.netAmt
						+ "@nursingchargesPay-" + myObj.nursingchargesPay+ "@nursingchargesCoPay-" + myObj.nursingchargesCoPay;
			}
			
			var myObj = $("#divPatId").html();
			myObj = JSON.parse(myObj);
			
			var inputs = [];
			inputs.push('action=closeTreatment');
			inputs.push('billFor=' + billFor);
			inputs.push('billPrintType=' + billPrintType);
			inputs.push('strTRID=' + myObj.trid);
			inputs.push('convertToIPdFlag=' + convertToIPdFlag);
			inputs.push('finaltotal=' + finaltotal);
			inputs.push('finalDiscount=' + finalDiscount);
			inputs.push('finalPayable=' + finalPayable);
			inputs.push('finalAdvancePaid=' + finalAdvancePaid);
			inputs.push('pharmaAdvancePaid=' + pharmaAdvancePaid);
			inputs.push('remainAmount=' + remainAmount);
			inputs.push('ipdBedCharges=' + ipdBedCharges);
			inputs.push('finalBillTotal=' + finalBillTotal);
			inputs.push('narra=' + narra);
			inputs.push('finalAdminChrgs=' + finalAdminChrgs);
			inputs.push('finalAdminChrgsType=' + finalAdminChrgsType);
			inputs.push('finalServiceTax=' + finalServiceTax);
			inputs.push('finalBillCategoryDiscount=' + finalBillCategoryDiscount);
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
							ajaxResponse = r;
							alert(ajaxResponse);
							if (ajaxResponse != "Please Save Discharge Summary....") {
								if (billFor == "OPD") {
									if (convertToIPdFlag == 1) {
										window.location = "VisitingPatientDatabase.jsp?pid="
												+ myObj.pi;
									} else {
										window.location = "VisitingPatientDatabase.jsp";
									}
								} else if (billFor == "diagnosis") {
									window.location = "diagnoPatBillDashboard.jsp";
								} else {
									// saveIPDHeaderBill("final");
									window.location = "BillingDashboardForIPD.jsp";
								}
							} else if (ajaxResponse == "Please Save Discharge Summary....") {
								//window.location = "IPD_OldPatientDatabase.jsp?moduleName=ipd&patientID="+ (myObj.pi);
								location.reload();
							}
						}
					});
			// window.location = "IPD_OPD_Database.jsp";
		}
	}
}

function calTotalOPD(rowCount) {

	var tmp = 0;
	var rowCount = $("#RowCount").val();
	for ( var i = 1; i <= rowCount; i++) {

		var x = parseFloat($("#amt" + i).val());
		tmp = tmp + x;
	}
	$("#txtTotal").val(parseFloat(tmp).toFixed(2));
}

function calTotal(rowCount) {

	var tmp = 0;
	for ( var i = 1; i <= rowCount; i++) {

		var x = parseFloat($("#amt" + i).val());
		tmp = tmp + x;
	}
	$("#txtTotal").val(parseFloat(tmp).toFixed(2));
	calPayable();
	calRemaining();
}

function calPayable() {
	var pay;
	var txtTotal = parseFloat($("#txtserviceTotal").val());
	var txtDiscount = parseFloat($("#txtDiscount").val());

	if (isNaN(txtDiscount)) {

		pay = 0;
	} else {
		pay = txtDiscount;
	}
	var pay = Math.round((txtTotal - pay) / 10) * 10;
	$("#txtPayable").val(pay.toFixed(2));
	calRemaining();
	calculareRefund();
}

function calRemaining() {
	var rem;

	var txtPayable = parseFloat($("#txtPayable").val());
	var txtPaid = parseFloat($("#txtPaid").val());
	if (isNaN(txtPaid)) {

		rem = 0;
	} else {

		if (txtPaid < txtPayable) {
			rem = txtPayable - txtPaid;
		} else {
			rem = 0;
		}
	}
	var remamt = Math.round((rem) / 10) * 10;
	$("#txtRemaining").val(remamt.toFixed(2));
}

function calculareRefund() {
	var txtPayable = parseFloat($("#txtPayable").val());
	var txtPaid = parseFloat($("#txtPaid").val());
	if (isNaN(txtPaid)) {

		rem = 0;
	} else {
		if (txtPaid > txtPayable) {
			rem = txtPaid - txtPayable;
		} else {
			rem = 0;
		}
	}
	var refund = Math.round(rem / 10) * 10;
	$("#txtRefund").val(refund.toFixed(2));
}

function setTotalDiscount() {
	var rowCount = $("#docDisRowcount").val();
	var txtHospitalDiscount = $("#txtHospitalDiscount").val();
	if (txtHospitalDiscount == "") {
		txtHospitalDiscount = 0;
	}
	var tmp = 0;
	for ( var i = 1; i < rowCount; i++) {
		if ($("#txtdocDiscount" + i).val() != "") {
			var x = parseFloat($("#txtdocDiscount" + i).val());
			tmp = tmp + x;
		}
	}
	var total = tmp + parseFloat(txtHospitalDiscount);
	$("#txtDiscount").val(parseFloat(total).toFixed(2));
	calPayable();
}

var SpecialDiscountTempForCorporateAccount = "<div style='width: 35%; padding-left: 10px;'>Special Discount :</div><div style='width: 60%;'><select style='width: 100%; border: 1px solid #09C;' disabled='disabled'  id='SpecialDisc'><option value='select'>-Select-</option>{#foreach $T.sl as sl}<option value='{$T.sl.si}'>{$T.sl.sn}</option>{#/for}</select></div>";

var SpecialDiscountTempForBillRegister = "<div style='width: 35%; padding-left: 10px;'>Special Discount :</div><div style='width: 60%;'><select style='width: 100%; border: 1px solid #09C;'   id='SpecialDisc'><option value='select'>-Select-</option>{#foreach $T.sl as sl}<option value='{$T.sl.si}'>{$T.sl.sn}</option>{#/for}</select></div>";

function setSpecialDiscount(pageName) {
	var inputs = [];
	inputs.push('action=SetSpecialDiscount');
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

			$("#SpecialDiscountDiv").html(ajaxResponse);
			billBean = eval('(' + ajaxResponse + ')');
			if (pageName == "corporateAccountBill") {
				$("#SpecialDiscount").setTemplate(
						SpecialDiscountTempForCorporateAccount);
				$("#SpecialDiscount").processTemplate(billBean);
			} else if (pageName == "billRegister") {
				$("#SpecialDiscount").setTemplate(
						SpecialDiscountTempForBillRegister);
				$("#SpecialDiscount").processTemplate(billBean);
			} else {
				$("#SpecialDiscount").setTemplate(SpecialDiscountTemp);
				$("#SpecialDiscount").processTemplate(billBean);
			}
			// window.reload();
		}
	});
}

function goTOPayBillForIPD() {
	patInfo = $("#divPatId").html();
	billComps = $("#billComps").html();

	window.location.href = "payForIPD.jsp?" + "patInfo="
			+ encodeURIComponent(patInfo) + "&billComps="
			+ encodeURIComponent(billComps);
}

function goTOPayBill() {
	patInfo = $("#divPatId").html();
	billComps = $("#billComps").html();
	window.location.href = "pay.jsp?" + "patInfo="
			+ encodeURIComponent(patInfo) + "&billComps="
			+ encodeURIComponent(billComps);
}

/** ****************End Pay Bill Functions******************************** */

var billDashboardForMed = "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>{#foreach $T.pl as pl}<tr>"
		+ "<td class='col-md-1-1 center'>{count++}.</td>"
		+ "<td class='col-md-4-1'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-md-1-1 center'>{$T.pl.pi}</td>"
		+ "<td class='col-md-1-1 center'>{$T.pl.objTreat.trCount}</td>"
		+ "<td class='col-md-1-1 center'>"
		+ "	<input onclick=viewBillForIPD({$T.pl.pi},'medclinic')  type='button' value='VIEW INVOICE' class='btn btn-xs btn-success' />"
		+ "</td></tr>{#/for}</tbody></table>";

// ********Function to Display Top 15 Patient bill and search patient bill by ID
// or name*****//

var billDashboardForAdvanceReceiptIPD = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 15px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Admission No</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Bed ID</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>View</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='overflow-y:scroll; border: 1px solid #b8b8b8; margin-top:-21px; height: 430px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.objTreat.trCount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'></td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='VIEW BILL' id='btnView{count}' onclick='viewBillForIPD({$T.pl.pi},'IpdBillReceipt')'>"
		+ "<i class='fa fa-eye View'></i>" + "</button>" + "</tr>" + "{#/for}"
		+ "</tbody>" + "</table>" + "</div>";

function disppatientbillSearch(searchOn, billType) {

	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	count = 1;
	var searchBy;
	var value;
	if (searchOn == "onload") {
		searchBy = "byName";
		value = "value";

	} else if (billType != "BILL") {
		var byName = $("#byName").val();
		var byId = $("#byId").val();
		// var byTreatId = $("#byTreatId").val();
		/**
		 * ************blank space validation
		 * 
		 * @author husen***************
		 */
		var temp = 0;
		if (byName != "") {
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
			alert("please search either by patient Id or by Patient Name");
		} else if (byName == "" && byId == "") {
			alert("please insert something for search");
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;

			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
	} else if (billType == "BILL") {
		/*
		 * if (from == "" || to == "") { alert("please inserst date for
		 * search"); return false; }
		 */
		var byName = $("#byName").val();
		var byId = $("#byId").val();
		// var byTreatId = $("#byTreatId").val();

		if (byName != "" && byId != "") {
			alert("please search either by patient Id or by Patient Name");
		} else if (byName == "" && byId == "") {
			alert("please insert something for search");
		} else {
			if (byName != "") {
				searchBy = "byName";
				value = byName;

			} else if (byId != "") {
				searchBy = "byId";
				value = byId;
			}
		}
		var discountId = $("#SpecialDisc").val();
	}
	var inputs = [];
	inputs.push('action=ShowTopBill');
	inputs.push('searchBy=' + searchBy);
	inputs.push('billType=' + billType);
	inputs.push('from=' + from);
	inputs.push('to=' + to);
	inputs.push('discountId=' + discountId);
	inputs.push('value=' + encodeURIComponent(value));
	inputs.push('searchOn=' + searchOn);
	inputs.push('showFun=showSearchBillPatient');
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

			$("#billDetails").html(ajaxResponse);
			billBean = eval('(' + ajaxResponse + ')');
			if (billBean.pl.length == 0 && searchOn != "onload") {
				alert("Patient Not Found");
			} else {

				if (billType == "IPD") {

					$("#BillContainer").setTemplate(billDashboardForIPD);
					$("#BillContainer").processTemplate(billBean);
				} else if (billType == "OPD") {
					$("#BillContainer").setTemplate(billDashboard);
					$("#BillContainer").processTemplate(billBean);
				} else if (billType == "BILL") {
					$("#BillContainer").setTemplate(
							billDashboardForCorporateAccount);
					$("#BillContainer").processTemplate(billBean);
				} else if (billType == "med") {

					$("#BillContainer").setTemplate(billDashboardForMed);
					$("#BillContainer").processTemplate(billBean);
				} else if (billType == "IPD_AdvanceDashboard") {
					$("#container").setTemplate(
							billDashboardForAdvanceReceiptIPD);
					$("#container").processTemplate(billBean);
				} else if (billType == "IPDAdvance") {
					$("#BillContainer").setTemplate(DashboardForIPDAdvance);
					$("#BillContainer").processTemplate(billBean);
				}
				// window.reload();
			}
		}
	});
}

function viewBillForIPD(patId, pageName) {

	if (pageName == "IpdBill") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		// window.location.href = "BillForIPD.jsp?" + "myObj=" + myObj;
		window.location.href = "payForIPD.jsp?" + "patInfo="
				+ encodeURIComponent(myObj);

	} else if (pageName == "IpdBillReceipt") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		// window.location.href = "BillForIPD.jsp?" + "myObj=" + myObj;
		window.location.href = "advanceReceiptForIPD.jsp?" + "patInfo="
				+ encodeURIComponent(myObj);

	} else if (pageName == "medclinic") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		window.location.href = "medClinicInvoice.jsp?" + "patInfo="
				+ encodeURIComponent(myObj);

	} else if (pageName == "billRegister") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].trid == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		// myObj = myObj.pl[0];
		var billID = myObj.objBillMaster.id;
		var tid = myObj.trid;
		var tit = myObj.tit;
		var fn = myObj.fn;
		var mn = myObj.mn;
		var ln = myObj.ln;
		var pname = tit + " " + fn + " " + mn + " " + ln;
		myObj = JSON.stringify(myObj);
		window.location.href = "CorporateAccountBill.jsp?" + "patInfo="
				+ encodeURIComponent(myObj) + "&billID=" + billID + "&pname="
				+ pname + "&tid=" + tid;

	} else if (pageName == "IpdAdvance") {
		var ajaxResponse = $("#billDetails").html();
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.pl.length; i++) {
			if (myArray.pl[i].pi == patId) {
				myObj = myArray.pl[i];
				break;
			}
		}
		myObj = JSON.stringify(myObj);
		// window.location.href = "BillForIPD.jsp?" + "myObj=" + myObj;
		window.location.href = "IPDAdvance.jsp?" + "patInfo="
				+ encodeURIComponent(myObj);

	} else {
		// var patId = $("#tid").html();
		if (patId == "bill") {

			myArray = JSON.parse($("#divPatId").html());
			myObj = myArray;
		} else {
			myArray = JSON.parse(ajaxResponse);
			for ( var i = 0; i < myArray.lip.length; i++) {
				if (myArray.lip[i].trid == patId) {
					myObj = myArray.lip[i];
					break;
				}
			}
		}
		myObj = JSON.stringify(myObj);
		window.location.href = "billReport.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&select=" + billType;
	}
}

function viewIPDBill(patId) {
	// var myObj;
	myArray = JSON.parse($("#divPatId").html());
	// var patId = $("#tid").html();
	if (patId == "bill") {

		/*
		 * for ( var i = 0; i < myArray.pl.length; i++) { if (myArray.pl[i].trid ==
		 * patId) { myObj = myArray.pl[i]; break; } }
		 */
		myObj = myArray;
	} else {
		myArray = JSON.parse(ajaxResponse);
		for ( var i = 0; i < myArray.lip.length; i++) {
			if (myArray.lip[i].trid == patId) {
				myObj = myArray.lip[i];
				break;
			}
		}
	}
	var billHeader = $("#billHeader").val();

	myObj = JSON.stringify(myObj);
	window.location.href = "payForIPD.jsp?" + "patInfo="
			+ encodeURIComponent(myObj) + "&billHeader=" + billHeader;
}

function setamount() {

	var IName = $("#IName").val();
	// var Rate = $("#Rate").val();
	// var qty = $("#qty").val();
	var rate = $("#Rate").val();
	var qty = $("#qty").val();
	amount = (parseFloat(rate) * parseFloat(qty));

	$("#amount").val(amount);

}

function setBCamount(rowCount) {

	if (rowCount == 2) {
		var rate = $("#chr" + rowCount).val();

		$("#amt" + rowCount).val(rate.toFixed(2));
	} else {
		var rate = $("#chr" + rowCount).val();
		var qty = $("#qty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		$("#amt" + rowCount).val(amount.toFixed(2));
	}
	calTotalForIPDAPOnload();
}

function setHallamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#hallchr" + rowCount).val();
		var qty = $("#hallqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		$("#hallamt" + rowCount).val(amount.toFixed(2));

	}
	calTotalForIPDAPOnload();
}
function setRelativeHallamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#Rhallchr" + rowCount).val();
		var qty = $("#Rhallqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		$("#Rhallamt" + rowCount).val(amount.toFixed(2));

	}
	calTotalForIPDAPOnload();
}
function setOperationamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#operationchr" + rowCount).val();
		var qty = $("#operationqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		$("#operationamt" + rowCount).val(amount.toFixed(2));
	}
	calTotalForIPDAPOnload();
}

function setPathoamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#pathotestchr" + rowCount).val();
		var qty = $("#pathotestqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#pathotestamt" + rowCount).val(amount.toFixed(2));

	}
	calTotalForIPDAPOnload();
}

function setipdservicesamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#ipdserviceschr" + rowCount).val();
		var qty = $("#ipdservicesqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#ipdservicesamt" + rowCount).val(amount.toFixed(2));

	}
	calTotalForIPDAPOnload();
}

function setSurMatamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#matSurchr" + rowCount).val();
		var qty = $("#matSurqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#matSuramt" + rowCount).val(amount.toFixed(2));

	}
	calTotalForIPDAPOnload();
}
function getPostOpCharges() {

	var postamt = 0;
	var postamt = $("#postopchr").val();
	$("#postopamt").val(postamt);
	calTotalForIPDAPOnload();
}

function setIpdMatamount(rowCount) {

	if (rowCount == 0) {
	} else {
		var rate = $("#matIpdchr" + rowCount).val();
		var qty = $("#matIpdqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#matIpdamt" + rowCount).val(amount.toFixed(2));
	}
	calTotalForIPDAPOnload();
}

function setTestamount(rowCount) {

	if (rowCount == 0) {
	} else {
		var rate = $("#testchr" + rowCount).val();
		var qty = $("#testqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#testamt" + rowCount).val(amount.toFixed(2));
	}
	calTotalForIPDAPOnload();
}

function setphysioTestamount(rowCount) {

	if (rowCount == 0) {
	} else {
		var rate = $("#physiotestchr" + rowCount).val();
		var qty = $("#physiotestqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#physiotestamt" + rowCount).val(amount.toFixed(2));
	}
	calTotalForIPDAPOnload();
}

function setbedsideamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#bedsidechr" + rowCount).val();
		var qty = $("#bedsideqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#bedsideamt" + rowCount).val(amount.toFixed(2));
	}
	calTotalForIPDAPOnload();
}

function setinstrumentsamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#instrumentschr" + rowCount).val();
		var qty = $("#instrumentsqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#instrumentsamt" + rowCount).val(amount.toFixed(2));
	}
	calTotalForIPDAPOnload();
}

function setnursingamount() {
	var rate = $("#nursingchr").val();
	var qty = $("#nursingqty").val();
	amount = (parseFloat(rate) * parseFloat(qty));
	$("#nursingamt").val(amount.toFixed(2));
	calTotalForIPDAPOnload();
}

function settheateramount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#theaterchr" + rowCount).val();
		var qty = $("#theaterqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#theateramt" + rowCount).val(amount.toFixed(2));
	}
	calTotalForIPDAPOnload();
}

function setpostopamount() {

	var rate = $("#postopchr").val();
	var qty = $("#postopqty").val();
	amount = (parseFloat(rate) * parseFloat(qty));
	$("#postopamt").val(amount.toFixed(2));

	calTotalForIPDAPOnload();
}

function setConsultantamount(rowCount) {

	if (rowCount == 0) {
	} else {

		var rate = $("#consultchr" + rowCount).val();
		var qty = $("#consultqty" + rowCount).val();
		amount = (parseFloat(rate) * parseFloat(qty));
		if (isNaN(amount)) {
			amount = 0;
		}
		$("#consultamt" + rowCount).val(amount.toFixed(2));

	}
	calTotalForIPDAPOnload();
}

/* deleting rows */
function deleteRows(ele) {

	var r = confirm("Are you sure to delete !");
	if (r == false) {
		return false;
	}
	var trid = $(ele).parents('tr').attr('id');
	if ($("#testType" + trid).val() == 'regCharges') {
		alert("You can not delete Registration charges !");
		return false;
	}
	if ($("#testType" + trid).val() == 'Doc') {
		alert("You can not delete Consultation charges !");
		return false;
	}
	if ($("#testType" + trid).val() == 'mlcCharges') {
		alert("You can not delete MLC charges !");
		return false;
	}

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var ti = pobj1.trid;

	var itemId = $('#tdEdItemId' + trid).text();
	var particularName = $('#tdEdPerticulars' + trid).text();
	var billType = $('#billType').val();
	var testType = $('#tdEdTestType' + trid).text();
	var test_opd_bill_id = $('#edId' + trid).val();
	var particularRate = $('#tdEdRate' + trid).text();
	var inputs = [];
	inputs.push('action=SaveOpdBillParticular');
	inputs.push('treatId=' + ti);
	inputs.push('itemId=' + itemId);
	inputs.push('billType=' + billType);
	inputs.push('particularName=' + particularName);
	inputs.push('particularRate=' + particularRate);
	inputs.push('testType=' + testType);
	inputs.push('test_opd_bill_id=' + test_opd_bill_id);
	inputs.push('callFrom=' + 'deleteFun');

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
			if ($('#billType').val() == 'opd') {
				OPDbillDetails("pay", "opd");
				setNewReceipt();
			} else {
				OPDbillDetails("pay", "diagnosis");
				setNewReceipt();
			}
		}
	});
}

/* New Test Assign */
function newTestAssign() {

	document.getElementById("serviceHeading").disabled = false;
	document.getElementById("particulars").disabled = false;
	document.getElementById("particularRate").disabled = false;
	document.getElementById("particularqty").disabled = false;
	document.getElementById("particularConcession").disabled = false;

	$('#serviceHeading').prop('selectedIndex', 0);
	$('#particulars').val('');
	$('#itemid').val('0');
	$('#particularRate').val('');
	$('#particularqty').val('');
	$('#particularamt').val('');
	$('#particularConcession').val('');
	$('#particularPayable').val('');
	$("#igi").val(0);
	$("#rowname").val("");

}

function refreshBillContentAfterEdit() {
	billType = $('#billType').val();
	if (billType == "opd") {
		OPDbillDetails("pay", "opd");
	} else {
		OPDbillDetails("pay", "diagnosis");
	}
}

/* Edit Test Assigned */
function editRows(ele) {
	var trid;
	$("#saveParticularBtn").show();
	document.getElementById("particulars").disabled = true;
	document.getElementById("serviceHeading").disabled = true;
	document.getElementById("deleteRow1").disabled = true;
	document.getElementById("particularqty").disabled = false;

	var pageType = ($('#pageType').text());
	$("#allTestTable tr").each(function() {
		trid = $(ele).parents('tr').attr('id');

		if ($('#tdEdTestType' + trid).text() == 'pathology') {

			if ("diagnosis" === pageType)
				$('#serviceHeading').prop('selectedIndex', 3);
			else
				$('#serviceHeading').prop('selectedIndex', 4);

		} else if ($('#tdEdTestType' + trid).text() == 'physiotherapy') {
			if ("diagnosis" === pageType)
				$('#serviceHeading').prop('selectedIndex', 4);
			else
				$('#serviceHeading').prop('selectedIndex', 5);

		} else if ($('#tdEdTestType' + trid).text() == 'OtherServices') {
			if ("diagnosis" === pageType)
				$('#serviceHeading').prop('selectedIndex', 2);
			else
				$('#serviceHeading').prop('selectedIndex', 3);

		} else if ($('#tdEdTestType' + trid).text() == 'investigation') {
			$('#serviceHeading').prop('selectedIndex', 1);
		} else if ($('#tdEdTestType' + trid).text() == 'radiation') {
			$('#serviceHeading').prop('selectedIndex', 10);
		}
		/*
		 * else if ($('#tdEdTestType' + trid).text() == 'Radiology') {
		 * $('#serviceHeading').prop('selectedIndex', 4); }
		 */else if ($('#tdEdTestType' + trid).text() == 'CasualityServices') {
			$('#serviceHeading').prop('selectedIndex', 2);
		} else if (($('#tdEdTestType' + trid).text() == 'Doc')) {
			$('#serviceHeading').prop('selectedIndex', 7);
			$('#rowId').val(trid);

			var myobj = $("#divPatId").html();
			var patobj = eval('(' + myobj + ')');
			if (patobj.or_flag == "N") {
				document.getElementById("particularRate").disabled = true;
				document.getElementById("particularqty").disabled = true;
			} else {
				document.getElementById("particularRate").disabled = false;
				document.getElementById("particularqty").disabled = false;
				$("#particular_type").val("Doc");
			}

		} else if (($('#tdEdTestType' + trid).text() == 'regCharges')) {
			$('#serviceHeading').prop('selectedIndex', 6);
			$('#rowId').val(trid);
			// document.getElementById("particulars").disabled = true;
			document.getElementById("particularqty").disabled = true;
		} else if (($('#tdEdTestType' + trid).text() == 'mlcCharges')) {
			$('#serviceHeading').prop('selectedIndex', 8);
			$('#rowId').val(trid);
			// document.getElementById("particulars").disabled = true;
			document.getElementById("particularqty").disabled = true;
		} else if (($('#tdEdTestType' + trid).text() == 'consumable')) {
			$('#serviceHeading').prop('selectedIndex', 9);
			$('#rowId').val(trid);
			document.getElementById("particulars").disabled = true;
			document.getElementById("particularqty").disabled = true;
			document.getElementById("particularRate").disabled = true;
		}

		$('#idOpdBill').val($('#tdEdIdOpdBill' + trid).text());
		$('#itemid').val($('#tdEdItemId' + trid).text());
		$('#statusOpd').val($('#tdEdStatusOpd' + trid).text());
		$('#billTypeFlag').val($('#tdEdBillTypeFlag' + trid).text());
		$('#msgOpd').val($('#tdEdMsg' + trid).text());
		$('#billFlag').val($('#tdEdBillFlag' + trid).text());
		$('#particulars').val($('#tdEdPerticulars' + trid).text());
		$('#particularRate').val($('#tdEdRate' + trid).text());
		$('#particularqty').val($('#tdEdQty' + trid).text());
		$('#particularamt').val($('#tdEdAmount' + trid).text());
		$('#particularConcession').val($('#tdEdConcession' + trid).text());
		$('#particularPayable').val($('#tdEdPayable' + trid).text());
		$("#tdEdCheck" + trid).attr("disabled", true);
	});
	$("#pQuerytype").val('update');
	return trid;
}
function calOpdAmount() {
	var qty = $('#particularqty').val();
	if(qty == ""){
		return false;
	}else if (parseInt(qty) == 0) {
		alert("Quantity should be greater than zero !");
		return false;
	}

	var amount;
	amount = parseFloat($("#particularRate").val()) * parseFloat(qty);
	$("#particularamt").val(amount);
	$("#particularPayable").val(amount);//
}

/* on load adding values of td */
function calculateTds(callfrom) {
	var myObj = $("#divPatId").html();
	myObj = JSON.parse(myObj);

	var recTotal = $("#recTotal").html();
	var Totalcredit = $("#recTotalcredit").html();
	var cashDisc = $("#cashDisc").val();
	var creditDisc = $("#creditDisc").val();
	var totalDisc = parseInt(cashDisc) + parseInt(creditDisc);
	var paidAmount = parseInt(recTotal) + parseInt(Totalcredit);// $('#paidAmount').val();
	/*alert(recTotal +"  "+paidAmount);*/
	if (recTotal == "") {
		recTotal = 0;
	}
	if (Totalcredit == "") {
		Totalcredit = 0;
	}
	if (isNaN(paidAmount)) {
		paidAmount = 0;
	}

	var tdPayable = 0;
	var tdTotal = 0;
	var tdConcession = 0;
	var trid;
	var amountDue = 0;

	$("#OpdBillPrescription tr").each(function() {
		trid = $(this).attr('id');
		if (callfrom == 'prev') {
			if (($('#tdEdBillFlag' + trid).html()) === 'Y') {
				tdPayable += parseFloat($('#tdEdPayable' + trid).html());
				tdTotal += parseFloat($('#tdEdAmount' + trid).html());
				tdConcession += parseFloat($('#tdEdConcession' + trid).html());
			}
		} else {
			tdPayable += parseFloat($('#tdEdPayable' + trid).html());
			tdTotal += parseFloat($('#tdEdAmount' + trid).html());
			tdConcession += parseFloat($('#tdEdConcession' + trid).html());

			if (($('#tdEdBillFlag' + trid).html()) === 'N') {
				amountDue += parseFloat($('#tdEdPayable' + trid).html());
			}
		}
	});

	if (callfrom == 'prev') {
		// alert(totalDisc);
		amountDue = tdPayable - parseFloat(paidAmount + totalDisc);
	}

	$("#totalOfTds td")
			.each(
					function() {

						$("#tdEdTotPayable").html(
								'<label style="border: 1px solid;" id="tdEdTotPayableLabelID">'
										+ tdPayable + '</label>').addClass(
								'numeric col-md-2-1 center');

						$("#tdEdTotal").html(
								'<label id="tdEdTotalLabelID">' + tdTotal
										+ '</label>').addClass(
								'numeric col-md-2-1 center');

						$("#tdEdTotConcesion").html(
								'<label id="tdEdTotConcesionLabelID">'
										+ tdConcession + '</label>').addClass(
								'numeric col-md-2-1 center');

						$("#tdEdTotAmountPaid").html(
								'<label id="tdEdTotAmountPaidLabelID">'
										+ paidAmount + '</label>').addClass(
								'numeric col-md-2-1 center');

						$("#tdEdTotAmountDue")
								.html(
										'<label id="tdEdTotAmountDueLabelID" style="border: 1px solid; color: #009933;">'
												+ amountDue + '</label>')
								.addClass('numeric col-md-2-1 center');

					});

	$('#finalTotal').html('<i style="margin-right: 7px;">INR</i>' + tdPayable);

}

var receiptTemp = '<tr id="{rowCount}"><td style="border-top: none; padding: 1px;" class="col-md-1-1" id="tdEdSrno">{rowCount++}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-3-1" id="tdEdPerticulars">{$T.opd.test_name}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdRate">{$T.opd.test_rate}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdQty">{$T.opd.test_qty}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdAmount">{$T.opd.test_amt}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdConcession">{$T.opd.test_conc}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdPayable">{$T.opd.test_payable}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
		+ '<input type="checkbox" id="tdEdCheck" name="checked" value="{$T.opd.id_opd_bill}" /></td>'
		+ '</tr>';

function fetchPatientData(call) {
	var myObj = $("#divPatId").html();

	myObj = JSON.parse(myObj);

	var pi = myObj.pi;

	$("#patient_id").val(pi);
	var recNo = "";

	var opdNo = myObj.treatmentCount;
	var patName = myObj.tit + myObj.fn + ' ' + myObj.mName + ' ' + myObj.ln;
	var patId = myObj.pi;

	if ((myObj.ag) == undefined) {
		(myObj.ag) = "0";
	}

	if ((myObj.month) == undefined) {
		(myObj.month) = "0";
	}

	if ((myObj.days) == undefined) {
		(myObj.days) = "0";
	}

	var patAge = ((myObj.ag) + ' (YY) ') + ((myObj.month) + ' (MM) ')
			+ ((myObj.days) + ' (DD)');

	var patSex = myObj.sx;
	var consultDoc = myObj.di;

	if (myObj.objDoc != undefined) {
		consultDoc = myObj.objDoc.dn;
	}

	var regDate = myObj.ad;
	var patDoa = myObj.ad;
	var patDod = "";
	var patCopId = "";
	var cat_name = "";
	var cat_disc = 0;
	var doa = "";
	if (call == "diagnosis") {
		var dt = (myObj.rgDt).split(' ');
		regDate = dt[0];
		opdNo = myObj.objTreat.trCount;
		$('#consult_doc').text(myObj.objDoc.dn);
		patName = myObj.tit + ' ' + myObj.fn + ' ' + myObj.mn + ' ' + myObj.ln;
		if(myObj.objTreat.ipdBillCat == "1" || myObj.objTreat.ipdBillCat == "2"){
			cat_name = myObj.objTreat.billCategory_Name;
			cat_disc = myObj.objTreat.billCategory_Discount;
		}else{
			cat_name = myObj.objTreat.billCategory_Name + "  ("+myObj.objTreat.billCategory_Discount+" %)";
			cat_disc = myObj.objTreat.billCategory_Discount;
		}
		doa = myObj.objTreat.treStart + " " + myObj.objTreat.int;
	}else{	
		if(myObj.ipdBillCat == "1" || myObj.ipdBillCat == "2"){
			cat_name = myObj.billCategory_Name; 
			cat_disc = myObj.billCategory_Discount;
		}else{
			cat_name = myObj.billCategory_Name + "  ("+myObj.billCategory_Discount+" %)";
			cat_disc = myObj.billCategory_Discount;
		}
		doa = myObj.TstartDate + " " + myObj.int;
	}
	
	var patDoa = myObj.ad;

	$('#rec_no').text(recNo);
	$('#opd_no').text(opdNo);
	$('#patient_name').text(patName);
	$('#patient_id').text(patId);
	$('#pat_age').text(patAge);
	$('#pat_sex').text(patSex);
	$('#consult_doc').text(consultDoc);
	$('#reg_date').text(doa);
	$('#pat_doa').text(patDoa);
	$('#pat_dod').text(patDod);
	$('#pat_copId').text(patCopId); 
	$('#bill_category').text(cat_name);
	$('#billCategory_Discount').val(cat_disc);
	
	if (myObj.refBySource == "select") {
		$('#refby').text("self");
	} else {
		$('#refby').text(myObj.rdn + ' ( ' + myObj.refBySource + ' ) ');
	}
	if (call == "diagnosis") {
		if (myObj.objTreat.rb == "select") {
			$('#refby').text("self");
		} else {
			$('#refby')
					.text(
							myObj.objTreat.txtRefBy + ' ( ' + myObj.objTreat.rb
									+ ' ) ');
		}
	}
	
	if(myObj.requestToConvertIPD == 1){
		$("#requestToIPD").html("<div style='margin-top: -15px;height: 20px; width:100%;margin-left:15px;'><marquee direction= 'right' hspace = '10%' style='color: red;font-weight:bold;'> Convert To IPD </marquee></div>");
	}
	$('#consultDocId').val(consultDoc);
	
}

function fetchPatientDataPrev() {
	var myObj = $("#divPatId").html();
	
	myObj = JSON.parse(myObj);
	var pi = myObj.pi;
	var patDoa;
	var consultDoc = "";
	// var deptrment;
	// deptrment = (myObj.objDoc.dept);
	var refName;
	var sourceName;
	var trid = $("#treatId").val();
	for ( var i = 0; i < myObj.liBM.length; i++) {
		if (trid == myObj.liBM[i].tid) {
			consultDoc = myObj.liBM[i].consFollowup;

			patDoa = myObj.liBM[i].bda;
			opdNo = myObj.liBM[i].bt;
			refName = myObj.liBM[i].refByName;
			sourceName = myObj.liBM[i].rb;

		}
	}
	$("#patient_id").val(pi);
	var recNo = "";
	// var opdNo = myObj.treatmentCount;

	if (undefined == opdNo) {
		opdNo = (myObj.objTreat.trCount);
	}
	var patName = myObj.tit + ' ' + myObj.fn + ' ' + myObj.mn + ' ' + myObj.ln;

	var patId = myObj.pi;

	if ((myObj.ag) == undefined) {
		(myObj.ag) = "0";
	}

	if ((myObj.month) == undefined) {
		(myObj.month) = "0";
	}

	if ((myObj.days) == undefined) {
		(myObj.days) = "0";
	}

	var patAge = ((myObj.ag) + ' (YY) ') + ((myObj.month) + ' (MM) ')
			+ ((myObj.days) + ' (DD)');

	var patSex = myObj.sx;
	var dt = (myObj.rgDt).split(' ');

	var regDate = dt[0];
	var patCopId = "";
	var doa = myObj.objTreat.treStart + " " + myObj.objTreat.int;
	var patDoa = myObj.ad;
	var cat_name = "";
	if(myObj.objTreat.ipdBillCat == "1" || myObj.objTreat.ipdBillCat == "2"){
		cat_name = myObj.objTreat.billCategory_Name; 
	}else{
		cat_name = myObj.objTreat.billCategory_Name + "  ("+myObj.objTreat.billCategory_Discount+"%)";
	}
	

	$('#rec_no').text(recNo);
	$('#opd_no').text(opdNo);
	$('#patient_name').text(patName);
	$('#patient_id').text(patId);
	$('#pat_age').text(patAge);
	$('#pat_sex').text(patSex);
	$('#consult_doc').text(consultDoc);
	$('#reg_date').text(doa);
	// $('#pat_doa').text(patDoa);
	$('#pat_dod').text(patDoa);
	$('#pat_copId').text(patCopId);
	$('#bill_category').text(cat_name);
	$('#bill_category').text(cat_name);
	$('#billCategory_Discount').val(myObj.objTreat.billCategory_Discount);
	
	/*if (!refName == "") {
		$('#refby').text(refName + ' ( ' + sourceName + ' ) ');
	} else if (sourceName == 0) {
		$('#refby').text("self");
	} else {
		$('#refby').text("self");
	}*/
	
	
	if (myObj.objTreat.rb == "select") {
		$('#refby').text("self");
	} else {
		$('#refby')
				.text(
						myObj.objTreat.txtRefBy + ' ( ' + myObj.objTreat.rb
								+ ' ) ');
	}
	
	$('#consultDocId').val(consultDoc);
	// $('#date').text(today);
}

function checkAllParticulars(check,unCheck) {
	var length = ($('#OpdBillPrescription tr').length) + 1;
	for ( var i = 1; i < length; i++) {
		if ($("#tdEdCheck" + i).is(":checked") == false && $('#billFlag'+i).val()=='N') {
			$("#tdEdCheck" + i).prop("checked", true);
			addReceiptComp(i);
		}
	}
}

function unCheckAllParticulars(check,unCheck) {
	var length = ($('#OpdBillPrescription tr').length) + 1;
	$('.'+check).prop("checked", false);
	$('.' + unCheck).prop("checked", true);
	for ( var i = 1; i < length; i++) {
		if($('#billFlag'+i).val()=='N'){
			delRow($("#receiptCounter").val(), i);
		}
	}
	$('#finalAmount').val("0");
}

function OPDbillDetails(tempType, billType, bill) {
	sr = 1;
	rowCount = 1;
	var myObj = $("#divPatId").html();

	myObj = JSON.parse(myObj);
	var pi = myObj.pi;
	var ti = 0;
	if (bill == "prev") {
		ti = $("#treatId").val();
	} else {
		ti = myObj.trid;
	}

	var inputs = [];
	inputs.push('action=ShowOPDPatientBill');
	inputs.push('pi=' + pi);
	inputs.push('ti=' + ti);
	inputs.push('billType=' + billType);
	// inputs.push('spdicID=' + spdicID);
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
					//alert(r);
					var billComps = r;
					var billBean = eval('(' + billComps + ')');
					$("#iBillMasterList").html(r);
					var strDate = "";
					var d = new Date();
					strDate = d.getDate() + "/" + (d.getMonth() + 1) + "/"
							+ d.getFullYear();

					rowCount = 1;

					if (billType == 'opd') {

						$("#OpdBillPrescription")
								.setTemplate(
										'{#foreach $T.liOpd[2] as opd}'
												+ '{#if $T.opd.lrflag=="N"}'
												+ '<tr id="{rowCount}"><td style="border-top: none; padding: 1px; padding-left: 5px;" class="col-md-1-1">{rowCount}</td>'
												+ '<td style="display: none;" id="tdEdItemId{rowCount}">{$T.opd.id_test}</td>'
												+ '<td style="display: none;" id="tdEdBillFlag{rowCount}">{$T.opd.bill_flag}</td>'
												+ '<td style="display: none;" id="tdEdMsg{rowCount}">{$T.opd.msg}</td>'
												+ '<td style="display: none;" id="tdEdStatusOpd{rowCount}">{$T.opd.test_status}</td>'
												+ '<td style="display: none;" id="tdEdIdOpdBill{rowCount}">{$T.opd.id_opd_bill}</td>'
												+ '<td style="display: none;" id="tdEdBillTypeFlag{rowCount}">{$T.opd.bill_type_flag}</td>'
												+ '<td style="border-top: none; padding: 1px; display: none;" class="col-md-1-1" id="tdEdTestType{rowCount}">{$T.opd.test_type}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="col-md-3-1" id="tdEdPerticulars{rowCount}">{$T.opd.test_name}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdRate{rowCount}">{$T.opd.test_rate}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdQty{rowCount}">{$T.opd.test_qty}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdAmount{rowCount}">{$T.opd.test_amt}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdConcession{rowCount}">{$T.opd.test_conc}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdPayable{rowCount}">{$T.opd.test_payable}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
												+ '{#if $T.opd.bill_flag=="N"}'
												+ '<input type="checkbox" style="cursor: pointer;" onClick="addReceiptComp({rowCount})" class="particularChk" id="tdEdCheck{rowCount}" name="tdEdCheck{rowCount}" value="{$T.opd.id_opd_bill}" />'
												+ '<i id="editRow{rowCount}" type="button" class="fa fa-edit fa-1x" style="margin-left: 6px;cursor: pointer;" onclick="editRows(this)"></i>'
												+ '<i id="deleteRow{rowCount}" type="button" style="margin-left: 6px;cursor: pointer;" class="fa fa-trash-o fa-1x" onclick="deleteRows(this)"></i>'
												+ '{#else}<input type="checkbox" onClick="addReceiptComp({rowCount})" id="tdEdCheck{rowCount}" name="checked" value="{$T.opd.id_opd_bill}" disabled="disabled" />'
												+ '<i id="editRow{rowCount}" type="button" class="fa fa-edit fa-1x" style="margin-left: 6px;cursor: pointer;"></i>'
												+ '<i id="deleteRow{rowCount}" type="button" style="margin-left: 6px;cursor: pointer;" class="fa fa-trash-o fa-1x"></i>{#/if}</td>'
												+ '<input type="hidden" id="edId{rowCount}" value="{$T.opd.id_opd_bill}" />'
												+ '<input type="hidden" id="billFlag{rowCount}" value="{$T.opd.bill_flag}" />'
												+ '<input type="hidden" id="txtRow{rowCount}" value="{rowCount}" />'
												+ '<input type="hidden" id="testId{rowCount}" value="{$T.opd.id_test}" />'
												+ '<input type="hidden" id="testType{rowCount}" value="{$T.opd.test_type}" />'
												+ '<input type="hidden" id="labflag{rowCount}" value="{$T.opd.lrflag}" />'
												+ '<input type="hidden" id="Msg{rowCount++}" value="{$T.opd.msg}" /></tr>'
												+ '{#else}'
												+ '<tr id="{rowCount}"><td style="border-top: none; padding: 1px; padding-left: 5px;" class="col-md-1-1">{rowCount}</td>'
												+ '<td style="display: none;" id="tdEdItemId{rowCount}">{$T.opd.id_test}</td>'
												+ '<td style="display: none;" id="tdEdBillFlag{rowCount}">{$T.opd.bill_flag}</td>'
												+ '<td style="display: none;" id="tdEdMsg{rowCount}">{$T.opd.msg}</td>'
												+ '<td style="display: none;" id="tdEdStatusOpd{rowCount}">{$T.opd.test_status}</td>'
												+ '<td style="display: none;" id="tdEdIdOpdBill{rowCount}">{$T.opd.id_opd_bill}</td>'
												+ '<td style="display: none;" id="tdEdBillTypeFlag{rowCount}">{$T.opd.bill_type_flag}</td>'
												+ '<td style="border-top: none; padding: 1px; display: none;" class="col-md-1-1" id="tdEdTestType{rowCount}">{$T.opd.test_type}</td>'
												+ '<td style="border-top: none; padding: 1px; background-color:#79d279;" class="col-md-3-1" id="tdEdPerticulars{rowCount}">{$T.opd.test_name}</td>'
												+ '<td style="border-top: none; padding: 1px;"  class="numeric col-md-1-1" id="tdEdRate{rowCount}">{$T.opd.test_rate}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdQty{rowCount}">{$T.opd.test_qty}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdAmount{rowCount}">{$T.opd.test_amt}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdConcession{rowCount}">{$T.opd.test_conc}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdPayable{rowCount}">{$T.opd.test_payable}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
												+ '{#if $T.opd.bill_flag=="N"}'
												+ '<input type="checkbox" style="cursor: pointer;" onClick="addReceiptComp({rowCount})" id="tdEdCheck{rowCount}" name="tdEdCheck{rowCount}" value="{$T.opd.id_opd_bill}" />'
												+ '<i id="editRow{rowCount}" type="button" class="fa fa-edit fa-1x" style="margin-left: 6px;cursor: pointer;" onclick="editRows(this)"></i>'
												+ '<i id="deleteRow{rowCount}" type="button" style="margin-left: 6px;cursor: pointer;" class="fa fa-trash-o fa-1x" onclick="deleteRows(this)"></i>'
												+ '{#else}<input type="checkbox" onClick="addReceiptComp({rowCount})" id="tdEdCheck{rowCount}" name="checked" value="{$T.opd.id_opd_bill}" disabled="disabled" />'
												+ '<i id="editRow{rowCount}" type="button" class="fa fa-edit fa-1x" style="margin-left: 6px;cursor: pointer;"></i>'
												+ '<i id="deleteRow{rowCount}" type="button" style="margin-left: 6px;cursor: pointer;" class="fa fa-trash-o fa-1x"></i>'
												+ '{#/if}</td>'
												+ '<input type="hidden" id="edId{rowCount}" value="{$T.opd.id_opd_bill}" />'
												+ '<input type="hidden" id="billFlag{rowCount}" value="{$T.opd.bill_flag}" />'
												+ '<input type="hidden" id="txtRow{rowCount}" value="{rowCount}" />'
												+ '<input type="hidden" id="testId{rowCount}" value="{$T.opd.id_test}" />'
												+ '<input type="hidden" id="testType{rowCount}" value="{$T.opd.test_type}" />'
												+ '<input type="hidden" id="labflag{rowCount}" value="{$T.opd.lrflag}" />'
												+ '<input type="hidden" id="Msg{rowCount++}" value="{$T.opd.msg}" /></tr>'
												+ '{#/if}' + '{#/for}');
						$("#OpdBillPrescription").processTemplate(billBean);
						$('#paidAmount').val(myObj.paid);
						$("#RowCount").val(billBean.liOpd.length);

						calculateTds(bill);

						$("#opdBillObj").val(billBean);
						$("#opdBillId").val(billBean.liOpd[0][0].id);
						$("#billno").html(billBean.liOpd[0][0].id);

						/*for ( var i = 0; i < billBean.listBillMaster.length; i++) {
							if (billBean.listBillMaster[i].test_type == 'Doc') {
								document.getElementById("consult_doc").innerHTML = billBean.listBillMaster[i].msg;
							}
						}*/

					} else {

						$("#OpdBillPrescription")
								.setTemplate(
										'{#foreach $T.liOpd[1] as opd}<tr id="{rowCount}">'
												+ '<td style="border-top: none; padding: 1px; padding-left: 5px;" class="col-md-1-1">{rowCount}</td>'
												+ '<td style="display: none;" id="tdEdItemId{rowCount}">{$T.opd.id_test}</td>'
												+ '<td style="display: none;" id="tdEdBillFlag{rowCount}">{$T.opd.bill_flag}</td>'
												+ '<td style="display: none;" id="tdEdMsg{rowCount}">{$T.opd.msg}</td>'
												+ '<td style="display: none;" id="tdEdStatusOpd{rowCount}">{$T.opd.test_status}</td>'
												+ '<td style="display: none;" id="tdEdIdOpdBill{rowCount}">{$T.opd.id_opd_bill}</td>'
												+ '<td style="display: none;" id="tdEdBillTypeFlag{rowCount}">{$T.opd.bill_type_flag}</td>'
												+ '<td style="border-top: none; padding: 1px; display: none;" class="col-md-1-1" id="tdEdTestType{rowCount}">{$T.opd.test_type}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="col-md-3-1" id="tdEdPerticulars{rowCount}">{$T.opd.test_name}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdRate{rowCount}">{$T.opd.test_rate}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdQty{rowCount}">{$T.opd.test_qty}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdAmount{rowCount}">{$T.opd.test_amt}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdConcession{rowCount}">{$T.opd.test_conc}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1" id="tdEdPayable{rowCount}">{$T.opd.test_payable}</td>'
												+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
												+ '{#if $T.opd.bill_flag=="N"}'
												+ '<input style="cursor:pointer;" type="checkbox" onClick="addReceiptComp({rowCount})" id="tdEdCheck{rowCount}" name="tdEdCheck{rowCount}" value="{$T.opd.id_opd_bill}" />'
												+ '<i id="editRow{rowCount}" type="button" class="fa fa-edit fa-1x" style="margin-left: 6px;cursor:pointer;" onclick="editRows(this)"></i>'
												+ '<i id="deleteRow{rowCount}" type="button" style="margin-left: 6px;cursor:pointer;" class="fa fa-trash-o fa-1x" onclick="deleteRows(this)"></i>'
												+ '{#else} <input type="checkbox" onClick="addReceiptComp({rowCount})" id="tdEdCheck{rowCount}" name="checked" value="{$T.opd.id_opd_bill}" disabled="disabled" />'
												+ '<i id="editRow{rowCount}" type="button" class="fa fa-edit fa-1x"	style="margin-left: 6px;cursor: pointer;"></i>'
												+ '<i id="deleteRow{rowCount}" type="button" style="margin-left: 6px;cursor: pointer;"	class="fa fa-trash-o fa-1x"></i>'
												+ '{#/if}</td><input type="hidden" id="edId{rowCount}" value="{$T.opd.id_opd_bill}" />'
												+ '<input type="hidden" id="txtRow{rowCount}" value="{rowCount}" />'
												+ '<input type="hidden" id="billFlag{rowCount}" value="{$T.opd.bill_flag}" />'
												+ '<input type="hidden" id="testId{rowCount}" value="{$T.opd.id_test}" />'
												+ '<input type="hidden" id="testType{rowCount}" value="{$T.opd.test_type}" />'
												+ '<input type="hidden" id="igi{rowCount}" value="{$T.opd.igi}" />'
												+ '<input type="hidden" id="Msg{rowCount++}" value="{$T.opd.msg}" /></tr>{#/for}');
						$("#OpdBillPrescription").processTemplate(billBean);

						$('#paidAmount').val(myObj.paid);
						$("#RowCount").val(billBean.liOpd[1].length);

						calculateTds(bill);

						$("#opdBillObj").val(billBean);
						$("#opdBillId").val(billBean.liOpd[0][0].id);
						$("#billno").html(billBean.liOpd[0][0].id);
						for ( var i = 0; i < billBean.listBillMaster.length; i++) {
							if (billBean.listBillMaster[i].test_type == 'Doc') {
								document.getElementById("consult_doc").innerHTML = billBean.listBillMaster[i].msg;
							}
						}
					}
				}
			});
}

function setHospitalDetails(hospDetail) {
	var hospitalDetails = JSON.stringify(hospDetail);
	$("#hospDetails").html(hospitalDetails);
	var hosp = billBean.hospDetail[0];
	$("#hospName").html(hosp.hn);
	$("#hospAdd").html(hosp.ha + "-" + hosp.hz);
	$("#contact").html(hosp.hcon);
	$("#hospitalLogo").attr('src', hosp.flpt);
}

function getOPDReceiptComponantShow(billID, billType) {

	receiptId = 1;
	var inputs = [];
	var myObj = $("#divMyObj").html();
	myObj = JSON.parse(myObj);
	var ti = myObj.tid;
	inputs.push('action=OPDReceiptComponant');
	inputs.push('billID=' + billID);
	inputs.push('receiptID=' + receiptId);
	inputs.push('ti=' + ti);
	inputs.push('callFrom=MainBill');
	inputs.push('billType=' + billType);
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
					count = 1;
					ajaxResponseForRecComponant = r;
					billcomp = eval('(' + ajaxResponseForRecComponant + ')');

					if (billcomp.listOPDRecComp.length > 0) {
						$("#OpdBillPrescription")
								.setTemplate(
										"{#foreach $T.listOPDRecComp as listOPDRecComp}<tr id='{count}'>	<td style='border-top: none; padding: 1px;' class='col-md-1-1'>{count}</td>	<td style='border-top: none; padding: 1px;' class='col-md-3-1'		id='tdEdPerticulars{count}'>{$T.listOPDRecComp.cname}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdRate{count}'>{$T.listOPDRecComp.crt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdQty{count}'>{$T.listOPDRecComp.cqt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdAmount{count}'>{$T.listOPDRecComp.camt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdConcession{count}'>{$T.listOPDRecComp.cdis}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdPayable{count}'>{$T.listOPDRecComp.cnet}</td>	<td style='border-top: none; padding: 1px;'		class='numeric col-md-1-1 center'><input type='checkbox'		onClick='addReceiptComp({count})' id='tdEdCheck{count}' name='checked'		value='{$T.opd.id_opd_bill}' /> <i id='editRow' type='button'		class='fa fa-edit fa-1x' style='margin-left: 6px;cursor: pointer;'		onclick='editRows(this)'></i><i id='deleteRow' type='button'		style='margin-left: 6px;cursor: pointer;' class='fa fa-trash-o fa-1x'		onclick='deleteRows(this)'></i></td>	<input type='hidden' id='recCompId{count}'		value='{$T.listOPDRecComp.reccmpid}'>	<input type='hidden' value='0' id='recmsg{count}' />	<input type='hidden' value='0' id='recitmType{count}' />	<input type='hidden' value='0' id='rectoid{count++}' /></tr>{#/for}");
						$("#RowCount").val(billcomp.listOPDRecComp.length);
						$("#OpdBillPrescription").processTemplate(billcomp);
						calculateTds();
						$("#opdBillObj").val(billcomp);
						for ( var i = 0; billcomp.listOPDRecComp.length > i; i++) {
							var objOPDcomp = billcomp.listOPDRecComp[i];
							var compid = objOPDcomp.cmpid;
							var compItemType = objOPDcomp.cmpitmtp;
							var getcount = compItemType + compid;
							var getsavedrowcount = $("#" + getcount).val();
							$("#narration" + getsavedrowcount).val(
									objOPDcomp.cnnr);
							$("#discount" + getsavedrowcount).val(
									objOPDcomp.cdis);

							$("#chr" + getsavedrowcount).val(objOPDcomp.crt);
							$("#amt" + getsavedrowcount).val(objOPDcomp.camt);

							$("#netAmt" + getsavedrowcount)
									.val(objOPDcomp.cnet);
							$("#chk" + getsavedrowcount).hide();

						}
					}
				}
			});
}

function calRespNetAmt(RowCount) {
	var tmp = 0;
	var count = $("#RowCount").val();
	for ( var i = 1; i <= count; i++) {

		var x = parseFloat($("#amt" + i).val());
		var y = parseFloat($("#discount" + i).val());
		tmp = x - y;
		$("#netAmt" + i).val(parseFloat(tmp).toFixed(2));
	}
	setTimeout(function() {
		$("#SpecialDisc").val($("#spdicID").val());

		var RowCount = $("#RowCount").val();

		calTotalOPD(RowCount);
		calTotalDiscount(RowCount, 'bill');
		calNetAmtTotal(RowCount, 'bill');

	}, 500);
}

function getReceiptNoForOPD(billType) {
	var inputs = [];
	inputs.push('action=getReceiptNoForOPD');
	inputs.push('billType=' + billType);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('Oops some problem occured...');
		},
		success : function(r) {
			ajaxResponse = r;

			billBeanHeader = eval('(' + ajaxResponse + ')');
			$("#receipNO").html(billBeanHeader.idrm);
			$("#rec_no").html(billBeanHeader.idrm);
			var temp = $('select option:selected').text();
			if (temp == "-Select-") {
				$('#discDiv').html("Corporate Account : No Discount");
				$("#discDiv").show();
			} else {
				$("#discDiv").show();
				$("#discName").html(temp);
			}
		}
	});
}

function getIPDBill(spDisc, treatID) {

	var discount = spDisc;
	var hallId = "10";// Make it dynamic
	var ti = treatID;
	var inputs = [];
	inputs.push('action=getIPDBillHeaders');
	inputs.push('spDiscount=' + discount);
	inputs.push('hallId=' + hallId);
	inputs.push('treatId=' + ti);

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
					alert('Oops some problem occured...');
				},
				success : function(r) {
					ajaxResponse = r;
					$("#headerList").html(ajaxResponse);
					// alert(ajaxResponse);
					billBeanHeader = eval('(' + ajaxResponse + ')');

					$("#billCompon")
							.setTemplate(
									"{#foreach $T.ol as oli} {#if $T.oli.od==1}	<tr id='headDetails{subsr++}'><td style='border-top:10px; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric' style='border-top: none; padding: 1px;'></td><td class='numeric center' style='border-top: none; padding: 1px;'></td></tr>"
											+ "<tr id='relativeBed'><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='RelativeBed'>Patient Relative Bed:</label></td></tr>"
											+ "{#elseif $T.oli.od==2}<tr><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Investigation Test:</label></td></tr><tr id='headDetails{subsr++}'></tr>{subsr++}"

											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Pathology Test:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "{#elseif $T.oli.od==3}<tr><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>IPD Consumables:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Gases and Monitors:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Bed Side Procedures:<label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Instruments and Equipments:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Consulting/Visiting Charges:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "{#elseif $T.oli.od==4}<tr><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'></label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Surgery Services:</label></td></tr><tr id='surServicesheadDetails'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Surgery Consumables:</label></td></tr><tr id='headDetails{subsr++}'></tr>"
											+ "<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='subhead{subsr}'>Operation Theater Rent:</label></td></tr><tr id='headDetails{subsr++}'></tr>"

											+ "{#elseif $T.oli.od==5}<tr><td style='border-top: none; padding: 1px;'>{sr}.</td><td style='border-top: none; padding: 1px;'><label id='head{sr++}'>{$T.oli.on}</label></td></tr><tr id='headDetails{subsr++}'></tr>"

											+ "{#else}<tr><td style='border-top: none; padding: 1px;'></td><td style='border-top: none; padding: 1px;'><label id='head11{sr1}'></label></td></tr><tr id='Billdiv{sr1}'></tr>"
											+

											+"<tr id='Billdiv{sr1}"
											+ "'><td class='col-md-1-1' style='border-top: none; padding: 1px;'>{sr++}."

											+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>{$T.oli.on}"

											+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'  id='headdate{sr1}'>"

											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;' id='chr{sr1}'>"

											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;' id='qty{sr1}'>"

											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;' id='disc{sr1}'>"

											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'  id='amt{sr1}'>"

											+ "</td><td id='tdBilldivPay{sr1}"

											+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"

											+ "</td><td id='tdBilldivCoPay{sr1}"

											+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"

											+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='{sr1}' name='ipdBillCheckbox' id='bcomp{sr1}'></td></tr>{sr1++}"

											+ "{#/if}{#/for}");// showBillHeader

					// showBillHeader
					$("#billCompon").processTemplate(billBeanHeader);
				}
			});
}

function changeReceipt() {
	var billhead = $("#billHeader").val();
	if (billhead == "sr") {
		$("#ssign").hide();
		$("#rsign").show();
		$("#skhead").hide();
		$("#rhead").show();

	} else {
		$("#ssign").show();
		$("#rsign").hide();
		$("#skhead").show();
		$("#rhead").hide();
	}
	test_skill();
}
var testcount = 1;
var opcount = 1;
var hallcount = 1;
var consultcount = 1;
var surgeoncount = 1;
var matIpdcount = 1;
var matSurcount = 1;
var pathotestcount = 1;
var ipdservicescount = 1;
var subsr = 1;
var physiotestcount = 1;
var bedsidecount = 1;
var instrumentscount = 1;
var theatercount = 1;
var docdiscount = 1;
var Rhallcount = 1;
var SurServicescount = 1;

var sponsredCount = 1;

var sponsredDetailsTemplateForListBill = '{#foreach $T.liSponser as liSponser}'
		+ '<tr><td class="input-SmallText filterable-cell col-md-1-1 margin-1 center">{sponsredCount}</td>'
		+ '<td class="input-SmallText filterable-cell col-md-2-1 margin-1">{$T.liSponser.sponsredName}</td>'
		+ '<td class="input-SmallText filterable-cell col-md-2-1 margin-1 center">{$T.liSponser.cashlessPolicyNo}</td>'
		+ '<td class="input-SmallText filterable-cell col-md-2-1 margin-1 center">{$T.liSponser.insuranceValidFrom}</td>'
		+ '<td class="input-SmallText filterable-cell col-md-2-1 margin-1 center">{$T.liSponser.insuranceValidTo}</td>'
		+ '<td class="input-SmallText filterable-cell col-md-3-1 margin-1 center">'
		+ '<input id="activeInsurance{$T.liSponser.sponseredNameId}" type="radio" name="radio" data-target="#passwordPopUp" data-toggle="modal" onclick="setSpecialDiscountId({$T.liSponser.sponseredNameId})" class="editUserAccess" /></td></tr>'
		+ '<input type="hidden"  value="{sponsredCount++}"/>{#/for}';

var nursingChargesBedString = "Nursing charges for bed: ";

function IPDBillDetails(tempType, treatID, id) {
	$("#mpatid").html(id);
	$("#mtreatid").html(treatID);

	var searchtype;
	searchtype = "bill";
	subsr = 1;
	physiotestcount = 1;
	testcount = 1;
	sr = 1;
	hallcount = 1;
	rowCount = 1;
	opcount = 1;
	consultcount = 1;
	surgeoncount = 1;
	matIpdcount = 1;
	matSurcount = 1;
	SurServicescount = 1;
	pathotestcount = 1;
	ipdservicescount = 1;
	instrumentscount = 1;
	bedsidecount = 1;
	theatercount = 1;
	docdiscount = 1;
	Rhallcount = 1;
	var discount = 76;/* $("#SpecialDisc").val(); */

	if (discount == 0) {
		discount = "bill";
	}

	var pi = id;
	var ti = treatID;

	$("#trid").val(ti);
	var inputs = [];
	inputs.push('action=ShowIPDHeaderBill');
	inputs.push('SpecialDisc=' + discount);
	inputs.push('pi=' + pi);
	inputs.push('ti=' + ti);
	// inputs.push('billhead=' + billhead);
	inputs.push('searchtype=' + searchtype);
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
					alert('Oops some problem occured...');
				},
				success : function(r) {
					billComps = r;
					// alert(billComps);
					billBean = eval('(' + billComps + ')');
					var msg = billBean.bcs7[0].msg;

					$("#hallId").val(billBean.oplist[2][0].Htype);
					if (billBean.hospDetail[0] != null) {

						setHospitalDetails(billBean.hospDetail[0]);
					}

					if (msg != "") {

						window.location.href = "BillingDashboardForIPD.jsp";
					} else {
						var strDate = "";
						var d = new Date();
						strDate = d.getFullYear() + "-" + (d.getMonth() + 1)
								+ "-" + d.getDate();

						// $("#billdate").html(strDate);

						if (billBean.bl[0].isCredit != undefined) {
							var isCredit = billBean.bl[0].isCredit;
							if (isCredit == 1) {
								$(
										'input:radio[name=billPrintType][value=credit]')
										.prop('checked', true);
							} else {
								$(
										'input:radio[name=billPrintType][value=general]')
										.prop('checked', true);
							}
						}
						if (billBean.bl[0].bd != undefined) {
							var bdate = new Date(billBean.bl[0].bd);
							strDate = bdate.getFullYear() + "-"
									+ (bdate.getMonth() + 1) + "-"
									+ bdate.getDate();
						} else {
							$("#billdate").html(strDate);
						}
						if (billBean.hospAcct.length != 0) {
							$("#adminCharges").val(
									billBean.hospAcct[0].adminchr);
						}

						$("#billno").html(billBean.bl[0].id);

						if (billBean.bcs1 == "" && billBean.bcs2 == ""
								&& billBean.bcs3 == "" && billBean.bcs4 == ""
								&& billBean.bcs7 == "") {
							alert("Patient bill is not available.");
							// window.location = "IPD_OPD_Database.jsp";
							return false;
						}

						$("#billComps").html(billComps);
						var amt = 0;
						var chatAmount = 0;
						for ( var m4 = 0; m4 < billBean.bcs5.length; m4++) {

							amt = amt + parseFloat(billBean.bcs5[m4].amt);
						}
						if (tempType == "pay") {
							if (billBean.bl[0] != "") {
								$("#txtDiscount").val(
										parseInt(billBean.bl[0].da));
								if (billBean.bl[0].da == null) {
									$("#txtDiscount").val(0);
								}
								$("#txtPayable").val(
										parseInt(billBean.bl[0].pay));
								$("#txtPaid").val(parseInt(billBean.bl[0].pa));
								$("#txtRefund")
										.val(
												parseInt(billBean.bl[0].rfd)
														.toFixed(2));
								$("#txtRemaining").val(
										parseInt(billBean.bl[0].ra));
								$("#txtRecNo").html(billBean.bl[0].id);

							}
							if (billBean.bcs5 == "" && billBean.bcs2 == ""
									&& billBean.bcs3 == ""
									&& billBean.bcs4 == ""
									&& billBean.bcs8 == ""
									&& billBean.bcs6 == "") {
								for ( var x = 0; x < billBean.bcs1.length; x++) {
									if (billBean.bcs1[x].qty == 0) {
										$("#chr" + billBean.bcs1[x].id).val(0);
									} else {
										$("#chr" + billBean.bcs1[x].id)
												.val(
														(billBean.bcs1[x].amt / billBean.bcs1[x].qty)
																.toFixed(2));
									}
									$("#qty" + billBean.bcs1[x].id).val(
											billBean.bcs1[x].qty);
									$("#amt" + billBean.bcs1[x].id).val(
											(billBean.bcs1[x].amt).toFixed(2));
								}

							} else {

								// anaesthetist charges
								var anaqty = 0;
								var anaamt = 0;
								var anadocname = "";
								for ( var x = 0; x < billBean.anali.length; x++) {

									anadocname = anadocname
											+ billBean.anali[x].nm + ",";
									anaqty = parseInt(anaqty)
											+ parseInt(billBean.anali[x].qty);
									anaamt = parseFloat(anaamt)
											+ parseFloat((billBean.anali[x].amt)
													.toFixed(2));
								}

								$("#txtRecNo").html(billBean.bl[0].id);

								if (billBean.bcs6[0] != undefined
										&& billBean.bcs6[0].msg == "Intencivist") {
									// Registration
									var regCharges = parseFloat(billBean.bcs6[0].amt);
									$("#chr1").text(
											parseFloat(billBean.bcs6[0].rtca)
													.toFixed(2));
									$("#qty1").text(
											(billBean.bcs6[0].qty).toFixed(1));
									$("#disc1").text(
											(billBean.bcs6[0].disComp)
													.toFixed(2));
									$("#amt1").text(regCharges.toFixed(2));
									$("#msg1").text(billBean.bcs6[0].msg);
									$("#tdBilldivPay1").text(
											parseFloat(billBean.bcs6[0].pay)
													.toFixed(2));
									$("#tdBilldivCoPay1").text(
											parseFloat(billBean.bcs6[0].coPay)
													.toFixed(2));
									$("#headdate1").text(billBean.bcs6[0].dt);
								}

								if (billBean.bcs2 != "") {
									if (billBean.bcs2[0].msg == "registration") {
										// Registration
										var regCharges = parseFloat(billBean.bcs2[0].amt);
										$("#chr3")
												.text(
														(parseFloat(billBean.bcs2[0].rtca))
																.toFixed(2));
										// $("#chr3").text(regCharges.toFixed(2));
										$("#qty3").text((1).toFixed(1));
										$("#disc3").text(
												(billBean.bcs2[0].disComp)
														.toFixed(2));
										$("#amt3").text(regCharges.toFixed(2));
										$("#msg3").text(billBean.bcs2[0].msg);
										$("#tdBilldivPay3")
												.text(
														parseFloat(
																billBean.bcs2[0].pay)
																.toFixed(2));
										$("#tdBilldivCoPay3").text(
												parseFloat(
														billBean.bcs2[0].coPay)
														.toFixed(2));
										$("#headdate3").text(
												billBean.bcs2[0].dt);
									}

									if (billBean.bcs2[1].msg == "mlcCharges") {
										// Mlc Charges
										var mlcCharges = parseFloat(billBean.bcs2[1].amt);
										$("#chr4")
												.text(
														(parseFloat(billBean.bcs2[1].rtca)
																.toFixed(2)));
										// $("#chr4").text(mlcCharges.toFixed(2));
										$("#qty4").text((1).toFixed(1));
										$("#disc4").text(
												(billBean.bcs2[1].disComp)
														.toFixed(2));
										$("#amt4").text(mlcCharges.toFixed(2));
										$("#msg4").text(billBean.bcs2[1].msg);
										$("#tdBilldivPay4")
												.text(
														parseFloat(
																billBean.bcs2[1].pay)
																.toFixed(2));
										$("#tdBilldivCoPay4").text(
												parseFloat(
														billBean.bcs2[1].coPay)
														.toFixed(2));
										$("#headdate4").text(
												billBean.bcs2[1].dt);
									}

									if (billBean.bcs2.length > 2) {
										var j = 6;
										for ( var i = 0; i < billBean.bcs2.length; i++) {
											if (billBean.bcs2[i].msg == "tpa") {
												var tpaCharges = parseFloat(billBean.bcs2[2].amt);
												$("#chr5")
														.text(
																parseFloat(
																		billBean.bcs2[2].rtca)
																		.toFixed(
																				2));
												$("#qty5").text((1).toFixed(1));
												$("#disc5")
														.text(
																(billBean.bcs2[2].disComp)
																		.toFixed(2));
												$("#amt5").text(
														tpaCharges.toFixed(2));
												$("#msg5").text(
														billBean.bcs2[2].msg);
												$("#tdBilldivPay5")
														.text(
																parseFloat(
																		billBean.bcs2[2].pay)
																		.toFixed(
																				2));
												$("#tdBilldivCoPay5")
														.text(
																parseFloat(
																		billBean.bcs2[2].coPay)
																		.toFixed(
																				2));
												$("#headdate5").text(
														billBean.bcs2[2].dt);
											} else if (billBean.bcs2[i].nm == "general Charges") {

												$("#chr" + j)
														.val(
																(billBean.bcs2[i].iprt));
												$("#qty" + j).val(
														(billBean.bcs2[i].qty)
																.toFixed(1));
												$("#amt" + j)
														.val(
																billBean.bcs2[i].netAmt);
												$("#headdate" + j).val(
														billBean.bcs2[i].dt);
												j++;
											}
										}
									}
								}

								// for bed details
								var i = 1.1;
								var bedCount = 1;
								var bedCharges = "";
								$
										.each(
												billBean.bcs4,
												function(name, value) {
													var coPay = (0).toFixed(2);
													if ((value.amt - value.pay) > 0) {

														// value.amt = quty *
														// totalCharges
														coPay = (((value.amt) - (value.disComp)) - value.pay)
																.toFixed(2);
													}

													// normal charges bed
													bedCharges = bedCharges
															+ "<tr id='trBed"
															+ bedCount
															+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ i.toFixed(1)
															+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
															+ value.nm
															+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
															+ value.dt
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ value.rtca
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.qty)
																	.toFixed(1)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.disComp)
																	.toFixed(2)
															+ "</td><td id='tdBedTotal"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ ((value.amt) - (value.disComp))
															+ "</td><td id='tdBedPay"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.pay)
																	.toFixed(2)
															+ "</td><td id='tdBedCoPay"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ coPay
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' id='trBed"
															+ bedCount
															+ "' name='ipdBillCheckbox' value='"
															+ value.id
															+ "' ></td></tr>";

													bedCount++;

													// nursing charges bed
													// value.netAmt contains...
													// nursing charges bed(NCB)

													var totalNCB = (value.qty)
															* (value.netAmt)
															- (value.nursingchargesDiscount);
													var coPayNCB = ((value.qty)
															* (value.netAmt) - (value.nursingchargesDiscount))
															- (value.nursingchargesPay);

													bedCharges = bedCharges
															+ "<tr id='trBed"
															+ bedCount
															+ "'><td class='col-md-1-1' style='border-top: none; padding: 1px; padding-left: 45px;'>"
															+ ((i.toFixed(1))
																	+ "." + "1")
															+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
															+ "<i>"
															+ nursingChargesBedString
															+ "</i>"
															+ value.nm
															+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
															+ value.dt
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ value.netAmt
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.qty)
																	.toFixed(1)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.nursingchargesDiscount)
																	.toFixed(2)
															+ "</td><td id='tdBedTotal"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (totalNCB)
																	.toFixed(2)
															+ "</td><td id='tdBedPay"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.nursingchargesPay)
																	.toFixed(2)
															+ "</td><td id='tdBedCoPay"
															+ bedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (coPayNCB)
																	.toFixed(2)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ "<input type='checkbox' id='trBed"
															+ bedCount
															+ "_NCB' name='ipdBillCheckbox' value='"
															+ value.id
															+ "' ></td></tr>";

													i = i + 0.1;
													bedCount++;
												});

								$('#headDetails1')
										.after(
												bedCharges
														+ "<input type='hidden' id='bedCount' value='"
														+ --bedCount + "'>");
								var bedTotal = 0;
								var bedPay = 0;
								var bedCoPay = 0;
								for ( var i = 1; i <= bedCount; i++) {
									var bedTotalTemp = $('#tdBedTotal' + i)
											.html();
									bedTotal = parseFloat(bedTotal)
											+ parseFloat(bedTotalTemp);
									var bedPayTemp = $('#tdBedPay' + i).html();
									bedPay = parseFloat(bedPay)
											+ parseFloat(bedPayTemp);
									var bedCoPayTemp = $('#tdBedCoPay' + i)
											.html();
									bedCoPay = parseFloat(bedCoPay)
											+ parseFloat(bedCoPayTemp);
								}

								$('#trBed' + bedCount)
										.after(
												'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; border-top: none; color: #5CAFE6;">Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal1">'
														+ bedTotal.toFixed(2)
														+ '</td><td class="numeric center" style="padding: 1px;" id="tdPay1">'
														+ bedPay.toFixed(2)
														+ '</td><td class="numeric center" style="padding: 1px;" id="tdCoPay1">'
														+ bedCoPay.toFixed(2)
														+ '</td><td class="numeric center" style="padding: 1px; border-top: none;"></td></tr>');

								// For relative bed charges

								var i = 1.1;
								var relativeBedCount = 1;
								var relativeBedCharges = "";
								$
										.each(
												billBean.relBedChr,
												function(name, value) {

													relativeBedCharges = relativeBedCharges
															+ "<tr id='trrelativeBed"
															+ relativeBedCount
															+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ i.toFixed(1)
															+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
															+ value.nm
															+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
															+ value.dt
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ value.rtca
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.qty)
																	.toFixed(1)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.disComp)
																	.toFixed(2)
															+ "</td><td id='tdrelativeBedTotal"
															+ relativeBedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ value.amt
															+ "</td><td id='tdrelativeBedPay"
															+ relativeBedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.pay)
																	.toFixed(2)
															+ "</td><td id='tdrelativeBedCoPay"
															+ relativeBedCount
															+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
															+ (value.coPay)
																	.toFixed(2)
															+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' id='reBed"
															+ relativeBedCount
															+ "' name='ipdBillCheckbox' value='"
															+ value.id
															+ "' ></td></tr>";
													i = i + 0.1;
													relativeBedCount++;
												})
								$('#relativeBed')
										.after(
												relativeBedCharges
														+ "<input type='hidden' id='relativeBedCount' value='"
														+ --relativeBedCount
														+ "'>");
								var relativeBedTotal = 0;
								var relativeBedPay = 0;
								var relativeBedCoPay = 0;
								for ( var i = 1; i <= relativeBedCount; i++) {
									var relativeBedTotalTemp = $(
											'#tdrelativeBedTotal' + i).html();
									relativeBedTotal = parseFloat(relativeBedTotal)
											+ parseFloat(relativeBedTotalTemp);
									var relativeBedPayTemp = $(
											'#tdrelativeBedPay' + i).html();
									relativeBedPay = parseFloat(relativeBedPay)
											+ parseFloat(relativeBedPayTemp);
									var relativeBedCoPayTemp = $(
											'#tdrelativeBedCoPay' + i).html();
									relativeBedCoPay = parseFloat(relativeBedCoPay)
											+ parseFloat(relativeBedCoPayTemp);
								}

								$('#trrelativeBed' + relativeBedCount)
										.after(
												'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;"  id="tdTotal2">'
														+ relativeBedTotal
																.toFixed(2)
														+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay2">'
														+ relativeBedPay
																.toFixed(2)
														+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay2">'
														+ relativeBedCoPay
																.toFixed(2)
														+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								// for operation details
								if (billBean.oplist != "") {
									/*
									 * $("#headDetails10").setTemplate(
									 * $("#operationDetails").html());
									 * $("#headDetails10").processTemplate(
									 * billBean.oplist[0]);
									 */
									var i = 4.1;
									var operationChargesCount = 1;
									var operationChargesCharges = "";
									var totaloperationCharges = 0.0;
									$
											.each(
													billBean.oplist[0],
													function(name, value) {
														operationChargesCharges = operationChargesCharges
																+ "<tr id='troperationCharges"
																+ operationChargesCount
																+ "'><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;' colspan='9'><b>"
																+ value.on
																+ "</b></td ><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'> <input type='checkbox' id='opCha"
																+ operationChargesCount
																+ "' value='"
																+ value.tomid
																+ "' name='ipdBillCheckbox' ><input type='hidden' id='ipdBillOperationTbId"
																+ operationChargesCount
																+ "' value='"
																+ value.tomid
																+ "' /></td ></tr>"

																+ "<tr ><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ "SURGEON CHARGES"
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td id='surgeonchrg"
																+ value.tomid
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.oc
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.opChD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.oc - value.opChD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.opChP)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.opChCoP)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>"
																+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'></td>"
																+ "<td class='col-md-2-1' style='border-top: none; padding: 1px;'>ASSISTANT SURGEON CHARGES </td >"
																+ "<td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td>"
																+ "<td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.oep
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.asSuD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.oep - value.asSuD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.asSuP)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.asSuCoP)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>"

																+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ "ANAESTHETIST CHARGES"
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.or
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.anaeD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.or - value.anaeD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.anaeP)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.anaeCoP)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>"

																+ "<tr><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ "PREANAESTHETIST CHARGES"
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.preAnsChr
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.preAnaeD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.preAnsChr - value.preAnaeD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.preAnaeP)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.preAnaeCoP)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>"

																+ "<tr id='trSurgeopnInstrumentCharges"
																+ operationChargesCount
																+ "'><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ "SURGEON INSTRUMENT CHARGES"
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.os
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.spnm
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (1)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.suInD
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.spnm - value.suInD)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.suInP)
																		.toFixed(2)
																+ "</td><td id='"
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.suInCoP)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td></tr>";
														i = i + 0.1;
														operationChargesCount++;

														for ( var z = 0; z < value.bcl.length; z++) {

															if (value.bcl[z].surId == "surgeon") {
																var o = new Option(
																		"option text",
																		"value");
																// jquerify the
																// DOM object
																// 'o' so we can
																// use the html
																// method
																$(o)
																		.html(
																				value.bcl[z].nm);
																// $(o).val(value.tomid+"@"+value.bcl[z].id);
																$(o)
																		.val(
																				value.tomid
																						+ "@");
																$(
																		"#surgeonlist")
																		.append(
																				o);
															}
														}
													})
									$('#headDetails11')
											.after(
													operationChargesCharges
															+ "<input type='hidden' id='operationChargesCount' value='"
															+ --operationChargesCount
															+ "'>");
									var operationChargesTotal = 0;
									var operationChargesPay = 0;
									var operationChargesCoPay = 0;// alert(billBean.oplist[0][0].oc);

									var totaloperationChargesTotal = 0;
									var totaloperationChargesPay = 0;
									var totaloperationChargesCoPay = 0

									for ( var i = 1; i <= operationChargesCount; i++) {
										if (undefined != billBean.oplist[0][(i - 1)]) {
											operationChargesTotal = parseFloat(billBean.oplist[0][(i - 1)].oc)
													+ parseFloat(billBean.oplist[0][(i - 1)].or)
													+ parseFloat(billBean.oplist[0][(i - 1)].oep)
													+ parseFloat(billBean.oplist[0][(i - 1)].spnm)
													+ parseFloat(billBean.oplist[0][(i - 1)].preAnsChr);
											operationChargesPay = parseFloat(billBean.oplist[0][(i - 1)].opChP)
													+ parseFloat(billBean.oplist[0][(i - 1)].asSuP)
													+ parseFloat(billBean.oplist[0][(i - 1)].anaeP)
													+ parseFloat(billBean.oplist[0][(i - 1)].preAnaeP)
													+ parseFloat(billBean.oplist[0][(i - 1)].suInP);
											operationChargesCoPay = parseFloat(billBean.oplist[0][(i - 1)].opChCoP)
													+ parseFloat(billBean.oplist[0][(i - 1)].asSuCoP)
													+ parseFloat(billBean.oplist[0][(i - 1)].anaeCoP)
													+ parseFloat(billBean.oplist[0][(i - 1)].preAnaeCoP)
													+ parseFloat(billBean.oplist[0][(i - 1)].suInCoP);
										}

										$('#trSurgeopnInstrumentCharges' + i)
												.after(
														'<tr id = "operationtotal'
																+ i
																+ '"><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; border-top: none; color: #5CAFE6;">Total(INR)</td><td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric" style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="">'
																+ operationChargesTotal
																		.toFixed(2)
																+ '</td> <td class="numeric center" style="padding: 1px;" id="">'
																+ operationChargesPay
																		.toFixed(2)
																+ '</td>  <td class="numeric center" style="padding: 1px;" id="">'
																+ operationChargesCoPay
																		.toFixed(2)
																+ '</td>  <td class="numeric center" style="padding: 1px; border-top: none;"></td></tr>');

										totaloperationChargesTotal = totaloperationChargesTotal
												+ operationChargesTotal;
										totaloperationChargesPay = totaloperationChargesPay
												+ operationChargesPay;
										totaloperationChargesCoPay = totaloperationChargesCoPay
												+ operationChargesCoPay;

									}
									$(
											'#operationtotal'
													+ billBean.oplist[0].length)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td><td class="numeric center" style="padding: 1px; border-top: none; color: #5CAFE6;">Grand Total(INR)</td><td class="numeric" style="padding: 1px; border-top: none;"></td>									  <td class="numeric" style="padding: 1px; border-top: none;"></td>									  <td class="numeric" style="padding: 1px; border-top: none;"></td>									  <td class="numeric" style="padding: 1px; border-top: none;"></td>									  <td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal15">'
															+ totaloperationChargesTotal
																	.toFixed(2)
															+ '</td> <td class="numeric center" style="padding: 1px;" id="tdPay15">'
															+ totaloperationChargesPay
																	.toFixed(2)
															+ '</td>  <td class="numeric center" style="padding: 1px;" id="tdCoPay15">'
															+ totaloperationChargesCoPay
																	.toFixed(2)
															+ '</td>  <td class="numeric center" style="padding: 1px; border-top: none;"></td></tr>');

								}

								// for surgery services details
								/*
								 * $("#surServicesheadDetails").setTemplate(
								 * $("#SurServicesDetails").html());
								 * $("#surServicesheadDetails").processTemplate(
								 * billBean.oplist[4]);
								 */
								if (billBean.oplist[4] != "") {
									var i = 4.1;
									var surgeryServicesCount = 1;
									var surgeryServicesCharges = "";
									$
											.each(
													billBean.oplist[4],
													function(name, value) {
														surgeryServicesCharges = surgeryServicesCharges
																+ "<tr id='trsurgeryServices"
																+ surgeryServicesCount
																+ "'><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdsurgeryServicesTotal"
																+ surgeryServicesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdsurgeryServicesPay"
																+ surgeryServicesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdsurgeryServicesCoPay"
																+ surgeryServicesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' id='surSe"
																+ surgeryServicesCount
																+ "' value='"
																+ value.id
																+ "' name='ipdBillCheckbox' ><input type='hidden' id='ipdBillInvestigationSlaveTbId"
																+ surgeryServicesCount
																+ "' value='"
																+ value.id
																+ "' /></td></tr>";
														i = i + 0.1;
														surgeryServicesCount++;
													})
									$('#surServicesheadDetails')
											.after(
													surgeryServicesCharges
															+ "<input type='hidden' id='surgeryServicesCount' value='"
															+ --surgeryServicesCount
															+ "'>");
									var surgeryServicesTotal = 0;
									var surgeryServicesPay = 0;
									var surgeryServicesCoPay = 0;
									for ( var i = 1; i <= surgeryServicesCount; i++) {
										var surgeryServicesTotalTemp = $(
												'#tdsurgeryServicesTotal' + i)
												.html();
										surgeryServicesTotal = parseFloat(surgeryServicesTotal)
												+ parseFloat(surgeryServicesTotalTemp);
										var surgeryServicesPayTemp = $(
												'#tdsurgeryServicesPay' + i)
												.html();
										surgeryServicesPay = parseFloat(surgeryServicesPay)
												+ parseFloat(surgeryServicesPayTemp);
										var surgeryServicesCoPayTemp = $(
												'#tdsurgeryServicesCoPay' + i)
												.html();
										surgeryServicesCoPay = parseFloat(surgeryServicesCoPay)
												+ parseFloat(surgeryServicesCoPayTemp);
									}

									$(
											'#trsurgeryServices'
													+ surgeryServicesCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal11">'
															+ surgeryServicesTotal
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px;" id="tdPay11">'
															+ surgeryServicesPay
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px;" id="tdCoPay11">'
															+ surgeryServicesCoPay
																	.toFixed(2)
															+ '</td><td class="numeric center" style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for Investigation Test details
								if (billBean.bcs3 != "") {
									var i = 2.1;
									var investigationTestCount = 1;
									var investigationTestCharges = "";
									$
											.each(
													billBean.bcs3,
													function(name, value) {
														if (value.ct == "invest") {
															investigationTestCharges = investigationTestCharges
																	+ "<tr id='trinvestigationTest"
																	+ investigationTestCount
																	+ "'><td class='col-md-1-1  center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdinvestigationTestTotal"
																	+ investigationTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdinvestigationTestPay"
																	+ investigationTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdinvestigationTestCoPay"
																	+ investigationTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' id='inves"
																	+ investigationTestCount
																	+ "' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' ><input type='hidden' id='ipdBillInvestigationSlaveTbId"
																	+ investigationTestCount
																	+ "' value='"
																	+ value.id
																	+ "' /></td></tr>";
															i = i + 0.1;
															investigationTestCount++;
														}

													});
									$('#headDetails2')
											.after(
													investigationTestCharges
															+ "<input type='hidden' id='investigationTestCount' value='"
															+ --investigationTestCount
															+ "'>");
									var investigationTestTotal = 0;
									var investigationTestPay = 0;
									var investigationTestCoPay = 0;
									for ( var i = 1; i <= investigationTestCount; i++) {
										var investigationTestTotalTemp = $(
												'#tdinvestigationTestTotal' + i)
												.html();
										investigationTestTotal = parseFloat(investigationTestTotal)
												+ parseFloat(investigationTestTotalTemp);
										var investigationTestPayTemp = $(
												'#tdinvestigationTestPay' + i)
												.html();
										investigationTestPay = parseFloat(investigationTestPay)
												+ parseFloat(investigationTestPayTemp);
										var investigationTestCoPayTemp = $(
												'#tdinvestigationTestCoPay' + i)
												.html();
										investigationTestCoPay = parseFloat(investigationTestCoPay)
												+ parseFloat(investigationTestCoPayTemp);
									}

									$(
											'#trinvestigationTest'
													+ investigationTestCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal3">'
															+ investigationTestTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay3">'
															+ investigationTestPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay3">'
															+ investigationTestCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');
								}
								// for Physiotherapy Test details
								if (billBean.bcs3 != "") {
									var i = 2.1;
									var physiotherapyTestCount = 1;
									var physiotherapyTestCharges = "";
									$
											.each(
													billBean.bcs3,
													function(name, value) {
														if (value.ct == "physio") {
															physiotherapyTestCharges = physiotherapyTestCharges
																	+ "<tr id='trphysiotherapyTest"
																	+ physiotherapyTestCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdphysiotherapyTestTotal"
																	+ physiotherapyTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdphysiotherapyTestPay"
																	+ physiotherapyTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdphysiotherapyTestCoPay"
																	+ physiotherapyTestCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='physi"
																	+ physiotherapyTestCount
																	+ "' ></td></tr>";
															i = i + 0.1;
															physiotherapyTestCount++;
														}

													})
									$('#headDetails3')
											.after(
													physiotherapyTestCharges
															+ "<input type='hidden' id='physiotherapyTestCount' value='"
															+ --physiotherapyTestCount
															+ "'>");
									var physiotherapyTestTotal = 0;
									var physiotherapyTestPay = 0;
									var physiotherapyTestCoPay = 0;
									for ( var i = 1; i <= physiotherapyTestCount; i++) {
										var physiotherapyTestTotalTemp = $(
												'#tdphysiotherapyTestTotal' + i)
												.html();
										physiotherapyTestTotal = parseFloat(physiotherapyTestTotal)
												+ parseFloat(physiotherapyTestTotalTemp);
										var physiotherapyTestPayTemp = $(
												'#tdphysiotherapyTestPay' + i)
												.html();
										physiotherapyTestPay = parseFloat(physiotherapyTestPay)
												+ parseFloat(physiotherapyTestPayTemp);
										var physiotherapyTestCoPayTemp = $(
												'#tdphysiotherapyTestCoPay' + i)
												.html();
										physiotherapyTestCoPay = parseFloat(physiotherapyTestCoPay)
												+ parseFloat(physiotherapyTestCoPayTemp);
									}

									$(
											'#trphysiotherapyTest'
													+ physiotherapyTestCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal4">'
															+ physiotherapyTestTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay4">'
															+ physiotherapyTestPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay4">'
															+ physiotherapyTestCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');
								}
								// for Pathology Test details

								var i = 2.1;
								var pathologyTestCount = 1;
								var pathologyTestCharges = "";
								$
										.each(
												billBean.bcs3,
												function(name, value) {
													if (value.ct == "patho") {
														pathologyTestCharges = pathologyTestCharges
																+ "<tr id='trpathologyTest"
																+ pathologyTestCount
																+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdpathologyTestTotal"
																+ pathologyTestCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdpathologyTestPay"
																+ pathologyTestCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdpathologyTestCoPay"
																+ pathologyTestCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																+ value.id
																+ "' name='ipdBillCheckbox' id='patho"
																+ pathologyTestCount
																+ "'></td></tr>";
														i = i + 0.1;
														pathologyTestCount++;
													}
												})
								$('#headDetails4')
										.after(
												pathologyTestCharges
														+ "<input type='hidden' id='pathologyTestCount' value='"
														+ --pathologyTestCount
														+ "'>");
								var pathologyTestTotal = 0;
								var pathologyTestPay = 0;
								var pathologyTestCoPay = 0;
								for ( var i = 1; i <= pathologyTestCount; i++) {
									var pathologyTestTotalTemp = $(
											'#tdpathologyTestTotal' + i).html();
									pathologyTestTotal = parseFloat(pathologyTestTotal)
											+ parseFloat(pathologyTestTotalTemp);
									var pathologyTestPayTemp = $(
											'#tdpathologyTestPay' + i).html();
									pathologyTestPay = parseFloat(pathologyTestPay)
											+ parseFloat(pathologyTestPayTemp);
									var pathologyTestCoPayTemp = $(
											'#tdpathologyTestCoPay' + i).html();
									pathologyTestCoPay = parseFloat(pathologyTestCoPay)
											+ parseFloat(pathologyTestCoPayTemp);
								}

								$('#trpathologyTest' + pathologyTestCount)
										.after(
												'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal5">'
														+ pathologyTestTotal
																.toFixed(2)
														+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay5">'
														+ pathologyTestPay
																.toFixed(2)
														+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay5">'
														+ pathologyTestCoPay
																.toFixed(2)
														+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								// for consulting/visiting doctor details
								/*
								 * $("#headDetails9").setTemplate(
								 * $("#consultDetails").html());
								 * $("#headDetails9").processTemplate(
								 * billBean.bcs8);
								 */
								if (billBean.bcs8 != "") {
									var i = 3.1;
									var visitingDoctorCount = 1;
									var visitingDoctorCharges = "";
									$
											.each(
													billBean.bcs8,
													function(name, value) {
														// if (value.ct ==
														// "patho")
														// {
														visitingDoctorCharges = visitingDoctorCharges
																+ "<tr id='trvisitingDoctor"
																+ visitingDoctorCount
																+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdvisitingDoctorTotal"
																+ visitingDoctorCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdvisitingDoctorPay"
																+ visitingDoctorCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdvisitingDoctorCoPay"
																+ visitingDoctorCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																+ value.id
																+ "' name='ipdBillCheckbox' id='visit"
																+ visitingDoctorCount
																+ "'></td></tr>";
														i = i + 0.1;
														visitingDoctorCount++;
														// }

													})
									$('#headDetails10')
											.after(
													visitingDoctorCharges
															+ "<input type='hidden' id='visitingDoctorCount' value='"
															+ --visitingDoctorCount
															+ "'>");
									var visitingDoctorTotal = 0;
									var visitingDoctorPay = 0;
									var visitingDoctorCoPay = 0;
									for ( var i = 1; i <= visitingDoctorCount; i++) {
										var visitingDoctorTotalTemp = $(
												'#tdvisitingDoctorTotal' + i)
												.html();
										visitingDoctorTotal = parseFloat(visitingDoctorTotal)
												+ parseFloat(visitingDoctorTotalTemp);
										var visitingDoctorPayTemp = $(
												'#tdvisitingDoctorPay' + i)
												.html();
										visitingDoctorPay = parseFloat(visitingDoctorPay)
												+ parseFloat(visitingDoctorPayTemp);
										var visitingDoctorCoPayTemp = $(
												'#tdvisitingDoctorCoPay' + i)
												.html();
										visitingDoctorCoPay = parseFloat(visitingDoctorCoPay)
												+ parseFloat(visitingDoctorCoPayTemp);
									}

									$('#trvisitingDoctor' + visitingDoctorCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal10">'
															+ visitingDoctorTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay10">'
															+ visitingDoctorPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay10">'
															+ visitingDoctorCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for material used in surgery
								/*
								 * var druglist = billBean.oplist[3];
								 * $("#headDetails11").setTemplate(
								 * $("#matSurDetails").html());
								 * $("#headDetails11").processTemplate(druglist);
								 */
								if (billBean.oplist[3] != "") {
									var i = 4.1;
									var surgeryConsumablesCount = 1;
									var surgeryConsumablesCharges = "";
									$
											.each(
													billBean.oplist[3],
													function(name, value) {
														surgeryConsumablesCharges = surgeryConsumablesCharges
																+ "<tr id='trsurgeryConsumables"
																+ surgeryConsumablesCount
																+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)
																+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdsurgeryConsumablesTotal"
																+ surgeryConsumablesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdsurgeryConsumablesPay"
																+ surgeryConsumablesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdsurgeryConsumablesCoPay"
																+ surgeryConsumablesCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																+ value.id
																+ "' name='ipdBillCheckbox' id='surCo"
																+ surgeryConsumablesCount
																+ "'></td></tr>";
														i = i + 0.1;
														surgeryConsumablesCount++;
													})
									$('#headDetails11')
											.after(
													surgeryConsumablesCharges
															+ "<input type='hidden' id='surgeryConsumablesCount' value='"
															+ --surgeryConsumablesCount
															+ "'>");
									var surgeryConsumablesTotal = 0;
									var surgeryConsumablesPay = 0;
									var surgeryConsumablesCoPay = 0;
									for ( var i = 1; i <= surgeryConsumablesCount; i++) {
										var surgeryConsumablesTotalTemp = $(
												'#tdsurgeryConsumablesTotal'
														+ i).html();
										surgeryConsumablesTotal = parseFloat(surgeryConsumablesTotal)
												+ parseFloat(surgeryConsumablesTotalTemp);
										var surgeryConsumablesPayTemp = $(
												'#tdsurgeryConsumablesPay' + i)
												.html();
										surgeryConsumablesPay = parseFloat(surgeryConsumablesPay)
												+ parseFloat(surgeryConsumablesPayTemp);
										var surgeryConsumablesCoPayTemp = $(
												'#tdsurgeryConsumablesCoPay'
														+ i).html();
										surgeryConsumablesCoPay = parseFloat(surgeryConsumablesCoPay)
												+ parseFloat(surgeryConsumablesCoPayTemp);
									}

									$(
											'#trsurgeryConsumables'
													+ surgeryConsumablesCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal12">'
															+ surgeryConsumablesTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay12">'
															+ surgeryConsumablesPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay12">'
															+ surgeryConsumablesCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for hospital material used
								/*
								 * $("#headDetails5").setTemplate(
								 * $("#matIpdDetails").html());
								 * $("#headDetails5").processTemplate(
								 * billBean.bcs5);
								 */
								if (billBean.oplist[1] != "") {
									var i = 3.1;
									var hospitalMaterialCount = 1;
									var hospitalMaterialCharges = "";
									$
											.each(
													billBean.oplist[1],
													function(name, value) {
														if (value.ct == "ipdConsumable") {
															hospitalMaterialCharges = hospitalMaterialCharges
																	+ "<tr id='trhospitalMaterial"
																	+ hospitalMaterialCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdhospitalMaterialTotal"
																	+ hospitalMaterialCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdhospitalMaterialPay"
																	+ hospitalMaterialCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdhospitalMaterialCoPay"
																	+ hospitalMaterialCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='hosma"
																	+ hospitalMaterialCount
																	+ "'></td></tr>";
															i = i + 0.1;
															hospitalMaterialCount++;
														}
													})
									$('#headDetails5')
											.after(
													hospitalMaterialCharges
															+ "<input type='hidden' id='hospitalMaterialCount' value='"
															+ --hospitalMaterialCount
															+ "'>");
									var hospitalMaterialTotal = 0;
									var hospitalMaterialPay = 0;
									var hospitalMaterialCoPay = 0;
									for ( var i = 1; i <= hospitalMaterialCount; i++) {
										var hospitalMaterialTotalTemp = $(
												'#tdhospitalMaterialTotal' + i)
												.html();
										hospitalMaterialTotal = parseFloat(hospitalMaterialTotal)
												+ parseFloat(hospitalMaterialTotalTemp);
										var hospitalMaterialPayTemp = $(
												'#tdhospitalMaterialPay' + i)
												.html();
										hospitalMaterialPay = parseFloat(hospitalMaterialPay)
												+ parseFloat(hospitalMaterialPayTemp);
										var hospitalMaterialCoPayTemp = $(
												'#tdhospitalMaterialCoPay' + i)
												.html();
										hospitalMaterialCoPay = parseFloat(hospitalMaterialCoPay)
												+ parseFloat(hospitalMaterialCoPayTemp);
									}

									$(
											'#trhospitalMaterial'
													+ hospitalMaterialCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal6">'
															+ hospitalMaterialTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay6">'
															+ hospitalMaterialPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay6">'
															+ hospitalMaterialCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// for Surgeon doctor details
								if (billBean.surli != "") {
									var i = 5.1;
									var pharmachInvoiceCount = 1;
									var pharmachInvoiceCharges = "";
									$
											.each(
													billBean.surli,
													function(name, value) {
														if (value.ct == "MedClinic") {
															pharmachInvoiceCharges = pharmachInvoiceCharges
																	+ "<tr id='trpharmachInvoice"
																	+ pharmachInvoiceCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdpharmachInvoiceTotal"
																	+ pharmachInvoiceCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdpharmachInvoicePay"
																	+ pharmachInvoiceCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdpharmachInvoiceCoPay"
																	+ pharmachInvoiceCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='pharm"
																	+ pharmachInvoiceCount
																	+ "'></td></tr>";
															i = i + 0.1;
															pharmachInvoiceCount++;
														}
													})
									$('#headDetails13')
											.after(
													pharmachInvoiceCharges
															+ "<input type='hidden' id='pharmachInvoiceCount' value='"
															+ --pharmachInvoiceCount
															+ "'>");
									var pharmachInvoiceTotal = 0;
									var pharmachInvoicePay = 0;
									var pharmachInvoiceCoPay = 0;
									for ( var i = 1; i <= pharmachInvoiceCount; i++) {
										var pharmachInvoiceTotalTemp = $(
												'#tdpharmachInvoiceTotal' + i)
												.html();
										pharmachInvoiceTotal = parseFloat(pharmachInvoiceTotal)
												+ parseFloat(pharmachInvoiceTotalTemp);
										var pharmachInvoicePayTemp = $(
												'#tdpharmachInvoicePay' + i)
												.html();
										pharmachInvoicePay = parseFloat(pharmachInvoicePay)
												+ parseFloat(pharmachInvoicePayTemp);
										var pharmachInvoiceCoPayTemp = $(
												'#tdpharmachInvoiceCoPay' + i)
												.html();
										pharmachInvoiceCoPay = parseFloat(pharmachInvoiceCoPay)
												+ parseFloat(pharmachInvoiceCoPayTemp);
									}

									$(
											'#trpharmachInvoice'
													+ pharmachInvoiceCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal14">'
															+ pharmachInvoiceTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay14">'
															+ pharmachInvoicePay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay14">'
															+ pharmachInvoiceCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// gases and monitor
								if (billBean.oplist[1] != "") {
									var i = 3.1;
									var gasesMonitorCount = 1;
									var gasesMonitorCharges = "";
									$
											.each(
													billBean.oplist[1],
													function(name, value) {
														if (value.ct == "gas") {
															gasesMonitorCharges = gasesMonitorCharges
																	+ "<tr id='trgasesMonitor"
																	+ gasesMonitorCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdgasesMonitorTotal"
																	+ gasesMonitorCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdgasesMonitorPay"
																	+ gasesMonitorCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdgasesMonitorCoPay"
																	+ gasesMonitorCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='gasmo"
																	+ gasesMonitorCount
																	+ "'></td></tr>";
															i = i + 0.1;
															gasesMonitorCount++;
														}
													})
									$('#headDetails6')
											.after(
													gasesMonitorCharges
															+ "<input type='hidden' id='gasesMonitorCount' value='"
															+ --gasesMonitorCount
															+ "'>");
									var gasesMonitorTotal = 0;
									var gasesMonitorPay = 0;
									var gasesMonitorCoPay = 0;
									for ( var i = 1; i <= gasesMonitorCount; i++) {
										var gasesMonitorTotalTemp = $(
												'#tdgasesMonitorTotal' + i)
												.html();
										gasesMonitorTotal = parseFloat(gasesMonitorTotal)
												+ parseFloat(gasesMonitorTotalTemp);
										var gasesMonitorPayTemp = $(
												'#tdgasesMonitorPay' + i)
												.html();
										gasesMonitorPay = parseFloat(gasesMonitorPay)
												+ parseFloat(gasesMonitorPayTemp);
										var gasesMonitorCoPayTemp = $(
												'#tdgasesMonitorCoPay' + i)
												.html();
										gasesMonitorCoPay = parseFloat(gasesMonitorCoPay)
												+ parseFloat(gasesMonitorCoPayTemp);
									}

									$('#trgasesMonitor' + gasesMonitorCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal7">'
															+ gasesMonitorTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay7">'
															+ gasesMonitorPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay7">'
															+ gasesMonitorCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');
								}

								// instruments
								/*
								 * $("#headDetails8").setTemplate(
								 * $("#instrumentsDetails").html());
								 * $("#headDetails8").processTemplate(
								 * billBean.oplist[1]);
								 */
								if (billBean.oplist[1] != "") {
									var i = 3.1;
									var instrumentsCount = 1;
									var instrumentsCharges = "";
									$
											.each(
													billBean.oplist[1],
													function(name, value) {
														if (value.ct == "instru") {
															instrumentsCharges = instrumentsCharges
																	+ "<tr id='trinstruments"
																	+ instrumentsCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdinstrumentsTotal"
																	+ instrumentsCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdinstrumentsPay"
																	+ instrumentsCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdinstrumentsCoPay"
																	+ instrumentsCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox' value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='instr"
																	+ instrumentsCount
																	+ "'></td></tr>";
															i = i + 0.1;
															instrumentsCount++;
														}

													})
									$('#headDetails9')
											.after(
													instrumentsCharges
															+ "<input type='hidden' id='instrumentsCount' value='"
															+ --instrumentsCount
															+ "'>");
									var instrumentsTotal = 0;
									var instrumentsPay = 0;
									var instrumentsCoPay = 0;
									for ( var i = 1; i <= instrumentsCount; i++) {
										var instrumentsTotalTemp = $(
												'#tdinstrumentsTotal' + i)
												.html();
										instrumentsTotal = parseFloat(instrumentsTotal)
												+ parseFloat(instrumentsTotalTemp);
										var instrumentsPayTemp = $(
												'#tdinstrumentsPay' + i).html();
										instrumentsPay = parseFloat(instrumentsPay)
												+ parseFloat(instrumentsPayTemp);
										var instrumentsCoPayTemp = $(
												'#tdinstrumentsCoPay' + i)
												.html();
										instrumentsCoPay = parseFloat(instrumentsCoPay)
												+ parseFloat(instrumentsCoPayTemp);
									}

									$('#trinstruments' + instrumentsCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal9">'
															+ instrumentsTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay9">'
															+ instrumentsPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay9">'
															+ instrumentsCoPay
																	.toFixed(2)
															+ '</td>														<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// bedside procedure
								if (billBean.oplist[1] != "") {
									var i = 3.1;
									var bedsideCount = 1;
									var bedsideCharges = "";
									$
											.each(
													billBean.oplist[1],
													function(name, value) {
														if (value.ct == "bedside") {
															bedsideCharges = bedsideCharges
																	+ "<tr id='trbedside"
																	+ bedsideCount
																	+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ i
																			.toFixed(1)
																	+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																	+ value.nm
																	+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																	+ value.dt
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.rtca
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.qty)
																			.toFixed(1)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.disComp)
																			.toFixed(2)
																	+ "</td><td id='tdbedsideTotal"
																	+ bedsideCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ value.amt
																	+ "</td><td id='tdbedsidePay"
																	+ bedsideCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.pay)
																			.toFixed(2)
																	+ "</td><td id='tdbedsideCoPay"
																	+ bedsideCount
																	+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																	+ (value.coPay)
																			.toFixed(2)
																	+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																	+ value.id
																	+ "' name='ipdBillCheckbox' id='bedsi"
																	+ bedsideCount
																	+ "'></td></tr>";
															i = i + 0.1;
															bedsideCount++;
														}
													})
									$('#headDetails8')
											.after(
													bedsideCharges
															+ "<input type='hidden' id='bedsideCount' value='"
															+ --bedsideCount
															+ "'>");
									var bedsideTotal = 0;
									var bedsidePay = 0;
									var bedsideCoPay = 0;
									for ( var i = 1; i <= bedsideCount; i++) {
										var bedsideTotalTemp = $(
												'#tdbedsideTotal' + i).html();
										bedsideTotal = parseFloat(bedsideTotal)
												+ parseFloat(bedsideTotalTemp);
										var bedsidePayTemp = $(
												'#tdbedsidePay' + i).html();
										bedsidePay = parseFloat(bedsidePay)
												+ parseFloat(bedsidePayTemp);
										var bedsideCoPayTemp = $(
												'#tdbedsideCoPay' + i).html();
										bedsideCoPay = parseFloat(bedsideCoPay)
												+ parseFloat(bedsideCoPayTemp);
									}

									$('#trbedside' + bedsideCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal8">'
															+ bedsideTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay8">'
															+ bedsidePay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay8">'
															+ bedsideCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');
								}

								for ( var i = 3; i < billBean.bcs2.length; i++) {
									$("#headdate" + (i + 3)).text(
											(billBean.bcs2[i].dt));
									$("#chr" + (i + 3)).text(
											(billBean.bcs2[i].iprt));
									$("#qty" + (i + 3)).text(
											(billBean.bcs2[i].qty));
									$("#disc" + (i + 3)).text(
											(billBean.bcs2[i].disComp));
									$("#amt" + (i + 3)).text(
											(billBean.bcs2[i].netAmt));
									$("#tdBilldivPay" + (i + 3)).text(
											(billBean.bcs2[i].pay));
									$("#tdBilldivCoPay" + (i + 3)).text(
											(billBean.bcs2[i].coPay));
								}
								/*
								 * if (billBean.bcs2[3].nm == "general Charges") {
								 * $("#headdate6").text((billBean.bcs2[3].dt));
								 * $("#chr6").text( (billBean.bcs2[3].iprt));
								 * $("#qty6").text( billBean.bcs2[3].qty);
								 * $("#amt6").text( (billBean.bcs2[3].netAmt));
								 * $("#tdBilldivPay6").text(
								 * (billBean.bcs2[3].pay));
								 * $("#tdBilldivCoPay6").text(
								 * (billBean.bcs2[3].coPay)); }
								 */

								// operation theater charges
								/*
								 * $("#headDetails12").setTemplate(
								 * $("#theaterDetails").html());
								 * $("#headDetails12").processTemplate(
								 * billBean.bcs1);
								 */
								if (billBean.bcs1 != "") {
									var i = 4.1;
									var operationTheaterCount = 1;
									var operationTheaterCharges = "";
									$
											.each(
													billBean.bcs1,
													function(name, value) {

														operationTheaterCharges = operationTheaterCharges
																+ "<tr id='troperationTheater"
																+ operationTheaterCount
																+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ i.toFixed(1)

														var i = 3.1;
														var bedsideCount = 1;
														var bedsideCharges = "";
														$
																.each(
																		billBean.oplist[1],
																		function(
																				name,
																				value) {
																			if (value.ct == "bedside") {
																				bedsideCharges = bedsideCharges
																						+ "<tr id='trbedside"
																						+ bedsideCount
																						+ "'><td class='col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																						+ i
																								.toFixed(1)
																						+ "</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																						+ value.nm
																						+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																						+ value.dt
																						+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																						+ value.rtca
																						+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																						+ (value.qty)
																								.toFixed(1)
																						+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																						+ (value.disComp)
																								.toFixed(2)
																						+ "</td><td id='tdbedsideTotal"
																						+ bedsideCount
																						+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																						+ value.amt
																						+ "</td><td id='tdbedsidePay"
																						+ bedsideCount
																						+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																						+ (value.pay)
																								.toFixed(2)
																						+ "</td><td id='tdbedsideCoPay"
																						+ bedsideCount
																						+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																						+ (value.coPay)
																								.toFixed(2)
																						+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																						+ value.id
																						+ "' name='ipdBillCheckbox' id='bedsi"
																						+ bedsideCount
																						+ "'></td></tr>";
																				i = i + 0.1;
																				bedsideCount++;
																			}
																		})
														$('#headDetails7')
																.after(
																		bedsideCharges
																				+ "<input type='hidden' id='bedsideCount' value='"
																				+ --bedsideCount
																				+ "'>");
														var bedsideTotal = 0;
														var bedsidePay = 0;
														var bedsideCoPay = 0;
														for ( var i = 1; i <= bedsideCount; i++) {
															var bedsideTotalTemp = $(
																	'#tdbedsideTotal'
																			+ i)
																	.html();
															bedsideTotal = parseFloat(bedsideTotal)
																	+ parseFloat(bedsideTotalTemp);
															var bedsidePayTemp = $(
																	'#tdbedsidePay'
																			+ i)
																	.html();
															bedsidePay = parseFloat(bedsidePay)
																	+ parseFloat(bedsidePayTemp);
															var bedsideCoPayTemp = $(
																	'#tdbedsideCoPay'
																			+ i)
																	.html();
															bedsideCoPay = parseFloat(bedsideCoPay)
																	+ parseFloat(bedsideCoPayTemp);
														}

														$(
																'#trbedside'
																		+ bedsideCount)
																.after(
																		'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal8">'
																				+ bedsideTotal
																						.toFixed(2)
																				+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay8">'
																				+ bedsidePay
																						.toFixed(2)
																				+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay8">'
																				+ bedsideCoPay
																						.toFixed(2)
																				+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');
														+"</td><td class='col-md-2-1' style='border-top: none; padding: 1px;'>"
																+ value.nm
																+ "</td ><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'></td><td class='numeric col-md-1-1' style='border-top: none; padding: 1px;'>"
																+ value.dt
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.rtca
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.qty)
																		.toFixed(1)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.disComp)
																		.toFixed(2)
																+ "</td><td id='tdoperationTheaterTotal"
																+ operationTheaterCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ value.amt
																+ "</td><td id='tdoperationTheaterPay"
																+ operationTheaterCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.pay)
																		.toFixed(2)
																+ "</td><td id='tdoperationTheaterCoPay"
																+ operationTheaterCount
																+ "' class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'>"
																+ (value.coPay)
																		.toFixed(2)
																+ "</td><td class='numeric col-md-1-1 center' style='border-top: none; padding: 1px;'><input type='checkbox'  value='"
																+ value.id
																+ "' name='ipdBillCheckbox' id='OTRen"
																+ operationTheaterCount
																+ "'></td></tr>";
														i = i + 0.1;
														operationTheaterCount++;

													})
									$('#headDetails12')
											.after(
													operationTheaterCharges
															+ "<input type='hidden' id='operationTheaterCount' value='"
															+ --operationTheaterCount
															+ "'>");
									var operationTheaterTotal = 0;
									var operationTheaterPay = 0;
									var operationTheaterCoPay = 0;
									for ( var i = 1; i <= operationTheaterCount; i++) {
										var operationTheaterTotalTemp = $(
												'#tdoperationTheaterTotal' + i)
												.html();
										operationTheaterTotal = parseFloat(operationTheaterTotal)
												+ parseFloat(operationTheaterTotalTemp);
										var operationTheaterPayTemp = $(
												'#tdoperationTheaterPay' + i)
												.html();
										operationTheaterPay = parseFloat(operationTheaterPay)
												+ parseFloat(operationTheaterPayTemp);
										var operationTheaterCoPayTemp = $(
												'#tdoperationTheaterCoPay' + i)
												.html();
										operationTheaterCoPay = parseFloat(operationTheaterCoPay)
												+ parseFloat(operationTheaterCoPayTemp);
									}

									$(
											'#troperationTheater'
													+ operationTheaterCount)
											.after(
													'<tr><td style="padding: 1px; border-top: none;"></td><td style="padding: 1px; border-top: none;"></td>													<td class="numeric center"														style="padding: 1px; border-top: none; color: #5CAFE6;">														Total(INR)</td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric" style="padding: 1px; border-top: none;"></td>													<td class="numeric center" style="padding: 1px; color: #5CAFE6;" id="tdTotal13">'
															+ operationTheaterTotal
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdPay13">'
															+ operationTheaterPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center" style="padding: 1px;" id="tdCoPay13">'
															+ operationTheaterCoPay
																	.toFixed(2)
															+ '</td>													<td class="numeric center"														style="padding: 1px; border-top: none;"></td>												</tr>');

								}

								// chart charges
								var oxy = "";
								for ( var m = 0; m < billBean.bcs6.length; m++) {
									if (billBean.bcs6[m].nm == "Post Operation") {

										$("#postopchr").val(
												(billBean.bcs6[m].rtca));
										$("#postopqty").val(
												billBean.bcs6[m].qty);
										$("#postopamt").val(
												(billBean.bcs6[m].rtca));
										$("#postopdate").val(
												(billBean.bcs6[m].dt));
										$("#ipdBillPostOpSlaveTbId").val(
												(billBean.bcs6[m].id));

									} else if (billBean.bcs6[m].nm == "Intencivist") {
										$("#headdate1")
												.val(billBean.bcs6[m].dt);
										$("#chr1").val((billBean.bcs6[m].rtca));
										$("#qty1").val(billBean.bcs6[m].qty);
										$("#amt1")
												.val(
														(billBean.bcs6[m].rtca * billBean.bcs6[m].qty)
																.toFixed(2));
										$("#msg1").val(billBean.bcs6[m].msg);
									}
									// }

								}
								// for nursing charges
								var nursingCharges = 0;
								var nursingDays = 0.0;
								for ( var k = 0; k < billBean.bcs4.length; k++) {

									var netAmt = billBean.bcs4[k].netAmt;
									if (netAmt == ".00") {

									} else {
										nursingCharges = parseInt(nursingCharges)
												+ parseInt(netAmt);
										nursingDays = nursingDays
												+ billBean.bcs4[k].qty;
									}

								}

								$("#nursingchr").val(
										(nursingCharges).toFixed(2));
								$("#nursingqty").val(nursingDays);
								$("#nursingamt").val(
										(nursingCharges).toFixed(2)
												* (nursingDays).toFixed(2));

								calTotalForIPDAPOnload();
								for ( var z = 0; z < billBean.oplist[0].length; z++) {
									$("#doctorDiv").show();
									var old = $("#docDiscountDiv").html();

									if (billBean.oplist[0][z].bcl.length > 0) {
										$("#docDiscountDiv")
												.setTemplate(
														$("#docDiscountDivtemp")
																.html());
										$("#docDiscountDiv").processTemplate(
												billBean.oplist[0][z].bcl[0]);
										$("#docDiscountDiv").prepend(old);
									}

								}
								for ( var z = 0; z < billBean.oplist[0].length; z++) {
									// alert( billBean.oplist[0][z].docDisc);
									$("#txtdocDiscount" + (z + 1)).val(
											billBean.oplist[0][z].docDisc);

									// alert(
									// billBean.oplist[0][z].docDiscNarr);
									$("#txtdocDiscountReason" + (z + 1)).val(
											billBean.oplist[0][z].docDiscNarr);
								}
								$("#docDisRowcount").val(docdiscount);
								for ( var k = 1; k < 4; k++) {

									$("#eName" + k)
											.attr('readonly', 'readonly');

								}

								$("#txtHospitalDiscount").val(
										billBean.bl[0].hospdis);
								$("#txtHospitalDiscountReason").val(
										billBean.bl[0].hospnarr);
							}
							// }
							// $("#billComponent").processTemplate(billBean);
							$("#msg1").val("Intencivist");
							$("#msg4").val("mlcCharges");
							$("#msg5").val("tpa");
						} else if (tempType == "recAdv") {
							if (billBean.bl[0] != "") {

								if (billBean.bl[0].pa == undefined) {

									$("#txtPayable").val(0);
									$("#txtRemaining").val(0);
									$("#txtPaid").val(0);

									alert("Please Save Provisional IPD Bill.");

								} else {
									$("#txtDiscount").val(
											parseInt(billBean.bl[0].da));
									if (billBean.bl[0].da == null) {
										$("#txtDiscount").val(0);
									}
									$("#txtPayable").val(
											parseInt(billBean.bl[0].pay));
									$("#txtPaid").val(
											parseInt(billBean.bl[0].pa));
									$("#txtRefund").val(
											parseInt(billBean.bl[0].rfd)
													.toFixed(2));
									$("#txtRemaining").val(
											parseInt(billBean.bl[0].ra));
									$("#txtRecNo").html(billBean.bl[0].id);
									/*
									 * $("#SpecialDisc").val(
									 * billBean.bl[0].sp_dic_master_id);
									 */
								}

							}
						}
					}
				}
			});
}

function saveIPDHeaderBill(bltype) {
	var billPrintType = ($('input:radio[name=billPrintType]:checked').val());

	if (bltype == "provisional") {
		// alert(billPrintType);
		if (billPrintType == "" || billPrintType == null) {
			alert("Please Select Bill Type");
			return false;
		}
	}
	var ipdBillObj = 0;

	ipdBillObj = {
		bcs2 : []
	};

	var tStartDate = ($("#tStartDate").html()).trim();

	var tEndDate = ($("#tEndDate").html()).trim();

	var specialDisc = $("#SpecialDisc").val();

	// Bed charges
	var HallCount = $("#HallCount").val();

	for ( var i = 1; i < HallCount; i++) {

		var nm = $.trim($("#hallName" + i).val());

		var qty = $.trim($("#hallqty" + i).val());

		var amt = $.trim($("#hallamt" + i).val());

		var rt = $.trim($("#hallchr" + i).val());

		var date = $.trim($("#halldate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillPatientBedSlaveTbId" + i)
				.val());

		// var rtca = $.trim($("#hiddenhallchr" + i).val());

		var ct = "bedChrg";

		ipdBillObj.bcs2.push({
			"nm" : nm,
			"qty" : qty,
			"amt" : amt,
			"ct" : ct,
			"iprt" : rt,
			"dt" : date,
			"ipdBillSlaveTbId" : ipdBillSlaveTbId
		});

	}

	// Bed charges
	var rHallCount = $("#RHallCount").val();

	for ( var i = 1; i < rHallCount; i++) {

		var nm = $.trim($("#RhallName" + i).val());

		var qty = $.trim($("#Rhallqty" + i).val());

		var amt = $.trim($("#Rhallamt" + i).val());

		var rt = $.trim($("#Rhallchr" + i).val());

		var date = $.trim($("#Rhalldate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillRelativeBedSlaveTbId" + i)
				.val());

		// var rtca = $.trim($("#hiddenhallchr" + i).val());

		var ct = "RelbedChrg";

		ipdBillObj.bcs2.push({
			"nm" : nm,
			"qty" : qty,
			"amt" : amt,
			"ct" : ct,
			"iprt" : rt,
			"dt" : date,
			"ipdBillSlaveTbId" : ipdBillSlaveTbId
		});

	}

	// Investigation test
	var testCount = $("#testCount").val();

	for ( var i = 1; i < testCount; i++) {

		var nm = $.trim($("#testName" + i).val());

		var qty = $.trim($("#testqty" + i).val());

		var amt = $.trim($("#testamt" + i).val());

		var rt = $.trim($("#testchr" + i).val());

		var date = $.trim($("#testdate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillSlaveTbId" + i).val());

		var itemid = $.trim($("#itemid" + i).val());

		// var rtca = $.trim($("#hiddentestchr" + i).val());

		var ct = "testChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid
			// "rtca" : rtca
			});
		} /*
			 * else { alert("Please Insert Item Name"); $.trim($("#testqty" +
			 * i).val("")); $.trim($("#testamt" + i).val(""));
			 * $.trim($("#testchr" + i).val("")); calTotalForIPDAPOnload();
			 * return false; }
			 */
	}
	// physiotherapy test
	var physiotestCount = $("#physiotestCount").val();

	for ( var i = 1; i < physiotestCount; i++) {

		var nm = $.trim($("#physiotestName" + i).val());

		var qty = $.trim($("#physiotestqty" + i).val());

		var amt = $.trim($("#physiotestamt" + i).val());

		var rt = $.trim($("#physiotestchr" + i).val());

		var date = $.trim($("#physiodate" + i).val());
		// var rtca = $.trim($("#physiohiddentestchr" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillPhysioSlaveTbId" + i).val());

		var itemid = $.trim($("#physioitemid" + i).val());

		var ct = "physiotestChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid
			});
		} /*
			 * else { alert("Please Insert Item Name"); $("#physiotestqty" +
			 * i).val(""); $("#physiotestamt" + i).val(""); $("#physiotestchr" +
			 * i).val(""); calTotalForIPDAPOnload(); return false; }
			 */
	}
	// pathology test
	var pathotestCount = $("#pathotestCount").val();

	for ( var i = 1; i < pathotestCount; i++) {

		var nm = $.trim($("#pathotestName" + i).val());

		var qty = $.trim($("#pathotestqty" + i).val());

		var amt = $.trim($("#pathotestamt" + i).val());

		var rt = $.trim($("#pathotestchr" + i).val());

		var date = $.trim($("#pathodate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillPathoSlaveTbId" + i).val());

		var itemid = $.trim($("#pathoitemid" + i).val());

		var itemType = $.trim($("#pathotestType" + i).val());

		var ct = "pathotestChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid,
				"itemType" : itemType
			});
		} /*
			 * else { alert("Please Insert Item Name"); $.trim($("#pathotestqty" +
			 * i).val("")); $.trim($("#pathotestamt" + i).val(""));
			 * $.trim($("#pathotestchr" + i).val("")); calTotalForIPDAPOnload();
			 * return false; }
			 */
	}

	// material used in ipd
	var matIpdCount = $("#matIpdCount").val();

	for ( var i = 1; i < matIpdCount; i++) {

		var nm = $.trim($("#matIpdName" + i).val());

		var qty = $.trim($("#matIpdqty" + i).val());

		var amt = $.trim($("#matIpdamt" + i).val());

		var rt = $.trim($("#matIpdchr" + i).val());

		var date = $.trim($("#matIpddate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillIpdConsumableSlaveTbId" + i)
				.val());

		var itemid = $.trim($("#ipdConsumableItemid" + i).val());

		var ct = "matIpdChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid
			});
		}/*
			 * else { alert("Please Insert Item Name"); $.trim($("#matIpdqty" +
			 * i).val("")); $.trim($("#matIpdamt" + i).val(""));
			 * $.trim($("#matIpdchr" + i).val("")); calTotalForIPDAPOnload();
			 * return false; }
			 */

	}

	// gases and monitor charges
	var ipdservicesCount = $("#ipdservicesCount").val();

	for ( var i = 1; i < ipdservicesCount; i++) {

		var nm = $.trim($("#ipdservicesName" + i).val());

		var qty = $.trim($("#ipdservicesqty" + i).val());

		var amt = $.trim($("#ipdservicesamt" + i).val());

		var rt = $.trim($("#ipdserviceschr" + i).val());

		var date = $.trim($("#ipdservicedate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillGasesMonitorSlaveTbId" + i)
				.val());

		var itemid = $.trim($("#gasesMonitorItemid" + i).val());

		var itemType = $.trim($("#gasesMonitorTestType" + i).val());

		var ct = "ipdservicesChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid,
				"itemType" : itemType
			});
		} /*
			 * else { alert("Please Insert Item Name");
			 * $.trim($("#ipdservicesqty" + i).val(""));
			 * $.trim($("#ipdservicesamt" + i).val(""));
			 * $.trim($("#ipdserviceschr" + i).val(""));
			 * calTotalForIPDAPOnload(); return false; }
			 */
	}

	// bedside procedure charges

	var bedsideCount = $("#bedsideCount").val();

	for ( var i = 1; i < bedsideCount; i++) {

		var nm = $.trim($("#bedsideName" + i).val());

		var qty = $.trim($("#bedsideqty" + i).val());

		var amt = $.trim($("#bedsideamt" + i).val());

		var rt = $.trim($("#bedsidechr" + i).val());

		var date = $.trim($("#bedsidedate" + i).val());

		var ipdBillSlaveTbId = $
				.trim($("#ipdBillBedSideProcedureSlaveTbId" + i).val());

		var itemid = $.trim($("#bedSideProcedureItemid" + i).val());

		var itemType = $.trim($("#bedSideProcedureTestType" + i).val());

		var ct = "bedsideChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid,
				"itemType" : itemType
			});
		} /*
			 * else { alert("Please Insert Item Name"); $.trim($("#bedsideqty" +
			 * i).val("")); $.trim($("#bedsideamt" + i).val(""));
			 * $.trim($("#bedsidechr" + i).val("")); calTotalForIPDAPOnload();
			 * return false; }
			 */
	}

	// Instruments and equipments charges

	var instrumentsCount = $("#instrumentsCount").val();

	for ( var i = 1; i < instrumentsCount; i++) {

		var nm = $.trim($("#instrumentsName" + i).val());

		var qty = $.trim($("#instrumentsqty" + i).val());

		var amt = $.trim($("#instrumentsamt" + i).val());

		var rt = $.trim($("#instrumentschr" + i).val());

		var date = $.trim($("#instrumentsdate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillInstrAndEqpSlaveTbId" + i)
				.val());

		var itemid = $.trim($("#instrAndEqpItemid" + i).val());

		var itemType = $.trim($("#instrAndEqpTestType" + i).val());

		var ct = "instrumentsChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid,
				"itemType" : itemType
			});
		} /*
			 * else { alert("Please Insert Item Name");
			 * $.trim($("#instrumentsqty" + i).val(""));
			 * $.trim($("#instrumentsamt" + i).val(""));
			 * $.trim($("#instrumentschr" + i).val(""));
			 * calTotalForIPDAPOnload(); return false; }
			 */

	}

	// Visiting and consulting charges
	var consultCount = $("#consultCount").val();

	for ( var i = 1; i < consultCount; i++) {

		var nm = $.trim($("#consultName" + i).val());

		var qty = $.trim($("#consultqty" + i).val());

		var amt = $.trim($("#consultamt" + i).val());

		var rt = $.trim($("#consultchr" + i).val());

		var date = $.trim($("#consultdate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillDctorRoundSlaveTbId" + i)
				.val());

		var itemid = $.trim($("#doctorId" + i).val());

		var ct = "consultChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid
			});
		} /*
			 * else { alert("Please Insert Item Name"); $.trim($("#consultqty" +
			 * i).val("")); $.trim($("#consultamt" + i).val(""));
			 * $.trim($("#consultchr" + i).val("")); calTotalForIPDAPOnload();
			 * return false; }
			 */
	}

	// Nursing charges
	if ($("#nursingamt").val() != 0.00) {
		var nm = $.trim($("#nursingName").val());

		var qty = $.trim($("#nursingqty").val());

		var amt = $.trim($("#nursingamt").val());

		var rt = $.trim($("#nursingchr").val());

		var date = $.trim($("#nursingdate" + i).val());

		var ct = "nursingChrg";

		ipdBillObj.bcs2.push({
			"nm" : nm,
			"qty" : qty,
			"amt" : amt,
			"ct" : ct,
			"iprt" : rt,
			"dt" : date
		});
	}
	// Operation charges
	var operationCount = $("#operationCount").val();
	var p = 1;

	var flag = 0;
	for ( var i = 1; i < operationCount; i++) {
		var opDivTyp = $("#opDivTyp" + i).val();
		var tomid = $.trim($("#tomid" + i).val());
		var operationId = $.trim($("#operationId" + i).val());
		if (opDivTyp == "oc") {
			var nm = $.trim($("#operationName" + i).val());

			var qty = $.trim($("#operationqty" + i).val());

			var amt = $.trim($("#operationamt" + i).val());

			var rt = $.trim($("#operationchr" + i).val());

			var date = $.trim($("#operationdate" + i).val());

			var msg = $.trim($("#msg" + i).val());
			var serviceId = 0;
			if (msg == "g" || msg == "b" || msg == "i") {
				if ($("#serviceId" + i).val() != undefined)
					serviceId = $("#serviceId" + i).val();
			}
			var docDiscount = 0;
			var docNarration = "";
			var surgeonId = 0;
			if (flag == 1) {
				docDiscount = $.trim($("#txtdocDiscount" + p).val());
				surgeonId = $.trim($("#surgeonID" + (i - 1)).val());

				if (docDiscount == "") {
					docDiscount = 0;
				}

				docNarration = $.trim($("#txtdocDiscountReason" + p).val());
				p++;
			}
			if (surgeonId == "") {
				surgeonId = 0;
			}
			var ct = "operationChrg";

			if (nm != undefined && nm != "") {

				ipdBillObj.bcs2.push({
					"nm" : nm,
					"qty" : qty,
					"amt" : amt,
					"ct" : ct,
					"iprt" : rt,
					"dt" : date,
					"disComp" : docDiscount,
					"narra" : docNarration,
					"id" : tomid,
					"msg" : msg,
					"itemid" : serviceId,
					"surId" : surgeonId
				});
			} /*
				 * else { alert("Please Insert Item Name");
				 * $.trim($("#operationqty" + i).val(""));
				 * $.trim($("#operationamt" + i).val(""));
				 * $.trim($("#operationchr" + i).val(""));
				 * calTotalForIPDAPOnload(); return false; }
				 */
			flag = 0;
		} else {
			flag = 1;
			var nm = $.trim($("#opnm" + i).html());

			var ct = "operationNm";
			if (nm != undefined && nm != "") {
				ipdBillObj.bcs2.push({
					"nm" : nm,
					"qty" : "0",
					"amt" : "0",
					"ct" : ct,
					"iprt" : "0",
					"dt" : "-",
					"itemid" : operationId,
					"id" : tomid

				});
			}

		}
	}

	// material used in surgery
	var matSurCount = $("#matSurCount").val();

	for ( var i = 1; i < matSurCount; i++) {

		var nm = $.trim($("#matSurName" + i).val());

		var qty = $.trim($("#matSurqty" + i).val());

		var amt = $.trim($("#matSuramt" + i).val());

		var rt = $.trim($("#matSurchr" + i).val());

		var date = $.trim($("#matSurdate" + i).val());

		var ipdBillSlaveTbId = $.trim($(
				"#ipdBillSurgeryConsumableSlaveTbId" + i).val());

		var itemid = $.trim($("#surgeryConsumableId" + i).val());

		var ct = "matSurChrg";
		if (nm != undefined && nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid
			});
		} /*
			 * else { alert("Please Insert Item Name"); $.trim($("#matSurqty" +
			 * i).val("")); $.trim($("#matSuramt" + i).val(""));
			 * $.trim($("#matSurchr" + i).val("")); calTotalForIPDAPOnload();
			 * return false; }
			 */

	}

	// Operation theater charges
	var theaterCount = $("#theaterCount").val();

	for ( var i = 1; i < theaterCount; i++) {

		var nm = $.trim($("#theaterName" + i).val());

		var qty = $.trim($("#theaterqty" + i).val());

		var amt = $.trim($("#theateramt" + i).val());

		var rt = $.trim($("#theaterchr" + i).val());

		var date = $.trim($("#theaterdate" + i).val());

		var ipdBillSlaveTbId = $
				.trim($("#ipdBilloperationTheaterSlaveTbId" + i).val());

		var itemid = $.trim($("#operationTheaterId" + i).val());

		var ct = "theaterChrg";
		if (nm != undefined && nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"qty" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId,
				"itemid" : itemid

			});
		}/*
			 * else { alert("Please Insert Item Name"); $.trim($("#theaterqty" +
			 * i).val("")); $.trim($("#theateramt" + i).val(""));
			 * $.trim($("#theaterchr" + i).val("")); calTotalForIPDAPOnload();
			 * return false; }
			 */

	}

	if ($("#postopchr").val() != 0.00) {
		var nm = $.trim($("#postopName").val());

		var qty = $.trim($("#postopqty").val());

		var amt = $.trim($("#postopamt").val());

		var rt = $.trim($("#postopchr").val());

		var date = $.trim($("#postopdate").val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillPostOpSlaveTbId").val());

		var ct = "postopChrg";
		// if (ipdBillSlaveTbId != 0) {
		ipdBillObj.bcs2.push({
			"nm" : nm,
			"qty" : qty,
			"amt" : amt,
			"ct" : ct,
			"iprt" : rt,
			"dt" : date,
			"ipdBillSlaveTbId" : ipdBillSlaveTbId

		});
		// }
	}
	// Med clinic invoice
	var surgeonCount = $("#surgeonCount").val();
	// var surgeonCount = $("#pharmacyInvoiceCount").val();
	for ( var i = 1; i < surgeonCount; i++) {

		var nm = $.trim($("#surgeonName" + i).val());

		var qty = $.trim($("#surgeonqty" + i).val());

		var amt = $.trim($("#surgeonamt" + i).val());

		var rt = $.trim($("#surgeonchr" + i).val());

		var date = $.trim($("#surgeondate" + i).val());

		var ipdBillSlaveTbId = $.trim($("#ipdBillPharmacyInvoiceSlaveTbId" + i)
				.val());

		var ct = "surgeonChrg";
		if (nm != "") {
			ipdBillObj.bcs2.push({
				"nm" : nm,
				"medInvoiceNo" : qty,
				"amt" : amt,
				"ct" : ct,
				"iprt" : rt,
				"dt" : date,
				"ipdBillSlaveTbId" : ipdBillSlaveTbId
			});
		} /*
			 * else { alert("Please Insert Item Name"); $.trim($("#surgeonqty" +
			 * i).val("")); $.trim($("#surgeonamt" + i).val(""));
			 * $.trim($("#surgeonchr" + i).val("")); calTotalForIPDAPOnload();
			 * return false; }
			 */
	}
	var RowCount = $("#RowCount").val();

	for ( var i = 1; i < RowCount; i++) {

		var nm = $.trim($("#eName" + i).val());

		var qty = $.trim($("#qty" + i).val());

		var amt = $.trim($("#amt" + i).val());

		var rt = $.trim($("#chr" + i).val());

		var date = $.trim($("#headdate" + i).val());

		var msg = $.trim($("#msg" + i).val());

		var itemId = $.trim($("#toid" + i).val());
		/*
		 * var ipdBillSlaveTbId = $.trim($("#ipdBillgeneralTbId" + i) .val());
		 */
		var ct = "generalChrg";

		ipdBillObj.bcs2.push({
			"nm" : nm,
			"qty" : qty,
			"amt" : amt,
			"ct" : ct,
			"iprt" : rt,
			"dt" : date,
			"msg" : msg,
			"itemid" : itemId
		// "ipdBillSlaveTbId":ipdBillSlaveTbId
		});

	}

	if (ipdBillObj.bcs2.length == 0) {
		alert("You can not save empty fields.");
		return false;
	}

	ipdBillObj = JSON.stringify(ipdBillObj);

	var ipdBillId = $("#txtRecNo1").val();

	var Response1 = $("#divBillAAmt").html();
	var parsebcObjForBillAP = "";
	var ipdAMDetailString = "";

	ajaxRes = eval('(' + Response1 + ')');
	var z = 0;
	if (ajaxRes == null || ajaxRes == "null" || ajaxRes == "undefined") {
	} else {
		for ( var m = 1; m <= (ajaxRes.baali.length - 1); m++) {
			// alert(allVals[z]);

			var date = $("#date" + m + "").val();
			var rec_no = $("#rec_no" + m + "").val();
			var heading = $("#heading" + m + " :selected").val();
			var amount = $("#amount" + m + "").val();
			var card_no = $("#card_no" + m + "").val();
			if (date == "" && rec_no == "" && heading == "" && amount == ""
					&& card_no == "") {
				flag = 1;
				alert("You can not save empty fields.");
				return false;
			} else if (date == null || date == "") {
				flag = 1;
				alert("Enter The date For Advanced Amount");
				return false;
			} else if (rec_no == null || rec_no == "") {
				flag = 1;
				alert("Enter Receipt No.");
				return false;
			} else if (amount == null || amount == "") {
				flag = 1;
				alert("Enter Advanced Amount");
				return false;
			} else {

				ajaxRes.baali[z].date = date;
				ajaxRes.baali[z].reno = rec_no;
				ajaxRes.baali[z].amt = amount;
				ajaxRes.baali[z].head = heading;
				ajaxRes.baali[z].cno = card_no;
			}
			z++;
		}

		// alert(ajaxRes);
		parsebcObjForBillAP = JSON.stringify(ajaxRes);

		var rowCountForIPDAP = $("#rowCountForIPDAP").val();
		var addRowCountIPDAP = $("#addRowCountIPDAP").val();
		var countForIPD = rowCountForIPDAP - addRowCountIPDAP;

		if (rowCountForIPDAP == 0) {
			// return false;
		} else {
			var i;
			// var ipdAMDetailString = "";
			for (i = 1; i <= addRowCountIPDAP; i++) {
				countForIPD++;

				var date = $("#date" + countForIPD + "").val();
				var rec_no = $("#rec_no" + countForIPD + "").val();
				var heading = $("#heading" + countForIPD + "").val();
				var amount = $("#amount" + countForIPD + "").val();
				var card_no = $("#card_no" + countForIPD + "").val();
				if (date == "" && rec_no == "" && heading == "" && amount == ""
						&& card_no == "") {
					flag = 1;
					alert("You can not save empty fields.");
					return false;
				} else if (date == null || date == "") {
					flag = 1;
					alert("Enter The date For Advanced Amount");
					return false;
				} else if (rec_no == null || rec_no == "") {
					flag = 1;
					alert("Enter Receipt No.");
					return false;
				} else if (amount == null || amount == "") {
					flag = 1;
					alert("Enter Advanced Amount");
					return false;
				} else if (card_no == null || card_no == "") {
					flag = 1;
					alert("Enter Card Number.");
					return false;
				} else {

					ipdAMDetailString = ipdAMDetailString + "@" + date + ","
							+ rec_no + "," + heading + "," + amount + ","
							+ card_no;
				}
			}
		}
	}
	var inputs = [];
	inputs.push('action=SaveIPDHeaderBill');
	inputs.push('ipdBillId=' + ipdBillId);
	inputs.push('ipdBillObj=' + encodeURIComponent(ipdBillObj));
	inputs.push('parsebcObjForBillAP=' + parsebcObjForBillAP);
	inputs.push('ipdAMDetailString=' + ipdAMDetailString);
	inputs.push('specialDisc=' + specialDisc);
	inputs.push('bltype=' + bltype);

	inputs.push('tStartDate=' + tStartDate);
	inputs.push('tEndDate=' + tEndDate);

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

			if (ajaxResponse == "Bill is Saved successfully...") {
				setTimeout(function() {
					if (bltype == "provisional") {
						saveBillPay(bltype);
					} else {
						saveBillPay(bltype);
					}
				}, 500);
			}

			alert(ajaxResponse);

		}
	});
}

function saveBillPay(billtype) {

	var billPrintType = ($('input:radio[name=billPrintType]:checked').val());
	var myObj = $("#divPatId").html();

	myObj = JSON.parse(myObj);
	var ti = myObj.trid;
	var specialDiscId = $("#SpecialDisc").val();

	var txtTotal = $("#txtTotal").val();
	if (txtTotal == undefined) {
	} else {
		var txtDiscount = $("#txtDiscount").val();
		var txtPayable = $("#txtPayable").val();
		var txtPaid = $("#txtPaid").val();
		var txtRemaining = $("#txtRemaining").val();
		var Refund = $("#txtRefund").val();
		var txtHospitalDiscount = $("#txtHospitalDiscount").val();
		var txtHospitalDiscountReason = $("#txtHospitalDiscountReason").val();
		var inputs = [];
		inputs.push('action=savebillPay');
		inputs.push('specialDisc=' + specialDiscId);
		inputs.push('txtTotal=' + encodeURIComponent(txtTotal));
		inputs.push('txtDiscount=' + encodeURIComponent(txtDiscount));
		inputs.push('txtPayable=' + encodeURIComponent(txtPayable));
		inputs.push('txtPaid=' + encodeURIComponent(txtPaid));
		inputs.push('txtRemaining=' + encodeURIComponent(txtRemaining));
		inputs.push('Refund=' + encodeURIComponent(Refund));
		inputs.push('treatmentId=' + ti);
		inputs.push('billtype=' + billtype);
		inputs.push('txtHospitalDiscount='
				+ encodeURIComponent(txtHospitalDiscount));
		inputs.push('txtHospitalDiscountReason='
				+ encodeURIComponent(txtHospitalDiscountReason));
		inputs.push('billPrintType=' + billPrintType);
		var str = inputs.join('&');
		// alert(str);
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
			success : function(result) {
				var billid = result;
				var billBean = eval('(' + billid + ')');

				// $("#txtRecNo").html(billBean.billCount);
				// printDivIPDBill();
				printDivIPDBill(billtype);
				if (billtype == "final") {
					window.location = "BillingDashboardForIPD.jsp";
				} else {
					location.reload();
					$("#tEndDate").val(treEnd);
				}
			}
		});
	}
}

function getBillId() {

	var inputs = [];
	inputs.push('action=getBillId');

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
			billBean = eval('(' + ajaxResponse + ')');

			$("#billno").html(billBean.id);
		}
	});
}

function saveopdBillDetails(callFrom, billType, pageType) {

	// $("#saveReceipt").attr("disabled", true);

	var txtPayable = 0;
	var txtDiscount = 0;
	var txtNarration = 0;
	var txtAmount = 0;
	var receiptNarration = "";
	var querytype = $("#querytype").val();
	var refered_by = "";
	var opdBillObj = 0;
	var groupId = $("#igi").val();
	var testTypeName = $("#rowname").val();
	
	opdBillObj = {
		bcs2 : []
	};

	// var RowCount = $("#RowCount").val();

	// var RecRowCount = $("#receiptCounter").val();

	// for ( var i = 1; i <= RecRowCount; i++) {
	var modeOfPay = "";
	var cashAmt = 0;
	var cardAmt = 0;
	var chequeAmt = 0;
	var bankname = "";
	var chqbankname = "";

	var receiptCounterObj = 0;
	receiptCounterObj = {
		receiptCounterRowNumber : []
	};

	/*
	 * _______________________________TOuheed__________________________
	 */

	// total table row or elemnt in billing div
	var trow = [];
	var testlist = [];
	var alreadysended = [];
	var totalbillAmount = 0.0;
	// getting lenght of total tr or perticulars present in bill div
	$('#OpdBillPrescription  tr').each(function() {

		var trid = $(this).prop('id');
		trow.push((trid));

	});
	// looping till it get checked pathology test whoes not sended to lab or not
	// Green
	for ( var int = 0; int < (trow.length); int++) {

		var chk = ($("#tdEdCheck" + (trow[int]))).is(':checked');

		// Only checked pathology test
		if (chk == true) {

			// getting type record
			var testType = $("#testType" + trow[int]).val();

			// if its only pathology
			if (testType == "pathology") {

				var labflag = $("#labflag" + trow[int]).val();
				// if labflag N then only send to lab else no
				if (labflag == "N") {

					var msg = $("#Msg" + trow[int]).val();
					var testId = $("#testId" + trow[int]).val();
					var opdBillId = $("#edId" + trow[int]).val();
					var contain = msg + "~" + testId + "~" + opdBillId;

					// adding id,test type and opdbill id into array
					testlist.push(contain);

					var ajaxResponse = $("#iBillMasterList").html();
					var myArray = JSON.parse(ajaxResponse);
					var ObjData = "";
					// loop for searching perticular billid
					for ( var i = 0; i < myArray.liOpd[2].length; i++) {

						if (myArray.liOpd[2][i].id_opd_bill == opdBillId) {
							ObjData = myArray.liOpd[2][i];
						}
					}
					// after getting perticular bill_id using that id we will
					// get Charges of that perticular
					var rate = ObjData.test_rate;
					// parsing it into float
					var myFloat = parseFloat(rate);

					totalbillAmount = totalbillAmount + myFloat;
				} else {
					var testId = $("#testId" + trow[int]).val();
					alreadysended.push(testId);
				}

			}
		}
	}

	// testlist == 0 means,user not selected any pathology test
	if (testlist.length == 0) {

		testlist.push("Nan");
	}

	/*---------------------------------------------------*/

	$('#tblPets tbody tr').each(
			function() {

				var currentRowID = $(this).prop('id');
				receiptCounterObj.receiptCounterRowNumber.push((currentRowID
						.split("__")[1]));

			});

	var printFlag = true;
	for ( var int = 0; int < (receiptCounterObj.receiptCounterRowNumber.length); int++) {

		chk = ($("#chk" + (receiptCounterObj.receiptCounterRowNumber[int])))
				.is(':checked') ? 1 : 0;

		var nm = encodeURIComponent($.trim($(
				"#perticuler"
						+ (receiptCounterObj.receiptCounterRowNumber[int]))
				.html()));

		if (nm != "") {

			var id = $.trim($(
					"#idTest"
							+ (receiptCounterObj.receiptCounterRowNumber[int]))
					.val());

			var qty = $.trim($(
					"#qty" + (receiptCounterObj.receiptCounterRowNumber[int]))
					.html());

			var amt = $.trim($(
					"#amt" + (receiptCounterObj.receiptCounterRowNumber[int]))
					.html());

			var rt = $.trim($(
					"#rate" + (receiptCounterObj.receiptCounterRowNumber[int]))
					.html());

			var msg = $.trim($(
					"#msgDoc"
							+ (receiptCounterObj.receiptCounterRowNumber[int]))
					.val());

			var ct = $.trim($(
					"#typeTest"
							+ (receiptCounterObj.receiptCounterRowNumber[int]))
					.val());

			var dis = $.trim($(
					"#discount"
							+ (receiptCounterObj.receiptCounterRowNumber[int]))
					.html());

			var netAmt = $.trim($(
					"#pay" + (receiptCounterObj.receiptCounterRowNumber[int]))
					.html());
			// var refBy=$.trim($("#refBYname" + i).val());
			var narration = "";
			var opdBillingId = $.trim($(
					"#itId" + (receiptCounterObj.receiptCounterRowNumber[int]))
					.val());
			var recCompId = $.trim($(
					"#recCompId"
							+ (receiptCounterObj.receiptCounterRowNumber[int]))
					.val());

			if (querytype > 0) {
				id = "0";
				msg = "0";
				ct = "0";
				recCompId = "0";
				narration = "0";
				opdBillingId = "0";
			}

			if (callFrom === "print") {
				if ((opdBillingId) != "0") {
					printFlag = false;
					alert("Please pay the bill...");
					return false;
				}
			}

			var receipNO = $.trim($("#receipNO").html());
			opdBillObj.bcs2.push({
				"nm" : nm,
				"id" : id,
				"qty" : qty,
				"amt" : amt,
				"msg" : msg,
				"ct" : ct,
				"rtca" : rt,
				"disComp" : dis,
				"netAmt" : netAmt,
				"narra" : narration,
				"rt" : recCompId,
				"iprt" : receipNO,
				"opdBillingId" : opdBillingId
			});

			txtPayable = $("#finalAmount").val();
			txtNarration = $("#dNarration").val();

			var disc = parseFloat($("#dDiscount").val());
			if (isNaN(disc) || disc === undefined || disc === NaN || disc < 0) {
				disc = 0;
			}

			txtDiscount = disc;
			txtAmount = $("#tdTotal").html();
		}

		var e = document.getElementById("finalPaymentMode");
		modeOfPay = e.options[e.selectedIndex].value;

		bankname = $("#finalBank").val();
		if (modeOfPay == "Cash") {
			cashAmt = txtPayable;
		} else {
			cardAmt = txtPayable;
		}
	}

	if (!printFlag) {// do not print if false
		alert("Please save the bill first..");
		return false;
	}

	cardNo = $("#finalNumber").val();
	receiptNarration = $("#finalComment").val();

	if (callFrom === "print") {
		if (opdBillObj.bcs2.length == 0) {
			alert("No Data to Print.");
			return false;
		}

		// credit receipt
		if ($("#printCreditReceipt").val() === "no") {
			alert("Please pay the bill...");
			return false;
		}
	}

	if (opdBillObj.bcs2.length == 0) {
		alert("You can not Save empty fields.");
		return false;
	}

	opdBillObj = JSON.stringify(opdBillObj);

	var opdBillId = $("#opdBillId").val();

	var seltowards = [];

	$('#seltowards option:selected').each(function() {
		seltowards.push($(this).val());
	});

	var billdate = $("#date").html();

	var bdate = billdate.split("/");

	strDate = bdate[2] + "-" + bdate[1] + "-" + bdate[0];

	var txtTotal = $("#tdEdTotal").html();
	var reason = $("#txtReason").val();

	if (txtTotal == "") {
		alert("Please Enter Bill Total Amount.");
		return false;
	}

	if (txtDiscount == "" || txtDiscount == 0) {
		txtDiscount = 0;
	}

	if (txtPayable == "") {
		alert("Please Enter Bill Payable Amount.");
		return false;
	}

	var PaymentMode = $("#finalPaymentMode").val();
	if (PaymentMode == "Select" || PaymentMode == "" || PaymentMode == 0) {
		alert("Please Select Payment Mode.");
		return false;
	}

	if ($("#finalAmount").val() < 0) {
		alert("Amount should be greater than 0 !");
		return false;
	}

	var payDate = $("#finalDate").val();
	if (payDate == "") {
		alert("Please Select Payment Date.");
		return false;
	}

	var discName = $("#SpecialDisc option:selected").text();

	if (discName == "-Select-") {
		discName = "";
	}

	var incDocNameRec = $("#incDocNameRec").html();

	// var deptName = $("#deptName").html();
	var recdate = $("#finalDate").val();
	var rectime = $("#finalTime").val();
	var remVal = 0;

	var tt = parseFloat($("#tdCoPay").html());
	if (tt < parseInt(txtPayable)) {
		alert("Payable Amount Should be less than or equals total Receipt Amount !");
		return false;
	}
	/*
	 * if (disc > parseInt(txtPayable)) { alert("Discount should be less than
	 * Payable Amount !"); return false; }
	 */
	
	remVal = (tt - txtDiscount) - txtPayable;

	var deptName = "";

	try {
		pobj = $("#divPatId").html();
		pobj1 = eval('(' + pobj + ')');

		var perticuler1 = ($("#perticuler1").html()).trim();
		if (perticuler1 == "Previous Pending Amount:") {
			deptName = "Previous Pending Amount:";
		} else {
			if (pageType == "prevOPDbill") {
				deptName = pobj1.liBM[0].dept_name;
			} else if (pageType == "newOPDbill") {
				deptName = pobj1.dept_name;
			} else {
				deptName = "";
			}
		}
	} catch (e) {
		deptName = pobj1.dept_name;
	}

	refered_by = $("#refby").html();
	var commonAdvance_flag = $("#payfromCA").attr("checked") ? true : false;

	var inputs = [];
	inputs.push('action=saveopdBillDetails');
	inputs.push('tid=' + pobj1.trid);
	inputs.push('txtPayable=' + encodeURIComponent(txtPayable));
	inputs.push('txtTotal=' + encodeURIComponent(txtTotal));
	inputs.push('txtNarration=' + encodeURIComponent(txtNarration));
	inputs.push('txtDiscount=' + encodeURIComponent(txtDiscount));
	inputs.push('opdBillId=' + encodeURIComponent(opdBillId));
	inputs.push('seltowards=' + seltowards);
	inputs.push('billdate=' + strDate);
	inputs.push('opdBillObj=' + opdBillObj);
	inputs.push('callFrom=' + callFrom);
	inputs.push('txtAmount=' + encodeURIComponent(txtAmount));
	inputs.push('discName=' + discName);
	inputs.push('incDocNameRec=' + incDocNameRec);
	inputs.push('deptName=' + deptName);
	inputs.push('recdate=' + recdate);
	inputs.push('rectime=' + rectime);
	inputs.push('reason=' + encodeURIComponent(reason));
	inputs.push('billType=' + billType);
	inputs.push('modeOfPay=' + modeOfPay);
	inputs.push('cashAmt=' + cashAmt);
	inputs.push('cardAmt=' + cardAmt);
	inputs.push('cardNo=' + cardNo);
	inputs.push('receiptNarration=' + receiptNarration);
	inputs.push('bankname=' + bankname);
	inputs.push('remVal=' + remVal);
	inputs.push('refered_by=' + refered_by);
	inputs.push('commonAdvance_flag=' + commonAdvance_flag);
	inputs.push('querytype=' + querytype);
	inputs.push('testlist=' + testlist);
	inputs.push('totalbillAmount=' + totalbillAmount);
	inputs.push('groupId=' + groupId);
	inputs.push('testTypeName=' + testTypeName);

	var str = inputs.join('&');

	if (callFrom != "print") {
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

				if (callFrom === "receipt") {
					alert(ajaxResponse);
					calculateTds();
					// PrintOPDReceipt(str, billType,txtDiscount);
					$("#dNarration").val('');
					$("#dDiscount").val('0');
					$("#finalPaymentMode").val('Cash');
					$("#finalAmount").val('');
					$("#finalDate").val("");
					$("#finalBank").val('');
					$("#finalNumber").val('');
					$("#finalComment").val('');
					window.location.reload(true);
				} else if (callFrom === "save") {
					closeTreatment('OPD');
				}
			}
		});
	}

	if (callFrom === "print") {
		// alert(str);
		calculateTds();
		PrintOPDReceipt(str, billType, txtDiscount);
		$("#dNarration").val('');
		$("#dDiscount").val('0');
		$("#finalPaymentMode").val('Cash');
		$("#finalAmount").val('');
		$("#finalDate").val("");
		$("#finalBank").val('');
		$("#finalNumber").val('');
		$("#finalComment").val('');
		window.location.reload(true);
	}

	setNewReceipt();

}

function PrintOPDReceipt(str, info, disc) {

	var pid = $("#patient_id").html();
	var bill_Category = $("#bill_category").html();
	valuePrint = bill_Category.split("%");
	printValue = valuePrint[0];
	
	var BillCate = printValue.split("(");
	var billCatname = BillCate[0];
	var billCatval1 = BillCate[1];
	
	var TreamentID = $("#trid").val();
	var serviceWiseBillingFlow = $("#serviceWiseBillingFlow").val();
	var repName = $("#repName").val();
	pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var TokenNo = pobj1.tn;
	// var age = pobj1.ag;
	var age = $("#pat_age").html();

	
	var ca = "";
	if ($("#SpecialDisc :selected").html() != "-Select-") {
		ca = $("#SpecialDisc :selected").html();
	} else {
		ca = "No Discount";
	}
	var refBy = "";
	if (info == "diagnosis") {
		if (document.getElementById("refBYname") != null) {
			refBy = document.getElementById("refBYname").innerHTML;
		}
	}
	var finalTotal = $("#finalAmount").val();
	var cons = $("#consult_doc").html();
	var opdNo = $("#opd_no").html();

	var myArray = "";
	var radiname = "";
	var myJsonString = "";

	if (info == 'opd') {
		ajaxResponse = $("#radiResAjaxJson").html();
		if (ajaxResponse != "Empty") {
			myArray = JSON.parse(ajaxResponse);

			myJsonString = JSON.stringify(myArray);
		}
	}

	if (myArray != "") {
		window.open("ReceiptPrint2.jsp?" + str + "&receiptN="
				+ $("#receipNO").html() + "&corpAcc=" + ca + "&name="
				+ encodeURIComponent($.trim($("#patient_name").html()))
				+ "&info=" + info + "&refByName="
				+ encodeURIComponent($.trim(refBy)) + "&finalTotal="
				+ encodeURIComponent(finalTotal) + "&pid=" + pid + "&cons="
				+ cons + "&TokenNo=" + TokenNo + "&age=" + age + "&opdNo="
				+ opdNo + "&disc=" + disc + "&printValue=" + printValue + "&billCatname=" + billCatname + "&billCatval1=" + billCatval1 + "&myArray=" + myJsonString);
	} else {   
		//if serviceWiseBillingFlow on then paramter will be change
		
		if (info == "diagnosis") {
			//var repName = $("#repName").val();
			
			myJsonString = JSON.stringify("Empty");
			window.open("ReceiptPrint2.jsp?" + str + "&receiptN="
					+ $("#receipNO").html() + "&corpAcc=" + ca + "&name="
					+ encodeURIComponent($.trim($("#patient_name").html()))
					+ "&info=" + info + "&refByName="
					+ encodeURIComponent($.trim(refBy)) + "&finalTotal="
					+ encodeURIComponent(finalTotal) + "&pid=" + pid + "&cons="
					+ cons + "&TokenNo=" + TokenNo + "&age=" + age + "&opdNo="
					+ opdNo + "&disc=" + disc + "&printValue=" + printValue + "&billCatname=" + billCatname + "&billCatval1=" + billCatval1 + "&myArray=" + myJsonString + "&srvBilFlow=" + serviceWiseBillingFlow
					+ "&repName=" + repName);
		} else {//if off then regular flow
			serviceWiseBillingFlow = "off";
			repName = "other";
			myJsonString = JSON.stringify("Empty");
			window.open("ReceiptPrint2.jsp?" + str + "&receiptN="
					+ $("#receipNO").html() + "&corpAcc=" + ca + "&name="
					+ encodeURIComponent($.trim($("#patient_name").html()))
					+ "&info=" + info + "&refByName="
					+ encodeURIComponent($.trim(refBy)) + "&finalTotal="
					+ encodeURIComponent(finalTotal) + "&pid=" + pid + "&cons="
					+ cons + "&TokenNo=" + TokenNo + "&age=" + age + "&opdNo="
					+ opdNo + "&disc=" + disc + "&printValue=" + printValue + "&billCatname=" + billCatname + "&billCatval1=" + billCatval1 + "&myArray=" + myJsonString + "&srvBilFlow=" + serviceWiseBillingFlow
					+ "&repName=" + repName);
		}
		
	}
}

function printDiv(divName) {

	$("#paymentModeDiv").hide();
	var xxx = $("#hospDetails").html();
	hospDetails = eval('(' + xxx + ')');
	// var modedetails = $("#divBillAAmt").html();
	// modedetail = eval('(' + modedetails + ')');
	// var a = modedetail.baali[1].opdbilllist[0].cash_amt;
	// var hosp = hospDetails.listHosDetail[0];
	var hosp = hospDetails;
	/* Receipt billing */

	var RecRowCount = $("#RecRowCount").val();
	var nm = [];

	var chr = [];
	var qty = [];
	var amt = [];
	var dis = [];
	var netamt = [];
	var narration = [];
	for ( var k = 1; k <= RecRowCount; k++) {
		if ($("#receName" + k).val() != undefined) {
			var name = $("#receName" + k).val().toLowerCase();
			nm[k] = name.charAt(0).toUpperCase() + name.slice(1);
			chr[k] = $("#recchr" + k).val();
			qty[k] = $("#recqty" + k).val();
			amt[k] = $("#recAmt" + k).val();
			dis[k] = $("#recDisc" + k).val();
			netamt[k] = $("#recOlAmt" + k).val();
			narration[k] = $("#recnarration" + k).val();
		}
	}

	/* Receipt billing */
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
	var date = (curr_date + "-" + curr_month + "-" + curr_year);

	var WindowObject = window.open('', ' ', '');
	WindowObject.document.writeln('<html><body>');

	WindowObject.document
			.writeln('<div style="width: 100%;" align="center;"><table><tr style="width: 100%;"><td style="width: 1%;" align="center"><img src="'
					+ hosp.flpt
					+ '" width="335" height="120" alt="" /></td></tr></table><div style="width: 100%;" align="center">Address:'
					+ hosp.ha
					+ '-'
					+ hosp.hz
					+ '. | Phone:'
					+ hosp.hcon
					+ '</br> </div></div>');

	WindowObject.document
			.writeln('________________________________________________________________________________________________');

	WindowObject.document
			.writeln("<div style='width: 100%; float: left;'>	<div style='width: 100%; float: left;'>		<div style='width: 50%; float: left;'>			<div				style='width: 25%; float: left; padding-top: 1%; font-weight: bold;'>Receipt				No:</div>			<div				style='width: 63%; float: left; padding-top: 1%; color: #002c67;'>"
					+ $("#receipNO").html()
					+ "</div>		</div>		<div style='width: 50%; float: left;'>			<div style='width: 100%; padding-top: 1%; float: left;'>				<div					style='width: 12%; padding-top: 1%; float: left; font-weight: bold;margin-left:55%;'>Date:</div>				<div					style='width: 33%; padding-top: 1%; color: #002c67; float: left;'					id='billdate'>"
					+ date + "</div>			</div>	</div>	</div>		");
	if ($("#pageType").html() == 'opd') {
		var ca = "";
		if ($("#SpecialDisc :selected").html() != "-Select-") {
			ca = $("#SpecialDisc :selected").html();
		} else {
			ca = "No Discount";
		}

		WindowObject.document
				.writeln("<div style='width: 100%; float: left;'>		<div style='width: 100%; float: left;'>			<div				style='width: 20%; float: left; padding-top: 1%; font-weight: bold;'>Consultant				Doctor:</div>			<div				style='width: 35%; float: left; padding-top: 1%; color: #002c67;'>"
						+ $("#incDocNameRec").html()
						+ "</div>		</div><div style='width: 100%;'>			<div				style='width: 20%; padding-top: 1%; float: left; font-weight: bold;'>Department				Name:</div>			<div id='tid'				style='width: 30%; float: left; padding-top: 1%; color: #002c67;'>"
						+ $("#deptName").html()
						+ "</div>	<div				style='width: 20%; padding-top: 1%; float: left; font-weight: bold;'>Corporate	Account:</div>			<div id='tid'				style='width: 30%; float: left; padding-top: 1%; color: #002c67;'>"
						+ ca + "</div>	</div>	</div>");
	} else {
		WindowObject.document
				.writeln("<div style='width: 100%; float: left;'>		<div style='width: 100%; float: left;'>			<div				style='width: 20%; float: left; padding-top: 1%; font-weight: bold;'>Referred By:</div>			<div				style='width: 63%; float: left; padding-top: 1%; color: #002c67;'>"
						+ $("#refBYname").html() + "</div>		</div>");

	}
	WindowObject.document
			.writeln("<div style='width: 100%;'>		<div			style='width: 27%; padding-top: 1%; font-weight: bold; float: left;'>Received			with thanks from :</div>		<div style='width: 50%; padding-top: 1%; color: #002c67; float: left;'>"
					+ $("#patientname").html() + "</div>	</div></div>");

	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 2%; float: left; font-weight: bold;"><div style="width: 100%; float: left;"><div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">#</div><div	style="width: 41%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%;">Particular Name</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Rate</div><div	style="width: 5%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Qty</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Amount</div><div	style="width: 9%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Discount</div><div	style="width: 12%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Net	Amount</div></div></div><div style="width: 99.80%; border: 1px solid #436a9d;"	id="OpdBillPrescription">');
	var sr = 1;
	for ( var i = 1; i <= RecRowCount; i++) {
		if (nm[i] != undefined) {
			WindowObject.document
					.writeln("<div style='width: 100%; height: 28px; border-bottom: 1px solid #069; float: left; border-right: 1px solid #069;'><div 	style='width: 4%; height: 23px; text-align: center; border-left: 1px solid #069; border-right: 1px solid #069; float: left; padding-top: 5px;'>"
							+ sr++
							+ "</div><div	style='width: 42.1%; height: auto; float: left; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>"
							+ nm[i]
							+ "</div><div	style='width: 10.1%; height: 25px; border-right: 1px solid #069; float: left; text-align: right; padding-left: 0%; padding-right: 1%; padding-top: 3px;'>	"
							+ chr[i]
							+ "</div>	<div		style='width: 5.2%; height: 25px; border-right: 1px solid #069; float: left; padding-right: 1%; padding-top: 3px; text-align: right;'>"
							+ qty[i]
							+ "</div>	<div		style='width: 10%; height: 25px; border-right: 1px solid #069; float: left; padding-right: 1%; padding-top: 3px; text-align: right;'>"
							+ amt[i]
							+ "</div>	<div		style='width: 9.1%; height: 25px; border-right: 1px solid #069; float: left; padding-right: 1%; padding-top: 3px; text-align:right;'>"
							+ dis[i]
							+ "</div><div style='text-align: right;padding-right: 1%;'>"
							+ netamt[i] + "</div></div>");
		}
	}
	WindowObject.document
			.writeln('</div><div style="width: 100%; height: 28px;"><div style="width: 58.3%; float: left;height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;"></div><div	style="width: 6.2%; height: 23px;float: left; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;">	<b>Total</b></div>	<div		style="width: 10%;float: left; height: 23px;  text-align:right;border-bottom: 1px solid #069; border-right: 1px solid #069; padding-right: 1%; padding-top: 5px;">		'
					+ $("#txtAmount").val()
					+ '</div>	<div		style="width:9%;float: left; height: 23px; border-bottom: 1px solid #069; text-align:right; border-right: 1px solid #069; padding-right: 1%; padding-top: 5px;">		'
					+ $("#txtDiscountRec").val()
					+ '			</div>	<div		style="width: 13%;float: left; height: 23px; border-bottom: 1px solid #069; text-align:right;border-right: 1px solid #069; padding-right: 1%; padding-top: 5px;">				'
					+ $("#txtTotalNetAmtRec").val() + '	</div></div>');

	WindowObject.document
			.writeln('<div style="width: 97%; margin-top: 20%;">	<div		style="width: 90%; padding-left: 0px; padding-bottom: 10px; padding-top: 10px;"		align="left">		Amount In Words <label id="amountinwords"			style="padding-top: 10px; padding-left: 10px; font-size: 20px; font-family: monospace; font-weight: bold;">'
					+ $("#amountinwords").html()
					+ '</label>	</div></div><div style="width: 97%; height: 20px">	<div	style="width: 30%; padding-left: 0px; padding-bottom: 10px; padding-top: 1px;"		align="left">		<div style="width: 80%; float: left; border: 1px solid #436a9d;">			<div style="width: 15%; float: left; padding-left: 10px;">				<h3>Rs.</h3>			</div>			<div style="width: 70%; padding-top: 20px; padding-left: 20px;">				<label id="amountinno"					style="padding-top: 10px; font-size: 20px; font-family: monospace; font-weight: bold;"><div						id="divAmount"></div>'
					+ $("#finalTotal").val()
					+ ' </label>			</div>	</div>	</div></div><div style="width: 97%; margin-top: 30px" align="right">(Authorised	signatory)</div>');
	WindowObject.document.writeln('</body></html>');
	/*
	 * $("#cashAmount").val(cashamount); $("#cardAmount").val(cardAmount);
	 * $("#cardNo").val(cardNo); $("#cardBankName").val(cardBankName);
	 */
	WindowObject.document.close();
	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();
	location.reload();

}

function printDivForDiagnosisBill() {

	var xxx = $("#hospDetails").html();
	hospDetails = eval('(' + xxx + ')');
	var modedetails = $("#divBillAAmt").html();
	// modedetail = eval('(' + modedetails + ')');
	// var a = modedetail.baali[1].opdbilllist[0].cash_amt;
	// var hosp = hospDetails.listHosDetail[0];
	var hosp = hospDetails;
	/* Receipt billing */

	var RecRowCount = $("#RecRowCount").val();
	var nm = [];

	var chr = [];
	var qty = [];
	var amt = [];
	var dis = [];
	var netamt = [];
	var narration = [];
	for ( var k = 1; k <= RecRowCount; k++) {
		if ($("#receName" + k).val() != undefined) {
			var name = $("#receName" + k).val().toLowerCase();
			nm[k] = name.charAt(0).toUpperCase() + name.slice(1);
			chr[k] = $("#recchr" + k).val();
			qty[k] = $("#recqty" + k).val();
			amt[k] = $("#recAmt" + k).val();
			dis[k] = $("#recDisc" + k).val();
			netamt[k] = $("#recOlAmt" + k).val();
			narration[k] = $("#recnarration" + k).val();
		}
	}

	/* Receipt billing */
	var d = new Date();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
	var date = (curr_date + "-" + curr_month + "-" + curr_year);

	var WindowObject = window.open('', ' ', '');
	WindowObject.document.writeln('<html><body>');

	WindowObject.document
			.writeln('<div style="width: 100%;" align="center;"><table><tr style="width: 100%;"><td style="width: 1%;" align="center"><img src="'
					+ hosp.flpt
					+ '" width="335" height="120" alt="" /></td></tr></table><div style="width: 100%;" align="center">Address:'
					+ hosp.ha
					+ '-'
					+ hosp.hz
					+ '. | Phone:'
					+ hosp.hcon
					+ '</br> </div></div>');

	WindowObject.document
			.writeln('________________________________________________________________________________________________');

	WindowObject.document
			.writeln("<div style='width: 100%; float: left;'>	<div style='width: 100%; float: left;'>		<div style='width: 50%; float: left;'>			<div				style='width: 25%; float: left; padding-top: 1%; font-weight: bold;'>Receipt				No:</div>			<div				style='width: 63%; float: left; padding-top: 1%; color: #002c67;'>"
					+ $("#receipNO").html()
					+ "</div>		</div>		<div style='width: 50%; float: left;'>			<div style='width: 100%; padding-top: 1%; float: left;'>				<div					style='width: 12%; padding-top: 1%; float: left; font-weight: bold;margin-left:55%;'>Date:</div>				<div					style='width: 33%; padding-top: 1%; color: #002c67; float: left;'					id='billdate'>"
					+ date + "</div>			</div>	</div>	</div>		");
	if ($("#pageType").html() == 'opd') {
		var ca = "";
		if ($("#SpecialDisc :selected").html() != "-Select-") {
			ca = $("#SpecialDisc :selected").html();
		}
		WindowObject.document
				.writeln("<div style='width: 100%; float: left;'>		<div style='width: 100%; float: left;'>			<div				style='width: 20%; float: left; padding-top: 1%; font-weight: bold;'>Consultant				Doctor:</div>			<div				style='width: 35%; float: left; padding-top: 1%; color: #002c67;'>"
						+ $("#incDocNameRec").html()
						+ "</div>		</div><div style='width: 100%;'>			<div				style='width: 20%; padding-top: 1%; float: left; font-weight: bold;'>Department				Name:</div>			<div id='tid'				style='width: 30%; float: left; padding-top: 1%; color: #002c67;'>"
						+ $("#deptName").html()
						+ "</div>	<div				style='width: 20%; padding-top: 1%; float: left; font-weight: bold;'>Corporate	Account:</div>			<div id='tid'				style='width: 30%; float: left; padding-top: 1%; color: #002c67;'>"
						+ ca + "</div>	</div>	</div>");
	} else {
		WindowObject.document
				.writeln("<div style='width: 100%; float: left;'>		<div style='width: 100%; float: left;'>			<div				style='width: 20%; float: left; padding-top: 1%; font-weight: bold;'>Referred By:</div>			<div				style='width: 63%; float: left; padding-top: 1%; color: #002c67;'>"
						+ $("#incDocName").html() + "</div>		</div>");

	}
	WindowObject.document
			.writeln("<div style='width: 100%;'>		<div			style='width: 27%; padding-top: 1%; font-weight: bold; float: left;'>Received			with thanks from :</div>		<div style='width: 50%; padding-top: 1%; color: #002c67; float: left;'>"
					+ $("#patientname").html() + "</div>	</div></div>");

	WindowObject.document
			.writeln('<div style="width: 100%; padding-top: 2%; float: left; font-weight: bold;"><div style="width: 100%; float: left;"><div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">#</div><div	style="width: 41%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%;">Particular Name</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Rate</div><div	style="width: 5%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Qty</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Amount</div><div	style="width: 9%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Discount</div><div	style="width: 12%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Net	Amount</div></div></div><div style="width: 99.80%; border: 1px solid #436a9d;"	id="OpdBillPrescription">');
	var sr = 1;
	for ( var i = 1; i <= RecRowCount; i++) {
		if (nm[i] != undefined) {
			WindowObject.document
					.writeln("<div style='width: 100%; height: 28px; border-bottom: 1px solid #069; float: left; border-right: 1px solid #069;'><div 	style='width: 4%; height: 23px; text-align: center; border-left: 1px solid #069; border-right: 1px solid #069; float: left; padding-top: 5px;'>"
							+ sr++
							+ "</div><div	style='width: 42.1%; height: auto; float: left; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>"
							+ nm[i]
							+ "</div><div	style='width: 10.1%; height: 25px; border-right: 1px solid #069; float: left; text-align: right; padding-left: 0%; padding-right: 1%; padding-top: 3px;'>	"
							+ chr[i]
							+ "</div>	<div		style='width: 5.2%; height: 25px; border-right: 1px solid #069; float: left; padding-right: 1%; padding-top: 3px; text-align: right;'>"
							+ qty[i]
							+ "</div>	<div		style='width: 10%; height: 25px; border-right: 1px solid #069; float: left; padding-right: 1%; padding-top: 3px; text-align: right;'>"
							+ amt[i]
							+ "</div>	<div		style='width: 9.1%; height: 25px; border-right: 1px solid #069; float: left; padding-right: 1%; padding-top: 3px; text-align:right;'>"
							+ dis[i]
							+ "</div><div style='text-align: right;padding-right: 1%;'>"
							+ netamt[i] + "</div></div>");
		}
	}
	WindowObject.document
			.writeln('</div><div style="width: 100%; height: 28px;"><div style="width: 58.3%; float: left;height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;"></div><div	style="width: 6.2%; height: 23px;float: left; text-align: center; border-bottom: 1px solid #069; border-right: 1px solid #069; padding-top: 5px;">	<b>Total</b></div>	<div		style="width: 10%;float: left; height: 23px;  text-align:right;border-bottom: 1px solid #069; border-right: 1px solid #069; padding-right: 1%; padding-top: 5px;">		'
					+ $("#txtAmount").val()
					+ '</div>	<div		style="width:9%;float: left; height: 23px; border-bottom: 1px solid #069; text-align:right; border-right: 1px solid #069; padding-right: 1%; padding-top: 5px;">		'
					+ $("#txtDiscountRec").val()
					+ '			</div>	<div		style="width: 13%;float: left; height: 23px; border-bottom: 1px solid #069; text-align:right;border-right: 1px solid #069; padding-right: 1%; padding-top: 5px;">				'
					+ $("#txtTotalNetAmtRec").val() + '	</div></div>');

	WindowObject.document
			.writeln('<div style="width: 97%; margin-top: 20%;">	<div		style="width: 90%; padding-left: 0px; padding-bottom: 10px; padding-top: 10px;"		align="left">		Amount In Words <label id="amountinwords"			style="padding-top: 10px; padding-left: 10px; font-size: 20px; font-family: monospace; font-weight: bold;">'
					+ $("#amountinwords").html()
					+ '</label>	</div></div><div style="width: 97%; height: 20px">	<div	style="width: 30%; padding-left: 0px; padding-bottom: 10px; padding-top: 1px;"		align="left">		<div style="width: 80%; float: left; border: 1px solid #436a9d;">			<div style="width: 15%; float: left; padding-left: 10px;">				<h3>Rs.</h3>			</div>			<div style="width: 70%; padding-top: 20px; padding-left: 20px;">				<label id="amountinno"					style="padding-top: 10px; font-size: 20px; font-family: monospace; font-weight: bold;"><div						id="divAmount"></div>'
					+ $("#finalTotal").val()
					+ ' </label>			</div>	</div>	</div></div><div style="width: 97%; margin-top: 30px" align="right">(Authorised	signatory)</div>');
	WindowObject.document.writeln('</body></html>');
	/*
	 * $("#cashAmount").val(cashamount); $("#cardAmount").val(cardAmount);
	 * $("#cardNo").val(cardNo); $("#cardBankName").val(cardBankName);
	 */
	WindowObject.document.close();
	WindowObject.focus();

	WindowObject.print();

	WindowObject.close();

}
function test_skill() {
	var junkVal = $('#txtRemaining').val() + "/-";
	$('#txtAmount').val(parseFloat(junkVal).toFixed(2));
	$("#seltowards").val("Payment");
	junkVal = junkVal.split("/-");
	junkVal = Math.floor(junkVal[0]);
	var obStr = new String(junkVal);
	numReversed = obStr.split("");
	actnumber = numReversed.reverse();

	if (Number(junkVal) >= 0) {
		// do nothing
	} else {
		alert('Please Refresh The Page For Calculation Of Total Bill !');
		return false;
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
	$('#cashAmount').val($('#txtRemaining').val());

}
function setCashForAdvance() {
	if ($("#seltowards").val() != null) {
		// if ($("#seltowards").val() == "Advance") {
		setTimeout(function() {
			$('#cashAmount').val($('#txtAmount').val());
		}, 250);
		// }

	} else {
		$("#txtAmount").val(" ");
		alert("Please select receipt Towards..");
		return false;
	}
}
function checkAmount() {
	var amount = $("#txtAmount").val();
	var index = amount.indexOf("/-");
	if (index < 0) {
		$("#txtAmount").val(amount + "/-");
	}
	var len = amount.split("/-");
	if (len.length > 1) {
		if (len[1] != "") {
			alert("You can not enter amount after /- ");
			$("#txtAmount").val(amount.split("/-")[0] + "/-");
			return false;
		}
	}
}

/** ******************* opd previous Bill start ******************* */
var ipd_temp = "{#foreach $T.pl as pl}{#if $T.pl.liBM != '' }"
		+ "<table class='table table-bordered cf ' style='Width: 100%; margin-top:-1px;margin-bottom: 0px;'>"
		+ "<tbody>		"
		+ "<tr id='div{++count}'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{count}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-4 center'>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{$T.pl.pi}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.pl.objTreat.trCount}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.pl.rgDt}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBill({count})'>"
		+ "<img src='images/down.png' id='imgupdown{count}' />"
		+ "<input type='hidden' id='hideShowStatus{count}' value='0' /></td>"
		+ "</tr>"
		+ "</tbody></table>"
		+

		"<table id='patPreOPDBill{count}' class='table table-bordered table-striped header-fixed cf ' style='Width: 40%; margin-top: 0px; margin-left: 663px; display:none;' class='col-md-1 center'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Treatment ID</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Bill No.</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Bill Date</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>View Bill</th>"
		+ "</tr>"
		+ "{#foreach $T.pl.liBM as liBM}{#if $T.liBM.bda != '' }"
		+ "<tr id='div{count}'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.liBM.tid}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.liBM.billCount}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' class='numeric '>{$T.liBM.bda}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"
		+ "<button value='VIEW BILL' style='height: 21.5px;' onClick='goToIPDPrevBill({$T.liBM.id},{$T.pl.pi},{$T.liBM.tid})'>"
		+ "<i class='fa fa-eye View' class='edit'></i></button></td></tr>{#/if}{#/for}</tbody></table>"
		+ "<input type='hidden' value='{count}' id='rowCount' />{#/if}{#/for}";

var opd_temp_previousTreatment = "{#foreach $T.pl as pl}{#if $T.pl.liBM != '' }"
		+ "<table class='table table-condensed table-bordered table-stripped cf TextFont' style='Width: 100%; margin-top: 0px;margin-bottom: -1px;'>"
		+ "<tbody>		"
		+ "<tr id='div{++count}'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{count}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-4 '>{$T.pl.tit} {$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>{$T.pl.pi}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.pl.rgDt}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBill({count})'>"
		+ "<img src='images/down.png' id='imgupdown{count}' />"
		+ "<input type='hidden' id='hideShowStatus{count}' value='0' /><input type='hidden' id='patientDOB' value='{$T.pl.db}' /></td>"
		+ "</tr>"
		+ "</tbody></table>"
		+ "<table id='patPreOPDBill{count}' class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px; display:none;' class='col-md-1 center'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
		+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
		+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
		+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
		+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
		+ "</tr>"
		+ "{#foreach $T.pl.liBM as liBM}{#if $T.liBM.bda != '' }"
		+ "<tr id='div{count}'>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>{$T.liBM.tid}</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>{$T.liBM.bt}</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>{$T.liBM.startdate}</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>{$T.liBM.consFollowup}</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>"
		+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='goToOPDPrevBill({$T.liBM.id},{$T.pl.pi},{$T.liBM.tid},{$T.liBM.bda})'>"
		+ "<i class='fa fa-eye View'></i></button></td></tr>{#/if}{#/for}</tbody></table>"
		+ "<input type='hidden' value='{count}' id='rowCount' />{#/if}{#/for}";

var temp_previousTreatment = "<table id='patPreOPDBill{count}'	class='table table-bordered table-striped header-fixed cf TextFont'	style='Width: 40%; margin-top: -20px; margin-left: 663px; display: none;'	class='col-md-1 center'>		<tbody>				<tr>						<th style='height: 21.5px;' class='col-md-1 center'>Treatment ID</th>			<th style='height: 21.5px;' class='col-md-1 center'>Action</th>		</tr>		 {#foreach $T.pl.liBM as liBM}		<tr id='div{count}'>						<td style='height: 21.5px;' class='col-md-1 center' class=''>{$T.liBM.tid}</td>			<td style='height: 21.5px;' class='col-md-1 center'>				<button style='height: 21.5px;'					onClick='goToOPDPrevBill({$T.liBM.id},{$T.pl.pi},{$T.liBM.tid},{$T.liBM.bda})'>					 <i class='fa fa-eye View' class='edit'></i>				</button>			</td>		</tr>		{#/for}	</tbody></table><input type='hidden' value='{count}' id='rowCount' />{#/if}{#/for}";

function viewPrevOPDBillPatient(callfrom, billtype) {
	count = 0;
	var byName = 0;
	var byId = 0;
	var searchBy;
	var value;
	if (callfrom == "onload") {
		value = callfrom;
	} else if (callfrom == "search") {

		byName = $("#byName").val();
		byId = $("#byId").val();
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
			alert("please search either by patient Id or by Patient Name");
		} else if (byName == "" && byId == "") {
			alert("please insert something for search");
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
	}

	var inputs = [];
	inputs.push('action=fetchPrevOPDBillPat');
	inputs.push('type=' + billtype);
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
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
			console.log();
			// alert(ajaxResponse);
			$("#prevOPDBillObj").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if(pobj1.pl.length == 0){
				alert("Patient details not found.");
				$("#byName").val("");
				$("#byName").focus();
				return false;
			}

			var pageType = ($("#pageType").html()).trim();

			if (pageType == "previousTreatmentOPDER") {
				$("#container").setTemplate(opd_temp_previousTreatment);
				$("#container").processTemplate(pobj1);
			} else {
				// $("#container").setTemplate($("#temp").html());
				$("#container").setTemplate(opd_temp);
				$("#container").processTemplate(pobj1);
			}

			var rowCount = $("#rowCount").val();

			for ( var i = 1; i <= rowCount; i++) {
				$("#patPreOPDBill" + i).hide();
			}
		}
	});
}

function viewPrevIPDBillPatient(funtype, billtype) {
	count = 0;
	var byName = 0;
	var byId = 0;
	var searchBy;
	var value;
	if (funtype == "onload") {
		value = funtype;
	} else if (funtype == "search") {

		byName = $("#byName").val();
		byId = $("#byId").val();
		/** *blank space validation **@author husen* */
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
			alert("please search either by patient Id or by Patient Name");
		} else if (byName == "" && byId == "") {
			alert("please insert something for search");
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
	}
	var inputs = [];
	inputs.push('action=featchPrevIPDBillPat');
	inputs.push('billType=' + billtype);
	inputs.push('searchBy=' + searchBy);
	inputs.push('billID=0');
	inputs.push('value=' + encodeURIComponent(value));
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
			$("#prevOPDBillObj").html(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');
			if (patientBean.pl.length == 0) {
				alert("Patient details not found.");
			} else {

				$("#container").setTemplate(ipd_temp);
				$("#container").processTemplate(patientBean);

				var rowCount = $("#rowCount").val();

				for ( var i = 1; i <= rowCount; i++) {
					$("#patPreOPDBill" + i).hide();
				}
			}
		}
	});
}

function prevOPDBillPatSearch(type) {
	count = 0;
	var byName = $("#byName").val().trim();
	var byId = $("#byId").val().trim();
	var byMobile = $("#byMobile").val();

	if (byName != "" && byId != "") {
		alert("please search either by patient Id or by Patient Name");
		return false;
	} else if (byName != "" && byMobile != "") {
		alert("please search either by Patient Name or by Mobile No");
		return false;
	} else if (byId != "" && byMobile != "") {
		alert("please search either by patient Id or by Mobile No");
		return false;
	} else if (byName == "" && byId == "" && byMobile == "") {
		alert("please search either by patient Id or by Patient Name or by Mobile No");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		} else if (byMobile != "") {
			searchBy = "byMobile";
			value = byMobile;
		}
	}

	var inputs = [];
	inputs.push('action=PrevOPDBillPatSearch');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));
	/*
	 * inputs.push('byName=' + byName); inputs.push('byId=' + byId);
	 */
	inputs.push('type=' + type);
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

			var patientBean = eval('(' + ajaxResponse + ')');
			if (patientBean.pl.length == 0) {
				alert("Patient details not found.");
				$("#container").setTemplate(divContent);
				$("#container").processTemplate(patientBean);
			} else {

				$("#prevOPDBillObj").html(ajaxResponse);

				var pageType = ($("#pageType").html()).trim();

				if (pageType == "previousTreatmentOPDER") {
					$("#container").setTemplate(opd_temp_previousTreatment);
					$("#container").processTemplate(patientBean);
				} else {
					// $("#container").setTemplate($("#temp").html());
					$("#container").setTemplate(opd_temp);
					$("#container").processTemplate(patientBean);
				}

				var rowCount = $("#rowCount").val();

				for ( var i = 1; i <= rowCount; i++) {
					$("#patPreOPDBill" + i).hide();
				}
			}
			
		}
	});
}

function hideShowPreOPDBill(count) {

	var hideShowStatus = $("#hideShowStatus" + count).val();

	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#patPreOPDBill" + count).show();
		$("#hideShowStatus" + count).val(1);
		

	} else {
		$("#imgupdown" + count).attr('src', "images/down.png");
		$("#patPreOPDBill" + count).hide();
		$("#hideShowStatus" + count).val(0);
	}
}

function goToOPDPrevBill(billID, pid, tid, bilDt1) {

	var pageType = ($("#pageType").html()).trim();

	ajaxResponse = $("#prevOPDBillObj").html();
	var myArray = JSON.parse(ajaxResponse);
	var myObj = "";
	
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];
			myObj.trid = tid;
			break;
		}
	}

	var tit = myObj.tit;
	var fn = myObj.fn;
	var mn = myObj.mn;
	// var treatId = myObj.tid;
	var discID;
	var ln = myObj.ln;
	var refBy;
	var customLibm = 0;

	customLibm = {
		liBM : []
	};

	if (pageType == "previousTreatmentOPDER") { // send only selected tId data
		for ( var i = 0; i < myObj.liBM.length; i++) {
			if ((myObj.liBM[i].tid) == tid) {
				myObj.liBM[0] = myObj.liBM[i];
				// break;
			}
		}
	} else {
		for ( var i = 0; i < myObj.liBM.length; i++) {
			if (myObj.liBM[i].id == billID) {
				refBy = myObj.liBM[i].rb;
				discID = myObj.liBM[i].sdisc;
				customLibm.liBM[0] = myObj.liBM[i];
				myObj.liBM = customLibm.liBM;
				break;
			}
		}
	}

	var pname = tit + " " + fn + " " + mn + " " + ln;

	myObj = JSON.stringify(myObj);
	
	if (pageType == "opd") {
		window.location.href = "prevOpdBill.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&billID=" + billID + "&sdisc="
				+ discID + "&pname=" + pname + "&pageType=" + pageType
				+ "&treatId=" + tid;
	} else if (pageType == "casualty") {
		window.location.href = "prevCasualtyBill.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&billID=" + billID + "&pname="
				+ pname + "&pageType=" + pageType;
	} else if (pageType == "previousTreatmentOPDER") {
		window.location.href = "OPDDoctorsDesk2.jsp?pid="
				+ pid
				+ "&id=0&trid="+tid+"&updateFlagOn=direct&FunType=insert&callFrom=previousTreatmentOPDER&myObj="
				+ encodeURIComponent(myObj);

	} else {
		window.location.href = "prevDiagnosisBill.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&billID=" + billID + "&pname="
				+ pname + "&pageType=" + pageType + "&refBy=" + refBy
				+ "&treatId=" + tid;
	}
	$("#trid").val(tid);
}


function goToOPDPrevBill2( tid ) {

	/*var pageType = ($("#pageType").html()).trim();

	ajaxResponse = $("#prevOPDBillObj").html();
	var myArray = JSON.parse(ajaxResponse);
	var myObj = "";
	
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pid) {
			myObj = myArray.pl[i];
			myObj.trid = tid;
			break;
		}
	}

	var tit = myObj.tit;
	var fn = myObj.fn;
	var mn = myObj.mn;
	// var treatId = myObj.tid;
	var discID;
	var ln = myObj.ln;
	var refBy;
	var customLibm = 0;

	customLibm = {
		liBM : []
	};

	if (pageType == "previousTreatmentOPDER") { // send only selected tId data
		for ( var i = 0; i < myObj.liBM.length; i++) {
			if ((myObj.liBM[i].tid) == tid) {
				myObj.liBM[0] = myObj.liBM[i];
				// break;
			}
		}
	} else {
		for ( var i = 0; i < myObj.liBM.length; i++) {
			if (myObj.liBM[i].id == billID) {
				refBy = myObj.liBM[i].rb;
				discID = myObj.liBM[i].sdisc;
				customLibm.liBM[0] = myObj.liBM[i];
				myObj.liBM = customLibm.liBM;
				break;
			}
		}
	}

	var pname = tit + " " + fn + " " + mn + " " + ln;

	myObj = JSON.stringify(myObj);
	
	if (pageType == "opd") {
		window.location.href = "prevOpdBill.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&billID=" + billID + "&sdisc="
				+ discID + "&pname=" + pname + "&pageType=" + pageType
				+ "&treatId=" + tid;
	} else if (pageType == "casualty") {
		window.location.href = "prevCasualtyBill.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&billID=" + billID + "&pname="
				+ pname + "&pageType=" + pageType;
	} else if (pageType == "previousTreatmentOPDER") {*/
	//pageType = "previousTreatmentOPDER";
	
	var preflag="previousTreatmentOPDER";
	setTimeout(function() {
		window.location.href = "IPD_DoctorStation2.jsp?tid=" + tid+"&callfrom="+ preflag   ;
		
	}, 400);

	
	
	//window.location.href = "ehat_ipd_billing.jsp? "+"trid="+tid;
/*
	} else {
		window.location.href = "prevDiagnosisBill.jsp?" + "myObj="
				+ encodeURIComponent(myObj) + "&billID=" + billID + "&pname="
				+ pname + "&pageType=" + pageType + "&refBy=" + refBy
				+ "&treatId=" + tid;
	}
	$("#trid").val(tid);*/
}

 
var billOPDcomponent = "{#foreach $T.bcs2 as oli}<tr id='{rowCount}'>	<td style='border-top: none; padding: 1px;' class='col-md-1-1'>{rowCount}</td>	<td style='border-top: none; padding: 1px;' class='col-md-3-1'		id='tdEdPerticulars{rowCount}'>{$T.oli.nm}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdRate{rowCount}'>{$T.oli.rtca}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdQty{rowCount}'>{$T.oli.qty}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdAmount{rowCount}'>{$T.oli.amt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdConcession{rowCount}'>{$T.oli.disComp}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdPayable{rowCount}'>{$T.oli.netAmt}</td>	<td style='border-top: none; padding: 1px;'		class='numeric col-md-1-1 center'><input type='checkbox'		onClick='addReceiptComp({rowCount})' id='tdEdCheck{rowCount}'		name='checked' value='{$T.opd.id_opd_bill}' /> <i id='editRow'		type='button' class='fa fa-edit fa-1x' style='margin-left: 6px;cursor: pointer;'		onclick='editRows(this)'></i><i id='deleteRow' type='button'		style='margin-left: 6px;' class='fa fa-trash-o fa-1x'		onclick='deleteRows(this)'></i></td>	<td style='border-top: none; padding: 1px; display: none;'		class='numeric col-md-1-1' id='{$T.oli.ct}{$T.oli.id}'>{rowCount}</td>	<input type='hidden' value='{rowCount}' id='txtRowCount'		name='txtRowCount' />	<input type='hidden' value='{$T.oli.msg}' id='msg{rowCount}' />	<input type='hidden' value='{$T.oli.ct}' id='itmType{rowCount}' />	<input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' /></tr>{#/for}{#foreach $T.bcs3 as oli}<tr id='{rowCount}'>	<td style='border-top: none; padding: 1px;' class='col-md-1-1'>{rowCount}</td>	<td style='border-top: none; padding: 1px;' class='col-md-3-1'		id='tdEdPerticulars{rowCount}'>{$T.oli.nm}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdRate{rowCount}'>{$T.oli.rtca}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdQty{rowCount}'>{$T.oli.qty}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdAmount{rowCount}'>{$T.oli.amt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdConcession{rowCount}'>{$T.oli.disComp}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdPayable{rowCount}'>{$T.oli.netAmt}</td>	<td style='border-top: none; padding: 1px;'		class='numeric col-md-1-1 center'><input type='checkbox'		onClick='addReceiptComp({rowCount})' id='tdEdCheck{rowCount}'		name='checked' value='{$T.opd.id_opd_bill}' /> <i id='editRow'		type='button' class='fa fa-edit fa-1x' style='margin-left: 6px;cursor: pointer;'		onclick='editRows(this)'></i><i id='deleteRow' type='button'		style='margin-left: 6px;cursor: pointer;' class='fa fa-trash-o fa-1x'		onclick='deleteRows(this)'></i></td>	<td style='border-top: none; padding: 1px; display: none;'		class='numeric col-md-1-1' id='{$T.oli.ct}{$T.oli.id}'>{rowCount}</td>	<input type='hidden' value='{rowCount}' id='txtRowCount'		name='txtRowCount' />	<input type='hidden' value='{$T.oli.msg}' id='msg{rowCount}' />	<input type='hidden' value='{$T.oli.ct}' id='itmType{rowCount}' />	<input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' /></tr>{#/for}";

var prebillOPDCompTemp = "{#foreach $T.bcs2 as oli}<tr id='{rowCount}'>	<td style='border-top: none; padding: 1px;' class='col-md-1-1'>{rowCount}</td>	<td style='border-top: none; padding: 1px;' class='col-md-3-1'		id='tdEdPerticulars{rowCount}'>{$T.oli.nm}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdRate{rowCount}'>{$T.oli.rtca}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdQty{rowCount}'>{$T.oli.qty}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdAmount{rowCount}'>{$T.oli.amt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdConcession{rowCount}'>{$T.oli.disComp}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdPayable{rowCount}'>{$T.oli.netAmt}</td>	<td style='border-top: none; padding: 1px;'		class='numeric col-md-1-1 center'><input type='checkbox'		onClick='addReceiptComp({rowCount})' id='tdEdCheck{rowCount}'		name='checked' value='{$T.opd.id_opd_bill}' /> <i id='editRow'		type='button' class='fa fa-edit fa-1x' style='margin-left: 6px;cursor: pointer;'		onclick='editRows(this)'></i><i id='deleteRow' type='button'		style='margin-left: 6px;cursor: pointer;' class='fa fa-trash-o fa-1x'		onclick='deleteRows(this)'></i></td>	<td style='border-top: none; padding: 1px; display: none;'		class='numeric col-md-1-1' id='{$T.oli.ct}{$T.oli.id}'>{rowCount}</td>	<input type='hidden' value='{rowCount}' id='txtRowCount'		name='txtRowCount' />	<input type='hidden' value='{$T.oli.msg}' id='msg{rowCount}' />	<input type='hidden' value='{$T.oli.ct}' id='itmType{rowCount}' />	<input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' /></tr>{#/for}{#foreach $T.bcs3 as oli}<tr id='{rowCount}'>	<td style='border-top: none; padding: 1px;' class='col-md-1-1'>{rowCount}</td>	<td style='border-top: none; padding: 1px;' class='col-md-3-1'		id='tdEdPerticulars{rowCount}'>{$T.oli.nm}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdRate{rowCount}'>{$T.oli.rtca}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdQty{rowCount}'>{$T.oli.qty}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdAmount{rowCount}'>{$T.oli.amt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdConcession{rowCount}'>{$T.oli.disComp}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdPayable{rowCount}'>{$T.oli.netAmt}</td>	<td style='border-top: none; padding: 1px;'		class='numeric col-md-1-1 center'><input type='checkbox'		onClick='addReceiptComp({rowCount})' id='tdEdCheck{rowCount}'		name='checked' value='{$T.opd.id_opd_bill}' /> <i id='editRow'		type='button' class='fa fa-edit fa-1x' style='margin-left: 6px;cursor: pointer;'		onclick='editRows(this)'></i><i id='deleteRow' type='button'		style='margin-left: 6px;cursor: pointer;' class='fa fa-trash-o fa-1x'		onclick='deleteRows(this)'></i></td>	<td style='border-top: none; padding: 1px; display: none;'		class='numeric col-md-1-1' id='{$T.oli.ct}{$T.oli.id}'>{rowCount}</td>	<input type='hidden' value='{rowCount}' id='txtRowCount'		name='txtRowCount' />	<input type='hidden' value='{$T.oli.msg}' id='msg{rowCount}' />	<input type='hidden' value='{$T.oli.ct}' id='itmType{rowCount}' />	<input type='hidden' value='{$T.oli.id}' id='toid{rowCount++}' /></tr>{#/for}";

function calOverrideCharges(rowCount) {
	calDoctorCharges(rowCount);
	calTotalOPD(rowCount);
	onChangeRate(rowCount);
	calNetAmtTotal(rowCount, 'bill');
}

function fetchOPDbillDetailsByBillID(billType) {

	var billID = $("#billID").text();
	alert(billID);

	sr = 1;
	rowCount = 1;

	var inputs = [];
	inputs.push('action=fetchOPDbillByBillID');
	inputs.push('billID=' + billID);
	inputs.push('billType=' + billType);

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
			billComps = r;

			$("#opdBillObj").val(billComps);

			billBean = eval('(' + billComps + ')');

			/*
			 * if (billBean.bcs2 == "" && billBean.bcs3 == "" && billBean.bcs3 ==
			 * "") { alert("Patient bill is not available."); window.location =
			 * "prevOPD_Bill_Database.jsp"; return false;
			 */
			// }
			if (billBean.bl[0].bd != "") {
				var bdate = new Date(billBean.bl[0].bd);
				var strDate = bdate.getDate() + "/" + (bdate.getMonth() + 1)
						+ "/" + bdate.getFullYear();
				$("#billdate").html(strDate);
			}
			fetchOPDbillDetailsByBillID
			$("#opdBillId").html(billBean.bl[0].id);
			$("#billno").html(billBean.bl[0].id);
			$("#txtRecNo").val(billBean.bl[0].rno);

			/*
			 * var d = new Date(); var strDate = d.getDate() + "/" +
			 * (d.getMonth() + 1) + "/" + d.getFullYear();
			 * $("#billdate").html(strDate);
			 */

			if ($("#pageType").html() == "opd") {
				if (billBean.bcs2.length >= 1) {
					if (billBean.bcs2[0].msg == "registration") {
						if (billBean.bcs2.length > 1) {
							$("#incDocName").html(billBean.bcs2[1].msg);
						}
					} else {
						$("#incDocName").html(billBean.bcs2[0].msg);
					}
				} else {
					$("#incDocName").html(billBean.bcs3[0].msg);
				}

			}
			if (billBean.hospDetail[0] != null) {
				setHospitalDetails(billBean.hospDetail[0]);
			}
			$("#OpdBillPrescription").setTemplate(prebillOPDCompTemp);
			$("#OpdBillPrescription").processTemplate(billBean);
			$("#txtReason").val(billBean.bl[0].rea);
			setTimeout(function() {
				$("#SpecialDisc").val($("#spdicID").val());
				var RowCount = $("#RowCount").val();
				getOPDReceiptMaster(billID, billType);
				calTotalOPD(RowCount);
				getOPDReceiptComponantShow(billID, billType);

			}, 1000);
		}
	});
}

function createDivForOPDReceipt(elementValue) {
	var ReceiptCheck = $("#ReceiptCheck").val();

	if (ReceiptCheck == 1) {
		alert("You can not add new Item in the previous receipt");
		$("#chk" + elementValue).prop("checked", false);
		return false;
	}
	$("#paymentModeDiv").show();
	var elementValue1 = 0;

	var x = ($("#chk" + elementValue)).is(':checked') ? 1 : 0;
	if (x == 1) {
		var ele = 0;
		ele = ((parseInt(elementValue1)) + 1);
		elementValue1++;

		var hiddenRecRowCount = document.getElementById("RecRowCount");

		var RecRowCount = hiddenRecRowCount.value;

		var srNo = 0;
		if (RecRowCount == 0)
			srNo = 0;
		else
			srNo = $("#srNo").val();

		RecRowCount++;
		srNo++;
		divId = "div" + RecRowCount;

		var x = document.createElement('div');

		x.setAttribute('id', divId);

		x.setAttribute('style', 'width: 100%; ');

		document.getElementById("recpDiv").appendChild(x);

		document.getElementById(divId).innerHTML = '<div id="Billdiv2'
				+ (elementValue)
				+ '" style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div id="no" style="width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
				+ (RecRowCount)
				+ '</div><div style="width: 35%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;"><input type="text" readonly="readonly" id="receName'
				+ (RecRowCount)
				+ '"value="'
				+ $("#eName" + elementValue).val()
				+ '" style="width: 90%; border: 1px solid #09C;"></div><div style="width: 11.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input type="text"  readonly="readonly" id="recchr'
				+ (RecRowCount)
				+ '" value="'
				+ $("#chr" + elementValue).val()
				+ '" style="width: 90%; border: 1px solid #09C;"></div><div style="width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input type="text" onkeyup="setBCamount(2)" readonly="readonly" id="recqty'
				+ (RecRowCount)
				+ '" value="'
				+ $("#qty" + elementValue).val()
				+ '" style="width: 90%; border: 1px solid #09C;"></div><div style="width: 11%; height: 25px; padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;"><input type="text" readonly="readonly" id="recAmt'
				+ (RecRowCount)
				+ '" value="'
				+ $("#amt" + elementValue).val()
				+ '" style="width: 90%; border: 1px solid #09C;"></div><div style="width: 10%; height: 25px; padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;"><input type="text" readonly="readonly" id="recDisc'
				+ (RecRowCount)
				+ '" value="'
				+ $("#discount" + elementValue).val()
				+ '" style="width: 90%; border: 1px solid #09C;text-align:right;"></div><div style="width: 13%; height: 25px; padding-left: 1%; padding-top: 3px; border-right: 1px solid #069;"><input type="text" readonly="readonly" id="recOlAmt'
				+ (RecRowCount)
				+ '" value="'
				+ $("#netAmt" + elementValue).val()
				+ '" style="width: 90%; border: 1px solid #09C; text-align: right;"></div></div><div style="width: 100%; height: 28px; border-bottom: 1px solid #069;" readonly="readonly" id="reasRece'
				+ (elementValue)
				+ '"><div style="width: 88.5%; height: 23px;  padding-left: 4%; padding-top: 5px;"><input type="text" placeholder="Narration For Discount" style="width: 99%;" readonly="readonly" id="recnarration'
				+ (RecRowCount) + '" value="'
				+ $("#narration" + elementValue).val()
				+ '"></div><input type="hidden" id="recCompId' + RecRowCount
				+ '" value="0"><input type="hidden" value="'
				+ $("#msg" + elementValue).val() + '" id="recmsg' + RecRowCount
				+ '" />	<input type="hidden" value="'
				+ $("#itmType" + elementValue).val() + '" id="recitmType'
				+ RecRowCount + '" />	<input type="hidden" value="'
				+ $("#toid" + elementValue).val() + '" id="rectoid'
				+ RecRowCount + '" /></div>';

		$("#RecRowCount").val(RecRowCount);
		$("#addRecRowCount").val(RecRowCount);
		$("#srNo").val(srNo);
		var temp = $("#narration" + elementValue).val();
		if (temp == "") {
			$("#reasRece" + elementValue).hide();
		}

		var xx = $("#RecRowCount").val();
		calTotalForOPDReceipt(xx);
		calTotalDiscForOPDReceipt(xx);
		calTotalNetForOPDReceipt(xx);

	} else {
		srNo = $("#srNo").val();
		--srNo;
		--RecRowCount;

		// $("#no").html(RecRowCount);
		$("#srNo").val(srNo);
		var xx = $("#RecRowCount").val();
		$("#Billdiv2" + elementValue).remove();
		var temp = $("#narration" + elementValue).val();
		if (temp != "") {
			$("#reasRece" + elementValue).remove();
		}

		calTotalForOPDReceipt(xx);
		calTotalDiscForOPDReceipt(xx);
		calTotalNetForOPDReceipt(xx);

	}
}

function calTotalForOPDReceipt(rowCount) {
	var tmp = 0;

	for ( var i = 1; i <= rowCount; i++) {
		var valA = $("#recAmt" + i).val();
		var x = isNaN(parseInt(valA)) ? 0 : parseInt(valA);
		tmp = tmp + x;
	}
	$("#txtAmount").val(parseFloat(tmp).toFixed(2));

}
function calTotalDiscForOPDReceipt(rowCount) {
	var tmp = 0;

	for ( var i = 1; i <= rowCount; i++) {
		var valB = $("#recDisc" + i).val();
		var x = isNaN(parseInt(valB)) ? 0 : parseInt(valB);
		tmp = tmp + x;
	}
	$("#txtDiscountRec").val(tmp);

}
function calTotalNetForOPDReceipt(rowCount) {
	var tmp = 0;

	for ( var i = 1; i <= rowCount; i++) {
		var valC = $("#recOlAmt" + i).val();
		var x = isNaN(parseInt(valC)) ? 0 : parseInt(valC);
		tmp = tmp + x;

	}
	$("#txtTotalNetAmtRec").val(parseFloat(tmp).toFixed(2));
	$("#finalTotal").val(parseFloat(tmp).toFixed(2));
	$("#cashAmount").val(parseFloat(tmp).toFixed(2));
	test_skill_opdBill();
}

var receiptMasterlist = '<div style="width: 10%;">Previous Receipt Numbers</div>{#foreach $T.listRecMaster as listRecMaster}<div id="idReceiptMaster" style="width: 10%;" onclick=getOPDReceiptComponant({$T.listRecMaster.idrm},"OPDBill") >{$T.listRecMaster.idrm}</div>{#/for}';

var previousreceiptMasterlist = '<div style="width: 10%;">Previous Receipt Numbers</div>{#foreach $T.listRecMaster as listRecMaster}<div id="idReceiptMaster" style="width: 10%;" onclick=getOPDReceiptComponant({$T.listRecMaster.idrm},"prevOPDBill") >{$T.listRecMaster.idrm}</div>{#/for}';

var previousDiagnosisReceiptMasterlist = '<div style="width: 10%;">Previous Receipt Numbers</div>{#foreach $T.listRecMaster as listRecMaster}<div id="idReceiptMaster" style="width: 10%;" onclick=getOPDReceiptComponant({$T.listRecMaster.idrm},"diagnosis") >{$T.listRecMaster.idrm}</div>{#/for}';

count = 1;
var receiptComp = '{#foreach $T.listRecMaster as listRecMaster}<tr>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1 center">{count}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1 center">{$T.listRecMaster.idrm}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1" id="payModeCash{count}">{$T.listRecMaster.pay_mode}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1 left" id="discCash{count}">{$T.listRecMaster.onBilDis}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center" id="totalCash{count}">{$T.listRecMaster.pdAmt}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 center" id="IdReceiptCash{count}">{$T.listRecMaster.card_no}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 left" id="dateCash{count}">{$T.listRecMaster.recDate}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 left" id="bankNameCash{count}">{$T.listRecMaster.bname}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
		+ '<i type="button" class="btn btn-success" title="pay" onclick="setTypeGroup({$T.listRecMaster.gid},\'{$T.listRecMaster.ttype}\'),editReceipt({$T.listRecMaster.idrm},{count})" id="cashrecChk{count}" style="cursor: pointer;">'
		+ '<div style="display: none;" id="recTime{count}">{$T.listRecMaster.recTime}</div><input type="hidden" id="dnarr{count}" value={$T.listRecMaster.managNrr} /><input type="hidden" id="dAmt{count}" value={$T.listRecMaster.onBilDis} /><input type="hidden" id="pr{count}" value={$T.listRecMaster.prev} /><input type="hidden" id="cashComment{count++}" value={$T.listRecMaster.narr} /></td>'
		+ '</tr>{#/for}';


countOPD = 1;
var receiptCompOPD = '{#foreach $T.listRecMaster as listRecMaster}<tr>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1 center">{countOPD}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1 center">{$T.listRecMaster.idrm}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1" id="payModeCash{countOPD}">{$T.listRecMaster.pay_mode}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1 left" id="discCash{countOPD}">{$T.listRecMaster.onBilDis}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center" id="totalCash{countOPD}">{$T.listRecMaster.pdAmt}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 center" id="IdReceiptCash{countOPD}">{$T.listRecMaster.card_no}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 left" id="dateCash{countOPD}">{$T.listRecMaster.recDate}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 left" id="bankNameCash{countOPD}">{$T.listRecMaster.bname}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
		+ '<i type="button" class="btn btn-success" title="pay" onclick="editReceipt({$T.listRecMaster.idrm},{countOPD});" id="cashrecChk{countOPD}" style="cursor: pointer;">'
		+ '<div style="display: none;" id="recTime{countOPD}">{$T.listRecMaster.recTime}</div>'
		+ '<input type="hidden" id="dnarr{countOPD}" value="{$T.listRecMaster.managNrr}" />'
		+ '<input type="hidden" id="dAmt{countOPD}" value="{$T.listRecMaster.onBilDis}" />'
		+ '<input type="hidden" id="pr{countOPD}" value="{$T.listRecMaster.prev}" />'
		+ '<input type="hidden" id="cashComment{countOPD++}" value="{$T.listRecMaster.narr}" /></td>'
		+ '</tr>{#/for}';

var receiptCompcredit = '{#foreach $T.listRecMaster as listRecMaster}<tr>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1">{count}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1">{$T.listRecMaster.idrm}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1 center" id="payModeCredit{count}">{$T.listRecMaster.pay_mode}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1 center" id="discCredit{count}">{$T.listRecMaster.onBilDis}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center" id="totalCredit{count}">{$T.listRecMaster.pdAmt}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 center" id="remaingCredit{count}">{$T.listRecMaster.rval}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 left" id="IdReceiptCredit{count}">{$T.listRecMaster.card_no}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 left" id="dateCredit{count}">{$T.listRecMaster.recDate}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 left" id="bankNameCredit{count}">{$T.listRecMaster.bname}</td>'
		+ '<td style="border-top: none; padding-top: 2px;" class="numeric col-md-1-1 center" id="payCredit{count}">'
		+ '<button class="btn btn-success" title="pay" onclick="payCreditReceipt({$T.listRecMaster.idrm},{count}),setTypeGroup({$T.listRecMaster.gid},\'{$T.listRecMaster.ttype}\');"'
		// + ' id="paycreditrecChk{count}" style="cursor: pointer;"></input>'
		+ ' id="paycreditrecChk__{$T.listRecMaster.idrm}" style="cursor: pointer;"></input>'
		+ '</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
		+ '<i type="button" class="fa fa-print fa-0x" title="print" onclick="setTypeGroup({$T.listRecMaster.gid},\'{$T.listRecMaster.ttype}\'),editReceiptCredit({$T.listRecMaster.idrm},{count})"'
		+ ' id="creditrecChk{count}" style="cursor: pointer;" />'
		+ '<div style="display: none;" id="recTimeCredit{count}">{$T.listRecMaster.recTime}</div>'
		+ '<input type="hidden" id="dnarrcredit{count}" value="{$T.listRecMaster.managNrr}" />'
		+ '<input type="hidden" id="dAmtcredit{count}" value="{$T.listRecMaster.onBilDis}" />'
		+ '<input type="hidden" id="pr{count}" value="{$T.listRecMaster.prev}" />'
		+ '<input type="hidden" id="creditComment{count++}" value="{$T.listRecMaster.narr}" /></td>'
		+ '</tr>{#/for}';


var receiptCompcreditOPD = '{#foreach $T.listRecMaster as listRecMaster}<tr>'
	+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1">{count}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1">{$T.listRecMaster.idrm}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1 center" id="payModeCredit{count}">{$T.listRecMaster.pay_mode}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1 center" id="discCredit{count}">{$T.listRecMaster.onBilDis}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center" id="totalCredit{count}">{$T.listRecMaster.pdAmt}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 center" id="remaingCredit{count}">{$T.listRecMaster.rval}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 left" id="IdReceiptCredit{count}">{$T.listRecMaster.card_no}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 left" id="dateCredit{count}">{$T.listRecMaster.recDate}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 left" id="bankNameCredit{count}">{$T.listRecMaster.bname}</td>'
	+ '<td style="border-top: none; padding-top: 2px;" class="numeric col-md-1-1 center" id="payCredit{count}">'
	+ '<button class="btn btn-success editUserAccess" title="pay" onclick="payCreditReceipt({$T.listRecMaster.idrm},{count});"'
	// + ' id="paycreditrecChk{count}" style="cursor: pointer;"></input>'
	+ ' id="paycreditrecChk__{$T.listRecMaster.idrm}" style="cursor: pointer;"></input>'
	+ '</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
	+ '<i type="button" class="fa fa-print fa-0x" title="print" onclick="editReceiptCredit({$T.listRecMaster.idrm},{count});"'
	+ ' id="creditrecChk{count}" style="cursor: pointer;" /><div style="display: none;" id="recTimeCredit{count}">{$T.listRecMaster.recTime}</div>'
	+ '<input type="hidden" id="dnarrcredit{count}" value="{$T.listRecMaster.managNrr}" />'
	+ '<input type="hidden" id="dAmtcredit{count}" value="{$T.listRecMaster.onBilDis}" />'
	+ '<input type="hidden" id="pr{count}" value="{$T.listRecMaster.prev}" />'
	+ '<input type="hidden" id="creditComment{count++}" value="{$T.listRecMaster.narr}" /></td>'
	+ '</tr>{#/for}';

var opdbillreceiptforpayment = '{#foreach $T.listRecMaster as listRecMaster}<div id="Paydiv2" style="width 100%; height 28px; border-bottom 1px solid #069;">	<div style="width 4%; height 23px; text-align center; border-right 1px solid #069; padding-top 5px;">Cash </div>	<div style="width 4%; height 23px; text-align center; border-right 1px solid #069; padding-top 5px;">Credit/Debit Card </div></div>	<div style="width 100%;">	<div style="width 35%; height 23px; border-right 1px solid #069; padding-left 1%; padding-top 5px;"><input type="text" readonly="readonly" id="cashamt" style="width 90%; border 1px solid #09C;" value="{$T.listRecMaster.cash_amt}" /></div>	<div style="width 11.2%; height 25px; border-right 1px solid #069; padding-left 1%; padding-top 3px;"><input type="text" readonly="readonly"  id="cardamt" style="width 90%; border 1px solid #09C;" value="{$T.listRecMaster.card_amt}"/></div></div><div style="width 100%;">	<div style="width 9%; height 25px; border-right 1px solid #069; padding-left 1%; padding-top 3px;"><input type="text" readonly="readonly"  id="cardNo" value="{$T.listRecMaster.card_no}" style="width 90%; border 1px solid #09C;"/></div></div>	<div style="width 100%;">	<div style="width 11%; height 25px; padding-left 1%; padding-top 3px; border-right 1px solid #069;"><input type="text" readonly="readonly" id="bankName" value="{$T.listRecMaster.bname}" style="width 90%; border 1px solid #09C; text-align right;"/></div></div>{#/for}';

function getOPDReceiptMaster(bill_id, billType, type, ty) {
	// bill_id = $("#opdBillId").html();
	var inputs = [];
	inputs.push('action=OPDReceiptMaster');
	inputs.push('bill_id=' + bill_id);
	inputs.push('callFrom=' + billType);
	inputs.push('type=' + type);
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
					// alert('error');
				},
				success : function(r) {
					ajaxResponseForRecMaster = r;

					$("#hidDivForRecMaster").html(ajaxResponseForRecMaster);
					receiptBean = eval('(' + ajaxResponseForRecMaster + ')');

					var cashdisc = 0;
					var creditdisc = 0;
					if (billType == 'OPDBill') {

						if (type == 'cash') {
							$("#cashDivForRecMaster").html(
									ajaxResponseForRecMaster);
							count = 1;
							countOPD = 1;
							$("#receiptComp").setTemplate(receiptCompOPD);
							$("#receiptComp").processTemplate(receiptBean);

							var recTotal = 0;
							for ( var i = 0; i < receiptBean.listRecMaster.length; i++) {
								recTotal = recTotal
										+ receiptBean.listRecMaster[i].pdAmt;
								cashdisc = cashdisc
										+ receiptBean.listRecMaster[i].onBilDis;
							}

							$("#cashDisc").val(cashdisc);
							$("#recTotal").html(recTotal);
							$("#cashRecCount").val(
									receiptBean.listRecMaster.length);

						} else if (type == 'credit') {
							$("#creditDivForRecMaster").html(
									ajaxResponseForRecMaster);
							if (receiptBean.listRecMaster.length > 0) {
								$("#credit_status").addClass("fa fa-star");
							}

							count = 1;
							$("#receiptCompcredit").setTemplate(
									receiptCompcreditOPD);
							$("#receiptCompcredit")
									.processTemplate(receiptBean);

							setTimeout(
									function() {
										var recTotal = 0;
										for ( var i = 0; i < receiptBean.listRecMaster.length; i++) {

											recTotal = recTotal
													+ receiptBean.listRecMaster[i].pdAmt;
											creditdisc = creditdisc
													+ receiptBean.listRecMaster[i].onBilDis;
											try {
												for ( var j = 0; j < (receiptBean.listRecMaster[i].listOPDReceiptComponant.length); j++) {

													var cnameVar = "";
													cnameVar = (receiptBean.listRecMaster[i].listOPDReceiptComponant[j].cname);
													if ((cnameVar
															.indexOf(creditReceiptString)) === 0) {

														var prevReceiptID = ((cnameVar
																.split(creditReceiptString))[1])
																.trim();
														// paycreditrecChk__6274
														$(
																"#paycreditrecChk__"
																		+ prevReceiptID)
																.prop(
																		'disabled',
																		true);
														$(
																"#paycreditrecChk__"
																		+ prevReceiptID)
																.removeClass(
																		"btn-success editUserAccess");
														$(
																"#paycreditrecChk__"
																		+ prevReceiptID)
																.addClass(
																		"btn-danger");
													}
												}
											} catch (e) {
											}
										}

										$("#creditDisc").val(creditdisc);
										$("#recTotalcredit").html(recTotal);
										$("#creditRecCount")
												.val(
														receiptBean.listRecMaster.length);
									}, 200);
						}
						if (ty != 'prev') {
							// OPDbillDetails("pay", "opd");
						}
					} else if (billType == 'diagnosis') {

						if (type == 'cash') {
							$("#cashDivForRecMaster").html(
									ajaxResponseForRecMaster);
							count = 1;
							$("#receiptComp").setTemplate(receiptComp);
							$("#receiptComp").processTemplate(receiptBean);

							var recTotal = 0;
							for ( var i = 0; i < receiptBean.listRecMaster.length; i++) {
								recTotal = recTotal
										+ receiptBean.listRecMaster[i].pdAmt;
								cashdisc = cashdisc
										+ receiptBean.listRecMaster[i].onBilDis;
							}

							$("#cashDisc").val(cashdisc);
							$("#recTotal").html(recTotal);
							$("#cashRecCount").val(
									receiptBean.listRecMaster.length);

						} else if (type == 'credit') {
							$("#creditDivForRecMaster").html(
									ajaxResponseForRecMaster);
							if (receiptBean.listRecMaster.length > 0) {
								$("#credit_status").addClass("fa fa-star");
							}
							count = 1;
							$("#receiptCompcredit").setTemplate(
									receiptCompcredit);
							$("#receiptCompcredit")
									.processTemplate(receiptBean);

							setTimeout(
									function() {

										var recTotal = 0;
										for ( var i = 0; i < receiptBean.listRecMaster.length; i++) {

											recTotal = recTotal
													+ receiptBean.listRecMaster[i].pdAmt;
											creditdisc = creditdisc
													+ receiptBean.listRecMaster[i].onBilDis;
											try {

												for ( var j = 0; j < (receiptBean.listRecMaster[i].listOPDReceiptComponant.length); j++) {

													var cnameVar = "";
													cnameVar = (receiptBean.listRecMaster[i].listOPDReceiptComponant[j].cname);

													if ((cnameVar
															.indexOf(creditReceiptString)) === 0) {

														var prevReceiptID = ((cnameVar
																.split(creditReceiptString))[1])
																.trim();
														// paycreditrecChk__6274
														$(
																"#paycreditrecChk__"
																		+ prevReceiptID)
																.prop(
																		'disabled',
																		true);
														$(
																"#paycreditrecChk__"
																		+ prevReceiptID)
																.removeClass(
																		"btn-success");
														$(
																"#paycreditrecChk__"
																		+ prevReceiptID)
																.addClass(
																		"btn-danger");
													}
												}
											} catch (e) {
											}
										}
										$("#creditDisc").val(creditdisc);
										$("#recTotalcredit").html(recTotal);
										$("#creditRecCount")
												.val(
														receiptBean.listRecMaster.length);
									}, 200);
						}
						if (ty != 'prev') {
							// OPDbillDetails("pay", "diagnosis");
						}
					}
				}
			});
}

var opdReceiptCopmCon = '{#foreach $T.listOPDRecComp as listOPDRecComp}<tr id="{count}">	<td style="border-top: none; padding: 1px;" class="col-md-1-1">{count}</td>	<td style="border-top: none; padding: 1px;" class="col-md-3-1"		id="id=receName{count}">{$T.listOPDRecComp.cname}</td>	<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1"		id="recchr{count}">{$T.listOPDRecComp.crt}</td>	<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1"		id="recqty{count}">{$T.listOPDRecComp.cqt}</td>	<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1"		id="recAmt{count}">{$T.listOPDRecComp.camt}</td>	<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1"		onkeypress="return validateNumbers(event)"		onkeyup=onChangeDiscount({count},		"receipt"),calTotalDiscount({count},"receipt"),calNetAmtTotal({count},"receipt") id="recDisc{count}">{$T.listOPDRecComp.cdis}</td>	<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1"		id="recOlAmt{count}">{$T.listOPDRecComp.cnet}</td>	<td style="border-top: none; padding: 1px;"	class="numeric col-md-1-1 center"><input type="checkbox"		onClick="addReceiptComp({rowCount})" id="tdEdCheck{rowCount}"		name="checked" value="{$T.opd.id_opd_bill}" /> <i id="editRow"		type="button" class="fa fa-edit fa-1x" style="margin-left: 6px;cursor: pointer;"		onclick="editRows(this)"></i><i id="deleteRow" type="button"		style="margin-left: 6px;cursor: pointer;" class="fa fa-trash-o fa-1x"		onclick="deleteRows(this)"></i></td>	<input type="hidden" id="recCompId{count}"		value="{$T.listOPDRecComp.reccmpid}">	<input type="hidden" value="0" id="recmsg{count}" />	<input type="hidden" value="0" id="recitmType{count}" />	<input type="hidden" value="0" id="rectoid{count++}" /></tr>{#/for}';

var prevopdReceiptCopmCon = "{#foreach $T.listOPDRecComp as listOPDRecComp}<tr id='{count}'>	<td style='border-top: none; padding: 1px;' class='col-md-1-1'>{count}</td>	<td style='border-top: none; padding: 1px;' class='col-md-3-1'		id='tdEdPerticulars{count}'>{$T.listOPDRecComp.cname}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdRate{count}'>{$T.listOPDRecComp.crt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdQty{count}'>{$T.listOPDRecComp.cqt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdAmount{count}'>{$T.listOPDRecComp.camt}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdConcession{count}'>{$T.listOPDRecComp.cdis}</td>	<td style='border-top: none; padding: 1px;' class='numeric col-md-1-1'		id='tdEdPayable{count}'>{$T.listOPDRecComp.cnet}</td>	<td style='border-top: none; padding: 1px;'		class='numeric col-md-1-1 center'><input type='checkbox'		onClick='addReceiptComp({count})' id='tdEdCheck{count}' name='checked'		value='{$T.opd.id_opd_bill}' /> <i id='editRow' type='button'		class='fa fa-edit fa-1x' style='margin-left: 6px;cursor: pointer;'		onclick='editRows(this)'></i><i id='deleteRow' type='button'		style='margin-left: 6px;' class='fa fa-trash-o fa-1x'		onclick='deleteRows(this)'></i></td>	<input type='hidden' id='recCompId{count}'		value='{$T.listOPDRecComp.reccmpid}'>	<input type='hidden' value='0' id='recmsg{count}' />	<input type='hidden' value='0' id='recitmType{count}' />	<input type='hidden' value='0' id='rectoid{count++}' /></tr>{#/for}";

function getOPDReceiptComponant(receiptId, billType) {
	// var myObj=$("#hidDivForRecMaster").html();
	$("#ReceiptCheck").val("1");
	myArray = JSON.parse(ajaxResponseForRecMaster);
	// $("#modeofpay").setTemplate(opdbillreceiptforpayment);
	var k;
	for ( var i = 0; i < myArray.listRecMaster.length; i++) {
		k = i;
		if (myArray.listRecMaster[i].idrm == receiptId) {

			myObj1 = myArray.listRecMaster[i];
			recpID = myArray.listRecMaster[i].idrm;
			break;
		}
	}

	myObj = JSON.stringify(myObj1);
	userBean = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#receipNO").html(receiptId);
	var pageType = $("#pageType").html();

	if (pageType == 'opd') {
		$("#incDocNameRec").html(userBean.inCharge);
		$("#deptName").html(userBean.deptName);
	} else {
	}

	if (userBean.discName == "-Select-" || userBean.discName == "")
		$("#discName").html("No Discount");
	else
		$("#discName").html(userBean.discName);
	$("#txtRecAmount").val(userBean.total);
	$("#bdate").html(userBean.recDate);

	$("#txtDiscountRec").val(userBean.onBilDis);
	$("#txtTotalNetAmtRec").val(parseFloat(userBean.pdAmt).toFixed(2));
	$("#txtAmount").val(parseFloat(userBean.total).toFixed(2));
	$("#cashAmount").val(myArray.listRecMaster[k].cash_amt);
	$("#cardAmount").val(myArray.listRecMaster[k].card_amt);
	$("#cardNo").val(myArray.listRecMaster[k].card_no);
	$("#cardBankName").val(myArray.listRecMaster[k].bname);
	$("#ReceiptNarration").val(myArray.listRecMaster[k].narr);
	var modeofpay = myArray.listRecMaster[k].pay_mode;
	if (modeofpay == "cashNCard") {
		// $("#CheckBox1").attr('checked')=true;
		// $("#CheckBox2").attr('checked')=true;
		document.getElementById("CheckBox1").checked = true;
		document.getElementById("CheckBox2").checked = true;
		$("#cashamt").show();
		$("#nothing").show();
		$("#nothing1").show();
		$("#cardamt").show();
		$("#cardNum").show();
		$("#bankName").show();

	} else if (modeofpay == "cash") {
		document.getElementById("CheckBox1").checked = true;
		// var el = document.getElementById("show");

		// el.innerHTML = el.innerHTML.replace(/&nbsp;/g,'');
		// var abc=$("#cashAmount").val();
		// $("#cashamt").html(abc);
		$("#cashamt").show();
		$("#nothing").show();
		$("#nothing1").show();
	} else if (modeofpay == "card") {
		document.getElementById("CheckBox2").checked = true;
		document.getElementById("CheckBox1").checked = false;

		var el = document.getElementById("show");
		if (el != null)
			el.innerHTML = el.innerHTML.replace('', '&nbsp;');
		$("#cardamt").show();
		$("#cardNum").show();
		$("#bankName").show();

	}

	$("#finalTotal").val(parseFloat(userBean.pdAmt).toFixed(2));
	// $("#finalTotal").val("abc");
	var billID = $("opdBillId").html();

	var inputs = [];
	inputs.push('action=OPDReceiptComponant');
	inputs.push('billID=' + billID);
	inputs.push('receiptID=' + receiptId);
	inputs.push('callFrom=PrevBill');
	inputs.push('billType=' + billType);

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
			count = 1;
			ajaxResponseForRecComponant = r;

			receiptBeancomp = eval('(' + ajaxResponseForRecComponant + ')');
			if (billType == "OPDBill") {
				$("#OpdBillPrescription").setTemplate(opdReceiptCopmCon);
			} else {
				$("#OpdBillPrescription").setTemplate(opdReceiptCopmCon);
			}
			$("#OpdBillPrescription").processTemplate(receiptBeancomp);
			$("#RecRowCount").val(--count);
		}
	});
	test_skill_opdBill();
}

/** ******************* opd previous Bill end ******************* */
function getDiscountAmountForOPD() {

	var temp = $('select option:selected').text();
	if (temp == "-Select-")
		$("#discDiv").hide();
	else
		$("#discDiv").show();
	$("#discName").html(temp);
	setTimeout(function() {
		var dicountId = $("#SpecialDisc").val();
		var discountDetails = $("#SpecialDiscountDiv").html();

		var perAmt = 0;
		var disIn = "";
		discountDetails = eval('(' + discountDetails + ')');

		for ( var i = 0; i < discountDetails.sl.length; i++) {
			if (discountDetails.sl[i].si == dicountId) {
				disIn = discountDetails.sl[i].dsin;
				perAmt = discountDetails.sl[i].perAmt;
			}
		}

		if (disIn == "p") {
			var RowCount = $("#RowCount").val();
			for ( var j = 1; j <= RowCount; j++) {
				var rate = $("#chr" + j).val();
				var qty = $("#qty" + j).val();
				var temp = (perAmt / 100) * rate;
				$("#hiddenchr" + j).val(temp);
				$("#hiddenamt" + j).val((temp * qty));
				rate = (rate - temp);
				$("#chr" + j).val(rate);
				var total = (rate * qty);
				$("#amt" + j).val(total);
			}
			calTotalOPD(RowCount);
		}
	}, 500);
}

function getDiscountAmount() {
	TotalIPDBillDetails('pay');
	setTimeout(function() {
		var dicountId = $("#SpecialDisc").val();
		var discountDetails = $("#SpecialDiscountDiv").html();

		var perAmt = 0;
		var disIn = "";
		discountDetails = eval('(' + discountDetails + ')');

		for ( var i = 0; i < discountDetails.sl.length; i++) {
			if (discountDetails.sl[i].si == dicountId) {
				disIn = discountDetails.sl[i].dsin;
				perAmt = discountDetails.sl[i].perAmt;
			}
		}

		if (disIn == "p") {

			var HallCount = $("#HallCount").val();
			for ( var j = 1; j < HallCount; j++) {
				var rate = $("#hallchr" + j).val();
				var qty = $("#hallqty" + j).val();
				var temp = (perAmt / 100) * rate;
				$("#hiddenhallchr" + j).val(temp.toFixed(2));
				$("#hiddenhallamt" + j).val((temp * qty).toFixed(2));
				rate = (rate - temp).toFixed(2);
				$("#hallchr" + j).val(rate);
				var total = (rate * qty).toFixed(2);
				$("#hallamt" + j).val(total);
			}

			var operationCount = $("#operationCount").val();
			for ( var j = 1; j < operationCount; j++) {
				var rate = $("#operationchr" + j).val();
				var qty = $("#operationqty" + j).val();
				var temp = (perAmt / 100) * rate;
				$("#hiddenoperationchr" + j).val(temp.toFixed(2));
				$("#hiddenoperationamt" + j).val((temp * qty).toFixed(2));
				rate = (rate - temp).toFixed(2);
				$("#operationchr" + j).val(rate);
				var total = (rate * qty).toFixed(2);
				$("#operationamt" + j).val(total);
			}

			var surgeonCount = $("#surgeonCount").val();
			for ( var j = 1; j < surgeonCount; j++) {
				var rate = $("#surgeonchr" + j).val();
				var qty = $("#surgeonqty" + j).val();
				var temp = (perAmt / 100) * rate;
				$("#hiddensurgeonchr" + j).val(temp.toFixed(2));
				$("#hiddensurgeonamt" + j).val((temp * qty).toFixed(2));
				rate = (rate - temp).toFixed(2);
				$("#surgeonchr" + j).val(rate);
				var total = (rate * qty).toFixed(2);
				$("#surgeonamt" + j).val(total);
			}

			var consultCount = $("#consultCount").val();
			for ( var j = 1; j < consultCount; j++) {
				var rate = $("#consultchr" + j).val();
				var qty = $("#consultqty" + j).val();
				var temp = (perAmt / 100) * rate;
				$("#hiddenconsultchr" + j).val(temp.toFixed(2));
				$("#hiddenconsultamt" + j).val((temp * qty).toFixed(2));
				rate = (rate - temp).toFixed(2);
				$("#consultchr" + j).val(rate);
				var total = (rate * qty).toFixed(2);
				$("#consultamt" + j).val(total);
			}

			var testCount = $("#testCount").val();
			for ( var j = 1; j < testCount; j++) {
				var rate = $("#testchr" + j).val();
				var qty = $("#testqty" + j).val();
				var temp = (perAmt / 100) * rate;
				$("#hiddentestchr" + j).val(temp.toFixed(2));
				$("#hiddentestamt" + j).val((temp * qty).toFixed(2));
				rate = (rate - temp).toFixed(2);
				$("#testchr" + j).val(rate);
				var total = (rate * qty).toFixed(2);
				$("#testamt" + j).val(total);
			}

			var RowCount = $("#RowCount").val();
			for ( var j = 1; j < RowCount; j++) {
				var rate = $("#chr" + j).val();
				var qty = $("#qty" + j).val();
				var temp = (perAmt / 100) * rate;
				$("#hiddenchr" + j).val(temp.toFixed(2));
				$("#hiddenamt" + j).val((temp * qty).toFixed(2));
				rate = (rate - temp).toFixed(2);
				$("#chr" + j).val(rate);
				var total = (rate * qty).toFixed(2);
				$("#amt" + j).val(total);
			}

		} else if (disIn == "r") {

		} else {

		}
		calTotalForIPDAPOnload();
		calTotalForIPDHiddenFilled();
	}, 500);
}

function calTotalForIPDHiddenFilled() {

	var hallTotal = 0;
	var HallCount = $("#HallCount").val();
	for ( var k = 1; k < HallCount; k++) {
		var hallAmt = parseFloat($("#hiddenhallamt" + k).val());
		hallTotal = hallTotal + hallAmt;
	}

	var operationTotal = 0;
	var operationCount = $("#operationCount").val();
	for ( var k = 1; k < operationCount; k++) {
		var operationAmt = parseFloat($("#hiddenoperationamt" + k).val());
		operationTotal = operationTotal + operationAmt;
	}

	var surgeonTotal = 0;
	var surgeonCount = $("#surgeonCount").val();
	for ( var k = 1; k < surgeonCount; k++) {
		surgeonAmt = parseFloat($("#hiddensurgeonamt" + k).val());
		surgeonTotal = surgeonTotal + surgeonAmt;
	}

	var consultantTotal = 0;
	var consultCount = $("#consultCount").val();
	for ( var k = 1; k < consultCount; k++) {
		var consultantAmt = parseFloat($("#hiddenconsultamt" + k).val());
		consultantTotal = consultantTotal + consultantAmt;
	}

	var testTotal = 0;
	var testCount = $("#testCount").val();
	for ( var k = 1; k < testCount; k++) {
		var testAmt = parseFloat($("#hiddentestamt" + k).val());
		testTotal = testTotal + testAmt;
	}

	var rowCount = $("#RowCount").val();
	var tmp = 0;
	for ( var i = 1; i < rowCount; i++) {
		var x = parseFloat($("#hiddenamt" + i).val());
		tmp = tmp + x;
	}

	var total = hallTotal + operationTotal + surgeonTotal + consultantTotal
			+ testTotal + tmp;
	$("#hiddentxtTotal").val((total).toFixed(2));
	/*
	 * calPayable(); calRemaining(); calculareRefund();
	 */
}

function featchCarpoAccBillofPat() {
	count = 0;

	subsr = 1;
	physiotestcount = 1;
	testcount = 1;
	sr = 1;
	hallcount = 1;
	rowCount = 1;
	opcount = 1;
	consultcount = 1;
	surgeoncount = 1;
	matIpdcount = 1;
	matSurcount = 1;
	pathotestcount = 1;
	ipdservicescount = 1;
	instrumentscount = 1;
	bedsidecount = 1;
	theatercount = 1;
	var divPatId = $("#divPatId").html();
	myArray = JSON.parse(divPatId);
	$("#SpecialDisc").val(myArray.objBillMaster.sp_dic_master_id);
	var bmId = myArray.objBillMaster.id;

	var inputs = [];
	inputs.push('action=featchCarpoAccBillofPat');
	inputs.push('bmId=' + bmId);
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
					ajaxResponse = r;

					patientBean = eval('(' + ajaxResponse + ')');
					if (patientBean.bcs1.length == 0) {
						alert("Patient Bill not found.");
					} else {

						// for bed details
						$("#headDetails1")
								.setTemplate($("#hallDetails").html());
						$("#headDetails1").processTemplate(billBean.bcs1);

						// For relative bed charges
						$("#relativeBed")
								.setTemplate($("#RhallDetails").html());
						$("#relativeBed").processTemplate(billBean.bcs1);
						// for operation details

						$("#headDetails10").setTemplate(
								$("#operationDetails").html());
						$("#headDetails10").processTemplate(billBean.bcs1);

						// for Investigation Test details

						$("#headDetails2")
								.setTemplate($("#testDetails").html());
						$("#headDetails2").processTemplate(billBean.bcs1);

						// for Physiotherapy Test details

						$("#headDetails3").setTemplate(
								$("#physiotestDetails").html());
						$("#headDetails3").processTemplate(billBean.bcs1);

						// for Pathology Test details

						$("#headDetails4").setTemplate(
								$("#pathotestDetails").html());
						$("#headDetails4").processTemplate(billBean.bcs1);
						// for consulting/visiting doctor details
						$("#headDetails9").setTemplate(
								$("#consultDetails").html());
						$("#headDetails9").processTemplate(billBean.bcs1);

						// for material used in surgery

						$("#headDetails11").setTemplate(
								$("#matSurDetails").html());
						$("#headDetails11").processTemplate(billBean.bcs1);

						// for hospital material used

						$("#headDetails5").setTemplate(
								$("#matIpdDetails").html());
						$("#headDetails5").processTemplate(billBean.bcs1);

						// for Surgeon doctor details
						$("#headDetails13").setTemplate(
								$("#surgeonDetails").html());
						$("#headDetails13").processTemplate(billBean.bcs1);

						// gases and monitor

						$("#headDetails6").setTemplate(
								$("#ipdservicesDetails").html());
						$("#headDetails6").processTemplate(billBean.bcs1);

						// instruments
						$("#headDetails8").setTemplate(
								$("#instrumentsDetails").html());
						$("#headDetails8").processTemplate(billBean.bcs1);

						// bedside procedure
						$("#headDetails7").setTemplate(
								$("#bedsideDetails").html());
						$("#headDetails7").processTemplate(billBean.bcs1);

						// operation theater charges
						$("#headDetails12").setTemplate(
								$("#theaterDetails").html());
						$("#headDetails12").processTemplate(billBean.bcs1);

						var j = 1;
						for ( var i = 0; i < billBean.bcs1.length; i++) {

							if (billBean.bcs1[i].ct == "generalChrg") {

								$("#eName" + j).val(billBean.bcs1[i].nm);
								$("#msg" + j).val(billBean.bcs1[i].msg);
								$("#chr" + j).val(billBean.bcs1[i].rtca);
								$("#qty" + j).val(billBean.bcs1[i].msg);
								$("#amt" + j).val(billBean.bcs1[i].amtca);
								$("#headdate" + j).val(billBean.bcs1[i].dt);
								j++;
							} else if (billBean.bcs1[i].ct == "nursingChrg") {
								$("#nursingName").val(billBean.bcs1[i].nm);
								$("#nursingchr").val(billBean.bcs1[i].rtca);
								$("#nursingqty").val(billBean.bcs1[i].msg);
								$("#nursingamt").val(billBean.bcs1[i].amtca);
								$("#nursingdate").val(billBean.bcs1[i].dt);

							} else if (billBean.bcs1[i].ct == "postopChrg") {
								$("#postopName").val(billBean.bcs1[i].nm);
								$("#postopchr").val(billBean.bcs1[i].rtca);
								$("#postopqty").val(billBean.bcs1[i].msg);
								$("#postopamt").val(billBean.bcs1[i].amtca);
								$("#postopdate").val(billBean.bcs1[i].dt);

							}
						}
						var k = 1;
						// calTotalForIPDAPOnload();
						for ( var z = 0; z < billBean.bcs1.length; z++) {

							if (billBean.bcs1[z].ct == "operationChrg"
									&& billBean.bcs1[z].disComp != 0) {
								$("#doctorDiv").show();
								var old = $("#docDiscountDiv").html();

								$("#docDiscountDiv").setTemplate(
										$("#docDiscountDivtemp").html());
								$("#docDiscountDiv").processTemplate(
										billBean.bcs1[z]);
								$("#docDiscountDiv").prepend(old);
								k++;
							}
						}
						$("#docDisRowcount").val(k);
						var billList = billBean.bcs1[billBean.bcs1.length - 1];
						if (billList.bl[0] != "") {
							$("#txtTotal").val(
									parseFloat(billList.bl[0].ta).toFixed(2));
							$("#txtDiscount").val(parseInt(billList.bl[0].da));
							$("#txtPayable").val(parseInt(billList.bl[0].pay));
							$("#txtPaid").val(parseInt(billList.bl[0].pa));
							$("#txtRefund").val(parseInt(billList.bl[0].rfd));
							$("#txtRemaining").val(parseInt(billList.bl[0].ra));
							$("#txtHospitalDiscount").val(
									billList.bl[0].hospdis);
							$("#txtHospitalDiscountReason").val(
									billList.bl[0].hospnarr);
						}
						// calTotalForIPDAPOnload();
					}
				}
			});
}

function setServiceTax() {
	var xxx = $("#hospDetails").html();

	if (xxx == "") {
	} else {
		var hospDetails = eval('(' + xxx + ')');
		if ($("#pageName").val() == "patPreviousIPDBill") {
			var hosp = hospDetails.listHosDetail[0];
		} else {
			var hosp = hospDetails;
		}

		$("#txtserviceTax").val((hosp.serTax).toFixed(2));
		$("#hospName").html(hosp.hn);
		$("#hospAdd").html(hosp.ha + "-" + hosp.hz);
		$("#contact").html(hosp.hcon);
	}
	calculateServiceTax();
	calPayable();
}

/** ******************* ipd previous Bill start ******************* */

function goToIPDPrevBill(funtype, billtype) {
	count = 0;
	var byName = 0;
	var byId = 0;
	var searchBy;
	var value;
	if (funtype == "onload") {

		value = funtype;

	} else if (funtype == "search") {

		byName = $("#byName").val();
		byId = $("#byId").val();

		if (byName != "" && byId != "") {
			alert("please search either by patient Id or by Patient Name");
		} else if (byName == "" && byId == "") {
			alert("please insert something for search");
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
	}

	var inputs = [];
	inputs.push('action=featchPrevIPDBillPat');
	inputs.push('billType=' + billtype);
	inputs.push('searchBy=' + searchBy);
	inputs.push('billID=0');
	inputs.push('value=' + encodeURIComponent(value));
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
			$("#prevOPDBillObj").html(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');
			if (patientBean.pl.length == 0) {
				alert("Patient details not found.");
			} else {
				$("#container").setTemplate(opd_temp);
				$("#container").processTemplate(patientBean);

				var rowCount = $("#rowCount").val();

				for ( var i = 1; i <= rowCount; i++) {
					$("#patPreOPDBill" + i).hide();
				}
			}
		}
	});
}

function goToIPDPrevBill(billID, pid, tid) {
	var billType = $("#billType").val();
	var inputs = [];
	inputs.push('action=featchPrevIPDBillPat');
	inputs.push('billType=' + billType);

	inputs.push('billID=' + billID);
	inputs.push('searchBy=SingleBill');
	inputs.push('value=SingleBill');

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
			$("#prevOPDBillObj").html(ajaxResponse);
			myObj = eval('(' + ajaxResponse + ')');

			myObj = myObj.pl[0];

			var tit = myObj.tit;
			var fn = myObj.fn;
			var mn = myObj.mn;
			var ln = myObj.ln;
			var pname = tit + " " + fn + " " + mn + " " + ln;
			myObj = JSON.stringify(myObj);

			window.location.href = "patPreviousIPDBill.jsp?" + "divPatId="
					+ encodeURIComponent(myObj) + "&billID=" + billID
					+ "&billType=" + billType;

		}
	});

}

function goToIPDBill(billID, pid, tid) {
	var billType = $("#billType").val();
	var inputs = [];
	inputs.push('action=featchIPDBillPat');
	inputs.push('billType=' + billType);

	inputs.push('billID=' + billID);
	inputs.push('searchBy=SingleBill');
	inputs.push('value=SingleBill');

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
			$("#prevOPDBillObj").html(ajaxResponse);
			myObj = eval('(' + ajaxResponse + ')');

			myObj = myObj.pl[0];

			var tit = myObj.tit;
			var fn = myObj.fn;
			var mn = myObj.mn;
			var ln = myObj.ln;
			var pname = tit + " " + fn + " " + mn + " " + ln;
			myObj = JSON.stringify(myObj);
			if (billType == "general") {
				alert("In General");
				window.location.href = "preAuthorisation.jsp?"
						+ "divPatientId=" + encodeURIComponent(myObj)
						+ "&billID=" + billID;
			} else {
				alert("In else");
				window.location.href = "CorporateAccountBill.jsp?" + "myObj="
						+ encodeURIComponent(myObj) + "&billID=" + billID
						+ "&pname=" + pname + "&tid=" + tid;
			}
		}
	});
}

function test_skill_ipdBill() {
	var junkVal = $('#txtAmount').val();
	// $('#amountinno').html(junkVal);

	// $('#txtAmount').val(junkVal);

	junkVal = Math.floor(junkVal);
	var obStr = new String(junkVal);
	numReversed = obStr.split("");
	actnumber = numReversed.reverse();

	if (Number(junkVal) >= 0) {
		// do nothing
	} else {
		alert('wrong Number cannot be converted');
		return false;
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
}

function featchPreIPDBillofPat() {
	count = 0;

	subsr = 1;
	physiotestcount = 1;
	testcount = 1;
	sr = 1;
	hallcount = 1;
	rowCount = 1;
	opcount = 1;
	consultcount = 1;
	surgeoncount = 1;
	matIpdcount = 1;
	matSurcount = 1;
	pathotestcount = 1;
	ipdservicescount = 1;
	instrumentscount = 1;
	bedsidecount = 1;
	theatercount = 1;
	var divPatId = $("#divPatId").html();
	var billID = $("#billID").html();
	var tid = $("#tid").html();

	myArray = JSON.parse(divPatId);
	for ( var i = 0; i < myArray.liBM.length; i++) {
		if (myArray.liBM[i].id == billID) {
			$("#SpecialDisc").val(myArray.liBM[i].sp_dic_master_id);
		}
	}

	var bmId = billID;

	var inputs = [];
	inputs.push('action=featchPreIPDBillofPat');
	inputs.push('bmId=' + bmId);
	inputs.push('tid=' + tid);

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
					ajaxResponse = r;

					billBean = eval('(' + ajaxResponse + ')');
					if (billBean.bcs1.length == 0) {
						alert("Patient Bill not found.");
					} else {
						// for bed details
						$("#headDetails1")
								.setTemplate($("#hallDetails").html());
						$("#headDetails1").processTemplate(billBean.bcs1);

						// For relative bed charges
						$("#relativeBed")
								.setTemplate($("#RhallDetails").html());
						$("#relativeBed").processTemplate(billBean.bcs1);
						// for operation details

						$("#headDetails10").setTemplate(
								$("#operationDetails").html());
						$("#headDetails10").processTemplate(billBean.bcs1);

						// for Investigation Test details
						$("#headDetails2")
								.setTemplate($("#testDetails").html());
						$("#headDetails2").processTemplate(billBean.bcs1);

						// for Physiotherapy Test details
						$("#headDetails3").setTemplate(
								$("#physiotestDetails").html());
						$("#headDetails3").processTemplate(billBean.bcs1);

						// for Pathology Test details
						$("#headDetails4").setTemplate(
								$("#pathotestDetails").html());
						$("#headDetails4").processTemplate(billBean.bcs1);

						// for consulting/visiting doctor details
						$("#headDetails9").setTemplate(
								$("#consultDetails").html());
						$("#headDetails9").processTemplate(billBean.bcs1);

						// for material used in surgery
						$("#headDetails11").setTemplate(
								$("#matSurDetails").html());
						$("#headDetails11").processTemplate(billBean.bcs1);

						// for hospital material used
						$("#headDetails5").setTemplate(
								$("#matIpdDetails").html());
						$("#headDetails5").processTemplate(billBean.bcs1);

						// for Surgeon doctor details
						$("#headDetails13").setTemplate(
								$("#surgeonDetails").html());
						$("#headDetails13").processTemplate(billBean.bcs1);

						// gases and monitor
						$("#headDetails6").setTemplate(
								$("#ipdservicesDetails").html());
						$("#headDetails6").processTemplate(billBean.bcs1);

						// instruments
						$("#headDetails8").setTemplate(
								$("#instrumentsDetails").html());
						$("#headDetails8").processTemplate(billBean.bcs1);

						// bedside procedure
						$("#headDetails7").setTemplate(
								$("#bedsideDetails").html());
						$("#headDetails7").processTemplate(billBean.bcs1);

						// operation theater charges
						$("#headDetails12").setTemplate(
								$("#theaterDetails").html());
						$("#headDetails12").processTemplate(billBean.bcs1);

						var j = 1;
						for ( var i = 0; i < billBean.bcs1.length; i++) {

							if (billBean.bcs1[i].ct == "generalChrg") {

								$("#eName" + j).val(billBean.bcs1[i].nm);
								$("#msg" + j).val(billBean.bcs1[i].msg);
								$("#chr" + j).val(billBean.bcs1[i].rtca);
								$("#qty" + j).val(billBean.bcs1[i].msg);
								$("#amt" + j).val(billBean.bcs1[i].amtca);
								$("#headdate" + j).val(billBean.bcs1[i].dt);
								j++;
							} else if (billBean.bcs1[i].ct == "nursingChrg") {
								$("#nursingName").val(billBean.bcs1[i].nm);
								$("#nursingchr").val(billBean.bcs1[i].rtca);
								$("#nursingqty").val(billBean.bcs1[i].msg);
								$("#nursingamt").val(billBean.bcs1[i].amtca);
								$("#nursingdate").val(billBean.bcs1[i].dt);

							} else if (billBean.bcs1[i].ct == "postopChrg") {
								$("#postopName").val(billBean.bcs1[i].nm);
								$("#postopchr").val(billBean.bcs1[i].rtca);
								$("#postopqty").val(billBean.bcs1[i].msg);
								$("#postopamt").val(billBean.bcs1[i].amtca);
								$("#postopdate").val(billBean.bcs1[i].dt);
							}
						}

						var k = 1;
						// calTotalForIPDAPOnload();
						for ( var z = 0; z < billBean.bcs1.length; z++) {

							if (billBean.bcs1[z].ct == "operationChrg"
									&& billBean.bcs1[z].disComp != 0) {
								$("#doctorDiv").show();
								var old = $("#docDiscountDiv").html();

								$("#docDiscountDiv").setTemplate(
										$("#docDiscountDivtemp").html());
								$("#docDiscountDiv").processTemplate(
										billBean.bcs1[z]);
								$("#docDiscountDiv").prepend(old);
								k++;
							}
						}
						$("#docDisRowcount").val(k);
						var billList = billBean.bcs1[billBean.bcs1.length - 1];
						if (billList.bl[0] != "") {
							$("#txtTotal").val(
									parseFloat(billList.bl[0].ta).toFixed(2));
							$("#txtDiscount").val(parseInt(billList.bl[0].da));
							$("#txtPayable").val(parseInt(billList.bl[0].pay));
							$("#txtPaid").val(parseInt(billList.bl[0].pa));
							$("#txtRefund").val(parseInt(billList.bl[0].rfd));
							$("#txtRemaining").val(parseInt(billList.bl[0].ra));
							$("#txtHospitalDiscount").val(
									billList.bl[0].hospdis);
							$("#txtHospitalDiscountReason").val(
									billList.bl[0].hospnarr);

							if (billList.bl[0].isCredit != undefined) {
								var isCredit = billList.bl[0].isCredit;
								if (isCredit == 1) {
									$(
											'input:radio[name=billPrintType][value=credit]')
											.prop('checked', true);
								} else {
									$(
											'input:radio[name=billPrintType][value=general]')
											.prop('checked', true);
								}
							}
						}
						// calTotalForIPDAPOnload();
					}
				}
			});
}

/** ******************* ipd previous Bill sta ******************* */

/** ********************Start Med Clinic Invoice ******************************** */

var medInvoiceTemp = "{#foreach $T.limci as limci}"
		+ "<tr id='tr{rowCount}'>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<input type='text' name='' class='form-control input-SmallText TextFont' id='invdt{rowCount}' value='{$T.limci.invdt}' "
		+ "onclick=displayCalendar(document.getElementById('invdt{rowCount}'),'dd/mm/yyyy',this)  readonly='readonly' /></td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>"
		+ "<input type='text' name='' class='form-control input-SmallText TextFont' id='nm{rowCount}' value='{$T.limci.nm}'  /> </td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;'>"
		+ "<input type='text' name='textfield' class='form-control input-SmallText TextFont' id='invno{rowCount}' value='{$T.limci.invno}' /> </td>"
		+ "<td class='col-md-2-1 center' style=height: 21.5px;'>"
		+ "<input class='form-control input-SmallText TextFont' type='text' id='invamt{rowCount}' value='{$T.limci.invamt}' /> </td>"
		+ "<td class='col-md-2-1 center' style='height: 21.5px;' id='svbynm{rowCount}' >{$T.limci.svbynm}"
		+ "<input type='hidden'	value='{$T.limci.svby}' id='svbyid{rowCount}'/> </td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<input type='checkbox' value='{$T.limci.idmci}' name='checkbox{rowCount}' id='checkbox{rowCount}' class='editUserAccess' disabled='disabled'/></td>"
		+ "<input type='hidden'	value='{rowCount++}' id='txtRowCount' name='txtRowCount'/>"
		+ "<input type='hidden'	value='{$T.limci.idmci}' id='idmci{k++}'/> {#/for} </tr>"
		+ "<input type='hidden' value='' id='addRowCount' /><input type='hidden'	value='{--rowCount}' id='RowCount'/> ";

function setMedInvoiceTemp() {
	count = 1;
	rowCount = 1;

	var patobj = $("#patobj").html();
	patobj = eval('(' + patobj + ')');

	var inputs = [];
	inputs.push('action=FeatchMedInvoiceforPat');
	inputs.push('trid=' + patobj.trid);
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
			$("#mciInfo").html(ajaxResponse);

			sampleBean = eval('(' + ajaxResponse + ')');
			$("#chequeContent").setTemplate(medInvoiceTemp);
			$("#chequeContent").processTemplate(sampleBean);
		}
	});

}

function toRmvDivMed(RowCount) {

	var allVals = [];
	// var allValsinvno = [];
	var rwcnt = $("#RowCount").val();
	var patobj = $("#patobj").html();
	patobj = eval('(' + patobj + ')');

	// var trid = patobj.trid;
	for ( var u = 1; u <= rwcnt; u++) {

		var $radios = $('input:checkbox[id=checkbox' + u + ']');
		if ($radios.is(':checked') == true) {
			var invno = $("#invno" + u).val()
			if ($.trim($("#checkbox" + u).val()) != 0) {
				// allValsinvno.push(invno);
				allVals.push($.trim($("#checkbox" + u).val()));
			}
		}
	}

	if (allVals.length != 0) {

		var inputs = [];
		inputs.push('action=DeleteMedBillRec');
		inputs.push('allVals=' + allVals);
		// inputs.push('allValsinvno=' + allValsinvno);
		// inputs.push('trid=' + trid);
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
			}
		});
	}

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var p = 1;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#tr" + p + "").remove();
		}
		p++;
	}
	window.location.reload();
}

function saveMedClinicDetail() {

	var patobj = $("#patobj").html();
	patobj = eval('(' + patobj + ')');

	var trid = patobj.trid;
	var opcharge = {
		limci : []
	};

	var RowCount = $("#RowCount").val();
	if (RowCount == 0) {
		alert("Please Add Row to Insert Pharmacy Invoice Details.");
		return false;
	}

	for ( var k = 1; k <= RowCount; k++) {

		var idmci = $.trim($("#checkbox" + k).val());
		var invamt = $.trim($("#invamt" + k).val());
		var invdt = $("#invdt" + k).val();
		var invno = $.trim($("#invno" + k).val());
		var nm = $.trim($("#nm" + k).val());
		var svby = $("#svbyid" + k).val();

		var pattern = /^[0-9]+\.?[0-9]*$/;
		if (!pattern.test(invamt)) {
			alert("Invoice amount should be of digits only!");
			$("#invamt" + k).focus();
			return false;
		}

		if (invdt == "" || nm == "" || invno == "" || invamt == "") {

			alert("Please Enter All Value In Row :" + k);
			return false;

		} else {

			opcharge.limci.push({
				"idmci" : idmci,
				"invamt" : invamt,
				"invdt" : invdt,
				"invno" : invno,
				"nm" : nm,
				"svby" : svby,
				"trid" : trid,
			});
		}
	}
	opcharge = JSON.stringify(opcharge);

	var inputs = [];
	inputs.push('action=SaveMedClinicDetail');
	inputs.push('opcharge=' + opcharge);

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
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			location.reload();
		}
	});

}

var w = 1;
var sr = 1;
function toCreateMedDiv(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	// alert(rowCount);
	rowCount++;
	divId = "tr" + rowCount;
	// alert(DRRDiv);
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	/*
	 * x.setAttribute('style', 'width: 100%; height: 28px; border-bottom: 1px
	 * solid #069;');
	 */

	document.getElementById("chequeContent").appendChild(x);

	document.getElementById(divId).innerHTML = '<td class="col-md-1-1 center" style="height: 21.5px;">'
			+ rowCount
			+ '</td><td class="col-md-1-1 center" style="height: 21.5px;"><input type="text"  class="form-control input-SmallText TextFont" readonly="readonly" name="invdt'
			+ rowCount
			+ '" onclick="displayCalendar(document.getElementById(\'invdt'
			+ rowCount
			+ '\'),\'dd/mm/yyyy\',this)'
			+ '" id="invdt'
			+ rowCount
			+ '" >  </td><td class="col-md-2-1 center" style="height: 21.5px;"><input class="form-control input-SmallText TextFont" type="text"  id="nm'
			+ rowCount
			+ '" /> </td><td class="col-md-2-1 center" style="height: 21.5px;"><input class="form-control input-SmallText TextFont" type="text"  id="invno'
			+ rowCount
			+ '" /> </td><td class="col-md-2-1 center" style="height: 21.5px;"><input class="form-control input-SmallText TextFont" type="text" id="invamt'
			+ rowCount
			+ '" onkeypress="return validateNumbers(event)" /> </td><td class="col-md-2-1 center" style="height: 21.5px;"><label id="sg'
			+ rowCount
			+ '" > </label>'
			+ $("#docNm").html()
			+ ' <input type="hidden"	value="'
			+ $("#docId").html()
			+ '" id="svbyid'
			+ rowCount
			+ '"/> </td><td class="col-md-1-1 center" style="height: 21.5px;"><input value="0" type="checkbox"    value="{$T.cl.cid}" name="checkbox'
			+ rowCount + '" id="checkbox' + rowCount + '"/></td> </tr>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(w);

	w++;
}

/** **********************End Med Clinic Invoice ******************************* */
var treEnd;

/** Payment Mode Option* */
function validateCardAmount() {

	var recTotal = $("#finalTotal").val();
	var cashAmount = $("#cashAmount").val();
	cardAmount = recTotal - cashAmount;

	var $checkbox1 = $('input:checkbox[id=CheckBox1]');
	var $checkbox2 = $('input:checkbox[id=CheckBox2]');
	if ($checkbox1.is(':checked') == true && $checkbox2.is(':checked') == true) {
		var cardAmtFilled = parseFloat($.trim($("#cardAmount").val()));

		var Total = $.trim($("#finalTotal").val());

		if (cardAmtFilled <= recTotal)
			var cashAmtFilled = parseFloat(($.trim((recTotal - cardAmtFilled))));
		else
			var cashAmtFilled = 0;

		var sum = parseFloat($.trim((cashAmtFilled + cardAmtFilled)));
		$("#cashAmount").val(cashAmtFilled);
		if ((parseFloat(sum) > parseFloat(Total)) || (parseFloat((sum)) < 0)) {
			// var keycode = (key.which) ? key.which : key.keyCode;
			// if ((keycode ==8 || keycode == 46))
			// return false;
			alert("The amount you have entered is greater than the total bill, please re-enter!!");
			$("#cashAmount").val(0);
			return false;
		}

		$("#cashAmount").val(cashAmtFilled);
	} else if ($checkbox2.is(':checked') == true
			&& $checkbox1.is(':checked') == false) {
		var Total = $.trim($("#finalTotal").val());
		var cardAmtFilled = $.trim($("#cardAmount").val());
		setTimeout(function() {
			if (parseFloat(cardAmtFilled) > parseFloat(Total)
					&& parseFloat(cardAmtFilled) != 0) {
				alert("Please enter lesser amount!!");
				return false;
			}

		}, 500);
	}
}

function validateCashAmount() {

	var recTotal = $("#finalTotal").val();
	var cardAmount = $("#cardAmount").val();
	cashAmount = recTotal - cardAmount;
	var $checkbox1 = $('input:checkbox[id=CheckBox1]');
	var $checkbox2 = $('input:checkbox[id=CheckBox2]');
	if ($checkbox1.is(':checked') == true && $checkbox2.is(':checked') == true) {
		var cashFilled = $("#cashAmount").val();
		var Total = 0;
		Total = $("#finalTotal").val();

		var cardAmountFilled = (recTotal - cashFilled);

		if (((cardAmountFilled) > Total) || (cardAmountFilled < 0)) {
			alert("The amount you have entered is greater than the total bill, please re-enter!!");
			$("#cardAmount").val(0);
			return false;
		}
		$("#cardAmount").val(cardAmountFilled);
	} else if ($checkbox1.is(':checked') == true
			&& $checkbox2.is(':checked') == false) {
		var Total = $("#finalTotal").val();
		var cashFilled = $("#cashAmount").val();
		setTimeout(function() {
			if (cashFilled > Total && cashFilled != 0) {
				alert("Please enter lesser amount!!");
				return false;
			}
		}, 500);
	}
}

function ipdvalidateCardAmount() {

	var recTotal = $("#txtAmount").val();
	var cashAmount = $("#cashAmount").val();
	cardAmount = recTotal - cashAmount;
	var $checkbox1 = $('input:checkbox[id=CheckBox1]');
	var $checkbox2 = $('input:checkbox[id=CheckBox2]');
	if ($checkbox1.is(':checked') == true && $checkbox2.is(':checked') == true) {
		var cardAmtFilled = $("#cardAmount").val();

		var Total = $("#txtAmount").val();

		var cashAmtFilled = (recTotal - cardAmtFilled);

		if (((cashAmtFilled) > Total) || (cashAmtFilled < 0)) {
			alert("The amount you have entered is greater than the total bill, please re-enter!!");
			$("#cashAmount").val(0);
			$("#cardAmount").val(0);
			return false;
		}

		$("#cashAmount").val(cashAmtFilled);
	} else if ($checkbox2.is(':checked') == true
			&& $checkbox1.is(':checked') == false) {
		var Total = $("#txtAmount").val();
		var cardAmtFilled = $("#cardAmount").val();
		setTimeout(function() {
			if (parseFloat(cardAmtFilled) > Total
					&& parseFloat(cardAmtFilled) != 0) {

				alert("Please enter lesser amount!!");
				$("#cardAmount").val("");
				return false;
			}

		}, 500);

	}
}
function ipdvalidateCashAmount() {

	var recTotal = $("#txtAmount").val();
	var cardAmount = $("#cardAmount").val();
	cashAmount = recTotal - cardAmount;
	var $checkbox1 = $('input:checkbox[id=CheckBox1]');
	var $checkbox2 = $('input:checkbox[id=CheckBox2]');
	if ($checkbox1.is(':checked') == true && $checkbox2.is(':checked') == true) {
		var cashFilled = $("#cashAmount").val();
		var Total = 0;
		Total = $("#txtAmount").val();

		var cardAmountFilled = (recTotal - cashFilled);

		if (((cardAmountFilled) > Total) || (cardAmountFilled < 0)) {
			alert("The amount you have entered is greater than the total bill, please re-enter!!");
			$("#cashAmount").val(0);
			$("#cardAmount").val(0);
			return false;
		}
		$("#cardAmount").val(cardAmountFilled);
	} else if ($checkbox1.is(':checked') == true
			&& $checkbox2.is(':checked') == false) {
		var Total = $("#txtAmount").val();
		var cashFilled = $("#cashAmount").val();
		setTimeout(function() {
			if (parseFloat(cashFilled) > parseFloat(Total)) {
				alert("Please enter lesser amount!!");
				$("#cashAmount").val('');
				return false;
			}
		}, 500);
	}
}

function calcNetAmt(row) {
	var rate = parseFloat($("#chr" + row).val());
	var qty = parseFloat($("#qty" + row).val());
	var dis = parseFloat($("#discount" + row).val());

	var tot = (rate * qty) - dis;

	$("#netAmt").val(tot);

	calNetAmtTotal(row, 'bill');
}

function viewAdvanced(count) {
	var i = count - 1;
	$("#cashAmount").val(0);
	$("#cardAmount").val(0);
	$("#cardNo").val("");
	$("#cardBankName").val("");
	$("#paymentModeDiv").show();
	var receiptNo = $("#rec_no" + count).val();
	var date = $("#date" + count).val();
	document.getElementById("CheckBox1").checked = false;
	document.getElementById("CheckBox2").checked = false;

	if (receiptNo == billBean1.baali[i].baaid) {

		var modeofpay = billBean1.baali[i].opdbilllist[0].pay_mode;

		$("#seltowards").val($("#heading" + count).val());

		if (modeofpay == "cashNCard") {

			document.getElementById("CheckBox1").checked = true;
			document.getElementById("CheckBox2").checked = true;
			$("#cashAmount").val($("#cash" + count).val());
			$("#nothing").show();
			$("#nothing1").show();
			$("#cardAmount").val($("#card" + count).val());
			$("#cardNo").val(billBean1.baali[i].opdbilllist[0].card_no);
			$("#cardBankName").val(billBean1.baali[i].opdbilllist[0].bname);
		} else if (modeofpay == "cash") {
			document.getElementById("CheckBox1").checked = true;
			var el = document.getElementById("show");
			el.innerHTML.replace(/&nbsp;/g, '');
			abc = $("#cash" + count).val();

			$("#cashAmount").val(abc);
			$("#nothing").show();
			$("#nothing1").show();
			$("#cardNo").val("");
		} else if (modeofpay == "card") {
			document.getElementById("CheckBox2").checked = true;
			document.getElementById("CheckBox1").checked = false;
			var el = document.getElementById("show");
			el.innerHTML = el.innerHTML.replace('', '&nbsp;');
			$("#cardAmount").val($("#card" + count).val());
			$("#cardNo").val(billBean1.baali[i].opdbilllist[0].card_no);
			$("#cardBankName").val(billBean1.baali[i].opdbilllist[0].bname);
		}
	} else {

	}
}

function checkName(name, chr, qty, count) {
	var textname = "#" + name + count;
	var textchr = "#" + chr + count;
	var textqty = "#" + qty + count;
	var textName = $(textname).val();
	if (textName == "" || textName == undefined) {
		alert("Please Insert Name of the Item");
		$(textchr).val("");
		$(textqty).val("");
		return false;
	}
}

var convertToIPdFlag = 0;
function ConvertToIpd() {
	var r = confirm("You Want To convert patient to IPD?");
	if (r == true) {
		convertToIPdFlag = 1;

		var flag = true;
		flag = closeTreatment('OPD');

		if (flag) {
			var pi = document.getElementById("patient_id").value;

			setTimeout(function() {
				window.location = "VisitingPatientDatabase.jsp";

				setVisitingPatientDetails(pi);
				convertToIPdFlag = 0;
			}, 500);
		}
	}
}
/** End Manual Bill**** */
/** New Billing* */

function setParticularDetails() {
	var serviceHeading = $("#serviceHeading").val();
	setTimeout(function() {
		if (serviceHeading == "pathology" || serviceHeading == "gasesMonitor"
				|| serviceHeading == "gasesMonitorb") {

			var itemName = $("#particulars").val();
			var itemNameArr = itemName.split("_");
			if (itemNameArr[1] == undefined) {
				alert("Please Enter Valid Test...");
				$("#particulars").val("");
				return false;
			} else {
				$("#particulars").val(itemNameArr[0]);
				$("#itemid").val(itemNameArr[1]);
				$("#particularRate").val(itemNameArr[2]);
				$("#particularqty").val(1);
				$("#particularamt").val(itemNameArr[2]);
				$("#pathotestType").val(itemNameArr[3]);
			}
		} else {
			var itemName = $("#particulars").val();
			var itemNameArr = itemName.split("_");
			if (itemNameArr[1] == undefined) {
				alert("Please Enter Valid Test...");
				$("#particulars").val("");
				return false;
			} else {
				$("#particulars").val(itemNameArr[0]);
				$("#itemid").val(itemNameArr[1]);
				$("#particularRate").val(itemNameArr[2]);
				$("#particularqty").val(1);
				$("#particularamt").val(itemNameArr[2]);
			}
		}
		$("#particulardisc").val(0);
		$("#particularPay").val(0);
		calculatePerticularCoPay();

	}, 500);
}

/* on select of service heading reset all other fields */
function resetFieldsForOpd() {
	$('#particulars').val('');
	$('#particularRate').val('');
	$('#particularqty').val('');
	$('#particularamt').val('');
	$('#particularConcession').val('');
	$('#particularPayable').val('');
}

function setOpdParticularAutosugession(type) {

	$('#itemid').val('0');

	var resultData = [];

	var corporateId = '0';// $("#SpecialDisc").val();
	var hallid = 0;
	var data = $("#serviceHeading").val();
	if (data == 0) {
		$(".typeahead").html("");
		return false;
	}
	var autoType;
	var auto;
	if (data == "productName") {
		data = "ipdConsumable";
		auto = 'ipdBill';
	} else if (data == "physiotherapy") {
		data = "physiotherapy";
		auto = 'ipdBill';
	} else if (data == "OtherServices") {
		data = "OtherServices";
		auto = 'ipdBill';
	} else if (data == "instruments") {
		data = "instruments";
		auto = 'ipdBill';
		autoType = 'b';
	} else if (data == "pathology") {
		data = "pathology";
		letter = $("#particulars").val();
		auto = 'ipdBill';
		autoType = 'b';
		document.getElementById("particulars").disabled = false;
		document.getElementById("particularRate").disabled = false;
		document.getElementById("particularqty").disabled = false;
		document.getElementById("particularConcession").disabled = false;
		$("#saveParticularBtn").show();
	} else if (data == "investigation") {
		data = "investigation";
		letter = $("#particulars").val();
		auto = 'ipdBill';
		autoType = 'c';
		document.getElementById("particulars").disabled = false;
		document.getElementById("particularRate").disabled = false;
		document.getElementById("particularqty").disabled = false;
		document.getElementById("particularConcession").disabled = false;
		$("#saveParticularBtn").show();
	} else if (data == "radiologyTest") {
		data = "radiologyTest";
		letter = $("#particulars").val();
		auto = 'ipdBill';
		autoType = 'r';
	} else if (data == "CasualityServices") {
		data = "CasualityServices";
		letter = $("#particulars").val();
		auto = 'ipdBill';
		autoType = 'r';
		document.getElementById("particulars").disabled = false;
		document.getElementById("particularRate").disabled = false;
		document.getElementById("particularqty").disabled = false;
		document.getElementById("particularConcession").disabled = false;
		$("#saveParticularBtn").show();
	} else if (data == "-select-") {
		alert("Please select service Heading..");
		newTestAssign();
	} else if (data == "regCharges") {
		document.getElementById("particulars").disabled = true;
		document.getElementById("particularRate").disabled = true;
		document.getElementById("particularqty").disabled = true;
		document.getElementById("particularConcession").disabled = true;
		$("#saveParticularBtn").hide();
		return false;
	} else if (data == "Doc") {
		document.getElementById("particulars").disabled = true;
		document.getElementById("particularRate").disabled = true;
		document.getElementById("particularqty").disabled = true;
		document.getElementById("particularConcession").disabled = true;
		$("#saveParticularBtn").hide();
		return false;
	} else if (data == "mlcCharges") {
		document.getElementById("particulars").disabled = true;
		document.getElementById("particularRate").disabled = true;
		document.getElementById("particularqty").disabled = true;
		document.getElementById("particularConcession").disabled = true;
		$("#saveParticularBtn").hide();
		return false;
	} else if (data == "consumable") {
		document.getElementById("particulars").disabled = true;
		document.getElementById("particularRate").disabled = true;
		document.getElementById("particularqty").disabled = true;
		document.getElementById("particularConcession").disabled = false;
		$("#saveParticularBtn").hide();
		return false;
	}// @modifiedby:Touheed, @modified Date:08-Jan-2016 (For radiation
	// autosuggetion)
	else if (data == "radiation") {
		data = "radiation";
		letter = $("#particulars").val();
		auto = 'ipdBill';
		autoType = 'c';
		document.getElementById("particulars").disabled = false;
		document.getElementById("particularRate").disabled = false;
		document.getElementById("particularqty").disabled = false;
		document.getElementById("particularConcession").disabled = false;
		$("#saveParticularBtn").show();
	} else {
		auto = 'ipdBill';
	}
	var findingName = $("#particulars").val();
	var inputs = [];
	inputs.push('auto=' + auto);
	inputs.push('data=' + data);
	inputs.push('letter=' + findingName);
	inputs.push('autoType=' + autoType);
	inputs.push('hallid=' + hallid);
	inputs.push('corporateId=' + corporateId);
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
						var idValue = (arrValue[1] + "@#@" + arrValue[2]
								+ "@#@" + arrValue[3]);
						resultData.push({
							ID : idValue,
							Name : arrValue[0]
						});

						template = template
								+ '<li data-value="'
								+ (arrValue[1] + "@#@" + arrValue[2] + "@#@" + arrValue[3])
								+ '" class=""><a href="#">' + arrValue[0]
								+ '</a></li>';

					}

					$(".typeahead").html(template);

					if (type != "onChange") {
						$(".typeahead").show();
					}

					setTimeout(
							function() {
								$('#particulars').typeahead({
									source : resultData,
									displayField : 'Name',
									valueField : 'ID',
									onSelect : displayResult,
									scrollBar : true
								});
								$("#particulars").data('typeahead').source = resultData;
							}, 0);
				}
			});

	function displayResult(item) {
		
		$("#particulars").data('typeahead').source = null;
	
		var arrItem = (item.value).split("@#@");

		var serviceHeading = $("#serviceHeading").val();
		if (serviceHeading == "investigation"
				|| serviceHeading == "physiotherapy"
				|| serviceHeading == "OtherServices") {

			if (item.text == undefined) {
				alert("Please Enter Valid Test...");
				$("#particulars").val("");
				return false;
			} else {
				var charges = (arrItem[1]).split("---");
				$("#itemid").val(arrItem[0]);
				$("#particularRate").val(charges[0]);
				$("#particularqty").val(1);
				$("#particularamt").val(charges[0]);
				$("#pathotestType").val(arrItem[2]);
			}
		} else if (serviceHeading == "pathology") {

			if (item.text == undefined) {
				alert("Please Enter Valid Test...");
				$("#particulars").val("");
				return false;
			} else {
				var charges = (arrItem[2]).split("---");
				$("#itemid").val(arrItem[0]);
				$("#particularRate").val(arrItem[1]);
				$("#particularqty").val(1);
				$("#particularamt").val(arrItem[1]);
				$("#msgOpd").val(charges[0]);
			}
		} else {
			if (item.text == undefined) {
				alert("Please Enter Valid Test...");
				$("#particulars").val("");
				return false;
			} else {
				$("#itemid").val(arrItem[0]);
				$("#particularRate").val(arrItem[1]);
				$("#particularqty").val(1);
				$("#particularamt").val(arrItem[1]);
			}
		}
		$("#particularConcession").val(0);
		calOpdPayable();
	}
}

function calOpdPayable() {
	setTimeout(function() {
		var con = parseFloat($("#particularConcession").val());
		var payable = parseFloat($("#particularamt").val());
		if (payable >= con) {
			payable = payable - con;
			$("#particularPayable").val(payable);
		} else {

			$("#particularConcession").val(0);
			$("#particularPayable").val(payable);
		}
	}, 500);
}

function onClickRate() {
	var rate1 = $("#particularRate").val();
	var amnt = $("#particularamt").val();

	if (amnt == "NaN") {
		$("#particularamt").val(0);
	}
	if (rate1 == "" || rate1 == "NaN") {

		$("#particularamt").val(0);
		$("#particularPayable").val(0);
		return false;
	} else {
		var rate = parseFloat($("#particularRate").val());
		var qty = parseFloat($("#particularqty").val());
		$("#particularamt").val(rate * qty)
		var payable = parseFloat($("#particularamt").val());
		var con = parseFloat($("#particularConcession").val());
		if ((rate > 0) && (qty > 0)) {
			payable = payable - con;
			$("#particularPayable").val(payable);
		} else {
			type = $("#particular_type").val();
			if (rate <= 0 || rate.equals("")) {
				if (type == 'Doc') {
					$("#particularRate").val(0);
					$("#particularqty").val(0);
					$("#particularPayable").val(0);
				} else {
					$("#particularRate").val(1);
					$("#particularPayable").val(1);
					alert("Concession should be less than Payable...");
				}

			} else if (qty <= 0 || qty.equals("")) {
				$("#particularqty").val(1);
				$("#particularPayable").val(1);
				alert("Concession should be less than Payable...");
			}
		}
	}
}

function saveOpdBillParticular() {

	document.getElementById("particulars").disabled = false;
	document.getElementById("particularqty").disabled = false;
	document.getElementById("serviceHeading").disabled = false;

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var ti = pobj1.trid;
	var rowId = $('#rowId').val();
	var serviceHeading;
	var itemid;
	var particularName;
	var particularRate;
	var particularqty;
	var particularamt;
	var particularConcession;
	var particularPayable;
	var particularIdOpdBill;
	var particularBillFlag;
	var particularStatus;
	var particularMsg;
	var particularBillTypeFlag;
	var billType;
	if (($('#DocRegCharges').val() == 'Doc')
			|| ($('#DocRegCharges').val() == 'regCharges')
			|| ($('#serviceHeading').text() != '-select-')) {

		if (($('#DocRegCharges').val() == 'Doc')
				|| ($('#DocRegCharges').val() == 'regCharges')) {
			serviceHeading = $("#DocRegCharges").val();
		} else {
			serviceHeading = $("#serviceHeading").val();
		}

		itemid = ($("#itemid").val()).trim();
		particularName = ($("#particulars").val()).trim();
		particularRate = $("#particularRate").val();
		particularqty = $("#particularqty").val();
		particularamt = $("#particularamt").val();
		particularConcession = $("#particularConcession").val();
		particularPayable = $("#particularPayable").val();
		particularIdOpdBill = $("#idOpdBill").val();
		particularBillFlag = $("#particularqty").val();
		particularStatus = $("#statusOpd").val();
		particularMsg = $("#msgOpd").val();
		particularBillTypeFlag = $("#billFlag").val();
		billType = $('#billType').val();

		if (particularName == "") {
			alert("Please Enter Particulars Name");
			return false;
		} else if (itemid == "") {
			alert("Please Enter valid Particulars Name");
			newTestAssign();
			return false;
		} else if (itemid == "0") {
			if ((serviceHeading != "Doc") && (serviceHeading != "mlcCharges")
					&& (serviceHeading != "regCharges")) {
				alert("Please Enter valid Particulars Name...");
				newTestAssign();
				return false;
			}
		} else if (particularRate == "") {
			alert("Please Enter Particulars Rate");
			return false;
		} else if (particularqty == "" || particularqty == 0
				|| particularqty == "0") {
			alert("Please Enter Particulars Quantity");
			return false;
		} else if (particularamt == "") {
			alert("Please Enter Particulars Amount");
			return false;
		} else if (particularConcession == "") {
			alert("Please Enter Particulars Concession");
			return false;
		} else if (particularPayable == "") {
			alert("Please Enter Particulars Payable Amount");
			return false;
		}
		$("#tdEdCheck" + ti).attr("disabled", false);

	} else {
		if (serviceHeading == "-select-") {
			alert("Please Select Service Heading");
			newTestAssign();
			return false;
		}
	}
	/*
	 * var ipdBillSlaveTbId = $("#ipdBillSlaveTbId").val(); var ipdBillId =
	 * $("#ipdBillId").val(); var pathotestType = $("#pathotestType").val();
	 */
	var inputs = [];
	inputs.push('action=SaveOpdBillParticular');
	inputs.push('serviceHeading=' + serviceHeading);
	inputs.push('itemid=' + itemid);
	inputs.push('particular=' + particularName);
	inputs.push('particularRate=' + particularRate);
	inputs.push('particularqty=' + particularqty);
	inputs.push('particularamt=' + particularamt);
	inputs.push('particularConcession=' + particularConcession);
	inputs.push('particularPayable=' + particularPayable);
	inputs.push('trid=' + ti);
	inputs.push('billType=' + billType);
	inputs.push('particularBillFlag=' + particularBillFlag);
	inputs.push('particularStatus=' + particularStatus);
	inputs.push('particularMsg=' + particularMsg);
	inputs.push('particularBillTypeFlag=' + particularBillTypeFlag);
	inputs.push('particularIdOpdBill=' + particularIdOpdBill);
	inputs.push('callFrom=' + 'saveFun');
	inputs.push('querytype=' + $("#pQuerytype").val());
	/*
	 * inputs.push('ipdBillSlaveTbId=' + ipdBillSlaveTbId);
	 * inputs.push('ipdBillId=' + ipdBillId); inputs.push('pathotestType=' +
	 * pathotestType);
	 */
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 5000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if (billType == "opd") {
				OPDbillDetails("pay", "opd");
				newTestAssign();
				// fetchPreviousPendingToDeductAP("opd");
			} else {
				OPDbillDetails("pay", "diagnosis");
				newTestAssign();

				// setTimeout(function() {
				// fetchPreviousPendingToDeductAP("diagnosis");
				// }, 600);
			}
		}
	});
	setNewReceipt();
}

// End For OPD Bill Test

/** End Billing* */

// @modified by:Touheed @modified Date:11-Jan-2016
function addReceiptComp(rCount) {

	document.getElementById("manage").disabled = false;
	// @modified by:Touheed @modified Date:11-Jan-2016 (for Radiation
	// validation) #Start
	var rows = $('#tblPets tr').length;
	var testTypeChk = $("#testType" + rCount).val();
	var perticulerChk = $("#tdEdPerticulars" + rCount).html();

	if (rows >= 1) {
		if (testTypeChk == "radiation") {
			alert("Please uncheck '" + perticulerChk
					+ "' Radiation,Beacause 1 Radiation at only 1 time!");
			return false;
		}
	}

	/************
	 * @author	: Touheed Khan
	 * @date	: 14-June-2016
	 * @reason	: validation for same group and same type of Investigation
	 ***********/
	
	/*-----------------------------Start---------------------------*/	
	//1st coming componant type saving
	
	var serviceWiseBillingFlow = $("#serviceWiseBillingFlow").val();
	if(serviceWiseBillingFlow == "on"){
		if (rows == 0) {
			$("#rowname").val(testTypeChk);
			if(testTypeChk == "investigation" ){
				//rCount coming group id
				var sameID = $("#igi"+rCount).val();
				$("#igi").val(sameID);
				
			}
		}
		//check every row Investigation
		if(rows > 0){
			var name = $("#rowname").val();
			if(name == "investigation"){
				if(testTypeChk !=name){
					alert("Please make receipt of Investigation test only.");
					return false;
				}else{
					//if investigation but group is different
					var groupID = $("#igi").val();
					var comingID =$("#igi"+rCount).val()
					if(groupID != comingID){
						alert("Make sure both have same group of Investigation test.");
						return false;
					}
				}
				
			}else{
				if(testTypeChk =="investigation"){
					alert("Can't add investigation test in Different Service Heading.");
					return false;
				}
			}
		}
		
		//Pathology
		//check every row 
		if(rows > 0){
			var name = $("#rowname").val();
			if(name == "pathology"){
				if(testTypeChk !=name){
					alert("Please make receipt of Pathology test only.");
					return false;
				}
				
			}else{
				if(testTypeChk =="pathology"){
					alert("Can't add Pathology test in Different Service Heading.");
					return false;
				}
			}
		}
	}
	
/*-----------------------------END---------------------------*/

	
	var testNames = [];
	// fetching values from tblPets table
	$('#tblPets td').each(function() {
		var ptid = $(($(this).find('input[name=chk]'))).attr('value');
		// Checking Condition if Its undefined then it should not not insert
		if (ptid != undefined) {
			testNames.push(ptid);
		}
	});

	var radi = jQuery.inArray("radiation", testNames);
	if (rows >= 1 && radi == 0) {

		alert("Please uncheck '" + perticulerChk
				+ "',Because Radition is already present !");
		return false;
	}

	// @modified by:Touheed @modified Date:11-Jan-2016 (for Radiation
	// validation) #End

	var receiptCount = parseInt($("#receiptCounter").val());
	count = 1;
	if ($("#querytype").val() != 0) {
		alert("You can not Add/Delete Component in Receipt! ");
		return false;
	}

	if ($("#perticuler1").html() == 'Previous Pending Amount:') {
		alert("You can not add items into previous amount receipt ! ");
		return false
	}

	if ($("#tdEdCheck" + rCount).is(':checked')) {
		var perticuler = $("#tdEdPerticulars" + rCount).html();
		var rate = $("#tdEdRate" + rCount).html();
		var qty = $("#tdEdQty" + rCount).html();
		var amount = $("#tdEdAmount" + rCount).html();
		var discount = $("#tdEdConcession" + rCount).html();
		var payable = $("#tdEdPayable" + rCount).html();
		var id = $("#edId" + rCount).val();
		var testId = $("#testId" + rCount).val();
		var testType = $("#testType" + rCount).val();
		var msgType = $("#Msg" + rCount).val();

		var receiptCount = $("#receiptCounter").val();

		// Add Row In Table
		var tbody = document.getElementById("tblPets").getElementsByTagName(
				"TBODY")[0];
		// create row
		var row = document.createElement("TR");
		// create table cell 1
		var td1 = document.createElement("TD")

		var strHtml1 = receiptCount;
		td1.innerHTML = strHtml1.replace(/!count!/g, count);
		// create table cell 2
		var td2 = document.createElement("TD")
		var strHtml2 = perticuler;
		td2.innerHTML = strHtml2.replace(/!count!/g, count);
		// create table cell 3
		var td3 = document.createElement("TD")
		var strHtml3 = rate;
		td3.innerHTML = strHtml3.replace(/!count!/g, count);
		// create table cell 4
		var td4 = document.createElement("TD")
		var strHtml4 = qty;
		td4.innerHTML = strHtml4.replace(/!count!/g, count);
		// create table cell 5
		var td5 = document.createElement("TD")
		var strHtml5 = amount;
		td5.innerHTML = strHtml5.replace(/!count!/g, count);

		var td6 = document.createElement("TD")
		var strHtml6 = discount;
		td6.innerHTML = strHtml6.replace(/!count!/g, count);

		var td7 = document.createElement("TD")
		var strHtml7 = payable;
		td7.innerHTML = strHtml7.replace(/!count!/g, count);

		var td8 = document.createElement("TD")
		var strHtml8 = "<INPUT class='particularUnChk' ID=\"chk\" TYPE=\"checkbox\" NAME=\"chk\" onClick=\"delRow("
				+ (receiptCount + "," + rCount)
				+ ")\" VALUE=\""
				+ testType
				+ "\"><INPUT TYPE=\"hidden\" id=\"itId"
				+ receiptCount
				+ "\" value=\""
				+ id
				+ "\" ><INPUT TYPE=\"hidden\" id=\"typeTest"
				+ receiptCount
				+ "\" value=\""
				+ testType
				+ "\"><INPUT TYPE=\"hidden\" id=\"idTest"
				+ receiptCount
				+ "\" value=\""
				+ testId
				+ "\"><INPUT TYPE=\"hidden\" id=\"compRow"
				+ receiptCount
				+ "\" value=\""
				+ rCount
				+ "\"><input type=\"hidden\" id=\"recCompId"
				+ receiptCount
				+ "\" value=\"0\">"
				+ "<input type=\"hidden\" id=\"msgDoc"
				+ receiptCount + "\" value=\"" + msgType + "\">";

		td8.innerHTML = strHtml8.replace(/!count!/g, count);
		// append data to row \\

		row.setAttribute('id', "ReceiptCounterCount__" + receiptCount);

		td1
				.setAttribute('class', 'col-md-1-1', 'style='
						+ 'border-top: none;"');
		td1.setAttribute('id', "Rc" + receiptCount);
		row.appendChild(td1);

		td2
				.setAttribute('class', 'col-md-6-1', 'style='
						+ 'border-top: none;"');
		td2.setAttribute('id', "perticuler" + receiptCount);
		row.appendChild(td2);

		td3.setAttribute('class', 'col-md-1-1 ', 'style='
				+ 'border-top: none; padding-right: 15px;');
		td3.setAttribute('id', "rate" + receiptCount);
		row.appendChild(td3);
		td4.setAttribute('class', 'col-md-1-1 ', 'style='
				+ 'border-top: none;"');
		td4.setAttribute('id', "qty" + receiptCount);
		row.appendChild(td4);
		td5.setAttribute('class', 'col-md-1-1 ', 'style='
				+ 'border-top: none;"');
		td5.setAttribute('id', "amt" + receiptCount);
		row.appendChild(td5);
		td6.setAttribute('class', 'col-md-1-1 center', 'style='
				+ 'border-top: none;"');
		td6.setAttribute('id', "discount" + receiptCount);
		row.appendChild(td6);
		td7.setAttribute('class', 'col-md-1-2 center', 'style='
				+ 'border-top: none;margin-left: 5px;');
		td7.setAttribute('id', "pay" + receiptCount);
		row.appendChild(td7);
		td8.setAttribute('class', 'col-md-0-0 ', 'style='
				+ 'border-top: none;padding-right: 5px;');
		row.appendChild(td8);
		// add to count variable
		count = parseInt(count) + 1;
		// append row to table
		tbody.appendChild(row);

		if (testTypeChk == "radiation") {
			var radiationID = $("#testId" + rCount).val();

			var ajaxResponse = $("#radiationDivAjax").html();
			var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
			var obj = "";
			for ( var i = 0; i < myArray.radiationList.length; i++) {
				if (myArray.radiationList[i].radiationId == radiationID) {
					obj = myArray.radiationList[i];
					break;
				}
			}

			/* ################################################ */
			var rowR = document.createElement("TR");

			// create table cell 1
			var td1R = document.createElement("TD")

			var strHtml1R = "1.1";
			td1R.innerHTML = strHtml1R.replace(/!count!/g, count);

			// create table cell 2
			var td2R = document.createElement("TD")
			var strHtml2R = "Mould";
			td2R.innerHTML = strHtml2R.replace(/!count!/g, count);

			// create table cell 3
			var td3R = document.createElement("TD")
			var strHtml3R = obj.mould;
			td3R.innerHTML = strHtml3R;

			// create table cell 4
			var td4R = document.createElement("TD")
			var strHtml4R = "1";
			td4R.innerHTML = strHtml4R;

			// create table cell 5
			var td5R = document.createElement("TD")
			var strHtml5R = obj.mould;
			td5R.innerHTML = strHtml5R;

			// create table cell 6
			var td6R = document.createElement("TD")
			var strHtml6R = "0";
			td6R.innerHTML = strHtml6R;

			rowR.appendChild(td1R);
			rowR.appendChild(td2R);
			rowR.appendChild(td3R);
			rowR.appendChild(td4R);
			rowR.appendChild(td5R);
			rowR.appendChild(td6R)
			// add to count variable
			count = parseInt(count) + 1;
			// append row to table
			tbody.appendChild(rowR);

			/* ############################################### */

			/* ################################################ */

			var rowR1 = document.createElement("TR");

			// create table cell 1
			var td1R1 = document.createElement("TD")

			var strHtml1R1 = "1.2";
			td1R1.innerHTML = strHtml1R1.replace(/!count!/g, count);

			// create table cell 2
			var td2R1 = document.createElement("TD")
			var strHtml2R1 = "CT";
			td2R1.innerHTML = strHtml2R1.replace(/!count!/g, count);

			// create table cell 3
			var td3R1 = document.createElement("TD")
			var strHtml3R1 = obj.ct;
			td3R1.innerHTML = strHtml3R1;

			// create table cell 4
			var td4R1 = document.createElement("TD")
			var strHtml4R1 = "1";
			td4R1.innerHTML = strHtml4R1;

			// create table cell 5
			var td5R1 = document.createElement("TD")
			var strHtml5R1 = obj.ct;
			td5R1.innerHTML = strHtml5R1;

			// create table cell 6
			var td6R1 = document.createElement("TD")
			var strHtml6R1 = "0";
			td6R1.innerHTML = strHtml6R1;

			rowR1.appendChild(td1R1);
			rowR1.appendChild(td2R1);
			rowR1.appendChild(td3R1);
			rowR1.appendChild(td4R1);
			rowR1.appendChild(td5R1);
			rowR1.appendChild(td6R1)
			// add to count variable
			count = parseInt(count) + 1;
			// append row to table
			tbody.appendChild(rowR1);

			/* ############################################### */

			/* ################################################ */

			var rowR2 = document.createElement("TR");

			// create table cell 1
			var td1R2 = document.createElement("TD")

			var strHtml1R2 = "1.3";
			td1R2.innerHTML = strHtml1R2.replace(/!count!/g, count);

			// create table cell 2
			var td2R2 = document.createElement("TD")
			var strHtml2R2 = "Planning";
			td2R2.innerHTML = strHtml2R2.replace(/!count!/g, count);

			// create table cell 3
			var td3R2 = document.createElement("TD")
			var strHtml3R2 = obj.planning;
			td3R2.innerHTML = strHtml3R2;

			// create table cell 4
			var td4R2 = document.createElement("TD")
			var strHtml4R2 = "1";
			td4R2.innerHTML = strHtml4R2;

			// create table cell 5
			var td5R2 = document.createElement("TD")
			var strHtml5R2 = obj.planning;
			td5R2.innerHTML = strHtml5R2;

			// create table cell 6
			var td6R2 = document.createElement("TD")
			var strHtml6R2 = "0";
			td6R2.innerHTML = strHtml6R2;

			rowR2.appendChild(td1R2);
			rowR2.appendChild(td2R2);
			rowR2.appendChild(td3R2);
			rowR2.appendChild(td4R2);
			rowR2.appendChild(td5R2);
			rowR2.appendChild(td6R2)
			// add to count variable
			count = parseInt(count) + 1;
			// append row to table
			tbody.appendChild(rowR2);

			/* ############################################### */

			/* ################################################ */

			var rowR3 = document.createElement("TR");

			// create table cell 1
			var td1R3 = document.createElement("TD")

			var strHtml1R3 = "1.4";
			td1R3.innerHTML = strHtml1R3.replace(/!count!/g, count);

			// create table cell 2
			var td2R3 = document.createElement("TD")
			var strHtml2R3 = "QA";
			td2R3.innerHTML = strHtml2R3.replace(/!count!/g, count);

			// create table cell 3
			var td3R3 = document.createElement("TD")
			var strHtml3R3 = obj.qa;
			td3R3.innerHTML = strHtml3R3;

			// create table cell 4
			var td4R3 = document.createElement("TD")
			var strHtml4R3 = "1";
			td4R3.innerHTML = strHtml4R3;

			// create table cell 5
			var td5R3 = document.createElement("TD")
			var strHtml5R3 = obj.qa;
			td5R3.innerHTML = strHtml5R3;

			// create table cell 6
			var td6R3 = document.createElement("TD")
			var strHtml6R3 = "0";
			td6R3.innerHTML = strHtml6R3;

			rowR3.appendChild(td1R3);
			rowR3.appendChild(td2R3);
			rowR3.appendChild(td3R3);
			rowR3.appendChild(td4R3);
			rowR3.appendChild(td5R3);
			rowR3.appendChild(td6R3)
			// add to count variable
			count = parseInt(count) + 1;
			// append row to table
			tbody.appendChild(rowR3);

			/* ############################################### */

			/* ################################################ */

			var rowR4 = document.createElement("TR");

			// create table cell 1
			var td1R4 = document.createElement("TD")

			var strHtml1R4 = "1.5";
			td1R4.innerHTML = strHtml1R4.replace(/!count!/g, count);

			// create table cell 2
			var td2R4 = document.createElement("TD")
			var strHtml2R4 = "Imaging";
			td2R4.innerHTML = strHtml2R4.replace(/!count!/g, count);

			// create table cell 3
			var td3R4 = document.createElement("TD")
			var strHtml3R4 = obj.imaging;
			td3R4.innerHTML = strHtml3R4;

			// create table cell 4
			var td4R4 = document.createElement("TD")
			var strHtml4R4 = "1";
			td4R4.innerHTML = strHtml4R4;

			// create table cell 5
			var td5R4 = document.createElement("TD")
			var strHtml5R4 = obj.imaging;
			td5R4.innerHTML = strHtml5R4;

			// create table cell 6
			var td6R4 = document.createElement("TD")
			var strHtml6R4 = "0";
			td6R4.innerHTML = strHtml6R4;

			rowR4.appendChild(td1R4);
			rowR4.appendChild(td2R4);
			rowR4.appendChild(td3R4);
			rowR4.appendChild(td4R4);
			rowR4.appendChild(td5R4);
			rowR4.appendChild(td6R4)
			// add to count variable
			count = parseInt(count) + 1;
			// append row to table
			tbody.appendChild(rowR4);

			/* ############################################### */

			/* ################################################ */

			var rowR5 = document.createElement("TR");

			// create table cell 1
			var td1R5 = document.createElement("TD")

			var strHtml1R5 = "1.6";
			td1R5.innerHTML = strHtml1R5.replace(/!count!/g, count);

			// create table cell 2
			var td2R5 = document.createElement("TD")
			var strHtml2R5 = "Trt. Amount";
			td2R5.innerHTML = strHtml2R5.replace(/!count!/g, count);

			// create table cell 3
			var td3R5 = document.createElement("TD")
			var strHtml3R5 = obj.trtct;
			td3R5.innerHTML = strHtml3R5;

			// create table cell 4
			var td4R5 = document.createElement("TD")
			var strHtml4R5 = "1";
			td4R5.innerHTML = strHtml4R5;

			// create table cell 5
			var td5R5 = document.createElement("TD")
			var strHtml5R5 = obj.trtct;
			td5R5.innerHTML = strHtml5R5;

			// create table cell 6
			var td6R5 = document.createElement("TD")
			var strHtml6R5 = "0";
			td6R5.innerHTML = strHtml6R5;

			rowR5.appendChild(td1R5);
			rowR5.appendChild(td2R5);
			rowR5.appendChild(td3R5);
			rowR5.appendChild(td4R5);
			rowR5.appendChild(td5R5);
			rowR5.appendChild(td6R5)
			// add to count variable
			count = parseInt(count) + 1;
			// append row to table
			tbody.appendChild(rowR5);

			/* ############################################### */
		}

		TotalCalRec();
		receiptCount++;
		$("#receiptCounter").val(receiptCount);
		$("#tdEdCheck" + rCount).attr("disabled", true);
		$("#editRow" + rCount).attr('onclick', '').unbind('click');
		$('#deleteRow' + rCount).attr('onclick', '').unbind('click');// +'i[type="submit"]').attr('disabled',true);

	}

}

function TotalCal() {
	var amount = 0.0;
	var discount = 0.0;
	var payable = 0.0;

	var receiptCount = parseInt($("#receiptCounter").val());

	for ( var i = 1; i <= receiptCount; i++) {
		amount = amount + parseFloat($("#tdEdAmount" + receiptCount).html());
		discount = discount
				+ parseFloat($("#tdEdConcession" + receiptCount).html());
		payable = payable + parseFloat($("#tdEdPayable" + receiptCount).html());
	}

	$("#tdTotal").html(amount);
	$("#tdPay").html(discount);
	$("#tdCoPay").html(payable);

	var disc = parseFloat($("#dDiscount").val());
	if (disc == "NaN" || disc == undefined || disc == NaN || disc < 0) {
		disc = 0;
	}

	$("#finalAmount").val(payable - disc);
}

function delRow(r, cnt) {

	var t = $("#DiscMan").val();
	if (t == 1) {
		alert("You can not remove After Managed Discount !");
		$("#tblPets tbody tr input[type='checkbox']:checked").prop('checked',
				false);
		return false;
	}

	var rwAmt = $("#amt" + r).html();
	var rwCons = $("#discount" + r).html();
	var rwPay = $("#pay" + r).html();

	var tAmt = $("#tdTotal").html();
	var tCons = $("#tdPAy").html();
	var tPay = $("#tdCoPay").html();

	// @modifiedBy:Touheed @modifiedDate:13-Jan-216
	var radi1 = "";
	// for loop getting radition because typeTest id changing if its remoidtion
	for ( var i = 1; i <= 100; i++) {
		radi1 = $("#typeTest" + i).val();
		if (radi1 == "radiation") {
			$('#tblPets tbody').empty();
		}
	}

	tAmt = tAmt - rwAmt;
	tCons = tCons - rwCons;
	tPay = tPay - rwPay;

	$("#tdTotal").html(tAmt);
	$("#tdPAy").html(tCons);
	$("#tdCoPay").html(tPay);

	var disc = parseFloat($("#dDiscount").val());
	if (isNaN(disc)) {
		disc = 0;
	}

	$("#finalAmount").val(tPay - disc);

	$("#tblPets input[type='checkbox']:checked").closest("tr").remove();
	$("#tdEdCheck" + cnt).attr("disabled", false);
	$("#editRow" + cnt).attr('onclick', 'editRows(this)').bind('click');
	$('#deleteRow' + cnt).attr('onclick', 'deleteRows(this)').bind('click');
	document.getElementById("tdEdCheck" + cnt).checked = false;
}

function setDiscount() {
	var nar = $("#dNarration").val();
	var disc = parseFloat($("#dDiscount").val());
	var pp = parseFloat($("#dPayable").val());
	$("#tdBillCategoryDisc").html(disc);
	$("#tdBillCategoryDisc").val(disc);
	if (disc > 0) {

		var dCount = $("#dCounter").val();
		count = 1;
		// Add Row In Table

		$('#dTable tbody').empty();
		dCount = "1";

		var tbody = document.getElementById("dTable").getElementsByTagName(
				"TBODY")[0];
		// create row
		var row = document.createElement("TR");
		// create table cell 1
		var td1 = document.createElement("TD")

		var strHtml1 = dCount;
		td1.innerHTML = strHtml1.replace(/!count!/g, count);
		td1.style.color = "green";  
		// create table cell 2
		var td2 = document.createElement("TD")
		var strHtml2 = nar;
		td2.innerHTML = strHtml2.replace(/!count!/g, count);
		td2.style.color = "green";  
		// create table cell 3
		var td3 = document.createElement("TD")
		td3.setAttribute("id", "discountedAmountReceipt");
		td3.style.color = "green";  
		var strHtml3 = disc;
		td3.innerHTML = strHtml3;

		// append data to row
		row.appendChild(td1);
		row.appendChild(td2);
		row.appendChild(td3);

		// add to count variable
		count = parseInt(count) + 1;
		// append row to table
		tbody.appendChild(row);
		// TotalCalRec(dCount);
		// dCount++;
		$("#dCounter").val(dCount);
		$("#DiscMan").val(1);

	} else {
		$('#dTable tbody').empty();
		pp = $("#tdCoPay").html();
		$("#DiscMan").val(0);
	}
	// TotalCalRec();
	$('#dialog').show();
	$("#finalAmount").val(pp);
}

function RecievedBalanceFromPatient() {

	var r = confirm("Do you want to recieve this amount from Patient?");
	if (r == true) {
		var treatmentId = $("#trid").val();
		var patientBalance = $("#iPatientAMT").val();

		if (treatmentId != '') {
			var inputs = [];
			inputs.push('treatmentId=' + treatmentId);
			inputs.push('amount=' + patientBalance);
			inputs.push('amount=' + patientBalance);
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/indentSale/saveHospitalPayDetails",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							// //alert("error");
						},
						success : function(r) {
							var result = r;
							if (result == "Ok") {
								hospitalRecievedOrPaidAmount();
								/*
								 * var pharmaTotal =
								 * parseFloat($("#iPharmacyTotalAMT").val());
								 * var pharmaBalOrReceeved = (pharmaBalance *
								 * -1) + pharmaTotal;
								 * $("#PharmacyAdvancePaid").text(pharmaBalOrReceeved.toFixed(2));
								 */
							} else {

								alert("Error in dispatching amount to pharmacy..");
							}

						}
					});
		}
	}
}

function SendTotalRecievedOrPaidAmountToPharmacy() {

	var treatmentId = $("#trid").val();
	var pharmaOrPatientBalance;
	var confirmMsg;
	var BalanceType;
	if ($("#pendingAmount").val() != 0.0 || $("#pendingAmount").val() != 0.00) {
		confirmMsg = confirm("Do you want to pay this amount to Patient?");
		pharmaOrPatientBalance = $("#pendingAmount").val();
		BalanceType = "PharmaBalance";
	}
	if ($("#iPatientAMT").val() != 0.0 || $("#iPatientAMT").val() != 0.00) {
		confirmMsg = confirm("Do you want to recieve this amount from Patient?");
		pharmaOrPatientBalance = $("#iPatientAMT").val();
		BalanceType = "PatientBalance";
	}

	if (confirmMsg == true) {

		if (treatmentId != '') {
			var inputs = [];
			inputs.push('treatmentId=' + treatmentId);
			inputs.push('amount=' + pharmaOrPatientBalance);
			inputs.push('BalanceType=' + BalanceType);
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "GET",
						data : str + "&reqType=AJAX",
						url : "/EhatEnterprise/pharmacy/indentSale/saveHospitalPayDetails",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							// //alert("error");
						},
						success : function(r) {
							var result = r;
							if (result == "Ok") {
								hospitalRecievedOrPaidAmount();
								/*
								 * var pharmaTotal =
								 * parseFloat($("#iPharmacyTotalAMT").val());
								 * var pharmaBalOrReceeved = (pharmaBalance *
								 * -1) + pharmaTotal;
								 * $("#PharmacyAdvancePaid").text(pharmaBalOrReceeved.toFixed(2));
								 */
							} else {

								alert("Error in dispatching amount to pharmacy..");
							}

						}
					});
		}
	}
}

function hospitalRecievedOrPaidAmount() {
	var treatmentId = $("#trid").val();
	var pharmaBalance = $("#pendingAmount").val();
	var PharmacyTotalBill = $("#iPharmacyTotalAMT").val();
	var PharmacyTotalReceived = $("#iPharmacyAMT").val();
	var narration = $("#narration").val();
	var PatientBalance;

	if (PatientBalance != '0.0') {
		PatientBalance = $("#iPatientAMT").val();
	} else {
		PatientBalance = '0.0';
	}
	if (pharmaBalance != '0.00') {
		pharmaBalance = $("#pendingAmount").val();
	} else {
		pharmaBalance = '0.00';
	}

	if (treatmentId != '') {
		var inputs = [];
		inputs.push('treatmentId=' + treatmentId);
		inputs.push('pharmaBalance=' + pharmaBalance);
		inputs.push('PharmacyTotalBill=' + PharmacyTotalBill);
		inputs.push('PharmacyTotalReceived=' + PharmacyTotalReceived);
		inputs.push('PatientBalance=' + PatientBalance);
		inputs.push('narration=' + narration);

		var str = inputs.join('&');

		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/indentSale/saveHospitalTotalPayDetails",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
					},
					success : function(r) {
						var result = r;
						alert(result);
						var pharmaTotal = parseFloat($("#iPharmacyTotalAMT")
								.val());
						var pharmaBalOrReceeved = (pharmaBalance * -1)
								+ pharmaTotal;
						var pharmaPaid = $("#PharmacyAdvancePaid").text(
								pharmaBalOrReceeved.toFixed(2));
						var finalpayble = $("#finalPayable").text();
						var newOutstading = finalpayble
								- parseFloat(pharmaPaid);

						$("#finalOutstanding").text(newOutstading.toFixed(2));
						window.location.reload("payForIPD.jsp");

					}
				});
	}
}

function setPayableForPercentageDiscnt(callfrom) {
	var overalldisount = 0;
	var totalDiscount = 0;
	var sTotal = 0;
	var sPayable = 0;
	if (callfrom == "Hospital") {
		dPayable = parseFloat($("#finalPayable").text());
		dDiscount = parseFloat($("#dDiscount").val());
		overalldisount = parseFloat($("#overalldisount").val());
		dTotal = parseFloat($("#dTotal").val());
		var dPercentageDiscount = parseFloat($("#dDiscountInPercentage").val());

		var serviceTax = billBean.hospDetail[0].serTax;

		if ($("#dDiscountInPercentage").val().trim().length > 0) {
			var dPercntgDisc = dTotal * (dPercentageDiscount / 100);

			if (dPercntgDisc > dTotal) {
				alert("Discount Cannot Be Greater Than Total Amount");
				if (callfrom == "Hospital") {
					$("#dPayable").val($("#dTotal").val());
					$("#dDiscount").val("0");
					$("#dDiscountInPercentage").val("0");
				}
				return false;
			}
			if (callfrom == "Hospital") {
				dTotal = dTotal - overalldisount;
			} else {
				dTotal = dTotal;
			}
			if (isNaN(dDiscount) == true) {
				dTotal = dTotal;
			} else {
				dTotal = dTotal - dPercntgDisc;
			}
			serviceTax = (serviceTax / 100);
			var serviceTaxTotal = (dTotal) + (dTotal * serviceTax);
			$("#dDiscount").val(dPercntgDisc.toFixed(2));
			$("#dPayable").val(serviceTaxTotal.toFixed(2));
		}
	} else {
		if ($("#sTotal").val().trim().length > 0) {
			sTotal = parseFloat($("#sTotal").val());
			sPayable = parseFloat($("#sPayable").val());
			var sDiscount = parseFloat($("#sDiscount").val());
			var sPercentageDiscount = parseFloat($("#sDiscountInPercentage")
					.val());

			if ($("#sDiscountInPercentage").val().trim().length > 0) {
				var percntgDisc = sTotal * (sPercentageDiscount / 100);
				var totalPayable = sPayable - percntgDisc;
				$("#sDiscount").val(percntgDisc.toFixed(2));
				$("#sPayable").val(totalPayable.toFixed(2));
			} else {
				$("#sDiscount").val(0);
				$("#sPayable").val(sPayable);
				$("#sTotal").val(sTotal);
			}
		} else {
			$("#sDiscount").val(0);
			$("#sPayable").val($("#sPayable").val());
			$("#sTotal").val($("#sTotal").val());
		}
	}
}

count = 1;
var preReceiptComp = '<tbody class="table table-bordered table-striped cf">'
		+ '{#foreach $T.listOPDRecComp as lis}<tr id=ReceiptCounterCountCash__{count}>'
		+ '<td class="col-md-1">{count}</td>'
		+ '<td id="perticuler{count}" class="col-md-5-1">{$T.lis.cname}</td>'
		+ '<td id="rate{count}" class="numeric col-md-1-1" style="margin-left: 0px;" align="center">{$T.lis.crt}</td>'
		+ '<td id="qty{count}" class="numeric col-md-1-1 " style="margin-left: 0px;">{$T.lis.cqt}</td>'
		+ '<td id="amt{count}" class="numeric col-md-1" style="margin-left: 0px;">{$T.lis.camt}</td>'
		+ '<td id="discount{count}" class="numeric col-md-1-1" style="margin-left: 0px;">{$T.lis.cdis}</td>'
		+ '<td id="pay{count++}" class="numeric col-md-1-1" style="margin-left: 0px;">{$T.lis.cnet}</td>'
		+ '</tr>{#/for}</tbody>';

function editReceipt(recId, cnt) {

	var billType = $("#billType").val();
	var pageType = $("#pageTp").val();
	var groupId = $("#igi").val();
	var ttype = $("#rowname").val();
	var billCategory_Discount = $("#billCategory_Discount").val();

	if (pageType == 'prev') {
		document.getElementById("saveReceipt").disabled = true;
	}

	var inputs = [];
	inputs.push('action=fetchReceiptComponent');
	inputs.push('receiptId=' + recId);
	inputs.push('billType=' + billType);
	inputs.push('groupId=' + groupId);
	inputs.push('ttype=' + ttype);

	var str = inputs.join('&');

	jQuery
			.ajax({
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

					// @modifiedBy:Touheed @modifiedDate:12-Jan-2016
					setTimeout(function() {
						$("#radiResAjax").html(r);
					}, 300);

					var billComp = eval('(' + r + ')');
					var temp;
					count = 1;
					var t = 0;
					var d = 0;
					var p = 0;
					$("#tblPets").setTemplate(preReceiptComp);
					$("#tblPets").processTemplate(billComp);

					// Touheed code for radiation sperate
					setTimeout(
							function() {

								var rediRes = $("#radiResAjax").html();

								if (rediRes != undefined) {

									var rediarr = JSON.parse(rediRes
											.decodeSpecialChars());
									console.log(rediarr);

									if (rediarr.listOPDRecComp[0].cmpitmtp == "radiation") {

										var radiationID = rediarr.listOPDRecComp[0].cmpid;

										var ajaxResponse = $(
												"#radiationDivAjax").html();
										var myArray = JSON.parse(ajaxResponse
												.decodeSpecialChars());
										var obj = "";
										for ( var i = 0; i < myArray.radiationList.length; i++) {
											if (myArray.radiationList[i].radiationId == radiationID) {
												obj = myArray.radiationList[i];
												var myJsonString = JSON
														.stringify(obj);
												// Only for radiation print
												$("#radiResAjaxJson").html(
														myJsonString);

												break;
											}
										}

										var tbody = document.getElementById(
												"tblPets")
												.getElementsByTagName("TBODY")[0];
										/* ################################################ */
										var rowR = document.createElement("TR");

										// create table cell 1
										var td1R = document.createElement("TD")

										var strHtml1R = "1.1";
										td1R.innerHTML = strHtml1R.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R = document.createElement("TD")
										var strHtml2R = "Mould";
										td2R.innerHTML = strHtml2R.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R = document.createElement("TD")
										var strHtml3R = obj.mould;
										td3R.innerHTML = strHtml3R;

										// create table cell 4
										var td4R = document.createElement("TD")
										var strHtml4R = "1";
										td4R.innerHTML = strHtml4R;

										// create table cell 5
										var td5R = document.createElement("TD")
										var strHtml5R = obj.mould;
										td5R.innerHTML = strHtml5R;

										// create table cell 6
										var td6R = document.createElement("TD")
										var strHtml6R = "0";
										td6R.innerHTML = strHtml6R;

										rowR.appendChild(td1R);
										rowR.appendChild(td2R);
										rowR.appendChild(td3R);
										rowR.appendChild(td4R);
										rowR.appendChild(td5R);
										rowR.appendChild(td6R)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR);

										/* ############################################### */

										/* ################################################ */

										var rowR1 = document
												.createElement("TR");

										// create table cell 1
										var td1R1 = document
												.createElement("TD")

										var strHtml1R1 = "1.2";
										td1R1.innerHTML = strHtml1R1.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R1 = document
												.createElement("TD")
										var strHtml2R1 = "CT";
										td2R1.innerHTML = strHtml2R1.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R1 = document
												.createElement("TD")
										var strHtml3R1 = obj.ct;
										td3R1.innerHTML = strHtml3R1;

										// create table cell 4
										var td4R1 = document
												.createElement("TD")
										var strHtml4R1 = "1";
										td4R1.innerHTML = strHtml4R1;

										// create table cell 5
										var td5R1 = document
												.createElement("TD")
										var strHtml5R1 = obj.ct;
										td5R1.innerHTML = strHtml5R1;

										// create table cell 6
										var td6R1 = document
												.createElement("TD")
										var strHtml6R1 = "0";
										td6R1.innerHTML = strHtml6R1;

										rowR1.appendChild(td1R1);
										rowR1.appendChild(td2R1);
										rowR1.appendChild(td3R1);
										rowR1.appendChild(td4R1);
										rowR1.appendChild(td5R1);
										rowR1.appendChild(td6R1)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR1);

										/* ############################################### */

										/* ################################################ */

										var rowR2 = document
												.createElement("TR");

										// create table cell 1
										var td1R2 = document
												.createElement("TD")

										var strHtml1R2 = "1.3";
										td1R2.innerHTML = strHtml1R2.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R2 = document
												.createElement("TD")
										var strHtml2R2 = "Planning";
										td2R2.innerHTML = strHtml2R2.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R2 = document
												.createElement("TD")
										var strHtml3R2 = obj.planning;
										td3R2.innerHTML = strHtml3R2;

										// create table cell 4
										var td4R2 = document
												.createElement("TD")
										var strHtml4R2 = "1";
										td4R2.innerHTML = strHtml4R2;

										// create table cell 5
										var td5R2 = document
												.createElement("TD")
										var strHtml5R2 = obj.planning;
										td5R2.innerHTML = strHtml5R2;

										// create table cell 6
										var td6R2 = document
												.createElement("TD")
										var strHtml6R2 = "0";
										td6R2.innerHTML = strHtml6R2;

										rowR2.appendChild(td1R2);
										rowR2.appendChild(td2R2);
										rowR2.appendChild(td3R2);
										rowR2.appendChild(td4R2);
										rowR2.appendChild(td5R2);
										rowR2.appendChild(td6R2)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR2);

										/* ############################################### */

										/* ################################################ */

										var rowR3 = document
												.createElement("TR");

										// create table cell 1
										var td1R3 = document
												.createElement("TD")

										var strHtml1R3 = "1.4";
										td1R3.innerHTML = strHtml1R3.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R3 = document
												.createElement("TD")
										var strHtml2R3 = "QA";
										td2R3.innerHTML = strHtml2R3.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R3 = document
												.createElement("TD")
										var strHtml3R3 = obj.qa;
										td3R3.innerHTML = strHtml3R3;

										// create table cell 4
										var td4R3 = document
												.createElement("TD")
										var strHtml4R3 = "1";
										td4R3.innerHTML = strHtml4R3;

										// create table cell 5
										var td5R3 = document
												.createElement("TD")
										var strHtml5R3 = obj.qa;
										td5R3.innerHTML = strHtml5R3;

										// create table cell 6
										var td6R3 = document
												.createElement("TD")
										var strHtml6R3 = "0";
										td6R3.innerHTML = strHtml6R3;

										rowR3.appendChild(td1R3);
										rowR3.appendChild(td2R3);
										rowR3.appendChild(td3R3);
										rowR3.appendChild(td4R3);
										rowR3.appendChild(td5R3);
										rowR3.appendChild(td6R3)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR3);

										/* ############################################### */

										/* ################################################ */

										var rowR4 = document
												.createElement("TR");

										// create table cell 1
										var td1R4 = document
												.createElement("TD")

										var strHtml1R4 = "1.5";
										td1R4.innerHTML = strHtml1R4.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R4 = document
												.createElement("TD")
										var strHtml2R4 = "Imaging";
										td2R4.innerHTML = strHtml2R4.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R4 = document
												.createElement("TD")
										var strHtml3R4 = obj.imaging;
										td3R4.innerHTML = strHtml3R4;

										// create table cell 4
										var td4R4 = document
												.createElement("TD")
										var strHtml4R4 = "1";
										td4R4.innerHTML = strHtml4R4;

										// create table cell 5
										var td5R4 = document
												.createElement("TD")
										var strHtml5R4 = obj.imaging;
										td5R4.innerHTML = strHtml5R4;

										// create table cell 6
										var td6R4 = document
												.createElement("TD")
										var strHtml6R4 = "0";
										td6R4.innerHTML = strHtml6R4;

										rowR4.appendChild(td1R4);
										rowR4.appendChild(td2R4);
										rowR4.appendChild(td3R4);
										rowR4.appendChild(td4R4);
										rowR4.appendChild(td5R4);
										rowR4.appendChild(td6R4)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR4);

										/* ############################################### */

										/* ################################################ */

										var rowR5 = document
												.createElement("TR");

										// create table cell 1
										var td1R5 = document
												.createElement("TD")

										var strHtml1R5 = "1.6";
										td1R5.innerHTML = strHtml1R5.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R5 = document
												.createElement("TD")
										var strHtml2R5 = "Trt. Amount";
										td2R5.innerHTML = strHtml2R5.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R5 = document
												.createElement("TD")
										var strHtml3R5 = obj.trtct;
										td3R5.innerHTML = strHtml3R5;

										// create table cell 4
										var td4R5 = document
												.createElement("TD")
										var strHtml4R5 = "1";
										td4R5.innerHTML = strHtml4R5;

										// create table cell 5
										var td5R5 = document
												.createElement("TD")
										var strHtml5R5 = obj.trtct;
										td5R5.innerHTML = strHtml5R5;

										// create table cell 6
										var td6R5 = document
												.createElement("TD")
										var strHtml6R5 = "0";
										td6R5.innerHTML = strHtml6R5;

										rowR5.appendChild(td1R5);
										rowR5.appendChild(td2R5);
										rowR5.appendChild(td3R5);
										rowR5.appendChild(td4R5);
										rowR5.appendChild(td5R5);
										rowR5.appendChild(td6R5)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR5);

										/* ############################################### */

									}

								}

							}, 300);

					for ( var i = 0; i < billComp.listOPDRecComp.length; i++) {
						t = t + parseFloat(billComp.listOPDRecComp[i].camt);
						d = d + parseFloat(billComp.listOPDRecComp[i].cdis);
						p = p + parseFloat(billComp.listOPDRecComp[i].cnet);
					}

					$("#tdTotal").html(t);
					$("#tdPay").html(d);
					$("#tdCoPay").html(p);
					$("#tdBillCategoryDisc").html($("#dAmt" + cnt).val());

					$("#finalNumber").val($("#IdReceiptCash" + cnt).html());
					$("#finalDate").val($("#dateCash" + cnt).html());
					$("#finalTime").val($("#recTime" + cnt).html());
					$("#finalBank").val($("#bankNameCash" + cnt).html());
					$("#finalComment").val($("#cashComment" + cnt).val());

					$("#dNarration").val($("#dnarr" + cnt).val());
					$("#dDiscount").val($("#dAmt" + cnt).val());
					$("#querytype").val(recId);
					$("#receipNO").html(recId);

					document.getElementById("finalPaymentMode").value = $("#payModeCash" + cnt).html();
					setDiscount();
					$("#finalAmount").val($("#totalCash" + cnt).html());
					document.getElementById("finalAmount").readOnly = true;
					
					//alert($("#recTime" + cnt).html());
					// no need. converted to buttons
					// var recCount = $("#cashRecCount").val();
					// for ( var i = 1; i <= recCount; i++) {
					// if (cnt != i) {
					// document.getElementById("cashrecChk" + i).checked =
					// false;
					// }
					// }

				}
			});

}

function editReceiptCredit(recId, cnt) {

	$("#saveReceipt").show();

	var pageType = $("#pageTp").val();
	var groupId = $("#igi").val();
	var ttype = $("#rowname").val();

	$("#printCreditReceipt").val("yes");

	if (pageType == 'prev') {
		document.getElementById("saveReceipt").disabled = true;
	}

	var billType = $("#billType").val();
	var inputs = [];
	inputs.push('action=fetchReceiptComponent');
	inputs.push('receiptId=' + recId);
	inputs.push('billType=' + billType);
	inputs.push('groupId=' + groupId);
	inputs.push('ttype=' + ttype);

	var str = inputs.join('&');

	jQuery
			.ajax({
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

					setTimeout(function() {
						$("#radiResAjax").html(r);
					}, 300);

					var billComp = eval('(' + r + ')');
					var temp;
					count = 1;
					var t = 0;
					var d = 0;
					var p = 0;
					$("#tblPets").setTemplate(preReceiptComp);
					$("#tblPets").processTemplate(billComp);

					// Touheed code for radiation sperate
					setTimeout(
							function() {

								var rediRes = $("#radiResAjax").html();

								if (rediRes != undefined) {

									var rediarr = JSON.parse(rediRes
											.decodeSpecialChars());
									console.log(rediarr);

									if (rediarr.listOPDRecComp[0].cmpitmtp == "radiation") {

										var radiationID = rediarr.listOPDRecComp[0].cmpid;

										var ajaxResponse = $(
												"#radiationDivAjax").html();
										var myArray = JSON.parse(ajaxResponse
												.decodeSpecialChars());
										var obj = "";
										for ( var i = 0; i < myArray.radiationList.length; i++) {
											if (myArray.radiationList[i].radiationId == radiationID) {
												obj = myArray.radiationList[i];
												var myJsonString = JSON
														.stringify(obj);
												// Only for radiation print
												$("#radiResAjaxJson").html(
														myJsonString);

												break;
											}
										}

										var tbody = document.getElementById(
												"tblPets")
												.getElementsByTagName("TBODY")[0];
										/* ################################################ */
										var rowR = document.createElement("TR");

										// create table cell 1
										var td1R = document.createElement("TD")

										var strHtml1R = "1.1";
										td1R.innerHTML = strHtml1R.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R = document.createElement("TD")
										var strHtml2R = "Mould";
										td2R.innerHTML = strHtml2R.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R = document.createElement("TD")
										var strHtml3R = obj.mould;
										td3R.innerHTML = strHtml3R;

										// create table cell 4
										var td4R = document.createElement("TD")
										var strHtml4R = "1";
										td4R.innerHTML = strHtml4R;

										// create table cell 5
										var td5R = document.createElement("TD")
										var strHtml5R = obj.mould;
										td5R.innerHTML = strHtml5R;

										// create table cell 6
										var td6R = document.createElement("TD")
										var strHtml6R = "0";
										td6R.innerHTML = strHtml6R;
										rowR.appendChild(td1R);
										rowR.appendChild(td2R);
										rowR.appendChild(td3R);
										rowR.appendChild(td4R);
										rowR.appendChild(td5R);
										rowR.appendChild(td6R)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR);

										/* ################################################ */

										var rowR1 = document
												.createElement("TR");

										// create table cell 1
										var td1R1 = document
												.createElement("TD")

										var strHtml1R1 = "1.2";
										td1R1.innerHTML = strHtml1R1.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R1 = document
												.createElement("TD")
										var strHtml2R1 = "CT";
										td2R1.innerHTML = strHtml2R1.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R1 = document
												.createElement("TD")
										var strHtml3R1 = obj.ct;
										td3R1.innerHTML = strHtml3R1;

										// create table cell 4
										var td4R1 = document
												.createElement("TD")
										var strHtml4R1 = "1";
										td4R1.innerHTML = strHtml4R1;

										// create table cell 5
										var td5R1 = document
												.createElement("TD")
										var strHtml5R1 = obj.ct;
										td5R1.innerHTML = strHtml5R1;

										// create table cell 6
										var td6R1 = document
												.createElement("TD")
										var strHtml6R1 = "0";
										td6R1.innerHTML = strHtml6R1;
										rowR1.appendChild(td1R1);
										rowR1.appendChild(td2R1);
										rowR1.appendChild(td3R1);
										rowR1.appendChild(td4R1);
										rowR1.appendChild(td5R1);
										rowR1.appendChild(td6R1)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR1);

										/* ################################################ */

										var rowR2 = document
												.createElement("TR");

										// create table cell 1
										var td1R2 = document
												.createElement("TD")

										var strHtml1R2 = "1.3";
										td1R2.innerHTML = strHtml1R2.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R2 = document
												.createElement("TD")
										var strHtml2R2 = "Planning";
										td2R2.innerHTML = strHtml2R2.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R2 = document
												.createElement("TD")
										var strHtml3R2 = obj.planning;
										td3R2.innerHTML = strHtml3R2;

										// create table cell 4
										var td4R2 = document
												.createElement("TD")
										var strHtml4R2 = "1";
										td4R2.innerHTML = strHtml4R2;

										// create table cell 5
										var td5R2 = document
												.createElement("TD")
										var strHtml5R2 = obj.planning;
										td5R2.innerHTML = strHtml5R2;

										// create table cell 6
										var td6R2 = document
												.createElement("TD")
										var strHtml6R2 = "0";
										td6R2.innerHTML = strHtml6R2;
										rowR2.appendChild(td1R2);
										rowR2.appendChild(td2R2);
										rowR2.appendChild(td3R2);
										rowR2.appendChild(td4R2);
										rowR2.appendChild(td5R2);
										rowR2.appendChild(td6R2)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR2);

										/* ################################################ */

										var rowR3 = document
												.createElement("TR");

										// create table cell 1
										var td1R3 = document
												.createElement("TD")

										var strHtml1R3 = "1.4";
										td1R3.innerHTML = strHtml1R3.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R3 = document
												.createElement("TD")
										var strHtml2R3 = "QA";
										td2R3.innerHTML = strHtml2R3.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R3 = document
												.createElement("TD")
										var strHtml3R3 = obj.qa;
										td3R3.innerHTML = strHtml3R3;

										// create table cell 4
										var td4R3 = document
												.createElement("TD")
										var strHtml4R3 = "1";
										td4R3.innerHTML = strHtml4R3;

										// create table cell 5
										var td5R3 = document
												.createElement("TD")
										var strHtml5R3 = obj.qa;
										td5R3.innerHTML = strHtml5R3;

										// create table cell 6
										var td6R3 = document
												.createElement("TD")
										var strHtml6R3 = "0";
										td6R3.innerHTML = strHtml6R3;
										rowR3.appendChild(td1R3);
										rowR3.appendChild(td2R3);
										rowR3.appendChild(td3R3);
										rowR3.appendChild(td4R3);
										rowR3.appendChild(td5R3);
										rowR3.appendChild(td6R3)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR3);

										/* ################################################ */

										var rowR4 = document
												.createElement("TR");

										// create table cell 1
										var td1R4 = document
												.createElement("TD")

										var strHtml1R4 = "1.5";
										td1R4.innerHTML = strHtml1R4.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R4 = document
												.createElement("TD")
										var strHtml2R4 = "Imaging";
										td2R4.innerHTML = strHtml2R4.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R4 = document
												.createElement("TD")
										var strHtml3R4 = obj.imaging;
										td3R4.innerHTML = strHtml3R4;

										// create table cell 4
										var td4R4 = document
												.createElement("TD")
										var strHtml4R4 = "1";
										td4R4.innerHTML = strHtml4R4;

										// create table cell 5
										var td5R4 = document
												.createElement("TD")
										var strHtml5R4 = obj.imaging;
										td5R4.innerHTML = strHtml5R4;

										// create table cell 6
										var td6R4 = document
												.createElement("TD")
										var strHtml6R4 = "0";
										td6R4.innerHTML = strHtml6R4;
										rowR4.appendChild(td1R4);
										rowR4.appendChild(td2R4);
										rowR4.appendChild(td3R4);
										rowR4.appendChild(td4R4);
										rowR4.appendChild(td5R4);
										rowR4.appendChild(td6R4)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR4);
										/* ################################################ */

										var rowR5 = document
												.createElement("TR");

										// create table cell 1
										var td1R5 = document
												.createElement("TD")

										var strHtml1R5 = "1.6";
										td1R5.innerHTML = strHtml1R5.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R5 = document
												.createElement("TD")
										var strHtml2R5 = "Trt. Amount";
										td2R5.innerHTML = strHtml2R5.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R5 = document
												.createElement("TD")
										var strHtml3R5 = obj.trtct;
										td3R5.innerHTML = strHtml3R5;

										// create table cell 4
										var td4R5 = document
												.createElement("TD")
										var strHtml4R5 = "1";
										td4R5.innerHTML = strHtml4R5;

										// create table cell 5
										var td5R5 = document
												.createElement("TD")
										var strHtml5R5 = obj.trtct;
										td5R5.innerHTML = strHtml5R5;

										// create table cell 6
										var td6R5 = document
												.createElement("TD")
										var strHtml6R5 = "0";
										td6R5.innerHTML = strHtml6R5;
										rowR5.appendChild(td1R5);
										rowR5.appendChild(td2R5);
										rowR5.appendChild(td3R5);
										rowR5.appendChild(td4R5);
										rowR5.appendChild(td5R5);
										rowR5.appendChild(td6R5)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR5);
										/* ############################################### */
									}

								}

							}, 300);

					for ( var i = 0; i < billComp.listOPDRecComp.length; i++) {
						t = t + parseFloat(billComp.listOPDRecComp[i].crt);
						d = d + parseFloat(billComp.listOPDRecComp[i].cdis);
						p = p + parseFloat(billComp.listOPDRecComp[i].cnet);
					}

					$("#tdTotal").html(t);
					$("#tdPay").html(d);
					$("#tdCoPay").html(p);

					$("#finalNumber").val($("#IdReceiptCredit" + cnt).html());
					$("#finalDate").val($("#dateCredit" + cnt).html());
					$("#finalTime").val($("#recTimeCredit" + cnt).html());
					$("#finalBank").val($("#bankNameCredit" + cnt).html());
					$("#finalComment").val($("#creditComment" + cnt).val());

					$("#dNarration").val($("#dnarrcredit" + cnt).val());
					$("#dDiscount").val($("#dAmtcredit" + cnt).val());
					$("#querytype").val(recId);
					$("#receipNO").html(recId);
					document.getElementById("finalPaymentMode").value = $(
							"#payModeCredit" + cnt).html();
					setDiscount();
					$("#finalAmount").val($("#totalCredit" + cnt).html());
					document.getElementById("finalAmount").readOnly = true;

					// converted to buttons...
					// var recCount = $("#creditRecCount").val();
					// for ( var i = 1; i <= recCount; i++) {
					// if (cnt != i) {
					// document.getElementById("cashrecChk" + i).checked =
					// false;
					// document.getElementById("creditrecChk" + i).checked =
					// false;
					// }
					// document.getElementById("paycreditrecChk" + i).checked =
					// false;
					// }

				}
			});

	$("#radiResAjax").html("");
	$("#radiResAjaxJson").html("Empty");
}

var payReceipt = '<tbody><tr id=ReceiptCounterCountCredit__1>'
		+ '<td class="col-md-1">1</td>'
		+ '<td id="perticuler1" class="col-md-6-1"></td>'
		+ '<td id="rate1" class="col-md-1-1 "></td>'
		+ '<td id="qty1" class="col-md-1-1 "></td>'
		+ '<td id="amt1" class="col-md-1-1 "></td>'
		+ '<td id="discount1" class="col-md-1-1 "></td>'
		+ '<td id="pay1" class="col-md-1-1 center" style="margin-left: 5px;"></td>'
		+ '<td class="col-md-1-1 center">'
		+ '<INPUT TYPE="hidden" id="itId1" value="0">'
		+ '<INPUT TYPE="hidden" id="typeTest1" value="credit">'
		+ '<INPUT TYPE="hidden" id="idTest1" value="0">'
		+ '<INPUT TYPE="hidden" id="compRow1" value="0">'
		+ '<input type="hidden" id="recCompId1" value="0"></td></tr></tbody>';

// do not change the string. not even casing
var creditReceiptString = "Credit Receipt Against Receipt No. ";

function payCreditReceipt(recId, cnt) {

	$("#receipNO").html("0");
	var billCategory_Discount = $("#billCategory_Discount").val();

	document.getElementById("saveReceipt").disabled = false;
	document.getElementById("finalAmount").readOnly = false;
	document.getElementById("payfromCA").disabled = false;

	var billComp = "";
	$("#tblPets").setTemplate(payReceipt);
	$("#tblPets").processTemplate(billComp);

	$("#perticuler1").html(creditReceiptString + recId);
	$("#rate1").html($("#remaingCredit" + cnt).html());
	$("#qty1").html(1);
	$("#amt1").html($("#remaingCredit" + cnt).html());
	$("#discount1").html(0);
	$("#pay1").html($("#remaingCredit" + cnt).html());

	$("#tdTotal").html($("#remaingCredit" + cnt).html());
	$("#tdPay").html(0);
	$("#tdCoPay").html($("#remaingCredit" + cnt).html());
	$("#tdBillCategoryDisc").html($("#discCredit" + cnt).html());

	$("#finalAmount").val($("#remaingCredit" + cnt).html());
	$("#finalPaymentMode").val("Cash");
	$("#finalDate").val($("#dateCredit" + cnt).html());

	$("#receiptCounter").val(1);
	recId = -recId;
	$("#querytype").val(recId);

	$("#finalNumber").val("");
	$("#finalBank").val("");
	$("#finalComment").val("");

	$("#printCreditReceipt").val("no");
}

function TotalCalRec() {
	var tdBillCategoryDisc = $("#billCategory_Discount").val();
	amnt = 0;
	discot = 0;
	Payb = 0;
	var receiptCount = parseInt($("#receiptCounter").val());
	for ( var i = 1; i <= receiptCount; i++) {

		if (!isNaN(parseFloat($("#amt" + i).html()))) {
			amnt = amnt + parseFloat($("#amt" + i).html());
			discot = discot + parseFloat($("#discount" + i).html());
			Payb = Payb + parseFloat($("#pay" + i).html());
		}
	}
	
	$("#tdTotal").html(amnt);
	$("#tdPay").html(discot);
	$("#tdCoPay").html(Payb);

	// bill added after managed discount
	try {
		var managedDisc = 0;
		managedDisc = (($("#discountedAmountReceipt").html()).trim());

		if (managedDisc > 0) {
			Payb -= managedDisc;
		}
	} catch (e) {

	}
	$("#finalAmount").val(Payb);
	
	tdBillCategoryDisc = Math.round(Payb * (tdBillCategoryDisc /100));
	$("#tdBillCategoryDisc").html(tdBillCategoryDisc);
	
	if(tdBillCategoryDisc > 0){
		setCategoryDiscTotal();
		setDiscount();
		document.getElementById("manage").disabled = true;
	}else{
		document.getElementById("manage").disabled = false;
	}
}

function setCategoryDiscTotal() {
		var tdt = document.getElementById('tdCoPay').innerHTML;
		var totalpay = $("#dTotal").val();
		var billCategory_Discount = $("#billCategory_Discount").val();
		var discountAmt = tdt * (billCategory_Discount / 100 );
		discountAmt = Math.round(discountAmt);
		$("#dTotal").val(tdt);
		$("#dPayable").val(tdt-discountAmt);
		$("#dNarration").val("Category Discount");
	//	$("#tdBillCategoryDisc").val(billCategory_Discount);
		$("#idDiscountInPercentage").val(billCategory_Discount);
		$("#dDiscount").val(discountAmt);
}

function setNewReceipt() {
	// getReceiptNoForOPD("opd");
	$("#receipNO").html(0)

	$("#querytype").val(0);
	$('#tblPets tbody').empty();
	$("#dCounter").val(1);
	$("#tdTotal").html(0);
	$("#tdPay").html(0);
	$("#tdCoPay").html(0);
	$("#finalAmount").val(0);
	$("#finalAmount").prop("readonly", false);
	$("#finalNumber").val("");
	$("#finalBank").val("");
	$("#finalComment").val("");
	$("#finalPaymentMode").val('Cash');

	$("#printCreditReceipt").val("yes");

	var cnt = $("#RowCount").val();

	/* Manage discount Refresh */
	$('#dTable tbody').empty();
	$("#DiscMan").val(0);
	/* /Manage discount Refresh */

	try {
		for ( var i = 1; i <= cnt; i++) {
			document.getElementById("tdEdCheck" + i).checked = false;
			if ($("#billFlag" + i).val() == "N") {
				$("#tdEdCheck" + i).attr("disabled", false);
			}
		}
	} catch (err) {
	}
}

function CloseDilaogUncheckFiled() {

	$("#txtRtgsAmt").val("");
	$("#txtRtgsAccNo").val("");
	$("#txtRtgsBankName").val("");
	$("#txtRtgsIfscCode").val("");
	$("#txtRtgsUTRNo").val("");
	var close = document.getElementById("CheckBox4").checked;
	if (close == true) {
		$("#dialog").dialog('close');
		document.getElementById("CheckBox4").checked = false;
	} else {
		document.getElementById("CheckBox4").checked = true;
	}
}


function clearData() {
	$("#particulars").val('');
	$('#itemid').val('0');
	$("#particularRate").val('');
	$("#particularqty").val('');
	$("#particularamt").val('');
	$("#particularConcession").val('');
	$("#particularPayable").val('');
	$("#pQuerytype").val('insert');
	setOpdParticularAutosugession("onChange");
}

function fetchPrevAmt(billType) {
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var treatId = pobj1.trid;

	var inputs = [];
	inputs.push('action=fetchPrevAmt');
	inputs.push('treatId=' + $.trim(treatId));
	inputs.push('callFrom=' + $.trim(billType));
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
					$("#pendingAmountDiv").html(ajaxResponse);

					var pobj = eval('(' + ajaxResponse + ')');

					var previousRemainingValue = 0;
					var opdBillingIDPendingAmount = "";
					var previousRefundValue = 0;
					for ( var int = 0; int < pobj.listRecMaster.length; int++) {
						if (parseFloat((pobj.listRecMaster[int].rval)) > 0) {
							previousRemainingValue += parseFloat((pobj.listRecMaster[int].rval));
						} else {
							previousRefundValue += -(parseFloat((pobj.listRecMaster[int].rval)))
						}
						// 29_opdBill#@#30_opdBill#@#30_diagnosisBill#@#31_diagnosisBill#@#
						opdBillingIDPendingAmount += ((pobj.listRecMaster[int].idrm)
								+ "_" + (pobj.listRecMaster[int].deptName) + "#@#");
					}

					var previousRemainingValueHTML = "";
					if (previousRemainingValue > 0) {
						previousRemainingValueHTML = "<label><i id='previousRemainingValue' style='margin-left: 5px; margin-right: 10px;'>"
								+ previousRemainingValue
								+ "</i></label>"
								+ "<button onclick=openPreviousPendingPopup() type='button' class='btn btn-xs btn-warning editUserAccess' style='line-height: 1.2;' disabled='disabled'>PAY</button>";
						//+ "<button onclick=openPreviousPendingPopup() type='button' class='btn btn-xs btn-warning editUserAccess' style='line-height: 1.2;' disabled='disabled'>PAY</button><i class='fa fa-star' style='color:green;margin-left:5px;'></i>";
					} else {
						previousRemainingValueHTML = "<label><i id='previousRemainingValue' style='margin-left: 5px; margin-right: 10px;'>"
								+ previousRemainingValue
								+ "</i></label>"
								+ "<button onclick=openPreviousPendingPopup() type='button' class='btn btn-xs btn-warning' style='line-height: 1.2;' disabled='disabled'>PAY</button>";
					}
					$("#previousRemaining").html(previousRemainingValueHTML);
					$("#totalPendings").html(previousRemainingValue);
					$("#totalRefunds").html(previousRefundValue);

					ReceiptCount = 1;
					$("#pendingDetailsDiv").setTemplate(
							previousPendingTemplateForBilling);
					$("#pendingDetailsDiv").processTemplate(pobj);
					userAccess();
				}
			});
}

var previousPendingTemplateForBilling = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed header-fixed' style='margin-top: 9px;'>"
		+ "<thead>"
		+ "<tr style='background: #FFE0C2; border-bottom: 1px solid orange; border-top: 1px solid orange;'>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment ID</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:10px;'><div class='TextFont'>Treatment Count</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:10px;'><div class='TextFont'>Treatment Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:20px;'><div class='TextFont'>Bill Type</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:15px;'><div class='TextFont'>Pending Amount</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:30px;'><div class='TextFont'>Action</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='overflow-y:scroll; margin-top:-21px; height: 250px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.listRecMaster as lrm}{#if $T.lrm.rval != 0.0}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{ReceiptCount++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lrm.billID}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lrm.billtype}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lrm.billDate}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lrm.narr}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id = 'pendingAmt_{$T.lrm.idrm}_{$T.lrm.billID}' >{$T.lrm.rval}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='checkbox' name='preAmtcheckbox' id='preAmtcheckbox{$T.lrm.idrm}' value='{$T.lrm.idrm}' />"
		+ "</td>" + "</tr>" + "{#/if}" + "{#/for}" + "</tbody>" + "</table>"
		+ "</div>";

function openPreviousPendingPopup() {
	$("#previousPendingPopup").modal('show');

	var ajaxResponse = $("#pendingAmountDiv").html();

	var pobj = eval('(' + ajaxResponse + ')');

	ReceiptCount = 1;
	$("#pendingDetailsDiv").setTemplate(previousPendingTemplateForBilling);
	$("#pendingDetailsDiv").processTemplate(pobj);

}
function closePreviousPendingPopup() {
	$("#previousPendingPopup").modal('hide');
}

function setUIPreviousRemainingValue(callfrom) {
	var opdBillingIDPendingAmountTemp = "";
	var selectedGroups = new Array();
	$("input[name='preAmtcheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
	});
	if (selectedGroups.length > 1) {
		alert("Please Select Single Receipt");
		return false;
	} else {
		var pendingAmountDiv = $("#pendingAmountDiv").html();

		var jsonBean = eval('(' + pendingAmountDiv + ')');
		var myObj;

		for ( var k = 0; k < jsonBean.listRecMaster.length; k++) {
			var id = jsonBean.listRecMaster[k].idrm;
			if (selectedGroups[0] == id) {
				myObj = jsonBean.listRecMaster[k];
				break;
			}
		}

		opdBillingIDPendingAmountTemp = myObj.idrm + "_" + myObj.deptName
				+ "#@#";

		var r = confirm("Please confirm to Pay This Amount?");
		if (r == true) {

			var commonAdvanceFlag = 'N';
			var myobj1 = JSON.stringify(myObj);
			var inputs = [];
			inputs.push('action=payPreviousPendingAmountAndPrintReceipt');
			inputs.push('myobj1=' + myobj1);
			inputs.push('commonAdvanceFlag=' + commonAdvanceFlag);
			inputs.push('previousPendingType=' + opdBillingIDPendingAmountTemp);
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
					var ajaxResponse = r;
					var res = ajaxResponse.split("-");
					alert(res[0]);
					fetchPrevAmt('opd');

					// var advanceobj = JSON.parse(ajaxResponse);
					window.open("PreviousPendingPaymentReceiptPrint.jsp?"
							+ "myobj1=" + encodeURIComponent(myobj1)
							+ "&receipt_id=" + encodeURIComponent(res[1]));
					// fetchPrevAmt('opd');
				}
			});
		} else {
			return false;
		}

	}
}

var receiptCompforRefund = '{#foreach $T.listRecMaster as listRecMaster}<tr>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1 center">{count}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1 center">{$T.listRecMaster.idrm}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1" id="payModeCash{count}">{$T.listRecMaster.pay_mode}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1 left" id="discCash{count}">{$T.listRecMaster.onBilDis}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center" id="totalCash{count}">{$T.listRecMaster.pdAmt}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 center" id="IdReceiptCash{count}">{$T.listRecMaster.card_no}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 left" id="dateCash{count}">{$T.listRecMaster.recDate}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 left" id="bankNameCash{count}">{$T.listRecMaster.bname}</td>'
		+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
		+ '<i type="button" class="btn btn-success" title="pay" onclick="setTypeGroup({$T.listRecMaster.gid},\'{$T.listRecMaster.ttype}\'),editReceiptForRefund({$T.listRecMaster.idrm},{count})" id="cashrecChk{count}" style="cursor: pointer;">'
		+ '<input type="hidden" id="dnarr{count}" value={$T.listRecMaster.managNrr} />'
		+ '<input type="hidden" id="dAmt{count}" value={$T.listRecMaster.onBilDis} />'
		+ '<input type="hidden" id="pr{count}" value={$T.listRecMaster.prev} />'
		+ '<input type="hidden" id="cashComment{count++}" value={$T.listRecMaster.narr} /></td>'
		+ '</tr>{#/for}';


var receiptCompforRefundOPD = '{#foreach $T.listRecMaster as listRecMaster}<tr>'
	+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1 center">{count}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1 center">{$T.listRecMaster.idrm}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="col-md-2-1" id="payModeCash{count}">{$T.listRecMaster.pay_mode}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="col-md-1-1 left" id="discCash{count}">{$T.listRecMaster.onBilDis}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center" id="totalCash{count}">{$T.listRecMaster.pdAmt}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 center" id="IdReceiptCash{count}">{$T.listRecMaster.card_no}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 left" id="dateCash{count}">{$T.listRecMaster.recDate}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-2-1 left" id="bankNameCash{count}">{$T.listRecMaster.bname}</td>'
	+ '<td style="border-top: none; padding: 1px;" class="numeric col-md-1-1 center">'
	+ '<i type="button" class="btn btn-success" title="pay" onclick="editReceiptForRefund({$T.listRecMaster.idrm},{count})" id="cashrecChk{count}" style="cursor: pointer;">'
	+ '<input type="hidden" id="dnarr{count}" value={$T.listRecMaster.managNrr} />'
	+ '<input type="hidden" id="dAmt{count}" value={$T.listRecMaster.onBilDis} />'
	+ '<input type="hidden" id="pr{count}" value={$T.listRecMaster.prev} />'
	+ '<input type="hidden" id="cashComment{count++}" value={$T.listRecMaster.narr} /></td>'
	+ '</tr>{#/for}';

function refreshRefundReceipt() {
	$("#idRefundReceiptDetails").val("0");
	$("#refundReceiptPaymentMode").val("Cash");
	$("#refundReceiptAmount").val("");
	$("#refundReceiptAmount").prop("readonly", false);
	$("#refundReceiptNumber").val("");
	// $("#refundReceiptDate").val("");
	$("#refundReceiptBankName").val("");
	$("#refundReceiptComment").val("");
	$("#refundReceiptDetails").val("");
	var callFrom = $("#callFromRefund").val();	
	var ajaxResponseForRecMaster = $("#cashDivForRecMaster").html();
	var receiptBean = eval('(' + ajaxResponseForRecMaster + ')');
	var recTotal = 0;
	for ( var i = 0; i < receiptBean.listRecMaster.length; i++) {
		recTotal = recTotal + receiptBean.listRecMaster[i].pdAmt;
	}

	count = 1;
	if (callFrom == "OPD") {
		$("#receiptCompforRefund").setTemplate(receiptCompforRefundOPD);
		$("#receiptCompforRefund").processTemplate(receiptBean);
	} else {
		$("#receiptCompforRefund").setTemplate(receiptCompforRefund);
		$("#receiptCompforRefund").processTemplate(receiptBean);
	}
	
	$("#recTotalRefund").html(recTotal);
	$("#receipNOforrefund").html(0);
	$('#tblPetsforRefund tbody').empty();
	$("#previouslyRefundedAmount").html("");
	$("#totalRefundedAmount").html(0);
}
function setReceiptAmountForRefund(recCompId, cnt) {

	$("#tblPetsforRefund input:checkbox").change(function() {
		$("#tblPetsforRefund input:checkbox").attr("checked", false);
		$(this).attr("checked", true);
	});

	$("#refundReceiptPaymentMode").val("Cash");
	$("#refundReceiptAmount").val("");
	$("#refundReceiptAmount").prop("readonly", false);
	var amt = $("#pay" + cnt).html();
	var details = $("#perticulerRefund" + cnt).html();
	var idopd_bill = $("#idopd_bill" + recCompId).val();
	
	$("#refundReceiptNumber").val("");
	$("#refundReceiptBankName").val("");
	$("#refundReceiptComment").val("");
	$("#refundReceiptDetails").val(details);
	$("#id_opd_bill").val(idopd_bill);
	$("#id_opd_rec_comp").val(recCompId);
	$("#comp_count").val(cnt); 
	var previousRefund = $("#previousRefund" + recCompId).val();
	$("#totRefundAmt").val(amt);
	$("#refundReceiptAmount").val(parseFloat(amt) - parseFloat(previousRefund));
	$("#previouslyRefundedAmount").html("Previous Amount Refunded On " + details + " :  " + previousRefund + " Rs.");
	/*var Comments = $("#cashComment" + cnt).val();
	var Bank = $("#bankNameCash" + cnt).html();
	//alert(cnt);
	$("#refundReceiptBankName").val(Bank);
	$("#refundReceiptComment").val(Comments);*/
}

var preReceiptCompRefund = '<tbody class="table table-bordered cf">'
		+ '{#foreach $T.listOPDRecComp as lis}<tr id=ReceiptCounterCountCash__{$T.lis.reccmpid}>'
		+ '<td class="col-md-1">{countForRefund}</td>'
		+ '<td id="perticulerRefund{countForRefund}" class="col-md-4-1">{$T.lis.cname}</td>'
		+ '<td id="rate{countForRefund}" class="numeric col-md-1-1" style="margin-left: 0px;" align="center">{$T.lis.crt}</td>'
		+ '<td id="qty{countForRefund}" class="numeric col-md-1-1 " style="margin-left: 0px;">{$T.lis.cqt}</td>'
		+ '<td id="amtRefund{countForRefund}" class="numeric col-md-1" style="margin-left: 0px;">{$T.lis.camt}</td>'
		+ '<td id="discount{countForRefund}" class="numeric col-md-1-1" style="margin-left: 0px;">{$T.lis.cdis}</td>'
		+ '<td id="pay{countForRefund}" class="numeric col-md-1-1" style="margin-left: 0px;">{$T.lis.cnet}</td>'
		+ '<td id="" class="numeric col-md-1-1" style="margin-left: 0px;">'
		+ "{#if $T.lis.totalAmt == $T.lis.refundAmt}"
		+ '<input type="checkbox" name="refundAmtcheckbox" id="refundAmtcheckbox{$T.lis.reccmpid}" disabled = "disabled"'
		+ 'value="{$T.lis.reccmpid}" onclick="setReceiptAmountForRefund({$T.lis.reccmpid},{countForRefund++})"/>'
		+ '{#else}'
		+ '<input type="checkbox" name="refundAmtcheckbox" id="refundAmtcheckbox{$T.lis.reccmpid}" '
		+ 'value="{$T.lis.reccmpid}" onclick="setReceiptAmountForRefund({$T.lis.reccmpid},{countForRefund++})"/>'
		+ '{#/if}</td>'
		+ '<input type="hidden" id = "idopd_bill{$T.lis.reccmpid}" value="{$T.lis.idopd_bill}"><input type="hidden" id = "previousRefund{$T.lis.reccmpid}" value="{$T.lis.refundAmt}"></tr>{#/for}</tbody>';

function editReceiptForRefund(recId, cnt) {

	var billType = $("#billType").val();
	var pageType = $("#pageTp").val();
	var groupId = $("#igi").val();
	var ttype = $("#rowname").val();  
	var discCash = $("#discCash"+cnt).html();
	var totalCash = $("#totalCash"+cnt).html();
	
	if (pageType == 'prev') {
		document.getElementById("saveReceipt").disabled = true;
	}

	var inputs = [];
	inputs.push('action=fetchReceiptComponent');
	inputs.push('receiptId=' + recId);
	inputs.push('billType=' + billType);
	inputs.push('groupId=' + groupId);
	inputs.push('ttype=' + ttype);
	
	var str = inputs.join('&');

	jQuery
			.ajax({
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
					
					$("#receipNOforrefund").html(0);
					$('#tblPetsforRefund tbody').empty();

					// @modifiedBy:Touheed @modifiedDate:12-Jan-2016
					setTimeout(function() {
						$("#radiResAjax").html(r);
					}, 300);

					var billComp = eval('(' + r + ')');
					var temp;

					var t = 0;
					var d = 0;
					var p = 0;
					countForRefund = 1;
					$("#tblPetsforRefund").setTemplate(preReceiptCompRefund);
					$("#tblPetsforRefund").processTemplate(billComp);

					// Touheed code for radiation sperate
					setTimeout(
							function() {

								var rediRes = $("#radiResAjax").html();

								if (rediRes != undefined) {

									var rediarr = JSON.parse(rediRes
											.decodeSpecialChars());
									console.log(rediarr);

									if (rediarr.listOPDRecComp[0].cmpitmtp == "radiation") {

										var radiationID = rediarr.listOPDRecComp[0].cmpid;

										var ajaxResponse = $(
												"#radiationDivAjax").html();
										var myArray = JSON.parse(ajaxResponse
												.decodeSpecialChars());
										var obj = "";
										for ( var i = 0; i < myArray.radiationList.length; i++) {
											if (myArray.radiationList[i].radiationId == radiationID) {
												obj = myArray.radiationList[i];
												var myJsonString = JSON
														.stringify(obj);
												// Only for radiation print
												$("#radiResAjaxJson").html(
														myJsonString);

												break;
											}
										}

										var tbody = document.getElementById(
												"tblPets")
												.getElementsByTagName("TBODY")[0];
										/* ################################################ */
										var rowR = document.createElement("TR");

										// create table cell 1
										var td1R = document.createElement("TD")

										var strHtml1R = "1.1";
										td1R.innerHTML = strHtml1R.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R = document.createElement("TD")
										var strHtml2R = "Mould";
										td2R.innerHTML = strHtml2R.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R = document.createElement("TD")
										var strHtml3R = obj.mould;
										td3R.innerHTML = strHtml3R;

										// create table cell 4
										var td4R = document.createElement("TD")
										var strHtml4R = "1";
										td4R.innerHTML = strHtml4R;

										// create table cell 5
										var td5R = document.createElement("TD")
										var strHtml5R = obj.mould;
										td5R.innerHTML = strHtml5R;

										// create table cell 6
										var td6R = document.createElement("TD")
										var strHtml6R = "0";
										td6R.innerHTML = strHtml6R;

										rowR.appendChild(td1R);
										rowR.appendChild(td2R);
										rowR.appendChild(td3R);
										rowR.appendChild(td4R);
										rowR.appendChild(td5R);
										rowR.appendChild(td6R)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR);

										/* ############################################### */

										/* ################################################ */

										var rowR1 = document
												.createElement("TR");

										// create table cell 1
										var td1R1 = document
												.createElement("TD")

										var strHtml1R1 = "1.2";
										td1R1.innerHTML = strHtml1R1.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R1 = document
												.createElement("TD")
										var strHtml2R1 = "CT";
										td2R1.innerHTML = strHtml2R1.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R1 = document
												.createElement("TD")
										var strHtml3R1 = obj.ct;
										td3R1.innerHTML = strHtml3R1;

										// create table cell 4
										var td4R1 = document
												.createElement("TD")
										var strHtml4R1 = "1";
										td4R1.innerHTML = strHtml4R1;

										// create table cell 5
										var td5R1 = document
												.createElement("TD")
										var strHtml5R1 = obj.ct;
										td5R1.innerHTML = strHtml5R1;

										// create table cell 6
										var td6R1 = document
												.createElement("TD")
										var strHtml6R1 = "0";
										td6R1.innerHTML = strHtml6R1;

										rowR1.appendChild(td1R1);
										rowR1.appendChild(td2R1);
										rowR1.appendChild(td3R1);
										rowR1.appendChild(td4R1);
										rowR1.appendChild(td5R1);
										rowR1.appendChild(td6R1)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR1);

										/* ############################################### */

										/* ################################################ */

										var rowR2 = document
												.createElement("TR");

										// create table cell 1
										var td1R2 = document
												.createElement("TD")

										var strHtml1R2 = "1.3";
										td1R2.innerHTML = strHtml1R2.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R2 = document
												.createElement("TD")
										var strHtml2R2 = "Planning";
										td2R2.innerHTML = strHtml2R2.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R2 = document
												.createElement("TD")
										var strHtml3R2 = obj.planning;
										td3R2.innerHTML = strHtml3R2;

										// create table cell 4
										var td4R2 = document
												.createElement("TD")
										var strHtml4R2 = "1";
										td4R2.innerHTML = strHtml4R2;

										// create table cell 5
										var td5R2 = document
												.createElement("TD")
										var strHtml5R2 = obj.planning;
										td5R2.innerHTML = strHtml5R2;

										// create table cell 6
										var td6R2 = document
												.createElement("TD")
										var strHtml6R2 = "0";
										td6R2.innerHTML = strHtml6R2;

										rowR2.appendChild(td1R2);
										rowR2.appendChild(td2R2);
										rowR2.appendChild(td3R2);
										rowR2.appendChild(td4R2);
										rowR2.appendChild(td5R2);
										rowR2.appendChild(td6R2)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR2);

										/* ############################################### */

										/* ################################################ */

										var rowR3 = document
												.createElement("TR");

										// create table cell 1
										var td1R3 = document
												.createElement("TD")

										var strHtml1R3 = "1.4";
										td1R3.innerHTML = strHtml1R3.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R3 = document
												.createElement("TD")
										var strHtml2R3 = "QA";
										td2R3.innerHTML = strHtml2R3.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R3 = document
												.createElement("TD")
										var strHtml3R3 = obj.qa;
										td3R3.innerHTML = strHtml3R3;

										// create table cell 4
										var td4R3 = document
												.createElement("TD")
										var strHtml4R3 = "1";
										td4R3.innerHTML = strHtml4R3;

										// create table cell 5
										var td5R3 = document
												.createElement("TD")
										var strHtml5R3 = obj.qa;
										td5R3.innerHTML = strHtml5R3;

										// create table cell 6
										var td6R3 = document
												.createElement("TD")
										var strHtml6R3 = "0";
										td6R3.innerHTML = strHtml6R3;

										rowR3.appendChild(td1R3);
										rowR3.appendChild(td2R3);
										rowR3.appendChild(td3R3);
										rowR3.appendChild(td4R3);
										rowR3.appendChild(td5R3);
										rowR3.appendChild(td6R3)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR3);

										/* ############################################### */

										/* ################################################ */

										var rowR4 = document
												.createElement("TR");

										// create table cell 1
										var td1R4 = document
												.createElement("TD")

										var strHtml1R4 = "1.5";
										td1R4.innerHTML = strHtml1R4.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R4 = document
												.createElement("TD")
										var strHtml2R4 = "Imaging";
										td2R4.innerHTML = strHtml2R4.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R4 = document
												.createElement("TD")
										var strHtml3R4 = obj.imaging;
										td3R4.innerHTML = strHtml3R4;

										// create table cell 4
										var td4R4 = document
												.createElement("TD")
										var strHtml4R4 = "1";
										td4R4.innerHTML = strHtml4R4;

										// create table cell 5
										var td5R4 = document
												.createElement("TD")
										var strHtml5R4 = obj.imaging;
										td5R4.innerHTML = strHtml5R4;

										// create table cell 6
										var td6R4 = document
												.createElement("TD")
										var strHtml6R4 = "0";
										td6R4.innerHTML = strHtml6R4;

										rowR4.appendChild(td1R4);
										rowR4.appendChild(td2R4);
										rowR4.appendChild(td3R4);
										rowR4.appendChild(td4R4);
										rowR4.appendChild(td5R4);
										rowR4.appendChild(td6R4)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR4);

										/* ############################################### */

										/* ################################################ */

										var rowR5 = document
												.createElement("TR");

										// create table cell 1
										var td1R5 = document
												.createElement("TD")

										var strHtml1R5 = "1.6";
										td1R5.innerHTML = strHtml1R5.replace(
												/!count!/g, count);

										// create table cell 2
										var td2R5 = document
												.createElement("TD")
										var strHtml2R5 = "Trt. Amount";
										td2R5.innerHTML = strHtml2R5.replace(
												/!count!/g, count);

										// create table cell 3
										var td3R5 = document
												.createElement("TD")
										var strHtml3R5 = obj.trtct;
										td3R5.innerHTML = strHtml3R5;

										// create table cell 4
										var td4R5 = document
												.createElement("TD")
										var strHtml4R5 = "1";
										td4R5.innerHTML = strHtml4R5;

										// create table cell 5
										var td5R5 = document
												.createElement("TD")
										var strHtml5R5 = obj.trtct;
										td5R5.innerHTML = strHtml5R5;

										// create table cell 6
										var td6R5 = document
												.createElement("TD")
										var strHtml6R5 = "0";
										td6R5.innerHTML = strHtml6R5;

										rowR5.appendChild(td1R5);
										rowR5.appendChild(td2R5);
										rowR5.appendChild(td3R5);
										rowR5.appendChild(td4R5);
										rowR5.appendChild(td5R5);
										rowR5.appendChild(td6R5)
										// add to count variable
										count = parseInt(count) + 1;
										// append row to table
										tbody.appendChild(rowR5);

										/* ############################################### */
									}
								}

							}, 300);

					for ( var i = 0; i < billComp.listOPDRecComp.length; i++) {
						t = t + parseFloat(billComp.listOPDRecComp[i].crt);
						d = d + parseFloat(billComp.listOPDRecComp[i].cdis);
						p = p + parseFloat(billComp.listOPDRecComp[i].cnet);
					}

					$("#tdTotalRefund").html(t);
					$("#tdPayRefund").html(d);
					$("#tdCoPayRefund").html(p);
					$("#tdDiscountRefund").html(discCash);
					$("#tdFinalAmtRefund").html(totalCash);
					$("#tdDiscNarr").html($("#dnarr" + cnt).val());

					$("#receipNOforrefund").html(recId); 
					$("#totalRefundedAmount").html(billComp.refundAmt);
					$("#refundReceiptAmount").val("");
					$("#refundReceiptDetails").val("");
					$("#refundReceiptPaymentMode").val("");
					$("#previouslyRefundedAmount").html("");
				}
			});
}

function saveRefundReceiptDetails(callfrom) {

	var treatId = 0;
	var idopd_rec_comp = 0;
	var idopd_bill = 0;
	var idopd_receipt = 0;
	var flag = false;
	// previous bill history: HelpDesk
	if (callfrom == "OPDIPDDIAG") {
		treatId = $("#treatmentID").val();
	} else {
		var pobj = $("#divPatId").html();
		var pobj1 = eval('(' + pobj + ')');
		treatId = (pobj1.trid);
		idopd_rec_comp = parseInt($.trim($("#id_opd_rec_comp").val()));
		idopd_bill = parseInt($.trim($("#id_opd_bill").val()));
		idopd_receipt = $.trim($("#receipNOforrefund").html());
	}

	if (treatId == "0" || treatId == "" || treatId == "undefined") {
		alert("Error fetching Treatment Id for saveRefundReceiptdetails()...");
		return false;
	}

	var idRefundReceiptDetails = ($.trim($("#idRefundReceiptDetails").val()));
	if (idRefundReceiptDetails == "" || idRefundReceiptDetails == "undefined") {
		// alert("Please select a payment mode...");
		window.location.reload(true);
		return false;
	}

	var refundReceiptPaymentMode = ($
			.trim($("#refundReceiptPaymentMode").val()));
	if (refundReceiptPaymentMode == ""
			|| refundReceiptPaymentMode == "undefined") {
		alert("Please select a payment mode...");
		return false;
	}

	// validation for 0<
	if (($.trim($("#refundReceiptAmount").val())) == ""
			|| ($.trim($("#refundReceiptAmount").val())) == "undefined") {
		alert("Please Enter a valid amount...");
		$("#refundReceiptAmount").focus();
		return false;
	}

	var refundReceiptAmount = parseFloat($.trim($("#refundReceiptAmount").val()));

	if (refundReceiptAmount < 0) {
		alert("Please Enter a valid amount...");
		$("#refundReceiptAmount").focus();
		return false;
	}else if (isNaN(refundReceiptAmount) == true) {
		alert("Please Enter a valid amount...");
		$("#refundReceiptAmount").val("");
		return false;
	}

	// validation for refund amount with Total amount Paid...
	var tdEdTotAmountPaidLabelID = parseFloat($.trim($(
			"#tdEdTotAmountPaidLabelID").html()));

	if (tdEdTotAmountPaidLabelID < 1) {
		alert("No Paid Amount...");
		return false;
	}
	// Total amount refunded till date...
	var refundReceiptTotalAmount = parseFloat($.trim($(
			"#refundReceiptTotalAmount").html()));

	if (idopd_rec_comp > 0 && idopd_bill > 0) {
		var comp_count = $("#comp_count").val();
		// Total paid amount of perticular component 
		var comp_amt = parseFloat($.trim($("#amtRefund" + comp_count).html()));

		if (refundReceiptAmount > comp_amt) {
			alert("Please Enter amount which is less than or equal to Component Amount Paid...");
			$("#refundReceiptAmount").focus();
			return false;
		} else if (refundReceiptAmount <= comp_amt) {
			// Fetch previous refunded amount of the same component
			var inputs = [];
			inputs.push('action=checkPreviousRefundOnSameReceipt');
			inputs.push('treatId=' + $.trim(treatId));
			inputs.push('idopd_rec_comp=' + $.trim(idopd_rec_comp));
			inputs.push('idopd_bill=' + $.trim(idopd_bill));
			inputs.push('idopd_receipt=' + $.trim(idopd_receipt));
			inputs.push('callfrom=' + callfrom);
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : false,
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
					
							var refundBean = eval('(' + ajaxResponse + ')');
							var refundamt = 0.0;
							var totalReceiptRefundAmt = 0.0;
							var finalRemainingValueToRefund = 0.0;
							// Previously refunded amount on component
							refundamt = refundBean.pdAmt;
							// Previously refunded amount on receipt
							totalReceiptRefundAmt = refundBean.onBilDis;
							
							// Final amount of Receipt paid by Patient excluding discount
							var finalReceiptPaidAmount = parseFloat($.trim($("#tdFinalAmtRefund").html()));
							// Remaining value to be refunded on receipt
							finalRemainingValueToRefund = finalReceiptPaidAmount - totalReceiptRefundAmt;
							
							if (refundamt == 0) { // If Nothimg is refunded on this component
								if (refundReceiptAmount > (finalRemainingValueToRefund)) { // If Amount entered is greater than Final Receipt amount
									var r = confirm(totalReceiptRefundAmt +" Rs. are refunded from this Receipt...Now you can refund upto "
											+ (finalRemainingValueToRefund) + " Rs. Do you want to refund this amount ? ");
									if (r == true) {
										$("#refundReceiptAmount").val(finalRemainingValueToRefund);
										refundReceiptAmount = finalRemainingValueToRefund;
										flag = true;
									}else{
										flag = false;
										return false;
									}
								} else {
									flag = true;
								}
								
							} else {
								tdEdTotAmountPaidLabelID -= refundReceiptTotalAmount; // (Actual Total Amount paid by Patient - Total refunded till date)

								if (refundReceiptAmount > (tdEdTotAmountPaidLabelID)) { // If Amount entered is greater than Final Total Amount paid by Patient
									alert("Total Refunded Amount is "+refundReceiptTotalAmount+" Rs. Now you can refund upto "+tdEdTotAmountPaidLabelID+" Rs.");
									$("#refundReceiptAmount").val(tdEdTotAmountPaidLabelID);
									flag = false;
									return false;
								} else {
									if (refundReceiptAmount > (finalRemainingValueToRefund)) {
										if(finalRemainingValueToRefund == 0){
											alert("This Receipt is already refunded...Now you can not refund amount from this Receipt");
											flag = false;
											return false;
										}else{
											var r = confirm(totalReceiptRefundAmt +" Rs. are refunded from this Receipt...Now you can refund upto "
													+ (finalRemainingValueToRefund) + " Rs. Do you want to refund this amount ? ");
											if (r == true) {
												$("#refundReceiptAmount").val(finalRemainingValueToRefund);
												refundReceiptAmount = finalRemainingValueToRefund;
												flag = true;
											}else{
												flag = false;
												return false;
											}
										}
										
									}else{
										var diff = comp_amt - refundamt;
										if (diff <= 0) {
											alert("This Component is already refunded...Now you can not refund amount from this Component");
											flag = false;
											return false;
										} else if (diff >= (refundReceiptAmount)) {
											if (refundReceiptAmount > (finalRemainingValueToRefund)){
												var r = confirm(totalReceiptRefundAmt +" Rs. are refunded from this Receipt...Now you can refund upto "
														+ (finalRemainingValueToRefund) + " Rs. Do you want to refund this amount ? ");
												if (r == true) {
													$("#refundReceiptAmount").val(finalRemainingValueToRefund);
													refundReceiptAmount = finalRemainingValueToRefund;
													flag = true;
												}else{
													flag = false;
													return false;
												}
											}else{
												flag = true;
											}
											
										} else {
											var amt = diff;
											var r = confirm("Some amount from this Component is refunded...Now you can refund upto "
													+ (amt) + " Rs. Do you want to refund this amount ? ");
											if (r == true) {
												$("#refundReceiptAmount").val(amt);
												refundReceiptAmount = amt;
												flag = true;
											}else{
												flag = false;
												return false;
											}
										}
									}
								}
							}
						}
					});
		}
	} else {
		// avoid validation previous bill history: HelpDesk: OPDIPDDIAG
		if (callfrom != "OPDIPDDIAG") {
			// paid refund amount
			if (refundReceiptTotalAmount > tdEdTotAmountPaidLabelID) {
				alert("You can't Refund amount greater than Amount Paid...");
				$("#refundReceiptAmount").val("");
				$('#RefundReceipt').modal('hide');
			} else {
				tdEdTotAmountPaidLabelID -= refundReceiptTotalAmount;

				if (refundReceiptAmount > (tdEdTotAmountPaidLabelID)) {
					alert("Please Enter amount which is less than or equal to Amount Paid...");
					$("#refundReceiptAmount").focus();
					flag = false;
				} else {
					flag = true;
				}
			}
		}else{
			var paidAmt = parseFloat($.trim($(
			"#paidAmt_"+treatId).html()));
			
			var refundAmt = parseFloat($.trim($(
					"#refundAmt_"+treatId).html()));
			if(refundAmt > paidAmt){
				alert("You can't Refund amount greater than Amount Paid...");
				$("#refundReceiptAmount").val("");
				$('#RefundReceipt').modal('hide');
			}else{
				paidAmt -= refundAmt;

				if (refundReceiptAmount > (paidAmt)) {
					alert("Please Enter amount which is less than or equal to Amount Paid...");
					$("#refundReceiptAmount").focus();
					flag = false;
				}else{
					flag = true;
				}
			}
		}
	}
	
	if (flag == true) {
		var refundReceiptNumber = $("#refundReceiptNumber").val();
		var refundReceiptDate = $("#refundReceiptDate").val();
		if (refundReceiptDate != "") {
			var booleanValue = ValidateDateFormat(refundReceiptDate);
			// if booleanValue = false;
			if (!booleanValue) {
				return false;
			}
		}

		var refundReceiptBankName = $("#refundReceiptBankName").val();
		var refundReceiptComment = $("#refundReceiptComment").val();
		var refundReceiptDetails = $("#refundReceiptDetails").val();

		
		var totalRefundAmount=$("#totRefundAmt").val();
		
		var inputs = [];
		inputs.push('action=saveRefundReceiptDetails');
		inputs.push('treatId=' + $.trim(treatId));
		inputs.push('idRefundReceiptDetails=' + $.trim(idRefundReceiptDetails));
		inputs.push('refundReceiptPaymentMode=' + $.trim(refundReceiptPaymentMode));
		inputs.push('refundReceiptAmount=' + $.trim(refundReceiptAmount));
		
		inputs.push('totalRefundReceiptAmount=' + $.trim(totalRefundAmount));
		
		inputs.push('refundReceiptNumber=' + $.trim(refundReceiptNumber));
		inputs.push('refundReceiptDate=' + $.trim(refundReceiptDate));
		inputs.push('refundReceiptBankName=' + $.trim(refundReceiptBankName));
		inputs.push('refundReceiptComment=' + $.trim(refundReceiptComment));
		inputs.push('refundReceiptDetails=' + $.trim(refundReceiptDetails));
		inputs.push('idopd_rec_comp=' + $.trim(idopd_rec_comp));
		inputs.push('idopd_bill=' + $.trim(idopd_bill));
		inputs.push('idopd_receipt=' + $.trim(idopd_receipt));
		inputs.push('callfrom=' + callfrom);
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
				var ajaxResponse = r;
				alert(ajaxResponse);

				// avoid bcoz of previous bill history: HelpDesk: OPDIPDDIAG
				if (callfrom != "OPDIPDDIAG") {

					refreshRefundReceipt();

					if (idRefundReceiptDetails != "0") {
						window.location.reload(true);
					} else {
						fetchRefundReceiptDetails(callfrom);
						$('#RefundReceipt').modal('hide');
					}
				} else {
					// previous bill history: HelpDesk
					fetchPreviousBillingHistoryByPid($("#pid").val());
					$('#RefundReceipt').modal('hide');
				}
			}
		});
	}
}

var refundReceiptCount = 1;
var refundCompTemplate = "{#foreach $T.listRecMaster as listRecMaster}<tr>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-1-1'>{refundReceiptCount}</td>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1'>{$T.listRecMaster.idrm}</td>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1 center' id='payModeCash{refundReceiptCount}'>{$T.listRecMaster.pay_mode}</td>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-1-1 center' id='discCash'>0</td>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1 center' id='totalCash'>{$T.listRecMaster.pdAmt}</td>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1 left' id='IdReceiptCash'>{$T.listRecMaster.card_no}</td>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-1-1 center' id='dateCash'>{$T.listRecMaster.recDate}</td>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1 center' id='bankNameCash'>{$T.listRecMaster.bname}</td>"
		+ "<td style='border-top: none; padding: 1px;' class='col-md-1-1 center'>"
		+ "<input id='{$T.listRecMaster.idrm}' name='checkboxRefundReceipt_{refundReceiptCount}' "
		+ "onclick='uncheckRefundReceipt(this.name)' type='checkbox' value='{refundReceiptCount++}' style='cursor: pointer' />"
		+ "<input type='hidden' id='dnarr' value=''>"
		+ "<input type='hidden' id='dAmt' value='' />"
		+ "<input type='hidden' id='' value='' /></td>" + "</tr>{#/for}";

var refundCompTemplateForRefundPopup = "{#foreach $T.listRecMaster as listRecMaster}<tr>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-1-1'>{refundReceiptCount}</td>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1'>{$T.listRecMaster.idrm}</td>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1 center' id='payModeCash{refundReceiptCount}'>{$T.listRecMaster.pay_mode}</td>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-1-1 center' id='discCash'>0</td>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1 center' id='totalCash'>{$T.listRecMaster.pdAmt}</td>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1 left' id='IdReceiptCash'>{$T.listRecMaster.card_no}</td>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-1-1 center' id='dateCash'>{$T.listRecMaster.recDate}</td>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-2-1 center' id='bankNameCash'>{$T.listRecMaster.bname}</td>"
	+ "<td style='border-top: none; padding: 1px;' class='col-md-1-1 center'>"
	+ "<input id='checkboxRefundReceipt_{$T.listRecMaster.idrm}' name='checkboxRefundReceipt_{refundReceiptCount}' "
	+ "onclick='uncheckRefundReceipt(this.name)' type='checkbox' value='{refundReceiptCount++}' style='cursor: pointer' />"
	+ "<input type='hidden' id='dnarr' value=''>"
	+ "<input type='hidden' id='dAmt' value='' />"
	+ "<input type='hidden' id='' value='' /></td>" + "</tr>{#/for}";

function fetchRefundReceiptDetails(callfrom) {

	var pobj = $("#divPatId").html();
	var pobj1 = eval('(' + pobj + ')');
	var treatId = (pobj1.trid);

	if (treatId == "0" || treatId == "" || treatId == "undefined") {
		alert("Error fetching Treatment Id for fetchRefundReceiptDetails()...");
		return false;
	}

	var inputs = [];
	inputs.push('action=fetchRefundReceiptDetails');
	inputs.push('treatId=' + $.trim(treatId));
	inputs.push('callfrom=' + callfrom);
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
			var ajaxResponse = r;

			$("#RefundReceiptDetailsDiv").html(ajaxResponse);
			var pobj = eval('(' + ajaxResponse + ')');

			refundReceiptCount = 1;
			$("#refundComp").setTemplate(refundCompTemplate);
			$("#refundComp").processTemplate(pobj);

			var refundReceiptTotalAmount = 0;
			for ( var int = 0; int < (pobj.listRecMaster.length); int++) {
				refundReceiptTotalAmount = refundReceiptTotalAmount
						+ parseFloat((pobj.listRecMaster[int].pdAmt));
			}
			$("#refundReceiptTotalAmount").html(refundReceiptTotalAmount);
			if (pobj.listRecMaster.length > 0) {
				$("#refundStatus").addClass("fa fa-star");
			}
		}
	});
}

var currentcheckBoxNameRefundR = "";
function uncheckRefundReceipt(checkBoxName) {

	var i = 1;
	var refundRChkBoxName = checkBoxName.split("_")[0];
	refundRChkBoxName += "_";

	// if same value comes then uncheck
	if (checkBoxName == currentcheckBoxNameRefundR) {
		$("input:checkbox[name=" + (checkBoxName) + "]").prop('checked', false);
		currentcheckBoxNameRefundR = "";
		return false;
	}

	$('#refundComp tr').each(
			function() {

				if (checkBoxName == (refundRChkBoxName + i)) {
					$("input:checkbox[name=" + (refundRChkBoxName + i) + "]")
							.prop('checked', true);
				} else {
					$("input:checkbox[name=" + (refundRChkBoxName + i) + "]")
							.prop('checked', false);
				}
				i++;
			});

	currentcheckBoxNameRefundR = checkBoxName;
}

function closeRefundReceiptDetails() {
	// if (($.trim($("#idRefundReceiptDetails").val())) == "0") {
	window.location.reload(true);
	// }
	// $("#RefundReceipt").hide();
}

function editRefundReceiptDetails(callFrom) {

	$("#idRefundReceiptDetails").val("0");

	var showRefundPopup = true;
	var msg = "";

	var userType = $.trim($("#userType").val());
	if (userType != "admin") {
		msg = "Edit rights are only for Admin...";
		showRefundPopup = false;
	}

	if ($.trim(($("#refundComp").html())) == "" && (showRefundPopup)) {
		msg = "No Data to Edit Refund Receipt...";
		showRefundPopup = false;
	}

	var refundReceiptDetailsCountArray = new Array();
	var refundReceiptDetailsCountValue = 0;

	// count value
	/*if(callFrom == "refundPopup"){
		$('#refundCompForRefund input:checked').each(function() {
			refundReceiptDetailsCountArray.push($(this).val());
			refundReceiptDetailsCountValue = $.trim($(this).val());
		});
	}else{*/
		$('#refundComp input:checked').each(function() {
			refundReceiptDetailsCountArray.push($(this).val());
			refundReceiptDetailsCountValue = $.trim($(this).val());
		});
	//}
	

	if ((refundReceiptDetailsCountArray.length) == 0 && (showRefundPopup)) {
		msg = "Please check the checkbox to Edit Refund Receipt...";
		showRefundPopup = false;
	}

	if (refundReceiptDetailsCountArray.length > 1 && (showRefundPopup)) {
		msg = "Please Select Single Checkbox to Edit...";
		// refreshing the check box...
		$("input[type='checkbox']:checked").each(function() {
			$(this).prop("checked", false);
		});

		showRefundPopup = false;
	}

	setTimeout(function() {
		if (!showRefundPopup) {

			$('#RefundReceipt').removeClass('fade');
			$('#RefundReceipt').modal('hide');

			alert(msg);
			return false;
		}
	}, 10);

	if (showRefundPopup) {
		var ajaxResponse = $("#RefundReceiptDetailsDiv").html();
		var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());

		refundReceiptDetailsCountValue = (refundReceiptDetailsCountValue - 1);
		var myObj1 = myArray.listRecMaster[refundReceiptDetailsCountValue];

		// $("#RefundReceipt").show();

		setTimeout(function() {
			$("#idRefundReceiptDetails").val(myObj1.idrm);
			$("#refundReceiptPaymentMode").val(myObj1.pay_mode);
			$("#refundReceiptAmount").val(myObj1.pdAmt);
			$("#refundReceiptAmount").prop("readonly", true);
			$("#refundReceiptNumber").val(myObj1.card_no);
			$("#refundReceiptDate").val(myObj1.recDate);
			$("#refundReceiptBankName").val(myObj1.bname);
			$("#refundReceiptComment").val(myObj1.narr);
			$("#refundReceiptDetails").val(myObj1.rs);
		}, 300);
		
		var ajaxResponseForRecMaster = $("#cashDivForRecMaster").html();
		var receiptBean = eval('(' + ajaxResponseForRecMaster + ')');
		var recTotal = 0;
		for ( var i = 0; i < receiptBean.listRecMaster.length; i++) {
			recTotal = recTotal + receiptBean.listRecMaster[i].pdAmt;
		}
		count = 1;
		if(callFrom == "OPD"){
			$("#receiptCompforRefund").setTemplate(receiptCompforRefundOPD);
		}else{
			$("#receiptCompforRefund").setTemplate(receiptCompforRefund);
		}
		
		$("#receiptCompforRefund").processTemplate(receiptBean);
		$("#recTotalRefund").html(recTotal);
		//@Code added by Kavita Bhangale @Date - 24 Feb 2017
		
		var ajaxResponseForRefund = $("#RefundReceiptDetailsDiv").html();
		var pobjRefund = eval('(' + ajaxResponseForRefund + ')');
		var refundReceiptTotalAmount = 0;
		for ( var int = 0; int < (pobjRefund.listRecMaster.length); int++) {
			refundReceiptTotalAmount = refundReceiptTotalAmount
					+ parseFloat((pobjRefund.listRecMaster[int].pdAmt));
		}
		
		/*refundReceiptCount = 1;
		$("#refundCompForRefund").setTemplate(refundCompTemplateForRefundPopup);
		$("#refundCompForRefund").processTemplate(pobjRefund);
		$("#refundReceiptTotalAmountOnPopup").html(refundReceiptTotalAmount);*/
		
		$("#receipNOforrefund").html(0);
		$('#tblPetsforRefund tbody').empty();
		
		editReceiptForRefund(myObj1.receipt_id, refundReceiptDetailsCountValue);
		
		setTimeout(function() {
			$("#checkboxRefundReceipt_" + myObj1.idrm).prop("checked", true);
			$("#refundAmtcheckbox" + myObj1.idopd_rec_comp).prop("checked", true);
			$("#ReceiptCounterCountCash__" + myObj1.idopd_rec_comp).css("background-color", "pink");
		}, 500);
	}
}

function printRefundReceipt(callfrom) {

	var receiptNo = 0;
	var counter = 0;
	var bill_Category = $("#bill_category").html();
	valuePrint = bill_Category.split("%");
	printValue = valuePrint[0];

	$('#refundComp input:checked').each(function() {
		receiptNo = $(this).prop('id');
		counter++;
	});

	if (counter == 0) {
		alert("No data to print refund receipt...");
		return false;
	}

	if (receiptNo == 0) {
		alert("Please check the checkbox to print refund receipt...");
		return false;
	}
	var ajaxResponse = $("#divPatId").html();
	var jsObj = eval('(' + ajaxResponse + ')');
	// alert("ajaxResponse..."+ajaxResponse);
	var mName = jsObj.mName;
	var middleName="";
	// return false;
	if (mName === undefined) {
		mName = "";
	}
	if(callfrom=="newOPD")
	{
		middleName=jsObj.mName;
	}
	else
	{
		middleName=jsObj.mn;
	}	
	var patientName = (jsObj.tit) + (jsObj.fn) + " " + (middleName) + " " + (jsObj.ln);
	//alert(patientName);
	var age = $("#pat_age").html();
	var referredTo = ($("#billType").val()).trim();
	var treatmentCount = "";
	var consultantName = "";
	var departmentName = "";
	var patientId = (jsObj.pi);
	var TreatmentId = (jsObj.trid);
	var TokenNo = (jsObj.tn);

	if (referredTo == "opd") {
		if (callfrom == "newOPD") {
			treatmentCount = (jsObj.treatmentCount);
			consultantName = ($("#consult_doc").html()).trim();
			departmentName = (jsObj.dept_name);
		} else {
			treatmentCount = (jsObj.liBM[0].bt);
			consultantName = (jsObj.liBM[0].consFollowup);
			departmentName = (jsObj.liBM[0].dept_name);
		}
	} else if (referredTo == "diagnosis") {
		if (callfrom == "newDIAG") {
			treatmentCount = (jsObj.objTreat.trCount);
			consultantName = (jsObj.objDoc.dn);
			departmentName = "";
		} else {
			treatmentCount = (jsObj.liBM[0].bt);
			consultantName = (jsObj.liBM[0].consFollowup);
			departmentName = "";
		}
	}
	fetchRefundReceiptDetails(referredTo);

	setTimeout(function() {
		window.open("RefundReceiptPrint.jsp?receiptNo=" + receiptNo
				+ "&patientName=" + encodeURIComponent(patientName)
				+ "&patientAge=" + encodeURIComponent(age) + "&patientId="
				+ patientId + "&TokenNo=" + TokenNo + "&printValue=" + printValue + "&referredTo="
				+ referredTo + "&treatmentCount=" + treatmentCount
				+ "&TreatmentId=" + TreatmentId + "&consultantName="
				+ encodeURIComponent(consultantName) + "&departmentName="
				+ encodeURIComponent(departmentName));
	}, 500);
}

// not under functioning
function deleteRefundReceiptDetails() {

	if ($.trim(($("#refundComp").html())) == "") {
		alert("No Data to Edit Refund Receipt...");
		return false;
	}

	var refundReceiptDetailsIDArray = new Array();
	$("input[type='checkbox']:checked").each(function() {
		// id= PK of DB
		refundReceiptDetailsIDArray.push($.trim($(this).attr('id')));
	});

	if ((refundReceiptDetailsIDArray.length) == 0) {
		alert("Please check the checkbox to Edit Refund Receipt...");
		return false;
	}

	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteRefundReceiptDetails');
		inputs.push('refundReceiptDetailsIDArray='
				+ refundReceiptDetailsIDArray);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BillServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				// fetchRefundReceiptDetails();
			}
		});
	}
}

// opd, diagnosis
function fetchPreviousPendingToDeductAP(billType) {

	var opdBillId = $.trim($("#opdBillId").val());
	var inputs = [];
	inputs.push('action=fetchReceiptComponentByOpdBillId');
	inputs.push('billType=' + billType);
	inputs.push('opdBillId=' + opdBillId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 15,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;
					var pobj = eval('(' + ajaxResponse + ')');

					// [Amount_Due = (Amount Paid) - (Previous Pending Amount)]
					var Amount_Due = (parseFloat($("#tdEdTotAmountDueLabelID")
							.html()));

					if (Amount_Due > 0) {
						for ( var int = 0; int < (pobj.listOPDRecComp.length); int++) {
							if ((pobj.listOPDRecComp[int].cname) == "Previous Pending Amount:") {
								Amount_Due = Amount_Due
										- (parseFloat((pobj.listOPDRecComp[int].camt)));
								$("#tdEdTotAmountDueLabelID").html(Amount_Due);
								break;
							}
						}
					} else if (Amount_Due < 0) {
						for ( var int = 0; int < (pobj.listOPDRecComp.length); int++) {
							if ((pobj.listOPDRecComp[int].cname) == "Previous Pending Amount:") {
								Amount_Due = Amount_Due
										+ (parseFloat((pobj.listOPDRecComp[int].camt)));
								$("#tdEdTotAmountDueLabelID").html(Amount_Due);
								break;
							}
						}
					}
				} // success
			});
}


// Code for Common Advance -Kavita Bhangale
function addCommonAdvance(patientid, treatid,rowId) {
	$("#commonAdvancepopup").modal('show');
	fetchCommonAdvanceDetails(patientid, treatid, 'modal',$("#pName"+rowId).html());
}

function closeCommonAdvancePopup() {
	$("#commonAdvancepopup").modal('hide');
}

function addnewCommonAdvance() {
	$("#commonAd_Date").attr("disabled", false);
	$("#commonAd_Time").attr("disabled", false);
	$("#commonAd_Amt").attr("readonly", false);
	$("#commonAd_Narr").attr("readonly", false);

	$("#commonAd_querytype").val("insert");

	$('#commonAd_Time').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 5
	});
	$("#commonAd_Time").attr("readonly", true);
}

// Author---Kavita Bhangale. Date-19-02-2016
function saveCommonAdvanceAmount(callfrom) {
	var patientid = $("#commonAd_patId").val();
	var treatmentid = $("#commonAd_treatId").val();

	var commonAd_Date = $("#commonAd_Date").val();
	var commonAd_Time = $("#commonAd_Time").val();
	var commonAd_Amt = $("#commonAd_Amt").val();
	var commonAd_Narr = $("#commonAd_Narr").val();
	var commonAd_slaveId = $("#commonAd_slaveId").val();
	var commonAd_receipt_type = $("#commonAd_receipt_type").val();
	var commonAd_querytype = $("#commonAd_querytype").val();

	if (commonAd_Date == "") {
		alert("Please select date.");
		return false;
	} else if (commonAd_Time == "") {
		alert("Please select time");
		return false;
	} else if (commonAd_Amt == "") {
		alert("Please Enter Amount.");
		return false;
	} else if (commonAd_Amt == 0) {
		alert("Please Enter Amount.");
		return false;
	}

	var ajaxResponse = $("#commonAdvance").html();
	var pobj = eval('(' + ajaxResponse + ')');

	if (commonAd_receipt_type == "refund" && commonAd_querytype == "insert") {
		var totalamt = 0.0;
		var deductamt = 0.0;
		var remainingamt = 0.0;
		var refund = 0.0;
		for ( var i = 0; i < pobj.CommonAdvanceList.length; i++) {
			if (pobj.CommonAdvanceList[i].transation_flag == "Advance") {
				totalamt = totalamt + pobj.CommonAdvanceList[i].add_amount;
			} else if (pobj.CommonAdvanceList[i].transation_flag == "Payment") {
				deductamt = deductamt
						+ pobj.CommonAdvanceList[i].deducted_amount;
			} else if (pobj.CommonAdvanceList[i].transation_flag == "Refund") {
				refund = refund + pobj.CommonAdvanceList[i].refunded_amount;
			}
		}
		remainingamt = totalamt - deductamt;
		remainingamt = remainingamt - refund;

		if (commonAd_Amt > remainingamt) {
			alert("Amount Entered is Greater than Available Amount! Please check Refund Amount");
			return false;
		}
	} else if (commonAd_receipt_type == "advance"
			&& commonAd_querytype == "insert") {
		for ( var i = 0; i < pobj.CommonAdvanceList.length; i++) {
			if (pobj.CommonAdvanceList[i].transation_flag == "Advance"
					&& pobj.CommonAdvanceList[i].Tflag == "ACTIVE"
					&& pobj.CommonAdvanceList[i].post_flag == "N") {
				alert("Previous Receipt is Open! You can not add new Receipt.");
				$("#commonAd_Date").val("");
				$("#commonAd_Time").val("");
				$("#commonAd_Amt").val("");
				$("#commonAd_Narr").val("");
				$("#commonAd_slaveId").val(0);
				return false;
			}
		}
	}

	var inputs = [];
	inputs.push('action=saveCommonAdvanceAmount');
	inputs.push('patientid=' + patientid);
	inputs.push('treatmentid=' + treatmentid);
	inputs.push('commonAd_Date=' + commonAd_Date);
	inputs.push('commonAd_Time=' + commonAd_Time);
	inputs.push('commonAd_Amt=' + commonAd_Amt);
	inputs.push('commonAd_Narr=' + commonAd_Narr);
	inputs.push('commonAd_slaveId=' + commonAd_slaveId);
	inputs.push('commonAd_receipt_type=' + commonAd_receipt_type);
	inputs.push('commonAd_querytype=' + commonAd_querytype);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			fetchCommonAdvanceDetails(patientid, treatmentid, 'onload');
			$("#commonAd_Date").val("");
			$("#commonAd_Time").val("");
			$("#commonAd_Amt").val("");
			$("#commonAd_Narr").val("");
			$("#commonAd_slaveId").val(0);
			$("#commonAd_querytype").val("insert");
			$("#commonAd_receipt_type").val("advance");
		}
	});
}

var commonAdvanceTemplateForBilling = "<div class='col-sm-12-1'>"
		+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment Count</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Type</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Receipt No</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Add Amount</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Deduct Amount</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Refund Amount</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Balance Amount</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:20px;'><div class='TextFont'>Narration</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:20px;'><div class='TextFont'>Action</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:25px;'><div class='TextFont'>Post & Print</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;padding-right:25px;'><div class='TextFont'>Print Receipt</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='overflow-y:scroll; margin-top:-21px; height: 250px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.CommonAdvanceList as cal}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{comadvcount++}.</td>"
		+ "<td class='col-sm-1-0 center' style='height: 21.5px;'>{$T.cal.trcount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cal.commonAd_Date} {$T.cal.commonAd_Time}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cal.transation_flag}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cal.receiptno}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cal.add_amount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cal.deducted_amount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cal.refunded_amount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cal.remaining_amount}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cal.commonAd_Narr}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "{#if $T.cal.transation_flag == 'Advance' && $T.cal.post_flag == 'N'}"
		+ "<input type='checkbox' name='commonAdcheckbox' id='commonAdcheckbox{$T.cal.cadsid}' value='{$T.cal.cadsid}' />"
		+ "{#else}"
		+ "<input type='checkbox' name='commonAdcheckbox' id='commonAdcheckbox{$T.cal.cadsid}' value='{$T.cal.cadsid}' disabled = 'disabled' />"
		+ "{#/if}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "{#if ($T.cal.transation_flag == 'Advance' || $T.cal.transation_flag == 'Refund') && $T.cal.post_flag == 'N'}"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='COMMONAD' onclick='postAndPrintCommonAdvance({$T.cal.cadsid})' disabled = 'disabled'><i class='fa fa-money' class='edit'></button>"
		+ "{#/if}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "{#if ($T.cal.transation_flag == 'Advance' || $T.cal.transation_flag == 'Refund') && $T.cal.post_flag == 'Y' }"
		+ "<button class='btn btn-xs btn-primary' value='PRINT' onclick='PrintCommonAdvanceRec({$T.cal.cadsid})'><i class='fa fa-print' class='print'></button>"
		+ "{#/if}</td>"+ "</tr>" + "{#/for}" + "</tbody>" + "</table>"
		+ "</div>";

function commaSeparateNumber(val) {
	var x = val;
	x = x.toString();
	var lastThree = x.substring(x.length - 3);
	var otherNumbers = x.substring(0, x.length - 3);
	if (otherNumbers != '')
		lastThree = ',' + lastThree;
	var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
	return res;
}

// Author---Kavita Bhangale. Date-22-02-2016

function fetchCommonAdvanceDetails(patid, treatid, callfrom,patientName) {
	comadvcount = 1;
	var patientid = 0;
	var treatmentid = 0;
	var patName =patientName;
	
	if (callfrom == 'ipd' || callfrom == 'opd' || callfrom == 'diagnosis') {
		var patientobj = $("#divPatId").html();
		var jsObj = eval('(' + patientobj + ')');
		patientid = (jsObj.pi);
		treatmentid = (jsObj.trid);
	} else {
		patientid = patid;
		treatmentid = treatid;
	}
	var inputs = [];
	inputs.push('action=fetchCommonAdvanceDetails');
	inputs.push('patientid=' + patientid);
	inputs.push('treatmentid=' + treatmentid);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "BillServlet",
				timeout : 1000 * 60 * 6,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					
					var ajaxResponse = r;
					var pobj = eval('(' + ajaxResponse + ')');
					$("#commonAdvance").html(ajaxResponse);
					if (callfrom == 'ipd' || callfrom == 'opd'
							|| callfrom == 'diagnosis') {
						$("#commonadamount").html(
								commaSeparateNumber(pobj.totalCAamt));
					} else {
						
						$("#CommonAdvanceDiv").setTemplate(commonAdvanceTemplateForBilling);
						$("#CommonAdvanceDiv").processTemplate(pobj);

						$("#commonAd_patId").val(patientid);
						$("#commonAd_treatId").val(treatmentid);
						$("#patIDSpan").html(patientid);
						$("#patNamSpan").html(patName);

						var totalamt = 0.0;
						var deductamt = 0.0;
						var remainingamt = 0.0;
						var refund = 0.0;
						for ( var i = 0; i < pobj.CommonAdvanceList.length; i++) {
							if (pobj.CommonAdvanceList[i].transation_flag == "Advance") {
								totalamt = totalamt
										+ pobj.CommonAdvanceList[i].add_amount;
							} else if (pobj.CommonAdvanceList[i].transation_flag == "Payment") {
								deductamt = deductamt
										+ pobj.CommonAdvanceList[i].deducted_amount;
							} else if (pobj.CommonAdvanceList[i].transation_flag == "Refund") {
								refund = refund
										+ pobj.CommonAdvanceList[i].refunded_amount;
							}
						}

						remainingamt = totalamt - deductamt;
						remainingamt = remainingamt - refund;
						$("#totalCAdAvaliable").html(
								commaSeparateNumber(remainingamt));
						$("#totalCAdvance").html(commaSeparateNumber(totalamt));
						$("#totalCAdPaid").html(commaSeparateNumber(deductamt));
						$("#totalCAdrefund").html(commaSeparateNumber(refund));
					}
					setTimeout(function(){userAccess();},500);
				}
			});
}

// Author---Kavita Bhangale. Date-22-02-2016
function updateCommonAdvanceAmount() {

	var selectedGroups = new Array();
	$("input[name='commonAdcheckbox']:checked").each(function() {
		selectedGroups.push($(this).val());
	});
	if (selectedGroups.length > 1) {
		alert("Please Select Single Receipt");
		return false;
	} else {
		var commonAdvancediv = $("#commonAdvance").html();

		var jsonBean = eval('(' + commonAdvancediv + ')');
		var myObj;

		for ( var k = 0; k < jsonBean.CommonAdvanceList.length; k++) {
			var id = jsonBean.CommonAdvanceList[k].cadsid;
			if (selectedGroups[0] == id) {
				myObj = jsonBean.CommonAdvanceList[k];
				break;
			}
		}
		$("#commonAd_Date").attr("disabled", false);
		$("#commonAd_Time").attr("disabled", false);
		$("#commonAd_Amt").attr("readonly", false);
		$("#commonAd_Narr").attr("readonly", false);
		$("#commonAd_Time").attr("readonly", true);

		$("#commonAd_Date").val(myObj.commonAd_Date);
		$("#commonAd_Time").val(myObj.commonAd_Time);
		$("#commonAd_Amt").val(myObj.add_amount);
		$("#commonAd_Narr").val(myObj.commonAd_Narr);
		$("#commonAd_slaveId").val(myObj.cadsid);
		$("#commonAd_querytype").val("update");
		$("#commonAd_receipt_type").val("advance");
	}
}

// Author---Kavita Bhangale. Date-24-02-2016
function postAndPrintCommonAdvance(slaveid) {
	// alert(slaveid);
	var postflag = "";
	var details = $("#commonAdvance").html();
	var ajaxResponse = eval('(' + details + ')');
	for ( var i = 0; i < ajaxResponse.CommonAdvanceList.length; i++) {
		if (slaveid == ajaxResponse.CommonAdvanceList[i].cadsid) {
			postflag = ajaxResponse.CommonAdvanceList[i].post_flag;
			break;
		}
	}

	var patid = $("#commonAd_patId").val();
	var patdetails = $("#allPatInfo").html();

	var pat = JSON.parse(patdetails);
	var myobj1;
	for ( var j = 0; j < pat.pl.length; j++) {
		if (patid == pat.pl[j].pi) {
			myobj1 = pat.pl[j];
			break;
		}
	}

	var myobj = JSON.stringify(myobj1);
	var inputs = [];
	inputs.push('action=postCommonAdvanceDetails');
	inputs.push('slaveid=' + slaveid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "BillServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			// alert(r);
			var ajaxResponse = r;

			var advanceobj = JSON.parse(ajaxResponse);
			window.open("CommonAdvanceReceiptPrint.jsp?" + "myobj="
					+ encodeURIComponent(myobj) + "&advanceobj="
					+ encodeURIComponent(ajaxResponse));

			fetchCommonAdvanceDetails(myobj1.objTreat.pi, myobj1.objTreat.ti,
					'onload');
		}
	});
}

function refundCommonAdvanceAmount() {

	var ajaxResponse = $("#commonAdvance").html();
	var pobj = eval('(' + ajaxResponse + ')');

	var totalamt = 0.0;
	var deductamt = 0.0;
	var remainingamt = 0.0;
	var refund = 0.0;
	for ( var i = 0; i < pobj.CommonAdvanceList.length; i++) {
		if (pobj.CommonAdvanceList[i].transation_flag == "Advance") {
			totalamt = totalamt + pobj.CommonAdvanceList[i].add_amount;
		} else if (pobj.CommonAdvanceList[i].transation_flag == "Payment") {
			deductamt = deductamt + pobj.CommonAdvanceList[i].deducted_amount;
		} else if (pobj.CommonAdvanceList[i].transation_flag == "Refund") {
			refund = refund + pobj.CommonAdvanceList[i].refunded_amount;
		}
	}

	remainingamt = totalamt - deductamt;
	remainingamt = remainingamt - refund;
	if (remainingamt == 0) {
		alert("No amount to Refund");
		return false;
	}

	$("#commonAd_Date").attr("disabled", false);
	$("#commonAd_Time").attr("disabled", false);
	$("#commonAd_Amt").attr("readonly", false);
	$("#commonAd_Narr").attr("readonly", false);

	$("#commonAd_Amt").val(remainingamt);
	$("#commonAd_querytype").val("insert");
	$("#commonAd_receipt_type").val("refund");

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; // January is 0!

	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd
	}
	if (mm < 10) {
		mm = '0' + mm
	}
	var today = dd + '/' + mm + '/' + yyyy;
	$("#commonAd_Date").val(today);

	$('#commonAd_Time').datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 5
	});
	$("#commonAd_Time").attr("readonly", true);

	d = new Date();
	// d is "Sun Oct 13 2013 20:32:01 GMT+0530 (India Standard Time)"
	datetext = d.toTimeString();
	// datestring is "20:32:01 GMT+0530 (India Standard Time)"
	// Split with ' ' and we get: ["20:32:01", "GMT+0530", "(India", "Standard",
	// "Time)"]
	// Take the first value from array :)
	datetext = datetext.split(' ')[0];
	datetext = datetext.split(':');
	$("#commonAd_Time").val(datetext[0] + ":" + datetext[1]);
}

function setCommonAdvanceFlag(callfrom) {
	if (callfrom == "select") {
		var selectval = $("#finalPaymentMode").val();
		if (selectval == "CAdvance") {
			$("#payfromCA").attr("checked", true);
		} else {
			$("#payfromCA").attr("checked", false);
		}
	} else {
		if ($("#payfromCA").is(":checked")) {
			$("#finalPaymentMode").val("CAdvance");
		} else {
			$("#finalPaymentMode").val("Select");
		}
	}
}

/** ****pharma details***@author husenbadshah**@since**27/3/2016 */
var phramacounter = 1;
var PharmaTemp = "<table class='table table-striped table-bordered header-fixed cf' style='width: 120%;height:100%;'>"
		+ "<thead class='cf' style='background: white;'>"
		+ "<tr><th style='height: 21.5px;' class='col-md-1 center'><div>#</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Indent ID</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Net Amount</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Discount</div></th>"
		+ "<th style='height: 21.5px;' class='col-md-2 center'><div>Gross Amount</div></th>"
		+ "{#foreach $T as result}"
		+ "<tr>"
		+ "<td class='col-md-1 center table-bordered'>{phramacounter++}</td>"
		+ "<td class='col-md-2 center table-bordered'>{$T.result.indentId}</td>"
		+ "<td class='col-md-2 center table-bordered'>{$T.result.netAmt}</td>"
		+ "<td class='col-md-2 center table-bordered'>{$T.result.less}</td>"
		+ "<td class='col-md-2 center table-bordered'>{$T.result.grossAmt}</td>"
		+ "</td></tr>{#/for}</table>";

/*******************************************************************************
 * @author : Touheed Khan
 * @date : 13-Apr-2016
 * @codeFor : to Send selected Test,Profile and Package from Billing
 ******************************************************************************/
function sendToLab(callfrom) {

	var r = confirm("Are you sure to Send these tests into Lab?");
	if (r == false) {
		return false;
	}

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');
	var tid = pobj1.trid;
	var pid = pobj1.pi;
	var totalbillAmount = 0.0;

	if (callfrom == "opdBill") {
		// total table row or elemnt in billing div
		var trow = [];
		var testlist = [];
		var alreadysended = [];

		// getting lenght of total tr or perticulars present in bill div
		$('#OpdBillPrescription  tr').each(function() {

			var trid = $(this).prop('id');
			trow.push((trid));

		});
		// looping till it get checked pathology test whoes not sended to lab or
		// not Green
		for ( var int = 0; int < (trow.length); int++) {

			var chk = ($("#tdEdCheck" + (trow[int]))).is(':checked');

			// Only checked pathology test
			if (chk == true) {

				// getting type record
				var testType = $("#testType" + trow[int]).val();

				// if its only pathology
				if (testType == "pathology") {

					var labflag = $("#labflag" + trow[int]).val();
					// if labflag N then only send to lab else no
					if (labflag == "N") {

						var msg = $("#Msg" + trow[int]).val();
						var testId = $("#testId" + trow[int]).val();
						var opdBillId = $("#edId" + trow[int]).val();
						var contain = msg + "~" + testId + "~" + opdBillId;

						// adding id,test type and opdbill id into array
						testlist.push(contain);

						var ajaxResponse = $("#iBillMasterList").html();
						var myArray = JSON.parse(ajaxResponse);
						var ObjData = "";
						// loop for searching perticular billid
						for ( var i = 0; i < myArray.liOpd[2].length; i++) {

							if (myArray.liOpd[2][i].id_opd_bill == opdBillId) {
								ObjData = myArray.liOpd[2][i];
							}
						}
						// after getting perticular bill_id using that id we
						// will get Charges of that perticular
						var rate = ObjData.test_rate;
						// parsing it into float
						var myFloat = parseFloat(rate);

						totalbillAmount = totalbillAmount + myFloat;
					} else {
						var testId = $("#testId" + trow[int]).val();
						alreadysended.push(testId);
					}
				}
			}
		}
		// if Pathology test color is green, that means it has been already sent
		if (alreadysended.length > 0) {

			alert("Remove Green color Pathology test becasue,It has been already sent to lab!");
			return false;
		}
		// testlist == 0 means,user not selected any pathology test
		if (testlist.length == 0) {

			alert("Please select At least one Pathology Test!");
			return false;
		}

		var inputs = [];
		inputs.push('action=sendToLabFromOPDBill');
		inputs.push('testlist=' + testlist);
		inputs.push('tid=' + tid);
		inputs.push('pid=' + pid);
		inputs.push('totalbillAmount=' + totalbillAmount);
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
				$("#tblPets tr").remove();
				window.location.reload(true);
			}
		});
	}
}

/*******************************************************************************
 * @author : Touheed Khan
 * @date : 19-Apr-2016
 * @codeFor : checking bill paid/unpaid for lab
 ******************************************************************************/
function checkForLabBillBeforCloaseTreatment(callfrom) {

	if (callfrom == 'opd') {

		var pobj = $("#divPatId").html();
		pobj1 = eval('(' + pobj + ')');
		var tid = pobj1.trid;

		jQuery.ajax({
			async : true,
			type : "POST",
			data : {
				tid : tid,
				action : "checkForLabBillBeforCloaseTreatment",
			},
			url : "BillServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				if (r == "paid") {
					$("#labBillPaidorUnpaid").val("paid");
				} else {
					$("#labBillPaidorUnpaid").val("unpaid");
				}
			}
		});
	}
}

function hospitalPaymentData(treatmentId) {

	var treatmentId = treatmentId;
	var inputs = [];
	if (treatmentId != '0') {
		inputs.push('treatmentId=' + treatmentId);
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					url : "/EhatEnterprise/pharmacy/indentSale/getHospitalPaymentDetailsTreatmentId",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {

					},
					success : function(r) {
						// alert(r);
						setHospitalBillData(r);

					}
				});

		return true;
	} else {
		$("#indentHospitalPaymentDiv").html("");
	}

}

function setHospitalBillData(r) {

	var divContent = "";
	divContent = divContent
			+ "<b>Hospital Payment Details</b><table border=1 class='table table-striped table-bordered header-fixed cf '><thead style='background-color: #D3D3D3;'><tr><th>Amount Received By Hospital</th><th>Amount Paid By Hospital</th><th>Narration </th> <th>Final Date</th><th>Time</th><th>Print</th></thead></tr>";
	if (r.length > 0) {

		for ( var i = 0; i < r.length; i++) {

			divContent = divContent
					+ "<tbody><tr>"
					+ "<td> "
					+ r[i].amountReceive
					+ "</td>  <td>"
					+ r[i].amountBal
					+ "</td>  <td>"
					+ r[i].narration
					+ "</td>  <td id='historyId"
					+ r[i].historyId
					+ "' style='display:none' value='"
					+ r[i].historyId
					+ "' ><td>"
					+ r[i].date
					+ "</td><td>"
					+ r[i].time
					+ "</td><td><a  class='btn btn-xs btn-info' href='/EhatEnterprise/pharmacy/indentSale/printHospitalPaymentReceipt?receiptId="
					+ r[i].historyId
					+ "' target='_blank'>Print</a></td></tr></tbody>";
		}

		divContent = divContent + "</table>";

		$("#indentHospitalPaymentDiv").html(divContent);
	} else {
		$("#indentHospitalPaymentDiv")
				.html(
						divContent
								+ "<tbody><tr><td colspan='6'>No Hospital Payment Received</td></tr></tbody>");
	}
}
/*******************************************************************************
 * @author : Tushar
 * @date : 09-Sept-2016
 * @codeFor : Print Receipt for Comman Advance
 ******************************************************************************/
function PrintCommonAdvanceRec(slaveid) {
	 
		var patid = $("#commonAd_patId").val();
		var patdetails = $("#allPatInfo").html();

		var pat = JSON.parse(patdetails);
		var myobj1;
		for ( var j = 0; j < pat.pl.length; j++) {
			if (patid == pat.pl[j].pi) {
				myobj1 = pat.pl[j];
				break;
			}
		}
		
		var myobj = JSON.stringify(myobj1);
	 	var inputs = [];
		inputs.push('action=printCommonAdvanceRec');
		inputs.push('slaveid=' + slaveid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "BillServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				var ajaxResponse = r;

				var advanceobj = JSON.parse(ajaxResponse);
				
				window.open("CommonAdvanceReceiptPrint.jsp?" + "myobj="
						+ encodeURIComponent(myobj) + "&advanceobj="
						+ encodeURIComponent(ajaxResponse));
			
			}
		});
}

/*******************************************************************************
 * @author : Manisha
 * @date : 07-Sept-2016
 * @codeFor : New Refund Receipt for OPD
 ******************************************************************************/
function setNewRefundReceipt(){
	
	$("#refundReceiptPaymentMode").val("Cash");
    $("#refundReceiptAmount").val("");
	$("#refundReceiptDetails").val("");
	$("#refundReceiptNumber").val("");
	$("#refundReceiptBankName").val("");
	$("#refundReceiptComment").val("");
}


/************
 * @author	: Touheed Khan
 * @date	: 29-Sept-2016
 * @codeFor	: Setting Values for Diagnosis Service bill
 ***********/
function setTypeGroup(id,type){
	
	$("#igi").val(id);
	$("#rowname").val(type);
	//for Print setting values.
	setValForPrint(id,type);
}


/************
 * @author	: Touheed Khan
 * @date	: 30-Sept-2016
 * @codeFor	: setting call from OPD/Diagnosis for refund
 ***********/
function setCallFromForRefund(callFrom){	
	$("#callFromRefund").val(callFrom);
}

/************
 * @author	: Touheed Khan
 * @date	: 28-Oct-2016
 * @codeFor	: Print Changes for pioneer 
 ***********/
function setValForPrint(id,type){
	var repName = "other";
	if(type == "investigation"){
		
		if(id == 1){
			repName = "CT Scan";
		}else if(id == 2){
			repName = "Xray";
		}else if(id == 3){
			repName = "USG";
		}else{
			repName = "other";
		}
		$("#repName").val(repName);
	}else if( type == "pathology"){
		repName = "Pathology";
		$("#repName").val(repName);
	}else{
		$("#repName").val(type);
	}
}
function setDoctorName(){
	var docId = $("#consultDocId").val();
	var trid = $("#treatId").val();
	if(docId == undefined){
		docId = 0;
	}
	if(trid == undefined){
		trid = 0;
	}
	var inputs = [];
	inputs.push('action=getDocName');
	inputs.push('docId=' + docId);
	inputs.push('trid=' + trid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "DoctorServlet",
		timeout : 1000 * 60 * 6,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			var docName = JSON.parse(r);
			$('#consult_doc').text(docName.dn);
			
		}
	});

}


function hideShowPreOPDBillDD(count) {

	var hideShowStatus = $("#hideShowStatus" + count).val();

	if (hideShowStatus == 0) {

		$("#imgupdown" + count).attr('src', "images/up.png");
		$("#patPreOPDBill" + count).show();
		$("#hideShowStatus" + count).val(1);
		 closeTreatmentDetailsOfPatientDD(count);

	} else {
		 
		$("#imgupdown" + count).attr('src', "images/down.png");
		$("#patPreOPDBill" + count).hide();
		$("#hideShowStatus" + count).val(0);
		//closeTreatmentDetailsOfPatient(count,callfrom);

	}
}


function  closeTreatmentDetailsOfPatientDD(patientId ) {
	 //alert("hi");
	//var r = confirm("Do You Want To Close Treatment ??");
	 var ajaxr="";
		jQuery.ajax({
			async 	: true,
			type : "POST",
			/*url  : "ehat/billNoble/closetreatmentdetails",
			data : {
	   "patientId" : patientId*/
			url  : "ehat/billNoble/getPrevPatdetails",
			data : {
	   "patientId" : patientId,
	   "deptId" : 1,
			},
	     timeout : 1000 * 60 * 5,
		   cache : true,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
			  console.log(response);
			  ajaxr = response;
			 // alert(response.listTreatment[0].treatmentId);
			  setTempForInnerLoopDD(response);
		     		//alertify.success(response);
		     		/*resetUlList();
				    getConfigTemp();*/
				 	 
			}
		});
	return ajaxr;
}

 function setTempForInnerLoopDD(r1){
	 //alert("hi");
	 var htm="";
	 for ( var j = 0; j < r1.listTreatment.length;j++) {
		 var date= new Date(r1.listTreatment[j].createdDateTime).toLocaleString();
		  
		 htm=htm+ "<tr id='div"+ r1.listTreatment[j].patientId+"'>";
		 htm=htm	+ "<td style='height: 21.5px;' class='col-md-2 center' class=''>"+ r1.listTreatment[j].treatmentId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.listTreatment[j].opdipdno+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+date+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-3 center' class=''>"+ r1.listTreatment[j].patientId+"</td>";
		 htm=htm+ "<td style='height: 21.5px;' class='col-md-1 center'>";
		 htm=htm+ "<button style='height: 21.5px;' class='btn btn-xs btn-success' onClick='goToOPDPrevBill2("+ r1.listTreatment[j].treatmentId+")'>";
		 htm=htm+ "<i class='fa fa-eye View'></i></button></td>";
		 htm=htm	+ "<input type='hidden' value='"+ r1.listTreatment[j].patientId+"' id='rowCount' /></tr>";
		 
		 
		 $("#patPreOPDBill" + r1.listTreatment[j].patientId).html(htm);
		 $("#td" + r1.listTreatment[j].patientId).show();
		}
	
	 
 }


 function getPreviousTreatmentPatientDD(inputId, callfrom) {
 	var r1="";
 	var usertype = "all";
 	var letter="";
 	/*var sridname="";
 	if (callfrom =="search") {

 	  sridname = $("#sridnamepr").val();
   	  letter   = $("#byId").val();
   	  usertype=sridname;
 	}else{ 
 	    	  
 	    	 sridname = $("#sridnamepr").val();
 	 		 letter=    $("#byName").val();
 	 		 usertype=sridname;
 	}*/
 	
     var findingName = $("#" + inputId).val();
         var inputs = [];
         inputs.push('findingName=' + findingName);
         inputs.push('usertype=' + usertype);
         inputs.push('letter=' + letter);
         inputs.push('deptId=' + 1);
         var str = inputs.join('&');
 	jQuery.ajax({
 		async 	: true,
 		type 	: "POST",
 		data 	: str + "&reqType=AJAX",
  		url 	: "ehat/billNoble/getPreviousTreatmentPatient",
 		 
 		error 	: function() {
 			alert('error');
 		},
 		success : function(r) {
 			ajaxResponse = r;
 			
 			setpatientForTreatmentDD(r);
   		//autoCompTableforpreviousTreatment(r, inputId);
 		}
 	});
 }
 function setpatientForTreatmentDD(r) {
		
		var patPrefix=$("#patPrefix").val();
		var patMiddle=$("#patMiddle").val();
		var patSufix=$("#patSufix").val();
		
		var htm = "<div class='col-sm-12-1'>"
				+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
				+ "<thead>"
				+ "<tr>"
				+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
				+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
				+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Mobile No</div></th>"

				//+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
				+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>UHID</div></th>"
				+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Reg Date</div></th>"

				+ "<th class='col-md-1-1 center' style='height: 21.5px; padding-right: 25px;'><div class='TextFont'>View Treatment</div></th>"
				 
				+ "</tr>"
				+ "</thead>	"
				+ "</table></div>";
	 
	var index = 1;	
	 
	htm =htm+ "<tbody>"	;
	for ( var i = 0; i < r.lstRegviewDto.length;i++) {
		
		var patId= patPrefix + patMiddle + r.lstRegviewDto[i].ptId + patSufix;
		var datetime= new Date(r.lstRegviewDto[i].createdDateTime).toLocaleString();
	 		
			htm= htm
			+ "<tr id='div"+ r.lstRegviewDto[i].ptId+"'>"
			+ "<td style='height: 21.5px;' class='col-md-1 center'>"+index+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-4 '>"+ r.lstRegviewDto[i].patientName+"</td>"
			+ "<td style='height: 21.5px;' class='col-md-2 '>"+ r.lstRegviewDto[i].mobile+"</td>"
			//+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ patId +"</td>"
			+ "<td style='height: 21.5px;' class='col-md-1 center'>"+ r.lstRegviewDto[i].centerPatientId +"</td>"
			+ "<td style='height: 21.5px;' class='col-md-2 center'>"+datetime+"</td>";
			if(r.lstRegviewDto[i].department_id==2){
				htm = htm +	"<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreIPDBill("+ r.lstRegviewDto[i].ptId+")'>";

			}else if(r.lstRegviewDto[i].department_id==3){
				htm = htm +	"<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreDiagnosticBill("+ r.lstRegviewDto[i].ptId+")'>";
			}
			
			else{
				htm= htm +	"<td style='height: 21.5px;' class='col-md-2 center' onclick='hideShowPreOPDBillDD("+ r.lstRegviewDto[i].ptId+")'>";

			}
			htm= htm
			+ "<img src='images/down.png' id='imgupdown"+ r.lstRegviewDto[i].ptId+"' />"
			+ "<input type='hidden' id='hideShowStatus"+ r.lstRegviewDto[i].ptId+"' value='0' /><input type='hidden' id='patientDOB' value='"+ r.lstRegviewDto[i].ptId+"' /></td>"
	 		
			+ "</tr>"
			+ "</tbody></table>"
					+ "<tr id='patPreOPDBill"+ r.lstRegviewDto[i].ptId+"' style='width:0%;float:right'><td style='display:none' id='td"+ r.lstRegviewDto[i].ptId+"'>"
							+ "<table class='table table-bordered table-striped header-fixed cf TextFont' style='Width: 45%; margin-top: 0px; margin-left: 577px;' class='col-md-1 center'>"
								+ "<tbody>"
									+ "<tr>"
									+ "<th style='height: 21.5px;' class='col-md-2 center'>Treatment ID</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Admission no.</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Treatment Start Date</th>"
									+ "<th style='height: 21.5px;' class='col-md-3 center'>Consulting Doctor</th>"
									+ "<th style='height: 21.5px;' class='col-md-1 center'>Action</th>"
									+ "</tr>"
								+ "</tbody>"
							+ "</table>"
						+ "</td></tr>";

	 		index++;
	 
	 }
	$("#containerprevOpd").html(htm);
	$("#container").html(htm);
	//$("#ehatTable").html(htm);
	}
 
 
 function getPreviousTreatmentPatientIPD(inputId, callfrom) {
	 	//var r1="";
	 	var usertype = "all";
	 	var letter="";
	 	/*var sridname="";
	 	if (callfrom =="search") {

	 	  sridname = $("#sridnamepr").val();
	   	  letter   = $("#byId").val();
	   	  usertype=sridname;
	 	}else{ 
	 	    	  
	 	    	 sridname = $("#sridnamepr").val();
	 	 		 letter=    $("#byName").val();
	 	 		 usertype=sridname;
	 	}*/
	 	
	     var findingName = $("#" + inputId).val();
	         var inputs = [];
	         inputs.push('findingName=' + findingName);
	         inputs.push('usertype=' + usertype);
	         inputs.push('letter=' + letter);
	         inputs.push('deptId=' + 2);
	         var str = inputs.join('&');
	 	jQuery.ajax({
	 		async 	: true,
	 		type 	: "POST",
	 		data 	: str + "&reqType=AJAX",
	  		url 	: "ehat/billNoble/getPreviousTreatmentPatient",
	 		 
	 		error 	: function() {
	 			alert('error');
	 		},
	 		success : function(r) {
	 			ajaxResponse = r;
	 			
	 			setpatientForTreatmentDD(r);
	   		//autoCompTableforpreviousTreatment(r, inputId);
	 		}
	 	});
	 }
 
 function hideShowPreIPDBill(count) {

		var hideShowStatus = $("#hideShowStatus" + count).val();

		if (hideShowStatus == 0) {

			$("#imgupdown" + count).attr('src', "images/up.png");
			$("#patPreOPDBill" + count).show();
			$("#hideShowStatus" + count).val(1);
			 closeTreatmentDetailsOfPatientIPD(count);

		} else {
			 
			$("#imgupdown" + count).attr('src', "images/down.png");
			$("#patPreOPDBill" + count).hide();
			$("#hideShowStatus" + count).val(0);
			//closeTreatmentDetailsOfPatient(count,callfrom);

		}
	}
 
 function hideShowPreDiagnosticBill(count) {

		var hideShowStatus = $("#hideShowStatus" + count).val();

		if (hideShowStatus == 0) {

			$("#imgupdown" + count).attr('src', "images/up.png");
			$("#patPreOPDBill" + count).show();
			$("#hideShowStatus" + count).val(1);
			closeTreatmentDetailsOfPatientDiagnostic(count);

		} else {
			 
			$("#imgupdown" + count).attr('src', "images/down.png");
			$("#patPreOPDBill" + count).hide();
			$("#hideShowStatus" + count).val(0);
			//closeTreatmentDetailsOfPatient(count,callfrom);

		}
	}
 
 function  closeTreatmentDetailsOfPatientIPD(patientId ) {
	 //alert("hi");
	//var r = confirm("Do You Want To Close Treatment ??");
	 var ajaxr="";
		jQuery.ajax({
			async 	: true,
			type : "POST",
			/*url  : "ehat/billNoble/closetreatmentdetails",
			data : {
	   "patientId" : patientId*/
			url  : "ehat/billNoble/getPrevPatdetails",
			data : {
	   "patientId" : patientId,
	   "deptId" : 2,
			},
	     timeout : 1000 * 60 * 5,
		   cache : true,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
			  console.log(response);
			  ajaxr = response;
			 // alert(response.listTreatment[0].treatmentId);
			  setTempForInnerLoopDD(response);
		     		//alertify.success(response);
		     		/*resetUlList();
				    getConfigTemp();*/
				 	 
			}
		});
	return ajaxr;
}
 
 function  closeTreatmentDetailsOfPatientDiagnostic(patientId ) {
	 //alert("hi");
	//var r = confirm("Do You Want To Close Treatment ??");
	 var ajaxr="";
		jQuery.ajax({
			async 	: true,
			type : "POST",
			/*url  : "ehat/billNoble/closetreatmentdetails",
			data : {
	   "patientId" : patientId*/
			url  : "ehat/billNoble/getPrevPatdetails",
			data : {
	   "patientId" : patientId,
	   "deptId" : 3,
			},
	     timeout : 1000 * 60 * 5,
		   cache : true,
		   error : function() {
				    alert('error');
			},
		 success : function(response) {
			  console.log(response);
			  ajaxr = response;
			 // alert(response.listTreatment[0].treatmentId);
			  setTempForInnerLoopDD(response);
		     		//alertify.success(response);
		     		/*resetUlList();
				    getConfigTemp();*/
				 	 
			}
		});
	return ajaxr;
}
