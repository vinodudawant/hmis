package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.format.annotation.DateTimeFormat;


@Entity
@Table(name = "pharma_po_master")
public class PoMaster implements Serializable {

	@Id
	@GeneratedValue
	@Column(name = "po_id")
	private Integer poId;

	@Column(name = "po_doc_id")
	private String podocId;

	@Column(name = "po_date")
	@DateTimeFormat(pattern = "dd/mm/yyyy")
	private java.util.Date poDate;

	@Column(name = "po_remark")
	private String poRemark;

	@Column(name = "po_product_count")
	private Integer poProductCount;

	@Column(name = "po_year")
	private String poYear;

	@Column(name = "po_delete_flag")
	private Integer poDeleteFlag;
	@UpdateTimestamp
	@Column(name = "po_update_date")
	private Date poUpdateDate;

	@ManyToOne
	@JoinColumn(name = "po_vendor_id")
	private VendorMaster vendorMaster;

	@ManyToOne
	@JoinColumn(name = "po_vendor_add_id")
	private VendorAddress vendoradd;
	
	@OneToMany(cascade = CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name = "po_slave_po_master_id", referencedColumnName = "po_id")
	private List<PoSlave> ltPOslave = new ArrayList<PoSlave>();

	@Column(name = "po_total_amt")
	private Double poTotalAmt;

	@Column(name = "po_type")
	private String poType;

	@Column(name = "po_total_vat")
	private Double poTotalVat;

	@Column(name = "po_Net_total")
	private Double poNetTotal;

	@Column(name = "po_status")
	private String poStatus = "pending";

	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "poMaster")
	private PartywisePoInvoiceMaster PartywisePoInvoiceMaster;

	@Column(name = "po_created_by")
	private Integer poCreatedBy = 0;
	
	@Column(name = "po_modify_by")
	private Integer poModifyBy = 0;

	@Column(name = "po_user_ip")
	private String ipAddress = null;
	
	@Column(name = " unit_id" ,columnDefinition="int default 1")
	private int unitId;
	
	
	
	@Transient
	private Integer vendor_id;
	@Transient
	private String vendor_name;
	@Transient
	private Integer invoice_id;

	public Integer getPoCreatedBy() {
		return poCreatedBy;
	}

	public void setPoCreatedBy(Integer poCreatedBy) {
		this.poCreatedBy = poCreatedBy;
	}

	public Integer getPoModifyBy() {
		return poModifyBy;
	}

	public void setPoModifyBy(Integer poModifyBy) {
		this.poModifyBy = poModifyBy;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	@JsonIgnore
	public PartywisePoInvoiceMaster getPartywisePoInvoiceMaster() {
		return PartywisePoInvoiceMaster;
	}

	public void setPartywisePoInvoiceMaster(
			PartywisePoInvoiceMaster partywisePoInvoiceMaster) {
		PartywisePoInvoiceMaster = partywisePoInvoiceMaster;
	}

	public Double getPoNetTotal() {
		return poNetTotal;
	}

	public void setPoNetTotal(Double poNetTotal) {
		this.poNetTotal = poNetTotal;
	}

	public Double getPoTotalVat() {
		return poTotalVat;
	}

	public void setPoTotalVat(Double poTotalVat) {
		this.poTotalVat = poTotalVat;
	}

	public Integer getPoId() {
		return poId;
	}

	public void setPoId(Integer poId) {
		this.poId = poId;
	}

	public String getPodocId() {
		return podocId;
	}

	public void setPodocId(String podocId) {
		this.podocId = podocId;
	}

	public java.util.Date getPoDate() {
		return poDate;
	}

	public void setPoDate(java.util.Date poDate) {
		this.poDate = poDate;
	}

	public String getPoRemark() {
		return poRemark;
	}

	public void setPoRemark(String poRemark) {
		this.poRemark = poRemark;
	}

	public Integer getPoProductCount() {
		return poProductCount;
	}

	public void setPoProductCount(Integer poProductCount) {
		this.poProductCount = poProductCount;
	}

	public String getPoYear() {
		return poYear;
	}

	public void setPoYear(String poYear) {
		this.poYear = poYear;
	}

	public Integer getPoDeleteFlag() {
		return poDeleteFlag;
	}

	public void setPoDeleteFlag(Integer poDeleteFlag) {
		this.poDeleteFlag = poDeleteFlag;
	}

	public List<PoSlave> getLtPOslave() {
		return ltPOslave;
	}

	public void setLtPOslave(List<PoSlave> ltPOslave) {
		this.ltPOslave = ltPOslave;
	}

	public VendorMaster getVendorMaster() {
		return vendorMaster;
	}

	public void setVendorMaster(VendorMaster vendorMaster) {
		this.vendorMaster = vendorMaster;
	}

	public Date getPoUpdateDate() {
		return poUpdateDate;
	}

	public void setPoUpdateDate(Date poUpdateDate) {
		this.poUpdateDate = poUpdateDate;
	}

	public Double getPoTotalAmt() {
		return poTotalAmt;
	}

	public void setPoTotalAmt(Double poTotalAmt) {
		this.poTotalAmt = poTotalAmt;
	}

	public String getPoType() {
		return poType;
	}

	public void setPoType(String poType) {
		this.poType = poType;
	}

	public String getPoStatus() {
		return poStatus;
	}

	public void setPoStatus(String poStatus) {
		this.poStatus = poStatus;
	}

	public VendorAddress getVendoradd() {
		return vendoradd;
	}

	public void setVendoradd(VendorAddress vendoradd) {
		this.vendoradd = vendoradd;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}

	public Integer getVendor_id() {
		return vendor_id;
	}

	public void setVendor_id(Integer vendor_id) {
		this.vendor_id = vendor_id;
	}

	public String getVendor_name() {
		return vendor_name;
	}

	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}

	public Integer getInvoice_id() {
		return invoice_id;
	}

	public void setInvoice_id(Integer invoice_id) {
		this.invoice_id = invoice_id;
	}
	
	

}
