package com.hms.pharmacy.pojo;

import java.util.*;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_fifth_counter_sale_master")
public class FifthCounterSaleMaster
{
	@Id
	@GeneratedValue
	@Column(name="counter_sale_id")
	private Integer counterSaleId;
	
	@Column(name="counter_sale_for_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date counterSaleForDate;
	
	@Column(name="counter_sale_for_time")
	private String counterSaleForTime;

	@Column(name="counter_sale_delete_flag")
	private Integer  counterSaleDeleteFlag;
	
	@Column(name="counter_sale_update_date")
	private Date counterSaleUpdateDate;
	
	@Column(name="counter_sale_gross_amt")
	private Double counterSaleGrossAmt;
	
	@Column(name="counter_sale_net_amt")
	private Double counterSaleNetAmt;
	
	@Column(name = "counter_sale_entered_by")
	private String counterSaleEnteredBy;
	
	@Column(name="counter_sale_credit_note_no")
	private Integer counterSaleCreditNoteNo;
	
	@Column(name="counter_sale_credit_note_amt")
	private Integer counterSaleCreditNoteAmt;
	
	@Column(name="counter_sale_prescription")
	private String counterSalePrescription;
	
	@Column(name="counter_sale_patient_name")
	private String counterSalePatientName;
	
	@Column(name="counter_sale_address")
	private String counterSaleAddress;
	
	@Column(name="counter_sale_mobile")
	private String counterSaleMobile;
	
	@Column(name="counter_sale_doctor")
	private String counterSaleDoctor;
	
	@Column(name="counter_sale_naration")
	private String counterSaleNaration;

	@Column(name = "counter_sale_trans_type")
	private String counterSaleTransType;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "counter_slave_master_id", referencedColumnName = "counter_sale_id")
	private List<FifthCounterSaleSlave> ltCounterSlave = new ArrayList<FifthCounterSaleSlave>();

	public Integer getCounterSaleCreditNoteNo() {
		return counterSaleCreditNoteNo;
	}

	public void setCounterSaleCreditNoteNo(Integer counterSaleCreditNoteNo) {
		this.counterSaleCreditNoteNo = counterSaleCreditNoteNo;
	}

	public Integer getCounterSaleCreditNoteAmt() {
		return counterSaleCreditNoteAmt;
	}

	public void setCounterSaleCreditNoteAmt(Integer counterSaleCreditNoteAmt) {
		this.counterSaleCreditNoteAmt = counterSaleCreditNoteAmt;
	}

	public String getCounterSalePrescription() {
		return counterSalePrescription;
	}

	public void setCounterSalePrescription(String counterSalePrescription) {
		this.counterSalePrescription = counterSalePrescription;
	}

	public String getCounterSalePatientName() {
		return counterSalePatientName;
	}

	public void setCounterSalePatientName(String counterSalePatientName) {
		this.counterSalePatientName = counterSalePatientName;
	}

	public String getCounterSaleAddress() {
		return counterSaleAddress;
	}

	public void setCounterSaleAddress(String counterSaleAddress) {
		this.counterSaleAddress = counterSaleAddress;
	}

	public String getCounterSaleMobile() {
		return counterSaleMobile;
	}

	public void setCounterSaleMobile(String counterSaleMobile) {
		this.counterSaleMobile = counterSaleMobile;
	}

	public String getCounterSaleDoctor() {
		return counterSaleDoctor;
	}

	public void setCounterSaleDoctor(String counterSaleDoctor) {
		this.counterSaleDoctor = counterSaleDoctor;
	}

	public String getCounterSaleNaration() {
		return counterSaleNaration;
	}

	public void setCounterSaleNaration(String counterSaleNaration) {
		this.counterSaleNaration = counterSaleNaration;
	}
		
	public String getCounterSaleEnteredBy() {
		return counterSaleEnteredBy;
	}

	public void setCounterSaleEnteredBy(String counterSaleEnteredBy) {
		this.counterSaleEnteredBy = counterSaleEnteredBy;
	}

	public List<FifthCounterSaleSlave> getLtCounterSlave() {
		return ltCounterSlave;
	}

	public void setLtCounterSlave(List<FifthCounterSaleSlave> ltCounterSlave) {
		this.ltCounterSlave = ltCounterSlave;
	}

	public Integer getCounterSaleId() {
		return counterSaleId;
	}

	public void setCounterSaleId(Integer counterSaleId) {
		this.counterSaleId = counterSaleId;
	}

	public java.util.Date getCounterSaleForDate() {
		return counterSaleForDate;
	}

	public java.util.Date getCounterSaleUpdateDate() {
		return counterSaleUpdateDate;
	}

	public void setCounterSaleForDate(java.util.Date counterSaleForDate) {
		this.counterSaleForDate = counterSaleForDate;
	}

	public Integer getCounterSaleDeleteFlag() {
		return counterSaleDeleteFlag;
	}

	public void setCounterSaleDeleteFlag(Integer counterSaleDeleteFlag) {
		this.counterSaleDeleteFlag = counterSaleDeleteFlag;
	}

	public void setCounterSaleUpdateDate(java.util.Date counterSaleUpdateDate) {
		this.counterSaleUpdateDate = counterSaleUpdateDate;
	}

	public Double getCounterSaleGrossAmt() {
		return counterSaleGrossAmt;
	}

	public void setCounterSaleGrossAmt(Double counterSaleGrossAmt) {
		this.counterSaleGrossAmt = counterSaleGrossAmt;
	}

	public Double getCounterSaleNetAmt() {
		return counterSaleNetAmt;
	}

	public void setCounterSaleNetAmt(Double counterSaleNetAmt) {
		this.counterSaleNetAmt = counterSaleNetAmt;
	}
	public String getCounterSaleTransType() {
		return counterSaleTransType;
	}

	public void setCounterSaleTransType(String counterSaleTransType) {
		this.counterSaleTransType = counterSaleTransType;
	}
	
	public String getCounterSaleForTime() {
		return counterSaleForTime;
	}

	public void setCounterSaleForTime(String counterSaleForTime) {
		this.counterSaleForTime = counterSaleForTime;
	}
}