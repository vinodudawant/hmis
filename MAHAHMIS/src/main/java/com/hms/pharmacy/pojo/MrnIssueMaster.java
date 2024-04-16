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

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "pharma_mrn_issue_master")
public class MrnIssueMaster {
	@Id
	@GeneratedValue
	@Column(name = "mrn_issue_id")
	private Integer mrnIssueId;

	@Column(name = "mrn_issue_doc_no")
	private String 	mrnIssueDocNo=null;

	@ManyToOne
	@JoinColumn(name = "mrn_issue_mrn_id")
	private MrnMaster mrnMaster=null;
	
	@Column(name = "mrn_issue_received_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private Date mrnReceivedDate;
	
	@Column(name="mrn_issue_received_time")
	private String mrnIssueReceiveTime;

	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name = "mrn_issue_slave_master_id", referencedColumnName = "mrn_issue_id")
	private List<MrnIssueSlave> mrnIssueSlaves = new ArrayList<MrnIssueSlave>();
	
	@Column(name = "mrn_issue_narration")
	private String mrnIssueNarration=null;

	@Column(name = "mrn_issue_gross_amt")
	private Double mrnIssueGrossAmt=null;

	@Column(name = "mrn_issue_add")
	private Double mrnIssueAdd=null;

	@Column(name = "mrn_issue_less")
	private Double mrnIssueLess=null;

	@Column(name = "mrn_issue_net_amt")
	private Double mrnIssueNetAmt=null;

	@Column(name = "mrn_issue_special_disc")
	private Double mrnIssueSpecialDisc=null;

	@Column(name = "mrn_issue_surcharges")
	private Double mrnIssueSurcharges=null;

	@Column(name = "mrn_issue_round")
	private Double mrnIssueRound=null;

	@Column(name = "mrn_issue_cn")
	private Double mrnIssueCN=null;

	@Column(name = "mrn_issue_cd")
	private Double mrnIssueCD=null;

	@Column(name = "mrn_issue_cn_amt")
	private Double mrnIssueCnAmt=null;
	
	@Column(name = "mrn_issue_amt_receive")
	private Double mrnIssueAmountReceive=null;
	
	@Column(name = "mrn_issue_amt_balance")
	private Double mrnIssueAmountBalance=null;
	
	@Column(name = "mrn_issue_previous_balance")
	private Double mrnIssuePreviousBalance=null;

	@Column(name = "mrn_issue_cd_amt")
	private Double mrnIssueCdAmt=null;

	@Column(name = "mrn_issue_delete_flag")
	private Integer mrnIssueDeleteFlag=0;

	@Column(name = "mrn_issue_update_date")
	private Date mrnIssueUpdateDate;
	
	@Column(name="mrn_issue_mode")
	private int mrnIssueBillMode=0;
	
	@Column(name="mrn_added_by")
	private String mrnAddedBy=null;
	
	@Column(name="mrn_mod_by")
	private String mrnModBy=null;
	
	@Column(name="mrn_issue_store_id")
	private String storeId=null;
	
	@Column(name="mrn_issue_main_store_id")
	private String mainStoreId=null;
	
	@Column(name="mrn_issue_store_name")
	private String storeName=null;
	
	@Column(name="unit_id")
	private Integer unitId=0;
	
	public String getMainStoreId() {
		return mainStoreId;
	}

	public void setMainStoreId(String mainStoreId) {
		this.mainStoreId = mainStoreId;
	}

	public Integer getMrnIssueId() {
		return mrnIssueId;
	}

	public void setMrnIssueId(Integer mrnIssueId) {
		this.mrnIssueId = mrnIssueId;
	}

	public String getMrnIssueDocNo() {
		return mrnIssueDocNo;
	}

	public void setMrnIssueDocNo(String mrnIssueDocNo) {
		this.mrnIssueDocNo = mrnIssueDocNo;
	}

	public MrnMaster getMrnMaster() {
		return mrnMaster;
	}

	public void setMrnMaster(MrnMaster mrnMaster) {
		this.mrnMaster = mrnMaster;
	}

	public Date getMrnReceivedDate() {
		return mrnReceivedDate;
	}

	public void setMrnReceivedDate(Date mrnReceivedDate) {
		this.mrnReceivedDate = mrnReceivedDate;
	}

	public List<MrnIssueSlave> getMrnIssueSlaves() {
		return mrnIssueSlaves;
	}

	public void setMrnIssueSlaves(List<MrnIssueSlave> mrnIssueSlaves) {
		this.mrnIssueSlaves = mrnIssueSlaves;
	}

	public String getMrnIssueNarration() {
		return mrnIssueNarration;
	}

	public void setMrnIssueNarration(String mrnIssueNarration) {
		this.mrnIssueNarration = mrnIssueNarration;
	}

	public Double getMrnIssueGrossAmt() {
		return mrnIssueGrossAmt;
	}

	public void setMrnIssueGrossAmt(Double mrnIssueGrossAmt) {
		this.mrnIssueGrossAmt = mrnIssueGrossAmt;
	}

	public Double getMrnIssueAdd() {
		return mrnIssueAdd;
	}

	public void setMrnIssueAdd(Double mrnIssueAdd) {
		this.mrnIssueAdd = mrnIssueAdd;
	}

	public Double getMrnIssueLess() {
		return mrnIssueLess;
	}

	public void setMrnIssueLess(Double mrnIssueLess) {
		this.mrnIssueLess = mrnIssueLess;
	}

	public Double getMrnIssueNetAmt() {
		return mrnIssueNetAmt;
	}

	public void setMrnIssueNetAmt(Double mrnIssueNetAmt) {
		this.mrnIssueNetAmt = mrnIssueNetAmt;
	}

	public Double getMrnIssueSpecialDisc() {
		return mrnIssueSpecialDisc;
	}

	public void setMrnIssueSpecialDisc(Double mrnIssueSpecialDisc) {
		this.mrnIssueSpecialDisc = mrnIssueSpecialDisc;
	}

	public Double getMrnIssueSurcharges() {
		return mrnIssueSurcharges;
	}

	public void setMrnIssueSurcharges(Double mrnIssueSurcharges) {
		this.mrnIssueSurcharges = mrnIssueSurcharges;
	}

	public Double getMrnIssueRound() {
		return mrnIssueRound;
	}

	public void setMrnIssueRound(Double mrnIssueRound) {
		this.mrnIssueRound = mrnIssueRound;
	}

	public Double getMrnIssueCN() {
		return mrnIssueCN;
	}

	public void setMrnIssueCN(Double mrnIssueCN) {
		this.mrnIssueCN = mrnIssueCN;
	}

	public Double getMrnIssueCD() {
		return mrnIssueCD;
	}

	public void setMrnIssueCD(Double mrnIssueCD) {
		this.mrnIssueCD = mrnIssueCD;
	}

	public Double getMrnIssueCnAmt() {
		return mrnIssueCnAmt;
	}

	public void setMrnIssueCnAmt(Double mrnIssueCnAmt) {
		this.mrnIssueCnAmt = mrnIssueCnAmt;
	}

	public Double getMrnIssueAmountReceive() {
		return mrnIssueAmountReceive;
	}

	public void setMrnIssueAmountReceive(Double mrnIssueAmountReceive) {
		this.mrnIssueAmountReceive = mrnIssueAmountReceive;
	}

	public Double getMrnIssueAmountBalance() {
		return mrnIssueAmountBalance;
	}

	public void setMrnIssueAmountBalance(Double mrnIssueAmountBalance) {
		this.mrnIssueAmountBalance = mrnIssueAmountBalance;
	}

	public Double getMrnIssuePreviousBalance() {
		return mrnIssuePreviousBalance;
	}

	public void setMrnIssuePreviousBalance(Double mrnIssuePreviousBalance) {
		this.mrnIssuePreviousBalance = mrnIssuePreviousBalance;
	}

	public Double getMrnIssueCdAmt() {
		return mrnIssueCdAmt;
	}

	public void setMrnIssueCdAmt(Double mrnIssueCdAmt) {
		this.mrnIssueCdAmt = mrnIssueCdAmt;
	}

	public Integer getMrnIssueDeleteFlag() {
		return mrnIssueDeleteFlag;
	}

	public void setMrnIssueDeleteFlag(Integer mrnIssueDeleteFlag) {
		this.mrnIssueDeleteFlag = mrnIssueDeleteFlag;
	}

	public Date getMrnIssueUpdateDate() {
		return mrnIssueUpdateDate;
	}

	public void setMrnIssueUpdateDate(Date mrnIssueUpdateDate) {
		this.mrnIssueUpdateDate = mrnIssueUpdateDate;
	}

	public int getMrnIssueBillMode() {
		return mrnIssueBillMode;
	}

	public void setMrnIssueBillMode(int mrnIssueBillMode) {
		this.mrnIssueBillMode = mrnIssueBillMode;
	}

	public String getMrnAddedBy() {
		return mrnAddedBy;
	}

	public void setMrnAddedBy(String mrnAddedBy) {
		this.mrnAddedBy = mrnAddedBy;
	}

	public String getMrnModBy() {
		return mrnModBy;
	}

	public void setMrnModBy(String mrnModBy) {
		this.mrnModBy = mrnModBy;
	}

	public String getStoreId() {
		return storeId;
	}

	public void setStoreId(String storeId) {
		this.storeId = storeId;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getMrnIssueReceiveTime() {
		return mrnIssueReceiveTime;
	}

	public void setMrnIssueReceiveTime(String mrnIssueReceiveTime) {
		this.mrnIssueReceiveTime = mrnIssueReceiveTime;
	}

	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	
	
}