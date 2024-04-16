package com.hms.pharmacy.pojo;
import java.io.Serializable;
import java.sql.Date;
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
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name="pharma_partywise_po_master")
public class PartywisePoMaster implements Serializable
{	
	
	@Id
	@GeneratedValue
	@Column(name="po_id")
	private Integer poId;
	
	@Column(name="po_doc_id")
	private String podocId;
	
	@Column(name="po_year")
	private String poYear;
	
	@Column(name="po_date")
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private java.util.Date poDate;
	
	@Column(name="po_delete_flag")
	private  Integer poDeleteFlag;
	
	@Column(name="po_update_date")
	private Date poUpdateDate;
	
	@ManyToOne
	@JoinColumn(name="po_vendor_id")
	private VendorMaster vendorMaster;
	
	@OneToMany(cascade=CascadeType.ALL)
	@LazyCollection(LazyCollectionOption.FALSE)
	@JoinColumn(name="po_slave_po_master_id",referencedColumnName="po_id")
	private List<PartywisePoSlave> ltPOslave=new ArrayList<PartywisePoSlave>(5000);
	
	@Column(name="po_total_amt")
	private Double poTotalAmt;

	@Column(name="po_type")
	private String poType;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "partywisePoMaster")
	private PartywisePoInvoiceMaster PartywisePoInvoiceMaster;

	@Column(name = "po_created_by")
	private Integer poCreatedBy = 0;
	
	@Column(name = "po_modify_by")
	private Integer poModifyBy = 0;

	@Column(name = "po_sale_ip")
	private String ipAddress = null;
	
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

	public Integer getPoId() {
		return poId;
	}

	public void setPoId(Integer poId) {
		this.poId = poId;
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
	public List<PartywisePoSlave> getLtPOslave() {
		return ltPOslave;
	}

	public void setLtPOslave(List<PartywisePoSlave> ltPOslave) {
		this.ltPOslave = ltPOslave;
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
}
