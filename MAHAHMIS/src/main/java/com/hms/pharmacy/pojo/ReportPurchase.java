package com.hms.pharmacy.pojo;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Transient;

public class ReportPurchase {
	private String vouNo;
	private String type;
	private String purBillNo;
	private String billDate;
	private String batchCode;
	private String vendorName;
	private String qty;
	private String rate;
	private String amount;
	private String batchId;
	private String mrp;
	private String scheme;
	private String disc;
	
	private String productName;
	private String productPack;
	private String productCompany;
	private String productUnit;
	private String productId;
	
	private String vendorId;
	private String vendorAddress;
	
	private String categoryId;
	private String productCategory;
	
	private String companyId;
	
	private String itemDisc;
	private String splDisc;
	private String schmDisc;
	private String cd;

	private String VatTinNumber;
	private String vouDate;
	private String status;
	private String madeBy;
	private String chequeNum;
	private String vendorBankName;
	private String pharmacyBank;
	private Integer totalAmt;
	private Float totalAmount;
	private Float totalGross;
	private Float totalLess;
	private Float totalVat;
	private Float totalNet;
	private Float totalAdd;
	private Float totalPayable;
	private Float finalVat;
	private Float finalNet;
	private Float finalGross;
	private Float finalAdd;
	private Float finalLess;
	private Float finalPayable;
	private Double totalamtpm;
	
	private String purchaseDateTime;
	
	//added by Akshata 29-12-2021
	private Integer pur_id;
	private double vat;
	private double pur_add;
	private double pur_less;
	private double pur_net_amt;
	private double amnt;
	private double discount;
	private Date date;
	private Date pur_entry_date;
	private double pur_schm_disc;
	private double pur_spl_disc;
	private double pur_cd;
	private Integer product_uom_unit;
	public Double getTotalamtpm() {
		return totalamtpm;
	}
	public void setTotalamtpm(Double totalamtpm) {
		this.totalamtpm = totalamtpm;
	}
	public Float getFinalVat() {
		return finalVat;
	}
	public void setFinalVat(Float finalVat) {
		this.finalVat = finalVat;
	}
	public Float getFinalNet() {
		return finalNet;
	}
	public void setFinalNet(Float finalNet) {
		this.finalNet = finalNet;
	}
	public Float getFinalGross() {
		return finalGross;
	}
	public void setFinalGross(Float finalGross) {
		this.finalGross = finalGross;
	}
		
	public String getVatTinNumber() {
		return VatTinNumber;
	}
	public void setVatTinNumber(String vatTinNumber) {
		VatTinNumber = vatTinNumber;
	}
	
	public Float getTotalGross() {
		return totalGross;
	}
	public void setTotalGross(Float totalGross) {
		this.totalGross = totalGross;
	}
	public Float getTotalLess() {
		return totalLess;
	}
	public void setTotalLess(Float totalLess) {
		this.totalLess = totalLess;
	}
	public Float getTotalVat() {
		return totalVat;
	}
	public void setTotalVat(Float totalVat) {
		this.totalVat = totalVat;
	}
	public Float getTotalNet() {
		return totalNet;
	}
	public void setTotalNet(Float totalNet) {
		this.totalNet = totalNet;
	}
	public Float getTotalAdd() {
		return totalAdd;
	}
	public void setTotalAdd(Float totalAdd) {
		this.totalAdd = totalAdd;
	}
	
	public Float getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Float totalAmount) {
		this.totalAmount = totalAmount;
	}
	public Integer getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(Integer totalAmt) {
		this.totalAmt = totalAmt;
	}
	public String getVendorBankName() {
		return vendorBankName;
	}
	public void setVendorBankName(String vendorBankName) {
		this.vendorBankName = vendorBankName;
	}
	public String getPharmacyBank() {
		return pharmacyBank;
	}
	public void setPharmacyBank(String pharmacyBank) {
		this.pharmacyBank = pharmacyBank;
	}
	
	
	public String getChequeNum() {
		return chequeNum;
	}
	public void setChequeNum(String chequeNum) {
		this.chequeNum = chequeNum;
	}
	public String getMadeBy() {
		return madeBy;
	}
	public void setMadeBy(String madeBy) {
		this.madeBy = madeBy;
	}
	public String getVouNo() {
		return vouNo;
	}
	public void setVouNo(String vouNo) {
		this.vouNo = vouNo;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getPurBillNo() {
		return purBillNo;
	}
	public void setPurBillNo(String purBillNo) {
		this.purBillNo = purBillNo;
	}
	public String getBillDate() {
		return billDate;
	}
	public void setBillDate(String billDate) {
		this.billDate = billDate;
	}
	public String getBatchCode() {
		return batchCode;
	}
	public void setBatchCode(String batchCode) {
		this.batchCode = batchCode;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
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
	public String getScheme() {
		return scheme;
	}
	public void setScheme(String scheme) {
		this.scheme = scheme;
	}
	public String getDisc() {
		return disc;
	}
	public void setDisc(String disc) {
		this.disc = disc;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getProductPack() {
		return productPack;
	}
	public void setProductPack(String productPack) {
		this.productPack = productPack;
	}
	public String getProductCompany() {
		return productCompany;
	}
	public void setProductCompany(String productCompany) {
		this.productCompany = productCompany;
	}
	public String getProductUnit() {
		return productUnit;
	}
	public void setProductUnit(String productUnit) {
		this.productUnit = productUnit;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	public String getVendorAddress() {
		return vendorAddress;
	}
	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public String getProductCategory() {
		return productCategory;
	}
	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getItemDisc() {
		return itemDisc;
	}
	public void setItemDisc(String itemDisc) {
		this.itemDisc = itemDisc;
	}
	public String getSplDisc() {
		return splDisc;
	}
	public void setSplDisc(String splDisc) {
		this.splDisc = splDisc;
	}
	public String getSchmDisc() {
		return schmDisc;
	}
	public void setSchmDisc(String schmDisc) {
		this.schmDisc = schmDisc;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public String getVouDate() {
		return vouDate;
	}
	public void setVouDate(String vouDate) {
		this.vouDate = vouDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	
	//Added By BILAL 
	private String dispatchFlag;
	private Integer poId;
	private Double gstamt;
	private int gstper;
	private String expiryDate;
	private Double purRate;
	private Double dgstPers;
	private Double purRateWithGST;
	
	private Double igstAmtmaster;
	private Double gstAmountmaster;
	private Double billamtmaster;
	private Double netbillamtwithgst;
	private String hsncode;
	private Double salebillamtmaster;
	
	private double purvatamt ;
	private String purratewithoutgst;
	private String purratewithgst;
	private String gstperslave;
	private String igstperslave;
	private StringBuffer concatedString;
	
	private int grnNo;
	
	@Transient
	private List<TaxMaster> lsttaxmaster;

	@Transient
	private List<ReportPurchase> lstpurc;
	
	private List<GstDto> ltgst ;
	
	
	
	
	public String getPurratewithoutgst() {
		return purratewithoutgst;
	}
	public void setPurratewithoutgst(String purratewithoutgst) {
		this.purratewithoutgst = purratewithoutgst;
	}
	public String getPurratewithgst() {
		return purratewithgst;
	}
	public void setPurratewithgst(String purratewithgst) {
		this.purratewithgst = purratewithgst;
	}
	public String getGstperslave() {
		return gstperslave;
	}
	public void setGstperslave(String gstperslave) {
		this.gstperslave = gstperslave;
	}
	public String getIgstperslave() {
		return igstperslave;
	}
	public void setIgstperslave(String igstperslave) {
		this.igstperslave = igstperslave;
	}
	public List<ReportPurchase> getLstpurc() {
		return lstpurc;
	}
	public void setLstpurc(List<ReportPurchase> lstpurc) {
		this.lstpurc = lstpurc;
	}
	public List<TaxMaster> getLsttaxmaster() {
		return lsttaxmaster;
	}

	public void setLsttaxmaster(List<TaxMaster> lsttaxmaster) {
		this.lsttaxmaster = lsttaxmaster;
	}
	public String getDispatchFlag() {
		return dispatchFlag;
	}
	public void setDispatchFlag(String dispatchFlag) {
		this.dispatchFlag = dispatchFlag;
	}
	public Integer getPoId() {
		return poId;
	}
	public void setPoId(Integer poId) {
		this.poId = poId;
	}
	public Double getGstamt() {
		return gstamt;
	}
	public void setGstamt(Double gstamt) {
		this.gstamt = gstamt;
	}
	public int getGstper() {
		return gstper;
	}
	public void setGstper(int gstper) {
		this.gstper = gstper;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	public Double getPurRate() {
		return purRate;
	}
	public void setPurRate(Double purRate) {
		this.purRate = purRate;
	}
	public Double getDgstPers() {
		return dgstPers;
	}
	public void setDgstPers(Double dgstPers) {
		this.dgstPers = dgstPers;
	}
	public Double getIgstAmtmaster() {
		return igstAmtmaster;
	}
	public void setIgstAmtmaster(Double igstAmtmaster) {
		this.igstAmtmaster = igstAmtmaster;
	}
	public Double getGstAmountmaster() {
		return gstAmountmaster;
	}
	public void setGstAmountmaster(Double gstAmountmaster) {
		this.gstAmountmaster = gstAmountmaster;
	}
	public Double getBillamtmaster() {
		return billamtmaster;
	}
	public void setBillamtmaster(Double billamtmaster) {
		this.billamtmaster = billamtmaster;
	}
	public Double getNetbillamtwithgst() {
		return netbillamtwithgst;
	}
	public void setNetbillamtwithgst(Double netbillamtwithgst) {
		this.netbillamtwithgst = netbillamtwithgst;
	}
	public String getHsncode() {
		return hsncode;
	}
	public void setHsncode(String hsncode) {
		this.hsncode = hsncode;
	}
	public Double getSalebillamtmaster() {
		return salebillamtmaster;
	}
	public void setSalebillamtmaster(Double salebillamtmaster) {
		this.salebillamtmaster = salebillamtmaster;
	}
	public Double getPurRateWithGST() {
		return purRateWithGST;
	}
	public void setPurRateWithGST(Double purRateWithGST) {
		this.purRateWithGST = purRateWithGST;
	}
	public double getPurvatamt() {
		return purvatamt;
	}
	public void setPurvatamt(double purvatamt) {
		this.purvatamt = purvatamt;
	}
	public StringBuffer getConcatedString() {
		return concatedString;
	}
	public void setConcatedString(StringBuffer setgststring) {
		this.concatedString = setgststring;
	}
	public List<GstDto> getLtgst() {
		return ltgst;
	}
	public void setLtgst(List<GstDto> ltgst) {
		this.ltgst = ltgst;
	}
	public int getGrnNo() {
		return grnNo;
	}
	public void setGrnNo(int grnNo) {
		this.grnNo = grnNo;
	}
	
	public String getPurchaseDateTime() {
		return purchaseDateTime;
	}

	public void setPurchaseDateTime(String purchaseDateTime) {
		this.purchaseDateTime = purchaseDateTime;
	}
	
	public Float getTotalPayable() {
		return totalPayable;
	}
	public void setTotalPayable(Float totalPayable) {
		this.totalPayable = totalPayable;
	}
	
	public Float getFinalAdd() {
		return finalAdd;
	}
	public void setFinalAdd(Float finalAdd) {
		this.finalAdd = finalAdd;
	}
	
	public Float getFinalLess() {
		return finalLess;
	}
	public void setFinalLess(Float finalLess) {
		this.finalLess = finalLess;
	}
	
	public Float getFinalPayable() {
		return finalPayable;
	}
	public void setFinalPayable(Float finalPayable) {
		this.finalPayable = finalPayable;
	}
	public Integer getPur_id() {
		return pur_id;
	}
	public void setPur_id(Integer pur_id) {
		this.pur_id = pur_id;
	}
	public double getVat() {
		return vat;
	}
	public void setVat(double vat) {
		this.vat = vat;
	}
	public double getPur_add() {
		return pur_add;
	}
	public void setPur_add(double pur_add) {
		this.pur_add = pur_add;
	}
	public double getPur_less() {
		return pur_less;
	}
	public void setPur_less(double pur_less) {
		this.pur_less = pur_less;
	}
	public double getPur_net_amt() {
		return pur_net_amt;
	}
	public void setPur_net_amt(double pur_net_amt) {
		this.pur_net_amt = pur_net_amt;
	}
	
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public double getAmnt() {
		return amnt;
	}
	public void setAmnt(double amnt) {
		this.amnt = amnt;
	}
	public double getDiscount() {
		return discount;
	}
	public void setDiscount(double discount) {
		this.discount = discount;
	}
	public Date getPur_entry_date() {
		return pur_entry_date;
	}
	public void setPur_entry_date(Date pur_entry_date) {
		this.pur_entry_date = pur_entry_date;
	}
	public double getPur_schm_disc() {
		return pur_schm_disc;
	}
	public void setPur_schm_disc(double pur_schm_disc) {
		this.pur_schm_disc = pur_schm_disc;
	}
	public double getPur_spl_disc() {
		return pur_spl_disc;
	}
	public void setPur_spl_disc(double pur_spl_disc) {
		this.pur_spl_disc = pur_spl_disc;
	}
	public double getPur_cd() {
		return pur_cd;
	}
	public void setPur_cd(double pur_cd) {
		this.pur_cd = pur_cd;
	}
	public Integer getProduct_uom_unit() {
		return product_uom_unit;
	}
	public void setProduct_uom_unit(Integer product_uom_unit) {
		this.product_uom_unit = product_uom_unit;
	}

	
}
