//jitendra 4July2019


//jitendra 4July2019
function fetchDistrictwisePatientCountReport() {
	
	if ($("#month").val() == '0') {
		alert("Please select month !");
		return false;
	}
	
	var year=$("#year").val();
	var month=$("#month").val();
	
	jQuery.ajax({
		async : true,
		type : "GET",
		data	: {
			  "year":year,
			  "month":month
			},
		url : "ehat/report/fetchDistrictwisePatientCountReportList",
		
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			//alert("jitendra");
			//setTempMonthlyDistrictWisePatientCountReport(r);
			/*ajaxResponse = r;
			pobj1 = eval('(' + ajaxResponse + ')');
			alert(pobj1);*/
			setTempMonthlyDistrictWisePatientCountReport(r);
		}
	});
}

//jitendra
function setTempMonthlyDistrictWisePatientCountReport(r) {
	/*alert(myJSON);
	var r = JSON.stringify(myJSON); */
	var htm = "<div  id='monthlyDistrictwisePatientCountHeader' class='col-sm-12-1'>"
			+ "<table class='table table-condensed header-fixed' style='margin-top: 10px;'>"
			+ "<thead>"
			+ "<tr>"
			+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
			+ "<th class='col-md-3-1 center' style='height: 21.5px;'><div class='TextFont'>District</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Monthly OPD</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Progressive OPD</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Monthly IPD</div></th>"
			+ "<th class='col-md-2-1 center' style='height: 21.5px;'><div class='TextFont'>Progressive IPD</div></th>"
			+ "</tr>" + "</thead>	" + "</table></div>";

	var index = 1;
	
	 
	
	/*var totalMonthlyOPD = 0;
	var totalMonthlyIPD = 0;
	var totalPrograssiveOPD = 0;
	var totalPrograssiveIPD = 0;*/
	for ( var i = 0; i < r.lDistrictwisePatientCountDTOs.length; i++) {
		/*totalMonthlyOPD = totalMonthlyOPD + r.lDistrictwisePatientCountDTOs[i].monthlyOPD;
		totalMonthlyIPD = totalMonthlyIPD + r.lDistrictwisePatientCountDTOs[i].monthlyIPD;
		totalPrograssiveOPD = totalPrograssiveOPD + r.lDistrictwisePatientCountDTOs[i].progressiveOPD;
		totalPrograssiveIPD = totalPrograssiveIPD + r.lDistrictwisePatientCountDTOs[i].progressiveIPD;*/

		
		htm = htm
				+ "<div  class='col-sm-12-1 scroller' style='margin-top:-21px; border: 1px solid #ddd; height: 0px; max-height: auto;display:none;'>"
				+ "<table class='table table-condensed cf'>"
				+ "<tbody>"
				+ "<td class='col-sm-1-1 center' style='height: 21.5px;'>"
				+ index
				+ "</td>"
				+ "<td class='col-sm-3-1 center' style='height: 21.5px;'>"
				+    r.lDistrictwisePatientCountDTOs[i].districtName 
				+ "</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+   r.lDistrictwisePatientCountDTOs[i].monthlyOPD 
				+ "</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ r.lDistrictwisePatientCountDTOs[i].progressiveOPD 
				+ "</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ r.lDistrictwisePatientCountDTOs[i].monthlyIPD 
				+ "</td>"
				+ "<td class='col-sm-2-1 center' style='height: 21.5px;'>"
				+ r.lDistrictwisePatientCountDTOs[i].progressiveIPD 
				+ "</td>"
				+ "</tr>" + "</tbody>"
				+ "</table>" + "</div>";
		index++;
	}

	$("#container").html(htm);

}