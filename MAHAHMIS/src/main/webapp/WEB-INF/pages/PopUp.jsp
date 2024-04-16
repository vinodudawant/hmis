<form:input path="ingredientContent" type="text" id="txtContentName"
	name="txtContentName" class="form-control input-SmallText"
	placeholder="Content Name" maxlength="25" required="true"
	onfocus="load();" />
	

<script type="text/javascript">
	function load() {
		$('#Sales_Quotation_Form').modal('show');

	}
</script>


<div id="Sales_Quotation_Form" class="modal fade in" tabindex="-1">
	<div class="modal-dialog">
		<div class="modal-content" class="col-md-12">
			<div class="modal-header">
				<div class="box-title">
					<h4>
						<i class="fa fa-calendar"></i>Product Information
					</h4>
				</div>
			</div>
			<div class="modal-body">
				<div class="col-md-12">
					<form class="form-horizontal  col-md-12-1" method="get">

						<!-- <div class="form-group col-sm-1-1"
														style="margin-right: 2%;">
														<label for="exampleInputEmail1" class="TextFont">Product
														</label><input type="text" class="form-control input-SmallText"
															required="true"
															name="txtSubContractingMaterialIssueDocNo"
															id="txtSubContractingMaterialIssueDocNo"
															placeholder="Product" />
													</div>
													<div class="form-group col-sm-1-1"
														style="margin-right: 2%;">
														<label for="exampleInputEmail1" class="TextFont">Product
														</label><input type="text" class="form-control input-SmallText"
															required="true"
															name="txtSubContractingMaterialIssueDocNo"
															id="txtSubContractingMaterialIssueDocNo"
															placeholder="Product" />
													</div> -->

						<div class="col-md-12-1" style="margin-top: 9px;">
							<div class="col-md-12-1" style="margin-top: 9px;">

								<div class="col-md-2-1" style="margin-top: 9px;"></div>

								<div class="col-md-9-1" style="margin-top: 9px;">
									<div class="col-md-1-1" style="margin-top: 0px;">
										<b>Product</b>
									</div>
									<div class="col-md-3-1" style="margin-top: 0px;">
										<input type="text" id="txtProductName" name="txtProductName"
											class="form-control input-SmallText" placeholder="Product"
											autofocus="autofocus" maxlength="25" required>
									</div>
									<div class="col-md-1-1" style="margin-top: 0px;">
										<input type="text" id="txtProductName1" name="txtProductName1"
											class="form-control input-SmallText" placeholder=""
											maxlength="25" required>
									</div>
									<div class="col-md-2-1" style="margin-top: 0px;">
										<input type="text" id="txtProductName2" name="txtProductName2"
											class="form-control input-SmallText" placeholder=""
											maxlength="25" required>
									</div>
									<div class="col-md-2-1" style="margin-top: 0px;">
										<input type="text" id="txtProductName3" name="txtProductName3"
											class="form-control input-SmallText" placeholder=""
											maxlength="25" required>
									</div>
									<div class="col-md-2-1" style="margin-top: 0px;">
										<input type="text" id="txtProductName4" name="txtProductName4"
											class="form-control input-SmallText" placeholder=""
											maxlength="25" required>
									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Qty</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Qty"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Scheme</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Scheme"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Batch No</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Batch No"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Expiry</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Expiry"
											maxlength="25" required>
									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">

								<div class="col-md-3-1" style="margin-top: 9px;"></div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Bill Rate</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Bill Rate"
											maxlength="25" required>
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Scheme Amt</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Scheme Amt"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<button type="submit" class="btn btn-primary"
										id="btnSubContractingMaterialIssueSave"
										name="btnSubContractingMaterialIssueSave"
										onclick="subContractingMaterialIssueSave()">Last
										Purchase</button>

								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Discount%</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Discount"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Disc Amt</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Disc Amt"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>VAT %</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Vat%"
											maxlength="25" required>
									</div>
								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>VAT Amt</b>
									</div>
									<div class="col-md-5-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Vat Amt"
											maxlength="25" required>
									</div>
								</div>
							</div>
							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-4-1" style="margin-top: 9px;"></div>
								<div class="col-md-6-1" style="margin-top: 9px;">
									<div class="col-md-2-1" style="margin-top: 0px;">
										<b>Purchase Rate</b>
									</div>
									<div class="col-md-3-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText"
											placeholder="Purchase Rate" maxlength="25" required>
									</div>
								</div>
							</div>
							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 20px;">
										<b>Lowest</b>
									</div>

								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<label for="exampleInputEmail1" class="TextFont"><b>Purchase
												Rate</b> </label> <input type="text"
											class="form-control input-SmallText" style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark"
											placeholder="Purchase Rate" />
									</div>

								</div>

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<label for="exampleInputEmail1" class="TextFont"><b>
												MRP</b> </label> <input type="text" class="form-control input-SmallText"
											style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark" placeholder="MRP" />
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<label for="exampleInputEmail1" class="TextFont"><b>
												Party's Name</b> </label> <input type="text"
											class="form-control input-SmallText" style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark"
											placeholder="Party's Name" />
									</div>
								</div>


							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-4-1" style="margin-top: 0px;">
										<b>Schm</b>
									</div>

								</div>
								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<input type="text" class="form-control input-SmallText"
											style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark"
											placeholder="Purchase Rate" />
									</div>

								</div>



								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<input type="text" class="form-control input-SmallText"
											style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark"
											placeholder="Remark" />
									</div>
								</div>

								<div class="col-md-3-1" style="margin-top: 9px;">
									<div class="col-md-10-1" style="margin-top: 0px;">
										<input type="text" class="form-control input-SmallText"
											style="float: right;"
											name="txtSubContractingMaterialIssueRemark"
											id="txtSubContractingMaterialIssueRemark"
											placeholder="Remark" />
									</div>
								</div>


							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-4-1" style="margin-top: 9px;"></div>
								<div class="col-md-6-1" style="margin-top: 9px;">
									<div class="col-md-2-1" style="margin-top: 0px;">
										<b>MRP</b>
									</div>
									<div class="col-md-2-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Mrp"
											maxlength="25" required>
									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-4-1" style="margin-top: 9px;"></div>
								<div class="col-md-6-1" style="margin-top: 9px;">
									<div class="col-md-2-1" style="margin-top: 0px;">
										<b>Rate</b>
									</div>
									<div class="col-md-2-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="rate"
											maxlength="25" required>
									</div>
									<div class="col-md-2-1" style="margin-top: 0px;">Profit
										%10.0</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-4-1" style="margin-top: 9px;"></div>
								<div class="col-md-6-1" style="margin-top: 9px;">
									<div class="col-md-2-1" style="margin-top: 0px;">
										<b>Shelf No</b>
									</div>
									<div class="col-md-2-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Shelf No"
											maxlength="25" required>
									</div>
								</div>
							</div>

							<div class="col-md-12-1" style="margin-top: 9px;">
								<div class="col-md-4-1" style="margin-top: 9px;"></div>
								<div class="col-md-6-1" style="margin-top: 9px;">
									<div class="col-md-2-1" style="margin-top: 0px;">
										<b>Amount</b>
									</div>
									<div class="col-md-2-1" style="margin-top: 0px;">
										<input type="text" id="txtContentName" name="txtContentName"
											class="form-control input-SmallText" placeholder="Amount"
											maxlength="25" required>
									</div>
								</div>
							</div>

						</div>
						<%-- <div style="margin-top: 0px; margin-left: 2px;"
														class="col-md-12-1">

														<div class="box border col-md-12-1">

															<div class="tabbable col-md-12-1">
																<ul class="nav nav-tabs">
																	<li class="active"><a data-toggle="tab"
																		href="#ItemInfo"><i class="fa fa-user"></i> <span
																			class="hidden-inline-mobile">Item Info(F2)</span></a></li>


																</ul>
																<div class="divide-10"></div>
																<div class="divide-10"></div>
																<div class="divide-10"></div>
																<form>
																	<<!-- div class="tab-content col-md-12-1">
																		<div id="ItemInfo" class="tab-pane fade in active "
																			style="overflow-x: auto;">

																			<div class="panel-body col-md-12-1">
																				<div style="padding-left: 12px;" class="col-sm-12-1">
																					<div style="height: 85%; margin-left: 2%;">
																						<div
																							style='width: 95%; font-weight: bold; height: 200Px; overflow-y: scroll; border: 1px solid #436a9d;'>
																							<button
																								onclick="setItemInfotrSubContractingMaterialIssue()"
																								class="btn btn-xs btn-success" type='button'>Add
																								New</button>
																							<table id="ItemInfoTable" cellpadding="0"
																								cellspacing="0" border="1"
																								class="table table-bordered table-striped table-condensed">
																								<thead>
																									<tr>
																										<th class="col-md-2-2 center">SrNo</th>
																										<th class="col-md-2-2 center">Item Name</th>
																										<th class="col-md-2-2 center">Doc
																											Quantity</th>

																										<th class="col-md-2-2 center">Factor 1</th>
																										<th class="col-md-2-2 center">Factor 2</th>
																										<th class="col-md-2-2 center">Factor 3</th>
																										<th class="col-md-2-2 center">Factor 4</th>
																									</tr>
																								</thead>
																								<tbody id="ItemInfoList"
																									style="height: 87%; overflow-y: scroll; border: 1px solid #436a9d;">
																									<tr>
																										<td><input type='text'
																											class='form-control input-SmallText'
																											id="txtSubContractingMaterialIssueSrNo"></td>
																										<td><input type='text'
																											class='form-control input-SmallText'
																											id="txtSubContractingMaterialIssueItemName"></td>
																										<td><input type='text'
																											class='form-control input-SmallText'
																											id="txtSubContractingMaterialIssueDocQuantity"></td>
																										<td><input type='text'
																											class='form-control input-SmallText'
																											id="txtSubContractingMaterialIssueFactor1"></td>
																										<td><input type='text'
																											class='form-control input-SmallText'
																											id="txtSubContractingMaterialIssueFactor2"></td>
																										<td><input type='text'
																											class='form-control input-SmallText'
																											id="txtSubContractingMaterialIssueFactor3"></td>
																										<td><input type='text'
																											class='form-control input-SmallText'
																											id="txtSubContractingMaterialIssueFactor4"></td>
																								</tbody>
																							</table>

																						</div>


																					</div>
																				</div>
																			</div>
																		</div>

																		<div class="form-group col-sm-2-1"
																			style="margin-left: 2%;">
																			<label for="exampleInputEmail1" class="TextFont">Total
																				Doc Qty </label><input type="text"
																				class="form-control input-SmallText" required="true"
																				name="txtSubContractingMaterialIssueTotalDocQty"
																				id="txtSubContractingMaterialIssueTotalDocQty"
																				placeholder="Total Doc Qty">
																		</div>
																	</div> -->
																</form>
																<!--/nikhil  -->
															</div>

														</div>
														<!-- /BOX -->
													</div> --%>



					</form>
				</div>
				<!-- /BOX-->
			</div>
			<!-- /BODY-->
			<div class="modal-footer">
				<!-- <div class="form-group col-sm-1-1" style="margin-left: 2%;">
												<label for="exampleInputEmail1" class="TextFont">Remark
												</label><input type="text" class="form-control input-SmallText"
													style="float: right;"
													name="txtSubContractingMaterialIssueRemark"
													id="txtSubContractingMaterialIssueRemark"
													placeholder="Remark" />
											</div> -->
				<div class="form-group col-md-7-1" style="margin-top: 15px;">
					<button type="submit" class="btn btn-primary"
						id="btnSubContractingMaterialIssueSave"
						name="btnSubContractingMaterialIssueSave"
						onclick="subContractingMaterialIssueSave()">Ok</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Redo</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>

				</div>
			</div>
		</div>
	</div>
</div>