var tempforLab = "<table class='table table-bordered table-striped table-condensed cf'><thead class='cf'>"
		+ "<tr><th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>#</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Item Request No</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Quantity</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Factor 1</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Factor 2</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Factor 3</div></th>"
		+ "<th class='col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Factor 4</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Raised By</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Date</div></th>"
		+ "<th class='numeric col-md-1-1 center' style='height: 21.5px;'><div class='TextFont'>Status</div></th>"
		+ "	</tr></thead><tbody div  >";
function getSalesQuotationDashboard(type) {
if(type=="onload"){
	var pobj1;
	$("#patientcontainer").setTemplate(tempforLab);
	$("#patientcontainer").processTemplate(pobj1);	
}
}
