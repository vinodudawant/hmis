package com.hms.doctordesk.dao.impl;


import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hms.administrator.dto.ICD10_L;
import com.hms.doctordesk.dao.DiagonosisDao;
import com.hms.doctordesk.dto.DiagonosisMasterDto;
import com.hms.ehat.dto.RegistrationDto;
import com.hms.ehat.dto.TreatmentDto;
import com.hms.sandbox.dto.SandBoxPatientDignosis;
import com.hms.sandbox.dto.SandBoxPatientInfo;

@Repository
@Transactional
public class DiagonosisDaoImpl implements DiagonosisDao {

	@Autowired
	SessionFactory sessionFactory;
	
	final String sumaSoftUrl = "https://nha-suma-azb7fa3pfa-el.a.run.app/";

	@Override
	public List<ICD10_L> diagonosisAutoSuggestion(String searchText,
			String callFrom, int diagoType,HttpServletRequest request) {
		// TODO Auto-generated method stub
		
		HttpSession session=request.getSession();
		int unitId=(int)session.getAttribute("uId");
		
		List<ICD10_L> diagnototallist = new ArrayList<ICD10_L>();
		System.out.println("outside if" + callFrom);
		if (callFrom.equals("diagoname")) {
			System.out.println("inside if");
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ICD10_L.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("icd_Flag", diagoType));
			criteria.add(Restrictions.ilike("name_L", searchText,
					MatchMode.START));
			
			criteria.setProjection(Projections.projectionList()
					.add(Projections.property("idicd10_L"))
					.add(Projections.property("name_L")));
			criteria.setMaxResults(10);
			List<Object[]> list = (List<Object[]>) criteria.list();
			for (Object[] row : list) {
				ICD10_L obj = new ICD10_L();
				obj.setIdicd10_L((Integer) row[0]);
				obj.setName_L((String) row[1]);
				diagnototallist.add(obj);
			}

		}

		else if (callFrom.equals("diagodesc")) {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ICD10_L.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("icd_Flag", diagoType));
			criteria.add(Restrictions.ilike("name_L1", searchText,
					MatchMode.START));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.setProjection(Projections.projectionList()
					.add(Projections.property("idicd10_L"))
					.add(Projections.property("name_L1")));
			criteria.setMaxResults(10);
			List<Object[]> list = (List<Object[]>) criteria.list();
			for (Object[] row : list) {
				ICD10_L obj = new ICD10_L();
				obj.setIdicd10_L((Integer) row[0]);
				obj.setName_L1((String) row[1]);
				diagnototallist.add(obj);
			}

		} else {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ICD10_L.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("unitId",unitId));
			criteria.add(Restrictions.eq("icd_Flag", diagoType));
			criteria.add(Restrictions.ilike("icd_code_L", searchText,
					MatchMode.START));
			criteria.setProjection(Projections.projectionList()
					.add(Projections.property("idicd10_L"))
					.add(Projections.property("icd_code_L")));
			criteria.setMaxResults(10);
			List<Object[]> list = (List<Object[]>) criteria.list();
			for (Object[] row : list) {
				ICD10_L obj = new ICD10_L();
				obj.setIdicd10_L((Integer) row[0]);
				obj.setIcd_code_L((String) row[1]);
				diagnototallist.add(obj);
			}
		}

		return diagnototallist;
	}

	@Override
	public List<ICD10_L> getDiagonosisById(int id) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.getCurrentSession().createCriteria(
				ICD10_L.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("idicd10_L", id));
		List<ICD10_L> list = criteria.list();
		return list;
	}

	@Override
	public String saveDiagonosisData(DiagonosisMasterDto diagonosisMasterDto,Integer patientId,Integer treatmentId,
			HttpServletRequest request) {
		// TODO Auto-generated method stub
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		int unitId = (int) session.getAttribute("uId");
		diagonosisMasterDto.setDeleted("N");
		diagonosisMasterDto.setUserId(userId);
		diagonosisMasterDto.setUnitId(unitId);
		
		String dignosisby = getUserName(userId);    
		diagonosisMasterDto.setDignosisBy(dignosisby);
		
		RegistrationDto pobj=(RegistrationDto) sessionFactory.getCurrentSession().get(RegistrationDto.class, patientId);
		TreatmentDto tobj=(TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
		
		diagonosisMasterDto.setPatientObj(pobj);
		diagonosisMasterDto.setTreatObj(tobj);
		
		 Criteria criteria = sessionFactory.getCurrentSession().createCriteria(DiagonosisMasterDto.class);
         criteria.add(Restrictions.eq("diagoName", diagonosisMasterDto.getDiagoName()));
         criteria.add(Restrictions.eq("deleted", "N"));
         criteria.add(Restrictions.eq("treatObj",tobj));
		
		if (diagonosisMasterDto.getId() == 0) {
			
			 if(criteria.uniqueResult() != null){
	        	 return "Diagnosis with this name alredy exist";
	         }
			
			diagonosisMasterDto.setCreatedBy(userId);
			sessionFactory.getCurrentSession().merge(diagonosisMasterDto);
			
			//save diagnosis data in sandbox 
			
			//int saveSandboxPatientDiagnosis = saveSandboxPatientDiagnosis(diagonosisMasterDto,patientId, treatmentId);
			return "Diagnosis Saved SuccessFully";
		} else {
			diagonosisMasterDto.setUpdatedBy(userId);
			sessionFactory.getCurrentSession().merge(diagonosisMasterDto);
			return "Diagnosis Updated SuccessFully";
		}
	}
	
	public int saveSandboxPatientDiagnosis(DiagonosisMasterDto diagonosisMasterDto,Integer patientId,Integer treatmentId){
		
		SandBoxPatientDignosis sandBoxPatientDignosis = new SandBoxPatientDignosis();
		sandBoxPatientDignosis.setDiagndesc(diagonosisMasterDto.getDiagndesc());
		sandBoxPatientDignosis.setComment(diagonosisMasterDto.getComment());
		sandBoxPatientDignosis.setDiagnoType(diagonosisMasterDto.getDiagnoType());
		sandBoxPatientDignosis.setDiagoName(diagonosisMasterDto.getDiagoName());
		sandBoxPatientDignosis.setIcd10_code(diagonosisMasterDto.getIcd10_code());
		sandBoxPatientDignosis.setCareContextRefNumber(diagonosisMasterDto.getDiagoName()+diagonosisMasterDto.getIcd10_code());;
		TreatmentDto tobj=(TreatmentDto) sessionFactory.getCurrentSession().get(TreatmentDto.class, treatmentId);
		
		sandBoxPatientDignosis.setTreatObj(tobj);
		
		List<SandBoxPatientDignosis> list = new ArrayList<SandBoxPatientDignosis>();
		list.add(sandBoxPatientDignosis);
		
		
		SandBoxPatientInfo sandBoxPatientInfo = (SandBoxPatientInfo) sessionFactory.getCurrentSession().
				createCriteria(SandBoxPatientInfo.class).add
		(Restrictions.eq("patientId", patientId)).uniqueResult();
		
		for (SandBoxPatientDignosis sandBoxPatientDignosis2 : list) {
			sandBoxPatientDignosis2.setPatientReferenceNumber(sandBoxPatientInfo.getfName()+"-"+
		sandBoxPatientInfo.getSandBoxpatientId());
		}
		sandBoxPatientInfo.setListSandBoxDigno(list);
		
		sessionFactory.getCurrentSession().merge(sandBoxPatientInfo);

		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
				.currentRequestAttributes()).getRequest();
		HttpSession session = httpServletRequest.getSession();
		session.setAttribute("sanBoxPatientId", patientId);
		
		 
		
		int addDiagnosisSanbox = addDiagnosisSandbox(sandBoxPatientInfo);	
		return addDiagnosisSanbox;
		
	}
	
	@SuppressWarnings("unchecked")
	public int addDiagnosisSandbox(SandBoxPatientInfo sandBoxPatientInfo){
		
		
		
		
		String output = "";

		String generateToken = generateToken();

		JSONObject jsonObject = new JSONObject();

		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
		String currentDate = instant.toString();

		JSONObject requester = new JSONObject();
		requester.put("type", "HIP");
		requester.put("id", "HIPHMIS");

		UUID uuid = UUID.randomUUID();

		JSONObject query = new JSONObject();
		query.put("id", sandBoxPatientInfo.getHelathId());
		query.put("purpose", "KYC_AND_LINK");
		query.put("authMode", "DEMOGRAPHICS");
		query.put("requester", requester);

		jsonObject.put("requestId", uuid.toString());
		jsonObject.put("timestamp", currentDate);
		jsonObject.put("query", query);

//		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/init";
		String urlname = sumaSoftUrl+"v0.5/users/auth/init";
		try {

			URL url = new URL(urlname);

			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setRequestProperty("X-CM-ID", "sbx");
			conn.setRequestProperty("Authorization", "Bearer " + generateToken);

			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			System.out.println(conn.getResponseCode());

			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			output = br.readLine();
       
			// start  update auth init request id in ehat_patient_sandbox table
			System.out.println("uuid==="+uuid.toString());
			 String hql="update SandBoxPatientInfo set authInitRequestId='"+uuid.toString()+"' where helathId='"+sandBoxPatientInfo.getHelathId()+"'  ";
			
			Query q = sessionFactory.getCurrentSession().createQuery(hql);
			q.executeUpdate();
			// end
			
			conn.disconnect(); 
			//authConfirm(sandBoxPatientInfo);
			return 1;

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		return 0;
	}
	
//	@SuppressWarnings({ "unchecked", "unused" })
//	public static int authConfirm(SandBoxPatientInfo sandBoxPatientInfo) {
//
//		String output = "";
//
//		UUID uuid = UUID.randomUUID();
//
//		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
//		String currentDate = instant.toString();
//
//		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
//				.currentRequestAttributes()).getRequest();
//		HttpSession session = httpServletRequest.getSession();
//		String transactionId = (String) session.getAttribute("transactionId");
//
//		JSONObject demographic = new JSONObject();
//		
//		String fullName = sandBoxPatientInfo.getfName()+" "+ sandBoxPatientInfo.getmName()+" "+sandBoxPatientInfo.getlName();
//		String gender = sandBoxPatientInfo.getGender();
//		String gender2="";
//		if(gender.equals("Male")) {
//			gender2 = "M";
//		}
//		else if(gender.equals("Female")) {
//			gender2 = "F";
//		}
//		
//		String dob = sandBoxPatientInfo.getDob();
//		String[] split = dob.split("/");
//		String dateOfBirth= split[2]+"-"+split[1]+"-"+split[0];
//		demographic.put("name", fullName);
//		demographic.put("gender", gender2);
//		demographic.put("dateOfBirth", dateOfBirth);
//
//		JSONObject credential = new JSONObject();
////		credential.put("authCode", "");
//		credential.put("demographic", demographic);
//
//		JSONObject jsonObject = new JSONObject();
//		jsonObject.put("requestId", uuid.toString());
//		jsonObject.put("timestamp", currentDate);
//		jsonObject.put("transactionId", transactionId);
//		jsonObject.put("credential", credential);
//
//		String generateToken = generateToken();
//
//		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/users/auth/confirm";
//
//		try {
//			URL url = new URL(urlname);
//			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//			conn.setDoOutput(true);
//			conn.setRequestMethod("POST");
//			conn.setRequestProperty("Content-Type", "application/json");
//			conn.setRequestProperty("charset", "utf-8");
//			conn.setRequestProperty("X-CM-ID", "sbx");
//			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
//
//			OutputStream os = conn.getOutputStream();
//			os.write(jsonObject.toString().getBytes());
//			os.flush();
//			os.close();
//
//			System.out.println(conn.getResponseCode());
//
//			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
//			}
//			
//			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
//
//			output = br.readLine();
//
//			conn.disconnect();
//
//			addCareContext(sandBoxPatientInfo);
//			return 1;
//
//		} catch (Exception ex) {
//			ex.printStackTrace();
//			//return 0;
//		}
//		return 0;
//	}
//
//	@SuppressWarnings("unchecked")
//	public static int addCareContext(SandBoxPatientInfo sandBoxPatientInfo) {
//
//		String output = "";
//
//		UUID uuid = UUID.randomUUID();
//		
//		HttpServletRequest httpServletRequest = ((ServletRequestAttributes) RequestContextHolder
//				.currentRequestAttributes()).getRequest();
//		HttpSession session = httpServletRequest.getSession();
//		String accessToken = (String) session.getAttribute("accessToken");
//		
//		Instant instant = Instant.now().truncatedTo(ChronoUnit.MINUTES);
//		String currentDate = instant.toString();
//
//		JSONArray careContextsArray = new JSONArray();
//
//		
//		
//		List<SandBoxPatientDignosis> listSandBoxDigno = sandBoxPatientInfo.getListSandBoxDigno();
//		
//		
//		String patientReferenceNumber="";
//		for (SandBoxPatientDignosis sandBoxPatientDignosis : listSandBoxDigno) {
//			
//			JSONObject careContextObj = new JSONObject();
//			careContextObj.put("referenceNumber", sandBoxPatientDignosis.getCareContextRefNumber());
//			careContextObj.put("display", sandBoxPatientDignosis.getDiagndesc());
//			
//			careContextsArray.add(careContextObj);
//			patientReferenceNumber= sandBoxPatientDignosis.getPatientReferenceNumber();
//		}
//
//		JSONObject patientObj = new JSONObject();
//		patientObj.put("referenceNumber", patientReferenceNumber);
//		patientObj.put("display", "----"+patientReferenceNumber+"----");
//		patientObj.put("careContexts", careContextsArray);
//
//		JSONObject links = new JSONObject();
//		links.put("accessToken", accessToken);
//		links.put("patient", patientObj);
//
//		JSONObject jsonObject = new JSONObject();
//		jsonObject.put("requestId", uuid.toString());
//		jsonObject.put("timestamp", currentDate);
//		jsonObject.put("link", links);
//
//		String generateToken = generateToken();
//
//		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/links/link/add-contexts";
//
//		try {
//			URL url = new URL(urlname);
//			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
//			conn.setDoOutput(true);
//			conn.setRequestMethod("POST");
//			conn.setRequestProperty("Content-Type", "application/json");
//			conn.setRequestProperty("charset", "utf-8");
//			conn.setRequestProperty("X-CM-ID", "sbx");
//			conn.setRequestProperty("Authorization", "Bearer " + generateToken);
//
//			OutputStream os = conn.getOutputStream();
//			os.write(jsonObject.toString().getBytes());
//			os.flush();
//			os.close();
//
//			System.out.println(conn.getResponseCode());
//
//			if (conn.getResponseCode() != 200 && conn.getResponseCode() != 202) {
//				throw new RuntimeException(
//						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
//			}
//			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));
//
//			output = br.readLine();
//
//			conn.disconnect();
//			return 1;
//
//		} catch (Exception ex) {
//			ex.printStackTrace();
//		}
//		return 0;
//	}
	
	@SuppressWarnings("unchecked")
	public static String generateToken() {

		String clientId="SBX_001584";
		String clientSecret="d6efe4f9-c497-4a5c-bd16-21e415bf21fb";
		
		JSONObject jsonObject = new JSONObject();
		jsonObject.put("clientId", clientId);
		jsonObject.put("clientSecret", clientSecret);
		
		
		String accesToken="";
		
		String urlname = "https://dev.abdm.gov.in/gateway/v0.5/sessions";
		try {
			URL url = new URL(urlname);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("charset", "utf-8");
			conn.setDoOutput(true);
			OutputStream os = conn.getOutputStream();
			os.write(jsonObject.toString().getBytes());
			os.flush();
			os.close();

			if (conn.getResponseCode() != 200) {
				throw new RuntimeException(
						"HTTP error code : " + conn.getResponseCode() + " HTTP message " + conn.getResponseMessage());
			}
			BufferedReader br = new BufferedReader(new InputStreamReader((conn.getInputStream())));

			String output = br.readLine();
			org.json.JSONObject json = new org.json.JSONObject(output);  
			System.out.println(json);
			accesToken = json.getString("accessToken");
			conn.disconnect();
			ObjectMapper mapper = new ObjectMapper();

		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return accesToken;

	}

	@SuppressWarnings("unchecked")
	@Override
	public List<DiagonosisMasterDto> getListOfDiagoList(int treatmentId) {
		// TODO Auto-generated method stub
		TreatmentDto tobj=(TreatmentDto) sessionFactory.openSession().get(TreatmentDto.class, treatmentId);
		Criteria criteria = sessionFactory.openSession().createCriteria(
				DiagonosisMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		 criteria.add(Restrictions.eq("treatObj",tobj));
		// criteria.add(Restrictions.eq("treatmentId", treatmentId));
		List<DiagonosisMasterDto> list = criteria.list();
		return list;
	}

	@Override
	public List<DiagonosisMasterDto> getListOfDiagoListById(int id) {
		// TODO Auto-generated method stub
		Criteria criteria = sessionFactory.openSession().createCriteria(
				DiagonosisMasterDto.class);
		criteria.add(Restrictions.eq("deleted", "N"));
		criteria.add(Restrictions.eq("id", id));
		List<DiagonosisMasterDto> list = criteria.list();
		return list;
	}

	@Override
	public String deleteDiagonosis(String id, HttpServletRequest request) {
		HttpSession session = request.getSession();
		int userId = (int) session.getAttribute("userId1");
		// TODO Auto-generated method stub

		
		String hql = "update DiagonosisMasterDto d set d.deleted='Y',d.deletedDate=:date where id in (" + id + ")";
		Query query2 = sessionFactory.getCurrentSession().createQuery(hql);
		query2.setParameter("date", new Date());
		int flag = query2.executeUpdate();
		System.out.println("flag" + flag);
		 
		
		/*
		 * String hql1 =
		 * "update ehat_patient_sandbox_diagnosis d set d.deleted='Y',d.delete_date_time=:date where diagno_master_id in ("
		 * + id + ")"; Query query3 =
		 * sessionFactory.getCurrentSession().createQuery(hql1);
		 * query3.setParameter("date", new Date()); int flag1 = query3.executeUpdate();
		 * System.out.println("flag" + flag1);
		 */
		

		return "Diagonosis Deleted SuccessFully";

	}

	@Override
	public String updateDignosisStatus(String id, Integer userId, String callFrom, HttpServletRequest request) {
		
		String msg="";
		
		try {
			String sql="";
			sql="update DiagonosisMasterDto set diagnoType='"+callFrom+"',updatedBy="+userId+",updatedDateTime=now() where id in("+id+") ";
			
		Query q= sessionFactory.getCurrentSession().createQuery(sql);
			q.executeUpdate();
			
			msg="Record Updated Sucessfully";
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		return msg;
	}
	
	/******
	 * @author   : Rohini Ambhore
	 * @Code     :To get InvestigatorName for OPD Cinical Staging 
	 * *****/
	public String getUserName(Integer uid) {
		String userName="";
		try {
			String sql;
			if(uid != null) {
				sql = " SELECT concat(title, ' ', f_name,' ',m_name,' ' ,l_name) FROM users where User_ID = "+uid;
			}else {
				sql = " SELECT concat(title, ' ', f_name,' ',m_name,' ' ,l_name) FROM users where User_ID = 1 ";
			}
			SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			userName = (String) query.uniqueResult();
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		return userName;
	}

}
