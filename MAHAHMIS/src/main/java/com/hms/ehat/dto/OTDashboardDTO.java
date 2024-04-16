package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.List;

public class OTDashboardDTO implements Serializable {

	private static final long serialVersionUID = -4446101612873822896L;

	private Integer treatmentOperationsId;
	
	private Integer patientId;
	
	private Integer treatmentId;
	
	private String operationDate;
	
	private String operationStartTime;
	
	private String operationEndTime;
	
	private String operationStatus;
	
	private Integer otId;
	
	private String doctorName;
	
	private String scheduledProcedure;
	
	private String otName;
	
	private String surgeryTeam;

	private List<OTDashboardDTO> listOTDashboardDTO;

	public Integer getTreatmentOperationsId() {
		return treatmentOperationsId;
	}

	public void setTreatmentOperationsId(Integer treatmentOperationsId) {
		this.treatmentOperationsId = treatmentOperationsId;
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

	public String getOperationDate() {
		return operationDate;
	}

	public void setOperationDate(String operationDate) {
		this.operationDate = operationDate;
	}

	public String getOperationStartTime() {
		return operationStartTime;
	}

	public void setOperationStartTime(String operationStartTime) {
		this.operationStartTime = operationStartTime;
	}

	public String getOperationEndTime() {
		return operationEndTime;
	}

	public void setOperationEndTime(String operationEndTime) {
		this.operationEndTime = operationEndTime;
	}

	public String getOperationStatus() {
		return operationStatus;
	}

	public void setOperationStatus(String operationStatus) {
		this.operationStatus = operationStatus;
	}

	public Integer getOtId() {
		return otId;
	}

	public void setOtId(Integer otId) {
		this.otId = otId;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getScheduledProcedure() {
		return scheduledProcedure;
	}

	public void setScheduledProcedure(String scheduledProcedure) {
		this.scheduledProcedure = scheduledProcedure;
	}

	public String getOtName() {
		return otName;
	}

	public void setOtName(String otName) {
		this.otName = otName;
	}

	public String getSurgeryTeam() {
		return surgeryTeam;
	}

	public void setSurgeryTeam(String surgeryTeam) {
		this.surgeryTeam = surgeryTeam;
	}

	public List<OTDashboardDTO> getListOTDashboardDTO() {
		return listOTDashboardDTO;
	}

	public void setListOTDashboardDTO(List<OTDashboardDTO> listOTDashboardDTO) {
		this.listOTDashboardDTO = listOTDashboardDTO;
	}

	@Override
	public String toString() {
		return "OTDashboardDTO [treatmentOperationsId=" + treatmentOperationsId
				+ ", patientId=" + patientId + ", treatmentId=" + treatmentId
				+ ", operationDate=" + operationDate + ", operationStartTime="
				+ operationStartTime + ", operationEndTime=" + operationEndTime
				+ ", operationStatus=" + operationStatus + ", otId=" + otId
				+ ", doctorName=" + doctorName + ", scheduledProcedure="
				+ scheduledProcedure + ", otName=" + otName + ", surgeryTeam="
				+ surgeryTeam + ", listOTDashboardDTO=" + listOTDashboardDTO
				+ "]";
	}


	
	
	
	


}
