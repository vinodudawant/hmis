package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.*;

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
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_counter_sale_master")
public class CounterSaleMaster implements Serializable
{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

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
	
	@Column(name = "counter_tax_vat5")
	private Double counterTaxVat5;
	
	@Column(name = "counter_tax_vat55")
	private Double counterTaxVat55;
	
	@Column(name = "counter_tax_vat12")
	private Double counterTaxVat12;
	
	@Column(name = "counter_tax_vat0")
	private Double counterTaxVat0;
	
	@Column(name = "counter_tax_total_vat")
	private Double counterTotalVat;
	
	@Column(name = "counter_sale_store_id")
	private Integer counterSaleStoreId=0;
	
	@Column(name = "counter_sale_user_id")
	private Integer counterSaleUserId=0;
	
	@Column(name="counter_sale_status")	
    private String counterSaleStatus="pending";
	
	@Column(name = "counter_tax_vat6")
	private Double counterTaxVat6;
	
	@Column(name = "counter_tax_vat135")
	private Double counterTaxVat135;
	
	@Column(name = "counter_tax_cheque_no")
	private String counterTaxChequeNo;
	

	@Column(name = "counter_tax_bankName")
	private String counterTaxBankName;
	
	@Column(name = "unit_count")
	private Integer unitCount;
	
	@Column(name = " unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = "counter_sale_cd" ,columnDefinition="double default 0.0")
	private double coutersalecd=0.0;
	
	@Column(name = "counter_sale_cd_amt" ,columnDefinition="double default 0.0")
	private double coutersalecdamt=0.0;
	
	@Column(name = "ipdopdno")
	private String ipdopdno="-";
	
	@Column(name = "counter_tax_card_no")
	private String counterTaxCardNo;
	
	@Column(name = "account_status_counter")
	private String accountStatusCounter;
	
	/*@Column(name = "prescriptionImage")
	private String prescriptionImage;
	
	public String getPrescriptionImage() {
		return prescriptionImage;
	}

	public void setPrescriptionImage(String prescriptionImage) {
		this.prescriptionImage = prescriptionImage;
	}*/


	@CreationTimestamp
	@Column(name="created_date")
	private Date createdDate;
	@UpdateTimestamp
	@Column(name="updated_date")
	private Date updatedDate;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Transient
	List<CounterSaleMaster> lstCounterSaleMaster;
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@Transient
	private Integer counter_sale_id;
	
	@Transient
	private Date counter_sale_for_date;
	
	@Transient
	private String counter_sale_for_time;
	
	@Transient
	private double counter_sale_gross_amt;
	
	@Transient
	private double counter_sale_net_amt;
	
	@Transient 
	private String counter_sale_patient_name;
	
	@Transient
	private String counter_sale_mobile;
	
	@Transient
	private String counter_sale_doctor;
	
	@Transient
	private String counter_sale_address;
	
	@Transient
	private double counter_tax_vat5;
	
	@Transient
	private double counter_tax_vat12;
	
	@Transient
	private double counter_tax_vat0;
	
	@Transient 
	private double counter_tax_total_vat;
	
	@Transient 
	private double counter_tax_vat55;
	
	@Transient
	private double counter_tax_vat135;
	
	@Transient
	private double counter_tax_vat6;
	
	@Transient
	private String counter_sale_trans_type;
	
	@Transient
	private String counter_tax_bankName;
	
	@Transient 
	private String counter_tax_cheque_no;
	
	@Transient
	private double counter_sale_cd;
	
	@Transient
	private double counter_sale_cd_amt;
	
	@Transient
	private String counter_tax_card_no;
	
	@Transient
	private String account_status_counter;
	
	@Transient
	private int product_prescription;
	

	public int getProduct_prescription() {
		return product_prescription;
	}

	public void setProduct_prescription(int product_prescription) {
		this.product_prescription = product_prescription;
	}

	public String getAccount_status_counter() {
		return account_status_counter;
	}

	public void setAccount_status_counter(String account_status_counter) {
		this.account_status_counter = account_status_counter;
	}

	public Integer getCounter_sale_id() {
		return counter_sale_id;
	}

	public void setCounter_sale_id(Integer counter_sale_id) {
		this.counter_sale_id = counter_sale_id;
	}

	public Date getCounter_sale_for_date() {
		return counter_sale_for_date;
	}

	public void setCounter_sale_for_date(Date counter_sale_for_date) {
		this.counter_sale_for_date = counter_sale_for_date;
	}

	public String getCounter_sale_for_time() {
		return counter_sale_for_time;
	}

	public void setCounter_sale_for_time(String counter_sale_for_time) {
		this.counter_sale_for_time = counter_sale_for_time;
	}

	public double getCounter_sale_gross_amt() {
		return counter_sale_gross_amt;
	}

	public void setCounter_sale_gross_amt(double counter_sale_gross_amt) {
		this.counter_sale_gross_amt = counter_sale_gross_amt;
	}

	public double getCounter_sale_net_amt() {
		return counter_sale_net_amt;
	}

	public void setCounter_sale_net_amt(double counter_sale_net_amt) {
		this.counter_sale_net_amt = counter_sale_net_amt;
	}

	public String getCounter_sale_patient_name() {
		return counter_sale_patient_name;
	}

	public void setCounter_sale_patient_name(String counter_sale_patient_name) {
		this.counter_sale_patient_name = counter_sale_patient_name;
	}

	public String getCounter_sale_mobile() {
		return counter_sale_mobile;
	}

	public void setCounter_sale_mobile(String counter_sale_mobile) {
		this.counter_sale_mobile = counter_sale_mobile;
	}

	public String getCounter_sale_doctor() {
		return counter_sale_doctor;
	}

	public void setCounter_sale_doctor(String counter_sale_doctor) {
		this.counter_sale_doctor = counter_sale_doctor;
	}

	public String getCounter_sale_address() {
		return counter_sale_address;
	}

	public void setCounter_sale_address(String counter_sale_address) {
		this.counter_sale_address = counter_sale_address;
	}

	public double getCounter_tax_vat5() {
		return counter_tax_vat5;
	}

	public void setCounter_tax_vat5(double counter_tax_vat5) {
		this.counter_tax_vat5 = counter_tax_vat5;
	}

	public double getCounter_tax_vat12() {
		return counter_tax_vat12;
	}

	public void setCounter_tax_vat12(double counter_tax_vat12) {
		this.counter_tax_vat12 = counter_tax_vat12;
	}

	public double getCounter_tax_vat0() {
		return counter_tax_vat0;
	}

	public void setCounter_tax_vat0(double counter_tax_vat0) {
		this.counter_tax_vat0 = counter_tax_vat0;
	}

	public double getCounter_tax_total_vat() {
		return counter_tax_total_vat;
	}

	public void setCounter_tax_total_vat(double counter_tax_total_vat) {
		this.counter_tax_total_vat = counter_tax_total_vat;
	}

	public double getCounter_tax_vat55() {
		return counter_tax_vat55;
	}

	public void setCounter_tax_vat55(double counter_tax_vat55) {
		this.counter_tax_vat55 = counter_tax_vat55;
	}

	public double getCounter_tax_vat135() {
		return counter_tax_vat135;
	}

	public void setCounter_tax_vat135(double counter_tax_vat135) {
		this.counter_tax_vat135 = counter_tax_vat135;
	}

	public double getCounter_tax_vat6() {
		return counter_tax_vat6;
	}

	public void setCounter_tax_vat6(double counter_tax_vat6) {
		this.counter_tax_vat6 = counter_tax_vat6;
	}

	public String getCounter_sale_trans_type() {
		return counter_sale_trans_type;
	}

	public void setCounter_sale_trans_type(String counter_sale_trans_type) {
		this.counter_sale_trans_type = counter_sale_trans_type;
	}

	public String getCounter_tax_bankName() {
		return counter_tax_bankName;
	}

	public void setCounter_tax_bankName(String counter_tax_bankName) {
		this.counter_tax_bankName = counter_tax_bankName;
	}

	public String getCounter_tax_cheque_no() {
		return counter_tax_cheque_no;
	}

	public void setCounter_tax_cheque_no(String counter_tax_cheque_no) {
		this.counter_tax_cheque_no = counter_tax_cheque_no;
	}

	public double getCounter_sale_cd() {
		return counter_sale_cd;
	}

	public void setCounter_sale_cd(double counter_sale_cd) {
		this.counter_sale_cd = counter_sale_cd;
	}

	public double getCounter_sale_cd_amt() {
		return counter_sale_cd_amt;
	}

	public void setCounter_sale_cd_amt(double counter_sale_cd_amt) {
		this.counter_sale_cd_amt = counter_sale_cd_amt;
	}

	public String getCounter_tax_card_no() {
		return counter_tax_card_no;
	}

	public void setCounter_tax_card_no(String counter_tax_card_no) {
		this.counter_tax_card_no = counter_tax_card_no;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public List<CounterSaleMaster> getLstCounterSaleMaster() {
		return lstCounterSaleMaster;
	}

	public void setLstCounterSaleMaster(List<CounterSaleMaster> lstCounterSaleMaster) {
		this.lstCounterSaleMaster = lstCounterSaleMaster;
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


	@Column(name = "updated_by")
	private Integer updatedBy;

	@Column(name = "deleted_by")
	private Integer deletedBy;
	
	public String getCounterTaxChequeNo() {
		return counterTaxChequeNo;
	}

	public void setCounterTaxChequeNo(String counterTaxChequeNo) {
		this.counterTaxChequeNo = counterTaxChequeNo;
	}

	public String getCounterTaxBankName() {
		return counterTaxBankName;
	}

	public void setCounterTaxBankName(String counterTaxBankName) {
		this.counterTaxBankName = counterTaxBankName;
	}
	
	public Double getCounterTaxVat6() {
		return counterTaxVat6;
	}

	public void setCounterTaxVat6(Double counterTaxVat6) {
		this.counterTaxVat6 = counterTaxVat6;
	}

	public Double getCounterTaxVat135() {
		return counterTaxVat135;
	}

	public void setCounterTaxVat135(Double counterTaxVat135) {
		this.counterTaxVat135 = counterTaxVat135;
	}
	
	public String getCounterSaleStatus() {
		return counterSaleStatus;
	}

	public void setCounterSaleStatus(String counterSaleStatus) {
		this.counterSaleStatus = counterSaleStatus;
	}

	public Double getCounterTotalVat() {
		return counterTotalVat;
	}

	public void setCounterTotalVat(Double counterTotalVat) {
		this.counterTotalVat = counterTotalVat;
	}

	public Double getCounterTaxVat5() {
		return counterTaxVat5;
	}

	public void setCounterTaxVat5(Double counterTaxVat5) {
		this.counterTaxVat5 = counterTaxVat5;
	}

	public Double getCounterTaxVat12() {
		return counterTaxVat12;
	}

	public void setCounterTaxVat12(Double counterTaxVat12) {
		this.counterTaxVat12 = counterTaxVat12;
	}

	public Double getCounterTaxVat0() {
		return counterTaxVat0;
	}

	public void setCounterTaxVat0(Double counterTaxVat0) {
		this.counterTaxVat0 = counterTaxVat0;
	}

			
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "counter_slave_master_id", referencedColumnName = "counter_sale_id")
	private List<CounterSaleSlave> ltCounterSlave = new ArrayList<CounterSaleSlave>();

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

	public List<CounterSaleSlave> getLtCounterSlave() {
		return ltCounterSlave;
	}

	public void setLtCounterSlave(List<CounterSaleSlave> ltCounterSlave) {
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

	public Integer getCounterSaleStoreId() {
		return counterSaleStoreId;
	}

	public void setCounterSaleStoreId(Integer counterSaleStoreId) {
		this.counterSaleStoreId = counterSaleStoreId;
	}

	public Integer getCounterSaleUserId() {
		return counterSaleUserId;
	}

	public void setCounterSaleUserId(Integer counterSaleUserId) {
		this.counterSaleUserId = counterSaleUserId;
	}

	public Double getCounterTaxVat55() {
		return counterTaxVat55;
	}

	public void setCounterTaxVat55(Double counterTaxVat55) {
		this.counterTaxVat55 = counterTaxVat55;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public double getCoutersalecd() {
		return coutersalecd;
	}

	public void setCoutersalecd(double coutersalecd) {
		this.coutersalecd = coutersalecd;
	}

	public double getCoutersalecdamt() {
		return coutersalecdamt;
	}

	public void setCoutersalecdamt(double coutersalecdamt) {
		this.coutersalecdamt = coutersalecdamt;
	}

	public String getIpdopdno() {
		return ipdopdno;
	}

	public void setIpdopdno(String ipdopdno) {
		this.ipdopdno = ipdopdno;
	}

	public String getCounterTaxCardNo() {
		return counterTaxCardNo;
	}

	public void setCounterTaxCardNo(String counterTaxCardNo) {
		this.counterTaxCardNo = counterTaxCardNo;
	}

	public String getAccountStatusCounter() {
		return accountStatusCounter;
	}

	public void setAccountStatusCounter(String accountStatusCounter) {
		this.accountStatusCounter = accountStatusCounter;
	}

	public Integer getUnitCount() {
		return unitCount;
	}

	public void setUnitCount(Integer unitCount) {
		this.unitCount = unitCount;
	}

	
	
	
}