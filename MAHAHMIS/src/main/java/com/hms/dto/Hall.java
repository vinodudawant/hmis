package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

import com.hms.administrator.dto.Beds;

public class Hall implements Serializable {

	private static final long serialVersionUID = 1L;
	
	// added by vinod start
	private int ehat_hallId;
	
	// added by vinod start
		private Integer unitId;
	
	public Integer getUnitId() {
			return unitId;
		}
		public void setUnitId(Integer unitId) {
			this.unitId = unitId;
		}
	public int getEhat_hallId() {
		return ehat_hallId;
	}
	public void setEhat_hallId(int ehat_hallId) {
		this.ehat_hallId = ehat_hallId;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	// added by vinod end
	
	private int hall_ID;
	private String hname;
	private String floor;
	private String number_of_Beds;
	private String htype;
	private String htypeName;
	private String available_Beds;
	private String lease;
	private Beds objBeds;
	private Float leaseIsolation;
	private int idbedcorporate;
	private int corporate_acc_id;
	
	private Float leasePay;
	private Float leaseIsolationPay;
	private Float leaseCoPay;
	private Float leaseIsolationCoPay;
	private String billableFlag;
	private List<Beds> bedList;
	
	public int getCorporate_acc_id() {
		return corporate_acc_id;
	}
	public void setCorporate_acc_id(int corporate_acc_id) {
		this.corporate_acc_id = corporate_acc_id;
	}
	@JsonGetter("idb")
	public int getIdbedcorporate() {
		return idbedcorporate;
	}
	@JsonSetter("idb")
	public void setIdbedcorporate(int idbedcorporate) {
		this.idbedcorporate = idbedcorporate;
	}

	@JsonGetter("leaseiso")
	public Float getLeaseIsolation() {
		return leaseIsolation;
	}
	@JsonSetter("leaseiso")
	public void setLeaseIsolation(Float leaseIsolation) {
		this.leaseIsolation = leaseIsolation;
	}

	@JsonGetter("htnm")
	public String getHtypeName() {
		return htypeName;
	}
	@JsonSetter("htnm")
	public void setHtypeName(String htypeName) {
		this.htypeName = htypeName;
	}

	@JsonGetter("bl")
	public List<Beds> getBedList() {
		return bedList;
	}
	@JsonSetter("bl")
	public void setBedList(List<Beds> bedList) {
		this.bedList = bedList;
	}

	@JsonGetter("ojb")
	public Beds getObjBeds() {
		return objBeds;
	}
	@JsonSetter("ojb")
	public void setObjBeds(Beds objBeds) {
		this.objBeds = objBeds;
	}

	private List<Hall> hallList = null;

	/**
	 * @return the hallList
	 */
	@JsonGetter("hl")
	public List<Hall> getHallList() {
		return hallList;
	}

	/**
	 * @param hallList
	 *            the hallList to set
	 */
	@JsonSetter("hl")
	public void setHallList(List<Hall> arrHall) {
		this.hallList = arrHall;
	}

	public Hall(String available_Beds, String floor, int hall_ID, String hname,
			String htype, String lease, String number_of_Beds) {
		super();
		this.available_Beds = available_Beds;
		this.floor = floor;
		this.hall_ID = hall_ID;
		this.hname = hname;
		this.htype = htype;
		this.lease = lease;
		this.number_of_Beds = number_of_Beds;
	}

	public Hall() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the hall_ID
	 */
	@JsonGetter("hi")
	public int getHall_ID() {
		return hall_ID;
	}

	/**
	 * @param hall_ID
	 *            the hall_ID to set
	 */
	@JsonSetter("hi")
	public void setHall_ID(int hall_ID) {
		this.hall_ID = hall_ID;
	}

	/**
	 * @return the hname
	 */
	@JsonGetter("hn")
	public String getHname() {
		return hname;
	}

	/**
	 * @param hname
	 *            the hname to set
	 */
	@JsonSetter("hn")
	public void setHname(String hname) {
		this.hname = hname;
	}

	/**
	 * @return the floor
	 */
	@JsonGetter("fl")
	public String getFloor() {
		return floor;
	}

	/**
	 * @param floor
	 *            the floor to set
	 */
	@JsonSetter("fl")
	public void setFloor(String floor) {
		this.floor = floor;
	}

	/**
	 * @return the number_of_Beds
	 */
	@JsonGetter("bn")
	public String getNumber_of_Beds() {
		return number_of_Beds;
	}

	/**
	 * @param number_of_Beds
	 *            the number_of_Beds to set
	 */
	@JsonSetter("bn")
	public void setNumber_of_Beds(String number_of_Beds) {
		this.number_of_Beds = number_of_Beds;
	}

	/**
	 * @return the htype
	 */
	@JsonGetter("ht")
	public String getHtype() {
		return htype;
	}

	/**
	 * @param htype
	 *            the htype to set
	 */
	@JsonSetter("ht")
	public void setHtype(String htype) {
		this.htype = htype;
	}

	@Override
	public String toString() {
		return "[ hall_ID" + hall_ID + "hname=" + hname + "number_of_Beds="
				+ number_of_Beds + "htype=" + htype + "]";
	}

	@JsonSetter("ab")
	public void setAvailable_Beds(String available_Beds) {
		this.available_Beds = available_Beds;
	}

	@JsonGetter("ab")
	public String getAvailable_Beds() {
		return available_Beds;
	}

	@JsonSetter("hal")
	public void setLease(String lease) {
		this.lease = lease;
	}

	@JsonGetter("hal")
	public String getLease() {
		return lease;
	}
	
	@JsonGetter("leaPay")
	public Float getLeasePay() {
		return leasePay;
	}
	@JsonSetter("leaPay")
	public void setLeasePay(Float leasePay) {
		this.leasePay = leasePay;
	}
	
	@JsonGetter("leaIsoPay")
	public Float getLeaseIsolationPay() {
		return leaseIsolationPay;
	}
	@JsonSetter("leaIsoPay")
	public void setLeaseIsolationPay(Float leaseIsolationPay) {
		this.leaseIsolationPay = leaseIsolationPay;
	}
	
	@JsonGetter("leaCoPay")
	public Float getLeaseCoPay() {
		return leaseCoPay;
	}
	@JsonSetter("leaCoPay")
	public void setLeaseCoPay(Float leaseCoPay) {
		this.leaseCoPay = leaseCoPay;
	}
	
	@JsonGetter("leaIsoCoPay")
	public Float getLeaseIsolationCoPay() {
		return leaseIsolationCoPay;
	}
	@JsonSetter("leaIsoCoPay")
	public void setLeaseIsolationCoPay(Float leaseIsolationCoPay) {
		this.leaseIsolationCoPay = leaseIsolationCoPay;
	}
	@JsonSetter("bflag")
	public String getBillableFlag() {
		return billableFlag;
	}
	@JsonGetter("bflag")
	public void setBillableFlag(String billableFlag) {
		this.billableFlag = billableFlag;
	}

	
}
