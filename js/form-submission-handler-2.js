(function() {
  function validEmail(email) { // see:
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {  //if hidden form filled up
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }

  // get all data in form and return object
  function getFormData() {
    var form = document.getElementById("registrationForm");
    var elements = form.elements;

    var fields = Object.keys(elements).filter(function(k) {
          return (elements[k].name !== "honeypot");
    }).map(function(k) {
      if(elements[k].name !== undefined) {
        return elements[k].name;
      // special case for Edge's html collection
      }else if(elements[k].length > 0){
        return elements[k].item(0).name;
      }
    }).filter(function(item, pos, self) {
      return self.indexOf(item) == pos && item;
    });

    var formData = {};
    fields.forEach(function(name){
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {  // handles form submit without any jquery
    event.preventDefault();           // we are submitting via xhr below
    var data = getFormData();         // get the values submitted in the form

    /* OPTION: Remove this comment to enable SPAM prevention, see README.md
    if (validateHuman(data.honeypot)) {  //if form is filled, form will not be submitted
      return false;
    }
    */

    if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
      var invalidEmail = document.getElementById("email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      disableAllButtons(event.target);
      var url = event.target.action;  //
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
          console.log( xhr.status, xhr.statusText )
          console.log(xhr.responseText);
          document.getElementById("registrationForm").style.display = "none"; // hide form
          var thankYouMessage = document.getElementById("registration_message");
            thankYouMessage.style.display = "block";
          return;
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data).map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k])
      }).join('&')
      xhr.send(encoded);
    }
  }
  function loaded() {
    // bind to the submit event of our form
    var form = document.getElementById("registrationForm");
    form.addEventListener("submit", handleFormSubmit, false);
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }
})();


function addFields(){
  var number = document.getElementById("member").value;
  var container = document.getElementById("member-details");
    container.setAttribute("class","row");
    container.style = "margin: 10% auto 0";
  while (container.hasChildNodes()) {
    container.removeChild(container.lastChild);
  }

  if (number < 2 || number > 4){
    var error = document.getElementById("limit");
    error.innerHTML = "Team size should be 2 to 4 members";
    error.style.display="block";
  }
  else{
    var error = document.getElementById("limit");
    error.style.display = "none";
    for (i=0;i<number-1;i++){
      var member = document.createElement("h4");
      member.setAttribute("class","col-md-12 col-sm-12 col-xs-12");
      member.style = "text-decoration: underline; color: #0c1c50";
      member.innerHTML = "Member "+(i+2)+" Details";
      container.appendChild(member);
      var div1 = document.createElement("div");
      div1.setAttribute("class", "col-md-6 col-sm-6 col-xs-12");
      var label_name = document.createElement("label");
      var input_name = document.createElement("input");
      var label_email = document.createElement("label");
      var input_email = document.createElement("input");
      label_name.for = "member-name"+(i+2);
      label_name.setAttribute("class","col-md-12 col-sm-12 col-xs-12 text-left");
      label_name.innerHTML = "Member Name";
      input_name.setAttribute("class","col-md-12 col-sm-12 col-xs-12 control-label");
      input_name.type = "text";
      input_name.required = "";
      input_name.name = "member-name"+(i+2);
      input_name.id = "member-name"+(i+2);
      div1.appendChild(label_name);
      div1.appendChild(input_name);
      container.appendChild(div1);
      var div2 = document.createElement("div");
      div2.setAttribute("class", "col-md-6 col-sm-6 col-xs-12");
      label_email.for = "member-email"+(i+2);
      label_email.innerHTML = "Member Email";
      label_email.setAttribute("class","col-md-12 col-sm-12 col-xs-12 float-left");
      input_email.type = "email";
      input_email.setAttribute("class","col-md-12 col-sm-12 col-xs-12 control-label");
      input_email.required = "";
      input_email.name = "member-email"+(i+2);
      input_email.id = "member-email"+(i+2);
      div2.appendChild(label_email);
      div2.appendChild(input_email);
      container.appendChild(div2);
      var div3 = document.createElement("div");
      div3.setAttribute("class", "col-md-6 col-sm-6 col-xs-12");
      var label_contact = document.createElement("label");
      var input_contact = document.createElement("input");
      label_contact.for = "member-contact"+(i+2);
      label_contact.innerHTML = "Member Contact No.";
      label_contact.setAttribute("class","col-md-12 col-sm-12 col-xs-12 text-left");
      input_contact.type = "number";
      input_contact.setAttribute("class","col-md-12 col-sm-12 col-xs-12 control-label");
      input_contact.max = "9999999999x";
      input_contact.required = "";
      input_contact.name = "member-contact"+(i+2);
      input_contact.id = "member-contact"+(i+2);
      div3.appendChild(label_contact);
      div3.appendChild(input_contact);
      container.appendChild(div3);

      var div4 = document.createElement("div");
      div4.setAttribute("class", "col-md-6 col-sm-6 col-xs-12");
      var label_org = document.createElement("label");
      var input_org = document.createElement("input");
      label_org.for = "member-org"+(i+2);
      label_org.innerHTML = "Member College/Organisation";
      label_org.setAttribute("class","col-md-12 col-sm-12 col-xs-12 text-left");
      input_org.type = "text";
      input_org.setAttribute("class","col-md-12 col-sm-12 col-xs-12 control-label");
      input_org.required = "";
      input_org.name = "member-org"+(i+2);
      input_org.id = "member-org"+(i+2);
      div4.appendChild(label_org);
      div4.appendChild(input_org);
      container.appendChild(div4);

    }
  }
}


//slider


	jQuery(document).ready(function(){

			function detect_active(){
	  			// get active
	  			var get_active = $("#dp-slider .dp_item:first-child").data("class");
	  			$("#dp-dots li").removeClass("active");
	  			$("#dp-dots li[data-class="+ get_active +"]").addClass("active");
	  		}
	  		$("#dp-next").click(function(){
	  			var total = $(".dp_item").length;
	  			$("#dp-slider .dp_item:first-child").hide().appendTo("#dp-slider").fadeIn();
	  			$.each($('.dp_item'), function (index, dp_item) {
	  				$(dp_item).attr('data-position', index + 1);
	  			});
	  			detect_active();

	  		});

	  		$("#dp-prev").click(function(){
	  			var total = $(".dp_item").length;
	  			$("#dp-slider .dp_item:last-child").hide().prependTo("#dp-slider").fadeIn();
	  			$.each($('.dp_item'), function (index, dp_item) {
	  				$(dp_item).attr('data-position', index + 1);
	  			});

	  			detect_active();
	  		});

	  		$("#dp-dots li").click(function(){
	  			$("#dp-dots li").removeClass("active");
	  			$(this).addClass("active");
	  			var get_slide = $(this).attr('data-class');
	  			console.log(get_slide);
	  			$("#dp-slider .dp_item[data-class=" + get_slide + "]").hide().prependTo("#dp-slider").fadeIn();
	  			$.each($('.dp_item'), function (index, dp_item) {
	  				$(dp_item).attr('data-position', index + 1);
	  			});
	  		});


	  		$("body").on("click", "#dp-slider .dp_item:not(:first-child)", function(){
	  			var get_slide = $(this).attr('data-class');
	  			console.log(get_slide);
	  			$("#dp-slider .dp_item[data-class=" + get_slide + "]").hide().prependTo("#dp-slider").fadeIn();
	  			$.each($('.dp_item'), function (index, dp_item) {
	  				$(dp_item).attr('data-position', index + 1);
	  			});

	  			detect_active();
	  		});
            setInterval(function(){
                var total = $(".dp_item").length;
	  			$("#dp-slider .dp_item:first-child").hide().appendTo("#dp-slider").fadeIn();
	  			$.each($('.dp_item'), function (index, dp_item) {
	  				$(dp_item).attr('data-position', index + 1);
	  			});
	  			detect_active;}, 3000);
            
	  	});
            
            
            