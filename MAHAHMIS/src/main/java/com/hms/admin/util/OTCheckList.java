package com.hms.admin.util;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.dto.HospitalDetails;

public class OTCheckList {
	
	private int idCheckList;
	private String CheckListName;
	private String CheckListRemark;
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

}
