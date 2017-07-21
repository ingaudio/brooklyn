package org.opsart.event.core.dto;

import java.io.Serializable;
import java.util.List;

import org.opsart.event.core.dao.RankDAO;

public class ProfileDTO implements Serializable {

	private static final long serialVersionUID = -3444463184489557117L;

	public List<RankDAO> eventRanks;
	
}
