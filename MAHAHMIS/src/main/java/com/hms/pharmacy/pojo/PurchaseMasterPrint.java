package com.hms.pharmacy.pojo;

import java.util.Date;
import java.util.List;

public class PurchaseMasterPrint {
	
	private Integer pur_id;
	private String pur_doc_id;
	private Date pur_bill_date;
	private String vendor_name;
	private String vendor_mobile_num;
	private double pur_less;
	private double pur_gross_amt;
	private double pur_add;
	private double pur_net_amt;
	private String pur_bill_no;
	private double pur_vat;
	private Integer pur_po_id;
	private String pur_trans_type;
	private String vendorfulladd;
	private String vendor_gstn;
	private double pur_slave_qty;
	private double pur_slave_mrp;
	private double mrp;
	private double pur_slave_amt;
	private String batch_code;
	private String batch_exp_date;
	private String product_name;
	private Integer batch_id;
	private double pur_slave_vat;
	private double pur_slave_bill_rate;
	private String pack_type;
	private double product_uom_unit;
	private double pur_slave_scheme;
	private String del_chalan_number;
	private String pur_hsn;
	private double pur_cess;
	private double pur_igst;
	private double pur_slave_disc;
	private double pur_slave_purchase_rate;
	private Integer pur_slave_product_id;
	
	public Integer getPur_slave_product_id() {
		return pur_slave_product_id;
	}
	public void setPur_slave_product_id(Integer pur_slave_product_id) {
		this.pur_slave_product_id = pur_slave_product_id;
	}
	List<PurchaseMasterPrint> lstPurchaseMaster;
	List<PurchaseMasterPrint> lstPurchaseSlave;
	public Integer getPur_id() {
		return pur_id;
	}
	public void setPur_id(Integer pur_id) {
		this.pur_id = pur_id;
	}
	public String getPur_doc_id() {
		return pur_doc_id;
	}
	public void setPur_doc_id(String pur_doc_id) {
		this.pur_doc_id = pur_doc_id;
	}
	public Date getPur_bill_date() {
		return pur_bill_date;
	}
	public void setPur_bill_date(Date pur_bill_date) {
		this.pur_bill_date = pur_bill_date;
	}
	public String getVendor_name() {
		return vendor_name;
	}
	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}
	public String getVendor_mobile_num() {
		return vendor_mobile_num;
	}
	public void setVendor_mobile_num(String vendor_mobile_num) {
		this.vendor_mobile_num = vendor_mobile_num;
	}
	public double getPur_less() {
		return pur_less;
	}
	public void setPur_less(double pur_less) {
		this.pur_less = pur_less;
	}
	public double getPur_gross_amt() {
		return pur_gross_amt;
	}
	public void setPur_gross_amt(double pur_gross_amt) {
		this.pur_gross_amt = pur_gross_amt;
	}
	public double getPur_add() {
		return pur_add;
	}
	public void setPur_add(double pur_add) {
		this.pur_add = pur_add;
	}
	public double getPur_net_amt() {
		return pur_net_amt;
	}
	public void setPur_net_amt(double pur_net_amt) {
		this.pur_net_amt = pur_net_amt;
	}
	public String getPur_bill_no() {
		return pur_bill_no;
	}
	public void setPur_bill_no(String pur_bill_no) {
		this.pur_bill_no = pur_bill_no;
	}
	public double getPur_vat() {
		return pur_vat;
	}
	public void setPur_vat(double pur_vat) {
		this.pur_vat = pur_vat;
	}
	public Integer getPur_po_id() {
		return pur_po_id;
	}
	public void setPur_po_id(Integer pur_po_id) {
		this.pur_po_id = pur_po_id;
	}
	public String getPur_trans_type() {
		return pur_trans_type;
	}
	public void setPur_trans_type(String pur_trans_type) {
		this.pur_trans_type = pur_trans_type;
	}
	public String getVendorfulladd() {
		return vendorfulladd;
	}
	public void setVendorfulladd(String vendorfulladd) {
		this.vendorfulladd = vendorfulladd;
	}
	public String getVendor_gstn() {
		return vendor_gstn;
	}
	public void setVendor_gstn(String vendor_gstn) {
		this.vendor_gstn = vendor_gstn;
	}
	public double getPur_slave_qty() {
		return pur_slave_qty;
	}
	public void setPur_slave_qty(double pur_slave_qty) {
		this.pur_slave_qty = pur_slave_qty;
	}
	public double getPur_slave_mrp() {
		return pur_slave_mrp;
	}
	public void setPur_slave_mrp(double pur_slave_mrp) {
		this.pur_slave_mrp = pur_slave_mrp;
	}
	public double getMrp() {
		return mrp;
	}
	public void setMrp(double mrp) {
		this.mrp = mrp;
	}
	public double getPur_slave_amt() {
		return pur_slave_amt;
	}
	public void setPur_slave_amt(double pur_slave_amt) {
		this.pur_slave_amt = pur_slave_amt;
	}
	public String getBatch_code() {
		return batch_code;
	}
	public void setBatch_code(String batch_code) {
		this.batch_code = batch_code;
	}
	public String getBatch_exp_date() {
		return batch_exp_date;
	}
	public void setBatch_exp_date(String batch_exp_date) {
		this.batch_exp_date = batch_exp_date;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public Integer getBatch_id() {
		return batch_id;
	}
	public void setBatch_id(Integer batch_id) {
		this.batch_id = batch_id;
	}
	public double getPur_slave_vat() {
		return pur_slave_vat;
	}
	public void setPur_slave_vat(double pur_slave_vat) {
		this.pur_slave_vat = pur_slave_vat;
	}
	public double getPur_slave_bill_rate() {
		return pur_slave_bill_rate;
	}
	public void setPur_slave_bill_rate(double pur_slave_bill_rate) {
		this.pur_slave_bill_rate = pur_slave_bill_rate;
	}
	public String getPack_type() {
		return pack_type;
	}
	public void setPack_type(String pack_type) {
		this.pack_type = pack_type;
	}
	public double getProduct_uom_unit() {
		return product_uom_unit;
	}
	public void setProduct_uom_unit(double product_uom_unit) {
		this.product_uom_unit = product_uom_unit;
	}
	public double getPur_slave_scheme() {
		return pur_slave_scheme;
	}
	public void setPur_slave_scheme(double pur_slave_scheme) {
		this.pur_slave_scheme = pur_slave_scheme;
	}
	public String getDel_chalan_number() {
		return del_chalan_number;
	}
	public void setDel_chalan_number(String del_chalan_number) {
		this.del_chalan_number = del_chalan_number;
	}
	public String getPur_hsn() {
		return pur_hsn;
	}
	public void setPur_hsn(String pur_hsn) {
		this.pur_hsn = pur_hsn;
	}
	public double getPur_cess() {
		return pur_cess;
	}
	public void setPur_cess(double pur_cess) {
		this.pur_cess = pur_cess;
	}
	public double getPur_igst() {
		return pur_igst;
	}
	public void setPur_igst(double pur_igst) {
		this.pur_igst = pur_igst;
	}
	public double getPur_slave_disc() {
		return pur_slave_disc;
	}
	public void setPur_slave_disc(double pur_slave_disc) {
		this.pur_slave_disc = pur_slave_disc;
	}
	public double getPur_slave_purchase_rate() {
		return pur_slave_purchase_rate;
	}
	public void setPur_slave_purchase_rate(double pur_slave_purchase_rate) {
		this.pur_slave_purchase_rate = pur_slave_purchase_rate;
	}
	public List<PurchaseMasterPrint> getLstPurchaseMaster() {
		return lstPurchaseMaster;
	}
	public void setLstPurchaseMaster(List<PurchaseMasterPrint> lstPurchaseMaster) {
		this.lstPurchaseMaster = lstPurchaseMaster;
	}
	public List<PurchaseMasterPrint> getLstPurchaseSlave() {
		return lstPurchaseSlave;
	}
	public void setLstPurchaseSlave(List<PurchaseMasterPrint> lstPurchaseSlave) {
		this.lstPurchaseSlave = lstPurchaseSlave;
	}
	
	
	

}
