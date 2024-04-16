
function defaultViewUserNew(callFrom,pageNumber) {
	var startIndex = 0;
	
	$('#opdpagenation').find('.active').removeClass('active');
	
	startIndex= (pageNumber-1)+"0";
	var countpage=$("#countopdpage").val();
	var countp=countpage-6;
	for(var k=countp;k <= countpage;k++){
		$("#liopd"+k).removeClass('active').addClass('notActive');
	}
	$("#liopd"+pageNumber).removeClass('notActive').addClass('active');
	
	var inputs = [];
	inputs.push('startIndex=' + startIndex);
	
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/users/getUsersList",
		data	: str + "&reqType=AJAX",
		dataType: 'json',
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(JSON.stringify(ajaxResponse));
			
			setUserDetailsToTemp(ajaxResponse,'_',pageNumber);
			
			/*pobj1 = eval('(' + ajaxResponse + ')');
			$("#userObj").html(ajaxResponse);
			if (callFrom == "UserManagement") {
				$("#userMangTemp").setTemplate(defaultViewUserTemp);
				
				
			} else if (callFrom == "HRDashboard") {
				//$("#userMangTemp").setTemplate(defaultViewHrTemp);
				//alert(JSON.stringify(ajaxResponse));
				//setUserDetailsToTemp(JSON.stringify(ajaxResponse));	
				
			} else if (callFrom == "EmployeeForm") {
				var myObj = JSON.stringify(pobj1.ul[0]);
				$("#myObj").html(myObj);
				$("#empId").val(pobj1.ul[0].ui);
	
			} else if (callFrom == "OTManagement") {
				var otTemplate = "<option value='0'>-SELECT-</option>{#foreach $T.ul as ul}<option value='{$T.ul.ui}'>{$T.ul.fuNm}</option>{#/for}";
				$("#userMangTemp").setTemplate(otTemplate);
			}
			$("#userMangTemp").processTemplate(pobj1);*/
		}
	});	
}



function setUserDetailsToTemp(res, callFrom,pageNumber) {
	
	var countAuto = (pageNumber - 1) + '1';
	countAuto = Number(countAuto);
	
	var temp = "";
	if (callFrom === 'searchUser') {
		temp = temp
		+ "<tr>"
		+ "<td style='width:20%;height: 21.5px;' class='col-md-1 center'>"
		+ (1)
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-1 center'>"
		+ res.user_ID
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-5 center'>"
		//+ res.user_Name
		+(res.title+" "+res.f_name+"  "+res.m_name+" "+res.l_name)
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-3 center'>"
		+ res.user_Type
		+ "</td>"
		+ '<td  class="col-md-1 center" style="width:20%; height: 21.5px;" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
		+ res.user_ID
		+ ' onclick="updateUserDetails('
		+ res.user_ID
		+ ')"><i class="fa fa-edit"></i></button></td>'
		+ '<td  class="col-md-1 center" style="width:20%; height: 21.5px;"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
		+ res.user_ID + ' onclick=deleteUserMaster(' + res.user_ID
		+ ') > <i class="fa fa-trash-o"></i></button> </td>';
		"</tr>";
		
	} else if (callFrom === 'Name'){

		temp = temp
		+ "<tr>"
		+ "<td style='width:20%;height: 21.5px;' class='col-md-1 center'>"
		+ (1)
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-1 center'>"
		+ res.user_ID
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-5 center'>"
		//+ res.user_Name
		+(res.title+" "+res.f_name+"  "+res.m_name+" "+res.l_name)
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-3 center'>"
		+ res.user_Type
		+ "</td>"
		+ '<td  class="col-md-1 center" style="width:20%; height: 21.5px;" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
		+ res.user_ID
		+ ' onclick="updateUserDetails('
		+ res.user_ID
		+ ')"><i class="fa fa-edit"></i></button></td>'
		+ '<td  class="col-md-1 center" style="width:20%; height: 21.5px;"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
		+ res.user_ID + ' onclick=deleteUserMaster(' + res.user_ID
		+ ') > <i class="fa fa-trash-o"></i></button> </td>';
		"</tr>";	
	}
	
	else {
		for ( var i = 0; i < res.length; i++) {

			var userId = res[i].user_ID;
		//	var userName = res[i].user_Name;
			var userType = res[i].user_Type;
			var userName=(res[i].title+" "+res[i].f_name+"  "+res[i].m_name+" "+res[i].l_name)

			temp = temp
					+ "<tr>"
					+ "<td style='width: 10%'>"+countAuto+"</td>"
					+ "<td style='width: 10%'>"+ userId +"</td>"
					+ "<td style='width: 30%'>"+ userName +"</td>"
					+ "<td style='width: 20%'>"+ userType +"</td>"
					+ "<td style='width: 10%'> "
					+ ' <button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'+ userId + ' onclick="updateUserDetails('+ userId	+ ')"><i class="fa fa-edit"></i></button></td>'
					+ "<td style='width: 10%'> "
					+ ' <button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 ' + userId + ' onclick=deleteUserMaster(' + userId	+ ') > <i class="fa fa-trash-o"></i></button> </td>';
					+ "</tr>";
					countAuto++;
		}
		var numberOfRows="";
		var indexopd=1;
		var opdcount = res[0].usersCount;
		var numberOfPages=(opdcount/10);
		var displayPagination=numberOfPages;    
		
		if(pageNumber == 1)
			{
		if(numberOfPages > 5){
		    numberOfRows +="<li style='display:none' class='disabled previous '><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
		    displayPagination=5;
		}
		for(var j=0;j<displayPagination;j++){
			 if(j == Number(pageNumber-1))
				{
			        numberOfRows +="<li  class='page-item active ' id='liopd"+indexopd+"' onclick=defaultViewUserNew('HRDashboard',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";

				}
				else
				{
			        numberOfRows +="<li  class='page-item ' id='liopd"+indexopd+"' onclick=defaultViewUserNew('HRDashboard',"+indexopd+")><a class='page-link' >"+indexopd+"</a></li>";
				}
				indexopd=indexopd+1;
		}
		if(numberOfPages>6){
		    numberOfRows +="<li class='next' onclick='nextPagination("+indexopd+","+Math.round(numberOfPages)+");'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
		}

		$('#totalNumberOfPagesOpd').html("<li><a>No. Of Pages:"+(Math.floor(numberOfPages+1))+"</a></li>");
		$('#opdpagenation').html(numberOfRows);
	}
	}

	$("#subInventoryRecordsList").html(temp);
}

function nextPagination(currentIndex, numberOfPages){
    var displayPagination=currentIndex+5;
    var pagecount=currentIndex;
    var numberOfRows='';
    numberOfRows +="<li class='previous' onclick='previousPagination("+currentIndex+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    if(numberOfPages<displayPagination){
        displayPagination=numberOfPages+1;
    }
    for(var j=currentIndex;j<displayPagination;j++){
        numberOfRows +="<li  class='page-item '  id='liopd"+j+"' onclick=defaultViewUserNew('HRDashboard',"+j+")><a class='page-link'>"+j+"</a></li>";
        pagecount++;
    }
    if(numberOfPages>displayPagination){
        numberOfRows +="<li class='next' id='liopdnext' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
    }
    	$("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}


function previousPagination(currentIndex,numberOfPages){
    var displayPagination=currentIndex-5;
    var pagecount=currentIndex-5;
    var numberOfRows='';
    if(currentIndex>6){
        numberOfRows +="<li class='previous' onclick='previousPagination("+displayPagination+","+Math.round(numberOfPages)+")'><a><i class='fa fa-backward' aria-hidden='true'></i></a></li>";
    }
    for(var j=displayPagination;j<currentIndex;j++){
        numberOfRows +="<li  class='page-item' id='liopd"+j+"' onclick=defaultViewUserNew('HRDashboard',"+j+")><a>"+j+"</a></li>";
        pagecount++
    }
        numberOfRows +="<li class='next' onclick='nextPagination("+j+","+Math.round(numberOfPages)+")'><a><i class='fa fa-forward' aria-hidden='true'></i></a></li>";
        $("#countopdpage").val(pagecount);
        $('#opdpagenation').html(numberOfRows);
}

function deleteUserMaster(userId) {
	
	var r = confirm("Confirm To Delete User Details?");
	if (r == true) {
	var inputs = [];
	inputs.push('userId=' + userId);

	var str = inputs.join('&');

	jQuery.ajax({
			async : true,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/users/deleteUsers",
			timeout : 1000 * 60 * 15,
			cache : true,
			error : function() {
				alert('error');
			},
			success : function(r) {
				ajaxResponse = r;
				alert(ajaxResponse);
				location.reload();
			//	window.location = "HRManagementNew.jsp";
				
			}
		});
	}
}

function updateUserDetails(userId) {
	
	window.location.href = "user_management.jsp?" + "userID=" + userId + "&querytype='update'";
}

function getUser(userID) {

	if(userID != null){

		var inputs = [];
		inputs.push('userId=' + userID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/users/getDoctorDetails",
			timeout : 1000 * 60 * 15,
			cache : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				setTimeout(function(){setUserDetailForUpdate(r);},500);	
			}
		});
	}
}

function getUser1(userID) {
	if(userID == null || userID == ""){
		return false;
	}else{
		var inputs = [];
		inputs.push('userId=' + userID);
		var str = inputs.join('&');
		
		jQuery.ajax({
			async : false,
			type : "POST",
			data :str+"&reqType=AJAX",
			url : "ehat/users/getDoctorDetails",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert("error");
			},
			success : function(r) {
				
				$("#userIdForUpdate").val(userID);
				$("").val(r.userDetails.empIdhr);
				setTimeout(function(){setUserDetailForUpdate(r);},500);	
			}
		});
	}
}

function setUserDetailForUpdate(doctor) {
	$("#departments").select2('val',doctor.department); //added by sandip
	$("#doctorIdForUpdate").val(doctor.doctor_ID);
	$("#createdDate").val(doctor.userDetails.created_Date);
	$("#empIdhr").val(doctor.userDetails.empIdhr);
	//$("#userType").text(doctor.userDetails.user_Type);
 	$('#userType').select2('val',doctor.userDetails.user_Type);	//added by sandip
 	if(doctor.email_Id=="undefined"){
 		$("#email").text('-');
 	}else{
 	$("#email").val(doctor.email_Id);
 	}
	var userType=doctor.userDetails.user_Type;
	
	if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
		getDcTypeMasterList();
	}
	
	//-----------------------Added By Badrinath----------------------------------
	if(doctor.userDetails.allServicesFlag == "Y"){
		$("#allServiceChk").prop('checked', true);
		}else{
			$("#allServiceChk").prop('checked', false);
		}
	
	if(doctor.userDetails.softwareUsed == "Y"){
		$("#softwareUsed").prop('checked', true);
		}else{
			$("#softwareUsed").prop('checked', false);
		}
	
	if(doctor.userDetails.addUserSign == "Y"){
		$("#softwareUsedChk").prop('checked', true);
		$("#doc1").show();
		
		$("#docName1").val(doctor.userDetails.sign_one_doctor);
		$("#techName1").val(doctor.userDetails.sign_two_doctor);
		
		}else{
			$("#softwareUsedChk").prop('checked', false);
			$("#doc1").hide();
		}
	//-------------------------------------------------------------------------
	var docTypIds = [];
	

		var docTypeId = doctor.userDetails.doctorTypeIdList.split(",");
	for (var i = 0; i < docTypeId.length; i++) {
		docTypIds.push(docTypeId[i]);
	}
	$('#seldcTypeMaster').select2('val',docTypIds);
	//$("#fullName").val(doctor.userDetails.full_name);
	$("#fullName").val(doctor.userDetails.title+" "+doctor.userDetails.f_name+"  "+doctor.userDetails.m_name+" "+doctor.userDetails.l_name);
	$("#fn").val(doctor.userDetails.f_name);
	$("#mn").val(doctor.userDetails.m_name);
	$("#ln").val(doctor.userDetails.l_name);
	$("#userNm").val(doctor.userDetails.user_Name);
	$("#password").val(doctor.userDetails.password);	
	
	var specializationNameArry = [];
	
	var specializationNameID = doctor.specialisation.split(",");
	for(var i=0;i<specializationNameID.length;i++){
		specializationNameArry.push(specializationNameID[i]);		
	}
	
	$("#specializationName").select2('val',specializationNameArry);  //added by sandip
	$("#fixedIncome").val(doctor.fixedIncome);
	//$("#departments").val(doctorDtetail.deptName);
	$("#folloupFees").val(doctor.folloupFees);
	$("#folloupWeekend").val(doctor.folloupWeekend);
	$("#selSpeciality").val(doctor.speciality);
	$("#doctorfee").val(doctor.doctorfee);
	$("#docIni").val(doctor.docIni);
	$("#referalPercent").val(doctor.referalPercent);
	$("#qualification").val(doctor.qualification);
	$("#designation").val(doctor.designation);	
	$("#regNo").val(doctor.regNo);
	$("#mobile").val(doctor.mobileNo);	
	$("#title").val(doctor.userDetails.title);
	$("#docName1").val(doctor.userDetails.sign_two_doctor);
	$("#techName1").val(doctor.userDetails.sign_one_doctor);
	
	var doctorSign = (doctor.userDetails.sign_one == 'null' || doctor.userDetails.sign_one == '' || doctor.userDetails.sign_one == null) ? '' :
					 doctor.userDetails.sign_one;
	$("#technicianSignName").text(doctorSign);
	
	var technicianSign = (doctor.userDetails.sign_two == 'null' || doctor.userDetails.sign_two == '' || doctor.userDetails.sign_two == null) ? '' :
		 doctor.userDetails.sign_two;
	
	$("#doctorSignName").text(technicianSign);
	
	
	$("#motivatorAuthorisation").val(doctor.motivatorAuthorisation);	  
	//document.getElementById("userId").innerHTML=doctor.userDetails.userId;
	// document.getElementById("doctor_ID").innerHTML=doctorDtetail.doctor_ID;
	$("#doctorId").val(doctor.doctor_ID);
	// $("#userId").val(userdeatails.userDetails.userId);
	//$("#motivatorAuthorisation").val(doctor.motivatorAuthorisation);
	//$("#s2id_autogen2").val(userdeatails.userDetails.unitmasterId);
	/*
	var mulSelArray = [];
	
			var mulSelunitId=userdeatails.userDetails.unitmasterId.split(",");
			for(var i=0;i<mulSelunitId.length;i++){
				mulSelArray.push(mulSelunitId[i]);
			}
		}*/	  
	$('#mulSelunit').select2('val', doctor.userDetails.mulSelunit);
	//$("#s2id_autogen1").val(userdeatails.userDetails.deptId);
	  
	var mulDeptidArry = [];
	
		var mulDeptID = doctor.userDetails.mulDeptid.split(",");
		for(var i=0;i<mulDeptID.length;i++){
			mulDeptidArry.push(mulDeptID[i]);		
	}
		
	$('#deptName').select2('val', mulDeptidArry);	
	//$("#s2id_autogen3").val(userdeatails.userDetails.serviceId);
	
	var mulServiceArry = [];
	
	var mulServiceID = doctor.userDetails.mulServiceid.split(",");
	for(var i=0;i<mulServiceID.length;i++){
		mulServiceArry.push(mulServiceID[i]);
	
	}

	$('#serviceName').select2('val', mulServiceArry);
	
	
	
	/*if(doctor.specialisation.includes(","))
	{
		var specialisationArray = doctor.specialisation.split(',');
		var namesArray = doctor.specializationName.split(',');
		var count =specialisationArray.length;
		if(namesArray != "" )
		{
			
			
		var htm="";
			$.each(specialisationArray, function(index, value) {
				
				htm = '<li class="select2-search-choice" id="specialization'
					+ index
					+ '">'
					+ '<div>'
					+ namesArray[index].trim()
					+ '</div>'
					+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
					+ index + ',' + value + ',\'' +  "Specialization" + '\',\'' + "specializationName" + '\')" href="#"></a>'
					
				
					  htm = htm	
					    + '<input id="specializationIdHide' + (index) + '" type="hidden" value="' + value
						+ '">';
			+'</li>';
			   
			$("#specializationName").append(htm);
			});
	}
		}else
	{
		$("#specialization").val(doctor.specialisation);
		
		var specialisation = doctor.specialisation;
		var names = doctor.specializationName;
		if(doctor.specialisation !== "undefined" && doctor.specializationName !== "undefined")
			{
			
		var count = $("#specializationName li").size();
		if(names !== "" )
		{
		var htm="";
			
				
				htm = '<li class="select2-search-choice" id="specialization'
					+ count
					+ '">'
					+ '<div>'
					+ names.trim()
					+ '</div>'
					+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
					+ count + ',' + specialisation + ',\'' +  "Specialization" + '\',\'' + "specializationName" + '\')" href="#"></a>'
					
				
					  htm = htm	
					    + '<input id="specializationIdHide' + (count) + '" type="hidden" value="' + specialisation
						+ '">';
			+'</li>';
			   
			$("#specializationName").append(htm);
			

		}
	}	

	}*/
	
}

var doctortyptemplate = "{#foreach $T.lstDocTyp as lstDocTyp}  <option	value='{$T.lstDocTyp.doctypeId}'> {$T.lstDocTyp.doctypeName} </option> {#/for}";			
var defaultdoctyp="<option	value='0'></option>";

function getDcTypeMasterList() {
   var userType = $("#userType").val();
 
   if(userType=="doctor" || userType=="Doctor" ||userType=="DOCTOR"){
	   
	   $("#dcTypeMaster").css('display','block');
	   $("#docSep").css('display','block');//for noble only
	   $("#followUpContenct").css('display','block');
	   $("#fixIncmDiv").css('display','block');
	   
	 jQuery.ajax({
		async : false,
		type : "POST",
		url : "ehat/doctorType/getchDoctypeMasterList",
	
		success : function(r) {
			response=r;
			if(response.lstDocTyp.length!=0){
			$("#seldcTypeMaster").setTemplate(doctortyptemplate);
			$("#seldcTypeMaster").processTemplate(response);
			
			$("#seldcTypeMaster1").setTemplate(doctortyptemplate);
			$("#seldcTypeMaster1").processTemplate(response);
			$("#seldcTypeMaster1").select2();
			}
			
		}
	});
   }else{

	   
	   $("#seldcTypeMaster").select2("val","");
	  // $("#seldcTypeMaster").html(defaultdoctyp);
	   $("#dcTypeMaster").css('display','none');   
	   $("#docSep").css('display','none');//for noble only
	   $("#followUpContenct").css('display','none');
	   $("#fixIncmDiv").css('display','none');

   }
}

function getUserDetailsByName(userName) {
	var temp="";
	var s=$("input#"+userName).val();
	var input1 = [];
	input1.push('userName='+s);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"userName" : userName,
		},
		url : "ehat/users/getUsersListByUserName",
		//data	: str + "&reqType=AJAX",
		dataType: 'json',
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		 alert("error");
		},
		
		success : function(r) {
			alert("by"+r.length);
			
			var template = "";
			for(var i=0;i<r.length;i++){
				
				template = template + '<li data-value="' + ""
				+ '" class=""><a href="#">' + r[i].userName
				+ '</a></li>';
			}
			$("#userName1").html(template);		
		}	
	});		
}

function getUserDetailsByName(inputID) {
	var resultData = [];
	var username=$("input#"+inputID).val();
	var inputs = [];
	inputs.push('userName=' + username);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/users/getUsersListByUserName",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			var availableTags = [];
			if (response.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				var template = "";
				for ( var j = 0; j < response.usersList.length; j++) {
					var arrValue = response.usersList[j].userid +"-"+response.usersList[j].user_Name;
					var idValue = response.usersList[j].userid;
					var labProfile = response.usersList[j].user_Name;
					resultData.push({
						ID : idValue,
						Name : labProfile
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue + '</a></li>';
				}

				setTimeout(function() {
					$("div#divuserName .typeahead").html(template);
					$("div#divuserName .typeahead").show();

					$("input#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("input#" + inputID).data('typeahead').source = resultData;
				}, 500);
			}
			}
		});
		function displayResult(item) {

			var res = item.text.split('-');
			var userId = res[0];
			var userName = res[1];
			setUserDetails(userId);
			$("input#" + inputID).val(userName);
		}
	}
				
function setUserDetails(inputID) {
	var inputs = [];
	inputs.push('userId=' + inputID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/users/getUsersByUserId",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;		   
			setUserDetailsToTemp( ajaxResponse,"searchUser",1);
			$('#userName').val("");
			$('userId1').val("");
		}
	});
}

function getUserDetailsByUserId(inputID) {
	var resultData = [];
	var userId=$("input#"+inputID).val();
	var inputs = [];
	inputs.push('userId=' + userId);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/users/getUsersListByUserId",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			var availableTags = [];
			if (response.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				
				var template = "";
				for ( var j = 0; j < response.usersList.length; j++) {
					var arrValue = response.usersList[j].user_ID +"-"+response.usersList[j].user_Name;
					var idValue = response.usersList[j].user_ID;
					var labProfile = response.usersList[j].user_Name;
					resultData.push({
						ID : idValue,
						Name : labProfile
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue + '</a></li>';
				}

				setTimeout(function() {
					$("div#userId .typeahead").html(template);
					$("div#userId .typeahead").show();

					$("input#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("input#" + inputID).data('typeahead').source = resultData;
				}, 500);
			}
			}
		});
		function displayResult(item) {

			var res = item.text.split('-');
			var userId = res[0];
			var userName = res[1];
			setUserDetails(userId);
			$("input#" + inputID).val(userName);
		}
	}
/*function getUserDetailsListByUserId(){
	
	var userId = $("#userId1").val();	
	setUserDetails(userId);	
}*/

function checkUserLogin() {
	
	var userName = $("#userName").val();
	var password = $("#password").val();
	var unitId	=  $("#uId").val();
	var unitName = $("#uId option:selected").text();
	
	if(userName == "" || password == ""){
		
		return false;
	}
	
	var inputs = [];
	inputs.push('userName=' + userName);
	inputs.push('password=' + password);
	inputs.push('unitId=' + unitId);
	inputs.push('unitName=' + unitName);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/users/checkUserLogin",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {
			
			if(r.usersList != null && r.usersList.length > 0){
				
				window.location.replace(r.logedInStatus);
			}else{
				
				$("#failMsg").html("Please Enter Valid Credentials.......");
				return false;
			}		
		}
	});
}



function setDyanamicDivspeciali(setDiv, getDiv,callform) {
	
	var name = $('#' + getDiv + ' option:selected').text();
	var id = $('#' + getDiv + ' option:selected').val();
	

	var listspec="";	
	// listspec = listspec + "<select class='col-md-12'><option value='0'>--Select --</option>";
	
		listspec=listspec+'<option value="'+id+'">'+name+'</option>';
		
		listspec = listspec	
	    + '<input id="specializationIdHide' + (id) + '" type="hidden" value="' + name
		+ '">';
	
	$("#specializationName").html(listspec);
	$("#specializationName").select2();  // added by sandip


	/*var count = $("#" + setDiv + " li").size();

	var htm = '<li class="select2-search-choice" id="specialization'
			+ count
			+ '">'
			+ '<div>'
			+ name
			+ '</div>'
			+ '<a class="select2-search-choice-close" tabindex="-1" onclick="removeInpuntFildcom('
			+ count + ',' + id + ',\'' +  callform + '\',\'' + setDiv + '\')" href="#"></a>'
			
		
			  htm = htm	
			    + '<input id="specializationIdHide' + (count) + '" type="hidden" value="' + id
				+ '">';
	+'</li>';
	$('#' + setDiv).append(htm);*/

	/*var liSize = $("#" + setDiv + " li").length;
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
	
		lisHc=$("#lisHcat"+count).val();	*/
	
	
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

	// for ( var i = count; i < lsize; i++) {
		$('#specialization' + count).remove();

	//}
//	var liSize = $("#" + setDiv + " li").length;
//	var masterid = 0;
	
		//masterid = $("#lisHcat" + 0).val();
	
		
	
	
	/*var selfId = 0;
	
	if (masterid == "" || masterid == null || masterid == undefined || isNaN(masterid)) {
		masterid = 0;
	}
	if (selfId == "" || selfId == null || selfId == undefined || isNaN(selfId)) {
		selfId = 0;
	}*/
	/*if (liSize == 0) {
		// fetchAllServicecom();

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
		
	}*/
}

//By Badrinath to fetch by using full user name
function getUserDetailsByFullName(inputID) {
	var resultData = [];
	var userId=$("input#"+inputID).val();
	var inputs = [];
	inputs.push('userId=' + userId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/users/getUsersListByFullName",
		timeout : 1000 * 60 * 15,
		cache : false,
		error : function() {
			alert('error');
		},
		success : function(response) {
			
			var availableTags = [];
			if (response.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				var template = "";
				for ( var j = 0; j < response.usersList.length; j++) {
					var arrValue = response.usersList[j].userid +"-"+response.usersList[j].username;
					var idValue = response.usersList[j].userid;
					var labProfile = response.usersList[j].username;
					resultData.push({
						ID : idValue,
						Name : labProfile
					});
					template = template + '<li data-value="' + idValue
							+ '" class=""><a href="#">' + arrValue + '</a></li>';
				}

				setTimeout(function() {
					$("div#fullName11 .typeahead").html(template);
					$("div#fullName11 .typeahead").show();

					$("input#" + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult,
						scrollBar : true
					});
					$("input#" + inputID).data('typeahead').source = resultData;
				}, 500);
			}
			}
		});
		function displayResult(item) {

			var res = item.text.split('-');
			var userId = res[0];
			var userName = res[1];
			setUserDetails11(userId);
			$("input#" + inputID).val(userName);
		}
	}

function setUserDetails11(inputID) {
	var inputs = [];
	inputs.push('userId=' + inputID);
	var str = inputs.join('&');
	jQuery.ajax({
		async : true,
		type : "POST",
		data : str + "&reqType=AJAX",
		url : "ehat/users/getUsersByUserId",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;		   
			setUserDetailsToTemp( ajaxResponse,"Name",1);
			$('#userName').val("");
			$('userId1').val("");
		}
	});
}