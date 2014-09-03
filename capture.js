
var capturemode = true;
var layername 	= null;
var layerframe	= null;
var layerlist	= null;
var layerbuttom	= null;
var loadedurl	= "http://bisite.usal.es";
var navurl		= null;

$(document).ready(function() 
{
		
		layername 	= $("#layername");
		layerframe	= $("#layerframe");
		layerlist	= $("#layerlist")
		layerbuttom	= $("#layerbutton");
		navurl		= $("#navurl");

		navurl.val (loadedurl);

		navurl.change (function()
		{
			loadURL ($(this).val());
		});

		layerbuttom.find("text").html ("Capture mode");
		layerbuttom.click (function ()
		{
				capturemode = !capturemode;
				
				if (!capturemode)
				{	

						$(this).find("text").html ("Navigation mode");	
						$(this).find("span").addClass("glyphicon-search");
						$(this).find("span").removeClass("glyphicon-camera");

						$(this).removeClass("btn-warning");	
						$(this).addClass("btn-danger");

				}
				else
				{
						$(this).find("text").html ("Capture mode");
						$(this).find("span").removeClass("glyphicon-search");
						$(this).find("span").addClass("glyphicon-camera");

						$(this).removeClass("btn-danger");	
						$(this).addClass("btn-warning");	
				}
				
				console.log("Capturemode: "+capturemode);
				
		});


		var loadiframefuntion = function(){
				
				$("#frameframe").contents().find("*")
				.hover(function ()
				{
									
						var parentEls = $(this).parents().map(function() 
							{
					    			return this.tagName+"."+this.className+"#"+this.id;
				  			})
					  		.get()
					  		.join( "<" );								
					
						parentEls = $(this).prop("tagName")+"."+$(this).prop("className")+"#"+$(this).prop("id")+"<" + parentEls +"|"+loadedurl;

						layername.val(parentEls);


				})
				.click (function ( event )
				{
						// Desactivado
						
						event.preventDefault();
						
						console.log ("Click over iframe object: "+$(this).prop("tagName") );
						
						if (!capturemode)
						{	
							if ($(this).prop("tagName") == "A")
							{
								loadURL ( $(this).attr("href") )
								

							}
						}
						else
						{

							var value = layername.val();

							if (value != "")
							{
								layerlist.append( "<li>");
								
								layerlist.find("li").last().addClass("urllist")
									.html(HTMLEncode(layername.val()))
									.click (function()
									{
										$(this).hide(200).done(function() {
											$(this).remove();
										});
									});
							}
						}

						return false;
				});
		};

		$("#frameframe").attr ("src", "webpage.php?url="+encodeURIComponent(loadedurl));

		$("#frameframe").load(loadiframefuntion);
});

function loadURL (url)
{
	loadedurl = url;
	console.log ("Loading url: "+loadedurl);
	navurl.val (loadedurl);

	$("#frameframe").attr ("src", "webpage.php?url="+encodeURIComponent(loadedurl));
	// $("#frameframe").load(loadiframefuntion);
}

function HTMLEncode(str)
{
		var i = str.length,
		      aRet = [];

		while (i--) 
		{
		    var iC = str[i].charCodeAt();
		    if (iC < 65 || iC > 127 || (iC>90 && iC<97)) {
		      aRet[i] = '&#'+iC+';';
		    } else {
		      aRet[i] = str[i];
		    }
		}

		return aRet.join('');    
}
