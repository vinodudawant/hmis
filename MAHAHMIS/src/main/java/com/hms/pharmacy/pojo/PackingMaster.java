package com.hms.pharmacy.pojo;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="pharma_packing_master")
public class PackingMaster implements Serializable {
	
	
	
	@Id
	@GeneratedValue
	@Column(name="pack_id")
	private Integer packId;
	
	@Column(name="pack_type")
	private String packType;
	
	
	@Column(name="pack_delete_flag")
	private Integer packDeleteFlag;
	
	@Column(name="pack_update_date")
	private Date packUpdateDate;
	
	@Column(name = "pak_add_date")
	private Date pakAddDate;

	public Date getPakAddDate() {
		return pakAddDate;
	}

	public void setPakAddDate(Date pakAddDate) {
		this.pakAddDate = pakAddDate;
	}

	public Integer getPackId() {
		return packId;
	}

	public void setPackId(Integer packId) {
		this.packId = packId;
	}

	public String getPackType() {
		return packType;
	}

	public void setPackType(String packType) {
		this.packType = packType;
	}

	public Integer getPackDeleteFlag() {
		return packDeleteFlag;
	}

	public void setPackDeleteFlag(Integer packDeleteFlag) {
		this.packDeleteFlag = packDeleteFlag;
	}

	public Date getPackUpdateDate() {
		return packUpdateDate;
	}

	public void setPackUpdateDate(Date packUpdateDate) {
		this.packUpdateDate = packUpdateDate;
	}

	
}
