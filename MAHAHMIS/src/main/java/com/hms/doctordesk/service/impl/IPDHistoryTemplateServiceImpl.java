package com.hms.doctordesk.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hms.doctordesk.dao.IPDHistoryTemplateDao;
import com.hms.doctordesk.dto.IPDHistoryTemplateMasterDTO;
import com.hms.doctordesk.dto.IPDHistoryTemplateSlaveDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.doctordesk.service.IPDHistoryTemplateService;
import com.hms.patient.util.ConfigUIJSONUtility;
import com.hms.rostermanagement.dto.ConsultingRoomMaterDTO;

@Service
@Transactional
public class IPDHistoryTemplateServiceImpl implements IPDHistoryTemplateService {

	 @Autowired
	 IPDHistoryTemplateDao ipddao;
	 
	 @Autowired
	   SessionFactory sf;
	
	@Override
	public int saveIPDHistorytemplate(IPDHistoryTemplateMasterDTO obj, String historySlaveList) {
		IPDHistoryTemplateSlaveDTO freshobj = (IPDHistoryTemplateSlaveDTO) ConfigUIJSONUtility
				.getObjectFromJSON(historySlaveList, IPDHistoryTemplateSlaveDTO.class);	
		List<IPDHistoryTemplateSlaveDTO> lsthistoryslave = freshobj.getGetListOfHistorySlaveDTO();
		obj.setGetListOfHistorySlaveDTO(lsthistoryslave);
		
		if(obj.getTemplateHistoryId() ==0) {
			Criteria crit = sf.getCurrentSession().createCriteria(IPDHistoryTemplateMasterDTO.class);
					crit.add( Restrictions.eq("templateName", obj.getTemplateName()));
					crit.add( Restrictions.eq("deleted", "N"));
					crit.setProjection(Projections.rowCount());
					Integer count = ((Number)crit.uniqueResult()).intValue();
					 if(count==0) {
					return ipddao.saveIPDHistorytemplate(obj);
					 }else {
						 return 3;
					 }
		}else {
				List<Integer> nlist=new ArrayList<>();
				nlist.add(obj.getTemplateHistoryId());
				Criteria crit = sf.getCurrentSession().createCriteria(IPDHistoryTemplateMasterDTO.class);
				
				crit.add( Restrictions.eq("templateName", obj.getTemplateName()));
				crit.add(Restrictions.not(Restrictions.in("templateHistoryId",nlist)));
				crit.add( Restrictions.eq("deleted", "N"));
				crit.setProjection(Projections.rowCount());
				Integer count = ((Number)crit.uniqueResult()).intValue();
				 if(count==0) {
				return ipddao.saveIPDHistorytemplate(obj);
				 }else {
					 return 3;
				 }
		}
	}

	@Override
	public IPDHistoryTemplateMasterDTO getIPDHistorytemplateById(Integer id) {
		
		return ipddao.getIPDHistorytemplateById(id);
	}

	@Override
	public IPDHistoryTemplateMasterDTO getIPDHistoryTemplateList(Integer unitId) {
		
		return ipddao.getIPDHistoryTemplateList(unitId);
	}

	@Override
	public int deleteIPDHistorytemplateSalve(String historySlaveId, Integer userId) {
		
		return ipddao.deleteIPDHistorytemplateSalve(historySlaveId, userId);
	}

}
