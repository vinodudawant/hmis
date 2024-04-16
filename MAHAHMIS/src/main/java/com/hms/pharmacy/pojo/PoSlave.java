package com.hms.pharmacy.pojo;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "pharma_po_slave")
public class PoSlave implements Serializable
{
	@Id
	@GeneratedValue
	@Column(name = "po_slave_id")
	private Integer poSlaveId;

	@Column(name = "po_slave_sr")
	private Integer poSlaveSr;

	@ManyToOne
	@JoinColumn(name = "po_slave_product_id")
	private ProductMaster productMaster;

	@Column(name = "po_slave_qty")
	private Integer poSlaveQty;

	@Column(name = "po_slave_mrp")
	private Double poSlaveMrp;

	@Column(name = "po_slave_rate")
	private Double poSlaveRate;

	@Column(name = "po_slave_amt")
	private Double poSlaveAmt;

	@Column(name = "po_slave_scheme")
	private Double poSlaveScheme;
	
	@Column(name = "po_slave_Vat")
	private Double poSlaveVat;
	
	@Column(name = "po_hsn")
	private String hsn = null;
	
	@Column(name = "po_Igst")
	private Double poIgst = null;
	
	@Column(name = "po_Cess")
	private Double poCess = null;
	
	@Transient 
	private Integer vendor_id;
	
	@Transient 
	private String vendor_name;
	
	@Transient
	private String vendor_address;
	
	@Transient
	private String vendor_mobile_num;
	
	@Transient
	private Integer product_id;
	
	@Transient
	private String product_name;
	
	@Transient
	private double product_uom_unit;
	
	@Transient
	private String pack_type;
	
	@Transient
	private String comp_name;
	
	@Transient 
	private Integer vAddrId;
	
	@Transient
	private String vd;
	
	@Transient
	private String vendor_state;
	
	@Transient 
	private String vm;
	
	@Transient
	private Integer stateId;
	

	public String getHsn() {
		return hsn;
	}

	public void setHsn(String hsn) {
		this.hsn = hsn;
	}

	public Double getPoIgst() {
		return poIgst;
	}

	public void setPoIgst(Double poIgst) {
		this.poIgst = poIgst;
	}

	public Double getPoCess() {
		return poCess;
	}

	public void setPoCess(Double poCess) {
		this.poCess = poCess;
	}

	public Double getPoSlaveVat() {
		return poSlaveVat;
	}

	public void setPoSlaveVat(Double poSlaveVat) {
		this.poSlaveVat = poSlaveVat;
	}

	public Integer getPoSlaveId() {
		return poSlaveId;
	}

	public void setPoSlaveId(Integer poSlaveId) {
		this.poSlaveId = poSlaveId;
	}

	public Integer getPoSlaveSr() {
		return poSlaveSr;
	}

	public void setPoSlaveSr(Integer poSlaveSr) {
		this.poSlaveSr = poSlaveSr;
	}

	public Integer getPoSlaveQty() {
		return poSlaveQty;
	}

	public void setPoSlaveQty(Integer poSlaveQty) {
		this.poSlaveQty = poSlaveQty;
	}

	public ProductMaster getProductMaster() {
		return productMaster;
	}

	public void setProductMaster(ProductMaster productMaster) {
		this.productMaster = productMaster;
	}

	/*public Double getPoSlaveMrp() {
		return poSlaveMrp;
	}

	public void setPoSlaveMrp(Double poSlaveMrp) {
		this.poSlaveMrp = poSlaveMrp;
	}

	public Double getPoSlaveRate() {
		return poSlaveRate;
	}

	public void setPoSlaveRate(Double poSlaveRate) {
		this.poSlaveRate = poSlaveRate;
	}*/

	public Double getPoSlaveAmt() {
		return poSlaveAmt;
	}

	public void setPoSlaveAmt(Double poSlaveAmt) {
		this.poSlaveAmt = poSlaveAmt;
	}

	public Double getPoSlaveScheme() {
		return poSlaveScheme;
	}

	public void setPoSlaveScheme(Double poSlaveScheme) {
		this.poSlaveScheme = poSlaveScheme;
	}

	public Double getPoSlaveMrp() {
		return poSlaveMrp;
	}

	public void setPoSlaveMrp(Double poSlaveMrp) {
		this.poSlaveMrp = poSlaveMrp;
	}

	public Double getPoSlaveRate() {
		return poSlaveRate;
	}

	public void setPoSlaveRate(Double poSlaveRate) {
		this.poSlaveRate = poSlaveRate;
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

	public String getVendor_address() {
		return vendor_address;
	}

	public void setVendor_address(String vendor_address) {
		this.vendor_address = vendor_address;
	}

	public String getVendor_mobile_num() {
		return vendor_mobile_num;
	}

	public void setVendor_mobile_num(String vendor_mobile_num) {
		this.vendor_mobile_num = vendor_mobile_num;
	}

	public Integer getProduct_id() {
		return product_id;
	}

	public void setProduct_id(Integer product_id) {
		this.product_id = product_id;
	}

	public String getProduct_name() {
		return product_name;
	}

	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}

	public double getProduct_uom_unit() {
		return product_uom_unit;
	}

	public void setProduct_uom_unit(double product_uom_unit) {
		this.product_uom_unit = product_uom_unit;
	}

	public String getPack_type() {
		return pack_type;
	}

	public void setPack_type(String pack_type) {
		this.pack_type = pack_type;
	}

	public String getComp_name() {
		return comp_name;
	}

	public void setComp_name(String comp_name) {
		this.comp_name = comp_name;
	}

	public Integer getvAddrId() {
		return vAddrId;
	}

	public void setvAddrId(Integer vAddrId) {
		this.vAddrId = vAddrId;
	}

	public String getVd() {
		return vd;
	}

	public void setVd(String vd) {
		this.vd = vd;
	}

	public String getVendor_state() {
		return vendor_state;
	}

	public void setVendor_state(String vendor_state) {
		this.vendor_state = vendor_state;
	}

	public String getVm() {
		return vm;
	}

	public void setVm(String vm) {
		this.vm = vm;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}
	
	
}
