function editDept(deptId) {
	alert("in edit js..."+deptId);
	
	$ ('#deptName').val($('#dname'+deptId).html());
	$ ('#deptCode').val($('#dcode'+deptId).html());
	
}

function saveDept(){
	
	var dname = $("#deptName").val();
	var dcode = $("#deptCode").val();

	
	
	var inputs = [];	
	inputs.push('deptName=' + dname);
	inputs.push('deptCode=' + dcode);
	 
	var str = inputs.join('&');
	
	jQuery.ajax({
		async	: false,
		type	: "POST",
		data	: str + "&reqType=AJAX",
		url		: "ehat/savedept",
		timeout	: 1000 * 60 * 6,
		cache	: false,
		success	: function(r) {
			
			alert(r); 
			getAllDepts();
		}
	});	
}

function getAllDepts(){

	jQuery.ajax({
		async : true,
		type : "POST",
		url : "ehat/fetchDeptList",
		
		success : function(r) {
			
			setDeptTemplete(r);   // to show ajax response on ui
		}
			
	});
	}
	
	
	
	function setDeptTemplete(r){
		var htm="";
		for ( var int = 0; int < r.lstDepts.length; int++) {
			
				htm=htm+
					  '<tr>'  
					+ '<td class="col-md-1 center">'+(int+1)+'</td>'
					+ '<td class="col-md-1 center ">  '+( r.lstDepts[int].deptId)+' </td>'
					+ '<td class="col-md-1 center" id="dname'+ r.lstDepts[int].deptId+'">'+( r.lstDepts[int].deptName)+' </td>'
					+ '<td class="col-md-1 center" id="dcode'+r.lstDepts[int].deptId+'"> '+( r.lstDepts[int].deptCode)+' </td>'
					+ '<td class="col-md-1 center"><td class= col-md-1> <button id=btnEdit '+r.lstDepts[int].deptId+' onclick=editDept('+r.lstDepts[int].deptId+') value=EDIT> <i class=fa fa-edit></i> Edit</button> </td> '
					+ '<td class="col-md-1 center"><td class= col-md-1> <button id=btnDelete '+r.lstDepts[int].deptId+' onclick=deleteDept('+r.lstDepts[int].deptId+') value=Delete> <i class=fa fa-trash-o></i>Delete</button> </td>'
					+ '</tr>';							
		}		
		$("#masterDeptBody").html(htm);
	}	
	
	
	

	function deleteDept(deptId) {
		var retVal = confirm("Do you realy want to delete this?");
		if (retVal == true) {
		 
		  
		
			var inputs = [];
			inputs.push('dId=' + deptId);

			
			var str = inputs.join('&');
			jQuery
					.ajax({
						async : true,
						type : "POST",
						data : str + "&reqType=AJAX",
						url : "/ehat/deleteDept",
						timeout : 1000 * 60 * 5,
						catche : false,
						error : function() {
							alert("error");
						},
						success : function(r) {
							//getCompanyList();
							if (r == true) {
								
								alert(r);
								/*$('#resultDiv')
										.html(
												"<div class='alert alert-success' >Record deleted successfully..!</div>");
								hideResultDiv();*/
								// location.reload(true);
							} 
							 
						}
					});

			return true;
		} else {

		}

	}
	
	
 