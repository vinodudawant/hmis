package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "pre_op_prep_details")
public class PreOpPrep implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idpre_op_prep_details")
	private Integer idpre_op_prep_details;
	
	@Column(name = "treatmentOperationsManageID")
	private Integer treatmentOperationsManageID;
	
	@Column(name = "idehat_preoperative_checklist_master")
	private Integer idehat_preoperative_checklist_master;
	
	@Column(name = "checklistName")
	private String checklistName;
	
	@Column(name = "confirm")
	private String confirm;
	
	@Column(name = "confirmedMarkBy")
	private String confirmedMarkBy;
	
	@Column(name = "confirmedTime")
	private String confirmedTime;
	
	@Column(name = "remark")
	private String remark;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "deletedBy")
	private String deletedBy;
	
	@Transient
	@JsonIgnore
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(String deletedBy) {
		this.deletedBy = deletedBy;
	}

}
