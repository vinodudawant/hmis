package com.hms.pathology.daoImpl;

import java.util.ArrayList;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.hms.pathology.dao.TestReasonDao;
import com.hms.pathology.dto.LabTestSampleDTO;
import com.hms.pathology.dto.PathologyTestReasonDto;

@Repository
public class TestReasonDaoimpl  implements TestReasonDao{

	
	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveTestReason(PathologyTestReasonDto labTestReasonDTO, Integer sampleTypeId, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");	
			
            /*
            List<Integer> ids = new ArrayList<>();
    		Arrays.asList(sampleTypeIds.split(",")).forEach(s->ids.add(Integer.parseInt(s)));
            Query hql = sessionFactory.getCurrentSession().createQuery("FROM LabTestSampleDTO WHERE idTestSample IN (:sampleTypeIds)");
            hql.setParameterList("sampleTypeIds", ids);
            
            List<LabTestSampleDTO> sampleTypesList = hql.list();
            */
            LabTestSampleDTO labSampleType = (LabTestSampleDTO) sessionFactory.getCurrentSession().get(LabTestSampleDTO.class, sampleTypeId);
            
            if(labTestReasonDTO.getIdTestreason() == 0) {
            	Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PathologyTestReasonDto.class);
            	criteria.add(Restrictions.eq("testReasonName", labTestReasonDTO.getTestReasonName()));
            	criteria.add(Restrictions.eq("labTestSampleType", labSampleType));
	            criteria.add(Restrictions.eq("deleted", "N"));
				
	            PathologyTestReasonDto reason = (PathologyTestReasonDto) criteria.uniqueResult();

				if(reason != null) {
					return 3;
				}else {
					labTestReasonDTO.setLabTestSampleType(labSampleType);
					labTestReasonDTO.setCreatedBy(userId);
					sessionFactory.getCurrentSession().merge(labTestReasonDTO);
					
					return 1;
				}
            } else {
            	String hqlQuery = "SELECT COUNT(*) FROM PathologyTestReasonDto WHERE idTestreason NOT IN (:idTestreason) AND deleted=:deleted AND testReasonName =:testReasonName AND labTestSampleType =:labTestSampleType";
				Query hql = sessionFactory.getCurrentSession().createQuery(hqlQuery);
					  hql.setParameter("idTestreason", labTestReasonDTO.getIdTestreason());	  
					  hql.setParameter("testReasonName", labTestReasonDTO.getTestReasonName());
					  hql.setParameter("labTestSampleType", labSampleType);
					  hql.setParameter("deleted", "N");
					  
				Long count = (Long) hql.uniqueResult();
						
				if(count >= 1) {
					return 3;
				}else {
					PathologyTestReasonDto labtestRDTO = (PathologyTestReasonDto) sessionFactory.getCurrentSession().get(PathologyTestReasonDto.class, labTestReasonDTO.getIdTestreason());
					labtestRDTO.setLabTestSampleType(labSampleType);
                
					if(labtestRDTO != null){
						labtestRDTO.setTestReasonName(labTestReasonDTO.getTestReasonName());
						labtestRDTO.setReasonType(labTestReasonDTO.getReasonType());
						labtestRDTO.setUpdatedBy(userId);
						sessionFactory.getCurrentSession().merge(labtestRDTO);
					}
					return 2;
				}
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
	}

	@Override
	public List<PathologyTestReasonDto> getAllTestReason() {
		List<PathologyTestReasonDto> TestReasonList = new ArrayList<PathologyTestReasonDto>();
		try {
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PathologyTestReasonDto.class);
            criteria.add(Restrictions.eq("deleted", "N"));
           // criteria.addOrder(Order.asc("testReasonName"));
            criteria.addOrder(Order.asc("idTestreason"));
            TestReasonList=criteria.list();
            return  TestReasonList;      
        } catch(Exception e) {
            e.printStackTrace();
            return TestReasonList;
        }
	}

	@Override
	public PathologyTestReasonDto editTestReasonById(int id,
			HttpServletRequest request) {
		 try {
			 PathologyTestReasonDto labTestReasonDTO=new PathologyTestReasonDto();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PathologyTestReasonDto.class);
	            criteria.add(Restrictions.eq("idTestreason", id));
	            criteria.add(Restrictions.eq("deleted", "N"));
	            labTestReasonDTO=(PathologyTestReasonDto) criteria.uniqueResult();
	            return labTestReasonDTO;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public boolean deleteTestReasonById(int id, HttpServletRequest request) {
		try {
			PathologyTestReasonDto labTestReasonDTO = (PathologyTestReasonDto) sessionFactory.getCurrentSession().get(PathologyTestReasonDto.class,id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			labTestReasonDTO.setDeleted("Y");
			labTestReasonDTO.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<PathologyTestReasonDto> searchTestReasonByName(String name,
			HttpServletRequest request) {
		try {
			List<PathologyTestReasonDto> labTestReasonList = new ArrayList<PathologyTestReasonDto>();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(PathologyTestReasonDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("testReasonName", name, MatchMode.START));
			//criteria.addOrder(Order.asc("testReasonName"));
			 criteria.addOrder(Order.asc("idTestreason"));
			labTestReasonList = criteria.list();
			return labTestReasonList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
}