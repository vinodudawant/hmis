package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;


@Entity
@Table(name = "pharma_vendor_details")
public class PharmaVendorView {

	@Id
	@GeneratedValue
	@Column(name = "vendor_add_id")
	private int vendoraddid;

	@Column(name = "vendor_id")
	private int vendorid;

	@Column(name = "vendor_name")
	private String vendorname;

	@Column(name = "vendor_delete_flag")
	private int vendordeleteflag;
	
	@Column(name = "vendor_gstn")
	private String vendorgstn;

	@Column(name = "stateId",columnDefinition="int default 0")
	private int stateId;
	
	@Column(name = "vendor_mobile_num")
	private String vendormobilenum;

	@Column(name = "vendor_landline")
	private String vendorlandline;
	
	@Column(name = "vendor_address")
	private String vendoraddress;
	
	@Column(name = "vendor_state")
	private String vendorstate;
	
	@Transient
	private List<PharmaVendorView> lstvendorDetails;

	public int getVendoraddid() {
		return vendoraddid;
	}

	public void setVendoraddid(int vendoraddid) {
		this.vendoraddid = vendoraddid;
	}

	public int getVendorid() {
		return vendorid;
	}

	public void setVendorid(int vendorid) {
		this.vendorid = vendorid;
	}

	public String getVendorname() {
		return vendorname;
	}

	public void setVendorname(String vendorname) {
		this.vendorname = vendorname;
	}

	public int getVendordeleteflag() {
		return vendordeleteflag;
	}

	public void setVendordeleteflag(int vendordeleteflag) {
		this.vendordeleteflag = vendordeleteflag;
	}

	public String getVendorgstn() {
		return vendorgstn;
	}

	public void setVendorgstn(String vendorgstn) {
		this.vendorgstn = vendorgstn;
	}

	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	public String getVendormobilenum() {
		return vendormobilenum;
	}

	public void setVendormobilenum(String vendormobilenum) {
		this.vendormobilenum = vendormobilenum;
	}

	public String getVendorlandline() {
		return vendorlandline;
	}

	public void setVendorlandline(String vendorlandline) {
		this.vendorlandline = vendorlandline;
	}

	public String getVendoraddress() {
		return vendoraddress;
	}

	public void setVendoraddress(String vendoraddress) {
		this.vendoraddress = vendoraddress;
	}

	public List<PharmaVendorView> getLstvendorDetails() {
		return lstvendorDetails;
	}

	public void setLstvendorDetails(List<PharmaVendorView> lstvendorDetails) {
		this.lstvendorDetails = lstvendorDetails;
	}

	public String getVendorstate() {
		return vendorstate;
	}

	public void setVendorstate(String vendorstate) {
		this.vendorstate = vendorstate;
	}
	
	
	
}
