package com.hms.doctordesk.dao.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.doctordesk.dao.IPDHistoryTemplateDao;
import com.hms.doctordesk.dto.IPDHistoryTemplateMasterDTO;
import com.hms.doctordesk.dto.IPDHistoryTemplateSlaveDTO;
import com.hms.doctordesk.dto.OPDHistoryMasterDTO;
import com.hms.doctordesk.dto.OPDHistorySlaveDTO;
import com.hms.ehat.dto.TreatmentDto;

@Repository
public class IPDHistoryTemplateDaoImpl  implements IPDHistoryTemplateDao{
	
	@Autowired
	SessionFactory sf;
	

	@Override
	public int saveIPDHistorytemplate(IPDHistoryTemplateMasterDTO obj) {
		try {
			 if(obj.getTemplateHistoryId()==0) {
				 sf.getCurrentSession().merge(obj);
				 return 1;
			 }else {
				 sf.getCurrentSession().merge(obj);
				 return 2;
			 }
		}catch (Exception e) {
			e.printStackTrace();
		}
		return 0;
	}

	@Override
	public IPDHistoryTemplateMasterDTO getIPDHistorytemplateById(Integer id) {
		IPDHistoryTemplateMasterDTO obj=new IPDHistoryTemplateMasterDTO();
	
	List<IPDHistoryTemplateSlaveDTO> list =new ArrayList<IPDHistoryTemplateSlaveDTO>();
	
	try {
		Criteria c=  sf.getCurrentSession().createCriteria(IPDHistoryTemplateMasterDTO.class);
		c.add(Restrictions.eq("templateHistoryId", id));
		obj=(IPDHistoryTemplateMasterDTO) c.uniqueResult();
		
		if(obj !=null) {
			list=	obj.getGetListOfHistorySlaveDTO();
			 List<IPDHistoryTemplateSlaveDTO> newlist= list.stream().filter(x->x.getDeleted().equalsIgnoreCase("N")).collect(Collectors.toList());
			obj.setGetListOfHistorySlaveDTO(newlist);
		}
	
	}catch (Exception e) {
		e.printStackTrace();
	}
	return obj;}

	@Override
	public IPDHistoryTemplateMasterDTO getIPDHistoryTemplateList(Integer unitId) {
		List<IPDHistoryTemplateMasterDTO> list=new ArrayList<IPDHistoryTemplateMasterDTO>();
		IPDHistoryTemplateMasterDTO obj=new IPDHistoryTemplateMasterDTO();
		try {
		    Criteria c=  	sf.getCurrentSession().createCriteria(IPDHistoryTemplateMasterDTO.class);
		    c.add(Restrictions.eq("deleted", "N"));
		    list=  c.list();
		    obj.setGetListOfOPDHistoryDTO(list);
		}catch (Exception e) {
		
		}
		return obj;
	}

	@Override
	public int deleteIPDHistorytemplateSalve(String historySlaveId, Integer userId) {
		int msg=0;
		try{
			
			Query itemInfo = sf	.getCurrentSession().createSQLQuery("update ipd_history_template_slave_info set deleted='Y',deleted_by="
					+ userId	+ ",deleted_date_time=now() where history_slave_id in("+historySlaveId+")");
			
			itemInfo.executeUpdate();
			msg=1;
		}catch(Exception e){
			e.printStackTrace();
		}
		return msg;
	}

}
