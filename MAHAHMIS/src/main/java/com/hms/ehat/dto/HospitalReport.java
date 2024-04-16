package com.hms.ehat.dto;

import java.util.List;

import javax.persistence.Transient;

public class HospitalReport {

	    private int monthlycount;
    	private int progressivecount;
		private int totalspnsor;
    	private int totalsopnsorrevenue;	
		private int oldpatient;	
		private double avgpatientopd;	
		private double avgpatientopdprogresive;
		private int oldpatientprogresive;		
		private int deptMonthCountplastic;	
		private int deptPrgCountPlastic;	
		private int deptMonthCountPaediatric ;	
		private int deptPrgCountPaediatric;	
		private int deptMonthCountNCD ;
		private int deptPrgCountNCD;		
		private int deptMonthUrology;	
		private int deptPrgCountUrology;	
		private int lithomonthCount;
		private int lithoprogcount;
		private int montDialysisnephor=0,progresiveDialysisnephro =0, montUroNephor=0,progresiveUroNephro =0, montPeadiNephor=0,progresivePeadiNephro =0,  montICUNephor=0,progresiveICUNephro =0, montPlasticNephor=0,progresivePlasticNephro =0;	
	    private  int montDialysisUro,progresiveDialysisUro , montUroUro,progresiveUroUro , montPeadiUro,progresivePeadiUro,  montICUUro,progresiveICUUro , montPlasticUro,progresivePlasticUro;   
	    private int montDialysisPedia,progresiveDialysisPedia , montUroPedia,progresiveUroPedia, montPeadiPedia,progresivePeadiPedia ,  montICUPedia,progresiveICUPedia, montPlasticPedia,progresivePlasticPedia ;    
	    private int montDialysisPlastic,progresiveDialysisPlastic , montUroPlastic,progresiveUroPlastic, montPeadiPlastic,progresivePeadiPlastic,  montICUPlastic,progresiveICUPlastic, montPlasticPlastic,progresivePlasticPlastic;    
		private int deptPrgCountFemale; 
	    private int deptMonthCountFemale;
		
	
		private List<HospitalReport> listTreatment;
	    
		public List<HospitalReport> getListTreatment() {
			return listTreatment;
		}

		public void setListTreatment(List<HospitalReport> listTreatment) {
			this.listTreatment = listTreatment;
		}

		public int getOldpatientprogresive() {
			return oldpatientprogresive;
		}

		public void setOldpatientprogresive(int oldpatientprogresive) {
			this.oldpatientprogresive = oldpatientprogresive;
		}

		public double getAvgpatientopdprogresive() {
			return avgpatientopdprogresive;
		}

		public void setAvgpatientopdprogresive(double avgpatientopdprogresive) {
			this.avgpatientopdprogresive = avgpatientopdprogresive;
		}
	
		public int getOldpatient() {
			return oldpatient;
		}

		public void setOldpatient(int oldpatient) {
			this.oldpatient = oldpatient;
		}

		

		public double getAvgpatientopd() {
			return avgpatientopd;
		}

		public void setAvgpatientopd(double avgpatientopd) {
			this.avgpatientopd = avgpatientopd;
		}

		public int getTotalsopnsorrevenue() {
			return totalsopnsorrevenue;
		}

		public void setTotalsopnsorrevenue(int totalsopnsorrevenue) {
			this.totalsopnsorrevenue = totalsopnsorrevenue;
		}

		public int getTotalspnsor() {
			return totalspnsor;
		}

		public void setTotalspnsor(int totalspnsor) {
			this.totalspnsor = totalspnsor;
		}

		public int getMonthlycount() {
			return monthlycount;
		}

		public void setMonthlycount(int monthlycount) {
			this.monthlycount = monthlycount;
		}

		public int getProgressivecount() {
			return progressivecount;
		}

		public void setProgressivecount(int progressivecount) {
			this.progressivecount = progressivecount;
		}

		
	

		public int getDeptMonthUrology() {
			return deptMonthUrology;
		}

		public void setDeptMonthUrology(int deptMonthUrology) {
			this.deptMonthUrology = deptMonthUrology;
		}

		public int getDeptPrgCountUrology() {
			return deptPrgCountUrology;
		}

		public void setDeptPrgCountUrology(int deptPrgCountUrology) {
			this.deptPrgCountUrology = deptPrgCountUrology;
		}

		public int getDeptMonthCountplastic() {
			return deptMonthCountplastic;
		}

		public void setDeptMonthCountplastic(int deptMonthCountplastic) {
			this.deptMonthCountplastic = deptMonthCountplastic;
		}

		public int getDeptPrgCountPlastic() {
			return deptPrgCountPlastic;
		}

		public void setDeptPrgCountPlastic(int deptPrgCountPlastic) {
			this.deptPrgCountPlastic = deptPrgCountPlastic;
		}

		public int getDeptMonthCountPaediatric() {
			return deptMonthCountPaediatric;
		}

		public void setDeptMonthCountPaediatric(int deptMonthCountPaediatric) {
			this.deptMonthCountPaediatric = deptMonthCountPaediatric;
		}

		public int getDeptPrgCountPaediatric() {
			return deptPrgCountPaediatric;
		}

		public void setDeptPrgCountPaediatric(int deptPrgCountPaediatric) {
			this.deptPrgCountPaediatric = deptPrgCountPaediatric;
		}

		public int getDeptMonthCountNCD() {
			return deptMonthCountNCD;
		}

		public void setDeptMonthCountNCD(int deptMonthCountNCD) {
			this.deptMonthCountNCD = deptMonthCountNCD;
		}

		public int getDeptPrgCountNCD() {
			return deptPrgCountNCD;
		}

		public void setDeptPrgCountNCD(int deptPrgCountNCD) {
			this.deptPrgCountNCD = deptPrgCountNCD;
		}  

		
		
	    public int getLithomonthCount() {
			return lithomonthCount;
		}

		public void setLithomonthCount(int lithomonthCount) {
			this.lithomonthCount = lithomonthCount;
		}

		public int getLithoprogcount() {
			return lithoprogcount;
		}

		public void setLithoprogcount(int lithoprogcount) {
			this.lithoprogcount = lithoprogcount;
		}

	     public int getMontDialysisnephor() {
			return montDialysisnephor;
		}

		public void setMontDialysisnephor(int montDialysisnephor) {
			this.montDialysisnephor = montDialysisnephor;
		}

		public int getProgresiveDialysisnephro() {
			return progresiveDialysisnephro;
		}

		public void setProgresiveDialysisnephro(int progresiveDialysisnephro) {
			this.progresiveDialysisnephro = progresiveDialysisnephro;
		}

		public int getMontUroNephor() {
			return montUroNephor;
		}

		public void setMontUroNephor(int montUroNephor) {
			this.montUroNephor = montUroNephor;
		}

		public int getProgresiveUroNephro() {
			return progresiveUroNephro;
		}

		public void setProgresiveUroNephro(int progresiveUroNephro) {
			this.progresiveUroNephro = progresiveUroNephro;
		}

		public int getMontPeadiNephor() {
			return montPeadiNephor;
		}

		public void setMontPeadiNephor(int montPeadiNephor) {
			this.montPeadiNephor = montPeadiNephor;
		}

		public int getProgresivePeadiNephro() {
			return progresivePeadiNephro;
		}

		public void setProgresivePeadiNephro(int progresivePeadiNephro) {
			this.progresivePeadiNephro = progresivePeadiNephro;
		}

		public int getMontICUNephor() {
			return montICUNephor;
		}

		public void setMontICUNephor(int montICUNephor) {
			this.montICUNephor = montICUNephor;
		}

		public int getProgresiveICUNephro() {
			return progresiveICUNephro;
		}

		public void setProgresiveICUNephro(int progresiveICUNephro) {
			this.progresiveICUNephro = progresiveICUNephro;
		}

		public int getMontPlasticNephor() {
			return montPlasticNephor;
		}

		public void setMontPlasticNephor(int montPlasticNephor) {
			this.montPlasticNephor = montPlasticNephor;
		}

		public int getProgresivePlasticNephro() {
			return progresivePlasticNephro;
		}

		public void setProgresivePlasticNephro(int progresivePlasticNephro) {
			this.progresivePlasticNephro = progresivePlasticNephro;
		}

		public int getMontDialysisUro() {
			return montDialysisUro;
		}

		public void setMontDialysisUro(int montDialysisUro) {
			this.montDialysisUro = montDialysisUro;
		}

		public int getProgresiveDialysisUro() {
			return progresiveDialysisUro;
		}

		public void setProgresiveDialysisUro(int progresiveDialysisUro) {
			this.progresiveDialysisUro = progresiveDialysisUro;
		}

		public int getMontUroUro() {
			return montUroUro;
		}

		public void setMontUroUro(int montUroUro) {
			this.montUroUro = montUroUro;
		}

		public int getProgresiveUroUro() {
			return progresiveUroUro;
		}

		public void setProgresiveUroUro(int progresiveUroUro) {
			this.progresiveUroUro = progresiveUroUro;
		}

		public int getMontPeadiUro() {
			return montPeadiUro;
		}

		public void setMontPeadiUro(int montPeadiUro) {
			this.montPeadiUro = montPeadiUro;
		}

		public int getProgresivePeadiUro() {
			return progresivePeadiUro;
		}

		public void setProgresivePeadiUro(int progresivePeadiUro) {
			this.progresivePeadiUro = progresivePeadiUro;
		}

		public int getMontICUUro() {
			return montICUUro;
		}

		public void setMontICUUro(int montICUUro) {
			this.montICUUro = montICUUro;
		}

		public int getProgresiveICUUro() {
			return progresiveICUUro;
		}

		public void setProgresiveICUUro(int progresiveICUUro) {
			this.progresiveICUUro = progresiveICUUro;
		}

		public int getMontPlasticUro() {
			return montPlasticUro;
		}

		public void setMontPlasticUro(int montPlasticUro) {
			this.montPlasticUro = montPlasticUro;
		}

		public int getProgresivePlasticUro() {
			return progresivePlasticUro;
		}

		public void setProgresivePlasticUro(int progresivePlasticUro) {
			this.progresivePlasticUro = progresivePlasticUro;
		}

		public int getMontDialysisPedia() {
			return montDialysisPedia;
		}

		public void setMontDialysisPedia(int montDialysisPedia) {
			this.montDialysisPedia = montDialysisPedia;
		}

		public int getProgresiveDialysisPedia() {
			return progresiveDialysisPedia;
		}

		public void setProgresiveDialysisPedia(int progresiveDialysisPedia) {
			this.progresiveDialysisPedia = progresiveDialysisPedia;
		}

		public int getMontUroPedia() {
			return montUroPedia;
		}

		public void setMontUroPedia(int montUroPedia) {
			this.montUroPedia = montUroPedia;
		}

		public int getProgresiveUroPedia() {
			return progresiveUroPedia;
		}

		public void setProgresiveUroPedia(int progresiveUroPedia) {
			this.progresiveUroPedia = progresiveUroPedia;
		}

		public int getMontPeadiPedia() {
			return montPeadiPedia;
		}

		public void setMontPeadiPedia(int montPeadiPedia) {
			this.montPeadiPedia = montPeadiPedia;
		}

		public int getProgresivePeadiPedia() {
			return progresivePeadiPedia;
		}

		public void setProgresivePeadiPedia(int progresivePeadiPedia) {
			this.progresivePeadiPedia = progresivePeadiPedia;
		}

		public int getMontICUPedia() {
			return montICUPedia;
		}

		public void setMontICUPedia(int montICUPedia) {
			this.montICUPedia = montICUPedia;
		}

		public int getProgresiveICUPedia() {
			return progresiveICUPedia;
		}

		public void setProgresiveICUPedia(int progresiveICUPedia) {
			this.progresiveICUPedia = progresiveICUPedia;
		}

		public int getMontPlasticPedia() {
			return montPlasticPedia;
		}

		public void setMontPlasticPedia(int montPlasticPedia) {
			this.montPlasticPedia = montPlasticPedia;
		}

		public int getProgresivePlasticPedia() {
			return progresivePlasticPedia;
		}

		public void setProgresivePlasticPedia(int progresivePlasticPedia) {
			this.progresivePlasticPedia = progresivePlasticPedia;
		}

		public int getMontDialysisPlastic() {
			return montDialysisPlastic;
		}

		public void setMontDialysisPlastic(int montDialysisPlastic) {
			this.montDialysisPlastic = montDialysisPlastic;
		}

		public int getProgresiveDialysisPlastic() {
			return progresiveDialysisPlastic;
		}

		public void setProgresiveDialysisPlastic(int progresiveDialysisPlastic) {
			this.progresiveDialysisPlastic = progresiveDialysisPlastic;
		}

		public int getMontUroPlastic() {
			return montUroPlastic;
		}

		public void setMontUroPlastic(int montUroPlastic) {
			this.montUroPlastic = montUroPlastic;
		}

		public int getProgresiveUroPlastic() {
			return progresiveUroPlastic;
		}

		public void setProgresiveUroPlastic(int progresiveUroPlastic) {
			this.progresiveUroPlastic = progresiveUroPlastic;
		}

		public int getMontPeadiPlastic() {
			return montPeadiPlastic;
		}

		public void setMontPeadiPlastic(int montPeadiPlastic) {
			this.montPeadiPlastic = montPeadiPlastic;
		}

		public int getProgresivePeadiPlastic() {
			return progresivePeadiPlastic;
		}

		public void setProgresivePeadiPlastic(int progresivePeadiPlastic) {
			this.progresivePeadiPlastic = progresivePeadiPlastic;
		}

		public int getMontICUPlastic() {
			return montICUPlastic;
		}

		public void setMontICUPlastic(int montICUPlastic) {
			this.montICUPlastic = montICUPlastic;
		}

		public int getProgresiveICUPlastic() {
			return progresiveICUPlastic;
		}

		public void setProgresiveICUPlastic(int progresiveICUPlastic) {
			this.progresiveICUPlastic = progresiveICUPlastic;
		}

		public int getMontPlasticPlastic() {
			return montPlasticPlastic;
		}

		public void setMontPlasticPlastic(int montPlasticPlastic) {
			this.montPlasticPlastic = montPlasticPlastic;
		}

		public int getProgresivePlasticPlastic() {
			return progresivePlasticPlastic;
		}

		public void setProgresivePlasticPlastic(int progresivePlasticPlastic) {
			this.progresivePlasticPlastic = progresivePlasticPlastic;
		}
		
		
		

		

		public int getDeptPrgCountFemale() {
			return deptPrgCountFemale;
		}

		public void setDeptPrgCountFemale(int deptPrgCountFemale) {
			this.deptPrgCountFemale = deptPrgCountFemale;
		}

		public int getDeptMonthCountFemale() {
			return deptMonthCountFemale;
		}

		public void setDeptMonthCountFemale(int deptMonthCountFemale) {
			this.deptMonthCountFemale = deptMonthCountFemale;
		}
		 @Transient
		 private int perDMsupraAndMajor;
		
		 public int getPerDMsupraAndMajor() {
			return perDMsupraAndMajor;
		}

		public void setPerDMsupraAndMajor(int perDMsupraAndMajor) {
			this.perDMsupraAndMajor = perDMsupraAndMajor;
		}

		public int getPerDaySupraAndMajor() {
			return perDaySupraAndMajor;
		}

		public void setPerDaySupraAndMajor(int perDaySupraAndMajor) {
			this.perDaySupraAndMajor = perDaySupraAndMajor;
		}

		public int getLabtestperDay() {
			return labtestperDay;
		}

		public void setLabtestperDay(int labtestperDay) {
			this.labtestperDay = labtestperDay;
		}

		public int getLabtestPercentage() {
			return labtestPercentage;
		}

		public void setLabtestPercentage(int labtestPercentage) {
			this.labtestPercentage = labtestPercentage;
		}

		public int getEMItotal() {
			return EMItotal;
		}

		public void setEMItotal(int eMItotal) {
			EMItotal = eMItotal;
		}

		public int getPerdayEmi() {
			return perdayEmi;
		}

		public void setPerdayEmi(int perdayEmi) {
			this.perdayEmi = perdayEmi;
		}

		public int getIpdpercentageAmount() {
			return ipdpercentageAmount;
		}

		public void setIpdpercentageAmount(int ipdpercentageAmount) {
			this.ipdpercentageAmount = ipdpercentageAmount;
		}

		public int getDeathbefore48h() {
			return deathbefore48h;
		}

		public void setDeathbefore48h(int deathbefore48h) {
			this.deathbefore48h = deathbefore48h;
		}

		public int getDeathafter48h() {
			return deathafter48h;
		}

		public void setDeathafter48h(int deathafter48h) {
			this.deathafter48h = deathafter48h;
		}

		public int getTotaldeathipd() {
			return totaldeathipd;
		}

		public void setTotaldeathipd(int totaldeathipd) {
			this.totaldeathipd = totaldeathipd;
		}

		 @Transient
		 private int perDaySupraAndMajor;
		 @Transient
		 private int labtestperDay;
		 @Transient
		 private int labtestPercentage;
		 @Transient
		 private int EMItotal;
		 @Transient
		 private int perdayEmi;
		 @Transient
		 private int ipdpercentageAmount;
		 @Transient
		 private int deathbefore48h;
		 @Transient
		 private int deathafter48h;
		 @Transient
		 private int totaldeathipd;
		
		 
		 @Transient
		 private int perDMsupraAndMajorpro;
		 public int getPerDMsupraAndMajorpro() {
			return perDMsupraAndMajorpro;
		}

		public void setPerDMsupraAndMajorpro(int perDMsupraAndMajorpro) {
			this.perDMsupraAndMajorpro = perDMsupraAndMajorpro;
		}

		public int getPerDaySupraAndMajorpro() {
			return perDaySupraAndMajorpro;
		}

		public void setPerDaySupraAndMajorpro(int perDaySupraAndMajorpro) {
			this.perDaySupraAndMajorpro = perDaySupraAndMajorpro;
		}

		public int getLabtestperDaypro() {
			return labtestperDaypro;
		}

		public void setLabtestperDaypro(int labtestperDaypro) {
			this.labtestperDaypro = labtestperDaypro;
		}

		public int getLabtestPercentagepro() {
			return labtestPercentagepro;
		}

		public void setLabtestPercentagepro(int labtestPercentagepro) {
			this.labtestPercentagepro = labtestPercentagepro;
		}

		public int getEMItotalpro() {
			return EMItotalpro;
		}

		public void setEMItotalpro(int eMItotalpro) {
			EMItotalpro = eMItotalpro;
		}

		public int getPerdayEmipro() {
			return perdayEmipro;
		}

		public void setPerdayEmipro(int perdayEmipro) {
			this.perdayEmipro = perdayEmipro;
		}

		public int getIpdpercentageAmountpro() {
			return ipdpercentageAmountpro;
		}

		public void setIpdpercentageAmountpro(int ipdpercentageAmountpro) {
			this.ipdpercentageAmountpro = ipdpercentageAmountpro;
		}

		public int getDeathbefore48hpro() {
			return deathbefore48hpro;
		}

		public void setDeathbefore48hpro(int deathbefore48hpro) {
			this.deathbefore48hpro = deathbefore48hpro;
		}

		public int getDeathafter48hpro() {
			return deathafter48hpro;
		}

		public void setDeathafter48hpro(int deathafter48hpro) {
			this.deathafter48hpro = deathafter48hpro;
		}

		public int getTotaldeathipdpro() {
			return totaldeathipdpro;
		}

		public void setTotaldeathipdpro(int totaldeathipdpro) {
			this.totaldeathipdpro = totaldeathipdpro;
		}
		
		


		@Transient
		 private int perDaySupraAndMajorpro;
		 @Transient
		 private int labtestperDaypro;
		 @Transient
		 private int labtestPercentagepro;
		 @Transient
		 private int EMItotalpro;
		 @Transient
		 private int perdayEmipro;
		 @Transient
		 private int ipdpercentageAmountpro;
		 @Transient
		 private int deathbefore48hpro;
		 @Transient
		 private int deathafter48hpro;
		 @Transient
		 private int totaldeathipdpro;
		 
		 
		 @Transient
		 private String date_and_time;

		public String getDate_and_time() {
			return date_and_time;
		}

		public void setDate_and_time(String date_and_time) {
			this.date_and_time = date_and_time;
		}
		 
}
