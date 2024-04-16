package com.hms.common.dto;
// Generated Sep 18, 2017 5:09:54 PM  

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

 
/**
 * TmCmLookupDet  
 */
@Entity
@Table(name = "tm_cm_lookup_det")
public class TmCmLookupDet implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int lookupDetId;
	private TmCmLookup tmCmLookup;
	private int ulbId;
	private String lookupDetValue;
	private String lookupDetDescEn;
	private String lookupDetDescRg;
	private Integer lookupDetParentId;
	private Integer lookupDetParentLevel;
	private Integer lookupDetStatus;
	private Integer createdBy;
	private Date createdDate;
	private Integer updatedBy;
	private Date updatedDate;
	private String macId;
	private String ipAddress;
	private String deviceFrom;
	private String lookupDetOthers;
	private String lookupDetDefault;
	private String stateUlbFlag;
	private Integer lookupOrderby;
	
	List<TmCmLookupDet> listTmCmLookupDet;


	public TmCmLookupDet() {
	}
	
	public TmCmLookupDet(int lookupDetId) {
		this.lookupDetId = lookupDetId;
	}
	
	public TmCmLookupDet(String lookupDetDescEn) {
		this.lookupDetDescEn=lookupDetDescEn;
	}
	public TmCmLookupDet(String lookupDetDescEn, String lookupDetDescRg) {
		this.lookupDetDescEn=lookupDetDescEn;
		this.lookupDetDescRg=lookupDetDescRg;
	}
	
	public TmCmLookupDet(int lookupDetId,String lookupDetDescEn, String lookupDetDescRg) {
		this.lookupDetId=lookupDetId;
		this.lookupDetDescEn=lookupDetDescEn;
		this.lookupDetDescRg=lookupDetDescRg;
	}

	public TmCmLookupDet(int lookupDetId, TmCmLookup tmCmLookup, int ulbId, String lookupDetValue,
			String lookupDetDescEn) {
		this.lookupDetId = lookupDetId;
		this.tmCmLookup = tmCmLookup;
		this.ulbId = ulbId;
		this.lookupDetValue = lookupDetValue;
		this.lookupDetDescEn = lookupDetDescEn;
	}

	public TmCmLookupDet(int lookupDetId, TmCmLookup tmCmLookup, int ulbId, String lookupDetValue,
			String lookupDetDescEn, String lookupDetDescRg, Integer lookupDetParentId, Integer lookupDetParentLevel,
			Integer lookupDetStatus, Integer createdBy, Date createdDate, Integer updatedBy, Date updatedDate,
			String macId, String ipAddress, String deviceFrom, String lookupDetOthers, String lookupDetDefault,
			String stateUlbFlag, Integer lookupOrderby) {
		this.lookupDetId = lookupDetId;
		this.tmCmLookup = tmCmLookup;
		this.ulbId = ulbId;
		this.lookupDetValue = lookupDetValue;
		this.lookupDetDescEn = lookupDetDescEn;
		this.lookupDetDescRg = lookupDetDescRg;
		this.lookupDetParentId = lookupDetParentId;
		this.lookupDetParentLevel = lookupDetParentLevel;
		this.lookupDetStatus = lookupDetStatus;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.updatedBy = updatedBy;
		this.updatedDate = updatedDate;
		this.macId = macId;
		this.ipAddress = ipAddress;
		this.deviceFrom = deviceFrom;
		this.lookupDetOthers = lookupDetOthers;
		this.lookupDetDefault = lookupDetDefault;
		this.stateUlbFlag = stateUlbFlag;
		this.lookupOrderby = lookupOrderby;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "lookup_det_id", unique = true, nullable = false)
	public int getLookupDetId() {
		return this.lookupDetId;
	}

	public void setLookupDetId(int lookupDetId) {
		this.lookupDetId = lookupDetId;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "lookup_id", nullable = false)
	public TmCmLookup getTmCmLookup() {
		return this.tmCmLookup;
	}

	public void setTmCmLookup(TmCmLookup tmCmLookup) {
		this.tmCmLookup = tmCmLookup;
	}

	@Column(name = "ulb_id", nullable = false)
	public int getUlbId() {
		return this.ulbId;
	}

	public void setUlbId(int ulbId) {
		this.ulbId = ulbId;
	}

	@Column(name = "lookup_det_value", nullable = false, length = 50)
	public String getLookupDetValue() {
		return this.lookupDetValue;
	}

	public void setLookupDetValue(String lookupDetValue) {
		this.lookupDetValue = lookupDetValue;
	}

	@Column(name = "lookup_det_desc_en", nullable = false, length = 200)
	public String getLookupDetDescEn() {
		return this.lookupDetDescEn;
	}

	public void setLookupDetDescEn(String lookupDetDescEn) {
		this.lookupDetDescEn = lookupDetDescEn;
	}

	@Column(name = "lookup_det_desc_rg", length = 200)
	public String getLookupDetDescRg() {
		return this.lookupDetDescRg;
	}

	public void setLookupDetDescRg(String lookupDetDescRg) {
		this.lookupDetDescRg = lookupDetDescRg;
	}

	@Column(name = "lookup_det_parent_id")
	public Integer getLookupDetParentId() {
		return this.lookupDetParentId;
	}

	public void setLookupDetParentId(Integer lookupDetParentId) {
		this.lookupDetParentId = lookupDetParentId;
	}

	@Column(name = "lookup_det_parent_level")
	public Integer getLookupDetParentLevel() {
		return this.lookupDetParentLevel;
	}

	public void setLookupDetParentLevel(Integer lookupDetParentLevel) {
		this.lookupDetParentLevel = lookupDetParentLevel;
	}

	@Column(name = "lookup_det_status")
	public Integer getLookupDetStatus() {
		return this.lookupDetStatus;
	}

	public void setLookupDetStatus(Integer lookupDetStatus) {
		this.lookupDetStatus = lookupDetStatus;
	}

	@Column(name = "created_by")
	public Integer getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date", length = 29)
	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Column(name = "updated_by")
	public Integer getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(Integer updatedBy) {
		this.updatedBy = updatedBy;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date", length = 29)
	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	@Column(name = "mac_id", length = 50)
	public String getMacId() {
		return this.macId;
	}

	public void setMacId(String macId) {
		this.macId = macId;
	}

	@Column(name = "ip_address", length = 50)
	public String getIpAddress() {
		return this.ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	@Column(name = "device_from", length = 10)
	public String getDeviceFrom() {
		return this.deviceFrom;
	}

	public void setDeviceFrom(String deviceFrom) {
		this.deviceFrom = deviceFrom;
	}

	@Column(name = "lookup_det_others", length = 200)
	public String getLookupDetOthers() {
		return this.lookupDetOthers;
	}

	public void setLookupDetOthers(String lookupDetOthers) {
		this.lookupDetOthers = lookupDetOthers;
	}

	@Column(name = "lookup_det_default", length = 10)
	public String getLookupDetDefault() {
		return this.lookupDetDefault;
	}

	public void setLookupDetDefault(String lookupDetDefault) {
		this.lookupDetDefault = lookupDetDefault;
	}

	@Column(name = "state_ulb_flag", length = 10)
	public String getStateUlbFlag() {
		return this.stateUlbFlag;
	}

	public void setStateUlbFlag(String stateUlbFlag) {
		this.stateUlbFlag = stateUlbFlag;
	}

	@Column(name = "lookup_orderby")
	public Integer getLookupOrderby() {
		return this.lookupOrderby;
	}

	public void setLookupOrderby(Integer lookupOrderby) {
		this.lookupOrderby = lookupOrderby;
	}

	@Transient
	public List<TmCmLookupDet> getListTmCmLookupDet() {
		return listTmCmLookupDet;
	}

	public void setListTmCmLookupDet(List<TmCmLookupDet> listTmCmLookupDet) {
		this.listTmCmLookupDet = listTmCmLookupDet;
	}
	
	
}
