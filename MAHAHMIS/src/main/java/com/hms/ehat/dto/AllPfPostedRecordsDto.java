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

import org.hibernate.annotations.Immutable;

@Entity
@Immutable
@Table(name = "ehat_view_all_pf_posted_records")
public class AllPfPostedRecordsDto {

	@Id
	@GeneratedValue
	@Column(name = "patient_id")
	private Integer patientId;
	
	@Column(name = "bill_id")
	private Integer billId;
	
	@Column(name = "doctor_id")
	private Integer doctorId;
	
	@Column(name = "department_id")
	private Integer departmentId;
	
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "unit_id")
	private Integer unitId;
	
	@Column(name = "ref_dr_id")
	private Integer refDrId;
	
	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "source_type_id")
	private Integer sourceTypeId;
	
	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId;
	
	@Column(name = "pfVoucherId")
	private Integer pfVoucherId;
	
	@Column(name = "ref_dr_amount")
	private Double refDrAmount;
	
	@Column(name = "ref_dr_percent")
	private Double refDrPercent;
	
	@Column(name = "amount")
	private Double amount;
	
	@Column(name = "concession")
	private Double concession;
	
	@Column(name = "discount")
	private Double discount;
	
	@Column(name = "refund")
	private Double refund;
	
	@Column(name = "refund_per")
	private Double refund_per;
	
	@Column(name = "actHospAmount")
	private Double actHospAmount;
	
	@Column(name = "hospAmount")
	private Double hospAmount;
	
	@Column(name = "pfAmount")
	private Double pfAmount;
	
	@Column(name = "pfPaid")
	private Double pfPaid;
	
	@Column(name = "pfUnpaid")
	private Double pfUnpaid;
	
	@Column(name = "pfReduction")
	private Double pfReduction;
	
	@Column(name = "pfAddition")
	private Double pfAddition;
	
	@Column(name = "pfVoucherFlag")
	private String pfVoucherFlag;
	
	@Column(name = "advance_flag")
	private String advanceFlag;
	
	@Column(name = "deleted")
	private String deleted;
	
	@Column(name = "doctor_name")
	private String doctorName;
	
	@Column(name = "dept_name")
	private String deptName;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;
	
	@Transient
	private List<AllPfPostedRecordsDto> listAllPfRecords;

	//----------Setter getter starts---------------------------------------------------------------
	
	public Integer getPatientId() {
		return patientId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public Integer getBillId() {
		return billId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public Integer getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Integer doctorId) {
		this.doctorId = doctorId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Integer getRefDrId() {
		return refDrId;
	}

	public void setRefDrId(Integer refDrId) {
		this.refDrId = refDrId;
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

	public Integer getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(Integer sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public Integer getPfVoucherId() {
		return pfVoucherId;
	}

	public void setPfVoucherId(Integer pfVoucherId) {
		this.pfVoucherId = pfVoucherId;
	}

	public Double getRefDrAmount() {
		return refDrAmount;
	}

	public void setRefDrAmount(Double refDrAmount) {
		this.refDrAmount = refDrAmount;
	}

	public Double getRefDrPercent() {
		return refDrPercent;
	}

	public void setRefDrPercent(Double refDrPercent) {
		this.refDrPercent = refDrPercent;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getConcession() {
		return concession;
	}

	public void setConcession(Double concession) {
		this.concession = concession;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	public Double getRefund() {
		return refund;
	}

	public void setRefund(Double refund) {
		this.refund = refund;
	}

	public Double getRefund_per() {
		return refund_per;
	}

	public void setRefund_per(Double refund_per) {
		this.refund_per = refund_per;
	}

	public Double getActHospAmount() {
		return actHospAmount;
	}

	public void setActHospAmount(Double actHospAmount) {
		this.actHospAmount = actHospAmount;
	}

	public Double getHospAmount() {
		return hospAmount;
	}

	public void setHospAmount(Double hospAmount) {
		this.hospAmount = hospAmount;
	}

	public Double getPfAmount() {
		return pfAmount;
	}

	public void setPfAmount(Double pfAmount) {
		this.pfAmount = pfAmount;
	}

	public Double getPfPaid() {
		return pfPaid;
	}

	public void setPfPaid(Double pfPaid) {
		this.pfPaid = pfPaid;
	}

	public Double getPfUnpaid() {
		return pfUnpaid;
	}

	public void setPfUnpaid(Double pfUnpaid) {
		this.pfUnpaid = pfUnpaid;
	}

	public Double getPfReduction() {
		return pfReduction;
	}

	public void setPfReduction(Double pfReduction) {
		this.pfReduction = pfReduction;
	}

	public Double getPfAddition() {
		return pfAddition;
	}

	public void setPfAddition(Double pfAddition) {
		this.pfAddition = pfAddition;
	}

	public String getPfVoucherFlag() {
		return pfVoucherFlag;
	}

	public void setPfVoucherFlag(String pfVoucherFlag) {
		this.pfVoucherFlag = pfVoucherFlag;
	}

	public String getAdvanceFlag() {
		return advanceFlag;
	}

	public void setAdvanceFlag(String advanceFlag) {
		this.advanceFlag = advanceFlag;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public List<AllPfPostedRecordsDto> getListAllPfRecords() {
		return listAllPfRecords;
	}

	public void setListAllPfRecords(List<AllPfPostedRecordsDto> listAllPfRecords) {
		this.listAllPfRecords = listAllPfRecords;
	}

	public String getDoctorName() {
		return doctorName;
	}

	public void setDoctorName(String doctorName) {
		this.doctorName = doctorName;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}	
	
	
}
