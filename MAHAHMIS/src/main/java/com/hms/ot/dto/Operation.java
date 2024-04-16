package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonSetter;

@Entity
@Table(name = "operation")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Operation implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "Operation_id")
	private int operation_id;

	@Column(name = "OName")
	private String operName;

	@Column(name = "opType")
	private int opType;

	@Column(name = "Risk")
	private String risk;

	@Column(name = "Equipments")
	private String equipments;

	@Column(name = "Charges")
	private String charges;

	@Column(name = "Equi_price")
	private String ePrice;

	@Column(name = "Extra_Charge")
	private String eCharges;

	@Column(name = "status")
	private String status;

	@Column(name = "opstate")
	private String opstate;

	@Column(name = "opgrade")
	private String opgrade;

	@Column(name = "opcathlab")
	private String cathlab;
	
	@Column(name = "opspeciality")
	private String opspeciality;

	@Transient
	private List<Operation> operationList;
	@Transient
	private int operation_slave_id;
	@Transient
	private String preAnsCharges;
	@Transient
	private String bedSideServices;
	@Transient
	private String gasAndMonitorServices;
	@Transient
	private String insrumentAndEquipemntServices;
	@Transient
	private String speName;
	@Transient
	private int emergencyFlag;
	@Transient
	int treatmentOperationsManageID;
	@Transient
	private int toId;
	@Transient
	private String doctorDiscountNarration;
	@Transient
	private Float operationChargesPay;
	@Transient
	private Float operationChargesCoPay;
	@Transient
	private Float operationChargesDiscount;
	@Transient
	private Float assSurgChargesPay;
	@Transient
	private Float assSurgChargesCoPay;
	@Transient
	private Float assSurgChargesDiscount;
	@Transient
	private Float anaesthetistChargesPay;
	@Transient
	private Float anaesthetistChargesCoPay;
	@Transient
	private Float anaesthetistChargesDiscount;
	@Transient
	private Float preAnaesChargesPay;
	@Transient
	private Float preAnaesChargesCoPay;
	@Transient
	private Float preAnaesChargesDiscount;
	@Transient
	private Float surInstChargesPay;
	@Transient
	private Float surInstChargesCoPay;
	@Transient
	private Float surInstChargesDiscount;
	@Transient
	private int surInstChargesPercent;
	@Transient
	private String anasChrgType;
	@Transient
	private Float otTheatreChargesPay;
	@Transient
	private Float otTheatreChargesCoPay;
	@Transient
	private Float otTheatreChargesDiscount;
	@Transient
	private String doctorDiscount;
	@Transient
	private int FlagForOtCharges;

//	private List<BillComponentSample> billComponentList;
//	private List<BillComponentSample> billComponentList1;
//	private List<BillComponentSample> comsumablelist;
//	private List<BillMaster> billList;
//	private List<OperationChargehallwise> opChrageList;

	@JsonGetter("cathlab")
	public String getCathlab() {
		return cathlab;
	}

	@JsonSetter("cathlab")
	public void setCathlab(String cathlab) {
		this.cathlab = cathlab;
	}
//	@JsonGetter("comsumablelist")
//	public List<BillComponentSample> getComsumablelist() {
//		return comsumablelist;
//	}
//	@JsonSetter("comsumablelist")
//	public void setComsumablelist(List<BillComponentSample> comsumablelist) {
//		this.comsumablelist = comsumablelist;
//	}
//	
//	private List<OperationHallwiseCharges> listchargesList;
//	@JsonGetter("listchargesList")
//	public List<OperationHallwiseCharges> getListchargesList() {
//		return listchargesList;
//	}
//	@JsonSetter("listchargesList")
//	public void setListchargesList(List<OperationHallwiseCharges> listchargesList) {
//		this.listchargesList = listchargesList;
//	}

	@JsonGetter("ePrice")
	public String getePrice() {
		return ePrice;
	}
	@JsonSetter("ePrice")
	public void setePrice(String ePrice) {
		this.ePrice = ePrice;
	}

	@JsonGetter("eCharges")
	public String geteCharges() {
		return eCharges;
	}
	@JsonSetter("eCharges")
	public void seteCharges(String eCharges) {
		this.eCharges = eCharges;
	}

	@JsonGetter("opspeciality")
	public String getOpspeciality() {
		return opspeciality;
	}
	@JsonSetter("opspeciality")
	public void setOpspeciality(String opspeciality) {
		this.opspeciality = opspeciality;
	}

	@JsonGetter("FlagForOtCharges")
	public int getFlagForOtCharges() {
		return FlagForOtCharges;
	}

	@JsonSetter("FlagForOtCharges")
	public void setFlagForOtCharges(int flagForOtCharges) {
		FlagForOtCharges = flagForOtCharges;
	}

	@JsonGetter("ottheatreP")
	public Float getOtTheatreChargesPay() {
		return otTheatreChargesPay;
	}

	@JsonSetter("ottheatreP")
	public void setOtTheatreChargesPay(Float otTheatreChargesPay) {
		this.otTheatreChargesPay = otTheatreChargesPay;
	}

	@JsonGetter("ottheatreCoP")
	public Float getOtTheatreChargesCoPay() {
		return otTheatreChargesCoPay;
	}

	@JsonSetter("ottheatreCoP")
	public void setOtTheatreChargesCoPay(Float otTheatreChargesCoPay) {
		this.otTheatreChargesCoPay = otTheatreChargesCoPay;
	}

	@JsonGetter("ottheatreDisc")
	public Float getOtTheatreChargesDiscount() {
		return otTheatreChargesDiscount;
	}

	@JsonSetter("ottheatreDisc")
	public void setOtTheatreChargesDiscount(Float otTheatreChargesDiscount) {
		this.otTheatreChargesDiscount = otTheatreChargesDiscount;
	}

	@JsonGetter("docDisc")
	public String getDoctorDiscount() {
		return doctorDiscount;
	}

	@JsonSetter("docDisc")
	public void setDoctorDiscount(String doctorDiscount) {
		this.doctorDiscount = doctorDiscount;
	}

	@JsonGetter("docDiscNarr")
	public String getDoctorDiscountNarration() {
		return doctorDiscountNarration;
	}

	@JsonSetter("docDiscNarr")
	public void setDoctorDiscountNarration(String doctorDiscountNarration) {
		this.doctorDiscountNarration = doctorDiscountNarration;
	}

	@JsonGetter("tomid")
	public int getTreatmentOperationsManageID() {
		return treatmentOperationsManageID;
	}

	@JsonSetter("tomid")
	public void setTreatmentOperationsManageID(int treatmentOperationsManageID) {
		this.treatmentOperationsManageID = treatmentOperationsManageID;
	}

	@JsonGetter("emeFlg")
	public int getEmergencyFlag() {
		return emergencyFlag;
	}

	@JsonSetter("emeFlg")
	public void setEmergencyFlag(int emergencyFlag) {
		this.emergencyFlag = emergencyFlag;
	}

	@JsonGetter("preAnsChr")
	public String getPreAnsCharges() {
		return preAnsCharges;
	}

	@JsonSetter("preAnsChr")
	public void setPreAnsCharges(String preAnsCharges) {
		this.preAnsCharges = preAnsCharges;
	}

	@JsonGetter("bedsd")
	public String getBedSideServices() {
		return bedSideServices;
	}

	@JsonSetter("bedsd")
	public void setBedSideServices(String bedSideServices) {
		this.bedSideServices = bedSideServices;
	}

	@JsonGetter("gasmo")
	public String getGasAndMonitorServices() {
		return gasAndMonitorServices;
	}

	@JsonSetter("gasmo")
	public void setGasAndMonitorServices(String gasAndMonitorServices) {
		this.gasAndMonitorServices = gasAndMonitorServices;
	}

	@JsonGetter("instrueqp")
	public String getInsrumentAndEquipemntServices() {
		return insrumentAndEquipemntServices;
	}

	@JsonSetter("instrueqp")
	public void setInsrumentAndEquipemntServices(String insrumentAndEquipemntServices) {
		this.insrumentAndEquipemntServices = insrumentAndEquipemntServices;
	}

//	@JsonGetter("opchrli")
//	public List<OperationChargehallwise> getOpChrageList() {
//		return opChrageList;
//	}
//
//	@JsonSetter("opchrli")
//	public void setOpChrageList(List<OperationChargehallwise> opChrageList) {
//		this.opChrageList = opChrageList;
//	}

	@JsonGetter("opst")
	public String getOpstate() {
		return opstate;
	}

	@JsonSetter("opst")
	public void setOpstate(String opstate) {
		this.opstate = opstate;
	}

	@JsonGetter("opgr")
	public String getOpgrade() {
		return opgrade;
	}

	@JsonSetter("opgr")
	public void setOpgrade(String opgrade) {
		this.opgrade = opgrade;
	}

	@JsonGetter("spnm")
	public String getSpeName() {
		return speName;
	}

	@JsonSetter("spnm")
	public void setSpeName(String speName) {
		this.speName = speName;
	}

//	@JsonGetter("bcs1")
//	public List<BillComponentSample> getBillComponentList1() {
//		return billComponentList1;
//	}
//
//	@JsonSetter("bcs1")
//	public void setBillComponentList1(
//			List<BillComponentSample> billComponentList1) {
//		this.billComponentList1 = billComponentList1;
//	}
//
//	/**
//	 * @return the billList
//	 */
//	@JsonGetter("bl")
//	public List<BillMaster> getBillList() {
//		return billList;
//	}
//
//	/**
//	 * @param billList
//	 *            the billList to set
//	 */
//	@JsonSetter("bl")
//	public void setBillList(List<BillMaster> billList) {
//		this.billList = billList;
//	}

//	/**
//	 * @return the billComponentList
//	 */
//	@JsonGetter("bcl")
//	public List<BillComponentSample> getBillComponentList() {
//		return billComponentList;
//	}
//
//	/**
//	 * @param list
//	 *            the billComponentList to set
//	 */
//	@JsonSetter("bcl")
//	public void setBillComponentList(List<BillComponentSample> list) {
//		this.billComponentList = list;
//	}

	/**
	 * @return the toId
	 */
	@JsonGetter("toId")
	public int getToId() {
		return toId;
	}

	/**
	 * @param toId the toId to set
	 */
	@JsonSetter("toId")
	public void setToId(int toId) {
		this.toId = toId;
	}

	public Operation(int operation_id, String operName, String risk, String equipments, String charges, String ePrice,
			String eCharges, String status) {
		super();
		this.charges = charges;
		this.equipments = equipments;
		this.operName = operName;
		this.operation_id = operation_id;
		this.risk = risk;
		this.ePrice = ePrice;
		this.eCharges = eCharges;
		this.status = status;
	}

	public Operation() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the operation_id
	 */
	@JsonGetter("oi")
	public int getOperation_id() {
		return operation_id;
	}

	/**
	 * @param operation_id the operation_id to set
	 */
	@JsonSetter("oi")
	public void setOperation_id(int operation_id) {
		this.operation_id = operation_id;
	}

	/**
	 * @return the operName
	 */
	@JsonGetter("on")
	public String getOperName() {
		return operName;
	}

	/**
	 * @param operName the operName to set
	 */
	@JsonSetter("on")
	public void setOperName(String operName) {
		this.operName = operName;
	}

	/**
	 * @return the risk
	 */
	@JsonGetter("or")
	public String getRisk() {
		return risk;
	}

	/**
	 * @param risk the risk to set
	 */
	@JsonSetter("or")
	public void setRisk(String risk) {
		this.risk = risk;
	}

	/**
	 * @return the equipments
	 */
	@JsonGetter("oe")
	public String getEquipments() {
		return equipments;
	}

	/**
	 * @param equipments the equipments to set
	 */
	@JsonSetter("oe")
	public void setEquipments(String equipments) {
		this.equipments = equipments;
	}

	/**
	 * @return the charges
	 */
	@JsonGetter("oc")
	public String getCharges() {
		return charges;
	}

	/**
	 * @param charges the charges to set
	 */
	@JsonSetter("oc")
	public void setCharges(String charges) {
		this.charges = charges;
	}

	@JsonSetter("ol")
	public void setOperationList(List<Operation> operationList) {
		this.operationList = operationList;
	}

	@JsonGetter("ol")
	public List<Operation> getOperationList() {
		return operationList;
	}

	@JsonSetter("oep")
	public void setEPrice(String ePrice) {
		this.ePrice = ePrice;
	}

	@JsonGetter("oep")
	public String getEPrice() {
		return ePrice;
	}

	@JsonSetter("oec")
	public void setECharges(String eCharges) {
		this.eCharges = eCharges;
	}

	@JsonGetter("oec")
	public String getECharges() {
		return eCharges;
	}

	@JsonSetter("os")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("os")
	public String getStatus() {
		return status;
	}

	public String toString() {
		return "Operation [operation_id=" + operation_id + "operName=" + operName + "risk=" + risk + "equipments="
				+ equipments + "charges=" + charges + "Equi_price=" + ePrice + "Extra_Charge=" + eCharges + "status="
				+ status + "]";
	}

	@JsonGetter("oty")
	public int getOpType() {
		return opType;
	}

	@JsonSetter("oty")
	public void setOpType(int opType) {
		this.opType = opType;
	}

	@JsonGetter("opChP")
	public Float getOperationChargesPay() {
		return operationChargesPay;
	}

	@JsonSetter("opChP")
	public void setOperationChargesPay(Float operationChargesPay) {
		this.operationChargesPay = operationChargesPay;
	}

	@JsonGetter("opChCoP")
	public Float getOperationChargesCoPay() {
		return operationChargesCoPay;
	}

	@JsonSetter("opChCoP")
	public void setOperationChargesCoPay(Float operationChargesCoPay) {
		this.operationChargesCoPay = operationChargesCoPay;
	}

	@JsonGetter("opChD")
	public Float getOperationChargesDiscount() {
		return operationChargesDiscount;
	}

	@JsonSetter("opChD")
	public void setOperationChargesDiscount(Float operationChargesDiscount) {
		this.operationChargesDiscount = operationChargesDiscount;
	}

	@JsonGetter("asSuP")
	public Float getAssSurgChargesPay() {
		return assSurgChargesPay;
	}

	@JsonSetter("asSuP")
	public void setAssSurgChargesPay(Float assSurgChargesPay) {
		this.assSurgChargesPay = assSurgChargesPay;
	}

	@JsonGetter("asSuCoP")
	public Float getAssSurgChargesCoPay() {
		return assSurgChargesCoPay;
	}

	@JsonSetter("asSuCoP")
	public void setAssSurgChargesCoPay(Float assSurgChargesCoPay) {
		this.assSurgChargesCoPay = assSurgChargesCoPay;
	}

	@JsonGetter("asSuD")
	public Float getAssSurgChargesDiscount() {
		return assSurgChargesDiscount;
	}

	@JsonSetter("asSuD")
	public void setAssSurgChargesDiscount(Float assSurgChargesDiscount) {
		this.assSurgChargesDiscount = assSurgChargesDiscount;
	}

	@JsonGetter("anaeP")
	public Float getAnaesthetistChargesPay() {
		return anaesthetistChargesPay;
	}

	@JsonSetter("anaeP")
	public void setAnaesthetistChargesPay(Float anaesthetistChargesPay) {
		this.anaesthetistChargesPay = anaesthetistChargesPay;
	}

	@JsonGetter("anaeCoP")
	public Float getAnaesthetistChargesCoPay() {
		return anaesthetistChargesCoPay;
	}

	@JsonSetter("anaeCoP")
	public void setAnaesthetistChargesCoPay(Float anaesthetistChargesCoPay) {
		this.anaesthetistChargesCoPay = anaesthetistChargesCoPay;
	}

	@JsonGetter("anaeD")
	public Float getAnaesthetistChargesDiscount() {
		return anaesthetistChargesDiscount;
	}

	@JsonSetter("anaeD")
	public void setAnaesthetistChargesDiscount(Float anaesthetistChargesDiscount) {
		this.anaesthetistChargesDiscount = anaesthetistChargesDiscount;
	}

	@JsonGetter("preAnaeP")
	public Float getPreAnaesChargesPay() {
		return preAnaesChargesPay;
	}

	@JsonSetter("preAnaeP")
	public void setPreAnaesChargesPay(Float preAnaesChargesPay) {
		this.preAnaesChargesPay = preAnaesChargesPay;
	}

	@JsonGetter("preAnaeCoP")
	public Float getPreAnaesChargesCoPay() {
		return preAnaesChargesCoPay;
	}

	@JsonSetter("preAnaeCoP")
	public void setPreAnaesChargesCoPay(Float preAnaesChargesCoPay) {
		this.preAnaesChargesCoPay = preAnaesChargesCoPay;
	}

	@JsonGetter("preAnaeD")
	public Float getPreAnaesChargesDiscount() {
		return preAnaesChargesDiscount;
	}

	@JsonSetter("preAnaeD")
	public void setPreAnaesChargesDiscount(Float preAnaesChargesDiscount) {
		this.preAnaesChargesDiscount = preAnaesChargesDiscount;
	}

	@JsonGetter("suInP")
	public Float getSurInstChargesPay() {
		return surInstChargesPay;
	}

	@JsonSetter("suInP")
	public void setSurInstChargesPay(Float surInstChargesPay) {
		this.surInstChargesPay = surInstChargesPay;
	}

	@JsonGetter("suInCoP")
	public Float getSurInstChargesCoPay() {
		return surInstChargesCoPay;
	}

	@JsonSetter("suInCoP")
	public void setSurInstChargesCoPay(Float surInstChargesCoPay) {
		this.surInstChargesCoPay = surInstChargesCoPay;
	}

	@JsonGetter("suInD")
	public Float getSurInstChargesDiscount() {
		return surInstChargesDiscount;
	}

	@JsonSetter("suInD")
	public void setSurInstChargesDiscount(Float surInstChargesDiscount) {
		this.surInstChargesDiscount = surInstChargesDiscount;
	}

	@JsonGetter("osID")
	public int getOperation_slave_id() {
		return operation_slave_id;
	}

	@JsonSetter("osID")
	public void setOperation_slave_id(int operation_slave_id) {
		this.operation_slave_id = operation_slave_id;
	}

	@JsonGetter("surinstruPercent")
	public int getSurInstChargesPercent() {
		return surInstChargesPercent;
	}

	@JsonSetter("surinstruPercent")
	public void setSurInstChargesPercent(int surInstChargesPercent) {
		this.surInstChargesPercent = surInstChargesPercent;
	}

	@JsonGetter("anasChrgType")
	public String getAnasChrgType() {
		return anasChrgType;
	}

	@JsonSetter("anasChrgType")
	public void setAnasChrgType(String anasChrgType) {
		this.anasChrgType = anasChrgType;
	}

}
