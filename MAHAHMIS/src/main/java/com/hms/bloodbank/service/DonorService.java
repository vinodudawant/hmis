package com.hms.bloodbank.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorMaster;
import com.hms.bloodbank.dto.DonorReaction;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.DonorTreatment;
import com.hms.bloodbank.dto.StockRegister;
import com.hms.bloodbank.dto.TestRegister;

public interface DonorService {
	
	public int saveDonor(DonorMaster donor, HttpServletRequest request);
	
	public List<DonorMaster> searchDonorByName(String name,String callfrom,HttpServletRequest request);
	
	public DonorMaster getDonorById(Integer id,HttpServletRequest request);

	public int saveDonorTreatment(DonorTreatment donor, HttpServletRequest request);
	
	public DonorCheckupList getCheckUpByTreatmentId(Integer id,HttpServletRequest request);
	
	public int saveDonorReaction(DonorReaction donor, HttpServletRequest request);

	public List<DonorSampleDispatch> getBloodBagIdBySectionId(Integer id,HttpServletRequest request);
	
	public DonorMaster getDonorByBloodBagId(Integer bloodBagId,HttpServletRequest request);

	public int saveTestRegister(TestRegister testRegister, String listCompObject, HttpServletRequest request);
	
	public DonorBloodBagDetails getDetailsByBloodBag(Integer bloodBagId,HttpServletRequest request);
	
	public int saveComponentSeperation(String componentSeperation, HttpServletRequest request);

	public List<ComponentSeperation> getBloodBagsInComponent();

	public List<ComponentSeperation> getBloodBagsInStocks();
	
	public List<ComponentSeperation> getComponentByBloodBagId(Integer bloodBagId,String callfrom,HttpServletRequest request);
	
	public int saveStock(String componentSeperation, HttpServletRequest request);
	
	public int discardStock(String listDiscardStockObj, HttpServletRequest request);

	public DonorBloodBagDetails getbagDetailsByTreatmentId(int id, HttpServletRequest request);

	public List<TestRegister> getTestRegsiterDetails(Integer bloodBagId, HttpServletRequest request);

	public List<DonorMaster> getBloodDonorDetailsList(Integer unitId, HttpServletRequest request);

	public DonorMaster editBloodDonor(Integer donorId,Integer unitId,  HttpServletRequest request);

	public boolean deleteBloodDonor(Integer donorId,Integer unitId, HttpServletRequest request);

	public List<DonorTreatment> getAllBloodDonorsTreatmentList(Integer unitId, HttpServletRequest request);

	public DonorTreatment editBloodDonorTreatment(Integer donorId,Integer unitId, HttpServletRequest request);

	public DonorMaster getBloodDonorTreatmentDetailsById(Integer donorId,String callform, HttpServletRequest request);

	public boolean deleteBloodDonorTreatment(Integer donorTreatmentId, Integer unitId, HttpServletRequest request);

	public List<DonorCheckupList> getAllBloodDonorCheckupList(Integer unitId, HttpServletRequest request);

	public DonorCheckupList editBloodDonorCheckup(Integer donorId, HttpServletRequest request);

	public boolean deleteBloodDonorCheckup(Integer donorCheckupId, HttpServletRequest request);

	public DonorCheckupList getCheckuplistDonorTreatmentById(Integer id, HttpServletRequest request);

	public List<StockRegister> getAllStockList(Integer unitId, HttpServletRequest request);
	public StockRegister getStockListById(Integer id, HttpServletRequest request);
	
	public boolean deleteStock(Integer id, HttpServletRequest request);

	public StockRegister editStock(Integer id, HttpServletRequest request);
	
	public List<StockRegister> getAllDiscardStockList(Integer unitId, HttpServletRequest request);//Added By Annapurna
	 public StockRegister getDiscardStockListById(Integer id, HttpServletRequest request);
	 
	public boolean deleteDiscardStock(Integer id, HttpServletRequest request);//Added By Annapurna
 	public StockRegister editDiscardStock(Integer id, HttpServletRequest request);//Added By Annapurna
	

}
