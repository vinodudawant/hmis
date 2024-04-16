var count = 1;
var doCount = 0;

// var channelingTemp = " <div style='width: 98%; background-color: #436a9d;
// padding: 1%; font-weight: bold;'> <div style='width: 100%;'> <div
// style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align:
// center;'>#</div> <div style='width: 35%; border: 1px solid #FFF; color: #FFF;
// padding-left: 1%; padding-right: 1%;'>Patient Name</div> <div style='width:
// 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right:
// 1%;text-align: center;'>Patient ID</div> <div style='width: 15%; border: 1px
// solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align:
// center;'>Treatment ID</div> <div style='width: 18%; border: 1px solid #FFF;
// color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Refer
// To</div> </div> </div><div style='width: 100%; border: 1px solid #436a9d;
// overflow-y: scroll;'>{#foreach $T.pl as pl} <div style='width: 100%; height:
// 28px; border-bottom: 1px solid #069;'><div style='width: 6%; height: 23px;
// text-align: center; border-right: 1px solid #069; padding-top:
// 5px;'>{count++}.</div><div style='width: 36%; height: 23px; border-right: 1px
// solid #069; padding-left: 1%; padding-top: 5px;'>{$T.pl.tit} {$T.pl.fn}
// {$T.pl.mn} {$T.pl.ln}</div><div style='width: 16%; height: 23px;
// border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align:
// center;'>{$T.pl.pi}</div><div style='width: 16%; height: 25px; border-right:
// 1px solid #069; padding-left: 1%; padding-top: 3px; text-align:
// center;'>{$T.pl.trid}</div><div style='width: 18%; height: 25px;
// padding-left: 2%; padding-top: 3px; text-align: center;'> <input
// style='font-size: 10px;' type='button' name='referTo' value='REFER TO'
// id='referTo' onclick='setExistingDoctor({$T.pl.pi},{$T.pl.trid})'
// class='edit' /></div></div>{#/for}</div>";
var channelingTemp = "<table	class='datatable table table-bordered table-striped table-condensed cf'	style='margin-bottom: 9px;'>	<thead class='cf'>		<tr>			<th class='col-md-1-1 center' style='height: 21.5px;'><div					class='TextFont'>#</div></th>			<th class='col-md-4-1 center' style='height: 21.5px;'><div					class='TextFont'>Patient Name</div></th>			<th class='col-md-2-1 center' style='height: 21.5px;'><div					class='TextFont'>Patient ID</div></th>			<th class='col-md-2-1 center' style='height: 21.5px;'><div>Treatment ID</div></th>			<th class='col-md-2-1 center' style='height: 21.5px;'><div					class='TextFont'>Refer To</div></th>		</tr>	</thead></table><div class='col-md-12-1'	style='height: 460px; max-height: auto; overflow-y: scroll;'>	<table class='table table-bordered table-striped table-condensed cf'>		<tbody>			{#foreach $T.pl as pl}			<tr>				<td class='col-md-1-1'>{count++}.</td>				<td class='col-md-4-1'>{$T.pl.tit}					{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>				<td class='col-md-2-1'>{$T.pl.pi}</td>				<td class='col-md-2-1'>{$T.pl.trid}</td>				<td class='col-md-2-1'>					<input style='font-size: 10px;' type='button' name='referTo'						value='REFER TO' id='referTo'						onclick='setExistingDoctor({$T.pl.pi},{$T.pl.trid})' class='edit' />				</td>			</tr>			{#/for}		</tbody>	</table></div>";

// var channelingSearchTemp = "<div style='width: 80px;'>Search By:</div> <div
// style='width: 90px; padding-left: 10px;'>Patient Name</div> <div
// style='width: 12%;'><input style='width: 100%; ' name='byName' id='byName'
// type='text' onchange='setSplitId()' class='auto' onkeypress='return
// validatealphabetic(event)' /></div> <div style='padding-left: 10px;
// padding-right: 10px; width: 20px; text-align: center;'>or</div> <div
// style='width: 70px; padding-left: 10px;'>Patient ID</div> <div style='width:
// 12%;'><input style='width: 100%; ' name='byId' id='byId' type='text'
// onkeypress='return validateNumbers(event)' /></div> <div style='width: 80px;
// padding-left: 10px;'><input type='button' value='Search' class='edit'
// onclick= disppatientSearch('Channeling') /></div>";
var channelingSearchTemp = "<div style='font-weight: bold;' class='col-md-1'>Search By:</div><div class='col-md-2'  style='margin-right: -75px;'>Patient Name</div><div style='padding-left: 2%;' class='col-md-2 TextFont'>	<input style='width: 100%;' name='byName' id='byName' type='text'	class='form-control input-SmallText '	onchange='setSplitId()' class='auto'		onkeypress='return validatealphabetic(event)' /></div><div	class='col-md-1'>or</div><div class='col-md-1'>Patient ID</div><div style='padding-left: 2%;' class='col-md-2 TextFont'>	<input style='width: 100%;' name='byId' class='form-control input-SmallText' id='byId' type='text'		onkeypress='return validateNumbers(event)' /></div><div class='col-md-1' style='text-align: center;'>	<input type='button' value='Search' class='edit btn btn-xs btn-primary'		onclick=disppatientSearch( 'Channeling') /></div>";

var channelingDocTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>	<div style='width: 100%;'>	<div		style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>	<div		style='width: 30%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Doctor	Name</div>	<div		style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Specialization	</div>	<div		style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Refer	Fee</div>	<div		style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Hospital	Name</div>	<div		style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Refer	</div>	</div>	</div>	<div style='width: 99.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d;'		id='container'>{#foreach $T.cdl as cdl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div		style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>	<div		style='width: 31%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.cdl.cdn} </div>	<div		style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'> {$T.cdl.ds} </div>	<div		style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'> {$T.cdl.rf}</div>	<div		style='width: 20%; height: 25px;border-right: 1px solid #069; padding-left: 2%; padding-top: 3px;'>	{$T.cdl.hn}</div><div		style='width: 8%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input id='check{count}' type='checkbox'> </div>	</div><input type='hidden' id='cdid{count}' value='{$T.cdl.cid}'>	{#/for}</div>";

var channelingExtDocTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'>	<div style='width: 100%;'>	<div		style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>	<div		style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Doctor	Name</div>	<div		style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Specialization	</div>	<div		style='width: 9%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Refer	Fee</div>	<div		style='width: 27%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Hospital	Name</div>	<div		style='width: 4%; border: 1px solid #FFF; color: #FFF; padding-left: 0%; padding-right: 0%; text-align: center;'>Refer	</div>	</div>	</div>	<div style='width: 99.80%; height: 75%; overflow-y: scroll; border: 1px solid #436a9d;'		id='container'>{#foreach $T.cdl as cdl} <div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div		style='width: 6%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>	<div		style='width: 26%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.cdl.cdn} </div>	<div		style='width: 21%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'> {$T.cdl.ds} </div>	<div		style='width: 10%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'> {$T.cdl.rf}</div>	<div		style='width: 27%; height: 25px;border-right: 1px solid #069; padding-left: 2%; padding-top: 3px;'>	{$T.cdl.hn}</div><div		style='width: 2%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input id='check{count}' type='checkbox'> </div>	</div><input type='hidden' id='cdid{count}' value='{$T.cdl.cid}'>	{#/for}</div>";

//var DoctorTemp = "<div class='col-sm-12-1'>"
//		+ "<table class='table table-bordered table-condensed cf' style='width : 710px; margin-top: 10px;'>"
//		+ "<thead class='cf'>"
//		+ "<tr>"
//		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
//		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Doctor ID</div></th>"
//		+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Prefix</div></th>"
//		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Doctor Name</div></th>"
//		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Refer Fees</div></th>"
//		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
//		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
//		+ "</tr>"
//		+ "</thead>	"
//		+ "</table></div>"
//		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 481px; max-height: auto;'>"
//		+ "<table class='table table-striped table-condensed cf'>"
//		+ "<tbody>"
//		+ "{#foreach $T.cdl.cid as cdl}"
//		+ "<tr>"
//		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
//		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cdl.cid}</td>"
//		+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{$T.cdl.prefix}</td>"
//		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.cdl.cdn}</td>"
//		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cdl.rf}</td>"
//		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
//		+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit' onclick='editDoctor({$T.cdl})'>"
//		+ "<i class='fa fa-edit'></i>"
//		+ "</button>"
//		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
//		+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete' onclick='deleteDoctor({$T.cdl.cid})'>"
//		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>"
//		+ "<input type='hidden' id='cdid{count}' value='{$T.cdl.cid}' />"
//		+ "<input type='hidden' id='refDocPer{count}' value='{$T.cdl.refDocPer}' />"
//		+ "<input type='hidden' id='prefix{$T.cdl.cid}' value='{$T.cdl.prefix}' />"
//		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var DoctorTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 710px; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Doctor ID</div></th>"
	+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Prefix</div></th>"
	+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Doctor Name</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Refer Fees</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 481px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T as cdl}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cdl.channDocId}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cdl.prefix}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.cdl.docName}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.cdl.referFees}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' disabled='disabled' value='EDIT' id='btnEdit' onclick='editDoctor({$T.cdl.channDocId})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' disabled='disabled' value='DELETE' id='btnDelete' onclick='deleteDoctor({$T.cdl.channDocId})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>"
	+ "<input type='hidden' id='cdid{count}' value='{$T.cdl.channDocId}' />"
	+ "<input type='hidden' id='refDocPer{count}' value='{$T.cdl.refDocPer}' />"
	+ "<input type='hidden' id='prefix{$T.cdl.prefix}' value='{$T.cdl.prefix}' />"
	+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var newDocTemp = "<div	style='height: 100%; border: 1px solid #b8b8b8;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3>Add Channeling Doctor:</h3></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor ID'>Doctor ID<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='did' name='did' type='text' placeholder='Doctor ID' style='background-color: #b8b8b8;'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' readonly='readonly' style='margin-left:0%;'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Prefix'>Prefix<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='prefix' class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' onchange=setGender('ehat_patient')>"
		+ "</select></div>"
		//+ "<input id='prefix' name='dname' type='select' placeholder='Prefix' "
		//+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor Name'>Doctor Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='dname' name='dname' type='text' onkeypress='return validatealphabetic(event)' placeholder='Doctor Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Refer Fees'>Refer Fees<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='rfees' name='rfees' type='text' onkeypress='return validateNumbers(event)' placeholder='Refer Fees' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Refer Fees'>Refer Doc %</label>"
		+ "<input id='refDocPer' name='refDocPer' type='text' onkeypress='return validateNumPer(event)' placeholder='Ref Doc %' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='specialization'>specialization</label>"
		+ "<input id='spcl' name='spcl' type='text' onkeypress='return validatealphabetic(event)' placeholder='Specialization' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Hospital Name'>Hospital Name</label>"
		+ "<input id='hname' name='hname' type='text' onkeypress='return validatealphabetic(event)' placeholder='Hospital Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Email Id'>Email Id</label>"
		+ "<input id='email' name='email' type='text' placeholder='Email Id' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Contact No'>Phone No<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='contact' name='contact' type='text' onkeypress='return validateNumbers(event)' placeholder='Phone No' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='15'/></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Mobile No'>Mobile No</label>"
		+ "<input id='mobile' name='mobile' type='text' onkeypress='return validateNumbers(event)' placeholder='Mobile No' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='10'/></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Address'>Address</label>"
		+ "<input id='address' name='address' type='text' onkeypress='return validatealphabetic(event)' placeholder='Address' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"
		
		+"<div style='padding-right: 8px;margin-top:13px;' class='form-group Remove-Padding col-md-12-1'><div class='divide-10'></div><label for='Category' class='TextFont col-md-4-1'>Category</label>"
		+"<div class='col-md-6-1'>"
		+"<div class='row'>"
		+"<div class='col-md-6'><label class='checkbox input-SmallText'>" 
		+"<input type='radio' id='chkIpd' value='ipd' name='typeOfDoctor' checked='checked'> IPD </label></div>"
		+"<div class='col-md-6'><label class='checkbox input-SmallText'>"
		+"<input type='radio' id='chkOpd' value='opd' name='typeOfDoctor'> OPD</label></div>"
		+"<div class='col-md-6'><label style='width: 90px;' class='checkbox input-SmallText'> <input type='radio' id='chkDiagnosis' value='diagnosis' name='typeOfDoctor'> Diagnostics</label></div>"
		+"<div class='col-md-6'><label class='checkbox input-SmallText'> <input type='radio' id='all' value='all' name='typeOfDoctor'> All </label></div></div>"
		+"</div></div>"

		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

var editDocTemp = "<div	style='height: 98%; border: 1px solid #b8b8b8;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3>Edit Channeling Doctor:</h3></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor ID'>Doctor ID<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='did' name='did' type='text' placeholder='Doctor ID' style='background-color: #b8b8b8;'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' readonly='readonly' value='{$T.channDocId}' style='margin-left:7%;'/></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Prefix'>Prefix<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='prefix' class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' value='{$T.prefix}'>"
		+ "</select></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Doctor Name'>Doctor Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='dname' name='dname' type='text' onkeypress='return validatealphabetic(event)' placeholder='Doctor Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' value='{$T.docName}' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Refer Fees'>Refer Fees<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='rfees' name='rfees' type='text' onkeypress='return validateNumbers(event)' placeholder='Refer Fees' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' value='{$T.referFees}' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Refer Fees'>Refer Doc %</label>"
		+ "<input id='refDocPer' name='refDocPer' type='text' onkeypress='return validateNumPer(event)' placeholder='Ref Doc %' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' value='{$T.refDocPer}' style='margin-left:0%;' /></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Specilization'>Specilization</label>"
		+ "<input id='spcl' name='spcl' type='text' onkeypress='return validatealphabetic(event)' placeholder='Specilization' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' value='{$T.specility}' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Hospital Name'>Hospital Name</label>"
		+ "<input id='hname' name='hname' type='text' onkeypress='return validatealphabetic(event)' placeholder='Hospital Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' value='{$T.hospitalName}' style='margin-left:0%;' /></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Email Id'>Email Id</label>"
		+ "<input id='email' name='email' type='text' placeholder='Email Id' value='{$T.email}'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"

		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Phone No'>Phone No<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='contact' name='contact' type='text' onkeypress='return validateNumbers(event)' placeholder='Phone No' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' value='{$T.contactNo}' style='margin-left:0%;' /></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Mobile No'>Mobile No</label>"
		+ "<input id='mobile' name='mobile' type='text' onkeypress='return validateNumbers(event)' placeholder='Mobile No' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' value='{$T.mobileNo}' style='margin-left:0%;' maxlength='10'/></div>"
		
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Address'>Address</label>"
		+ "<input id='address' name='address' type='text' placeholder='Address' value='{$T.address}'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' /></div>"
		
		+"<div style='padding-right: 8px;margin-top:13px;' class='form-group Remove-Padding col-md-12-1'><div class='divide-10'></div><label for='Category' class='TextFont col-md-4-1'>Category</label>"
		+"<div class='col-md-6-1'>"
		+"<div class='row'>"
		+"<div class='col-md-6'><label class='checkbox input-SmallText'>" 
		+"<input type='radio' id='chkIpd' value='ipd' name='typeOfDoctor'> IPD </label></div>"
		+"<div class='col-md-6'><label class='checkbox input-SmallText'>"
		+"<input type='radio' id='chkOpd' value='opd' name='typeOfDoctor'> OPD</label></div>"
		+"<div class='col-md-6'><label style='width: 90px;' class='checkbox input-SmallText'> <input type='radio' id='chkDiagnosis' value='diagnosis' name='typeOfDoctor'> Diagnostics</label></div>"
		+"<div class='col-md-6'><label class='checkbox input-SmallText'> <input type='radio' id='all' value='all' name='typeOfDoctor'> All </label></div></div>"
		+"</div></div>"
		
		+ "<input type='hidden' id='queryType' value='update'></div></div>";


var saveButtonTemp = "<input 	style='font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;'	type='button' value='Save Now' onclick=saveReferToDoc() />";

var addDoctorBtnTemp = '<input onclick="setnewDocTemp()" style="font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;"	type="button" value="Add Doctor" />';

function setAddDoctorBtnTemp() {
	var sample = "";
	$("#AddDoctor").setTemplate(addDoctorBtnTemp);
	$("#AddDoctor").processTemplate(sample);
}

function searchDoctor() {
	var strValue = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	// alert(strValue);
	if (strValue == "" && byId == "") {
		alert("Please Enter Doctor Name Or Doctor Id !");
		return false;
	} else if (strValue != "" && byId != "") {
		alert("Please Search By Either Doctor Name OR Doctor Id !");
		return false;
	} else {
		if (strValue != "") {
			searchBy = "byName";
			value = strValue;
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}
	}

	var inputs = [];

	inputs.push('action=searchDoctor');
	inputs.push('searchBy=' + searchBy);
	inputs.push('value=' + encodeURIComponent(value));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			count = 1;
			ajaxResponse = r;
			$("#channelingDocDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.cdl.length == 0) {
				alert("Doctor Details Not Found");
			} else {
				$("#container").setTemplate(DoctorTemp);
				$("#container").processTemplate(pobj1);
				// alert(strValue);
			}
			userAccess();
		}
	});
}

function editDoctor(cid) {
	// $("#search").html("");
	// $("#AddDoctor").html("");
	setAddDoctorBtnTemp();
	setSaveButtonTemp();
	
	//ajaxResponse = $("#channelingDocDiv").html();
	//myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < ajaxResponse.length; i++) {

		if (ajaxResponse[i].channDocId == cid) {

			myObj1 = ajaxResponse[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj1);

	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	$("#container1").setTemplate(editDocTemp);
	$("#container1").processTemplate(userBean);
	title("ehat_patient");
	setTimeout(function(){
		$("input[name=typeOfDoctor][value='"+myObj1.doctorType+"']").prop("checked",true);
		$("#prefix").val($("#prefix"+cid).val());
	},50);
	
}


function deleteDoctor(cid) {
	var r = confirm("Are You Confirm To Delete Doctor From List ?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteDoctor');
		inputs.push("doctorId=" + cid);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/admin/deletechanneldoctormgmt",
		//	url : "ChannelingServlet",
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

function saveReferToDoc()
{
	var dname = $("#dname").val();
	var rfees = $("#rfees").val();
	var refDocPer = $("#refDocPer").val();
	var prefix = $("#prefix").val();
	var contct =$("#contact").val();
	var email = $("#email").val();
	
	var doctorType = $('input[name=typeOfDoctor]:checked').val();
	
	if(prefix == "select"){
		alert("Select Prefix!!!");
		return false;
	}
	if (dname == "") {
		alert("Doctor Name Must Be Filled Out");
		return false;
	} if (rfees == "") {
		alert("Doctor Refer Fees Must Be Filled Out");
		return false;
	}if (refDocPer > 100 || refDocPer < 0) {
		alert("Reference Percent range is 0-100.");
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(contct)) {
		alert("Please enter valid contact numbers");
		$("#contact").focus();
		return false;
	}
	 if(contct.length < 10 || contct.length > 15 )
		{
		alert("Please Enter Valid Contact No.");
		$("#contact").focus();
		return false;
		}
	 var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (email != "") {
			if (!email.match(mailformat)) {
				alert("You have entered an invalid email address!");
				return false;
			} 
		}
	 
	if(rfees == null || rfees == "" || rfees == undefined){
		rfees = 0;
	}
	if(refDocPer == null || refDocPer == "" || refDocPer == undefined){
		refDocPer = 0;
	}
	
		var inputs = [];
		inputs.push('action=SaveReferToDoc');
		inputs.push('did=' + $("#did").val());
		inputs.push('dname=' + encodeURIComponent(dname));
		inputs.push('rfees=' + encodeURIComponent(parseFloat(rfees)));
		inputs.push('refDocPer=' + encodeURIComponent(parseFloat(refDocPer)));
		inputs.push('prefix=' + encodeURIComponent(prefix));
		inputs.push('spcl=' + encodeURIComponent($("#spcl").val()));
		inputs.push('hname=' + encodeURIComponent($("#hname").val()));
		inputs.push('contact=' + encodeURIComponent($("#contact").val()));
		inputs.push('email=' + encodeURIComponent($("#email").val()));
		inputs.push('mobile=' + encodeURIComponent($("#mobile").val()));
		inputs.push('address=' + encodeURIComponent($("#address").val()));
		inputs.push('queryType=' + $("#queryType").val());
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		inputs.push('doctorType=' + doctorType);
		
//		var obj= inputs;
//		inputs.push("obj=" + obj);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
		//	url : "ChannelingServlet",
			url : "ehat/admin/saverefertodoc",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				// alert(dname);
				ajaxResponse = r;
				alert(ajaxResponse);
				window.location = "ChannelingManagement.jsp";
			}
		});

}

function setSaveButtonTemp() {

	var sample = "";
	$("#saveButton").setTemplate(saveButtonTemp);
	$("#saveButton").processTemplate(sample);
}

function setnewDocTemp() {

	// $("#AddDoctor").html("");
	setSaveButtonTemp();
	var inputs = [];
	inputs.push('action=newDocID');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "ChannelingServlet",
		url : "ehat/admin/setnewDocTemp",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#did").val(ajaxResponse);
		}
	});

	var sample = "";
	$("#container1").setTemplate(newDocTemp);
	$("#container1").processTemplate(sample);
}

function setAutoPatientName(inputID, onload) {
	var resultData = [];
	var findingName = $("#" + inputID).val();
	
	var autoType = '';
	var auto = '';
	if (callFrom == "IPD_OPD_PatientDatabase") {
		auto = 'PatientName';
	} else if (callFrom == "OPDOldPatientDatabase") {
		auto = 'OPDManagementPatient';
	} else if (callFrom == "IPD_BedWardPatientDatabase") {
		auto = 'ipdbedward';
	} else if (callFrom == "IPD_OldPatientDatabase") {
		auto = 'ipdPatient';
	} else if (callFrom == "IPD_Bill_PatientDatabase") {
		auto = 'IPDBillPatient';
	} else if (callFrom == "Diagno_PatientBillDatabase") {
		auto = 'DigonosticPatient';
	} else if (callFrom == "MarkVisit_Database") {
		auto = 'MarkVisitPatient';
	} else if (callFrom == "previousOPDbill") {
		auto = 'PreviousOPDBillPatient';
	} else if (callFrom == "IPD_AdvanceDatabase") {
		auto = 'IPDAdvance';
	} else if (callFrom == "Consentform_Database") {
		auto = 'Consentform';
	} else if (callFrom == "Manage_ReferenceDatabase") {
		auto = 'Manage_Reference';
	} else if (callFrom == "OPDDoctorDesk_Dashboard") {
		auto = 'OPDDoctorDesk';
		autoType = inputID.substring(5);
	} else if (callFrom == "OperationDashboard") {
		auto = 'ManageOperationPatient';
	} else if (callFrom == "OperationSummaryDashboard") {
		auto = 'previousOperation';
	} else if (callFrom == "prevIPD_BillDatabase") {
		auto = 'preIPDBillPatient';
		autoType = 'g';
	} else if (callFrom == "BillingRegister") {
		auto = 'preIPDBillPatient';
		autoType = 'c';
	} else if (callFrom == "Pharmacy_Invoice") {
		auto = 'ipdPatient';
	} else if (callFrom == "CardioAssignTestPatientDatabase") {
		auto = 'CardiologyAssignPatient';
		// Auto Suggetion for Admin Model
	} else if (callFrom == "UserMgmt_Database"
			|| callFrom == "User_Access_Mgmt" || callFrom == "HRMgmt_Database") {
		auto = 'UserName';
	} else if (callFrom == "HallType_Management") {
		auto = 'HallTypeName';
	} else if (callFrom == "BedWard_Management") {
		auto = 'HallName';
	} else if (callFrom == "ChartMgmt_Database") {
		auto = 'ChartName';
	} else if (callFrom == "PhysiotherapyTest") {
		auto = 'PhysioTestName';
	} else if (callFrom == "DentalService_Database") {
		auto = 'DentalService';
	} else if (callFrom == "CasualityService_Database") {
		auto = 'CasualityTestName';
	} else if (callFrom == "OTandIPDservice_Database") {
		auto = 'IpdService';
		testType = $("#testType").val();
		if (testType == "bed") {
			autoType = 'b';
		} else if (testType == "gas") {
			autoType = 'g';
		} else if (testType == "instrument") {
			autoType = 'i';
		}
	} else if (callFrom == "NursingStation_BedSideProcedures") {
		auto = 'IpdService';
		autoType = 'b';
	} else if (callFrom == "NursingStation_GasesMonitors") {
		auto = 'IpdService';
		autoType = 'g';
	} else if (callFrom == "NursingStation_Instruments") {
		auto = 'IpdService';
		autoType = 'i';
	} else if (callFrom == "InvestigationTest") {
		auto = 'Investigation_Test';
	} else if (callFrom == "InvestigationTestGroup") {
		auto = 'Invest_Test_Group';
	} else if (callFrom == "InvestigationBodyPart") {
		auto = 'Invest_Body_Part';
	} else if (callFrom == "prev_databaseForConsentForm") {
		auto = 'prev_databaseForConsentForm';
	} else if (callFrom == "OPD_Appoinment") {
		auto = 'PatientName';
	} else if (callFrom == "Previous_ManualSummary") {
		auto = 'Previous_ManualSummary';
	} else if (callFrom == "Previous_AutoSummary") {
		auto = 'Previous_AutoSummary';
	}else if (callFrom == "Medicine") {
		auto = 'medicine';
	}else if (callFrom == "PreOperativeCheckListMasterDetails") {
		auto = 'PreOperativeCheckList';
	}else if (callFrom == "OTOperationAction") {
		auto = 'PreOperativeCheckList';
	}else if (callFrom == "PreviousDiagno_PatientBillDatabase") {
		auto = 'PreviousDiagno_PatientBillDatabase';
	}else if (callFrom == "ShowTopPatForCertificate") {
		auto = 'ShowTopPatForCertificate';
	}else if (callFrom == "OtherServicesCharges") {
		auto = 'OtherServicesCharges';
	}else if (callFrom == "Anaesthetist_Fee_Management") {
		auto = 'Anaesthetist_Fee_Management';
	}else if (callFrom == "Anaesthetist_Fee_Management") {
		auto = 'Anaesthetist_Fee_Management';
	}else if (callFrom == "Pre-Anaesthetic_Assessment") {
		auto = 'Pre-Anaesthetic_Assessment';
	}//Tushar Code For Visiting Doctor Fee @ 1Feb2017
	else if (callFrom == "Visiting_Doc_Fee_Management") {
		auto = 'Visiting_Doc_Fee_Management';
	}//Tushar Code For Medication Route Master @ 13Feb2017
	else if (callFrom == "routeMaster") {
		auto = 'routeMaster';
	}
	
	/*
	 * else if (callFrom == "OPD_Appoinment") { //alert("in OPDAppoinment's
	 * condition "); auto = 'AutoPatientNameforAppointment'; }
	 */
	
	urls="./ehat/otdata/ManageOperationPatient";
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
				url : urls,
				cache : false,
				error : function() {
					// alert('error');
				},
				success : function(r) {
					
					ajaxResponse = r;//decodeURIComponent(r);
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

					/*
					 * if($("#" + inputID).val() == ""){
					 * $(".typeahead").click(function(e) { e.stopPropagation(); //
					 * This is the preferred method. return false; // This
					 * should not be used unless you do not want }); }
					 */
				}
			});
	function displayResult(item) {
		
		$("#" + inputID).val((item.text).trim());
		//@author : Touheed Khan
		//for channeling doctor in Motivator
		$("#txtDoctorId").val((item.value).trim());
		//@author : Amol Saware
		//for search user in HR module 
		/*var currentPage=window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1,window.location.pathname.lastIndexOf('.jsp'));
		if(currentPage=="HRManagement"){
			searchViewUser('HRDashBoard');
		}*/
	}

}

function setExistingDoctor(pi, ti) {
	// alert(pi);
	var channelingObj = $("#channelingObj").html();
	myArray = JSON.parse(channelingObj);
	for ( var i = 0; i < myArray.pl.length; i++) {
		if (myArray.pl[i].pi == pi) {
			myObj = myArray.pl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	var input = [];
	input.push('action=DisplayExtDoc');
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			window.location.href = "ChannelingRefer.jsp?" + "ajaxResponse="
					+ ajaxResponse + "&pi=" + pi + "&ti=" + ti + "&myObj="
					+ encodeURIComponent(myObj) + "&showSaveBtn=yes";

		}
	});

}

function setExistingDoctorTemp() {
	var input = [];
	input.push('action=DisplayExtDoc');
	
	//var unitId = $("#unitId").val();
	//inputs.push('unitId=' + unitId);
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
//		url : "ehat/admin/setExistingDoctorTemp",
		url : "ehat/admin/setexistingedctortemp1",
		//url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r.chann_docList;
			//JSON.stringify(ajaxResponse);

			$("#channelingDocDiv").html(ajaxResponse);
			pobj = r.chann_docList;
				//eval('(' + ajaxResponse + ')');
		//	 alert(pobj);
			$("#container").setTemplate(DoctorTemp);
			$("#container").processTemplate(pobj);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function setChannelingDoctorTemp() {
	var div1 = $("#div1").html();
	pobj = eval('(' + div1 + ')');
	// alert(div1);
	$("#container").setTemplate(channelingExtDocTemp);
	$("#container").processTemplate(pobj);

}

function setNewDoctor(pi) {
	window.location.href = "ChannelingRefer.jsp?" + "&pi=" + pi;

}

function saveReferTo() {
	// alert($("#Patid").val());
	var myObj = $("#div1").html();
	var parsedObj = JSON.parse(myObj);
	var doc = [];
	// alert(count);
	for ( var i = 0; i < parsedObj.cdl.length; i++) {
		if ($("#check" + (i + 2)).attr("checked")) {
			// alert("Hi from chk");
			doc.push($("#cdid" + (i + 2)).val());

		}

	}

	if (doc.length == 0) {
		alert("Please Select Doctor For Refer");
		return false;
	}
	var inputs = [];
	inputs.push('action=SaveReferTo');
	inputs.push('doc=' + doc);
	inputs.push('Patid=' + $("#Patid").val());
	inputs.push('tid=' + $("#tid").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			alert(ajaxResponse);
			history.go(-1);

		}
	});

}

var setRefByTemp = '<option value="select">select</option>{#foreach $T.cdl as cdl}<option value="{$T.cdl.cid}">{$T.cdl.cdn}</option>{#/for}';

function getRefDoctors() {

	var inputs = [];
	inputs.push('action=getRefDoctors');

	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			prjobj = eval('(' + ajaxResponse + ')');
			$("#refBy").setTemplate(setRefByTemp);
			$("#refBy").processTemplate(prjobj);
		}
	});

}

function setChannelingSearchTemp() {
	// alert("Hi");
	var sample;
	$("#search").setTemplate(channelingSearchTemp);
	$("#search").processTemplate(sample);

	$(".auto").autocomplete("AutoSuggetionServlet?auto=PatientName")

}

function displayChanneling() {

	var input = [];
	input.push('action=DisplayTopPatIPD');
	var str = input.join('&');

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
			$("#channelingObj").html(ajaxResponse);
			patientBean = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(channelingTemp);
			$("#container").processTemplate(patientBean);

		}
	});

}

/** ******** Code by Kavita Bhangale********** */

var searchHospitalTemp = "<div style='width: 80px;'>Search By:</div><div style='width: 100px; padding-left: 10px;'>Hospital Name</div><div style='width: 12%;'><input id='idHospitalName' name='HospitalName' style='width: 100%;'	name='strValue' type='text' /></div><div style='width: 80px; padding-left: 60px;'><input id='searchDiscount' type='button'	value='Search'  class='edit' onclick='searchHospitalDetails()' /></div>";

var HospitalTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 708px; margin-top: 0px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Hospital Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Contact No</div></th>"
		+ "<th class='numeric col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Email ID</div></th>"
		+ "<th class='numeric col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Address</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 425px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.hospitalDetailsDTOList as hospitalDetailsDTOList}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.hospitalDetailsDTOList.hosId}.</td>"
		+ "<td class='col-sm-2-1 left' style='height: 21.5px;'>{$T.hospitalDetailsDTOList.hos_name}</td>"
		+ "<td class='col-sm-1-1 left' style='height: 21.5px;'>{$T.hospitalDetailsDTOList.contact_no}</td>"
		+ "<td class='col-sm-2-1 left' style='height: 21.5px;'>{$T.hospitalDetailsDTOList.email_id}</td>"
		+ "<td class='col-sm-2-1 left' style='height: 21.5px;'>{$T.hospitalDetailsDTOList.address}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit' onclick='editChannelHospital({$T.hospitalDetailsDTOList.hosId})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete' onclick='deleteChannelHospital({$T.hospitalDetailsDTOList.hosId})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button>"
		+ "</td>"
		+ "<input type='hidden' id='hosid{count}' value='{$T.hospitalDetailsDTOList.idchannel_hospital}' />"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var addHoscontentTemp = "<div style='height:98%; border: 0px solid #b8b8b8;max-height: auto;'>"
		+ "<div style='padding-top: 2.5%; padding-left: 8%'><div style=''><h3>Add Channeling Hospital:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Hospital ID:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='hosid' name='hosid' readonly='readonly' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;background-color: gray;'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Hospital Name'>Hospital Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='hosname' name='hosname' type='text' onkeypress='return validatealphabetic(event)' placeholder='Hospital Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='44'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Contact No'>Contact No:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='contactno' name='contactno' type='text' onkeypress='return validateNumbers(event)' placeholder='Contact No' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength='15'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Website'>Website:</label>"
		+ "<input id='webadd' name='webadd' type='text' onkeypress='return validatealphabetic(event)' placeholder='Website' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='44'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Email Id'>Email Id:</label>"
		+ "<input id='emailid' name='emailid' type='text' placeholder='Email Id' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength='44'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Address'>Address:</label>"
		+ "<textarea id='hosadd' name='hosadd' rows='3' cols='28' placeholder='Address' "
		+ "class='col-md-7-1' style='margin-left:0%;' maxlength='250'></textarea></div>"
		+ "<input type='hidden' id='queryType' value='insert' />"
		+ "</div></div>";

var addEditHoscontentTemp = "<div style='height:98%; border: 0px solid #b8b8b8;max-height: auto;'>"
		+ "<div style='padding-top: 2.5%; padding-left: 8%'><div style=''><h3>Edit Channeling Hospital:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Hospital ID:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='hosid' name='hosid' readonly='readonly' onkeypress='return validateNumbers(event)' value='{$T.hosId}'"
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;background-color: gray;'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Hospital Name'>Hospital Name:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='hosname' name='hosname' type='text' onkeypress='return validatealphabetic(event)' placeholder='Hospital Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='44' value='{$T.hos_name}'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Contact No'>Contact No:<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='contactno' name='contactno' type='text' onkeypress='return validateNumbers(event)' placeholder='Contact No' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength='15' value='{$T.contact_no}'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Website'>Website:</label>"
		+ "<input id='webadd' name='webadd' type='text' onkeypress='return validatealphabetic(event)' placeholder='Website' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='44' value='{$T.website_add}'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Email Id'>Email Id:</label>"
		+ "<input id='emailid' name='emailid' type='text' placeholder='Email Id'  value='{$T.email_id}'"
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength='44'/></div>"
		+

		"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Address'>Address:</label>"
		+ "<textarea id='hosadd' name='hosadd' rows='3' cols='28' placeholder='Address' "
		+ "class='col-md-7-1' style='margin-left:0%;' maxlength='250'>{$T.address}</textarea></div>"
		+ "<input type='hidden' id='queryType' value='update' />"
		+ "</div></div>";

function setSearchHospital() {
	var sampleBean = "";
	$("#SearchHospital").setTemplate(searchHospitalTemp);
	$("#SearchHospital").processTemplate(sampleBean);
}

function setHospitalContent() {

	var inputs = [];
	inputs.push('action=newHospitalID');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxresult = r;
			pobj1 = eval('(' + ajaxresult + ')');
			$("#hosid").val(ajaxresult);
		}
	});

	var HospitalContentDetails = "";
	$("#HospitalContent").setTemplate(addHoscontentTemp);
	$("#HospitalContent").processTemplate(HospitalContentDetails);

}

/*
 * @Method : saveHospitalDetail() @Author : Kavita Bhangale @Parameter :
 * HospitalDetailsDTO @Return : boolean @Query : insert @Created Date :
 * 11-sept-2014
 */

function saveHospitaldetails() {

	var name = $("#hosname").val().trim();
	var contct =$("#contactno").val().trim();
	if (name == "") {
		alert("Hospital Name is Mandatory");
		SetFocus("hosname");
		return false;
	}
	if (contct == "") {
		alert("Contact Number is Mandatory");
		SetFocus("contactno");
		return false;
	}
	var contctFormt = /^([0-9])*$/;
	if (!contctFormt.test(contct)) {
		alert("Contact Number should be of digits!");
		SetFocus("contactno");
		return false;
	}

	var website = $("#webadd").val();
	var siteformat = /^\w+([\.]?\w+)*(\.\w{2,3})+$/;
	if (website != "") {
		if (website.match(siteformat)) {
		} else {
			alert("You have entered an invalid website address!");
			SetFocus("webadd");
			return false;
		}
	}

	var inputText = $("#emailid").val();

	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if (inputText != "") {
		if (inputText.match(mailformat)) {
		} else {
			alert("You have entered an invalid email address!");
			SetFocus("emailid");
			return false;
		}
	}

	var hosid = $("#hosid").val();
	var hosname = $("#hosname").val();
	var contactno = $("#contactno").val();
	var webadd = $("#webadd").val();
	var emailid = $("#emailid").val();
	var hosadd = $("#hosadd").val();
	var queryType = $("#queryType").val();

	var inputs = [];
	inputs.push('action=saveChannelHospitaldetails');
	inputs.push('hosid=' + hosid);
	inputs.push('hosname=' + hosname);
	inputs.push('contactno=' + contactno);
	inputs.push('webadd=' + webadd);
	inputs.push('emailid=' + emailid);
	inputs.push('hosadd=' + hosadd);
	inputs.push('querytype=' + queryType);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("Enable to insert data");
		},
		success : function(r) {
			ajaxresponse = r;
			alert(ajaxresponse);
			window.location.reload();
		}
	});
}

function setExistingHospitalTemp() {
	var input = [];
	input.push('action=DisplayExistingChannelHospital');
	var str = input.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#channelingHospitalDiv").html(ajaxResponse);
			result = eval('(' + ajaxResponse + ')');

			$("#HospitalDetails").setTemplate(HospitalTemp);
			$("#HospitalDetails").processTemplate(result);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function editChannelHospital(hosid) {
	ajaxResponse = $("#channelingHospitalDiv").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.hospitalDetailsDTOList.length; i++) {

		if (myArray.hospitalDetailsDTOList[i].hosId == hosid) {

			hosData = myArray.hospitalDetailsDTOList[i];
			break;
		}
	}
	myObject = JSON.stringify(hosData);

	var myEscapedJSONString = (myObject.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	$("#HospitalContent").setTemplate(addEditHoscontentTemp);
	$("#HospitalContent").processTemplate(userBean);
}

function deleteChannelHospital(hosid) {
	var r = confirm("Are You Confirm To Delete Hospital Details ?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteChannelHospital');
		inputs.push("hosid=" + hosid);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ChannelingServlet",
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

function searchHospitalDetails() {

	var hosname = $("#byName").val();
	if (hosname == "" || hosname == null) {
		alert("Please Enter Hospital Name");
		return;
	} else {
		var inputs = [];
		inputs.push('action=searchHospitalDetails');
		inputs.push('hosname=' + hosname);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ChannelingServlet",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.hospitalDetailsDTOList.length == 0) {
					alert("Hospital Details Not Found");
				} else {
					$("#HospitalDetails").setTemplate(HospitalTemp);
					$("#HospitalDetails").processTemplate(pobj1);
				}
				userAccess();
			}
		});
	}
}


function savePreOperationNotes() {
	var preOpNotes = $("#preOpNotes").val();
	var pid = $("#pid").val();
	var tretID = $("#tretID").html();
	var inputs = [];
	inputs.push('action=SavePreOpNote');
	inputs.push('preOpNotes=' + preOpNotes);
	inputs.push('pid=' + pid);
	inputs.push('tretID=' + tretID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
		}
	});
}

function fetchPreOp() {
	var tretID = $("#tretID").html();
	var inputs = [];
	inputs.push('action=FetchPreOpNote');
	inputs.push('tretID=' + tretID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var ajaxResponse = r;
			 pobj = eval('(' + ajaxResponse + ')');
			
			 if(pobj.preOPNote == null){
				 $("#preOpNotes").text("-");
			
			 }else{
				 $("#preOpNotes").val(pobj.preOPNote);
			 }
		
		}
	});
	$("#ConductOfAnaesthia").hide();
	$("#ipdConsentFormJSPHeadDiv").hide();
}

function saveIntraOperationNotes() {
	var intraOpNotes = $("#intraOpNotes").val();
	var pid = $("#pid").val();
	var tretID = $("#tretID").html();
	var inputs = [];
	inputs.push('action=SaveIntraOpNote');
	inputs.push('intraOpNotes=' + intraOpNotes);
	inputs.push('pid=' + pid);
	inputs.push('tretID=' + tretID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
		}
	});
}

function fetchIntraOpPostOp() {
	var tretID = $("#tretID").html();
	var inputs = [];
	inputs.push('action=FetchIntraOpPostOpNote');
	inputs.push('tretID=' + tretID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var ajaxResponse = r;
			 pobj = eval('(' + ajaxResponse + ')');
			 if(pobj.intraOpNote == null){
				 $("#intraOpNotes").text("-");
			
			 }else{
				 $("#intraOpNotes").val(pobj.intraOpNote);
			 }
		}
	});
	$("#ConductOfAnaesthia").hide();
	$("#ipdConsentFormJSPHeadDiv").hide();
}

function printPreAnaethAssmnt()
{
	var anaesID = 0;
	var pid =$("#pid").val();
	var tid =$("#treatmentId").val();
	var tomId = $("#tomId").val();
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
			encodeURIComponent(pid) + "&trId=" + encodeURIComponent(tid)+ "&tomId=" + encodeURIComponent(tomId)+ "&anaesID=" + encodeURIComponent(anaesID));

}

function showprint(callfrom){
	  if(callfrom=="Y"){
	    $("#idPrintPreAnaePrintAss").hide();

	  }else{
	    
	     $("#idPrintPreAnaePrintAss").show();

	  }   
	}
	/*Jitendra 21March2019*/
	function fetchCarePlanNote() {
	var tretID = $("#treatmentId").html();
	var inputs = [];
	inputs.push('action=FetchCarePlanNote');
	inputs.push('tretID=' + tretID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			var ajaxResponse = r;
			 pobj = eval('(' + ajaxResponse + ')');
			
			 if(pobj.intraOpNote == null){
				 $("#carePlanNotes").text("-");
			
			 }else{
				 $("#carePlanNotes").val(pobj.intraOpNote);
			 }
		
		}
	});

}

function saveCarePlanForNusring() {
	var carePlan = $("#carePlanNotes").val();
	var pid = $("#pid").val();
	//var tretID = $("#tid").html();
	//var tretID = $("#tid").val();
	var tretID = $("#treatmentId").html();
	var inputs = [];
	inputs.push('action=SaveCarePlanNote');
	inputs.push('carePlan=' + carePlan);
	inputs.push('pid=' + pid);
	inputs.push('tretID=' + tretID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ChannelingServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {

		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
		}
	});
}

function printPreAnaethAssmnt1()
{
	var anaesID = 0;
	var pid =$("#pId").val();
	var tid =$("#tId").val();
	var tomId = $("#tomId").val();
	var cType =3;


	window.open("PreAnaesthaticAssessmentPrint1.jsp?" + "patID=" + 
			encodeURIComponent(pid) + "&trId=" + encodeURIComponent(tid)+ "&tomId=" + encodeURIComponent(tomId)+ "&anaesID=" + encodeURIComponent(anaesID)+"&cType=" + encodeURIComponent(cType));

}
