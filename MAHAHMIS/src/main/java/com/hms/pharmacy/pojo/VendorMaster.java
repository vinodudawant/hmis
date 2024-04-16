package com.hms.pharmacy.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "pharma_vendor_master")
public class VendorMaster {
	@Id
	@GeneratedValue
	@Column(name = "vendor_id")
	private Integer vendorId=0;

	@Column(name = "vendor_code")
	private String vendorCode;

	@Column(name = "vendor_name")
	private String vendorName;

	@Column(name = "vendor_address")
	private String vendorAddress;
	
	//@OneToMany(fetch = FetchType.EAGER ,cascade = {CascadeType.ALL})
	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(value = LazyCollectionOption.FALSE)
	@JoinColumn(name="vendorId", nullable=false)
	private List<VendorAddress> vendorAddresses=new ArrayList<VendorAddress>();

	
	/*@Column(name = "vendor_area")
	private String vendorArea;*/

	/*@Column(name = "vendor_landline")
	private String vendorLandline;*/

	@Column(name = "vendor_mobile_num")
	private String vendorMobileNumber;

	public List<VendorAddress> getVendorAddresses() {
		return vendorAddresses;
	}

	public void setVendorAddresses(List<VendorAddress> vendorAddresses) {
		this.vendorAddresses = vendorAddresses;
	}

	@Column(name = "vendor_contact_person")
	private String vendorContactPerson;

	/*@Column(name = "vendor_email_Id")
	private String vendorEmailId;*/

	@Column(name = "vendor_drug_lic_num")
	private String vendorDrugLicNum;

	@Column(name = "vendor_vat_tin")
	private String vendorVatTin;

	@Column(name = "vendor_lbt_num")
	private String vendorLbtNum;

	@Column(name = "vendor_cst_tin")
	private String vendorCstTin;

	@Column(name = "vendor_desc")
	private String vendorDesc;

	@Column(name = "vendor_mscda_party_code")
	private String vendorMscdaPartyCode;
	
	/*@Column(name = "vendor_gstn")
	private String gstNo;*/

	@Column(name = "vendor_delete_flag")
	private Integer vendorDeleteFlag;
	
	@UpdateTimestamp
	@Column(name = "vendor_update_date")
	private Date vendorUpdateDate;
	
	/*
	 * @Temporal(TemporalType.TIMESTAMP)
	 * 
	 * @Column(name = "delete_date_time") private Date deletedDate;
	 * 
	 * 
	 * @Column(name="user_id") private int userId;
	 * 
	 * @Column(name="unit_id") private Integer unitId;
	 */
	/*
	 * public Date getDeletedDate() { return deletedDate; }
	 * 
	 * public void setDeletedDate(Date deletedDate) { this.deletedDate =
	 * deletedDate; }
	 * 
	 * public int getUserId() { return userId; }
	 * 
	 * public void setUserId(int userId) { this.userId = userId; }
	 * 
	 * public Integer getUnitId() { return unitId; }
	 */
	/*
	 * public void setUnitId(Integer unitId) { this.unitId = unitId; }
	 */
	/*
	 * public void setVendorId(int vendorId) { this.vendorId = vendorId; }
	 */

	//@ManyToMany(mappedBy = "vendorMasters")
	/*
	 * @Cascade({ CascadeType.ALL })
	 * 
	 * @LazyCollection(LazyCollectionOption.FALSE)
	 */
	@Transient
	private List<ProductMaster> productMasters = new ArrayList<ProductMaster>();
	
	@CreationTimestamp
	@Column(name = "vendor_add_date")
	private Date vendorAddDate;
	
	/*@Column(name = "vendor_city")
	private String city;

	@Column(name = "vendor_district")
	private String district;

	@Column(name = "vendor_state")
	private String state;

	@Column(name = "vendor_pincode")
	private String pincode;*/
	
	
	/*public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}*/

	/*public String getGstNo() {
		return gstNo;
	}

	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}
*/
	public Date getVendorAddDate() {
		return vendorAddDate;
	}

	public void setVendorAddDate(Date vendorAddDate) {
		this.vendorAddDate = vendorAddDate;
	}

	@JsonIgnore
	public List<ProductMaster> getProductMasters() {
		return productMasters;
	}

	public void setProductMasters(List<ProductMaster> productMasters) {
		this.productMasters = productMasters;
	}

	public Integer getVendorId() {
		return vendorId;
	}

	public void setVendorId(Integer vendorId) {
		this.vendorId = vendorId;
	}

	public String getVendorCode() {
		return vendorCode;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getVendorAddress() {
		return vendorAddress;
	}

	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}

	/*public String getVendorArea() {
		return vendorArea;
	}

	public void setVendorArea(String vendorArea) {
		this.vendorArea = vendorArea;
	}

	public String getVendorLandline() {
		return vendorLandline;
	}

	public void setVendorLandline(String vendorLandline) {
		this.vendorLandline = vendorLandline;
	}*/

	public String getVendorMobileNumber() {
		return vendorMobileNumber;
	}

	public void setVendorMobileNumber(String vendorMobileNumber) {
		this.vendorMobileNumber = vendorMobileNumber;
	}

	public String getVendorContactPerson() {
		return vendorContactPerson;
	}

	public void setVendorContactPerson(String vendorContactPerson) {
		this.vendorContactPerson = vendorContactPerson;
	}

	/*public String getVendorEmailId() {
		return vendorEmailId;
	}

	public void setVendorEmailId(String vendorEmailId) {
		this.vendorEmailId = vendorEmailId;
	}*/

	public String getVendorDrugLicNum() {
		return vendorDrugLicNum;
	}

	public void setVendorDrugLicNum(String vendorDrugLicNum) {
		this.vendorDrugLicNum = vendorDrugLicNum;
	}

	public String getVendorVatTin() {
		return vendorVatTin;
	}

	public void setVendorVatTin(String vendorVatTin) {
		this.vendorVatTin = vendorVatTin;
	}

	public String getVendorLbtNum() {
		return vendorLbtNum;
	}

	public void setVendorLbtNum(String vendorLbtNum) {
		this.vendorLbtNum = vendorLbtNum;
	}

	public String getVendorCstTin() {
		return vendorCstTin;
	}

	public void setVendorCstTin(String vendorCstTin) {
		this.vendorCstTin = vendorCstTin;
	}

	public String getVendorDesc() {
		return vendorDesc;
	}

	public void setVendorDesc(String vendorDesc) {
		this.vendorDesc = vendorDesc;
	}

	public String getVendorMscdaPartyCode() {
		return vendorMscdaPartyCode;
	}

	public void setVendorMscdaPartyCode(String vendorMscdaPartyCode) {
		this.vendorMscdaPartyCode = vendorMscdaPartyCode;
	}

	public Integer getVendorDeleteFlag() {
		return vendorDeleteFlag;
	}

	public void setVendorDeleteFlag(Integer vendorDeleteFlag) {
		this.vendorDeleteFlag = vendorDeleteFlag;
	}

	public Date getVendorUpdateDate() {
		return vendorUpdateDate;
	}

	public void setVendorUpdateDate(Date vendorUpdateDate) {
		this.vendorUpdateDate = vendorUpdateDate;
	}

	public String getIdAsString() {
		return new Long(vendorId).toString();
	}

	/*
	 * @Override public String toString() { return "VendorMaster [vendorId=" +
	 * vendorId + ", vendorCode=" + vendorCode + ", vendorName=" + vendorName +
	 * ", vendorAddresses=" + vendorAddresses + ", vendorContactPerson=" +
	 * vendorContactPerson + ", vendorDrugLicNum=" + vendorDrugLicNum +
	 * ", vendorVatTin=" + vendorVatTin + ", vendorLbtNum=" + vendorLbtNum +
	 * ", vendorCstTin=" + vendorCstTin + ", vendorDesc=" + vendorDesc +
	 * ", vendorMscdaPartyCode=" + vendorMscdaPartyCode + ", vendorDeleteFlag=" +
	 * vendorDeleteFlag + ", vendorUpdateDate=" + vendorUpdateDate +
	 * ", productMasters=" + productMasters + ", vendorAddDate=" + vendorAddDate +
	 * "]"; }
	 */
	
	
	
	@Transient
	private List<VendorMaster> lstvendors;

	

	public List<VendorMaster> getLstvendors() {
		return lstvendors;
	}

	public void setLstvendors(List<VendorMaster> lstvendors) {
		this.lstvendors = lstvendors;
	}

	/*public void setVendorId(int vendorId) {
		this.vendorId = vendorId;
	}*/
	
	/*@Transient
	private String landLineNumber;

	public String getLandLineNumber() {
		return landLineNumber;
	}

	public void setLandLineNumber(String landLineNumber) {
		this.landLineNumber = landLineNumber;
	}*/
	
	@Override
	public String toString() {
		return "VendorMaster [vendorId=" + vendorId + ", vendorCode=" + vendorCode + ", vendorName=" + vendorName
				+ ", vendorAddress=" + vendorAddress + ", vendorAddresses=" + vendorAddresses + ", vendorMobileNumber="
				+ vendorMobileNumber + ", vendorContactPerson=" + vendorContactPerson + ", vendorDrugLicNum="
				+ vendorDrugLicNum + ", vendorVatTin=" + vendorVatTin + ", vendorLbtNum=" + vendorLbtNum
				+ ", vendorCstTin=" + vendorCstTin + ", vendorDesc=" + vendorDesc + ", vendorMscdaPartyCode="
				+ vendorMscdaPartyCode + ", vendorDeleteFlag=" + vendorDeleteFlag + ", vendorUpdateDate="
				+ vendorUpdateDate + ", productMasters=" + productMasters + ", vendorAddDate=" + vendorAddDate
				+ ", lstvendors=" + lstvendors + "]";
	}

}
