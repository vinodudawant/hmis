package com.hms.bloodbank.service.impl;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.bloodbank.dao.DonorDao;
import com.hms.bloodbank.dto.BloodRequestSlave;
import com.hms.bloodbank.dto.ComponentSeperation;
import com.hms.bloodbank.dto.DonorBloodBagDetails;
import com.hms.bloodbank.dto.DonorCheckupList;
import com.hms.bloodbank.dto.DonorMaster;
import com.hms.bloodbank.dto.DonorReaction;
import com.hms.bloodbank.dto.DonorSampleDispatch;
import com.hms.bloodbank.dto.DonorTreatment;
import com.hms.bloodbank.dto.StockRegister;
import com.hms.bloodbank.dto.TestRegister;
import com.hms.bloodbank.dto.TestRegisterSlave;
import com.hms.bloodbank.service.DonorService;
import com.hms.ehat.dto.HospitalSpecialisationDto;
import com.hms.patient.util.ConfigUIJSONUtility;

@Service
public class DonorServiceImpl implements DonorService{
	
	@Autowired
	DonorDao donorDao;
	@Autowired
	SessionFactory sessionFactory;

	@Override
	@Transactional
	public int saveDonor(DonorMaster donor, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		donor.setUnitId(unitId);
		donor.setCreatedBy(userId);
		donor.setUpdatedBy(userId);
	//	DonorMaster dm =(DonorMaster)sessionFactory.getCurrentSession().get(DonorMaster.class,donor.getDonorId());
	//	dm.setPatient_title_name(dm.getPatient_title_name());
		return donorDao.saveDonor(donor, request);
	}

	@Override
	@Transactional
	public List<DonorMaster> searchDonorByName(String name, String callfrom, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		
		return donorDao.searchDonorByName(name, callfrom,unitId);
	}

	@Override
	@Transactional
	public DonorMaster getDonorById(Integer id, HttpServletRequest request) {
		return donorDao.getDonorById(id, request);
	}

	@Override
	@Transactional
	public int saveDonorTreatment(DonorTreatment donor, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		donor.setUnitId(unitId);
		donor.setCreatedBy(userId);
		donor.setUpdatedBy(userId);
		return donorDao.saveDonorTreatment(donor, request);
	}

	@Override
	@Transactional
	public DonorCheckupList getCheckUpByTreatmentId(Integer id, HttpServletRequest request) {
		return donorDao.getCheckUpByTreatmentId(id, request);
	}

	@Override
	@Transactional
	public int saveDonorReaction(DonorReaction reaction, HttpServletRequest request) {
		HttpSession session = request.getSession();
		Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		reaction.setUnitId(unitId);
		reaction.setCreatedBy(userId);
		reaction.setUpdatedBy(userId);
		return donorDao.saveDonorReaction(reaction, request);
	}

	@Override
	@Transactional
	public List<DonorSampleDispatch> getBloodBagIdBySectionId(Integer id, HttpServletRequest request) {
		return donorDao.getBloodBagIdBySectionId(id, request);
	}

	@Override
	@Transactional
	public DonorMaster getDonorByBloodBagId(Integer bloodBagId, HttpServletRequest request) {
		return donorDao.getDonorByBloodBagId(bloodBagId, request);
	}

	
	  @Override
	  
	  @Transactional
	  public int saveTestRegister(TestRegister testRegister,String
	  listCompObject, HttpServletRequest request) {
	  
	  TestRegisterSlave objivfHislave = (TestRegisterSlave) ConfigUIJSONUtility
	  .getObjectFromJSON(listCompObject, TestRegisterSlave.class);
	  
	  List<TestRegisterSlave> lstHis = objivfHislave.getListTestSlave();
	  testRegister.setTestRegisterSlave(lstHis);
	  HttpSession session =request.getSession();
	  Integer userId = (Integer)session.getAttribute("userId1");
	  Integer unitId = (Integer)session.getAttribute("uId"); testRegister.setUnitId(unitId);
	  testRegister.setCreatedBy(userId); testRegister.setUpdatedBy(userId); return
	  donorDao.saveTestRegister(testRegister, request); }
	 

	@Override
	@Transactional
	public DonorBloodBagDetails getDetailsByBloodBag(Integer bloodBagId, HttpServletRequest request) {
		return donorDao.getDetailsByBloodBag(bloodBagId, request);
	}

	@Override
	@Transactional
	public int saveComponentSeperation(String componentSeperation, HttpServletRequest request) {
		HttpSession session = request.getSession();
		/*Integer userId = (Integer) session.getAttribute("userId1");
		Integer unitId = (Integer) session.getAttribute("uId");
		componentSeperation.setUnitId(unitId);
		componentSeperation.setCreatedBy(userId);
		componentSeperation.setUpdatedBy(userId);*/
		//componentSeperation.setBloodBagStatus(1);  //for 1st time bag saved
		return donorDao.saveComponentSeperation(componentSeperation, request);
	}

	@Override
	@Transactional
	public List<ComponentSeperation> getBloodBagsInComponent() {
		return donorDao.getBloodBagsInComponent();
	}

	@Override
	@Transactional
	public List<ComponentSeperation> getBloodBagsInStocks() {
		return donorDao.getBloodBagsInStocks();
	}

	@Override
	@Transactional
	public List<ComponentSeperation> getComponentByBloodBagId(Integer bloodBagId,String callfrom, HttpServletRequest request) {
		return donorDao.getComponentByBloodBagId(bloodBagId,callfrom, request);
	}

	@Override
	@Transactional
	public int saveStock(String componentSeperation, HttpServletRequest request) {
		return donorDao.saveStock(componentSeperation, request);
	}

	@Override
	@Transactional
	public int discardStock(String listDiscardStockObj, HttpServletRequest request) {
		return donorDao.discardStock(listDiscardStockObj, request);
	}

	@Override
	@Transactional
	public DonorBloodBagDetails getbagDetailsByTreatmentId(int id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getbagDetailsByTreatmentId(id,request);
	}

	@Override
	@Transactional
	public List<TestRegister> getTestRegsiterDetails(Integer bloodBagId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getTestRegsiterDetails(bloodBagId,request);
	}

	@Override
	@Transactional
	public List<DonorMaster> getBloodDonorDetailsList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getBloodDonorDetailsList(unitId,request);
	}

	@Override
	@Transactional
	public DonorMaster editBloodDonor(Integer donorId,Integer unitId,  HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.editBloodDonor(donorId,unitId,request);
	}

	@Override
	@Transactional
	public boolean deleteBloodDonor(Integer donorId,Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.deleteBloodDonor(donorId,unitId, request);
	}

	@Override
	@Transactional
	public List<DonorTreatment> getAllBloodDonorsTreatmentList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getAllBloodDonorsTreatmentList(unitId, request);
	}

	@Override
	@Transactional
	public DonorTreatment editBloodDonorTreatment(Integer donorId,Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.editBloodDonorTreatment(donorId, unitId, request);
	}

	@Override
	@Transactional
	public DonorMaster getBloodDonorTreatmentDetailsById(Integer donorId,String callform, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getBloodDonorTreatmentDetailsById(donorId,callform,request);
	}

	@Override
	@Transactional
	public boolean deleteBloodDonorTreatment(Integer donorTreatmentId, Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.deleteBloodDonorTreatment(donorTreatmentId,unitId, request);
	}

	@Override
	public List<DonorCheckupList> getAllBloodDonorCheckupList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getAllBloodDonorCheckupList(unitId,request);
	}

	@Override
	@Transactional
	public DonorCheckupList editBloodDonorCheckup(Integer donorId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.editBloodDonorCheckup(donorId,request);
	}

	@Override
	@Transactional
	public boolean deleteBloodDonorCheckup(Integer donorCheckupId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.deleteBloodDonorCheckup(donorCheckupId,request);
	}

	@Override
	@Transactional
	public DonorCheckupList getCheckuplistDonorTreatmentById(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getCheckuplistDonorTreatmentById(id,request);
	}

	@Override
	public List<StockRegister> getAllStockList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getAllStockList(unitId);
	}
	
	@Override
	public StockRegister getStockListById(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getStockListById(id,request);
	}


	@Override
	public boolean deleteStock(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.deleteStock(id,request);
	}

	@Override
	public StockRegister editStock(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.editStock(id,request);
	}
//Added By Annapurna
	@Override
	public List<StockRegister> getAllDiscardStockList(Integer unitId, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getAllDiscardStockList(unitId);
	}
	@Override
	public StockRegister getDiscardStockListById(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.getDiscardStockListById(id,request);
	}


	//Added By Annapurna
	@Override
	public boolean deleteDiscardStock(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.deleteDiscardStock(id,request);
	}
	//Added By Annapurna
	@Override
	public StockRegister editDiscardStock(Integer id, HttpServletRequest request) {
		// TODO Auto-generated method stub
		return donorDao.editDiscardStock(id,request);
	}
	
	

}
