var arr = [];

function getServicewiseDetails() {
	
	var doctorid = $("#doctorName").val()
	// var chargesId = $("#lis0").val();// chargesId
	var chargesSlaveId = 0;// static chargesSlaveId
	var liSize = $("#dynamicSponsor li").length;
	
	chargesSlaveId = $("#lis" + (liSize - 1)).val();

	if (chargesSlaveId == 0 || chargesSlaveId == undefined
			|| chargesSlaveId == null || chargesSlaveId==1) {
		chargesSlaveId = 0;
	}

	var sponsorId = chargesSlaveId;

	var department = [];
	var serviceId = 0;
	var subserviceId = 0;

	var fromdatetime = $("#servicewisefdate").val() + " "
			+ $("#servicewiseftime").val();
	var todatetime = $("#servicewisetodate").val() + " "
			+ $("#servicewisetotime").val();

	
	
	
	if ($("#servicewise_opd").is(":checked")) {
		department.push(1);
	}
	if ($("#servicewise_ipd").is(":checked")) {
		department.push(2);
	}
	if ($("#servicewise_diago").is(":checked")) {
		department.push(3);
	}
	
	if(department.length==0){
		$("#spinnerLoader").hide();
		alertify.error("please select at least one department");
		return false;
	}
	else{
		$("#spinnerLoader").show();
	}

	if ($('.multispcheck').is(":checked")) {
		if( $("#multiservicesforreport").val()==null){
			serviceId=0;
		}
		else{
			serviceId = $("#multiservicesforreport").val();
		}
		if($("#multisubservicesforreport").val()==null){
			subserviceId = 0;	
		}else{
			subserviceId = $("#multisubservicesforreport").val();	
		}
		
		
	} else {
		serviceId = $("#servicesforreport").val();
		subserviceId = $("#subservicesforreport").val();
	}

	if (arr.length > 0 && chargesSlaveId!=1 && chargesSlaveId!=0) {
		sponsorId = sponsorId + ',' + arr;
		// alert(arr.length);
	}

	var inputs = [];
	inputs.push('fromdatetime=' + fromdatetime);
	inputs.push('todatetime=' + todatetime);
	inputs.push('department=' + department);
	inputs.push('doctorid=' + doctorid);

	inputs.push('sponsorId=' + sponsorId);
	inputs.push('serviceId=' + serviceId);
	inputs.push('subServiceId=' + subserviceId);
	inputs.push('patientType=' + $("#patienttype").val());

	var str = inputs.join('&');

	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/totalcollection/getServicewisereport",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setDataToReportTable1(r);
			$("#servicepanel").show('slow');
			$("#spinnerLoader").hide();
		}
	});
}


function setDataToReportTable1(r) {
	var htm = "";
	var index = 1;
	
	
	for ( var i = 0; i < r.length; i++) {
		
		var subserviceName="";
		var ReceiptNo="";
		var updated_by="";

		
		if(r[i].sponsorName==null){
			r[i].sponsorName="-";
		}
		if(r[i].serviceName==null){
			r[i].serviceName="-";
		}
		if(r[i].subServiceName==null){
			r[i].subServiceName="-";
		}
		if(r[i].doctorName==null){
			r[i].doctorName="-";
		}
		
		if(r[i].serviceId==3 && r[i].subServiceId==0){
			subserviceName = "Nursing Charges";
		}
		
		else{
			subserviceName = r[i].subServiceName;
		}
		
		if(r[i].departmentName == "IPD" || r[i].receiptNo == null){
					
				ReceiptNo	="-";
			}else{
				
				ReceiptNo =	r[i].receiptNo;
		}
		
		if(r[i].updated_by == null){
			
			updated_by	="-";
		}else{
			
			updated_by =r[i].updated_by;
		}
		
		if(r[i].serviceName=='Bed' && r[i].subServiceName==null){
			r[i].subServiceName = "Nursing Charges";
		}

		htm = htm
				+ '<tr> '
				+ ' <td  class="text-center">'
				+ index
				+ '</td>'

				
				+ ' <td class="text-center">'
				+ r[i].patientId
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].patientName
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].departmentName
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].sponsorName
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].opdIpdno
				+ '</td>'
								
				+ ' <td class="text-center">'
				+ r[i].gender
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].age
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].serviceName
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ subserviceName
				+ '</td>'
				
				+ ' <td class="text-center">'
				+getFormattedDate( new Date(r[i].serviceDate))
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].doctorName
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].rate
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].quantity
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].amount
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].concession
				+ '</td>'

				+ ' <td class="text-center">'
				+ (r[i].amount - r[i].concession).toFixed(2)
				+ '</td>' 
				
				+ ' <td class="text-center">'
				+ r[i].discount
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].refundAmount
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ ReceiptNo
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ r[i].narrationid_bill
				+ '</td>'
				
				+ ' <td class="text-center">'
				+ updated_by
				+ '</td>'
				
				+ '</tr>';
		index++;
	}
	if(r.length==0){
		htm = htm + "<tr class='text-center'><td colspan='18' style='color:red'><h4>Record Not Found....!</h4></td></tr>";
	}
	$("#servicewiseinfo").html(htm);
}

function getFormattedDate(date) {

	var todayTime = date;

	var month = todayTime.getMonth() + 1;

	var day = todayTime.getDate();

	var year = todayTime.getFullYear();
	
	 var hour    = todayTime.getHours();
     var minute  = todayTime.getMinutes();
     var second  = todayTime.getSeconds(); 
	
	return day+"-"+month+"-"+year+" "+hour+":"+minute+":"+second;
}

function getAllServices() {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/totalcollection/getallserviceslist",
		success : function(r) {
			
			var alistTemp = "";
			alistTemp = alistTemp
					+ "<option value='0'>--Select Services--</option>";
			for ( var i = 0; i < r.length; i++) {
				alistTemp = alistTemp + "<option value="
						+ r[i].serviceId + " data-name='"
						+r[i].serviceName + "'>"
						+ r[i].serviceName + "</option>";
			}
			$("#servicesforreport").html(alistTemp);
			$("#servicesforreport").select2();

			$("#multiservicesforreport").html(alistTemp);
			$("#multiservicesforreport").select2();
		}
	});
}

function getAllSubServices(callfrom) {
	
	var inputs = [];
	var url = "";
	if (callfrom == 'single') {
		var serviceId = $("#servicesforreport").val();
		
		if (serviceId == "" || serviceId == undefined) {
			serviceId = 0;
		}
		inputs.push("serviceId=" + serviceId);

		url = "ehat/finance/fetchSubServices";

	} else {
		var serviceId = $("#multiservicesforreport").val();
		if (serviceId == "" || serviceId == undefined) {
			serviceId = 0;
		}
		inputs.push("serviceId=" + serviceId);
		url = "ehat/totalcollection/getMultipleServices";
	}

	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : url,
		error : function() {
			//alert('Network Issue!!!');
		},
		success : function(r) {
			// alert(r.lstSubService.length);
			var list = "<option value='0'>--Select Subservice--</option>";

			if (callfrom == "single") {
				for ( var i = 0; i < r.lstSubService.length; i++) {
					list = list + "<option value='" + r.lstSubService[i].subId
							+ "'>" + (r.lstSubService[i].categoryName)
							+ "</option>";
				}
				$("#subservicesforreport").html(list);
				$("#subservicesforreport").select2();
			} else {
				for ( var i = 0; i < r.length; i++) {
					list = list + "<option value='" + r[i].subId + "'>"
							+ (r[i].categoryName) + "</option>";
				}
				$("#multisubservicesforreport").html(list);
				$("#multisubservicesforreport").select2();
			}
		}
	});
}

function getTime(id) {
	// alert(id+"time");
	$("#" + id).datetimepicker({
		datepicker : false,
		format : 'H:i',
		step : 10
	});
}

function setCurrentDateAndTime(){
	
	  var now     = new Date(); 
      var year    = now.getFullYear();
      var month   = now.getMonth()+1; 
      var day     = now.getDate();
      var hour    = now.getHours();
      var minute  = now.getMinutes();
      var second  = now.getSeconds(); 
      if(month.toString().length == 1) {
           month = '0'+month;
      }
      if(day.toString().length == 1) {
           day = '0'+day;
      }   
      if(hour.toString().length == 1) {
           hour = '0'+hour;
      }
      if(minute.toString().length == 1) {
           minute = '0'+minute;
      }
      if(second.toString().length == 1) {
           second = '0'+second;
      }
      
      $("#servicewisefdate").val(year+"-"+month+"-"+day);
	 $("#servicewiseftime").val(hour+":"+minute);
     $("#servicewisetodate").val(year+"-"+month+"-"+day);
     $("#servicewisetotime").val(hour+":"+minute);
      
      
}

function getIpdCollectionReport(callfrom){
	
	var inputs = [];
	var paymode=0;
	var  fromdatetime="";
	 var todatetime="";
	 
	if(callfrom=='collectionreport'){
		fromdatetime = $("#servicewisefdate").val()+" "+$("#servicewiseftime").val();
		todatetime = $("#servicewisetodate").val()+" "+$("#servicewisetotime").val();
	}
	
	inputs.push('fromdatetime=' + fromdatetime);
	inputs.push('todatetime=' + todatetime);
	inputs.push('payMode=' + paymode);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/totalcollection/getIpdDetailsReport",
		data : str + "&reqType=AJAX",
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
				$("#ipdcolltablediv").show('slow');
				setDataToReportTable(r,'ipdcollectionlist');	

		}
	});
}

function getValues(value){
	
	if(value==null || value==undefined){
		return "-"
	}
	else{
		return value;
	}
}

function setDataToReportTable(r,template){
	
	var htm = "";
	var index = 1;
	var speciality="-";
	var meeshaFlow = $("#meeshaFlow").val();
		
	for ( var i = 0; i < r.length; i++) {
		
		if(r[i].deleted=='N'){
			
		//alert(r[i].invoiceCount);
			
		if(meeshaFlow == "on"){
				 
			billId=r[i].billId;
		}
		else{
			billId=r[i].invoiceCount;
		}
			
		
		htm = htm
		+ '<tr> '
		+ ' <td  class="text-center">'
		+ index
		+ '</td>'

		+ ' <td class="text-center">'
		+ billId
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ r[i].receiptId
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ r[i].receiptBy
		+ '</td>'
		
		/*+ ' <td class="text-center">'
		+ r[i].invoiceCount
		+ '</td>'*/
		
		+ ' <td class="text-center">'
		+ getFormattedDate( new Date(r[i].doa),"datetime")
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ r[i].pid
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ r[i].patientName
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ r[i].sponsorName
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ getValues(r[i].consultingDoctor)
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ getValues(r[i].speciality)
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ getValues(r[i].address)
		+ '</td>'
		
		
		+ ' <td class="text-center">'
		+ getValues(r[i].city)
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ getValues(r[i].taluka)
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ getValues(r[i].district)
		+ '</td>'
		
		
		+ ' <td class="text-center">'
		+getFormattedDate( new Date(r[i].receiptDate),"datetime")
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ r[i].paidAmt
		+ '</td>'
	
		+ ' <td class="text-center">'
		+ r[i].paymode
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ r[i].cardNumber
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ getValues(r[i].bankName)
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ getValues(r[i].remark)
		+ '</td>'

		+ ' <td class="text-center">'
		+ r[i].reference
		+ '</td>'
		
		+ ' <td class="text-center">'
		+ getValues(r[i].refDoc)
		+ '</td>'
		
		+ '</tr>';
index++;
	}	
	}
	if(r.length==0){
		htm = htm + "<tr class='text-center'><td colspan='22' style='color:red'><h4>Record Not Found....!</h4></td></tr>";
	}
	$("#"+template).html(htm);
}

function changeMultiBox() {
	$("#multisubservicesforreport").select2();
	$("#multiservicesforreport").select2();
	// alert($('.multispcheck').is(":checked"));
	if ($('.multispcheck').is(":checked")) {
		$('#singleservicediv').hide();
		$("#singlesubservicediv").hide();
		$("#mutliservicediv").show();
		$("#mutlisubservicediv").show();
	} else {
		$('#singleservicediv').show();
		$("#singlesubservicediv").show();
		$("#mutliservicediv").hide();
		$("#mutlisubservicediv").hide();
	}
}
/*
function openIpdReportDetailsPDF() {
    html2canvas(document.getElementById('ipdcollectiontable'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500
                }]
            };
            pdfMake.createPdf(docDefinition).download("Table.pdf");
        }
    });
}*/


/*function openIpdReportDetailsPDF() {
	
	
	
	 var doc = new jsPDF('p', 'pt','letter');
	    // Supply data via script
	    var body =  [
            ['SL.No', 'Product Name', 'Price', 'Model'],
            [1, 'I-phone', 75000, '2021'],
            [2, 'Realme', 25000, '2022'],
            [3, 'Oneplus', 30000, '2021'],
            ] // generate auto table with body
	    var y = 10;
	    doc.setLineWidth(2);
	    doc.text(200, y = y + 30, "Product detailed report");
	     //doc.autoTable({startY: 15,html: '.body', styles : { halign : 'center'}, headStyles :{fillColor : [124, 95, 240]}, alternateRowStyles: {fillColor : [231, 215, 252]}, tableLineColor: [124, 95, 240], tableLineWidth: 0.1,}); //use headStyles to bring styles to the table head, and alternateRowStyles to color the rows but one yes and one no
	   
	    doc.fromHTML({
	        body :body,
	        startY: 70,
	        theme: 'grid',
	    //styles : { halign : 'center'}, headStyles :{fillColor : [124, 95, 240]}, alternateRowStyles: {fillColor : [231, 215, 252]},    
	                 })
	    // save the data to this file
	    doc.save('auto_table_with_javascript_data');

}*/




function openIpdReportDetailsPDF()
{
	
	
	/*var fromDate = ($("#fromDate").val()).split("/");
	var fdate =(fromDate[2] + "-" + fromDate[1] + "-" + fromDate[0]);  // added by sandip
	var lastDate = ($("#lastDate").val()).split("/");
	var tdate =(lastDate[2] + "-" + lastDate[1] + "-" + lastDate[0]);
	var fromTime = $("#fromTime").val();
	var toTime = $("#lastTime").val();
	
	if(fromTime=="")
	{
	fromTime= "00:00:00";
	}
	if(toTime=="")
	{
	toTime= "23:59:00";
	}
	
	fdate=fdate+" "+fromTime;
	tdate=tdate+" "+toTime;
	var unitId = parseInt($("#unitId").val());*/
	
	var fromdatetime = $("#servicewisefdate").val()+" "+$("#servicewiseftime").val();
	var todatetime = $("#servicewisetodate").val()+" "+$("#servicewisetotime").val();
	var paymode=0;
	
	
		setTimeout(function() {
		//window.open(("DailyCollectionReportPdfNew.jsp?"+"&userId="+userId+"&unitId="+unitId+"&fromDate="+fdate+"&lastDate="+tdate+"&deptId="+deptId+"&payModeId="+payModeId));
			window.open(("ipd_receipt_collection_report_pdf.jsp?"+"&fromdatetime="+fromdatetime+"&todatetime="+todatetime+"&paymode="+paymode));
				
		}, 300);	
	
	
	
}