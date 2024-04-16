package com.hms.pharmacy.pojo;

import java.sql.Timestamp;

public class ReportData {
	
	Integer pur_id;
	Integer pur_trans_type;
	String pur_bill_no;
	String pur_bill_date;
	String batch_code;
	String vendor_name;
	Integer pur_slave_qty;
	double pur_slave_rate;
	double pur_slave_amt;
	Integer pur_vat;
	String product_name;
	String batch_exp_date;
	double pur_less;
	double pur_slave_bill_rate;
	double pur_slave_disc;
	double pur_slave_vat;
	Integer igstAmtmaster;
	Integer gstAmountmaster;
	double billamt;
	double netbillamtwithgst;
	String pur_hsn;
	double pur_slave_purchase_rate;
	String vendor_state;
	Integer vendor_gstn;
	private double amtRec;
	private double amtBal;
	private double Taxable55;
	private double Taxable12;
	private double Taxable0;
	private String id;
	private String patientName;
	private double netAmt;
	private Double totalVat5;
	private Double totalVat12;
	private Double totalVat0;
	private String indent_store_name;
	private String indent_comment;
	private String user_name;
	private String indent_time;
	private Timestamp date1;
	private Timestamp indent_add_date;
	private String indent_sale_deleted_time;
	private String indent_delete_date;
	private String batchId;
	private String mrp;
	private String patientId;
	private String date;
	private Integer billMode;
	private String qty;
	private String batchCode;
	private String productName;
	private String unit;
	private String categoryName;
	private String transType;
	private String amount;
	private String type;
	
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	public Integer getPur_id() {
		return pur_id;
	}
	public void setPur_id(Integer pur_id) {
		this.pur_id = pur_id;
	}
	public Integer getPur_trans_type() {
		return pur_trans_type;
	}
	public void setPur_trans_type(Integer pur_trans_type) {
		this.pur_trans_type = pur_trans_type;
	}
	public String getPur_bill_no() {
		return pur_bill_no;
	}
	public void setPur_bill_no(String pur_bill_no) {
		this.pur_bill_no = pur_bill_no;
	}
	public String getPur_bill_date() {
		return pur_bill_date;
	}
	public void setPur_bill_date(String pur_bill_date) {
		this.pur_bill_date = pur_bill_date;
	}
	public String getBatch_code() {
		return batch_code;
	}
	public void setBatch_code(String batch_code) {
		this.batch_code = batch_code;
	}
	public String getVendor_name() {
		return vendor_name;
	}
	public void setVendor_name(String vendor_name) {
		this.vendor_name = vendor_name;
	}
	public Integer getPur_slave_qty() {
		return pur_slave_qty;
	}
	public void setPur_slave_qty(Integer pur_slave_qty) {
		this.pur_slave_qty = pur_slave_qty;
	}
	public double getPur_slave_rate() {
		return pur_slave_rate;
	}
	public void setPur_slave_rate(double pur_slave_rate) {
		this.pur_slave_rate = pur_slave_rate;
	}
	public double getPur_slave_amt() {
		return pur_slave_amt;
	}
	public void setPur_slave_amt(double pur_slave_amt) {
		this.pur_slave_amt = pur_slave_amt;
	}
	public Integer getPur_vat() {
		return pur_vat;
	}
	public void setPur_vat(Integer pur_vat) {
		this.pur_vat = pur_vat;
	}
	public String getProduct_name() {
		return product_name;
	}
	public void setProduct_name(String product_name) {
		this.product_name = product_name;
	}
	public String getBatch_exp_date() {
		return batch_exp_date;
	}
	public void setBatch_exp_date(String batch_exp_date) {
		this.batch_exp_date = batch_exp_date;
	}
	public double getPur_less() {
		return pur_less;
	}
	public void setPur_less(double pur_less) {
		this.pur_less = pur_less;
	}
	public double getPur_slave_bill_rate() {
		return pur_slave_bill_rate;
	}
	public void setPur_slave_bill_rate(double pur_slave_bill_rate) {
		this.pur_slave_bill_rate = pur_slave_bill_rate;
	}
	public double getPur_slave_disc() {
		return pur_slave_disc;
	}
	public void setPur_slave_disc(double pur_slave_disc) {
		this.pur_slave_disc = pur_slave_disc;
	}
	public double getPur_slave_vat() {
		return pur_slave_vat;
	}
	public void setPur_slave_vat(double pur_slave_vat) {
		this.pur_slave_vat = pur_slave_vat;
	}
	public Integer getIgstAmtmaster() {
		return igstAmtmaster;
	}
	public void setIgstAmtmaster(Integer igstAmtmaster) {
		this.igstAmtmaster = igstAmtmaster;
	}
	public Integer getGstAmountmaster() {
		return gstAmountmaster;
	}
	public void setGstAmountmaster(Integer gstAmountmaster) {
		this.gstAmountmaster = gstAmountmaster;
	}
	public double getBillamt() {
		return billamt;
	}
	public void setBillamt(double billamt) {
		this.billamt = billamt;
	}
	public double getNetbillamtwithgst() {
		return netbillamtwithgst;
	}
	public void setNetbillamtwithgst(double netbillamtwithgst) {
		this.netbillamtwithgst = netbillamtwithgst;
	}
	public String getPur_hsn() {
		return pur_hsn;
	}
	public void setPur_hsn(String pur_hsn) {
		this.pur_hsn = pur_hsn;
	}
	public double getPur_slave_purchase_rate() {
		return pur_slave_purchase_rate;
	}
	public void setPur_slave_purchase_rate(double pur_slave_purchase_rate) {
		this.pur_slave_purchase_rate = pur_slave_purchase_rate;
	}
	public String getVendor_state() {
		return vendor_state;
	}
	public void setVendor_state(String vendor_state) {
		this.vendor_state = vendor_state;
	}
	public Integer getVendor_gstn() {
		return vendor_gstn;
	}
	public void setVendor_gstn(Integer vendor_gstn) {
		this.vendor_gstn = vendor_gstn;
	}
	
	public double getAmtRec() {
		return amtRec;
	}
	public void setAmtRec(double amtRec) {
		this.amtRec = amtRec;
	}
	public Integer getBillMode() {
		return billMode;
	}
	public void setBillMode(Integer billMode) {
		this.billMode = billMode;
	}
	public double getAmtBal() {
		return amtBal;
	}
	public void setAmtBal(double amtBal) {
		this.amtBal = amtBal;
	}
	public void setTaxable55(double taxable55) {
		Taxable55 = taxable55;
	}
	public void setTaxable12(double taxable12) {
		Taxable12 = taxable12;
	}
	public void setTaxable0(double taxable0) {
		Taxable0 = taxable0;
	}
	public Timestamp getDate1() {
		return date1;
	}
	public void setDate1(Timestamp date1) {
		this.date1 = date1;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public double getTaxable55() {
		return Taxable55;
	}
	public double getTaxable12() {
		return Taxable12;
	}
	public double getTaxable0() {
		return Taxable0;
	}
	public String getPatientName() {
		return patientName;
	}
	public void setPatientName(String patientName) {
		this.patientName = patientName;
	}
	public double getNetAmt() {
		return netAmt;
	}
	public void setNetAmt(double netAmt) {
		this.netAmt = netAmt;
	}
	public Double getTotalVat5() {
		return totalVat5;
	}
	public void setTotalVat5(Double totalVat5) {
		this.totalVat5 = totalVat5;
	}
	public Double getTotalVat12() {
		return totalVat12;
	}
	public void setTotalVat12(Double totalVat12) {
		this.totalVat12 = totalVat12;
	}
	public Double getTotalVat0() {
		return totalVat0;
	}
	public void setTotalVat0(Double totalVat0) {
		this.totalVat0 = totalVat0;
	}
	
	
	public String getIndent_store_name() {
		return indent_store_name;
	}
	public void setIndent_store_name(String indent_store_name) {
		this.indent_store_name = indent_store_name;
	}
	public String getIndent_comment() {
		return indent_comment;
	}
	public void setIndent_comment(String indent_comment) {
		this.indent_comment = indent_comment;
	}
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getIndent_time() {
		return indent_time;
	}
	public void setIndent_time(String indent_time) {
		this.indent_time = indent_time;
	}
	public String getIndent_sale_deleted_time() {
		return indent_sale_deleted_time;
	}
	public void setIndent_sale_deleted_time(String indent_sale_deleted_time) {
		this.indent_sale_deleted_time = indent_sale_deleted_time;
	}
	public String getIndent_delete_date() {
		return indent_delete_date;
	}
	public void setIndent_delete_date(String indent_delete_date) {
		this.indent_delete_date = indent_delete_date;
	}
	
	
	public Timestamp getIndent_add_date() {
		return indent_add_date;
	}
	public void setIndent_add_date(Timestamp indent_add_date) {
		this.indent_add_date = indent_add_date;
	}
	
	
	public String getBatchId() {
		return batchId;
	}
	public void setBatchId(String batchId) {
		this.batchId = batchId;
	}
	public String getMrp() {
		return mrp;
	}
	public void setMrp(String mrp) {
		this.mrp = mrp;
	}
	public String getPatientId() {
		return patientId;
	}
	public void setPatientId(String patientId) {
		this.patientId = patientId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getBatchCode() {
		return batchCode;
	}
	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}
	
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	
	public String getTransType() {
		return transType;
	}
	public void setTransType(String transType) {
		this.transType = transType;
	}
	@Override
	public String toString() {
		return "ReportData [pur_id=" + pur_id + ", pur_trans_type=" + pur_trans_type + ", pur_bill_no=" + pur_bill_no
				+ ", pur_bill_date=" + pur_bill_date + ", batch_code=" + batch_code + ", vendor_name=" + vendor_name
				+ ", pur_slave_qty=" + pur_slave_qty + ", pur_slave_rate=" + pur_slave_rate + ", pur_slave_amt="
				+ pur_slave_amt + ", pur_vat=" + pur_vat + ", product_name=" + product_name + ", batch_exp_date="
				+ batch_exp_date + ", pur_less=" + pur_less + ", pur_slave_bill_rate=" + pur_slave_bill_rate
				+ ", pur_slave_disc=" + pur_slave_disc + ", pur_slave_vat=" + pur_slave_vat + ", igstAmtmaster="
				+ igstAmtmaster + ", gstAmountmaster=" + gstAmountmaster + ", billamt=" + billamt
				+ ", netbillamtwithgst=" + netbillamtwithgst + ", pur_hsn=" + pur_hsn + ", pur_slave_purchase_rate="
				+ pur_slave_purchase_rate + ", vendor_state=" + vendor_state + ", vendor_gstn=" + vendor_gstn
				+ ", amtRec=" + amtRec + ", amtBal=" + amtBal + ", Taxable55=" + Taxable55 + ", Taxable12=" + Taxable12
				+ ", Taxable0=" + Taxable0 + ", id=" + id + ", patientName=" + patientName + ", netAmt=" + netAmt
				+ ", totalVat5=" + totalVat5 + ", totalVat12=" + totalVat12 + ", totalVat0=" + totalVat0
				+ ", indent_store_name=" + indent_store_name + ", indent_comment=" + indent_comment + ", user_name="
				+ user_name + ", indent_time=" + indent_time + ", date1=" + date1 + ", indent_add_date="
				+ indent_add_date + ", indent_sale_deleted_time=" + indent_sale_deleted_time + ", indent_delete_date="
				+ indent_delete_date + ", batchId=" + batchId + ", mrp=" + mrp + ", patientId=" + patientId + ", date="
				+ date + ", billMode=" + billMode + ", qty=" + qty + ", batchCode=" + batchCode + ", productName="
				+ productName + ", unit=" + unit + ", categoryName=" + categoryName + ", transType=" + transType
				+ ", amount=" + amount + ", type=" + type + "]";
	}
	
	
	
	
	
	
	
	

}
