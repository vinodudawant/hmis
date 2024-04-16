package com.hms.dto;

import java.util.List;

public class ModuleMasterDto {

	int moduleId;
	String moduleName;
	int landPageId;
	String landPageName;
	List<ModuleMasterDto> lstModule;
	
	public int getModuleId() {
		return moduleId;
	}
	public void setModuleId(int moduleId) {
		this.moduleId = moduleId;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public int getLandPageId() {
		return landPageId;
	}
	public void setLandPageId(int landPageId) {
		this.landPageId = landPageId;
	}
	public String getLandPageName() {
		return landPageName;
	}
	public void setLandPageName(String landPageName) {
		this.landPageName = landPageName;
	}
	public List<ModuleMasterDto> getLstModule() {
		return lstModule;
	}
	public void setLstModule(List<ModuleMasterDto> lstModule) {
		this.lstModule = lstModule;
	}
	@Override
	public String toString() {
		return "ModuleMasterDto [moduleId=" + moduleId + ", moduleName=" + moduleName + ", landPageId=" + landPageId
				+ ", landPageName=" + landPageName + ", lstModule=" + lstModule + "]";
	}	
}
