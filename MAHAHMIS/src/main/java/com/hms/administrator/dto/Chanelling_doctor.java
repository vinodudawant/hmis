package com.hms.administrator.dto;

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

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.dto.Chanelling_Hospital;
@Entity
@Table(name="chanelling_doctor")
public class Chanelling_doctor {
	@Id
	@GeneratedValue
	@Column(name = "channDocId")
	private int channDocId;
	
	@Column(name = "prefix_id")
	private Integer prefixId;//added by dayanand 23-1-2020 for storing prefix id
	
	@Column(name = "prefix")
	private String prefix;
	
	@Column(name = "docName")
	private String docName;
	
	@Column(name = "referFees")
	private Float referFees;
	
	@Column(name = "ref_doc_per")
	private Double refDocPer;
	
	@Column(name = "specility")
	private String specility;
	
	@Column(name = "hospitalName")	
	private String hospitalName;
	
	@Column(name = "contactNo")
	private String contactNo;
	
	@Column(name = "mobile")
	private String mobileNo;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "address")
	private String address;
	
	@Column(name = "doctorType")
	private String doctorType;
	
	@Column(name = "status")
	private String status;
	
	
	
	
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;

	@Column(name = "updated_by")
	private Integer updatedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date_time", updatable = false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_date_time")
	private Date updatedDate;

	@Column(name = "deleted",columnDefinition="varchar(2) default 'N'")
	private String deleted="N";

	@Column(name = "deleted_by")
	private Integer deletedBy;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "delete_date_time")
	private Date deletedDate;
	
	@Column(name = "unit_id")
	private Integer unitId;

	@Transient
	private List<Chanelling_doctor> chann_docList;
	
	@Transient
	private List<Chanelling_Hospital> chann_hosList;
	
	@JsonGetter("doctorType")
	public String getDoctorType() {
		return doctorType;
	}
	@JsonSetter("doctorType")
	public void setDoctorType(String doctorType) {
		this.doctorType = doctorType;
	}

	/**
	 * @return the chann_docList
	 */
	@JsonGetter("cdl")
	public List<Chanelling_doctor> getChann_docList() {
		return chann_docList;
	}

	/**
	 * @param chann_docList
	 *            the chann_docList to set
	 */
	@JsonSetter("cdl")
	public void setChann_docList(List<Chanelling_doctor> chann_docList) {
		this.chann_docList = chann_docList;
	}

	/**
	 * @return the channDocId
	 */
	@JsonGetter("cid")
	public int getChannDocId() {
		return channDocId;
	}

	/**
	 * @param channDocId
	 *            the channDocId to set
	 */
	@JsonSetter("cid")
	public void setChannDocId(int channDocId) {
		this.channDocId = channDocId;
	}

	/**
	 * @return the docName
	 */
	@JsonGetter("cdn")
	public String getDocName() {
		return docName;
	}

	/**
	 * @param docName
	 *            the docName to set
	 */
	@JsonSetter("cdn")
	public void setDocName(String docName) {
		this.docName = docName;
	}

	/**
	 * @return the referFees
	 */
	@JsonGetter("rf")
	public Float getReferFees() {
		return referFees;
	}

	/**
	 * @param referFees
	 *            the referFees to set
	 */
	@JsonSetter("rf")
	public void setReferFees(Float referFees) {
		this.referFees = referFees;
	}

	/**
	 * @return the specility
	 */
	@JsonGetter("ds")
	public String getSpecility() {
		return specility;
	}

	/**
	 * @param specility
	 *            the specility to set
	 */
	@JsonSetter("ds")
	public void setSpecility(String specility) {
		this.specility = specility;
	}

	/**
	 * @return the hospitalName
	 */
	@JsonGetter("hn")
	public String getHospitalName() {
		return hospitalName;
	}

	/**
	 * @param hospitalName
	 *            the hospitalName to set
	 */
	@JsonSetter("hn")
	public void setHospitalName(String hospitalName) {
		this.hospitalName = hospitalName;
	}

	/**
	 * @return the contactNo
	 */
	@JsonGetter("dcn")
	public String getContactNo() {
		return contactNo;
	}

	/**
	 * @param contactNo
	 *            the contactNo to set
	 */
	@JsonSetter("dcn")
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	@JsonGetter("chann_hosList")
	public List<Chanelling_Hospital> getChann_hosList() {
		return chann_hosList;
	}
	@JsonSetter("chann_hosList")
	public void setChann_hosList(List<Chanelling_Hospital> chann_hosList) {
		this.chann_hosList = chann_hosList;
	}
	@JsonGetter("mobileNo")
	public String getMobileNo() {
		return mobileNo;
	}
	@JsonSetter("mobileNo")
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	@JsonGetter("email")
	public String getEmail() {
		return email;
	}
	@JsonSetter("email")
	public void setEmail(String email) {
		this.email = email;
	}
	@JsonGetter("address")
	public String getAddress() {
		return address;
	}
	@JsonSetter("address")
	public void setAddress(String address) {
		this.address = address;
	}
	@JsonGetter("refDocPer")
	public Double getRefDocPer() {
		return refDocPer;
	}
	@JsonSetter("refDocPer")
	public void setRefDocPer(Double refDocPer) {
		this.refDocPer = refDocPer;
	}
	@JsonGetter("prefix")
	public String getPrefix() {
		return prefix;
	}
	@JsonSetter("prefix")
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}
	public Integer getPrefixId() {
		return prefixId;
	}
	public void setPrefixId(Integer prefixId) {
		this.prefixId = prefixId;
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
	public Date getCreatedDate() {
		return createdDate;
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
	public String getDeleted() {
		return deleted;
	}
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}
	public Integer getDeletedBy() {
		return deletedBy;
	}
	public void setDeletedBy(Integer deletedBy) {
		this.deletedBy = deletedBy;
	}
	public Date getDeletedDate() {
		return deletedDate;
	}
	public void setDeletedDate(Date deletedDate) {
		this.deletedDate = deletedDate;
	}
	public Integer getUnitId() {
		return unitId;
	}
	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	
	
	
	

}
