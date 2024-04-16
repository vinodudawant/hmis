package com.hms.ehat.dto;

import java.io.Serializable;
import java.math.BigInteger;
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
@Table(name = "ehat_billquotation")
public class BillQuotationDto implements Serializable{
		
	
	@Id
	@GeneratedValue
	@Column(name = "quotation_id")
	private Integer quotationId;
		
	@Column(name = "treatment_id")
	private Integer treatmentId=0;
	
	@Column(name = "patient_id")
	private Integer patientId=0;
	
	@Column(name = "department_id")
	private Integer departmentId=0;
	
	@Column(name = "bill_id")
	private Integer billId=0;
	
	@Column(name = "unit_id")
	private int unitId=0;			
	
	@Transient
	private String queryType;
	
	@Column(name = "service_id")
	private Integer serviceId=0;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId=0;
	
	@Column(name = "quantity")
	private double quantity=1;
	
	@Column(name = "sponsor_id")
	private Integer sponsorId=0;	
	
	@Column(name = "charges_slave_id")
	private Integer chargesSlaveId=0;
	
	@Column(name = "hallId")
	private Integer hallId=0;
	
	@Column(name = "rate")
	private double rate=0;
	
	@Column(name = "amount")
	private double amount=0;
	
	@Column(name = "service_name")
	private String serviceName;
	
	@Column(name = "sub_service_name")
	private String subServiceName;
	
	@Column(name = "quotation_name")
	private String quotationName;
	
	
	@Column(name = "deleted")
	private String deleted="N";

	@Column(name = "created_by",updatable=false)
	private Integer createdBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time",updatable=false)
	private Date createdDateTime;

	@Column(name = "updated_by")
	private Integer updatedBy=0;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDateTime;

	@Column(name = "deleted_by")
	private Integer deletedBy=0;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "deleted_date_time")
	private Date deletedDateTime;
	
	@Transient
	private List<BillQuotationDto> listBillquotations;
	@Transient
	private List<BillQuotationDto> listBillDetailsQuotation;
	
	@Transient
	@Column(name = "qty_count")
	private double qtyCount;
	
	@Column(name = "count")
	private Integer count=0;
	
	@Column(name = "estimate_no")
	private Integer estimateNo=0;
	


	public Integer getQuotationId() {
		return quotationId;
	}

	public Integer getTreatmentId() {
		return treatmentId;
	}

	public Integer getPatientId() {
		return patientId;
	}

	public Integer getDepartmentId() {
		return departmentId;
	}

	public Integer getBillId() {
		return billId;
	}

	public int getUnitId() {
		return unitId;
	}

	public String getQueryType() {
		return queryType;
	}

	public Integer getServiceId() {
		return serviceId;
	}

	public Integer getSubServiceId() {
		return subServiceId;
	}



	public double getAmount() {
		return amount;
	}

	public String getServiceName() {
		return serviceName;
	}

	public String getDeleted() {
		return deleted;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public Date getCreatedDateTime() {
		return createdDateTime;
	}

	public Integer getUpdatedBy() {
		return updatedBy;
	}

	public Date getUpdatedDateTime() {
		return updatedDateTime;
	}

	public Integer getDeletedBy() {
		return deletedBy;
	}

	public Date getDeletedDateTime() {
		return deletedDateTime;
	}

	public List<BillQuotationDto> getListBillquotations() {
		return listBillquotations;
	}

	public void setQuotationId(Integer quotationId) {
		this.quotationId = quotationId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public void setPatientId(Integer patientId) {
		this.patientId = patientId;
	}

	public void setDepartmentId(Integer departmentId) {
		this.departmentId = departmentId;
	}

	public void setBillId(Integer billId) {
		this.billId = billId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}



	public void setAmount(double amount) {
		this.amount = amount;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public void setCreatedDateTime(Date createdDateTime) {
		this.createdDateTime = createdDateTime;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	public void setUpdatedDateTime(Date updatedDateTime) {
		this.updatedDateTime = updatedDateTime;
	}

	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}

	public void setDeletedDateTime(Date deletedDateTime) {
		this.deletedDateTime = deletedDateTime;
	}

	public void setListBillquotations(List<BillQuotationDto> listBillquotations) {
		this.listBillquotations = listBillquotations;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public String getQuotationName() {
		return quotationName;
	}

	public void setQuotationName(String quotationName) {
		this.quotationName = quotationName;
	}

	

	


	public Integer getEstimateNo() {
		return estimateNo;
	}

	public void setEstimateNo(Integer estimateNo) {
		this.estimateNo = estimateNo;
	}

	public double getQtyCount() {
		return qtyCount;
	}

	public void setQtyCount(double qtyCount) {
		this.qtyCount = qtyCount;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public List<BillQuotationDto> getListBillDetailsQuotation() {
		return listBillDetailsQuotation;
	}

	public void setListBillDetailsQuotation(
			List<BillQuotationDto> listBillDetailsQuotation) {
		this.listBillDetailsQuotation = listBillDetailsQuotation;
	}

	public String getSubServiceName() {
		return subServiceName;
	}

	public void setSubServiceName(String subServiceName) {
		this.subServiceName = subServiceName;
	}

	public Integer getSponsorId() {
		return sponsorId;
	}

	public Integer getChargesSlaveId() {
		return chargesSlaveId;
	}

	public Integer getHallId() {
		return hallId;
	}

	public void setSponsorId(Integer sponsorId) {
		this.sponsorId = sponsorId;
	}

	public void setChargesSlaveId(Integer chargesSlaveId) {
		this.chargesSlaveId = chargesSlaveId;
	}

	public void setHallId(Integer hallId) {
		this.hallId = hallId;
	}
	
	 

}
