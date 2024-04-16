package com.hms.pathology.dto;

import java.util.List;

public class PathologyTemplateRotineValueDTO {

	private Integer patientId;
	private Integer treatmentId;
	private String gender;
	private String patientName;
	private Integer masterId;
	private Integer templateId;
	private String templateName;
	private String profileName;
	private String templateData;
	private String callFrom;
	private Integer organismId;
	private String organismName;
	private Integer machineId;
	private String machineName;
	
	List<PathologyTemplateRotineValueDTO>  listtemplateinfo;
	public Integer getMasterId() {
		return masterId;
	}
	public void setMasterId(Integer masterId) {
		this.masterId = masterId;
	}
	public Integer getTemplateId() {
		return templateId;
	}
	public void setTemplateId(Integer templateId) {
		this.templateId = templateId;
	}
	public String getTemplateName() {
		return templateName;
	}
	public void setTemplateName(String templateName) {
		this.templateName = templateName;
	}
	public String getProfileName() {
		return profileName;
	}
	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}
	public String getTemplateData() {
		return templateData;
	}
	public void setTemplateData(String templateData) {
		this.templateData = templateData;
	}
	public String getCallFrom() {
		return callFrom;
	}
	public void setCallFrom(String callFrom) {
		this.callFrom = callFrom;
	}
	public List<PathologyTemplateRotineValueDTO> getListtemplateinfo() {
		return listtemplateinfo;
	}
	public void setListtemplateinfo(List<PathologyTemplateRotineValueDTO> listtemplateinfo) {
		this.listtemplateinfo = listtemplateinfo;
	}
	public Integer getPatientId() {
		return patientId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	public Integer getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public Integer getOrganismId() {
		return organismId;
	}
	public void setOrganismId(Integer organismId) {
		this.organismId = organismId;
	}
	public String getOrganismName() {
		return organismName;
	}
	public void setOrganismName(String organismName) {
		this.organismName = organismName;
	}
	public Integer getMachineId() {
		return machineId;
	}
	public void setMachineId(Integer machineId) {
		this.machineId = machineId;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	@Override
	public String toString() {
		return "PathologyTemplateRotineValueDTO [patientId=" + patientId + ", treatmentId=" + treatmentId + ", gender="
				+ gender + ", patientName=" + patientName + ", masterId=" + masterId + ", templateId=" + templateId
				+ ", templateName=" + templateName + ", profileName=" + profileName + ", templateData=" + templateData
				+ ", callFrom=" + callFrom + ", organismId=" + organismId + ", organismName=" + organismName
				+ ", machineId=" + machineId + ", machineName=" + machineName + ", listtemplateinfo=" + listtemplateinfo
				+ "]";
	}
	
	
	
	
}
