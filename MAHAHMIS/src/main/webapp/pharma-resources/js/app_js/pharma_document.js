setInterval(function hideMsgDiv() {
	$('#msgDiv').fadeOut(2000);
}, 4000);

function hideResultDiv() {
	setInterval(function hideMsgDiv() {
		$('#resultDiv').fadeOut(2000);
	}, 4000);
}


function searchDocument(docId) {
	resetDocumentValues();
	
	var inputs = [];
	inputs.push('documentId=' + docId);
	var str = inputs.join('&');

	jQuery.ajax({
		async : true,
		type : "GET",
		data : str + "&reqType=AJAX",
		url : "../../pharmacy/document/getDocumentById",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert('error');
		},
		success : function(r) {
			if(r=="")
			{
			alert("Record not found!");
			}
			$("#hiddenId").val('');
			setTableContent(r);
		}
	});
}

function resetDocumentValues() {
	$('#documentMaster').find('input:text').val('');
	$('#documentMaster').find('input:hidden').val('');
	$('#searchBox').val('');
}

function editDocument(docId) {
	$('#txtDocId').val($('#docId' + docId).val());
	$('#txtDocumentName').val($('#docName' + docId).val());

	
}

function deleteDocument(docId) {
	var retVal = confirm("Do you want to delete It?");
	if (retVal == true) {
	reset();
	alertify.success("Record deleted successfully");
	var documentId = parseInt(docId);
	
		var inputs = [];
		inputs.push('documentId=' + documentId);

		var str = inputs.join('&');
		jQuery
				.ajax({
					async : true,
					type : "POST",
					data : str + "&reqType=AJAX",
					url : "../../pharmacy/document/delete",
					timeout : 1000 * 60 * 5,
					catche : false,
					error : function() {
						alert("error");
					},
					success : function(r) {
						//getDocumentsList();
						if (r == true) {
							/*$('#resultDiv')
									.html(
											"<div class='alert alert-success' >Record deleted successfully..!</div>");
							hideResultDiv();
							location.reload();*/
						} else {
							$('#msgDiv')
									.html(
											"<div class='alert alter-danger'>Oops! Something went wrong..!</div>");
						}
						window.location.href = "view_doc";
					}
				});

		return true;
	} else {

	}

}

function getDocumentsList() {

	jQuery.ajax({
		async : true,
		type : "GET",
		data : "&reqType=AJAX",
		url : "../../pharmacy/document/documentsList",
		timeout : 1000 * 60 * 5,
		catche : false,
		error : function() {
			alert("error");
		},
		success : function(r) {

			setTableContent(r);
		}
	});

	return true;
}

function setTableContent(result) {
	var r = result;
	var divContent = "";
	for ( var i = 0; i < r.length; i++) {
		divContent = divContent
				+ "<tr><td>"
				+ (i + 1)
				+ "<input type='hidden' id='docId"
				+ r[i].docId
				+ "' name='docId"
				+ r[i].docId
				+ "' value='"
				+ r[i].docId
				+ "'> </td> <td>"
				+ r[i].docName
				+ "<input type='hidden' id='docName"
				+ r[i].docId
				+ "' name='docName"
				+ r[i].docId
				+ "' value='"
				+ r[i].docName
				+ "'></td> <td> <button id='btnEdit"
				+ r[i].docId
				+ "' class='btn btn-xs btn-success' onclick='editDocument("
				+ r[i].docId
				+ ")' value='EDIT'> <i class='fa fa-edit'></i> </button> </td> <td> <button id='btnDelete"
				+ r[i].docId
				+ "' class='btn btn-xs btn-success' onclick='deleteDocument("
				+ r[i].docId
				+ ")' value='DELETE'> <i class='fa fa-trash-o'></i> </button> </td> </tr>";
	}

	$('#divDocumentList').html(divContent);
}

function splitContent(content) {
	if (content != "") {
		var arr = content.split("-");
		$('#searchBox').val(arr[0]);
			if (arr.length > 1) {
			$('#hiddenId').val(arr[1]);
		}
	} else {
		$('#hiddenId').val(0);
	}
}
