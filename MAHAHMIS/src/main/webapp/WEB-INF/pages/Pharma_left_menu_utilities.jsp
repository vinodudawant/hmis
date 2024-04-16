<script type="text/javascript">
	$(function() {
		$("#ehatMod13").addClass("menuActive");

	});
</script>
<!-- SIDEBAR -->
<div id="sidebar" class="sidebar">
	<div class="slimScrollDiv"
		style="position: relative; overflow: hidden; width: auto; height: 608px;">
		<div class="sidebar-menu nav-collapse">

			<ul>
				<li id="reindexData" class="has-sub"><a class="" href="#"> <span
						class="menu-text">Reindex Data</span></a>
				</li>
					
				<li id="changePassword" class="TextFont has-sub"><a href="#">Change Password</a>
					
				</li>
				
				<li id="changeSuperPassword " class="TextFont has-sub"><a href="#">Change SuperPassword </a>
					
				</li>
				<li id="settings" class="TextFont has-sub"><a href="#">Settings</a>
					
				</li>
				<li id="backupPath" class="TextFont has-sub"><a href="#">Backup Path Settings</a>
					
				</li>
				<li id="calculator" class="TextFont has-sub"><a href="#">Calculator</a>
						
				</li>
				<li id="filesForTally" class="TextFont has-sub"><a href="#">Files For Tally</a>
						
				</li>
				<li id="createStatement" class="TextFont has-sub"><a href="#">Create Statement</a>
						
				</li>
				<li id="downloadPurchase" class="TextFont has-sub"><a href="#">Download Purchase</a>
						
				</li>
				<li id="careSupport" class="TextFont has-sub"><a href="#">Care Support<span class="arrow"></span></a>
					<ul class="sub">
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Care</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Dav</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Mit</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Samarth</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Medica</a></li>								
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Med</a></li>
						<li><a class="" href="hospital_info.jsp"><span
								class="sub-menu-text"></span>Med2</a></li>		
					</ul>		
				</li>
			</ul>
			<!-- /SIDEBAR MENU -->
		</div>
	</div>
</div>
<!-- /SIDEBAR -->

<%
	session.setAttribute("moduleName", "Pharmacy");
%>
