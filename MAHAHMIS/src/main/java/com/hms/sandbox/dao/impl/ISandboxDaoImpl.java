package com.hms.sandbox.dao.impl;

import java.util.List;

import javax.transaction.Transactional;

import org.apache.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.hms.sandbox.dao.ISandboxDao;
import com.hms.sandbox.dto.ConsentDTO;
import com.hms.sandbox.dto.SandBoxPatientInfo;

/******
 * @author :Vishant Pawar
 * @Date :29-09-2022
 *****/

@Transactional
@Service
public class ISandboxDaoImpl implements ISandboxDao {

	@Autowired
	SessionFactory sessionFactory;

	static Logger log = Logger.getLogger(ISandboxDaoImpl.class.getName());

	@SuppressWarnings("unchecked")
	@Override
	public List<ConsentDTO> saveConsent(ConsentDTO consentDto) {

		sessionFactory.getCurrentSession().merge(consentDto);

		Session currentSession = sessionFactory.getCurrentSession();
		// Criteria addOrder =
		currentSession.createCriteria(ConsentDTO.class).addOrder(Order.asc("id"));

		Criteria criteria = currentSession.createCriteria(ConsentDTO.class);
		criteria.addOrder(Order.asc("id"));
		List<ConsentDTO> list = criteria.list();
//
		return list;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ConsentDTO> getConsentData() {
		
		Session currentSession = sessionFactory.getCurrentSession();
		
		Criteria criteria = currentSession.createCriteria(ConsentDTO.class);
		criteria.addOrder(Order.desc("id"));
		List<ConsentDTO> list = criteria.list();
		return list;
	}

	@Override
	public SandBoxPatientInfo getSandboxPatientById(int patientId) {
		
		Session currentSession = sessionFactory.getCurrentSession();
		Criteria criteria = currentSession.createCriteria(SandBoxPatientInfo.class);
		criteria.add(Restrictions.eq("patientId", patientId));
	//	criteria.addOrder(Order.asc("id"));
		SandBoxPatientInfo sandBoxPatientInfo = (SandBoxPatientInfo) criteria.uniqueResult();
		return sandBoxPatientInfo;
	}

	@Override
	public ConsentDTO getConsentByRequestId(String healthId) {
		
		Session currentSession = sessionFactory.getCurrentSession();
		Criteria criteria = currentSession.createCriteria(ConsentDTO.class);
		criteria.add(Restrictions.eq("requestId", healthId));
	//	criteria.addOrder(Order.asc("id"));
		ConsentDTO consentDTO = (ConsentDTO) criteria.uniqueResult();
		return consentDTO;
	}

	@Override
	public ConsentDTO getDataByConsentId(String consentId) {
		
		Session currentSession = sessionFactory.getCurrentSession();
		Criteria criteria = currentSession.createCriteria(ConsentDTO.class);
		criteria.add(Restrictions.eq("consentId", consentId));
	//	criteria.addOrder(Order.asc("id"));
		ConsentDTO consentDTO = (ConsentDTO) criteria.uniqueResult();
		return consentDTO;
	}

	@Override
	public ConsentDTO getDecryptedData(int id) {
		
		Session currentSession = sessionFactory.getCurrentSession();
		Criteria criteria = currentSession.createCriteria(ConsentDTO.class);
		criteria.add(Restrictions.eq("id", id));
	//	criteria.addOrder(Order.asc("id"));
		ConsentDTO consentDTO = (ConsentDTO) criteria.uniqueResult();
		
	//	JSONObject jsonObject = new JSONObject();
//		JsonParser jsonParser = new JsonParser();
//		JsonObject jsonData = (JsonObject) jsonParser.parse(consentDTO.getDecryptedData());
//		System.out.println(jsonData);
		//consentDTO.setList(jsonData);
		return consentDTO;
	}

}
