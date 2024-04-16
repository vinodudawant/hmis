function saveTypeOfBagMaster() {
		
		var bag_ID = $('#bag_ID').val();
		if (bag_ID == "") {
			bag_ID = 0;
		}
		var bag_ID = $('#bag_ID').val();
		var bagType = $('#bagType').val();

		if (bagType == "" || bagType == undefined || bagType == null) {
			alert("Please enter bag type");
			return false;
		}
		
		var inputs = [];
		inputs.push('bag_ID=' + bag_ID);
		inputs.push('bag_type=' + bagType);
		var str = inputs.join('&');

		jQuery.ajax({
			type : "POST",
			url : "ehat/typeOfBag/saveTypeOfBagMaster",
			data : str + "&reqType=AJAX",
			error : function() {
				
				alertify.error('Network Issue');
			},
			success : function(data) {
				if (data == 1) {
					alertify.success("Bag_Type Saved Sucessfully");
					getbagtypes();
				} else if (data == 2) {
					alertify.success("Bag_Type Updated Sucessfully");
					getbagtypes();
				} else if (data == 3) {
					alertify.success("Bag_Type already present");
					getbagtypes();
				}
			}
		});
}
	
function getbagtypes() {
	
		var inputs = [];
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/typeOfBag/getbagtypes",
			data : str + "&reqType=AJAX",
			timeout : 1000 * 60 * 5,
			catche : false,
			error : function() {
				alert('error');
			},
			success : function(r) {

				setTypeOfBagMaster(r, "All");
			}
		});
}

function setTypeOfBagMaster(r, CallFrom) {

		var htm = "";
		var index = 1;
		if (r != "" && r != undefined) {
			if (CallFrom == "All") {
				for (var i = 0; i < r.typeOfbagdto.length; i++) {
					htm = htm
							+ '<tr> '
							+ ' <td class="col-md-1 center">'
							+ index
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ r.typeOfbagdto[i].bag_type
							+ '</td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-success" onclick=editTypeOfBagMaster('
							+ r.typeOfbagdto[i].bag_ID
							+ ')><i class="fa fa-edit"></i></button></td>'
							+ ' <td class="col-md-1 center">'
							+ '	<button class="btn btn-xs btn-danger" onclick=deleteTypeOfBagMaster('
							+ r.typeOfbagdto[i].bag_ID
							+ ')><i class="fa fa-trash-o"></i></button></td>'
							+ '</tr>';
					index++;
				}
				;
			} else if (CallFrom == "search") {
				htm = htm
						+ '<tr> '
						+ ' <td class="col-md-1 center">'
						+ index
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ r.bag_type
						+ '</td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-success" onclick=editTypeOfBagMaster('
						+ r.bag_ID
						+ ')><i class="fa fa-edit"></i></button></td>'
						+ ' <td class="col-md-1 center">'
						+ '	<button class="btn btn-xs btn-danger" onclick=deleteTypeOfBagMaster('
						+ r.bag_ID
						+ ')><i class="fa fa-trash-o"></i></button></td>' + '</tr>';
				index++;
			}
		}
		$("#typeOfBagMasterList").html(htm);

}

function editTypeOfBagMaster(bag_ID) {
		
		var inputs = [];
		inputs.push('bag_ID=' + bag_ID);
		var str = inputs.join('&');
		jQuery.ajax({
			async : true,
			type : "GET",
			url : "ehat/typeOfBag/editTypeOfBagMaster",
			data : str + "&reqType=AJAX",
			error : function() {
				alert('error');
			},
			success : function(r) {
			
				$('#searchId').val('');
				$('#bag_ID').val(r.bag_ID);
				$('#bagType').val(r.bag_type);

			}
		});
}

function deleteTypeOfBagMaster(bag_ID) {

		if (bag_ID != undefined && bag_ID != null && bag_ID != ""
				&& bag_ID != "null") {
			var r = confirm("Are You Sure You Want To Delete TypeOfBag Master Details ? ");
			if (r == true) {
				jQuery.ajax({
					type : "POST",
					url : "ehat/typeOfBag/deleteTypeOfBagMaster",
					data : {
						"bag_ID" : bag_ID
					},
					timeout : 1000 * 60 * 5,
					cache : false,
					error : function() {
						alert('error');
					},
					success : function(response) {
						alertify.error(response);
						getbagtypes();
					}
				});
			}
		}

}
	
function clearTypeOfBagMaster() {
		
			$('#bagType').val('');
}