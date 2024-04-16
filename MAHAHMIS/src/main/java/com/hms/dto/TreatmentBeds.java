package com.hms.dto;

import java.sql.Timestamp;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class TreatmentBeds {

	private int iD;
	private int treatment_ID;
	private int bed_ID;
	private Timestamp in_Time;
	private Timestamp out_Time;
	private String charges;
	private String bed_type;
	private String bed_name;
	private String strDate;
	private String hallName;
	private String hallType;
	private Integer hallID;
	private String isolation;
	private String bedAllocatedFor;
	private String bedStatus;
	private float allocatedDays;
	private String idBillableBedType;
	private String idBillableHallName;
	private List<TreatmentBeds> list;
	private Float pay;
	private Float coPay;
	private Float discount;
	
	private String billingEntryFlag;
	private float nursingchargesQuantity;
	private float nursingchargesPay;
	private float nursingchargesCoPay;
	private float nursingchargesDiscount;
	private String nursingbillingEntryFlag;
	
	private String physicalDischargeFlag;
	
	private float diff;
	private float perTotalDays;
	private int idhall_type;
	private String hall_type_name;
	private String noOfBeds;
	
	@JsonGetter("diff")
	public float getDiff() {
		return diff;
	}
	@JsonSetter("diff")
	public void setDiff(float diff) {
		this.diff = diff;
	}
	@JsonGetter("perTotalDay")
	public float getPerTotalDays() {
		return perTotalDays;
	}
	@JsonSetter("perTotalDay")
	public void setPerTotalDays(float perTotalDays) {
		this.perTotalDays = perTotalDays;
	}

	@JsonGetter("idht")
	public int getIdhall_type() {
		return idhall_type;
	}

	@JsonSetter("idht")
	public void setIdhall_type(int idhall_type) {
		this.idhall_type = idhall_type;
	}

	@JsonGetter("htnm")
	public String getHall_type_name() {
		return hall_type_name;
	}

	@JsonSetter("htnm")
	public void setHall_type_name(String hall_type_name) {
		this.hall_type_name = hall_type_name;
	}
	@JsonGetter("nob")
	public String getNoOfBeds() {
		return noOfBeds;
	}
	@JsonSetter("nob")
	public void setNoOfBeds(String noOfBeds) {
		this.noOfBeds = noOfBeds;
	}
	@JsonGetter("nursingbillingEntryFlag")
	public String getNursingbillingEntryFlag() {
		return nursingbillingEntryFlag;
	}
	@JsonSetter("nursingbillingEntryFlag")
	public void setNursingbillingEntryFlag(String nursingbillingEntryFlag) {
		this.nursingbillingEntryFlag = nursingbillingEntryFlag;
	}
	
	@JsonGetter("nursingchargesQuantity")
	public float getNursingchargesQuantity() {
		return nursingchargesQuantity;
	}

	@JsonSetter("nursingchargesQuantity")
	public void setNursingchargesQuantity(float nursingchargesQuantity) {
		this.nursingchargesQuantity = nursingchargesQuantity;
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

	@JsonGetter("billEntryFlag")
	public String getBillingEntryFlag() {
		return billingEntryFlag;
	}
	
	@JsonSetter("billEntryFlag")
	public void setBillingEntryFlag(String billingEntryFlag) {
		this.billingEntryFlag = billingEntryFlag;
	}

	@JsonGetter("disComp")
	public Float getDiscount() {
		return discount;
	}

	@JsonSetter("disComp")
	public void setDiscount(Float discount) {
		this.discount = discount;
	}

	@JsonGetter("days")
	public float getAllocatedDays() {
		return allocatedDays;
	}
	@JsonSetter("days")
	public void setAllocatedDays(float allocatedDays) {
		this.allocatedDays = allocatedDays;
	}

	@JsonGetter("bst")
	public String getBedStatus() {
		return bedStatus;
	}
	@JsonSetter("bst")
	public void setBedStatus(String bedStatus) {
		this.bedStatus = bedStatus;
	}

	@JsonGetter("bdalfr")
	public String getBedAllocatedFor() {
		return bedAllocatedFor;
	}
	@JsonSetter("bdalfr")
	public void setBedAllocatedFor(String bedAllocatedFor) {
		this.bedAllocatedFor = bedAllocatedFor;
	}

	public String getIsolation() {
		return isolation;
	}

	public void setIsolation(String isolation) {
		this.isolation = isolation;
	}

	public String getStrDate() {
		return strDate;
	}

	public void setStrDate(String strDate) {
		this.strDate = strDate;
	}

	/**
	 * @return the bed_type
	 */
	@JsonGetter("bty")
	public String getBed_type() {
		return bed_type;
	}

	/**
	 * @param bed_type
	 *            the bed_type to set
	 */
	@JsonSetter("bty")
	public void setBed_type(String bed_type) {
		this.bed_type = bed_type;
	}

	@JsonGetter("bnm")
	public String getBed_name() {
		return bed_name;
	}
	@JsonSetter("bnm")
	public void setBed_name(String bed_name) {
		this.bed_name = bed_name;
	}
	/**
	 * @return the charges
	 */
	@JsonGetter("chr")
	public String getCharges() {
		return charges;
	}

	/**
	 * @param string
	 *            the charges to set
	 */
	@JsonSetter("chr")
	public void setCharges(String string) {
		this.charges = string;
	}

	public TreatmentBeds(int bed_ID, int id, Timestamp in_Time,
			Timestamp out_Time, int treatment_ID) {
		super();
		this.bed_ID = bed_ID;
		this.iD = id;
		this.in_Time = in_Time;
		this.out_Time = out_Time;
		this.treatment_ID = treatment_ID;
	}

	public TreatmentBeds() {
		super();
	}

	/**
	 * @return the iD
	 */
	@JsonGetter("id")
	public int getiD() {
		return iD;
	}

	/**
	 * @param id
	 *            the iD to set
	 */
	@JsonSetter("id")
	public void setiD(int id) {
		this.iD = id;
	}

	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("ti")
	public int getTreatment_ID() {
		return treatment_ID;
	}

	/**
	 * @param treatment_ID
	 *            the treatment_ID to set
	 */
	@JsonSetter("ti")
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}

	/**
	 * @return the bed_ID
	 */

	@JsonGetter("trBed")
	public int getBed_ID() {
		return bed_ID;
	}

	/**
	 * @param bed_ID
	 *            the bed_ID to set
	 */
	@JsonSetter("trBed")
	public void setBed_ID(int bed_ID) {
		this.bed_ID = bed_ID;
	}

	/**
	 * @return the in_Time
	 */
	@JsonGetter("it")
	public Timestamp getIn_Time() {
		return in_Time;
	}

	/**
	 * @param in_Time
	 *            the in_Time to set
	 */
	@JsonSetter("it")
	public void setIn_Time(Timestamp in_Time) {
		this.in_Time = in_Time;
	}

	/**
	 * @return the out_Time
	 */
	@JsonGetter("ot")
	public Timestamp getOut_Time() {
		return out_Time;
	}

	/**
	 * @param out_Time
	 *            the out_Time to set
	 */
	@JsonSetter("ot")
	public void setOut_Time(Timestamp out_Time) {
		this.out_Time = out_Time;
	}
	
	@JsonGetter("hn")
	public String getHallName() {
		return hallName;
	}
	@JsonSetter("hn")
	public void setHallName(String hallName) {
		this.hallName = hallName;
	}

	@JsonGetter("ht")
	public String getHallType() {
		return hallType;
	}
	@JsonSetter("ht")
	public void setHallType(String hallType) {
		this.hallType = hallType;
	}

	@JsonGetter("hid")
	public Integer getHallID() {
		return hallID;
	}
	@JsonSetter("hid")
	public void setHallID(Integer hallID) {
		this.hallID = hallID;
	}

	@JsonGetter("bbt")
	public String getIdBillableBedType() {
		return idBillableBedType;
	}

	@JsonSetter("bbt")
	public void setIdBillableBedType(String idBillableBedType) {
		this.idBillableBedType = idBillableBedType;
	}

	@JsonGetter("bhn")
	public String getIdBillableHallName() {
		return idBillableHallName;
	}
	@JsonSetter("bhn")
	public void setIdBillableHallName(String idBillableHallName) {
		this.idBillableHallName = idBillableHallName;
	}

	@JsonGetter("tbList")
	public List<TreatmentBeds> getList() {
		return list;
	}
	@JsonSetter("tbList")
	public void setList(List<TreatmentBeds> list) {
		this.list = list;
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

	@JsonGetter("physicalDischargeFlag")
	public String getPhysicalDischargeFlag() {
		return physicalDischargeFlag;
	}
	@JsonSetter("physicalDischargeFlag")
	public void setPhysicalDischargeFlag(String physicalDischargeFlag) {
		this.physicalDischargeFlag = physicalDischargeFlag;
	}
}
