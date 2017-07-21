package org.opsart.event.core.dto;

public class FacetDTO {

	private String name;
	
	private long count;

	public FacetDTO(String name, long count) {
		this.name = name;
		this.count = count;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getCount() {
		return count;
	}

	public void setCount(long count) {
		this.count = count;
	}

}
