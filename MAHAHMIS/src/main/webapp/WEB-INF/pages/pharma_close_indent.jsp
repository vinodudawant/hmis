 <div id="close_indent_pop_up" class="modal fade in" tabindex="-1">
				<div class="modal-dialog">
					<div class="modal-content col-md-6-1"
						style="margin-top: 123px; margin-left: 213px;">
						<div class="modal-header">
							<button class="btn btn-xs" aria-label="Close"
								data-dismiss="modal" type="button" onclick="HideCommentPopUp()"
								style="margin-top: -5px;; margin-left: 388px"
								>
								<i class="fa fa-times"></i>
							</button>
							<button class="btn btn-xs btn-save" title="Save"
								style="margin-top: -37px; margin-left: 360px"
								  data-original-title="Save" onclick="saveComment();" data-toggle="tooltip"
								data-placement="left" >
								<i class="fa fa-save"></i>
							</button>
							<h4 id="testHead" style="margin-top: -36px;">Cancel Indent:</h4>
							<input type="hidden" id='indentId' />
						</div>
						<div class="modal-body">
							<div class="col-md-12-1">
								<div class="col-md-12-1" style="">
									<h7 id="testHead">Narration:</h7>
									<textarea rows="3" cols="50" id="txtComment" type="textarea"
										name="txtComment"></textarea>
										<input type="hidden" id="indentSaleData"/>
								</div>
								<div class="divide-40"></div>
							</div>
							<div class="divide-40"></div>
						</div>
					</div>
				</div>
			</div> 