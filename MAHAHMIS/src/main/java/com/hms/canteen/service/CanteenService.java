package com.hms.canteen.service;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.hms.canteen.dto.CanteenDietView;
import com.hms.canteen.dto.CanteenMaster;
import com.hms.canteen.dto.CanteenPurDto;
import com.hms.canteen.dto.CanteenPurchaseM;
import com.hms.canteen.dto.CustomizeTemplateDto;
import com.hms.canteen.dto.DietMaster;
import com.hms.canteen.dto.PatientDueDto;

public interface CanteenService {

	int saveOrUpdateCanteen(CanteenMaster canteenMaster,
			HttpServletRequest request);

	List<CanteenMaster> getlist();

	List<CanteenMaster> getlistbyId(int canteenId);

	List<CanteenMaster> getlistbyforreport(Date fromDate, Date toDate, int subId);

	int deletebyId(int canteenId, HttpServletRequest request);

	List<CanteenMaster> getcustomerlist(String letter);

	List<CanteenMaster> getlistbyletter(int letter);

	int savediet( DietMaster dietMaster, HttpServletRequest request);

	List<DietMaster> getdietlist(int treatmentId, int patientId,int deptId);

	List<CanteenDietView> getDietDataByDate(String callForm);

	List<CustomizeTemplateDto> getcustomizelist();

	List<CustomizeTemplateDto> getcustomizelistByid(int templateId);

	int deletedietbyId(int dietId, HttpServletRequest request);

	int savePatientDue(String duemaster, HttpServletRequest request);

	List<PatientDueDto> getpatientduelist();

	int savepurchase(CanteenPurchaseM canteenPurchaseM,
			HttpServletRequest request);

	List<CanteenPurchaseM> getlistpurchasem();

	boolean deletepurchase(Integer subId, HttpServletRequest request);

	List<CanteenPurchaseM> getAllcategory();

	List<CanteenPurchaseM> getpurBySelfId(int selfId);

	List<CanteenPurchaseM> fetchSuperCatogoires(int purId);

	List<CanteenPurchaseM> getbyleter(String findingName);

	List<DietMaster> getdietlistbyid(int dietId);

	List<CanteenPurchaseM> getitemByLetter(String findingName);

	int saveOrUpdatepur(CanteenPurDto canteenPurDto, HttpServletRequest request);

	List<CanteenPurDto> getpurlist();

	List<CanteenPurDto> getpurlistbyId(int purchId);

	int deletepurbyId(int purId, HttpServletRequest request);

	List<CanteenPurDto> getlistforpurchasereport(Date fromDate, Date toDate,
			int subId);

	List<CanteenPurDto> getlistbyletterPur(int letter);
	
	List<DietMaster> getFordietlist(int treatmentId, int patientId,int deptId,int dietID);
	
	List<CanteenDietView> searchByTemplateName(int letter,String fromDate, String toDate);
	
	List<CanteenDietView> searchByDateWiseDietList(String fromDate, String toDate,int templateId);
	
	List<CanteenDietView> getDailyDietReportdata(Date fromDate, Date toDate);

}
