package com.hms.administrator.dao.impl;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.administrator.dao.AdminStateDao;
import com.hms.administrator.dto.AdminStateDTO;

@SuppressWarnings("unchecked")
@Repository
public class AdminStateDaoImpl implements AdminStateDao {

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
    public int saveAdminState(AdminStateDTO state,HttpServletRequest request) {
        try {
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminStateDTO.class);
                     criteria.add(Restrictions.eq("stateName", state.getStateName()));
                     criteria.add(Restrictions.eq("status", "Y"));
                     
            if(criteria.uniqueResult() != null)
                return 3;
           
            if(state.getState_ID() == 0) {
            	sessionFactory.getCurrentSession().merge(state);
                return 1;
            } else {
            	AdminStateDTO adminStateDTO = (AdminStateDTO) sessionFactory.getCurrentSession().get(AdminStateDTO.class, state.getState_ID());
                if(adminStateDTO != null)
                {
                	adminStateDTO.setStateName(state.getStateName());
                	adminStateDTO.setUpdatedBy(state.getCreatedBy());
                	sessionFactory.getCurrentSession().merge(adminStateDTO);
                }
                return 2;
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
    }

	@Override
	public List<AdminStateDTO> getAllState() {
        try {
        	List<AdminStateDTO> adminStateList=new ArrayList<AdminStateDTO>();
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminStateDTO.class);
            criteria.add(Restrictions.eq("status", "Y"));
            criteria.addOrder(Order.asc("stateName"));
            adminStateList=criteria.list();
              return  adminStateList;      
        } catch(Exception e) {
            e.printStackTrace();
            return null;
        }
	}

	@Override
	public AdminStateDTO editStateById(int state_id,HttpServletRequest request) {
		 try {
			 	AdminStateDTO state=new AdminStateDTO();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminStateDTO.class);
	            criteria.add(Restrictions.eq("state_ID", state_id));
	            criteria.add(Restrictions.eq("status", "Y"));
	            state=(AdminStateDTO) criteria.uniqueResult();
	              return state;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public boolean deleteStateById(int state_id,HttpServletRequest request) {
		try {
			AdminStateDTO state = (AdminStateDTO) sessionFactory.getCurrentSession().get(AdminStateDTO.class,state_id);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			state.setStatus("N");
			state.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<AdminStateDTO> searchSateByName(String name,
			HttpServletRequest request) {
		try {
			List<AdminStateDTO> adminStateList = new ArrayList<AdminStateDTO>();
			Criteria criteria = sessionFactory.getCurrentSession()
					.createCriteria(AdminStateDTO.class);
			criteria.add(Restrictions.eq("status", "Y"));
			criteria.add(Restrictions.like("stateName", name, MatchMode.START));
			criteria.addOrder(Order.asc("stateName"));
			adminStateList = criteria.list();
			return adminStateList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
