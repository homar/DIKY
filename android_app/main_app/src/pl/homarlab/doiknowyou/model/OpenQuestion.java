package pl.homarlab.doiknowyou.model;

public final class OpenQuestion implements Question{

	private String text;
	private Long number;

	public OpenQuestion(Long number, String text){
		this.text = text;
		this.number = number;
	}
	
	@Override
	public String getText() {
		return text;
	}

	@Override
	public Long getNumber() {
		return number;
	}	
	
}
