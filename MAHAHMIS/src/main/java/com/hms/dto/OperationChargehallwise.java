package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.codehaus.jackson.annotate.JsonGetter;
import org.codehaus.jackson.annotate.JsonSetter;

public class OperationChargehallwise implements Serializable {
	
	
	private int idoperationChargeHallWise;
	
	private int halltypeid;
	
	private Float anescharge;
	
	private Float surgeoncharge;
	
	private int operationGrpId;

	private int operationCatId;

	private int operation_id;
	
	private int sponser_id;
	
	private Integer corporateAcId;
	
	private Float surgeonChargePay;
	
	private Float surgeonChargeCoPay;
	
	private List<OperationChargehallwise> opChrageList;
	
	private List<OperationChargehallwise> operationchargehallwise;
	
	private List<OperationHallwiseCharges> listchargesList;
	@JsonGetter("listchargesList")
	public List<OperationHallwiseCharges> getListchargesList() {
		return listchargesList;
	}
	@JsonSetter("listchargesList")
	public void setListchargesList(List<OperationHallwiseCharges> listchargesList) {
		this.listchargesList = listchargesList;
	}

	@JsonGetter("corporateid")
	public Integer getCorporateAcId() {
		return corporateAcId;
	}

	@JsonSetter("corporateid")
	public void setCorporateAcId(Integer corporateAcId) {
		this.corporateAcId = corporateAcId;
	}

	@JsonGetter("opgrpid")
	public int getOperationGrpId() {
		return operationGrpId;
	}

	@JsonSetter("opgrpid")
	public void setOperationGrpId(int operationGrpId) {
		this.operationGrpId = operationGrpId;
	}

	@JsonGetter("opcatid")
	public int getOperationCatId() {
		return operationCatId;
	}

	@JsonSetter("opcatid")
	public void setOperationCatId(int operationCatId) {
		this.operationCatId = operationCatId;
	}

	@JsonGetter("idopchr")
	public int getIdoperationChargeHallWise() {
		return idoperationChargeHallWise;
	}

	@JsonSetter("idopchr")
	public void setIdoperationChargeHallWise(int idoperationChargeHallWise) {
		this.idoperationChargeHallWise = idoperationChargeHallWise;
	}

	@JsonGetter("idhl")
	public int getHalltypeid() {
		return halltypeid;
	}

	@JsonSetter("idhl")
	public void setHalltypeid(int halltypeid) {
		this.halltypeid = halltypeid;
	}

	@JsonGetter("anechr")
	public Float getAnescharge() {
		return anescharge;
	}

	@JsonSetter("anechr")
	public void setAnescharge(Float anescharge) {
		this.anescharge = anescharge;
	}

	@JsonGetter("surchr")
	public Float getSurgeoncharge() {
		return surgeoncharge;
	}

	@JsonSetter("surchr")
	public void setSurgeoncharge(Float surgeoncharge) {
		this.surgeoncharge = surgeoncharge;
	}

	@JsonGetter("opchrli")
	public List<OperationChargehallwise> getOpChrageList() {
		return opChrageList;
	}

	@JsonSetter("opchrli")
	public void setOpChrageList(List<OperationChargehallwise> opChrageList) {
		this.opChrageList = opChrageList;
	}

	@JsonGetter("surchrPay")
	public Float getSurgeonChargePay() {
		return surgeonChargePay;
	}

	@JsonSetter("surchrPay")
	public void setSurgeonChargePay(Float surgeonChargePay) {
		this.surgeonChargePay = surgeonChargePay;
	}

	@JsonGetter("surchrCoPay")
	public Float getSurgeonChargeCoPay() {
		return surgeonChargeCoPay;
	}

	@JsonSetter("surchrCoPay")
	public void setSurgeonChargeCoPay(Float surgeonChargeCoPay) {
		this.surgeonChargeCoPay = surgeonChargeCoPay;
	}
	public int getOperation_id() {
		return operation_id;
	}
	public void setOperation_id(int operation_id) {
		this.operation_id = operation_id;
	}
	public int getSponser_id() {
		return sponser_id;
	}
	public void setSponser_id(int sponser_id) {
		this.sponser_id = sponser_id;
	}
	
	public List<OperationChargehallwise> getOperationchargehallwise() {
		return operationchargehallwise;
	}
	public void setOperationchargehallwise(List<OperationChargehallwise> operationchargehallwise) {
		this.operationchargehallwise = operationchargehallwise;
	}
	@Override
	public String toString() {
		return "OperationChargehallwise [idoperationChargeHallWise=" + idoperationChargeHallWise + ", halltypeid="
				+ halltypeid + ", anescharge=" + anescharge + ", surgeoncharge=" + surgeoncharge + ", operationGrpId="
				+ operationGrpId + ", operationCatId=" + operationCatId + ", operation_id=" + operation_id
				+ ", sponser_id=" + sponser_id + ", corporateAcId=" + corporateAcId + ", surgeonChargePay="
				+ surgeonChargePay + ", surgeonChargeCoPay=" + surgeonChargeCoPay + ", opChrageList=" + opChrageList
				+ ", listchargesList=" + listchargesList + ", getListchargesList()=" + getListchargesList()
				+ ", getCorporateAcId()=" + getCorporateAcId() + ", getOperationGrpId()=" + getOperationGrpId()
				+ ", getOperationCatId()=" + getOperationCatId() + ", getIdoperationChargeHallWise()="
				+ getIdoperationChargeHallWise() + ", getHalltypeid()=" + getHalltypeid() + ", getAnescharge()="
				+ getAnescharge() + ", getSurgeoncharge()=" + getSurgeoncharge() + ", getOpChrageList()="
				+ getOpChrageList() + ", getSurgeonChargePay()=" + getSurgeonChargePay() + ", getSurgeonChargeCoPay()="
				+ getSurgeonChargeCoPay() + ", getOperation_id()=" + getOperation_id() + ", getSponser_id()="
				+ getSponser_id() + ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()="
				+ super.toString() + "]";
	}
	
}
