$('#search').on("keyup", function() 
{
	var g = $(this)[0].value.toLowerCase();
	if (g == "")
	{
		$(".title").each (function() 
		{
			var s = $(this).text().toLowerCase();
			$(this).parent().show();
		});
	}
	else
	{
		$(".title").each (function() 
		{
			var s = $(this).text().toLowerCase();
			$(this).closest('.title').parent()[ s.indexOf(g) != -1 ? 'show' : 'hide' ]();
		});
	}
});
