package com.hms.dto;

import java.io.Serializable;
import java.util.List;

import javax.persistence.*;

import com.hms.ehat.dto.RegistrationDto;
@Entity
@Table(name="paediatric_dept_nicu")
public class PaediatricDeptNICU implements Serializable
{
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idpaediatric_dept_nicu")
	private int idpaediatric_dept_nicu;
	
	@Column(name  = "treatment_id")
	private int treatment_id;
	
	@Column(name ="ipdNo",columnDefinition="varchar(100) default ''")
	private String ipdNo;
	
	@Column(name = "birthWeight",columnDefinition = "varchar(50) default ''")
	private String birthWeight;
	
	@Column(name = "weightOnAdmission",columnDefinition = "varchar(50) default ''")
	private String weightOnAdmission;
	
	@Column(name = "weightOnDischarge",columnDefinition = "varchar(50) default ''")
	private String weightOnDischarge;
	
	@Column(name = "babysData",columnDefinition = "varchar(100) default ''")
	private String babysData;
	
	@Column(name = "deliveryData",columnDefinition = "varchar(100) default ''")
	private String deliveryData;
	
	@Column(name = "conditionAtBirth",columnDefinition = "varchar(50) default ''")
	private String conditionAtBirth;
	
	@Column(name = "ancAge",columnDefinition = "varchar(100) default ''")
	private String ancAge;
	
	@Column(name = "mbg",columnDefinition = "varchar(100) default ''")
	private String mbg;
	
	@Column(name = "rh",columnDefinition = "varchar(100) default ''")
	private String rh;
	
	@Column(name = "registration",columnDefinition = "varchar(100) default ''")
	private String registration;
	
	@Column(name = "immunized",columnDefinition = "varchar(100) default ''")
	private String immunized;
	
	@Column(name = "serHIV",columnDefinition = "varchar(100) default ''")
	private String serHIV;
	
	@Column(name = "hbsAG",columnDefinition = "varchar(100) default ''")
	private String hbsAG;
	
	@Column(name = "vdrl",columnDefinition = "varchar(100) default ''")
	private String vdrl;
	
	@Column(name = "dm",columnDefinition = "varchar(100) default ''")
	private String dm;
	
	@Column(name = "htn",columnDefinition = "varchar(100) default ''")
	private String htn;
	
	@Column(name = "thyroid",columnDefinition = "varchar(100) default ''")
	private String thyroid;
	
	@Column(name = "fever",columnDefinition = "varchar(25) default ''")
	private String fever;
	
	@Column(name = "medOther",columnDefinition = "varchar(25) default ''")
	private String medOther;
	
	@Column(name = "obsProb",columnDefinition = "varchar(100) default ''")
	private String obsProb;
	
	@Column(name = "courseInHos",columnDefinition = "varchar(100) default ''")
	private String courseInHos;
	
	@Column(name = "fluids",columnDefinition = "varchar(25) default ''")
	private String fluids;
	
	@Column(name = "antibio",columnDefinition = "varchar(25) default ''")
	private String antibio;
	
	@Column(name = "sedation1",columnDefinition = "varchar(25) default ''")
	private String sedation1;
	
	@Column(name = "sedation2",columnDefinition = "varchar(25) default ''")
	private String sedation2;
	
	@Column(name = "duration",columnDefinition = "varchar(100) default ''")
	private String duration;
	
	
	@Column(name = "organism",columnDefinition = "varchar(100) default ''")
	private String organism;
	
	@Column(name = "sensitive1",columnDefinition = "varchar(100) default ''")
	private String sensitive;
	
	@Column(name = "bslmax",columnDefinition = "varchar(100) default ''")
	private String bslmax;
	
	@Column(name = "bslmin",columnDefinition = "varchar(100) default ''")
	private String bslmin;
	
	@Column(name = "electrolyte",columnDefinition = "varchar(100) default ''")
	private String electrolyte;
	
	@Column(name = "srk",columnDefinition = "varchar(100) default ''")
	private String srk;
	
	@Column(name = "srcl",columnDefinition = "varchar(100) default ''")
	private String srcl;
	
	@Column(name = "srca",columnDefinition = "varchar(100) default ''")
	private String srca;
	
	@Column(name = "srmg",columnDefinition = "varchar(100) default ''")
	private String srmg;
	
	
	@Column(name = "xray",columnDefinition = "varchar(25) default ''")
	private String xray;
	
	@Column(name = "usg",columnDefinition = "varchar(25) default ''")
	private String usg;
	
	@Column(name = "ctmri",columnDefinition = "varchar(25) default ''")
	private String ctmri;
	
	@Column(name = "otherex",columnDefinition = "varchar(25) default ''")
	private String otherex;
	
	@Column(name = "priConsult",columnDefinition = "varchar(100) default ''")
	private String priConsult;
	
	@Column(name = "priConsultDate",columnDefinition = "varchar(100) default ''")
	private String priConsultDate;
	
	@Column(name = "priConsultTime",columnDefinition = "varchar(100) default ''")
	private String priConsultTime;
	
	@Column(name = "hrOPD",columnDefinition = "varchar(100) default ''")
	private String hrOPD;
	
	@Column(name = "hrOPDDate",columnDefinition = "varchar(100) default ''")
	private String hrOPDDate;
	
	@Column(name = "hrOPDTime",columnDefinition = "varchar(100) default ''")
	private String hrOPDTime;
	
	@Column(name = "finalOther",columnDefinition = "varchar(100) default ''")
	private String finalOther;
	
	@Column(name = "unit_id",columnDefinition="int default 1")
	private int unitId=1;
	
	/*
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "idventilation") private VentilationDTO ventilationDto;
	 * 
	 * 
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "idimaging") private ImagingDTO imagingDto;
	 * 
	 * @OneToOne(cascade = CascadeType.ALL)
	 * 
	 * @JoinColumn(name = "idelectrolyte") private ElectrolyteDTO idelectrolyte;
	 */
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinTable(name = "advice_on_desc",
    joinColumns = @JoinColumn(name = "idadvice_on_desc"),
    inverseJoinColumns = @JoinColumn(name = "idpaediatric_dept_nicu"))
    private AdviceOnDescDTO AdviceOnDescDTO;
	
//	@OneToOne(cascade = CascadeType.ALL)
//    @JoinTable(name = "imaging",
//    joinColumns = @JoinColumn(name = "idimaging"),
//    inverseJoinColumns = @JoinColumn(name = "idpaediatric_dept_nicu"))
//    private ImagingDTO imagingDTO;
//	
//	@OneToOne(cascade = CascadeType.ALL)
//    @JoinTable(name = "electrolyte",
//    joinColumns = @JoinColumn(name = "idelectrolyte"),
//    inverseJoinColumns = @JoinColumn(name = "idpaediatric_dept_nicu"))
//    private ElectrolyteDTO electrolyteDTO;
//	
//	@OneToOne(cascade = CascadeType.ALL)
//    @JoinTable(name = "ventilation",
//    joinColumns = @JoinColumn(name = "idventilation"),
//    inverseJoinColumns = @JoinColumn(name = "idpaediatric_dept_nicu"))
//    private VentilationDTO ventilationDTO;
	
	
	@Transient
	private List<PaediatricDeptNICU> listPaediatricDeptNICU;
	
	@Transient
	private List<AdviceOnDescDTO> listAdviceOnDesc;
	
	@Transient
	private List<ImagingDTO> listImaging;
	
	@Transient
	private List<ElectrolyteDTO> listElectrolyte;
	
	@Transient
	private List<VentilationDTO> listVentilation;
	
	/*
	 * public VentilationDTO getVentilationDto() { return ventilationDto; }
	 * 
	 * public void setVentilationDto(VentilationDTO ventilationDto) {
	 * this.ventilationDto = ventilationDto; }
	 * 
	 * 
	 * 
	 * public ImagingDTO getImagingDto() { return imagingDto; }
	 * 
	 * public void setImagingDto(ImagingDTO imagingDto) { this.imagingDto =
	 * imagingDto; }
	 * 
	 * public ElectrolyteDTO getIdelectrolyte() { return idelectrolyte; }
	 * 
	 * public void setIdelectrolyte(ElectrolyteDTO idelectrolyte) {
	 * this.idelectrolyte = idelectrolyte; }
	 */
	
	public List<AdviceOnDescDTO> getListAdviceOnDesc() {
		return listAdviceOnDesc;
	}

	public void setListAdviceOnDesc(List<AdviceOnDescDTO> listAdviceOnDesc) {
		this.listAdviceOnDesc = listAdviceOnDesc;
	}

	public List<ImagingDTO> getListImaging() {
		return listImaging;
	}

	public void setListImaging(List<ImagingDTO> listImaging) {
		this.listImaging = listImaging;
	}

	public List<ElectrolyteDTO> getListElectrolyte() {
		return listElectrolyte;
	}

	public void setListElectrolyte(List<ElectrolyteDTO> listElectrolyte) {
		this.listElectrolyte = listElectrolyte;
	}

	public List<VentilationDTO> getListVentilation() {
		return listVentilation;
	}

	public void setListVentilation(List<VentilationDTO> listVentilation) {
		this.listVentilation = listVentilation;
	}

	public int getIdpaediatric_dept_nicu() {
		return idpaediatric_dept_nicu;
	}

	public void setIdpaediatric_dept_nicu(int idpaediatric_dept_nicu) {
		this.idpaediatric_dept_nicu = idpaediatric_dept_nicu;
	}

	public int getTreatment_id() {
		return treatment_id;
	}

	public void setTreatment_id(int treatment_id) {
		this.treatment_id = treatment_id;
	}

	public String getIpdNo() {
		return ipdNo;
	}

	public void setIpdNo(String ipdNo) {
		this.ipdNo = ipdNo;
	}

	public String getBirthWeight() {
		return birthWeight;
	}

	public void setBirthWeight(String birthWeight) {
		this.birthWeight = birthWeight;
	}

	public String getWeightOnAdmission() {
		return weightOnAdmission;
	}

	public void setWeightOnAdmission(String weightOnAdmission) {
		this.weightOnAdmission = weightOnAdmission;
	}

	public String getWeightOnDischarge() {
		return weightOnDischarge;
	}

	public void setWeightOnDischarge(String weightOnDischarge) {
		this.weightOnDischarge = weightOnDischarge;
	}

	public String getBabysData() {
		return babysData;
	}

	public void setBabysData(String babysData) {
		this.babysData = babysData;
	}

	public String getDeliveryData() {
		return deliveryData;
	}

	public void setDeliveryData(String deliveryData) {
		this.deliveryData = deliveryData;
	}

	public String getConditionAtBirth() {
		return conditionAtBirth;
	}

	public void setConditionAtBirth(String conditionAtBirth) {
		this.conditionAtBirth = conditionAtBirth;
	}

	public String getAncAge() {
		return ancAge;
	}

	public void setAncAge(String ancAge) {
		this.ancAge = ancAge;
	}

	public String getMbg() {
		return mbg;
	}

	public void setMbg(String mbg) {
		this.mbg = mbg;
	}

	public String getRh() {
		return rh;
	}

	public void setRh(String rh) {
		this.rh = rh;
	}

	public String getRegistration() {
		return registration;
	}

	public void setRegistration(String registration) {
		this.registration = registration;
	}

	public String getImmunized() {
		return immunized;
	}

	public void setImmunized(String immunized) {
		this.immunized = immunized;
	}

	public String getSerHIV() {
		return serHIV;
	}

	public void setSerHIV(String serHIV) {
		this.serHIV = serHIV;
	}

	public String getHbsAG() {
		return hbsAG;
	}

	public void setHbsAG(String hbsAG) {
		this.hbsAG = hbsAG;
	}

	public String getVdrl() {
		return vdrl;
	}

	public void setVdrl(String vdrl) {
		this.vdrl = vdrl;
	}

	public String getDm() {
		return dm;
	}

	public void setDm(String dm) {
		this.dm = dm;
	}

	public String getHtn() {
		return htn;
	}

	public void setHtn(String htn) {
		this.htn = htn;
	}

	public String getThyroid() {
		return thyroid;
	}

	public void setThyroid(String thyroid) {
		this.thyroid = thyroid;
	}

	public String getFever() {
		return fever;
	}

	public void setFever(String fever) {
		this.fever = fever;
	}

	public String getMedOther() {
		return medOther;
	}

	public void setMedOther(String medOther) {
		this.medOther = medOther;
	}

	public String getObsProb() {
		return obsProb;
	}

	public void setObsProb(String obsProb) {
		this.obsProb = obsProb;
	}

	public String getCourseInHos() {
		return courseInHos;
	}

	public void setCourseInHos(String courseInHos) {
		this.courseInHos = courseInHos;
	}

	public String getFluids() {
		return fluids;
	}

	public void setFluids(String fluids) {
		this.fluids = fluids;
	}

	public String getAntibio() {
		return antibio;
	}

	public void setAntibio(String antibio) {
		this.antibio = antibio;
	}

	public String getSedation1() {
		return sedation1;
	}

	public void setSedation1(String sedation1) {
		this.sedation1 = sedation1;
	}

	public String getSedation2() {
		return sedation2;
	}

	public void setSedation2(String sedation2) {
		this.sedation2 = sedation2;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	

	public String getOrganism() {
		return organism;
	}

	public void setOrganism(String organism) {
		this.organism = organism;
	}

	public String getSensitive() {
		return sensitive;
	}

	public void setSensitive(String sensitive) {
		this.sensitive = sensitive;
	}

	public String getBslmax() {
		return bslmax;
	}

	public void setBslmax(String bslmax) {
		this.bslmax = bslmax;
	}

	public String getBslmin() {
		return bslmin;
	}

	public void setBslmin(String bslmin) {
		this.bslmin = bslmin;
	}

	public String getElectrolyte() {
		return electrolyte;
	}

	public void setElectrolyte(String electrolyte) {
		this.electrolyte = electrolyte;
	}

	public String getSrk() {
		return srk;
	}

	public void setSrk(String srk) {
		this.srk = srk;
	}

	public String getSrcl() {
		return srcl;
	}

	public void setSrcl(String srcl) {
		this.srcl = srcl;
	}

	public String getSrca() {
		return srca;
	}

	public void setSrca(String srca) {
		this.srca = srca;
	}

	public String getSrmg() {
		return srmg;
	}

	public void setSrmg(String srmg) {
		this.srmg = srmg;
	}

	

	public String getXray() {
		return xray;
	}

	public void setXray(String xray) {
		this.xray = xray;
	}

	public String getUsg() {
		return usg;
	}

	public void setUsg(String usg) {
		this.usg = usg;
	}

	public String getCtmri() {
		return ctmri;
	}

	public void setCtmri(String ctmri) {
		this.ctmri = ctmri;
	}

	public String getOtherex() {
		return otherex;
	}

	public void setOtherex(String otherex) {
		this.otherex = otherex;
	}

	

	

	public String getPriConsult() {
		return priConsult;
	}

	public void setPriConsult(String priConsult) {
		this.priConsult = priConsult;
	}

	public String getPriConsultDate() {
		return priConsultDate;
	}

	public void setPriConsultDate(String priConsultDate) {
		this.priConsultDate = priConsultDate;
	}

	public String getPriConsultTime() {
		return priConsultTime;
	}

	public void setPriConsultTime(String priConsultTime) {
		this.priConsultTime = priConsultTime;
	}

	public String getHrOPD() {
		return hrOPD;
	}

	public void setHrOPD(String hrOPD) {
		this.hrOPD = hrOPD;
	}

	public String getHrOPDDate() {
		return hrOPDDate;
	}

	public void setHrOPDDate(String hrOPDDate) {
		this.hrOPDDate = hrOPDDate;
	}

	public String getHrOPDTime() {
		return hrOPDTime;
	}

	public void setHrOPDTime(String hrOPDTime) {
		this.hrOPDTime = hrOPDTime;
	}

	public String getFinalOther() {
		return finalOther;
	}

	public void setFinalOther(String finalOther) {
		this.finalOther = finalOther;
	}

	public List<PaediatricDeptNICU> getListPaediatricDeptNICU() {
		return listPaediatricDeptNICU;
	}

	public void setListPaediatricDeptNICU(List<PaediatricDeptNICU> listPaediatricDeptNICU) {
		this.listPaediatricDeptNICU = listPaediatricDeptNICU;
	}
	
	
}
