<%@page import="org.json.JSONObject"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.List"%>
<%@page import="org.json.JSONArray"%>
</script>
<!-- SIDEBAR -->
<div id="sidebar" class="sidebar" style="min-height:auto;">
	<div class="slimScrollDiv"
		style="position: relative; overflow: hidden; width: auto;">
		<div class="sidebar-menu nav-collapse">

			<ul>
				<!-- <li id="accounts" class="has-sub"><a class="" href="#"> <span
						class="menu-text">Accounts</span><span class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href="#"><span
								class="sub-menu-text"></span> Debtors</a>
						</li>
						<li><a class="" href="#"><span
								class="sub-menu-text">Creditors</span></a></li>
						<li><a class="" href="#"><span
								class="sub-menu-text">All Accounts</span></a></li>
						<li><a class="" href="#"><span
								class="sub-menu-text">Bank</span></a></li>
					</ul></li> -->

				<!-- <li id="groups" class="TextFont has-sub"><a href="#">Groups</a>
					
				</li> -->

				<li id="product" class="TextFont has-sub"><a href="../../pharmacy/product/view">Product</a>
					
				</li>
				<li id="hsn" class="TextFont has-sub"><a href="../../pharmacy/hsn/view">HSN</a>
					
				</li>
				<li id="company" class="TextFont has-sub"><a href="../../pharmacy/company/view">Company</a>
					
				</li>
				<li id="category" class="TextFont has-sub"><a href="../../pharmacy/category/view">Category</a>
					
				</li>
				<!-- <li id="patientHistory" class="TextFont has-sub"><a href="#">Patient History</a>
					
				</li>
				<li id="prescription" class="TextFont has-sub"><a href="#">Prescription</a>
					
				</li> -->
				<li id="document" class="TextFont has-sub"><a href="../../pharmacy/document/view_doc">Document</a>
					
				</li>
				<li id="prescription" class="TextFont has-sub"><a href="../../pharmacy/year/view">Financial</a>
					
				</li> 
				<!-- <li id="form" class="TextFont has-sub"><a href="../../pharmacy/form/view">Form</a>
					
				</li>  -->
				<li id="form" class="TextFont has-sub"><a href="../../pharmacy/preparation/view">Preparation</a>
					
			<!-- 	</li> 
				<li id="doctor" class="TextFont has-sub"><a href="../../pharmacy/doctor/view">Doctor</a>
					
				</li> -->
				<li id="packing" class="TextFont has-sub"><a href="../../pharmacy/packing/view">Packing</a>
					
				</li>
			<!-- 	<li id="patient" class="TextFont has-sub"><a href="../../pharmacy/patient/view">Patient</a>
					
				</li> -->
				<!-- <li id="operators" class="TextFont has-sub"><a href="#">Operators</a>
					
				</li>
				<li id="company/Party" class="TextFont has-sub"><a href="#">Company/Party</a>
					
				</li>
				<li id="partyCompany" class="TextFont has-sub"><a href="#">Party Company</a>
					
				</li> -->
				<li id="drugMaster" class="TextFont has-sub"><a href="../../pharmacy/drug/view">Drug</a>
					
				</li>
				<li id="shelf" class="TextFont has-sub"><a href="../../pharmacy/shelf/view">Shelf</a>
					
				</li>
				<li id="tax" class="TextFont has-sub"><a href="../../pharmacy/tax/view">GST</a>
					
				</li>
				
				<li id="uom" class="TextFont has-sub"><a href="../../pharmacy/uom/view">UOM</a>
					
				</li>
				<li id="vendor" class="TextFont has-sub"><a href="../../pharmacy/vendor/view">Vendor</a>
					
				</li>
				
				
				
				</li>
				
				<li id="bank" class="TextFont has-sub"><a href="../../pharmacy/bank/view">Bank</a>
					
				</li>
				
				<li id="vendor" class="TextFont has-sub"><a href="../../pharmacy/branch/view">Branch</a>
					</li>
				<li id="vendor" class="TextFont has-sub"><a href="../../pharmacy/strength/view">Strength</a>	
				</li>
				
				<!-- <li id="shift" class="TextFont has-sub"><a href="../../pharmacy/shift/view">Shift</a>	
				</li> -->
				
				<li id="shift" class="TextFont has-sub"><a href="../../pharmacy/store/view">Store</a>	
				</li>
				
				<!-- <li id="subInventory" class="TextFont has-sub"><a href="../../inventory_Materail_Request_Note.jsp">Subinventory</a> -->
				<!-- Added by Rohit 13-06-2020-->
				<li id="subInventory" class="TextFont has-sub"><a href="../../inv_subinventory.jsp">Sub-Inventory</a>	
				</li>
				
				
				<%
					String userType=(String)session.getAttribute("userType");
					if(userType!=null)
						//if(userType.equals("admin"))
						//{
							%>
							<li id="accessMgmt" class="TextFont has-sub"><a href="../../pharmacy/access/view.htm">Access Mgmt <i class="fa fa-users"></i></a>	
							</li>
							<%
						//}
				
				%>
				<!-- <li id="accessMgmt" class="TextFont has-sub"><a href="../../pharmacy/access/module.htm">Modules</a>	
				</li> -->
				<!-- <li id="admitedPatients" class="TextFont has-sub"><a href="#">Admitted Patients</a>
					
				</li>
				<li id="shortPassword" class="TextFont has-sub"><a href="#">Short Password</a>
					
				</li>
				<li id="mergeAccount" class="TextFont has-sub"><a href="#">Merge Account</a>
					
				</li> -->
			</ul>
			<!-- /SIDEBAR MENU -->
		</div>
	</div>
</div>
<!-- /SIDEBAR -->

<%
		session.setAttribute("moduleName", "Pharmacy");
%>
<script type="text/javascript">
		var moduleAccess=[];
</script>


<%
	String pharmacyAccess=(String)session.getAttribute("pharmacyAccess");
	/* String userType=(String)session.getAttribute("userType"); */
	try
	{
		JSONArray newJArray = new JSONArray(pharmacyAccess);
		List<String> lists=new ArrayList<String>();
		
		for(int i=0;i<newJArray.length();i++)
		{
			JSONObject jsonObject=newJArray.getJSONObject(i);
			lists.add((String)jsonObject.get("moduleName"));
			
%>
			<script type="text/javascript">
				var data="<%= (String)jsonObject.get("moduleName") %>";
				moduleAccess.push(data);
			</script>
			
<%
		}
	}
	catch(Exception e)
	{
		e.printStackTrace();
	}
			
%>
<script type="text/javascript">
var userType="<%= userType%>";
var count=0;
var url="error-page";
for(var i=0;i<moduleAccess.length;i++)
{
	if(userType=="admin" )
	{
		/* if(moduleAccess[i].trim()=="masters")
		{
			count=1;
		} */
		count=1;
	}
	else
	{
		if(moduleAccess[i].trim()=="masters")
		{
			count=1;
			
		}
		else
		{
			url="transaction";
		}	
	}	
}
if(count==0)
{
	//window.location = url;
}	
</script>
