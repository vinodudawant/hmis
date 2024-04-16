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

import com.hms.administrator.dao.AdminGeneralVoucherDao;
import com.hms.administrator.dto.AdminGeneralVoucherDTO;
@SuppressWarnings("unchecked")
@Repository
public class AdminGeneralVoucherDaoImpl implements AdminGeneralVoucherDao{

	@Autowired
	SessionFactory sessionFactory;
	
	@Override
	public int saveGeneralVoucher(AdminGeneralVoucherDTO voucher,
			HttpServletRequest request) {
        try {
            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminGeneralVoucherDTO.class);
                     criteria.add(Restrictions.eq("voucherName", voucher.getVoucherName()));
                     criteria.add(Restrictions.eq("deleted", "N"));
                     
            if(criteria.uniqueResult() != null)
                return 3;
           
            if(voucher.getVoucherID() == 0) {
            	sessionFactory.getCurrentSession().merge(voucher);
                return 1;
            } else {
            	AdminGeneralVoucherDTO adminGeneralVoucherDTO = (AdminGeneralVoucherDTO) sessionFactory.getCurrentSession().get(AdminGeneralVoucherDTO.class, voucher.getVoucherID());
                if(adminGeneralVoucherDTO != null)
                {
                	adminGeneralVoucherDTO.setVoucherName(voucher.getVoucherName());
                	adminGeneralVoucherDTO.setUpdatedBy(voucher.getCreatedBy());
                	sessionFactory.getCurrentSession().merge(adminGeneralVoucherDTO);
                }
                return 2;
            }
        } catch(Exception e) {
            e.printStackTrace();
        }
        return 0;
	}

	
	@Override
	public List<AdminGeneralVoucherDTO> getAllGeneralVoucher() {
		  try {
	        	List<AdminGeneralVoucherDTO> adminvoucherList=new ArrayList<AdminGeneralVoucherDTO>();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminGeneralVoucherDTO.class);
	            criteria.add(Restrictions.eq("deleted", "N"));
	            criteria.addOrder(Order.asc("voucherName"));
	            adminvoucherList=criteria.list();
	              return  adminvoucherList;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public AdminGeneralVoucherDTO editVoucherById(int voucherid,
			HttpServletRequest request) {
		 try {
			 AdminGeneralVoucherDTO voucher=new AdminGeneralVoucherDTO();
	            Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminGeneralVoucherDTO.class);
	            criteria.add(Restrictions.eq("voucherID", voucherid));
	            criteria.add(Restrictions.eq("deleted", "N"));
	            voucher=(AdminGeneralVoucherDTO) criteria.uniqueResult();
	              return voucher;      
	        } catch(Exception e) {
	            e.printStackTrace();
	            return null;
	        }
	}

	@Override
	public boolean deleteVoucherById(int voucherid, HttpServletRequest request) {
		try {
			AdminGeneralVoucherDTO voucher = (AdminGeneralVoucherDTO) sessionFactory.getCurrentSession().get(AdminGeneralVoucherDTO.class,voucherid);
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			voucher.setDeleted("Y");
			voucher.setDeletedBy(userId);
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public List<AdminGeneralVoucherDTO> searchVoucherByName(String name,
			HttpServletRequest request) {
		try {
			List<AdminGeneralVoucherDTO> adminVoucherList = new ArrayList<AdminGeneralVoucherDTO>();
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(AdminGeneralVoucherDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.like("voucherName", name, MatchMode.START));
			criteria.addOrder(Order.asc("voucherName"));
			adminVoucherList = criteria.list();
			return adminVoucherList;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
