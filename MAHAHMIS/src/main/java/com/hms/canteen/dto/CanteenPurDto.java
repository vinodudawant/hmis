package com.hms.canteen.dto;

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
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

@Entity
@Table(name = "ehat_canteen_purchase")
public class CanteenPurDto implements Serializable{
	@Transient
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name="pur_id")
	private int purchId;
	
	@Column(name = "purchase_by")
	private String purchaseby;
	
	@Column(name = "count",columnDefinition="int default 0")
	private int count;
	
	@Column(name = "totalAMount")
	private double totalAMount=0.0;
	
	@Column(name = "totalAMountgst")
	private double totalAMountgst=0.0;
	
	@Column(name = "gstAmt")
	private double gstAmt=0.0;
	
	@Column(name = "gstper",columnDefinition="int default 0")
	private int gstper;
	
	@Column(name = "paidamt")
	private double paidamt=0.0;
	
	@Column(name = "paytype",columnDefinition="int default 0")
	private int paytype;
	
	@Column(name = "cardno",columnDefinition="varchar(52) default 'NA'")
	private String cardno;
	
	@Column(name = "batchno",columnDefinition="varchar(52) default 'NA'")
	private String batchno;
	
	@Column(name = "remainingamt")
	private double remainingamt=0.0;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId;
	
	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted;

	@Column(name = "description")
	private String description;
	
	@Column(name = "refBillNo")
	private String refBillNo;

	@Column(name = "created_by",updatable=false)
	private Integer createdBy;
	
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
	
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(value=LazyCollectionOption.FALSE)
	@JoinColumn(name = "pur_slave_master_id", referencedColumnName = "pur_id")
	private List<CanteenPurSlaveDto> ltCanteenSlave = new ArrayList<CanteenPurSlaveDto>();
	
	@Transient
	private List<CanteenPurDto> lstmaster;

	public int getPurchId() {
		return purchId;
	}

	public void setPurchId(int purchId) {
		this.purchId = purchId;
	}

	public String getPurchaseby() {
		return purchaseby;
	}

	public void setPurchaseby(String purchaseby) {
		this.purchaseby = purchaseby;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public double getTotalAMount() {
		return totalAMount;
	}

	public void setTotalAMount(double totalAMount) {
		this.totalAMount = totalAMount;
	}

	public double getTotalAMountgst() {
		return totalAMountgst;
	}

	public void setTotalAMountgst(double totalAMountgst) {
		this.totalAMountgst = totalAMountgst;
	}

	public double getGstAmt() {
		return gstAmt;
	}

	public void setGstAmt(double gstAmt) {
		this.gstAmt = gstAmt;
	}

	public int getGstper() {
		return gstper;
	}

	public void setGstper(int gstper) {
		this.gstper = gstper;
	}

	public double getPaidamt() {
		return paidamt;
	}

	public void setPaidamt(double paidamt) {
		this.paidamt = paidamt;
	}

	public int getPaytype() {
		return paytype;
	}

	public void setPaytype(int paytype) {
		this.paytype = paytype;
	}

	public String getCardno() {
		return cardno;
	}

	public void setCardno(String cardno) {
		this.cardno = cardno;
	}

	public String getBatchno() {
		return batchno;
	}

	public void setBatchno(String batchno) {
		this.batchno = batchno;
	}

	public double getRemainingamt() {
		return remainingamt;
	}

	public void setRemainingamt(double remainingamt) {
		this.remainingamt = remainingamt;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getRefBillNo() {
		return refBillNo;
	}

	public void setRefBillNo(String refBillNo) {
		this.refBillNo = refBillNo;
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

	public List<CanteenPurSlaveDto> getLtCanteenSlave() {
		return ltCanteenSlave;
	}

	public void setLtCanteenSlave(List<CanteenPurSlaveDto> ltCanteenSlave) {
		this.ltCanteenSlave = ltCanteenSlave;
	}

	public List<CanteenPurDto> getLstmaster() {
		return lstmaster;
	}

	public void setLstmaster(List<CanteenPurDto> lstmaster) {
		this.lstmaster = lstmaster;
	}
	
	
}
