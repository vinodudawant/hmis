package com.hms.common.dto;
// Generated Sep 18, 2017 5:09:54 PM  

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

/**
 * TmCmLookup  
 */
@Entity
@Table(name = "tm_cm_lookup")
public class TmCmLookup implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int lookupId;
	private String lookupCode;
	private String lookupDescEn;
	private String lookupDescRg;
	private Integer modId;
	private Character hierarchical;
	private Integer hierarchicalNoLevel;
	private Character lookupAddFlag;
	private Character lookupEditFlag;
	private Character flagStateUlb;
	private Character lookupStatus;
	private Integer createdBy;
	private Date createdDate;
	private Integer updatedBy;
	private Date updatedDate;
	private String macId;
	private String ipAddress;
	private Character deviceFrom;
	private String acMapFlag;
	private String moduleName;
	private String detValidation;
	private Set<TmCmLookupDet> tmCmLookupDets = new HashSet<>(0);

	public TmCmLookup() {
	}

	
	public TmCmLookup(int lookupId) {
		this.lookupId = lookupId;
		
	}
	public TmCmLookup(int lookupId, String lookupCode, String lookupDescEn) {
		this.lookupId = lookupId;
		this.lookupCode = lookupCode;
		this.lookupDescEn = lookupDescEn;
	}

	public TmCmLookup(int lookupId, String lookupCode, String lookupDescEn, String lookupDescRg, Integer modId,
			Character hierarchical, Integer hierarchicalNoLevel, Character lookupAddFlag, Character lookupEditFlag,
			Character flagStateUlb, Character lookupStatus, Integer createdBy, Date createdDate, Integer updatedBy,
			Date updatedDate, String macId, String ipAddress, Character deviceFrom, String acMapFlag,
			Set<TmCmLookupDet> tmCmLookupDets) {
		this.lookupId = lookupId;
		this.lookupCode = lookupCode;
		this.lookupDescEn = lookupDescEn;
		this.lookupDescRg = lookupDescRg;
		this.modId = modId;
		this.hierarchical = hierarchical;
		this.hierarchicalNoLevel = hierarchicalNoLevel;
		this.lookupAddFlag = lookupAddFlag;
		this.lookupEditFlag = lookupEditFlag;
		this.flagStateUlb = flagStateUlb;
		this.lookupStatus = lookupStatus;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.updatedBy = updatedBy;
		this.updatedDate = updatedDate;
		this.macId = macId;
		this.ipAddress = ipAddress;
		this.deviceFrom = deviceFrom;
		this.acMapFlag = acMapFlag;
		this.tmCmLookupDets = tmCmLookupDets;
	}

	
	@Id
	@GeneratedValue
	@Column(name = "lookup_id", unique = true, nullable = false)
	public int getLookupId() {
		return this.lookupId;
	}

	public void setLookupId(int lookupId) {
		this.lookupId = lookupId;
	}

	@Column(name = "lookup_code", unique = true, nullable = false, length = 5)
	public String getLookupCode() {
		return this.lookupCode;
	}

	public void setLookupCode(String lookupCode) {
		this.lookupCode = lookupCode;
	}

	@Column(name = "lookup_desc_en", nullable = false, length = 200)
	public String getLookupDescEn() {
		return this.lookupDescEn;
	}

	public void setLookupDescEn(String lookupDescEn) {
		this.lookupDescEn = lookupDescEn;
	}

	@Column(name = "lookup_desc_rg", length = 200)
	public String getLookupDescRg() {
		return this.lookupDescRg;
	}

	public void setLookupDescRg(String lookupDescRg) {
		this.lookupDescRg = lookupDescRg;
	}

	@Column(name = "mod_id")
	public Integer getModId() {
		return this.modId;
	}

	public void setModId(Integer modId) {
		this.modId = modId;
	}

	@Column(name = "hierarchical", length = 1)
	public Character getHierarchical() {
		return this.hierarchical;
	}

	public void setHierarchical(Character hierarchical) {
		this.hierarchical = hierarchical;
	}

	@Column(name = "hierarchical_no_level")
	public Integer getHierarchicalNoLevel() {
		return this.hierarchicalNoLevel;
	}

	public void setHierarchicalNoLevel(Integer hierarchicalNoLevel) {
		this.hierarchicalNoLevel = hierarchicalNoLevel;
	}

	@Column(name = "lookup_add_flag", length = 1)
	public Character getLookupAddFlag() {
		return this.lookupAddFlag;
	}

	public void setLookupAddFlag(Character lookupAddFlag) {
		this.lookupAddFlag = lookupAddFlag;
	}

	@Column(name = "lookup_edit_flag", length = 1)
	public Character getLookupEditFlag() {
		return this.lookupEditFlag;
	}

	public void setLookupEditFlag(Character lookupEditFlag) {
		this.lookupEditFlag = lookupEditFlag;
	}

	@Column(name = "flag_state_ulb", length = 1)
	public Character getFlagStateUlb() {
		return this.flagStateUlb;
	}

	public void setFlagStateUlb(Character flagStateUlb) {
		this.flagStateUlb = flagStateUlb;
	}

	@Column(name = "lookup_status", length = 1)
	public Character getLookupStatus() {
		return this.lookupStatus;
	}

	public void setLookupStatus(Character lookupStatus) {
		this.lookupStatus = lookupStatus;
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

	@Column(name = "device_from", length = 1)
	public Character getDeviceFrom() {
		return this.deviceFrom;
	}

	public void setDeviceFrom(Character deviceFrom) {
		this.deviceFrom = deviceFrom;
	}

	@Column(name = "ac_map_flag", length = 1)
	public String getAcMapFlag() {
		return this.acMapFlag;
	}

	public void setAcMapFlag(String acMapFlag) {
		this.acMapFlag = acMapFlag;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "tmCmLookup")
	public Set<TmCmLookupDet> getTmCmLookupDets() {
		return this.tmCmLookupDets;
	}

	public void setTmCmLookupDets(Set<TmCmLookupDet> tmCmLookupDets) {
		this.tmCmLookupDets = tmCmLookupDets;
	}

	@Transient
	public String getModuleName() {
		return moduleName;
	}


	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}

	@Column(name = "det_validation")
	public String getDetValidation() {
		return detValidation;
	}

	public void setDetValidation(String detValidation) {
		this.detValidation = detValidation;
	}

}
