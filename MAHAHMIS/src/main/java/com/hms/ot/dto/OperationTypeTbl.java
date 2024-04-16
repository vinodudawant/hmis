package com.hms.ot.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonGetter;

@Entity
@Table(name = "operation_type_tbl")
public class OperationTypeTbl implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name = "idoperation_type_tbl")
	private int idoperationTypeTbl;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "status")
	private String status;
	
	@Transient
	private List<OperationTypeTbl> listOperationType;

	public OperationTypeTbl() {
	}

	public OperationTypeTbl(int idoperationTypeTbl) {
		this.idoperationTypeTbl = idoperationTypeTbl;
	}

	public OperationTypeTbl(int idoperationTypeTbl, String name, String status,
			Set operationNamerTbls) {
		this.idoperationTypeTbl = idoperationTypeTbl;
		this.name = name;
		this.status = status;
		
	}

	@JsonGetter("idpt")
	public int getIdoperationTypeTbl() {
		return this.idoperationTypeTbl;
	}

	public void setIdoperationTypeTbl(int idoperationTypeTbl) {
		this.idoperationTypeTbl = idoperationTypeTbl;
	}

	@JsonGetter("ptnm")
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@JsonGetter("st")
	public String getStatus() {
		return this.status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	
	@JsonGetter("lipt")
	public List<OperationTypeTbl> getListOperationType() {
		return listOperationType;
	}

	public void setListOperationType(List<OperationTypeTbl> listOperationType) {
		this.listOperationType = listOperationType;
	}
}
