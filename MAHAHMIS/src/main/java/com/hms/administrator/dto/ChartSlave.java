package com.hms.administrator.dto;

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
@Entity
@Table(name="chart_slave")
public class ChartSlave {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idchart_slave")
	private int idchartTypeTbl;
	@Column(name="cName")
	private String name;
	@Column(name="status")
	private String status;
	@Column(name="cType")
	private int cType;
	@Column(name="fee")
	private String fee;
	
	@Column(name="idchartTypeTbl")
	private int idchartTypeTb=0;
	@Transient
	private List<ChartSlave> listChartType;
	
	
	public int getIdchartTypeTbl() {
		return idchartTypeTbl;
	}
	public void setIdchartTypeTbl(int idchartTypeTbl) {
		this.idchartTypeTbl = idchartTypeTbl;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getcType() {
		return cType;
	}
	public void setcType(int cType) {
		this.cType = cType;
	}
	@JsonGetter("listChartType")
	public List<ChartSlave> getListChartType() {
		return listChartType;
	}
	@JsonSetter("listChartType")
	public void setListChartType(List<ChartSlave> listChartType) {
		this.listChartType = listChartType;
	}
	public String getFee() {
		return fee;
	}
	public void setFee(String fee) {
		this.fee = fee;
	}
	@Override
	public String toString() {
		return "ChartSlave [idchartTypeTbl=" + idchartTypeTbl + ", name="
				+ name + ", status=" + status + ", cType=" + cType + ", fee="
				+ fee + ", listChartType=" + listChartType + "]";
	}
	
	
}
