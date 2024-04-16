package com.hms.dto;

import java.util.List;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class Order_comp_druges {

	private int idorder_comp_druges;
	private int idorder_master;
	private String prep;
	private String druges_doses;
	private String invProdID;
	private String strength;
	private String unit;
	private String doseType;
	private String frequency;
	private String remarks;
	private String route;
	private String days;
	private String quantity;
	private String morning;
	private String afternoon;
	private String evening;
	private String night;
	private String pname;
	private String sign;
	private String pharmaIndentStatus;
	private String timeslot;
	private String instruction;
	private String prepName;
	private List<Order_comp_druges> orderFormObjList;
	private String marathiInstruction;
	
	private String	dayPrescription;
	private String	timePrescription;
	

	private int treatmentID;
	private String date;
	private int templateID;
    private String templateName;
    private String myTemplateFlag;
    private String orgTemplateFlag;
    private String userFullName;
    private int userID;
	private int routeID;
	@JsonGetter("routeID")
    public int getRouteID() {
		return routeID;
	}
   @JsonSetter("routeID")

	public void setRouteID(int routeID) {
		this.routeID = routeID;
	}
   @JsonGetter("timePrescription")
	public String getTimePrescription() {
		return timePrescription;
	}
	@JsonSetter("timePrescription")
	public void setTimePrescription(String timePrescription) {
		this.timePrescription = timePrescription;
	}
   
@JsonGetter("dayPrescription")
    public String getDayPrescription() {
		return dayPrescription;
	}
    @JsonSetter("dayPrescription")
	public void setDayPrescription(String dayPrescription) {
		this.dayPrescription = dayPrescription;
	}
	@JsonGetter("templateID")
    public int getTemplateID() {
        return templateID;
    }
    @JsonSetter("templateID")
    public void setTemplateID(int templateID) {
        this.templateID = templateID;
    }
    @JsonGetter("templateName")
    public String getTemplateName() {
        return templateName;
    }
    @JsonSetter("templateName")
    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }
    @JsonGetter("myTemplateFlag")
    public String getMyTemplateFlag() {
        return myTemplateFlag;
    }
    @JsonSetter("myTemplateFlag")
    public void setMyTemplateFlag(String myTemplateFlag) {
        this.myTemplateFlag = myTemplateFlag;
    }
    @JsonGetter("orgTemplateFlag")
    public String getOrgTemplateFlag() {
        return orgTemplateFlag;
    }
    @JsonGetter("orgTemplateFlag")
    public void setOrgTemplateFlag(String orgTemplateFlag) {
        this.orgTemplateFlag = orgTemplateFlag;
    }
    @JsonGetter("userFullName")
    public String getUserFullName() {
        return userFullName;
    }
    @JsonSetter("userFullName")
    public void setUserFullName(String userFullName) {
        this.userFullName = userFullName;
    }
	
	public String getPrepName() {
		return prepName;
	}

	public void setPrepName(String prepName) {
		this.prepName = prepName;
	}

	public String getInstruction() {
		return instruction;
	}

	public void setInstruction(String instruction) {
		this.instruction = instruction;
	}
	

	@JsonGetter("prep")
	public String getPrep() {
		return prep;
	}

	@JsonSetter("prep")
	public void setPrep(String prep) {
		this.prep = prep;
	}

	@JsonGetter("strength")
	public String getStrength() {
		return strength;
	}

	@JsonSetter("strength")
	public void setStrength(String strength) {
		this.strength = strength;
	}

	@JsonGetter("doseType")
	public String getDoseType() {
		return doseType;
	}

	@JsonSetter("doseType")
	public void setDoseType(String doseType) {
		this.doseType = doseType;
	}

	@JsonGetter("frequency")
	public String getFrequency() {
		return frequency;
	}

	@JsonSetter("frequency")
	public void setFrequency(String frequency) {
		this.frequency = frequency;
	}

	@JsonGetter("route")
	public String getRoute() {
		return route;
	}

	@JsonSetter("route")
	public void setRoute(String route) {
		this.route = route;
	}

	@JsonGetter("mor")
	public String getMorning() {
		return morning;
	}

	@JsonSetter("mor")
	public void setMorning(String morning) {
		this.morning = morning;
	}

	@JsonGetter("aft")
	public String getAfternoon() {
		return afternoon;
	}

	@JsonSetter("aft")
	public void setAfternoon(String afternoon) {
		this.afternoon = afternoon;
	}

	@JsonGetter("eve")
	public String getEvening() {
		return evening;
	}

	@JsonSetter("eve")
	public void setEvening(String evening) {
		this.evening = evening;
	}

	@JsonGetter("night")
	public String getNight() {
		return night;
	}

	@JsonSetter("night")
	public void setNight(String night) {
		this.night = night;
	}

	@JsonGetter("days")
	public String getDays() {
		return days;
	}

	@JsonSetter("days")
	public void setDays(String days) {
		this.days = days;
	}

	@JsonGetter("qty")
	public String getQuantity() {
		return quantity;
	}

	@JsonSetter("qty")
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	@JsonGetter("pn")
	public String getPname() {
		return pname;
	}

	@JsonSetter("pn")
	public void setPname(String pname) {
		this.pname = pname;
	}

	private List<Order_comp_druges> order_comp_drugesList;

	@JsonGetter("ocdID")
	public int getIdorder_comp_druges() {
		return idorder_comp_druges;
	}

	@JsonSetter("ocdID")
	public void setIdorder_comp_druges(int idorder_comp_druges) {
		this.idorder_comp_druges = idorder_comp_druges;
	}

	@JsonGetter("omID")
	public int getIdorder_master() {
		return idorder_master;
	}

	@JsonSetter("omID")
	public void setIdorder_master(int idorder_master) {
		this.idorder_master = idorder_master;
	}

	@JsonGetter("drdo")
	public String getDruges_doses() {
		return druges_doses;
	}

	@JsonSetter("drdo")
	public void setDruges_doses(String druges_doses) {
		this.druges_doses = druges_doses;
	}

	@JsonGetter("sign")
	public String getSign() {
		return sign;
	}

	@JsonSetter("sign")
	public void setSign(String sign) {
		this.sign = sign;
	}

	@JsonGetter("rmrk")
	public String getRemarks() {
		return remarks;
	}

	@JsonSetter("rmrk")
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	@JsonGetter("orcodrli")
	public List<Order_comp_druges> getOrder_comp_drugesList() {
		return order_comp_drugesList;
	}

	@JsonSetter("orcodrli")
	public void setOrder_comp_drugesList(
			List<Order_comp_druges> order_comp_drugesList) {
		this.order_comp_drugesList = order_comp_drugesList;
	}

	@JsonGetter("invProdID")
	public String getInvProdID() {
		return invProdID;
	}

	@JsonSetter("invProdID")
	public void setInvProdID(String invProdID) {
		this.invProdID = invProdID;
	}

	@JsonGetter("indentStatus")
	public String getPharmaIndentStatus() {
		return pharmaIndentStatus;
	}

	@JsonSetter("indentStatus")
	public void setPharmaIndentStatus(String pharmaIndentStatus) {
		this.pharmaIndentStatus = pharmaIndentStatus;
	}

	@JsonGetter("unit")
	public String getUnit() {
		return unit;
	}

	@JsonSetter("unit")
	public void setUnit(String unit) {
		this.unit = unit;
	}
	@JsonGetter("tso")
	public String getTimeslot() {
		return timeslot;
	}
	@JsonSetter("tso")
	public void setTimeslot(String timeslot) {
		this.timeslot = timeslot;
	}

	public List<Order_comp_druges> getOrderFormObjList() {
		return orderFormObjList;
	}

	public void setOrderFormObjList(List<Order_comp_druges> orderFormObjList) {
		this.orderFormObjList = orderFormObjList;
	}
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	public int getTreatmentID() {
		return treatmentID;
	}
	public void setTreatmentID(int treatmentID) {
		this.treatmentID = treatmentID;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	@JsonGetter("marathiInst")
	public String getMarathiInstruction() {
		return marathiInstruction;
	}

	@JsonSetter("marathiInst")
	public void setMarathiInstruction(String marathiInstruction) {
		this.marathiInstruction = marathiInstruction;
	}
}
