package com.hms.ehat.dto;

import java.io.Serializable;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;

import org.hibernate.annotations.Immutable;


@Entity
@Table(name="ehat_view_patient_bed_details_ipd")
@Immutable
public class EhatViewPatientBedDetailsIpdDto implements Serializable{
	

	@Id
	@Column(name = "treatment_id")
	private Integer treatmentId;
	
	@Column(name = "bill_details_id")
	private Integer billDetailsId;
	
	@Column(name = "service_id")
	private Integer serviceId;
	
	@Column(name = "sub_service_id")
	private Integer subServiceId;
	
	@Column(name = "category_name")
	private String categoryName;
	
	@Column(name = "isCategory")
	private String isCategory;
	
	@Column(name = "BedHall")
	private String bedHall;
	
	@Column(name = "Hname")
	private String hName;
	
	@Column(name = "hall_type_name")
	private String hallTypeName;
	
	@Column(name = "paid_flag")
	private String paidFlag="N";

	@Column(name = "rate")
	private double rate;
	
	@Column(name = "amount")
	private double amount;

	@Column(name = "quantity")
	private double quantity;
	
	@Column(name = "pay")
	private double pay=0;
	
	@Column(name = "co_pay")
	private double coPay=0;
	
	@Column(name = "concession",columnDefinition="double default 0.00")
	private double concession;
	
	@Column(name = "concession_per",columnDefinition="double default 0.00")
	private double concessionPer=0;
	
	@Column(name = "other_rate")
	private double otherRate;
	
	@Column(name = "other_amount")
	private double otherAmount;
	
	@Column(name = "other_pay")
	private double otherPay;
	
	@Column(name = "other_concession")
	private double otherConcession;
	

	
	@Column(name = "other_co_pay")
	private double otherCoPay;

	
	@Column(name = "cancle")
	private String cancle;
	
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_date")
	private Date createdDate;
	
	@Column(name = "ehat_hallid")
	private int ehathallid;
	
	//@Column(name = "ehat_hallid")
	private BigInteger ehatHallId;
	
	@Column(name = "Hall_ID")
	private BigInteger hallID;
	
	@Column(name = "idhall_type")
	private BigInteger idHallType;
	
	@Column(name = "ehat_halltype_id")
	private BigInteger ehatHalltypeId;
	
	@Column(name = "sponsor_name")
	private String sponsorName;
	
	@Column(name = "paid_by_cash_flag")
	private String paidByCashFlag;
	
	@Transient
	private Date bedDate;
	
	@Transient
	private List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto;


	public Integer getTreatmentId() {
		return treatmentId;
	}

	public void setTreatmentId(Integer treatmentId) {
		this.treatmentId = treatmentId;
	}

	public Integer getBillDetailsId() {
		return billDetailsId;
	}

	public void setBillDetailsId(Integer billDetailsId) {
		this.billDetailsId = billDetailsId;
	}

	public String getPaidFlag() {
		return paidFlag;
	}

	public void setPaidFlag(String paidFlag) {
		this.paidFlag = paidFlag;
	}
	
	public Integer getServiceId() {
		return serviceId;
	}

	public void setServiceId(Integer serviceId) {
		this.serviceId = serviceId;
	}

	public Integer getSubServiceId() {
		return subServiceId;
	}

	public void setSubServiceId(Integer subServiceId) {
		this.subServiceId = subServiceId;
	}

	public String getBedHall() {
		return bedHall;
	}

	public void setBedHall(String bedHall) {
		this.bedHall = bedHall;
	}

	public String gethName() {
		return hName;
	}

	public void sethName(String hName) {
		this.hName = hName;
	}

	public String getHallTypeName() {
		return hallTypeName;
	}

	public void setHallTypeName(String hallTypeName) {
		this.hallTypeName = hallTypeName;
	}

	public double getRate() {
		return rate;
	}

	public void setRate(double rate) {
		this.rate = rate;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public double getPay() {
		return pay;
	}

	public void setPay(double pay) {
		this.pay = pay;
	}

	public double getCoPay() {
		return coPay;
	}

	public void setCoPay(double coPay) {
		this.coPay = coPay;
	}

	public double getConcession() {
		return concession;
	}

	public void setConcession(double concession) {
		this.concession = concession;
	}

	public String getCancle() {
		return cancle;
	}

	public void setCancle(String cancle) {
		this.cancle = cancle;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public List<EhatViewPatientBedDetailsIpdDto> getListBedIpdDto() {
		return listBedIpdDto;
	}

	public void setListBedIpdDto(List<EhatViewPatientBedDetailsIpdDto> listBedIpdDto) {
		this.listBedIpdDto = listBedIpdDto;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getIsCategory() {
		return isCategory;
	}

	public void setIsCategory(String isCategory) {
		this.isCategory = isCategory;
	}

	public double getOtherRate() {
		return otherRate;
	}

	public void setOtherRate(double otherRate) {
		this.otherRate = otherRate;
	}

	public double getOtherAmount() {
		return otherAmount;
	}

	public void setOtherAmount(double otherAmount) {
		this.otherAmount = otherAmount;
	}

	public double getOtherPay() {
		return otherPay;
	}

	public void setOtherPay(double otherPay) {
		this.otherPay = otherPay;
	}

	public double getOtherConcession() {
		return otherConcession;
	}

	public void setOtherConcession(double otherConcession) {
		this.otherConcession = otherConcession;
	}

	public double getOtherCoPay() {
		return otherCoPay;
	}

	public void setOtherCoPay(double otherCoPay) {
		this.otherCoPay = otherCoPay;
	}





	public BigInteger getHallID() {
		return hallID;
	}

	public void setHallID(BigInteger hallID) {
		this.hallID = hallID;
	}



	public BigInteger getIdHallType() {
		return idHallType;
	}

	public void setIdHallType(BigInteger idHallType) {
		this.idHallType = idHallType;
	}

	public BigInteger getEhatHalltypeId() {
		return ehatHalltypeId;
	}

	public void setEhatHalltypeId(BigInteger ehatHalltypeId) {
		this.ehatHalltypeId = ehatHalltypeId;
	}

	public int getEhathallid() {
		return ehathallid;
	}

	public void setEhathallid(int ehathallid) {
		this.ehathallid = ehathallid;
	}

	public BigInteger getEhatHallId() {
		return ehatHallId;
	}

	public void setEhatHallId(BigInteger ehatHallId) {
		this.ehatHallId = ehatHallId;
	}

	public double getConcessionPer() {
		return concessionPer;
	}

	public void setConcessionPer(double concessionPer) {
		this.concessionPer = concessionPer;
	}
	
	//Added By Pooja
    @Column(name = "bed_id")
    private BigInteger bedId;

    public BigInteger getBedId() {
        return bedId;
    }    
    public void setBedId(BigInteger bedId) {
        this.bedId = bedId;
    }

	public String getSponsorName() {
		return sponsorName;
	}

	public void setSponsorName(String sponsorName) {
		this.sponsorName = sponsorName;
	}

	public String getPaidByCashFlag() {
		return paidByCashFlag;
	}

	public void setPaidByCashFlag(String paidByCashFlag) {
		this.paidByCashFlag = paidByCashFlag;
	}

	public Date getBedDate() {
		return bedDate;
	}

	public void setBedDate(Date bedDate) {
		this.bedDate = bedDate;
	}    
}
