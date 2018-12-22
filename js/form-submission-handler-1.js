
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
      member.style = "text-decoration: underline; color: red";
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