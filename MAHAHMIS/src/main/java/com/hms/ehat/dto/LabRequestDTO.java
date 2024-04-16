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

import com.hms.dto.pathologistDto;


@Entity 
@Table(name = "ehat_lab_request")
public class LabRequestDTO {

	@Id
	@GeneratedValue
	@Column(name = "lab_request_id")
	int labRequestId=0;
	
	@Column(name = "patient_id")
	int patientId=0;
	
	@Column(name = "treatment_id")
	int treatmentId=0;
	
	@Column(name = "unit_id")
	int unitId=0;
	
	@Column(name = "dept_id")
	int deptId=0;
	
	@Column(name = "pathologist_id")
	int pathologistId=0;

	@Column(name = "smpl_collet_flag")
	char smplColletFlag='N';
	
	@Column(name = "smpl_count")
	int  smplCount=0;
	
	@Column(name = "smpl_collet_by")
	int  smplColletBy=0;
	
	@Column(name = "smpl_collet_datetime")
	Calendar smplColletDatetime;

	@Column(name = "smpl_accpt_flag")
	char smplAccptFlag='N';
	
	@Column(name = "smpl_accpt_by")
	int  smplAccptBy=0;
	
	@Column(name = "smpl_accpt_datetime")
	Calendar smplAccptDatetime;

	@Column(name = "smpl_reject_flag")
	char smplRejectFlag='N';
	
	@Column(name = "smpl_reject_by")
	int  smplRejectBy=0;

	@Column(name = "smpl_reject_datetime")
	Calendar smplRejectDatetime;
	
	@Column(name = "smpl_reject_reason")
	String smplRejectReason="-";

	@Column(name = "outsource_flag")
	char outsourceFlag='N';
	
	
	
	@Column(name = "outsource_deatetime")
	Calendar outsourceDeatetime;
	
	@Column(name = "outsource_center_id")
	int outsourceCenterId=0;
	
	@Column(name = "outsource_center_name")
	String  outsourceCenterName="-";

	@Column(name = "inserted_by")
	int insertedBy=0;
	
	@Column(name = "inserted_datetime")
	Calendar insertedDatetime;

	@Column(name = "updated_by")
	int updatedBy=0;
	
	@Column(name = "updated_datetime")
	Calendar updatedDatetime;

	@Column(name = "delete_by")
	int deleteBy=0;
	
	@Column(name = "delete_datetime")
	Calendar deleteDatetime;

	@Column(name = "discard_flag")
	char discardFlag='N';
	
	@Column(name = "discard_by")
	int  discardBy=0;
	
	@Column(name = "discard_datetime")
	Calendar discardDatetime;
	
	@Column(name = "result_gen_flag")
	char resultGenFlag='N';
	
	@Column(name = "result_gen_by")
	int resultGenBy=0;
	
	@Column(name = "result_gen_datetime")
	Calendar resultGenDatetime;
	
	@Column(name = "urgent_flag")
	char urgentFlag='N';
	
	@Column(name = "posted_result_flag")
	char postedResultFlag='N';
	
	@Column(name = "posted_datetime")
	Calendar postedDatetime;
	
	@Column(name = "posted_by")
	int postedBy=0;

	//Added by Laxman on 02-Feb-2018.
	@Column(name = "test_status")
	String  testStatus="C";
	
	@Column(name = "advice")
	String  advice="-";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "report_due_datetime")
	private Date reportDueDatetime;
	
	@Column(name = "out_flag",columnDefinition="varchar(2) default 'N' ")
	char outFlag='N';
	
	public char getOutFlag() {
		return outFlag;
	}

	public void setOutFlag(char outFlag) {
		this.outFlag = outFlag;
	}

	@Transient
	private List<LabRequestDTO> listLabRequest;
	
	@Transient
	private List<LabRequestSlaveDTO> listLabRequestSlave;
	
	@Transient
	private List<LabResultMstViewDto> labResultMstViewDto;
	
	@Transient
	private List<pathologistDto> pathologistDtoList;

	public List<LabResultMstViewDto> getLabResultMstViewDto() {
		return labResultMstViewDto;
	}

	public void setLabResultMstViewDto(List<LabResultMstViewDto> labResultMstViewDto) {
		this.labResultMstViewDto = labResultMstViewDto;
	}

	public List<LabRequestDTO> getListLabRequest() {
		return listLabRequest;
	}

	public void setListLabRequest(List<LabRequestDTO> listLabRequest) {
		this.listLabRequest = listLabRequest;
	}

	public List<LabRequestSlaveDTO> getListLabRequestSlave() {
		return listLabRequestSlave;
	}

	public void setListLabRequestSlave(List<LabRequestSlaveDTO> listLabRequestSlave) {
		this.listLabRequestSlave = listLabRequestSlave;
	}

	public int getLabRequestId() {
		return labRequestId;
	}

	public void setLabRequestId(int labRequestId) {
		this.labRequestId = labRequestId;
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

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public int getPathologistId() {
		return pathologistId;
	}

	public void setPathologistId(int pathologistId) {
		this.pathologistId = pathologistId;
	}

	public char getSmplColletFlag() {
		return smplColletFlag;
	}

	public void setSmplColletFlag(char smplColletFlag) {
		this.smplColletFlag = smplColletFlag;
	}

	public int getSmplCount() {
		return smplCount;
	}

	public void setSmplCount(int smplCount) {
		this.smplCount = smplCount;
	}

	public int getSmplColletBy() {
		return smplColletBy;
	}

	public void setSmplColletBy(int smplColletBy) {
		this.smplColletBy = smplColletBy;
	}

	public Calendar getSmplColletDatetime() {
		return smplColletDatetime;
	}

	public void setSmplColletDatetime(Calendar smplColletDatetime) {
		this.smplColletDatetime = smplColletDatetime;
	}

	public char getSmplAccptFlag() {
		return smplAccptFlag;
	}

	public void setSmplAccptFlag(char smplAccptFlag) {
		this.smplAccptFlag = smplAccptFlag;
	}

	public int getSmplAccptBy() {
		return smplAccptBy;
	}

	public void setSmplAccptBy(int smplAccptBy) {
		this.smplAccptBy = smplAccptBy;
	}

	public Calendar getSmplAccptDatetime() {
		return smplAccptDatetime;
	}

	public void setSmplAccptDatetime(Calendar smplAccptDatetime) {
		this.smplAccptDatetime = smplAccptDatetime;
	}

	public char getSmplRejectFlag() {
		return smplRejectFlag;
	}

	public void setSmplRejectFlag(char smplRejectFlag) {
		this.smplRejectFlag = smplRejectFlag;
	}

	public int getSmplRejectBy() {
		return smplRejectBy;
	}

	public void setSmplRejectBy(int smplRejectBy) {
		this.smplRejectBy = smplRejectBy;
	}

	public Calendar getSmplRejectDatetime() {
		return smplRejectDatetime;
	}

	public void setSmplRejectDatetime(Calendar smplRejectDatetime) {
		this.smplRejectDatetime = smplRejectDatetime;
	}

	public String getSmplRejectReason() {
		return smplRejectReason;
	}

	public void setSmplRejectReason(String smplRejectReason) {
		this.smplRejectReason = smplRejectReason;
	}

	public char getOutsourceFlag() {
		return outsourceFlag;
	}

	public void setOutsourceFlag(char outsourceFlag) {
		this.outsourceFlag = outsourceFlag;
	}

	public Calendar getOutsourceDeatetime() {
		return outsourceDeatetime;
	}

	public void setOutsourceDeatetime(Calendar outsourceDeatetime) {
		this.outsourceDeatetime = outsourceDeatetime;
	}

	public int getOutsourceCenterId() {
		return outsourceCenterId;
	}

	public void setOutsourceCenterId(int outsourceCenterId) {
		this.outsourceCenterId = outsourceCenterId;
	}

	public String getOutsourceCenterName() {
		return outsourceCenterName;
	}

	public void setOutsourceCenterName(String outsourceCenterName) {
		this.outsourceCenterName = outsourceCenterName;
	}

	public int getInsertedBy() {
		return insertedBy;
	}

	public void setInsertedBy(int insertedBy) {
		this.insertedBy = insertedBy;
	}

	public Calendar getInsertedDatetime() {
		return insertedDatetime;
	}

	public void setInsertedDatetime(Calendar insertedDatetime) {
		this.insertedDatetime = insertedDatetime;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Calendar getUpdatedDatetime() {
		return updatedDatetime;
	}

	public void setUpdatedDatetime(Calendar updatedDatetime) {
		this.updatedDatetime = updatedDatetime;
	}

	public int getDeleteBy() {
		return deleteBy;
	}

	public void setDeleteBy(int deleteBy) {
		this.deleteBy = deleteBy;
	}

	public Calendar getDeleteDatetime() {
		return deleteDatetime;
	}

	public void setDeleteDatetime(Calendar deleteDatetime) {
		this.deleteDatetime = deleteDatetime;
	}

	public char getDiscardFlag() {
		return discardFlag;
	}

	public void setDiscardFlag(char discardFlag) {
		this.discardFlag = discardFlag;
	}

	public int getDiscardBy() {
		return discardBy;
	}

	public void setDiscardBy(int discardBy) {
		this.discardBy = discardBy;
	}

	public Calendar getDiscardDatetime() {
		return discardDatetime;
	}

	public void setDiscardDatetime(Calendar discardDatetime) {
		this.discardDatetime = discardDatetime;
	}

	public char getResultGenFlag() {
		return resultGenFlag;
	}

	public void setResultGenFlag(char resultGenFlag) {
		this.resultGenFlag = resultGenFlag;
	}

	public int getResultGenBy() {
		return resultGenBy;
	}

	public void setResultGenBy(int resultGenBy) {
		this.resultGenBy = resultGenBy;
	}

	public Calendar getResultGenDatetime() {
		return resultGenDatetime;
	}

	public void setResultGenDatetime(Calendar resultGenDatetime) {
		this.resultGenDatetime = resultGenDatetime;
	}

	public char getUrgentFlag() {
		return urgentFlag;
	}

	public void setUrgentFlag(char urgentFlag) {
		this.urgentFlag = urgentFlag;
	}

	public char getPostedResultFlag() {
		return postedResultFlag;
	}

	public void setPostedResultFlag(char postedResultFlag) {
		this.postedResultFlag = postedResultFlag;
	}

	public Calendar getPostedDatetime() {
		return postedDatetime;
	}

	public void setPostedDatetime(Calendar postedDatetime) {
		this.postedDatetime = postedDatetime;
	}

	public int getPostedBy() {
		return postedBy;
	}

	public void setPostedBy(int postedBy) {
		this.postedBy = postedBy;
	}

	public String getTestStatus() {
		return testStatus;
	}

	public void setTestStatus(String testStatus) {
		this.testStatus = testStatus;
	}

	public String getAdvice() {
		return advice;
	}

	public void setAdvice(String advice) {
		this.advice = advice;
	}

	public Date getReportDueDatetime() {
		return reportDueDatetime;
	}

	public void setReportDueDatetime(Date reportDueDatetime) {
		this.reportDueDatetime = reportDueDatetime;
	}

	public List<pathologistDto> getPathologistDtoList() {
		return pathologistDtoList;
	}

	public void setPathologistDtoList(List<pathologistDto> pathologistDtoList) {
		this.pathologistDtoList = pathologistDtoList;
	}
	
	
	
}
