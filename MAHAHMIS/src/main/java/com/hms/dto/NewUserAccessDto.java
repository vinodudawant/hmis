package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@SuppressWarnings("serial")
@Entity 
@Immutable
@Table(name = "accessdto")
public class NewUserAccessDto implements Serializable{
	
	
	@Id
	@Column(name = "subModuleId")
	private Integer subModuleId;
	
	@Transient
	@Column(name = "subModuleName")
	private String subModuleName;
	
	@Transient
	@Column(name = "subModuleType")
	private String subModuleType;
	
	@Transient
	@Column(name = "sub_mod_id")
	private String subModuleMasterId;
	
	@Transient
	@Column(name = "module_id")
	private String	moduleId;
	
	@Transient
	@Column(name = "moduleName")
	private String	moduleName;
	
	@Transient
	@Column(name = "jsp_page_name")
	private String jspPageName;
	
	@Transient
	@Column(name = "sub_Sequence")
	private String subSequence;
	
	public String getSubSequence() {
		return subSequence;
	}

	public void setSubSequence(String subSequence) {
		this.subSequence = subSequence;
	}

	@Transient
	@Column(name = "checksub")
	private String checksub;
	
	public String getChecksub() {
		return checksub;
	}

	public void setChecksub(String checksub) {
		this.checksub = checksub;
	}

	@Transient
	@Column(name = "subCount")
	private Number subCount;
	
	@Transient
	private List<NewUserAccessDto> listuserDto;
	
	//	private List<NewUserAccessDto> listBillTowrdes;

	public List<NewUserAccessDto> getListuserDto() {
		return listuserDto;
	}

	public void setListuserDto(List<NewUserAccessDto> listuserDto) {
		this.listuserDto = listuserDto;
	}

	public Integer getSubModuleId() {
		return subModuleId;
	}

	public void setSubModuleId1(Integer subModuleId) {
		this.subModuleId = subModuleId;
	}

	public String getSubModuleName() {
		return subModuleName;
	}

	public void setSubModuleName(String subModuleName) {
		this.subModuleName = subModuleName;
	}

	public String getSubModuleType() {
		return subModuleType;
	}

	public void setSubModuleType(String subModuleType) {
		this.subModuleType = subModuleType;
	}

	public String getSubModuleMasterId() {
		return subModuleMasterId;
	}

	public void setSubModuleMasterId(String subModuleMasterId) {
		this.subModuleMasterId = subModuleMasterId;
	}

	public void setSubModuleId(Integer subModuleId) {
		this.subModuleId = subModuleId;
	}	

	public String getModuleId() {
		return moduleId;
	}

	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public String getJspPageName() {
		return jspPageName;
	}

	public void setJspPageName(String jspPageName) {
		this.jspPageName = jspPageName;
	}

	public Number getSubCount() {
		return subCount;
	}

	public void setSubCount(Number subCount) {
		this.subCount = subCount;
	}

	@Override
	public String toString() {
		return "NewUserAccessDto [subModuleId=" + subModuleId + ", subModuleName=" + subModuleName + ", subModuleType="
				+ subModuleType + ", subModuleMasterId=" + subModuleMasterId + ", moduleId=" + moduleId
				+ ", moduleName=" + moduleName + ", jspPageName=" + jspPageName + ", subCount=" + subCount
				+ ", listuserDto=" + listuserDto + "]";
	}
	
	
}
