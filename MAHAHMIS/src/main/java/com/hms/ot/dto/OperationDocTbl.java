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

import com.fasterxml.jackson.annotation.JsonGetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.hms.dto.Doctor;
@Entity
@Table(name = "operation_doc_tbl")
public class OperationDocTbl implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idoperation_doc_tbl")
	private Integer idoperationDocTbl;
	
	@Column(name = "treatmentOperationsManageID")
	private Integer idtreatmentOperationManage;
	
	@Column(name = "doc_id")
	private Integer docId;
	
	@Column(name = "status")
	private String status;
	
	@Column(name = "docType")
	private String docType;
	
	@Column(name = "docName")
	private String docName;
	
	@Column(name = "surgeontype")
	private String surgeonType;
	
	@Column(name = "remove")
	private String remove;
	
	@Column(name = "confirm")
	private String confirm;
	
	@Column(name = "confirmedTime")
	private String confirmTime;
	
	@Column(name = "arrival")
	private String arrival;
	
	@Column(name = "arrivalTime")
	private String arrivalTime;
	
	@Column(name = "absent")
	private String absent;
	
	@Column(name = "narration")
	private String narration;
	
	@Column(name = "removedMarkBy")
	private Integer removedMarkBy;
	
	@Column(name = "confirmedMarkBy")
	private int confirmedMarkBy;
	
	@Column(name = "arrivalMarkBy")
	private String arrivalMarkBy;
	
	@Column(name = "absentMarkBy")
	private String absentMarkBy;
	
	@Column(name = "unit_id")
	private Integer unitId=1;
	
	@Transient
	@JsonIgnore
	private List<OperationDocTbl> listOpertationDoc;
	
	@Transient
	private Doctor objDoctor;
	
	@Transient
	private Doctor objDoc;

	@JsonGetter("idtremng")
	public Integer getIdtreatmentOperationManage() {
		return idtreatmentOperationManage;
	}

	@JsonSetter("idtremng")
	public void setIdtreatmentOperationManage(Integer idtreatmentOperationManage) {
		this.idtreatmentOperationManage = idtreatmentOperationManage;
	}

	@JsonGetter("remove")
	public String getRemove() {
		return remove;
	}

	@JsonSetter("remove")
	public void setRemove(String remove) {
		this.remove = remove;
	}

	@JsonGetter("confirm")
	public String getConfirm() {
		return confirm;
	}

	@JsonSetter("confirm")
	public void setConfirm(String confirm) {
		this.confirm = confirm;
	}

	@JsonGetter("conTime")
	public String getConfirmTime() {
		return confirmTime;
	}

	@JsonSetter("conTime")
	public void setConfirmTime(String confirmTime) {
		this.confirmTime = confirmTime;
	}

	@JsonGetter("arrival")
	public String getArrival() {
		return arrival;
	}

	@JsonSetter("arrival")
	public void setArrival(String arrival) {
		this.arrival = arrival;
	}

	@JsonGetter("arrTime")
	public String getArrivalTime() {
		return arrivalTime;
	}

	@JsonSetter("arrTime")
	public void setArrivalTime(String arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	@JsonGetter("doctp")
	public String getDocType() {
		return docType;
	}

	@JsonSetter("doctp")
	public void setDocType(String docType) {
		this.docType = docType;
	}

	@JsonGetter("idopDocTbl")
	public Integer getIdoperationDocTbl() {
		return this.idoperationDocTbl;
	}

	@JsonSetter("idopDocTbl")
	public void setIdoperationDocTbl(Integer idoperationDocTbl) {
		this.idoperationDocTbl = idoperationDocTbl;
	}

	@JsonGetter("idopDoc")
	public Integer getDocId() {
		return this.docId;
	}

	@JsonSetter("idopDoc")
	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	@JsonGetter("st")
	public String getStatus() {
		return this.status;
	}

	@JsonSetter("st")
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonGetter("liopDoc")
	public List<OperationDocTbl> getListOpertationDoc() {
		return listOpertationDoc;
	}

	@JsonSetter("liopDoc")
	public void setListOpertationDoc(List<OperationDocTbl> listOpertationDoc) {
		this.listOpertationDoc = listOpertationDoc;
	}

	@JsonGetter("docName")
	public String getDocName() {
		return docName;
	}

	@JsonSetter("docName")
	public void setDocName(String docName) {
		this.docName = docName;
	}

	@JsonGetter("surgtp")
	public String getSurgeonType() {
		return surgeonType;
	}

	@JsonSetter("surgtp")
	public void setSurgeonType(String surgeonType) {
		this.surgeonType = surgeonType;
	}

	@JsonGetter("absent")
	public String getAbsent() {
		return absent;
	}

	@JsonSetter("absent")
	public void setAbsent(String absent) {
		this.absent = absent;
	}

	@JsonGetter("narra")
	public String getNarration() {
		return narration;
	}

	@JsonSetter("narra")
	public void setNarration(String narration) {
		this.narration = narration;
	}

	@JsonSetter("obd")
	public void setObjDoctor(Doctor objDoctor) {
		this.objDoctor = objDoctor;
	}

	@JsonGetter("obd")
	public Doctor getObjDoctor() {
		return objDoctor;
	}

	public Integer getRemovedMarkBy() {
		return removedMarkBy;
	}

	public void setRemovedMarkBy(Integer removedMarkBy) {
		this.removedMarkBy = removedMarkBy;
	}

	public int getConfirmedMarkBy() {
		return confirmedMarkBy;
	}

	public void setConfirmedMarkBy(int confirmedMarkBy) {
		this.confirmedMarkBy = confirmedMarkBy;
	}

	public String getArrivalMarkBy() {
		return arrivalMarkBy;
	}

	public void setArrivalMarkBy(String arrivalMarkBy) {
		this.arrivalMarkBy = arrivalMarkBy;
	}

	public String getAbsentMarkBy() {
		return absentMarkBy;
	}

	public void setAbsentMarkBy(String absentMarkBy) {
		this.absentMarkBy = absentMarkBy;
	}
	
	public Integer getUnitId() {
		return unitId;
	}

	public void setUnitId(Integer unitId) {
		this.unitId = unitId;
	}

	public Doctor getObjDoc() {
		return objDoc;
	}

	public void setObjDoc(Doctor objDoc) {
		this.objDoc = objDoc;
	}
}
