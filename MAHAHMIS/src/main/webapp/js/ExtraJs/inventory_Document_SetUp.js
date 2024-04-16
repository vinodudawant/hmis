var addCollectiontemp = "<div style='width: 100%; padding-top: 2.5%; padding-left: 5%'>	<div style='width: 95%;'><h4>SetUp:</h4>	</div>	<div style='width: 95%; padding-top: 3%;'>		<div style='width: 30%; padding-right: 3%;'>Document</div><div style='width: 60%;'><input  type='text' style='width: 100%;' maxlength='100'></div></div>	<div style='width: 95%; padding-top: 3%;'>		<div style='width: 30%; padding-right: 3%;'>Doc Series</div><div style='width: 60%;'><input type='text'	style='width: 100%;' maxlength='100'></div>	</div>	<div style='width: 95%; padding-top: 3%;'>		<div style='width: 30%; padding-right: 3%;'>Document No</div><div style='width: 60%;'><input	 type='text'	placeholder='Document No'	style='width: 100%;' maxlength='100'></div>		<div style='width: 1%; color: red; padding-left: 3%'></div>	</div>	<div style='width: 95%; padding-top: 3%;'>		<div style='width: 30%; padding-right: 3%;'>Prefix</div><div style='width: 60%;'><input	 type='text'	placeholder='Prefix'	style='width: 100%;' maxlength='100'></div>		<div style='width: 1%; color: red; padding-left: 3%'></div>	</div><div style='width: 95%; padding-top: 3%;'>		<div style='width: 30%; padding-right: 3%;'>Sufix</div><div style='width: 60%;'><input	 type='text'	placeholder='Sufix'	style='width: 100%;' maxlength='100'></div>		<div style='width: 1%; color: red; padding-left: 3%'></div>	</div><div style='width: 95%; padding-top: 3%;'>		<div style='width: 30%; padding-right: 3%;'>Financial Year</div><div style='width: 60%;'><input	 type='text'	placeholder='financail Year'	style='width: 100%;' maxlength='100'></div>		<div style='width: 1%; color: red; padding-left: 3%'></div>	</div><div style='width: 95%; padding-top: 3%; margin-bottom:8px;'>		<div style='width: 60%; padding-right: 6%;'><button  class='btn btn-xs btn-success' type='button' style='padding 1px 10px;margin-left: 8px;'>Save</button><button    class='btn btn-xs btn-success' style='padding 1px 10px;margin-left: 8px;' type='button' >cancle</button></div><div style='width: 60%;'></div></div></div></div></div>";
// function to add collection center
function addcollection() {
	var SampleBean;
	$("#financialyear").setTemplate(addCollectiontemp);
	$("#financialyear").processTemplate(SampleBean);
	$("#Name").focus();
}
var colltemp = '<option value="0">SELECT</option>{#foreach $T.ccli as ccli}<option value="{$T.ccli.ccid}">{$T.ccli.ccnm}</option>{#/for}';
//var ViewFinancialYearTemp = "{#foreach $T.ccli as ccli}	<tr>		<th class='col-md-1-1 center'>{count++}.</th>		<th class='col-md-1-1 center'>{$T.ccli.ccid}</th>		<th class='col-md-4-1 center'>{$T.ccli.ccnm}</th>		<th class='col-md-2-1 center'><input style='font-size: 10px;' type='button' value='EDIT'			class='edit' id='btnEdit{count}'			onclick='editCollectionCenter({$T.ccli.ccid})' /></th>		<th class='col-md-2-1 center'><input style='font-size: 10px;' type='button' value='DELETE'			class='edit' id='btnDelete{count}'			onClick='deleteCollectionCenter({$T.ccli.ccid})' /></th>	</tr>	{#/for}";
//"{#foreach $T.ccli as ccli}<div style='width: 100%; height: 28px; border-bottom: 1px solid #069;'>	<div		style='width: 6.2%; height: 23px; text-align: center; border-right: 1px solid #069; padding-top: 5px;'>{count++}.</div>	<div id='divPi{count}'		style='width: 11%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px; text-align: center'>{$T.ccli.ccid}	</div>	<div		style='width: 52%; height: 23px; border-right: 1px solid #069; padding-left: 1%; padding-top: 5px;'>{$T.ccli.ccnm}</div>	<div		style='width: 12%; height: 25px; border-right: 1px solid #069; padding-left: 1%; padding-top: 3px; text-align: center;'>		<input style='font-size: 10px;' type='button' value='EDIT'			class='edit' id='btnEdit{count}'		onclick='editCollectionCenter({$T.ccli.ccid})' />	</div>	<div		style='width: 10%; height: 25px; padding-left: 1%; padding-top: 3px; text-align: center;'>		<input style='font-size: 10px;' type='button' value='DELETE'			class='edit' id='btnDelete{count}'			onClick='deleteCollectionCenter({$T.ccli.ccid})' />	</div>	{#/for}";
//function to fetch all collection center
function ViewFinancialDetailsList(fetchType, pagenm) {
	count = 1;
	var byName = $("#byName").val();
	var inputs = [];
	inputs.push('action=fetchCollectionCenter');
	inputs.push('fetchType=' + fetchType);
	inputs.push('byName=' + encodeURIComponent(byName));
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "PathologyServlet",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;
			// alert(ajaxResponse);
			pobj1 = eval('(' + ajaxResponse + ')');
			if (pagenm == "assignedTest") {
				$("#collcenter").setTemplate(colltemp);
				$("#collcenter").processTemplate(pobj1);

			} else {
				$("#collectionDiv").html(ajaxResponse);

				//$("#financialYearList").setTemplate(ViewFinancialYearTemp);
				$("#financialYearList").processTemplate(pobj1);
			}
		}
	});
}