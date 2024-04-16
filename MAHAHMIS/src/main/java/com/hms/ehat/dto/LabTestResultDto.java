package com.hms.ehat.dto;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

@Entity 
@Table(name = "ehat_lab_result")
public class LabTestResultDto {

	@Id
	@GeneratedValue
	@Column(name = "lab_result_id")
	int labResultId;
	
	@Column(name = "patient_id")
	int patientId=0;
	
	@Column(name = "treatment_id")
	int treatmentId=0;
	
	@Column(name = "lab_request_id")
	int labRequestId=0;
	
	@Column(name = "lab_req_slv_id")
	int labReqSlvId=0;
	
	@Column(name = "service_id")
	int serviceId=0;
	
	@Column(name = "sub_service_id")
	int subServiceId=0;
	
	@Column(name = "test_id")
	int testId=0;
	
	@Column(name = "unit_id")
	int unitId=0;
	
	@Column(name = "inserted_by")
	int insertedBy=0;
	
	@Column(name = "updated_by")
	int updateBy=0;
	
	@Column(name = "deleted_by")
	int deletedBy=0;
	
	@Column(name = "department_id")
	int departmentId=0;
	
	@Column(name = "test_result")
	String testResult="-";
	
	@Column(name = "narration")
	String narration="-";
	
	@Column(name = "delete_flag")
	String deleteFlag="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inserted_datetime")
	private Date insertedDatetime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_datetime")
	private Date deleteDatetime;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_datetime")
	private Date updatedDatetime;

	@Column(name = "testTemplate",columnDefinition="TEXT default NULL")
	String testTemplate="-";
	
	@Column(name = "impressions",columnDefinition="varchar(900) default NULL")
	String impressions="-";
	
	@Column(name = "is_template_flag",columnDefinition="varchar(15) default 'N'")
	String isTemplateFlag="N";
	
	@Column(name = "is_machine_res_flag",columnDefinition="varchar(15) default 'N'")
	String isMachineResFlag="N";
	
	@Transient
	private List<LabTestResultDto> listLabResultDto;
	
	public int getLabResultId() {
		return labResultId;
	}

	public void setLabResultId(int labResultId) {
		this.labResultId = labResultId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getLabRequestId() {
		return labRequestId;
	}

	public void setLabRequestId(int labRequestId) {
		this.labRequestId = labRequestId;
	}

	public int getLabReqSlvId() {
		return labReqSlvId;
	}

	public void setLabReqSlvId(int labReqSlvId) {
		this.labReqSlvId = labReqSlvId;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getSubServiceId() {
		return subServiceId;
	}

	public void setSubServiceId(int subServiceId) {
		this.subServiceId = subServiceId;
	}

	public int getTestId() {
		return testId;
	}

	public void setTestId(int testId) {
		this.testId = testId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getInsertedBy() {
		return insertedBy;
	}

	public void setInsertedBy(int insertedBy) {
		this.insertedBy = insertedBy;
	}

	public int getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(int updateBy) {
		this.updateBy = updateBy;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public String getTestResult() {
		return testResult;
	}

	public void setTestResult(String testResult) {
		this.testResult = testResult;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}

	public String getDeleteFlag() {
		return deleteFlag;
	}

	public void setDeleteFlag(String deleteFlag) {
		this.deleteFlag = deleteFlag;
	}

	public Date getInsertedDatetime() {
		return insertedDatetime;
	}

	public void setInsertedDatetime(Date insertedDatetime) {
		this.insertedDatetime = insertedDatetime;
	}

	public Date getDeleteDatetime() {
		return deleteDatetime;
	}

	public void setDeleteDatetime(Date deleteDatetime) {
		this.deleteDatetime = deleteDatetime;
	}

	public Date getUpdatedDatetime() {
		return updatedDatetime;
	}

	public void setUpdatedDatetime(Date updatedDatetime) {
		this.updatedDatetime = updatedDatetime;
	}

	public List<LabTestResultDto> getListLabResultDto() {
		return listLabResultDto;
	}

	public void setListLabResultDto(List<LabTestResultDto> listLabResultDto) {
		this.listLabResultDto = listLabResultDto;
	}

	public String getTestTemplate() {
		return testTemplate;
	}

	public void setTestTemplate(String testTemplate) {
		this.testTemplate = testTemplate;
	}

	public String getImpressions() {
		return impressions;
	}

	public void setImpressions(String impressions) {
		this.impressions = impressions;
	}

	public String getIsTemplateFlag() {
		return isTemplateFlag;
	}

	public void setIsTemplateFlag(String isTemplateFlag) {
		this.isTemplateFlag = isTemplateFlag;
	}

	public String getIsMachineResFlag() {
		return isMachineResFlag;
	}

	public void setIsMachineResFlag(String isMachineResFlag) {
		this.isMachineResFlag = isMachineResFlag;
	}
	
}
