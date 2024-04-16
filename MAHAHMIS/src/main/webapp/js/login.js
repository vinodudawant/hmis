
function defaultViewUserNew(callFrom) {
	
	jQuery.ajax({
		async : true,
		type : "GET",
		url : "ehat/users/getUsersList",
		//data	: str + "&reqType=AJAX",
		dataType: 'json',
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			// alert("error");
		},
		success : function(r) {
			ajaxResponse = r;
			//alert(JSON.stringify(ajaxResponse));
			
			setUserDetailsToTemp(ajaxResponse);	
			
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



function setUserDetailsToTemp(res, callFrom) {
	
	var temp = "";
	if (callFrom === 'searchUser') {
		temp = temp
		+ "<tr>"
		+ "<td style='width:20%;height: 21.5px;' class='col-md-1 center'>"
		+ (1)
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-1 center'>"
		+ res.userId
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-5 center'>"
		+ res.userName
		+ "</td>"
		+ "<td style='width:20%;height: 21.5px;' class='numeric col-md-3 center'>"
		+ res.userType
		+ "</td>"
		+ '<td  class="col-md-1 center" style="width:20%; height: 21.5px;" ><button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'
		+ res.userId
		+ ' onclick="updateUserDetails('
		+ res.userId
		+ ')"><i class="fa fa-edit"></i></button></td>'
		+ '<td  class="col-md-1 center" style="width:20%; height: 21.5px;"><button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 '
		+ res.userId + ' onclick=deleteUserMaster(' + res.userId
		+ ') > <i class="fa fa-trash-o"></i></button> </td>';
		"</tr>";
		
	} else {
		for ( var i = 0; i < res.length; i++) {

			var userId = res[i].userId;
			var userName = res[i].userName;
			var userType = res[i].userType;

			temp = temp
					+ "<tr>"
					+ "<td style='width: 10%'>"+(i + 1)+"</td>"
					+ "<td style='width: 10%'>"+ userId +"</td>"
					+ "<td style='width: 30%'>"+ userName +"</td>"
					+ "<td style='width: 20%'>"+ userType +"</td>"
					+ "<td style='width: 10%'> "
					+ ' <button class="btn btn-xs btn-success " value="EDIT" id=btnEdit10'+ userId + ' onclick="updateUserDetails('+ userId	+ ')"><i class="fa fa-edit"></i></button></td>'
					+ "<td style='width: 10%'> "
					+ ' <button class="btn btn-xs btn-danger deleteUserAccess" value="DELETE" id=btnDelete10 ' + userId + ' onclick=deleteUserMaster(' + userId	+ ') > <i class="fa fa-trash-o"></i></button> </td>';
					+ "</tr>";

		}

	}

	$("#subInventoryRecordsList").html(temp);
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
	
	window.location.href = "usrDocNew.jsp?" + "userID=" + userId + "&querytype='update'";
}

function getUser(userID) {

	if(userID!=null){
	var inputs = [];
	inputs.push('userId=' + userID);
	var str = inputs.join('&');
	jQuery.ajax({
			async : false,
			type : "POST",
			data : str + "&reqType=AJAX",
			url : "ehat/users/getDoctorDetails",
			timeout : 1000 * 60 * 15,
			cache : true,
			error : function() {
				alert('error');
			},
			success : function(r) {
				
				userdeatails = r;
			    setUserDetailForUpdate(userdeatails);
			    
			}
		});	
	}
}

function setUserDetailForUpdate(doctorDtetail) {
	//userdeatails.userDetails.userId)
	  $("#empIdhr").val(userdeatails.userDetails.empIdHr);
	  $("#userType").val(userdeatails.userDetails.userType);
	  $("#fn").val(userdeatails.userDetails.fullName);
	  $("#mn").val(userdeatails.userDetails.middleName);
	  $("#ln").val(userdeatails.userDetails.lastName);
	  $("#userNm").val(userdeatails.userDetails.userName);
	  $("#password").val(userdeatails.userDetails.password);	  
	  $("#fullName").val(userdeatails.userDetails.fullName);
	  //alert("SSSSSSSSS"+doctorDtetail.specialisation)
	  $("#specialization").val(doctorDtetail.specialisation);
	  $("#departments").val(doctorDtetail.deptName);
	  $("#folloupFees").val(doctorDtetail.folloupfees);
	  $("#folloupWeekend").val(doctorDtetail.folloupWeekend);
	  $("#selSpeciality").val(doctorDtetail.selSpeciality);
	  $("#doctorfee").val(doctorDtetail.doctorfee);
	  $("#docIni").val(doctorDtetail.docInitial);
	  $("#referalPercent").val(doctorDtetail.referalPercent);
	  $("#qualification").val(doctorDtetail.qualification);
	  $("#regNo").val(doctorDtetail.regNo);
	  $("#mobile").val(doctorDtetail.mobileNo);	
	  $("#title").val(userdeatails.userDetails.title);	  
	  $("#motivatorAuthorisation").val(doctorDtetail.motivatorAuthorisation);	  
	  document.getElementById("userId").innerHTML=userdeatails.userDetails.userId;
	 // document.getElementById("doctor_ID").innerHTML=doctorDtetail.doctor_ID;
	  $("#doctorId").val(doctorDtetail.doctor_ID);	   
	 // $("#userId").val(userdeatails.userDetails.userId);
	  $("#motivatorAuthorisation").val(doctorDtetail.motivatorAuthorisation);
	 //$("#s2id_autogen2").val(userdeatails.userDetails.unitmasterId);
	  /*
	  var mulSelArray = [];
	
			var mulSelunitId=userdeatails.userDetails.unitmasterId.split(",");
			for(var i=0;i<mulSelunitId.length;i++){
				mulSelArray.push(mulSelunitId[i]);
			}
		}*/	  
	$('#mulSelunit').select2('val', userdeatails.userDetails.mulSelunit);
	//$("#s2id_autogen1").val(userdeatails.userDetails.deptId);
	  
	var mulDeptidArry = [];
	
		var mulDeptID=userdeatails.userDetails.mulDeptid.split(",");
		for(var i=0;i<mulDeptID.length;i++){
			mulDeptidArry.push(mulDeptID[i]);
			
		
	}
	$('#deptName').select2('val', mulDeptidArry);	
	//$("#s2id_autogen3").val(userdeatails.userDetails.serviceId);
	
	var mulServiceArry = [];
	
	var mulServiceID=userdeatails.userDetails.mulServiceid.split(",");
	for(var i=0;i<mulServiceID.length;i++){
		mulServiceArry.push(mulServiceID[i]);
	
	}

	$('#serviceName').select2('val', mulServiceArry);	  
}



/*
function getUserDetailsByName(userName) {
	alert("Hi")
	var temp="";
	var s=$("input#"+userName).val();
	var input1[];
	alert(s)
	input1.push('userName='+s);
	var str = inputs.join('&');
	jQuery.ajax({
		async : false,
		type : "POST",
		data : {
			"userName" : userName
		},
		url : "ehat/users/getUserDetailsListByUserName",
		//data	: str + "&reqType=AJAX",
		dataType: 'json',
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
		 alert("error");
		},
		
		success : function(r) {
			alert("by"+r.length)
			
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
*/

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
		url : "ehat/users/getUserDetailsListByUserName",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var availableTags = [];
			if (r.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				
				ajaxResponse = JSON.stringify(r);
				ajaxResponse = eval('(' + ajaxResponse + ')');
				for ( var i = 0; i < ajaxResponse.userlist.length; i++) {
					availableTags.push(ajaxResponse.userlist[i].username+ "_"+ ajaxResponse.userlist[i].userid);
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value="'+(arrValue[1])+'"><a href="#">'+ arrValue[0] + '</a></li>';
				}

				$("#div" + inputID + " .typeahead").html(template);

				setTimeout(function() {
					$('#' + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult2,
						scrollBar : true

					});
				}, 500);
			}
		}
	});
	
	function displayResult2(item) {	
		
		$('#' + inputID).val(item.text);
		$("#userName").val(item.value);
		
		setUserDetails(item.value);			
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
		url : "ehat/users/getUserDetailsByUserId",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			ajaxResponse = r;		   
			setUserDetailsToTemp( ajaxResponse,"searchUser");		
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
		url : "ehat/users/getUserDetailsListByUserId",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('error');
		},
		success : function(r) {
			
			var availableTags = [];
			if (r.length == 50) {
				alert("NO MATCHING FOUND");

			} else {
				
				ajaxResponse = JSON.stringify(r);
				ajaxResponse = eval('(' + ajaxResponse + ')');
				for ( var i = 0; i < ajaxResponse.userlist.length; i++) {
					availableTags.push(ajaxResponse.userlist[i].username+ "_"+ ajaxResponse.userlist[i].userid);
				}

				var template = "";
				for ( var j = 0; j < availableTags.length; j++) {
					var arrValue = (availableTags[j]).split("_");
					var idValue = (arrValue[1]);
					
					resultData.push({
						ID : idValue,
						Name : arrValue[0]
					});

					template = template + '<li data-value= "'+ (arrValue[1]) + '" class=""><a href="#">'+ arrValue[0] + '</a></li>';
				}

				$("#div" + inputID + " .typeahead").html(template);

				setTimeout(function() {
					$('#' + inputID).typeahead({
						source : resultData,
						displayField : 'Name',
						valueField : 'ID',
						onSelect : displayResult2,
						scrollBar : true

					});

				}, 500);
			}
		}
	});

	function displayResult2(item) {	
	
		$('#' + inputID).val(item.text);
		$("#userId").val(item.value);
	
		setUserDetails(item.value)
	}
}

function getUserDetailsListByUserId(){
	
	var userId = $("#userId1").val();	
	setUserDetails(userId);	
}

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
			
			console.log(r);
			if(r.userlist.length == 1){
				
				window.location.replace(r.logedInStatus);
			}else{
				
				$("#failMsg").html("Please Enter Valid Credentials.......");
				return false;
			}			
		}
	});
}

function logoutCurrentUser(){
	jQuery.ajax({
		async : false,
		type : "POST",
		data : "reqType=AJAX",
		url : "ehat/users/logoutCurrentUser",
		timeout : 1000 * 60 * 15,
		cache : true,
		error : function() {
			alert('Network Issue');
		},
		success : function(r) {
				
			window.location.replace(r);					
		}
	});
}
