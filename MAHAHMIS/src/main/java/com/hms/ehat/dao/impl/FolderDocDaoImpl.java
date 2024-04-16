package com.hms.ehat.dao.impl;

import java.util.ArrayList;
import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.hms.ehat.dao.FolderDocDao;
import com.hms.ehat.dto.FolderDocDto;
import com.hms.ehat.dto.ShelfDocDto;

@Repository
public class FolderDocDaoImpl implements FolderDocDao {
	@Autowired
	SessionFactory sessionFactory;
	@Override
	public int saveorUpdateFolderDoc(FolderDocDto folderobj) {
		try {
			if(folderobj.getFolderId()==0){
				sessionFactory.getCurrentSession().merge(folderobj);
				return 1;
			}else{
				sessionFactory.getCurrentSession().merge(folderobj);
				return 2;				
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}	
	}

	@Override
	public List<FolderDocDto> getAllFolderDoc() {
		List<FolderDocDto> lstFolderDoc=new ArrayList<FolderDocDto>();
		try{
			Criteria criteria=sessionFactory.getCurrentSession().createCriteria(FolderDocDto.class);
			criteria.add(Restrictions.eq("deleted", "N"));
			lstFolderDoc = criteria.list();
		}catch(Exception e){
			e.printStackTrace();
		}		
		return lstFolderDoc;
	}

	@Override
	public FolderDocDto editFolderfDoc(Integer folderId) {
		FolderDocDto obj=new FolderDocDto();
		try{
			obj=(FolderDocDto) sessionFactory.getCurrentSession().get(FolderDocDto.class, folderId);
			
			return obj;
		}
		catch(Exception e)
		{
				e.printStackTrace();
		}
		return obj;
	}

	@Override
	public boolean deleteFolderDoc(FolderDocDto folderobj) {
		try{
			sessionFactory.getCurrentSession().merge(folderobj);
			return true;
		}catch(Exception e){
			e.printStackTrace();
		}
		return false;
	}
}
