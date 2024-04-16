package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_partywise_expiry_debit_note_master")
public class PartywiseExpiryDebitNoteMaster implements Serializable {
	@Id
	@GeneratedValue
	@Column(name = "partywise_expiry_debit_note_id")
	private Integer debitNoteId;

	@Column(name = "partywise_expiry_debit_note_doc_no")
	private String debitNoteDocNo;

	@Column(name = "partywise_expiry_debit_note_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date debitNoteDate;

	@Column(name = "partywise_expiry_debit_note_narration")
	private String debitNoteNarration;
	
	@ManyToOne
	@JoinColumn(name = "partywise_expiry_debit_note_vendor_id")
	private VendorMaster vendorMaster;
	
	@Column(name = "partywise_expiry_debit_note_gross_amt")
	private Double debitNoteGrossAmt;

	@Column(name = "partywise_expiry_debit_note_net_amt")
	private Double debitNoteNetAmt;

	@Column(name = "partywise_expiry_debit_note_adjust_amt")
	private Double debitNoteAdjAmt;
	
	@Column(name = "partywise_expiry_debit_note_vat")
	private String debitNoteVat;
		
	@Column(name = "partywise_expiry_debit_note_delete_flag")
	private Integer debitNoteDeleteFlag;

	@Column(name = "partywise_expiry_debit_note_update_date")
	private Date debitNoteUpdateDate;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "debit_note_slave_master_id", referencedColumnName = "partywise_expiry_debit_note_id")
	private List<PartywiseExpiryDebitNoteSlave> debitNoteSlaves = new ArrayList<PartywiseExpiryDebitNoteSlave>();
	
	
	public List<PartywiseExpiryDebitNoteSlave> getDebitNoteSlaves() {
		return debitNoteSlaves;
	}

	public void setDebitNoteSlaves(
			List<PartywiseExpiryDebitNoteSlave> debitNoteSlaves) {
		this.debitNoteSlaves = debitNoteSlaves;
	}

	public Double getDebitNoteAdjAmt() {
		return debitNoteAdjAmt;
	}

	public void setDebitNoteAdjAmt(Double debitNoteAdjAmt) {
		this.debitNoteAdjAmt = debitNoteAdjAmt;
	}
	
	
	public Integer getDebitNoteId() {
		return debitNoteId;
	}

	public void setDebitNoteId(Integer debitNoteId) {
		this.debitNoteId = debitNoteId;
	}

	public String getDebitNoteDocNo() {
		return debitNoteDocNo;
	}

	public void setDebitNoteDocNo(String debitNoteDocNo) {
		this.debitNoteDocNo = debitNoteDocNo;
	}

	public Date getDebitNoteDate() {
		return debitNoteDate;
	}

	public void setDebitNoteDate(Date debitNoteDate) {
		this.debitNoteDate = debitNoteDate;
	}

	public String getDebitNoteNarration() {
		return debitNoteNarration;
	}

	public void setDebitNoteNarration(String debitNoteNarration) {
		this.debitNoteNarration = debitNoteNarration;
	}

	public VendorMaster getVendorMaster() {
		return vendorMaster;
	}

	public void setVendorMaster(VendorMaster vendorMaster) {
		this.vendorMaster = vendorMaster;
	}

	public Double getDebitNoteGrossAmt() {
		return debitNoteGrossAmt;
	}

	public void setDebitNoteGrossAmt(Double debitNoteGrossAmt) {
		this.debitNoteGrossAmt = debitNoteGrossAmt;
	}

	public Double getDebitNoteNetAmt() {
		return debitNoteNetAmt;
	}

	public void setDebitNoteNetAmt(Double debitNoteNetAmt) {
		this.debitNoteNetAmt = debitNoteNetAmt;
	}

	public String getDebitNoteVat() {
		return debitNoteVat;
	}

	public void setDebitNoteVat(String debitNoteVat) {
		this.debitNoteVat = debitNoteVat;
	}
		
	public Integer getDebitNoteDeleteFlag() {
		return debitNoteDeleteFlag;
	}

	public void setDebitNoteDeleteFlag(Integer debitNoteDeleteFlag) {
		this.debitNoteDeleteFlag = debitNoteDeleteFlag;
	}

	public Date getDebitNoteUpdateDate() {
		return debitNoteUpdateDate;
	}

	public void setDebitNoteUpdateDate(Date debitNoteUpdateDate) {
		this.debitNoteUpdateDate = debitNoteUpdateDate;
	}
}
