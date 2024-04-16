package com.hms.pathology.dto;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pathology_sample_wise_master")
public class PathologySampleWiseMaster {
	
	@Id
	@GeneratedValue
	@Column(name = "id")
	private Integer sampleWiseMasterId;
    
	@Column(name = "patient_id")
	private Integer patientId;	
	
	@Transient
	private String centerPatientId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "test_status")
	private Integer teststatus=1;
		
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;	
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@CreationTimestamp
	@Column(name = "created_date_time",updatable=false)
	private Date createDate;
	
	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDate;
	
	@Column(name = "sample_type_id",columnDefinition="int default 0")
	private Integer sampleTypeId=0;
	
	@Column(name = "business_type",columnDefinition="int default 0")
	private Integer businessType=0;
	
	@Column(name = "customer_type",columnDefinition="int default 0")
	private Integer customerType=0;
	
	@Column(name = "customer_id",columnDefinition="int default 0")
	private Integer customerId=0;
	
	@Column(name = "collected_flag",columnDefinition="varchar(2) default 'N'")
	private String collectedFlag="N";
	
	@Column(name = "bar_code")
	private String barCode;
	
	@Column(name = "in_out_house",columnDefinition="int default 0")
	private Integer inOutHouse=0;
	
	@Column(name = "sample_count",columnDefinition="int default 0")
	private Integer sampleCount=0;
	
	@Column(name="bil_det_id")
	private Integer bilDetId;	
	
	@Column(name="dept_id")
	private Integer deptId;
	
	@Column(name="ref_doc_id")
	private Integer refdocid;
	
	@Column(name="profile_Id")
	private Integer profileId;
	
	@Column(name="pkg_Id")
	private Integer packageId=0;
	
	@Column(name="pkgFlag")
	private String pkgFlag="N";
	
	@Column(name="container_Id")
	private Integer containerId;
	
	@Column(name="sample_Id")
	private Integer sampleId;
	
	@Column(name="unit_Id")
	private Integer unitId;
	@Column(name="phlebo_teststatus")
	private String phleboteststatus="U";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "collected_date",updatable=false)
	private Date collecteddatetime;	

	@Column(name = "collected_by")
	private Integer collectedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "rejected_date",updatable=false)
	private Date rejecteddatetime;	

	@Column(name = "rejected_by")
	private Integer rejectedBy;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "recollection_date",updatable=false)
	private Date recollectiontime;	

	@Column(name = "recollection_by")
	private Integer recollectionBy;
	
	
	@Column(name="service_id")
	private Integer serviceId;
	
	@Column(name="sub_service_id")
	private Integer subServiceId;

	@Column(name = "deleted")
	private String deleted="N";
	
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date",updatable=false)
	private Date deleteddatetime;	

	@Column(name = "remarks")
	private String remarks;
	
	@Column(name="pathologist_id")
	private Integer pathologistId;
	

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "unauthorized_date",updatable=false)
	private Date unauthorizeddatetime;	

	@Column(name = "unauthorized_by")
	private Integer unauthorizedBy;
		
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "authorized_date",updatable=false)
	private Date authorizeddatetime;	

	@Column(name = "authorized_by")
	private Integer authorizedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "post_date",updatable=false)
	private Date postdatetime;	

	@Column(name = "post_by")
	private Integer postBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "back_accession_date",updatable=false)
	private Date backToaccessiondatetime;	

	@Column(name = "back_accession_by")
	private Integer backaccessionBy;

	@Column(name = "lab_center_id")
	private Integer labCenterId;
	
	@Column(name = "dispatch_date")
	private String dispatchDate;
	
	@Column(name = "dispatch_time")
	private String dispatchTime;
	
	@Column(name = "carrier_name")
	private String carrierId;
	
	@Column(name = "comment")
	private String commentId;
	
	@Column(name = "recollection_flag")
	private String recollectionFlag="N";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "drop_datetime",updatable=false)
	private Date dropDateTime;	

	@Column(name = "drop_by")
	private Integer dropBy;
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "accepted_datetime",updatable=false)
	private Date acceptedDateTime;	

	@Column(name = "accepted_by")
	private Integer acceptedby;
	@Column(name="machine_Id")
	private Integer machineId;
	
	@Column(name="serial_no")
	private String SerialNo;
	
	@Column(name="kitspec_id")
	private String kitSpecId;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "runner_submit_date",updatable=false)
	private Date runnerSubmitDate;	

	@Column(name = "runner_submit_by")
	private Integer runnerSubmitBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "runner_collected_date",updatable=false)
	private Date runnerCollectedDate;	

	@Column(name = "runner_collected_by")
	private Integer runnerCollectedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "runner_assigned_date",updatable=false)
	private Date runnerAssignedDate;	

	@Column(name = "runner_assigned_by")
	private Integer runnerAssignedBy;
	
	@Column(name = "runner_assigned",columnDefinition="int default 0")
	private Integer runnerAssigned;
	
	@Column(name = "b2b_rejected_from",columnDefinition="int default 0")
	private Integer b2BRejectedFrom = 0;
	
	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	@JoinColumn(name = "master_id")
	List<PathologySampleWiseSlave> pathologySampleWiseSlave;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "runner_unassigned_date",updatable=false)
	private Date runnerUnassignedDate;	

	@Column(name = "runner_unassigned_by")
	private Integer runnerUnassignedBy;
		
	@Column(name = "transferrer_id")
	private Integer transferrerId;
	
	@Column(name = "transferee_id")
	private Integer transfereeId;
	
	@Column(name = "to_days")
	private Integer days;
	
	@Column(name = "transfered", columnDefinition  = "varchar(2) default 'N'")
	private String isTransfered = "N";
	
	@CreationTimestamp
	@Column(name = "transfered_date_time",updatable=false)
	private Date transferedDate;
	
	@Column(name = "transfered_by",columnDefinition="int default 0")
	private Integer transferedBy = 0;
	
	@Column(name = "transfer_from_date",updatable=false)
	private Date fromDate;
	
	@Column(name = "transfer_to_date",updatable=false)
	private Date toDate;
	
	@Column(name = "collection_date")
	private String collectionDate="";	
	
	@Column(name = "collection_time")
	private String collectionTime="";
	
	@Column(name="reg_ref_doc_id")
	private Integer regRefDocId;
	
	@Column(name = "result_flag",columnDefinition="varchar(2) default 'NA'")
	private String resultFlag = "NA";
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "email_send_date_time",updatable=false)
	private Date emailSendDateTime;	

	@Column(name = "email_status",columnDefinition="varchar(11) default 'N'")
	private String emailStatus="N";
	
	@Column(name = "profile_comments",columnDefinition="LONGTEXT")
	private String profileComments;




	
//added by Rohit on 17-09-2021 to maintain the flow of micro biology and template wise flow
	@Column(name = "template_wise",columnDefinition="varchar(255) default 'N'")
	private String templateWise="N";
	
// column added by ROHIT AMBAWADE on 22 NOV 2021, to add the count for the prints 
	@Column(name = "print_count",columnDefinition="int default 0")
	private Integer printCount = 0;
	
	@Column(name = "machine_name",columnDefinition="varchar(300) default 'N'")
	private String machineName;
	
	@Column(name = "sample_collected_at",columnDefinition="varchar(255) default ''")
	private String sampleCollectedAt="";
	
	@Transient
	private List<PathologySampleWiseMaster> labSampleWiseMasterDtoList;
	
	@Transient
	private List<PathologySampleWiseMaster> lstSampleMasterlist;
	
	@Transient
	private List<PathologySampleWiseMaster> testli;	
	
	@Transient
	private List<PathologySampleWiseMaster> proLi;
	
	@Transient
	private List<String> treandAnalysisList;

	@Transient
	private List<String> treandAnalysisDateList;
	
	@Transient
	private List<String> treandAnalysisFlagList;
	
	// added for graph print
	@Transient
	private List<String> treandAnalysisGraphList;

	@Transient
	private List<String> treandAnalysissGraphDateList;
	
	@Transient
	private List<String> treandAnalysissGraphFlagList;
	// end for graph
	
	
	// added for single and five record
	@Transient
	private List<String> trendAnalysisResultFiveSingleList;
	
	@Transient
	private List<String> trendAnalysisFiveSingleDateList;
	
	@Transient
	private List<String> trendAnalysisFiveSingleFlagList;
	// end
	@Transient
	private Integer departmentId;
	
	@Transient
	private String patientname;
	
	@Transient
	private Integer profiId;
	
	@Transient
	private String profileName;
	
	@Transient
	private Integer pkgId;
	
	@Transient
	private String pkgName;
	
	@Transient
	private Integer testId;
	
	@Transient
	private Number testIdd;//for print
	
	@Transient
	private String testname;
	
	@Transient
	private String testName;
	
	@Transient
	private String docname;
	
	@Transient
	private String conatinername;
	
	@Transient
	private String datetime;
	
	@Transient
	private String testresult;
	
	@Transient
	private String methodename;
	
	@Transient
	private String mobile;
	
	@Transient
	private String patientgander;
	
	@Transient
	private Integer patientage;
	
	@Transient
	private String patientmobile;
	
	@Transient
	private Integer rejectreason;
	
	@Transient
	private Integer unrejectreason;
	
	@Transient
	private String recollectionReason;
	
	@Transient
	private String lowvalue;
	
	@Transient
	private String highvalue;
	
	@Transient
	private String abnormalvalue;
	
	@Transient
	private String masterId;	
	
	@Transient
	private String rowCount;
	
	@Transient
	private String labcl;
	
	@Transient
	private String labch;	
	
	@Transient
	private String nonexisthigh;
	
	@Transient
	private String nonexistlow;
	
	@Transient
	private String defaultvalue;	
	
	@Transient
	private String flagmark;
	
	@Transient
	private String rejecttestflag;

	@Transient
	private String barcodenumber;	
	
	@Transient
	private BigInteger samplenumber;
	
	@Transient	
	private String containername;	
	
	@Transient	
	private String samplename;
	
	@Transient
	private String unitname;	
		
	@Transient
	private String gender;
	
	@Transient
	private String testcode;
	
	@Transient
	private Integer masterid;	
	
	@Transient
	private String testflag;
	
	@Transient
	private String testreason;	
	
	@Transient
	private String comments;	
	
	@Transient
	private String profileMasterComment;	
	
	@Transient
	private String interpretation;	
	
	@Transient
	private String testRate;
	
//	=======================================================================
//	Newly added code
//	=======================================================================
	
	@Transient
	private String disclaimer;
	
	@Transient
	private String disclaimerCheck;
	
	@Transient
	private String commentCheck;
	
	@Transient
	private String interpretationCheck;

//	=======================================================================
//	=======================================================================
	
	@Transient
	private String collecteddate;	
	
	@Transient
	private String postdate;
	
	@Transient
	private String provision;
	
	@Transient
	private String headingname;		
	
	@Transient
	private Integer headingId;
	
	@Transient
	private String objFormula;
	
	@Transient
	private String pathlogistName;
		
	@Transient
	private String createdByName;
	
	@Transient
	private String collectedByName;
	
	@Transient
	private String rejectedByName;
	
	@Transient
	private String unauthorizedByName;
	
	@Transient
	private String authorizedByName;
	
	@Transient
	private String postByName;
	
	@Transient
	private String testReasonName;
	
	@Transient
	private String outlabName;
	
	@Transient
	private String centerName;
	
	@Transient
	private String timeSensitiveValue;
	
	@Transient
	private String accpteddate;
	
	@Transient
	private String acceptedByName;
	
	@Transient
	private String emergencyflag;
	
	@Transient
	private String pageno;
	
	@Transient
	private String barcodefbsppbs;
	
	@Transient
	private String fbsppbsaccepteddate;
	
	@Transient
	private String fbsppbspostdate;
	
	@Transient
	private String resulttrendanalysis;
	
	@Transient
	private String trendanalysisFlag;
	
	@Transient
	private String trendanalysisDate;
	
	@Transient
	private String trendanalysisResult;
	
	@Transient
	private String applyformula;
	
	@Transient
	private String reportingdecimal;
	
	@Transient
	private Integer decimalvalue;
	
	@Transient
	private String microorganism;
	
	@Transient
	private String expression;
	
	@Transient
	private String quantitative;
	
	@Transient
	private String testComments;
	
	@Transient
	private String testInterpretation;	
	
	@Transient
	private String microreason;	
	
	@Transient
	private String testReRun;	
	
	@Transient
	private String testReRunResult;
	
	@Transient
	private String runnerAssignedByName;
	
	@Transient
	private String runnerAssignedName;
	
	@Transient
	private String expressionResult;
	
	@Transient
	private String unitNameGenaral;
	
	@Transient
	private String testType;
	
	@Transient
	private String transferedToName;
	
	@Transient
	private String transferedFromName;
	
	@Transient
	private String profilesample;
	
	@Transient
	private String serviceAssignedDateTime;
	
	@Transient
	private String regRefDocName;
	
	@Transient
	private int rejectedFrom;
	
	@Transient
	private String emailid;
	
	@Transient
	private String emailId;
	
	@Transient
	private String biologicalReferenceWithGeneral;
	
	@Transient
	private String biologicalReferenceWithNormal;
	
	@Transient
	private String biologicalReferenceChk;
	
	@Transient
	private String sampleTypeChk;
	
	@Transient
	private String testMethodChk;
	
	@Transient
	private String profileIdString;
	
	@Transient
	private int appointmentId = 0;
	
	@Transient
	private String customerName;
	
	
	@Transient
	private String textFlag;
	
	@Transient
	private String testNote;
	
	@Transient
	Integer normalTestCount;
	
	@Transient
	Integer templateTestCount;
	
	@Transient
	private String testHeaderFlag;
	
	@Transient
	private String treadanalysisFlag;
	
	@Transient
	private Integer ageInyear;
	
	@Transient
	private Integer ageInMonth;
	
	@Transient
	private Number sequence;
	
	@Transient
	private Integer ageInDays;
	
	@Transient
	private Integer treadAnalysisFlagCount;
	
	@Transient
	private String profileNamesPdf;// added for name given to pdf
	
	
	public String getProfileComments() {
		return profileComments;
	}
	public void setProfileComments(String profileComments) {
		this.profileComments = profileComments;
	}	
	public String getEmailid() {
		return emailid;
	}
	public void setEmailid(String emailid) {
		this.emailid = emailid;
	}
	public String getProfilesample() {
		return profilesample;
	}
	public void setProfilesample(String profilesample) {
		this.profilesample = profilesample;
	}
	public String getKitSpecId() {
		return kitSpecId;
	}
	public void setKitSpecId(String kitSpecId) {
		this.kitSpecId = kitSpecId;
	}
	public String getTestType() {
		return testType;
	}
	public void setTestType(String testType) {
		this.testType = testType;
	}
	public String getUnitNameGenaral() {
		return unitNameGenaral;
	}
	public void setUnitNameGenaral(String unitNameGenaral) {
		this.unitNameGenaral = unitNameGenaral;
	}
	public String getExpressionResult() {
		return expressionResult;
	}
	public void setExpressionResult(String expressionResult) {
		this.expressionResult = expressionResult;
	}
	public String getTestReRunResult() {
		return testReRunResult;
	}
	public void setTestReRunResult(String testReRunResult) {
		this.testReRunResult = testReRunResult;
	}
	public String getTestReRun() {
		return testReRun;
	}
	public void setTestReRun(String testReRun) {
		this.testReRun = testReRun;
	}
	public String getMicroreason() {
		return microreason;
	}
	public void setMicroreason(String microreason) {
		this.microreason = microreason;
	}
	public String getTestComments() {
		return testComments;
	}
	public void setTestComments(String testComments) {
		this.testComments = testComments;
	}
	public String getTestInterpretation() {
		return testInterpretation;
	}
	public void setTestInterpretation(String testInterpretation) {
		this.testInterpretation = testInterpretation;
	}
	public String getQuantitative() {
		return quantitative;
	}
	public void setQuantitative(String quantitative) {
		this.quantitative = quantitative;
	}
	public String getExpression() {
		return expression;
	}
	public void setExpression(String expression) {
		this.expression = expression;
	}
	public String getMicroorganism() {
		return microorganism;
	}
	public void setMicroorganism(String microorganism) {
		this.microorganism = microorganism;
	}
	public String getReportingdecimal() {
		return reportingdecimal;
	}
	public void setReportingdecimal(String reportingdecimal) {
		this.reportingdecimal = reportingdecimal;
	}
	public Integer getDecimalvalue() {
		return decimalvalue;
	}
	public void setDecimalvalue(Integer decimalvalue) {
		this.decimalvalue = decimalvalue;
	}
	public String getApplyformula() {
		return applyformula;
	}
	public void setApplyformula(String applyformula) {
		this.applyformula = applyformula;
	}
	public String getTrendanalysisResult() {
		return trendanalysisResult;
	}
	public void setTrendanalysisResult(String trendanalysisResult) {
		this.trendanalysisResult = trendanalysisResult;
	}
	public String getTrendanalysisDate() {
		return trendanalysisDate;
	}
	public void setTrendanalysisDate(String trendanalysisDate) {
		this.trendanalysisDate = trendanalysisDate;
	}
	public String getTrendanalysisFlag() {
		return trendanalysisFlag;
	}
	public void setTrendanalysisFlag(String trendanalysisFlag) {
		this.trendanalysisFlag = trendanalysisFlag;
	}
	public List<String> getTreandAnalysisList() {
		return treandAnalysisList;
	}
	public void setTreandAnalysisList(List<String> treandAnalysisList) {
		this.treandAnalysisList = treandAnalysisList;
	}
	public String getResulttrendanalysis() {
		return resulttrendanalysis;
	}
	public void setResulttrendanalysis(String resulttrendanalysis) {
		this.resulttrendanalysis = resulttrendanalysis;
	}
	public String getBarcodefbsppbs() {
		return barcodefbsppbs;
	}
	public void setBarcodefbsppbs(String barcodefbsppbs) {
		this.barcodefbsppbs = barcodefbsppbs;
	}
	public String getFbsppbsaccepteddate() {
		return fbsppbsaccepteddate;
	}
	public void setFbsppbsaccepteddate(String fbsppbsaccepteddate) {
		this.fbsppbsaccepteddate = fbsppbsaccepteddate;
	}
	public String getFbsppbspostdate() {
		return fbsppbspostdate;
	}
	public void setFbsppbspostdate(String fbsppbspostdate) {
		this.fbsppbspostdate = fbsppbspostdate;
	}
	
	public String getPageno() {
		return pageno;
	}
	public void setPageno(String pageno) {
		this.pageno = pageno;
	}
	public Integer getUnrejectreason() {
		return unrejectreason;
	}
	public void setUnrejectreason(Integer unrejectreason) {
		this.unrejectreason = unrejectreason;
	}
	public String getSerialNo() {
		return SerialNo;
	}
	public void setSerialNo(String serialNo) {
		SerialNo = serialNo;
	}
	public Integer getMachineId() {
		return machineId;
	}
	public void setMachineId(Integer machineId) {
		this.machineId = machineId;
	}
	
	public String getEmergencyflag() {
		return emergencyflag;
	}
	public void setEmergencyflag(String emergencyflag) {
		this.emergencyflag = emergencyflag;
	}
	public String getAccpteddate() {
		return accpteddate;
	}
	public void setAccpteddate(String accpteddate) {
		this.accpteddate = accpteddate;
	}
	public Date getDropDateTime() {
		return dropDateTime;
	}
	public void setDropDateTime(Date dropDateTime) {
		this.dropDateTime = dropDateTime;
	}
	public Integer getDropBy() {
		return dropBy;
	}
	public void setDropBy(Integer dropBy) {
		this.dropBy = dropBy;
	}
	public String getRecollectionFlag() {
		return recollectionFlag;
	}
	public void setRecollectionFlag(String recollectionFlag) {
		this.recollectionFlag = recollectionFlag;
	}
	public String getOutlabName() {
		return outlabName;
	}
	public void setOutlabName(String outlabName) {
		this.outlabName = outlabName;
	}
	public Date getRecollectiontime() {
		return recollectiontime;
	}
	public void setRecollectiontime(Date recollectiontime) {
		this.recollectiontime = recollectiontime;
	}
	public Integer getRecollectionBy() {
		return recollectionBy;
	}
	public void setRecollectionBy(Integer recollectionBy) {
		this.recollectionBy = recollectionBy;
	}
	public List<PathologySampleWiseMaster> getProLi() {
		return proLi;
	}
	public void setProLi(List<PathologySampleWiseMaster> proLi) {
		this.proLi = proLi;
	}
	public Integer getPathologistId() {
		return pathologistId;
	}
	public void setPathologistId(Integer pathologistId) {
		this.pathologistId = pathologistId;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public Integer getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}
	public Date getDeleteddatetime() {
		return deleteddatetime;
	}
	public void setDeleteddatetime(Date deleteddatetime) {
		this.deleteddatetime = deleteddatetime;
	}
	public Date getRejecteddatetime() {
		return rejecteddatetime;
	}
	public void setRejecteddatetime(Date rejecteddatetime) {
		this.rejecteddatetime = rejecteddatetime;
	}
	public Integer getRejectedBy() {
		return rejectedBy;
	}
	public void setRejectedBy(Integer rejectedBy) {
		this.rejectedBy = rejectedBy;
	}
	public String getPkgFlag() {
		return pkgFlag;
	}
	public void setPkgFlag(String pkgFlag) {
		this.pkgFlag = pkgFlag;
	}
	public Integer getRejectreason() {
		return rejectreason;
	}
	public void setRejectreason(Integer rejectreason) {
		this.rejectreason = rejectreason;
	}
	public String getRecollectionReason() {
		return recollectionReason;
	}
	public void setRecollectionReason(String recollectionReason) {
		this.recollectionReason = recollectionReason;
	}
	public String getPatientmobile() {
		return patientmobile;
	}
	public void setPatientmobile(String patientmobile) {
		this.patientmobile = patientmobile;
	}
	public Integer getPatientage() {
		return patientage;
	}
	public void setPatientage(Integer patientage) {
		this.patientage = patientage;
	}
	public String getPatientgander() {
		return patientgander;
	}
	public void setPatientgander(String patientgander) {
		this.patientgander = patientgander;
	}

	public String getFlagmark() {
		return flagmark;
	}
	public void setFlagmark(String flagmark) {
		this.flagmark = flagmark;
	}
	public String getRejecttestflag() {
		return rejecttestflag;
	}
	public void setRejecttestflag(String rejecttestflag) {
		this.rejecttestflag = rejecttestflag;
	}
	public String getLabcl() {
		return labcl;
	}
	public void setLabcl(String labcl) {
		this.labcl = labcl;
	}
	public String getLabch() {
		return labch;
	}
	public void setLabch(String labch) {
		this.labch = labch;
	}
	public String getNonexisthigh() {
		return nonexisthigh;
	}
	public void setNonexisthigh(String nonexisthigh) {
		this.nonexisthigh = nonexisthigh;
	}
	public String getNonexistlow() {
		return nonexistlow;
	}
	public void setNonexistlow(String nonexistlow) {
		this.nonexistlow = nonexistlow;
	}
	public String getDefaultvalue() {
		return defaultvalue;
	}
	public void setDefaultvalue(String defaultvalue) {
		this.defaultvalue = defaultvalue;
	}
	public Integer getPackageId() {
		return packageId;
	}
	public void setPackageId(Integer packageId) {
		this.packageId = packageId;
	}
	public Integer getTeststatus() {
		return teststatus;
	}
	public void setTeststatus(Integer teststatus) {
		this.teststatus = teststatus;
	}
	public String getMasterId() {
		return masterId;
	}
	public void setMasterId(String masterId) {
		this.masterId = masterId;
	}
	public String getLowvalue() {
		return lowvalue;
	}
	public void setLowvalue(String lowvalue) {
		this.lowvalue = lowvalue;
	}
	public String getHighvalue() {
		return highvalue;
	}
	public void setHighvalue(String highvalue) {
		this.highvalue = highvalue;
	}
	public String getAbnormalvalue() {
		return abnormalvalue;
	}
	public void setAbnormalvalue(String abnormalvalue) {
		this.abnormalvalue = abnormalvalue;
	}
	public String getMethodename() {
		return methodename;
	}
	public void setMethodename(String methodename) {
		this.methodename = methodename;
	}
	public String getTestresult() {
		return testresult;
	}
	public void setTestresult(String testresult) {
		this.testresult = testresult;
	}

	public String getPathlogistName() {
		return pathlogistName;
	}
	public void setPathlogistName(String pathlogistName) {
		this.pathlogistName = pathlogistName;
	}
	
	public String getTestReasonName() {
		return testReasonName;
	}
	public void setTestReasonName(String testReasonName) {
		this.testReasonName = testReasonName;
	}
	public String getObjFormula() {
		return objFormula;
	}
	public void setObjFormula(String objFormula) {
		this.objFormula = objFormula;
	}
	public Integer getHeadingId() {
		return headingId;
	}
	public void setHeadingId(Integer headingId) {
		this.headingId = headingId;
	}
	public String getHeadingname() {
		return headingname;
	}
	public void setHeadingname(String headingname) {
		this.headingname = headingname;
	}
	public String getProvision() {
		return provision;
	}
	public void setProvision(String provision) {
		this.provision = provision;
	}
	public String getCollecteddate() {
		return collecteddate;
	}
	public void setCollecteddate(String collecteddate) {
		this.collecteddate = collecteddate;
	}
	public String getPostdate() {
		return postdate;
	}
	public void setPostdate(String postdate) {
		this.postdate = postdate;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getInterpretation() {
		return interpretation;
	}
	public void setInterpretation(String interpretation) {
		this.interpretation = interpretation;
	}
	public String getTestreason() {
		return testreason;
	}
	public void setTestreason(String testreason) {
		this.testreason = testreason;
	}
	public String getTestflag() {
		return testflag;
	}
	public void setTestflag(String testflag) {
		this.testflag = testflag;
	}
	public Integer getMasterid() {
		return masterid;
	}
	public void setMasterid(Integer masterid) {
		this.masterid = masterid;
	}
	public String getTestcode() {
		return testcode;
	}
	public void setTestcode(String testcode) {
		this.testcode = testcode;
	}
	public List<PathologySampleWiseMaster> getTestli() {
		return testli;
	}
	public void setTestli(List<PathologySampleWiseMaster> testli) {
		this.testli = testli;
	}
	
	public Integer getCollectedBy() {
		return collectedBy;
	}
	public void setCollectedBy(Integer collectedBy) {
		this.collectedBy = collectedBy;
	}
	public Date getCollecteddatetime() {
		return collecteddatetime;
	}
	public void setCollecteddatetime(Date collecteddatetime) {
		this.collecteddatetime = collecteddatetime;
	}
	public String getPhleboteststatus() {
		return phleboteststatus;
	}
	public void setPhleboteststatus(String phleboteststatus) {
		this.phleboteststatus = phleboteststatus;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public String getContainername() {
		return containername;
	}
	public void setContainername(String containername) {
		this.containername = containername;
	}
	public String getSamplename() {
		return samplename;
	}
	public void setSamplename(String samplename) {
		this.samplename = samplename;
	}
	public String getUnitname() {
		return unitname;
	}
	public void setUnitname(String unitname) {
		this.unitname = unitname;
	}
	public BigInteger getSamplenumber() {
		return samplenumber;
	}
	public void setSamplenumber(BigInteger samplenumber) {
		this.samplenumber = samplenumber;
	}
	public String getBarcodenumber() {
		return barcodenumber;
	}
	public void setBarcodenumber(String barcodenumber) {
		this.barcodenumber = barcodenumber;
	}
	public Integer getSampleWiseMasterId() {
		return sampleWiseMasterId;
	}
	public void setSampleWiseMasterId(Integer sampleWiseMasterId) {
		this.sampleWiseMasterId = sampleWiseMasterId;
	}
	public Integer getPatientId() {
		return patientId;
	}
	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}
	public String getCenterPatientId() {
		return centerPatientId;
	}
	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}
	public Integer getTreatmentId() {
		return treatmentId;
	}
	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}
	public Integer getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}
	public Integer getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	public Integer getSampleTypeId() {
		return sampleTypeId;
	}
	public void setSampleTypeId(Integer sampleTypeId) {
		this.sampleTypeId = sampleTypeId;
	}
	
	public String getBarCode() {
		return barCode;
	}
	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}
	public Integer getInOutHouse() {
		return inOutHouse;
	}
	public void setInOutHouse(Integer inOutHouse) {
		this.inOutHouse = inOutHouse;
	}
	public Integer getSampleCount() {
		return sampleCount;
	}
	public void setSampleCount(Integer sampleCount) {
		this.sampleCount = sampleCount;
	}
	public Integer getRefdocid() {
		return refdocid;
	}
	public void setRefdocid(Integer refdocid) {
		this.refdocid = refdocid;
	}
	public Integer getProfileId() {
		return profileId;
	}
	public void setProfileId(Integer profileId) {
		this.profileId = profileId;
	}
	public List<PathologySampleWiseSlave> getPathologySampleWiseSlave() {
		return pathologySampleWiseSlave;
	}
	public void setPathologySampleWiseSlave(
			List<PathologySampleWiseSlave> pathologySampleWiseSlave) {
		this.pathologySampleWiseSlave = pathologySampleWiseSlave;
	}
	public List<PathologySampleWiseMaster> getLabSampleWiseMasterDtoList() {
		return labSampleWiseMasterDtoList;
	}
	public void setLabSampleWiseMasterDtoList(
			List<PathologySampleWiseMaster> labSampleWiseMasterDtoList) {
		this.labSampleWiseMasterDtoList = labSampleWiseMasterDtoList;
	}
	public Integer getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}
	public String getPatientname() {
		return patientname;
	}
	public void setPatientname(String patientname) {
		this.patientname = patientname;
	}
	public Integer getProfiId() {
		return profiId;
	}
	public void setProfiId(Integer profiId) {
		this.profiId = profiId;
	}
	public String getProfileName() {
		return profileName;
	}
	public void setProfileName(String profileName) {
		this.profileName = profileName;
	}
	public Integer getPkgId() {
		return pkgId;
	}
	public void setPkgId(Integer pkgId) {
		this.pkgId = pkgId;
	}
	public String getPkgName() {
		return pkgName;
	}
	public void setPkgName(String pkgName) {
		this.pkgName = pkgName;
	}
	public Integer getTestId() {
		return testId;
	}
	public void setTestId(Integer testId) {
		this.testId = testId;
	}	
	public String getTestname() {
		return testname;
	}
	public void setTestname(String testname) {
		this.testname = testname;
	}
	public String getDocname() {
		return docname;
	}
	public void setDocname(String docname) {
		this.docname = docname;
	}
	public String getDatetime() {
		return datetime;
	}
	public void setDatetime(String datetime) {
		this.datetime = datetime;
	}	
	public Integer getContainerId() {
		return containerId;
	}
	public void setContainerId(Integer containerId) {
		this.containerId = containerId;
	}
	public Integer getSampleId() {
		return sampleId;
	}
	public void setSampleId(Integer sampleId) {
		this.sampleId = sampleId;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public Integer getServiceId() {
		return serviceId;
	}
	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}
	public Integer getSubServiceId() {
		return subServiceId;
	}
	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}
	public Integer getBilDetId() {
		return bilDetId;
	}
	public void setBilDetId(Integer bilDetId) {
		this.bilDetId = bilDetId;
	}	
	public Integer getDeptId() {
		return deptId;
	}
	public void setDeptId(Integer deptId) {
		this.deptId = deptId;
	}
	public String getResultFlag() {
		return resultFlag;
	}
	public void setResultFlag(String resultFlag) {
		this.resultFlag = resultFlag;
	}
	public String getRowCount() {
		return rowCount;
	}
	public void setRowCount(String rowCount) {
		this.rowCount = rowCount;
	}
	public Date getUnauthorizeddatetime() {
		return unauthorizeddatetime;
	}
	public void setUnauthorizeddatetime(Date unauthorizeddatetime) {
		this.unauthorizeddatetime = unauthorizeddatetime;
	}
	public Integer getUnauthorizedBy() {
		return unauthorizedBy;
	}
	public void setUnauthorizedBy(Integer unauthorizedBy) {
		this.unauthorizedBy = unauthorizedBy;
	}
	public Date getAuthorizeddatetime() {
		return authorizeddatetime;
	}
	public void setAuthorizeddatetime(Date authorizeddatetime) {
		this.authorizeddatetime = authorizeddatetime;
	}
	public Integer getAuthorizedBy() {
		return authorizedBy;
	}
	public void setAuthorizedBy(Integer authorizedBy) {
		this.authorizedBy = authorizedBy;
	}
	public Date getPostdatetime() {
		return postdatetime;
	}
	public void setPostdatetime(Date postdatetime) {
		this.postdatetime = postdatetime;
	}
	public Integer getPostBy() {
		return postBy;
	}
	public void setPostBy(Integer postBy) {
		this.postBy = postBy;
	}
	public Date getBackToaccessiondatetime() {
		return backToaccessiondatetime;
	}
	public void setBackToaccessiondatetime(Date backToaccessiondatetime) {
		this.backToaccessiondatetime = backToaccessiondatetime;
	}
	public Integer getBackaccessionBy() {
		return backaccessionBy;
	}
	public void setBackaccessionBy(Integer backaccessionBy) {
		this.backaccessionBy = backaccessionBy;
	}
	public Integer getBusinessType() {
		return businessType;
	}
	public void setBusinessType(Integer businessType) {
		this.businessType = businessType;
	}
	public Integer getCustomerType() {
		return customerType;
	}
	public void setCustomerType(Integer customerType) {
		this.customerType = customerType;
	}
	public Integer getCustomerId() {
		return customerId;
	}
	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}
	public String getCollectedFlag() {
		return collectedFlag;
	}
	public void setCollectedFlag(String collectedFlag) {
		this.collectedFlag = collectedFlag;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getCreatedByName() {
		return createdByName;
	}
	public void setCreatedByName(String createdByName) {
		this.createdByName = createdByName;
	}
	public String getCollectedByName() {
		return collectedByName;
	}
	public void setCollectedByName(String collectedByName) {
		this.collectedByName = collectedByName;
	}
	public String getRejectedByName() {
		return rejectedByName;
	}
	public void setRejectedByName(String rejectedByName) {
		this.rejectedByName = rejectedByName;
	}
	public String getUnauthorizedByName() {
		return unauthorizedByName;
	}
	public void setUnauthorizedByName(String unauthorizedByName) {
		this.unauthorizedByName = unauthorizedByName;
	}
	public String getAuthorizedByName() {
		return authorizedByName;
	}
	public void setAuthorizedByName(String authorizedByName) {
		this.authorizedByName = authorizedByName;
	}
	public String getPostByName() {
		return postByName;
	}
	public void setPostByName(String postByName) {
		this.postByName = postByName;
	}
	public Integer getLabCenterId() {
		return labCenterId;
	}
	public void setLabCenterId(Integer labCenterId) {
		this.labCenterId = labCenterId;
	}
	public String getDispatchDate() {
		return dispatchDate;
	}
	public void setDispatchDate(String dispatchDate) {
		this.dispatchDate = dispatchDate;
	}
	public String getDispatchTime() {
		return dispatchTime;
	}
	public void setDispatchTime(String dispatchTime) {
		this.dispatchTime = dispatchTime;
	}
	public String getCarrierId() {
		return carrierId;
	}
	public void setCarrierId(String carrierId) {
		this.carrierId = carrierId;
	}
	public String getCommentId() {
		return commentId;
	}
	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}
	public Date getAcceptedDateTime() {
		return acceptedDateTime;
	}
	public void setAcceptedDateTime(Date acceptedDateTime) {
		this.acceptedDateTime = acceptedDateTime;
	}
	public Integer getAcceptedby() {
		return acceptedby;
	}
	public void setAcceptedby(Integer acceptedby) {
		this.acceptedby = acceptedby;
	}
	public String getCenterName() {
		return centerName;
	}
	public void setCenterName(String centerName) {
		this.centerName = centerName;
	}
	public String getTimeSensitiveValue() {
		return timeSensitiveValue;
	}
	public void setTimeSensitiveValue(String timeSensitiveValue) {
		this.timeSensitiveValue = timeSensitiveValue;
	}
	public String getAcceptedByName() {
		return acceptedByName;
	}
	public void setAcceptedByName(String acceptedByName) {
		this.acceptedByName = acceptedByName;
	}
	
	public Date getRunnerSubmitDate() {
		return runnerSubmitDate;
	}
	public void setRunnerSubmitDate(Date runnerSubmitDate) {
		this.runnerSubmitDate = runnerSubmitDate;
	}
	public Integer getRunnerSubmitBy() {
		return runnerSubmitBy;
	}
	public void setRunnerSubmitBy(Integer runnerSubmitBy) {
		this.runnerSubmitBy = runnerSubmitBy;
	}
	public Date getRunnerCollectedDate() {
		return runnerCollectedDate;
	}
	public void setRunnerCollectedDate(Date runnerCollectedDate) {
		this.runnerCollectedDate = runnerCollectedDate;
	}
	public Integer getRunnerCollectedBy() {
		return runnerCollectedBy;
	}
	public void setRunnerCollectedBy(Integer runnerCollectedBy) {
		this.runnerCollectedBy = runnerCollectedBy;
	}
	public Integer getB2BRejectedFrom() {
		return b2BRejectedFrom;
	}
	public void setB2BRejectedFrom(Integer b2bRejectedFrom) {
		b2BRejectedFrom = b2bRejectedFrom;
	}
	public List<String> getTreandAnalysisDateList() {
		return treandAnalysisDateList;
	}
	public void setTreandAnalysisDateList(List<String> treandAnalysisDateList) {
		this.treandAnalysisDateList = treandAnalysisDateList;
	}
	
	public Date getRunnerAssignedDate() {
		return runnerAssignedDate;
	}
	public void setRunnerAssignedDate(Date runnerAssignedDate) {
		this.runnerAssignedDate = runnerAssignedDate;
	}
	public Integer getRunnerAssignedBy() {
		return runnerAssignedBy;
	}
	public void setRunnerAssignedBy(Integer runnerAssignedBy) {
		this.runnerAssignedBy = runnerAssignedBy;
	}
	public Integer getRunnerAssigned() {
		return runnerAssigned;
	}
	public void setRunnerAssigned(Integer runnerAssigned) {
		this.runnerAssigned = runnerAssigned;
	}
	public String getRunnerAssignedByName() {
		return runnerAssignedByName;
	}
	public void setRunnerAssignedByName(String runnerAssignedByName) {
		this.runnerAssignedByName = runnerAssignedByName;
	}
	public String getRunnerAssignedName() {
		return runnerAssignedName;
	}
	public void setRunnerAssignedName(String runnerAssignedName) {
		this.runnerAssignedName = runnerAssignedName;
	}
	public Date getRunnerUnassignedDate() {
		return runnerUnassignedDate;
	}
	public void setRunnerUnassignedDate(Date runnerUnassignedDate) {
		this.runnerUnassignedDate = runnerUnassignedDate;
	}
	public Integer getRunnerUnassignedBy() {
		return runnerUnassignedBy;
	}
	public void setRunnerUnassignedBy(Integer runnerUnassignedBy) {
		this.runnerUnassignedBy = runnerUnassignedBy;
	}

	public Integer getTransferrerId() {
		return transferrerId;
	}
	public void setTransferrerId(Integer transferrerId) {
		this.transferrerId = transferrerId;
	}
	public Integer getTransfereeId() {
		return transfereeId;
	}
	public void setTransfereeId(Integer transfereeId) {
		this.transfereeId = transfereeId;
	}
	public Integer getDays() {
		return days;
	}
	public void setDays(Integer days) {
		this.days = days;
	}
	public String getIsTransfered() {
		return isTransfered;
	}
	public void setIsTransfered(String isTransfered) {
		this.isTransfered = isTransfered;
	}
	public Date getTransferedDate() {
		return transferedDate;
	}
	public void setTransferedDate(Date transferedDate) {
		this.transferedDate = transferedDate;
	}
	public Integer getTransferedBy() {
		return transferedBy;
	}
	public void setTransferedBy(Integer transferedBy) {
		this.transferedBy = transferedBy;
	}
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	public String getTransferedToName() {
		return transferedToName;
	}
	public void setTransferedToName(String transferedToName) {
		this.transferedToName = transferedToName;
	}
	public String getTransferedFromName() {
		return transferedFromName;
	}
	public void setTransferedFromName(String transferedFromName) {
		this.transferedFromName = transferedFromName;
	}
	public String getServiceAssignedDateTime() {
		return serviceAssignedDateTime;
	}
	public void setServiceAssignedDateTime(String serviceAssignedDateTime) {
		this.serviceAssignedDateTime = serviceAssignedDateTime;
	}
	public String getCollectionDate() {
		return collectionDate;
	}
	public void setCollectionDate(String collectionDate) {
		this.collectionDate = collectionDate;
	}
	public String getCollectionTime() {
		return collectionTime;
	}
	public void setCollectionTime(String collectionTime) {
		this.collectionTime = collectionTime;
	}
	public Integer getRegRefDocId() {
		return regRefDocId;
	}
	public void setRegRefDocId(Integer regRefDocId) {
		this.regRefDocId = regRefDocId;
	}
	public String getRegRefDocName() {
		return regRefDocName;
	}
	public void setRegRefDocName(String regRefDocName) {
		this.regRefDocName = regRefDocName;
	}
	public Date getEmailSendDateTime() {
		return emailSendDateTime;
	}
	public String getEmailStatus() {
		return emailStatus;
	}
	public void setEmailSendDateTime(Date emailSendDateTime) {
		this.emailSendDateTime = emailSendDateTime;
	}
	public void setEmailStatus(String emailStatus) {
		this.emailStatus = emailStatus;
	}
	public String getProfileMasterComment() {
		return profileMasterComment;
	}
	public void setProfileMasterComment(String profileMasterComment) {
		this.profileMasterComment = profileMasterComment;
	}
	public String getBiologicalReferenceWithGeneral() {
		return biologicalReferenceWithGeneral;
	}
	public void setBiologicalReferenceWithGeneral(
			String biologicalReferenceWithGeneral) {
		this.biologicalReferenceWithGeneral = biologicalReferenceWithGeneral;
	}
	public String getBiologicalReferenceWithNormal() {
		return biologicalReferenceWithNormal;
	}
	public void setBiologicalReferenceWithNormal(
			String biologicalReferenceWithNormal) {
		this.biologicalReferenceWithNormal = biologicalReferenceWithNormal;
	}
	public String getBiologicalReferenceChk() {
		return biologicalReferenceChk;
	}
	public void setBiologicalReferenceChk(String biologicalReferenceChk) {
		this.biologicalReferenceChk = biologicalReferenceChk;
	}
	public String getSampleTypeChk() {
		return sampleTypeChk;
	}
	public void setSampleTypeChk(String sampleTypeChk) {
		this.sampleTypeChk = sampleTypeChk;
	}
	public String getTestMethodChk() {
		return testMethodChk;
	}
	public void setTestMethodChk(String testMethodChk) {
		this.testMethodChk = testMethodChk;
	}
	public String getProfileIdString() {
		return profileIdString;
	}
	public void setProfileIdString(String profileIdString) {
		this.profileIdString = profileIdString;
	}
	
	public int getAppointmentId() {
		return appointmentId;
	}
	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getTemplateWise() {
		return templateWise;
	}
	public void setTemplateWise(String templateWise) {
		this.templateWise = templateWise;
	}
	
	
	
	public Integer getPrintCount() {
		return printCount;
	}
	public void setPrintCount(Integer printCount) {
		this.printCount = printCount;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getDisclaimer() {
		return disclaimer;
	}
	public void setDisclaimer(String disclaimer) {
		this.disclaimer = disclaimer;
	}	
	public String getDisclaimerCheck() {
		return disclaimerCheck;
	}
	public void setDisclaimerCheck(String disclaimerCheck) {
		this.disclaimerCheck = disclaimerCheck;
	}
	public String getCommentCheck() {
		return commentCheck;
	}
	public void setCommentCheck(String commentCheck) {
		this.commentCheck = commentCheck;
	}
	public String getInterpretationCheck() {
		return interpretationCheck;
	}
	public void setInterpretationCheck(String interpretationCheck) {
		this.interpretationCheck = interpretationCheck;
	}
	public String getConatinername() {
		return conatinername;
	}
	public void setConatinername(String conatinername) {
		this.conatinername = conatinername;
	}	
	public String getTestName() {
		return testName;
	}
	public void setTestName(String testName) {
		this.testName = testName;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public int getRejectedFrom() {
		return rejectedFrom;
	}
	public void setRejectedFrom(int rejectedFrom) {
		this.rejectedFrom = rejectedFrom;
	}
	
	@Transient
	Number rpas_all_record_count;
	
	public Number getRpas_all_record_count() {
		return rpas_all_record_count;
	}
	public void setRpas_all_record_count(Number rpas_all_record_count) {
		this.rpas_all_record_count = rpas_all_record_count;
	}
	public String getMachineName() {
		return machineName;
	}
	public void setMachineName(String machineName) {
		this.machineName = machineName;
	}
	public List<PathologySampleWiseMaster> getLstSampleMasterlist() {
		return lstSampleMasterlist;
	}
	public void setLstSampleMasterlist(List<PathologySampleWiseMaster> lstSampleMasterlist) {
		this.lstSampleMasterlist = lstSampleMasterlist;
	}
	public List<String> getTreandAnalysisFlagList() {
		return treandAnalysisFlagList;
	}
	public void setTreandAnalysisFlagList(List<String> treandAnalysisFlagList) {
		this.treandAnalysisFlagList = treandAnalysisFlagList;
	}
	public String getTextFlag() {
		return textFlag;
	}
	public void setTextFlag(String textFlag) {
		this.textFlag = textFlag;
	}
	public List<String> getTreandAnalysisGraphList() {
		return treandAnalysisGraphList;
	}
	public void setTreandAnalysisGraphList(List<String> treandAnalysisGraphList) {
		this.treandAnalysisGraphList = treandAnalysisGraphList;
	}
	public List<String> getTreandAnalysissGraphDateList() {
		return treandAnalysissGraphDateList;
	}
	public void setTreandAnalysissGraphDateList(List<String> treandAnalysissGraphDateList) {
		this.treandAnalysissGraphDateList = treandAnalysissGraphDateList;
	}
	public List<String> getTreandAnalysissGraphFlagList() {
		return treandAnalysissGraphFlagList;
	}
	public void setTreandAnalysissGraphFlagList(List<String> treandAnalysissGraphFlagList) {
		this.treandAnalysissGraphFlagList = treandAnalysissGraphFlagList;
	}
	public String getTestNote() {
		return testNote;
	}
	public void setTestNote(String testNote) {
		this.testNote = testNote;
	}
	public Integer getNormalTestCount() {
		return normalTestCount;
	}
	public void setNormalTestCount(Integer normalTestCount) {
		this.normalTestCount = normalTestCount;
	}
	public Integer getTemplateTestCount() {
		return templateTestCount;
	}
	public void setTemplateTestCount(Integer templateTestCount) {
		this.templateTestCount = templateTestCount;
	}
	public String getTestHeaderFlag() {
		return testHeaderFlag;
	}
	public void setTestHeaderFlag(String testHeaderFlag) {
		this.testHeaderFlag = testHeaderFlag;
	}
	public List<String> getTrendAnalysisResultFiveSingleList() {
		return trendAnalysisResultFiveSingleList;
	}
	public void setTrendAnalysisResultFiveSingleList(List<String> trendAnalysisResultFiveSingleList) {
		this.trendAnalysisResultFiveSingleList = trendAnalysisResultFiveSingleList;
	}
	public List<String> getTrendAnalysisFiveSingleDateList() {
		return trendAnalysisFiveSingleDateList;
	}
	public void setTrendAnalysisFiveSingleDateList(List<String> trendAnalysisFiveSingleDateList) {
		this.trendAnalysisFiveSingleDateList = trendAnalysisFiveSingleDateList;
	}
	public List<String> getTrendAnalysisFiveSingleFlagList() {
		return trendAnalysisFiveSingleFlagList;
	}
	public void setTrendAnalysisFiveSingleFlagList(List<String> trendAnalysisFiveSingleFlagList) {
		this.trendAnalysisFiveSingleFlagList = trendAnalysisFiveSingleFlagList;
	}
	public String getTreadanalysisFlag() {
		return treadanalysisFlag;
	}
	public void setTreadanalysisFlag(String treadanalysisFlag) {
		this.treadanalysisFlag = treadanalysisFlag;
	}
	public Integer getAgeInyear() {
		return ageInyear;
	}
	public void setAgeInyear(Integer ageInyear) {
		this.ageInyear = ageInyear;
	}
	public Integer getAgeInMonth() {
		return ageInMonth;
	}
	public void setAgeInMonth(Integer ageInMonth) {
		this.ageInMonth = ageInMonth;
	}
	public Integer getAgeInDays() {
		return ageInDays;
	}
	public void setAgeInDays(Integer ageInDays) {
		this.ageInDays = ageInDays;
	}
	public Number getTestIdd() {
		return testIdd;
	}
	public void setTestIdd(Number testIdd) {
		this.testIdd = testIdd;
	}
	public Number getSequence() {
		return sequence;
	}
	public void setSequence(Number sequence) {
		this.sequence = sequence;
	}
	public Integer getTreadAnalysisFlagCount() {
		return treadAnalysisFlagCount;
	}
	public void setTreadAnalysisFlagCount(Integer treadAnalysisFlagCount) {
		this.treadAnalysisFlagCount = treadAnalysisFlagCount;
	}
	public String getProfileNamesPdf() {
		return profileNamesPdf;
	}
	public void setProfileNamesPdf(String profileNamesPdf) {
		this.profileNamesPdf = profileNamesPdf;
	}
	public String getTestRate() {
		return testRate;
	}
	public void setTestRate(String testRate) {
		this.testRate = testRate;
	}
	public String getSampleCollectedAt() {
		return sampleCollectedAt;
	}
	public void setSampleCollectedAt(String sampleCollectedAt) {
		this.sampleCollectedAt = sampleCollectedAt;
	}
	@Override
	public String toString() {
		return "PathologySampleWiseMaster [sampleWiseMasterId=" + sampleWiseMasterId + ", patientId=" + patientId
				+ ", centerPatientId=" + centerPatientId + ", treatmentId=" + treatmentId + ", teststatus=" + teststatus
				+ ", createdBy=" + createdBy + ", updatedBy=" + updatedBy + ", createDate=" + createDate
				+ ", updatedDate=" + updatedDate + ", sampleTypeId=" + sampleTypeId + ", businessType=" + businessType
				+ ", customerType=" + customerType + ", customerId=" + customerId + ", collectedFlag=" + collectedFlag
				+ ", barCode=" + barCode + ", inOutHouse=" + inOutHouse + ", sampleCount=" + sampleCount + ", bilDetId="
				+ bilDetId + ", deptId=" + deptId + ", refdocid=" + refdocid + ", profileId=" + profileId
				+ ", packageId=" + packageId + ", pkgFlag=" + pkgFlag + ", containerId=" + containerId + ", sampleId="
				+ sampleId + ", unitId=" + unitId + ", phleboteststatus=" + phleboteststatus + ", collecteddatetime="
				+ collecteddatetime + ", collectedBy=" + collectedBy + ", rejecteddatetime=" + rejecteddatetime
				+ ", rejectedBy=" + rejectedBy + ", recollectiontime=" + recollectiontime + ", recollectionBy="
				+ recollectionBy + ", serviceId=" + serviceId + ", subServiceId=" + subServiceId + ", deleted="
				+ deleted + ", deletedBy=" + deletedBy + ", deleteddatetime=" + deleteddatetime + ", remarks=" + remarks
				+ ", pathologistId=" + pathologistId + ", unauthorizeddatetime=" + unauthorizeddatetime
				+ ", unauthorizedBy=" + unauthorizedBy + ", authorizeddatetime=" + authorizeddatetime
				+ ", authorizedBy=" + authorizedBy + ", postdatetime=" + postdatetime + ", postBy=" + postBy
				+ ", backToaccessiondatetime=" + backToaccessiondatetime + ", backaccessionBy=" + backaccessionBy
				+ ", labCenterId=" + labCenterId + ", dispatchDate=" + dispatchDate + ", dispatchTime=" + dispatchTime
				+ ", carrierId=" + carrierId + ", commentId=" + commentId + ", recollectionFlag=" + recollectionFlag
				+ ", dropDateTime=" + dropDateTime + ", dropBy=" + dropBy + ", acceptedDateTime=" + acceptedDateTime
				+ ", acceptedby=" + acceptedby + ", machineId=" + machineId + ", SerialNo=" + SerialNo + ", kitSpecId="
				+ kitSpecId + ", runnerSubmitDate=" + runnerSubmitDate + ", runnerSubmitBy=" + runnerSubmitBy
				+ ", runnerCollectedDate=" + runnerCollectedDate + ", runnerCollectedBy=" + runnerCollectedBy
				+ ", runnerAssignedDate=" + runnerAssignedDate + ", runnerAssignedBy=" + runnerAssignedBy
				+ ", runnerAssigned=" + runnerAssigned + ", b2BRejectedFrom=" + b2BRejectedFrom
				+ ", pathologySampleWiseSlave=" + pathologySampleWiseSlave + ", runnerUnassignedDate="
				+ runnerUnassignedDate + ", runnerUnassignedBy=" + runnerUnassignedBy + ", transferrerId="
				+ transferrerId + ", transfereeId=" + transfereeId + ", days=" + days + ", isTransfered=" + isTransfered
				+ ", transferedDate=" + transferedDate + ", transferedBy=" + transferedBy + ", fromDate=" + fromDate
				+ ", toDate=" + toDate + ", collectionDate=" + collectionDate + ", collectionTime=" + collectionTime
				+ ", regRefDocId=" + regRefDocId + ", resultFlag=" + resultFlag + ", emailSendDateTime="
				+ emailSendDateTime + ", emailStatus=" + emailStatus + ", profileComments=" + profileComments
				+ ", templateWise=" + templateWise + ", printCount=" + printCount + ", machineName=" + machineName
				+ ", sampleCollectedAt=" + sampleCollectedAt + ", labSampleWiseMasterDtoList="
				+ labSampleWiseMasterDtoList + ", lstSampleMasterlist=" + lstSampleMasterlist + ", testli=" + testli
				+ ", proLi=" + proLi + ", treandAnalysisList=" + treandAnalysisList + ", treandAnalysisDateList="
				+ treandAnalysisDateList + ", treandAnalysisFlagList=" + treandAnalysisFlagList
				+ ", treandAnalysisGraphList=" + treandAnalysisGraphList + ", treandAnalysissGraphDateList="
				+ treandAnalysissGraphDateList + ", treandAnalysissGraphFlagList=" + treandAnalysissGraphFlagList
				+ ", trendAnalysisResultFiveSingleList=" + trendAnalysisResultFiveSingleList
				+ ", trendAnalysisFiveSingleDateList=" + trendAnalysisFiveSingleDateList
				+ ", trendAnalysisFiveSingleFlagList=" + trendAnalysisFiveSingleFlagList + ", departmentId="
				+ departmentId + ", patientname=" + patientname + ", profiId=" + profiId + ", profileName="
				+ profileName + ", pkgId=" + pkgId + ", pkgName=" + pkgName + ", testId=" + testId + ", testIdd="
				+ testIdd + ", testname=" + testname + ", testName=" + testName + ", docname=" + docname
				+ ", conatinername=" + conatinername + ", datetime=" + datetime + ", testresult=" + testresult
				+ ", methodename=" + methodename + ", mobile=" + mobile + ", patientgander=" + patientgander
				+ ", patientage=" + patientage + ", patientmobile=" + patientmobile + ", rejectreason=" + rejectreason
				+ ", unrejectreason=" + unrejectreason + ", recollectionReason=" + recollectionReason + ", lowvalue="
				+ lowvalue + ", highvalue=" + highvalue + ", abnormalvalue=" + abnormalvalue + ", masterId=" + masterId
				+ ", rowCount=" + rowCount + ", labcl=" + labcl + ", labch=" + labch + ", nonexisthigh=" + nonexisthigh
				+ ", nonexistlow=" + nonexistlow + ", defaultvalue=" + defaultvalue + ", flagmark=" + flagmark
				+ ", rejecttestflag=" + rejecttestflag + ", barcodenumber=" + barcodenumber + ", samplenumber="
				+ samplenumber + ", containername=" + containername + ", samplename=" + samplename + ", unitname="
				+ unitname + ", gender=" + gender + ", testcode=" + testcode + ", masterid=" + masterid + ", testflag="
				+ testflag + ", testreason=" + testreason + ", comments=" + comments + ", profileMasterComment="
				+ profileMasterComment + ", interpretation=" + interpretation + ", testRate=" + testRate
				+ ", disclaimer=" + disclaimer + ", disclaimerCheck=" + disclaimerCheck + ", commentCheck="
				+ commentCheck + ", interpretationCheck=" + interpretationCheck + ", collecteddate=" + collecteddate
				+ ", postdate=" + postdate + ", provision=" + provision + ", headingname=" + headingname
				+ ", headingId=" + headingId + ", objFormula=" + objFormula + ", pathlogistName=" + pathlogistName
				+ ", createdByName=" + createdByName + ", collectedByName=" + collectedByName + ", rejectedByName="
				+ rejectedByName + ", unauthorizedByName=" + unauthorizedByName + ", authorizedByName="
				+ authorizedByName + ", postByName=" + postByName + ", testReasonName=" + testReasonName
				+ ", outlabName=" + outlabName + ", centerName=" + centerName + ", timeSensitiveValue="
				+ timeSensitiveValue + ", accpteddate=" + accpteddate + ", acceptedByName=" + acceptedByName
				+ ", emergencyflag=" + emergencyflag + ", pageno=" + pageno + ", barcodefbsppbs=" + barcodefbsppbs
				+ ", fbsppbsaccepteddate=" + fbsppbsaccepteddate + ", fbsppbspostdate=" + fbsppbspostdate
				+ ", resulttrendanalysis=" + resulttrendanalysis + ", trendanalysisFlag=" + trendanalysisFlag
				+ ", trendanalysisDate=" + trendanalysisDate + ", trendanalysisResult=" + trendanalysisResult
				+ ", applyformula=" + applyformula + ", reportingdecimal=" + reportingdecimal + ", decimalvalue="
				+ decimalvalue + ", microorganism=" + microorganism + ", expression=" + expression + ", quantitative="
				+ quantitative + ", testComments=" + testComments + ", testInterpretation=" + testInterpretation
				+ ", microreason=" + microreason + ", testReRun=" + testReRun + ", testReRunResult=" + testReRunResult
				+ ", runnerAssignedByName=" + runnerAssignedByName + ", runnerAssignedName=" + runnerAssignedName
				+ ", expressionResult=" + expressionResult + ", unitNameGenaral=" + unitNameGenaral + ", testType="
				+ testType + ", transferedToName=" + transferedToName + ", transferedFromName=" + transferedFromName
				+ ", profilesample=" + profilesample + ", serviceAssignedDateTime=" + serviceAssignedDateTime
				+ ", regRefDocName=" + regRefDocName + ", rejectedFrom=" + rejectedFrom + ", emailid=" + emailid
				+ ", emailId=" + emailId + ", biologicalReferenceWithGeneral=" + biologicalReferenceWithGeneral
				+ ", biologicalReferenceWithNormal=" + biologicalReferenceWithNormal + ", biologicalReferenceChk="
				+ biologicalReferenceChk + ", sampleTypeChk=" + sampleTypeChk + ", testMethodChk=" + testMethodChk
				+ ", profileIdString=" + profileIdString + ", appointmentId=" + appointmentId + ", customerName="
				+ customerName + ", textFlag=" + textFlag + ", testNote=" + testNote + ", normalTestCount="
				+ normalTestCount + ", templateTestCount=" + templateTestCount + ", testHeaderFlag=" + testHeaderFlag
				+ ", treadanalysisFlag=" + treadanalysisFlag + ", ageInyear=" + ageInyear + ", ageInMonth=" + ageInMonth
				+ ", sequence=" + sequence + ", ageInDays=" + ageInDays + ", treadAnalysisFlagCount="
				+ treadAnalysisFlagCount + ", profileNamesPdf=" + profileNamesPdf + ", rpas_all_record_count="
				+ rpas_all_record_count + "]";
	}
	
	
	
	
}