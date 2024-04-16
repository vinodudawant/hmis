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
@Table(name = "ehat_profees_details")
public class ProfessionalFeesDto {

	@Id
	@GeneratedValue
	@Column(name = "profees_id")
	private int profeesId;
	
	@Column(name = "unit_id")
	private int unitId;
	
	@Column(name = "dept_id")
	private int deptId;
	
	@Column(name = "doctor_id")
	private int doctorId;
	
	@Column(name = "service_id")
	private int serviceId;
	
	@Column(name = "subService_id")
	private int subServiceId;
	
	@Column(name = "treatment_id")
	private int treatmentId;
	
	@Column(name = "patient_id")
	private int patientId;
	
	@Column(name = "bill_receipt_master_id")
	private int billReceiptMasterId;
	
	@Column(name = "bill_receipt_slave_id")
	private int billReceiptSlaveId;
	
	@Column(name = "ref_dr_id")
	private int refDrId;
	
	@Column(name = "ref_dr_percent")
	private double refDrPercent;
	
	@Column(name = "ref_dr_amount")
	private double refDrAmount;
	
	@Column(name = "rate",columnDefinition="double default 0")
	private double rate;
	
	@Column(name = "quantity",columnDefinition="double default 1")
	private double quantity;
	
	@Column(name = "concession",columnDefinition="double default 0")
	private double concession;
	
	@Column(name = "discount",columnDefinition="double default 0")
	private double discount;
	
	@Column(name = "reduction",columnDefinition="double default 0")
	private double reduction;
	
	@Column(name = "amount",columnDefinition="double default 1")
	private double amount;
	
	@Column(name = "hosp_percent",columnDefinition="double default 0")
	private double hospPercent;
	
	@Column(name = "hosp_percent_in_amount",columnDefinition="double default 0")
	private double hospPercentInAmount;
	
	@Column(name = "pf_amount",columnDefinition="double default 0")
	private double pfAmount;
	
	@Column(name = "pf_paid",columnDefinition="double default 0")
	private double pfPaid;
	
	@Column(name = "pf_unpaid",columnDefinition="double default 0")
	private double pfUnpaid;
	
	@Column(name = "pf_paid_status",columnDefinition="varchar(55) default 'unpaid'")
	private String pfPaidStatus;
	
	@Column(name = "advance_flag",columnDefinition="double default 0")
	private double advanceFlag;
	
	@Column(name = "voucher_generated",columnDefinition="varchar(2) default 'N'")
	private String voucherGenerated;
	
	@Column(name = "component_name")
	private String componentName;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "service_assign_date",updatable=false)
	private Date serviceAssignDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private List<ProfessionalFeesDto> listProFees;

	//setters and getters started
	
	public int getProfeesId() {
		return profeesId;
	}

	public void setProfeesId(int profeesId) {
		this.profeesId = profeesId;
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

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
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

	public int getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(int treatmentId) {
		this.treatmentId = treatmentId;
	}

	public int getPatientId() {
		return patientId;
	}

	public void setPatientId(int patientId) {
		this.patientId = patientId;
	}

	public int getBillReceiptMasterId() {
		return billReceiptMasterId;
	}

	public void setBillReceiptMasterId(int billReceiptMasterId) {
		this.billReceiptMasterId = billReceiptMasterId;
	}

	public int getBillReceiptSlaveId() {
		return billReceiptSlaveId;
	}

	public void setBillReceiptSlaveId(int billReceiptSlaveId) {
		this.billReceiptSlaveId = billReceiptSlaveId;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public double getConcession() {
		return concession;
	}

	public void setConcession(double concession) {
		this.concession = concession;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getHospPercent() {
		return hospPercent;
	}

	public void setHospPercent(double hospPercent) {
		this.hospPercent = hospPercent;
	}

	public double getHospPercentInAmount() {
		return hospPercentInAmount;
	}

	public void setHospPercentInAmount(double hospPercentInAmount) {
		this.hospPercentInAmount = hospPercentInAmount;
	}

	public double getPfAmount() {
		return pfAmount;
	}

	public void setPfAmount(double pfAmount) {
		this.pfAmount = pfAmount;
	}

	public double getPfPaid() {
		return pfPaid;
	}

	public void setPfPaid(double pfPaid) {
		this.pfPaid = pfPaid;
	}

	public double getPfUnpaid() {
		return pfUnpaid;
	}

	public void setPfUnpaid(double pfUnpaid) {
		this.pfUnpaid = pfUnpaid;
	}

	public String getPfPaidStatus() {
		return pfPaidStatus;
	}

	public void setPfPaidStatus(String pfPaidStatus) {
		this.pfPaidStatus = pfPaidStatus;
	}

	public double getAdvanceFlag() {
		return advanceFlag;
	}

	public void setAdvanceFlag(double advanceFlag) {
		this.advanceFlag = advanceFlag;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
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

	public List<ProfessionalFeesDto> getListProFees() {
		return listProFees;
	}

	public void setListProFees(List<ProfessionalFeesDto> listProFees) {
		this.listProFees = listProFees;
	}

	public int getRefDrId() {
		return refDrId;
	}

	public void setRefDrId(int refDrId) {
		this.refDrId = refDrId;
	}

	public double getRefDrPercent() {
		return refDrPercent;
	}

	public void setRefDrPercent(double refDrPercent) {
		this.refDrPercent = refDrPercent;
	}

	public double getRefDrAmount() {
		return refDrAmount;
	}

	public void setRefDrAmount(double refDrAmount) {
		this.refDrAmount = refDrAmount;
	}

	public Date getServiceAssignDate() {
		return serviceAssignDate;
	}

	public void setServiceAssignDate(Date serviceAssignDate) {
		this.serviceAssignDate = serviceAssignDate;
	}

	public String getVoucherGenerated() {
		return voucherGenerated;
	}

	public void setVoucherGenerated(String voucherGenerated) {
		this.voucherGenerated = voucherGenerated;
	}

	public double getReduction() {
		return reduction;
	}

	public void setReduction(double reduction) {
		this.reduction = reduction;
	}
	
	
	public String getComponentName() {
		return componentName;
	}

	public void setComponentName(String componentName) {
		this.componentName = componentName;
	}


	@Transient
	private String patientName;
	
	@Transient
	private String doctorName;
	
	@Transient
	private String unitName;
	@Transient
	private String deptName;
	@Transient
	private String serviceName;
	
	@Transient
	private int caseType;
	
	public String getPatientName() {
		return patientName;
	}

	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public int getCaseType() {
		return caseType;
	}

	public void setCaseType(int caseType) {
		this.caseType = caseType;
	}

}
