package com.hms.pharmacy.pojo;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;

@Entity 
@Immutable
@Table(name = "pharma_product")
public class PharmaProductView {

	@Column(name = "hsn_no")
	private int hsnno;
	
	@Column(name = "tax_rate")
	private double taxrate;
	
	@Id
	@Column(name = "product_id")
	private int productid;
	
	@Column(name = "tax_id")
	private int taxid;
	
	@Transient
	private int stateId;
	
	@Transient
	private List<PharmaProductView> listpharmaproduct;

	public int getHsnno() {
		return hsnno;
	}

	public void setHsnno(int hsnno) {
		this.hsnno = hsnno;
	}

	public double getTaxrate() {
		return taxrate;
	}

	public void setTaxrate(double taxrate) {
		this.taxrate = taxrate;
	}

	public int getProductid() {
		return productid;
	}

	public void setProductid(int productid) {
		this.productid = productid;
	}

	public List<PharmaProductView> getListpharmaproduct() {
		return listpharmaproduct;
	}

	public void setListpharmaproduct(List<PharmaProductView> listpharmaproduct) {
		this.listpharmaproduct = listpharmaproduct;
	}

	public int getStateId() {
		return stateId;
	}

	public void setStateId(int stateId) {
		this.stateId = stateId;
	}

	public int getTaxid() {
		return taxid;
	}

	public void setTaxid(int taxid) {
		this.taxid = taxid;
	}
	
	
}
