
package com.hms.ehat.dto;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
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
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
@Component
@Entity
@Table(name = "ehat_treatment")
public class TreatmentDto implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "treatment_id")
	private Integer treatmentId;

	// @Column(name = "patient_id")
	@Transient
	private int patientId;

	@Column(name = "department_id")
	private int departmentId;

	@Column(name = "doctor_id")
	private String doctorIdList;

	@Column(name = "center_patient_id")
	private String centerPatientId;

	@Column(name = "token", columnDefinition = "int default 0")
	private int token = 0;

	@Column(name = "t_flag", columnDefinition = "varchar(2) default 'N'")
	private String tFlag = "N";

	@Column(name = "unit_id", columnDefinition = "int default 0")
	private int unitId = 0;

	@Column(name = "deleted", columnDefinition = "varchar(2) default 'N'")
	private String deleted = "N";

	@Column(name = "ref_doc_id")
	private int refDocId = 0;
	
	@Column(name = "ref_doc_name")
	private String refDocName;

	@Column(name = "case_type", columnDefinition = "int default 1")
	private int caseType = 1;

	@Column(name = "weight", columnDefinition = "double default 0")
	private double weight;

	@Column(name = "height", columnDefinition = "double default 0")
	private double height;
	
	@Column(name = "m_height", columnDefinition = "double default 0")
	private double mheight;

	@Column(name = "f_height", columnDefinition = "double default 0")
	private double fheight;

	

	

	@Column(name = "notes", columnDefinition = "text default ''")
	private String notes = "";
	@Column(name = "empid", columnDefinition = "varchar(255) default '-'")
	private String empid;

	@Column(name = "count")
	private int count = 1;

	@Column(name = "trcount")
	private String trcount = "0";

	@Column(name = "opdipdno")
	private String opdipdno = "0";

	@Column(name = "tpaid", columnDefinition = "varchar(255) default '-'")
	private String tpaid = "-";

	@JsonProperty("BMI")
	@Column(name = "BMI", columnDefinition = "double default 0")
	private double BMI = 0;

	@JsonProperty("BSA")
	@Column(name = "BSA", columnDefinition = "double default 0")
	private double BSA = 0;

	@JsonProperty("HCIM")
	@Column(name = "HCIM", columnDefinition = "double default 0")
	private double HCIM = 0;

	@JsonProperty("TARGET_HEIGHT")
	@Column(name = "target_height", columnDefinition = "double default 0")
	private double TARGET_HEIGHT=0;
	
	@Column(name = "cancel_narration")
	private String cancelNarration = "-";

	@Column(name = "adm_cancel_flag")
	private String admCancelFlag = "N";
	
	@Column(name = "ivf_pay_flag",columnDefinition="varchar(2) default 'N'")
	private String ivfPayFlag="N";
	
	@Column(name = "narration",columnDefinition="varchar(100) default 'N'")
	private String narration;
	
	@Transient
	private Integer ivfTreatID;

	public Integer getIvfTreatID() {
		return ivfTreatID;
	}

	public void setIvfTreatID(Integer ivfTreatID) {
		this.ivfTreatID = ivfTreatID;
	}

	/*
	 * @Column(name = "tokencount") private int tokencount=1;
	 */
	@Column(name = "tokenno")
	private String tokenno = "0";

	@Column(name = "reqGenFormId")
	private int reqGenFormId = 0;

	@Column(name = "referred_by")
	private String referredBy;

	@Column(name = "referred_source")
	private Integer referredSource = 0;

	@Column(name = "referred_source_slave")
	private String referredSourceSlave;

	@Column(name = "referred_source_docId")
	private Integer referredSourceDocId = 0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "ref_date")
	private Date refDate;
	
	@Column(name = "charges_slave_id",columnDefinition="int default 0")
	private Integer sponsorId;

	@Column(name = "saction_ord_no", columnDefinition = "varchar(100) default '0'")
	private String sactionOrdNo = "0";

	@Column(name = "sanction_amt", columnDefinition = "double default 0")
	private double sanctionAmt = 0;

	@Column(name = "neis_no", columnDefinition = "varchar(100) default '0'")
	private String neisNo = "0";

	@Column(name = "visit_no", columnDefinition = "varchar(100) default '0'")
	private String visitNo = "0";

	@Column(name = "ipd_or_opd", columnDefinition = "varchar(100) default '-'")
	private String ipdOrOpd = "-";

	@Column(name = "treat_permited", columnDefinition = "TEXT default NULL")
	private String treatPermited = "-";

	@Column(name = "dise_to_be_treat", columnDefinition = "TEXT default NULL")
	private String diseToBeTreat = "-";

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "valid_upto_date")
	private Date validUpToDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "admsn_can_date_time")
	private Date admissionCanDateTime;

	@Column(name = "admsn_canceled_by")
	private Integer admissionCanceledBy;

	@Column(name = "admission_date_time")
	private String admissionDateTime;
	
	@Column(name = "reason_of_visit", columnDefinition = "int default 0")
	private int reasonofvisit = 0;
	
	@Column(name = "ivf_treat_flag",columnDefinition="varchar(2) default 'N'")
	private String ivfTreatFlag="N";

	@Transient
	private String patientName = "";

	@Transient
	private String mobile = "";

	@Transient
	private String userName = "";

	@Temporal(TemporalType.DATE)
	@Transient
	private Date cancelDate;

	@Temporal(TemporalType.TIME)
	@Transient
	private Date cancelTime;
	
	// Added By Pooja
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "phy_date_time")
	private Date phyDateTime;

	@Column(name = "phydis_flag")
	private String phyDisFlag = "N";
	
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "Treat_end_date")
	private Date TreatendDate;
	
	
	@Column(name = "patient_outtime")
	private String  outtime;
	
	@Column(name = "casuality_flag")
	private String casualityFlag = "N";
	
	@Column(name = "organ_donar_flag")
	private String organDonarFlag = "N";
	
	@Column(name = "speciality_id")
	private String specialityId;
	
	// for doctor desk emr high risk
	@Column(name = "emr_high_risk")
	private Integer emrHighrisk = 0;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@CreationTimestamp
	@Column(name = "created_date_time", updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@UpdateTimestamp
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Column(name = "emergency_flag",columnDefinition="varchar(2) default 'N'")
	private String emergencyFlag="N";//added by dayanand(3-8-2020)
	
	@Column(name = "business_type",columnDefinition="int default 2")
	private Integer businessType=2;
	
	@Column(name = "customer_type",columnDefinition="int default 0")
	private Integer customerType=0;
	
	@Column(name = "customer_id",columnDefinition="int default 0")
	private Integer customerId=0;
	
	@Column(name = "collection_date")
	private String collectionDate;
	
	@Column(name = "collection_time")
	private String collectionTime;
	
	@Column(name = "registered_at", columnDefinition="varchar(15) default 'other'")
	private String registeredAt="other";
	
	@Column(name = "appointment_id",columnDefinition="int default 0")
	private int appointmentId=0;

	@Transient
	private List<TreatmentDto> listTreatment;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "treatment_id", nullable=false)
	private List<BillMasterDto> listBill;
	
	//Added By Badrinath
	@Transient
	private Integer invoiceCount;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "treatment_id", nullable=false)
	private List<PaymentResponsibleDto> listPayRes;

	@JsonIgnore
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "treatment_id", nullable=false)
	private List<MlcDetailsDto> listMlcDetails;

	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "treatment_id", nullable=false)
	private List<MultipleSponsorDto> listMultipleSponsor;
	
	@Column(name = "free_follow_up_count",columnDefinition="int default 0")
	private int freeFollowUpCount=0;

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public String getDoctorIdList() {
		return doctorIdList;
	}

	public void setDoctorIdList(String doctorIdList) {
		this.doctorIdList = doctorIdList;
	}

	public String getCenterPatientId() {
		return centerPatientId;
	}

	public void setCenterPatientId(String centerPatientId) {
		this.centerPatientId = centerPatientId;
	}

	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
	}

	public String gettFlag() {
		return tFlag;
	}

	public void settFlag(String tFlag) {
		this.tFlag = tFlag;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public int getRefDocId() {
		return refDocId;
	}

	public void setRefDocId(int refDocId) {
		this.refDocId = refDocId;
	}

	public String getRefDocName() {
		return refDocName;
	}

	public void setRefDocName(String refDocName) {
		this.refDocName = refDocName;
	}

	public int getCaseType() {
		return caseType;
	}

	public void setCaseType(int caseType) {
		this.caseType = caseType;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getEmpid() {
		return empid;
	}

	public void setEmpid(String empid) {
		this.empid = empid;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getTrcount() {
		return trcount;
	}

	public void setTrcount(String trcount) {
		this.trcount = trcount;
	}

	public String getOpdipdno() {
		return opdipdno;
	}

	public void setOpdipdno(String opdipdno) {
		this.opdipdno = opdipdno;
	}

	public String getTpaid() {
		return tpaid;
	}

	public void setTpaid(String tpaid) {
		this.tpaid = tpaid;
	}

	@JsonProperty("BMI")
	public double getBMI() {
		return BMI;
	}

	//@JsonIgnore
	public void setBMI(double bMI) {
		BMI = bMI;
	}

	@JsonProperty("BSA")
	public double getBSA() {
		return BSA;
	}

	//@JsonIgnore
	public void setBSA(double bSA) {
		BSA = bSA;
	}

	@JsonProperty("HCIM")
	public double getHCIM() {
		return HCIM;
	}

	//@JsonIgnore
	public void setHCIM(double hCIM) {
		HCIM = hCIM;
	}
	
	@JsonProperty("TARGET_HEIGHT")
	public double getTARGET_HEIGHT() {
		return TARGET_HEIGHT;
	}
	public void setTARGET_HEIGHT(double tARGET_HEIGHT) {
		this.TARGET_HEIGHT = tARGET_HEIGHT;
	}

	public String getCancelNarration() {
		return cancelNarration;
	}

	public void setCancelNarration(String cancelNarration) {
		this.cancelNarration = cancelNarration;
	}

	public String getAdmCancelFlag() {
		return admCancelFlag;
	}

	public void setAdmCancelFlag(String admCancelFlag) {
		this.admCancelFlag = admCancelFlag;
	}

	public String getTokenno() {
		return tokenno;
	}

	public void setTokenno(String tokenno) {
		this.tokenno = tokenno;
	}

	public int getReqGenFormId() {
		return reqGenFormId;
	}

	public void setReqGenFormId(int reqGenFormId) {
		this.reqGenFormId = reqGenFormId;
	}

	public String getReferredBy() {
		return referredBy;
	}

	public void setReferredBy(String referredBy) {
		this.referredBy = referredBy;
	}

	public Integer getReferredSource() {
		return referredSource;
	}

	public void setReferredSource(Integer referredSource) {
		this.referredSource = referredSource;
	}

	public String getReferredSourceSlave() {
		return referredSourceSlave;
	}

	public void setReferredSourceSlave(String referredSourceSlave) {
		this.referredSourceSlave = referredSourceSlave;
	}

	public Integer getReferredSourceDocId() {
		return referredSourceDocId;
	}

	public void setReferredSourceDocId(Integer referredSourceDocId) {
		this.referredSourceDocId = referredSourceDocId;
	}

	public Date getRefDate() {
		return refDate;
	}

	public void setRefDate(Date refDate) {
		this.refDate = refDate;
	}

	public Integer getSponsorId() {
		return sponsorId;
	}

	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}

	public String getSactionOrdNo() {
		return sactionOrdNo;
	}

	public void setSactionOrdNo(String sactionOrdNo) {
		this.sactionOrdNo = sactionOrdNo;
	}

	public double getSanctionAmt() {
		return sanctionAmt;
	}

	public void setSanctionAmt(double sanctionAmt) {
		this.sanctionAmt = sanctionAmt;
	}

	public String getNeisNo() {
		return neisNo;
	}

	public void setNeisNo(String neisNo) {
		this.neisNo = neisNo;
	}

	public String getVisitNo() {
		return visitNo;
	}

	public void setVisitNo(String visitNo) {
		this.visitNo = visitNo;
	}

	public String getIpdOrOpd() {
		return ipdOrOpd;
	}

	public void setIpdOrOpd(String ipdOrOpd) {
		this.ipdOrOpd = ipdOrOpd;
	}

	public String getTreatPermited() {
		return treatPermited;
	}

	public void setTreatPermited(String treatPermited) {
		this.treatPermited = treatPermited;
	}

	public String getDiseToBeTreat() {
		return diseToBeTreat;
	}

	public void setDiseToBeTreat(String diseToBeTreat) {
		this.diseToBeTreat = diseToBeTreat;
	}

	public Date getValidUpToDate() {
		return validUpToDate;
	}

	public void setValidUpToDate(Date validUpToDate) {
		this.validUpToDate = validUpToDate;
	}

	public Date getAdmissionCanDateTime() {
		return admissionCanDateTime;
	}

	public void setAdmissionCanDateTime(Date admissionCanDateTime) {
		this.admissionCanDateTime = admissionCanDateTime;
	}

	public Integer getAdmissionCanceledBy() {
		return admissionCanceledBy;
	}

	public void setAdmissionCanceledBy(Integer admissionCanceledBy) {
		this.admissionCanceledBy = admissionCanceledBy;
	}

	public String getAdmissionDateTime() {
		return admissionDateTime;
	}

	public void setAdmissionDateTime(String admissionDateTime) {
		this.admissionDateTime = admissionDateTime;
	}

	public int getReasonofvisit() {
		return reasonofvisit;
	}

	public void setReasonofvisit(int reasonofvisit) {
		this.reasonofvisit = reasonofvisit;
	}

	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Date getCancelDate() {
		return cancelDate;
	}

	public void setCancelDate(Date cancelDate) {
		this.cancelDate = cancelDate;
	}

	public Date getCancelTime() {
		return cancelTime;
	}

	public void setCancelTime(Date cancelTime) {
		this.cancelTime = cancelTime;
	}

	public Date getPhyDateTime() {
		return phyDateTime;
	}

	public void setPhyDateTime(Date phyDateTime) {
		this.phyDateTime = phyDateTime;
	}

	public String getPhyDisFlag() {
		return phyDisFlag;
	}

	public void setPhyDisFlag(String phyDisFlag) {
		this.phyDisFlag = phyDisFlag;
	}
	

	public Date getTreatendDate() {
		return TreatendDate;
	}

	public String getOuttime() {
		return outtime;
	}

	public void setTreatendDate(Date treatendDate) {
		TreatendDate = treatendDate;
	}

	public void setOuttime(String outtime) {
		this.outtime = outtime;
	}

	public String getCasualityFlag() {
		return casualityFlag;
	}

	public void setCasualityFlag(String casualityFlag) {
		this.casualityFlag = casualityFlag;
	}

	public String getOrganDonarFlag() {
		return organDonarFlag;
	}

	public void setOrganDonarFlag(String organDonarFlag) {
		this.organDonarFlag = organDonarFlag;
	}

	public String getSpecialityId() {
		return specialityId;
	}

	public void setSpecialityId(String specialityId) {
		this.specialityId = specialityId;
	}

	public Integer getEmrHighrisk() {
		return emrHighrisk;
	}

	public void setEmrHighrisk(Integer emrHighrisk) {
		this.emrHighrisk = emrHighrisk;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public List<TreatmentDto> getListTreatment() {
		return listTreatment;
	}

	public void setListTreatment(List<TreatmentDto> listTreatment) {
		this.listTreatment = listTreatment;
	}

	public List<BillMasterDto> getListBill() {
		return listBill;
	}

	public void setListBill(List<BillMasterDto> listBill) {
		this.listBill = listBill;
	}

	public List<PaymentResponsibleDto> getListPayRes() {
		return listPayRes;
	}

	public void setListPayRes(List<PaymentResponsibleDto> listPayRes) {
		this.listPayRes = listPayRes;
	}

	public List<MlcDetailsDto> getListMlcDetails() {
		return listMlcDetails;
	}

	public void setListMlcDetails(List<MlcDetailsDto> listMlcDetails) {
		this.listMlcDetails = listMlcDetails;
	}

	public List<MultipleSponsorDto> getListMultipleSponsor() {
		return listMultipleSponsor;
	}

	public void setListMultipleSponsor(List<MultipleSponsorDto> listMultipleSponsor) {
		this.listMultipleSponsor = listMultipleSponsor;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getEmergencyFlag() {
		return emergencyFlag;
	}

	public void setEmergencyFlag(String emergencyFlag) {
		this.emergencyFlag = emergencyFlag;
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

	public String getRegisteredAt() {
		return registeredAt;
	}

	public void setRegisteredAt(String registeredAt) {
		this.registeredAt = registeredAt;
	}

	public int getAppointmentId() {
		return appointmentId;
	}

	public void setAppointmentId(int appointmentId) {
		this.appointmentId = appointmentId;
	}

	public String getIvfTreatFlag() {
		return ivfTreatFlag;
	}

	public void setIvfTreatFlag(String ivfTreatFlag) {
		this.ivfTreatFlag = ivfTreatFlag;
	}

	public String getIvfPayFlag() {
		return ivfPayFlag;
	}

	public void setIvfPayFlag(String ivfPayFlag) {
		this.ivfPayFlag = ivfPayFlag;
	}

	public double getMheight() {
		return mheight;
	}

	public void setMheight(double mheight) {
		this.mheight = mheight;
	}

	public double getFheight() {
		return fheight;
	}

	public void setFheight(double fheight) {
		this.fheight = fheight;
	}

	public String getNarration() {
		return narration;
	}

	public void setNarration(String narration) {
		this.narration = narration;
	}
	
	

	public Integer getInvoiceCount() {
		return invoiceCount;
	}

	public void setInvoiceCount(Integer invoiceCount) {
		this.invoiceCount = invoiceCount;
	}

	public int getFreeFollowUpCount() {
		return freeFollowUpCount;
	}

	public void setFreeFollowUpCount(int freeFollowUpCount) {
		this.freeFollowUpCount = freeFollowUpCount;
	}

	@Override
	public String toString() {
		return "TreatmentDto [treatmentId=" + treatmentId + ", patientId=" + patientId + ", departmentId="
				+ departmentId + ", doctorIdList=" + doctorIdList + ", centerPatientId=" + centerPatientId + ", token="
				+ token + ", tFlag=" + tFlag + ", unitId=" + unitId + ", deleted=" + deleted + ", refDocId=" + refDocId
				+ ", refDocName=" + refDocName + ", caseType=" + caseType + ", weight=" + weight + ", height=" + height
				+ ", mheight=" + mheight + ", fheight=" + fheight + ", notes=" + notes + ", empid=" + empid + ", count="
				+ count + ", trcount=" + trcount + ", opdipdno=" + opdipdno + ", tpaid=" + tpaid + ", BMI=" + BMI
				+ ", BSA=" + BSA + ", HCIM=" + HCIM + ", TARGET_HEIGHT=" + TARGET_HEIGHT + ", cancelNarration="
				+ cancelNarration + ", admCancelFlag=" + admCancelFlag + ", ivfPayFlag=" + ivfPayFlag + ", narration="
				+ narration + ", ivfTreatID=" + ivfTreatID + ", tokenno=" + tokenno + ", reqGenFormId=" + reqGenFormId
				+ ", referredBy=" + referredBy + ", referredSource=" + referredSource + ", referredSourceSlave="
				+ referredSourceSlave + ", referredSourceDocId=" + referredSourceDocId + ", refDate=" + refDate
				+ ", sponsorId=" + sponsorId + ", sactionOrdNo=" + sactionOrdNo + ", sanctionAmt=" + sanctionAmt
				+ ", neisNo=" + neisNo + ", visitNo=" + visitNo + ", ipdOrOpd=" + ipdOrOpd + ", treatPermited="
				+ treatPermited + ", diseToBeTreat=" + diseToBeTreat + ", validUpToDate=" + validUpToDate
				+ ", admissionCanDateTime=" + admissionCanDateTime + ", admissionCanceledBy=" + admissionCanceledBy
				+ ", admissionDateTime=" + admissionDateTime + ", reasonofvisit=" + reasonofvisit + ", ivfTreatFlag="
				+ ivfTreatFlag + ", patientName=" + patientName + ", mobile=" + mobile + ", userName=" + userName
				+ ", cancelDate=" + cancelDate + ", cancelTime=" + cancelTime + ", phyDateTime=" + phyDateTime
				+ ", phyDisFlag=" + phyDisFlag + ", TreatendDate=" + TreatendDate + ", outtime=" + outtime
				+ ", casualityFlag=" + casualityFlag + ", organDonarFlag=" + organDonarFlag + ", specialityId="
				+ specialityId + ", emrHighrisk=" + emrHighrisk + ", createdBy=" + createdBy + ", createdDateTime="
				+ createdDateTime + ", updatedBy=" + updatedBy + ", updatedDateTime=" + updatedDateTime + ", deletedBy="
				+ deletedBy + ", deletedDateTime=" + deletedDateTime + ", emergencyFlag=" + emergencyFlag
				+ ", businessType=" + businessType + ", customerType=" + customerType + ", customerId=" + customerId
				+ ", collectionDate=" + collectionDate + ", collectionTime=" + collectionTime + ", registeredAt="
				+ registeredAt + ", appointmentId=" + appointmentId + ", listTreatment=" + listTreatment + ", listBill="
				+ listBill + ", invoiceCount=" + invoiceCount + ", listPayRes=" + listPayRes + ", listMlcDetails="
				+ listMlcDetails + ", listMultipleSponsor=" + listMultipleSponsor + ", freeFollowUpCount="
				+ freeFollowUpCount + "]";
	}

	@Transient
	private int monthlycount;
	
	@Transient
	private int progressivecount;
	
	@Transient
	private int deptMonthCountplastic;
	@Transient
	private int deptPrgCountPlastic;

	@Transient
	private int deptMonthCountPaediatric ;
	@Transient
	private int deptPrgCountPaediatric;
	
	@Transient
	private int deptMonthCountNCD ;
	@Transient
	private int deptPrgCountNCD;
	@Transient
	private int deptMonthUrology;
	@Transient
	private int deptPrgCountUrology;
	
	@Transient
	private int lithomonthCount;
	@Transient
	private int lithoprogcount;

	public int getMonthlycount() {
		return monthlycount;
	}

	public void setMonthlycount(int monthlycount) {
		this.monthlycount = monthlycount;
	}

	public int getProgressivecount() {
		return progressivecount;
	}

	public void setProgressivecount(int progressivecount) {
		this.progressivecount = progressivecount;
	}

	public int getDeptMonthCountplastic() {
		return deptMonthCountplastic;
	}

	public void setDeptMonthCountplastic(int deptMonthCountplastic) {
		this.deptMonthCountplastic = deptMonthCountplastic;
	}

	public int getDeptPrgCountPlastic() {
		return deptPrgCountPlastic;
	}

	public void setDeptPrgCountPlastic(int deptPrgCountPlastic) {
		this.deptPrgCountPlastic = deptPrgCountPlastic;
	}

	public int getDeptMonthCountPaediatric() {
		return deptMonthCountPaediatric;
	}

	public void setDeptMonthCountPaediatric(int deptMonthCountPaediatric) {
		this.deptMonthCountPaediatric = deptMonthCountPaediatric;
	}

	public int getDeptPrgCountPaediatric() {
		return deptPrgCountPaediatric;
	}

	public void setDeptPrgCountPaediatric(int deptPrgCountPaediatric) {
		this.deptPrgCountPaediatric = deptPrgCountPaediatric;
	}

	public int getDeptMonthCountNCD() {
		return deptMonthCountNCD;
	}

	public void setDeptMonthCountNCD(int deptMonthCountNCD) {
		this.deptMonthCountNCD = deptMonthCountNCD;
	}

	public int getDeptPrgCountNCD() {
		return deptPrgCountNCD;
	}

	public void setDeptPrgCountNCD(int deptPrgCountNCD) {
		this.deptPrgCountNCD = deptPrgCountNCD;
	}

	public int getDeptMonthUrology() {
		return deptMonthUrology;
	}

	public void setDeptMonthUrology(int deptMonthUrology) {
		this.deptMonthUrology = deptMonthUrology;
	}

	public int getDeptPrgCountUrology() {
		return deptPrgCountUrology;
	}

	public void setDeptPrgCountUrology(int deptPrgCountUrology) {
		this.deptPrgCountUrology = deptPrgCountUrology;
	}

	public int getLithomonthCount() {
		return lithomonthCount;
	}

	public void setLithomonthCount(int lithomonthCount) {
		this.lithomonthCount = lithomonthCount;
	}

	public int getLithoprogcount() {
		return lithoprogcount;
	}

	public void setLithoprogcount(int lithoprogcount) {
		this.lithoprogcount = lithoprogcount;
	}
	
	
	
}

