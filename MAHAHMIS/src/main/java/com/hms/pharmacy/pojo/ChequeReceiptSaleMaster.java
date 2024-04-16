package com.hms.pharmacy.pojo;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_cheque_receipt_sale_master")
public class ChequeReceiptSaleMaster 
{
	@Id
	@GeneratedValue
	@Column(name = "cheque_receipt_sale_id")
	private Integer chequeReceiptSaleId;
	
	
	@Column(name = "cheque_receipt_sale_narration")
	private String chequeReceiptSaleNarration;
	
	@Column(name = "cheque_receipt_sale_amt")
	private Integer chequeReceiptSaleAmt;
	
	@Column(name = "cheque_receipt_sale_cheque_no")
	private String chequeReceiptSaleNo;
	
		
	@Column(name = "cheque_receipt_sale_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date chequeReceiptSaleDate;
	
	@ManyToOne
	@JoinColumn(name = "cheque_receipt_sale_patient_id")
	private PatientMaster patientMaster=new PatientMaster();
	
	@ManyToOne
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_sale_bank_id")
	private BankMaster bankMaster=new BankMaster();
	
	@ManyToOne
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_sale_bank_id1")
	private BankMaster bankMaster1=new BankMaster();
	
	@ManyToOne
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_sale_branch_id")
	private BranchMaster branchMaster=new BranchMaster();
	
	@ManyToOne
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "cheque_receipt_sale_branch_id1")
	private BranchMaster branchMaster1=new BranchMaster();
	
	@Column(name = "cheque_receipt_sale_made_by")
	private String chequeReceiptSaleMadeBy;
	
	@Column(name = "cheque_receipt_sale_delete_flag")
	private Integer chequeReceiptSaleDeleteFlag;
	
	@Column(name = "cheque_receipt_sale_update_date")
	private Date chequeReceiptSaleUpdateDate;
	
	public String getChequeReceiptSaleNo() {
		return chequeReceiptSaleNo;
	}

	public void setChequeReceiptSaleNo(String chequeReceiptSaleNo) {
		this.chequeReceiptSaleNo = chequeReceiptSaleNo;
	}
	
	public Integer getChequeReceiptSaleId() {
		return chequeReceiptSaleId;
	}

	public void setChequeReceiptSaleId(Integer chequeReceiptSaleId) {
		this.chequeReceiptSaleId = chequeReceiptSaleId;
	}

	public String getChequeReceiptSaleNarration() {
		return chequeReceiptSaleNarration;
	}

	public void setChequeReceiptSaleNarration(String chequeReceiptSaleNarration) {
		this.chequeReceiptSaleNarration = chequeReceiptSaleNarration;
	}

	public Integer getChequeReceiptSaleAmt() {
		return chequeReceiptSaleAmt;
	}

	public void setChequeReceiptSaleAmt(Integer chequeReceiptSaleAmt) {
		this.chequeReceiptSaleAmt = chequeReceiptSaleAmt;
	}



	public Date getChequeReceiptSaleDate() {
		return chequeReceiptSaleDate;
	}

	public void setChequeReceiptSaleDate(Date chequeReceiptSaleDate) {
		this.chequeReceiptSaleDate = chequeReceiptSaleDate;
	}

	public PatientMaster getPatientMaster() {
		return patientMaster;
	}

	public void setPatientMaster(PatientMaster patientMaster) {
		this.patientMaster = patientMaster;
	}

	public BankMaster getBankMaster() {
		return bankMaster;
	}

	public void setBankMaster(BankMaster bankMaster) {
		this.bankMaster = bankMaster;
	}

	public BankMaster getBankMaster1() {
		return bankMaster1;
	}

	public void setBankMaster1(BankMaster bankMaster1) {
		this.bankMaster1 = bankMaster1;
	}

	public BranchMaster getBranchMaster() {
		return branchMaster;
	}

	public void setBranchMaster(BranchMaster branchMaster) {
		this.branchMaster = branchMaster;
	}

	public BranchMaster getBranchMaster1() {
		return branchMaster1;
	}

	public void setBranchMaster1(BranchMaster branchMaster1) {
		this.branchMaster1 = branchMaster1;
	}

	public String getChequeReceiptSaleMadeBy() {
		return chequeReceiptSaleMadeBy;
	}

	public void setChequeReceiptSaleMadeBy(String chequeReceiptSaleMadeBy) {
		this.chequeReceiptSaleMadeBy = chequeReceiptSaleMadeBy;
	}

	public Integer getChequeReceiptSaleDeleteFlag() {
		return chequeReceiptSaleDeleteFlag;
	}

	public void setChequeReceiptSaleDeleteFlag(Integer chequeReceiptSaleDeleteFlag) {
		this.chequeReceiptSaleDeleteFlag = chequeReceiptSaleDeleteFlag;
	}

	public Date getChequeReceiptSaleUpdateDate() {
		return chequeReceiptSaleUpdateDate;
	}

	public void setChequeReceiptSaleUpdateDate(Date chequeReceiptSaleUpdateDate) {
		this.chequeReceiptSaleUpdateDate = chequeReceiptSaleUpdateDate;
	}

}