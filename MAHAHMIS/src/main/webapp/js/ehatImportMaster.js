
function handleHomePageTooltipsimport() {
	
	
	$('.tip-focus').tooltip({
		trigger: 'focus'
	});
}
/***********
 * @author	: BILAL
 * @date	: 02-02-2018
 * @base	: For Import Masters excel  
 ***********/
function setNewTempimport(id){
	//making active tag
	$(".ehatListimport").removeClass("active");
	$("#"+id).addClass("active");
	 if (id=="servMasters") {
		 $('#hiddenImport').val(id);
		temForServiceimport(id);
		//handleHomePageTooltipsimport();
		
	}else if (id=="subServMasters") {
		$('#hiddenImport').val(id);
		
		temForSubServiceimport(id);
		//handleHomePageTooltipsimport();
		
	}else if (id=="packages") {
		
		$('#hiddenImport').val("packages");
		temForPackimport(id);
		//handleHomePageTooltipsimport();
		
	}else if (id=="subChrgsMasters") {
		
		$('#hiddenImport').val("subChrgsMasters");
		temForSubChrgsimport(id);
		
		
	}else if (id=="sponsor") {
		
		$('#hiddenImport').val("sponsorhall");
		temForsponsorimport(id);
		
	}else if (id=="hall") {
		
		$('#hiddenImport').val("hall");
		temForhallwiseimport(id);
		
	}
}
/***********
 * @author	: BILAL
 * @date	: 02-02-2018
 * @base	: For Import Masters excel  dynamically 
 ***********/
function importMasterExcel(){
	
	var hiddenImport=$('#hiddenImport').val();
	var submit="";
	var importFile="";
	var dynamicUrl ="";
	
	//dynamically setting setting the action and URL 
	if (hiddenImport == "servMasters") {
		submit="#importExcelForm";
		importFile="#importFile";
		dynamicUrl="ehat/subservice/importservices";
	
	}else if (hiddenImport == "subServMasters") {
		submit="#importExcelFormSub";
		importFile="#importFileSub";
		dynamicUrl="ehat/subservice/importSubservices";
	
	}else if (hiddenImport == "subChrgsMasters") {
		submit="#importExcelFormSubch";
		importFile="#importFileSubcs";
		dynamicUrl="ehat/chargesSlave/importSubcharges";
	}else if (hiddenImport == "sponsorhall") {
		submit="#importExcelFormSponsor";
		importFile="#importFileSponsor";
		dynamicUrl="ehat/configurationservice/importSponsor";
	}else if (hiddenImport == "hall") {
		submit="#importExcelFormHall";
		importFile="#importFileHall";
		dynamicUrl="ehat/configurationservice/importhall";
	}
	
	
	$(''+submit+'').submit(function(event){
		 
		  event.preventDefault();
		  var fileName=$(''+importFile+'').val();
		  if(fileName!="" && fileName!=null){
			
			  var formData = new FormData($(this)[0]);
			  $('#pleaseWait').show();
			  $.ajax({
			    url: ''+dynamicUrl+'',
			    type: 'POST',
			    data: formData,
			    async: false,
			    cache: false,
			    contentType: false,
			    processData: false,
			    success: function (returndata) {
			      alert(returndata);
			      $('#pleaseWait').hide();
			    }
			  });
			  return false;
		  }
		  else{
			  alert("Please select file first");
		  }
		});
}

/***********
 * @author	: BILAL
 * @date	: 02-02-2018
 * @base	: setting template for service master 
 ***********/
function temForServiceimport(callFrom){
	var htm= 	 
			 '<div class="col-md-12-1"> '
			+ '<h4>The excel file must be in following format for Service Master...'
			+ '<a href="excelformat/ServiceMaster.xlsx"><button id="btnExport"  class="btn btn-xs btn-info pull-right" value="Excel"'
			+ 'title="" data-placement="left" data-toggle="tooltip"'
			+ 'data-original-title="Excel">Export To Excel</button></a>'
			

			
			
			+' <a href="excelformat/ServiceMaster.xlsx">Download</a>'
			
			+'</h4>'
			+ ' <div id="servExpFor" class="row panel panel-default">'
			+ '<table class="table table-condensed table-hover " bordercolor="#ddd" border="1">'
			
 			+ '<thead><tr><th>Service Name</th><th>Service Code</th><th>Is Combination</th></tr></thead>'
 			+ ' <tbody><tr><td>PathoLogy</td><td>Patho</td><td>N</td></tr>'
 			+' <tr><td>Package</td><td>Pack</td><td>Y</td></tr>'
 			+' </tbody></table>'
 			
			+'</div> '
				
			+'<div class="row panel panel-default">'
			+'<form name="importExcelForm" id="importExcelForm">'

			+'	<div style="margin-top: 2%;" class="col-md-12-1">'
			+'		<div class="col-md-3"> '
			+'			<input type="file" required="" id="importFile" name="file"></div> <div class="col-md-3">'
					
					
			+'<input type="submit" class="btn btn-xs btn-info" onclick="importMasterExcel();" value="Start Import">'
			+'</div> </div> </form> </div> </div>'
 			;
	
	$("#divEhatContentimport").html(htm);
	
	
}


/***********
 * @author	: BILAL
 * @date	: 02-02-2018
 * @base	: setting template for sub service master 
 ***********/
function temForSubServiceimport(callFrom){
	var htm= 	 
		 '<div class="col-md-12-1"> '
		//+ ' <div class="row panel panel-default">'
		+ '<h4>The excel file must be in following format For master of master(Sub Service)...'
		+ '<a href="excelformat/subServiceExcel.xlsx"><button id="btnExport"  class="btn btn-xs btn-info pull-right" value="Excel"'
		+ 'title="" data-placement="left" data-toggle="tooltip"'
		+ 'data-original-title="Excel">Export To Excel</button></a>'
		
		+'<a href="excelformat/subServiceExcel.xlsx"> Download</a>'
		+'</h4>'
		+ ' <div id="servExpFor" class="row panel panel-default">'
		+ '<table class="table table-condensed table-hover " bordercolor="#ddd" border="1">'
		
		+ '<thead><tr>'
		+'<th>Service Name</th><th>Under Sub Service </th><th>Sub Service Name</th>'
		+' <th>Sub Service Code</th> <th>CGHSCode</th>'
		+'<th>Charges</th><th>Is Category </th><th>Is Modify</th>'
		+'</tr></thead>'
		+ ' <tbody><tr>'
		
		+'<td>PathoLogy</td>'
		+'<td> - </td>'
		+'<td>Patho</td>'
		+'<td>Patho</td>'
		+'<td>PathoCGHS</td>'
		+'<td>0</td>'
		+'<td>Y</td>'
		+'<td>N</td></tr>'
		
		+'<tr>'
		+'<td>PacthoLogy</td>'
		+'<td>Patho</td>'
		+'<td>x-ray</td>'
		+'<td>r-ray</td>'
		+'<td>r-rayCGHS</td>'
		+'<td>500</td>'
		+'<td>N</td>'
		+'<td>Y</td></tr>'
		
		+' </tbody></table>'
		
		+'</div> '
			
		+'<div class="row panel panel-default">'
		+'<form name="importExcelFormSub" id="importExcelFormSub">'

		+'	<div style="margin-top: 2%;" class="col-md-12-1">'
		+'		<div class="col-md-3"> '
		+'			<input type="file" required="" id="importFileSub" name="file"></div> <div class="col-md-3">'
				
				
		+'<input type="submit" class="btn btn-xs btn-info" onclick="importMasterExcel();" value="Start Import">'
		+'</div> </div> </form> </div> </div>'
		;

   $("#divEhatContentimport").html(htm);
   
}



/***********
 * @author	: BILAL
 * @date	: 02-02-2018
 * @base	: setting template for sub charges master 
 ***********/
function temForSubChrgsimport(callFrom) {
	var htm= 	 
		 '<div class="col-md-12-1"> '
		
		+ '<h4>The excel file must be in following format For master of master(Sponsor or Hall ect..)...'
		+ '<a href="excelformat/subcharges.xlsx"><button id="btnExport"  class="btn btn-xs btn-info pull-right" value="Excel"'
		+ 'title="" data-placement="left" data-toggle="tooltip"'
		+ 'data-original-title="Excel">Export To Excel</button></a>'
		
		+' <a href="excelformat/subcharges.xlsx">Download</a>'
		+'</h4>'
		+ ' <div id="servExpFor" class="row panel panel-default">'
		+ '<table class="table table-condensed table-hover " bordercolor="#ddd" border="1">'
		
		+ '<thead><tr>'
		+'<th>Charges Name</th><th>Under Sub Charges </th><th>Sub-Charges Name </th>'
		+' <th>Sub-Charges Code</th> '
		+'<th>Is Category </th><th>Is PPN</th>'
		+'</tr></thead>'
		+ ' <tbody><tr>'
		
		+'<td>Sponsor</td>'
		+'<td> - </td>'
		+'<td>Bajaj</td>'
		+'<td>Bajaj Code</td>'
		+'<td>Y</td>'
		+'<td>N</td></tr>'
		
		+'<tr>'
		+'<td>Sponsor</td>'
		+'<td>Bajaj</td>'
		+'<td>Bajaj policy</td>'
		+'<td>Policy Code</td>'
		+'<td>N</td>'
		+'<td>N</td></tr>'
		
		+' </tbody></table>'
		
		+'</div> '
			
		+'<div class="row panel panel-default">'
		+'<form name="importExcelFormSub" id="importExcelFormSubch">'

		+'	<div style="margin-top: 2%;" class="col-md-12-1">'
		+'		<div class="col-md-3"> '
		+'			<input type="file" required="" id="importFileSubcs" name="file"></div> <div class="col-md-3">'
				
				
		+'<input type="submit" class="btn btn-xs btn-info" onclick="importMasterExcel();" value="Start Import">'
		+'</div> </div> </form> </div> </div>'
		;

  $("#divEhatContentimport").html(htm);
}

/***********
 * @author	: BILAL
 * @date	: 02-02-2018
 * @base	: setting template for package charges config 
 ***********/
function temForsponsorimport(callFrom) {
	var htm= 	 
		 '<div class="col-md-12-1"> '
		+ ' <div class="row panel panel-default">'
		+ '<h4>The excel file must be in following format For (Sponsor charges ..)...'
		
		+ '<a href="excelformat/sponsor.xlsx"><button id="btnExport"  class="btn btn-xs btn-info pull-right" value="Excel"'
		+ 'title="" data-placement="left" data-toggle="tooltip"'
		+ 'data-original-title="Excel">Export To Excel</button></a>'
		
		+' <a href="excelformat/sponsor.xlsx">Download</a>'
		
		+'</h4>'
		+ '<table class="table table-condensed table-hover " bordercolor="#ddd" border="1">'
		
		+ '<thead><tr>'
		+'<th>Sponsor Name</th><th>Sponsor Leaf</th><th>Sub service Name </th>'
		+' <th>Charge</th> '
		+' <th>CGHSCodeName</th> '
		+'</tr></thead>'
		+ ' <tbody >'
		+'<tr>'
		
		+'<td>Sponsor (Catagory Type) </td>'
		+'<td>Bajaj Policy</td>'
		
		+'<td>CBC</td>'
		+'<td>500</td>'
		+'<td>101CGHS</td>'
		+'</tr>'
		
        +'<tr>'
		
		+'<td>Sponsor (Catagory Type) </td>'
		+'<td>Amdoc Corporate</td>'
		
		+'<td>X-ray</td>'
		+'<td>600</td>'
		+'<td>200CGHS</td>'
		+'</tr>'
		
		+' </tbody></table>'
		
		+'</div> '
			
		+'<div class="row panel panel-default">'
		+'<form name="importExcelFormSponsor" id="importExcelFormSponsor">'

		+'	<div style="margin-top: 2%;" class="col-md-12-1">'
		+'		<div class="col-md-3"> '
		+'			<input type="file" required="" id="importFileSponsor" name="file"></div> <div class="col-md-3">'
				
				
		+'<input type="submit" class="btn btn-xs btn-info" onclick="importMasterExcel();" value="Start Import">'
		+'</div> </div> </form> </div> </div>'
		;

 $("#divEhatContentimport").html(htm);
}
/***********
 * @author	: BILAL
 * @date	: 12-03-2018
 * @base	: setting template for hall wise charges config 
 ***********/
function temForhallwiseimport(callFrom){
	var htm= 	 
		 '<div class="col-md-12-1"> '
		+ ' <div class="row panel panel-default">'
		+ '<h4>The excel file must be in following format For (Hall wise charges ..)...'
		
		+ '<a href="excelformat/hall.xlsx"><button id="btnExport"  class="btn btn-xs btn-info pull-right" value="Excel"'
		+ 'title="" data-placement="left" data-toggle="tooltip"'
		+ 'data-original-title="Excel">Export To Excel</button></a>'
		
		+' <a href="excelformat/hall.xlsx">Download</a>'
		
		+'</h4>'
		+ '<table class="table table-condensed table-hover " bordercolor="#ddd" border="1">'
		
		+ '<thead><tr>'
		+'<th>Hall Name</th><th>Hall Leaf</th><th>Sub service Name </th>'
		+' <th>Charge</th> '
		+' <th>CGHSCodeName</th> '
		+'</tr></thead>'
		+ ' <tbody >'
		+'<tr>'
		
		+'<td>Ward </td>'
		+'<td>Annex I C U</td>'
		
		+'<td>CBC</td>'
		+'<td>500</td>'
		+'<td>101CGHS</td>'
		+'</tr>'
		
       +'<tr>'
		
       +'<td>Ward </td>'
		+'<td>Annex General Ward</td>'
		
		+'<td>X-ray</td>'
		+'<td>600</td>'
		+'<td>200CGHS</td>'
		+'</tr>'
		
		+' </tbody></table>'
		
		+'</div> '
			
		+'<div class="row panel panel-default">'
		+'<form name="importExcelFormHall" id="importExcelFormHall">'

		+'	<div style="margin-top: 2%;" class="col-md-12-1">'
		+'		<div class="col-md-3"> '
		+'			<input type="file" required="" id="importFileHall" name="file"></div> <div class="col-md-3">'
				
				
		+'<input type="submit" class="btn btn-xs btn-info" onclick="importMasterExcel();" value="Start Import">'
		+'</div> </div> </form> </div> </div>'
		;

$("#divEhatContentimport").html(htm);
}
function expExl(e){
	
	window
			.open('data:application/vnd.ms-excel,'
					+ encodeURIComponent($(
							'div[id$=servExpFor]')
							.html()));
	e.preventDefault();

	
}

