package com.hms.canteen.serviceImp;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.canteen.Dao.CanteenDao;
import com.hms.canteen.dto.CanteenDietView;
import com.hms.canteen.dto.CanteenMaster;
import com.hms.canteen.dto.CanteenPurDto;
import com.hms.canteen.dto.CanteenPurchaseM;
import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.canteen.dto.DietMaster;
import com.hms.canteen.dto.PatientDueDto;
import com.hms.canteen.service.CanteenService;

@Service
public class CanteenServiceImpl implements CanteenService {

	@Autowired
	CanteenDao canteenDao;
	
	@Override
	@Transactional
	public int saveOrUpdateCanteen(CanteenMaster canteenMaster,
			HttpServletRequest request) {
		
		return canteenDao.saveOrUpdateCanteen( canteenMaster,
				 request);
	}

	@Override
	@Transactional
	public List<CanteenMaster> getlist() {
		return canteenDao.getlist();
	}

	@Override
	@Transactional
	public List<CanteenMaster> getlistbyId(int canteenId) {
		
		return canteenDao.getlistbyId( canteenId);
	}

	@Override
	@Transactional
	public List<CanteenMaster> getlistbyforreport(Date fromDate, Date toDate,int subId) {
		return canteenDao.getlistbyforreport( fromDate,toDate,subId);
	}

	@Override
	@Transactional
	public int deletebyId(int canteenId, HttpServletRequest request) {
		
		return canteenDao.deletebyId(canteenId,request);
	}

	@Override
	@Transactional
	public List<CanteenMaster> getcustomerlist(String letter) {
		return canteenDao.getcustomerlist(letter);
	}

	@Override
	@Transactional
	public List<CanteenMaster> getlistbyletter(int letter) {
		
		return canteenDao.getlistbyletter(letter);
	}

	@Override
	@Transactional
	public int savediet(DietMaster dietMaster, HttpServletRequest request) {
		
		return canteenDao.savediet(dietMaster,request);
	}

	@Override
	@Transactional
	public List<DietMaster> getdietlist(int treatmentId, int patientId,int deptId) {

		return canteenDao.getdietlist(treatmentId,patientId,deptId);
	}

	@Override
	@Transactional
	public List<CanteenDietView> getDietDataByDate(String callForm) {
		return canteenDao.getDietDataByDate(callForm);
	}

	@Override
	@Transactional
	public List<CustomizeTemplateDto> getcustomizelist() {
		
		return canteenDao.getcustomizelist();
	}

	@Override
	@Transactional
	public List<CustomizeTemplateDto> getcustomizelistByid(int templateId) {
		return canteenDao.getcustomizelistByid(templateId);
	}

	@Override
	@Transactional
	public int deletedietbyId(int dietId, HttpServletRequest request) {
		
		return canteenDao.deletedietbyId(dietId,request);
	}

	@Override
	@Transactional
	public int savePatientDue(String duemaster,
			HttpServletRequest request) {
		
		return canteenDao.savePatientDue(duemaster,request);
	}

	@Override
	@Transactional
	public List<PatientDueDto> getpatientduelist() {
		
		return canteenDao.getpatientduelist();
	}

	@Override
	@Transactional
	public int savepurchase(CanteenPurchaseM canteenPurchaseM,
			HttpServletRequest request) {
		
		return canteenDao.savepurchase(canteenPurchaseM,request);
	}

	@Override
	@Transactional
	public List<CanteenPurchaseM> getlistpurchasem() {
		return canteenDao.getlistpurchasem();
	}

	@Override
	@Transactional
	public boolean deletepurchase(Integer subId, HttpServletRequest request) {
		
		return canteenDao.deletepurchase(subId,request);
	}

	@Override
	@Transactional
	public List<CanteenPurchaseM> getAllcategory() {
		return canteenDao.getAllcategory();
	}

	@Override
	@Transactional
	public List<CanteenPurchaseM> getpurBySelfId(int selfId) {
		return canteenDao.getpurBySelfId(selfId);
	}

	@Override
	@Transactional
	public List<CanteenPurchaseM> fetchSuperCatogoires(int purId) {
		return canteenDao.fetchSuperCatogoires(purId);
	}

	@Override
	@Transactional
	public List<CanteenPurchaseM> getbyleter(String findingName) {
		return canteenDao.getbyleter(findingName);
	}

	@Override
	@Transactional
	public List<DietMaster> getdietlistbyid(int dietId) {
		return canteenDao.getdietlistbyid(dietId);
	}

	@Override
	@Transactional
	public List<CanteenPurchaseM> getitemByLetter(String findingName) {
		return canteenDao.getitemByLetter(findingName);
	}

	@Override
	@Transactional
	public int saveOrUpdatepur(CanteenPurDto canteenPurDto,
			HttpServletRequest request) {
		return canteenDao.saveOrUpdatepur(canteenPurDto,request);
	}

	@Override
	@Transactional
	public List<CanteenPurDto> getpurlist() {
		return canteenDao.getpurlist();
	}

	@Override
	@Transactional
	public List<CanteenPurDto> getpurlistbyId(int purchId) {
		return canteenDao.getpurlistbyId(purchId);
	}

	@Override
	@Transactional
	public int deletepurbyId(int purId, HttpServletRequest request) {
		return canteenDao.deletepurbyId(purId,request);
	}

	@Override
	@Transactional
	public List<CanteenPurDto> getlistforpurchasereport(Date fromDate,
			Date toDate, int subId) {
		return canteenDao.getlistforpurchasereport( fromDate,toDate,subId);
		}

	@Override
	@Transactional
	public List<CanteenPurDto> getlistbyletterPur(int letter) {
		
		return canteenDao.getlistbyletterPur(letter);
	}

	@Transactional
	@Override
	public List<DietMaster> getFordietlist(int treatmentId, int patientId,int deptId, int dietID) {
		
		return canteenDao.getFordietlist(treatmentId, patientId, deptId, dietID);
	}

	@Override
	@Transactional
	public List<CanteenDietView> searchByTemplateName(int letter,String fromDate,
			String toDate) {
		return canteenDao.searchByTemplateName(letter,fromDate,toDate);
	}
	
	@Transactional
	public List<CanteenDietView> searchByDateWiseDietList(String fromDate,
			String toDate, int templateId) {
		return canteenDao.searchByDateWiseDietList( fromDate,toDate,templateId);
		}
	
	@Override
	@Transactional
	public List<CanteenDietView> getDailyDietReportdata(Date fromDate, Date toDate) {
		return canteenDao.getDailyDietReportdata( fromDate,toDate);
	}
}
