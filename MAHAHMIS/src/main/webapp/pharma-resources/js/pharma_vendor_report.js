/******
 * @author    :Akshata Desai
 * @Code      :For getting Vendor Report 
 * ******/
function getSupplierData(){

	var fromd = $("#popup_container2").val();
	var tod = $("#popup_container3").val();
	
	farr = fromd.split('/');
	tarr = tod.split('/');
	
	from = farr[2]+'-'+farr[1]+'-'+farr[0];
	to = tarr[2]+'-'+tarr[1]+'-'+tarr[0];

	if (from == "" || from == null || to == '' || to == null) {
		alert("Please  Select The Date First");
	} else {

		
		var inputs = [];
		inputs.push('from=' + encodeURIComponent(from));
		inputs.push('to=' + encodeURIComponent(to));
		
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			data : str + "&reqType=AJAX",
			//url : "../report/getSupplierListReport",
			url : "../pharmacyReport/getSupplierListReport",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('Network Issue!');
			},
			success : function(r) {
				
				setSupplierData(r);
				
			}
		});

	} 
}

/******
 * @author    :BILAL
 * @Date      :30-01-2018
 * @Code      :For set Vendor Report Template 
 * ******/
function setSupplierData(res){
	
	
	
	
	var result= ' <table class="table table-hover" id="receipts"> '
	+ ' <thead> '
	+ '		<tr> '
	+ '			<th>Sr No</th> '
	+ '			<th>Vendor Id</th> '
	+ '			<th>Supplier Name</th> '
	+ '			<th>Suplier Code</th> '
	+ '			<th>Contact Person</th> '
	+ '			<th>Vendor Add</th> '
	+ '		</tr> '
	+ '	</thead> '
	+ '	<tbody> ';
		
	for(var i=0;i<res.lstvendors.length;i++){
		
		var vendorId=res.lstvendors[i].vendorId;
		var vendorName=res.lstvendors[i].vendorName;
		var vendorCode=res.lstvendors[i].vendorCode;
		var vendorContactPerson =res.lstvendors[i].vendorContactPerson;
		
		if (vendorContactPerson == null || vendorContactPerson =="") {
			vendorContactPerson="-";
		}
	
		result=result
		  + '<tr> '
		  + '	<td>'+(i+1)+'</td> '
		  + '	<td>'+vendorId+'</td> '
		  + '	<td>'+vendorName+'</td> '
		  + '	<td>'+vendorCode+'</td> '
		  + '	<td>'+vendorContactPerson+'</td> '
		  
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
			+ '			<th>PAN No</th> '
			+ '			<th>Phone No</th> '
			+ '			<th>Email ID</th> '
			+ '			<th>Bank Name</th> '
			+ '			<th>IFSC Code</th> '
			+ '			<th>CIN No</th> '
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
			  var PANno ="-";
			  var vendorEmailId =res.lstvendors[i].vendorAddresses[k].vendorEmailId;
			  var vendorMobileNumber =res.lstvendors[i].vendorAddresses[k].vendorMobileNumber;
			  var vendorLandline =res.lstvendors[i].vendorAddresses[k].vendorLandline;
			  
			  var BankName ="-";
			  var ifcCode ="-";
			  var cinno ="-";
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
					+ '	<td >'+PANno+'</td> '
					+ '	<td >'+phoneNumber+'</td> '	
					+ '	<td >'+vendorEmailId+'</td> '	
					+ '	<td >'+BankName+'</td> '
					+ '	<td >'+ifcCode+'</td> '
					+ '	<td >'+cinno+'</td> '
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