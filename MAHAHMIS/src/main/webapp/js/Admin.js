var remVals = [];
var QueryString = "insert";
var rowCount = 1;
var count = 1;
var sr = 1;
var sr1 = 1;
var ilSize;
var i = 1;
var i1 = 0;
var mm = 1;
var response111;
var ajaxResponse = "";
var BillTowardsManagementTemp = '{#foreach $T.listBillTowards as listBillTowards}<tr id="remove{rowCount}">	<td class="col-md-1-1">{rowCount}</td>	<td class="col-md-10-1"><input id="two{rowCount}" style="width:90%"  type="text"		name="textfield" value="{$T.listBillTowards.tname}" /><input		id="idtwo{rowCount}" type="hidden" name="textfield"		value="{$T.listBillTowards.id}" /></td>	<td class="col-md-1-1"><input type="checkbox" style="display:none; " value="{rowCount++}"	id="txtRowCount" name="txtRowCount" /></td></tr>{#/for}<input type="hidden" value="{--rowCount}" id="RowCount" />';

var defaultViewBedChargesTemp = "<table style='margin-bottom: 9px; background: #f5f5f5;'	class='table-bordered table cf'>	<thead class='cf'>		<tr>			<th style='height: 21.5px;' class='col-md-1-1 center'><div					class='TextFont'>#</div></th>			<th style='height: 21.5px;' class='col-md-4-1 center'><div					class='TextFont'>Hall Name</div></th>			<th style='height: 21.5px;' class='numeric col-md-3-1 center'><div					class='TextFont'>Hall Type</div></th>			<th style='height: 21.5px;' class='numeric col-md-2-1 center'><div					class='TextFont'>Lease normal</div></th>			<th style='height: 21.5px; padding-right: 24px;'				class='numeric col-md-2-1 center'><div class='TextFont'>Lease					Isolation</div></th>			<th style='border-left: 0px !important; width:1.5%;'></th>		</tr>	</thead></table><div	style='height: 315px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;'	class='col-md-12-1'>	<table class='table table-bordered'>		<tbody id='bedMangTemp'>			{#foreach $T.hl as hl}			<tr>				<td class='col-md-1-1'>{count}.</td>				<td class='col-md-4-1'><div class='TextFont'>						<input class='form-control input-SmallText col-md-12-1 margin-1'							type='hidden' value='{$T.hl.hi}' id='idhname{count}'>{$T.hl.hn}					</div></td>				<td class='  numeric col-md-3-1 '><div class='TextFont'>						<input class='form-control input-SmallText col-md-12-1 margin-1'							type='hidden' value='{$T.hl.ht}' id='idhtype{count}'>{$T.hl.htnm}					</div></td>				<td class='  numeric col-md-2-1'><div class='TextFont'>						<input class='form-control input-SmallText col-md-12-1 margin-1'							type='text' id='txtLeaseNormalPay{count}' value='{$T.hl.hal}'							onkeypress='return validateNumbers(event)'text-align:right;'>					</div></td>				<td class='  numeric col-md-2-1'><div class='TextFont'>						<input type='text' id='txtLeaseIsolation{count}'							class='form-control input-SmallText col-md-12-1 margin-1'							onkeypress='return validateNumbers(event)'							value='{$T.hl.leaseiso}' style='width: 50%; text-align: right;'>					</div></td>				<input type='hidden' id='idbedcorporate{count}' value='{$T.hl.idb}' />				<input type='hidden' id='count' value='{count++}' />{#/for}				<input type='hidden' value='' id='addRowCount' />				<input type='hidden' value='{count}' id='RowCount'>				<input type='hidden' id='queryType' value='insert' />			</tr>		</tbody>	</table></div>";

var defaultViewBedChargesTempCorp="<table style='margin-bottom: 9px; background: #f5f5f5;' 	class='table-bordered table cf'> 	<thead class='cf'>		<tr>			<th style='height: 21.5px;' class='col-md-1-1 center'><div					class='TextFont'>#</div></th>			<th style='height: 21.5px;' class='col-md-3-1 center'><div					class='TextFont'>Hall Name</div></th>			<th style='height: 21.5px;' class='numeric col-md-3-1 center'><div					class='TextFont'>Hall Type</div></th>			<th style='height: 21.5px;'				class='numercol-md-12-1ic col-md-1-1 center'><div					class='TextFont'>Lease normal pay</div></th>			<th style='height: 21.5px;' class='numeric col-md-1-1 center'><div					class='TextFont'>Lease normal copay</div></th>			<th style='height: 21.5px; padding-right: 24px;'				class='numeric col-md-1-1 center'><div class='TextFont'>Lease					Isolation pay</div></th>			<th style='height: 21.5px; padding-right: 24px;'				class='numeric col-md-1-1 center'><div class='TextFont'>Lease Isolation copay</div></th>			<th style='height: 21.5px;' class='col-md-1-1 center'><div					class='TextFont'></div></th>			<th style='border-left: 0px !important; width: 1.5%;'></th>		</tr>	</thead></table><div	style='height: 315px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #ddd;'	class='col-md-12-1'>	<table class='table table-bordered'>		<tbody id='bedMangTemp'>			{#foreach $T.hl as hl}			<tr>				<td class='col-md-1-1'>{count}.</td>				<td class='col-md-3-1'><div class='TextFont'>						<input class='form-control input-SmallText col-md-12-1 margin-1'							type='hidden' value='{$T.hl.hi}' id='idhname{count}'>{$T.hl.hn}					</div></td>				<td class='  numeric col-md-3-1 '><div class='TextFont'>						<input class='form-control input-SmallText col-md-12-1 margin-1'							type='hidden' value='{$T.hl.ht}' id='idhtype{count}'>{$T.hl.htnm}					</div></td>				<td class='  numeric col-md-1-1'><div class='TextFont'>						<input class='form-control input-SmallText col-md-12-1 margin-1'							type='text' id='txtLeaseNormalPay{count}'							value='{$T.hl.leaPay ||$T.hl.hal}'							onkeypress='return validateNumbers(event)'text-align:right;'>					</div></td>				<td class='  numeric col-md-1-1'><div class='TextFont'>						<input type='text' id='txtLeaseNormalCoPay{count}'							class='form-control input-SmallText col-md-12-1 margin-1'							onkeypress='return validateNumbers(event)'							value='{$T.hl.leaCoPay || '0'}' style='text-align: right;'>					</div></td>				<td class='  numeric col-md-1-1'><div class='TextFont'>						<input class='form-control input-SmallText col-md-12-1 margin-1'							type='text' id='txtLeaseIsolationPay{count}'							value='{$T.hl.leaIsoPay ||$T.hl.leaseiso}'							onkeypress='return validateNumbers(event)'text-align:right;' >					</div></td>				<td class='  numeric col-md-1-1'><div class='TextFont'>						<input type='text' id='txtLeaseIsolationCoPay{count}'							class='form-control input-SmallText col-md-12-1 margin-1'							onkeypress='return validateNumbers(event)'							value='{$T.hl.leaIsoCoPay || '0'}' style='text-align: right;'>					</div></td>				<th style='height: 21.5px;' class='col-md-1-1 center'><div						class='TextFont'>						{#if $T.hl.billableFlag=='Y'} <input type='checkbox'							id='chargesApplicableFlag{count}' name='chargesApplicableFlag'							checked='checked' value='{$T.hl.billableFlag}'							style='width: 40%;' /> {#else} <input type='checkbox'							id='chargesApplicableFlag{count}' value='{$T.hl.billableFlag}'							name='chargesApplicableFlag' style='width: 40%;' /> {#/if}					</div></th>				<input type='hidden' id='idbedcorporate{count}' value='{$T.hl.idb}' />				<input type='hidden' id='count' value='{count++}' />{#/for}				<input type='hidden' value='' id='addRowCount' />				<input type='hidden' value='{count}' id='RowCount'>				<input type='hidden' id='queryType' value='insert' />			</tr>		</tbody>	</table></div>";

var editUserTemp = "<div style='width: 50%; padding-top: 2.5%;padding-left: 5%;'><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Full Name</div><div style='width: 60%;'><input type='text' id='dname'	name='dname' style='width: 100%; '	onkeypress='return validatealphabetic(event)' value='{$T.obd.dn}'/></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>UserName</div><div style='width: 60%;'><input value='{$T.un}'  type='text' id='uname'	name='uname' style='width: 100%; '	/></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>PassWord</div><div style='width: 60%;'><input value='{$T.up}' type='text' id='password'	name='password' style='width: 100%; ' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Status</div><div style='width: 30%; '><select	style='width: 100%; ' id='status' name='status'><option value='Y'>Active</option><option value='N'>Deactive</option></select></div></div> </div><div style='width: 45%; padding-top: 2%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Education</div><div style='width: 60%;'><input value='{$T.obd.ed}' type='text' id='education' name='education' style='width: 100%; ' /></div> </div> <div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Specialization </div><div style='width: 60%;'><input value='{$T.obd.sp}' type='text' id='specialization'	name='specialization' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Address </div><div style='width: 60%;'><input value='{$T.obd.ad}' type='text' id='add' name='add' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Contact No </div><div style='width: 60%;'><input value='{$T.obd.mb}' type='text' id='contact'	name='contact' style='width: 100%; '	onkeypress='return validateNumbers(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>E-Mail</div><div style='width: 60%;'><input value='{$T.obd.eid}' type='text' id='email'	name='email' style='width: 100%; ' /></div></div><div  style='width: 50%; padding-top: 10%; padding-left:50'><div style='float:right;'><input id='queryType' value='update' type='hidden'  /></div></div></div>";

var editVisitDocTemp = "<div style='width: 50%; padding-top: 2.5%;padding-left: 5%;'><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Full Name</div><div style='width: 60%;'><input type='text' id='dname'	name='dname' style='width: 100%; '	onkeypress='return validatealphabetic(event)' value='{$T.obd.dn}'/></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Fees</div><div style='width: 60%;'><input type='text' id='Fees'	name='Fees' style='width: 100%; ' value='{$T.obd.df}' onkeypress='return validatePrice(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Education</div><div style='width: 60%;'><input value='{$T.obd.ed}' type='text' id='education' name='education' style='width: 100%; ' /></div> </div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Status</div><div style='width: 30%; '><select	style='width: 100%; ' id='status' name='status'><option value='Y'>Active</option><option value='N'>N</option></select></div></div> </div><div style='width: 45%; padding-top: 2%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Specialization </div><div style='width: 60%;'><input value='{$T.obd.sp}' type='text' id='specialization'	name='specialization' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Address </div><div style='width: 60%;'><input value='{$T.obd.ad}' type='text' id='add' name='add' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Contact No </div><div style='width: 60%;'><input value='{$T.obd.mb}' type='text' id='contact'	name='contact' style='width: 100%; '	onkeypress='return validateNumbers(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>E-Mail</div><div style='width: 60%;'><input value='{$T.obd.eid}' type='text' id='email'	name='email' style='width: 100%; ' /></div></div><div  style='width: 50%; padding-top: 10%; padding-left:50'><div style='float:right;'><input id='queryType' value='update' type='hidden'  /></div></div></div><input id='docType' value='{$T.obd.dt}' type='hidden'  />";

var editDoctorTemp = "<div style='width: 50%; padding-top: 2.5%;padding-left: 5%;'><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Full Name</div><div style='width: 60%;'><input type='text' id='dname'	name='dname' style='width: 100%; '	onkeypress='return validatealphabetic(event)' value='{$T.obd.dn}'/></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>UserName</div><div style='width: 60%;'><input value='{$T.un}'  type='text' id='uname'	name='uname' style='width: 100%; '	/></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>PassWord</div><div style='width: 60%;'><input value='{$T.up}' type='text' id='password'	name='password' style='width: 100%; ' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Fees</div><div style='width: 60%;'><input type='text' id='Fees'	name='Fees' style='width: 100%; ' value='{$T.obd.df}' onkeypress='return validatePrice(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Status</div><div style='width: 30%; '><select	style='width: 100%; ' id='status' name='status'><option value='Y'>Active</option><option value='N'>Deactive</option></select></div></div> </div><div style='width: 45%; padding-top: 2%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Education</div><div style='width: 60%;'><input value='{$T.obd.ed}' type='text' id='education' name='education' style='width: 100%; ' /></div> </div> <div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Specialization </div><div style='width: 60%;'><input value='{$T.obd.sp}' type='text' id='specialization'	name='specialization' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Address </div><div style='width: 60%;'><input value='{$T.obd.ad}' type='text' id='add' name='add' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Contact No </div><div style='width: 60%;'><input value='{$T.obd.mb}' type='text' id='contact'	name='contact' style='width: 100%; '	onkeypress='return validateNumbers(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>E-Mail</div><div style='width: 60%;'><input value='{$T.obd.eid}' type='text' id='email'	name='email' style='width: 100%; ' /></div></div><div  style='width: 50%; padding-top: 10%; padding-left:50'><div style='float:right;'><input id='queryType' value='update' type='hidden'  /></div></div></div>";

var UserRegTemp = "<div style='width: 50%; padding-top: 2.5%;padding-left: 5%;'><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Full Name</div><div style='width: 60%;'><input type='text' id='dname'	name='dname' style='width: 100%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div> <div style='width: 70%; padding-top: 4%;'><div style='width: 20%; padding-right: 6%;'>UserName</div><div style='width: 60%;'><input type='text' id='uname'	name='uname' style='width: 100%; '	/></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div> <div style='width: 70%; padding-top: 4%;'><div style='width: 20%; padding-right: 6%;'>PassWord</div><div style='width: 60%;'><input type='password' id='password'	name='password' style='width: 100%; ' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 4%;'><div style='width: 20%; padding-right: 6%;'>Status</div><div style='width: 30%; '><select	style='width: 100%; ' id='status' name='status'><option value='Y'>Active</option><option value='N'>Deactive</option></select></div></div> </div><div style='width: 45%; padding-top: 2%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Education</div><div style='width: 60%;'><input type='text' id='education' name='education' style='width: 100%; ' /></div> </div> <div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Specialization </div><div style='width: 60%;'><input type='text' id='specialization'	name='specialization' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Address </div><div style='width: 60%;'><input type='text' id='add' name='add' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Contact No </div><div style='width: 60%;'><input type='text' id='contact'	name='contact' style='width: 100%; '	onkeypress='return validateNumbers(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>E-Mail</div><div style='width: 60%;'><input type='text' id='email'	name='email' style='width: 100%; ' /></div></div><div  style='width: 50%; padding-top: 10%; padding-left:50'><div style='float:right;'><input id='queryType' value='insert' type='hidden'  /></div></div></div>";

var VisitDocRegTemp = "<div style='width: 50%; padding-top: 2.5%;padding-left: 5%;'><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Full Name</div><div style='width: 60%;'><input type='text' id='dname'	name='dname' style='width: 100%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Education</div><div style='width: 60%;'><input type='text' id='education' name='education' style='width: 100%; ' /></div> </div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Specialization </div><div style='width: 60%;'><input type='text' id='specialization'	name='specialization' style='width: 100%; ' /></div></div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Status</div><div style='width: 30%; '><select	style='width: 100%; ' id='status' name='status'><option value='Y'>Active</option><option value='N'>Deactive</option></select></div></div> </div><div style='width: 45%; padding-top: 2%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Address </div><div style='width: 60%;'><input type='text' id='add' name='add' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Contact No </div><div style='width: 60%;'><input type='text' id='contact'	name='contact' style='width: 100%; '	onkeypress='return validateNumbers(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Fees</div><div style='width: 60%;'><input type='text' id='Fees'	name='Fees' style='width: 100%; ' onkeypress='return validatePrice(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>E-Mail</div><div style='width: 60%;'><input type='text' id='email'	name='email' style='width: 100%; ' /></div></div><div  style='width: 50%; padding-top: 10%; padding-left:50'><div style='float:right;'><input id='queryType' value='insert' type='hidden'  /></div></div></div>";

var doctorRegTemp = "<div style='width: 50%; padding-top: 2.5%;padding-left: 5%;'><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Full Name</div><div style='width: 60%;'><input type='text' id='dname'	name='dname' style='width: 100%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>UserName</div><div style='width: 60%;'><input type='text' id='uname'	name='uname' style='width: 100%; '	/></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div> <div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>PassWord</div><div style='width: 60%;'><input type='password' id='password'	name='password' style='width: 100%; ' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Fees</div><div style='width: 60%;'><input type='text' id='Fees'	name='Fees' style='width: 100%; ' onkeypress='return validatePrice(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 70%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Status</div><div style='width: 30%; '><select	style='width: 100%; ' id='status' name='status'><option value='Y'>Active</option><option value='N'>Deactive</option></select></div></div> </div><div style='width: 45%; padding-top: 2%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Education</div><div style='width: 60%;'><input type='text' id='education' name='education' style='width: 100%; ' /></div> </div> <div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Specialization </div><div style='width: 60%;'><input type='text' id='specialization'	name='specialization' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Address </div><div style='width: 60%;'><input type='text' id='add' name='add' style='width: 100%; ' /></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>Contact No </div><div style='width: 60%;'><input type='text' id='contact'	name='contact' style='width: 100%; '	onkeypress='return validateNumbers(event)' /></div><div style='width: 1%; color: red;padding-left:3%'><b>*</b></div></div><div style='width: 80%; padding-top: 2%;'><div style='width: 20%; padding-right: 6%;'>E-Mail</div><div style='width: 60%;'><input type='text' id='email'	name='email' style='width: 100%; ' /></div></div><div  style='width: 50%; padding-top: 10%; padding-left:50'><div style='float:right;'><input id='queryType' value='insert' type='hidden'  /></div></div></div>";

var editOtherUserTemp = "<div style='width: 22%; padding-top: 2.5%;padding-left: 5%'><div style='width: 49%;'>User ID</div><div style='width: 50%;'><input type='text' id='userID' name='userid' style='width: 100%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Name</div><div style='width: 50%; padding-top: 7%;'><input type='text' id='name' name='name' style='width: 200%; ' onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Username</div><div style='width: 50%; padding-top: 7%;'><input type='text' id='uname'	name='uname' style='width: 160%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Password</div><div style='width: 50%; padding-top: 7%;'><input type='password' id='password' name='password' style='width: 160%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Joining Date</div><div style='width: 50%; padding-top: 7%;'><input type='text' id='date' name='date' style='width: 160%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Status</div><div style='width: 50%; padding-top: 7%;'><select	style='width: 100%; ' id='status' name='status'>	<option value='Y'>Active</option><option value='N'>Deactive</option></select></div></div><div style='width: 20%; padding-top: 2%; padding-left: 30%'><div style='width: 50% '>User-Type</div><div style='width: 50%;'><input type='text' id='type'	name='type' style='width: 160%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Education</div><div style='width: 50%; padding-top: 9%;'><input type='text' id='education'	name='education' style='width: 200%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Occupation</div><div style='width: 50%; padding-top: 9%;'><input type='text' id='occupation'	name='occupation' style='width: 200%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Address </div><div style='width: 50%; padding-top: 9%;'><input type='text' id='add'	name='add' style='width: 200%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>Contact No </div><div style='width: 50%; padding-top: 9%;'><input type='text' id='contact'	name='contact' style='width: 200%; '	onkeypress='return validatealphabetic(event)' /></div><div style='width: 50%; padding-top: 9%;'>E-Mail</div><div style='width: 50%; padding-top: 9%;'><input type='text' id='email'	name='email' style='width: 200%; '	onkeypress='return validatealphabetic(event)' /></div><div  style='width: 50%; padding-top: 10%; padding-left:50'><div style='float:right;'><input type='button' value='Update' onclick=''/></div></div></div>";

var defaultViewUserTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>User ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Type</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.ul as ul}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.ul.ui}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.ul.title} {$T.ul.fname} {$T.ul.mname} {$T.ul.lname}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.ul.ut}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' disabled value='EDIT' id='btnEdit{count}' onClick='editUser({$T.ul.ui})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-danger deleteUserAccess' disabled value='DELETE' id='btnDelete{count}' onClick='deleteUser({$T.ul.ui})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var defaultViewListTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 100%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Pre-Operative List Name</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Remark</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.Chkli as li}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-2-1 ' style='height: 21.5px;'>{$T.li.ChkName}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.li.ChkRmk}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit{count}' onClick='editChkList({$T.li.idChkList})' disabled='disabled'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-danger deleteUserAccess' value='DELETE' id='btnDelete{count}' onClick='deleteChkList({$T.li.idChkList})' disabled='disabled'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var defaultViewQueTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 98%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Question</div></th>"
	+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>Question Type</div></th>"
	+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>HRA Type</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.Quelist as li}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-2-1 ' style='height: 21.5px;'>{$T.li.Que}</td>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{$T.li.QueType}</td>"
	+ "<td class='col-sm-1-1 ' style='height: 21.5px;'>{$T.li.hraTypeId}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onClick='editQueList({$T.li.idQue})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete{count}' onClick='deleteQueList({$T.li.idQue})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var defaultViewhraTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 98%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>HRA Type</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.hralist as li}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-2-1 ' style='height: 21.5px;'>{$T.li.hraType}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onClick='editHRAList({$T.li.idhra})'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete{count}' onClick='deleteHRAList({$T.li.idhra})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var defaultViewQueSelTemp = "<div class='col-sm-12-1'>"
	+ "{#foreach $T.hralist as li}"
	+ "<option value='{$T.li.idhra}'>{$T.li.hraType}</option>"
	+ "{#/for}" + "</div>";

var defaultViewHraTypeTemp = "<div class='col-md-12-1' style='margin-top:21px;'>"
	+ "{#foreach $T.hralist as li}"
	+ "<div class='col-md-12-1'><div class='col-md-6-1'><h5>{$T.li.hraType}</h5></div><div class='col-md-6-1'><h5><button id='HraPopId' onclick='getHRAQue({$T.li.idhra})' class='btn btn-o btn-outline-primary'>{$T.li.hraType}</button></h5></div>"
	+ "{#/for}" + "</div>";

var defaultViewHrTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='margin-top: 15px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>User ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>User Name</div></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><div class='TextFont'>User Type</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.ul as ul}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.ul.ui}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.ul.title} {$T.ul.fname} {$T.ul.mname} {$T.ul.lname}</td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>{$T.ul.ut}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' disabled value='EDIT' id='btnEdit{count}' onclick='editHr({$T.ul.ui})'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-danger deleteUserAccess' disabled value='DELETE' id='btnDelete{count}' onClick='deleteUser({$T.ul.ui})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var addDistributerDetailsTemp = "<div class='col-md-4-1' style='height: 420px; border: 1px solid #b8b8b8;max-height: auto;margin-top: 1%;' >"
		+ "<div style='padding-top: 0%; padding-left: 10%'><div style=''>"
		+ "<h2>Add Distributor Record:</h2></div>"
		+ "<div class='divide-10'></div>"
		+ "<div style='padding-top: 0%;'>"
		+ "<div style=''>Distributer ID:</div><div style=''>"
		+ "<input type='text' id='did' name='did' readonly='readonly' value='{$T.distributor_id}' style='background-color: gray;width:80%;' /></div></div>"
		+ "<div class='divide-10'></div>"
		+ "<div style=''><div style='padding-top: 1%;'>Distributer Name:</div><div style='padding-top: 0%; color: red;'>"
		+ "<input type='text' id='dname' name='dname' style='width:80%;'	onkeypress='return validatealphabetic(event)' />"
		+ "<b> *</b></div></div><div class='divide-10'></div><div style=''><div style='padding-top: 1%;'>Contact No:</div><div style='padding-top: 0%;'>"
		+ "<input type='text' name='mobile' id='mobile' maxlength='10' style='width: 80%;' onkeypress='return validateNumbers(event)' />"
		+ "</div></div><div class='divide-10'></div><div style=''><div style='padding-top: 1%;'>Address</div><div style='padding-top: 0%; color: red;'>"
		+ "<textarea id='daddr1' name='daddr1' style='' rows='3' cols='37'></textarea></div></div></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div>"
		+

		"<div class='col-md-7-1' style='height: 5%; max-height: auto; margin-left: 4%;margin-top: 1%;'>"
		+ "<div id='alphabet' style='height: 20px; border: 1px solid #b8b8b8; width:98%;margin-left: 4%;'>"
		+ "	<b>&nbsp;&nbsp;&nbsp; <a href='#' id='1' onclick=setItemManagementTemp('distributorItem','A')>A</a>"
		+ "		&nbsp;&nbsp;&nbsp; <a href='#' id='2' onclick=setItemManagementTemp('distributorItem','B')>B</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='3' onclick='setItemManagementTemp('distributorItem','C')>C</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='4' onclick='setItemManagementTemp('distributorItem','D')>D</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='5' onclick='setItemManagementTemp('distributorItem','E')>E</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='6' onclick='setItemManagementTemp('distributorItem','F')>F</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='7' onclick='setItemManagementTemp('distributorItem','G')>G</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='8' onclick='setItemManagementTemp('distributorItem','H')>H</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='9' onclick='setItemManagementTemp('distributorItem','I')>I</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='10' onclick='setItemManagementTemp('distributorItem','J')>J</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='11'	onclick='setItemManagementTemp('distributorItem','K')>K</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='12'	onclick='setItemManagementTemp('distributorItem','L')>L</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='13'	onclick='setItemManagementTemp('distributorItem','M')>M</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='14'	onclick='setItemManagementTemp('distributorItem','N')>N</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='15'	onclick='setItemManagementTemp('distributorItem','O')>O</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='16'	onclick='setItemManagementTemp('distributorItem','P')>P</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='17'	onclick='setItemManagementTemp('distributorItem','Q')>Q</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='18' onclick='setItemManagementTemp('distributorItem','R')>R</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='19'	onclick='setItemManagementTemp('distributorItem','S')>S</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='20'	onclick='setItemManagementTemp('distributorItem','T')>T</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='21' onclick='setItemManagementTemp('distributorItem','U')>U</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='22' onclick='setItemManagementTemp('distributorItem','V')>V</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='23'	onclick='setItemManagementTemp('distributorItem','W')>W</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='24'	onclick='setItemManagementTemp('distributorItem','X')>X</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='25'	onclick='setItemManagementTemp('distributorItem','Y')>Y</a>&nbsp;&nbsp;&nbsp;"
		+ "		<a href='#' id='26'	onclick='setItemManagementTemp('distributorItem','Z')>Z</a>&nbsp;&nbsp;&nbsp;"
		+ "	</b></div>"
		+ "<div id='ItemList' style='width: 98%; height: 400px; border: 1px solid #b8b8b8; overflow-y: scroll; margin-left: 4%;max-height: auto;'>"
		+ "</div></div>";

var addDistributerDetailsTempItem = "<div style='width: 100%'> {#foreach $T.il as il} <div style='width: 30%; padding-top: 3%; padding-left: 6%; float: left;'> <div style='width: 5%;'>  {i} </div> <div style='width: 5%;'> <input type='checkbox' name='chk{i}' id='chk' value='{$T.il.ii}' /> </div> <div style='width: 65%;'>&nbsp;&nbsp;&nbsp;{$T.il.in}</div> 	<div style='width: 10%;'> <!--  <input type='text' id='iprice{i++}' name='iprice' style='width: 100%;' onkeypress='return validateNumbers(event)' />--> </input> </div> </div> {#/for} </div> ";

var editDistributerDetailsTemp = "<div style='width: 100%'> {#foreach $T.il as il} <div style='width: 30%; padding-top: 3%; padding-left: 6%; float: left;'> <div style='width: 5%;'>  {i} </div> <div style='width: 5%;'> <input type='checkbox' name='chk{i}' id='chk' value='{$T.il.ii}' /> </div> <div style='width: 65%;'>&nbsp;&nbsp;&nbsp;{$T.il.in}</div> 	<div style='width: 10%;'> <input type='text' id='iprice{i++}' name='iprice' style='width: 100%;' onkeypress='return validateNumbers(event)' /> </input> </div> </div> {#/for} </div> <input type='hidden' id='queryType' value='update' />";

var saveDistributerButtonTemp = '<button class="btn btn-xs btn-success" onclick="saveDistributerDetails()" name="btnSave" id="btnSave" value="Save Now">Save Now</button>';

var addDiscountTempInsideForTest = "<div style='width:100%;'><div style='width: 85%; background-color: #436a9d; padding: 1%; font-weight: bold; text-align: center;  '><div style='width: 100%;'><div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 48%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Test Name</div><div style='width: 35%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Test Charges</div></div></div>{#foreach $T.testList as tl}<div style='width: 87%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;border-left: 1px solid #069;'>{count}</div><div id='divPi{count}' style='width: 48%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.tl.tname}</div><div style='width: 38.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><input style = 'text-align: right; ' type='text' id='tCharge{count++}' name='tCharge' style='width: 40%; ' value='{$T.tl.charges1}' onkeypress='return validatePrice(event)' /></div> </div>{#/for}<input type='hidden' id='txtRowCount' value='{count}' /><div style='display: none;' id='divAjaxRepo' ></div></div></div>";

var addDiscountTempInsideForFees = "<div style='width:100%;'><div style='width: 85%; background-color: #436a9d; padding: 1%; font-weight: bold; text-align: center;  '><div style='width: 100%;'><div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 30%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Doctor Name</div><div style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Doctor Fees</div><div style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Follow-Up Fees</div></div></div>{#foreach $T.dl as dl}<div style='width: 87%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;border-left: 1px solid #069;'>{count}</div><div id='divPi{count}' style='width: 30.4%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.dl.dn}</div><div style='width: 25.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><input type='text' id='fees{count}' name='fees' style='width: 40%; text-align: right; ' value='{$T.dl.df}' onkeypress='return validatePrice(event)' /></div><div style='width: 29.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><input type='text' id='ff{count++}' name='ff' style='width: 40%; text-align: right; ' value='{$T.dl.flwfees}' /></div> </div><input type='hidden' id='txtRowCount' value='{count}' /><div style='display: none;' id='divAjaxRepo' ></div></div></div>";

var editDiscountTemp = "<div style='width: 45%; padding-top: 2.5%; padding-left: 7%;padding-bottom:3%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 25%; padding-right: 6%;'>Discount ID</div><div style='width: 60%;'><input value='{$T.sl[0].si}' style='width: 100%; ' name='did' id='did' readonly='readonly' /></div></div></div><div style='width: 45%; padding-top: 2%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 24%; padding-right: 6%;'>Account Name</div><div style='width: 60%;'><input value='{$T.sl[0].sn}' type='text' style='width: 100%; ' name='dname' id='dname'  /></div><div style='width: 1%; color: red; padding-left: 3%'><b>*</b></div></div></div><br><br><br><br><div></div><div style='padding-left:10%;'><div style='width: 100%; background-color: #436a9d; padding: 1%; font-weight: bold; text-align: center;  '><div style='width: 100%;'><div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 48%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Procedure Name</div><div style='width: 35%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right:0%;'>Procedure Charges</div></div></div>{#foreach $T.sl as sl}<div style='width: 102%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;border-left: 1px solid #069;'>{count}</div><div id='divPi{count}' style='width: 48%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.sl.on}</div><div style='width: 38.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><input type='text' id='tCharge{count++}' name='tCharge' style='width: 40%; ' value='{$T.sl.dc}' onkeypress='return validatePrice(event)' /></div> </div>{#/for}<input type='hidden' id='txtRowCount' value='{count}' /><div style='display: none;' id='divAjaxRepo' ></div></div><div><input type='hidden' id='queryType' value='update' />";

var defaultDisViewTemp = "<div style='width:98%; background-color:#436a9d; padding:1%; font-weight:bold;'><div style='width:100%;'><div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Discount ID</div><div style='width: 38%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%; text-align: left;'>Account Name</div><div style='width: 12.3%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Edit</div><div style='width:12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Delete</div></div></div> <div style='width: 100%; height: 93%; overflow-y: hidden; border: 0px solid #436a9d;'> {#foreach $T.sl as sl}<div style='width:100%; height:28px; border-bottom:1px solid #069;'><div style='width:11%; height:23px; text-align:center; border-right:1px solid #069; padding-top:5px;'>{count++}</div><div style='width:16%; text-align:center; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px;' id='divPi2'>{$T.sl.si}</div><div id='' style='width:38.4%; height:23px; border-right:1px solid #069; padding-left:2.6%; text-align: left; padding-top:5px;' >{$T.sl.sn}</div><div style='width:13.4%; height:25px; border-right:1px solid #069; padding-left:1%; padding-top:3px; text-align:center;'> <input type='button' onclick=editSpecialDiscount({$T.sl.si}) value='EDIT'  class='edit' style='font-size:10px;'></div><div style='width:8%; height:25px; padding-left:4%; padding-top:3px; text-align:center;'><input type='button' value='DELETE'  class='edit' style='font-size:10px;' onclick='deleteDiscount({$T.sl.si})'></div></div>{#/for}</div>";
var defaultDisViewTemp1 = "<div style='width:98%; background-color:#436a9d; padding:1%; font-weight:bold;'><div style='width:100%;'><div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Discount ID</div><div style='width: 38%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%; text-align: left;'>Account Name</div><div style='width: 12.3%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Edit</div><div style='width:12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Delete</div></div></div> <div style='width: 100%; height: 93%; overflow-y: hidden; border: 0px solid #436a9d;'> {#foreach $T.sl as sl}<div style='width:100%; height:28px; border-bottom:1px solid #069;'><div style='width:11%; height:23px; text-align:center; border-right:1px solid #069; padding-top:5px;'>{count++}</div><div style='width:16%; text-align:center; height:23px; border-right:1px solid #069; padding-left:1%; padding-top:5px;' id='divPi2'>{$T.sl.si}</div><div id='' style='width:38.4%; height:23px; border-right:1px solid #069; padding-left:2.6%; text-align: left; padding-top:5px;' >{$T.sl.sn}</div><div style='width:13.4%; height:25px; border-right:1px solid #069; padding-left:1%; padding-top:3px; text-align:center;'> <input type='button' onclick=editCorporateAcc({$T.sl.si}) value='EDIT'  class='edit' style='font-size:10px;'></div><div style='width:8%; height:25px; padding-left:4%; padding-top:3px; text-align:center;'><input type='button' value='DELETE'  class='edit' style='font-size:10px;' onclick='deleteDiscount({$T.sl.si})'></div></div>{#/for}</div>";

var searchDistTemp = "<div class='col-md-12-1'><div style='font-weight: bold;' class='col-md-1'>Search By:</div><div class='col-md-1-1'>Distributor Name</div><div class='col-md-2-1 TextFont'><input name='byName' type='text' id='byName' onkeypress='return validatealphabetic(event)' onchange='setSplitId()' /></div><div class='col-md-1-1' style='margin-left: 0%;'>&nbsp; or &nbsp; Distributor ID</div><div style='padding-left: 2%;' class='col-md-2 TextFont'><input name='byId' type='text' id='byId' onkeypress='return validateNumbers(event)' /></div><div class='col-md-1-1' style='text-align: center;''><input type='button' value='Search' class='edit' onclick='searchDistributor()' /></div></div>";
var saveOperationButtonTemp = "<input	style='font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;'	type='button' value='Save Now' onclick='dispMessage()' />";

var saveDiscountButtonTemp = "<input style='font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;'	type='button' value='Save Now' onclick='dispMsg()' />";

var IPD_DICTemp = "<div style='width: 98%; padding-left: 0%;'>" 
	+ "<div style='width: 98%; background-color: #436a9d; padding-bottom: 1%;padding-top: 1%; font-weight: bold;'>"
	+ "<div style='width: 100%;'><div style='width: 3%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div>"
	+ 	"<div	style='width: 7%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Time</div>"
	+ 	"<div	style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Name of Drug</div>"
	+ 	"<div	style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Strength</div>"
	+ 	"<div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Dose</div>"
	+ 	"<div style='width: 13%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Sign</div></div></div></div>"
	+ 	"<div	style='width: 96%; height: 300px; overflow-y: auto; border: 1px solid #436a9d;' id='DRRDiv'>"
	+ 	"{#foreach $T.tnl as tnl}"
	+ 	"<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;background-color: lightgray;'>"
	+ 	"<div style='width: 3%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>"
	+ 	"<div	style='width: 8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
	+ 	"<input style='width: 90%;background-color: lightgray;' type='text' onmouseover='click1()'  name='textfield' id='t{rowCount}' value='{$T.tnl.cut}' readonly='readonly'/></div>"
	+ 	"<div	style='width: 14.50%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
	+ 	"<input style='width: 90%;background-color: lightgray;' type='text' name='textfield' class='auto' id='dn{rowCount}' value='{$T.tnl.dn}' readonly='readonly'/></div>"
	+ 	"<div	style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
	+ 	"<input style='width: 90%;background-color: lightgray;' type='text' name='textfield' id='stren{rowCount}' value='{$T.tnl.stren}' readonly='readonly'/></div>"
	+ 	"<div	style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>"
	+ 	"<input style='width: 90%;background-color: lightgray;' type='text' name='textfield' id='dose{rowCount}' value='{$T.tnl.dose}' readonly='readonly'/></div>"
	+ 	"<div id='sn{rowCount}' style='width: 12%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;' >{$T.tnl.objU.dn}</div></div>"
	+   "<input type='hidden' value='{$T.tnl.nid}' id='nid{rowCount}' />"
	+ 	"<input type='hidden'	value='{rowCount++}' id='txtRowCount' name='txtRowCount'/>{#/for}"
	+ 	"<input type='hidden' value='' id='addRowCount' />"
	+ 	"<input type='hidden'	value='{--rowCount}' id='RowCount'/></div>";

var divTestTemp =  "<div id='divTest' >"
		+ "<div class='divide-20'></div>"
		+ "<div class='col-md-11-1' style='margin-left:2%;'>"
		+ "<div style='font-weight: bold;' class='col-md-1-1'>Search By:</div>"
		+ "<div style='font-weight: bold;' class='col-md-1-1'>Test Name</div>"
		+ "<div class='form-group col-md-2-1'>"
		+ "<input class='form-group' name='txtBxTestName' type='text' id='txtBxTestName' />"
		+ "</div>"
		+ "<div class='form-group col-md-2-1'>"
		+ "<input type='button' value='Search' class='edit' id='btnSearch' onclick='setDiscountResTemp("+'"'+"searchTest"+'"'+")' />"
		+ "</div>"
		+ "</div>"
		+ "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: -10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th style='height: 21.5px; width: 50px;'><label class='TextFont'>#</label></th>"
		+ "<th style='height: 21.5px; width: 401px;'><label class='TextFont'>Test Name</label></th>"
		+ "<th style='height: 21.5px; width: 323px;'><label class='TextFont'>Sponsred Test Charges</label></th>"
		+ "<th style='height: 21.5px; width: 316px;'><label class='TextFont'>Patient Test Charges</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		
		+ "</div>"
		+ "<div class='col-sm-12-1' id='pathologyTestSearch' style='margin-top: -22px; border: 1px solid #b8b8b8; overflow-y: scroll; height: 345px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+"<div id='wait' style='display: none; width: 69px; height: 89px; border: 0px solid black; position: absolute; top: 50%; left: 43%; padding: 2px;'> "
		+ "<img src='css/images/wait1.gif' width='64' height='64' /></div>"
		
		+ "<tbody>"
		+ "{#foreach $T.testList as tl}"
		+ "<tr>"
		+ "<td style='height: 21.5px; width: 50px;'>{count}.</td>"
		+ "<td style='height: 21.5px; width: 409px;' id='divPi{count}'>{$T.tl.tname}</td>"
		+ "<td style='height: 21.5px; width: 333px;'><input style='text-align: right;' type='text' id='tCharge{count}' class='form-control input-SmallText margin-1' name='tCharge' "
		+ "value='{$T.tl.pay}' onkeypress='return validatePrice(event)' /></td>"
		+ "<td style='height: 21.5px;  width: 281px;'><input style='text-align: right;' type='text' id='ptCharge{count}' class='form-control input-SmallText margin-1' name='ptCharge' "
		+ "value='{$T.tl.testPatientCharges}' onkeypress='return validatePrice(event)' /></td>"
		+ "<td style='height: 21.5px;'>{#if $T.tl.testChargesApplicableFlag=='Y'} <input type='checkbox' "
		+ "id='chargesApplicableFlag{count++}' name='chargesApplicableFlag' checked='checked' "
		+ "value='{$T.tl.testChargesApplicableFlag}' style='width: 40%;' /> {#else} <input type='checkbox' "
		+ "id='chargesApplicableFlag{count++}' value='{$T.tl.testChargesApplicableFlag}' "
		+ "name='chargesApplicableFlag' style='width: 40%;' /> {#/if} </td>"
		+ "</tr> {#/for} "
		+ "<input type='hidden' id='txtRowCount' value='{count}' />"
		+ "</tbody>" + "</table>" + "</div>"
		+ "<div style='display: none;' id='divAjaxRepo'></div>" + "</div>";

var divInside1Temp = " <div class='col-sm-12-1' id='divInside1'>"
		+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;'><label class='TextFont'>#</label></th>"
		+ "<th style='height: 21.5px;'><label class='TextFont'>Procedure Name</label></th>"
		+ "<th style='height: 21.5px;'><label class='TextFont'>Procedure Charges</label></th>"
		+ "<th style='height: 21.5px;'><label class='TextFont'>Discounted Procedure Charges</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-12px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 120px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.ol as ol}"
		+ "<tr>"
		+ "<td style='height: 21.5px;'>{count}</td>"
		+ "<td style='height: 21.5px;' id='divPi{count}'>{$T.ol.on}</td>"
		+ "<td style='height: 21.5px;'>{$T.ol.oec}</td>"
		+ "<td style='height: 21.5px;'>"
		+ "<input type='text' name='tCharge' class='form-control input-SmallText' id='tCharge{count++}' value='{$T.ol.oc}' onkeypress='return validatePrice(event)' />"
		+ "</td>" + "</tr>"
		+ "{#/for} <input type='hidden' id='txtRowCount' value='{count}' /> "
		+ "</tbody>"
		+ "</table> <div style='display: none;' id='divAjaxRepo'></div>"
		+ "</div>";

var divFeeTemp = "<div id='divFee'>"
		+ "<div class='col-sm-12-1' id='divFeeLeft' style='float: left;'>"
		+ "<table class='table table-bordered table-striped table-condensed'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<td style='height: 21.5px; width: 156px;'>Day/Speciality</td>"
		+ "<td style='height: 21.5px; width: 242px;'>Week Day Consultation</td>"
		+ "<td style='height: 21.5px; width: 211px;'>Week Day Followup</td>"
		+ "<td style='height: 21.5px; width: 240px;'>Week End Consultation</td>"
		+ "<td style='height: 21.5px; width: 209px;'>Week End Followup</td>"
		+ "</tr>"
		+ "</tbody>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' id='divFeeRight' style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 180px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed'>"
		+ "<tbody>"
		+ "{#foreach $T.liDocSpl as liDocSpl} {#if $T.liDocSpl.splNm!='RMO'} "
		+ "<tr>"
		+ "<td style='height: 21.5px; width: 159px;'>{$T.liDocSpl.splNm} <input type='hidden' id='specialityName{count}' value='{$T.liDocSpl.splNm}' /> <input type='hidden' "
		+ "id='docSplId{count}' value='{$T.liDocSpl.idDocSpl}' />"
		+ "</td>"
		+ "<td style='height: 21.5px; width: 249px;'><input type='text' id='wdSSCons{count}' value='{$T.liDocSpl.wdCon}' maxlength='7'"
		+ "onkeypress='return validateNumbers(event)' class='form-control input-SmallText' /></td>"
		+ "<td style='height: 21.5px; width: 217px;'><input type='text' id='wdSSFollowup{count}' value='{$T.liDocSpl.wdFl}' maxlength='7'"
		+ "onkeypress='return validateNumbers(event)' class='form-control input-SmallText' /></td>"
		+ "<td style='height: 21.5px; width: 247px;'><input type='text' id='weSSCons{count}' value='{$T.liDocSpl.weCon}' maxlength='7'"
		+ "onkeypress='return validateNumbers(event)' class='form-control input-SmallText' /></td>"
		+ "<td style='height: 21.5px; width: 197px;'><input type='text' id='weSSFollowup{count}' value='{$T.liDocSpl.weFl}' maxlength='7'"
		+ "onkeypress='return validateNumbers(event)' class='form-control input-SmallText' /></td>"
		+ "</tr>"
		+ "<input type='hidden' id='splId{count}' value='{$T.liDocSpl.idDocSpl}' />"
		+ "<div style='display: none;'>{count++}</div>"
		+ "{#/if} {#/for}"
		+ "</tbody>"
		+ "</table>"
		+ "</div>"
		+ "<!-- Valid on splNm!='RMO' Part 1 Ends-->"
		+ "<!-- Valid on splNm=='RMO' Part 2 Starts-->"
		+ "<div class='col-sm-12-1' id='divFeeLeft2' style='float: left; padding-top: 10px;'>"
		+ "<table class='table table-bordered table-striped table-condensed'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<td style='height: 21.5px; width: 156px;'>Day/Speciality</td>"
		+ "<td style='height: 21.5px; width: 242px;'>Day Consultation</td>"
		+ "<td style='height: 21.5px; width: 211px;'>Day Followup</td>"
		+ "<td style='height: 21.5px; width: 240px;'>Night Consultation</td>"
		+ "<td style='height: 21.5px; width: 209px;'>Night Followup</td>"
		+ "</tr>"
		+ "</tbody>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' id='divFeeRight2' style='margin-top: -21px; border: 1px solid #ddd; overflow-y: scroll; height: 170px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed'>"
		+ "<tbody>"
		+ "{#foreach $T.liDocSpl as liDocSpl} {#if $T.liDocSpl.splNm=='RMO'}"
		+ "<tr>"
		+ "<td style='height: 21.5px; width: 159px;'>{$T.liDocSpl.splNm} <input type='hidden' id='specialityName{count}'"
		+ "value='{$T.liDocSpl.splNm}' /> <input type='hidden' id='docSplId{count}' value='{$T.liDocSpl.idDocSpl}' /></td>"
		+ "<td style='height: 21.5px; width: 249px;'><input type='text' id='wdSSCons{count}' value='{$T.liDocSpl.wdCon}' maxlength='7'"
		+ "onkeypress='return validateNumbers(event)' class='form-control input-SmallText' /></td>"
		+ "<td style='height: 21.5px; width: 217px;'><input type='text' id='wdSSFollowup{count}' value='{$T.liDocSpl.wdFl}' maxlength='7'"
		+ "onkeypress='return validateNumbers(event)' class='form-control input-SmallText' /></td>"
		+ "<td style='height: 21.5px; width: 247px;'><input type='text' id='weSSCons{count}' value='{$T.liDocSpl.weCon}' maxlength='7'"
		+ "onkeypress='return validateNumbers(event)' class='form-control input-SmallText' /></td>"
		+ "<td style='height: 21.5px; width: 197px;'><input type='text' id='weSSFollowup{count}' value='{$T.liDocSpl.weFl}' maxlength='7'"
		+ "onkeypress='return validateNumbers(event)' class='form-control input-SmallText' /></td>"
		+ "</tr>"
		+ "<input type='hidden' id='splId{count}' value='{$T.liDocSpl.idDocSpl}' />"
		+ "<div style='display: none;'>{count++}</div>" + "{#/if} {#/for}"
		+ "</tbody>" + "</table>" + "</div>"
		+ "<!-- Valid on splNm=='RMO' Part 2 Ends-->"
		+ "<input type='hidden' id='txtSpecialityCount' value='{--count}' />"
		+ "</div>";

/** **************** Group Wise Procedure Charge start ************* */

var hallWiseChargeTemp = "<div class='col-sm-10-1' style='margin-top: 10px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 400px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>Hall Type</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>Surgeon Charges</td>"
		+ "</tr>"
		+ "{#foreach $T.htli as htli}"
		+ "<tr>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.htli.htnm}<input type='hidden' id='hallid{k}' value='{$T.htli.idht}' /></td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'><input type='text' class='form-control input-SmallText' id='surgeonCharge{k++}' maxlength='8' onkeypress='return validateNumbers(event)'></td>"
		+ "</tr>"
		+ "{#/for}"
		+ "</tbody>"
		+ "<input type='hidden' id='hallcount' value='{--k}'></table>"
		+ "</div>";

var corphallWiseChargeTemp="<div class='col-sm-10-1' style='margin-top: 10px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 400px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>Hall Type</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>Surgeon Charges Pay</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>Surgeon Charges CoPay</td>"
		+ "</tr>"
		+ "{#foreach $T.htli as htli}"
		+ "<tr>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.htli.htnm}<input type='hidden' id='hallid{k}' value='{$T.htli.idht}' /></td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'><input type='text' class='form-control input-SmallText' id='surgeonCharge{k}' maxlength='8' onkeypress='return validateNumbers(event)'></td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'><input type='text' class='form-control input-SmallText' id='surgeonChargeCoPay{k++}' maxlength='8' onkeypress='return validateNumbers(event)'></td>"
		+ "</tr>"
		+ "{#/for}"
		+ "</tbody>"
		+ "<input type='hidden' id='hallcount' value='{--k}'></table>"
		+ "</div>";

function getHallTypeGrpWisProCharge(type) {
	$("#divInside").hide();
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}

	k = 1;
	var inputs = [];
	inputs.push('action=fetchHallType');
	inputs.push('corporateId=' + sid);
	inputs.push('type=' + type);
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
			$("#divfetchHallType").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if(sid==0){
				$("#hallWiseCharge").setTemplate(hallWiseChargeTemp);
				$("#hallWiseCharge").processTemplate(pobj1);
				$("#divInside").show();
			}else{
				$("#hallWiseCharge").setTemplate(corphallWiseChargeTemp);
				$("#hallWiseCharge").processTemplate(pobj1);
				$("#divInside").show();
			}
		}
	});
}

function featchGrpCatWiseProCharge() {

	var operationID = $("#department").val();
    var sid = $("#sid").val();
	if (!sid) {
		sid = 0;
	}

	var opcatid = $("#opgrade").val();

	if (opcatid == "select") {
		alert("Please Select Procedure Category.");
		return false;
	}
	var sponsrid = $("#listmstr_select_chargesinfo").val();
	if(sponsrid==null || sponsrid==""){
		sponsrid=0;
	}
	var inputs = [];
	inputs.push('action=featchGrpCatWiseProCharge');
	// inputs.push('opgrpid=' + opgrpid);
	inputs.push('opcatid=' + opcatid);
	inputs.push('corporateAcId=' + sid);
	inputs.push('operationID=' + operationID);
	inputs.push('sponsrid=' + sponsrid);
	var str = inputs.join('&');
	jQuery
			.ajax({
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
					pobj = eval('(' + ajaxResponse + ')');

					for ( var k = 1; k <= $("#hallcount").val(); k++) {
						$("#surgeonCharge" + k).val("");
					}

					if (pobj.opchrli.length == 0) {
						$("#queryType").val('insert');
						// getHallTypeGrpWisProCharge(type);
					} else if (pobj.opchrli.length > 0) {
						$("#queryType").val('update');

						if (pobj.opchrli.length > 0) {
							var hallcount = $("#hallcount").val();
							
							
							if(sid==0){
								for ( var k = 1; k <= hallcount; k++) {

									for ( var j = 0; j < pobj.opchrli.length; j++) {
										if (pobj.opchrli[j].idhl == $("#hallid" + k)
												.val()) {

											$("#surgeonCharge" + k).val(
													pobj.opchrli[j].surchr);
											$("#anesCharge" + k).val(
													pobj.opchrli[j].anechr);
										}
									}
								}
							}else{
								for ( var k = 1; k <= hallcount; k++) {

									for ( var j = 0; j < pobj.opchrli.length; j++) {
										if (pobj.opchrli[j].idhl == $("#hallid" + k)
												.val()) {

											$("#surgeonCharge" + k).val(
													pobj.opchrli[j].surchrPay);
											$("#surgeonChargeCoPay" + k).val(
													pobj.opchrli[j].surchrCoPay);
											$("#anesCharge" + k).val(
													pobj.opchrli[j].anechr);
										}
									}
								}
							}
						}
					}
				}
			});
}

function saveGrpCatWiseProCharge() {

	var sid = $("#sid").val();
	if (!sid) {
		sid = 0;
	}
	var operationID = $("#department").val();

	var opcatid = $("#opgrade").val();

	if (operationID == "0") {
		alert("Please Select Procedure Name");
		return false;
	}
	
	if (opcatid==0||opcatid == "-select-" || opcatid==null || opcatid=="" ) {
		alert("Please Select Procedure Category.");
		return false;
	}
	var queryType = $("#queryType").val();
	var sponsrid = $("#listmstr_select_chargesinfo").val();
	if(sponsrid==null || sponsrid==""){
		sponsrid=0;
	}

	var opcharge = {
		opchrli : []
	};
	var hallcount = $("#hallcount").val();
	for ( var k = 1; k <= hallcount; k++) {

		var surgeonCharge = $.trim($("#surgeonCharge" + k).val());
		var surgeonChargeCoPay =0;
		if(sid==0){
			surgeonChargeCoPay=0;
		}else{
			surgeonChargeCoPay=$.trim($("#surgeonChargeCoPay" + k).val());
		}
		
		var hallid = $("#hallid" + k).val();
		if (surgeonCharge == "") {
			surgeonCharge = 0;

		}
		if (surgeonChargeCoPay == "") {
			surgeonChargeCoPay = 0;
		}

		opcharge.opchrli.push({
			"idhl" : hallid,
			"surchr" : surgeonCharge,
			"surchrPay" : surgeonCharge,
			"surchrCoPay" : surgeonChargeCoPay
			
		});
	}
	opcharge = JSON.stringify(opcharge);
	opcharge = opcharge.decodeSpecialChars();
	var inputs = [];

	inputs.push('action=SaveGrpCatWiseProCharge');
	inputs.push('queryType=' + queryType);
	inputs.push('corporateAcId=' + sid);
	inputs.push('opcharge=' + encodeURIComponent(opcharge));
	inputs.push('opcatid=' + opcatid);
	inputs.push('operationID=' + operationID);
	inputs.push('sponsrid=' + sponsrid);

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
			alert(ajaxResponse);
			// window.location.href = "groupWiseProcedureCharges.jsp";
			//featchGrpCatWiseProCharge();
			  location.reload();
		}
	});
}

/** **************** Group Wise Procedure Charge end ************* */

/** ************************Trolley management************** */

var defaultNursingTrollyTemp = "<div style='width: 100%;'>	<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Item	ID</div><div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Item	Name</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Minimum Quantity</div>	<div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Available	Quantity</div>	<div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Heading</div>	<div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; text-align: center;'>Save</div><input type='button' onclick='toRemoveNursingDiv()' value='-''></div></div></div> <div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>   {#foreach $T.ntl as ntl}<div id=nursingDiv{count++}  style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}</div>	<div style='width: 30.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.ntl.iml[0].in}</div>	<div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width: 85%; border-color: black; border-width: thin;' type='text' name='txtmqty{$T.ntl.iid}' id='txtmqty{$T.ntl.iid}' value='{$T.ntl.mqty}' onkeypress='return validatePrice(event)' />	</div><div style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; width: 85%; border-color: black; border-width: thin;'	type='text' name='txtaqty{$T.ntl.iid}' id='txtaqty{$T.ntl.iid}' value='{$T.ntl.aqty}' onkeypress='return validatePrice(event)' /></div><div style='width: 16.2%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;'	align='center'>	<input	style='font-size: 11px; width: 90%; border-color: black; border-width: thin;' type='text' name='txtheading{$T.ntl.iid}' id='txtheading{$T.ntl.iid}' value='{$T.ntl.hed}' /></div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input style='font-size: 11px; width: 70%;' type='button' name='btnsave{$T.ntl.iid}' id='btnsave{$T.ntl.iid}' value='SAVE' onclick='saveNursingTrolley({$T.ntl.iid})' /></div><div style='width: 4% ;text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;' ><input id='checkbox' type='checkbox' name='chk{count}' value='{$T.ntl.ntid}' ></div></div></div>{#/for}<input type='hidden' value='{--sr}' id='rowCount'></div>";
var addTrolleyDetailsTempItem = "<div style='width: 100%'> {#foreach $T.il as il} <div style='width: 30%; padding-top: 3%; padding-left: 6%; float: left;'> <div style='width: 5%;'>  {i++} </div> <div style='width: 5%;'> <input type='checkbox' name='chk{$T.il.ii}' id='chk' value='{$T.il.ii}' /> </div> <div style='width: 65%;'>&nbsp;&nbsp;&nbsp;{$T.il.in}</div> 	 </div> {#/for} </div> ";

var defaultCathTrollyTemp = "<div style='width: 100%;'>	<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center;'>Item	ID</div><div style='width: 29%; border: 1px solid #FFF; color: #FFF; padding-left: 2%; padding-right: 1%;'>Item	Name</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Minimum Quantity</div>	<div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Available	Quantity</div>	<div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Heading</div>	<div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; text-align: center;'>Save</div><input type='button' onclick='toRemoveCathDiv()' value='-''></div></div></div> <div style='width: 99.80%; height: 86%; overflow-y: auto; border: 1px solid #436a9d;'>   {#foreach $T.ctl as ctl}<div id=cathDiv{count++}  style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 6.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}</div>	<div style='width: 30.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.ctl.iml[0].in}</div>	<div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input style='font-size: 11px; width: 85%; border-color: black; border-width: thin;' type='text' name='txtmqty{$T.ctl.iid}' id='txtmqty{$T.ctl.iid}' value='{$T.ctl.mqty}' onkeypress='return validatePrice(event)' />	</div><div style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='font-size: 11px; width: 85%; border-color: black; border-width: thin;'	type='text' name='txtaqty{$T.ctl.iid}' id='txtaqty{$T.ctl.iid}' value='{$T.ctl.aqty}' onkeypress='return validatePrice(event)' /></div><div style='width: 16.2%; height: 25px; border-right: 1px solid #069; padding-left: 0.5%; padding-top: 3px;'	align='center'>	<input	style='font-size: 11px; width: 90%; border-color: black; border-width: thin;' type='text' name='txtheading{$T.ctl.iid}' id='txtheading{$T.ctl.iid}' value='{$T.ctl.hed}' /></div><div style='width: 13%; height: 25px; padding-left: 2%; padding-top: 3px; text-align: center;border-right: 1px solid #069;'><input style='font-size: 11px; width: 70%;' type='button' name='btnsave{$T.ctl.iid}' id='btnsave{$T.ctl.iid}' value='SAVE' onclick='saveCathTrolley({$T.ctl.iid})' /></div><div style='width: 4% ;text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;' ><input id='checkbox' type='checkbox' name='chk{count}' value='{$T.ctl.ctid}'></div></div></div>{#/for}<input type='hidden' value='{--sr}' id='rowCount'></div>";

function toRemoveCathDiv() {

	var rowCount = $("#rowCount").val();
	var Response1 = $("#cathTrolleyDiv").html();
	ajaxRes = eval('(' + Response1 + ')');
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	var k = 0;
	for ( var m = 1; m <= ajaxRes.ctl.length; m++) {
		for ( var a = 0; a < allVals.length; a++) {
			if (allVals[a] == ajaxRes.ctl[k].ctid) {

				ajaxRes.ctl[k].hed = "deleteCathtrolleyItem";
			}
		}
		k++;
	}

	if (allVals.length != 0) {
		parsebcObj = JSON.stringify(ajaxRes);
		parsebcObj = parsebcObj.decodeSpecialChars();

		var inputs = [];
		inputs.push('action=deleteCathTrolleyItem');
		inputs.push('parsebcObj=' + parsebcObj);
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
				alert(ajaxResponse);
			}
		});
	}

	// window.location.reload();
	var p = 2;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=chk' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#cathDiv" + (p - 1) + "").remove();
		}
		p++;
	}
}

function toRemoveNursingDiv() {

	var rowCount = $("#rowCount").val();
	var Response1 = $("#nursigTrolleyDiv").html();
	
	ajaxRes = eval('(' + Response1 + ')');
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	var k = 0;
	for ( var m = 1; m <= ajaxRes.ntl.length; m++) {
		for ( var a = 0; a < allVals.length; a++) {
			if (allVals[a] == ajaxRes.ntl[k].ntid) {

				ajaxRes.ntl[k].hed = "deleteNursingrolleyItem";
			}
		}
		k++;
	}

	if (allVals.length != 0) {
		
		parsebcObj = JSON.stringify(ajaxRes);
		parsebcObj = parsebcObj.decodeSpecialChars();

		var inputs = [];
		inputs.push('action=deleteNursingTrolley');
		inputs.push('parsebcObj=' + parsebcObj);
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
			}
		});
	}

	// window.location.reload();
	var p = 2;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=chk' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#nursingDiv" + (p - 1) + "").remove();
		}
		p++;
	}
}

function removeBorder(current){
	if($(current).val()!="" && $(current).val()!=null){
		$(current).css("border-color","");
	}
}

function saveDoctorSlotTime() {
	var divDocName=$("#divDocName").val();
	if(divDocName==0){
		alert("Plese select Doctor Name");
		return false;
	}
	var inputs = [];
	/* Morning Slot */
	var txtMorSunStart = $("#txtMorSunStart").val();
	var txtMorMonStart = $("#txtMorMonStart").val();
	var txtMorTueStart = $("#txtMorTueStart").val();
	var txtMorWedStart = $("#txtMorWedStart").val();
	var txtMorThiStart = $("#txtMorThiStart").val();
	var txtMorFriStart = $("#txtMorFriStart").val();
	var txtMorSatStart = $("#txtMorSatStart").val();
	var txtMorSatEnd = $("#txtMorSatEnd").val();
	var txtMorFriEnd = $("#txtMorFriEnd").val();
	var txtMorThiEnd = $("#txtMorThiEnd").val();
	var txtMorWedEnd = $("#txtMorWedEnd").val();
	var txtMorTueEnd = $("#txtMorTueEnd").val();
	var txtMorMonEnd = $("#txtMorMonEnd").val();
	var txtMorSunEnd = $("#txtMorSunEnd").val();
	
	var txtMorSunRoom = $("#txtMorSunRoom").val();
	var txtMorMonRoom = $("#txtMorMonRoom").val();
	var txtMorTueRoom = $("#txtMorTueRoom").val();
	var txtMorWedRoom = $("#txtMorWedRoom").val();
	var txtMorThuRoom = $("#txtMorThuRoom").val();
	var txtMorFriRoom = $("#txtMorFriRoom").val();
	var txtMorSatRoom = $("#txtMorSatRoom").val();
	/* /Morning Slot */
	/* After Noon Slot */
	var txtAftSunStart = $("#txtAftSunStart").val();
	var txtAftMonStart = $("#txtAftMonStart").val();
	var txtAftTueStart = $("#txtAftTueStart").val();
	var txtAftWedStart = $("#txtAftWedStart").val();
	var txtAftThiStart = $("#txtAftThiStart").val();
	var txtAftFriStart = $("#txtAftFriStart").val();
	var txtAftSatStart = $("#txtAftSatStart").val();
	var txtAftSatEnd = $("#txtAftSatEnd").val();
	var txtAftFriEnd = $("#txtAftFriEnd").val();
	var txtAftThiEnd = $("#txtAftThiEnd").val();
	var txtAftWedEnd = $("#txtAftWedEnd").val();
	var txtAftTueEnd = $("#txtAftTueEnd").val();
	var txtAftMonEnd = $("#txtAftMonEnd").val();
	var txtAftSunEnd = $("#txtAftSunEnd").val();
	
	var txtAftSunRoom = $("#txtAftSunRoom").val();
	var txtAftMonRoom = $("#txtAftMonRoom").val();
	var txtAftTueRoom = $("#txtAftTueRoom").val();
	var txtAftWedRoom = $("#txtAftWedRoom").val();
	var txtAftThuRoom = $("#txtAftThuRoom").val();
	var txtAftFriRoom = $("#txtAftFriRoom").val();
	var txtAftSatRoom = $("#txtAftSatRoom").val();
	/* /After Noon Slot */
	/* Evening Slot */
	var txtEveSunStart = $("#txtEveSunStart").val();
	var txtEveMonStart = $("#txtEveMonStart").val();
	var txtEveTueStart = $("#txtEveTueStart").val();
	var txtEveWedStart = $("#txtEveWedStart").val();
	var txtEveThiStart = $("#txtEveThiStart").val();
	var txtEveFriStart = $("#txtEveFriStart").val();
	var txtEveSatStart = $("#txtEveSatStart").val();
	var txtEveSatEnd = $("#txtEveSatEnd").val();
	var txtEveFriEnd = $("#txtEveFriEnd").val();
	var txtEveThiEnd = $("#txtEveThiEnd").val();
	var txtEveWedEnd = $("#txtEveWedEnd").val();
	var txtEveTueEnd = $("#txtEveTueEnd").val();
	var txtEveMonEnd = $("#txtEveMonEnd").val();
	var txtEveSunEnd = $("#txtEveSunEnd").val();
	
	var txtEveSunRoom = $("#txtEveSunRoom").val();
	var txtEveMonRoom = $("#txtEveMonRoom").val();
	var txtEveTueRoom = $("#txtEveTueRoom").val();
	var txtEveWedRoom = $("#txtEveWedRoom").val();
	var txtEveThuRoom = $("#txtEveThuRoom").val();
	var txtEveFriRoom = $("#txtEveFriRoom").val();
	var txtEveSatRoom = $("#txtEveSatRoom").val();
	/* /Evening Slot */
	
	if (((txtMorSunStart == "" && txtMorSunEnd == "")
			|| (txtMorMonStart == "" && txtMorMonEnd == "")
			|| (txtMorTueStart == "" && txtMorTueEnd == "")
			|| (txtMorWedStart == "" && txtMorWedEnd == "")
			|| (txtMorThiStart == "" && txtMorThiEnd == "")
			|| (txtMorFriStart == "" && txtMorFriEnd == "") || (txtMorSatStart == "" && txtMorSatEnd == ""))
			|| ((txtAftSunStart == "" && txtAftSunEnd == "")
					|| (txtAftMonStart == "" && txtAftMonEnd == "")
					|| (txtAftTueStart == "" && txtAftTueEnd == "")
					|| (txtAftWedStart == "" && txtAftWedEnd == "")
					|| (txtAftThiStart == "" && txtAftThiEnd == "")
					|| (txtAftFriStart == "" && txtAftFriEnd == "") || (txtAftSatStart == "" && txtAftSatEnd == ""))
			|| ((txtEveSunStart == "" && txtEveSunEnd == "")
					|| (txtEveMonStart == "" && txtEveMonEnd == "")
					|| (txtEveTueStart == "" && txtEveTueEnd == "")
					|| (txtEveWedStart == "" && txtEveWedEnd == "")
					|| (txtEveThiStart == "" && txtEveThiEnd == "")
					|| (txtEveFriStart == "" && txtEveFriEnd == "") || (txtEveSatStart == "" && txtEveSatEnd == ""))) {

		alert("Please Enter Correct Filled Can Not Be Saved");
		return ;
	}else if(( (txtMorSunStart > txtMorSunEnd)
			|| (txtMorMonStart > txtMorMonEnd)
			|| (txtMorTueStart > txtMorTueEnd)
			|| (txtMorWedStart > txtMorWedEnd)
			|| (txtMorThiStart > txtMorThiEnd)
			|| (txtMorFriStart > txtMorFriEnd) || (txtMorSatStart > txtMorSatEnd))
			|| ((txtAftSunStart > txtAftSunEnd)
					|| (txtAftMonStart > txtAftMonEnd)
					|| (txtAftTueStart > txtAftTueEnd)
					|| (txtAftWedStart > txtAftWedEnd)
					|| (txtAftThiStart > txtAftThiEnd)
					|| (txtAftFriStart > txtAftFriEnd) || (txtAftSatStart > txtAftSatEnd))
			|| ((txtEveSunStart > txtEveSunEnd)
					|| (txtEveMonStart > txtEveMonEnd)
					|| (txtEveTueStart > txtEveTueEnd)
					|| (txtEveWedStart > txtEveWedEnd)
					|| (txtEveThiStart > txtEveThiEnd)
					|| (txtEveFriStart > txtEveFriEnd) || (txtEveSatStart > txtEveSatEnd))){
		alert("Start Time Should Be Less Than End Time..");
		return ;
	}
	
	//validation by Amol Saware
	else if(txtMorSunStart != "" && txtMorSunEnd != "" && txtMorSunStart != txtMorSunEnd && txtMorSunRoom == ""){
		$('#txtMorSunRoom').css("border-color","red");
		alert("Please Select Sunday Morning Room..");
		return ;
	}
	
	else if(txtMorMonStart != "" && txtMorMonEnd != "" && txtMorMonStart != txtMorMonEnd && txtMorMonRoom == ""){
		$('#txtMorMonRoom').css("border-color","red");
		alert("Please Select Monday Morning Room..");
		return ;
	}
	
	else if(txtMorTueStart != "" && txtMorTueEnd != "" && txtMorTueStart != txtMorTueEnd && txtMorTueRoom == ""){
		$('#txtMorTueRoom').css("border-color","red");
		alert("Please Select Tuesday Morning Room..");
		return ;
	}
	
	else if(txtMorWedStart != "" && txtMorWedEnd != "" && txtMorWedStart != txtMorWedEnd && txtMorWedRoom == ""){
		$('#txtMorWedRoom').css("border-color","red");
		alert("Please Select Wednesday Morning Room..");
		return ;
	}
	
	else if(txtMorThiStart != "" && txtMorThiEnd != "" && txtMorThiStart != txtMorThiEnd && txtMorThuRoom == ""){
		$('#txtMorThuRoom').css("border-color","red");
		alert("Please Select Thursday Morning Room..");
		return ;
	}
	
	else if(txtMorFriStart != "" && txtMorFriEnd != "" && txtMorFriStart != txtMorFriEnd && txtMorFriRoom == ""){
		$('#txtMorFriRoom').css("border-color","red");
		alert("Please Select Friday Morning Room..");
		return ;
	}
	
	else if(txtMorSatStart != "" && txtMorSatEnd != "" && txtMorSatStart != txtMorSatEnd && txtMorSatRoom == ""){
		$('#txtMorSatRoom').css("border-color","red");
		alert("Please Select Saturday Morning Room..");
		return ;
	}
	
	else if(txtAftSunStart != "" && txtAftSunEnd != "" && txtAftSunStart != txtAftSunEnd && txtAftSunRoom == ""){
		$('#txtAftSunRoom').css("border-color","red");
		alert("Please Select Sunday Afternoon Room..");
		return ;
	}
	
	else if(txtAftMonStart != "" && txtAftMonEnd != "" && txtAftMonStart != txtAftMonEnd && txtAftMonRoom == ""){
		$('#txtAftMonRoom').css("border-color","red");
		alert("Please Select Monday Afternoon Room..");
		return ;
	}
	
	else if(txtAftTueStart != "" && txtAftTueEnd != "" && txtAftTueStart != txtAftTueEnd && txtAftTueRoom == ""){
		$('#txtAftTueRoom').css("border-color","red");
		alert("Please Select Tuesday Afternoon Room..");
		return ;
	}
	
	else if(txtAftWedStart != "" && txtAftWedEnd != "" && txtAftWedStart != txtAftWedEnd && txtAftWedRoom == ""){
		$('#txtAftWedRoom').css("border-color","red");
		alert("Please Select Wednesday Afternoon Room..");
		return ;
	}
	
	else if(txtAftThiStart != "" && txtAftThiEnd != "" && txtAftThiStart != txtAftThiEnd && txtAftThuRoom == ""){
		$('#txtAftThuRoom').css("border-color","red");
		alert("Please Select Thursday Afternoon Room..");
		return ;
	}
	
	else if(txtAftFriStart != "" && txtAftFriEnd != "" && txtAftFriStart != txtAftFriEnd && txtAftFriRoom == ""){
		$('#txtAftFriRoom').css("border-color","red");
		alert("Please Select Friday Afternoon Room..");
		return ;
	}
	
	else if(txtAftSatStart != "" && txtAftSatEnd != "" && txtAftSatStart != txtAftSatEnd && txtAftSatRoom == ""){
		$('#txtAftSatRoom').css("border-color","red");
		alert("Please Select Saturday Afternoon Room..");
		return ;
	}
	
	else if(txtEveSunStart != "" && txtEveSunEnd != "" && txtEveSunStart != txtEveSunEnd && txtEveSunRoom == ""){
		$('#txtEveSunRoom').css("border-color","red");
		alert("Please Select Sunday Evening Room..");
		return ;
	}
	
	else if(txtEveMonStart != "" && txtEveMonEnd != "" && txtEveMonStart != txtEveMonEnd && txtEveMonRoom == ""){
		$('#txtEveMonRoom').css("border-color","red");
		alert("Please Select Monday Evening Room..");
		return ;
	}
	
	else if(txtEveTueStart != "" && txtEveTueEnd != "" && txtEveTueStart != txtEveTueEnd && txtEveTueRoom == ""){
		$('#txtEveTueRoom').css("border-color","red");
		alert("Please Select Tuesday Evening Room..");
		return ;
	}
	
	else if(txtEveWedStart != "" && txtEveWedEnd != "" && txtEveWedStart != txtEveWedEnd && txtEveWedRoom == ""){
		$('#txtEveWedRoom').css("border-color","red");
		alert("Please Select Wednesday Evening Room..");
		return ;
	}
	
	else if(txtEveThiStart != "" && txtEveThiEnd != "" && txtEveThiStart != txtEveThiEnd && txtEveThuRoom == ""){
		$('#txtEveThuRoom').css("border-color","red");
		alert("Please Select Thursday Evening Room..");
		return ;
	}
	
	else if(txtEveFriStart != "" && txtEveFriEnd != "" && txtEveFriStart != txtEveFriEnd && txtEveFriRoom == ""){
		$('#txtEveFriRoom').css("border-color","red");
		alert("Please Select Friday Evening Room..");
		return ;
	}
	
	else if(txtEveSatStart != "" && txtEveSatEnd != "" && txtEveSatStart != txtEveSatEnd && txtEveSatRoom == ""){
		$('#txtEveSatRoom').css("border-color","red");
		alert("Please Select Saturday Evening Room..");
		return ;
	}//End
	
/*
 * else if(( (txtMorSunStart == txtMorSunEnd) || (txtMorMonStart ==
 * txtMorMonEnd) || (txtMorTueStart == txtMorTueEnd) || (txtMorWedStart ==
 * txtMorWedEnd) || (txtMorThiStart == txtMorThiEnd) || (txtMorFriStart ==
 * txtMorFriEnd) || (txtMorSatStart == txtMorSatEnd)) || ((txtAftSunStart ==
 * txtAftSunEnd) || (txtAftMonStart == txtAftMonEnd) || (txtAftTueStart ==
 * txtAftTueEnd) || (txtAftWedStart == txtAftWedEnd) || (txtAftThiStart ==
 * txtAftThiEnd) || (txtAftFriStart == txtAftFriEnd) || (txtAftSatStart ==
 * txtAftSatEnd)) || ((txtEveSunStart == txtEveSunEnd) || (txtEveMonStart ==
 * txtEveMonEnd) || (txtEveTueStart == txtEveTueEnd) || (txtEveWedStart ==
 * txtEveWedEnd) || (txtEveThiStart == txtEveThiEnd) || (txtEveFriStart ==
 * txtEveFriEnd) || (txtEveSatStart == txtEveSatEnd))){ alert("Start Time Should
 * Not Be Equal.."); }
 */
	else {
		
		inputs.push('txtMorSunStart=' + txtMorSunStart);
		inputs.push('txtMorSunEnd=' + txtMorSunEnd);
		inputs.push('txtMorMonStart=' + txtMorMonStart);
		inputs.push('txtMorMonEnd=' + txtMorMonEnd);
		inputs.push('txtMorTueStart=' + txtMorTueStart);
		inputs.push('txtMorTueEnd=' + txtMorTueEnd);
		inputs.push('txtMorWedStart=' + txtMorWedStart);
		inputs.push('txtMorWedEnd=' + txtMorWedEnd);
		inputs.push('txtMorThiStart=' + txtMorThiStart);
		inputs.push('txtMorThiEnd=' + txtMorThiEnd);
		inputs.push('txtMorFriStart=' + txtMorFriStart);
		inputs.push('txtMorFriEnd=' + txtMorFriEnd);
		inputs.push('txtMorSatStart=' + txtMorSatStart);
		inputs.push('txtMorSatEnd=' + txtMorSatEnd);
		
		inputs.push('txtMorSunRoom=' + txtMorSunRoom);
		inputs.push('txtMorMonRoom=' + txtMorMonRoom);
		inputs.push('txtMorTueRoom=' + txtMorTueRoom);
		inputs.push('txtMorWedRoom=' + txtMorWedRoom);
		inputs.push('txtMorThuRoom=' + txtMorThuRoom);
		inputs.push('txtMorFriRoom=' + txtMorFriRoom);
		inputs.push('txtMorSatRoom=' + txtMorSatRoom);
		// push Afternoon Time slote
		inputs.push('txtAftSunStart=' + txtAftSunStart);
		inputs.push('txtAftSunEnd=' + txtAftSunEnd);
		inputs.push('txtAftMonStart=' + txtAftMonStart);
		inputs.push('txtAftMonEnd=' + txtAftMonEnd);
		inputs.push('txtAftTueStart=' + txtAftTueStart);
		inputs.push('txtAftTueEnd=' + txtAftTueEnd);
		inputs.push('txtAftWedStart=' + txtAftWedStart);
		inputs.push('txtAftWedEnd=' + txtAftWedEnd);
		inputs.push('txtAftThiStart=' + txtAftThiStart);
		inputs.push('txtAftThiEnd=' + txtAftThiEnd);
		inputs.push('txtAftFriStart=' + txtAftFriStart);
		inputs.push('txtAftFriEnd=' + txtAftFriEnd);
		inputs.push('txtAftSatStart=' + txtAftSatStart);
		inputs.push('txtAftSatEnd=' + txtAftSatEnd);
		
		inputs.push('txtAftSunRoom=' + txtAftSunRoom);
		inputs.push('txtAftMonRoom=' + txtAftMonRoom);
		inputs.push('txtAftTueRoom=' + txtAftTueRoom);
		inputs.push('txtAftWedRoom=' + txtAftWedRoom);
		inputs.push('txtAftThuRoom=' + txtAftThuRoom);
		inputs.push('txtAftFriRoom=' + txtAftFriRoom);
		inputs.push('txtAftSatRoom=' + txtAftSatRoom);
		// push Evening Time Slote
		inputs.push('txtEveSunStart=' + txtEveSunStart);
		inputs.push('txtEveSunEnd=' + txtEveSunEnd);
		inputs.push('txtEveMonStart=' + txtEveMonStart);
		inputs.push('txtEveMonEnd=' + txtEveMonEnd);
		inputs.push('txtEveTueStart=' + txtEveTueStart);
		inputs.push('txtEveTueEnd=' + txtEveTueEnd);
		inputs.push('txtEveWedStart=' + txtEveWedStart);
		inputs.push('txtEveWedEnd=' + txtEveWedEnd);
		inputs.push('txtEveThiStart=' + txtEveThiStart);
		inputs.push('txtEveThiEnd=' + txtEveThiEnd);
		inputs.push('txtEveFriStart=' + txtEveFriStart);
		inputs.push('txtEveFriEnd=' + txtEveFriEnd);
		inputs.push('txtEveSatStart=' + txtEveSatStart);
		inputs.push('txtEveSatEnd=' + txtEveSatEnd);
		
		inputs.push('txtEveSunRoom=' + txtEveSunRoom);
		inputs.push('txtEveMonRoom=' + txtEveMonRoom);
		inputs.push('txtEveTueRoom=' + txtEveTueRoom);
		inputs.push('txtEveWedRoom=' + txtEveWedRoom);
		inputs.push('txtEveThuRoom=' + txtEveThuRoom);
		inputs.push('txtEveFriRoom=' + txtEveFriRoom);
		inputs.push('txtEveSatRoom=' + txtEveSatRoom);
		
		inputs.push('divDocName=' + divDocName);
		inputs.push('slotDuration=' + $("#slotDuration").val());
		inputs.push('color=' + $("#eventsAppointment").val());
		inputs.push('queryType=' + $("#queryType").val());
		inputs.push('action=saveDoctorSlotTime');
		// var str = inputs.join('&');
	}
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 100000 * 60 * 9,
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
};

function searchNursingTrolleyItem() {

	var byName = $("#byName").val();
	var byId = $("#byId").val();

	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("Please Search Either By Item Id or Item Name!");
		SEtFocus("byName");
		return false;
	} else if (byName == "" && byId == "") {
		alert("Please Enter Patient Name OR Patient ID!");
		SEtFocus("byName");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=searchNursingTrolley');
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				
				pobj = eval('(' + ajaxResponse + ')');
				if (pobj.ntl == 0) {
					alert("Item Not Found");
				} else {
					$("#nursigTrolley").setTemplate(defaultNursingTrollyTemp);
					$("#nursigTrolley").processTemplate(pobj);
				}
			}
		});
	}
}

function searchCathTrolleyItem() {

	var byName = $("#byName").val();
	var byId = $("#byId").val();

	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("Please Search Either By Item Id OR Item Name!");
		SetFocus("byName");
		return false;
	} else if (byName == "" && byId == "") {
		alert("please inserst something for search");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=searchCathTrolley');
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));

		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;
				// alert(ajaxResponse);
				pobj = eval('(' + ajaxResponse + ')');
				if (pobj.ctl == 0) {
					alert("Item Not Found");
				} else {
					$("#cathTrolley").setTemplate(defaultCathTrollyTemp);
					$("#cathTrolley").processTemplate(pobj);
				}
			}
		});

	}
}

function setdefaultCathTrollyTemp() {

	var inputs = [];
	inputs.push('action=fetchCathTrolleyItem');
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
			$("#cathTrolleyDiv").html(ajaxResponse);

			pobj = eval('(' + ajaxResponse + ')');
			$("#cathTrolley").setTemplate(defaultCathTrollyTemp);
			$("#cathTrolley").processTemplate(pobj);
		}
	});

}

function saveCathTrolley(iid) {

	var inputs = [];
	var txtmqty = $("#txtmqty" + iid).val();
	var txtaqty = $("#txtaqty" + iid).val();
	var txtheading = $("#txtheading" + iid).val();
	if (txtmqty == "" || txtaqty == "" || txtheading == "") {

		alert("Empty Filled Can Not Be Saved");
	} else {
		inputs.push('txtmqty=' + txtmqty);
		inputs.push('txtaqty=' + txtaqty);
		inputs.push('txtheading=' + encodeURIComponent(txtheading));
		inputs.push('itemID=' + encodeURIComponent(iid));

		inputs.push('action=saveCathTrolleyItem');
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
				alert(r);
			}
		});
	}
}

function saveNursingTrolley(iid) {
	var inputs = [];
	var txtmqty = $("#txtmqty" + iid).val();
	var txtaqty = $("#txtaqty" + iid).val();
	var txtheading = $("#txtheading" + iid).val();
	if (txtmqty == "" || txtaqty == "" || txtheading == "") {

		alert("Empty Filled Can Not Be Saved");
	} else {
		inputs.push('txtmqty=' + txtmqty);
		inputs.push('txtaqty=' + txtaqty);
		inputs.push('txtheading=' + encodeURIComponent(txtheading));
		inputs.push('itemID=' + iid);

		inputs.push('action=saveNursingTrolleyItem');
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
				alert(r);
			}
		});
	}
}

function setdefaultNursingTrollyTemp() {

	var inputs = [];
	inputs.push('action=fetchNursingTrolleyItem');
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
			
			$("#nursigTrolleyDiv").html(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');
			$("#nursigTrolley").setTemplate(defaultNursingTrollyTemp);
			$("#nursigTrolley").processTemplate(pobj);
		}
	});
}

function addTrolleyDetails(pageName) {

	if (pageName == "NursingTrolleyManagement") {
		var inputs = [];
		inputs.push('action=fetchNursingTrolleyItem');
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
				
				$("#nursigTrolleyDiv").html(ajaxResponse);
			}
		});
		$("#ItemList").show();
		$("#alphabet").show();
		setTimeout(function() {
			setItemManagementTemp('Nursingtrolley', 'a');
		}, 1000);
	} else if (pageName == "CathTrolleyManagement") {
		var inputs = [];
		inputs.push('action=fetchCathTrolleyItem');
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
				$("#cathTrolleyDiv").html(ajaxResponse);
			}
		});
		$("#ItemList").show();
		$("#alphabet").show();
		setTimeout(function() {
			setItemManagementTemp('Cathtrolley', 'a');
		}, 1000);
	}
}

function saveTrolleyDetails() {
	var allVals = [];
	$.each($('#chk:checked'), function() {
		allVals.push($(this).val());
	});
	var trolleyType = $("#trolleyType").val();

	var inputs = [];
	inputs.push('action=AddTrolleyItems');

	inputs.push('txtItem=' + (allVals));
	inputs.push('trolleyType=' + trolleyType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(r);
		}
	});
}

/**
 * **********************************End Trolley
 * Management****************************
 */
/** ******************start salary Management***************************** */
var count = 1;

var defaultViewUserforSalaryMgmtTemp = "{#foreach $T.ul as ul}<tr><td class='col-md-1-1 center'>{count++}.</td>"
	+ "<td class='col-md-2-1 center' id='divPi{count}'>{$T.ul.ui}</td>"
	+ "<td class='numeric col-md-4-1' id='uname{count}'>{$T.ul.title} {$T.ul.fname} {$T.ul.mname} {$T.ul.lname}</td>"
	+ "<td class='numeric col-md-3-1 center' id='utype{count}'>"
	+ "<input style='font-size: 10px;' type='button' value='SET SALARY' onclick='setSalaryView({$T.ul.ui})' /></td>"
	+ "<td class='numeric col-md-3-1 center'>"
	+ "<input style='font-size: 10px;' type='button' value='PAY SALARY' id='btnEdit{$T.ul.ui}' onclick='makeSalary({$T.ul.ui})' /></td>"
	+ "</tr>{#/for}";

var ViewAllPrevSalaryDetailsTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 14%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Salary Month/Year </div><div style='width: 35%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Employee Name </div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Payable Salary </div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'> Salary Slip</div></div></div><div style='width: 100%;border: 1px solid #436a9d;height: 100%;overflow-y: scroll;'>{#foreach $T.listSalaryComponanat as listSalaryComponanat}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}' style='width: 13%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.listSalaryComponanat.month}{$T.listSalaryComponanat.year}</div><div style='width: 41%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: left;' id='uname{count}'></div><div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;' id='utype{count}'>{$T.listSalaryComponanat.paySal}</div><div style='width: 22%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='VIEW PREVIOUS SALARY' id='btnEdit{count}' onclick='viewPrevSalary({$T.esl.empsaldetid})'/></div></div>{#/for}</div>";
function fetchAllPrevSalaryDetails() {

	var inputs = [];
	inputs.push('action=fetchAllPrevSalaryDetails');
	inputs.push();
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
			pobj = eval('(' + ajaxResponse + ')');
			$("#userMangTemp").setTemplate(ViewAllPrevSalaryDetailsTemp);
			$("#userMangTemp").processTemplate(pobj);
		}
	});
}

function searchPrevSalary() {

	var strValue = $("#C").val();
	
	if (strValue == "") {
		alert("Please Enter User Name!");
		SetFocus("V");
		return false;
	} else {
		var inputs = [];

		inputs.push('action=searchPrevSalaryDetails');
		inputs.push('strValue=' + encodeURIComponent(strValue));

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
				pobj1 = eval('(' + ajaxResponse + ')');
				var noOfUsers = pobj1.empsallist.length;

				if (noOfUsers == 0) {
					alert("User Is Not Available.");
				}
				$("#userMangTemp").setTemplate(ViewAllPrevSalaryDetailsTemp);
				$("#userMangTemp").processTemplate(pobj1);
			}
		});
	}
}

function viewPrevSalary(userID) {
	// var userID = $("#divPi" + userID).html();

	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.empsallist.length; i++) {

		if (myArray.empsallist[i].empsaldetid == userID) {

			myObj1 = myArray.empsallist[i];
			empsaldetid = myArray.empsallist[i].empsaldetid;
			break;
		}
	}
	
	myObj = JSON.stringify(myObj1);
	myObj = myObj.decodeSpecialChars();

	userBean = eval('(' + myObj + ')');

	window.location.href = "ViewPrevSalary.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&empsaldetid=" + empsaldetid;
}

function getPrevSalaryDetails() {

	var divMyobj = $("#divMyobj").html();

	myArray = JSON.parse(divMyobj);

	$("#empCode").html(myArray.ec);
	$("#absentDays").html(myArray.absday);
	$("#txtContactNo").html(myArray.conno);
	$("#txtEmpName").html(myArray.enm);
	$("#totalDuration").html(myArray.gettotdur);
	$("#monFixSal").html(parseFloat(myArray.monfixsal).toFixed(2));
	$("#monSecDed").html(parseFloat(myArray.monsecded).toFixed(2));
	$("#paySal").html(parseFloat(myArray.paysal).toFixed(2));
	$("#presentDays").html(myArray.preday);
	$("#txtDate").html(myArray.saldt);
	$("#totalDays").html(myArray.totday);
	$("#totalSalary").html(parseFloat(myArray.totsal).toFixed(2));
}

function defaultViewUserforSalary(callFrom) {

	var inputs = [];
	inputs.push('action=fetchUser');
	inputs.push('callFrom=' + encodeURIComponent(callFrom));
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
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#userMangTemp").setTemplate(defaultViewUserforSalaryMgmtTemp);
			$("#userMangTemp").processTemplate(pobj1);
			for ( var i = 0; i <= pobj1.ul.length; i++) {
				var j = pobj1.ul[i].ui;
				if (pobj1.ul[i].ua == 0)
					$('#btnEdit' + j).attr('disabled', 'disabled');
			}
		}
	});
}

function searchViewUserforSalary() {

	var strValue = $("#byName").val();
	
	if (strValue == "" || strValue == null) {
		alert("Please Enter User Name First");
		SetFocus("byName");
		return false;
	} else {
		var inputs = [];

		inputs.push('action=searchUser');
		inputs.push('strValue=' + encodeURIComponent(strValue));
		inputs.push('searchBy=byName');
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
			
				pobj1 = eval('(' + ajaxResponse + ')');
				var noOfUsers = pobj1.ul.length;

				if (noOfUsers == 0) {
					alert("User Is Not Available.");
				}
				$("#userMangTemp")
						.setTemplate(defaultViewUserforSalaryMgmtTemp);
				$("#userMangTemp").processTemplate(pobj1);
			}
		});
	}
}

function viewSalary(userID) {
	
	// var userID = $("#divPi" + userID).html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.ul.length; i++) {

		if (myArray.ul[i].obd.di == userID) {

			myObj1 = myArray.ul[i];
			docId = myArray.ul[i].obd.di;
			break;
		}
	}
	
	myObj = JSON.stringify(myObj1);
	myObj = myObj.decodeSpecialChars();
	
	userBean = eval('(' + myObj + ')');

	window.location.href = "Salary.jsp?" + "myObj=" + encodeURIComponent(myObj);

}

function saveEmpSalaryDetails() {
	
	var txtEmpName = $("#txtEmpName").val();
	var txtContactNo = $("#txtContactNo").val();
	var empCode = $("#empCode").val();
	var txtDate = $("#txtDate").val();

	var monFixSal = $("#monFixSal").html();
	var totalDuration = $("#totalDuration").html();
	var totalDays = $("#totalDays").html();
	var absentDays = $("#absentDays").html();
	var presentDays = $("#presentDays").html();
	var totalSalary = $("#totalSalary").html();
	var monSecDed = $("#monSecDed").html();
	var paySal = $("#paySal").html();

	var inputs = [];

	inputs.push('action=saveEmpSalaryDetails');

	inputs.push('txtEmpName=' + encodeURIComponent(txtEmpName));
	inputs.push('empCode=' + empCode);
	inputs.push('txtDate=' + txtDate);
	inputs.push('txtContactNo=' + txtContactNo);

	inputs.push('monFixSal=' + monFixSal);
	inputs.push('totalDuration=' + totalDuration);
	inputs.push('totalDays=' + totalDays);
	inputs.push('absentDays=' + absentDays);
	inputs.push('presentDays=' + presentDays);
	inputs.push('totalSalary=' + totalSalary);
	inputs.push('monSecDed=' + monSecDed);
	inputs.push('paySal=' + paySal);

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
			alert(ajaxResponse);
			window.location.href = "SalaryManagement.jsp";
		}
	});

}
/** ******************end salary Management***************************** */

/** **********************Start Maintenance Management****************** */

var addMachineWithDateTemp = "<div style='width: 100%; padding-left: 0%;'><div style='width: 100.2%; background-color: #436a9d; padding-bottom: 1%; padding-top: 1%; font-weight: bold; padding-left: 0.2%'><div style='width: 100%;'><div style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>#</div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>Machine	Name</div><div	style='width: 20%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>Machine				Code</div>			<div				style='width: 35%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Maintenance				Date Type</div>			&nbsp; <input type='button' value='+'				onclick=toCreateMaintenanceMahineDateDiv( 'RowCount')  /> <input				type='button' value='-' onclick=toRemoveDivMaintenanceMahineDate( 'RowCount') />		</div>	</div></div><div	style='width: 100.2%; height: 320px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.mmmlist as mmml}	<div id='div{rowCount}'		style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>		<div			style='width: 7.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>		<div			style='width: 21.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>			<input style='width: 90%;' type='text' value='{$T.mmml.mn}' name='textfield'				id='macNm{rowCount}' />		</div>		<div			style='width: 21.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>			<input style='width: 90%;' type='text' value='{$T.mmml.mc}' name='textfield'				id='macCod{rowCount}' />		</div>		<div			style='width: 36.6%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>			<select style='width: 90%;' multiple='multiple'				onmouseover='setSize(this)' onmouseout='setSizemin(this)'				name='textfield' id='macDtTyp{rowCount}' size='1'>{#foreach $T.mmml.mmdList as mmdl}				<option>{$T.mmdl.objmd.date_name}</option>	{#/for}		</select>		</div>		<div			style='width: 4%; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;'>			<input type='checkbox' value='' name='checkbox{rowCount}'				id='checkbox'>		</div>	</div>	{#/for}<input type='hidden' value='{rowCount++}' id='txtRowCount'		name='txtRowCount' /></div><input type='hidden' value='' id='addRowCount' /><input type='hidden' value='{--rowCount}' id='RowCount' />";

var viewAllMachineTemp = "<div style='width: 100%; padding-left: 0%;'>	<div		style='width: 100.2%; background-color: #436a9d; padding-bottom: 1%; padding-top: 1%; font-weight: bold; padding-left: 0.2%'>		<div style='width: 100%;'>			<div				style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>#</div>			<div				style='width: 35%; padding-left: 1%;  border: 1px solid #FFF; color: #FFF; text-align: left; padding-right: 2%'>Machine				Name</div>			<div				style='width: 15%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>Machine				Code</div>			<div				style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Edit Machine</div><div				style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Delete Machine</div>		</div>	</div></div><div	style='width: 100.2%; height: 376px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>	{#foreach $T.mmmlist as mmml}<div id='div{rowCount}'		style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>		<div			style='width: 7.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>		<div			style='width: 37.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>{$T.mmml.mn}</div>		<div			style='width: 16.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>{$T.mmml.mc}</div>		<div			style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;text-align: center;'>			<input type='button' value='EDIT' class='edit'  onclick=viewMachin('{$T.mmml.mmmi}') />		</div><div			style='width: 16.5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;text-align: center;border-right: none;'>			<input type='button' value='DELETE' class='edit'  onclick=deleteMachin('{$T.mmml.mmmi}') />		</div>	</div>{#/for}</div></div>";

var maintenanceMahineDateTemp = "<div style='width: 100%; padding-left: 0%;'> <div	style='width: 100.2%; background-color: #436a9d; padding-bottom: 1%; padding-top: 1%; font-weight: bold; padding-left: 0.2%'>	<div style='width: 100%;'> <div	style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>#</div>	<div style='width: 78.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Maintenance Date Type</div>	 <input type='button' value='+' onclick=toCreateMaintenanceMahineDateDiv('RowCount')  />	<input type='button' value='-' onclick=toRemoveDivMaintenanceMahineDate('RowCount') />		</div> </div></div>	<div style='width: 100.2%; height: 320px; overflow-y: scroll; border: 1px solid #436a9d;' id='DRRDiv'>{#foreach $T.liMainteDate as lil}<div id='div{rowCount}'	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div style='width: 7.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>	<div	style='width: 80.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>	<input style='width: 90%;' type='text' value='{$T.lil.date_name}'	name='textfield' id='ln{rowCount}' /></div><div style='width: 4%; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;'><input type='checkbox' value='{$T.lil.date_name}' name='checkbox{rowCount}' id='checkbox' ></div>	</div>	<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />{#/for}</div><input type='hidden' value='' id='addRowCount' /> <input	type='hidden' value='{--rowCount}' id='RowCount' />";

var maintainDateTypeTemp = "<div style='width: 100%;'>	<div	style='width: 100.2%; background-color: #436a9d; padding-bottom: 1%; padding-top: 1%; font-weight: bold; padding-left: 0.2%'>		<div style='width: 100%;'>			<div				style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>#</div>			<div				style='width: 70%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Machine				Date Type</div>		</div>	</div></div><div	style='width: 100%; height: 200px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'>{#foreach $T.liMainteDate as lmd}<div id='remove{rowCount}'		style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>		<div			style='width: 12.5%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>		<div			style='width: 74%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>{$T.lmd.date_name}</div><div style='width: 4%; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;'><input type='checkbox' value='{$T.lmd.mainte_dates_id}' name='chk{rowCount}' id='chk{rowCount}'><input type='hidden' value='' id='mmdi{rowCount++}' /></div></div>{#/for}<input type='hidden' value='{--rowCount}' id='RowCount' /></div>";

var mainMachineMainTemp = "{#foreach $T.limmd as sl}<tr>	<td class='col-md-1-1 center'>{++i1}</td>	<td class='col-md-1-1 center'>{$T.sl.mn}</td>	<td class='col-md-1-1 center'>{$T.sl.mc}</td>	<td class='col-md-1-1 center'>{$T.sl.dn}</td>	<td class='col-md-1-1 center'>		<input type='text' name='frm_date{i1}' value='{$T.sl.fm}'			style='width: 90%; border: 0.2px solid; text-align: center;'			id='frm_date{i1}' class='dp-applied' onchange='geteTodate1({i1})'>	</td>	<td class='col-md-1-1 center'>		<input type='text' id='months{i1}' name='months{i1}'			value='{$T.sl.nom}'			style='width: 80%; border: 0.2px solid; text-align: center;'			onkeyup='geteTodate1({i1})'			onkeypress='return validateNumbers(event)' />	</td>	<td class='col-md-1-1 center'>		<input type='text' name='to_date{i1}' value='{$T.sl.td}'			style='width: 90%; border: 0.2px solid; text-align: center;'			id='to_date{i1}' class='dp-applied' readonly='readonly'>	</td></tr>{#/for}<input type='hidden' value='{i1}' id='countForMachineMainte'>";

var mainViewMachineMainTemp = "{#foreach $T.limmd as sl}<tr>	<td class='col-md-1-1 center'>{++i1}</td>	<td class='col-md-1-1 center'>{$T.sl.mn}</td>	<td class='col-md-1-1 center'>{$T.sl.mc}</td>	<td class='col-md-1-1 center'>{$T.sl.dn}</td>	<td class='col-md-1-1 center'>		{$T.sl.fm}</td>	<td class='col-md-1-1 center'>{$T.sl.nom}</td>	<td class='col-md-1-1 center'>		{$T.sl.td}</td></tr>{#/for}";

function previousExtraMaintence(emi, en) {

	var inputs = [];
	inputs.push('emi=' + emi);
	inputs.push('action=fetchextraPrevMItem');
	var str = inputs.join('&');
	jQuery
			.ajax({
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
					
					window.location.href = "ViewPreviousExtraMachineTable.jsp?"
							+ "myobj=" + encodeURIComponent(ajaxResponse)
							+ "&en=" + en;
				}
			});
}

function viewPreviousExtraMachineMaintenance() {

	var myobj = $("#myobj").html();
	pobj1 = eval('(' + myobj + ')');
	$("#DRRDiv1").setTemplate($("#DRRDiv1").html());
	$("#DRRDiv1").processTemplate(pobj1);
}

function previousMachineMaintence(mmmi, dn, dt, mn, mc) {
	var inputs = [];

	inputs.push('mmmi=' + encodeURIComponent(mmmi));
	inputs.push('dn=' + encodeURIComponent(dn));
	inputs.push('action=fetchPrevMacMaintence');
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
			window.location.href = "ViewPreviousMachineTable.jsp?" + "myobj="
					+ encodeURIComponent(ajaxResponse) + "&mn=" + mn + "&mc="
					+ mc + "&dt=" + dt;
		}
	});
}

function viewPreviousMachineMaintenance() {

	var myobj = $("#myobj").html();
	pobj1 = eval('(' + myobj + ')');
	$("#machine_div").setTemplate($("#machine_div").html());
	$("#machine_div").processTemplate(pobj1);
}

function getSalaryDates() {
	var inputs = [];
	inputs.push('action=getSalaryDates');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#date111").setTemplate($("#date111").html());
			$("#date111").processTemplate(pobj1);
		}
	});
}

// Author :nIKHIL; Date : 26/9/2014; purpose : template only;
var fetchPreviousMachineMaintenanceTmp = "{#foreach $T.limmd as sl}<tr>			<td class='col-md-1-1 center'>{++i1}</td>		<td class='col-md-1-1 center'>{$T.sl.mn}</td>		<td class='col-md-1-1 center'>{$T.sl.mc}</td>		<td class='col-md-1-1 center'>{$T.sl.dn}</td>		<td class='col-md-1-1 center'>			<input type='button' name='btnView{i1}' value='View' class='edit'				id='btnView{i1}'				onclick='previousMachineMaintence({$T.sl.mmmi},{$T.sl.mdi},'{$T.sl.dn}','{$T.sl.mn}','{$T.sl.mc}')' />		</td><tr>	{#/for}<input type='hidden' value='{i1}' id='countForMachineMainte' />";

function fetchPreviousMachineMaintenance() {
	sr = 1;
	var inputs = [];
	inputs.push('action=fetchMainMachineMsainte');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			// $("#machine_div").setTemplate($("#machine_divHide").html());
			$("#machine_div").setTemplate(fetchPreviousMachineMaintenanceTmp);
			$("#machine_div").processTemplate(pobj1);
			// $("#objMMD").html(ajaxResponse);
		}
	});
}

function fetchMainMachineMainteViewTemp() {

	var inputs = [];
	inputs.push('action=fetchMainMachineMsainteView');
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
			i = 0;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#machine_div").setTemplate(mainViewMachineMainTemp);
			$("#machine_div").processTemplate(pobj1);
		}
	});
}

function saveMainMachineMainte() {
	var m = 1;
	myObj = $("#objMM").html();

	myObj = eval('(' + myObj + ')');
	for (m = 1; m <= myObj.limmd.length; m++) {
		
		txtToDate = $("#to_date" + m).val();
		txtFrmDate = $("#frm_date" + m).val();
		txtMonths = $("#months" + m).val();
		if (txtMonths == "") {
			alert("Please Enter Months");
			return false;
		}
		
		if (myObj.limmd[m - 1].td == txtToDate) {

		} else {
			myObj.limmd[m - 1].nom = txtMonths;
			myObj.limmd[m - 1].td = txtToDate;
			myObj.limmd[m - 1].fm = txtFrmDate;
			myObj.limmd[m - 1].iu = "Y";
		}
	}
	myObj = JSON.stringify(myObj);
	myObj = myObj.decodeSpecialChars();

	var inputs = [];
	inputs.push('action=saveMainMachineMsainte');
	inputs.push('myObj=' + (myObj));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			
			alert(ajaxResponse);
			if (ajaxResponse == "Dublicate Data Cannot be saved") {
				window.location = "MachineTable.jsp";
			}

			// pobj1 = eval('(' + ajaxResponse + ')');
			/*
			 * $("#machine_div").setTemplate(mainMachineMainTemp);
			 * $("#machine_div").processTemplate(pobj1);
			 * $("#").html(ajaxResponse);
			 */
		}
	});
	// saveExtraMaintenanceItemDates();
}

function saveMaintMachineDate() {
	var RowCount = $("#RowCount").val();
	var mn = $("#mn").val();
	mn = $.trim(mn);

	var mc = $("#mc").val();

	mc = $.trim(mc);

	var chkDate = [];
	for ( var i = 1; i <= RowCount; i++) {
		if ($("#chk" + i).attr('checked')) {
			var dt = $("#chk" + i).val();
			chkDate.push(dt);
		}
	}

	if (mn == "" || mn == null) {
		alert("Please Enter Machine Name.");
		SetFocus("mn");
		return false;
	} else if (mc == "" || mc == null) {
		alert("Please Enter Machine Code.");
		SetFocus("mc");
		return false;
	} else if (chkDate == "" || chkDate == null) {
		alert("Please Select Maintenance Date Type.");
		return false;
	} else {

		var inputs = [];
		inputs.push('action=saveMaintMachineDate');
		inputs.push('chkDate=' + chkDate);
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		inputs.push('mn=' + mn);
		inputs.push('mc=' + mc);
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
				alert(ajaxResponse);

				if (ajaxResponse == "Machine Details Saved Successfully...") {
					window.location.href = 'MaintenanceMachineManagement.jsp';
				}
			}
		});
	}
}

function updateMaintMachineDate() {

	var RowCount = $("#RowCount").val();
	var mmi = $("#mmi").val();
	var mn = $("#mn").val();
	var mc = $("#mc").val();

	var chkDate = [];
	for ( var i = 1; i <= RowCount; i++) {
		if ($("#chk" + i).attr('checked')) {
			var dt = $("#chk" + i).val();
			chkDate.push(dt);
		}
	}

	if (mn == "" || mn == null) {
		alert("Machine Name Must Be Filled Out");
		SetFocus("mn");
		return false;
	} else if (mc == "" || mc == null) {
		alert("Machine Code Must Be Filled Out");
		SetFocus("mc");
	} else if (chkDate == "" || chkDate == null) {
		alert("Please Select Maintenance Date Type");
		return false;
	} else {
		var inputs = [];
		inputs.push('action=updateMaintMachineDate');
		inputs.push('chkDate=' + chkDate);
		inputs.push('mmi=' + mmi);
		inputs.push('mn=' + mn);
		inputs.push('mc=' + mc);
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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

				alert(ajaxResponse);
				window.location.href = 'MaintenanceMachineManagement.jsp';
			}
		});
	}
}

function fetchAllMachinMeaintDateType() {

	var inputs = [];
	inputs.push('action=fetchAllMachinMeaintDateType');
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

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#maintainDateDiv").setTemplate(maintainDateTypeTemp);
			$("#maintainDateDiv").processTemplate(pobj1);
		}
	});
	fetchMachineWithDate();
	setTimeout('checkMachineDate()', 1500);
}

function checkMachineDate() {

	var divObj = $("#objDiv").html();

	// myArray = JSON.parse(divObj);
	myArray = eval('(' + divObj + ')');
	for ( var i = 0; i < myArray.mmmlist[0].mmdList.length; i++) {

		var RowCount = $("#RowCount").val();

		for ( var j = 1; j <= RowCount; j++) {

			var mdi = myArray.mmmlist[0].mmdList[i].mdi;
			var mmi = myArray.mmmlist[0].mmdList[i].mmi;
			var chkmdi = $("#chk" + j).val();

			if (chkmdi == mdi) {

				$("#chk" + j).attr('checked', true);
				$("#mmdi" + j).val(mmi);
			}
		}
	}
}

function fetchAllMachin() {
	var sr = 1;
	var pobj1 = "";

	var inputs = [];
	inputs.push('action=fetchAllMachine');
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
			
			$("#machineobj").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#MaintenanceMachineDateDiv").setTemplate(viewAllMachineTemp);
			$("#MaintenanceMachineDateDiv").processTemplate(pobj1);

			// parsebcObj = JSON.stringify(pobj1);
			// $("#objDiv").html(parsebcObj);
		}
	});
}

function deleteMachin(mmi) {
	var r = confirm("Confirm to Delete Machine Details?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteMachine');
		inputs.push('mmi=' + encodeURIComponent(mmi));

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

				alert(ajaxResponse);
				window.location.reload();
			}
		});
	}
}

function viewMachin(mmi) {

	$("#addNewMachine").hide();

	$("#head").html("Edit Machine Details");
	$("#query").val("update");
	var machineobj = $("#machineobj").html();
	myArray = JSON.parse(machineobj);

	for ( var i = 0; i < myArray.mmmlist.length; i++) {
		if (myArray.mmmlist[i].mmmi == mmi) {
			myObj = myArray.mmmlist[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	myObj = myObj.decodeSpecialChars();
	myObj = JSON.parse(myObj);
	$("#mn").val(myObj.mn);
	$("#mc").val(myObj.mc);
	$("#mmi").val(mmi);
	fetchAllMachinMeaintDateTp();
	fetchMachineWithDate();
	setTimeout('checkMachineDate()', 500);
	/*
	 * window.location.href = "MaintenanceMachineManagementView.jsp?" + "mmi=" +
	 * mmi + "&mn=" + myObj.mn + "&mc=" + myObj.mc;
	 */
}
function checkMachineFunction() {
	var queryType = $("#query").val();
	if (queryType == "insert") {
		saveMaintMachineDate();
	} else {
		updateMaintMachineDate();
	}
}
function fetchAllMachinMeaintDateTp() {

	var inputs = [];
	inputs.push('action=fetchAllMachinMeaintDateType');
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

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#maintainDateDiv").setTemplate(maintainDateTypeTemp);
			$("#maintainDateDiv").processTemplate(pobj1);
			SetFocus("mn");
		}
	});
}

function fetchMachineWithDate() {

	var mmi = $("#mmi").val();

	var inputs = [];

	inputs.push('mmi=' + mmi);
	inputs.push('action=fetchMachineWithDate');
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
			$("#objDiv").html(ajaxResponse);
		}
	});
}

function setMaintenanceMahineDateTemp() {
	sr = 1;
	var inputs = [];
	inputs.push('action=fetchDefMMDates');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#MaintenanceMachineDateDiv").setTemplate(
					maintenanceMahineDateTemp);
			$("#MaintenanceMachineDateDiv").processTemplate(pobj1);
			$("#objMMD").html(ajaxResponse);
		}
	});
}

function toRemoveDivMaintenanceMahineDate(RowCount) {

	var Response1 = $("#objMMD").html();

	ajaxRes = eval('(' + Response1 + ')');
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	var k = 0;
	for (m = 1; m <= ajaxRes.liMainteDate.length; m++) {
		for (a = 0; a < allVals.length; a++) {
			if (allVals[a] == ajaxRes.liMainteDate[k].date_name) {
				ajaxRes.liMainteDate[k].date_name = "";
			}
		}
		k++;
	}

	if (allVals.length != 0) {
		
		parsebcObj = JSON.stringify(ajaxRes);
		parsebcObj = parsebcObj.decodeSpecialChars();

		var inputs = [];
		inputs.push('action=deleteMaintenanceMahineDate');
		inputs.push('parsebcObj=' + (parsebcObj));
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
				alert(ajaxResponse);
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
			$("#div" + p + "").remove();
		}
		p++;
	}

}

function toCreateMaintenanceMahineDateDiv(RowCount) {
	
	var j = 1;
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
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
	document.getElementById(divId).innerHTML = '<div id="remove'
			+ rowCount
			+ '" style="width: 100%; height: 28px; border-bottom: 1px solid #069;">	<div style="width: 7.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (sr++)
			+ '</div> <div	style="width: 80.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;">	<input style="width: 90%;" type="text" value=""	name="textfield" id="ln'
			+ rowCount
			+ '" /></div>	<div style="width: 4%; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"><input type="checkbox" value="" name="checkbox'
			+ rowCount + '" id="checkbox' + rowCount + '"></div></div>';

	$("#RowCount").val(rowCount);
	var curr = $("#addRowCount").val();
	$("#addRowCount").val(mm);
	
	mm++;
	SetFocus("ln" + rowCount);
}

function saveMaintenanceMahineDate() {

	var Response1 = $("#objMMD").html();
	ajaxRes = eval('(' + Response1 + ')');
	var z = 0;
	for ( var m = 1; m <= ajaxRes.liMainteDate.length; m++) {

		ajaxRes.liMainteDate[z].date_name = $("#ln" + m + "").val();
		z++;

	}

	parsebcObj = JSON.stringify(ajaxRes);
	parsebcObj = parsebcObj.decodeSpecialChars();

	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var ReadStvalue = rowCount - addrowCount;

	if (rowCount == 0) {
		return false;
	} else {
		var i;
		var mMDDetailString = "";
		for (i = 1; i <= addrowCount; i++) {
			count++;

			var ln = $("#ln" + count + "").val();
			ln = $.trim(ln);
			// var hid = $("#hid" + count + "").val();
			if (ln == "") {
				alert("You can not save empty fields.");
				SetFocus("ln" + count);
				return false;
			} else {
				mMDDetailString = mMDDetailString + "@" + ln;
			}
		}

		var inputs = [];
		inputs.push('action=saveMaintenanceMahineDate');
		inputs.push('mMDDetailString=' + (mMDDetailString));
		inputs.push('parsebcObj=' + (parsebcObj));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function setExtraMaintenanceMahineTemp() {

	sr = 1;
	var inputs = [];
	inputs.push('action=fetchextraMItem');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#MaintenanceMachineDateDiv").setTemplate(
					ExtramaintenanceMahineTemp);
			$("#MaintenanceMachineDateDiv").processTemplate(pobj1);
			$("#objMMD").html(ajaxResponse);
		}
	});
}

var extraMaintenanceTemp = "{#foreach $T.lemi as lemi}<tr>	<td class='col-md-1-1 center'>{rowCount}</td>	<td class='col-md-1-1 center'>{$T.lemi.en}</td>	<td class='col-md-1-1 center'>		{$T.lemi.fm}</td>	<td class='col-md-1-1 center'>{$T.lemi.mon}</td>	<td class='col-md-1-1 center'>{$T.lemi.to}</td>	<input style='width: 90%;' type='hidden' name='textfield'		id='eid{rowCount}' value='{$T.lemi.emi}' /><input style='width: 90%;'		type='hidden' name='textfield' id='hid{rowCount}' value=' ' /></tr><input type='hidden' value='{rowCount++}' id='etxtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value='' id='eaddRowCount' /><input type='hidden' value='{--rowCount}' id='eRowCount' />";

function setExtraMaintenanceMahineViewTemp() {
	sr = 1;
	var inputs = [];
	inputs.push('action=fetchextraMItemView');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#DRRDiv1").setTemplate(extraMaintenanceTemp);
			$("#DRRDiv1").processTemplate(pobj1);
			// $("#objMMD").html(ajaxResponse);
		}
	});

}

var extraMachineMaintenance = "{#foreach $T.lemi as lemi}<tr>	<td class='col-md-1-1 center'>{rowCount}</td>	<td class='col-md-1-1 center'>{$T.lemi.en}</td>	<td class='col-md-1-1 center'>		<input type='text' name='' value='{$T.lemi.fm}'			style='width: 90%; border: 0.2px solid; padding:; text-align: center;'			id='efrm{rowCount}' onchange='geteTodate({rowCount})'			class='dp-applied'>	</td>	<td class='col-md-1-1 center'>		<input type='text' id='emonth{rowCount}' name='emonth'			onkeyup='geteTodate({rowCount})'			style='width: 80%; border: 0.2px solid; text-align: center;'			value='{$T.lemi.mon}' onkeypress='return validateNumbers(event)' />	</td>	<td class='col-md-1-1 center'>		<input type='text' name='' value='{$T.lemi.to}'			style='width: 90%; border: 0.2px solid; text-align: center;'			id='eto{rowCount}' class='dp-applied' readonly='readonly'>	</td>	<input style='width: 90%;' type='hidden' name='textfield'		id='eid{rowCount}' value='{$T.lemi.emi}' /><input		style='width: 90%;' type='hidden' name='textfield' id='hid{rowCount}'		value=' ' /></tr><input type='hidden' value='{rowCount++}' id='etxtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value='' id='eaddRowCount' /><input type='hidden' value='{--rowCount}' id='eRowCount' />";

var preExtraMachineMaintenance = "{#foreach $T.lemi as lemi}<tr>	<td class='col-md-1-1 center'>{rowCount}</td>	<td class='col-md-1-1 center'>		{$T.lemi.en}</td>	<td class='col-md-1-1 center'>		<input type='button' name='' value='View' id='btnView{rowCount}'			class='edit' onclick=previousExtraMaintence({$T.lemi.emi},'{$T.lemi.en}')  >	</td>	<input style='width: 90%;' type='hidden' name='textfield'		id='eid{rowCount}' value='{$T.lemi.emi}' /><input style='width: 90%;'		type='hidden' name='textfield' id='hid{rowCount}' value=' ' /></tr><input type='hidden' value='{rowCount++}' id='etxtRowCount'	name='txtRowCount' />{#/for}<input type='hidden' value='' id='eaddRowCount' /><input type='hidden' value='{--rowCount}' id='eRowCount' />";

function setExtraMaintenanceMahine(pageName) {

	sr = 1;
	var inputs = [];
	inputs.push('action=fetchextraMItem');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pageName == "previousMachineMaintenance") {
				$("#DRRDiv1").setTemplate(preExtraMachineMaintenance);
				$("#DRRDiv1").processTemplate(pobj1);
			} else if (pageName == "MachineTable") {
				$("#DRRDiv1").setTemplate(extraMachineMaintenance);
				$("#DRRDiv1").processTemplate(pobj1);
				// $("#objMMD").html(ajaxResponse);
			}
		}
	});
}

function toRemoveDivExtraMaintenanceMahine(RowCount) {

	var Response1 = $("#objMMD").html();
	ajaxRes = eval('(' + Response1 + ')');
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	var k = 0;
	for (m = 1; m <= ajaxRes.lemi.length; m++) {
		for (a = 0; a < allVals.length; a++) {
			if (allVals[a] == ajaxRes.lemi[k].emi) {
				ajaxRes.lemi[k].en = "";
			}
		}
		k++;
	}

	if (allVals.length != 0) {
		
		parsebcObj = JSON.stringify(ajaxRes);
		parsebcObj = (parsebcObj.decodeSpecialChars());
		var inputs = [];
		inputs.push('action=deleteExtraMaintenanceMahine');
		inputs.push('parsebcObj=' + (parsebcObj));
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
				alert(ajaxResponse);
				location.reload();
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
			$("#div" + p + "").remove();
		}
		p++;
	}
}

var j = 1;
function toCreateExtraMaintenanceMahineDiv(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
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
	document.getElementById(divId).innerHTML = '<div id="remove'
			+ rowCount
			+ '" style="width: 100%; height: 28px; border-bottom: 1px solid #069;">	<div style="width: 7.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (sr++)
			+ '</div> <div	style="width: 80.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;">	<input style="width: 90%;" type="text" value=""	name="textfield" id="ln'
			+ rowCount
			+ '" /></div>	<div style="width: 4%; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"><input type="checkbox" value="" name="checkbox'
			+ rowCount + '" id="checkbox' + rowCount + '"></div></div>';

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(j);

	j++;
	SetFocus("ln" + rowCount);
}

function saveExtraMaintenanceItemDates() {

	var rowCount = $("#eRowCount").val();
	if (rowCount == 0) {
		return false;
	} else {
		var i;
		var mMDDetailString = "";
		for (i = 1; i <= rowCount; i++) {

			var efrm = $("#efrm" + i + "").val();
			if (efrm != "") {
				var emonth = $("#emonth" + i + "").val();
				var eto = $("#eto" + i + "").val();
				var eid = $("#eid" + i + "").val();
				if (efrm == undefined) {

				} else if (emonth == "") {
					alert("Please Enter Month");
					return false;

				} else {

					mMDDetailString = mMDDetailString + "@" + efrm + ","
							+ emonth + "," + eto + "," + eid;
				}
			}
		}

		var inputs = [];
		inputs.push('action=saveExtraMaintDates');
		inputs.push('mMDDetailString=' + (mMDDetailString));
		// inputs.push('parsebcObj=' + parsebcObj);

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
			success : function(ajaxResponse) {
				// alert(ajaxResponse);
				// location.reload();
			}
		});
	}
}

function saveExtraMaintenanceMahine() {

	var Response1 = $("#objMMD").html();
	
	ajaxRes = eval('(' + Response1 + ')');
	var z = 0;
	for ( var m = 1; m <= ajaxRes.lemi.length; m++) {
		ajaxRes.lemi[z].en = $("#ln" + m + "").val();
		z++;
	}

	parsebcObj = JSON.stringify(ajaxRes);
	parsebcObj = (parsebcObj.decodeSpecialChars());

	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var ReadStvalue = rowCount - addrowCount;

	if (rowCount == 0) {
		return false;
	} else {
		var i;
		var mMDDetailString = "";
		for (i = 1; i <= addrowCount; i++) {
			count++;
			var ln = $("#ln" + count + "").val();
			ln = $.trim(ln);
			if (ln == undefined) {

			} else if (ln == "") {
				alert("You can not save empty fields.");
				SetFocus("ln" + count);
				return false;
			} else {
				mMDDetailString = mMDDetailString + "@" + ln;
			}
		}

		var inputs = [];
		inputs.push('action=saveextraMaintenanceMahine');
		inputs.push('mMDDetailString=' + (mMDDetailString));
		inputs.push('parsebcObj=' + (parsebcObj));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AdminServlet",
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(ajaxResponse) {
						alert(ajaxResponse);

						if (ajaxResponse == "Extra Maintenance Item is saved successfully...") {

							location.reload();
						}
					}
				});
	}
}

/** **********************End Maintenance Management****************** */
/** ******************start Loundary Management***************************** */
var z = 1;
var loundaryManagementTemp = "<div style='width: 100%; padding-left: 0%;'> <div	style='width: 100.2%; background-color: #436a9d; padding-bottom: 1%; padding-top: 1%; font-weight: bold; padding-left: 0.2%'>	<div style='width: 100%;'> <div	style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>#</div>	<div style='width: 40%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Laundry	Items</div>	<div	style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>	Item's Charge</div>	<div style='width: 15.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Hospital Item Quantity</div> <input type='button' value='+' onclick=toCreateLaundryDiv('RowCount')  />	<input type='button' value='-' onclick=toRemoveDivLaundry('RowCount') />		</div> </div></div>	<div style='width: 100.2%; height: 320px; overflow-y: scroll; border: 1px solid #436a9d;' id='DRRDiv'>{#foreach $T.lil as lil}<div id='div{rowCount}'	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div style='width: 7.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>	<div	style='width: 41.8%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>	<input style='width: 90%;text-transform: capitalize;' type='text' value='{$T.lil.ln}'	name='textfield' id='ln{rowCount}' /></div><div style='width: 21.4%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>	<input style='width: 50%; text-align: right;' type='text' name='textfield'	id='lr{rowCount}' value='{$T.lil.lr}' onkeypress=' return validatePrice(event)' />	</div><div	style='width: 16.8%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 50%; text-align: right; ' type='text' name='textfield' id='lhq{rowCount}' value='{$T.lil.lhq}' onkeypress='return validateNumbers(event)' />	</div><div style='width: 4%; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;'><input type='checkbox' value='{$T.lil.lid}' name='checkbox{rowCount}' id='checkbox' ></div><input style='width: 90%;' type='hidden' name='textfield' id='id{rowCount}' value='{$T.lil.lid}' /><input	style='width: 90%;' type='hidden' 	id='hid{z++}' value='{$T.lil.lid}' />	</div>	<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />		 {#/for}</div><input type='hidden' value='' id='addRowCount' /> <input	type='hidden' value='{--rowCount}' id='RowCount' />";

var searchLOwnerTemp = "<div style='width: 10%;'>Search By:</div><div style='width: 10%;'>Owner Name</div><div style='width: 12%; padding-left: 2%;'><input	style='width: 100%; '	name='byName' type='text' id='byName' onkeypress='return validatealphabetic(event)' /></div><div style='width: 18%; text-align: center;'><input type='button'	value='Search'  class='edit' onclick='searchLOwner()' /></div>";

var defaultViewLOwnerTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Owner ID</div><div style='width: 34.2%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Owner Name</div><div style='width: 14.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Edit</div><div	style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Delete Owner</div></div></div><div style='width: 100%; height: 89%; overflow-y: scroll;'>{#foreach $T.lol as lol}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}' style='width: 11.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.lol.oid} </div> <div style='width: 35.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: left;'>{$T.lol.on}</div>  <div style='width: 15.6%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT'  class='edit' id='btnEdit{count}' onclick='editLOwner({$T.lol.oid})' /></div><div style='width: 26%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='DELETE'  class='edit' id='btnDelete{count}' onClick='deleteLOwner({$T.lol.oid})'/></div></div>{#/for}</div>";
var saveLOwnerButtonTemp = "<input 	style='font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;'	type='button' value='Save Now' onclick=saveLOwnerDetails() />";

var addLOwnerDetailsTemp = "<div style='width: 99.8%; height: 100%; padding-left: 5%;'><div style='width: 80%;'><h2>Add Laundry Owner</h2></div><div style='width: 100%; padding-top: 2.5%;'><div style='width: 100%; margin-top: 7%'><div style='width: 25%;'>Owner ID:</div><div style='width: 70%;'><input type='text' id='oid' name='oid' value='{$T.oid}' readonly='readonly' style='width: 90%; background-color: lightgray;' /></div></div><div style='width: 100%; margin-top: 7%'><div style='width: 25%;'>Owner Name:</div><div style='width: 70%;'><input type='text' id='txtOname' name='txtOname'	style='width: 90%;'	onkeypress='return validatealphabetic(event)' /><div style='width: 5%; color: red; float: right;'><b>*</b></div></div></div><div style='width: 100%; margin-top: 7%'><div style='width: 25%;'>Contact Number:</div><div style='width: 70%;'><input type='text' id='txtCno' name='txtCno' style='width: 90%;' onkeypress='return validateNumbers(event)' /></div></div></div><div style='width: 10%; padding-top: 2%;'></div></div><input type='hidden' id='queryType' value='insert' />";

var editLOwnerDetailsTemp = "<div style='width: 99.8%; height: 100%; padding-left: 5%;'><div style='width: 80%;'><h2>Edit Laundry Owner</h2></div><div style='width: 100%; padding-top: 2.5%;'><div style='width: 100%; margin-top: 7%'><div style='width: 25%;'>Owner ID:</div><div style='width: 70%;'><input type='text' id='oid' name='oid' value='{$T.oid}' readonly='readonly' style='width: 90%; background-color: lightgray;' /></div></div><div style='width: 100%; margin-top: 7%'><div style='width: 25%;'>Owner Name:</div><div style='width: 70%;'><input type='text' id='txtOname' name='txtOname'	style='width: 90%;' value='{$T.on}'	onkeypress='return validatealphabetic(event)' /><div style='width: 5%; color: red; float: right;'><b>*</b></div></div></div><div style='width: 100%; margin-top: 7%'><div style='width: 25%;'>Contact Number:</div><div style='width: 70%;'><input type='text' id='txtCno' name='txtCno' style='width: 90%;' value='{$T.oc}' onkeypress='return validateNumbers(event)' /></div></div></div><div style='width: 10%; padding-top: 2%;'></div></div><input type='hidden' id='queryType' value='update' />";

var ownerNameTemplate = "<select	style='width: 90%;font-size: 11px;'  name='selOwnerName' id='selOwnerName'  ><option value='select'>Select Owner</option>{#foreach $T.lol as lol}	<option value='{$T.lol.oid}'>{$T.lol.on}</option>{#/for}</select>";

var laundryOwnerAddBtnTemp = '<input onclick="addOwnerDetails()" style="font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;"	type="button" value="Add Owner" />';

var k = 1;

var laundryItemNameTemplate = "<select	style='width: 80%; padding-left: 20px; border: 1px solid #069;'  name='selLitemName' id='selLitemName{k}' onchange='calLaundryItemRate({k++})' ><option value='select'>Select Laundry Item</option>{#foreach $T.lil as lil}	<option value='{$T.lil.lid}'>{$T.lil.ln}</option>{#/for}</select>";

var rwCount = 0;

var defaultViewPrevBillTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Bill Date</div><div style='width: 34.2%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Owner Name</div><div style='width: 14.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>View</div><div	style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Delete</div></div></div><div style='width: 100%; height: 89%; overflow-y: scroll;'>{#foreach $T.lbml as lbml}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi{count}' style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.lbml.dt} </div> <div style='width: 35.4%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: left;'>{$T.lbml.objlo.on}</div>  <div style='width: 15.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' class='edit'  value='VIEW' id='btnView{count}' onclick='viewPrevBill({$T.lbml.bmid})' /></div><div style='width: 26.5%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='DELETE'  class='edit' id='btnDelete{count}' class='edit'  onClick='deletePrevBill({$T.lbml.bmid})'/></div></div>{#/for}</div>";

var updatePrevBillTemp = "<table border=1 cellspacing=0 cellpadding=0 width=95 style='width: 10.750in;' id='tblItems'>{#foreach $T.lbml[0].lbcl as lbcl}<tr><td style='width: 5%; padding: 2.15pt 5.75pt 2.15pt 5.75pt; height: .2in; text-align: center'>{++rwCount}<input type='hidden' value='{$T.lbcl.bcid}' id='txtDid' name='txtDid'></td><td style='width: 28%; border-top: none; padding: 2.15pt 5.75pt 2.15pt 5.75pt; padding-left: 0.6%; text-align: center;'>	<div id='lItem{rwCount}' style='width: 100%'></div>	</td> <td style='width: 18%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in; padding-left: 1.1%;'>	<input name='txtUnit{rwCount}' type='text' id='txtUnit{rwCount}' size='22' style='border: 1px solid #069; text-align: right;padding-right: 10px' onkeyup='setEachTotalForUpdate({rwCount})' value='{$T.lbcl.iqt}' onkeypress='return validatePrice(event)' ></td>	<td	style='width: 18%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><input  readonly='readonly' style='border: 1px solid #069;; text-align: right;padding-right: 10px' value='{$T.lbcl.ir}' name='txtUnitPrice{rwCount}' type='text' id='txtUnitPrice{rwCount}' size='22'	 onkeypress='return validatePrice(event)';></td>	<td 	style='width: 20%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in;'> <input  type='text' id='txtPerItemTotal{rwCount}' readonly='readonly'	style='border: 1px solid #069; text-align: right;padding-right: 10px'	name='txtPerItemTotal{rwCount}' size='22' value='{$T.lbcl.bcst}' >	</td><td style='width: 8%; border-top: none; padding: 2.15pt .15in 2.15pt .15in; height: .2in'><INPUT	type='checkbox' name='chk' value='{$T.lbcl.liid}' /></td></tr>{#/for}</table><input id='rowCount' type='hidden' value='{rwCount}'>";

var ExtramaintenanceMahineTemp = "<div style='width: 100%; padding-left: 0%;'> <div	style='width: 100.2%; background-color: #436a9d; padding-bottom: 1%; padding-top: 1%; font-weight: bold; padding-left: 0.2%'>	<div style='width: 100%;'> <div	style='width: 5%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>#</div>	<div style='width: 78.5%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Extra Item Name</div>	 <input type='button' value='+' onclick=toCreateExtraMaintenanceMahineDiv('RowCount')  />	<input type='button' value='-' onclick=toRemoveDivExtraMaintenanceMahine('RowCount') />		</div> </div></div>	<div style='width: 100.2%; height: 320px; overflow-y: scroll; border: 1px solid #436a9d;' id='DRRDiv'>{#foreach $T.lemi as lemi}<div id='div{rowCount}'	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div style='width: 7.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div>	<div	style='width: 80.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'>	<input style='width: 90%;' type='text' value='{$T.lemi.en}'	name='textfield' id='ln{rowCount}' /></div><div style='width: 4%; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;'><input type='checkbox' value='{$T.lemi.emi}' name='checkbox{rowCount}' id='checkbox' ></div>	</div>	<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />{#/for}</div><input type='hidden' value='' id='addRowCount' /> <input	type='hidden' value='{--rowCount}' id='RowCount' />";

var pharmacyItemManagementTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered' style='margin-top: 20px;width: 1067px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><label class='TextFont'>#No</label></th>"
		+ "<th class='col-md-4-1' style='height: 21.5px;'><label class='TextFont'>Medicine Name</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Medicine Charges</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Available Quantity</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Minimum Quantity</label></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'>"
		+ "<input type='button' value='+' onclick=toCreateItemDiv('RowCount') />"
		+ "<input type='button' value='-' onclick=toRemoveDivItem('RowCount','pharmacy') /></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-md-12-1' style='margin-top: -21px; overflow-y: scroll; height: 358px; max-height: auto;border:1px solid #b8b8b8;'>"
		+ "<table class='table table-bordered table-condensed'>"
		+ "<tbody class='col-md-12-1' id='DRRDiv'>"
		+ "{#foreach $T.il as il}"
		+ "<tr id='remove{rowCount}'>"
		+ "<td style='height: 21.5px; width:93px;' class='col-md-1-1'>"
		+ "<label style='margin-top: 8px;' class='TextFont'>{sr++}.</label></td>"
		+ "<td style='height: 21.5px; width:383px;' class='col-md-4-1'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;' value='{$T.il.in}' name='textfield' id='itn{rowCount}'></td>"
		+ "<td style='height: 21.5px; width:190px;' class='col-md-2-1'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;text-align: right;' name='textfield' id='ip{rowCount}' value='{$T.il.ip}' onkeypress='return validateNumbers(event)' maxlength='8' />"
		+ "</td>"
		+ "<td style='height: 21.5px; width:190px;' class='col-md-2-1'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;' id='aq{rowCount}' value='{$T.il.iaq}'onkeypress='return validateNumbers(event)' maxlength='6' /></td>"
		+ "<td style='height: 21.5px; width:190px;' class='col-md-2-1'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;' id='mq{rowCount}' value='{$T.il.imq}' onkeypress='return validateNumbers(event)' maxlength='6' /></td>"
		+ "<td style='height: 21.5px; width:93px;' class='col-md-1-1'><input type='checkbox' style='margin-top: 10px;' name='chk{rowCount}' id='chk{rowCount}' /></td>"
		+ "</tr>"
		+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount'/>"
		+ "{#/for}" + "<input type='hidden' value='' id='addRowCount' />"
		+ "<input type='hidden' value='{--rowCount}' id='RowCount' />"
		+ "</tbody>" + "</table>" + "</div>";

var itemManagementTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered' style='margin-top: 20px;width: 1067px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><label class='TextFont'>#No</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Medicine Name</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Medicine Charges</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Available Quantity</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Minimum Quantity</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'>"
		+ "<input type='button' value='+' onclick=toCreateItemDiv('RowCount') />"
		+ "<input type='button' value='-' onclick=toRemoveDivItem('RowCount','pharmacy') /></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-md-12-1' style='margin-top: -21px; overflow-y: scroll; height: 250px; max-height: auto;border:1px solid #b8b8b8;'>"
		+ "<table class='table table-bordered table-condensed'>"
		+ "<tbody class='col-md-12-1' id='DRRDiv'>"
		+ "{#foreach $T.il as il}"
		+ "<tr id='remove{rowCount}'>"
		+ "<td style='height: 21.5px; width:89px;'>"
		+ "<label style='margin-top: 8px;' class='TextFont'>{sr++}.</label></td>"
		+ "<td style='height: 21.5px; width:182px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 8px; width: 90%;' value='{$T.il.in}' name='textfield' id='itn{rowCount}'></td>"
		+ "<td style='height: 21.5px; width:181px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 8px;width: 50%; text-align: right;' name='textfield' id='ip{rowCount}' value='{$T.il.ip}' onkeypress='return validateNumbers(event)' maxlength='8' />"
		+ "</td>"
		+ "<td style='height: 21.5px; width:182px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 8px;width: 50%;' id='aq{rowCount}' value='{$T.il.iaq}'onkeypress='return validateNumbers(event)' maxlength='6' /></td>"
		+ "<td style='height: 21.5px; width:181px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 8px;width: 50%;' id='mq{rowCount}' value='{$T.il.imq}' onkeypress='return validateNumbers(event)' maxlength='6' /></td>"
		+ "<td style='height: 21.5px; width:90px;'><input type='checkbox' style='margin-top: 12px;' name='chk{rowCount}' id='chk{rowCount}' /></td>"
		+ "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

var itemManagementTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered' style='margin-top: 20px;width: 1067px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><label class='TextFont'>#No</label></th>"
		+ "<th class='col-md-4-1' style='height: 21.5px;'><label class='TextFont'>Medicine Name</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Medicine Charges</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Available Quantity</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Minimum Quantity</label></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'>"
		+ "<input type='button' value='+' onclick=toCreateItemDiv('RowCount') />"
		+ "<input type='button' value='-' onclick=toRemoveDivItem('RowCount','pharmacy') /></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-md-12-1' style='margin-top: -21px; overflow-y: scroll; height: 358px; max-height: auto;border:1px solid #b8b8b8;'>"
		+ "<table class='table table-bordered table-condensed'>"
		+ "<tbody class='col-md-12-1' id='DRRDiv'>"
		+ "{#foreach $T.il as il}"
		+ "<tr id='remove{rowCount}'>"
		+ "<td style='height: 21.5px; width:93px;'>"
		+ "<label style='margin-top: 8px;' class='TextFont'>{sr++}.</label></td>"
		+ "<td style='height: 21.5px; width:383px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px; width: 90%;' value='{$T.il.in}' name='textfield' id='itn{rowCount}'></td>"
		+ "<td style='height: 21.5px; width:190px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;width: 50%; text-align: right;' name='textfield' id='ip{rowCount}' value='{$T.il.ip}' onkeypress='return validateNumbers(event)' maxlength='8' />"
		+ "</td>"
		+ "<td style='height: 21.5px; width:190px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;width: 50%;' id='aq{rowCount}' value='{$T.il.iaq}'onkeypress='return validateNumbers(event)' maxlength='6' /></td>"
		+ "<td style='height: 21.5px; width:190px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;width: 50%;' id='mq{rowCount}' value='{$T.il.imq}' onkeypress='return validateNumbers(event)' maxlength='6' /></td>"
		+ "<td style='height: 21.5px; width:93px;'><input type='checkbox' style='margin-top: 10px;' name='chk{rowCount}' id='chk{rowCount}' /></td>"
		+ "</tr>" + "{#/for}"
		+ "<input type='hidden' value='' id='addRowCount' />"
		+ "<input type='hidden' value='{--rowCount}' id='RowCount' />"
		+ "</tbody>" + "</table>" + "</div>";

function setEachTotalForUpdate(rowcount) {
	var total = 0;
	item_qty = $("#txtUnit" + rowcount).val();
	item_price = $("#txtUnitPrice" + rowcount).val();
	total = (parseFloat(item_qty) * parseFloat(item_price)).toFixed(2);
	$("#txtPerItemTotal" + rowcount).val(total);
	setSubTotalForUpdate();
}

function setSubTotalForUpdate() {
	var rowCnt = $("#rowCount").val();
	
	var noOfRow = (parseFloat($("#txtRowCount").val()) + 1);
	var subTotal = 0;
	for (i = 1; i <= rowCnt; i++) {
		if ($("#txtPerItemTotal" + i).val() != undefined
				&& $("#txtPerItemTotal" + i).val() != "") {
			var perTotal = $("#txtPerItemTotal" + i).val();
			subTotal = (parseFloat(subTotal) + parseFloat(perTotal)).toFixed(2);
		}
	}
	$("#txtSubtotal").val(subTotal);
}

function UpdatePrevBill() {

	var strRowsVal = "";

	var rowCnt = $("#txtTotalRow").val();
	var ajaxResponse1 = $("#divMyObj").html();
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');

	for ( var k = 1; k <= rowCnt; k++) {
		var ii = $("#selLitemName" + k).val();
		if (k <= ajaxResponse1.lbml[0].lbcl.length) {

			if (ii != undefined) {

				var a = --k;
				k++;
				ajaxResponse1.lbml[0].lbcl[a].liid = $("#selLitemName" + k)
						.val();
				ajaxResponse1.lbml[0].lbcl[a].ir = $("#txtUnitPrice" + k).val();
				ajaxResponse1.lbml[0].lbcl[a].iqt = $("#txtUnit" + k).val();
				ajaxResponse1.lbml[0].lbcl[a].bcst = $("#txtPerItemTotal" + k)
						.val();
			} else {
				// alert("Not going");
			}
		} else {
			if (ii != undefined) {
				
				var item_name = $("#selLitemName" + k).val();
				var item_price = $("#txtUnitPrice" + k).val();
				var item_unit = $("#txtUnit" + k).val();
				var item_total = $("#txtPerItemTotal" + k).val();
				if (strRowsVal == "") {
					strRowsVal = item_name + "," + item_price + "," + item_unit
							+ "," + item_total + "#";
				} else {
					strRowsVal = strRowsVal + item_name + "," + item_price
							+ "," + item_unit + "," + item_total + "#";
				}
			} else {
				// alert("Not going");
			}
		}
	}

	ajaxResponse1.lbml[0].gt = $("#txtSubtotal").val();
	ajaxResponse1.lbml[0].dt = $("#popup_container2").val();
	ajaxResponse1.lbml[0].bsg = $("#txtSign").val();
	ajaxResponse1.lbml[0].oid = $("#selOwnerName").val();
	ajaxResponse1.lbml[0].bmid = $("#bmid").val();
	parsedObj = JSON.stringify(ajaxResponse1);
	parsedObj = (parsedObj.decodeSpecialChars());

	var inputs = [];
	inputs.push('action=UpdatePrevBill');
	inputs.push('strRowsValues=' + (parsedObj));
	inputs.push('strRowsVal=' + encodeURIComponent(strRowsVal));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location = "LaundryPreviousBillDashboard.jsp";
		}
	});
}

var tempForPBill = 1;
var tempForPBill1 = 1;

function setLaundryItemBoxes() {
	var ajaxResponse1 = $("#divMyObj").html();
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');

	var inputs = [];
	inputs.push('action=fetchDefLoundaryItem');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			for ( var p = 1; p <= ajaxResponse1.lbml[0].lbcl.length; p++) {
				$("#lItem" + p).setTemplate(laundryItemNameTemplate);
				$("#lItem" + p).processTemplate(pobj1);

				$("#selLitemName" + p).val(
						ajaxResponse1.lbml[0].lbcl[p - 1].liid);
			}
		}
	});
}

function setUpdatePrevBillTemplate() {
	count = 1;
	var ajaxResponse1 = $("#divMyObj").html();
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');
	$("#divRowTbl").setTemplate(updatePrevBillTemp);
	$("#divRowTbl").processTemplate(ajaxResponse1);
	setLaundryItemBoxes();
	
	setLaundryOwnerBoxes('update');
	$("#popup_container2").val(ajaxResponse1.lbml[0].dt);
	$("#txtSubtotal").val(ajaxResponse1.lbml[0].gt);
	$("#txtSign").val(ajaxResponse1.lbml[0].bsg);
	$("#txtTotalRow").val($("#rowCount").val());
}

function setLaundryOwnerBoxes(type) {

	var ajaxResponse1 = $("#divMyObj").html();
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');
	var inputs = [];
	inputs.push('action=fetchLOwner');
	inputs.push('type=' + encodeURIComponent(type));

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

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#lOwner").setTemplate(ownerNameTemplate);
			$("#lOwner").processTemplate(pobj1);
			$("#selOwnerName").val(ajaxResponse1.lbml[0].oid);
		}
	});
}

function viewPrevBill(bmid) {

	var inputs = [];
	inputs.push('bmid=' + bmid);
	inputs.push('action=fetchLoundaryBill');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			myObj = ajaxResponse;
			myEvalObj = eval('(' + myObj + ')');
			var bmid = (myEvalObj.lbml[0].bmid);

			window.location.href = "LaundryPrevBill.jsp?" + "myObj="
					+ encodeURIComponent(myObj) + "&bmid=" + bmid;
		}
	});
}

function deleteRowBill(itmId) {
	setSubTotalForUpdate();
	var ajaxResponse1 = $("#divMyObj").html();
	ajaxResponse1 = eval('(' + ajaxResponse1 + ')');
	
	var j = 0;
	for ( var i = 1; i <= ajaxResponse1.lbml[0].lbcl.length; i++) {

		if (ajaxResponse1.lbml[0].lbcl[j].liid == itmId) {
			ajaxResponse1.lbml[0].lbcl[j].liid = 0;
		}
		j++;
	}
	parsedObj = JSON.stringify(ajaxResponse1);
	parsedObj = (parsedObj.decodeSpecialChars());
	$("#divMyObj").html(parsedObj);
};

function deletePrevBill(bmid) {
	var r = confirm("Are You Confirm To Delete Laundry Bill ");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteLBill');
		inputs.push('bmid=' + bmid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

function searchPrevBill() {
	count = 1;
	var from = $("#popup_container2").val();
	var to = $("#popup_container3").val();
	if (from == "" || to == "") {
		alert("Date Must Be Filled Out");
		return false;
	}
	var inputs = [];
	inputs.push('from=' + from);
	inputs.push('to=' + to);
	inputs.push('action=searchPrevLoundaryBill');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.lbml.length == 0) {
				alert("Laundry Item Not Found");
			} else {
				$("#laundryPrevBillTemp").setTemplate(defaultViewPrevBillTemp);
				$("#laundryPrevBillTemp").processTemplate(pobj1);
			}
		}
	});
}

function setLaundryOwnerAddBtn() {
	var sample;
	$("#AddLOwner").setTemplate(laundryOwnerAddBtnTemp);
	$("#AddLOwner").processTemplate(sample);
}

function fetchLaundryPrevBill() {

	var inputs = [];
	inputs.push('action=fetchPrevLoundaryBill');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#laundryPrevBillTemp").setTemplate(defaultViewPrevBillTemp);
			$("#laundryPrevBillTemp").processTemplate(pobj1);
		}
	});
}

function saveLaundryBill() {
	var flag = 0;
	var noOfRow = (parseFloat($("#txtRowCount").val()) + 1);
	var strRowsValues = "";
	var did = $("#txtDid").val();
	var i_total = $("#txtSubtotal").val();
	var txtSign = $("#txtSign").val();

	for (i = 1; i <= noOfRow; i++) {
		var item_name = $("#selLitemName" + i).val();
		var item_price = $("#txtUnitPrice" + i).val();
		var item_unit = $("#txtUnit" + i).val();
		var item_total = $("#txtPerItemTotal" + i).val();

		if (strRowsValues == "") {
			strRowsValues = item_name + "," + item_price + "," + item_unit
					+ "," + item_total + "#";
		} else {
			strRowsValues = strRowsValues + item_name + "," + item_price + ","
					+ item_unit + "," + item_total + "#";
		}
	}

	if ($("#selOwnerName").val() == "select") {
		alert("Please Select Laundry owner Name!");
		SetFocus("selOwnerName");
		return false;
	} else if (item_name == "") {
		alert("Please Enter Item Name!");
		SetFocus("selLitemName");
		return false;
	} else if (item_name != "" && item_price == "") {
		alert("Please Enter Item Price!");

		return false;
	} else if (item_price != "" && item_unit == "") {
		alert("Please Enter Item Quantity!");
		SetFocus("selOwnerName");
		return false;
	} else if (item_price != "" && item_total == "") {
		alert("Total Must be filled out");
		SetFocus("selOwnerName");
		return false;
	} else if (item_total != "" && i_total == 0) {
		alert("Grand Total Must be filled out");
		SetFocus("selOwnerName");
		return false;
	} else if (txtSign == "") {
		alert("Please Sign!");
		SetFocus("selOwnerName");
		return false;
	}
	var inputs = [];
	inputs.push('action=SaveLaundryBill');
	inputs.push('strRowsValues=' + encodeURIComponent(strRowsValues));
	inputs.push('txtSubtotal=' + $("#txtSubtotal").val());
	inputs.push('txtSign=' + txtSign);
	inputs.push('selOwnerName=' + encodeURIComponent($("#selOwnerName").val()));
	inputs.push('popup_container2=' + $("#popup_container2").val());
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			window.location = "LaundryPreviousBillDashboard.jsp";
		}
	});
}

function setSubTotal() {
	var rowCnt = ($("#txtTotalRow").val() + 1);
	
	var noOfRow = (parseFloat($("#txtRowCount").val()) + 1);
	var subTotal = 0;
	for ( var i = 1; i <= rowCnt; i++) {
		if ($("#txtPerItemTotal" + i).val() != undefined
				&& $("#txtPerItemTotal" + i).val() != "") {
			var perTotal = $("#txtPerItemTotal" + i).val();
			subTotal = (parseFloat(subTotal) + parseFloat(perTotal)).toFixed(2);
		}
	}
	$("#txtSubtotal").val(subTotal);

} 
function setEachTotal(item_price, item_qty, total_price, id) {
	
	var eachTotal = 0;

	item_qty = $("#" + item_qty).val();
	item_price = $("#" + item_price).val();
	if (item_price == "") {
		alert("Please Select Laundry Item");
		$("#" + item_qty).val("");
		return false;
	}
	eachTotal = (parseFloat(item_qty) * parseFloat(item_price)).toFixed(2);
	$("#" + total_price).val(eachTotal);

	setSubTotal();
}

function setLaundryItemNameTemplate(divID) {

	var inputs = [];
	inputs.push('action=fetchDefLoundaryItem');
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
			$("#laundryItemDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#lItem" + divID).setTemplate(laundryItemNameTemplate);
			$("#lItem" + divID).processTemplate(pobj1);
		}
	});
}

function calLaundryItemRate(rowCount) {
	var laundryItemDiv = $("#laundryItemDiv").html();

	pobj1 = eval('(' + laundryItemDiv + ')');

	var itemID = $("#selLitemName" + rowCount).val();
	for ( var j = 0; j <= pobj1.lil.length; j++) {
		if (pobj1.lil[j].lid == itemID)
			$("#txtUnitPrice" + rowCount).val(pobj1.lil[j].lr);
	}
}

function setOwnerNameTemplate() {
	var inputs = [];
	inputs.push('action=fetchLOwner');

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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#lOwner").setTemplate(ownerNameTemplate);
			$("#lOwner").processTemplate(pobj1);
		}
	});
}

function searchLOwner() {
	var byName = $("#byName").val();
	var searchBy;
	var value;
	if (byName == "") {
		alert("Please Enter Name!");
		SetFocus("byName");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;
		}

		var inputs = [];
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('action=SearchLOwner');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;

				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.lol.length == 0) {
					alert("Owner Not Found");
				} else {
					$("#laundryMangTemp").setTemplate(defaultViewLOwnerTemp);
					$("#laundryMangTemp").processTemplate(pobj1);
				}
			}
		});
	}
}

function deleteLOwner(oid) {

	var r = confirm("Are You Confirm To Delete Laundry Owner ");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteLOwner');
		inputs.push('oid=' + oid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

function editLOwner(oid) {
	$("#search").html("");
	$("#AddLOwner").html("");
	ajaxResponse = $("#hiddenLOwner").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.lol.length; i++) {

		if (myArray.lol[i].oid == oid) {

			myObj1 = myArray.lol[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	myObj = (myObj.decodeSpecialChars());
	distBean = eval('(' + myObj + ')');
	
	$("#laundryMangTemp1").setTemplate(editLOwnerDetailsTemp);
	$("#laundryMangTemp1").processTemplate(distBean);
	setLownerSaveButtonTemp();
	setLaundryOwnerAddBtn();
}

function saveLOwnerDetails() {

	var oid = $("#oid").val();
	var txtOname = $("#txtOname").val();
	var txtCno = $("#txtCno").val();

	if (txtOname == "") {
		alert("Please Enter Owner Name!");
		SetFocus("txtOname");
		return false;
	} else {

		var queryType = $("#queryType").val();

		var inputs = [];
		inputs.push('action=AddLOwner');
		inputs.push('oid=' + oid);
		inputs.push('txtOname=' + encodeURIComponent(txtOname));
		inputs.push('txtCno=' + encodeURIComponent(txtCno));
		inputs.push('queryType=' + queryType);
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
				alert(r);
				window.location = "LaundryOwnerManagement.jsp";
			}
		});
	}
}

function setLownerSaveButtonTemp() {
	var sampleBean;
	$("#saveButton").setTemplate(saveLOwnerButtonTemp);
	$("#saveButton").processTemplate(sampleBean);
}

function addOwnerDetails() {
	$("#search").html("");
	var inputs = [];
	inputs.push('action=fetchLOwnerID');

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
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#laundryMangTemp1").setTemplate(addLOwnerDetailsTemp);
			$("#laundryMangTemp1").processTemplate(pobj1);
			setLownerSaveButtonTemp();
		}
	});
}

function defaultViewLOwner() {

	var inputs = [];
	inputs.push('action=fetchLOwner');

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
			$("#hiddenLOwner").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#laundryMangTemp").setTemplate(defaultViewLOwnerTemp);
			$("#laundryMangTemp").processTemplate(pobj1);
		}
	});
}

function setsearchLOwnerTemp() {
	var sample;
	$("#search").setTemplate(searchLOwnerTemp);
	$("#search").processTemplate(sample);
}

function toCreateLaundryDiv(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
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
	document.getElementById(divId).innerHTML = '<div id="remove'
			+ rowCount
			+ '" style="width: 100%; height: 28px; border-bottom: 1px solid #069;">	<div style="width: 7.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (rowCount)
			+ '</div> <div	style="width: 41.7%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;">	<input style="width: 90%;text-transform: capitalize;" type="text" value=""	name="textfield" id="ln'
			+ rowCount
			+ '" /></div><div style="width: 21.8%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;">	<input style="width: 50%;text-align: right;" type="text" name="textfield"	id="lr'
			+ rowCount
			+ '" value="" onkeypress=" return validatePrice(event)" /></div> <div	style="width: 16.5%; text-align: center; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input style="width: 50%;text-align: right;" type="text" name="textfield" id="lhq'
			+ rowCount
			+ '" value="" onkeypress="return validateNumbers(event)" />	</div>	<div style="width: 4%; text-align: center; height: 25px; padding-left: 1%; padding-top: 3px;"><input type="checkbox" value="" name="checkbox'
			+ rowCount + '" id="checkbox' + rowCount + '"></div></div>';

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(mm);
	mm++;
}

function setLaundryItemManagementTemp() {

	sr = 1;
	var inputs = [];
	inputs.push('action=fetchDefLoundaryItem');
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
			$("#Laundry").html(ajaxResponse);
			
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#LaudryManage").setTemplate(loundaryManagementTemp);
			$("#LaudryManage").processTemplate(pobj1);
		}
	});
}

function saveLaundryDetail() {
	var RowCount = $("#RowCount").val();
	var Response1 = $("#Laundry").html();

	ajaxRes = eval('(' + Response1 + ')');
	var z = 0;

	for ( var m = 1; m <= ajaxRes.lil.length; m++) {

		var ln = $("#ln" + m + "").val();
		var lr = $("#lr" + m + "").val();
		var lhq = $("#lhq" + m + "").val();

		ln = $.trim(ln);

		if (ln == "" && lr == "" && lhq == "") {
			flag = 1;
			SetFocus("ln" + m);
			alert("You Can Not Save Empty Fields.");

			return false;
		} else if (ln == null || ln == "") {
			flag = 1;
			alert("Enter The Laundry Item Name.");
			SetFocus("ln" + m);
			return false;
		} else if (lr == null || lr == "") {
			flag = 1;
			alert("Enter Laundry Item Charges.");
			SetFocus("lr" + m);
			return false;
		} else if (lhq == null || lhq == "") {
			flag = 1;
			alert("Enter The Hospital Item Quantity.");
			SetFocus("lhq" + m);
			return false;
		} else {

			ajaxRes.lil[z].ln = ln;
			ajaxRes.lil[z].lr = lr;
			ajaxRes.lil[z].lhq = lhq;
		}
		z++;
	}

	parsebcObj = JSON.stringify(ajaxRes);
	parsebcObj = (parsebcObj.decodeSpecialChars());

	var flag = 0;
	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var ReadStvalue = rowCount - addrowCount;

	if (rowCount == 0) {
		return false;
	} else {
		var i;
		var laundryDetailString = "";
		for (i = 1; i <= addrowCount; i++) {
			count++;

			var ln = $("#ln" + count + "").val();
			var lr = $("#lr" + count + "").val();
			var lhq = $("#lhq" + count + "").val();
			var hid = $("#hid" + count + "").val();

			ln = $.trim(ln);

			if (ln == "" && lr == "" && lhq == "") {
				flag = 1;
				alert("You Can Not Save Empty Fields.");
				SetFocus("ln" + count);
				return false;
			} else if (ln == null || ln == "") {
				flag = 1;
				alert("Enter The Laundry Item Name.");
				SetFocus("ln" + count);
				return false;
			} else if (lr == null || lr == "") {
				flag = 1;
				alert("Enter Laundry Item Charges.");
				SetFocus("lr" + count);
				return false;
			} else if (lhq == null || lhq == "") {
				flag = 1;
				alert("Enter The Hospital Item Quantity");
				SetFocus("lhq" + count);
				return false;
			} else {

				laundryDetailString = laundryDetailString + "@" + ln + "," + lr
						+ "," + lhq + "," + hid;
			}
		}

		if (flag == 0) {
			var inputs = [];
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
			inputs.push('action=saveLaundryDetail');
			inputs.push('laundryDetailString=' + (laundryDetailString));
			inputs.push('laundryobj=' + (parsebcObj));
		}
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
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function toRemoveDivLaundry(RowCount) {

	var Response1 = $("#Laundry").html();

	ajaxRes = eval('(' + Response1 + ')');
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	var k = 0;
	for ( var m = 1; m <= ajaxRes.lil.length; m++) {
		for ( var a = 0; a < allVals.length; a++) {
			if (allVals[a] == ajaxRes.lil[k].lid) {
			
				ajaxRes.lil[k].ln = 'deleteLItem';
			}
		}
		k++;
	}

	if (allVals.length != 0) {
	
		parsebcObj = JSON.stringify(ajaxRes);
		var inputs = [];
		inputs.push('action=DeleteLaundry');
		inputs.push('laundryobj=' + (parsebcObj));
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var p = 1;
	var flag = 0;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#div" + p + "").remove();
			flag = 1;
		}
		p++;
	}
	if (flag == 0) {
		alert("Please Select At Least One Record For Deletion.");
	}
}

function searchLaundryItem() {
	rowCount = 1;

	var byItemName = $("#byItemName").val();
	var searchBy;
	var value;
	if (byItemName == "") {
		alert("Please Enter Laundry Item Name");
	} else {
		searchBy = "byItemName";
		value = byItemName;
		var inputs = [];
		inputs.push('action=searchLaundryItem');
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));

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
				pobj1 = eval('(' + ajaxResponse + ')');
			
				$("#Laundry").html(ajaxResponse);
				if (pobj1.lil.length == 0) {
					alert("Laundry Item Not Found");
				} else {
					sr = 1;
					$("#LaudryManage").setTemplate(loundaryManagementTemp);
					$("#LaudryManage").processTemplate(pobj1);
				}
			}
		});
	}
};

/** ***************End Loundary Management*********************************** */


/** ****************************Start Bill Management**************************** */
var searchBillTemp = "<div style='width: 10%;'>Search By:</div><div style='width: 10%;'>Patient Name</div><div style='width: 12%; padding-left: 2%;'><input	style='width: 100%; '	name='byName' type='text' id='byName' onkeypress='return validatealphabetic(event)' /></div><div style='width: 2%; padding-left: 4%;'>or</div><div style='width: 10%; padding-left: 2%;'><span	style='width: 3%;'>Treatment ID</span></div><div style='width: 12%;'><input	style='width: 100%; '	name='byId' type='text' id='byId' onkeypress='return validateNumbers(event)' /></div><div style='width: 18%; text-align: center;'><input type='button'	value='Search'  class='edit' onclick='searchBill()' /></div>";
var defaultViewBillTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 6%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Bill ID</div><div style='width: 25%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: left;'>Patient Name</div><div style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Bill Type</div><div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Treatment ID</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Bill Date</div><div	style='width: 12%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Active</div></div></div><div style='width: 100%; height: 89%; overflow-y: scroll;'>{#foreach $T.bl as bl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 7%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div><div id='divPi' style='width: 9.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'> {$T.bl.id} </div> <div style='width: 26%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.bl.objPatient.fn} {$T.bl.objPatient.mn} {$T.bl.objPatient.ln}</div> <div id='divPi' style='width: 9.2%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'> {$T.bl.bt} </div> <div style='width: 10.9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'> {$T.bl.tid} </div> <div style='width: 16%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'> {$T.bl.bda} </div><div style='width: 12%; height: 25px;  padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='ACTIVE' id='btnActive' onClick='activeBill({$T.bl.id})' /></div></div>{#/for}</div>";

function searchBill() {
	count = 1;
	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("Please Search Either by Distributor Id OR Distributor Name!");
		SetFocus("byName");
		return false;
	} else if (byName == "" && byId == "") {
		alert("Please Enter Distrubuter Name OR Distributer Id!");
		SetFocus("byName");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('action=SearchPatientBill');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;

				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.bl.length == 0) {
					alert("Patient Not Found");
				} else {
					$("#billMangTemp").setTemplate(defaultViewBillTemp);
					$("#billMangTemp").processTemplate(pobj1);
				}
			}
		});
	}
}

function activeBill(id) {

	var r = confirm("Are You Confirm To Change Bill Status ");
	if (r == true) {
		var inputs = [];
		inputs.push('action=changeBillStatus');
		inputs.push("id=" + id);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function setSearchBillTemp() {
	var sample;
	$("#search").setTemplate(searchBillTemp);
	$("#search").processTemplate(sample);
}

function defaultViewPatientBill() {

	var inputs = [];
	inputs.push('action=fetchPatientBill');

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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#billMangTemp").setTemplate(defaultViewBillTemp);
			$("#billMangTemp").processTemplate(pobj1);
		}
	});
}

/** *****************************End Bill Management***************************** */

/** *******************Start Patient Death********** */

var containerTemplateForPatientDeath = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 99%; margin-top: 15px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Patient Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Patient ID</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Age</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Gender</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Dead</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 400px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.pl as pl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.pl.tit}{$T.pl.fn} {$T.pl.mn} {$T.pl.ln}</td>"
		+ "<td id='divPi{count}' class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.pi}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.ag}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.pl.sx}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input style='font-size: 10px;' type='button' value='DEAD' class='edit editUserAccess' id='btnDelete{count}' onClick='deadPatient({$T.pl.pi})' disabled='disabled'/>"
		+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function viewPatientInfo() {

	var inputs = [];
	inputs.push('action=fetchLivePat');

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
			// patientDocTreatment
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#container").setTemplate(containerTemplateForPatientDeath);
			$("#container").processTemplate(pobj1);
		}
	});
}

function deadPatient(patID) {
	var r = confirm("Are You Confirmed Patient Is dead?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeadPatient');
		inputs.push('patID=' + patID);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function deathPatientSearch() {

	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("Please Search Either By Patient Name OR  Patient Id!");
		SetFocus("byName");
		return false;
	} else if (byName == "" && byId == "") {
		alert("Please Enter Patient Name Or Patient Id!");
		SetFocus("byName");
		return false;
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('action=SearchDeathPat');
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));
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
				count = 1;
				ajaxResponse = r;
				pobj1 = eval('(' + ajaxResponse + ')');
			
				if (pobj1.pl.length == 0) {
					alert("Patient Details Not Found");
					$("#byName").val("");
					location.reload();
				} else {
					$("#container").setTemplate(containerTemplateForPatientDeath);
					$("#container").processTemplate(pobj1);
					$("#byName").val("");
				}
				userAccess();
			}
		});
	}
}

function setAutoSuggesionForDeathRecord(){

	var resultData = [];
	var auto = "DeathRecord";
	var findingName = $("#byName").val();
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
						$("#byName").typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#byName").data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {
		$("#byName").val(item.text);
	}
} 



/** *******************End Patient Death********** */

/** ********** Service Mgmt start ***************** */

var searchTestTemp = "<div class='col-md-1-1'>	<label for='exampleInputEmail1' class='TextFont'>Search By:</label></div><div class='col-md-1-1' style='padding-left: 0px;'>	<label for='exampleInputEmail1' class='TextFont'>Test Name</label></div><div class='col-md-3-1' class='form-group Remove-Padding col-md-12-1'>	<input id='strValue' name='strValue' style='width: 100%;'		name='strValue' type='text' maxlength='150'		class='form-control input-SmallText' /></div><div class='col-md-1-1' style='padding-left: 27px;'>	<input id='searchTest' type='button' value='Search'		class='btn btn-xs btn-primary' onclick='searchTest()' /></div>";

var defaultRadioBodyViewTemp = "<table	class='table table-bordered table-condensed cf'	style='margin-bottom: 9px;'><thead class='cf'><tr><th class='col-md-1-1 center' style='height: 21.5px;'><div>#</div></th><th class='numeric col-md-3-1 center' style='height: 21.5px;'><div>Body Part Name</div></th><th class='col-md-4-1 center' style='height: 21.5px;'><div>Investigation Group</div></th><th class='numeric col-md-2-1 center' style='height: 21.5px;'><div>Edit</div></th><th class='numeric col-md-2-1 center' style='height: 21.5px;'><div>Delete</div></th></tr></thead></table><div class='col-md-12-1' style='border:1px solid #ddd; height: 380px; max-height: auto; overflow-y: scroll;'>	<table class='table table-striped table-condensed cf'><tbody>{#foreach $T.testList as tl}<tr><td class='col-md-1 center' style='height: 21.5px;'>{count++}.</td><td class='col-md-3-1 center' style='height: 21.5px;'>{$T.tl.bpn}</td><td class='numeric col-md-4-1 center' style='height: 21.5px;'>{$T.tl.GroupName}</td><td class='numeric col-md-2-1 center' style='height: 21.5px;'><button	onclick='editBodyPart({$T.tl.bodyPart})' id='btnEdit2'	class='btn btn-xs btn-success editUserAccess'	value='EDIT' disabled='disabled'><i class='fa fa-edit'></i></button></td><td class='numeric col-md-2-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' onclick='deleteBodyPart({$T.tl.bodyPart})' id='btnDelete2'	value='DELETE' disabled='disabled'><i class='fa fa-trash-o'></i></button></td></tr>{#/for}<input id='tdCount' style='display:none;' value='{count++}'/></tbody>	</table></div>";

var editTestTemp = "<div class='col-md-12-1 center'><div class='divide-20'></div><h4>Edit Investigation Test:</h4><div class='divide-20'></div><div class='divide-20'></div><div class='divide-20'></div></div><div class='form-group Remove-Padding col-md-12-1' style='padding-top: 3%;'><div class='divide-20'></div><div class='col-md-4-1'>Test ID</div><div class='col-md-5-1 center'><input class='col-md-12-1' value='{$T.test_ID}' style='background-color:gray;' name='tid' id='tid' readonly='readonly' /></div></div><div class='form-group Remove-Padding col-md-12-1' style='padding-top: 2%;'><div class='divide-20'></div><div class='col-md-4-1'>Test Name</div><div class='col-md-5-1 center'><input class='col-md-12-1' type='text' style='width: 100%; ' name='tname' id='tname' maxlength='150' value='{$T.tname}'  /></div><div class='col-md-1-1' style='color: red; padding-left: 3%'><b>*</b></div></div><div class='form-group Remove-Padding col-md-12-1' style='width: 100%; padding-top: 2%;'><div class='divide-20'></div><div class='col-md-4-1'>Test Charges  Rs.</div><div class='col-md-5-1 center'><input class='col-md-12-1' type='text' onkeypress='return validateNumbers(event)' style='width: 100%; ' name='charges' id='charges' maxlength='6' value='{$T.charges1}'/></div><div class='col-md-1-1' style='color: red; padding-left: 3%'><b>*</b></div></div><input type='hidden' id='queryType' value='update' />";

var saveTestButtonTemp = "<button class='btn btn-xs btn-success editUserAccess'	type='button' value='Save Now'  data-toggle='tooltip' data-placement='left' title='Save Physiotherapy Test ' onclick='saveEditTest()' disabled='disabled'><i class='fa fa-save'></i> </button>";

var addTestTemp = "<div class='col-md-12-1 center'><div class='divide-20'></div><h4>Add Investigation Test:</h4><div class='divide-20'></div><div class='divide-20'></div><div class='divide-20'></div></div><div class='form-group Remove-Padding col-md-12-1' style='padding-top: 3%;'><div class='divide-20'></div><div class='col-md-4-1'>Test ID</div><div class='col-md-5-1 center'><input class='col-md-12-1' value='{$T.test_ID}' style='background-color:gray;' name='tid' id='tid' readonly='readonly' /></div></div><div class='form-group Remove-Padding col-md-12-1' style='margin-top:9px;'><div class='divide-20'></div><div class='col-md-4-1' style='margin-top:4px;'>Test Name</div><div class='col-md-5-1 center' style='margin-top:9px;'><input class='col-md-12-1' type='text' style='width: 100%; ' name='tname' id='tname' maxlength='150'  /></div><div class='col-md-1-1' style='color: red; padding-left: 3%'><b>*</b></div></div><div class='form-group Remove-Padding col-md-12-1' style='margin-top:9px; width: 100%;'><div class='divide-20'></div><div class='col-md-4-1' style='margin-top:4px;'>Test Charges  Rs.</div><div class='col-md-5-1 center' style='margin-top:9px;'><input class='col-md-12-1' type='text' onkeypress='return validateNumbers(event)' style='width: 100%; ' name='charges' id='charges' maxlength='6' /></div><div class='col-md-1-1' style='color: red; padding-left: 3%'><b>*</b></div></div><input type='hidden' id='queryType' value='insert' />";

var addTestRadioTemp = "<div class='col-md-12-1 center'><div class='divide-20'></div><h4>Add Physiotherapy Test:</h4><div class='divide-20'></div><div class='divide-20'></div></div><div class='form-group Remove-Padding col-md-12-1' style='padding-top: 3%;'><div class='divide-20'></div><div class='col-md-4-1'>Test ID</div><div class='col-md-6-1 center'><input class='col-md-12-1' value='{$T.test_ID}' name='tid' id='tid' readonly='readonly' /></div></div><div class='form-group Remove-Padding col-md-12-1' style='padding-top: 5%;'><div class='divide-20'></div><div class='col-md-4-1'>Test Name</div><div class='col-md-6-1 center'><input class='col-md-12-1' type='text' style='width: 100%; ' name='tname' id='tname' maxlength='150'  /></div><div class='col-md-1-1' style='color: red; padding-left: 3%'><b>*</b></div></div><div class='form-group Remove-Padding col-md-12-1' style='width: 100%; padding-top: 5%;'><div class='divide-20'></div><div class='col-md-4-1'>Test Charges  Rs.</div><div class='col-md-6-1 center'><input class='col-md-12-1' type='text' onkeypress='return validateNumbers(event)' style='width: 100%; ' name='charges' id='charges' maxlength='6' /></div><div class='col-md-1-1' style='color: red; padding-left: 3%'><b>*</b></div></div><input type='hidden' id='queryType' value='insert' /><div style='padding-top: 5%;' class='form-group Remove-Padding col-md-12-1'><div class='divide-20'></div><div class='col-md-4-1'>Clinic %</div><div class='col-md-6-1 center'><input type='text' maxlength='5' id='txtClinicPercent' name='txtClinicPercent' onkeypress='return validateNumPer(event)'style='width: 100%;' class='col-md-12-1'></div></div>";

var defaultTestViewTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Service ID</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Service Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 380px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.testList as tl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.tl.test_ID}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.tl.tname}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit2' onclick='editTest({$T.tl.test_ID})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete2' onclick='deleteTest({$T.tl.test_ID})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var defaultGroupViewTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Group ID</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Group Name</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.testList as tl}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.tl.test_ID}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.tl.tname}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit2' onclick='editTest({$T.tl.test_ID})' disabled='disabled'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete2' onclick='deleteTest({$T.tl.test_ID})' disabled='disabled'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

var defaultphysioTestViewTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 10px;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Test ID</div></th>"
	+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Test Name</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 380px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.testList as tl}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.tl.test_ID}</td>"
	+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.tl.tname}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit2' onclick='editTest({$T.tl.test_ID})' disabled='disabled'>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete2' onclick='deleteTest({$T.tl.test_ID})' disabled='disabled'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function deleteTest(tid) {

	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {
		var testType = $("#testType").val();

		var inputs = [];
		inputs.push('action=deleteTest');
		inputs.push("tid=" + tid);
		inputs.push('testType=' + encodeURIComponent(testType));
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

var addDentalServTemp = "<div	style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3>Add Other Service:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service ID'>Service ID</label>"
		+ "<input id='tid' name='tid' type='text' placeholder='Service ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.test_ID}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Name'>Service Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='tname' name='tname' type='text' placeholder='Service Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Charges'>Service Charges<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='charges' name='charges' type='text' onkeypress='return validateNumbers(event)' placeholder='Service Charges' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='7' /></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='clinicPercent'>Clinic %</label>"
		+ "<input id='txtClinicPercent' name='txtClinicPercent' type='text' onkeypress='return validateNumPer(event)' placeholder='Clinic %' "
		+ "class='form-control input-SmallText col-md-7-1'  style='margin-left:0%;' maxlength='5' /></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

var addCasualityServTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3>Add Casualty Service:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service ID'>Service ID</label>"
		+ "<input id='tid' name='tid' type='text' placeholder='Service ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.test_ID}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Name'>Service Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='tname' name='tname' type='text' placeholder='Service Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Charges'>Service Charges<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='charges' name='charges' type='text' onkeypress='return validateNumbers(event)' placeholder='Service Charges' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='7' /></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Clinic %'>Clinic %</label>"
		+ "<input id='txtClinicPercent' name='txtClinicPercent' type='text' onkeypress='return validateNumPer(event)' placeholder='Clinic %' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength='5' /></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

var addOtIpdServiceTemp = "<div	style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Add Instruments and Equipments:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service ID'>Service ID</label>"
		+ "<input id='tid' name='tid' type='text' placeholder='Service ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.test_ID}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Name'>Service Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='tname' name='tname' type='text' placeholder='Service Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Charges'>Service Charges<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='charges' name='charges' type='text' onkeypress='return validateNumbers(event)' placeholder='Service Charges' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='7' /></div>"
		+ "<input type='hidden' id='queryType' value='insert'></div></div>";

function setAddTestTemp(type) {

	if (type == "ipd") {
		var pageName = $("#pageName").val();
		if (pageName == "bed") {
			$("#testType").val("bed");
			document.title = 'Bed Side Procedures';
		} else if (pageName == "gas") {
			$("#testType").val("gas");
			document.title = 'Gases and Monitors';
		} else if (pageName == "instrument") {
			$("#testType").val("instrument");
			document.title = 'Instruments and Equipments';
		}
	}
	var testType = $("#testType").val();
	$("#AddTest").hide();
	var inputs = [];
	inputs.push('action=fetchTestID');
	inputs.push('testType=' + encodeURIComponent(testType));
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
			ajaxResponse = r;
			
			pobj1 = eval('(' + ajaxResponse + ')');

			if (type == "Cardio") {
				$("#SpecialDiscountContent").setTemplate(addTestTemp);
			} else if (type == "Radio") {
				$("#SpecialDiscountContent").setTemplate(addTestRadioTemp);
			} else if (type == "dental") {
				$("#SpecialDiscountContent").setTemplate(addDentalServTemp);
			} else if (type == "casuality") {
				// $("#SpecialDiscountContent").setTemplate($("#SpecialDiscountContentTemplate").html());
				$("#SpecialDiscountContent").setTemplate(addCasualityServTemp);
			} else if (type == "ipd") {
				$("#SpecialDiscountContent").setTemplate(addOtIpdServiceTemp);
			} else if (type == "RadioGroup") {
				$("#SpecialDiscountContent").setTemplate(
						$("#RadioGroupDiv").html());
			} else if (type == "RadioBody") {
				$("#SpecialDiscountContent").setTemplate(
						$("#RadioGroupDiv").html());
			}
			$("#SpecialDiscountContent").processTemplate(pobj1);
			SetFocus("tname");
			if (type == "ipd") {
				var pageName = $("#pageName").val();
				if (pageName == "bed") {
					$("#testType").val("bed");
					$("#title").html("Add Bed Side Procedures:");
					$("#nav_link").html("Bed Side Procedures");
				} else if (pageName == "gas") {
					$("#testType").val("gas");
					$("#title").html("Add Gases and Monitors:");
					$("#nav_link").html("Gases and Monitors");
				} else if (pageName == "instrument") {
					$("#testType").val("instrument");
					$("#title").html("Add Instruments and Equipments:");
					$("#nav_link").html("Instruments and Equipments");
				}
			}
		}
	});
	if ($("#testType").val() == "RadioBody")
		setSaveBodyPartButton();
	else
		setSaveTestButton();
}

function saveEditTest()
{
	var testType = $("#testType").val();
	var queryType = $("#queryType").val();
	var tname = $("#tname").val();
	tname = $.trim(tname);
	var tid = $("#tid").val();
	var charges = $("#charges").val();
	charges = $.trim(charges);
	
	var clinicPercent = $("#txtClinicPercent").val();
	
	if (tname == null || tname == "")
	{
		if (testType == "dental" || testType == "casuality"
		|| testType == "gas" || testType == "bed" || testType == "instrument") {
			alert("Please enter Service Name.");
			return false;
		} else {
			alert("Please enter Test Name.");
			$("#tname").val("");
			SetFocus("tname");
			return false;
		}
		
	} else if (charges == null || charges == "") {
		if (testType == "dental" || testType == "casuality"
				|| testType == "gas" || testType == "bed"
				|| testType == "instrument") {
			alert("Please enter Service Charges");
			return false;
		} else {
			alert("Please enter Test Charges");
		}
		SetFocus("charges");
		return false;
	}
	if(clinicPercent == "" || clinicPercent == undefined)
		{
			clinicPercent = 0;
		}
	if(clinicPercent > 100){
		alert("Clinic % can not be less than '0' and greater than '100'");
		SetFocus("txtClinicPercent");
		return false;
	}
	
	var inputs = [];
	inputs.push('action=UpdateTest');
	inputs.push('testType=' + encodeURIComponent(testType));
	inputs.push('tid=' + tid);
	inputs.push('tname=' + encodeURIComponent(tname));
	inputs.push('charges=' + charges);
	inputs.push('clinicPercent=' + clinicPercent);
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {

					ajaxResponse = r;
					alert(ajaxResponse);
					window.location.reload();
					if (ajaxResponse == "Test Name is already present in the database."
							|| ajaxResponse == "Service Name is already present in the database.") {
						SetFocus("tname");
					} else {
						defaultViewTest();
						setSearchTest();
						location.reload();
					}
					$("#queryType").val('update');
				}
			});
}

function setSaveTestButton() {
	var sampleBean = "";

	$("#SaveButtonContent").setTemplate(saveTestButtonTemp);
	$("#SaveButtonContent").processTemplate(sampleBean);
}

var editTestRadioTemp = "<div class='col-md-12-1 center'><div class='divide-20'></div><h4>Edit Physiotherapy Test:</h4><div class='divide-20'></div><div class='divide-20'></div></div><div class='form-group Remove-Padding col-md-12-1' style='padding-top: 3%;'><div class='divide-20'></div><div class='col-md-4-1'>Test ID</div><div class='col-md-6-1 center'><input class='col-md-12-1' value='{$T.test_ID}' name='tid' id='tid' readonly='readonly' /></div></div><div class='form-group Remove-Padding col-md-12-1' style='padding-top: 5%;'><div class='divide-20'></div><div class='col-md-4-1'>Test Name</div><div class='col-md-6-1 center'><input class='col-md-12-1' type='text' style='width: 100%; ' name='tname' id='tname' maxlength='150' value='{$T.tname}' /></div><div class='col-md-1-1' style='color: red; padding-left: 3%'><b>*</b></div></div><div class='form-group Remove-Padding col-md-12-1' style='width: 100%; padding-top: 5%;'><div class='divide-20'></div><div class='col-md-4-1'>Test Charges  Rs.</div><div class='col-md-6-1 center'><input class='col-md-12-1' type='text' onkeypress='return validateNumbers(event)' style='width: 100%;' name='charges' id='charges' maxlength='6' value='{$T.charges1}' /></div><div class='col-md-1-1' style='color: red; padding-left: 3%'><b>*</b></div></div><input type='hidden' id='queryType' value='update' /> <div style='width: 100%; padding-top: 5%;' class='form-group Remove-Padding col-md-12-1'><div class='divide-20'></div><div class='col-md-4-1'> Clinic %</div><div class='col-md-6-1 center'><input type='text' maxlength='5' id='txtClinicPercent' name='txtClinicPercent' style='width: 100%;' onkeypress='return validateNumPer(event)' class='col-md-12-1' value='{$T.clinicPercent}'></div></div>";

var editDentalServTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3>Edit Other Service:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service ID'>Service ID</label>"
		+ "<input id='tid' name='tid' type='text' placeholder='Service ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.test_ID}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Name'>Service Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='tname' name='tname' type='text' onkeypress='return validatealphabetic(event)' placeholder='Service Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' value='{$T.tname}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Charges'>Service Charges<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='charges' name='charges' type='text' onkeypress='return validateNumbers(event)' placeholder='Service Charges' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='7'  value='{$T.charges1}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Clinic %'>Clinic %</label>"
		+ "<input id='txtClinicPercent' name='txtClinicPercent' type='text' onkeypress='return validateNumPer(event)' placeholder='Clinic %' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength='5'  value='{$T.clinicPercent}'/></div>"
		+ "<input type='hidden' id='queryType' value='update'></div></div>";

var editCasualityServTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3>Edit Casualty Service:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service ID'>Service ID</label>"
		+ "<input id='tid' name='tid' type='text' placeholder='Service ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.test_ID}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Name'>Service Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='tname' name='tname' type='text' onkeypress='return validatealphabetic(event)' placeholder='Service Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' value='{$T.tname}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Charges'>Service Charges<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='charges' name='charges' type='text' onkeypress='return validateNumbers(event)' placeholder='Service Charges' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='7'  value='{$T.charges1}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Clinic %'>Clinic %</label>"
		+ "<input id='txtClinicPercent' name='txtClinicPercent' type='text' onkeypress='return validateNumPer(event)'  "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:0%;' maxlength='5'  value='{$T.clinicPercent}'/></div>"
		+ "<input type='hidden' id='queryType' value='update'></div></div>";

var editOtIpdServiceTemp = "<div style='height: 100%; border: 1px solid #ddd;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3 id='title'>Edit Instruments and Equipments:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service ID'>Service ID</label>"
		+ "<input id='tid' name='tid' type='text' placeholder='Service ID' style='background-color: #ddd;'"
		+ "class='form-control input-SmallText col-md-7-1' readonly='readonly' style='margin-left:0%;' value='{$T.test_ID}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Name'>Service Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='tname' name='tname' type='text'  placeholder='Service Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='150' value='{$T.tname}'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Service Charges'>Service Charges<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='charges' name='charges' type='text' onkeypress='return validateNumbers(event)' placeholder='Service Charges' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' maxlength='7'  value='{$T.charges1}'/></div>"
		+ "<input type='hidden' id='queryType' value='update'></div></div>";

function editTest(testId) {
	$("#AddTest").hide();
	var type = $("#testType").val();
	// $("#SearchContent").html("");
	var ajaxResponse = $("#testDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.testList.length; i++) {

		if (myArray.testList[i].test_ID == testId) {
			var myObj1 = myArray.testList[i];
			break;
		}
	}

	var pageName = $("#pageName").val();

	if (type == "Cardiology") {
		$("#SpecialDiscountContent").setTemplate(editTestTemp);
		$("#SpecialDiscountContent").processTemplate(myObj1);
	} else if (type == "Radiology") {
		$("#SpecialDiscountContent").setTemplate(editTestRadioTemp);
		$("#SpecialDiscountContent").processTemplate(myObj1);
	} else if (type == "dental") {
		$("#SpecialDiscountContent").setTemplate(editDentalServTemp);
		$("#SpecialDiscountContent").processTemplate(myObj1);
	} else if (type == "casuality") {
		$("#SpecialDiscountContent").setTemplate(editCasualityServTemp);
		$("#SpecialDiscountContent").processTemplate(myObj1);
	} else if (type == "bed" || type == "gas" || type == "instrument") {
		$("#SpecialDiscountContent").setTemplate(editOtIpdServiceTemp);
		$("#SpecialDiscountContent").processTemplate(myObj1);
	} else if (type == "RadioGroup") {
		$("#testHead").html("Edit Investigation Group");
		$("#queryType").val("update");
		$("#tid").val(myObj1.test_ID);
		$("#tname").val(myObj1.tname);
		$("#AddTest").show();
	}

	$("#divSpSpDisHide").html(ajaxResponse);
	setSaveTestButton();
	SetFocus("tname");

	if (pageName == "bed") {
		$("#testType").val("bed");
		$("#title").html("Edit Bed Side Procedures:");
	} else if (pageName == "gas") {
		$("#testType").val("gas");
		$("#title").html("Edit Gases and Monitors:");
	} else if (pageName == "instrument") {
		$("#testType").val("instrument");
		$("#title").html("Edit Instruments and Equipments:");
	}
	setTimeout(function(){userAccess();},100);
}

function setSearchTest() {
	var sampleBean;
	$("#SearchContent").setTemplate(searchTestTemp);
	$("#SearchContent").processTemplate(sampleBean);
}

function searchTest() {
	count = 1;
	var testType = $("#testType").val();
	
	var strValue = $("#byName").val();
	if (strValue == "") {
		if(testType == "RadioGroup")
		{
			alert("Please Enter Group Name First.");
		} else if(testType == "RadioBody"){
			alert("Please Enter Body Part Name First.");
		} else if(testType == "bed" || testType == "gas" || testType == "instrument"){
			alert("Please Enter Service Name.");
		} else{
			alert("Please Enter Test Name.");
		}
		SetFocus("byName");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchTest');
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('testType=' + encodeURIComponent(testType));
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

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.testList.length == 0) {
				if (testType == "casuality") {
					alert("Casualty Service Name Not Found");
					$("#byName").val("");
				} else if (testType == "dental") {
					alert("Other Service Name Not Found");
					$("#byName").val("");
				} else if (testType == "RadioBody") {
					alert("Body Part Name Not Found");
					$("#byName").val("");
				} else if (testType == "RadioGroup") {
					alert("Group Name Not Found");
					$("#byName").val("");
				} else if (testType == "bed") {
					alert("Bed Side Procedure Name Not Found");
					$("#byName").val("");
				} else if (testType == "gas") {
					alert("Gases And Monitors Service Name Not Found");
					$("#byName").val("");
				} else if (testType == "instrument") {
					alert("Instrument/Equipment Service Name Not Found");
					$("#byName").val("");
				} else{
					alert("Test Not Found");
					SetFocus("byName");
				}
				$("#byName").val();
				
			} else {

				if (testType == "dental") {
					$("#TestContent").setTemplate(defaultSreviceViewTemp);
				} else if (testType == "casuality") {
					$("#TestContent").setTemplate(defaultSreviceViewTemp);
				} else if (testType == "RadioBody") {
					$("#TestContent").setTemplate(defaultRadioBodyViewTemp);
				} else if (testType == "Radiology") {
					$("#TestContent").setTemplate(defaultphysioTestViewTemp);
				}else {
					$("#TestContent").setTemplate(defaultTestViewTemp);
				}
				$("#byName").val("");
				$("#TestContent").processTemplate(pobj1);
				setTimeout(function(){userAccess();},100);
			}
		}
	});
}

var defaultSreviceViewTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 710px; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Service ID</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Service Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 425px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.testList as tl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.tl.test_ID}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.tl.tname}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit2' onclick='editTest({$T.tl.test_ID})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete2' onclick='deleteTest({$T.tl.test_ID})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewTest(search) {
	count = 1;
	// $("#SaveButtonContent").html("");
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if (searhFlag == "search") {
		if (searchText == "") {
			alert("Please Enter Test Name !");
			setFocus("#byName");
		}
	}
	var testType = $("#testType").val();

	var inputs = [];
	inputs.push('action=fetchTest');
	inputs.push('testType=' + encodeURIComponent(testType));
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
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
		success : function(res) {
			var ajaxResponse = res;
			$("#testDetails").html(ajaxResponse);
			var testObj = eval('(' + ajaxResponse + ')');

			if (testType == "dental") {
				$("#TestContent").setTemplate(defaultSreviceViewTemp);
			} else if (testType == "casuality") {
				$("#TestContent").setTemplate(defaultSreviceViewTemp);
			} else if (testType == "RadioBody") {
				$("#TestContent").setTemplate(defaultRadioBodyViewTemp);
			} else if (testType == "Radiology") {
				$("#TestContent").setTemplate(defaultphysioTestViewTemp);
			} else if (testType == "RadioGroup") {
				$("#TestContent").setTemplate(defaultGroupViewTemp);
			} else {
				$("#TestContent").setTemplate(defaultTestViewTemp);
			}
			$("#TestContent").processTemplate(testObj);
			setTimeout(function(){userAccess();},100);
		}
	});
}

/** ********** Service Mgmt end ***************** */

/** ********** Employee Form start ***************** */

function setEmployeeDetails() {

	var inputs = [];
	inputs.push('action=fetEmpDet');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {

			var myObj1 = eval('(' + r + ')');

			$("#fullName").val(myObj1.dl[0].dn);
			$("#uType").val(myObj1.dl[0].dt);
			$("#aplLeaves").val(myObj1.dl[0].aplLeaves);
			// $("#userID").val(myObj1.dl[0].ui);
			$("#balLeaves").val(myObj1.dl[0].balLeaves);
			// $("#joinDate").val(myObj1.dl[0].doj);
		}
	});
	fetchLeavesEmp('LeaveManagement');
}

/** ********** Employee Form end ***************** */
function saveDiscountDetail() {
	// pathologyTestSearch.bluer();
	var selDisRefType = $("#selDisRefType").val();

	if (selDisRefType == "operation") {
		saveGrpCatWiseProCharge();
	} else if (selDisRefType == "hosacc") {
		saveHospitalAcc();
	} else if (selDisRefType == "Radiology" || selDisRefType == "Cardiology"
			|| selDisRefType == "dental" || selDisRefType == "casuality"
			|| selDisRefType == "ipdserv" || selDisRefType == "pathology"
			|| selDisRefType == "pathologyPkg") {
		saveToDisc();
	} else if (selDisRefType == "fees") {
		
		saveDoctorSpeciality($("#txtSpecialityCount").val());
	} else if (selDisRefType == "hallwisipd") {
		saveHallAccountTypeDetails();
	} else if (selDisRefType == "bedcharges") {
		saveBedCharges();
	} 
}

function setDiscountResTemp(type) {
	
	var queryType = $("#queryTypeMain").val();
	if (queryType == "insert") {

		var selDisRefType = $("#selDisRefType").val();

		if (selDisRefType == "operation") {
			count = 1;
			var opObject = $("#divForOpObj").html();

			opObject = eval('(' + opObject + ')');
			$("#divInside").setTemplate(divInside1Temp);
			$("#divInside").processTemplate(opObject);

		} else if (selDisRefType == "Radiology"
				|| selDisRefType == "Cardiology") {
			count = 1;

			var inputs = [];
			inputs.push('action=fetchTest');
			inputs.push('testType=' + encodeURIComponent(selDisRefType));
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
					$("#testDetails").html(ajaxResponse);
					pobj1 = eval('(' + ajaxResponse + ')');
					$("#divInside").setTemplate(divTestTemp);
					$("#divInside").processTemplate(pobj1);
					$("#divForTestObj").html(ajaxResponse);
				}
			});

		} else if (selDisRefType == "fees") {
			$("#divInside").hide();
			count = 1;
			var inputs = [];
			inputs.push('action=fetchDoctorSpeciality');
			inputs.push('corporateAcId=' + $("#sid").val());
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
				success : function(ajaxResponse) {

					feeBean = eval('(' + ajaxResponse + ')');
					
					$("#divInside").setTemplate(divFeeTemp);
					$("#divInside").processTemplate(feeBean);
					$("#wdSSCons").val(feeBean.liDocSpl[0].wdCon);
					$("#wdSCons").val(feeBean.liDocSpl[1].wdCon);
					$("#wdSSFollowup").val(feeBean.liDocSpl[0].wdFl);
					$("#wdSFollowup").val(feeBean.liDocSpl[1].wdFl);
					$("#weSSCons").val(feeBean.liDocSpl[0].weCon);
					$("#weSCons").val(feeBean.liDocSpl[1].weCon);
					$("#weSSFollowup").val(feeBean.liDocSpl[0].weFl);
					$("#weSFollowup").val(feeBean.liDocSpl[1].weFl);
					$("#divForFeesObj").html(ajaxResponse);
					$("#divInside").show();
				}
			});
		}
	} else if (queryType == "update") {
		$("#divPathologyHeadings").hide();
		var selDisRefType = $("#selDisRefType").val();
		if(selDisRefType=="select"){
			$("#divInside").html("");
			return false;
		}
		if (selDisRefType == "operation") {
			$("#divInside").setTemplate($("#divOperationAc").html());
			$("#divInside").processTemplate();
			getHallTypeGrpWisProCharge();

		} else if (selDisRefType == "hallwisipd") {

			$("#divInside").setTemplate($("#divHallIPDCharges").html());
			$("#divInside").processTemplate();

			loadHallType('acc');
			defaultViewHallType();
		} else if (selDisRefType == "Radiology"
				|| selDisRefType == "Cardiology" || selDisRefType == "dental"
				|| selDisRefType == "casuality" || selDisRefType == "ipdserv"
				|| selDisRefType == "pathologyPkg") {
			
			
			var txtBxTestName= $("#txtBxTestName").val();
			if(txtBxTestName ==" ")
				{
				alert("Please Insert Test Name For Search.");
				}else
			{
			count = 1;
			var inputs = [];
			inputs.push('action=loadTestForUpdate');
			inputs.push('type=' + type);
			inputs.push('txtBxTestName=' + txtBxTestName );
			inputs.push('sp_dic_master_id=' + $("#sid").val());
			inputs.push('testType=' + encodeURIComponent(selDisRefType));
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
					$("#divInside").setTemplate(divTestTemp);
					$("#divInside").processTemplate(TestBean);
					$("#divForTestObj").html(ajaxResponse);
				}
			});
			}
		} else if (selDisRefType == "pathology") {
			if (type == "searchTest") {
				$("#divPathologyHeadings").show();
				loadPathalogyTestsHeadingWise('searchTest');
			} else {
				$("#divInside").html('');
				$("#divPathologyHeadings").show();
				var inputs = [];
				inputs.push('action=getGroups');
				inputs.push('strValue=null');
				inputs.push('type=onload');
				inputs.push('heading_id=0');
				var str = inputs.join('&');

				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "PathologyServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						ajaxResponse = r;
						count = 1;
						
						pobj1 = eval('(' + ajaxResponse + ')');
						// divPathologyHeadings
						$("#divPathologyHeadings").setTemplate(pathalogyHeadingTemplate);
						$("#divPathologyHeadings").processTemplate(pobj1);
						$("#divInside").show();
					}
				});
			}
		} else if (selDisRefType == "fees") {
			count = 1;
			var inputs = [];
			inputs.push('action=fetchDoctorSpeciality');
			inputs.push('corporateAcId=' + $("#sid").val());
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
				success : function(ajaxResponse) {
					alert(ajaxResponse);
					feeBean = eval('(' + ajaxResponse + ')');
					$("#divInside").setTemplate(divFeeTemp);
					$("#divInside").processTemplate(feeBean);
					// $("#wdSSCons").val(feeBean.liDocSpl[0].wdCon);
					// $("#wdSCons").val(feeBean.liDocSpl[1].wdCon);
					// $("#wdSSFollowup").val(feeBean.liDocSpl[0].wdFl);
					// $("#wdSFollowup").val(feeBean.liDocSpl[1].wdFl);
					// $("#weSSCons").val(feeBean.liDocSpl[0].weCon);
					// $("#weSCons").val(feeBean.liDocSpl[1].weCon);
					// $("#weSSFollowup").val(feeBean.liDocSpl[0].weFl);
					// $("#weSFollowup").val(feeBean.liDocSpl[1].weFl);
					$("#divForFeesObj").html(ajaxResponse);
					$("#divForFeesObj").html(ajaxResponse);
				}
			});
			// var sampleBean;
			// $("#SaveButtonContent").setTemplate(saveButtonTemp);
			// $("#SaveButtonContent").processTemplate(sampleBean);

		} else if (selDisRefType == "hosacc") {

			$("#divInside").setTemplate($("#divHospitalAcc").html());
			$("#divInside").processTemplate();
			fetchHospitalDetails();
			setTimeout(function() {
				fetchHospitalAccDetails();
			}, 500);
		} else if (selDisRefType == "bedcharges") {
			fetchBedCharges("acc");
		}
	}
}

var pathalogyHeadingTemplate = "<div class='divide-10'></div><div class='divide-20'></div> <label class='TextFont col-md-9-1'>Select Heading <b style='color: red; padding-left: 5%'>*</b> </label> <select id='selHeading'  onchange='loadPathalogyTestsHeadingWise()' class='form-control input-SmallText TextFont'> <option value='select'>SELECT</option> {#foreach $T.lbHedLi as lbHedLi} <option value='{$T.lbHedLi.idHed}'>{$T.lbHedLi.hcod} - {$T.lbHedLi.hedNm}</option> {#/for} </select>";
function loadPathalogyTestsHeadingWise(type) {
	var selDisRefType = $("#selDisRefType").val();
	var heading = $("#selHeading").val();

	count = 1;
	var inputs = [];
	inputs.push('action=loadTestForUpdate');
	inputs.push('type=' + type);
	inputs.push('txtBxTestName=' + $("#txtBxTestName").val());
	inputs.push('sp_dic_master_id=' + $("#sid").val());
	inputs.push('testType=' + encodeURIComponent(selDisRefType));
	inputs.push('heading=' + heading);
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
			$("#divInside").setTemplate(divTestTemp);
			$("#divInside").processTemplate(TestBean);
			$("#divForTestObj").html(ajaxResponse);
		}
	});
}

function saveHospitalAcc() {
	
	var sid = $("#sid").val();
	var txtRegCh = $("#txtRegCh").val();

	var txtAppoStrtTime = $("#txtAppoStrtTime").val();
	var txtAppoEndTime = $("#txtAppoEndTime").val();

	var txtAppoDure = $("#txtAppoDure").val();
	var txtSerTax = $("#txtSerTax").val();

	var txtDoctorRoundTime1 = $("#DocRdFrmTime").val();
	var txtDoctorRoundTime2 = $("#DocRdToTime").val();

	var txtBlDayFrmTime = $("#txtBlDayFrmTime").val();
	var txtBlDayToTime = $("#txtBlDayToTime").val();

	// var DocRdFrmTime = $("#DocRdFrmTime").val();
	// var DocRdToTime = $("#DocRdToTime").val();
	var txtAnestChar = $("#txtAnestChar").val();

	// var txtEmrChr = $("#txtEmrChr").val();
	var txtEmrChr = 0;
	var txtInfChr = $("#txtInfChr").val();
	var txtMLCChr = $("#txtMLCChr").val();
	var txtSurInstruCharges = $("#txtSurInstruCharges").val();

	var OTFrmTime = $("#OTFrmTime").val();
	var OTToTime = $("#OTToTime").val();

	var OpEmerFrmTime = $("#OpEmerFrmTime").val();
	var OpEmerToTime = $("#OpEmerToTime").val();

	var txtDocFollowUpDays = $("#txtDocFollowUpDays").val();
	var txtRegFollowUpDays = $("#txtRegFollowUpDays").val();
	
	if (txtDoctorRoundTime1 == "00:00:00") {
		alert("Please Enter Doctor Round from Time.");
		// SetFocus("txtDoctorRoundTime1");
		return false;
	} else if (txtDoctorRoundTime2 == "00:00:00") {
		alert("Please Enter Doctor Round TO Time.");
		// SetFocus("txtDoctorRoundTime2");
		return false;
	}
	else if (txtAppoStrtTime == null) {
		alert("Please Enter Appointment Start from Time.");
		SetFocus("txtAppoStrtTime");
		return false;
	}
	else if (txtAppoEndTime == null) {
		alert("Please Enter Appointment End To Time.");
		SetFocus("txtAppoEndTime");
		return false;
	}if (txtAppoEndTime < txtAppoStrtTime || txtAppoEndTime == txtAppoStrtTime ) {
		alert("Please Enter Appointment End To Time. It Must Be Greater Than Appointment Start From Time .");
		SetFocus("txtAppoEndTime");
		return false;
	} 
	else if (OTFrmTime == "00:00:00") {
		alert("Please Enter OT From Time.");
		SetFocus("OTFrmTime");
		return false;
	} else if (OTToTime == "00:00:00") {
		alert("Please Enter OT To Time");
		SetFocus("OTToTime");
		return false;
	} else if (txtSerTax == "") {
		alert("Please Enter Service Tax");
		SetFocus("txtSerTax");
		return false;
	} else if (OpEmerFrmTime == null  ) {
		alert("Please Enter Emergency From Time.");
		SetFocus("OpEmerFrmTime");
		return false;

	}if ( OpEmerToTime == null || OpEmerToTime == null || OpEmerToTime == OpEmerFrmTime) {
		alert("Please Enter Emergency To Time.");
		SetFocus("OpEmerToTime");
		return false;
	
	} else if (txtDocFollowUpDays == "") {
		alert("Please Enter Doctor Follow up Days");
		SetFocus("txtDocFollowUpDays");
		return false;

	} else if (txtRegFollowUpDays == "") {
		alert("Please Enter Registration Follow up Days.");
		SetFocus("txtRegFollowUpDays");
		return false;
	}

	var OTstartTime = OTFrmTime.split(":");
	var OTendTime = OTToTime.split(":");

	if (OTstartTime[0] >= OTendTime[0]) {

		alert("OT Start Time Must Be Greater Than OT End Time.");
		return false;
	}

	var startTime = txtAppoStrtTime.split(":");
	var endTime = txtAppoEndTime.split(":");

	var txtBedRiddenCharges = $("#txtBedRiddenCharges").val();
	var txtServoCharges = $("#txtServoCharges").val();

	var surChrtwoHrs = $("#surChrtwoHrs").val();
	var surChrFourHrs = $("#surChrFourHrs").val();
	var surChrBeyondFourHrs = $("#surChrBeyondFourHrs").val();

	var txtIPDFee = $("#txtIPDFee").val();
	
	var txtOTcharge = $("#txtOTcharge").val();
	var txtOT = $("#txtOT").val();
	var txtOTEmerchrg = $("#txtOTEmerchrg").val();

	var txtPreanechrg = $("#txtPreanechrg").val();
	var txtTPAChr = $("#txtTPAChr").val();
	// var hiddenHosId = $("#hiddenHosId").val();
	var txtOpEmrcharge = $("#txtOpEmrcharge").val();
	var docRCART = $("#docRCART").val();
	var aneStandby = $("#aneStandby").val();
	var aneAsa = $("#aneAsa").val();
	var aneNormal = $("#aneNormal").val();
	var txtAsstSurCharges = $("#txtAsstSurCharges").val();
	var txtChrgType = $("#txtChrgType").val();
	var txtadminChrg = $("#txtadminChrg").val();
	var txtEmrAdmChrg = $("#txtEmrAdmChrg").val();
	var SelEAFrmTime = $("#SelEAFrmTime").val();
	var SelEAToTime = $("#SelEAToTime").val();
	
	if (txtChrgType == "") {
		alert("Please Enter Administrative Type.");
		SetFocus("txtChrgType");
		return false;

	}else if (txtadminChrg == "") {
		alert("Please Enter Administrative Charges");
		SetFocus("txtadminChrg");
		return false;

	}else if (txtChrgType == "percentage" && txtadminChrg.length > 2) {
		alert("Please Enter Administrative Charges(%) in Two Digit Only ");
		SetFocus("txtadminChrg");
		return false;

	}else if (txtChrgType == "rupee" && txtadminChrg == ""){
		alert("Please Enter Administrative Charges in Rupee(INR)");
		SetFocus("txtadminChrg");
		return false;
	}
	
	var queryType = 'insert';
	var inputs = [];
	inputs.push('action=saveHospitalDetails');
	inputs.push('queryType=' + queryType);
	inputs.push('txtSid=' + sid);
	inputs.push('txtRegCh=' + encodeURIComponent(txtRegCh));
	inputs.push('txtAppoStrtTime=' + encodeURIComponent(txtAppoStrtTime));
	inputs.push('txtAppoEndTime=' + encodeURIComponent(txtAppoEndTime));
	inputs.push('txtAppoDure=' + encodeURIComponent(txtAppoDure));
	inputs.push('txtSerTax=' + encodeURIComponent(txtSerTax));
	inputs.push('txtBlDayFrmTime=' + encodeURIComponent(txtBlDayFrmTime));
	inputs.push('txtBlDayToTime=' + encodeURIComponent(txtBlDayToTime));
	inputs.push('txtAppoStrtTime=' + encodeURIComponent(txtAppoStrtTime));
	inputs.push('txtAppoStrtTime=' + encodeURIComponent(txtAppoStrtTime));
	inputs.push('OTFrmTime=' + encodeURIComponent(OTFrmTime));
	inputs.push('OTToTime=' + encodeURIComponent(OTToTime));
	inputs.push('txtDoctorRoundTime1='
			+ encodeURIComponent(txtDoctorRoundTime1));
	inputs.push('txtDoctorRoundTime2='
			+ encodeURIComponent(txtDoctorRoundTime2));

	// inputs.push('txtBlDayFrmTime=' + encodeURIComponent(txtBlDayFrmTime));
	// inputs.push('txtBlDayToTime=' + encodeURIComponent(txtBlDayToTime));

	inputs.push('txtAnestChar=' + encodeURIComponent(txtAnestChar));
	inputs.push('txtEmrChr=' + encodeURIComponent(txtEmrChr));
	inputs.push('txtMLCChr=' + encodeURIComponent(txtMLCChr));
	inputs.push('txtSurInstruCharges='
			+ encodeURIComponent(txtSurInstruCharges));
	inputs.push('txtInfChr=' + encodeURIComponent(txtInfChr));
	inputs.push('txtBedRiddenCharges='
			+ encodeURIComponent(txtBedRiddenCharges));
	inputs.push('txtServoCharges=' + encodeURIComponent(txtServoCharges));
	inputs.push('synchronizeToken='
			+ encodeURIComponent($("#synchronizeToken").val()));
	inputs.push('surChrtwoHrs=' + encodeURIComponent(surChrtwoHrs));
	inputs.push('surChrFourHrs=' + encodeURIComponent(surChrFourHrs));
	inputs.push('surChrBeyondFourHrs='
			+ encodeURIComponent(surChrBeyondFourHrs));
	inputs.push('opdDepartmentObj=' + "null");
	inputs.push('opdSplzObj=' + "null");
	inputs.push('idhos=' + "");

	inputs.push('txtIPDFee=' + encodeURIComponent(txtIPDFee));
	inputs.push('txtadminChrg=' + encodeURIComponent(txtadminChrg));
	inputs.push('txtChrgType=' + encodeURIComponent(txtChrgType));
	inputs.push('txtOTcharge=' + encodeURIComponent(txtOTcharge));
	inputs.push('txtOT=' + encodeURIComponent(txtOT));
	inputs.push('txtOTEmerchrg=' + encodeURIComponent(txtOTEmerchrg));

	inputs.push('txtPreanechrg=' + encodeURIComponent(txtPreanechrg));
	inputs.push('txtTPAChr=' + encodeURIComponent(txtTPAChr));
	inputs.push('txtOpEmrcharge=' + encodeURIComponent(txtOpEmrcharge));
	inputs.push('docRCART=' + encodeURIComponent(docRCART));
	inputs.push('aneStandby=' + encodeURIComponent(aneStandby));
	inputs.push('aneAsa=' + encodeURIComponent(aneAsa));
	inputs.push('aneNormal=' + encodeURIComponent(aneNormal));

	inputs.push('OpEmerFrmTime=' + OpEmerFrmTime);
	inputs.push('OpEmerToTime=' + OpEmerToTime);
	inputs.push('txtDocFollowUpDays=' + txtDocFollowUpDays);
	inputs.push('txtRegFollowUpDays=' + txtRegFollowUpDays);
	inputs.push('txtAsstSurCharges=' + txtAsstSurCharges);
	inputs.push('txtEmrAdmChrg=' + txtEmrAdmChrg);
	inputs.push('SelEAFrmTime=' + SelEAFrmTime);
	inputs.push('SelEAToTime=' + SelEAToTime);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			alert(r);
			// location.reload();
		}
	});
}

/** *********** Operation Management Temp ****************** */

// Abhijit Radke
var countForOp = 1;
var defaultViewOperationTemp = "<div class='col-sm-12-1' style='margin-top:-13px; overflow-y: scroll; height: 420px; border:1px solid #ddd; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody class='cf'>"
		+ "{#foreach $T.ol as ol}"
		+ "<tr>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>{countForOp++}.</td>"
		+ "<td class='col-md-1-1 center' id='divPi{countForOp}' style='height: 21.5px;'>{$T.ol.oi}</td>"
		+ "<td class='col-md-4-1' id='oname{countForOp}' style='height: 21.5px;'>{$T.ol.on}</td>"
		+ "<td class='col-md-1-1 center' id='charge{countForOp}' style='height: 21.5px;'>{$T.ol.oc}</td>"
		+ "<td class='col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button value='EDIT' class='btn btn-xs btn-success' id='btnEdit{countForOp}' onclick='editOperation({$T.ol.oi})'>" 
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button value='DELETE' class='btn btn-xs btn-success' id='btnDelete{countForOp}' onclick='deleteOperation({$T.ol.oi})'>" 
		+ "<i class='fa fa-trash-o'></i></button></td>"
		+ "</tr>{#/for}</tbody></table>" + "</div>";

var addOperationTemp = "<div class='col-md-12-1' style='height: 450px; border: 1px solid #ddd; padding-left: 10% margin-top:15px;'>" +
"<div class='divide-20'></div>" +
"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Add Operation</h3></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure ID:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='oid' name='oid' readonly='readonly' class='col-md-10-1 form-control input-SmallText' />" +
"</div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure Type:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='opType' name='opType' class='col-md-10-1 form-control input-SmallText' ></select>" +
"<b	style='color: red;'>*</b></div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure Name:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='oname' name='oname' class='col-md-10-1 form-control input-SmallText' />" +
"<b	style='color: red;'>*</b></div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure Group:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='opstate' name='opstate' class='col-md-10-1 form-control input-SmallText' ></select>" +
"<b	style='color: red;'>*</b></div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure Category:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='opgrade' name='opgrade' class='col-md-10-1 form-control input-SmallText'  >" +
"</select>" +
"<b	style='color: red;'>*</b></div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Type:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='risk' name='risk' class='col-md-10-1 form-control input-SmallText' >" +
"<option value='select'>Select</option><option value='bilateral'>Bilateral</option><option value='unilateral'>Unilateral</option></select>" +
"</div></div>" 
+"<div class='col-md-12-1' style='padding-top: 5%;'>"
+"<div class='col-md-4-1' style='padding-top: 2.9%;padding-left: 10%;'>Cathlab:</div>"
+"<div class='col-md-8-1' style='padding-top: 4.0%; padding-bottom:4%'>"
+"<input type='checkbox' name='radios' id='chkcath' value='chkcath'>"
+ "</div></div>" 
/*"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Total Charges:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='tCharge' name='tCharge' value='0' class='col-md-10-1 form-control input-SmallText' />" +
"</div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Hallwise charges:</div>" +
"<div class='col-md-8-1' style='padding-top: 1%; padding-bottom:1%'>" +
"<input type='checkbox' id='iFlag' onclick='showBTN()' data-toggle='modal' data-target='#Operation_Managment_Popup' name='checkBox' value='1' class='col-md-2-1 form-control input-SmallText' />" +
"</div></div>" +*/
+"<input type='hidden' id='queryType' value='insert'> " +
"</div>";

var editOperationTemp = "<div class='col-md-12-1' style='height: 450px; border: 1px solid #ddd; padding-left: 10% margin-top:15px;'>" +
"<div class='divide-20'></div>" +
"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Edit Operation</h3></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure ID:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='oid' name='oid' value='{$T.oi}' readonly='readonly' class='col-md-10-1 form-control input-SmallText' />" +
"</div></div>" +

"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure Type:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='opType' name='opType' class='col-md-10-1 form-control input-SmallText' ></select>" +
"<b	style='color: red;'>*</b></div></div>" +

"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure Name:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='oname' name='oname' value='{$T.on}' class='col-md-10-1 form-control input-SmallText' />" +
"<b	style='color: red;'>*</b></div></div>" +

"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure Group:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='opstate' name='opstate' class='col-md-10-1 form-control input-SmallText' ></select>" +
"<b	style='color: red;'>*</b></div></div>" +

"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Procedure Category:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='opgrade' name='opgrade' class='col-md-10-1 form-control input-SmallText'   >" +
"</select>" +
"<b	style='color: red;'>*</b></div></div>" +

"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Type:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='risk' name='risk' class='col-md-10-1 form-control input-SmallText' >" +
"<option value='select'>Select</option><option value='bilateral'>Bilateral</option><option value='unilateral'>Unilateral</option></select>" +
"</div></div>" 
 +"<div class='col-md-12-1' style='padding-top: 5%;'>"
+"<div class='col-md-4-1' style='padding-top: 2.9%;padding-left: 10%;'>Cathlab:</div>"
+"<div class='col-md-8-1' style='padding-top: 4.0%; padding-bottom:4%'>"
+ "{#if $T.cathlab == 'Y'}"
+"<input type='checkbox' name='chkcath' id='chkcath'  checked>"
+"{#/if}"
+ "{#if $T.cathlab !='Y'}"
+"<input type='checkbox' name='chkcath' id='chkcath'>"
+"{#/if}"
+ "</div></div>"
/*"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Total Charges:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='tCharge' name='tCharge' value='{$T.oc}' class='col-md-10-1 form-control input-SmallText' />" +
"</div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;' id='DivHWC'>Hallwise charges:</div>" +
"<div class='col-md-8-1' style='padding-top: 1%; padding-bottom:1%'>" +
"<input type='checkbox' id='iFlag' onclick='showBTN()' data-toggle='modal' data-target='#Operation_Managment_Popup' name='checkBox' value='1' class='col-md-2-1 form-control input-SmallText' />" +
"<button style='display: none;' class='btn btn-xs btn-success' onclick='showBTNEdit()' id='BtnValue' value='editbtn'>Edit HW Charges</button>" +
"</div></div>" +*/
+"<input type='hidden' id='queryType' value='update'> " +
"<input type='hidden' id='updateType' value='UpdateOperationOnly'> " +
"</div>";

function fetchHallwiseChargesForOperation()
{
	var inputs = [];
	var Type= "onload";
	inputs.push('action=fetchHallwiseChargesForOperation');
	inputs.push('Type=' + Type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {
		    ajaxResponse = r;
			$("#hallwiseChargesDetailDiv").html(ajaxResponse);
			// window.location = "OperationManagement.jsp";
			// location.reload();
		}
	});
}
function showBTNEdit()
{
	var value = $("#iFlag").val();
    var BtnValue = $("#BtnValue").val();
	if(value == "1" && BtnValue == "editbtn")
		{
		var type = "UpdateOperationAndHWCharges";
		$("#updateType").val(type);
		document.getElementById("iFlag").checked = true;
		var oid = $("#oid").val();
	
		OpenPopupEdit(oid);
		$("#Operation_Managment_Popup").show();
		$("#saveOnlyOperation").hide('hide');
		}
	else{
		document.getElementById("iFlag").checked = false;
		$("#Operation_Managment_Popup").hide('hide');
	}
}

function showBTN(){
	var value = $("#iFlag").val();
	if(value == "1")
		{
		setTimeout(function() {
		document.getElementById("iFlag").checked = true;
		 }, 500);
		OpenPopupHallwiseOM();
		// $("#Operation_Managment_Popup").show('show');
		$("#saveOnlyOperation").hide('hide');
		}
	else{
		document.getElementById("iFlag").checked = false;
		$("#Operation_Managment_Popup").hide('hide');
	}
}

function OpenPopupEdit(id)
{
	document.getElementById("iFlag").checked = true;
	document.getElementById("iFlag").disabled = true;
	$("#BtnValue").show();
	// var oid = $("#operationIDHidden").val();
	$('#OperationManagmentChrgsTable > thead > tr:nth-child(n+2)')
	.remove();
    $('#OperationManagmentChrgsTable > tbody > tr:nth-child(n+2)')
	.remove();

		var halllist = $("#InvTestAllHallDetails").html();
	
		var halldetails = eval('(' + halllist + ')');
		var HallCharges = "<tr id = 'headerTr'>"
				+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
				+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>Operation Name</div></th>"
				+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";
		
				$.each(halldetails.hl,function(name, value) {
									HallCharges = HallCharges
											+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
											+ value.hn + "</div></th>";
								});
				HallCharges = HallCharges + "</tr>";
				$('#OperationHeading').after(HallCharges);
				var OPId = id;
			
				var inputs = [];
				inputs.push('action=FetchOperationHallCharges');
				inputs.push('OTId=' + encodeURIComponent(OPId));
				var str = inputs.join('&');
				jQuery.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AdminServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						ajaxResponse= r;
						
						pobj1 = eval('(' + ajaxResponse + ')');
				
						 var name = $("#oname").val();
						 var OPCharges = $("#tCharge").val();
						 setTimeout(function() {
								var IPDServicesTestbody = "";
								IPDServicesTestbody = IPDServicesTestbody
										+ "<tr id=Test"
										+ count
										+ "><td class='center' style='height: 21.5px;width: 30px;'>"
										+ OPId
										+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
										+ name + "</td>";
					
								var TestChrgs = 0;
								var slaveid = 0;
								var hallid = 0;
							 
								if (pobj1.listchargesList.length > 0) {
									for ( var j = 0; j < pobj1.listchargesList.length; j++) {
										if (pobj1.listchargesList[j].hallid == 0) {
											TestChrgs = pobj1.listchargesList[j].hallwisecharges;
											slaveid = pobj1.listchargesList[j].opsalveid;
											OPId = pobj1.listchargesList[j].opid;
											hallid = 0;
					
											IPDServicesTestbody = IPDServicesTestbody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=OperationID"
													+ OPId
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ TestChrgs
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OperationChargesSlaveID"
													+ OPId
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid
													+ "' /></td>";
										}
									}
								} else {
									IPDServicesTestbody = IPDServicesTestbody
											+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=OperationID"
											+ OPId
											+ "-HallID"
											+ hallid
											+ " value = '"
											+ OPCharges
											+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OperationChargesSlaveID"
											+ OPId
											+ "-"
											+ hallid
											+ "' value = '"
											+ slaveid + "' /></td>";
								}
					
							$.each(halldetails.hl,function(name,hallvalue) {
					
												var isPresent = 0;
												for ( var i = 0; i < pobj1.listchargesList.length; i++) {
													if (hallvalue.hi == pobj1.listchargesList[i].hallid) {
														TestChrgs = pobj1.listchargesList[i].hallwisecharges;
														slaveid = pobj1.listchargesList[i].opsalveid;
														hallid = pobj1.listchargesList[i].hallid;
														OPId = pobj1.listchargesList[i].opid;
														isPresent = 1;
														break;
													}
												}
												if (isPresent > 0) {
													IPDServicesTestbody = IPDServicesTestbody
															+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=OperationID"
															+ OPId
															+ "-HallID"
															+ hallid
															+ " value = '"
															+ TestChrgs
															+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OperationChargesSlaveID"
															+ OPId
															+ "-"
															+ hallid
															+ "' value = '"
															+ slaveid
															+ "' /></td>";
					
												} else {
													TestChrgs = OPCharges;
													slaveid = 0;
													hallid = hallvalue.hi;
					
													IPDServicesTestbody = IPDServicesTestbody
															+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=OperationID"
															+ OPId
															+ "-HallID"
															+ hallid
															+ " value = '"
															+ TestChrgs
															+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OperationChargesSlaveID"
															+ OPId
															+ "-"
															+ hallid
															+ "' value = '"
															+ slaveid
															+ "' /></td>";
												}
											});
					
									IPDServicesTestbody = IPDServicesTestbody
											+ "</tr>";
					
									$('#Operation' + (count - 1)).after(
											IPDServicesTestbody);
									count++;	
							  }, 5000);
				
						     $('#img').hide();
					        }
				   });
}
function OpenPopupHallwiseOM() {

		$('#OperationManagmentChrgsTable > thead > tr:nth-child(n+2)')
		.remove();
        $('#OperationManagmentChrgsTable > tbody > tr:nth-child(n+2)')
		.remove();

			var halllist = $("#InvTestAllHallDetails").html();
			
			var halldetails = eval('(' + halllist + ')');
			var HallCharges = "<tr id = 'headerTr'>"
					+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
					+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>Operation Name</div></th>"
					+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";
			
					$.each(halldetails.hl,function(name, value) {
										HallCharges = HallCharges
												+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
												+ value.hn + "</div></th>";
									});
					
					
					HallCharges = HallCharges + "</tr>";
					$('#OperationHeading').after(HallCharges);
					
					var OPId = $("#OTId").val();
					
					var inputs = [];
					inputs.push('action=FetchOperationHallCharges');
					inputs.push('OTId=' + encodeURIComponent(OPId));
					var str = inputs.join('&');
					jQuery.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "AdminServlet",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							// alert("error");
						},
						success : function(r) {
							 ajaxResponse= r;
							
							 pobj1 = eval('(' + ajaxResponse + ')');
					
							 var name = $("#oname").val();
							 var OPCharges = $("#tCharge").val();
								
								var IPDServicesTestbody = "";
								IPDServicesTestbody = IPDServicesTestbody
										+ "<tr id=Test"
										+ count
										+ "><td class='center' style='height: 21.5px;width: 30px;'>"
										+ OPId
										+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
										+ name + "</td>";
					
								var TestChrgs = 0;
								var slaveid = 0;
								var hallid = 0;
					
								if (pobj1.listchargesList.length > 0) {
									for ( var j = 0; j < pobj1.listchargesList.length; j++) {
										if (pobj1.listchargesList[j].hallid == 0) {
											TestChrgs = pobj1.listchargesList[j].hallwisecharges;
											slaveid = pobj1.listchargesList[j].opsalveid;
											OPId = pobj1.listchargesList[j].opid;
											hallid = 0;
					
											IPDServicesTestbody = IPDServicesTestbody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=OperationID"
													+ OPId
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ TestChrgs
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OperationChargesSlaveID"
													+ OPId
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid
													+ "' /></td>";
										}
									}
								} else {
									IPDServicesTestbody = IPDServicesTestbody
											+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=OperationID"
											+ OPId
											+ "-HallID"
											+ hallid
											+ " value = '"
											+ OPCharges
											+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OperationChargesSlaveID"
											+ OPId
											+ "-"
											+ hallid
											+ "' value = '"
											+ slaveid + "' /></td>";
								}
					
							$.each(halldetails.hl,function(name,hallvalue) {
					
												var isPresent = 0;
												for ( var i = 0; i < pobj1.listchargesList.length; i++) {
													if (hallvalue.hi == pobj1.listchargesList[i].hallid) {
														TestChrgs = pobj1.listchargesList[i].hallwisecharges;
														slaveid = pobj1.listchargesList[i].opsalveid;
														hallid = pobj1.listchargesList[i].hallid;
														OPId = pobj1.listchargesList[i].opid;
														isPresent = 1;
														break;
													}
												}
												if (isPresent > 0) {
													IPDServicesTestbody = IPDServicesTestbody
															+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=OperationID"
															+ OPId
															+ "-HallID"
															+ hallid
															+ " value = '"
															+ TestChrgs
															+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OperationChargesSlaveID"
															+ OPId
															+ "-"
															+ hallid
															+ "' value = '"
															+ slaveid
															+ "' /></td>";
					
												} else {
													TestChrgs = OPCharges;
													slaveid = 0;
													hallid = hallvalue.hi;
					
													IPDServicesTestbody = IPDServicesTestbody
															+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=OperationID"
															+ OPId
															+ "-HallID"
															+ hallid
															+ " value = '"
															+ TestChrgs
															+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OperationChargesSlaveID"
															+ OPId
															+ "-"
															+ hallid
															+ "' value = '"
															+ slaveid
															+ "' /></td>";
												}
											});
					
									IPDServicesTestbody = IPDServicesTestbody
											+ "</tr>";
					
									$('#Operation' + (count - 1)).after(
											IPDServicesTestbody);
									count++;		
						        }
					   });
}
function saveOperationDetails() {
	
	var updateType;
	var flag = 0;
	if($('#iFlag').attr('checked'))
		{
		    updateType =  $("#updateType").val();
		/** ****hall wise charges* operarion********** */
		     var flagValue = $("#iFlag").val();
		     $('#iFlag').attr('checked',true);
		   // document.getElementById("iFlag").checked = true;
		    flag = flagValue;
		  // var oid = $("#oid").val();
			var oname = $("#oname").val();
			var opType = $("#opType").val();
			var risk = $("#risk").val();

			var list = "";
			$('#list').find('option').each(function() {
				list = list + $(this).html();
			});

			var tCharge = $("#tCharge").val();
			var ePrice = $("#ePrice").val();
			var eCharge = $("#eCharge").val();
			var queryType = $("#queryType").val();

			var opstate = $("#opstate").val();
			var opgrade = $("#opgrade").val();
			var speName = $("#speName").val();
			
			 if(opType == "Select"){
				alert("Please Select Procedure Type");
				return false;
			}else if(oname == ""){
				alert("Please fill out Procedure Name");
				return false;
			}else if (opstate == "Select") {
				alert("Please Select Procedure Group");
				return false;
			} else if (opgrade == "select") {
				alert("Please Select Procedure Category");
				return false;
			} else if (speName == "0") {
				alert("Please Select Procedure Speciality");
				return false;
			}

			var OperationObj = 0;
			OperationObj = {
					ol : []
			    };

			var oid;
			    if(queryType == "insert")
			    	{
			    	oid = $("#OTId").val();
			    	}
			    else{
			    	oid = $("#oid").val();
			    }
				
				var hallid = 0;
				var charges = $("#OperationID" + oid + "-HallID0").val();
				var slaveid = $("#OperationChargesSlaveID" + oid + "-0").val();

				var listchargesList = [];

				listchargesList.push({
					"hallid" : hallid,
					"opid" : oid,
					"hallwisecharges" : charges,
					"opsalveid" : slaveid
				});				
				
				var halllist = $("#InvTestAllHallDetails").html();
				var halldetails = eval('(' + halllist + ')');
				
				for ( var j = 0; j < halldetails.hl.length; j++) {
					var hlid = halldetails.hl[j].hi;
					var chrg = $("#OperationID" + oid + "-HallID" + hlid).val();
					var slvid = $("#OperationChargesSlaveID" + oid + "-" + hlid).val();

					listchargesList.push({
						"hallid" : hlid,
						"opid" : oid,
						"hallwisecharges" : chrg,
						"opsalveid" : slvid
					});
				}
				
				OperationObj.ol.push({
					"listchargesList" : listchargesList,
					"oi" : oid,
					"on" : oname,
					"oty" : opType,
					"or" : risk,
					"oe" : list,
					"oc" : tCharge,
					"oec" : eCharge,
					"oep" : ePrice,
					"opst" : opstate,
					"opgr" : opgrade,
					"spnm" : speName,				
					"FlagForOtCharges" : flag	
					
				});
			OperationObj = JSON.stringify(OperationObj);
			
			var inputs = [];
			inputs.push('action=SaveOperationDetailsWithHWChrages');
			inputs.push('OperationObj=' + encodeURIComponent(OperationObj));
			inputs.push('queryType=' + queryType);
			inputs.push('updateType=' + updateType);
			// inputs.push('pageType=' + encodeURIComponent("NormalCharges"));
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					alert("error");
				},
				success : function(r) {
					alert(r);
					window.location = "OperationManagement.jsp";
					// location.reload();
				}
			});
		
		}else
		{
			var cathlab="N";
			 if($('#chkcath').is(':checked')){
					
				 cathlab="Y";
				}/*
			 * updateType = $("#updateType").val(); alert(updateType);
			 */
			/** *****************normal operation*********** */
			var oid = $("#oid").val();
			var oname = $("#oname").val();
			var opType = $("#opType").val();
			var risk = $("#risk").val();

			var list = "";
			$('#list').find('option').each(function() {
				list = list + $(this).html();
			});

			var tCharge = $("#tCharge").val();
			var ePrice = $("#ePrice").val();
			var eCharge = $("#eCharge").val();
			var queryType = $("#queryType").val();

			var opstate = $("#opstate").val();
			var opgrade = $("#opgrade").val();
			var speName = $("#speName").val();

			 if(opType == "Select"){
				alert("Please Select Procedure Type");
				return false;
			}else if(oname == ""){
				alert("Please fill out Procedure Name");
				return false;
			}else if (opstate == "Select") {
				alert("Please Select Procedure Group");
				return false;
			} else if (opgrade == "select") {
				alert("Please Select Procedure Category");
				return false;
			} else if (speName == "0") {
				alert("Please Select Procedure Speciality");
				return false;
			}
			if(oid==null || oid=="" || oid==undefined ){
				oid=0;
			}
			if(tCharge==null || tCharge=="" || tCharge==undefined ){
				tCharge=0;
			}
			if(ePrice==null || ePrice=="" || ePrice==undefined ){
				ePrice=0;
			}
			if(eCharge==null || eCharge=="" || eCharge==undefined ){
				eCharge=0;
			}
			var operationDetails = {
				operation_id : oid,
				operName : encodeURIComponent(oname),
				opType : opType,
				risk   : risk,
				equipments: list,
				charges :tCharge,
				ePrice :ePrice,
				eCharges : eCharge,
				opstate :opstate,
				opgrade :opgrade,
				speName :  encodeURIComponent(speName),
				cathlab :cathlab,
				status  : "Y"
			};
			
			operationDetails = JSON.stringify(operationDetails);
			var inputs = [];

			inputs.push('action=SaveOperationDetails');
			inputs.push('queryType=' + queryType);
			inputs.push('flag=' + flag);
			inputs.push('operationDetails=' +operationDetails);
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
			var str = inputs.join('&');
			// encodeURIComponent(inputs.toString());
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "AdminServlet",
				url : "./ehat/otdata/SaveOperationDetails",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					window.location = "OperationManagement.jsp";
					// $("#dispMessage").html(r);
					// window.reload();
				}
			});
		}
}

function ClosePopup()
{
	$("#Operation_Managment_Popup").hide();
	$("#saveOnlyOperation").show('show');
	window.location = "OperationManagement.jsp";
}

var addOperationBtnTemp = "<input style='font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;' type='button' value='Add Operation' onclick='setOperation()' />";

var addDiscountButttonTemp = "<input	style='font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;' type='button' value='Add Discount' onclick='viewOprCharges()' />";

/** ********** Distributer Management start ***************** */

function addThem() {
	var a = $("#iname").val();
	var b = $("#iprice").val();
	// var val = $("#txtItem").val();

	var inputs = [];
	inputs.push('action=FindItemName');
	inputs.push('itemName=' + encodeURIComponent(a));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			
			ajaxResponse = eval('(' + r + ')');

			if (ajaxResponse.il.length == 0) {

				alert("This Item Not Present In Inventory");
			} else {

				if (a != "" && b != "") {
					var add = a + ',' + b + '\n';
					var flag1 = 0;

					$('#txtItem').find('option').each(function() {
						var eqpt = $(this).html().split(",");
						
						if (eqpt[0] == a) {

							flag1 = 1;
							alert("Equipment is present in list");
							return false;
						}
					});
					if (flag1 == 0) {
						var o = new Option("option text", "value");
						var val = $(o).html(add);
						$("#txtItem").append(o);
					}
				}
				$("#iname").val("");
				$("#iprice").val("");
				return true;
			}
		}
	});
}

function RemoveThem() {
	$('#txtItem option:selected').remove();
}

function setSearchDistTemp() {
	var sample;
	$("#search").setTemplate(searchDistTemp);
	$("#search").processTemplate(sample);
}

function searchDistributor() {
	count = 1;
	var byName = $("#byName").val();
	var byId = $("#byId").val();
	var searchBy;
	var value;
	if (byName != "" && byId != "") {
		alert("Please Search Either By Distributor Name Or By Distributorid!");
		SetFocus("byName");
	} else if (byName == "" && byId == "") {
		alert("Please Enter Distributer Name OR Distributer Id!");
	} else {
		if (byName != "") {
			searchBy = "byName";
			value = byName;

		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}

		var inputs = [];
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('action=SearchDistributor');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				ajaxResponse = r;

				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.distributerList.length == 0) {
					alert("Distributer Not Found");
				} else {
					$("#distMangTemp").setTemplate(defaultViewDistributerTemp);
					$("#distMangTemp").processTemplate(pobj1);
				}
			}
		});
	}
}

function deleteDistributor(did) {

	var r = confirm("Are You Confirm To Delete Distributor Record.");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteDist');
		inputs.push('did=' + encodeURIComponent(did));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

function editDistributor(did) {
	$("#search").html(
			"<div style='font-size: 24px;'>Edit Distributer Record</div>");
	$("#AddDistributer").hide();
	var inputs = [];
	inputs.push('action=updateDist');
	inputs.push('did=' + encodeURIComponent(did));
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
			$("#distItem").html(ajaxResponse);
			myArray = JSON.parse(ajaxResponse);

			for ( var i = 0; i < myArray.distributerList.length; i++) {

				if (myArray.distributerList[i].distributor_id == did) {

					myObj1 = myArray.distributerList[i];
					break;
				}
			}
			myObj = JSON.stringify(myObj1);
			myObj = myObj.decodeSpecialChars();

			distBean = eval('(' + myObj + ')');
			$("#distMangTemp").setTemplate(addDistributerDetailsTemp);
			$("#distMangTemp").processTemplate(distBean);

			$("#dname").val(distBean.dist_name);
			$("#daddr1").val(distBean.dist_addr);
			$("#mobile").val(distBean.mobile);

			setItemManagementTemp('distributorItem', 'a');
			$("#queryType").val("update");
			setDistributerSaveButtonTemp();
		}
	});
}

var defaultViewDistributerTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed header-fixed cf' style='width : 1090px; margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Distributer Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Distributer ID</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; height: 420px; max-height: auto; overflow-y:scroll;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.distributerList as dl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.dl.dist_name}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dl.distributor_id}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'><input style='font-size: 10px;' type='button' value='EDIT' "
		+ "class='edit' id='btnEdit{count}' onclick='editDistributor({$T.dl.distributor_id})' />"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'><input style='font-size: 10px;' type='button' value='DELETE' "
		+ "class='edit' id='btnDelete{count}' onClick='deleteDistributor({$T.dl.distributor_id})' />"
		+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewDistributer() {

	var inputs = [];
	inputs.push('action=fetchDistributer');

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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#distMangTemp").setTemplate(defaultViewDistributerTemp);
			$("#distMangTemp").processTemplate(pobj1);
		}
	});
}

function addDistributerDetails() {
	$("#AddDistributerbtn").hide();
	$("#search").attr('style', 'display:none');
	$("#panel").attr('style', 'margin-top:-10px');
	var inputs = [];
	inputs.push('action=fetchDistID');

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
			pobj1 = eval('(' + ajaxResponse + ')');
			// ilSize=pobj1.il.length;
			$("#distMangTemp").setTemplate(addDistributerDetailsTemp);
			$("#distMangTemp").processTemplate(pobj1);
			$("#ItemList").show();
			$("#alphabet").show();
			setItemManagementTemp('distributorItem', 'A');
			setDistributerSaveButtonTemp();
			// $(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");
			$("#dname").focus();
		}
	});
}

function setDistributerSaveButtonTemp() {
	var sampleBean;
	$("#saveButton").setTemplate(saveDistributerButtonTemp);
	$("#saveButton").processTemplate(sampleBean);
}

var allprice = [];
var allVals = [];
function saveDistributerDetails() {
	var distBean1 = '';
	var did = $("#did").val();
	var dname = $("#dname").val();
	var daddr1 = $("#daddr1").val();
	var mobile = $("#mobile").val();
	$.each($('#chk:checked'), function() {
		allVals.push($(this).val());
	});
	for ( var k = 1; k <= ilSize; k++) {
		allprice.push(0/* $('#iprice' + k).val() */);
	}
	if (dname == "") {
		alert("Enter Distributer Name .");
		allVals = [];
		allprice = [];
	} else {
		// var shcharg = $("#shcharg").val();
		var queryType = $("#queryType").val();

		if (queryType == "update") {
			var distItemList1 = $("#distItem").html();
			distBean1 = eval('(' + distItemList1 + ')');
			for ( var j = 0; j < distBean1.distributerList[0].distItemList.length; j++) {
				for ( var k = 0; k < allVals.length; k++) {

					if (distBean1.distributerList[0].distItemList[j].iid == allVals[k])

					{

					} else {
						if (k == allVals.length) {
							distBean1.distributerList[0].distItemList[j].ip = 0;
						}
					}
				}
			}
		}
		distBean1 = JSON.stringify(distBean1);

		if (allVals.length == 0) {
			alert("Please Select At Least One Item To Save Distributer Record");
		} else {
			var inputs = [];
			inputs.push('action=AddDistributer');
			inputs.push('did=' + encodeURIComponent(did));
			inputs.push('dname=' + encodeURIComponent(dname));
			inputs.push('mobile=' + encodeURIComponent(mobile));
			inputs.push('daddr1=' + encodeURIComponent(daddr1));
			inputs.push('txtItem=' + (allVals));
			inputs.push('allprice=' + allprice);
			inputs.push('queryType=' + queryType);
			inputs.push('distItem=' + distBean1);
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
			var str = inputs.join('&');

			jQuery
					.ajax({
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
							alert(r);
							if (queryType == "insert") {
								if (r != "Distributer Name Is Already Present In The Database.") {
									location.reload();
								}
							}
							// window.location = "DistributerManagement.jsp";
						}
					});
		}
	}
}

/** *******Distributer Management* End*********** */
/** ********** Bed Ward start ***************** */

var defaultViewHallTemp = "<table style='margin-bottom: 9px; background: #fff; width:100%;'	class='table table-bordered table-condensed cf'>" +
		"<thead class='cf'><tr><th style='height: 21.5px;' class='col-md-1-1 center'> # </th>" +
		"<th style='' class='col-md-3-1'> Hall Name </th>" +
		"<th style='' class='col-md-3-1'> Hall Type </th>" +
		"<th style='' class='col-md-1-1 center'> Beds </th>" +
		"<th style='padding-left: 0px; padding-right: 0px;' class='numeric col-md-1-1 center'> Edit </th>" +
		"<th style='padding-left: 0px; padding-right: 0px;' class='numeric col-md-1-1 center'> Delete Hall </th>" +
		"<th style='padding-left: 0px; padding-right: 0px;' class='numeric col-md-1-1 center'> Add Bed </th>" +
		"<th style='padding-left: 0px; padding-right: 0px;' class='numeric col-md-1-1 center'> Delete Bed </th></tr></thead></table>" +
		"<div	style='height: 400px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;'	class='col-md-12-1'>" +
		"<table class='table table-striped table-condensed cf'><tbody>{#foreach $T.hl as hl}<tr>" +
		"<td class='col-md-1-1 center'>{count++}.</td>" +
		"<td class='col-md-3-1'>{$T.hl.hn}</td>" +
		"<td class='col-md-3-1'>{$T.hl.htnm}</td>" +
		"<td class='col-md-1-1 center' style='padding-right: 0px;'>{$T.hl.bn}</td>" +
		"<td class='col-md-1-1 center' style='padding-right: 10px;'>" +
		"<button value='EDIT' class='btn btn-xs btn-success pull-right editUserAccess' id='btnEdit{count}' onclick='editHall({$T.hl.hi})' disabled='disabled'>" +
		"<i class='fa fa-edit'></i></button></td>" +
		"<td class='col-md-1-1 center' style='padding-right: 10px;'>" +
		"<button value='DEL' class='btn btn-xs btn-success pull-right deleteUserAccess' id='btnDelete{count}' onClick='deleteHall({$T.hl.hi})' disabled='disabled'>" +
		"<i class='fa fa-trash-o'></i></button></td>" +
		"<td class='col-md-1-1 center' style='padding-right: 10px;'>" +
		"<button value='ADD' class='btn btn-xs btn-success pull-right editUserAccess' id='btnAdd{count}' onClick='AddBed({$T.hl.hi})' disabled='disabled'>" +
		"<i class='fa fa-plus'></i></button></td>" +
		"<td class='col-md-1-1 center' style='padding-right: 10px;'>" +
		"<button value='DEL' class='btn btn-xs btn-success pull-right deleteUserAccess' id='btnDelete{count}' onClick='deleteBed({$T.hl.hi})' disabled='disabled'>" +
		"<i class='fa fa-trash-o'></i></button></td>" +
		"</tr>{#/for}</tbody></table></div>";

var loadHallNameTemp = '<option value="0">-select-</option>{#foreach $T.hl as hl}<option value="{$T.hl.hi}" onclick="editAccountHallType({$T.hl.hi})">{$T.hl.hn}</option>{#/for}';

// Touheed 26-Oct-2015
var rowCountPackage=1;
var normalPackageCount=1;
var normalPackageTemp = "{#foreach $T.hl as il}"
	+ "<tr id='remove{rowCountPackage}'>"
	+ "<td class='col-md-1-1 center'>"
	+ "<label class='TextFont'>{normalPackageCount++}.</label></td>"
	+ "<td class='col-md-1-1 center'>{$T.il.hi}</td>"
	+ "<td class='col-md-5-1 center'>"
	+ "<input type='text' readonly='readonly' class='form-control input-SmallText' style='margin-top: 4px;text-align: left;' value='{$T.il.hn}' name='textfield' id='hall{$T.il.hi}' value='{$T.il.hn}'  maxlength='8' />"
	+ "</td>"
	+ "<td class='col-md-3-1 center'>"
	+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px; text-align: left;'  id='hallCharges{$T.il.hi}' onkeypress='return validateNumbers(event)'  /></td>"	
	+ "<td class='col-md-1-1 center'><input type='checkbox' style='margin-top: 10px;' name='checkBoxPackage'  id='chk{$T.il.hi}' value='{$T.il.hi}' /></td>"
	+ "</tr>" + "{#/for}"
	+ "</tbody>" + "</table>" + "</div>";

function defaultViewHall(pageName) {
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}

	count = 1;
	var inputs = [];
	inputs.push('action=fetchHall');
	inputs.push('corporateId=' + sid);
	inputs.push('callFrom=' + "default");


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
			$("#hallDetailDiv").html(ajaxResponse);
			// for package Master Touheed
			$("#hallList").html(ajaxResponse);
			
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pageName == 'bedState') {
				$("#btype").setTemplate(loadHallNameTemp);
				$("#btype").processTemplate(pobj1);
			} else if(pageName == "InvestTestCharges"|| pageName == "labTestCharges" 
				|| pageName == "casuality" || pageName == "OperationManagement"|| pageName == "radiologyTestCharges" || pageName == "OtherServicesCharges"){
				$("#InvTestAllHallDetails").html(ajaxResponse);
			}else{
				$("#bedMangTemp").setTemplate(defaultViewHallTemp);
				$("#bedMangTemp").processTemplate(pobj1);
				
				// for Package Manager hall type feild
				$("#hallType").setTemplate(loadHallNameTemp);
				$("#hallType").processTemplate(pobj1);
				
				// halltype
				$("#normalPackagetable").setTemplate(normalPackageTemp);
				$("#normalPackagetable").processTemplate(pobj1);
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

var defaultViewBedTemp = "<div class='col-md-12-1 center'>	<h4>Delete Bed</h4></div><table class='table-bordered table cf'	style='margin-bottom: 9px; background: #f5f5f5;'>	<thead class='cf'>		<tr>			<th class='col-md-1-1 center' style='height: 21.5px;'>#</th>			<th class='col-md-1-1 center' style='height: 21.5px;'>Hall ID</th>			<th class='numeric col-md-1-1 center' style='height: 21.5px;'>				Bed ID</th>			<th class='numeric col-md-1-1 center' style='height: 21.5px;'>				Bed No.</th>			<th class='numeric col-md-1-1 center' style='height: 21.5px;'>				Delete Bed</th>		</tr>	</thead></table><div class='col-md-12-1'	style='height: 315px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #b8b8b8;'>	<table class='table table-striped table-condensed cf'>		<tbody>			{#foreach $T.bl as bl}			<tr>				<td id='divPi{count}' style='height: 21.5px;'					class='col-sm-1-1 center'>{count++}.</td>				<td id='divPi{count}' style='height: 21.5px;'					class='col-sm-1-1 center'>{$T.bl.hi}</td>				<td id='divPi{count}' style='height: 21.5px;'					class='col-sm-1-1 center'>{$T.bl.bi}</td>				<td style='height: 21.5px;' class='col-sm-1-1 center'>{$T.bl.bdnm}</td>				<td style='height: 21.5px;' class='col-sm-1-1 center'><button						style='font-size: 10px;' type='button' value='DELETE'						id='btnDelete{count}'						onClick='deleteSpecBed({$T.bl.bi},{$T.bl.hi})'						class='btn btn-xs btn-success'>						<i class='fa fa-trash-o'></i>					</button></td>			</tr>			{#/for}		</tbody>	</table></div>";

function deleteBed(hallId) {

	count = 1;
	var inputs = [];
	inputs.push('action=fetchBedHall');
	inputs.push('hallId=' + hallId);
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
			
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.bl.length == 0) {
				alert("No vacant bed is present in this hall to delete");
			} else {
				$("#bedMangTemp1").setTemplate(defaultViewBedTemp);
				$("#bedMangTemp1").processTemplate(pobj1);
			}
		}
	});
};

var addBedsTemp = "<div style='height: 90%; padding-left: 10%;'>"
	+ "<div class='col-md-12-1 center' style='padding-top: 5%;'> <h4>Add Beds</h4> </div>"
	+ "<div class='col-md-12-1'>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>Hall Name</div>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;' id='hallNm'>{$T.hn}</div>"
	+ "</div>"
	+ "<div class='col-md-12-1'>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>Total Beds</div>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>{$T.bn}</div>"
	+ "</div>"
	+ "<div class='col-md-12-1'>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>Hall Type</div>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;' id='bt'>{$T.htnm}</div>"
	+ "</div>"
	+ "<div class='col-md-12-1'>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>Hall Id</div>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;' id='hi'>{$T.hi}</div>"
	+ "</div>"
	+ "<div class='col-md-12-1'>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>Lease/ Bed Normal</div>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;' id='bl'>Rs.{$T.hal}</div>"
	+ "</div>"
	+ "<div class='col-md-12-1'>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>Lease/ Bed Isolation</div>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;' id='bl'>Rs.{$T.leaseiso}</div>"
	+ "</div>"
	+ "<div class='col-md-12-1'>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>Number Of Beds</div>"
		+ "<div class='col-md-6-1' style='padding-top: 9%;'>"
			+ "<input type='text' id='nob' name='hname' class='col-md-6-1' onkeypress='return validateNumbers(event)' maxlength='2' />"
		+ "</div>"
	+ "</div>"
+ "</div>";

function AddBed(hi) {
	ajaxResponse = $("#hallDetailDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.hl.length; i++) {

		if (myArray.hl[i].hi == hi) {

			myObj = myArray.hl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	myObj = (myObj.decodeSpecialChars());
	BedsBean = eval('(' + myObj + ')');

	$("#bedMangTemp1").setTemplate(addBedsTemp);
	$("#bedMangTemp1").processTemplate(BedsBean);
	setBedSaveButtonTemp();
}

var saveBedButtonTemp = "<button class='btn btn-xs btn-success'	type='button' value='Save Now'" +
		" data-toggle='tooltip' data-placement='left' title='Save Bed Details' onclick='saveBedDetails()' ><i class='fa fa-save'></i></button>";

function setBedSaveButtonTemp() {
	var sampleBean;
	$("#saveButton").setTemplate(saveBedButtonTemp);
	$("#saveButton").processTemplate(sampleBean);
}

function saveBedDetails() {

	var nob = $("#nob").val();
	if (nob == "") {
		alert("Please Enter Number Of Beds.");
		SetFocus("nob");
		return false;
	} else {

		var hall_ID = $("#hi").html();

		var inputs = [];
		inputs.push('action=AddBeds');
		inputs.push('nob=' + nob);
		inputs.push('hall_ID=' + hall_ID);
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
				alert(r);
				window.location = "BedWardManagement.jsp";
			}
		});
	}
}

function deleteSpecBed(bedId, hallId) {
	var r = confirm("Are You Confirm To Delete Bed.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteSpecBed');
		inputs.push('hallId=' + hallId);
		inputs.push('bedId=' + bedId);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
};

function searchHall(callForm) {
	count = 1;
	var strValue =$.trim($("#byName").val());	
	if (strValue == "") {
		alert("Please Enter Hall Name");
		SetFocus("strValue");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('action=SearchHall');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#byName").val("");
			if (pobj1.hl.length == 0) {
				alert("Hall Not Found");
				$("#byName").val("");
			} else {
				$("#byName").val("");
				$("#bedMangTemp").setTemplate(defaultViewHallTemp);
				$("#bedMangTemp").processTemplate(pobj1);
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}

function deleteHall(hi) {
	var r = confirm("Are You Confirm To Delete Hall.");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeleteHall');
		inputs.push('hallId=' + encodeURIComponent(hi));
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

var editHallDetailsTemp = "<div style='height: 120%; padding-left: 5%;'>" +
						"<div class='col-md-12-1 center' style='padding-top: 5%;'><h4>Edit Hall</h4></div>	" +
						"<div class='col-md-12-1'><div class='col-md-3-1' style='padding-top: 7%;margin-left:2%;'>Hall Name</div>" +
						"<div class='col-md-9-1' style='padding-top: 8%; padding-left: 6%;'>" +
						"<input type='text' id='hname' name='hname' class='col-md-10-1'	maxlength='150' value='{$T.hn}'/>" +
						"<div class='col-md-1-1' style='color: red; padding-left:3px;'><b>*</b></div></div></div>" +
						"<div class='col-md-12-1'style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Hall Type</div>" +
						"<div class='col-md-9-1' style='margin-top:9px; padding-left: 6%;'>" +
						"<select class='col-md-10-1' id='btype' name='btype'></select>" +
						"<div class='col-md-1-1' style='color: red; padding-left:3px;'><b>*</b></div></div></div>" +
						"<div class='col-md-12-1' style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Lease/ Bed Normal</div>" +
						"<div class='col-md-9-1' style='margin-top:9px; padding-right: 6%;'><p class='col-md-1-1'>Rs.</p>" +
						"<input type='text' id='lease' name='lease' class='col-md-10-1'	onkeypress='return validateNumbers(event)' maxlength='6' value='{$T.hal}'/>" +
						"<div class='col-md-1-1' style='color: red; padding-left: 3px;'><b>*</b></div></div></div>" +
						"<div class='col-md-12-1' style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Lease/ Bed Isolation</div>" +
						"<div class='col-md-9-1' style='margin-top:9px; padding-right: 6%;'><p class='col-md-1-1'>Rs.</p>" +
						"<input type='text' id='leaseIsolation' name='leaseIsolation' class='col-md-10-1' onkeypress='return validateNumbers(event)' maxlength='6' value='{$T.leaseiso}'/>" +
						"<div class='col-md-1-1' style='color: red; padding-left: 3px;'><b>*</b></div></div></div>" +
						"<input type='hidden' id='hall_ID' value='{$T.hi}'><input type='hidden' id='nbed' value='{$T.bn}'>{#foreach $T.bl as bl}<input type='hidden' id='bed_ID' value='{$T.bl.bi}'>{#/for}<input type='hidden' id='queryType' value='update'></div>";

function editHall(hi) {
	ajaxResponse = $("#hallDetailDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.hl.length; i++) {
		if (myArray.hl[i].hi == hi) {
			myObj = myArray.hl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	myObj = (myObj.decodeSpecialChars());
	hallBean = eval('(' + myObj + ')');
	var flag = 0;

	$("#bedMangTemp1").setTemplate(editHallDetailsTemp);
	$("#bedMangTemp1").processTemplate(hallBean);

	loadHallType();
	setsaveButtonTemp();
	var a = 0;
	var b = 0;
	for ( var j = 0; j < hallBean.bl.length; j++) {
		if (hallBean.bl[j].ba == 'Y') {
			a++;
			if (a == hallBean.bl.length) {
				$("#status").val('Y');
				flag = 1;
			}
		}
		if (hallBean.bl[j].ba == 'N') {
			b++;
			if (b == hallBean.bl.length) {
				$("#status").val('N');
				flag = 1;
			}
		}
	}
	if (flag == 0) {
		$("#status").val('SELECT');
	}

	setTimeout(function() {
		if(hallBean.ht == "")
		{
			$("#btype").val("select");
		}else{
			$("#btype").val(hallBean.ht);
		}
	}, 500);
}

function saveHallDetails() {

	var bed_ID = $("#bed_ID").val();
	var hall_ID = $("#hall_ID").val();
	var floor = $("#floor").val();
	var hname = $.trim($("#hname").val());
	var nbed = $("#nbed").val();
	var lease = $("#lease").val();
	var leaseIsolation = $("#leaseIsolation").val();
	var btype = $("#btype").val();
	// var status = $("#status").val();
	var queryType = $("#queryType").val();
	if (hname == "") {
		alert("Please Enter Hall Name!");
		SetFocus("hname");
		return false;
	}
	else if (btype == "select") {
		alert("Please Select Hall Type!");
		SetFocus("btype");
		return false;
	}else if (lease == "") {
		alert("Please Enter Lease Normal Amount!");
		SetFocus("lease");
		return false;
	} else if (leaseIsolation == "") {
		alert("Please Enter Lease Isolation Amount!");
		SetFocus("lease");
		return false;
	}  else if (nbed == "") {
		alert("Please Enter Number Of Beds!");
		SetFocus("nbed");
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(nbed)) {
		alert("Please enter only numbers in 'Number of Beds' field");
		SetFocus("nbed");
		return false;
	}
	else {

		var inputs = [];
		inputs.push('action=SaveHallDetails');
		inputs.push('queryType=' + queryType);
		inputs.push('bed_ID=' + bed_ID);
		inputs.push('hall_ID=' + hall_ID);
		inputs.push('hname=' + encodeURIComponent(hname));

		inputs.push('floor=' + floor);
		inputs.push('nbed=' + nbed);

		inputs.push('lease=' + lease);
		inputs.push('btype=' + btype);
		inputs.push('leaseIsolation=' + leaseIsolation);
		// inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');

		jQuery
				.ajax({
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
						alert(r);
						if (ajaxResponse != "Hall Name is Already Present In The database.")
							window.location = "BedWardManagement.jsp";
					}
				});
	}
}
var saveButtonTemp = "<button type='button' value='Save Now' data-toggle='tooltip' data-placement='left' title='Save Hall/Bed' onclick=saveHallDetails() class='btn btn-xs btn-success editUserAccess' disabled='disabled'>" +
		"<i class='fa fa-save'></i></button>";

function setsaveButtonTemp() {
	var sampleBean;
	$("#saveButton").setTemplate(saveButtonTemp);
	$("#saveButton").processTemplate(sampleBean);
	userAccess();
}

var addHallDetailsTemp = "<div style='height: 120%; padding-left: 5%;'>" +
		"<div class='col-md-12-1 center' style='padding-top: 5%;'><h4>Add Hall</h4></div>	" +
		"<div class='col-md-12-1'><div class='col-md-3-1' style='padding-top: 7%;margin-left:2%;'>Hall Name</div>" +
		"<div class='col-md-9-1' style='padding-top: 8%; padding-left: 6%;'>" +
		"<input type='text' id='hname' name='hname' class='col-md-10-1'	maxlength='150' />" +
		"<div class='col-md-1-1' style='color: red; padding-left:3px;'><b>*</b></div></div></div>" +
		"<div class='col-md-12-1'style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Hall Type</div>" +
		"<div class='col-md-9-1' style='margin-top:9px; padding-left: 6%;'>" +
		"<select class='col-md-10-1' id='btype' name='btype'></select>" +
		"<div class='col-md-1-1' style='color: red; padding-left:3px;'><b>*</b></div></div></div>" +
		"<div class='col-md-12-1' style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Lease/ Bed Normal</div>" +
		"<div class='col-md-9-1' style='margin-top:9px; padding-right: 6%;'><p class='col-md-1-1'>Rs.</p>" +
		"<input type='text' id='lease' name='lease' class='col-md-10-1'	onkeypress='return validateNumbers(event)' maxlength='6' />" +
		"<div class='col-md-1-1' style='color: red; padding-left: 3px;'><b>*</b></div></div></div>" +
		"<div class='col-md-12-1' style='margin-top:9px'><div class='col-md-3-1' style='margin-top:4px;margin-left:2%;'>Lease/ Bed Isolation</div>" +
		"<div class='col-md-9-1' style='margin-top:9px; padding-right: 6%;'><p class='col-md-1-1'>Rs.</p>" +
		"<input type='text' id='leaseIsolation' name='leaseIsolation' class='col-md-10-1' onkeypress='return validateNumbers(event)' maxlength='6' />" +
		"<div class='col-md-1-1' style='color: red; padding-left: 3px;'><b>*</b></div></div></div>" +
		"<div class='col-md-12-1' style='margin-top:9px'><div class='col-md-3-1' style='margin-top:9px;margin-left:2%;'>Number Of Beds</div>" +
		"<div class='col-md-9-1' style='margin-top:9px; padding-left: 6%;'>" +
		"<input type='text' id='nbed' name='nbed' class='col-md-10-1' onkeypress='return validateNumbers(event)' maxlength='2' />" +
		"<div class='col-md-1-1' style='color: red; padding-left:3px;'><b>*</b></div></div></div>" +
		"<input type='hidden' id='queryType' value='insert'></div>";

function addHallDetails() {
	var userBean;
	$("#bedMangTemp1").setTemplate(addHallDetailsTemp);
	$("#bedMangTemp1").processTemplate(userBean);
	setsaveButtonTemp();
	// $("#addHallBtn").hide();
	$("#hname").focus();
	loadHallType();
}

var loadHallTypeTemp = "<option value='select' onclick='editAccountHallType(0)'>--Select--</option>{#foreach $T.htli as htli}  <option	value='{$T.htli.idht}' onclick='editAccountHallType({$T.htli.idht})' > {$T.htli.htnm} </option> {#/for}";

var loadHallTypeTempForReport = "<option value='select'>--Select--</option>{#foreach $T.htli as htli}  <option	value='{$T.htli.idht}'> {$T.htli.htnm} </option> {#/for}";

function loadHallType(type) {
	$("#divInside").hide();
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}

	count = 1;
	var inputs = [];
	inputs.push('action=fetchHallType');

	inputs.push('corporateId=' + sid);

	if (sid == "0") {
		AccsetsaveButtonTemp();
	}
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
			// $("#hallDetailDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#btype").setTemplate(loadHallTypeTemp);
			$("#btype").processTemplate(pobj1);
			$("#divInside").show();
			if(type = "wardreport"){
				$("#halltype").setTemplate(loadHallTypeTempForReport);
				$("#halltype").processTemplate(pobj1);
			}
		}
	});
}
/** ******************************* Bed Ward end **************** */

/** *************************** start User mgmt ****************** */

var addAcountInformationTemp = "<div style='height:100%; border: 0px solid #b8b8b8;max-height: auto;'>"
		+ "<div style='padding-top: 2.5%; padding-left: 8%'><div style=''><h3>Add Account Information:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<label class='TextFont col-md-3-1'>Title<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select class='form-control input-SmallText TextFont col-md-7-1' id='title' style='margin-left:7%;'>"
		/*
		 * + "<option value=''>-select Title-</option>" + "<option
		 * value='Dr.'>Dr.</option>" + "<option value='Mr.'>Mr.</option>" + "<option
		 * value='Mrs.'>Mrs.</option>" + "<option value='Miss.'>Miss.</option>"
		 */
		+ "</select></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='First Name'>First Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='fName' name='fName' type='text' onkeypress='return validatealphabetic(event)' placeholder='First Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:7%;' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='Middle Name'>Middle Name</label>"
		+ "<input id='mName' name='mName' type='text' onkeypress='return validatealphabetic(event)' placeholder='Middle Name' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:7%;' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='Last Name'>Last Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='lName' name='lName' type='text' onkeypress='return validatealphabetic(event)' placeholder='Last Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:7%;' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='User Name'>User Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='userNm' name='userNm' type='text' placeholder='User Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:7%;' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='Password'>Password<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='password' name='password' type='text' onblur='stringlength()' placeholder='Password' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:7%;' maxlength='12'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1'>User Type</label>"
		+ "<select id='userType' disabled='disabled' class='form-control input-SmallText col-md-7-1' style='margin-left:7%;'>"
		+ "<option value='select'>-Select-</option>"
		+ "<option value='admin'>Admin</option>"
		+ "<option value='doctor'>Doctor</option>"
		+ "<option value='rmo'>RMO</option>"
		+ "<option value='visitingdoctor'>Visiting Doctor</option>	"
		+ "<option value='receptionist'>Receptionist</option>"
		+ "<option value='nurse'>Nurse</option>"
		+ "<option value='anesthetist'>Anesthetist</option>"
		+ "<option value='HR'>HR</option>"
		+ "<option value='General'>General</option>"
		+ "<option value='Pathologist'>Pathologist</option></select></div>"
		+ "</div></div>";

var editAcountInformationTemp = "<div style='height:100%; border: 0px solid #b8b8b8;max-height: auto;'>"
		+ "<div style='padding-top: 2.5%; padding-left: 8%'><div style=''><h3>Edit Account Information:</h3></div>"
		+ "<div class='divide-10'></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<label class='TextFont col-md-3-1'>Title<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select class='form-control input-SmallText TextFont col-md-7-1' id='title' style='margin-left:7%;'>"
/*
 * + "<option value=''>-select Title-</option>" + "<option value='Dr.'>Dr.</option>" + "<option
 * value='Mr.'>Mr.</option>" + "<option value='Mrs.'>Mrs.</option>"
 */
		+ "</select></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='First Name'>First Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='fName' name='fName' type='text' onkeypress='return validatealphabetic(event)' placeholder='First Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:7%;' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='Middle Name'>Middle Name</label>"
		+ "<input id='mName' name='mName' type='text' onkeypress='return validatealphabetic(event)' placeholder='Middle Name' "
		+ "class='form-control input-SmallText col-md-7-1' style='margin-left:7%;' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='Last Name'>Last Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='lName' name='lName' type='text' onkeypress='return validatealphabetic(event)' placeholder='Last Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:7%;' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='User Name'>User Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='userNm' name='userNm' type='text' placeholder='User Name' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:7%;' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1' for='Password'>Password<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='password' name='password' type='text' onblur='stringlength()' placeholder='Password' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:7%;' maxlength='12'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-3-1'>User Type</label>"
		+ "<select id='userType' class='form-control input-SmallText col-md-7-1' style='margin-left:7%;'>"
		+ "<option value='select'>-Select-</option>"
		+ "<option value='admin'>Admin</option>"
		+ "<option value='anesthetist'>Anesthetist</option>"
		+ "<option value='doctor'>Doctor</option>"
		+ "<option value='General'>General</option>"
		+ "<option value='HR'>HR</option>"
		+ "<option value='nurse'>Nurse</option>"
		+ "<option value='receptionist'>Receptionist</option>"
		+ "<option value='rmo'>RMO</option>"
		+ "<option value='visitingdoctor'>Visiting Doctor</option>"
		+ "<option value='Pathologist'>Pathologist</option></select></div>"
		+ "</div></div>";

function setNewUserTemp(value) {
	
	setSaveUserButtontemp();
	var sample;
	$("#infoDiv").setTemplate(addAcountInformationTemp);
	$("#infoDiv").processTemplate(sample);

	if (value == "receptionist" || value == "nurse" || value == "rmo") {
		$("#fees").attr("disabled", "disabled");
		$("#followfees").attr("disabled", "disabled");
	}
	$("#userType").val(value);
	title("UserManagement");
}

function roundNumber(num, dec) {
	var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
	return result;
}

function calNoOfMonth() {

	var salary = $("#salary").val();
	var secu_monthly_deduct = $("#secu_monthly_deduct").val();
	if (salary == "" || salary == null) {
		alert("Please Enter Salary");
		SetFocus("salary");
		return false;
	} else if (secu_monthly_deduct == "" || secu_monthly_deduct == null) {
		alert("First Name Must Be Filled Out");
	} else {
		var NewnoOfMonth = 0;
		if (secu_monthly_deduct == 0) {
			NewnoOfMonth = 0;
		} else {
			var noOfMonth = salary / secu_monthly_deduct;
			NewnoOfMonth = roundNumber(noOfMonth, 2);
		}
		$("#no_of_months_for_secu").val(NewnoOfMonth);
	}
}

function SaveEmpDetails() {
	InsertUserDetails('update', 'user');
	SaveUserDetails('user');
}

function InsertUserDetails(queryType, updateFrom) {

	var userID = $("#userID").val();
	var title = $("#title").val();
	var fName = $.trim($("#fName").val());
	var mName = $.trim($("#mName").val());
	var lName = $.trim($("#lName").val());
	var usernamefor =$.trim($("#userNm").val());
	var password =  $.trim($("#password").val());
	var userType = $("#userType").val();

	if (title == "" || title == null) {
		alert("Please Select User Type");
		SetFocus("title");
		return false;
	} else if (fName == "" || fName == null) {
		alert("Please Enter First Name!");
		SetFocus("fName");
		return false;
	} else if (lName == "" || lName == null) {
		alert("Please Enter Last Name!");
		SetFocus("lName");
		return false;
	} else if (usernamefor == "" || usernamefor == null){
		alert("Please Enter User Name!");
		SetFocus("userNm");
		return false;
	}
	/*
	 * var pattern = /^([a-zA-Z0-9]+\s?)*$/; if (!pattern.test(usernamefor)) {
	 * alert("Please Enter Valid Username..!"); $("#userNm").focus(); return
	 * false; }
	 */
	else if (password == "" || password == null){
		alert("Please Enter Password!");
		SetFocus("password");
		return false;
	}else if (userType == null || userType == "") {
		alert("Please Select User Type");
		SetFocus("userType");
		return false;
	} else if (password != "" || userType == "visitingdoctor") {
		var field = password;
		var mnlen = 6;
		var mxlen = 12;

		if (field.length < mnlen || field.length > mxlen){
			alert("Password Should Be In Between " + mnlen + " and " + mxlen
					+ " Characters");
			return false;
		}
		var pattern = /^[a-zA-Z0-9!@#$%^&*.]{6,12}$/;
		if(!pattern.test(password))
			{
			alert("Please enter valid password ");
			SetFocus("password");
			return false;
			}
		else {
			var inputs = [];

			inputs.push('action=InsertUserDetails');
			inputs.push('userID=' + userID);
			inputs.push('queryType=' + queryType);
			inputs.push('title=' + encodeURIComponent(title));
			inputs.push('fName=' + encodeURIComponent(fName));
			inputs.push('mName=' + encodeURIComponent(mName));
			inputs.push('lName=' + encodeURIComponent(lName));
			inputs.push('userNm=' + encodeURIComponent(usernamefor));
			inputs.push('password=' + encodeURIComponent(password));
			inputs.push('userType=' + userType);
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
					
					if (updateFrom == "admin") {
						alert(r);
						window.location = "UserManagement.jsp";
					}
				}
			});
		}
	}
}

function SaveUserDetails(updateFrom) {
	
	var pan = $("#pan").val();
	var ctc = $("#ctc").val();
	var plvp = $("#plvp").val();
	var doctorpercent = $("#doctorper").val();
	var signature = $("#signature").val();
	var queryType = $("#queryType").val();	
	var empId = $("#empId").val();
	var usernamefor = $.trim($("#userNm").val());
	var password = $.trim($("#password").val());
	var userType = $("#userType").val();
	var title = $("#title").val();
	var ln = $("#ln").val();
	var fn = $("#fn").val();
	var mn = $("#mn").val();
	var docName = title + " " + fn + " " + mn + " " + ln;
	var popup_container2 = $("#popup_container2").val();
	var strAdd = $("#strAdd").val();
	var apartUnit = $("#apartUnit").val();
	var city = $("#city").val();
	var state = $("#state").val();
	var zip = $("#zip").val();
	var mob = $("#mob").val();
	var email = $("#email").val();
	var dojoin = $("#dojoin").val();
	var schoolNm = $("#schoolNm").val();
	var schoolAdd = $("#schoolAdd").val();
	var schoolFrm = $("#schoolFrm").val();
	var schoolTo = $("#schoolTo").val();
	var schoolPercent = $("#schoolPercent").val();
	var colNm = $("#colNm").val();
	var colAdd = $("#colAdd").val();
	var colFrm = $("#colFrm").val();
	var colTo = $("#colTo").val();
	var colPercent = $("#colPercent").val();
	var colDegree = $("#colDegree").val();
	var pgNm = $("#pgNm").val();
	var pgAdd = $("#pgAdd").val();
	var pgForm = $("#pgFrm").val();
	var pgTo = $("#pgTo").val();
	var pgPercent = $("#pgPercemt").val();
	var pgDegree = $("#pgDegree").val();
	var cmpnyNm = $("#compNm").val();
	var cmpnyPhone = $("#compPhone").val();
	var cmpnyAdd = $("#compAdd").val();
	var cmpnyBoss = $("#compBoss").val();
	var jobTitle = $("#jobTitle").val();
	var jobResp = $("#jobResp").val();
	var jobForm = $("#jobFrm").val();
	var jobTo = $("#jobTo").val();
	var fess = $("#fees").val();
	var apLeaves = $("#apLeaves").val();
	var followupFess = $("#followupFess").val();
	var deptName = $("#departments").val();
	var specialization = $("#specialization").val();
	var selSpeciality = $("#selSpeciality").val();
	var qualification = ($("#qualification").val()).trim();
	var designation = ($("#designation").val()).trim();
	var regNo = ($("#regNo").val().trim());
	var motivatorAuthorisation = $("#motivatorAuthorisation").val();
	
	//@Name: irfan khan @date: 11-11-2016 @reason: clinic% and test shared flag
	var clinicPercent=$("#txtClinicPercent").val();
	if(clinicPercent == undefined || clinicPercent == "")
		{
			clinicPercent=0;
		}
	
	
	//@Name: paras suryawanshi @date: 18-5-2017 @reason: doctor type master
    var seldcTypeMaster = $("#seldcTypeMaster").val();
    if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
    	   if(seldcTypeMaster=="" || seldcTypeMaster==null || seldcTypeMaster==undefined  ){
    	   	seldcTypeMaster=0;
    	    }
            }else{
    	seldcTypeMaster=0;
    }
    
    var mulSelunit = $('#mulSelunit').val();
  
	if(mulSelunit!=null && mulSelunit!=""){
		mulSelunit = mulSelunit.toString();
		  //alert("unit id:"+mulSelunit);
	}else{
		
		alert("Please Enter Unit Name!");
		return false;
	}
    //end
	var mulDeptid = $('#deptName').val();
	if(mulDeptid!=null && mulDeptid!=""){
		mulDeptid = mulDeptid.toString();
	}else{
		
		alert("Please Enter Department Name!");
		return false;
	}
	
	
	
	var mulServiceid = $('#serviceName').val();
	if(mulServiceid!=null && mulServiceid!=""){
		mulServiceid = mulServiceid.toString();
	}else{
		
		alert("Please Enter Service Name!");
		return false;
	}
    
	var testSharedFlag;
	if ($('#chkTestSharedFlag').is(':checked')) {
		testSharedFlag = 1;
	} else {
		testSharedFlag = 0;
	}

	var docIni = $("#docIni").val();
	
	var chkOverrideCharges;
	if ($('#chkOverrideCharges').is(':checked')) {
		chkOverrideCharges = "Y";
	} else {
		chkOverrideCharges = "N";
	}
	 
	var sendSMSflag;
	if ($('#sendSMSflag').is(':checked')) {
		sendSMSflag = "Y";
	} else {
		sendSMSflag = "N";
	}
	
	var softwareUsed;
	if ($('#softwareUsed').is(':checked')) {
		softwareUsed = "Y";
	} else {
		softwareUsed = "N";
	}
	
	if (ln == "" || ln == null) {
		alert("Last Name Must Be Filled Out");
		SetFocus("ln");
		return false;
	} else if (fn == "" || fn == null) {
		alert("First Name Must Be Filled Out");
		SetFocus("fn");
		return false;
	} 
	else if (usernamefor == "" || usernamefor == null){
		alert("Please Enter User Name!");
		SetFocus("userNm");
		return false;
	}
	else if (password == "" || password == null){
		alert("Please Enter Password!");
		SetFocus("password");
		return false;
	}else if (userType == null || userType == "") {
		alert("Please Select Employee Type");
		SetFocus("userType");
		return false;
	}
	else if (mob == "") {
		alert("Please Enter Mobile No.");
		SetFocus("mob");
		return false;
	}
	if (userType == "doctor" || userType == "rmo" || userType == "visitingdoctor" || userType == "Pathologist") {
		if (specialization == "0" || specialization == null) {
			alert("Please Select Doctor Specialization");
			SetFocus("speName");
			return false;
		} else if (deptName == "0" || deptName == null) {
			alert("Please Select Doctor Department");
			SetFocus("deptName");
			return false;
		} else if (selSpeciality == "select" || selSpeciality == null) {
			alert("Please Select Speciality");
			SetFocus("selSpeciality");
			return false;
		}
	}

	if (apLeaves == "") {
		alert("Please Enter applicable leaves");
		SetFocus("apLeaves");
		return false;
	} else if (fn == "" || fn == null) {
		alert("First Name Must Be Filled Out");
		SetFocus("ln");
		return false;
	} else if (mob == "") {
		alert("Please Enter Mobile No.");
		SetFocus("mob");
		return false;
	}
	else if (pan == "") {
		alert("Please Enter Pan No.");
		SetFocus("pan");
		return false;
	} else if (ctc == "") {
		alert("Please Enter CTC.");
		SetFocus("ctc");
		return false;
	}
	else if (plvp == "") {
		alert("Please Enter PLVP value.");
		SetFocus("plvp");
		return false;
	}
	else if (doctorpercent == "") {
		alert("Please Enter Doctor percentage.");
		SetFocus("doctorper");
		return false;
	}
	/*
	 * else if (signature == "") { alert("Please Select Signature.");
	 * SetFocus("signature"); return false; }
	 */
	/*
	 * else if (popup_container2 == "") { >>>>>>> .r5357 alert("Please Enter
	 * Date of Birth");
	 * 
	 * return false; }
	 */
	else if (schoolNm != ""
			&& (schoolFrm == "" || schoolTo == "" || schoolPercent == "")) {
		if (schoolFrm == "" || schoolTo == "") {
			alert("School Start Date And End Date Must Be Filled Out");
			SetFocus("ln");
			return false;
		} else if (schoolPercent == "") {
			alert("School Percentage Must Be Filled Out");
			SetFocus("ln");
			return false;
		}
	} else if (colNm != ""
			&& (colFrm == "" || colTo == "" || colPercent == "" || colDegree == "")) {
		if (colFrm == "" || colTo == "") {
			alert("College Start Date And End Date Must Be Filled Out");
			return false;
		} else if (colPercent == "") {
			alert("College Percentage Must Be Filled Out");
			return false;
		} else if (colDegree == "") {
			alert("College Degree Must Be Filled Out");
			return false;
		}

	} else if (pgNm != ""
			&& (pgForm == "" || pgTo == "" || pgPercent == "" || pgDegree == "")) {
		if (pgForm == "" || pgTo == "") {
			alert("Post Graduation Start Date And End Date Must Be Filled Out");
			return false;
		} else if (pgPercent == "") {
			alert("Post Graduation Percentage Must Be Filled Out");
			SetFocus("pgPercent");
			return false;
		} else if (pgDegree == "") {
			alert("Post Graduation Degree Must Be Filled Out");
			SetFocus("pgDegree");
			return false;
		}
	} else if (cmpnyNm != ""
			&& (jobTitle == "" || jobResp == "" || jobForm == "" || jobTo == "")) {
		/*if (jobForm == "" || jobTo == "") {
			alert("Job Start Date And End Date Must Be Filled Out");
		}  */
			if (jobTitle == "") {
			alert("Job Title Must Must Be Filled Out");
		} else if (jobResp == "") {
			alert("Job Responsibilities  Must Be Filled Out");
		}
	} 
	else if($('#usernameValidation').val()=="1"){
		alert("Sorry username already exist..!");
	}
	else
	{
		var inputs = [];
		inputs.push('action=SaveUserDetails');
		inputs.push('ctc=' + ctc);
		inputs.push('pan=' + pan);
		inputs.push('plvp=' + plvp);
		inputs.push('doctorpercent=' + doctorpercent);
		inputs.push('signature=' + encodeURIComponent(signature));
		inputs.push('queryType=' + queryType);
		inputs.push('empId=' + empId);
		inputs.push('userNm=' + encodeURIComponent(usernamefor));
		inputs.push('password=' + encodeURIComponent(password));
		inputs.push('softwareUsed=' + softwareUsed);
		inputs.push('userType=' + userType);
		inputs.push('docName=' + encodeURIComponent(docName));
		inputs.push('dob=' + popup_container2);
		inputs.push('strAdd=' + encodeURIComponent(strAdd));
		inputs.push('apartUnit=' + encodeURIComponent(apartUnit));
		inputs.push('city=' + encodeURIComponent(city));
		inputs.push('state=' + encodeURIComponent(state));
		inputs.push('zip=' + encodeURIComponent(zip));
		inputs.push('mob=' + encodeURIComponent(mob));
		inputs.push('email=' + encodeURIComponent(email));
		inputs.push('doj=' + dojoin);
		inputs.push('schoolNm=' + encodeURIComponent(schoolNm));
		inputs.push('schoolAdd=' + encodeURIComponent(schoolAdd));
		inputs.push('schoolForm=' + encodeURIComponent(schoolFrm));
		inputs.push('schooTo=' + encodeURIComponent(schoolTo));
		inputs.push('schoolPercent=' + encodeURIComponent(schoolPercent));
		inputs.push('colNm=' + encodeURIComponent(colNm));
		inputs.push('colAdd=' + colAdd);
		inputs.push('colFrm=' + colFrm);
		inputs.push('colTo=' + encodeURIComponent(colTo));
		inputs.push('colPercent=' + encodeURIComponent(colPercent));
		inputs.push('colDegree=' + encodeURIComponent(colDegree));
		inputs.push('pgNm=' + encodeURIComponent(pgNm));
		inputs.push('pgAdd=' + encodeURIComponent(pgAdd));
		inputs.push('pgForm=' + pgForm);
		inputs.push('pgTo=' + pgTo);
		inputs.push('pgPercent=' + encodeURIComponent(pgPercent));
		inputs.push('pgDegree=' + encodeURIComponent(pgDegree));
		inputs.push('cmpnyNm=' + encodeURIComponent(cmpnyNm));
		inputs.push('cmpnyPhone=' + encodeURIComponent(cmpnyPhone));
		inputs.push('cmpnyAdd=' + encodeURIComponent(cmpnyAdd));
		inputs.push('cmpnyBoss=' + encodeURIComponent(cmpnyBoss));
		inputs.push('jobTitle=' + encodeURIComponent(jobTitle));
		inputs.push('jobResp=' + encodeURIComponent(jobResp));
		inputs.push('jobForm=' + jobForm);
		inputs.push('jobTo=' + jobTo);
		inputs.push('fess=' + fess);
		inputs.push('followupFess=' + encodeURIComponent(followupFess));
		inputs.push('apLeaves=' + encodeURIComponent(apLeaves));
		inputs.push('deptName=' + encodeURIComponent(deptName));
		inputs.push('specialization=' + encodeURIComponent(specialization));
		inputs.push('selSpeciality=' + encodeURIComponent(selSpeciality));
		inputs.push('chkOverrideCharges=' + chkOverrideCharges);
		inputs.push('sendSMSflag=' + sendSMSflag);
		inputs.push('qualification=' + encodeURIComponent(qualification));
		inputs.push('designation=' + encodeURIComponent(designation));
		inputs.push('regNo=' + encodeURIComponent(regNo));
		inputs.push('motivatorAuthorisation=' + encodeURIComponent(motivatorAuthorisation));
		//@Name: irfan khan @date: 11-11-2016 @reason: clinic% and test shared flag
		inputs.push('clinicPercent=' + encodeURIComponent(clinicPercent));
		inputs.push('testSharedFlag=' + encodeURIComponent(testSharedFlag));
		
		// inputs.push('filePath=' + encodeURIComponent(filePath));
		inputs.push('docIni=' + encodeURIComponent(docIni));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		//@Name: paras suryawanshi @date: 18-5-2017 @reason: doctor type master
		inputs.push('seldcTypeMaster=' + seldcTypeMaster);
		//@Name: paras suryawanshi @date: 18-5-2017 @reason: unit type master dropdown
    	inputs.push('mulSelunit=' + mulSelunit);
    	inputs.push('mulDeptid=' + mulDeptid);
    	inputs.push('mulServiceid=' + mulServiceid);
    		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				if (updateFrom == "admin") {
					window.location = "HRManagement.jsp";
				} else {
					window.location = "EmployeeForm.jsp";
				}
			}
		});
	}
}

function defaultViewUser(callFrom) {

	var inputs = [];
	inputs.push('action=fetchUser');
	inputs.push('callFrom=' + callFrom);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				url : "./ehat/otdata/fetchUser",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					//alert(ajaxResponse);

					pobj1 = eval( ajaxResponse );
					$("#userObj").html(ajaxResponse);
					if (callFrom == "UserManagement") {
						$("#userMangTemp").setTemplate(defaultViewUserTemp);
					} else if (callFrom == "HRDashboard") {
						$("#userMangTemp").setTemplate(defaultViewHrTemp);
					} else if (callFrom == "EmployeeForm") {
						var myObj = JSON.stringify(pobj1.ul[0]);
						$("#myObj").html(myObj);
						$("#empId").val(pobj1.ul[0].ui);

					} else if (callFrom == "OTManagement") {
						var otTemplate = "<option value='0'>-SELECT-</option>{#foreach $T.ul as ul}<option value='{$T.ul.ui}'>{$T.ul.fuNm}</option>{#/for}";
						$("#userMangTemp").setTemplate(otTemplate);
					}
					$("#userMangTemp").processTemplate(pobj1);
				}
			});	
}

function deleteUser(userID) {

	var r = confirm("Confirm To Delete User Details?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeleteUser');
		inputs.push('userID=' + userID);
		inputs.push();
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

var saveUserButtonTemp = '<button class="btn btn-xs btn-success"  data-toggle="tooltip" data-placement="left" title="Save User Details" onclick=InsertUserDetails("insert","admin") > <i class="fa fa-save"></i></button>';

var updateUserButtonTemp = '<button class="btn btn-xs btn-success"  data-toggle="tooltip" data-placement="left" title="Save User Details" onclick=InsertUserDetails("update","admin") > <i class="fa fa-save"></i></button>';

function setSaveUserButtontemp() {
	var sample;
	$("#savebtn").setTemplate(saveUserButtonTemp);
	$("#savebtn").processTemplate(sample);
}

function setUpdateUserButtontemp() {
	var sample;
	$("#savebtn").setTemplate(updateUserButtonTemp);
	$("#savebtn").processTemplate(sample);
}

function editUser(userID) {
	setUpdateUserButtontemp();
	
	$("#userID").val(userID);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.ul.length; i++) {

		if (myArray.ul[i].ui == userID) {
			myObj1 = myArray.ul[i];
			docId = myArray.ul[i].ui;
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	// userBean = eval('(' + myObj + ')');

	var sample;
	$("#infoDiv").setTemplate(editAcountInformationTemp);
	
	$("#infoDiv").processTemplate(sample);
	title("UserManagement");
	
	

	userBean = eval('(' + myObj.decodeSpecialChars() + ')');
	$("#userNm").val(userBean.un);
	/* $("#title").val(userBean.title); */
	/* $("#title").val(userBean.title); */
	// alert(userBean.title);
	// alert(userBean.title);
	setTimeout(function() {
	$("#title").val(userBean.title).atrr('selected','selected');
	},250);
	$("#fName").val(userBean.fname);
	$("#mName").val(userBean.mname);
	$("#lName").val(userBean.lname);
	// $('#fullName').attr('readonly', true);
	// $('#fullName').css("background-color", "lightgrey");
	$("#password").val(userBean.up);
	$("#userType").val(userBean.ut);
	$("#status").val(userBean.st);
	// $("#hospType").val();
	
	
}
function editHr(userID) {

	var myObj1;
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	
	for ( var i = 0; i < myArray.ul.length; i++) {

		if (myArray.ul[i].ui == userID) {
			
			myObj1 = myArray.ul[i];
			docId = myArray.ul[i].ui;
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	
	//console.log(myObj);
	// userBean = eval('(' + myObj + ')');
	//fetchOnLoadDigitalSignImage(userID);

/*	window.location.href = "AdminEmployeeForm.jsp?" + "myObj="
			+ encodeURIComponent(myObj) + "&userID=" + userID;
	*/
	window.location.href = "usrDoc.jsp?" + "myObj="
	+ encodeURIComponent(myObj) + "&userID=" + userID + "&querytype='update'";
}

function getHrDetails(userId) {
	var inputs = [];
	inputs.push('action=getHrDetials');
	inputs.push('userId=' + userId);
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
			$("#userDetails").html(ajaxResponse);

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.listDoctor.length == 0) {
				$("#queryType").val('insert');
			} else {
				$("#queryType").val('update');
				// eNameSplit = (pobj1.listDoctor[0].dn).split(" ");
				// $("#fn").val(eNameSplit[0]);
				// $("#mn").val(eNameSplit[1]);
				// $("#ln").val(eNameSplit[2]);
				
				setTimeout(function() {

				$("#popup_container2").val(pobj1.listDoctor[0].udob);
				$("#strAdd").val(pobj1.listDoctor[0].ad);
				$("#apartUnit").val(pobj1.listDoctor[0].uApart);
				$("#city").val(pobj1.listDoctor[0].city);
				$("#state").val(pobj1.listDoctor[0].state);
				$("#zip").val(pobj1.listDoctor[0].zip);
				$("#mob").val(pobj1.listDoctor[0].mb);
				$("#email").val(pobj1.listDoctor[0].eid);
				$("#dojoin").val(pobj1.listDoctor[0].doj);

				$("#fees").val(pobj1.listDoctor[0].df);
				$("#followfees").val(pobj1.listDoctor[0].flwfees);
				$("#salary").val(pobj1.listDoctor[0].empSal);
				$("#status").val(pobj1.listDoctor[0].st);
				$("#schoolNm").val(pobj1.listDoctor[0].schoolNm);
				$("#schoolAdd").val(pobj1.listDoctor[0].schoolAdd);
				$("#schoolFrm").val(pobj1.listDoctor[0].schoolForm);
				$("#schoolTo").val(pobj1.listDoctor[0].schooTo);
				$("#schoolPercent").val(pobj1.listDoctor[0].schoolPercent);
				$("#colNm").val(pobj1.listDoctor[0].colNm);
				$("#colAdd").val(pobj1.listDoctor[0].colAdd);
				$("#colFrm").val(pobj1.listDoctor[0].colForm);
				$("#colTo").val(pobj1.listDoctor[0].colTo);
				$("#colPercent").val(pobj1.listDoctor[0].colPercent);
				$("#colDegree").val(pobj1.listDoctor[0].colDegree);
				$("#pgNm").val(pobj1.listDoctor[0].pgNm);
				$("#pgAdd").val(pobj1.listDoctor[0].pgAdd);
				$("#pgFrm").val(pobj1.listDoctor[0].pgForm);
				$("#pgTo").val(pobj1.listDoctor[0].pgTo);
				$("#pgPercemt").val(pobj1.listDoctor[0].pgPercent);
				$("#pgDegree").val(pobj1.listDoctor[0].pgDegree);
				$("#compNm").val(pobj1.listDoctor[0].cmpnyNm);
				$("#compPhone").val(pobj1.listDoctor[0].cmpnyPhone);
				$("#compAdd").val(pobj1.listDoctor[0].cmpnyAdd);
				$("#compBoss").val(pobj1.listDoctor[0].cmpnyBoss);
				$("#jobTitle").val(pobj1.listDoctor[0].jobTitle);
				$("#jobResp").val(pobj1.listDoctor[0].jobResp);
				$("#jobFrm").val(pobj1.listDoctor[0].jobForm);
				$("#jobTo").val(pobj1.listDoctor[0].jobTo);
				$("#fess").val(pobj1.listDoctor[0].df);
				$("#followupFess").val(pobj1.listDoctor[0].flwfees);
				$("#apLeaves").val(pobj1.listDoctor[0].aplLeaves);
				$("#pan").val(pobj1.listDoctor[0].pan);
				$("#ctc").val(pobj1.listDoctor[0].ctc);
				$("#plvp").val(pobj1.listDoctor[0].plvp);
				$("#doctorper").val(pobj1.listDoctor[0].dpercent);
				$("#signature").val(pobj1.listDoctor[0].signature);
				$("#folloupFees").val(pobj1.listDoctor[0].folloupFees);
			//	$("#signature").val(pobj1.listDoctor[0].Docsign);
				$("#mobile").val(pobj1.listDoctor[0].mb);
				$("#folloupWeekend").val(pobj1.listDoctor[0].folloupWeekend);
				$("#softwareUsed").val(pobj1.listDoctor[0].softwareUsed);
	
				$("#txtClinicPercent").val(pobj1.listDoctor[0].clinicPercent);
				if (pobj1.listDoctor[0].testSharedFlag == 1) {
					$('#chkTestSharedFlag').attr('checked', 'checked');
				}
				
				// setTimeout(function() { // alert(pobj1.listDoctor[0].spl);
					$("#specialization").val(pobj1.listDoctor[0].sp);
					$("#departments").val(pobj1.listDoctor[0].dept);
					$("#selSpeciality").val(pobj1.listDoctor[0].spl);
				// }, 100);
					
				$("#qualification").val(pobj1.listDoctor[0].qualification);
				$("#designation").val(pobj1.listDoctor[0].designation);
				$("#regNo").val(pobj1.listDoctor[0].regNo);
				
				$("#docIni").val(pobj1.listDoctor[0].docIni);
				$("#doctorfee").val(pobj1.listDoctor[0].doctorfee);
				$("#fixedIncome").val(pobj1.listDoctor[0].fixedIncome);
				$("#referalPercent").val(pobj1.listDoctor[0].referalPercent);
				$("#referalPercent").val(pobj1.listDoctor[0].referalPercent);
				
				//motivator Authorisation Field added by Touheed Khan @date : 23-Aug-2016
				$("#motivatorAuthorisation").val(pobj1.listDoctor[0].motivatorAuthorisation);
				if (pobj1.listDoctor[0].overFlg == "Y") {
					$('#chkOverrideCharges').attr('checked', 'checked');
				}
				if (pobj1.listDoctor[0].softwareUsed == "Y") {
					$('#softwareUsed').attr('checked', 'checked');
				}
			}, 300);
			}
		}
	});
}

function saveDoctorDetails() {

	var userID = $("#txtUserID").val();

	var dname = $("#dname").val();
	var add = $("#add").val();
	var contact = $("#contact").val();
	var email = $("#email").val();
	var education = $("#education").val();
	var specialization = $("#specialization").val();
	var utype = $("#selNewUser").val();
	var uname = $("#uname").val();
	var dtype = $("#selNewUser").val();
	var password = $("#password").val();
	var date = $("#date").val();
	var status = $("#status").val();
	var queryType = $("#queryType").val();
	var Fees = $("#Fees").val();

	var inputs = [];

	inputs.push('action=SaveDoctorDetails');
	inputs.push('queryType=' + queryType);
	inputs.push('userID=' + userID);
	inputs.push('dname=' + encodeURIComponent(dname));
	inputs.push('uname=' + encodeURIComponent(uname));
	inputs.push('password=' + encodeURIComponent(password));
	inputs.push('date=' + date);
	inputs.push('status=' + status);
	inputs.push('dtype=' + dtype);
	inputs.push('utype=' + utype);
	inputs.push('education=' + encodeURIComponent(education));
	inputs.push('specialization=' + encodeURIComponent(specialization));
	inputs.push('add=' + encodeURIComponent(add));
	inputs.push('contact=' + encodeURIComponent(contact));
	inputs.push('email=' + encodeURIComponent(email));
	inputs.push('Fees=' + encodeURIComponent(Fees));

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
			alert(r);
			// $("#dispMessage").html(r);
			// window.reload();
		}
	});
}

function searchViewUser(callFrom) {
	var strValue = $("#byName").val();
	var byId = $("#byId").val();
	
	if (strValue != "" && byId != "") {
		alert("Please Search By Either User Name OR User Id!");
		return false;
	}else if (strValue == "" && byId == "") {
		alert("Please Enter User Name OR User Id!");
		return false;
	} 
		
		if (strValue != "") {
			searchBy = "byName";
			value = strValue;
		} else if (byId != "") {
			searchBy = "byId";
			value = byId;
		}
		
		var inputs = [];

		inputs.push('action=searchUser');
		inputs.push('strValue=' + encodeURIComponent(value));
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		
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
				
				pobj1 = eval('(' + ajaxResponse + ')');
				var noOfUsers = pobj1.ul.length;
				count = 1;
				if (noOfUsers == 0) {
				
					alert("User Is Not Available.");
					$("#byName").val("");
					location.reload();
				}
				if (callFrom == 'AcManag') {
					$("#userMangTemp").setTemplate(defaultViewUserTemp);
					$("#userMangTemp").processTemplate(pobj1);
					$("#byName").val("");
				} else if (callFrom == 'HRDashBoard') {
					$("#userMangTemp").setTemplate(defaultViewHrTemp);
					$("#userMangTemp").processTemplate(pobj1);
					$("#byName").val("");
				}
			}
		});
		
		setTimeout(function(){userAccess();},100);
	}

function saveOtherUserDetails() {
	var userid = $("#userid").val();

	var name = $("#name").val();
	var uname = $("#uname").val();
	var password = $("#password").val();
	var date = $("#date").val();
	var status = $("#status").val();
	var type = $("#type").val();
	var education = $("#education").val();
	var occupation = $("#occupation").val();
	var add = $("#add").val();
	var contact = $("#contact").val();
	var email = $("#email").val();

	var inputs = [];

	inputs.push('action=SaveOtherUserDetails');
	inputs.push('queryType=insert');
	inputs.push('userid=' + userid);
	inputs.push('name=' + encodeURIComponent(name));
	inputs.push('uname=' + encodeURIComponent(uname));
	inputs.push('password=' + encodeURIComponent(password));
	inputs.push('date=' + date);
	inputs.push('status=' + status);
	inputs.push('type=' + encodeURIComponent(type));
	inputs.push('education=' + encodeURIComponent(education));
	inputs.push('occupation=' + encodeURIComponent(occupation));
	inputs.push('add=' + encodeURIComponent(add));
	inputs.push('contact=' + encodeURIComponent(contact));
	inputs.push('email=' + email);

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
			alert(r);
			// $("#dispMessage").html(r);
			// window.reload();
		}
	});
}
/** *************************** end User mgmt****************** */

/** *************************************start item management****************** */

function saveItem(Type) {
	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var ReadStvalue = rowCount - addrowCount;
	var i;
	if (Type == "pharmacy") {
		i = 0;
	} else {
		i = 1;
	}

	var ItemString = "";
	for (i; i <= rowCount; i++) {
		count++;

		var itn = $("#itn" + i + "").val();

		var ip = $("#ip" + i + "").val();
		var aq = $("#aq" + i + "").val();
		var id = $("#id" + i + "").val();
		var hid = $("#hid" + i + "").val();
		var mq = $("#mq" + i + "").val();
		ItemString = ItemString + "@" + itn + "," + ip + "," + aq + "," + id
				+ "," + hid + "," + mq;

	}
	var oname = $("#itn" + rowCount + "").val();
	var oprice = $("#ip" + rowCount + "").val();
	var quantity = $("#aq" + rowCount + "").val();
	var minQty = $("#mq" + rowCount + "").val();

	if (oname == "") {
		alert("Item Name Must Be Filled Out");
		SetFocus("itn1");
	} else if (oprice == "") {
		alert("Item Price Must Be Filled Out");
		SetFocus("ip1");
	} else if (quantity == "") {
		alert("Item Available Quantity Must Be Filled Out");
		SetFocus("aq1");
	} else if (minQty == "") {
		alert("Item Minimum Quantity Must Be Filled Out");
		SetFocus("mq1");
	} else {

		var inputs = [];
		inputs.push('itn=' + encodeURIComponent(itn));
		inputs.push('Type=' + encodeURIComponent(Type));
		inputs.push('ip=' + encodeURIComponent(ip));
		inputs.push('aq=' + encodeURIComponent(aq));
		inputs.push('ItemString=' + encodeURIComponent(ItemString));
		inputs.push('action=SaveItem');
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
				alert(ajaxResponse);
				// location.reload();
			}
		});
	}
}

function saveOtherItem() {

	var rowCount = ($("#RowCount").val());
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var ReadStvalue = rowCount - addrowCount;
	var i;

	var ItemString = "";
	for (i = 1; i <= rowCount; i++) {
		count++;

		var on = $("#on" + i + "").val();
		// var op = $("#op" + i + "").val();
		var od = $("#od" + i + "").val();
		
		if (od == "") {
			od = 0;
		}
		ItemString = ItemString + "@" + on + "," + od;
	}

	var inputs = [];
	inputs.push('on=' + encodeURIComponent(on));
	// inputs.push('op=' + encodeURIComponent(op));
	inputs.push('od=' + encodeURIComponent(od));
	inputs.push('ItemString=' + (ItemString));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('action=SaveOtherItem');
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

			alert(ajaxResponse);
			setAddOtherItem();
			setItemManagementTemp2();
		}
	});
	// }
}

function toCreateItemDiv1(RowCount) {

	var k = 1;
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "removes" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	x.setAttribute('style', 'width: 100%; height: 28px;');
	document.getElementById("DRRDiv").appendChild(x);
	document.getElementById(divId).innerHTML = "<td style='height: 21.5px; width:211px;'>"
			+ "<label style='margin-top: 8px;' class='TextFont'>"
			+ (rowCount)
			+ "</label></td>"
			+ "<td style='height: 21.5px; width:213px;'>"
			+ "<label style='margin-top: 8px;' class='TextFont'></label></td>"
			+ "<td style='height: 21.5px; width:426px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='on"
			+ rowCount
			+ "' name='textfield' maxlength='150';></td>"
			+ "<td style='height: 21.5px; width:213px;'><input type='checkbox' style='margin-top: 12px;' name='chk"
			+ rowCount
			+ "' id='chk'+ rowCount + '' /></td>"
			+ "<td style='height: 21.5px; display: none'><input type='hidden' class='form-control input-SmallText' style='margin-top: 8px;' id='od"
			+ rowCount
			+ "'></td>"
			+ "<td style='height: 21.5px; display: none'><input type='hidden' class='form-control input-SmallText' style='margin-top: 8px;' id='hid"
			+ rowCount + "'></td>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(k);
	k++;
}

function toRemoveItemDiv1(RowCount) {
	var r = confirm("Once Bill Component is Saved Can Not Be Deleted ! Are You Sure To Delete Bill Component ");
	if (r == true) {
		alert("Once Bill Component is Deleted Payment Given For This Component Can Not Be Shown in IPD Billing");
		return false;
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	
	for ( var m = 1; m <= rowCount; m++) {

		var $radios = $('input:checkbox[name=chk' + m + ']');
		if ($radios.is(':checked') == true) {
			id = $("#od" + m).val();
			
			if (id != "") {
				var inputs = [];
				inputs.push('action=deleteOtherItem');
				inputs.push("id=" + id);
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
					}
				});
			}
			$("#removes" + m).remove();
			$("#div" + m).remove();
			rowCount--;

			// $("#RowCount").val(rowCount);
			$("#addRowCount").val(rowCount);
		}
	}
	}
}

function toCreateItemDiv(RowCount) {
	var j = 1;
	var hiddenRowCount = document.getElementById(RowCount);

	var rowCount = hiddenRowCount.value;
	if (rowCount == -1) {
		rowCount = 0;
	}

	rowCount++;
	rowId = "remove" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	x.setAttribute('class', 'col-md-12-1');
	x.setAttribute('style', 'margin-top:0px');
	document.getElementById("DRRDiv").appendChild(x);

	document.getElementById(rowId).innerHTML = "<td style='height: 21.5px; width:93px;'>"
			+ "<label style='margin-top: 8px;' class='TextFont'>"
			+ (rowCount)
			+ "</label></td>"
			+ "<td style='height: 21.5px; width:383px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='itn"
			+ rowCount
			+ "' name='textfield' maxlength='150'></td>"
			+ "<td style='height: 21.5px; width:190px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='ip"
			+ rowCount
			+ "' name='textfield' maxlength='8' onkeypress='return validateNumbers(event)'></td>"
			+ "<td style='height: 21.5px; width:190px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='aq"
			+ rowCount
			+ "' name='textfield' maxlength='6' onkeypress='return validateNumbers(event)'></td>"
			+ "<td style='height: 21.5px; width:190px;'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='mq"
			+ rowCount
			+ "' name='textfield' maxlength='6' onkeypress='return validateNumbers(event)'></td>"
			+ "<td style='height: 21.5px; width:93px;'><input type='checkbox' style='margin-top: 12px;' name='chk"
			+ rowCount
			+ "' id='chk'+ rowCount + '' /></td>"
			+ "<td style='height: 21.5px; width:2px; display: none'><input type='hidden' class='form-control input-SmallText' style='margin-top: 8px;' id='id"
			+ rowCount
			+ "'></td>"
			+ "<td style='height: 21.5px; width:2px; display: none'><input type='hidden' class='form-control input-SmallText' style='margin-top: 8px;' id='hid"
			+ rowCount + "'></td>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(j);
	j++;
}

function toRemoveDivItem(RowCount, type) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	
	for ( var m = 1; m <= rowCount; m++) {

		var $radios = $('input:checkbox[name=chk' + m + ']');
		
		if ($radios.is(':checked') == true) {
			id = $("#id" + m).val();
			
			if (id != " ") {

				var inputs = [];
				inputs.push('action=deleteItem');
				inputs.push("type=" + type);
				inputs.push("id=" + id);
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
					}
				});
			}

			$("#remove" + m).remove();
			$("#div" + m).remove();
		}
	}
}

function dispItemSearch(type) {
	sr = 1;
	var byItemName = $("#byItemName").val();
	var searchBy;
	var value;
	if (byItemName == "") {
		alert("please inserst Item Name for search");
	} else {
		searchBy = "byItemName";
		value = byItemName;
		var inputs = [];
		inputs.push('action=ShowTopItem');
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('type=' + type);
		inputs.push('showFun=showSearchItem');

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
				pobj1 = eval('(' + ajaxResponse + ')');
				
				if (pobj1.il.length == 0) {
					alert("Item Not Found");
				} else if (type == "pharmacy") {
					$("#ItemManage").setTemplate(pharmacyItemManagementTemp);
					$("#ItemManage").processTemplate(pobj1);
				} else {
					$("#ItemManage").setTemplate(itemManagementTemp);
					$("#ItemManage").processTemplate(pobj1);
				}
				/*for ( var i = 1; i < 12; i++) {
					$("#on" + i).attr("disabled", "disabled");
					$("#op" + i).attr("disabled", "disabled");
					$("#chk" + i).attr("disabled", "disabled");
					//For user Access
					$("#on" + i).removeAttr('class');
					$("#op" + i).removeAttr('class');
					$("#chk" + i).removeAttr('class');
				}
				userAccess();*/
			}
		});
	}
};

function searchBothItems() {
	var itemType = ($('input:radio[name=Item]:checked').val());
	var pharmacyType = ($('input:radio[name=pharmacy]:checked').val());
	if (itemType == "addItem") {
		dispItemSearch();
	} else if (pharmacyType == "addPharmacy") {
		dispItemSearch('pharmacy');
	} else {
		dispOtherItemSearch();
	}
}

var otherItemManagementTemp2 = "<div style='width: 100%; padding-left: 0%;'>" +
		"	<div style='width: 100.2%; background-color: #436a9d; padding-bottom: 1%; padding-top: 1%; font-weight: bold; padding-left: 0.2%'>" +
		"	<div style='width: 100%;'> <div	style='width: 5.5%; border: 1px solid #FFF; color: #FFF; text-align: center; padding-right: 2%'>#</div>	" +
		"	<div style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Other Item ID</div>	" +
		"	<div style='width: 62%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Item	Name</div>				" +
		"   <div style='width: 15%;padding-left-3%;'>	<input type='button' value='+' onclick=toCreateItemDiv1('RowCount') />" +
		"   <input type='button' value='-' onclick=toRemoveItemDiv1('RowCount') /></div></div></div></div>" +
		"   <div style='width: 100.2%; height: 320px; overflow-y: scroll; border: 1px solid #436a9d;'	id='DRRDiv'> {#foreach $T.ol as ol}	<div id='removes{rowCount}'	style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>" +
		"	<div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr1++}.</div>" +
		"	<div style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>{$T.ol.od}</div>" +
		"   <div style='width: 64%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='width: 90%;' type='text' name='textfield' id='on{rowCount}' value='{$T.ol.on}'  disabled='disabled'  /></div>" +
		"	<div div style='width: 4%; text-align: center; height: 25px; padding-left: 3%; padding-top: 3px;'><input type='checkbox' value='' name='chk{rowCount}' id='chk{rowCount}'  {#if $T.ol.od < 9} disabled='disabled' {#/if}  > </div> <input style='width: 90%;' type='hidden' name='textfield' id='od{rowCount}' value='{$T.ol.od}' /><input style='width: 90%;' type='hidden' name='textfield' id='hid{rowCount}' value=' ' /></div>	" +
		"   <input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />{#/for}</div><input type='hidden' value='' id='addRowCount' />" +
		"   <input type='hidden' value='{--rowCount}' id='RowCount' />";

function dispOtherItemSearch() {
	sr1 = 1;
	var byItemName = $("#byItemName").val();
	var searchBy;
	var value;
	if (byItemName == "") {
		alert("please inserst something for search");
	} else {
		searchBy = "byItemName";
		value = byItemName;
		var inputs = [];
		inputs.push('action=ShowOtherTopItem');
		inputs.push('searchBy=' + encodeURIComponent(searchBy));
		inputs.push('value=' + encodeURIComponent(value));
		inputs.push('showFun=showSearchOtherItem');
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
				pobj1 = eval('(' + ajaxResponse + ')');

				if (pobj1.ol.length == 0) {
					alert("Item Not Found.");
				} else {
					$("#ItemManage").setTemplate(itemManagementTemp2);
					$("#ItemManage").processTemplate(pobj1);
				}
			}
		});
	}
};

var saveItemTemp = "<input 	style='font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;'	type='button' value='Save Now' onclick='saveItem()' class='editUserAccess' disabled='disabled' />";
var savePharmacyTemp = "<input 	style='font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;'	type='button' value='Save Now' onclick=saveItem('pharmacy') class='editUserAccess' disabled='disabled' />";
var saveOtherItemTemp = "<input 	style='font-size: 11px; background-color: #FC0; border: none; width: 100%; padding: 5px; cursor: pointer;'	type='button' value='Save Now' onclick='saveOtherItem()' class='editUserAccess' disabled='disabled' />";

function setsaveItemTemp() {
	var pobj1;
	$("#savebutton").setTemplate(saveItemTemp);
	$("#savebutton").processTemplate(pobj1);
}

function setsavePharmacyTemp() {
	var pobj1;
	$("#savebutton").setTemplate(savePharmacyTemp);
	$("#savebutton").processTemplate(pobj1);
}

function setSaveOtherItemTemp() {
	var pobj1;
	$("#savebutton").setTemplate(saveOtherItemTemp);
	$("#savebutton").processTemplate(pobj1);
}

function setItemManagementTemp(Type, alphabet) {
	sr = 1;
	var inputs = [];
	inputs.push('action=fetchDefItem');
	inputs.push('searchType=' + Type);
	inputs.push('alphabet=' + alphabet);
	var str = inputs.join('&');
	jQuery
			.ajax({
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

					if (Type == "onload") {
						
						$("#saveBtn").attr("onclick", "saveItem()");

						$('input[name="Item"]').attr('checked', true);
						pobj1 = eval('(' + ajaxResponse + ')');
						$("#ItemManage").setTemplate(itemManagementTemp);
						$("#ItemManage").processTemplate(pobj1);

					} else if (Type == "pharmacyTemp") {
						pobj1 = eval('(' + ajaxResponse + ')');
						$("#ItemManage").setTemplate(itemManagementTemp);
						$("#ItemManage").processTemplate(pobj1);
					} else if (Type == "distributorItem") {
						$("#Item").html(ajaxResponse);
						pobj1 = eval('(' + ajaxResponse + ')');
						ilSize = pobj1.il.length;
						i = 1;
						$("#ItemList").show();
						$("#alphabet").show();
						$("#distMangTemp").height("320px");
						/*
						 * $.each($('#chk:checked'), function() {
						 * allVals.push($(this).val()); });
						 * 
						 * for ( var k = 1; k <= ilSize; k++) {
						 * allprice.push($('#iprice' + k).val()); }
						 */

						$("#ItemList").setTemplate(
								addDistributerDetailsTempItem);
						$("#ItemList").processTemplate(pobj1);
						// return false;
						if ($("#queryType").val() == "update") {
							var distItemList1 = $("#distItem").html();
							distBean1 = eval('(' + distItemList1 + ')');
							
							for ( var j = 0; j < distBean1.distributerList[0].distItemList.length; j++) {
								for ( var k = 1; k <= ilSize; k++) {
									var itemid = $('input[name=chk' + k + ']')
											.val();
									if (distBean1.distributerList[0].distItemList[j].iid == itemid)

									{
										$('input[name=chk' + k + ']').attr(
												'checked', true);
										$("#iprice" + k)
												.val(
														distBean1.distributerList[0].distItemList[j].ip);
									}
								}
							}
						}

						for ( var irrr = 1; irrr < 27; irrr++) {

							if ($("#" + irrr).html() == alphabet) {

								$("#" + irrr).css('color', 'red');
							} else {
								$("#" + irrr).css('color', 'purple');
							}
						}

					} else if (Type == "Nursingtrolley") {
						nursigTrolleyDiv = $("#nursigTrolleyDiv").html();
						
						distBean1 = eval('(' + nursigTrolleyDiv + ')');
						
						$("#Item").html(ajaxResponse);
						pobj1 = eval('(' + ajaxResponse + ')');
						ilSize = pobj1.il.length;
						i = 1;
						$("#ItemList").show();
						$("#alphabet").show();

						$("#ItemList").setTemplate(addTrolleyDetailsTempItem);
						$("#ItemList").processTemplate(pobj1);

						for ( var j = 0; j < distBean1.ntl.length; j++) {
							for ( var k = 1; k <= ilSize; k++) {
								var itemid = pobj1.il[k - 1].ii;
								if (distBean1.ntl[j].iid == itemid)
								{
									$('input[name=chk' + itemid + ']').attr(
											'checked', true);
								}
							}
						}
					} else if (Type == "Cathtrolley") {
						cathTrolleyDiv = $("#cathTrolleyDiv").html();
						
						distBean1 = eval('(' + cathTrolleyDiv + ')');
						
						$("#Item").html(ajaxResponse);
						pobj1 = eval('(' + ajaxResponse + ')');
						ilSize = pobj1.il.length;
						i = 1;
						$("#ItemList").show();
						$("#alphabet").show();

						$("#ItemList").setTemplate(addTrolleyDetailsTempItem);
						$("#ItemList").processTemplate(pobj1);

						for ( var j = 0; j < distBean1.ctl.length; j++) {
							for ( var k = 1; k <= ilSize; k++) {
								var itemid = pobj1.il[k - 1].ii;
								if (distBean1.ctl[j].iid == itemid)

								{
									$('input[name=chk' + itemid + ']').attr(
											'checked', true);
								}
							}
						}
					} else if (Type == "pharmacy") {
						pobj1 = eval('(' + ajaxResponse + ')');
						window.location.href = "ItemManagement.jsp?"
								+ "ajaxResponse="
								+ encodeURIComponent(ajaxResponse)
								+ "&showSaveBtn=yes" + "&onload=yes";
					} else {
						pobj1 = eval('(' + ajaxResponse + ')');
						window.location.href = "ItemManagement.jsp?"
								+ "ajaxResponse="
								+ encodeURIComponent(ajaxResponse)
								+ "&showSaveBtn=yes";
					}
				}
			});
}

function setAddItem() {

	$('input[name="Item"]').attr('checked', true);
	divPi = $("#div1").html();
	pobj1 = eval('(' + divPi + ')');
	$("#ItemManage").setTemplate(itemManagementTemp);
	$("#ItemManage").processTemplate(pobj1);
}

function setItemManagementTemp2() {

	sr1 = 1;
	var inputs = [];
	inputs.push('action=fetchDefotheritem');

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
			
			window.location.href = "ItemManagement.jsp?" + "myObj="
					+ encodeURIComponent(ajaxResponse) + "&onload=yes";
		}
	// setAddOtherItem();
	});

}

var itemManagementTemp2 = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered' style='margin-top: 20px;width: 1065px;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><label class='TextFont'>#No</label></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><label class='TextFont'>Other Item ID</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Item Name</label></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'>"
		+ "<input type='button' value='+' onclick=toCreateItemDiv1('RowCount') />"
		+ "<input type='button' value='-' onclick=toRemoveItemDiv1('RowCount') /></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-md-12-1' style='margin-top: -21px; overflow-y: scroll; height: 358px; max-height: auto;border:1px solid #ddd;'>"
		+ "<table class='table table-bordered table-condensed'>"
		+ "<tbody class='col-md-12-1' id='DRRDiv'>"
		+ "{#foreach $T.ol as ol}"
		+ "<tr id='removes{rowCount}'>"
		+ "<td style='height: 21.5px; width:211px;' class='col-md-1-1'>"
		+ "<label style='margin-top: 8px;' class='TextFont'>{sr1++}.</label></td>"
		+ "<td style='height: 21.5px; width:213px;' class='col-md-1-1'>"
		+ "<label style='margin-top: 8px;' class='TextFont'>{$T.ol.od}</label></td>"
		+ "<td style='height: 21.5px; width:426px;' class='col-md-2-1'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;width: 100%;' name='textfield' id='on{rowCount}' value='{$T.ol.on}' />"
		+ "</td>"
		+ "<td style='height: 21.5px; width:213px;' class='col-md-1-1'>"
		+ "<input type='checkbox' style='margin-top: 10px;' name='chk{rowCount}' id='chk{rowCount}'/>"
		+ "<input style='width: 90%;' type='hidden' name='textfield' id='od{rowCount}' value='{$T.ol.od}' />"
		+ "<input style='width: 90%;' type='hidden' name='textfield' id='hid{rowCount}' value=' ' />"
		+ "</td>"
		+ "<input type='hidden' value='{rowCount++}' id='txtRowCount' name='txtRowCount' />"
		+ "</tr>" + "{#/for}"
		+ "<input type='hidden' value='' id='addRowCount' />"
		+ "<input type='hidden' value='{--rowCount}' id='RowCount' />"
		+ "</tbody>" + "</table>" + "</div>";

function setAddOtherItem() {

	$("#saveBtn").attr("onclick", "saveOtherItem()");

	$('input[name="OtherItem"]').attr('checked', true);
	$('input[name="Item"]').attr('checked', false);
	$('input[name="pharmacy"]').attr('checked', false);

	divPi = $("#div3").html();
	pobj1 = eval('(' + divPi + ')');
	$("#ItemManage").setTemplate(itemManagementTemp2);
	$("#ItemManage").processTemplate(pobj1);
	for ( var i = 1; i < 12; i++) {
		$("#on" + i).attr("disabled", "disabled");
		$("#op" + i).attr("disabled", "disabled");
		$("#chk" + i).attr("disabled", "disabled");
		//For user Access
		$("#on" + i).removeAttr('class');
		$("#op" + i).removeAttr('class');
		$("#chk" + i).removeAttr('class');
	}
	// $("#searchItemDiv").hide();
}

function setPharmacyManagementTemp(Type) {

	$("#searchItemDiv").show();
	$("#saveBtn").attr("onclick", "saveItem('pharmacy')");
	$('input[name="Item"]').attr('checked', false);
	$('input[name="OtherItem"]').attr('checked', false);
	$('input[name="pharmacy"]').attr('checked', true);

	var inputs = [];
	inputs.push('action=fetchDefItem');
	inputs.push('searchType=' + Type);

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

			if (Type == "pharmacy") {
				sr = 1;
				pobj1 = eval('(' + ajaxResponse + ')');
				$("#ItemManage").setTemplate(pharmacyItemManagementTemp);
				$("#ItemManage").processTemplate(pobj1);
			}
		}
	});
}

/**
 * ******************end Item Management****************
 */
/** ********************Operation Management************************************ */
function defaultViewOperation() {

	$("#saveBtn").html("");
	var inputs = [];
	inputs.push('action=fetchOperation');

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchOperation",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#operationDataDiv").val(ajaxResponse);
			pobj1 = ajaxResponse;

			$("#OperationMgmContent").setTemplate(defaultViewOperationTemp);
			$("#OperationMgmContent").processTemplate(pobj1);
		}
	});
}

function setOperation() {
	var sampleBean = 0;
	$("#searchTempContent").html("");
	setSaveOperationButtonTemp();
	var inputs = [];
	inputs.push('action=newOperationID');

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/newOperationID",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			operationId = r;
			// pobj1 = eval('(' + ajaxResponse + ')');
			
			
			$("#OTId").val(operationId);
			$("#OperationContent").setTemplate(addOperationTemp);
			$("#OperationContent").processTemplate(sampleBean);
			fetchPTName();
			// fetchDoctorSpecilizationsForOperationManagement();
			featchOTGroupDetails();
			$("#oid").val(operationId);
		}
	});
}

var allOTGroupDetailsTemp = "<option value='Select'>-Select-</option>{#foreach $T.grpli as grpli}<option value='{$T.grpli.grpid}'>{$T.grpli.grpNm}</option>{#/for}";

function featchOTGroupDetails() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchGroupDetails');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchGroupDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			//$("#GroupeDiv").val(ajaxResponse);
			pobj1 =  ajaxResponse ;
			$("#opstate").setTemplate(allOTGroupDetailsTemp);
			$("#opstate").processTemplate(pobj1);
		}
	});
}

var procedureTypeForOperationName = "<option	value='Select'>-Select-</option>{#foreach $T.lipt as lipt}<option value='{$T.lipt.idpt}'>{$T.lipt.ptnm}</option>{#/for}";

function fetchPTName() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchPTName');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data :  "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchPTName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			pobj1 =  ajaxResponse ;
			$("#opType").setTemplate(procedureTypeForOperationName);
			$("#opType").processTemplate(pobj1);
		}
	});
}

function calTotalPrice1() {
	setTimeout(function() {
		calTotalPrice();
	}, 500);

}
function calTotalPrice() {
	if (document.getElementById('list').length == 0) {
		alert("You have not add single equipment. So Total Price is 0");
		$("#ePrice").val(0);
		return false;
	}
	
	var temp = 0;
	var eprice;
	var eleArr = "";
	$('#list').find('option').each(function() {
		eleArr = eleArr + $(this).html();
	});

	var eqpQtySplit = eleArr.split("\n");

	for (i = 0; i < eqpQtySplit.length - 1; i++) {
		var eqp = eqpQtySplit[i].split("-");

		var item = eqp[0];
		var qty = eqp[1];

		var inputs = [];
		inputs.push('action=fetchItemPries');
		inputs.push('equipments=' + encodeURIComponent(item));
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

				pobj1 = eval('(' + ajaxResponse + ')');
				var j = parseInt((pobj1.il[0].ip));

				temp = (j * qty) + temp;
				eprice = temp;
				$("#ePrice").val(eprice);
			}
		});
	}
}

function addItem() {
	if ($("#equipments").val() == "" && $("#qty").val() == "") {
		alert("Please select Equipments & Quantity");
		return false;
	} else if ($("#equipments").val() != "" && $("#qty").val() == "") {
		alert("Please select  Quantity");
		return false;
	} else if ($("#equipments").val() == "" && $("#qty").val() != "") {
		alert("Please select  Equipments");
		return false;
	}
	var list = $("#list").val();
	var eq = $("#equipments").val();
	var qty = $("#qty").val();
	var add = eq + "-" + qty + "\n";
	var flag1 = 0;

	$('#list').find('option').each(function() {
		var eqpt = $(this).html().split("-");
	
		if (eqpt[0] == eq) {
			var qty1 = parseInt(eqpt[1]) + parseInt(qty);
			var add = eqpt[0] + "-" + qty1 + '\n';
			$(this).html(add);
			$("#equipments").val("");
			$("#qty").val("");
			flag1 = 1;
		}
	});
	if (flag1 == 0) {
		var o = new Option("option text", "value");
		$(o).html(add);
		$("#list").append(o);
		$("#equipments").val("");
		$("#qty").val("");
	}
}

function calTotalCharge() {

	var tmp = parseInt($("#ePrice").val()) + parseInt($("#eCharge").val());
	$("#tCharge").val(tmp);
}

function setAddOperationButtonTemp() {
	var sample;
	$("#AddOperation").setTemplate(addOperationBtnTemp);
	$("#AddOperation").processTemplate(sample);
}

function setSaveOperationButtonTemp() {
	var sample;
	$("#saveNowbutton").setTemplate(saveOperationButtonTemp);
	$("#saveNowbutton").processTemplate(sample);
}

var count = 1;
function searchOperation() {
	if ($("#strValue").val() == "") {
		alert("Please Enter The Operation Name");
		return false;
	}

	else {

		var strValue = $("#strValue").val();

		var inputs = [];
		inputs.push('strValue=' + encodeURIComponent(strValue));

		inputs.push('action=searchOperation');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "AdminServlet",
			url : "./ehat/otdata/searchOperation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				$("#operationDataDiv").val(ajaxResponse);
				pobj1 = ajaxResponse;
				countForOp = 1;
				if (pobj1.ol.length == 0) {
					alert("Procedure Not Found");
				} else {
					$("#OperationMgmContent").setTemplate(
							defaultViewOperationTemp);
					$("#OperationMgmContent").processTemplate(pobj1);
				}
			}
		});
	}
}

var halltypetemp = "<table width='100%' border='1'><tr width='100%'><td width='33%'>Hall Type</td><td width='33%'>Surgeon</td><td width='33%'>anesthesist</td></tr>{#foreach $T.htli as htli}	     <tr width='100%'>	<td width='33%'>{$T.htli.htnm}<input type='hidden' id='hallid{k}' value='{$T.htli.idht}'></td>	<td width='33%'><input type='text' style='width: 90%;'	id='surgeonCharge{k}'></td>	<td width='33%'><input type='text' style='width: 90%;'	id='anesCharge{k++}'></td></tr>{#/for}<input type='hidden' id='hallcount' value='{--k}'></table>";

function editOperation(oid) {
	k = 1;
	$("#searchTempContent").html("");
	$("#AddOperation").html("");
	setAddOperationButtonTemp();
	setSaveOperationButtonTemp();
	ajaxResponse = $("#operationDataDiv").val();

	myArray = ajaxResponse;
	var myObj1 = "";
	for ( var i = 0; i < myArray.ol.length; i++) {

		if (myArray.ol[i].oi == oid) {

			myObj1 = myArray.ol[i];
			break;
		}
	}
	/*
	 * var divfetchHallType = $("#divfetchHallType").html(); divfetchHallType =
	 * eval('(' + divfetchHallType + ')');
	 */

	myObj = JSON.stringify(myObj1);

	var myEscapedJSONString = (myObj.decodeSpecialChars());
	userBean = eval('(' + myEscapedJSONString + ')');

	$("#OperationContent").setTemplate(editOperationTemp);
	$("#OperationContent").processTemplate(userBean);

	/*
	 * $("#hallWiseCharge").setTemplate(halltypetemp);
	 * $("#hallWiseCharge").processTemplate(divfetchHallType);
	 */
	fetchPTName();
	fetchDoctorSpecilizationsForOperationManagement();
	featchOTGroupDetails();
	fetchprocedureCatsedradmin();
	setTimeout(function() {
		$("#opType").val(userBean.oty);
		$("#status").val(userBean.os);
		$("#opstate").val(userBean.opst);
		$("#opgrade").val(userBean.opgr);
		$("#speName").val(userBean.spnm);
		$("#risk").val(userBean.or);

	}, 500);

	$(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");
	
      /** ******edit hallwise charges***** */
	var OBJCharges = $("#hallwiseChargesDetailDiv").html();
    var OBJ = JSON.parse(OBJCharges);
	var myObj2 = "";
	if(OBJ.listchargesList.length > 0)
		{
			for ( var i = 0; i < OBJ.listchargesList.length; i++) {
	
				if (OBJ.listchargesList[i].opid == oid) {
	
					$("#DivHWC").show();
					$("#iFlag").show();
				    $("#BtnValue").show();
					OpenPopupEdit(oid);
					break;
				}
				else{
					$("#DivHWC").hide();
					$("#iFlag").hide();
				    $("#BtnValue").hide();
				}
			}
		}	
}

function hidePOpup()
{
	$("#Operation_Managment_Popup").hide();
}

function deleteOperation(oid) {

	var r = confirm("Are You Confirm To Delete Procedure ");
	if (r == true) {
		var inputs = [];
		inputs.push("oid=" + oid);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "./ehat/otdata/masterDeleteOperation",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				// $("#dispMessage").html(r);
				location.reload();
			}
		});
	}
}
function removeItems() {
	if (document.getElementById('list').length == 0) {
		alert("List Is Empty");
		return false;
	}
	$("#list option:selected").remove();
}

function validateEquipment(key) {
	if ($("#equipments").val() == "") {
		alert("Add  Equipments First");
		return false;
	}

	var keycode = (key.which) ? key.which : key.keycode;
	if ((keycode < 65 || keycode > 90) && (keycode < 97 || keycode > 122)) {

		return true;
	} else {
		alert("Please enter numbers only");
		return false;
	}
}

function editDiscount(mdi) {
	
	$("#SearchContent").html("");
	var inputs = [];
	inputs.push('action=fetchDiscountComponant');
	inputs.push('mdi=' + mdi);
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

			myResponse = eval('(' + ajaxResponse + ')');
			count = 1;
			$("#SpecialDiscountContent").setTemplate(editDiscountTemp);
			$("#SpecialDiscountContent").processTemplate(myResponse);

			$("#divSpSpDisHide").html(ajaxResponse);
			setSaveDiscountButton();
		}
	});
}

var editCorAccTemp = '<div class="col-md-12-1 center" >'
	+ '<h4 id="title" style="padding-top: 10px;">Edit Policy Account Details</h4>'
	+ '</div>'
	+ '<div class="col-md-12-1"style="margin-top:9px;">'
	+ '<div class="col-md-4-1" style="margin-top:9px; padding-right: 6%;">Company Name</div>'
	+ '	<div class="col-md-7-1" style="margin-top:9px;">'
	+ '		<select id="sponsorType" style="width: 100%;">'
	+ '		</select><input style="width: 100%; border-width: 2px; background-color: lightgray;" value="0" name="acid" id="acid" type="hidden">'
	+ '	</div>'
	+ '	<div class="col-md-1-1" style=" color: red; padding-left: 3%;margin-top: 18px;">'
	+ '		<b>*</b>'
	+ '	</div>'
	+ '</div>'
	+ '<div class="col-md-12-1" style="margin-top:0px;">'
	+ '	<div class="col-md-4-1" style="margin-top:9px;">Policy Name</div>'
	+ '	<div class="col-md-7-1" style="margin-top:9px;">'
	+ '		<input type="text" id="caName" name="caName" style="width: 100%;">'
	+ '	</div>'
	+ '	<div class="col-md-1-1" style=" color: red; padding-left: 3%;margin-top: 18px;">'
	+ '		<b>*</b>'
	+ '	</div>'
	+ '</div>'
	+ '<div class="col-md-12-1" style="margin-top:0px;">'
	+ '	<div class="col-md-4-1" style="margin-top:9px;">Alias</div>'
	+ '	<div class="col-md-7-1" style="margin-top:9px;">'
	+ '		<input type="text" id="aliseIn" name="aliseIn" style="width: 100%;">'
	+ '	</div>'
	+ '</div>'
	+ '<div class="col-md-12-1" style="margin-top:0px;">'
	+ '	<div class="col-md-4-1" style="margin-top:9px;">Discount Type</div>'
	+ '	<div class="col-md-7-1" style="margin-top:9px;">'
	+ '		<select  onchange="setDiscount()" id="discount_in" style="width: 100%;"><option	value="r">Rupees</option><option value="p">Percentage(%)</option></select>'
	+ '	</div>'
	+ '	<div class="col-md-1-1" style="color: red; padding-left: 3%;margin-top: 18px;">'
	+ '		<b>*</b>'
	+ '	</div>'
	+ '</div>'
	+ '<div class="col-md-12-1" id="divPercentDisc" style="margin-top:0px;">'
	+ '	<div class="col-md-4-1" style="margin-top:4px;">&nbsp;&nbsp;</div>'
	+ '<div class="divide-10"></div> <div class="col-md-7-1 pull-right" style="margin-top:9px;padding-right: 10px;">'
	+ '<select class="col-md-5-1" id="discount_increase_decrease" ><option	value="Increment">Increment</option><option value="Decrement">Decrement</option></select> <div class="col-md-1-1">By</div> <input class="col-md-5-1"  type="text"	id="percent_amt" style="" value="0" />'
	+ '	<div class="col-md-1-1" style="color: red; padding-left: 3%">'
	+ '		<b>*</b>'
	+ '	</div>'
	+ '</div>'
	+ '	</div>'
	+ '<div class="col-md-12-1" style="margin-top:0px;">'
	+ '	<div class="col-md-4-1" style="margin-top:9px;">Helpline No.</div>'
	+ '	<div class="col-md-7-1" style="margin-top:9px;">'
	+ '		<input type="text" id="helpline" name="helpline" style="width: 100%;" maxlength="10"  onkeypress="return validateNumbers(event)">'
	+ '	</div>'
	+ '</div>'
	+ '<div class="col-md-12-1" style="margin-top:0px;">'
	+ '	<div class="col-md-4-1" style="margin-top:9px;">Document Required</div>'
	+ '	<div class="col-md-7-1" style="margin-top:9px;">'
	+ '		<textarea id="dReg" name="dReg" style="width: 100%;"></textarea>'
	+ '	</div>'
	+ '</div>'
	+ '<div class="col-md-12-1" style="margin-top:0px;">'
	+ '	<div class="col-md-4-1" style="margin-top:9px;">Other Detail</div>'
	+ '	<div class="col-md-7-1" style="margin-top:9px;">'
	+ '		<input type="text" id="oDetail" name="oDetail" style="width: 100%;" />'
	+ '	</div>' + '</div>'
	+ '<input type="hidden" id="queryType" value="update" />';

function editCorporateAcc(sp_dic_master_id) {

	ajaxResponce = $("#divMyObj").html();
	myArray = JSON.parse(ajaxResponce);
	for ( var i = 0; i < myArray.sl.length; i++) {

		if (myArray.sl[i].si == sp_dic_master_id) {
			myObj1 = myArray.sl[i];
			docId = myArray.sl[i].si;
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
// var sponsoredDetailsContent = $("#SponsoredDetailsContent").html();
// var pobj1 = eval('(' + sponsoredDetailsContent + ')');
	$("#CorAcContent").setTemplate(editCorAccTemp);
	$("#CorAcContent").processTemplate(pobj1);
	
	fetchCompanyAgreementDetails('policies');
	setTimeout(function() {
	
	userBean = eval('(' + myObj.decodeSpecialChars() + ')');
	$("#acid").val(userBean.si);
	$("#caName").val(userBean.sn);
	$("#aliseIn").val(userBean.alin);
	$("#helpline").val(userBean.helpline);

	$("#sponsorType").val(userBean.sponsered_type_id);
	$("#discount_in").val(userBean.dsin);
	$("#discount_increase_decrease").val(userBean.discount_increase_decrease);
	$("#percent_amt").val(userBean.perAmt);

	$("#dReg").val(userBean.docReg);
	$("#oDetail").val(userBean.oDetail);
	$("#opdConsultation").val(userBean.opdConsl);
	$("#opdFollowUp").val(userBean.opdFoll);

	if (userBean.dsin == "p") {
		$("#divPercentDisc").show();
	} else {
		$("#divPercentDisc").hide();
	}
	}, 500);	
}

var addDiscountTemp = "<div style='width: 20%;  padding-top: 2.5%; padding-left: 6%;padding-bottom:3%;'><div style='width: 80%; padding-top: 2%;'><div style='width: 40%; padding-right: 6%;'>Discount ID</div><div style='width: 45%;'><input readonly='readonly'  id='sid'	name='sid'	style='width: 100%; '	 /></div><div style='width: 1%; color: red; padding-left: 5%'></div></div></div><div style='width: 60%; padding-top: 2%;'><div style='width: 60%; padding-top: 2%;'><div style='width: 25%; padding-right: 6%;'>Account Name</div><div style='width: 50%;'><input tupe='text'  id='sname'	name='sname' style='width: 100%; '	 /></div><div style='width: 1%; color: red; padding-left: 3%'><b>*</b></div></div><div style='height:28px;padding-top:2%'><select onchange='setDiscountResTemp()' id='selDisRefType'><option value='operation'>Procedure</option><option value='test'>TEST</option><option value='fees'>FEES</option></select></div></div><br><br><br><br><div style='width: 100%;padding-left:6%;' id='divInside'><div>";
var addDiscountTempInsideForOperation = "<div style='width: 85%; background-color: #436a9d; padding: 1%; font-weight: bold; text-align: center;  '><div style='width: 100%;'><div style='width: 10%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 48%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Procedure Name</div><div style='width: 35%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Procedure Charges</div></div></div>{#foreach $T.ol as ol}<div style='width: 87%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 11%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;border-left: 1px solid #069;'>{count}</div><div id='divPi{count}' style='width: 48%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'>{$T.ol.on}</div><div style='width: 38.3%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;'><input type='text' id='tCharge{count++}' name='tCharge' style='width: 40%; ' value='{$T.ol.oc}' onkeypress='return validatePrice(event)'  /></div> </div>{#/for}<input type='hidden' id='txtRowCount' value='{count}' /><div style='display: none;' id='divAjaxRepo' ></div></div>";

function editSpecialDiscount(sp_dic_master_id) {

	$("#divInside").css("display", "block");

	$("#queryTypeMain").val("update");
	setSaveDiscountButton();
	$("#SearchContent").html("");
	$("#SearchContent").css("display", "none");
	count = 1;
	var inputs = [];
	inputs.push('action=fetchOperationForSDEdit');
	inputs.push('sp_dic_master_id=' + sp_dic_master_id);

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
			pobj1 = eval('(' + ajaxResponse + ')');
			var sample;

			$("#SpecialDiscountContent").setTemplate(
					$("#accountDetails").html());
			$("#SpecialDiscountContent").processTemplate(sample);

			// $("#divInside").setTemplate(divInside1Temp);
			// $("#divInside").processTemplate(pobj1);
			pobj1 = JSON.stringify(pobj1);
			$("#divAjaxRepo").html(pobj1);
			$("#divForOpObj").html(pobj1);

			ajaxResponse = $("#divForSDName").html();
			myArray = JSON.parse(ajaxResponse);
			for ( var i = 0; i < myArray.sl.length; i++) {

				if (myArray.sl[i].si == sp_dic_master_id) {

					$("#sname").val(myArray.sl[i].sn);
					$("#discount_in").val(myArray.sl[i].dsin);
					$("#percent_amt").val(myArray.sl[i].perAmt);
					$("#discount_increase_decrease").val(
							myArray.sl[i].discount_increase_decrease);

					if (myArray.sl[i].dsin == "p") {
						$("#divPercentDisc").show();
					} else {
						$("#divPercentDisc").hide();
					}
					break;
				}
			}
			$("#sid").val(sp_dic_master_id);
		}
	});
}

function saveCorporateAccountDiscount() {

	var inputs = [];
	var sname = $("#sname").val();
	var sid = $("#sid").val();
	var opd = $("#opd").val();
	var patho = $("#patho").val();
	var invest = $("#investigation").val();
	var physio = $("#physiotherapy").val();
	var queryType = $("#queryType").val();

	inputs.push('sname=' + encodeURIComponent(sname));
	inputs.push('sid=' + sid);
	inputs.push('opd=' + opd);
	inputs.push('patho=' + patho);
	inputs.push('invest=' + invest);
	inputs.push('physio=' + physio);
	inputs.push('queryType=' + queryType);

	inputs.push('action=saveCorporateAccountDiscount');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			$("#sname").focus();
		}
	});
}

function viewOprChargesForEdit(sp_dic_master_id) {

	$("#queryType").val("update");
	setSaveDiscountButton();
	$("#SearchContent").html("");
	$("#SearchContent").css("display", "none");
	count = 1;
	var inputs = [];
	inputs.push('action=fetchOperationForSDEdit');
	inputs.push('sp_dic_master_id=' + sp_dic_master_id);

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

			pobj1 = eval('(' + ajaxResponse + ')');
			var sample;
			// addDiscountTemp
			// addDiscountTempInsideForOperation
			$("#SpecialDiscountContent").setTemplate(
					$("#accountDetails").html());
			$("#SpecialDiscountContent").processTemplate(sample);
			$("#heading").html("<h2>Edit Corporate Account</h2>");
			$("#divInside").setTemplate(divInside1Temp);
			$("#divInside").processTemplate(pobj1);
			pobj1 = JSON.stringify(pobj1);
			pobj1 = (pobj1.decodeSpecialChars());
			$("#divAjaxRepo").html(pobj1);
			$("#divForOpObj").html(pobj1);

			ajaxResponse = $("#divForSDName").html();
			myArray = JSON.parse(ajaxResponse);
			for ( var i = 0; i < myArray.sl.length; i++) {

				if (myArray.sl[i].si == sp_dic_master_id) {

					$("#sname").val(myArray.sl[i].sn);
					$("#discount_in").val(myArray.sl[i].dsin);
					$("#txtPercentAmt").val(myArray.sl[i].perAmt);

					if (myArray.sl[i].dsin == "p") {
						$("#divInside").hide();
						$("#divPercentDisc").show();

					} else if (myArray.sl[i].dsin == "r") {
						$("#divInside").show();
						$("#divPercentDisc").hide();
					} else {
						$("#divInside").hide();
						$("#divPercentDisc").hide();
					}
					break;
				}
			}
			$("#sid").val(sp_dic_master_id);
		}
	});
}
function viewOprCharges() {
	$("#btnADD").html("");
	$("#queryType").val("insert");
	setSaveDiscountButton();
	$("#SearchContent").html("");
	$("#SearchContent").css("display", "none");
	count = 1;
	var inputs = [];

	inputs.push('action=fetchOperation');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchOperation",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 =  ajaxResponse ;
			var sample;

			$("#SpecialDiscountContent").setTemplate(
					$("#accountDetails").html());
			$("#SpecialDiscountContent").processTemplate(sample);

			$("#divInside").setTemplate(divInside1Temp);
			$("#divInside").processTemplate(pobj1);

			fetchSpeDisId();
			pobj1 = JSON.stringify(pobj1);
			pobj1 = (pobj1.decodeSpecialChars());
			$("#divAjaxRepo").html(pobj1);
			$("#divForOpObj").html(pobj1);
		}
	});
}
function fetchSpeDisId() {

	var inputs = [];
	inputs.push('action=newDiscountID');

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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#sid").val(ajaxResponse);
		}
	});
}

function saveToDisc() {
	
	var discount_in = $("#discount_in").val();
	var txtPercentAmt = 10;// $("#txtPercentAmt").val();
	var inputs = [];
	var parsedOj = "";
	var sname = $("#sname").val();
	var sid = $("#sid").val();
	inputs.push('sname=' + encodeURIComponent(sname));
	inputs.push('sid=' + sid);
	inputs.push('txtPercentAmt=' + encodeURIComponent(txtPercentAmt));
	inputs.push('discount_in=' + discount_in);
	var selDisRefType = $("#selDisRefType").val();
	// if (discount_in == "r") {
		if (selDisRefType == "operation") {

		} else if (selDisRefType == "Radiology"
				|| selDisRefType == "Cardiology" || selDisRefType == "dental"
				|| selDisRefType == "casuality" || selDisRefType == "ipdserv"
				|| selDisRefType == "pathology"
				|| selDisRefType == "pathologyPkg") {

			
			if(selDisRefType == "pathology" && (($("#selHeading").val())=="select")){
				alert("Select Heading First");
				SetFocus("selHeading");
				return false;
			}
			divAjaxRepo = $("#divForTestObj").html();
			divAjaxRepo1 = eval('(' + divAjaxRepo + ')');
			var a = 1;

			for ( var i = 0; i < divAjaxRepo1.testList.length; i++) {

				divAjaxRepo1.testList[i].charges1 = $("#tCharge" + a).val();
				divAjaxRepo1.testList[i].testPatientCharges = $("#ptCharge" + a)
						.val();
				if (($("#chargesApplicableFlag" + a).is(':checked')) == true) {
					divAjaxRepo1.testList[i].testChargesApplicableFlag = 'Y';
				} else {
					divAjaxRepo1.testList[i].testChargesApplicableFlag = 'N';
				}
				a++;
			}
			inputs.push('selDisRefType=' + selDisRefType);
			parsedOj = JSON.stringify(divAjaxRepo1);

		} else if (selDisRefType == "fees") {

			count = 1;
			divAjaxRepo = $("#divForFeesObj").html();
			divAjaxRepo1 = eval('(' + divAjaxRepo + ')');
			var a = 1;
			for (i = 0; i < divAjaxRepo1.dl.length; i++) {
				divAjaxRepo1.dl[i].df = $("#fees" + a).val();
				divAjaxRepo1.dl[i].flwfees = $("#ff" + a).val();
				a++;
			}
			inputs.push('selDisRefType=fees');

			parsedOj = JSON.stringify(divAjaxRepo1);
		}
	/*
	 * } else { inputs.push('selDisRefType=all'); }
	 */
	// var parsedObj = JSON.parse(divAjaxRepo);

	inputs.push('strRowValues=' + encodeURIComponent(parsedOj));
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('action=SaveDiscount');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(ajaxResponse);
			$("#sname").focus();
		}
	});

}

function saveDiscountMaster() {

	if ($("#sponsorType").val().trim() == "select") {
		alert("Company Name is Mandatory");
		SetFocus("aliseIn");
		return false;
	}
	
	if ($("#caName").val().trim() == "") {
		alert("Policy Name is Mandatory");
		SetFocus("caName");
		return false;
	}
	
	var sponsorType = $("#sponsorType").val();
	var discount_in = $("#discount_in").val();
	var discount_increase_decrease = $("#discount_increase_decrease").val();
	var percent_amt = $("#percent_amt").val();

	if (discount_in == "p") {
		if (percent_amt == "") {
			alert("Percentage Amount is Mandatory.");
			SetFocus("percent_amt");
			return false;
		}
	}
	var pageName = $("#pageName").val();
	var inputs = [];
	inputs.push('action=saveCorporateAccount');
	inputs.push('acid=' + $("#acid").val());
	inputs.push('caName=' + $("#caName").val());
	inputs.push('aliseIn=' + $("#aliseIn").val());
	inputs.push('helpline=' + $("#helpline").val());
	inputs.push('dReg=' + $("#dReg").val());
	inputs.push('oDetail=' + $("#oDetail").val());
	inputs.push('queryType=' + $("#queryType").val());
	inputs.push('pageName=' + pageName);
	inputs.push('sponsorType=' + sponsorType);
	inputs.push('discount_in=' + discount_in);
	inputs.push('discount_increase_decrease=' + discount_increase_decrease);
	inputs.push('percent_amt=' + percent_amt);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
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
function setSaveDiscountButton() {
	var sampleBean;
	$("#SaveButtonContent").setTemplate(saveDiscountButtonTemp);
	$("#SaveButtonContent").processTemplate(sampleBean);
}

var defaultDisViewForCorporateTemp = "<div class='col-sm-12-1' style='width:99%;' >"
		+ "<table class='table table-bordered table-condensed table-stripped cf' style='margin-top: 10px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th style='height: 21.5px;' class='col-md-1-1 center'><label class='TextFont'>#</label></th>"
		+ "<th style='height: 21.5px;' class='col-md-1-1 center'><label class='TextFont'>Policy ID</label></th>"
		+ "<th style='height: 21.5px;' class='col-md-3-1 center'><label class='TextFont'>Policy Name</label></th>"
		+ "<th style='height: 21.5px;' class='col-md-3-1 center'><label class='TextFont'>Company Name</label></th>"
		+ "<th style='height: 21.5px;' class='col-md-2-1 center'><label class='TextFont'>Edit</label></th>"
		+ "<th style='height: 21.5px;' class='col-md-2-1 center'><label class='TextFont'>Delete</label></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 400px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody  id='divListPolicyInfo'>"
		+ "{#foreach $T.sl as sl}"
		+ "<tr>"
		+ "<td style='height: 21.5px;' class='col-md-1-1 center'>{count++}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-1-1 center' id='divPi2'>{$T.sl.si}</td>"
		+ "<td style='height: 21.5px;' class='col-md-3-1 center'>{$T.sl.sn}</td>"
		+ "<td style='height: 21.5px;' class='col-md-3-1 center'>{$T.sl.comNm}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2-1 center'>"
		+ "<input class='btn btn-xs btn-success edit editUserAccess' type='button' value='EDIT' onclick='editSpecialDiscount({$T.sl.si})' disabled='disabled'/>"
		+ "</td>"
		+ "<td style='height: 21.5px;' class='col-md-2-1 center'>"
		+ "<input class='btn btn-xs btn-success edit deleteUserAccess' type='button' value='DELETE' onclick='deleteDiscount({$T.sl.si})' disabled='disabled'/>"
		+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewDiscount() {
	var pageName = $("#pageName").val();
	$("#SaveButtonContent").html("");
	var inputs = [];
	inputs.push('action=fetchDiscount');
	inputs.push('pageName=' + pageName);
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

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#SpecialDiscountContent").setTemplate(
					defaultDisViewForCorporateTemp);
			$("#SpecialDiscountContent").processTemplate(pobj1);

			$("#divForSDName").html(ajaxResponse);
			setTimeout(function(){userAccess();},100);
		}
	});
}

var defaultDisViewTempCA = "{#foreach $T.sl as sl}"
		+ "<tr><td style='height: 21.5px;' class='col-md-1 center'>{count++}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-1 center' id='uname{count}'>{$T.sl.si}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' id='uname{count}'>{$T.sl.sn}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' id=''>{$T.sl.comNm}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT'	id='btnEdit{count}' onclick='editCorporateAcc({$T.sl.si})' disabled='disabled'><i class='fa fa-edit'></i></button>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
		+"<button class='btn btn-xs btn-danger deleteUserAccess' value='DELETE'	id='btnDelete{count}' onclick='deleteDiscount({$T.sl.si})' disabled='disabled'><i class='fa fa-trash-o'></i></button>"
		+ "</tr> {#/for}";

function defaultViewDiscountCA() {

	var pageName = $("#pageName").val();

	$("#SaveButtonContent").html("");
	var inputs = [];
	inputs.push('action=fetchDiscount');
	inputs.push('pageName=' + pageName);

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

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#SpecialDiscountContent").setTemplate(defaultDisViewTempCA);
			$("#SpecialDiscountContent").processTemplate(pobj1);

			$("#divMyObj").html(ajaxResponse);
			setTimeout(function(){userAccess();},100);
		}
	});
}
function deleteDiscount(sid) {

	var r = confirm("Are You Confirm To Delete Policy Account Details?");
	if (r == true) {
		var pageName = $("#pageName").val();

		var inputs = [];
		inputs.push('action=deleteDiscount');
		inputs.push("sid=" + sid);
		inputs.push("pageName=" + pageName);
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
				alert(ajaxResponse);
				// $("#dispMessage").html(r);
				location.reload();
			}
		});
	}
}

var searchDisViewTempCA = "{#foreach $T.sl as sl}"
	+ "<tr><td style='height: 21.5px;' class='col-md-1 center'>{count++}.</td>"
	+ "<td style='height: 21.5px;' class='col-md-1 center' id='uname{count}'>{$T.sl.si}</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center' id='uname{count}'>{$T.sl.sn}</td>"
	+ "<td style='height: 21.5px;' class='col-md-2 center' id=''>{$T.sl.comNm}</td>"
	+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
	+ "<button class='btn btn-xs btn-success' value='EDIT'	id='btnEdit{count}' onclick='editCorporateAcc({$T.sl.si})'>			<i class='fa fa-edit'></i>		</button>	"
	+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
	+"<button class='btn btn-xs btn-danger' value='DELETE'	id='btnDelete{count}' onclick='deleteDiscount({$T.sl.si})'>		 	<i class='fa fa-trash-o'></i>	</button>	"
	+ "</tr> {#/for}";

function searchDiscount() {

	var strValue = $("#strValue").val();
	var strCompanyValue = $("#strCompanyValue").val();
	
	if ((strValue == "")&&(strCompanyValue == "")) {
		alert("Please Enter Either Policy Name Or Company Name For search");
		return false;
	}
	if ((strValue != "")&&(strCompanyValue != "")) {
		alert("Please Enter Either Policy Name Or Company Name");
		return false;
	}
	
	var searchType="policy";
	if (strValue != "") {
		searchType="policy";
		strValue = $("#strValue").val();
	}
	if (strCompanyValue != "") {
		searchType="company";
		strValue = $("#strCompanyValue").val();
	}
/*
 * if (strValue == "") { alert("Please Enter Account Name For Search"); return
 * false; }
 */
	var pageName = $("#pageName").val();
	var inputs = [];
	inputs.push('action=searchDiscount');
	inputs.push("strValue=" + strValue);
	inputs.push("pageName=" + pageName);
	inputs.push("searchType=" + searchType);
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

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.sl.length == 0) {
				if(searchType == "policy"){
					alert("Policy Name Not Found");
					$("#strValue").val("");
				}else{
					alert("Company Name Not Found");
					$("#strCompanyValue").val("");
				}
			} else {
				count = 1;
				
					$("#SpecialDiscountContent").setTemplate(searchDisViewTempCA);
					$("#SpecialDiscountContent").processTemplate(pobj1);
					$("#divForSDName").html(ajaxResponse);
			}
		}
	});
}

/*var searchDisViewTempPolicyAC =  "{#foreach $T.sl as sl}"
+ "<tr>"
+ "<td style='height: 21.5px;' class='col-md-1-1 center'>{count++}.</td>"
+ "<td style='height: 21.5px;' class='col-md-1-1 center' id='divPi2'>{$T.sl.si}</td>"
+ "<td style='height: 21.5px;' class='col-md-3-1 center'>{$T.sl.sn}</td>"
+ "<td style='height: 21.5px;' class='col-md-3-1 center'>{$T.sl.comNm}</td>"
+ "<td style='height: 21.5px;' class='col-md-2-1 center'>"
+ "<input class='btn btn-xs btn-success edit' type='button' value='EDIT' onclick='editSpecialDiscount({$T.sl.si})' />"
+ "</td>"
+ "<td style='height: 21.5px;' class='col-md-2-1 center'>"
+ "<input class='btn btn-xs btn-success edit' type='button' value='DELETE' onclick='deleteDiscount({$T.sl.si})' />"
+ "</td></tr>{#/for}" ;*/
var searchDisViewTempPolicyAC ="<table class='table table-striped table-condensed cf'>"
+ "<tbody  id='divListPolicyInfo'>"
+ "{#foreach $T.sl as sl}"
+ "<tr>"
+ "<td style='height: 21.5px;' class='col-md-1-1 center'>{count++}.</td>"
+ "<td style='height: 21.5px;' class='col-md-1-1 center' id='divPi2'>{$T.sl.si}</td>"
+ "<td style='height: 21.5px;' class='col-md-3-1 center'>{$T.sl.sn}</td>"
+ "<td style='height: 21.5px;' class='col-md-3-1 center'>{$T.sl.comNm}</td>"
+ "<td style='height: 21.5px;' class='col-md-2-1 center'>"
+ "<input class='btn btn-xs btn-success edit editUserAccess' type='button' value='EDIT' onclick='editSpecialDiscount({$T.sl.si})'/>"
+ "</td>"
+ "<td style='height: 21.5px;' class='col-md-2-1 center'>"
+ "<input class='btn btn-xs btn-success edit deleteUserAccess' type='button' value='DELETE' onclick='deleteDiscount({$T.sl.si})'  />"
+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" ;


function searchPolicyAC() {

	var strValue = $("#strValue").val();
	var strCompanyValue = $("#strCompanyValue").val();
	
	if ((strValue == "")&&(strCompanyValue == "")) {
		alert("Please Enter Either Policy Name Or Company Name For Search");
		return false;
	}
	if ((strValue != "")&&(strCompanyValue != "")) {
		alert("Please Enter Either Policy Name Or Company Name");
		return false;
	}
	
	var searchType="policy";
	if (strValue != "") {
		searchType="policy";
		strValue = $("#strValue").val();
	}
	if (strCompanyValue != "") {
		searchType="company";
		strValue = $("#strCompanyValue").val();
	}
/*
 * if (strValue == "") { alert("Please Enter Account Name For Search"); return
 * false; }
 */
	/*
	 * var strValue = $("#strValue").val(); if (strValue == "") { alert("Please
	 * Enter Policy Name For Search"); return false; }
	 */

	var pageName = $("#pageName").val();
	var inputs = [];
	inputs.push('action=searchDiscount');
	inputs.push("strValue=" + strValue);
	inputs.push("pageName=" + pageName);
	inputs.push("searchType=" + searchType);
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

			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.sl.length == 0) {
				if(searchType == "policy"){
					alert("Policy Account Name Not Found");
					$("#strValue").val("");
				}else{
					alert("Company Name Not Found");
					$("#strCompanyValue").val("");
				}
			} else {
				count = 1;
					$("#divListPolicyInfo").setTemplate(searchDisViewTempPolicyAC);
					$("#divListPolicyInfo").processTemplate(pobj1);
					$("#divForSDName").html(ajaxResponse);
			}
		}
	});
}

var searchPolicyACTemp = "<div class='col-md-1-1' >Search By:</div><div class='col-md-1-1' >Policy Name</div><div class='col-md-2-1' id='divPolicyName' ><input id='strValue' name='strValue' type='text'  class='typeahead' /></div><div class='col-md-1-1' >Company Name</div><div class='col-md-2-1 typeahead' id='divCompanyName' ><input id='strCompanyValue' name='strCompanyValue' type='text' /></div><div class='col-md-2-1' ><input id='searchDiscount' type='button' value='Search' class='btn btn-xs btn-primary' onclick='searchPolicyAC()' /></div>";
var searchDiscountTemp = "<div class='col-md-1-1' >Search By:</div><div class='col-md-1-1' >Policy Name</div><div class='col-md-2-1' id='divPolicyName' ><input id='strValue' name='strValue' type='text' class='typeahead' /></div><div class='col-md-1-1' >Company Name</div><div class='col-md-2-1 typeahead' id='divCompanyName' ><input id='strCompanyValue' name='strCompanyValue'  type='text' /></div><div class='col-md-2-1' ><input id='searchDiscount' type='button'	value='Search'  class='btn btn-xs btn-primary' onclick='searchDiscount()' /></div>";

function setSearchDiscount(type) {
	var sampleBean = "";
	if(type=="policyAC"){
		$("#SearchContent").setTemplate(searchPolicyACTemp);
		$("#SearchContent").processTemplate(sampleBean);
	}else{
		$("#SearchContent").setTemplate(searchDiscountTemp);
		$("#SearchContent").processTemplate(sampleBean);	
	}
}

var addCorAccTemp = '<div class="col-md-12-1 center" >'
		+ '<h4 id="title" style="padding-top: 10px;">Add Policy Account Details</h4>'
		+ '</div>'
		+ '<div class="col-md-12-1"style="margin-top:9px;">'
		+ '<div class="col-md-4-1" style="margin-top:9px; padding-right: 6%;">Company Name</div>'
		+ '	<div class="col-md-7-1" style="margin-top:9px;">'
		+ '		<select id="sponsorType" style="width: 100%;">'
		+ '		</select><input style="width: 100%; border-width: 2px; background-color: lightgray;" value="0" name="acid" id="acid" type="hidden">'
		+ '	</div>'
		+ '	<div class="col-md-1-1" style=" color: red; padding-left: 3%;margin-top: 18px;">'
		+ '		<b>*</b>'
		+ '	</div>'
		+ '</div>'
		+ '<div class="col-md-12-1" style="margin-top:0px;">'
		+ '	<div class="col-md-4-1" style="margin-top:9px;">Policy Name</div>'
		+ '	<div class="col-md-7-1" style="margin-top:9px;">'
		+ '		<input type="text" id="caName" name="caName" style="width: 100%;">'
		+ '	</div>'
		+ '	<div class="col-md-1-1" style=" color: red; padding-left: 3%;margin-top: 18px;">'
		+ '		<b>*</b>'
		+ '	</div>'
		+ '</div>'
		+ '<div class="col-md-12-1" style="margin-top:0px;">'
		+ '	<div class="col-md-4-1" style="margin-top:9px;">Alias</div>'
		+ '	<div class="col-md-7-1" style="margin-top:9px;">'
		+ '		<input type="text" id="aliseIn" name="aliseIn" style="width: 100%;">'
		+ '	</div>'
		+ '</div>'
		+ '<div class="col-md-12-1" style="margin-top:0px;">'
		+ '	<div class="col-md-4-1" style="margin-top:9px;">Discount Type</div>'
		+ '	<div class="col-md-7-1" style="margin-top:9px;">'
		+ '		<select  onchange="setDiscount()" id="discount_in" style="width: 100%;"><option	value="r">Rupees</option><option value="p">Percentage(%)</option></select>'
		+ '	</div>'
		+ '	<div class="col-md-1-1" style="color: red; padding-left: 3%;margin-top: 18px;">'
		+ '		<b>*</b>'
		+ '	</div>'
		+ '</div>'
		+ '<div class="col-md-12-1" id="divPercentDisc" style="margin-top:0px;">'
		+ '	<div class="col-md-4-1" style="margin-top:4px;">&nbsp;&nbsp;</div>'
		+ '<div class="divide-10"></div> <div class="col-md-7-1 pull-right" style="margin-top:9px;padding-right: 10px;">'
		+ '<select class="col-md-5-1" id="discount_increase_decrease" ><option	value="Increment">Increment</option><option value="Decrement">Decrement</option></select> <div class="col-md-1-1">By</div> <input class="col-md-5-1"  type="text"	id="percent_amt" style="" value="0" />'
		+ '	<div class="col-md-1-1" style="color: red; padding-left: 3%">'
		+ '		<b>*</b>'
		+ '	</div>'
		+ '</div>'
		+ '	</div>'
		+ '<div class="col-md-12-1" style="margin-top:0px;">'
		+ '	<div class="col-md-4-1" style="margin-top:9px;">Helpline No.</div>'
		+ '	<div class="col-md-7-1" style="margin-top:9px;">'
		+ '		<input type="text" id="helpline" name="helpline" style="width: 100%;" maxlength="10"  onkeypress="return validateNumbers(event)">'
		+ '	</div>'
		+ '</div>'
		+ '<div class="col-md-12-1" style="margin-top:0px;">'
		+ '	<div class="col-md-4-1" style="margin-top:9px;">Document Required</div>'
		+ '	<div class="col-md-7-1" style="margin-top:9px;">'
		+ '		<textarea id="dReg" name="dReg" style="width: 100%;"></textarea>'
		+ '	</div>'
		+ '</div>'
		+ '<div class="col-md-12-1" style="margin-top:0px;">'
		+ '	<div class="col-md-4-1" style="margin-top:9px;">Other Detail</div>'
		+ '	<div class="col-md-7-1" style="margin-top:9px;">'
		+ '		<input type="text" id="oDetail" name="oDetail" style="width: 100%;" />'
		+ '	</div>' + '</div>'
		+ '<input type="hidden" id="queryType" value="insert" />';

function setCorAcc() {

	/*
	 * var sponsoredDetailsContent = $("#SponsoredDetailsContent").html(); var
	 * pobj1 = eval('(' + sponsoredDetailsContent + ')');
	 * 
	 * var pageName = $("#pageName").val();
	 */
	$("#CorAcContent").setTemplate(addCorAccTemp);
	$("#CorAcContent").processTemplate(pobj1);
}

/**
 * **************************** Start Chart
 * Management************************************
 */

var defaultViewChartTemp = "<table class='table-bordered table cf'	style='margin-bottom: 9px; background: #fff;width:98%;'><thead class='cf'><tr><th class='col-md-1-1 center' style='height: 21.5px;'>#</th><th class='col-md-2-1 center' style='height: 21.5px;'>Chart Id</th><th class='numeric col-md-4-1 center' style='height: 21.5px;'>Chart Name</th><th class='numeric col-md-2-1 center' style='height: 21.5px;'>Fee(Rs.)</th><th class='numeric col-md-1-1 center' style='height: 21.5px;'>Edit</th><th class='numeric col-md-1-1 center' style='height: 21.5px; padding-right:33px'>Delete </th></tr></thead></table><div class='col-md-12-1' style='height: 315px; overflow-y: scroll; overflow-x: hidden; border: 1px solid #ddd;'><table class='table table-striped'><tbody>{#foreach $T.cl as cl}<tr><td class='col-md-1-1 center' style='height: 21.5px;'>{count++}.</td><td class='col-md-2-1 center' style='height: 21.5px;'>{$T.cl.cid}</td><td class='col-md-4-1 center' style='height: 21.5px;padding-right:3%;'>{$T.cl.cn}</td><td class='col-md-2-1 center' id='utype' style='height: 21.5px;padding-right:5%;'>{$T.cl.fe}</td><td class='col-md-1-1 center' style='height: 21.5px;padding-right:5%;'><button value='EDIT' class='btn btn-xs btn-success' id='btnEdit' onclick='editChart({$T.cl.cid})'><i class='fa fa-edit'></i></button><td class='col-md-1-1 center' style='height: 21.5px;padding-right:5%;'>{#if $T.cl.cid!=1 && $T.cl.cid!=2}<button value='DELETE' class='btn btn-xs btn-success' id='btnDelete'	onclick='deleteChart({$T.cl.cid})'><i class='fa fa-trash-o'></i></button> {#/if}</td></tr>{#/for}</tbody></table></div>";

var searchChartTemp = " <div style='width: 10%;'>Search By:</div><div style='width: 8%;'>Chart Name</div><div style='width: 12%; padding-left: 2%;'><input	style='width: 100%; '	name='byName' type='text' id='byName' /></div><div style='width: 18%; text-align: center;'><input type='button'	value='Search'  class='edit' onclick='searchChart()' /></div>";

var addChartDetailsTemp = "<div class='col-md-12-1'	style='height: 345px; border: 1px solid #ddd; padding-left: 10%'>" +
		"<div class='divide-20'></div>" +
		"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Add Chart Details</h3>	</div>" +
		"<div class='col-md-12-1' style='padding-top: 5%;'>" +
		"<div class='col-md-4-1' style='padding-top: 2.5%;'>Chart ID:</div>" +
		"<div class='col-md-8-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
		"<input type='text' id='cid' name='cid' class='col-md-10-1 form-control input-SmallText' style='background-color: lightgray;' readonly='readonly' value='{$T.cid}' /></div></div>" +
		"<div class='col-md-12-1' style='padding-top: 2.5%;'>" +
		"<div class='col-md-4-1' style='padding-top: 2.5%;'>Chart Name:</div>" +
		"<div class='col-md-8-1' style='color: red; padding-top: 4.5%;  padding-bottom:4%'>" +
		"<input type='text' id='cname' name='cname' class='col-md-10-1'	style='' maxlength='150' /><b> *</b></div></div>" +
		"<div class='col-md-12-1' style='padding-top: 2.5%;'>" +
		"<div class='col-md-4-1' style='padding-top: 2.5%; padding-top: 3.5%;'>Fees(Rs.):</div>" +
		"<div class='col-md-8-1' style='color: red;  padding-top: 4.5%;'>" +
		"<input type='text' id='fee' name='fee' class='col-md-10-1'	onkeypress='return validateNumbers(event)' maxlength='6' />" +
		"<b	style='color: red;'>*</b></div></div>" +
		"<input type='hidden' id='queryType' value='insert'></div>";

var editChartDetailsTemp = "<div class='col-md-12-1'	style='height: 345px; border: 1px solid #ddd; padding-left: 10%'>" +
				"<div class='divide-20'></div>" +
				"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Edit Chart Details</h3>	</div>" +
				"<div class='col-md-12-1' style='padding-top: 5%;'>" +
				"<div class='col-md-4-1' style='padding-top: 2.5%;'>Chart ID:</div>" +
				"<div class='col-md-8-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
				"<input type='text' id='cid' name='cid' class='col-md-10-1 form-control input-SmallText' style='background-color: lightgray;' readonly='readonly' value='{$T.cid}' /></div></div>" +
				"<div class='col-md-12-1' style='padding-top: 2.5%;'>" +
				"<div class='col-md-4-1' style='padding-top: 2.5%;'>Chart Name:</div>" +
				"<div class='col-md-8-1' style='color: red; padding-top: 4.5%;  padding-bottom:4%'>" +
				"<input type='text' id='cname' name='cname' class='col-md-10-1'	style='' maxlength='150'  value='{$T.cn}'/><b> *</b></div></div>" +
				"<div class='col-md-12-1' style='padding-top: 2.5%;'>" +
				"<div class='col-md-4-1' style='padding-top: 2.5%; padding-top: 3.5%;'>Fees(Rs.):</div>" +
				"<div class='col-md-8-1' style='color: red;  padding-top: 4.5%;'>" +
				"<input type='text' id='fee' name='fee' class='col-md-10-1'	onkeypress='return validateNumbers(event)' maxlength='6' value='{$T.fe}'/>" +
				"<b	style='color: red;'>*</b></div></div>" +
				"<input type='hidden' id='queryType' value='update'></div>";

var saveChartButtonTemp = "<Button 	type='button' class='btn btn-xs btn-success' data-toggle='tooltip' data-placement='left' title='Save Nursing Chart' onclick='saveChartDetails()' >" +
		"<i class='fa fa-save'></i></Button>";

function searchChart() {
	count = 1;
	var strValue = $("#byName").val();
	
	if (strValue == "" || strValue == null) {
		alert("Please Enter Chart Name.");
	} else {
		var inputs = [];

		inputs.push('action=searchChart');
		inputs.push('strValue=' + encodeURIComponent(strValue));

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

				pobj1 = eval('(' + r + ')');
				if (pobj1.cl.length == 0) {
					alert("Chart Not Found");
					$("#byName").val("");
				} else {
					$("#chartMangTemp").setTemplate(defaultViewChartTemp);
					$("#chartMangTemp").processTemplate(pobj1);
					$("#byName").val("");
				}
			}
		});
	}
}

function deleteChart(cid) {

	/*
	 * if (cid != 1 || cid != 2) { alert("Sorry, You Can't Delete this chart
	 * !"); } else {
	 */
	var r = confirm("Are You Confirm To Delete Chart?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteChart');
		inputs.push("cid=" + cid);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
	// }
}

function editChart(cid) {
	$("#AddChart").show();
	setChartSaveButtonTemp();
	ajaxResponse = $("#chartObj").html();

	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.cl.length; i++) {

		if (myArray.cl[i].cid == cid) {
			myObj1 = myArray.cl[i];
			break;
		}
	}

	myObj = JSON.stringify(myObj1);
	userBean = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#chartEditTemp").setTemplate(editChartDetailsTemp);
	$("#chartEditTemp").processTemplate(userBean);
	SetFocus("cname");
}

function saveChartDetails() {

	var cid = $("#cid").val();
	var cname = $.trim($("#cname").val());
	var fee = $("#fee").val();
	var queryType = $("#queryType").val();
	if (cname == "") {
		alert("Please enter chart Name");
		SetFocus("cname");
	} else if (fee == "") {
		alert("Please enter chart Fees");
		SetFocus("fee");
	} else {
		var inputs = [];
		inputs.push('action=addChartDetails');
		inputs.push('cid=' + cid);
		inputs.push('cname=' + encodeURIComponent(cname));
		inputs.push('fee=' + encodeURIComponent(fee));
		inputs.push('queryType=' + queryType);
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "AdminServlet",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						// alert("error");
					},
					success : function(r) {
						ajaxResponse = r;
						alert(ajaxResponse);
						if (ajaxResponse != "Chart Details Is already present in the database ...") {
							setDefaultViewChartTemp();
							$("#AddChart").show();
							location.reload();
						} else {
							SetFocus("cname");
						}
					}
				});
	}
}
function setSearchChartTemp() {
	var sample;
	$("#search").setTemplate(searchChartTemp);
	$("#search").processTemplate(sample);
}

function setChartSaveButtonTemp() {
	var sampleBean;
	$("#saveButton").show();
	$("#saveButton").setTemplate(saveChartButtonTemp);
	$("#saveButton").processTemplate(sampleBean);
}

function setAddChartDetailsTemp() {
	$("#saveButton").show();
	setChartSaveButtonTemp();

	var inputs = [];
	inputs.push('action=fetchChartID');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#chartEditTemp").setTemplate(addChartDetailsTemp);
			$("#chartEditTemp").processTemplate(pobj1);
			$("#AddChart").hide();
			SetFocus("cname");
		}
	});
}

function setDefaultViewChartTemp() {
	count = 1;
	$("#saveButton").hide();
	var inputs = [];
	inputs.push('action=defaultChart');
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
			$("#chartObj").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#chartMangTemp").setTemplate(defaultViewChartTemp);
			$("#chartMangTemp").processTemplate(pobj1);
		}
	});
}

// ................Bill Towards started................

function saveBillTowards() {

	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();

	var ReadStvalue = rowCount - addrowCount;
	var i;
	var TowardsString = "";
	for (i = 1; i <= rowCount; i++) {

		var tow = $("#two" + i).val();
		if (tow == undefined) {
		}

		else if (tow == "") {
			alert("Name Must Be Filled Out");
			return false;
		} else {
			var idtwo = $("#idtwo" + i).val();
			TowardsString = TowardsString + "@" + tow + ',' + idtwo;
		}
	}

	var inputs = [];

	inputs.push('TowardsString=' + encodeURIComponent(TowardsString));
	inputs.push('action=saveBillTowards');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			alert(ajaxResponse);
			// location.reload();
			window.location.href = "BillTowards.jsp";
		}
	});
}

var j = 1;
function toCreateTowadsDiv(RowCount) {
	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	if (rowCount == -1) {
		rowCount = 0;
	}
	rowCount++;
	divId = "div" + rowCount;
	var x = document.createElement('div');
	x.setAttribute('id', divId);
	x.setAttribute('style',
			'width: 100%; height: 28px; border-bottom: 1px solid #069;');
	document.getElementById("DRRDiv1").appendChild(x);
	document.getElementById(divId).innerHTML = '<div id="remove'
			+ rowCount
			+ '"style="width: 100%; height: 28px; border-bottom: 1px solid #069;"><div	style="width: 10.4%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;">'
			+ (rowCount)
			+ ' </div><div	style="width:70%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;"><input	style="width: 90%;" type="text" id="two'
			+ rowCount
			+ '" value="" name="textfield"  /></div><div div style="width: 4% ;text-align: center; height: 25px;   padding-left: 1%; padding-top: 3px;"><input type="checkbox" id="chk'
			+ rowCount
			+ '" name="chk'
			+ rowCount
			+ '"></div> <input style="width: 90%;" type="hidden" name="textfield" id="id'
			+ rowCount
			+ '" value=" "/><input style="width: 90%;" type="hidden" name="textfield" id="hid'
			+ rowCount + '" value=" "/></div>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(j);
	j++;
}

function toRemoveTowardsDiv(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;

	for (m = 1; m <= rowCount; m++) {

		var $radios = $('input:checkbox[name=chk' + m + ']');
		if ($radios.is(':checked') == true) {
			two = $("#idtwo" + m).val();
	
			if (two != " " && two != undefined) {

				var inputs = [];
				inputs.push('action=deleteTowards');
				inputs.push("two=" + two);
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
						alert(ajaxResponse);
					}
				});
				$("#remove" + m).remove();

			} else {
				$("#div" + m).remove();
			}
			// rowCount--;
			// $("#RowCount").val(rowCount);
			// $("#addRowCount").val(rowCount);
		}
	}
}

function searchTowards(callForm) {
	rowCount = 1;

	var searchbyTowards = $("#searchbyTowards").val();
	if (searchbyTowards == "" || searchbyTowards == "Null") {
		alert("please enter name for search");
	} else {
		var inputs = [];
		inputs.push('action=getBillTowards');
		inputs.push('searchbyTowards=' + encodeURIComponent(searchbyTowards));
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
				
				$("#hiddenTowardsDetail").val(ajaxResponse);
				Towardsobj = eval('(' + ajaxResponse + ')');
				if (Towardsobj.listBillTowards == 0) {
					alert("Name not found");
				} else {

					$("#DRRDiv1").setTemplate(BillTowardsManagementTemp);
					$("#DRRDiv1").processTemplate(Towardsobj);
					for ( var i = 1; i <= 2; i++) {
						$("#two" + i).attr("disabled", "disabled");
						// $("#two" + i).attr("readonly", "readonly");
						$("#chk" + i).attr("disabled", "disabled");
					}

					$("#seltowards").setTemplate(setTowardstemp);
					$("#seltowards").processTemplate(Towardsobj);
				}
			}
		});
	}
}

function dispTowardsDashboard() {
	rowCount = 1;

	var searchbyTowards = $("#searchbyTowards").val();
	var inputs = [];
	inputs.push('action=getBillTowards');
	inputs.push('searchbyTowards=' + encodeURIComponent(searchbyTowards));

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
			
			$("#hiddenTowardsDetail").val(ajaxResponse);
			Towardsobj = eval('(' + ajaxResponse + ')');
			$("#DRRDiv1").setTemplate(BillTowardsManagementTemp);
			$("#DRRDiv1").processTemplate(Towardsobj);
			for ( var i = 1; i <= 2; i++) {
				$("#two" + i).attr("disabled", "disabled");
				// $("#two" + i).attr("readonly", "readonly");
				$("#chk" + i).attr("disabled", "disabled");
			}

			$("#seltowards").setTemplate(setTowardstemp);
			$("#seltowards").processTemplate(Towardsobj);
		}
	});
}

var setTowardstemp = '{#foreach $T.listBillTowards as listBillTowards}<option value="{$T.listBillTowards.tname}">{$T.listBillTowards.tname}</option>{#/for}';

/** ******************** End Chart Management ******************* */

/** ***************** Start Template Management ***************** */

var fetchTempNameTemp = "<option value='0' onclick=setNewTemp()>NewTemplate</option>{#foreach $T.tml as tml}<option onclick=setUpdateTemp('{$T.tml.idtm}') value={$T.tml.idtm} >{$T.tml.tmpNm}</option>{#/for}";

function fetchTempName() {

	$("#divTempNm").hide();
	$("#divPrescriptionTemp").hide();
	$("#divPrescriptionTbody").hide();

	var TempTyp = $("#txtICDcode").val();
	if (TempTyp == "") {

		alert("Please Select ICD10 Code.");

	} else {

		var inputs = [];
		inputs.push('action=fetchAllTempName');
		inputs.push('TempTyp=' + TempTyp);
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

				var obj = eval('(' + ajaxResponse + ')');

				$("#selTempName").setTemplate(fetchTempNameTemp);
				$("#selTempName").processTemplate(obj);
			}
		});
	}
}

function setNewTemp() {

	$("#divTempNm").show();
	$("#divPrescriptionTemp").show();
	$("#divPrescriptionTbody").show();

	$("#selTempName").val(0);
	$("#txtTempName").val("");
	$("#txtTempId").val(0);
	$("#divPrescription").html("");
	createDivPriscription();
	$("#btnSave").val("Save Now");
	$("#addRowCount").val(1);
	$("#RowCount").val(1);
}

var icdDiagnosisTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 15px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>ICD10 Code</div></th>"
		+ "<th class='numeric col-md-5-1 center' style='height: 21.5px;'><div class='TextFont'>ICD Diagnosis</div></th>"
		+ "<th class='numeric col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Select</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 250px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.icd10_L_List as icd10_L_List}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.icd10_L_List.icd_code_L}</td>"
		+ "<td class='col-sm-5-1 center' style='height: 21.5px;'>{$T.icd10_L_List.name_L}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
		+ "<input type='button' class='btn btn-xs btn-success' value='Get ICD10 Code' onclick=setICD10Diagno('{$T.icd10_L_List.icd_code_L}') />"
		+ "<input type='hidden' id = 'Code_name' value='{$T.icd10_L_List.name_L}' />"
		+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function searchICD10Diagno() {
	count = 1;
	var serchTxt = $.trim($("#serchTxt").val());

	if (serchTxt == "") {
		alert("Please Enter Something For Search ");
		return false;
	} else {

		var inputs = [];
		inputs.push('action=SearchICD10');
		inputs.push('serchTxt=' + encodeURIComponent(serchTxt));
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
				ICDbean = eval('(' + ajaxResponse + ')');

				if (ICDbean.icd10_L_List.length == 0) {
					alert("Please Enter Valid ICD10 Code For Search.");
				}

				$("#icdDiagnosis").setTemplate(icdDiagnosisTemp);

				$("#icdDiagnosis").processTemplate(ICDbean);
			}
		});
	}
}

function setICD10Diagno(icd10code) {
	var digno = $("#Code_name").val();

	$("#txtICD10CodeNm").val(" ");
	$("#txtICDcode").val(" ");
	$("#txtICD10CodeNm").val(icd10code + " " + digno);

	$("#txtICDcode").val(icd10code);
	$(".close").click();

	fetchTempName();
	return false;
}

var setPrescriptionTemp = '{#foreach $T.tpcli as tpcli}'
		+ "<tr id='row{count}'>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<select id='prep{count}' class='form-control input-SmallText' name='prep{count}'>"
		+ "<option value='select'>--Select--</option>"
		+ "<option value='Tab'>Tab.</option>"
		+ "<option value='Capsule'>Capsule</option>"
		+ "<option value='Syrup'>Syrup</option>"
		+ "<option value='Injection'>Injection</option>"
		+ "<option value='IV'>IV</option>"
		+ "<option value='SR-Tab'>SR-Tab</option>"
		+ "<option value='Disp-Tab'>Disp-Tab</option></select></td>"

		+ "<td class='col-sm-2-1 center' style='height: 21.5px;' id='tdtxtMedicine{count}'>"
		+ "<input type='text' class='typeahead form-control input-SmallText' id='txtMedicine{count}' value='{$T.tpcli.medNm}'"
		+ "maxlength='100' onkeyup='setPrescriptionAutocompleteNameAdmin(this.id);' />"
		+ "</td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='txtStrength{count}' "
		+ "maxlength='100' value='{$T.tpcli.strng}' /></td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='txtDose{count}' "
		+ "maxlength='100' value='{$T.tpcli.dose}' /></td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='txtFrequency{count}' "
		+ "maxlength='100' value='{$T.tpcli.frqncy}' /></td>"

		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
		+ "<select class='form-control input-SmallText' id='txtInstruction{count}' ></select></td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='txtRoute{count}' "
		+ "maxlength='100'  value='{$T.tpcli.route}' /></td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' "
		+ "onkeypress='return validateNumbers(event)' id='txtDays{count}' "
		+ "value='{$T.tpcli.day}' /></td>"

		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' id='txtQty{count}' "
		+ "onkeypress='return validateNumbers(event)' value='{$T.tpcli.qty}' /></td>"

		+ "<td class='center' style='height: 21.5px;'>"
		+ "<input type='checkbox' name='checkbox{count}' id='checkbox{count}' value='{$T.tpcli.idtpc}' /></td>"
		+ "<input type='hidden' value='{$T.tpcli.idtpc}'  id='idtpc{count}' name='idtpc{count}' />"
		+ "<input type='hidden' value='{count++}'  id='txtRowCount' name='txtRowCount' />"
		+ "</tr>{#/for}"
		+ "<input type='hidden' value='{--count}' id='addRowCount' />"
		+ "<input type='hidden' value='{count}' id='RowCount' />";

function setUpdateTemp(idtm) {

	$("#txtTempName").val($("#selTempName option[value=" + idtm + "]").text());
	$("#idTempMast").val(idtm);

	$("#divTempNm").show();
	$("#divPrescriptionTemp").show();
	$("#divPrescriptionTbody").show();

	count = 1;
	var inputs = [];
	inputs.push('action=fetchTempDetails');
	inputs.push('selTempTyp=' + idtm);
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
			obj1 = eval('(' + ajaxResponse + ')');

			$("#divPrescription").setTemplate(setPrescriptionTemp);
			$("#divPrescription").processTemplate(obj1);

			$('#activeSts:checked').val() == 'true';
			$('input:radio[name="radioStatus"]').filter('[value="Y"]').attr(
					'checked', true);

			var lang = $("#language").html();
			var instructionID = "";
			for ( var i = 0; i < obj1.tpcli.length; i++) {

				// setting prep
				if (obj1.tpcli[i].prep == "select") {
					$("#prep" + (i + 1)).val('select');
				} else {
					$("#prep" + (i + 1)).val(obj1.tpcli[i].prep);
				}

				// setting instruction
				instructionID = "txtInstruction" + (i + 1);
				if (lang == "Marathi") {
					$("#" + instructionID).html(
							$("#InstructionListMarathi").html());
				} else {
					$("#" + instructionID).html(
							$("#InstructionListEnglish").html());
				}

				$("#" + instructionID).val(obj1.tpcli[i].inst);
			}

			if (obj1.tpcli.length == 0) {
				$("#idTempMast").val(0);
				$("#btnSave").val("Update Now");
			} else {
				$("#idTempMast").val(obj1.tpcli[0].idtm);
				$("#btnSave").val("Update Now");
			}
		}
	});
}

/** *********Create Division for Prescription*************** */

var i = 1;

function createDivPriscription() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var prep = $("#prep" + rowCount + "").val();
		var txtMedicine = $("#txtMedicine" + rowCount + "").val();
		var txtStrength = $("#txtStrength" + rowCount + "").val();
		var txtDose = $("#txtDose" + rowCount + "").val();
		var txtFrequency = $("#txtFrequency" + rowCount + "").val();
		var txtInstruction = $("#txtInstruction" + rowCount + "").val();
		var txtRoute = $("#txtRoute" + rowCount + "").val();
		var txtDays = $("#txtDays" + rowCount + "").val();
		var txtQty = $("#txtQty" + rowCount + "").val();

		if (prep == "select" && txtMedicine == "" && txtStrength == ""
				&& txtDose == "" && txtFrequency == "" && txtInstruction == ""
				&& txtRoute == "" && txtDays == "" && txtQty == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;

	divId = "row" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("divPrescription").appendChild(x);
	document.getElementById(divId).innerHTML = "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ (rowCount)
			+ "</td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<select id='prep"
			+ rowCount
			+ "' class='form-control input-SmallText' name='prep"
			+ rowCount
			+ "'>"
			+ "<option value='select'>--Select--</option>"
			+ "<option value='Tab'>Tab.</option>"
			+ "<option value='Capsule'>Capsule</option>"
			+ "<option value='Syrup'>Syrup</option>"
			+ "<option value='Injection'>Injection</option>"
			+ "<option value='IV'>IV</option>"
			+ "<option value='SR-Tab'>SR-Tab</option>"
			+ "<option value='Disp-Tab'>Disp-Tab</option></select></td>"

			+ "<td class='col-sm-2-1 center' style='height: 21.5px;' id='tdtxtMedicine"
			+ rowCount
			+ "'>"
			+ "<input type='text' class='typeahead form-control input-SmallText' id='txtMedicine"
			+ rowCount
			+ "' maxlength='100' onkeyup='setPrescriptionAutocompleteNameAdmin(this.id);' />"
			+ "</td>"

			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' id='txtStrength"
			+ rowCount
			+ "' maxlength='100' /></td>"

			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' id='txtDose"
			+ rowCount
			+ "' maxlength='100' /></td>"

			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' id='txtFrequency"
			+ rowCount
			+ "' maxlength='100' /></td>"

			+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
			+ "<select class='form-control input-SmallText' id='txtInstruction"
			+ rowCount
			+ "' ></select></td>"

			// + "<input type='text' class='form-control input-SmallText'
			// id='txtInstruction" + rowCount + "' ></td>"

			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' id='txtRoute"
			+ rowCount
			+ "' maxlength='100' /></td>"

			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' "
			+ "onkeypress='return validateNumbers(event)' id='txtDays"
			+ rowCount
			+ "' /></td>"

			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' id='txtQty"
			+ rowCount
			+ "' onkeypress='return validateNumbers(event)'></td>"

			+ "<td class='center' style='height: 21.5px;'>"
			+ "<input type='checkbox' name='checkbox"
			+ rowCount
			+ "' id='checkbox"
			+ rowCount
			+ "'  /></td>"
			+ "<input type='hidden' id='idtpc"
			+ rowCount
			+ "' name='idtpc"
			+ rowCount + "' value='0' /></tr>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

	// For Prescription multilpe language
	var lang = $("#language").html();
	var instructionID = "txtInstruction" + rowCount;
	if (lang == "Marathi") {
		$("#" + instructionID).html($("#InstructionListMarathi").html());
	} else {
		$("#" + instructionID).html($("#InstructionListEnglish").html());
	}
	// $(".name").autocomplete("AutoSuggetionServlet?auto=Prescription");
}

function setPrepNameID(rowCount) {

	var arrayPrepNameID = ($("#txtMedicine" + rowCount).val()).split("_");

	if (arrayPrepNameID[1] == "" || arrayPrepNameID[1] == undefined) {
		alert("Please Enter Prescription test name...");
		$("#txtMedicine" + rowCount).val("");
		$("#medicineID").val("0");
		// SetFocus("name");
		// $("#").prop("disabled", "disabled");
		return false;
	}
	$("#txtMedicine" + rowCount).val(arrayPrepNameID[0]);
	$("#medicineID").val(arrayPrepNameID[1]);

}

function calQtyOfPrecription(count) {

	var temp = 0;
	if ($('#M' + count).attr('checked')) {
		++temp;
	}
	if ($('#A' + count).attr('checked')) {
		++temp;
	}
	if ($('#E' + count).attr('checked')) {
		++temp;
	}
	if ($('#N' + count).attr('checked')) {
		++temp;
	}
	var days = $("#txtDays" + count).val();
	var qty = days * temp;
	$("#txtQty" + count).val(qty);
}

/** **************Remove Prescription Division********************** */

function removeDivPriscription(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;
	// alert(rowCount);
	var allVals = [];
	for ( var n = 1; n <= rowCount; n++) {

		var $radios = $('input:checkbox[name=checkbox' + n + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#row" + n).remove();
			remVals.push(n);
		}
	}
}

function saveTempDetail() {

	var status = $('input:radio[name=radioStatus]:checked').val();
	var queryType = $("#btnSave").val();
	var idTempMast = $("#idTempMast").val();
	var tempName = $("#txtTempName").val();

	var selTempTyp = $("#txtICDcode").val();
	var txtICD10CodeNm = $("#txtICD10CodeNm").val();

	if (txtICD10CodeNm == null || txtICD10CodeNm == "") {

		alert("Please Select ICD10 Code Name.");
		return false;
	}

	if (tempName == null || tempName == "") {

		alert("Please Select Template Name.");
		return false;
	}

	if (status == null || status == "") {

		alert("Please Set Template Status.");
		return false;
	}

	var patient = 0;

	patient = {
		tpcli : []
	};
	var rowCount = $("#RowCount").val();

	var count = 0;
	if (rowCount == 0 && status == 'Y') {
		alert("You can not save empty fields..");
		return false;
	}

	for ( var i = 1; i <= rowCount; i++) {
		count++;

		if (jQuery.inArray(count, remVals) != 0) {

			var prep = $("#prep" + count + "").val();
			var txtMedicine = $("#txtMedicine" + count + "").val();
			var txtStrength = $("#txtStrength" + count + "").val();
			var txtDose = $("#txtDose" + count + "").val();
			var txtFrequency = $("#txtFrequency" + count + "").val();
			var txtInstruction = $("#txtInstruction" + count + "").val();
			var txtRoute = $("#txtRoute" + count + "").val();
			var txtDays = $("#txtDays" + count + "").val();
			var txtQty = $("#txtQty" + count + "").val();
			var txtPresdetId;
			if (queryType == "Save Now") {
				txtPresdetId = 0;
			} else {
				txtPresdetId = $("#idtpc" + count + "").val();
			}

			if (prep == "select" && txtMedicine == "" && txtStrength == ""
					&& txtDose == "" && txtFrequency == ""
					&& txtInstruction == "" && txtRoute == "" && txtDays == ""
					&& txtQty == "") {
				alert("You can not save blank row.");
				return false;
			} else if (txtQty == 0 && txtDays == 0) {
				alert("You can not give empty precription Schedule.");
				return false;

			} else if (prep == "select") {
				alert("Please select Precription Type.");
				return false;

			}else if (txtMedicine != undefined) {

				patient.tpcli.push({
					"prep" : prep,
					"medNm" : txtMedicine,
					"strng" : txtStrength,
					"dose" : txtDose,
					"frqncy" : txtFrequency,
					"inst" : txtInstruction,
					"route" : txtRoute,
					"day" : txtDays,
					"qty" : txtQty,
					"idtpc" : txtPresdetId
				});
			}
		}
	}
	if (patient.tpcli.length == 0 && status == 'Y') {
		alert("You can not save empty fields..");
		return false;
	}

	patient = JSON.stringify(patient);
	var inputs = [];
	inputs.push('action=SaveTempDetails');
	inputs.push('queryType=' + queryType);
	inputs.push('patient=' + patient.decodeSpecialChars());
	inputs.push('tempName=' + encodeURIComponent(tempName));
	inputs.push('idTempMast=' + idTempMast);
	inputs.push('selTempTyp=' + selTempTyp);
	inputs.push('status=' + status);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			window.location.href = "PrescriptionTemp.jsp";
		}
	});
}

/** ***************** End Template Management ***************** */

/** ***************** Start Surgical Kit Management ***************** */

var fetchSurgicalKitNmTemp = "<option value='0' onclick=setNewSKTemp()>NewTemplate</option>{#foreach $T.skmli as skmli}<option onclick=setUpdateSKTemp('{$T.skmli.idskm}') value={$T.skmli.idskm} >{$T.skmli.knm}</option>{#/for}";
var fetchSurgicalKitNmTempForOpertion = "{#foreach $T.skmli as skmli}<option  value={$T.skmli.idskm} >{$T.skmli.knm}</option>{#/for}";
var fetchInstructionsTemp = "<option value='0' onclick='newTopic()'>NewTemplate</option>{#foreach $T.skmli as skmli}<option onclick=setUpdateSKTemp('{$T.skmli.idskm}','instructions') value={$T.skmli.idskm} >{$T.skmli.knm}</option>{#/for}";

/* ParentChildAdminInstruction POPUP OPDDoctorsDesk */
var fetchPCAdminInstructionTemp = "<option value='0' onclick='newTopicPCAdminInstruction()'>NewTemplate</option>"
		+ "{#foreach $T.skmli as skmli}"
		+ "<option onclick=setUpdateSKTemp('{$T.skmli.idskm}','instructions') value={$T.skmli.idskm} >{$T.skmli.knm}"
		+ "</option>{#/for}";

/* ParentChildAdminInstruction Treatment OPDDoctorsDesk */
var selPCTreatmentInstructionTempName = "<option value='0' onclick=''>--Select--</option>"
		+ "{#foreach $T.skmli as skmli}"
		+ "<option onclick=setViewPCTreatmentInstructionTemp('{$T.skmli.idskm}','instructions') value={$T.skmli.idskm} >{$T.skmli.knm}"
		+ "</option>{#/for}";

function newTopic() {
	$("#addRowCount").val(0);
	$("#RowCount").val(0);
	$("#selTempName").val(0);
	$("#txtTempName").val("");
	$("#txtTempId").val(0);
	$("#divSK").html("");
	createDivInstruction();
	$("#btnSave").val("Save Now");
	$("#addRowCount").val(1);
	$("#RowCount").val(1);
}

function fetchSurgicalKitNm(pageName) {

	var inputs = [];
	inputs.push('action=fetchAllSK');
	inputs.push('pageName=' + pageName);
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
			var obj = eval('(' + ajaxResponse + ')');
			if (pageName == 'surgicalkit') {
				$("#selTempName").setTemplate(fetchSurgicalKitNmTemp);
				$("#selTempName").processTemplate(obj);
			} else if (pageName == 'operation') {
				$("#selTempName")
						.setTemplate(fetchSurgicalKitNmTempForOpertion);
				$("#selTempName").processTemplate(obj);
			} else if (pageName == 'editoperation') {
				$("#selTempName")
						.setTemplate(fetchSurgicalKitNmTempForOpertion);
				$("#selTempName").processTemplate(obj);
			} else if (pageName == 'instructions') {
				$("#selTempName").setTemplate(fetchInstructionsTemp);
				$("#selTempName").processTemplate(obj);

				/* ParentChildAdminInstruction POPUP OPDDoctorsDesk */
				newTopicPCAdminInstruction();
				
				$("#selPCAdminInstructionTempName").setTemplate(
						fetchPCAdminInstructionTemp);
				$("#selPCAdminInstructionTempName").processTemplate(obj);

				/* ParentChildAdminInstruction Treatment OPDDoctorsDesk */
				/*
				 * $("#selPCTreatmentInstructionTempName").setTemplate(
				 * selPCTreatmentInstructionTempName);
				 * $("#selPCTreatmentInstructionTempName").processTemplate(obj);
				 */
			}
		}
	});
}

function setNewSKTemp() {
	$("#addRowCount").val(0);
	$("#RowCount").val(0);
	$("#selTempName").val(0);
	$("#txtTempName").val("");
	$("#txtTempId").val(0);
	$("#divSK").html("");
	createDivSK();
	$("#btnSave").val("Save Now");
	$("#addRowCount").val(1);
	$("#RowCount").val(1);
}

var setSKTemp = "{#foreach $T.skcli as skcli}"
		+ "<tr id='SK{count}'>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtMedicine{count}'  value='{$T.skcli.itnm}'></td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtQty{count}' value='{$T.skcli.qty}'></td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='checkbox' name='checkbox{count}' id='checkbox{count}' value='{$T.skcli.idskco}' /></td>"
		+ "<input type='hidden' value='{$T.skcli.idskco}'  id='idskco{count}' name='idskco{count}' />"
		+ "<input type='hidden' value='{count++}'  id='txtRowCount' name='txtRowCount' />"
		+ "</tr>{#/for}"
		+ "<input type='hidden' value='{--count}' id='addRowCount' />"
		+ "<input type='hidden' value='{count}' id='RowCount' />";

var setInstructionTemp = "{#foreach $T.skcli as skcli}"
		+ "<tr id='row{count}'>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtMedicine{count}'  value='{$T.skcli.itnm}'></td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='checkbox' name='checkbox{count}' id='checkbox{count}' value='{$T.skcli.idskco}' /></td>"
		+ "<input type='hidden' value='{$T.skcli.idskco}'  id='idskco{count}' name='idskco{count}' />"
		+ "<input type='hidden' value='{count++}'  id='txtRowCount' name='txtRowCount' />"
		+ "</tr>{#/for}"
		+ "<input type='hidden' value='{--count}' id='addRowCount' />"
		+ "<input type='hidden' value='{count}' id='RowCount' />";

/* ParentChildAdminInstruction OPDDoctorsDesk */
var TableBodyPCAdminInstructionTempName = "{#foreach $T.skcli as skcli}"
		+ "<tr id='PCAdminInstruction{count}'>"
		+ "<td>{count}</td>"
		+ "<td class='col-sm-2-1 center' >"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtMedicine{count}'  value='{$T.skcli.itnm}'></td>"
		+ "<td class='col-sm-2-1 center'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtMedicineM{count}'  value='{$T.skcli.item_nameM}'></td>"
		+ "<td class='col-sm-2-1 center'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtMedicineH{count}'  value='{$T.skcli.item_nameH}'></td>"
		+ "<td class='col-sm-2-1 center'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtMedicine1ol{count}'  value='{$T.skcli.item_name1ol}'></td>"
		+ "<td class='col-sm-2-1 center'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtMedicine2ol{count}'  value='{$T.skcli.item_name2ol}'></td>"
		+ "<td class='col-sm-2-1 center'>"
		+ "<input type='text' class='form-control input-SmallText' maxlength='100' id='txtMedicine3ol{count}'  value='{$T.skcli.item_name3ol}'></td>"
		+ "<td><input type='checkbox' name='checkboxPCAI{count}' value='{$T.skcli.idskco}' style='cursor: pointer' class='groupInstructionCheckbox' disabled='disabled' /></td>"
		+ "<input type='hidden' value='{$T.skcli.idskco}'  id='idskco{count}' name='idskco{count}' />"
		+ "<input type='hidden' value='{count++}'  id='txtRowCount' name='txtRowCount' />"
		+ "</tr>{#/for}"
		+ "<input type='hidden' value='{--count}' id='addRowCount' />"
		+ "<input type='hidden' value='{count}' id='RowCount' />";

function setUpdateSKTemp(idskm, pageName) {

	$("#txtTempName").val($("#selTempName option[value=" + idskm + "]").text());
	/* ParentChildAdminInstruction OPDDoctorsDesk */
	$("#inputPCAdminInstructionTempName").val(
			$("#selPCAdminInstructionTempName option[value=" + idskm + "]")
					.text());
	$("#idTempMast").val(idskm);

	count = 1;
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
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					obj1 = eval('(' + ajaxResponse + ')');
					$("#topic").html(ajaxResponse);

					if (pageName == "instructions") {
						$("#divSK").setTemplate(setInstructionTemp);
						$("#divSK").processTemplate(obj1);

						/* ParentChildAdminInstruction OPDDoctorsDesk */
						count = 1;
						$("#TableBodyPCAdminInstructionTempName").setTemplate(
								TableBodyPCAdminInstructionTempName);
						$("#TableBodyPCAdminInstructionTempName")
								.processTemplate(obj1);

					} else {
						$("#divSK").setTemplate(setSKTemp);
						$("#divSK").processTemplate(obj1);
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
					setTimeout(function(){userAccess();},100);
				}
			});
}

/** *********Create Division for Surgical Kit*************** */

var i = 1;

function createDivSK() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var txtMedicine = $("#txtMedicine" + rowCount + "").val();
		var txtInstruction = $("#txtInstruction" + rowCount + "").val();
		var txtDays = $("#txtDays" + rowCount + "").val();
		var txtQty = $("#txtQty" + rowCount + "").val();

		if (txtMedicine == "" && txtQty == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;

	divId = "row" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	x.setAttribute('style', 'width: 100%; ');
	document.getElementById("divSK").appendChild(x);

	document.getElementById(divId).innerHTML = "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ (rowCount)
			+ "</td>"
			+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' id='txtMedicine"
			+ rowCount
			+ "' maxlength='100' ></td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' id='txtQty"
			+ rowCount
			+ "'></td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='checkbox' name='checkbox"
			+ rowCount
			+ "' /></td>"
			+ "<input type='hidden' value='0'  id='idskco"
			+ rowCount
			+ "' name='idskco" + rowCount + "' />" + "</tr>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;

	$(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");

}

function saveSKDetail(pageType) {

	if (pageType == "surgicalKit") {

		var status = $('input:radio[name=radioStatus]:checked').val();
		if (status == null || status == "") {

			alert("Please Set Surgical Kit Status.");
			return false;
		}

		var queryType = $("#btnSave").val();
		var idTempMast = $("#selTempName").val();
		var tempName = $.trim($("#txtTempName").val());

		if (tempName == null || tempName == "") {

			alert("Please Enter Surgical Kit Name.");
			return false;
		}

		var objSKC = 0;

		objSKC = {
			skcli : []
		};
		var rowCount = $("#RowCount").val();

		var count = 0;
		if (rowCount == 0 && status == 'Y') {
			alert("You can not save empty fields.");
			return false;
		}

		for ( var i = 1; i <= rowCount; i++) {
			count++;
			var txtMedicine = $.trim($("#txtMedicine" + count + "").val());
			var txtQty = $.trim($("#txtQty" + count + "").val());

			var txtidskco = "";
			if (queryType == "Save Now") {
				txtidskco = 0;
			} else {
				txtidskco = $("#idskco" + count + "").val();
				// var txtidskco = $("#idskco" + count + "").val();
			}
			if (txtMedicine == "") {
				alert("Please Enter Medicine Name.");
				return false;
			} else if (txtQty == "") {
				alert("Please Enter Medicine Quantity");
				return false;
			}
			if (txtMedicine != undefined) {

				objSKC.skcli.push({
					"idskco" : txtidskco,
					"itnm" : txtMedicine,
					"qty" : txtQty,
					"idskm" : idTempMast
				});
			}
		}

		if (objSKC.skcli.length == 0 && status == 'Y') {
			alert("You can not save empty fields.");
			return false;
		}

		objSKC = JSON.stringify(objSKC);

	} else {

		var status = $('input:radio[name=radioStatus]:checked').val();

		if (status == null || status == "") {

			alert("Please Set Instruction Status.");
			return false;
		}

		var queryType = $("#btnSave").val();
		var idTempMast = $("#selTempName").val();
		var tempName = $.trim($("#txtTempName").val());

		if (tempName == null || tempName == "") {

			alert("Please Enter Topic Name.");
			return false;
		}

		var objSKC = 0;

		objSKC = {
			skcli : []
		};
		var rowCount = $("#RowCount").val();

		var count = 0;
		if (rowCount == 0 && status == 'Y') {
			alert("You can not save empty fields.");
			return false;
		}

		for ( var i = 1; i <= rowCount; i++) {
			count++;
			var txtMedicine = $.trim($("#txtMedicine" + count + "").val());
			var txtidskco = "";
			if (queryType == "Save Now") {
				txtidskco = 0;
			} else {
				txtidskco = $("#idskco" + count + "").val();
			}
			// var txtidskco = $("#idskco" + count + "").val();

			// if (txtMedicine == "") {
			// alert("Please Enter Instruction Name.");
			// return false;
			// }
			if (txtMedicine != undefined) {

				objSKC.skcli.push({
					"idskco" : txtidskco,
					"itnm" : txtMedicine,
					"idskm" : idTempMast
				});
			}
		}

		if (objSKC.skcli.length == 0 && status == 'Y') {
			alert("You can not save empty fields.");
			return false;
		}

		objSKC = JSON.stringify(objSKC);

	}
	var inputs = [];
	inputs.push('action=saveSKDetail');
	inputs.push('queryType=' + queryType);
	inputs.push('pageType=' + pageType);
	inputs.push('objSKC=' + objSKC);
	inputs.push('tempName=' + encodeURIComponent(tempName));
	inputs.push('idTempMast=' + idTempMast);
	inputs.push('status=' + status);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
		success : function(ajaxResponse) {

			alert(ajaxResponse);
			if (pageType == "surgicalKit") {
				window.location.href = "Surgical_Kit.jsp";
			} else {
				window.location.href = "Instructions.jsp";
			}
		}
	});
}

/** *********Create Division for Instruction*************** */

var i = 1;

function createDivInstruction() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var txtMedicine = $("#txtMedicine" + rowCount + "").val();
		var txtQty = $("#txtQty" + rowCount + "").val();

		if (txtMedicine == "" && txtQty == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;

	divId = "row" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', divId);
	document.getElementById("divSK").appendChild(x);
	document.getElementById(divId).innerHTML = "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ (rowCount)
			+ "</td>"
			+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
			+ "<input type='text' class='form-control input-SmallText' id='txtMedicine"
			+ rowCount
			+ "' maxlength='100' ></td>"
			+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
			+ "<input type='checkbox' name='checkbox"
			+ rowCount
			+ "' /></td>"
			+ "<input type='hidden' value='0'  id='idskco"
			+ rowCount
			+ "' name='idskco" + rowCount + "' />" + "</tr>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
}

/** **************Remove Surgical Kit Division********************** */

function removeDivSK(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;

	var allVals = [];
	for ( var n = 1; n <= rowCount; n++) {

		var $radios = $('input:checkbox[name=checkbox' + n + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#row" + n).remove();
			remVals.push(n);
		}
	}
}

/** ***************** End Surgical Kit Management ***************** */

/** ********** hall type start ***************** */

var defaultViewHallTypeTemp = "{#foreach $T.htli as htli}<tr>	<td class='col-md-1-1 center' style='height: 21.5px;'>{count++}.</td>	" +
		"<td class='col-md-2-1 center' id='idhType' style='height: 21.5px;'><input type='hidden' value='{$T.htli.idht}'/>{$T.htli.idht}</td>" +
		"<td class='numeric col-md-5-1 center' style='height: 21.5px;'>{$T.htli.htnm}</td>" +
		"<td class='numeric col-md-2-1 center' style='height: 21.5px;'>" +
		"<button style='font-size: 10px;' type='button' value='EDIT' class='btn btn-xs btn-success editUserAccess' id='btnEdit{count}' onclick='editHallType({$T.htli.idht})' disabled='disabled'>" +
		"<i class='fa fa-edit'></i></button></td>" +
		"<td class='numeric col-md-2-1 center' style='height: 21.5px;'>" +
		"<button style='font-size: 10px;' type='button' value='DELETE' class='btn btn-xs btn-success deleteUserAccess' id='btnDelete{count}' onClick='deleteHallType({$T.htli.idht})' disabled='disabled'>" +
		"<i class='fa fa-trash-o'></i></button></td></tr>{#/for}";

function defaultViewHallType() {
	$("#divInside").hide();
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}

	count = 1;
	var inputs = [];
	inputs.push('action=fetchHallType');
	inputs.push('corporateId=' + sid);

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
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
			$("#hallDetailDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#bedMangTemp").setTemplate(defaultViewHallTypeTemp);
			$("#bedMangTemp").processTemplate(pobj1);
			$("#divInside").show();
			setTimeout(function(){userAccess();},100);
		}
	});
}

function searchHallType(callFrom) {
	count = 1;
	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter Hall Type Name.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + encodeURIComponent(strValue));
	inputs.push('action=SearchHallType');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.htli.length == 0) {
				alert("Hall Type Not Found");
				$("#byName").val("");
			} else {
				$("#bedMangTemp").setTemplate(defaultViewHallTypeTemp);
				$("#bedMangTemp").processTemplate(pobj1);
				$("#byName").val("");
			}
			userAccess();
		}
	});
}

function deleteHallType(idht) {
	var r = confirm("Are You Confirm To Delete Hall Type.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteHallType');
		inputs.push('hallId=' + idht);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

var editHallTypeDetailsTemp = "<div style='height: 90%; border: 1px solid #ddd; padding-left: 5%;'>" +
							"<div class='col-md-12-1 center' style='padding-top: 2%;'><h4>Edit Hall Type</h4></div>" +
							"<div class='col-md-12-1'><div class='col-md-4-1' style='padding-top: 7.5%;'>Hall Type Name</div>" +
							"<div class='col-md-8-1' style='padding-top: 7%;'><div class='divide-10'></div>" +
							"<input type='text' id='hname' name='hname' class='col-md-10-1'	maxlength='150' value='{$T.htnm}'/>" +
							"<div class='col-md-1-1' style='color: red; padding-left:5px;'><b>*</b></div></div></div>" +
							"<div class='col-md-12-1' style='margin-top:9px;'>" +
							"<div class='col-md-4-1' style='margin-top:5px;'>Rehab Package Charge</div>" +
							"<div class='col-md-8-1' style='margin-top:9px;'><div class='divide-10'></div>" +
							"<input type='text' id='txtpkgCharges' name='txtpkgCharges'	onkeypress='return validatePrice(event)' class='col-md-10-1' maxlength='6' value='{$T.pkgchr}'/>" +
							"<div class='col-md-1-1' style='color:red; padding-left:5px;'><b>*</b></div></div></div>" +
							"<div class='divide-40'></div>" +
							"<div style='width: 95%; padding-top: 3%;' id='hallWiseCharge'>" +
							"<table style='margin-bottom: 9px;margin-top:150px;' class='datatable table table-bordered cf'><thead class='cf'>" +
							"<tr><th style='height: 21.5px;' class='col-md-4-1 center'>Charges</th>" +
							"<th style='height: 21.5px;' class='col-md-4-1 center'>Normal Type</th>" +
							"<th style='height: 21.5px;' class='col-md-4-1 center'>Isolation Type</th></tr></thead>" +
							"<tbody><tr><td class='col-md-4-1'>Speciality</td>" +
							"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1' id='txtSpecialityNormal' onkeypress='return validatePrice(event)' maxlength='6'></td>" +
							"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1'	id='txtSpecialityIsolation'	onkeypress='return validatePrice(event)' maxlength='6'></td></tr>" +
							"<tr><td class='col-md-4-1'>Super Speciality</td><td class='col-md-4-1'><div class='divide-10'></div>" +
							"<input type='text' class='col-md-12-1'	id='txtSuperSpecialityNormal' onkeypress='return validatePrice(event)' maxlength='6'></td>" +
							"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1' id='txtSuperSpecialityIsolation' onkeypress='return validatePrice(event)' maxlength='6'></td></tr>" +
							"<tr><td class='col-md-4-1'>Intencivist</td><td class='col-md-4-1'><div class='divide-10'></div>" +
							"<input type='text' class='col-md-12-1'	id='txtIntencivistNormal' onkeypress='return validatePrice(event)' maxlength='6'></td>" +
							"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1' id='txtIntencivistIsolation' onkeypress='return validatePrice(event)' maxlength='6'></td></tr>" +
							"<tr><td class='col-md-4-1'>Medical Team</td><td class='col-md-4-1'><div class='divide-10'></div>" +
							"<input type='text' class='col-md-12-1'	id='txtMedicalNormal' onkeypress='return validatePrice(event)' maxlength='6'></td>" +
							"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1'	id='txtMedicalIsolation' onkeypress='return validatePrice(event)' maxlength='6'></td></tr></tbody></table></div>" +
							"<input type='hidden' id='idht' value='{$T.idht}'> <input type='hidden' id='queryType' value='update'> " +
							"<input type='hidden' id='isolationrowid' value='' > <input type='hidden' id='normalrowid' value=''></div>";

function editHallType(idht) {
	// $("#idhType").val(idht);
	ajaxResponse = $("#hallDetailDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.htli.length; i++) {
		if (myArray.htli[i].idht == idht) {
			myObj = myArray.htli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	hallBean = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#bedMangTemp1").setTemplate(editHallTypeDetailsTemp);
	$("#bedMangTemp1").processTemplate(hallBean);

	for ( var i = 0; i < hallBean.lihtchr.length; i++) {
		if (hallBean.lihtchr[i].isoflg == "Y") {

			$("#txtSpecialityIsolation").val(hallBean.lihtchr[i].splnc);
			$("#txtSuperSpecialityIsolation").val(hallBean.lihtchr[i].supnc);
			$("#txtIntencivistIsolation").val(hallBean.lihtchr[i].intnc);
			$("#txtMedicalIsolation").val(hallBean.lihtchr[i].mednc);
			$("#isolationrowid").val(hallBean.lihtchr[i].idhtchr);
		} else {
			$("#txtSpecialityNormal").val(hallBean.lihtchr[i].splnc);
			$("#txtSuperSpecialityNormal").val(hallBean.lihtchr[i].supnc);
			$("#txtIntencivistNormal").val(hallBean.lihtchr[i].intnc);
			$("#txtMedicalNormal").val(hallBean.lihtchr[i].mednc);
			$("#normalrowid").val(hallBean.lihtchr[i].idhtchr);
		}
	}
}

function saveHallTypeDetails() {

	var hall_ID = $("#idht").val();
	var normalrowid = $("#normalrowid").val();
	var isolationrowid = $("#isolationrowid").val();

	var hname = ($("#hname").val()).trim();
	var txtpkgCharges = $("#txtpkgCharges").val();
	var txtSpecialityNormal = $("#txtSpecialityNormal").val();
	var txtSpecialityIsolation = $("#txtSpecialityIsolation").val();
	var txtSuperSpecialityNormal = $("#txtSuperSpecialityNormal").val();
	var txtSuperSpecialityIsolation = $("#txtSuperSpecialityIsolation").val();
	var txtIntencivistNormal = $("#txtIntencivistNormal").val();
	var txtIntencivistIsolation = $("#txtIntencivistIsolation").val();
	var txtMedicalNormal = $("#txtMedicalNormal").val();
	var txtMedicalIsolation = $("#txtMedicalIsolation").val();

	var queryType = $("#queryType").val();
	if (hname == "") {
		alert("Please Enter Hall Type Name.");
		SetFocus("hname");
		return false;
	} else if (txtpkgCharges == "") {
		alert("Please Enter Rehab Package Charges");
		SetFocus("txtpkgCharges");
		return false;
	} else if (txtSpecialityNormal == "") {
		alert("Please Enter Speciality Normal Type");
		SetFocus("txtSpecialityNormal");
		return false;
	} else if (txtSpecialityIsolation == "") {
		alert("Please Enter Speciality Isolation Type");
		SetFocus("txtSpecialityIsolation");
		return false;
	} else if (txtSuperSpecialityNormal == "") {
		alert("Please Enter Super Speciality Normal Type");
		SetFocus("txtSuperSpecialityNormal");
		return false;
	} else if (txtSuperSpecialityIsolation == "") {
		alert("Please Enter Super Speciality Isolation Type");
		SetFocus("txtSuperSpecialityIsolation");
		return false;
	} else if (txtIntencivistNormal == "") {
		alert("Please Enter Intensivist Normal Type");
		SetFocus("txtIntencivistNormal");
		return false;
	} else if (txtIntencivistIsolation == "") {
		alert("Please Enter Intensivist Isolation Type");
		SetFocus("txtIntencivistIsolation");
		return false;
	} else if (txtMedicalNormal == "") {
		alert("Please Enter Medical Team Normal Type");
		SetFocus("txtMedicalNormal");
		return false;
	} else if (txtMedicalIsolation == "") {
		alert("Please Enter Medical Team Isolation Type");
		SetFocus("txtMedicalIsolation");
		return false;
	}

	var inputs = [];
	inputs.push('action=SaveHallTypeDetails');
	inputs.push('queryType=' + queryType);
	inputs.push('hall_ID=' + hall_ID);
	inputs.push('hname=' + encodeURIComponent(hname));

	inputs.push('txtpkgCharges=' + encodeURIComponent(txtpkgCharges));
	inputs.push('txtSpecialityNormal='
			+ encodeURIComponent(txtSpecialityNormal));
	inputs.push('txtSpecialityIsolation='
			+ encodeURIComponent(txtSpecialityIsolation));
	inputs.push('txtSuperSpecialityNormal='
			+ encodeURIComponent(txtSuperSpecialityNormal));
	inputs.push('txtSuperSpecialityIsolation='
			+ encodeURIComponent(txtSuperSpecialityIsolation));
	inputs.push('txtIntencivistNormal='
			+ encodeURIComponent(txtIntencivistNormal));
	inputs.push('txtIntencivistIsolation='
			+ encodeURIComponent(txtIntencivistIsolation));
	inputs.push('txtMedicalNormal=' + encodeURIComponent(txtMedicalNormal));
	inputs.push('txtMedicalIsolation=' + txtMedicalIsolation);
	inputs.push('normalrowid=' + normalrowid);
	inputs.push('isolationrowid=' + isolationrowid);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery
			.ajax({
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
					alert(r);

					if (ajaxResponse != "Hall Type Name is Already Present In The database.")

						window.location = "HallTypeManagement.jsp";
				}
			});
	// defaultViewHall();
	// location.reload();
}

var addHallTypeDetailsTemp = "<div style='height: 90%; border: 1px solid #ddd; padding-left: 5%;'>" +
		"<div class='col-md-12-1 center' style='padding-top: 2%;'><h4>Add Hall Type</h4></div>" +
		"<div class='col-md-12-1'><div class='col-md-4-1' style='padding-top: 7.5%;'>Hall Type Name</div>" +
		"<div class='col-md-8-1' style='padding-top: 7%;'><div class='divide-10'></div>" +
		"<input type='text' id='hname' name='hname' class='col-md-10-1'	maxlength='150' />" +
		"<div class='col-md-1-1' style='color: red; padding-left:5px;'><b>*</b></div></div></div>" +
		"<div class='col-md-12-1' style='margin-top:9px;'>" +
		"<div class='col-md-4-1' style='margin-top:5px;'>Rehab Package Charge</div>" +
		"<div class='col-md-8-1' style='margin-top:9px;'><div class='divide-10'></div>" +
		"<input type='text' id='txtpkgCharges' name='txtpkgCharges'	onkeypress='return validatePrice(event)' class='col-md-10-1' maxlength='6' />" +
		"<div class='col-md-1-1' style='color:red; padding-left:5px;'><b>*</b></div></div></div>" +
		"<div class='divide-40'></div>" +
		"<div style='width: 95%; padding-top: 3%;' id='hallWiseCharge'>" +
		"<table style='margin-bottom: 9px;margin-top:150px;' class='datatable table table-bordered cf'><thead class='cf'>" +
		"<tr><th style='height: 21.5px;' class='col-md-4-1 center'>Charges</th>" +
		"<th style='height: 21.5px;' class='col-md-4-1 center'>Normal Type</th>" +
		"<th style='height: 21.5px;' class='col-md-4-1 center'>Isolation Type</th></tr></thead>" +
		"<tbody><tr><td class='col-md-4-1'>Speciality</td>" +
		"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1' id='txtSpecialityNormal' onkeypress='return validatePrice(event)' maxlength='6'></td>" +
		"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1'	id='txtSpecialityIsolation'	onkeypress='return validatePrice(event)' maxlength='6'></td></tr>" +
		"<tr><td class='col-md-4-1'>Super Speciality</td><td class='col-md-4-1'><div class='divide-10'></div>" +
		"<input type='text' class='col-md-12-1'	id='txtSuperSpecialityNormal' onkeypress='return validatePrice(event)' maxlength='6'></td>" +
		"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1' id='txtSuperSpecialityIsolation' onkeypress='return validatePrice(event)' maxlength='6'></td></tr>" +
		"<tr><td class='col-md-4-1'>Intensivist</td><td class='col-md-4-1'><div class='divide-10'></div>" +
		"<input type='text' class='col-md-12-1'	id='txtIntencivistNormal' onkeypress='return validatePrice(event)' maxlength='6'></td>" +
		"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1' id='txtIntencivistIsolation' onkeypress='return validatePrice(event)' maxlength='6'></td></tr>" +
		"<tr><td class='col-md-4-1'>Medical Team/Nursing Charges</td><td class='col-md-4-1'><div class='divide-10'></div>" +
		"<input type='text' class='col-md-12-1'	id='txtMedicalNormal' onkeypress='return validatePrice(event)' maxlength='6'></td>" +
		"<td class='col-md-4-1'><div class='divide-10'></div><input type='text' class='col-md-12-1'	id='txtMedicalIsolation' onkeypress='return validatePrice(event)' maxlength='6'></td></tr></tbody></table></div>" +
		"<input type='hidden' id='queryType' value='insert'></div>";

function addHallTypeDetails() {
	var userBean;
	$("#bedMangTemp1").setTemplate(addHallTypeDetailsTemp);
	$("#bedMangTemp1").processTemplate(userBean);
	$("#hname").focus();
}

/** ******************************* hall type end **************** */
/** **********Bed state start ***************** */

var defaultViewbedStateTemp = "{#foreach $T.bsli as bsli}<tr>	<td class='col-md-1-1'>{count++}.</td>	<td class='col-md-2-1 center'>{$T.bsli.bsid}</td>	<td class='  numeric col-md-5-1 center'>{$T.bsli.bs}</td>	{#/for}";

function defaultViewbedState() {
	count = 1;
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
			$("#BedStateDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#bedStateList").setTemplate(defaultViewbedStateTemp);
			$("#bedStateList").processTemplate(pobj1);
		}
	});
}

function deleteBedState(bsid) {
	var r = confirm("Are You Confirm To Delete Bed State.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteBedState');
		inputs.push('bedStateid=' + bsid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

var editBedStateDetailsTemp = "<div style='padding-left: 5%;'>	<div class='col-md-12-1 center'>		<h4>Edit Bed State</h4>	</div>	<div class='col-md-12-1'>		<div class='col-md-2-1' style='padding-top: 7.5%;'>Bed State Name</div>		<div class='col-md-8-1' style='padding-top: 7%;'>		<div class='divide-10'></div>	<input type='text' id='bedState' name='bedState' class='col-md-10-1'				value='{$T.bs}' /><input type='hidden' id='idbs' value='{$T.bsid}'>			<div class='col-md-1-1' style='color: red; float: right;'>				<b>*</b>			</div>		</div>	</div>	<input type='hidden' id='queryType' value='update'></div>";

function editBedState(bsid) {

	ajaxResponse = $("#BedStateDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.bsli.length; i++) {
		if (myArray.bsli[i].bsid == bsid) {
			myObj = myArray.bsli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	BedStateBean = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#addbedState").setTemplate(editBedStateDetailsTemp);
	$("#addbedState").processTemplate(BedStateBean);

}

function saveBedStateDetails() {

	var bedStateId = $("#idbs").val();
	var bedState = $("#bedState").val();

	var queryType = $("#queryType").val();
	if (bedState == "") {
		alert("Please Enter Bed State Name.");
	} else {

		var inputs = [];
		inputs.push('action=saveBedStateDetails');
		inputs.push('queryType=' + queryType);
		inputs.push('bedStateId=' + bedStateId);
		inputs.push('bedState=' + bedState);
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
				alert(r);
				window.location = "bedState.jsp";
			}
		});
	}
}

var addbedStateDetailsTemp = "<div style='padding-left: 5%;'>	<div class='col-md-12-1 center'>		<h4>Add Bed State</h4>	</div>	<div class='col-md-12-1'>		<div class='col-md-2-1' style='padding-top: 7.5%;'>Bed State Name</div>		<div class='col-md-8-1' style='padding-top: 7%;'>		<div class='divide-10'></div>	<input class='col-md-10-1' type='text' id='bedState' name='bedState'/>			<div class='col-md-1-1' style='color: red; float: right;'>				<b>*</b>			</div>		</div>	</div>	<input type='hidden' id='queryType' value='insert'></div>";

function addbedStateDetails() {
	var userBean;
	$("#addbedState").setTemplate(addbedStateDetailsTemp);
	$("#addbedState").processTemplate(userBean);
	$("#bedState").focus();
}

/** *******************************bed State end **************** */

/** ****************Operation Groups********************************* */

function deleteOTGroups(grpid) {
	var r = confirm("Are You Confirm To Delete Group Name.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deleteOTGroups');
		inputs.push('grpid=' + grpid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

var editGroupDetailsTemp = "<div class='col-md-12-1'	style='height: 370px; border: 1px solid #ddd; padding-left: 10% margin-top:15px;'>" +
"<div class='divide-20'></div>" +
"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Edit Group Name</h3></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Group Name:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='txtGrpName' name='txtGrpName' value='{$T.grpNm}' class='col-md-10-1 form-control input-SmallText' />" +
"<b	style='color: red;'>*</b></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Group Type:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='selGrpType' name='selGrpType' class='col-md-10-1 form-control input-SmallText' > " +
"<option value='select'>Select</option> " +
"<option value='minor OT'>Minor OT</option> " +
"<option value='speciality'>Speciality</option> " +
"<option value='super speciality'>Super Speciality</option> </select>" +	
"<b	style='color: red;'>*</b></div>" +
"<input type='hidden' id='queryType' value='update'> " +
"</div>";

function editOTGroup(grpid) {
	$("#queryType").val("update");
	
	ajaxResponse = $("#GroupeDiv").val();
	myArray = ajaxResponse;

	for ( var i = 0; i < myArray.grpli.length; i++) {
		if (myArray.grpli[i].grpid == grpid) {
			myObj = myArray.grpli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	groupDetails = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#addGroup").setTemplate(editGroupDetailsTemp);
	$("#addGroup").processTemplate(groupDetails);
	
	$("#groupId").val(groupDetails.grpid);
	
	$("#selGrpType").val(groupDetails.grpty);
}

var defaultOTGroupDetailsTemp = "<div class='col-sm-12-1' style='margin-top:-12px; border: 1px solid #ddd; overflow-y:scroll; height: 335px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.grpli as grpli}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.grpli.grpid}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.grpli.grpNm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editOTGroup({$T.grpli.grpid})'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onclick='deleteOTGroups({$T.grpli.grpid})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>"
		+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultOTGroupDetails(search) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#strValue").val());
	if(searhFlag == "search")
	{
		if(searchText == ""){
			alert("Please Enter Test Name !");
			setFocus("#strValue");
		}
	}
	
	var inputs = [];
	inputs.push('action=fetchGroupDetails');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + searchText);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchGroupDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#GroupeDiv").val(ajaxResponse);
			pobj1 = ajaxResponse;
			$("#GroupList").setTemplate(defaultOTGroupDetailsTemp);
			$("#GroupList").processTemplate(pobj1);
		}
	});
}

function searchOTGroupDetails(search) {
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#strValue").val());
	if(searhFlag == "search")
	{
		if(searchText == ""){
			alert("Please Enter Operation Group Name !");
			setFocus("#strValue");
		}
	}
	
	var inputs = [];
	inputs.push('action=searchGroupDetails');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + searchText);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/searchGroupDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#GroupeDiv").html(ajaxResponse);
			pobj1 = eval( ajaxResponse );
			$("#GroupList").setTemplate(defaultOTGroupDetailsTemp);
			$("#GroupList").processTemplate(pobj1);
		}
	});
}

var addGroupDetailsTemp = "<div class='col-md-12-1'	style='height: 370px; border: 1px solid #ddd; padding-left: 10% margin-top:15px;'>" +
"<div class='divide-20'></div>" +
"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Add Group Name</h3></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Group Name:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='txtGrpName' name='txtGrpName' class='col-md-10-1 form-control input-SmallText' />" +
"<b	style='color: red;'>*</b></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;padding-left: 10%;'>Group Type:</div>" +
"<div class='col-md-8-1' style='padding-top: 4.5%; padding-bottom:4%'>" +
"<select id='selGrpType' name='selGrpType' class='col-md-10-1 form-control input-SmallText' > " +
"<option value='select'>Select</option> " +
"<option value='minor OT'>Minor OT</option> " +
"<option value='speciality'>Speciality</option> " +
"<option value='super speciality'>Super Speciality</option> </select>" +	
"<b	style='color: red;'>*</b></div>" +
"<input type='hidden' id='queryType' value='insert'> " +
"</div>";

function addGroupDetails() {
	var userBean;
	$("#addGroup").setTemplate(addGroupDetailsTemp);
	$("#addGroup").processTemplate(userBean);

	$("#txtGrpName").focus();
	$("#queryType").val("insert");
}

function saveGroupDetails() {
	var groupId = $("#groupId").val();
	var grpName = $("#txtGrpName").val();
	var selGrpType = $("#selGrpType").val();

	var queryType = $("#queryType").val();
	if (grpName == "") {
		alert("Please Enter Group Name.");
		SetFocus("txtGrpName");
	} else if (selGrpType == "select") {
		alert("Please Enter Group Type.");
	} else {

		var inputs = [];
		inputs.push('action=saveOTGroupDetails');
		inputs.push('queryType=' + queryType);
		inputs.push('grpName=' + encodeURIComponent(grpName));
		inputs.push('selGrpType=' + selGrpType);
		inputs.push('groupId=' + groupId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "AdminServlet",
			url : "./ehat/otdata/saveOTGroupDetails",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "OTgroups.jsp";
			}
		});
	}
}
/** *************end operation groups****************************** */
/** ******************start user access Management***************************** */

var defaultViewUserAccessTemp = "{#foreach $T.ul as ul}<tr>"
		+ "<td class='col-md-1-1'>{count}.</td>"
		+ "<td id='tdPi{count}' class='col-md-2-1'>{$T.ul.ui}</td>	"
		+ "<td class='col-md-5-1'	id='uname{count}'>{$T.ul.fuNm}</td>	"
		+ "<td class='col-md-2-1'>{$T.ul.ut}</td>"
		+ "<td class='col-md-2-1 center' id='utype{count}'>"
		+ "<input style='font-size: 10px;' type='button' value='VIEW ACCESS' class='edit' onclick='fetchUserAccessView({$T.ul.ui},{count++})' />	</td></tr>{#/for}";

var defaultViewUserAccessTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%; margin-top: 15px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>User ID</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>User Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>User Type</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>View Access</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.ul as ul}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='tdPi{count}'>{$T.ul.ui}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;' id='uname{count}'>{$T.ul.title} {$T.ul.fname} {$T.ul.mname} {$T.ul.lname}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.ul.ut}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='utype{count}'>"
		+ "<button class='btn btn-xs btn-success' value='VIEW ACCESS' onclick='fetchUserAccessView({$T.ul.ui},{count++})'>"
		+ "<i class='fa fa-eye View'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewUserAccess() {

	$("#saveBtn").hide();
	$("#editBox").hide();
	count = 1;

	var inputs = [];
	inputs.push('action=fetchUser');
	inputs.push('callFrom=' + 'userSalsaryDash');
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
			
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#userMangTemp").setTemplate(defaultViewUserAccessTemp);
			$("#userMangTemp").processTemplate(pobj1);
		}
	});
}

function searchViewUserAccess(callFrom) {

	$("#saveBtn").hide();
	$("#editBox").hide();
	var byName = $("#byName").val();

	if (byName.trim() == "") {
		alert("Please Enter User Name For Search");
	} else {

		count = 1;

		var inputs = [];
		inputs.push('action=fetchUser');
		inputs.push('callFrom=' + 'userDashSearch');
		inputs.push('byName=' + encodeURIComponent(byName));
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
				count = 1;
				pobj1 = eval('(' + ajaxResponse + ')');
				if (pobj1.ul.length == 0) {
					alert("Please enter valid User Name.");
					$("#byName").val("");
				}
				
				if (callFrom == 'UserAccess') {
					$("#userMangTemp").setTemplate(defaultViewUserAccessTemp);
					$("#userMangTemp").processTemplate(pobj1);
				} else if (callFrom == 'EmpSalary') {

					$("#userMangTemp").setTemplate(
							defaultViewUserforSalaryMgmtTemp);
					$("#userMangTemp").processTemplate(pobj1);
				}
			}
		});
	}
}

function fetchUserAccessView(ui, cout) {

	$("#saveBtn").show();
	$("#editBox").show();

	$("#uid").html(ui);

	$("#unm").html($("#uname" + cout).html());

	count = 0;
	var inputs = [];
	inputs.push('action=fetchUserAccessView');
	inputs.push('callfrom=' + 'admin');
	inputs.push('ui=' + ui);
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

			$("#objUserAccess").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			if (pobj1.liua.length == 0) {
				$("#saveBtn").val("Save Now");
			} else if (pobj1.liua.length > 0) {
				$("#saveBtn").val("Update Now");
			}
		}
	});

	setTimeout(function() {
		fetchAllEhatModule();
	}, 300);
}

var fetchEhatModTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 97%; margin-top: 15px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Module Name</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Check</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 378px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.liem as liem}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count}.</td>"
		+ "<td id='mainModule__{$T.liem.idem}' class='col-sm-2-1' style='height: 21.5px;'>{$T.liem.modnm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<input type='checkbox' id='chk{count++}' value='{$T.liem.idem}' />"
		// + "<input id='subModButton{count++}'
		// data-target='#showSubModulesPopup' data-toggle='modal' class='btn
		// btn-xs btn-info'"
		// + " type='button' onclick='showSubModules({$T.liem.idem})' value='+'
		// style='float: right;' disabled='disabled' />"
		+ "</tr>{#/for}"
		+ "<input type='hidden' id='finalCount' value='{--count}' /></td>"
		+ "</tbody></table></div>";

function fetchAllEhatModule() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchAllEhatModule');
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
			
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#fetchAllEhatModuleTemp").setTemplate(fetchEhatModTemp);
			$("#fetchAllEhatModuleTemp").processTemplate(pobj1);
			/*
			 * $("#divEhatMod").setTemplate($("#fetchAllEhatModuleTemp").html());
			 * $("#divEhatMod").processTemplate(pobj1);
			 */
		}
	});

	if ($("#saveBtn").val() == "Update Now") {
		setTimeout(function() {
			setUserAccessView();
		}, 500);
	}
}

function setUserAccessView() {

	var objUserAccess = $("#objUserAccess").val();

	objUserAccess = eval('(' + objUserAccess + ')');

	var modli = objUserAccess.liua[0].modli;

	var modallli = [];

	modallli = modli.split(",");

	for ( var i = 0; i < modallli.length; i++) {
		$('#chk' + modallli[i]).prop('checked', true);
		$('#subModButton' + modallli[i]).prop('disabled', false);
	}
}

function saveUserAccessDetails() {

	var ui = $("#uid").html();

	var queryType = $("#saveBtn").val();

	var modli = "";
	for ( var i = 0; i <= $("#finalCount").val(); i++) {

		if ($('#chk' + i).is(':checked')) {

			modli = modli + $('#chk' + i).val() + ",";
			// alert("modli"+modli);
		}
	}
	if (modli == "") {
		alert("Please Check Atleast One Module For User ");
	} else {
		var inputs = [];
		inputs.push('action=SaveUserAccessDetails');
		inputs.push('ui=' + ui);
		inputs.push('modli=' + modli);
		inputs.push('queryType=' + queryType);
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');
		jQuery
				.ajax({
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
						alert(ajaxResponse);

						if (ajaxResponse == "User Access Details Is Saved Successfully..."
								|| ajaxResponse == "User Access Details Is Updated Successfully...") {

							window.location = "Users_Access_Management.jsp";
						}
					}
				});
	}
}

/** ******************end user access Management***************************** */

/** ********** Start OT Management************************** */

var addOtbtnTemp = '<input onclick="addOperationTheaterDetails()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add OT" />';

function setAddOtbtnTemp() {
	var userBean;
	$("#addOtDiv").setTemplate(addOtbtnTemp);
	$("#addOtDiv").processTemplate(userBean);
}

var addOTDetailsTemp = "<div class='col-md-12-1'	style='height: 345px; border: 1px solid #ddd; padding-left: 10%'>" +
"<div class='divide-20'></div>" +
"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Add Operation Theatre</h3></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;'>OT Name:</div>" +
"<div class='col-md-7-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='OTname' name='OTname' class='col-md-10-1 form-control input-SmallText' />" +
"<b	style='color: red;'>*</b></div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;'>OT Charges:</div>" +
"<div class='col-md-7-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='OTcharge' name='OTcharge' class='col-md-10-1 form-control input-SmallText' />" +
"<b	style='color: red;'>*</b></div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;'>OT Colour:</div>" +
"<div class='col-md-7-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
"<select onchange='updateOperationColor()' style='background: none repeat scroll 0% 0% green;' class='col-md-10-1 form-control input-SmallText' id='theaterColor'>" +
"<option value='green' style='background-color: green;'>green</option>" +
"<option value='orange' style='background-color: orange;'>orange</option>" +
"<option value='pink' style='background-color: pink;'>pink</option>" +
"<option value='red' style='background-color: red;'>red</option>" +
"<option value='yellow' style='background-color: yellow;'>yellow</option>" +		
"</select>" +
"<b	style='color: red;'>*</b></div></div>" +
"<input type='hidden' id='queryType' value='insert'></div>";


function addOperationTheaterDetails() {
	var userBean;
	$("#OTManagementDiv").setTemplate(addOTDetailsTemp);
	$("#OTManagementDiv").processTemplate(userBean);

	$("#OTname").focus();
}

function updateOperationColor() {
	var color = $("#theaterColor").val();
	$("#theaterColor").attr("style", "background-color:" + color);
}

function saveOTDetails() {
	var OT_ID = $("#idot").val();

	var OTname = $("#OTname").val();
	var OTcharge = $.trim($("#OTcharge").val());
	var queryType = $("#queryType").val();
	var color = $("#theaterColor").val();
	if (OTname == "") {
		alert("Please Enter OT Name.");
		SetFocus("OTname");
		return false;
	}
	if (OTcharge == "") {
		alert("Please Enter Operation theater Charges.");
		SetFocus("OTcharge");
		return false;
	} else {
       if (OT_ID == undefined || OT_ID == "" || OT_ID == null) {
					OT_ID = 0;
		}     
		var inputs = [];
		inputs.push('action=SaveOTDetails');
		inputs.push('queryType=' + queryType);
		inputs.push('OT_ID=' + OT_ID);
		inputs.push('color=' + color);
		inputs.push('OTname=' + encodeURIComponent(OTname));
		inputs.push('OTcharge=' + OTcharge);
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "AdminServlet",
			url : "./ehat/otdata/SaveOTDetails",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "operationTheaterManagement.jsp";
			}
		});
	}
}

var defaultViewOTTemp = "<div class='col-sm-12-1' style='margin-top:-12px; border: 1px solid #ddd; overflow-y:scroll; height: 310px; max-height: auto;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.liot as liot}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi{count}'>{$T.liot.otid}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.liot.otnm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onclick='editOT({$T.liot.otid})' >"
		+ "<i class='fa fa-edit'></i>" + "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnDelete{count}' onclick='deleteOT({$T.liot.otid})' >"
		+ "<i class='fa fa-trash-o'></i>" + "</button>"
		+ "</td>" + "</tr>" + "{#/for}" + "</tbody>" + "</table>" + "</div>";
function defaultViewOT() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchOTName');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchOTName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			$("#OTDetailDiv").val(ajaxResponse);
			pobj1 =  ajaxResponse;
			$("#OTMangTemp").setTemplate(defaultViewOTTemp);
			$("#OTMangTemp").processTemplate(pobj1);
		}
	});
}

var editOTDetailsTemp = "<div class='col-md-12-1'	style='height: 345px; border: 1px solid #ddd; padding-left: 10%'>" +
"<div class='divide-20'></div>" +
"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Add Operation Theatre</h3></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;'>OT Name:</div>" +
"<div class='col-md-8-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='OTname' name='OTname' value='{$T.otnm}' class='col-md-10-1 form-control input-SmallText' />" +
"<b	style='color: red;'>*</b></div><input type='hidden'	id='idot' value='{$T.otid}'></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;'>OT Charges:</div>" +
"<div class='col-md-7-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='OTcharge' name='OTcharge' value='{$T.otchrg}' class='col-md-10-1 form-control input-SmallText' />" +
"<b	style='color: red;'>*</b></div></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;'>OT Colour:</div>" +
"<div class='col-md-8-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
"<select onchange='updateOperationColor()' style='background: none repeat scroll 0% 0% green;' class='col-md-10-1 form-control input-SmallText' id='theaterColor'>" +
"<option value='green' style='background-color: green;'>green</option>" +
"<option value='orange' style='background-color: orange;'>orange</option>" +
"<option value='pink' style='background-color: pink;'>pink</option>" +
"<option value='red' style='background-color: red;'>red</option>" +
"<option value='yellow' style='background-color: yellow;'>yellow</option>" +		
"</select>" +
"<b	style='color: red;'>*</b></div>" +
"<input type='hidden' id='queryType' value='update'></div>";

function editOT(otid) {

	ajaxResponse = $("#OTDetailDiv").val();
	myArray = ajaxResponse;

	for ( var i = 0; i < myArray.liot.length; i++) {
		if (myArray.liot[i].otid == otid) {
			myObj = myArray.liot[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	OTBean = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#OTManagementDiv").setTemplate(editOTDetailsTemp);
	$("#OTManagementDiv").processTemplate(OTBean);
	setAddOtbtnTemp();
	$("#theaterColor").val(OTBean.color);
	$("#theaterColor").attr("style",
			"background-color:" + OTBean.color);
}

function deleteOT(otid) {
	var r = confirm("Are You Confirm To Delete Operation Theater.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeleteOT');
		inputs.push('OTId=' + otid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

function searchOT() {
	count = 1;
	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter OT Name.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + strValue);
	inputs.push('action=SearchOT');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/SearchOT",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			$("#OTDetailDiv").html(ajaxResponse);
			pobj1 =  ajaxResponse;
			if (pobj1.liot.length == 0) {
				alert("Operation Theater Name Not Found");
			} else {
				$("#OTMangTemp").setTemplate(defaultViewOTTemp);
				$("#OTMangTemp").processTemplate(pobj1);
			}
		}
	});
}

/** ********** End OT Management************************** */

/** ********** Visiting Doc Fee Mgmt start ***************** */

var defaultVisitingDocFeeViewTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 630px; margin-top: 20px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Visiting Doctor Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Fee</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit Fee</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 425px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.dl as dl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi2'>{$T.dl.di}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.dl.dn}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dl.df}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit' onclick='editVisitingDocFee({$T.dl.di})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewVisitingDocFee() {
	count = 1;

	var inputs = [];
	inputs.push('action=fetchAllVisitingDoc');

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
			$("#objDoc").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#TestContent").setTemplate(defaultVisitingDocFeeViewTemp);
			$("#TestContent").processTemplate(pobj1);
			setTimeout(function(){userAccess();},100);
		}
	});
}

var editVstDocFeeTemp = "<div	style='height: 100%; border: 1px solid #ddd;margin-top: 10px;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'><div style=''><h3>Edit Visiting Doctor Fee :</h3></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:7px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='ID'>ID</label>"
		+ "<label class='TextFont col-md-7-1' id='docIdDiv'>{$T.di}</label></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Name'>Name</label>"
		+ "<label class='TextFont col-md-7-1'>{$T.dn}</label></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Charges For'>Charges For</label>"
		+ "<select id='chargTypVD' class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'>"
		+ "<option onclick='showOPD()' value='OPD'>OPD</option>"
		+ "<option onclick='showProc()' value='Procedures'>Procedures</option></select></div>"
		+ "<div id= 'OPD'>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Applicable Fee</label>"
		+ "<select id='feeApp' class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'>"
		+ "<option value=''>-Select-</option>"
		+ "<option value='perday'>Per Day</option>"
		+ "<option value='prepatient'>Per Patient</option></select></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Fee For Patient<b style='color: red; padding-left: 3px;'>*</b>"
		+ "<b style='padding-left: 12px;'>Rs.</b></label>"
		+ "<input id='charges' name='charges' type='text' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' value='{$T.df}' /></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Fee For Hospital<b style='color: red; padding-left: 3px;'>*</b>"
		+ "<b style='padding-left: 7px;'>Rs.</b></label>"
		+ "<input id='hospcharges' name='hospcharges' type='text' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' value='{$T.flwfees}' /></div>"
		+ "</div>" + "</div></div>";

function editVisitingDocFee(docId) {
	var myobj = "";
	var objDoc = $("#objDoc").val();
	var objOp = $("#objOp").val();
	objOp = eval('(' + objOp + ')');
	objDoc = eval('(' + objDoc + ')');
	for ( var i = 0; i <= objDoc.dl.length; i++) {

		if (objDoc.dl[i].di == docId) {
			myobj = objDoc.dl[i];
			break;
		}
	}
	$("#divEdit").setTemplate(editVstDocFeeTemp);
	$("#divEdit").processTemplate(myobj);

	$("#feeApp").val(myobj.chargtyp);

	for ( var k = 0; k < myobj.liVDPro.length; k++) {
		for ( var j = 0; j < objOp.ol.length; j++) {

			if (myobj.liVDPro[k].opid == objOp.ol[j].oi) {

				$("#chargesVD" + myobj.liVDPro[k].opid).val(
						myobj.liVDPro[k].opcharg);

				$("#idVDPro" + myobj.liVDPro[k].opid).val(
						myobj.liVDPro[k].idVDPro);
			}
		}
	}
	showOPD();
}

function searchDocFee(type) {

	count = 1;
	var strValue = $("#strValue").val();
	strValue = $.trim(strValue);
	if (strValue == "") {
		alert("Please Enter Visiting Doctors Name For Search");
		SetFocus("strValue");
		return false;
	}
	var inputs = [];
	inputs.push('action=searchDocFeeInfo');
	inputs.push("strValue=" + strValue);
	inputs.push("type=" + type);
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
			ajaxResponse = r;
			$("#objDoc").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.dl.length == 0) {
				alert("Doctors Not Found.");
				SetFocus("strValue");
			} else {
				if (type == "visitingdoctor") {
					$("#TestContent")
							.setTemplate(defaultVisitingDocFeeViewTemp);
				} else {
					$("#TestContent")
							.setTemplate(defaultAnesthetistFeeViewTemp);
				}
				$("#TestContent").processTemplate(pobj1);
			}
			userAccess();
		}
	});
}

function saveEditVisitingDocFee() {
	if($("#divEdit").html() == ""){
		alert("Please Select Doctor Details for Update...");
		return false;
	}else{
	var chargTypVD = $("#chargTypVD").val();

	var docId = $("#docIdDiv").html();
	var feeApp = $("#feeApp").val();

	var charges = $("#charges").val();
	charges = $.trim(charges);
	if (charges == "" && chargTypVD == "OPD") {
		alert("Please enter Visiting Doctors Fee.");
		SetFocus("charges");
		return false;
	}

	var hospcharges = $("#hospcharges").val();
	hospcharges = $.trim(hospcharges);
	if (hospcharges == "" && chargTypVD == "OPD") {
		alert("Please enter Visiting Doctors Fee For Hospital.");
		SetFocus("hospcharges");
		return false;
	}

	var objOpVD = 0;

	objOpVD = {
		liVDPro : []
	};
	var rowCountOp = $("#rowCountOp").val();

	var count = 0;

	for ( var i = 1; i <= rowCountOp; i++) {
		count++;
		var opId = $.trim($("#opId" + count).val());

		var chargesVD = $.trim($("#chargesVD" + opId).val());
		var idVDPro = $("#idVDPro" + opId).val();

		if (chargesVD != "") {

			objOpVD.liVDPro.push({
				"idVDPro" : idVDPro,
				"docId" : docId,
				"opid" : opId,
				"opcharg" : chargesVD
			});
		} else {

			objOpVD.liVDPro.push({
				"idVDPro" : idVDPro,
				"docId" : docId,
				"opid" : opId,
				"opcharg" : "0"
			});
		}
	}

	if (objOpVD.liVDPro.length == 0 && chargTypVD == "Procedures") {
		alert("You can not save empty fields.");
		return false;
	}

	objOpVD = JSON.stringify(objOpVD);

	var inputs = [];
	inputs.push('action=UpdateVisitingDocFee');
	inputs.push('docId=' + docId);
	inputs.push('feeApp=' + feeApp);
	inputs.push('charges=' + charges);
	inputs.push('hospcharges=' + hospcharges);
	inputs.push('objOpVD=' + objOpVD);
	inputs.push('chargTypVD=' + chargTypVD);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery
			.ajax({
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
					alert(ajaxResponse);

					if (ajaxResponse == "Visiting Doctor Fee Details Is Updated Sucessfully...") {
						window.location = "visitingDocFeeManagement.jsp";
					}
				}
			});
	}
}

// Author : nIKHIL; Date : 30/9/2014
var fetchAllOperationTemp = "<table	class='datatable table table-bordered table-condensed cf' style='width:355px;>	"
		+ "<thead class='cf'><tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-5-1 center' style='height: 21.5px;'><div	class='TextFont'>Procedure Name</div></th>"
		+ "<th class='col-md-3-1 center' style='height: 21.5px;'><div	class='TextFont'>Hospital Charges</div></th>"
		+ "<th class='col-md-3-1 center' style='height: 21.5px;'><div	class='TextFont'>Doctor Charges</div></th>"
		+ "</tr></thead></table>"
		+ "<div class='col-md-12-1' style='margin-top:-21px;height: 150px; border: 1px solid #b8b8b8; max-height: auto; overflow-y: scroll;'>	"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>{#foreach $T.ol as ol}<tr>"
		+ "<td class='col-md-1-1 center'>{count++}.</td>"
		+ "<td class='col-md-5-1 center' id='oname{count}'>{$T.ol.on}</td>"
		+ "<td class='col-md-3-1 center' id='charge{count}'>{$T.ol.oc}</td>"
		+ "<td class='col-md-3-1 center'>"
		+ "<input style='width: 80%;' type='text'	id='chargesVD{$T.ol.oi}' onkeypress='return validateNumbers(event)' />"
		+ "<input	type='hidden' id='opId{count++}' value='{$T.ol.oi}' />"
		+ "<input	type='hidden' id='idVDPro{$T.ol.oi}' value='0' /></td></tr>{#/for}"
		+ "<input id='rowCountOp' value='{--count}' type='hidden' />"
		+ "</tbody></table></div>";

function fetchAllOperation() {

	var inputs = [];
	inputs.push('action=fetchOperation');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchOperation",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#objOp").val(ajaxResponse);
			pobj1 =  ajaxResponse ;
			$("#Procedures").setTemplate(fetchAllOperationTemp);
			// $("#Procedures").setTemplate($("#fetchAllOperationTemp").html());
			$("#Procedures").processTemplate(pobj1);
		}
	});
}

function showOPD() {
	$("#Procedures").hide();
	$("#OPD").show();
}

function showProc() {
	$("#OPD").hide();
	$("#Procedures").show();
}

/** ********** Visiting Doc Fee Mgmt end ***************** */

/** ********** Anesthetist Fee Mgmt start ***************** */

var defaultAnesthetistFeeViewTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 630px; margin-top: 20px;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>ID</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Anesthetist Doctor Name</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Fee</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit Fee</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 425px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.dl as dl}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;' id='divPi2'>{$T.dl.di}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.dl.dn}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.dl.df}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit' onclick='editAnesthetistFee({$T.dl.di})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>" + "</button>" + "</td>" + "</tr>"
		+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function defaultViewAnesthetistFee() {
	count = 1;

	var inputs = [];
	inputs.push('action=fetchAllAnesthetistDoc');

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
			$("#objDoc").val(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#TestContent").setTemplate(defaultAnesthetistFeeViewTemp);
			$("#TestContent").processTemplate(pobj1);
			setTimeout(function(){userAccess();},100);
		}
	});
}

var editAnsDocFeeTemp = "<div style='height: 100%; border: 1px solid #ddd;margin-top: 10px;'>"
		+ "<div style='padding-top: 0%; padding-left: 8%'>"
		+ "<div style=''><h3>Edit Anesthetist Doctor Fee :</h3></div>"
		+"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:9px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='ID'>ID</label>"
		+ "<label class='TextFont col-md-7-1' id='docIdDiv'>{$T.di}</label></div>"
		+"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' for='Name'>Name</label>"
		+ "<label class='TextFont col-md-7-1'>{$T.dn}</label></div>"
		+"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Applicable Fee</label>"
		+ "<select id='feeApp' class='form-control input-SmallText col-md-7-1' style='margin-left:0%;'>"
		+ "<option value=''>-Select-</option>"
		+ "<option value='preanesthesia'>Per Anesthesia</option>"
		+ "<option value='perhr'>Per Hour</option></select></div>"
		+"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Fee For Patient<b style='color: red; padding-left: 3px;'>*</b>"
		+ "<b style='padding-left: 12px;'>Rs.</b></label>"
		+ "<input id='charges' name='charges' type='text' onkeypress='return validateNumbers(event)' maxlength='7' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' value='{$T.df}' /></div>"
		+"<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1'>Fee For Hospital<b style='color: red; padding-left: 3px;'>*</b>"
		+ "<b style='padding-left: 7px;'>Rs.</b></label>"
		+ "<input id='hospcharges' name='hospcharges' type='text' onkeypress='return validateNumbers(event)' "
		+ "class='form-control input-SmallText col-md-7-1' required='true' style='margin-left:0%;' value='{$T.flwfees}' /></div>"
		+ "</div></div>";

function editAnesthetistFee(docId) {
	var myobj = "";
	var objDoc = $("#objDoc").val();
	objDoc = eval('(' + objDoc + ')');
	for ( var i = 0; i <= objDoc.dl.length; i++) {

		if (objDoc.dl[i].di == docId) {
			myobj = objDoc.dl[i];
			break;
		}
	}

	$("#divEdit").setTemplate(editAnsDocFeeTemp);
	$("#divEdit").processTemplate(myobj);
	$("#feeApp").val(myobj.chargtyp);
}

function saveAnesthetistFee() {

	var docId = $("#docIdDiv").html();
	var feeApp = $("#feeApp").val();
	var charges = $("#charges").val();
	charges = $.trim(charges);
	if (charges == null || charges == "") {
		alert("Please enter Anesthetist Doctors Fee For Patient.");
		SetFocus("charges");
		return false;
	}
	var hospcharges = $("#hospcharges").val();
	hospcharges = $.trim(hospcharges);
	if (hospcharges == null || hospcharges == "") {
		alert("Please enter Anesthetist Doctors Fee For Hospital.");
		SetFocus("hospcharges");
		return false;
	}

	var inputs = [];
	inputs.push('action=UpdateAnesthetistDocFee');
	inputs.push('docId=' + docId);
	inputs.push('feeApp=' + feeApp);
	inputs.push('charges=' + charges);
	inputs.push('hospcharges=' + hospcharges);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery
			.ajax({
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
					alert(ajaxResponse);

					if (ajaxResponse == "Anesthetist Doctor Fee Details Is Updated Sucessfully...") {
						window.location = "AnesthetistFeeManagement.jsp";
					}
				}
			});
}

/** ********** Anesthetist Fee Mgmt end ***************** */

/** ********** Procedure Type ***************** */
var addProcedureTypeDetailsTemp = "<div class='col-md-12-1'	style='height: 386px; border: 1px solid #ddd; padding-left: 10%'>" +
					"<div class='divide-20'></div>" +
					"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Add Procedure Type</h3></div>" +
					"<div class='col-md-12-1' style='padding-top: 5%;'>" +
					"<div class='col-md-4-1' style='padding-top: 2.5%;'>Procedure Type:</div>" +
					"<div class='col-md-7-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
					"<input type='text' id='PTname' name='PTname' class='col-md-10-1 form-control input-SmallText' />" +
					"<b	style='color: red;'>*</b></div></div>" +
					"<input type='hidden' id='queryType' value='insert'></div>";

function addOperationTypeDetails() {
	var userBean;
	$("#OTManagementDiv").setTemplate(addProcedureTypeDetailsTemp);
	$("#OTManagementDiv").processTemplate(userBean);

	$("#PTname").focus();
}

function saveProcedureTypeDetails() {
	var PT_ID = $("#idpt").val();

	var PTname = $("#PTname").val();

	var queryType = $("#queryType").val();
	if (PTname == "" ) {
		alert("Please Enter Procedure Type.");
		SetFocus("PTname");
	} else if (PTname.charAt(0) == " ") {
		alert("Please Enter Procedure Type.");
		SetFocus("PTname");
	}else{
		if (PT_ID == undefined || PT_ID == "" || PT_ID == null) {
					PT_ID = 0;
		}
		var inputs = [];
		inputs.push('action=SavePTDetails');
		inputs.push('queryType=' + queryType);
		inputs.push('PT_ID=' + PT_ID);
		inputs.push('PTname=' + encodeURIComponent(PTname));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "AdminServlet",
			url : "./ehat/otoperationmange/saveoperationType",
			timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(r);
				window.location = "operationTypeManagement.jsp";
			}
		});
	}
}

var defaultViewPTTemp = "<div class='col-sm-12-1' style='margin-top:-13px; overflow-y: scroll; height: 357px; max-height: auto;border:1px solid #ddd;'>"
		+ "<table class='table table-bordered table-striped table-condensed cf'>"
		+ "<tbody class='cf'>"
		+ "{#foreach $T.lipt as lipt}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lipt.idpt}</td>"
		+ "<td class='col-sm-2-1' style='height: 21.5px;'>{$T.lipt.ptnm}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit' onclick='editPT({$T.lipt.idpt})'>"
		+ "<i class='fa fa-edit'></i>" + "</button>"
		+ "</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success' value='DELETE' id='btnEdit' onclick='deletePT({$T.lipt.idpt})'>"
		+ "<i class='fa fa-trash-o'></i>" + "</button>"
		+ "</td>" + "</tr>{#/for}</tbody></table>" + "</div>";
function defaultViewPT() {
	count = 1;
	var inputs = [];
	inputs.push('action=fetchPTName');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchPTName",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			
			$("#OTDetailDiv").val(ajaxResponse);
			pobj1 =  ajaxResponse ;
			$("#OTMangTemp").setTemplate(defaultViewPTTemp);
			$("#OTMangTemp").processTemplate(pobj1);
		}
	});
}

var editPTDetailsTemp = "<div class='col-md-12-1'	style='height: 345px; border: 1px solid #ddd; padding-left: 10%'>" +
"<div class='divide-20'></div>" +
"<div class='col-md-12-1' style='padding-left: 10%;'><h3>Edit Procedure Type</h3></div>" +
"<div class='col-md-12-1' style='padding-top: 5%;'>" +
"<div class='col-md-4-1' style='padding-top: 2.5%;'>Procedure Type:</div>" +
"<div class='col-md-8-1' style='color: red;  padding-top: 4.5%; padding-bottom:4%'>" +
"<input type='text' id='PTname' name='PTname' class='col-md-10-1 form-control input-SmallText' value='{$T.ptnm}' />" +
"<b	style='color: red;'>*</b></div><input type='hidden' id='idpt' value='{$T.idpt}'></div>" +
"<input type='hidden' id='queryType' value='update'></div>";

function editPT(ptid) {

	ajaxResponse = $("#OTDetailDiv").val();
	myArray = ajaxResponse;

	for ( var i = 0; i < myArray.lipt.length; i++) {
		if (myArray.lipt[i].idpt == ptid) {
			myObj = myArray.lipt[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	OTBean = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#OTManagementDiv").setTemplate(editPTDetailsTemp);
	$("#OTManagementDiv").processTemplate(OTBean);
	setAddPtbtnTemp();
}

var addPtbtnTemp = '<input onclick="addOperationTypeDetails()"	style="font-size: 11px; background-color: #02cd1e; border: none; width: 100%; padding: 5px; cursor: pointer;"		type="button" value="Add PT" />';

function setAddPtbtnTemp() {
	var userBean;
	$("#addOtDiv").setTemplate(addPtbtnTemp);
	$("#addOtDiv").processTemplate(userBean);
}

function searchPT() {
	count = 1;
	var strValue = $("#byName").val();
	if (strValue == "") {
		alert("Please Enter Procedure Type.");
		return false;
	}
	var inputs = [];
	inputs.push("strValue=" + strValue);
	inputs.push('action=SearchPT');

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/SearchPT",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;

			$("#OTDetailDiv").val(ajaxResponse);
			pobj1 = ajaxResponse ;
			if (pobj1.lipt.length == 0) {
				alert("Operation Type Not Found");
			} else {
				$("#OTMangTemp").setTemplate(defaultViewPTTemp);
				$("#OTMangTemp").processTemplate(pobj1);
			}
		}
	});
}

function deletePT(ptid) {
	var r = confirm("Are You Confirm To Delete Procedure Type.");
	if (r == true) {

		var inputs = [];
		inputs.push('action=DeletePT');
		inputs.push('PTId=' + ptid);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "AdminServlet",
			url : "./ehat/otoperationmange/DeletePT",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
			}
		});
	}
}

function fetchDoctorSpecilizations1(page) {

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
			
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');
			for ( var i = 0; i < doctorBean.liSplz.length; i++) {

				if (page == 'custTemp') {

					var divDocSpec = eval('(' + ajaxResponse + ')');
					var doctorSpec = "<option value=''>--Select--</option>";

					for ( var int = 0; int < divDocSpec.liSplz.length; int++) {
						doctorSpec = doctorSpec + "<option value='"
								+ divDocSpec.liSplz[int].splzId + "'>"
								+ divDocSpec.liSplz[int].splzNm + "</option>";
						var array_element = divDocSpec.liSplz[int];

					}
					$('#selDocSpec').html(doctorSpec);
					
				}else if(page == 'diettemp'){
					var divDocSpec = eval('(' + ajaxResponse + ')');
					var doctorSpec = "<option value=''>--Select--</option>";

					for ( var int = 0; int < divDocSpec.liSplz.length; int++) {
						doctorSpec = doctorSpec + "<option value='"
								+ divDocSpec.liSplz[int].splzId + "'>"
								+ divDocSpec.liSplz[int].splzNm + "</option>";
						var array_element = divDocSpec.liSplz[int];

					}
					$('#selDocSpecDiet').html(doctorSpec);
				} else if(page == 'SubObjTemplate'){
                    
                    var divDocSpec = eval('(' + ajaxResponse + ')');
                    var doctorSpec = "<option value=''>--Select--</option>";                    
                    for ( var int = 0; int < divDocSpec.liSplz.length; int++) {
                        doctorSpec = doctorSpec + "<option value='"
                                + divDocSpec.liSplz[int].splzId + "'>"
                                + divDocSpec.liSplz[int].splzNm + "</option>";
                        var array_element = divDocSpec.liSplz[int];                    }
                    $('#iSpecialtity').html(doctorSpec);
                }else {

					var o = new Option("option text", "value");
					// / jquerify the DOM object 'o' so we can use the html
					// method
					$(o).html(doctorBean.liSplz[i].splzNm);
					$(o).val(doctorBean.liSplz[i].splzId);
					// alert(doctorBean.liSplz[i].splzId);
					// $("#selDocSpec").val(doctorBean.liSplz[i].splzId);
					$("#selDocSpec").append(o);
					$("#selName").append(o);
				}
			}
		}
	});
}

var doctorSpecilizationTempOperation = "<select	id='speName' style='width: 100%;'   ><option value='0'>Select</option>{#foreach $T.liDep as dpl}<option value='{$T.dpl.depId}'>{$T.dpl.depNm}</option>{#/for}</select>";

function fetchDoctorSpecilizationsForOperationManagement() {

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
		success : function(r) {
			var ajaxResponse = r;
			
			pobj1 = eval('(' + ajaxResponse + ')');
			doctorBean = eval('(' + ajaxResponse + ')');

			$("#specialization").setTemplate(doctorSpecilizationTempOperation);
			$("#specialization").processTemplate(doctorBean);
		}
	});
}

// var doctorDepartmentTempForAdmin = "<select id='deptName' style='width: 90%;'
// name='selDocName' id='selDocName' onchange='tempSetSpDept()' ><option
// value='0'>-select-</option>{#foreach $T.liDep as dpl}<option
// value='{$T.dpl.depId}'>{$T.dpl.depNm}</option>{#/for}</select>";

function fetchHospitalDepartments() {

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
			
			pobj1 = eval('(' + ajaxResponse + ')');

			doctorBean = eval('(' + ajaxResponse + ')');
			for ( var i = 0; i < doctorBean.liDep.length; i++) {
				var o = new Option("option text", "value");
				// / jquerify the DOM object 'o' so we can use the html method
				$(o).html(doctorBean.liDep[i].depNm);
				$(o).val(doctorBean.liDep[i].depId);
				// $("#selHosDept").val();
				$("#selHosDept").append(o);
			}
		}
	});
}

//temporary added by irfan 23-march-2018
function fetchHospitalDepartments1() {

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
			
			pobj1 = eval('(' + ajaxResponse + ')');

			doctorBean = eval('(' + ajaxResponse + ')');
			for ( var i = 0; i < doctorBean.liDep.length; i++) {
				var o = new Option("option text", "value");
				// / jquerify the DOM object 'o' so we can use the html method
				$(o).html(doctorBean.liDep[i].depNm);
				$(o).val(doctorBean.liDep[i].depId);
				// $("#selHosDept").val();
				$("#selHosDept").append(o);
			}
		}
	});
}


//Saving hospital information 
//To hospital table 
//Date 15-sep-2017
// added dynamin state
function saveHospitalDetails() {
	
	var opdDepartmentObj = 0;
	opdDepartmentObj = {
		liDep : []
	};

	var opdSplzObj = 0;
	opdSplzObj = {
		liSplz : []
	};

	var txtSid = $("#sid").val();
	if (txtSid == null) {
		txtSid = "0";
	}
	var txtHosName = $("#txtHosName").val();
	var txtInitials = $("#txtInitials").val();
	var txtAddress = $("#txtAddress").val();
	var txtCity = $("#txtCity").val();
	
	//added By Bilal dynamic state
	//var txtState = $("#stateId option:selected").text();
	
	var txtState      =    $("#stateId").val();
	
	var hosRegNo      =    $("#hosRegNo").val();
	var txtSerTaxNo   =    $("#txtSerTaxNo").val();
	
	var txtGstNo      =    $("#txtGstNo").val();
	var txtCinNo      =    $("#txtCinNo").val();
	var website       =    $("#website").val();
	var secPNo  	  =    $("#secPNo").val();
	var PanNo 		  =    $("#PanNo").val();
	
	/*alert("txtState>>>>??????"+txtState+"PanNo>>>"+PanNo+"secPNo>>>>"+secPNo+"website??"+website);
	alert("txtCinNo>>>>??????"+txtCinNo+"txtGstNo>>>"+txtGstNo+"txtSerTaxNo>>>>"+txtSerTaxNo+"hosRegNo??"+hosRegNo);
	return false;*/
	var txtZipCode = $("#txtZipCode").val();
	var email = $("#email").val();
	var txtContact = $("#txtContact").val();
	var txtFax = $("#txtFax").val();
	var txtRegCh = $("#txtRegCh").val();
	var hiddenHosId = $("#hiddenHosId").val();
	var filePath = "";// alert($("#fileUp").val());
	if ($("#fileUp").val() == "") {
		filePath = document.getElementById('patImg1').getAttribute('src');
	} else {
		//filePath = "images/Hospital/" + $("#fileUp").val();
		filePath =document.getElementById("fileUp").files[0].name;
	}
	var txtAppoStrtTime = $("#txtAppoStrtTime").val();
	var txtAppoEndTime = $("#txtAppoEndTime").val();
	var txtAppoDure = $("#txtAppoDure").val();
	var txtTimingScheduleId = $("#txtTimingScheduleId").val();
	var txtSerTax = $("#txtSerTax").val();

	var txtBlDayFrmTime = $("#txtBlDayFrmTime").val();
	var txtBlDayToTime = $("#txtBlDayToTime").val();

	var DocRdFrmTime = $('#DocRdFrmTime').val();
	var DocRdToTime = $('#DocRdToTime').val();

	var txtAnestChar = $("#txtAnestChar").val();

	// var txtEmrChr = $("#txtEmrChr").val();
	var txtEmrChr = 0;
	var txtInfChr = $("#txtInfChr").val();
	var txtMLCChr = $("#txtMLCChr").val();
	var txtSurInstruCharges = $("#txtSurInstruCharges").val();

	var txtDocFollowUpDays = $("#txtDocFollowUpDays").val();
	var txtRegFollowUpDays = $("#txtRegFollowUpDays").val();

	var hosDep = "";
	var hosid = "";
	if (txtHosName == "") {
		alert("Please enter Hospital Name");
		SetFocus("txtHosName");
		return false;
	} else if (txtInitials == "") {
		alert("Please enter Initials");
		SetFocus("txtInitials");
		return false;
	} else if (txtInitials.length < 2) {
		alert("Initials Should Not Be Less Than 2 Characters");
		SetFocus("txtInitials");
		return false;
	} else if (txtCity == "") {
		alert("Please enter City");
		SetFocus("txtCity");
		return false;
	} else if (txtContact == "") {
		alert("Please enter Contact Number");
		SetFocus("txtContact");
		return false;
	} 
	/*var pattern = /^([0-9])*$/;
	if (!pattern.test(txtContact)) {
		alert("Please enter valid contact number");
		SetFocus("txtContact");
		return false;
	}*/
	else if (txtRegCh == "") {
		alert("Please Enter Registration Fee Field");
		SetFocus("txtRegCh");
		return false;
	} else if (txtMLCChr == "") {
		alert("Please Enter MLC Field");
		SetFocus("txtMLCChr");
		return false;
	}else if (email == "") {
		alert("Please enter Email Address");
		SetFocus("email");
		return false;
	} else if(email != ""){
		/*var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		//var mailformat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			if (email.match(mailformat)) {
				// return true;
			} else {
				alert("You have entered an invalid email address!");
				return false;
			}*/
	} 
	
	$('#selHosDept').find('option').each(function() {
		hosDep = $(this).text();
		// hosid = $(this).val();
		hos = $(this).val();
		var fields = hos.split("_");
		var hosid = fields[0];

		opdDepartmentObj.liDep.push({
			"depId" : hosid,
			"depNm" : hosDep,
		});
	});
	if (opdDepartmentObj.liDep.length == 0) {
		alert("You can not save empty Departments.");
		return false;
	}

	opdDepartmentObj = JSON.stringify(opdDepartmentObj);

	var hosSpl = "";
	var hosSid = "";

	$('#selDocSpec').find('option').each(function() {
		hosSpl = $(this).text();
		// hosSid = $(this).val();
		hos = $(this).val();
		var fields = hos.split("_");
		var hosSid = fields[0];
		/*
		 * if (hosSid == undefined) hosSid=0;
		 */
		opdSplzObj.liSplz.push({
			"splzId" : hosSid,
			"splzNm" : hosSpl,
		});
	});
	if (opdSplzObj.liSplz.length == 0) {
		alert("You can not save empty Specialization.");
		return false;
	}

	opdSplzObj = JSON.stringify(opdSplzObj);

	/*
	 * var hosDep = ""; $('#selHosDept').find('option').each(function() { hosDep =
	 * hosDep + $(this).text(); });
	 */
	/*
	 * var hosSpl = ""; $('#selDocSpec').find('option').each(function() { hosSpl =
	 * hosSpl + $(this).text(); });
	 */

	if (txtAppoStrtTime == "" || txtAppoStrtTime == "00:00:00") {
		alert("Please Select Appointment Start Time");
		SetFocus("txtAppoStrtTime");
		return false;

	} else if (txtAppoEndTime == "" || txtAppoEndTime == "00:00:00") {
		alert("Please Select Appointment End Time");
		SetFocus("txtAppoEndTime");
		return false;

	} else if (txtAppoDure == "") {
		alert("Please Enter Appointment Duration.");
		SetFocus("txtAppoDure");
		return false;
	} else if (txtSerTax == "") {
		alert("Please Enter Service Tax");
		SetFocus("txtSerTax");
		return false;
	} else if (txtSerTax.length > 5 && txtSerTax != 0) {
		alert("Please Enter valid Service Tax");
		SetFocus("txtSerTax");
		return false;
	} else if (txtBlDayFrmTime == "" || txtBlDayFrmTime == "00:00:00") {
		alert("Please Select Biling Day From Time");
		SetFocus("txtBlDayFrmTime");
		return false;

	} else if (txtBlDayToTime == "" || txtBlDayToTime == "00:00:00") {
		alert("Please Select Biling Day To Time");
		SetFocus("txtBlDayToTime");
		return false;

	}  else if (txtBlDayFrmTime == txtBlDayToTime) {
		alert("Biling Day From Time & Biling Day To Time Can Not Be Same");
		SetFocus("txtBlDayToTime");
		return false;

	} else if (txtDocFollowUpDays == "") {
		alert("Please Enter Doctor Follow Up Days.");
		SetFocus("txtDocFollowUpDays");
		return false;

	} else if (txtRegFollowUpDays == "") {
		alert("Please Enter Registration Follow Up Days.");
		SetFocus("txtRegFollowUpDays");
		return false;
	}
	var startTime = txtAppoStrtTime.split(":");
	var endTime = txtAppoEndTime.split(":");
	if (startTime[0] >= endTime[0]) {

		alert("Appointment Start Time Must Be Greater Than Appointment End Time.");
		return false;
	}

	var txtBedRiddenCharges = $("#txtBedRiddenCharges").val();
	var txtServoCharges = $("#txtServoCharges").val();

	var surChrtwoHrs = $("#surChrtwoHrs").val();
	var surChrFourHrs = $("#surChrFourHrs").val();
	var surChrBeyondFourHrs = $("#surChrBeyondFourHrs").val();
	var txtTrmtClsTime = $("#txtTrmtClsTime").val();
	
	var imageAndAddressPlace = ($("input[name='imageAndAddressPlace']:checked").val()).trim();
	
	var inputs = [];
	inputs.push('action=saveHospitalDetails');
	inputs.push('txtTrmtClsTime=' + txtTrmtClsTime);
	inputs.push('idhos=' + hiddenHosId);
	inputs.push('txtSid=' + txtSid);
	inputs.push('txtHosName=' + encodeURIComponent(txtHosName));
	inputs.push('txtAddress=' + encodeURIComponent(txtAddress));
	inputs.push('txtCity=' + encodeURIComponent(txtCity));
	inputs.push('txtState=' + encodeURIComponent(txtState));
	inputs.push('txtZipCode=' + encodeURIComponent(txtZipCode));
	inputs.push('email=' + encodeURIComponent(email));
	inputs.push('txtContact=' + encodeURIComponent(txtContact));
	inputs.push('txtFax=' + encodeURIComponent(txtFax));
	inputs.push('txtRegCh=' + encodeURIComponent(txtRegCh));
	inputs.push('filePath=' + encodeURIComponent(filePath));
	inputs.push('txtTimingScheduleId='
			+ encodeURIComponent(txtTimingScheduleId));
	inputs.push('txtAppoStrtTime=' + encodeURIComponent(txtAppoStrtTime));
	inputs.push('txtAppoEndTime=' + encodeURIComponent(txtAppoEndTime));
	inputs.push('txtAppoDure=' + encodeURIComponent(txtAppoDure));
	inputs.push('txtSerTax=' + encodeURIComponent(txtSerTax));
	inputs.push('opdSplzObj=' + encodeURIComponent(opdSplzObj));
	inputs.push('opdDepartmentObj=' + encodeURIComponent(opdDepartmentObj));
	inputs.push('txtBlDayFrmTime=' + encodeURIComponent(txtBlDayFrmTime));
	inputs.push('txtBlDayToTime=' + encodeURIComponent(txtBlDayToTime));

	inputs.push('DocRdFrmTime=' + encodeURIComponent(DocRdFrmTime));
	inputs.push('DocRdToTime=' + encodeURIComponent(DocRdToTime));

	inputs.push('txtAnestChar=' + encodeURIComponent(txtAnestChar));
	inputs.push('txtEmrChr=' + encodeURIComponent(txtEmrChr));
	inputs.push('txtMLCChr=' + encodeURIComponent(txtMLCChr));
	inputs.push('txtSurInstruCharges='
			+ encodeURIComponent(txtSurInstruCharges));
	inputs.push('txtInfChr=' + encodeURIComponent(txtInfChr));
	inputs.push('txtBedRiddenCharges='
			+ encodeURIComponent(txtBedRiddenCharges));
	inputs.push('txtServoCharges=' + encodeURIComponent(txtServoCharges));
	inputs.push('synchronizeToken='
			+ encodeURIComponent($("#synchronizeToken").val()));
	inputs.push('surChrtwoHrs=' + encodeURIComponent(surChrtwoHrs));
	inputs.push('surChrFourHrs=' + encodeURIComponent(surChrFourHrs));
	inputs.push('surChrBeyondFourHrs='
			+ encodeURIComponent(surChrBeyondFourHrs));
	inputs.push('txtInitials=' + txtInitials);
	inputs.push('txtDocFollowUpDays=' + txtDocFollowUpDays);
	inputs.push('txtRegFollowUpDays=' + txtRegFollowUpDays);
	inputs.push('imageAndAddressPlace=' + imageAndAddressPlace);
	
	//Added By Bilal
	inputs.push('hosRegNo='
			+ encodeURIComponent(hosRegNo));
	inputs.push('txtSerTaxNo='
			+ encodeURIComponent(txtSerTaxNo));
	inputs.push('txtGstNo='
			+ encodeURIComponent(txtGstNo));
	inputs.push('txtCinNo='
			+ encodeURIComponent(txtCinNo));
	inputs.push('website='
			+ encodeURIComponent(website));
	inputs.push('secPNo='
			+ encodeURIComponent(secPNo));
	inputs.push('PanNo='
			+ encodeURIComponent(PanNo));
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function addThemSpe() {
	var docName = $("#txtDocSpl").val();
	if(docName==""){
		alert("Please Enter Specialization Name!");
		return false;
		}
	var add = docName + '\n';
	var flag = 0;
	$('#selDocSpec').find('option').each(function() {
		if ($(this).html() == docName) {
			alert("Specialization Type Is allready Present In List");
			flag = 1;
		}
	});
	if (flag == 0) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(docName);
		// $(0).val();
		$("#selDocSpec").append(o);
		add1 = 0 + '_' + docName;
		$(o).val(add1);
		alert("Specialization Added!!!");
		// $(o).val(0);
	}
	$("#txtDocSpl").val("");
}

function addThemDept() {
	var docName = $("#txtHosDept").val();
	if(docName==""){
		alert("Please Enter Department Name!");
		return false;
		}
	var add = docName + '\n';
	var flag = 0;
	$('#selHosDept').find('option').each(function() {
		if ($(this).html() == docName) {
			alert("Department Type Is allready Present In List");
			flag = 1;
		}
	});
	if (flag == 0) {
		var o = new Option("option text", "value");
		// / jquerify the DOM object 'o' so we can use the html method
		$(o).html(docName);
		// $(0).val();
		$("#selHosDept").append(o);
		add1 = 0 + '_' + docName;
		$(o).val(add1);
		alert("Department Added!!!");
		$("#txtHosDept").val("");
	}
}
function RemoveThemDept() {

	var deptId = $('#selHosDept option:selected').val();
	var fields = deptId.split("_");
	var hosSid = fields[0];

	if (hosSid != 0) {
		var inputs = [];
		inputs.push('action=RemoveThemDept');
		inputs.push('deptId=' + deptId);

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
				alert(ajaxResponse);
				window.location.reload();
			}
		});
	} else {
		$('#selHosDept' + ' option:selected').remove();
	}
}
function RemoveThemSpl() {

	var splId = $('#selDocSpec option:selected').val();

	var fields = splId.split("_");
	var hosSid = fields[0];

	if (hosSid != 0) {
		var inputs = [];
		inputs.push('action=RemoveThemSpl');
		inputs.push('splId=' + splId);

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
				alert(ajaxResponse);
				window.location.reload();
			}
		});
	} else {
		$('#selDocSpec' + ' option:selected').remove();
	}
}

function deactivateDatabaseAccess(){
	
	var inputs = [];
	inputs.push('Action=deactivateDatabaseAccess');
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "UserServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					//alert('error');
				},
				success : function(r) {
					//alert("success");
					}
				});
}

function fetchHospitalDetails() {
	$("#divInside").hide();
	
	var sid = $("#sid").val();
	if (!sid) {
		sid = 0;
	}
	var inputs = [];
	inputs.push('action=fetchHospitalDetails');
	inputs.push('corporateId=' + sid);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					//alert('error');
					$("#divInside").show();
				},
				success : function(r) {
					ajaxResponse = r;
					pobj1 = eval('(' + ajaxResponse + ')');

					if (pobj1.listHosDetail.length > 0) {

						$("#txtInitials").val(pobj1.listHosDetail[0].initials);
						$("#txtTrmtClsTime").val(pobj1.listHosDetail[0].txtTrmtClsTime);
						$("#txtHosName").val(pobj1.listHosDetail[0].hn);
						$("#txtAddress").val(pobj1.listHosDetail[0].ha);
						$("#txtCity").val(pobj1.listHosDetail[0].hcity);
						
						//added by bilal
						//Date 15-Sep-2017
						//For fetching new feilds on ui
						var a=parseInt(pobj1.listHosDetail[0].hs);
						//alert(a);
						
						setTimeout(function() {
							$("#stateId").val(a);
						}, 200);
						$("#hosRegNo").val(pobj1.listHosDetail[0].hosRegNo);
						$("#txtSerTaxNo").val(pobj1.listHosDetail[0].txtSerTaxNo);
						$("#txtGstNo").val(pobj1.listHosDetail[0].txtGstNo);
						$("#txtCinNo").val(pobj1.listHosDetail[0].txtCinNo);
						$("#website").val(pobj1.listHosDetail[0].website);
						$("#secPNo").val(pobj1.listHosDetail[0].secPNo);
						$("#PanNo").val(pobj1.listHosDetail[0].PanNo);
						
						//For fetching new feilds on ui end
						
						$("#txtZipCode").val(pobj1.listHosDetail[0].hz);
						$("#email").val(pobj1.listHosDetail[0].em);
						$("#txtContact").val(pobj1.listHosDetail[0].hcon);
						$("#txtFax").val(pobj1.listHosDetail[0].hx);
						$("#txtRegCh").val(pobj1.listHosDetail[0].hrate);
						$("#hiddenHosId").val(pobj1.listHosDetail[0].idhp);
						$("#txtSerTax").val(pobj1.listHosDetail[0].serTax);
						$("#txtBlDayFrmTime").val(
								pobj1.listHosDetail[0].bdFrmTim);
						$("#txtBlDayToTime")
								.val(pobj1.listHosDetail[0].bdToTim);
						$("#DocRdFrmTime").val(
								pobj1.listHosDetail[0].DocRdFrmTime);
						$("#DocRdToTime").val(
								pobj1.listHosDetail[0].DocRdToTime);
						$("#txtAnestChar").val(pobj1.listHosDetail[0].AnaChar);
						$("#txtEmrChr").val(pobj1.listHosDetail[0].emrchr);
						$("#txtInfChr").val(pobj1.listHosDetail[0].infchr);
						
						$('input:radio[name="imageAndAddressPlace"][value="' + (pobj1.listHosDetail[0].imageAndAddressPlace) + '"]').prop('checked', 'checked');

						$("#txtBedRiddenCharges").val(
								pobj1.listHosDetail[0].rdCharges);
						$("#txtServoCharges").val(
								pobj1.listHosDetail[0].serCharges);

						$("#surChrtwoHrs").val(
								pobj1.listHosDetail[0].surchrtwhrs);
						$("#surChrFourHrs").val(
								pobj1.listHosDetail[0].surchrfrhrs);
						$("#surChrBeyondFourHrs").val(
								pobj1.listHosDetail[0].surchrbyfrhrs);
						$("#txtSurInstruCharges").val(
								pobj1.listHosDetail[0].surinstr);
						$("#txtMLCChr").val(pobj1.listHosDetail[0].mlcChr);
						//Added by Laxman on 27-Dec-2017.
						if(!(pobj1.listHosDetail[0].imgpt)==null || !(pobj1.listHosDetail[0].imgpt)=="" || !(pobj1.listHosDetail[0].imgpt)=="undefine"){
						$('#patImg1').attr('src','pharmacy/pharmacy/readImage?url='+ pobj1.listHosDetail[0].imgpt);
						$('#patImg1').attr('value',pobj1.listHosDetail[0].imgpt);
						//$("#patImg").attr("src", pobj1.listHosDetail[0].flpt);
						//$("#logo1").attr("src", pobj1.listHosDetail[0].flpt);
						//$('#logo1').attr('src','pharmacy/pharmacy/readImage?url='+ pobj1.listHosDetail[0].imgpt);
						$('#logo1').attr('src','pharmacy/pharmacy/readImage?url=JJLOGINLOGO.png');
						$('#logo1').attr('value',pobj1.listHosDetail[0].imgpt);
						$('#top_logo').attr('src','pharmacy/pharmacy/readImage?url='+ pobj1.listHosDetail[0].imgpt);
						$('#top_logo').attr('value',pobj1.listHosDetail[0].imgpt);
					}

						$("#txtDocFollowUpDays").val(
								pobj1.listHosDetail[0].docfollowup);
						$("#txtRegFollowUpDays").val(
								pobj1.listHosDetail[0].regfollowup);

						if (pobj1.listHosDetail[0].litmgaschl.length > 0) {
							$("#txtTimingScheduleId")
									.val(
											pobj1.listHosDetail[0].litmgaschl[0].timing_schedule_id);
							$("#txtAppoStrtTime")
									.val(
											pobj1.listHosDetail[0].litmgaschl[0].appointment_startTime);
							$("#txtAppoEndTime")
									.val(
											pobj1.listHosDetail[0].litmgaschl[0].appointment_endTime);
							$("#txtAppoDure")
									.val(
											pobj1.listHosDetail[0].litmgaschl[0].appointment_treatment_duration);
						}

						$("#divInside").show();
						if ($("#pageName").val() == "index_jsp") {

							$("#name").html((pobj1.listHosDetail[0].hn).trim());

							var address = ((pobj1.listHosDetail[0].ha).trim()) + " "
									+ ((pobj1.listHosDetail[0].hcity).trim()) + " "
									+ ((pobj1.listHosDetail[0].hs).trim()) + "-"
									+ ((pobj1.listHosDetail[0].hz).trim());

							$("#address").html((address).trim());
							$("#mail").html((pobj1.listHosDetail[0].em).trim());
							$("#contact").html((pobj1.listHosDetail[0].hcon).trim());
						}
					}
				}
			});
}

function fetchDoctorSlotList() {

	var inputs = [];
	inputs.push('action=getDoctorNameList');

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
			
			pobj1 = eval('(' + ajaxResponse + ')');
			alert("length" + pobj1.listDoctor.length);
		}
	});
}

function uploadHospitalLogo() 
{
	var filePath = $("#fileUp").val();
	if (filePath.length == 0) {
		alert("Please Select File To Upload.");
	} else {

		var arr = [];
		var extension;
		arr = filePath.split(".");
		extension = arr[arr.length - 1];
		
		if(extension == "jpg" || extension == "jpeg" || extension == "tft"
			|| extension == "png" || extension == "JPG" || extension == "JPEG" 
			|| extension == "TFT" || extension == "PNG" || extension == "bmp" || extension == "BMP"){
		}else{
			alert("Please Select Valid Image Format (.jpg, .jpeg, .png, .bmp, .tft) To Upload.");
			return false;
		}
		$("#fileUploadfrm").attr("action",
				"HospitalLogoUploadServlet?filePath=" + filePath);
		setTimeout(function() {
			
			/*
			 * $("#fileUploadfrm").submit(function(e) { var formObj = $(this);
			 * 
			 * var formData = new FormData(this); $.ajax({ url:
			 * "HospitalLogoUploadServlet?filePath=" + filePath, type: 'POST',
			 * data: formData, mimeType:"multipart/form-data", contentType:
			 * false, cache: false, processData:false, success: function(data,
			 * textStatus, jqXHR) { }, error: function(jqXHR, textStatus,
			 * errorThrown) { } }); // e.preventDefault(); //Prevent Default
			 * action. // e.unbind(); }); $("#fileUploadfrm").submit(); //
			 * Submit the form
			 */
			$("#fileUploadfrm").ajaxForm().submit();
		}, 500);

	}
}

function saveHospitalOwnerDetails() {

	var selTitle = $("#selTitle").val();
	var txtOwnerName = $("#txtOwnerName").val();
	var txtAddress = $("#txtAddress").val();
	var email = $("#email").val();
	var txtContact = $("#txtContact").val();
	var datePick = $("#date-pick").val();
	var txtAge = $("#txtAge").val();
	var txtOPDPer = $("#txtOPDPer").val();
	var txtIPDPer = $("#txtIPDPer").val();
	var ownerId = $("#hiddenOwnerId").val();
	var queryType = $("#queryType").val();
	
	if (txtOwnerName == "") {
		alert("Please Enter Name.");
		SetFocus("txtOwnerName");
		return false;
	} 
	var pattern = /^([a-zA-Z]+\s?)*$/;
	if (!pattern.test(txtOwnerName)) {
		alert("please enter valid name");
		SetFocus("txtOwnerName");
		return false;
	}
	else if (txtContact == "") {
		alert("Please Enter Contact Number.");
		SetFocus("txtContact");
		return false;
	}
	var pattern = /^([0-9])*$/;
	if (!pattern.test(txtContact)) {
		alert("Please enter the valid Contact No.");
		SetFocus("txtContact");
		return false;
	}
	
	else if (txtAge == "") {
		alert("Please Enter Age.");
		SetFocus("txtAge");
		return false;
	} else if(email != "")
	{
		/*var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		
		//var mailformat =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (email.match(mailformat)) {
			// return true;
		} else {
			alert("You have entered an invalid email address!");
			return false;
		}*/
	}
	
	
	
	if(txtOPDPer!="" || txtOPDPer!=null){
		
		if(txtOPDPer>100){
			alert("You have entered OPD percentage more than 100%..!!");
			SetFocus("txtOPDPer");
			return false;
		}
	}
	
	if(txtIPDPer!="" || txtIPDPer!=null){
		
		if(txtIPDPer>100){
			alert("You have entered IPD percentage more than 100%..!!");
			SetFocus("txtIPDPer");
			return false;
		}
	}
	
	var inputs = [];
	inputs.push('action=saveHospitalOwnerDetails');
	inputs.push('selTitle=' + selTitle);
	inputs.push('txtOwnerName=' + encodeURIComponent(txtOwnerName));
	inputs.push('txtAddress=' + encodeURIComponent(txtAddress));
	inputs.push('datePick=' + datePick);
	inputs.push('txtAge=' + txtAge);
	inputs.push('txtOPDPer=' + txtOPDPer);
	inputs.push('email=' + encodeURIComponent(email));
	inputs.push('txtContact=' + encodeURIComponent(txtContact));
	inputs.push('txtIPDPer=' + txtIPDPer);
	inputs.push('ownerId=' + ownerId);
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			alert(r);
			window.location.href = "HospitalOwnerDetail.jsp";
		}
	});
}

var hospitalOwnerDetailTemp = "{#foreach $T.liOwnerDetail as liOwnerDetail} "
		+ "<tr><td style='height: 21.5px;' class='col-md-1 center'>{count++}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' id='uname{count}'>{$T.liOwnerDetail.name}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit{count}' onclick='editHospitalOwner({$T.liOwnerDetail.ownerId})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button></td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete{count}' onclick='deleteHospitalOwner({$T.liOwnerDetail.ownerId})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button></td>"
		+ "</tr> {#/for}";

function editHospitalOwner(ownerId) {
	ajaxResponse = $("#hospitalOwnerDetailDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.liOwnerDetail.length; i++) {
		if (myArray.liOwnerDetail[i].ownerId == ownerId) {
			myObj = myArray.liOwnerDetail[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	ownerDetail = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#selTitle").val(ownerDetail.title);
	$("#txtOwnerName").val(ownerDetail.name);
	$("#txtAddress").html(ownerDetail.add);
	$("#email").val(ownerDetail.email);
	$("#txtContact").val(ownerDetail.contact);
	$("#date-pick").val(ownerDetail.dob);
	$("#txtAge").val(ownerDetail.age);
	$("#txtOPDPer").val(ownerDetail.opdPerc);
	$("#txtIPDPer").val(ownerDetail.ipdPerc);
	$("#hiddenOwnerId").val(ownerDetail.ownerId);
	$("#queryType").val("update");
}

function fetchHospitalOwnerDetails() {
	var inputs = [];
	inputs.push('action=fetchHospitalOwnerDetails');

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
			$("#hospitalOwnerDetailDiv").html(ajaxResponse);
		
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#hospitalOwnerDetail").setTemplate(hospitalOwnerDetailTemp);
			$("#hospitalOwnerDetail").processTemplate(pobj1);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function deleteHospitalOwner(ownerId) {
	var r = confirm("Confirm to Delete Owner Details?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteHospitalOwner');
		inputs.push('ownerId=' + ownerId);

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
				alert(ajaxResponse);
				window.location.reload();
			}
		});
	}
}

function autoAgeForAdmin() {
	var dob = $("#date-pick").val();
	if (dob != "") {
		var ddob = dob.split("/");
		var a = ddob[2];
		var currDate = $("#currDate").val();
		var b = currDate.split(" ");
		var c = b.slice(5);
		age = c - a;
		$("#txtAge").val(age);
	}
}

/** ********** Procedure Type ***************** */

// Author : nIKHIL; Date : 29/9/2014
var icdLevel1Temp = "{#foreach $T.icd10_L_List as l}<tr>"
	+ "<td class='col-md-1-1 center'>{count++}.</td>"
	+ "<td id='divPi{count}' class='col-md-1-1 center'>{$T.l.icd_code_L}</td>"
	+ "<td class='col-md-3-1 center' id='uname{count}'>{$T.l.name_L}</td>"
	+ "<td class='col-md-1-1 center'>"
	+ "<button class='btn btn-xs btn-success editUserAccess' value='UPDATE' onclick='updateICDDiagnosisLevel({$T.l.idicd10_L})' style='height: 21.5px;' disabled='disabled'>"
	+ "<i class='fa fa-edit'></i></button></td>"
	+ "<td class='col-md-1-1 center'>"
	+ "<input type='checkbox' id='{$T.l.idicd10_L}' name='checkboxICD10L' /></td>"
	+ "<input type='hidden' id='idicd{count}' value='{$T.l.idicd10_L}' /></tr>{#/for}";
/** ***************************Strat ICD 10 CODE ********************** */

function fetchICD10Level1(type,callFrom) {
	var icd10Codes;
	count = 1;
	if(type == "") {
		alert("Please enter name");
		return false;
	}
	
	if(type=="onload"){
		
		$("#ICDCallFrom").val(callFrom);
		
	}else if(type=="search"){
		callFrom = $("#ICDCallFrom").val();
	}
	if(($("#pageType").val()) != "DoctorDesk") {
		$("#icdManagementDiv").hide();
		$("#icdManagementDiv2").hide();
	}
	
	if(callFrom == "ICD10"){
		
		$("#saveICDDiagnosisLevel1ForICD10").show();
		$("#saveICDDiagnosisLevel1ForICDO").hide();
		
		
	}else{
		
		$("#saveICDDiagnosisLevel1ForICD10").hide();
		$("#saveICDDiagnosisLevel1ForICDO").show();
	}

	var inputs = [];
	inputs.push('action=fetchICD10Level1');
	inputs.push('type=' + type);
	var byName = $("#byName").val();	
	inputs.push('byName=' + encodeURIComponent(byName));
	inputs.push('callFrom='+callFrom);  
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
			$("#hiddenIcdDetail").val(ajaxResponse);
			icd10Codes = eval('(' + ajaxResponse + ')');
			$("#DRRDiv1").setTemplate(icdLevel1Temp);
			$("#DRRDiv1").processTemplate(icd10Codes);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function updateICDDiagnosisLevel(idIcd10L) {

	if(($("#pageType").val()) != "DoctorDesk") {
		$("#heading").html("<h2>Update ICD Diagnosis</h2>");
	}
	
	var ajaxResponse = $("#hiddenIcdDetail").val();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.icd10_L_List.length; i++) {
		if (myArray.icd10_L_List[i].idicd10_L == idIcd10L) {
			myObj = myArray.icd10_L_List[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	icdCodeLevel1Details = eval('(' + myObj.decodeSpecialChars() + ')');
	$("#txtIcdCode").val(icdCodeLevel1Details.icd_code_L);
	$("#txtIcdDiagnosis").val(icdCodeLevel1Details.name_L);
	$("#txtIcdDiagnosis1").val(icdCodeLevel1Details.name_L1);
	$("#idIcd10L").val(icdCodeLevel1Details.idicd10_L);

}

function saveICDDiagnosisLevel1(callFrom) {

	var txtIcdCode = $("#txtIcdCode").val();
	var txtIcdDiagnosis = $("#txtIcdDiagnosis").val();
	var txtIcdDiagnosis1 = $("#txtIcdDiagnosis1").val();
	var idIcd10L = $("#idIcd10L").val();
	
	if(txtIcdCode == "") {
		alert("Please enter Level1 ICD Code");
		$("#txtIcdCode").focus();
		return false;
	}
	
	if(txtIcdDiagnosis == "") {
		alert("Please enter level1 ICD Diagnosis");
		$("#txtIcdDiagnosis").focus();
		return false;
	}
	
	if(txtIcdDiagnosis1 == "") {
		alert("Please enter level1 ICD Diagnosis & Description");
		$("#txtIcdDiagnosis1").focus();
		return false;
	}
	
	if(callFrom == "ICD10"){
		var icd_flag = 1;
	}else if(callFrom == "ICD0"){
		var icd_flag = 0;
	}else{
		var icd_flag = 0;
	}
	var inputs = [];
	inputs.push('action=saveICDDiagnosisLevel1');
	inputs.push('txtIcdCode=' + txtIcdCode);
	inputs.push('txtIcdDiagnosis=' + txtIcdDiagnosis);
	inputs.push('txtIcdDiagnosis1=' + txtIcdDiagnosis1);
	inputs.push('idIcd10L=' + idIcd10L);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('icd_flag=' + icd_flag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			alert(r);
			setAddICDCodeTemp();
			
			if(($("#pageType").val()) != "DoctorDesk") {
				location.reload(true);
			}
		}
	});
}

var addICDCodeTem = "<div style='height: 300px; border: 1px solid #436a9d; padding-left: 5%;'><div style='width: 80%; padding-top: 5%;'><h2>Add ICD Diagnosis</h2></div><div style='width: 100%;'><div style='width: 27%; padding-top: 7.5%;'>ICD Code</div><div style='width: 70%; padding-top: 7%;'><input type='text' id='txtIcdCode' name='txtIcdCode' style='width: 90%;' /><div style='width: 5%; color: red; float: right;'><b>*</b></div></div></div><div style='width: 100%;'><div style='width: 27%; padding-top: 7.5%;'>ICD Diagnosis</div><div style='width: 70%; padding-top: 7%;'><input type='text' id='txtIcdDiagnosis' name='txtIcdDiagnosis' style='width: 90%;' /><div style='width: 5%; color: red; float: right;'><b>*</b></div></div></div><div style='width: 100%; text-align: center; margin-top: 20px;'><input type='button' value='Save' style='width: 20%;' onclick='saveICDDiagnosisLevel1()' class='edit' /></div></div>";

function setAddICDCodeTemp(callFrom) {
	
	if(callFrom == "ICD10"){
		$("#a").show();
		$("#b").hide();
	}else{
		$("#b").show();
		$("#a").hide();
	}
	$("#txtIcdCode").val("");
	$("#txtIcdDiagnosis").val("");
	$("#txtIcdDiagnosis1").val("");
	$("#idIcd10L").val("0");
	
	if(($("#pageType").val()) != "DoctorDesk") {
		$("#heading").html("<h2>Add ICD Diagnosis</h2>");
		var icd10Codes = null;
		$("#icdManagementDiv").setTemplate(addICDCodeTem);
		$("#icdManagementDiv").processTemplate(icd10Codes);
	}
}

function setIcdCodeTempForlevel2(idicdCodeL) {
	$("#icdManagementDiv2").hide();
	$("#icdManagementDiv").show();

	count = 1;
	var ajaxResponse = $("#hiddenIcdDetail").val();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.icd10_L_List.length; i++) {
		if (myArray.icd10_L_List[i].idicd10_L == idicdCodeL) {
			myObj = myArray.icd10_L_List[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);

	$("#divicdCodeLevel1").html(myObj);
	icdCodeLevel1Details = eval('(' + myObj.decodeSpecialChars() + ')');
	$("#txtIcdCodeLevel1").val(icdCodeLevel1Details.icd_code_L);
	$("#txtIcdDiagnosisLevel1").val(icdCodeLevel1Details.name_L);
	$("#idicdCodeLevel1").val(icdCodeLevel1Details.idicd10_L);

	$("#icdCodeL1Div").setTemplate($("#icdlevel2").html());
	$("#icdCodeL1Div").processTemplate(icdCodeLevel1Details);
}

function saveICDDiagnosisLevel2() {
	var txtIcdCodeLevel1 = $("#txtIcdCodeLevel1").val();
	var txtIcdDiagnosisLevel1 = $("#txtIcdDiagnosisLevel1").val();
	var idicdCodeLevel1 = $("#idicdCodeLevel1").val();
	var txtIcdCodeLevel2 = $("#txtIcdCodeLevel2").val();
	var txtIcdDiagnosisLevel2 = $("#txtIcdDiagnosisLevel2").val();

	var inputs = [];
	inputs.push('action=saveICDDiagnosisLevel2');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('txtIcdCodeLevel1=' + encodeURIComponent(txtIcdCodeLevel1));
	inputs.push('txtIcdDiagnosisLevel1='
			+ encodeURIComponent(txtIcdDiagnosisLevel1));
	inputs.push('idicdCodeLevel1=' + encodeURIComponent(idicdCodeLevel1));
	inputs.push('txtIcdCodeLevel2=' + encodeURIComponent(txtIcdCodeLevel2));
	inputs.push('txtIcdDiagnosisLevel2='
			+ encodeURIComponent(txtIcdDiagnosisLevel2));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function setIcdCodeTempForlevel3(idicdCodeL1) {
	$("#icdManagementDiv2").show();
	count = 1;
	var ajaxResponse = $("#hiddenIcdDetail").val();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.icd10_L_List.length; i++) {
		for ( var j = 0; j < myArray.icd10_L_List[i].icd10_L1_List.length; j++) {

			if (myArray.icd10_L_List[i].icd10_L1_List[j].idicd10_L1 == idicdCodeL1) {
				myObj = myArray.icd10_L_List[i].icd10_L1_List[j];
				break;
			}
		}
	}
	myObj = JSON.stringify(myObj);

	icdCodeLevel2Details = eval('(' + myObj.decodeSpecialChars() + ')');

	$("#txtIcdCodeLevel3").val(icdCodeLevel2Details.icd_code_L1);
	$("#txtIcdDiagnosisLevel3").val(icdCodeLevel2Details.name_L1);
	$("#idicdCodeLevel3").val(icdCodeLevel2Details.idicd10_L1);

	$("#icdCodeL1Div2").setTemplate($("#icdCodeL1Div2").html());
	$("#icdCodeL1Div2").processTemplate(icdCodeLevel2Details);
}

function saveICDDiagnosisLevel3() {
	var txtIcdCodeLevel3 = $("#txtIcdCodeLevel3").val();
	var txtIcdDiagnosisLevel3 = $("#txtIcdDiagnosisLevel3").val();
	var idicdCodeLevel3 = $("#idicdCodeLevel3").val();
	var txtIcdCodeLevel4 = $("#txtIcdCodeLevel4").val();
	var txtIcdDiagnosisLevel4 = $("#txtIcdDiagnosisLevel4").val();

	var inputs = [];
	inputs.push('action=saveICDDiagnosisLevel3');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	inputs.push('txtIcdCodeLevel3=' + encodeURIComponent(txtIcdCodeLevel3));
	inputs.push('txtIcdDiagnosisLevel3='
			+ encodeURIComponent(txtIcdDiagnosisLevel3));
	inputs.push('idicdCodeLevel3=' + encodeURIComponent(idicdCodeLevel3));
	inputs.push('txtIcdCodeLevel4=' + encodeURIComponent(txtIcdCodeLevel4));
	inputs.push('txtIcdDiagnosisLevel4='
			+ encodeURIComponent(txtIcdDiagnosisLevel4));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
		}
	});
}

function deleteIcd10LCode() {

	if (($("#DRRDiv1").html()) == "") {
		alert("No Data to Delete Instruction...");
		return;
	}

	var IDs = new Array();
	$("input[name='checkboxICD10L']:checked").each(function() {
		IDs.push(($(this).attr('id')).trim());
	});

	if ((IDs.length) == 0) {
		alert("Please check the checkbox to delete...");
		return;
	}

	var r = confirm("Please confirm to Delete Record?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteIcdCode');
		inputs.push('icdid=' + IDs);
		inputs.push('level=l');
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 6,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				alert(r);
				fetchICD10Level1('onload');
			}
		});
	}
}


function deleteIcdCode(icdid, level) {
	var r = confirm("Are You Confirm To Delete ICD code.");
	if (r == true) {
		if (r == true) {

			var inputs = [];
			inputs.push('action=deleteIcdCode');
			inputs.push('icdid=' + icdid);
			inputs.push('level=' + level);
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					alert(r);
					location.reload();
				}
			});
		}
	}
}
function setCmoTemplate() {
	$("#wdConsultation").html("Day Consultation");
	$("#wdFollowup").html("Day Followup");
	$("#weConsultation").html("Night Consultation");
	$("#weFollowup").html("Night Followup");
}

function setSpecialityTemplate() {

	$("#wdConsultation").html("Week Day Consultation");
	$("#wdFollowup").html("Week Day Followup");
	$("#weConsultation").html("Week End Consultation");
	$("#weFollowup").html("Week End Followup");
}

function saveDoctorSpeciality(specialityCount) {

	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}
	if (sid == "0") {
		var selDocSpeciality = $("#selDocSpeciality").val();
		var txtwdConsultation = $("#txtwdConsultation").val();
		var txtwdFollowup = $("#txtwdFollowup").val();
		var txtweConsultation = $("#txtweConsultation").val();
		var txtweFollowup = $("#txtweFollowup").val();

		var queryType = $("#queryType").val();
		var docSplId = $("#docSplId").val();

		if (selDocSpeciality == "select" || selDocSpeciality == null) {
			alert("Please Edit Doctor Speciality");
			return false;
		} else if (txtwdConsultation == "") {
			alert("Please Enter Consultation");
			SetFocus("txtwdConsultation");
			return false;
		} else if (txtwdFollowup == "") {
			alert("Please Enter Followup");
			SetFocus("txtwdFollowup");
			return false;
		} else if (txtweConsultation == "") {
			alert("Please Enter Consultation");
			SetFocus("txtweConsultation");
			return false;
		} else if (txtweFollowup == "") {
			alert("Please Enter Followup");
			SetFocus("txtweFollowup");
			return false;
		}
		var inputs = [];
		inputs.push('action=saveDoctorSpeciality');

		inputs.push('selDocSpeciality=' + encodeURIComponent(selDocSpeciality));
		inputs.push('txtwdConsultation='
				+ encodeURIComponent(txtwdConsultation));
		inputs.push('txtwdFollowup=' + encodeURIComponent(txtwdFollowup));
		inputs.push('txtweConsultation='
				+ encodeURIComponent(txtweConsultation));
		inputs.push('txtweFollowup=' + encodeURIComponent(txtweFollowup));
		inputs.push('queryType=' + encodeURIComponent(queryType));
		inputs.push('docSplId=' + docSplId);
		inputs.push('corporateAcId=' + sid);

		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());

		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				// alert("error");
			},
			success : function(r) {
				alert(r);
				location.reload();
				$("#selDocSpeciality").val("select");
				$("#txtwdConsultation").val("");
				$("#txtwdFollowup").val("");
				$("#txtweConsultation").val("");
				$("#txtweFollowup").val("");
			}
		});
	} else {

		var countS = 0;
		for ( var i = 1; i <= specialityCount; i++) {

			var specialityName = $("#specialityName" + i).val();
			var docSplId = $("#splId" + i).val();
			var txtwdConsultation = $("#wdSSCons" + i).val();
			var txtwdFollowup = $("#wdSSFollowup" + i).val();
			var txtweConsultation = $("#weSSCons" + i).val();
			var txtweFollowup = $("#weSSFollowup" + i).val();
			var docSplId = $("#docSplId" + i).val();

			var queryType = $("#queryType").val();
			if (txtwdConsultation == "") {
				alert("Please Enter Consultation for " + specialityName);
				return false;
			} else if (txtwdFollowup == "") {
				alert("Please Enter Followup for " + specialityName);
				return false;
			} else if (txtweConsultation == "") {
				alert("Please Enter Consultation for " + specialityName);
				return false;
			} else if (txtweFollowup == "") {
				alert("Please Enter Followup for " + specialityName);
				return false;
			}
			var inputs = [];
			inputs.push('action=saveDoctorSpeciality');
			inputs.push('selDocSpeciality='
					+ encodeURIComponent(specialityName));
			inputs.push('txtwdConsultation='
					+ encodeURIComponent(txtwdConsultation));
			inputs.push('txtwdFollowup=' + encodeURIComponent(txtwdFollowup));
			inputs.push('txtweConsultation='
					+ encodeURIComponent(txtweConsultation));
			inputs.push('txtweFollowup=' + encodeURIComponent(txtweFollowup));
			inputs.push('queryType=' + encodeURIComponent(queryType));
			inputs.push('corporateAcId=' + sid);
			inputs.push('docSplId=' + docSplId);
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
			var str = inputs.join('&');
			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					++countS;
					if (countS == 3)
						alert(r);
				}
			});

		}
	}
}
var defaultViewDoctorSpecialityTemp = "{#foreach $T.liDocSpl as liDocSpl} "
		+ "<tr><td style='height: 21.5px;' class='col-md-1 center'>{count++}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' id='divPi{count}'>{$T.liDocSpl.idDocSpl}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center' id='uname{count}'>{$T.liDocSpl.splNm}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit{count}' onclick='editDoctorSpeciality({$T.liDocSpl.idDocSpl})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button></td>"
		+ "</tr> {#/for}";

//Irfan khan 13 feb ----Dynamic doctor specialy charges
var docSpecialityTemp = "<option value='select'>-Select-</option>"
						+ "{#foreach $T.liDocSpl as liDocSpl} "
						+ "<option value='{$T.liDocSpl.splNm}'>{$T.liDocSpl.splNm}</option>"
						+ "{#/for}";

function defaultViewDoctorSpeciality() {
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}
	var inputs = [];
	inputs.push('action=fetchDoctorSpeciality');
	inputs.push('corporateAcId=' + sid);

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

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#userObj").html(ajaxResponse);
			$("#userMangTemp").setTemplate(defaultViewDoctorSpecialityTemp);
			$("#userMangTemp").processTemplate(pobj1);
			
			//Irfan khan 13 feb ----Dynamic doctor specialy charges
			$("#selDocSpeciality").setTemplate(docSpecialityTemp);
			$("#selDocSpeciality").processTemplate(pobj1);
			setTimeout(function(){userAccess();},100);
		}
	});
}

var doctorSpecilityTemp = "<option value='select'>-select-</option>{#foreach $T.liDocSpl as liDocSpl}<option value='{$T.liDocSpl.idDocSpl}'>{$T.liDocSpl.splNm}</option>{#/for}";

function fetchDoctorSpeciality() {
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}
	var inputs = [];
	inputs.push('action=fetchDoctorSpeciality');
	inputs.push('corporateAcId=' + sid);

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

			pobj1 = eval('(' + ajaxResponse + ')');
			$("#selSpeciality").setTemplate(doctorSpecilityTemp);
			$("#selSpeciality").processTemplate(pobj1);
		}
	});
}

function editDoctorSpeciality(id) {
	$("#queryType").val("update");
	$("#docSplId").val(id);
	ajaxResponse = $("#userObj").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.liDocSpl.length; i++) {

		if (myArray.liDocSpl[i].idDocSpl == id) {
			myObj1 = myArray.liDocSpl[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj1);
	userBean = eval('(' + myObj.decodeSpecialChars() + ')');
	if (userBean.splNm == "RMO") {
		setCmoTemplate();
	} else {
		setSpecialityTemplate();
	}
	$("#selDocSpeciality").attr('disabled', 'disabled');
	$("#txtwdConsultation").attr('readonly', false);
	$("#txtwdFollowup").attr('readonly', false);
	$("#txtweConsultation").attr('readonly', false);
	$("#txtweFollowup").attr('readonly', false);
	$("#selDocSpeciality").val(userBean.splNm);
	$("#txtwdConsultation").val(userBean.wdCon);
	$("#txtwdFollowup").val(userBean.wdFl);
	$("#txtweConsultation").val(userBean.weCon);
	$("#txtweFollowup").val(userBean.weFl);

}

/** **************** End ICD 10 Code ************************** */

/** *****************Start Hospital Holidays Details************************** */

var j = 1;
function createDivForHospitalHoliday() {

	var rowCount = $("#RowCount").val();
	rowCount++;

	rowId = "row" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	// x.setAttribute('class', 'col-md-12-1');
	x.setAttribute('style', 'margin-top:0px');
	document.getElementById("DRRDiv").appendChild(x);
	document.getElementById(rowId).innerHTML = "<td style='height: 21.5px;' class='col-md-1-1'>"
			+ "<label style='margin-top: 8px;' class='TextFont'>"
			+ (rowCount)
			+ "</label></td>"
			+ "<td style='height: 21.5px;' class='col-md-2-1'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='date"
			+ rowCount
			+ "' name='date"
			+ (rowCount)
			+ "' onclick=displayCalendar(document.getElementById(\'date" + (rowCount) + "\'),\'dd/mm/yyyy\',this) readonly='readonly' /></td>"
			+ "<td style='height: 21.5px;' class='col-md-4-1'><input type='text' class='form-control input-SmallText' style='margin-top: 8px;' id='reason"
			+ rowCount
			+ "' name='reason' maxlength='45' onkeypress='return validatealphabetic(event)'></td>"
			+ "<td style='height: 21.5px;' class='col-md-1-1'><input type='checkbox' style='margin-top: 12px;' name='checkbox"
			+ rowCount
			+ "' id='checheckboxckbox'+ rowCount + '' /></td>"
			+ "<td style='height: 21.5px; width:2px; display: none'><input type='hidden' class='form-control input-SmallText' style='margin-top: 8px;' id='hiddenHdId"
			+ rowCount + "' value='0'></td>";

	$("#RowCount").val(rowCount);
	$("#addRowCount").val(j);
	j++;

}

function removeDivForHospitalHoliday() {

	var allVals = [];
	var p = 1;
	for ( var n = 0; n < $("#RowCount").val(); n++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#row" + p).remove();
		}
		p++;
	}

	if (allVals.length != 0 && allVals[0] != "on") {
		var inputs = [];
		inputs.push('action=deleteHospitalHoliday');
		inputs.push('allVals=' + allVals);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}

	var allVals = [];
	for ( var n = 1; n <= rowCount; n++) {

		var $radios = $('input:checkbox[name=checkbox' + n + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#row" + n).remove();
		}
	}
}

function saveHospitalHoliday() {
	var holiday = {
		liHoliday : []
	};

	var rowCount = $("#RowCount").val();
	for ( var i = 1; i <= rowCount; i++) {

		var txtDate = $("#date" + i).val();
		var reason = $("#reason" + i).val();
		var DateCheck = $("#date" + i).val().split("/");
		var date = DateCheck[0];
		var mnth = DateCheck[1];
		var yr = DateCheck[2];
		var selYear = $("#selYear").val();
		if (txtDate == "" && reason == "") {
			alert("Please enter atleast one row to save hospital holidays details.");
			return false;
		}
		if (DateCheck != " " && DateCheck != null) {
			if (selYear != yr) {
				alert(" Please Select Proper Year");
				return false;
			}
		}
		var txtHiddenHdID = $("#hiddenHdId" + i).val();
		if (txtHiddenHdID == undefined || txtHiddenHdID == "") {
			txtHiddenHdID = 0;
		}
		if (txtDate != undefined || txtDate != "") {

			for ( var l = 0; l < holiday.liHoliday.length; l++) {

				if (holiday.liHoliday[l].dt == txtDate) {
					alert("Duplicate Hospital Holidays date found at row:"
							+ (++l + 1));
					/*
					 * $("#date" + i).val(" "); $("#reason" + i).val(" ");
					 */
					return false;
				}
			}
			var newDate = yr + "-" + mnth + "-" + date;

			holiday.liHoliday.push({
				"dt" : newDate,
				"hdid" : txtHiddenHdID,
				"reason" : reason,
			});
		}
	}

	if (holiday.liHoliday.length == 0) {
		return false;

	} else {
		holiday = JSON.stringify(holiday);
		var inputs = [];
		inputs.push('action=saveHospitalHoliday');
		inputs.push('holiday=' + holiday);

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
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

var hospitalHolidayTemp = "<div class='col-sm-12-1'>"
		+ "<table class='table table-bordered' style='margin-top: 20px;width: 98.5%;'>"
		+ "<thead>"
		+ "<tr>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'><label class='TextFont' >#No</label></th>"
		+ "<th class='col-md-2-1' style='height: 21.5px;'><label class='TextFont'>Date</label></th>"
		+ "<th class='col-md-4-1' style='height: 21.5px;'><label class='TextFont'>Reason </label></th>"
		+ "<th class='col-md-1-1' style='height: 21.5px;'>"
		+ "<input type='button' value='+' onclick=createDivForHospitalHoliday() class='editUserAccess' disabled='disabled'/>"
		+ "<input type='button' value='-' onclick=removeDivForHospitalHoliday() class='editUserAccess' disabled='disabled'/></th>"
		+ "</tr>"
		+ "</thead>"
		+ "</table>"
		+ "</div>"
		+ "<div class='col-md-12-1' style='margin-top: -21px; overflow-y: scroll; height: 358px; max-height: auto;border:1px solid #b8b8b8;'>"
		+ "<table class='table table-bordered table-condensed'>"
		+ "<tbody class='' id='DRRDiv'>"
		+ "{#foreach $T.liHoliday as liHoliday}"
		+ "<tr id='remove{rowCount}'>"
		+ "<td class='col-md-1-1' style='height: 21.5px;'>"
		+ "<label style='margin-top: 8px;' class='TextFont' id='TimeslotTD{countForNATable}'>{countForNATable}</label></td>"
		+ "<td class='col-md-2-1' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' onclick=displayCalendar(document.getElementById(this.id),\'dd/mm/yyyy\',this) style='margin-top: 4px;' readonly='readonly' name='date{countForNATable}' id='date{countForNATable}' value='{$T.liHoliday.dt}'  ></td>"
		+ "<td class='col-md-4-1' style='height: 21.5px;'>"
		+ "<input type='text' class='form-control input-SmallText' style='margin-top: 4px;' name='reason{countForNATable}'	id='reason{countForNATable}' value='{$T.liHoliday.reason}' />"
		+ "</td>"
		+ "<td class='col-md-1-1' style='height: 21.5px;'><input name='checkbox{countForNATable}' id='checkbox{countForNATable}' type='checkbox' value='{$T.liHoliday.hdid}' class='holidayCheckbox' disabled='disabled'/></td>"
		+ "<input type='hidden' id='hiddenHdId{countForNATable}' value='{$T.liHoliday.hdid}'>"
		+ "</tr><input type='hidden' id='countForNATable' value='{countForNATable++}' />"
		+ "{#/for}"
		+ "<input type='hidden' value='{--countForNATable}' id='addRowCount' /><input type='hidden' value='{countForNATable}' id='RowCount' />";
		+ "</tbody>" + "</table>" + "</div>";

function getCurrentYear()
{
	var d = new Date();
	var n = d.getFullYear();
	$("#selYear").val(n);
}

function fetchHospitalHoliday(pageName) {

	var selYear = $("#selYear").val();
	countForNATable = 1;
	var inputs = [];
	inputs.push('action=fetchHospitalHoliday');
	inputs.push('pageName=' + pageName);
	inputs.push('selYear=' + selYear);
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
		success : function(ajaxResponse) {

			objc = eval('(' + ajaxResponse + ')');
			$("#divTimeslot").setTemplate(hospitalHolidayTemp);
			$("#divTimeslot").processTemplate(objc);
			// $("#RowCount").val(countForNATable);
			setTimeout(function(){userAccess();},100);
		}
	});
}

/** ****************End Hospital Holiday Details***************** */

/** **************Richa Code For Dynamic patient title************** */

function savePatientTitle() {
	var patientTitle = $("#txtPatientTitle").val();
	var patientTitleId = $("#patientTitleId").val();
	var patientTitleGender = $("#cboPatientTitleGender").val();
	var queryType = $("#queryType").val();

	if (patientTitle == "") {
		alert("Please Enter Patient Title");
		SetFocus("txtPatientTitle");
		return false;
	}
	if (patientTitleGender == "") {
		alert("Please Enter Suitable Gender for the Title");
		SetFocus("cboPatientTitleGender");
		return false;
	}

	var inputs = [];
	inputs.push('action=savePatientTitle');
	inputs.push('patientTitle=' + patientTitle);
	inputs.push('patientTitleId=' + patientTitleId);
	inputs.push('patientTitleGender=' + patientTitleGender);
	inputs.push('queryType=' + queryType);
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
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			location.reload();
			$("#txtPatientTitle").val("");
			$("#cboPatientTitleGender").val("");
			
		}
	});
}

var patientTitleViewTemp = "{#foreach $T.plist as plist}"
		+ "<tr>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-2-1' id='divPi2' style='height: 21.5px;'>{$T.plist.title}</td>"
		+ "<td class='col-sm-2-1' id='divPi2' style='height: 21.5px;'>{$T.plist.gender}</td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
		+ "<button value='Edit' class='btn btn-xs btn-success editUserAccess' onclick='editPatientTitle({$T.plist.ptid})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
		+ "<button value='Delete'  class='btn btn-xs btn-success deleteUserAccess' onclick='deletePatientTitle({$T.plist.ptid})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{#/for}";

var patientTitleOptionTemp = '<option value="select">select</option>{#foreach $T.plist as plist}<option value="{$T.plist.title}">{$T.plist.title}</option>{#/for}';

function defaultFetchPatientTitle(pagename) {

	var inputs = [];
	inputs.push('action=defaultFetchPatientTitle');

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
		
			$("#hiddenPatientTitleDetail").html(ajaxResponse);
			pobj = eval('(' + ajaxResponse + ')');
			if(pagename == "PatientTitle"){
				$("#PatientViewTitleContent").setTemplate(patientTitleViewTemp);
			}else if(pagename == "registration"){
				$("#PatientViewTitleContent").setTemplate(patientTitleOptionTemp);
			}
			
			$("#PatientViewTitleContent").processTemplate(pobj);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function editPatientTitle(ptid) {

	var ajaxResponse = $("#hiddenPatientTitleDetail").html();
	var myArray = JSON.parse(ajaxResponse);
	var myObj;
	for ( var i = 0; i < myArray.plist.length; i++) {
		if (myArray.plist[i].ptid == ptid) {
			myObj = myArray.plist[i];
			break;
		}
	}
	$("#txtPatientTitle").val(myObj.title);
	$("#queryType").val("update");
	$("#patientTitleId").val(ptid);
	$("#cboPatientTitleGender").val(myObj.gender);
}

function deletePatientTitle(ptid) {

	var r = confirm("Are you sure to delete the record ?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deletePatientTitle');
		inputs.push('patientTitleId=' + ptid);

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
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

var defaultViewAccountHallTemp = "<div style='width: 98%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 20%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; '>Hall Name</div><div style='width: 22.4%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; '>Hall Type</div><div style='width: 4%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Beds</div><div style='width: 6%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Edit</div><div	style='width: 10%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Delete Hall</div><div	style='width: 8%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; text-align: center;'>Add Bed</div><div	style='width: 9%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%; '>Delete Bed</div></div></div><div style='height: 87%;width:100%; overflow-y: scroll; border: 1px solid #436a9d;'>{#foreach $T.hl as hl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 5.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div> <div style='width: 21.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.hl.hn}</div> <div style='width: 24%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.hl.htnm}</div> <div style='width: 5%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;text-align: center;' id='utype{count}'>{$T.hl.bn}</div><div style='width: 8.2%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='EDIT'  class='edit' id='btnEdit{count}' onclick='editHall({$T.hl.hi})' /></div><div style='width: 11%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='DELETE'  class='edit' id='btnDelete{count}' onClick='deleteHall({$T.hl.hi})'/></div><div style='width: 9%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'><input style='font-size: 10px;' type='button' value='ADD'  class='edit' id='btnAdd{count}' onClick='AddBed({$T.hl.hi})'/></div><div style='width: 8%; height: 25px;  padding-left: 1%; padding-top: 3px; '><input style='font-size: 10px;' type='button' value='DELETE'  class='edit' id='btnDelete{count}' onClick='deleteBed({$T.hl.hi})'/></div></div>{#/for}</div>";

var AccsaveButtonTemp = "<button type='button' value='Save Now' onclick=saveHallAccountTypeDetails() class='btn btn-xs btn-success'>Save</button>";

function AccsetsaveButtonTemp() {
	var sampleBean;
	$("#saveButton").setTemplate(AccsaveButtonTemp);
	$("#saveButton").processTemplate(sampleBean);
}

function saveHallAccountTypeDetails() {
	
	var hall_ID = $("#btype :selected").val();

	var normalrowid = $("#normalrowid").val();
	var isolationrowid = $("#isolationrowid").val();
	var normalTypeId = $("#normalTypeId").val();
	var isolationTypeId = $("#isolationTypeId").val();

	var txtSpecialityNormal = $("#txtSpecialityNormal").val();
	var txtSpecialityIsolation = $("#txtSpecialityIsolation").val();
	var txtSuperSpecialityNormal = $("#txtSuperSpecialityNormal").val();
	var txtSuperSpecialityIsolation = $("#txtSuperSpecialityIsolation").val();
	var txtIntencivistNormal = $("#txtIntencivistNormal").val();
	var txtIntencivistIsolation = $("#txtIntencivistIsolation").val();
	var txtMedicalNormal = $("#txtMedicalNormal").val();
	var txtMedicalIsolation = $("#txtMedicalIsolation").val();

	var queryType;

	var corporateId = $("#sid").val();
	if (!corporateId) {
		corporateId = "0";
		queryType = $("#queryType").val();
	} else {
		queryType = $("#queryTypeCorp").val();
	}

	if (txtSpecialityNormal == "") {
		// alert("Please Enter Speciality Normal Type");
		alert("Please Enter  Speciality Normal Type");
		return false;
	} else if (txtSpecialityIsolation == "") {
		alert("Please Enter Speciality Isolation Type");
		return false;
	} else if (txtSuperSpecialityNormal == "") {
		alert("Please Enter Super Speciality Normal Type");
		return false;
	} else if (txtSuperSpecialityIsolation == "") {
		alert("Please Enter Super Speciality Isolation Type");
		return false;
	} else if (txtIntencivistNormal == "") {
		alert("Please Enter Intencivist Normal Type");
		return false;
	} else if (txtIntencivistIsolation == "") {
		alert("Please Enter Intencivist Isolation Type");
		return false;
	} else if (txtMedicalNormal == "") {
		alert("Please Enter Medical Team Normal Type");
		return false;
	} else if (txtMedicalIsolation == "") {
		alert("Please Enter Medical Team Isolation Type");
		return false;
	}

	var inputs = [];
	inputs.push('action=SaveHallAccountTypeDetails');
	inputs.push('queryType=' + queryType);
	inputs.push('hall_ID=' + hall_ID);
	// inputs.push('hname=' + encodeURIComponent(hname));

	// inputs.push('txtpkgCharges=' + encodeURIComponent(txtpkgCharges));
	inputs.push('txtSpecialityNormal='
			+ encodeURIComponent(txtSpecialityNormal));
	inputs.push('txtSpecialityIsolation='
			+ encodeURIComponent(txtSpecialityIsolation));
	inputs.push('txtSuperSpecialityNormal='
			+ encodeURIComponent(txtSuperSpecialityNormal));
	inputs.push('txtSuperSpecialityIsolation='
			+ encodeURIComponent(txtSuperSpecialityIsolation));
	inputs.push('txtIntencivistNormal='
			+ encodeURIComponent(txtIntencivistNormal));
	inputs.push('txtIntencivistIsolation='
			+ encodeURIComponent(txtIntencivistIsolation));
	inputs.push('txtMedicalNormal=' + encodeURIComponent(txtMedicalNormal));
	inputs.push('txtMedicalIsolation=' + txtMedicalIsolation);
	inputs.push('normalrowid=' + normalrowid);
	inputs.push('isolationrowid=' + isolationrowid);
	inputs.push('corporateId=' + corporateId);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert("Without Selecting Hall Type You Can't Save Charges");
			SetFocus("btype");
		},
		success : function(r) {
			ajaxResponse = r;
			alert(r);
			// window.location = "Speacial_Discount.jsp";
			defaultViewHallType();
		}
	});
	// defaultViewHall();
	// location.reload();
}
/*
 * function editAccountHallType() { $("#txtSpecialityIsolation").val=" "; }
 */

function editAccountHallType(idht) {
	ajaxResponse = $("#hallDetailDiv").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.htli.length; i++) {
		if (myArray.htli[i].idht == idht) {
			myObj = myArray.htli[i];
			break;
		}
	}
	myObj = JSON.stringify(myObj);
	hallBean = eval('(' + myObj.decodeSpecialChars() + ')');

	// $("#bedMangTemp1").setTemplate(editAccountHallTemp);
	// $("#bedMangTemp1").processTemplate(hallBean);
	
var btype= $.trim($("#btype :selected").val());
if(btype=="select")
{
	$("#txtSpecialityIsolation").val("");
	$("#txtSuperSpecialityIsolation").val("");
	$("#txtIntencivistIsolation").val("");
	$("#txtMedicalIsolation").val("");
	$("#isolationrowid").val("");
	$("#isolationTypeId").val("");
	$("#txtSpecialityNormal").val("");
	$("#txtSuperSpecialityNormal").val("");
	$("#txtIntencivistNormal").val("");
	$("#txtMedicalNormal").val("");
	$("#normalrowid").val("");
	$("#normalTypeId").val("");
}
else{
	for ( var i = 0; i < hallBean.lihtchr.length; i++) {
		if (hallBean.lihtchr[i].isoflg == "Y") {

			$("#txtSpecialityIsolation").val(hallBean.lihtchr[i].splnc);
			$("#txtSuperSpecialityIsolation").val(hallBean.lihtchr[i].supnc);
			$("#txtIntencivistIsolation").val(hallBean.lihtchr[i].intnc);
			$("#txtMedicalIsolation").val(hallBean.lihtchr[i].mednc);
			$("#isolationrowid").val(hallBean.lihtchr[i].idhtchr);
			$("#isolationTypeId").val(hallBean.lihtchr[i].idhtchr);
		} else {
			$("#txtSpecialityNormal").val(hallBean.lihtchr[i].splnc);
			$("#txtSuperSpecialityNormal").val(hallBean.lihtchr[i].supnc);
			$("#txtIntencivistNormal").val(hallBean.lihtchr[i].intnc);
			$("#txtMedicalNormal").val(hallBean.lihtchr[i].mednc);
			$("#normalrowid").val(hallBean.lihtchr[i].idhtchr);
			$("#normalTypeId").val(hallBean.lihtchr[i].idhtchr);
		}
	}
}
}
/** **************End************************************ */

/** ***********Jyoti code for temp. patient data storage************** */
var defaultViewsmlTemp = "<div style='width: 95%; background-color: #436a9d; padding: 1%; font-weight: bold;'><div style='width: 100%;'><div style='width: 4%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div style='width: 22%; border: 1px solid #FFF; color: #FFF; id='hname' padding-left: 1%; padding-right: 1%;'> Hall Name</div><div style='width: 24.5%; border: 1px solid #FFF; color: #FFF; id='htype' padding-left: 1%; padding-right: 1%;'>  Hall Type</div><div style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Lease Normal</div><div style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'>Lease Isolation</div></div></div><div style='height: 87%; width: 97%; overflow-y: scroll; border: 1px solid #436a9d;'>{#foreach $T.hl as hl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'><div style='width: 5.1%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count}.</div><div style='width: 21.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input  type='hidden' value='{$T.hl.hi}' id='idhname{count}'>{$T.hl.hn}</div><div style='width: 23.4%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'><input  type='hidden' value='{$T.hl.ht}' id='idhtype{count}'>{$T.hl.htnm}</div><div style='width: 18%; border-right: 1px solid #069; color: #FFF; padding-left: 1%; padding-right: 1%;'><input type='text' id='txtLeaseNormal{count}' value='{$T.hl.hal}' style='width: 50%;text-align: right;'></div><div style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;'><input type='text' id='txtLeaseIsolation{count}' value='{$T.hl.leaseiso}' style='width: 50%;text-align: right;'></div></div><input type='hidden' id='idbedcorporate{count}' value='{$T.hl.idb}'/><input type='hidden' id='count' value='{count++}' />{#/for}<input type='hidden' value='' id='addRowCount' /><input type='hidden' value='{count}' id='RowCount'><input type='hidden' id='queryType' value='insert' /></div>";

function defaultviewBedCharges() {
	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}

	count = 1;
	var inputs = [];
	inputs.push('action=fetchHall');
	inputs.push('corporateId=' + sid);
	inputs.push('callFrom=' + "default");

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
			$("#hallDetailDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			$("#bedMangTemp2").setTemplate(defaultViewBedChargesTemp);
			$("#bedMangTemp2").processTemplate(pobj1);
		}
	});
}

function saveBedCharges() {

	var sid = $("#sid").val();
	if (!sid) {
		sid = "0";
	}

	var rowCount = $("#RowCount").val();
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var ReadStvalue = rowCount - addrowCount;
	var idbedcorporate = $("#idbedcorporate").val();
	var i;
	var ItemString = "";
	for (i = 1; i < rowCount; i++) {

		count++;
		var idbedcorporate = $("#idbedcorporate" + i + " ").val();
		var hname = $("#idhname" + i + " ").val();
		var htype = $("#idhtype" + i + " ").val();
		var txtLeaseNormalPay = ($("#txtLeaseNormalPay" + i).val()).trim();
		var txtLeaseNormalCoPay = ($("#txtLeaseNormalCoPay" + i).val()).trim();
		var txtLeaseIsolationPay = ($("#txtLeaseIsolationPay" + i).val()).trim();
		var txtLeaseIsolationCoPay = ($("#txtLeaseIsolationCoPay" + i).val()).trim();
		var flag="N";
		if (($("#chargesApplicableFlag" + i).is(':checked')) == true) {
			flag = "Y";
		} else {
			flag = "N";
		}
		
		ItemString = ItemString + "@" + hname + "," + htype + ","
				+ txtLeaseNormalPay + "," + txtLeaseNormalCoPay + ", " + txtLeaseIsolationPay + ", " + txtLeaseIsolationCoPay + "," + flag + ", "
				+ idbedcorporate;

	}

	var queryType = $("#queryType").val();

	var inputs = [];
	inputs.push('action=saveBedCharges');
	inputs.push('queryType=' + queryType);
	inputs.push('ItemString=' + ItemString);
	inputs.push('corporate_acc_id=' + sid);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());

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
			alert(r);
			// window.location = "BedCharges.jsp";
		}
	});
}
function fetchBedCharges(type) {
	
	var sid = $("#sid").val();
	
	if (!sid) {
		sid = "0";
	}
	
	count = 1;
	var inputs = [];
	inputs.push()
	inputs.push('action=fetchBedCharges');
	inputs.push('corporateAcId=' + sid);

	inputs.push('type=' + type);
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
			$("#bedDetailDiv").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');

			if (sid == "0") {
				$("#bedMangTemp2").setTemplate(defaultViewBedChargesTemp);
				$("#bedMangTemp2").processTemplate(pobj1);
			} else {
				$("#divInside").setTemplate(defaultViewBedChargesTempCorp);
				$("#divInside").processTemplate(pobj1);
			}
		}
	});
}

/** ********************End ************************************* */

var i = 1;

function createDivSym() {

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;

	if (rowCount != 0) {
		var txtSymptoms = $("#txtSymptoms" + rowCount + "").val();

		if (txtSymptoms == "") {
			alert("Please fill the previous added row.");
			return false;
		}
	}
	rowCount++;

	rowId = "Sym" + rowCount;
	var x = document.createElement('tr');
	x.setAttribute('id', rowId);
	// x.setAttribute('class', 'col-md-12-1');
	x.setAttribute('style', 'margin-top: 0px');
	document.getElementById("divSym").appendChild(x);
	document.getElementById(rowId).innerHTML = '<td style="height: 21.5px; width: 66px;" class="col-md-1-1 center"><label style="margin-top: 8px;" class="TextFont">'
			+ (rowCount)
			+ '</label></td>'
			+ '<td style="height: 21.5px; width: 468px;" class="col-md-7-1 center"><input type="text" class="col-sm-12-1" style="margin-top: 8px;" id="txtSymptoms'
			+ rowCount
			+ '"></td>'
			+ '<td style="height: 21.5px; width: 116px;" class="col-md-2-1 center"><input type="checkbox" style="margin-top: 8px;" name="checkbox'
			+ rowCount + '" /></td>';
	$("#RowCount").val(rowCount);
	$("#addRowCount").val(i);
	i++;
}
function removeDivSym(RowCount) {

	var hiddenRowCount = document.getElementById(RowCount);
	var rowCount = hiddenRowCount.value;

	var allVals = [];
	for ( var n = 1; n <= rowCount; n++) {

		var $radios = $('input:checkbox[name=checkbox' + n + ']');
		if ($radios.is(':checked') == true) {
			allVals.push($radios.val());
			$("#Sym" + n).remove();
		}
	}
}

function saveSymDetail()
{
	var queryType = $("#queryType").val();
	var selName = $("#selName :selected").val();
	// var txtSymptoms=$("#txtSymptoms").val();

	if(selName == null || selName == "") 
	{
		alert("Please enter atleast one Symptoms Name to save");
		return false;
	}
	var objSKC = 0;

	objSKC = {
		sml : []
	};
	var rowCount = $("#RowCount").val();

	var count = 0;
	if (rowCount == 0 || status == 'Y') {
		alert("You can not save empty fields.");
		return false;
	}

	for ( var i = 1; i <= rowCount; i++) {
		count++;
		var txtSymptoms = $("#txtSymptoms" + count + "").val();

		var txtidskco = $("#idskco" + count + "").val();
		if (txtidskco == undefined) {

			txtidskco = 0;
		}
		if (txtSymptoms == "") {
			alert("Please Enter Symptoms.");
			return false;
		}
		if (txtSymptoms != undefined) {

			objSKC.sml.push({
				"idsym" : txtidskco,
				"sn" : txtSymptoms,
				"did" : selName
			});
		}
	}

	objSKC = JSON.stringify(objSKC);
	var inputs = [];
	inputs.push('action=saveSymDetail');
	inputs.push('queryType=' + queryType);
	inputs.push('objSKC=' + objSKC);

	// inputs.push('idTempMast=' + idTempMast);
	// inputs.push('status=' + status);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
		success : function(ajaxResponse) {
			
			alert("Symptoms Details Saved Successfully...");
		}
	});
}

var fetchSymptomsTemp = '{#foreach $T.sml as sml}'
		+ '<tr id="Sym{count}" class="" style="margin-top: 0px;">'
		+ '<td class="col-md-1-1 center" style="height: 21.5px;">'
		+ '<label style="margin-top: 8px;" class="TextFont">{count}</label></td>'
		+ '<td class="col-md-7-1 center" style="height: 21.5px;">'
		+ '<input type="text" class="col-md-12-1" style="margin-top: 8px;" id="txtSymptoms{count}" value="{$T.sml.sn}">'
		+ '</td>'
		+ '<td class="col-sm-2-1 center" style="height: 21.5px;">'
		+ '<input type="checkbox" style="margin-top: 8px;" name="checkbox{count}" id="checkbox" value="{$T.sml.idsym}" class="symptomsCheckbox" disabled="disabled"/>'
		+ '</td>'
		+ '<input type="hidden" value="{$T.sml.idsym}" id="idskco{count}" name="idskco{count}" />'
		+ '<input type="hidden" value="{count++}" id="txtRowCount" name="txtRowCount" />'
		+ '</tr>' + '{#/for}'
		+ '<input type="hidden" value="{--count}" id="addRowCount" />'
		+ '<input type="hidden" value="{count}" id="RowCount" />';

function fetchSymptoms() {

	var selName = $("#selName :selected").val();
	if (selName == "" || selName == undefined) {
		selName = 1;
	}

	var inputs = [];
	inputs.push('action=fetchAllSym');
	inputs.push('did=' + selName);
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
			var obj = eval('(' + ajaxResponse + ')');
			$("#objsym").html(ajaxResponse);
			count = 1;
			$("#queryType").val('Update Now');
			$("#divSym").setTemplate(fetchSymptomsTemp);
			$("#divSym").processTemplate(obj);
			for ( var i = 0; i < obj.sml.length; i++) {
				var o = new Option("option text", "value");
				$(o).html(obj.sml[i].sn);
				$(o).val(obj.sml[i].idsym);
				$("#symp").append(o);
			}
			setTimeout(function(){userAccess();},100);
		}
	});
}
function setNewSymTemp() {
	$("#addRowCount").val(0);
	$("#RowCount").val(0);
	$("#selName").val(0);
	// $("#txtTempId").val(0);
	$("#divSym").html("obj");
	createDivSym();
	$("#btnSave").val("Save Now");
	$("#addRowCount").val(1);
	$("#RowCount").val(1);

}

function removeSymDetail() {

	alert("Do you really want to delete this information");
	var allVals = [];

	$.each($('#checkbox:checked'), function() {
		allVals.push($(this).val());
	});

	if (allVals.length != 0) {
		var inputs = [];
		inputs.push('action=deleteSymptoms');
		inputs.push('allVals=' + allVals);
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
			}
		});
	}

	var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;
	var addrowCount = $("#addRowCount").val();
	var count = rowCount - addrowCount;
	var p = 1;
	for ( var i = 0; i < rowCount; i++) {

		var $radios = $('input:checkbox[name=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			$("#Sym" + p + "").remove();
		}
		p++;
	}
}

var chartTypeForOperationName = "<option	value='Select'>-Select-</option>{#foreach $T.lict as lict}<option value='{$T.lict.idct}'>{$T.lict.cn}</option>{#/for}";
var chartTypeForOperationNameNew = "<option	value='Select'>-Select-</option><option	value='NursingChart' selected>Nursing Chart</option>{#foreach $T.lict as lict}<option value='{$T.lict.idct}'>{$T.lict.cn}</option>{#/for}";

function fetchChartName() {
	var inputs = [];
	inputs.push('action=fetchChartName');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#cType").setTemplate(chartTypeForOperationName);
			$("#cType").processTemplate(pobj1);
		}
	});
}

function fetchChartName1() {

	var inputs = [];
	inputs.push('action=fetchChartNameNew');
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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#cType").setTemplate(chartTypeForOperationName);
			$("#cType").processTemplate(pobj1);
		}
	});
}

function fetchChartNameNew() {
	
	var inputs = [];
	inputs.push('action=fetchChartName');
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
			
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#cType").setTemplate(chartTypeForOperationNameNew);
			$("#cType").processTemplate(pobj1);
		}
	});
}

function saveChartName() {
	var cType = $("#cType :selected").val();
	if (cType.trim() == null || cType.trim() == "" || cType.trim() == "Select") {
		alert("Please select Chart Name.");
		return false;
	}
	var checkbox = $('#checkbox:checked').val();
	var r;
	if (checkbox == undefined) {
		r = true;
	} else {
		r = confirm("Do you want to discard delete operation...?");
	}

	if (r == true) {

		var objSKC = 0;
		objSKC = {
			lict : []
		};
		var rowCount = $("#RowCount").val();
		var count = 0;
		if (rowCount == 0 && status == 'Y') {
			alert("You can not save empty fields.");
			return false;
		}
		for ( var i = 1; i <= rowCount; i++) {
			count++;
			// var cname = encodeURIComponent($("#cname" + count + "").val());
			// var fee = encodeURIComponent($("#fee" + count + "").val());
			
			var cname = $("#cname" + count + "").val();
			var fee = ($("#fee" + count + "").val()).trim();
			var txtidskco = $("#idskco" + count + "").val();
			if (txtidskco == undefined) {
				txtidskco = 0;
			}
			if (cname.trim() == "") {
				alert("Please enter chart name");
				return false;
			}
			if ((cType != undefined) && (cname != "undefined")) {
				objSKC.lict.push({
					"idct" : txtidskco,
					"cn" : cname,
					"fee" : fee,
					"ct" : cType
				});
			}
		}

		objSKC = JSON.stringify(objSKC);
		var inputs = [];
		inputs.push('action=saveChartName');
		inputs.push('objSKC=' + encodeURIComponent(objSKC));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			success : function(ajaxResponse) {
				var p = 1;
				for ( var i = 0; i < rowCount; i++) {
					$('input:checkbox[name=checkbox' + p + ']').attr("checked",
							false);
					p++;
				}
				alert("Data inserted Successfully....");
				window.location.reload(true);
			}
		});
	} else {
		var p = 1;
		for ( var i = 0; i < rowCount; i++) {

			$('input:checkbox[name=checkbox' + p + ']').attr("checked", true);
			p++;
		}
	}
}
var defaultChartViewTemp = "{#foreach $T.lict as lict}<tr id='remove{count}'>"
		+ "<td class='col-md-1-1 center'>{count}.</td>"
		+ "<td class='col-md-6-1 center'><input type='text' style='width: 80%' id='cname{count}' value='{$T.lict.cn}' /></td>"
		+ "<td class='col-md-4-1 center' id='fee'>"
		+ "<input type='text' style='width: 75%' id='fee{count}' onkeypress='return validateNumbers(event)' maxlength='6' value='{$T.lict.fee}' /></td>"
		+ "<td class='col-md-1-1 center'>"
		+ "<input type='checkbox' value='{$T.lict.idct}' name='checkbox' id='checkbox{count}' class='chartViewCheckbox' disabled='disabled'/></td>"
		+ "<input type='hidden' value='{$T.lict.idct}' id='idskco{count}' name='idskco{count++}' /></td>"
		+ "</tr>{#/for}<input type='hidden' value='{--count}' id='addRowCount' />"
		+ "<input type='hidden' value='{count}' id='RowCount' />";

function setDefaultViewChartSlave(callFrom) {
	var cType = $("#cType :selected").val();

	if (cType == "" || cType == undefined || cType == "Select") {
		cType = 1;
	}

	count = 1;
	$("#save").html("");
	var inputs = [];
	inputs.push('action=defaultChartView');
	inputs.push('cType=' + cType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#chartObj").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#chartAddTemp").setTemplate(defaultChartViewTemp);
			$("#chartAddTemp").processTemplate(pobj1);
			setTimeout(function(){userAccess();},100);
		}
	});
}

var defaultChartViewTempNew = 
	/*
	 * + "<div class='col-sm-12-1' style='height: 485px; max-height: auto;
	 * overflow: auto'>" + "<table class='table table-bordered table-striped
	 * table-condensed cf' style='width: 200%; max-width: 1000%;'>" + "<thead>" + "<tr>" + "<th class='TextFont' style='width: 26px;'>Sr</th>" + "<th class='TextFont' style='width: 200px;'>Name</th>" + "<th class='TextFont' style='width: 38px;'>8
	 * am</th>" + "<th class='TextFont' style='width: 38px;'>9 am</th>" + "<th class='TextFont center' style='width: 39px;'>10
	 * am</th>" + "<th class='TextFont center' style='width: 38px;'>11 am</th>" + "<th class='TextFont center' style='width: 39px;'>12
	 * am</th>" + "<th class='TextFont' style='width: 38px;'>1 pm</th>" + "<th class='TextFont' style='width: 38px;'>2
	 * pm</th>" + "<th class='TextFont' style='width: 38px;'>3 pm</th>" + "<th class='TextFont' style='width: 38px;'>4
	 * pm</th>" + "<th class='TextFont' style='width: 38px;'>5 pm</th>" + "<th class='TextFont' style='width: 38px;'>6
	 * pm</th>" + "<th class='TextFont' style='width: 38px;'>7 pm</th>" + "<th class='TextFont' style='width: 38px;'>8
	 * pm</th>" + "<th class='TextFont' style='width: 38px;'>9 pm</th>" + "<th class='TextFont center' style='width: 39px;'>10
	 * pm</th>" + "<th class='TextFont center' style='width: 38px;'>11 pm</th>" + "<th class='TextFont center' style='width: 39px;'>12
	 * pm</th>" + "<th class='TextFont' style='width: 38px;'>1 am</th>" + "<th class='TextFont' style='width: 38px;'>2
	 * am</th>" + "<th class='TextFont' style='width: 38px;'>3 am</th>" + "<th class='TextFont' style='width: 38px;'>4
	 * am</th>" + "<th class='TextFont' style='width: 38px;'>5 am</th>" + "<th class='TextFont' style='width: 38px;'>6
	 * am</th>" + "<th class='TextFont' style='width: 38px;'>7 am</th>" + "</tr>" + "</thead>" + "<tbody>"
	 */
		"{#foreach $T.listReport as lict}"
	+"{#if $T.lict.cname=='Bp' || $T.lict.cname=='BP' || $T.lict.cname=='bP' || $T.lict.cname=='blood pressure' || $T.lict.cname=='Blood Pressure' || $T.lict.cname=='Blood pressure' || $T.lict.cname=='blood Pressure' || $T.lict.cname=='Bp (Millimeters)' || $T.lict.cname=='BP (Millimeters)' || $T.lict.cname=='bP (Millimeters)' || $T.lict.cname=='blood pressure (Millimeters)' || $T.lict.cname=='Blood Pressure (Millimeters)' || $T.lict.cname=='Blood pressure (Millimeters)' || $T.lict.cname=='blood Pressure (Millimeters)' || $T.lict.cname=='Blood Pressure (Mm of Hg)'}"
	
	+ "<tr id='remove{count}'>"
	+ "<td class='center' style='height: 21.5px; width: 30px;'>{sr++}.</td>"
	+ "<td class='' style='height: 21.5px; width: 270px;' id='cname{count}'>{$T.lict.cname}</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='8am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='8am{count}' value='{$T.lict.am8}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='9am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='9am{count}' value='{$T.lict.am9}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='10am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='10am{count}' value='{$T.lict.am10}'/>"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='11am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='11am{count}' value='{$T.lict.am11}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='12am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='12am{count}' value='{$T.lict.am12}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='1pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='1pm{count}' value='{$T.lict.pm1}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='2pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='2pm{count}' value='{$T.lict.pm2}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='3pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='3pm{count}' value='{$T.lict.pm3}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='4pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='4pm{count}' value='{$T.lict.pm4}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='5pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='5pm{count}' value='{$T.lict.pm5}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='6pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='6pm{count}' value='{$T.lict.pm6}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='7pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='7pm{count}' value='{$T.lict.pm7}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='8pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='8pm{count}' value='{$T.lict.pm8}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='9pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='9pm{count}' value='{$T.lict.pm9}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='10pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='10pm{count}' value='{$T.lict.pm10}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='11pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='11pm{count}' value='{$T.lict.pm11}'/>"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='12pm'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='12pm{count}' value='{$T.lict.pm12}'/>"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='1am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='1am{count}' value='{$T.lict.am1}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='2am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='2am{count}' value='{$T.lict.am2}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='3am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='3am{count}' value='{$T.lict.am3}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='4am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='4am{count}' value='{$T.lict.am4}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='5am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='5am{count}' value='{$T.lict.am5}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='6am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='6am{count}' value='{$T.lict.am6}' />"
	+ "</td>"
	+ "<td class='center' style='height: 21.5px; width: 100px;' id='7am'>"
	+ "<input type='text' maxlength='7' class='form-control input-SmallText' id='7am{count}' value='{$T.lict.am7}' />"
	+ "</td>"
	+ "<input type='hidden' value='{$T.lict.idct}' id='idskco{count}' name='idskco{count++}' />"
	+ "</tr>"
	/*+"{#/if}"
	+ "{#/for}";*/
	
		+"{#else}"
	
	
	
	
	
	
		+ "<tr id='remove{count}'>"
		+ "<td class='center' style='height: 21.5px; width: 30px;'>{sr++}.</td>"
		+ "<td class='' style='height: 21.5px; width: 270px;' id='cname{count}'>{$T.lict.cname}</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='8am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='8am{count}' value='{$T.lict.am8}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='9am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='9am{count}' value='{$T.lict.am9}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='10am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='10am{count}' value='{$T.lict.am10}'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='11am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='11am{count}' value='{$T.lict.am11}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='12am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='12am{count}' value='{$T.lict.am12}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='1pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='1pm{count}' value='{$T.lict.pm1}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='2pm'>"
		+ "<input type='text'  maxlength='3' class='form-control input-SmallText' id='2pm{count}' value='{$T.lict.pm2}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='3pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='3pm{count}' value='{$T.lict.pm3}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='4pm'>"
		+ "<input type='text'  maxlength='3' class='form-control input-SmallText' id='4pm{count}' value='{$T.lict.pm4}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='5pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='5pm{count}' value='{$T.lict.pm5}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='6pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='6pm{count}' value='{$T.lict.pm6}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='7pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='7pm{count}' value='{$T.lict.pm7}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='8pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='8pm{count}' value='{$T.lict.pm8}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='9pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='9pm{count}' value='{$T.lict.pm9}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='10pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='10pm{count}' value='{$T.lict.pm10}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='11pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='11pm{count}' value='{$T.lict.pm11}'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='12pm'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='12pm{count}' value='{$T.lict.pm12}'/>"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='1am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='1am{count}' value='{$T.lict.am1}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='2am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='2am{count}' value='{$T.lict.am2}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='3am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='3am{count}' value='{$T.lict.am3}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='4am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='4am{count}' value='{$T.lict.am4}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='5am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='5am{count}' value='{$T.lict.am5}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='6am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='6am{count}' value='{$T.lict.am6}' />"
		+ "</td>"
		+ "<td class='center' style='height: 21.5px; width: 100px;' id='7am'>"
		+ "<input type='text'  maxlength='20' class='form-control input-SmallText' id='7am{count}' value='{$T.lict.am7}' />"
		+ "</td>"
		+ "<input type='hidden' value='{$T.lict.idct}' id='idskco{count}' name='idskco{count++}' />"
		+ "</tr>"
		+"{#/if}"
		+ "{#/for}";
		// + "</tbody>"
		// + "</table>"
		// + "</div>";

var defaultInputOutput = "<div class='divide-20'></div>"
		+ "<div id='infoDiv' class='col-md-4-1' "
		+ "	style='border: 1px solid #ddd; height: 350px;margin-left: 2%;margin-bottom: 2%;'>"
		+ "<div><h3 id='chartTitle' style='margin-left:10%;'>Add Input Chart:</h3></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:20px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Time'>Time<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='time' name='time' type='text' placeholder='Time' "
		+ "class='form-control input-SmallText col-md-6-1' readonly='readonly' /></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Chart Name'>Chart Name<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<select id='chartNm' name='chartNm' class='form-control input-SmallText col-md-6-1'></select></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Key'>Key</label>"
		+ "<input id='key' name='key' type='text' placeholder='Key' "
		+ "class='form-control input-SmallText col-md-6-1' required='true' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Value'>Value<b style='color: red; padding-left: 3px;'>*</b></label>"
		+ "<input id='value' name='value' type='text' placeholder='Value' onkeypress='return validateNumbers(event)'"
		+ "class='form-control input-SmallText col-md-6-1' required='true' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-4-1' style='margin-left:10%;' for='Unit'>Unit</label>"
		+ "<input id='unit' name='unit' type='text' placeholder='Unit'"
		+ "class='form-control input-SmallText col-md-6-1' maxlength='44'/></div>"
		+ "<div class='form-group Remove-Padding col-md-12-1 center' style='padding-right: 8px;margin-top:13px;'>"
		+ "<div class='divide-10'></div>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='SAVE' id='saveBtn' onClick='saveNewChartDetails()' disabled='disabled'>"
		+ "Save Chart</button></div>"
		+ "<input id='queryType' value='insert' type='hidden' />"
		+ "<input type='hidden' id='chrtid' value='0' />"
		+ "</div>"
		+ "<div id='userMangTemp' class='col-md-7-1' style='margin-left: 4%;margin-bottom: 2%; height: 350px;'></div>"
		+ "<div class='divide-20'>" + "</div>";

var defaultChartTemp = "<div class='col-sm-12-1'>"
		+ "<div class='divide-10'></div>"
		+ "<table class='table table-bordered table-condensed cf' style='width : 98%;'>"
		+ "<thead class='cf'>"
		+ "<tr>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Time</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Chart Name</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Key</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Value</div></th>"
		+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Unit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
		+ "</tr>"
		+ "</thead>	"
		+ "</table></div>"
		+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #ddd; overflow-y:scroll; height: 275px; max-height: auto;'>"
		+ "<table class='table table-striped table-condensed cf'>"
		+ "<tbody>"
		+ "{#foreach $T.lichrt as lichrt}"
		+ "<tr>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.lichrt.time}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.lichrt.cname}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.lichrt.key}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.lichrt.value}</td>"
		+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>{$T.lichrt.unit}</td>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success editUserAccess' value='EDIT' id='btnEdit{count}' onclick='editInputOutputChartDetails({$T.lichrt.id})' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>"
		+ "</button>"
		+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
		+ "<button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete{count}' onclick='deleteInputOutputChartDetails({$T.lichrt.id})' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>"
		+ "</button>"
		+ "</td>"
		+ "</tr>"
		+ "{#/for}"
		+ "</tbody>"
		+ "</table>"
		+ "</div>"
		+ "<div class='form-group Remove-Padding col-md-12-1' style='padding-right: 8px;margin-top:13px;padding-leftt: 40%;'>"
		+ "<div class='divide-10'></div>"
		+ "<label class='TextFont col-md-1-1' style='margin-left:52%;margin-top: -1%;' for='Total'>Total</label>"
		+ "<input id='Total' name='Total' type='text' placeholder='Total' readonly='readonly'"
		+ "class='form-control input-SmallText col-md-3-1' maxlength='44'/></div>";


function setDefaultChartNames() {

	var cType = $("#cType :selected").val();

	if (cType == "" || cType == undefined || cType == "Select") {
		cType = 1;
	} else if (cType == "4" || cType == "5") {
		$("#save").html("");
		var inputs = [];
		inputs.push('action=defaultChartNames');
		inputs.push('cType=' + cType);
		var str = inputs.join('&');
		jQuery
				.ajax({
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
						var pobj1 = decodeURIComponent(ajaxResponse);
						pobj1 = eval('(' + pobj1 + ')');
						var htmlChartTemplate = "<option value='Select'>-Select-</option>";

						setTimeout(function() {

							for ( var int = 0; int < (pobj1.lichrt.length); int++) {
								htmlChartTemplate += ("<option value='" + (pobj1.lichrt[int].chrtid) + "'>"
										+ (pobj1.lichrt[int].cname) + "</option>");
							}
							$("#chartNm").html(htmlChartTemplate);
						}, 1000);
					}
				});
	}
	disableIpdNursingChart();
}

function disableIpdNursingChart() {
	
	setTimeout(function() {
		var callFor = ($("#callFor").val()).trim();
		if (callFor === "previousTreatmentIPD") {
			$("#ipdNursingStationJSPHeadDiv *").prop("disabled", true);
			$("#date-pick").prop("disabled", false);
			/* select tag */
			$("#cType").prop("disabled", false);
			/* option tag */
			$("#cType *").prop("disabled", false);
			// $("#ipdServicesVerticalTab *").prop("disabled", false);
			$("#save").prop("disabled", true);
		}
	}, 1000);
	setTimeout(function(){userAccess();},100);
};

function disableIpdDoctorStationJSP() {
	
	var callFor = ($("#callFor").val()).trim();
	if (callFor === "previousTreatmentIPD") {
		$("#ipdDoctorStationJSPHeadDiv *").prop("disabled", true);
		$("#date-pick").prop("disabled", false);
		$("#AlertsAllergiesPopupButton").prop("disabled", false);
		$("#OFdate-pick").prop("disabled", false);
		$("#AllergyAlertsCloseButton").prop("disabled", false);
		// $("#").prop("disabled", false);
	}
	
};

function setDefaultChartTemp() {
	var total=0;
	var cType = $("#cType").val();
	//var trid = $("#treatmentId").val(); 
	var trid=$("#tr_Id").val();//added by paras
	var chart_date = $("#date-pick").val();
	
	var input = [];
	input.push('action=getExistingInputCharts');
	input.push('cType=' + cType);
	input.push('trid=' + trid);
	input.push('chart_date=' + chart_date);
	var str = input.join('&');

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
	
			$("#InputChartDiv").html(ajaxResponse);
			result = eval('(' + ajaxResponse + ')');
			
			count = 1;
			$("#userMangTemp").setTemplate(defaultChartTemp);
			$("#userMangTemp").processTemplate(result);
			
			for(var i=0; i<result.lichrt.length;i++){
				total = total + parseInt(result.lichrt[i].value);
			}
			$("#Total").val(total);
			setTimeout(function(){userAccess();},100);
		}
	});
}

function editInputOutputChartDetails(chrtid) {
	var cType = $("#cType").val();
	if (cType == 4) {
		$("#chartTitle").html("Edit Input Chart:");
	} else if (cType == 5) {
		$("#chartTitle").html("Edit Output Chart:");
	}

	// commented by:Abhijit
	// setDefaultChartNames();
	$("#queryType").val("update");
	ajaxResponse = $("#InputChartDiv").html();
	myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.lichrt.length; i++) {

		if (myArray.lichrt[i].id == chrtid) {

			myObj1 = myArray.lichrt[i];
			break;
		}
	}
	$("#time").val(myObj1.time);
	$("#key").val(myObj1.key);
	$("#value").val(myObj1.value);
	$("#unit").val(myObj1.unit);
	$("#chrtid").val(myObj1.id);

	setTimeout(function() {
		$("#chartNm option:selected").text(myObj1.cname);
	}, 200);
}

function deleteInputOutputChartDetails(chrtid) {
	var r = confirm("Confirm to Delete this information ?");
	if (r == true) {
		var cType = $("#cType").val();
		var inputs = [];
		inputs.push('action=deleteInputOutputChartDetails');
		inputs.push('chrtid=' + chrtid);
		inputs.push('cType=' + cType);
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

function saveNewChartDetails() {
	var date = $("#date-pick").val();
	var cType = $("#cType").val();
	var time = $("#time").val();
	var chartNm = $("#chartNm :selected").val();
	var chartName = $("#chartNm :selected").text();
	var key = $("#key").val();
	var value = $("#value").val();
	var unit = $("#unit").val();
	var queryType = $("#queryType").val();
	var chrtid = $("#chrtid").val();
	//var trid = $("#treatmentId").val();
	var trid=$("#tr_Id").val();//added by paras
	if (cType == "Select") {
		alert("Please select Chart Type !");
		setFocus("#cType");
		return false;
	} else if (time == "") {
		alert("Please Select Time !");
		SetFocus("#time");
		return false;
	} else if (chartName == "-Select-") {
		alert("Please select Chart Name !");
		setFocus("#chartNm");
		return false;
	} else if (value == "") {
		alert("Please Enter Value !");
		setFocus("#value");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveNewChartDetails');
	inputs.push('date=' + date);
	inputs.push('cType=' + cType);
	inputs.push('time=' + time);
	inputs.push('chartNm=' + chartName);
	inputs.push('key=' + key);
	inputs.push('value=' + value);
	inputs.push('unit=' + unit);
	inputs.push('trid=' + trid);
	inputs.push('queryType=' + queryType);
	inputs.push('chrtid=' + chrtid);
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
			alert(ajaxResponse);
			$("#time").val("");
			$("#key").val("");
			$("#value").val("");
			$("#unit").val("");
			
			// set select box
			setDefaultChartNames();
			
			setTimeout(function() {
				setDefaultChartTemp();
			}, 200);
			
			if(cType == 4){
				$("#chartTitle").html("Add Input Chart:");
			}else{
				$("#chartTitle").html("Add Output Chart:");
			}
			$("#queryType").val("insert");
			$("#chrtid").val(0);
		}
	});
}

var defaultNursingChart = "<div style='width: 98%; padding-left: 0%;'><div style='width: 98%; background-color: #436a9d; padding-left:0%; padding-bottom: 1%;padding-top: 1%; font-weight: bold;'><div style='width: 100%; padding-left:1%;'><div style='width: 8%; border: 1px solid #FFF; color: #FFF; text-align: center;'>#</div><div	style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Time</div><div	style='width: 18%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Name of Drug</div><div	style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Strength</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Dose</div><div style='width: 15%; border: 1px solid #FFF; color: #FFF; padding-left: 1%; padding-right: 1%;text-align: center;'>Sign</div></div></div></div><div	style='width: 96%; height: 300px; overflow-y: auto; border: 1px solid #436a9d;' id='DRRDiv'>{#foreach $T.nursingChart as tnl}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;padding-left:1%;'><div style='width: 8%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{sr++}.</div><div	style='width: 16.1%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 90%;' type='text' onmouseover='click1()' class='demo' name='textfield' id='time{rowCount}' value='{$T.tnl.time}'/></div><div style='width: 19.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 90%;' type='text' name='textfield' class='auto' id='nameOfDrug{rowCount}' value='{$T.tnl.nameOfDrug}'/></div><div	style='width: 16.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 90%;' type='text' name='textfield' id='strength{rowCount}' value='{$T.tnl.strength}'/></div><div	style='width: 16.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;'><input style='width: 90%;' type='text' name='textfield' id='dose{rowCount}' value='{$T.tnl.dose}' /></div><div style='width: 16.1%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px;' ><div style='width: 90%;' id='sign{rowCount}'>{$T.tnl.sign}</div></div><div style='width: %; height: 25px; padding-left: %; padding-top: 3px; text-align: center;'><input type='checkbox' name='checkbox{rowCount}' id='checkbox{rowCount}' value='{$T.tnl.id}' /></div></div><input type='hidden' value='{$T.tnl.id}' id='id{rowCount}' /><input type='hidden'	value='{rowCount++}' id='txtRowCount' name='txtRowCount'/>{#/for}<input type='hidden' value='' id='addRowCount' /><input type='hidden'	value='{--rowCount}' id='RowCount'/></div>";

function setDefaultViewChartSlaveNew(cType) {

	sr = 1;
	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');

	var cType = $("#cType :selected").val();
	if (cType == "NursingChart" || cType == undefined) {
		$("#save").hide();
		$("#addDivNC").show();
		$("#remDivNC").show();
		fillDIC($("#date-pick").val());
		$("#chartSlaveTemp").hide();
		$("#times").hide();
		$("#IPD_DICContent").show();
		$("#chartAddTemp").show();
		$("#printButton").show();

	} else if (cType == "1" || cType == "2") {
		$("#chartSlaveTemp").hide();
		$("#IPD_DICContent").show();
		$("#addDivNC").hide();
		$("#remDivNC").hide();
		$("#times").hide();
		$("#printButton").hide();
		$("#save").show();
		$("#chartAddTemp").show();
		var tid = $("#trid").html();
		getChartReportNew(tid, cType);

	} else if (cType == "4" || cType == "5") {
		$("#chartSlaveTemp").show();
		$("#IPD_DICContent").hide();
		$("#times").hide();
		$("#addDivNC").hide();
		$("#remDivNC").hide();
		$("#printButton").hide();
		$("#chartAddTemp").show();
	} else {

		if (cType == "" || cType == undefined) {
			cType = 1;
		}
		$("#chartSlaveTemp").show();
		$("#IPD_DICContent").hide();
		$("#addDivNC").hide();
		$("#remDivNC").hide();
		$("#times").show();
		$("#printButton").hide();
		$("#save").show();
		$("#chartAddTemp").hide();
		var saveChartSlaveSaveButton = '<input type="button" value="Save Now" class="btn btn-xs btn-success editUserAccess" onclick="saveChartSlave()" disabled="disabled">';
		$("#save").html("");
		$("#save").setTemplate(saveChartSlaveSaveButton);
		$("#save").processTemplate();
	}
	
	if(cType != "NursingChart" && cType != 1 && cType != 2){
		count = 1;
		var trid=$("#tr_Id").val();//added by paras
		//var trid=$("#treatmentId").val();//added by paras
		var inputs = [];
		inputs.push('action=defaultChartSlaveView');
		inputs.push('cType=' + cType);
		/*inputs.push('tid=' + pobj1.trid);*/
		inputs.push('tid=' + trid);
		inputs.push('date=' + $("#date-pick").val());
		var str = inputs.join('&');

		if (cType == "Select") {
			$("#addDiv").hide();
			$("#remDiv").hide();
			$("#chartSlaveTemp").hide();
			$("#times").hide();
			$("#IPD_DICContent").hide();
			$("#save").hide();
			// location.reload(true);
		} else {
			//alert("ss");
			jQuery.ajax({
						async : false,
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
							$("#chartObj").html(ajaxResponse);
							pobj1 = eval('(' + ajaxResponse + ')');

							if (cType == 4 || cType == 5) {
								$("#chartAddTemp").setTemplate(defaultInputOutput);
								$("#chartAddTemp").processTemplate(pobj1);
							} else { // vitals
								$("#vitalsbody").setTemplate(defaultChartViewTempNew);
								$("#vitalsbody").processTemplate(pobj1);
							}

							if (cType == 4) {
								$('#time').datetimepicker({
									datepicker : false,
									format : 'H:i',
									step : 5
								});
								
								setDefaultChartTemp();
								
							} else if (cType == 5) {
								$("#chartTitle").html("Add Output Chart:");
								$('#time').datetimepicker({
									datepicker : false,
									format : 'H:i',
									step : 5
								});
								
								setDefaultChartTemp();
								
							}
						}
					});
		}
	}
	disableIpdNursingChart();
	$("#save1").hide();
	var preTreat = $("#preTreat").val();
	if(preTreat=="Y"){
		$("#saveBtn").hide();
		$("#iPackage").hide();
		$("#saveIPDServNusring").hide();
		$("#ipdPrintBtn").hide();
		$("#pharmacyMedicine").hide();
		$("#save").hide();
	    $('#chartAddTemp').find('input, select').attr('disabled', 'disabled');
        $("#ipdPrintBtn").attr("disabled","disabled");
    	setTimeout(function() {
        $('#userMangTemp').find('.deleteUserAccess').remove("onclick");
        $('#userMangTemp').find('button').attr('disabled', 'disabled');}, 200);
	}
};

function deleteChartName() {
	
	var counter = 0;
	var ipdServiceID = null;
	var exitFlag = false;

	$('#chartAddTemp tr').each(function() {
		var len = $(this).find('input[type=checkbox]:checked').length;
		if (len == 1) {
			ipdServiceID = $('#checkbox' + counter).val();
			exitFlag = true;
		}
		counter++;
	});
	if (exitFlag == false) {
		alert("please select chart name and check the checkbox to delete");
		return;
	}
	
	var r = confirm("Confirm to Delete this information ?");
	if (r == true) {

		var allVals = [];
		$.each($('input[name="checkbox"]:checked'), function() {
			allVals.push($(this).val());
		});
		if (allVals.length != 0) {
			var inputs = [];
			inputs.push('action=deleteChartName');
			inputs.push('allVals=' + allVals);
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
				}
			});
		}
		var hiddenRowCount = document.getElementById("RowCount");
		var rowCount = hiddenRowCount.value;
		var p = 1;
		for ( var i = 0; i < rowCount; i++) {
			var $radios = $('input:checkbox[id=checkbox' + p + ']');
			if ($radios.is(':checked') == true) {
				$("#remove" + p).remove();
			}
			p++;
		}
	} else
{
		var hiddenRowCount = document.getElementById("RowCount");
	var rowCount = hiddenRowCount.value;
	var p = 1;
	for ( var i = 0; i < rowCount; i++) {
		var $radios = $('input:checkbox[id=checkbox' + p + ']');
		if ($radios.is(':checked') == true) {
			($radios).attr("checked", false);
		}
		p++;
	}
	return false;
}

}
function createDivChart() {
	var cType = $("#cType :selected").val();
	if (cType == null || cType == "" || cType == "Select") {
		alert("Please Select Chart Name.");
	} else {
		var hiddenRowCount = document.getElementById("RowCount");
		var rowCount = hiddenRowCount.value;
		if (rowCount != 0) {
			var cname = $("#cname" + rowCount + "").val();
			if (cname == "") {
				alert("Please fill the previous added row.");
				return false;
			}
		}
		rowCount++;
		divId = "tr" + rowCount;
		var x = document.createElement('tr');
		x.setAttribute('id', divId);
		x.setAttribute('style', 'width: 100%; ');
		document.getElementById("chartAddTemp").appendChild(x);
		document.getElementById(divId).innerHTML = '<tr id="remove'
				+ rowCount
				+ '">'
				+ '<td class="col-md-1-1 center">'
				+ rowCount
				+ '.</td><td class="col-md-6-1 center"><input type="text" style="width: 80%" value="" id="cname'
				+ rowCount
				+ '"></td>'
				+ '<td class="col-md-4-1 center"><input type="text" value=""'
				+ 'maxlength="6" onkeypress="return validateNumbers(event)" id="fee'
				+ rowCount + '"' + 'style="width: 75%"></td>'
				+ '<td class="col-md-1-1 center"><input type="checkbox" id="checkbox'+ rowCount +'" name="checkbox' + rowCount + '" value="0"></td>'
				+ '<input type="hidden" name="idskco' + rowCount
				+ '" id="idskco' + rowCount + '" value="0">' + '</tr>';

		$("#RowCount").val(rowCount);
		// $("#addRowCount").val(i);
		i++;

		// $(".auto").autocomplete("AutoSuggetionServlet?auto=medicine");

	}
}

function saveHospitalAccDetails() {

	var rows= $('#tblRightDiv tbody tr').length;
	var servIdsChecked=[]; 
	for(var i=1;i<=rows;i++){
		
		servIdsChecked.push($('#subbIdr' + i).val());
	}
	
	var queryType = $("#queryType").val();
	var txtIPDFee = $("#txtIPDFee").val();
	var DocRdFrmTime = $("#DocRdFrmTime").val();
	var DocRdToTime = $("#DocRdToTime").val();
	var OTFrmTime = $("#OTFrmTime").val();
	var OTToTime = $("#OTToTime").val();
	var txtOTcharge = $("#txtOTcharge").val();
	var txtOT = $("#txtOT").val();
	var txtOTEmerchrg = $("#txtOTEmerchrg").val();
	var OpEmerFrmTime = $("#OpEmerFrmTime").val();
	var OpEmerToTime = $("#OpEmerToTime").val();
	var txtPreanechrg = $("#txtPreanechrg").val();
	var txtTPAChr = $("#txtTPAChr").val();
	var hiddenHosId = $("#hiddenHosId").val();
	var txtOpEmrcharge = $("#txtOpEmrcharge").val();
	var docRCART = $("#docRCART").val();
	var aneStandby = $("#aneStandby").val();
	var aneAsa = $("#aneAsa").val();
	var aneNormal = $("#aneNormal").val();
	var astsurchrg = $("#astsurchrg").val();
	var txtTDS = $("#txtTDS").val();
	var bedHours = $("#selBedHours").val();
	
	if(bedHours == undefined){
		bedHours=0;
	}
	var typeOfBilling = $('input:radio[name="IPD_Billing_Radio"]:checked')
			.val();
	var txtChrgType = $("#txtChrgType").val();
	var txtadminChrg = $("#txtadminChrg").val();
	var emrAdmChrg = $("#txtEmrAdmChrg").val();
	var eAFrmTime = $("#SelEAFrmTime").val();
	var eAToTime = $("#SelEAToTime").val();
	var emrAdmChrgFlag = 0;
	var refDocPer = $("#refDocPer").val();
	var ppnPer = $("#ppnPer").val();
	var emrChrPer = $("#emrChrPer").val();
	var currencyId = $("#currencyId").val();
	
	
	if (txtChrgType == "") {
		alert("Please Enter Administrative Type.");
		SetFocus("txtChrgType");
		return false;

	}else if (txtadminChrg == "") {
		alert("Please Enter Administrative Charges");
		SetFocus("txtadminChrg");
		return false;

	}else if (txtChrgType == "percentage" && txtadminChrg.length > 2) {
		alert("Please Enter Administrative Charges(%) in Two Digit Only ");
		SetFocus("txtadminChrg");
		return false;

	}else if (txtChrgType == "rupee" && txtadminChrg == ""){
		alert("Please Enter Administrative Charges in Rupee(INR)");
		SetFocus("txtadminChrg");
		return false;

	}else if (txtIPDFee == "") {
		alert("Please Enter IPD Registration Fees");
		SetFocus("txtIPDFee");
		return false;

	}else if(txtIPDFee.length < 2 && txtIPDFee != "0"){
		alert("IPD Registration Fee Should Not Be Less Than 2 Characters");
		SetFocus("txtIPDFee");
		return false;
		
	}else if (DocRdFrmTime == null) {
		alert("Please Enter Doctor Round from Time.");
		SetFocus("DocRdFrmTime");
		return false;

	} else if (DocRdToTime == null ) {
		alert("Please Enter Doctor Round TO Time.");
		SetFocus("DocRdToTime");
		return false;

	}else if( DocRdFrmTime == DocRdToTime)
		{
		alert("Doctor Round From Time and To Time Should not same");
		SetFocus("DocRdToTime");
		return false;
		}
	else if (OTFrmTime == null) {
		alert("Please Enter OT From Time.");
		SetFocus("OTFrmTime");
		return false;
	} else if (OTToTime==null) {
		alert("Please Enter OT To Time");
		SetFocus("OTToTime");
		return false;

	}else if(OTFrmTime == OTToTime)
		{
		alert("Operation From Time and To Time Should not be same");
		SetFocus("OTToTime");
		return false;
		}
	
	else if (txtOTcharge == "") {
		alert("Please Select OT charges.");
		SetFocus("txtOTcharge");
		return false;

	} else if (txtOpEmrcharge == "") {
		alert("Please Select  Operation Emergency charges.");
		SetFocus("txtOpEmrcharge");
		return false;

	} else if (aneNormal == "") {
		alert("Please Enter Anaesthesia Normal.");
		SetFocus("aneNormal");
		return false;

	} else if (aneStandby == "") {
		alert("Please Enter Anaesthesia StandBy.");
		SetFocus("aneStandby");
		return false;

	} else if (txtOT == "") {
		alert("Please Enter OT charges After OT Time");
		SetFocus("txtOT");
		return false;
	} else if (txtOTEmerchrg == "") {
		alert("Please Select  OT  Emergency charges.");
		SetFocus("txtOTEmerchrg");
		return false;

	} else if (OpEmerFrmTime == null) {
		alert("Please Enter Emergency From Time.");
		SetFocus("OpEmerFrmTime");
		return false;

	} if (OpEmerToTime == null || OpEmerToTime == OpEmerFrmTime) {
		alert("Operation Emergency From Time and Emergency To Time should not be same");
		SetFocus("OpEmerToTime");
		return false;

	} else if (txtPreanechrg == "") {
		alert("Please Enter Preanaesthesia Charges.");
		SetFocus("txtPreanechrg");
		return false;

	} else if (txtTPAChr == "") {
		alert("Please Select TPA Processing Charges.");
		SetFocus("txtTPAChr");
		return false;

	} else if (docRCART == "") {
		alert("Please Enter Doctor Round Charges After Round Time.");
		SetFocus("docRCART");
		return false;

	} else if (aneAsa == "") {
		alert("Please Enter Anaesthesia ASAIV.");
		SetFocus("aneAsa");
		return false;
	} else if (typeOfBilling == "") {
		alert("Please select IPD billing type.");
		SetFocus("typeOfBilling");
		return false;
	}
	if(refDocPer == undefined || refDocPer == "" || refDocPer == null || refDocPer < 0){
		refDocPer = 0;
	}
	if(refDocPer > 100){
		alert("Doctor Percentage can not be greater than 100");
		SetFocus('refDocPer');
		return false;
		
	}

	if(ppnPer == undefined || ppnPer == "" || ppnPer == null || ppnPer < 0){
		ppnPer = 0;
	}
	if(ppnPer > 100){
		alert("PPN Percentage can not be greater than 100");
		SetFocus('ppnPer');
		return false;
		
	}
	
	if(emrChrPer == undefined || emrChrPer == "" || emrChrPer == null || emrChrPer < 0){
		emrChrPer = 0;
	}
	if(emrChrPer > 100){
		alert("Emergency Charges Percentage can not be greater than 100");
		SetFocus('emrChrPer');
		return false;
		
	}
	var DRstartTime = DocRdFrmTime.split(":");
	var DRendTime = DocRdToTime.split(":");

	var OTstartTime = OTFrmTime.split(":");
	var OTendTime = OTToTime.split(":");

	/*
	 * if (OTstartTime[0] >= OTendTime[0]) {
	 * 
	 * alert("OT Start Time Must Be Greater Than OT End Time."); return false; }
	 */

	var OpEmerstartTime = OpEmerFrmTime.split(":");
	var OpEmerendTime = OpEmerToTime.split(":");

	/*
	 * if (OpEmerstartTime[0] >= OpEmerendTime[0]) {
	 * 
	 * alert("Operation Start Time Must Be Greater Than Operation End Time.");
	 * return false; }
	 */
	var emrStartTime = eAFrmTime.split(":");
	var emrEndTime = eAToTime.split(":");
	
	
	if ($('#emrAdmChrgFlag').is(':checked')) {
		emrAdmChrgFlag = 1;
	} else {
		emrAdmChrgFlag = 0;
		emrAdmChrg = 0;
	}

	// added by vinod For : admin charges services 
	var adminServiceid = $('#adminSrv').val();
	if(adminServiceid!=null && adminServiceid!=""){
		adminServiceid = adminServiceid.toString();
	}else{
		
		adminServiceid=0;		
	}	
	
	var unitId=$("#unitId").val();			
	var userId=$("#userId").val();
	
	var prefixDetails = {
			listEhatBillPrefix : []
    };
	
	var rows= $('#billPrefixTable tbody tr.prefixClass').length;	
	for(var i=0;i<rows;i++){
		alert(rows);
		var depId=$("#depPrefix"+i).val();
		var billPrefix=$("#prefix"+i).val();
		var billMiddle=$("#middle"+i).val();			
		var billSuffix=$("#sufix"+i).val();			
		var recBillBoth=$('input[name=recBillBoth'+i+']:checked').val();
		
		setPrefixList(prefixDetails,depId,billPrefix,billMiddle,billSuffix,recBillBoth,unitId,userId);
	}	
	
	prefixDetails = JSON.stringify(prefixDetails);
	
	var adminChargesFlag = "servicewise";
	
	if($("#rdFixed").prop("checked")){
		
		adminChargesFlag = "fixed";
	}
	
	// added by vinod
	
	var inputs = [];
	inputs.push('action=saveHospitalAccDetails');
	inputs.push('idhos=' + hiddenHosId);
	inputs.push('queryType=' + queryType);
	inputs.push('txtIPDFee=' + encodeURIComponent(txtIPDFee));
	inputs.push('txtChrgType=' + encodeURIComponent(txtChrgType));
	inputs.push('txtadminChrg=' + encodeURIComponent(txtadminChrg));
	inputs.push('DocRdToTime=' + encodeURIComponent(DocRdToTime));
	inputs.push('DocRdFrmTime=' + encodeURIComponent(DocRdFrmTime));
	inputs.push('OTFrmTime=' + encodeURIComponent(OTFrmTime));
	inputs.push('OTToTime=' + encodeURIComponent(OTToTime));
	inputs.push('txtOTcharge=' + encodeURIComponent(txtOTcharge));
	inputs.push('txtOT=' + encodeURIComponent(txtOT));
	inputs.push('txtOTEmerchrg=' + encodeURIComponent(txtOTEmerchrg));
	inputs.push('OpEmerFrmTime=' + encodeURIComponent(OpEmerFrmTime));
	inputs.push('OpEmerToTime=' + encodeURIComponent(OpEmerToTime));
	inputs.push('txtPreanechrg=' + encodeURIComponent(txtPreanechrg));
	inputs.push('txtTPAChr=' + encodeURIComponent(txtTPAChr));
	inputs.push('txtOpEmrcharge=' + encodeURIComponent(txtOpEmrcharge));
	inputs.push('docRCART=' + encodeURIComponent(docRCART));
	inputs.push('aneStandby=' + encodeURIComponent(aneStandby));
	inputs.push('aneAsa=' + encodeURIComponent(aneAsa));
	inputs.push('aneNormal=' + encodeURIComponent(aneNormal));
	inputs.push('astsurchrg=' + encodeURIComponent(astsurchrg));
	inputs.push('typeOfBilling=' + encodeURIComponent(typeOfBilling));
	inputs.push('txtTDS=' + encodeURIComponent(txtTDS));
	inputs.push('bedHours=' + encodeURIComponent(bedHours));
	inputs.push('emrAdmChrg=' + encodeURIComponent(emrAdmChrg));
	inputs.push('emrStartTime=' + encodeURIComponent(eAFrmTime));
	inputs.push('emrEndTime=' + encodeURIComponent(eAToTime));
	inputs.push('emrAdmChrgFlag=' + encodeURIComponent(emrAdmChrgFlag));
	inputs.push('refDocPer=' + encodeURIComponent(refDocPer));
	inputs.push('ppnPer=' + encodeURIComponent(ppnPer));	
	// added by vinod
	inputs.push('adminServiceid=' + adminServiceid); 
	inputs.push('servIdsChecked=' + servIdsChecked);
	alert(servIdsChecked);
	inputs.push('prefixDetails=' + prefixDetails); 
	inputs.push('unitId=' + unitId);
	inputs.push('userId=' + userId);
	// added by Tarique
	inputs.push('currencyId=' + currencyId);
	inputs.push('emrChrPer=' + encodeURIComponent(emrChrPer));  // added by Tarique Aalam
	inputs.push('adminChargesFlag=' + adminChargesFlag);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			alert(r);
			location.reload();
			$("#chkPreSuf").prop("checked",false);
		}
	});
}


function saveHospitalAccDetailsNew(){	
	var rows= $('#tblRightDiv tbody tr').length;
	var servIdsChecked=[];
	$(".subserviceIds").each(function() {
		servIdsChecked.push($(this).val());
	 });	
	
	var idForHospital = $("#idForHospital").val();
	var txtIPDFee = $("#txtIPDFee").val();
	var DocRdFrmTime = $("#DocRdFrmTime").val();
	var DocRdToTime = $("#DocRdToTime").val();
	var OTFrmTime = $("#OTFrmTime").val();
	var OTToTime = $("#OTToTime").val();
	var txtOTcharge = $("#txtOTcharge").val();
	var txtOT = $("#txtOT").val();
	var txtOTEmerchrg = $("#txtOTEmerchrg").val();
	var OpEmerFrmTime = $("#OpEmerFrmTime").val();
	var OpEmerToTime = $("#OpEmerToTime").val();
	var txtPreanechrg = $("#txtPreanechrg").val();
	var txtTPAChr = $("#txtTPAChr").val();
	var hiddenHosId = $("#hiddenHosId").val();
	var txtOpEmrcharge = $("#txtOpEmrcharge").val();
	var docRCART = $("#docRCART").val();
	var aneStandby = $("#aneStandby").val();
	var aneAsa = $("#aneAsa").val();
	var aneNormal = $("#aneNormal").val();
	var astsurchrg = $("#astsurchrg").val();
	var txtTDS = $("#txtTDS").val();
	var bedHours = $("#selBedHours").val();
	
	
	if(bedHours == undefined){
		bedHours=0;
	}
	var typeOfBilling = $('input:radio[name="IPD_Billing_Radio"]:checked')
			.val();
	var txtChrgType = $("#txtChrgType").val();
	var txtadminChrg = $("#txtadminChrg").val();
	var emrAdmChrg = $("#txtEmrAdmChrg").val();
	var eAFrmTime = $("#SelEAFrmTime").val();
	var eAToTime = $("#SelEAToTime").val();
	var emrAdmChrgFlag = 0;
	var refDocPer = $("#refDocPer").val();
	var ppnPer = $("#ppnPer").val();
	var emrChrPer = $("#emrChrPer").val();
	var currencyId = $("#currencyId").val();
	
	if (txtChrgType == "") {
		alert("Please Enter Administrative Type.");
		SetFocus("txtChrgType");
		return false;

	}else if (txtadminChrg == "") {
		alert("Please Enter Administrative Charges");
		SetFocus("txtadminChrg");
		return false;

	}else if (txtChrgType == "percentage" && txtadminChrg.length > 2) {
		alert("Please Enter Administrative Charges(%) in Two Digit Only ");
		SetFocus("txtadminChrg");
		return false;

	}else if (txtChrgType == "rupee" && txtadminChrg == ""){
		alert("Please Enter Administrative Charges in Rupee(INR)");
		SetFocus("txtadminChrg");
		return false;

	}else if (txtIPDFee == "") {
		alert("Please Enter IPD Registration Fees");
		SetFocus("txtIPDFee");
		return false;

	}else if(txtIPDFee.length < 2 && txtIPDFee != "0"){
		alert("IPD Registration Fee Should Not Be Less Than 2 Characters");
		SetFocus("txtIPDFee");
		return false;
		
	}else if (DocRdFrmTime == null) {
		alert("Please Enter Doctor Round from Time.");
		SetFocus("DocRdFrmTime");
		return false;

	} else if (DocRdToTime == null ) {
		alert("Please Enter Doctor Round TO Time.");
		SetFocus("DocRdToTime");
		return false;

	}else if( DocRdFrmTime == DocRdToTime)
		{
		alert("Doctor Round From Time and To Time Should not same");
		SetFocus("DocRdToTime");
		return false;
		}
	else if (OTFrmTime == null) {
		alert("Please Enter OT From Time.");
		SetFocus("OTFrmTime");
		return false;
	} else if (OTToTime==null) {
		alert("Please Enter OT To Time");
		SetFocus("OTToTime");
		return false;

	}else if(OTFrmTime == OTToTime)
		{
		alert("Operation From Time and To Time Should not be same");
		SetFocus("OTToTime");
		return false;
		}
	
	else if (txtOTcharge == "") {
		alert("Please Select OT charges.");
		SetFocus("txtOTcharge");
		return false;

	} else if (txtOpEmrcharge == "") {
		alert("Please Select  Operation Emergency charges.");
		SetFocus("txtOpEmrcharge");
		return false;

	} else if (aneNormal == "") {
		alert("Please Enter Anaesthesia Normal.");
		SetFocus("aneNormal");
		return false;

	} else if (aneStandby == "") {
		alert("Please Enter Anaesthesia StandBy.");
		SetFocus("aneStandby");
		return false;

	} else if (txtOT == "") {
		alert("Please Enter OT charges After OT Time");
		SetFocus("txtOT");
		return false;
	} else if (txtOTEmerchrg == "") {
		alert("Please Select  OT  Emergency charges.");
		SetFocus("txtOTEmerchrg");
		return false;

	} else if (OpEmerFrmTime == null) {
		alert("Please Enter Emergency From Time.");
		SetFocus("OpEmerFrmTime");
		return false;

	} if (OpEmerToTime == null || OpEmerToTime == OpEmerFrmTime) {
		alert("Operation Emergency From Time and Emergency To Time should not be same");
		SetFocus("OpEmerToTime");
		return false;

	} else if (txtPreanechrg == "") {
		alert("Please Enter Preanaesthesia Charges.");
		SetFocus("txtPreanechrg");
		return false;

	} else if (txtTPAChr == "") {
		alert("Please Select TPA Processing Charges.");
		SetFocus("txtTPAChr");
		return false;

	} else if (docRCART == "") {
		alert("Please Enter Doctor Round Charges After Round Time.");
		SetFocus("docRCART");
		return false;

	} else if (aneAsa == "") {
		alert("Please Enter Anaesthesia ASAIV.");
		SetFocus("aneAsa");
		return false;
	} else if (typeOfBilling == "") {
		alert("Please select IPD billing type.");
		SetFocus("typeOfBilling");
		return false;
	}
	if(refDocPer == undefined || refDocPer == "" || refDocPer == null || refDocPer < 0){
		refDocPer = 0;
	}
	if(refDocPer > 100){
		alert("Doctor Percentage can not be greater than 100");
		SetFocus('refDocPer');
		return false;
		
	}

	if(ppnPer == undefined || ppnPer == "" || ppnPer == null || ppnPer < 0){
		ppnPer = 0;
	}
	if(ppnPer > 100){
		alert("PPN Percentage can not be greater than 100");
		SetFocus('ppnPer');
		return false;
		
	}
	
	if(emrChrPer == undefined || emrChrPer == "" || emrChrPer == null || emrChrPer < 0){
		emrChrPer = 0;
	}
	if(emrChrPer > 100){
		alert("Emergency Charges Percentage can not be greater than 100");
		SetFocus('emrChrPer');
		return false;
		
	}
	var DRstartTime = DocRdFrmTime.split(":");
	var DRendTime = DocRdToTime.split(":");

	var OTstartTime = OTFrmTime.split(":");
	var OTendTime = OTToTime.split(":");


	var OpEmerstartTime = OpEmerFrmTime.split(":");
	var OpEmerendTime = OpEmerToTime.split(":");

	
	var emrStartTime = eAFrmTime.split(":");
	var emrEndTime = eAToTime.split(":");
	
	
	if ($('#emrAdmChrgFlag').is(':checked')) {
		emrAdmChrgFlag = 1;
	} else {
		emrAdmChrgFlag = 0;
		emrAdmChrg = 0;
	}

	// added by vinod For : admin charges services 
	var adminServiceid = $('#adminSrv').val();
	if(adminServiceid!=null && adminServiceid!=""){
		adminServiceid = adminServiceid.toString();
	}else{
		
		adminServiceid=0;		
	}	
	
	var unitId=$("#unitId").val();			
	var userId=$("#userId").val();
	
	var prefixDetails = {
			listEhatBillPrefix : []
    };
	
	var rows= $('#billPrefixTable tbody tr.prefixClass').length;	
	for(var i=0;i<rows;i++){
		var depId=$("#depPrefix"+i).val();
		var billPrefix=$("#prefix"+i).val();
		var billMiddle=$("#middle"+i).val();			
		var billSuffix=$("#sufix"+i).val();			
		var recBillBoth=$('input[name=recBillBoth'+i+']:checked').val();
		
		setPrefixList(prefixDetails,depId,billPrefix,billMiddle,billSuffix,recBillBoth,unitId,userId);
	}	
	
	prefixDetails = JSON.stringify(prefixDetails);
	
	
	
	var adminChargesFlag = "servicewise";
	
	if($("#rdFixed").prop("checked")){
		
		adminChargesFlag = "fixed";
	}
	
var hospitalUnitId = $("#hInfoUnitId").val();
	
	if(hospitalUnitId == 0 || hospitalUnitId === undefined || hospitalUnitId === "undefined" || hospitalUnitId== null || hospitalUnitId === "null"){
		alertify.error("Please Select Unit First..!");
		return false;
	}
	// added by vinod
	
	var inputs = [];
    inputs.push('idhospitalAccInfo=' + idForHospital);
	inputs.push('idhos=' + 1);
	inputs.push('IPDFee=' + encodeURIComponent(txtIPDFee));
	inputs.push('ChrgType=' + encodeURIComponent(txtChrgType));
	inputs.push('adminChrg=' + encodeURIComponent(txtadminChrg));
	inputs.push('DocRdToTime=' + encodeURIComponent(DocRdToTime));
	inputs.push('DocRdFrmTime=' + encodeURIComponent(DocRdFrmTime));
	inputs.push('OTFrmTime=' + encodeURIComponent(OTFrmTime));
	inputs.push('OTToTime=' + encodeURIComponent(OTToTime));
	inputs.push('OTcharge=' + encodeURIComponent(txtOTcharge));
	inputs.push('OTafterOTtime=' + encodeURIComponent(txtOT));
	inputs.push('OTEmerchrg=' + encodeURIComponent(txtOTEmerchrg));
	inputs.push('OpEmerFrmTime=' + encodeURIComponent(OpEmerFrmTime));
	inputs.push('OpEmerToTime=' + encodeURIComponent(OpEmerToTime));
	inputs.push('Preanechrg=' + encodeURIComponent(txtPreanechrg));
	inputs.push('TPAChr=' + encodeURIComponent(txtTPAChr));
	inputs.push('operationEmergencyCharges=' + encodeURIComponent(txtOpEmrcharge));
	inputs.push('doctorRoundChargesAfterRoundTime=' + encodeURIComponent(docRCART));
	inputs.push('AneStandBy=' + encodeURIComponent(aneStandby));
	inputs.push('AneAsaIv=' + encodeURIComponent(aneAsa));
	inputs.push('AneNormal=' + encodeURIComponent(aneNormal));
	inputs.push('AstSurgeonChrg=' + encodeURIComponent(astsurchrg));
	inputs.push('typeOfBilling=' + encodeURIComponent(typeOfBilling));
	inputs.push('TDS=' + encodeURIComponent(txtTDS));
	inputs.push('bedHours=' + encodeURIComponent(bedHours));
	inputs.push('emrAdmChrg=' + encodeURIComponent(emrAdmChrg));
	inputs.push('emrStartTime=' + encodeURIComponent(eAFrmTime));
	inputs.push('emrEndTime=' + encodeURIComponent(eAToTime));
	inputs.push('emrAdmChrgFlag=' + encodeURIComponent(emrAdmChrgFlag));
	inputs.push('refDocPer=' + encodeURIComponent(refDocPer));
	inputs.push('ppnPer=' + encodeURIComponent(ppnPer));	
	// added by vinod
	inputs.push('adminServiceid=' + adminServiceid); 
	inputs.push('adminSubServiceid=' + servIdsChecked);
	///alert(servIdsChecked);
	inputs.push('prefixDetails=' + prefixDetails); 

	// added by Tarique
	inputs.push('currencyId=' + currencyId);
	inputs.push('emrChrPer=' + encodeURIComponent(emrChrPer));  // added by Tarique Aalam
	inputs.push('adminChargesFlag=' + adminChargesFlag);
	inputs.push('hospitalUnitId=' + hospitalUnitId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/adminForHosacc/hosAccDetails",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alertify.error("Network Issue");
		},
		success : function(r) {
			alertify.success(r);
			
			//$("#chkPreSuf").prop("checked",false);
			getAllUnitForHospitalAccountInfo();
		}
	});
}


function setPrefixList(prefixDetails,depId,billPrefix,billMiddle,billSuffix,billRecBoth,unitId,userId){
	
	prefixDetails.listEhatBillPrefix.push({
		depId	  	: depId,
		billPrefix	: billPrefix,
		billMiddle	: billMiddle,
		billSuffix 	: billSuffix,
		billRecBoth : billRecBoth,
		unitId		: unitId,
		createdBy	: userId
    });
}

function fetchHospitalAccDetails() {

	var sid = $("#sid").val();
	if (!sid) {
		sid = 0;
	}
	var inputs = [];
	inputs.push('action=fetchHospitalAccDetails');
	inputs.push('corporateId=' + sid);
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
			
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pobj1.listHosAccDetail.length > 0) {
				$("#queryType").val('update');
				$("#txtIPDFee").val(pobj1.listHosAccDetail[0].IPD);
				if (pobj1.listHosAccDetail[0].IPD == '0') {
					$("#txtIPDFee").val('0');
				}
				
				$("#idForHospital").val(pobj1.listHosAccDetail[0].idhosacc);
		
				$("#txtadminChrg").val(pobj1.listHosAccDetail[0].adminchr);
				$("#txtChrgType").val(pobj1.listHosAccDetail[0].ChrgType);
				$("#DocRdToTime").val(pobj1.listHosAccDetail[0].drdto);
				$("#DocRdFrmTime").val(pobj1.listHosAccDetail[0].drdfrm);
				$("#OTFrmTime").val(pobj1.listHosAccDetail[0].otfrm);
				$("#OTToTime").val(pobj1.listHosAccDetail[0].otto);
				$("#txtOTcharge").val(pobj1.listHosAccDetail[0].otchr);
				$("#txtOT").val(pobj1.listHosAccDetail[0].otafter);
				$("#txtOTEmerchrg").val(pobj1.listHosAccDetail[0].otemr);
				$("#OpEmerFrmTime").val(pobj1.listHosAccDetail[0].opemrfrm);
				$("#OpEmerToTime").val(pobj1.listHosAccDetail[0].opemrto);
				$("#txtPreanechrg").val(pobj1.listHosAccDetail[0].preane);
				$("#txtTPAChr").val(pobj1.listHosAccDetail[0].TPAchr);
				$("#txtOpEmrcharge").val(pobj1.listHosAccDetail[0].opEmrChr);
				$("#docRCART").val(pobj1.listHosAccDetail[0].drRoundChr);
				$("#aneStandby").val(pobj1.listHosAccDetail[0].anestand);
				$("#aneAsa").val(pobj1.listHosAccDetail[0].aneasa);
				$("#aneNormal").val(pobj1.listHosAccDetail[0].anenor);
				$("#astsurchrg").val(pobj1.listHosAccDetail[0].asschrg);
				$("#txtTDS").val(pobj1.listHosAccDetail[0].TDS);
				$("#selBedHours").val(pobj1.listHosAccDetail[0].bedHours);
				$("#txtEmrAdmChrg").val(pobj1.listHosAccDetail[0].emrAdmChrg);
				$("#SelEAFrmTime").val(pobj1.listHosAccDetail[0].emrStartTime);
				$("#SelEAToTime").val(pobj1.listHosAccDetail[0].emrEndTime);
				$("#refDocPer").val(pobj1.listHosAccDetail[0].refDocPer);
				$("#ppnPer").val(pobj1.listHosAccDetail[0].ppnPer);
				$("#currencyId").val(pobj1.listHosAccDetail[0].currencyId);
				$("#emrChrPer").val(pobj1.listHosAccDetail[0].emrChrPer);
				
				if (pobj1.listHosAccDetail[0].emrAdmChrgFlag == 1) {
					$('#emrAdmChrgFlag').attr('checked', 'checked');
				}
				
				
				if(sid > 0){
				$("#txtAsstSurCharges").val(pobj1.listHosAccDetail[0].asschrg);
				}
				var ipd_billing = pobj1.listHosAccDetail[0].typeOfBilling;
				if (ipd_billing == 'A') {
					$('#radioAuto').attr('checked', true);
				} else {
					$('#radioManual').attr('checked', true);
				}
				
				var adminChargesFlag = pobj1.listHosAccDetail[0].adminChargesFlag;
				if (adminChargesFlag == 'fixed') {
					$('#rdFixed').attr('checked', true);
				} else {
					$('#rdservicewise').attr('checked', true);
				}				
								
				// added by viniod
				var mulAdmServiceArry = [];
				if(pobj1.listHosAccDetail[0].adminServiceid!=null && pobj1.listHosAccDetail[0].adminServiceid!=""){
					var mulServiceID=pobj1.listHosAccDetail[0].adminServiceid.split(",");
					for(var i=0;i<mulServiceID.length;i++){
						mulAdmServiceArry.push(mulServiceID[i]);
					}
				}	
				$('#adminSrv').select2('val', mulAdmServiceArry);
					
				setTimeout(function(){
					
					setSubServices(pobj1.listHosAccDetail[0].adminSubServiceid);
					
				}, 2000);
				
								
				/*var depForSufix=pobj1.listHosAccDetail[0].depForSufix;
				
				if(depForSufix!=null && depForSufix!=""){
					var mulDepID=depForSufix.split(",");
					for(var i=0;i<mulDepID.length;i++){
						
						if(mulDepID[i]==0){
							
							$('#all').prop('checked', true);							
						}else if(mulDepID[i]==1){
							
							$('#opd').prop('checked', true);	
						}else if(mulDepID[i]==2){
							
							$('#ipd').prop('checked', true);	
						}else if(mulDepID[i]==3){
							
							$('#diag').prop('checked', true);	
						}
					}
				}				
				
				$("#billPrefix").val(pobj1.listHosAccDetail[0].billPrefix);
				$("#billMiddle").val(pobj1.listHosAccDetail[0].billMiddle);
				$("#billSufix").val(pobj1.listHosAccDetail[0].billSufix);*/
				
				setPreviousBillPrefix(pobj1);
				
				// added by viniod
			}
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 06-March-2018
* @codeFor	: Set Admin Saved SubServices
 ************/
function setSubServices(subIds){
	
	// added by viniod	
	var subServiceID=subIds.split(",");
	for(var i=0; i < subServiceID.length;i++){
		
		var inpId=$("input[class$='"+subServiceID[i]+"']").attr("id");			
		$("#"+inpId).trigger('click');	
	}	
	//
}

function setPreviousBillPrefix(res){
	
	var len=res.listHosAccDetail[0].listEhatBillPrefix.length;
	var tbody="";
	
	for(var i=0;i<len;i++){
	
		tbody=tbody	
		
		+ " <tr class='prefixClass' id='prefixTr"+i+"'> "
		+ " <td class='center' style='width:15%'> "
		+ " 	<select id='depPrefix"+i+"' class='form-control input-SmallText'> "
		+ " 		<option value='0'>All</option> "
		+ " 		<option value='1'>Opd</option> "
		+ " 		<option value='2'>Ipd</option> "
		+ " 		<option value='3'>Diag</option> "
		+ " 		<option value='4'>Reg No</option> "
		+ " 	</select> "
		+ " </td> "
		+ " <td class='center' style='width:20%'><input type='text' id='prefix"+i+"' value='"+res.listHosAccDetail[0].listEhatBillPrefix[i].billPrefix+"'/></td> "
		+ " <td class='center' style='width:20%'><input type='text' id='middle"+i+"' value='"+res.listHosAccDetail[0].listEhatBillPrefix[i].billMiddle+"'/></td> "															
		+ " <td class='center' style='width:20%'><input type='text' id='sufix"+i+"' value='"+res.listHosAccDetail[0].listEhatBillPrefix[i].billSuffix+"'/></td> "
		+ " <td class='center' style='width:25%'> "
		
		+ " <div class='form-group' style='margin-top: 8%'> " 
		+ " 	<div class='col-md-12'> "	 												
		+ " 		<div class='row' id='input-type'> "
		+ " 			<div class='col-sm-4'> "
		+ " 				<label class='radio-inline'> Bill  "
		+ " 				<input type='radio' class='radio' value='1' name='recBillBoth"+i+"' id='recNo"+i+"'/>  "
		+ " 				</label>  "
		+ " 			</div>  "
					
		+ " 			<div class='col-sm-4'>  "
		+ " 				<label class='radio-inline'> Rec   "
		+ " 				<input type='radio' class='radio' value='2' name='recBillBoth"+i+"' id='billNo"+i+"'/> "
		+ " 				</label> "
		+ " 			</div> "		
					
		+ " 			<div class='col-sm-4'>  "
		+ " 				<label class='radio-inline'> Both "
		+ " 					<input type='radio' class='radio' value='3' name='recBillBoth"+i+"' id='both"+i+"'/> "
		+ "   				</label> "
		+ " 			</div> "											 
		+ " 		</div>  "
		+ " 	</div>  "
		+ " </div> "
		
		
		/*+ " 	<input type='radio' class='radio' value='1' name='recBillBoth"+i+"' id='recNo"+i+"'/>Bill "
		+ " 	<input type='radio' class='radio' value='2' name='recBillBoth"+i+"' id='billNo"+i+"'/>Rec "
		+ " 	<input type='radio' class='radio' value='3' name='recBillBoth"+i+"' id='both"+i+"'/>Both "*/
		+ " </td> "																														
		+ " </tr> ";	
	}	
	
	$("#billPrefixTbody").html(tbody);
	
	for(var i=0;i<len;i++){
		
		$('#depPrefix'+i).val(res.listHosAccDetail[0].listEhatBillPrefix[i].depId);		
		$('input:radio[value='+res.listHosAccDetail[0].listEhatBillPrefix[i].billRecBoth+'][name=recBillBoth'+i+']').prop('checked', true);
	}
}

function saveChartSlave() {

	var cType = $("#cType :selected").val();

	var pobj = $("#divPatId").html();
	pobj1 = eval('(' + pobj + ')');

	//var tid = pobj1.trid;
	var tid=$("#tr_Id").val();//added by paras
	
	var Response = $("#chartObj").html();
	if (cType != "NursingChart") {
		var ajaxRes = eval('(' + Response + ')');
		var i = 1;
		for (i = 0; i < ajaxRes.listReport.length; i++) {

			ajaxRes.listReport[i].am1 = $("#1am" + (i + 1)).val();
			ajaxRes.listReport[i].am2 = $("#2am" + (i + 1)).val();
			ajaxRes.listReport[i].am3 = $("#3am" + (i + 1)).val();
			ajaxRes.listReport[i].am4 = $("#4am" + (i + 1)).val();
			ajaxRes.listReport[i].am5 = $("#5am" + (i + 1)).val();
			ajaxRes.listReport[i].am6 = $("#6am" + (i + 1)).val();
			ajaxRes.listReport[i].am7 = $("#7am" + (i + 1)).val();
			ajaxRes.listReport[i].am8 = $("#8am" + (i + 1)).val();
			ajaxRes.listReport[i].am9 = $("#9am" + (i + 1)).val();
			ajaxRes.listReport[i].am10 = $("#10am" + (i + 1)).val();
			ajaxRes.listReport[i].am11 = $("#11am" + (i + 1)).val();
			ajaxRes.listReport[i].am12 = $("#12am" + (i + 1)).val();

			ajaxRes.listReport[i].pm1 = $("#1pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm2 = $("#2pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm3 = $("#3pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm4 = $("#4pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm5 = $("#5pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm6 = $("#6pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm7 = $("#7pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm8 = $("#8pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm9 = $("#9pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm10 = $("#10pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm11 = $("#11pm" + (i + 1)).val();
			ajaxRes.listReport[i].pm12 = $("#12pm" + (i + 1)).val();
			ajaxRes.listReport[i].ti = tid;
			ajaxRes.listReport[i].dt = $("#date-pick").val();

		}

		ajaxRes = JSON.stringify(ajaxRes);

		var inputs = [];
		inputs.push('action=saveChartReport');
		inputs.push('ajaxRes=' + encodeURIComponent(ajaxRes));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			success : function(ajaxResponse) {
				alert("Data Saved Successfully");
			}
		});

	} else {

		var tid = $("#tid").html();
		var rowCount = $("#RowCount").val();
		var i = 0;
		var inputs = [];

		var ItemString = "";
		for (i = 1; i <= rowCount; i++) {
			count++;

			var time = $("#time" + i + "").val();
			var id = $("#id" + i + "").val();
			var dose = $("#dose" + i + "").val();
			var nameOfDrug = $("#nameOfDrug" + i + "").val();
			var strength = $("#strength" + i + "").val();
			// var sign = $("#sign" + i + "").val();
			var sign = document.getElementById('sign' + i).innerHTML;

			var UserId = $("#txtUserId").val();

			var date = $("#date-pick").val();

			/*
			 * ItemString = ItemString + "@" + time + "," + id + "," + dose +
			 * "," + nameOfDrug + "," + sign + "," + strength + "," + date;
			 */
			ItemString = ItemString + "@" + time + "," + id + "," + dose + ","
					+ nameOfDrug + "," + UserId + "," + strength + "," + date;

		}
		inputs.push('action=saveNursingChart');
		inputs.push('tid=' + tid);
		inputs.push('ItemString=' + encodeURIComponent(ItemString));
		inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			success : function(ajaxResponse) {
				alert("Data Saved Successfully");
				window.location.reload();
			}
		});
	}
}

// *********Code for Customize Template***************************
var fetchCustomizeTemplateListAdmin = "<option value='0' onclick='setNewCustomizeTemp()'>NewTemplate</option>{#foreach $T.pattemplist as pattemplist}<option onclick='setCustomizeTemplate({$T.pattemplist.idpattemp})' value={$T.pattemplist.idpattemp} >{$T.pattemplist.tempname}</option>{#/for}";
var fetchCustomizeTemp = "<option value='0' onclick=''>SELECT</option>"
	+ "{#foreach $T.pattemplist as pattemplist}"
	+ "<option onclick='setCustomizeTemplate({$T.pattemplist.idpattemp})' value={$T.pattemplist.idpattemp} >{$T.pattemplist.tempname}</option>"
	+ "{#/for}";

var fetchCustomizeTemplateListipdConsentForm = "<option value='0' onclick='setNewCustomizeTempIPDDischargeConsent()'>SELECT</option>"
	+ "{#foreach $T.pattemplist as pattemplist}{#if $T.pattemplist.type=='c' || $T.pattemplist.type=='s' || $T.pattemplist.type=='t' || $T.pattemplist.type=='f'}"
	+ "<option onclick='setCustomizeTemplate({$T.pattemplist.idpattemp})' value={$T.pattemplist.idpattemp} >{$T.pattemplist.tempname}</option>"
	+ "{#/if}{#/for}";

var fetchCustomizeTemplateListRadiationConsentForm = "<option value='0' onclick='setNewCustomizeTempRadiationConsent()'>SELECT</option>"
	+ "{#foreach $T.pattemplist as pattemplist}{#if $T.pattemplist.type=='c'}"
	+ "<option onclick='setCustomizeTemplate({$T.pattemplist.idpattemp})' value={$T.pattemplist.idpattemp} >{$T.pattemplist.tempname}</option>"
	+ "{#/if}{#/for}";

var fetchCustomizeTemplateListipdDischarge = "<option value='0' onclick='setNewCustomizeTempIPDDischargeConsent()'>SELECT</option>"
	+ "{#foreach $T.pattemplist as pattemplist}{#if $T.pattemplist.type=='d'}"
	+ "<option onclick='setCustomizeTemplate({$T.pattemplist.idpattemp})' value={$T.pattemplist.idpattemp} >{$T.pattemplist.tempname}</option>"
	+ "{#/if}{#/for}";

var fetchCustomizeTemplateManageOT = "<option value='0'>SELECT</option>"
	+ "{#foreach $T.pattemplist as pattemplist}{#if $T.pattemplist.type=='o'}"
	+ "<option onclick='setCustomizeTemplate({$T.pattemplist.idpattemp})' value={$T.pattemplist.idpattemp} >{$T.pattemplist.tempname}</option>"
	+ "{#/if}{#/for}";


/** *get Patient DischargeDate*****@author husenbadshah*** */
function getPatientDischargeDateTemplatewise()
{
	$("#discharge_date_note").val("");
	$("#discharge_Time_note").val("");
	var patID = $("#pid").val();
	var treatID = $("#treatmentId").val();
	var inputs = [];
	inputs.push('action=getPatientDischargeDate');
	inputs.push('patient_id=' + patID);
	inputs.push('TreamentID=' + treatID);
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

			var DischargeDate = JSON.parse(r);
			if(DischargeDate.adminchargelist.length > 0)
				{
				var dischargedate = DischargeDate.adminchargelist[0].dischargedate;
				var discharge_type = DischargeDate.adminchargelist[0].discharge_type;

				if(discharge_type != "")
				{
					$("#discharge_Type").val(discharge_type);
				} else if(discharge_type == "" || discharge_type == undefined ){
					
					$("#discharge_Type").text('select');
				}
				
				if(dischargedate != "null_null" && dischargedate !="" )
					{
					var newDate1 = dischargedate.split("_");
					var date = newDate1[0];
					var time = newDate1[1];
		 
					var cal_date = date.split("-");
					var mydate = cal_date[2]+"/"+cal_date[1]+"/"+cal_date[0];
					$("#discharge_date_note").val(mydate);
					var cal_time = time.split(":");
					var mytime = cal_time[0]+":"+cal_time[1];
					$("#discharge_Time_note").val(mytime);
					}
				else{
					$("#discharge_date_note").val("");
					$("#discharge_Time_note").val("");
				}
			}
		}
	});
}

function fetchCustomizeTemplateList() {
	var pageName = $("#pageName").val();

	var inputs = [];
	//inputs.push('action=fetchCustomizeTemplateList');
	 inputs.push('departmentId=' + 2);
	 inputs.push('selectTemplateType=' + 'o');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchCustomizeTemplateList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;

			$("#customizeTemplateDiv").html(encodeURIComponent(ajaxResponse));
			var obj =  ajaxResponse ;
			if (pageName == "Admin") {
				//$("#selCustomizeTemp").setTemplate(fetchCustomizeTemplateListAdmin);
			} else if (pageName == "ipdConsentForm") {
				$("#selCustomizeTempselCustomizeTemp").setTemplate(fetchCustomizeTemplateListipdConsentForm);
			}  else if (pageName == "RadiationConsentForm") {
				$("#selCustomizeTemp").setTemplate(fetchCustomizeTemplateListRadiationConsentForm);
			} else if (pageName == "ipdDischarge") {
				$("#selCustomizeTemp").setTemplate(fetchCustomizeTemplateListipdDischarge);
			} else if (pageName == "OTOperationManage" || pageName == "OTOperationAction" || pageName == "OTAnaestheticAssess" || pageName == "operation") {
				$("#selCustomizeTemp").setTemplate(fetchCustomizeTemplateManageOT);
			} else if (pageName == "ipdDischargeSummary") {
				$("#selTempWiseSummary").setTemplate(fetchCustomizeTemplateListipdDischarge);
				$("#selTempWiseSummary").processTemplate(obj);
			} else {
				$("#selCustomizeTemp").setTemplate(fetchCustomizeTemp);
			}
			
			$("#selCustomizeTemp").processTemplate(obj); 
		}
	});
}

var RisListTemplate = "<option value='0' onclick='setNewCustomizeTemp()'>NewTemplate</option>{#foreach $T.RTList as pattemplist}<option onclick='setCustomizeTemplate({$T.pattemplist.idpattemp})'	value={$T.pattemplist.ReadioID}>{$T.pattemplist.TempName}</option>{#/for}";

function fetchRisTestList()
{
	var inputs = [];
	inputs.push('action=fetchRisTestList');
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

		$("#risObject").html(ajaxResponse);
			var obj = eval('(' + ajaxResponse + ')');
			$("#selRisTempList").setTemplate(RisListTemplate);
			$("#selRisTempList").processTemplate(obj);
		}
	});
}

function setNewCustomizeTempIPDDischargeConsent() {
	// $("#selCustomizeTemp").val("0");
	$("#queryTypeicf").val("insert");
	$("#idipdConsentForm").val("0");
	$("#customizeTemplateName").val("");
	CKEDITOR.instances['editor1'].setData("");
}

function setNewCustomizeTempRadiationConsent() {

	$("#queryTypeicf").val("insert");
	$("#consentFormId").val("0");
	$("#customizeTemplateName").val("");
	CKEDITOR.instances['editor1'].setData("");
}

function setNewCustomizeTemp() {
	$("#queryType").val("insert");
	$("#updateTempId").val("0");
	$("#selCustomizeTempType").val("Select");
	$("#selDocSpec").val("");
	$("#customizeTemplateName").val("");
	
	CKEDITOR.instances['editor1'].setData("");
	CKEDITOR.instances['editorSubjective'].setData("");
	CKEDITOR.instances['editorObjective'].setData("");
}

function setCustomizeTemplate(templateId) {
	$("#queryType").val("update");
	$('#ipdFlag').attr("checked", false);
	$('#opdFlag').attr("checked", false);
	var ajaxResponse = $("#customizeTemplateDiv").html();

	ajaxResponse = decodeURIComponent(ajaxResponse);
	//alert(ajaxResponse);
	var myArray = eval('(' + ajaxResponse + ')');
	// myArray = JSON.parse(ajaxResponse);
	for ( var i = 0; i < myArray.pattemplist	.length; i++) {
		if (myArray.pattemplist[i].tempNameId == templateId) {
			myObj = myArray.pattemplist[i];
			break;

		}
	}
	// myObj = JSON.stringify(myObj);
	// myObj = eval('(' + myObj + ')');
	var hisType = myObj.hitoryType;
	if (myObj.type == "h") {
		$('#tempHistDiv').show();
		$('#move').hide();
		$('#historyTemp').show();
		$("#selCustomizeTempType").val(myObj.type);
		$("#updateTempId").val(templateId);
		$("#customizeTemplateName").val(myObj.temp_name);
		$("#selDocSpec").val(myObj.specialization);
		// $("#selCustomizeTempSubType").val(myObj.hitoryType);
		CKEDITOR.instances['editorSubjective'].setData(myObj.temp_data);
		CKEDITOR.instances['editorObjective'].setData(myObj.objectiveTempData);
	} else { 
		$('#tempHistDiv').hide();
		$('#historyTemp').hide();
		$('#move').show();
		$("#selCustomizeTempType").val(myObj.type);
		$("#updateTempId").val(templateId);
		$("#customizeTemplateName").val(myObj.tempname);
		CKEDITOR.instances['editor1'].setData(myObj.tempdata);
	}
	var flag = myObj.ioflg;
	if (flag == "ipd#opd") {
		$('#ipdFlag').attr("checked", true);
		$('#opdFlag').attr("checked", true);
	} else if (flag == "ipd") {
		$('#ipdFlag').attr("checked", true);
	} else if (flag == "opd") {
		$('#opdFlag').attr("checked", true);
	}
	var pageName = $("#pageName").val();
	if (pageName == "ipdConsentForm") {
		$("#queryTypeicf").val("insert");
		$("#idipdConsentForm").val("0");
	} else if(pageName == "RadiationConsentForm"){
		$("#queryTypeicf").val("insert");
		$("#consentFormId").val("0");
	}
	
}

var TemplateRISList = "{#foreach $T.RTList as pattemplist}<option onclick='setRadioTemplate({$T.pattemplist.ReadioID})'	value={$T.pattemplist.ReadioID}>{$T.pattemplist.TempName}</option>{#/for}";

function setRadiologyTemplate(templateId)
{
	var inputs = [];
	inputs.push('action=fetchRisType');
	inputs.push('ID='+templateId);
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
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#rislistobject").html(ajaxResponse);
			
			$("#risTempList").setTemplate(TemplateRISList);
			$("#risTempList").processTemplate(pobj1);
		}
	});
}

function setRadioTemplate(ID)
{
	
	var id = ID;
	response = $("#rislistobject").html();
	// ajaxResponse = decodeURIComponent(response);
	
	var myArray = eval('('+ajaxResponse+')');
	
	for (var i = 0; i < myArray.RTList.length; i++) 
	{
		if (myArray.RTList[i].ReadioID == id) 
		{
			myObj = myArray.RTList[i];
			break;
		}
}
	CKEDITOR.instances['Riseditor1'].setData( myObj.TempData );
	
	$("#TempID").html(ID);
	
}

function saveCustomizeTemplate(Type) {
	var queryType;
	if(Type == "RIS")
		{
		 queryType = $("#qurType").val();
		}else
		{
			queryType = $("#queryType").val();
		}
	var templateName = $("#customizeTemplateName").val();
	var selCustomizeTempType = $('#selCustomizeTempType').val();
	var templateData = "";
	var objectiveTempData = "";
	var selDocSpec = "";
	var dietflag='N';
	var ipd_opd_flag = "";
	
	if($("#dietflag").attr('checked')){
		
		if (selCustomizeTempType == "h") {
			selDocSpec = $('#selDocSpec').val();
			
			templateData = CKEDITOR.instances['editorSubjective'].getData();
			objectiveTempData = CKEDITOR.instances['editorObjective'].getData();
		} else {
			templateData = CKEDITOR.instances['editor1'].getData();
		}

		

		if ($("#ipdFlag").attr('checked') && $("#opdFlag").attr('checked') &&  $("#mortflag").attr('checked')) {
			ipd_opd_flag = "ipd#opd";
		} else if ($("#opdFlag").attr('checked')) {
			ipd_opd_flag = "opd";
		} else if ($("#ipdFlag").attr('checked')) {
			ipd_opd_flag = "ipd";
		} else if ($("#mortflag").attr('checked')) {
			//alert("mortuary    ++++++");
			ipd_opd_flag = "morturay";
			
		}
		
		
			dietflag='Y';
			ipd_opd_flag='diet';
		
		
	}else{
		
		
		if(selCustomizeTempType == "Select"){
			alert("Please select Template Type");
			return false;
		} else if (templateName == "") {
			alert("Please Enter Template Name");
			return false;
		}

		

		if (selCustomizeTempType == "h") {
			selDocSpec = $('#selDocSpec').val();
			if (selDocSpec == "") {
				alert("Please select Specilaization");
				return;
			}
			templateData = CKEDITOR.instances['editorSubjective'].getData();
			objectiveTempData = CKEDITOR.instances['editorObjective'].getData();
		} else {
			templateData = CKEDITOR.instances['editor1'].getData();
		}

		

		if ($("#ipdFlag").attr('checked') && $("#opdFlag").attr('checked') && $("#mortflag").attr('checked') ) {
			ipd_opd_flag = "ipd#opd";
		} else if ($("#opdFlag").attr('checked')) {
			ipd_opd_flag = "opd";
		} else if ($("#ipdFlag").attr('checked')) {
			ipd_opd_flag = "ipd";
		}else if ($("#mortflag").attr('checked')) {
			//alert("mortuary    ---------");
			ipd_opd_flag = "morturay";
			
		}
		
		
			dietflag='N';
		
	}
	
	
	var idCustomizeTemplate = "0";
	if (queryType == "update") {
		idCustomizeTemplate = $("#updateTempId").val();
	}

	var inputs = [];
	inputs.push('action=saveCustomizeTemplate');
	inputs.push('queryType=' + queryType);
	inputs.push('idCustomizeTemplate=' + idCustomizeTemplate);
	inputs.push('templateName=' + templateName);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('objectiveTempData=' + encodeURIComponent(objectiveTempData));
	inputs.push('selCustomizeTempType=' + selCustomizeTempType);
	inputs.push('selDocSpec=' + encodeURIComponent(selDocSpec));
	inputs.push('ipd_opd_flag=' + ipd_opd_flag);
	inputs.push('type=' + Type);
	inputs.push('dietflag=' + dietflag);
	
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
			alert(r);
			setTimeout(function() {
				// setNewCustomizeTemp();
				window.location.reload(true);
				// fetchCustomizeTemplateList();
			}, 500);
		}
	});
}

function saveRisTemplate(Type) {
	var queryType;
	if(Type == "RIS")
		{
		 queryType = $("#qurType").val();
		
		}else
		{
			queryType = $("#queryType").val();
		}
	var templateName = $("#risTemplateName").val();
	var selRisTempType = $('#selRisTempType').val();
	var templateData = "";
		templateData = CKEDITOR.instances['RiseditorSubjective'].getData();
		// objectiveTempData = CKEDITOR.instances['editorObjective'].getData();
	var ipd_opd_flag = "";
	var idCustomizeTemplate = "0";
	var inputs = [];
	inputs.push('action=saveRisTemplate');
	inputs.push('queryType=' + queryType);
	inputs.push('idCustomizeTemplate=' + idCustomizeTemplate);
	inputs.push('templateName=' + templateName);
	inputs.push('templateData=' + encodeURIComponent(templateData));
	inputs.push('selCustomizeTempType=' + selRisTempType);
	inputs.push('type=' + Type);
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
			alert("Template Create Successfully...");
			setTimeout(function() {
				window.location.reload();
				$("#risTemplateName").val(" ");
			}, 500);
		}
	});
}


function setTemplateFunc() {

	var selCustomizeTempType = $('#selCustomizeTempType').val();

	if (selCustomizeTempType == "h") {
		$('#tempHistDiv').show();
		$('#move').hide();
		$('#historyTemp').show();
	} else {
		$('#tempHistDiv').hide();
		$('#historyTemp').hide();
		$('#move').show();
	}
}

// *******************************End Code for Customize
// Template***************************

function savechangedUserPassword() {

	var userName = $("#userNm").val();
	var newPassword = $("#newpassword").val();
	var newPassword1 = $("#newpassword1").val();
	var userID = $("#txtUserId").val();
	var oldPassword = $("#oldpassword").val();
	var queryType = $("#queryType").val();
	// var userPass=$("#txtUserPass").val();

	if (userName == "" || userName == null) {
		alert("User Name Must Be Filled Out");
		return false;
	} else if (oldPassword == "" || oldPassword == null) {
		alert("Please Enter Old Password.");
		return false;

	} else if (newPassword.length > 12) {
		alert("Password lenght shuld not be greater then 12");
		return false;
	} else if (newPassword == "" || newPassword == null) {
		alert("New Password Must Be Filled Out");
		return false;
	} else if (newPassword1 == "" || newPassword1 == null) {
		alert("Re-Enter New Password field Must Be Filled Out.");
		return false;

	} else if (newPassword1.lenght > 12) {
		alert("Password lenght shuld not be greater then 12");
		return false;

	} else if (newPassword != newPassword1) {

		alert("Passwords typed do not match, please re-enter your passwords");
		return false;
	}

	var inputs = [];
	//inputs.push('action=savechangedUserPassword');
	inputs.push('userName=' + userName);
	inputs.push('newPassword=' + newPassword);
	inputs.push('userID=' + userID);
	inputs.push('queryType=' + queryType);

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url 	: "ehat/users/saveChangedUserPassword",
	//	url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			alert(r);
			window.location.reload();
		}
	});
}

/*
 * Saves the sponsored Details from Sponsor_type.jsp author=Abhijit Radke and
 * Kavita
 */

function saveSponsoredDetails() {
	var sponsoredName = $("#sponsoredNameAddID").val();

	if (sponsoredName == "" || sponsoredName == null) {
		alert("Sponsored Name Must Be Filled Out");
		SetFocus("sponsoredNameAddID");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveSponsoredDetails');
	inputs.push('sponsoredName=' + sponsoredName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("unable to insert Sponsored details");
		},
		success : function(r) {
			alert(r);
			// fetchSponsoredDetails("onload");
			window.location.reload();
		}
	});
};

var count1 = 1;
var fetchedSponsoredDetailsGUI = "{#foreach $T.sponsoredDetailsDTOList as sponsoredDetailsDTOList}"
		+ "<tr><td style='height: 21.5px;' class='col-md-1 center'>{count1}.</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.sponsoredDetailsDTOList.sposoredID}</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>{$T.sponsoredDetailsDTOList.sponsoredName}</td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
		+ "<button style='height: 21.5px;' value='EDIT' id='btnEdit'  class='btn btn-xs btn-success editUserAccess' onclick='setEditSponsoredDetailsUI({$T.sponsoredDetailsDTOList.sposoredID});' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i></button></td>"
		+ "<td style='height: 21.5px;' class='numeric col-md-1 center'>"
		+ "<button style='height: 21.5px;' value='DELETE' id='btnDelete' class='btn btn-xs btn-success deleteUserAccess' onclick='deleteSponsoredDetails({$T.sponsoredDetailsDTOList.sposoredID});' disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i></button></td></tr>{count1++} {#/for}{count1 =1}";

function fetchSponsoredDetails(type) {
	//alert(type);
	var strValue = $.trim($("#strValue").val());
	if (strValue == "" && type == "search") {
		alert("Please Insert Sponsored Name");
		SetFocus("strValue");
		return false;
	}
	
	var inputs = [];
	inputs.push('action=fetchSponsoredDetails');
	inputs.push('strValue='+strValue);
	inputs.push('type='+type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("unable to fetch Sponsored details");
		},
		success : function(r) {
			var ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');

			//$("#SponsoredDetailsContent").setTemplate(fetchedSponsoredDetailsGUI);
			//$("#SponsoredDetailsContent").processTemplate(pobj1);
			if (type == "sponsorName") {
				$("#SponsoredDetailsContent").html(ajaxResponse);
			} else if(type == "companyAgreement"){
				var template="<option value='0'>--Select--</option>{#foreach $T.sponsoredDetailsDTOList as sl} <option	value='{$T.sl.sposoredID}' > {$T.sl.sponsoredName} </option> {#/for}";
				$("#sponsorType").setTemplate(template);
				$("#sponsorType").processTemplate(pobj1);
			}else if(type == "search" ){
				if(pobj1.sponsoredDetailsDTOList.length == 0){
					alert("Sponsor Type Name Not Found");
					$("#strValue").val("");
					location.reload();
				}else{
					
					$("#SponsoredDetailsContent").setTemplate(fetchedSponsoredDetailsGUI);
					$("#SponsoredDetailsContent").processTemplate(pobj1);
				}
			}else {
				$("#SponsoredDetailsContent").setTemplate(fetchedSponsoredDetailsGUI);
				$("#SponsoredDetailsContent").processTemplate(pobj1);
			}
			// Setting the list on the page for edititng purpose
			$("#sponsoredDetailObjID").html(ajaxResponse);
			setTimeout(function(){userAccess();},100);
		}
	});
};

var editSponsoredDetailsGUI = 
	'<div class="center col-sm-12-1" style="padding-top: 10px;"><h3 id="title">Edit Sponsor Details</h3></div>'
	+ '<div class="form-group Remove-Padding col-md-12-1" style="margin-top: 9px;">'
	+ '<div class="form-group Remove-Padding col-md-5-1" style="margin-top: 9px;padding-left: 5%;">'
	+ '<label class="TextFont">Sponsored Id</label></div>'
	+ '<div class="form-group Remove-Padding col-md-6-1" style="margin-top: 9px;">'
	+ '<input id="sponsoredID_ID" name="sponsoredID" value="" class="form-control input-SmallText" readonly="readonly" /></div>'
	+ '<div class="col-md-1-1" style="margin-top: 25px;"><b class=" col-md-1-1" style="color: red;">*</b></div></div>'
	+ '<div class="form-group Remove-Padding col-md-12-1" style="margin-top: 9px;">'
	+ '<div class="form-group Remove-Padding col-md-5-1" style="margin-top: 9px;padding-left: 5%;">'
	+ '<label class="TextFont">Sponsored name</label></div>'
	+ '<div class="form-group Remove-Padding col-md-6-1" style="margin-top: 9px;">'
	+ '<input id="sponsoredNameEditID" name="sponsoredNameEdit" value="" class="form-control input-SmallText" /></div>'
	+ '<div class="col-md-1-1" style="margin-top: 25px;"><b class=" col-md-1-1" style="color: red;">*</b></div></div>'
	+ '<div class="form-group Remove-Padding col-md-12-1 center" style="margin-top: 9px;">'
	+ "<input class='btn btn-xs btn-success' type='button' value='SAVE' onclick='editSponsoredDetails()' />"
	+ '</div>';


function setEditSponsoredDetailsUI(tempSponsoredID) {

	var sample;
	$("#sponsoredDetailsAddEditID").setTemplate(editSponsoredDetailsGUI);
	$("#sponsoredDetailsAddEditID").processTemplate(sample);
	

	var ajaxResponse = $("#sponsoredDetailObjID").html();
	myArray = JSON.parse(ajaxResponse);

	for ( var i = 0; i < myArray.sponsoredDetailsDTOList.length; i++) {

		if (myArray.sponsoredDetailsDTOList[i].sposoredID == tempSponsoredID) {

			$("#sponsoredID_ID").val(tempSponsoredID);
			$("#sponsoredID_ID").attr('readonly', true);
			$("#sponsoredID_ID").css("background-color", "lightgrey");

			$("#sponsoredNameEditID").val(
					myArray.sponsoredDetailsDTOList[i].sponsoredName);
			break;
		}
	}
};

function editSponsoredDetails() {

	var sponsoredID = $("#sponsoredID_ID").val();
	var sponsoredName = $("#sponsoredNameEditID").val();
	if (sponsoredName =="" )
		{
		alert("Please Insert Sponsored Name .");
		SetFocus("sponsoredNameEditID");
		
		}
	else
		{
	var inputs = [];
	inputs.push('action=editSponsoredDetails');
	inputs.push('sponsoredID=' + sponsoredID);
	inputs.push('sponsoredName=' + sponsoredName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		error : function() {
			alert("unable to save Sponsored details");
		},
		success : function(r) {
			alert(r);
			// fetchSponsoredDetails("onload");
			window.location.reload();
		}
	});
}};

function deleteSponsoredDetails(id) {
	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {
	var inputs = [];
	inputs.push('action=deleteSponsoredDetails');
	inputs.push('sponsoredID=' + id);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("unable to delete Sponsored details");
		},
		success : function(r) {
			alert("Sponsor type deleted successfully");
			// fetchSponsoredDetails("onload");
			window.location.reload();
		}
		});
	}
};

/*
 * Author : nIKHIL; Date : 12-9-2014; for Drop Down Menu (Radiology Test Type)
 * on radiologyBodyPart.jsp & investigationTest.jsp;
 */
var loadTestTypeTemp = "<option value='select'>--Select--</option>{#foreach $T.testList as tl}<option value='{$T.tl.groupId}' >{$T.tl.GroupName}</option>{#/for}";
// Author : nIKHIL; Date : 12-9-2014;
function loadTestType() {

	count = 1;
	var inputs = [];
	inputs.push('action=fetchTestType');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		error : function() {
		},
		success : function(r) {
			ajaxResponse = r;
			var pobj1 = eval('(' + ajaxResponse + ')');

			$("#selectTestType").setTemplate(loadTestTypeTemp);
			$("#selectTestType").processTemplate(pobj1);
			
			//@author : Touheed Khan @date : 1-Aug-2016
			//for motivator service heading
			$("#txtSelectService")
			.setTemplate(
					"<option value='0'>Pathology</option>{#foreach $T.testList as tl}<option value='{$T.tl.groupId}' >{$T.tl.GroupName}</option>{#/for}");
			$("#txtSelectService").processTemplate(pobj1);
			
			$("#drpSelectService")
			.setTemplate(
					"<option value='0'>Pathology</option>{#foreach $T.testList as tl}<option value='{$T.tl.groupId}' >{$T.tl.GroupName}</option>{#/for}");
			$("#drpSelectService").processTemplate(pobj1);
			//@author : Touheed Khan @date : 24-Aug-2016
			//for motivator service heading
			$("#txtSelectServiceReport")
			.setTemplate(
					"<option value='select'>Select</option><option value='0'>Pathology</option>{#foreach $T.testList as tl}<option value='{$T.tl.groupId}' >{$T.tl.GroupName}</option>{#/for}");
			$("#txtSelectServiceReport").processTemplate(pobj1);
			
			// @author : Amrut Patil @date : 21-Nov-2016 ( For service Report of Investigation )
			$("#IdForSelectTestGrupOfCostEst")
			.setTemplate(
					"<option value='select'>Select</option>{#foreach $T.testList as tl}<option value='{$T.tl.groupId}' >{$T.tl.GroupName}</option>{#/for}");
			$("#IdForSelectTestGrupOfCostEst").processTemplate(pobj1);
			
		}
	});
}
/*
 * Author : nIKHIL; Date : 12-9-2014; to edit Radiology Body part on
 * radiologyBodyPart.jsp
 */
function editBodyPart(bodyPart) {
	$("#AddTest").hide();
	$("#SaveButtonContent").show();
	var type = $("#testType").val();
	// $("#SearchContent").html("");
	var ajaxResponse = $("#testDetails").html();
	var myArray = JSON.parse(ajaxResponse.decodeSpecialChars());
	for ( var i = 0; i < myArray.testList.length; i++) {

		if (myArray.testList[i].bodyPart == bodyPart) {
			myObj1 = myArray.testList[i];

			break;
		}
	}

	var pageName = $("#pageName").val();

	$("#testHead").html("Edit Investigation Body Part:");
	$("#queryType").val("update");
	$("#bodyPart").val(myObj1.bodyPart);
	$("#bodyPartName").val(myObj1.bpn);
	$("#selectTestType").val(myObj1.test_ID);
	// $("#AddTest").show();

	$("#divSpSpDisHide").html(ajaxResponse);
	setSaveBodyPartButton();
	SetFocus("bodyPartName");
	setTimeout(function(){userAccess();},100);
}

function setSaveBodyPartButton() {
	var sampleBean = "";
	$("#SaveButtonContent").setTemplate(saveBodyPartButtonTemp);
	$("#SaveButtonContent").processTemplate(sampleBean);
}

var saveBodyPartButtonTemp = "<button class='btn btn-xs btn-success editUserAccess' type='button' value='Save Now' data-toggle='tooltip' data-placement='left' title='Save Investigation Body Part' onclick='saveEditBodyPart()' disabled='disabled'>" +
		"<i class='fa fa-save'></i></button>";

function saveEditBodyPart() {

	var testType = $("#testType").val();
	var queryType = $("#queryType").val();
	var test_Id = $("#selectTestType").val();
	var bodyPartName = $.trim($("#bodyPartName").val());
	
	if (test_Id == "select" && bodyPartName == "") {
		alert("Please Fill Out Mandatory Fields");
		return false;
	}else if ( bodyPartName == "") {
		alert("Plese Enter Investigation Body Part Name");
		return false;
	}else if (test_Id == "select") {
		alert("Please Select Investigation Test Group");
		return false;
	}

	test_Id = $.trim(test_Id);

	var inputs = [];
	inputs.push('action=UpdateBodyPart');
	inputs.push('testType=' + encodeURIComponent(testType));
	inputs.push('tid=' + test_Id);
	inputs.push('bodyPart=' + +$("#bodyPart").val());
	inputs.push('bodyPartName=' + bodyPartName);
	inputs.push('queryType=' + queryType);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	// inputs.push('tname=' + encodeURIComponent(tname));
	// inputs.push('charges=' + charges);

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					if (ajaxResponse == "Test Name is already present in the database."
							|| ajaxResponse == "Service Name is already present in the database.") {
						SetFocus("tname");
					} else {
						defaultViewTest();
						setSearchTest();
						$("#queryType").val("insert");
						location.reload();
					}
				}
			});
	$("#AddTest").show();
}

// /////////////////////////////////////////////////////////////////////////////////////////////
// Author : nIKHIL; Date : 12-9-2014; to delete Radiology Body part on
// radiologyBodyPart.jsp

function deleteBodyPart(bodyPart) {

	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {
		var testType = $("#testType").val();

		var inputs = [];
		inputs.push('action=deleteBodyPart');
		inputs.push("bodyPart_Id=" + bodyPart);
		inputs.push('testType=' + encodeURIComponent(testType));
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
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}
function setAddBodypartTemp() {
	setSaveBodyPartButton();
	$("#AddTest").hide();
}

var blockDocNameTemplate = "<option value='0'>-Select-</option>{#foreach $T.dl as dl}	<option value='{$T.dl.di}'>{$T.dl.dn}</option>{#/for}";
function setBlockDocName() {
	var inputs = [];
	inputs.push('action=FetchDoctors');

	inputs.push('date=onload');
	inputs.push('docType=doc');
	inputs.push('drDeptId=' + 0);
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
		}
	});
};

function saveGroup() {
	var groupId = $("#tid").val();
	var grpName = $.trim($("#tname").val());

	var queryType = $("#queryType").val();
	if (grpName == "") {
		alert("Please Enter Investigation Group Name");
		SetFocus("tname");
	} else {

		var inputs = [];
		inputs.push('action=saveGroup');
		inputs.push('queryType=' + queryType);
		inputs.push('grpName=' + encodeURIComponent(grpName));
		inputs.push('groupId=' + groupId);
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
				alert(r);
				window.location.reload();
			}
		});
	}
}

function getDoctorTimeSlotDetails() {

	var inputs = [];
	inputs.push('action=getDoctorTimeList');
	inputs.push('doctorId=' + $("#divDocName").val());
	inputs.push('pageName=SchedulingDoctorSlot');
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
			var ajaxResponse = r;
			var pobj1 = eval('(' + ajaxResponse + ')');
		
			if (pobj1.di == undefined) {
				$("#queryType").val("save");

				$("#txtMorSunStart").val("00:00:00");
				$("#txtMorMonStart").val("00:00:00");
				$("#txtMorTueStart").val("00:00:00");
				$("#txtMorWedStart").val("00:00:00");
				$("#txtMorThiStart").val("00:00:00");
				$("#txtMorFriStart").val("00:00:00");
				$("#txtMorSatStart").val("00:00:00");

				$("#txtMorSatEnd").val("00:00:00");
				$("#txtMorFriEnd").val("00:00:00");
				$("#txtMorThiEnd").val("00:00:00");
				$("#txtMorWedEnd").val("00:00:00");
				$("#txtMorTueEnd").val("00:00:00");
				$("#txtMorMonEnd").val("00:00:00");
				$("#txtMorSunEnd").val("00:00:00");
				
				$("#txtMorSunRoom").val('');
				$("#txtMorMonRoom").val('');
				$("#txtMorTueRoom").val('');
				$("#txtMorWedRoom").val('');
				$("#txtMorThuRoom").val('');
				$("#txtMorFriRoom").val('');
				$("#txtMorSatRoom").val('');
				
				/* /Morning Slot */
				/* After Noon Slot */
				$("#txtAftSunStart").val("12:00:00");
				$("#txtAftMonStart").val("12:00:00");
				$("#txtAftTueStart").val("12:00:00");
				$("#txtAftWedStart").val("12:00:00");
				$("#txtAftThiStart").val("12:00:00");
				$("#txtAftFriStart").val("12:00:00");
				$("#txtAftSatStart").val("12:00:00");

				$("#txtAftSatEnd").val("12:00:00");
				$("#txtAftFriEnd").val("12:00:00");
				$("#txtAftThiEnd").val("12:00:00");
				$("#txtAftWedEnd").val("12:00:00");
				$("#txtAftTueEnd").val("12:00:00");
				$("#txtAftMonEnd").val("12:00:00");
				$("#txtAftSunEnd").val("12:00:00");
				
				$("#txtAftSunRoom").val('');
				$("#txtAftMonRoom").val('');
				$("#txtAftTueRoom").val('');
				$("#txtAftWedRoom").val('');
				$("#txtAftThuRoom").val('');
				$("#txtAftFriRoom").val('');
				$("#txtAftSatRoom").val('');
				/* /After Noon Slot */
				/* Evening Slot */
				$("#txtEveSunStart").val("16:00:00");
				$("#txtEveMonStart").val("16:00:00");
				$("#txtEveTueStart").val("16:00:00");
				$("#txtEveWedStart").val("16:00:00");
				$("#txtEveThiStart").val("16:00:00");
				$("#txtEveFriStart").val("16:00:00");
				$("#txtEveSatStart").val("16:00:00");

				$("#txtEveSatEnd").val("16:00:00");
				$("#txtEveFriEnd").val("16:00:00");
				$("#txtEveThiEnd").val("16:00:00");
				$("#txtEveWedEnd").val("16:00:00");
				$("#txtEveTueEnd").val("16:00:00");
				$("#txtEveMonEnd").val("16:00:00");
				$("#txtEveSunEnd").val("16:00:00");
				
				$("#txtEveSunRoom").val('');
				$("#txtEveMonRoom").val('');
				$("#txtEveTueRoom").val('');
				$("#txtEveWedRoom").val('');
				$("#txtEveThuRoom").val('');
				$("#txtEveFriRoom").val('');
				$("#txtEveSatRoom").val('');

			} else {
				$("#queryType").val("update");

				$("#slotDuration").val(pobj1.duration);
				$("#eventsAppointment").val(pobj1.color);
				$("#eventsAppointment").css("background-color", pobj1.color);

				$("#txtMorSunStart").val(pobj1.sunMorningStart);
				$("#txtMorMonStart").val(pobj1.monMorningStart);
				$("#txtMorTueStart").val(pobj1.tueMorningStart);
				$("#txtMorWedStart").val(pobj1.wedMorningStart);
				$("#txtMorThiStart").val(pobj1.thiMorningStart);
				$("#txtMorFriStart").val(pobj1.friMorningStart);
				$("#txtMorSatStart").val(pobj1.satMorningStart);

				$("#txtMorSatEnd").val(pobj1.satMorningEnd);
				$("#txtMorFriEnd").val(pobj1.friMorningEnd);
				$("#txtMorThiEnd").val(pobj1.thiMorningEnd);
				$("#txtMorWedEnd").val(pobj1.wedMorningEnd);
				$("#txtMorTueEnd").val(pobj1.tueMorningEnd);
				$("#txtMorMonEnd").val(pobj1.monMorningEnd);
				$("#txtMorSunEnd").val(pobj1.sunMorningEnd);
				
				$("#txtMorSunRoom").val(pobj1.sunMorningRoom);
				$("#txtMorMonRoom").val(pobj1.monMorningRoom);
				$("#txtMorTueRoom").val(pobj1.tueMorningRoom);
				$("#txtMorWedRoom").val(pobj1.wedMorningRoom);
				$("#txtMorThuRoom").val(pobj1.thuMorningRoom);
				$("#txtMorFriRoom").val(pobj1.friMorningRoom);
				$("#txtMorSatRoom").val(pobj1.satMorningRoom);
				/* /Morning Slot */
				/* After Noon Slot */
				$("#txtAftSunStart").val(pobj1.sunAfternoonStart);
				$("#txtAftMonStart").val(pobj1.monAfternoonStart);
				$("#txtAftTueStart").val(pobj1.tueAfternoonStart);
				$("#txtAftWedStart").val(pobj1.wedAfternoonStart);
				$("#txtAftThiStart").val(pobj1.thiAfternoonStart);
				$("#txtAftFriStart").val(pobj1.friAfternoonStart);
				$("#txtAftSatStart").val(pobj1.satAfternoonStart);

				$("#txtAftSatEnd").val(pobj1.satAfternoonEnd);
				$("#txtAftFriEnd").val(pobj1.friAfternoonEnd);
				$("#txtAftThiEnd").val(pobj1.thiAfternoonEnd);
				$("#txtAftWedEnd").val(pobj1.wedAfternoonEnd);
				$("#txtAftTueEnd").val(pobj1.tueAfternoonEnd);
				$("#txtAftMonEnd").val(pobj1.monAfternoonEnd);
				$("#txtAftSunEnd").val(pobj1.sunAfternoonEnd);
				
				$("#txtAftSunRoom").val(pobj1.sunAfternoonRoom);
				$("#txtAftMonRoom").val(pobj1.monAfternoonRoom);
				$("#txtAftTueRoom").val(pobj1.tueAfternoonRoom);
				$("#txtAftWedRoom").val(pobj1.wedAfternoonRoom);
				$("#txtAftThuRoom").val(pobj1.thuAfternoonRoom);
				$("#txtAftFriRoom").val(pobj1.friAfternoonRoom);
				$("#txtAftSatRoom").val(pobj1.satAfternoonRoom);
				/* /After Noon Slot */
				/* Evening Slot */
				$("#txtEveSunStart").val(pobj1.sunEverningStart);
				$("#txtEveMonStart").val(pobj1.monEverningStart);
				$("#txtEveTueStart").val(pobj1.tueEverningStart);
				$("#txtEveWedStart").val(pobj1.wedEverningStart);
				$("#txtEveThiStart").val(pobj1.thiEverningStart);
				$("#txtEveFriStart").val(pobj1.friEverningStart);
				$("#txtEveSatStart").val(pobj1.satEverningStart);

				$("#txtEveSatEnd").val(pobj1.satEverningEnd);
				$("#txtEveFriEnd").val(pobj1.friEverningEnd);
				$("#txtEveThiEnd").val(pobj1.thiEverningEnd);
				$("#txtEveWedEnd").val(pobj1.wedEverningEnd);
				$("#txtEveTueEnd").val(pobj1.tueEverningEnd);
				$("#txtEveMonEnd").val(pobj1.monEverningEnd);
				$("#txtEveSunEnd").val(pobj1.sunEverningEnd);
				
				$("#txtEveSunRoom").val(pobj1.sunEverningRoom);
				$("#txtEveMonRoom").val(pobj1.monEverningRoom);
				$("#txtEveTueRoom").val(pobj1.tueEverningRoom);
				$("#txtEveWedRoom").val(pobj1.wedEverningRoom);
				$("#txtEveThuRoom").val(pobj1.thuEverningRoom);
				$("#txtEveFriRoom").val(pobj1.friEverningRoom);
				$("#txtEveSatRoom").val(pobj1.satEverningRoom);
			}
		}
	});
}

// Author : nIKHIL; Date : 9-10-2014;
// Purpose: Drop Down for InvestigationTest.jsp;
var loadBodyPartTemp = "<option value='select'>--Select--</option>"
		+ "{#foreach $T.invstList as il}<option value='{$T.il.bodyPartId}'>{$T.il.bodyPart}</option>"
		+
		// "<input type='hidden' name='testGroupId' id='testGroupId'
		// value='{$T.il.testGroupId}' />" +
		"{#/for}";

function loadBodyPart() {

	count = 1;
	var inputs = [];
	inputs.push('action=fetchBodyPart');
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			var pobj1 = eval('(' + ajaxResponse + ')');

			$("#selectBodyPart").setTemplate(loadBodyPartTemp);
			$("#selectBodyPart").processTemplate(pobj1);
		}
	});
}

function chamgeTestGroup() {
	var id_Array = $("#selectBodyPart").val().split(",");
	var testGroupId = $.trim(id_Array[1]);
	$("#selectTestType").val(testGroupId);
}

// Author : nIKHIL; Date : 9/10/2014
function saveEditInvstTest() {
	// var testType = $("#testType").val();
	var queryType = $("#queryType").val();
	var invstTestName = $.trim($("#invstTestName").val());
	var invstTestCode =$.trim($("#invstTestCode").val());
	var testGroupId = $("#selectTestType").val();

	var testCharge = $("#investCharge").val();
	var motivatorCash = $('#motivatorCash').val();
	var motivatorSponsored = $('#motivatorSponsored').val();
	var clinicPercent = $('#txtClinicPercent').val();

	var bodyPartId = $("#selectBodyPart").val();
	
	

	// var selectBodyPart = $("#selectBodyPart").val().split(",");
	// var bodyPartId = $.trim(selectBodyPart[0]);

	if (invstTestName == "") {
		alert("Please Enter Investigation Test Name");
		return false;
	} else if (invstTestCode == "") {
		alert("Plese Enter Test Code");
		return false;
	} else if (bodyPartId == "select") {
		alert("Please Select Body Part");
		return false;
	}else if (testGroupId == "select") {
		alert("Plese Select Test Group");
		return false;
	}
	else if(clinicPercent > 100){
		alert("Clinic % can not be less than '0' and greater than '100'");
		SetFocus("txtClinicPercent");
		return false;
	}
	
	if(testCharge == "")
	{
		testCharge = 0;
	}
	if(motivatorCash == "")
	{
		motivatorCash = 0;
	}
	if(motivatorSponsored == "")
	{
		motivatorSponsored = 0;
	}
	if(clinicPercent == "" || clinicPercent == undefined)
	{
		clinicPercent = 0;
	}
	

	
	if(parseInt(testCharge) < parseInt(motivatorCash)){
		alert("Motivator cash must be less than test charge.");
		SetFocus("motivatorCash");
		return false;
	}
	if(parseInt(testCharge) < parseInt(motivatorSponsored)){
		alert("Motivator sponsored must be less than test charge.");
		SetFocus("motivatorSponsored");
		return false;
	}


	var inputs = [];
	inputs.push('action=saveEditInvstTest');
	// inputs.push('testType=' + encodeURIComponent(testType));
	inputs.push('queryType=' + queryType);
	inputs.push('invstTestName=' + encodeURIComponent(invstTestName));
	inputs.push('invstTestCode=' + invstTestCode);
	inputs.push('testGroupId=' + testGroupId);
	inputs.push('bodyPartId=' + bodyPartId);
	inputs.push('testCharge=' + testCharge);
	inputs.push('motivatorCash=' + motivatorCash);
	inputs.push('motivatorSponsored=' + motivatorSponsored);
	inputs.push('clinicPercent=' + clinicPercent);
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());

	if (queryType == "update") {
		var invstId = $("#tid").val();
		inputs.push('invstId=' + invstId);
	}

	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				// timeout : 1000 * 60 * 5,
				catche : false,
				error : function() {
					// alert("error");
				},
				success : function(r) {
					ajaxResponse = r;
					alert(ajaxResponse);
					if (ajaxResponse == "Test Name is already present in the database."
							|| ajaxResponse == "Service Name is already present in the database.") {
						SetFocus("invstTestName");
					} else {
						
						// showInvstTestList();
						location.reload();
					}
				}
			});
	$("#queryType").val("insert");
}

// Author : nIKHIL; Date : 9/10/2014;
var InvstDefaultTestViewTemp = "{#foreach $T.invstList as il}"
		+ "<tr>	<td class='col-md-1-1 center' style='height: 35px;'>{count++}.</td>	"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.invstTestName}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.invstTestCode}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.bodyPart}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.testCharge}</td>"
		+ "<td class='numeric col-md-2-1 center' style='height: 21.5px;'>{$T.il.testGroup}</td>"
		+ "<td class='numeric col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button onclick='editInvstTest({$T.il.invstId})' id='btnEdit2' value='EDIT' class='btn btn-xs btn-success editUserAccess' disabled='disabled'>"
		+ "<i class='fa fa-edit'></i>		</button></td>	"
		+ "<td class='numeric col-md-1-1 center' style='height: 21.5px;'>"
		+ "<button	onclick='deleteInvstTest({$T.il.invstId})' id='btnDelete2' class='btn btn-xs btn-success deleteUserAccess' value='DELETE'  disabled='disabled'>"
		+ "<i class='fa fa-trash-o'></i>		</button></td></tr>" + "{#/for} ";


function showInvstTestList(search,type)
{
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if(searhFlag == "search")
	{
		if(searchText == "")
		{
			alert("Please Enter Test Name !");
			setFocus("#byName");
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=fetchInvstTest');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {
			// var ajaxResponse = res;
			var result = res;
			$("#testDetails").html(result);
			var testObj = eval('(' + result + ')');
			if(searhFlag == "search" && testObj.invstList.length == 0){
				alert("Investigation Test Not Found");
				$("#byName").val("");
				location.reload();
			}
		if(type == "charges"){
				$('#InvTestChrgsTable > thead > tr:nth-child(n+2)').remove();
				$('#InvTestChrgsTable > tbody > tr:nth-child(n+2)').remove();

		var halllist = $("#InvTestAllHallDetails").html();
		var halldetails = eval('(' + halllist + ')');
		var investigationTestCharges = "<tr id = 'headerTr'>"
				+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
				+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>Investigation Test Name</div></th>"
				+ "<th class='center' style = 'width: 70px;'><div class='TextFont'>Test Code</div></th>"
				+ "<th class='center' style = 'width: 150px;'><div class='TextFont'>Test Group</div></th>"
				+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";
		$
				.each(
						halldetails.hl,
						function(name, value) {
							investigationTestCharges = investigationTestCharges
									+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
									+ value.hn + "</div></th>";
						});
		investigationTestCharges = investigationTestCharges
				+ "</tr>";
		$('#InvstTestHeading').after(investigationTestCharges);

		var count = 1;
				
		$.each(testObj.invstList,function(name, value) {

							var investigationTestbody = "";
							investigationTestbody = investigationTestbody
									+ "<tr id=Test"
									+ count
									+ "><td class='center' style='height: 21.5px;width: 30px;'>"
									+ value.invstId
									+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
									+ value.invstTestName
									+ "</td><td class='center' style='height: 21.5px;width: 70px;'>"
									+ value.invstTestCode
									+ "</td><td class='center' style='height: 21.5px;width: 150px;'>"
									+ value.testGroup + "</td>";

							var invTestChrgs = 0;
							var slaveid = 0;
							var hallid = 0;

							if (value.hallWsTestChrgsList.length > 0) {
								for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
									if (value.hallWsTestChrgsList[j].hallID == 0) {
										invTestChrgs = value.hallWsTestChrgsList[j].chrgs;
										slaveid = value.hallWsTestChrgsList[j].slaveId;
										hallid = 0;

										investigationTestbody = investigationTestbody
												+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
												+ value.invstId
												+ "-HallID"
												+ hallid
												+ " value = '"
												+ invTestChrgs
												+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'invtestchargesslaveID"
												+ value.invstId
												+ "-"
												+ hallid
												+ "' value = '"
												+ slaveid
												+ "' /></td>";
									}
								}
							} else {
								investigationTestbody = investigationTestbody
										+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
										+ value.invstId
										+ "-HallID"
										+ hallid
										+ " value = '"
										+ value.testCharge
										+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'invtestchargesslaveID"
										+ value.invstId
										+ "-"
										+ hallid
										+ "' value = '"
										+ slaveid + "' /></td>";
							}

							$.each(halldetails.hl,function(name,hallvalue) {

												var isPresent = 0;
												for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
													if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
														invTestChrgs = value.hallWsTestChrgsList[i].chrgs;
														slaveid = value.hallWsTestChrgsList[i].slaveId;
														hallid = value.hallWsTestChrgsList[i].hallID;
														isPresent = 1;
														break;
													} 
												}
													
												if (isPresent > 0) { 
													investigationTestbody = investigationTestbody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
													+ value.invstId
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ invTestChrgs
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'invtestchargesslaveID"
													+ value.invstId
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid
													+ "' /></td>";
												}else{
													
													invTestChrgs = value.testCharge;
													slaveid = 0;
													hallid = hallvalue.hi;
													
													investigationTestbody = investigationTestbody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
													+ value.invstId
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ invTestChrgs
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'invtestchargesslaveID"
													+ value.invstId
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid
													+ "' /></td>";
												}

											});

							investigationTestbody = investigationTestbody
									+ "</tr>";

							$('#Test' + (count - 1)).after(
									investigationTestbody);
							count++;
						});
			}else{
				$("#InvstTestContent").setTemplate(InvstDefaultTestViewTemp);
				$("#InvstTestContent").processTemplate(testObj);
				$("#tid").val(0);
				disableTestTextbox();
				$("#queryType").val("insert");
			}
			$("#byName").val("");
			setTimeout(function(){userAccess();},100);
		}
	});
}

// Author : nIKHIL; Date : 9/10/2014;
function editInvstTest(testId) {

	var ajaxResponse = $("#testDetails").html();
	var myArray = JSON.parse(decodeURIComponent(ajaxResponse));
	for ( var i = 0; i < myArray.invstList.length; i++) {

		if (myArray.invstList[i].invstId == testId) {
			var myObj1 = myArray.invstList[i];
			break;
		}
	}

	$("#testHead").html("Edit Investigation Test");
	$("#selectBodyPart").val(myObj1.bodyPartId);
	$("#invstTestName").val(myObj1.invstTestName);
	$("#invstTestCode").val(myObj1.invstTestCode);
	$("#selectTestType").val(myObj1.testGroupId);
	$("#investCharge").val(myObj1.testCharge);
	$("#tid").val(myObj1.invstId);
	
	$("#motivatorCash").val(myObj1.motivatorCash);
	$("#motivatorSponsored").val(myObj1.motivatorSponsored);
	$("#txtClinicPercent").val(myObj1.clinicPercent);
	
	$("#selectBodyPart,#invstTestName,#invstTestCode,#investCharge,#selectTestType").removeAttr("disabled");
	$("#queryType").val("update");

	// $("#divSpSpDisHide").html(ajaxResponse);
	// setSaveTestButton();
	SetFocus("invstTestName");
	
}

// Author : nIKHIL; Date : 10/10/2014;
function deleteInvstTest(invstId) {

	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {

		var inputs = [];
		inputs.push('action=deleteInvstTest');
		inputs.push("invstId=" + invstId);
		var str = inputs.join('&');

		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "AdminServlet",
			// timeout : 1000 * 60 * 5,
			cache : false,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				showInvstTestList();
			}
		});
	}
}

function disableTestTextbox() {
	$("#selectBodyPart").val('select');
	$("#invstTestName").val('');
	$("#invstTestCode").val('');
	$("#investCharge").val('');
	$("#selectTestType").val('select');
	$("#tid").val(0);

	$("#selectBodyPart,#invstTestName,#invstTestCode,#selectTestType,#investCharge").attr(
			"disabled", "disabled");
}

function enableTestTextbox() {
	$("#selectBodyPart").val('select');
	$("#invstTestName").val('');
	$("#invstTestCode").val('');
	$("#investCharge").val('');
	$("#selectTestType").val('select');
	// $("#tid").val(0);

	$("#selectBodyPart,#invstTestName,#invstTestCode,#selectTestType,#investCharge").removeAttr("disabled");
	$("#queryType").val("insert");
	setAddTestTemp("RadioGroup");
}

function fetchSetDoctorSpecilizations() {

	var inputs = [];
	inputs.push('action=fetchSetDoctorSpecilizations');
	inputs.push("treatmentId=" + $("#treatmentId").val());
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
		
			var doctor_spl_id = eval('(' + ajaxResponse + ')');

			if (doctor_spl_id == "") {
				$("#selDocSpec").val("");
				$('#customizeTemplates').html("");
				return;
			}
			setTimeout(function() {
				$("#selDocSpec").val(doctor_spl_id);
				fetchCustomizeTemplates(doctor_spl_id, ($("#ipdOpdFlag").val()));
			}, 300);
		}
	});
}

function fetchCustomizeTemplates(doctor_spl_id, ipdOpdFlag) {

	
	if (doctor_spl_id == "") {
		$('#customizeTemplates').html("");
		$('#customizeTemplatesID').val("0");
		return;
	}

	var inputs = [];
	inputs.push('action=fetchCustomizeTemplates');
	inputs.push("doctor_spl_id=" + doctor_spl_id);
	inputs.push("ipdOpdFlag=" + ipdOpdFlag);
	var str = inputs.join('&');
	jQuery
			.ajax({
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
				//	alert("ajaxResponse..."+ajaxResponse);
		
					var customizeTemplateBean = eval('(' + ajaxResponse + ')');
					var customizeTemplate = "";
					var customizeTemplatesID = "0";

					if (customizeTemplateBean.pattemplist.length > 0) {
						for ( var int = 0; int < customizeTemplateBean.pattemplist.length; int++) {
							customizeTemplate = customizeTemplate
									+ "<option value='"
									+ customizeTemplateBean.pattemplist[int].idpattemp
									+ "'>"
									+ customizeTemplateBean.pattemplist[int].tempname
									+ "</option>";
						}
						// <div>
						$("#customizeTemplate").html(
								encodeURIComponent(ajaxResponse));
						// <select>
						$('#customizeTemplates').html(customizeTemplate);
						$('#customizeTemplatesID').val(
								customizeTemplateBean.pattemplist[0].idpattemp);
					} else {
						$("#customizeTemplate").html("");
						$('#customizeTemplatesID').val(customizeTemplatesID);
						$('#customizeTemplates').html(customizeTemplate);
					}
				}
			});
}

function setCustomizeTemplatesID(customizeTemplatesID) {
	$('#customizeTemplatesID').val(customizeTemplatesID);
}

function showPopUpDocterDesk1(varSubObj) {

	var customizeTemplatesID = $("#customizeTemplatesID").val();
	if (customizeTemplatesID == "" || customizeTemplatesID == undefined
			|| customizeTemplatesID == 0) {
		alert("Please select a customize template...");
		return;
	}
	var ajaxResponse = $("#customizeTemplate").html();
	ajaxResponse = decodeURIComponent(ajaxResponse);
	var customizeTemplateBean = eval('(' + ajaxResponse + ')');

	var myObj = "";
	if (customizeTemplateBean.pattemplist.length > 0) {

		for ( var int = 0; int < customizeTemplateBean.pattemplist.length; int++) {
			if (customizeTemplateBean.pattemplist[int].idpattemp == customizeTemplatesID) {
				myObj = customizeTemplateBean.pattemplist[int];
				break;
			}
		}

		if (myObj.type == "h") {
			if (varSubObj == "s") {
				$("#popup1").show();
				$('#customizeTemplatesID').val(myObj.idpattemp);
				$('#customizetemplateSubObj').html(myObj.tempdata);
			} else if (varSubObj == "o") {
				$("#popup1").show();
				$('#customizeTemplatesID').val(myObj.idpattemp);
				$('#customizetemplateSubObj').html(myObj.objectiveTempData);
			}
			$('#btnUseTemplateDDSubObj').val(varSubObj);
		} else {
			$("#popup1").show();
			$('#customizeTemplatesID').val(myObj.idpattemp);
			$('#customizetemplateSubObj').html(myObj.tempdata);
		}
	}
}

function hidePopUpDocterDesk1() {
	$("#popup1").hide();
}

// setting value in fetchCKEditorDocterDesk1();
var keyValueCKEditorArray = new Array();
function useTemplateDocterDesk1() {

	var keyValueCKEditorTemp = "";
	
	var subObjValue = $('#btnUseTemplateDDSubObj').val();
	
	// combination of subObj_selDocSpec_customizeTemplates
	keyValueCKEditorTemp = subObjValue + "_" + ($('#selDocSpec').val()) + "_" + ($('#customizeTemplates').val());
	
	var templateAlreadyPresent = false;
	
	// check array for template present or not
	if (keyValueCKEditorArray.length > 0) {

		// iterate array, check template present or not
		for ( var int2 = 0; int2 < keyValueCKEditorArray.length; int2++) {
			// if yes set flag
			if (keyValueCKEditorTemp == keyValueCKEditorArray[int2]) {
				templateAlreadyPresent = true;
				// alert("Template Already present...");
				break;
				// return;
			}
		}
		// if no add to array
		if (!templateAlreadyPresent) {
			keyValueCKEditorArray.push(keyValueCKEditorTemp);
			$('#keyValueCKEditorArrayDiv').val(keyValueCKEditorArray);
		}
	} else {
		keyValueCKEditorArray.push(keyValueCKEditorTemp);
		$('#keyValueCKEditorArrayDiv').val(keyValueCKEditorArray);
	}

	var parentTagDIVID = ("parentTagDIVID_" + keyValueCKEditorTemp);
	
	// iterate over the pop up div
	$('#customizetemplateSubObj').each(function() {

		$(this).find('select').each(function() {

			var selectedText = [];

			// find the selected text
			$(this).find("option:selected").each(function(i) {
				selectedText[i] = $(this).text();
			});

			/* remove selected attribute */
			for ( var int = 0; int < selectedText.length; int++) {
				$(this).find('option').filter(function() {
					return $(this).text() != selectedText[int];
				}).attr('selected', false);
			}

			/* Add selected attribute */
			for ( var int = 0; int < selectedText.length; int++) {
				$(this).find('option').filter(function() {
					return $(this).text() == selectedText[int];
				}).attr('selected', true);
			}

		}); // End of Select list

		// Start of radio button list
		$(this).find('input[type=radio]').each(function() {
			var radioCheckedFlag = $(this).is(":checked");
			$(this).attr('checked', radioCheckedFlag);
		}); // End of radio button list

		// Start of checkbox button list
		$(this).find('input[type=checkbox]').each(function() {
			var checkboxCheckedFlag = $(this).is(":checked");
			$(this).attr('checked', checkboxCheckedFlag);
		}); // End of checkbox button list

	}); // End '#customizetemplateSubObj'

	var customizeTemplateSubObjInnerHTML = document.getElementById("customizetemplateSubObj").innerHTML;

	var customizeTemplateSubObjInnerHTMLDIV = ("<div id=" + parentTagDIVID + ">") + (customizeTemplateSubObjInnerHTML) + ("</div>");
	
	var isEditorSubObjTreatmentData = CKEDITOR.instances['editorSubObjTreatment'].getData();

	// ckeck for the data if present append
	if (isEditorSubObjTreatmentData == "") {
		CKEDITOR.instances['editorSubObjTreatment'].setData(customizeTemplateSubObjInnerHTMLDIV);
	} else {

		// if already present then update by id
		if (templateAlreadyPresent) {
			CKEDITOR.instances['editorSubObjTreatment'].setData(isEditorSubObjTreatmentData);
			
			setTimeout(function() {
				var element = CKEDITOR.instances['editorSubObjTreatment'].document.getById( parentTagDIVID );
				if (element) {
			        element.setHtml(customizeTemplateSubObjInnerHTML);
			    }
			}, 300);
		} else { // append
			var finalCustomizeTemplateSubObjInnerHTML = isEditorSubObjTreatmentData + customizeTemplateSubObjInnerHTMLDIV;
			CKEDITOR.instances['editorSubObjTreatment'].setData(finalCustomizeTemplateSubObjInnerHTML);
		}
	}
	hidePopUpDocterDesk1();
}

function saveCKEditorDocterDesk1() {

//	var treatmentId = ($("#treatmentId").val()).trim();
	var treatmentId = ($("#tr_Id").val()).trim();
	var keyValueCKEditorArrayDiv = ($("#keyValueCKEditorArrayDiv").val())
			.trim();
	var editorSubObjTreatmentData = CKEDITOR.instances['editorSubObjTreatment']
			.getData();
	var idTreatmentCkeditor = ($("#idTreatmentCkeditor").val()).trim();

	// ckeck for the data if present save
	if (editorSubObjTreatmentData == "") {
		alert("No data to save...");
		return;
	}

	var inputs = [];
	inputs.push('action=saveCKEditorDocterDesk1');
	inputs.push('idTreatmentCkeditor=' + idTreatmentCkeditor);
	inputs.push('treatmentId=' + treatmentId);
	inputs.push('keyValueCKEditorArrayDiv=' + keyValueCKEditorArrayDiv);
	inputs.push('editorSubObjTreatmentData='
			+ encodeURIComponent(editorSubObjTreatmentData));

	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);
			fetchCKEditorDocterDesk1();
		}
	});
}

function fetchCKEditorDocterDesk1() {
	var inputs = [];
	inputs.push('action=fetchCKEditorDocterDesk1');
	/*inputs.push('treatmentId=' + ($("#treatmentId").val()).trim());*/
	inputs.push('treatmentId=' + ($("#tr_Id").val()).trim());
	var str = inputs.join('&');
	jQuery
			.ajax({
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
					var obj = eval('(' + ajaxResponse + ')');

					if ((obj.pattemplist.length) > 0) {

						// setting ID
						$("#idTreatmentCkeditor").val(
								obj.pattemplist[0].idpattemp);

						// setting data
						CKEDITOR.instances['editorSubObjTreatment']
								.setData((obj.pattemplist[0].tempdata));

						// setting array to check for duplicate insertion
						var tempkeyValueCKEditorArrayString = (obj.pattemplist[0].keyValueCKEditorArrayString)
								.trim();
						if (tempkeyValueCKEditorArrayString != "") {
							var tempkeyValueCKEditorSplitArray = tempkeyValueCKEditorArrayString
									.split(",");
							for ( var int = 0; int < tempkeyValueCKEditorSplitArray.length; int++) {
								keyValueCKEditorArray
										.push(tempkeyValueCKEditorSplitArray[int]);
							}
							$("#keyValueCKEditorArrayDiv").val(
									tempkeyValueCKEditorArrayString);
						} else {
							$("#keyValueCKEditorArrayDiv").val(
									tempkeyValueCKEditorArrayString);
						}

					} else {
						$("#idTreatmentCkeditor").val("0");
						$("#keyValueCKEditorArrayDiv").val("");
						CKEDITOR.instances['editorSubObjTreatment'].setData("");
					}
				}
			});
}

function setPrescriptionAutocompleteNameAdmin(inputTextID) {

	var resultData = [];
	var auto = "Prescription";
	var findingName = $("#" + inputTextID).val();
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
					availableTags = ajaxResponse.split("\r\n");

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
						$("#td" + inputTextID + " .typeahead").html(template);
						$("#td" + inputTextID + " .typeahead").show();
						$("#" + inputTextID).typeahead({
							source : resultData,
							displayField : 'Name',
							valueField : 'ID',
							onSelect : displayResult,
							scrollBar : true
						});
						$("#" + inputTextID).data('typeahead').source = resultData;
					}, 500);
				}
			});

	function displayResult(item) {

		$("#" + inputTextID).val(item.text);
	}
}

function addNewAgreement(){
	var templateAgreement='<div class="center col-sm-12-1" style="padding-top: 10px;"><h4 id="title">Add Sponsor Company Details</h4></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Company Name</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-5-1"		style="margin-top: 9px;">		<input id="companyName" name="companyName" value=""			class="form-control input-SmallText" /></div><div style="margin-top: 25px;" class="col-md-1-1">	<b style="color: red;" class=" col-md-1-1">*</b></div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Agreement Date</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-5-1"		style="margin-top: 9px;">		<input type="text" class="form-control input-SmallText"			placeholder="Date" name="agreementDate" readonly="readonly"			onclick="displayCalendar(document.getElementById('+"'agreementDate'"+'),'+"'dd/mm/yyyy'"+',this)"			id="agreementDate">	</div><div style="margin-top: 25px;" class="col-md-1-1">	<b style="color: red;" class=" col-md-1-1">*</b></div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Agreement Ref No</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-5-1"		style="margin-top: 9px;">		<input id="agreementRefNo" name="agreementRefNo" value=""			class="form-control input-SmallText" />	</div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Effective From Date</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-5-1"		style="margin-top: 9px;">		<input type="text" class="form-control input-SmallText"			placeholder="Date" name="effectiveFromDate" readonly="readonly"			onclick="displayCalendar(document.getElementById('+"'effectiveFromDate'"+'),'+"'dd/mm/yyyy'"+',this)"			id="effectiveFromDate">	</div><div style="margin-top: 25px;" class="col-md-1-1">	<b style="color: red;" class=" col-md-1-1">*</b></div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Effective To Date</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-5-1"		style="margin-top: 9px;">		<input type="text" class="form-control input-SmallText"			placeholder="Date" name="effectiveToDate" readonly="readonly"			onclick="displayCalendar(document.getElementById('+"'effectiveToDate'"+'),'+"'dd/mm/yyyy'"+',this)"			id="effectiveToDate">	</div><div style="margin-top: 25px;" class="col-md-1-1">	<b style="color: red;" class=" col-md-1-1">*</b></div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Agreement Details</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-5-1"		style="margin-top: 9px;">		<textarea rows="2" cols="25" id="agreementDetails" name="" class=""></textarea>	</div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Agreement Type</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-5-1"		style="margin-top: 9px;">		<select name="" id="sponsorType"			class="form-control input-SmallText TextFont">			<option value="0">-SELECT-</option>		</select>	</div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">For Hospital Staff</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;">		<input id="forHospitalStaff" name="forHospitalStaff" type="checkbox"			value="" class="form-control input-SmallText" />	</div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Customer Name</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-5-1"		style="margin-top: 9px;">		<input id="customerName" name="customerName" value=""			class="form-control input-SmallText" />	</div></div><div class="form-group Remove-Padding col-md-12-1"	style="margin-top: 9px;">	<div class="form-group Remove-Padding col-md-4-1"		style="margin-top: 9px;">		<label class="TextFont">Defunct</label>	</div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;"></div>	<div class="form-group Remove-Padding col-md-1-1"		style="margin-top: 9px;">		<input id="defunct" name="defunct" type="checkbox" value=""			class="form-control input-SmallText" />	</div></div>';
	var temp;
	$("#divAgreement").setTemplate(templateAgreement);
	$("#divAgreement").processTemplate(temp);
	
	$("#queryType").val("insert");
	$("#id").val(0);
	fetchSponsoredDetails('onload');
}

function saveAgreement(){
	var id =$("#id").val();
	var queryType =$("#queryType").val();
	
	var compNm =$("#companyName").val();
	var aggDt =$("#agreementDate").val();
	var aggRefNo =$("#agreementRefNo").val();
	var effFroDt =$("#effectiveFromDate").val();
	var effToDt =$("#effectiveToDate").val();
	var aggDe =$("#agreementDetails").val();
	var aggTyp =$("#sponsorType").val();
	var custNm =$("#customerName").val();
	var D0 = aggDt.split("/");
	var aggdt = new Date(D0[2],D0[1]-1,D0[0]);
	var D1 = effFroDt.split("/");
	var frmDt = new Date(D1[2],D1[1]-1,D1[0]);
	var D2 = effToDt.split("/");
	var toDt = new Date(D2[2],D2[1]-1,D2[0]);
	
	if(compNm==""){
		alert("Enter Company Name");
		return false;
	}else if(aggDt==""){
		alert("Select Agreement Date");
		return false;
	}else if(aggRefNo==""){
		alert("Enter Agreement Ref No");
		return false;
	}else if(effFroDt==""){
		alert("Select Effective From Date");
		return false;
	}else if(effToDt==""){
		alert("Select Effective To Date");
		return false;
	}else if(toDt.getTime() < frmDt.getTime()) {
	    alert("Please select Effective To Date After Effective From Date !");
	    return false;
	}else if(aggdt.getTime() > frmDt.getTime()){
		alert("Please select Agreement Date Before Or Same as Effective From Date !");
		return false;
	}else if(aggDe==""){
		// alert("Enter Agreement Details");
		// return false;
	}else if(aggTyp=='0'){
		alert("Select Agreement Type");
		return false;
	}
	
	var hospSt="N"; 
	var defunct="N";
	if ($("#forHospitalStaff").is(":checked"))	{
		hospSt="Y";
	}
	if ($("#defunct").is(":checked")){
		defunct="Y";
	}
	var objAgreement = {
			liCompAgg : []
	};
	objAgreement.liCompAgg.push({
		id :id,
		compNm :compNm,
		aggDt :aggDt,
		aggRefNo :aggRefNo,
		effToDt :effToDt,
		effFroDt :effFroDt,
		aggDe :aggDe,
		aggTyp :aggTyp,
		hospSt :hospSt,
		custNm :custNm,
		defunct :defunct
	});
	
	objAgreement = JSON.stringify(objAgreement);
	var inputs = [];
	inputs.push('action=saveAgreement');
	inputs.push("objAgreement=" + objAgreement);
	inputs.push("queryType=" + queryType);
	
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
					alert(r);
					location.reload(this);
				}
			});
}

function fetchCompanyAgreementDetails(type){
	
	var strValue = $.trim($("#strCompanyValue").val());
	if (strValue == "" && type == "search") {
		alert("Please Enter Company Name For Search");
		return false;
	}
	var inputs = [];
	inputs.push('action=fetchCompanyAgreementDetails');
	inputs.push('type='+type);
	inputs.push('strValue='+strValue);
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
					$("#divList").html(ajaxResponse);
					pobj= eval('(' + ajaxResponse + ')');
					if(type=="companyAgreement"){
						var template=" {#foreach $T.liCompAgg as li}<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>	<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.li.id}</td>	<td class='col-sm-3-1 center' style='height: 21.5px;'>{$T.li.compNm}</td>	<td class='col-sm-1-1 center' style='height: 21.5px;'>		<button class='btn btn-xs btn-success editUserAccess' value='EDIT'			id='btnEdit{count}' onclick='editCompanyAgreement({$T.li.id})' disabled='disabled'>			<i class='fa fa-edit'></i>		</button>	</td>	<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete{count}' onClick='deleteCompanyAgreement({$T.li.id})' disabled='disabled'>			<i class='fa fa-trash-o'></i>		</button>	</td></tr>{#/for}";
						$("#divListAgreement").setTemplate(template);
						$("#divListAgreement").processTemplate(pobj);
					} else if(type=="search"){
						if(pobj.liCompAgg.length == 0){
							alert("Company Name Not Found");
							$("#strCompanyValue").val("");
						}else{
							var template=" {#foreach $T.liCompAgg as li}<tr><td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>	<td class='col-sm-1-1 center' style='height: 21.5px;'>{$T.li.id}</td>	<td class='col-sm-3-1 center' style='height: 21.5px;'>{$T.li.compNm}</td>	<td class='col-sm-1-1 center' style='height: 21.5px;'>		<button class='btn btn-xs btn-success editUserAccess' value='EDIT'			id='btnEdit{count}' onclick='editCompanyAgreement({$T.li.id})' disabled='disabled'>			<i class='fa fa-edit'></i>		</button>	</td>	<td class='col-sm-1-1 center' style='height: 21.5px;'><button class='btn btn-xs btn-success deleteUserAccess' value='DELETE' id='btnDelete{count}' onClick='deleteCompanyAgreement({$T.li.id})' disabled='disabled'>			<i class='fa fa-trash-o'></i>		</button>	</td></tr>{#/for}";
							$("#divListAgreement").setTemplate(template);
							$("#divListAgreement").processTemplate(pobj);
						}
					}else if(type=="policies"){
						var template="<option value='select'>-Select-</option>{#foreach $T.liCompAgg as li}<option value='{$T.li.id}'>{$T.li.compNm}</option>{#/for}";
						$("#sponsorType").setTemplate(template);
						$("#sponsorType").processTemplate(pobj);
					}
					setTimeout(function(){userAccess();},100);
				}
			});
}

function deleteCompanyAgreement(id){
	
	var r = confirm("Are you confirm to Delete Record?");
	if (r == true) {			
		var inputs = [];
		inputs.push('action=deleteCompanyAgreement');
		inputs.push('id='+id);
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
						alert(r);
						location.reload(this);
					}
				});	
	}
}

function editCompanyAgreement(id){
	var divList=$("#divList").html();
	pobj= eval('(' + divList + ')');
	for ( var i = 0; i < pobj.liCompAgg.length; i++) {
		if(id==(pobj.liCompAgg[i].id)){
			myObj=pobj.liCompAgg[i];
			$("#title").html("Edit Sponsor Company Details");
			$("#queryType").val("update");
			$("#id").val(myObj.id);
			
			$("#companyName").val(myObj.compNm);
			$("#agreementDate").val(myObj.aggDt);
			$("#agreementRefNo").val(myObj.aggRefNo);
			$("#effectiveFromDate").val(myObj.effFroDt);
			$("#effectiveToDate").val(myObj.effToDt);
			$("#agreementDetails").val(myObj.aggDe);
			$("#sponsorType").val(myObj.aggTyp);
			$("#customerName").val(myObj.custNm);
			
			if(myObj.hospSt=="Y"){
				$("#forHospitalStaff").attr('checked', true);
			}else{
				$("#forHospitalStaff").attr('checked', false);
			}
			if(myObj.defunct=="Y"){
				$("#defunct").attr('checked', true);
			}else{
				$("#defunct").attr('checked', false);
			}
			break;
		}
	}
 }

function showTempChartHallowiseChargesList(callFrom) {
	var cType = $("#cType :selected").val();

	if (cType == "" || cType == undefined || cType == "Select") {
		cType = 1;
	}
	count = 1;
	$("#save").html("");
	var inputs = [];
	inputs.push('action=defaultChartView');
	inputs.push('cType=' + cType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		// timeout : 1000 * 60 * 5,
		// cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			$("#chartObj").html(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			$("#chartAddTemp").setTemplate(defaultChartViewTemp);
			$("#chartAddTemp").processTemplate(pobj1);
		}
	});
}
/**
 * *************@author by Manisha -----
 * SearchOnEnterForAdminstrator(12-02-16)*********************
 */

function SearchAdministratorOnEnter(key, callFrom) {
	var keycode = (key.which) ? key.which : key.keyCode;

	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 8 || keycode == 9 || keycode == 127
			|| (keycode > 36 && keycode < 40) || keycode == 46) {
		return true;
	}

	else if (keycode == 13) {

		if (callFrom == "AcManag") {
			searchViewUser("AcManag");
		}else if (callFrom == "UserAccess") {
			searchViewUserAccess("UserAccess");
		}else if (callFrom == "HallTypeMang") {
			searchHallType("HallTypeMang");
		}else if (callFrom == "BedwardMang") {
			searchHall("BedwardMang");
		}else if (callFrom == "BillTowards") {
			searchTowards("BillTowards");
		}else if (callFrom == "investigationTest") {
			showInvstTestList("search");
		}else if (callFrom == "radiologyTest") {
			searchTest();
		}else if (callFrom == "radilogyBodyPart") {
			searchTest();
		}else if (callFrom == "InvestigationTestCharges") {
			showInvstTestList(); 
		}else if (callFrom == "ServiceDental") {
			searchTest(); 
		}else if (callFrom == "ServiceCasualty") {
			searchTest(); 
		}else if (callFrom == "ipdServices") {
			searchTest();
		}else if (callFrom == "ViewIPDServices") {
			defaultViewIPDServices("search");
		}else if (callFrom == "ViewGasServicesCharges") {
			defaultViewIPDServices("search");
		}else if (callFrom == "ViewInstruandEquiServices") {
			defaultViewIPDServices("search");
		}else if (callFrom == "ICD10codeMang") {
			fetchICD10Level1("search");
		}else if (callFrom == "ItemMang") {
			searchBothItems();
		}else if (callFrom == "sponsorDis") {
			searchPolicyAC();
		}else if (callFrom == "search") {
			featchDignoPatBill("search");
		}else {
			if (keycode != 32) {
				alert("Please Enter Alphabets only");
				return false;
			}
		}
	}
};

/**
 * *************@author by Manisha -----
 * SearchOnEnterForPathology(15-02-16)*********************
 */

function SearchPathologyOnEnter(key, callFrom) {
	var keycode = (key.which) ? key.which : key.keyCode;

	if ((keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123)
			|| keycode == 8 || keycode == 9 || keycode == 127
			|| (keycode > 36 && keycode < 40) || keycode == 46) {
		return true;
	}
	else if (keycode == 13) {
	
		if (callFrom == "search") {
			getGroups("search");
		}else if (callFrom == "searchPkg") {
			getPackages("searchPkg");
		}else if (callFrom == "searchProfile") {
			getProfiles("searchProfile");
		}else if (callFrom == "searchlabTest") {
			ViewlabtestList("searchlabTest");
		}else if (callFrom == "searchpathologyOrgan") {
			getLabOrgans("searchpathologyOrgan");
		}else if (callFrom == "searchDocCharges") {
			getDocChargeTypes("searchDocCharges");
		}else if (callFrom == "searchTestPatient") {
			getLabPatTypes("searchTestPatient");
		}else if (callFrom == "searchlabTestMethod") {
			ViewTestMethodList("searchlabTestMethod");
		}else if (callFrom == "searchlabSample") {
			ViewTestSampleList("searchlabSample");
		}else if (callFrom == "searchlabDocTechnician") {
			ViewDoctechnicianList("searchlabDocTechnician");
		}else if (callFrom == "labCollectionCenter") {
			ViewCollectionCenterList("labCollectionCenter");
		}else if (callFrom == "labTestPatientDashboard") {
			getLabTestPatientDashboard("labTestPatientDashboard");
		}else {

			
			if (keycode != 32) {
				alert("Please Enter Alphabets only");
				return false;
			}
		}
	}
};

function changeColorOfSelectingDoctor()
{
	var valueOfClr = $("#eventsAppointment").val();
	if(valueOfClr == "green") {
		$("#eventsAppointment").css('background-color', 'green');
	}else if (valueOfClr == 'orange') {
		$("#eventsAppointment").css('background', 'orange');
	} else if (valueOfClr == 'pink') {
		$("#eventsAppointment").css('background', 'pink');
	} else if (valueOfClr == 'red') {
		$("#eventsAppointment").css('background', 'red');
	}else if (valueOfClr == 'yellow') {
		$("#eventsAppointment").css('background', 'yellow');
	}		
}


/**
 * *************@author by Manisha -----
 * SearchICD10Level1(07-09-16)*********************
 */
function SearchICD10Level1(type){

	var icd10Codes;
	count = 1;
	
	var searchName = $("#byName").val();
	if(searchName == "") {
		alert("Please Enter Icd10 Code Name");
		return false;
	}
	
	if(($("#pageType").val()) != "DoctorDesk") {
		$("#icdManagementDiv").hide();
		$("#icdManagementDiv2").hide();
	}

	var inputs = [];
	inputs.push('action=fetchICD10Level1');
	inputs.push('type=' + type);
	var byName = $("#byName").val();
	inputs.push('byName=' + encodeURIComponent(byName));
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
			$("#hiddenIcdDetail").val(ajaxResponse);
			icd10Codes = eval('(' + ajaxResponse + ')');
			$("#DRRDiv1").setTemplate(icdLevel1Temp);
			$("#DRRDiv1").processTemplate(icd10Codes);		
			var Icd10Codes = icd10Codes.icd10_L_List.length;
			if (Icd10Codes == 0) {
				alert("These Icd10 Code Is Not Available.");
				$("#byName").val("");
				location.reload();
			}
			setTimeout(function(){userAccess();},100);
		}
	});

}

function getMAxID(){
	var inputs = [];
	inputs.push('action=MaxIDofList');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/MaxIDofList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			$("#txtListID").val(r);
		}
	});
}
function InsertList(queryType, updateFrom) {

	var txtListID =$("#txtListID").val(); 
	var txtCheckListName = $("#txtCheckListName").val();
	var txtRemark =$("#txtRemark").val();
	
	if(txtCheckListName == "" || txtCheckListName == undefined){
		alert("Please insert Checklist Name");
		return false;
	}
			var inputs = [];

			inputs.push('action=InsertList');
			inputs.push('queryType=' + queryType);
			inputs.push('txtListID=' + encodeURIComponent(txtListID));
			inputs.push('txtCheckListName=' + encodeURIComponent(txtCheckListName));
			inputs.push('txtRemark=' + encodeURIComponent(txtRemark));
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
			var str = inputs.join('&');

			jQuery.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				//url : "AdminServlet",
				url : "./ehat/otdata/InsertList",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					var ajaxResponse = r;
					
					if (updateFrom == "admin") {
						alert(r);
						window.location = "Pre-OperativeCheckList.jsp";
					}
				}
			});
}

function defaultCheckListView(callFrom,type,inputID) {
	
	var byName;
	if(type == "search"){
		byName = ($("#"+inputID).val()).trim();
		if (byName == "" || byName == undefined ) {
			alert("Please Enter Pre-Operative List Name!");
			return false;
		}
	}
	var inputs = [];
	inputs.push('action=FetchCheckList');
	inputs.push('callFrom=' + callFrom);
	inputs.push('byName=' + byName);
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "AdminServlet",
				url : "./ehat/otdata/FetchCheckList",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
					alert('error');
				},
				success : function(r) {
					ajaxResponse = r;
					
					pobj1 = eval( ajaxResponse );
					$("#objList").html(ajaxResponse);
					
					if(type == "search"){
						
						var resultData = [];
						
						var template = "";
						for ( var j = 0; j < r.Chkli.length; j++) {
							var arrValue = r.Chkli[j].ChkName;
							var idValue = r.Chkli[j].idChkList;
							resultData.push({
								ID : idValue,
								Name : arrValue
							});
							template = template + '<li data-value="' + idValue
									+ '" class=""><a href="#">' + arrValue
									+ '</a></li>';
						}
						$("#preOpCheckListId").val(idValue);
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
						
						if (callFrom == "PreOperativeCheckListMasterDetails") {
							
							pobj1 = resultData;
							$("#listMangTemp").setTemplate(defaultViewListTemp);
						}   $("#listMangTemp").processTemplate(pobj1);
						setTimeout(function(){userAccess();},100);
					
					}else{
						
						if (callFrom == "PreOperativeCheckListMasterDetails") {
							$("#listMangTemp").setTemplate(defaultViewListTemp);
						}   $("#listMangTemp").processTemplate(pobj1);
						setTimeout(function(){userAccess();},100);
					}
				}
			});
	
			function displayResult(item) {
		
				$("#" + inputID).val((item.text).trim());
				$("#txtDoctorId").val((item.value).trim());
			}
}

function deleteChkList(ListID) {

	var r = confirm("Confirm To Delete Pre-Operative Check List Details?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeleteChkList');
		inputs.push('ListID=' + ListID);
		inputs.push();
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			//url : "AdminServlet",
			url : "./ehat/otdata/DeleteChkList/",
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

var updateListHeaderTemp = '<h3>Edit Pre-Operative Check List</h3>';

var updateListButtonTemp = '<button class="btn btn-xs btn-success"  data-toggle="tooltip" data-placement="left" title="Save Check List Details" onclick=InsertList("update","admin") > <i class="fa fa-save"></i></button>';
function editChkList(ListID) {
	
	var myArray = ajaxResponse;
	
	var myObj ;
	for ( var i = 0; i < myArray.Chkli.length; i++) {
		if (myArray.Chkli[i].idChkList == ListID) {
			myObj = myArray.Chkli[i];
			break;
		}
	}
	var sample;
	$("#savebtn").setTemplate(updateListButtonTemp);
	$("#savebtn").processTemplate(sample);

	var sample1;
	$("#headerTag").setTemplate(updateListHeaderTemp);
	$("#headerTag").processTemplate(sample1);
	
	$("#txtListID").val(myObj.idChkList);
	$("#txtCheckListName").val(myObj.ChkName);
	$("#txtRemark").val(myObj.ChkRmk);
}

 //Author: Irfan Khan Date: 22-09-2016
function showPhysiotherapyTestList(search,type)
{
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if(searhFlag == "search")
	{
		if(searchText == "")
		{
			alert("Please Enter Test Name !");
			setFocus("#byName");
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=fetchPhysiotherapyTest');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {
			// var ajaxResponse = res;
			var result = res;
			$("#testDetails").html(result);
			var testObj = eval('(' + result + ')');
			if(searhFlag == "search" && testObj.physiotherapyList.length == 0){
				alert("Physiotherapy Test Not Found");
				$("#byName").val("");
				location.reload();
			}
		if(type == "charges"){
				$('#InvTestChrgsTable > thead > tr:nth-child(n+2)').remove();
				$('#InvTestChrgsTable > tbody > tr:nth-child(n+2)').remove();

		var halllist = $("#InvTestAllHallDetails").html();
		var halldetails = eval('(' + halllist + ')');
		var physiotherapyTestCharges = "<tr id = 'headerTr'>"
				+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
				+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>Physiotherapy Test Name</div></th>"
				/*
				 * + "<th class='center' style = 'width: 70px;'><div
				 * class='TextFont'>Test Code</div></th>" + "<th class='center' style = 'width: 150px;'><div
				 * class='TextFont'>Test Group</div></th>"
				 */
				+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";
		$
				.each(
						halldetails.hl,
						function(name, value) {
							physiotherapyTestCharges = physiotherapyTestCharges
									+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
									+ value.hn + "</div></th>";
						});
		physiotherapyTestCharges = physiotherapyTestCharges
				+ "</tr>";
		$('#PhysiotherapyTestHeading').after(physiotherapyTestCharges);

		var count = 1;
			//alert(testObj.physiotherapyList); 
		$.each(testObj.physiotherapyList,function(name, value) {

							var physiotherapyTestBody = "";
							physiotherapyTestBody = physiotherapyTestBody
									+ "<tr id=Test"
									+ count
									+ "><td class='center' style='height: 21.5px;width: 30px;'>"
									+ value.physiotherapyId
									+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
									+ value.physiotherapyTestName
									+ "</td>";

							var physiotherapyTestCharges = 0;
							var slaveid = 0;
							var hallid = 0;

							if (value.hallWsTestChrgsList.length > 0) {
								for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
									if (value.hallWsTestChrgsList[j].hallID == 0) {
										physiotherapyTestCharges = value.hallWsTestChrgsList[j].chrgs;
										slaveid = value.hallWsTestChrgsList[j].slaveId;
										hallid = 0;

										physiotherapyTestBody = physiotherapyTestBody
												+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
												+ value.physiotherapyId
												+ "-HallID"
												+ hallid
												+ " value = '"
												+ physiotherapyTestCharges
												+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'physiotherapyChargesSlaveID"
												+ value.physiotherapyId
												+ "-"
												+ hallid
												+ "' value = '"
												+ slaveid
												+ "' /></td>";
									}
								}
							} else {
								physiotherapyTestBody = physiotherapyTestBody
										+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
										+ value.physiotherapyId
										+ "-HallID"
										+ hallid
										+ " value = '"
										+ value.testCharges
										+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'physiotherapyChargesSlaveID"
										+ value.physiotherapyId
										+ "-"
										+ hallid
										+ "' value = '"
										+ slaveid + "' /></td>";
							}

							$.each(halldetails.hl,function(name,hallvalue) {

												var isPresent = 0;
												for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
													if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
														physiotherapyTestCharges = value.hallWsTestChrgsList[i].chrgs;
														slaveid = value.hallWsTestChrgsList[i].slaveId;
														hallid = value.hallWsTestChrgsList[i].hallID;
														isPresent = 1;
														break;
													} 
												}
													
												if (isPresent > 0) { 
													physiotherapyTestBody = physiotherapyTestBody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
													+ value.physiotherapyId
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ physiotherapyTestCharges
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'physiotherapyChargesSlaveID"
													+ value.physiotherapyId
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid
													+ "' /></td>";
												}else{
													
													physiotherapyTestCharges = value.testCharges;
													slaveid = 0;
													hallid = hallvalue.hi;
													
													physiotherapyTestBody = physiotherapyTestBody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
													+ value.physiotherapyId
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ physiotherapyTestCharges
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'physiotherapyChargesSlaveID"
													+ value.physiotherapyId
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid
													+ "' /></td>";
												}

											});

							physiotherapyTestBody = physiotherapyTestBody
									+ "</tr>";

							$('#Test' + (count - 1)).after(
									physiotherapyTestBody);
							count++;
						});
			}else{
				$("#InvstTestContent").setTemplate(InvstDefaultTestViewTemp);
				$("#InvstTestContent").processTemplate(testObj);
				$("#tid").val(0);
				disableTestTextbox();
				$("#queryType").val("insert");
			}
			$("#byName").val("");
		}
	});
}

 // Author: Irfan Khan Date: 26-09-2016
function showOtherServicesList(search,type)
{
	count = 1;
	var searhFlag = $.trim(search);
	var searchText = $.trim($("#byName").val());
	if(searhFlag == "search")
	{
		if(searchText == "")
		{
			alert("Please Enter Test Name !");
			setFocus("#byName");
			return false;
		}
	}

	var inputs = [];
	inputs.push('action=fetchOtherServices');
	inputs.push('searhFlag=' + searhFlag);
	inputs.push('searchText=' + encodeURIComponent(searchText));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		// timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(res) {
			// var ajaxResponse = res;
			var result = res;
			$("#testDetails").html(result);
			var testObj = eval('(' + result + ')');
			if(searhFlag == "search" && testObj.oslist.length == 0){
				alert("Service Not Found");
				$("#byName").val("");
				location.reload();
			}
		if(type == "charges"){
				$('#InvTestChrgsTable > thead > tr:nth-child(n+2)').remove();
				$('#InvTestChrgsTable > tbody > tr:nth-child(n+2)').remove();

		var halllist = $("#InvTestAllHallDetails").html();
		var halldetails = eval('(' + halllist + ')');
		var otherServiceCharges = "<tr id = 'headerTr'>"
				+ "<th class='center' style = 'width: 30px;'><div class='TextFont'>#</div></th>"
				+ "<th class='center' style = 'width: 200px;'><div class='TextFont'>Other Service Name</div></th>"
				/*
				 * + "<th class='center' style = 'width: 70px;'><div
				 * class='TextFont'>Test Code</div></th>" + "<th class='center' style = 'width: 150px;'><div
				 * class='TextFont'>Test Group</div></th>"
				 */
				+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>OPD Charges</div></th>";
		
				$.each(
						halldetails.hl,
						function(name, value) {
							
							otherServiceCharges = otherServiceCharges
									+ "<th class='center' style = 'width: 100px;'><div class='TextFont'>"
									+ value.hn + "</div></th>";
						});
		otherServiceCharges = otherServiceCharges
				+ "</tr>";
		$('#otherServicesHeading').after(otherServiceCharges);

		var count = 1;
		//alert(testObj.oslist.length);
		$.each(testObj.oslist,function(name, value ){
			
							var otherServicesBody = "";
							otherServicesBody = otherServicesBody
									+ "<tr id=Test"
									+ count
									+ "><td class='center' style='height: 21.5px;width: 30px;'>"
									+ value.osid
									+ "</td><td class='center' style='height: 21.5px;width: 200px;'>"
									+ value.osname
									+ "</td>";

							var otherServicesCharges = 0;
							var slaveid = 0;
							var hallid = 0;

							if (value.hallWsTestChrgsList.length > 0) {
								for ( var j = 0; j < value.hallWsTestChrgsList.length; j++) {
									if (value.hallWsTestChrgsList[j].hallID == 0) {
										otherServicesCharges = value.hallWsTestChrgsList[j].chrgs;
										slaveid = value.hallWsTestChrgsList[j].slaveId;
										hallid = 0;

										otherServicesBody = otherServicesBody
												+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
												+ value.osid
												+ "-HallID"
												+ hallid
												+ " value = '"
												+ otherServicesCharges
												+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OSChargesSlaveID"
												+ value.osid
												+ "-"
												+ hallid
												+ "' value = '"
												+ slaveid
												+ "' /></td>";
									}
								}
							} else {
								otherServicesBody = otherServicesBody
										+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
										+ value.osid
										+ "-HallID"
										+ hallid
										+ " value = '"
										+ value.oscharges
										+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OSChargesSlaveID"
										+ value.osid
										+ "-"
										+ hallid
										+ "' value = '"
										+ slaveid + "' /></td>";
							}

							$.each(halldetails.hl,function(name,hallvalue) {

												var isPresent = 0;
												for ( var i = 0; i < value.hallWsTestChrgsList.length; i++) {
													if (hallvalue.hi == value.hallWsTestChrgsList[i].hallID) {
														otherServicesCharges = value.hallWsTestChrgsList[i].chrgs;
														slaveid = value.hallWsTestChrgsList[i].slaveId;
														hallid = value.hallWsTestChrgsList[i].hallID;
														isPresent = 1;
														break;
													} 
												}
													
												if (isPresent > 0) { 
													otherServicesBody = otherServicesBody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
													+ value.osid
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ otherServicesCharges
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OSChargesSlaveID"
													+ value.osid
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid
													+ "' /></td>";
												}else{
													
													otherServicesCharges = value.oscharges;
													slaveid = 0;
													hallid = hallvalue.hi;
													
													otherServicesBody = otherServicesBody
													+ "<td class='center' style='height: 21.5px;width: 100px;'><input class='form-control input-SmallText' type = 'text' id=TestID"
													+ value.osid
													+ "-HallID"
													+ hallid
													+ " value = '"
													+ otherServicesCharges
													+ "' style = 'text-align:right;' onkeypress='return validateNumbers(event)' /><input type='hidden' id = 'OSChargesSlaveID"
													+ value.osid
													+ "-"
													+ hallid
													+ "' value = '"
													+ slaveid
													+ "' /></td>";
												}

											});

							otherServicesBody = otherServicesBody
									+ "</tr>";

							$('#Test' + (count - 1)).after(
									otherServicesBody);
							count++;
						});
			}else{
				$("#InvstTestContent").setTemplate(InvstDefaultTestViewTemp);
				$("#InvstTestContent").processTemplate(testObj);
				$("#tid").val(0);
				disableTestTextbox();
				$("#queryType").val("insert");
			}
			$("#byName").val("");
		}
	});
}

function setHRUsers(result)
{
	
	var divContent="";
	
	for(var i=0;i<result.ul.length;i++)
	{
		var fName=result.ul[i].fname.charAt(0);;
		var lName=result.ul[i].lname.charAt(0);;
		
		divContent=divContent+"<tr><td class='col-md-1-1'><strong>"+(i+1)+".</strong></td>"
		+ "<td class='col-md-1-1' id='divPi"+(i+1)+"'><strong>"+result.ul[i].ui+"</strong></td>"
		+ "<td class='numeric col-md-5-1' id='uname"+(i+1)+"'><span class='badge' style='background-color:red'>"+fName+""+lName+"</span> <strong>"+result.ul[i].title+" "+result.ul[i].fname+" "+result.ul[i].mname+" "+result.ul[i].lname+"</strong></td>"
		+ "<td class='numeric col-md-3-1 center' id='utype"+(i+1)+"'>"
		+ "<input style='font-size: 10px;' type='button' value='SET SALARY' onclick='setSalaryView("+result.ul[i].ui+")' /></td>"
		+ "<td class='numeric col-md-3-1 center'>"
		+ "<button value='PAY SALARY' id='btnEdit"+result.ul[i].ui+"' onclick='makeSalary("+result.ul[i].ui+")'>PAY SALARY<img width='18px;' height='18px;" +
				"' src='images/payment-512.png' alt=''></button></td>"
		+ "</tr>";
	}
	$("#userMangTemp").html(divContent);
	
	
	for ( var i = 0; i < result.ul.length; i++) {
		var j = result.ul[i].ui;
		if (result.ul[i].ua == 0)
			$('#btnEdit' + j).attr('disabled', 'disabled');
	}
	
	
}

function saveVitalHeading() {
	var vitalHeadingId = $("#txtVitalHeadingId").val();
	var vitalHeadingName = $("#txtVitalHeadingName").val();
	var queryType = $("#queryType").val();

	if (vitalHeadingName == "") {
		alert("Please Enter Vital Heading Name");
		SetFocus("txtVitalHeadingName");
		return false;
	}

	var inputs = [];
	inputs.push('action=saveVitalHeading');
	inputs.push('vitalHeadingId=' + vitalHeadingId);
	inputs.push('vitalHeadingName=' + vitalHeadingName);
	inputs.push('queryType=' + queryType);
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
		success : function(ajaxResponse) {
			alert(ajaxResponse);
			location.reload();
			$("#txtVitalHeadingName").val("");
			$("#queryType").val("insert");
			
		}
	});
}

function fetchVitalHeading(pagename) {

	var inputs = [];
	inputs.push('action=fetchVitalHeading');

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
			$("#vitalHeadData").html(ajaxResponse);
			
			pobj = eval('(' + ajaxResponse + ')');
			var htm='';
			
			for(var i=0;i < pobj.listVitalHeading.length;i++)
				{
					htm = htm + '<tr>'
					+'<td class="col-md-1-1 center">'+(i+1)+'</td>'
					+'<td class="col-md-2-1 center">'+pobj.listVitalHeading[i].vitalHeadingId+'</td>'
					+'<td class="col-md-5-1 ">'+pobj.listVitalHeading[i].vitalHeadingName+'</td>'
					+'<td class="numeric col-md-2-1 center" >'
					+'<button id="btnEdit" class="btn btn-xs btn-success" onclick="editVitalHead('+pobj.listVitalHeading[i].vitalHeadingId+')" value="EDIT">'
					+'<i class="fa fa-edit"></i>'
					+'</button>'
					+'</td>'
					+'<td class="numeric col-md-2-1 center" >'
					+'<button id="btnDelete" class="btn btn-xs btn-danger" onclick="deleteVitalHeading('+pobj.listVitalHeading[i].vitalHeadingId+')" value="DELETE">'
					+'<i class="fa fa-trash-o"></i>'
					+'</button>'
					+'</td>'
					
				}
			$('#vitalHeadingBody').html(htm);
		}
	});
}

function editVitalHead(vhid) {

	var ajaxResponse = $("#vitalHeadData").html();
	var myArray = JSON.parse(ajaxResponse);
	var myObj;
	for ( var i = 0; i < myArray.listVitalHeading.length; i++) {
		if (myArray.listVitalHeading[i].vitalHeadingId == vhid) {
			myObj = myArray.listVitalHeading[i];
			break;
		}
	}
	$("#txtVitalHeadingId").val(vhid);
	$("#txtVitalHeadingName").val(myObj.vitalHeadingName);
	$("#queryType").val("update");
	
}
function deleteVitalHeading(vhid) {

	var r = confirm("Are you sure to delete the record ?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=deleteVitalHeading');
		inputs.push('vitalHeadingId=' + vhid);

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
			success : function(ajaxResponse) {
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}
function getQueMAxID(){
	var inputs = [];
	inputs.push('action=MaxIDofQueList');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			$("#txtQueID").val(r);
		}
	});
}
function InsertQue(queryType, updateFrom) {
	
	dynaCountt = $("#dynaCountt").val();
	var txtQueID =$("#txtQueID").val(); 
	var txtQue = $("#txtQue").val();
	var txtQueType = $("#txtQueType").val();
	var txthraType = $("#txthraType").val();
	if(txtQue == "" || txtQue == undefined ){
		alert("Please Enter Question ");
		return false;
	}
	if(txthraType == "" || txthraType == undefined ){
		alert("Please Select HRA Type");
		return false;
	}
	if(txtQueType == "" || txtQueType == undefined ){
		alert("Please Select Question Type");
		return false;
	}
	var objOpt = 0;
	objOpt = {
		Optli : []
	};

	if(txtQueType == "radio"){
		var count = 0;
		if (dynaCountt == 0) {
			// alert("You can not save empty fields.");
			// return false;
		}
		for ( var i = 1; i <= dynaCountt; i++) {
			count++;
			var txtRadio = $.trim($("#txtRadio" + count + "").val());
			var hiddenId = $("#hiddenId" + count + "").val();
			if (queryType == "insert") {
				if (txtRadio == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtRadio" + count + "").focus());
					return false;
				}
			}
			if (txtRadio != undefined) {
				objOpt.Optli.push({
					"OptName" : txtRadio,
					"idOpt" : hiddenId
				});
			}
		}
		if (queryType == "insert") {
			if (objOpt.Optli.length == 0) {
				alert("You Can Not Save Empty Field");
				return false;
			}
		}
		objOpt = JSON.stringify(objOpt);
		
	}else if(txtQueType == "checkbox"){
		var count = 0;
		if (dynaCountt == 0) {
			// alert("You can not save empty fields.");
			// return false;
		}
		for ( var i = 1; i <= dynaCountt; i++) {
			count++;
			var txtCheckbox = $.trim($("#txtCheckbox" + count + "").val());
			var hiddenId = $("#hiddenId" + count + "").val();
			if (queryType == "insert") {
				if (txtCheckbox == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtCheckbox" + count + "").focus());
					return false;
				}
			}
			if (txtCheckbox != undefined) {
				objOpt.Optli.push({
					"OptName" : txtCheckbox,
					"idOpt" : hiddenId
				});
			}
		}
		if (queryType == "insert") {
			if (objOpt.Optli.length == 0) {
				alert("You Can Not Save Empty Field");
				return false;
			}
		}
		objOpt = JSON.stringify(objOpt);
		
	}else {
		if (dynaCountt == 0) {
			// alert("You can not save empty fields.");
			// return false;
		}
			var textName = $.trim($("#txtText").val());
			var hiddenId = $("#hiddenId").val();
			if (queryType == "insert") {
				if (textName == "") {
					alert("You Can Not Save Empty Field");
					$.trim($("#txtText").focus());
					return false;
				}
			}
			if (textName != undefined) {
				objOpt.Optli.push({
					"OptName" : textName,
					"idOpt" : hiddenId
				});
			}
		
		if (queryType == "insert") {
		if (objOpt.Optli.length == 0) {
			alert("You Can Not Save Empty Field");
			return false;
		}
	}
	objOpt = JSON.stringify(objOpt);
	}
			var inputs = [];
			inputs.push('action=InsertQue');
			inputs.push('queryType=' + queryType);
			inputs.push('txtQueID=' + encodeURIComponent(txtQueID));
			inputs.push('txtQue=' + encodeURIComponent(txtQue));
			inputs.push('txtQueType=' + encodeURIComponent(txtQueType));
			inputs.push('txthraType=' + encodeURIComponent(txthraType));
			inputs.push('objOpt=' + objOpt);
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
					var ajaxResponse = r;
					if (updateFrom == "admin") {
						alert(r);
						window.location = "QuestionMaster.jsp";
					}
				}
			});
}

function defaultQueListView(callFrom,type) {
	var byName;
	if(type == "search"){
	byName = ($("#byName").val()).trim();
	if(byName == "" || byName == undefined ){
		alert("Please Search By Question!");
		return false;
	}
	}
	var inputs = [];
	inputs.push('action=FetchQueList');
	inputs.push('callFrom=' + callFrom);
	inputs.push('byName=' + byName);
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					ajaxResponse = r;
					pobj1 = eval('(' + ajaxResponse + ')');
					$("#objQue").html(ajaxResponse);
					if (callFrom == "QuestionMasterDetails") {
						$("#listQueTemp").setTemplate(defaultViewQueTemp);
					    $("#listQueTemp").processTemplate(pobj1);
					}
					count=1;
					}
			});
}

function deleteQueList(QueID) {

	var r = confirm("Confirm To Delete Question Details?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeleteQueList');
		inputs.push('QueID=' + QueID);
		inputs.push();
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
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

var updateQueHeaderTemp = '<h3>Edit Question</h3>';

var updateQueButtonTemp = '<button class="btn btn-xs btn-success"  data-toggle="tooltip" data-placement="left" title="Save Question" onclick=InsertQue("update","admin") > <i class="fa fa-save"></i></button>';
function editQueList(QueID) {
	
	$("#idRadio").html("");
	$("#idCheckbox").html("");
	$("#idText").html("");
	ajaxResponse = $("#objQue").html();
	var myArray = JSON.parse(ajaxResponse);
	var myObj ;
	for ( var i = 0; i < myArray.Quelist.length; i++) {
		if (myArray.Quelist[i].idQue == QueID) {
			myObj = myArray.Quelist[i];
			break;
		}
	}
	var sample;
	$("#savebtn").setTemplate(updateQueButtonTemp);
	$("#savebtn").processTemplate(sample);

	var sample1;
	$("#headerTag").setTemplate(updateQueHeaderTemp);
	$("#headerTag").processTemplate(sample1);
	
	$("#txtQueID").val(QueID);
	$("#txthraType").val(myObj.hraTypeId);
	$("#txtQue").val(myObj.Que);
	$("#txtQueType").val(myObj.QueType);
	
	var cnt = myArray.Quelist[i].Optli.length;
	var type = myObj.QueType;
	if(type == "radio"){
		var templater = $("#idRadio").html();
		for( var i = 0; i < cnt; i++){
			dynaCount = $("#dynaCountt").val();
			var defaultRadioDynaTemp1 = "";
			if(i == 0){
			dynaCount++ ;
			defaultRadioDynaTemp1 = '<div id="idRadioDiv">'
				+ ' <label class="TextFont">Radio Lable:</label>'
				+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" value="'+myObj.Optli[0].OptName+'" id="txtRadio'
				+ dynaCount
				+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
				+ '<a onClick=addQueAnsField("radio")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+myObj.Optli[0].idOpt+'"></label></div>';
			}
			if(i > 0){
				dynaCount++ ;
				defaultRadioDynaTemp1 = defaultRadioDynaTemp1 + '<div id="idRadioDiv">'
				+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" value="'+myObj.Optli[i].OptName+'" id="txtRadio'
				+ dynaCount
				+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
				+ '<a onClick=delQueAnsField("radio")><i class="fa fa-minus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+myObj.Optli[i].idOpt+'"></label></div>';
			}
			templater = templater + defaultRadioDynaTemp1;
			$("#idRadio").html(templater);
			$("#dynaCountt").val(dynaCount);
		}
		
	}else if(type == "checkbox"){
		var templater = $("#idCheckbox").html();
		for( var i = 0; i < cnt; i++){
			dynaCount = $("#dynaCountt").val();
			var defaultCheckboxDynaTemp1 = "";
			if(i == 0){
			dynaCount++ ;
			defaultCheckboxDynaTemp1 = '<div id="idChkDiv">'
			+ '<label class="TextFont">Checkbox Lable:</label>' 
			+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" value="'+myObj.Optli[0].OptName+'" id="txtCheckbox'
			+ dynaCount
			+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
			+ '<a onClick=addQueAnsField("checkbox")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+myObj.Optli[0].idOpt+'"></label></div>';
			}
			if(i > 0){
			dynaCount++ ;
			defaultCheckboxDynaTemp1 ='<div id="idChkDiv">'
			+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" value="'+myObj.Optli[i].OptName+'" id="txtCheckbox'
			+ dynaCount
			+ '"><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
			+ '<a onClick=delQueAnsField("checkbox")><i class="fa fa-minus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="'+myObj.Optli[i].idOpt+'"></label></div>';
			}
			templater = templater + defaultCheckboxDynaTemp1;
			$("#idCheckbox").html(templater);
			$("#dynaCountt").val(dynaCount);
	}
	}else{
		var templater = $("#idText").html();
		for( var i = 0; i < cnt; i++){
			dynaCount = $("#dynaCountt").val();
			var defaultTextDynaTemp1 = "";
			dynaCount++ ;
			defaultTextDynaTemp1 = '<div id="idTxtDiv">'
			+ '<label class="TextFont">Text:</label>' 
			+ '<input type="text" class="form-control input-SmallText" name="txtText" value="'+myObj.Optli[0].OptName+'" id="txtText">'
			+ '<label class="btn" class="form-control input-SmallText" id="dynaCount" value="'+ dynaCount +'">'
			+ '<input type="text" hidden="hidden" id="hiddenId" value="'+myObj.Optli[0].idOpt+'"></label></div>';
			templater = templater + defaultTextDynaTemp1;
			$("#idText").html(templater);
			$("#dynaCountt").val(dynaCount);
	}
	}
	
}

function gethraMAxID(){
	var inputs = [];
	inputs.push('action=MaxIDofhraList');
	inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
			$("#txthraID").val(r);
		}
	});
}
function InsertHRA(queryType, updateFrom) {

	var txthraID =$("#txthraID").val(); 
	var txthra = $("#txthra").val();
	if(txthra == "" || txthra == undefined ){
		alert("Please Enter HRA Type");
		return false;
	}
			var inputs = [];

			inputs.push('action=InsertHRA');
			inputs.push('queryType=' + queryType);
			inputs.push('txthraID=' + encodeURIComponent(txthraID));
			inputs.push('txthra=' + encodeURIComponent(txthra));
			inputs.push('synchronizeToken=' + $("#synchronizeToken").val());
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
					var ajaxResponse = r;
					
					if (updateFrom == "admin") {
						alert(r);
						window.location = "HraTypeMaster.jsp";
					}
				}
			});
}

function defaulthraListView(callFrom,type) {
	var byName;
	if(type == "search"){
	byName = ($("#byName").val()).trim();
	if(byName == "" || byName == undefined ){
		alert("Please Search By HRA Type!");
		return false;
	}
	}
	var inputs = [];
	inputs.push('action=FetchhraList');
	inputs.push('callFrom=' + callFrom);
	inputs.push('byName=' + byName);
	inputs.push('type=' + type);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "GET",
				data : str + "&reqType=AJAX",
				//url : "AdminServlet",
				url : "./ehat/otdata/FetchhraList",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					ajaxResponse = r;
					//alert(ajaxResponse);
					pobj1 = ajaxResponse ;
					$("#objhra").html(ajaxResponse);
					if (callFrom == "hraTypeMasterDetails") {
						$("#listhraTemp").setTemplate(defaultViewhraTemp);
					    $("#listhraTemp").processTemplate(pobj1);
					}
					if (callFrom == "QuestionMasterDetails") {
						$("#txthraType").setTemplate(defaultViewQueSelTemp);
					    $("#txthraType").processTemplate(pobj1);
					}
					if (callFrom == "OTOperationAction") {
						$("#txthraProtoType").setTemplate(defaultViewHraTypeTemp);
					    $("#txthraProtoType").processTemplate(pobj1);
					}
					if (callFrom == "OTOperationDetails") {
						$("#txthraProtoType").setTemplate(defaultViewHraTypeTemp);
					    $("#txthraProtoType").processTemplate(pobj1);
					}
					count = 1;
					}
			});
}

function deleteHRAList(hraID) {

	var r = confirm("Confirm To Delete HRA Type Details?");
	if (r == true) {
		var inputs = [];
		inputs.push('action=DeletehraList');
		inputs.push('hraID=' + hraID);
		inputs.push();
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
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			}
		});
	}
}

var updatehraHeaderTemp = '<h3>Edit HRA Type</h3>';

var updatehraButtonTemp = '<button class="btn btn-xs btn-success"  data-toggle="tooltip" data-placement="left" title="Save HRA Type" onclick=InsertHRA("update","admin") > <i class="fa fa-save"></i></button>';
function editHRAList(hraID) {
	
	var myArray = JSON.parse(ajaxResponse);
	
	var myObj ;
	for ( var i = 0; i < myArray.hralist.length; i++) {
		if (myArray.hralist[i].idhra == hraID) {
			myObj = myArray.hralist[i];
			break;
		}
	}
	var sample;
	$("#savebtn").setTemplate(updatehraButtonTemp);
	$("#savebtn").processTemplate(sample);

	var sample1;
	$("#headerTag").setTemplate(updatehraHeaderTemp);
	$("#headerTag").processTemplate(sample1);
	
	$("#txthraID").val(myObj.idhra);
	$("#txthra").val(myObj.hraType);
}
var dynaCount = 1;
function showQueTypeDiv() {
	var type = $("#txtQueType").val();
	if (type == "text") {
		$("#idRadio").hide();
		$("#idCheckbox").hide();
		$("#idText").show();
		$("#idText").html(defaultTextTemp);
		$("#dynaCountt").val(0);
	} else if(type == "radio") {
		$("#idText").hide();
		$("#idCheckbox").hide();
		$("#dynaCountt").val(1);
		$("#idRadio").show();
		$("#idRadio").html(defaultRadioTemp);
		//$("#dynaCountt").val(dynaCount);
	} else if(type == "checkbox") {
		$("#idText").hide();
		$("#idRadio").hide();
		$("#dynaCountt").val(1);
		$("#idCheckbox").show();
		$("#idCheckbox").html(defaultCheckboxTemp);
		//$("#dynaCountt").val(dynaCount);
	} else{
		$("#idText").hide();
		$("#idRadio").hide();
		$("#idCheckbox").hide();
		$("#dynaCountt").val(0);
	}
}


var defaultTextTemp ='<label class="TextFont">Text:</label>'
	+'<input type="text" class="form-control input-SmallText" name="txtText" id="txtText" value="-"/>';

var defaultRadioTemp = '<div id="idRadioDiv">'
		+ ' <label class="TextFont">Radio Lable:</label>'
		+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" id="txtRadio'
		+ dynaCount
		+ '"/><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
		+ '<a onClick=addQueAnsField("radio")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="0"/></label></div>';

var defaultCheckboxTemp ='<div id="idChkDiv">'
		+ '<label class="TextFont">Checkbox Lable:</label>' 
		+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" id="txtCheckbox'
		+ dynaCount
		+ '"/><label class="btn" class="form-control input-SmallText" id="dynaCount'+ dynaCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ dynaCount +'">'
		+ '<a onClick=addQueAnsField("checkbox")><i class="fa fa-plus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ dynaCount +'" value="0"/></label></div>';

function addQueAnsField(type){
	
	var questionCount = $("#dynaCountt").val();
	questionCount++ ;
	if(type == "radio"){
		
		var templater = $("#idRadio").html();
		
		var defaultRadioDynaTemp = '<div id="idRadioDiv">'
			+ ' <input type="text" class="form-control input-SmallText" name="txtRadio" id="txtRadio'
			+ questionCount
			+ '"/><label class="btn" class="form-control input-SmallText" id="dynaCount'+ questionCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ questionCount +'">'
			+ '<a onClick=delQueAnsField("radio")><i class="fa fa-minus"></i><a/><input type="text" hidden="hidden" id="hiddenId'+ questionCount +'" value="0"/></label></div>';
		templater = templater + defaultRadioDynaTemp;
		$("#idRadio").html(templater);
		$("#dynaCountt").val(questionCount);
	}
	if(type == "checkbox"){
		
		var templater = $("#idCheckbox").html();
		
		var defaultCheckboxDynaTemp ='<div id="idChkDiv">'
			+ '<input type="text" class="form-control input-SmallText" name="txtCheckbox" id="txtCheckbox'
			+ questionCount
			+ '"/><label class="btn" class="form-control input-SmallText" id="dynaCount'+ questionCount +'" style="margin-left: 250px; margin-top: -37px;" value="'+ questionCount +'">'
			+ '<a onClick=delQueAnsField("checkbox")><i class="fa fa-minus"></i></a><input type="text" hidden="hidden" id="hiddenId'+ questionCount +'" value="0"/></label></div>';
		templater = templater + defaultCheckboxDynaTemp;
		$("#idCheckbox").html(templater);
		$("#dynaCountt").val(questionCount);
	}
}

function delQueAnsField(type){
	if(type == "radio"){
		dynaCountt = $("#dynaCountt").val();
		$("#txtRadio" + dynaCountt).remove();
		$("#dynaCount" + dynaCountt).remove();
		var dcnt = dynaCountt;
		dcnt--;
		$("#dynaCountt").val(dcnt);
	}
	else if(type == "checkbox"){
		dynaCountt = $("#dynaCountt").val();
		$("#txtCheckbox" + dynaCountt).remove();
		$("#dynaCount" + dynaCountt).remove();
		var dcnt = dynaCountt;
		dcnt--;
		$("#dynaCountt").val(dcnt);
	}
}
function getHRAQue(hraId){
	var pid = $("#pId").val();
	var tomid = $("#tomId").val();
	var returnType = $("#pageName").val();
	var inputs = [];
	inputs.push('action=getHRAQue');
	inputs.push('pid=' + pid);
	inputs.push('tomid=' + tomid);
	inputs.push('hraId=' + hraId);
	var str = inputs.join('&');
	jQuery
			.ajax({
				async : true,
				type : "POST",
				data : str + "&reqType=AJAX",
				url : "AdminServlet",
				timeout : 1000 * 60 * 5,
				cache : false,
				error : function() {
				},
				success : function(r) {
					ajaxResponse = r;
					$("#objhraque").html(ajaxResponse);
					var pobj1 = eval('(' + ajaxResponse + ')');
					var result=JSON.parse(ajaxResponse);
					var divContent="";
					var textCount = 1;
					if(returnType == "OTOperationDetails"){
						for(var i=0;i<result.hralist.length;i++)
						{
							divContent=divContent+"<div class='col-md-12-1' style='margin-top: 10px;'><div class='col-md-1-1'><h5>"+(i+1)+".</h5></div>"
							+ "<div class='col-md-11-1' id='divPi"+(i+1)+"'><h5>"+result.hralist[i].que+"</h5></div></div><input type='hidden' id='QueId"+(i+1)+"' value='"+result.hralist[i].que+"'>"
							if (result.hralist[i].Optlist.length>0) {
								if(result.hralist[i].queType == "radio" || result.hralist[i].queType == "checkbox"){
									divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>"
									+ "<div class='col-md-12-1' id='divCb"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>"
										var a = 0;
										for ( var k = 0; k <  result.hralist[i].Anslist.length; k++) {
											var itopts = result.hralist[i].Anslist[k].optid;
										for ( var j = 0; j < result.hralist[i].Optlist.length; j++) {
											var idopt = result.hralist[i].Optlist[j].idOpt;
												var parts = itopts.split(",");
										        var itopt = parts[a];
										        if(idopt == itopt){
										        	a++;
										        	if(result.hralist[i].queType == "radio"){
										        		divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.hralist[i].IdQue+"' checked='true' name='IdRadioAns"+result.hralist[i].IdQue+"' id='IdRadioAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' checked readonly='true'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"
										        	}
										        	else{
										        		divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.hralist[i].IdQue+"' checked='true' name='IdCheckboxAns"+result.hralist[i].IdQue+"' id='IdCheckboxAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;' readonly='true'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"	
										        	}
											    	
												}else{
													if(result.hralist[i].queType == "radio"){
														divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.hralist[i].IdQue+"' name='IdRadioAns"+result.hralist[i].IdQue+"' id='IdRadioAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' readonly='true'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"
													}
													else{
														divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.hralist[i].IdQue+"' name='IdCheckboxAns"+result.hralist[i].IdQue+"' id='IdCheckboxAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;' readonly='true'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"	
													}
										        	
												}
											}
										}
										for ( var j = 0; j < result.hralist[i].Optlist.length; j++) {
											if(result.hralist[i].Anslist== 0){
												if(result.hralist[i].queType == "radio"){
													divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.hralist[i].IdQue+"' name='IdRadioAns"+result.hralist[i].IdQue+"' id='IdRadioAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' readonly='true'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"
												}
												else{
													divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.hralist[i].IdQue+"' name='IdCheckboxAns"+result.hralist[i].IdQue+"' id='IdCheckboxAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;' readonly='true'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"
												}
												
											}
										}
										
									divContent=divContent+ "</div></div>" 
								}
								else if(result.hralist[i].queType == "text"){
									divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>"
									+ "<div class='col-md-12-1' id='divT"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>"
									for(var l=0;l<result.hralist[i].Anslist.length;l++){
										divContent=divContent+ "<textarea type='text' class='textAnswer "+result.hralist[i].IdQue+"' name='IdTextAns"+result.hralist[i].IdQue+"' id='IdTextAns-"+textCount+"' value='' style='margin-top: 10px; margin-left: 70px; height: 40px; width: 650px;' readonly='true'>"+result.hralist[i].Anslist[l].txtAns+"</textarea></div></div>" 
									}
									if(result.hralist[i].Anslist.length == 0){
										divContent=divContent+ "<textarea type='text' class='textAnswer "+result.hralist[i].IdQue+"' name='IdTextAns"+result.hralist[i].IdQue+"' id='IdTextAns-"+textCount+"' value='' style='margin-top: 10px; margin-left: 70px; height: 40px; width: 650px;' readonly='true'>-</textarea></div></div>"
									}
									textCount++;
								}
							}
						}
					}
					
					else{
						for(var i=0;i<result.hralist.length;i++)
						{
							divContent=divContent+"<div class='col-md-12-1' style='margin-top: 10px;'><div class='col-md-1-1'><h5>"+(i+1)+".</h5></div>"
							+ "<div class='col-md-11-1' id='divPi"+(i+1)+"'><h5>"+result.hralist[i].que+"</h5></div></div><input type='hidden' id='QueId"+(i+1)+"' value='"+result.hralist[i].que+"'>"
							if (result.hralist[i].Optlist.length>0) {
								if(result.hralist[i].queType == "radio" || result.hralist[i].queType == "checkbox"){
									divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>"
									+ "<div class='col-md-12-1' id='divCb"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>"
										var a = 0;
										for ( var k = 0; k <  result.hralist[i].Anslist.length; k++) {
											var itopts = result.hralist[i].Anslist[k].optid;
										for ( var j = 0; j < result.hralist[i].Optlist.length; j++) {
											var idopt = result.hralist[i].Optlist[j].idOpt;
												var parts = itopts.split(",");
										        var itopt = parts[a];
										        if(idopt == itopt){
										        	a++;
										        	if(result.hralist[i].queType == "radio"){
										        		divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.hralist[i].IdQue+"' checked='true' name='IdRadioAns"+result.hralist[i].IdQue+"' id='IdRadioAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' checked>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"
										        	}
										        	else{
										        		divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.hralist[i].IdQue+"' checked='true' name='IdCheckboxAns"+result.hralist[i].IdQue+"' id='IdCheckboxAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"	
										        	}
											    	
												}else{
													if(result.hralist[i].queType == "radio"){
														divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.hralist[i].IdQue+"' name='IdRadioAns"+result.hralist[i].IdQue+"' id='IdRadioAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' >&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"
													}
													else{
														divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.hralist[i].IdQue+"' name='IdCheckboxAns"+result.hralist[i].IdQue+"' id='IdCheckboxAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"	
													}
										        	
												}
											}
										}
										for ( var j = 0; j < result.hralist[i].Optlist.length; j++) {
											if(result.hralist[i].Anslist== 0){
												if(result.hralist[i].queType == "radio"){
													divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' class='radioAnswer "+result.hralist[i].IdQue+"' name='IdRadioAns"+result.hralist[i].IdQue+"' id='IdRadioAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;  border-top:1pt solid black;' >&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"
												}
												else{
													divContent=divContent+ "<label style='margin-top: 10px; margin-left: 70px;'>"+(j+1)+".</label>&nbsp;&nbsp;&nbsp;&nbsp;<input type='checkbox' class='checkAnswer "+result.hralist[i].IdQue+"' name='IdCheckboxAns"+result.hralist[i].IdQue+"' id='IdCheckboxAns-"+result.hralist[i].Optlist[j].idOpt+"' style='margin-top: 10px;'>&nbsp;&nbsp;&nbsp;&nbsp;"+result.hralist[i].Optlist[j].OptName+"</input>&nbsp;&nbsp;"
												}
												
											}
										}
										
									divContent=divContent+ "</div></div>" 
								}
								else if(result.hralist[i].queType == "text"){
									divContent=divContent+ "<div class='col-md-12-1' style='margin-top: 5px;'>"
									+ "<div class='col-md-12-1' id='divT"+(i+1)+"' style='border-bottom:1pt solid #ddd;'>"
									for(var l=0;l<result.hralist[i].Anslist.length;l++){
										divContent=divContent+ "<textarea type='text' class='textAnswer "+result.hralist[i].IdQue+"' name='IdTextAns"+result.hralist[i].IdQue+"' id='IdTextAns-"+textCount+"' value='' style='margin-top: 10px; margin-left: 70px; height: 40px; width: 650px;'>"+result.hralist[i].Anslist[l].txtAns+"</textarea></div></div>" 
									}
									if(result.hralist[i].Anslist.length == 0){
										divContent=divContent+ "<textarea type='text' class='textAnswer "+result.hralist[i].IdQue+"' name='IdTextAns"+result.hralist[i].IdQue+"' id='IdTextAns-"+textCount+"' value='' style='margin-top: 10px; margin-left: 70px; height: 40px; width: 650px;'>-</textarea></div></div>"
									}
									textCount++;
								}
							}
						}
					}
					
					divContent=divContent+"<input type='hidden' id='hraId' value='"+hraId+"'>"
					$("#hraQuestionBody").html(divContent);
					hraQuePopUp(hraId);
				}
			});
}
function hraQuePopUp(hraId){
	$("#viewHRAQueModal").modal('show');	
}
function saveQueAns(){
	
	var pid = $("#pId").val();
	var tomid = $("#tomId").val();
	var hraid = $("#hraId").val();
	var optionChecked = [];
    $('.radioAnswer:checked').map(function(){
    	optionChecked.push((this.id).split("-")[1]+"@"+$(this).attr('class').split(" ")[1]);
    });
    var checkAnswer = [];
    $('.checkAnswer:checked').map(function(){
    	checkAnswer.push((this.id).split("-")[1]+"@"+$(this).attr('class').split(" ")[1]);
    });
    
    var textAnswerLength=$('.textAnswer').length+1;
    var textAnswer=[];
    for(var i=1;i<textAnswerLength;i++){
    	var questionId=($('#IdTextAns-'+i).attr('class')).split(" ")[1];
    	var text=$('#IdTextAns-'+i).val();
        if(text!=null && text!=""){
            textAnswer.push(questionId+"@"+text);
        }
    }
    var inputs = [];
    inputs.push('tomid=' + tomid);
    inputs.push('hraid=' + hraid);
    inputs.push('pid=' + pid);
    inputs.push('optionChecked=' + optionChecked);
    inputs.push('checkAnswer=' + checkAnswer);
    inputs.push('textAnswer=' + textAnswer);
    inputs.push('action=saveQueAns');
    var str = inputs.join('&');
        jQuery.ajax({
            async : true,
            type : "POST",
            data :  str + "&reqType=AJAX",
            url : "AdminServlet",
            timeout : 1000 * 60 * 5,
            catche : false,
            error : function() {
            },
            success : function(r) {
            	alert(r);
            }
        });
}
//@author : Tushar @date : 16-Jan-2017 @reason : to fetch Hall Name List
var loadHallWiseTempForReport = "<option value='select'>--Select--</option>{#foreach $T. hl as hnli}  <option	value='{$T.hnli.hi}'> {$T.hnli.hn} </option> {#/for}";

function loadHallWise(str) {
	var inputs = [];
	inputs.push('action=fetchHallWise');
	inputs.push('htype='+ str);
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
			ajaxResponse = r;
			
			pobj1 = eval('(' + ajaxResponse + ')');
			setTimeout(function() {
				$("#divhallwise").show();
				$("#hallwise").setTemplate(loadHallWiseTempForReport);
				$("#hallwise").processTemplate(pobj1);
			}, 5);
		}
	});
}
//@author : Tushar @date : 19-Jan-2017 @reason : to fetch Surgeon Name List
var setSurgeonTemplate = "<option value='select'>--Select--</option>{#foreach $T.dl as dl}  <option value='{$T.dl.ui}'> {$T.dl.dn} </option> {#/for}";

function getSurgeonList(type){
	
	var inputs = [];
	inputs.push('action=fetchListOfSurgeons');
	inputs.push('type='+ type);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			if(type=="surgeon"){
			$("#divOTBillsur").show();	
			$("#surgeonWise").setTemplate(setSurgeonTemplate);
			$("#surgeonWise").processTemplate(pobj1);
			}
			else if(type=="anaesthe"){
			$("#divOTBillane").show();
			$("#anaesthetistWise").setTemplate(setSurgeonTemplate);
			$("#anaesthetistWise").processTemplate(pobj1);
			}
			else if(type=="assSurgeon"){
			$("#divOTBillassis").show();
			$("#assisWise").setTemplate(setSurgeonTemplate);
			$("#assisWise").processTemplate(pobj1);
			}
		}
	});
}

//var SelOperationDataTemplate = "<option value='0'>--Select Operation--</option>{#foreach $T.toli as tl}  <option value='{$T.tl.id}'> {$T.tl.on} </option> {#/for}";
var SelOperationDataTemplate = "{#foreach $T.toli as tl}  <option value='{$T.tl.id}'> {$T.tl.on} </option> {#/for}";

//@author : Tushar @date : 2-May-2017 @reason : to fetch Operation Data
/*function fetchOperationsData(){
	var pid = $("#pid").val();
	var tid = $("#tid").val();
	
	var inputs = [];
	inputs.push('action=fetchOperationsData');
	inputs.push('pid='+ pid);
	inputs.push('tid='+ tid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "AdminServlet",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			
		},
		success : function(r) {
			var ajaxResponse = r;
			
			var OprnName ="";
			var tomId = 0;
			var pobj1 =JSON.parse(ajaxResponse.decodeSpecialChars());
		
			for(var i = 0; i < pobj1.toli.length; i++){
				if(pobj1.toli[i].on != "" || pobj1.toli[i].on != null){
					OprnName = pobj1.toli[i].on; 
					tomId= pobj1.toli[i].id;
				}
				$("#tomId").val(tomId);
				$("#idSelOperationData").setTemplate(SelOperationDataTemplate);
				$("#idSelOperationData").processTemplate(pobj1);
				
			}
			
		}
	});
}*/



/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:template doctor type list
 ***********/




/************
 *@author	: paras suryawanshi
 *@date		:  18-May-2017
 *@code		:fetch unit master list
 ***********/
function getAllUnit() {

    jQuery.ajax({
        async : true,
        type : "POST",
        //url : "ehat/unit/fetchUnitList",
        url : "ehat/unit/getAllUnitListMaster",

        success : function(r) {
        	setTempAllUnitList(r);//call template
        }
    });
}
function setTempAllUnitList(r) {   
	
	var list = "";    
    for ( var i = 0; i < r.lstUnit.length; i++) {    

		list = list + "<option value='"+r.lstUnit[i].unitId+"'>" + (r.lstUnit[i].unitName) + "</option>";    
		}   
	$("#mulSelunit").html(list);   
	//$('.chosen-select').chosen();       
	//$('.chosen-select-deselect').chosen({ allow_single_deselect: true }); 
	/*$(function() {   
		 $(".chosen-select").val('').trigger("chosen:updated");
	$('.chosen-select').chosen();       
	$('.chosen-select-deselect').chosen({ allow_single_deselect: true });     
	});}*/
}
/************
 *@author	: Kishor Lokhande
 *@date		: 23-May-2017
 *@code		:Disply unit list on login page
 ***********/

function unitMasterListOnLogin()
{
		//var ulogin ="userName";
		var ulogin =$("#userName").val();
		//alert(ulogin);
		jQuery.ajax({
			
			async : true,
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
				setTemplateForLoginUnitSelectList(r);	
		}
	});	
	
}

/************
 *@author	: Kishor Lokhande
 *@date		: 23-May-2017
 *@code		:Disply unit list on login page
 ***********/

function unitMasterListOnLogin2()
{
		//var ulogin ="userName";
		var ulogin =$("#userName").val();
		//alert(ulogin);
		jQuery.ajax({
			
			async : true,
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
				setTemplateForLoginUnitSelectList(r);	
		}
	});	
	
}


function setTemplateForLoginUnitSelectList(r){
	
	var list="";
	
	//alert(list);
	for ( var int = 0; int < r.lstUnit.length; int++) {

		//list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		
		//list=list+'<option <input type="hidden" unitId="'+(r.lstUnit[int].unitId)+'" name="uId" value="'+(r.lstUnit[int].unitName)+'"></option>';
		//temp= '<li> '+  ul +' <input type="hidden" id="ul'+uls+'" name="unitList" value="'+uls+'"> </li>';	
	}	
	$("#uId").html(list);
	$("#e1").html(list);
	var unitId =$("#unitId").val();
	$('#e1').select2('val',unitId);
}

function getViewDeptsInHr() {
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/dept/viewAllDeptListAll",
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			//$("#deptName").setTemplate(list);
			setTempDeptInHr(r); // to show ajax response on ui
		}
	});
}

function setTempDeptInHr(r) {   
	//alert("hi")
	
	var list = "";    
    for (var i = 0; i < r.lstDepts.length; i++) {    
    	//	alert("hi"+r.lstDepts[i].deptId+""+r.lstDepts[i].deptName);
    		
		list = list + "<option value='"+r.lstDepts[i].deptId+"'>" + (r.lstDepts[i].deptName) + "</option>";    
		}   
	$("#deptName").html(list);   
 
}

//@author : Sagar Kadam @date:6/July-2017 @reason : To Fetch Service List onload
function getAllServicesInHr() {

	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/serv/fetchServiceList2",
		success : function(r) {
			setTempServiceInHr(r);
		}
	});
}

function setTempServiceInHr(r) {   
	//alert("hi")
	
	var list = "";    
	for ( var i = 0; i < r.listService.length; i++) {
     		
		list = list + "<option value='"+r.listService[i].serviceId+"'>" + (r.listService[i].serviceName) + "</option>";    
		}   
	$("#serviceName").html(list);   
	$("#adminSrv").html(list);  
	$("#adminSrv").select2();  
}

function getoperation() {

	var inputs = [];
	inputs.push('opType=' + "");
	inputs.push('department=' + "");
	inputs.push('action=fetchOperationName');
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
			// alert(ajaxResponse);
			objc = eval('(' + ajaxResponse + ')');
			$("#selOTName").setTemplate(operationName);
			$("#selOTName").processTemplate(objc);
		
		}
	});

}

var operationName= "<option value='0'>-SELECT-</option>{#foreach $T.ol as ol}<option value='{$T.ol.oi}' >{$T.ol.on}</option>{#/for}";
var departmentOtSchedule = "<option value='0'>-SELECT-</option>{#foreach $T.grpli as grpli}<option value='{$T.grpli.grpid}'>{$T.grpli.grpNm}</option>{#/for}";

function fetchDepartmentForOTSchedule(rowcount) {

	var inputs = [];
	inputs.push('action=fetchGroupDetails');

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
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
			pobj1 = ajaxResponse;
			doctorBean =  ajaxResponse ;
			if (rowcount == undefined) {
				$("#department").setTemplate(departmentOtSchedule);
				$("#department").processTemplate(doctorBean);
			} else {
				$("#department" + rowcount)
						.setTemplate(departmentOtSchedule);
				$("#department" + rowcount).processTemplate(doctorBean);

			}
		}
	});
}

/************
* @author	: Vinod Udawant
* @date		: 04-Jan-2018
* @codeFor	: Set Hospital Right Panel
 ************/
function setHospRightPanel(){
	
	$("#hospRightPanel").hide("slow");
}

//@author : Sagar Kadam @date:6/July-2017 @reason : To Fetch Service List onload
function saveprocategaory() {
	var txtprcName =$("#txtprcName").val(); 
	var txtprcID = $("#txtprcID").val();
	if(txtprcName=="" || txtprcName==null){
		
		alert("Please Enter Procedure Name");
		return false;
	}
	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/ot/saveprocategaory",
		data	: {
			
			  "txtprcName" : txtprcName,
			  "txtprcID":txtprcID
			},
		success : function(r) {
			alert("Save Successfully"); 
			fetchprocedureCatsedrv();
			count =1;
			$("#txtprcName").val("");
			$("#txtprcID").val(0);
		}
	});
}
var defaultViewproTemp = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 98%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-2-1' style='height: 21.5px;'><div class='TextFont'>Procedure Name</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.listProcedureCat as li}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-sm-2-1 ' style='height: 21.5px;'>{$T.li.pr_name}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onClick='editproList({$T.li.pr_id},{count})'>"
	+ "<input type='hidden' id='tprname{count}'  value='{$T.li.pr_name}'/>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete{count}' onClick='deleteproList({$T.li.pr_id})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";
function fetchprocedureCatsedrv(){

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
	
		    pobj1 = eval( ajaxResponse );	 
			$("#listproTemp").setTemplate(defaultViewproTemp);
		    $("#listproTemp").processTemplate(pobj1);   
			
		}
	});
	
	
}

function editproList(id,cnt){
	
	var txtprcName =$("#tprname"+ cnt).val(); 
	 $("#txtprcID").val(id);
	 $("#txtprcName").val(txtprcName);
}
var docfetchprocedureCatsedrvadmin = "<option value='0'>-SELECT-</option>{#foreach $T.listProcedureCat as dl}	<option value='{$T.dl.pr_id}'>{$T.dl.pr_name}</option>{#/for}";

function fetchprocedureCatsedradmin(){

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
	
		    	 
			$("#opgrade").setTemplate(docfetchprocedureCatsedrvadmin);
		    $("#opgrade").processTemplate(ajaxResponse);
		    $("#opgrade").select2();
		   // $("#opgrade").select2();
			
		}
	});
	
	
}


function getAllChargeslot() {

	jQuery.ajax({
		type : "POST",
		url : "ehat/chargesSlave/getSponsorList",

		success : function(response) {
			multiSelectchargesinfoot(response);
		}
	});
}

function multiSelectchargesinfoot(response) {

	var list = "<option value='0'>-SELECT-</option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName) + '</option>';
	}

	$("#listmstr_select_chargesinfo").html(list);	
	$("#listmstr_select_chargesinfo").select2();	
	
	$("#listmstr_select_payee").html(list);	
	$("#listmstr_select_payee").select2();	
}

/************
* @author	: Vinod Udawant
* @date		: 12-Feb-2018
* @codeFor	: Show/Hide Admin charges configuration
 ************/
function showHideAdminChg(callFrom){
	
	//var lblColor=$("#adminConfig").css('color');
	
	if(callFrom=="serviceWise"){
		
		$("#mainSrv").show("show");
		$("#divLine10").show("show");
		$("#divLine3").show("show");	
		$("#adminConfig").css("color", "red");
	}else{
		
		$("#mainSrv").hide("show");
		$("#divLine10").hide("show");
		$("#divLine3").hide("show");		
		$("#adminConfig").css("color", "blue");
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 12-Feb-2018
* @codeFor	: Show/Hide Prefix Suffix
 ************/
function showHidePrefix(){
	
	var chkPreSuf = $("#chkPreSuf").is(":checked");
	
	if(chkPreSuf==true){
		
		$("#divBillPrefix").show('');	
		
	}else{
		
		$("#divBillPrefix").hide('');
	}	
}

/************
* @author	: Vinod Udawant
* @date		: 18-Sept-2017
* @codeFor	: Set view multipay popup
 ************/
function setPrefixView(id){
		
	var tbody="";
	tbody=tbody	
	
	+ " <tr class='prefixClass' id='prefixTr"+id+"'> "
	+ " <td class='center' style='width:15%'> "
	+ " 	<select id='depPrefix"+id+"' class='form-control input-SmallText'> "
	+ " 		<option value='0'>All</option> "
	+ " 		<option value='1'>Opd</option> "
	+ " 		<option value='2'>Ipd</option> "
	+ " 		<option value='3'>Diag</option> "
	+ " 		<option value='4'>Reg No</option> "
	+ " 	</select> "
	+ " </td> "
	+ " <td class='center' style='width:20%'><input type='text' id='prefix"+id+"'/></td> "
	+ " <td class='center' style='width:20%'><input type='text' id='middle"+id+"'/></td> "															
	+ " <td class='center' style='width:20%'><input type='text' id='sufix"+id+"'/></td> "
	+ " <td class='center' style='width:25%'> "
	
	+ " <div class='form-group' style='margin-top: 8%'> " 
	+ " 	<div class='col-md-12'> "	 												
	+ " 		<div class='row' id='input-type'> "
	+ " 			<div class='col-sm-4'> "
	+ " 				<label class='radio-inline'> Bill  "
	+ " 				<input type='radio' class='radio' value='1' name='recBillBoth"+id+"' id='recNo"+id+"'/>  "
	+ " 				</label>  "
	+ " 			</div>  "
				
	+ " 			<div class='col-sm-4'>  "
	+ " 				<label class='radio-inline'> Rec   "
	+ " 				<input type='radio' class='radio' value='2' name='recBillBoth"+id+"' id='billNo"+id+"'/> "
	+ " 				</label> "
	+ " 			</div> "		
				
	+ " 			<div class='col-sm-4'>  "
	+ " 				<label class='radio-inline'> Both "
	+ " 					<input type='radio' class='radio' value='3' name='recBillBoth"+id+"' id='both"+id+"'/> "
	+ "   				</label> "
	+ " 			</div> "											 
	+ " 		</div>  "
	+ " 	</div>  "
	+ " </div> "
	
	/*+ " 	<input type='radio' class='radio' value='1' name='recBillBoth"+id+"' id='recNo"+id+"'/>Bill "
	+ " 	<input type='radio' class='radio' value='2' name='recBillBoth"+id+"' id='billNo"+id+"'/>Rec"
	+ " 	<input type='radio' class='radio' value='3' name='recBillBoth"+id+"' id='both"+id+"'/>Both "*/
	+ " </td> "																														
	+ " </tr> ";	
	
	$("#billPrefixTbody").append(tbody);	
}

/************
* @author	: Vinod Udawant
* @date		: 14-feb-2018
* @codeFor	: Create prefix row
 ************/
function toCreatePrefixTr(){
	
	var rows= $('#billPrefixTable tbody tr.prefixClass').length;	
	setPrefixView(rows);	
}

/************
* @author	: Vinod Udawant
* @date		: 14-feb-2018
* @codeFor	: remove prefix row
 ************/
function toRemovePrefixTr(){
	
	var rows= $('#billPrefixTable tbody tr.prefixClass').length;
	$('#prefixTr' + (rows-1)).remove();	
}



function setCoverHistoryIpdTemp(){
	
	var htm = "<div class='col-sm-12-1' >"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment Id</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Doctor Investigation</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Sub & Obj</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Assessment</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>CPOE</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Order Form</div></th>"

			
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
			
			
						 
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
//var index = 1;	
 
htm =htm+ "<tbody>"	;
//for ( var i = 0; i < r.listInventoryNewDto.length;i++) {
	
		htm= htm
		+ "<tr id='div123' style='font-size: 11px'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>1</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/30-04-2018/14</td>"

		+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Ansari Humera</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center'>Patient experiencing shortness of breath</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>Typhoid fever, unspecified</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>SAMPLE FOR CENTRIFUGE</td>"
		
		
		+ "<td style='height: 21.5px;' class='col-md-2 center'>CROSINE</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>30-04-2018</td>"
		
		+ "</tr>";	
		
		htm= htm
		+ "<tr id='div123' style='font-size: 11px'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>2</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/30-04-2018/14</td>"

		+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Dane Preeti</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center'>Heart rate 115</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>Amebic cystitis</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>SAMPLE COLLECTION BULB</td>"
		
		
		+ "<td style='height: 21.5px;' class='col-md-2 center'>WYSOLONE 10MG TAB</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>30-04-2018</td>"
		
		+ "</tr>";	
		
		htm= htm
		+ "<tr id='div123' style='font-size: 11px'>"
		+ "<td style='height: 21.5px;' class='col-md-1 center'>3</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/30-04-2018/14</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Amit Dravid</td>"
		+ "<td style='height: 21.5px;' class='col-md-3 center'>Blood pressure 120/80 mmHg.</td>"

		+ "<td style='height: 21.5px;' class='col-md-1 center'>Syphilitic aortitis</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>X-Ray Chest PA</td>"
		
		
		+ "<td style='height: 21.5px;' class='col-md-2 center'>PRONDPS</td>"
		+ "<td style='height: 21.5px;' class='col-md-2 center'>30-04-2018</td>"
		
		+ "</tr>";	

 		//index++;
 //	}
	

	$("#coverHistoryDetails").html(htm);

}

function setCoverHistoryOpdTemp(){
	
	var htm = "<div class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Treatment Id</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Doctor Investigation</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Sub & Obj</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Assessment</div></th>"

			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>CPOE</div></th>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Order Form</div></th>"

			
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
			
			
						 
			+ "</tr>"
			+ "</thead>	"
			+ "</table></div>";
 
//var index = 1;	
 
htm =htm+ "<tbody>"	;
//for ( var i = 0; i < r.listInventoryNewDto.length;i++) {
	
htm= htm
+ "<tr id='div123'>"
+ "<td style='height: 21.5px;' class='col-md-1 center'>1</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/30-04-2018/14</td>"

+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Ansari Humera</td>"
+ "<td style='height: 21.5px;' class='col-md-3 center'>Patient experiencing shortness of breath</td>"

+ "<td style='height: 21.5px;' class='col-md-2 center'>Typhoid fever, unspecified</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>SAMPLE FOR CENTRIFUGE</td>"


+ "<td style='height: 21.5px;' class='col-md-2 center'>CROSINE</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>30-04-2018</td>"

+ "</tr>";	

htm= htm
+ "<tr id='div123'>"
+ "<td style='height: 21.5px;' class='col-md-1 center'>2</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/30-04-2018/14</td>"

+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Dane Preeti</td>"
+ "<td style='height: 21.5px;' class='col-md-3 center'>Heart rate 115</td>"

+ "<td style='height: 21.5px;' class='col-md-1 center'>Amebic cystitis</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>SAMPLE COLLECTION BULB</td>"


+ "<td style='height: 21.5px;' class='col-md-2 center'>WYSOLONE 10MG TAB</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>30-04-2018</td>"

+ "</tr>";	

htm= htm
+ "<tr id='div123'>"
+ "<td style='height: 21.5px;' class='col-md-1 center'>3</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>Nob/IPD/30-04-2018/14</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>Dr. Amit Dravid</td>"
+ "<td style='height: 21.5px;' class='col-md-3 center'>Blood pressure 120/80 mmHg.</td>"

+ "<td style='height: 21.5px;' class='col-md-1 center'>Syphilitic aortitis</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>X-Ray Chest PA</td>"


+ "<td style='height: 21.5px;' class='col-md-2 center'>PRONDPS</td>"
+ "<td style='height: 21.5px;' class='col-md-2 center'>30-04-2018</td>"

+ "</tr>";	

 		//index++;
 //	}
	
	$("#coverHistoryDetailsOpd").html(htm);

}

//@author : Sagar Kadam @date:6/July-2017 @reason : To Fetch Service List onload
function saveOPmaster() {
	var txtpr =$("#txtpr").val(); 
	var txtprcID = $("#txtprcID").val();
	
	var txtstep = $("#txtstep").val();
	//Added By Annapurna make manadatory field
	if(txtstep=="" || txtstep==null){
		alert("Please Enter Step!! ");
		return false;
	}
	
//	var opgrade = $("#opgrade").val();
	var opgrade = 0;
	var unit = $("#e1").val();
if(txtpr=="" || txtpr==null){
		
		alert("Please Enter Percentage!!");
		return false;
	}
if(unit=="" || unit==null || unit=="0" ){
		
		alert("Please Select Unit!!");
		return false;
	}
if(txtstep=="" || txtstep==null){
	
	alert("Please Enter Opertion Step!!");
	return false;
}
	jQuery.ajax({
		async	: true,
		type 	: "POST",
		url		: "ehat/ot/saveOPmaster",
		data	: {
			
			  "txtpr" : txtpr,
			  "txtprcID":txtprcID,
			  "opgrade":opgrade,
			  "txtstep":txtstep,
			  "unit":unit,
			},
		success : function(r) {
			alert("Save Successfully"); 
			fetchOperationmaster();
			count =1;
			$("#txtpr").val("");
			$("#txtprcID").val(0);
		}
	});
}

function fetchOperationmaster(){
	count = 1;

	jQuery.ajax({
		async : false,
		type : "GET",
	//	data :  "&reqType=AJAX",
		url : "ehat/ot/fetchOperationmaster",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			// 
		},
		success : function(r) {
			ajaxResponse = r;
	
		    	 
			$("#listproTemp").setTemplate(defaultViewOperationmaster);
		    $("#listproTemp").processTemplate(ajaxResponse);   
			
		}
	});
	
	
}
var defaultViewOperationmaster = "<div class='col-sm-12-1'>"
	+ "<table class='table table-bordered table-condensed cf' style='width : 98%;'>"
	+ "<thead class='cf'>"
	+ "<tr>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
	+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'> %  </div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Edit</div></th>"
	+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Delete</div></th>"
	+ "</tr>"
	+ "</thead>	"
	+ "</table></div>"
	+ "<div class='col-sm-12-1' style='margin-top:-21px; border: 1px solid #b8b8b8; overflow-y:scroll; height: 430px; max-height: auto;'>"
	+ "<table class='table table-striped table-condensed cf'>"
	+ "<tbody>"
	+ "{#foreach $T.listOperationMaster as li}"
	+ "<tr>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>{count++}.</td>"
	+ "<td class='col-md-1-1 center ' style='height: 21.5px;'>{$T.li.percentage}</td>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-success' value='EDIT' id='btnEdit{count}' onClick='editomList({$T.li.pr_id},{count})'>"
	+ "<input type='hidden' id='txtpr{count}'    value='{$T.li.percentage}'/>"
	+ "<input type='hidden' id='txtcat{count}'   value='{$T.li.opgrade}'/>"
	+ "<input type='hidden' id='txtstep{count}'  value='{$T.li.step}'/>"
	+ "<input type='hidden' id='txtunit{count}'  value='{$T.li.unit}'/>"
	+ "<i class='fa fa-edit'></i>"
	+ "</button>"
	+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
	+ "<button class='btn btn-xs btn-danger' value='DELETE' id='btnDelete{count}' onClick='deleteomlist({$T.li.pr_id})'>"
	+ "<i class='fa fa-trash-o'></i>" + "</button>" + "</td>" + "</tr>"
	+ "{#/for}" + "</tbody>" + "</table>" + "</div>";

function editomList(id,cnt){
	
	var txtprcName =$("#txtpr"+ cnt).val(); 
	var unit =$("#txtunit"+ cnt).val(); 
	var step =$("#txtstep"+ cnt).val(); 
	//var opgrade =$("#txtcat"+ cnt).val(); 
	 $("#txtprcID").val(id);
	 $("#txtpr").val(txtprcName);
	 $("#txtstep").val(step);
	 $('#txtunit').select2('val',unit);
	// $('#opgrade').select2('val',opgrade);

	
}
function checkpercentage (){
	
	var txtpr =$("#txtpr").val(); 
	if( parseFloat(txtpr) > 100){
		alert("Percentage Should not be greater than 100!!");
		$("#txtpr").val(""); 
		return false;
	}
}

function deleteomlist(opId) {
	// alert(opId);
	var r = confirm("Are you want to delete ");
	if (r == true) {
		var inputs = [];
	
		var opId =opId; 
		callform="OTP";
		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/doctordesk/deleteom",
			data	: {
				
			  "opId" : opId,
				"callform":callform
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
		
			success : function(response) {
				
				alert(response);
				fetchOperationmaster();
			}
			
		});
	}
}

/************
 *@author	: Kishor Lokhande
 *@date		: 23-May-2017
 *@code		:Disply unit list on login page
 ***********/

function unitMasterListOnLoginOM()
{
		//var ulogin ="userName";
		var ulogin =$("#userNameLogIn").val();
		//alert(ulogin);
		jQuery.ajax({
			
			async : true,
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
				setTemplateForLoginUnit(r);	
		}
	});	
	
}
function setTemplateForLoginUnit(r){
	
	var list="";
	
	//alert(list);
	for ( var int = 0; int < r.lstUnit.length; int++) {

		//list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		list=list+'<option value="'+(r.lstUnit[int].unitId)+'">'+(r.lstUnit[int].unitName)+'</option>';
		
		//list=list+'<option <input type="hidden" unitId="'+(r.lstUnit[int].unitId)+'" name="uId" value="'+(r.lstUnit[int].unitName)+'"></option>';
		//temp= '<li> '+  ul +' <input type="hidden" id="ul'+uls+'" name="unitList" value="'+uls+'"> </li>';	
	}	
	$("#uId").html(list);
	$("#e1").html(list);
	var unitId =$("#unitId").val();
	$('#e1').select2();
	$('#e1').select2('val',unitId);
}

function Clearom(){
	 $("#txtprcID").val(0);
	 $("#txtpr").val("");
	 $("#txtstep").val("");
	 $('#txtunit').select2('val',1);
	 $('#opgrade').select2('val',0);
}

function setTemplateListByType(value){
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/serv/getTemplateListByType",
		data	: {
			"value" : value
		},
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setCustTemplateList(r);
			//setCustTemplateListMortuary(r);
		}
	});
}
function setCustTemplateList(r){
	var list="<option value=''>--Select--</option>";
	for ( var i = 0; i < r.pattemplist.length; i++) {

		list=list+'<option onclick="setCustomizeTemplate('+r.pattemplist[i].idpattemp+')" value="'+(r.pattemplist[i].idpattemp)+'">'+(r.pattemplist[i].tempname)+'</option>';
		
	}
	setTimeout(function() {
		$("#selCustomizeTemp").html(list);
	}, 100);

}



/**********************************/
function checkValueZero(id)
{

	if(parseInt(document.getElementById(id).value)==0)
		{
		alert("Quantity should not be 0");
		document.getElementById(id).value="";
		document.getElementById(id).focus(); 
		//$(obj.id).focus();
		return false;
		}
}

function fetchProcedureGroupAdmin(){

	var inputs = [];
	inputs.push('action=fetchGroupDetails');
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "GET",
		data : str + "&reqType=AJAX",
		//url : "AdminServlet",
		url : "./ehat/otdata/fetchGroupDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		success : function(r) {
			
			setProcedureGroupAdmin(r);
		}
	});
}

function setProcedureGroupAdmin(r){
	
	var htm="<option value=0>-- Select Group --</option>";
	for(var i=0; i<r.grpli.length; i++){
		
		htm = htm + "<option value="+r.grpli[i].grpid+">"+r.grpli[i].grpNm+"</option>";
	}
	$("#department").html(htm);
	$("#department").select2();
}

function fetchHallTypeProchargeOpration(){
	
	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/otdata/fetchhalltypeprochargeopration",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setHallTypeProchargeOpration(r);
		}
	});
}

function setHallTypeProchargeOpration(r){
	
	var count=0;
	var htm ="";
	for ( var i = 0; i < r.lstChargesSlave.length; i++) {	
		htm = htm +'<tr> '
		+ " <td class='col-md-1-1 center'>"+r.lstChargesSlave[i].categoryName+"<input type='hidden' id='hallid"+count+"' value="+r.lstChargesSlave[i].slaveId+"></td>"
		+ "<td class='col-md-2-1 center'><input type='text'id='surgeoncharge"+count+"' maxlength='8'  style='width: 70%;' onkeypress='return validateNumbers(event)'></td>"
		+ '</tr>';
		count++
	}
	$("#hallwisecharges").html(htm);
	$("#count").val(count);
}

function featchGrpCatWiseProChargeAdmin() {

	var operationID = $("#department").val();
	var opcatid = $("#opgrade").val();
	
	var sponsrid;
	  if ($("#lisHcpe1").val() !== undefined) {
	    sponsrid = $("#lisHcpe1").val();
	  } else if ($("#lisHcpe0").val() !== "") {
	    sponsrid = $("#lisHcpe0").val();
	  } else {
	    sponsrid = 0;
	  }
	
    var sid = $("#sid").val();
	if (!sid) {
		sid = 0;
	}

	if (opcatid == "select") {
		alert("Please Select Procedure Category.");
		return false;
	}
	
	if(sponsrid==null || sponsrid==""){
		sponsrid=0;
	}
	
	var inputs = [];
	inputs.push('operationCatId=' + opcatid);
	inputs.push('corporateAcId=' + sid);
	inputs.push('operation_id=' + operationID);
	inputs.push('sponser_id=' + sponsrid);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/otdata/featchgrpcatwiseprochargeadmin",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			setSurgeonCharges(r);
		}
	});
}
function setSurgeonCharges(r){
	
	var count=$("#count").val();
	
	for(var j=0;j<count;j++){
		for(var i=0;i<r.operationchargehall.length;i++){
			var id=$("#hallid" +j).val();
			if (r.operationchargehall[i].halltypeid == id ){
				$("#surgeoncharge" +j).val(r.operationchargehall[i].surgeoncharge);
			}
		}
	}
}


function saveGroupCatWiseProCharges(){
	
	var operationID = $("#department").val();
	var opcatid = $("#opgrade").val();
	
	var sponsrid;
	  if ($("#lisHcpe1").val() !== undefined) {
	    sponsrid = $("#lisHcpe1").val();
	  } else if ($("#lisHcpe0").val() !== "") {
	    sponsrid = $("#lisHcpe0").val();
	  } else {
	    sponsrid = 0;
	  }
	
	if (operationID == "0") {
		alert("Please Select Procedure Name");
		return false;
	}
	
	if (opcatid==0||opcatid == "-select-" || opcatid==null || opcatid=="" ) {
		alert("Please Select Procedure Category.");
		return false;
	}
	
	if(sponsrid==null || sponsrid==""){
		sponsrid=0;
	}	
	var opcharge = {
		operationchargehall : []
	};
	var hallcount = $("#count").val();
	var anescharge=0;
	var operationGrpId=0;
	
	for(var i=0;i<hallcount;i++){
		
		var surgeonCharge = $.trim($("#surgeoncharge" + i).val());
		if (surgeonCharge == "") {
			surgeonCharge = 0;
		}
		var hallid = $("#hallid" + i).val();
		
		opcharge.operationchargehall.push({
			'halltypeid':hallid,
			'surgeoncharge':surgeonCharge ,
			'operationCatId':opcatid,
			'operation_id':operationID,
			'sponser_id':sponsrid,
			'anescharge' : anescharge,
			'operationGrpId':operationGrpId
		});
	}
	opcharge = JSON.stringify(opcharge);
	//opcharge = opcharge.decodeSpecialChars();
	
	var inputs = [];
	inputs.push('opcharge=' + encodeURIComponent(opcharge));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/otdata/savegroupcatwiseprocharges",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			alert(r);	
			clearGroupCatWiseProCharges();
		}
	});
}

function clearGroupCatWiseProCharges(){
	
	$("#department").select2('val',0);
	$("#opgrade").select2('val',0);
	$("#listmstr_select_chargesinfo").select2('val',0);
	$('#dynamicItemsponser').html("");
	
	var length = $("#hallwisecharges tr").length;
	for(var i=0;i<length;i++){
		$("#surgeoncharge" + i).val(0);
	}
}

//Added by Akshata-For fetching consent form template

function fetchTemplateListOt(){

	var pageName = $("#pageName").val();

	var inputs = [];
	 inputs.push('departmentId=' + 2);
	 inputs.push('selectTemplateType=' + 'c');
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
			//alert(JSON.stringify(r));
			$("#customizeTemplateDiv").html(encodeURIComponent(JSON.stringify(r)));
			setAllTemplateList(r);

			 
		}
	});

}

//Newly Added 10/08/23
function setCustomizeTemplateipd(id)
{
	var data = $("#"+id).val();

	$.ajax({
		async : false,
		type : "GET",
		url : "ehat/admin/gettemplatelistbytemplateid",
		data : {
			"id" : data
		},
		error() {
			alert("Something went wrong")
		},
		success(r) {
			$('#tempHistDiv').hide();
			$('#historyTemp').hide();
			$('#move').show();
			$("#selCustomizeTempType").val(r.type);
			$("#updateTempId").val(r.idpattemp);
			$("#customizeTemplateName").val(r.tempname);
			CKEDITOR.instances['editor1'].setData(r.tempdata);
			
			featchAllConsentFormForTreatment('previous');
		}
	})
}

//Added by Akshata-For fetching consent form template

function setAllTemplateList(r){
	var list="<option value='0'>select</option>";
		
		for ( var int = 0; int < r.pattemplist.length; int++) {
			
			list=list+'<option value="'+(r.pattemplist[int].idpattemp)+'">'+(r.pattemplist[int].tempname)+'</option>';
			
		}	
		
		$("#selCustomizeTemp").html(list);
}


//Added by vishant-For fetching consent form template

function fetchTemplateListOtByDeptID(deptId){

	var pageName = $("#pageName").val();

	var inputs = [];
	 inputs.push('departmentId=' + deptId);
	// inputs.push('selectTemplateType=' + 'c');
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "./ehat/otdata/fetchCustomizeTemplateListByDeptId",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert(JSON.stringify(r));
			$("#customizeTemplateDiv").html(encodeURIComponent(JSON.stringify(r)));
			setAllTemplateList(r);

			 
		}
	});

}

function deleteproList(id) {
	// alert(opId);
	var r = confirm("Are you want to delete ");
	if (r == true) {
		var inputs = [];
	
		var id =id; 
		//callform="OTP";
		jQuery.ajax({
			async : false,
			type 	: "POST",
			url 	: "ehat/ot/deleteProcedureCategory",
			data	: {
				
			  "id" : id,
			//	"callform":callform
			},
			timeout : 1000 * 60 * 5,
			cache 	: false,
		
			success : function(response) {
				
				alert(response);
				fetchprocedureCatsedrv();
			}
			
		});
	}
}


function setDyanamicDiv(setDiv, getDiv,callform) {
	
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
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
			+ count + ',' + id + ',\'' +  callform + '\',\'' + setDiv + '\')" href="#"></a>'
			
		
			  htm = htm	
			    + '<input id="lisHcpe' + (count) + '" type="hidden" value="' + id
				+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);

	var liSize = $("#" + setDiv + " li").length;
	if (liSize == 0) {
		fetchAllServicecom(callform , setDiv);// for masters
	} else {
		var masterid ="";
			 masterid = $("#lisHcpe" + 0).val();
			 selfId = $("#lisHcpe" + (liSize - 1)).val();
			 fetchSubServiceByIdcom(masterid, selfId,callform, setDiv);
		
		
		var selfId = 0;
		if (liSize == 1) {
			fetchSubServiceByIdcom(masterid, selfId,callform, setDiv);
		} else {
			
				selfId = $("#lisHcpe" + (liSize - 1)).val();		
			fetchSubServiceByIdcom(masterid, selfId,callform,setDiv);
		}
		
	}// now inside submaster catagories
	var lisHc="";
	
		lisHc=$("#lisHcat"+count).val();	
	
	
	//alert(lisHc);
	/*if(lisHc == 29){
		alert("Hi");
		fetchpharmaproductclick();
		
	}else{*/
	/*if(callform=="OTCHARG"){
		fetchconfigdataonclick(callform);
		
		//fetchdetailsOT(masterid, selfId,callform);
	}*/
		
	//}
	
}


function removeInpuntFildcom(count, id, callform , setDiv) {

	var lsize = $("#" + setDiv + " li").size();

	for ( var i = count; i < lsize; i++) {
		$('#liItmesHc' + i).remove();

	}
	var liSize = $("#" + setDiv + " li").length;
	var masterid = 0;
	
		masterid = $("#lisHcat" + 0).val();
	
		
	
	
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
			fetchSubServiceByIdcom(masterid, selfId);
		} else {
				selfId = $("#lisHcat" + (liSize - 1)).val();
				if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
				selfId = 0;
			}
			fetchSubServiceByIdcom(masterid, selfId);
		}
		
	}
}


function fetchAllServicecom(callform , setDiv) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/otdata/fetchServiceListCom",
		
		success : function(response) {
			multiSelectcomot(response , callform , setDiv);
			//fetchSubServiceCategoryList();
		}
	});

}


function fetchSubServiceByIdcom(masterId, selfId,callform , setDiv) {

	jQuery.ajax({
		type : "POST",
		url : "ehat/otdata/getSubChargesById",
		data : {
			"masterId" : parseInt(masterId),
			"selfId" : parseInt(selfId)
		},
		success : function(response) {
			multiSelectSlavecom(response,callform , setDiv);
		}
	});
}


function multiSelectSlavecom(response,callform , setDiv) {

	var list = "<option></option>";

	for ( var i = 0; i < response.lstChargesSlave.length; i++) {

		list = list + '<option value="' + (response.lstChargesSlave[i].slaveId)
				+ '">' + (response.lstChargesSlave[i].categoryName) + '</option>';
		
	}
//	alert(callform);
		$("#listmstr_select_chargesinfo").html(list);
}


