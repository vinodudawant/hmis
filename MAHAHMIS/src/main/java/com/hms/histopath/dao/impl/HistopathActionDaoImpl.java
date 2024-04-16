package com.hms.histopath.dao.impl;

import java.io.File;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.histopath.dao.HistopathActionDao;
import com.hms.histopath.dto.HistoPathReportDTO;
import com.hms.histopath.dto.HistopathMaster;
import com.hms.pathology.dto.FilePathPathology;

@Repository
public class HistopathActionDaoImpl implements HistopathActionDao {
	
	@Autowired
	SessionFactory sessionFactory;

	@Override
	public int uploadDocuments(List<HistoPathReportDTO> list) {
		try {
			for (HistoPathReportDTO dto : list)
				sessionFactory.getCurrentSession().merge(dto);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 2;

	}

	@Override
	public List<HistoPathReportDTO> getHistoPathReportDoc(Integer masterid) {
		List<HistoPathReportDTO> ltoutsource = null;
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HistoPathReportDTO.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			criteria.add(Restrictions.eq("histopathMasterId", masterid));
			// criteria.addOrder(Order.asc("id"));
			ltoutsource = criteria.list();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return ltoutsource;
	}

	@Override
	public boolean deleteHistoPathDocument(Integer id, HttpServletRequest request) {
		try {
			HttpSession session = request.getSession();
			Integer userId = (Integer) session.getAttribute("userId1");
			HistoPathReportDTO dto = (HistoPathReportDTO) sessionFactory.getCurrentSession()
					.get(HistoPathReportDTO.class, id);
			dto.setDeleted("Y");
			// outSourceDto.setDocument("");
			dto.setDeleteDate(new Date(new java.util.Date().getTime()));
			dto.setDeleteBy(userId);

			String[] fileNames = dto.getDocumentpath().split(",");
			for (String fileName : fileNames) {
				File uploadPath = new File(FilePathPathology.getOutsourceFilesPath() + dto.getId());
				String filepath = Paths.get(uploadPath.toString(), fileName).toString();
				File file = new File(filepath);
				file.delete();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@Override
	public HistoPathReportDTO getHistoPathReportDocById(Integer id) {
		HistoPathReportDTO histoPathReportDTO = new HistoPathReportDTO();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HistoPathReportDTO.class);
			criteria.add(Restrictions.eq("id", id));
			histoPathReportDTO = (HistoPathReportDTO) criteria.uniqueResult();
			return histoPathReportDTO;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	@Override
	public String updateEmailStatus(String[] document, String mailStatus) {
		String sql = "";
		Query q = null;
		if (document != null && document.length > 0) {
			for (String docId : document) {
				sql = "update HistoPathReportDTO set emailStatus=:mailStatus,emailSendDate=:emailSendDate where id=:id ";
				q = sessionFactory.getCurrentSession().createQuery(sql);
				q.setParameter("mailStatus", mailStatus);
				q.setParameter("emailSendDate", new Date(new java.util.Date().getTime()));
				q.setParameter("id", Integer.parseInt(docId));
				q.executeUpdate();
			}
		}
		return null;
	}

	@Override
	public HistopathMaster getHistopathMasterById(Integer masterId) {
		HistopathMaster histopathMasterDTO = new HistopathMaster();
		try {
			Criteria criteria = sessionFactory.getCurrentSession().createCriteria(HistopathMaster.class);
			criteria.add(Restrictions.eq("histopathMasterId", masterId));
			histopathMasterDTO = (HistopathMaster) criteria.uniqueResult();
			
			Timestamp ts=new Timestamp(histopathMasterDTO.getAcceptedDateTime().getTime());  
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");  
            System.out.println(formatter.format(ts));  
            
            String strDate = formatter.format(ts);
            System.out.println(">> "+strDate); 
            
            histopathMasterDTO.setAcceptedDtTime(strDate);
		    
			return histopathMasterDTO;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
