package com.hms.dao;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.dto.OperationDocTbl;

public class PreOpPrep {
	
	private Integer idpre_op_prep_details;
	private Integer treatmentOperationsManageID;
	private Integer idehat_preoperative_checklist_master;
	private String checklistName;
	private String confirm;
	private String confirmedMarkBy;
	private String confirmedTime;
	private String remark;
	private List<PreOpPrep> listpreOpPrep;
	
	@JsonGetter("ListPreOpPrep")
	public List<PreOpPrep> getListpreOpPrep() {
		return listpreOpPrep;
	}
	@JsonSetter("ListPreOpPrep")
	public void setListpreOpPrep(List<PreOpPrep> listpreOpPrep) {
		this.listpreOpPrep = listpreOpPrep;
	}
	@JsonGetter("idPreOpPre")
	public Integer getIdpre_op_prep_details() {
		return idpre_op_prep_details;
	}
	@JsonSetter("idPreOpPre")
	public void setIdpre_op_prep_details(Integer idpre_op_prep_details) {
		this.idpre_op_prep_details = idpre_op_prep_details;
	}
	@JsonGetter("idtom")
	public Integer getTreatmentOperationsManageID() {
		return treatmentOperationsManageID;
	}
	@JsonSetter("idtom")
	public void setTreatmentOperationsManageID(Integer treatmentOperationsManageID) {
		this.treatmentOperationsManageID = treatmentOperationsManageID;
	}
	@JsonGetter("idchkList")
	public Integer getIdehat_preoperative_checklist_master() {
		return idehat_preoperative_checklist_master;
	}
	@JsonSetter("idchkList")
	public void setIdehat_preoperative_checklist_master(
			Integer idehat_preoperative_checklist_master) {
		this.idehat_preoperative_checklist_master = idehat_preoperative_checklist_master;
	}
	@JsonGetter("chkName")
	public String getChecklistName() {
		return checklistName;
	}
	@JsonSetter("chkName")
	public void setChecklistName(String checklistName) {
		this.checklistName = checklistName;
	}
	@JsonGetter("conf")
	public String getConfirm() {
		return confirm;
	}
	@JsonSetter("conf")
	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}
	@JsonGetter("confBy")
	public String getConfirmedMarkBy() {
		return confirmedMarkBy;
	}
	@JsonSetter("confBy")
	public void setConfirmedMarkBy(String confirmedMarkBy) {
		this.confirmedMarkBy = confirmedMarkBy;
	}
	@JsonGetter("confTime")
	public String getConfirmedTime() {
		return confirmedTime;
	}
	@JsonSetter("confTime")
	public void setConfirmedTime(String confirmedTime) {
		this.confirmedTime = confirmedTime;
	}
	@JsonGetter("rmk")
	public String getRemark() {
		return remark;
	}
	@JsonSetter("rmk")
	public void setRemark(String remark) {
		this.remark = remark;
	}
	

}
