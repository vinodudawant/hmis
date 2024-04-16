package com.hms.administrator.dto;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.hms.dto.OperationHallwiseCharges;

@Entity
@Table(name="operationchargehallwise")
public class OperationChargehallwiseAdmin {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idoperationChargeHallWise")
	private int idoperationChargeHallWise;
	@Column(name="halltypeid")
	private int halltypeid;
	@Column(name="anescharge")
	private Float anescharge;
	@Column(name="surgeoncharge")
	private Float surgeoncharge;
	@Column(name="operationGrpId")
	private int operationGrpId;
	@Column(name="operationCatId")
	private int operationCatId;
	@Column(name="operation_id")
	private int operation_id;
	@Column(name="sponser_id")
	private int sponser_id;
	@Transient
	private Integer corporateAcId;
	@Transient
	private Float surgeonChargePay;
	@Transient
	private Float surgeonChargeCoPay;

	@Transient
	private List<OperationChargehallwiseAdmin> operationchargehall;
	@Transient
	private List<OperationHallwiseCharges> listchargesList;
	public int getIdoperationChargeHallWise() {
		return idoperationChargeHallWise;
	}
	public void setIdoperationChargeHallWise(int idoperationChargeHallWise) {
		this.idoperationChargeHallWise = idoperationChargeHallWise;
	}
	public int getHalltypeid() {
		return halltypeid;
	}
	public void setHalltypeid(int halltypeid) {
		this.halltypeid = halltypeid;
	}
	public Float getAnescharge() {
		return anescharge;
	}
	public void setAnescharge(Float anescharge) {
		this.anescharge = anescharge;
	}
	public Float getSurgeoncharge() {
		return surgeoncharge;
	}
	public void setSurgeoncharge(Float surgeoncharge) {
		this.surgeoncharge = surgeoncharge;
	}
	public int getOperationGrpId() {
		return operationGrpId;
	}
	public void setOperationGrpId(int operationGrpId) {
		this.operationGrpId = operationGrpId;
	}
	public int getOperationCatId() {
		return operationCatId;
	}
	public void setOperationCatId(int operationCatId) {
		this.operationCatId = operationCatId;
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
	public Integer getCorporateAcId() {
		return corporateAcId;
	}
	public void setCorporateAcId(Integer corporateAcId) {
		this.corporateAcId = corporateAcId;
	}
	public Float getSurgeonChargePay() {
		return surgeonChargePay;
	}
	public void setSurgeonChargePay(Float surgeonChargePay) {
		this.surgeonChargePay = surgeonChargePay;
	}
	public Float getSurgeonChargeCoPay() {
		return surgeonChargeCoPay;
	}
	public void setSurgeonChargeCoPay(Float surgeonChargeCoPay) {
		this.surgeonChargeCoPay = surgeonChargeCoPay;
	}
	
	
	public List<OperationChargehallwiseAdmin> getOperationchargehall() {
		return operationchargehall;
	}
	public void setOperationchargehall(List<OperationChargehallwiseAdmin> operationchargehall) {
		this.operationchargehall = operationchargehall;
	}
	public List<OperationHallwiseCharges> getListchargesList() {
		return listchargesList;
	}
	public void setListchargesList(List<OperationHallwiseCharges> listchargesList) {
		this.listchargesList = listchargesList;
	}
	@Override
	public String toString() {
		return "OperationChargehallwiseAdmin [idoperationChargeHallWise=" + idoperationChargeHallWise + ", halltypeid="
				+ halltypeid + ", anescharge=" + anescharge + ", surgeoncharge=" + surgeoncharge + ", operationGrpId="
				+ operationGrpId + ", operationCatId=" + operationCatId + ", operation_id=" + operation_id
				+ ", sponser_id=" + sponser_id + ", corporateAcId=" + corporateAcId + ", surgeonChargePay="
				+", listchargesList=" + listchargesList + "]";
	}
	
}
