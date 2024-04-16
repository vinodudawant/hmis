package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.ResourceBundle;

import javassist.runtime.Desc;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.SubObjDao;
import com.hms.ehat.dto.BodyPartMasterDto;
import com.hms.ehat.dto.ChemoTheropyMaterDto;
import com.hms.ehat.dto.ComplaintsMasterDto;
import com.hms.ehat.dto.FindingMasterDto;
import com.hms.ehat.dto.QuestionMasterDto;
import com.hms.ehat.dto.QuestionOptionMasterDto;
import com.hms.ehat.dto.SubObjTempTypeDto;
import com.hms.ehat.dto.SubObjTemplateDto;
import com.hms.ehat.dto.SubServiceDto;

@Repository
public class SubObjDaoImpl implements SubObjDao{
	
	@Autowired
	SessionFactory sessionFactory;
	
	ResourceBundle resourceBundleEhat = ResourceBundle.getBundle("Ehat");
	String autoLimitStr = (String) resourceBundleEhat.getString("autoLimit");
	Integer autoLimit = Integer.parseInt(autoLimitStr);
	
	/**
	 * @author Vikas Godse @date 6_March_2018 All method Implemented From Dao 
	 * **/

	@Override
	public int saveOrUpdateBodyPart(BodyPartMasterDto bodypartMaster) {
		try {
			sessionFactory.getCurrentSession().merge(bodypartMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<BodyPartMasterDto> getAllBodyparts() {
			List<BodyPartMasterDto> ltBodyParts = null;
			try {
				Criteria criteria = sessionFactory.getCurrentSession()
						.createCriteria(BodyPartMasterDto.class);
				criteria.add(Restrictions.eq("status", "Y"));
//				criteria.addOrder(Order.desc("bodyPartId"));
				//criteria.setMaxResults(10);
				ltBodyParts = criteria.list();
				} catch (Exception e) {
				e.printStackTrace();
				return ltBodyParts;
			}
			return ltBodyParts;
			}

	@Override
	public boolean deleteBodyPart(Integer bodyPartId, Integer userId) {
		
		try {
			BodyPartMasterDto bodyPartMaster = (BodyPartMasterDto) sessionFactory
					.getCurrentSession().get(BodyPartMasterDto.class, bodyPartId);
			bodyPartMaster.setStatus("N");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public int saveOrUpdateSubObjTemplate(SubObjTemplateDto subObjTemplateMaster) {
		try {
			sessionFactory.getCurrentSession().merge(subObjTemplateMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@SuppressWarnings("unchecked")
	@Override
	public SubObjTemplateDto getAllSubobjTemplates() {
		SubObjTemplateDto obj = new SubObjTemplateDto();
		List<SubObjTemplateDto> ltSubObjTemplates = null;
		List<BodyPartMasterDto> ltBodyPartMasterDto = new ArrayList<BodyPartMasterDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubObjTemplateDto.class);
			criteria.addOrder(Order.desc("oncoEmrTemplateId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.setMaxResults(autoLimit);
			ltSubObjTemplates = criteria.list();
			for(SubObjTemplateDto objSTD : ltSubObjTemplates){
				
				Criteria criteria1 = sessionFactory.getCurrentSession().createCriteria(BodyPartMasterDto.class);
				criteria1.add(Restrictions.eq("bodyPartId", objSTD.getBodyPart())); 
				criteria1.setProjection(Projections.projectionList().add(Projections.groupProperty("bodyPartName"), "bodyPartName")); 
				criteria1.setResultTransformer(Transformers.aliasToBean(BodyPartMasterDto.class));   
				BodyPartMasterDto objBPMD= (BodyPartMasterDto)criteria1.uniqueResult();
				ltBodyPartMasterDto.add(objBPMD);
			}
			obj.setLstSubObjTemplate(ltSubObjTemplates);
			obj.setLstBodyPartNames(ltBodyPartMasterDto);
			
			} catch (Exception e) {
			e.printStackTrace();
			return obj;
		}
		return obj;
	}

	@Override
	public int saveOrUpdateChemotherapy(ChemoTheropyMaterDto chemoTheropyMaterDto) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(chemoTheropyMaterDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<ChemoTheropyMaterDto> getAllChemotherapyProtocol() {
		List<ChemoTheropyMaterDto> ltChemoProtocol = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChemoTheropyMaterDto.class);
			criteria.addOrder(Order.desc("chemotheropyId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.setMaxResults(10);
			ltChemoProtocol = criteria.list();
			} catch (Exception e) {
			e.printStackTrace();
			return ltChemoProtocol;
		}
		return ltChemoProtocol;
	}

	@Override
	public boolean deleteChemotherapyProtocol(Integer chemoId, Integer userId) {
		try {
			ChemoTheropyMaterDto chemoTheropyMater = (ChemoTheropyMaterDto) sessionFactory
					.getCurrentSession().get(ChemoTheropyMaterDto.class, chemoId);
			chemoTheropyMater.setStatus("N");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public int saveOrUpdateQuestionDetails(QuestionMasterDto questionMasterDto2) {
		Integer questionId = 0;
		try {
			questionId = (Integer) sessionFactory.getCurrentSession().save(questionMasterDto2);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return questionId;
	}

	@Override
	public int saveOrUpdateQuestionDetails1(
			QuestionOptionMasterDto questionOptionMasterDto) {
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(questionOptionMasterDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<QuestionOptionMasterDto> getQuestionSlaveDetails() {
		List<QuestionOptionMasterDto> ltQsnOptions = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(QuestionOptionMasterDto.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.setMaxResults(10);
			ltQsnOptions = criteria.list();
			} catch (Exception e) {
			e.printStackTrace();
			return ltQsnOptions;
		}
		return ltQsnOptions;
	}

	@Override
	public List<QuestionMasterDto> getQuestionMasterDetails() {
		List<QuestionMasterDto> ltQsnMaster = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(QuestionMasterDto.class);
			criteria.addOrder(Order.desc("questionId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.setMaxResults(autoLimit);
			ltQsnMaster = criteria.list();
			} catch (Exception e) {
			e.printStackTrace();
			return ltQsnMaster;
		}
		return ltQsnMaster;
	}

	@Override
	public QuestionMasterDto getAllQuestionDetails() {
		QuestionMasterDto objMaster = new QuestionMasterDto();
		List<QuestionMasterDto> ltMasterDetials = null;//master
		List<QuestionOptionMasterDto> ltSlaveDetails = new ArrayList<QuestionOptionMasterDto>();//slave
		List<QuestionOptionMasterDto> ltSlaveDetails1 = new ArrayList<QuestionOptionMasterDto>();//slave
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(QuestionMasterDto.class);
			criteria.add(Restrictions.eq("status", "Y"));
			//criteria.setMaxResults(15);
			ltMasterDetials = criteria.list();
			for(QuestionMasterDto objSTD : ltMasterDetials){
				
				System.err.println("ltMasterDetials "+ltMasterDetials+" objSTD.getQuestionId() "+objSTD.getQuestionId());
				Criteria criteria1 = sessionFactory.getCurrentSession().createCriteria(QuestionOptionMasterDto.class);
				criteria1.add(Restrictions.eq("questionMasterId", objSTD.getQuestionId())); 
				ltSlaveDetails = criteria1.list();
				
				for(QuestionOptionMasterDto obj : ltSlaveDetails)
				{
					QuestionOptionMasterDto ojbNew=new QuestionOptionMasterDto();
					ojbNew.setOptionName(obj.getOptionName());
					ojbNew.setQuestionMasterId(obj.getQuestionMasterId());
					ojbNew.setQsnOptionId(obj.getQsnOptionId());
					
					ltSlaveDetails1.add(ojbNew);
					
				}
			}
			objMaster.setLstQuestion(ltMasterDetials);
			objMaster.setLstOption(ltSlaveDetails1);
			
			} catch (Exception e) {
			e.printStackTrace();
			return objMaster;
		}
		return objMaster;
	}

	@Override
	public int updateQuestionDetails(QuestionMasterDto questionMasterDto2) {
		int questionId = 1;
		try {
			sessionFactory.getCurrentSession().update(questionMasterDto2);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return questionId;
	}

	@Override
	public int updateQuestionDetails1(QuestionOptionMasterDto obj) {
		int questionId = 1;
		try {
			sessionFactory.getCurrentSession().saveOrUpdate(obj);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return questionId;
	}

	@Override
	public boolean deleteQustion(Integer questionId, Integer userId) {
		try {
			QuestionMasterDto questionMasterDto = (QuestionMasterDto) sessionFactory
					.getCurrentSession().get(QuestionMasterDto.class, questionId);
			questionMasterDto.setStatus("N");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public int saveOrUpdateComplaints(ComplaintsMasterDto complaintsMasterDto) {
		try {
			sessionFactory.getCurrentSession().merge(complaintsMasterDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<ComplaintsMasterDto> getAllComplaints() {
		List<ComplaintsMasterDto> ltComplaints = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ComplaintsMasterDto.class);
			criteria.addOrder(Order.desc("complaintId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.setMaxResults(10);
			ltComplaints = criteria.list();
			} catch (Exception e) {
			e.printStackTrace();
			return ltComplaints;
		}
		return ltComplaints;
	}

	@Override
	public boolean deleteComplaint(Integer complaintId, Integer userId) {
		try {
			ComplaintsMasterDto complaintsMasterDto = (ComplaintsMasterDto) sessionFactory
					.getCurrentSession().get(ComplaintsMasterDto.class, complaintId);
			complaintsMasterDto.setStatus("N");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public int saveOrUpdateFindings(FindingMasterDto findingMasterDto) {
		try {
			sessionFactory.getCurrentSession().merge(findingMasterDto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<FindingMasterDto> getAllFindings() {
		List<FindingMasterDto> ltFindings = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FindingMasterDto.class);
			criteria.addOrder(Order.desc("findingId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.setMaxResults(autoLimit);
			ltFindings = criteria.list();
			} catch (Exception e) {
			e.printStackTrace();
			return ltFindings;
		}
		return ltFindings;
	}

	@Override
	public boolean deleteFinding(Integer findingId, Integer userId) {
		try {
			FindingMasterDto findingMasterDto = (FindingMasterDto) sessionFactory
					.getCurrentSession().get(FindingMasterDto.class, findingId);
			findingMasterDto.setStatus("N");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public int saveOrUpdateSubObjTempType(SubObjTempTypeDto subObjTempTypeMaster) {
		try {
			sessionFactory.getCurrentSession().merge(subObjTempTypeMaster);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<SubObjTempTypeDto> getAllSubObjTempTypes() {
		List<SubObjTempTypeDto> ltSubObjTempTypes = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubObjTempTypeDto.class);
			criteria.addOrder(Order.desc("subObjTempTypeId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.setMaxResults(15);
			ltSubObjTempTypes = criteria.list();
			} catch (Exception e) {
			e.printStackTrace();
			return ltSubObjTempTypes;
		}
		return ltSubObjTempTypes;
	}

	@Override
	public boolean deleteTempType(Integer subObjTempTypeId, Integer userId) {
		try {
			SubObjTempTypeDto subObjTempTypeMaster = (SubObjTempTypeDto) sessionFactory
					.getCurrentSession().get(SubObjTempTypeDto.class, subObjTempTypeId);
			subObjTempTypeMaster.setStatus("N");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public BodyPartMasterDto getAutoSuggestionBodyPartNames(String letter) {
		BodyPartMasterDto obj = new BodyPartMasterDto();
		List<BodyPartMasterDto> ltBodyPartMasterDto = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(BodyPartMasterDto.class);
			//criteria.addOrder(Order.desc("deptId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("bodyPartName", "%"+letter+"%"));
			criteria.setMaxResults(autoLimit); 
			ltBodyPartMasterDto = criteria.list();
			obj.setLstBodyParts(ltBodyPartMasterDto);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return obj;
	}

	@Override
	public SubObjTemplateDto getAutoSuggestionSubObjTemp(String letter) {
		SubObjTemplateDto obj = new SubObjTemplateDto();
		List<SubObjTemplateDto> ltSubObjTemplates = null;
		List<BodyPartMasterDto> ltBodyPartMasterDto = new ArrayList<BodyPartMasterDto>();
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubObjTemplateDto.class);
			criteria.addOrder(Order.desc("oncoEmrTemplateId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("templateName", "%"+letter+"%"));
			criteria.setMaxResults(autoLimit);
			ltSubObjTemplates = criteria.list();
			for(SubObjTemplateDto objSTD : ltSubObjTemplates){
				
				Criteria criteria1 = sessionFactory.getCurrentSession().createCriteria(BodyPartMasterDto.class);
				criteria1.add(Restrictions.eq("bodyPartId", objSTD.getBodyPart())); 
				criteria1.setProjection(Projections.projectionList().add(Projections.groupProperty("bodyPartName"), "bodyPartName")); 
				criteria1.setResultTransformer(Transformers.aliasToBean(BodyPartMasterDto.class));   
				BodyPartMasterDto objBPMD= (BodyPartMasterDto)criteria1.uniqueResult();
				ltBodyPartMasterDto.add(objBPMD);
			}
			obj.setLstSubObjTemplate(ltSubObjTemplates);
			obj.setLstBodyPartNames(ltBodyPartMasterDto);
			
			} catch (Exception e) {
			e.printStackTrace();
			return obj;
		}
		return obj;
	}

	@Override
	public ChemoTheropyMaterDto getAutoSuggestionChemo(String letter) {
		ChemoTheropyMaterDto obj = new ChemoTheropyMaterDto();
		List<ChemoTheropyMaterDto> ltAutoSuggChemo = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ChemoTheropyMaterDto.class);
			criteria.addOrder(Order.desc("chemotheropyId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("chemoTheropyName", "%"+letter+"%"));
			criteria.setMaxResults(autoLimit); 
			ltAutoSuggChemo = criteria.list();
			obj.setLstChemoTheropy(ltAutoSuggChemo);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return obj;
	}

	@Override
	public QuestionMasterDto getAutoSuggQsnMaster(String letter) {
		QuestionMasterDto obj = new QuestionMasterDto();
		List<QuestionMasterDto> ltAutoSuggQsn = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(QuestionMasterDto.class);
			criteria.addOrder(Order.desc("questionId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("question", "%"+letter+"%"));
			criteria.setMaxResults(autoLimit); 
			ltAutoSuggQsn = criteria.list();
			obj.setLstQuestion(ltAutoSuggQsn);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return obj;
	}

	@Override
	public ComplaintsMasterDto getAutoSuggComplaints(String letter) {
		ComplaintsMasterDto obj = new ComplaintsMasterDto();
		List<ComplaintsMasterDto> ltAutoSuggComplaints = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(ComplaintsMasterDto.class);
			criteria.addOrder(Order.desc("complaintId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("complaintName", "%"+letter+"%"));
			criteria.setMaxResults(autoLimit); 
			ltAutoSuggComplaints = criteria.list();
			obj.setLstComplaints(ltAutoSuggComplaints);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return obj;
	}

	@Override
	public FindingMasterDto getAutoSuggFindings(String letter) {
		FindingMasterDto obj = new FindingMasterDto();
		List<FindingMasterDto> ltAutoSuggFindings = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(FindingMasterDto.class);
			criteria.addOrder(Order.desc("findingId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("findingName", "%"+letter+"%"));
			criteria.setMaxResults(autoLimit); 
			ltAutoSuggFindings = criteria.list();
			obj.setLstFindings(ltAutoSuggFindings);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return obj;
	}

	@Override
	public SubObjTempTypeDto getAutoSuggSubObjTempType(String letter) {
		SubObjTempTypeDto obj = new SubObjTempTypeDto();
		List<SubObjTempTypeDto> ltAutoSuggSubObjTempType = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(SubObjTempTypeDto.class);
			//criteria.addOrder(Order.desc("deptId"));
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("subObjTempType", "%"+letter+"%"));
			criteria.setMaxResults(autoLimit); 
			ltAutoSuggSubObjTempType = criteria.list();
			obj.setLstSubObjTempType(ltAutoSuggSubObjTempType);
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return obj;
	}

	@Override
	public boolean deleteSubObjTemplate(int oncoEmrTemplateId, Integer userId) {
		try {
			SubObjTemplateDto subObjTempMaster = (SubObjTemplateDto) sessionFactory
					.getCurrentSession().get(SubObjTemplateDto.class, oncoEmrTemplateId);
			subObjTempMaster.setStatus("N");
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
}
