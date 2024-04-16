package com.hms.model;

import java.util.List;

//import org.springframework.getContext().ApplicationContext;
//import org.springframework.getContext().support.ClassPathXmlApplicationContext;

import com.hms.dao.ChannelingDAO;
import com.hms.dto.Chanelling_doctor;
import com.hms.dto.Doctor;
import com.hms.dto.HospitalDetailsDTO;
import com.hms.utility.ApplicationContextUtils;

public class ChannelingModel extends AbstractModel {

	/*
	 * ApplicationContext getContext() = new ClassPathXmlApplicationContext(
	 * "Spring-Channeling.xml");
	 */

//	ApplicationContext getContext() = ApplicationContextUtils
//			.getApplicationContext();

	public List<Chanelling_doctor> displayExtDoc() {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		List arrDisplayDoc = channelingDAO.displayExtDoc();
		return arrDisplayDoc;
	}

	public boolean saveReferTo(String date2, String[] doc, String patid,
			int userId, String tid) {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		boolean isInserted = channelingDAO.saveReferTo(date2, doc, patid,
				userId, tid);
		return isInserted;
	}

	public int findNewDid() {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		int did = channelingDAO.findNewDid();
		return did;
	}

	public int saveReferToDoc(String did, String queryType, String dname,
			String rfees, String spcl, String hname, String contact, String email, String mobile, 
			String address, String doctorType,Double refDocPer,String prefix) {
		// TODO Auto-generated method stub
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		int isInserted = channelingDAO.saveReferToDoc(did, queryType, dname,
				rfees, spcl, hname, contact,email,mobile,address, doctorType,refDocPer,prefix);
		return isInserted;
	}

	public List<Chanelling_doctor> searchDoctor(String searchBy, String value) {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		List arrDisplayDoc = channelingDAO.searchDoctor(searchBy, value);
		return arrDisplayDoc;
	}

	public boolean deleteDoctor(String cid) {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		boolean isDeleted = channelingDAO.deleteDoctor(cid);
		return isDeleted;
	}

	public List<Chanelling_doctor> getRefDoctors() {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		List<Chanelling_doctor> listRefDoctors = channelingDAO.getRefDoctors();
		return listRefDoctors;
	}

	/********* Code by kavita Bhangale *************/

	public int saveHospitalDetail(HospitalDetailsDTO hospitalDTO,
			String queryType) {
		int isinserted = 0;
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		isinserted = channelingDAO.saveHospitalDetail(hospitalDTO, queryType);
		return isinserted;
	}

	public List<HospitalDetailsDTO> displayExistingHospitalDetails() {

		List<HospitalDetailsDTO> hospitalDetailsDTOList = null;
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		hospitalDetailsDTOList = channelingDAO.displayExistingHospitalDetails();
		return hospitalDetailsDTOList;
	}

	public int findNewHospitalId() {
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		int HosId = channelingDAO.findNewHospitalId();
		return HosId;
	}

	public boolean deleteChannelHospital(HospitalDetailsDTO hospitalDto) {

		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		boolean isDeleted = channelingDAO.deleteChannelHospital(hospitalDto);
		return isDeleted;
	}

	public List<HospitalDetailsDTO> searchHospitalDetails(String hosname) {

		List<HospitalDetailsDTO> hospitalDetailsDTOList = null;
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		hospitalDetailsDTOList = channelingDAO.searchHospitalDetails(hosname);
		return hospitalDetailsDTOList;
	}

	public List<Doctor> fetchDocInfo(String Treatment_ID,String user_name) {
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext().getBean("channelingDAO");
		List<Doctor> autoList = channelingDAO.fetchDocInfo(Treatment_ID,user_name);
		return autoList;
		}
	/********* End of Code by kavita Bhangale *************/
	
	//Jitendra 21March2019
	public String FetchCarePlanNote(String tretID) {
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		String IntraPostOpList = channelingDAO.FetchCarePlanNote(tretID);
		return IntraPostOpList;
	}
	
	public int SaveCarePlanNote(String carePlanNotes, String pid,String tretID, Integer userId) {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		int isInserted = channelingDAO.SaveCarePlanNoteDetails(carePlanNotes,pid,tretID,userId);	
		
		return isInserted;
	}
	
	
	public int SavePreOperationNote(String preOpNotes, String pid,String tretID, Integer userId) {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		int isInserted = channelingDAO.SavePreOperationNoteDetails(preOpNotes,pid,tretID,userId);	
		
		return isInserted;
	}
	
	public String fetchPreOpNote(String tretID) {

		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		String preOPList = channelingDAO.fetchPreOp(tretID);
		return preOPList;

	}
	
	public int SaveIntraOperationNote(String intraOpNotes, String pid,String tretID, Integer userId) {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		int isInserted = channelingDAO.SaveIntraOperationNoteDetails(intraOpNotes,pid,tretID,userId);	
		
		return isInserted;
	}
	
	public String fetchIntraPostOpNote(String tretID) {
		// TODO Auto-generated method stub
		ChannelingDAO channelingDAO = (ChannelingDAO) getContext()
				.getBean("channelingDAO");
		String IntraPostOpList = channelingDAO.fetchIntraPostOpNote(tretID);
		return IntraPostOpList;
	}
}
