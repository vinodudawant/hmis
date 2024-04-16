package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pharma_user_module")
public class UserModule implements Serializable{

	@Id
	@GeneratedValue
	@Column(name="module_id")
	private Integer moduleId;
	
	@Column(name="module_name")
	private String moduleName=null;
	
	@Column(name="module_delete_flag")
	private Integer moduleDeleteFlag=0;
	
	@Column(name="module_add_date")
	private Date moduleAddDate;
	
	@Column(name="module_update_date")
	private Date moduleUpdateDate;
	
	@Column(name="module_add_by")
	private String moduleAddBy=null;
	
	@Column(name="module_mod_by")
	private String moduleModBy=null;

	public Integer getModuleId() {
		return moduleId;
	}

	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}

	public String getModuleName() {
		return moduleName;
	}

	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	public Integer getModuleDeleteFlag() {
		return moduleDeleteFlag;
	}

	public void setModuleDeleteFlag(Integer moduleDeleteFlag) {
		this.moduleDeleteFlag = moduleDeleteFlag;
	}

	public Date getModuleAddDate() {
		return moduleAddDate;
	}

	public void setModuleAddDate(Date moduleAddDate) {
		this.moduleAddDate = moduleAddDate;
	}

	public Date getModuleUpdateDate() {
		return moduleUpdateDate;
	}

	public void setModuleUpdateDate(Date moduleUpdateDate) {
		this.moduleUpdateDate = moduleUpdateDate;
	}

	public String getModuleAddBy() {
		return moduleAddBy;
	}

	public void setModuleAddBy(String moduleAddBy) {
		this.moduleAddBy = moduleAddBy;
	}

	public String getModuleModBy() {
		return moduleModBy;
	}

	public void setModuleModBy(String moduleModBy) {
		this.moduleModBy = moduleModBy;
	}
	
}
