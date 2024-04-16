var sr = 1;
var rowCount = 1;
var echo = "";
var echo2d = "";
var echotable = "";

var patientEditTemplate = "<div style='width:100%; height:1%; background-color:#85a7d4;'></div><div id='dispMessage' style='padding-left:2%; color:red; font-size:15px'></div><div style='width:100%; height:99%;'><div id='rightContActual'><div	style='width:98%; background-color:#bfdbff; border:1px solid #39C; padding:1%;'><div style='width:20%;'><form action='PatientServlet?page=update&patID={$T.pi}'	name='frmUpload' id='frmUpload' method='post'	enctype='multipart/form-data'>{#if $T.im!= ''}<img src='{$T.im}' width='130' height='130'	onclick='upload()' name='patImg' id='patImg' />{#/if}{#if $T.im== ''} <img src='images/patientPhoto.jpg' width='60%' height='60%'	onclick='upload()' name='patImg' id='patImg' /> {#/if}<input type='file'	name='file1' /></form></div><div style='width:80%;'><div style='width:100%;'><div style='width:50%;'><div style='width:100%;'><div style='width:43%; padding-left:7%; padding-top:1%;'>PatientID</div><div style='width:42%; padding-right:7%;'><input style='width:100%;background-color: gray;' id='patID' name='patID' type='text' value='{$T.pi}'readonly='readonly'/></div></div><div style='width:100%; padding-top:2%;'><div style='width:43%; padding-left:7%; padding-top:0%;'>First Name	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<select id='title'><option value='Mr.'>Mr.</option>	<option value='Mrs.'>Mrs.</option><option value='Miss.'>Miss.</option><option value='Mast.'>Mast.</option><option value='B/O.'>B/O.</option></select></div><div style='width:42%; padding-right:3%;'><input style='width:100%; border-width: 2px; border-color:activeborder;' id='fName' name='fName' type='text' value='{$T.fn}'onkeypress='return validatealphabetic(event)'/></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width:100%; padding-top:2%;'><div style='width:43%; padding-left:7%; padding-top:1%;'>MiddleName</div><div style='width:42%; padding-right:7%;'><input style='width:100%; border-width: 2px; border-color:activeborder;' id='mName' name='mName' type='text' value='{$T.mn}' onkeypress='return validatealphabetic(event)'/></div></div><div style='width:100%; padding-top:2%;'><div style='width:43%; padding-left:7%; padding-top:1%;'>LastName</div><div style='width:42%; padding-right:3%;'><input style='width:100%; border-width: 2px; border-color:activeborder;' id='lName' name='lNAME' type='text' value='{$T.ln}' onkeypress='return validatealphabetic(event)'/></div><div style='width: 1%; color: red'><b>*</b></div></div></div><div style='width:50%;'><div style='width:100%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>D.O.B</div><div style='width:52%; padding-right:3%;'><input  style='width:100%; border-width: 2px; border-color:activeborder;' id='popup_container2' name='dob' type='text' value='{$T.db}' /></div><div style='width: 1%; color: red'><b></b></div></div><div style='width:100%; padding-top:2%;'><div style='width: 33%; padding-left:7%; padding-top:1%;'>Sex</div><div style='width:53%; padding-right:7%;'><select style='width:100%; border-width: 2px; border-color:activeborder;' id='sex' name='sex'>	<option value='Male'>Male</option><option value='Female'>Female</option></select></div></div><div style='width:100%; padding-top:2%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>Age</div><div style='width:52%; padding-right:3%;'><input style='width:60%; border-width: 2px; border-color:activeborder;' id='age' name='age' type='text' value='{$T.ag}' onkeypress='return validateNumbers(event)' onclick='autoAge()'/><select id='ageType'><option value='Yrs'>Yrs.</option><option value='Months'>Months.</option><option value='Days'>Days.</option></select></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width:100%; padding-top:2%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>Weight</div><div style='width:52%; padding-right:7%;'><input style='width:60%; border-width: 2px; border-color:activeborder;' id='weight' name='weight' type='text' value='{$T.wt}' onkeypress='return validateNumbers(event)' /><select id='wtType'>													<option value='Kg''>kg.</option>												</select></div></div></div></div></div></div><div style='width: 100%;height:700px;'><div style='width:21%;'><div style='width:100%; padding-top:12%;'></div><div style='width:100%; padding-top:12%;'><div style='width:49%;'>Referred By</div><div style='width:50%;'><input type='text' id='refBy'	name='referedBy' style='width:100%; border-width: 2px; border-color:activeborder;' value='{$T.rb}'  onkeypress='return validatealphabetic(event)'/></div></div> <div style='width: 100%; padding-top: 12%;'>	<div style='width: 49%;'>Referred By Mob.</div> <div style='width: 50%;'><input type='text' value='{$T.refByMo}' id='refByMob' name='refByMob' style='width: 100%; border-width: 2px; border-color: activeborder;' 	onkeypress='return validateNumbers(event)' maxlength='10' /></div> </div><div style='width:100%; padding-top:12%;'><div style='width:49%;'>Referred To</div><div style='width:50%;'><input type='text' id='refTo' name='referedTo' style='width:100%; border-width: 2px; border-color:activeborder;' value='{$T.rt}' onkeypress='return validatealphabetic(event)'/></div><div style='width:100%; padding-top:12%;'><div style='width:49%;'>Register Date</div><div style='width:50%;'><input type='text' id='popup_container3' name='popup_container3' style='width:100%; border-width: 2px; border-color:activeborder;' value='{$T.rgDt}' /></div></div></div></div><div style='width:39%;'><div style='width:100%; padding-top:6%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>Address</div><div style='width:52%; padding-right:3%;'><input type='text'	style='width:100%; border-width: 2px; border-color:activeborder;' id='conAdd1' name='conAdd1' value='{$T.a1}'/> <input type='text' style='width:100%; border-width: 2px; border-color:activeborder;' id='conAdd2' name='conAdd2' value='{$T.a2}'/> <input type='text' style='width:100%; border-width: 2px; border-color:activeborder;' id='conAdd3' name='conAdd3' value='{$T.a3}'/></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width:100%; padding-top:6%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>BloodGroup</div><div style='width:53%; padding-right:7%;'><select style='width:100%; border-width: 2px; border-color:activeborder;' id='blood' name='blood'>	<option value=''>SELECT</option>	<option value='A pove'>A +</option>	<option value='A nev'>A -</option>	<option value='B pove'>B +</option>	<option value='B nev'>B -</option>	<option value='AB pove'>AB +</option>	<option value='AB nev'>AB -</option>	<option value='O pove'>O +</option>	<option value='O nev'>O -</option></select></div></div><div style='width:100%; padding-top:6%;'><div style='width:33%; padding-left:7%; padding-top: 1%;'>MobileNo.</div><div style='width: 52%; padding-right:3%;'><div style='width:100%;'><input style='width:100%; border-width: 2px; border-color:activeborder;' id='mobNo' name='mobNo1' type='text' value='{$T.mb}' onkeypress='return validateNumbers(event)'/></div></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width:100%; padding-top:6%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>OfficeNo.</div><div style='width:52%; padding-right:7%;'><div style='width:100%;'><input style='width:100%; border-width: 2px; border-color:activeborder;' id='ofNo'	name='ofNo' type='text' value='{$T.on}' onkeypress='return validateNumbers(event)'/></div></div></div></div><div style='width:40%;'><div style='width:100%; padding-top:6%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>MaritialStatus</div><div style='width:52%; padding-right:7%;'><select style='width:100%; border-width: 2px; border-color:activeborder;' id='radioGroup1' name='radioGroup1'><option value='Married'>Married</option><option value='UnMarried'>UnMarried</option></select></div></div><div style='width:100%; padding-top:6%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>RelativeName</div><div style='width:51%; padding-right:8%;'><input	style='width:100%; border-width: 2px; border-color:activeborder;' id='relNm' name='relNm' type='text' value='{$T.rn}'onkeypress='return validatealphabetic(event)'/></div></div><div style='width:100%; padding-top:6%;'><div style='width:33%; padding-left: 7%; padding-top:1%;'>EmergencyContact No.</div><div style='width:51%; padding-right:3%;'><input	style='width:100%; border-width: 2px; border-color:activeborder;' id='emrNo' name='emrNo' type='text' onkeypress='return validateNumbers(event)' value='{$T.ec}'/></div><div style='width: 1%; color: red'><b>*</b></div></div><div style='width:100%; padding-top:6%;'><div style='width:33%; padding-left:7%; padding-top:1%;'>Note</div><div style='width:51%; padding-right:8%;'><textarea style='width:100%; border-width: 2px; border-color:activeborder;' name='note' id='note' cols='' rows='3'>{$T.sym}</textarea></div></div></div>&nbsp;<div					style='width: 76.5%; float: right; height: 50px; padding-top: 20px; padding-bottom: 50px;'>					<div>Upload file</div>					<form action='' id='fileUploadfrm' name='fileUploadfrm'						enctype='multipart/form-data' method='post'>						<div style='padding-left: 76px;'>							<input type='file' name='fileUp' id='fileUp' size='31' />							&nbsp;&nbsp;&nbsp; <input type='button' value='Upload'								onclick='uploadFile({$T.pi})' /><br>						</div>					</form>					<div style='width: 100%;padding-top:20px;' id='divPatFilesDisp'>										</div><div style='width:100%;height:30px;'>Status:<label id='stat'></label></div><div style='width:100%;height:30px;'>2D-ECHO Done By:<select id='selechoDoc'></select></div><div style='width:100%;height:30px;'>TMT Done By:<select id='seltmtDoc'></select></div>				</div></div></div></div>";

var IPD_DICAdmin = "<div style='width: 103%; padding-left: 0%;'><div style='width: 98%; background-color: #436a9d; padding-bottom: 1%;padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Time</div><div	style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Name of Drug</div><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Strength</div><div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Dose</div><div	style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Fluild OR Drips</div><div	style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 0.5%; padding-right: 0.8%;text-align: center;'>Strength</div><div style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Dose</div><div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Sign</div></div></div></div><div	style='width: 101.5%; height: 210px; overflow-y: scroll; border: 1px solid #436a9d;' id='DRRDiv'>{#foreach $T.tnl as tnl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069; '><div style='width: 3%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 90%; ' type='text'   name='textf id='t{rowCount}' value='{$T.tnl.cut}'/></div><div	style='width: 14.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 90%; ' type='text' name='textfield' class='auto' id='dn{rowCount}' value='{$T.tnl.dn}' /></div><div	style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 90%; ' type='text' name='textfield' id='stren{rowCount}' value='{$T.tnl.stren}' /></div><div	style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 90%; ' type='text' name='textfield' id='dose{rowCount}' value='{$T.tnl.dose}' /></div><div	style='width: 11.5%; height: 23px; border-right: 1px solid #069; padding-left: .5%; padding-top: 3px;text-align: center;'><input style='width: 90%; ' type='text' name='textfield' class='auto' id='fd{rowCount}' value='{$T.tnl.fd}' /></div><div	style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: .5%; padding-top: 3px;text-align: center;'><input style='width: 80%; ' type='text' name='textfield' id='fdq{rowCount}' value='{$T.tnl.fdq}' /></div><div	style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;text-align: center;'><input style='width: 90%; ' type='text' name='textfield' id='cmt{rowCount}' value='{$T.tnl.cmt}' /><input style='width: 90%;' type='hidden' name='textfield' id='tnid{rowCount}' value='{$T.tnl.tnid}'/></div><div style='width: 12%; height: 25px; padding-left: %; padding-top: 3px; text-align: center;' >{$T.tnl.objU.dn}</div></div><input type='hidden'	value='{rowCount++}' id='txtRowCount' name='txtRowCount'/>{#/for}";
var IPD_DRRTempCaseRegistre = "<div style='width: 100%; padding-top: 0%;'>	<div		style='width: 101%; background-color: #436a9d; padding-bottom: 1%; padding-top: 1%; font-weight: bold;'>		<div style='width: 100%;'>			<div				style='width: 4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div>		<div				style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Time</div><div				style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>ClinicalNotes</div>		<div				style='width: 18.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Treatment</div>		<div				style='width: 18.3%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Investigation				Advice</div>			<div				style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>RoundBy</div>		</div>	</div></div><div	style='width: 101%; height: 100%; overflow-y: auto; border: 1px solid #436a9d;'	id='DRRDiv'>	{#foreach $T.drrl as drrl}	<div		style='width: 100%; height: 95px; border-bottom: 1px solid #069;'>		<div			style='width: 4%; height: 90px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}</div>		<div			style='width: 11%; height: 90px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>			<input readonly='readonly'				style='width: 90%;' type='text'				id='t{rowCount}' value='{$T.drrl.tm}' ' />		</div>		<div			style='width: 23.7%; height: 92px; border-right: 1px solid #069; padding-left: 5px; padding-top: 3px;'>			<textarea rows='4' cols='26.5' id='cf{rowCount}' name='textfield'				onkeypress='return validateComma(event)' readonly='readonly'				>{$T.drrl.cn}</textarea>		</div>		<div			style='width: 20%; height: 92px; border-right: 1px solid #069; padding-left: 5px; padding-top: 3px;'>			<textarea rows='4' cols='22' id='tr{rowCount}' name='textfield'				onkeypress='return validateComma(event)' readonly='readonly'				>{$T.drrl.tr}</textarea>		</div>		<div			style='width: 20%; height: 92px; border-right: 1px solid #069; padding-left: 5px; padding-top: 3px;'>			<textarea rows='4' cols='22' id='ia{rowCount}' name='textfield'				onkeypress='return validateComma(event)' readonly='readonly'				>{$T.drrl.ia}</textarea>		</div>		<div			style='width: 14%; height: 90px; padding-left: 1%; padding-top: 3px;'>			{$T.drrl.rb}</div>	</div>	{#/for}</div>";
var IPD_MaterialsAdminTemp = "<div style='width: 99.45%; padding-top: 0%;'><div	style='width: 100%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div> <div style='width: 15%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Date</div><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Time</div><div	style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>MaterialUsed</div><div	style='width: 6.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Quantity</div><div	style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>UsedBy</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%;'>Billable/Replaceable</div></div></div></div><div	style='width: 99.45%; height: 203px; overflow-y: scroll; border: 1px solid #436a9d;' id='MaterialDiv'>{#foreach $T.bcl as bcl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069; '><div	style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;' readonly='readonly' id='srNo'>{sr++}.</div> <div style='width:15.5%;  height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{$T.bcl.dt}</div><div	style='width: 9.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' readonly='readonly'><input	style='width: 90%;' readonly='readonly'; type='text' name='textfield' id='t{rowCount}'	value='{$T.bcl.tm}'   /></div><div	style='width: 26.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;' readonly='readonly';><input	style='width: 90%; ' readonly='readonly'; type='text'	name='textfield' id='mt{rowCount}' value='{$T.bcl.oi.in}'	class='auto'  /></div><div	style='width: 8%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' readonly='readonly';><input	style='width: 90%;' readonly='readonly'; type='text'	name='textfield' id='qty{rowCount}' value='{$T.bcl.qty}'	  /></div><div	style='width: 13%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' readonly='readonly';>{$T.bcl.od.dn}</div><div	style='width: 16%; height: 25px; padding-left: 1%; padding-top: 3px;' readonly='readonly';><input	type='radio' name='Radio{rowCount}' value='B' id='Billable{rowCount}' style='' disabled />Billable<input	type='radio' name='Radio{rowCount}' value='R' id='Replace{rowCount}' style='' disabled /><label id='lblReplacable{rowCount}'>Replaceable</label></div></div><input	type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />{#/for}</div>";
var preBloodChartAdminTemp = "<div style='width: 103%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Random</div><div	style='width: 40%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Treatment</div><div	style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '>                            <div style='width: 5.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 22%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 41.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='o{rowCount}' value='{$T.crl.ot}'	  /></div><div	style='width: 13.7%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preTempChartAdminTemp = "<div style='width: 103%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Temprature</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 21.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 29.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 30%; height: 25px; text-align:center;border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var prePRateChartAdminTemp = "<div style='width: 103%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Pulse Rate</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 21.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 29.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 30%; height: 25px; text-align:center;border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preIntakeChartAdminTemp = "<div style='width: 103%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Intake</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Output</div><div	style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 19.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 19.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='o{rowCount}' value='{$T.crl.ot}'	  /></div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; text-align:center;padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var commonPatInfo = "<div style='width: 100%; height: 1%; background-color: #85a7d4;'></div><div style='width: 100%; height: 99%;'><div id='rightContActual'><div	style='width: 98%; background-color: #bfdbff; border: 1px solid #39C; padding: 1%;'><div style='width: 20%;'>{#if $T.img!= ''}<img src='{$T.img}'	width='130' height='130' name='patImg' id='patImg' />{#/if}{#if $T.img== ''}<img src='images/patientPhoto.jpg' width='50%' height='50%'	name='patImg' id='patImg' /> {#/if}</div><div style='width: 80%;'><div style='width: 100%;'><div style='width: 40%;'><div style='width: 100%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Patient ID</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.pi}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Treatment ID</div><div id='tid' style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.trid}</div></div><div style='width: 100%; padding-top: 2%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Hall No.</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.oBed.hi}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Bed No.</div><div style='width: 43%; padding-right: 7%; color: #002c67;'id='bid'>{$T.otrBed.trBed}</div></div></div><div style='width: 40%;'><div style='width: 100%;'><div	style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>First Name</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.fn}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Last Name</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.ln}</div></div><div style='width: 100%; padding-top: 2%;'><div style='width: 43%; padding-left: 7%; padding-top: 1%; font-weight: bold;'>Treatment Start Date</div><div style='width: 43%; padding-right: 7%; color: #002c67;'>{$T.objTreat.treStart}</div></div></div></div></div></div>";
var operSummaryTemp = "<div style='width: 30%;padding-left:2%'><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>Cath No</div><div style='width: 60%;'><input type='text' id='txtCathNo'	name='txtCathNo'	readonly='readonly' style='width: 95%; background-color: gray; ' value='{$T.obTO.id}'/></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>OHR</div><div style='width: 60%;'><input type='text' id='ohr'	name='ohr'	style='width: 95%; ' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>CHR</div><div style='width: 60%;'><input type='text' id='chr'	name='chr'	style='width: 95%; ' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>OBP</div><div style='width: 60%;'><input type='text' id='obp'	name='obp'	style='width: 95%; ' /></div></div></div><div style='width: 35%;padding-left:3%'><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>CBP</div><div style='width: 60%;'><input type='text' id='cbp'	name='cbp'	style='width: 95%; ' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>Procedure</div><div style='width: 60%;'><input type='text' id='txtProcedure'	name='txtProcedure'	readonly='readonly' style='width: 95%; background-color: gray; ' value='{$T.obTO.pro}' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>Sheet Rmv By</div><div style='width: 60%;'><select		style='width: 95%; '		id='sheet' name='sheet' >			</select></div></div></div><div style='width: 28%;padding-left:5% height: 50%;'><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>OP Date</div><div style='width: 60%;'><input type='text' id='popup_container3'	name='inDate'	readonly='readonly' style='width: 95%; background-color: gray;' value='{$T.obTO.dt}' /></div><div style='width: 1%; color: red'><b></b></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>In Time</div><div style='width: 60%;'><input type='text' id='inTime'	name='inTime'	readonly='readonly' style='width: 95%;  background-color: gray; background-color: gray;' value='{$T.obTO.st}' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>Out Time</div><div style='width: 60%;'><input type='text' id='outTime'	name='outTime'	readonly='readonly' style='width: 95%;  background-color: gray;' value='{$T.obTO.et}' /></div></div></div><input type='hidden' id='opId' value='{$T.obTO.oi}' />";
var invest = "{#foreach $T.tlist as li}<div style='border-bottom: 1px solid #85a7d4;padding-top: 7px;'  class='GridborderRight'  id='id{j++}'>{$T.li.tname}</div>{#foreach $T.li.listTreatmentTests as rl}<div style='border-bottom: 1px solid #85a7d4;padding-top: 7px;width: 9%;'  class='GridborderRight' ><input style='width: 80%;border-width: 2px; border-color: activeborder;' type='text' name='textfield' id='test{count++}' value='{$T.rl.test_report}'/></div>{#/for} {#/for}<input type='text' style='visibility:hidden; ' id='count' value='{--count}'>";
var editOperSummaryTemp = "{#foreach $T.tosl as tosl} <div style='width: 30%;padding-left:2%'><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>Cath No</div><div style='width: 60%;'><input type='text' id='txtCathNo'	name='txtCathNo'	readonly='readonly' style='width: 95%; background-color: gray; ' value='{$T.tosl.oi}'/></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>OHR</div><div style='width: 60%;'><input type='text' id='ohr'	name='ohr'	style='width: 95%; ' value='{$T.tosl.oh}' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>CHR</div><div style='width: 60%;'><input type='text' id='chr'	name='chr'	style='width: 95%; ' value='{$T.tosl.ch}' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>OBP</div><div style='width: 60%;'><input type='text' id='obp'	name='obp'	style='width: 95%; ' value='{$T.tosl.ob}' /></div></div></div><div style='width: 35%;padding-left:3%'><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>CBP</div><div style='width: 60%;'><input type='text' id='cbp'	name='cbp'	style='width: 95%; ' value='{$T.tosl.cb}' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>Procedure</div><div style='width: 60%;'><input type='text' id='txtProcedure'	name='txtProcedure'	readonly='readonly' style='width: 95%; background-color: gray; ' value='{$T.tosl.pro}' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>Sheet Rmv By</div><div style='width: 60%;' id='sheath'></div></div></div><div style='width: 28%;padding-left:5% height: 50%;'><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>OP Date</div><div style='width: 60%;'><input type='text' id='popup_container3'	name='inDate'	readonly='readonly' style='width: 95%; background-color: gray;' value='{$T.tosl.od}' /></div><div style='width: 1%; color: red'><b></b></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>In Time</div><div style='width: 60%;'><input type='text' id='inTime'	name='inTime'	readonly='readonly' style='width: 95%;  background-color: gray; background-color: gray;' value='{$T.tosl.it}' /></div></div><div style='width: 80%; padding-top: 5%;'><div style='width: 32%; padding-right: 6%;'>Out Time</div><div style='width: 60%;'><input type='text' id='outTime'	name='outTime'	readonly='readonly' style='width: 95%;  background-color: gray;' value='{$T.tosl.ot}' /></div></div></div>{#/for}<input type='hidden' id='opId' value='' />";
var editEchoStudyTemp = "<div style='width: 98%; padding: 2%; padding-right: none;'><div style='width: 100%;'><div	style='width: 100%; font-size: 24px; text-align: center; font-weight: bold;'>2-D ECHO & COLOR DOPPLER STUDY</div></div></div><div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 14%; text-align: left; padding-left: 2px; float: left; font-weight: bold;'>Patient Name:-&nbsp</div><div id='pname' style='width: 80%; float: left;'>{$T.fn}&nbsp{$T.mn}&nbsp{$T.ln}</div><div style='width: 12%; text-align: right; padding-left: 52.5%; float: left; font-weight: bold;'>Age:-&nbsp&nbsp</div><div style='width: 12%; float: left;' id='age'>{$T.ag}</div></div><div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 10%; text-align: left; padding-left: 2px; float: left; font-weight: bold;'>Ref By:-&nbsp</div><div style='width: 20%; float: left;'  id='refby' >{$T.rb}</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold;'>Date:- <input id='date' name='date' type='text' onclick='setCalander()' value='{$T.ed}' ></div></div>	<div style='visibility: hidden'><input type='text' id='tid' name='tid' value='{$T.eti}'></div><div style='width: 100%; height: 115px;'><div	style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>2-D ECHO SHOWS:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='echoShows' rows='5' cols='90' name='echoShows'  >{$T.es}</textarea></div></div><div style='width: 100%; height: 65px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>DOPPLER STUDY:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='doppler_study' rows='2' cols='90'	name='doppler_study' >{$T.ds}</textarea></div></div><div style='width: 100%; height: 175px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>CONCLUSSION:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='conclusions' rows='8' cols='90' name='conclusions' >{$T.cn}</textarea></div></div><div style='width: 100%; padding-left: 90%;'>";
var echoStudyTestTable = "<table style='border: 1px solid;' cellpadding='0'	cellspacing='0'><tr><td align='center' style='border: 1px solid;'>Value</td><td align='center' style='border: 1px solid;'>Velocity</td><td align='center' style='border: 1px solid;'>Peak Gradient</td><td align='center' style='border: 1px solid;'>Mean Gradient</td><td align='center' style='border: 1px solid;'>Regurge</td></tr>{#foreach $T.esl as esl}<tr><td width='15%'  ><input style='border: 1px solid; text-align:center; '  type='text' name='' value='{$T.esl.ty}' style='width: 100%; text-align:center; border: 0.2px solid;' id='type{count}'></td><td><input type='text' name='' value='{$T.esl.vel}' style='width: 100%; border: 0.2px solid; text-align:center;' id='MVVel{count}'></td><td><input type='text' name='' value='{$T.esl.peak}' style='width: 100%; border: 0.2px solid; text-align:center;' id='MVPeak{count}'></td><td><input type='text' name='' value='{$T.esl.mean}' style='width: 100%; border: 0.2px solid; text-align:center;' id='MVMean{count}'></td><td><input type='text' name='' value='{$T.esl.regu}' style='width: 100%;   border: 0.2px solid; text-align:center;' id='MVRegurge{count++}'></td></tr>{#/for}";
var editAngioContent = "<div style='width: 100%; padding-top: 15px; height: 50px;'><div style='width: 12%; text-align: left; padding-left: 2px; float: left; font-weiht: bold;'>Patient Name:-</div><div style='width: 38%; float: left;' id='pname'>{$T.al[0].pn}</div><div style='width: 8%; text-align: left; padding-left: 90px; float: left; font-weight: bold;'>Age:-&nbsp;&nbsp;</div> <div style='width: 30px;' id='age'>{$T.al[0].ag}</div><div style='width: 40%; padding-top: 10px; text-align: left; padding-left: 20px; float: right; font-weight: bold; padding-top: 5px;'>Date:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' name='date' id='date' value='{$T.al[0].dt}' onclick='setCalander()'></div><div style='width: 12%; text-align: left; padding-left: 2px; float: left; font-weight: bold; padding-top: 7px;'>Ref By:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div><div style='width: 20%; float: left; padding-top: 7px;' id='rb'>{$T.al[0].rb}</div></div><div id='my' style='width: 100%; padding-top: 2px; height: 50px;' ><div	style='width: 50%; text-align: left; padding-left: 2px; float: left; font-weight: bold; padding-top: 10px;'>Register Cath No.:-&nbsp&nbsp<input text='text' name='Rcathno' id='Rcathno' value='{$T.al[0].rcn}' ></div><div	style='width: 40%; text-align: left; padding-left: 2px; float: right; font-weight: bold; padding-top: 10px;'>Cath No.:-&nbsp&nbsp<input style='background: lightgray;' readonly='readonly' name='cathno' id='cathno' value='{$T.al[0].cn}'></div></div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left; padding-top: 5%;'><textarea style='border: 0.2px solid;' class='' id='description' rows='12' cols='110' name='description'>{$T.al[0].ds}</textarea></div><div style='width: 100%; height: 45px; padding-top: 3%;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Impression:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='impression' rows='1' cols='93' name='impression'>{$T.al[0].im}</textarea></div></div><div style='width: 100%; padding-top: 15px; height: 20px; font-size: 14px; font-weight: bold; padding-top: 5%;'><div style='width: 50%; text-align: left; padding-left: 2px; float: left;'>Dr.S.M.Roplekar</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right;'>Dr.Mrs.K.S.Roplekar</div></div><div style='width: 100%; padding-top: px; height: 5px; font-size: 14px; font-weight: bold;'><div	style='width: 50%; text-align: left; padding-left: 2px; float: left;'>MD(Med)DM(Card)DNB(Card)</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right;'>MD(Med)</div></div><div style='width: 100%; padding-top: 10px; height: 5px; font-size: 14px; font-weight: bold;'><div style='width: 50%; text-align: left; padding-left: 2px; float: left;'>Interventional	Cardiologist</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right;'>Cardiologist</div></div><div style='width: 100%; padding-top: 10px; height: 5px;'><div style='width: 100%; text-align: left; padding-left: 2px; float: left; padding-top: 5%;'>Note:-(Kindly	note that Angio / PTCA  Record will be saved only for 1 month on Hard disc)</div></div><input type='hidden' id='queryType' name='queryType' value='update' /><input type='hidden' id='agpID' name='agpID' value='{$T.al[0].aid}' />";
var dispDoctorReg = "<option value='select'>Select Doctor</option>{#foreach $T.dl as dl}<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";



function caseRegpatDetail(trid){
	// alert(trid);
	var shiftingdate="";
	var inputs = [];
	inputs.push('trid=' + trid);
	inputs.push('action=caseRegpatDetail');
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
			
			$("#category").html("<b> Category:</b> &nbsp;<b>"+pobj1.crli[0].ct+"</b>");
			$("#dtAdmission").html("<b> Date Of Admission:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>"+pobj1.crli[0].ad+"</b>");
			
			if(pobj1.crli[0].st==undefined){
			$("#status").html("<b> Status:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Private</b>");
			}else{
				$("#status").html("<b> Status:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>"+pobj1.crli[0].st+"</b>");
			}
			
			
			if(pobj1.crli[0].dd==undefined){
				$("#dscdt").html("<b> Date Of Discharge:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b></b>");
				}else{
					$("#dscdt").html("<b> Date Of Discharge:</b> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>"+pobj1.crli[0].dd+"</b>");
				}
			
			
			for(var i=1;i<pobj1.crli.length;i++){
				shiftingdate=shiftingdate+","+pobj1.crli[i].sd;
				}
			
			if(shiftingdate==",undefined,undefined,undefined"||shiftingdate==",undefined,undefined,undefined,undefined"||shiftingdate==",undefined,undefined"){
				$("#dtShifting").html("<b> Date Of Shifting:</b>&nbsp;&nbsp;&nbsp;<b></b>");
						}else{
							$("#dtShifting").html("<b> Date Of Shifting:</b>&nbsp;&nbsp;&nbsp;<b>"+shiftingdate+"</b>");
						}
			
		}
	});
}
function printAllOrder() {
	myObj = JSON.parse($("#pinfo").html());
	var inputs = [];
	inputs.push('action=fetchPatAllOrders');
	inputs.push('trid=' + myObj.trid);
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
					// alert(ajaxResponse);
					$("#myobj").html(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					var orderObject = window.open('', ' ', '');
					for ( var i = 0; i < pobj1.pl.length; i++) {
						orderObject.document
								.writeln('<div style="width: 100%; text-align: center;"><b	style="font: "Times New Roman", Times, serif; font-size: 25px">Roplekar	/ Ruby Heart Care Center</b></div>');
						orderObject.document
								.writeln('<div	style="text-align: center; padding-top: 10px; padding-bottom: 5px; width: 100%;"><b	style="font: "Times New Roman", Times, serif; font-size: 20px">ORDER FORM</b></div>');
						orderObject.document
								.writeln('<div style="text-align: center; width: 100%;"><b	style="font: "Times New Roman", Times, serif; font-size: 15px">ENTER DATE, TIME AND SIGN ALL ENTRIES LEGIBLE</b></div>');
						orderObject.document
								.writeln('<div style="text-align: center; padding-bottom: 12px; width: 100%;"><b style="font: "Times New Roman", Times, serif; font-size: 15px">ALL ORDERS MUST BE RENEWED IN 24 HOURS</b></div>');
						orderObject.document
								.writeln('<div style="width: 100%; font-size: 15px"><table width="100%" border="1" cellpadding="0" cellspacing="0"><tr style="height: 30px;"><td width="10%" align="center">DATE</td><td width="90%" align="left" style="padding-left: 10px;">'
										+ pobj1.pl[i].objom.date
										+ '<div style="float: right; width: 50%">Patient Name :&nbsp;&nbsp;'
										+ pobj1.pl[i].fn
										+ '&nbsp;'
										+ pobj1.pl[i].mn
										+ '&nbsp;'
										+ pobj1.pl[i].ln
										+ '</div></td></tr></table>');
						orderObject.document
								.writeln('<table width="100%" border="1" cellpadding="0" cellspacing="0"><tr style="height: 30px;"><td width="10%" align="center">Sr.</td><td width="50%" align="center" style="padding-left: 10px;">DRUGES	& DOSES :</td><td width="20%" align="center">SIGN.</td><td width="20%" align="center">REMARKS</td></tr>');
						var rw = 0;
						for ( var j = 0; j < pobj1.pl[i].objom.ocodrli.length; j++) {
							j++;
							orderObject.document
									.writeln('<tr style="height: 25px;"><td  align="center">'
											+ j--
											+ '</td><td>&nbsp;'
											+ pobj1.pl[i].objom.ocodrli[j].drdo
											+ '</td><td>&nbsp;'
											+ pobj1.pl[i].objom.ocodrli[j].sign
											+ '</td><td>&nbsp;'
											+ pobj1.pl[i].objom.ocodrli[j].rmrk
											+ '</td></tr>');
							rw = j;
						}
						var totRow = pobj1.pl[i].objom.ocodrli.length;
						if (totRow < 15) {
							rw++;
							var remRow = 15 - totRow;
							for ( var j = 0; j < remRow; j++) {
								orderObject.document
										.writeln('<tr style="height: 25px;"><td  align="center">'
												+ ++rw
												+ '</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>');
							}
						}
						orderObject.document
								.writeln('<tr style="height: 26px;"><td>&nbsp;</td><td style="padding-left: 10px;" colspan="3">STAT DOSES :</td></tr>');
						for ( var k = 0; k < pobj1.pl[i].objom.ocostli.length; k++) {
							orderObject.document
									.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="3">&nbsp;'
											+ pobj1.pl[i].objom.ocostli[k].stdo
											+ '</td></tr>');
							rw1 = k;
						}
						var totRow1 = pobj1.pl[i].objom.ocostli.length;
						if (totRow1 < 5) {
							rw1++;
							var remRow1 = 5 - totRow1;
							for ( var j = 0; j < remRow1; j++) {
								orderObject.document
										.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="3">&nbsp;</td></tr>');
							}
						}
						orderObject.document
								.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="3">&nbsp;</td></tr>');
						orderObject.document
								.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="3" style="padding-left: 10px;">INVESTIGATIONS ADVISED :</td></tr>');
						orderObject.document
								.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="3"><textarea rows="7" cols="3"	style="width: 90%;font-weight: bold;" id="txtIadv">'
										+ pobj1.pl[i].objom.invest
										+ '</textarea></td></tr>');
						orderObject.document
								.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="3" style="padding-left: 10px;">REFERRAL, ADVICE & REMARKS :</td></tr>');
						orderObject.document
								.writeln('<tr style="height: 25px;"><td>&nbsp;</td><td colspan="3"><textarea rows="6" cols="3"	style="width: 90%;font-weight: bold;" id="txtRefAdv">'
										+ pobj1.pl[i].objom.readrmrk
										+ '</textarea></td></tr></table></div>');
					}
					orderObject.document.close();
					orderObject.focus();
					orderObject.print();
					orderObject.close();
				}
			});
};

function printDischargeSummary() {
	myObj = JSON.parse($("#pinfo").html());
	patID = myObj.pi;
	treatID = myObj.trid;
	var inputs = [];
	inputs.push('action=getDischargeSummary');
	inputs.push('patID=' + patID);
	inputs.push('treatID=' + treatID);
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
					pobj = eval('(' + ajaxResponse + ')');
					var patNM = pobj.pl[0].ln + " " + pobj.pl[0].fn + " "
							+ pobj.pl[0].mn;
					var treAdvAtDischarge = "Drug List:" + "<br />";
					for ( var k = 0; k < pobj.pl[0].liOrdCdrugs.length; k++) {
						treAdvAtDischarge = treAdvAtDischarge
								+ pobj.pl[0].liOrdCdrugs[k].drdo + " "
								+ pobj.pl[0].liOrdCdrugs[k].sign + " "
								+ pobj.pl[0].liOrdCdrugs[k].rmrk + "<br />";
					}
					treAdvAtDischarge += "<br />Stat Doses:";
					for ( var z = 0; z < pobj.pl[0].ocs.length; z++) {
						treAdvAtDischarge = treAdvAtDischarge
								+ pobj.pl[0].ocs[z].stdo + "<br />";
					}
					treAdvAtDischarge = treAdvAtDischarge
							+ "\nInvestigation Advised:<br />"
							+ pobj.pl[0].objom.invest + "<br />"
							+ "\nInvestigation Advised:<br />"
							+ pobj.pl[0].objom.readrmrk + "<br />";
					var WindowObject = window.open('', ' ', '');
					WindowObject.document
							.writeln('<html><body> <strong><h2>Discharge Information</h2></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

					WindowObject.document
							.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Name of the Patient</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
									+ patNM
									+ ' </td><td  width="25%" style="border: solid 1px;padding-left: 10px;" align="left">Reg. No.</td><td width="20%" style="border: solid 1px;padding-left: 10px;" align="left" >'
									+ pobj.pl[0].pi + ' </td></tr>');
					WindowObject.document
							.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Age</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
									+ pobj.pl[0].ag
									+ ' </td><td  style="border: solid 1px;padding-left: 10px;" align="left">Sex</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
									+ pobj.pl[0].sx + ' </td></tr>');
					WindowObject.document
							.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Date of Admission</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
									+ pobj.pl[0].objTreat.treStart
									+ ' </td><td  style="border: solid 1px;padding-left: 10px;" align="left">Date of Discharge</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
									+ pobj.pl[0].objTreat.treEnd
									+ ' </td></tr>');
					WindowObject.document
							.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Incharge Dr./unit</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
									+ 'Dr.S M Roplekar'
									+ ' </td><td  style="border: solid 1px;padding-left: 10px;" align="left">Ref. by</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
									+ pobj.pl[0].objTreat.rb + ' </td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Diagnosis</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ pobj.pl[0].otd.st + '</div> </td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Risk Factors</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ pobj.pl[0].otd.rf + '</div> </td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Complications</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ pobj.pl[0].otd.cm + ' </div></td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Presenting Symptoms</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ pobj.pl[0].otd.ps + ' </div></td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Clinical Findings</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ pobj.pl[0].otd.cf.split("\n").join(
											"<br />") + '</div> </td></tr>');
					WindowObject.document
							.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;" align="left">Investigation</td><td colspan="3" style="border: solid 1px;" align="left" ><table border="1" cellpadding="0" cellspacing="0" width="100%" style="border-color: lightgray;"><tr height="25"><td align="center">Sr. No.</td><td align="center">Test Name</td><td align="center">Test Date</td><td align="center">Test Result</td><td align="center">Test Count</td></tr>');
					for ( var k = 0; k < pobj.pl[0].liT.length; k++) {
						k++;
						WindowObject.document
								.writeln('<tr height="20"><td align="center">'
										+ k--
										+ '</td><td style="padding-left: 10px;">'
										+ pobj.pl[0].liT[k].tname
										+ '</td><td style="padding-left: 10px;">'
										+ pobj.pl[0].trt[k].time
										+ '</td><td style="padding-left: 10px;">'
										+ pobj.pl[0].trt[k].test_report
										+ '</td><td style="padding-left: 10px;">'
										+ pobj.pl[0].trt[k].test_count
										+ '</td></tr>');
					}
					WindowObject.document.writeln('</table> </td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Special Investigation</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ pobj.pl[0].otd.si.split("\n").join(
											"<br />") + '</div> </td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Treatment Given</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ pobj.pl[0].treatmentGiven.split("\n")
											.join("<br />")
									+ '</div> </td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Condition At Discharge</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ pobj.pl[0].cn.split("\n").join("<br />")
									+ '</div> </td></tr>');
					WindowObject.document
							.writeln('<tr height="130px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Treatment Advised At Discharge</td><td colspan="3" style="border: solid 1px;" align="left" ><div style="width: 98%;padding: 1%;">'
									+ treAdvAtDischarge + '</div> </td></tr>');

					WindowObject.document.writeln('</table><body></html>');
					WindowObject.document.close();
					WindowObject.focus();
					WindowObject.print();
					WindowObject.close();
				}

			});
}

function printInvestChart() {
	myObj = JSON.parse($("#pinfo").html());
	patID = myObj.pi;
	treatID = myObj.trid;
	var inputs = [];
	inputs.push('action=PrintInvestChart');
	inputs.push('tid=' + treatID);
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
					chartPrintBean = eval('(' + ajaxResponse + ')');
					if (chartPrintBean.crl.length == 0) {
						alert("Chart Not Prepared...");
						return false;
					}
					var pinfo = $("#pinfo").html();
					pinfo = eval('(' + pinfo + ')');
					var WindowObject = window.open('', ' ', '');
					WindowObject.document.writeln('<html><body>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-left: 2%; text-align: center;"		id="SRBill"><h1>ROPLEKAR HEART CARE CENTER</h1>	<b>160-161,Tilak Nagar,Veer Sawarkar Chowak,Aurangabad-431005.</b><br></br> <b>Ph. (0240) 2335002,2321941 </b></div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-left: 2%; text-align: center;"		id="SRBill"><h1>Daily Investigation Chart</h1></div>');
					var dtYY = 0;
					for ( var t = 0; t < chartPrintBean.crl.length; t++) {
						if (dtYY == 0 || dtYY != chartPrintBean.crl[t].dt) {
							WindowObject.document
									.writeln("<p><div style='width: 95%; float: left; padding-top: 5%;padding-bottom: 5%;'><div style='width: 70%; float: left;'><div style='width: 100%; float: left;'>	<div	style='width: 23%; float: left; padding-left: 7%; padding-top: 1%; '>Name:</div><div	style='width: 63%; float: left; padding-right: 7%; padding-top: 1%;color: #002c67;'>"
											+ pinfo.fn
											+ " "
											+ pinfo.ln
											+ "</div></div></div><div style='width: 30%; float: left;'><div style='width: 100%; padding-top: 2%;'>	<div style='width: 43%; padding-left: 7%; padding-top: 1%; float: left; font-weight: bold;'>Date:</div><div	style='width: 43%; padding-right: 7%; color: #002c67; float: left;'	id='bid'>"
											+ chartPrintBean.crl[t].dt
											+ "</div></div></div></div></div></p>");
							dtYY = chartPrintBean.crl[t].dt;
							WindowObject.document
									.writeln('<p><div style="width: 98%; padding-top: 10.5%; text-align: left; font-weight: bold;  ">Blood Sugar </div>');
							WindowObject.document
									.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">Sr.</div><div	style="width: 12%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 20.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Random</div>	<div	style="width: 33%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Treatment</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
							var count = 1;
							for ( var i = 0; i < chartPrintBean.crl.length; i++) {
								if (chartPrintBean.crl[i].cid == 1
										&& chartPrintBean.crl[i].dt == dtYY) {
									WindowObject.document
											.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'
													+ count
													+ '</div><div	style="width: 12%; border: 1px solid #069; text-align: center; float: left;">'
													+ chartPrintBean.crl[i].tm
													+ '</div><div	style="width: 20.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
													+ chartPrintBean.crl[i].in
													+ '</div>	<div	style="width: 33%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
													+ chartPrintBean.crl[i].ot
													+ '</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
													+ chartPrintBean.crl[i].objU.dn
													+ '</div></div></div></p>');
									count++;
								}
							}
							WindowObject.document
									.writeln('<p><div style="width: 98%; padding-top: 10.5%; text-align: left; font-weight: bold; ">Temprature </div>');
							WindowObject.document
									.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 6%; border: 1px solid #069; text-align: center; float: left;">Sr.</div><div	style="width: 20%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 37.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Random</div>	<div	style="width: 27%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
							count = 1;
							for (i = 0; i < chartPrintBean.crl.length; i++) {

								if (chartPrintBean.crl[i].cid == 2
										&& chartPrintBean.crl[i].dt == dtYY) {
									WindowObject.document
											.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 6%; border: 1px solid #069; text-align: center; float: left;">'
													+ count
													+ '</div><div	style="width: 20%; border: 1px solid #069; text-align: center; float: left;">'
													+ chartPrintBean.crl[i].tm
													+ '</div><div	style="width: 37.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
													+ chartPrintBean.crl[i].in
													+ '</div>	<div	style="width: 27%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
													+ chartPrintBean.crl[i].objU.dn
													+ '</div></div></div></p>');
									count++;
								}
							}
							WindowObject.document
									.writeln('<p><div style="width: 98%; padding-top: 10.5%; text-align: left; font-weight: bold; ">Pulse Rate </div>');
							WindowObject.document
									.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 6%; border: 1px solid #069; text-align: center; float: left;">Sr.</div><div	style="width: 20%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 37.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Pulse Rate</div>	<div	style="width: 27%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
							count = 1;
							for (i = 0; i < chartPrintBean.crl.length; i++) {

								if (chartPrintBean.crl[i].cid == 3
										&& chartPrintBean.crl[i].dt == dtYY) {
									WindowObject.document
											.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 6%; border: 1px solid #069; text-align: center; float: left;">'
													+ count
													+ '</div><div	style="width: 20%; border: 1px solid #069; text-align: center; float: left;">'
													+ chartPrintBean.crl[i].tm
													+ '</div><div	style="width: 37.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
													+ chartPrintBean.crl[i].in
													+ '</div>	<div	style="width: 27%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
													+ chartPrintBean.crl[i].objU.dn
													+ '</div></div></div></p>');
									count++;
								}
							}
							WindowObject.document
									.writeln('<p><div style="width: 98%; padding-top: 10.5%; text-align: left; font-weight: bold; ">Intake I/O  </div>');
							WindowObject.document
									.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">Sr.</div><div	style="width: 12%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 20.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Intake</div>	<div	style="width: 33%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Output</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
							count = 1;
							for (i = 0; i < chartPrintBean.crl.length; i++) {
								if (chartPrintBean.crl[i].cid == 4
										&& chartPrintBean.crl[i].dt == dtYY) {
									WindowObject.document
											.writeln('<div style="width: 98%; padding-top: 0.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'
													+ count
													+ '</div><div	style="width: 12%; border: 1px solid #069; text-align: center; float: left;">'
													+ chartPrintBean.crl[i].tm
													+ '</div><div	style="width: 20.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
													+ chartPrintBean.crl[i].in
													+ '</div>	<div	style="width: 33%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
													+ chartPrintBean.crl[i].ot
													+ '</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
													+ chartPrintBean.crl[i].objU.dn
													+ '</div></div></div></p>');
									count++;
								}
							}
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

function printCaseReg() {

	var allVals = [];
	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	for ( var a = 0; a < allVals.length; a++) {
		if (allVals[a] == 'rmo') {

			myObj = JSON.parse($("#pinfo").html());
			// alert(myObj.trid);
			var inputs = [];
			inputs.push('action=fetchPatRMOTreatment');
			inputs.push('drRowId=' + 0);
			inputs.push('trId=' + myObj.trid);

			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "TreatmentServlet",
						timeout : 1000 * 60 * 5,
						cache : false,
						error : function() {
							alert('error');
						},
						success : function(r) {
							ajaxResponse = r;
							myObj = JSON.parse(ajaxResponse);
							var WindowObject = window.open('', ' ', '');
							WindowObject.document
									.writeln('<html><body><div style="width: 90%; float: left; padding :2%;"><div style="width:100%;"><b>Patient Name:&nbsp;&nbsp;'
											+ myObj.pl[0].fn
											+ '&nbsp;'
											+ myObj.pl[0].fn + '</b><b>');
							WindowObject.document
									.writeln(' </b></br></div></div><div style="width: 90%; float: left; padding :2%;"><div style="width:100%;"><b>Contact Number:&nbsp;&nbsp;&nbsp;'
											+ myObj.pl[0].mb
											+ ' </b></b></div>');
							WindowObject.document
									.writeln('<div style="width: 100%; height: px; padding-top:5%;">');
							WindowObject.document
									.writeln('<div style="width: 50%; float: left;"><div style="width: 80%; padding-top:5%; "><b>Presenting Symptoms</b></div><div style="width: 80%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;padding-bottom: 20px;"><div style="width: 110%;padding: 1%;border: solid 1px;">'
											+ myObj.pl[0].otd.ps.split("\n")
													.join("<br />")
											+ '</div></div>');
							WindowObject.document
									.writeln('<div style="width: 50%;"><b>Clinical Finding</b></div><div style="width: 80%;padding-bottom: 20px; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;"><div style="width: 110%;padding: 1%;border: solid 1px;">'
											+ myObj.pl[0].otd.cf.split("\n")
													.join("<br />")
											+ '</div></div>');
							WindowObject.document
									.writeln('<div style="width: 50%;"><b>Special Investigation</b></div><div style="width: 80%;padding-bottom: 20px; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;"><div style="width: 110%;padding: 1%;border: solid 1px;">'
											+ myObj.pl[0].otd.si.split("\n")
													.join("<br />")
											+ '</div></div>');
							WindowObject.document
									.writeln('<div style="width: 50%;"><b>Risk Factor</b></div><div style="width: 80%;padding-bottom: 20px; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;"><div style="width: 110%;padding: 1%;border: solid 1px;">'
											+ myObj.pl[0].otd.rf.split("\n")
													.join("<br />")
											+ '</div></div>');
							WindowObject.document
									.writeln('<div style="width: 50%;"><b>Complications</b></div><div style="width: 80%;padding-bottom: 20px; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;"><div style="width: 110%;padding: 1%;border: solid 1px;">'
											+ myObj.pl[0].otd.cm.split("\n")
													.join("<br />")
											+ '</div></div></div>');
							WindowObject.document
									.writeln('<div style="width:50%; float: left;"><div style="width: 50%;padding-top:5%; "><b>Prescription</b></div><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%"><tr><td style="border: solid 1px;" align="center" width="10%"><strong>Sr. No.</strong></td><td style="border: solid 1px; width:45%;" align="left"><strong>Medicines</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Mor</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Noon</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Nig</strong></td></tr>');
							var prescription = myObj.pl[0].otd.rpre;
							var prescr = prescription.split("@");
							for ( var i = 1; i < prescr.length; i++) {
								var med = prescr[i].split("-");
								$("#Medicine" + i).val(med[0]);
								if (med[1] == 1) {
									$('input[name=M' + i + ']').attr('checked',
											true);
								}
								if (med[2] == 1) {
									$('input[name=N' + i + ']').attr('checked',
											true);
								}
								if (med[3] == 1) {
									$('input[name=E' + i + ']').attr('checked',
											true);
								}
								// $("#txtName").val(txtValue);
								WindowObject.document
										.writeln('<tr><td  style="border: solid 1px; width:10%;" align="center">'
												+ i
												+ '</td><td style="border: solid 1px; width:45%;" align="left" id="Medicine1">'
												+ med[0] + ' </td>');
								if (med[1] == 1) {

									WindowObject.document
											.writeln('<td style="border: solid 1px; width:10%;" align="center" ><img id="M1" src="images/Accept.png" width="15%" height="15%"> </td>');
									// $('#'+chkMName).attr('src',"images/Accept.png");

								} else {
									WindowObject.document
											.writeln('<td style="border: solid 1px; width:10%;" align="center" ><img id="M1" width="0%" height="0%" /> </td>');
								}

								if (med[2] == 1) {
									WindowObject.document
											.writeln('<td style="border: solid 1px; width:10%;" align="center" ><img id="E1"  src="images/Accept.png" width="15%" height="15%"> </td>');

									// $('#' + chkNName).attr('src',
									// "images/Accept.png");

								} else {
									WindowObject.document
											.writeln('<td style="border: solid 1px; width:10%;" align="center" ><img id="E1" width="0%" height="0%"/> </td>');
								}
								if (med[3] == 1) {
									WindowObject.document
											.writeln('<td style="border: solid 1px; width:10%;" align="center" ><img id="N1"  src="images/Accept.png" width="15%" height="15%">  </td>	</tr>');

									// $('#'+chkEName ).attr('src',
									// "images/Accept.png");

								} else {
									WindowObject.document
											.writeln('<td style="border: solid 1px; width:10%;" align="center" ><img id="N1" width="0%" height="0%"/ > </td>	</tr>');
								}
							}
							WindowObject.document.writeln('</table></div>');
							WindowObject.document.writeln('</div>');
							WindowObject.document.writeln('<body></html>');
							WindowObject.document.close();
							WindowObject.focus();
							WindowObject.print();
							WindowObject.close();
						}
					});
		} else if (allVals[a] == 'doc') {

			var inputs = [];
			inputs.push('action=viewPrevDocDeskPatient');

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
							// alert(ajaxResponse);
							myArray = eval('(' + ajaxResponse + ')');
							myObj = JSON.parse($("#pinfo").html());
							// var myObj = null;
							for ( var i = 0; i < myArray.pl.length; i++) {

								if (myArray.pl[i].otd.ti == myObj.trid) {

									myObj = myArray.pl[i];
									break;
								}
							}
							// alert(myObj);
							var diagnosis = myObj.otd.st;
							var note = myObj.otd.co;
							var WindowObject = window.open('', ' ', '');
							WindowObject.document
									.writeln('<html><body><div style="width: 100%; padding-top: 1%;float: left;"><div style="width: 100%; height: 45px; padding-top: 3%;"><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; "><b>Patient Name: '
											+ myObj.fn
											+ '&nbsp;'
											+ myObj.ln
											+ '</b></div><div style="width: 100%; padding-top: 1%;float: left;"><div style="width: 100%; height: 45px; padding-top: 3%;"><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; "><b>Contact Number: '
											+ myObj.mb
											+ '</b></div><br><br><div style="width: 50%; padding-top: 1%;float: left;"><div style="width: 100%; height: 45px; padding-top: 3%;"><div style="width: 1%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; "><b>Diagnosis:-</b></div><div style="width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;"><div style="width: 110%;padding: 1%;border: solid 1px;">'
											+ diagnosis.split("\n").join(
													"<br />")
											+ ' </div></div></div><br><br><div style="width: 100%; height: 45px; padding-top: 3%;"><div style="width: 1%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; "><b>Note:-</b></div><div style="width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;"><div style="width: 110%;padding: 1%;border: solid 1px;">'
											+ note.split("\n").join("<br />")
											+ ' </div></div></div></div><div style="width: 50%; padding:%;float: left;"><div style="width: 100%; padding-top:9%;float: left;"><b>Prescription:-</b></div><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="95%"><tr><td style="border: solid 1px;" align="center" width="10%"><strong>Sr. No.</strong></td><td style="border: solid 1px;width:45%" align="left"><strong>Medicines</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Mor</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Noon</strong></td><td style="border: solid 1px;" align="center" width="10%"><strong>Nig</strong></td></tr>');
							var prescription = myObj.otd.pre;
							var prescr = prescription.split("@");
							for ( var i = 1; i < prescr.length; i++) {
								var med = prescr[i].split("-");
								// $("#txtName").val(txtValue);
								WindowObject.document
										.writeln('<tr><td  style="border: solid 1px;" align="center">'
												+ i
												+ '</td><td style="border: solid 1px;" align="left" id="Medicine1">'
												+ med[0] + ' </td>');
								if (med[1] == 1) {
									WindowObject.document
											.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" src="images/Accept.png" width="15%" height="15%"> </td>');
									// $('#'+chkMName).attr('src',"images/Accept.png");

								} else {
									WindowObject.document
											.writeln('<td style="border: solid 1px;" align="center" ><img id="M1" width="0%" height="0%" /> </td>');
								}

								if (med[2] == 1) {
									WindowObject.document
											.writeln('<td style="border: solid 1px;" align="center" ><img id="E1"  src="images/Accept.png" width="15%" height="15%"> </td>');
									// $('#' + chkNName).attr('src',
									// "images/Accept.png");
								} else {
									WindowObject.document
											.writeln('<td style="border: solid 1px;" align="center" ><img id="E1" width="0%" height="0%"/> </td>');
								}
								if (med[3] == 1) {
									WindowObject.document
											.writeln('<td style="border: solid 1px;" align="center" ><img id="N1"  src="images/Accept.png" width="15%" height="15%">  </td>	</tr>');
									// $('#'+chkEName ).attr('src',
									// "images/Accept.png");
								} else {
									WindowObject.document
											.writeln('<td style="border: solid 1px;" align="center" ><img id="N1" width="0%" height="0%"/ > </td>	</tr>');
								}
							}
							// alert(prescriptionString);
							WindowObject.document
									.writeln('</div></table><body></html>');
							WindowObject.document.close();
							WindowObject.focus();
							WindowObject.print();
							WindowObject.close();
						}
					});
		} else if (allVals[a] == 'order') {
			// alert("order");
			printAllOrder();
		} else if (allVals[a] == 'nurse') {
			myObj = JSON.parse($("#pinfo").html());
			fName = $("#txtFname").val();
			mName = $("#txtMname").val();
			lName = $("#txtLname").val();
			myObj = JSON.parse($("#pinfo").html());
			var inputs = [];
			inputs.push('tid=' + myObj.trid);
			inputs.push('action=printfillDIC');
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
							// alert(ajaxResponse);
							pobj1 = eval('(' + ajaxResponse + ')');
							// alert(ajaxResponse);
							var WindowObject = window.open('', ' ', '');
							WindowObject.document.writeln('<html><body>');
							WindowObject.document
									.writeln('<div style="width: 100%; padding-left: 7%; text-align: center;"		id="SRBill"><h1>ROPLEKAR HEART CARE CENTER</h1>	<b>160-161,Tilak Nagar,Veer Sawarkar Chowak,Aurangabad-431005.</b><br></br> <b>Ph. (0240) 2335002,2321941 </b></div></div>');
							WindowObject.document
									.writeln('<div style="width: 100%; padding-left: 7%; text-align: center;"		id="SRBill"><h1>Nursing Chart</h1></div>');
							var dtYY = 0;
							for ( var t = 0; t < pobj1.tnl.length; t++) {
								if (dtYY == 0 || dtYY != pobj1.tnl[t].dt) {
									WindowObject.document
											.writeln("<div style='width: 80%; float: left; padding-top: 2.5%;'><div style='width: 70%; float: left;'><div style='width: 100%; float: left;'>	<div	style='width: 23%; float: left; padding-left: 7%; padding-top: 1%; '>Name:</div><div	style='width: 63%; float: left; padding-right: 7%; padding-top: 1%;color: #002c67;'>"
													+ fName
													+ " "
													+ mName
													+ " "
													+ lName
													+ "</div></div></div><div style='width: 30%; float: left;'><div style='width: 100%; padding-top: 2%;'>	<div style='width: 43%; padding-left: 7%; padding-top: 1%; float: left; font-weight: bold;'>Date:</div><div	style='width: 43%; padding-right: 7%; color: #002c67; float: left;'	id='bid'>"
													+ pobj1.tnl[t].dt
													+ "</div></div></div></div></div>");
									dtYY = pobj1.tnl[t].dt;
									WindowObject.document
											.writeln('<div style="width: 98%; padding-top: 6.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">Sr.</div><div	style="width: 10%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 35.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Name of Drug</div>	<div	style="width: 13%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Strength</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Dose</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
									var count = 1;
									for ( var i = 0; i < pobj1.tnl.length; i++) {
										var x = pobj1.tnl[i].dn;
										if (x != null && x != ""
												&& dtYY == pobj1.tnl[i].dt) {
											WindowObject.document
													.writeln('<div style="width: 98%;  float: left; font-weight: bold;"><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'
															+ count
															+ '</div><div	style="width: 10%; border: 1px solid #069; text-align: center; float: left;">'
															+ pobj1.tnl[i].cut
															+ '</div><div	style="width: 35.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
															+ pobj1.tnl[i].dn
															+ '</div>	<div	style="width: 13%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
															+ pobj1.tnl[i].stren
															+ '</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
															+ pobj1.tnl[i].dose
															+ '</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
															+ pobj1.tnl[i].objU.dn
															+ '</div></div></div>');
											count++;
										}
									}
									WindowObject.document
											.writeln('<div style="width: 98%; padding-top: 6.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">Sr.</div><div	style="width: 10%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 35.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">FLUIDS & DRIPS</div>	<div	style="width: 13%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Strength</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Dose</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Sign</div></div></div>');
									count = 1;
									for ( var ii = 0; ii < pobj1.tnl.length; ii++) {
										var y = pobj1.tnl[ii].fd;
										if (y != null && y != ""
												&& dtYY == pobj1.tnl[ii].dt) {
											WindowObject.document
													.writeln('<div style="width: 98%;  float: left; font-weight: bold;"><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'
															+ count
															+ '</div><div	style="width: 10%; border: 1px solid #069; text-align: center; float: left;">'
															+ pobj1.tnl[ii].cut
															+ '</div><div	style="width: 35.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
															+ pobj1.tnl[ii].fd
															+ '</div>	<div	style="width: 13%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
															+ pobj1.tnl[ii].fdq
															+ '</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
															+ pobj1.tnl[ii].cmt
															+ '</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
															+ pobj1.tnl[ii].objU.dn
															+ '</div></div></div>');
											count++;
										}
									}
								}
							}
							WindowObject.document.writeln('</body></html>');
							WindowObject.document.close();
							WindowObject.focus();
							WindowObject.print();
							WindowObject.close();
						}
					});
		} else if (allVals[a] == 'test') {
		// alert("test");
			printTest();
		} else if (allVals[a] == 'discharge') {
			// alert("discharge");
			printDischargeSummary();
		} else if (allVals[a] == 'round') {
			fName = $("#txtFname").val();
			mName = $("#txtMname").val();
			lName = $("#txtLname").val();
			myObj = JSON.parse($("#pinfo").html());
			var inputs = [];
			inputs.push('action=printPreviousDoctorRound');
			inputs.push('tid=' + myObj.trid);
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
							var WindowObject = window.open('', ' ', '');
							WindowObject.document.writeln('<html><body>');
							WindowObject.document
									.writeln('<div style="width: 100%; padding-left: 7%; text-align: center;"		id="SRBill"><h1>ROPLEKAR HEART CARE CENTER</h1>	<b>160-161,Tilak Nagar,Veer Sawarkar Chowak,Aurangabad-431005.</b><br></br> <b>Ph. (0240) 2335002,2321941 </b></div></div>');
							WindowObject.document
									.writeln('<div style="width: 100%; padding-left: 7%; text-align: center;"		id="SRBill"><h1>Doctor Round Report</h1></div>');
							var dtYY = 0;
							for ( var t = 0; t < pobj1.drrl.length; t++) {
								if (dtYY == 0 || dtYY != pobj1.drrl[t].dt) {
									WindowObject.document
											.writeln("<div style='width: 80%; float: left; padding-top: 2.5%;'><div style='width: 70%; float: left;'><div style='width: 100%; float: left;'>	<div	style='width: 23%; float: left; padding-left: 7%; padding-top: 1%; '>Name:</div><div	style='width: 63%; float: left; padding-right: 7%; padding-top: 1%;color: #002c67;'>"
													+ fName
													+ " "
													+ mName
													+ " "
													+ lName
													+ "</div></div></div><div style='width: 30%; float: left;'><div style='width: 100%; padding-top: 2%;'>	<div style='width: 43%; padding-left: 7%; padding-top: 1%; float: left; font-weight: bold;'>Date:</div><div	style='width: 43%; padding-right: 7%; color: #002c67; float: left;'	id='bid'>"
													+ pobj1.drrl[t].dt
													+ "</div></div></div></div></div>");
									dtYY = pobj1.drrl[t].dt;
									WindowObject.document
											.writeln('<div style="width: 98%; padding-top: 6.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">Sr.</div><div	style="width: 10%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 25%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Clinical Notes</div>	<div	style="width: 23%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Treatment</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">Investigation Advice</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">RoundBy</div></div></div>');
									var count = 1;
									for ( var i = 0; i < pobj1.drrl.length; i++) {
										if (pobj1.drrl[i].dt == dtYY) {
											WindowObject.document
													.writeln('<div style="width: 98%;  float: left; font-weight: bold;"><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'
															+ count
															+ '</div><div	style="width: 10%; border: 1px solid #069; text-align: center; float: left;">'
															+ pobj1.drrl[i].tm
															+ '</div><div	style="width: 25%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
															+ pobj1.drrl[i].cn
															+ '</div>	<div	style="width: 23%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
															+ pobj1.drrl[i].tr
															+ '</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
															+ pobj1.drrl[i].ia
															+ '</div><div	style="width: 10%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
															+ pobj1.drrl[i].rb
															+ '</div></div></div>');
											count++;
										}
									}
								}
							}
							WindowObject.document.writeln('</body></html>');
							WindowObject.document.close();
							WindowObject.focus();
							WindowObject.print();
							WindowObject.close();
						}
					});
		} else if (allVals[a] == 'invest') {
			// alert("invest");
			printInvestChart();
		} else if (allVals[a] == 'replace') {
			myObj = JSON.parse($("#pinfo").html());
			var date = "ReplacementSheet";
			var inputs = [];
			inputs.push('action=PatientMaterialUsed');
			inputs.push('tid=' + myObj.trid);
			inputs.push('date=' + date);
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
							sampleBean = eval('(' + ajaxResponse + ')');
							// alert(sampleBean.bcl.length);
							var rowcount = sampleBean.bcl.length;
							var WindowObject = window.open('', ' ', '');
							WindowObject.document.writeln('<html><body>');
							WindowObject.document
									.writeln('<div style="width: 100%; padding-left: 7%; text-align: center;"		id="SRBill"><h1>ROPLEKAR HEART CARE CENTER</h1>	<b>160-161,Tilak Nagar,Veer Sawarkar Chowak,Aurangabad-431005.</b><br></br> <b>Ph. (0240) 2335002,2321941 </b></div></div>');
							WindowObject.document
									.writeln('<div style="width: 100%; padding-left: 7%; text-align: center;"		id="SRBill"><h1>Replacement Sheet</h1></div>');
							WindowObject.document
									.writeln('<div style="width: 98%; padding-top: 6.5%; float: left; "><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">Sr.</div><div	style="width: 10%; border: 1px solid #069; text-align: center; float: left;">Time</div><div	style="width: 25.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">MaterialUsed</div>	<div	style="width: 13%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Quantity</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">UsedBy</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">Billable/Replaceable</div></div></div>');
							var count = 0;
							for ( var i = 1; i <= rowcount; i++) {
								WindowObject.document
										.writeln('<div style="width: 98%;  float: left; font-weight: bold;"><div style="width: 100%; float: left;">	<div	style="width: 4%; border: 1px solid #069; text-align: center; float: left;">'
												+ count
												+ '</div><div	style="width: 10%; border: 1px solid #069; text-align: center; float: left;">'
												+ sampleBean.bcl[count].tm
												+ '</div><div	style="width: 25.1%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
												+ sampleBean.bcl[count].oi.in
												+ '</div>	<div	style="width: 13%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
												+ sampleBean.bcl[count].qty
												+ '</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; padding-right: 1%; text-align: center;">'
												+ sampleBean.bcl[count].od.dn
												+ '</div><div	style="width: 20%; border: 1px solid #069; padding-left: 1%; float: left; text-align: center;">'
												+ sampleBean.bcl[count].mty
												+ '</div></div></div>');
								count++;
							}
							WindowObject.document.writeln('</body></html>');
							WindowObject.document.close();
							WindowObject.focus();
							WindowObject.print();
							WindowObject.close();
						}
					});
		} else if (allVals[a] == 'graphy') {
			myObj = JSON.parse($("#pinfo").html());
			var input = [];
			input.push('action=DisplayOpSum');
			input.push('trid=' + encodeURIComponent(myObj.trid));
			var str = input.join('&');
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
							var input = [];
							input.push('action=getPreAngiography');
							input.push('cathId=' + encodeURIComponent(pobj1.pl[0].obTO.id));
							var str = input.join('&');
							jQuery
									.ajax({
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
											pobj1 = eval('(' + ajaxResponse
													+ ')');
											var WindowObject = window.open('',
													' ', '');
											WindowObject.document
											.writeln('<div style="width: 100%;  padding-right: none;"><div style="width: 100%;"><div style="width: 100%; font-size: 60px; text-align: center; padding-top: 300px; font-weight: bold;">CORONARY ANGIOGRAPHY REPORT</div></div></div>');

									WindowObject.document
											.writeln('<div style="width: 100%; padding-top: 35px; height: 50px;font-size: 45px;"><div style="width: 50%; text-align: left; padding-left: 2px; float: left; font-weight: bold;">Patient Name:- '
													+ pobj1.cal[0].pn
													+ '</div><div style="width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold;">Age:-&nbsp; '
													+ pobj1.cal[0].ag
													+ ' </div><div style="width: 40%; padding-top: 10px; text-align: left; padding-left: 20px; float: right; font-weight: bold;font-size: 40px; padding-top: 5px;">Date:- &nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="date" id="date" style="border:none;font-size: 40px;font-weight: bold;" value="'
													+ pobj1.cal[0].cd
													+ '"></div><div style="width: 50%; text-align: left; padding-left: 2px; float: left; font-weight: bold; padding-top: 7px;">Ref By:- &nbsp;'
													+ pobj1.cal[0].rb + '</div></div></div>');

									WindowObject.document
											.writeln('<div style="width: 100%; padding-top: 15px; height: 30px;font-size:40px;"><div style="width: 40%; text-align: left; padding-left: 30px; float: right; font-weight: bold; padding-top: 10px;">Cath No.:-&nbsp&nbsp<input style="border:none;font-size: 40px;" readonly="readonly" name="cathno" id="cathno" value="'
													+ pobj1.cal[0].regcid + '"></div></div>');
									WindowObject.document
									.writeln('<div style="width: 100%; padding-top: 200px; height: 30px;"><div style="width: 100%; color: #FFF; padding-left: 0px; float: left;" ><textarea style="border:none;font-size: 50px;font-weight: bold;" class="" id="lfMain" rows="2" cols="70" name="lfMain">'
											+ pobj1.cal[0].at + '</textarea></div></div>');
									WindowObject.document
											.writeln('<div style="width: 100%; padding-top: 100px; height: 30px;"><div style="width: 17%; font-family: Tahoma, Geneva, sans-serif;color: #161616; float: left; font-weight: bold;font-size: 45px; ">Left Main:-</div></div><div style="width: 100%; color: #FFF; padding-left: 0px; float: left;" ><textarea style="border:none;font-size: 50px;font-weight: bold;" class="" id="lfMain" rows="2" cols="70" name="lfMain">'
													+ pobj1.cal[0].lm.split("\n").join("<br />") + '</textarea></div></div>');

									WindowObject.document
											.writeln('<div style="width: 100%; height: 100px; "><div	style="width: 100%; font-family: Tahoma, Geneva, sans-serif;color: #161616; float: left; font-weight: bold; padding-top: 3px;font-size: 45px;">Left Anterior Descending:-</div>');

									WindowObject.document
											.writeln('</div><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: right;"><textarea style="border:none;font-size: 50px;font-weight: bold;" class="" id="lfAntDesc" rows="4" cols="70" name="lfAntDesc">'
													+  pobj1.cal[0].lad.split("\n").join("<br />") + '</textarea></div>');

									WindowObject.document
											.writeln('<div style="width: 100%; height: 65px;"><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left;font-size: 45px; font-weight: bold; padding-top: 3px;">Left Circumflex:-</div></div><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: right;"><textarea  style="border:none;font-weight: bold;font-size: 50px;" class="" id="lfCirfx"	rows="3" cols="70" name="lfCirfx">'
													+ pobj1.cal[0].lc.split("\n").join("<br />") + '</textarea></div> ');

									WindowObject.document
											.writeln('<div style="width: 100%; height: 45px; padding-top: 18px;"><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif;font-size: 45px;  color: #161616; float: left; font-weight: bold; ">Right	Coronary');

									WindowObject.document
											.writeln('Artery:-</div></div><div	style="width: 100%; font-family: Tahoma, Geneva, sans-serif; font-size: 30px; color: #161616; float: right;"><textarea  style="border:none;font-size: 50px;font-weight: bold;" class=""	id="rtCorAngio" rows="2" cols="70" name="rtCorAngio">'
													+ pobj1.cal[0].rca.split("\n").join("<br />") + '</textarea></div>');

									WindowObject.document
											.writeln('<div style="width: 100%; height: 45px; padding-top: 19px;"><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left;font-size: 45px; font-weight: bold; ">Impression:-</div><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: right;"><textarea  style="border:none;font-size: 50px;font-weight: bold;" class="" id="impression" rows="2" cols="70" name="impression">'
													+ pobj1.cal[0].lmr.split("\n").join("<br />") + '</textarea></div>');

									WindowObject.document
											.writeln('<div style="width: 100%; height: 30px; padding-top: 19px;"><div style="width: 100%; font-family: Tahoma, Geneva, sans-serif; font-size: 45px; color: #161616; float: left; font-weight: bold;">Recommendation:-</div></div><div style="width: 100%;height: 700px; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: right;"><textarea  class="" id="reccommendation" style="border:none;font-size: 50px;font-weight: bold;" rows="2" cols="70" name="Reccommendation">'
													+  pobj1.cal[0].re.split("\n").join("<br />")
													+ '</textarea></div>');

									WindowObject.document
											.writeln('<div style="width: 100%; padding-top: 15px; height: 30px; font-size: 40px; font-weight: bold;"><div style="width: 50%; text-align: left; padding-left: 2px; float: left;">Dr.S.M.Roplekar</div><div style="width: 40%; text-align: left; padding-left: 30px; float: right;">Dr.Mrs.K.S.Roplekar</div></div><div style="width: 100%; padding-top: px; height: 5px; font-size: 40px; font-weight: bold;"><div style="width: 50%; text-align: left; padding-left: 2px; float: left;">MD(Med)DM(Card)DNB(Card)</div><div style="width: 40%; text-align: left; padding-left: 30px; float: right;">MD(Med)</div></div>');

									WindowObject.document
											.writeln('<div style="width: 100%; padding-top: 10px; height: 5px; font-size: 40px; font-weight: bold;"><div style="width: 50%; text-align: left; padding-left: 2px; float: left;">Interventional Cardiologist</div><div style="width: 40%; text-align: left; padding-left: 30px; float: right;">Cardiologist</div></div><div style="width: 100%; padding-top: 10px; height: 5px;"><div style="width: 100%; text-align: left; padding-left: 2px; float: left; padding-top: 30px;font-size: 40px;">Note:-(Kindly note that Angio/PTCA Record will be saved only for 1 month on Hard disc)</div></div>');

									WindowObject.focus();

									WindowObject.print();

									WindowObject.close();
										
										}
									});
						}
					});
		} else if (allVals[a] == 'plasty') {

			// alert("plasty");
			printAngioplasty();
		} else if (allVals[a] == '2decho') {
			print2DEcho();
			
		}
	}
}

function patientInformation() {
	loadDoctors("reg");
	divPi = $("#pinfo").html();
	// alert(divPi);
	divPi1 = eval('(' + divPi + ')');
	$("#patientinfo").setTemplate($("#patientinfo").html());
	$("#patientinfo").processTemplate(divPi1);
	divPi1 = JSON.parse(divPi);
	$("#radioGroup1").val(divPi1.st);
	$("#blood").val(divPi1.bg);
	$("#sex").val(divPi1.sx);
	$("#txtFname").val(divPi1.fn);
	$("#txtMname").val(divPi1.mn);
	$("#txtLname").val(divPi1.ln);
	$("#txtTrid").val(divPi1.trid);
	 
	$("#ageType").val(divPi1.agtp);
	$("#title").val(divPi1.tit);
	 $("#patImg").attr('src', divPi1.img);
	$("#stat").html(divPi1.objTreat.opd);
	
	// patient edit information
	$("#mlcDiv2").hide();
	getRefDoctors();
	setSpecialDiscountForReg();
	
	$("#radioGroup1").val(divPi1.st);
	$("#sex").val(divPi1.sx);
	// $("#hospType").val(divPi1.hs);

	
	if (divPi1.hs == "H")
		$("#hospTypeH").attr('checked', true);
	else
		$("#hospTypeD").attr('checked', true);

	$("#blood").val(divPi1.bg);
	setTimeout(function() {
		$("#refBy").val(divPi1.objTreat.rb);
		// alert(divPi1.objTreat.rt);
		$("#refTo").val(divPi1.objTreat.rt);
		$("#SpecialDiscount").val(divPi1.sdisc);
		$("#selectIpdDoc").val(divPi1.admit);

	}, 2000);
	
	if (divPi1.objTreat.bedridden == "Y") {
		$("#bedridden").attr('checked', true);
	}

	if (divPi1.objTreat.sero == "Y") {
		$("#seropositive").attr('checked', true);
	}

	if (divPi1.objTreat.rb == 0 && divPi1.sdisc == "") {
		$("#chkWalkin").attr('checked', true);
		hideSourceDiv();
	} else {
		$("#chkSource").attr('checked', true);
	}
	if (divPi1.sdisc == "") {
		$("#empidDiv").hide();
	}
	$("#patImg").attr('src', divPi1.img);
	$("#ageType").val(divPi1.agtp);
	$("#title").val(divPi1.tit);
	$("#txtEmpID").val(divPi1.objTreat.empId);
	$("#firstDiv").html("Register By : " + divPi1.firstupdate);
	if (divPi1.lastupdate != undefined) {
		$("#lastDiv").html("Last Updated By : " + divPi1.lastupdate);
	}
	if (divPi1.liMLC.length != 0 && divPi1.liMLC[0].firNo != "") {
		$("#mlcDiv2").show();
		$("#mlc").attr('checked', 'checked');
		$("#firNo").val(divPi1.liMLC[0].firNo);
		$("#authorityname").val(divPi1.liMLC[0].Anm);
		$("#buccleNo").val(divPi1.liMLC[0].Bno);
		$("#plStname").val(divPi1.liMLC[0].Pnm);
		$("#plAdress").val(divPi1.liMLC[0].padd);
		$("#mlcid").val(divPi1.liMLC[0].mlcid);

	}

	if (divPi1.objTreat.rt == "ipd") {

		$("#ipdDiv").show();
	}
	$("#divPatFilesDisp").setTemplate(patDocTemp);
	$("#divPatFilesDisp").processTemplate(divPi1);
}

function RMOTreatment() {
	$("#RTreatment").show();
	$("#DTreatment").hide();
	$("#patientinfo").hide();
	$("#ReplaceSheet").hide();
	$("#orderForm").hide();
	$("#prescription").show();
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
	$("#2DECHO").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#OpearationSummary").hide();
	$("#discharge").hide();
	$("#testDetails").hide();
	$("#Angioplasty").hide();
	myObj = JSON.parse($("#pinfo").html());
	  alert(myObj.trid);
	var inputs = [];
	inputs.push('action=fetchPatRMOTreatment');
	inputs.push('drRowId=' + 0);
	inputs.push('trId=' + myObj.trid);
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
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#divMyObj").html(ajaxResponse);
			loadRMOPrevTre();
		}
	});
}

function DoctorTreatment() {
	$("#RTreatment").hide();
	$("#DTreatment").show();
	$("#prescription").show();
	$("#orderFormDetails").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#ReplaceSheet").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#testDetails").hide();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#OpearationSummary").hide();
	$("#Angioplasty").hide();
	$("#discharge").hide();
	$("#2DECHO").hide();
	for ( var j = 1; j < 13; j++) {
		$("#Medicine" + j).val("");
		$('input[name=M' + j + ']').attr('checked', false);
		$('input[name=N' + j + ']').attr('checked', false);
		$('input[name=E' + j + ']').attr('checked', false);
	}
	var inputs = [];
	inputs.push('action=viewPrevDocDeskPatient');
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
			myArray = eval('(' + ajaxResponse + ')');
			myObj = JSON.parse($("#pinfo").html());
			var myObj;
			for ( var i = 0; i < myArray.pl.length; i++) {
				if (myArray.pl[i].otd.ti == myObj.trid) {
					myObj = myArray.pl[i];
					break;
				}
			}
			// alert(myObj.trid);
			pobj = myObj;
			$("#diagnosis").val(pobj.otd.st);
			$("#note1").val(pobj.otd.co);
			// alert(pobj.otd.co);
			var prescription = pobj.otd.pre;
			var prescr = prescription.split("@");
			for ( var i = 1; i < prescr.length; i++) {
				var med = prescr[i].split("-");
				$("#Medicine" + i).val(med[0]);
				if (med[1] == 1) {
					$('input[name=M' + i + ']').attr('checked', true);
				}
				if (med[2] == 1) {
					$('input[name=N' + i + ']').attr('checked', true);
				}
				if (med[3] == 1) {
					$('input[name=E' + i + ']').attr('checked', true);
				}
			}
			// $("#PreTreat").html(ajaxResponse);
		}
	});
}

function OrderFormDates() {
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#ReplaceSheet").hide();
	$("#patientinfo").hide();
	$("#orderForm").show();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#InvestigationChart").hide();
	$("#testDetails").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#OpearationSummary").hide();
	$("#Angioplasty").hide();
	$("#2DECHO").hide();
	$("#discharge").hide();
	myObj = JSON.parse($("#pinfo").html());
	var inputs = [];
	inputs.push('action=fetchPatAllOrders');
	inputs.push('trid=' + myObj.trid);
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
			$("#myobj").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#orderForm").setTemplate($("#orderForm").html());
			$("#orderForm").processTemplate(pobj1);
		}
	});
}

function OrderFormDetails(orderId, trid) {
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#orderFormDetails").show();
	$("#orderForm").show();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#DoctorRoundDate").hide();
	$("#ReplaceSheet").hide();
	$("#DoctorRoundDetails").hide();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#testDetails").hide();
	$("#OpearationSummary").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#2DECHO").hide();
	$("#Angioplasty").hide();
	$("#discharge").hide();
	var inputs = [];
	inputs.push('action=fetchOrderDetails');
	inputs.push('omID=' + orderId);
	inputs.push('trid=' + trid);
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
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			var j = 1;
			for ( var i = 0; i < pobj1.ormali[0].ocodrli.length; i++) {

				$("#txtdrug" + j).val(pobj1.ormali[0].ocodrli[i].drdo);
				$("#txtsign" + j).val(pobj1.ormali[0].ocodrli[i].sign);
				$("#txtremark" + j).val(pobj1.ormali[0].ocodrli[i].rmrk);
				j++;
			}
			var k = 1;
			for ( var v = 0; v < pobj1.ormali[0].ocostli.length; v++) {

				$("#txtdose" + k).val(pobj1.ormali[0].ocostli[v].stdo);
				k++;
			}
			$("#dateof").val(pobj1.ormali[0].date);
			$("#txtIadv").val(pobj1.ormali[0].invest);
			$("#txtRefAdv").val(pobj1.ormali[0].readrmrk);
		}
	});
}

function NursingChartDates(clickValue) {
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#ReplaceSheet").hide();
	$("#orderFormDetails").hide();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#testDetails").hide();
	$("#Operation").hide();
	$("#OpearationSummary").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#2DECHO").hide();
	$("#Angioplasty").hide();
	$("#discharge").hide();
	if (clickValue == "nurse") {
		$("#NursingChartDate").show();
		$("#DoctorRoundDate").hide();
		$("#DoctorRoundDetails").hide();
	} else {
		$("#DoctorRoundDate").show();
		$("#NursingChartDate").hide();
		$("#IPD_DICContent").hide();
	}
	myObj = JSON.parse($("#pinfo").html());
	var inputs = [];
	inputs.push('action=fetchAllNursingChart');
	inputs.push('trid=' + myObj.trid);
	inputs.push('clickValue=' + clickValue);
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
					// $("#myobj").html(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					if (clickValue == "nurse") {
						$("#NursingChartDate").setTemplate(
								$("#NursingChartDate").html());
						$("#NursingChartDate").processTemplate(pobj1);
					} else {
						$("#DoctorRoundDate").setTemplate(
								$("#DoctorRoundDate").html());
						$("#DoctorRoundDate").processTemplate(pobj1);
					}
				}
			});
}

function NursingChartDetails(date) {
	sr = 1;
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").show();
	$("#IPD_DICContent").show();
	$("#orderFormDetails").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#OpearationSummary").hide();
	$("#testDetails").hide();
	$("#ReplaceSheet").hide();
	$("#discharge").hide();
	$("#2DECHO").hide();
	$("#Angioplasty").hide();
	myObj = JSON.parse($("#pinfo").html());
	var inputs = [];
	inputs.push('date=' + date);
	inputs.push('tid=' + myObj.trid);
	inputs.push('action=fillDIC');
	inputs.push('callFrom=case');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			// alert(ajaxResponse);
			$("#IPD_DICContent").setTemplate(IPD_DICAdmin);
			// alert("asd");
			$("#IPD_DICContent").processTemplate(pobj1);
		}
	});
}

function DoctorRoundDetails(date) {
	sr = 1;
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#orderFormDetails").hide();
	$("#DoctorRoundDate").show();
	$("#DoctorRoundDetails").show();
	$("#ReplaceSheet").hide();
	$("#discharge").hide();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#testDetails").hide();
	$("#Operation").hide();
	$("#OpearationSummary").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#Angioplasty").hide();
	$("#2DECHO").hide();
	myObj = JSON.parse($("#pinfo").html());
	var inputs = [];
	inputs.push('action=PreviousDoctorRound');
	inputs.push('tid=' + myObj.trid);
	inputs.push('date=' + date);
	inputs.push('callFrom=case');
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
			// alert(ajaxResponse);
			sampleBean = eval('(' + ajaxResponse + ')');
			$("#DoctorRoundDetails").setTemplate(IPD_DRRTempCaseRegistre);
			$("#DoctorRoundDetails").processTemplate(sampleBean);
		}
	});
}

function ReplacementSheet() {
	sr = 1;
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#discharge").hide();
	$("#orderFormDetails").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#ReplaceSheet").show();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#testDetails").hide();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#2DECHO").hide();
	$("#Angioplasty").hide();
	$("#OpearationSummary").hide();
	myObj = JSON.parse($("#pinfo").html());
	var date = "ReplacementSheet";
	var inputs = [];
	inputs.push('action=PatientMaterialUsed');
	inputs.push('tid=' + myObj.trid);
	inputs.push('date=' + date);
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
			sampleBean = eval('(' + ajaxResponse + ')');
			$("#ReplaceSheet").setTemplate(IPD_MaterialsAdminTemp);
			$("#ReplaceSheet").processTemplate(sampleBean);
			for ( var i = 0; i < sampleBean.bcl.length; i++) {
				if (sampleBean.bcl[i].mty == "R") {
					$("#lblReplacable" + (i + 1)).attr('style', 'color:red');
				}
			}
			var j = 1;
			for ( var k = 0; k < sampleBean.bcl.length; k++) {
				if (sampleBean.bcl[k].mty == "B"
						|| sampleBean.bcl[k].mty == "RB") {
					// var $radios=$("#Radio"+j+"["+i+"]");
					// var name="[name=RadioGroup"+j+"]";
					var $radios = $('input:radio[name=Radio' + j + ']');
					// var $radios=$("input#RadioGroup"+j+" B");
					if ($radios.is(':checked') == false) {
						$radios.filter('[value=B]').attr('checked', true);
					}
				} else if (sampleBean.bcl[k].mty == "R") {
					var $radios = $('input:radio[name=Radio' + j + ']');
					if ($radios.is(':checked') == false) {
						$radios.filter('[value=R]').attr('checked', true);
					}
				}
				j++;
			}
		}
	});
}
var dispChart1= "{#foreach $T.cl as cl}<div style='width: 130px;'><input type='radio' name='RadioGroupPatient_2' value='{$T.cl.cid}'	id='RadioGroupPatient_2' name='RadioGroupPatient_2'	onclick='ChartDetails(this.value)' />&nbsp;&nbsp;&nbsp;{$T.cl.cn}</div>{#/for}";
function setcaseChart() {
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
	  // alert(ajaxResponse);
		chartBean = eval('(' + ajaxResponse + ')');
		$("#InvestigationChart").setTemplate(dispChart1);
		$("#InvestigationChart").processTemplate(chartBean);
	}
	});
}
function ShowChart() {
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#orderFormDetails").hide();
	$("#testDetails").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#ReplaceSheet").hide();
	$("#InvestigationChart").show();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#discharge").hide();
	$("#OpearationSummary").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#2DECHO").hide();
	$("#Angioplasty").hide();
	setcaseChart();
}

var preBloodChartAdminTemp1 = "<div style='width: 103%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Date</div><div	style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Random</div><div	style='width: 36.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Treatment</div><div	style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '>                            <div style='width: 3.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 8.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.dt}'  /></div><div	style='width: 8.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 21%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 38.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='o{rowCount}' value='{$T.crl.ot}'	  /></div><div	style='width: 15%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preTempChartAdminTemp1 = "<div style='width: 103%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Date</div><div	style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 28%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Temprature</div><div	style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.dt}'  /></div><div	style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 29.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 25%; height: 25px;border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var prePRateChartAdminTemp1 = "<div style='width: 103%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Date</div><div	style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Pulse Rate</div><div	style='width: 32%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.dt}'  /></div><div	style='width: 14.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 26%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 32.5%; height: 25px; text-align:center;border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var preIntakeChartAdminTemp1 = "<div style='width: 103%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 14%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Date</div><div	style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Time</div><div	style='width: 17%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Intake</div><div	style='width: 17%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Output</div><div	style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.crl as crl}<div id='div{rowCount}' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 15.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.dt}'  /></div><div	style='width: 13.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'	onmouseover='click1(this)' name='textfield' id='t{rowCount}'	value='{$T.crl.tm}'  /></div><div	style='width: 18.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text'  id='i{rowCount}' value='{$T.crl.in}'	  /></div><div	style='width: 18.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='o{rowCount}' value='{$T.crl.ot}'	  /></div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; text-align:center;padding-left: 1%; padding-top: 3px;' id='s{rowCount}' >{$T.crl.objU.dn}</div><div style='padding-left:2%;padding-top:5px'></div></div><input type='hidden' value='{rowCount++}' id='txtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value=''	id='addRowCount' /><input type='hidden' value='{--rowCount}'	id='RowCount' /></div>	</div>";
var monitorChartCaseTemp = "<div style='width: 98%; padding-left: 0%;'><div	style='width: 98%; background-color: #436a9d;  padding-bottom: 1%; padding-top: 1%; font-weight: bold;'><div style='width: 100%;'><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Sr.</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Monitor</div><div	style='width: 22%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Sign</div></div></div><div	style='width: 97.9%; height: 250px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'><div id='div1' style='width: 100%; height: 28px; border-bottom: 1px solid #069;  '><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>1.</div><div	style='width: 19.3%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input	style='width: 90%;  ' type='text' id='t1' value=''	onkeypress='return validateNumbers(event)'  /></div><div	style='width: 24%; height: 25px; border-right: 1px solid #069; text-align:center;padding-left: 1%; padding-top: 3px;' id='1' ></div></div><input type='hidden' value='1' id='txtRowCount'	name='txtRowCount' /><input type='hidden' value='1'	id='addRowCount' /><input type='hidden' value='1'	id='RowCount' /></div>	</div>";

function ChartDetails(chart_type) {
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#orderFormDetails").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#ReplaceSheet").hide();
	$("#InvestigationChart").show();
	$("#discharge").hide();
	$("#InvestigationChartDetails").show();
	$("#OperationNames").hide();
	$("#testDetails").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#OpearationSummary").hide();
	$("#2DECHO").hide();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#Angioplasty").hide();
	sr = 1;
	myObj = JSON.parse($("#pinfo").html());
	var date = "Ichart";
	var inputs = [];
	inputs.push('action=chart');
	inputs.push('data=preChart');
	inputs.push('tid=' + myObj.trid);
	inputs.push('cid=' + chart_type);
	inputs.push('datePick=' + date);
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
			// alert(ajaxResponse);
			chartBean = eval('(' + ajaxResponse + ')');
			$("#DIC").html(ajaxResponse);
			var userType = $("#userType").val();
			// alert(chart_type);
			if (chart_type == "1") {
				$("#InvestigationChartDetails").setTemplate(
						preBloodChartAdminTemp1);
				$("#InvestigationChartDetails").processTemplate(chartBean);
			} else if (chart_type == "2") {
				$("#InvestigationChartDetails").setTemplate(
						preTempChartAdminTemp1);
				$("#InvestigationChartDetails").processTemplate(chartBean);
			} else if (chart_type == "3") {
				$("#InvestigationChartDetails").setTemplate(
						prePRateChartAdminTemp1);
				$("#InvestigationChartDetails").processTemplate(chartBean);
			} else if (chart_type == "4") {
				$("#InvestigationChartDetails").setTemplate(
						preIntakeChartAdminTemp1);
				$("#InvestigationChartDetails").processTemplate(chartBean);
			}else if (chart_type == "5" ||chart_type == "7"||chart_type == "8") {
				$("#InvestigationChartDetails").setTemplate(
						oxygenationChartAdminTemp);
				$("#InvestigationChartDetails").processTemplate(chartBean);
			}
			else if (chart_type == "6") {
				$("#InvestigationChartDetails").setTemplate(monitorChartCaseTemp);
				$("#InvestigationChartDetails").processTemplate(chartBean);
			
				  $("#t1").val(chartBean.crl[0].tm);
				   $("#1").html(chartBean.crl[0].objU.dn);
				
			}
		}
	});
}

function GetProcedures(type) {
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#orderFormDetails").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#ReplaceSheet").hide();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationReport").hide();
	$("#testDetails").hide();
	$("#CAPAtContent").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#discharge").hide();
	$("#2DECHO").hide();
	$("#Angioplasty").hide();
	$("#OpearationSummary").hide();
	sr = 1;
	myObj = JSON.parse($("#pinfo").html());
	var input = [];
	input.push('action=DisplayOpSum');
	input.push('trid=' + encodeURIComponent(myObj.trid));
	var str = input.join('&');
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
					// alert(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					if (type == "pro") {
						$("#OperationReport").hide();
						$("#OperationNames").show();
						$("#OperationNames").setTemplate(
								$("#OperationNames").html());
						$("#OperationNames").processTemplate(pobj1);
					} else {
						$("#OperationReport").show();
						$("#OperationNames").hide();
						$("#CAPAtContent").hide();
						$("#OperationReport").setTemplate(
								$("#OperationReport").html());
						$("#OperationReport").processTemplate(pobj1);
					}
					$("#divMyObj").html(ajaxResponse);
					/* alert(ajaxResponse); */
				}
			});
}

function ProcedureDetails(opid) {
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#orderFormDetails").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#testDetails").hide();
	$("#discharge").hide();
	$("#ReplaceSheet").hide();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationNames").show();
	$("#CommonPatInfo").show();
	$("#Operation").show();
	$("#OpearationSummary").show();
	$("#OperationReport").hide();
	$("#CAPAtContent").hide();
	$("#2DECHO").hide();
	$("#Angioplasty").hide();
	var opObj = $("#divMyObj").html();
	opObj = eval('(' + opObj + ')');
	for ( var i = 0; i < opObj.pl.length; i++) {
		if (opObj.pl[i].listTop[0].opobj.oi == opid) {
			myObj = opObj.pl[i];
			break;
		}
	}fetchOperationTheaterNames();
	fetchPTNameForOtSchedule(1);
	fetchDepartmentForOTSchedule(1);
	// $("#CommonPatInfo").setTemplate(commonPatInfo);
	// $("#CommonPatInfo").processTemplate(myObj);
	// myObj = JSON.stringify(myObj);
	 
	 
	operationobj = myObj;

	$("#date-pick").val(operationobj.listTop[0].dt);
	$("#txtStartTime").val(operationobj.listTop[0].st);
	$("#txtEndTime").val(operationobj.listTop[0].et);
	// $("#treatmentoperationid").val(operationobj.listTop[0].id);
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
	
	
	setTimeout(
			function() {
				for ( var i = 0; i < operationobj.listTop.length; i++) {
					/*
					 * if (i != 0) { AddoperationDiv(); }
					 */
					
					$("#txtCathNo" + (i + 1)).val(
							operationobj.listTop[i].tomid);
					var oid = operationobj.listTop[i].opobj.oi;
					var oty = operationobj.listTop[i].opobj.oty;
					var ansid = operationobj.listTop[i].anid;
					fetchAllAnesthesisOnload(i + 1, ansid);
					// alert(oty);
					$("#selOTtype" + (i + 1)).val(oty);
					$("#department" +(i+1) ).val(operationobj.listTop[i].dpt);
					
					
					getOperationName(i + 1);
					$("#selOTName" + (i + 1)).val(oid);
					$("#otName" + (i + 1))
							.val(operationobj.listTop[0].otid);

					$("#sheet" + (i + 1)).val(operationobj.listTop[i].srb);
					$("#txtStent" + (i + 1)).val(
							operationobj.listTop[i].stnt);
					$("#txtRoute" + (i + 1))
							.val(operationobj.listTop[i].rt);
					$("#txtFindings" + (i + 1)).val(
							operationobj.listTop[i].fnd);
					$("#txtProvlon" + (i + 1)).val(
							operationobj.listTop[i].prv);
					$("#txtComment" + (i + 1)).val(
							operationobj.listTop[i].cm);
					$("#txtStatus" + (i + 1)).val(
							operationobj.listTop[i].sts);
					$("#txtVeesal" + (i + 1)).val(
							operationobj.listTop[i].vd);
					$("#surInstrument" + (i + 1)).val(
							operationobj.listTop[i].surinstr);

					$("#ohr" + (i + 1)).val(operationobj.listTop[i].oh);
					$("#chr" + (i + 1)).val(operationobj.listTop[i].ch);
					$("#obp" + (i + 1)).val(operationobj.listTop[i].ob);
					$("#cbp" + (i + 1)).val(operationobj.listTop[i].cb);
					var eqpLi = operationobj.listTop[i].eu;
					var eqpArr = [];
					eqpArr = eqpLi.split("\n");
					for ( var k = 0; k < eqpArr.length - 1; k++) {

						var appendValue = eqpArr[k] + "\n";

						var o = new Option("option text", "value");

						var val = $(o).html(appendValue);

						$("#txtEquipmet" + (i + 1)).append(o);

					}

					// set bed side procedure

					var servicesList = operationobj.listTop[i].liTest;

					for ( var k = 0; k < servicesList.length; k++) {

						var appendValue = servicesList[k].tname + "\n";
						var id = servicesList[k].test_ID + "\n";
						var o = new Option("option text", "value");
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
					docName = operationobj.listTop[i].docnms.split(',');

					for ( var m = 0; m < (docName.length - 1); m++) {
						var o = new Option("option text", "value");
						$(o).html(docName[m + 1] + '\n');
						$(o).val(
								operationobj.listTop[i].liOpDoc[m].idopDoc
										+ '\n');
						$("#txtDocName" + (i + 1)).append(o);
					}

					// set assistant Surgeon Details
					var assSurgeonname = [];
					assSurgeonname = operationobj.listTop[i].assSurgeonName
							.split(',');
					for ( var m = 0; m < (assSurgeonname.length - 1); m++) {
						var o = new Option("option text", "value");
						$(o).html(assSurgeonname[m + 1] + '\n');
						$(o)
								.val(
										operationobj.listTop[i].liAssSurgeon[m].asstDocId
												+ '\n');
						$("#txtAssSurgeon" + (i + 1)).append(o);
					}

				}
			}, 1000);
  
}


var procedureReportTemp="<div style='width: 98%; padding: 2%; padding-right: none;'><div style='width: 100%;'><div	style='width: 100%; font-size: 24px; text-align: center; font-weight: bold;'>CORONARY ANGIOGRAPHY REPORT</div></div></div><div style='width: 100%; padding-top: 15px; height: 50px;'><div style='width: 12%; text-align: left; padding-left: 2px; float: left; font-weiht: bold;'>Patient Name:-</div><div id='pname' style='width: 38%; float: left;'>{$T.cal[0].pn}</div><div style='width: 8%; text-align: left; padding-left: 90px; float: left; font-weight: bold;'>Age:-&nbsp;&nbsp;</div><div id='age' style='width: 30px;'>{$T.cal[0].ag}</div><div style='width: 40%; padding-top: 10px; text-align: left; padding-left: 20px; float: right; font-weight: bold; padding-top: 5px;'>Date:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type='text' value='{$T.cal[0].cd}' id='date' name='date'></div><div style='width: 12%; text-align: left; padding-left: 2px; float: left; font-weight: bold; padding-top: 7px;'>Ref By:- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> <div id='rb' style='width: 20%; float: left; padding-top: 7px;'>{$T.cal[0].rb}</div></div><div style='width: 100%; padding-top: 15px; height: 30px;'><div style='width: 40%; text-align: left; font-weight: bold; padding-top: 10px;'>Register Cath ID.:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input 	style='border: 0.2px solid; width: 43.5%;' name='regCathId'	onkeypress='return validateNumbers(event)' id='regCathId'	value='{$T.cal[0].regcid}' /></div><div style='width: 40%; text-align: left; padding-left: 20px; float: right; font-weight: bold; padding-top: 10px;'>Cath No.:-&nbsp&nbsp<input readonly='readonly' style='background: lightgray;' name='cathno' id='cathno'	value='{$T.cal[0].cn}'></div></div><div style='width: 100%; height: 70px; padding-top: 20px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'></div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='angtext' rows='3' cols='80' name='angtext'>{$T.cal[0].at}</textarea></div></div><div style='width: 100%; padding-top: 10px; height: 30px;'><div style='width: 15%; color: #000; text-align: left; padding-left: 0%;'>Left Main:-</div><div style='width: 18%; color: #FFF; text-align: center;'><input type='text' name='lfMain' value='{$T.cal[0].lm}'	style='width: 95%; border: 0.2px solid;' id='lfMain'></div></div><div style='width: 100%; height: 100px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Left Anterior Descending:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'> <textarea style='border: 0.2px solid;' class='' id='lfAntDesc'	rows='3' cols='80' name='lfAntDesc'>{$T.cal[0].lad}</textarea></div></div><div style='width: 100%; height: 65px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Left Circumflex:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='lfCirfx'	rows='2' cols='80' name='lfCirfx'>{$T.cal[0].lc}</textarea></div></div><div style='width: 100%; height: 45px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Right Coronary Artery:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='rtCorAngio'	rows='1' cols='80' name='rtCorAngio'>{$T.cal[0].rca}</textarea></div></div><div style='width: 100%; height: 45px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Impression:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class='' id='impression'	rows='1' cols='80' name='impression'>{$T.cal[0].lmr}</textarea></div></div><div style='width: 100%; height: 45px;'><div style='width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;'>Recommendation:-</div><div style='width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;'><textarea style='border: 0.2px solid;' class=''	id='reccommendation' rows='1' cols='80' name='Reccommendation'>{$T.cal[0].re}</textarea></div></div><div style='width: 100%; padding-top: 15px; height: 20px; font-size: 14px; font-weight: bold;'><div style='width: 50%; text-align: left; padding-left: 2px; float: left;'>Dr.S.M.Roplekar</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right;'>Dr.Mrs.K.S.Roplekar</div></div><div style='width: 100%; padding-top: px; height: 5px; font-size: 14px; font-weight: bold;'><div style='width: 50%; text-align: left; padding-left: 2px; float: left;'>MD(Med)DM(Card)DNB(Card)</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right;'>MD(Med)</div></div><div style='width: 100%; padding-top: 10px; height: 5px; font-size: 14px; font-weight: bold;'><div style='width: 50%; text-align: left; padding-left: 2px; float: left;'>Interventional Cardiologist</div><div style='width: 40%; text-align: left; padding-left: 20px; float: right;'>Cardiologist</div></div><div style='width: 100%; padding-top: 10px; height: 5px;'><div style='width: 100%; text-align: left; padding-left: 2px; float: left;'>Note:-(Kindly note that Angiography Report Record will be saved only for 1 month on Hard disc)</div></div>";

function procedureReportDetails(cathID, protype) {
	
	$("#RTreatment").hide();
	$("#DTreatment").hide();
	$("#prescription").hide();
	$("#patientinfo").hide();
	$("#orderForm").hide();
	$("#NursingChartDate").hide();
	$("#IPD_DICContent").hide();
	$("#orderFormDetails").hide();
	$("#DoctorRoundDate").hide();
	$("#DoctorRoundDetails").hide();
	$("#ReplaceSheet").hide();
	$("#InvestigationChart").hide();
	$("#InvestigationChartDetails").hide();
	$("#OperationNames").hide();
	$("#CommonPatInfo").hide();
	$("#Operation").hide();
	$("#discharge").hide();
	$("#testDetails").hide();
	$("#OpearationSummary").hide();
	$("#OperationReport").show();
	$("#2DECHO").hide();
	var input = [];
	if (protype.indexOf("ANGIOGRAPHY") != -1) {
		
		input.push('action=getPreAngiography');
	} else {
		
		input.push('action=getPreAngioplasty');
	}
	input.push('cathId=' + encodeURIComponent(cathID));
	var str = input.join('&');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			
			
			if (protype.indexOf("ANGIOGRAPHY") != -1) {
				if(pobj1.cal.length==0){
					alert("Angiography Report is not available.");
				}else{
					$("#CAPAtContent").show();
					$("#Angioplasty").hide();
				$("#CAPAtContent").setTemplate(procedureReportTemp);
				$("#CAPAtContent").processTemplate(pobj1);
				}
			} else {
				if(pobj1.al.length==0){
					alert("Angioplasty Report is not available.");
				}else{
					$("#Angioplasty").show();
				$("#CAPAtContent").hide();
				$("#AngioContent").setTemplate(editAngioContent);
				$("#AngioContent").processTemplate(pobj1);
				}
			}
			 
		}
	});
}

function Get2DECHOReport(pageName, type) {
	if (type == "case") {
		$("#RTreatment").hide();
		$("#DTreatment").hide();
		$("#prescription").hide();
		$("#patientinfo").hide();
		$("#orderForm").hide();
		$("#NursingChartDate").hide();
		$("#IPD_DICContent").hide();
		$("#orderFormDetails").hide();
		$("#DoctorRoundDate").hide();
		$("#DoctorRoundDetails").hide();
		$("#ReplaceSheet").hide();
		$("#InvestigationChart").hide();
		$("#InvestigationChartDetails").hide();
		$("#OperationNames").hide();
		$("#CommonPatInfo").hide();
		$("#discharge").hide();
		$("#Operation").hide();
		$("#OpearationSummary").hide();
		$("#OperationReport").hide();
		$("#testDetails").hide();
		$("#CAPAtContent").hide();
		$("#2DECHO").show();
		$("#Angioplasty").hide();
	}
	myObj = JSON.parse($("#pinfo").html());
	var inputs = [];
	inputs.push('action=fetchEchoStudy');
	inputs.push('pageName=' + pageName);
	inputs.push('byName=' + myObj.trid);
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

			$("#divEchoId").html(ajaxResponse);
			echo2d = eval('(' + ajaxResponse + ')');
			/*
			 * if (pobj1.esl.length == 0) { alert("Patient Not Found"); }
			 * $("#preEchoDashContent").setTemplate(prevEchoStudyDashboard);
			 * $("#preEchoDashContent").processTemplate(pobj1);
			 */
			echo = echo2d.esl[0];
			if (type == "case") {
				$("#addEchoContent").setTemplate(editEchoStudyTemp);
				$("#addEchoContent").processTemplate(echo);
			}
		}
	});

	setTimeout(function() {
		if (type == "case" && echo2d.esl[0] != null) {
			$("#lvidd").val(echo.lv);
			$("#epss").val(echo.eps);
			$("#lvids").val(echo.lvids);
			$("#ivsd").val(echo.iv);
			$("#lvpw").val(echo.lvpw);
			$("#ef").val(echo.ef);
			$("#ao").val(echo.ao);
			$("#la").val(echo.la);
			$("#pasp").val(echo.ps);
		}
		if (echo2d.esl[0] == null) {
		} else {
			var inputs = [];
			inputs.push('action=fetchEchoTestTable');
			inputs.push('echo_id=' + echo.ei);
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
					echotable = eval('(' + ajaxResponse + ')');
					if (type == "case") {
						$("#tableContent").setTemplate(echoStudyTestTable);
						$("#tableContent").processTemplate(echotable);
					}
				}
			});
		}
	}, 1000);
}

/*
 * function setprintCaseReg() { $("#printcase").show();
 * $("#caseRegister").hide(); }
 */

function loadAllPatientTests() {
	// alert("");
	$("#testDetails").show();
	myObj = JSON.parse($("#pinfo").html());
	count = 1;
	var inputs = [];
	inputs.push('action=loadAllPatientTests');
	inputs.push('trid=' + myObj.trid);
	var str = inputs.join('&');
	jQuery
			.ajax({
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
					// alert("alert should be here");
					alert(ajaxResponse);
					TestBean = eval('(' + ajaxResponse + ')');
					$('#test').setTemplate(invest);
					$("#test").processTemplate(TestBean);
					// $("#divAjaxRepo").html(ajaxResponse);
					$("#date-pick").val(
							TestBean.tlist[0].listTreatmentTests[0].time);
					// alert();
					var userType = $("#userType").val();
					if (userType == "admin") {
					} else {
						var a = $("#count").val();
						for ( var i = 0; i <= a; i++) {
							var b = $("#test" + i).val();

							if (b != "") {

								$("#test" + i).attr('readonly', 'readonly');
								$("#test" + i)
										.attr('style',
												'background-color:lightgray;width: 80%;border-width: 2px');
							}
						}
					}
				}
			});
	// setTimeout('printTest()',2000);
};

function printTest() {
 
		myObj = JSON.parse($("#pinfo").html());
		patID = myObj.pi;
		treatID = myObj.trid;
		var inputs = [];
		inputs.push('action=getDischargeSummary');
		inputs.push('patID=' + patID);
		inputs.push('treatID=' + treatID);
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
						pobj = eval('(' + ajaxResponse + ')');
						 
						var WindowObject = window.open('', ' ', '');
						WindowObject.document
								.writeln('<html><body> <strong><h2>Test Investigation Chart</h2></strong><table cellpadding="0" cellspacing="0" style="border: solid 1px;" width="100%">');

						WindowObject.document
								.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Name of the Patient</td><td width="40%" style="border: solid 1px;padding-left: 10px;" align="left" >'
										+ pobj.pl[0].fn +' '+pobj.pl[0].mn+' '+pobj.pl[0].ln
										+ ' </td><td  width="15%" style="border: solid 1px;padding-left: 10px;" align="left">Reg. No.</td><td width="15%" style="border: solid 1px;padding-left: 10px;" align="left" >'
										+ pobj.pl[0].pi + ' </td></tr>');
						WindowObject.document
								.writeln('<tr height="35px"><td  style="border: solid 1px;padding-left: 10px;" align="left">Age</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
										+ pobj.pl[0].ag
										+ 'Yrs </td><td  style="border: solid 1px;padding-left: 10px;" align="left">Sex</td><td style="border: solid 1px;padding-left: 10px;" align="left" >'
										+ pobj.pl[0].sx + ' </td></tr>');
						
						WindowObject.document
						.writeln('<tr><td  style="border: solid 1px;padding-left: 10px;" align="left">Investigation</td><td colspan="3" style="border: solid 1px;" align="left" ><table border="1" cellpadding="0" cellspacing="0" width="100%" style="border-color: lightgray;"><tr height="25"><td align="center">Sr. No.</td><td align="center">Test Name</td><td align="center">Test Date</td><td align="center">Test Result</td><td align="center">Test Count</td></tr>');
				for ( var k = 0; k < pobj.pl[0].liT.length; k++) {
					k++;
					WindowObject.document
							.writeln('<tr height="20"><td align="center">'
									+ k--
									+ '</td><td style="padding-left: 10px;">'
									+ pobj.pl[0].liT[k].tname
									+ '</td><td style="padding-left: 10px;">'
									+ pobj.pl[0].trt[k].time
									+ '</td><td style="padding-left: 10px;">'
									+ pobj.pl[0].trt[k].test_report
									+ '</td><td style="padding-left: 10px;">'
									+ pobj.pl[0].trt[k].test_count
									+ '</td></tr>');
				}
				WindowObject.document.writeln('</table> </td></tr>');
					 
						WindowObject.document.writeln('</table><body></html>');
						WindowObject.document.close();
						WindowObject.focus();
						WindowObject.print();
						WindowObject.close();
					}

				});
	 
}

function print2DEcho() {
	Get2DECHOReport("case2D", "print");
	// alert(echotable);
	if (echo2d.esl[0] != null) {
		setTimeout(
				function() {
					var WindowObject = window.open('', ' ', '');
					WindowObject.document
							.writeln('<div style="width: 98%;  padding-top: 30%; padding-right: none;"><div style="width: 100%;"><div	style="width: 100%; font-size: 24px; text-align: center; font-weight: bold; ">2-D ECHO & COLOR DOPPLER STUDY</div></div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 30px; height: 30px;"><div style="width: 95%; text-align: left; padding-left: 2px; float: left; font-weight: bold;">Patient Name:- Mr./Mrs &nbsp;&nbsp;&nbsp;'
									+ echo.fn + " " + echo.ln + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 12%; text-align: right; padding-left: 52.5%; float: left; font-weight: bold;">Age:-&nbsp;&nbsp;</div><div id="age" style="width: 12%; float: left;">'
									+ echo.ag + 'Yrs</div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 15px; height: 30px;"><div style="width: 50%; text-align: left; padding-left: 2px; float: left; font-weight: bold;">Ref By:-&nbsp;&nbsp;&nbsp;'
									+ echo.rb
									+ '</div><div style="width: 42%; text-align: left; padding-left: 16px; float: right; font-weight: bold; padding-top: 7px;">Date:- '
									+ echo.ed + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; height: 115px; padding-top: 45px; "><div	style="width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;">2-D ECHO SHOWS:-</div><div style="width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;">'
									+ echo.es + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; height: 65px;"><div style="width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;">DOPPLER STUDY:-</div><div style="width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;">'
									+ echo.ds + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; height: 175px;"><div style="width: 15%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: left;">CONCLUSSION:-</div><div style="width: 85%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float: right;">'
									+ echo.cn + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 15px; height: 20px; font-size: 14px; font-weight: bold;"><div style="width: 50%; text-align: left; padding-left: 2px; float: left;">Dr.S.M.Roplekar </div><div style="width: 40%; text-align: left; padding-left: 20px; float: right;">Dr.Mrs.K.S.Roplekar</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: px; height: 5px; font-size: 14px; font-weight: bold;"><div style="width: 50%; text-align: left; padding-left: 2px; float: left;">MD(Med)DM(Card)DNB(Card)</div><div style="width: 40%; text-align: left; padding-left: 20px; float: right;">MD(Med)</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 5px; font-size: 14px; font-weight: bold;"><div style="width: 50%; text-align: left; padding-left: 2px; float: left;">Interventional Cardiologist</div><div style="width: 40%; text-align: left; padding-left: 20px; float: right;">Cardiologist</div></div>');
					WindowObject.document
							.writeln('<div style="width: 98%; padding-top: 40%; padding-right: none;"><div style="width: 100%;"><div	style="width: 100%; font-size: 24px; text-align: center; font-weight: bold;">M-MODE & DOPPLER MEASUREMENTS</div></div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 45px; height: 30px;"><div style="width: 15%; color: #000; text-align: left; float: left;">LVIDD:-</div><div style="width: 18%; color: #FFF; text-align: center;float: left; ">'
									+ echo.lv
									+ '</div><div style="width: 15%; color: #000; text-align: right; float: left; ">EPSS:-</div><div style="width: 18%; color: #FFF; text-align: center; float: left; ">'
									+ echo.eps + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 30px;"><div style="width: 15%; color: #000; text-align: left; float: left;">LVIDS:-</div><div style="width: 18%; color: #FFF; text-align: center; float: left; ">'
									+ echo.lvids + ' </div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 30px;"><div style="width: 15%; color: #000; text-align: left; float: left;">IVSD:-</div><div style="width: 18%; color: #FFF; text-align: center; float: left; ">'
									+ echo.iv + ' </div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 30px;"><div style="width: 15%; color: #000; text-align: left; float: left;">LVPW:-</div><div style="width: 18%; color: #FFF; text-align: center; float: left; ">'
									+ echo.lvpw + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 30px;"><div style="width: 15%; color: #000; text-align: left; float: left;">EF:-</div><div style="width: 18%; color: #FFF; text-align: center; float: left; ">'
									+ echo.ef + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 30px;"><div style="width: 15%; color: #000; text-align: left; float: left;">AO:-</div><div style="width: 18%; color: #FFF; text-align: center; float: left; ">'
									+ echo.ao + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 30px;"><div style="width: 15%; color: #000; text-align: left; float: left;">LA:-</div><div style="width: 18%; color: #FFF; text-align: center; float: left; ">'
									+ echo.la + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 165px;"><div style="width: 80%; font-family: Tahoma, Geneva, sans-serif; font-size: 13px; color: #161616; float:;" id="tableContent"><table cellspacing="0" cellpadding="0" style="border: 1px solid;"><tbody><tr><td align="center" style="border: 1px solid;">Value</td><td align="center" style="border: 1px solid;">Velocity</td><td align="center" style="border: 1px solid;">Peak Gradient</td><td align="center" style="border: 1px solid;">Mean Gradient</td><td align="center" style="border: 1px solid;">Regurge</td></tr><tr><td width="15%"><input type="text" id="type1" value="MV" name="" style="border: 1px solid; text-align:center; "></td><td><input type="text" id="MVVel1" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[0].vel
									+ '" name=""></td><td><input type="text" id="MVPeak1" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[0].peak
									+ '" name=""></td><td><input type="text" id="MVMean1" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[0].mean
									+ '" name=""></td><td><input type="text" id="MVRegurge1" style="width: 100%;   border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[0].regu
									+ '" name=""></td></tr><tr><td width="15%"><input type="text" id="type2" value="AV" name="" style="border: 1px solid; text-align:center; "></td><td><input type="text" id="MVVel2" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[1].vel
									+ '" name=""></td><td><input type="text" id="MVPeak2" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[1].peak
									+ '" name=""></td><td><input type="text" id="MVMean2" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[1].mean
									+ '" name=""></td><td><input type="text" id="MVRegurge2" style="width: 100%;   border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[1].regu
									+ '" name=""></td></tr><tr><td width="15%"><input type="text" id="type3" value="TV" name="" style="border: 1px solid; text-align:center; "></td><td><input type="text" id="MVVel3" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[2].vel
									+ '" name=""></td><td><input type="text" id="MVPeak3" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[2].peak
									+ '" name=""></td><td><input type="text" id="MVMean3" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[2].mean
									+ '" name=""></td><td><input type="text" id="MVRegurge3" style="width: 100%;   border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[2].regu
									+ '" name=""></td></tr><tr><td width="15%"><input type="text" id="type4" value="PV" name="" style="border: 1px solid; text-align:center; "></td><td><input type="text" id="MVVel4" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[3].vel
									+ '" name=""></td><td><input type="text" id="MVPeak4" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[3].peak
									+ '" name=""></td><td><input type="text" id="MVMean4" style="width: 100%; border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[3].mean
									+ '" name=""></td><td><input type="text" id="MVRegurge4" style="width: 100%;   border: 0.2px solid; text-align:center;" value="'
									+ echotable.esl[3].regu
									+ '" name=""></td></tr></tbody></table></div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%; padding-top: 10px; height: 30px;"><div style="width: 15%; color: #000; text-align: left; float: left; ">PASP:-</div><div style="width: 18%; color: #FFF; text-align: center; float: left; ">'
									+ echo.ps + '</div></div>');
					WindowObject.document
							.writeln('<div style="width: 100%;  padding-top: 10px; text-align: left; padding-left: 2px; float: left;">Note:-(Kindly	note that 2-D Echo Record will be saved only for 1 month on	Hard disc)</div>');
					WindowObject.focus();
					WindowObject.print();
					WindowObject.close();
				}, 3000);
	};
}
var optype = "";
function printAngioplasty() {
	myObj = JSON.parse($("#pinfo").html());
	var input = [];
	input.push('action=DisplayOpSum');
	input.push('trid=' + encodeURIComponent(myObj.trid));
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
			// alert(r);
			optype = eval('(' + ajaxResponse + ')');
		}
	});
	setTimeout(
			function() {
				var cathID = '';
				var flag = 0;
				for ( var k = 0; k < optype.pl.length; k++) {
					if (optype.pl[k].obTO.pn.indexOf("ANGIOPLASTY") != -1) {
						flag = 1;
						cathID = optype.pl[k].obTO.id;
						break;
					}
				}
				if (flag == 1) {
					var input = [];
					input.push('action=getPreAngioplasty');
					input.push('cathId=' + encodeURIComponent(cathID));
					var str = input.join('&');
					jQuery
							.ajax({
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
									pobj11 = eval('(' + ajaxResponse + ')');
									// alert(pobj11);
									var WindowObject = window.open('', '', '');
									WindowObject.document
											.writeln('<div style="width: 98%;  padding-right: none; "><div style="width: 100%;"><div style="width: 100%; font-size: 24px; text-align: center; padding-top: 25%; font-weight: bold;">CORONARY ANGIOPLASTY REPORT</div></div></div>');
									
									WindowObject.document
									.writeln('<div	style="width: 100%; padding-top: 45px; height: 50px; font-size: 18px;"><div style="width: 100%"><div style="width: 50%; float: left"><div style="width: 30%; float: left; font-weight: bold; font-size: 30px">Patient Name:-</div><div id="pname" style="width: 70%; float: left; font-size: 30px;">'
											+ pobj11.al[0].pn
											+ '</div></div><div style="width: 50%; float: left;"><div	style="width: 15%; font-size: 30px; float: left; font-weight: bold; margin-left: 270px;">Age:-</div><div id="age" style="width: 35%; font-size: 30px; float: left;">'
											+ pobj11.al[0].ag
											+ '</div></div></div><div style="width: 100%"><div style="width: 50%; float: left"><div	style="width: 30%; float: left; font-weight: bold; font-size: 30px">Ref	By:-</div><div id="rb" style="width: 70%; float: left; font-size: 30px;">'
											+ pobj11.al[0].rb
											+ '</div></div><div style="width: 50%; float: left"><div	style="width: 15%; font-size: 30px; float: left; font-weight: bold; margin-left: 270px;">Date:-</div><div id="date" style="width: 35%; font-size: 30px; float: left;">'
											+ pobj11.al[0].dt + '</div></div></div></div>');
								
									WindowObject.document
									.writeln('<div style="width: 100%;"><div style="width: 50%; float: left"><div style="width: 30%; float: left; font-weight: bold; font-size: 30px">Cath No.:-</div><div id="cathNo" style="width: 70%; float: left; font-size: 30px;">'
											+ pobj11.al[0].rcn + '</div></div></div>');
									
									WindowObject.document
									.writeln('<div style="width: 85%;font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left; padding-top: 5%;"><textarea  style="border:none;font-size: 30px;font-family: Tahoma, Geneva, sans-serif;  color: #161616; " rows="25" cols="100">'
											+ pobj11.al[0].ds + '</textarea></div>');
									
									WindowObject.document
									.writeln('<div style="width: 100%; padding-top: 10%;"><div style="width: 1%;padding-top: 10%; font-family: Tahoma, Geneva, sans-serif;font-weight: bold; font-size: 30px; color: #161616; ">Impression:-</div><div style="width: 80%; font-family: Tahoma, Geneva, sans-serif;  color: #161616; float: left;font-size: 30px;"><textarea   style="border:none;font-size: 30px;font-family: Tahoma, Geneva, sans-serif;  color: #161616;" rows="5" cols="100" >'
											+ pobj11.al[0].im + '</textarea></div></div>');
													
									WindowObject.document.writeln('<br><br><br><br><br><br>');
									
									WindowObject.document
									.writeln('<div style="width: 100%; padding-top: 15%; height: 18px; font-size: 30px; font-weight: bold;"><div style="width: 65%; text-align: left; padding-left: 2px; float: left;">Dr.S.M.Roplekar</div><div style="width: 25%; text-align: left; padding-left: 20px; float: right;">Dr.Mrs.K.S.Roplekar</div></div><div style="width: 100%; padding-top: px; height: 5px; font-size: 30px; font-weight: bold;"><div style="width: 65%; text-align: left; padding-left: 2px; float: left;">MD(Med)DM(Card)DNB(Card)</div><div style="width: 25%; text-align: left; padding-left: 20px; float: right;">MD(Med)</div></div>');
							WindowObject.document
									.writeln('<div	style="width: 100%; padding-top: 10px; height: 5px; font-size: 30px; font-weight: bold;"><div style="width: 65%; text-align: left; padding-left: 2px; float: left;">Interventional Cardiologist</div><div style="width: 25%; text-align: left; padding-left: 20px; float: right;">Cardiologist</div></div><div style="width: 100%; padding-top: 10px; height: 5px; font-size: 20px;"><div style="width: 100%; text-align: left; padding-left: 2px; float: left; padding-top: 10px;">Note:-(Kindly note that Angioplasty Record will be saved only for 1 month on Hard disc)</div></div>');

							WindowObject.focus();
							WindowObject.print();
							WindowObject.close();
								}
							});
				} else {
					alert("Angioplasty Report is not available...");
				}
			}, 2000);
}