function fetchWordTypeList() {
	
	var id= $("#wardTypeHall").val();
	
	if(!(id >= 0) || id==null)
		id = 0;
	var inputs = [];
	inputs.push('hallTypeId=' + encodeURIComponent(id));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		//url : "ehat/wardtypecontroller/fetchwordtypelist",
		url : "ehat/bedmgt/getWardTypeList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			//setWardType(r);
			setWardTypeList(r,id);
		}
	});
}

function setWardTypeList(r,hallTypeId){
	
	var htm = "";
	if(hallTypeId > 0)
		htm = "<option value='0'>-- Select Ward Name --</option>";
	else
		htm = "<option value='0'>-- Select Ward Type --</option>";
	
	for (var i=0;i<r.lstChargesSlave.length;i++)	{
		
		htm = htm + "<option value="+r.lstChargesSlave[i].slaveId+">"+r.lstChargesSlave[i].categoryName+"</option>";
	}
	if(hallTypeId > 0)
		$("#wardName").html(htm);
	else
		$("#wardTypeHall").html(htm);
}

function setWardType(r)
{
	var ajaxResponse = r;
	
	var divContent = "";
	divContent = divContent
			+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var i = 0; i < r.lstChargesSlave.length; i++) 
	{
		
		/*divContent = divContent + "<option value="+r.lstChargesSlave[i].categoryName+" data-name="+r.lstChargesSlave[i].categoryName+" data-id="+r.lstChargesSlave[i].slaveId+">"
				+ r.lstChargesSlave[i].categoryName + "</option>";*/
		
		divContent=divContent+'<option  value="'+(r.lstChargesSlave[i].slaveId)+'" data-hall_id="'+r.lstChargesSlave[i].slaveId+'" id="'+(r.lstChargesSlave[i].slaveId)+'" data-name="'+r.lstChargesSlave[i].categoryName+'">'+(r.lstChargesSlave[i].categoryName)+'</option>';
	}
	divContent = divContent + "</select>";
	$("#wardTypeHall").html(divContent);	
}

/************
* @author	: Dayanand Khandekar
* @date		: 26-04-2021
* @codeFor	: fetch ward name list as per the hall type
 ************/
function fetchWordNameList() {
	var hallType=$("#wardTypeHall").val();
	
	
	var inputs = [];
	inputs.push('hallType=' + hallType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbed/fetchWordNameList",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			setWardName(r);
		}
	});
}


function setWardName(r)
{
	var ajaxResponse = r;
	
	
	var divContent = "";
	
	divContent = divContent
			+ "<select name='wardTypeHall'  class='col-md-12' ><option value='0'>--Select--</option>";
	for ( var i = 0; i < r.hallList.length; i++) 
	{
		
		/*divContent = divContent + "<option value="+r.lstChargesSlave[i].categoryName+" data-name="+r.lstChargesSlave[i].categoryName+" data-id="+r.lstChargesSlave[i].slaveId+">"
				+ r.lstChargesSlave[i].categoryName + "</option>";*/
		
		divContent=divContent+'<option  value="'+(r.hallList[i].hall)+'" data-hall_id="'+r.hallList[i].hall+'" id="'+(r.hallList[i].hall)+'" data-name="'+r.hallList[i].hallName+'">'+(r.hallList[i].hallName)+'</option>';
	}
	divContent = divContent + "</select>";
	$("#wardName").html(divContent);	
}




/************
* @author	: Dayanand Khandekar
* @date		: 26-04-2021
* @codeFor	: fetch No Of Beds Available in Perticular hall
 ************/
function fetchNoOfBeds(callFrom) {
	var hallId=1;
	if(callFrom === "allBed"){
		hallId=1;
	}else{
	 hallId=$("#wardName").val();
	}
	
	
	var inputs = [];
	inputs.push('hallId=' + hallId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbed/fetchNoOfBeds",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			
			
			$("#graPicalBedInfo").show();
		//	createGraphicalView(r);
		createGraphicalViewIPD(r);
		}
	});
}

function createGraphicalView(r) {
	var hallName=r.hallList[0].hallName;
	$("#totalBeds").text(r.hallList[0].numberOfBed);
	$("#AvailableBeds").text(r.countAvailableBeds);
	$("#cleaningBeds").text(r.countCleaningBeds);
	$("#allocatesBeds").text(r.countAllocateBeds);
	
	if (r.hallList[0].numberOfBed > 0) {

		var bedList = "<table class='table'> <tbody class='col-md-12-1' style='margin-top: 0px;'> ";
		var loopCounter = 0;
		// var bedCount = (BedsBean.hl[0].bn);
		var bedCount = r.hallList[0].numberOfBed;

		var row1 = 0;
		var row2 = 0;
		var row3 = 0;

		if (bedCount > 0 && bedCount <= 10) { // 1 to 10
			row1 = bedCount;

		} else if (bedCount > 10 && bedCount <= 20) {
			row1 = 10;
			row2 = bedCount;

		} else if (bedCount > 20 && bedCount <= 30) {
			row1 = 10;
			row2 = 20;
			row3 = bedCount;

		} else if (bedCount > 30) {
			row1 = (Math.round(bedCount / 3.5) + 1);
			row2 = row1 * 2;
			row3 = row1 * 3;
		}
  
		//$.each(	BedsBean.hl[0].bl,function(name, bl)
			for (var i=0;i<r.hallList[0].numberOfBed;i++)	{

							/*
							 * loopCounter == 0 || loopCounter == 15 ||
							 * loopCounter == 30 || loopCounter == 45
							 */
							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "<tr id='' class=''>";
							}
                   
							if (r.hallList[0].bedsList[i].bedstate == '2') {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 200px; background-color: orange; border: 1px solid orange;'> "
										+ "<img src='images/clean1.png' width='100px' height='80px' style='margin-left: 25px;'"
										/*
										 * + "<img src='images/clean.jpg'
										 * width='100px' height='56px'"
										 */
										+ " onclick='swapImages(this,"
										+ r.hallList[0].bedsList[i].bed_ID
										+ ","
										+r.hallList[0]. hall_type
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 46px;'>Bed Name: "
										+r.hallList[0].bedsList[i].bed_name + "</label> "
										+ "</div> </td>";

							} else if (r.hallList[0].bedsList[i].bedstate == '4') {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 200px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'> "
										+ "<div style='height: 17px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 33px; width: 148px;'>"
										+ "<img src='images/bedEmpty1.png' width='35px' height='20px'"
										/*
										 * + "<img src='images/bedEmpty.png'
										 * width='60px' height='30px' "
										 */
										+ " onclick='swapImages(this,"
										+ r.hallList[0].bedsList[i].bed_ID
										+ ","
										+ r.hallList[0]. hall_type
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name: "
										+ r.hallList[0].bedsList[i].bed_name + "</label></div>"
										+ "</div> </td>";

							} else if (r.hallList[0].bedsList[i].bedstate  == '3') { // Allocated
								
								
							

								var pay="";
								var sourceTypeId=r.hallList[0].bedsList[i].patList[0].sourceTypeId;
								var sponsorName=r.hallList[0].bedsList[i].patList[0].sponsorName;
								if(sourceTypeId==0)
									{
										pay = pay +"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Self Pay</label>";
									}
								else
									{
									pay = pay +"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Sponsor Name:"
										+sponsorName
									+"</label>"
									+"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Sponsor Pay</label>";
									}

								// for Sponsored Patent Type
								var redDot = "";
								
								if (r.hallList[0].bedsList[i].patList[0].objTreatment.sdic != 0) {
									redDot = "<label style='float: right; height: 15px; margin-bottom: 0px;'> "
											+ "<img src='images/Red_dot.png' width='13px' height='13px' style='border: 2px solid white;'></images></label> ";

									pay = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>"
											+r.hallList[0].bedsList[i].patList[0].objTreatment.insuCmpny
											+ "</label>";
								}

								// bed allocated to 'patient' or 'relative'
								var bedAllocatedForBedName = "";
								var nameRelative = "";
								var docNameTemp="";
								var docName=r.hallList[0].bedsList[i].patList[0].docName;
								if(docName=="-")
									{
										docNameTemp=docNameTemp
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Doctor Name: "
										+ "--------"
										+ "</label>";
									}
								else{
									var str_array = docName.split(',');
									if(str_array.length==1)
										{
											docNameTemp=docNameTemp
											+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Doctor Name: "
											+ docName
											+ "</label>";
										}
									else{
										var liTemp="";
										for(var j=0;j<str_array.length;j++)
											{
											liTemp=liTemp
											+'<li><a href="#">'+str_array[j]+'</a></li>';
											}
										docNameTemp=docNameTemp
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 21px'>"
										+" <div class='dropdown'>"
									    +" <button class='btn btn-default btn-xs dropdown-toggle' type='button' data-toggle='dropdown'>Show Doctor"
									    +"<span class='caret'></span></button>"
									    +"<ul class='dropdown-menu'>" 
									    +liTemp
									    +"</ul>" 
									    +"</div>"
										+"</label>";
										
									}

								}
							
								// bed allocated to 'patient'
								if (r.hallList[0].bedsList[i].patList[0].objtreatmentbeds.bedAllocatedFor == 'P') {

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 131px; margin-bottom: 0px;'>"
											+ r.hallList[0].bedsList[i].patList[0].prefix
											+ " "
											+ r.hallList[0].bedsList[i].patList[0].fName
											+ " "
											+ r.hallList[0].bedsList[i].patList[0].mName
											+ " "
											+ r.hallList[0].bedsList[i].patList[0].lName
											+ "</label>" + redDot;

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'><img src='images/bedOcc1.png' width='30px' height='25px'"
											+ " onclick='swapImages(this,"
											+ r.hallList[0].bedsList[i].bed_ID
											+ ","
											+ r.hallList[0].hall_type
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+r.hallList[0].bedsList[i].bed_name+ "</label></div>";
								} else { // bed allocated to 'relative'

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Relative of: "
										+ r.hallList[0].bedsList[i].patList[0].prefix
										+ " "
										+ r.hallList[0].bedsList[i].patList[0].fName
										+ " "
										+ r.hallList[0].bedsList[i].patList[0].mName
										+ " "
										+ r.hallList[0].bedsList[i].patList[0].lName
											+ "</label>";

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOccRelative.png' width='30px' height='25px' "
											+ " onclick='swapImages(this,"
											+ r.hallList[0].bedsList[i].bed_ID
											+ ","
											+ r.hallList[0].hall_type
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+ r.hallList[0].bedsList[i].bed_name + "</label></div>";
								}

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; min-height: 200px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);' id='bbed"
										+  r.hallList[0].bedsList[i].bed_ID
										+ "'> "
										+ nameRelative
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Patient Id: "
										+ r.hallList[0].bedsList[i].patList[0].patientId
										+ "</label> "
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Admited Days: "
										+ r.hallList[0].bedsList[i].patList[0].admitedDays
										+ "</label> "
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>"
										+ r.hallList[0].bedsList[i].patList[0].mrnno
										+ "</label> "
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>"
										+ (((r.hallList[0].bedsList[i].inDateTime).split(" "))[0])
										+ "</label>"
										
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Hall: "
										+ hallName
										+ "</label>"
										+docNameTemp
										+ pay
										+ bedAllocatedForBedName + "</div>"
										+ "</td>";
							
							
							
							
							
							
							
							}

							loopCounter++;

							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "</tr>";
							}

						} // end for each function

		bedList = bedList + "</tbody> </table>";
		$("#allbeds").html(bedList);
		//return bedList;

	}
};



function createListView(r) {
	$("#totalBeds").text(r.hallList[0].numberOfBed);
	$("#AvailableBeds").text(r.countAvailableBeds);
	$("#cleaningBeds").text(r.countCleaningBeds);
	$("#allocatesBeds").text(r.countAllocateBeds);
	
	if (r.hallList[0].numberOfBed > 0) {

		var bedList ="";
		var count = 1;

		/*$
				.each(
						BedsBean.hl[0].bl,
						function(name, bl) */
		for(var i=0;i<r.hallList[0].numberOfBed;i++){

							bedList = bedList + "<tr>";

							bedList = bedList
									+ "<td class='col-md-1 center' >"
									+ count++ + ".</td>";
							bedList = bedList
									+ "<td class='col-md-1 center' >"
									+r.hallList[0].hallName + "</td>";
							bedList = bedList
									+ "<td class='col-md-1 center'>"
									+ r.hallList[0].bedsList[i].bed_name + "</td>";

							if (r.hallList[0].bedsList[i].bedstate == '2') { // Cleaning

								bedList = bedList
										+ "<td class='col-md-1 center'>"
										+ "<div style='background-color: orange; color: white; padding: 5px 3px;'> Cleaning </div>"
										+ " </td>";
								bedList = bedList
										+ "<td class='col-md-1 center' ></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+r.hallList[0].bedsList[i].bed_ID + "," + r.hall_type
										+ ")' /> " + "</td>";

							} else if (r.hallList[0].bedsList[i].bedstate == '3') { // Allocated
								var pay="";
								var sourceTypeId=r.hallList[0].bedsList[i].patList[0].sourceTypeId;
								var sourceTypeId=0;
								var sponsorName=r.hallList[0].bedsList[i].patList[0].sponsorName;
								if(sourceTypeId==0)
									{
										pay="Self Pay";
									}else
										{
										pay="Sponsor Pay";
										}

								var redDot = "";
								if (r.hallList[0].bedsList[i].patList[0].objTreatment.sdic != '0') {
									redDot = "<label style='background: white; float: right;'> "
											+ "<img src='images/Red_dot.png' width='13px' height='13px' style='padding: 1px; padding-top: 0px;'></images></label> ";
								}

								// for relative
								var relativeSign = "";
								if (r.hallList[0].bedsList[i].patList[0].objtreatmentbeds.bdalfr != 'P') {
									relativeSign = "<label style='font-weight: bold; float: right;'> R </label>";
								}

								var dischargeDate = " ------";
								if ((r.hallList[0].bedsList[i].patList[0].objTreatment.treEnd) != undefined) {
									dischargeDate = (r.hallList[0].bedsList[i].patList[0].objTreatment.treEnd);
								}

								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ "<div style='background-color: rgb(00, 114, 198); color: white; padding: 5px 3px;' id='bbedListView"
										+ r.hallList[0].bedsList[i].bed_ID  + "'> Allocated" + redDot
										+ relativeSign + "</div>" + " </td>";
								bedList = bedList
										+ "<td class='col-sm-2-1' style='height: 21.5px;'>"
										+r.hallList[0].bedsList[i].patList[0].prefix + " " + r.hallList[0].bedsList[i].patList[0].fName + " " + r.hallList[0].bedsList[i].patList[0].mName
										+ " " +r.hallList[0].bedsList[i].patList[0].lName + "</td>";
								bedList = bedList
										+ "<td class='col-sm-1-1' style='height: 21.5px;'>"
										+ r.hallList[0].bedsList[i].patList[0].mrnno + "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ (r.hallList[0].bedsList[i].patList[0].age) + "/" + (r.hallList[0].bedsList[i].patList[0].gender)
										+ "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ (((r.hallList[0].bedsList[i].inDateTime).split(" "))[0])
										+ "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ dischargeDate + "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+r.hallList[0].bedsList[i].patList[0].objTreatment.insuCmpny
										+ pay
										+ "</td>";
								bedList = bedList
										+ "<td class='center col-sm-1-1' style='height: 21.5px;'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+ r.hallList[0].bedsList[i].bed_ID + "," + r.hallList[0].hall_type
										+ ")' /> " + "</td>";

							} else if (r.hallList[0].bedsList[i].bedstate == '4') { // Available

								bedList = bedList
										+ "<td class='col-md-1 center'>"
										+ "<div style='background-color: rgb(34, 177, 77); color: white; padding: 5px 3px;'> Available </div>"
										+ " </td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'></td>";
								bedList = bedList
										+ "<td class='col-md-1 center'>"
										+ "<input type='checkbox' onclick='swapImages(this,"
										+ r.hallList[0].bedsList[i].bed_ID + "," + r.hallList[0].hall_type
										+ ")' /> " + "</td>";
							}

							bedList = bedList + "</tr>";

						} // end for each function

		bedList = bedList + "</tbody>" + "</table>" ;
		$("#allbedsListViewTemp").html(bedList);
		//return bedList;
	}
};

function createGrapicalListView(){
	var viewinfo=$("#viewInfo").val();
	
	var hallId=$("#wardName").val();
	
	
	
	if(hallId ==0){
		alertify.error("Please Select Ward First..");
		return false;
	}
	
	var inputs = [];
	inputs.push('hallId=' + hallId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbed/fetchNoOfBeds",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			if(viewinfo == 1){
				
				$("#graPicalBedInfo").show();
				$("#listBedInfo").hide();
				createGraphicalView(r)
			}else if(viewinfo==2){
				$("#graPicalBedInfo").hide();
				$("#listBedInfo").show();
				createListView(r);
			}
			
			
			
			
		}
	});

}


function swapImages(callFrom, bedID, ht) {
	
	$("#bedId").val(bedID);
	$("#hallType").val(ht);
	if(callFrom == "shiftBed"){
		
		var p = confirm("You Want To Shift This Bed. ");
		if (p == true) {
			$("#shiftStatus").val("Yes");
			deAllocateBed(bedID, ht);
		}
	}else{
		
		$("#BedAllocStatus").val('new');
		$("#DallocBedId").val(0);
		$("#bedAllocationPopUp").show();
	}
}

function deAllocateBed(bedID, ht) {

	$("#BedAllocStatus").val('old');
	$("#DallocBedId").val(bedID);

	alert("Please Select Another Bed.");

	setTimeout(function() {
		showHallofType(ht);
	}, 500);
}

function closebedAllocationPopUp(){
	
	$("#bedAllocationPopUp").hide();
	$("#bedId").val(0);
	$("#hallType").val(0);
}

function allocateBedToPatient(){
	var BedAllocStatus = $("#BedAllocStatus").val();
	var DallocBedId = $("#DallocBedId").val();
	var billableBedType=0;
	var patientType="";
	var isolation = 0;
	var pt_Id = $("#pt_Id").val();
	var bedId=$("#bedId").val();
	var userId=$("#userId").val();
	
	var unitId=$("#unitId").val();
	var treatmentId=$("#treatmentId").text();
	
	
	
	var inputs = [];
	inputs.push('ID=' + 0);
	inputs.push('Treatment_ID=' + treatmentId);
	inputs.push('Bed_ID=' + bedId);
	inputs.push('createdBy=' + userId);
	inputs.push('unitId=' + unitId);
	inputs.push('isolation=' + isolation);
	inputs.push('BedAllocStatus=' + BedAllocStatus);
	inputs.push('DallocBedId=' + DallocBedId);
	inputs.push('billableBedType=' + billableBedType);
	inputs.push('patientType=' + patientType);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/ipdbed/allocateBedToPatient",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
	   
			
				alert(r);
				
			
				
		}
	});

}


function createGraphicalViewIPD(r) {
	
	
	if(r.hl.length>0){
		
		for ( var m = 0; m < r.hl.length; m++) {
			
			var hallName=r.hl[m].hn;
			$("#totalBeds").text(r.hl[m].bn);
			$("#AvailableBeds").text(r.countAvailableBeds);
			$("#cleaningBeds").text(r.countCleaningBeds);
			$("#allocatesBeds").text(r.countAllocateBeds);
	
					if (r.hl[m].bn > 0) {

		var bedList = "<table class='table'> <tbody class='col-md-12-1' style='margin-top: 0px;'> ";
		var loopCounter = 0;
		// var bedCount = (BedsBean.hl[m].bn);
		var bedCount = r.hl[m].bn;

		var row1 = 0;
		var row2 = 0;
		var row3 = 0;

		if (bedCount > 0 && bedCount <= 10) { // 1 to 10
			row1 = bedCount;

		} else if (bedCount > 10 && bedCount <= 20) {
			row1 = 10;
			row2 = bedCount;

		} else if (bedCount > 20 && bedCount <= 30) {
			row1 = 10;
			row2 = 20;
			row3 = bedCount;

		} else if (bedCount > 30) {
			row1 = (Math.round(bedCount / 3.5) + 1);
			row2 = row1 * 2;
			row3 = row1 * 3;
		}
  
		//$.each(	BedsBean.hl[m].bl,function(name, bl)
			for (var i=0;i<r.hl[m].bn;i++)	{

							/*
							 * loopCounter == 0 || loopCounter == 15 ||
							 * loopCounter == 30 || loopCounter == 45
							 */
							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "<tr id='' class=''>";
							}
                   
							if (r.hl[m].bl[i].bs == '2') {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 200px; background-color: orange; border: 1px solid orange;'> "
										+ "<img src='images/clean1.png' width='100px' height='80px' style='margin-left: 25px;'"
										/*
										 * + "<img src='images/clean.jpg'
										 * width='100px' height='56px'"
										 */
										+ " onclick='swapImages(this,"
										+ r.hl[m].bl[i].bi
										+ ","
										+r.hl[m].ht
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 46px;'>Bed Name: "
										+r.hl[m].bl[i].bdnm + "</label> "
										+ "</div> </td>";

							} else if (r.hl[m].bl[i].bs == '4') {

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; height: 200px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'> "
										+ "<div style='height: 17px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 16px; width: 148px;'></div>"
										+ "<div style='height: 33px; width: 148px;'>"
										+ "<img src='images/bedEmpty1.png' width='35px' height='20px'"
										/*
										 * + "<img src='images/bedEmpty.png'
										 * width='60px' height='30px' "
										 */
										+ " onclick='swapImages(this,"
										+ r.hl[m].bl[i].bi
										+ ","
										+ r.hl[m]. ht
										+ ")' /> "
										+ "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name: "
										+ r.hl[m].bl[i].bdnm + "</label></div>"
										+ "</div> </td>";

							} else if (r.hl[m].bl[i].bs  == '3') { // Allocated
								
								
							

								var pay="";
								var sourceTypeId=r.hl[m].bl[i].patList[0].sourceTypeId;
								var sponsorName=r.hl[m].bl[i].patList[0].sponsorName;
								if(sourceTypeId==0)
									{
										pay = pay +"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Self Pay</label>";
									}
								else
									{
									pay = pay +"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Sponsor Name:"
										+sponsorName
									+"</label>"
									+"<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Sponsor Pay</label>";
									}

								// for Sponsored Patent Type
								var redDot = "";
								
								if (r.hl[m].bl[i].patList[0].objTreatment.specialDiscount != 0) {
									redDot = "<label style='float: right; height: 15px; margin-bottom: 0px;'> "
											+ "<img src='images/Red_dot.png' width='13px' height='13px' style='border: 2px solid white;'></images></label> ";

									pay = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>"
											+r.hl[m].bl[i].patList[0].objTreatment.insuranceCmpny
											+ "</label>";
								}

								// bed allocated to 'patient' or 'relative'
								var bedAllocatedForBedName = "";
								var nameRelative = "";
								var docNameTemp="";
								var docName=r.hl[m].bl[i].patList[0].docName;
								if(docName=="-")
									{
										docNameTemp=docNameTemp
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Doctor Name: "
										+ "--------"
										+ "</label>";
									}
								else{
									var str_array = docName.split(',');
									if(str_array.length==1)
										{
											docNameTemp=docNameTemp
											+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Doctor Name: "
											+ docName
											+ "</label>";
										}
									else{
										var liTemp="";
										for(var j=0;j<str_array.length;j++)
											{
											liTemp=liTemp
											+'<li><a href="#">'+str_array[j]+'</a></li>';
											}
										docNameTemp=docNameTemp
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 21px'>"
										+" <div class='dropdown'>"
									    +" <button class='btn btn-default btn-xs dropdown-toggle' type='button' data-toggle='dropdown'>Show Doctor"
									    +"<span class='caret'></span></button>"
									    +"<ul class='dropdown-menu'>" 
									    +liTemp
									    +"</ul>" 
									    +"</div>"
										+"</label>";
										
									}

								}
							
								// bed allocated to 'patient'
								if (r.hl[m].bl[i].patList[0].objtreatmentbeds.bedAllocatedFor == 'P') {

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 131px; margin-bottom: 0px;'>"
											+ r.hl[m].bl[i].patList[0].prefix
											+ " "
											+ r.hl[m].bl[i].patList[0].fName
											+ " "
											+ r.hl[m].bl[i].patList[0].mName
											+ " "
											+ r.hl[m].bl[i].patList[0].lName
											+ "</label>" + redDot;

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'><img src='images/bedOcc1.png' width='30px' height='25px'"
											+ " onclick='swapImages(this,"
											+ r.hl[m].bl[i].bi
											+ ","
											+ r.hl[m].ht
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+r.hl[m].bl[i].bn+ "</label></div>";
								} else { // bed allocated to 'relative'

									nameRelative = "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>Relative of: "
										+ r.hl[m].bl[i].patList[0].prefix
										+ " "
										+ r.hl[m].bl[i].patList[0].fName
										+ " "
										+ r.hl[m].bl[i].patList[0].mName
										+ " "
										+ r.hl[m].bl[i].patList[0].lName
											+ "</label>";

									bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOccRelative.png' width='30px' height='25px' "
											+ " onclick='swapImages(this,"
											+ r.hl[m].bl[i].bi
											+ ","
											+ r.hl[m].ht
											+ ")' "
											+ " /> "
											+ "<label class='TextFont' style='color: white;'>Bed Name: "
											+ r.hl[m].bl[i].bdnm + "</label></div>";
								}

								bedList = bedList
										+ "<td>"
										+ "<div style='width: 150px; min-height: 200px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);' id='bbed"
										+  r.hl[m].bl[i].bi
										+ "'> "
										+ nameRelative
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Patient Id: "
										+ r.hl[m].bl[i].patList[0].patientId
										+ "</label> "
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Admited Days: "
										+ r.hl[m].bl[i].patList[0].admitedDays
										+ "</label> "
										
										+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>"
										+ r.hl[m].bl[i].patList[0].mrnno
										+ "</label> "
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>"
										+ (((r.hl[m].bl[i].inDateTime).split(" "))[0])
										+ "</label>"
										
										+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Hall: "
										+ hallName
										+ "</label>"
										+docNameTemp
										+ pay
										+ bedAllocatedForBedName + "</div>"
										+ "</td>";
							
							
							
							
							
							
							
							}

							loopCounter++;

							if (loopCounter == 0 || loopCounter == row1
									|| loopCounter == row2
									|| loopCounter == row3) {
								bedList = bedList + "</tr>";
							}

						} // end for each function

		bedList = bedList + "</tbody> </table>";
		$("#allbeds").html(bedList);
		//return bedList;

	}
			}
	}
	else{
		console.log("No hall list")
	}
	

};



function getPatientBedDetails(callFrom){

	callFrom="";
	var chargesSlaveId = $("#chargesSlaveId").val();
	var id = 0;
	if(callFrom == "shiftBed")
		id = $("#hallId").val();
	else
		id = $("#wardName").val();
		
	var inputs = [];
	inputs.push('chargesSlaveId=' + encodeURIComponent(chargesSlaveId));
	inputs.push('hallId=' + encodeURIComponent(id));
	inputs.push('callFrom=' + encodeURIComponent(callFrom));
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/bedmgt/getPatientBedDetails",
		timeout : 1000 * 60 * 5,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			setBedInfo(r,callFrom);
		}
	});
}

function setBedInfo(r,callFrom){
	
	var allBedCount = 0;
	var allocatedBedCount = 0;
	var cleaningBedCount = 0;
	var availableBedCount = 0;
	
	var patientBedId = $("#bedId").val();
	if(r.lstPatientBedInfoDTO.length > 0){
		
		allBedCount = r.lstPatientBedInfoDTO.length;
		
		if (r.lstPatientBedInfoDTO[0].noOfBeds > 0) {
	
			var bedList = "<table class='table'> <tbody> ";
			
			var rowCount = 0;
			
			for (var i=0;i<r.lstPatientBedInfoDTO.length;i++)	{
				
				if(rowCount == 0){
					
					bedList = bedList + "<tr id='' class=''>";
				}

				if (r.lstPatientBedInfoDTO[i].idbedstate == '2') {
					
					bedList = bedList
							+ "<td class='col-md-1'>"
							+ "<div style='width: 150px; height: 200px; background-color: orange; border: 1px solid orange;'> "
							+ "<img src='images/clean1.png' width='100px' height='80px' style='margin-left: 25px;'"
							/*
							 * + "<img src='images/clean.jpg'
							 * width='100px' height='56px'"
							 */
							+ " /> "
							
							+ "<label class='TextFont' style='color: white; font-size: 10px; margin-left: 46px;'>Bed Name: "
							+ r.lstPatientBedInfoDTO[i].bedName + "</label> "
							+ "</div> "
							
							+ "<input type='hidden' id='normalIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoBedCharges+"'>"
							+ "<input type='hidden' id='sponsorIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoHallCharges+"'>"
							+ "<input type='hidden' id='normalIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoNurseCharges+"'>"
							+ "<input type='hidden' id='sponsorIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoNursingCharges+"'>"
							+ "<input type='hidden' id='normalBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalBedCharges+"'>"
							+ "<input type='hidden' id='sponsorBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorHallCharges+"'>"
							+ "<input type='hidden' id='normalNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalNurseCharges+"'>"
							+ "<input type='hidden' id='sponsorNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorNursingCharges+"'>"
							+ "</td>";
					
					cleaningBedCount++;

				} else if (r.lstPatientBedInfoDTO[i].idbedstate == '4') {

					bedList = bedList
							+ "<td class='col-md-1'>"
							+ "<div style='width: 150px; height: 200px; background-color: rgb(34, 177, 77); border: 1px solid rgb(34, 177, 77);'> "
							+ "<div style='height: 17px; width: 148px;'></div>"
							+ "<div style='height: 16px; width: 148px;'></div>"
							+ "<div style='height: 16px; width: 148px;'></div>"
							+ "<div style='height: 16px; width: 148px;'></div>"
							+ "<div style='height: 33px; width: 148px;'>"
							+ "<img src='images/bedEmpty1.png' width='35px' height='20px'"
							/*
							 * + "<img src='images/bedEmpty.png'
							 * width='60px' height='30px' "
							 */
							+ " onclick=swapImages('newBed',"+r.lstPatientBedInfoDTO[i].bedId+",0) /> "
							+ "<label class='TextFont' style='color: white; font-size: 10px; width: 75px'>Bed Name: "
							+ r.lstPatientBedInfoDTO[i].bedName + "</label></div>"
							+ "</div> "
							
							+ "<input type='hidden' id='normalIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoBedCharges+"'>"
							+ "<input type='hidden' id='sponsorIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoHallCharges+"'>"
							+ "<input type='hidden' id='normalIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoNurseCharges+"'>"
							+ "<input type='hidden' id='sponsorIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoNursingCharges+"'>"
							+ "<input type='hidden' id='normalBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalBedCharges+"'>"
							+ "<input type='hidden' id='sponsorBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorHallCharges+"'>"
							+ "<input type='hidden' id='normalNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalNurseCharges+"'>"
							+ "<input type='hidden' id='sponsorNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorNursingCharges+"'>"
							+ "</td>";
					
					availableBedCount++;

				} else if (r.lstPatientBedInfoDTO[i].idbedstate == '3') {
					
					var bedAllocatedForBedName = "";
				
					if(callFrom == "shiftBed" && patientBedId == r.lstPatientBedInfoDTO[i].bedId){
						
						bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOcc1.png' width='30px' height='25px' "
							+ "   onclick=swapImages('shiftBed',"+r.lstPatientBedInfoDTO[i].bedId+",0) /> "						
							+ "<label class='TextFont' style='color: white;'>Bed Name: "
							+ r.lstPatientBedInfoDTO[i].bedName + "</label></div>";
					}else{
						
						bedAllocatedForBedName = "<div style='margin-top: 0px; height: 33px; width: 148px;'> <img src='images/bedOcc1.png' width='30px' height='25px' "
							+ " /> "						
							+ "<label class='TextFont' style='color: white;'>Bed Name: "
							+ r.lstPatientBedInfoDTO[i].bedName + "</label></div>";
					}

					bedList = bedList
						+ "<td class='col-md-1'>";
						
						if(callFrom == "shiftBed"  && patientBedId == r.lstPatientBedInfoDTO[i].bedId){
							
							bedList = bedList + "<div style='width: 150px; min-height: 200px; background-color: rgb(00, 114, 198); border: 3px solid rgb(185, 74, 72);' id='bbed"
									+ r.lstPatientBedInfoDTO[i].bedId + "'> ";
						}else{
							
							bedList = bedList + "<div style='width: 150px; min-height: 200px; background-color: rgb(00, 114, 198); border: 1px solid rgb(0, 114, 198);' id='bbed"
							+ r.lstPatientBedInfoDTO[i].bedId + "'> ";
						}
						
					bedList = bedList + "<label class='TextFont' style='color: white; height: 15px; width: 148px; margin-bottom: 0px;'>"						
						+ r.lstPatientBedInfoDTO[i].patientName  
						+ "</label>"
						
						+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>UHId : "
						+ r.lstPatientBedInfoDTO[i].centerPatientId 
						+ "</label> "
						
						+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Admited Days : "
						+ r.lstPatientBedInfoDTO[i].admitDays
						+ "</label> "
						
						+ "<label class='TextFont' font-size: 10px; style='width: 148px; height: 15px; color: white; margin-bottom: 0px; height: 15px;'>Mrn No : "
						+ r.lstPatientBedInfoDTO[i].mrnNo
						+ "</label> "
						+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>In Date : "
						+ r.lstPatientBedInfoDTO[i].inDateTime
						+ "</label>"
						
						+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Hall : "
						+ r.lstPatientBedInfoDTO[i].wardName 
						+ "</label>"
						
						+ bedAllocatedForBedName
						
						+ "<label class='TextFont' style='width: 148px; height: 15px; color: white; font-size: 10px; margin-bottom: 0px;height: 15px'>Doctor: "
						+ r.lstPatientBedInfoDTO[i].doctorName
						+ "</label> </div>"
					
						+ "<input type='hidden' id='normalIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoBedCharges+"'>"
						+ "<input type='hidden' id='sponsorIsolationBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoHallCharges+"'>"
						+ "<input type='hidden' id='normalIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].isoNurseCharges+"'>"
						+ "<input type='hidden' id='sponsorIsolationNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorIsoNursingCharges+"'>"
						+ "<input type='hidden' id='normalBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalBedCharges+"'>"
						+ "<input type='hidden' id='sponsorBedCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorHallCharges+"'>"
						+ "<input type='hidden' id='normalNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].normalNurseCharges+"'>"
						+ "<input type='hidden' id='sponsorNursingCharges"+r.lstPatientBedInfoDTO[i].bedId+"' value='"+r.lstPatientBedInfoDTO[i].sponsorNursingCharges+"'>"
						+ "</td>";
					
					allocatedBedCount++;
				}

				rowCount++;
				if(rowCount == 10){
					
					bedList = bedList + "</tr>";
					rowCount = 0;
				}
			} // end for each function
			
			bedList = bedList + "</tbody> </table>";
			$("#allbeds").html(bedList);
			
			$("#totalBeds").text(allBedCount);
			$("#allocatesBeds").text(allocatedBedCount);
			$("#AvailableBeds").text(availableBedCount);
			$("#cleaningBeds").text(cleaningBedCount);
		}
	}
	else{
		alertify.error("Beds Not Found");
	}
}