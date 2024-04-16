package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;


public class TreatmentNurses {
	
	private int iD;
	private int treatment_ID;
	private int nurse_ID;
	private int bed_ID;
	private String checkUP_Time;
	private String precription;
	private String comments;
	private List<TreatmentNurses> treNurseList;
	private String  drugName ;
	private String strength ; 
	private String dose; 
	private String fluildDrips; 
	private String date;
	private Float quantity;
	private String invProdID;
	private String note;
	private Double prodMrp;
	private String nurse_name;
	private String headingNote;
	private String headingNotes;
	private String Drug_Name ;
	private String DrugStrength ; 
	private String DrugDose; 
	private String DrugQty;
	private String DrugTime; 
	private String DrugFrequency; 
	private String DrugRoute; 
	private String DrugAssignBy;
	private String Drug_Date; 
	private List<TreatmentNurses> treDrugList;

	/**
	 * @return the quantity
	 */
	@JsonGetter("fdq")
	public Float getQuantity() {
		return quantity;
	}
	/**
	 * @param quantity the quantity to set
	 */
	@JsonSetter("fdq")
	public void setQuantity(Float quantity) {
		this.quantity = quantity;
	}
	Doctor objUsers = new Doctor();
	
	
	
	/**
	 * @return the objUsers
	 */
	@JsonGetter("objU")
	public Doctor getObjUsers() {
		return objUsers;
	}
	/**
	 * @param objUsers the objUsers to set
	 */
	@JsonSetter("objU")
	public void setObjUsers(Doctor objUsers) {
		this.objUsers = objUsers;
	}
	@JsonGetter("dn")
	public String getDrugName() {
		return drugName;
	}	@JsonSetter("dn")
	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
	@JsonGetter("stren")
	public String getStrength() {
		return strength;
	}@JsonSetter("stren")
	public void setStrength(String strength) {
		this.strength = strength;
	}
	@JsonGetter("dose")
	public String getDose() {
		return dose;
	}	@JsonSetter("dose")
	public void setDose(String dose) {
		this.dose = dose;
	}
	@JsonGetter("fd")
	public String getFluildDrips() {
		return fluildDrips;
	}	@JsonSetter("fd")
	public void setFluildDrips(String fluildDrips) {
		this.fluildDrips = fluildDrips;
	}
	@JsonGetter("dt")
	public String getDate() {
		return date;
	}	@JsonSetter("dt")
	public void setDate(String date) {
		this.date = date;
	}
	public TreatmentNurses() {
		
	}
	public TreatmentNurses(int bed_ID, String checkUP_Time, String comments,
			int id, int nurse_ID, String precription, int treatment_ID,String note) {
		super();
		this.bed_ID = bed_ID;
		this.checkUP_Time = checkUP_Time;
		this.comments = comments;
		this.iD = id;
		this.nurse_ID = nurse_ID;
		this.precription = precription;
		this.treatment_ID = treatment_ID;
		this.note = note;
	}
	/**
	 * @return the iD
	 */
	@JsonGetter("tnid")
	public int getiD() {
		return iD;
	}
	/**
	 * @param id the iD to set
	 */	@JsonSetter("tnid")
	public void setiD(int id) {
		this.iD = id;
	}
	/**
	 * @return the treatment_ID
	 */
	@JsonGetter("tid")
	public int getTreatment_ID() {
		return treatment_ID;
	}
	/**
	 * @param treatment_ID the treatment_ID to set
	 */	@JsonSetter("tid")
	public void setTreatment_ID(int treatment_ID) {
		this.treatment_ID = treatment_ID;
	}
	/**
	 * @return the nurse_ID
	 */
	@JsonGetter("nid")
	public int getNurse_ID() {
		return nurse_ID;
	}
	/**
	 * @param nurse_ID the nurse_ID to set
	 */	@JsonSetter("nid")
	public void setNurse_ID(int nurse_ID) {
		this.nurse_ID = nurse_ID;
	}
	/**
	 * @return the bed_ID
	 */
	@JsonGetter("bid")
	public int getBed_ID() {
		return bed_ID;
	}
	/**
	 * @param bed_ID the bed_ID to set
	 */@JsonSetter("bid")
	public void setBed_ID(int bed_ID) {
		this.bed_ID = bed_ID;
	}
	/**
	 * @return the checkUP_Time
	 */
	@JsonGetter("cut")
	public String getCheckUP_Time() {
		return checkUP_Time;
	}
	/**
	 * @param string the checkUP_Time to set
	 */@JsonSetter("cut")
	public void setCheckUP_Time(String string) {
		this.checkUP_Time = string;
	}
	/**
	 * @return the precription
	 */
	@JsonGetter("pre")
	public String getPrecription() {
		return precription;
	}
	/**
	 * @param precription the precription to set
	 */@JsonSetter("pre")
	public void setPrecription(String precription) {
		this.precription = precription;
	}
	/**
	 * @return the comments
	 */
	@JsonGetter("cmt")
	public String getComments() {
		return comments;
	}
	/**
	 * @param comments the comments to set
	 */@JsonSetter("cmt")
	public void setComments(String comments) {
		this.comments = comments;
	}
	 @JsonSetter("tnl")
	public void setTreNurseList(List<TreatmentNurses> treNurseList) {
		this.treNurseList = treNurseList;
	}
	@JsonGetter("tnl")
	public List<TreatmentNurses> getTreNurseList() {
		return treNurseList;
	}
	public void setNursingChart(List<TreatmentNurses> arrChart) {
		
	}
	@JsonGetter("invProd")
	public String getInvProdID() {
		return invProdID;
	}
	@JsonSetter("invProd")
	public void setInvProdID(String invProdID) {
		this.invProdID = invProdID;
	}
	@JsonGetter("prodMrp")
	public Double getProdMrp() {
		return prodMrp;
	}
	@JsonSetter("prodMrp")
	public void setProdMrp(Double prodMrp) {
		this.prodMrp = prodMrp;
	}
	@JsonGetter("note")
	public String getNote() {
		return note;
	}
	@JsonSetter("note")
	public void setNote(String note) {
		this.note = note;
	}
	@JsonGetter("nname")
	public String getNurse_name() {
		return nurse_name;
	}
	@JsonSetter("nname")
	public void setNurse_name(String nurse_name) {
		this.nurse_name = nurse_name;
	}

	@JsonGetter("DT")
	public String getDrugTime() {
		return DrugTime;
	}
	
	@JsonSetter("DT")
	public void setDrugTime(String time) {
		DrugTime = time;
	}
	
	
	@JsonGetter("DF")
	public String getDrugFrequency() {
		return DrugFrequency;
	}
	
	@JsonSetter("DF")
	public void setDrugFrequency(String frequency) {
		DrugFrequency = frequency;
	}
	
	@JsonGetter("DR")
	public String getDrugRoute() {
		return DrugRoute;
	}
	
	@JsonSetter("DR")
	public void setDrugRoute(String route) {
		DrugRoute = route;
	}
	
	@JsonGetter("DA")
	public String getDrugAssignBy() {
		return DrugAssignBy;
	}
	
	@JsonSetter("DA")
	public void setDrugAssignBy(String DrugAssignBy) {
		this.DrugAssignBy = DrugAssignBy;
	}
	
	
	@JsonGetter("DQ")
	public String getDrugQty() {
		return DrugQty;
	}
	
	@JsonSetter("DQ")
	public void setDrugQty(String qty) {
		DrugQty = qty;
	}
	
	@JsonGetter("DS")
	public String getDrugStrength() {
		return DrugStrength;
	}
	
	@JsonSetter("DS")
	public void setDrugStrength(String drugStrength) {
		DrugStrength = drugStrength;
	}
	
	@JsonGetter("DD")
	public String getDrugDose() {
		return DrugDose;
	}
	
	@JsonSetter("DD")
	public void setDrugDose(String drugDose) {
		DrugDose = drugDose;
	}
	
	@JsonGetter("DName")
	public String getDrug_Name() {
		return Drug_Name;
	}
	
	@JsonSetter("DName")
	public void setDrug_Name(String drug_Name) {
		Drug_Name = drug_Name;
	}
	
	@JsonGetter("Ddate")
	public String getDrugDate() {
		return Drug_Date;
	}
	
	@JsonSetter("Ddate")
	public void setDrugDate(String DrugDate) {
		Drug_Date = DrugDate;
	}
	
	/**
	 * @return the headingNote
	 */
	@JsonGetter("headingNote")
	public String getheadingNote() {
		return headingNote;
	}
	/**
	 * @param string the headingNote to set
	 */@JsonSetter("headingNote")
	public void setheadingNote(String headingNote) {
		this.headingNote = headingNote;
	}
	 
	 /**
		 * @return the HeadingNotes
		 */
		@JsonGetter("HeadingNotes")
		public String getheadingNotes() {
			return headingNotes;
		}
		/**
		 * @param string the HeadingNotes to set
		 */@JsonSetter("HeadingNotes")
		public void setheadingNotes(String headingNotes) {
			this.headingNotes = headingNotes;
		}
	
	@JsonSetter("druglist")
		public void setTreDrugList(List<TreatmentNurses> treDrugList) {
		 this.treDrugList = treDrugList;
	}
	@JsonGetter("druglist")
	    public List<TreatmentNurses> getTreDrugList() {
		 return treDrugList;
	} 
		 
}
