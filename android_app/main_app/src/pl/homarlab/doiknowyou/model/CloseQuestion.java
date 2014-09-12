package pl.homarlab.doiknowyou.model;

import java.util.List;

public class CloseQuestion implements Question {

	private Long number;
	private String text;
	private List<String> options;
	
	public CloseQuestion(Long number, String text, List<String> options){
		this.number = number;
		this.text = text;
		this.options = options;
	}
	
	@Override
	public Long getNumber() {
		return number;
	}

	@Override
	public String getText() {
		return text;
	}

	public List<String> getOptions() {
		return options;
	}
}
