package com.hms.ehat.dto;

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
@Table(name = "out_source_lab_master1")
public class LabOutSourceSlaveDTO {
	@Id
	@GeneratedValue
	@Column(name = "outsource_lab_id")
	private Integer outlabId;
	@Column(name = "outsource_master_id")
	private Integer outsourcemasterid;
	@Column(name = "treatment_Id")
	private String treatmentId;
	@Column(name = "patient_Id")
	private String patientId;
	
	@Column(name = "dispatchDate")
	private String dispatchDate;
	@Column(name = "dispatchTime")
	private String dispatchTime;
	@Column(name = "carriername")
	private String carrierId;
	@Column(name = "Comment")
	private String CommentId;
	
	@Column(name = "labrequest_id")
	private String labrequestid;
	

	public String getLabrequestid() {
		return labrequestid;
	}

	public void setLabrequestid(String labrequestid) {
		this.labrequestid = labrequestid;
	}


	@Transient
	private List<LabOutSourceSlaveDTO> listlaboutSource;

	public Integer getOutlabId() {
		return outlabId;
	}

	public void setOutlabId(Integer outlabId) {
		this.outlabId = outlabId;
	}

	public Integer getOutsourcemasterid() {
		return outsourcemasterid;
	}

	public void setOutsourcemasterid(Integer outsourcemasterid) {
		this.outsourcemasterid = outsourcemasterid;
	}

	public String getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(String treatmentId) {
		this.treatmentId = treatmentId;
	}

	public String getPatientId() {
		return patientId;
	}

	public void setPatientId(String patientId) {
		this.patientId = patientId;
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
		return CommentId;
	}

	public void setCommentId(String commentId) {
		CommentId = commentId;
	}

	public List<LabOutSourceSlaveDTO> getListlaboutSource() {
		return listlaboutSource;
	}

	public void setListlaboutSource(List<LabOutSourceSlaveDTO> listlaboutSource) {
		this.listlaboutSource = listlaboutSource;
	}
	
	
	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Column(name = "updated_by")
	private Integer updatedBy;
	@Column(name = "deleted_by")
	private Integer deletedBy;	
	@Column(name = "out_flag")
	private String outflag="N";
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDate;

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}


	public String getOutflag() {
		return outflag;
	}

	public void setOutflag(String outflag) {
		this.outflag = outflag;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	public Date getDeletedDate() {
		return deletedDate;
	}

	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}
	
	@Transient
	private String distime1;
	
	@Transient
	private String disdate;
	
	@Transient
	private String labname;
	
	@Transient
	private String pid;
	
	@Transient
	private String testname;
	
	@Transient
	private String patientName;
	
	@Transient
	private String tId;
	@Transient
	private String labAddress;
	@Transient
	private String age;
	@Transient
	private String gendar;

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getGendar() {
		return gendar;
	}

	public void setGendar(String gendar) {
		this.gendar = gendar;
	}

	public String getLabAddress() {
		return labAddress;
	}

	public void setLabAddress(String labAddress) {
		this.labAddress = labAddress;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String gettId() {
		return tId;
	}

	public void settId(String tId) {
		this.tId = tId;
	}

	public String getDistime1() {
		return distime1;
	}

	public void setDistime1(String distime1) {
		this.distime1 = distime1;
	}

	public String getDisdate() {
		return disdate;
	}

	public void setDisdate(String disdate) {
		this.disdate = disdate;
	}

	public String getlabname() {
		return labname;
	}

	public void setlabname(String labname) {
		this.labname = labname;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getTestname() {
		return testname;
	}

	public void setTestname(String testname) {
		this.testname = testname;
	}

	@Transient
	private String trtId;
	@Transient
	private String labreqId;
	@Transient
	private String labId;
	@Transient
	private String testrate;

	public String getTestrate() {
		return testrate;
	}

	public void setTestrate(String testrate) {
		this.testrate = testrate;
	}

	public String getTrtId() {
		return trtId;
	}

	public void setTrtId(String trtId) {
		this.trtId = trtId;
	}

	public String getLabreqId() {
		return labreqId;
	}

	public void setLabreqId(String labreqId) {
		this.labreqId = labreqId;
	}

	public String getLabId() {
		return labId;
	}

	public void setLabId(String labId) {
		this.labId = labId;
	}
	
	
	private Double testcharges;


	public Double getTestcharges() {
		return testcharges;
	}

	public void setTestcharges(Double testcharges) {
		this.testcharges = testcharges;
	}
}
