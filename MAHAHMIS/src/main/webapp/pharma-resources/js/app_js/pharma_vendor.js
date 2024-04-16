setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}
function editVendor(vendorId)
{
	
	showVendorMasterDiv();
	$('#vendorId').val($('#vendorId' + vendorId).val());
	$('#txtVendorCode').val($('#vendorCode' + vendorId).val());
	$('#txtVendorName').val($('#vendorName' + vendorId).val());
	$('#txtContactName').val($('#vendorContactPerson' + vendorId).val());
	
	$('#txtVendorDrugLicNum').val($('#vendorDrugLicNum' + vendorId).val());
	$('#txtVendorVatTin').val($('#vendorVatTin' + vendorId).val());
	
	$('#txtVendorLbtNum').val($('#vendorLbtNum' + vendorId).val());
	$('#txtVendorCstTin').val($('#vendorCstTin' + vendorId).val());
	
	$('#txtVendorDesc').val($('#vendorDesc' + vendorId).val());
	$('#txtVendorMscdaPartyCode').val($('#vendorMscdaPartyCode' + vendorId).val());
	
	getVendorAddress($('#vendorId' + vendorId).val());
	
}
/*****
 * @author     :BILAL
 * @Date       :30-01-2018
 * @Code       :For Vedor Address Temp for edit
 * *******/
function getVendorAddress(vendorId) {

	var inputs = [];
	inputs.push('vendorId=' + vendorId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/vendor/getlistVenAddressById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() 
		{
			//alert('error');
		},
		success : function(r) {
			setvendAddreddForedit(r);
			
		}
	});
}
/*****
 * @author     :BILAL
 * @Date       :30-01-2018
 * @Code       :For Vedor Address Temp for edit
 * *******/
function setvendAddreddForedit(res){

	
	
	var result= '';
		
	//for(var i=0;i<res.length;i++){
		
	  var resultSlave= 
			  ' <div class="panel-collapse collapse" id="venAddssss'+i+'" style="height: 0px;">'
		    + ' <div class="panel-body"> '		
			+ ' <table class="table table-hover" id="vendoraddress"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Address</th> '
			+ '			<th>City Name</th> '
			+ '			<th>District Name</th> '
			+ '			<th>State Name</th> '		
			+ '			<th>GST No</th> '
			
			+ '			<th>Phone No</th> '
			+ '			<th>Email ID</th> '
			+ '			<th>Edit</th> '
			+ '			<th>Delete</th> '
			
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody id="addresstable"> ';	 
	  var k=0;
	  
	//  alert(res[i].length);
		  for( k=0; k<res.length;k++){
			  
			  var vendorAddressId=res[k].vendorAddressId;
			  
			  var vendorAddress=res[k].vendorAddress;
			  var vendorArea =res[k].vendorArea;
			  var city =res[k].city;
			  var district =res[k].district;
			  var state =res[k].state;
			  var gstNo =res[k].gstNo;
			  var pincode =res[k].pincode;
			  var stateId=res[k].stateId;
			  var vendorEmailId =res[k].vendorEmailId;
			  var vendorMobileNumber =res[k].vendorMobileNumber;
			  var vendorLandline =res[k].vendorLandline;
			  
			  
			  var phoneNumber=0;
			  if (vendorMobileNumber == "" || vendorMobileNumber == null) {
				  phoneNumber =vendorLandline;
			  }else{
				  phoneNumber =vendorMobileNumber;
			  }
			  resultSlave = resultSlave + '<tr id="vendorAddresstr'+vendorAddressId+'"> '
					+ '	<td>'+(k+1)+'</td> '
					+ '	<td id="vendorAddress'+vendorAddressId+'">'+(vendorAddress)+( vendorArea)+'</td> '
					+ '	<td id="city'+vendorAddressId+'">'+city+'</td> '
					+ '	<td id="district'+vendorAddressId+'">'+district+'</td> '
					+ '	<td id="state'+vendorAddressId+'">'+state+'</td> '
					+ '	<td id="gstNo'+vendorAddressId+'">'+gstNo+'</td> '
					+ '	<td id="phoneNumber'+vendorAddressId+'">'+phoneNumber+'</td> '	
					+ '	<td id="vendorEmailId'+vendorAddressId+'">'+vendorEmailId+'</td> '
					
					+'<td><button value="EDIT" onclick="editVendorAdd('+vendorAddressId+')" class="btn btn-xs btn-success" id="btnEdit"><i class="fa fa-edit"></i></button></td>'
					+'<td><button value="DELETE" onclick="deleteVendorAdd('+vendorAddressId+')" class="btn btn-xs btn-success" id="btnDelete"><i class="fa fa-trash-o"></i></button></td>'
					+ '	<td >'
					
					+'<input id="vendorAddressId'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].vendorAddressId" name="vendorAddresses['+k+'].vendorAddressId" value="'+vendorAddressId+'"/>'
					+'<input id="txtAddress'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].vendorAddress" name="vendorAddresses['+k+'].vendorAddress" value="'+vendorAddress+'"/>'
		    		+'<input id="talukaId'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].city" name="vendorAddresses['+k+'].city" value="'+city+'"/>'
		    		+'<input id="txtdistrictId'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].district" name="vendorAddresses['+k+'].district" value="'+district+'"/>'
		    		+'<input id="txtstate'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].state" name="vendorAddresses['+k+'].state" value="'+state+'"/>'
		    		+'<input id="txtgstNo'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].gstNo" name="vendorAddresses['+k+'].gstNo" value="'+gstNo+'"/>'
		    		
		    		+'<input id="txtMobile'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].vendorMobileNumber" name="vendorAddresses['+k+'].vendorMobileNumber" value="'+vendorMobileNumber+'"/>'
		    		
		    		+'<input id="txtpincode'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].pincode" name="vendorAddresses['+k+'].pincode" value="'+pincode+'"/>'
		    		
		    		+'<input id="txtArea'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].vendorArea" name="vendorAddresses['+k+'].vendorArea" value="'+vendorArea+'"/>'
		    		+'<input  id="txtLandline'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].vendorLandline" name="vendorAddresses['+k+'].vendorLandline" value="'+vendorLandline+'"/>'
		    		
		    		+'<input id="txtEmailId'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].vendorEmailId" name="vendorAddresses['+k+'].vendorEmailId" value="'+vendorEmailId+'"/>'
		    		
		    		+'<input id="txtstateId'+vendorAddressId+'" type="hidden" path="vendorAddresses['+k+'].stateId" name="vendorAddresses['+k+'].stateId" value="'+stateId+'"/>'
						
					 
					  +'</td> '
					;
					
			    + '</tr>';	
			  
		  }	
		  $('#rowcountAdd').val(k);
		  
		resultSlave=resultSlave + '	</tbody></table></div></div> ';
		result=result +resultSlave;		
					  	
	//}
		
	$("#addressDiv").html(result);

}
/*****
 * @author     :BILAL
 * @Date       :30-01-2018
 * @Code       :For edit vendor address record
 * *******/
function editVendorAdd(vendorAddressId){
	$('#AddBTN').val('Y');
	$('#hiddenVendorAddId').val(vendorAddressId);
	
	$('#txtAddress').val($('#txtAddress' + vendorAddressId).val());
	
	$('#txtArea').val($('#txtArea' + vendorAddressId).val());
	$('#txtLandline').val($('#txtLandline' + vendorAddressId).val());
	$('#txtMobile').val($('#txtMobile' + vendorAddressId).val());
	$('#txtEmailId').val($('#txtEmailId' + vendorAddressId).val());
	$('#gstNo').val($('#txtgstNo' + vendorAddressId).val());
	$('#stateId').val($('#txtstateId'+ vendorAddressId).val());
	
	$('#talukaId').val($('#talukaId' + vendorAddressId).val());
	$('#districtId').val($('#txtdistrictId' + vendorAddressId).val());
	$('#pincode').val($('#txtpincode' + vendorAddressId).val());
}
function setonAdd(){
	var vendorAddressId=$('#hiddenVendorAddId').val();
	$('#AddBTN').val('N');
	
	$('#txtAddress' + vendorAddressId).val($('#txtAddress').val());
	$('#vendorAddress' + vendorAddressId).html($('#txtAddress').val());
	
	$('#txtArea' + vendorAddressId).val($('#txtArea').val());
	$('#txtLandline' + vendorAddressId).val($('#txtLandline').val());
	$('#txtMobile' + vendorAddressId).val($('#txtMobile').val());
	$('#phoneNumber' + vendorAddressId).html($('#txtMobile').val());
	
	$('#txtEmailId' + vendorAddressId).val($('#txtEmailId').val());
	$('#vendorEmailId' + vendorAddressId).html($('#txtEmailId').val());
	
	$('#txtgstNo' + vendorAddressId).val($('#gstNo').val());
	$('#txtstateId'+ vendorAddressId).val($('#stateId').val());
	
	$('#talukaId' + vendorAddressId).val($('#talukaId').val());
	$('#city' + vendorAddressId).html($('#talukaId').val());
	$('#state'+ vendorAddressId).html($('#stateId option:selected').text());
	
	$('#txtdistrictId' + vendorAddressId).val($('#districtId').val());
	$('#district' + vendorAddressId).html($('#districtId').val());
	$('#gstNo' + vendorAddressId).html($('#gstNo').val());
	
	$('#txtpincode' + vendorAddressId).val($('#pincode').val());
	$('#txtstate'+ vendorAddressId).val($('#stateId option:selected').text());
	
	$('#talukaId').val(0);
	$('#districtId').val(0);
	$('#stateId').val(0);
	$('#pincode').val('');
	$('#txtAddress').val('');
	$('#txtArea').val('');
	$('#txtLandline').val('');
	$('#txtMobile').val('');
	$('#txtEmailId').val('');
	$('#gstNo').val('');
    $('#txtLandline').val('');
}
/*****
 * @author     :BILAL
 * @Date       :30-01-2018
 * @Code       :For delete vendor address record
 * *******/
function deleteVendorAdd(vendorAddressId){
	$('#vendorAddresstr'+vendorAddressId).remove();
}


/*****
 * @author     :BILAL
 * @Date       :30-01-2018
 * @Code       :For delete vendor 
 * *******/
function deleteVendor(vendorId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");

		var inputs = [];
		inputs.push('vendorId=' + vendorId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/vendor/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						/*getDoctorsList();*/
						if (r == true) 
						{						
							/*location.reload(true);
							$('#msgDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");*/
								
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						window.location.href = "view";
						
					}
				});

		return true;
	} else {

	}
}
function splitVendorContent(content) {
	
	
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
		if (arr.length > 1) {
			$('#hiddenId').val(arr[1]);
		}
	}
	else{
		$('#hiddenId').val(0);
	}
}

function resetVendorFormValues() {
	$('#vendorMaster').find('input:text').val('');
	//$("#txtAddress").val('');
	$('#searchBox').val('');
}


function searchVendor(vendorId) 
{
	resetVendorFormValues();

	var inputs = [];
	inputs.push('vendorId=' + vendorId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/vendor/getVendorById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() 
		{
			alert('error');
		},
		success : function(r) {
			console.log(r);
			if(r=="")
			{
			alert("Record not found!");
			}
			$("#hiddenId").val('');
			setTableContent(r);
			
		}
	});
}

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ " <tr> <td class='col-md-1 '>"
				+ (i + 1)
				+ " <input type='hidden' id='vendorId"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorId
				+ "'></td> <td class='col-md-2 '>"
				+ r[i].vendorName
				+ "<input type='hidden' id='vendorName"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorName
				+ "'></td>"
				
			/*	+"<td class='col-md-2 '>"
				+ r[i].vendorArea
				+ "<input type='hidden' id='vendorArea"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorArea
				+ "'></td>"
				
				+"<td class='col-md-2 '>"
				+ r[i].vendorMobileNumber
				+ "<input type='hidden' id='vendorMobileNumber"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorMobileNumber
				+ "'></td>"*/
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorCode
				+ "<input type='hidden' id='vendorCode"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorCode
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorAddress
				+ "<input type='hidden' id='vendorAddress"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorAddress
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorLandline
				+ "<input type='hidden' id='vendorLandline"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorLandline
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorEmailId
				+ "<input type='hidden' id='vendorEmailId"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorEmailId
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorContactPerson
				+ "<input type='hidden' id='vendorContactPerson"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorContactPerson
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorDrugLicNum
				+ "<input type='hidden' id='vendorDrugLicNum"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorDrugLicNum
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorVatTin
				+ "<input type='hidden' id='vendorVatTin"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorVatTin
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorLbtNum
				+ "<input type='hidden' id='vendorLbtNum"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorLbtNum
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorCstTin
				+ "<input type='hidden' id='vendorCstTin"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorCstTin
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorDesc
				+ "<input type='hidden' id='vendorDesc"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorDesc
				+ "'></td>"
				
				+"<td class='col-md-2 ' style='display:none;'>"
				+ r[i].vendorMscdaPartyCode
				+ "<input type='hidden' id='vendorMscdaPartyCode"
				+ r[i].vendorId
				+ "' value='"
				+ r[i].vendorMscdaPartyCode
				+ "'></td>"
				
				+"<td class='col-md-1 '> <button id='btnEdit"
				+ r[i].ingredientId
				+ "' class='btn btn-xs btn-success' onclick='editVendor("
				+ r[i].vendorId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td class='col-md-1 '> <button id='btnDelete2' class='btn btn-xs btn-success' onclick='deleteVendor("
				+ r[i].vendorId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divVendorList').html(divContent);
}

/*****
 * @author   :BILAL 
 * @Date     :30-01-2018
 * @Code     : For Hide Div of Vendor Master 
 * ******/
function hideVendorMasterDiv(){
	//getSupplierlist();
	$("#vendorList").show();
	
	$("#vendorMaster").hide(1000);
	$("#vendorList").css({
		'height' : '500px',
		'width' : '100%',
		'overflow-y' : 'scroll',
		'max-height' : 'auto',
		'margin-left' : '2%',
		' margin-top' : '-9%'
	});
}

/*****
 * @author   :BILAL 
 * @Date     :30-01-2018
 * @Code     : For Hide Div of Vendor Master 
 * ******/
function showVendorMasterDiv() {
	
	$("#vendorMaster").show(1000);
	$("#vendorList").hide();
	
}

/******
 * @author    :BILAL
 * @Date      :30-01-2018
 * @Code      :For set Vendor Report Template 
 * ******/
function getSupplierlist(){
     	var inputs = [];
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			url : "../../pharmacy/vendor/getlistVenAdd",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setSupplierlist(r);
				
			}
		});
}
/******
 * @author    :BILAL
 * @Date      :30-01-2018
 * @Code      :For search vendor details
 * ******/
function searchVen(){
	
				var findingName = $("#searchBox").val();
				var inputs = [];
				inputs.push('findingName=' + findingName);
				var str = inputs.join('&');

				jQuery.ajax({
					async : true,
					type : "GET",
					data : str + "&reqType=AJAX",
					//url : "/EhatEnterprise/pharmacy/vendor/autoSuggestionv",
					url : "../../pharmacy/vendor/autoSuggestionvendorNew",
                	timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						//alert('error');
					},
					success : function(r) {
						
						$("#vendorList").show();
						
						$("#vendorMaster").hide(1000);
						$("#vendorList").css({
							'height' : '500px',
							'width' : '100%',
							'overflow-y' : 'scroll',
							'max-height' : 'auto',
							'margin-left' : '2%',
							' margin-top' : '-9%'
						});
						setSupplierlist(r);
					}
				});
}
/******
 * @author    :BILAL
 * @Date      :30-01-2018
 * @Code      :For set Vendor Report Template 
 * ******/
/*function setSupplierlist(res){
	
	var result= ' <table class="table table-hover" id="receipts"> '
	+ ' <thead> '
	+ '		<tr> '
	+ '			<th>Sr No</th> '
	+ '			<th>Vendor Id</th> '
	+ '			<th>Supplier Name</th> '
/*	+ '			<th>Suplier Code</th> '
	+ '			<th>Contact Person</th> '
	
	+ '			<th>Edit</th> '
	+ '			<th>Delete</th> '
	+ '			<th>Vendor Add</th> '
	+ '		</tr> '
	+ '	</thead> '
	+ '	<tbody> ';
		
	for(var i=0;i<res.lstvendors.length;i++){
		
		var vendorId=res.lstvendors[i].vendorId;
		var vendorName=res.lstvendors[i].vendorName;
		var vendorCode=res.lstvendors[i].vendorCode;
		var vendorContactPerson =res.lstvendors[i].vendorContactPerson;
		var vendorVatTin =res.lstvendors[i].vendorVatTin;
		if (vendorContactPerson == null || vendorContactPerson =="") {
			vendorContactPerson="-";
		}
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+vendorId+'</td> '
		  + '	<td>'+vendorName+'</td> '
		/*  + '	<td>'+vendorCode+'</td> '
		  + '	<td>'+vendorContactPerson+'</td> '
		 
		  
		  +'<input type="hidden" id="vendorId'+vendorId+'" value="'+vendorId+'">'
		  +'<input type="hidden" id="vendorName'+vendorId+'" value="'+vendorName+'">'
		  +'<input type="hidden" id="vendorCode'+vendorId+'" value="'+vendorCode+'">'
		  +'<input type="hidden" id="vendorContactPerson'+vendorId+'" value="'+vendorContactPerson+'">'
		  +'<input type="hidden" id="vendorVatTin'+vendorId+'" value="'+vendorVatTin+'">'
		  
		  
		  +'<td><button id="btnEdit" class="btn btn-xs btn-success" onclick="editVendor('+vendorId+')" value="EDIT">'
		  +'<i class="fa fa-edit"></i></button></td>'
		  
		  +'<td><button id="btnDelete" class="btn btn-xs btn-success" onclick="deleteVendor('+vendorId+')" value="DELETE">'
		  +'<i class="fa fa-trash-o"></i></button></td>'
		  
		  + '	<td><a href="#venAdd'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>'; 
		 
		  + '	</td>'
		 
		  
		 
		  + '</tr> ';
			
	  var resultSlave= 
			  ' <div class="panel-collapse collapse" id="venAdd'+i+'" style="height: 0px;">'
		    + ' <div class="panel-body"> '		
			+ ' <table class="table table-hover" id="vendoraddress"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Address</th> '
			+ '			<th>City</th> '
			+ '			<th>State</th> '		
			+ '			<th>GST No</th> '
			
			+ '			<th>Phone No</th> '
			+ '			<th>Email ID</th> '
			
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';	 

		  for(var k=0;k<res.lstvendors[i].vendorAddresses.length;k++){
			  
			  var vendorAddressId=res.lstvendors[i].vendorAddresses[k].vendorAddressId;
			  var vendorAddress=res.lstvendors[i].vendorAddresses[k].vendorAddress;
			  var vendorArea =res.lstvendors[i].vendorAddresses[k].vendorArea;
			  var city =res.lstvendors[i].vendorAddresses[k].city;
			  var state =res.lstvendors[i].vendorAddresses[k].state;
			  var gstNo =res.lstvendors[i].vendorAddresses[k].gstNo;
			 
			  var vendorEmailId =res.lstvendors[i].vendorAddresses[k].vendorEmailId;
			  var vendorMobileNumber =res.lstvendors[i].vendorAddresses[k].vendorMobileNumber;
			  var vendorLandline =res.lstvendors[i].vendorAddresses[k].vendorLandline;
			  
			  
			  var phoneNumber=0;
			  if (vendorMobileNumber == "" || vendorMobileNumber == null) {
				  phoneNumber =vendorLandline;
			  }else{
				  phoneNumber =vendorMobileNumber;
			  }
			  resultSlave = resultSlave + '<tr> '
					+ '	<td>'+(k+1)+'</td> '
					+ '	<td >'+(vendorAddress)+( vendorArea)+'</td> '
					+ '	<td >'+city+'</td> '
					+ '	<td >'+state+'</td> '
					+ '	<td >'+gstNo+'</td> '
					+ '	<td >'+phoneNumber+'</td> '	
					+ '	<td >'+vendorEmailId+'</td> '
					+ '	<td >'
					  +'<input type="hidden" id="vendorAddressId'+vendorAddressId+'" value="'+vendorAddressId+'">'
					  +'<input type="hidden" id="vendorAddress'+vendorAddressId+'" value="'+vendorAddress+'">'
					  +'<input type="hidden" id="vendorArea'+vendorAddressId+'" value="'+vendorArea+'">'
					  +'<input type="hidden" id="city'+vendorAddressId+'" value="'+city+'">'
					  +'<input type="hidden" id="state'+vendorAddressId+'" value="'+state+'">'
					  
					  +'<input type="hidden" id="gstNo'+vendorAddressId+'" value="'+gstNo+'">'
					  +'<input type="hidden" id="vendorEmailId'+vendorAddressId+'" value="'+vendorEmailId+'">'
					  +'<input type="hidden" id="vendorMobileNumber'+vendorAddressId+'" value="'+vendorMobileNumber+'">'
					  +'<input type="hidden" id="vendorLandline'+vendorAddressId+'" value="'+vendorLandline+'">'
					  +'</td> '
					;
					
					+ '</tr>';	
			  
		  }	
		
		resultSlave=resultSlave + '	</tbody></table></div></div> ';
		result=result +resultSlave;		
					  	
	}
		
	result=result
	+ '	</tbody> '
	+ '</table> ';		

	$("#suplierDiv").html(result);
}*/




function setSupplierlist(res){
	
	//alert("hello-------------"+JSON.stringify(res));
	var result= ' <table class="table table-hover" id="receipts"> '
	+ ' <thead> '
	+ '		<tr> '
	+ '			<th>Sr No</th> '
	+ '			<th>Vendor Id</th> '
	+ '			<th>Supplier Name</th> '
/*	+ '			<th>Suplier Code</th> '*/
	+ '			<th>Contact Person</th> '
	
	+ '			<th>Edit</th> '
	+ '			<th>Delete</th> '
	+ '			<th>Vendor Add</th> '
	+ '		</tr> '
	+ '	</thead> '
	+ '	<tbody> ';
		
	for(var i=0;i<res.lstvendors.length;i++){
		
		var vendorId=res.lstvendors[i].vendorId;
		var vendorName=res.lstvendors[i].vendorName;
		var vendorCode=res.lstvendors[i].vendorCode;
		var vendorContactPerson =res.lstvendors[i].vendorContactPerson;
		var vendorVatTin =res.lstvendors[i].vendorVatTin;
		if (vendorContactPerson == null || vendorContactPerson =="") {
			vendorContactPerson="-";
		}
		
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+vendorId+'</td> '
		  + '	<td>'+vendorName+'</td> '
		/*  + '	<td>'+vendorCode+'</td> '*/
		  + '	<td>'+vendorContactPerson+'</td> '
		 
		  
		  +'<input type="hidden" id="vendorId'+vendorId+'" value="'+vendorId+'">'
		  +'<input type="hidden" id="vendorName'+vendorId+'" value="'+vendorName+'">'
		  +'<input type="hidden" id="vendorCode'+vendorId+'" value="'+vendorCode+'">'
		  +'<input type="hidden" id="vendorContactPerson'+vendorId+'" value="'+vendorContactPerson+'">'
		  +'<input type="hidden" id="vendorVatTin'+vendorId+'" value="'+vendorVatTin+'">'
		  
		  
		  +'<td><button id="btnEdit" class="btn btn-xs btn-success" onclick="editVendor('+vendorId+')" value="EDIT">'
		  +'<i class="fa fa-edit"></i></button></td>'
		  
		  +'<td><button id="btnDelete" class="btn btn-xs btn-success" onclick="deleteVendor('+vendorId+')" value="DELETE">'
		  +'<i class="fa fa-trash-o"></i></button></td>'
		  
		  + '	<td><a href="#venAdd'+i+'" data-parent="#accordio" data-toggle="collapse" class="accordion-toggle"><button><i class="fa fa-chevron-down"></button></i></a>'; 
		 
		  + '	</td>'
		 
		  
		 
		  + '</tr> ';
			
	  var resultSlave= 
			  ' <div class="panel-collapse collapse" id="venAdd'+i+'" style="height: 0px;">'
		    + ' <div class="panel-body"> '		
			+ ' <table class="table table-hover" id="vendoraddress"> '
			+ ' <thead> '
			+ '		<tr> '
			+ '			<th>#</th> '
			+ '			<th>Address</th> '
			+ '			<th>City</th> '
			+ '			<th>State</th> '		
			+ '			<th>GST No</th> '
			
			+ '			<th>Phone No</th> '
			+ '			<th>Email ID</th> '
			
			+ '		</tr> '
			+ '	</thead> '
			+ '	<tbody> ';	 

		  for(var k=0;k<res.lstvendors[i].vendorAddresses.length;k++){
			  
			  var vendorAddressId=res.lstvendors[i].vendorAddresses[k].vendorAddressId;
			  var vendorAddress=res.lstvendors[i].vendorAddresses[k].vendorAddress;
			  var vendorArea =res.lstvendors[i].vendorAddresses[k].vendorArea;
			  var city =res.lstvendors[i].vendorAddresses[k].city;
			  var state =res.lstvendors[i].vendorAddresses[k].state;
			  var gstNo =res.lstvendors[i].vendorAddresses[k].gstNo;
			 
			  var vendorEmailId =res.lstvendors[i].vendorAddresses[k].vendorEmailId;
			  var vendorMobileNumber =res.lstvendors[i].vendorAddresses[k].vendorMobileNumber;
			  var vendorLandline =res.lstvendors[i].vendorAddresses[k].vendorLandline;
			  
			  
			  var phoneNumber=0;
			  if (vendorMobileNumber == "" || vendorMobileNumber == null) {
				  phoneNumber =vendorLandline;
			  }else{
				  phoneNumber =vendorMobileNumber;
			  }
			  resultSlave = resultSlave + '<tr> '
					+ '	<td>'+(k+1)+'</td> '
					+ '	<td >'+(vendorAddress)+( vendorArea)+'</td> '
					+ '	<td >'+city+'</td> '
					+ '	<td >'+state+'</td> '
					+ '	<td >'+gstNo+'</td> '
					+ '	<td >'+phoneNumber+'</td> '	
					+ '	<td >'+vendorEmailId+'</td> '
					+ '	<td >'
					  +'<input type="hidden" id="vendorAddressId'+vendorAddressId+'" value="'+vendorAddressId+'">'
					  +'<input type="hidden" id="vendorAddress'+vendorAddressId+'" value="'+vendorAddress+'">'
					  +'<input type="hidden" id="vendorArea'+vendorAddressId+'" value="'+vendorArea+'">'
					  +'<input type="hidden" id="city'+vendorAddressId+'" value="'+city+'">'
					  +'<input type="hidden" id="state'+vendorAddressId+'" value="'+state+'">'
					  
					  +'<input type="hidden" id="gstNo'+vendorAddressId+'" value="'+gstNo+'">'
					  +'<input type="hidden" id="vendorEmailId'+vendorAddressId+'" value="'+vendorEmailId+'">'
					  +'<input type="hidden" id="vendorMobileNumber'+vendorAddressId+'" value="'+vendorMobileNumber+'">'
					  +'<input type="hidden" id="vendorLandline'+vendorAddressId+'" value="'+vendorLandline+'">'
					  +'</td> '
					;
					
					+ '</tr>';	
			  
		  }	
		
		resultSlave=resultSlave + '	</tbody></table></div></div> ';
		result=result +resultSlave;		
					  	
	}
		
	result=result
	+ '	</tbody> '
	+ '</table> ';		

	$("#suplierDiv").html(result);
}