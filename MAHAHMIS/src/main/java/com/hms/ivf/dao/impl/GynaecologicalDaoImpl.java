package com.hms.ivf.dao.impl;

import java.sql.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ivf.dao.GynaecologicalDao;
import com.hms.ivf.dto.GynHistoryDto;

@Repository
public class GynaecologicalDaoImpl implements GynaecologicalDao{
	
	@Autowired
	SessionFactory sessionFactory;
		
	
	@Override
	public int saveGynHistory11(GynHistoryDto objDto,HttpServletRequest request) {
		
		int Result = 0;
		try {
			
			HttpSession session = request.getSession();
			int UserId =(Integer)session.getAttribute("userId");
			
			int id =objDto.getGynid(); 
            
                if(id==0){
                	objDto.setCreatedBy(UserId);      
                	objDto.setCreatedDate(new Date(new java.util.Date().getTime()));  
                    sessionFactory.getCurrentSession().merge(objDto);   
                    Result=1;
                }else{
                	
                	objDto.setUpdatedBy(UserId);   
                	objDto.setUpdatedDate(new Date(new java.util.Date().getTime())); 
                    sessionFactory.getCurrentSession().merge(objDto) ;  
                    Result=2;
                }
			
		} catch (Exception e) {
			e.printStackTrace();
			return Result;
		}
		
	return Result;
	}

	@Override
	public GynHistoryDto getAllGynaecologicalList() {
			
		GynHistoryDto objGyn = new GynHistoryDto();
		try {
			List<GynHistoryDto> ltGyn = null;
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(GynHistoryDto.class);
			/*criteria.add(Restrictions.eq("deleted", "N"));*/
			criteria.addOrder(Order.desc("gynid"));
			//criteria.setMaxResults(10);
			ltGyn = criteria.list();
			objGyn.setListGyn(ltGyn);

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return objGyn;
		
	}

	@Override
	public List<GynHistoryDto> fetchGynHisData(int patientId, int treatmentId) {
		
		List<GynHistoryDto> listGynData = null;
		try {
			  Criteria criteria=sessionFactory.getCurrentSession()
					  .createCriteria(GynHistoryDto.class);
			  criteria.add(Restrictions.eq("pid",patientId ));
			 // criteria.add(Restrictions.eq("tid", treatmentId));
			  criteria.add(Restrictions.eq("ivf_treatmentId", treatmentId));
			  listGynData=criteria.list();
		
		} catch (Exception e) {
			e.printStackTrace();
		}
	
		return listGynData;
	}

}
