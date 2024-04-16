package com.hms.ehat.dto;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;


@Entity
@Table(name = "inv_expenses_item")
public class Inv_expenseItem {
    @Id
	@Column(name = "inv_exp_item_id")
	private int commonadv_id;

	@Column(name = "inv_exp_item_name",columnDefinition="varchar(255) default '-'")
	private String inv_exp_item_name;
	
    @Column(name = "deleted",columnDefinition="varchar(255) default 'N'")
	private String deleted;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_exp_create_date")
	private Date inv_exp_create_date;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "inv_exp_updated_date")
	private Date inv_exp_updated_date;
	@Transient	
	private List<Inv_expenseItem> ltinvetoryItemmaster;
	public int getCommonadv_id() {
		return commonadv_id;
	}

	public void setCommonadv_id(int commonadv_id) {
		this.commonadv_id = commonadv_id;
	}

	public String getInv_exp_item_name() {
		return inv_exp_item_name;
	}

	public void setInv_exp_item_name(String inv_exp_item_name) {
		this.inv_exp_item_name = inv_exp_item_name;
	}



	public String getDeleted() {
		return deleted;
	}

	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	public Date getInv_exp_create_date() {
		return inv_exp_create_date;
	}

	public void setInv_exp_create_date(Date inv_exp_create_date) {
		this.inv_exp_create_date = inv_exp_create_date;
	}

	public Date getInv_exp_updated_date() {
		return inv_exp_updated_date;
	}

	public void setInv_exp_updated_date(Date inv_exp_updated_date) {
		this.inv_exp_updated_date = inv_exp_updated_date;
	}

	public List<Inv_expenseItem> getLtinvetoryItemmaster() {
		return ltinvetoryItemmaster;
	}

	public void setLtinvetoryItemmaster(List<Inv_expenseItem> ltinvetoryItemmaster) {
		this.ltinvetoryItemmaster = ltinvetoryItemmaster;
	}


}
