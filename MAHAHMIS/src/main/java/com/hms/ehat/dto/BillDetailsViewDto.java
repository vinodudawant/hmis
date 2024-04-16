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
@Table(name = "ehat_bill_details_view")
public class BillDetailsViewDto {

	@Id
	@Column(name = "bill_details_id")
	private int billDetailsId;

	@Column(name = "clinical_notes")
	private String clinicalnotes = "-";

	@Column(name = "amount")
	private double amount = 0;

	@Column(name = "bill_id")
	private int billId = 0;

	@Column(name = "co_pay")
	private double coPay = 0;

	@Column(name = "concession")
	private double concession = 0;

	@Column(name = "created_by", updatable = false)
	private int createdBy = 0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time")
	private Date createdDateTime;

	@Column(name = "deleted")
	private String deleted = "N";

	@Column(name = "deleted_by")
	private int deletedBy = 0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;

	@Column(name = "department_id")
	private int departmentId = 0;

	@Column(name = "discount")
	private double discount = 0;

	@Column(name = "doctor_id")
	private int doctorId = 0;

	@Column(name = "instructions")
	private String instructions = "-";

	@Column(name = "patient_cat_id")
	private int patientCatId = 0;

	@Column(name = "patient_id")
	private int patienttId = 0;

	@Column(name = "pay")
	private double pay = 0;

	@Column(name = "quantity")
	private double quantity = 1;

	@Column(name = "rate")
	private double rate = 0;

	@Column(name = "service_id")
	private int serviceId = 0;

	@Column(name = "source_type_id")
	private int sourceTypeId = 0;

	@Column(name = "sponsor_cat_id")
	private int sponsorCatId = 0;

	@Column(name = "sub_service_id")
	private int subServiceId = 0;

	@Column(name = "treatment_id")
	private int treatmentId = 0;

	@Column(name = "unit_id")
	private int unitId = 1;

	@Column(name = "updated_by")
	private int updatedBy = 0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "urgentflag")
	private String urgentFlag = "N";

	@Column(name = "cancle")
	private String cancle = "N";

	@Column(name = "paid_flag")
	private String paidFlag = "N";

	@Column(name = "charges_slave_id")
	private int chargesSlaveId;

	@Column(name = "other_amount")
	private double otherAmount = 0;

	@Column(name = "other_co_pay")
	private double otherCoPay = 0;

	@Column(name = "other_concession")
	private double otherConcession = 0;

	@Column(name = "other_pay")
	private double otherPay = 0;

	@Column(name = "other_rate")
	private double otherRate = 0;

	@Column(name = "sponsor_id")
	private Integer sponsorId;

	@Transient
	private List<BillDetailsViewDto> listBillDetailsView;

	public int getBillDetailsId() {
		return billDetailsId;
	}

	public void setBillDetailsId(int billDetailsId) {
		this.billDetailsId = billDetailsId;
	}

	public String getClinicalnotes() {
		return clinicalnotes;
	}

	public void setClinicalnotes(String clinicalnotes) {
		this.clinicalnotes = clinicalnotes;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public double getCoPay() {
		return coPay;
	}

	public void setCoPay(double coPay) {
		this.coPay = coPay;
	}

	public double getConcession() {
		return concession;
	}

	public void setConcession(double concession) {
		this.concession = concession;
	}

	public int getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public int getDeletedBy() {
		return deletedBy;
	}

	public void setDeletedBy(int deletedBy) {
		this.deletedBy = deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public int getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(int departmentId) {
		this.departmentId = departmentId;
	}

	public double getDiscount() {
		return discount;
	}

	public void setDiscount(double discount) {
		this.discount = discount;
	}

	public int getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(int doctorId) {
		this.doctorId = doctorId;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public int getPatientCatId() {
		return patientCatId;
	}

	public void setPatientCatId(int patientCatId) {
		this.patientCatId = patientCatId;
	}

	public int getPatienttId() {
		return patienttId;
	}

	public void setPatienttId(int patienttId) {
		this.patienttId = patienttId;
	}

	public double getPay() {
		return pay;
	}

	public void setPay(double pay) {
		this.pay = pay;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public int getServiceId() {
		return serviceId;
	}

	public void setServiceId(int serviceId) {
		this.serviceId = serviceId;
	}

	public int getSourceTypeId() {
		return sourceTypeId;
	}

	public void setSourceTypeId(int sourceTypeId) {
		this.sourceTypeId = sourceTypeId;
	}

	public int getSponsorCatId() {
		return sponsorCatId;
	}

	public void setSponsorCatId(int sponsorCatId) {
		this.sponsorCatId = sponsorCatId;
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

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public int getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(int updatedBy) {
		this.updatedBy = updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public String getUrgentFlag() {
		return urgentFlag;
	}

	public void setUrgentFlag(String urgentFlag) {
		this.urgentFlag = urgentFlag;
	}

	public String getCancle() {
		return cancle;
	}

	public void setCancle(String cancle) {
		this.cancle = cancle;
	}

	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	public int getChargesSlaveId() {
		return chargesSlaveId;
	}

	public void setChargesSlaveId(int chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public double getOtherCoPay() {
		return otherCoPay;
	}

	public void setOtherCoPay(double otherCoPay) {
		this.otherCoPay = otherCoPay;
	}

	public double getOtherConcession() {
		return otherConcession;
	}

	public void setOtherConcession(double otherConcession) {
		this.otherConcession = otherConcession;
	}

	public double getOtherPay() {
		return otherPay;
	}

	public void setOtherPay(double otherPay) {
		this.otherPay = otherPay;
	}

	public double getOtherRate() {
		return otherRate;
	}

	public void setOtherRate(double otherRate) {
		this.otherRate = otherRate;
	}

	public Integer getSponsorId() {
		return sponsorId;
	}

	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}

	public List<BillDetailsViewDto> getListBillDetailsView() {
		return listBillDetailsView;
	}

	public void setListBillDetailsView(List<BillDetailsViewDto> listBillDetailsView) {
		this.listBillDetailsView = listBillDetailsView;
	}
	

}
