package com.hms.pharmacy.pojo;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;



@Entity
@Table(name="pharma_voucher")
public class VoucherNumberPhysicalStock {
	@Id
	@GeneratedValue
	@Column(name="voucher_no")
	private Integer voucherNo;
	
	@Column(name="created_user_name")
	private String createdUserName;
		
	@Column(name = "created_by", updatable = false)
	private Integer createdBy;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date", updatable = false)
	private Date createdDate;

	@Transient
	private List<VoucherNumberPhysicalStock> lstvocher;
	
	public Integer getVoucherNo() {
		return voucherNo;
	}

	public void setVoucherNo(Integer voucherNo) {
		this.voucherNo = voucherNo;
	}

	public String getCreatedUserName() {
		return createdUserName;
	}

	public void setCreatedUserName(String createdUserName) {
		this.createdUserName = createdUserName;
	}

	public Integer getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Integer createdBy) {
		this.createdBy = createdBy;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public List<VoucherNumberPhysicalStock> getLstvocher() {
		return lstvocher;
	}

	public void setLstvocher(List<VoucherNumberPhysicalStock> lstvocher) {
		this.lstvocher = lstvocher;
	}
	
	
}
