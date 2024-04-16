package com.hms.ot.dto;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

@Entity
@Table(name = "patient_operation")
public class PtientOperation implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idpatient_operation")
	private int idpatientOperation;
	
	//@OneToOne(cascade = CascadeType.ALL)
	//@JoinColumn(name = "treatmentOperationsManageID")
	//@JsonIgnore
	//private TreatmentOperationsManage treatmentOperationsManage;
	
	@Column(name = "treatmentOperationsManageID")
	private int treatmentOperationsManage;
	
	@Column(name = "operation_ID")
	private int operation_ID;
	
	@Column(name = "operation_name")
	@Type(type="text")
	private String operationName;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "unit_id")
	private int unitId;

	public int getIdpatientOperation() {
		return idpatientOperation;
	}

	public void setIdpatientOperation(int idpatientOperation) {
		this.idpatientOperation = idpatientOperation;
	}

	/*public TreatmentOperationsManage getTreatmentOperationsManage() {
		return treatmentOperationsManage;
	}

	public void setTreatmentOperationsManage(TreatmentOperationsManage treatmentOperationsManage) {
		this.treatmentOperationsManage = treatmentOperationsManage;
	}*/
	

	public int getOperation_ID() {
		return operation_ID;
	}

	public int getTreatmentOperationsManage() {
		return treatmentOperationsManage;
	}

	public void setTreatmentOperationsManage(int treatmentOperationsManage) {
		this.treatmentOperationsManage = treatmentOperationsManage;
	}

	public void setOperation_ID(int operation_ID) {
		this.operation_ID = operation_ID;
	}

	public String getOperationName() {
		return operationName;
	}

	public void setOperationName(String operationName) {
		this.operationName = operationName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getUnitId() {
		return unitId;
	}

	public void setUnitId(int unitId) {
		this.unitId = unitId;
	}
}
