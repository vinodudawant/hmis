package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.dto.IPDDiscount;

public class BillComponentSample implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private float quantity;
	private String name;
	private String msg;
	private int rate;
	private int itemId;
	private int ipdBillSlaveTbId;
	private String itemTypeForManualBill;
	private String amount;
	private String date;
	private String item_type;
	private float oxy_hrs;
	private int mon_day;
	private float discount;
	private String netAmount;
	private String discNarration;
	private String status;
	private List<BillComponentSample> bcs1;
	private BillComponentSample bcs;
	private List<BillComponentSample> bcs2;
	private List<BillComponentSample> bcs3;
	private List<BillComponentSample> bcs4;
	private List<BillComponentSample> bcs5;
	private List<BillComponentSample> bcs6;
	private List<BillComponentSample> bcs7;
	private List<BillComponentSample> bcs8;
	private List<BillComponentSample> operationlist;
	private List<BillComponentSample> surgeonlist;
	private List<BillComponentSample> anasthesialist;
	private List<BillComponentSample> materiallist;
	private List<BillComponentSample> opdrecComplist;
	private List<HospitalAccDetails> hospitalAccountDetail;
	
	private String surgeryconsumbaleused;
	private int biilipdid;//added by paras 
	private int hallid;//added by paras 
	private float otherAmount;//added by paras 
	private float otherRate;//added by paras otherPay
	private float otherPay;
	private int sponserid;
	
	@JsonGetter("otherAmount")
	public float getOtherAmount() {
		return otherAmount;
	}
	@JsonSetter("otherAmount")
	public void setOtherAmount(float otherAmount) {
		this.otherAmount = otherAmount;
	}
	@JsonGetter("otherRate")

	public float getOtherRate() {
		return otherRate;
	}
	@JsonSetter("otherRate")

	public void setOtherRate(float otherRate) {
		this.otherRate = otherRate;
	}
	@JsonGetter("otherPay")
	public float getOtherPay() {
		return otherPay;
	}
	@JsonSetter("otherPay")
	public void setOtherPay(float otherPay) {
		this.otherPay = otherPay;
	}
	@JsonGetter("sponserid")
	public int getSponserid() {
		return sponserid;
	}@JsonSetter("sponserid")
	public void setSponserid(int sponserid) {
		this.sponserid = sponserid;
	}
	@JsonGetter("hallid")
	public int getHallid() {
		return hallid;
	}
	@JsonSetter("hallid")
	public void setHallid(int hallid) {
		this.hallid = hallid;
	}
	
	
	@JsonGetter("surgeryconsumbaleused")
	public String getSurgeryconsumbaleused() {
		return surgeryconsumbaleused;
	}
	@JsonSetter("surgeryconsumbaleused")
	public void setSurgeryconsumbaleused(String surgeryconsumbaleused) {
		this.surgeryconsumbaleused = surgeryconsumbaleused;
	}
	
	private List<BillComponentSample> pharmacyindentlist;
	@JsonGetter("pharmindList")
	public List<BillComponentSample> getPharmacyindentlist() {
		return pharmacyindentlist;
	}
	@JsonSetter("pharmindList")
	public void setPharmacyindentlist(List<BillComponentSample> pharmacyindentlist) {
		this.pharmacyindentlist = pharmacyindentlist;
	}
	private List<IPDDiscount> listIPDDiscount;
	private List<HospitalDetails> ipdBillList;
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	private List<OpdBillParticular> liOpdBillDetails;
	private List<HospitalDetails> hospitalDetail;
	private List<BillComponentSample> relativeBedChargesli;
	private List<BillMaster> billList;
	private int idBillOPDComp;
	private String rateIpd;
	private String rateCarpoAcc;
	private String amtCarpoAcc;
	private String docDeptName;
	private String opdBillingId;
	private String discount_name;
	private String in_charge;
	private String overrideChargesFlag;
	private String surgeonId;
	private String medicalInvoiceNo;
	private Float pay;
	private Float coPay;
	private float nursingchargesRate;
	private float nursingchargesPay;
	private float nursingchargesCoPay;
	private float nursingchargesDiscount;
	private float nursingchargesQuantity;
	
	private String physicalDischargeFlag;
	
	private String bill_cat_disc;
	private String prev_bill_cat_disc;
	
	@JsonGetter("medInvoice")
	public String getMedicalInvoiceNo() {
		return medicalInvoiceNo;
	}
	@JsonSetter("medInvoice")
	public void setMedicalInvoiceNo(String medicalInvoiceNo) {
		this.medicalInvoiceNo = medicalInvoiceNo;
	}

	@JsonGetter("surId")
	public String getSurgeonId() {
		return surgeonId;
	}

	@JsonSetter("surId")
	public void setSurgeonId(String docName) {
		this.surgeonId = docName;
	}

	@JsonGetter("itemType")
	public String getItemTypeForManualBill() {
		return itemTypeForManualBill;
	}

	@JsonSetter("itemType")
	public void setItemTypeForManualBill(String itemTypeForManualBill) {
		this.itemTypeForManualBill = itemTypeForManualBill;
	}

	@JsonGetter("ipdBillSlaveTbId")
	public int getIpdBillSlaveTbId() {
		return ipdBillSlaveTbId;
	}

	@JsonSetter("ipdBillSlaveTbId")
	public void setIpdBillSlaveTbId(int ipdBillSlaveTbId) {
		this.ipdBillSlaveTbId = ipdBillSlaveTbId;
	}

	@JsonGetter("itemid")
	public int getItemId() {
		return itemId;
	}

	@JsonSetter("itemid")
	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	@JsonGetter("hospDetail")
	public List<HospitalDetails> getHospitalDetail() {
		return hospitalDetail;
	}

	@JsonSetter("hospDetail")
	public void setHospitalDetail(List<HospitalDetails> hospitalDetail) {
		this.hospitalDetail = hospitalDetail;
	}

	@JsonGetter("relBedChr")
	public List<BillComponentSample> getRelativeBedChargesli() {
		return relativeBedChargesli;
	}

	@JsonSetter("relBedChr")
	public void setRelativeBedChargesli(
			List<BillComponentSample> relativeBedChargesli) {
		this.relativeBedChargesli = relativeBedChargesli;
	}

	@JsonGetter("hospAcct")
	public List<HospitalAccDetails> getHospitalAccountDetail() {
		return hospitalAccountDetail;
	}

	@JsonSetter("hospAcct")
	public void setHospitalAccountDetail(
			List<HospitalAccDetails> hospitalAccountDetail) {
		this.hospitalAccountDetail = hospitalAccountDetail;
	}

	@JsonGetter("overChrgFlg")
	public String getOverrideChargesFlag() {
		return overrideChargesFlag;
	}

	@JsonSetter("overChrgFlg")
	public void setOverrideChargesFlag(String overrideChargesFlag) {
		this.overrideChargesFlag = overrideChargesFlag;
	}

	@JsonGetter("matl")
	public List<BillComponentSample> getMateriallist() {
		return materiallist;
	}

	@JsonSetter("matl")
	public void setMateriallist(List<BillComponentSample> materiallist) {
		this.materiallist = materiallist;
	}

	@JsonGetter("rtca")
	public String getRateCarpoAcc() {
		return rateCarpoAcc;
	}

	@JsonSetter("rtca")
	public void setRateCarpoAcc(String rateCarpoAcc) {
		this.rateCarpoAcc = rateCarpoAcc;
	}

	@JsonGetter("amtca")
	public String getAmtCarpoAcc() {
		return amtCarpoAcc;
	}

	@JsonSetter("amtca")
	public void setAmtCarpoAcc(String amtCarpoAcc) {
		this.amtCarpoAcc = amtCarpoAcc;
	}

	@JsonGetter("iprt")
	public String getRateIpd() {
		return rateIpd;
	}

	@JsonSetter("iprt")
	public void setRateIpd(String rateIpd) {
		this.rateIpd = rateIpd;
	}

	@JsonGetter("anali")
	public List<BillComponentSample> getAnasthesialist() {
		return anasthesialist;
	}

	@JsonSetter("anali")
	public void setAnasthesialist(List<BillComponentSample> anasthesialist) {
		this.anasthesialist = anasthesialist;
	}

	@JsonGetter("surli")
	public List<BillComponentSample> getSurgeonlist() {
		return surgeonlist;
	}

	@JsonSetter("surli")
	public void setSurgeonlist(List<BillComponentSample> surgeonlist) {
		this.surgeonlist = surgeonlist;
	}

	@JsonGetter("oplist")
	public List<BillComponentSample> getOperationlist() {
		return operationlist;
	}

	@JsonSetter("oplist")
	public void setOperationlist(List<BillComponentSample> operationlist) {
		this.operationlist = operationlist;
	}

	@JsonGetter("idBOPDC")
	public int getIdBillOPDComp() {
		return idBillOPDComp;
	}

	@JsonSetter("idBOPDC")
	public void setIdBillOPDComp(int idBillOPDComp) {
		this.idBillOPDComp = idBillOPDComp;
	}
	@JsonGetter("oxy_hrs")
	public float getOxy_hrs() {
		return oxy_hrs;
	}
	@JsonSetter("oxy_hrs")
	public void setOxy_hrs(float oxy_hrs) {
		this.oxy_hrs = oxy_hrs;
	}
	@JsonGetter("mon_day")
	public int getMon_day() {
		return mon_day;
	}
	@JsonSetter("mon_day")
	public void setMon_day(int mon_day) {
		this.mon_day = mon_day;
	}

	@JsonGetter("bcs8")
	public List<BillComponentSample> getBcs8() {
		return bcs8;
	}

	@JsonSetter("bcs8")
	public void setBcs8(List<BillComponentSample> bcs8) {
		this.bcs8 = bcs8;
	}

	@JsonGetter("bcs7")
	public List<BillComponentSample> getBcs7() {
		return bcs7;
	}

	@JsonSetter("bcs7")
	public void setBcs7(List<BillComponentSample> bcs7) {
		this.bcs7 = bcs7;
	}

	/*
	 * BillComponentSample objBillComponentSample = new BillComponentSample();
	 * 
	 * @JsonGetter("objBC") public BillComponentSample
	 * getObjBillComponentSample() { return objBillComponentSample; }
	 * 
	 * @JsonSetter("objBC") public void
	 * setObjBillComponentSample(BillComponentSample objBillComponentSample) {
	 * this.objBillComponentSample = objBillComponentSample; }
	 */
	@JsonGetter("msg")
	public String getMsg() {
		return msg;
	}

	@JsonSetter("msg")
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the billList
	 */
	@JsonGetter("bl")
	public List<BillMaster> getBillList() {
		return billList;
	}

	/**
	 * @param billList
	 *            the billList to set
	 */
	@JsonSetter("bl")
	public void setBillList(List<BillMaster> billList) {
		this.billList = billList;
	}

	/**
	 * @return the comp_type
	 */
	@JsonGetter("ct")
	public String getItem_type() {
		return item_type;
	}

	/**
	 * @param comp_type
	 *            the comp_type to set
	 */
	@JsonSetter("ct")
	public void setItem_type(String item_type) {
		this.item_type = item_type;
	}

	/**
	 * @return the bcs1
	 */
	@JsonGetter("bcs1")
	public List<BillComponentSample> getBcs1() {
		return bcs1;
	}

	/**
	 * @param bcs1
	 *            the bcs1 to set
	 */
	@JsonSetter("bcs1")
	public void setBcs1(List<BillComponentSample> bcs1) {
		this.bcs1 = bcs1;
	}

	/**
	 * @return the bcs2
	 */
	@JsonGetter("bcs2")
	public List<BillComponentSample> getBcs2() {
		return bcs2;
	}

	/**
	 * @param bcs2
	 *            the bcs2 to set
	 */
	@JsonSetter("bcs2")
	public void setBcs2(List<BillComponentSample> bcs2) {
		this.bcs2 = bcs2;
	}

	/**
	 * @return the bcs3
	 */
	@JsonGetter("bcs3")
	public List<BillComponentSample> getBcs3() {
		return bcs3;
	}

	/**
	 * @param bcs3
	 *            the bcs3 to set
	 */
	@JsonSetter("bcs3")
	public void setBcs3(List<BillComponentSample> bcs3) {
		this.bcs3 = bcs3;
	}

	/**
	 * @return the bcs4
	 */
	@JsonGetter("bcs4")
	public List<BillComponentSample> getBcs4() {
		return bcs4;
	}

	/**
	 * @param bcs4
	 *            the bcs4 to set
	 */
	@JsonSetter("bcs4")
	public void setBcs4(List<BillComponentSample> bcs4) {
		this.bcs4 = bcs4;
	}

	/**
	 * @return the bcs5
	 */
	@JsonGetter("bcs5")
	public List<BillComponentSample> getBcs5() {
		return bcs5;
	}

	/**
	 * @param bcs5
	 *            the bcs5 to set
	 */
	@JsonSetter("bcs5")
	public void setBcs5(List<BillComponentSample> bcs5) {
		this.bcs5 = bcs5;
	}

	/**
	 * @return the bcs6
	 */
	@JsonGetter("bcs6")
	public List<BillComponentSample> getBcs6() {
		return bcs6;
	}

	/**
	 * @param bcs6
	 *            the bcs6 to set
	 */
	@JsonSetter("bcs6")
	public void setBcs6(List<BillComponentSample> bcs6) {
		this.bcs6 = bcs6;
	}

	/**
	 * @return the bcs
	 */
	@JsonGetter("bcso")
	public BillComponentSample getBcs() {
		return bcs;
	}

	/**
	 * @param bcs
	 *            the bcs to set
	 */
	@JsonSetter("bcso")
	public void setBcs(BillComponentSample bcs) {
		this.bcs = bcs;
	}

	/**
	 * @return the id
	 */
	@JsonGetter("id")
	public int getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
	 */
	@JsonSetter("id")
	public void setId(int id) {
		this.id = id;
	}

	/**
	 * @return the quantity
	 */
	@JsonGetter("qty")
	public float getQuantity() {
		return quantity;
	}

	/**
	 * @param quantity
	 *            the quantity to set
	 */
	@JsonSetter("qty")
	public void setQuantity(float quantity) {
		this.quantity = quantity;
	}

	/**
	 * @return the name
	 */
	@JsonGetter("nm")
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	@JsonSetter("nm")
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the rate
	 */
	@JsonGetter("rt")
	public int getRate() {
		return rate;
	}

	/**
	 * @param rate
	 *            the rate to set
	 */
	@JsonSetter("rt")
	public void setRate(int rate) {
		this.rate = rate;
	}

	/**
	 * @return the amount
	 */
	@JsonGetter("amt")
	public String getAmount() {
		return amount;
	}

	/**
	 * @param amount
	 *            the amount to set
	 */
	@JsonSetter("amt")
	public void setAmount(String amount) {
		this.amount = amount;
	}

	/**
	 * @return the date
	 */
	@JsonGetter("dt")
	public String getDate() {
		return date;
	}

	/**
	 * @param date
	 *            the date to set
	 */
	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}

	@JsonGetter("docDeptName")
	public String getDocDeptName() {
		return docDeptName;
	}

	@JsonSetter("docDeptName")
	public void setDocDeptName(String docDeptName) {
		this.docDeptName = docDeptName;
	}

	@JsonGetter("discName")
	public String getDiscount_name() {
		return discount_name;
	}

	@JsonSetter("discName")
	public void setDiscount_name(String discount_name) {
		this.discount_name = discount_name;
	}

	@JsonGetter("inCharge")
	public String getIn_charge() {
		return in_charge;
	}

	@JsonSetter("inCharge")
	public void setIn_charge(String in_charge) {
		this.in_charge = in_charge;
	}

	@JsonGetter("listOpdRecComp")
	public List<BillComponentSample> getOpdrecComplist() {
		return opdrecComplist;
	}

	@JsonSetter("listOpdRecComp")
	public void setOpdrecComplist(List<BillComponentSample> opdrecComplist) {
		this.opdrecComplist = opdrecComplist;
	}
	@JsonGetter("ipdBillList")
	public List<HospitalDetails> getIpdBillList() {
		return ipdBillList;
	}
	@JsonSetter("ipdBillList")
	public void setIpdBillList(List<HospitalDetails> ipdBillList) {
		this.ipdBillList = ipdBillList;
	}
	@JsonGetter("disComp")
	public float getDiscount() {
		return discount;
	}

	@JsonSetter("disComp")
	public void setDiscount(float discount) {
		this.discount = discount;
	}

	@JsonGetter("netAmt")
	public String getNetAmount() {
		return netAmount;
	}

	@JsonSetter("netAmt")
	public void setNetAmount(String netAmount) {
		this.netAmount = netAmount;
	}

	@JsonGetter("narra")
	public String getDiscNarration() {
		return discNarration;
	}

	@JsonSetter("narra")
	public void setDiscNarration(String discNarration) {
		this.discNarration = discNarration;
	}
	
	@JsonGetter("pay")
	public Float getPay() {
		return pay;
	}
	
	@JsonSetter("pay")
	public void setPay(Float pay) {
		this.pay = pay;
	}
	
	@JsonGetter("coPay")
	public Float getCoPay() {
		return coPay;
	}
	
	@JsonSetter("coPay")
	public void setCoPay(Float coPay) {
		this.coPay = coPay;
	}
	
	@JsonGetter("liDisc")
	public List<IPDDiscount> getListIPDDiscount() {
		return listIPDDiscount;
	}
	@JsonSetter("liDisc")
	public void setListIPDDiscount(List<IPDDiscount> listIPDDiscount) {
		this.listIPDDiscount = listIPDDiscount;
	}
	@JsonGetter("liOpd")
	public List<OpdBillParticular> getLiOpdBillDetails() {
		return liOpdBillDetails;
	}
	@JsonSetter("liOpd")
	public void setLiOpdBillDetails(List<OpdBillParticular> liOpdBillDetails) {
		this.liOpdBillDetails = liOpdBillDetails;
	}
	@JsonGetter("opdBillingId")
	public String getOpdBillingId() {
		return opdBillingId;
	}
	@JsonSetter("opdBillingId")
	public void setOpdBillingId(String opdBillingId) {
		this.opdBillingId = opdBillingId;
	}
	
	@JsonGetter("nursingchargesRate")
	public float getNursingchargesRate() {
		return nursingchargesRate;
	}
	@JsonSetter("nursingchargesRate")
	public void setNursingchargesRate(float nursingchargesRate) {
		this.nursingchargesRate = nursingchargesRate;
	}
	
	@JsonGetter("nursingchargesPay")
	public float getNursingchargesPay() {
		return nursingchargesPay;
	}
	
	@JsonSetter("nursingchargesPay")
	public void setNursingchargesPay(float nursingchargesPay) {
		this.nursingchargesPay = nursingchargesPay;
	}
	
	@JsonGetter("nursingchargesCoPay")
	public float getNursingchargesCoPay() {
		return nursingchargesCoPay;
	}
	
	@JsonSetter("nursingchargesCoPay")
	public void setNursingchargesCoPay(float nursingchargesCoPay) {
		this.nursingchargesCoPay = nursingchargesCoPay;
	}
	
	@JsonGetter("nursingchargesDiscount")
	public float getNursingchargesDiscount() {
		return nursingchargesDiscount;
	}
	
	@JsonSetter("nursingchargesDiscount")
	public void setNursingchargesDiscount(float nursingchargesDiscount) {
		this.nursingchargesDiscount = nursingchargesDiscount;
	}
	@JsonGetter("nursingchargesQuantity")
	public float getNursingchargesQuantity() {
		return nursingchargesQuantity;
	}

	@JsonSetter("nursingchargesQuantity")
	public void setNursingchargesQuantity(float nursingchargesQuantity) {
		this.nursingchargesQuantity = nursingchargesQuantity;
	}
	@JsonGetter("st")
	public String getStatus() {
		return status;
	}
	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}
	@JsonGetter("billCatDisc")
	public String getBill_cat_disc() {
		return bill_cat_disc;
	}
	@JsonSetter("billCatDisc")
	public void setBill_cat_disc(String bill_cat_disc) {
		this.bill_cat_disc = bill_cat_disc;
	}
	@JsonGetter("prevBillCatDisc")
	public String getPrev_bill_cat_disc() {
		return prev_bill_cat_disc;
	}
	@JsonSetter("prevBillCatDisc")
	public void setPrev_bill_cat_disc(String prev_bill_cat_disc) {
		this.prev_bill_cat_disc = prev_bill_cat_disc;
	}
	
	@JsonGetter("physicalDischargeFlag")
	public String getPhysicalDischargeFlag() {
		return physicalDischargeFlag;
	}
	@JsonSetter("physicalDischargeFlag")
	public void setPhysicalDischargeFlag(String physicalDischargeFlag) {
		this.physicalDischargeFlag = physicalDischargeFlag;
	}
	
	
	
	@JsonGetter("biilipdid")
	public int getBiilipdid() {
		return biilipdid;
	}
	@JsonSetter("biilipdid")
	public void setBiilipdid(int biilipdid) {
		this.biilipdid = biilipdid;
	}
	
	
	
	
}
