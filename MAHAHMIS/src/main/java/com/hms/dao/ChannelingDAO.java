package com.hms.dao;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import com.hms.dto.Chanelling_doctor;
import com.hms.dto.Doctor;
import com.hms.dto.HospitalDetailsDTO;
@Transactional
public interface ChannelingDAO {

	public List displayExtDoc();

	public boolean saveReferTo(String date2, String[] doc, String patid,
			int userId, String tid);

	public int findNewDid();

	public int saveReferToDoc(String did, String queryType, String dname,
			String rfees, String spcl, String hname, String contact, String email, 
			String mobile, String address,String doctorType,Double refDocPer,String prefix);

	public List searchDoctor(String searchBy, String value);

	public boolean deleteDoctor(String cid);

	public List<Chanelling_doctor> getRefDoctors();
	
	public int saveHospitalDetail(HospitalDetailsDTO hospitalDTO, String queryType);

	public List<HospitalDetailsDTO> displayExistingHospitalDetails();

	public int findNewHospitalId();

	public boolean deleteChannelHospital(HospitalDetailsDTO hospitalDto);

	public List<HospitalDetailsDTO> searchHospitalDetails(String hosname);
	
	public String FetchCarePlanNote(String tretID);
	
	public int SaveCarePlanNoteDetails(String carePlanNotes, String pid,String tretID, Integer userId);

	public List<Doctor> fetchDocInfo(String Treatment_ID,String user_name);
	
	public int SavePreOperationNoteDetails(String preOpNotes, String pid, String tretID, Integer userId);
	
	public String fetchPreOp(String tretID);
	
	public int SaveIntraOperationNoteDetails(String intraOpNotes, String pid, String tretID, Integer userId);
	
	public String fetchIntraPostOpNote(String tretID);
}
