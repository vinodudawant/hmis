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
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "ehat_preoperative_checklist_master")
public class OTCheckList implements Serializable {

	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idehat_preoperative_checklist_master")
	private int idCheckList;
	
	@Column(name = "checklistName")
	private String CheckListName;
	
	@Column(name = "remark")
	private String CheckListRemark;
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<OTCheckList> lichk_access;
	
	@JsonGetter("idChkList")
	public int getIdCheckList() {
		return idCheckList;
	}
	@JsonSetter("idChkList")
	public void setIdCheckList(int idCheckList) {
		this.idCheckList = idCheckList;
	}
	@JsonGetter("ChkName")
	public String getCheckListName() {
		return CheckListName;
	}
	@JsonSetter("ChkName")
	public void setCheckListName(String checkListName) {
		CheckListName = checkListName;
	}
	@JsonGetter("ChkRmk")
	public String getCheckListRemark() {
		return CheckListRemark;
	}
	@JsonSetter("ChkRmk")
	public void setCheckListRemark(String checkListRemark) {
		CheckListRemark = checkListRemark;
	}
	@JsonGetter("Chkli")
	public List<OTCheckList> getLichk_access() {
		return lichk_access;
	}
	@JsonSetter("Chkli")
	public void setLichk_access(List<OTCheckList> arrchk_access) {
		this.lichk_access = arrchk_access;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

}
