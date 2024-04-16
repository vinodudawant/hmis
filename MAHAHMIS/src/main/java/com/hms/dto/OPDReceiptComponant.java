package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class OPDReceiptComponant {

	private String compName;
	private String compQty;
	private String compRate;
	private String compAmt;
	private int compDisc;
	private String compNetAmt;
	private String compNarration;
	private String compid;
	private String compitemtype;
	private List<OPDReceiptComponant> listOPDReceiptComponant;
	private int idopd_receipt_componant;
	private int idopd_bill;
	private float refundAmt;
	private float totalAmt;

	@JsonGetter("reccmpid")
	public int getIdopd_receipt_componant() {
		return idopd_receipt_componant;
	}

	@JsonSetter("reccmpid")
	public void setIdopd_receipt_componant(int idopd_receipt_componant) {
		this.idopd_receipt_componant = idopd_receipt_componant;
	}

	@JsonGetter("cmpid")
	public String getCompid() {
		return compid;
	}

	@JsonSetter("cmpid")
	public void setCompid(String compid) {
		this.compid = compid;
	}

	@JsonGetter("cmpitmtp")
	public String getCompitemtype() {
		return compitemtype;
	}

	@JsonSetter("cmpitmtp")
	public void setCompitemtype(String compitemtype) {
		this.compitemtype = compitemtype;
	}

	@JsonGetter("cname")
	public String getCompName() {
		return compName;
	}

	public void setCompName(String compName) {
		this.compName = compName;
	}

	@JsonGetter("cqt")
	public String getCompQty() {
		return compQty;
	}

	public void setCompQty(String compQty) {
		this.compQty = compQty;
	}

	@JsonGetter("crt")
	public String getCompRate() {
		return compRate;
	}

	public void setCompRate(String compRate) {
		this.compRate = compRate;
	}

	@JsonGetter("camt")
	public String getCompAmt() {
		return compAmt;
	}

	public void setCompAmt(String compAmt) {
		this.compAmt = compAmt;
	}

	@JsonGetter("listOPDRecComp")
	public List<OPDReceiptComponant> getListOPDReceiptComponant() {
		return listOPDReceiptComponant;
	}

	public void setListOPDReceiptComponant(
			List<OPDReceiptComponant> listOPDReceiptComponant) {
		this.listOPDReceiptComponant = listOPDReceiptComponant;
	}

	@JsonGetter("cdis")
	public int getCompDisc() {
		return compDisc;
	}

	public void setCompDisc(int compDisc) {
		this.compDisc = compDisc;
	}

	@JsonGetter("cnet")
	public String getCompNetAmt() {
		return compNetAmt;
	}

	public void setCompNetAmt(String compNetAmt) {
		this.compNetAmt = compNetAmt;
	}

	@JsonGetter("cnnr")
	public String getCompNarration() {
		return compNarration;
	}
	@JsonSetter("cnnr")
	public void setCompNarration(String compNarration) {
		this.compNarration = compNarration;
	}
	@JsonGetter("idopd_bill")
	public int getIdopd_bill() {
		return idopd_bill;
	}
	@JsonSetter("idopd_bill")
	public void setIdopd_bill(int idopd_bill) {
		this.idopd_bill = idopd_bill;
	}
	@JsonGetter("refundAmt")
	public float getRefundAmt() {
		return refundAmt;
	}
	@JsonSetter("refundAmt")
	public void setRefundAmt(float refundAmt) {
		this.refundAmt = refundAmt;
	}
	@JsonGetter("totalAmt")
	public float getTotalAmt() {
		return totalAmt;
	}
	@JsonSetter("totalAmt")
	public void setTotalAmt(float totalAmt) {
		this.totalAmt = totalAmt;
	}

}
