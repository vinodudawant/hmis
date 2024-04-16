package com.hms.pharmacy.pojo;

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
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_indent_sale_master")
public class IndentSaleMaster {
	@Id
	@GeneratedValue
	@Column(name = "indent_sale_id")
	private Integer indentSalelId;

	@Column(name = "indent_sale_doc_no")
	private String 	indentSaleDocNo;

	
	@ManyToOne
	@JoinColumn(name = "indent_sale_indent_no")
	private IndentMaster indentMaster;
	
	
	@Column(name = "indent_sale_received_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date indentSaleReceivedDate;

	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "indent_sale_slave_master_id", referencedColumnName = "indent_sale_id")
	private List<IndentSaleSlave> indentSaleSlaves = new ArrayList<IndentSaleSlave>();
	
	@Column(name = "indent_sale_narration")
	private String indentSaleNarration;

	@Column(name = "indent_sale_gross_amt")
	private Double indentSaleGrossAmt;

	@Column(name = "indent_sale_add")
	private Double indentSaleAdd;

	@Column(name = "indent_sale_less")
	private Double indentSaleLess;

	@Column(name = "indent_sale_net_amt")
	private Double indentSaleNetAmt;

	@Column(name = "indent_sale_special_disc")
	private Double indentSaleSpecialDisc;

	@Column(name = "indent_sale_surcharges")
	private Double indentSaleSurcharges;

	@Column(name = "indent_sale_round")
	private Double indentSaleRound;

	@Column(name = "indent_sale_cn")
	private Double indentSaleCN;

	@Column(name = "indent_sale_cd")
	private Double indentSaleCD;

	@Column(name = "indent_sale_cn_amt")
	private Double indentSaleCnAmt;
	
	@Column(name = "indent_sale_amt_receive")
	private Double indentSaleAmountReceive;
	
	@Column(name = "indent_sale_amt_balance")
	private Double indentSaleAmountBalance;
	
	@Column(name = "indent_sale_previous_balance")
	private Double indentSalePreviousBalance;

	@Column(name = "indent_sale_cd_amt")
	private Double indentSaleCdAmt;

	@Column(name = "indent_sale_delete_flag")
	private Integer indentSaleDeleteFlag;

	@Column(name = "indent_sale_update_date")
	private Date indentSaleUpdateDate;
	
	@Column(name="indent_bill_mode")
	private int indentBillMode;
	
	@Column(name = "indent_sale_store_id")
	private Integer indentSaleStoreId=0;

	@Column(name = "indent_tax_vat5")
	private Double indentTaxVat5;
	
	@Column(name = "indent_tax_vat55")
	private Double indentTaxVat55;
	
	@Column(name = "indent_tax_vat12")
	private Double indentTaxVat12;
	
	@Column(name = "indent_tax_vat0")
	private Double indentTaxVat0;
	
	@Column(name = "indent_sale_user_id")
	private Integer indentSaleUserId=0;
	
	@Column(name = "indent_sale_ip")
	private String ipAddress=null;
	
	@Column(name = "indent_sale_time")
	private String time=null;
	
	@Column(name="indent_sale_type")	
    private String indentSaleType;
	
	@Column(name="indent_sale_bank_name")	
    private String indentSaleBankName;
	
	@Column(name="indent_sale_cheque_num")	
    private String indentSaleChequeNum;
	
	@Column(name="indent_sale_comment")	
    private String indentSaleComment;
	
	@Column(name = "indent_tax_vat6")
	private Double indentTaxVat6;
	
	@Column(name = "indent_tax_vat135")
	private Double indentTaxVat135;
	
	@Column(name = "bill_Category_id")
	private Integer indentBillCatId=1;
	
	@Column(name = " unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	@Column(name="ward_name")	
    private String wardName;
	
	@Column(name="indent_sale_card_num")	
    private String indentSaleCardNum;
	  
    @Column(name="paid_flag")
	private String paidFlag="N";
    
    @Transient
     private Integer historyId;
   
    @Transient
    private Double amountReceive;
  
    @Transient
    private Double amountBal;
  
    public Integer getHistoryId() {
		return historyId;
	}

	public void setHistoryId(Integer historyId) {
		this.historyId = historyId;
	}

	public Double getAmountReceive() {
		return amountReceive;
	}

	public void setAmountReceive(Double amountReceive) {
		this.amountReceive = amountReceive;
	}

	public Double getAmountBal() {
		return amountBal;
	}

	public void setAmountBal(Double amountBal) {
		this.amountBal = amountBal;
	}

	public Double getDiscount() {
		return discount;
	}

	public void setDiscount(Double discount) {
		this.discount = discount;
	}

	@Transient
    private Double discount;
	
	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}

	public String getWardName() {
		return wardName;
	}

	public void setWardName(String wardName) {
		this.wardName = wardName;
	}

	public Integer getIndentBillCatId() {
		return indentBillCatId;
	}

	public void setIndentBillCatId(Integer indentBillCatId) {
		this.indentBillCatId = indentBillCatId;
	}

	public Double getIndentTaxVat6() {
		return indentTaxVat6;
	}

	public void setIndentTaxVat6(Double indentTaxVat6) {
		this.indentTaxVat6 = indentTaxVat6;
	}

	public Double getIndentTaxVat135() {
		return indentTaxVat135;
	}

	public void setIndentTaxVat135(Double indentTaxVat135) {
		this.indentTaxVat135 = indentTaxVat135;
	}

	public String getIndentSaleComment() {
		return indentSaleComment;
	}

	public void setIndentSaleComment(String indentSaleComment) {
		this.indentSaleComment = indentSaleComment;
	}

	public String getIndentSaleBankName() {
		return indentSaleBankName;
	}

	public void setIndentSaleBankName(String indentSaleBankName) {
		this.indentSaleBankName = indentSaleBankName;
	}

	public String getIndentSaleChequeNum() {
		return indentSaleChequeNum;
	}

	public void setIndentSaleChequeNum(String indentSaleChequeNum) {
		this.indentSaleChequeNum = indentSaleChequeNum;
	}

	public String getIndentSaleType() {
		return indentSaleType;
	}

	public void setIndentSaleType(String indentSaleType) {
		this.indentSaleType = indentSaleType;
	}

	public Double getIndentTaxVat5() {
		return indentTaxVat5;
	}

	public void setIndentTaxVat5(Double indentTaxVat5) {
		this.indentTaxVat5 = indentTaxVat5;
	}

	public Double getIndentTaxVat12() {
		return indentTaxVat12;
	}

	public void setIndentTaxVat12(Double indentTaxVat12) {
		this.indentTaxVat12 = indentTaxVat12;
	}

	public Double getIndentTaxVat0() {
		return indentTaxVat0;
	}

	public void setIndentTaxVat0(Double indentTaxVat0) {
		this.indentTaxVat0 = indentTaxVat0;
	}

	public Integer getIndentSalelId() {
		return indentSalelId;
	}

	public void setIndentSalelId(Integer indentSalelId) {
		this.indentSalelId = indentSalelId;
	}

	public String getIndentSaleDocNo() {
		return indentSaleDocNo;
	}

	public void setIndentSaleDocNo(String indentSaleDocNo) {
		this.indentSaleDocNo = indentSaleDocNo;
	}

	public IndentMaster getIndentMaster() {
		return indentMaster;
	}

	public void setIndentMaster(IndentMaster indentMaster) {
		this.indentMaster = indentMaster;
	}

	public Date getIndentSaleReceivedDate() {
		return indentSaleReceivedDate;
	}

	public void setIndentSaleReceivedDate(Date indentSaleReceivedDate) {
		this.indentSaleReceivedDate = indentSaleReceivedDate;
	}

	public List<IndentSaleSlave> getIndentSaleSlaves() {
		return indentSaleSlaves;
	}

	public void setIndentSaleSlaves(List<IndentSaleSlave> indentSaleSlaves) {
		this.indentSaleSlaves = indentSaleSlaves;
	}

	public String getIndentSaleNarration() {
		return indentSaleNarration;
	}

	public void setIndentSaleNarration(String indentSaleNarration) {
		this.indentSaleNarration = indentSaleNarration;
	}

	public Double getIndentSaleGrossAmt() {
		return indentSaleGrossAmt;
	}

	public void setIndentSaleGrossAmt(Double indentSaleGrossAmt) {
		this.indentSaleGrossAmt = indentSaleGrossAmt;
	}

	public Double getIndentSaleAdd() {
		return indentSaleAdd;
	}

	public void setIndentSaleAdd(Double indentSaleAdd) {
		this.indentSaleAdd = indentSaleAdd;
	}

	public Double getIndentSaleLess() {
		return indentSaleLess;
	}

	public void setIndentSaleLess(Double indentSaleLess) {
		this.indentSaleLess = indentSaleLess;
	}

	public Double getIndentSaleNetAmt() {
		return indentSaleNetAmt;
	}

	public void setIndentSaleNetAmt(Double indentSaleNetAmt) {
		this.indentSaleNetAmt = indentSaleNetAmt;
	}

	public Double getIndentSaleSpecialDisc() {
		return indentSaleSpecialDisc;
	}

	public void setIndentSaleSpecialDisc(Double indentSaleSpecialDisc) {
		this.indentSaleSpecialDisc = indentSaleSpecialDisc;
	}

	public Double getIndentSaleSurcharges() {
		return indentSaleSurcharges;
	}

	public void setIndentSaleSurcharges(Double indentSaleSurcharges) {
		this.indentSaleSurcharges = indentSaleSurcharges;
	}

	public Double getIndentSaleRound() {
		return indentSaleRound;
	}

	public void setIndentSaleRound(Double indentSaleRound) {
		this.indentSaleRound = indentSaleRound;
	}

	public Double getIndentSaleCN() {
		return indentSaleCN;
	}

	public void setIndentSaleCN(Double indentSaleCN) {
		this.indentSaleCN = indentSaleCN;
	}

	public Double getIndentSaleCD() {
		return indentSaleCD;
	}

	public void setIndentSaleCD(Double indentSaleCD) {
		this.indentSaleCD = indentSaleCD;
	}

	public Double getIndentSaleCnAmt() {
		return indentSaleCnAmt;
	}

	public void setIndentSaleCnAmt(Double indentSaleCnAmt) {
		this.indentSaleCnAmt = indentSaleCnAmt;
	}

	public Double getIndentSaleCdAmt() {
		return indentSaleCdAmt;
	}

	public void setIndentSaleCdAmt(Double indentSaleCdAmt) {
		this.indentSaleCdAmt = indentSaleCdAmt;
	}

	public Integer getIndentSaleDeleteFlag() {
		return indentSaleDeleteFlag;
	}

	public void setIndentSaleDeleteFlag(Integer indentSaleDeleteFlag) {
		this.indentSaleDeleteFlag = indentSaleDeleteFlag;
	}

	public Date getIndentSaleUpdateDate() {
		return indentSaleUpdateDate;
	}

	public void setIndentSaleUpdateDate(Date indentSaleUpdateDate) {
		this.indentSaleUpdateDate = indentSaleUpdateDate;
	}

	public int getIndentBillMode() {
		return indentBillMode;
	}

	public void setIndentBillMode(int indentBillMode) {
		this.indentBillMode = indentBillMode;
	}

	public Double getIndentSaleAmountReceive() {
		return indentSaleAmountReceive;
	}

	public void setIndentSaleAmountReceive(Double indentSaleAmountReceive) {
		this.indentSaleAmountReceive = indentSaleAmountReceive;
	}

	public Double getIndentSaleAmountBalance() {
		return indentSaleAmountBalance;
	}

	public void setIndentSaleAmountBalance(Double indentSaleAmountBalance) {
		this.indentSaleAmountBalance = indentSaleAmountBalance;
	}

	public Double getIndentSalePreviousBalance() {
		return indentSalePreviousBalance;
	}

	public void setIndentSalePreviousBalance(Double indentSalePreviousBalance) {
		this.indentSalePreviousBalance = indentSalePreviousBalance;
	}

	public Integer getIndentSaleStoreId() {
		return indentSaleStoreId;
	}

	public void setIndentSaleStoreId(Integer indentSaleStoreId) {
		this.indentSaleStoreId = indentSaleStoreId;
	}

	public Integer getIndentSaleUserId() {
		return indentSaleUserId;
	}

	public void setIndentSaleUserId(Integer indentSaleUserId) {
		this.indentSaleUserId = indentSaleUserId;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public Double getIndentTaxVat55() {
		return indentTaxVat55;
	}

	public void setIndentTaxVat55(Double indentTaxVat55) {
		this.indentTaxVat55 = indentTaxVat55;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getIndentSaleCardNum() {
		return indentSaleCardNum;
	}

	public void setIndentSaleCardNum(String indentSaleCardNum) {
		this.indentSaleCardNum = indentSaleCardNum;
	}

	
	
	
	
}
